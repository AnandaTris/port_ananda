import { Hero } from '@/components/home/Hero'
import { PortfolioExplorer } from '@/components/home/PortfolioExplorer'
import { ProjectArchiveIsland } from '@/components/home/ProjectArchiveIsland'
import {
  ContactSection,
  ExperienceAndCredentials,
  OperatingPrinciples,
  ProfessionalProductWork,
} from '@/components/home/ProfileSections'
import { projects } from '@/content/projects'

const featuredProjects = projects.filter((project) => project.featured)

export default function HomePage() {
  return (
    <main id="main-content" tabIndex={-1}>
      <Hero />
      <div className="portfolio-explorer" id="work">
        <PortfolioExplorer projects={featuredProjects} />
      </div>
      <OperatingPrinciples />
      <ProfessionalProductWork />
      <ProjectArchiveIsland projects={projects} />
      <ExperienceAndCredentials />
      <ContactSection />
    </main>
  )
}
