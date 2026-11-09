import { Hero } from '@/components/sections/Hero'
import { About } from '@/components/sections/About'
import { EducationTimeline } from '@/components/sections/EducationTimeline'
import { Skills } from '@/components/sections/Skills'
import { TechStack3D } from '@/components/sections/TechStack3D'
import { Certifications } from '@/components/sections/Certifications'
import { Projects } from '@/components/sections/Projects'
import { Gallery } from '@/components/sections/Gallery'
import { GitHubSection } from '@/components/sections/GitHubSection'
import { Contact } from '@/components/sections/Contact'

export function Home() {
  return (
    <>
      <Hero />
      <About />
      <EducationTimeline />
      <Skills />
      <TechStack3D />
      <Certifications />
      <Projects />
      <Gallery />
      <GitHubSection />
      <Contact />
    </>
  )
}
