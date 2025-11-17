import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

interface AboutProps {
  darkMode: boolean
}

const About = ({ darkMode }: AboutProps) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  }

  const skills = [
    'Python Programming',
    'Machine Learning',
    'Deep Learning',
    'React.js',
    'TypeScript',
    '.NET Framework',
    'C# Development',
    'MSSQL Database',
    'RESTful APIs',
    'Transformers & LLMs',
    'RAG Systems',
    'Sentiment Analysis',
  ]

  return (
    <section
      id="about"
      ref={ref}
      className={`py-20 md:py-32 ${
        darkMode ? 'bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900' : 'bg-white'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2
              className={`text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-4 ${
                darkMode ? 'text-white' : 'text-primary-500'
              }`}
            >
              About Me
            </h2>
            <div
              className={`w-24 h-1 mx-auto ${
                darkMode ? 'bg-accent-400' : 'bg-accent-400'
              }`}
            />
          </motion.div>

          <div className="grid md:grid-cols-2 gap-16 items-start">
            <motion.div
              variants={itemVariants}
              className="relative flex justify-center md:justify-start items-start"
            >
              {/* Professional Frame Container */}
              <div className="relative">
                {/* Outer decorative frame */}
                <motion.div
                  className={`absolute -inset-4 rounded-full ${
                    darkMode 
                      ? 'bg-gradient-to-br from-accent-500/10 via-electric-500/10 to-vibrant-500/10 border-2 border-accent-500/20' 
                      : 'bg-gradient-to-br from-accent-500/5 via-electric-500/5 to-vibrant-500/5 border-2 border-accent-400/30'
                  }`}
                  animate={{
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                />
                
                {/* Main image container - larger and more professional */}
                <motion.div
                  className={`relative group w-[400px] h-[400px] md:w-[480px] md:h-[480px] rounded-full overflow-hidden shadow-2xl ${
                    darkMode 
                      ? 'ring-4 ring-accent-500/40 shadow-accent-500/30' 
                      : 'ring-4 ring-accent-400/50 shadow-accent-400/20'
                  }`}
                  whileHover={{
                    boxShadow: darkMode 
                      ? '0 30px 60px -12px rgba(6, 182, 212, 0.7), 0 0 0 12px rgba(6, 182, 212, 0.15)'
                      : '0 30px 60px -12px rgba(6, 182, 212, 0.6), 0 0 0 12px rgba(6, 182, 212, 0.2)',
                    scale: 1.02,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.img
                    src="/1754093305476.jpg"
                    alt="Muhammad Bilal Faisal"
                    className="w-full h-full object-cover rounded-full"
                    whileHover={{ scale: 1.03 }}
                    transition={{ duration: 0.5 }}
                  />
                  
                  {/* Subtle overlay on hover */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-accent-400/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={false}
                  />
                </motion.div>
                
                {/* Professional badge - positioned outside below the image */}
                <motion.div
                  className={`mt-8 mx-auto px-8 py-4 rounded-full ${
                    darkMode 
                      ? 'bg-gradient-to-r from-accent-500 via-electric-500 to-vibrant-500' 
                      : 'bg-gradient-to-r from-accent-500 via-electric-500 to-vibrant-500'
                  } text-white font-bold text-base shadow-2xl backdrop-blur-sm border-2 border-white/20 w-fit`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  whileHover={{ scale: 1.1, y: -5 }}
                >
                  AI Engineer
                </motion.div>
                
                {/* Animated background glow */}
                <motion.div
                  className={`absolute -inset-12 rounded-full ${
                    darkMode 
                      ? 'bg-gradient-to-r from-accent-500/25 via-vibrant-500/25 to-electric-500/25' 
                      : 'bg-gradient-to-r from-accent-500/20 via-vibrant-500/20 to-electric-500/20'
                  } blur-3xl -z-10`}
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.6, 0.3],
                    rotate: [0, 180, 360],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <p
                className={`text-lg md:text-xl mb-6 leading-relaxed ${
                  darkMode ? 'text-primary-200' : 'text-primary-600'
                }`}
              >
                Passionate AI Engineer and Full-Stack Developer with hands-on experience in building intelligent web applications 
                and integrating AI models with scalable backend solutions. Skilled in React, .NET, MSSQL, and Python, with a strong 
                foundation in Machine Learning, Deep Learning, and modern software engineering practices.
              </p>
              <p
                className={`text-lg md:text-xl mb-8 leading-relaxed ${
                  darkMode ? 'text-primary-200' : 'text-primary-600'
                }`}
              >
                Currently exploring Transformer architectures, Large Language Models (LLMs), and Retrieval-Augmented Generation (RAG) 
                systems. Experienced in developing responsive web applications, RESTful APIs, and ML models for real-world business 
                applications. Recognized for a proactive approach, data-driven problem-solving, and the ability to collaborate 
                effectively with cross-functional teams to deliver measurable results.
              </p>
              <div className="mb-8">
                <h3
                  className={`text-xl font-semibold mb-4 ${
                    darkMode ? 'text-white' : 'text-primary-500'
                  }`}
                >
                  Education
                </h3>
                <div
                  className={`p-4 rounded-lg ${
                    darkMode ? 'bg-primary-400/10 border border-primary-400/20' : 'bg-accent-50 border border-accent-200'
                  }`}
                >
                  <p
                    className={`font-semibold mb-1 ${
                      darkMode ? 'text-white' : 'text-primary-600'
                    }`}
                  >
                    Bachelor of Science in Data Science
                  </p>
                  <p
                    className={`text-sm ${
                      darkMode ? 'text-primary-300' : 'text-primary-500'
                    }`}
                  >
                    University of Management and Technology (UMT), Lahore | 2023 – 2027
                  </p>
                </div>
              </div>

              <div>
                <h3
                  className={`text-xl font-semibold mb-4 ${
                    darkMode ? 'text-white' : 'text-primary-500'
                  }`}
                >
                  Core Expertise
                </h3>
                <div className="flex flex-wrap gap-3">
                  {skills.map((skill, index) => (
                    <motion.span
                      key={skill}
                      initial={{ opacity: 0, scale: 0.8, y: 20 }}
                      animate={
                        inView
                          ? { opacity: 1, scale: 1, y: 0 }
                          : { opacity: 0, scale: 0.8, y: 20 }
                      }
                      transition={{
                        delay: index * 0.1,
                        duration: 0.5,
                        ease: [0.6, -0.05, 0.01, 0.99],
                      }}
                      whileHover={{
                        scale: 1.1,
                        y: -5,
                        boxShadow: '0 10px 25px rgba(79, 156, 255, 0.3)',
                      }}
                      className={`px-4 py-2 rounded-lg text-sm font-medium cursor-default transition-all ${
                        darkMode
                          ? 'bg-primary-400/20 text-accent-400 border border-primary-400/30 hover:border-accent-400/50'
                          : 'bg-accent-50 text-accent-600 border border-accent-200 hover:border-accent-400'
                      }`}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default About

