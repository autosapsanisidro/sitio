// Datos de contacto y enlaces usados en todo el sitio.
// Reemplazá estos valores por los reales cuando los tengas (ver README).

export const WHATSAPP_NUMBER = '5491100000000'; // formato: 549 + código de área + número, sin espacios ni signos
export const WHATSAPP_DISPLAY = '+54 9 11 XXXX-XXXX (a confirmar)';
export const INSTAGRAM_LINK = 'https://www.instagram.com/autosapsanisidro';
export const MERCADOLIBRE_LINK = 'https://listado.mercadolibre.com.ar/autosap-san-isidro';
export const HOURS = 'Lun a Vie 9 a 18 hs (a confirmar)';

export function whatsappLink(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
