import { motion } from 'framer-motion'
import { PUBLISHED_CASES } from '../data/cases.js'
import { SERVICE_TABS } from '../data/services.js'
import CasesCarousel from './CasesCarousel.jsx'
import { fadeUp, stagger, VIEWPORT } from '../motion.js'

// Los casos comparten estado con las tabs de Servicios (dos vías: cambiar la
// tab arriba filtra aquí, y estos chips también cambian la tab). Todos los
// grupos publicados quedan montados en el DOM; solo se ocultan con CSS.
export default function Cases({ active, onChange }) {
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

        <motion.div variants={fadeUp} className="cases-filter" role="group" aria-label="Filtrar casos por servicio">
          {SERVICE_TABS.map((tab) => {
            const count = PUBLISHED_CASES.filter((c) => c.category === tab.id).length
            return (
              <button
                key={tab.id}
                type="button"
                className={`case-filter-btn ${active === tab.id ? 'active' : ''}`}
                aria-pressed={active === tab.id}
                onClick={() => onChange(tab.id)}
              >
                {tab.label}
                <span className="case-filter-count">{count}</span>
              </button>
            )
          })}
        </motion.div>
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
