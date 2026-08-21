import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const stylesheet = readFileSync(resolve(process.cwd(), 'src/app/globals.css'), 'utf8')

test('keeps Light and Volt focus outlines visible within the dark contact panel', () => {
  expect(stylesheet).toMatch(
    /\.profile-contact \.collaboration-actions \.button:focus-visible\s*\{\s*outline-color: var\(--white\);\s*outline-offset: 4px;\s*\}/,
  )
  expect(stylesheet).toMatch(
    /\.profile-contact \.collaboration-links a:focus-visible\s*\{\s*outline-color: var\(--volt\);\s*outline-offset: 4px;\s*\}/,
  )
})
