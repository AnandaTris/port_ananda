import { ImageResponse } from 'next/og'
import { profile } from '@/content/profile'

export const runtime = 'edge'
export const alt = 'Ananda Triharis Maroso — AI Product Builder'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: 'stretch',
          background: '#FFF8ED',
          color: '#111318',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          padding: '58px 64px',
          position: 'relative',
          width: '100%',
        }}
      >
        <div
          style={{
            alignItems: 'center',
            display: 'flex',
            fontFamily: 'sans-serif',
            fontSize: 23,
            fontWeight: 700,
            justifyContent: 'space-between',
            letterSpacing: 2,
            textTransform: 'uppercase',
          }}
        >
          <span>{profile.name}</span>
          <span style={{ background: '#DFFF00', padding: '11px 16px' }}>Evidence fieldbook</span>
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            marginTop: 90,
            maxWidth: 930,
          }}
        >
          <span
            style={{
              color: '#FF5D3A',
              fontFamily: 'monospace',
              fontSize: 22,
              fontWeight: 700,
              letterSpacing: 2,
              textTransform: 'uppercase',
            }}
          >
            Product builder
          </span>
          <span
            style={{
              fontFamily: 'sans-serif',
              fontSize: 66,
              fontWeight: 800,
              letterSpacing: -3,
              lineHeight: 1.03,
              marginTop: 18,
            }}
          >
            {profile.hero}
          </span>
        </div>

        <div
          style={{
            alignItems: 'center',
            display: 'flex',
            fontFamily: 'monospace',
            fontSize: 27,
            fontWeight: 700,
            marginTop: 'auto',
          }}
        >
          <span style={{ background: '#28C9FF', padding: '15px 20px' }}>Product × AI × Growth</span>
          <span style={{ background: '#FF5D3A', height: 14, marginLeft: 18, width: 14 }} />
          <span style={{ background: '#DFFF00', height: 14, marginLeft: 12, width: 14 }} />
        </div>
      </div>
    ),
    size,
  )
}
