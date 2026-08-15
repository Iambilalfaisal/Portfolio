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
        ? 'fill-gated-subtle dark:fill-gated-subtle-dark stroke-gated dark:stroke-gated-dark'
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

export default function ProjectEaseDiagram() {
  return (
    <svg
      viewBox="0 0 900 420"
      className="w-full h-auto text-ink dark:text-paper"
      role="img"
      aria-label="Diagram: tenancy is enforced server-side from the JWT organisation claim across a single hybrid BM25, vector and semantic query, and every draft answer passes a second, temperature-zero verification call before reaching the user."
    >
      <Box x={20} y={170} w={140} h={60} label="Request" sub="+ JWT org claim" />

      <g className="stroke-gated dark:stroke-gated-dark" strokeWidth={1.5} markerEnd="url(#arrow2)">
        <line x1={160} y1={200} x2={210} y2={200} />
      </g>

      <line x1={215} y1={60} x2={215} y2={340} className="stroke-gated dark:stroke-gated-dark [stroke-dasharray:4_3]" strokeWidth={1.5} />
      <text x={215} y={48} textAnchor="middle" fontSize="9.5" fontFamily="var(--font-mono)" className="fill-gated dark:fill-gated-dark" style={{ textTransform: 'uppercase' }}>
        Tenancy enforced server-side
      </text>

      <g className="stroke-graphite dark:stroke-graphite-dark" strokeWidth={1.5} markerEnd="url(#arrow2)">
        <line x1={225} y1={200} x2={270} y2={110} />
        <line x1={225} y1={200} x2={270} y2={200} />
        <line x1={225} y1={200} x2={270} y2={290} />
      </g>

      <Box x={270} y={85} w={160} h={50} label="BM25" />
      <Box x={270} y={175} w={160} h={50} label="Vector" />
      <Box x={270} y={265} w={160} h={50} label="Semantic" />

      <g className="stroke-graphite dark:stroke-graphite-dark" strokeWidth={1.5} markerEnd="url(#arrow2)">
        <line x1={430} y1={110} x2={478} y2={195} />
        <line x1={430} y1={200} x2={478} y2={200} />
        <line x1={430} y1={290} x2={478} y2={205} />
      </g>

      <Box x={480} y={170} w={170} h={60} label="Hybrid results" sub="single query, org-scoped" variant="grounded" />

      <g className="stroke-graphite dark:stroke-graphite-dark" strokeWidth={1.5} markerEnd="url(#arrow2)">
        <line x1={650} y1={200} x2={698} y2={200} />
      </g>

      <Box x={700} y={170} w={160} h={60} label="Draft answer" sub="Azure OpenAI" />

      <path d="M780,230 V300 H610 V318" fill="none" className="stroke-graphite dark:stroke-graphite-dark" strokeWidth={1.5} markerEnd="url(#arrow2)" />

      <Box x={500} y={320} w={220} h={60} label="Verification pass" sub="second call, temperature = 0" />

      <g className="stroke-grounded dark:stroke-grounded-dark" strokeWidth={1.5} markerEnd="url(#arrow3)">
        <line x1={720} y1={350} x2={738} y2={350} />
      </g>

      <Box x={740} y={320} w={140} h={60} label="Answer" sub="to user" variant="grounded" />

      <text x={610} y={400} textAnchor="middle" fontSize="9.5" fontFamily="var(--font-mono)" className="fill-gated dark:fill-gated-dark">
        RAGAS harness wired into this pass — instrumented, not yet run.
      </text>

      <defs>
        <marker id="arrow2" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
          <path d="M0,0 L8,4 L0,8 z" className="fill-graphite dark:fill-graphite-dark" />
        </marker>
        <marker id="arrow3" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
          <path d="M0,0 L8,4 L0,8 z" className="fill-grounded dark:fill-grounded-dark" />
        </marker>
      </defs>
    </svg>
  )
}
