import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Award, Code, Database, Brain, ShieldCheck, GitBranch } from 'lucide-react'

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
      icon: <Brain size={32} />,
      title: 'Production Agentic AI',
      description: 'Ships LangChain and LangGraph pipelines — tool-calling agents, stateful graphs, human-in-the-loop approval — running live inside Nucleus One, plus a two-agent RepoWarden system built as two compiled StateGraphs.',
      category: 'AI/ML',
    },
    {
      icon: <ShieldCheck size={32} />,
      title: 'Permission-Aware RAG',
      description: 'Built and shipped a Retrieval-Augmented Generation chatbot into production, resolving every retrieval against the asking user’s existing platform permissions so it can never surface data that user isn’t already entitled to see.',
      category: 'AI/ML',
    },
    {
      icon: <Code size={32} />,
      title: 'Sole Engineer, Project-One',
      description: 'Owns the Project-One work-item tracking module end to end — SQL Server schema through ASP.NET Core 8 services to the React/TypeScript interface — on a seven-person team, ranked second by commit volume across both platform repositories.',
      category: 'Full-Stack',
    },
    {
      icon: <GitBranch size={32} />,
      title: 'Security-First Engineering',
      description: 'Built the platform authentication controller (JWT, RBAC, secure sessions), and designed RepoWarden’s Reviewer agent so its toolset structurally omits the write tool — safety enforced through tool binding, not prompt instructions.',
      category: 'Security',
    },
    {
      icon: <Database size={32} />,
      title: 'Full-Stack Delivery',
      description: 'Authored the HR-One service layer and schema, and shipped TimeTrace to production with its backend reporting engine, across a unified SQL Server schema of roughly 100 tables shared across Nucleus One’s modules.',
      category: 'Backend',
    },
    {
      icon: <Award size={32} />,
      title: 'Continuous Learning',
      description: 'Final-year BS Data Science student at UMT researching transformer architectures and RAG, Anthropic-certified in Claude Code and AI fluency fundamentals (2026).',
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
            Highlights from production work at Acme One and independent engineering projects
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

