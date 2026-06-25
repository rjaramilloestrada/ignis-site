import { CASES } from '../data/cases.js'

export default function Cases() {
  return (
    <section id="casos" className="section section-border">
      <div className="sec-label">— Casos reales</div>
      <h2 className="sec-headline">
        Ya lo<span className="ac"> entregamos</span>
      </h2>
      <p className="sec-subtext">Proyectos en producción con resultados verificables.</p>

      <div className="cases-wrap">
        {CASES.map((c) => (
          <div className="case-card" key={c.name}>
            <div className="case-info">
              <div className="case-type">{c.type}</div>
              <h3 className="case-name">{c.name}</h3>
              <p className="case-desc">{c.desc}</p>
              <div className="case-stack">{c.stack}</div>
            </div>

            <div className="case-metrics">
              {c.variant === 'metrics'
                ? c.metrics.map((m) => (
                    <div className="metric" key={m.lbl}>
                      <div className="num">{m.num}</div>
                      <div className="lbl">{m.lbl}</div>
                    </div>
                  ))
                : (
                    <>
                      <div className="benefits-eyebrow">{c.benefitsEyebrow}</div>
                      <ul className="case-benefits">
                        {c.benefits.map((b, i) => (
                          <li key={b}>
                            <span className="b-idx">{String(i + 1).padStart(2, '0')}</span>
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
