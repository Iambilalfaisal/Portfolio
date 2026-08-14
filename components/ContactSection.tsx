'use client'

import { useState } from 'react'
import emailjs from '@emailjs/browser'
import { CheckCircle, AlertCircle, Send } from 'lucide-react'
import Reveal from './Reveal'

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [statusMessage, setStatusMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setStatus('idle')

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY

    try {
      if (!serviceId || !templateId || !publicKey) {
        throw new Error('EmailJS is not configured yet.')
      }

      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          to_email: 'Bilalfaisal100@gmail.com',
        },
        publicKey
      )

      setStatus('success')
      setStatusMessage('Thanks — I’ll get back to you soon.')
      setFormData({ name: '', email: '', message: '' })
    } catch {
      setStatus('error')
      setStatusMessage('That didn’t send. Reach me directly at Bilalfaisal100@gmail.com instead.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="mx-auto max-w-6xl px-6 py-24 scroll-mt-16">
      <Reveal>
        <h2 className="font-mono text-eyebrow uppercase text-grounded dark:text-grounded-dark mb-6">
          Contact
        </h2>
      </Reveal>

      <div className="grid md:grid-cols-2 gap-12">
        <Reveal>
          <p className="font-sans text-body-lg text-ink dark:text-paper measure mb-8">
            Open to remote full-time roles. Based in Lahore, Pakistan (UTC+5), available for
            US-hours overlap.
          </p>
          <dl className="space-y-4 font-mono text-eyebrow uppercase">
            <div className="flex gap-3">
              <dt className="text-graphite dark:text-graphite-dark">Email</dt>
              <dd>
                <a href="mailto:Bilalfaisal100@gmail.com" className="hover:text-grounded dark:hover:text-grounded-dark">
                  Bilalfaisal100@gmail.com
                </a>
              </dd>
            </div>
            <div className="flex gap-3">
              <dt className="text-graphite dark:text-graphite-dark">GitHub</dt>
              <dd>
                <a href="https://github.com/Iambilalfaisal" className="hover:text-grounded dark:hover:text-grounded-dark">
                  github.com/Iambilalfaisal
                </a>
              </dd>
            </div>
            <div className="flex gap-3">
              <dt className="text-graphite dark:text-graphite-dark">LinkedIn</dt>
              <dd>
                <a href="https://linkedin.com/in/ibilalfaisal" className="hover:text-grounded dark:hover:text-grounded-dark">
                  linkedin.com/in/ibilalfaisal
                </a>
              </dd>
            </div>
          </dl>
        </Reveal>

        <Reveal delay={0.1}>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block font-mono text-eyebrow uppercase mb-2">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 rounded-md border border-hairline dark:border-hairline-dark bg-transparent focus:border-grounded dark:focus:border-grounded-dark outline-none transition-colors"
              />
            </div>
            <div>
              <label htmlFor="email" className="block font-mono text-eyebrow uppercase mb-2">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 rounded-md border border-hairline dark:border-hairline-dark bg-transparent focus:border-grounded dark:focus:border-grounded-dark outline-none transition-colors"
              />
            </div>
            <div>
              <label htmlFor="message" className="block font-mono text-eyebrow uppercase mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-3 rounded-md border border-hairline dark:border-hairline-dark bg-transparent focus:border-grounded dark:focus:border-grounded-dark outline-none transition-colors resize-none"
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 font-mono text-eyebrow uppercase border border-ink dark:border-paper px-5 py-3 rounded-md hover:bg-ink hover:text-paper dark:hover:bg-paper dark:hover:text-ink transition-colors disabled:opacity-50"
            >
              <Send size={14} />
              {isSubmitting ? 'Sending…' : 'Send message'}
            </button>

            {status !== 'idle' && (
              <p
                role="status"
                className={`flex items-start gap-2 font-sans text-small pt-2 ${
                  status === 'success' ? 'text-grounded dark:text-grounded-dark' : 'text-gated dark:text-gated-dark'
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
