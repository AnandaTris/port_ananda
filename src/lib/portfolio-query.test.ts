import { buildPortfolioHref, parseCapability, parseLens } from './portfolio-query'

test('rejects unknown lens and capability values', () => {
  expect(parseLens('unknown')).toBe('story')
  expect(parseCapability('unknown')).toBe('all')
})

test('builds stable shareable query state', () => {
  expect(buildPortfolioHref({ lens: 'proof', capability: 'harden' })).toBe(
    '/?lens=proof&capability=harden#work',
  )
})

test('keeps the default lens and omits the all capability', () => {
  expect(buildPortfolioHref({ lens: 'story', capability: 'all' })).toBe('/?lens=story#work')
})
