/**
 * Each excerpt is a small live piece of a project, so it links back to that
 * project's Results section. The href is the heading id `ProjectDetailPanel`
 * builds — `${slug}-results` — and has to stay in step with it.
 */
export const excerptDetails = {
  carekaki: {
    loadLabel: 'Load CareKaki Guardian interactive excerpt',
    resultsLabel: 'See CareKaki results',
    resultsHref: '#carekaki-results',
  },
  'das-dial': {
    loadLabel: 'Load DAS D.I.A.L. interactive excerpt',
    resultsLabel: 'See DAS D.I.A.L. results',
    resultsHref: '#das-dial-results',
  },
  'fix-yo-yap': {
    loadLabel: 'Load Fix Yo Yap persona card interactive excerpt',
    resultsLabel: 'See Fix Yo Yap results',
    resultsHref: '#fix-yo-yap-results',
  },
} as const

export type ApprovedExcerptSlug = keyof typeof excerptDetails

export function isApprovedExcerptSlug(slug: string): slug is ApprovedExcerptSlug {
  return Object.hasOwn(excerptDetails, slug)
}
