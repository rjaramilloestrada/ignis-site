import { useEffect, useRef } from 'react'

// Fuego "tecnológico" de glifos monoespaciados — port verbatim del canvas de
// project/ignis.html. El panel de ajustes se quitó; TW queda fijo en sus valores
// por defecto, así que la animación se ve idéntica al prototipo.
const TW = { white: 0.18, bright: 1.0, density: 1.0 }

export default function FireCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const hero = canvas.closest('.hero') || canvas.parentElement

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
    let W = 0
    let H = 0
    const chars = ['0', '1', '/', '\\', '|', '^', '*', '>', '<', '·']
    let particles = []
    let MAX = 200
    let SPAWN = 4
    let rafId = 0

    function resize() {
      const rect = canvas.getBoundingClientRect()
      W = rect.width
      H = rect.height
      canvas.width = W * dpr
      canvas.height = H * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      // scale workload to viewport so the page stays light + responsive
      const small = W < 700
      MAX = small ? 90 : 190
      SPAWN = small ? 2 : 4
    }
    resize()
    window.addEventListener('resize', resize)

    // Bell-curve spawn X: more spawns near center
    function bellX() {
      const r = (Math.random() + Math.random() + Math.random()) / 3
      return r * W
    }

    function spawn() {
      particles.push({
        x: bellX(),
        y: H + 6,
        vx: 0,
        vy: -(0.8 + Math.random() * 0.6),
        drift: 1.5,
        freq: 0.02 + Math.random() * 0.06,
        phase: Math.random() * Math.PI * 2,
        life: 0,
        maxLife: 130 + Math.random() * 130,
        size0: 10 + Math.random() * 4,
        ch: chars[(Math.random() * chars.length) | 0],
      })
    }

    // ===== Mouse interaction =====
    const mouse = { x: -9999, y: -9999, active: false, vx: 0, lastX: -9999 }
    const MR = 150 // influence radius
    const MFORCE = 0.9 // push strength
    function setMouse(clientX, clientY) {
      const rect = canvas.getBoundingClientRect()
      const nx = clientX - rect.left
      const ny = clientY - rect.top
      if (mouse.lastX > -9000) mouse.vx = nx - mouse.lastX
      mouse.lastX = nx
      mouse.x = nx
      mouse.y = ny
      mouse.active = true
    }
    function onMouseMove(e) {
      setMouse(e.clientX, e.clientY)
    }
    function onMouseLeave() {
      mouse.active = false
      mouse.x = -9999
      mouse.y = -9999
      mouse.lastX = -9999
    }
    function onTouchMove(e) {
      if (e.touches && e.touches[0]) setMouse(e.touches[0].clientX, e.touches[0].clientY)
    }
    function onTouchEnd() {
      mouse.active = false
      mouse.x = -9999
      mouse.y = -9999
      mouse.lastX = -9999
    }
    hero.addEventListener('mousemove', onMouseMove)
    hero.addEventListener('mouseleave', onMouseLeave)
    hero.addEventListener('touchmove', onTouchMove, { passive: true })
    hero.addEventListener('touchend', onTouchEnd)

    function colorFor(t) {
      // base color by life fraction 0..1
      let r, g, b
      if (t < 0.4) {
        r = 255
        g = 68
        b = 0
      } // #FF4400 ember core
      else if (t < 0.7) {
        r = 255
        g = 179
        b = 63
      } // #FFB33F amber
      else {
        r = 255
        g = 214
        b = 150
      } // warm amber-white tip
      const w = TW.white
      r = Math.round(r + (255 - r) * w)
      g = Math.round(g + (255 - g) * w)
      b = Math.round(b + (255 - b) * w)
      return r + ',' + g + ',' + b
    }

    function opacityFor(t) {
      // fade in to peak at 40% life, fade out to 0
      let o
      if (t < 0.4) o = t / 0.4
      else o = 1 - (t - 0.4) / 0.6
      o = Math.max(0, Math.min(1, o))
      if (t >= 0.7) o *= 0.35 + 0.55 * TW.white
      return Math.min(1, o * TW.bright)
    }

    let running = true
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    function applyReduced() {
      running = !reduced.matches
    }
    applyReduced()
    if (reduced.addEventListener) reduced.addEventListener('change', applyReduced)

    function frame() {
      rafId = requestAnimationFrame(frame)
      if (!running) return

      ctx.clearRect(0, 0, W, H)

      // spawn (density scales rate)
      const rate = Math.round(SPAWN * TW.density)
      for (let s = 0; s < rate && particles.length < MAX; s++) spawn()

      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i]
        p.life++
        const t = p.life / p.maxLife
        if (t >= 1) {
          particles.splice(i, 1)
          continue
        }

        const dx0 = Math.sin(p.phase + p.life * p.freq) * p.drift
        let px = p.x + dx0 + p.vx

        // mouse force: push particles away from the cursor + nudge with its motion
        if (mouse.active) {
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
        p.vx *= 0.94 // damping
        p.vy -= 0.012 // buoyancy: heat accelerates upward
        if (p.vy < -2.8) p.vy = -2.8
        p.x += p.vx * 0.35
        p.y += p.vy
        px = p.x + dx0

        const size = p.size0 - (p.size0 - 6) * t
        const op = opacityFor(t)
        const col = colorFor(t)

        ctx.font = '500 ' + size.toFixed(1) + "px 'JetBrains Mono', monospace"
        ctx.fillStyle = 'rgba(' + col + ',' + op.toFixed(3) + ')'
        ctx.fillText(p.ch, px, p.y)
      }
    }
    rafId = requestAnimationFrame(frame)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', resize)
      hero.removeEventListener('mousemove', onMouseMove)
      hero.removeEventListener('mouseleave', onMouseLeave)
      hero.removeEventListener('touchmove', onTouchMove)
      hero.removeEventListener('touchend', onTouchEnd)
      if (reduced.removeEventListener) reduced.removeEventListener('change', applyReduced)
      particles = []
    }
  }, [])

  return <canvas id="fire-canvas" ref={canvasRef} aria-hidden="true" />
}
