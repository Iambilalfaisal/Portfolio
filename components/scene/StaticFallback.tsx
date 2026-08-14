// Deterministic phyllotaxis layout — same output on server and client, no Math.random()
// (which would cause a hydration mismatch if used directly in a server-rendered SVG).
function phyllotaxis(count: number, cx: number, cy: number, spacing: number) {
  const goldenAngle = Math.PI * (3 - Math.sqrt(5))
  return Array.from({ length: count }, (_, i) => {
    const r = spacing * Math.sqrt(i)
    const theta = i * goldenAngle
    return { x: cx + r * Math.cos(theta), y: cy + r * Math.sin(theta), i }
  })
}

const fieldNodes = phyllotaxis(46, 260, 200, 15.5)
const resolvedNodes = phyllotaxis(14, 760, 200, 13)
// A handful of field nodes read as "refused" — past the midpoint, falling away.
const refusedIdx = new Set([3, 9, 14, 19, 23, 28, 33])

// Always the fixed dark palette that matches the 3D scene's own atmosphere — this fallback
// sits inside a permanently-dark container regardless of the site's light/dark toggle.
export default function StaticFallback() {
  return (
    <svg viewBox="0 0 900 400" className="w-full h-full" role="img" aria-hidden="true">
      {fieldNodes.map((n) => {
        const refused = refusedIdx.has(n.i)
        return (
          <circle
            key={`field-${n.i}`}
            cx={n.x}
            cy={refused ? n.y + 18 : n.y}
            r={refused ? 3 : 4.5}
            fill={refused ? '#E0808A' : '#9AA1AF'}
            opacity={refused ? 0.5 : 0.8}
          />
        )
      })}

      <line x1={500} y1={40} x2={500} y2={360} stroke="#E0808A" strokeWidth={1.5} strokeDasharray="5 4" />

      {resolvedNodes.map((n) => (
        <circle key={`resolved-${n.i}`} cx={n.x} cy={n.y} r={5} fill="#4FC3C0" />
      ))}
    </svg>
  )
}
