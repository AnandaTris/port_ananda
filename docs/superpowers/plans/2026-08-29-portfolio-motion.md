# Portfolio Motion Layer Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add springy entrance and hover motion to every page of the portfolio without changing any content, layout, or reading order.

**Architecture:** A blocking inline script in `<head>` decides before first paint whether motion is allowed, adding a `motion-ready` class to `<html>`. CSS hides `[data-reveal]` elements only inside that class, so a page without JavaScript renders complete and static. One client component, `RevealRoot`, runs a single `IntersectionObserver` that reveals those elements as they arrive, staggering each intersection batch. Existing server components change by gaining a `data-reveal` attribute and nothing else.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, plain CSS in `src/app/globals.css`, Vitest + Testing Library, `motion` v12 (existing `CountUp` only).

**Spec:** `docs/superpowers/specs/2026-08-29-portfolio-motion-design.md`

## Global Constraints

- **No React hook may be added to an existing server component.** `src/content/status.test.ts:38` calls `renderToStaticMarkup(ProjectIndex())` — invoking the component as a plain function. Any hook inside it throws.
- **All 88 existing tests must pass unmodified.** Needing to edit an existing test means the approach is wrong; stop and report rather than editing the test.
- **Motion character, exact values:** curve `cubic-bezier(0.34, 1.56, 0.64, 1)`; entrance `720ms`; hover `380ms`; rise `22px` from `scale(0.94)`; stagger `110ms` per element within one intersection batch, capped at index `4`.
- **No `[data-reveal]` element may be hidden outside a `.motion-ready` scope.** An `opacity: 0` base state turns a JS failure into a blank portfolio.
- Only `transform` and `opacity` animate. No layout properties, no parallax, no scroll hijacking, no ambient loops, no custom cursor.
- Reveals fire once and never replay.
- Branch: `feat/portfolio-motion`. Commit after every task.
- Verify with `npx tsc --noEmit`, `npm run lint`, `npx vitest run`. Never `npx next lint`.

**Out of scope** (spec §9). If a task seems to call for one of these, the task has been misread:

- Route transitions between home and case studies, including a card title morphing into the page title. Deferred to a later phase so that Next.js 16 View Transitions cannot hold the rest of the motion layer hostage.
- Restoring the Story / System / Proof lens or the capability filters. Removed deliberately in `e1619ef`, and still fenced off by guard tests in `page.test.tsx:105` and `ProjectDetailPanel.test.tsx:19`.
- Any change to copy, layout, reading order, or the palette.

---

### Task 1: The pre-paint `motion-ready` decision

**Files:**
- Create: `src/components/motion/motion-ready.ts`
- Test: `src/components/motion/motion-ready.test.ts`

**Interfaces:**
- Consumes: nothing.
- Produces: `MOTION_READY_SCRIPT: string` — the source of an IIFE that adds the class `motion-ready` to `document.documentElement`. Task 2 inlines this string into `<head>`. Task 3's `RevealRoot` reads the class it sets.

- [ ] **Step 1: Write the failing test**

`src/components/motion/motion-ready.test.ts`:

```ts
import { MOTION_READY_SCRIPT } from './motion-ready'

function runScript() {
  // The script ships as a string inside a <script> tag, so the only honest way
  // to test it is to execute it the way the browser will.
  new Function(MOTION_READY_SCRIPT)()
}

function stubMatchMedia(reduced: boolean) {
  vi.stubGlobal(
    'matchMedia',
    vi.fn(() => ({ matches: reduced })),
  )
}

beforeEach(() => {
  document.documentElement.className = ''
  stubMatchMedia(false)
})

afterEach(() => {
  vi.unstubAllGlobals()
})

test('marks the document ready when motion is allowed', () => {
  runScript()

  expect(document.documentElement.classList.contains('motion-ready')).toBe(true)
})

test('marks nothing when the visitor asked for reduced motion', () => {
  stubMatchMedia(true)

  runScript()

  expect(document.documentElement.classList.contains('motion-ready')).toBe(false)
})

test('marks nothing when IntersectionObserver is missing', () => {
  // Without an observer nothing would ever reveal, so hiding anything would
  // leave the page permanently blank.
  vi.stubGlobal('IntersectionObserver', undefined)

  runScript()

  expect(document.documentElement.classList.contains('motion-ready')).toBe(false)
})

test('never throws, whatever the environment reports', () => {
  vi.stubGlobal('matchMedia', undefined)

  expect(runScript).not.toThrow()
  expect(document.documentElement.classList.contains('motion-ready')).toBe(false)
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/components/motion/motion-ready.test.ts`
Expected: FAIL — cannot resolve `./motion-ready`.

- [ ] **Step 3: Write minimal implementation**

`src/components/motion/motion-ready.ts`:

```ts
/**
 * Runs in <head>, before the first paint, and decides whether this visit
 * animates at all.
 *
 * It cannot be a React effect. Effects run after hydration, so the browser
 * would paint the server HTML fully visible, hydration would hide every reveal
 * target, and the page would animate content that the visitor had already seen
 * — a flash of appearing, vanishing, and re-appearing content on any connection
 * slow enough to separate paint from hydration.
 *
 * Everything downstream keys off the class this sets, so failing to set it is
 * always the safe outcome: no class means no hiding and no animation.
 */
export const MOTION_READY_SCRIPT = `(function () {
  try {
    if (typeof IntersectionObserver === 'undefined') return
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
    document.documentElement.classList.add('motion-ready')
  } catch (error) {
    /* An unreadable preference is not a reason to hide the page. */
  }
})()`
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `npx vitest run src/components/motion/motion-ready.test.ts`
Expected: PASS, 4 tests.

- [ ] **Step 5: Commit**

```bash
git add src/components/motion/motion-ready.ts src/components/motion/motion-ready.test.ts
git commit -m "feat(motion): decide motion-ready before first paint"
```

---

### Task 2: The stylesheet gate and its guard test

**Files:**
- Modify: `src/app/globals.css` (append near the existing `prefers-reduced-motion` block at the end of the file)
- Modify: `src/app/globals.test.ts` (append)

**Interfaces:**
- Consumes: the `motion-ready` class from Task 1.
- Produces: the class `is-revealed` and the custom property `--reveal-index`, both set by Task 3's `RevealRoot`; the attribute `data-reveal`, added to markup in Tasks 4 and 5.

- [ ] **Step 1: Write the failing guard test**

Append to `src/app/globals.test.ts`:

```ts
test('hides reveal targets only after JavaScript has proven it can reveal them', () => {
  // Every rule that hides a [data-reveal] element must be scoped to
  // .motion-ready. Unscoped, a JS failure is indistinguishable from a blank
  // portfolio: the content is served, painted, and then never revealed.
  const hidingRules = stylesheet
    .split('}')
    .filter((rule) => rule.includes('[data-reveal]') && /opacity:\s*0\b/.test(rule))

  expect(hidingRules.length).toBeGreaterThan(0)
  for (const rule of hidingRules) {
    expect(rule).toContain('.motion-ready')
  }
})

test('reveals with the approved spring curve rather than a default ease', () => {
  expect(stylesheet).toContain('cubic-bezier(0.34, 1.56, 0.64, 1)')
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/app/globals.test.ts`
Expected: FAIL — `expect(hidingRules.length).toBeGreaterThan(0)` receives `0`.

- [ ] **Step 3: Write the CSS**

Append to `src/app/globals.css`, immediately **before** the existing `@media (prefers-reduced-motion: reduce)` block so that block keeps the last word:

```css
/* Motion layer.
   Base state is visible. Only after the head script confirms the visitor wants
   motion and the browser can deliver it does anything hide, so a page with no
   JavaScript renders complete and static. */
.motion-ready [data-reveal]:not(.is-revealed) {
  opacity: 0;
}

.motion-ready [data-reveal].is-revealed {
  animation: reveal-rise 720ms cubic-bezier(0.34, 1.56, 0.64, 1) backwards;
  animation-delay: calc(var(--reveal-index, 0) * 110ms);
}

@keyframes reveal-rise {
  from {
    opacity: 0;
    transform: translateY(22px) scale(0.94);
  }

  to {
    opacity: 1;
    transform: none;
  }
}
```

`backwards` matters: it holds the `from` state during the stagger delay. Without it a delayed card would flash at full opacity before its animation began.

- [ ] **Step 4: Run tests to verify they pass**

Run: `npx vitest run src/app/globals.test.ts`
Expected: PASS, 4 tests in the file.

- [ ] **Step 5: Verify nothing else moved**

Run: `npx vitest run && npx tsc --noEmit && npm run lint`
Expected: 94 tests pass — the 88 originals, 4 from Task 1, 2 from this task. Typecheck and lint clean. What matters is not the total but that **no previously passing test now fails**.

- [ ] **Step 6: Commit**

```bash
git add src/app/globals.css src/app/globals.test.ts
git commit -m "feat(motion): add the reveal keyframe behind a motion-ready gate"
```

---

### Task 3: `RevealRoot` and the batch stagger

**Files:**
- Create: `src/components/motion/RevealRoot.tsx`
- Test: `src/components/motion/RevealRoot.test.tsx`

**Interfaces:**
- Consumes: the `motion-ready` class (Task 1), the `is-revealed` class and `--reveal-index` property (Task 2).
- Produces: `RevealRoot(): null` — a client component taking no props, mounted once by Task 4.

- [ ] **Step 1: Write the failing test**

`src/components/motion/RevealRoot.test.tsx`:

```tsx
import { render } from '@testing-library/react'
import { RevealRoot } from './RevealRoot'

let callback: IntersectionObserverCallback | undefined
let observed: Element[] = []
let unobserved: Element[] = []
let observerCount = 0

class MockIntersectionObserver {
  constructor(cb: IntersectionObserverCallback) {
    callback = cb
    observerCount += 1
  }
  observe(element: Element) {
    observed.push(element)
  }
  unobserve(element: Element) {
    unobserved.push(element)
  }
  disconnect() {}
}

/** An entry whose rect places it at a known point, so document order is testable. */
function entryAt(target: Element, top: number, left = 0) {
  return {
    target,
    isIntersecting: true,
    boundingClientRect: { top, left } as DOMRectReadOnly,
  } as IntersectionObserverEntry
}

function addTargets(count: number) {
  const targets: HTMLElement[] = []
  for (let index = 0; index < count; index += 1) {
    const element = document.createElement('div')
    element.setAttribute('data-reveal', '')
    document.body.append(element)
    targets.push(element)
  }
  return targets
}

beforeEach(() => {
  callback = undefined
  observed = []
  unobserved = []
  observerCount = 0
  document.body.innerHTML = ''
  document.documentElement.className = 'motion-ready'
  vi.stubGlobal('IntersectionObserver', MockIntersectionObserver)
})

afterEach(() => {
  vi.unstubAllGlobals()
})

test('observes every reveal target with a single observer', () => {
  const targets = addTargets(3)

  render(<RevealRoot />)

  expect(observerCount).toBe(1)
  expect(observed).toEqual(targets)
})

test('reveals an element when it arrives and stops watching it', () => {
  const [target] = addTargets(1)
  render(<RevealRoot />)

  callback?.([entryAt(target, 100)], {} as IntersectionObserver)

  expect(target.classList.contains('is-revealed')).toBe(true)
  expect(unobserved).toEqual([target])
})

test('staggers a batch in document order, not observer order', () => {
  const [first, second, third] = addTargets(3)
  render(<RevealRoot />)

  // Deliberately out of order: the observer makes no ordering promise.
  callback?.(
    [entryAt(third, 300), entryAt(first, 100), entryAt(second, 200)],
    {} as IntersectionObserver,
  )

  expect(first.style.getPropertyValue('--reveal-index')).toBe('0')
  expect(second.style.getPropertyValue('--reveal-index')).toBe('1')
  expect(third.style.getPropertyValue('--reveal-index')).toBe('2')
})

test('ties rows by horizontal position so a grid cascades left to right', () => {
  const [left, right] = addTargets(2)
  render(<RevealRoot />)

  callback?.([entryAt(right, 100, 400), entryAt(left, 100, 0)], {} as IntersectionObserver)

  expect(left.style.getPropertyValue('--reveal-index')).toBe('0')
  expect(right.style.getPropertyValue('--reveal-index')).toBe('1')
})

test('gives an element arriving alone no delay', () => {
  const [first, second] = addTargets(2)
  render(<RevealRoot />)

  callback?.([entryAt(first, 100)], {} as IntersectionObserver)
  callback?.([entryAt(second, 900)], {} as IntersectionObserver)

  expect(second.style.getPropertyValue('--reveal-index')).toBe('0')
})

test('caps the stagger so a large batch has no long invisible tail', () => {
  // Thirteen project cards at 110ms each would leave the last one blank for
  // 1.3 seconds after it had already scrolled into view.
  const targets = addTargets(8)
  render(<RevealRoot />)

  callback?.(
    targets.map((target, index) => entryAt(target, index * 100)),
    {} as IntersectionObserver,
  )

  expect(targets[4].style.getPropertyValue('--reveal-index')).toBe('4')
  expect(targets[7].style.getPropertyValue('--reveal-index')).toBe('4')
})

test('ignores entries that are leaving the viewport', () => {
  const [target] = addTargets(1)
  render(<RevealRoot />)

  callback?.(
    [{ ...entryAt(target, 100), isIntersecting: false } as IntersectionObserverEntry],
    {} as IntersectionObserver,
  )

  expect(target.classList.contains('is-revealed')).toBe(false)
  expect(unobserved).toEqual([])
})

test('does nothing at all when the document was never marked motion-ready', () => {
  // Reduced motion, a missing observer, or a page where the head script never
  // ran all land here, and all of them must leave the content visible.
  document.documentElement.className = ''
  const [target] = addTargets(1)

  render(<RevealRoot />)

  expect(observerCount).toBe(0)
  expect(target.classList.contains('is-revealed')).toBe(false)
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/components/motion/RevealRoot.test.tsx`
Expected: FAIL — cannot resolve `./RevealRoot`.

- [ ] **Step 3: Write minimal implementation**

`src/components/motion/RevealRoot.tsx`:

```tsx
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
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `npx vitest run src/components/motion/RevealRoot.test.tsx`
Expected: PASS, 8 tests.

- [ ] **Step 5: Commit**

```bash
git add src/components/motion/RevealRoot.tsx src/components/motion/RevealRoot.test.tsx
git commit -m "feat(motion): reveal elements on arrival with a batch stagger"
```

---

### Task 4: Wire both pieces into the layout

**Files:**
- Modify: `src/app/layout.tsx:52-62` (the `RootLayout` return)

**Interfaces:**
- Consumes: `MOTION_READY_SCRIPT` (Task 1), `RevealRoot` (Task 3).
- Produces: a live motion layer. No element carries `data-reveal` yet, so the site is unchanged visually — that is the point of landing this separately.

- [ ] **Step 1: Add the imports**

In `src/app/layout.tsx`, alongside the existing component imports at lines 3-4:

```ts
import { MOTION_READY_SCRIPT } from '@/components/motion/motion-ready'
import { RevealRoot } from '@/components/motion/RevealRoot'
```

- [ ] **Step 2: Render the script and the observer**

Replace the `RootLayout` return body:

```tsx
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html className={archivo.variable} lang="en">
      <head>
        {/* Blocking on purpose: this has to settle before the first paint, or
            the page paints visible, hides itself on hydration, and animates
            content the reader has already seen. */}
        <script dangerouslySetInnerHTML={{ __html: MOTION_READY_SCRIPT }} />
      </head>
      <body className="site-body">
        <SiteHeader />
        {children}
        <SiteFooter />
        <RevealRoot />
      </body>
    </html>
  )
}
```

- [ ] **Step 3: Verify the whole suite is untouched**

Run: `npx vitest run && npx tsc --noEmit && npm run lint`
Expected: every test passes, including all 88 originals. Typecheck and lint clean.

- [ ] **Step 4: Verify the script actually reaches the page**

```bash
npm run build && npx next start --port 3811 &
sleep 4
curl -s http://localhost:3811/ | grep -c "motion-ready"
```

Expected: at least `1` — the inline script is present in the served HTML.
Then stop the server.

- [ ] **Step 5: Commit**

```bash
git add src/app/layout.tsx
git commit -m "feat(motion): mount the reveal observer and head script"
```

---

### Task 5: Reveal the home page

**Files:**
- Modify: `src/components/home/Hero.tsx`
- Modify: `src/components/home/ProjectIndex.tsx`
- Modify: `src/components/home/ProfileSections.tsx`

**Interfaces:**
- Consumes: the `data-reveal` attribute contract from Task 2.
- Produces: nothing other tasks depend on.

Add `data-reveal` and nothing else. No imports, no hooks, no wrappers, no
markup changes — if a change to one of these files is larger than an attribute,
it is out of scope for this task.

- [ ] **Step 1: Annotate the hero**

In `src/components/home/Hero.tsx`, add `data-reveal` to the `<figure className="hero-portrait">` and to each direct child of `.hero-copy`: the `<h1>`, the `<p className="hero-tagline">`, and the `<ul className="hero-links">`. They are in view on load, so they arrive as one batch and read as a page-load sequence.

- [ ] **Step 2: Annotate the project index**

In `src/components/home/ProjectIndex.tsx`, add `data-reveal` to the `<div className="section-heading section-heading-counted">` and to the `<li>` inside the `projects.map(...)`:

```tsx
<li data-reveal key={project.slug}>
```

Put it on the `<li>`, not the `<article>`: the `<li>` is the grid item, so the transform applies to the whole cell.

- [ ] **Step 3: Annotate the profile sections**

In `src/components/home/ProfileSections.tsx`:
- add `data-reveal` to the `<div className="section-heading">` inside the shared `SectionTitle` component (line 25). One edit covers every section, because all six sections render their heading through it:

  ```tsx
  function SectionTitle({ children, id }: { children: string; id: string }) {
    return (
      <div className="section-heading" data-reveal>
        <h2 id={id}>{children}</h2>
      </div>
    )
  }
  ```

- add `data-reveal` to the top-level `<li>` of the `<ol className="experience-timeline">` (line 40)
- add `data-reveal` to each `<section className="stack-group">` inside `.stack-groups` (line 77) — the group, not the chips inside it
- add `data-reveal` to the `<li>` of each `profile-compact-list`: `Research` (line 107), `AwardsAndGrants` (line 131), `Leadership` (line 154)
- add `data-reveal` to `<div className="contact-details">` (line 185)

Do **not** annotate the nested `<li>` highlight bullets inside an experience or research entry, and do **not** annotate the individual stack chips. They arrive with their parent, and annotating both makes an element animate inside an element that is itself animating.

**Deviation from the spec, on purpose:** spec §8 lists `home/StackIcon.tsx` among the files gaining `data-reveal`. Do not touch that file. The tech-stack section holds roughly forty chips, so per-icon reveals would land as one batch of forty inside a `.stack-group` that is itself mid-animation — the exact nesting the paragraph above forbids. The icons still get their hover pop in Task 7, which needs no change to the component because the pop is pure CSS on `.stack-icon`.

- [ ] **Step 4: Verify the suite**

Run: `npx vitest run && npx tsc --noEmit && npm run lint`
Expected: all tests pass unmodified — `page.test.tsx` and `status.test.ts` in particular, since they render these exact components.

- [ ] **Step 5: Look at it**

```bash
npm run build && npx next start --port 3812
```

Load `http://localhost:3812/`, scroll the whole page once. Check: the hero staggers on load; project cards cascade left to right as each row arrives; no card sits blank; nothing shifts horizontally or changes height.

- [ ] **Step 6: Commit**

```bash
git add src/components/home
git commit -m "feat(motion): reveal the home page on arrival"
```

---

### Task 6: Reveal the case studies

**Files:**
- Modify: `src/app/work/[slug]/page.tsx:84-104`
- Modify: `src/components/project/ProjectDetailPanel.tsx`
- Modify: `src/components/project/ProjectMediaVisual.tsx`
- Modify: `src/features/excerpts/DeferredExcerpt.tsx`

**Interfaces:**
- Consumes: the `data-reveal` attribute contract from Task 2.
- Produces: nothing other tasks depend on.

- [ ] **Step 1: Annotate the case-study hero**

In `src/app/work/[slug]/page.tsx`, add `data-reveal` to `<div className="case-study-identity">` and `<div className="case-study-headline">`.

- [ ] **Step 2: Annotate the detail panel**

In `src/components/project/ProjectDetailPanel.tsx`, add `data-reveal` to:
- `<header className="detail-panel-heading">` (line 187)
- each `<div>` wrapping a `<dt>`/`<dd>` pair inside `<dl className="detail-facts">` (lines 46 and 50). The wrappers already exist, so this is an attribute and nothing more:

  ```tsx
  <dl className="detail-facts">
    <div data-reveal>
      <dt>Problem</dt>
      <dd>{project.problem}</dd>
    </div>
    <div data-reveal>
      <dt>Hard decision</dt>
      <dd>{project.hardDecision}</dd>
    </div>
  </dl>
  ```

- each `<li>` in `<ol className="system-decisions">` (line 63)
- `<div className="detail-stack">` (line 73)
- each `<div>` wrapping a `<dt>`/`<dd>` pair inside `<dl className="result-facts">` — five of them, two of which (`Team`, `Team boundary`) render conditionally; annotate those too
- the four children of `<div className="result-groups">`: `<div className="result-outcomes">` (line 125), the unclassed `<div>`s holding "What I owned" (line 137) and "Limitations" (line 145), and `<div className="result-links">` (line 154)

- [ ] **Step 3: Annotate the media**

In `src/components/project/ProjectMediaVisual.tsx`, add `data-reveal` to two elements:
- the `<figure className="case-study-visual case-study-media">` (line 42)
- the fallback, which is a `<div role="img" className="case-study-visual case-study-diagram project-media-fallback">` (line 77) — a `div`, not a `figure`

Reveal only — no scale-on-scroll, no parallax.

- [ ] **Step 4: Annotate the excerpt**

In `src/features/excerpts/DeferredExcerpt.tsx`, add `data-reveal` to `<div className="interactive-excerpt interactive-excerpt-deferred">` (line 76).

Note the limit and leave it: an excerpt that loads *after* `RevealRoot` has already scanned the DOM will not be observed, so the loaded excerpt itself does not reveal. That is correct behaviour here — it appears in response to a click, which is its own feedback. Do not add a re-scan for it.

- [ ] **Step 5: Verify the suite**

Run: `npx vitest run && npx tsc --noEmit && npm run lint`
Expected: all tests pass unmodified, `ProjectDetailPanel.test.tsx` and `ExcerptRegistry.test.tsx` included.

- [ ] **Step 6: Look at it**

```bash
npm run build && npx next start --port 3813
```

Load `http://localhost:3813/work/carekaki` and `http://localhost:3813/work/math-me-home`. Check the facts strip staggers across, results cards cascade, media reveals without shifting, and the excerpt panel reveals before it is loaded.

- [ ] **Step 7: Commit**

```bash
git add "src/app/work/[slug]/page.tsx" src/components/project src/features/excerpts
git commit -m "feat(motion): reveal case-study sections on arrival"
```

---

### Task 7: Hover micro-interactions and the `CountUp` retune

**Files:**
- Modify: `src/app/globals.css:2114-2120` (the existing `.project-card` transition and hover, in place)
- Modify: `src/app/globals.css` (the motion block from Task 2, appended to)
- Modify: `src/components/motion/CountUp.tsx:31-32`

**Interfaces:**
- Consumes: the curve constant from Global Constraints.
- Produces: nothing other tasks depend on.

Two placements, and the difference matters. The `.project-card` rules already
exist at 2114-2120, so **edit them in place** — appending an overriding copy
would leave a dead 180ms rule behind, and this repo's guard tests exist because
dead CSS has caused trouble here before. Everything genuinely new goes in the
motion block added in Task 2, which sits after `.excerpt-load`'s existing
transition and so wins on order.

- [ ] **Step 1: Give the card hover the spring and the logo kick**

Replace the existing rules at `src/app/globals.css:2114-2120` — currently:

```css
.project-card {
  transition: box-shadow 180ms ease, transform 180ms ease;
}

.project-card:hover {
  box-shadow: var(--shadow-lift);
  transform: translateY(-4px) rotate(-0.4deg);
}
```

with:

```css
.project-card {
  transition: box-shadow 380ms ease, transform 380ms cubic-bezier(0.34, 1.56, 0.64, 1);
}

.project-card:hover {
  box-shadow: var(--shadow-lift);
  transform: translateY(-7px) scale(1.015) rotate(-0.5deg);
}
```

Leave the `.project-card h3` underline rules at 2125-2137 exactly as they are.
That transition animates `background-size`, and a curve that overshoots would
push the underline past the width of the word and pull it back.

- [ ] **Step 2: Kick the logo, pop the stack icons, spring the excerpt buttons**

Append to the motion block in `src/app/globals.css`, after the `reveal-rise`
keyframe and still **before** the `@media (prefers-reduced-motion: reduce)`
block:

```css
/* The logo is the one thing on a card that belongs to the project rather than
   to the page chrome, so it is the thing that reacts. */
.project-logo {
  transition: transform 380ms cubic-bezier(0.34, 1.56, 0.64, 1);
}

.project-card:hover .project-logo {
  transform: rotate(-8deg) scale(1.12);
}

.stack-icon {
  transition: transform 380ms cubic-bezier(0.34, 1.56, 0.64, 1);
}

.stack-group li:hover > .stack-icon {
  transform: scale(1.18) rotate(-6deg);
}

/* Overrides the shared `transition: background 140ms ease` these two buttons
   already carry, by coming later in the file at equal specificity. */
.excerpt-reset,
.excerpt-load {
  transition: transform 380ms cubic-bezier(0.34, 1.56, 0.64, 1), background 140ms ease;
}

.excerpt-reset:hover:not(:disabled),
.excerpt-load:hover:not(:disabled) {
  transform: translateY(-2px) scale(1.03);
}
```

Three details worth not getting wrong:

- `.project-logo` is a `<span>`, but `globals.css:379` already gives it a
  non-inline display and a fixed box, so `transform` applies.
- `.stack-group li:hover > .stack-icon` is scoped to the stack groups on
  purpose. A bare `li:hover > .stack-icon` would reach anywhere the icon is
  reused later.
- `:not(:disabled)` matters: `DeferredExcerpt.tsx:86` sets `disabled={isLoading}`,
  and a button that springs while it is refusing clicks reads as broken.
  `.excerpt-reset` is included because it is the same button in the same
  component, and springing one but not the other is the kind of inconsistency
  nobody can name but everybody notices.

- [ ] **Step 3: Retune `CountUp` to the same curve**

In `src/components/motion/CountUp.tsx:31-32`, replace:

```ts
          ease: [0.22, 1, 0.36, 1],
          onUpdate: (latest) => setValue(Math.round(latest)),
```

with:

```ts
          // The same spring the reveals use, so the one animation that predates
          // the motion layer stops being a stylistic outlier. The clamp is what
          // the overshoot costs: without it the counter briefly displays a
          // number larger than the number of projects that exist.
          ease: [0.34, 1.56, 0.64, 1],
          onUpdate: (latest) => setValue(Math.min(target, Math.round(latest))),
```

- [ ] **Step 4: Verify**

Run: `npx vitest run && npx tsc --noEmit && npm run lint`
Expected: all pass.

- [ ] **Step 5: Look at it**

Rebuild, hover several project cards, several stack chips, and an excerpt load button. Watch the project count in the projects heading through a full count-up and confirm it never displays a number above the real project count.

- [ ] **Step 6: Commit**

```bash
git add src/app/globals.css src/components/motion/CountUp.tsx
git commit -m "feat(motion): spring the hover states and align CountUp's curve"
```

---

### Task 8: Prove the guarantees, then re-shoot the screenshots

**Files:**
- Modify: `docs/screenshots/*.png` (regenerate)

**Interfaces:**
- Consumes: everything above.
- Produces: the evidence that the branch is done.

- [ ] **Step 1: Full gate**

Run: `npx tsc --noEmit && npm run lint && npx vitest run && npm run build`
Expected: clean, all tests pass, 18 static pages.

- [ ] **Step 2: Prove the no-JavaScript guarantee**

Serve the build, then in the browser disable JavaScript and load `/` and one `/work/<slug>`.
Expected: every section is fully visible and readable. Nothing is blank. This is the single failure this whole design exists to prevent, so check it by eye rather than trusting the test.

- [ ] **Step 3: Prove the reduced-motion guarantee**

With JavaScript back on, enable `prefers-reduced-motion: reduce` at the OS level (macOS: System Settings → Accessibility → Display → Reduce motion), hard-reload `/`.
Expected: `<html>` has no `motion-ready` class, nothing animates, nothing is ever hidden, and the page is complete on arrival.

- [ ] **Step 4: Check for layout shift**

In DevTools, record a Performance trace of a full-page scroll of `/`.
Expected: Cumulative Layout Shift stays at 0. Reveals animate `transform` and `opacity` only, so any shift means something in Tasks 5–7 animated a layout property.

- [ ] **Step 5: Re-shoot the screenshots**

All 14 captures in `docs/screenshots/` are full-page images at 1440px from a
local production build. For each page: set `viewport 1440x900`, `goto` the page,
read `document.documentElement.scrollHeight`, set `viewport 1440x<height>`,
`goto` again, then capture with `screenshot --viewport`.

**The motion layer adds one step.** At a viewport as tall as the page, every
`[data-reveal]` element intersects at once, so they all animate on load — up to
`4 x 110ms` of stagger plus `720ms` of animation. Wait at least **1.5 seconds
after the second `goto`** before capturing, or the images will catch the page
mid-reveal with sections at partial opacity. Check the first capture by eye
before shooting the other thirteen.

The README's existing line — "with all scroll-reveal animations settled" —
already describes this, so it needs no edit.

- [ ] **Step 6: Commit**

```bash
git add docs/screenshots
git commit -m "docs: regenerate screenshots with the motion layer"
```

- [ ] **Step 7: Push**

```bash
git push -u origin feat/portfolio-motion
```
