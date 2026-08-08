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
        {/* BORRADOR: headline y body pendientes del OK final de Rafa (handoff ago 2026). */}
        <div className="hero-tagline">
          <span>Tu equipo ya usa IA.</span>
          <span>
            Nosotros hacemos que la <span className="ac">use bien.</span>
          </span>
        </div>
        <p className="hero-body">
          Capacitamos y automatizamos con Claude dentro de los procesos reales de
          tu empresa. Sin depender de tu área de tecnología. Sin depender de
          nosotros después.
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
