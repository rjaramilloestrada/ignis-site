import { useEffect, useState } from 'react'

// Devuelve el id de la sección que cruza la banda central del viewport.
// Un solo candidato por callback (el de mayor ratio visible).
// `ids` debe ser una referencia estable (constante de módulo).
export default function useActiveSection(ids) {
  const [active, setActive] = useState('')

  useEffect(() => {
    if (!('IntersectionObserver' in window)) return undefined
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean)
    const ratios = new Map()
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => ratios.set(e.target.id, e.isIntersecting ? e.intersectionRatio : 0))
        let best = ''
        let bestRatio = 0
        ratios.forEach((r, id) => {
          if (r > bestRatio) {
            bestRatio = r
            best = id
          }
        })
        setActive(best)
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: [0, 0.01, 0.25, 0.5, 1] }
    )
    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [ids])

  return active
}
