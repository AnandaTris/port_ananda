import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="not-found" id="main-content" tabIndex={-1}>
      <p className="eyebrow">Field note missing · 404</p>
      <h1>There is no evidence filed at this address.</h1>
      <p>Return to the portfolio and choose another path through the work.</p>
      <Link className="button button-primary" href="/#work">
        Return to work
      </Link>
    </main>
  )
}
