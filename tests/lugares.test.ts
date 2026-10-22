import { describe, expect, it } from 'vitest';
import datosLugares from '../src/data/lugares.json';
import type { Lugar } from '../src/logic/tipos';
import { evaluarVigencia } from '../src/logic/vigencia';

const lugares = datosLugares.lugares as Lugar[];

describe('Lugares de atención presencial (lugares.json)', () => {
  it('CP-24 · Cada lugar cita el REPS, tiene código de habilitación de Villavicencio, fecha vigente y su punto cae dentro del municipio', () => {
    expect(lugares.length).toBeGreaterThan(0);
    for (const l of lugares) {
      expect(evaluarVigencia(l, '2026-10-21').mostrable).toBe(true);
      expect(l.fuente?.nombre).toMatch(/REPS/);
      expect(l.codigoHabilitacion).toMatch(/^50001\d{7}$/); // 50001 = código DANE de Villavicencio
      expect(l.verificadoPor).toBeTruthy();
      if (l.coordenadas) {
        expect(l.origenUbicacion).toBeTruthy();
        expect(l.coordenadas.lat).toBeGreaterThan(4.05);
        expect(l.coordenadas.lat).toBeLessThan(4.25);
        expect(l.coordenadas.lng).toBeGreaterThan(-73.75);
        expect(l.coordenadas.lng).toBeLessThan(-73.5);
      }
    }
  });
});
