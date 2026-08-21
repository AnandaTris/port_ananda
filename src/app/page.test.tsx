import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import { SiteFooter } from '@/components/shell/SiteFooter'
import { SiteHeader } from '@/components/shell/SiteHeader'
import HomePage from './page'

const route = vi.hoisted(() => ({ pathname: '/', searchParams: new URLSearchParams() }))

vi.mock('next/navigation', () => ({
  usePathname: () => route.pathname,
  useRouter: () => ({ replace: vi.fn() }),
  useSearchParams: () => route.searchParams,
}))

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
