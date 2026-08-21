'use client'

import { ProjectArchive } from './ProjectArchive'
import { usePortfolioQueryState } from './portfolio-query-store'
import type { Capability, Project } from '@/content/types'

type ProjectArchiveIslandProps = {
  projects: readonly Project[]
}

export function ProjectArchiveIsland({ projects }: ProjectArchiveIslandProps) {
  const { capability, lens, replaceState } = usePortfolioQueryState()

  const handleCapabilityChange = (nextCapability: Capability | 'all') => {
    replaceState({ lens, capability: nextCapability })
  }

  return (
    <ProjectArchive
      projects={projects}
      capability={capability}
      onCapabilityChange={handleCapabilityChange}
    />
  )
}
