export type Lens = 'story' | 'system' | 'proof'
export type Capability = 'ship' | 'responsible-ai' | 'harden' | 'grow' | 'prototype'
export type ProjectStatus = 'live' | 'working-demo' | 'source-backed' | 'prototype'

export type EvidenceItem = {
  label: string
  value: string
  source: 'live' | 'test' | 'git' | 'award' | 'documented'
}

export type SystemBlock = {
  title: string
  detail: string
}

export type MediaItem = {
  src: string
  alt: string
  width: number
  height: number
}

export type Project = {
  slug: string
  name: string
  oneLine: string
  status: ProjectStatus
  featured: boolean
  accent: 'coral' | 'cyan' | 'sunshine' | 'jade' | 'violet'
  capabilities: readonly Capability[]
  role: string
  teamSize?: number
  ownership: readonly string[]
  contributionBoundary?: string
  problem: string
  hardDecision: string
  system: readonly SystemBlock[]
  outcomes: readonly EvidenceItem[]
  limitations: readonly string[]
  stack: readonly string[]
  links: { live?: string; appStore?: string; source?: string }
  media: readonly MediaItem[]
  lastVerified: string
}

export type ProfileLink = {
  label: 'Email' | 'LinkedIn' | 'GitHub'
  href: string
}

export type ProfileExperience = {
  organization: string
  title: string
  period: string
  status: 'incoming' | 'current' | 'completed'
  highlights: readonly string[]
}

export type ProfileResearchRole = {
  organization: string
  title: string
  period: string
  highlights: readonly string[]
}

export type ProfileAward = {
  name: string
  detail: string
  date?: string
}

export type ProfileLeadership = {
  organization: string
  title: string
  period: string
  highlights: readonly string[]
}

export type Profile = {
  name: string
  hero: string
  supportingLine: string
  collaborationLine: string
  principles: readonly string[]
  links: readonly ProfileLink[]
  workExperience: readonly ProfileExperience[]
  research: readonly ProfileResearchRole[]
  awards: readonly ProfileAward[]
  leadership: readonly ProfileLeadership[]
}
