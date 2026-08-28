import Link from 'next/link'

export default function ProjectNotFound() {
  return (
    <main className="not-found" id="main-content" tabIndex={-1}>
      <p className="eyebrow">404</p>
      <h1>This project is not on the site.</h1>
      <p>The route may have changed since the link was made.</p>
      <Link className="button button-primary" href="/#projects">
        Back to projects
      </Link>
    </main>
  )
}
