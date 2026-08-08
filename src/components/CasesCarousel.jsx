import { useCallback, useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import CountUp from './CountUp.jsx'
import { fadeUp, stagger, VIEWPORT } from '../motion.js'

function CaseCard({ c }) {
  const hasSide = c.variant === 'metrics' || c.variant === 'benefits'
  return (
    <motion.div
      className={`case-card ${hasSide ? '' : 'case-card-solo'}`}
      variants={fadeUp}
    >
      <div className="case-info">
        <div className="case-type">{c.type}</div>
        <h3 className="case-name">{c.name}</h3>
        <p className="case-desc">{c.desc}</p>
        <div className="case-stack">{c.stack}</div>
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
    </motion.div>
  )
}

// Carrusel de casos: scroll-snap nativo + drag con mouse, flechas, barra de
// progreso y dimming de las cards fuera de foco. En touch manda el swipe
// nativo; el teclado (←/→) funciona con el track enfocado.
export default function CasesCarousel({ label, cases, isActive }) {
  const trackRef = useRef(null)
  const progressRef = useRef(null)
  const rafId = useRef(0)
  const dragState = useRef(null)
  const snapTimeout = useRef(0)
  const [atStart, setAtStart] = useState(true)
  const [atEnd, setAtEnd] = useState(false)
  const reduced = useReducedMotion()
  const multi = cases.length > 1

  // Sincroniza flechas, barra de progreso y dimming con la posición real.
  const sync = useCallback(() => {
    const el = trackRef.current
    if (!el) return
    const max = el.scrollWidth - el.clientWidth
    setAtStart(el.scrollLeft <= 2)
    setAtEnd(el.scrollLeft >= max - 2)
    if (progressRef.current) {
      const p = max > 0 ? Math.min(1, el.scrollLeft / max) : 1
      progressRef.current.style.transform = `scaleX(${p})`
    }
    const trackRect = el.getBoundingClientRect()
    el.querySelectorAll('.case-slide').forEach((slide) => {
      const r = slide.getBoundingClientRect()
      const visible = Math.min(r.right, trackRect.right) - Math.max(r.left, trackRect.left)
      slide.classList.toggle('is-off', visible / r.width < 0.55)
    })
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
    trackRef.current?.scrollBy({
      left: dir * slideStep(),
      behavior: reduced ? 'auto' : 'smooth',
    })
  }

  // Drag con mouse (touch usa el scroll nativo). Mientras se arrastra se
  // suspende el snap; al soltar, se re-alinea suavemente a la card más cercana.
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
    // El snap se reactiva cuando el re-alineado suave ya terminó.
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

  return (
    <>
      {multi && (
        <div className="cases-track-head">
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
        variants={stagger()}
        initial="hidden"
        whileInView="show"
        viewport={VIEWPORT}
        onScroll={onScroll}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onKeyDown={multi ? onKeyDown : undefined}
        tabIndex={multi ? 0 : undefined}
        role="group"
        aria-label={`Casos de ${label}`}
      >
        {cases.map((c) => (
          <div className="case-slide" key={c.id}>
            <CaseCard c={c} />
          </div>
        ))}
      </motion.div>

      {multi && (
        <div className="track-progress" aria-hidden="true">
          <div className="track-progress-fill" ref={progressRef} />
        </div>
      )}
    </>
  )
}
