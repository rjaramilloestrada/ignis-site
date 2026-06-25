# IGNIS — Landing Page

Landing page de **IGNIS** (Ignífera SAS): agencia de automatización, desarrollo
de software y agentes de IA en Guayaquil, Ecuador (mercado Ecuador / LATAM). Copy
100% en español.

Es la **reproducción fiel** del prototipo de Claude Design `ignis.html` (handoff
oficial), portada a **React 18 + Vite** sin frameworks de UI adicionales. Sistema
visual **"Dark Tech Pro"**: fondo `#0D0D0D`, acento naranja `#FF4400`, bordes
duros, sin esquinas redondeadas ni sombras (salvo el glow naranja de los CTAs).

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
    ├── App.jsx              Orquesta todas las secciones
    ├── index.css            CSS fiel del prototipo + estilos del menú móvil
    ├── constants.js         Enlace de WhatsApp y datos de marca
    ├── data/
    │   ├── services.js      3 tabs: Desarrollo Digital / Agentes IA / IA Empresarial
    │   ├── cases.js         Casos reales: PULSE, Glipy, Grupo Gráfico Abad
    │   └── process.js       Proceso en 4 pasos
    └── components/
        ├── Nav.jsx          Nav fijo (scroll → sólido) + hamburguesa móvil
        ├── Hero.jsx         Wordmark IGNIS + tagline + CTAs sobre el fuego
        ├── FireCanvas.jsx   Fuego de glifos monoespaciados en Canvas 2D vanilla
        ├── Services.jsx     3 tabs + tarjetas de servicio
        ├── Cases.jsx        Casos con métricas / beneficios (grid 70/30)
        ├── Process.jsx      Cómo trabajamos
        ├── FinalCta.jsx     Cierre + WhatsApp
        ├── Footer.jsx
        └── WhatsappFloat.jsx  Botón flotante de WhatsApp (verde)
```

## Fidelidad al prototipo

Se reprodujo `ignis.html` al pie de la letra: tokens, tipografías
(Montserrat 900 / JetBrains Mono / Inter), copy, estructura (3 tabs de servicios,
casos, proceso) y las **animaciones** — el CSS y la lógica del canvas/tabs/nav se
copiaron verbatim. Diferencias intencionales acordadas con el cliente:

1. **Menú hamburguesa** en móvil (<768px) para los enlaces del nav — añadido
   sobre el diseño original, que solo ocultaba los links.
2. **Se quitó el panel ⚙** de ajustes del fuego (era una herramienta de tuneo
   interna). El fuego usa los valores por defecto, así que se ve idéntico.
3. **WhatsApp** centralizado en `src/constants.js`
   → `https://wa.me/message/NP5O5VJPCRBDE1`.
4. Se completó el 4º beneficio de la tarjeta "Agente Autónomo" (en el prototipo
   la lista quedaba incompleta).

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
