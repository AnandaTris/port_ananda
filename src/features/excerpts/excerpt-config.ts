export const excerptDetails = {
  carekaki: {
    loadLabel: 'Load CareKaki Guardian interactive excerpt',
    evidenceLabel: 'See full CareKaki evidence and proof',
    evidenceHref: '#carekaki-proof-full',
  },
  'das-dial': {
    loadLabel: 'Load DAS D.I.A.L. interactive excerpt',
    evidenceLabel: 'See full DAS D.I.A.L. evidence and proof',
    evidenceHref: '#das-dial-proof-full',
  },
  cited: {
    loadLabel: 'Load Cited visibility score interactive excerpt',
    evidenceLabel: 'See full Cited evidence and proof',
    evidenceHref: '#cited-proof-full',
  },
  'fix-yo-yap': {
    loadLabel: 'Load Fix Yo Yap persona card interactive excerpt',
    evidenceLabel: 'See full Fix Yo Yap evidence and proof',
    evidenceHref: '#fix-yo-yap-proof-full',
  },
} as const

export type ApprovedExcerptSlug = keyof typeof excerptDetails

export function isApprovedExcerptSlug(slug: string): slug is ApprovedExcerptSlug {
  return Object.hasOwn(excerptDetails, slug)
}
