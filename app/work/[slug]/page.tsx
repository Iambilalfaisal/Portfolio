import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { caseStudies, statusLabel } from '@/lib/content'
import CaseStudyLayout from '@/components/CaseStudyLayout'

export function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const study = caseStudies.find((s) => s.slug === slug)
  if (!study) return {}

  const title = `${study.title} — ${study.tagline}`
  const description = `${statusLabel[study.status]}. ${study.sections.problem}`

  return {
    title,
    description,
    alternates: { canonical: `/work/${study.slug}` },
    openGraph: { title, description },
  }
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const study = caseStudies.find((s) => s.slug === slug)
  if (!study) notFound()

  const creativeWorkJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: study.title,
    description: study.tagline,
    creator: { '@type': 'Person', name: 'M Bilal Faisal' },
    keywords: study.stack.join(', '),
    ...(study.githubUrl ? { url: study.githubUrl } : {}),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(creativeWorkJsonLd) }}
      />
      <CaseStudyLayout study={study} />
    </>
  )
}
