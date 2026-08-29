/**
 * The Fix Yo Yap cast, re-authored from the product's own source of truth:
 * `packages/yappers/index.ts` in the Fix Yo Yap monorepo, which both the mobile
 * app and the marketing site import so the two surfaces cannot disagree about
 * who a yapper is.
 *
 * Copied rather than invented, and the parts that carry meaning are copied
 * exactly: the names, the accents, the rim weights, and the art geometry. The
 * accents in particular are not decoration — the repo's palette note records
 * that they were computed rather than picked, to hold a colour-blind ΔE floor
 * against each other on a near-black body, which is why the bubble below is
 * drawn near-black here too instead of being recoloured to this site's paper.
 *
 * What is deliberately left behind is the layout: hop heights, lean angles, and
 * rest intervals belong to the surface a yapper stands on, and a portfolio tile
 * is not that surface.
 *
 * The one invariant that travels with the cast: a yapper is a reading of a score
 * that already exists. Nothing here can move a score, and nothing on this site
 * lets a visitor pick one.
 */

/** What is drawn inside the bubble. Each is a state of talking. */
export type YapMark = 'bars' | 'dots' | 'wave' | 'shout' | 'bolt'

export type YapperName =
  | 'The Leaper'
  | 'The Trailer-Off'
  | 'The Restarter'
  | 'The Fast Talker'
  | 'The Hammer'

export type Yapper = {
  id: string
  /** The label a person reads. "The Fast Talker", not "blur". */
  name: YapperName
  mark: YapMark
  /** The one non-brand colour each is allowed, contained to the mascot. */
  accent: string
  /** Rim weight in px at the 40x38 art size. Heavy things are drawn heavier. */
  stroke: number
  /** The style in one line, in the second person. Never a verdict. */
  tagline: string
  /** The phrase you would actually hear. */
  tell: string
}

export const yappers: readonly Yapper[] = [
  {
    id: 'spider',
    name: 'The Leaper',
    mark: 'shout',
    accent: '#1B88F8',
    stroke: 2.6,
    tagline: 'Three ideas in, and none of them is the one you started with.',
    tell: '“which reminds me”',
  },
  {
    id: 'sulk',
    name: 'The Trailer-Off',
    mark: 'dots',
    accent: '#D79BFB',
    stroke: 2.4,
    tagline: 'Starts the sentence. Loses interest in it around the third word.',
    tell: '“…anyway.”',
  },
  {
    id: 'brat',
    name: 'The Restarter',
    mark: 'wave',
    accent: '#F1228D',
    stroke: 2.5,
    tagline: 'Says it, hears it, does not like it, says it again.',
    tell: '“sorry, let me start that again.”',
  },
  {
    id: 'blur',
    name: 'The Fast Talker',
    mark: 'bolt',
    accent: '#32E2DE',
    stroke: 2.3,
    tagline: 'Says everything. Twice as much as anyone else, in the same 45 seconds.',
    tell: 'No gaps. None.',
  },
  {
    id: 'heavy',
    name: 'The Hammer',
    mark: 'bars',
    accent: '#E28E26',
    stroke: 3.2,
    tagline: 'Every sentence arrives like it is the last one.',
    tell: 'The pause before the last word.',
  },
]

export const yappersByName: Record<YapperName, Yapper> = Object.fromEntries(
  yappers.map((yapper) => [yapper.name, yapper]),
) as Record<YapperName, Yapper>

/* ── The art ─────────────────────────────────────────────────────────────────
 *
 * A speech bubble that stands on its own tail. One shape, one contact point,
 * and a silhouette nobody has to decode at thumbnail size. The tail doubles as
 * the leg, which is why there are no feet.
 *
 * Every number below is lifted from the product unchanged, because a yapper
 * that is 2px different here than in the app is a yapper somebody has to
 * recognise twice.
 * ────────────────────────────────────────────────────────────────────────── */

export const ART_WIDTH = 40
export const ART_HEIGHT = 38

/** The body the accents were contrast-checked against. Not this site's ink. */
export const ART_BODY = '#1a1a1a'

export const SHELL_PATH =
  'M10.8 2.4H29.2A8.4 8.4 0 0 1 37.6 10.8V19.2A8.4 8.4 0 0 1 29.2 27.6H17.4L9.6 37L10.8 27.6A8.4 8.4 0 0 1 2.4 19.2V10.8A8.4 8.4 0 0 1 10.8 2.4Z'

/** The mark's midline. Everything inside the bubble is centred on it. */
export const MARK_MID_Y = 15

/** Four bars, centred on the midline and spanning the bubble's usable width. */
export const BARS = [
  { x: 10.7, h: 7.5 },
  { x: 15.7, h: 12.5 },
  { x: 20.7, h: 9 },
  { x: 25.7, h: 14 },
]
export const BAR_WIDTH = 3.6

export const DOTS = [13.4, 20, 26.6]
export const DOT_RADIUS = 2.7

export const WAVE_PATH = 'M10.6 15q3.2-6.4 6.4 0t6.4 0t6.4 0'
export const WAVE_STROKE = 2.8

/** A bang: the stem and its dot. */
export const SHOUT_STEM = { x: 18.2, y: 7.4, w: 3.6, h: 9.6 }
export const SHOUT_DOT = { cx: 20, cy: 21.2, r: 2.1 }

export const BOLT_PATH = 'M22.4 8.4L14.8 16.4H18.8L17.6 22.2L25.2 14.2H21.2Z'
