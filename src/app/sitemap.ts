import type { MetadataRoute } from 'next'
import { projects } from '@/content/projects'
import { SITE_URL } from '@/lib/site'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: new URL('/', SITE_URL).toString(),
      lastModified: new Date('2026-08-21'),
      changeFrequency: 'monthly',
      priority: 1,
    },
    ...projects.map((project) => ({
      url: new URL(`/work/${project.slug}`, SITE_URL).toString(),
      lastModified: new Date(project.lastVerified),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
  ]
}
