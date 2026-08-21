export const dialExamples = [
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
] as const

export const dialDisclaimer = 'Screening aid only — this excerpt does not diagnose dyslexia.'
