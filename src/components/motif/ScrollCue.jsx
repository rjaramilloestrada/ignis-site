import { motion, useScroll, useTransform } from 'framer-motion'
import { fadeUp } from '../../motion.js'

// Indicador de scroll del hero: label mono + línea con una "gota" ámbar que
// baja en loop (CSS). Se desvanece en los primeros 80px de scroll.
export default function ScrollCue() {
  const { scrollY } = useScroll()
  const opacity = useTransform(scrollY, [0, 80], [1, 0])
  return (
    <motion.div className="scroll-cue" variants={fadeUp} style={{ opacity }} aria-hidden="true">
      <span className="scroll-cue-label">Scroll</span>
      <span className="scroll-cue-line">
        <span className="scroll-cue-drip" />
      </span>
    </motion.div>
  )
}
