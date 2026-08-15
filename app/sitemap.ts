import type { MetadataRoute } from 'next'
import { caseStudies } from '@/lib/content'

const base = 'https://bilal-faisal.vercel.app'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: base, changeFrequency: 'monthly', priority: 1 },
    { url: `${base}/about`, changeFrequency: 'monthly', priority: 0.8 },
    ...caseStudies.map((study) => ({
      url: `${base}/work/${study.slug}`,
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    })),
  ]
}
