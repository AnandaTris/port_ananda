import { renderToStaticMarkup } from 'react-dom/server'
import { fireEvent, render, screen, within } from '@testing-library/react'
import { beforeEach, vi } from 'vitest'
import { SiteFooter } from '@/components/shell/SiteFooter'
import { SiteHeader } from '@/components/shell/SiteHeader'
import { projects } from '@/content/projects'
import HomePage from './page'

const route = vi.hoisted(() => ({ pathname: '/' }))

vi.mock('next/navigation', () => ({
  usePathname: () => route.pathname,
}))

beforeEach(() => {
  window.history.replaceState(null, '', '/')
})

test('keeps one main landmark and one of each profile anchor alongside a route-neutral footer', () => {
  const { container } = render(
    <>
      <SiteHeader />
      <HomePage />
      <SiteFooter />
    </>,
  )

  expect(screen.getAllByRole('main')).toHaveLength(1)
  expect(document.querySelectorAll('#principles')).toHaveLength(1)
  expect(document.querySelectorAll('#experience')).toHaveLength(1)
  expect(document.querySelectorAll('#contact')).toHaveLength(1)

  const footer = container.querySelector('footer.site-footer')
  expect(footer).not.toBeNull()
  expect(footer).not.toHaveAttribute('id', 'contact')
  expect(footer).toHaveTextContent('Fieldbook closed. Bring an ambitious problem worth testing.')
})

test('renders featured work and the complete archive in initial static markup', () => {
  const html = renderToStaticMarkup(<HomePage />)

  expect(html).toContain('Five products, one accountable through-line.')
  expect(html).toContain('Fix Yo Yap')
  expect(html).toContain('Every project, with its evidence boundary.')
  expect(html.match(/class="archive-card"/g)).toHaveLength(17)
  expect(html).not.toContain('BAILOUT_TO_CLIENT_SIDE_RENDERING')
  projects.forEach((project) => {
    expect(html).toContain(`href="/work/${project.slug}"`)
  })
})

test('matches the approved homepage evidence order in real rendered output', () => {
  render(<HomePage />)

  const orderedIds = [
    'featured-fieldbook-title',
    'principles-heading',
    'professional-products-heading',
    'project-archive-title',
    'experience-heading',
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

test('synchronizes capability order across the featured and archive client islands', () => {
  render(<HomePage />)

  fireEvent.click(screen.getByRole('button', { name: 'Price, launch, and grow' }))

  const featured = screen.getByRole('region', {
    name: 'Five products, one accountable through-line.',
  })
  const archive = screen.getByRole('region', {
    name: 'Every project, with its evidence boundary.',
  })
  expect(within(featured).getAllByRole('heading', { level: 3 })[0]).toHaveTextContent('Cited')
  expect(within(archive).getAllByRole('heading', { level: 3 })[0]).toHaveTextContent('Cited')

  window.history.replaceState(null, '', '/?lens=proof&capability=prototype#work')
  fireEvent(window, new PopStateEvent('popstate'))

  expect(screen.getByRole('button', { name: 'Proof' })).toHaveAttribute('aria-pressed', 'true')
  expect(within(featured).getAllByRole('heading', { level: 3 })[0]).toHaveTextContent('CareKaki')
  expect(within(archive).getAllByRole('heading', { level: 3 })[0]).toHaveTextContent('CareKaki')
})
