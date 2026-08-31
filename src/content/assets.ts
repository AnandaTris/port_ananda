export type AssetProvenance = {
  publicPath: string
  sourcePath: string
  project: string
  description: string
}

export const assetProvenance: readonly AssetProvenance[] = [
  /*
   * Employer marks. These are other companies' trademarks, shown only to
   * identify where I worked, so each one is the company's own published file
   * taken from their own domain — never a redraw and never a third-party logo
   * service, which is how a wrong or stale mark gets onto a CV.
   */
  {
    publicPath: 'experience/marsh/logo.png',
    sourcePath: 'https://www.marsh.com/favicon.ico',
    project: 'experience',
    description: "Marsh's published site icon, converted from ICO to a 256px PNG (2026-08-31)",
  },
  {
    publicPath: 'experience/8x-social/logo.svg',
    sourcePath: 'https://www.8x.social/assets/brand/8x_icon.svg',
    project: 'experience',
    description: "8x Social's published brand icon (vector, unmodified)",
  },
  {
    publicPath: 'experience/rohde-schwarz/logo.svg',
    sourcePath: 'https://cdn.rohde-schwarz.com/pws/inred/image/layout/rus-logo-symbol.svg',
    project: 'experience',
    description: "Rohde & Schwarz's published logo symbol (vector, unmodified)",
  },
  {
    publicPath: 'profile/ananda-portrait.jpg',
    sourcePath: '/Users/anandatriharismaroso/Downloads/1009596@mymail.sutd.edu.sg hh.jpg',
    project: 'profile',
    description: 'Professional headshot (SUTD enrollment photo, student ID 1009596)',
  },
  {
    publicPath: 'projects/fix-yo-yap/app-store-listing.png',
    sourcePath: '/Users/anandatriharismaroso/Downloads/IMG_7913.PNG',
    project: 'fix-yo-yap',
    description: 'App Store listing page capture (published app, provided by Ananda)',
  },
  {
    publicPath: 'projects/carekaki/live-home.png',
    sourcePath: 'https://aimao.vercel.app',
    project: 'carekaki',
    description: 'Live deployment homepage capture at 1440x900 (2026-08-27)',
  },
  {
    publicPath: 'projects/ingatik/whizzy-celebrating.png',
    sourcePath: '/Users/anandatriharismaroso/dev/8x_Internship/ingatik/assets/social/whizzy-celebrating.png',
    project: 'ingatik-recall',
    description: 'Product mascot illustration',
  },
  {
    publicPath: 'projects/brawnix/feature-graphic.png',
    sourcePath: '/Users/anandatriharismaroso/dev/8x_Internship/Brawnix/apps/mobile/store/feature-graphic.png',
    project: 'brawnix',
    description: 'Published product feature graphic',
  },
  {
    publicPath: 'projects/false-positive/interrogation-room.webp',
    sourcePath: '/Users/anandatriharismaroso/dev/FALSE-POSITIVE/Sidecar/web/images/interrogation-room.webp',
    project: 'false-positive',
    description: 'Interrogation-room scene still',
  },
  {
    publicPath: 'projects/false-positive/detective-silhouette.webp',
    sourcePath: '/Users/anandatriharismaroso/dev/FALSE-POSITIVE/Sidecar/web/images/detective-silhouette.webp',
    project: 'false-positive',
    description: 'Detective silhouette scene still',
  },
  {
    publicPath: 'projects/fames/quest-board.png',
    sourcePath: 'https://fames.site',
    project: 'fames',
    description: 'Live deployment quest board, captured at 1920 wide and cropped to the page (2026-08-29)',
  },
  {
    publicPath: 'projects/das-dial/error-pattern-report.jpg',
    sourcePath: '/Users/anandatriharismaroso/dev/dyslexia-screener',
    project: 'das-dial',
    description: 'Error pattern report, frame from a local demo recording, cropped (2026-08-29)',
  },
  {
    publicPath: 'projects/math-me-home/fsm.png',
    sourcePath: '/Users/anandatriharismaroso/dev/ALU_1D_CHECKOFF_1/docs/fsm.png',
    project: 'math-me-home',
    description: 'Finite-state machine architecture diagram',
  },
  {
    publicPath: 'projects/math-me-home/datapath.png',
    sourcePath: '/Users/anandatriharismaroso/dev/ALU_1D_CHECKOFF_1/docs/datapath.png',
    project: 'math-me-home',
    description: 'Datapath architecture diagram',
  },
  {
    publicPath: 'projects/aegis/login.png',
    sourcePath: '/Users/anandatriharismaroso/dev/Illinois-ARCS-Take-Home-Assessment/docs/screenshots/login.png',
    project: 'aegis',
    description: 'Risk console login screenshot',
  },
  {
    publicPath: 'projects/steady/ollie-cheer.png',
    sourcePath: '/Users/anandatriharismaroso/dev/steady/public/mascot/ollie-cheer.png',
    project: 'steady',
    description: 'Steady mascot illustration',
  },
  {
    publicPath: 'projects/fix-yo-yap/logo.png',
    sourcePath:
      '/Users/anandatriharismaroso/dev/8x_Internship/yap/packages/brand/assets/logo-icon-512.png',
    project: 'fix-yo-yap',
    description: 'Shipped app icon, downscaled to 256px',
  },
  {
    publicPath: 'projects/carekaki/logo.svg',
    sourcePath: '/Users/anandatriharismaroso/dev/CareKaki-repo/app/icon.svg',
    project: 'carekaki',
    description: 'Shipped app icon (vector, unmodified)',
  },
  {
    publicPath: 'projects/brawnix/logo.png',
    sourcePath: '/Users/anandatriharismaroso/dev/8x_Internship/Brawnix/apps/mobile/assets/icon.png',
    project: 'brawnix',
    description: 'Shipped app icon, downscaled to 256px',
  },
  {
    publicPath: 'projects/ingatik/logo.png',
    sourcePath:
      '/Users/anandatriharismaroso/dev/8x_Internship/ingatik/apps/mobile/assets/icon.png',
    project: 'ingatik-recall',
    description: 'Shipped app icon, downscaled to 256px',
  },
  {
    publicPath: 'projects/onesearch/search-screen.png',
    sourcePath: 'https://one-search-chi.vercel.app',
    project: 'onesearch',
    description: 'Live deployment search screen, cropped out of a browser capture (2026-08-29)',
  },
  {
    publicPath: 'projects/onesearch/single-result.png',
    sourcePath: 'https://one-search-chi.vercel.app',
    project: 'onesearch',
    description: 'Live deployment result card, cropped out of a browser capture (2026-08-29)',
  },
  /*
   * Device screenshots of the installed PWA rather than a browser capture:
   * this one only exists as a phone-sized app, and a desktop viewport would
   * show a layout nobody actually uses it in.
   */
  {
    publicPath: 'projects/personal-workout-tracker/session-picker.jpg',
    sourcePath: 'https://github.com/AnandaTris/Personal-Workout-Tracker',
    project: 'personal-workout-tracker',
    description: 'Session picker on device, installed PWA (2026-08-29)',
  },
  {
    publicPath: 'projects/personal-workout-tracker/progression-history.jpg',
    sourcePath: 'https://github.com/AnandaTris/Personal-Workout-Tracker',
    project: 'personal-workout-tracker',
    description: 'Progression history on device, installed PWA (2026-08-29)',
  },
  {
    publicPath: 'projects/personal-workout-tracker/logo.png',
    sourcePath: '/Users/anandatriharismaroso/dev/Personal Workout Tracker/public/icon-512.png',
    project: 'personal-workout-tracker',
    description: 'Shipped app icon, downscaled to 256px',
  },
  {
    /*
     * Steady's mark exists only as JSX in its repo — it draws Ollie with
     * `currentColor` and a Tailwind fill class, so there is no file to copy.
     * This SVG re-authors those same shapes with Steady's own tokens
     * (--paper #FFFBF0, --ink #241A0F) resolved to literals.
     */
    publicPath: 'projects/steady/logo.svg',
    sourcePath: '/Users/anandatriharismaroso/dev/steady/src/components/Logo.tsx',
    project: 'steady',
    description: 'App mark re-authored as a standalone SVG from the source component',
  },
]
