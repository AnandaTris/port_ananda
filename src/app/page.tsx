import { Hero } from '@/components/home/Hero'
import { ProjectIndex } from '@/components/home/ProjectIndex'
import {
  AwardsAndGrants,
  ContactSection,
  Leadership,
  Research,
  TechStack,
  WorkExperience,
} from '@/components/home/ProfileSections'

export default function HomePage() {
  return (
    <main id="main-content" tabIndex={-1}>
      <Hero />
      <ProjectIndex />
      <WorkExperience />
      <TechStack />
      <Research />
      <AwardsAndGrants />
      <Leadership />
      <ContactSection />
    </main>
  )
}
