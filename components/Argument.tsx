import Reveal from './Reveal'

export default function Argument() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <Reveal>
        <h2 className="font-mono text-eyebrow uppercase text-grounded dark:text-grounded-dark mb-6">
          The argument
        </h2>
        <p className="font-sans text-body-lg text-ink dark:text-paper measure">
          Nucleus One needed a chatbot that couldn&apos;t become a way around its own permission model.
          RepoWarden needed a review agent that couldn&apos;t write to disk it hadn&apos;t been authorized to
          touch. Project-Ease needed one law firm&apos;s matters kept out of another&apos;s results, enforced
          server-side rather than trusted from the client. The pattern is the same each time:
          he builds the boundary, not just the feature — the conventional software the intelligent
          system has to live inside is treated as part of the engineering problem, not as scaffolding
          around it.
        </p>
      </Reveal>
    </section>
  )
}
