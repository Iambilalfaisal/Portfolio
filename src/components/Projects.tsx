import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Github, GitBranch, Scale, ShieldCheck, FileWarning } from 'lucide-react'

interface Project {
  title: string
  tagline: string
  description: string
  icon: React.ReactNode
  technologies: string[]
  codeUrl?: string
  badge: string
  featured?: boolean
}

interface ProjectsProps {
  darkMode: boolean
}

const Projects = ({ darkMode }: ProjectsProps) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const projects: Project[] = [
    {
      title: 'RepoWarden',
      tagline: 'Autonomous Code Review and Refactoring Agents',
      description:
        'A two-agent LangGraph system, built as two compiled StateGraphs behind a FastAPI backend, that reviews, evaluates and safely refactors a codebase. The Reviewer agent’s toolset structurally omits the write tool, so it cannot modify the workspace regardless of how it is prompted — safety enforced through tool binding, not instructions. Nothing is written to disk until the user approves, at which point a separate, write-capable Editor agent is constructed. Roughly ten custom tools span directory listing, file reads, code search, dedicated security/performance/quality analysers and structured edit proposals, streamed token-by-token over Server-Sent Events, with MongoDB-backed checkpointing for thread-scoped conversation state and cross-session project memory.',
      icon: <GitBranch size={28} />,
      technologies: ['Python', 'LangGraph', 'LangChain', 'FastAPI', 'MongoDB', 'React 19', 'Vite', 'Monaco'],
      codeUrl: 'https://github.com/Iambilalfaisal/RepoWarden',
      badge: 'Flagship',
      featured: true,
    },
    {
      title: 'Project-Ease',
      tagline: 'Multi-Tenant AI Platform for Law Firms',
      description:
        'In development — an extension of Microsoft’s azure-search-openai-demo reference architecture into a legal-practice platform for Pakistani law firms. Organisation-scoped retrieval sits alongside a shared case-law corpus in a single hybrid BM25 + vector + semantic query, with tenancy enforced server-side from the JWT organisation claim rather than any client-supplied value. A second, temperature-zero model call verifies every answer against its retrieved sources before the user sees it, and a RAGAS evaluation harness is wired into the response path to score faithfulness, answer relevancy and context precision. Also includes matter lifecycle tracking, OCR-assisted document extraction, statutory fee calculation, WhatsApp/Twilio reminders with Whisper transcription, and an Urdu/RTL interface.',
      icon: <Scale size={28} />,
      technologies: ['Python', 'Quart', 'Azure OpenAI', 'Azure AI Search', 'Azure AI Document Intelligence', 'RAGAS', 'React 19'],
      codeUrl: 'https://github.com/Iambilalfaisal/Project-Ease',
      badge: 'In Development',
    },
    {
      title: 'Multi-Factor Authentication Server',
      tagline: 'Information Security Capstone',
      description:
        'HOTP (RFC 4226) and TOTP (RFC 6238) implemented directly from the specifications and validated against pyotp as an independent oracle, with an AES-256-GCM encrypted vault, Argon2id password hashing, WebAuthn/FIDO2 attestation and assertion verification, and an Isolation Forest layer scoring login risk over geographic distance, impossible travel, new-device and unusual-hour features with LLM-generated alerts.',
      icon: <ShieldCheck size={28} />,
      technologies: ['Python', 'scikit-learn', 'Streamlit', 'WebAuthn / FIDO2'],
      badge: 'Capstone',
    },
    {
      title: 'Automated Information Security Risk Assessment Platform',
      tagline: 'NIST SP 800-30 Risk Assessment Application',
      description:
        'Asset, threat and vulnerability registers with live CVE lookups through the NVD API, LLM-generated control recommendations with a rule-based offline fallback, and automated PDF reporting for risk registers, cost-benefit analysis and compliance checklists — served from a Flask REST API backing both Streamlit and React frontends.',
      icon: <FileWarning size={28} />,
      technologies: ['Flask', 'React', 'Streamlit', 'Claude API', 'NVD API'],
      badge: 'Capstone',
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 80, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.6, -0.05, 0.01, 0.99] as const,
      },
    },
  }

  return (
    <section
      id="projects"
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
            Projects
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
            Independent engineering work — agentic AI systems, retrieval-augmented platforms, and
            security engineering built from first principles.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid md:grid-cols-2 gap-8"
        >
          {projects.map((project) => (
            <motion.div
              key={project.title}
              variants={itemVariants}
              whileHover={{
                y: -10,
                scale: 1.01,
                transition: { duration: 0.3 },
              }}
              className={`group relative rounded-2xl overflow-hidden transition-all duration-300 flex flex-col ${
                darkMode
                  ? 'bg-primary-800/50 border border-primary-700/50 hover:border-accent-500/80 hover:shadow-2xl hover:shadow-accent-500/30 backdrop-blur-sm'
                  : 'bg-white border border-primary-200 shadow-lg hover:border-accent-500/80 hover:shadow-2xl hover:shadow-accent-500/30'
              }`}
            >
              <div
                className={`relative px-6 pt-6 pb-4 flex items-start justify-between ${
                  darkMode ? 'bg-primary-900/40' : 'bg-primary-50/60'
                }`}
              >
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                  className={`inline-flex p-3 rounded-xl ${
                    darkMode
                      ? 'bg-gradient-to-br from-accent-500/20 to-vibrant-500/20 text-accent-400'
                      : 'bg-gradient-to-br from-accent-500/10 to-vibrant-500/10 text-accent-600'
                  }`}
                >
                  {project.icon}
                </motion.div>
                <span
                  className={`text-xs font-semibold px-3 py-1 rounded-full ${
                    project.badge === 'In Development'
                      ? darkMode
                        ? 'bg-vibrant-500/20 text-vibrant-400'
                        : 'bg-vibrant-50 text-vibrant-600'
                      : darkMode
                      ? 'bg-accent-400/20 text-accent-400'
                      : 'bg-accent-50 text-accent-600'
                  }`}
                >
                  {project.badge}
                </span>
              </div>

              <div className="p-6 flex flex-col flex-1">
                <h3
                  className={`text-xl font-display font-bold mb-1 ${
                    darkMode ? 'text-white' : 'text-primary-500'
                  }`}
                >
                  {project.title}
                </h3>
                <p
                  className={`text-sm font-medium mb-4 ${
                    darkMode ? 'text-accent-400' : 'text-accent-600'
                  }`}
                >
                  {project.tagline}
                </p>
                <p
                  className={`text-sm mb-6 leading-relaxed flex-1 ${
                    darkMode ? 'text-primary-200' : 'text-primary-600'
                  }`}
                >
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className={`px-3 py-1 rounded-full text-xs font-medium cursor-default ${
                        darkMode
                          ? 'bg-primary-400/20 text-accent-400 border border-primary-400/30'
                          : 'bg-accent-50 text-accent-600 border border-accent-200'
                      }`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {project.codeUrl && (
                  <div className="flex gap-4">
                    <motion.a
                      href={project.codeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{
                        scale: 1.08,
                        boxShadow: '0 8px 25px rgba(79, 156, 255, 0.4)',
                      }}
                      whileTap={{ scale: 0.95 }}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all relative overflow-hidden group ${
                        darkMode
                          ? 'bg-gradient-to-r from-accent-500 via-electric-500 to-vibrant-500 text-white shadow-lg'
                          : 'bg-gradient-to-r from-accent-500 via-electric-500 to-vibrant-500 text-white shadow-lg'
                      }`}
                    >
                      <Github size={16} />
                      View Code
                    </motion.a>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Projects
