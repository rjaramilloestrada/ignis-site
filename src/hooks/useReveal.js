import { useEffect, useState } from 'react'
import { useInView } from 'framer-motion'

// Salud del IntersectionObserver a nivel de página. Observamos el <html>
// (siempre intersecta): si en 1.5s no llega ningún callback, el IO está roto
// en este contexto (paneles embebidos, renderers de captura) y los reveals
// pasan a un fallback por scroll. Así ningún contenido queda invisible, y en
// navegadores normales los reveals por scroll siguen intactos.
let ioState = 'unknown' // 'unknown' | 'probing' | 'ok' | 'broken'
const listeners = new Set()

function probeIO() {
  if (typeof window === 'undefined' || ioState !== 'unknown') return
  if (!('IntersectionObserver' in window)) {
    ioState = 'broken'
    return
  }
  ioState = 'probing'
  let settled = false
  const obs = new IntersectionObserver(() => {
    if (settled) return
    settled = true
    ioState = 'ok'
    obs.disconnect()
  })
  obs.observe(document.documentElement)
  setTimeout(() => {
    if (settled) return
    settled = true
    ioState = 'broken'
    obs.disconnect()
    listeners.forEach((fn) => fn())
  }, 1500)
}

function rectVisible(el, marginRatio = 0.1) {
  const r = el.getBoundingClientRect()
  const vh = window.innerHeight || document.documentElement.clientHeight
  return r.bottom > 0 && r.top < vh * (1 - marginRatio)
}

// Devuelve true cuando el elemento debe mostrarse.
export default function useReveal(ref, { once = true, amount = 0.15, margin = '0px 0px -10% 0px' } = {}) {
  const inView = useInView(ref, { once, amount, margin })
  const [forced, setForced] = useState(false)

  useEffect(() => {
    probeIO()
    if (forced) return undefined
    const el = ref.current
    if (!el) return undefined

    let cleanup = () => {}
    const startFallback = () => {
      const check = () => {
        if (rectVisible(el)) {
          setForced(true)
          cleanup()
        }
      }
      check()
      window.addEventListener('scroll', check, { passive: true })
      window.addEventListener('resize', check)
      cleanup = () => {
        window.removeEventListener('scroll', check)
        window.removeEventListener('resize', check)
      }
    }

    if (ioState === 'broken') startFallback()
    else listeners.add(startFallback)

    return () => {
      listeners.delete(startFallback)
      cleanup()
    }
  }, [ref, forced])

  return inView || forced
}
