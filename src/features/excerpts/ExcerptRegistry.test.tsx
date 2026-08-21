import { fireEvent, render, screen } from '@testing-library/react'
import { ExcerptRegistry } from './ExcerptRegistry'

test.each([
  ['carekaki', 'CareKaki Guardian'],
  ['das-dial', 'DAS D.I.A.L.'],
  ['cited', 'Cited visibility score'],
  ['fix-yo-yap', 'Fix Yo Yap persona card'],
])('maps %s to its approved interactive excerpt', (slug, heading) => {
  const { unmount } = render(<ExcerptRegistry slug={slug} />)

  expect(screen.getByText('Interactive excerpt')).toBeInTheDocument()
  expect(screen.getByRole('heading', { name: heading })).toBeInTheDocument()

  unmount()
})

test('returns no excerpt for an unapproved project slug', () => {
  const { container } = render(<ExcerptRegistry slug="not-an-excerpt" />)

  expect(container).toBeEmptyDOMElement()
})

test('redacts Guardian input locally and resets to its initial empty state', () => {
  render(<ExcerptRegistry slug="carekaki" />)

  const message = screen.getByRole('textbox', { name: 'Visitor message' })
  fireEvent.change(message, { target: { value: 'Email ada@example.com' } })
  expect(screen.getByRole('status')).toHaveTextContent('Email [EMAIL REDACTED]')

  fireEvent.click(screen.getByRole('button', { name: 'Reset' }))
  expect(message).toHaveValue('')
  expect(screen.getByRole('status')).toHaveTextContent('No approval needed')
})

test('shows the exact DAS disclaimer and resets the selected example', () => {
  render(<ExcerptRegistry slug="das-dial" />)

  expect(
    screen.getByText('Screening aid only — this excerpt does not diagnose dyslexia.'),
  ).toBeInTheDocument()
  fireEvent.click(screen.getByRole('radio', { name: /sret/i }))
  expect(screen.getByText('street')).toBeInTheDocument()

  fireEvent.click(screen.getByRole('button', { name: 'Reset' }))
  expect(screen.getByRole('radio', { name: /enuf/i })).toBeChecked()
})

test('discloses Cited modelled data and resets its deterministic controls', () => {
  render(<ExcerptRegistry slug="cited" />)

  expect(screen.getByText(/modelled data/i)).toBeInTheDocument()
  fireEvent.change(screen.getByLabelText('Rank'), { target: { value: '2' } })
  fireEvent.change(screen.getByLabelText('Sentiment'), { target: { value: 'neutral' } })
  expect(screen.getByRole('status')).toHaveTextContent('58.62')

  fireEvent.click(screen.getByRole('button', { name: 'Reset' }))
  expect(screen.getByLabelText('Rank')).toHaveValue('1')
  expect(screen.getByRole('status')).toHaveTextContent('100.00')
})

test('discloses fixed Fix Yo Yap rules and resets the persona preset', () => {
  render(<ExcerptRegistry slug="fix-yo-yap" />)

  expect(
    screen.getByText(
      'These are fixed demonstration rules and not Fix Yo Yap’s production scoring service.',
    ),
  ).toBeInTheDocument()
  fireEvent.click(screen.getByRole('radio', { name: /restarter sample/i }))
  expect(screen.getByRole('status')).toHaveTextContent('The Restarter')

  fireEvent.click(screen.getByRole('button', { name: 'Reset' }))
  expect(screen.getByRole('radio', { name: /closer sample/i })).toBeChecked()
  expect(screen.getByRole('status')).toHaveTextContent('The Closer')
})
