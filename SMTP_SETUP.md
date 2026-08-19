# Contact form SMTP setup

The contact form posts to `app/api/contact/route.ts`, a Next.js server route that sends the
message straight over SMTP with [Nodemailer](https://nodemailer.com/) — no third-party form
service (EmailJS, Formspree, etc.) involved. This replaces the old EmailJS-based setup.

## Step 1: Get a Gmail App Password

Gmail no longer accepts your normal account password for SMTP login. You need an App
Password instead:

1. Turn on 2-Step Verification on your Google account, if it isn't already:
   <https://myaccount.google.com/security>
2. Go to <https://myaccount.google.com/apppasswords>
3. Create a new app password (name it something like "Portfolio contact form")
4. Copy the 16-character password Google generates — you'll only see it once

(Using a different mailbox/provider instead of Gmail? Any standard SMTP host works — just
use that provider's host/port/credentials in Step 2.)

## Step 2: Set environment variables

Copy `.env.example` to `.env.local` in the project root and fill in real values:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=Bilalfaisal100@gmail.com
SMTP_PASS=your-16-char-app-password
CONTACT_TO_EMAIL=Bilalfaisal100@gmail.com
```

`SMTP_USER` is the mailbox that authenticates and sends the message; `CONTACT_TO_EMAIL` is
where it lands (they can be the same address, as above). The visitor's own email is set as
the `Reply-To` header, so hitting "Reply" in your inbox goes straight back to them.

## Step 3: Restart the dev server

```bash
npm run dev
```

Next.js only reads `.env.local` on startup, so restart after adding or changing it.

## Step 4: Test it

Fill out the contact form on the site and submit. You should receive an email at
`CONTACT_TO_EMAIL` with the sender's name, email, phone (if given), reason, and message.

## Production deployment (Vercel)

1. Project Settings → Environment Variables
2. Add `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASS`, `CONTACT_TO_EMAIL`
3. Redeploy

## Notes

- The route runs on the Node.js runtime (not Edge) — Nodemailer needs real TCP sockets.
- A lightweight in-memory rate limit (5 submissions per 10 minutes per IP) and a hidden
  honeypot field both guard against spam. Neither requires configuration.
- If `SMTP_*` variables are missing, the route returns a clear 500 error instead of
  silently failing — check your server logs if messages aren't arriving.

## Troubleshooting

- **"Email sending is not configured yet."** — one of `SMTP_HOST` / `SMTP_PORT` /
  `SMTP_USER` / `SMTP_PASS` is missing. Check `.env.local` (dev) or the hosting
  provider's environment variables (production), and restart/redeploy.
- **Gmail rejects the login** — you're using your normal password instead of an App
  Password, or 2-Step Verification isn't enabled yet (required for App Passwords).
- **Message not received** — check spam, and confirm `CONTACT_TO_EMAIL` is correct.
