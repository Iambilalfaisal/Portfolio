import type { Metadata } from 'next'
import Image from 'next/image'
import { Download } from 'lucide-react'
import { skillCategories, compactProjects } from '@/lib/content'
import StatusBadge from '@/components/StatusBadge'
import Reveal from '@/components/Reveal'

export const metadata: Metadata = {
  title: 'About',
  description:
    'Bio, education, certifications and full skills inventory for M Bilal Faisal — Associate Software Engineer at Acme One.',
  alternates: { canonical: '/about' },
}

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <Reveal>
        <div className="flex flex-col sm:flex-row gap-8 items-start mb-16">
          <Image
            src="/1754093305476.jpg"
            alt="M Bilal Faisal"
            width={128}
            height={128}
            className="rounded-full object-cover"
            priority
          />
          <div>
            <h1 className="font-display text-h1 font-bold">About</h1>
            <p className="font-sans text-body-lg text-graphite dark:text-graphite-dark mt-2 measure">
              Associate Software Engineer at Acme One, Lahore, Pakistan.
            </p>
          </div>
        </div>
      </Reveal>

      <Reveal>
        <div className="space-y-5 font-sans text-body text-ink dark:text-paper measure mb-16">
          <p>
            Associate Software Engineer at Acme One, building LangChain and LangGraph agentic pipelines
            and a permission-aware Retrieval-Augmented Generation chatbot inside Nucleus One, a
            multi-module enterprise platform. Sole engineer on the Project-One module, delivered end
            to end from SQL Server schema through ASP.NET Core 8 services to a React/TypeScript
            interface.
          </p>
          <p>
            Final-year BS in Data Science student at the University of Management and Technology
            (UMT), Lahore, researching transformer architectures, large language models and
            retrieval-augmented generation alongside full-time engineering work — the internship
            converted early into the full-time role.
          </p>
          <p>Builds intelligent systems that actually reach production, and the conventional software those features have to live inside.</p>
        </div>
      </Reveal>

      <Reveal>
        <div className="mb-16">
          <h2 className="font-mono text-eyebrow uppercase text-grounded dark:text-grounded-dark mb-4">
            Education
          </h2>
          <p className="font-sans text-body text-ink dark:text-paper">
            Bachelor of Science in Data Science
          </p>
          <p className="font-mono text-eyebrow uppercase text-graphite dark:text-graphite-dark mt-1">
            University of Management and Technology (UMT), Lahore · 2023 – 2027, final year
          </p>
          <p className="font-sans text-small text-graphite dark:text-graphite-dark mt-2 measure">
            Coursework: machine learning, deep learning, artificial intelligence, information
            security, database systems, data structures and algorithms.
          </p>
        </div>
      </Reveal>

      <Reveal>
        <div className="mb-16">
          <h2 className="font-mono text-eyebrow uppercase text-grounded dark:text-grounded-dark mb-4">
            Certifications
          </h2>
          <p className="font-sans text-body text-ink dark:text-paper measure">
            Anthropic, 2026 — Claude Code in Action; Claude Code 101; AI Fluency: Framework and
            Foundations; AI Capabilities and Limitations; Claude 101.
          </p>
        </div>
      </Reveal>

      <Reveal>
        <div className="mb-16">
          <h2 className="font-mono text-eyebrow uppercase text-grounded dark:text-grounded-dark mb-6">
            Full skills inventory
          </h2>
          <div className="space-y-6">
            {skillCategories.map((cat) => (
              <div key={cat.category}>
                <h3 className="font-display text-h4 font-semibold mb-2">{cat.category}</h3>
                <p className="font-sans text-body text-graphite dark:text-graphite-dark">
                  {cat.skills.join(', ')}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      <Reveal>
        <div className="mb-16">
          <h2 className="font-mono text-eyebrow uppercase text-grounded dark:text-grounded-dark mb-6">
            Additional work
          </h2>
          <div className="space-y-6">
            {compactProjects.map((project) => (
              <div key={project.title} className="rounded-2xl border border-hairline dark:border-hairline-dark p-6">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <h3 className="font-display text-h4 font-semibold">{project.title}</h3>
                  <StatusBadge status={project.status} />
                </div>
                <p className="font-mono text-eyebrow uppercase text-graphite dark:text-graphite-dark mb-3">
                  {project.tagline}
                </p>
                <p className="font-sans text-body text-ink dark:text-paper mb-2">{project.description}</p>
                <p className="font-sans text-small text-graphite dark:text-graphite-dark mb-4">{project.detail}</p>
                <p className="font-mono text-eyebrow text-graphite dark:text-graphite-dark">
                  {project.stack.join(' · ')}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      <Reveal>
        <div>
          <h2 className="font-mono text-eyebrow uppercase text-grounded dark:text-grounded-dark mb-4">
            CV
          </h2>
          <a
            href="/Bilal-Resume.pdf"
            download
            className="inline-flex items-center gap-2 font-mono text-eyebrow uppercase border border-ink dark:border-paper px-5 py-3 rounded-md hover:bg-ink hover:text-paper dark:hover:bg-paper dark:hover:text-ink transition-colors"
          >
            <Download size={14} />
            Download CV
          </a>
        </div>
      </Reveal>
    </div>
  )
}
