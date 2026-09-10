import { useEffect, useState } from 'react'
import { AnimatePresence, LayoutGroup, motion, useMotionValueEvent, useScroll } from 'framer-motion'
import Magnetic from './motif/Magnetic.jsx'
import EmberLine from './motif/EmberLine.jsx'
import { waLink } from '../constants.js'
import useActiveSection from '../hooks/useActiveSection.js'
import { EASE, LOAD, fadeUp, stagger } from '../motion.js'

const LINKS = [
  { href: '#servicios', label: 'Servicios' },
  { href: '#casos', label: 'Casos' },
  { href: '#proceso', label: 'Proceso' },
  { href: '#faq', label: 'Preguntas' },
]
const SECTION_IDS = ['servicios', 'casos', 'proceso', 'faq']

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [open, setOpen] = useState(false)
  const activeSection = useActiveSection(SECTION_IDS)
  const { scrollY, scrollYProgress } = useScroll()

  // Sólido tras 60px; se oculta al bajar y reaparece al subir (histéresis
  // 8px, siempre visible en los primeros 120px). Sin setState por frame: solo
  // en cruces de umbral.
  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = scrollY.getPrevious() ?? 0
    const s = y > 60
    if (s !== scrolled) setScrolled(s)
    const delta = y - prev
    if (y < 120) {
      if (hidden) setHidden(false)
    } else if (delta > 8 && !hidden && !open) setHidden(true)
    else if (delta < -8 && hidden) setHidden(false)
  })

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

  const ctaHref = waLink('auditoria')

  return (
    <>
      <motion.nav
        id="nav"
        className={`${scrolled ? 'scrolled' : ''} ${open ? 'menu-open' : ''}`}
        animate={{ y: hidden ? '-100%' : '0%' }}
        transition={{ duration: 0.35, ease: EASE }}
        initial={false}
      >
        <motion.a
          href="#inicio"
          className="nav-logo"
          onClick={() => setOpen(false)}
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: LOAD.logo, duration: 0.6, ease: EASE }}
        >
          IGN<span className="ac">IS</span>
        </motion.a>

        <LayoutGroup id="nav">
          <ul className="nav-links">
            {LINKS.map((l) => {
              const active = activeSection === l.href.slice(1)
              return (
                <li key={l.href}>
                  <a href={l.href} className={active ? 'active' : ''}>
                    <span className="nav-text">
                      <span className="nav-t1">{l.label}</span>
                      <span className="nav-t2" aria-hidden="true">
                        {l.label}
                      </span>
                    </span>
                    {active && (
                      <motion.span
                        className="nav-underline"
                        layoutId="nav-underline"
                        transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                      />
                    )}
                  </a>
                </li>
              )
            })}
          </ul>
        </LayoutGroup>

        <div className="nav-right">
          <Magnetic strength={5}>
            <a className="nav-cta" href={ctaHref} target="_blank" rel="noopener noreferrer">
              Pedir auditoría
            </a>
          </Magnetic>
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

        <motion.span className="nav-progress" style={{ scaleX: scrollYProgress }} aria-hidden="true" />
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
            transition={{ duration: 0.25 }}
          >
            <motion.div
              className="mobile-menu-inner"
              variants={stagger(0.1, 0.06)}
              initial="hidden"
              animate="show"
              data-revealed="true"
            >
              {LINKS.map((l, i) => (
                <motion.a key={l.href} href={l.href} onClick={() => setOpen(false)} variants={fadeUp}>
                  <span className="mobile-idx" aria-hidden="true">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  {l.label}
                </motion.a>
              ))}
              <motion.div variants={fadeUp} className="mobile-menu-foot">
                <EmberLine />
                <a
                  className="nav-cta"
                  href={ctaHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                >
                  Pedir auditoría
                </a>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
