'use client'

import { useCallback, useEffect, useRef, useState, type ComponentType } from 'react'
import { excerptDetails, type ApprovedExcerptSlug } from './excerpt-config'

type ExcerptModule = { default: ComponentType }

const excerptLoaders: Record<ApprovedExcerptSlug, () => Promise<ExcerptModule>> = {
  carekaki: () =>
    import('./GuardianExcerpt').then(({ GuardianExcerpt }) => ({ default: GuardianExcerpt })),
  'das-dial': () => import('./DialExcerpt').then(({ DialExcerpt }) => ({ default: DialExcerpt })),
  'fix-yo-yap': () => import('./YapExcerpt').then(({ YapExcerpt }) => ({ default: YapExcerpt })),
}

export function DeferredExcerpt({ slug }: { slug: ApprovedExcerptSlug }) {
  const [Excerpt, setExcerpt] = useState<ComponentType | null>(null)
  const [hasRequestedLoad, setHasRequestedLoad] = useState(false)
  const [loadAttempt, setLoadAttempt] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [hasLoadError, setHasLoadError] = useState(false)
  const containerRef = useRef<HTMLElement>(null)
  const details = excerptDetails[slug]

  const requestLoad = useCallback(() => {
    setHasLoadError(false)
    setIsLoading(true)
    setHasRequestedLoad(true)
    setLoadAttempt((attempt) => attempt + 1)
  }, [])

  useEffect(() => {
    if (!hasRequestedLoad || Excerpt) return

    let isCurrent = true

    void excerptLoaders[slug]()
      .then((module) => {
        if (isCurrent) setExcerpt(() => module.default)
      })
      .catch(() => {
        if (isCurrent) setHasLoadError(true)
      })
      .finally(() => {
        if (isCurrent) setIsLoading(false)
      })

    return () => {
      isCurrent = false
    }
  }, [Excerpt, hasRequestedLoad, loadAttempt, slug])

  useEffect(() => {
    const container = containerRef.current
    if (!container || hasRequestedLoad || typeof IntersectionObserver === 'undefined') return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          observer.disconnect()
          requestLoad()
        }
      },
      { rootMargin: '320px 0px' },
    )

    observer.observe(container)
    return () => observer.disconnect()
  }, [hasRequestedLoad, requestLoad])

  if (Excerpt) return <Excerpt />

  return (
    <section
      aria-busy={isLoading || undefined}
      aria-labelledby={`${slug}-excerpt-load-title`}
      className="interactive-excerpt interactive-excerpt-deferred"
      data-reveal
      ref={containerRef}
    >
      <header className="interactive-excerpt-heading">
        <p className="eyebrow">Interactive excerpt</p>
        <h2 id={`${slug}-excerpt-load-title`}>Try the local demonstration</h2>
        <p>Load this simplified local excerpt when you are ready to explore it.</p>
      </header>

      <div className="excerpt-deferred-actions">
        <button className="excerpt-load" disabled={isLoading} onClick={requestLoad} type="button">
          {isLoading ? 'Loading interactive excerpt…' : details.loadLabel}
        </button>
        <a className="text-link excerpt-results-link" href={details.resultsHref}>
          {details.resultsLabel}
        </a>
      </div>

      {hasLoadError ? (
        <p className="excerpt-load-error" role="alert">
          The local excerpt could not load. Use the button to try again.
        </p>
      ) : null}
    </section>
  )
}
