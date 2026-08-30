# Portfolio screenshots

Full-page captures of every page in the portfolio, taken from a local production
build at 1440px width on 2026-08-30. Each image is the complete page, top to
bottom, with all scroll-reveal animations settled.

## Home

| File | Page |
| --- | --- |
| [home.png](home.png) | Homepage — hero, project index, work experience, tech stack, research, awards and grants, leadership, contact |

## Case studies (`/work/<slug>`)

Listed in the order they appear on the site.

| File | Project |
| --- | --- |
| [fix-yo-yap.png](fix-yo-yap.png) | Fix Yo Yap — speaking feedback is easy to ignore when it arrives as a bare number, so I turned seven metrics from transcription and pitch analysis into a persona under a versioned scoring contract. |
| [carekaki.png](carekaki.png) | CareKaki — care navigation goes wrong when a model is trusted with consequences, so we let the LLM only listen and write while deterministic rules route every action and hold the irreversible ones for a human. |
| [das-dial.png](das-dial.png) | DAS D.I.A.L. — screening should explain its uncertainty rather than hand back a diagnosis, so I built a local NLP pipeline that extracts error patterns and let explicit thresholds decide the verdict — or abstain from one. |
| [false-positive.png](false-positive.png) | FALSE POSITIVE — a voice interrogation has to answer hesitation without treating fear as guilt, so we had a Unity client talk to a hosted sidecar that reads meaning and vocal affect as two separate signals. |
| [brawnix.png](brawnix.png) | Brawnix — a training log is worse than useless if the parser guesses, so I wrote an on-device rule grammar that returns nothing it cannot recognize and set explicit thresholds to flag sessions that fight each other. |
| [ingatik-recall.png](ingatik-recall.png) | Ingatik: Recall — a study timer only earns its place if focus turns into recall and reach turns into use, so I instrumented the loop with subscriptions, localization, and analytics, all the way down to kill-or-scale gates. |
| [fames.png](fames.png) | Fames.com — overlooked games need specific criticism rather than encouragement, so I built a rubric pipeline that grounds every judgement in retrieved peers and labels its offline heuristic path all the way to the report. |
| [steady.png](steady.png) | Steady — long-horizon money decisions need arithmetic you can inspect, so I made every Singapore rule a versioned browser module carrying its official citation, and left the unfinished ones switched off. |
| [math-me-home.png](math-me-home.png) | Math Me Home — two-player game flow has to be provable on hardware with no operating system underneath it, so I put every transition in an explicit finite-state machine written in Lucid HDL for an FPGA. |
| [cseshell.png](cseshell.png) | CSEShell — a shell has to survive every kind of bad input without leaking, so I hand-wrote a command loop in C that forks, execs, and waits, freeing its parsed arguments on every pass. |
| [onesearch.png](onesearch.png) | OneSearch — searching across video and the web leaves you reconciling result lists by hand, so I queried providers in parallel and forced a ranking pass to return exactly one answer. |
| [aegis.png](aegis.png) | Aegis Risk Assessment Console — managers and consultants need different views of the same risk catalogue, so I split the API with signed sessions and role middleware, and kept the database credential out of the browser. |
| [personal-workout-tracker.png](personal-workout-tracker.png) | Personal Workout Tracker — a gym log stops being useful the moment it needs a network, so I built the whole tool as a service-worker PWA that keeps every set in local storage and never asks for an account. |

## Retaking these

Build and serve the site (`npm run build`, then `npx next start --port 3789`),
then capture each page at 1440px wide with the viewport sized to the full page
height so nothing is downscaled.

Order matters, because the reveal observer uses `rootMargin: '0px 0px -8% 0px'`
and that 8% is measured against the viewport. At a page-tall viewport it becomes
a dead band hundreds of pixels deep, and the foot of the page never intersects:
load at **1440x900** first, scroll to the bottom to reveal everything, then
**resize** the viewport to the full page height and capture. Resize, never
navigate again — a second load throws away every `is-revealed` class and the
capture catches the page mid-reveal.

Before each capture, assert that no `[data-reveal]` element is left below
`opacity: 0.99`. That check is what catches a mistimed shot; the image itself
looks plausible either way.

Two things move once the viewport is page-tall, so re-measure `scrollHeight`
after the resize and resize again until it stops changing. The home hero pads
with `clamp(2.5rem, 6vh, 5.5rem)`, which reaches its ceiling at any tall
viewport and adds 60px; capturing at the height measured on a 900px viewport
crops that much off the footer. And on the three case studies that have one
(`fix-yo-yap`, `carekaki`, `das-dial`), the interactive excerpt mounts itself
when the scroll pass reaches it, which is why those images show the excerpt
open rather than its load button. Both are properties of the page, not the
motion layer: the same growth happens with motion off.

Serve from a port you have not used before in the same browser session. The
image optimizer sends a long `Cache-Control`, so a screenshot re-taken against
the same origin will keep showing the previous version of any asset whose file
changed but whose URL did not.
