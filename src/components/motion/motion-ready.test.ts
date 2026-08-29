import { MOTION_READY_SCRIPT } from './motion-ready'

function runScript() {
  // The script ships as a string inside a <script> tag, so the only honest way
  // to test it is to execute it the way the browser will.
  new Function(MOTION_READY_SCRIPT)()
}

function stubMatchMedia(reduced: boolean) {
  vi.stubGlobal(
    'matchMedia',
    vi.fn(() => ({ matches: reduced })),
  )
}

beforeEach(() => {
  document.documentElement.className = ''
  stubMatchMedia(false)
})

afterEach(() => {
  vi.unstubAllGlobals()
})

test('marks the document ready when motion is allowed', () => {
  runScript()

  expect(document.documentElement.classList.contains('motion-ready')).toBe(true)
})

test('marks nothing when the visitor asked for reduced motion', () => {
  stubMatchMedia(true)

  runScript()

  expect(document.documentElement.classList.contains('motion-ready')).toBe(false)
})

test('marks nothing when IntersectionObserver is missing', () => {
  // Without an observer nothing would ever reveal, so hiding anything would
  // leave the page permanently blank.
  vi.stubGlobal('IntersectionObserver', undefined)

  runScript()

  expect(document.documentElement.classList.contains('motion-ready')).toBe(false)
})

test('never throws, whatever the environment reports', () => {
  vi.stubGlobal('matchMedia', undefined)

  expect(runScript).not.toThrow()
  expect(document.documentElement.classList.contains('motion-ready')).toBe(false)
})
