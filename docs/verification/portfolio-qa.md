# Portfolio QA record

**Run date:** 2026-08-22 (Asia/Singapore)

**Branch:** `feat/portfolio-build`

**Runtime used:** Node `v24.13.0`, satisfying the Node 22-or-newer prerequisite; npm `11.6.2`

**Target:** local production build at `http://localhost:3000`; no deployment was performed

## Automated checks

Baseline command:

```bash
npm test && npm run typecheck && npm run lint && npm run build
```

Result: pass. Vitest reported 20 test files and 74 tests passing. TypeScript and ESLint exited 0. Next.js 16.2.12 compiled and generated 22 static pages, including 17 `/work/[slug]` paths. The build emitted the existing informational warning that an edge-runtime page is not statically generated.

Focused regression after the only visual failure:

```bash
npm test -- src/app/globals.test.ts
npm run build
```

Result: pass. The focused file reported 2 tests passing, and the production rebuild completed.

Final command and result are recorded after the browser checks in [Final verification](#final-verification).

## Production server

```bash
npm start
```

Result: Next.js 16.2.12 served the production build on `http://localhost:3000` and reached `Ready` without terminal errors. QA used bounded PTY sessions and stopped only the exact owned server session before a rebuild or at completion.

## Functional browser QA

All interactions used `/Users/anandatriharismaroso/.codex/skills/gstack/browse/dist/browse`.

| Check | Result |
| --- | --- |
| Home response and work section | `200`; `#work` visible |
| Home console | Clean: `(no console errors)` after clearing prior expected 404 navigation entries and reloading |
| Lens URL state | Proof control produced `http://localhost:3000/?lens=proof#work` |
| Capability URL state | Keyboard Enter on Build and ship produced `?lens=story&capability=ship#work` |
| Collaboration CTA | `mailto:adotriharis@gmail.com?subject=Building%20something%20together`; click exercised |
| CareKaki route | `/work/carekaki` returned `200`; console clean |
| CareKaki excerpt | Explicit load succeeded. Input containing an NRIC, email, and phone rendered all three redaction markers and `Human approval required`; Reset restored an empty value, `No message entered.`, and `No approval needed` |
| Archive empty state | Search `definitely-no-such-evidence` produced `0 projects` and zero cards |
| Archive reset | Restored empty query, `all` maturity, `17 projects`, and 17 cards |
| Excluded route | `/work/docdeck` returned HTTP `404` and the branded `Missing field note · 404` experience with `Return to work` → `/#work` |
| DocDeck console note | Its expected main-document 404 is logged as a failed resource; there was no application exception. It was cleared before the final home-console check |

## Responsive and visual evidence

Commands:

```bash
/Users/anandatriharismaroso/.codex/skills/gstack/browse/dist/browse responsive /tmp/ananda-portfolio
/Users/anandatriharismaroso/.codex/skills/gstack/browse/dist/browse viewport 1440x900
/Users/anandatriharismaroso/.codex/skills/gstack/browse/dist/browse screenshot /tmp/ananda-portfolio-1440.png
```

Every generated image was opened with the image viewer after the final production rebuild.

| Viewport | Screenshot | Inspection |
| --- | --- | --- |
| 375×812 | `/tmp/ananda-portfolio-mobile.png` | Bright paper palette, clear vertical reading order, 375px document width at a 375px viewport, zero horizontal overflow |
| 768×1024 | `/tmp/ananda-portfolio-tablet.png` | Fieldbook cards retain project header, visual, lens evidence, and case-study action hierarchy |
| 1280×720 | `/tmp/ananda-portfolio-desktop.png` | Asymmetric fieldbook remains coherent; final hero bottom `712.55px` and proof bottom `683.75px` fit within the `720px` viewport |
| 1440×900 | `/tmp/ananda-portfolio-1440.png` | Bright Evidence Fieldbook composition remains editorial rather than a generic card wall; final hero bottom `772.52px` and proof bottom `736.52px` fit within the `900px` viewport |

Additional sticky evidence: `/tmp/ananda-portfolio-mobile-sticky.png` was opened with the image viewer. At 375×812 the sticky lens uses `top: 72px` beside a measured `73px` header. Centered fieldbook-heading geometry was lens bottom `257.27px`, heading top `353.38px`, and overlap `0px`.

At a 640px CSS viewport, representing a 1280px desktop at 200% browser zoom, the document measured 640px wide with zero horizontal overflow and zero clipped text elements.

## Concrete failure and fix

Initial production geometry failed the desktop fold requirement:

- 1280×720: hero bottom `1018.64px`, proof bottom `916.25px`
- 1440×900: hero bottom `1103.92px`, proof bottom `991.92px`

Root cause: desktop vertical padding was driven by `vw` and the title scale grew to `7.2vw`, producing a 728–789px copy column before the vertical padding was added.

Fix: `src/app/globals.css` now bounds desktop hero padding with viewport-height units and caps desktop title scale at the existing desktop breakpoint. `src/app/globals.test.ts` locks those two responsive rules. Focused tests and the production build passed before the responsive screenshots were regenerated.

## Reduced motion

The installed gstack binary denies `Emulation.setEmulatedMedia` through its audited CDP allowlist and exposes no first-class media-emulation command. Browser-only verification therefore used gstack page-context emulation before client navigation mounted the portfolio and initialized Motion, supplemented by the automated hydration/reduced-motion regression in `ProjectLensPanel.test.tsx`.

Observed result with `matchMedia('(prefers-reduced-motion)') === true`:

- five lens frames rendered
- zero `.lens-panel-frame-motion` nodes rendered
- every computed lens-frame transform was `none`
- every frame had no inline transform style
- changing to Proof updated the URL and all five headings to `Evidence and boundaries` without adding motion frames or transforms

## Keyboard access

A bounded gstack `chain` started with a fresh home navigation and used `Tab` and `Enter` only. Milestones, in DOM order:

1. `Skip to content`
2. site mark and header `Work` link
3. `Build and ship a product` capability button; Enter set `aria-pressed=true` and the shareable capability URL
4. Story, System, and Proof lens buttons; Enter on System settled at `?lens=system&capability=ship#work` with `aria-pressed=true`
5. featured `Explore case study` links
6. archive search, maturity select, reset button, and all 17 archive project links
7. `Start a collaboration brief`, focused with `href=mailto:adotriharis@gmail.com`; Enter launched the mailto navigation

Mobile keyboard flow at 375×812 separately verified: first Tab focused the skip link, then the site mark and menu toggle; Enter changed the toggle to `aria-expanded=true`, Tab reached `Work`, and Enter navigated to `#work`, closed the menu, and restored `aria-expanded=false`.

## Security audit triage

Read-only command:

```bash
npm audit
```

Result: npm exited 1 with three high-severity transitive findings under Next 16.2.12: bundled PostCSS advisories and Sharp/libvips advisories. The independently installed PostCSS is 8.5.26; the affected tree is Next's PostCSS 8.4.31 and Sharp 0.34.5.

No compatible in-range automated remediation exists for the exact approved `next@16.2.12` pin. npm offers only `npm audit fix --force`, which would install Next 16.3.2 outside that stated range. No dependency was changed. A planned Next upgrade must run the same complete suite and browser QA before landing.

## Final verification

```bash
npm test && npm run typecheck && npm run lint && npm run build && git diff --check
```

Result: pass. Vitest reported 20 test files and 75 tests passing. TypeScript, ESLint, Next production build, and `git diff --check` all exited 0; `git diff --check` printed nothing. The build generated the same 22-page route set and only the existing edge-runtime informational warning.

## Completion boundary

This record verifies local completion only. No deployment, publishing, external message, or credentialed service action was performed.
