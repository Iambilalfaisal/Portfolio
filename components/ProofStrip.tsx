import { proofPoints } from '@/lib/content'
import Reveal from './Reveal'

export default function ProofStrip() {
  return (
    <section className="border-y border-paper/10 bg-ink/55 backdrop-blur-xl">
      <div className="mx-auto max-w-6xl px-6 py-10 grid gap-6 md:grid-cols-3">
        {proofPoints.map((point, i) => (
          <Reveal key={point} delay={i * 0.08}>
            <p className="font-mono text-eyebrow uppercase text-graphite-dark leading-relaxed">
              {point}
            </p>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
