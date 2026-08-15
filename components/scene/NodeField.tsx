'use client'

import { useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import type { MutableRefObject } from 'react'

// Colors are fixed regardless of site light/dark mode — the canvas is its own dark
// atmosphere. Values match the site's --grounded-dark / --gated-dark / --graphite-dark
// tokens so the scene, the status badges, and the case-study diagrams read as one system.
const NEUTRAL = new THREE.Color('#5B6270')
const GROUNDED = new THREE.Color('#4FC3C0')
const GATED = new THREE.Color('#E0808A')

interface NodeFieldProps {
  progress: MutableRefObject<number>
  nodeCount: number
}

export default function NodeField({ progress, nodeCount }: NodeFieldProps) {
  const meshRef = useRef<THREE.InstancedMesh>(null)
  const groupRef = useRef<THREE.Group>(null)
  const boundaryRef = useRef<THREE.Mesh>(null)

  const { basePositions, distances, authorized, maxDistance } = useMemo(() => {
    const basePositions: THREE.Vector3[] = []
    const distances: number[] = []
    const authorized: boolean[] = []
    for (let i = 0; i < nodeCount; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const r = 2.4 + Math.random() * 2.8
      const x = r * Math.sin(phi) * Math.cos(theta)
      const y = r * Math.sin(phi) * Math.sin(theta) * 0.5
      const z = r * Math.cos(phi) * 0.75
      const pos = new THREE.Vector3(x, y, z)
      basePositions.push(pos)
      distances.push(pos.length())
      authorized.push(Math.random() < 0.62)
    }
    return { basePositions, distances, authorized, maxDistance: Math.max(...distances) }
  }, [nodeCount])

  // All per-node working state lives in plain arrays/typed arrays, created once here and
  // mutated in place inside useFrame — never reallocated per frame.
  const resolved = useMemo(() => new Uint8Array(nodeCount), [nodeCount])
  const current = useMemo(() => basePositions.map((p) => p.clone()), [basePositions])
  const currentColor = useMemo(() => basePositions.map(() => NEUTRAL.clone()), [basePositions])
  const dummy = useMemo(() => new THREE.Object3D(), [])
  const targetPos = useMemo(() => new THREE.Vector3(), [])
  const targetColor = useMemo(() => new THREE.Color(), [])

  useFrame((state, rawDelta) => {
    const mesh = meshRef.current
    if (!mesh) return
    const delta = Math.min(rawDelta, 1 / 30)
    const t = state.clock.elapsedTime
    const resolveRadius = progress.current * maxDistance * 1.05

    if (boundaryRef.current) {
      boundaryRef.current.scale.setScalar(Math.max(0.001, resolveRadius))
      const mat = boundaryRef.current.material as THREE.MeshBasicMaterial
      mat.opacity = progress.current > 0.02 && progress.current < 0.97 ? 0.1 : 0
    }

    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.035
    }

    const damp = 1 - Math.exp(-3 * delta)

    for (let i = 0; i < nodeCount; i++) {
      if (!resolved[i] && distances[i] <= resolveRadius) {
        resolved[i] = 1
      }

      if (resolved[i]) {
        if (authorized[i]) {
          targetPos.copy(basePositions[i])
          targetColor.copy(GROUNDED)
        } else {
          targetPos.set(basePositions[i].x, basePositions[i].y - 1.7, basePositions[i].z)
          targetColor.copy(GATED)
        }
      } else {
        const bob = Math.sin(t * 0.6 + i) * 0.045
        targetPos.set(basePositions[i].x, basePositions[i].y + bob, basePositions[i].z)
        targetColor.copy(NEUTRAL)
      }

      current[i].lerp(targetPos, damp)
      currentColor[i].lerp(targetColor, damp)

      dummy.position.copy(current[i])
      dummy.scale.setScalar(resolved[i] && !authorized[i] ? 0.55 : 1)
      dummy.rotation.set(0, 0, 0)
      dummy.updateMatrix()
      mesh.setMatrixAt(i, dummy.matrix)
      mesh.setColorAt(i, currentColor[i])
    }

    mesh.instanceMatrix.needsUpdate = true
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true
  })

  return (
    <group ref={groupRef}>
      <instancedMesh ref={meshRef} args={[undefined, undefined, nodeCount]} frustumCulled={false}>
        <sphereGeometry args={[0.06, 10, 10]} />
        <meshBasicMaterial toneMapped={false} />
      </instancedMesh>
      <mesh ref={boundaryRef}>
        <sphereGeometry args={[1, 24, 24]} />
        <meshBasicMaterial color="#E0808A" transparent opacity={0} wireframe />
      </mesh>
    </group>
  )
}
