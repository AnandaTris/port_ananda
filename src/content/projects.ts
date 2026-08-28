import type { Project } from './types'

const lastVerified = '2026-08-21'

export const projects: readonly Project[] = [
  {
    slug: 'fix-yo-yap',
    name: 'Fix Yo Yap',
    oneLine: 'An impromptu speaking game that turns an auditable score into a memorable persona.',
    logo: { kind: 'icon', src: '/projects/fix-yo-yap/logo.png', alt: 'Fix Yo Yap app icon' },
    status: 'live',
    featured: true,
    accent: 'coral',
    capabilities: ['ship', 'harden', 'responsible-ai'],
    role: 'Solo product engineer and shipper',
    ownership: [
      'Built the mobile product, web product, scoring service, database layer, and release pipeline.',
      'Designed the deterministic scoring contract and persona system.',
      'Sole-authored the repository history across all refs.',
    ],
    contributionBoundary: 'Solo product: every commit across all refs is attributed to Ananda.',
    problem: 'Speaking feedback is easy to ignore when it arrives as an opaque number with no memorable meaning.',
    hardDecision: 'The persona may be read from an existing score, but is structurally unable to change that score.',
    system: [
      {
        title: 'Deterministic scorer',
        detail: 'Seven speech metrics combine transcription and pitch analysis under a versioned scoring configuration.',
      },
      {
        title: 'Production safeguards',
        detail: 'Signed requests, audio-retention jobs, account deletion, and database policy tests protect the release path.',
      },
    ],
    outcomes: [
      { label: 'Release', value: 'Live on the App Store', source: 'live' },
      { label: 'Authorship', value: 'Sole author across every ref', source: 'git' },
      { label: 'Verification', value: 'Five automated test layers documented green', source: 'test' },
    ],
    limitations: [
      'A previously logged physical-device run was reclassified as untested when the installed Expo Go version made that run impossible.',
    ],
    stack: ['Expo', 'React Native', 'Next.js', 'FastAPI', 'Python', 'Supabase', 'Vitest', 'Jest'],
    links: {
      live: 'https://fixyoyap.com',
      appStore: 'https://apps.apple.com/us/app/fix-yo-yap/id6797952951',
    },
    media: [
      {
        src: '/projects/fix-yo-yap/app-store-listing.png',
        alt: 'Fix Yo Yap App Store listing showing the published app page',
        width: 1179,
        height: 2226,
      },
    ],
    lastVerified,
  },
  {
    slug: 'carekaki',
    name: 'CareKaki',
    oneLine: 'A trilingual care navigator that keeps high-consequence actions behind deterministic safeguards and human gates.',
    logo: { kind: 'icon', src: '/projects/carekaki/logo.svg', alt: 'CareKaki app icon' },
    status: 'working-demo',
    featured: true,
    accent: 'jade',
    capabilities: ['responsible-ai', 'harden', 'prototype'],
    role: 'Product engineer in a four-person hackathon team',
    teamSize: 4,
    ownership: [
      'Redesigned the product UI and shipped the trilingual system.',
      'Wrote the offline backend test suite and three-job CI pipeline.',
      'Migrated the model backend, enabled offline boot, and built the Docker development workflow.',
    ],
    contributionBoundary:
      'Claim Ananda’s UI redesign, trilingual system, test suite, CI, model migration, offline boot, and Docker development work directly; Guardian, adapters, audio, and Telegram systems are team-built contributions.',
    problem: 'People navigating Singapore community care must turn an uncertain conversation into a usable plan without losing safety or accountability.',
    hardDecision: 'The team limited the LLM to understanding and generation while deterministic rules route actions and require approval for irreversible steps.',
    system: [
      {
        title: 'Conversation to care plan',
        detail: 'A trilingual interface gathers needs and creates a localized plan while keeping scheme names stable.',
      },
      {
        title: 'Guardian and action routing',
        detail: 'Team-built safeguards redact sensitive data, reject medical advice, trace sources, and gate risky actions.',
      },
    ],
    outcomes: [
      { label: 'Recognition', value: 'Dell InnovateDash 2026 Top 5 Finalist', source: 'award' },
      { label: 'Offline verification', value: '208 backend tests designed to run without API keys', source: 'test' },
    ],
    limitations: [
      'The verified experience is a local and offline-safe demo; without model credentials it degrades to synthetic data.',
    ],
    stack: ['Next.js', 'React', 'FastAPI', 'Python', 'OpenAI', 'Docker', 'GitHub Actions', 'pytest'],
    links: { live: 'https://aimao.vercel.app', source: 'https://github.com/stormragemc/CareKaki-repo' },
    media: [
      {
        src: '/projects/carekaki/live-home.png',
        alt: 'CareKaki live homepage with the AiMao care companion greeting visitors in three languages',
        width: 1440,
        height: 900,
      },
    ],
    lastVerified,
  },
  {
    slug: 'das-dial',
    name: 'DAS D.I.A.L.',
    oneLine: 'A dyslexia screening and error-pattern system with transparent verdict rules, abstention, and local NLP.',
    logo: { kind: 'mark', name: 'reading-slip' },
    status: 'source-backed',
    featured: true,
    accent: 'cyan',
    capabilities: ['responsible-ai', 'harden', 'prototype'],
    role: 'NLP subsystem, screening-verdict, and test-suite owner in a four-person team',
    teamSize: 4,
    ownership: [
      'Built the NLP error-pattern analyser and grapheme-to-phoneme rule engine.',
      'Owned the transparent screening verdict and abstention rules.',
      'Wrote the automated test suite and test-plan traceability documentation.',
    ],
    contributionBoundary:
      'Ananda owns the NLP subsystem, screening verdict rule, and test suite; the teammate-built RAG service is not attributed to him.',
    problem: 'Educators need screening evidence that explains uncertainty instead of turning model output into a diagnosis.',
    hardDecision: 'A smaller correction checkpoint was rejected after it invented a rewrite; faithfulness was chosen over model size.',
    system: [
      {
        title: 'Local error-pattern pipeline',
        detail: 'Tokenisation, lexicon lookup, local correction, phonology, and a seven-category taxonomy analyse writing without sending it to a third party.',
      },
      {
        title: 'Rules over extracted evidence',
        detail: 'Explicit thresholds produce screening verdicts, abstain on too little evidence, and surface mixed profiles instead of forcing a winner.',
      },
    ],
    outcomes: [
      { label: 'Owned test suite', value: '84 tests across 18 files documented passing offline', source: 'test' },
      { label: 'Lexicon evaluation', value: '17 of 20 development items resolved at accuracy@1 without sentence context', source: 'documented' },
    ],
    limitations: [
      'This is a screening aid, not a diagnosis; reversal-heavy writing is the weakest documented case, and the adaptive activity generator is not built.',
    ],
    stack: ['Next.js', 'Supabase', 'Gemini Vision', 'Transformers.js', 'ONNX', 'Vitest'],
    links: { source: 'https://github.com/AnandaTris/dyslexia-screener' },
    media: [],
    lastVerified,
  },
  {
    slug: 'false-positive',
    name: 'FALSE POSITIVE',
    oneLine: 'A psychological mystery prototype where a voice-driven detective reads meaning and vocal affect without claiming lie detection.',
    logo: { kind: 'mark', name: 'waveform' },
    status: 'source-backed',
    featured: true,
    accent: 'violet',
    capabilities: ['prototype', 'harden', 'responsible-ai'],
    role: 'Team contributor; precise individual ownership is not yet documented',
    ownership: ['Contributed within the project team; individual ownership remains deliberately unspecified.'],
    contributionBoundary:
      'Use team language until Ananda provides his precise individual role; the hosted backend endpoint is not presented as a playable demo.',
    problem: 'A voice-led interrogation needs to react to uncertainty and emotion without equating fear with guilt.',
    hardDecision: 'The team kept speech models and vendor credentials behind a hosted backend, accepting and documenting that player audio leaves the device.',
    system: [
      {
        title: 'Unity client',
        detail: 'The game captures a spoken turn and presents the detective response through a first-person scene.',
      },
      {
        title: 'Hosted voice sidecar',
        detail: 'A separate service combines transcription, vocal-affect representation, language-model response, and speech playback.',
      },
    ],
    outcomes: [
      { label: 'Recognition', value: 'Garena shortlisted team; did not win', source: 'award' },
      { label: 'Source', value: 'Public team repository with a documented hosted backend', source: 'git' },
      { label: 'Offline verification', value: '105-test sidecar suite documented passing', source: 'test' },
    ],
    limitations: [
      'The hosted chain was verified with a synthesized audio request, not from the committed Unity client, and the full authored interrogation is not yet built.',
    ],
    stack: ['Unity', 'C#', 'FastAPI', 'Python', 'Google Cloud', 'Gemini', 'HuBERT', 'ElevenLabs'],
    links: { source: 'https://github.com/stormragemc/FALSE-POSITIVE' },
    media: [
      {
        src: '/projects/false-positive/interrogation-room.webp',
        alt: 'FALSE POSITIVE interrogation room scene',
        width: 1280,
        height: 720,
      },
      {
        src: '/projects/false-positive/detective-silhouette.webp',
        alt: 'FALSE POSITIVE detective silhouette scene',
        width: 1280,
        height: 720,
      },
    ],
    lastVerified,
  },
  {
    slug: 'cited',
    name: 'Cited',
    oneLine: 'An AI-search visibility product that publishes its score formula and labels modelled data as modelled.',
    logo: { kind: 'mark', name: 'bracketed-score' },
    status: 'working-demo',
    featured: true,
    accent: 'sunshine',
    capabilities: ['responsible-ai', 'grow', 'harden'],
    role: 'Product and engineering owner',
    ownership: [
      'Defined the honest measurement thesis and published score formula.',
      'Built the credential-free modelled demo, coverage semantics, and live-scan boundary.',
      'Implemented the product, API, billing contracts, and automated checks in the public source.',
    ],
    problem: 'Brands cannot act on AI-search visibility when a product hides which assistants were measured or fills gaps with estimates.',
    hardDecision: 'Unsupported assistants contribute no fabricated answers; partial coverage is stated beside every score.',
    system: [
      {
        title: 'Published scoring model',
        detail: 'Rank and sentiment feed a visible formula, computed only over assistant surfaces actually collected.',
      },
      {
        title: 'Two honest modes',
        detail: 'Credential-free exploration is deterministic and labelled modelled, while live mode records only observed scans.',
      },
    ],
    outcomes: [
      { label: 'Demo', value: 'Working credential-free local dashboard and grader', source: 'documented' },
      { label: 'Automated checks', value: '333 tests documented across 12 files', source: 'test' },
    ],
    limitations: [
      'No live Claude scan has been observed in the repository, and the other tracked assistant surfaces are not measured.',
    ],
    stack: ['Next.js', 'TypeScript', 'Postgres', 'Anthropic', 'Stripe', 'Vitest'],
    links: { source: 'https://github.com/AnandaTris/cited' },
    media: [],
    lastVerified,
  },
  {
    slug: 'brawnix',
    name: 'Brawnix',
    oneLine: 'A live hybrid-athlete coach with deterministic workout parsing and explicit training-interference rules.',
    logo: { kind: 'icon', src: '/projects/brawnix/logo.png', alt: 'Brawnix app icon' },
    status: 'live',
    featured: false,
    accent: 'coral',
    capabilities: ['ship', 'grow', 'prototype'],
    role: 'Technical growth product manager and product engineer',
    ownership: [
      'Built the deterministic on-device workout parser and rule-based interference engine.',
      'Built a mobile logging architecture on an unmerged parallel branch.',
      'Designed regional pricing and modelled product economics.',
    ],
    contributionBoundary:
      'The parser and interference engine are Ananda’s deterministic code, not AI; the Gemini coach layer is teammate-owned, and the parallel architecture branch did not ship to main.',
    problem: 'Hybrid athletes need one training log that can recognize workout structure and flag conflicting sessions without guessing.',
    hardDecision: 'The parser returns no result when a log has no recognizable workout shape rather than inventing one.',
    system: [
      {
        title: 'On-device parser',
        detail: 'A rule-based grammar recognizes common lifting, running, and cycling log shapes without a network call.',
      },
      {
        title: 'Interference engine',
        detail: 'Explicit distance, duration, repetition, and load thresholds classify conflicts and severity.',
      },
    ],
    outcomes: [
      { label: 'Release', value: 'Live iOS product and public web presence', source: 'live' },
      { label: 'Code ownership', value: 'Parser and interference files each have one documented author', source: 'git' },
    ],
    limitations: [
      'The 39-commit architecture branch is not merged, and the documented unit economics depend on three assumed inputs rather than measured acquisition data.',
    ],
    stack: ['Expo', 'React Native', 'TypeScript', 'Next.js', 'Supabase'],
    links: {
      live: 'https://brawnix-web.vercel.app',
      appStore: 'https://apps.apple.com/app/id6790144862',
    },
    media: [
      {
        src: '/projects/brawnix/feature-graphic.png',
        alt: 'Brawnix hybrid-athlete coaching feature graphic',
        width: 1024,
        height: 500,
      },
    ],
    lastVerified,
  },
  {
    slug: 'ingatik-recall',
    name: 'Ingatik: Recall',
    oneLine: 'A live Pomodoro study product shaped through subscriptions, localization, analytics, and creator-led funnel diagnosis.',
    logo: { kind: 'icon', src: '/projects/ingatik/logo.png', alt: 'Ingatik: Recall app icon' },
    status: 'live',
    featured: false,
    accent: 'cyan',
    capabilities: ['ship', 'grow'],
    role: 'Technical growth product manager and product contributor',
    ownership: [
      'Owned product decisions, subscriptions, pricing, analytics, localization, and campaign execution.',
      'Diagnosed the creator-campaign funnel and kept reported causes separate from measured experiments.',
      'Contributed product code without claiming principal app authorship.',
    ],
    contributionBoundary:
      'Feature Ananda’s product ownership, subscriptions, pricing, analytics, localization, campaign execution, and funnel diagnosis; do not present him as the principal app author.',
    problem: 'A study timer must connect focus sessions to recall and retention while proving that reach can convert into product use.',
    hardDecision: 'Creator spend was paused when 195.5K seven-day campaign views produced about 60 registrations and no paid users.',
    system: [
      {
        title: 'Study and recall loop',
        detail: 'Timed focus rounds end with a voice note that becomes an editable summary and next-task list.',
      },
      {
        title: 'Growth instrumentation',
        detail: 'Subscriptions, analytics, localization, and creator operations connect product behavior to kill-or-scale gates.',
      },
    ],
    outcomes: [
      { label: 'Release', value: 'Live on the App Store', source: 'live' },
      { label: 'Campaign results', value: '195.5K views and about 60 registrations over seven days', source: 'documented' },
    ],
    limitations: [
      'Creators reported English-only content and missing tablet fullscreen support as blockers, but neither cause has been shipped and re-measured as an experiment.',
    ],
    stack: ['Expo', 'React Native', 'Next.js', 'Supabase', 'RevenueCat', 'PostHog', 'GA4'],
    links: {
      live: 'https://ingatikrecall.com',
      appStore: 'https://apps.apple.com/us/app/ingatik-recall/id6788639514',
    },
    media: [
      {
        src: '/projects/ingatik/whizzy-celebrating.png',
        alt: 'Ingatik Recall mascot Whizzy celebrating',
        width: 2048,
        height: 2048,
      },
    ],
    lastVerified,
  },
  {
    slug: 'fames',
    name: 'Fames.com',
    oneLine: 'An indie-game discovery platform whose current AI Mentor slice critiques store presence with explicit grounding and cost boundaries.',
    logo: { kind: 'mark', name: 'joystick' },
    status: 'source-backed',
    featured: false,
    accent: 'violet',
    capabilities: ['responsible-ai', 'harden', 'prototype'],
    role: 'AI Mentor owner and shared-architecture contributor in a three-person team',
    teamSize: 3,
    ownership: [
      'Owns the current AI Mentor prompts, rubric, analysis pipeline, evaluation harness, and provider boundaries.',
      'Contributed to the shared monorepo architecture and cross-service contract.',
    ],
    contributionBoundary:
      'Only the current AI Mentor slice and shared architecture are attributed; older unverified RAG claims are not reused.',
    problem: 'Finished games with little attention need specific, grounded feedback and a route to creators who could cover them.',
    hardDecision: 'Offline analysis travels through the same contract as a provider call but is labelled as an offline heuristic all the way to the report.',
    system: [
      {
        title: 'Shared platform contract',
        detail: 'Catalogue, creator, story, and mentor slices share one database and explicit ownership boundaries.',
      },
      {
        title: 'AI Mentor slice',
        detail: 'Collection, peer retrieval, rubric analysis, grounding, prioritization, and budget ledgers compose behind model-client ports.',
      },
    ],
    outcomes: [
      { label: 'Source', value: 'Public source with the AI Mentor slice and shared architecture', source: 'git' },
      { label: 'Offline path', value: 'Produces a complete contract-valid report without a model key', source: 'test' },
    ],
    limitations: [
      'No live model call or golden-set sweep has been run, and the mentor report UI is not built.',
    ],
    stack: ['Next.js', 'FastAPI', 'Python', 'TypeScript', 'Supabase', 'Postgres', 'Vitest', 'pytest'],
    links: { source: 'https://github.com/zektron001/Fames.com' },
    media: [],
    lastVerified,
  },
  {
    slug: 'hypecast',
    name: 'HypeCast',
    oneLine: 'A local gameplay-casting prototype that grounds commentary in visible match events before generating voice.',
    logo: { kind: 'mark', name: 'broadcast' },
    status: 'prototype',
    featured: false,
    accent: 'sunshine',
    capabilities: ['prototype', 'responsible-ai'],
    role: 'Prototype product engineer',
    ownership: [
      'Built the credential-free scripted demo and live clip-analysis path.',
      'Implemented evidence gating, synchronized commentary, and share-card export.',
    ],
    problem: 'Turning raw gameplay into a cast short is only useful if the commentary stays synchronized and does not invent events.',
    hardDecision: 'Kills require killfeed evidence; uncertain observations are softened instead of narrated as fact.',
    system: [
      {
        title: 'Grounded moment extraction',
        detail: 'Sampled frames and native-resolution killfeed crops produce a sanitized timeline of match moments.',
      },
      {
        title: 'Timed casting pipeline',
        detail: 'Persona scripts, measured speech, line fitting, and a playback clock keep captions and voice aligned.',
      },
    ],
    outcomes: [
      { label: 'Demo', value: 'Credential-free local 60-second scripted match', source: 'documented' },
      { label: 'Core checks', value: 'Vitest coverage over timing, demo invariants, and event sanitization', source: 'test' },
    ],
    limitations: [
      'The verified artifact is local only; live mode needs a model key, and full video export remains a stretch goal.',
    ],
    stack: ['Next.js', 'TypeScript', 'OpenAI', 'Vitest', 'Web APIs'],
    links: {},
    media: [],
    lastVerified,
  },
  {
    slug: 'steady',
    name: 'Steady',
    oneLine: 'A source-backed Singapore money calculator and 30-year decision simulator with versioned, cited rules.',
    logo: { kind: 'icon', src: '/projects/steady/logo.svg', alt: 'Steady app icon' },
    status: 'source-backed',
    featured: false,
    accent: 'jade',
    capabilities: ['harden', 'responsible-ai', 'ship'],
    role: 'Product engineer',
    ownership: [
      'Built browser-based calculators and long-horizon projection engines.',
      'Encoded safety defaults for payments, user inputs, and incomplete legal or policy rules.',
    ],
    problem: 'Long-term Singapore financial decisions need inspectable calculations and policy context rather than a black-box recommendation.',
    hardDecision: 'First- and second-year permanent-resident CPF calculations stay unavailable until the official graduated tables are implemented and verified.',
    system: [
      {
        title: 'Versioned rule modules',
        detail: 'Pure browser calculations pair Singapore rules with official citations.',
      },
      {
        title: 'Fail-closed integrations',
        detail: 'Payments, persistence, ads, and legal states remain disabled or visibly incomplete until explicitly configured.',
      },
    ],
    outcomes: [
      { label: 'Source', value: 'Public repository with CI quality gates', source: 'git' },
    ],
    limitations: [
      'Steady is an educational calculator, not personalized financial advice, and some graduated CPF rules are intentionally unavailable.',
    ],
    stack: ['Next.js', 'React', 'TypeScript', 'Supabase', 'Stripe', 'Vitest'],
    links: { source: 'https://github.com/AnandaTris/steady' },
    media: [
      {
        src: '/projects/steady/ollie-cheer.png',
        alt: 'Steady mascot Ollie cheering',
        width: 656,
        height: 720,
      },
    ],
    lastVerified,
  },
  {
    slug: 'rekap',
    name: 'Rekap',
    oneLine: 'An offline Android prototype that turns daily screen time into an animated, shareable reveal.',
    logo: { kind: 'icon', src: '/projects/rekap/logo.png', alt: 'Rekap app icon' },
    status: 'prototype',
    featured: false,
    accent: 'coral',
    capabilities: ['prototype', 'ship'],
    role: 'Prototype product engineer',
    ownership: [
      'Built the Android usage-statistics module, reveal, local persistence, and share card.',
      'Built a browser design harness for reviewing the experience without pretending the native mechanic runs on web.',
    ],
    problem: 'Screen-time reports are easy to ignore; the product must turn a daily device fact into a short, legible story worth sharing.',
    hardDecision: 'The web build is explicitly a design harness because the real usage-history mechanic has no browser equivalent.',
    system: [
      {
        title: 'Native usage bridge',
        detail: 'A custom Android module reads usage history and joins applications with visible labels and icons.',
      },
      {
        title: 'Reveal and export',
        detail: 'An animated verdict feeds a fixed-size share card and local daily record.',
      },
    ],
    outcomes: [
      { label: 'Prototype', value: 'Android prototype plus browser design harness', source: 'documented' },
    ],
    limitations: [
      'A physical Android device and a custom development build are required to verify the real mechanic; an emulator has no meaningful history.',
    ],
    stack: ['Expo', 'React Native', 'TypeScript', 'Kotlin', 'SQLite', 'Reanimated'],
    links: {},
    media: [
      {
        src: '/projects/rekap/feature-graphic.png',
        alt: 'Rekap screen-time reveal feature graphic',
        width: 1024,
        height: 500,
      },
    ],
    lastVerified,
  },
  {
    slug: 'spike-responder',
    name: 'Spike Responder',
    oneLine: 'A local resilience tool that notices real traffic spikes and checks whether users can still finish a critical journey.',
    logo: { kind: 'mark', name: 'spike' },
    status: 'prototype',
    featured: false,
    accent: 'cyan',
    capabilities: ['prototype', 'harden'],
    role: 'Prototype product engineer',
    ownership: [
      'Built spike detection, browser-fleet execution, journey validation, verdict aggregation, and reporting.',
      'Defined hard safety caps and environment-based secret handling.',
    ],
    problem: 'Teams skip discrete load-test events, so they learn too late whether a real traffic spike breaks the user journey that matters.',
    hardDecision: 'The tool never generates load and hard-caps the observing fleet at 200 browsers.',
    system: [
      {
        title: 'Spike detector',
        detail: 'A rolling baseline, multiplier, floor, and cooldown identify a traffic event from an existing signal.',
      },
      {
        title: 'Critical-path fleet',
        detail: 'Local or remote browsers execute declarative journey steps and aggregate completion and latency verdicts.',
      },
    ],
    outcomes: [
      { label: 'Core verification', value: '44 tests plus real-site runs on happy and failure paths', source: 'test' },
    ],
    limitations: [
      'The technical prototype works locally, but product demand has not been validated and remote browser providers have not been tested.',
    ],
    stack: ['TypeScript', 'Playwright', 'Node.js', 'Vitest'],
    links: {},
    media: [],
    lastVerified,
  },
  {
    slug: 'math-me-home',
    name: 'Math Me Home',
    oneLine: 'A two-player math quiz implemented as a finite-state machine on an FPGA board.',
    logo: { kind: 'mark', name: 'chip-plus' },
    status: 'source-backed',
    featured: false,
    accent: 'sunshine',
    capabilities: ['prototype', 'harden'],
    role: 'Hardware and game-logic engineer',
    ownership: [
      'Designed and implemented the full game-logic finite-state machine.',
      'Integrated inputs, question generation, answer validation, scoring, displays, and board-level debugging.',
    ],
    problem: 'A two-player quiz needs deterministic game flow, scoring, and feedback on constrained physical hardware.',
    hardDecision: 'Game flow was expressed as an explicit finite-state machine so every transition and output could be reasoned about on the board.',
    system: [
      {
        title: 'Game-state controller',
        detail: 'Lucid HDL states govern question generation, input, answer validation, and score changes.',
      },
      {
        title: 'Hardware interface',
        detail: 'Buttons, multiplexed seven-segment displays, and an LED matrix carry the two-player interaction.',
      },
    ],
    outcomes: [
      { label: 'Recognition', value: '2nd Place, Outstanding Project among approximately 30 teams', source: 'award' },
      { label: 'Source', value: 'Source and architecture diagrams retained', source: 'documented' },
    ],
    limitations: ['The source-backed game requires the Alchitry Au FPGA hardware for execution.'],
    stack: ['Lucid HDL', 'Alchitry Au', 'Vivado', 'FPGA'],
    links: {},
    media: [
      {
        src: '/projects/math-me-home/fsm.png',
        alt: 'Math Me Home finite-state machine diagram',
        width: 1920,
        height: 1080,
      },
      {
        src: '/projects/math-me-home/datapath.png',
        alt: 'Math Me Home datapath architecture diagram',
        width: 2066,
        height: 1133,
      },
    ],
    lastVerified,
  },
  {
    slug: 'cseshell',
    name: 'CSEShell',
    oneLine: 'A Unix shell written in C, with its own command loop, startup file, and line editor.',
    logo: { kind: 'mark', name: 'prompt' },
    status: 'source-backed',
    featured: false,
    accent: 'jade',
    capabilities: ['prototype', 'harden'],
    role: 'Shell core owner in a three-person team',
    teamSize: 3,
    ownership: [
      'Built the read-evaluate-print loop, argument parsing, and the fork, exec, and wait path every external command travels.',
      'Implemented the startup configuration file, PATH resolution, command history, runtime English and Russian message switching, and the interactive prompt and line editor.',
    ],
    contributionBoundary:
      'The shell core and its startup, history, and input handling are mine; the bundled system programs were shared work across the team.',
    problem:
      'A shell has to keep accepting commands after every kind of bad input — a blank line, an unknown program, a directory change — without leaking memory or dying.',
    hardDecision:
      'The shell records its launch directory at startup and resolves bundled program paths against it, so its own commands keep working after the user changes directory.',
    system: [
      {
        title: 'Command loop',
        detail:
          'Builtins dispatch in process; anything else is a fork, an execvp, and a blocking waitpid, with the parsed arguments freed on every iteration.',
      },
      {
        title: 'Startup and session state',
        detail:
          'A startup file sets PATH and runs commands before the first prompt, while history and the message language live in shell state that a builtin can change without recompiling.',
      },
    ],
    outcomes: [
      {
        label: 'Tests',
        value: 'Unit tests over the parser and permission helpers, plus six integration scripts driving the built shell',
        source: 'test',
      },
      {
        label: 'Source',
        value: 'Private coursework repository with build, command, and test documentation',
        source: 'documented',
      },
    ],
    limitations: [
      'The repository is a private university submission, so no public source link is published.',
      'One bundled program reads /proc and needs Linux; the shell itself runs on any POSIX system.',
    ],
    stack: ['C', 'GNU Make', 'Bash', 'POSIX'],
    links: {},
    media: [],
    lastVerified,
  },
  {
    slug: 'onesearch',
    name: 'OneSearch',
    oneLine: 'A source-backed search engine that fans out across providers and returns one ranked answer.',
    logo: { kind: 'mark', name: 'fan-in' },
    status: 'source-backed',
    featured: false,
    accent: 'violet',
    capabilities: ['prototype', 'harden'],
    role: 'Product engineer',
    ownership: [
      'Built concurrent search across YouTube and Brave Search.',
      'Built the AI ranking and answer-synthesis path, three-screen interface, and rate limiting.',
    ],
    problem: 'People searching across media and the web still have to reconcile several result lists before they can act.',
    hardDecision: 'The interface enforces a single-result constraint after concurrent provider fan-out and ranking.',
    system: [
      {
        title: 'Concurrent retrieval',
        detail: 'YouTube and Brave candidates are fetched in parallel behind a rate-limited request boundary.',
      },
      {
        title: 'Ranked response',
        detail: 'A ranking and synthesis pass reduces the candidates to one answer and a three-state user flow.',
      },
    ],
    outcomes: [{ label: 'Automated checks', value: '57 tests across 9 test files', source: 'test' }],
    limitations: ['The credentialed deployment has not been verified, so no live link is published.'],
    stack: ['Next.js', 'TypeScript', 'OpenAI', 'YouTube API', 'Brave Search API', 'Vitest'],
    links: {},
    media: [],
    lastVerified,
  },
  {
    slug: 'aegis',
    name: 'Aegis Risk Assessment Console',
    oneLine: 'A source-backed full-stack console for project risk tables and organization-wide risk oversight.',
    logo: { kind: 'mark', name: 'shield' },
    status: 'source-backed',
    featured: false,
    accent: 'jade',
    capabilities: ['harden', 'prototype'],
    role: 'Full-stack assessment author',
    ownership: [
      'Built role-specific project-manager and risk-consultant workflows.',
      'Implemented the API, authentication and authorization, dashboard aggregation, schema, tests, and architecture documentation.',
    ],
    problem: 'Project managers and risk consultants need different views of the same threat catalogue and mitigation progress.',
    hardDecision: 'The browser never receives the database service credential; every request crosses an authenticated, role-aware API boundary.',
    system: [
      {
        title: 'Role-aware API',
        detail: 'Signed sessions and role middleware separate editable project-manager tables from consultant-wide read views.',
      },
      {
        title: 'Risk data and dashboard',
        detail: 'A Postgres schema stores scenarios and mitigation progress while pure aggregation produces dashboard statistics.',
      },
    ],
    outcomes: [
      { label: 'Source', value: 'Public assessment repository with screenshots and diagrams', source: 'git' },
      { label: 'Offline checks', value: 'Core backend tests run without database credentials', source: 'test' },
    ],
    limitations: ['A configured Supabase database is required for the full application; no verified public deployment is linked.'],
    stack: ['Hono', 'React', 'TanStack Router', 'TypeScript', 'Supabase', 'Postgres', 'Vitest'],
    links: { source: 'https://github.com/AnandaTris/Illinois-ARCS-Take-Home-Assessment' },
    media: [
      {
        src: '/projects/aegis/login.png',
        alt: 'Aegis risk assessment console login screen',
        width: 1280,
        height: 720,
      },
    ],
    lastVerified,
  },
  {
    slug: 'hydrun',
    name: 'Hydrun',
    oneLine: 'A team-built geolocation app for finding and contributing public water-fountain locations.',
    logo: { kind: 'mark', name: 'droplet' },
    status: 'source-backed',
    featured: false,
    accent: 'cyan',
    capabilities: ['prototype', 'ship'],
    role: 'Team hackathon contributor; precise individual ownership is not documented',
    ownership: ['Contributed within the hackathon team; individual feature ownership remains unspecified.'],
    contributionBoundary: 'Describe Hydrun as a team hackathon project; do not imply sole ownership or a verified live deployment.',
    problem: 'People need a quick way to locate nearby water fountains and add missing locations while moving through a campus or city.',
    hardDecision: 'The team combined browser geolocation with a shared map and contribution flow to deliver the end-to-end project within 24 hours.',
    system: [
      {
        title: 'Location-aware map',
        detail: 'A React and Leaflet interface centers on the user and displays contributed fountain markers.',
      },
      {
        title: 'Shared location service',
        detail: 'A Flask backend supports fountain records and user-submitted location details.',
      },
    ],
    outcomes: [
      { label: 'Recognition', value: '3rd Place at SUTD What The Hack among 50 teams', source: 'award' },
      { label: 'Source', value: 'Public team repository', source: 'git' },
    ],
    limitations: ['The former deployment has not been re-verified, so the archive publishes source only.'],
    stack: ['React', 'Flask', 'Python', 'Leaflet', 'OpenStreetMap'],
    links: { source: 'https://github.com/GiorgioRPo/HydrunFrontend' },
    media: [],
    lastVerified,
  },
  {
    slug: 'personal-workout-tracker',
    name: 'Personal Workout Tracker',
    oneLine: 'A source-backed offline PWA for remembering sessions and tracking progressive overload.',
    logo: { kind: 'icon', src: '/projects/personal-workout-tracker/logo.png', alt: 'Personal Workout Tracker app icon' },
    status: 'source-backed',
    featured: false,
    accent: 'coral',
    capabilities: ['ship', 'prototype'],
    role: 'Solo personal-tool builder',
    ownership: [
      'Built the workout, set, repetition, and weight tracking interface.',
      'Implemented local persistence and offline PWA behavior.',
    ],
    problem: 'A personal training log needs to keep working in the gym without an account, backend, or network dependency.',
    hardDecision: 'All workout data stays in local storage, keeping the tool simple and offline at the cost of cross-device sync.',
    system: [
      {
        title: 'Workout log',
        detail: 'React screens organize training days, exercises, working sets, repetitions, and load.',
      },
      {
        title: 'Offline persistence',
        detail: 'A service worker caches the app while browser local storage retains the user’s data.',
      },
    ],
    outcomes: [
      { label: 'Source', value: 'Public source-backed PWA with a simple local run path', source: 'git' },
    ],
    limitations: ['Data is local to one browser profile and is not synchronized across devices.'],
    stack: ['React', 'Vite', 'JavaScript', 'PWA', 'Workbox', 'localStorage'],
    links: { source: 'https://github.com/AnandaTris/Personal-Workout-Tracker' },
    media: [
      {
        src: '/projects/personal-workout-tracker/hero.png',
        alt: 'Personal Workout Tracker hero illustration',
        width: 343,
        height: 361,
      },
    ],
    lastVerified,
  },
]
