'use client'

import { useSyncExternalStore } from 'react'
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

export function usePortfolioQueryState() {
  const search = useSyncExternalStore(
    subscribeToPortfolioQuery,
    getPortfolioSearch,
    getServerPortfolioSearch,
  )
  const searchParams = new URLSearchParams(search)

  const replaceState = (state: PortfolioQueryState) => {
    window.history.replaceState(window.history.state, '', buildPortfolioHref(state))
    window.dispatchEvent(new Event(portfolioQueryChange))
  }

  return {
    capability: parseCapability(searchParams.get('capability')),
    lens: parseLens(searchParams.get('lens')),
    replaceState,
  }
}
