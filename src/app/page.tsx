import Hero from '@/components/Hero'
import Features from '@/components/Features'
import HowItWorks from '@/components/HowItWorks'
import Testimonials from '@/components/Testimonials'
import CallToAction from '@/components/CallToAction'
import FAQ from '@/components/FAQ'
import ContactUs from '@/components/ContactUs'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <Testimonials />
      <FAQ />
      <ContactUs />
      <CallToAction />
      <Footer />
    </main>
  )
} 