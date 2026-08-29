'use client'

import { useState } from 'react'
import { yappers, yappersByName } from '@/content/yappers'
import { excerptDetails } from './excerpt-config'
import { matchPersona, type SampleMetrics } from './yap'
import { YapperMark } from './YapperMark'

/**
 * Presets are named for what was measured, never for the yapper they produce.
 * The rule has to be the thing that picks the persona, or the excerpt is a
 * lookup table wearing a rule's clothes.
 */
const personaPresets: readonly { label: string; metrics: SampleMetrics }[] = [
  {
    label: 'Fast, almost no gaps',
    metrics: {
      wordsPerMinute: 188,
      finishedSentences: 0.95,
      wordVariety: 0.71,
      pitchSwing: 2.1,
      longestPause: 0.9,
      stumbles: 0,
    },
  },
  {
    label: 'Slow, long silences',
    metrics: {
      wordsPerMinute: 112,
      finishedSentences: 0.92,
      wordVariety: 0.72,
      pitchSwing: 1.8,
      longestPause: 3.4,
      stumbles: 0,
    },
  },
  {
    label: 'Wide vocabulary, unfinished thoughts',
    metrics: {
      wordsPerMinute: 148,
      finishedSentences: 0.72,
      wordVariety: 0.82,
      pitchSwing: 2.3,
      longestPause: 1.4,
      stumbles: 0,
    },
  },
  {
    label: 'Restarted sentences',
    metrics: {
      wordsPerMinute: 141,
      finishedSentences: 0.64,
      wordVariety: 0.74,
      pitchSwing: 2.4,
      longestPause: 1.6,
      stumbles: 2,
    },
  },
  {
    label: 'Nothing stands out',
    metrics: {
      wordsPerMinute: 138,
      finishedSentences: 1,
      wordVariety: 0.75,
      pitchSwing: 3,
      longestPause: 1.5,
      stumbles: 0,
    },
  },
]

export function YapExcerpt() {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const selectedPreset = personaPresets[selectedIndex]
  const match = matchPersona(selectedPreset.metrics)
  const matched = yappersByName[match.persona]

  return (
    <section aria-labelledby="yap-excerpt-title" className="interactive-excerpt">
      <header className="interactive-excerpt-heading">
        <p className="eyebrow">Interactive excerpt</p>
        <h2 id="yap-excerpt-title">Fix Yo Yap persona card</h2>
        <p>
          Five ways of talking, each one good at something and paying for it. Switch between fixed
          metric presets to see which yapper the labelling rule names, and the measurements it names
          them on.
        </p>
      </header>

      <p className="excerpt-disclosure">
        These are fixed demonstration rules and not Fix Yo Yap’s production scoring service.
      </p>
      <p className="excerpt-disclosure">
        No microphone input, recording, or production scoring is used in this excerpt.
      </p>
      <a className="text-link excerpt-results-link" href={excerptDetails['fix-yo-yap'].resultsHref}>
        {excerptDetails['fix-yo-yap'].resultsLabel}
      </a>

      <div className="excerpt-form">
        <fieldset>
          <legend>Select a fixed metric preset</legend>
          <div className="excerpt-choice-list">
            {personaPresets.map((preset, index) => {
              const id = `yap-preset-${index}`
              return (
                <label htmlFor={id} key={preset.label}>
                  <input
                    checked={selectedIndex === index}
                    id={id}
                    name="yap-preset"
                    onChange={() => setSelectedIndex(index)}
                    type="radio"
                    value={preset.label}
                  />
                  <span>{preset.label}</span>
                </label>
              )
            })}
          </div>
        </fieldset>

        <div
          aria-live="polite"
          className="excerpt-result excerpt-persona"
          data-confident={match.confident}
          role="status"
        >
          <div className="yapper-verdict">
            <YapperMark width={104} yapper={matched} />
            <div>
              <p className="excerpt-result-label">
                {match.confident
                  ? 'This round is'
                  : 'Nothing crossed the line, so it landed closest to'}
              </p>
              <strong>{match.persona}</strong>
              <p className="yapper-tagline">{matched.tagline}</p>
              <p className="yapper-tell">{matched.tell}</p>
            </div>
          </div>
          <ul className="excerpt-receipts">
            {match.because.map((receipt) => (
              <li key={receipt}>{receipt}</li>
            ))}
          </ul>
          <dl>
            <div>
              <dt>Talking speed</dt>
              <dd>{selectedPreset.metrics.wordsPerMinute} wpm</dd>
            </div>
            <div>
              <dt>Finished sentences</dt>
              <dd>{Math.round(selectedPreset.metrics.finishedSentences * 100)}%</dd>
            </div>
            <div>
              <dt>Word variety</dt>
              <dd>{Math.round(selectedPreset.metrics.wordVariety * 100)}%</dd>
            </div>
            <div>
              <dt>Voice movement</dt>
              <dd>{selectedPreset.metrics.pitchSwing.toFixed(1)} semitones</dd>
            </div>
            <div>
              <dt>Dead air</dt>
              <dd>{selectedPreset.metrics.longestPause.toFixed(1)}s</dd>
            </div>
            <div>
              <dt>Stumbles</dt>
              <dd>{selectedPreset.metrics.stumbles}</dd>
            </div>
          </dl>
        </div>

        {/* The cast, always all five. It is deliberately not a control: a yapper
            is a reading of a score that already exists, and a row of five
            clickable faces would quietly turn the label into the thing being
            chosen. */}
        <div className="yapper-cast">
          <p className="excerpt-result-label">The cast</p>
          <ul>
            {yappers.map((yapper) => (
              <li
                aria-current={yapper.name === match.persona ? true : undefined}
                data-active={yapper.name === match.persona}
                key={yapper.id}
              >
                <YapperMark width={46} yapper={yapper} />
                <span>{yapper.name}</span>
              </li>
            ))}
          </ul>
          <p className="yapper-cast-note">
            The metrics pick the yapper. Nothing here is selectable, and no yapper can move a score.
          </p>
        </div>

        <button className="excerpt-reset" onClick={() => setSelectedIndex(0)} type="button">
          Reset
        </button>
      </div>
    </section>
  )
}
