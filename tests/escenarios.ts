import type { Servicio } from '../src/logic/tipos';

/**
 * DATOS SINTÉTICOS. Todos los servicios y números de este archivo son ficticios
 * (prefijo 000) y existen solo para las pruebas controladas de TRL 4.
 */
const fuente = { nombre: 'Fuente oficial ficticia de prueba', url: 'https://ejemplo.invalid/directorio' };

export const LOCAL_LLAMADA_WA: Servicio = {
  id: 'f-local',
  nombre: 'Línea Ficticia Local',
  descripcion: 'Servicio sintético local con llamada y WhatsApp.',
  ambito: 'villavicencio',
  canales: [
    { tipo: 'llamada', valor: '0000000001', etiqueta: 'Llamar' },
    { tipo: 'whatsapp', valor: '570000000001', etiqueta: 'WhatsApp' },
  ],
  horario: '24 horas, 7 días',
  costo: 'Gratuita',
  fuente,
  fechaVerificacion: '2026-10-19',
  verificadoPor: 'Equipo (prueba)',
};

export const NACIONAL_LLAMADA: Servicio = {
  ...LOCAL_LLAMADA_WA,
  id: 'f-nacional',
  nombre: 'Línea Ficticia Nacional',
  ambito: 'nacional',
  canales: [{ tipo: 'llamada', valor: '000', etiqueta: 'Llamar' }],
};

export const EMERGENCIA: Servicio = {
  ...NACIONAL_LLAMADA,
  id: 'f-emergencia',
  nombre: 'Emergencias Ficticias',
  emergencia: true,
  canales: [{ tipo: 'llamada', valor: '0001', etiqueta: 'Llamar' }],
};

export const SIN_FUENTE: Servicio = { ...LOCAL_LLAMADA_WA, id: 'f-sin-fuente', nombre: 'Servicio Sin Fuente', fuente: null };

export const VENCIDO: Servicio = {
  ...LOCAL_LLAMADA_WA,
  id: 'f-vencido',
  nombre: 'Servicio Vencido',
  fechaVerificacion: '2026-08-01',
};

export const PRESENCIAL: Servicio = {
  ...LOCAL_LLAMADA_WA,
  id: 'f-presencial',
  nombre: 'Punto Presencial Ficticio',
  canales: [{ tipo: 'presencial', valor: 'Calle Ficticia 0', etiqueta: 'Ver dirección' }],
  horario: 'Lunes a viernes',
};

export const TODOS = [LOCAL_LLAMADA_WA, NACIONAL_LLAMADA, EMERGENCIA, SIN_FUENTE, VENCIDO, PRESENCIAL];

/** Fecha fija de las pruebas: un día después de la verificación. */
export const HOY = '2026-10-20';
