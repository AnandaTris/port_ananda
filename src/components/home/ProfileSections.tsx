import Image from 'next/image'
import { StackIcon } from '@/components/home/StackIcon'
import { ExternalLink } from '@/components/ui/ExternalLink'
import { StatusBadge } from '@/components/ui/StatusBadge'
import { profile } from '@/content/profile'
import { projects } from '@/content/projects'
import { stackGroups } from '@/content/stack'

/**
 * Edge length of an employer tile. Every mark ships at 256px or as a vector, so
 * this stays well inside the source resolution on a 3x display.
 */
const EXPERIENCE_LOGO_SIZE = 36

const experienceStatus = {
  incoming: { label: 'Incoming', tone: 'cyan' },
  current: { label: 'Current', tone: 'jade' },
  completed: { label: 'Completed', tone: 'sunshine' },
} as const

/**
 * How many projects on the site use each tool. Counted rather than asserted, so
 * a chip can never claim more reach than `projects.ts` supports.
 */
const stackUsage = projects.reduce<Map<string, number>>((counts, project) => {
  for (const item of project.stack) counts.set(item, (counts.get(item) ?? 0) + 1)
  return counts
}, new Map())

function SectionTitle({ children, id }: { children: string; id: string }) {
  return (
    <div className="section-heading" data-reveal>
      <h2 id={id}>{children}</h2>
    </div>
  )
}

export function WorkExperience() {
  return (
    <section
      aria-labelledby="experience-heading"
      className="profile-section profile-experience"
      id="experience"
    >
      <div className="profile-section-inner">
        <SectionTitle id="experience-heading">Work experience</SectionTitle>
        <ol aria-label="Work experience" className="experience-timeline">
          {profile.workExperience.map((role) => {
            const status = experienceStatus[role.status]

            return (
              <li data-reveal key={`${role.organization}-${role.title}`}>
                <article className="experience-entry">
                  <div className="experience-entry-meta">
                    <p>{role.period}</p>
                    <StatusBadge tone={status.tone}>{status.label}</StatusBadge>
                  </div>
                  <div>
                    <div className="experience-entry-brand">
                      {/* Decorative: the organization is named in text right
                          beside the tile, so alt text would only repeat it. */}
                      <span
                        aria-hidden="true"
                        className={`experience-logo experience-logo-${role.logo.fit}`}
                      >
                        <Image
                          alt=""
                          height={EXPERIENCE_LOGO_SIZE}
                          loading="eager"
                          sizes={`${EXPERIENCE_LOGO_SIZE}px`}
                          src={role.logo.src}
                          width={EXPERIENCE_LOGO_SIZE}
                        />
                      </span>
                      <p className="experience-entry-organization">{role.organization}</p>
                    </div>
                    <h3>{role.title}</h3>
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
      </div>
    </section>
  )
}

export function TechStack() {
  return (
    <section aria-labelledby="stack-heading" className="profile-section profile-stack" id="stack">
      <div className="profile-section-inner">
        <SectionTitle id="stack-heading">Tech stack</SectionTitle>
        <div className="stack-groups">
          {stackGroups.map((group) => (
            <section aria-label={group.name} className="stack-group" data-reveal key={group.name}>
              <h3>{group.name}</h3>
              <ul>
                {group.items.map((item) => (
                  <li key={item}>
                    <StackIcon item={item} />
                    {item}
                    <span aria-label={`used in ${stackUsage.get(item)} projects`}>
                      {stackUsage.get(item)}
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </section>
  )
}

export function Research() {
  return (
    <section
      aria-labelledby="research-heading"
      className="profile-section profile-research"
      id="research"
    >
      <div className="profile-section-inner">
        <SectionTitle id="research-heading">Research</SectionTitle>
        <ol aria-label="Research roles" className="profile-compact-list">
          {profile.research.map((role) => (
            <li data-reveal key={`${role.organization}-${role.title}`}>
              <p>{role.period}</p>
              <h3>{role.title}</h3>
              <strong>{role.organization}</strong>
              <ul>
                {role.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

export function AwardsAndGrants() {
  return (
    <section aria-labelledby="awards-heading" className="profile-section profile-awards" id="awards">
      <div className="profile-section-inner">
        <SectionTitle id="awards-heading">Awards and grants</SectionTitle>
        <ol aria-label="Awards and grants" className="profile-compact-list profile-awards-list">
          {profile.awards.map((award) => (
            <li data-reveal key={award.name}>
              {award.date ? <p>{award.date}</p> : <p>Grant record</p>}
              <h3>{award.name}</h3>
              <span>{award.detail}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

export function Leadership() {
  return (
    <section
      aria-labelledby="leadership-heading"
      className="profile-section profile-leadership"
      id="leadership"
    >
      <div className="profile-section-inner">
        <SectionTitle id="leadership-heading">Leadership</SectionTitle>
        <ol aria-label="Leadership roles" className="profile-compact-list">
          {profile.leadership.map((role) => (
            <li data-reveal key={`${role.organization}-${role.title}`}>
              <p>{role.period}</p>
              <h3>{role.title}</h3>
              <strong>{role.organization}</strong>
              <ul>
                {role.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

export function ContactSection() {
  const email = profile.links.find((link) => link.label === 'Email')
  const socialLinks = profile.links.filter((link) => link.label !== 'Email')

  return (
    <section
      aria-labelledby="contact-heading"
      className="profile-section profile-contact"
      id="contact"
    >
      <div className="profile-section-inner profile-contact-inner">
        <SectionTitle id="contact-heading">Contact</SectionTitle>
        <div className="contact-details" data-reveal>
          {email ? (
            <a className="contact-email" href={email.href}>
              {email.href.replace('mailto:', '')}
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
    </section>
  )
}

export function ProfileSections() {
  return (
    <div className="profile-sections">
      <WorkExperience />
      <TechStack />
      <Research />
      <AwardsAndGrants />
      <Leadership />
      <ContactSection />
    </div>
  )
}
