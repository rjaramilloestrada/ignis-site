import { useCallback, useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import CountUp from './CountUp.jsx'
import { scaleIn, staggerCapped } from '../motion.js'

function CaseCard({ c }) {
  const hasSide = c.variant === 'metrics' || c.variant === 'benefits'
  const longName = c.name.length > 40
  return (
    <motion.article
      className={`case-card ${hasSide ? '' : 'case-card-solo'} ${c.kind === 'own' ? 'case-own' : ''}`}
      variants={scaleIn}
    >
      <div className="case-info">
        <div className="case-meta">
          <span className="case-type">{c.type}</span>
          {c.badge && <span className="case-badge">{c.badge}</span>}
        </div>
        <h3 className={`case-name ${longName ? 'case-name-long' : ''}`}>{c.name}</h3>
        {c.anonymized && <div className="case-anon">Nombre reservado por confidencialidad</div>}
        <p className="case-desc">{c.desc}</p>
        {c.stack && <div className="case-stack">{c.stack}</div>}
      </div>

      {hasSide && (
        <div className="case-metrics">
          {c.variant === 'metrics' ? (
            c.metrics.map((m) => (
              <div className="metric" key={m.lbl}>
                <CountUp value={m.num} />
                <div className="lbl">{m.lbl}</div>
              </div>
            ))
          ) : (
            <>
              <div className="benefits-eyebrow">{c.benefitsEyebrow}</div>
              <ul className="case-benefits">
                {c.benefits.map((b, i) => (
                  <li key={b}>
                    <span className="b-idx">{String(i + 1).padStart(2, '0')}</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      )}
    </motion.article>
  )
}

// Carrusel de casos: scroll-snap nativo + drag con mouse, flechas, contador,
// progreso segmentado y dimming de las cards fuera de foco. En touch manda el
// swipe nativo; el teclado (←/→) funciona con el track enfocado.
export default function CasesCarousel({ label, cases, isActive }) {
  const trackRef = useRef(null)
  const rafId = useRef(0)
  const dragState = useRef(null)
  const snapTimeout = useRef(0)
  const [atStart, setAtStart] = useState(true)
  const [atEnd, setAtEnd] = useState(false)
  const [index, setIndex] = useState(0)
  const reduced = useReducedMotion()
  const multi = cases.length > 1

  // Sincroniza flechas, contador y dimming con la posición real.
  const sync = useCallback(() => {
    const el = trackRef.current
    if (!el) return
    const max = el.scrollWidth - el.clientWidth
    setAtStart(el.scrollLeft <= 2)
    setAtEnd(el.scrollLeft >= max - 2)
    const trackRect = el.getBoundingClientRect()
    let best = 0
    let bestVis = -1
    el.querySelectorAll('.case-slide').forEach((slide, i) => {
      const r = slide.getBoundingClientRect()
      const visible = Math.min(r.right, trackRect.right) - Math.max(r.left, trackRect.left)
      slide.classList.toggle('is-off', visible / r.width < 0.55)
      if (visible > bestVis) {
        bestVis = visible
        best = i
      }
    })
    setIndex(best)
  }, [])

  const onScroll = useCallback(() => {
    cancelAnimationFrame(rafId.current)
    rafId.current = requestAnimationFrame(sync)
  }, [sync])

  useEffect(() => {
    if (isActive) sync()
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('resize', onScroll)
      cancelAnimationFrame(rafId.current)
      clearTimeout(snapTimeout.current)
    }
  }, [isActive, sync, onScroll])

  const slideStep = () => {
    const el = trackRef.current
    const slide = el?.querySelector('.case-slide')
    if (!el || !slide) return 0
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0
    return slide.getBoundingClientRect().width + gap
  }

  const move = (dir) => {
    trackRef.current?.scrollBy({ left: dir * slideStep(), behavior: reduced ? 'auto' : 'smooth' })
  }
  const goTo = (i) => {
    trackRef.current?.scrollTo({ left: i * slideStep(), behavior: reduced ? 'auto' : 'smooth' })
  }

  // Drag con mouse (touch usa el scroll nativo).
  const onPointerDown = (e) => {
    if (e.pointerType !== 'mouse' || !multi) return
    const el = trackRef.current
    clearTimeout(snapTimeout.current)
    dragState.current = { x: e.clientX, left: el.scrollLeft }
    el.classList.add('dragging')
    el.setPointerCapture(e.pointerId)
  }
  const onPointerMove = (e) => {
    const d = dragState.current
    if (!d) return
    trackRef.current.scrollLeft = d.left - (e.clientX - d.x)
  }
  const endDrag = (e) => {
    if (!dragState.current) return
    dragState.current = null
    const el = trackRef.current
    el.releasePointerCapture?.(e.pointerId)
    const step = slideStep()
    if (step > 0) {
      el.scrollTo({
        left: Math.round(el.scrollLeft / step) * step,
        behavior: reduced ? 'auto' : 'smooth',
      })
    }
    snapTimeout.current = setTimeout(() => el.classList.remove('dragging'), reduced ? 0 : 400)
  }

  const onKeyDown = (e) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault()
      move(-1)
    } else if (e.key === 'ArrowRight') {
      e.preventDefault()
      move(1)
    }
  }

  const pad = (n) => String(n).padStart(2, '0')

  return (
    <div className="carousel" role="region" aria-roledescription="carrusel" aria-label={`Casos de ${label}`}>
      {multi && (
        <div className="cases-track-head">
          <div className="track-counter" aria-live="polite">
            <span className="track-counter-cur">{pad(index + 1)}</span>
            <span className="track-counter-sep"> / </span>
            <span>{pad(cases.length)}</span>
          </div>
          <div className="track-controls">
            <button
              type="button"
              className="track-btn"
              onClick={() => move(-1)}
              disabled={atStart}
              aria-label={`Caso anterior de ${label}`}
            >
              ←
            </button>
            <button
              type="button"
              className="track-btn"
              onClick={() => move(1)}
              disabled={atEnd}
              aria-label={`Siguiente caso de ${label}`}
            >
              →
            </button>
          </div>
        </div>
      )}

      <motion.div
        className={`cases-track ${multi ? 'track-multi' : ''}`}
        ref={trackRef}
        variants={staggerCapped(cases.length, 0.08)}
        onScroll={onScroll}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onKeyDown={multi ? onKeyDown : undefined}
        tabIndex={multi ? 0 : undefined}
      >
        {cases.map((c, i) => (
          <div className="case-slide" key={c.id} aria-label={`${i + 1} de ${cases.length}`}>
            <CaseCard c={c} />
          </div>
        ))}
      </motion.div>

      {multi && (
        <div className="track-progress" role="tablist" aria-label="Ir a un caso">
          {cases.map((c, i) => (
            <button
              type="button"
              key={c.id}
              role="tab"
              aria-selected={i === index}
              aria-label={`Ir al caso ${i + 1}: ${c.name}`}
              className={`track-seg ${i === index ? 'active' : ''}`}
              onClick={() => goTo(i)}
            />
          ))}
        </div>
      )}
    </div>
  )
}
