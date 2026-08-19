'use client'

import { useState } from 'react'
import { CheckCircle, AlertCircle, Send } from 'lucide-react'
import { contactInfo } from '@/lib/content'
import Reveal from './Reveal'

const REASONS = ['Job opportunity', 'Collaboration', 'General inquiry', 'Other']

const initialForm = { name: '', email: '', phone: '', reason: REASONS[0], message: '', company: '' }

export default function ContactSection() {
  const [formData, setFormData] = useState(initialForm)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [statusMessage, setStatusMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setStatus('idle')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          subject: formData.reason,
          message: formData.message,
          company: formData.company, // honeypot — left blank by real visitors
        }),
      })
      const data = await res.json()
      if (!res.ok || !data.ok) {
        throw new Error(data.error || 'Something went wrong.')
      }

      setStatus('success')
      setStatusMessage('Thanks — I’ll get back to you soon.')
      setFormData(initialForm)
    } catch (error) {
      setStatus('error')
      setStatusMessage(
        error instanceof Error && error.message
          ? error.message
          : `That didn’t send. Reach me directly at ${contactInfo.email} instead.`
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="mx-auto max-w-6xl px-6 py-24 scroll-mt-16">
      <Reveal>
        <h2 className="font-mono text-eyebrow uppercase text-grounded-dark mb-6">
          Contact
        </h2>
      </Reveal>

      <div className="grid md:grid-cols-2 gap-8 md:gap-12">
        <Reveal>
          <div className="rounded-3xl border border-paper/10 bg-ink/55 backdrop-blur-xl p-8 h-full">
            <p className="font-sans text-body-lg text-paper measure mb-8">
              Open to remote full-time roles. Based in {contactInfo.location}, available for
              US-hours overlap.
            </p>
            <dl className="space-y-4 font-mono text-eyebrow uppercase">
              <div className="flex gap-3">
                <dt className="text-graphite-dark shrink-0">Email</dt>
                <dd>
                  <a href={`mailto:${contactInfo.email}`} className="text-paper hover:text-grounded-dark transition-colors">
                    {contactInfo.email}
                  </a>
                </dd>
              </div>
              <div className="flex gap-3">
                <dt className="text-graphite-dark shrink-0">Phone</dt>
                <dd>
                  <a href={`tel:${contactInfo.phone.replace(/\s+/g, '')}`} className="text-paper hover:text-grounded-dark transition-colors">
                    {contactInfo.phone}
                  </a>
                </dd>
              </div>
              <div className="flex gap-3">
                <dt className="text-graphite-dark shrink-0">GitHub</dt>
                <dd>
                  <a href={contactInfo.github} className="text-paper hover:text-grounded-dark transition-colors">
                    {contactInfo.githubLabel}
                  </a>
                </dd>
              </div>
              <div className="flex gap-3">
                <dt className="text-graphite-dark shrink-0">LinkedIn</dt>
                <dd>
                  <a href={contactInfo.linkedin} className="text-paper hover:text-grounded-dark transition-colors">
                    {contactInfo.linkedinLabel}
                  </a>
                </dd>
              </div>
            </dl>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <form onSubmit={handleSubmit} className="rounded-3xl border border-paper/10 bg-ink/55 backdrop-blur-xl p-8 space-y-4">
            {/* Honeypot — hidden from real visitors via CSS and aria, left blank by them;
                bots that fill every field in a scraped form trip this instead of a human. */}
            <div className="hidden" aria-hidden="true">
              <label htmlFor="company">Company</label>
              <input
                id="company"
                name="company"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block font-mono text-eyebrow uppercase text-paper mb-2">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-md border border-paper/15 bg-paper/5 text-paper focus:border-grounded-dark outline-none transition-colors"
                />
              </div>
              <div>
                <label htmlFor="email" className="block font-mono text-eyebrow uppercase text-paper mb-2">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-md border border-paper/15 bg-paper/5 text-paper focus:border-grounded-dark outline-none transition-colors"
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="phone" className="block font-mono text-eyebrow uppercase text-paper mb-2">
                  Phone <span className="text-graphite-dark normal-case">(optional)</span>
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 rounded-md border border-paper/15 bg-paper/5 text-paper focus:border-grounded-dark outline-none transition-colors"
                />
              </div>
              <div>
                <label htmlFor="reason" className="block font-mono text-eyebrow uppercase text-paper mb-2">
                  Reason
                </label>
                <select
                  id="reason"
                  name="reason"
                  value={formData.reason}
                  onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                  className="w-full px-4 py-3 rounded-md border border-paper/15 bg-paper/5 text-paper focus:border-grounded-dark outline-none transition-colors"
                >
                  {REASONS.map((reason) => (
                    <option key={reason} value={reason} className="bg-ink text-paper">
                      {reason}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="message" className="block font-mono text-eyebrow uppercase text-paper mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-3 rounded-md border border-paper/15 bg-paper/5 text-paper focus:border-grounded-dark outline-none transition-colors resize-none"
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 font-mono text-eyebrow uppercase border border-paper text-paper px-5 py-3 rounded-md hover:bg-paper hover:text-ink transition-colors disabled:opacity-50"
            >
              <Send size={14} />
              {isSubmitting ? 'Sending…' : 'Send message'}
            </button>

            {status !== 'idle' && (
              <p
                role="status"
                className={`flex items-start gap-2 font-sans text-small pt-2 ${
                  status === 'success' ? 'text-grounded-dark' : 'text-gated-dark'
                }`}
              >
                {status === 'success' ? <CheckCircle size={16} className="mt-0.5 shrink-0" /> : <AlertCircle size={16} className="mt-0.5 shrink-0" />}
                {statusMessage}
              </p>
            )}
          </form>
        </Reveal>
      </div>
    </section>
  )
}
