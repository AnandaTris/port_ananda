import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'
import { projects } from '@/content/projects'
import { ProjectArchive } from './ProjectArchive'

test('searches, reports results, and resets', async () => {
  const user = userEvent.setup()
  render(<ProjectArchive projects={projects} capability="all" />)

  await user.type(screen.getByRole('searchbox', { name: 'Search projects' }), '  FPGA  ')

  expect(screen.getByText('1 project')).toBeInTheDocument()
  expect(screen.getByRole('link', { name: /View evidence.*Math Me Home/i })).toHaveAttribute(
    'href',
    '/work/math-me-home',
  )

  await user.click(screen.getByRole('button', { name: 'Reset filters' }))
  expect(screen.getByText('17 projects')).toBeInTheDocument()
})

test('filters by maturity and keeps each result linked to evidence', async () => {
  const user = userEvent.setup()
  render(<ProjectArchive projects={projects} capability="all" />)

  await user.selectOptions(screen.getByRole('combobox', { name: 'Filter by maturity' }), 'live')

  expect(screen.getByText('3 projects')).toBeInTheDocument()
  expect(screen.getByRole('link', { name: /View evidence.*Fix Yo Yap/i })).toHaveAttribute(
    'href',
    '/work/fix-yo-yap',
  )
  expect(screen.getByRole('link', { name: /View evidence.*Brawnix/i })).toHaveAttribute(
    'href',
    '/work/brawnix',
  )
  expect(screen.queryByRole('link', { name: /View evidence.*Cited/i })).not.toBeInTheDocument()
})

test('ranks supplied capability matches first while local filters may reduce the archive', async () => {
  const user = userEvent.setup()
  render(<ProjectArchive projects={projects} capability="prototype" />)

  expect(screen.getByText('17 projects')).toBeInTheDocument()
  const headings = screen.getAllByRole('heading', { level: 3 })
  const firstNonMatch = headings.findIndex((heading) => {
    const project = projects.find((item) => item.name === heading.textContent)
    return project ? !project.capabilities.includes('prototype') : false
  })
  expect(firstNonMatch).toBeGreaterThan(0)
  expect(headings.slice(0, firstNonMatch).every((heading) => {
    const project = projects.find((item) => item.name === heading.textContent)
    return project?.capabilities.includes('prototype')
  })).toBe(true)

  await user.type(screen.getByRole('searchbox', { name: 'Search projects' }), '  NLP ')

  expect(screen.getByText('1 project')).toBeInTheDocument()
  expect(screen.getByRole('heading', { name: 'DAS D.I.A.L.' })).toBeInTheDocument()
  expect(screen.getByRole('button', { name: 'Reset filters' })).toBeInTheDocument()
})

test('reset clears the parent capability as well as local filters', async () => {
  const user = userEvent.setup()
  const clearCapability = vi.fn()
  render(
    <ProjectArchive
      capability="prototype"
      onCapabilityChange={clearCapability}
      projects={projects}
    />,
  )

  await user.type(screen.getByRole('searchbox', { name: 'Search projects' }), 'NLP')
  await user.selectOptions(screen.getByRole('combobox', { name: 'Filter by maturity' }), 'source-backed')
  await user.click(screen.getByRole('button', { name: 'Reset filters' }))

  expect(clearCapability).toHaveBeenCalledWith('all')
  expect(screen.getByRole('searchbox', { name: 'Search projects' })).toHaveValue('')
  expect(screen.getByRole('combobox', { name: 'Filter by maturity' })).toHaveValue('all')
})

test('exposes one evidence route for every approved project', () => {
  render(<ProjectArchive projects={projects} capability="all" />)

  const links = screen.getAllByRole('link', { name: /View evidence/i })
  expect(links).toHaveLength(projects.length)
  expect(links.map((link) => link.getAttribute('href'))).toEqual(
    projects.map((project) => `/work/${project.slug}`),
  )
})

test('reports empty results and reset restores the full roster', async () => {
  const user = userEvent.setup()
  render(<ProjectArchive projects={projects} capability="all" />)

  await user.type(screen.getByRole('searchbox', { name: 'Search projects' }), 'no-such-project')

  expect(screen.getByText('0 projects')).toBeInTheDocument()
  expect(screen.queryByRole('link', { name: /View evidence/i })).not.toBeInTheDocument()

  await user.click(screen.getByRole('button', { name: 'Reset filters' }))

  expect(screen.getByText('17 projects')).toBeInTheDocument()
  expect(screen.getAllByRole('link', { name: /View evidence/i })).toHaveLength(projects.length)
})
