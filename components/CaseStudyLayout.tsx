import Link from 'next/link'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import type { CaseStudy } from '@/lib/content'
import StatusBadge from './StatusBadge'
import Reveal from './Reveal'

const sectionOrder: Array<{ key: keyof CaseStudy['sections']; label: string }> = [
  { key: 'problem', label: 'The problem' },
  { key: 'approach', label: 'The approach' },
  { key: 'decision', label: 'The interesting decision' },
  { key: 'differently', label: 'What I’d do differently' },
]

export default function CaseStudyLayout({ study }: { study: CaseStudy }) {
  return (
    <article className="mx-auto max-w-3xl px-6 py-16">
      <Link
        href="/#selected-work"
        className="inline-flex items-center gap-2 font-mono text-eyebrow uppercase text-graphite dark:text-graphite-dark hover:text-ink dark:hover:text-paper transition-colors mb-10"
      >
        <ArrowLeft size={14} />
        Work
      </Link>

      <h1 className="font-display text-h1 font-bold">{study.title}</h1>
      <p className="font-sans text-body-lg text-graphite dark:text-graphite-dark mt-2">{study.tagline}</p>

      <div className="flex flex-wrap items-center gap-4 mt-6">
        <StatusBadge status={study.status} />
        {study.githubUrl && (
          <a
            href={study.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-mono text-eyebrow uppercase text-graphite dark:text-graphite-dark hover:text-ink dark:hover:text-paper transition-colors"
          >
            GitHub
            <ArrowUpRight size={12} />
          </a>
        )}
      </div>

      <p className="font-mono text-eyebrow text-graphite dark:text-graphite-dark mt-6 pb-8 border-b border-hairline dark:border-hairline-dark">
        {study.stack.join(' · ')}
      </p>

      <div className="space-y-14 mt-10">
        {sectionOrder.map(({ key, label }) => (
          <Reveal key={key}>
            <h2 className="font-mono text-eyebrow uppercase text-grounded dark:text-grounded-dark mb-4">
              {label}
            </h2>
            <p className="font-sans text-body text-ink dark:text-paper measure">{study.sections[key]}</p>
          </Reveal>
        ))}
      </div>
    </article>
  )
}
