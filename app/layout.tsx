import type { Metadata } from 'next'
import { Space_Grotesk, IBM_Plex_Sans, JetBrains_Mono } from 'next/font/google'
import Script from 'next/script'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import SmoothScroll from '@/components/SmoothScroll'
import './globals.css'

const display = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['600', '700'],
})

const body = IBM_Plex_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  weight: ['400'],
})

const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ['400'],
})

const siteUrl = 'https://bilal-faisal.vercel.app'
const siteTitle = 'M Bilal Faisal — AI/ML Engineer & Full-Stack Developer'
const siteDescription =
  'Building production RAG and agentic AI systems (LangChain, LangGraph) alongside the ASP.NET Core, React and SQL Server platforms they run inside.'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: '%s · M Bilal Faisal',
  },
  description: siteDescription,
  authors: [{ name: 'M Bilal Faisal' }],
  openGraph: {
    type: 'website',
    siteName: 'M Bilal Faisal',
    title: siteTitle,
    description: siteDescription,
    url: siteUrl,
  },
  twitter: {
    card: 'summary_large_image',
    title: siteTitle,
    description: siteDescription,
  },
}

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'M Bilal Faisal',
  jobTitle: 'Associate Software Engineer',
  email: 'mailto:Bilalfaisal100@gmail.com',
  worksFor: {
    '@type': 'Organization',
    name: 'Acme One',
  },
  alumniOf: {
    '@type': 'CollegeOrUniversity',
    name: 'University of Management and Technology',
  },
  knowsAbout: [
    'Retrieval-Augmented Generation',
    'LangChain',
    'LangGraph',
    'Agentic AI',
    'ASP.NET Core',
    'React',
    'SQL Server',
  ],
  sameAs: ['https://linkedin.com/in/ibilalfaisal', 'https://github.com/Iambilalfaisal'],
}

const themeScript = `
(function() {
  try {
    var stored = localStorage.getItem('theme');
    var dark = stored ? stored === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
    document.documentElement.classList.toggle('dark', dark);
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.documentElement.classList.add('motion-ready');
    }
  } catch (e) {}
})();
`

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <body>
        <Script id="theme-init" strategy="beforeInteractive">
          {themeScript}
        </Script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <SmoothScroll />
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
