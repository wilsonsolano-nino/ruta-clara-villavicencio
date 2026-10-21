import { describe, expect, it } from 'vitest';
import datos from '../src/data/servicios.json';
import { contarAbiertos, crearReporte, reportesACSV, validarComentario } from '../src/logic/reportes';
import type { Servicio } from '../src/logic/tipos';
import { evaluarVigencia } from '../src/logic/vigencia';

const servicios = datos.servicios as Servicio[];

describe('Reporte de dato caído (plan de operación)', () => {
  it('CP-21 · Se crea un reporte abierto y se cuenta por servicio', () => {
    const a = crearReporte('f-local', 'no_contesta', '', '2026-10-20');
    const b = crearReporte('f-local', 'enlace_caido', 'El enlace abre una página en blanco', '2026-10-20');
    const c = { ...crearReporte('f-nacional', 'otro', '', '2026-10-20'), estado: 'resuelto' as const };
    expect(contarAbiertos([a, b, c])).toEqual({ 'f-local': 2 });
  });

  it('CP-22 · Rechaza comentarios con teléfono, documento o correo (cero datos personales)', () => {
    expect(validarComentario('Me contestó y me dijo que llamara al 310 555 1234').ok).toBe(false);
    expect(validarComentario('escríbanme a alguien@correo.com').ok).toBe(false);
    expect(validarComentario('No contestan después de las 10 pm').ok).toBe(true);
    expect(() => crearReporte('x', 'otro', 'mi cédula 1234567890', '2026-10-20')).toThrow();
  });

  it('CP-23 · Exporta reportes a CSV para el equipo verificador', () => {
    const csv = reportesACSV([crearReporte('f-local', 'otro', 'dice "hola"', '2026-10-20')]);
    expect(csv.split('\n')[0]).toBe('id,servicio,motivo,fecha,estado,comentario');
    expect(csv).toContain('"dice ""hola"""');
  });
});

describe('Integridad del directorio real (servicios.json)', () => {
  it('CP-24 · Todo servicio mostrable tiene fuente, fecha y responsable de verificación', () => {
    for (const s of servicios) {
      const v = evaluarVigencia(s, '2026-10-20');
      if (v.mostrable) {
        expect(s.fuente?.nombre).toBeTruthy();
        expect(s.fechaVerificacion).toBeTruthy();
        expect(s.verificadoPor).toBeTruthy();
      }
    }
  });

  it('CP-25 · Los datos sin fuente (p. ej. 123, 01 8000) quedan "por verificar" y no se exponen', () => {
    const pendientes = servicios.filter((s) => !evaluarVigencia(s, '2026-10-20').mostrable).map((s) => s.id);
    expect(pendientes).toEqual(expect.arrayContaining(['linea-123', 'linea-018000931089']));
  });

  it('CP-26 · Los identificadores son únicos y cada servicio tiene al menos un canal', () => {
    const ids = servicios.map((s) => s.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const s of servicios) expect(s.canales.length).toBeGreaterThan(0);
  });
});
