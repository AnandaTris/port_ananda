'use client'

import type { Capability } from '@/content/types'

const capabilityOptions: readonly { value: Capability; label: string }[] = [
  { value: 'ship', label: 'Build and ship a product' },
  { value: 'responsible-ai', label: 'Apply AI responsibly' },
  { value: 'harden', label: 'Evaluate and harden a system' },
  { value: 'grow', label: 'Price, launch, and grow' },
  { value: 'prototype', label: 'Prototype an interactive or hardware experience' },
]

type CapabilityPickerProps = {
  value: Capability | 'all'
  onChange: (capability: Capability) => void
}

export function CapabilityPicker({ value, onChange }: CapabilityPickerProps) {
  return (
    <div aria-label="Collaboration capabilities" role="group">
      {capabilityOptions.map((option) => (
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
