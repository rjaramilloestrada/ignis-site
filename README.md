# IGNIS — Landing Page

Landing page de **IGNIS** (Ignífera SAS): agencia de inteligencia artificial en
Guayaquil, Ecuador (mercado Ecuador / LATAM). Copy 100% en español.

Nació como la **reproducción fiel** del prototipo de Claude Design `ignis.html`
(handoff oficial), portada a **React 18 + Vite**. Desde agosto 2026 evolucionó
sobre esa base (Framer Motion, foco en IA Empresarial) y en **septiembre 2026**
migró al modelo comercial de **escalera de tres pasos** con un rediseño visual
y de motion sobre el mismo sistema (ver "Evolución"). Sistema visual **"Dark
Tech Pro"**: fondo `#0D0D0D`, acento naranja `#FF4400`, ámbar `#FFB33F` solo
como color de encendido, bordes duros, sin esquinas redondeadas ni sombras
(salvo el glow naranja de los CTAs).

## Cómo correrlo

```bash
npm install      # instala dependencias
npm run dev      # servidor local en http://localhost:5173
npm run build    # build de producción a dist/
npm run preview  # sirve el build de dist/
```

## Estructura

```
ignis-site/
├── index.html              Entry de Vite + SEO (meta, OG, Twitter, geo, JSON-LD:
│                           ProfessionalService + OfferCatalog escalera + FAQPage)
├── public/
│   ├── fonts/montserrat-900-latin.woff2   Fuente display auto-hospedada (LCP)
│   ├── robots.txt · sitemap.xml · site.webmanifest · favicons · og-image.jpg
└── src/
    ├── main.jsx
    ├── App.jsx              Orquesta secciones; estado del filtro de Casos
    ├── index.css            Tokens (tipografía fluida, espaciado, capas, motion),
    │                        contraste AA, motivos, responsive, reduced-motion
    ├── constants.js         WhatsApp: waLink(key) con textos prellenados por CTA
    ├── motion.js            Variants/easings/springs/duraciones compartidos
    ├── hooks/
    │   ├── useReveal.js     Reveal por sección con fallbacks (IO roto → scroll)
    │   ├── useFontsReady.js Espera fuentes (≤500ms) antes de revelar el hero
    │   └── useActiveSection.js  Sección activa para el nav
    ├── data/
    │   ├── ladder.js        La escalera: niveles de auditoría, diagnóstico,
    │   │                    Taller / Software, capacidades (render flag) y filtros
    │   ├── cases.js         Casos reales: steps[], kind, anonymized, priority, status
    │   ├── process.js       Cómo trabajamos (4 pasos alineados a la escalera)
    │   ├── faq.js           Preguntas directas (6)
    │   └── ticker.js        Banda marquee (industrias + stack)
    └── components/
        ├── Reveal.jsx       Contenedor de reveal (animate + data-revealed)
        ├── SectionHead.jsx  Label + headline por líneas + subtexto
        ├── Nav.jsx          Nav fijo: progreso de scroll, auto-hide, subrayado
        │                    deslizante, swap de texto, menú móvil animado
        ├── Hero.jsx         Wordmark por letras, fuego, cortina sticky, scroll cue
        ├── FireCanvas.jsx   Fuego de glifos (Canvas 2D): heat por scroll, burst,
        │                    streaks, sprite atlas, pausa fuera de viewport
        ├── Ladder.jsx       Servicios como escalera: rail que se dibuja con el
        │                    scroll, Auditoría → Diagnóstico → Taller / Software
        ├── Cases.jsx        Chips Todos / Taller / Software (píldora deslizante)
        ├── CasesCarousel.jsx  Scroll-snap + drag, contador, progreso segmentado
        ├── CountUp.jsx      Count-up de métricas ("$2,500+", "10/10", "300+")
        ├── Process.jsx      4 pasos con numerales que se encienden
        ├── Faq.jsx          Acordeón editorial accesible (↑↓ Home End)
        ├── FinalCta.jsx     Cierre con el fuego de vuelta + CTA magnético
        ├── Footer.jsx · WhatsappFloat.jsx
        └── motif/           Grain · Ticker · SplitText · EmberLine · BigNumeral ·
                             RailPath · Magnetic · ScrollCue
```

## Evolución (septiembre 2026): escalera de servicios

Handoff de Marketing (10 sep 2026). El sitio ya no vende un catálogo de tres
líneas: vende un camino de tres pasos.

1. **Auditoría a la medida** (entrada, pagada, escalada por alcance): Flash ·
   Framework remoto · On-site completo (este último solo tras una auditoría
   previa: sin CTA).
2. **Diagnóstico**: Gente, Proceso o ambos. El copy nunca fuerza una sola
   respuesta.
3. **Taller a la medida** (2 sesiones, RCTFL, sin dependencia) o **Software a
   la medida** (entrada por "ancla", fase 2 solo sobre resultados).

Reglas que el código respeta:

- **Sin precios públicos.** Ningún rango ni cifra en copy ni JSON-LD.
- **Sin CTA gratis.** Cero "sin esperas / 15 minutos / sin costo": el CTA
  principal de hero, nav, escalera y cierre es "Pedir mi auditoría". El
  contacto informal queda como enlace secundario y en el botón flotante.
- **Anonimización.** Dos casos de Software (seguros) van sin nombre real. El
  nombre real de esos clientes no debe aparecer en código, comentarios ni
  commits. Se describen por sector, tal como en `src/data/cases.js`.
- **Catálogo viejo.** Web App/PWA, MVP, App Móvil, Agente de WhatsApp,
  Automatizaciones y Agente Autónomo son "capacidades" dentro de Software.
  Landing Pro y Tienda Online quedan en `ladder.js` con `render: false`. Lead
  Radar está retirado temporalmente (`render: false, retired: true`).
- **Casos.** `steps[]` etiqueta el paso entregado (puede ser más de uno);
  `kind: 'own'` marca producto propio (Glipy, badge "Producto propio", último);
  PULSE es cliente. Grupo Gráfico Abad: 2 sesiones, 10/10. Big Vision sigue
  `draft` (nunca llega al DOM). No hay chip "Auditoría" en Casos: su entregable
  es el diagnóstico; una nota lo explica.
- **FAQPage en `index.html`** duplica el copy de `src/data/faq.js`. Si cambia
  una, cambia la otra a mano.

### Pendientes del owner

- Número de WhatsApp en E.164 (`WHATSAPP_NUMBER` en `src/constants.js`) para
  activar los textos prellenados por CTA. Mientras esté vacío todo va al
  short-link actual.
- Confirmar si la administradora de servicios médicos también recibió taller
  (agregar `STEP.TALLER` a sus `steps`).
- Big Vision: cambiar `status` a `'published'` cuando se dicten las sesiones.

## Sistema de motion y diseño (septiembre 2026)

- **Tokens** en `:root`: escala tipográfica fluida (`--fs-0…6`, `--fs-display`),
  espaciado (`--space-1…9`), capas z, duraciones/easings. `--muted #444` es
  solo trazo; el texto secundario usa `--ink-3 #8C8C8C` (contraste AA).
- **Reveal robusto** (`useReveal`): `animate` con estado en vez de
  `whileInView`. Si el IntersectionObserver no dispara en 1.5s (paneles
  embebidos, renderers), cae a un fallback por scroll. Nada queda invisible.
- **Hero**: wordmark por letras enmascaradas ("IS" arde ámbar → naranja),
  glow, fuego con `heat` ligado al scroll, salida en cortina (`position:
  sticky`; `.page-body` desliza encima), scroll cue, secuencia de carga sin
  preloader y espera de fuentes (`useFontsReady`, ≤500ms).
- **Motivos**: `EmberLine` (línea que se enciende + chispa), `BigNumeral`
  (numerales contorneados que se rellenan), `Ticker`, textura de glifos en
  esquinas (`.section[data-texture]`), `Magnetic` (solo puntero fino),
  `.ac-burn` (acento que parpadea una vez al revelarse), grano de película.
- **Escalera**: rail vertical con `useScroll` de la sección; etapas 0-3 por
  umbrales (`data-stage`), ramas SVG (`RailPath`) hacia Taller/Software.
- **Fuego** (`FireCanvas`): DPR 1.5 (1.25 <700px), presupuesto por hardware,
  sprite atlas, pausa cuando no intersecta / pestaña oculta / heat≈0, burst al
  click, respiración, streaks. Segunda instancia en el cierre.
- **Reduced motion**: `MotionConfig reducedMotion="user"` + bloque CSS: todo
  visible en estado final, sin desplazamientos; el fuego pinta un frame fijo.
- **Accesibilidad**: skip link, `:focus-visible` global, hover solo bajo
  `(hover: hover) and (pointer: fine)`, mono mínimo 12px (11px solo en
  etiquetas decorativas), objetivos táctiles ≥44px, acordeón con teclado,
  carrusel con `aria-roledescription` y contador `aria-live`.

## Fidelidad al prototipo original

La base reprodujo `ignis.html` al pie de la letra. Diferencias intencionales
acordadas con el cliente en junio 2026: menú hamburguesa móvil, sin panel ⚙ de
ajustes del fuego, WhatsApp centralizado en `src/constants.js`, 4º beneficio
de "Agente Autónomo" completado.

## Assets y SEO

Íconos y tarjeta social en `public/` (isotipo IGNIS de tres lascas térmicas),
cableados en `index.html` y `site.webmanifest`. `index.html` apunta a
`ignifera.com`: title/description/keywords (auditoría de IA, capacitación en IA,
software a la medida, agencia de IA Ecuador), canonical, hreflang `es-EC`, Open
Graph + Twitter, geo (Guayaquil) y JSON-LD. `theme-color` = `#0D0D0D`.
