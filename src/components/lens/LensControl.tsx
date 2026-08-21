'use client'

import type { Lens } from '@/content/types'

const lensOptions: readonly { value: Lens; label: string }[] = [
  { value: 'story', label: 'Story' },
  { value: 'system', label: 'System' },
  { value: 'proof', label: 'Proof' },
]

type LensControlProps = {
  value: Lens
  onChange: (lens: Lens) => void
}

export function LensControl({ value, onChange }: LensControlProps) {
  return (
    <div aria-label="Portfolio lens" role="group">
      {lensOptions.map((option) => (
        <button
          aria-pressed={value === option.value}
          key={option.value}
          onClick={() => onChange(option.value)}
          type="button"
        >
          {option.label}
        </button>
      ))}
    </div>
  )
}
