type Variant = 'neutral' | 'grounded' | 'gated'

const chipClass: Record<Variant, string> = {
  neutral: 'fill-none stroke-graphite dark:stroke-graphite-dark text-graphite dark:text-graphite-dark',
  grounded: 'fill-grounded-subtle dark:fill-grounded-subtle-dark stroke-grounded dark:stroke-grounded-dark text-grounded dark:text-grounded-dark',
  gated: 'fill-none stroke-gated dark:stroke-gated-dark text-gated dark:text-gated-dark [stroke-dasharray:4_3]',
}

function Chip({ x, y, w, label, variant = 'neutral' }: { x: number; y: number; w: number; label: string; variant?: Variant }) {
  return (
    <g className={chipClass[variant]}>
      <rect x={x} y={y} width={w} height={26} rx={6} strokeWidth={1.2} />
      <text x={x + w / 2} y={y + 17} textAnchor="middle" fontSize="10.5" fontFamily="var(--font-mono)" fill="currentColor" stroke="none">
        {label}
      </text>
    </g>
  )
}

const reviewerTools = ['List dir', 'Read file', 'Code search', 'Security check', 'Perf check', 'Quality check', 'Propose edit']

const editorTools = ['List dir', 'Read file', 'Code search', 'Write file']

export default function RepoWardenDiagram() {
  return (
    <svg
      viewBox="0 0 900 400"
      className="w-full h-auto text-ink dark:text-paper"
      role="img"
      aria-label="Diagram: the Reviewer agent's toolset omits the write tool entirely; a human authorization gate must be passed before the write-capable Editor agent is constructed."
    >
      {/* Reviewer panel */}
      <g className="stroke-hairline dark:stroke-hairline-dark fill-none">
        <rect x={20} y={20} width={280} height={300} rx={12} strokeWidth={1.5} />
      </g>
      <text x={40} y={50} fontSize="12" fontFamily="var(--font-mono)" className="fill-graphite dark:fill-graphite-dark" style={{ textTransform: 'uppercase', letterSpacing: '0.04em' }}>
        Reviewer StateGraph
      </text>
      {reviewerTools.map((tool, i) => (
        <Chip key={tool} x={40} y={70 + i * 34} w={240} label={tool} variant="neutral" />
      ))}
      <Chip x={40} y={70 + reviewerTools.length * 34} w={240} label="Write file — not bound" variant="gated" />

      {/* Gate */}
      <g transform="translate(370, 150)">
        <polygon points="60,0 120,45 60,90 0,45" className="fill-paper dark:fill-ink stroke-gated dark:stroke-gated-dark" strokeWidth={1.5} />
        <text x={60} y={40} textAnchor="middle" fontSize="10.5" fontFamily="var(--font-mono)" className="fill-ink dark:fill-paper" style={{ textTransform: 'uppercase' }}>
          Human
        </text>
        <text x={60} y={54} textAnchor="middle" fontSize="10.5" fontFamily="var(--font-mono)" className="fill-ink dark:fill-paper" style={{ textTransform: 'uppercase' }}>
          authorization
        </text>
      </g>

      {/* Arrows */}
      <g className="stroke-graphite dark:stroke-graphite-dark" strokeWidth={1.5} markerEnd="url(#arrow)">
        <line x1={300} y1={195} x2={368} y2={195} />
        <line x1={492} y1={195} x2={598} y2={195} />
      </g>
      <text x={334} y={185} textAnchor="middle" fontSize="9.5" fontFamily="var(--font-mono)" className="fill-graphite dark:fill-graphite-dark">
        proposed edits
      </text>
      <text x={545} y={185} textAnchor="middle" fontSize="9.5" fontFamily="var(--font-mono)" className="fill-grounded dark:fill-grounded-dark">
        approved
      </text>

      {/* Editor panel */}
      <g className="stroke-hairline dark:stroke-hairline-dark fill-none">
        <rect x={600} y={20} width={280} height={300} rx={12} strokeWidth={1.5} />
      </g>
      <text x={620} y={50} fontSize="12" fontFamily="var(--font-mono)" className="fill-graphite dark:fill-graphite-dark" style={{ textTransform: 'uppercase', letterSpacing: '0.04em' }}>
        Editor StateGraph
      </text>
      <text x={620} y={66} fontSize="9.5" fontFamily="var(--font-mono)" className="fill-graphite dark:fill-graphite-dark">
        constructed only after the gate above
      </text>
      {editorTools.slice(0, -1).map((tool, i) => (
        <Chip key={tool} x={620} y={80 + i * 34} w={240} label={tool} variant="neutral" />
      ))}
      <Chip x={620} y={80 + (editorTools.length - 1) * 34} w={240} label="Write file" variant="grounded" />

      <text x={450} y={350} textAnchor="middle" fontSize="10.5" fontFamily="var(--font-mono)" className="fill-graphite dark:fill-graphite-dark">
        Nothing is written to disk until the gate is passed.
      </text>

      <defs>
        <marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
          <path d="M0,0 L8,4 L0,8 z" className="fill-graphite dark:fill-graphite-dark" />
        </marker>
      </defs>
    </svg>
  )
}
