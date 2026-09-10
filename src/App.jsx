import { useState } from 'react'
import { MotionConfig } from 'framer-motion'
import Grain from './components/motif/Grain.jsx'
import Ticker from './components/motif/Ticker.jsx'
import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import Ladder from './components/Ladder.jsx'
import Cases from './components/Cases.jsx'
import Process from './components/Process.jsx'
import Faq from './components/Faq.jsx'
import FinalCta from './components/FinalCta.jsx'
import Footer from './components/Footer.jsx'
import WhatsappFloat from './components/WhatsappFloat.jsx'

export default function App() {
  // Filtro de Casos Reales (paso de la escalera). Vive aquí para que los
  // enlaces "Ver casos de …" de la escalera lo preseleccionen.
  const [casesFilter, setCasesFilter] = useState('todos')

  return (
    <MotionConfig reducedMotion="user">
      <a className="skip-link" href="#servicios">
        Saltar al contenido
      </a>
      <Grain />
      <Nav />
      <main id="main">
        <Hero />
        {/* Todo lo posterior al hero desliza por encima de él (cortina). */}
        <div className="page-body">
          <Ticker />
          <Ladder onShowCases={setCasesFilter} />
          <Cases filter={casesFilter} onChange={setCasesFilter} />
          <Process />
          <Faq />
          <FinalCta />
          <Footer />
        </div>
      </main>
      <WhatsappFloat />
    </MotionConfig>
  )
}
