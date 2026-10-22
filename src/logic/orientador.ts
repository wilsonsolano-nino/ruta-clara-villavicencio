import type { ResultadoVigencia, Servicio, TipoCanal } from './tipos';
import { evaluarVigencia } from './vigencia';

/**
 * Orientador guiado por TIPO DE CONSULTA y PREFERENCIA DE CANAL.
 * No pregunta por síntomas, no puntúa riesgo y no diagnostica:
 * solo decide qué canal oficial verificado puede orientar la consulta.
 */

export type Proposito = 'hablar_ahora' | 'por_otra_persona' | 'en_persona' | 'emergencia';
export type PreferenciaCanal = 'llamada' | 'whatsapp';

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
    { valor: 'por_otra_persona', texto: 'Me preocupa alguien y quiero saber cómo ayudar', ayuda: 'Consejos para acompañar y las líneas que también te orientan a ti.' },
    { valor: 'en_persona', texto: 'Prefiero ir a un lugar en persona', ayuda: 'Te mostramos en un mapa las instituciones de salud mental de Villavicencio.' },
    { valor: 'emergencia', texto: 'Es una emergencia ahora mismo', ayuda: 'Te mostramos de inmediato las líneas para actuar ya.' },
  ] as Opcion<Proposito>[],
};

export const PREGUNTA_CANAL = {
  id: 'canal',
  texto: '¿Cómo prefieres comunicarte?',
  opciones: [
    { valor: 'llamada', texto: 'Llamar', ayuda: 'Hablas con una persona por teléfono.' },
    { valor: 'whatsapp', texto: 'Escribir por WhatsApp', ayuda: 'Conversas por chat, a tu ritmo.' },
  ] as Opcion<PreferenciaCanal>[],
};

/** Solo "hablar con alguien" pregunta el canal: en los demás propósitos la respuesta no cambiaría el resultado. */
export function necesitaCanal(r: Partial<Respuestas>): boolean {
  return r.proposito === 'hablar_ahora';
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
  /** Lleva al mapa de lugares de atención presencial. */
  irALugares: boolean;
  /** Guía de Recursos que acompaña el resultado (id de recursos.json), si aplica. */
  guia: string | null;
  sinDatosVigentes: boolean;
}

const PRIORIDAD_ESTADO: Record<ResultadoVigencia['estado'], number> = {
  vigente: 0,
  por_vencer: 1,
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

export function orientar(respuestas: Respuestas, servicios: Servicio[], hoy: string): ResultadoOrientador {
  const evaluados = servicios.map((servicio) => ({ servicio, vigencia: evaluarVigencia(servicio, hoy) }));
  const mostrables = evaluados.filter((e) => e.vigencia.mostrable);
  const remotos: TipoCanal[] = ['llamada', 'whatsapp'];
  const base = { irADirectorio: false, irALugares: false, guia: null, sinDatosVigentes: false };

  const sinDatos = (): ResultadoOrientador => ({
    ...base,
    titulo: 'No tenemos datos verificados vigentes',
    mensaje:
      'Ninguna línea tiene hoy una verificación vigente en esta herramienta. Consulta directamente el directorio oficial de MinSalud o la página de la Alcaldía de Villavicencio.',
    recomendaciones: [],
    porQue: 'Por seguridad, no mostramos teléfonos sin fuente oficial y fecha de verificación de los últimos 30 días.',
    irADirectorio: true,
    sinDatosVigentes: true,
  });

  if (respuestas.proposito === 'en_persona') {
    return {
      ...base,
      titulo: 'Lugares de atención en salud mental',
      mensaje: 'Te mostramos en un mapa las instituciones habilitadas en Villavicencio. Llama antes de ir para confirmar horario y si atienden tu caso.',
      recomendaciones: [],
      porQue: 'Elegiste ir en persona: mostramos sedes habilitadas en el registro oficial de prestadores (REPS) de MinSalud.',
      irALugares: true,
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
      ...base,
      titulo: 'Busca ayuda inmediata',
      mensaje:
        'Si la vida de alguien está en peligro ahora, acude al servicio de urgencias más cercano o llama a una de estas líneas. No esperes a terminar de leer esta página.',
      recomendaciones: recs,
      porQue:
        'Elegiste "emergencia": mostramos primero líneas de emergencia verificadas y luego líneas 24 horas. Esta herramienta no evalúa la situación; eso lo hacen las personas de esas líneas.',
    };
  }

  const candidatos = mostrables.filter((e) => !e.servicio.emergencia);
  const conCanales = (tipos: TipoCanal[]) =>
    candidatos
      .map((e) => ({ ...e, canalesSugeridos: canalesDe(e.servicio, tipos) }))
      .filter((r) => r.canalesSugeridos.length > 0)
      .sort(ordenar);

  if (respuestas.proposito === 'por_otra_persona') {
    const recs = conCanales(remotos);
    if (recs.length === 0) return sinDatos();
    return {
      ...base,
      titulo: 'Puedes acompañar sin hacerlo solo',
      mensaje:
        'Estas ideas te ayudan a estar presente. Y si necesitas orientación para ayudar, las líneas de apoyo también te atienden a ti: puedes contar la situación sin dar nombres.',
      recomendaciones: recs,
      porQue: 'Elegiste ayudar a otra persona: mostramos consejos para acompañar y las líneas verificadas por llamada o WhatsApp, primero las de Villavicencio.',
      guia: 'acompanar',
    };
  }

  // hablar_ahora
  const pref = respuestas.canal;
  let recs = conCanales(pref ? [pref] : remotos);
  let porQue = pref
    ? `Mostramos canales verificados que atienden por ${pref === 'llamada' ? 'llamada' : 'WhatsApp'}, primero los de Villavicencio.`
    : 'Mostramos canales verificados por llamada o WhatsApp, primero los de Villavicencio.';

  if (recs.length === 0 && pref) {
    // Respaldo: ningún servicio vigente atiende por el canal pedido.
    recs = conCanales(remotos);
    porQue = `Ningún servicio verificado atiende hoy por ${pref === 'whatsapp' ? 'WhatsApp' : 'llamada'}; te mostramos las otras opciones disponibles.`;
  }

  if (recs.length === 0) return sinDatos();

  return {
    ...base,
    titulo: 'Hay personas listas para escucharte',
    mensaje: 'Escoge el canal con el que te sientas más cómodo. La conversación es con personas de servicios oficiales.',
    recomendaciones: recs,
    porQue,
  };
}
