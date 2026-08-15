import Link from 'next/link'
import { ArrowDown } from 'lucide-react'
import HeroScene from './HeroScene'

export default function Hero() {
  return (
    <section className="relative min-h-[640px] md:min-h-[85vh] md:max-h-[920px] flex items-end bg-ink">
      {/* Full-bleed background — absolutely positioned so it never participates in
          document flow (no CLS risk) and is always a dark surface, independent of the
          site's light/dark toggle, since it's the scene's own atmosphere. */}
      <div className="absolute inset-0">
        <HeroScene />
      </div>

      {/* Scrim: guarantees WCAG AA contrast for the text below regardless of what's
          happening in the scene behind it — text color here is fixed (paper-on-ink),
          not theme-switched, because the background underneath it is always dark now. */}
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/10 pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-6xl px-6 pt-20 pb-16 md:pb-20 w-full">
        <p className="font-mono text-eyebrow uppercase text-grounded-dark mb-6">
          Associate Software Engineer, Acme One
        </p>

        {/* Not animated: this is the LCP element — it must paint immediately, not after a transition. */}
        <h1 className="font-display text-display font-bold max-w-4xl text-balance text-paper">
          He builds intelligent systems that reach production — and the conventional software they run inside.
        </h1>

        <div className="mt-10">
          <Link
            href="#selected-work"
            className="inline-flex items-center gap-2 font-mono text-eyebrow uppercase border border-paper px-5 py-3 rounded-md text-paper hover:bg-paper hover:text-ink transition-colors"
          >
            View selected work
            <ArrowDown size={14} />
          </Link>
        </div>

        <p className="sr-only">
          An illustration of retrieval requests being checked against a user&apos;s authorization before
          results resolve — the same permission-aware retrieval architecture described in the Nucleus One
          case study. A control lets you switch which user is asking (Engineer or Guest) and see a
          different subset of records authorized each time.
        </p>
      </div>
    </section>
  )
}
