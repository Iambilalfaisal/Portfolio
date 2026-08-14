'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowDown } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative mx-auto max-w-6xl px-6 pt-20 pb-24 md:pt-28 md:pb-32">
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="font-mono text-eyebrow uppercase text-grounded dark:text-grounded-dark mb-6"
      >
        Associate Software Engineer, Acme One
      </motion.p>

      {/* Not animated: this is the LCP element — it must paint immediately, not after a transition. */}
      <h1 className="font-display text-display font-bold max-w-4xl text-balance">
        He builds intelligent systems that reach production — and the conventional software they run inside.
      </h1>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.35 }}
        className="mt-10"
      >
        <Link
          href="#selected-work"
          className="inline-flex items-center gap-2 font-mono text-eyebrow uppercase border border-ink dark:border-paper px-5 py-3 rounded-md hover:bg-ink hover:text-paper dark:hover:bg-paper dark:hover:text-ink transition-colors"
        >
          View selected work
          <ArrowDown size={14} />
        </Link>
      </motion.div>

      {/* Reserved space for the signature 3D scene (Phase 5). Static placeholder now so
          layout never shifts once the canvas mounts. */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="mt-20 aspect-[16/9] md:aspect-[21/9] rounded-2xl border border-hairline dark:border-hairline-dark bg-gradient-to-br from-grounded-subtle to-paper dark:from-grounded-subtle-dark dark:to-ink flex items-center justify-center"
        aria-hidden="true"
      >
        <span className="font-mono text-eyebrow uppercase text-graphite dark:text-graphite-dark">
          Signature scene — permission-aware retrieval
        </span>
      </motion.div>
      <p className="sr-only">
        An illustration of retrieval requests being checked against a user&apos;s authorization before
        results resolve — the same permission-aware retrieval architecture described in the Nucleus One
        case study.
      </p>
    </section>
  )
}
