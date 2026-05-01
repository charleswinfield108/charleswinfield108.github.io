import PortfolioHero from '../components/sections/PortfolioHero'
import PortfolioEducation from '../components/sections/PortfolioEducation'
import PortfolioExperience from '../components/sections/PortfolioExperience'
import PortfolioProjects from '../components/sections/PortfolioProjects'
import FooterCTA from '../components/sections/FooterCTA'

export default function Portfolio() {
  return (
    <main>
      <PortfolioHero />
      <PortfolioEducation />
      <PortfolioExperience />
      <PortfolioProjects />
      <FooterCTA />
    </main>
  )
}
