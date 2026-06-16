import Navbar from '@/components/Navbar'
import HeroSection from '@/components/sections/HeroSection'
import ConceptSection from '@/components/sections/ConceptSection'
import EditorialSection from '@/components/sections/EditorialSection'
import AboutSection from '@/components/sections/AboutSection'
import JoinSection from '@/components/sections/JoinSection'

export default function Home() {
  return (
    <main>
      {/* Hidden form for Netlify Forms bot detection */}
      <form name="glit-subscribe" data-netlify="true" className="hidden">
        <input type="email" name="email" />
      </form>
      <Navbar />
      <HeroSection />
      <ConceptSection />
      <EditorialSection />
      <AboutSection />
      <JoinSection />
    </main>
  )
}
