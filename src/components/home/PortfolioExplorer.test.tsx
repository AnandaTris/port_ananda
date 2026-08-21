import { fireEvent, render, screen } from '@testing-library/react'
import { beforeEach } from 'vitest'
import { projects } from '@/content/projects'
import { PortfolioExplorer } from './PortfolioExplorer'

const featuredProjects = projects.filter((project) => project.featured)

beforeEach(() => {
  window.history.replaceState(null, '', '/')
})

function renderExplorer() {
  return render(<PortfolioExplorer projects={featuredProjects} />)
}

test('renders collaboration capabilities and an accessible lens control', () => {
  renderExplorer()

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

test('owns only the URL-driven featured journey, leaving static profile regions to the page', () => {
  renderExplorer()

  expect(
    screen.getByRole('heading', { name: 'Five products, one accountable through-line.' }),
  ).toBeInTheDocument()
  expect(
    screen.queryByRole('heading', { name: 'Operating principles for accountable products' }),
  ).not.toBeInTheDocument()
  expect(
    screen.queryByRole('heading', { name: 'Professional product work' }),
  ).not.toBeInTheDocument()
  expect(
    screen.queryByRole('heading', { name: 'Every project, with its evidence boundary.' }),
  ).not.toBeInTheDocument()
  expect(
    screen.queryByRole('heading', { name: 'Experience, research, awards, and leadership' }),
  ).not.toBeInTheDocument()
  expect(
    screen.queryByRole('heading', { name: 'Build something useful together' }),
  ).not.toBeInTheDocument()
})

test('provides an explicit URL-backed path to clear an active capability', () => {
  window.history.replaceState(null, '', '/?capability=ship#work')
  renderExplorer()

  fireEvent.click(screen.getByRole('button', { name: 'All capabilities' }))

  expect(`${window.location.pathname}${window.location.search}${window.location.hash}`).toBe(
    '/?lens=story#work',
  )
})

test('replaces the shareable URL when a lens is selected', () => {
  renderExplorer()

  fireEvent.click(screen.getByRole('button', { name: 'Proof' }))

  expect(`${window.location.pathname}${window.location.search}${window.location.hash}`).toBe(
    '/?lens=proof#work',
  )
})

test('hydrates both controls from a shared URL and follows browser-back query changes', () => {
  window.history.replaceState(null, '', '/?lens=system&capability=ship#work')
  renderExplorer()

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
  renderExplorer()

  fireEvent.click(screen.getByRole('button', { name: 'Price, launch, and grow' }))

  expect(`${window.location.pathname}${window.location.search}${window.location.hash}`).toBe(
    '/?lens=proof&capability=grow#work',
  )
})

test('preserves the selected capability when a lens is chosen', () => {
  window.history.replaceState(null, '', '/?capability=harden#work')
  renderExplorer()

  fireEvent.click(screen.getByRole('button', { name: 'System' }))

  expect(`${window.location.pathname}${window.location.search}${window.location.hash}`).toBe(
    '/?lens=system&capability=harden#work',
  )
})
