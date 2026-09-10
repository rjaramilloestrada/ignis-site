import { LayoutGroup, motion } from 'framer-motion'
import Reveal from './Reveal.jsx'
import SectionHead from './SectionHead.jsx'
import EmberLine from './motif/EmberLine.jsx'
import CasesCarousel from './CasesCarousel.jsx'
import { casesForFilter } from '../data/cases.js'
import { CASE_FILTERS } from '../data/ladder.js'
import { fadeUp } from '../motion.js'

// Casos filtrados por paso de la escalera. El filtro vive en App para que
// los enlaces "Ver casos de …" de la escalera lo preseleccionen. Por defecto
// 'todos': todos los casos publicados están en el DOM al primer paint.
export default function Cases({ filter, onChange }) {
  const cases = casesForFilter(filter)
  const activeLabel = CASE_FILTERS.find((f) => f.id === filter)?.label ?? 'Todos'

  return (
    <Reveal as="section" id="casos" className="section section-cases" data-texture="true">
      <EmberLine />
      <SectionHead
        label="— Casos reales"
        lines={['Ya lo', <span className="ac ac-burn">entregamos.</span>]}
        subtext="Taller y software en producción, en cinco industrias. Dos casos van sin nombre por confidencialidad: los datos son reales."
      />

      <LayoutGroup id="cases-filter">
        <motion.div
          variants={fadeUp}
          className="cases-filter"
          role="group"
          aria-label="Filtrar casos por paso de la escalera"
        >
          {CASE_FILTERS.map((f) => {
            const count = casesForFilter(f.id).length
            const active = filter === f.id
            return (
              <button
                key={f.id}
                type="button"
                className={`case-filter-btn ${active ? 'active' : ''}`}
                aria-pressed={active}
                onClick={() => onChange(f.id)}
              >
                {active && (
                  <motion.span
                    className="case-filter-pill"
                    layoutId="cases-pill"
                    transition={{ type: 'spring', stiffness: 400, damping: 34 }}
                  />
                )}
                <span className="case-filter-text">
                  {f.label}
                  <span className="case-filter-count">{String(count).padStart(2, '0')}</span>
                </span>
              </button>
            )
          })}
        </motion.div>
      </LayoutGroup>
      <motion.p variants={fadeUp} className="cases-note">
        ¿Y la Auditoría? Es el paso 01 y su entregable es el diagnóstico. Aquí mostramos lo que se
        construye después.
      </motion.p>

      <div className="cases-group" key={filter}>
        <CasesCarousel label={activeLabel} cases={cases} isActive />
      </div>
    </Reveal>
  )
}
