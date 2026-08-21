import { fireEvent, render, screen } from '@testing-library/react'
import { SiteHeader } from './SiteHeader'

test('exposes the mobile menu state and controls relationship', () => {
  render(<SiteHeader />)

  const navigation = screen.getByRole('navigation', { name: 'Primary navigation' })
  const toggle = screen.getByRole('button', { name: 'Open menu' })

  expect(toggle).toHaveAttribute('aria-controls', 'primary-navigation')
  expect(toggle).toHaveAttribute('aria-expanded', 'false')
  expect(navigation).not.toHaveClass('is-open')

  fireEvent.click(toggle)

  expect(screen.getByRole('button', { name: 'Close menu' })).toHaveAttribute(
    'aria-expanded',
    'true',
  )
  expect(navigation).toHaveClass('is-open')

  fireEvent.click(screen.getByRole('button', { name: 'Close menu' }))

  expect(screen.getByRole('button', { name: 'Open menu' })).toHaveAttribute(
    'aria-expanded',
    'false',
  )
  expect(navigation).not.toHaveClass('is-open')
})

test('closes the mobile menu after selecting a navigation anchor', () => {
  render(<SiteHeader />)

  fireEvent.click(screen.getByRole('button', { name: 'Open menu' }))
  fireEvent.click(screen.getByRole('link', { name: 'Work' }))

  expect(screen.getByRole('button', { name: 'Open menu' })).toHaveAttribute(
    'aria-expanded',
    'false',
  )
  expect(screen.getByRole('navigation', { name: 'Primary navigation' })).not.toHaveClass(
    'is-open',
  )
})
