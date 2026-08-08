import { motion } from 'framer-motion'
import { WHATSAPP_URL } from '../constants.js'
import { fadeUp, fadeUpSlow, stagger, VIEWPORT } from '../motion.js'

export default function FinalCta() {
  return (
    <motion.section
      className="final-cta"
      variants={stagger()}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
    >
      <motion.div variants={fadeUp} className="final-label">
        — Siguiente paso
      </motion.div>
      <motion.h2 variants={fadeUpSlow} className="final-headline">
        Tu proyecto,
        <br />
        <span className="ac">esta semana.</span>
      </motion.h2>
      <motion.p variants={fadeUp} className="final-body">
        Sin formularios. Sin esperas. Una conversación de 15 minutos para entender
        qué necesitas.
      </motion.p>
      <motion.a
        variants={fadeUp}
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.98 }}
        className="btn-final"
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
      >
        Escribir a IGNIS →
      </motion.a>
    </motion.section>
  )
}
