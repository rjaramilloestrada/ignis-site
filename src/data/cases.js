// Casos reales — etiquetados por el paso de la escalera que se entregó.
//
// Estructura:
// - `steps`: pasos de la escalera que el caso tocó (ids de STEP). Un caso
//   puede tener varios; se etiqueta solo lo entregado, no lo cotizado.
// - `kind`: 'client' (proyecto para un cliente) | 'own' (producto de IGNIS).
// - `anonymized`: true → sin nombre real en NINGÚN lugar (código, comentarios,
//   commits). Política de nombres para clientes aún en negociación.
// - `status`: 'published' se renderiza; 'draft' existe en código pero NUNCA
//   llega al DOM (ver PUBLISHED_CASES abajo).
// - `priority`: orden ascendente en el carrusel.
// - `variant`: 'metrics' (columna de métricas), 'benefits' (lista numerada) o
//   ausente (card de solo texto, ancho completo).

import { STEP } from './ladder.js'

export const CASES = [
  {
    // Anonimizado por decisión del owner (sep 2026). Proyecto aún en curso.
    id: 'administradora-servicios-medicos',
    status: 'published',
    kind: 'client',
    anonymized: true,
    priority: 10,
    industry: 'Seguros y salud',
    steps: [STEP.SOFTWARE],
    type: 'Software a la medida · Seguros y salud',
    name: 'Administradora de servicios médicos que gestiona reclamos sobre 5 aseguradoras',
    desc: 'Reclamos repartidos entre cinco aseguradoras distintas, cada una con sus reglas y su formato: un proceso manual, intensivo en personas y con volumen real. El diagnóstico marcó gente y proceso a la vez. Software a la medida sobre el flujo de reclamos, entrando por un ancla: un alcance recortado y autocontenible antes de hablar de fase 2.',
    variant: 'benefits',
    benefitsEyebrow: '— El proyecto',
    benefits: [
      'Reclamos sobre 5 aseguradoras distintas, cada una con sus reglas',
      'Diagnóstico: gente y proceso a la vez',
      'Entrada por ancla: alcance recortado y autocontenible',
      'Fase 2 solo después de que el ancla demuestre valor',
    ],
  },
  {
    // Anonimizado por decisión del owner (sep 2026). Proyecto aún en curso.
    id: 'broker-seguros',
    status: 'published',
    kind: 'client',
    anonymized: true,
    priority: 20,
    industry: 'Seguros',
    steps: [STEP.SOFTWARE],
    type: 'Software a la medida · Seguros',
    name: 'Bróker de seguros con más de 300 clientes activos',
    desc: 'Una cartera de más de 300 clientes activos atendida a mano. Software a la medida sobre el servicio a esa cartera, entrando por un ancla: un alcance recortado y autocontenible, en producción, antes de discutir cualquier fase 2.',
    variant: 'metrics',
    metrics: [
      { num: '300+', lbl: 'Clientes activos en cartera' },
      { num: 'Ancla', lbl: 'Fase 1 · alcance autocontenible' },
      { num: 'Fase 2', lbl: 'Solo sobre resultados' },
    ],
  },
  {
    id: 'grupo-grafico-abad',
    status: 'published',
    kind: 'client',
    anonymized: false,
    priority: 30,
    industry: 'Imprenta y empaque',
    steps: [STEP.TALLER],
    type: 'Taller a la medida · Imprenta y empaque',
    name: 'Grupo Gráfico Abad',
    desc: 'Taller a la medida de 2 sesiones para una empresa gráfica consolidada, evaluado 10/10 por el cliente. Configuración del entorno organizacional, framework RCTFL y ejemplos armados sobre los flujos reales de la imprenta, para que equipos no técnicos operen con IA sin depender de nadie.',
    stack: 'Claude Teams · NotebookLM · Framework RCTFL',
    variant: 'metrics',
    metrics: [
      { num: '10/10', lbl: 'Evaluación del cliente' },
      { num: '2', lbl: 'Sesiones' },
      { num: 'RCTFL', lbl: 'Framework que se queda' },
    ],
  },
  {
    id: 'agensitur',
    status: 'published',
    kind: 'client',
    anonymized: false,
    priority: 40,
    industry: 'Turismo',
    steps: [STEP.TALLER],
    type: 'Taller a la medida · Agencia de viajes',
    name: 'Agensitur',
    desc: 'Taller de adopción de IA para el equipo de una agencia de viajes. Fundamentos de Claude Chat y Claude Cowork en formato intensivo de una sola sesión, con preguntas de discovery preparadas específicamente para el flujo de trabajo de la industria de turismo.',
    stack: 'Claude Chat · Claude Cowork',
    variant: 'benefits',
    benefitsEyebrow: '— Lo entregado',
    benefits: [
      'Workshop intensivo de 4 horas en una sola sesión',
      'Fundamentos de Claude Chat y Claude Cowork para todo el equipo',
      'Discovery preparado específicamente para el flujo de una agencia de viajes',
    ],
  },
  {
    id: 'pulse',
    status: 'published',
    kind: 'client',
    anonymized: false,
    priority: 50,
    industry: 'Fitness',
    steps: [STEP.SOFTWARE],
    type: 'Software a la medida · PWA en producción',
    name: 'PULSE: Beat & Burn',
    desc: 'PWA de fitness construida desde cero con sistema de créditos para clases, dashboard administrativo completo con agendamiento, gestión de instructores, reportes financieros y motor de promociones. Auditoría de seguridad de 26 puntos para procesamiento de pagos en producción.',
    stack: 'React 18 · TypeScript · Express.js · PostgreSQL · PayPhone',
    variant: 'metrics',
    metrics: [
      { num: '$2,500+', lbl: 'Revenue primera semana' },
      { num: '100+', lbl: 'Usuarios activos' },
      { num: '125+', lbl: 'Transacciones' },
      { num: '26 pts', lbl: 'Auditoría de seguridad' },
    ],
  },
  {
    id: 'glipy',
    status: 'published',
    kind: 'own',
    anonymized: false,
    priority: 90,
    industry: 'HealthTech',
    badge: 'Producto propio',
    steps: [STEP.SOFTWARE],
    type: 'Producto propio · App Móvil · HealthTech',
    name: 'Glipy',
    desc: 'Primera aplicación de seguimiento de medicación GLP-1 completamente en español para el mercado hispano. Sistema de registro de dosis en menos de 10 segundos, compatible con plumas de marca y viales compuestos. Calculadoras de dosificación personalizadas, modelo freemium con paywall integrado y cumplimiento de protección de datos de salud.',
    stack: 'Flutter · Dart · Supabase · RevenueCat · App Store · Google Play',
    variant: 'metrics',
    metrics: [
      { num: '< 10s', lbl: 'Registro de dosis' },
      { num: '2 plat.', lbl: 'iOS y Android' },
      { num: 'LOPDP', lbl: 'Datos de salud' },
      { num: 'Freemium', lbl: 'Modelo de negocio' },
    ],
  },
  {
    // NO cambiar a 'published' sin confirmación explícita de Rafa: las
    // sesiones todavía no se dictan. Activar este caso = cambiar solo status.
    id: 'big-vision',
    status: 'draft',
    kind: 'client',
    anonymized: false,
    priority: 35,
    industry: 'Gran formato y empaques',
    steps: [STEP.TALLER],
    type: 'Taller a la medida · Gran formato y empaques',
    name: 'Big Vision',
    desc: '[BORRADOR — completar con detalle real de las sesiones una vez dictadas. Programa de 2 sesiones (Claude Chat + Claude Cowork), mismo formato que Grupo Gráfico Abad, con ejemplo aplicado de Canva incluido en la Sesión 2 sin costo adicional.]',
    stack: 'Claude Chat · Claude Cowork',
  },
]

// Solo los casos publicados llegan al render — los drafts nunca entran al DOM.
export const PUBLISHED_CASES = CASES.filter((c) => c.status === 'published').sort(
  (a, b) => a.priority - b.priority
)

export const casesForFilter = (id) =>
  id === 'todos' ? PUBLISHED_CASES : PUBLISHED_CASES.filter((c) => c.steps.includes(id))
