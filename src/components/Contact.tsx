import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Mail, Phone, MapPin, Send, Github, Linkedin, Twitter, CheckCircle, AlertCircle } from 'lucide-react'
import emailjs from '@emailjs/browser'

interface ContactProps {
  darkMode: boolean
}

const Contact = ({ darkMode }: ContactProps) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [statusMessage, setStatusMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')
    setStatusMessage('')

    try {
      // EmailJS configuration
      // You'll need to replace these with your actual EmailJS credentials
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'YOUR_SERVICE_ID'
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'YOUR_TEMPLATE_ID'
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY'

      // Check if EmailJS is configured
      if (serviceId === 'YOUR_SERVICE_ID' || templateId === 'YOUR_TEMPLATE_ID' || publicKey === 'YOUR_PUBLIC_KEY') {
        throw new Error('EmailJS is not configured. Please set up your EmailJS credentials.')
      }

      // Send email using EmailJS
      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          to_email: 'bilalfaisal400@gmail.com',
        },
        publicKey
      )

      // Success
      setSubmitStatus('success')
      setStatusMessage('Thank you for your message! I will get back to you soon.')
      setFormData({ name: '', email: '', message: '' })
      
      // Reset status after 5 seconds
      setTimeout(() => {
        setSubmitStatus('idle')
        setStatusMessage('')
      }, 5000)
    } catch (error) {
      console.error('EmailJS Error:', error)
      setSubmitStatus('error')
      setStatusMessage('Failed to send message. Please try again or contact me directly at bilalfaisal400@gmail.com')
      
      // Reset status after 5 seconds
      setTimeout(() => {
        setSubmitStatus('idle')
        setStatusMessage('')
      }, 5000)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const socialLinks = [
    { icon: <Github size={24} />, url: 'https://github.com', label: 'GitHub' },
    { icon: <Linkedin size={24} />, url: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: <Twitter size={24} />, url: 'https://twitter.com', label: 'Twitter' },
  ]

  return (
    <section
      id="contact"
      ref={ref}
      className={`py-20 md:py-32 ${
        darkMode ? 'bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900' : 'bg-gradient-to-br from-primary-50 to-white'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2
            className={`text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-4 ${
              darkMode ? 'text-white' : 'text-primary-500'
            }`}
          >
            Get In Touch
          </h2>
          <div
            className={`w-24 h-1 mx-auto ${
              darkMode ? 'bg-accent-400' : 'bg-accent-400'
            }`}
          />
          <p
            className={`mt-6 text-lg md:text-xl max-w-2xl mx-auto ${
              darkMode ? 'text-primary-200' : 'text-primary-600'
            }`}
          >
            I'm always open to discussing new projects, creative ideas, or
            opportunities to be part of your vision.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div>
              <h3
                className={`text-2xl font-display font-bold mb-6 ${
                  darkMode ? 'text-white' : 'text-primary-500'
                }`}
              >
                Let's Connect
              </h3>
              <p
                className={`text-lg mb-8 ${
                  darkMode ? 'text-primary-200' : 'text-primary-600'
                }`}
              >
                Feel free to reach out through any of these channels. I typically
                respond within 24 hours.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div
                  className={`p-3 rounded-lg ${
                    darkMode
                      ? 'bg-primary-400/20 text-accent-400'
                      : 'bg-accent-50 text-accent-600'
                  }`}
                >
                  <Mail size={24} />
                </div>
                <div>
                  <h4
                    className={`font-semibold mb-1 ${
                      darkMode ? 'text-white' : 'text-primary-500'
                    }`}
                  >
                    Email
                  </h4>
                  <a
                    href="mailto:Bilalfaisal400@gmail.com"
                    className={`text-sm ${
                      darkMode ? 'text-primary-200 hover:text-accent-400' : 'text-primary-600 hover:text-accent-600'
                    } transition-colors`}
                  >
                    Bilalfaisal400@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div
                  className={`p-3 rounded-lg ${
                    darkMode
                      ? 'bg-primary-400/20 text-accent-400'
                      : 'bg-accent-50 text-accent-600'
                  }`}
                >
                  <Phone size={24} />
                </div>
                <div>
                  <h4
                    className={`font-semibold mb-1 ${
                      darkMode ? 'text-white' : 'text-primary-500'
                    }`}
                  >
                    Phone
                  </h4>
                  <a
                    href="tel:+923224255722"
                    className={`text-sm ${
                      darkMode ? 'text-primary-200 hover:text-accent-400' : 'text-primary-600 hover:text-accent-600'
                    } transition-colors`}
                  >
                    +92 322-4255722
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div
                  className={`p-3 rounded-lg ${
                    darkMode
                      ? 'bg-primary-400/20 text-accent-400'
                      : 'bg-accent-50 text-accent-600'
                  }`}
                >
                  <MapPin size={24} />
                </div>
                <div>
                  <h4
                    className={`font-semibold mb-1 ${
                      darkMode ? 'text-white' : 'text-primary-500'
                    }`}
                  >
                    Location
                  </h4>
                  <p
                    className={`text-sm ${
                      darkMode ? 'text-primary-200' : 'text-primary-600'
                    }`}
                  >
                    Lahore, Pakistan
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h4
                className={`font-semibold mb-4 ${
                  darkMode ? 'text-white' : 'text-primary-500'
                }`}
              >
                Follow Me
              </h4>
              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    className={`p-3 rounded-lg transition-colors ${
                      darkMode
                        ? 'bg-primary-400/20 text-accent-400 hover:bg-primary-400/30'
                        : 'bg-accent-50 text-accent-600 hover:bg-accent-100'
                    }`}
                    aria-label={social.label}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.6 }}
          >
            <form
              onSubmit={handleSubmit}
              className={`rounded-2xl p-8 ${
                darkMode
                  ? 'bg-primary-400/10 border border-primary-400/20'
                  : 'bg-white border border-primary-100 shadow-lg'
              }`}
            >
              <div className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className={`block text-sm font-semibold mb-2 ${
                      darkMode ? 'text-white' : 'text-primary-600'
                    }`}
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                      darkMode
                        ? 'bg-primary-400/10 border-primary-400/30 text-white placeholder-primary-300 focus:border-accent-400'
                        : 'bg-white border-primary-200 text-primary-600 placeholder-primary-400 focus:border-accent-400'
                    } focus:outline-none focus:ring-2 focus:ring-accent-400/20`}
                    placeholder="Your Name"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className={`block text-sm font-semibold mb-2 ${
                      darkMode ? 'text-white' : 'text-primary-600'
                    }`}
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                      darkMode
                        ? 'bg-primary-400/10 border-primary-400/30 text-white placeholder-primary-300 focus:border-accent-400'
                        : 'bg-white border-primary-200 text-primary-600 placeholder-primary-400 focus:border-accent-400'
                    } focus:outline-none focus:ring-2 focus:ring-accent-400/20`}
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className={`block text-sm font-semibold mb-2 ${
                      darkMode ? 'text-white' : 'text-primary-600'
                    }`}
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className={`w-full px-4 py-3 rounded-lg border transition-colors resize-none ${
                      darkMode
                        ? 'bg-primary-400/10 border-primary-400/30 text-white placeholder-primary-300 focus:border-accent-400'
                        : 'bg-white border-primary-200 text-primary-600 placeholder-primary-400 focus:border-accent-400'
                    } focus:outline-none focus:ring-2 focus:ring-accent-400/20`}
                    placeholder="Your Message"
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full px-6 py-4 rounded-lg font-semibold text-lg transition-all flex items-center justify-center gap-2 ${
                    darkMode
                      ? submitStatus === 'success'
                        ? 'bg-vibrant-500 text-white hover:bg-vibrant-600'
                        : submitStatus === 'error'
                        ? 'bg-red-500 text-white hover:bg-red-600'
                        : 'bg-gradient-to-r from-accent-500 via-electric-500 to-vibrant-500 text-white hover:from-accent-600 hover:via-electric-600 hover:to-vibrant-600 disabled:opacity-50'
                      : submitStatus === 'success'
                      ? 'bg-vibrant-500 text-white hover:bg-vibrant-600'
                      : submitStatus === 'error'
                      ? 'bg-red-500 text-white hover:bg-red-600'
                      : 'bg-gradient-to-r from-accent-500 via-electric-500 to-vibrant-500 text-white hover:from-accent-600 hover:via-electric-600 hover:to-vibrant-600 disabled:opacity-50'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      >
                        <Send size={20} />
                      </motion.div>
                      Sending...
                    </>
                  ) : submitStatus === 'success' ? (
                    <>
                      <CheckCircle size={20} />
                      Message Sent!
                    </>
                  ) : submitStatus === 'error' ? (
                    <>
                      <AlertCircle size={20} />
                      Try Again
                    </>
                  ) : (
                    <>
                      <Send size={20} />
                      Send Message
                    </>
                  )}
                </motion.button>

                {/* Status Message */}
                {statusMessage && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-4 rounded-lg flex items-start gap-3 ${
                      submitStatus === 'success'
                        ? darkMode
                          ? 'bg-vibrant-500/20 border border-vibrant-500/30'
                          : 'bg-vibrant-50 border border-vibrant-200'
                        : darkMode
                        ? 'bg-red-500/20 border border-red-500/30'
                        : 'bg-red-50 border border-red-200'
                    }`}
                  >
                    {submitStatus === 'success' ? (
                      <CheckCircle
                        size={20}
                        className={darkMode ? 'text-vibrant-400 mt-0.5' : 'text-vibrant-600 mt-0.5'}
                      />
                    ) : (
                      <AlertCircle
                        size={20}
                        className={darkMode ? 'text-red-400 mt-0.5' : 'text-red-600 mt-0.5'}
                      />
                    )}
                    <p
                      className={`text-sm ${
                        submitStatus === 'success'
                          ? darkMode
                            ? 'text-vibrant-300'
                            : 'text-vibrant-700'
                          : darkMode
                          ? 'text-red-300'
                          : 'text-red-700'
                      }`}
                    >
                      {statusMessage}
                    </p>
                  </motion.div>
                )}
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Contact

