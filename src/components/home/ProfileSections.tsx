import Link from 'next/link'
import { ExternalLink } from '@/components/ui/ExternalLink'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { StatusBadge } from '@/components/ui/StatusBadge'
import { profile } from '@/content/profile'
import { projects } from '@/content/projects'
import type { Project, ProjectStatus } from '@/content/types'

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

const projectStatus: Record<
  ProjectStatus,
  { label: string; tone: 'jade' | 'cyan' | 'coral' | 'sunshine' }
> = {
  live: { label: 'Live product', tone: 'jade' },
  'working-demo': { label: 'Working demo', tone: 'cyan' },
  'source-backed': { label: 'Source-backed', tone: 'sunshine' },
  prototype: { label: 'Prototype', tone: 'coral' },
}

const professionalProducts = ['brawnix', 'ingatik-recall'].map((slug) => {
  const project = projects.find((item) => item.slug === slug)
  if (!project) throw new Error(`Missing professional product: ${slug}`)
  return project
})

const projectLinkLabels: Record<keyof Project['links'], string> = {
  live: 'Website',
  appStore: 'App Store',
  source: 'Source',
}

export function OperatingPrinciples() {
  return (
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
  )
}

export function ProfessionalProductWork() {
  return (
    <section
      aria-labelledby="professional-products-heading"
      className="profile-section professional-products"
      id="professional-products"
    >
      <div className="profile-section-inner">
        <SectionHeading
          description="Two live products where the shipped product, Ananda’s role, and the team boundary stay visible together."
          eyebrow="Professional product work"
          id="professional-products-heading"
          title="Professional product work"
        />
        <ol aria-label="Professional product work cards" className="professional-product-grid">
          {professionalProducts.map((project) => {
            const status = projectStatus[project.status]
            const links = (
              Object.entries(project.links) as [keyof Project['links'], string | undefined][]
            ).filter((entry): entry is [keyof Project['links'], string] => Boolean(entry[1]))

            return (
              <li key={project.slug}>
                <article className="professional-product-card" data-accent={project.accent}>
                  <header>
                    <StatusBadge tone={status.tone}>{status.label}</StatusBadge>
                    <h3>{project.name}</h3>
                    <p>{project.oneLine}</p>
                  </header>
                  <dl className="professional-product-boundary">
                    <div>
                      <dt>Role</dt>
                      <dd>{project.role}</dd>
                    </div>
                    <div>
                      <dt>Contribution boundary</dt>
                      <dd>{project.contributionBoundary}</dd>
                    </div>
                  </dl>
                  <div className="professional-product-outcomes">
                    <p className="lens-label">Outcome evidence</p>
                    <ul>
                      {project.outcomes.map((outcome) => (
                        <li key={`${outcome.label}-${outcome.value}`}>
                          <span>{outcome.label}</span>
                          <strong>{outcome.value}</strong>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <footer>
                    <Link
                      aria-label={`Explore ${project.name} case study`}
                      className="button professional-product-link"
                      href={`/work/${project.slug}`}
                    >
                      Explore case study
                    </Link>
                    <div className="professional-product-public-links">
                      {links.map(([kind, href]) => (
                        <ExternalLink href={href} key={kind}>
                          {projectLinkLabels[kind]}
                        </ExternalLink>
                      ))}
                    </div>
                  </footer>
                </article>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}

export function ExperienceAndCredentials() {
  return (
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
              <p className="eyebrow">Professional experience</p>
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
  )
}

export function ContactSection() {
  const email = profile.links.find((link) => link.label === 'Email')
  const socialLinks = profile.links.filter((link) => link.label !== 'Email')

  return (
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
  )
}

export function ProfileSections() {
  return (
    <div className="profile-sections">
      <OperatingPrinciples />
      <ProfessionalProductWork />
      <ExperienceAndCredentials />
      <ContactSection />
    </div>
  )
}
