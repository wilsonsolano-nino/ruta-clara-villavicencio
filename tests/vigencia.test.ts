import { describe, expect, it } from 'vitest';
import { aDias, evaluarVigencia } from '../src/logic/vigencia';
import { HOY, LOCAL_LLAMADA_WA, SIN_FUENTE, VENCIDO } from './escenarios';

describe('Función crítica 1 · Directorio verificado con vigencia', () => {
  it('CP-01 · Servicio con fuente y verificado hace 1 día se muestra como vigente', () => {
    const r = evaluarVigencia(LOCAL_LLAMADA_WA, HOY);
    expect(r.estado).toBe('vigente');
    expect(r.mostrable).toBe(true);
    expect(r.diasDesdeVerificacion).toBe(1);
  });

  it('CP-02 · Servicio sin fuente oficial NO se muestra como vigente', () => {
    const r = evaluarVigencia(SIN_FUENTE, HOY);
    expect(r.estado).toBe('sin_verificar');
    expect(r.mostrable).toBe(false);
  });

  it('CP-03 · Servicio sin fecha de verificación NO se muestra como vigente', () => {
    const r = evaluarVigencia({ ...LOCAL_LLAMADA_WA, fechaVerificacion: null }, HOY);
    expect(r.mostrable).toBe(false);
  });

  it('CP-04 · Verificación de hace más de 30 días queda vencida y oculta', () => {
    const r = evaluarVigencia(VENCIDO, HOY);
    expect(r.estado).toBe('vencido');
    expect(r.mostrable).toBe(false);
  });

  it('CP-05 · Límite exacto: 30 días sigue mostrable (por renovar), 31 días vence', () => {
    expect(evaluarVigencia(LOCAL_LLAMADA_WA, '2026-11-18').estado).toBe('por_vencer');
    expect(evaluarVigencia(LOCAL_LLAMADA_WA, '2026-11-19').estado).toBe('vencido');
  });

  it('CP-06 · Entre 24 y 30 días se avisa que requiere nueva verificación', () => {
    const r = evaluarVigencia(LOCAL_LLAMADA_WA, '2026-11-13');
    expect(r.estado).toBe('por_vencer');
    expect(r.mostrable).toBe(true);
  });

  it('CP-07 · Fecha inválida o en el futuro se trata como no verificada', () => {
    expect(evaluarVigencia({ ...LOCAL_LLAMADA_WA, fechaVerificacion: '2026-02-31' }, HOY).mostrable).toBe(false);
    expect(evaluarVigencia({ ...LOCAL_LLAMADA_WA, fechaVerificacion: '2027-01-01' }, HOY).mostrable).toBe(false);
    expect(aDias('19/10/2026')).toBeNull();
  });

  it('CP-08 · Un reporte de falla marca "en revisión" sin ocultar el contacto', () => {
    const r = evaluarVigencia(LOCAL_LLAMADA_WA, HOY, 1);
    expect(r.estado).toBe('en_revision');
    expect(r.mostrable).toBe(true);
  });

  it('CP-09 · Un reporte no "revive" un dato vencido', () => {
    expect(evaluarVigencia(VENCIDO, HOY, 2).estado).toBe('vencido');
  });
});
