import type { MotivoReporte, Reporte } from './tipos';

export const MOTIVOS: { valor: MotivoReporte; texto: string }[] = [
  { valor: 'no_contesta', texto: 'No contestan / no da tono' },
  { valor: 'numero_equivocado', texto: 'El número no corresponde al servicio' },
  { valor: 'enlace_caido', texto: 'El enlace o WhatsApp no funciona' },
  { valor: 'horario_distinto', texto: 'El horario es diferente' },
  { valor: 'otro', texto: 'Otro problema con el dato' },
];

export const MAX_COMENTARIO = 200;

// Patrones simples para rechazar datos personales en el comentario (salvaguarda "cero datos reales").
const PATRONES_PERSONALES: { re: RegExp; aviso: string }[] = [
  { re: /[\w.+-]+@[\w-]+\.[\w.]+/, aviso: 'correo electrónico' },
  { re: /(?:\d[\s-]?){7,}/, aviso: 'número de teléfono o documento' },
];

export function validarComentario(texto: string): { ok: boolean; error?: string } {
  if (texto.length > MAX_COMENTARIO) return { ok: false, error: `Máximo ${MAX_COMENTARIO} caracteres.` };
  for (const p of PATRONES_PERSONALES) {
    if (p.re.test(texto)) {
      return { ok: false, error: `Parece que el comentario incluye un ${p.aviso}. No escribas datos personales.` };
    }
  }
  return { ok: true };
}

export function crearReporte(servicioId: string, motivo: MotivoReporte, comentario: string, fecha: string): Reporte {
  const v = validarComentario(comentario);
  if (!v.ok) throw new Error(v.error);
  return {
    id: `r-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`,
    servicioId,
    motivo,
    comentario: comentario.trim(),
    fecha,
    estado: 'abierto',
  };
}

export function contarAbiertos(reportes: Reporte[]): Record<string, number> {
  const out: Record<string, number> = {};
  for (const r of reportes) if (r.estado === 'abierto') out[r.servicioId] = (out[r.servicioId] ?? 0) + 1;
  return out;
}

export function reportesACSV(reportes: Reporte[]): string {
  const esc = (s: string) => `"${s.replace(/"/g, '""')}"`;
  const filas = reportes.map((r) => [r.id, r.servicioId, r.motivo, r.fecha, r.estado, esc(r.comentario)].join(','));
  return ['id,servicio,motivo,fecha,estado,comentario', ...filas].join('\n');
}

// Persistencia local (solo para el prototipo; en operación iría a un formulario/servidor institucional).
const CLAVE = 'rutaclara.reportes.v1';

export function cargarReportes(): Reporte[] {
  try {
    const raw = localStorage.getItem(CLAVE);
    return raw ? (JSON.parse(raw) as Reporte[]) : [];
  } catch {
    return [];
  }
}

export function guardarReportes(reportes: Reporte[]): void {
  try {
    localStorage.setItem(CLAVE, JSON.stringify(reportes));
  } catch {
    /* almacenamiento no disponible: el reporte vive solo en memoria */
  }
}
