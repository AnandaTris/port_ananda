# Ananda Triharis Maroso

Computer Science and Design undergraduate at SUTD. I build applied-AI products and
ship them — four consumer apps sole-authored to the App Store and Google Play, an
NLP screening subsystem for a national dyslexia charity, and an AI automation
internship inside an insurance broker.

**Contact** · adotriharis@gmail.com · [LinkedIn](https://www.linkedin.com/in/ananda-trimar/) · [GitHub](https://github.com/AnandaTris) · [portfolio-bukd.vercel.app](https://portfolio-bukd.vercel.app)

> This is the public version of my CV. Employer-internal metrics, pricing, revenue
> figures and unreleased roadmap are deliberately left out, as are the names of
> colleagues and teammates. Where work was shared, the scope I owned is stated
> explicitly rather than implied.

---

## Education

**Singapore University of Technology and Design (SUTD)** — Singapore
B.Eng. Computer Science and Design · Sep 2024 – May 2028 (expected)
SUTD Undergraduate Merit Scholar

---

## Awards & achievements

**Dell InnovateDash Hackathon 2026 — Top 5 finalist** · Jun 2026
Selected from a video-submission round for CareKaki, an AI care navigator built under
the SUTD × Dell Technologies problem statement in partnership with Care Corner, a
designated Integrated Community Care Programme (ICCP) provider.

**Baby Shark Fund — two-time awardee, S$6,000 + S$2,000**
S$6,000 (May 2025) for Pufferty, an autonomous underwater rescue robot, selected on
innovative approach, technical feasibility and social impact. S$2,000 for Fames.com,
the indie game discovery platform with the RAG pipeline.

**SUTD What The Hack — 3rd place, 50 teams (~250 participants)** · Sep 2025
Full-stack geolocation web app built and deployed end to end in 24 hours.

**2-Player Math Quiz Game on FPGA — 2nd place, Outstanding Project (~30 teams)** · Apr 2026

**Meowtivation Task Manager — 3rd place, Outstanding Project** · Apr 2026

**Pufferty Fish Robot — nominated "Most Innovative & Risk-Taking" and "Most Technically Robust Design"** · May 2025
Nominated across the full cohort.

**UROP Grant — S$1,500 (Fames.com)** · 2025
Undergraduate research grant to continue development of the RAG pipeline over
~6,200 Steam reviews.

---

## Work experience

### AI Research & Development Intern · Marsh
*Aug 2026 – Dec 2026* · Asia Digital team

- Identify and scope AI use cases across generative AI, NLP and agentic systems for
  risk and automation within the Asia Digital team
- Build automation for insurance workflows across the broker and insurer side of the
  business, so the same cases move with less manual handling
- Develop proof-of-concept prototypes for prioritised use cases alongside business and
  tech stakeholders, product managers and engineering teams
- Deliver those proofs of concept in Python and Node.js against MongoDB, with RAG where
  retrieval is genuinely the right tool, containerised with Docker and exercised
  through Postman

### Technical Growth Product Manager Intern · 8x Social
*Jun 2026 – Present · 20 hrs/week*

**Product ownership**
- Own consumer app "plays" end to end on a 10-week idea→kill/scale clock: research and
  competitor mapping, numeric success criteria and kill thresholds set before build,
  MVP scoping with the Play Engineer, monetization design, distribution, and the final
  kill-or-scale recommendation — reporting to founders and presenting at the weekly
  PM sync
- Run two plays as a portfolio simultaneously — **Ingatik: Recall** (Pomodoro study app,
  live on the App Store) and **Brawnix** (AI hybrid-athlete fitness coach) — plus
  **ChordGrab**, **Fix Yo Yap** and **DocDeck** as scoped or built concepts

**Payments and monetization**
- Designed and shipped the full subscription and checkout stack for Ingatik: a three-tier
  Free/Pro/Max model across four SKUs, created in App Store Connect and Google Play
  Console and unified through RevenueCat entitlements, with a monthly/annual toggle on
  the paywall
- Wired and secured the payment webhook path end to end — RevenueCat → Next.js webhook
  with bearer-secret auth (unauthenticated POSTs rejected) → plan state in Supabase →
  admin panel — and ran sandbox purchase, upgrade and restore-purchase verification per
  SKU before handing the build to testers
- Designed purchasing-power-adjusted regional pricing so the same product is priced
  against local income rather than a single global anchor

**Analysis**
- Built a seven-tab unit-economics workbook driven off a single assumptions tab, and
  stated the limit of it explicitly: the acquisition-cost figures rested on three
  assumed inputs, none of them yet measured
- Produced the org's compute-cost finding for AI products: at a realistic freemium
  conversion rate each paying user carries dozens of free users, so a frontier-model
  inference path runs a **negative** contribution margin per payer while a cheaper
  hosted-inference path stays positive — and a day-0 trial cuts the carried free base
  several-fold, reframing the paywall as a margin decision rather than a growth decision
- Instrument the full acquisition-to-revenue funnel in GA4 (web) and PostHog (in-app):
  sessions → registration → activation → checkout → paid, with the admin panel and data
  pipeline treated as launch blockers

**Go-to-market**
- Launched and ran a creator campaign in Türkiye: **7 creators, 113 posts, 195.5K views
  and 3.9K engagements in 7 days**, with cumulative views later crossing 250K — then
  diagnosed the gap between that reach and actual registrations against the thresholds
  set before launch
- Sourced 48 creators across 6 markets (Singapore, Germany, Türkiye, US, Mexico, Brazil),
  ranked on a three-tier evidence ladder (A: full profile verified · B: niche inferred
  from handle · C: existence only) so spend decisions could see data quality instead of a
  flat list; disqualified 5 accounts as coaching businesses and logged them as
  partnership and competitor intel
- Wrote the creator brief, onboarding and QA system: dedicated-account setup, a 2–3 day
  account warm-up protocol against shadowban risk, five ranked launch hooks each paired
  with a reference clip, a 2–3 day draft-approval window, and a documented shadowban
  recovery protocol
- Flagged creator attribution (UTM and promo code through to the billing vendor) as a hard
  gate on spend after a code audit proved no acquisition-source property existed anywhere
  in the codebase — nothing spends until this ships

**Hands-on build (TypeScript)**
- Ship product code alongside the Play Engineer across Expo/React Native and Next.js on
  Supabase: paywall and upgrade screens, purchase wiring, in-app account deletion
  (Apple 5.1.1(v)), admin auth, and the analytics layer
- Led full mobile localization to 4 locales (English, German, Filipino, Indonesian) with
  276-key parity verified across all files; caught and fixed a class of localization bugs
  including a mixed-language paywall price string on the live billing path, an Indonesian
  CLDR plural gap, and German text overflow in fixed-width layouts

### Product Management Intern (R&D) · Rohde & Schwarz
*Sep 2025 – Jan 2026*

- Cross-functional bridge between R&D engineers and product teams for spectrum analyzer
  development, translating RF and electronics concepts into documentation for
  non-technical stakeholders
- Produced 6 structured technical lab sheets for FPC1500 and FSH spectrum analyzers,
  reducing clarification queries during lab sessions by an estimated ~50%
- Worked directly with the FPC1500 and FSH instruments, building an understanding of
  hardware–software integration

---

## Research

### Student Research Assistant · Social AI Studio, SUTD
*May 2025 – Jan 2026*
- Contributed to a research project developing a culturally-aware AI translation system
- Labeled and curated multilingual datasets to improve language understanding and support
  data quality

### Student Researcher · Climate Resilient Citizenry, SUTD
*May 2025 – Jan 2026*
- Worked with the Lee Kuan Yew Centre for Innovative Cities on a large-scale study
  targeting 1,000 households across Singapore
- Gathered field-based insights on climate resilience and citizen behaviour; applied data
  collection protocols and community engagement methodologies

---

## Projects

### CareKaki — AI care navigator for Singapore's community care system
*Jun – Jul 2026* · Top 5 finalist, Dell InnovateDash 2026 · four-person hackathon team

*Scope owned:* the full UI redesign and trilingual i18n layer, the backend test suite, the
CI pipeline, the LLM migration, and the offline-safe boot. The remaining systems below were
built within a shared codebase.

- Built an AI care navigator that turns a plain-language conversation into a personalised
  care plan, then dispatches five autonomous agents to execute it (caregiver emergency
  alerts, ICCP coordinator handover, eldercare service search, home-nursing booking and
  medication-safety review), with a human approval gate on every irreversible action
- Redesigned the product UI and shipped trilingual support (English, 简体中文, Bahasa
  Melayu) in a single build of ~4,200 lines across 37 files: a 742-line string layer,
  per-language localised care-plan datasets, a React language context with a header
  switcher, and a per-request language field that localises model output while pinning
  scheme names (CHAS, MediFund, SingPass, ICCP) to English
- Wrote the backend test suite from scratch: 208 pytest tests across 5 files (~1,500 lines)
  covering the safety layer, all three data adapters and every API route, designed to run
  fully offline with zero API keys so CI never depends on a live model
- Built the CI pipeline as three independent jobs: frontend (lint, typecheck, production
  build), backend (the offline pytest suite), and docker (builds both images, boots the
  full Compose stack until healthchecks pass, then smoke-tests both endpoints)
- Engineered "Guardian," a rule-based responsible-AI layer applied to every model output:
  regex PDPA redaction of national IDs, phone numbers and emails; a no-medical-advice
  classifier; a human approval gate on risky verbs; and per-decision source traceability
- Architected the system on the principle *LLM for understanding, rules for action* — the
  model handles only conversation, profile extraction, plan generation and voice scripts,
  while emergency detection (30-keyword matcher), adapter routing (6 rule sets) and service
  ranking stay deterministic, so agent execution keeps working when the model is unavailable
- Grounded every recommendation in real Singapore open data: 140 Senior Activity Centres
  and CHAS clinics from data.gov.sg GeoJSON plus the HSA register of therapeutic products,
  enriched with openFDA drug labels
- Migrated the model backend after a 5 req/min quota threatened live-demo throughput, and
  made the service boot with no API keys at all, degrading to synthetic data so the safety
  layer, health checks and rule-based routing still run offline
- Shipped an optional audio guide: 11 contextual page events generate narration scripts
  read by multilingual TTS, with Web Speech API mic input, anti-collision debouncing and
  auto-mute while the assistant is speaking
- Containerised the stack with Docker Compose (Next.js 16 / React 19 web + FastAPI backend
  + webhook tunnel), with the backend auto-registering its bot webhooks on startup

### Fix Yo Yap — impromptu speaking game with a deterministic speech scorer
*Jul 2026 – Present* · sole author, 532 commits · **live on the App Store and Google Play**

- Built the full product solo: topic card → 45-second recording → deterministic score → an
  assigned speaking persona → a shareable clip, on the principle that the output is a name,
  not a number — nobody repeats "I got a 6.4"; they repeat "apparently I'm The Restarter"
- Built the speech-scoring service in Python 3.12 / FastAPI: ASR plus Praat/parselmouth
  pitch analysis feeding 7 deterministic metrics, with the persona label read *off* an
  existing score and structurally unable to feed back into one
- Made scoring reproducible and auditable: every scored round is stamped with a
  `scoring_version` string that pins the deployed service to a hash of its own parameter
  file, verified byte-identical against the repo before the pipeline was trusted
- Hardened the pipeline: HMAC request signing on the scoring endpoint (unsigned POSTs
  return 401), audio-purge and stuck-round sweeper jobs, account deletion, and a
  secret-rotation script that rotates both vendors and re-probes live in one command
- Root-caused three deploy-only failures invisible in local development: a
  `requires-python` range that only broke under a full dependency solve, a catch-all
  rewrite that started routing by destination path and 404'd every route, and a memory
  setting silently ignored under the platform's billing model
- Corrected the project's own record when evidence contradicted it — established that a
  logged "physical device run" was impossible under the installed tooling version and
  re-flagged it as untested rather than leaving a false pass in the roadmap

**Test engineering** — 1,141 automated tests plus 496 pgTAP assertions across five layers,
all sole-authored, all green:
- 720 mobile tests across 63 files (React Native / Expo, Jest) in ~7s, and 173 web tests
  across 15 files (Next.js, Vitest) in under 1s
- 171 Python tests across 17 files in the scoring service (determinism, auth, audio
  pipeline, container formats, dispatch idempotency, sentence boundaries, post-ASR refund,
  validation gate, contract) and 77 Deno tests across 5 edge functions
- 496 pgTAP assertions across 21 SQL test files running against the real Postgres schema:
  RLS lockdown, round caps, activation, streaks, paywall, audio retention, best-score,
  timezone bucketing, function execute grants, webhook ordering, dashboard summary,
  post-ASR refund, admin plan switch, leaderboard, deck memory, topic admin, user
  progress, premium recordings, display-name moderation
- 57 database migrations applied and verified against the hosted database, not just locally

**Selected systems**
- Shipped a **social leaderboard** with the privacy decision made in the database: an
  opted-out player is published as "Anonymous Yapper" rather than dropped from the board,
  the caller's own row is spliced in at their true rank instead of appended, and ranks are
  numbered over the rows actually shown
- Closed **App Store Guideline 1.2** (user-generated content) with a moderation system
  rather than a mailto link: display names are filtered by a `security definer` database
  trigger, because the client role holds update rights on the column and any client-side
  check could be walked past by a direct API call; the blocklist is an unreadable table so
  a report can be acted on without shipping a release; any player can report a name, capped
  per reporter per day and idempotent so a double tap is one report
- Made **audio retention plan-aware**: free recordings cut from 30 to 7 days, premium
  recordings kept while the subscription is active with a 30-day grace after lapse, read
  through signed URLs under RLS — and moved both published privacy policies in the same
  change, because they promised the old numbers
- Built the **cross-round progress layer**: progress RPCs, a score-trend chart, a
  GitHub-style streak heatmap over 30/90/365 days, a metric grid and a stats page, widening
  the summary window server-side so the range chips re-slice an array the device already
  holds instead of costing three round trips
- Redesigned the result screen and replaced the shared screenshot with a purpose-built
  9:16 share canvas, freezing its typography against the OS font-size setting so a
  large-text user still exports a correctly laid-out card
- Root-caused three consecutive silent builds to the countdown tick deactivating the iOS
  audio session mid-round, and an entitlement-id mismatch that denied premium to real
  subscribers because the client checked for one specific entitlement name instead of any
  active one
- Wrote an iOS submission runbook from real rejection letters — including a Guideline 3.1.2
  rejection caused by a missing EULA link in App Store *metadata* despite working in-app
  terms — worked into a per-item checklist separating what code can fix from what only a
  dashboard or a device can
- Built an App Store screenshot compositor as a scripted, tested render rather than
  hand-captured images
- Built an **admin premium-grant system that outlives the billing vendor**, so support can
  comp a user without touching it: grant and revoke from the admin panel, a database-side
  sticky-grant clause made null-safe, stale grant rows closed so a re-grant after a lapse
  works, and a unified lock order to remove a grant/revoke race
- Separated *"the billing vendor is unresolved"* from *"the billing vendor says no
  premium"* on the client, which had been collapsing into a single denial state

### Brawnix — AI hybrid-athlete fitness coach
*Jul 2026 – Present* · 51 commits across branches

- Wrote a **deterministic, on-device workout parser with no network call and no API key**
  (137 lines), covering the common logging grammar ("5x3 back squat at 140kg", "ran 21k
  easy", "30min hard bike") and returning null rather than guessing when the text has no
  recognisable workout shape, with the signature designed so an AI parser can swap in
  behind it later
- Wrote the **rule-based training-interference engine** (113 lines): classifies each log as
  hard cardio, lower-body lift or heavy lift on explicit thresholds (cardio counts as hard
  at ≥15km or ≥75min; a lift counts as heavy at ≤6 reps and ≥60kg) and flags the
  interference conflicts between them by severity
- Built the mobile logging subsystem across 39 commits: a per-set workout-session logger
  replacing the flat checklist, a backward-compatible per-set data model, a template builder
  and day grid, a metrics editor capturing RPE, optional metrics and notes, and a metric
  launch-line registry with per-sport suggestions
- Collapsed three separate tier systems into one entitlements layer, quarantined demo data
  behind a `DataSource` seam so demo mode is honest end to end, and replaced daily streaks
  with a weekly streak
- Fixed a class of correctness bugs: streaks and heatmaps bucketed by UTC instead of local
  calendar day, a module-scope startup crash from placeholder env vars, and a web
  hydration crash

*The AI coach-chat and voice-log layer on this product was built by a teammate.*

### Dreamt — deterministic dream-pattern tracker
*Aug 2026* · sole author, 40 of 40 commits

- Built the product against the category's core weakness: every dream app on the store
  sells interpretation, which is unfalsifiable, unrepeatable and therefore forgettable.
  Dreamt only reports arithmetic over what the user actually logged — "you have dreamed
  about being late four times this month, and three of those were nights you went to bed
  after 1am"
- Wrote `packages/dream-engine` as a deterministic, offline core with no model call anywhere
  in extraction: dictionary and head-word matching with plurals and possessives,
  recurring-symbol tallies, context links, streaks and generated art, all seeded from one
  shared RNG so both renderers produce identical output
- Enforced a single source of truth across two clients: the Expo mobile app and the Next.js
  web app consume the engine and are structurally forbidden from reimplementing it, because
  two apps quietly disagreeing on what "recurring" means is the exact failure the package
  exists to prevent
- Wrote 46 engine tests over the product invariants, including pinned assertions on the
  exact sentence `describeLink()` produces and a test that bans causal verbs from that copy,
  so the product cannot drift into claiming causation it has not measured
- Retracted a documented product claim in the repo itself when the numbers did not line up,
  and recorded the retraction in the commit history rather than making a quiet edit
- Recorded a measured lexicon-coverage figure and the blind-testing method used to get it,
  plus a pre-launch empty-extraction metrics baseline, before any user saw the app

### Nibbi — technique-first cooking progression app
*Aug 2026* · sole author, 82 of 82 commits

- Built a cooking app around technique mastery rather than recipe volume: a personalised
  cooking ladder, weekly challenges with permanent ranks, drill scoring, regional
  "boss dish" recipes, and a fair-XP system explained to the user in plain language
- Wrote the ranking and scoring domain as shared logic consumed by both the Expo mobile app
  and the Next.js marketing site, with 21 mobile test files covering ranks, challenges,
  drill scoring, the ladder, route guards, onboarding, analytics, the assistant and paywall
  availability
- Hardened the monetization path before launch: made the billing webhook **fail closed when
  no secret is configured**, rather than accepting unauthenticated entitlement changes
- Ran a marketing-integrity pass over the site's own copy and shipped the fix as its own
  commit, keeping the claims on the landing page inside what the product actually does
- Documented a safety review of the recipe content itself before publishing regional dishes

### Trip Awards — private group-trip awards app
*Aug 2026* · sole author, 27 of 27 commits

- Built a private awards ceremony for group trips on a seven-state lifecycle (draft →
  boarding → live trip → ballot → locked → premiere → archive): friends collect evidence
  through private missions, nominate each other, vote on one anonymous ballot per category,
  and open a cinematic recap together
- Designed the Supabase schema security-first: **anonymous clients hold no direct table
  access at all**, invites are scoped and hashed, contributions are consent-aware, ballots
  carry replay protection, and safety reports and two-phase retention hooks live in the
  schema rather than bolted on
- Shipped three separate hardening waves recorded as their own commits, and fixed a billing
  correctness bug where cancelled paid entitlements were being dropped instead of preserved
  to term
- Wrote 83 tests across 13 files spanning webhook auth, guest-state authorization, the trip
  domain rules, release-mode configuration and onboarding, run as a complete CI check
- Stated the release boundary honestly in the repo's own README: a production-shaped
  functional prototype with a complete persistent local demo, with cross-device sync, media
  processing, production payments and store submission listed as outstanding rather than
  implied as done

### Ingatik: Recall — Pomodoro study app
*Jun 2026 – Present* · live on the App Store

- Core loop: choose focus rounds, study lengths and a subject colour tag, study alongside a
  mascot, then record a 30-second voice note that AI turns into an editable summary, a
  next-tasks list and auto-ticked completed tasks
- Owned the product decisions behind retention: a streak that forgives one missed day and
  sends a warm rather than guilt-based nudge after two, an XP system surfaced to users as
  "Logs" through a single display constant, and an onboarding that sets a user's default
  session from how they say they actually study
- Shipped to TestFlight and the App Store across 9+ builds, root-causing crashes and an
  AI-recap failure across three layers, and clearing store blockers (in-app account
  deletion, live privacy and terms, subscription attachment)
- After launch, the honest read on the creator campaign is not that reach was the problem —
  it is that the funnel was, and the diagnosis came back from the creators themselves
  (English-only app, no tablet fullscreen support) rather than from the dashboard. Spend
  was stopped rather than continued

### ChordGrab / ChordSnap — link-to-chord-progression music app
*Jul 2026 – Present*

- Paste a video link and get a playable, time-aligned chord progression; detection runs real
  audio analysis in a worker service, with an LLM using structured outputs naming the song
  and correcting the raw result
- Designed the detection-quality contract surfaced to users: a song is labelled an estimate
  when only metadata-level prediction was available, and Postgres — not the in-memory cache
  — is the source of truth, so an already-analysed link costs nothing on re-request
- Diagnosed and removed a silent mock-data fallback that had hidden a full day of total
  detection failure behind plausible-looking output; a configured-but-failing backend now
  raises a real error and reports it
- **Root-caused why users were not being tracked at all:** the mobile analytics client was
  constructed with `persistence: 'memory'`, so the `distinct_id` lived only in RAM and every
  cold start looked like a brand-new anonymous person — nothing done before sign-in could be
  attributed, and unique-user and retention numbers were inflated. Switched to persisted
  storage and found two related defects alongside it: retries were disabled so any transient
  network blip silently dropped the event, and both clients defaulted to the US host while
  the project sits in the EU region

### Personal portfolio site — evidence-led project archive
*Aug 2026 – Present* · sole author · Next.js · [live](https://portfolio-bukd.vercel.app)

- Built a static portfolio where every project page is forced into the same three-part
  structure (Overview, Build, Results) by a TypeScript `Project` type, so a project cannot
  be published without an honest status, a stated ownership boundary, the hard decision
  behind it, its limitations, and a verification date
- Encoded the attribution rule in the type system and in tests rather than in a style guide:
  team work must use team language, and a bounded contribution cannot be rendered as solo
  ownership; a test suite enforces the approved project roster and the metadata identity
  contracts
- Gated public links behind verification, so a URL only ships after the destination has been
  checked

### DocDeck — template-fidelity doc→deck converter (design approved)
*Jul 2026*

- Reframed the original brief from "one app that combines Docs and Slides" to the real
  problem — duplicate authoring — and killed the unified-editor framing as a multi-year
  build against Google and Microsoft
- Specified the wedge as fidelity rather than generation: write into a copy of the user's own
  template deck via the Slides API so master styles, fonts and layouts are inherited
  natively, the exact seam where incumbents structurally fail
- Wrote the full spec with numeric gates and an explicit kill threshold, and chose the
  non-sensitive `drive.file` OAuth scope with the Google Picker specifically to avoid a
  weeks-long restricted-scope review

### OneSearch — AI ranked search engine
*May 2026 – Present*

- Engineered concurrent fan-out search across the YouTube and Brave Search APIs, feeding
  candidates into an LLM for ranking and one-line answer synthesis under a hard
  single-result constraint
- Built a three-screen state machine UI in Next.js (TypeScript) with per-IP sliding-window
  rate limiting; 57 tests across 9 test files

### DAS D.I.A.L — AI screening and error pattern analyser · Dyslexia Association of Singapore
*May 2026 – Present* · team of 4 · 42 of 75 commits · sole author of the NLP subsystem, the
screening decision rule and the test suite

**Scope owned**
- Owns two of the project's three problem statements for the Dyslexia Association of
  Singapore, whose MOE-funded Main Literacy Programme supports 3,000+ primary and secondary
  students: **PS1** handwriting screening (photo or PDF → vision model → indicator
  extraction) and **PS4** the error pattern analyser
- Stack: Next.js 15, Supabase (Auth, Postgres, row-level security), a hosted vision model,
  Transformers.js/ONNX running locally in the Node process, Vitest

**Content understanding pipeline (PS4)**
- Built the error-pattern analyser end to end, 11 modules in `lib/nlp/`: sentence and word
  tokenisation carrying character offsets, a conservative word-boundary pass (`alot` →
  `a lot`), a neural grammar-correction layer (T5-base, ONNX q8, ~70 MB, runs locally), a
  Hunspell plus phonetic-index lexicon layer over the 135k-word CMU Pronouncing Dictionary,
  and a feature-weighted phoneme-distance classifier
- Designed a **7-category error taxonomy** (phonological, orthographic, morphological,
  visual, homophone, word-boundary, grammatical) with subtypes and per-category profile
  weights, mechanically reproducing the dual-route phonological/surface distinction from the
  dyslexia literature (`enuf` sounds right, letters wrong → orthographic; `sret` loses the
  /t/ → phonological)
- Wrote a **grapheme-to-phoneme rule engine** (~120 context-sensitive rules, ARPAbet output)
  because the classification needs the pronunciation of a *misspelling*, which exists in no
  dictionary; it emits variant readings for ambiguous vowels and compares on articulatory
  features (a voicing-only contrast costs 0.15, a deleted phoneme costs 1.0) instead of
  string equality
- Rejected the smaller candidate checkpoint after measuring hallucination on project
  samples — given `The dof ran to the bark and the dall was reb.` it returned *"The dog was
  killed by a car wreck."* Chose faithfulness over model size: an invented rewrite becomes an
  invented error in a child's report
- Guarded the neural layer against paraphrase: real word → real word accepted only when the
  two sound alike (the homophone case), non-word → word accepted only as a candidate and then
  re-scored against the lexicon's own best guess; graceful degradation to lexicon plus
  phonology when weights can't be fetched, stated in the report rather than hidden

**Decision rules over model output**
- Made the PS1 verdict a **transparent rule over model-extracted features, not the model's own
  label**: the vision model supplies an evidence-strength score and indicator list, and
  `lib/screening/verdict.js` decides — `likely` needs a score ≥ 55, and is held at `unlikely`
  when every indicator found is a letter reversal and the writer is under 7 (developmentally
  normal), with the reason surfaced in the UI. Both thresholds are exported constants
- Built abstain and confidence gating into PS4: no profile claimed below **4** analysable
  errors, top-two profiles within **0.15** reported as *mixed* rather than forced into a
  winner, profile confidence = `0.35 + 0.40 × volume + 0.25 × separation`, and caveats that
  fire automatically on short samples, transcribed text, high reversal share and
  low-confidence target reconstruction
- Every report states it is a screening aid, not a diagnosis — enforced in the UI, in the
  model prompt and in the generated output

**Evaluation and test engineering**
- Defined the evaluation methodology per layer: **accuracy@1** on a 20-item
  misspelling→intended development list (17/20 lexicon-only; all 3 misses need sentence
  context, which is the neural layer's job), G2P phoneme accuracy against CMU on held-out
  words, and per-category **precision/recall** against hand-labelled pairs
- Ran system-level evaluation on engineered samples with known dominant patterns: surface
  0.96 share, phonological 0.63, morphological 0.87, clean text correctly claims no profile,
  4/4 word-boundary errors caught; documented the failure case honestly — reversal-heavy
  writing resolves 1/9 and is named as the weakest area in both the docs and the user-facing
  caveats
- Wrote the project's entire automated test suite: **84 tests across 18 files, all passing in
  ~2s**, with no network access and no API key required (the vision model, Supabase and the
  material repository are doubled at the boundary), plus 5 learning-material use-case tests
  and one integration test in the Python RAG service
- Authored the **test-plan traceability doc** mapping all 16 cases in the team's test plan to
  the test that covers it, and stating plainly where the plan and the code disagree rather
  than papering over the gaps
- Documented the whole subsystem: setup, NLP overview, troubleshooting and known limitations,
  plus an architecture doc covering tokenisation strategy, taxonomy rationale and evaluation
  methodology

**Privacy posture**
- The correction model runs locally in the Node process, so no student writing is sent to a
  third party; Supabase RLS on both tables means an educator can only ever read their own rows

**Built by teammates**
- The Python FastAPI RAG service (local embeddings and generation over Supabase pgvector,
  deny-all RLS on the corpus, anti-hallucination guard) and the dashboard/chat integration
  were built by a teammate. My contribution to that service is the 5 material use-case tests
  and one integration test
- PS3, the adaptive learning activity generator, is not built yet

### Fames.com — indie game discovery platform with a RAG pipeline
*Apr 2026 – Present* · UROP grant S$1,500

- Architected an end-to-end RAG pipeline over ~6,200 Steam reviews: chunked with LangChain,
  embedded with OpenAI embeddings, stored in FAISS, and wired to a RetrievalQA chain with
  conversation memory for multi-turn natural-language queries
- Built a client-side gamification layer (XP system, 7 achievements, weekly quests) with
  localStorage persistence and the Web Audio API; fully offline-capable via a service worker
- Implemented multi-tag filtering and real-time search with dynamic UI re-rendering and no
  page reload
- Developed the full-stack application in React, Next.js and Flask; processed and structured
  large Steam datasets with Pandas

### Pufferty — autonomous underwater rescue robot
*Jan – May 2025* · S$6,000 Baby Shark Fund

- Architected a real-time swimmer-tracking robot on ESP32 in C++ over the ESP-NOW wireless
  protocol, with a servo control system responding to pressure-sensor wristband emergency
  signals
- Engineered the underwater locomotion system with ultrasonic sensors for proximity tracking
  and servo-driven fin mechanics simulating natural fish movement

### 2-Player Math Quiz Game on FPGA
*Jan – Apr 2026* · 2nd place, Outstanding Project

- Designed the FSM governing full game logic in Lucid HDL (Alchitry Au, Vivado); integrated
  buttons, multiplexed 7-segment displays and an LED matrix with board-level debugging
- Covered question generation, input handling, answer validation and score tracking

### Meowtivation task manager
*Jan – Apr 2026* · 3rd place, Outstanding Project

- Built an Android app in Java with Firebase auth, real-time Firestore sync and a gamified
  pet progression system, using XP rewards per task to drive completion through behavioural
  design

### Water fountain locator · SUTD What The Hack
*Sep 2025* · 3rd place, 50 teams

- Shipped a full-stack geolocation app end to end in 24 hours: a crowd-sourced fountain
  database with photo upload and a Flask backend, deployed to PythonAnywhere and Vercel

### Multi-linear regression model for energy consumption
*Jun – Aug 2025*

- Developed an ML model for household energy consumption in Singapore using linear
  regression, Pandas, Matplotlib and NumPy

---

## Co-curricular

### Head of University · SENTRE — 5,000+ member Indonesian student community
*Nov 2025 – Present*

- Built and operated a structured mentorship program at scale: coordinated 10+ mentors,
  mentored 50+ students, and supported a community of close to 5,000 members
- Planned roadshow strategy and developed workshop materials for Sahabat Belajar 2026,
  coordinating outreach across 6+ schools in Surabaya and Bali to deliver scholarship and
  study-abroad preparation to Indonesian high school students

---

## Skills

**Languages** — Python, Java, TypeScript, JavaScript, C, C++, SQL, HTML/CSS

**Frameworks and tools** — React, Next.js, React Native (Expo), Tailwind CSS, FastAPI, Flask,
LangChain, FAISS, Supabase/PostgreSQL (including pgvector and row-level security), Pandas,
NumPy, pytest, Jest, Vitest, Docker and Docker Compose, GitHub Actions CI, Leaflet, Git,
Vercel, PostHog, GA4, i18next

**AI/ML and evaluation** — Transformers.js / ONNX runtime (local inference), Hugging Face
model selection and hallucination testing, RAG pipelines (chunking, embeddings, vector
retrieval), classification taxonomy design, precision/recall and accuracy@1 evaluation,
abstain and confidence thresholds, grapheme-to-phoneme rule engines, feature-weighted edit
distance, human-in-the-loop and rules-over-LLM decision layers

**Product and growth** — unit economics and contribution-margin modelling, pricing and
packaging, paywall and activation design, funnel instrumentation and event taxonomy design,
experiment design, creator-led GTM, competitor and willingness-to-pay research, kill/scale
decision frameworks

**Payments and monetization** — RevenueCat, App Store Connect and Google Play Console
subscription configuration, Stripe, entitlement and webhook design, regional pricing, creator
payout structures

**APIs and integrations** — OpenAI, Anthropic Claude (structured outputs), Groq, ElevenLabs
TTS and ASR, parselmouth/Praat, Web Speech API, Telegram Bot API, openFDA, Singapore open
data (data.gov.sg)

**Hardware and FPGA** — Vivado toolchain, Alchitry Au, FSM design, RTL-to-hardware
integration, embedded systems (ESP32), digital logic
