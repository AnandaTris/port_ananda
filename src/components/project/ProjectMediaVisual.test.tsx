import { fireEvent, render, screen, within } from '@testing-library/react'
import { projects } from '@/content/projects'
import { ProjectMediaVisual } from './ProjectMediaVisual'

const mediaProject = projects.find((project) => project.slug === 'fix-yo-yap')!
const noMediaProject = projects.find((project) => project.slug === 'cseshell')!

test('replaces a failed screenshot with a titled status and system fallback', () => {
  render(<ProjectMediaVisual project={mediaProject} />)

  const image = screen.getByRole('img', { name: mediaProject.media[0].alt })
  expect(image).toHaveAttribute('width', String(mediaProject.media[0].width))
  expect(image).toHaveAttribute('height', String(mediaProject.media[0].height))

  fireEvent.error(image)

  expect(screen.queryByRole('img', { name: mediaProject.media[0].alt })).not.toBeInTheDocument()
  const fallback = screen.getByRole('img', { name: 'Fix Yo Yap system diagram' })
  expect(within(fallback).getByText('No screenshot')).toBeInTheDocument()
  expect(within(fallback).getByText('Deterministic scorer')).toBeInTheDocument()
  // The hero already carries the name and the status. The panel that stands in
  // for a missing picture must not say them a second time.
  expect(within(fallback).queryByText('Fix Yo Yap')).not.toBeInTheDocument()
  expect(within(fallback).queryByText('Shipped')).not.toBeInTheDocument()
})

test('renders every media item a project declares', () => {
  render(<ProjectMediaVisual project={mediaProject} />)

  expect(screen.getAllByRole('img')).toHaveLength(mediaProject.media.length)
  expect(screen.getByRole('img', { name: mediaProject.media[0].alt })).toBeInTheDocument()
})

test('uses the same immediate fallback when a project has no media', () => {
  // Guards the fixture as much as the component: this test only says anything
  // once the project it picks genuinely ships without screenshots.
  expect(noMediaProject.media).toHaveLength(0)

  render(<ProjectMediaVisual project={noMediaProject} />)

  const fallback = screen.getByRole('img', { name: 'CSEShell system diagram' })
  expect(fallback).toHaveClass('case-study-visual', 'case-study-diagram')
  expect(within(fallback).getByText('Command loop')).toBeInTheDocument()
  expect(within(fallback).queryByText('CSEShell')).not.toBeInTheDocument()
})
