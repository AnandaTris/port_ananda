import { render, screen } from '@testing-library/react'
import RootLayout, { metadata } from './layout'

test('publishes the portfolio identity', () => {
  render(<RootLayout><main>Portfolio body</main></RootLayout>)
  expect(screen.getByText('Portfolio body')).toBeInTheDocument()
  expect(metadata.title).toEqual({
    default: 'Ananda Triharis Maroso — Portfolio',
    template: '%s — Ananda Triharis Maroso',
  })
})
