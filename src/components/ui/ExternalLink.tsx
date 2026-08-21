import type { AnchorHTMLAttributes, ReactNode } from 'react'

type ExternalLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode
}

export function ExternalLink({ children, ...props }: ExternalLinkProps) {
  return (
    <a {...props} rel="noreferrer" target="_blank">
      {children}
      <span aria-hidden="true"> ↗</span>
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  )
}
