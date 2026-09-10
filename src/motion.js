// Sistema de motion compartido — todos los componentes importan de aquí.
// Regla: nada de duraciones/easings hardcodeados por componente.
// Movimiento solo con transform/opacity (compositor-friendly). Excepciones
// sancionadas: `color` (ignite), `pathLength` (rail) y `height` (acordeón),
// cada una protegida con useReducedMotion() en el componente que la usa.

export const EASE = [0.16, 1, 0.3, 1] // expo-out: arranque rápido, aterrizaje largo
export const EASE_IN_OUT = [0.83, 0, 0.17, 1] // trazos de path, cortinas
export const EASE_IGNITE = [0.22, 1, 0.36, 1] // snaps de color

export const DUR = { xs: 0.18, sm: 0.32, md: 0.5, lg: 0.8, xl: 1.2 }
export const STAGGER = { tight: 0.04, base: 0.09, loose: 0.14 }
export const SPRING = {
  soft: { type: 'spring', stiffness: 120, damping: 20, mass: 1 },
  snappy: { type: 'spring', stiffness: 400, damping: 30 },
  magnetic: { type: 'spring', stiffness: 150, damping: 15, mass: 0.1 },
}

// Offsets (s) de la secuencia de carga del hero, medidos desde la hidratación.
export const LOAD = { logo: 0.05, label: 0.15, word: 0.25, tagline: 0.75, body: 0.9, ctas: 1.0, cue: 1.2 }

// Reveal estándar de items (cards, párrafos, labels).
export const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: DUR.md, ease: EASE } },
}

// Reveal con más peso para headlines/wordmark.
export const fadeUpSlow = {
  hidden: { opacity: 0, y: 36 },
  show: { opacity: 1, y: 0, transition: { duration: DUR.lg, ease: EASE } },
}

// Fragmentos enmascarados (SplitText): suben desde fuera de la máscara.
export const lineReveal = {
  hidden: { y: '110%' },
  show: { y: 0, transition: { duration: DUR.lg, ease: EASE } },
}
export const letterReveal = lineReveal
export const wordReveal = {
  hidden: { y: '100%', opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 0.6, ease: EASE } },
}

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.98 },
  show: { opacity: 1, scale: 1, transition: { duration: DUR.md, ease: EASE } },
}

// Ámbar → acento: el "encendido" de los acentos.
export const ignite = {
  hidden: { color: '#FFB33F' },
  show: { color: '#FF4400', transition: { duration: 0.3, ease: EASE_IGNITE } },
}

export const drawPath = {
  hidden: { pathLength: 0 },
  show: { pathLength: 1, transition: { duration: DUR.xl, ease: EASE_IN_OUT } },
}

export const accordion = {
  collapsed: {
    height: 0,
    opacity: 0,
    transition: { height: { duration: DUR.sm, ease: EASE }, opacity: { duration: DUR.xs } },
  },
  open: {
    height: 'auto',
    opacity: 1,
    transition: { height: { duration: 0.4, ease: EASE }, opacity: { duration: 0.25, delay: 0.1 } },
  },
}

// Contenedor que orquesta a sus hijos en cascada.
export const stagger = (delayChildren = 0, staggerChildren = STAGGER.base) => ({
  hidden: {},
  show: { transition: { staggerChildren, delayChildren } },
})

// Cascada con tope: con muchos hijos el stagger total no supera cap*base.
export const staggerCapped = (n, base = STAGGER.base, cap = 6) =>
  stagger(0, n > cap ? (base * cap) / n : base)

// Config de viewport para whileInView (elementos sueltos; las secciones usan
// <Reveal>, que tiene fallbacks propios).
export const VIEWPORT = { once: true, margin: '0px 0px -10% 0px' }
