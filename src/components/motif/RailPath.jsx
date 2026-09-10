import { motion } from 'framer-motion'
import { drawPath } from '../../motion.js'

// Path SVG que se dibuja: con `progress` (MotionValue 0..1) sigue el scroll;
// sin él, usa la variant drawPath del sistema (hidden → show del padre).
// Va dentro de un <svg> provisto por quien lo usa.
export default function RailPath({ d, progress, className = '', stroke = 'var(--accent)', width = 2, ...rest }) {
  const common = {
    d,
    className: `rail-path ${className}`,
    fill: 'none',
    stroke,
    strokeWidth: width,
    vectorEffect: 'non-scaling-stroke',
    strokeLinecap: 'square',
    ...rest,
  }
  if (progress) return <motion.path {...common} style={{ pathLength: progress }} />
  return <motion.path {...common} variants={drawPath} />
}
