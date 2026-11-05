// Plugin de Vite: inyecta en <div id="root"> un respaldo de texto plano con el
// contenido publicado del sitio (servicios, proceso, FAQ).
//
// Por qué existe: el sitio es una SPA de React. En el HTML crudo, <div id="root">
// está vacío, y los rastreadores que no ejecutan JavaScript (varios de los de
// buscadores de IA) no ven nada de la página. React 18 reemplaza el contenido
// del contenedor al montar, así que este bloque desaparece del DOM en cuanto
// la app arranca. Se genera desde src/data/*.js para no desincronizarse.

import { LADDER, VISIBLE_CAPABILITIES } from './src/data/ladder.js'
import { PROCESS } from './src/data/process.js'
import { FAQ } from './src/data/faq.js'

const esc = (t) =>
  String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

const GUIDES = [
  { href: '/diagnostico-de-ia-empresas/', label: 'Diagnóstico de IA para empresas: qué incluye' },
  { href: '/taller-ia-a-la-medida/', label: 'Taller de IA a la medida para tu equipo' },
  { href: '/asistente-whatsapp-con-ia/', label: 'Asistente de WhatsApp con IA para tu negocio' },
]

function buildFallback() {
  const { audit, fork, outcomes } = LADDER
  const [taller, software] = outcomes
  const li = (items) => `<ul>${items.map((t) => `<li>${esc(t)}</li>`).join('')}</ul>`

  return `<div data-seo-fallback style="position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);clip-path:inset(50%)">
<h1>IGNIS: agencia de inteligencia artificial en Guayaquil, Ecuador</h1>
<p>IGNIS es una agencia de IA en Guayaquil, Ecuador. Hacemos auditoría de IA a la medida para empresas medianas: diagnosticamos si tu problema es la gente o el proceso y lo resolvemos con capacitación en IA o software a la medida, sin crear dependencia.</p>
<h2>${esc(LADDER.intro.headline.join(' '))}</h2>
<p>${esc(LADDER.intro.subtext)}</p>
<h3>${esc(audit.name)}</h3>
<p>${esc(audit.desc)}</p>
<ul>${audit.levels.map((l) => `<li>${esc(l.name)}: ${esc(l.scope)}. ${esc(l.role)}</li>`).join('')}</ul>
<h3>${esc(fork.name)}</h3>
<p>${esc(fork.desc)}</p>
<ul>${fork.outcomes.map((o) => `<li>${esc(o.label)}: ${esc(o.desc)} Siguiente paso: ${esc(o.leadsToLabel)}.</li>`).join('')}</ul>
<p>${esc(fork.bothNote)}</p>
<h3>${esc(taller.name)}</h3>
<p>${esc(taller.desc)}</p>
${li(taller.benefits)}
<h3>${esc(software.name)}</h3>
<p>${esc(software.desc)}</p>
${li(software.benefits)}
<h4>${esc(software.capabilitiesLabel)}</h4>
<ul>${VISIBLE_CAPABILITIES.map((c) => `<li>${esc(c.name)}: ${esc(c.blurb)}</li>`).join('')}</ul>
<h2>Cómo trabajamos</h2>
<ol>${PROCESS.map((p) => `<li>${esc(p.title)}: ${esc(p.desc)}</li>`).join('')}</ol>
<h2>Preguntas frecuentes</h2>
${FAQ.map((f) => `<h3>${esc(f.q)}</h3><p>${esc(f.a)}</p>`).join('\n')}
<h2>Guías</h2>
<ul>${GUIDES.map((g) => `<li><a href="${g.href}">${esc(g.label)}</a></li>`).join('')}</ul>
<p>Contacto: <a href="https://wa.me/message/NP5O5VJPCRBDE1">WhatsApp de IGNIS</a>. Guayaquil, Ecuador.</p>
</div>`
}

export default function seoFallback() {
  return {
    name: 'ignis-seo-fallback',
    transformIndexHtml(html) {
      return html.replace('<div id="root"></div>', `<div id="root">${buildFallback()}</div>`)
    },
  }
}
