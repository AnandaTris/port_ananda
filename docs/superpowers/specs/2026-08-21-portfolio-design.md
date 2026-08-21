# Ananda Triharis Maroso Portfolio Design

**Date:** 21 August 2026  
**Status:** Approved direction, implementation pending final spec review

## 1. Product summary

Build a bright, interactive portfolio that positions Ananda as an AI product builder and technical growth operator who can move from ambiguous problem to accountable system, shipped product, market evidence, and a clear next decision.

This is not a résumé rendered as a website. Its job is to help an industry partner quickly answer:

1. What difficult problems can Ananda help us solve?
2. What has he personally built or owned?
3. What proof supports each claim?
4. What could we build together next?

The working design name is **Evidence Fieldbook**: an editorial case-study structure with an interactive **Story / System / Proof** lens and small, honest product excerpts.

## 2. Audience and outcome

### Primary audience

- Startup founders and product leaders seeking a technical product partner
- Corporate innovation and R&D teams seeking applied AI prototypes or product experiments
- Engineers, designers, and operators considering forming a project team with Ananda

### Secondary audience

- Hiring managers assessing product engineering, AI/NLP, or technical product-management ability
- Hackathon and research partners

### Single job

Move a qualified visitor from curiosity to a concrete collaboration conversation.

### Primary conversion

The visitor selects **Build something together** and opens a pre-addressed email to `adotriharis@gmail.com` with a short, useful subject line.

### Supporting conversions

- Open a verified live product or App Store listing
- Inspect a project’s system and proof
- Visit Ananda’s GitHub or LinkedIn
- Download or view a concise résumé later, once a public-safe résumé asset is supplied

## 3. Positioning and voice

### Hero thesis

> I build AI products people can understand, trust, and use.

### Supporting line

> From deterministic safeguards and evaluation harnesses to subscriptions, launch campaigns, and kill-or-scale decisions, I turn ambitious ideas into accountable products.

### Collaboration line

> Bring an ambitious problem. I can help turn it into a working system, a validated product, and a team ready to carry it forward.

### Recurring operating principles

- LLMs for understanding, rules for action
- Evidence before claims
- Fail visibly instead of faking success
- Product economics are part of engineering
- Every irreversible action deserves a human gate

The voice is direct, specific, and candid. It does not use generic “AI-powered” claims, inflate team work into solo ownership, or hide limitations.

## 4. Visual system

### Direction

A clean, bright fieldbook rather than a dark developer dashboard. The page uses disciplined editorial spacing and strong typography, while project-specific colors and the lens transition provide the memorable moment.

### Color tokens

| Token | Hex | Use |
|---|---:|---|
| Paper | `#FFF8ED` | Primary background |
| White | `#FFFFFF` | Cards and focused surfaces |
| Ink | `#111318` | Primary text and high-contrast controls |
| Muted ink | `#5E626B` | Supporting copy |
| Volt | `#DFFF00` | Primary action and proof highlights |
| Coral | `#FF5D3A` | Story lens and warm project accents |
| Cyan | `#28C9FF` | System lens and technical diagrams |
| Sunshine | `#FFC93D` | Outcomes and awards |
| Jade | `#00A77E` | Verified/live states |
| Violet | `#7057FF` | Select project accents only |

Color remains subordinate to the evidence. Healthcare, dyslexia, and financial projects use quieter project treatments than entertainment projects.

### Typography

- **Display:** Cabinet Grotesk, with a self-hosted or licensed webfont only if its usage terms allow redistribution; otherwise use Space Grotesk.
- **Body:** Instrument Sans.
- **Evidence and data:** IBM Plex Mono.

The display face is used for the hero thesis and project names, not for long paragraphs. Evidence labels and status metadata use the mono face.

### Shape and layout

- Mostly square or lightly rounded surfaces; no universal pill-card treatment
- Visible rules, annotations, and evidence stamps encode real metadata
- Asymmetric desktop compositions collapse into a simple vertical mobile reading order
- Each project may contribute one accent color, but the global palette remains stable

## 5. Signature interaction

### Story / System / Proof lens

A persistent three-state control changes how featured work is presented:

- **Story:** the human problem, product bet, hard decision, and outcome
- **System:** architecture, data flow, safeguards, and owned technical components
- **Proof:** status, role, team size, live links, tests, awards, limitations, and verification date

The transition rearranges the same semantic content instead of navigating to a disconnected page. The active lens is reflected in the URL so a visitor can share a proof-focused view directly.

On mobile, the lens becomes a sticky segmented control. With reduced motion enabled, content changes instantly without morphing or parallax.

### Capability paths

Visitors may choose what they need help with:

- Build and ship a product
- Apply AI responsibly
- Evaluate and harden a system
- Price, launch, and grow a product
- Prototype an interactive or hardware experience

Selecting a path reorders featured projects and archive results. It never hides the complete archive.

### Interactive excerpts

Small, credential-free excerpts make selected work tangible without pretending to be the full product:

- **CareKaki:** Guardian-style redaction and human-approval gate walkthrough
- **DAS D.I.A.L.:** transparent spelling-pattern pipeline stepper with a screening-not-diagnosis disclaimer
- **Cited:** published visibility-score calculator using clearly labelled modelled data
- **Fix Yo Yap:** persona/result-card interaction using a fixed sample, not live audio analysis

Every excerpt is labelled **Interactive excerpt** and links to the full evidence drawer. No excerpt calls paid APIs or exposes project credentials.

## 6. Information architecture

```text
Home
├── Hero thesis + collaboration CTA
├── Immediate proof strip
├── Capability-path selector
├── Featured evidence fieldbook
│   ├── Fix Yo Yap
│   ├── CareKaki
│   ├── DAS D.I.A.L.
│   ├── FALSE POSITIVE
│   └── Cited
├── Operating principles
├── Professional product work
│   ├── Brawnix
│   └── Ingatik: Recall
├── Filterable project archive
├── Experience, research, awards, and leadership
└── Collaboration brief + contact

/work/[slug]
├── Story
├── System
├── Proof
├── Interactive excerpt or media
├── My role and team boundary
├── Known limitations
└── Related capability paths
```

### Desktop sketch

```text
┌──────────────────────────────────────────────────────────────┐
│ ANANDA / PRODUCT + AI BUILDER     Work  Principles  Contact │
├──────────────────────────────────────────────────────────────┤
│ I BUILD AI PRODUCTS             [evidence tile / live pulse] │
│ PEOPLE CAN UNDERSTAND,                                     │
│ TRUST, AND USE.                    [Build something together] │
├──────────────────────────────────────────────────────────────┤
│ What do you need?  [Ship] [AI] [Harden] [Grow] [Prototype] │
├──────────────────────────────────────────────────────────────┤
│                    STORY | SYSTEM | PROOF                     │
│ Featured project        active-lens content     evidence tab │
├──────────────────────────────────────────────────────────────┤
│ Project archive: search + capability + maturity filters      │
├──────────────────────────────────────────────────────────────┤
│ How I build       Experience       Let’s build together      │
└──────────────────────────────────────────────────────────────┘
```

## 7. Proof hierarchy and content contract

### Proof levels

1. Verified live product or public deployment
2. Working credential-free or offline demo
3. Recorded walkthrough or device capture
4. Public source, tests, CI, architecture, and ownership history
5. Local source-backed prototype
6. Design or specification only

Levels five and six never receive a **Live demo** button.

### Required project fields

Each project record must define:

```ts
type Project = {
  slug: string
  name: string
  oneLine: string
  status: 'live' | 'working-demo' | 'source-backed' | 'prototype'
  featured: boolean
  capabilities: Capability[]
  role: string
  teamSize?: number
  ownership: string[]
  contributionBoundary?: string
  problem: string
  hardDecision: string
  system: SystemBlock[]
  outcomes: EvidenceItem[]
  limitations: string[]
  stack: string[]
  links: {
    live?: string
    appStore?: string
    source?: string
  }
  media: MediaItem[]
  lastVerified: string
}
```

A link is rendered only when a verified URL exists. Empty or placeholder links are impossible by type and validation tests.

### Evidence drawer

Every detailed case study exposes:

- Current status
- Ananda’s role
- Team size where known
- What is live
- What is simulated
- Evidence and verification date
- Known limitations
- Source or live links only when verified

Test and commit counts appear in this drawer, not as the project’s human-facing headline.

## 8. Version-one project roster

### Featured work

#### Fix Yo Yap

- **Status:** live product
- **Position:** strongest flagship; solo product engineering and shipping
- **Verified links:** `https://apps.apple.com/us/app/fix-yo-yap/id6797952951`, `https://fixyoyap.com`
- **Lead story:** a speaking score becomes a memorable persona while deterministic scoring remains auditable
- **Proof:** sole-author history, multi-layer automated tests, App Store release, versioned scoring and production safeguards

#### CareKaki

- **Status:** working local/offline-safe demo; public source available
- **Position:** responsible AI and community care
- **Source:** `https://github.com/stormragemc/CareKaki-repo`
- **Contribution boundary:** claim Ananda’s UI redesign, trilingual system, test suite, CI, model migration, offline boot, and Docker development work directly; describe Guardian, adapters, audio, and Telegram systems as team-built contributions

#### DAS D.I.A.L.

- **Status:** source-backed team project
- **Position:** applied NLP, evaluation, abstention, and transparent decision rules
- **Source:** `https://github.com/AnandaTris/dyslexia-screener`
- **Contribution boundary:** Ananda owns the NLP subsystem, screening verdict rule, and test suite; teammate-built RAG work is not attributed to him

#### FALSE POSITIVE

- **Status:** source-backed team prototype with documented hosted backend
- **Position:** immersive multimodal AI entertainment
- **Source:** `https://github.com/stormragemc/FALSE-POSITIVE`
- **Contribution boundary:** use team language until Ananda provides his precise individual role; do not link the backend endpoint as if it were a playable demo

#### Cited

- **Status:** working credential-free local demo; public source available
- **Position:** honest AI-search measurement and product thesis
- **Source:** `https://github.com/AnandaTris/cited`
- **Boundary:** modelled dashboard data is labelled modelled; no claim of a verified live Claude scan

### Professional product work

#### Brawnix

- **Status:** live iOS product and web presence
- **Verified links:** `https://apps.apple.com/app/id6790144862`, `https://brawnix-web.vercel.app`
- **Contribution boundary:** feature Ananda’s deterministic workout parser, interference engine, product/economics work, and unmerged architecture branch without calling the parser AI or implying the branch shipped

#### Ingatik: Recall

- **Status:** live iOS product and web presence
- **Verified links:** `https://apps.apple.com/us/app/ingatik-recall/id6788639514`, `https://ingatikrecall.com`
- **Contribution boundary:** feature Ananda’s product ownership, subscriptions, pricing, analytics, localization, campaign execution, and funnel diagnosis; do not present him as the principal app author

### Project archive

The archive includes these source-backed projects with honest maturity labels:

- Fames.com: current AI Mentor slice and shared architecture only; do not reuse unverified older RAG claims
- HypeCast: local-only working prototype, no source link
- Steady: source-backed Singapore financial decision simulator
- Rekap: Android prototype with browser design harness; real mechanic requires a physical device
- Spike Responder: local-only technical prototype, no source link
- Math Me Home FPGA Game: source and diagrams; hardware required for execution
- OneSearch: source-backed project; no live link until its credentialed deployment is verified
- Aegis Risk Assessment Console: source-backed assessment project with screenshots and diagrams
- Hydrun: source-backed team hackathon project; no live link until the old deployment is verified
- Personal Workout Tracker: source-backed PWA with a simple local demo path

## 9. Explicit exclusions for version one

The following stay out until Ananda supplies evidence or gives explicit approval:

- ChordGrab / ChordSnap
- DocDeck
- Pufferty Fish Robot
- Meowtivation Task Manager
- Multi-Linear Regression Energy Model

Also excluded:

- Course websites and classroom starter repositories
- Prior portfolio and GitHub-profile websites
- LeetCode and other coding-practice submissions
- Generic templates, workshops, forks, leaked tooling, content-only folders, and learner-data-only repositories
- Academic transcript, GPA, phone number, or sensitive personal identifiers

The public contact area uses email, LinkedIn, and GitHub. It does not publish a phone number.

## 10. Technical architecture

### Stack

- Next.js 16 App Router
- React 19 and TypeScript
- Tailwind CSS 4 with design tokens in CSS custom properties
- Motion for the single coordinated lens transition and restrained reveals
- Static project content in typed TypeScript modules
- Vitest and React Testing Library for content rules and interactions
- Playwright-compatible browser QA through gstack browse

### Rendering

The site is server-rendered or statically generated wherever possible. Client components are limited to:

- Lens control
- Capability filters
- Interactive excerpts
- Mobile navigation
- Copy/contact affordances

No database or CMS is required for version one. This keeps the public site fast, reliable, and deployable without credentials.

### Content and media

- Project screenshots are copied from verified local source repositories into `public/projects/<slug>/`
- A provenance manifest records each asset’s source path and owning project
- Missing media produces a designed diagram or typography-led case-study header, not a fabricated screenshot
- Public project links are stored once in the typed content layer

### URL model

- `/` provides the complete portfolio journey
- `/work/[slug]` provides shareable deep case studies
- `?lens=story|system|proof` preserves the selected lens
- `?capability=<slug>` preserves a filtered portfolio path

## 11. Motion, accessibility, and responsiveness

- One orchestrated lens transition is the main motion signature
- Scroll reveals use small distance and opacity changes only
- No custom cursor, scroll hijacking, or constant ambient animation
- `prefers-reduced-motion` removes morphing, parallax, and staggered entrances
- All controls work by keyboard and expose visible focus states
- Color is never the only carrier of status
- Body copy targets WCAG AA contrast
- Mobile layouts preserve the Story / System / Proof control and evidence order
- Interactive excerpts include explicit reset controls and explanatory labels

## 12. Error and empty states

- Missing optional links are not rendered
- A failed external navigation remains a normal browser failure; the site never claims availability based on a stale health probe
- Interactive excerpts are deterministic and local, so they require no network fallback
- Media loading failures fall back to the project’s title, status, and system diagram
- Archive filters always provide a clear reset action and result count
- Unknown project slugs render a branded not-found page with a return-to-work action

## 13. Testing and acceptance criteria

### Content integrity

- Every displayed project has a status, role, ownership statement, limitation list, and verification date
- Team projects never use solo ownership language
- No excluded project is present in generated routes, search data, metadata, or sitemaps
- No placeholder or unverified public URL produces a button
- Ingatik uses the verified public App Store URL ending in `id6788639514`

### Interaction

- Story / System / Proof works by click, keyboard, browser navigation, and direct URL
- Capability filters reorder content and remain shareable
- Every interactive excerpt has a deterministic result and reset path
- Reduced-motion mode removes nonessential animation

### Visual and responsive

- QA at 375×812, 768×1024, 1280×720, and 1440px desktop width
- No text clipping at 200% browser zoom
- Featured proof remains readable without hover
- Project accents never reduce text contrast below AA

### Performance

- Initial page does not load project demo code until its excerpt becomes visible or requested
- Images use responsive sizing and modern formats where source quality allows
- Production build, lint, typecheck, and tests pass
- Browser console contains no errors on the home page or any project route

## 14. Implementation boundary

Version one delivers the portfolio, typed project content, available local assets, deterministic interactive excerpts, and verified outbound links. It does not deploy private project backends, publish unavailable repositories, add a CMS, create an authenticated contact system, or manufacture demonstrations for missing projects.

Deployment is a separate explicit shipping step after local QA and review.
