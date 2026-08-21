import { render, screen, within } from '@testing-library/react'
import { profile } from '@/content/profile'
import { ProfileSections } from './ProfileSections'

test('renders every approved operating principle from the profile', () => {
  render(<ProfileSections />)

  const principles = screen.getByRole('region', { name: /operating principles/i })
  expect(within(principles).getAllByRole('listitem')).toHaveLength(profile.principles.length)

  profile.principles.forEach((principle) => {
    expect(within(principles).getByText(principle)).toBeInTheDocument()
  })
})

test('states incoming work honestly and keeps private details out', () => {
  render(<ProfileSections />)

  const experience = screen.getByRole('region', { name: /experience, research, awards, and leadership/i })
  expect(within(experience).getByText(/AI Research & Development Intern/i)).toBeInTheDocument()
  expect(within(experience).getByText('Incoming')).toBeInTheDocument()
  expect(within(experience).getAllByRole('list', { name: /research roles/i })).toHaveLength(1)
  expect(within(experience).getByText(/Social AI Studio, SUTD/i)).toBeInTheDocument()
  expect(within(experience).getByText(/Climate Resilient Citizenry, SUTD/i)).toBeInTheDocument()
  expect(within(experience).getByText(profile.leadership[0].organization)).toBeInTheDocument()
  expect(screen.queryByText(/9081 2008|3\.07|GPA/i)).not.toBeInTheDocument()
})

test('lists collaboration contributions and only approved public contact paths', () => {
  render(<ProfileSections />)

  const contact = screen.getByRole('region', { name: /build something useful together/i })
  ;[
    'Product definition',
    'AI system design',
    'Production engineering',
    'Monetization',
    'Experimentation',
    'Cross-functional delivery',
  ].forEach((contribution) => {
    expect(within(contact).getByText(contribution)).toBeInTheDocument()
  })

  expect(screen.getByRole('link', { name: /Email Ananda/i })).toHaveAttribute(
    'href',
    expect.stringMatching(/^mailto:/),
  )
  expect(screen.getByRole('link', { name: /LinkedIn/i })).toHaveAttribute(
    'href',
    'https://www.linkedin.com/in/ananda-trimar/',
  )
  expect(screen.getByRole('link', { name: /GitHub/i })).toHaveAttribute(
    'href',
    'https://github.com/AnandaTris',
  )
  expect(within(contact).getAllByRole('link')).toHaveLength(3)
})
