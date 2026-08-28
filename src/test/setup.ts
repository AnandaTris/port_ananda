import '@testing-library/jest-dom/vitest'
import { vi } from 'vitest'

vi.mock('next/font/google', () => ({
  Instrument_Serif: () => ({ variable: '--font-display' }),
  Archivo: () => ({ variable: '--font-body' }),
}))

class IntersectionObserverStub implements IntersectionObserver {
  readonly root = null
  readonly rootMargin = ''
  readonly thresholds: readonly number[] = []
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords(): IntersectionObserverEntry[] {
    return []
  }
}

vi.stubGlobal('IntersectionObserver', IntersectionObserverStub)
