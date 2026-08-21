import { profile } from '@/content/profile'

const proofTiles = [
  {
    label: 'Product evidence',
    value: 'Live on the App Store',
    detail: 'Fix Yo Yap — a shipped, auditable speaking-score product.',
    tone: 'cyan',
  },
  {
    label: 'Independent review',
    value: 'Dell Top 5 finalist',
    detail: 'CareKaki — selected with a community-care problem statement.',
    tone: 'coral',
  },
  {
    label: 'Engineering breadth',
    value: '1,141 automated tests',
    detail: 'System behavior checked before a confident release decision.',
    tone: 'sunshine',
  },
] as const

export function Hero() {
  const email = profile.links.find((link) => link.label === 'Email')

  if (!email) {
    return null
  }

  const collaborationHref = `${email.href}?subject=Building%20something%20together`

  return (
    <section aria-labelledby="hero-title" className="hero" id="hero">
      <div className="hero-inner">
        <div className="hero-copy">
          <p className="eyebrow">Evidence Fieldbook / 01</p>
          <h1 id="hero-title">{profile.hero}</h1>
          <p className="hero-supporting-line">{profile.supportingLine}</p>
          <div className="hero-actions">
            <a className="button button-primary" href={collaborationHref}>
              Build something together
            </a>
            <a className="text-link" href="#work">
              Explore the work <span aria-hidden="true">↓</span>
            </a>
          </div>
          <p className="hero-collaboration-line">{profile.collaborationLine}</p>
        </div>

        <aside aria-label="Immediate proof" className="hero-proof">
          {proofTiles.map((tile) => (
            <article className={`proof-tile proof-tile-${tile.tone}`} key={tile.value}>
              <p className="proof-label">{tile.label}</p>
              <p className="proof-value">{tile.value}</p>
              <p className="proof-detail">{tile.detail}</p>
            </article>
          ))}
        </aside>
      </div>
    </section>
  )
}
