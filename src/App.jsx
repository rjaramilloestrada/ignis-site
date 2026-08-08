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
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Services />
        <Cases />
        <Process />
        <Objections />
        <FinalCta />
      </main>
      <Footer />
      <WhatsappFloat />
    </>
  )
}
