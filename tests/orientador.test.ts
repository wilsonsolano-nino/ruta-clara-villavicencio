import { describe, expect, it } from 'vitest';
import { necesitaCanal, orientar, PREGUNTA_CANAL, PREGUNTA_PROPOSITO } from '../src/logic/orientador';
import { EMERGENCIA, HOY, LOCAL_LLAMADA_WA, NACIONAL_LLAMADA, SIN_FUENTE, TODOS, VENCIDO } from './escenarios';

const ids = (r: ReturnType<typeof orientar>) => r.recomendaciones.map((x) => x.servicio.id);
const PROPOSITOS = ['hablar_ahora', 'por_otra_persona', 'en_persona', 'emergencia'] as const;

describe('Función crítica 2 · Orientador por tipo de consulta (escenarios ficticios)', () => {
  it('CP-08 · "Ana" (ficticia) quiere hablar por WhatsApp → solo servicios vigentes con WhatsApp', () => {
    const r = orientar({ proposito: 'hablar_ahora', canal: 'whatsapp' }, TODOS, HOY);
    expect(ids(r)).toEqual(['f-local']);
    expect(r.recomendaciones[0].canalesSugeridos).toEqual(['whatsapp']);
  });

  it('CP-09 · "Luis" (ficticio) prefiere llamar → local primero, luego nacional', () => {
    const r = orientar({ proposito: 'hablar_ahora', canal: 'llamada' }, TODOS, HOY);
    expect(ids(r)).toEqual(['f-local', 'f-nacional']);
  });

  it('CP-10 · Nunca recomienda servicios sin fuente o vencidos', () => {
    for (const proposito of PROPOSITOS) {
      const r = orientar({ proposito, canal: 'llamada' }, TODOS, HOY);
      expect(ids(r)).not.toContain(SIN_FUENTE.id);
      expect(ids(r)).not.toContain(VENCIDO.id);
    }
  });

  it('CP-11 · Emergencia → la línea de emergencias aparece primero', () => {
    const r = orientar({ proposito: 'emergencia' }, TODOS, HOY);
    expect(ids(r)[0]).toBe(EMERGENCIA.id);
    expect(r.irADirectorio).toBe(false);
  });

  it('CP-12 · Emergencia sin línea de emergencias verificada → muestra líneas 24 h', () => {
    const r = orientar({ proposito: 'emergencia' }, [LOCAL_LLAMADA_WA, NACIONAL_LLAMADA], HOY);
    expect(ids(r)).toEqual(['f-local', 'f-nacional']);
  });

  it('CP-13 · "Sofía" (ficticia) pregunta por un amigo → consejos para acompañar y líneas, sin segunda pregunta', () => {
    expect(necesitaCanal({ proposito: 'por_otra_persona' })).toBe(false);
    const r = orientar({ proposito: 'por_otra_persona' }, TODOS, HOY);
    expect(r.titulo).toMatch(/acompañar/);
    expect(r.guia).toBe('acompanar');
    expect(ids(r)).toEqual(['f-local', 'f-nacional']);
  });

  it('CP-14 · Canal pedido sin oferta vigente → respaldo con otros canales y lo explica', () => {
    const r = orientar({ proposito: 'hablar_ahora', canal: 'whatsapp' }, [NACIONAL_LLAMADA], HOY);
    expect(ids(r)).toEqual(['f-nacional']);
    expect(r.porQue).toMatch(/Ningún servicio verificado atiende hoy por WhatsApp/);
  });

  it('CP-15 · Sin ningún dato vigente → no muestra teléfonos y remite a fuente oficial', () => {
    const r = orientar({ proposito: 'hablar_ahora', canal: 'llamada' }, [SIN_FUENTE, VENCIDO], HOY);
    expect(r.sinDatosVigentes).toBe(true);
    expect(r.recomendaciones).toHaveLength(0);
  });

  it('CP-16 · Cada resultado explica la regla aplicada ("por qué")', () => {
    for (const proposito of PROPOSITOS) {
      expect(orientar({ proposito }, TODOS, HOY).porQue.length).toBeGreaterThan(20);
    }
  });

  it('CP-17 · Salvaguarda: las preguntas no piden síntomas, diagnóstico ni datos personales', () => {
    const textos = [PREGUNTA_PROPOSITO, PREGUNTA_CANAL]
      .flatMap((p) => [p.texto, ...p.opciones.map((o) => `${o.texto} ${o.ayuda ?? ''}`)])
      .join(' ')
      .toLowerCase();
    for (const prohibido of ['síntoma', 'diagnóst', 'riesgo', 'nombre', 'edad', 'cédula', 'escala', 'puntaje', 'suicid']) {
      expect(textos).not.toContain(prohibido);
    }
    expect(necesitaCanal({ proposito: 'hablar_ahora' })).toBe(true);
  });

  it('CP-18 · Cada propósito lleva a un resultado distinto (sin respuestas redundantes)', () => {
    const firmas = PROPOSITOS.map((proposito) => {
      const r = orientar({ proposito }, TODOS, HOY);
      return JSON.stringify([r.titulo, ids(r), r.guia, r.irALugares]);
    });
    expect(new Set(firmas).size).toBe(PROPOSITOS.length);
    expect(orientar({ proposito: 'en_persona' }, TODOS, HOY).irALugares).toBe(true);
    // "Llamar" y "WhatsApp" ya no se acompañan de un "Me da igual" que repetía el mismo resultado.
    expect(PREGUNTA_CANAL.opciones.map((o) => o.valor)).toEqual(['llamada', 'whatsapp']);
  });
});
