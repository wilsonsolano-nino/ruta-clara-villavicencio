import type { ResultadoVigencia, Servicio, TipoCanal } from './tipos';
import { evaluarVigencia } from './vigencia';

/**
 * Orientador guiado por TIPO DE CONSULTA y PREFERENCIA DE CANAL.
 * No pregunta por síntomas, no puntúa riesgo y no diagnostica:
 * solo decide qué canal oficial verificado puede orientar la consulta.
 */

export type Proposito = 'hablar_ahora' | 'por_otra_persona' | 'conocer_servicios' | 'emergencia';
export type PreferenciaCanal = 'llamada' | 'whatsapp' | 'cualquiera';

export interface Respuestas {
  proposito: Proposito;
  canal?: PreferenciaCanal;
}

export interface Opcion<T extends string> {
  valor: T;
  texto: string;
  ayuda?: string;
}

export const PREGUNTA_PROPOSITO = {
  id: 'proposito',
  texto: '¿Qué estás buscando en este momento?',
  opciones: [
    { valor: 'hablar_ahora', texto: 'Quiero hablar con alguien', ayuda: 'Personas de líneas oficiales te escuchan y orientan.' },
    { valor: 'por_otra_persona', texto: 'Me preocupa alguien y quiero saber cómo ayudar', ayuda: 'También puedes llamar tú para pedir orientación.' },
    { valor: 'conocer_servicios', texto: 'Solo quiero conocer qué servicios existen', ayuda: 'Te mostramos el directorio verificado.' },
    { valor: 'emergencia', texto: 'Es una emergencia ahora mismo', ayuda: 'Te mostramos de inmediato las líneas para actuar ya.' },
  ] as Opcion<Proposito>[],
};

export const PREGUNTA_CANAL = {
  id: 'canal',
  texto: '¿Cómo prefieres comunicarte?',
  opciones: [
    { valor: 'llamada', texto: 'Llamada' },
    { valor: 'whatsapp', texto: 'WhatsApp (escribir)' },
    { valor: 'cualquiera', texto: 'Me da igual' },
  ] as Opcion<PreferenciaCanal>[],
};

/** Indica si con las respuestas actuales hay que hacer la pregunta de canal. */
export function necesitaCanal(r: Partial<Respuestas>): boolean {
  return r.proposito === 'hablar_ahora' || r.proposito === 'por_otra_persona';
}

export interface Recomendacion {
  servicio: Servicio;
  vigencia: ResultadoVigencia;
  canalesSugeridos: TipoCanal[];
}

export interface ResultadoOrientador {
  titulo: string;
  mensaje: string;
  recomendaciones: Recomendacion[];
  /** Explicación transparente de la regla aplicada (se muestra al usuario). */
  porQue: string;
  irADirectorio: boolean;
  sinDatosVigentes: boolean;
}

const PRIORIDAD_ESTADO: Record<ResultadoVigencia['estado'], number> = {
  vigente: 0,
  por_vencer: 1,
  en_revision: 2,
  vencido: 9,
  sin_verificar: 9,
};

const PRIORIDAD_AMBITO: Record<Servicio['ambito'], number> = { villavicencio: 0, meta: 1, nacional: 2 };

function ordenar(a: Recomendacion, b: Recomendacion): number {
  return (
    PRIORIDAD_ESTADO[a.vigencia.estado] - PRIORIDAD_ESTADO[b.vigencia.estado] ||
    PRIORIDAD_AMBITO[a.servicio.ambito] - PRIORIDAD_AMBITO[b.servicio.ambito] ||
    a.servicio.nombre.localeCompare(b.servicio.nombre)
  );
}

function canalesDe(s: Servicio, tipos: TipoCanal[]): TipoCanal[] {
  return s.canales.map((c) => c.tipo).filter((t) => tipos.includes(t));
}

export function orientar(
  respuestas: Respuestas,
  servicios: Servicio[],
  hoy: string,
  reportesAbiertos: Record<string, number> = {},
): ResultadoOrientador {
  const evaluados = servicios.map((servicio) => ({
    servicio,
    vigencia: evaluarVigencia(servicio, hoy, reportesAbiertos[servicio.id] ?? 0),
  }));
  const mostrables = evaluados.filter((e) => e.vigencia.mostrable);
  const remotos: TipoCanal[] = ['llamada', 'whatsapp'];

  const sinDatos = (): ResultadoOrientador => ({
    titulo: 'No tenemos datos verificados vigentes',
    mensaje:
      'Ninguna línea tiene hoy una verificación vigente en esta herramienta. Consulta directamente el directorio oficial de MinSalud o la página de la Alcaldía de Villavicencio.',
    recomendaciones: [],
    porQue: 'Por seguridad, no mostramos teléfonos sin fuente oficial y fecha de verificación de los últimos 30 días.',
    irADirectorio: true,
    sinDatosVigentes: true,
  });

  if (respuestas.proposito === 'conocer_servicios') {
    return {
      titulo: 'Directorio de servicios verificados',
      mensaje: 'Estos son los canales oficiales con fuente y fecha de verificación. Puedes revisar cada uno con calma.',
      recomendaciones: mostrables
        .map((e) => ({ ...e, canalesSugeridos: e.servicio.canales.map((c) => c.tipo) }))
        .sort(ordenar),
      porQue: 'Elegiste conocer los servicios: mostramos todos los que tienen verificación vigente.',
      irADirectorio: true,
      sinDatosVigentes: mostrables.length === 0,
    };
  }

  if (respuestas.proposito === 'emergencia') {
    const recs = mostrables
      .filter((e) => e.servicio.emergencia || e.servicio.horario.includes('24'))
      .map((e) => ({ ...e, canalesSugeridos: canalesDe(e.servicio, ['llamada']) }))
      .filter((r) => r.canalesSugeridos.length > 0)
      .sort((a, b) => Number(!!b.servicio.emergencia) - Number(!!a.servicio.emergencia) || ordenar(a, b));
    if (recs.length === 0) return sinDatos();
    return {
      titulo: 'Busca ayuda inmediata',
      mensaje:
        'Si la vida de alguien está en peligro ahora, acude al servicio de urgencias más cercano o llama a una de estas líneas. No esperes a terminar de leer esta página.',
      recomendaciones: recs,
      porQue:
        'Elegiste "emergencia": mostramos primero líneas de emergencia verificadas y luego líneas 24 horas. Esta herramienta no evalúa la situación; eso lo hacen las personas de esas líneas.',
      irADirectorio: false,
      sinDatosVigentes: false,
    };
  }

  // hablar_ahora | por_otra_persona
  const pref = respuestas.canal ?? 'cualquiera';
  const tiposPedidos: TipoCanal[] = pref === 'cualquiera' ? remotos : [pref];
  const candidatos = mostrables.filter((e) => !e.servicio.emergencia);

  let recs: Recomendacion[] = candidatos
    .map((e) => ({ ...e, canalesSugeridos: canalesDe(e.servicio, tiposPedidos) }))
    .filter((r) => r.canalesSugeridos.length > 0)
    .sort(ordenar);

  let porQue =
    pref === 'cualquiera'
      ? 'Mostramos canales verificados por llamada o WhatsApp, primero los de Villavicencio.'
      : `Mostramos canales verificados que atienden por ${pref === 'llamada' ? 'llamada' : 'WhatsApp'}, primero los de Villavicencio.`;

  if (recs.length === 0) {
    // Respaldo: ningún servicio vigente atiende por el canal pedido.
    recs = candidatos
      .map((e) => ({ ...e, canalesSugeridos: canalesDe(e.servicio, remotos) }))
      .filter((r) => r.canalesSugeridos.length > 0)
      .sort(ordenar);
    porQue = `Ningún servicio verificado atiende hoy por ${pref === 'whatsapp' ? 'WhatsApp' : 'llamada'}; te mostramos las otras opciones disponibles.`;
  }

  if (recs.length === 0) return sinDatos();

  const otraPersona = respuestas.proposito === 'por_otra_persona';
  return {
    titulo: otraPersona ? 'Puedes pedir orientación para acompañar' : 'Hay personas listas para escucharte',
    mensaje: otraPersona
      ? 'Las líneas de apoyo también orientan a quien quiere ayudar a otra persona. Puedes contar la situación sin dar nombres.'
      : 'Escoge el canal con el que te sientas más cómodo. La conversación es con personas de servicios oficiales.',
    recomendaciones: recs,
    porQue,
    irADirectorio: false,
    sinDatosVigentes: false,
  };
}
