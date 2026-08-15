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
 *
 * Mobile is now a full skip, not a reduced tier: the vault environment (light shafts,
 * shader-driven monoliths and floor, a multi-layer core) is meaningfully heavier than the
 * node graph this was originally tuned for, and earlier measurement of even the *lighter*
 * scene already showed real mobile budget problems. Compounding that with more shaders to
 * compile isn't a reasonable bet without a real device to validate on, which this
 * environment doesn't have. Every mobile visitor gets the video/static fallback instead —
 * see StaticFallback and the recorded loop.
 */
export function shouldSkip3D(): boolean {
  const cores = coreCount()
  const tooWeak = cores !== null && cores <= 4
  return prefersReducedMotion() || !supportsWebGL() || isSlowConnection() || isMobileUserAgent() || tooWeak
}

/**
 * Kept for devices that pass shouldSkip3D() but are still on the modest side — these get
 * the lighter node count / capped DPR rather than the full desktop tier. Since mobile is
 * now excluded by shouldSkip3D() above, in practice this only affects lower-core-count
 * desktops/laptops, not phones.
 */
export function shouldReduceQuality(): boolean {
  const cores = coreCount()
  return cores !== null && cores > 4 && cores <= 6
}
