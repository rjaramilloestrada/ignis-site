import { motion } from 'framer-motion'
import { OBJECTIONS } from '../data/objections.js'
import { fadeUp, stagger, VIEWPORT } from '../motion.js'

export default function Objections() {
  return (
    <motion.section
      id="objeciones"
      className="section section-border"
      variants={stagger()}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
    >
      <motion.div variants={fadeUp} className="sec-label">
        — Preguntas directas
      </motion.div>
      <motion.h2 variants={fadeUp} className="sec-headline">
        Lo que te<span className="ac"> estás preguntando</span>
      </motion.h2>

      <div className="objections-grid">
        {OBJECTIONS.map((o) => (
          <motion.div className="objection-card" key={o.q} variants={fadeUp}>
            <h3 className="objection-q">{o.q}</h3>
            <p className="objection-a">{o.a}</p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  )
}
