import { useEffect, useRef } from 'react'

// Fuego "tecnológico" de glifos monoespaciados — evolución del canvas del
// prototipo ignis.html. Canvas 2D vanilla, sin librerías.
//
// Novedades (sep 2026):
// - `heat` (MotionValue 0..1, opcional): el hero lo baja al salir por scroll;
//   menos spawn, más flotabilidad, y a heat≈0 el loop se pausa.
// - Respiración: la tasa de spawn oscila ±30% en un seno de 6s.
// - Burst de chispas al click/tap; streaks ámbar como segunda capa.
// - Disciplina: pausa cuando la sección no intersecta o la pestaña está
//   oculta; DPR 1.5 (1.25 en <700px); MAX según hardware; resize que ignora la
//   barra de URL móvil; sprite atlas de glifos (drawImage en vez de fillText).
// - Reduced motion: simula ~120 pasos y pinta un solo frame estático.
const TW = { white: 0.18, bright: 1.0 }
const CHARS = ['0', '1', '/', '\\', '|', '^', '*', '>', '<', '·']
const SIZE_BUCKETS = [6, 8, 10, 12, 14]
const BANDS = [
  [255, 68, 0], // #FF4400 ember core
  [255, 179, 63], // #FFB33F amber
  [255, 214, 150], // warm amber-white tip
]

function bandColor(i) {
  const [r0, g0, b0] = BANDS[i]
  const w = TW.white
  const r = Math.round(r0 + (255 - r0) * w)
  const g = Math.round(g0 + (255 - g0) * w)
  const b = Math.round(b0 + (255 - b0) * w)
  return `rgb(${r},${g},${b})`
}
function bandFor(t) {
  return t < 0.4 ? 0 : t < 0.7 ? 1 : 2
}
function opacityFor(t) {
  let o = t < 0.4 ? t / 0.4 : 1 - (t - 0.4) / 0.6
  o = Math.max(0, Math.min(1, o))
  if (t >= 0.7) o *= 0.35 + 0.55 * TW.white
  return Math.min(1, o * TW.bright)
}

export default function FireCanvas({ variant = 'hero', intensity = 1, heat }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return undefined
    const ctx = canvas.getContext('2d')
    const host = canvas.closest('.hero, .final-cta') || canvas.parentElement

    const lowEnd =
      (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4) ||
      navigator.connection?.saveData
    let dpr = 1
    let W = 0
    let H = 0
    let MAX = 190
    let SPAWN = 4
    let particles = []
    let streaks = []
    let rafId = 0
    let atlas = null
    let frameCount = 0

    function applyBudget() {
      const small = W < 700
      const base = variant === 'cta' ? 60 : small ? 80 : 190
      MAX = lowEnd ? Math.round(base / 2) : base
      SPAWN = variant === 'cta' ? 1.5 : small ? 2 : 4
      if (lowEnd) SPAWN *= 0.6
    }

    function buildAtlas() {
      const sprites = {}
      const pad = 1.4
      CHARS.forEach((ch) => {
        SIZE_BUCKETS.forEach((size) => {
          BANDS.forEach((_, b) => {
            const px = Math.ceil(size * pad)
            const c = document.createElement('canvas')
            c.width = Math.ceil(px * dpr)
            c.height = Math.ceil(px * dpr)
            const cc = c.getContext('2d')
            cc.setTransform(dpr, 0, 0, dpr, 0, 0)
            cc.font = `500 ${size}px 'JetBrains Mono', monospace`
            cc.textAlign = 'center'
            cc.textBaseline = 'middle'
            cc.fillStyle = bandColor(b)
            cc.fillText(ch, px / 2, px / 2)
            sprites[`${ch}|${size}|${b}`] = { c, px }
          })
        })
      })
      atlas = sprites
    }

    function resize(force) {
      const rect = canvas.getBoundingClientRect()
      const w = rect.width
      const h = rect.height
      // Barra de URL móvil: cambios solo de altura (<150px) no reasignan el canvas.
      if (!force && w === W && Math.abs(h - H) < 150) return
      W = w
      H = h
      dpr = Math.min(window.devicePixelRatio || 1, W < 700 ? 1.25 : 1.5)
      canvas.width = W * dpr
      canvas.height = H * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      applyBudget()
      if (atlas) buildAtlas()
    }
    resize(true)
    let resizeT = 0
    const onResize = () => {
      clearTimeout(resizeT)
      resizeT = setTimeout(() => resize(false), 120)
    }
    window.addEventListener('resize', onResize)

    // Atlas cuando la fuente esté lista (mientras tanto, fillText).
    let cancelled = false
    const fontReady = document.fonts?.load
      ? document.fonts.load("500 12px 'JetBrains Mono'").catch(() => null)
      : Promise.resolve()
    fontReady.then(() => {
      if (!cancelled) buildAtlas()
    })

    // Bell-curve spawn X: more spawns near center
    function bellX() {
      const r = (Math.random() + Math.random() + Math.random()) / 3
      return r * W
    }

    function spawn(x = bellX(), y = H + 6, vx = 0, vy = -(0.8 + Math.random() * 0.6), lifeScale = 1) {
      particles.push({
        x,
        y,
        vx,
        vy,
        drift: 1.5,
        freq: 0.02 + Math.random() * 0.06,
        phase: Math.random() * Math.PI * 2,
        life: 0,
        maxLife: (130 + Math.random() * 130) * lifeScale,
        size0: 10 + Math.random() * 4,
        ch: CHARS[(Math.random() * CHARS.length) | 0],
      })
    }
    function spawnStreak() {
      streaks.push({
        x: bellX(),
        y: H + 20,
        vy: -(0.5 + Math.random() * 0.4),
        len: 14 + Math.random() * 14,
        life: 0,
        maxLife: 220 + Math.random() * 120,
        phase: Math.random() * Math.PI * 2,
      })
    }
    function burst(x, y) {
      const n = 18 + ((Math.random() * 6) | 0)
      for (let i = 0; i < n && particles.length < MAX + 24; i++) {
        const a = Math.random() * Math.PI * 2
        const sp = 1.5 + Math.random() * 2.5
        spawn(x, y, Math.cos(a) * sp * 2.5, Math.sin(a) * sp - 1, 0.45)
      }
    }

    // ===== Mouse interaction =====
    const mouse = { x: -9999, y: -9999, active: false, vx: 0, lastX: -9999, touch: false }
    const MFORCE = 0.9
    function setMouse(clientX, clientY, touch) {
      const rect = canvas.getBoundingClientRect()
      const nx = clientX - rect.left
      const ny = clientY - rect.top
      if (mouse.lastX > -9000) mouse.vx = nx - mouse.lastX
      mouse.lastX = nx
      mouse.x = nx
      mouse.y = ny
      mouse.active = true
      mouse.touch = touch
    }
    function clearMouse() {
      mouse.active = false
      mouse.x = -9999
      mouse.y = -9999
      mouse.lastX = -9999
    }
    const onMouseMove = (e) => setMouse(e.clientX, e.clientY, false)
    const onTouchMove = (e) => {
      if (e.touches && e.touches[0]) setMouse(e.touches[0].clientX, e.touches[0].clientY, true)
    }
    const onPointerDown = (e) => {
      // Solo el fondo: no robar el click de los CTAs.
      if (e.target.closest('a, button')) return
      const rect = canvas.getBoundingClientRect()
      burst(e.clientX - rect.left, e.clientY - rect.top)
    }
    host.addEventListener('mousemove', onMouseMove)
    host.addEventListener('mouseleave', clearMouse)
    host.addEventListener('touchmove', onTouchMove, { passive: true })
    host.addEventListener('touchend', clearMouse)
    host.addEventListener('pointerdown', onPointerDown)

    // ===== Estado de ejecución =====
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    let visible = true // sección intersectando
    let heatVal = 1
    let running = false

    function evalRunning() {
      const next = !reduced.matches && visible && !document.hidden && heatVal > 0.02
      if (next && !running) {
        running = true
        rafId = requestAnimationFrame(frame)
      } else if (!next && running) {
        running = false
        cancelAnimationFrame(rafId)
      }
    }
    const io =
      'IntersectionObserver' in window
        ? new IntersectionObserver(
            (entries) => {
              visible = entries[0]?.isIntersecting ?? true
              evalRunning()
            },
            { threshold: 0 }
          )
        : null
    io?.observe(host)
    const onVis = () => evalRunning()
    document.addEventListener('visibilitychange', onVis)
    const unsubHeat = heat
      ? heat.on('change', (v) => {
          heatVal = v
          evalRunning()
        })
      : null
    if (heat) heatVal = heat.get()

    function step(dt) {
      frameCount += dt
      const breath = 1 + 0.3 * Math.sin((frameCount / 360) * Math.PI * 2) // ~6s a 60fps
      const rate = SPAWN * intensity * breath * heatVal
      let toSpawn = Math.floor(rate) + (Math.random() < rate % 1 ? 1 : 0)
      while (toSpawn-- > 0 && particles.length < MAX) spawn()
      if (streaks.length < (variant === 'cta' ? 3 : 7) && Math.random() < 0.04 * heatVal) spawnStreak()

      const buoy = 0.012 * (1 + (1 - heatVal) * 2)
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i]
        p.life++
        if (p.life / p.maxLife >= 1) {
          particles.splice(i, 1)
          continue
        }
        const dx0 = Math.sin(p.phase + p.life * p.freq) * p.drift
        const px = p.x + dx0 + p.vx
        if (mouse.active) {
          const MR = mouse.touch ? 90 : 150
          const ddx = px - mouse.x
          const ddy = p.y - mouse.y
          const dist = Math.sqrt(ddx * ddx + ddy * ddy)
          if (dist < MR && dist > 0.01) {
            const f = (1 - dist / MR) * MFORCE
            p.vx += (ddx / dist) * f
            p.vy += (ddy / dist) * f * 0.5
            p.vx += mouse.vx * 0.02 * (1 - dist / MR)
          }
        }
        p.vx *= 0.94
        p.vy -= buoy
        if (p.vy < -2.8) p.vy = -2.8
        p.x += p.vx * 0.35
        p.y += p.vy
      }
      for (let i = streaks.length - 1; i >= 0; i--) {
        const s = streaks[i]
        s.life++
        if (s.life / s.maxLife >= 1) {
          streaks.splice(i, 1)
          continue
        }
        s.y += s.vy - buoy * s.life * 0.02
        s.x += Math.sin(s.phase + s.life * 0.02) * 0.4
      }
    }

    function draw() {
      ctx.clearRect(0, 0, W, H)
      // Streaks ámbar (1px)
      ctx.lineWidth = 1
      for (const s of streaks) {
        const t = s.life / s.maxLife
        ctx.strokeStyle = `rgba(255,179,63,${(opacityFor(t) * 0.55).toFixed(3)})`
        ctx.beginPath()
        ctx.moveTo(s.x, s.y)
        ctx.lineTo(s.x, s.y + s.len * (1 - t * 0.5))
        ctx.stroke()
      }
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      for (const p of particles) {
        const t = p.life / p.maxLife
        const size = p.size0 - (p.size0 - 6) * t
        const op = opacityFor(t)
        const b = bandFor(t)
        const px = p.x + Math.sin(p.phase + p.life * p.freq) * p.drift
        if (atlas) {
          const bucket = SIZE_BUCKETS.reduce((a, c) => (Math.abs(c - size) < Math.abs(a - size) ? c : a))
          const sp = atlas[`${p.ch}|${bucket}|${b}`]
          ctx.globalAlpha = op
          ctx.drawImage(sp.c, px - sp.px / 2, p.y - sp.px / 2, sp.px, sp.px)
        } else {
          ctx.globalAlpha = 1
          ctx.font = `500 ${size.toFixed(1)}px 'JetBrains Mono', monospace`
          ctx.fillStyle = bandColor(b).replace('rgb(', 'rgba(').replace(')', `,${op.toFixed(3)})`)
          ctx.fillText(p.ch, px, p.y)
        }
      }
      ctx.globalAlpha = 1
    }

    function frame() {
      if (!running) return
      rafId = requestAnimationFrame(frame)
      step(1)
      draw()
    }

    function applyReduced() {
      if (reduced.matches) {
        // Un solo frame estático con el fuego ya "crecido".
        running = false
        cancelAnimationFrame(rafId)
        particles = []
        streaks = []
        for (let i = 0; i < 120; i++) step(1)
        draw()
      } else {
        evalRunning()
      }
    }
    applyReduced()
    reduced.addEventListener?.('change', applyReduced)

    return () => {
      cancelled = true
      running = false
      cancelAnimationFrame(rafId)
      clearTimeout(resizeT)
      window.removeEventListener('resize', onResize)
      host.removeEventListener('mousemove', onMouseMove)
      host.removeEventListener('mouseleave', clearMouse)
      host.removeEventListener('touchmove', onTouchMove)
      host.removeEventListener('touchend', clearMouse)
      host.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('visibilitychange', onVis)
      reduced.removeEventListener?.('change', applyReduced)
      io?.disconnect()
      unsubHeat?.()
      particles = []
      streaks = []
    }
  }, [variant, intensity, heat])

  return <canvas className={`fire-canvas fire-${variant}`} ref={canvasRef} aria-hidden="true" />
}
