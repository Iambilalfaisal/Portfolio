import { statusLabel, type Status } from '@/lib/content'

const styles: Record<Status, string> = {
  shipped: 'bg-grounded-subtle text-grounded dark:bg-grounded-subtle-dark dark:text-grounded-dark',
  'in-development': 'bg-gated-subtle text-gated dark:bg-gated-subtle-dark dark:text-gated-dark',
  capstone: 'bg-hairline/50 text-graphite dark:bg-hairline-dark/50 dark:text-graphite-dark',
}

export default function StatusBadge({ status }: { status: Status }) {
  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-md font-mono text-eyebrow uppercase whitespace-nowrap ${styles[status]}`}
    >
      {statusLabel[status]}
    </span>
  )
}
