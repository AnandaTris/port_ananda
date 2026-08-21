import { profile } from '@/content/profile'
import { ExternalLink } from '@/components/ui/ExternalLink'

export function SiteFooter() {
  const socialLinks = profile.links.filter((link) => link.label !== 'Email')

  return (
    <footer className="site-footer" id="contact">
      <div className="footer-inner">
        <p className="eyebrow">Field notes / contact</p>
        <div className="footer-content">
          <p>
            <strong>{profile.name}</strong> — product systems, accountable AI, and the next useful
            experiment.
          </p>
          <nav aria-label="Social links" className="footer-links">
            {socialLinks.map((link) => (
              <ExternalLink href={link.href} key={link.label}>
                {link.label}
              </ExternalLink>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  )
}
