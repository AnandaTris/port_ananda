import type { ReactNode } from 'react'

type SectionHeadingProps = {
  eyebrow: string
  title: string
  description?: ReactNode
  id?: string
}

export function SectionHeading({ eyebrow, title, description, id }: SectionHeadingProps) {
  return (
    <div className="section-heading">
      <p className="eyebrow">{eyebrow}</p>
      <h2 id={id}>{title}</h2>
      {description ? <div className="section-heading-description">{description}</div> : null}
    </div>
  )
}
