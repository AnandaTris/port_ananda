'use client'

import { motion, useReducedMotion } from 'motion/react'
import type { ReactNode } from 'react'
import { ExternalLink } from '@/components/ui/ExternalLink'
import { StatusBadge } from '@/components/ui/StatusBadge'
import type { Lens, Project, ProjectStatus } from '@/content/types'

type ProjectLensPanelProps = {
  project: Project
  lens: Lens
  compact?: boolean
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

function getProjectStatusDetails(status: ProjectStatus) {
  return statusDetails[status]
}

function StoryContent({ project }: { project: Project }) {
  return (
    <div className="lens-story-grid">
      <dl className="lens-facts">
        <div>
          <dt>Problem</dt>
          <dd>{project.problem}</dd>
        </div>
        <div>
          <dt>Hard decision</dt>
          <dd>{project.hardDecision}</dd>
        </div>
      </dl>
      <div className="lens-evidence">
        <p className="lens-label">Outcomes</p>
        <ul aria-label="Project outcomes">
          {project.outcomes.map((outcome) => (
            <li key={`${outcome.label}-${outcome.value}`}>
              <span>{outcome.label}</span>
              <strong>{outcome.value}</strong>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

function SystemContent({ project }: { project: Project }) {
  return (
    <div className="lens-system-grid">
      <ol aria-label="System decisions" className="system-decisions">
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
      <div className="lens-stack">
        <p className="lens-label">Stack</p>
        <ul aria-label="Technology stack">
          {project.stack.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

function ProofContent({ project }: { project: Project }) {
  const status = getProjectStatusDetails(project.status)
  const links = (Object.entries(project.links) as [keyof Project['links'], string | undefined][]).filter(
    (entry): entry is [keyof Project['links'], string] => Boolean(entry[1]),
  )

  return (
    <div className="lens-proof-grid">
      <dl className="proof-facts">
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
          <dt>Last verified</dt>
          <dd>
            <time dateTime={project.lastVerified}>{project.lastVerified}</time>
          </dd>
        </div>
      </dl>

      <div className="proof-evidence-groups">
        <div>
          <p className="lens-label">Owned contribution</p>
          <ul>
            {project.ownership.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div>
          <p className="lens-label">Known limitations</p>
          <ul>
            {project.limitations.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        {links.length > 0 ? (
          <div className="proof-links">
            <p className="lens-label">Verified links</p>
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

function LensContent({ lens, project }: Pick<ProjectLensPanelProps, 'lens' | 'project'>) {
  if (lens === 'story') return <StoryContent project={project} />
  if (lens === 'system') return <SystemContent project={project} />
  return <ProofContent project={project} />
}

function LensFrame({
  animate,
  children,
  lens,
}: {
  animate: boolean
  children: ReactNode
  lens: Lens
}) {
  if (!animate) {
    return (
      <div className="lens-panel-frame" key={lens}>
        {children}
      </div>
    )
  }

  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      className="lens-panel-frame"
      initial={{ opacity: 0.96, y: 8 }}
      key={lens}
      transition={{ duration: 0.18, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}

export function ProjectLensPanel({ project, lens, compact = false }: ProjectLensPanelProps) {
  const reduceMotion = useReducedMotion()
  const headingId = `${project.slug}-${lens}-${compact ? 'compact' : 'full'}`
  const Heading = compact ? 'h4' : 'h2'

  return (
    <section
      aria-labelledby={headingId}
      className="project-lens-panel"
      data-compact={compact || undefined}
      data-lens={lens}
    >
      <header className="lens-panel-heading">
        <p className="lens-kicker">{lens}</p>
        <Heading id={headingId}>
          {lens === 'story' ? 'The product bet' : lens === 'system' ? 'How it works' : 'Evidence and boundaries'}
        </Heading>
      </header>
      <LensFrame animate={compact && !reduceMotion} lens={lens}>
        <LensContent lens={lens} project={project} />
      </LensFrame>
    </section>
  )
}
