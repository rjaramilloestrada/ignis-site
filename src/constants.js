// Datos de contacto y marca — centralizados.
// El CTA principal de todo el sitio es la Auditoría a la medida (por WhatsApp).

export const BRAND = {
  name: 'IGNIS',
  legalName: 'Ignífera SAS',
  location: 'Guayaquil, Ecuador — LATAM',
  domain: 'https://ignifera.com',
}

// PENDIENTE (Rafa): número en formato E.164 sin '+', p. ej. '5939XXXXXXXX'.
// Los short-links wa.me/message/<código> NO aceptan ?text=, así que los
// textos prellenados solo funcionan con el número. Mientras esté vacío, todos
// los CTAs caen al short-link (mensaje de bienvenida gestionado en WhatsApp
// Business) y el copy del botón es el que diferencia auditoría vs. contacto.
export const WHATSAPP_NUMBER = ''
export const WHATSAPP_SHORTLINK = 'https://wa.me/message/NP5O5VJPCRBDE1'

export const WA_TEXTS = {
  auditoria:
    'Hola IGNIS. Quiero una Auditoría a la medida.\nEmpresa: \nProceso que más nos cuesta: \nTamaño del equipo: ',
  auditoria_flash:
    'Hola IGNIS. Quiero reservar un cupo de Auditoría Flash (1 proceso o área).\nEmpresa: \nProceso: ',
  auditoria_framework:
    'Hola IGNIS. Me interesa la Auditoría Framework remoto (2-3 áreas).\nEmpresa: \nÁreas: ',
  contacto: 'Hola IGNIS. Quiero conversar sobre ',
}

export const waLink = (key = 'contacto') =>
  WHATSAPP_NUMBER
    ? `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WA_TEXTS[key] ?? WA_TEXTS.contacto)}`
    : WHATSAPP_SHORTLINK

// Ruta informal (botón flotante y enlace secundario del cierre).
export const WHATSAPP_URL = waLink('contacto')
