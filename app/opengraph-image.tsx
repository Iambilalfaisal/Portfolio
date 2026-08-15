import { ogImageResponse } from '@/lib/og'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  return ogImageResponse(
    'AI/ML Engineer & Full-Stack Developer',
    'Production RAG and agentic AI systems, and the software they run inside.'
  )
}
