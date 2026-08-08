# IGNIS — Landing Page

Landing page de **IGNIS** (Ignífera SAS): agencia de automatización, desarrollo
de software y agentes de IA en Guayaquil, Ecuador (mercado Ecuador / LATAM). Copy
100% en español.

Nació como la **reproducción fiel** del prototipo de Claude Design `ignis.html`
(handoff oficial), portada a **React 18 + Vite**. Desde agosto 2026 evolucionó
sobre esa base: sistema de animaciones con **Framer Motion** y cambios de copy
que priorizan IA Empresarial (ver "Evolución post-prototipo"). Sistema visual
**"Dark Tech Pro"**: fondo `#0D0D0D`, acento naranja `#FF4400`, bordes duros,
sin esquinas redondeadas ni sombras (salvo el glow naranja de los CTAs).

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
├── index.html              Entry de Vite + SEO (meta, OG, Twitter, geo, JSON-LD)
├── public/
│   ├── robots.txt
│   ├── sitemap.xml
│   ├── site.webmanifest
│   └── favicon.svg          Marca IGNIS (IGN blanco + IS naranja)
└── src/
    ├── main.jsx
    ├── App.jsx              Orquesta todas las secciones (envuelto en MotionConfig)
    ├── index.css            CSS del prototipo + menú móvil + estilos de motion
    ├── constants.js         Enlace de WhatsApp y datos de marca
    ├── motion.js            Variants/easings compartidos de Framer Motion
    ├── hooks/
    │   └── useActiveSection.js  IntersectionObserver → link activo del nav
    ├── data/
    │   ├── services.js      3 tabs: IA Empresarial / Agentes IA / Desarrollo Digital
    │   ├── cases.js         Casos reales con categoría (dev/ia/ent) y status
    │   │                    published/draft — los drafts no se renderizan
    │   ├── objections.js    Bloque de objeciones (3 Q&A, copy del handoff)
    │   └── process.js       Proceso en 4 pasos
    └── components/
        ├── Nav.jsx          Nav fijo (scroll → sólido) + sección activa + hamburguesa
        ├── Hero.jsx         Wordmark IGNIS + tagline + CTAs sobre el fuego
        ├── FireCanvas.jsx   Fuego de glifos monoespaciados en Canvas 2D vanilla
        ├── Services.jsx     3 tabs + tarjetas de servicio (AnimatePresence)
        ├── Cases.jsx        Casos filtrados por la tab activa de Servicios,
        │                    scroll-snap horizontal, placeholder si no hay casos
        ├── CountUp.jsx      Count-up de métricas ("$2,500+", "< 10s", "26 pts")
        ├── Process.jsx      Cómo trabajamos (números que se "encienden")
        ├── Objections.jsx   Preguntas directas antes del CTA
        ├── FinalCta.jsx     Cierre + WhatsApp (glow pulsante)
        ├── Footer.jsx
        └── WhatsappFloat.jsx  Botón flotante de WhatsApp (verde, entrada pop)
```

## Fidelidad al prototipo

La base reprodujo `ignis.html` al pie de la letra: tokens, tipografías
(Montserrat 900 / JetBrains Mono / Inter), copy y estructura. Diferencias
intencionales de la versión original acordadas con el cliente:

1. **Menú hamburguesa** en móvil (<768px) para los enlaces del nav — añadido
   sobre el diseño original, que solo ocultaba los links.
2. **Se quitó el panel ⚙** de ajustes del fuego (era una herramienta de tuneo
   interna). El fuego usa los valores por defecto, así que se ve idéntico.
3. **WhatsApp** centralizado en `src/constants.js`
   → `https://wa.me/message/NP5O5VJPCRBDE1`.
4. Se completó el 4º beneficio de la tarjeta "Agente Autónomo" (en el prototipo
   la lista quedaba incompleta).

## Evolución post-prototipo (agosto 2026)

1. **Copy con foco en IA Empresarial** (handoff `copy-ia-empresarial`): IA
   Empresarial es la primera pestaña y la activa por default; hero nuevo
   ("Tu equipo ya usa IA…"); sub-headline "No es una demo…" sobre los cards del
   tab; nueva sección de Objeciones entre Proceso y el CTA final; línea del
   card Agente Autónomo reescrita. La paleta y la tipografía no cambiaron.
2. **Sistema de animaciones con Framer Motion**: entrada del hero en cascada,
   reveals por sección con `whileInView` (una sola vez), transición de tabs con
   `AnimatePresence`, count-up de métricas, números de Proceso que se encienden,
   glow pulsante del CTA, nav con sección activa y micro-interacciones hover.
   Variants/easings compartidos en `src/motion.js`; movimiento solo con
   transform/opacity. Todo respeta `prefers-reduced-motion` (vía
   `MotionConfig reducedMotion="user"` + bloque CSS) — con motion reducido el
   contenido aparece sin desplazamientos y las métricas muestran su valor final.
3. **Casos Reales dinámicos**: los casos viven en `src/data/cases.js` con
   `category` (matchea los ids de las tabs de Servicios: `dev`/`ia`/`ent`) y
   `status` (`published`/`draft` — los drafts existen en código pero no llegan
   al DOM). La sección Casos filtra por la tab activa de Servicios (estado
   compartido en `App.jsx`) y presenta cada categoría en un carrusel
   horizontal (`CasesCarousel.jsx`): `scroll-snap` nativo + drag con mouse,
   flechas ←/→ (ocultas en móvil, donde manda el swipe), barra de progreso,
   dimming de cards fuera de foco, teclado (←/→ con el track enfocado) y sin
   auto-rotate. Una categoría sin casos publicados muestra un placeholder
   honesto. Para publicar un caso `draft`, basta cambiar su `status` a
   `'published'`.

### Fuego del hero (`FireCanvas.jsx`)

Partículas de glifos monoespaciados (`0 1 / \ | ^ * > < ·`) que suben como fuego,
con spawn en campana hacia el centro, física de flotabilidad y empuje reactivo al
mouse/touch. Canvas 2D vanilla, sin librerías; se pausa con
`prefers-reduced-motion`.

## Assets

Los íconos y la tarjeta social viven en `public/` (provistos por el cliente vía
handoff de Claude Design, derivados del isotipo IGNIS de tres lascas térmicas):
`favicon.svg`, `favicon.ico`, `favicon-32.png`, `apple-touch-icon.png`,
`icon-192.png`, `icon-512.png`, `icon-512-maskable.png`, `og-image.jpg` (1200×630).
Todos están cableados en `index.html` y `site.webmanifest`.

## SEO

`index.html` está optimizado para `ignifera.com` con foco en *agencia de IA en
Ecuador, automatización, agencia de marketing con IA, desarrollo de software,
agentes de IA, bots de WhatsApp y Claude para empresas*: title/description/
keywords, canonical, hreflang `es-EC`, Open Graph + Twitter (con `og-image.jpg`),
meta geo (Guayaquil) y JSON-LD (`ProfessionalService` con `alternateName`,
`areaServed`, `knowsAbout`, catálogo de servicios + `WebSite`). En `public/`:
`robots.txt`, `sitemap.xml`, `site.webmanifest`.
