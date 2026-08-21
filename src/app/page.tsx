import { Suspense } from 'react'
import { Hero } from '@/components/home/Hero'
import { PortfolioExplorer } from '@/components/home/PortfolioExplorer'

export default function HomePage() {
  return (
    <main id="main-content" tabIndex={-1}>
      <Hero />
      <Suspense fallback={<section aria-busy="true" id="work" />}>
        <PortfolioExplorer />
      </Suspense>
    </main>
  )
}
