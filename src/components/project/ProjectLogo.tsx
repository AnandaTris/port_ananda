import Image from 'next/image'
import type { CSSProperties } from 'react'
import { projectMarks } from '@/content/project-marks'
import type { ProjectLogo as ProjectLogoData } from '@/content/types'

type ProjectLogoProps = {
  logo: ProjectLogoData
  /**
   * Edge length of the tile. The icons ship at 256px, so every size used here
   * stays inside the source resolution even on a 3x display.
   */
  size?: number
}

export function ProjectLogo({ logo, size = 44 }: ProjectLogoProps) {
  const style = { '--project-logo-size': `${size}px` } as CSSProperties

  if (logo.kind === 'mark') {
    return (
      // Decorative: the card's own heading already names the project, and the
      // mark is a drawing of what it does rather than a second label for it.
      <span aria-hidden="true" className="project-logo project-logo-mark" style={style}>
        <svg focusable="false" viewBox="0 0 24 24">
          <path d={projectMarks[logo.name].d} />
        </svg>
      </span>
    )
  }

  return (
    <span className="project-logo project-logo-icon" style={style}>
      {/* Eager, not lazy: the tile is part of the card's identity, and at a
          ~96px optimised source the whole archive costs a few KB. Lazy-loading
          made icons pop in mid-scroll while the lettermark tiles never did,
          which read as some cards being broken. */}
      <Image
        alt={logo.alt}
        height={size}
        loading="eager"
        sizes={`${size}px`}
        src={logo.src}
        width={size}
      />
    </span>
  )
}
