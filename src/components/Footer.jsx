import { BRAND } from '../constants.js'

export default function Footer() {
  return (
    <footer>
      <div className="foot-logo">
        IGN<span className="ac">IS</span>
      </div>
      <div className="foot-center">{BRAND.location}</div>
      <nav className="foot-links" aria-label="Guías">
        <a href="/diagnostico-de-ia-empresas/">Diagnóstico de IA</a>
        <a href="/taller-ia-a-la-medida/">Taller de IA</a>
        <a href="/asistente-whatsapp-con-ia/">Asistente de WhatsApp</a>
      </nav>
      <div className="foot-right">© 2026 {BRAND.name} · {BRAND.legalName}</div>
    </footer>
  )
}
