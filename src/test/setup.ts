import '@testing-library/jest-dom/vitest'
import { vi } from 'vitest'

vi.mock('next/font/google', () => ({
  IBM_Plex_Mono: () => ({ variable: '--font-ibm-plex-mono' }),
  Instrument_Sans: () => ({ variable: '--font-instrument-sans' }),
  Space_Grotesk: () => ({ variable: '--font-space-grotesk' }),
}))
