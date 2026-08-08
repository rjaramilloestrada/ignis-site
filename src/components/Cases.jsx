import { motion } from 'framer-motion'
import { CASES } from '../data/cases.js'
import CountUp from './CountUp.jsx'
import { fadeUp, stagger, VIEWPORT } from '../motion.js'

export default function Cases() {
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

      <div className="cases-wrap">
        {CASES.map((c) => (
          <motion.div
            className="case-card"
            key={c.name}
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

            <div className="case-metrics">
              {c.variant === 'metrics'
                ? c.metrics.map((m) => (
                    <div className="metric" key={m.lbl}>
                      <CountUp value={m.num} />
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
          </motion.div>
        ))}
      </div>
    </section>
  )
}
