import { DeferredExcerpt } from './DeferredExcerpt'
import { isApprovedExcerptSlug } from './excerpt-config'

type ExcerptRegistryProps = {
  slug: string
}

export function ExcerptRegistry({ slug }: ExcerptRegistryProps) {
  return isApprovedExcerptSlug(slug) ? <DeferredExcerpt slug={slug} /> : null
}
