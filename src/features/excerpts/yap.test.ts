import { matchPersona, MATCH_FLOOR, type SampleMetrics } from './yap'

const baseline: SampleMetrics = {
  wordsPerMinute: 145,
  finishedSentences: 1,
  wordVariety: 0.734,
  pitchSwing: 2.62,
  longestPause: 1.65,
  stumbles: 0,
}

const sample = (overrides: Partial<SampleMetrics>): SampleMetrics => ({
  ...baseline,
  ...overrides,
})

test('names the fast talker on speed and backs it with the absent gaps', () => {
  const match = matchPersona(
    sample({ wordsPerMinute: 188, finishedSentences: 0.95, wordVariety: 0.71, pitchSwing: 2.1, longestPause: 0.9 }),
  )

  expect(match.persona).toBe('The Fast Talker')
  expect(match.confident).toBe(true)
  expect(match.because).toEqual(['188 words a minute', 'nothing longer than a 0.9s gap'])
})

test('names the trailer-off on the same speed axis read the other way', () => {
  const match = matchPersona(
    sample({ wordsPerMinute: 112, finishedSentences: 0.92, wordVariety: 0.72, pitchSwing: 1.8, longestPause: 3.4 }),
  )

  expect(match.persona).toBe('The Trailer-Off')
  expect(match.confident).toBe(true)
  expect(match.because).toEqual(['112 words a minute', '3.4s of silence at the longest'])
})

test('gives the leaper the round where wide vocabulary outranks the unfinished sentences', () => {
  const match = matchPersona(
    sample({ wordsPerMinute: 148, finishedSentences: 0.72, wordVariety: 0.82, pitchSwing: 2.3, longestPause: 1.4 }),
  )

  expect(match.persona).toBe('The Leaper')
  expect(match.confident).toBe(true)
  expect(match.because).toEqual([
    '82% of the words were different ones',
    '72% of sentences finished',
  ])
})

test('names the restarter when the stumbles corroborate the unfinished sentences', () => {
  const match = matchPersona(
    sample({
      wordsPerMinute: 141,
      finishedSentences: 0.64,
      wordVariety: 0.74,
      pitchSwing: 2.4,
      longestPause: 1.6,
      stumbles: 2,
    }),
  )

  expect(match.persona).toBe('The Restarter')
  expect(match.confident).toBe(true)
  expect(match.because).toEqual(['64% of sentences finished', '2 stumbles'])
})

test('reports the nearest style instead of claiming one when nothing clears the floor', () => {
  const match = matchPersona(
    sample({ wordsPerMinute: 138, finishedSentences: 1, wordVariety: 0.75, pitchSwing: 3, longestPause: 1.5 }),
  )

  expect(match.persona).toBe('The Hammer')
  expect(match.strength).toBeLessThan(MATCH_FLOOR)
  expect(match.confident).toBe(false)
  expect(match.because).toEqual(['3.0 semitones of pitch swing'])
})

test('a support signal alone cannot carry a style whose primary never fired', () => {
  // Ten stumbles pin the restarter's support at full, but every sentence
  // finished, so the axis that defines the style is silent.
  const match = matchPersona(sample({ stumbles: 10 }))

  expect(match.persona).not.toBe('The Restarter')
  expect(match.strength).toBe(0)
  expect(match.confident).toBe(false)
})

test('reads a single stumble in the singular', () => {
  const match = matchPersona(sample({ finishedSentences: 0.6, stumbles: 1 }))

  expect(match.persona).toBe('The Restarter')
  expect(match.because).toContain('1 stumble')
})
