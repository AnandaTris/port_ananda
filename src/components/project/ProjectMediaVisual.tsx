'use client'

import Image from 'next/image'
import { useState } from 'react'
import type { Project, ProjectStatus } from '@/content/types'

type ProjectMediaVisualProps = {
  project: Project
  variant: 'fieldbook' | 'case-study'
  priority?: boolean
}

const statusLabels: Record<ProjectStatus, string> = {
  live: 'Live product',
  'working-demo': 'Working demo',
  'source-backed': 'Source-backed',
  prototype: 'Prototype',
}

const visualClasses = {
  fieldbook: {
    diagram: 'fieldbook-visual fieldbook-diagram',
    media: 'fieldbook-visual fieldbook-media',
    sizes: '(max-width: 700px) 100vw, (max-width: 1100px) 46vw, 38vw',
  },
  'case-study': {
    diagram: 'case-study-visual case-study-diagram',
    media: 'case-study-visual case-study-media',
    sizes: '(max-width: 800px) 100vw, 58vw',
  },
} as const

export function ProjectMediaVisual({
  project,
  variant,
  priority = false,
}: ProjectMediaVisualProps) {
  const media = project.media[0]
  const [failedSource, setFailedSource] = useState<string | null>(null)
  const classes = visualClasses[variant]

  if (media && failedSource !== media.src) {
    return (
      <figure className={classes.media}>
        <Image
          alt={media.alt}
          height={media.height}
          onError={() => setFailedSource(media.src)}
          priority={priority}
          sizes={classes.sizes}
          src={media.src}
          width={media.width}
        />
        <figcaption>
          Verified project media{variant === 'case-study' ? ` · ${media.alt}` : ''}
        </figcaption>
      </figure>
    )
  }

  return (
    <div
      aria-label={`${project.name} media fallback`}
      className={`${classes.diagram} project-media-fallback`}
      role="img"
    >
      <div className="project-media-fallback-heading">
        <span>{statusLabels[project.status]}</span>
        <strong>{project.name}</strong>
      </div>
      <ol className="project-media-fallback-system">
        {project.system.map((block, index) => (
          <li key={block.title}>
            <span>{String(index + 1).padStart(2, '0')}</span>
            <strong>{block.title}</strong>
          </li>
        ))}
      </ol>
    </div>
  )
}
