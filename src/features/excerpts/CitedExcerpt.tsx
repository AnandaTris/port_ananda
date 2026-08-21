'use client'

import { useState } from 'react'
import {
  calculateVisibilityScore,
  type CitationSentiment,
} from './cited'
import { excerptDetails } from './excerpt-config'

type RankValue = '1' | '2' | '3' | 'absent'

const initialRank: RankValue = '1'
const initialSentiment: CitationSentiment = 'positive'

function parseRank(value: RankValue): number | null {
  return value === 'absent' ? null : Number(value)
}

export function CitedExcerpt() {
  const [rank, setRank] = useState<RankValue>(initialRank)
  const [sentiment, setSentiment] = useState<CitationSentiment>(initialSentiment)
  const score = calculateVisibilityScore([
    { assistantWeight: 1, rank: parseRank(rank), sentiment },
  ])

  return (
    <section aria-labelledby="cited-excerpt-title" className="interactive-excerpt">
      <header className="interactive-excerpt-heading">
        <p className="eyebrow">Interactive excerpt</p>
        <h2 id="cited-excerpt-title">Cited visibility score</h2>
        <p>Adjust one modelled mention to inspect the published deterministic score formula.</p>
      </header>

      <p className="excerpt-disclosure">
        This uses modelled data for one assistant mention. It is a simplified calculator, not a
        verified live Claude scan.
      </p>
      <a className="text-link excerpt-evidence-link" href={excerptDetails.cited.evidenceHref}>
        {excerptDetails.cited.evidenceLabel}
      </a>

      <div className="excerpt-form excerpt-form-compact">
        <div className="excerpt-control-grid">
          <div>
            <label htmlFor="cited-rank">Rank</label>
            <select
              id="cited-rank"
              onChange={(event) => setRank(event.target.value as RankValue)}
              value={rank}
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="absent">Absent</option>
            </select>
          </div>
          <div>
            <label htmlFor="cited-sentiment">Sentiment</label>
            <select
              id="cited-sentiment"
              onChange={(event) => setSentiment(event.target.value as CitationSentiment)}
              value={sentiment}
            >
              <option value="positive">Positive</option>
              <option value="neutral">Neutral</option>
              <option value="negative">Negative</option>
            </select>
          </div>
        </div>

        <div aria-live="polite" className="excerpt-result excerpt-score" role="status">
          <p className="excerpt-result-label">Modelled visibility score</p>
          <strong>{score.toFixed(2)}</strong>
          <p>Position weight × sentiment multiplier × assistant weight</p>
        </div>
        <button
          className="excerpt-reset"
          onClick={() => {
            setRank(initialRank)
            setSentiment(initialSentiment)
          }}
          type="button"
        >
          Reset
        </button>
      </div>
    </section>
  )
}
