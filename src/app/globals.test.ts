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

test('bounds the desktop hero with viewport-aware spacing and type', () => {
  expect(stylesheet).toMatch(
    /@media \(min-width: 64\.0625rem\)[\s\S]*?\.hero\s*\{\s*padding: clamp\(1\.75rem, 4vh, 4\.5rem\) 0 clamp\(1\.75rem, 4vh, 4rem\);\s*\}/,
  )
  expect(stylesheet).toMatch(
    /@media \(min-width: 64\.0625rem\)[\s\S]*?\.hero h1\s*\{\s*font-size: clamp\(4rem, 5vw, 5\.25rem\);\s*\}/,
  )
})
