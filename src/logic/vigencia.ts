import type { ResultadoVigencia, Servicio } from './tipos';

export const VENTANA_VIGENCIA_DIAS = 30;
export const AVISO_POR_VENCER_DIAS = 7;

const FECHA_RE = /^\d{4}-\d{2}-\d{2}$/;

/** Convierte 'YYYY-MM-DD' a días desde la época (UTC), o null si no es válida. */
export function aDias(fecha: string): number | null {
  if (!FECHA_RE.test(fecha)) return null;
  const [a, m, d] = fecha.split('-').map(Number);
  const t = Date.UTC(a, m - 1, d);
  const f = new Date(t);
  if (f.getUTCFullYear() !== a || f.getUTCMonth() !== m - 1 || f.getUTCDate() !== d) return null;
  return Math.round(t / 86_400_000);
}

/** Fecha local del dispositivo como 'YYYY-MM-DD'. */
export function hoyISO(ahora: Date = new Date()): string {
  const p = (n: number) => String(n).padStart(2, '0');
  return `${ahora.getFullYear()}-${p(ahora.getMonth() + 1)}-${p(ahora.getDate())}`;
}

/**
 * Regla central de salvaguarda: un teléfono, ruta o lugar solo se muestra como vigente
 * si tiene fuente oficial y una fecha de verificación de hace 30 días o menos.
 */
export function evaluarVigencia(
  servicio: Pick<Servicio, 'fuente' | 'fechaVerificacion'>,
  hoy: string,
  ventanaDias = VENTANA_VIGENCIA_DIAS,
  avisoDias = AVISO_POR_VENCER_DIAS,
): ResultadoVigencia {
  if (!servicio.fuente || !servicio.fuente.nombre.trim()) {
    return { estado: 'sin_verificar', mostrable: false, diasDesdeVerificacion: null, motivo: 'Sin fuente oficial registrada.' };
  }
  if (!servicio.fechaVerificacion) {
    return { estado: 'sin_verificar', mostrable: false, diasDesdeVerificacion: null, motivo: 'Sin fecha de verificación.' };
  }
  const dVer = aDias(servicio.fechaVerificacion);
  const dHoy = aDias(hoy);
  if (dVer === null || dHoy === null) {
    return { estado: 'sin_verificar', mostrable: false, diasDesdeVerificacion: null, motivo: 'Fecha de verificación inválida.' };
  }
  const dias = dHoy - dVer;
  if (dias < 0) {
    return { estado: 'sin_verificar', mostrable: false, diasDesdeVerificacion: dias, motivo: 'La fecha de verificación está en el futuro.' };
  }
  if (dias > ventanaDias) {
    return { estado: 'vencido', mostrable: false, diasDesdeVerificacion: dias, motivo: `Verificado hace ${dias} días (máximo ${ventanaDias}).` };
  }
  if (dias > ventanaDias - avisoDias) {
    return { estado: 'por_vencer', mostrable: true, diasDesdeVerificacion: dias, motivo: `Verificado hace ${dias} días; requiere nueva verificación pronto.` };
  }
  return { estado: 'vigente', mostrable: true, diasDesdeVerificacion: dias, motivo: `Verificado hace ${dias} día(s).` };
}
