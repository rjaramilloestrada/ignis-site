import { useState } from 'react'
import { MotionConfig } from 'framer-motion'
import { SERVICE_TABS } from './data/services.js'
import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import Services from './components/Services.jsx'
import Cases from './components/Cases.jsx'
import Process from './components/Process.jsx'
import Objections from './components/Objections.jsx'
import FinalCta from './components/FinalCta.jsx'
import Footer from './components/Footer.jsx'
import WhatsappFloat from './components/WhatsappFloat.jsx'

export default function App() {
  // Tab de servicio activa, compartida entre Servicios y Casos Reales.
  const [activeTab, setActiveTab] = useState(SERVICE_TABS[0].id)

  return (
    <MotionConfig reducedMotion="user">
      <Nav />
      <main>
        <Hero />
        <Services active={activeTab} onChange={setActiveTab} />
        <Cases active={activeTab} onChange={setActiveTab} />
        <Process />
        <Objections />
        <FinalCta />
      </main>
      <Footer />
      <WhatsappFloat />
    </MotionConfig>
  )
}
