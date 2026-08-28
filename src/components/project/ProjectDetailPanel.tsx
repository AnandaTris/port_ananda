import { ExternalLink } from '@/components/ui/ExternalLink'
import { StatusBadge } from '@/components/ui/StatusBadge'
import type { Project, ProjectStatus } from '@/content/types'

/**
 * The three parts of a case study. These used to be selectable "lenses" the
 * reader toggled between; on the case-study page all three were always rendered
 * anyway, so the toggle is gone and the sections just say what they hold.
 */
export type DetailSection = 'overview' | 'build' | 'results'

type ProjectDetailPanelProps = {
  project: Project
  section: DetailSection
}

const statusDetails: Record<
  ProjectStatus,
  { label: string; tone: 'jade' | 'cyan' | 'coral' | 'sunshine' }
> = {
  live: { label: 'Live product', tone: 'jade' },
  'working-demo': { label: 'Working demo', tone: 'cyan' },
  'source-backed': { label: 'Source-backed', tone: 'sunshine' },
  prototype: { label: 'Prototype', tone: 'coral' },
}

const linkLabels: Record<keyof Project['links'], string> = {
  live: 'Live product',
  appStore: 'App Store',
  source: 'Source',
}

const sectionKickers: Record<DetailSection, string> = {
  overview: 'Overview',
  build: 'Build',
  results: 'Results',
}

const sectionHeadings: Record<DetailSection, string> = {
  overview: 'What it does and why',
  build: 'How it works',
  results: 'Outcomes, ownership, and limits',
}

/**
 * Problem and hard decision, and nothing else. The outcomes list used to sit
 * beside them, but Overview and Results were alternative views of one project
 * back when the reader picked between them; now that all three panels render on
 * the same page, that list was printing twice. Results keeps it, with sources.
 */
function OverviewContent({ project }: { project: Project }) {
  return (
    <div className="detail-story-grid">
      <dl className="detail-facts">
        <div>
          <dt>Problem</dt>
          <dd>{project.problem}</dd>
        </div>
        <div>
          <dt>Hard decision</dt>
          <dd>{project.hardDecision}</dd>
        </div>
      </dl>
    </div>
  )
}

function BuildContent({ project }: { project: Project }) {
  return (
    <div className="detail-system-grid">
      <ol aria-label="Build decisions" className="system-decisions">
        {project.system.map((block, index) => (
          <li key={block.title}>
            <span aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
            <div>
              <strong>{block.title}</strong>
              <p>{block.detail}</p>
            </div>
          </li>
        ))}
      </ol>
      <div className="detail-stack">
        <p className="detail-label">Stack</p>
        <ul aria-label="Technology stack">
          {project.stack.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

function ResultsContent({ project }: { project: Project }) {
  const status = statusDetails[project.status]
  const links = (
    Object.entries(project.links) as [keyof Project['links'], string | undefined][]
  ).filter((entry): entry is [keyof Project['links'], string] => Boolean(entry[1]))

  return (
    <div className="detail-proof-grid">
      <dl className="result-facts">
        <div>
          <dt>Status</dt>
          <dd>
            <StatusBadge tone={status.tone}>{status.label}</StatusBadge>
          </dd>
        </div>
        <div>
          <dt>Role</dt>
          <dd>{project.role}</dd>
        </div>
        {project.teamSize ? (
          <div>
            <dt>Team</dt>
            <dd>{project.teamSize} people</dd>
          </div>
        ) : null}
        {project.contributionBoundary ? (
          <div>
            <dt>Team boundary</dt>
            <dd>{project.contributionBoundary}</dd>
          </div>
        ) : null}
        <div>
          <dt>Last checked</dt>
          <dd>
            <time dateTime={project.lastVerified}>{project.lastVerified}</time>
          </dd>
        </div>
      </dl>

      <div className="result-groups">
        <div className="result-outcomes">
          <p className="detail-label">Outcomes</p>
          <ul aria-label="Recorded project outcomes">
            {project.outcomes.map((outcome) => (
              <li key={`${outcome.label}-${outcome.value}`}>
                <span>{outcome.label}</span>
                <strong>{outcome.value}</strong>
                <small>Source: {outcome.source}</small>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="detail-label">What I owned</p>
          <ul>
            {project.ownership.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div>
          <p className="detail-label">Limitations</p>
          <ul>
            {project.limitations.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        {links.length > 0 ? (
          <div className="result-links">
            <p className="detail-label">Links</p>
            <ul>
              {links.map(([kind, href]) => (
                <li key={kind}>
                  <ExternalLink className="text-link" href={href}>
                    {linkLabels[kind]}
                  </ExternalLink>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </div>
  )
}

function SectionContent({ project, section }: ProjectDetailPanelProps) {
  if (section === 'overview') return <OverviewContent project={project} />
  if (section === 'build') return <BuildContent project={project} />
  return <ResultsContent project={project} />
}

export function ProjectDetailPanel({ project, section }: ProjectDetailPanelProps) {
  const headingId = `${project.slug}-${section}`

  return (
    <section
      aria-labelledby={headingId}
      className="project-detail-panel"
      data-section={section}
    >
      <header className="detail-panel-heading">
        <p className="detail-kicker">{sectionKickers[section]}</p>
        <h2 id={headingId}>{sectionHeadings[section]}</h2>
      </header>
      <div className="detail-panel-frame">
        <SectionContent project={project} section={section} />
      </div>
    </section>
  )
}
