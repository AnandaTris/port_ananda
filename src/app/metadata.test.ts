import { metadata } from './layout'
import { contentType, size } from './opengraph-image'
import robots from './robots'
import sitemap from './sitemap'
import { SITE_URL } from '@/lib/site'

const approvedSlugs = [
  'fix-yo-yap',
  'carekaki',
  'das-dial',
  'false-positive',
  'cited',
  'brawnix',
  'ingatik-recall',
  'fames',
  'hypecast',
  'steady',
  'rekap',
  'spike-responder',
  'math-me-home',
  'onesearch',
  'aegis',
  'hydrun',
  'personal-workout-tracker',
]

test('publishes home and every approved project route', () => {
  const urls = sitemap().map((entry) => entry.url)

  expect(urls).toEqual([
    `${SITE_URL}/`,
    ...approvedSlugs.map((slug) => `${SITE_URL}/work/${slug}`),
  ])
  expect(urls).toHaveLength(18)
  expect(urls).not.toEqual(expect.arrayContaining([
    expect.stringMatching(/chord|docdeck|pufferty|meowtivation/i),
  ]))
})

test('allows normal crawling and points robots at the canonical sitemap', () => {
  expect(robots()).toEqual({
    rules: { userAgent: '*', allow: '/' },
    sitemap: `${SITE_URL}/sitemap.xml`,
  })
})

test('publishes coherent canonical Open Graph and Twitter defaults', () => {
  expect(metadata.metadataBase).toEqual(new URL(SITE_URL))
  expect(metadata.alternates).toEqual({ canonical: '/' })
  expect(metadata.openGraph).toMatchObject({
    type: 'website',
    url: '/',
    siteName: 'Ananda Triharis Maroso',
    title: 'Ananda Triharis Maroso — AI Product Builder',
    description: 'I build AI products people can understand, trust, and use.',
    images: [{ url: '/opengraph-image', width: 1200, height: 630 }],
  })
  expect(metadata.twitter).toMatchObject({
    card: 'summary_large_image',
    images: ['/opengraph-image'],
  })
})

test('exports a 1200 by 630 Open Graph image configuration', () => {
  expect(size).toEqual({ width: 1200, height: 630 })
  expect(contentType).toBe('image/png')
})
