import { render, screen } from '@testing-library/react'
import { Hero } from './Hero'

test('leads with the approved thesis and collaboration action', () => {
  render(<Hero />)

  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
    'I build AI products people can understand, trust, and use.',
  )
  expect(screen.getByRole('link', { name: 'Build something together' })).toHaveAttribute(
    'href',
    expect.stringMatching(/^mailto:adotriharis@gmail\.com/),
  )
  expect(screen.getByText('Live on the App Store')).toBeInTheDocument()
  expect(screen.getByText('Dell Top 5 finalist')).toBeInTheDocument()
  expect(screen.getByText('1,141 automated tests')).toBeInTheDocument()
})
