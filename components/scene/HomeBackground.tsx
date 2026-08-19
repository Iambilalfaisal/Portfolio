'use client'

import dynamic from 'next/dynamic'
import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import StaticFallback from './StaticFallback'
import { shouldSkip3D, shouldReduceQuality } from '@/lib/device-capability'
import type { Role } from './roles'
import { roleLabel } from './roles'

gsap.registerPlugin(ScrollTrigger)

const Scene3D = dynamic(() => import('./Scene3D'), { ssr: false })

const QUALITY: Record<'full' | 'reduced', { nodeCount: number; dpr: [number, number] }> = {
  full: { nodeCount: 220, dpr: [1, 2] },
  reduced: { nodeCount: 90, dpr: [1, 1] },
}

const ROLES: Role[] = ['engineer', 'guest']

// The home page's signature scene, promoted from a Hero-only banner to a fixed background
// that sits behind every home section. Same capability gating and fallbacks as before
// (see the original HeroScene); what changed is scope, not the safety model.
export default function HomeBackground() {
  const [mode, setMode] = useState<'static' | 'full' | 'reduced'>('static')
  const [role, setRole] = useState<Role>('engineer')
  const [heroInView, setHeroInView] = useState(true)
  const progress = useRef(0)

  useEffect(() => {
    const check = () => {
      if (shouldSkip3D()) return
      setMode(shouldReduceQuality() ? 'reduced' : 'full')
    }
    if (typeof window.requestIdleCallback === 'function') {
      const id = window.requestIdleCallback(check, { timeout: 2000 })
      return () => window.cancelIdleCallback(id)
    }
    const timeout = setTimeout(check, 200)
    return () => clearTimeout(timeout)
  }, [])

  // The "Ask as" role switcher is still a Hero-scoped control — it just now watches a
  // plain element id instead of the canvas's own container, since the canvas itself has
  // grown to cover the whole page.
  useEffect(() => {
    const el = document.getElementById('hero-section')
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => setHeroInView(entry.isIntersecting), {
      threshold: 0,
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  // Progress now tracks the entire home page's scroll range rather than just the hero
  // band: the vault keeps resolving nodes through every section below the fold and is
  // fully resolved (grounded/gated, nothing left neutral) by the time Contact is reached.
  useEffect(() => {
    if (mode === 'static') return
    const trigger = ScrollTrigger.create({
      start: 0,
      end: () => Math.max(1, document.documentElement.scrollHeight - window.innerHeight),
      onUpdate: (self) => {
        progress.current = self.progress
      },
    })
    const refresh = () => ScrollTrigger.refresh()
    window.addEventListener('load', refresh)
    const timeout = setTimeout(refresh, 500)
    return () => {
      trigger.kill()
      window.removeEventListener('load', refresh)
      clearTimeout(timeout)
    }
  }, [mode])

  const fallBackToStatic = () => setMode('static')

  return (
    <>
      {/* Fixed behind all home content (negative z-index), never in document flow — this
          is what lets it persist across the whole scroll instead of just the hero band.
          Carries no information of its own that isn't also stated as text elsewhere (see
          the sr-only paragraph in Hero.tsx), so it stays hidden from assistive tech. */}
      <div className="fixed inset-0 -z-10 bg-ink" aria-hidden="true">
        {mode !== 'static' ? (
          <Scene3D
            progress={progress}
            nodeCount={QUALITY[mode].nodeCount}
            dpr={QUALITY[mode].dpr}
            role={role}
            onContextLost={fallBackToStatic}
            onSustainedLowFps={fallBackToStatic}
          />
        ) : (
          <StaticFallback role={role} />
        )}
      </div>

      {heroInView && (
        <div className="fixed right-4 top-20 md:right-6 flex items-center gap-2 rounded-lg border border-paper/15 bg-ink/60 backdrop-blur px-3 py-2 z-40">
          <span className="font-mono text-[11px] uppercase tracking-wide text-paper/60 mr-1">
            Ask as
          </span>
          {ROLES.map((r) => (
            <button
              key={r}
              type="button"
              aria-pressed={role === r}
              onClick={() => setRole(r)}
              className={`font-mono text-[11px] uppercase tracking-wide px-2.5 py-1 rounded-md border transition-colors ${
                role === r
                  ? 'border-grounded-dark bg-grounded-dark/20 text-grounded-dark'
                  : 'border-paper/20 text-paper/60 hover:text-paper hover:border-paper/40'
              }`}
            >
              {roleLabel[r]}
            </button>
          ))}
        </div>
      )}
    </>
  )
}
