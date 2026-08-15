import Hero from '@/components/Hero'
import ProofStrip from '@/components/ProofStrip'
import Argument from '@/components/Argument'
import SelectedWork from '@/components/SelectedWork'
import ExperienceTimeline from '@/components/ExperienceTimeline'
import Capabilities from '@/components/Capabilities'
import ContactSection from '@/components/ContactSection'

export default function HomePage() {
  return (
    <>
      <Hero />
      <ProofStrip />
      <Argument />
      <SelectedWork />
      <ExperienceTimeline />
      <Capabilities />
      <ContactSection />
    </>
  )
}
