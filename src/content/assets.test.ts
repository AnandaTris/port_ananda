import { existsSync } from 'node:fs'
import { join } from 'node:path'
import { assetProvenance } from './assets'
import { profile } from './profile'
import { projects } from './projects'

test('tracks every imported public asset', () => {
  expect(assetProvenance.length).toBe(26)
  for (const asset of assetProvenance) {
    expect(existsSync(join(process.cwd(), 'public', asset.publicPath))).toBe(true)
    expect(
      asset.sourcePath.startsWith('/Users/anandatriharismaroso/') ||
        asset.sourcePath.startsWith('https://'),
    ).toBe(true)
  }
})

// A project logo claims to be that product's real mark, so it may never be an
// invented file: every icon on the site has to trace back to a source repo.
test('traces every project logo back to a real source', () => {
  const tracked = new Set(assetProvenance.map((asset) => `/${asset.publicPath}`))
  const icons = projects.flatMap((project) =>
    project.logo.kind === 'icon' ? [project.logo.src] : [],
  )

  expect(icons.length).toBeGreaterThan(0)
  for (const src of icons) {
    expect(tracked).toContain(src)
  }
})

// The same rule, harder: an employer mark is someone else's trademark, so it
// has to be their own file served from their own domain. A redrawn shape or a
// logo-CDN scrape would pass `existsSync` and still be the wrong mark.
test('traces every employer logo back to that company on its own domain', () => {
  const byPath = new Map(assetProvenance.map((asset) => [`/${asset.publicPath}`, asset]))

  expect(profile.workExperience.length).toBeGreaterThan(0)
  for (const role of profile.workExperience) {
    const asset = byPath.get(role.logo.src)

    expect(asset, `${role.organization} logo is untracked`).toBeDefined()
    expect(asset?.sourcePath).toMatch(/^https:\/\//)
  }
})
