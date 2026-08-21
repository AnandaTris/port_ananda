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
  return source.filter((project) => {
    const capabilityMatch =
      filter.capability === 'all' || project.capabilities.includes(filter.capability)
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
    return capabilityMatch && (query === '' || haystack.includes(query))
  })
}

export function validateProjects(source: readonly Project[]): string[] {
  const errors: string[] = []
  const slugs = new Set<string>()
  for (const project of source) {
    if (slugs.has(project.slug)) errors.push(`duplicate slug: ${project.slug}`)
    slugs.add(project.slug)
    if (project.ownership.length === 0) errors.push(`missing ownership: ${project.slug}`)
    if (project.limitations.length === 0) errors.push(`missing limitation: ${project.slug}`)
    for (const url of Object.values(project.links)) {
      if (url && !url.startsWith('https://')) errors.push(`invalid link: ${project.slug}`)
    }
  }
  return errors
}
