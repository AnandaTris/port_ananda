'use client'

import { useState } from 'react'
import { dialDisclaimer, dialExamples } from './dial'

export function DialExcerpt() {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const selectedExample = dialExamples[selectedIndex]

  return (
    <section aria-labelledby="dial-excerpt-title" className="interactive-excerpt">
      <header className="interactive-excerpt-heading">
        <p className="eyebrow">Interactive excerpt</p>
        <h2 id="dial-excerpt-title">DAS D.I.A.L.</h2>
        <p>Step through three fixed spelling-pattern examples from a transparent screening flow.</p>
      </header>

      <p className="excerpt-disclosure">
        This is a fixed, transparent pattern demonstration. It does not accept learner data or
        provide a diagnosis.
      </p>
      <p className="excerpt-disclaimer">{dialDisclaimer}</p>

      <div className="excerpt-form">
        <fieldset>
          <legend>Choose a fixed spelling sample</legend>
          <div className="excerpt-choice-list">
            {dialExamples.map((example, index) => {
              const id = `dial-example-${example.input}`
              return (
                <label htmlFor={id} key={example.input}>
                  <input
                    checked={selectedIndex === index}
                    id={id}
                    name="dial-example"
                    onChange={() => setSelectedIndex(index)}
                    type="radio"
                    value={example.input}
                  />
                  <span>
                    <code>{example.input}</code> · {example.category}
                  </span>
                </label>
              )
            })}
          </div>
        </fieldset>

        <div aria-live="polite" className="excerpt-result" role="status">
          <p className="excerpt-result-label">Candidate</p>
          <p>
            <code>{selectedExample.candidate}</code>
          </p>
          <p>{selectedExample.explanation}</p>
        </div>
        <button className="excerpt-reset" onClick={() => setSelectedIndex(0)} type="button">
          Reset
        </button>
      </div>
    </section>
  )
}
