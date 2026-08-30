import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { revealOnLoad } from '@/components/motion/reveal-on-load'
import { ProjectDetailPanel } from '@/components/project/ProjectDetailPanel'
import { ProjectLogo } from '@/components/project/ProjectLogo'
import { ProjectMediaVisual } from '@/components/project/ProjectMediaVisual'
import { StatusBadge } from '@/components/ui/StatusBadge'
import { projects } from '@/content/projects'
import { statusDetails } from '@/content/status'
import type { Project } from '@/content/types'
import { ExcerptRegistry } from '@/features/excerpts/ExcerptRegistry'
import { getProject } from '@/lib/projects'
import { SITE_URL } from '@/lib/site'

type WorkPageProps = {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }))
}

export async function generateMetadata({ params }: WorkPageProps): Promise<Metadata> {
  const { slug } = await params
  const project = getProject(slug)

  if (!project) notFound()

  const canonicalPath = `/work/${project.slug}`
  const featuredMedia = project.media[0]
  const featuredImage = featuredMedia?.src.startsWith('/')
    ? {
        url: new URL(featuredMedia.src, SITE_URL).toString(),
        width: featuredMedia.width,
        height: featuredMedia.height,
        alt: featuredMedia.alt,
      }
    : undefined

  return {
    title: project.name,
    description: project.oneLine,
    alternates: { canonical: canonicalPath },
    openGraph: {
      type: 'website',
      url: canonicalPath,
      title: project.name,
      description: project.oneLine,
      ...(featuredImage ? { images: [featuredImage] } : {}),
    },
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
          <Link className="text-link case-study-back" href="/#projects">
            ← Back to projects
          </Link>
          <div className="case-study-identity" {...revealOnLoad(0)}>
            <ProjectLogo logo={project.logo} size={56} />
            <StatusBadge tone={status.tone}>{status.label}</StatusBadge>
          </div>
          <div className="case-study-headline" {...revealOnLoad(1)}>
            <h1>{project.name}</h1>
            <div>
              <p className="case-study-deck">{project.oneLine}</p>
              <p className="case-study-role">{project.role}</p>
            </div>
          </div>
        </div>
        <ProjectMediaVisual priority project={project} />
      </header>

      <div aria-label={`${project.name} case study`} className="case-study-details">
        <ProjectDetailPanel project={project} section="overview" />
        <ProjectDetailPanel project={project} section="build" />
        <ProjectDetailPanel project={project} section="results" />
      </div>

      <ExcerptRegistry slug={project.slug} />

      <aside aria-labelledby="related-projects-title" className="related-projects">
        <h2 id="related-projects-title">Related projects</h2>
        <ul>
          {related.map((item) => (
            <li key={item.slug}>
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
