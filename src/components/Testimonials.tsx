import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Award, Code, Database, Brain, TrendingUp, Users } from 'lucide-react'

interface Achievement {
  icon: React.ReactNode
  title: string
  description: string
  category: string
}

interface TestimonialsProps {
  darkMode: boolean
}

const Testimonials = ({ darkMode }: TestimonialsProps) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const achievements: Achievement[] = [
    {
      icon: <Code size={32} />,
      title: 'Full-Stack Development',
      description: 'Built and deployed 5+ enterprise applications (NucleusOne, TimeSheet-One, Project-One, Ops-One, HR-One) using React, TypeScript, .NET, and MSSQL, serving real business needs.',
      category: 'Development',
    },
    {
      icon: <Brain size={32} />,
      title: 'AI Integration',
      description: 'Successfully integrated ML models into web applications, deployed sentiment analysis systems, and implemented RAG architectures for enhanced user experiences.',
      category: 'AI/ML',
    },
    {
      icon: <Database size={32} />,
      title: 'Database Optimization',
      description: 'Improved database efficiency by optimizing queries, implementing indexing strategies, and enhancing data retrieval performance across multiple applications.',
      category: 'Backend',
    },
    {
      icon: <Users size={32} />,
      title: 'Team Collaboration',
      description: 'Collaborated with cross-functional teams at Acme-One, participated in code reviews, sprint planning, and delivered measurable business value through technical solutions.',
      category: 'Collaboration',
    },
    {
      icon: <TrendingUp size={32} />,
      title: 'Performance Enhancement',
      description: 'Developed responsive React interfaces with complex state management, optimized API performance, and implemented secure authentication systems for enterprise applications.',
      category: 'Performance',
    },
    {
      icon: <Award size={32} />,
      title: 'Continuous Learning',
      description: 'Exploring Transformer architectures, LLMs, and RAG systems while maintaining production code quality and contributing to technical documentation.',
      category: 'Growth',
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

  return (
    <section
      id="testimonials"
      ref={ref}
      className={`py-20 md:py-32 ${
        darkMode ? 'bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900' : 'bg-white'
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
            Key Achievements
          </h2>
          <div
            className={`w-24 h-1 mx-auto ${
              darkMode ? 'bg-accent-400' : 'bg-accent-400'
            }`}
          />
          <p
            className={`mt-6 text-lg md:text-xl max-w-3xl mx-auto ${
              darkMode ? 'text-primary-300' : 'text-primary-600'
            }`}
          >
            Highlights from my work at Acme-One and personal projects
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {achievements.map((achievement, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -8, scale: 1.02 }}
              className={`relative rounded-2xl p-6 group ${
                darkMode
                  ? 'bg-primary-400/10 border border-primary-400/20 hover:border-accent-500/40'
                  : 'bg-white border border-primary-100 shadow-lg hover:shadow-xl'
              } transition-all duration-300`}
            >
              <motion.div
                className={`inline-flex p-3 rounded-xl mb-4 ${
                  darkMode
                    ? 'bg-gradient-to-br from-accent-500/20 to-vibrant-500/20 text-accent-400'
                    : 'bg-gradient-to-br from-accent-500/10 to-vibrant-500/10 text-accent-600'
                }`}
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.5 }}
              >
                {achievement.icon}
              </motion.div>
              
              <h3
                className={`text-xl font-bold mb-3 ${
                  darkMode ? 'text-white' : 'text-primary-500'
                }`}
              >
                {achievement.title}
              </h3>
              
              <p
                className={`text-base leading-relaxed mb-4 ${
                  darkMode ? 'text-primary-300' : 'text-primary-600'
                }`}
              >
                {achievement.description}
              </p>
              
              <span
                className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                  darkMode
                    ? 'bg-accent-500/20 text-accent-400'
                    : 'bg-accent-100 text-accent-600'
                }`}
              >
                {achievement.category}
              </span>
              
              {/* Hover effect gradient */}
              <motion.div
                className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${
                  darkMode
                    ? 'from-accent-500/5 via-electric-500/5 to-vibrant-500/5'
                    : 'from-accent-500/3 via-electric-500/3 to-vibrant-500/3'
                } opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10`}
                initial={false}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Testimonials

