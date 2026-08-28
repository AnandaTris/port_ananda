# Ananda Triharis Maroso — Portfolio

A bright, static portfolio of Ananda Triharis Maroso's product, AI, and technical-growth work. Every project has a page with three sections: Overview, Build, and Results.

## Prerequisite

- Node.js 22 or newer

## Local setup

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open `http://localhost:3000`.

## Full local check

```bash
npm test && npm run typecheck && npm run lint && npm run build && git diff --check
```

To inspect the production build locally after that command:

```bash
npm start
```

## Content rules

- Project content belongs in `src/content/projects.ts` and must satisfy the `Project` type in `src/content/types.ts`.
- Every project needs an honest status, role, ownership boundary, problem, hard decision, system description, outcomes, limitations, stack, media list, and verification date.
- Team work must use team language and must not turn a bounded contribution into a solo-ownership claim.
- Public URLs are entered once in the typed `links` object and only after the destination has been verified.
- Empty strings, placeholder URLs, speculative deployments, and unavailable repositories are not valid links.

## Asset provenance rules

- Store imported public media under `public/projects/<slug>/`.
- Add one matching entry to `src/content/assets.ts` with the public path, original source path, owning project, and factual description.
- Use only real project media whose public use and provenance can be explained. Do not fabricate screenshots to fill a layout.
- Preserve the designed typography/diagram fallback when a project has no approved media.

## Add a project safely

1. Add a unique typed record to `src/content/projects.ts` with every required field.
2. Add approved media and provenance entries, if any.
3. Add `live`, `appStore`, or `source` only when its exact public URL has been verified.
4. Leave an unavailable link property absent. The UI must never render an unverified button.
5. Extend content, filtering, metadata, sitemap, and route tests for the new slug and run the full local check.

## Five version-one exclusions

1. ChordGrab/ChordSnap
2. DocDeck
3. Pufferty Fish Robot
4. Meowtivation Task Manager
5. Multi-Linear Regression Energy Model

These records must not appear in typed content, generated routes, metadata, search results, or the sitemap without a new content review.

## Deployment boundary

Deployment is intentionally not part of local completion. Publishing requires a separate explicit deployment request and shipping workflow.
