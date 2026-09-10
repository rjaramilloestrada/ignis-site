import { useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import Reveal from './Reveal.jsx'
import SectionHead from './SectionHead.jsx'
import EmberLine from './motif/EmberLine.jsx'
import { FAQ } from '../data/faq.js'
import { accordion, fadeUp, staggerCapped } from '../motion.js'

// Preguntas directas como acordeón editorial: headline sticky a la izquierda,
// lista a la derecha. La primera (densidad de prueba) va abierta por defecto.
// Teclado: Enter/Espacio abre, ↑/↓ mueve entre preguntas, Home/End extremos.
export default function Faq() {
  const [open, setOpen] = useState(FAQ[0].id)
  const reduced = useReducedMotion()
  const btnRefs = useRef([])

  const onKeyDown = (e, i) => {
    const n = FAQ.length
    let next = null
    if (e.key === 'ArrowDown') next = (i + 1) % n
    else if (e.key === 'ArrowUp') next = (i - 1 + n) % n
    else if (e.key === 'Home') next = 0
    else if (e.key === 'End') next = n - 1
    if (next !== null) {
      e.preventDefault()
      btnRefs.current[next]?.focus()
    }
  }

  return (
    <Reveal as="section" id="faq" className="section section-faq" data-texture="true">
      <EmberLine />
      <div className="faq-layout">
        <SectionHead
          className="faq-head"
          label="— Preguntas directas"
          lines={['Lo que te', <span className="ac ac-burn">estás preguntando.</span>]}
          subtext="Respuestas cortas, con los mismos hechos que ves arriba."
        />

        <motion.div className="faq-list" variants={staggerCapped(FAQ.length)}>
          {FAQ.map((item, i) => {
            const isOpen = open === item.id
            const panelId = `faq-panel-${item.id}`
            const btnId = `faq-btn-${item.id}`
            return (
              <motion.div className={`faq-item ${isOpen ? 'open' : ''}`} key={item.id} variants={fadeUp}>
                <h3 className="faq-q">
                  <button
                    type="button"
                    id={btnId}
                    ref={(el) => {
                      btnRefs.current[i] = el
                    }}
                    className="faq-btn"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpen(isOpen ? null : item.id)}
                    onKeyDown={(e) => onKeyDown(e, i)}
                  >
                    <span className="faq-idx" aria-hidden="true">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="faq-q-text">{item.q}</span>
                    <span className="faq-toggle" aria-hidden="true">
                      +
                    </span>
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={panelId}
                      role="region"
                      aria-labelledby={btnId}
                      className="faq-panel"
                      variants={accordion}
                      initial="collapsed"
                      animate="open"
                      exit="collapsed"
                      transition={reduced ? { duration: 0 } : undefined}
                    >
                      <p className="faq-a">{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </Reveal>
  )
}
