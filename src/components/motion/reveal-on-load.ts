import type { CSSProperties } from 'react'

/**
 * Props for an above-the-fold element that plays its entrance from CSS alone.
 * The observer cannot drive these: it only runs after hydration, and an element
 * held at opacity 0 until then is not an LCP candidate.
 */
export function revealOnLoad(index: number) {
  return {
    'data-reveal-load': '',
    style: { '--reveal-index': index } as CSSProperties,
  }
}
