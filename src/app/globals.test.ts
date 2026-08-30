import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const stylesheet = readFileSync(resolve(process.cwd(), 'src/app/globals.css'), 'utf8')

test('keeps the focus outline visible against the dark contact panel', () => {
  // The panel inverts to --ink, so the default --ink outline would vanish on it.
  // Every link in the section — address and profiles alike — takes the Volt ring.
  expect(stylesheet).toMatch(
    /\.profile-contact a:focus-visible\s*\{\s*outline-color: var\(--volt\);\s*outline-offset: 4px;\s*\}/,
  )
})

test('bounds the desktop hero in viewport height so the projects start above the fold', () => {
  // vh, not vw: on a short laptop screen a width-derived clamp pushes the first
  // project card off the bottom, which is the one thing the hero must not do.
  expect(stylesheet).toMatch(
    /@media \(min-width: 64\.0625rem\)\s*\{\s*\.hero\s*\{\s*padding: clamp\([\d.]+rem, [\d.]+vh, [\d.]+rem\) 0 clamp\([\d.]+rem, [\d.]+vh, [\d.]+rem\);\s*\}/,
  )
})

test('hides reveal targets only after JavaScript has proven it can reveal them', () => {
  // Every rule that hides a reveal element — [data-reveal] or the above-the-fold
  // [data-reveal-load] — must be scoped to .motion-ready. Unscoped, a JS failure
  // is indistinguishable from a blank portfolio: the content is served, painted,
  // and then never revealed. The negative lookahead keeps `opacity: 0.94` and
  // its kind from reading as a hiding rule; `\b` matched those too.
  const hidingRules = stylesheet
    .split('}')
    .filter((rule) => rule.includes('[data-reveal') && /opacity:\s*0(?![.\d])/.test(rule))

  expect(hidingRules.length).toBeGreaterThan(0)
  for (const rule of hidingRules) {
    expect(rule).toContain('.motion-ready')
  }
})

test('plays the above-the-fold entrance from CSS with the same curve and duration', () => {
  // The hero cannot wait for the observer: an element held at opacity 0 until
  // hydration is not an LCP candidate. It still has to look identical, so the
  // rule carries the approved curve and the same 720ms as every other reveal.
  const [rule] = stylesheet.split('}').filter((chunk) => chunk.includes('[data-reveal-load]'))

  expect(rule).toContain('.motion-ready [data-reveal-load]')
  expect(rule).toContain('animation: reveal-rise 720ms cubic-bezier(0.34, 1.56, 0.64, 1) backwards')
  expect(rule).toContain('animation-delay: calc(var(--reveal-index, 0) * 110ms)')
})

test('reveals with the approved spring curve rather than a default ease', () => {
  expect(stylesheet).toContain('cubic-bezier(0.34, 1.56, 0.64, 1)')
})
