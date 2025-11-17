import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import {
  Brain,
  Code,
  Database,
  Cloud,
  GitBranch,
  Zap,
  Layers,
  Cpu,
} from 'lucide-react'

interface Skill {
  name: string
  icon: React.ReactNode
  level: 'expert' | 'advanced' | 'intermediate' | 'beginner'
  category: string
}

interface AboutProps {
  darkMode: boolean
}

const Skills = ({ darkMode }: AboutProps) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const skillCategories = {
    'AI/ML': [
      { name: 'Python Programming', icon: <Brain size={24} />, level: 'advanced' as const },
      { name: 'Machine Learning', icon: <Brain size={24} />, level: 'intermediate' as const },
      { name: 'Deep Learning', icon: <Brain size={24} />, level: 'intermediate' as const },
      { name: 'Neural Networks', icon: <Brain size={24} />, level: 'intermediate' as const },
      { name: 'NLP', icon: <Brain size={24} />, level: 'intermediate' as const },
      { name: 'Transformers & LLMs', icon: <Brain size={24} />, level: 'beginner' as const },
      { name: 'RAG Systems', icon: <Layers size={24} />, level: 'beginner' as const },
      { name: 'Sentiment Analysis', icon: <Brain size={24} />, level: 'intermediate' as const },
      { name: 'scikit-learn', icon: <Layers size={24} />, level: 'intermediate' as const },
      { name: 'pandas', icon: <Cpu size={24} />, level: 'advanced' as const },
      { name: 'NumPy', icon: <Cpu size={24} />, level: 'advanced' as const },
    ],
    'Frontend': [
      { name: 'React.js', icon: <Code size={24} />, level: 'advanced' as const },
      { name: 'TypeScript', icon: <Code size={24} />, level: 'advanced' as const },
      { name: 'JavaScript', icon: <Code size={24} />, level: 'advanced' as const },
      { name: 'Tailwind CSS', icon: <Zap size={24} />, level: 'advanced' as const },
      { name: 'State Management', icon: <Zap size={24} />, level: 'intermediate' as const },
      { name: 'Zustand', icon: <Zap size={24} />, level: 'intermediate' as const },
      { name: 'React Query', icon: <Zap size={24} />, level: 'intermediate' as const },
    ],
    'Backend': [
      { name: 'Python', icon: <Code size={24} />, level: 'advanced' as const },
      { name: '.NET Framework', icon: <Database size={24} />, level: 'advanced' as const },
      { name: 'C# Development', icon: <Database size={24} />, level: 'advanced' as const },
      { name: 'RESTful APIs', icon: <Database size={24} />, level: 'advanced' as const },
      { name: 'Authentication Systems', icon: <Database size={24} />, level: 'intermediate' as const },
      { name: 'User Management', icon: <Database size={24} />, level: 'intermediate' as const },
    ],
    'Database & Tools': [
      { name: 'MSSQL Database', icon: <Database size={24} />, level: 'advanced' as const },
      { name: 'MySQL Database', icon: <Database size={24} />, level: 'intermediate' as const },
      { name: 'Database Optimization', icon: <Database size={24} />, level: 'intermediate' as const },
      { name: 'Query Optimization', icon: <Database size={24} />, level: 'intermediate' as const },
      { name: 'Git Version Control', icon: <GitBranch size={24} />, level: 'expert' as const },
      { name: 'Postman API Testing', icon: <Cloud size={24} />, level: 'advanced' as const },
      { name: 'Cursor IDE', icon: <Cloud size={24} />, level: 'expert' as const },
      { name: 'Data Cleaning', icon: <Cpu size={24} />, level: 'intermediate' as const },
      { name: 'EDA', icon: <Cpu size={24} />, level: 'intermediate' as const },
      { name: 'Feature Engineering', icon: <Cpu size={24} />, level: 'intermediate' as const },
      { name: 'Model Deployment', icon: <Cloud size={24} />, level: 'beginner' as const },
    ],
  }

  const getLevelColor = (level: string) => {
    if (level === 'expert') {
      return darkMode ? 'bg-accent-400' : 'bg-accent-400'
    } else if (level === 'advanced') {
      return darkMode ? 'bg-accent-500' : 'bg-accent-500'
    } else if (level === 'intermediate') {
      return darkMode ? 'bg-electric-500' : 'bg-electric-500'
    }
    return darkMode ? 'bg-vibrant-500' : 'bg-vibrant-500'
  }

  const getLevelWidth = (level: string) => {
    if (level === 'expert') return '90%'
    if (level === 'advanced') return '75%'
    if (level === 'intermediate') return '60%'
    return '40%'
  }

  return (
    <section
      id="skills"
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
            Skills
          </h2>
          <div
            className={`w-24 h-1 mx-auto ${
              darkMode ? 'bg-accent-400' : 'bg-accent-400'
            }`}
          />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {Object.entries(skillCategories).map(([category, skills], categoryIndex) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              className={`rounded-2xl p-6 ${
                darkMode
                  ? 'bg-primary-400/10 border border-primary-400/20'
                  : 'bg-white border border-primary-100 shadow-lg'
              }`}
            >
              <h3
                className={`text-2xl font-display font-bold mb-6 ${
                  darkMode ? 'text-white' : 'text-primary-500'
                }`}
              >
                {category}
              </h3>
              <div className="space-y-6">
                {skills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: -30, scale: 0.9 }}
                    animate={inView ? { opacity: 1, x: 0, scale: 1 } : { opacity: 0, x: -30, scale: 0.9 }}
                    transition={{
                      duration: 0.5,
                      delay: (categoryIndex * 0.1) + (index * 0.05),
                      ease: [0.6, -0.05, 0.01, 0.99],
                    }}
                    whileHover={{ x: 5, transition: { duration: 0.2 } }}
                    className="group"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <motion.div
                          className={`p-2 rounded-lg transition-all ${
                            darkMode
                              ? 'bg-primary-400/20 text-accent-400 group-hover:bg-accent-400/30'
                              : 'bg-accent-50 text-accent-600 group-hover:bg-accent-100'
                          }`}
                          whileHover={{ rotate: 360, scale: 1.1 }}
                          transition={{ duration: 0.5 }}
                        >
                          {skill.icon}
                        </motion.div>
                        <span
                          className={`font-medium transition-colors ${
                            darkMode ? 'text-white group-hover:text-accent-400' : 'text-primary-600 group-hover:text-accent-600'
                          }`}
                        >
                          {skill.name}
                        </span>
                      </div>
                      <motion.span
                        className={`text-xs font-semibold px-2 py-1 rounded ${
                          darkMode
                            ? 'bg-primary-400/20 text-accent-400'
                            : 'bg-accent-50 text-accent-600'
                        }`}
                        whileHover={{ scale: 1.1 }}
                      >
                        {skill.level}
                      </motion.span>
                    </div>
                    <div
                      className={`h-2.5 rounded-full overflow-hidden ${
                        darkMode ? 'bg-primary-400/10' : 'bg-primary-100'
                      }`}
                    >
                      <motion.div
                        initial={{ width: 0 }}
                        animate={inView ? { width: getLevelWidth(skill.level) } : { width: 0 }}
                        transition={{
                          duration: 1.2,
                          delay: (categoryIndex * 0.1) + (index * 0.05) + 0.3,
                          ease: [0.6, -0.05, 0.01, 0.99],
                        }}
                        className={`h-full rounded-full relative overflow-hidden ${
                          skill.level === 'expert'
                            ? 'bg-gradient-to-r from-accent-500 via-electric-500 to-vibrant-500'
                            : skill.level === 'advanced'
                            ? 'bg-gradient-to-r from-accent-600 to-electric-600'
                            : skill.level === 'intermediate'
                            ? 'bg-gradient-to-r from-electric-500 to-vibrant-500'
                            : 'bg-gradient-to-r from-vibrant-500 to-accent-500'
                        }`}
                      >
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                          animate={{
                            x: ['-100%', '100%'],
                          }}
                          transition={{
                            repeat: Infinity,
                            duration: 2,
                            ease: 'linear',
                          }}
                        />
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Skills

