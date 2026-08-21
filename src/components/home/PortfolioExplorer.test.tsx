import { fireEvent, render, screen } from '@testing-library/react'
import { beforeEach } from 'vitest'
import { PortfolioExplorer } from './PortfolioExplorer'

beforeEach(() => {
  window.history.replaceState(null, '', '/')
})

test('renders collaboration capabilities and an accessible lens control', () => {
  render(<PortfolioExplorer />)

  expect(screen.getByRole('button', { name: 'All capabilities' })).toHaveAttribute(
    'aria-pressed',
    'true',
  )
  expect(screen.getByRole('button', { name: 'Build and ship a product' })).toBeInTheDocument()
  expect(screen.getByRole('button', { name: 'Apply AI responsibly' })).toBeInTheDocument()
  expect(screen.getByRole('button', { name: 'Evaluate and harden a system' })).toBeInTheDocument()
  expect(screen.getByRole('button', { name: 'Price, launch, and grow' })).toBeInTheDocument()
  expect(
    screen.getByRole('button', { name: 'Prototype an interactive or hardware experience' }),
  ).toBeInTheDocument()
  expect(screen.getByRole('button', { name: 'Story' })).toHaveAttribute('aria-pressed', 'true')
})

test('provides an explicit URL-backed path to clear an active capability', () => {
  window.history.replaceState(null, '', '/?capability=ship#work')
  render(<PortfolioExplorer />)

  fireEvent.click(screen.getByRole('button', { name: 'All capabilities' }))

  expect(`${window.location.pathname}${window.location.search}${window.location.hash}`).toBe(
    '/?lens=story#work',
  )
})

test('replaces the shareable URL when a lens is selected', () => {
  render(<PortfolioExplorer />)

  fireEvent.click(screen.getByRole('button', { name: 'Proof' }))

  expect(`${window.location.pathname}${window.location.search}${window.location.hash}`).toBe(
    '/?lens=proof#work',
  )
})

test('hydrates both controls from a shared URL and follows browser-back query changes', () => {
  window.history.replaceState(null, '', '/?lens=system&capability=ship#work')
  render(<PortfolioExplorer />)

  expect(screen.getByRole('button', { name: 'System' })).toHaveAttribute('aria-pressed', 'true')
  expect(screen.getByRole('button', { name: 'Build and ship a product' })).toHaveAttribute(
    'aria-pressed',
    'true',
  )

  window.history.replaceState(null, '', '/?lens=proof&capability=prototype#work')
  fireEvent(window, new PopStateEvent('popstate'))

  expect(screen.getByRole('button', { name: 'Proof' })).toHaveAttribute('aria-pressed', 'true')
  expect(
    screen.getByRole('button', { name: 'Prototype an interactive or hardware experience' }),
  ).toHaveAttribute('aria-pressed', 'true')
})

test('preserves the selected lens when a capability is chosen', () => {
  window.history.replaceState(null, '', '/?lens=proof#work')
  render(<PortfolioExplorer />)

  fireEvent.click(screen.getByRole('button', { name: 'Price, launch, and grow' }))

  expect(`${window.location.pathname}${window.location.search}${window.location.hash}`).toBe(
    '/?lens=proof&capability=grow#work',
  )
})

test('preserves the selected capability when a lens is chosen', () => {
  window.history.replaceState(null, '', '/?capability=harden#work')
  render(<PortfolioExplorer />)

  fireEvent.click(screen.getByRole('button', { name: 'System' }))

  expect(`${window.location.pathname}${window.location.search}${window.location.hash}`).toBe(
    '/?lens=system&capability=harden#work',
  )
})
