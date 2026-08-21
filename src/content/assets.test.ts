import { existsSync } from 'node:fs'
import { join } from 'node:path'
import { assetProvenance } from './assets'

test('tracks every imported public asset', () => {
  expect(assetProvenance.length).toBe(13)
  for (const asset of assetProvenance) {
    expect(existsSync(join(process.cwd(), 'public', asset.publicPath))).toBe(true)
    expect(asset.sourcePath.startsWith('/Users/anandatriharismaroso/dev/')).toBe(true)
  }
})
