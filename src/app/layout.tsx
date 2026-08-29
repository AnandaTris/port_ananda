import type { Metadata } from 'next'
import { Archivo } from 'next/font/google'
import { MOTION_READY_SCRIPT } from '@/components/motion/motion-ready'
import { RevealRoot } from '@/components/motion/RevealRoot'
import { SiteFooter } from '@/components/shell/SiteFooter'
import { SiteHeader } from '@/components/shell/SiteHeader'
import { profile } from '@/content/profile'
import { SITE_URL } from '@/lib/site'
import './globals.css'

// The site's only face. Body was Inter, which is the default in nearly every AI
// design tool and component library — the most-cited giveaway that a site was
// generated rather than designed. Archivo is a grotesque drawn for print
// headlines: narrower, wider apertures, and it holds its shape both in a 4.75rem
// heading and in the tracked uppercase labels, which is exactly where Inter goes
// limp. Loading the variable font gives headings a real 600 instead of a
// synthesised bold, so the display role needs no second family.
//
// The variable goes on <html> rather than <body>: globals.css derives
// --font-label and --font-display from --font-body inside :root, and a custom
// property is substituted in the context of the element that declares it. Set on
// <body>, those two :root declarations resolve against an undefined
// --font-body and every label silently falls back to the system sans.
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
    <html className={archivo.variable} lang="en">
      <head>
        {/* Blocking on purpose: this has to settle before the first paint, or
            the page paints visible, hides itself on hydration, and animates
            content the reader has already seen. */}
        <script dangerouslySetInnerHTML={{ __html: MOTION_READY_SCRIPT }} />
      </head>
      <body className="site-body">
        <SiteHeader />
        {children}
        <SiteFooter />
        <RevealRoot />
      </body>
    </html>
  )
}
