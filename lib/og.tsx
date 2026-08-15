import { ImageResponse } from 'next/og'

export function ogImageResponse(title: string, subtitle: string) {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px',
          backgroundColor: '#12151C',
          color: '#F3F4F7',
        }}
      >
        <div
          style={{
            fontSize: 28,
            color: '#4FC3C0',
            letterSpacing: 4,
            textTransform: 'uppercase',
            marginBottom: 28,
          }}
        >
          M Bilal Faisal
        </div>
        <div style={{ display: 'flex', fontSize: 60, fontWeight: 700, lineHeight: 1.15, marginBottom: 24 }}>
          {title}
        </div>
        <div style={{ display: 'flex', fontSize: 30, color: '#9AA1AF' }}>{subtitle}</div>
      </div>
    ),
    { width: 1200, height: 630 }
  )
}
