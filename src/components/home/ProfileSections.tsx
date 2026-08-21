import { ExternalLink } from '@/components/ui/ExternalLink'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { StatusBadge } from '@/components/ui/StatusBadge'
import { profile } from '@/content/profile'

const collaborationContributions = [
  'Product definition',
  'AI system design',
  'Production engineering',
  'Monetization',
  'Experimentation',
  'Cross-functional delivery',
] as const

const experienceStatus = {
  incoming: { label: 'Incoming', tone: 'cyan' },
  current: { label: 'Current', tone: 'jade' },
  completed: { label: 'Completed', tone: 'sunshine' },
} as const

export function ProfileSections() {
  const email = profile.links.find((link) => link.label === 'Email')
  const socialLinks = profile.links.filter((link) => link.label !== 'Email')

  return (
    <div className="profile-sections">
      <section
        aria-labelledby="principles-heading"
        className="profile-section profile-principles"
        id="principles"
      >
        <div className="profile-section-inner">
          <SectionHeading
            description="A field rule is only useful if it holds when the product, the data, and the decision all get complicated."
            eyebrow="How I build"
            id="principles-heading"
            title="Operating principles for accountable products"
          />
          <ol className="principles-list">
            {profile.principles.map((principle, index) => (
              <li key={principle}>
                <span aria-hidden="true">0{index + 1}</span>
                <strong>{principle}</strong>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section
        aria-labelledby="experience-heading"
        className="profile-section profile-experience"
        id="experience"
      >
        <div className="profile-section-inner">
          <SectionHeading
            description="Product work, research practice, and community leadership—kept distinct so the work and the responsibility behind each claim stay clear."
            eyebrow="Field record"
            id="experience-heading"
            title="Experience, research, awards, and leadership"
          />

          <div className="profile-records">
            <section aria-labelledby="professional-work-heading" className="profile-record">
              <div className="profile-record-heading">
                <p className="eyebrow">Professional work</p>
                <h3 id="professional-work-heading">Product work in the field</h3>
              </div>
              <ol aria-label="Professional experience" className="experience-timeline">
                {profile.workExperience.map((role) => {
                  const status = experienceStatus[role.status]

                  return (
                    <li key={`${role.organization}-${role.title}`}>
                      <article className="experience-entry">
                        <div className="experience-entry-meta">
                          <p>{role.period}</p>
                          <StatusBadge tone={status.tone}>{status.label}</StatusBadge>
                        </div>
                        <div>
                          <p className="experience-entry-organization">{role.organization}</p>
                          <h4>{role.title}</h4>
                          <ul>
                            {role.highlights.map((highlight) => (
                              <li key={highlight}>{highlight}</li>
                            ))}
                          </ul>
                        </div>
                      </article>
                    </li>
                  )
                })}
              </ol>
            </section>

            <div className="profile-record-grid">
              <section aria-labelledby="research-heading" className="profile-record">
                <div className="profile-record-heading">
                  <p className="eyebrow">Research</p>
                  <h3 id="research-heading">Two research roles</h3>
                </div>
                <ol aria-label="Research roles" className="profile-compact-list">
                  {profile.research.map((role) => (
                    <li key={`${role.organization}-${role.title}`}>
                      <p>{role.period}</p>
                      <h4>{role.title}</h4>
                      <strong>{role.organization}</strong>
                      <ul>
                        {role.highlights.map((highlight) => (
                          <li key={highlight}>{highlight}</li>
                        ))}
                      </ul>
                    </li>
                  ))}
                </ol>
              </section>

              <section aria-labelledby="awards-heading" className="profile-record">
                <div className="profile-record-heading">
                  <p className="eyebrow">Selected evidence</p>
                  <h3 id="awards-heading">Awards and grants</h3>
                </div>
                <ol aria-label="Selected awards" className="profile-compact-list profile-awards-list">
                  {profile.awards.map((award) => (
                    <li key={award.name}>
                      {award.date ? <p>{award.date}</p> : <p>Grant record</p>}
                      <h4>{award.name}</h4>
                      <span>{award.detail}</span>
                    </li>
                  ))}
                </ol>
              </section>
            </div>

            <section aria-labelledby="leadership-heading" className="profile-record profile-leadership">
              <div className="profile-record-heading">
                <p className="eyebrow">Leadership</p>
                <h3 id="leadership-heading">SENTRE community leadership</h3>
              </div>
              <ol aria-label="Leadership roles" className="profile-compact-list">
                {profile.leadership.map((role) => (
                  <li key={`${role.organization}-${role.title}`}>
                    <p>{role.period}</p>
                    <h4>{role.title}</h4>
                    <strong>{role.organization}</strong>
                    <ul>
                      {role.highlights.map((highlight) => (
                        <li key={highlight}>{highlight}</li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ol>
            </section>
          </div>
        </div>
      </section>

      <section aria-labelledby="contact-heading" className="profile-section profile-contact" id="contact">
        <div className="profile-section-inner profile-contact-inner">
          <SectionHeading
            description={profile.collaborationLine}
            eyebrow="Collaboration brief"
            id="contact-heading"
            title="Build something useful together"
          />
          <div className="collaboration-brief">
            <p className="collaboration-brief-intro">
              Bring the problem, the stakes, and the first constraint. I can contribute across the
              full route from an uncertain product bet to a grounded next decision.
            </p>
            <ul aria-label="Collaboration contributions">
              {collaborationContributions.map((contribution) => (
                <li key={contribution}>{contribution}</li>
              ))}
            </ul>
            <div className="collaboration-actions">
              {email ? (
                <a aria-label="Email Ananda" className="button button-primary" href={email.href}>
                  Start a collaboration brief
                </a>
              ) : null}
              <nav aria-label="Public profiles" className="collaboration-links">
                {socialLinks.map((link) => (
                  <ExternalLink href={link.href} key={link.label}>
                    {link.label}
                  </ExternalLink>
                ))}
              </nav>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
