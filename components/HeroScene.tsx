'use client'

import dynamic from 'next/dynamic'
import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import StaticFallback from './scene/StaticFallback'
import { shouldSkip3D, shouldReduceQuality } from '@/lib/device-capability'

gsap.registerPlugin(ScrollTrigger)

const Scene3D = dynamic(() => import('./scene/Scene3D'), { ssr: false })

const QUALITY: Record<'full' | 'reduced', { nodeCount: number; dpr: [number, number] }> = {
  full: { nodeCount: 220, dpr: [1, 2] },
  reduced: { nodeCount: 90, dpr: [1, 1] },
}

export default function HeroScene() {
  const [mode, setMode] = useState<'static' | 'full' | 'reduced'>('static')
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
    <div ref={containerRef} className="w-full h-full" aria-hidden="true">
      {mode !== 'static' ? (
        <Scene3D
          progress={progress}
          nodeCount={QUALITY[mode].nodeCount}
          dpr={QUALITY[mode].dpr}
          onContextLost={fallBackToStatic}
          onSustainedLowFps={fallBackToStatic}
        />
      ) : (
        <StaticFallback />
      )}
    </div>
  )
}
