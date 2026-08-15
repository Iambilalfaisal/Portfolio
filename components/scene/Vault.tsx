'use client'

import { useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'

const MONOLITH_COUNT = 8

const monolithVertexShader = `
  varying vec3 vNormal;
  varying vec3 vViewPosition;
  varying vec2 vUv;
  void main() {
    vNormal = normalize(normalMatrix * normal);
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    vViewPosition = -mvPosition.xyz;
    vUv = uv;
    gl_Position = projectionMatrix * mvPosition;
  }
`

const monolithFragmentShader = `
  uniform vec3 uColor;
  uniform float uTime;
  uniform float uSeed;
  varying vec3 vNormal;
  varying vec3 vViewPosition;
  varying vec2 vUv;
  void main() {
    vec3 viewDir = normalize(vViewPosition);
    float fresnel = pow(1.0 - clamp(dot(viewDir, normalize(vNormal)), 0.0, 1.0), 2.2);
    float scan = sin(vUv.y * 26.0 - uTime * 1.1 + uSeed) * 0.5 + 0.5;
    float edge = smoothstep(0.0, 0.06, vUv.x) * (1.0 - smoothstep(0.94, 1.0, vUv.x));
    edge *= smoothstep(0.0, 0.04, vUv.y) * (1.0 - smoothstep(0.96, 1.0, vUv.y));
    float body = (1.0 - edge) * 0.06;
    float glow = fresnel * 0.8 + scan * 0.12 * fresnel + body;
    gl_FragColor = vec4(uColor * (glow + 0.04), glow * 0.85 + 0.05);
  }
`

// Fixed line width rather than fwidth()-based anti-aliasing — fwidth needs the
// OES_standard_derivatives extension under WebGL1 and fails to compile without it
// (silently, in a way that can cascade into a context loss). A fixed width is a little
// less crisp at grazing distance but has no extension dependency at all.
const floorFragmentShader = `
  uniform vec3 uColor;
  uniform vec3 uBg;
  varying vec2 vUv;
  void main() {
    vec2 c = vUv * 24.0;
    vec2 g = abs(fract(c - 0.5) - 0.5);
    float line = 1.0 - smoothstep(0.0, 0.045, min(g.x, g.y));
    float fade = 1.0 - smoothstep(0.0, 0.9, length(vUv - 0.5) * 1.4);
    vec3 col = mix(uBg, uColor, line * 0.5 * fade);
    gl_FragColor = vec4(col, 1.0);
  }
`

function Monoliths() {
  const groupRef = useRef<THREE.Group>(null)
  const materials = useMemo(
    () =>
      Array.from({ length: MONOLITH_COUNT }, () => {
        const mat = new THREE.ShaderMaterial({
          uniforms: {
            uColor: { value: new THREE.Color('#4fc3c0') },
            uTime: { value: 0 },
            uSeed: { value: Math.random() * 10 },
          },
          vertexShader: monolithVertexShader,
          fragmentShader: monolithFragmentShader,
          transparent: true,
          side: THREE.DoubleSide,
          depthWrite: false,
          blending: THREE.AdditiveBlending,
        })
        return mat
      }),
    []
  )

  const positions = useMemo(
    () =>
      Array.from({ length: MONOLITH_COUNT }, (_, i) => {
        const angle = (i / MONOLITH_COUNT) * Math.PI * 2
        const radius = 9.5
        return {
          x: Math.cos(angle) * radius,
          z: Math.sin(angle) * radius,
          rotY: -angle + Math.PI / 2,
          height: 4.5 + (i % 3) * 1.1,
        }
      }),
    []
  )

  useFrame((state, rawDelta) => {
    const delta = Math.min(rawDelta, 1 / 30)
    for (const mat of materials) {
      mat.uniforms.uTime.value = state.clock.elapsedTime
    }
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.015
  })

  return (
    <group ref={groupRef}>
      {positions.map((p, i) => (
        <mesh key={i} position={[p.x, p.height / 2 - 1.4, p.z]} rotation={[0, p.rotY, 0]}>
          <planeGeometry args={[1.4, p.height]} />
          <primitive object={materials[i]} attach="material" />
        </mesh>
      ))}
    </group>
  )
}

function ReflectiveFloor() {
  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: {
          uColor: { value: new THREE.Color('#4fc3c0') },
          uBg: { value: new THREE.Color('#0a0c11') },
        },
        vertexShader: `
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: floorFragmentShader,
      }),
    []
  )

  return (
    <mesh position={[0, -4.2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[46, 46]} />
      <primitive object={material} attach="material" />
    </mesh>
  )
}

function LightShafts() {
  const texture = useMemo(() => {
    const size = 128
    const canvas = document.createElement('canvas')
    canvas.width = 8
    canvas.height = size
    const ctx = canvas.getContext('2d')!
    const gradient = ctx.createLinearGradient(0, 0, 0, size)
    gradient.addColorStop(0, 'rgba(255,255,255,0.35)')
    gradient.addColorStop(1, 'rgba(255,255,255,0)')
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, 8, size)
    return new THREE.CanvasTexture(canvas)
  }, [])

  const shafts = useMemo(
    () => [
      { x: -4.5, z: -2.5, scale: 1 },
      { x: 5, z: 1.5, scale: 0.8 },
      { x: -1, z: 4.5, scale: 0.65 },
    ],
    []
  )

  return (
    <group>
      {shafts.map((s, i) => (
        <mesh key={i} position={[s.x, 6, s.z]} rotation={[0, 0, 0]}>
          <cylinderGeometry args={[0.2 * s.scale, 2.2 * s.scale, 13, 24, 1, true]} />
          <meshBasicMaterial
            map={texture}
            transparent
            opacity={0.5}
            depthWrite={false}
            side={THREE.DoubleSide}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      ))}
    </group>
  )
}

export default function Vault() {
  return (
    <group>
      <Monoliths />
      <ReflectiveFloor />
      <LightShafts />
    </group>
  )
}
