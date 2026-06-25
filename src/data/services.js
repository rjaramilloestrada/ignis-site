// Servicios — 3 pestañas, copy exacto de project/ignis.html.
// `gridId` reproduce los id del prototipo (#tab-dev / #tab-ia / #tab-ent),
// donde #tab-ent usa una grilla de 2 columnas.

export const SERVICE_TABS = [
  {
    id: 'dev',
    gridId: 'tab-dev',
    label: 'Desarrollo Digital',
    services: [
      {
        tag: 'Presencia digital',
        name: 'Landing Pro',
        desc: 'Tu página web profesional diseñada para convertir visitantes en clientes. Responsive, rápida y optimizada para aparecer en Google.',
        benefits: [
          'Online en menos de una semana',
          'Diseño profesional sin necesidad de un equipo creativo',
          'Optimizada para SEO desde el primer día',
          'Conectada a WhatsApp, Google Maps e Instagram',
        ],
      },
      {
        tag: 'E-commerce',
        name: 'Tienda Online',
        desc: 'Tu catálogo de productos en línea con pasarela de pago ecuatoriana integrada. Vende las 24 horas sin intermediarios.',
        benefits: [
          'Acepta tarjeta, transferencia y contra entrega',
          'Panel de gestión de inventario y pedidos',
          'Sin comisiones de marketplaces como Mercado Libre',
          'Vendiendo en menos de una semana',
        ],
      },
      {
        tag: 'Procesos digitales',
        name: 'Web App / PWA',
        desc: 'Cualquier proceso de tu empresa convertido en software que funciona como app nativa, sin pasar por el App Store.',
        benefits: [
          'Accesible desde cualquier dispositivo sin descarga',
          'Automatiza flujos que hoy se hacen a mano',
          'Se instala en el celular como una app real',
          'Integrable con tus sistemas existentes',
        ],
      },
      {
        tag: 'Lanza tu idea',
        name: 'MVP',
        desc: 'Del concepto al mercado en semanas. Valida tu idea con usuarios reales antes de comprometer el presupuesto completo.',
        benefits: [
          'Semanas, no meses, para tener usuarios reales',
          'Feedback real antes de escalar la inversión',
          'Stack moderno listo para crecer cuando el mercado lo valide',
          'Autenticación y pagos incluidos desde el día uno',
        ],
      },
      {
        tag: 'iOS y Android',
        name: 'App Móvil',
        desc: 'Aplicación publicada en App Store y Google Play. Diseñada para el usuario ecuatoriano desde la primera pantalla.',
        benefits: [
          'Una base de código para ambas plataformas',
          'Notificaciones push, pagos y funciones offline',
          'Proceso completo: concepto → publicación → usuarios',
          'Cumplimiento LOPDP para datos de usuarios',
        ],
      },
    ],
  },
  {
    id: 'ia',
    gridId: 'tab-ia',
    label: 'Agentes IA',
    services: [
      {
        tag: 'Atención 24/7',
        name: 'Agente de WhatsApp',
        desc: 'Un bot conectado a tu WhatsApp Business oficial que responde preguntas, califica prospectos y agenda citas mientras tú duermes.',
        benefits: [
          'Responde a leads en segundos, no en horas',
          'Califica prospectos antes de llegar a tu equipo de ventas',
          'Conectado a tu CRM y agenda',
          'API oficial de Meta — sin riesgo de suspensión',
        ],
      },
      {
        tag: 'Conecta tus herramientas',
        name: 'Automatizaciones',
        desc: 'Workflows que conectan tu CRM, WhatsApp, correo y plataformas. Tareas repetitivas que se ejecutan solas, sin intervención humana.',
        benefits: [
          'Elimina trabajo manual repetitivo de tu equipo',
          'Datos sincronizados entre plataformas en tiempo real',
          'Alertas y reportes automáticos',
          'Reduce errores en procesos críticos',
        ],
      },
      {
        tag: 'Prospectos calificados',
        name: 'Lead Radar',
        desc: 'Agente que monitorea fuentes digitales buscando personas que ya necesitan lo que tu empresa ofrece. El prospecto llega calificado a tu notificación.',
        benefits: [
          'Prospectos activos que ya buscan tu solución',
          'Notificación inmediata cuando aparece un lead relevante',
          'Ahorra horas de prospección manual cada semana',
          'Escalable a múltiples fuentes simultáneas',
        ],
      },
      {
        tag: 'Enterprise',
        name: 'Agente Autónomo',
        desc: 'Un agente de IA personalizado con memoria, acceso a tus sistemas y capacidad de ejecutar tareas complejas de manera independiente. Tu fuerza de trabajo digital.',
        benefits: [
          'Opera con supervisión mínima',
          'Accede a tus bases de datos, APIs y herramientas internas',
          'Aprende de tus procesos con el tiempo',
          // 4º beneficio (el prototipo lo tenía incompleto; redactado para cerrar la tarjeta).
          'Reporta cada tarea que ejecuta',
        ],
      },
    ],
  },
  {
    id: 'ent',
    gridId: 'tab-ent',
    label: 'IA Empresarial',
    services: [
      {
        tag: 'Adopción AI',
        name: 'Claude para tu empresa',
        desc: 'Integramos Claude dentro de los flujos de trabajo reales de tu empresa. No es una demo — es tu equipo usando AI productivamente desde el primer día.',
        benefits: [
          'Diagnóstico de procesos con mayor retorno al automatizar',
          'Configuración del entorno organizacional Claude Teams',
          'Prompts y flujos diseñados para tu industria específica',
          'Reducción de tiempo en tareas de documentación y comunicación',
          'Marco de seguridad y uso responsable definido para tu equipo',
        ],
      },
      {
        tag: 'Capacitación corporativa',
        name: 'Workshops de AI',
        desc: 'Programa de capacitación para que tus equipos no técnicos dominen las herramientas de AI relevantes para su trabajo. Contenido diseñado para tu industria, no genérico.',
        benefits: [
          'Equipos operando con AI sin depender del área de tecnología',
          'Curriculum estructurado por módulos según rol y función',
          'Casos de uso reales de tu industria, no ejemplos abstractos',
          'Materiales internos personalizados para tu empresa',
          'Seguimiento post-capacitación incluido',
        ],
      },
    ],
  },
]
