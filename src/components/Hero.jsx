import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useScroll, useTransform } from 'framer-motion'
import FireCanvas from './FireCanvas.jsx'
import SplitText from './motif/SplitText.jsx'
import ScrollCue from './motif/ScrollCue.jsx'
import useFontsReady from '../hooks/useFontsReady.js'
import { waLink } from '../constants.js'
import { fadeUp, stagger, LOAD, STAGGER } from '../motion.js'

export default function Hero() {
  const ready = useFontsReady()
  const heroRef = useRef(null)

  // El hero es sticky (cortina): el progreso de salida se calcula contra el
  // scroll global y la altura del hero, no contra su rect (que no se mueve).
  const { scrollY } = useScroll()
  const vh = useMotionValue(1)
  useEffect(() => {
    const set = () => vh.set(heroRef.current?.offsetHeight || window.innerHeight || 1)
    set()
    window.addEventListener('resize', set)
    return () => window.removeEventListener('resize', set)
  }, [vh])
  const progress = useTransform([scrollY, vh], ([y, h]) => Math.min(1, Math.max(0, y / h)))
  const contentY = useTransform(progress, [0, 0.6], [0, -120])
  const contentOpacity = useTransform(progress, [0, 0.6], [1, 0])
  const canvasScale = useTransform(progress, [0, 1], [1, 1.06])
  const canvasOpacity = useTransform(progress, [0, 1], [1, 0.15])
  const heat = useTransform(progress, [0, 0.85], [1, 0])

  return (
    <header className="hero" id="inicio" ref={heroRef}>
      <motion.div className="hero-fire" style={{ scale: canvasScale, opacity: canvasOpacity }}>
        <FireCanvas variant="hero" heat={heat} />
      </motion.div>
      <div className="hero-vignette" />
      <div className="hero-glow" aria-hidden="true" />

      <motion.div
        className="hero-content"
        style={{ y: contentY, opacity: contentOpacity }}
        variants={stagger(0, 0)}
        initial="hidden"
        animate={ready ? 'show' : 'hidden'}
      >
        <motion.div variants={fadeUp} transition={{ delay: LOAD.label }} className="hero-label">
          Guayaquil, Ecuador — LATAM
        </motion.div>

        <SplitText
          as="h1"
          mode="letters"
          text="IGNIS"
          className="hero-word"
          delayChildren={LOAD.word}
          unitClassName="hero-letter"
        />

        <SplitText
          as="div"
          mode="lines"
          className="hero-tagline"
          delayChildren={LOAD.tagline}
          lines={[
            'Tu equipo usa IA sin marco.',
            <>
              Tus procesos manuales te cuestan <span className="ac ac-burn">más de lo que crees.</span>
            </>,
          ]}
        />

        <motion.p variants={fadeUp} transition={{ delay: LOAD.body }} className="hero-body">
          Diagnosticamos cuál de los dos es tu problema real, o si son ambos, y lo resolvemos con tu
          equipo. Sin crear dependencia hacia nosotros.
        </motion.p>

        <motion.div className="hero-ctas" variants={stagger(LOAD.ctas, STAGGER.base)}>
          <motion.a
            variants={fadeUp}
            className="btn-primary"
            href={waLink('auditoria')}
            target="_blank"
            rel="noopener noreferrer"
          >
            Pedir mi auditoría <span className="arrow">→</span>
          </motion.a>
          <motion.a variants={fadeUp} className="btn-secondary" href="#servicios">
            Ver cómo funciona <span className="arrow">↓</span>
          </motion.a>
        </motion.div>

        <motion.div variants={stagger(LOAD.cue, 0)} className="hero-cue-wrap">
          <ScrollCue />
        </motion.div>
      </motion.div>
    </header>
  )
}
