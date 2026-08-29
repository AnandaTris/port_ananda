# Portfolio Motion Layer Design

**Date:** 29 August 2026
**Status:** Approved design, implementation pending
**Branch:** `feat/portfolio-motion`
**Supersedes:** nothing. Extends `2026-08-21-portfolio-design.md` §11 (Motion, accessibility, and responsiveness).

## 1. Summary

Add a motion layer to the portfolio without changing a single word of content,
one element of layout, or the reading order of any page.

The site currently has almost no motion. `motion` v12 is a dependency but is
used in exactly one component (`CountUp`); `globals.css` carries a handful of
hover lifts and a global `prefers-reduced-motion` kill switch. The
`feat: rebuild portfolio with plain sections` commit removed the Story / System
/ Proof lens, the filterable archive, and the orchestrated transitions that the
August 21 design called for, and added guard tests that fail if that vocabulary
returns.

This spec does not reverse that decision. The plain structure stays. What gets
added is entrance and hover motion on top of it.

## 2. Motion character

One character, applied everywhere, chosen from three live options:

| | |
| --- | --- |
| Curve | `cubic-bezier(0.34, 1.56, 0.64, 1)` — spring, overshoots |
| Duration | 720ms entrance, 380ms hover |
| Distance | 22px rise, from `scale(0.94)` |
| Stagger | 110ms per element, within one intersection batch, capped at 4 |

Cards arrive with weight and a small bounce. Hover tilts the card and kicks its
logo. This is deliberately the most playful of the options considered; the
restraint that keeps it from overwhelming an evidence-focused site comes from
§5, not from the curve.

## 3. Constraint that shapes the architecture

Two existing tests call home-page components as **plain functions**:

```ts
renderToStaticMarkup(<HomePage />)   // src/app/page.test.tsx:59
renderToStaticMarkup(ProjectIndex()) // src/content/status.test.ts:38
```

`ProjectIndex()` is invoked directly rather than rendered. The moment
`ProjectIndex` contains a React hook, that call throws. Commit `03c4820 fix:
restore server-rendered profile boundaries` records that pushing `'use client'`
up this tree has already caused one regression.

**Therefore: no hook may enter an existing server component.** Motion attaches
to server-rendered markup from the outside. This is a hard constraint, not a
preference, and it is why the design below looks the way it does.

## 4. Architecture

### 4.1 `RevealRoot`

`src/components/motion/RevealRoot.tsx` — one client component, mounted once in
`layout.tsx`. It wraps nothing and renders nothing.

On mount:

1. Read `prefers-reduced-motion` once, on mount. If reduced, **return
   immediately**: no class, no observer, no hidden elements, ever. Reduced
   motion is an early exit, not a shorter animation. The preference is not
   watched for changes mid-session; a visitor who toggles it gets the new
   behaviour on their next navigation.
2. Add `motion-ready` to the document element.
3. Create one `IntersectionObserver` over every `[data-reveal]` element.
4. On intersect: take the entries that are intersecting, sort them into
   document order (by `boundingClientRect.top`, then `left`), and for each one
   set `--reveal-index` to its position in that sorted batch, capped at 4. Then
   add `is-revealed` and unobserve it.

The index is **per intersection batch, not per parent**. Elements that come
into view together stagger against each other; an element that arrives alone
has index 0 and no delay. Indexing per parent would give the thirteenth project
card a delay of `12 x 110ms`, so it would enter the viewport and sit invisible
for over a second. The cap of 4 bounds the tail of any batch at 440ms.

Reveals fire once. Nothing replays on scroll back.

### 4.2 The no-blank-page rule

Reveal targets must never start hidden in the base stylesheet:

```css
/* Base state is visible. Only after JS proves it can reveal do we hide. */
.motion-ready [data-reveal]:not(.is-revealed) { opacity: 0 }
```

If JavaScript fails to load, the observer is unsupported, or `RevealRoot`
throws, `motion-ready` is never added and the site renders complete and static.
An `opacity: 0` base state would make a JS failure indistinguishable from a
blank portfolio.

### 4.3 Keyframe

```css
@keyframes reveal-rise {
  from { opacity: 0; transform: translateY(22px) scale(0.94) }
  to   { opacity: 1; transform: none }
}
```

Applied with the §2 curve and `animation-delay: calc(var(--reveal-index) * 110ms)`.

### 4.4 Why CSS rather than `motion/react`

The approved character was demonstrated in pure CSS, and CSS keeps every
existing component server-rendered, which §3 requires. `motion` stays a
dependency for `CountUp` and for the phase-2 route transition, where
interruptible motion genuinely earns the runtime.

## 5. Motion inventory

Server components change by exactly one thing: they gain a `data-reveal`
attribute.

**Home**

- Hero: portrait, name, tagline, links — same observer, but they are already
  in view at the top of the page, so the stagger reads as a page-load sequence
- Project cards: staggered on scroll
- Work experience, tech stack, research, awards, leadership, contact: heading
  and rows staggered on scroll
- Stack icons: staggered, with a hover pop

**Case study**

- Project title, facts strip, results cards, "What I owned" bullets,
  limitations, links
- Media: reveal only, no parallax
- Interactive excerpt panel: reveals when it loads

**Hover, pure CSS, no JavaScript**

- Project card: existing lift adopts the spring curve; the logo kicks to
  `rotate(-8deg) scale(1.12)`
- Stack icon: pop
- Excerpt load button: spring

**Retuned**

- `CountUp` keeps its observer and adopts the §2 curve, so the one animation
  that already existed stops being a stylistic outlier.

## 6. Guardrails

Inherited from `2026-08-21-portfolio-design.md` §11 and not overridden here:

- No scroll hijacking, no parallax, no custom cursor, no ambient loops
- Reveals fire once and never replay
- Only `transform` and `opacity` animate, so no layout shift and no CLS cost
- `prefers-reduced-motion` removes all of it, via the §4.1 early exit and the
  existing global CSS block
- Keyboard focus states are untouched; no motion gates access to any control

## 7. Testing

**`src/components/motion/RevealRoot.test.tsx`** — with a mocked
`IntersectionObserver`:

1. adds `motion-ready` to the document element
2. adds `is-revealed` when an element intersects
3. unobserves an element after revealing it, so reveals do not repeat
4. staggers a batch: three elements intersecting together get `--reveal-index`
   0, 1, 2 in document order, and an element intersecting alone gets 0
5. caps the stagger: the sixth element of one batch gets 4, not 5
6. under `prefers-reduced-motion: reduce`, adds no class, creates no observer,
   and hides nothing

**`src/app/globals.test.ts`** — one new guard, in the style of the repo's
existing dead-code guards:

> Fail if any rule setting `opacity: 0` on `[data-reveal]` exists outside a
> `.motion-ready` scope.

This encodes §4.2 as a test rather than a comment, because the failure it
prevents — an invisible portfolio — is silent and total.

**Regression bar:** all 88 existing tests pass unmodified. Any need to edit an
existing test means the §3 constraint was violated and the approach is wrong.

## 8. Files

**New**

- `src/components/motion/RevealRoot.tsx`
- `src/components/motion/RevealRoot.test.tsx`

**Modified**

- `src/app/layout.tsx` — mount `RevealRoot` once
- `src/app/globals.css` — keyframe, reveal gate, hover upgrades
- `src/app/globals.test.ts` — the §7 guard
- `src/components/motion/CountUp.tsx` — curve retune
- `data-reveal` attributes only: `home/Hero.tsx`, `home/ProjectIndex.tsx`,
  `home/ProfileSections.tsx`, `home/StackIcon.tsx`,
  `project/ProjectDetailPanel.tsx`, `project/ProjectMediaVisual.tsx`,
  `features/excerpts/DeferredExcerpt.tsx`

## 9. Out of scope

- **Route transitions** between home and case studies, including a card title
  morphing into the page title. Agreed as a separate phase so that the riskiest
  piece — Next.js 16 View Transitions under the App Router — cannot hold the
  rest of the motion layer hostage.
- Restoring the Story / System / Proof lens or the capability filters. Those
  were removed deliberately and are still fenced off by guard tests.
- Any change to copy, layout, reading order, or the palette.

## 10. Done means

- The character in §2 is visible on home and on every case study
- All 88 existing tests pass without modification, and the §7 tests pass
- Typecheck, lint, and build are clean
- With JavaScript disabled, every page renders complete and static
- With `prefers-reduced-motion: reduce`, nothing animates and nothing hides
