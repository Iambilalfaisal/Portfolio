function Box({
  x,
  y,
  w,
  h,
  label,
  sub,
  variant = 'neutral',
}: {
  x: number
  y: number
  w: number
  h: number
  label: string
  sub?: string
  variant?: 'neutral' | 'grounded' | 'gated'
}) {
  const cls =
    variant === 'grounded'
      ? 'fill-grounded-subtle dark:fill-grounded-subtle-dark stroke-grounded dark:stroke-grounded-dark'
      : variant === 'gated'
        ? 'fill-gated-subtle dark:fill-gated-subtle-dark stroke-gated dark:stroke-gated-dark [stroke-dasharray:4_3]'
        : 'fill-none stroke-hairline dark:stroke-hairline-dark'
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={8} strokeWidth={1.4} className={cls} />
      <text
        x={x + w / 2}
        y={y + h / 2 + (sub ? -2 : 4)}
        textAnchor="middle"
        fontSize="11"
        fontFamily="var(--font-mono)"
        className="fill-ink dark:fill-paper"
        style={{ textTransform: 'uppercase' }}
      >
        {label}
      </text>
      {sub && (
        <text
          x={x + w / 2}
          y={y + h / 2 + 14}
          textAnchor="middle"
          fontSize="9"
          fontFamily="var(--font-mono)"
          className="fill-graphite dark:fill-graphite-dark"
        >
          {sub}
        </text>
      )}
    </g>
  )
}

export default function NucleusOneDiagram() {
  return (
    <svg
      viewBox="0 0 900 360"
      className="w-full h-auto text-ink dark:text-paper"
      role="img"
      aria-label="Diagram: a request is resolved against the asking user's existing platform authorization before retrieval; records the user isn't entitled to see are filtered out, and only authorized records reach the answer."
    >
      <Box x={20} y={150} w={160} h={60} label="Request" sub="from platform user" />

      <g className="stroke-graphite dark:stroke-graphite-dark" strokeWidth={1.5} markerEnd="url(#arrow4)">
        <line x1={180} y1={180} x2={228} y2={180} />
      </g>

      <Box x={230} y={150} w={200} h={60} label="Authorization check" sub="user's existing permissions" />

      <g className="stroke-grounded dark:stroke-grounded-dark" strokeWidth={1.5} markerEnd="url(#arrowGrounded)">
        <line x1={430} y1={165} x2={478} y2={90} />
      </g>
      <g className="stroke-gated dark:stroke-gated-dark" strokeWidth={1.5} markerEnd="url(#arrowGated)">
        <line x1={430} y1={195} x2={478} y2={270} />
      </g>

      <Box x={480} y={60} w={220} h={60} label="Authorized records" sub="entitled to see" variant="grounded" />
      <Box x={480} y={240} w={220} h={60} label="Unauthorized records" sub="filtered out here" variant="gated" />

      <g className="stroke-grounded dark:stroke-grounded-dark" strokeWidth={1.5} markerEnd="url(#arrowGrounded)">
        <line x1={700} y1={90} x2={748} y2={170} />
      </g>

      <text x={615} y={330} textAnchor="middle" fontSize="9.5" fontFamily="var(--font-mono)" className="fill-gated dark:fill-gated-dark">
        Cannot become a path around the platform&apos;s access controls.
      </text>

      <Box x={750} y={140} w={130} h={80} label="Answer" sub="scoped to user" variant="grounded" />

      <defs>
        <marker id="arrow4" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
          <path d="M0,0 L8,4 L0,8 z" className="fill-graphite dark:fill-graphite-dark" />
        </marker>
        <marker id="arrowGrounded" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
          <path d="M0,0 L8,4 L0,8 z" className="fill-grounded dark:fill-grounded-dark" />
        </marker>
        <marker id="arrowGated" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
          <path d="M0,0 L8,4 L0,8 z" className="fill-gated dark:fill-gated-dark" />
        </marker>
      </defs>
    </svg>
  )
}
