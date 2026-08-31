import type { projectMarks } from './project-marks'

export type ProjectMarkName = keyof typeof projectMarks

export type Capability = 'ship' | 'responsible-ai' | 'harden' | 'grow' | 'prototype'
export type ProjectStatus = 'live' | 'working-demo' | 'source-backed' | 'prototype'

export type OutcomeItem = {
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

/**
 * A project shows its real app icon when the source repo ships one, and an
 * authored mark otherwise. The two kinds are kept apart on purpose: `icon`
 * claims to be the product's own logo and `assets.test.ts` makes it prove that,
 * while `mark` claims nothing except that this site drew a picture of what the
 * project does. Mixing them would let an invented file pass as a brand.
 */
export type ProjectLogo =
  | { kind: 'icon'; src: string; alt: string }
  | { kind: 'mark'; name: ProjectMarkName }

export type Project = {
  slug: string
  name: string
  oneLine: string
  logo: ProjectLogo
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
  outcomes: readonly OutcomeItem[]
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

/**
 * The employer's own mark, copied from that company's live site rather than
 * redrawn, and traced in `assets.ts` like every other image here. It is
 * decorative in the page: the entry prints the organization name in text
 * immediately beside the tile, so alt text would only say it twice.
 */
export type ExperienceLogo = {
  src: string
  /**
   * `icon` is a published app icon: it already carries its own background and
   * its own margin, so the tile lets it bleed to the edge. `mark` is a bare
   * logo lifted off the company's page, drawn corner to corner in its own
   * file — the tile has to give it the margin the icon version would have had,
   * or the rounded corner takes a bite out of the letterforms.
   */
  fit: 'icon' | 'mark'
}

export type ProfileExperience = {
  organization: string
  title: string
  period: string
  status: 'incoming' | 'current' | 'completed'
  logo: ExperienceLogo
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

/**
 * A named bucket of technologies. The buckets are hand-written because no
 * grouping can be derived from the project data, but they are not free to drift:
 * `stack.test.ts` asserts the buckets and the union of every `Project.stack`
 * hold exactly the same items, so a tool can neither go missing nor be invented.
 */
export type StackGroup = {
  name: string
  items: readonly string[]
}

export type Profile = {
  name: string
  location: string
  summary: string
  links: readonly ProfileLink[]
  workExperience: readonly ProfileExperience[]
  research: readonly ProfileResearchRole[]
  awards: readonly ProfileAward[]
  leadership: readonly ProfileLeadership[]
}
