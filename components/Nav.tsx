import Link from 'next/link'
import { Menu } from 'lucide-react'
import ThemeToggle from './ThemeToggle'

const navItems = [
  { name: 'Work', href: '/#selected-work' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/#contact' },
]

export default function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-hairline dark:border-hairline-dark bg-paper/90 dark:bg-ink/90 backdrop-blur">
      <nav className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between">
        <Link href="/" className="font-mono text-eyebrow uppercase tracking-wide">
          M Bilal Faisal
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="font-mono text-eyebrow uppercase text-graphite dark:text-graphite-dark hover:text-ink dark:hover:text-paper transition-colors"
            >
              {item.name}
            </Link>
          ))}
          <ThemeToggle />
        </div>

        <div className="flex items-center gap-1 md:hidden">
          <ThemeToggle />
          {/* Native disclosure — works with JavaScript disabled */}
          <details className="relative">
            <summary
              aria-label="Toggle menu"
              className="list-none [&::-webkit-details-marker]:hidden cursor-pointer p-2 text-ink dark:text-paper"
            >
              <Menu size={22} />
            </summary>
            <div className="absolute right-0 mt-2 w-48 rounded-md border border-hairline dark:border-hairline-dark bg-paper dark:bg-ink p-4 flex flex-col gap-4 shadow-lg">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="font-mono text-eyebrow uppercase text-graphite dark:text-graphite-dark hover:text-ink dark:hover:text-paper transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </details>
        </div>
      </nav>
    </header>
  )
}
