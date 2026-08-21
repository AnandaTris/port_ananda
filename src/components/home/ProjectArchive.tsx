'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'
import { filterProjects } from '@/lib/projects'
import type { Capability, Project, ProjectStatus } from '@/content/types'

type ProjectArchiveProps = {
  projects: readonly Project[]
  capability: Capability | 'all'
}
const statusOptions: readonly { value: ProjectStatus | 'all'; label: string }[] = [
  { value: 'all', label: 'All maturities' },
  { value: 'live', label: 'Live' },
  { value: 'working-demo', label: 'Working demo' },
  { value: 'source-backed', label: 'Source-backed' },
  { value: 'prototype', label: 'Prototype' },
]

const statusLabels: Record<ProjectStatus, string> = {
  live: 'Live',
  'working-demo': 'Working demo',
  'source-backed': 'Source-backed',
  prototype: 'Prototype',
}

export function ProjectArchive({ projects, capability }: ProjectArchiveProps) {
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState<ProjectStatus | 'all'>('all')

  const matchingProjects = useMemo(() => {
    const capabilityMatches = filterProjects(projects, { capability, query })
    if (status === 'all') return capabilityMatches
    return capabilityMatches.filter((project) => project.status === status)
  }, [capability, projects, query, status])

  const resetFilters = () => {
    setQuery('')
    setStatus('all')
  }

  const resultLabel = `${matchingProjects.length} ${matchingProjects.length === 1 ? 'project' : 'projects'}`

  return (
    <section aria-labelledby="project-archive-title" className="project-archive">
      <div className="archive-heading">
        <div>
          <p className="eyebrow">Project archive</p>
          <h2 id="project-archive-title">Every project, with its evidence boundary.</h2>
        </div>
        <p>
          Search the approved roster by project, capability, role, or stack. Each result links to a
          case study, including prototypes whose evidence is source-backed only.
        </p>
      </div>

      <div className="archive-controls">
        <div className="archive-control">
          <label htmlFor="project-search">Search projects</label>
          <input
            id="project-search"
            name="project-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Name, role, capability, stack…"
          />
        </div>
        <div className="archive-control">
          <label htmlFor="project-maturity">Filter by maturity</label>
          <select
            id="project-maturity"
            name="project-maturity"
            value={status}
            onChange={(event) => setStatus(event.target.value as ProjectStatus | 'all')}
          >
            {statusOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <button className="button archive-reset" type="button" onClick={resetFilters}>
          Reset filters
        </button>
      </div>

      <p aria-live="polite" className="archive-result-count">
        {resultLabel}
      </p>

      <ul className="archive-grid">
        {matchingProjects.map((project) => (
          <li key={project.slug}>
            <article className="archive-card" data-accent={project.accent}>
              <header className="archive-card-header">
                <p className="archive-status">Status: {statusLabels[project.status]}</p>
                <h3>{project.name}</h3>
                <p className="archive-summary">{project.oneLine}</p>
              </header>
              <div className="archive-card-body">
                <p className="archive-role">
                  <span>Role</span>
                  {project.role}
                </p>
                <ul aria-label={`${project.name} capabilities`} className="archive-tags">
                  {project.capabilities.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <footer className="archive-card-footer">
                <Link
                  className="archive-link"
                  href={`/work/${project.slug}`}
                  aria-label={`View evidence for ${project.name}`}
                >
                  View evidence <span aria-hidden="true">↗</span>
                </Link>
              </footer>
            </article>
          </li>
        ))}
      </ul>
    </section>
  )
}
