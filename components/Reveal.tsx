'use client'

import { useEffect, useRef, type ReactNode } from 'react'

/**
 * Content wrapper for scroll-in choreography. Visible by default in every case — no JS,
 * reduced motion, or slow connection — because the hidden state only exists behind the
 * `.motion-ready` class that layout.tsx's beforeInteractive script adds (and only when
 * prefers-reduced-motion is not set). That script runs before first paint, so there's no
 * flash of hidden-then-shown content the way the earlier Framer Motion whileInView version
 * had (see the git history on this file for that bug).
 *
 * IntersectionObserver + a CSS transition, not GSAP: this is a plain fade/rise applied to
 * dozens of small elements per page, and doesn't need ScrollTrigger's scrubbing or timeline
 * features — those are reserved for the hero scene's scroll-linked camera and resolve
 * sequence, where scroll position itself drives the animation rather than triggering it.
 */
export default function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode
  delay?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('is-visible')
          observer.disconnect()
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -10% 0px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      data-reveal
      className={className}
      style={delay ? { transitionDelay: `${delay}s` } : undefined}
    >
      {children}
    </div>
  )
}
