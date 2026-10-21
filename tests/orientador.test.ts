import { describe, expect, it } from 'vitest';
import { necesitaCanal, orientar, PREGUNTA_CANAL, PREGUNTA_PROPOSITO } from '../src/logic/orientador';
import { EMERGENCIA, HOY, LOCAL_LLAMADA_WA, NACIONAL_LLAMADA, SIN_FUENTE, TODOS, VENCIDO } from './escenarios';

const ids = (r: ReturnType<typeof orientar>) => r.recomendaciones.map((x) => x.servicio.id);

describe('Función crítica 2 · Orientador por tipo de consulta (escenarios ficticios)', () => {
  it('CP-10 · "Ana" (ficticia) quiere hablar por WhatsApp → solo servicios vigentes con WhatsApp', () => {
    const r = orientar({ proposito: 'hablar_ahora', canal: 'whatsapp' }, TODOS, HOY);
    expect(ids(r)).toEqual(['f-local']);
    expect(r.recomendaciones[0].canalesSugeridos).toEqual(['whatsapp']);
  });

  it('CP-11 · "Luis" (ficticio) prefiere llamada → local primero, luego nacional', () => {
    const r = orientar({ proposito: 'hablar_ahora', canal: 'llamada' }, TODOS, HOY);
    expect(ids(r)).toEqual(['f-local', 'f-nacional']);
  });

  it('CP-12 · Nunca recomienda servicios sin fuente o vencidos', () => {
    for (const proposito of ['hablar_ahora', 'por_otra_persona', 'conocer_servicios', 'emergencia'] as const) {
      const r = orientar({ proposito, canal: 'cualquiera' }, TODOS, HOY);
      expect(ids(r)).not.toContain(SIN_FUENTE.id);
      expect(ids(r)).not.toContain(VENCIDO.id);
    }
  });

  it('CP-13 · Emergencia → la línea de emergencias aparece primero', () => {
    const r = orientar({ proposito: 'emergencia' }, TODOS, HOY);
    expect(ids(r)[0]).toBe(EMERGENCIA.id);
    expect(r.irADirectorio).toBe(false);
  });

  it('CP-14 · Emergencia sin línea de emergencias verificada → muestra líneas 24 h', () => {
    const r = orientar({ proposito: 'emergencia' }, [LOCAL_LLAMADA_WA, NACIONAL_LLAMADA], HOY);
    expect(ids(r)).toEqual(['f-local', 'f-nacional']);
  });

  it('CP-15 · "Sofía" (ficticia) pregunta por un amigo → mensaje para acompañar', () => {
    const r = orientar({ proposito: 'por_otra_persona', canal: 'cualquiera' }, TODOS, HOY);
    expect(r.titulo).toMatch(/acompañar/);
    expect(ids(r)).toContain('f-local');
  });

  it('CP-16 · Canal pedido sin oferta vigente → respaldo con otros canales y lo explica', () => {
    const r = orientar({ proposito: 'hablar_ahora', canal: 'whatsapp' }, [NACIONAL_LLAMADA], HOY);
    expect(ids(r)).toEqual(['f-nacional']);
    expect(r.porQue).toMatch(/Ningún servicio verificado atiende hoy por WhatsApp/);
  });

  it('CP-17 · Sin ningún dato vigente → no muestra teléfonos y remite a fuente oficial', () => {
    const r = orientar({ proposito: 'hablar_ahora', canal: 'llamada' }, [SIN_FUENTE, VENCIDO], HOY);
    expect(r.sinDatosVigentes).toBe(true);
    expect(r.recomendaciones).toHaveLength(0);
  });

  it('CP-18 · Servicio con reporte abierto baja de prioridad', () => {
    const r = orientar({ proposito: 'hablar_ahora', canal: 'llamada' }, TODOS, HOY, { 'f-local': 1 });
    expect(ids(r)).toEqual(['f-nacional', 'f-local']);
  });

  it('CP-19 · Cada resultado explica la regla aplicada ("por qué")', () => {
    for (const proposito of ['hablar_ahora', 'por_otra_persona', 'conocer_servicios', 'emergencia'] as const) {
      expect(orientar({ proposito }, TODOS, HOY).porQue.length).toBeGreaterThan(20);
    }
  });

  it('CP-20 · Salvaguarda: las preguntas no piden síntomas, diagnóstico ni datos personales', () => {
    const textos = [PREGUNTA_PROPOSITO, PREGUNTA_CANAL]
      .flatMap((p) => [p.texto, ...p.opciones.map((o) => `${o.texto} ${o.ayuda ?? ''}`)])
      .join(' ')
      .toLowerCase();
    for (const prohibido of ['síntoma', 'diagnóst', 'riesgo', 'nombre', 'edad', 'cédula', 'escala', 'puntaje', 'suicid']) {
      expect(textos).not.toContain(prohibido);
    }
    expect(necesitaCanal({ proposito: 'conocer_servicios' })).toBe(false);
    expect(necesitaCanal({ proposito: 'hablar_ahora' })).toBe(true);
  });
});
