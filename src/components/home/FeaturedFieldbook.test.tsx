import { render, screen, within } from '@testing-library/react'
import { generateMetadata, generateStaticParams } from '@/app/work/[slug]/page'
import { SITE_URL } from '@/lib/site'
import { FeaturedFieldbook } from './FeaturedFieldbook'

const defaultOrder = ['Fix Yo Yap', 'CareKaki', 'DAS D.I.A.L.', 'FALSE POSITIVE', 'Cited']

function cardNames() {
  return screen.getAllByRole('article').map((card) =>
    within(card).getByRole('heading', { level: 3 }).textContent,
  )
}

test('keeps all five featured projects in the approved default order', () => {
  render(<FeaturedFieldbook capability="all" lens="story" />)

  expect(cardNames()).toEqual(defaultOrder)
  expect(screen.getAllByRole('img')).toHaveLength(5)
  expect(screen.getAllByRole('link', { name: 'Explore case study' })).toHaveLength(5)
  expect(document.querySelector('a article, article > a:only-child')).not.toBeInTheDocument()
})

test('stably prioritizes capability matches without filtering the fieldbook', () => {
  const { rerender } = render(<FeaturedFieldbook capability="grow" lens="story" />)

  expect(cardNames()).toEqual(['Cited', 'Fix Yo Yap', 'CareKaki', 'DAS D.I.A.L.', 'FALSE POSITIVE'])

  rerender(<FeaturedFieldbook capability="prototype" lens="proof" />)

  expect(cardNames()).toEqual(['CareKaki', 'DAS D.I.A.L.', 'FALSE POSITIVE', 'Fix Yo Yap', 'Cited'])
  expect(screen.getAllByRole('article')).toHaveLength(5)
  expect(screen.getAllByText('Solo product engineer and shipper').length).toBeGreaterThan(0)
})

test('generates the complete approved project route manifest', () => {
  expect(generateStaticParams().map(({ slug }) => slug)).toEqual([
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
  ])
})

test('generates canonical project metadata without an image when no local media exists', async () => {
  await expect(generateMetadata({ params: Promise.resolve({ slug: 'carekaki' }) })).resolves.toMatchObject({
    title: 'CareKaki',
    description:
      'A trilingual care navigator that keeps high-consequence actions behind deterministic safeguards and human gates.',
    alternates: { canonical: '/work/carekaki' },
    openGraph: {
      title: 'CareKaki',
      description:
        'A trilingual care navigator that keeps high-consequence actions behind deterministic safeguards and human gates.',
      url: '/work/carekaki',
    },
  })

  const metadata = await generateMetadata({ params: Promise.resolve({ slug: 'carekaki' }) })
  expect(metadata.openGraph).not.toHaveProperty('images')
})

test('uses the canonical local featured media URL for project Open Graph metadata', async () => {
  await expect(generateMetadata({ params: Promise.resolve({ slug: 'fix-yo-yap' }) })).resolves.toMatchObject({
    title: 'Fix Yo Yap',
    description: 'An impromptu speaking game that turns an auditable score into a memorable persona.',
    alternates: { canonical: '/work/fix-yo-yap' },
    openGraph: {
      title: 'Fix Yo Yap',
      description: 'An impromptu speaking game that turns an auditable score into a memorable persona.',
      url: '/work/fix-yo-yap',
      images: [
        {
          url: `${SITE_URL}/projects/fix-yo-yap/meet-your-yapper.png`,
          width: 1284,
          height: 2778,
        },
      ],
    },
  })
})
