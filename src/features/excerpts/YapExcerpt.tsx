'use client'

import { useState } from 'react'
import { excerptDetails } from './excerpt-config'
import { assignPersona, type SampleMetrics } from './yap'

const personaPresets: readonly { label: string; metrics: SampleMetrics }[] = [
  {
    label: 'Closer sample',
    metrics: { pace: 152, fillers: 1, pauses: 2, energy: 0.82 },
  },
  {
    label: 'Restarter sample',
    metrics: { pace: 98, fillers: 8, pauses: 9, energy: 0.38 },
  },
  {
    label: 'Builder sample',
    metrics: { pace: 126, fillers: 3, pauses: 4, energy: 0.58 },
  },
]

export function YapExcerpt() {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const selectedPreset = personaPresets[selectedIndex]
  const persona = assignPersona(selectedPreset.metrics)

  return (
    <section aria-labelledby="yap-excerpt-title" className="interactive-excerpt">
      <header className="interactive-excerpt-heading">
        <p className="eyebrow">Interactive excerpt</p>
        <h2 id="yap-excerpt-title">Fix Yo Yap persona card</h2>
        <p>Switch between fixed metric presets to see the resulting demonstration persona.</p>
      </header>

      <p className="excerpt-disclosure">
        These are fixed demonstration rules and not Fix Yo Yap’s production scoring service.
      </p>
      <p className="excerpt-disclosure">
        No microphone input, recording, or production scoring is used in this excerpt.
      </p>
      <a className="text-link excerpt-evidence-link" href={excerptDetails['fix-yo-yap'].evidenceHref}>
        {excerptDetails['fix-yo-yap'].evidenceLabel}
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

        <div aria-live="polite" className="excerpt-result excerpt-persona" role="status">
          <p className="excerpt-result-label">Demonstration persona</p>
          <strong>{persona}</strong>
          <dl>
            <div>
              <dt>Pace</dt>
              <dd>{selectedPreset.metrics.pace} wpm</dd>
            </div>
            <div>
              <dt>Fillers</dt>
              <dd>{selectedPreset.metrics.fillers}</dd>
            </div>
            <div>
              <dt>Pauses</dt>
              <dd>{selectedPreset.metrics.pauses}</dd>
            </div>
            <div>
              <dt>Energy</dt>
              <dd>{Math.round(selectedPreset.metrics.energy * 100)}%</dd>
            </div>
          </dl>
        </div>
        <button className="excerpt-reset" onClick={() => setSelectedIndex(0)} type="button">
          Reset
        </button>
      </div>
    </section>
  )
}
