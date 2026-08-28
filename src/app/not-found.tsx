import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="not-found" id="main-content" tabIndex={-1}>
      <p className="eyebrow">404</p>
      <h1>There is nothing at this address.</h1>
      <p>The page may have moved, or the link may be out of date.</p>
      <Link className="button button-primary" href="/#projects">
        Back to projects
      </Link>
    </main>
  )
}
