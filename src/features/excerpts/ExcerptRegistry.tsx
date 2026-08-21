import { CitedExcerpt } from './CitedExcerpt'
import { DialExcerpt } from './DialExcerpt'
import { GuardianExcerpt } from './GuardianExcerpt'
import { YapExcerpt } from './YapExcerpt'

type ExcerptRegistryProps = {
  slug: string
}

export function ExcerptRegistry({ slug }: ExcerptRegistryProps) {
  if (slug === 'carekaki') return <GuardianExcerpt />
  if (slug === 'das-dial') return <DialExcerpt />
  if (slug === 'cited') return <CitedExcerpt />
  if (slug === 'fix-yo-yap') return <YapExcerpt />
  return null
}
