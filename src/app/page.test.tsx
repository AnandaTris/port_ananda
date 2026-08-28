import { renderToStaticMarkup } from 'react-dom/server'
import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import { SiteFooter } from '@/components/shell/SiteFooter'
import { SiteHeader } from '@/components/shell/SiteHeader'
import { projects } from '@/content/projects'
import HomePage from './page'

const route = vi.hoisted(() => ({ pathname: '/' }))

vi.mock('next/navigation', () => ({
  usePathname: () => route.pathname,
}))

test('keeps one main landmark and one of each section anchor alongside a route-neutral footer', () => {
  const { container } = render(
    <>
      <SiteHeader />
      <HomePage />
      <SiteFooter />
    </>,
  )

  expect(screen.getAllByRole('main')).toHaveLength(1)
  for (const anchor of ['projects', 'experience', 'stack', 'research', 'awards', 'leadership', 'contact']) {
    expect(document.querySelectorAll(`#${anchor}`), anchor).toHaveLength(1)
  }

  const footer = container.querySelector('footer.site-footer')
  expect(footer).not.toBeNull()
  expect(footer).not.toHaveAttribute('id', 'contact')
  expect(footer).toHaveTextContent('Ananda Triharis Maroso — Singapore')
})

test('points every header link at a section that exists on the page', () => {
  render(
    <>
      <SiteHeader />
      <HomePage />
    </>,
  )

  const nav = screen.getByRole('navigation', { name: 'Primary navigation' })
  const targets = screen.getAllByRole('link').filter((link) => nav.contains(link))

  expect(targets.map((link) => link.textContent)).toEqual([
    'Projects',
    'Experience',
    'Stack',
    'Research',
    'Contact',
  ])
  for (const link of targets) {
    expect(document.querySelector(link.getAttribute('href')!)).not.toBeNull()
  }
})

test('renders every project in initial static markup with no client bailout', () => {
  const html = renderToStaticMarkup(<HomePage />)

  expect(html.match(/class="project-card"/g)).toHaveLength(18)
  expect(html).toContain('Fix Yo Yap')
  expect(html).not.toContain('BAILOUT_TO_CLIENT_SIDE_RENDERING')
  projects.forEach((project) => {
    expect(html).toContain(`href="/work/${project.slug}"`)
  })
})

test('orders the page name, projects, experience, stack, research, awards, leadership, contact', () => {
  render(<HomePage />)

  const orderedIds = [
    'hero-title',
    'projects-heading',
    'experience-heading',
    'stack-heading',
    'research-heading',
    'awards-heading',
    'leadership-heading',
    'contact-heading',
  ]
  const orderedHeadings = orderedIds.map((id) => {
    const heading = document.getElementById(id)
    expect(heading, `missing #${id}`).not.toBeNull()
    return heading!
  })

  orderedHeadings.slice(1).forEach((heading, index) => {
    expect(
      orderedHeadings[index].compareDocumentPosition(heading) & Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy()
  })
})

test('carries no fieldbook, lens, or evidence vocabulary anywhere on the page', () => {
  const html = renderToStaticMarkup(
    <>
      <HomePage />
      <SiteFooter />
    </>,
  )

  // The restructure removed the framing, not just the sections that used it.
  // A stray "field note" heading is the exact regression this guards against.
  expect(html).not.toMatch(/fieldbook|field note|field operator|evidence|lens/i)
})
