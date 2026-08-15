import { ogImageResponse } from '@/lib/og'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  return ogImageResponse('About', 'Bio, education, certifications and full skills inventory.')
}
