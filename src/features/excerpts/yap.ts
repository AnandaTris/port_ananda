export type SampleMetrics = {
  pace: number
  fillers: number
  pauses: number
  energy: number
}

export function assignPersona(metrics: SampleMetrics): 'The Closer' | 'The Restarter' | 'The Builder' {
  if (
    metrics.pace >= 140 &&
    metrics.fillers <= 2 &&
    metrics.pauses <= 3 &&
    metrics.energy >= 0.75
  ) {
    return 'The Closer'
  }

  if (
    metrics.pace <= 105 &&
    metrics.fillers >= 6 &&
    metrics.pauses >= 7 &&
    metrics.energy <= 0.45
  ) {
    return 'The Restarter'
  }

  return 'The Builder'
}
