import type { Capability, Lens } from '@/content/types'

const lenses: readonly Lens[] = ['story', 'system', 'proof']
const capabilities: readonly Capability[] = [
  'ship',
  'responsible-ai',
  'harden',
  'grow',
  'prototype',
]

export type PortfolioQueryState = {
  lens: Lens
  capability: Capability | 'all'
}

export function parseLens(value: string | null | undefined): Lens {
  return lenses.includes(value as Lens) ? (value as Lens) : 'story'
}

export function parseCapability(value: string | null | undefined): Capability | 'all' {
  return capabilities.includes(value as Capability) ? (value as Capability) : 'all'
}

export function buildPortfolioHref(state: PortfolioQueryState): string {
  const params = new URLSearchParams()
  params.set('lens', state.lens)
  if (state.capability !== 'all') {
    params.set('capability', state.capability)
  }
  return `/?${params.toString()}#work`
}
