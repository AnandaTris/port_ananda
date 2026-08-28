'use client'

import Image from 'next/image'
import { useState } from 'react'
import type { Project, ProjectStatus } from '@/content/types'

type ProjectMediaVisualProps = {
  project: Project
  priority?: boolean
}

const statusLabels: Record<ProjectStatus, string> = {
  live: 'Live product',
  'working-demo': 'Working demo',
  'source-backed': 'Source-backed',
  prototype: 'Prototype',
}

const IMAGE_SIZES = '(max-width: 800px) 100vw, 58vw'

export function ProjectMediaVisual({ project, priority = false }: ProjectMediaVisualProps) {
  const [failedSources, setFailedSources] = useState<readonly string[]>([])
  const visibleMedia = project.media.filter((item) => !failedSources.includes(item.src))

  if (visibleMedia.length > 0) {
    return (
      <figure className="case-study-visual case-study-media" data-count={visibleMedia.length}>
        {visibleMedia.map((item, index) => (
          <Image
            alt={item.alt}
            height={item.height}
            key={item.src}
            onError={() => setFailedSources((sources) => [...sources, item.src])}
            priority={priority && index === 0}
            sizes={IMAGE_SIZES}
            src={item.src}
            width={item.width}
          />
        ))}
        <figcaption>{visibleMedia.map((item) => item.alt).join(' · ')}</figcaption>
      </figure>
    )
  }

  return (
    <div
      aria-label={`${project.name} media fallback`}
      className="case-study-visual case-study-diagram project-media-fallback"
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
