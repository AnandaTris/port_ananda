import { fireEvent, render, screen, within } from '@testing-library/react'
import { projects } from '@/content/projects'
import { ProjectMediaVisual } from './ProjectMediaVisual'

const mediaProject = projects.find((project) => project.slug === 'fix-yo-yap')!
const noMediaProject = projects.find((project) => project.slug === 'das-dial')!

test('replaces a failed screenshot with a titled status and system fallback', () => {
  render(<ProjectMediaVisual project={mediaProject} />)

  const image = screen.getByRole('img', { name: mediaProject.media[0].alt })
  expect(image).toHaveAttribute('width', String(mediaProject.media[0].width))
  expect(image).toHaveAttribute('height', String(mediaProject.media[0].height))

  fireEvent.error(image)

  expect(screen.queryByRole('img', { name: mediaProject.media[0].alt })).not.toBeInTheDocument()
  const fallback = screen.getByRole('img', { name: 'Fix Yo Yap media fallback' })
  expect(within(fallback).getByText('Fix Yo Yap')).toBeInTheDocument()
  expect(within(fallback).getByText('Live product')).toBeInTheDocument()
  expect(within(fallback).getByText('Deterministic scorer')).toBeInTheDocument()
})

test('renders every media item a project declares', () => {
  render(<ProjectMediaVisual project={mediaProject} />)

  expect(screen.getAllByRole('img')).toHaveLength(mediaProject.media.length)
  expect(screen.getByRole('img', { name: mediaProject.media[0].alt })).toBeInTheDocument()
})

test('uses the same immediate fallback when a project has no media', () => {
  render(<ProjectMediaVisual project={noMediaProject} />)

  const fallback = screen.getByRole('img', { name: 'DAS D.I.A.L. media fallback' })
  expect(fallback).toHaveClass('case-study-visual', 'case-study-diagram')
  expect(within(fallback).getByText('Source-backed')).toBeInTheDocument()
  expect(within(fallback).getByText('Rules over extracted evidence')).toBeInTheDocument()
})
