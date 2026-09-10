import { motion } from 'framer-motion'
import Reveal from './Reveal.jsx'
import SectionHead from './SectionHead.jsx'
import EmberLine from './motif/EmberLine.jsx'
import BigNumeral from './motif/BigNumeral.jsx'
import { PROCESS } from '../data/process.js'
import { fadeUp, stagger } from '../motion.js'

// Cómo trabajamos: cuatro pasos sobre un rail horizontal que se enciende de
// izquierda a derecha (EmberLine) y numerales que se rellenan en cascada.
export default function Process() {
  return (
    <Reveal as="section" id="proceso" className="section section-process" data-texture="true">
      <EmberLine />
      <SectionHead
        label="— El proceso"
        lines={['Cómo', <span className="ac ac-burn">trabajamos.</span>]}
        subtext="El diagnóstico no es una llamada de cortesía: es el primer producto, con entregable propio."
      />

      <motion.div className="process-grid" variants={stagger(0.1, 0.12)}>
        <EmberLine className="process-rail" />
        {PROCESS.map((p, i) => (
          <motion.div className="process-step" key={p.num} variants={fadeUp}>
            <BigNumeral className="process-num" delay={0.45 + i * 0.12}>
              {p.num}
            </BigNumeral>
            <div className="process-tag">{p.tag}</div>
            <h3 className="process-title">{p.title}</h3>
            <p className="process-desc">{p.desc}</p>
          </motion.div>
        ))}
      </motion.div>
    </Reveal>
  )
}
