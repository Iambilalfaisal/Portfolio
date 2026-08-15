'use client'

import dynamic from 'next/dynamic'
import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import StaticFallback from './scene/StaticFallback'
import { shouldSkip3D, shouldReduceQuality } from '@/lib/device-capability'
import type { Role } from './scene/roles'
import { roleLabel } from './scene/roles'

gsap.registerPlugin(ScrollTrigger)

const Scene3D = dynamic(() => import('./scene/Scene3D'), { ssr: false })

const QUALITY: Record<'full' | 'reduced', { nodeCount: number; dpr: [number, number] }> = {
  full: { nodeCount: 220, dpr: [1, 2] },
  reduced: { nodeCount: 90, dpr: [1, 1] },
}

const ROLES: Role[] = ['engineer', 'guest']

export default function HeroScene() {
  const [mode, setMode] = useState<'static' | 'full' | 'reduced'>('static')
  const [role, setRole] = useState<Role>('engineer')
  const [heroInView, setHeroInView] = useState(true)
  const containerRef = useRef<HTMLDivElement>(null)
  const progress = useRef(0)

  // Pre-flight capability check. Static (already rendered, both server- and client-side)
  // is the safe default; we only opt into the 3D scene once every condition is confirmed —
  // reduced motion, WebGL support, connection speed, and device power are all checked here.
  // Mobile and modest-core devices still get the real scene, just lighter (fewer nodes,
  // capped DPR) rather than skipped outright — the live low-fps watcher below is the
  // remaining safety net if a given device turns out too weak for even that.
  //
  // Deferred via requestIdleCallback: mounting Three.js/R3F costs real main-thread time
  // (bundle parse + WebGL context + shader compile) regardless of node count, so doing it
  // immediately on hydration competes with the page's own initial interactivity. Idle
  // scheduling moves that cost after the browser's already caught up, instead of removing it.
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

  // Drives the role-switcher's visibility directly off whether the hero is actually on
  // screen, rather than CSS position:sticky — sticky's "containing block" turned out to
  // release early here (nested inside an absolutely-positioned full-bleed background), and
  // an explicit observer is easier to reason about and debug than fighting that further.
  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => setHeroInView(entry.isIntersecting), {
      threshold: 0,
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (mode === 'static' || !containerRef.current) return
    const trigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top bottom',
      end: 'bottom top',
      onUpdate: (self) => {
        progress.current = self.progress
      },
    })
    return () => trigger.kill()
  }, [mode])

  const fallBackToStatic = () => setMode('static')

  return (
    <div className="relative w-full h-full">
      {/* The visual itself — canvas or static SVG — carries no information of its own that
          isn't also stated as text (see the sr-only paragraph in Hero.tsx), so it's hidden
          from assistive tech entirely. The role switcher below is a real control and lives
          outside this boundary precisely so it isn't hidden along with the decoration. */}
      <div ref={containerRef} className="w-full h-full" aria-hidden="true">
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

      {/* Fixed to the viewport, not the hero — otherwise a control positioned near the
          hero's own top would scroll away long before the (much taller) hero itself, and
          the resolve sequence it controls, has finished playing out. Only rendered while
          the hero is actually on screen, so it doesn't linger over later sections. */}
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
    </div>
  )
}
