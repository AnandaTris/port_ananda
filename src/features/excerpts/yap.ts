/**
 * A reproduction of Fix Yo Yap's speaking-style label layer.
 *
 * The five personas and the onsets below are the ones the shipped app reads off
 * an already-scored round. The boundary the real system keeps is kept here too:
 * a persona is a reading of a score that already exists, and nothing in this
 * file can move a score.
 */

export type SampleMetrics = {
  wordsPerMinute: number
  finishedSentences: number
  wordVariety: number
  pitchSwing: number
  longestPause: number
  stumbles: number
}

export type Persona =
  | 'The Leaper'
  | 'The Trailer-Off'
  | 'The Restarter'
  | 'The Fast Talker'
  | 'The Hammer'

/** Below this a round is the closest of the five, not a claim that it is that one. */
export const MATCH_FLOOR = 0.28

type Signal = {
  read: (metrics: SampleMetrics) => number
  onset: number
  full: number
  because: (metrics: SampleMetrics) => string
}

type PersonaSignals = {
  persona: Persona
  /** What the style is. Below its onset the style does not fire at all. */
  primary: Signal & { typical: number }
  /** What corroborates it. Only moves strength once the primary has fired. */
  support: Signal
}

const whole = (value: number) => Math.round(value)
const percent = (value: number) => `${Math.round(value * 100)}%`

const personaSignals: readonly PersonaSignals[] = [
  {
    persona: 'The Fast Talker',
    primary: {
      read: (metrics) => metrics.wordsPerMinute,
      onset: 165,
      full: 200,
      typical: 145,
      because: (metrics) => `${whole(metrics.wordsPerMinute)} words a minute`,
    },
    support: {
      read: (metrics) => -metrics.longestPause,
      onset: -1.4,
      full: 0,
      because: (metrics) => `nothing longer than a ${metrics.longestPause.toFixed(1)}s gap`,
    },
  },
  {
    persona: 'The Trailer-Off',
    primary: {
      read: (metrics) => -metrics.wordsPerMinute,
      onset: -130,
      full: -100,
      typical: -145,
      because: (metrics) => `${whole(metrics.wordsPerMinute)} words a minute`,
    },
    support: {
      read: (metrics) => metrics.longestPause,
      onset: 2,
      full: 7,
      because: (metrics) => `${metrics.longestPause.toFixed(1)}s of silence at the longest`,
    },
  },
  {
    persona: 'The Leaper',
    primary: {
      read: (metrics) => metrics.wordVariety,
      onset: 0.78,
      full: 0.86,
      typical: 0.734,
      because: (metrics) => `${percent(metrics.wordVariety)} of the words were different ones`,
    },
    support: {
      read: (metrics) => -metrics.finishedSentences,
      onset: -0.9,
      full: -0.62,
      because: (metrics) => `${percent(metrics.finishedSentences)} of sentences finished`,
    },
  },
  {
    persona: 'The Restarter',
    primary: {
      read: (metrics) => -metrics.finishedSentences,
      onset: -0.9,
      full: -0.5,
      typical: -1,
      because: (metrics) => `${percent(metrics.finishedSentences)} of sentences finished`,
    },
    support: {
      read: (metrics) => metrics.stumbles,
      onset: 0.5,
      full: 3,
      because: (metrics) =>
        metrics.stumbles === 1 ? '1 stumble' : `${whole(metrics.stumbles)} stumbles`,
    },
  },
  {
    persona: 'The Hammer',
    primary: {
      read: (metrics) => metrics.pitchSwing,
      onset: 2.9,
      full: 3.8,
      typical: 2.62,
      because: (metrics) => `${metrics.pitchSwing.toFixed(1)} semitones of pitch swing`,
    },
    support: {
      read: (metrics) => -metrics.wordsPerMinute,
      onset: -132,
      full: -105,
      because: (metrics) => `${whole(metrics.wordsPerMinute)} words a minute`,
    },
  },
]

function ramp(value: number, onset: number, full: number): number {
  return Math.max(0, Math.min(1, (value - onset) / (full - onset)))
}

export type PersonaMatch = {
  persona: Persona
  /** 0–1. How strongly the round reads as that style. */
  strength: number
  /** True when the round is that style rather than merely the nearest of the five. */
  confident: boolean
  /** The measured facts behind the call, in the round's own numbers. */
  because: readonly string[]
}

export function matchPersona(metrics: SampleMetrics): PersonaMatch {
  const readings = personaSignals.map(({ persona, primary, support }) => {
    const lead = primary.read(metrics)
    const leadStrength = ramp(lead, primary.onset, primary.full)
    const backing = ramp(support.read(metrics), support.onset, support.full)
    const because = [primary.because(metrics)]

    if (backing > 0) because.push(support.because(metrics))

    // Below its onset the style did not fire, and averaging in a support that
    // did would manufacture a strength out of the wrong axis.
    const strength = leadStrength <= 0 ? 0 : (leadStrength + backing) / 2

    return {
      persona,
      strength,
      confident: strength >= MATCH_FLOOR,
      because,
      // Once nothing fires, rank on how far the primary sits from its onset,
      // scaled by that onset's own distance from a median round. Without the
      // scaling the ranking measures which metric has the tightest ceiling
      // rather than which style the round resembles.
      rank:
        strength > 0
          ? strength
          : (lead - primary.onset) / Math.abs(primary.onset - primary.typical),
    }
  })

  const [best] = [...readings].sort((a, b) => b.rank - a.rank)

  return {
    persona: best.persona,
    strength: best.strength,
    confident: best.confident,
    because: best.because,
  }
}
