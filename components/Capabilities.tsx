import { skillCategories } from '@/lib/content'
import Reveal from './Reveal'

export default function Capabilities() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <Reveal>
        <h2 className="font-mono text-eyebrow uppercase text-grounded-dark mb-6">
          Capabilities
        </h2>
      </Reveal>

      <div className="grid gap-6 md:grid-cols-2">
        {skillCategories.map((cat, i) => (
          <Reveal key={cat.category} delay={i * 0.05}>
            <div className="rounded-2xl border border-paper/10 bg-ink/50 backdrop-blur-md p-6 h-full">
              <h3 className="font-display text-h4 font-semibold text-paper mb-1">{cat.category}</h3>
              <p className="font-mono text-eyebrow uppercase text-graphite-dark mb-4">
                Used in → {cat.evidence}
              </p>
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill) => (
                  <span
                    key={skill}
                    className="font-mono text-eyebrow px-2.5 py-1 rounded border border-paper/10 text-graphite-dark"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
