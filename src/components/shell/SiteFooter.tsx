import { profile } from '@/content/profile'

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-content">
          <p>
            {profile.name} — {profile.location}
          </p>
        </div>
      </div>
    </footer>
  )
}
