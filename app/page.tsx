import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { MissionSection } from "@/components/mission-section"
import { MembersSection } from "@/components/members-section"
import { ConcertsSection } from "@/components/concerts-section"
import { ProductSection } from "@/components/product-section"
import { ContactSection } from "@/components/contact-section"
import { NewsletterSection } from "@/components/newsletter-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <MissionSection />
      <MembersSection />
      <ConcertsSection />
      <ProductSection />
      <ContactSection />
      <NewsletterSection />
      <Footer />
    </main>
  )
}
