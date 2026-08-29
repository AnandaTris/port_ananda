# Portfolio screenshots

Full-page captures of every page in the portfolio, taken from a local production
build at 1440px width on 2026-08-29. Each image is the complete page, top to
bottom, with all scroll-reveal animations settled.

## Home

| File | Page |
| --- | --- |
| [home.png](home.png) | Homepage — hero, project index, work experience, tech stack, research, awards and grants, leadership, contact |

## Case studies (`/work/<slug>`)

Listed in the order they appear on the site.

| File | Project |
| --- | --- |
| [fix-yo-yap.png](fix-yo-yap.png) | Fix Yo Yap — speaking feedback gets ignored when it arrives as a bare number, so seven metrics drawn from transcription and pitch analysis resolve into a persona under a versioned scoring contract. |
| [carekaki.png](carekaki.png) | CareKaki — care navigation goes wrong when a model is trusted with consequences, so the LLM only listens and writes while deterministic rules route every action and hold the irreversible ones for a human. |
| [das-dial.png](das-dial.png) | DAS D.I.A.L. — screening should explain its uncertainty rather than hand back a diagnosis, so a local NLP pipeline extracts error patterns and explicit thresholds decide the verdict — or abstain from one. |
| [false-positive.png](false-positive.png) | FALSE POSITIVE — a voice interrogation has to answer hesitation without treating fear as guilt, so a Unity client talks to a hosted sidecar that reads meaning and vocal affect as two separate signals. |
| [brawnix.png](brawnix.png) | Brawnix — a training log is worse than useless if the parser guesses, so an on-device rule grammar returns nothing it cannot recognise and explicit thresholds flag sessions that fight each other. |
| [ingatik-recall.png](ingatik-recall.png) | Ingatik: Recall — a study timer only earns its place if focus turns into recall and reach turns into use, so subscriptions, localization, and analytics instrument the loop down to kill-or-scale gates. |
| [fames.png](fames.png) | Fames.com — overlooked games need specific criticism rather than encouragement, so a rubric pipeline grounds every judgement in retrieved peers and labels its offline heuristic path all the way to the report. |
| [steady.png](steady.png) | Steady — long-horizon money decisions need arithmetic you can inspect, so every Singapore rule is a versioned browser module carrying its official citation, and the unfinished ones stay switched off. |
| [math-me-home.png](math-me-home.png) | Math Me Home — two-player game flow has to be provable on hardware with no operating system underneath it, so every transition lives in an explicit finite-state machine written in Lucid HDL for an FPGA. |
| [cseshell.png](cseshell.png) | CSEShell — a shell has to survive every kind of bad input without leaking, so a hand-written command loop in C forks, execs, and waits, freeing its parsed arguments on every pass. |
| [onesearch.png](onesearch.png) | OneSearch — searching across video and the web leaves you reconciling result lists by hand, so providers are queried in parallel and a ranking pass is forced to return exactly one answer. |
| [aegis.png](aegis.png) | Aegis Risk Assessment Console — managers and consultants need different views of the same risk catalogue, so signed sessions and role middleware split the API and the database credential never reaches the browser. |
| [personal-workout-tracker.png](personal-workout-tracker.png) | Personal Workout Tracker — a gym log stops being useful the moment it needs a network, so the whole tool is a service-worker PWA that keeps every set in local storage and never asks for an account. |

## Retaking these

Build and serve the site (`npm run build`, then `npx next start --port 3789`),
then capture each page at 1440px wide with the viewport sized to the full page
height so nothing is downscaled. Scroll-reveal animations are `once: true`, so a
full-height viewport settles them before capture.

Serve from a port you have not used before in the same browser session. The
image optimizer sends a long `Cache-Control`, so a screenshot re-taken against
the same origin will keep showing the previous version of any asset whose file
changed but whose URL did not.
