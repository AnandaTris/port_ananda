import type { Metadata } from 'next'
import { Archivo, Instrument_Serif } from 'next/font/google'
import { SiteFooter } from '@/components/shell/SiteFooter'
import { SiteHeader } from '@/components/shell/SiteHeader'
import { profile } from '@/content/profile'
import { SITE_URL } from '@/lib/site'
import './globals.css'

// Display face is Instrument Serif, which ships a single 400 weight — every
// display rule in globals.css sets font-weight 400 explicitly so headings never
// synthesise a fake bold.
const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  variable: '--font-display',
  weight: '400',
})

// Body was Inter, which is the default face in nearly every AI design tool and
// component library — the single most-cited giveaway that a site was generated
// rather than designed. Archivo is a grotesque drawn for print headlines: it is
// narrower, its apertures open wider, and it holds its shape in the tracked
// uppercase labels this site leans on, which is exactly where Inter goes limp.
const archivo = Archivo({
  subsets: ['latin'],
  variable: '--font-body',
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Ananda Triharis Maroso — Portfolio',
    template: '%s — Ananda Triharis Maroso',
  },
  description: profile.summary,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'en_SG',
    url: '/',
    siteName: profile.name,
    title: 'Ananda Triharis Maroso — Portfolio',
    description: profile.summary,
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'Ananda Triharis Maroso' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ananda Triharis Maroso — Portfolio',
    description: profile.summary,
    images: ['/opengraph-image'],
  },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${instrumentSerif.variable} ${archivo.variable} site-body`}
      >
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  )
}
