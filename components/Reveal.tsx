import type { ReactNode } from 'react'

/**
 * Content wrapper — intentionally NOT scroll-animated. An earlier version used Framer
 * Motion's whileInView, but that SSRs an opacity:0 inline style that only resolves once
 * client JS hydrates and an IntersectionObserver fires — on a slow connection that's a
 * real window where page content is invisible. Scroll choreography belongs in Phase 6,
 * built so it never gates content visibility on hydration timing.
 */
export default function Reveal({
  children,
  className,
}: {
  children: ReactNode
  delay?: number
  className?: string
}) {
  return <div className={className}>{children}</div>
}
