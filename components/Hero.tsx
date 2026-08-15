import Link from 'next/link'
import { ArrowDown } from 'lucide-react'
import HeroScene from './HeroScene'

export default function Hero() {
  return (
    <section className="relative mx-auto max-w-6xl px-6 pt-20 pb-24 md:pt-28 md:pb-32">
      <p className="font-mono text-eyebrow uppercase text-grounded dark:text-grounded-dark mb-6">
        Associate Software Engineer, Acme One
      </p>

      {/* Not animated: this is the LCP element — it must paint immediately, not after a transition. */}
      <h1 className="font-display text-display font-bold max-w-4xl text-balance">
        He builds intelligent systems that reach production — and the conventional software they run inside.
      </h1>

      <div className="mt-10">
        <Link
          href="#selected-work"
          className="inline-flex items-center gap-2 font-mono text-eyebrow uppercase border border-ink dark:border-paper px-5 py-3 rounded-md hover:bg-ink hover:text-paper dark:hover:bg-paper dark:hover:text-ink transition-colors"
        >
          View selected work
          <ArrowDown size={14} />
        </Link>
      </div>

      {/* Reserved space for the signature scene — fixed aspect ratio so mounting the
          canvas (or falling back to the static SVG) never shifts layout. Always a dark
          surface: the scene is its own atmosphere, independent of the site's light/dark
          toggle. */}
      <div className="mt-20 aspect-[16/9] md:aspect-[21/9] rounded-2xl border border-hairline dark:border-hairline-dark bg-ink overflow-hidden">
        <HeroScene />
      </div>
      <p className="sr-only">
        An illustration of retrieval requests being checked against a user&apos;s authorization before
        results resolve — the same permission-aware retrieval architecture described in the Nucleus One
        case study.
      </p>
    </section>
  )
}
