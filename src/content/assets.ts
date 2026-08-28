export type AssetProvenance = {
  publicPath: string
  sourcePath: string
  project: string
  description: string
}

export const assetProvenance: readonly AssetProvenance[] = [
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
    publicPath: 'projects/rekap/feature-graphic.png',
    sourcePath: '/Users/anandatriharismaroso/dev/rekap/store/play-feature-graphic.png',
    project: 'rekap',
    description: 'Published Google Play feature graphic',
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
    publicPath: 'projects/personal-workout-tracker/hero.png',
    sourcePath: '/Users/anandatriharismaroso/dev/Personal Workout Tracker/src/assets/hero.png',
    project: 'personal-workout-tracker',
    description: 'Workout tracker hero illustration',
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
    publicPath: 'projects/rekap/logo.png',
    sourcePath: '/Users/anandatriharismaroso/dev/rekap/assets/icon.png',
    project: 'rekap',
    description: 'Shipped app icon, downscaled to 256px',
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
