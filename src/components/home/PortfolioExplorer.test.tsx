import { fireEvent, render, screen } from '@testing-library/react'
import { vi } from 'vitest'
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
