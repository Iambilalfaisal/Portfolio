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

export function isMobileUserAgent(): boolean {
  if (typeof navigator === 'undefined') return false
  return /Android|iPhone|iPad|iPod/i.test(navigator.userAgent)
}

function coreCount(): number | null {
  if (typeof navigator === 'undefined') return null
  return typeof navigator.hardwareConcurrency === 'number' ? navigator.hardwareConcurrency : null
}

/**
 * A device too weak to run the scene at all — distinct from "mobile, so run it lighter"
 * below. A very low core count correlates with genuinely old/underpowered hardware where
 * even a two-draw-call scene isn't worth the WebGL context + shader-compile cost. Reduced
 * motion, no WebGL, and a poor connection are unconditional skips regardless of power.
 */
export function shouldSkip3D(): boolean {
  const cores = coreCount()
  const tooWeak = cores !== null && cores <= 2
  return prefersReducedMotion() || !supportsWebGL() || isSlowConnection() || tooWeak
}

/**
 * Devices that can run the scene but shouldn't get the full node count / DPR: any mobile
 * user agent, or a desktop-class UA reporting a modest core count. Deliberately broader
 * than shouldSkip3D() — this is the "run it, just lighter" tier, not the "don't run it"
 * one. Unverified against real mobile GPUs from this environment (headless software
 * rendering isn't representative of real hardware); the live sustained-low-fps watcher in
 * HeroScene is the real safety net if this tier still turns out too heavy on a given device.
 */
export function shouldReduceQuality(): boolean {
  const cores = coreCount()
  const modestCores = cores !== null && cores > 2 && cores <= 4
  return isMobileUserAgent() || modestCores
}
