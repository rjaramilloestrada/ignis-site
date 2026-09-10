import { motion } from 'framer-motion'
import Reveal from './Reveal.jsx'
import FireCanvas from './FireCanvas.jsx'
import SplitText from './motif/SplitText.jsx'
import Magnetic from './motif/Magnetic.jsx'
import { waLink } from '../constants.js'
import { fadeUp } from '../motion.js'

// Cierre: el fuego vuelve (segunda instancia del canvas, pausada hasta que la
// sección intersecta). La oferta de cierre es la Auditoría; el contacto
// informal queda como ruta secundaria, en texto pequeño.
export default function FinalCta() {
  return (
    <Reveal as="section" id="cierre" className="final-cta">
      <FireCanvas variant="cta" intensity={0.6} />
      <div className="final-vignette" aria-hidden="true" />
      <div className="final-inner">
        <motion.div variants={fadeUp} className="final-label">
          — Siguiente paso
        </motion.div>
        <SplitText
          as="h2"
          mode="lines"
          className="final-headline"
          lines={['Empieza por', <span className="ac ac-burn">el diagnóstico.</span>]}
        />
        <motion.p variants={fadeUp} className="final-body">
          Una Auditoría a la medida te dice si tu problema es la gente, el proceso o los dos. Con
          entregable y con siguiente paso claro. Elige el alcance: Flash o Framework remoto.
        </motion.p>
        <motion.div variants={fadeUp} className="final-actions">
          <Magnetic>
            <a className="btn-final" href={waLink('auditoria')} target="_blank" rel="noopener noreferrer">
              Pedir mi auditoría <span className="arrow">→</span>
            </a>
          </Magnetic>
        </motion.div>
        <motion.a
          variants={fadeUp}
          className="final-alt"
          href={waLink('contacto')}
          target="_blank"
          rel="noopener noreferrer"
        >
          ¿Prefieres conversar primero? Escríbenos por WhatsApp <span className="arrow">→</span>
        </motion.a>
      </div>
    </Reveal>
  )
}
