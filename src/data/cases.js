// Casos reales — copy, stacks y números exactos de project/ignis.html.
// Los dos primeros muestran una columna de métricas; el tercero, una lista de
// beneficios numerados (variant 'benefits').

export const CASES = [
  {
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
]
