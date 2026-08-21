import { calculateVisibilityScore } from './cited'

test('scores a first-ranked positive mention at 100', () => {
  expect(calculateVisibilityScore([{ assistantWeight: 1, rank: 1, sentiment: 'positive' }])).toBe(
    100,
  )
})

test('scores an absent mention at zero', () => {
  expect(calculateVisibilityScore([{ assistantWeight: 1, rank: null, sentiment: 'neutral' }])).toBe(
    0,
  )
})

test('applies the published position and neutral-sentiment weights', () => {
  expect(calculateVisibilityScore([{ assistantWeight: 1, rank: 2, sentiment: 'neutral' }])).toBeCloseTo(
    58.62,
    2,
  )
})
