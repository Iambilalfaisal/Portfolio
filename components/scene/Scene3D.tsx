'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { Suspense, useMemo, useRef, type MutableRefObject } from 'react'
import NodeField from './NodeField'
import type { Role } from './roles'

function CameraRig({ progress }: { progress: MutableRefObject<number> }) {
  useFrame((state, rawDelta) => {
    const delta = Math.min(rawDelta, 1 / 30)
    const t = state.clock.elapsedTime
    // Idle wobble settles down as resolution completes — the camera reads as "arriving
    // somewhere" rather than perpetually drifting once the answer is in.
    const settle = 1 - progress.current * 0.6
    const idleX = Math.sin(t * 0.15) * 0.35 * settle
    const idleY = Math.cos(t * 0.12) * 0.18 * settle
    const targetX = idleX
    const targetY = idleY + progress.current * 0.5
    const targetZ = 12 - progress.current * 2.5
    const damp = 1 - Math.exp(-2 * delta)
    state.camera.position.x += (targetX - state.camera.position.x) * damp
    state.camera.position.y += (targetY - state.camera.position.y) * damp
    state.camera.position.z += (targetZ - state.camera.position.z) * damp
    state.camera.lookAt(0, 0, 0)
  })
  return null
}

function PerformanceWatcher({ onSustainedLowFps }: { onSustainedLowFps: () => void }) {
  const lowFpsSeconds = useRef(0)
  const triggered = useRef(false)

  useFrame((_, rawDelta) => {
    if (triggered.current) return
    const delta = Math.min(rawDelta, 1)
    const fps = 1 / Math.max(delta, 0.0001)
    if (fps < 40) {
      lowFpsSeconds.current += delta
    } else {
      lowFpsSeconds.current = 0
    }
    if (lowFpsSeconds.current >= 2) {
      triggered.current = true
      onSustainedLowFps()
    }
  })

  return null
}

interface Scene3DProps {
  progress: MutableRefObject<number>
  nodeCount: number
  dpr: [number, number]
  role: Role
  onContextLost: () => void
  onSustainedLowFps: () => void
}

// No postprocessing pass: @react-three/postprocessing + postprocessing pushed the lazy
// chunk to ~314KB gzipped, over the 300KB budget, for a bloom effect that isn't load-bearing
// to the scene's concept. The glow on grounded nodes comes from an additive-blended sprite
// in NodeField instead — a texture and a second draw call, not a post-process pipeline.
// Antialiasing comes from the DPR cap rather than an SMAA pass.
export default function Scene3D({ progress, nodeCount, dpr, role, onContextLost, onSustainedLowFps }: Scene3DProps) {
  const glOptions = useMemo(
    () => ({ antialias: true, alpha: true, powerPreference: 'low-power' as const }),
    []
  )

  return (
    <Canvas
      dpr={dpr}
      gl={glOptions}
      camera={{ position: [0, 0, 12], fov: 50 }}
      frameloop="always"
      onCreated={({ gl }) => {
        const canvas = gl.domElement
        const handleLost = (e: Event) => {
          e.preventDefault()
          onContextLost()
        }
        canvas.addEventListener('webglcontextlost', handleLost)
      }}
    >
      <fogExp2 attach="fog" args={['#12151c', 0.05]} />
      <Suspense fallback={null}>
        <CameraRig progress={progress} />
        <PerformanceWatcher onSustainedLowFps={onSustainedLowFps} />
        <NodeField progress={progress} nodeCount={nodeCount} role={role} />
      </Suspense>
    </Canvas>
  )
}
