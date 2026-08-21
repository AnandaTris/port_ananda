'use client'

import { CapabilityPicker } from './CapabilityPicker'
import { FeaturedFieldbook } from './FeaturedFieldbook'
import { usePortfolioQueryState } from './portfolio-query-store'
import { LensControl } from '@/components/lens/LensControl'
import type { Capability, Lens, Project } from '@/content/types'

type PortfolioExplorerProps = {
  projects: readonly Project[]
}

export function PortfolioExplorer({ projects }: PortfolioExplorerProps) {
  const { capability, lens, replaceState } = usePortfolioQueryState()

  const handleLensChange = (nextLens: Lens) => {
    replaceState({ lens: nextLens, capability })
  }

  const handleCapabilityChange = (nextCapability: Capability | 'all') => {
    replaceState({ lens, capability: nextCapability })
  }

  return (
    <section aria-labelledby="work-title" className="explorer-featured-journey">
      <div className="explorer-capabilities">
        <p className="eyebrow">What do you need?</p>
        <h2 id="work-title">Choose a path through the work.</h2>
        <CapabilityPicker value={capability} onChange={handleCapabilityChange} />
      </div>
      <div className="explorer-lenses">
        <p className="eyebrow">Read the evidence through a lens.</p>
        <LensControl value={lens} onChange={handleLensChange} />
      </div>
      <FeaturedFieldbook capability={capability} lens={lens} projects={projects} />
    </section>
  )
}
