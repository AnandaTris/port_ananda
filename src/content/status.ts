import type { ProjectStatus } from './types'

export type StatusTone = 'jade' | 'cyan' | 'coral' | 'sunshine'

/**
 * One vocabulary for project maturity, declared once.
 *
 * It used to be declared four times — the index card, the case-study hero, the
 * results panel, and the media fallback — in three different spellings, which
 * is how "Live" and "Live product" ended up labelling the same state on two
 * pages of the same site.
 *
 * The words now say where a thing stands. "Source-backed" was an evidence
 * claim wearing a status label's clothes, and it left every unreleased project
 * described by how it could be checked rather than by whether it was finished.
 * The evidence did not go anywhere: it lives in each project's `outcomes`,
 * where every line still names the source it came from.
 */
export const statusDetails: Record<ProjectStatus, { label: string; tone: StatusTone }> = {
  /** Released and reachable by anyone, right now. */
  live: { label: 'Shipped', tone: 'jade' },
  /** Deployed and usable, still being built out. */
  'working-demo': { label: 'In development', tone: 'sunshine' },
  /** Finished in its repository, never released as a product. */
  'source-backed': { label: 'Completed', tone: 'cyan' },
  /** An early build that deliberately stops short of what it is aiming at. */
  prototype: { label: 'Prototype', tone: 'coral' },
}

export const statusLabels: Record<ProjectStatus, string> = Object.fromEntries(
  Object.entries(statusDetails).map(([status, detail]) => [status, detail.label]),
) as Record<ProjectStatus, string>
