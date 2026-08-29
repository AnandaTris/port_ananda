'use client'

import { useEffect } from 'react'

/**
 * The stagger is bounded because it is unbounded delay, not motion, that reads
 * as a bug: an element sits at opacity 0 for the whole delay, so a thirteen-card
 * grid indexed end to end would leave its last card blank for 1.3 seconds after
 * the reader had scrolled to it.
 */
const MAX_STAGGER_INDEX = 4

/**
 * The one observer behind every entrance on the site. It renders nothing and
 * wraps nothing: the components it animates are server components, and
 * `status.test.ts` calls one of them as a plain function, so a hook cannot go
 * anywhere near them.
 *
 * Whether motion happens at all was settled in <head> before the first paint.
 * If that class is absent — reduced motion, no IntersectionObserver, no
 * JavaScript — this does nothing and the page stays as the server sent it.
 */
export function RevealRoot() {
  useEffect(() => {
    if (!document.documentElement.classList.contains('motion-ready')) return

    const observer = new IntersectionObserver(
      (entries) => {
        const arriving = entries
          .filter((entry) => entry.isIntersecting)
          // The observer makes no ordering promise, so a grid row could
          // otherwise cascade right to left, or a lower section could lead an
          // upper one.
          .sort(
            (a, b) =>
              a.boundingClientRect.top - b.boundingClientRect.top ||
              a.boundingClientRect.left - b.boundingClientRect.left,
          )

        arriving.forEach((entry, index) => {
          const element = entry.target as HTMLElement
          element.style.setProperty('--reveal-index', String(Math.min(index, MAX_STAGGER_INDEX)))
          element.classList.add('is-revealed')
          observer.unobserve(element)
        })
      },
      // Reveal slightly before the element reaches the fold, so the motion
      // finishes as it arrives rather than starting once it is already read.
      { rootMargin: '0px 0px -8% 0px', threshold: 0.05 },
    )

    for (const element of document.querySelectorAll('[data-reveal]')) {
      observer.observe(element)
    }

    return () => observer.disconnect()
  }, [])

  return null
}
