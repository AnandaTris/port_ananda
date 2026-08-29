import { act } from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, vi } from 'vitest'
import { ExcerptRegistry } from './ExcerptRegistry'

let intersectionCallback: IntersectionObserverCallback | undefined
let intersectionOptions: IntersectionObserverInit | undefined

class MockIntersectionObserver {
  constructor(callback: IntersectionObserverCallback, options?: IntersectionObserverInit) {
    intersectionCallback = callback
    intersectionOptions = options
  }

  disconnect = vi.fn()
  observe = vi.fn()
  unobserve = vi.fn()
}

beforeEach(() => {
  intersectionCallback = undefined
  intersectionOptions = undefined
  vi.stubGlobal('IntersectionObserver', MockIntersectionObserver)
})

afterEach(() => {
  vi.unstubAllGlobals()
})

const approvedExcerpts = [
  {
    slug: 'carekaki',
    heading: 'CareKaki Guardian',
    loadLabel: 'Load CareKaki Guardian interactive excerpt',
    resultsLabel: 'See CareKaki results',
    resultsHref: '#carekaki-results',
  },
  {
    slug: 'das-dial',
    heading: 'DAS D.I.A.L.',
    loadLabel: 'Load DAS D.I.A.L. interactive excerpt',
    resultsLabel: 'See DAS D.I.A.L. results',
    resultsHref: '#das-dial-results',
  },
  {
    slug: 'fix-yo-yap',
    heading: 'Fix Yo Yap persona card',
    loadLabel: 'Load Fix Yo Yap persona card interactive excerpt',
    resultsLabel: 'See Fix Yo Yap results',
    resultsHref: '#fix-yo-yap-results',
  },
] as const

test.each(approvedExcerpts)(
  'defers $slug until requested, then maps it to the approved excerpt and its results link',
  async ({ slug, heading, loadLabel, resultsLabel, resultsHref }) => {
  const { unmount } = render(<ExcerptRegistry slug={slug} />)

  expect(screen.getByText('Interactive excerpt')).toBeInTheDocument()
  expect(screen.queryByRole('heading', { name: heading })).not.toBeInTheDocument()
  fireEvent.click(screen.getByRole('button', { name: loadLabel }))

  expect(await screen.findByRole('heading', { name: heading })).toBeInTheDocument()
  expect(screen.getByRole('link', { name: resultsLabel })).toHaveAttribute('href', resultsHref)

  unmount()
  },
)

test('loads an approved excerpt when it approaches the viewport', async () => {
  render(<ExcerptRegistry slug="carekaki" />)

  expect(screen.queryByRole('heading', { name: 'CareKaki Guardian' })).not.toBeInTheDocument()
  expect(intersectionOptions).toMatchObject({ rootMargin: '320px 0px' })
  expect(intersectionCallback).toBeDefined()

  act(() => {
    intersectionCallback?.([{ isIntersecting: true } as IntersectionObserverEntry], {} as IntersectionObserver)
  })

  expect(await screen.findByRole('heading', { name: 'CareKaki Guardian' })).toBeInTheDocument()
})

test('returns no excerpt for an unapproved project slug', () => {
  const { container } = render(<ExcerptRegistry slug="not-an-excerpt" />)

  expect(container).toBeEmptyDOMElement()
})

test('redacts Guardian input locally and resets to its initial empty state', async () => {
  render(<ExcerptRegistry slug="carekaki" />)

  fireEvent.click(screen.getByRole('button', { name: 'Load CareKaki Guardian interactive excerpt' }))
  const message = await screen.findByRole('textbox', { name: 'Visitor message' })
  fireEvent.change(message, { target: { value: 'Email ada@example.com' } })
  expect(screen.getByRole('status')).toHaveTextContent('Email [EMAIL REDACTED]')

  fireEvent.click(screen.getByRole('button', { name: 'Reset' }))
  expect(message).toHaveValue('')
  expect(screen.getByRole('status')).toHaveTextContent('No approval needed')
})

test('shows the exact DAS disclaimer and resets the selected example', async () => {
  render(<ExcerptRegistry slug="das-dial" />)

  fireEvent.click(screen.getByRole('button', { name: 'Load DAS D.I.A.L. interactive excerpt' }))
  await screen.findByRole('heading', { name: 'DAS D.I.A.L.' })
  expect(
    screen.getByText('Screening aid only — this excerpt does not diagnose dyslexia.'),
  ).toBeInTheDocument()
  fireEvent.click(screen.getByRole('radio', { name: /sret/i }))
  expect(screen.getByText('street')).toBeInTheDocument()

  fireEvent.click(screen.getByRole('button', { name: 'Reset' }))
  expect(screen.getByRole('radio', { name: /enuf/i })).toBeChecked()
})

test('discloses fixed Fix Yo Yap rules and resets the persona preset', async () => {
  render(<ExcerptRegistry slug="fix-yo-yap" />)

  fireEvent.click(
    screen.getByRole('button', { name: 'Load Fix Yo Yap persona card interactive excerpt' }),
  )
  await screen.findByRole('heading', { name: 'Fix Yo Yap persona card' })
  expect(
    screen.getByText(
      'These are fixed demonstration rules and not Fix Yo Yap’s production scoring service.',
    ),
  ).toBeInTheDocument()
  fireEvent.click(screen.getByRole('radio', { name: /restarted sentences/i }))
  expect(screen.getByRole('status')).toHaveTextContent('The Restarter')
  expect(screen.getByRole('status')).toHaveTextContent('64% of sentences finished')

  fireEvent.click(screen.getByRole('radio', { name: /nothing stands out/i }))
  expect(screen.getByRole('status')).toHaveTextContent('landed closest to')

  fireEvent.click(screen.getByRole('button', { name: 'Reset' }))
  expect(screen.getByRole('radio', { name: /fast, almost no gaps/i })).toBeChecked()
  expect(screen.getByRole('status')).toHaveTextContent('The Fast Talker')
})
