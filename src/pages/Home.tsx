import Hero from '../components/sections/Hero'
import SelectedWorks from '../components/sections/SelectedWorks'
import Skills from '../components/sections/Skills'
import About from '../components/sections/About'
import FooterCTA from '../components/sections/FooterCTA'

export default function Home() {
  return (
    <main>
      <Hero />
      <SelectedWorks />
      <Skills />
      <About />
      <FooterCTA />
    </main>
  )
}
