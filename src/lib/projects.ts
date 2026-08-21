import { projects } from '@/content/projects'
import type { Capability, Project } from '@/content/types'

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug)
}

export function filterProjects(
  source: readonly Project[],
  filter: { capability: Capability | 'all'; query: string }
): Project[] {
  const query = filter.query.trim().toLocaleLowerCase()
  const matchingQuery = source.filter((project) => {
    const haystack = [
      project.name,
      project.oneLine,
      project.role,
      project.status,
      ...project.capabilities,
      ...project.stack,
    ]
      .join(' ')
      .toLocaleLowerCase()
    return query === '' || haystack.includes(query)
  })

  if (filter.capability === 'all') return matchingQuery

  const capability = filter.capability
  const matchingCapability = matchingQuery.filter((project) =>
    project.capabilities.includes(capability),
  )
  const remaining = matchingQuery.filter(
    (project) => !project.capabilities.includes(capability),
  )
  return [...matchingCapability, ...remaining]
}

function hasText(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0
}

function isRealIsoDate(value: unknown): value is string {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false
  const parsed = new Date(`${value}T00:00:00.000Z`)
  return !Number.isNaN(parsed.valueOf()) && parsed.toISOString().slice(0, 10) === value
}

function isPlaceholderHostname(hostname: string): boolean {
  const normalized = hostname.toLocaleLowerCase()
  return (
    /(^|\.)(example\.com|example\.org|example\.net|localhost)$/.test(normalized) ||
    normalized === '127.0.0.1' ||
    normalized === '0.0.0.0' ||
    normalized === '[::1]' ||
    normalized.endsWith('.invalid') ||
    normalized.endsWith('.test')
  )
}

export function validateProjects(source: readonly Project[]): string[] {
  const errors: string[] = []
  const slugs = new Set<string>()
  for (const [index, project] of source.entries()) {
    const label = hasText(project.slug) ? project.slug : `project[${index}]`

    for (const field of ['slug', 'name', 'oneLine', 'role', 'problem', 'hardDecision'] as const) {
      if (!hasText(project[field])) errors.push(`blank required field: ${label}.${field}`)
    }

    if (hasText(project.slug)) {
      if (slugs.has(project.slug)) errors.push(`duplicate slug: ${project.slug}`)
      slugs.add(project.slug)
    }

    if (project.ownership.length === 0) errors.push(`missing ownership: ${project.slug}`)
    if (project.ownership.some((item) => !hasText(item))) {
      errors.push(`blank ownership item: ${label}`)
    }
    if (project.limitations.length === 0) errors.push(`missing limitation: ${project.slug}`)
    if (project.limitations.some((item) => !hasText(item))) {
      errors.push(`blank limitation item: ${label}`)
    }
    if (project.capabilities.length === 0) errors.push(`missing capabilities: ${project.slug}`)
    if (project.stack.length === 0) errors.push(`missing stack: ${project.slug}`)
    if (project.stack.some((item) => !hasText(item))) errors.push(`blank stack item: ${label}`)
    if (project.outcomes.length === 0) errors.push(`missing outcomes: ${project.slug}`)
    if (project.system.length < 2) errors.push(`needs at least two system blocks: ${project.slug}`)

    for (const block of project.system) {
      if (!hasText(block.title)) errors.push(`blank system title: ${label}`)
      if (!hasText(block.detail)) errors.push(`blank system detail: ${label}`)
    }
    for (const outcome of project.outcomes) {
      if (!hasText(outcome.label)) errors.push(`blank outcome label: ${label}`)
      if (!hasText(outcome.value)) errors.push(`blank outcome value: ${label}`)
      if (!hasText(outcome.source)) errors.push(`blank outcome source: ${label}`)
    }
    for (const media of project.media) {
      if (!hasText(media.src)) errors.push(`blank media source: ${label}`)
      if (!hasText(media.alt)) errors.push(`blank media alt: ${label}`)
    }
    if (project.contributionBoundary !== undefined && !hasText(project.contributionBoundary)) {
      errors.push(`blank contribution boundary: ${label}`)
    }

    for (const [kind, value] of Object.entries(project.links)) {
      const linkLabel = `${label}.${kind}`
      if (!hasText(value)) {
        errors.push(`invalid link: ${linkLabel}`)
        continue
      }

      try {
        const url = new URL(value)
        if (url.protocol !== 'https:' || !url.hostname) {
          errors.push(`invalid link: ${linkLabel}`)
        } else if (isPlaceholderHostname(url.hostname)) {
          errors.push(`placeholder link: ${linkLabel}`)
        }
      } catch {
        errors.push(`invalid link: ${linkLabel}`)
      }
    }

    if (!isRealIsoDate(project.lastVerified)) {
      errors.push(`invalid verification date: ${label}`)
    }
  }
  return errors
}
