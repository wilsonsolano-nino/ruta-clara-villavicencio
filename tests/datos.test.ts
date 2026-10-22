import { describe, expect, it } from 'vitest';
import datos from '../src/data/servicios.json';
import datosRecursos from '../src/data/recursos.json';
import type { Recurso, Servicio } from '../src/logic/tipos';
import { aDias, evaluarVigencia } from '../src/logic/vigencia';

const servicios = datos.servicios as Servicio[];
const recursos = datosRecursos.recursos as Recurso[];

describe('Integridad del directorio real (servicios.json)', () => {
  it('CP-19 · Todo servicio mostrable tiene fuente con enlace oficial, fecha y responsable de verificación', () => {
    for (const s of servicios) {
      const v = evaluarVigencia(s, '2026-10-21');
      if (v.mostrable) {
        expect(s.fuente?.nombre).toBeTruthy();
        expect(s.fuente?.url).toMatch(/^https:\/\/[^/]*\.gov\.co\//);
        expect(s.fechaVerificacion).toBeTruthy();
        expect(s.verificadoPor).toBeTruthy();
      }
    }
  });

  it('CP-20 · Los datos sin fuente quedan "por verificar" y no se exponen; 123, 106 y Yo Te Escucho tienen fuente', () => {
    const evaluar = (hoy: string) => servicios.filter((s) => evaluarVigencia(s, hoy).mostrable).map((s) => s.id);
    expect(evaluar('2026-10-21')).not.toContain('secretaria-salud-villavicencio');
    expect(evaluar('2026-10-21')).toEqual(expect.arrayContaining(['linea-123', 'linea-106', 'yo-te-escucho']));
  });

  it('CP-21 · Los identificadores son únicos y cada servicio tiene al menos un canal', () => {
    const ids = servicios.map((s) => s.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const s of servicios) expect(s.canales.length).toBeGreaterThan(0);
  });
});

describe('Recursos informativos (recursos.json)', () => {
  it('CP-22 · Cada guía cita al menos una fuente con enlace y una fecha de consulta válida', () => {
    for (const r of recursos) {
      expect(r.fuentes.length).toBeGreaterThan(0);
      for (const f of r.fuentes) {
        expect(f.nombre).toBeTruthy();
        expect(f.url).toMatch(/^https:\/\//);
      }
      expect(aDias(r.fechaConsulta)).not.toBeNull();
      expect(r.pautas.length).toBeGreaterThan(0);
    }
  });

  it('CP-23 · Las guías no usan lenguaje de diagnóstico ni de tratamiento', () => {
    const prohibidas = /diagn[oó]stic|s[ií]ntoma|trastorno|tratamiento|medicamento|escala/i;
    for (const r of recursos) {
      const pautas = r.pautas.flatMap((p) => [p.idea, p.texto]);
      for (const texto of [r.titulo, r.resumen, ...pautas, r.cuandoBuscarApoyo]) expect(texto).not.toMatch(prohibidas);
    }
  });
});
