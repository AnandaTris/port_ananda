import Link from 'next/link'

export default function ProjectNotFound() {
  return (
    <main className="not-found" id="main-content" tabIndex={-1}>
      <p className="eyebrow">Missing field note · 404</p>
      <h1>This project is not in the evidence fieldbook.</h1>
      <p>The route may have changed, or the work may not meet the portfolio’s public evidence bar.</p>
      <Link className="button button-primary" href="/#work">
        Return to work
      </Link>
    </main>
  )
}
