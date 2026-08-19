import Hero from '@/components/Hero'
import ProofStrip from '@/components/ProofStrip'
import Argument from '@/components/Argument'
import SelectedWork from '@/components/SelectedWork'
import ExperienceTimeline from '@/components/ExperienceTimeline'
import Capabilities from '@/components/Capabilities'
import ContactSection from '@/components/ContactSection'
import HomeBackground from '@/components/scene/HomeBackground'

export default function HomePage() {
  return (
    <>
      {/* Fixed, -z-10, behind every section below — see HomeBackground for why this
          replaced a Hero-only canvas. Home page only: About and the case-study pages
          keep their own light-first look and ship zero 3D bundle weight. */}
      <HomeBackground />
      <div className="relative">
        <Hero />
        <ProofStrip />
        <Argument />
        <SelectedWork />
        <ExperienceTimeline />
        <Capabilities />
        <ContactSection />
      </div>
    </>
  )
}
