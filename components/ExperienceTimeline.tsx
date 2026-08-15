import { experience } from '@/lib/content'
import Reveal from './Reveal'

export default function ExperienceTimeline() {
  return (
    <section id="experience" className="mx-auto max-w-6xl px-6 py-24 scroll-mt-16">
      <Reveal>
        <h2 className="font-mono text-eyebrow uppercase text-grounded dark:text-grounded-dark mb-6">
          Experience
        </h2>
        <p className="font-sans text-body text-graphite dark:text-graphite-dark measure mb-12">
          Over a year, continuous, at Acme One — a technology consulting and solutions provider
          building Nucleus One, a multi-module enterprise platform.
        </p>
      </Reveal>

      <div className="space-y-10">
        {experience.map((entry, i) => (
          <Reveal key={entry.title} delay={i * 0.1}>
            <div className="grid md:grid-cols-[200px_1fr] gap-4 md:gap-10 border-t border-hairline dark:border-hairline-dark pt-8">
              <div>
                <p className="font-mono text-eyebrow uppercase text-graphite dark:text-graphite-dark">
                  {entry.period}
                </p>
                {entry.note && (
                  <p className="font-sans text-small italic text-graphite dark:text-graphite-dark mt-2">
                    {entry.note}
                  </p>
                )}
              </div>
              <div>
                <h3 className="font-display text-h4 font-semibold">{entry.title}</h3>
                <p className="font-mono text-eyebrow uppercase text-graphite dark:text-graphite-dark mt-1 mb-4">
                  {entry.company} · {entry.location}
                </p>
                <ul className="space-y-2">
                  {entry.bullets.map((bullet) => (
                    <li key={bullet} className="font-sans text-body text-ink dark:text-paper measure flex gap-3">
                      <span className="text-grounded dark:text-grounded-dark mt-2.5 h-1 w-1 rounded-full bg-current shrink-0" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
