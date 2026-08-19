import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { caseStudies } from '@/lib/content'
import StatusBadge from './StatusBadge'
import Reveal from './Reveal'

export default function SelectedWork() {
  return (
    <section id="selected-work" className="mx-auto max-w-6xl px-6 py-24 scroll-mt-16">
      <Reveal>
        <h2 className="font-mono text-eyebrow uppercase text-grounded-dark mb-6">
          Selected work
        </h2>
      </Reveal>

      <div className="grid gap-6 md:grid-cols-3">
        {caseStudies.map((project, i) => (
          <Reveal key={project.slug} delay={i * 0.1}>
            <Link
              href={`/work/${project.slug}`}
              className="group flex h-full flex-col rounded-2xl border border-paper/10 bg-ink/50 backdrop-blur-md p-6 hover:border-paper/30 hover:bg-ink/65 transition-colors"
            >
              <div className="flex items-start justify-between gap-3 mb-4">
                <h3 className="font-display text-h4 font-semibold text-paper">{project.title}</h3>
                <ArrowUpRight
                  size={18}
                  className="shrink-0 text-graphite-dark group-hover:text-paper transition-colors"
                />
              </div>
              <StatusBadge status={project.status} variant="dark" />
              <p className="font-sans text-body text-graphite-dark mt-4 mb-6">
                {project.tagline}
              </p>
              <p className="font-mono text-eyebrow text-graphite-dark mt-auto pt-4 border-t border-paper/10">
                {project.stack.slice(0, 4).join(' · ')}
              </p>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
