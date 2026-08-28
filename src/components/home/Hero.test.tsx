import { render, screen } from '@testing-library/react'
import { Hero } from './Hero'

test('leads with the name, the location, and the three public contacts', () => {
  render(<Hero />)

  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Ananda Triharis Maroso')
  expect(screen.getByText('Singapore')).toBeInTheDocument()
  expect(
    screen.getAllByRole('link').map((link) => link.getAttribute('href')),
  ).toEqual([
    'mailto:adotriharis@gmail.com',
    'https://www.linkedin.com/in/ananda-trimar/',
    'https://github.com/AnandaTris',
  ])
})

test('opens on the work rather than on a pitch', () => {
  render(<Hero />)

  // The stripped-down hero has no thesis line, no supporting paragraph, and no
  // statistic tiles. Asserting their absence is the point of the rewrite: this
  // fails the moment marketing copy grows back above the project list.
  expect(screen.queryByText(/show their work|build something together|fieldbook/i)).toBeNull()
  expect(screen.queryByRole('button')).toBeNull()
  expect(document.querySelector('.proof-tile')).toBeNull()
})
