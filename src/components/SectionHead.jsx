import { motion } from 'framer-motion'
import SplitText from './motif/SplitText.jsx'
import { fadeUp } from '../motion.js'

// Cabecera de sección: label mono, headline por líneas (con acento .ac-burn
// donde toque) y subtexto. Vive dentro de un <Reveal> que aporta el stagger.
export default function SectionHead({ label, lines, subtext, className = '', children }) {
  return (
    <div className={`sec-head ${className}`}>
      <motion.div variants={fadeUp} className="sec-label">
        {label}
      </motion.div>
      <SplitText as="h2" mode="lines" className="sec-headline" lines={lines} />
      {subtext && (
        <motion.p variants={fadeUp} className="sec-subtext">
          {subtext}
        </motion.p>
      )}
      {children}
    </div>
  )
}
