import { motion } from 'framer-motion'
import FireCanvas from './FireCanvas.jsx'
import { WHATSAPP_URL } from '../constants.js'
import { fadeUp, fadeUpSlow, stagger } from '../motion.js'

export default function Hero() {
  return (
    <header className="hero" id="inicio">
      <FireCanvas />
      <div className="hero-vignette" />
      <motion.div
        className="hero-content"
        variants={stagger(0.15)}
        initial="hidden"
        animate="show"
      >
        <motion.div variants={fadeUp} className="hero-label">
          Guayaquil, Ecuador — LATAM
        </motion.div>
        <motion.h1 variants={fadeUpSlow} className="hero-word">
          IGN<span className="ac">IS</span>
        </motion.h1>
        {/* BORRADOR: headline y body pendientes del OK final de Rafa (handoff ago 2026). */}
        <motion.div className="hero-tagline" variants={stagger(0, 0.11)}>
          <motion.span variants={fadeUp}>Tu equipo ya usa IA.</motion.span>
          <motion.span variants={fadeUp}>
            Nosotros hacemos que la <span className="ac">use bien.</span>
          </motion.span>
        </motion.div>
        <motion.p variants={fadeUp} className="hero-body">
          Capacitamos y automatizamos con Claude dentro de los procesos reales de
          tu empresa. Sin depender de tu área de tecnología. Sin depender de
          nosotros después.
        </motion.p>
        <motion.div className="hero-ctas" variants={stagger()}>
          <motion.a
            variants={fadeUp}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="btn-primary"
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            Empezar ahora →
          </motion.a>
          <motion.a
            variants={fadeUp}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="btn-secondary"
            href="#servicios"
          >
            Ver servicios ↓
          </motion.a>
        </motion.div>
      </motion.div>
    </header>
  )
}
