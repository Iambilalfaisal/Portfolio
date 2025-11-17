import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

interface NavbarProps {
  darkMode: boolean
}

const Navbar = ({ darkMode }: NavbarProps) => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Contact', href: '#contact' },
  ]

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setIsMobileMenuOpen(false)
    }
  }

  useEffect(() => {
    const handleActiveSection = () => {
      const sections = navItems.map(item => item.href.substring(1))
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(`#${section}`)
            break
          }
        }
      }
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
      handleActiveSection()
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Check on mount
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? darkMode
            ? 'bg-primary-900/98 backdrop-blur-2xl shadow-2xl border-b-2 border-accent-500/30'
            : 'bg-white/98 backdrop-blur-2xl shadow-2xl border-b-2 border-accent-500/20'
          : darkMode
          ? 'bg-primary-900/80 backdrop-blur-xl'
          : 'bg-white/90 backdrop-blur-xl'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 md:h-24">
          <motion.div
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            className="flex-shrink-0"
          >
            <motion.a
              href="#home"
              onClick={(e) => {
                e.preventDefault()
                scrollToSection('#home')
              }}
              className="relative group flex items-center gap-2"
            >
              {/* Professional Logo Design */}
              <motion.div
                className={`relative px-4 py-2 rounded-xl font-display font-bold text-xl ${
                  darkMode
                    ? 'bg-gradient-to-br from-accent-500 via-electric-500 to-vibrant-500 text-white shadow-lg'
                    : 'bg-gradient-to-br from-accent-500 via-electric-500 to-vibrant-500 text-white shadow-lg'
                }`}
                whileHover={{
                  boxShadow: '0 10px 40px rgba(6, 182, 212, 0.5)',
                  scale: 1.05,
                }}
                transition={{ duration: 0.3 }}
              >
                <span className="relative z-10 tracking-wider">MBF</span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-vibrant-500 via-accent-500 to-electric-500 opacity-0 group-hover:opacity-100 rounded-xl transition-opacity duration-300"
                  initial={false}
                />
                <motion.div
                  className="absolute -inset-1 bg-gradient-to-r from-accent-500 via-electric-500 to-vibrant-500 opacity-20 blur-md group-hover:opacity-40 transition-opacity duration-300 rounded-xl"
                  initial={false}
                />
              </motion.div>
              
              {/* Optional: Add a subtle line or dot */}
              <motion.div
                className={`h-1 w-8 rounded-full ${
                  darkMode ? 'bg-gradient-to-r from-accent-400 to-vibrant-400' : 'bg-gradient-to-r from-accent-500 to-vibrant-500'
                } hidden sm:block`}
                initial={{ width: 0 }}
                animate={{ width: 32 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              />
            </motion.a>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            {navItems.map((item, index) => {
              const isActive = activeSection === item.href
              return (
                <motion.a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToSection(item.href)
                    setActiveSection(item.href)
                  }}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{
                    scale: 1.08,
                    y: -3,
                  }}
                  whileTap={{ scale: 0.95 }}
                  className={`relative px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 group ${
                    isActive
                      ? darkMode
                        ? 'bg-gradient-to-r from-accent-500/30 via-electric-500/30 to-vibrant-500/30 text-accent-300 shadow-lg shadow-accent-500/20'
                        : 'bg-gradient-to-r from-accent-500/20 via-electric-500/20 to-vibrant-500/20 text-accent-700 shadow-lg shadow-accent-500/10'
                      : darkMode
                      ? 'text-white/90 hover:text-accent-300 hover:bg-primary-800/60 hover:shadow-md'
                      : 'text-primary-700 hover:text-accent-600 hover:bg-primary-100/80 hover:shadow-md'
                  }`}
                >
                  <span className="relative z-10">{item.name}</span>
                  {isActive && (
                    <motion.div
                      className={`absolute inset-0 rounded-xl bg-gradient-to-r ${
                        darkMode
                          ? 'from-accent-500/40 via-electric-500/40 to-vibrant-500/40'
                          : 'from-accent-500/30 via-electric-500/30 to-vibrant-500/30'
                      }`}
                      layoutId="activeNav"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <motion.span
                    className={`absolute bottom-1 left-1/2 w-0 h-1 bg-gradient-to-r ${
                      darkMode ? 'from-accent-400 via-electric-400 to-vibrant-400' : 'from-accent-500 via-electric-500 to-vibrant-500'
                    } group-hover:w-4/5 group-hover:left-[10%] transition-all duration-300 -translate-x-1/2 rounded-full`}
                    initial={false}
                  />
                </motion.a>
              )
            })}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`md:hidden p-2 rounded-lg transition-all ${
              darkMode
                ? 'text-white hover:bg-primary-800/50'
                : 'text-primary-600 hover:bg-primary-100'
            }`}
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait">
              {isMobileMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X size={24} />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu size={24} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className={`md:hidden border-t backdrop-blur-xl ${
              darkMode
                ? 'border-primary-700/50 bg-primary-900/95'
                : 'border-primary-200/50 bg-white/95'
            }`}
          >
            <div className="px-4 pt-2 pb-4 space-y-1">
              {navItems.map((item, index) => {
                const isActive = activeSection === item.href
                return (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault()
                      scrollToSection(item.href)
                      setActiveSection(item.href)
                      setIsMobileMenuOpen(false)
                    }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={`block px-4 py-3 rounded-lg text-sm font-semibold transition-all ${
                      isActive
                        ? darkMode
                          ? 'bg-gradient-to-r from-accent-500/20 to-vibrant-500/20 text-accent-400'
                          : 'bg-gradient-to-r from-accent-500/10 to-vibrant-500/10 text-accent-600'
                        : darkMode
                        ? 'text-white/80 hover:bg-primary-800/50 hover:text-accent-400'
                        : 'text-primary-600 hover:bg-primary-50 hover:text-accent-500'
                    }`}
                  >
                    {item.name}
                  </motion.a>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

export default Navbar

