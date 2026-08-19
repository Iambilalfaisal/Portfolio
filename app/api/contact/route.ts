import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

// Nodemailer needs real Node sockets (net/tls) to talk SMTP — the Edge runtime doesn't
// support that, so this route has to run on the Node.js runtime.
export const runtime = 'nodejs'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const MAX_LEN = { name: 200, email: 254, phone: 40, subject: 200, message: 5000 }

// Best-effort per-IP throttle. State lives in module scope, so it only holds for the
// lifetime of one warm serverless instance — not a substitute for a real rate limiter,
// but enough to blunt a casual script hitting this route in a loop.
const submissions = new Map<string, { count: number; resetAt: number }>()
const WINDOW_MS = 10 * 60 * 1000
const MAX_PER_WINDOW = 5

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const entry = submissions.get(ip)
  if (!entry || now > entry.resetAt) {
    submissions.set(ip, { count: 1, resetAt: now + WINDOW_MS })
    return false
  }
  entry.count += 1
  return entry.count > MAX_PER_WINDOW
}

// Strips newlines/control characters so nothing in these fields can inject extra
// headers or lines into the outgoing email, even though nodemailer's structured
// from/to/subject fields already encode values safely on their own.
function clean(value: unknown, maxLen: number): string {
  if (typeof value !== 'string') return ''
  return value.replace(/[\r\n\t]+/g, ' ').trim().slice(0, maxLen)
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

export async function POST(request: Request) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { ok: false, error: 'Too many messages sent recently. Please try again later.' },
      { status: 429 }
    )
  }

  let body: Record<string, unknown>
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid request body.' }, { status: 400 })
  }

  // Honeypot: a real visitor never fills this hidden field in. Reporting success without
  // sending anything keeps automated submitters from learning the field was detected.
  if (typeof body.company === 'string' && body.company.trim() !== '') {
    return NextResponse.json({ ok: true })
  }

  const name = clean(body.name, MAX_LEN.name)
  const email = clean(body.email, MAX_LEN.email)
  const phone = clean(body.phone, MAX_LEN.phone)
  const subject = clean(body.subject, MAX_LEN.subject)
  const message = typeof body.message === 'string' ? body.message.trim().slice(0, MAX_LEN.message) : ''

  if (!name || !email || !message) {
    return NextResponse.json(
      { ok: false, error: 'Name, email, and message are required.' },
      { status: 400 }
    )
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ ok: false, error: 'That email address looks invalid.' }, { status: 400 })
  }

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_TO_EMAIL } = process.env
  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) {
    console.error('Contact form: SMTP environment variables are not configured.')
    return NextResponse.json(
      { ok: false, error: 'Email sending is not configured yet.' },
      { status: 500 }
    )
  }

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    secure: process.env.SMTP_SECURE ? process.env.SMTP_SECURE === 'true' : Number(SMTP_PORT) === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  })

  const toAddress = CONTACT_TO_EMAIL || SMTP_USER
  const subjectLine = `Portfolio contact — ${subject || 'New message'} from ${name}`

  const textLines = [
    `Name: ${name}`,
    `Email: ${email}`,
    phone ? `Phone: ${phone}` : null,
    subject ? `Subject: ${subject}` : null,
    '',
    message,
  ].filter((line): line is string => line !== null)

  const htmlRows = [
    `<p><strong>Name:</strong> ${escapeHtml(name)}</p>`,
    `<p><strong>Email:</strong> ${escapeHtml(email)}</p>`,
    phone ? `<p><strong>Phone:</strong> ${escapeHtml(phone)}</p>` : '',
    subject ? `<p><strong>Subject:</strong> ${escapeHtml(subject)}</p>` : '',
    `<p><strong>Message:</strong></p><p>${escapeHtml(message).replace(/\n/g, '<br/>')}</p>`,
  ].join('')

  try {
    await transporter.sendMail({
      from: `"Portfolio Contact Form" <${SMTP_USER}>`,
      to: toAddress,
      replyTo: `"${name}" <${email}>`,
      subject: subjectLine,
      text: textLines.join('\n'),
      html: htmlRows,
    })
  } catch (error) {
    console.error('Contact form: failed to send email.', error)
    return NextResponse.json(
      { ok: false, error: 'Could not send the message right now. Please try again shortly.' },
      { status: 502 }
    )
  }

  return NextResponse.json({ ok: true })
}
