import FireCanvas from './FireCanvas.jsx'
import { WHATSAPP_URL } from '../constants.js'

export default function Hero() {
  return (
    <header className="hero" id="inicio">
      <FireCanvas />
      <div className="hero-vignette" />
      <div className="hero-content">
        <div className="hero-label">Guayaquil, Ecuador — LATAM</div>
        <h1 className="hero-word">
          IGN<span className="ac">IS</span>
        </h1>
        <div className="hero-tagline">
          <span>Automatización.</span>
          <span className="ac">Desarrollo.</span>
          <span>Resultados.</span>
        </div>
        <p className="hero-body">
          Construimos el software y los agentes que transforman tu negocio. Desde
          landing sites hasta bots de WhatsApp que trabajan 24/7.
        </p>
        <div className="hero-ctas">
          <a
            className="btn-primary"
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            Empezar ahora →
          </a>
          <a className="btn-secondary" href="#servicios">
            Ver servicios ↓
          </a>
        </div>
      </div>
    </header>
  )
}
