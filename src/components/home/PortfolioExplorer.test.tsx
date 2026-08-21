import { fireEvent, render, screen } from '@testing-library/react'
import { beforeEach, vi } from 'vitest'
import { PortfolioExplorer } from './PortfolioExplorer'

const navigation = vi.hoisted(() => ({
  pathname: '/',
  searchParams: new URLSearchParams(),
  replace: vi.fn(),
}))

vi.mock('next/navigation', () => ({
  usePathname: () => navigation.pathname,
  useRouter: () => ({ replace: navigation.replace }),
  useSearchParams: () => navigation.searchParams,
}))

beforeEach(() => {
  navigation.pathname = '/'
  navigation.searchParams = new URLSearchParams()
  navigation.replace.mockReset()
})

test('renders collaboration capabilities and an accessible lens control', () => {
  render(<PortfolioExplorer />)

  expect(screen.getByRole('button', { name: 'Build and ship a product' })).toBeInTheDocument()
  expect(screen.getByRole('button', { name: 'Apply AI responsibly' })).toBeInTheDocument()
  expect(screen.getByRole('button', { name: 'Evaluate and harden a system' })).toBeInTheDocument()
  expect(screen.getByRole('button', { name: 'Price, launch, and grow' })).toBeInTheDocument()
  expect(
    screen.getByRole('button', { name: 'Prototype an interactive or hardware experience' }),
  ).toBeInTheDocument()
  expect(screen.getByRole('button', { name: 'Story' })).toHaveAttribute('aria-pressed', 'true')
})

test('replaces the URL when a lens is selected', () => {
  render(<PortfolioExplorer />)

  fireEvent.click(screen.getByRole('button', { name: 'Proof' }))

  expect(navigation.replace).toHaveBeenCalledWith('/?lens=proof#work', { scroll: false })
})

test('hydrates both controls from a shared URL and follows browser-back query changes', () => {
  navigation.searchParams = new URLSearchParams('lens=system&capability=ship')
  const { rerender } = render(<PortfolioExplorer />)

  expect(screen.getByRole('button', { name: 'System' })).toHaveAttribute('aria-pressed', 'true')
  expect(screen.getByRole('button', { name: 'Build and ship a product' })).toHaveAttribute(
    'aria-pressed',
    'true',
  )

  navigation.searchParams = new URLSearchParams('lens=proof&capability=prototype')
  rerender(<PortfolioExplorer />)

  expect(screen.getByRole('button', { name: 'Proof' })).toHaveAttribute('aria-pressed', 'true')
  expect(
    screen.getByRole('button', { name: 'Prototype an interactive or hardware experience' }),
  ).toHaveAttribute('aria-pressed', 'true')
})

test('preserves the selected lens when a capability is chosen', () => {
  navigation.searchParams = new URLSearchParams('lens=proof')
  render(<PortfolioExplorer />)

  fireEvent.click(screen.getByRole('button', { name: 'Price, launch, and grow' }))

  expect(navigation.replace).toHaveBeenCalledWith('/?lens=proof&capability=grow#work', {
    scroll: false,
  })
})

test('preserves the selected capability when a lens is chosen', () => {
  navigation.searchParams = new URLSearchParams('capability=harden')
  render(<PortfolioExplorer />)

  fireEvent.click(screen.getByRole('button', { name: 'System' }))

  expect(navigation.replace).toHaveBeenCalledWith('/?lens=system&capability=harden#work', {
    scroll: false,
  })
})
