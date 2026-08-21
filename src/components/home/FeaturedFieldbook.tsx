import Image from 'next/image'
import Link from 'next/link'
import { ProjectLensPanel } from '@/components/lens/ProjectLensPanel'
import { StatusBadge } from '@/components/ui/StatusBadge'
import { projects } from '@/content/projects'
import type { Capability, Lens, Project, ProjectStatus } from '@/content/types'

type FeaturedFieldbookProps = {
  capability: Capability | 'all'
  lens: Lens
}

const featuredProjectSlugs = [
  'fix-yo-yap',
  'carekaki',
  'das-dial',
  'false-positive',
  'cited',
] as const

const statusDetails: Record<
  ProjectStatus,
  { label: string; tone: 'jade' | 'cyan' | 'coral' | 'sunshine' }
> = {
  live: { label: 'Live product', tone: 'jade' },
  'working-demo': { label: 'Working demo', tone: 'cyan' },
  'source-backed': { label: 'Source-backed', tone: 'sunshine' },
  prototype: { label: 'Prototype', tone: 'coral' },
}

const featuredProjects = featuredProjectSlugs.map((slug) => {
  const project = projects.find((item) => item.slug === slug)
  if (!project || !project.featured) {
    throw new Error(`Missing featured project: ${slug}`)
  }
  return project
})

export function orderFeaturedProjects(capability: Capability | 'all'): readonly Project[] {
  if (capability === 'all') return featuredProjects

  const matching = featuredProjects.filter((project) => project.capabilities.includes(capability))
  const remaining = featuredProjects.filter((project) => !project.capabilities.includes(capability))
  return [...matching, ...remaining]
}

function ProjectVisual({ project }: { project: Project }) {
  const media = project.media[0]

  if (media) {
    return (
      <figure className="fieldbook-visual fieldbook-media">
        <Image
          alt={media.alt}
          height={media.height}
          sizes="(max-width: 700px) 100vw, (max-width: 1100px) 46vw, 38vw"
          src={media.src}
          width={media.width}
        />
        <figcaption>Verified project media</figcaption>
      </figure>
    )
  }

  return (
    <div
      aria-label={`${project.name} system diagram`}
      className="fieldbook-visual fieldbook-diagram"
      role="img"
    >
      <span className="diagram-index">01</span>
      <strong>{project.system[0]?.title}</strong>
      <span aria-hidden="true" className="diagram-connector">
        →
      </span>
      <span className="diagram-index">02</span>
      <strong>{project.system[1]?.title ?? project.hardDecision}</strong>
    </div>
  )
}

export function FeaturedFieldbook({ capability, lens }: FeaturedFieldbookProps) {
  const orderedProjects = orderFeaturedProjects(capability)

  return (
    <section aria-labelledby="featured-fieldbook-title" className="featured-fieldbook">
      <div className="fieldbook-heading">
        <p className="eyebrow">Featured evidence fieldbook</p>
        <h2 id="featured-fieldbook-title">Five products, one accountable through-line.</h2>
        <p>
          Capability choices change the reading order, never the evidence available. Each case
          separates the product bet, system decisions, and proof boundary.
        </p>
      </div>

      <ol className="fieldbook-list">
        {orderedProjects.map((project, index) => {
          const status = statusDetails[project.status]
          const headingId = `featured-${project.slug}`

          return (
            <li key={project.slug}>
              <article aria-labelledby={headingId} className="fieldbook-card" data-accent={project.accent}>
                <header className="fieldbook-card-header">
                  <p className="fieldbook-index">Field note {String(index + 1).padStart(2, '0')}</p>
                  <StatusBadge tone={status.tone}>{status.label}</StatusBadge>
                  <h3 id={headingId}>{project.name}</h3>
                  <p className="fieldbook-one-line">{project.oneLine}</p>
                  <p className="fieldbook-role">
                    <span>Role</span>
                    {project.role}
                  </p>
                </header>

                <ProjectVisual project={project} />
                <ProjectLensPanel compact lens={lens} project={project} />

                <footer className="fieldbook-card-footer">
                  <Link className="button fieldbook-link" href={`/work/${project.slug}`}>
                    Explore case study
                  </Link>
                  <span aria-hidden="true">{project.capabilities.join(' · ')}</span>
                </footer>
              </article>
            </li>
          )
        })}
      </ol>
    </section>
  )
}
