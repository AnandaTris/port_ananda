'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { CapabilityPicker } from './CapabilityPicker'
import { LensControl } from '@/components/lens/LensControl'
import type { Capability, Lens } from '@/content/types'
import {
  buildPortfolioHref,
  parseCapability,
  parseLens,
  type PortfolioQueryState,
} from '@/lib/portfolio-query'

function withCurrentPath(pathname: string | null, state: PortfolioQueryState): string {
  const href = buildPortfolioHref(state)
  if (!pathname || pathname === '/') {
    return href
  }
  return `${pathname}${href.slice(1)}`
}

export function PortfolioExplorer() {
  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()
  const lens = parseLens(searchParams.get('lens'))
  const capability = parseCapability(searchParams.get('capability'))

  const replaceState = (state: PortfolioQueryState) => {
    router.replace(withCurrentPath(pathname, state), { scroll: false })
  }

  const handleLensChange = (nextLens: Lens) => {
    replaceState({ lens: nextLens, capability })
  }

  const handleCapabilityChange = (nextCapability: Capability) => {
    replaceState({ lens, capability: nextCapability })
  }

  return (
    <section aria-labelledby="work-title" id="work">
      <div>
        <p>What do you need?</p>
        <h2 id="work-title">Choose a path through the work.</h2>
        <CapabilityPicker value={capability} onChange={handleCapabilityChange} />
      </div>
      <div>
        <p>Read the evidence through a lens.</p>
        <LensControl value={lens} onChange={handleLensChange} />
      </div>
    </section>
  )
}
