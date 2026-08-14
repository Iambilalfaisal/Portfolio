export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return true
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function supportsWebGL(): boolean {
  if (typeof window === 'undefined') return false
  try {
    const canvas = document.createElement('canvas')
    const gl = canvas.getContext('webgl2') || canvas.getContext('webgl')
    return !!gl
  } catch {
    return false
  }
}

export function isSlowConnection(): boolean {
  if (typeof navigator === 'undefined') return false
  // @ts-expect-error — navigator.connection is not yet in the standard TS lib types
  const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection
  if (!connection) return false
  if (connection.saveData) return true
  return ['slow-2g', '2g', '3g'].includes(connection.effectiveType)
}

export function isLowPowerDevice(): boolean {
  if (typeof navigator === 'undefined') return false
  const lowCores = typeof navigator.hardwareConcurrency === 'number' && navigator.hardwareConcurrency <= 4
  const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent)
  return lowCores || isMobile
}

/**
 * Combined pre-flight check, run once on mount. A measured low-frame-rate check happens
 * separately at runtime since it needs a live sample of the scene, not a static device
 * property.
 *
 * isLowPowerDevice() is included here as a full skip, not just a "reduce node count"
 * degradation: measured in practice, the fixed framework cost of Three.js + R3F +
 * postprocessing (~150-200KB gzipped, plus WebGL context setup and shader compilation)
 * blows the mobile performance budget on its own, regardless of scene complexity. A
 * mid-range/mobile device gets the static scene outright rather than a "lighter" 3D one.
 */
export function shouldSkip3D(): boolean {
  return prefersReducedMotion() || !supportsWebGL() || isSlowConnection() || isLowPowerDevice()
}
