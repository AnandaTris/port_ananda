import { isValidElement, type ReactElement, type ReactNode } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { render, screen } from '@testing-library/react'
import { MOTION_READY_SCRIPT } from '@/components/motion/motion-ready'
import { RevealRoot } from '@/components/motion/RevealRoot'
import RootLayout, { metadata } from './layout'

test('publishes the portfolio identity', () => {
  render(<RootLayout><main>Portfolio body</main></RootLayout>)
  expect(screen.getByText('Portfolio body')).toBeInTheDocument()
  expect(metadata.title).toEqual({
    default: 'Ananda Triharis Maroso — Portfolio',
    template: '%s — Ananda Triharis Maroso',
  })
})

// Walks a plain React element tree — not a rendered DOM — looking for a node
// matching `predicate`. `RootLayout` is a server component with nothing to
// query once mounted (`RevealRoot` renders null), so the only way to prove it
// is actually present, rather than merely imported, is to call the layout as
// a plain function and inspect the tree it returns before anything renders.
// Same plain-function pattern `src/content/status.test.ts` uses for server
// components.
function containsElement(node: ReactNode, predicate: (element: ReactElement) => boolean): boolean {
  if (!isValidElement(node)) return false
  if (predicate(node)) return true

  const children = (node.props as { children?: ReactNode }).children
  if (Array.isArray(children)) return children.some((child) => containsElement(child, predicate))
  return containsElement(children, predicate)
}

test('mounts the motion-ready head script and the reveal observer', () => {
  const tree = RootLayout({ children: <main>Portfolio body</main> })

  // Asserted against the constant, not retyped, so this cannot drift from
  // the actual script source.
  expect(renderToStaticMarkup(tree)).toContain(MOTION_READY_SCRIPT.slice(0, 40))
  expect(containsElement(tree, (element) => element.type === RevealRoot)).toBe(true)
})
