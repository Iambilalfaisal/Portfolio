'use client'

import { useFrame } from '@react-three/fiber'
import { useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'
import type { MutableRefObject } from 'react'
import type { Role } from './roles'

// Colors are fixed regardless of site light/dark mode — the canvas is its own dark
// atmosphere. Values match the site's --grounded-dark / --gated-dark / --graphite-dark
// tokens so the scene, the status badges, and the case-study diagrams read as one system.
const NEUTRAL = new THREE.Color('#5B6270')
const GROUNDED = new THREE.Color('#4FC3C0')
const GATED = new THREE.Color('#E0808A')

const DUST_COUNT = 90

function makeGlowTexture() {
  const size = 64
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')!
  const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2)
  gradient.addColorStop(0, 'rgba(255,255,255,1)')
  gradient.addColorStop(0.4, 'rgba(255,255,255,0.45)')
  gradient.addColorStop(1, 'rgba(255,255,255,0)')
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, size, size)
  return new THREE.CanvasTexture(canvas)
}

// The vault's core — what the node field now orbits and resolves around, instead of an
// empty origin point. Three nested layers (solid center, two contra-rotating wireframe
// shells) read as a reactor/schema core without needing a modeled asset — five primitives,
// three materials, one draw call each.
function CoreStructure({ progress }: { progress: MutableRefObject<number> }) {
  const shellRef = useRef<THREE.Mesh>(null)
  const shell2Ref = useRef<THREE.Mesh>(null)
  const coreRef = useRef<THREE.Mesh>(null)

  useFrame((state, rawDelta) => {
    const delta = Math.min(rawDelta, 1 / 30)
    if (shellRef.current) {
      shellRef.current.rotation.y += delta * 0.08
      shellRef.current.rotation.x += delta * 0.02
    }
    if (shell2Ref.current) {
      shell2Ref.current.rotation.y -= delta * 0.05
      shell2Ref.current.rotation.z += delta * 0.015
    }
    if (coreRef.current) {
      const pulse = 1 + Math.sin(state.clock.elapsedTime * 1.4) * 0.06
      coreRef.current.scale.setScalar(pulse * (0.9 + progress.current * 0.25))
    }
  })

  return (
    <group>
      <mesh ref={coreRef}>
        <icosahedronGeometry args={[0.85, 1]} />
        <meshBasicMaterial color="#4fc3c0" toneMapped={false} transparent opacity={0.85} />
      </mesh>
      <mesh ref={shellRef}>
        <icosahedronGeometry args={[1.5, 1]} />
        <meshBasicMaterial color="#4fc3c0" wireframe transparent opacity={0.3} toneMapped={false} />
      </mesh>
      <mesh ref={shell2Ref}>
        <icosahedronGeometry args={[2.1, 0]} />
        <meshBasicMaterial color="#9aa1af" wireframe transparent opacity={0.15} toneMapped={false} />
      </mesh>
    </group>
  )
}

interface NodeFieldProps {
  progress: MutableRefObject<number>
  nodeCount: number
  role: Role
}

export default function NodeField({ progress, nodeCount, role }: NodeFieldProps) {
  const meshRef = useRef<THREE.InstancedMesh>(null)
  const glowRef = useRef<THREE.InstancedMesh>(null)
  const groupRef = useRef<THREE.Group>(null)
  const dustRef = useRef<THREE.Points>(null)
  const boundaryRef = useRef<THREE.Mesh>(null)

  const glowTexture = useMemo(() => makeGlowTexture(), [])
  useEffect(() => () => glowTexture.dispose(), [glowTexture])

  // Two independent, deterministic-per-session authorization patterns over the same node
  // positions — "engineer" sees most of the graph, "guest" sees a narrow slice of it.
  // Switching roles doesn't reshuffle the graph or reset which nodes have resolved; it just
  // changes the target each already-resolved node lerps toward, so the transition reads as
  // "the same request re-evaluated," not "a new scene."
  const { basePositions, distances, authorizedByRole, maxDistance } = useMemo(() => {
    const basePositions: THREE.Vector3[] = []
    const distances: number[] = []
    const engineer: boolean[] = []
    const guest: boolean[] = []
    for (let i = 0; i < nodeCount; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const r = 4.2 + Math.random() * 5.2
      const x = r * Math.sin(phi) * Math.cos(theta)
      const y = r * Math.sin(phi) * Math.sin(theta) * 0.5
      const z = r * Math.cos(phi) * 0.75
      const pos = new THREE.Vector3(x, y, z)
      basePositions.push(pos)
      distances.push(pos.length())
      engineer.push(Math.random() < 0.62)
      guest.push(Math.random() < 0.2)
    }
    return {
      basePositions,
      distances,
      authorizedByRole: { engineer, guest } as Record<Role, boolean[]>,
      maxDistance: Math.max(...distances),
    }
  }, [nodeCount])

  const dustPositions = useMemo(() => {
    const arr = new Float32Array(DUST_COUNT * 3)
    for (let i = 0; i < DUST_COUNT; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const r = 8 + Math.random() * 6
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.6
      arr[i * 3 + 2] = r * Math.cos(phi) * 0.9
    }
    return arr
  }, [])

  // All per-node working state lives in plain arrays/typed arrays, created once here and
  // mutated in place inside useFrame — never reallocated per frame.
  const resolved = useMemo(() => new Uint8Array(nodeCount), [nodeCount])
  const current = useMemo(() => basePositions.map((p) => p.clone()), [basePositions])
  const currentColor = useMemo(() => basePositions.map(() => NEUTRAL.clone()), [basePositions])
  const currentGlow = useMemo(() => new Float32Array(nodeCount), [nodeCount])
  const dummy = useMemo(() => new THREE.Object3D(), [])
  const glowDummy = useMemo(() => new THREE.Object3D(), [])
  const targetPos = useMemo(() => new THREE.Vector3(), [])
  const targetColor = useMemo(() => new THREE.Color(), [])

  useFrame((state, rawDelta) => {
    const mesh = meshRef.current
    const glow = glowRef.current
    if (!mesh || !glow) return
    const delta = Math.min(rawDelta, 1 / 30)
    const t = state.clock.elapsedTime
    const resolveRadius = progress.current * maxDistance * 1.05
    const authorized = authorizedByRole[role]

    if (boundaryRef.current) {
      boundaryRef.current.scale.setScalar(Math.max(0.001, resolveRadius))
      const mat = boundaryRef.current.material as THREE.MeshBasicMaterial
      mat.opacity = progress.current > 0.02 && progress.current < 0.97 ? 0.1 : 0
    }

    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.035
    }
    if (dustRef.current) {
      dustRef.current.rotation.y -= delta * 0.012
    }

    const damp = 1 - Math.exp(-3 * delta)
    const glowDamp = 1 - Math.exp(-2.5 * delta)

    for (let i = 0; i < nodeCount; i++) {
      if (!resolved[i] && distances[i] <= resolveRadius) {
        resolved[i] = 1
      }

      const grounded = resolved[i] === 1 && authorized[i]

      if (resolved[i]) {
        if (authorized[i]) {
          targetPos.copy(basePositions[i])
          targetColor.copy(GROUNDED)
        } else {
          targetPos.set(basePositions[i].x, basePositions[i].y - 2.6, basePositions[i].z)
          targetColor.copy(GATED)
        }
      } else {
        const bob = Math.sin(t * 0.6 + i) * 0.045
        targetPos.set(basePositions[i].x, basePositions[i].y + bob, basePositions[i].z)
        targetColor.copy(NEUTRAL)
      }

      current[i].lerp(targetPos, damp)
      currentColor[i].lerp(targetColor, damp)
      currentGlow[i] += ((grounded ? 1 : 0) - currentGlow[i]) * glowDamp

      dummy.position.copy(current[i])
      dummy.scale.setScalar(resolved[i] && !authorized[i] ? 0.55 : 1)
      dummy.rotation.set(0, 0, 0)
      dummy.updateMatrix()
      mesh.setMatrixAt(i, dummy.matrix)
      mesh.setColorAt(i, currentColor[i])

      const glowScale = 0.5 * currentGlow[i]
      glowDummy.position.copy(current[i])
      glowDummy.scale.setScalar(Math.max(0.0001, glowScale))
      glowDummy.rotation.set(0, 0, 0)
      glowDummy.updateMatrix()
      glow.setMatrixAt(i, glowDummy.matrix)
      glow.setColorAt(i, GROUNDED)
    }

    mesh.instanceMatrix.needsUpdate = true
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true
    glow.instanceMatrix.needsUpdate = true
    if (glow.instanceColor) glow.instanceColor.needsUpdate = true
  })

  return (
    <group ref={groupRef}>
      <CoreStructure progress={progress} />
      <instancedMesh ref={meshRef} args={[undefined, undefined, nodeCount]} frustumCulled={false}>
        <sphereGeometry args={[0.09, 10, 10]} />
        <meshBasicMaterial toneMapped={false} />
      </instancedMesh>
      <instancedMesh ref={glowRef} args={[undefined, undefined, nodeCount]} frustumCulled={false}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial
          map={glowTexture}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          toneMapped={false}
        />
      </instancedMesh>
      <mesh ref={boundaryRef}>
        <sphereGeometry args={[1, 24, 24]} />
        <meshBasicMaterial color="#E0808A" transparent opacity={0} wireframe />
      </mesh>
      <points ref={dustRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[dustPositions, 3]} />
        </bufferGeometry>
        <pointsMaterial color="#5B6270" size={0.028} transparent opacity={0.35} sizeAttenuation depthWrite={false} />
      </points>
    </group>
  )
}
