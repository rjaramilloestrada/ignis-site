// Sistema de motion compartido — todos los componentes importan de aquí.
// Regla: nada de duraciones/easings hardcodeados por componente.
// Movimiento solo con transform/opacity (compositor-friendly).

export const EASE = [0.16, 1, 0.3, 1] // expo-out: arranque rápido, aterrizaje largo

// Reveal estándar de items (cards, párrafos, labels).
export const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
}

// Reveal con más peso para headlines/wordmark.
export const fadeUpSlow = {
  hidden: { opacity: 0, y: 36 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
}

// Contenedor que orquesta a sus hijos en cascada.
export const stagger = (delayChildren = 0, staggerChildren = 0.09) => ({
  hidden: {},
  show: { transition: { staggerChildren, delayChildren } },
})

// Config de viewport para whileInView: una sola vez, dispara un poco antes
// de que el elemento entre del todo.
export const VIEWPORT = { once: true, margin: '0px 0px -10% 0px' }
