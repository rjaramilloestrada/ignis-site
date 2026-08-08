import { useEffect, useMemo, useRef, useState } from 'react'
import { animate, useInView, useReducedMotion } from 'framer-motion'
import { EASE } from '../motion.js'

// Anima métricas tipo "$2,500+", "< 10s", "26 pts" contando desde 0.
// Valores sin dígitos ("LOPDP", "Freemium") se renderizan estáticos.
export default function CountUp({ value }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -10% 0px' })
  const reduced = useReducedMotion()

  const parsed = useMemo(() => {
    const m = /^([^\d]*)([\d.,]+)([^\d]*)$/.exec(value)
    if (!m) return null
    return {
      prefix: m[1],
      target: Number(m[2].replace(/,/g, '')),
      suffix: m[3],
      grouped: m[2].includes(','),
    }
  }, [value])

  const [text, setText] = useState(value)

  useEffect(() => {
    if (!parsed || reduced || !inView) return undefined
    const { prefix, target, suffix, grouped } = parsed
    const controls = animate(0, target, {
      duration: 1.1,
      ease: EASE,
      onUpdate: (v) => {
        const n = Math.round(v)
        setText(prefix + (grouped ? n.toLocaleString('en-US') : String(n)) + suffix)
      },
    })
    return () => controls.stop()
  }, [parsed, reduced, inView])

  return (
    <div className="num" ref={ref}>
      {text}
    </div>
  )
}
