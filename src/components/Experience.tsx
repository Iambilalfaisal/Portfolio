import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Briefcase, Calendar, MapPin } from 'lucide-react'

interface ExperienceItem {
  title: string
  company: string
  location: string
  period: string
  description: string[]
  tools?: string[]
  type: 'full-time' | 'internship' | 'contract'
}

interface ExperienceProps {
  darkMode: boolean
}

const Experience = ({ darkMode }: ExperienceProps) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const experiences: ExperienceItem[] = [
    {
      title: 'Full Stack Developer & ML/Data Science Intern',
      company: 'Acme-One',
      location: 'Lahore, Pakistan',
      period: '2025 - Present',
      type: 'full-time',
      description: [
        'Built and deployed responsive web applications using React, .NET, and MSSQL, ensuring optimal performance and user experience across multiple devices and platforms',
        'Developed RESTful APIs with secure authentication and comprehensive user management systems, implementing best practices for security and scalability',
        'Collaborated with the AI team to integrate Machine Learning models using Python and scikit-learn, enabling intelligent features within web applications',
        'Improved database efficiency by optimizing queries, implementing proper indexing strategies, and enhancing data retrieval performance',
        'Developed ML models with Python, pandas, and scikit-learn, focusing on improving model accuracy through iterative refinement and feature engineering',
        'Performed comprehensive data cleaning, Exploratory Data Analysis (EDA), and feature engineering to enhance model performance and data quality',
        'Explored and implemented transformer-based architectures and Retrieval-Augmented Generation (RAG) systems for advanced AI capabilities',
        'Deployed Sentiment Analysis models and small-scale Machine Learning and Deep Learning models for classification tasks',
        'Participated in code reviews, technical discussions, and sprint planning meetings to ensure code quality and alignment with project objectives',
        'Maintained and updated technical documentation, ensuring knowledge transfer and team collaboration',
      ],
      tools: [
        'React.js with TypeScript',
        '.NET Framework (C#)',
        'MSSQL Server',
        'Python (scikit-learn, pandas, NumPy)',
        'Git',
        'Postman',
        'Cursor IDE',
        'React Query',
        'Zustand',
      ],
    },
  ]

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
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  }

  return (
    <section
      id="experience"
      ref={ref}
      className={`py-20 md:py-32 relative ${
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
            Experience
          </h2>
          <div
            className={`w-24 h-1 mx-auto ${
              darkMode ? 'bg-accent-400' : 'bg-accent-400'
            }`}
          />
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div
            className={`absolute left-8 top-0 bottom-0 w-0.5 ${
              darkMode ? 'bg-primary-400/30' : 'bg-primary-200'
            } hidden md:block`}
          />

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="space-y-12"
          >
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="relative pl-0 md:pl-20"
              >
                {/* Timeline dot */}
                <div
                  className={`absolute left-6 top-6 w-4 h-4 rounded-full border-4 ${
                    darkMode
                      ? 'bg-accent-400 border-primary-500'
                      : 'bg-accent-400 border-white'
                  } hidden md:block`}
                />

                <div
                  className={`rounded-2xl p-6 md:p-8 ${
                    darkMode
                      ? 'bg-primary-400/10 border border-primary-400/20'
                      : 'bg-white border border-primary-100 shadow-lg'
                  }`}
                >
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                    <div>
                      <h3
                        className={`text-2xl font-display font-bold mb-2 ${
                          darkMode ? 'text-white' : 'text-primary-500'
                        }`}
                      >
                        {exp.title}
                      </h3>
                      <div className="flex items-center gap-4 flex-wrap">
                        <div className="flex items-center gap-2">
                          <Briefcase
                            size={18}
                            className={darkMode ? 'text-accent-400' : 'text-accent-600'}
                          />
                          <span
                            className={`font-semibold ${
                              darkMode ? 'text-primary-200' : 'text-primary-600'
                            }`}
                          >
                            {exp.company}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin
                            size={18}
                            className={darkMode ? 'text-accent-400' : 'text-accent-600'}
                          />
                          <span
                            className={`text-sm ${
                              darkMode ? 'text-primary-300' : 'text-primary-500'
                            }`}
                          >
                            {exp.location}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mt-2 md:mt-0">
                      <Calendar
                        size={18}
                        className={darkMode ? 'text-accent-400' : 'text-accent-600'}
                      />
                      <span
                        className={`text-sm font-medium ${
                          darkMode ? 'text-primary-200' : 'text-primary-600'
                        }`}
                      >
                        {exp.period}
                      </span>
                    </div>
                  </div>

                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4 ${
                      darkMode
                        ? 'bg-accent-400/20 text-accent-400'
                        : 'bg-accent-50 text-accent-600'
                    }`}
                  >
                    {exp.type.replace('-', ' ').toUpperCase()}
                  </span>

                  <ul className="space-y-2 mt-4">
                    {exp.description.map((item, idx) => (
                      <li
                        key={idx}
                        className={`flex items-start gap-3 ${
                          darkMode ? 'text-primary-200' : 'text-primary-600'
                        }`}
                      >
                        <span
                          className={`mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                            darkMode ? 'bg-accent-400' : 'bg-accent-400'
                          }`}
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  {exp.tools && exp.tools.length > 0 && (
                    <div className="mt-6 pt-6 border-t border-primary-400/20">
                      <h4
                        className={`text-sm font-semibold mb-3 ${
                          darkMode ? 'text-primary-200' : 'text-primary-600'
                        }`}
                      >
                        Tools & Technologies:
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {exp.tools.map((tool, toolIdx) => (
                          <motion.span
                            key={toolIdx}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                            transition={{ delay: (index * 0.1) + (toolIdx * 0.05) + 0.5 }}
                            whileHover={{ scale: 1.1, y: -2 }}
                            className={`px-3 py-1.5 rounded-lg text-xs font-medium ${
                              darkMode
                                ? 'bg-primary-400/20 text-accent-400 border border-primary-400/30'
                                : 'bg-accent-50 text-accent-600 border border-accent-200'
                            }`}
                          >
                            {tool}
                          </motion.span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Experience

