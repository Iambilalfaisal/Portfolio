import Link from 'next/link'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-hairline dark:border-hairline-dark py-10">
      <div className="mx-auto max-w-6xl px-6 flex flex-col md:flex-row items-center justify-between gap-4 font-mono text-eyebrow uppercase text-graphite dark:text-graphite-dark">
        <p>&copy; {year} M Bilal Faisal</p>
        <div className="flex gap-6">
          <Link href="https://github.com/Iambilalfaisal" className="hover:text-ink dark:hover:text-paper transition-colors">
            GitHub
          </Link>
          <Link href="https://linkedin.com/in/ibilalfaisal" className="hover:text-ink dark:hover:text-paper transition-colors">
            LinkedIn
          </Link>
          <Link href="mailto:Bilalfaisal100@gmail.com" className="hover:text-ink dark:hover:text-paper transition-colors">
            Email
          </Link>
        </div>
      </div>
    </footer>
  )
}
