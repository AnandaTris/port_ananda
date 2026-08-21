import { render, screen, within } from '@testing-library/react'
import { ProfileSections } from './ProfileSections'

const approvedPrinciples = [
  'LLMs for understanding, rules for action',
  'Evidence before claims',
  'Fail visibly instead of faking success',
  'Product economics are part of engineering',
  'Every irreversible action deserves a human gate',
]

const collaborationContributions = [
  'Product definition',
  'AI system design',
  'Production engineering',
  'Monetization',
  'Experimentation',
  'Cross-functional delivery',
]

test('renders the exact five approved operating principles', () => {
  render(<ProfileSections />)

  const principles = screen.getByRole('region', { name: /operating principles/i })
  const principleList = within(principles).getByRole('list')

  expect(principleList.children).toHaveLength(5)
  approvedPrinciples.forEach((principle) => {
    expect(within(principles).getByText(principle)).toBeInTheDocument()
  })
})

test('groups Marsh with Incoming and preserves the professional reverse chronology', () => {
  render(<ProfileSections />)

  const professionalExperience = screen.getByRole('list', { name: 'Professional experience' })
  const roles = Array.from(professionalExperience.children) as HTMLElement[]

  expect(roles).toHaveLength(3)
  expect(
    roles.map((role) => within(role).getByRole('heading', { level: 4 }).textContent),
  ).toEqual([
    'AI Research & Development Intern',
    'Technical Growth Product Manager Intern (internal title: Play Manager)',
    'Product Management Intern (R&D)',
  ])
  expect(within(roles[0]).getByText('Marsh')).toBeInTheDocument()
  expect(within(roles[0]).getByText('Incoming')).toBeInTheDocument()
})

test('renders two research roles, selected awards, and SENTRE leadership', () => {
  render(<ProfileSections />)

  const researchRoles = screen.getByRole('list', { name: 'Research roles' })
  expect(researchRoles.children).toHaveLength(2)
  expect(within(researchRoles).getByText('Social AI Studio, SUTD')).toBeInTheDocument()
  expect(within(researchRoles).getByText('Climate Resilient Citizenry, SUTD')).toBeInTheDocument()

  const awards = screen.getByRole('list', { name: 'Selected awards' })
  expect(awards.children).toHaveLength(5)
  ;[
    'Dell InnovateDash Hackathon 2026 — Top 5 Finalist',
    'SUTD What The Hack Hackathon — 3rd Place',
    'Math Me Home FPGA Game — 2nd Place, Outstanding Project',
    'UROP Grant — Fames.com',
    'Baby Shark Fund Award — Fames.com',
  ].forEach((award) => {
    expect(within(awards).getByText(award)).toBeInTheDocument()
  })
  expect(
    screen.getByText('SENTRE — 5,000+ member Indonesian student community'),
  ).toBeInTheDocument()
})

test('offers the exact collaboration brief and approved public contact destinations', () => {
  render(<ProfileSections />)

  const contact = screen.getByRole('region', { name: /build something useful together/i })
  const contributions = within(contact).getByRole('list', {
    name: 'Collaboration contributions',
  })

  expect(
    Array.from(contributions.children).map((contribution) => contribution.textContent),
  ).toEqual(collaborationContributions)
  expect(
    within(contact).getAllByRole('link').map((link) => link.getAttribute('href')),
  ).toEqual([
    'mailto:adotriharis@gmail.com',
    'https://www.linkedin.com/in/ananda-trimar/',
    'https://github.com/AnandaTris',
  ])
})

test('keeps phone, academic, transcript, resume, and download details out of the public profile', () => {
  render(<ProfileSections />)

  expect(
    screen.queryByText(/9081 2008|3\.07|GPA|transcript|résumé|resume|download/i),
  ).not.toBeInTheDocument()
  expect(document.querySelector('a[href^="tel:"]')).toBeNull()
})
