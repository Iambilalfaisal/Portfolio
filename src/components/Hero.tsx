import { motion, useScroll, useTransform } from 'framer-motion'
import { Download, Mail, ArrowDown, Sparkles } from 'lucide-react'
import { useInView } from 'react-intersection-observer'
import ParticleBackground from './ParticleBackground'

interface HeroProps {
  darkMode: boolean
}

const Hero = ({ darkMode }: HeroProps) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const { scrollY } = useScroll()
  const y1 = useTransform(scrollY, [0, 300], [0, 200])
  const y2 = useTransform(scrollY, [0, 300], [0, -200])
  const opacity = useTransform(scrollY, [0, 300], [1, 0])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    },
  }

  const nameVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    },
  }

  const scrollToContact = () => {
    const element = document.querySelector('#contact')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const downloadCV = () => {
    // Direct download approach - simpler and more reliable
    const link = document.createElement('a')
    link.href = '/Bilal-Resume.pdf'
    link.download = 'M_Bilal_Faisal_CV.pdf'
    link.target = '_blank' // Open in new tab as fallback
    link.style.display = 'none'
    document.body.appendChild(link)
    link.click()
    
    // Clean up after a delay
    setTimeout(() => {
      document.body.removeChild(link)
    }, 100)
  }

  return (
    <section
      id="home"
      ref={ref}
      className={`min-h-screen flex items-center justify-center relative overflow-hidden ${
        darkMode
          ? 'bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900'
          : 'bg-gradient-to-br from-primary-50 via-white to-accent-50/30'
      }`}
    >
      <ParticleBackground darkMode={darkMode} />

      {/* Animated background decorations with parallax */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          style={{ y: y1, opacity }}
          className={`absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl ${
            darkMode ? 'bg-accent-500' : 'bg-accent-300'
          } opacity-30 animate-pulse-slow`}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          style={{ y: y2, opacity }}
          className={`absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl ${
            darkMode ? 'bg-vibrant-500' : 'bg-vibrant-300'
          } opacity-20 animate-pulse-slow`}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1,
          }}
        />
        <motion.div
          style={{ y: y1 }}
          className={`absolute top-1/2 left-1/2 w-64 h-64 rounded-full blur-3xl ${
            darkMode ? 'bg-electric-500' : 'bg-electric-200'
          } opacity-10 animate-float`}
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="text-center"
        >
          <motion.div variants={itemVariants}>
            <motion.h1
              variants={nameVariants}
              className={`text-5xl md:text-7xl lg:text-8xl font-display font-bold mb-6 ${
                darkMode ? 'text-white' : 'text-primary-500'
              }`}
            >
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                Hi, I'm{' '}
              </motion.span>
              <motion.span
                className={`inline-block text-gradient-animated ${
                  darkMode ? '' : ''
                }`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                whileHover={{ scale: 1.05 }}
              >
                Muhammad Bilal Faisal
              </motion.span>
              <motion.span
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="inline-block ml-2"
              >
                <Sparkles
                  size={48}
                  className={`${darkMode ? 'text-accent-400' : 'text-accent-500'} animate-float`}
                />
              </motion.span>
            </motion.h1>
          </motion.div>

          <motion.div variants={itemVariants}>
            <p
              className={`text-xl md:text-2xl lg:text-3xl font-medium mb-8 ${
                darkMode ? 'text-primary-100' : 'text-primary-600'
              }`}
            >
              AI Engineer & Full-Stack Developer
            </p>
          </motion.div>

          <motion.div variants={itemVariants}>
            <p
              className={`text-lg md:text-xl mb-12 max-w-3xl mx-auto ${
                darkMode ? 'text-primary-200' : 'text-primary-600'
              }`}
            >
              Building intelligent web applications and integrating AI models with scalable backend solutions. 
              Exploring Transformer architectures, LLMs, and RAG systems to deliver measurable business value.
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <motion.button
              whileHover={{
                scale: 1.08,
                boxShadow: '0 10px 40px rgba(79, 156, 255, 0.4)',
              }}
              whileTap={{ scale: 0.95 }}
              onClick={downloadCV}
              className={`px-8 py-4 rounded-xl font-semibold text-lg transition-all shadow-lg relative overflow-hidden group ${
                darkMode
                  ? 'bg-gradient-to-r from-accent-500 via-electric-500 to-vibrant-500 text-white glow-cyan'
                  : 'bg-gradient-to-r from-accent-500 via-electric-500 to-vibrant-500 text-white'
              }`}
              whileHover={{
                scale: 1.08,
                boxShadow: '0 20px 60px rgba(6, 182, 212, 0.6)',
              }}
            >
              <motion.span
                className="absolute inset-0 bg-gradient-to-r from-electric-500 via-accent-500 to-vibrant-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={false}
              />
              <span className="flex items-center gap-2 relative z-10">
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                >
                  <Download size={20} />
                </motion.div>
                Download CV
              </span>
            </motion.button>

            <motion.button
              whileHover={{
                scale: 1.08,
                backgroundColor: darkMode ? 'rgba(79, 156, 255, 0.15)' : 'rgba(79, 156, 255, 0.1)',
              }}
              whileTap={{ scale: 0.95 }}
              onClick={scrollToContact}
              className={`px-8 py-4 rounded-xl font-semibold text-lg transition-all border-2 relative overflow-hidden group ${
                darkMode
                  ? 'border-accent-500 text-accent-400 hover:border-vibrant-500 hover:text-vibrant-400'
                  : 'border-accent-500 text-accent-500 hover:border-vibrant-500 hover:text-vibrant-500'
              }`}
              whileHover={{
                scale: 1.08,
                borderColor: darkMode ? '#10b981' : '#10b981',
              }}
            >
              <motion.span
                className="absolute inset-0 bg-gradient-to-r from-accent-400/10 to-vibrant-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={false}
              />
              <span className="flex items-center gap-2 relative z-10">
                <Mail size={20} />
                Contact Me
              </span>
            </motion.button>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="mt-20"
          >
            <motion.button
              onClick={() => {
                const element = document.querySelector('#about')
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' })
                }
              }}
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className={`p-3 rounded-full ${
                darkMode
                  ? 'text-white hover:bg-primary-400/20'
                  : 'text-primary-500 hover:bg-primary-100'
              }`}
              aria-label="Scroll down"
            >
              <ArrowDown size={32} />
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero

