import { Children, isValidElement, type CSSProperties, type ReactElement, type ReactNode } from 'react'
import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'

const imageResponse = vi.hoisted(() => vi.fn(function ImageResponse(element: unknown, options: unknown) {
  return { element, options }
}))

vi.mock('next/og', () => ({ ImageResponse: imageResponse }))

import { metadata } from './layout'
import OpenGraphImage, { contentType, size } from './opengraph-image'
import robots from './robots'
import sitemap from './sitemap'
import { SITE_URL } from '@/lib/site'

const expectedOrigin = 'https://anandatriharis.com'

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

  expect(SITE_URL).toBe(expectedOrigin)
  expect(urls).toEqual([
    `${expectedOrigin}/`,
    ...approvedSlugs.map((slug) => `${expectedOrigin}/work/${slug}`),
  ])
  expect(urls).toHaveLength(18)
  expect(urls).not.toEqual(expect.arrayContaining([
    expect.stringMatching(/chord|docdeck|pufferty|meowtivation/i),
  ]))
})

test('allows normal crawling and points robots at the canonical sitemap', () => {
  expect(robots()).toEqual({
    rules: { userAgent: '*', allow: '/' },
    sitemap: `${expectedOrigin}/sitemap.xml`,
  })
})

test('publishes coherent canonical Open Graph and Twitter defaults', () => {
  expect(metadata.metadataBase).toEqual(new URL(expectedOrigin))
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

function collectStyleValues(node: ReactNode): unknown[] {
  if (!isValidElement<{ style?: CSSProperties; children?: ReactNode }>(node)) return []

  return [
    ...Object.values(node.props.style ?? {}),
    ...Children.toArray(node.props.children).flatMap(collectStyleValues),
  ]
}

test('passes the exact Evidence Fieldbook copy and palette to ImageResponse', () => {
  imageResponse.mockClear()

  OpenGraphImage()

  expect(imageResponse).toHaveBeenCalledOnce()
  const [image, imageOptions] = imageResponse.mock.calls[0] as [ReactElement, typeof size]
  render(image)

  expect(imageOptions).toEqual({ width: 1200, height: 630 })
  expect(screen.getByText('Ananda Triharis Maroso', { exact: true })).toBeInTheDocument()
  expect(screen.getByText('I build AI products people can understand, trust, and use.', { exact: true })).toBeInTheDocument()
  expect(screen.getByText('Product × AI × Growth', { exact: true })).toBeInTheDocument()
  expect(collectStyleValues(image)).toEqual(expect.arrayContaining([
    '#FFF8ED',
    '#111318',
    '#DFFF00',
    '#28C9FF',
    '#FF5D3A',
  ]))
})
