import { motion } from 'framer-motion'
import { PUBLISHED_CASES } from '../data/cases.js'
import { SERVICE_TABS } from '../data/services.js'
import CasesCarousel from './CasesCarousel.jsx'
import { fadeUp, stagger, VIEWPORT } from '../motion.js'

// Los casos se filtran por la misma tab activa de Servicios. Todos los grupos
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
            {cases.length > 0 ? (
              <CasesCarousel label={tab.label} cases={cases} isActive={isActive} />
            ) : (
              <>
                <div className="cases-track-head">
                  <div className="cases-context-label">— {tab.label}</div>
                </div>
                <p className="cases-empty">
                  Primer caso de {tab.label} en camino.
                </p>
              </>
            )}
          </div>
        )
      })}
    </section>
  )
}
