export type CitationSentiment = 'positive' | 'neutral' | 'negative'

export type CitationMention = {
  assistantWeight: number
  rank: number | null
  sentiment: CitationSentiment
}

const sentimentMultipliers: Record<CitationSentiment, number> = {
  positive: 1,
  neutral: 0.85,
  negative: 0.4,
}

export function calculateVisibilityScore(mentions: readonly CitationMention[]): number {
  const totalAssistantWeight = mentions.reduce(
    (total, mention) => total + Math.max(mention.assistantWeight, 0),
    0,
  )

  if (totalAssistantWeight === 0) return 0

  const weightedScore = mentions.reduce((total, mention) => {
    if (mention.rank === null || mention.rank < 1 || mention.assistantWeight <= 0) return total

    const positionWeight = 1 / (1 + 0.45 * (mention.rank - 1))
    return total + mention.assistantWeight * positionWeight * sentimentMultipliers[mention.sentiment]
  }, 0)

  return (weightedScore / totalAssistantWeight) * 100
}
