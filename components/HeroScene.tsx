'use client'

import dynamic from 'next/dynamic'
import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import StaticFallback from './scene/StaticFallback'
import { shouldSkip3D } from '@/lib/device-capability'

gsap.registerPlugin(ScrollTrigger)

const Scene3D = dynamic(() => import('./scene/Scene3D'), { ssr: false })

export default function HeroScene() {
  const [mode, setMode] = useState<'static' | '3d'>('static')
  const containerRef = useRef<HTMLDivElement>(null)
  const progress = useRef(0)

  // Pre-flight capability check. Static (already rendered, both server- and client-side)
  // is the safe default; we only opt into the 3D scene once every condition is confirmed —
  // reduced motion, WebGL support, connection speed, and device power are all checked here.
  useEffect(() => {
    if (!shouldSkip3D()) {
      setMode('3d')
    }
  }, [])

  useEffect(() => {
    if (mode !== '3d' || !containerRef.current) return
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
      {mode === '3d' ? (
        <Scene3D
          progress={progress}
          nodeCount={220}
          dpr={[1, 2]}
          onContextLost={fallBackToStatic}
          onSustainedLowFps={fallBackToStatic}
        />
      ) : (
        <StaticFallback />
      )}
    </div>
  )
}
