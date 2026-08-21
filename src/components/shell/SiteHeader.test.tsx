import { fireEvent, render, screen } from '@testing-library/react'
import { beforeEach, vi } from 'vitest'
import { SiteHeader } from './SiteHeader'

const route = vi.hoisted(() => ({ pathname: '/' }))

vi.mock('next/navigation', () => ({
  usePathname: () => route.pathname,
}))

beforeEach(() => {
  route.pathname = '/'
})

test('keeps local content anchors when rendered on the home route', () => {
  render(<SiteHeader />)

  expect(screen.getByRole('link', { name: 'Work' })).toHaveAttribute('href', '#work')
  expect(screen.getByRole('link', { name: 'Principles' })).toHaveAttribute('href', '#principles')
  expect(screen.getByRole('link', { name: 'Experience' })).toHaveAttribute('href', '#experience')
  expect(screen.getByRole('link', { name: 'Contact' })).toHaveAttribute('href', '#contact')
  expect(screen.getByRole('link', { name: /ANANDA/i })).toHaveAttribute('href', '#main-content')
})

test('qualifies every home anchor when rendered on a project route', () => {
  route.pathname = '/work/fix-yo-yap'
  render(<SiteHeader />)

  expect(screen.getByRole('link', { name: 'Work' })).toHaveAttribute('href', '/#work')
  expect(screen.getByRole('link', { name: 'Principles' })).toHaveAttribute(
    'href',
    '/#principles',
  )
  expect(screen.getByRole('link', { name: 'Experience' })).toHaveAttribute(
    'href',
    '/#experience',
  )
  expect(screen.getByRole('link', { name: 'Contact' })).toHaveAttribute('href', '/#contact')
  expect(screen.getByRole('link', { name: /ANANDA/i })).toHaveAttribute(
    'href',
    '/#main-content',
  )
})

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
