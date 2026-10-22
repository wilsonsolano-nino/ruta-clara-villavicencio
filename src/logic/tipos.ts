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

export type EstadoVigencia = 'vigente' | 'por_vencer' | 'vencido' | 'sin_verificar';

export interface ResultadoVigencia {
  estado: EstadoVigencia;
  /** true solo si el contacto puede mostrarse como dato vigente */
  mostrable: boolean;
  diasDesdeVerificacion: number | null;
  motivo: string;
}

export interface Recurso {
  id: string;
  tema: string;
  titulo: string;
  resumen: string;
  /** Cada pauta se lee como párrafo: una idea corta en negrita y su explicación. */
  pautas: { idea: string; texto: string }[];
  cuandoBuscarApoyo: string;
  fuentes: Fuente[];
  fechaConsulta: string; // YYYY-MM-DD
}

/** Cómo se obtuvo el punto en el mapa; se le muestra a la persona para que sepa cuánto confiar en él. */
export type OrigenUbicacion = 'sitio_oficial' | 'direccion' | 'directorio';

/** Sede con servicios de salud mental habilitada en el REPS. Sigue la misma regla de fuente y fecha que los servicios. */
export interface Lugar {
  id: string;
  nombre: string;
  descripcion: string;
  naturaleza: 'Pública' | 'Privada';
  direccion: string;
  telefono: string | null;
  codigoHabilitacion: string;
  /** null cuando no hay un punto confiable (zonas rurales sin dirección exacta). */
  coordenadas: { lat: number; lng: number } | null;
  origenUbicacion: OrigenUbicacion | null;
  fuente: Fuente | null;
  fechaVerificacion: string | null; // YYYY-MM-DD
  verificadoPor: string | null;
}
