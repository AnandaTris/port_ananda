import { render, screen, within } from '@testing-library/react'
import { projects } from '@/content/projects'
import { ProjectDetailPanel } from './ProjectDetailPanel'

const project = projects.find((entry) => entry.slug === 'fix-yo-yap')!

test('names the three sections plainly, with no lens or evidence framing', () => {
  render(
    <>
      <ProjectDetailPanel project={project} section="overview" />
      <ProjectDetailPanel project={project} section="build" />
      <ProjectDetailPanel project={project} section="results" />
    </>,
  )

  expect(
    screen.getAllByRole('heading', { level: 2 }).map((heading) => heading.textContent),
  ).toEqual(['What it does and why', 'How it works', 'Outcomes, ownership, and limits'])
  expect(screen.queryByText(/lens|field note|fieldbook/i)).not.toBeInTheDocument()
})

test('prints each outcome once across the three panels', () => {
  // The panels used to be alternative views the reader toggled between, so
  // repeating the outcomes in Overview cost nothing. All three render together
  // now, and the reader met the same list twice on one page.
  render(
    <>
      <ProjectDetailPanel project={project} section="overview" />
      <ProjectDetailPanel project={project} section="build" />
      <ProjectDetailPanel project={project} section="results" />
    </>,
  )

  for (const outcome of project.outcomes) {
    expect(screen.getAllByText(outcome.value)).toHaveLength(1)
  }
})

test('keeps the overview to the problem and the hard decision', () => {
  render(<ProjectDetailPanel project={project} section="overview" />)

  const facts = screen.getByRole('heading', { level: 2 }).closest('section')!
  expect(within(facts).getAllByRole('term').map((term) => term.textContent)).toEqual([
    'Problem',
    'Hard decision',
  ])
})

test('attributes every recorded outcome to a source in the results panel', () => {
  render(<ProjectDetailPanel project={project} section="results" />)

  const outcomes = screen.getByRole('list', { name: 'Recorded project outcomes' })
  expect(outcomes.children).toHaveLength(project.outcomes.length)
  project.outcomes.forEach((outcome, index) => {
    expect(outcomes.children[index]).toHaveTextContent(`Source: ${outcome.source}`)
  })
})
