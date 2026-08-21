import { assignPersona } from './yap'

test('assigns the closer to its fixed high-energy sample', () => {
  expect(assignPersona({ pace: 152, fillers: 1, pauses: 2, energy: 0.82 })).toBe('The Closer')
})

test('assigns the restarter to its fixed low-confidence sample', () => {
  expect(assignPersona({ pace: 98, fillers: 8, pauses: 9, energy: 0.38 })).toBe(
    'The Restarter',
  )
})

test('assigns the builder to the balanced sample', () => {
  expect(assignPersona({ pace: 126, fillers: 3, pauses: 4, energy: 0.58 })).toBe('The Builder')
})
