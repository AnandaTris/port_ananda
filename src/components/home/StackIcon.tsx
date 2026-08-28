import { stackIcons } from '@/content/stack-icons'

/**
 * The brand mark for one tech-stack chip, or nothing when that tool has no mark
 * in the set. The chip already names the tool in text, so the icon is decorative
 * and stays out of the accessibility tree — a screen reader that announced
 * "TypeScript TypeScript 9" would be worse off for it.
 */
export function StackIcon({ item }: { item: string }) {
  const icon = stackIcons[item]
  if (!icon) return null

  return (
    <svg
      aria-hidden="true"
      className="stack-icon"
      fill={icon.hex}
      focusable="false"
      viewBox="0 0 24 24"
    >
      <path d={icon.path} />
    </svg>
  )
}
