import { act } from 'react'
import { render } from '@testing-library/react'
import { CountUp } from './CountUp'

let observerCallback: IntersectionObserverCallback | undefined
let capturedOnUpdate: ((latest: number) => void) | undefined

class MockIntersectionObserver {
  constructor(cb: IntersectionObserverCallback) {
    observerCallback = cb
  }
  observe() {}
  unobserve() {}
  disconnect() {}
}

// CountUp reads `animate` and `useReducedMotion` from motion/react. Reduced
// motion must resolve to false or the effect returns before scheduling
// anything, and animate must hand back a stop-able handle because the
// effect's cleanup at CountUp.tsx:45 calls `controls?.stop()` on unmount.
vi.mock('motion/react', () => ({
  useReducedMotion: () => false,
  animate: (_from: number, _to: number, options: { onUpdate?: (latest: number) => void }) => {
    capturedOnUpdate = options.onUpdate
    return { stop: vi.fn() }
  },
}))

function intersectingEntry() {
  return { isIntersecting: true } as IntersectionObserverEntry
}

beforeEach(() => {
  observerCallback = undefined
  capturedOnUpdate = undefined
  vi.stubGlobal('IntersectionObserver', MockIntersectionObserver)
})

afterEach(() => {
  vi.unstubAllGlobals()
})

test('tracks the animation and clamps the curve overshoot to the real total', () => {
  const { container } = render(<CountUp target={13} />)

  act(() => {
    observerCallback?.([intersectingEntry()], {} as IntersectionObserver)
  })

  // The component seeds its state with the target, so it already reads 13 with
  // the animation deleted entirely. Driving a mid-flight value through first is
  // what proves the display follows onUpdate rather than sitting on the seed.
  act(() => {
    capturedOnUpdate?.(7.4)
  })

  expect(container.textContent).toBe('7')

  // 15.7 is well past what the real spring's overshoot reaches — the point is
  // that no matter how far onUpdate overshoots, the rendered count is capped
  // at the target rather than briefly showing a project that doesn't exist.
  act(() => {
    capturedOnUpdate?.(15.7)
  })

  expect(container.textContent).toBe('13')
})
