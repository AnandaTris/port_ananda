import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ProjectLensPanel } from '@/components/lens/ProjectLensPanel'
import { ProjectMediaVisual } from '@/components/project/ProjectMediaVisual'
import { StatusBadge } from '@/components/ui/StatusBadge'
import { projects } from '@/content/projects'
import type { Project, ProjectStatus } from '@/content/types'
import { ExcerptRegistry } from '@/features/excerpts/ExcerptRegistry'
import { getProject } from '@/lib/projects'

type WorkPageProps = {
  params: Promise<{ slug: string }>
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

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }))
}

export async function generateMetadata({ params }: WorkPageProps): Promise<Metadata> {
  const { slug } = await params
  const project = getProject(slug)

  if (!project) notFound()

  return {
    title: project.name,
    description: project.oneLine,
  }
}

function relatedProjects(project: Project): readonly Project[] {
  return projects
    .filter(
      (candidate) =>
        candidate.slug !== project.slug &&
        candidate.capabilities.some((capability) => project.capabilities.includes(capability)),
    )
    .map((candidate, index) => ({
      candidate,
      index,
      sharedCapabilities: candidate.capabilities.filter((capability) =>
        project.capabilities.includes(capability),
      ).length,
    }))
    .sort((a, b) => b.sharedCapabilities - a.sharedCapabilities || a.index - b.index)
    .slice(0, 3)
    .map(({ candidate }) => candidate)
}

export default async function WorkPage({ params }: WorkPageProps) {
  const { slug } = await params
  const project = getProject(slug)

  if (!project) notFound()

  const status = statusDetails[project.status]
  const related = relatedProjects(project)

  return (
    <main className="case-study" id="main-content" tabIndex={-1}>
      <header className="case-study-hero" data-accent={project.accent}>
        <div className="case-study-hero-copy">
          <Link className="text-link case-study-back" href="/#work">
            ← Back to fieldbook
          </Link>
          <div className="case-study-status">
            <StatusBadge tone={status.tone}>{status.label}</StatusBadge>
            <span>{project.role}</span>
          </div>
          <p className="eyebrow">Evidence field note</p>
          <h1>{project.name}</h1>
          <p className="case-study-deck">{project.oneLine}</p>
          <ul aria-label="Project capabilities" className="case-study-capabilities">
            {project.capabilities.map((capability) => (
              <li key={capability}>{capability}</li>
            ))}
          </ul>
        </div>
        <ProjectMediaVisual priority project={project} variant="case-study" />
      </header>

      <div aria-label={`${project.name} case study`} className="case-study-lenses">
        <ProjectLensPanel lens="story" project={project} />
        <ProjectLensPanel lens="system" project={project} />
        <ProjectLensPanel lens="proof" project={project} />
      </div>

      <ExcerptRegistry slug={project.slug} />

      <aside aria-labelledby="related-projects-title" className="related-projects">
        <p className="eyebrow">Shared capabilities</p>
        <h2 id="related-projects-title">Related field notes</h2>
        <ul>
          {related.map((item) => (
            <li key={item.slug}>
              <p>{item.capabilities.filter((capability) => project.capabilities.includes(capability)).join(' · ')}</p>
              <h3>
                <Link href={`/work/${item.slug}`}>{item.name}</Link>
              </h3>
              <span>{item.oneLine}</span>
            </li>
          ))}
        </ul>
      </aside>
    </main>
  )
}
