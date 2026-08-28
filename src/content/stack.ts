import type { StackGroup } from './types'

/**
 * Every tool named in a project's `stack`, sorted into buckets a reader can
 * scan. Nothing here is aspirational: an item earns its place by appearing in
 * `projects.ts`, and `stack.test.ts` fails if the two lists ever disagree, in
 * either direction. Add a tool to a project and this file has to grow with it.
 */
export const stackGroups: readonly StackGroup[] = [
  {
    name: 'Languages',
    items: ['TypeScript', 'JavaScript', 'Python', 'C', 'C#', 'Kotlin', 'Lucid HDL'],
  },
  {
    name: 'Web and mobile',
    items: [
      'Next.js',
      'React',
      'Expo',
      'React Native',
      'Vite',
      'Hono',
      'TanStack Router',
      'Reanimated',
      'PWA',
      'Workbox',
      'Web APIs',
    ],
  },
  {
    name: 'Backend and data',
    items: ['FastAPI', 'Flask', 'Node.js', 'Supabase', 'Postgres', 'SQLite', 'localStorage'],
  },
  {
    name: 'AI and ML',
    items: [
      'OpenAI',
      'Anthropic',
      'Gemini',
      'Gemini Vision',
      'Transformers.js',
      'ONNX',
      'HuBERT',
      'ElevenLabs',
    ],
  },
  {
    name: 'Testing and CI',
    items: ['Vitest', 'Jest', 'pytest', 'Playwright', 'GNU Make', 'Bash', 'GitHub Actions', 'Docker'],
  },
  {
    name: 'Product and growth',
    items: ['Stripe', 'RevenueCat', 'PostHog', 'GA4'],
  },
  {
    name: 'Platforms and hardware',
    items: [
      'Google Cloud',
      'POSIX',
      'Unity',
      'FPGA',
      'Alchitry Au',
      'Vivado',
      'Leaflet',
      'OpenStreetMap',
      'YouTube API',
      'Brave Search API',
    ],
  },
]
