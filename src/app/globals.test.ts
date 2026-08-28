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
