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

// The nav is the table of contents for the page, so it is spelled out here in
// full: a section that gets renamed or dropped has to be renamed or dropped in
// both places or this fails.
const anchors = [
  ['Projects', '#projects'],
  ['Experience', '#experience'],
  ['Stack', '#stack'],
  ['Research', '#research'],
  ['Contact', '#contact'],
] as const

test('keeps local content anchors when rendered on the home route', () => {
  render(<SiteHeader />)

  for (const [label, href] of anchors) {
    expect(screen.getByRole('link', { name: label })).toHaveAttribute('href', href)
  }
  expect(screen.getByRole('link', { name: /ANANDA/i })).toHaveAttribute('href', '#main-content')
})

test('qualifies every home anchor when rendered on a project route', () => {
  route.pathname = '/work/fix-yo-yap'
  render(<SiteHeader />)

  for (const [label, href] of anchors) {
    expect(screen.getByRole('link', { name: label })).toHaveAttribute('href', `/${href}`)
  }
  expect(screen.getByRole('link', { name: /ANANDA/i })).toHaveAttribute(
    'href',
    '/#main-content',
  )
})

test('carries the name and the place in the site mark, and no job title', () => {
  render(<SiteHeader />)

  expect(screen.getByRole('link', { name: /ANANDA/i })).toHaveTextContent('ANANDA/SINGAPORE')
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
  fireEvent.click(screen.getByRole('link', { name: 'Projects' }))

  expect(screen.getByRole('button', { name: 'Open menu' })).toHaveAttribute(
    'aria-expanded',
    'false',
  )
  expect(screen.getByRole('navigation', { name: 'Primary navigation' })).not.toHaveClass(
    'is-open',
  )
})
