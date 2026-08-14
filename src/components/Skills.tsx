import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import {
  Brain,
  Code,
  Database,
  Cloud,
  ShieldCheck,
  Wrench,
  Layers,
} from 'lucide-react'

interface SkillsProps {
  darkMode: boolean
}

const Skills = ({ darkMode }: SkillsProps) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const skillCategories = [
    {
      category: 'AI & LLM Engineering',
      icon: <Brain size={22} />,
      skills: [
        'Retrieval-Augmented Generation (RAG)',
        'LangChain',
        'LangGraph',
        'Agentic AI & Tool-Calling Agents',
        'Multi-Agent Orchestration',
        'Prompt Engineering',
        'Chunking & Retrieval Tuning',
        'Embeddings',
        'Hybrid Search (BM25 + Vector + Semantic)',
        'RAG Evaluation (RAGAS)',
        'Permission-Aware & Tenant-Scoped Retrieval',
        'Hallucination Mitigation',
        'LangGraph StateGraph Design',
        'Checkpointing & Agent Persistence',
        'Human-in-the-Loop Gating',
        'Capability-Based Tool Isolation',
        'Token Streaming (Server-Sent Events)',
        'Large Language Models',
        'Transformers',
      ],
    },
    {
      category: 'Machine Learning',
      icon: <Layers size={22} />,
      skills: [
        'Natural Language Processing',
        'Text Classification',
        'Sentiment Analysis',
        'Neural Networks',
        'Deep Learning',
        'Anomaly Detection (Isolation Forest)',
        'Feature Engineering',
        'Model Evaluation & Deployment',
        'Supervised & Unsupervised Learning',
        'Statistical Analysis',
        'Data Visualization',
      ],
    },
    {
      category: 'AI Platforms & Libraries',
      icon: <Cloud size={22} />,
      skills: [
        'Azure OpenAI Service',
        'Azure AI Search',
        'Azure AI Document Intelligence',
        'Azure AI Foundry',
        'Microsoft Entra ID',
        'Claude API',
        'Ollama / Llama 3.1',
        'scikit-learn',
        'pandas',
        'NumPy',
      ],
    },
    {
      category: 'Backend & Databases',
      icon: <Database size={22} />,
      skills: [
        'ASP.NET Core 8',
        '.NET Framework',
        'C#',
        'Entity Framework',
        'FastAPI',
        'Quart',
        'Flask',
        'Node.js',
        'Laravel',
        'REST API Design',
        'JWT & RBAC',
        'Multi-Tenant Access Control',
        'LiveKit & WebRTC',
        'Microsoft SQL Server',
        'MySQL',
        'MongoDB',
        'SQLite',
        'Schema Design & Query Optimization',
      ],
    },
    {
      category: 'Frontend',
      icon: <Code size={22} />,
      skills: [
        'React 18/19',
        'TypeScript',
        'Next.js',
        'Vue.js',
        'Zustand',
        'React Query',
        'Tailwind CSS',
        'Vite',
        'Streamlit',
        'Responsive Design',
      ],
    },
    {
      category: 'Security Engineering',
      icon: <ShieldCheck size={22} />,
      skills: [
        'OAuth / JWT',
        'WebAuthn / FIDO2',
        'TOTP (RFC 6238)',
        'HOTP (RFC 4226)',
        'AES-256-GCM',
        'Argon2id',
        'NIST SP 800-30',
        'CVE / NVD Vulnerability Analysis',
      ],
    },
    {
      category: 'Cloud, Practices & Tools',
      icon: <Wrench size={22} />,
      skills: [
        'Microsoft Azure',
        'Azure Blob Storage',
        'Git & GitHub',
        'GitHub Actions / CI-CD',
        'Agile / Scrum',
        'Code Review',
        'pytest',
        'Postman',
        'Jupyter',
        'Cursor & VS Code',
      ],
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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
        ease: 'easeOut' as const,
      },
    },
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
          <p
            className={`mt-6 text-lg md:text-xl max-w-2xl mx-auto ${
              darkMode ? 'text-primary-200' : 'text-primary-600'
            }`}
          >
            The full toolkit — from production agentic AI to the full-stack platforms it runs inside.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid md:grid-cols-2 gap-8"
        >
          {skillCategories.map((cat) => (
            <motion.div
              key={cat.category}
              variants={itemVariants}
              className={`rounded-2xl p-6 ${
                darkMode
                  ? 'bg-primary-400/10 border border-primary-400/20'
                  : 'bg-white border border-primary-100 shadow-lg'
              }`}
            >
              <div className="flex items-center gap-3 mb-5">
                <div
                  className={`p-2 rounded-lg ${
                    darkMode
                      ? 'bg-primary-400/20 text-accent-400'
                      : 'bg-accent-50 text-accent-600'
                  }`}
                >
                  {cat.icon}
                </div>
                <h3
                  className={`text-xl font-display font-bold ${
                    darkMode ? 'text-white' : 'text-primary-500'
                  }`}
                >
                  {cat.category}
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill) => (
                  <motion.span
                    key={skill}
                    whileHover={{ scale: 1.06, y: -2 }}
                    className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium cursor-default transition-colors ${
                      darkMode
                        ? 'bg-primary-400/20 text-accent-400 border border-primary-400/30 hover:border-accent-400/60'
                        : 'bg-accent-50 text-accent-600 border border-accent-200 hover:border-accent-400'
                    }`}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Skills
