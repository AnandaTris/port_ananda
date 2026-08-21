import { render, screen } from '@testing-library/react'
import { projects } from '@/content/projects'
import { ProjectLensPanel } from './ProjectLensPanel'

const project = projects.find((item) => item.slug === 'carekaki')!

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
