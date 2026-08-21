# Evidence Fieldbook Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a bright, responsive portfolio that presents Ananda’s verified work through Story / System / Proof lenses, deterministic interactive excerpts, and a collaboration-focused journey.

**Architecture:** Use a statically generated Next.js App Router site with typed local project content and no runtime credentials. Client-side state is limited to URL-backed lenses, capability/archive filters, and four deterministic excerpts; project routes and most page content remain server-rendered.

**Tech Stack:** Node 22+, Next.js 16.2.12, React 19.2.4, TypeScript 5, Tailwind CSS 4, Motion, Vitest 4, React Testing Library, ESLint 9, gstack browse

**Spec:** `docs/superpowers/specs/2026-08-21-portfolio-design.md`

## Global Constraints

- Use the Evidence Fieldbook direction and the exact color tokens from spec section 4.
- The hero thesis is: “I build AI products people can understand, trust, and use.”
- The primary CTA text is “Build something together” and opens a mailto for `adotriharis@gmail.com`.
- The only public personal links are email, `https://www.linkedin.com/in/ananda-trimar/`, and `https://github.com/AnandaTris`.
- Do not publish a phone number, GPA, academic transcript, or sensitive identifier.
- Do not include ChordGrab / ChordSnap, DocDeck, Pufferty Fish Robot, Meowtivation Task Manager, or the energy-regression project.
- Do not include course sites, prior portfolios, coding practice, starter labs, generic templates, forks, leaked tooling, content-only folders, or learner-data-only repositories.
- Every team project must state Ananda’s contribution boundary and must not imply sole ownership.
- Render external buttons only for verified URLs stored in typed project data.
- Every project must expose status, role, ownership, limitations, and `lastVerified`.
- Interactive excerpts run locally, make no network requests, and are explicitly labelled “Interactive excerpt.”
- Respect `prefers-reduced-motion`; do not add a custom cursor, scroll hijacking, or continuous ambient animation.
- Keep files focused: content, filtering, lens state, excerpts, and visual sections have separate modules.
- Every commit uses conventional-commit format and one subject line.

---

## File map

### Configuration and application shell

- `package.json`: scripts and pinned runtime packages
- `package-lock.json`: resolved dependency graph
- `tsconfig.json`: strict TypeScript configuration
- `next.config.ts`: image and build configuration
- `postcss.config.mjs`: Tailwind PostCSS plugin
- `eslint.config.mjs`: Next.js lint rules
- `vitest.config.ts`: jsdom test environment
- `src/test/setup.ts`: Testing Library matchers and browser API shims
- `src/app/layout.tsx`: fonts, metadata defaults, page frame
- `src/app/globals.css`: tokens, typography, focus, motion, and responsive primitives
- `src/app/page.tsx`: home-page composition

### Domain content

- `src/content/types.ts`: `Project`, `Lens`, `Capability`, and evidence types
- `src/content/projects.ts`: the complete approved project roster
- `src/content/profile.ts`: hero, experience, awards, principles, and contact data
- `src/content/assets.ts`: asset provenance records
- `src/lib/projects.ts`: lookup, validation, sorting, and filter functions
- `src/lib/projects.test.ts`: content integrity and filter tests

### Shared UI and navigation

- `src/components/shell/SiteHeader.tsx`: sticky navigation and mobile menu
- `src/components/shell/SiteFooter.tsx`: public links and closing CTA
- `src/components/ui/ExternalLink.tsx`: safe external-link treatment
- `src/components/ui/StatusBadge.tsx`: text-and-color maturity state
- `src/components/ui/SectionHeading.tsx`: consistent editorial headings
- `src/components/home/Hero.tsx`: thesis, proof strip, and CTAs
- `src/components/home/PortfolioExplorer.tsx`: URL-backed lens and capability state
- `src/components/home/CapabilityPicker.tsx`: five collaboration-intent controls
- `src/components/home/FeaturedFieldbook.tsx`: featured project sequence
- `src/components/home/ProjectArchive.tsx`: complete searchable/filterable archive
- `src/components/home/ProfileSections.tsx`: principles, experience, awards, leadership, contact

### Lenses and project routes

- `src/components/lens/LensControl.tsx`: Story / System / Proof control
- `src/components/lens/ProjectLensPanel.tsx`: semantic rendering for each lens
- `src/lib/portfolio-query.ts`: query parsing and URL building
- `src/lib/portfolio-query.test.ts`: query behavior tests
- `src/app/work/[slug]/page.tsx`: statically generated project case study
- `src/app/work/[slug]/not-found.tsx`: project-level missing state
- `src/app/not-found.tsx`: global missing state

### Interactive excerpts

- `src/features/excerpts/guardian.ts`: deterministic redaction and approval rules
- `src/features/excerpts/guardian.test.ts`: redaction tests
- `src/features/excerpts/GuardianExcerpt.tsx`: CareKaki excerpt
- `src/features/excerpts/dial.ts`: fixed NLP pipeline examples
- `src/features/excerpts/dial.test.ts`: example and disclaimer tests
- `src/features/excerpts/DialExcerpt.tsx`: DAS D.I.A.L. stepper
- `src/features/excerpts/cited.ts`: published visibility-score calculation
- `src/features/excerpts/cited.test.ts`: scoring tests
- `src/features/excerpts/CitedExcerpt.tsx`: Cited calculator
- `src/features/excerpts/yap.ts`: fixed persona assignment
- `src/features/excerpts/yap.test.ts`: persona-boundary tests
- `src/features/excerpts/YapExcerpt.tsx`: Fix Yo Yap sample interaction
- `src/features/excerpts/ExcerptRegistry.tsx`: slug-to-excerpt mapping

### Assets and metadata

- `public/projects/`: copied, provenance-tracked project media
- `src/app/sitemap.ts`: generated public routes
- `src/app/robots.ts`: crawl policy
- `src/app/opengraph-image.tsx`: generated share card
- `README.md`: local commands, content rules, and verification workflow

---

### Task 1: Create the tested Next.js foundation

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `next-env.d.ts`
- Create: `next.config.ts`
- Create: `postcss.config.mjs`
- Create: `eslint.config.mjs`
- Create: `vitest.config.ts`
- Create: `src/test/setup.ts`
- Create: `src/app/layout.test.tsx`
- Create: `src/app/layout.tsx`
- Create: `src/app/page.tsx`
- Create: `src/app/globals.css`

**Interfaces:**
- Consumes: the Node 22+ runtime and the approved spec
- Produces: `npm run dev`, `build`, `lint`, `typecheck`, and `test`; root layout metadata; global CSS tokens used by all later tasks

- [ ] **Step 1: Create package and tool configuration**

Create `package.json` with these scripts and dependencies:

```json
{
  "name": "ananda-evidence-fieldbook",
  "version": "0.1.0",
  "private": true,
  "engines": { "node": ">=22" },
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint .",
    "typecheck": "tsc --noEmit",
    "test": "vitest run",
    "test:watch": "vitest"
  },
  "dependencies": {
    "motion": "^12.23.24",
    "next": "16.2.12",
    "react": "19.2.4",
    "react-dom": "19.2.4"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "^4.1.14",
    "@testing-library/jest-dom": "^6.9.1",
    "@testing-library/react": "^16.3.0",
    "@types/node": "^22.18.6",
    "@types/react": "^19.1.16",
    "@types/react-dom": "^19.1.9",
    "eslint": "^9.36.0",
    "eslint-config-next": "16.2.12",
    "jsdom": "^27.0.0",
    "tailwindcss": "^4.1.14",
    "typescript": "^5.9.2",
    "vitest": "^4.0.0"
  }
}
```

Configure strict TypeScript with the `@/*` alias to `./src/*`, use `@tailwindcss/postcss` in PostCSS, extend the Next core-web-vitals and TypeScript flat configs, and set Vitest to `environment: 'jsdom'` with `setupFiles: ['./src/test/setup.ts']`.

- [ ] **Step 2: Install the dependency graph**

Run: `npm install`

Expected: `package-lock.json` is created and `npm ls --depth=0` exits successfully.

- [ ] **Step 3: Write the failing root-layout test**

```tsx
import { render, screen } from '@testing-library/react'
import RootLayout, { metadata } from './layout'

test('publishes the portfolio identity', () => {
  render(<RootLayout><main>Portfolio body</main></RootLayout>)
  expect(screen.getByText('Portfolio body')).toBeInTheDocument()
  expect(metadata.title).toEqual({
    default: 'Ananda Triharis Maroso — AI Product Builder',
    template: '%s — Ananda Triharis Maroso',
  })
})
```

- [ ] **Step 4: Run the test and confirm the missing layout fails**

Run: `npm test -- src/app/layout.test.tsx`

Expected: FAIL because `src/app/layout.tsx` does not exist.

- [ ] **Step 5: Implement the minimum shell and tokens**

Use `next/font/google` for Space Grotesk, Instrument Sans, and IBM Plex Mono. Export the exact metadata title from Step 3. In `globals.css`, define the spec colors as `--paper`, `--white`, `--ink`, `--muted-ink`, `--volt`, `--coral`, `--cyan`, `--sunshine`, `--jade`, and `--violet`; add `color-scheme: light`, visible `:focus-visible`, and a reduced-motion block that removes animation and smooth scrolling.

Render a temporary home `<main id="main-content">Evidence Fieldbook</main>` so the application has a valid route.

- [ ] **Step 6: Run all foundation checks**

Run: `npm test -- src/app/layout.test.tsx && npm run typecheck && npm run lint && npm run build`

Expected: all commands pass and Next reports a generated `/` route.

- [ ] **Step 7: Commit the foundation**

```bash
git add package.json package-lock.json tsconfig.json next-env.d.ts next.config.ts postcss.config.mjs eslint.config.mjs vitest.config.ts src
git commit -m "build: create portfolio foundation"
```

---

### Task 2: Encode and validate the complete project content

**Files:**
- Create: `src/content/types.ts`
- Create: `src/content/projects.ts`
- Create: `src/content/profile.ts`
- Create: `src/lib/projects.ts`
- Create: `src/lib/projects.test.ts`

**Interfaces:**
- Consumes: no UI code
- Produces: `projects: readonly Project[]`, `profile`, `getProject(slug)`, `filterProjects(projects, filter)`, `validateProjects(projects)`, and all shared domain types

- [ ] **Step 1: Write failing integrity tests**

```ts
import { projects } from '@/content/projects'
import { filterProjects, getProject, validateProjects } from './projects'

test('contains only the approved roster with unique slugs', () => {
  expect(validateProjects(projects)).toEqual([])
  expect(projects).toHaveLength(17)
  expect(new Set(projects.map((project) => project.slug)).size).toBe(17)
})

test('keeps excluded work out of the content layer', () => {
  const names = projects.map((project) => project.name).join(' ')
  expect(names).not.toMatch(/ChordGrab|DocDeck|Pufferty|Meowtivation|Regression/i)
})

test('resolves verified Ingatik links', () => {
  expect(getProject('ingatik-recall')?.links).toEqual({
    live: 'https://ingatikrecall.com',
    appStore: 'https://apps.apple.com/us/app/ingatik-recall/id6788639514',
  })
})

test('filters by capability without hiding the archive source', () => {
  const result = filterProjects(projects, { capability: 'responsible-ai', query: '' })
  expect(result.map((project) => project.slug)).toEqual(
    expect.arrayContaining(['carekaki', 'das-dial', 'cited'])
  )
})
```

- [ ] **Step 2: Run tests and confirm missing modules fail**

Run: `npm test -- src/lib/projects.test.ts`

Expected: FAIL because the content modules do not exist.

- [ ] **Step 3: Define the domain interfaces**

```ts
export type Lens = 'story' | 'system' | 'proof'
export type Capability = 'ship' | 'responsible-ai' | 'harden' | 'grow' | 'prototype'
export type ProjectStatus = 'live' | 'working-demo' | 'source-backed' | 'prototype'

export type EvidenceItem = {
  label: string
  value: string
  source: 'live' | 'test' | 'git' | 'award' | 'documented'
}

export type SystemBlock = {
  title: string
  detail: string
}

export type MediaItem = {
  src: string
  alt: string
  width: number
  height: number
}

export type Project = {
  slug: string
  name: string
  oneLine: string
  status: ProjectStatus
  featured: boolean
  accent: 'coral' | 'cyan' | 'sunshine' | 'jade' | 'violet'
  capabilities: readonly Capability[]
  role: string
  teamSize?: number
  ownership: readonly string[]
  contributionBoundary?: string
  problem: string
  hardDecision: string
  system: readonly SystemBlock[]
  outcomes: readonly EvidenceItem[]
  limitations: readonly string[]
  stack: readonly string[]
  links: { live?: string; appStore?: string; source?: string }
  media: readonly MediaItem[]
  lastVerified: string
}
```

- [ ] **Step 4: Encode the exact approved roster**

Create 17 entries, using 21 August 2026 as `lastVerified` and the spec’s contribution boundaries:

| Slug | Featured | Status | Verified outbound links |
|---|---|---|---|
| `fix-yo-yap` | yes | live | App Store `id6797952951`, `https://fixyoyap.com` |
| `carekaki` | yes | working-demo | GitHub `stormragemc/CareKaki-repo` |
| `das-dial` | yes | source-backed | GitHub `AnandaTris/dyslexia-screener` |
| `false-positive` | yes | source-backed | GitHub `stormragemc/FALSE-POSITIVE` |
| `cited` | yes | working-demo | GitHub `AnandaTris/cited` |
| `brawnix` | no | live | App Store `id6790144862`, `https://brawnix-web.vercel.app` |
| `ingatik-recall` | no | live | App Store `id6788639514`, `https://ingatikrecall.com` |
| `fames` | no | source-backed | GitHub `zektron001/Fames.com` |
| `hypecast` | no | prototype | no link |
| `steady` | no | source-backed | GitHub `AnandaTris/steady` |
| `rekap` | no | prototype | no link |
| `spike-responder` | no | prototype | no link |
| `math-me-home` | no | source-backed | no public link |
| `onesearch` | no | source-backed | no link until deployment is verified |
| `aegis` | no | source-backed | GitHub `AnandaTris/Illinois-ARCS-Take-Home-Assessment` |
| `hydrun` | no | source-backed | GitHub `GiorgioRPo/HydrunFrontend` |
| `personal-workout-tracker` | no | source-backed | GitHub `AnandaTris/Personal-Workout-Tracker` |

Each object must include a human problem, one hard decision, at least two system blocks, one outcome, one limitation, role, ownership, stack, and capability tags. Use the copy and attribution rules in spec section 8; do not introduce claims absent from the spec or source README.

Create `profile` with the approved hero, supporting line, five principles, public links, work experience, research roles, awards, and SENTRE leadership from `MASTER_CV.md`. Mark Marsh as incoming and omit GPA and phone.

- [ ] **Step 5: Implement validation and filtering**

```ts
export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug)
}

export function filterProjects(
  source: readonly Project[],
  filter: { capability: Capability | 'all'; query: string }
): Project[] {
  const query = filter.query.trim().toLocaleLowerCase()
  return source.filter((project) => {
    const capabilityMatch = filter.capability === 'all' || project.capabilities.includes(filter.capability)
    const haystack = [project.name, project.oneLine, project.role, ...project.stack].join(' ').toLocaleLowerCase()
    return capabilityMatch && (query === '' || haystack.includes(query))
  })
}

export function validateProjects(source: readonly Project[]): string[] {
  const errors: string[] = []
  const slugs = new Set<string>()
  for (const project of source) {
    if (slugs.has(project.slug)) errors.push(`duplicate slug: ${project.slug}`)
    slugs.add(project.slug)
    if (project.ownership.length === 0) errors.push(`missing ownership: ${project.slug}`)
    if (project.limitations.length === 0) errors.push(`missing limitation: ${project.slug}`)
    for (const url of Object.values(project.links)) {
      if (url && !url.startsWith('https://')) errors.push(`invalid link: ${project.slug}`)
    }
  }
  return errors
}
```

- [ ] **Step 6: Run integrity checks**

Run: `npm test -- src/lib/projects.test.ts && npm run typecheck`

Expected: all content tests pass with 17 entries.

- [ ] **Step 7: Commit the content model**

```bash
git add src/content src/lib/projects.ts src/lib/projects.test.ts
git commit -m "feat: add verified portfolio content"
```

---

### Task 3: Import project media with provenance

**Files:**
- Create: `public/projects/fix-yo-yap/meet-your-yapper.png`
- Create: `public/projects/fix-yo-yap/proof-not-vibes.png`
- Create: `public/projects/fix-yo-yap/progress.png`
- Create: `public/projects/ingatik/whizzy-celebrating.png`
- Create: `public/projects/brawnix/feature-graphic.png`
- Create: `public/projects/false-positive/interrogation-room.webp`
- Create: `public/projects/false-positive/detective-silhouette.webp`
- Create: `public/projects/rekap/feature-graphic.png`
- Create: `public/projects/math-me-home/fsm.png`
- Create: `public/projects/math-me-home/datapath.png`
- Create: `public/projects/aegis/login.png`
- Create: `public/projects/personal-workout-tracker/hero.png`
- Create: `public/projects/steady/ollie-cheer.png`
- Create: `src/content/assets.ts`
- Create: `src/content/assets.test.ts`
- Modify: `src/content/projects.ts`

**Interfaces:**
- Consumes: `MediaItem` and project slugs from Task 2
- Produces: local `/projects/...` media paths and `assetProvenance` records

- [ ] **Step 1: Write a failing provenance test**

```ts
import { existsSync } from 'node:fs'
import { join } from 'node:path'
import { assetProvenance } from './assets'

test('tracks every imported public asset', () => {
  expect(assetProvenance.length).toBe(13)
  for (const asset of assetProvenance) {
    expect(existsSync(join(process.cwd(), 'public', asset.publicPath))).toBe(true)
    expect(asset.sourcePath.startsWith('/Users/anandatriharismaroso/dev/')).toBe(true)
  }
})
```

- [ ] **Step 2: Run the provenance test and confirm it fails**

Run: `npm test -- src/content/assets.test.ts`

Expected: FAIL because the asset module and copied files do not exist.

- [ ] **Step 3: Copy only the approved source assets**

Use explicit source and destination paths; do not scan or copy parent directories:

```bash
mkdir -p public/projects/{fix-yo-yap,ingatik,brawnix,false-positive,rekap,math-me-home,aegis,personal-workout-tracker,steady}
cp "/Users/anandatriharismaroso/dev/8x_Internship/yap/apps/mobile/store-assets/ios/en-US/final/01-meet-your-yapper.png" public/projects/fix-yo-yap/meet-your-yapper.png
cp "/Users/anandatriharismaroso/dev/8x_Internship/yap/apps/mobile/store-assets/ios/en-US/final/03-proof-not-vibes.png" public/projects/fix-yo-yap/proof-not-vibes.png
cp "/Users/anandatriharismaroso/dev/8x_Internship/yap/apps/mobile/store-assets/ios/en-US/final/05-watch-your-yap-improve.png" public/projects/fix-yo-yap/progress.png
cp "/Users/anandatriharismaroso/dev/8x_Internship/ingatik/assets/social/whizzy-celebrating.png" public/projects/ingatik/whizzy-celebrating.png
cp "/Users/anandatriharismaroso/dev/8x_Internship/Brawnix/apps/mobile/store/feature-graphic.png" public/projects/brawnix/feature-graphic.png
cp "/Users/anandatriharismaroso/dev/FALSE-POSITIVE/Sidecar/web/images/interrogation-room.webp" public/projects/false-positive/interrogation-room.webp
cp "/Users/anandatriharismaroso/dev/FALSE-POSITIVE/Sidecar/web/images/detective-silhouette.webp" public/projects/false-positive/detective-silhouette.webp
cp "/Users/anandatriharismaroso/dev/rekap/store/play-feature-graphic.png" public/projects/rekap/feature-graphic.png
cp "/Users/anandatriharismaroso/dev/ALU_1D_CHECKOFF_1/docs/fsm.png" public/projects/math-me-home/fsm.png
cp "/Users/anandatriharismaroso/dev/ALU_1D_CHECKOFF_1/docs/datapath.png" public/projects/math-me-home/datapath.png
cp "/Users/anandatriharismaroso/dev/Illinois-ARCS-Take-Home-Assessment/docs/screenshots/login.png" public/projects/aegis/login.png
cp "/Users/anandatriharismaroso/dev/Personal Workout Tracker/src/assets/hero.png" public/projects/personal-workout-tracker/hero.png
cp "/Users/anandatriharismaroso/dev/steady/public/mascot/ollie-cheer.png" public/projects/steady/ollie-cheer.png
```

- [ ] **Step 4: Record provenance and media metadata**

Define:

```ts
export type AssetProvenance = {
  publicPath: string
  sourcePath: string
  project: string
  description: string
}

export const assetProvenance: readonly AssetProvenance[] = [
  {
    publicPath: 'projects/fix-yo-yap/meet-your-yapper.png',
    sourcePath: '/Users/anandatriharismaroso/dev/8x_Internship/yap/apps/mobile/store-assets/ios/en-US/final/01-meet-your-yapper.png',
    project: 'fix-yo-yap',
    description: 'Published App Store screenshot',
  },
]
```

Add the other 12 copied files with their exact source paths from Step 3. Update each corresponding project’s `media` array with public paths, descriptive alt text, and actual image dimensions obtained with `sips -g pixelWidth -g pixelHeight <file>`.

- [ ] **Step 5: Run asset and content checks**

Run: `npm test -- src/content/assets.test.ts src/lib/projects.test.ts && npm run typecheck`

Expected: both suites pass and every media path exists.

- [ ] **Step 6: Commit imported media**

```bash
git add public/projects src/content/assets.ts src/content/assets.test.ts src/content/projects.ts
git commit -m "feat: add verified project media"
```

---

### Task 4: Build the bright editorial shell and hero

**Files:**
- Create: `src/components/shell/SiteHeader.tsx`
- Create: `src/components/shell/SiteFooter.tsx`
- Create: `src/components/ui/ExternalLink.tsx`
- Create: `src/components/ui/StatusBadge.tsx`
- Create: `src/components/ui/SectionHeading.tsx`
- Create: `src/components/home/Hero.tsx`
- Create: `src/components/home/Hero.test.tsx`
- Modify: `src/app/layout.tsx`
- Modify: `src/app/page.tsx`
- Modify: `src/app/globals.css`

**Interfaces:**
- Consumes: `profile` from Task 2 and global tokens from Task 1
- Produces: accessible site shell, hero anchor IDs, proof strip, collaboration CTA, and shared primitive components

- [ ] **Step 1: Write the failing hero test**

```tsx
import { render, screen } from '@testing-library/react'
import { Hero } from './Hero'

test('leads with the approved thesis and collaboration action', () => {
  render(<Hero />)
  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
    'I build AI products people can understand, trust, and use.'
  )
  expect(screen.getByRole('link', { name: 'Build something together' })).toHaveAttribute(
    'href',
    expect.stringMatching(/^mailto:adotriharis@gmail\.com/)
  )
  expect(screen.getByText('Live on the App Store')).toBeInTheDocument()
  expect(screen.getByText('Dell Top 5 finalist')).toBeInTheDocument()
  expect(screen.getByText('1,141 automated tests')).toBeInTheDocument()
})
```

- [ ] **Step 2: Run the hero test and verify failure**

Run: `npm test -- src/components/home/Hero.test.tsx`

Expected: FAIL because `Hero` does not exist.

- [ ] **Step 3: Implement the shell and hero**

Build a skip link to `#main-content`, a sticky header with Work, Principles, Experience, and Contact anchors, and a mobile menu whose button uses `aria-expanded` and `aria-controls`.

The hero contains:

```tsx
<h1>I build AI products people can understand, trust, and use.</h1>
<p>
  From deterministic safeguards and evaluation harnesses to subscriptions,
  launch campaigns, and kill-or-scale decisions, I turn ambitious ideas into accountable products.
</p>
```

Use three proof tiles for the App Store product, Dell Top 5 result, and test breadth. Add `Explore the work` linking to `#work` and the mailto CTA with subject `Building something together`.

Apply the Paper/Ink base, Volt primary CTA, one cyan evidence tile, one coral tile, and one sunshine tile. Use a single diagonal fieldbook rule behind the proof area as the justified aesthetic risk.

- [ ] **Step 4: Run the component and application checks**

Run: `npm test -- src/components/home/Hero.test.tsx && npm run typecheck && npm run lint && npm run build`

Expected: all commands pass; the page includes a single H1 and keyboard-visible header controls.

- [ ] **Step 5: Commit the shell**

```bash
git add src/app src/components/shell src/components/ui src/components/home/Hero.tsx src/components/home/Hero.test.tsx
git commit -m "feat: build editorial portfolio shell"
```

---

### Task 5: Add URL-backed lens and capability navigation

**Files:**
- Create: `src/lib/portfolio-query.ts`
- Create: `src/lib/portfolio-query.test.ts`
- Create: `src/components/lens/LensControl.tsx`
- Create: `src/components/home/CapabilityPicker.tsx`
- Create: `src/components/home/PortfolioExplorer.tsx`
- Create: `src/components/home/PortfolioExplorer.test.tsx`
- Modify: `src/app/page.tsx`

**Interfaces:**
- Consumes: `Lens`, `Capability`, and `projects`
- Produces: `parseLens(value): Lens`, `parseCapability(value): Capability | 'all'`, `buildPortfolioHref(state): string`, and UI state synchronized to `?lens=` and `?capability=`

- [ ] **Step 1: Write failing query tests**

```ts
import { buildPortfolioHref, parseCapability, parseLens } from './portfolio-query'

test('rejects unknown lens and capability values', () => {
  expect(parseLens('unknown')).toBe('story')
  expect(parseCapability('unknown')).toBe('all')
})

test('builds stable shareable query state', () => {
  expect(buildPortfolioHref({ lens: 'proof', capability: 'harden' })).toBe(
    '/?lens=proof&capability=harden#work'
  )
})
```

- [ ] **Step 2: Run query tests and verify failure**

Run: `npm test -- src/lib/portfolio-query.test.ts`

Expected: FAIL because the functions do not exist.

- [ ] **Step 3: Implement parsing and URL generation**

Use constant allowlists:

```ts
const lenses: readonly Lens[] = ['story', 'system', 'proof']
const capabilities: readonly Capability[] = ['ship', 'responsible-ai', 'harden', 'grow', 'prototype']
```

`buildPortfolioHref` must omit `capability=all`, always include the lens, and append `#work`.

- [ ] **Step 4: Write the failing explorer test**

Render `PortfolioExplorer` inside a test router shim and assert that the five capability labels and three lens buttons exist, the Story button starts with `aria-pressed="true"`, and selecting Proof calls router replacement with `/?lens=proof#work`.

- [ ] **Step 5: Implement the controls and explorer**

Use buttons with `aria-pressed`, not a visual-only tab list. Labels are:

- Build and ship a product
- Apply AI responsibly
- Evaluate and harden a system
- Price, launch, and grow
- Prototype an interactive or hardware experience

Use `useSearchParams`, `usePathname`, and `useRouter().replace()` to synchronize selection. Wrap the explorer in `<Suspense>` from the server-rendered page.

- [ ] **Step 6: Run navigation checks**

Run: `npm test -- src/lib/portfolio-query.test.ts src/components/home/PortfolioExplorer.test.tsx && npm run typecheck`

Expected: all tests pass, including browser-back-compatible query state.

- [ ] **Step 7: Commit the portfolio controls**

```bash
git add src/lib/portfolio-query.ts src/lib/portfolio-query.test.ts src/components/lens src/components/home/CapabilityPicker.tsx src/components/home/PortfolioExplorer.tsx src/components/home/PortfolioExplorer.test.tsx src/app/page.tsx
git commit -m "feat: add shareable portfolio lenses"
```

---

### Task 6: Build featured fieldbook cards and project case studies

**Files:**
- Create: `src/components/lens/ProjectLensPanel.tsx`
- Create: `src/components/lens/ProjectLensPanel.test.tsx`
- Create: `src/components/home/FeaturedFieldbook.tsx`
- Create: `src/components/home/FeaturedFieldbook.test.tsx`
- Create: `src/app/work/[slug]/page.tsx`
- Create: `src/app/work/[slug]/not-found.tsx`
- Create: `src/app/not-found.tsx`
- Modify: `src/components/home/PortfolioExplorer.tsx`
- Modify: `src/app/globals.css`

**Interfaces:**
- Consumes: `Project`, active `Lens`, filtered/reordered projects, and imported media
- Produces: `ProjectLensPanel({ project, lens, compact })`, five featured home cards, and 17 statically generated `/work/[slug]` routes

- [ ] **Step 1: Write failing lens-panel tests**

```tsx
import { render, screen } from '@testing-library/react'
import { projects } from '@/content/projects'
import { ProjectLensPanel } from './ProjectLensPanel'

const project = projects.find((item) => item.slug === 'carekaki')!

test('separates story, system, and proof content', () => {
  const { rerender } = render(<ProjectLensPanel project={project} lens="story" compact />)
  expect(screen.getByText(project.problem)).toBeInTheDocument()
  rerender(<ProjectLensPanel project={project} lens="system" compact />)
  expect(screen.getByRole('list', { name: 'System decisions' })).toBeInTheDocument()
  rerender(<ProjectLensPanel project={project} lens="proof" compact />)
  expect(screen.getByText(project.role)).toBeInTheDocument()
  expect(screen.getByText(project.limitations[0])).toBeInTheDocument()
})
```

- [ ] **Step 2: Run the panel test and verify failure**

Run: `npm test -- src/components/lens/ProjectLensPanel.test.tsx`

Expected: FAIL because the panel does not exist.

- [ ] **Step 3: Implement semantic lens content**

Story renders `problem`, `hardDecision`, and outcomes. System renders the ordered `system` blocks and stack. Proof renders status, role, team boundary, ownership, limitations, verification date, and only defined links.

Use Motion only for a keyed opacity/translate transition. If reduced motion is requested, render the keyed content without animated wrappers.

- [ ] **Step 4: Implement featured fieldbook ordering**

The default order is Fix Yo Yap, CareKaki, DAS D.I.A.L., FALSE POSITIVE, and Cited. When a capability is selected, stable-sort matching featured projects before nonmatching featured projects; never remove a featured project from the fieldbook.

Each card includes one headline image or typography-led diagram, status text, role, the active lens content, and an `Explore case study` link. Do not make the entire card a nested link.

- [ ] **Step 5: Add static case-study routes**

Implement:

```ts
export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }))
}
```

The page awaits `params`, calls `getProject`, invokes `notFound()` for an unknown slug, generates project-specific metadata, and renders all three semantic sections in document order so content remains readable without JavaScript. Add related projects sharing at least one capability.

- [ ] **Step 6: Run fieldbook and route checks**

Run: `npm test -- src/components/lens/ProjectLensPanel.test.tsx src/components/home/FeaturedFieldbook.test.tsx && npm run typecheck && npm run build`

Expected: tests pass and the build reports 17 generated project routes.

- [ ] **Step 7: Commit the fieldbook**

```bash
git add src/components/lens src/components/home/FeaturedFieldbook.tsx src/components/home/FeaturedFieldbook.test.tsx src/components/home/PortfolioExplorer.tsx src/app/work src/app/not-found.tsx src/app/globals.css
git commit -m "feat: add evidence-led project stories"
```

---

### Task 7: Add four deterministic interactive excerpts

**Files:**
- Create: `src/features/excerpts/guardian.ts`
- Create: `src/features/excerpts/guardian.test.ts`
- Create: `src/features/excerpts/GuardianExcerpt.tsx`
- Create: `src/features/excerpts/dial.ts`
- Create: `src/features/excerpts/dial.test.ts`
- Create: `src/features/excerpts/DialExcerpt.tsx`
- Create: `src/features/excerpts/cited.ts`
- Create: `src/features/excerpts/cited.test.ts`
- Create: `src/features/excerpts/CitedExcerpt.tsx`
- Create: `src/features/excerpts/yap.ts`
- Create: `src/features/excerpts/yap.test.ts`
- Create: `src/features/excerpts/YapExcerpt.tsx`
- Create: `src/features/excerpts/ExcerptRegistry.tsx`
- Modify: `src/app/work/[slug]/page.tsx`

**Interfaces:**
- Consumes: project slug
- Produces: `redactSensitiveText`, `requiresApproval`, `dialExamples`, `calculateVisibilityScore`, `assignPersona`, and `ExcerptRegistry({ slug })`

- [ ] **Step 1: Write failing Guardian rules**

```ts
expect(redactSensitiveText('Email ada@example.com or call +65 9123 4567')).toBe(
  'Email [EMAIL REDACTED] or call [PHONE REDACTED]'
)
expect(redactSensitiveText('S1234567D')).toBe('[NRIC REDACTED]')
expect(requiresApproval('Book home nursing tomorrow')).toBe(true)
expect(requiresApproval('Show nearby services')).toBe(false)
```

Implement case-insensitive email, Singapore phone, and NRIC patterns plus the risky verbs `submit`, `book`, `apply`, `escalate`, `call 995`, and `handover`.

- [ ] **Step 2: Write failing DAS example tests**

Define three fixed examples:

```ts
export const dialExamples = [
  { input: 'enuf', candidate: 'enough', category: 'orthographic', explanation: 'The pronunciation is preserved while the letter pattern changes.' },
  { input: 'sret', candidate: 'street', category: 'phonological', explanation: 'A sound unit is missing from the attempted spelling.' },
  { input: 'alot', candidate: 'a lot', category: 'word-boundary', explanation: 'Two words have been joined into one token.' },
] as const
```

Test that every example has a candidate and explanation, and that the exported disclaimer equals `Screening aid only — this excerpt does not diagnose dyslexia.`

- [ ] **Step 3: Write failing Cited score tests**

```ts
expect(calculateVisibilityScore([{ assistantWeight: 1, rank: 1, sentiment: 'positive' }])).toBe(100)
expect(calculateVisibilityScore([{ assistantWeight: 1, rank: null, sentiment: 'neutral' }])).toBe(0)
expect(calculateVisibilityScore([{ assistantWeight: 1, rank: 2, sentiment: 'neutral' }])).toBeCloseTo(58.62, 2)
```

Use `positionWeight = 1 / (1 + 0.45 * (rank - 1))`, sentiment multipliers `1`, `0.85`, and `0.4`, and absence as zero.

- [ ] **Step 4: Write failing Yap persona tests**

Use a fixed `SampleMetrics` type with `pace`, `fillers`, `pauses`, and `energy`, and deterministic thresholds:

```ts
expect(assignPersona({ pace: 152, fillers: 1, pauses: 2, energy: 0.82 })).toBe('The Closer')
expect(assignPersona({ pace: 98, fillers: 8, pauses: 9, energy: 0.38 })).toBe('The Restarter')
expect(assignPersona({ pace: 126, fillers: 3, pauses: 4, energy: 0.58 })).toBe('The Builder')
```

The excerpt must state that these are fixed demonstration rules and not Fix Yo Yap’s production scoring service.

- [ ] **Step 5: Run all rule tests and confirm failure**

Run: `npm test -- src/features/excerpts/*.test.ts`

Expected: FAIL because the rule modules do not exist.

- [ ] **Step 6: Implement the pure functions and UI excerpts**

Each UI begins with an `Interactive excerpt` eyebrow, explains what is simplified, supports keyboard operation, and includes a visible Reset button. Guardian accepts visitor text locally. DAS uses three selectable fixed examples. Cited exposes rank and sentiment controls. Yap exposes three fixed metric presets rather than microphone access.

`ExcerptRegistry` returns excerpts for `carekaki`, `das-dial`, `cited`, and `fix-yo-yap`, and returns `null` for every other slug.

- [ ] **Step 7: Verify excerpts and build output**

Run: `npm test -- src/features/excerpts/*.test.ts && npm run typecheck && npm run build`

Expected: all rules pass, no excerpt imports a network client, and all project routes build.

- [ ] **Step 8: Commit the excerpts**

```bash
git add src/features/excerpts 'src/app/work/[slug]/page.tsx'
git commit -m "feat: add interactive project excerpts"
```

---

### Task 8: Build the searchable project archive

**Files:**
- Create: `src/components/home/ProjectArchive.tsx`
- Create: `src/components/home/ProjectArchive.test.tsx`
- Modify: `src/components/home/PortfolioExplorer.tsx`
- Modify: `src/app/globals.css`

**Interfaces:**
- Consumes: `projects`, active capability, and `filterProjects`
- Produces: accessible search, maturity filter, result count, reset action, and links to all approved case studies

- [ ] **Step 1: Write failing archive behavior tests**

```tsx
test('searches, reports results, and resets', async () => {
  const user = userEvent.setup()
  render(<ProjectArchive projects={projects} capability="all" />)
  await user.type(screen.getByRole('searchbox', { name: 'Search projects' }), 'FPGA')
  expect(screen.getByText('1 project')).toBeInTheDocument()
  expect(screen.getByRole('link', { name: /Math Me Home/i })).toBeInTheDocument()
  await user.click(screen.getByRole('button', { name: 'Reset filters' }))
  expect(screen.getByText('17 projects')).toBeInTheDocument()
})
```

Add `@testing-library/user-event` to dev dependencies and install it before running the test.

- [ ] **Step 2: Run the archive test and verify failure**

Run: `npm test -- src/components/home/ProjectArchive.test.tsx`

Expected: FAIL because `ProjectArchive` does not exist.

- [ ] **Step 3: Implement archive filtering**

Use a labelled search input, status select with `all`, `live`, `working-demo`, `source-backed`, and `prototype`, and the capability supplied by the explorer. Show singular/plural result count via an `aria-live="polite"` region.

Cards show project name, one-line description, role, text status, capability tags, and `View evidence`. Use a dense responsive grid only in the archive; featured work remains editorial.

- [ ] **Step 4: Verify complete archive access**

Run: `npm test -- src/components/home/ProjectArchive.test.tsx src/lib/projects.test.ts && npm run typecheck`

Expected: reset restores 17 projects and every archive result links to `/work/<slug>`.

- [ ] **Step 5: Commit the archive**

```bash
git add package.json package-lock.json src/components/home/ProjectArchive.tsx src/components/home/ProjectArchive.test.tsx src/components/home/PortfolioExplorer.tsx src/app/globals.css
git commit -m "feat: add filterable project archive"
```

---

### Task 9: Add operating principles, experience, awards, and collaboration close

**Files:**
- Create: `src/components/home/ProfileSections.tsx`
- Create: `src/components/home/ProfileSections.test.tsx`
- Modify: `src/app/page.tsx`
- Modify: `src/components/shell/SiteFooter.tsx`
- Modify: `src/app/globals.css`

**Interfaces:**
- Consumes: `profile` from Task 2
- Produces: `#principles`, `#experience`, and `#contact` sections plus public contact links

- [ ] **Step 1: Write failing profile tests**

```tsx
test('states incoming work honestly and keeps private details out', () => {
  render(<ProfileSections />)
  expect(screen.getByText(/AI Research & Development Intern/i)).toBeInTheDocument()
  expect(screen.getByText('Incoming')).toBeInTheDocument()
  expect(screen.queryByText(/9081 2008|3\.07|GPA/i)).not.toBeInTheDocument()
})

test('offers only approved public contact paths', () => {
  render(<ProfileSections />)
  expect(screen.getByRole('link', { name: /Email Ananda/i })).toHaveAttribute('href', expect.stringMatching(/^mailto:/))
  expect(screen.getByRole('link', { name: /LinkedIn/i })).toHaveAttribute('href', 'https://www.linkedin.com/in/ananda-trimar/')
  expect(screen.getByRole('link', { name: /GitHub/i })).toHaveAttribute('href', 'https://github.com/AnandaTris')
})
```

- [ ] **Step 2: Run profile tests and verify failure**

Run: `npm test -- src/components/home/ProfileSections.test.tsx`

Expected: FAIL because the component does not exist.

- [ ] **Step 3: Implement the evidence-led profile sections**

Render the five operating principles, reverse-chronological experience, two research roles, selected awards, SENTRE leadership, and a collaboration brief listing what Ananda contributes: product definition, AI system design, production engineering, monetization, experimentation, and cross-functional delivery.

Use an explicit `Incoming` label for Marsh. Do not render an unavailable résumé download button.

- [ ] **Step 4: Run profile and page checks**

Run: `npm test -- src/components/home/ProfileSections.test.tsx && npm run typecheck && npm run build`

Expected: tests pass and the home page contains exactly one `main` landmark and one Contact section.

- [ ] **Step 5: Commit profile content**

```bash
git add src/components/home/ProfileSections.tsx src/components/home/ProfileSections.test.tsx src/components/shell/SiteFooter.tsx src/app/page.tsx src/app/globals.css
git commit -m "feat: add collaboration profile sections"
```

---

### Task 10: Add metadata, sitemap, robots, and share image

**Files:**
- Create: `src/app/sitemap.ts`
- Create: `src/app/robots.ts`
- Create: `src/app/opengraph-image.tsx`
- Create: `src/app/metadata.test.ts`
- Modify: `src/app/layout.tsx`
- Modify: `src/app/work/[slug]/page.tsx`

**Interfaces:**
- Consumes: `projects` and site identity
- Produces: crawlable home and project routes, Open Graph defaults, canonical metadata, and a generated 1200×630 image

- [ ] **Step 1: Write failing metadata tests**

```ts
import robots from './robots'
import sitemap from './sitemap'

test('publishes home and every approved project route', () => {
  const entries = sitemap()
  expect(entries).toHaveLength(18)
  expect(entries.map((entry) => entry.url)).toContain('https://anandatriharis.com/')
  expect(entries.map((entry) => entry.url)).not.toEqual(expect.arrayContaining([
    expect.stringMatching(/chord|docdeck|pufferty|meowtivation/i),
  ]))
})

test('allows normal crawling', () => {
  expect(robots().rules).toEqual({ userAgent: '*', allow: '/' })
})
```

Use `https://anandatriharis.com` as the canonical production origin in one exported constant. This is metadata configuration only; deployment and DNS remain separate shipping work.

- [ ] **Step 2: Run metadata tests and verify failure**

Run: `npm test -- src/app/metadata.test.ts`

Expected: FAIL because sitemap and robots modules do not exist.

- [ ] **Step 3: Implement metadata surfaces**

Generate 18 sitemap entries: home plus 17 approved project pages. The Open Graph image uses Paper, Ink, Volt, Cyan, and Coral; it contains Ananda’s name, the hero thesis, and `Product × AI × Growth`, with no project screenshot dependency.

Project metadata uses each project’s name and `oneLine`; featured images become `openGraph.images` only when a local media item exists.

- [ ] **Step 4: Run metadata and build checks**

Run: `npm test -- src/app/metadata.test.ts && npm run typecheck && npm run build`

Expected: tests pass and build emits sitemap, robots, Open Graph image, home, and 17 project pages.

- [ ] **Step 5: Commit metadata**

```bash
git add src/app/sitemap.ts src/app/robots.ts src/app/opengraph-image.tsx src/app/metadata.test.ts src/app/layout.tsx 'src/app/work/[slug]/page.tsx'
git commit -m "feat: add portfolio metadata"
```

---

### Task 11: Verify accessibility, responsive behavior, and production readiness

**Files:**
- Create: `README.md`
- Create: `docs/verification/portfolio-qa.md`
- Modify: files identified by failed checks only

**Interfaces:**
- Consumes: the complete application
- Produces: clean build, automated checks, responsive screenshots, keyboard-flow evidence, and reproducible local instructions

- [ ] **Step 1: Run the complete automated suite**

Run: `npm test && npm run typecheck && npm run lint && npm run build`

Expected: all commands exit 0. Fix failures in the responsible focused module and rerun the failing command before rerunning the full suite.

- [ ] **Step 2: Start the production server**

Run: `npm start`

Expected: Next serves the production build on `http://localhost:3000` with no terminal errors.

- [ ] **Step 3: Run gstack browser functional QA**

Use the gstack browse binary from the installed skill:

```bash
$B goto http://localhost:3000
$B snapshot -i
$B console --errors
$B is visible "#work"
$B click "text=Proof"
$B url
$B click "text=Build something together"
```

Expected:

- no console errors or warnings
- `#work` is visible
- URL contains `lens=proof`
- the collaboration link resolves to `mailto:adotriharis@gmail.com`

Test one excerpt reset flow, archive search/reset, mobile menu keyboard flow, and `/work/carekaki`. Confirm `/work/docdeck` renders the not-found experience.

- [ ] **Step 4: Capture and inspect responsive evidence**

Run:

```bash
$B responsive /tmp/ananda-portfolio
```

Inspect all three generated images with the image viewer. Additionally capture a 1440px desktop screenshot. Verify:

- 375×812: no horizontal scrolling; sticky lens does not cover headings
- 768×1024: fieldbook cards retain clear hierarchy
- 1280×720 and 1440px: proof strip and hero do not clip below the fold
- all screenshots use the approved bright palette and avoid a generic card wall

- [ ] **Step 5: Verify reduced motion and keyboard access**

Use browser emulation for reduced motion, reload, and confirm lens content changes without transforms. Starting from the address bar, use Tab and Enter to reach the skip link, header, capability picker, lens control, project links, archive filters, and collaboration CTA. Record any failures and the exact fix in `docs/verification/portfolio-qa.md`.

- [ ] **Step 6: Write reproducible project documentation**

`README.md` must contain:

- Node 22 prerequisite
- `npm install`, `npm run dev`, and full verification commands
- the typed-content and asset-provenance rules
- the five explicit excluded projects
- how to add a project without creating an unverified button
- a note that deployment is intentionally not part of local completion

`docs/verification/portfolio-qa.md` records command results, viewport checks, browser console status, keyboard results, and screenshot paths.

- [ ] **Step 7: Re-run final verification after visual fixes**

Run: `npm test && npm run typecheck && npm run lint && npm run build && git diff --check`

Expected: all commands pass and `git diff --check` prints nothing.

- [ ] **Step 8: Commit verified local completion**

```bash
git add README.md docs/verification src
git commit -m "test: verify portfolio experience"
```

The application is locally complete after this commit. Publishing it requires an explicit deployment request and the relevant shipping skill.
