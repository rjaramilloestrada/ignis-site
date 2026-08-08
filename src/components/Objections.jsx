import { OBJECTIONS } from '../data/objections.js'

export default function Objections() {
  return (
    <section id="objeciones" className="section section-border">
      <div className="sec-label">— Preguntas directas</div>
      <h2 className="sec-headline">
        Lo que te<span className="ac"> estás preguntando</span>
      </h2>

      <div className="objections-grid">
        {OBJECTIONS.map((o) => (
          <div className="objection-card" key={o.q}>
            <h3 className="objection-q">{o.q}</h3>
            <p className="objection-a">{o.a}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
