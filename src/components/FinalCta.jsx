import { WHATSAPP_URL } from '../constants.js'

export default function FinalCta() {
  return (
    <section className="final-cta">
      <div className="final-label">— Siguiente paso</div>
      <h2 className="final-headline">
        Tu proyecto,
        <br />
        <span className="ac">esta semana.</span>
      </h2>
      <p className="final-body">
        Sin formularios. Sin esperas. Una conversación de 15 minutos para entender
        qué necesitas.
      </p>
      <a
        className="btn-final"
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
      >
        Escribir a IGNIS →
      </a>
    </section>
  )
}
