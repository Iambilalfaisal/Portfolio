import { caseStudies } from '@/lib/content'
import { ogImageResponse } from '@/lib/og'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export function generateImageMetadata({ params }: { params: { slug: string } }) {
  const exists = caseStudies.some((s) => s.slug === params.slug)
  return exists ? [{ id: params.slug, size, contentType }] : []
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const study = caseStudies.find((s) => s.slug === slug)
  return ogImageResponse(study?.title ?? 'M Bilal Faisal', study?.tagline ?? '')
}
