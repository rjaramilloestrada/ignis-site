import { motion } from 'framer-motion'
import { letterReveal, lineReveal, wordReveal, stagger, STAGGER } from '../../motion.js'

// Texto partido en unidades enmascaradas (letras, palabras o líneas) que
// entran desde abajo. El wrapper solo define `variants`: el padre (Reveal o el
// hero) decide initial/animate, así todo el bloque se coreografía junto.
// Accesibilidad: el wrapper lleva aria-label con el texto completo y cada
// fragmento va aria-hidden, así los lectores de pantalla leen una sola frase.
const VARIANTS = { letters: letterReveal, words: wordReveal, lines: lineReveal }
const DEFAULT_STAGGER = { letters: 0.06, words: STAGGER.tight, lines: 0.12 }

export default function SplitText({
  as = 'span',
  text,
  lines,
  mode = 'words',
  className = '',
  staggerChildren,
  delayChildren = 0,
  unitClassName = '',
  ...rest
}) {
  const Tag = motion[as]
  const v = VARIANTS[mode]
  const label = text ?? (lines || []).map((l) => (typeof l === 'string' ? l : '')).join(' ')

  let units
  if (mode === 'lines') {
    units = (lines || []).map((line, i) => (
      <span className="mask mask-block" key={i} aria-hidden="true">
        <motion.span className={`unit ${unitClassName}`} variants={v}>
          {line}
        </motion.span>
      </span>
    ))
  } else if (mode === 'letters') {
    units = Array.from(text).map((ch, i) => (
      <span className="mask" key={i} aria-hidden="true">
        <motion.span className={`unit ${unitClassName}`} variants={v}>
          {ch === ' ' ? ' ' : ch}
        </motion.span>
      </span>
    ))
  } else {
    units = text.split(' ').map((w, i, arr) => (
      <span key={i} aria-hidden="true">
        <span className="mask">
          <motion.span className={`unit ${unitClassName}`} variants={v}>
            {w}
          </motion.span>
        </span>
        {i < arr.length - 1 ? ' ' : null}
      </span>
    ))
  }

  return (
    <Tag
      className={`split ${className}`}
      aria-label={label}
      variants={stagger(delayChildren, staggerChildren ?? DEFAULT_STAGGER[mode])}
      {...rest}
    >
      {units}
    </Tag>
  )
}
