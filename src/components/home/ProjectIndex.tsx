import Link from 'next/link'
import { CountUp } from '@/components/motion/CountUp'
import { ProjectLogo } from '@/components/project/ProjectLogo'
import { projects } from '@/content/projects'
import type { ProjectStatus } from '@/content/types'

const statusLabels: Record<ProjectStatus, string> = {
  live: 'Live',
  'working-demo': 'Working demo',
  'source-backed': 'Source-backed',
  prototype: 'Prototype',
}

/**
 * One list, every project, in the order the content file declares. This
 * replaced a capability picker and a three-way reading toggle wired across two
 * client islands: seventeen rows are short enough to read, and a filter that
 * only ever reorders seventeen things is a control that costs more than it
 * saves.
 */
export function ProjectIndex() {
  return (
    <section
      aria-labelledby="projects-heading"
      className="profile-section project-index"
      id="projects"
    >
      <div className="profile-section-inner">
        <div className="section-heading section-heading-counted">
          <h2 id="projects-heading">Projects</h2>
          <p className="section-count">
            <CountUp suffix=" projects" target={projects.length} />
          </p>
        </div>

        <ul className="project-grid">
          {projects.map((project) => (
            <li key={project.slug}>
              <article className="project-card" data-accent={project.accent}>
                <header className="project-card-header">
                  <div className="project-card-identity">
                    <ProjectLogo logo={project.logo} />
                    <p className="project-card-status">{statusLabels[project.status]}</p>
                  </div>
                  <h3>{project.name}</h3>
                  <p className="project-card-summary">{project.oneLine}</p>
                </header>
                <footer className="project-card-footer">
                  <p className="project-card-role">{project.role}</p>
                  <Link
                    aria-label={`Read about ${project.name}`}
                    className="project-card-link"
                    href={`/work/${project.slug}`}
                  >
                    Read more <span aria-hidden="true">↗</span>
                  </Link>
                </footer>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
