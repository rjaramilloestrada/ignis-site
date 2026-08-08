// Casos reales — copy, stacks y números exactos de project/ignis.html para los
// 3 casos originales; Agensitur y Big Vision agregados en ago 2026.
//
// Estructura:
// - `category` matchea los ids de las pestañas de Servicios: 'dev' | 'ia' | 'ent'.
// - `status`: 'published' se renderiza; 'draft' existe en código pero NUNCA
//   llega al DOM (ver PUBLISHED_CASES abajo).
// - `variant`: 'metrics' (columna de métricas), 'benefits' (lista numerada) o
//   ausente (card de solo texto, ancho completo).

export const CASES = [
  {
    id: 'pulse',
    category: 'dev',
    status: 'published',
    type: 'PWA Full-Stack · Producción',
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
    category: 'dev',
    status: 'published',
    type: 'App Móvil · HealthTech · LATAM',
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
    id: 'grupo-grafico-abad',
    category: 'ent',
    status: 'published',
    type: 'Implementación AI · Empresa Corporativa',
    name: 'Grupo Gráfico Abad',
    desc: 'Implementación de inteligencia artificial dentro de los flujos de trabajo de empresa gráfica consolidada. Configuración del entorno organizacional, diseño de curriculum de adopción AI en 8 módulos y desarrollo de marcos de trabajo para que equipos no técnicos operen con AI desde el primer día.',
    stack: 'Claude Teams · NotebookLM Studio · Framework RCTFL',
    variant: 'benefits',
    benefitsEyebrow: '— Beneficios logrados',
    benefits: [
      'Equipos no técnicos operando con AI desde el primer día',
      'Estandarización de redacción y comunicaciones con asistencia AI',
      'Tiempo reducido en tareas repetitivas de documentación',
      'Conocimiento organizacional centralizado y accesible',
      'Marco de seguridad definido para uso responsable de AI',
    ],
  },
  {
    id: 'agensitur',
    category: 'ent',
    status: 'published',
    type: 'Capacitación AI · Agencia de Viajes',
    name: 'Agensitur',
    desc: 'Taller de adopción de IA para equipo de agencia de viajes. Fundamentos de Claude Chat y Claude Cowork en formato intensivo de una sola sesión, con preguntas de discovery preparadas específicamente para el flujo de trabajo de la industria de turismo.',
    stack: 'Claude Chat · Claude Cowork',
  },
  {
    // NO cambiar a 'published' sin confirmación explícita de Rafa: las
    // sesiones todavía no se dictan (proforma enviada). Activar este caso
    // después = cambiar solo la línea de status.
    id: 'big-vision',
    category: 'ent',
    status: 'draft',
    type: 'Capacitación AI · Gran Formato y Empaques',
    name: 'Big Vision',
    desc: '[BORRADOR — completar con detalle real de las sesiones una vez dictadas. Programa de 2 sesiones (Claude Chat + Claude Cowork), mismo formato que Offset Abad, con ejemplo aplicado de Canva incluido en la Sesión 2 sin costo adicional.]',
    stack: 'Claude Chat · Claude Cowork',
  },
]

// Solo los casos publicados llegan al render — los drafts nunca entran al DOM.
export const PUBLISHED_CASES = CASES.filter((c) => c.status === 'published')
