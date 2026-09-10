import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion'
import { SPRING } from '../../motion.js'

// Wrapper "magnético" para CTAs: el hijo sigue suavemente al puntero dentro de
// un radio. Solo con puntero fino y sin reduced-motion; en touch es inerte.
export default function Magnetic({ children, strength = 8, className = '', style }) {
  const ref = useRef(null)
  const reduced = useReducedMotion()
  const [enabled, setEnabled] = useState(false)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, SPRING.magnetic)
  const sy = useSpring(y, SPRING.magnetic)

  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)')
    const update = () => setEnabled(mq.matches && !reduced)
    update()
    mq.addEventListener?.('change', update)
    return () => mq.removeEventListener?.('change', update)
  }, [reduced])

  const onMove = (e) => {
    if (!enabled || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    const dx = e.clientX - (r.left + r.width / 2)
    const dy = e.clientY - (r.top + r.height / 2)
    x.set(Math.max(-strength, Math.min(strength, dx * 0.25)))
    y.set(Math.max(-strength, Math.min(strength, dy * 0.25)))
  }
  const reset = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      className={`magnetic ${className}`}
      style={{ x: sx, y: sy, ...style }}
      onPointerMove={onMove}
      onPointerLeave={reset}
    >
      {children}
    </motion.div>
  )
}
