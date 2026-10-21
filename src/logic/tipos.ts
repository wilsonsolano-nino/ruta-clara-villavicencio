export type TipoCanal = 'llamada' | 'whatsapp' | 'presencial' | 'web';

export interface Canal {
  tipo: TipoCanal;
  valor: string;
  etiqueta: string;
}

export interface Fuente {
  nombre: string;
  url: string;
}

export interface Servicio {
  id: string;
  nombre: string;
  descripcion: string;
  ambito: 'villavicencio' | 'meta' | 'nacional';
  canales: Canal[];
  horario: string;
  costo: string;
  emergencia?: boolean;
  fuente: Fuente | null;
  fechaVerificacion: string | null; // YYYY-MM-DD
  verificadoPor: string | null;
}

export type EstadoVigencia =
  | 'vigente'
  | 'por_vencer'
  | 'en_revision'
  | 'vencido'
  | 'sin_verificar';

export interface ResultadoVigencia {
  estado: EstadoVigencia;
  /** true solo si el contacto puede mostrarse como dato vigente */
  mostrable: boolean;
  diasDesdeVerificacion: number | null;
  motivo: string;
}

export type MotivoReporte =
  | 'no_contesta'
  | 'numero_equivocado'
  | 'enlace_caido'
  | 'horario_distinto'
  | 'otro';

export interface Reporte {
  id: string;
  servicioId: string;
  motivo: MotivoReporte;
  comentario: string;
  fecha: string; // YYYY-MM-DD
  estado: 'abierto' | 'resuelto';
}
