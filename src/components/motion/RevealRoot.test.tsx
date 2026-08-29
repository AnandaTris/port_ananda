import { render } from '@testing-library/react'
import { RevealRoot } from './RevealRoot'

let callback: IntersectionObserverCallback | undefined
let observed: Element[] = []
let unobserved: Element[] = []
let observerCount = 0

class MockIntersectionObserver {
  constructor(cb: IntersectionObserverCallback) {
    callback = cb
    observerCount += 1
  }
  observe(element: Element) {
    observed.push(element)
  }
  unobserve(element: Element) {
    unobserved.push(element)
  }
  disconnect() {}
}

/** An entry whose rect places it at a known point, so document order is testable. */
function entryAt(target: Element, top: number, left = 0) {
  return {
    target,
    isIntersecting: true,
    boundingClientRect: { top, left } as DOMRectReadOnly,
  } as IntersectionObserverEntry
}

function addTargets(count: number) {
  const targets: HTMLElement[] = []
  for (let index = 0; index < count; index += 1) {
    const element = document.createElement('div')
    element.setAttribute('data-reveal', '')
    document.body.append(element)
    targets.push(element)
  }
  return targets
}

beforeEach(() => {
  callback = undefined
  observed = []
  unobserved = []
  observerCount = 0
  document.body.innerHTML = ''
  document.documentElement.className = 'motion-ready'
  vi.stubGlobal('IntersectionObserver', MockIntersectionObserver)
})

afterEach(() => {
  vi.unstubAllGlobals()
})

test('observes every reveal target with a single observer', () => {
  const targets = addTargets(3)

  render(<RevealRoot />)

  expect(observerCount).toBe(1)
  expect(observed).toEqual(targets)
})

test('reveals an element when it arrives and stops watching it', () => {
  const [target] = addTargets(1)
  render(<RevealRoot />)

  callback?.([entryAt(target, 100)], {} as IntersectionObserver)

  expect(target.classList.contains('is-revealed')).toBe(true)
  expect(unobserved).toEqual([target])
})

test('staggers a batch in document order, not observer order', () => {
  const [first, second, third] = addTargets(3)
  render(<RevealRoot />)

  // Deliberately out of order: the observer makes no ordering promise.
  callback?.(
    [entryAt(third, 300), entryAt(first, 100), entryAt(second, 200)],
    {} as IntersectionObserver,
  )

  expect(first.style.getPropertyValue('--reveal-index')).toBe('0')
  expect(second.style.getPropertyValue('--reveal-index')).toBe('1')
  expect(third.style.getPropertyValue('--reveal-index')).toBe('2')
})

test('ties rows by horizontal position so a grid cascades left to right', () => {
  const [left, right] = addTargets(2)
  render(<RevealRoot />)

  callback?.([entryAt(right, 100, 400), entryAt(left, 100, 0)], {} as IntersectionObserver)

  expect(left.style.getPropertyValue('--reveal-index')).toBe('0')
  expect(right.style.getPropertyValue('--reveal-index')).toBe('1')
})

test('gives an element arriving alone no delay', () => {
  const [first, second] = addTargets(2)
  render(<RevealRoot />)

  callback?.([entryAt(first, 100)], {} as IntersectionObserver)
  callback?.([entryAt(second, 900)], {} as IntersectionObserver)

  expect(second.style.getPropertyValue('--reveal-index')).toBe('0')
})

test('caps the stagger so a large batch has no long invisible tail', () => {
  // Thirteen project cards at 110ms each would leave the last one blank for
  // 1.3 seconds after it had already scrolled into view.
  const targets = addTargets(8)
  render(<RevealRoot />)

  callback?.(
    targets.map((target, index) => entryAt(target, index * 100)),
    {} as IntersectionObserver,
  )

  expect(targets[4].style.getPropertyValue('--reveal-index')).toBe('4')
  expect(targets[7].style.getPropertyValue('--reveal-index')).toBe('4')
})

test('ignores entries that are leaving the viewport', () => {
  const [target] = addTargets(1)
  render(<RevealRoot />)

  callback?.(
    [{ ...entryAt(target, 100), isIntersecting: false } as IntersectionObserverEntry],
    {} as IntersectionObserver,
  )

  expect(target.classList.contains('is-revealed')).toBe(false)
  expect(unobserved).toEqual([])
})

test('does nothing at all when the document was never marked motion-ready', () => {
  // Reduced motion, a missing observer, or a page where the head script never
  // ran all land here, and all of them must leave the content visible.
  document.documentElement.className = ''
  const [target] = addTargets(1)

  render(<RevealRoot />)

  expect(observerCount).toBe(0)
  expect(target.classList.contains('is-revealed')).toBe(false)
})
