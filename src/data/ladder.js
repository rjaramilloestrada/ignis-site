// Escalera comercial (handoff Marketing, 10 sep 2026): Auditoría a la medida
// (entrada, pagada) → diagnóstico Gente / Proceso (puede ser ambos) → Taller a
// la medida o Software a la medida. Sin precios públicos. Naming funcional
// hasta que la escalera tenga marca propia.

export const STEP = { AUDIT: 'auditoria', TALLER: 'taller', SOFTWARE: 'software' }

export const AUDIT_LEVELS = [
  {
    id: 'flash',
    name: 'Flash',
    scope: '1 llamada + cuestionario · 1 proceso o área',
    role: 'La puerta de entrada rápida. Un proceso, un diagnóstico, un siguiente paso.',
    note: 'Cupos limitados cada mes.',
    cta: { label: 'Reservar cupo Flash', waKey: 'auditoria_flash' },
  },
  {
    id: 'framework',
    name: 'Framework remoto',
    scope: '2 a 3 áreas · Entregable con roadmap',
    role: 'El formato estándar. Sales con un mapa de qué hacer, en qué orden y por qué.',
    badge: 'Recomendada',
    cta: { label: 'Pedir Framework', waKey: 'auditoria_framework' },
  },
  {
    id: 'onsite',
    name: 'On-site completo',
    scope: '4 a 6 áreas · Varios días en tu operación',
    role: 'Solo para empresas que ya hicieron una auditoría o un proyecto con nosotros.',
    badge: 'Tras una auditoría previa',
    upsellOnly: true, // nunca es primer contacto: sin CTA
  },
]

export const DIAGNOSIS = [
  {
    id: 'gente',
    label: 'Gente',
    desc: 'Tu equipo ya usa IA, cada uno a su manera. Sin marco, sin política de datos, sin criterio compartido.',
    leadsTo: STEP.TALLER,
    leadsToLabel: 'Taller a la medida',
  },
  {
    id: 'proceso',
    label: 'Proceso',
    desc: 'Un proceso manual, intensivo en personas y con volumen real: atención, reclamos, cotización.',
    leadsTo: STEP.SOFTWARE,
    leadsToLabel: 'Software a la medida',
  },
]

export const DIAGNOSIS_BOTH_NOTE =
  'Pueden ser los dos. Dos de nuestros clientes necesitaron taller y software. El diagnóstico no te obliga a elegir.'

export const LADDER = {
  intro: {
    label: '— Servicios',
    headline: ['Diagnóstico primero.', 'Solución después.'],
    subtext:
      'No vendemos un catálogo. Vendemos un camino: una auditoría que dice qué te pasa y dos formas de resolverlo con tu equipo.',
  },
  audit: {
    id: STEP.AUDIT,
    num: '01',
    kicker: 'Paso 01 · Punto de entrada',
    name: 'Auditoría a la medida',
    desc: 'Un diagnóstico pagado, con entregable, escalado a tu tamaño. Miramos cómo trabaja tu gente y cómo corren tus procesos, y te decimos dónde está el problema real. A veces es uno. A veces son los dos.',
    levels: AUDIT_LEVELS,
    cta: { label: 'Pedir mi auditoría', waKey: 'auditoria' },
  },
  fork: {
    num: '02',
    kicker: 'Paso 02 · El diagnóstico',
    name: 'Gente, proceso, o ambos',
    desc: 'El entregable de la auditoría no es un veredicto único. Es un mapa de qué va primero y qué va después.',
    outcomes: DIAGNOSIS,
    bothNote: DIAGNOSIS_BOTH_NOTE,
  },
  outcomes: [
    {
      id: STEP.TALLER,
      num: '03',
      kicker: 'Capacitación · 2 sesiones',
      name: 'Taller a la medida',
      desc: 'Dos sesiones con tu equipo, sobre tu trabajo real. Framework RCTFL para que sepan qué pedirle a la IA, cómo verificarlo y qué no compartir nunca. Currículo, ejemplos y estadísticas de tu industria. Cuando terminamos, el equipo opera solo.',
      benefits: [
        'Currículo armado con tus procesos, no ejemplos genéricos',
        'Framework RCTFL: un método que se queda en tu equipo',
        'Estadísticas y casos de tu industria',
        'Cero dependencia hacia IGNIS al terminar',
        'Dictado ya en cinco industrias distintas',
      ],
      casesLabel: 'Ver casos de Taller',
    },
    {
      id: STEP.SOFTWARE,
      num: '03',
      kicker: 'Automatización · Un proceso real',
      name: 'Software a la medida',
      desc: 'Automatizamos un proceso que hoy te cuesta gente: gestión de reclamos, cotización, atención a tu cartera de clientes. Empezamos por un ancla: un alcance recortado y autocontenible que funciona solo. Lo demás es fase 2, cuando el ancla ya demostró valor.',
      benefits: [
        'Primero un ancla: alcance recortado, autocontenible, en producción',
        'Fase 2 solo sobre resultados, nunca sobre promesas',
        'Se integra con lo que ya usas',
        'Entregables verificables en cada etapa',
      ],
      capabilitiesLabel: 'Lo que podemos construir',
      casesLabel: 'Ver casos de Software',
    },
  ],
}

// Catálogo anterior (feb 2026), degradado a "capacidades" del paso Software.
// `desc`/`benefits` originales se conservan por si se retoman; solo se
// renderizan `name` + `blurb` de los que tienen render: true.
export const CAPABILITIES = [
  {
    id: 'web-app',
    tag: 'Procesos digitales',
    name: 'Web App / PWA',
    blurb: 'Un proceso convertido en software, instalable en el celular sin pasar por el App Store.',
    render: true,
    desc: 'Cualquier proceso de tu empresa convertido en software que funciona como app nativa, sin pasar por el App Store.',
    benefits: [
      'Accesible desde cualquier dispositivo sin descarga',
      'Automatiza flujos que hoy se hacen a mano',
      'Se instala en el celular como una app real',
      'Integrable con tus sistemas existentes',
    ],
  },
  {
    id: 'agente-whatsapp',
    tag: 'Atención 24/7',
    name: 'Agente de WhatsApp',
    blurb: 'API oficial de Meta: responde, califica y agenda mientras tu equipo duerme.',
    render: true,
    desc: 'Un bot conectado a tu WhatsApp Business oficial que responde preguntas, califica prospectos y agenda citas mientras tú duermes.',
    benefits: [
      'Responde a leads en segundos, no en horas',
      'Califica prospectos antes de llegar a tu equipo de ventas',
      'Conectado a tu CRM y agenda',
      'API oficial de Meta — sin riesgo de suspensión',
    ],
  },
  {
    id: 'automatizaciones',
    tag: 'Conecta tus herramientas',
    name: 'Automatizaciones',
    blurb: 'CRM, WhatsApp, correo y plataformas sincronizados sin intervención humana.',
    render: true,
    desc: 'Workflows que conectan tu CRM, WhatsApp, correo y plataformas. Tareas repetitivas que se ejecutan solas, sin intervención humana.',
    benefits: [
      'Elimina trabajo manual repetitivo de tu equipo',
      'Datos sincronizados entre plataformas en tiempo real',
      'Alertas y reportes automáticos',
      'Reduce errores en procesos críticos',
    ],
  },
  {
    id: 'agente-autonomo',
    tag: 'Enterprise',
    name: 'Agente Autónomo',
    blurb: 'Memoria persistente, acceso a tus sistemas y reporte de cada tarea que ejecuta.',
    render: true,
    desc: 'Un agente de IA personalizado con memoria, acceso a tus sistemas y capacidad de ejecutar tareas complejas de manera independiente. Tu fuerza de trabajo digital.',
    benefits: [
      'Opera con supervisión mínima',
      'Accede a tus bases de datos, APIs y herramientas internas',
      'Memoria persistente: conserva el contexto de tu operación entre tareas',
      'Reporta cada tarea que ejecuta',
    ],
  },
  {
    id: 'mvp',
    tag: 'Lanza tu idea',
    name: 'MVP',
    blurb: 'Del concepto a usuarios reales en semanas, antes de comprometer el presupuesto completo.',
    render: true,
    desc: 'Del concepto al mercado en semanas. Valida tu idea con usuarios reales antes de comprometer el presupuesto completo.',
    benefits: [
      'Semanas, no meses, para tener usuarios reales',
      'Feedback real antes de escalar la inversión',
      'Stack moderno listo para crecer cuando el mercado lo valide',
      'Autenticación y pagos incluidos desde el día uno',
    ],
  },
  {
    id: 'app-movil',
    tag: 'iOS y Android',
    name: 'App Móvil',
    blurb: 'Una sola base de código publicada en App Store y Google Play.',
    render: true,
    desc: 'Aplicación publicada en App Store y Google Play. Diseñada para el usuario ecuatoriano desde la primera pantalla.',
    benefits: [
      'Una base de código para ambas plataformas',
      'Notificaciones push, pagos y funciones offline',
      'Proceso completo: concepto → publicación → usuarios',
      'Cumplimiento LOPDP para datos de usuarios',
    ],
  },
  {
    // Fuera de la narrativa principal (decisión sep 2026): no se renderiza.
    id: 'landing-pro',
    tag: 'Presencia digital',
    name: 'Landing Pro',
    blurb: 'Página web profesional diseñada para convertir.',
    render: false,
    desc: 'Tu página web profesional diseñada para convertir visitantes en clientes. Responsive, rápida y optimizada para aparecer en Google.',
    benefits: [
      'Online en menos de una semana',
      'Diseño profesional sin necesidad de un equipo creativo',
      'Optimizada para SEO desde el primer día',
      'Conectada a WhatsApp, Google Maps e Instagram',
    ],
  },
  {
    // Fuera de la narrativa principal (decisión sep 2026): no se renderiza.
    id: 'tienda-online',
    tag: 'E-commerce',
    name: 'Tienda Online',
    blurb: 'Catálogo en línea con pasarela de pago ecuatoriana.',
    render: false,
    desc: 'Tu catálogo de productos en línea con pasarela de pago ecuatoriana integrada. Vende las 24 horas sin intermediarios.',
    benefits: [
      'Acepta tarjeta, transferencia y contra entrega',
      'Panel de gestión de inventario y pedidos',
      'Sin comisiones de marketplaces como Mercado Libre',
      'Vendiendo en menos de una semana',
    ],
  },
  {
    // Retirado temporalmente (sep 2026): 0 casos reales, piloto sin confirmar.
    id: 'lead-radar',
    tag: 'Prospectos calificados',
    name: 'Lead Radar',
    blurb: 'Agente que monitorea fuentes digitales buscando prospectos activos.',
    render: false,
    retired: true,
    desc: 'Agente que monitorea fuentes digitales buscando personas que ya necesitan lo que tu empresa ofrece. El prospecto llega calificado a tu notificación.',
    benefits: [
      'Prospectos activos que ya buscan tu solución',
      'Notificación inmediata cuando aparece un lead relevante',
      'Ahorra horas de prospección manual cada semana',
      'Escalable a múltiples fuentes simultáneas',
    ],
  },
]
export const VISIBLE_CAPABILITIES = CAPABILITIES.filter((c) => c.render)

// Filtros de Casos Reales. Sin chip "Auditoría": su entregable es el
// diagnóstico, no un caso publicable (la sección lo explica en una nota).
export const CASE_FILTERS = [
  { id: 'todos', label: 'Todos' },
  { id: STEP.TALLER, label: 'Taller' },
  { id: STEP.SOFTWARE, label: 'Software' },
]
