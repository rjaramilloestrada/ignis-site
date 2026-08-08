import { useState } from 'react'
import { motion } from 'framer-motion'
import { PROCESS } from '../data/process.js'
import { fadeUp, stagger, VIEWPORT } from '../motion.js'

export default function Process() {
  // `ignited` dispara el encendido de los números y la línea de acento (CSS).
  const [ignited, setIgnited] = useState(false)

  return (
    <motion.section
      id="proceso"
      className={`section section-border ${ignited ? 'ignited' : ''}`}
      variants={stagger()}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
      onViewportEnter={() => setIgnited(true)}
    >
      <motion.div variants={fadeUp} className="sec-label">
        — El proceso
      </motion.div>
      <motion.h2 variants={fadeUp} className="sec-headline">
        Cómo<span className="ac"> trabajamos</span>
      </motion.h2>

      <div className="process-grid">
        {PROCESS.map((p) => (
          <motion.div className="process-step" key={p.num} variants={fadeUp}>
            <div className="process-num">{p.num}</div>
            <h3 className="process-title">{p.title}</h3>
            <p className="process-desc">{p.desc}</p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  )
}
