import { existsSync } from 'node:fs'
import { join } from 'node:path'
import { assetProvenance } from './assets'
import { projects } from './projects'

test('tracks every imported public asset', () => {
  expect(assetProvenance.length).toBe(23)
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
