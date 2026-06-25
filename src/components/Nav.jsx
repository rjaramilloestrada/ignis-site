import { useEffect, useState } from 'react'
import { WHATSAPP_URL } from '../constants.js'

const LINKS = [
  { href: '#servicios', label: 'Servicios' },
  { href: '#casos', label: 'Casos' },
  { href: '#proceso', label: 'Proceso' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  // Estado de scroll: nav transparente → sólido tras 60px (igual que el prototipo).
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Menú móvil: bloquea scroll y cierra con Escape / resize a desktop.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    if (!open) return undefined
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false)
    }
    const onResize = () => {
      if (window.innerWidth >= 768) setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('resize', onResize)
    }
  }, [open])

  useEffect(() => () => {
    document.body.style.overflow = ''
  }, [])

  return (
    <>
      <nav id="nav" className={scrolled ? 'scrolled' : ''}>
        <a href="#inicio" className="nav-logo" onClick={() => setOpen(false)}>
          IGN<span className="ac">IS</span>
        </a>
        <ul className="nav-links">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a href={l.href}>{l.label}</a>
            </li>
          ))}
        </ul>
        <div className="nav-right">
          <a
            className="nav-cta"
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            Hablar ahora
          </a>
          <button
            type="button"
            className={`nav-toggle ${open ? 'open' : ''}`}
            aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      <div id="mobile-menu" className={`mobile-menu ${open ? 'open' : ''}`} hidden={!open}>
        {LINKS.map((l) => (
          <a key={l.href} href={l.href} onClick={() => setOpen(false)}>
            {l.label}
          </a>
        ))}
        <a
          className="nav-cta"
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => setOpen(false)}
        >
          Hablar ahora
        </a>
      </div>
    </>
  )
}
