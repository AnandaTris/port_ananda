import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
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

test('combines supplied capability with local archive filters', async () => {
  const user = userEvent.setup()
  render(<ProjectArchive projects={projects} capability="prototype" />)

  expect(screen.getByText('13 projects')).toBeInTheDocument()
  await user.type(screen.getByRole('searchbox', { name: 'Search projects' }), '  NLP ')

  expect(screen.getByText('1 project')).toBeInTheDocument()
  expect(screen.getByRole('heading', { name: 'DAS D.I.A.L.' })).toBeInTheDocument()
  expect(screen.getByRole('button', { name: 'Reset filters' })).toBeInTheDocument()
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
