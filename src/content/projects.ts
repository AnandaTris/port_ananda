import type { Project } from './types'

const lastVerified = '2026-08-21'

/** Evidence captured after the 08-21 sweep carries its own date rather than
    quietly ageing the whole file forward. */
const verifiedAug29 = '2026-08-29'

export const projects: readonly Project[] = [
  {
    slug: 'fix-yo-yap',
    name: 'Fix Yo Yap',
    oneLine:
      'Speaking feedback is easy to ignore when it arrives as a bare number, so I turned seven metrics from transcription and pitch analysis into a persona under a versioned scoring contract.',
    logo: { kind: 'icon', src: '/projects/fix-yo-yap/logo.png', alt: 'Fix Yo Yap app icon' },
    status: 'live',
    featured: true,
    accent: 'coral',
    capabilities: ['ship', 'harden', 'responsible-ai'],
    role: 'Solo product engineer and shipper',
    ownership: [
      'I built the mobile product, web product, scoring service, database layer, and release pipeline.',
      'I designed the deterministic scoring contract and persona system.',
      'I am the sole author of the repository history across all refs.',
    ],
    contributionBoundary: 'Solo product: every commit across all refs is mine.',
    problem: 'Speaking feedback is easy to ignore when it arrives as an opaque number with no memorable meaning.',
    hardDecision: 'I let the persona be read from an existing score, but made it structurally unable to change that score.',
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
      'I reclassified a previously logged physical-device run as untested once the installed Expo Go version made that run impossible.',
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
    oneLine:
      'Care navigation goes wrong when a model is trusted with consequences, so we let the LLM only listen and write while deterministic rules route every action and hold the irreversible ones for a human.',
    logo: { kind: 'icon', src: '/projects/carekaki/logo.svg', alt: 'CareKaki app icon' },
    status: 'source-backed',
    featured: true,
    accent: 'jade',
    capabilities: ['responsible-ai', 'harden', 'prototype'],
    role: 'Product engineer in a four-person hackathon team',
    teamSize: 4,
    ownership: [
      'I redesigned the product UI and shipped the trilingual system.',
      'I wrote the offline backend test suite and three-job CI pipeline.',
      'I migrated the model backend, enabled offline boot, and built the Docker development workflow.',
    ],
    contributionBoundary:
      'The UI redesign, trilingual system, test suite, CI, model migration, offline boot, and Docker development workflow are mine; my teammates built the Guardian, adapters, audio, and Telegram systems.',
    problem: 'People navigating Singapore community care must turn an uncertain conversation into a usable plan without losing safety or accountability.',
    hardDecision: 'We limited the LLM to understanding and generation while deterministic rules route actions and require approval for irreversible steps.',
    system: [
      {
        title: 'Conversation to care plan',
        detail: 'A trilingual interface gathers needs and creates a localized plan while keeping scheme names stable.',
      },
      {
        title: 'Guardian and action routing',
        detail: 'Safeguards that my teammates built redact sensitive data, reject medical advice, trace sources, and gate risky actions.',
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
    oneLine:
      'Screening should explain its uncertainty rather than hand back a diagnosis, so I built a local NLP pipeline that extracts error patterns and let explicit thresholds decide the verdict — or abstain from one.',
    logo: { kind: 'mark', name: 'reading-slip' },
    status: 'source-backed',
    featured: true,
    accent: 'cyan',
    capabilities: ['responsible-ai', 'harden', 'prototype'],
    role: 'NLP subsystem, screening-verdict, and test-suite owner in a four-person team',
    teamSize: 4,
    ownership: [
      'I built the NLP error-pattern analyser and grapheme-to-phoneme rule engine.',
      'I owned the transparent screening verdict and abstention rules.',
      'I wrote the automated test suite and test-plan traceability documentation.',
    ],
    contributionBoundary:
      'The NLP subsystem, screening verdict rule, and test suite are mine; a teammate built the RAG service, and I do not claim it.',
    problem: 'Educators need screening evidence that explains uncertainty instead of turning model output into a diagnosis.',
    hardDecision: 'I rejected a smaller correction checkpoint after it invented a rewrite, choosing faithfulness over model size.',
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
    media: [
      {
        src: '/projects/das-dial/error-pattern-report.jpg',
        alt: 'DAS D.I.A.L. error pattern report showing the analysed writing sample beside a mixed-pattern verdict, its confidence, and the phonological, orthographic, morphological, and visual split',
        width: 1898,
        height: 912,
      },
    ],
    lastVerified: verifiedAug29,
  },
  {
    slug: 'false-positive',
    name: 'FALSE POSITIVE',
    oneLine:
      'A voice interrogation has to answer hesitation without treating fear as guilt, so we had a Unity client talk to a hosted sidecar that reads meaning and vocal affect as two separate signals.',
    logo: { kind: 'mark', name: 'waveform' },
    status: 'source-backed',
    featured: true,
    accent: 'violet',
    capabilities: ['prototype', 'harden', 'responsible-ai'],
    role: 'Team contributor; my individual ownership is deliberately unspecified',
    ownership: ['I contributed within the project team, and I deliberately claim no individual part of it.'],
    contributionBoundary:
      'I describe this project in team language because my individual role here is deliberately unspecified, and I do not present the hosted backend endpoint as a playable demo.',
    problem: 'A voice-led interrogation needs to react to uncertainty and emotion without equating fear with guilt.',
    hardDecision: 'We kept speech models and vendor credentials behind a hosted backend, accepting and documenting that player audio leaves the device.',
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
    slug: 'brawnix',
    name: 'Brawnix',
    oneLine:
      'A training log is worse than useless if the parser guesses, so I wrote an on-device rule grammar that returns nothing it cannot recognize and set explicit thresholds to flag sessions that fight each other.',
    logo: { kind: 'icon', src: '/projects/brawnix/logo.png', alt: 'Brawnix app icon' },
    status: 'live',
    featured: false,
    accent: 'coral',
    capabilities: ['ship', 'grow', 'prototype'],
    role: 'Technical growth product manager and product engineer',
    ownership: [
      'I built the deterministic on-device workout parser and rule-based interference engine.',
      'I built a mobile logging architecture on an unmerged parallel branch.',
      'I designed regional pricing and modelled product economics.',
    ],
    contributionBoundary:
      'The parser and interference engine are my deterministic code, not AI; a teammate owns the Gemini coach layer, and my parallel architecture branch never shipped to main.',
    problem: 'Hybrid athletes need one training log that can recognize workout structure and flag conflicting sessions without guessing.',
    hardDecision: 'I made the parser return no result when a log has no recognizable workout shape rather than invent one.',
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
    oneLine:
      'A study timer only earns its place if focus turns into recall and reach turns into use, so I instrumented the loop with subscriptions, localization, and analytics, all the way down to kill-or-scale gates.',
    logo: { kind: 'icon', src: '/projects/ingatik/logo.png', alt: 'Ingatik: Recall app icon' },
    status: 'live',
    featured: false,
    accent: 'cyan',
    capabilities: ['ship', 'grow'],
    role: 'Technical growth product manager and product contributor',
    ownership: [
      'I owned product decisions, subscriptions, pricing, analytics, localization, and campaign execution.',
      'I diagnosed the creator-campaign funnel and kept reported causes separate from measured experiments.',
      'I contributed product code, though I am not the principal author of the app.',
    ],
    contributionBoundary:
      'The product ownership, subscriptions, pricing, analytics, localization, campaign execution, and funnel diagnosis are mine; I am not the principal author of the app.',
    problem: 'A study timer must connect focus sessions to recall and retention while proving that reach can convert into product use.',
    hardDecision: 'I paused creator spend when 195.5K seven-day campaign views produced about 60 registrations and no paid users.',
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
    oneLine:
      'Overlooked games need specific criticism rather than encouragement, so I built a rubric pipeline that grounds every judgement in retrieved peers and labels its offline heuristic path all the way to the report.',
    logo: { kind: 'mark', name: 'joystick' },
    status: 'live',
    featured: false,
    accent: 'violet',
    capabilities: ['responsible-ai', 'harden', 'prototype'],
    role: 'AI Mentor owner and shared-architecture contributor in a three-person team',
    teamSize: 3,
    ownership: [
      'I own the current AI Mentor prompts, rubric, analysis pipeline, evaluation harness, and provider boundaries.',
      'I contributed to the shared monorepo architecture and cross-service contract.',
    ],
    contributionBoundary:
      'I claim only the current AI Mentor slice and my share of the architecture; the older RAG claims were never verified, so I do not reuse them.',
    problem: 'Finished games with little attention need specific, grounded feedback and a route to creators who could cover them.',
    hardDecision: 'I route offline analysis through the same contract as a provider call, but label it an offline heuristic all the way to the report.',
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
      { label: 'Release', value: 'Platform live at fames.site', source: 'live' },
      { label: 'Source', value: 'Public source with the AI Mentor slice and shared architecture', source: 'git' },
      { label: 'Offline path', value: 'Produces a complete contract-valid report without a model key', source: 'test' },
    ],
    limitations: [
      'No live model call or golden-set sweep has been run, and the mentor report UI is not built.',
    ],
    stack: ['Next.js', 'FastAPI', 'Python', 'TypeScript', 'Supabase', 'Postgres', 'Vitest', 'pytest'],
    links: { live: 'https://fames.site', source: 'https://github.com/zektron001/Fames.com' },
    media: [
      {
        src: '/projects/fames/quest-board.png',
        alt: 'Fames.com quest board on fames.site with a featured catalogue entry and the genre router',
        width: 1920,
        height: 860,
      },
    ],
    lastVerified: verifiedAug29,
  },
  {
    slug: 'steady',
    name: 'Steady',
    oneLine:
      'Long-horizon money decisions need arithmetic you can inspect, so I made every Singapore rule a versioned browser module carrying its official citation, and left the unfinished ones switched off.',
    logo: { kind: 'icon', src: '/projects/steady/logo.svg', alt: 'Steady app icon' },
    status: 'source-backed',
    featured: false,
    accent: 'jade',
    capabilities: ['harden', 'responsible-ai', 'ship'],
    role: 'Product engineer',
    ownership: [
      'I built the browser-based calculators and long-horizon projection engines.',
      'I encoded safety defaults for payments, user inputs, and incomplete legal or policy rules.',
    ],
    problem: 'Long-term Singapore financial decisions need inspectable calculations and policy context rather than a black-box recommendation.',
    hardDecision: 'I keep first- and second-year permanent-resident CPF calculations unavailable until I have implemented and verified the official graduated tables.',
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
    slug: 'math-me-home',
    name: 'Math Me Home',
    oneLine:
      'Two-player game flow has to be provable on hardware with no operating system underneath it, so I put every transition in an explicit finite-state machine written in Lucid HDL for an FPGA.',
    logo: { kind: 'mark', name: 'chip-plus' },
    status: 'source-backed',
    featured: false,
    accent: 'sunshine',
    capabilities: ['prototype', 'harden'],
    role: 'Hardware and game-logic engineer in a seven-person team',
    teamSize: 7,
    ownership: [
      'I designed and implemented the full game-logic finite-state machine.',
      'I integrated inputs, question generation, answer validation, scoring, displays, and board-level debugging.',
    ],
    contributionBoundary:
      'The game-logic finite-state machine and the hardware integration are mine; the rest of the build was shared with my team, and the second-place finish was the team’s.',
    problem: 'A two-player quiz needs deterministic game flow, scoring, and feedback on constrained physical hardware.',
    hardDecision: 'I expressed game flow as an explicit finite-state machine so I could reason about every transition and output on the board.',
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
    limitations: ['The game requires Alchitry Au FPGA hardware to run.'],
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
    oneLine:
      'A shell has to survive every kind of bad input without leaking, so I hand-wrote a command loop in C that forks, execs, and waits, freeing its parsed arguments on every pass.',
    logo: { kind: 'mark', name: 'prompt' },
    status: 'source-backed',
    featured: false,
    accent: 'jade',
    capabilities: ['prototype', 'harden'],
    role: 'Shell core owner in a three-person team',
    teamSize: 3,
    ownership: [
      'I built the read-evaluate-print loop, argument parsing, and the fork, exec, and wait path every external command travels.',
      'I implemented the startup configuration file, PATH resolution, command history, runtime English and Russian message switching, and the interactive prompt and line editor.',
    ],
    contributionBoundary:
      'The shell core and its startup, history, and input handling are mine; the bundled system programs were shared work across my team.',
    problem:
      'A shell has to keep accepting commands after every kind of bad input — a blank line, an unknown program, a directory change — without leaking memory or dying.',
    hardDecision:
      'I made the shell record its launch directory at startup and resolve bundled program paths against it, so it keeps finding its own commands after the user changes directory.',
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
    oneLine:
      'Searching across video and the web leaves you reconciling result lists by hand, so I queried providers in parallel and forced a ranking pass to return exactly one answer.',
    logo: { kind: 'mark', name: 'fan-in' },
    status: 'working-demo',
    featured: false,
    accent: 'violet',
    capabilities: ['prototype', 'harden'],
    role: 'Product engineer',
    ownership: [
      'I built concurrent search across YouTube and Brave Search.',
      'I built the AI ranking and answer-synthesis path, three-screen interface, and rate limiting.',
    ],
    problem: 'People searching across media and the web still have to reconcile several result lists before they can act.',
    hardDecision: 'I made the interface return a single result after concurrent provider fan-out and ranking.',
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
    outcomes: [
      { label: 'Automated checks', value: '57 tests across 9 test files', source: 'test' },
      { label: 'Deployment', value: 'Credentialed deployment answers live queries', source: 'live' },
    ],
    limitations: [
      'The deployment runs on my own provider keys, so throughput is bounded by my quotas.',
    ],
    stack: ['Next.js', 'TypeScript', 'OpenAI', 'YouTube API', 'Brave Search API', 'Vitest'],
    links: { live: 'https://one-search-chi.vercel.app' },
    media: [
      {
        src: '/projects/onesearch/search-screen.png',
        alt: 'OneSearch search screen with a query entered and the Video result type selected',
        width: 1100,
        height: 520,
      },
      {
        src: '/projects/onesearch/single-result.png',
        alt: 'OneSearch single-result answer card for a video, with open and reject actions',
        width: 776,
        height: 360,
      },
    ],
    lastVerified: verifiedAug29,
  },
  {
    slug: 'aegis',
    name: 'Aegis Risk Assessment Console',
    oneLine:
      'Managers and consultants need different views of the same risk catalogue, so I split the API with signed sessions and role middleware, and kept the database credential out of the browser.',
    logo: { kind: 'mark', name: 'shield' },
    status: 'source-backed',
    featured: false,
    accent: 'jade',
    capabilities: ['harden', 'prototype'],
    role: 'Full-stack assessment author',
    ownership: [
      'I built role-specific project-manager and risk-consultant workflows.',
      'I implemented the API, authentication and authorization, dashboard aggregation, schema, tests, and architecture documentation.',
    ],
    problem: 'Project managers and risk consultants need different views of the same threat catalogue and mitigation progress.',
    hardDecision: 'I never let the database service credential reach the browser; every request crosses an authenticated, role-aware API boundary.',
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
    slug: 'personal-workout-tracker',
    name: 'Personal Workout Tracker',
    oneLine:
      'A gym log stops being useful the moment it needs a network, so I built the whole tool as a service-worker PWA that keeps every set in local storage and never asks for an account.',
    logo: { kind: 'icon', src: '/projects/personal-workout-tracker/logo.png', alt: 'Personal Workout Tracker app icon' },
    status: 'source-backed',
    featured: false,
    accent: 'coral',
    capabilities: ['ship', 'prototype'],
    role: 'Solo personal-tool builder',
    ownership: [
      'I built the workout, set, repetition, and weight tracking interface.',
      'I implemented local persistence and offline PWA behavior.',
    ],
    problem: 'A personal training log needs to keep working in the gym without an account, backend, or network dependency.',
    hardDecision: 'I keep all workout data in local storage, trading cross-device sync for a tool that stays simple and works offline.',
    system: [
      {
        title: 'Workout log',
        detail: 'React screens organize training days, exercises, working sets, repetitions, and load.',
      },
      {
        title: 'Offline persistence',
        detail: 'A service worker caches the app while browser local storage keeps the user’s data on their own device.',
      },
    ],
    outcomes: [
      { label: 'Source', value: 'Public repository with a documented local run path', source: 'git' },
    ],
    limitations: ['Data is local to one browser profile and is not synchronized across devices.'],
    stack: ['React', 'Vite', 'JavaScript', 'PWA', 'Workbox', 'localStorage'],
    links: { source: 'https://github.com/AnandaTris/Personal-Workout-Tracker' },
    media: [
      {
        src: '/projects/personal-workout-tracker/session-picker.jpg',
        alt: 'Personal Workout Tracker session picker with four saved training days and a new-day card',
        width: 590,
        height: 1280,
      },
      {
        src: '/projects/personal-workout-tracker/progression-history.jpg',
        alt: 'Personal Workout Tracker progression history for one exercise, listing the best set and every set per session',
        width: 590,
        height: 1280,
      },
    ],
    lastVerified: verifiedAug29,
  },
]
