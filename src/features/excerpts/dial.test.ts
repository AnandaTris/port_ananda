import { dialDisclaimer, dialExamples } from './dial'

test('provides three transparent fixed spelling-pattern examples', () => {
  expect(dialExamples).toEqual([
    {
      input: 'enuf',
      candidate: 'enough',
      category: 'orthographic',
      explanation: 'The pronunciation is preserved while the letter pattern changes.',
    },
    {
      input: 'sret',
      candidate: 'street',
      category: 'phonological',
      explanation: 'A sound unit is missing from the attempted spelling.',
    },
    {
      input: 'alot',
      candidate: 'a lot',
      category: 'word-boundary',
      explanation: 'Two words have been joined into one token.',
    },
  ])
})

test('publishes the exact screening-only disclaimer', () => {
  expect(dialDisclaimer).toBe(
    'Screening aid only — this excerpt does not diagnose dyslexia.',
  )
})
