import { useRef } from 'react'
import { motion } from 'framer-motion'
import useReveal from '../hooks/useReveal.js'
import { stagger } from '../motion.js'

// Contenedor de reveal por sección. Usa `animate` (no `whileInView`) sobre un
// estado con fallbacks (ver useReveal) y expone data-revealed para que el CSS
// (EmberLine, .ac-burn, numerales) dispare con el mismo trigger.
export default function Reveal({
  as = 'div',
  variants = stagger(),
  amount,
  once,
  children,
  innerRef,
  ...rest
}) {
  const own = useRef(null)
  const ref = innerRef || own
  const shown = useReveal(ref, { amount, once })
  const Tag = motion[as]
  return (
    <Tag
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={shown ? 'show' : 'hidden'}
      data-revealed={shown ? 'true' : 'false'}
      {...rest}
    >
      {children}
    </Tag>
  )
}
