import { fireEvent, render, screen, within } from '@testing-library/react'
import { projects } from '@/content/projects'
import { ProjectMediaVisual } from './ProjectMediaVisual'

const mediaProject = projects.find((project) => project.slug === 'fix-yo-yap')!
const noMediaProject = projects.find((project) => project.slug === 'carekaki')!

test('replaces failed verified media with a titled status and system fallback', () => {
  render(<ProjectMediaVisual project={mediaProject} variant="fieldbook" />)

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

test('uses the same immediate fallback when a project has no media', () => {
  render(<ProjectMediaVisual project={noMediaProject} variant="case-study" />)

  const fallback = screen.getByRole('img', { name: 'CareKaki media fallback' })
  expect(fallback).toHaveClass('case-study-visual', 'case-study-diagram')
  expect(within(fallback).getByText('Working demo')).toBeInTheDocument()
  expect(within(fallback).getByText('Guardian and action routing')).toBeInTheDocument()
})
