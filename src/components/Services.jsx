import { AnimatePresence, motion } from 'framer-motion'
import { SERVICE_TABS } from '../data/services.js'
import { fadeUp, stagger, VIEWPORT } from '../motion.js'

// El estado de la tab activa vive en App (compartido con Casos Reales).
export default function Services({ active, onChange }) {
  const activeTab = SERVICE_TABS.find((tab) => tab.id === active)

  return (
    <motion.section
      id="servicios"
      className="section"
      variants={stagger()}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
    >
      <motion.div variants={fadeUp} className="sec-label">
        — Servicios
      </motion.div>
      <motion.h2 variants={fadeUp} className="sec-headline">
        Lo que<span className="ac"> construimos</span>
      </motion.h2>
      <motion.p variants={fadeUp} className="sec-subtext">
        Desarrollo digital y agentes de IA para empresas que quieren crecer sin
        contratar más personas.
      </motion.p>

      <motion.div variants={fadeUp} className="tab-switcher">
        {SERVICE_TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            className={`tab-btn ${active === tab.id ? 'active' : ''}`}
            onClick={() => onChange(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </motion.div>

      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          variants={stagger(0, 0.08)}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          exit={{ opacity: 0, y: 8, transition: { duration: 0.15 } }}
        >
          {activeTab.subhead && (
            <motion.p variants={fadeUp} className="tab-subhead">
              {activeTab.subhead}
            </motion.p>
          )}
          <div id={activeTab.gridId} className="card-grid">
            {activeTab.services.map((s) => (
              <motion.div
                className="service-card"
                key={s.name}
                variants={fadeUp}
                whileHover={{ y: -4 }}
              >
                <div className="card-top">
                  <span className="card-tag">{s.tag}</span>
                  <span className="card-arrow">↗</span>
                </div>
                <h3 className="card-name">{s.name}</h3>
                <p className="card-desc">{s.desc}</p>
                <ul className="card-benefits">
                  {s.benefits.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </motion.section>
  )
}
