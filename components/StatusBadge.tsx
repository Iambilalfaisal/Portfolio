import { statusLabel, type Status } from '@/lib/content'

const styles: Record<Status, string> = {
  shipped: 'bg-grounded-subtle text-grounded dark:bg-grounded-subtle-dark dark:text-grounded-dark',
  'in-development': 'bg-gated-subtle text-gated dark:bg-gated-subtle-dark dark:text-gated-dark',
  capstone: 'bg-hairline/50 text-graphite dark:bg-hairline-dark/50 dark:text-graphite-dark',
}

// The home page now sits over a permanently-dark scene (see HomeBackground) regardless of
// the site's light/dark toggle, so a badge placed there needs the dark styling forced
// rather than keyed to that toggle — `variant="dark"` is for exactly that context. About
// and the case-study pages stay toggle-driven and keep using the default.
const darkStyles: Record<Status, string> = {
  shipped: 'bg-grounded-subtle-dark text-grounded-dark',
  'in-development': 'bg-gated-subtle-dark text-gated-dark',
  capstone: 'bg-hairline-dark/60 text-graphite-dark',
}

export default function StatusBadge({
  status,
  variant = 'auto',
}: {
  status: Status
  variant?: 'auto' | 'dark'
}) {
  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-md font-mono text-eyebrow uppercase whitespace-nowrap ${
        variant === 'dark' ? darkStyles[status] : styles[status]
      }`}
    >
      {statusLabel[status]}
    </span>
  )
}
