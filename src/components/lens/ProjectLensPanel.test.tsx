import { act } from 'react'
import { hydrateRoot, type Root } from 'react-dom/client'
import { renderToString } from 'react-dom/server'
import { render, screen, within } from '@testing-library/react'
import { afterEach, vi } from 'vitest'
import { projects } from '@/content/projects'
import { ProjectLensPanel } from './ProjectLensPanel'

const reducedMotion = vi.hoisted(() => ({ value: null as boolean | null }))

vi.mock('motion/react', async (importOriginal) => {
  const actual = await importOriginal<typeof import('motion/react')>()
  return {
    ...actual,
    useReducedMotion: () => reducedMotion.value,
  }
})

const project = projects.find((item) => item.slug === 'carekaki')!

afterEach(() => {
  reducedMotion.value = null
})

test('separates story, system, and proof content', () => {
  const { rerender } = render(<ProjectLensPanel project={project} lens="story" compact />)
  expect(screen.getByText(project.problem)).toBeInTheDocument()
  expect(screen.getByText(project.hardDecision)).toBeInTheDocument()

  rerender(<ProjectLensPanel project={project} lens="system" compact />)
  expect(screen.getByRole('list', { name: 'System decisions' })).toBeInTheDocument()
  expect(screen.getByRole('list', { name: 'Technology stack' })).toBeInTheDocument()

  rerender(<ProjectLensPanel project={project} lens="proof" compact />)
  expect(screen.getByText(project.role)).toBeInTheDocument()
  expect(screen.getByText(project.contributionBoundary!)).toBeInTheDocument()
  expect(screen.getByText(project.limitations[0])).toBeInTheDocument()
})

test('renders only verified project links in proof', () => {
  render(<ProjectLensPanel project={project} lens="proof" compact />)

  expect(screen.getByRole('link', { name: /source/i })).toHaveAttribute('href', project.links.source)
  expect(screen.queryByRole('link', { name: /live product/i })).not.toBeInTheDocument()
  expect(screen.queryByRole('link', { name: /app store/i })).not.toBeInTheDocument()
})

test('renders every CareKaki outcome with its label, value, and source in proof', () => {
  render(<ProjectLensPanel project={project} lens="proof" compact />)

  const outcomes = screen.getByRole('list', { name: 'Verified project outcomes' })
  expect(within(outcomes).getByText('Recognition')).toBeInTheDocument()
  expect(
    within(outcomes).getByText('Dell InnovateDash 2026 Top 5 Finalist'),
  ).toBeInTheDocument()
  expect(within(outcomes).getByText('Source: award')).toBeInTheDocument()
  expect(within(outcomes).getByText('Offline verification')).toBeInTheDocument()
  expect(
    within(outcomes).getByText('208 backend tests designed to run without API keys'),
  ).toBeInTheDocument()
  expect(within(outcomes).getByText('Source: test')).toBeInTheDocument()
})

test('hydrates reduced-motion content from the same plain server wrapper', async () => {
  reducedMotion.value = null
  const serverHtml = renderToString(<ProjectLensPanel project={project} lens="story" compact />)

  expect(serverHtml).not.toMatch(/style="[^"]*(?:opacity|transform)/)

  reducedMotion.value = true
  const container = document.createElement('div')
  container.innerHTML = serverHtml
  document.body.append(container)
  const consoleError = vi.spyOn(console, 'error').mockImplementation(() => undefined)
  let root: Root | undefined

  try {
    await act(async () => {
      root = hydrateRoot(container, <ProjectLensPanel project={project} lens="story" compact />)
      await Promise.resolve()
    })

    expect(container.querySelector('.lens-panel-frame')).not.toHaveClass(
      'lens-panel-frame-motion',
    )
    expect(container.querySelector('.lens-panel-frame')).not.toHaveAttribute('style')
    expect(consoleError.mock.calls.flat().join(' ')).not.toMatch(/hydration/i)
  } finally {
    if (root) {
      await act(async () => root?.unmount())
    }
    consoleError.mockRestore()
    container.remove()
  }
})

test('opts motion-capable clients into the keyed transition after hydration', async () => {
  reducedMotion.value = null
  const serverHtml = renderToString(<ProjectLensPanel project={project} lens="story" compact />)
  const container = document.createElement('div')
  container.innerHTML = serverHtml
  document.body.append(container)
  reducedMotion.value = false
  let root: Root | undefined

  try {
    await act(async () => {
      root = hydrateRoot(container, <ProjectLensPanel project={project} lens="story" compact />)
      await Promise.resolve()
    })

    expect(container.querySelector('.lens-panel-frame')).toHaveClass('lens-panel-frame-motion')
  } finally {
    if (root) {
      await act(async () => root?.unmount())
    }
    container.remove()
  }
})
