import { motion } from 'framer-motion'
import { PUBLISHED_CASES } from '../data/cases.js'
import { SERVICE_TABS } from '../data/services.js'
import CountUp from './CountUp.jsx'
import { fadeUp, stagger, VIEWPORT } from '../motion.js'

function CaseCard({ c }) {
  const hasSide = c.variant === 'metrics' || c.variant === 'benefits'
  return (
    <motion.div
      className={`case-card ${hasSide ? '' : 'case-card-solo'}`}
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
    >
      <div className="case-info">
        <div className="case-type">{c.type}</div>
        <h3 className="case-name">{c.name}</h3>
        <p className="case-desc">{c.desc}</p>
        <div className="case-stack">{c.stack}</div>
      </div>

      {hasSide && (
        <div className="case-metrics">
          {c.variant === 'metrics' ? (
            c.metrics.map((m) => (
              <div className="metric" key={m.lbl}>
                <CountUp value={m.num} />
                <div className="lbl">{m.lbl}</div>
              </div>
            ))
          ) : (
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
      )}
    </motion.div>
  )
}

// Los casos se filtran por la misma tab activa de Servicios. Todos los tracks
// quedan montados en el DOM (SEO/accesibilidad); solo se ocultan con CSS.
export default function Cases({ active }) {
  return (
    <section id="casos" className="section section-border">
      <motion.div
        variants={stagger()}
        initial="hidden"
        whileInView="show"
        viewport={VIEWPORT}
      >
        <motion.div variants={fadeUp} className="sec-label">
          — Casos reales
        </motion.div>
        <motion.h2 variants={fadeUp} className="sec-headline">
          Ya lo<span className="ac"> entregamos</span>
        </motion.h2>
        <motion.p variants={fadeUp} className="sec-subtext">
          Proyectos en producción con resultados verificables.
        </motion.p>
      </motion.div>

      {SERVICE_TABS.map((tab) => {
        const cases = PUBLISHED_CASES.filter((c) => c.category === tab.id)
        const isActive = active === tab.id
        return (
          <div
            key={tab.id}
            className={`cases-group ${isActive ? '' : 'cases-group-hidden'}`}
          >
            <div className="cases-context-label">— {tab.label}</div>
            {cases.length > 0 ? (
              <div className="cases-track">
                {cases.map((c) => (
                  <CaseCard c={c} key={c.id} />
                ))}
              </div>
            ) : (
              <p className="cases-empty">
                Primer caso de {tab.label} en camino.
              </p>
            )}
          </div>
        )
      })}
    </section>
  )
}
