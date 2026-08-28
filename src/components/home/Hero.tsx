import Image from 'next/image'
import { ExternalLink } from '@/components/ui/ExternalLink'
import { profile } from '@/content/profile'

/**
 * Name, where I am, how to reach me. The hero used to carry a thesis line, a
 * supporting paragraph, two calls to action and three statistic tiles before the
 * reader reached a single project; the projects are the argument, so they now
 * start one screen earlier.
 */
export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="hero" id="hero">
      <div className="hero-inner">
        <figure className="hero-portrait">
          <Image
            alt={`Portrait of ${profile.name}`}
            height={540}
            priority
            sizes="(min-width: 64.0625rem) 13rem, 8rem"
            src="/profile/ananda-portrait.jpg"
            width={420}
          />
        </figure>
        <div className="hero-copy">
          <h1 id="hero-title">{profile.name}</h1>
          <p className="hero-tagline">{profile.location}</p>
          <ul aria-label="Contact and profiles" className="hero-links">
            {profile.links.map((link) => (
              <li key={link.label}>
                {link.href.startsWith('mailto:') ? (
                  <a href={link.href}>{link.href.replace('mailto:', '')}</a>
                ) : (
                  <ExternalLink href={link.href}>{link.label}</ExternalLink>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
