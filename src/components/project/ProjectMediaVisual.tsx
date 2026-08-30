'use client'

import Image from 'next/image'
import { useState } from 'react'
import { revealOnLoad } from '@/components/motion/reveal-on-load'
import type { Project } from '@/content/types'

type ProjectMediaVisualProps = {
  project: Project
  priority?: boolean
}

/*
 * The picture spans the hero card, which is 84vw of the viewport until the
 * shell hits its 76rem cap. A mounted picture is smaller than that, so this
 * over-asks for two of the thirteen rather than under-asking for eleven.
 */
const IMAGE_SIZES = '(max-width: 50rem) 100vw, (max-width: 90rem) 85vw, 76rem'

/*
 * A picture only spans the card when it is meaningfully wider than it is tall.
 * Below this it gets a mount instead, because the alternative is a 2:1 phone
 * screenshot rendered two thousand pixels tall, or a square mascot given the
 * same room as a product screenshot. 1.4 sits in the gap between the widest
 * thing that still wants a mount (a 1:1 illustration) and the narrowest that
 * does not (a 16:10 browser capture).
 */
const BLEED_RATIO = 1.4

export function ProjectMediaVisual({ project, priority = false }: ProjectMediaVisualProps) {
  const [failedSources, setFailedSources] = useState<readonly string[]>([])
  const visibleMedia = project.media.filter((item) => !failedSources.includes(item.src))

  // How the panel lays out depends on the shape of what is in it, not on how
  // many there are. One narrow picture is mounted; a pair of narrow ones is
  // mounted side by side; anything wide runs the full width of the card.
  const fit = visibleMedia.every((item) => item.width / item.height >= BLEED_RATIO)
    ? 'bleed'
    : 'mount'

  if (visibleMedia.length > 0) {
    return (
      <figure
        className="case-study-visual case-study-media"
        data-count={visibleMedia.length}
        data-fit={fit}
        {...revealOnLoad(2)}
      >
        {/* The pictures get their own box so a mount can shrink to them. A
            mount that also had to hold the caption would be as wide as a line
            of text, which is a band again by another name. */}
        <div className="case-study-frame">
          {visibleMedia.map((item, index) => (
            <Image
              alt={item.alt}
              height={item.height}
              key={item.src}
              onError={() => setFailedSources((sources) => [...sources, item.src])}
              priority={priority && index === 0}
              sizes={IMAGE_SIZES}
              src={item.src}
              width={item.width}
            />
          ))}
        </div>
        <figcaption>{visibleMedia.map((item) => item.alt).join(' · ')}</figcaption>
      </figure>
    )
  }

  /*
   * Nothing to show, so the panel shows the shape of the thing instead.
   *
   * It used to open with the project's status and name set large, directly
   * under the hero's own status and name — a duplicate that was invisible while
   * the two sat in side-by-side columns and unmissable once they stacked.
   */
  return (
    <div
      aria-label={`${project.name} system diagram`}
      className="case-study-visual case-study-diagram project-media-fallback"
      role="img"
      // A project with no media renders this fallback on the server, so it is
      // part of the hero the CSS entrance plays over. A project whose images
      // fail mounts it for the first time after that entrance is already spent,
      // and after the observer's scan for this route — any reveal attribute
      // there would leave the very panel that recovers from the failure sitting
      // at opacity 0, so it gets none and renders visible.
      {...(project.media.length === 0 ? revealOnLoad(2) : {})}
    >
      <p className="project-media-fallback-heading">
        <span>No screenshot</span>
        <strong>The parts it is built from</strong>
      </p>
      <ol className="project-media-fallback-system">
        {project.system.map((block, index) => (
          <li key={block.title}>
            <span>{String(index + 1).padStart(2, '0')}</span>
            <strong>{block.title}</strong>
          </li>
        ))}
      </ol>
    </div>
  )
}
