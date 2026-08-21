'use client'

import { useSyncExternalStore } from 'react'
import { CapabilityPicker } from './CapabilityPicker'
import { FeaturedFieldbook } from './FeaturedFieldbook'
import { ProjectArchive } from './ProjectArchive'
import {
  ContactSection,
  ExperienceAndCredentials,
  OperatingPrinciples,
  ProfessionalProductWork,
} from './ProfileSections'
import { LensControl } from '@/components/lens/LensControl'
import { projects } from '@/content/projects'
import type { Capability, Lens } from '@/content/types'
import {
  buildPortfolioHref,
  parseCapability,
  parseLens,
  type PortfolioQueryState,
} from '@/lib/portfolio-query'

const portfolioQueryChange = 'portfolio-query-change'

function subscribeToPortfolioQuery(onStoreChange: () => void) {
  window.addEventListener('popstate', onStoreChange)
  window.addEventListener(portfolioQueryChange, onStoreChange)
  return () => {
    window.removeEventListener('popstate', onStoreChange)
    window.removeEventListener(portfolioQueryChange, onStoreChange)
  }
}

function getPortfolioSearch() {
  return window.location.search
}

function getServerPortfolioSearch() {
  return ''
}

export function PortfolioExplorer() {
  const search = useSyncExternalStore(
    subscribeToPortfolioQuery,
    getPortfolioSearch,
    getServerPortfolioSearch,
  )
  const searchParams = new URLSearchParams(search)
  const lens = parseLens(searchParams.get('lens'))
  const capability = parseCapability(searchParams.get('capability'))

  const replaceState = (state: PortfolioQueryState) => {
    window.history.replaceState(window.history.state, '', buildPortfolioHref(state))
    window.dispatchEvent(new Event(portfolioQueryChange))
  }

  const handleLensChange = (nextLens: Lens) => {
    replaceState({ lens: nextLens, capability })
  }

  const handleCapabilityChange = (nextCapability: Capability | 'all') => {
    replaceState({ lens, capability: nextCapability })
  }

  return (
    <div className="portfolio-explorer" id="work">
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
        <FeaturedFieldbook capability={capability} lens={lens} />
      </section>
      <OperatingPrinciples />
      <ProfessionalProductWork />
      <ProjectArchive
        projects={projects}
        capability={capability}
        onCapabilityChange={handleCapabilityChange}
      />
      <ExperienceAndCredentials />
      <ContactSection />
    </div>
  )
}
