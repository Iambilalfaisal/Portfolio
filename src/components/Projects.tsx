import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ExternalLink, Github } from 'lucide-react'

interface Project {
  title: string
  description: string
  image: string
  technologies: string[]
  demoUrl?: string
  codeUrl?: string
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
      title: 'NucleusOne Platform',
      description:
        'A comprehensive business management platform that centralizes multiple integrated applications for organizations. Contributed to developing core features across various modules including TimeSheet-One, Project-One, Binary-One, and Ops-One. Built responsive user interfaces with React, developed secure backend APIs with .NET, and optimized database queries in MSSQL.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
      technologies: ['React', 'TypeScript', '.NET', 'C#', 'MSSQL', 'RESTful APIs'],
      demoUrl: '#',
      codeUrl: '#',
      featured: true,
    },
    {
      title: 'Project-One Application',
      description:
        'A comprehensive project management and work item tracking system designed for agile development teams. Developed core features including work item management with hierarchical structures (Epic, Feature, User Story, Task), sprint planning and management, Kanban boards, backlog management, and comprehensive analytics dashboards.',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
      technologies: ['React', 'TypeScript', '.NET', 'Zustand', 'React Query', 'MSSQL'],
      demoUrl: '#',
      codeUrl: '#',
    },
    {
      title: 'TimeSheet-One Application',
      description:
        'A professional time tracking and project management platform designed to streamline team productivity. Developed key features including real-time time tracking, attendance management, and comprehensive reporting dashboards. Built responsive React components, implemented secure authentication systems, and optimized database queries.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
      technologies: ['React', 'TypeScript', '.NET', 'MSSQL', 'Authentication'],
      demoUrl: '#',
      codeUrl: '#',
    },
    {
      title: 'Ops-One Application',
      description:
        'A comprehensive operations management platform that streamlines asset tracking, expense management, and workflow automation for organizations. Developed key features including complete asset lifecycle management with QR code tracking, automated expense processing with receipt scanning and approval workflows, and comprehensive analytics dashboards.',
      image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=600&fit=crop',
      technologies: ['React', 'TypeScript', '.NET', 'MSSQL', 'Role-Based Access'],
      demoUrl: '#',
      codeUrl: '#',
    },
    {
      title: 'HR-One Application',
      description:
        'A comprehensive Human Resources Management System designed to streamline all HR operations for organizations. Developed core features including employee profile management, department and designation assignment with hierarchical structures, employment history tracking, attendance management, and comprehensive HR dashboards with key metrics.',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop',
      technologies: ['React', 'TypeScript', '.NET', 'MSSQL', 'Authentication'],
      demoUrl: '#',
      codeUrl: '#',
    },
    {
      title: 'AI-Powered Sentiment Analysis System',
      description:
        'Developed a sentiment analysis system using Machine Learning and Deep Learning techniques for classification tasks. The project involved data preprocessing, feature engineering, model training with scikit-learn, and deployment of the model for real-time analysis. Integrated into a web application using Python backend and React frontend.',
      image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&h=600&fit=crop',
      technologies: ['Python', 'scikit-learn', 'pandas', 'React', 'ML', 'Deep Learning'],
      demoUrl: '#',
      codeUrl: '#',
    },
    {
      title: 'RAG-Based Information Retrieval System',
      description:
        'Explored and implemented a Retrieval-Augmented Generation (RAG) system to enhance information retrieval capabilities. The project involved working with transformer architectures, fine-tuning language models, and building a system that combines retrieval and generation for accurate and context-aware responses.',
      image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&h=600&fit=crop',
      technologies: ['Python', 'Transformers', 'LLMs', 'RAG', 'NLP', 'Vector Databases'],
      demoUrl: '#',
      codeUrl: '#',
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
        ease: [0.6, -0.05, 0.01, 0.99],
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
            A collection of projects showcasing my expertise in AI, machine
            learning, and modern web development.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              variants={itemVariants}
              whileHover={{
                y: -15,
                scale: 1.02,
                transition: { duration: 0.3 },
              }}
              className={`group relative rounded-2xl overflow-hidden transition-all duration-300 ${
                darkMode
                  ? 'bg-primary-800/50 border border-primary-700/50 hover:border-accent-500/80 hover:shadow-2xl hover:shadow-accent-500/30 backdrop-blur-sm'
                  : 'bg-white border border-primary-200 shadow-lg hover:border-accent-500/80 hover:shadow-2xl hover:shadow-accent-500/30'
              } ${project.featured ? 'md:col-span-2 lg:col-span-1' : ''}`}
            >
              <div className="relative h-48 overflow-hidden">
                <motion.img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.15 }}
                  transition={{ duration: 0.5 }}
                />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-primary-500/90 via-primary-500/50 to-transparent"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileHover={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    className={`px-6 py-3 rounded-lg bg-gradient-to-r from-accent-500 via-electric-500 to-vibrant-500 text-white font-semibold shadow-lg`}
                    whileHover={{ scale: 1.15, rotate: 2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    View Project
                  </motion.div>
                </motion.div>
              </div>

              <div className="p-6">
                <h3
                  className={`text-xl font-display font-bold mb-3 ${
                    darkMode ? 'text-white' : 'text-primary-500'
                  }`}
                >
                  {project.title}
                </h3>
                <p
                  className={`text-sm mb-4 leading-relaxed ${
                    darkMode ? 'text-primary-200' : 'text-primary-600'
                  }`}
                >
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech, techIndex) => (
                    <motion.span
                      key={tech}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                      transition={{ delay: (index * 0.1) + (techIndex * 0.05) + 0.3 }}
                      whileHover={{ scale: 1.1, y: -2 }}
                      className={`px-3 py-1 rounded-full text-xs font-medium cursor-default ${
                        darkMode
                          ? 'bg-primary-400/20 text-accent-400 border border-primary-400/30'
                          : 'bg-accent-50 text-accent-600 border border-accent-200'
                      }`}
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>

                <div className="flex gap-4">
                  {project.demoUrl && (
                    <motion.a
                      href={project.demoUrl}
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
                      <motion.span
                        className="absolute inset-0 bg-gradient-to-r from-electric-600 via-accent-600 to-vibrant-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        initial={false}
                      />
                      <ExternalLink size={16} className="relative z-10" />
                      <span className="relative z-10">Demo</span>
                    </motion.a>
                  )}
                  {project.codeUrl && (
                    <motion.a
                      href={project.codeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{
                        scale: 1.08,
                        backgroundColor: darkMode ? 'rgba(79, 156, 255, 0.15)' : 'rgba(79, 156, 255, 0.1)',
                      }}
                      whileTap={{ scale: 0.95 }}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold border-2 transition-all ${
                        darkMode
                          ? 'border-accent-400 text-accent-400'
                          : 'border-accent-400 text-accent-400'
                      }`}
                    >
                      <Github size={16} />
                      Code
                    </motion.a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Projects

