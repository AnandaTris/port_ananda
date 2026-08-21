type StatusBadgeProps = {
  children: string
  tone?: 'jade' | 'cyan' | 'coral' | 'sunshine'
}

export function StatusBadge({ children, tone = 'jade' }: StatusBadgeProps) {
  return (
    <span className="status-badge" data-tone={tone}>
      <span aria-hidden="true" className="status-badge-mark" />
      {children}
    </span>
  )
}
