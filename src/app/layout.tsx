import type { Metadata } from 'next'
import { IBM_Plex_Mono, Instrument_Sans, Space_Grotesk } from 'next/font/google'
import { SiteFooter } from '@/components/shell/SiteFooter'
import { SiteHeader } from '@/components/shell/SiteHeader'
import { profile } from '@/content/profile'
import { SITE_URL } from '@/lib/site'
import './globals.css'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
})

const instrumentSans = Instrument_Sans({
  subsets: ['latin'],
  variable: '--font-instrument-sans',
})

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  variable: '--font-ibm-plex-mono',
  weight: ['400', '500', '600'],
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Ananda Triharis Maroso — AI Product Builder',
    template: '%s — Ananda Triharis Maroso',
  },
  description: profile.hero,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'en_SG',
    url: '/',
    siteName: profile.name,
    title: 'Ananda Triharis Maroso — AI Product Builder',
    description: profile.hero,
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'Evidence Fieldbook' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ananda Triharis Maroso — AI Product Builder',
    description: profile.hero,
    images: ['/opengraph-image'],
  },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${spaceGrotesk.variable} ${instrumentSans.variable} ${ibmPlexMono.variable} site-body`}
      >
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  )
}
