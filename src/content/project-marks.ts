/**
 * Marks drawn for this site, for the projects that never had a logo of their
 * own. Each one is a picture of what the project does — a spike, a shield, a
 * shell prompt — rather than a lettermark or a borrowed brand, so the tile says
 * something true about the work instead of standing in for a design that does
 * not exist.
 *
 * All of them are one 24x24 outline stroked in `currentColor`, which the tile
 * sets from the project's accent. Keeping the geometry uniform is what makes a
 * grid of ten different marks still read as one set.
 */
export type ProjectMark = {
  /** Describes the drawing, not the project. Screen readers never reach it. */
  title: string
  d: string
}

export const projectMarks = {
  /* Three lines of text with the middle one slipped out of place, and the slip
     ringed: a screener that finds the pattern rather than scoring the reader. */
  'reading-slip': {
    title: 'Three text lines with the middle one displaced and marked',
    d: 'M4 6.5h16M9.5 12h10.5M4 17.5h11M5.6 12a1.6 1.6 0 1 0 3.2 0 1.6 1.6 0 1 0-3.2 0',
  },

  /* A voice, drawn as the thing the system actually measures: amplitude over
     time. No mouth, no face, nothing that suggests it reads intent. */
  waveform: {
    title: 'Five bars of a voice waveform',
    d: 'M4.5 10v4M8.5 6v12M12 8.5v7M15.5 4.5v15M19.5 9.5v5',
  },

  /* A rising score inside brackets — the citation marks are the point, since
     the product's claim is that the number can be traced back. */
  'bracketed-score': {
    title: 'A rising bar chart between two brackets',
    d: 'M9 4.5H5v15h4M15 4.5h4v15h-4M9.5 15v-2.5M12 15v-5M14.5 15v-7.5',
  },

  /* An arcade joystick. A d-pad was the first attempt and read as a medical
     cross at tile size; a ball on a stick is only ever one thing. */
  joystick: {
    title: 'An arcade joystick',
    d: 'M9.4 7a2.6 2.6 0 1 0 5.2 0 2.6 2.6 0 1 0-5.2 0M12 9.6v4.4M6 19.5l2.2-5.5h7.6l2.2 5.5z',
  },

  /* A source and the signal leaving it. Commentary is generated from a match
     that is already happening, so the dot comes first and the arcs follow. */
  broadcast: {
    title: 'A point emitting two pairs of broadcast arcs',
    d: 'M10.4 12a1.6 1.6 0 1 0 3.2 0 1.6 1.6 0 1 0-3.2 0M7.76 7.76A6 6 0 0 0 7.76 16.24M16.24 16.24A6 6 0 0 0 16.24 7.76M5.28 5.28A9.5 9.5 0 0 0 5.28 18.72M18.72 18.72A9.5 9.5 0 0 0 18.72 5.28',
  },

  /* A flat traffic line with one real spike in it. The tool exists to tell that
     shape apart from ordinary noise, so the noise is drawn too. */
  spike: {
    title: 'A flat traffic line broken by one tall spike',
    d: 'M3.5 15.5l4-1 3 1L14 6l3.5 9.5 3-1',
  },

  /* A chip with its legs and an operator on the die: arithmetic that is wired,
     not interpreted. */
  'chip-plus': {
    title: 'An integrated circuit with a plus sign on it',
    d: 'M7 7h10v10H7zM10 7V4M14 7V4M10 17v3M14 17v3M7 10H4M7 14H4M17 10h3M17 14h3M12 10v4M10 12h4',
  },

  /* Several sources entering, one answer leaving. The fan-in is the product;
     a magnifier would have described the box instead of the behaviour. */
  'fan-in': {
    title: 'Three lines converging into a single arrow',
    d: 'M3.5 6h4.5l3.5 6M3.5 12h8M3.5 18h4.5l3.5-6M11.5 12h9M17.5 9l3 3-3 3',
  },

  /* A shield. The console is named for one, and the whole job is holding a
     register of things that could go wrong. */
  shield: {
    title: 'A shield',
    d: 'M12 3.5l7 2.6v5.4c0 4.3-2.9 7.6-7 9.5-4.1-1.9-7-5.2-7-9.5V6.1z',
  },

  /* Water, and the pin that says where it is. Both halves matter: the app is a
     map of drinking fountains, not a map and not a fountain. */
  droplet: {
    title: 'A water droplet',
    d: 'M12 3.2c3.7 4.3 5.7 7.2 5.7 9.6a5.7 5.7 0 0 1-11.4 0c0-2.4 2-5.3 5.7-9.6z',
  },

  /* A prompt waiting for input. It is the first thing the shell prints and the
     only picture of it anyone would recognise. */
  prompt: {
    title: 'A terminal prompt chevron and cursor',
    d: 'M5 6.5l5.5 5.5L5 17.5M13 17.5h6',
  },
} as const satisfies Record<string, ProjectMark>
