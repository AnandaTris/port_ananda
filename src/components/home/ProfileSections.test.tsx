import { render, screen, within } from '@testing-library/react'
import { profile } from '@/content/profile'
import { projects } from '@/content/projects'
import { stackGroups } from '@/content/stack'
import { ProfileSections } from './ProfileSections'

test('marks both live internships Current and preserves the professional reverse chronology', () => {
  render(<ProfileSections />)

  const workExperience = screen.getByRole('list', { name: 'Work experience' })
  const roles = Array.from(workExperience.children) as HTMLElement[]

  expect(roles).toHaveLength(3)
  expect(
    roles.map((role) => within(role).getByRole('heading', { level: 3 }).textContent),
  ).toEqual([
    'AI Research & Development Intern',
    'Technical Growth Product Manager Intern (internal title: Play Manager)',
    'Product Management Intern (R&D)',
  ])
  expect(within(roles[0]).getByText('Marsh')).toBeInTheDocument()

  // Two internships run at the same time, so the top two entries are both
  // Current — the badge is a state, not a ranking, and nothing about being
  // listed second makes 8x Social finished.
  expect(within(roles[0]).getByText('Current')).toBeInTheDocument()
  expect(within(roles[1]).getByText('Current')).toBeInTheDocument()
  expect(within(roles[2]).getByText('Completed')).toBeInTheDocument()
  expect(screen.queryByText('Incoming')).not.toBeInTheDocument()
})

test('states the weekly hours only on the role that is carried alongside another', () => {
  render(<ProfileSections />)

  const workExperience = screen.getByRole('list', { name: 'Work experience' })
  const roles = Array.from(workExperience.children) as HTMLElement[]

  // Only 8x Social runs beside a second role, so only 8x Social has hours to
  // qualify. A commitment line on a role that needs none would read as an
  // apology for it.
  expect(
    roles.map((role) => within(role).queryByText('20 hrs/week') !== null),
  ).toEqual([false, true, false])

  // Hours, never a contract type: no offer letter here says "part-time".
  expect(screen.queryByText(/part.?time/i)).not.toBeInTheDocument()
})

test('sets each employer mark beside its organization and keeps it decorative', () => {
  render(<ProfileSections />)

  const workExperience = screen.getByRole('list', { name: 'Work experience' })
  const roles = Array.from(workExperience.children) as HTMLElement[]
  const marks = roles.map((role) => role.querySelector('.experience-logo'))

  // Paired by position, so a logo can never drift onto the wrong employer.
  // Decoded first: the optimiser rewrites a raster source to /_next/image and
  // leaves a vector one alone, and both have to satisfy the same check.
  expect(
    marks.map((mark) => decodeURIComponent(mark?.querySelector('img')?.getAttribute('src') ?? '')),
  ).toEqual(
    profile.workExperience.map((role) => expect.stringContaining(role.logo.src)),
  )

  // The organization is written out in text right beside the tile, so alt text
  // would make a screen reader announce the employer twice.
  for (const mark of marks) {
    expect(mark).toHaveAttribute('aria-hidden', 'true')
    expect(mark?.querySelector('img')).toHaveAttribute('alt', '')
  }
})

test('lists every stack group and counts each tool against the real projects', () => {
  render(<ProfileSections />)

  const stack = screen.getByRole('region', { name: 'Tech stack' })
  for (const group of stackGroups) {
    const groupRegion = within(stack).getByRole('region', { name: group.name })
    expect(within(groupRegion).getByRole('list').children).toHaveLength(group.items.length)
  }

  // Next.js is the most-used tool on the site; the badge has to agree with the
  // content file rather than with a number someone typed in.
  const nextCount = projects.filter((project) => project.stack.includes('Next.js')).length
  expect(within(stack).getByLabelText(`used in ${nextCount} projects`)).toBeInTheDocument()
})

test('renders two research roles, every award, and SENTRE leadership', () => {
  render(<ProfileSections />)

  const researchRoles = screen.getByRole('list', { name: 'Research roles' })
  expect(researchRoles.children).toHaveLength(2)
  expect(within(researchRoles).getByText('Social AI Studio, SUTD')).toBeInTheDocument()
  expect(within(researchRoles).getByText('Climate Resilient Citizenry, SUTD')).toBeInTheDocument()

  const awards = screen.getByRole('list', { name: 'Awards and grants' })
  expect(awards.children).toHaveLength(8)
  ;[
    'Dell InnovateDash Hackathon 2026 — Top 5 Finalist',
    'Math Me Home FPGA Game — 2nd Place, Outstanding Project',
    'Meowtivation Task Manager — 3rd Place, Outstanding Project',
    'SUTD What The Hack Hackathon — 3rd Place',
    'Baby Shark Fund Award — Pufferty Fish Robot',
    'UROP Grant — Fames.com',
    'Baby Shark Fund Award — Fames.com',
    'Garena Competition — Shortlisted Team, FALSE POSITIVE',
  ].forEach((award) => {
    expect(within(awards).getByText(award)).toBeInTheDocument()
  })
  expect(
    screen.getByText('SENTRE — 5,000+ member Indonesian student community'),
  ).toBeInTheDocument()
})

test('offers the approved public contact destinations and nothing else', () => {
  render(<ProfileSections />)

  const contact = screen.getByRole('region', { name: 'Contact' })
  expect(
    within(contact).getAllByRole('link').map((link) => link.getAttribute('href')),
  ).toEqual([
    'mailto:adotriharis@gmail.com',
    'https://www.linkedin.com/in/ananda-trimar/',
    'https://github.com/AnandaTris',
  ])
})

test('uses plain section headings with no fieldbook or evidence framing', () => {
  render(<ProfileSections />)

  expect(
    screen.getAllByRole('heading', { level: 2 }).map((heading) => heading.textContent),
  ).toEqual([
    'Work experience',
    'Tech stack',
    'Research',
    'Awards and grants',
    'Leadership',
    'Contact',
  ])
  expect(
    screen.queryByText(/fieldbook|field note|evidence|operating principle/i),
  ).not.toBeInTheDocument()
})

test('keeps phone, academic, transcript, resume, and download details out of the public profile', () => {
  render(<ProfileSections />)

  expect(
    screen.queryByText(/9081 2008|3\.07|GPA|transcript|résumé|resume|download/i),
  ).not.toBeInTheDocument()
  expect(document.querySelector('a[href^="tel:"]')).toBeNull()
})
