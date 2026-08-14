import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Briefcase, Calendar, MapPin } from 'lucide-react'

interface ExperienceItem {
  title: string
  company: string
  location: string
  period: string
  note?: string
  description: string[]
  tools?: string[]
  type: 'full-time' | 'internship' | 'contract'
}

interface ModuleItem {
  name: string
  role: string
  description: string
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
      title: 'Associate Software Engineer',
      company: 'Acme One',
      location: 'Lahore, Pakistan',
      period: 'March 2026 – Present',
      type: 'full-time',
      description: [
        'Build LangChain and LangGraph agentic pipelines inside Nucleus One: multi-step chains, tool-calling agents with custom tool definitions, stateful graphs, and human-in-the-loop approval steps, integrated with the platform’s ASP.NET Core 8 APIs and SQL Server data layer.',
        'Implemented LiveKit voice agents for a real-time AI assistant on a construction-site management platform, building the agent-worker architecture that handles live audio streams and LLM-driven responses over WebRTC.',
        'Sole engineer on the Project-One module, delivered end to end from SQL Server schema through ASP.NET Core 8 services to the React/TypeScript interface: Epic → Feature → Story → Task hierarchies, sprint planning, Kanban boards, backlog management, analytics dashboards.',
        'Authored the HR-One service layer covering onboarding, offboarding and evaluation workflows, and deployed its SQL Server schema.',
        'Built the platform authentication controller with JWT, RBAC and secure session handling.',
        'Shipped TimeTrace to production with its backend reporting engine, and tuned queries and indexes for reporting workloads.',
        'Uses Azure AI Foundry for model management and evaluation, and runs Llama 3.1 locally through Ollama for offline inference and pipeline testing.',
        'Client-side state management with Zustand and React Query; responsive interfaces with Tailwind CSS; frontend breadth extends across Next.js, Vue.js and Laravel through additional client-facing project work.',
        'Participates in code review, sprint planning and technical design discussions; maintains technical documentation across owned modules.',
      ],
      tools: [
        'LangChain / LangGraph',
        'ASP.NET Core 8',
        'SQL Server',
        'LiveKit / WebRTC',
        'Azure AI Foundry',
        'Ollama / Llama 3.1',
        'React / TypeScript',
        'Zustand',
        'React Query',
        'Tailwind CSS',
      ],
    },
    {
      title: 'Artificial Intelligence Intern',
      company: 'Acme One',
      location: 'Lahore, Pakistan',
      period: 'July 2025 – March 2026',
      note: 'Converted early into the full-time engineering role above.',
      type: 'internship',
      description: [
        'Engineered and deployed a Retrieval-Augmented Generation chatbot into Nucleus One’s production environment, letting employees ask open-ended questions in natural language and get answers drawn from live platform data across the roughly 100-table SQL Server schema. Owned the feature from prototype through go-live.',
        'Made retrieval permission-aware: every request is resolved against the asking user’s existing authorisation in the application, so the chatbot can only surface records that user is already entitled to see.',
        'Improved retrieval grounding through prompt engineering and iteration on chunking strategy and embedding configuration, measured against answer accuracy on internal documents.',
        'Built and evaluated NLP and text-classification models in Python with pandas, NumPy and scikit-learn — data cleaning, exploratory analysis, feature engineering, model comparison — then deployed the selected sentiment model behind REST endpoints in a production web application.',
        'Performed end-to-end data preparation on internal company datasets and iterated on feature selection and model choice to improve classification accuracy.',
      ],
      tools: [
        'Python',
        'RAG',
        'LangChain',
        'scikit-learn',
        'pandas',
        'NumPy',
        'SQL Server',
      ],
    },
  ]

  const modules: ModuleItem[] = [
    {
      name: 'Project-One',
      role: 'Sole engineer',
      description: 'Work-item tracking with hierarchical Epic, Feature, Story and Task structures, sprint planning, Kanban boards, backlog management, analytics dashboards.',
    },
    {
      name: 'HR-One',
      role: 'Service layer + schema',
      description: 'Employee profile management, department and designation hierarchies, employment history, attendance tracking, HR metrics dashboards.',
    },
    {
      name: 'Ops-One',
      role: 'Contributor',
      description: 'Asset lifecycle management with QR code tracking, automated expense processing with receipt scanning, approval workflows, reimbursement processing.',
    },
    {
      name: 'TimeTrace',
      role: 'Shipped to production',
      description: 'Time-tracking module with a backend reporting engine, including query and index tuning for reporting workloads.',
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
        ease: 'easeOut' as const,
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
          <p
            className={`mt-6 text-lg md:text-xl max-w-2xl mx-auto ${
              darkMode ? 'text-primary-200' : 'text-primary-600'
            }`}
          >
            Over a year, continuous, at Acme One — a technology consulting and solutions provider
            building Nucleus One, a multi-module enterprise platform.
          </p>
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

                  {exp.note && (
                    <p
                      className={`text-sm italic mb-4 ${
                        darkMode ? 'text-primary-300' : 'text-primary-500'
                      }`}
                    >
                      {exp.note}
                    </p>
                  )}

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

          {/* Nucleus One modules touched */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12 md:pl-20"
          >
            <h3
              className={`text-lg font-display font-bold mb-6 ${
                darkMode ? 'text-white' : 'text-primary-500'
              }`}
            >
              Nucleus One Modules Touched
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {modules.map((mod) => (
                <div
                  key={mod.name}
                  className={`rounded-xl p-5 ${
                    darkMode
                      ? 'bg-primary-400/10 border border-primary-400/20'
                      : 'bg-white border border-primary-100 shadow'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4
                      className={`font-bold ${darkMode ? 'text-white' : 'text-primary-600'}`}
                    >
                      {mod.name}
                    </h4>
                    <span
                      className={`text-xs font-semibold px-2 py-1 rounded ${
                        darkMode ? 'bg-accent-400/20 text-accent-400' : 'bg-accent-50 text-accent-600'
                      }`}
                    >
                      {mod.role}
                    </span>
                  </div>
                  <p className={`text-sm ${darkMode ? 'text-primary-300' : 'text-primary-500'}`}>
                    {mod.description}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Experience
