'use client'

import { useState } from 'react'
import { excerptDetails } from './excerpt-config'
import { redactSensitiveText, requiresApproval } from './guardian'

export function GuardianExcerpt() {
  const [message, setMessage] = useState('')
  const redactedMessage = redactSensitiveText(message)
  const approvalRequired = requiresApproval(message)

  return (
    <section aria-labelledby="guardian-excerpt-title" className="interactive-excerpt">
      <header className="interactive-excerpt-heading">
        <p className="eyebrow">Interactive excerpt</p>
        <h2 id="guardian-excerpt-title">CareKaki Guardian</h2>
        <p>
          Try a visitor message to see a local redaction pass and whether a human approval gate
          would be required.
        </p>
      </header>

      <p className="excerpt-disclosure">
        Simplified local demonstration: it applies a small set of patterns and does not connect to
        CareKaki’s team-built production systems.
      </p>
      <a className="text-link excerpt-evidence-link" href={excerptDetails.carekaki.evidenceHref}>
        {excerptDetails.carekaki.evidenceLabel}
      </a>

      <div className="excerpt-form">
        <label htmlFor="guardian-message">Visitor message</label>
        <textarea
          id="guardian-message"
          onChange={(event) => setMessage(event.target.value)}
          placeholder="Type a message to inspect locally"
          rows={4}
          value={message}
        />
        <div aria-live="polite" className="excerpt-result" role="status">
          <p className="excerpt-result-label">Redacted locally</p>
          <p>{redactedMessage || 'No message entered.'}</p>
          <p className="excerpt-approval">
            {approvalRequired ? 'Human approval required' : 'No approval needed'}
          </p>
        </div>
        <button className="excerpt-reset" onClick={() => setMessage('')} type="button">
          Reset
        </button>
      </div>
    </section>
  )
}
