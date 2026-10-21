// Convierte el JSON de Vitest en una tabla Markdown de evidencia TRL 4.
import { readFileSync, writeFileSync } from 'node:fs';

const entrada = 'docs/evidencia/resultados-pruebas.json';
const salida = 'docs/evidencia/resultados-pruebas.md';
const json = JSON.parse(readFileSync(entrada, 'utf8'));

const filas = json.testResults
  .flatMap((f) => f.assertionResults.map((a) => ({ grupo: a.ancestorTitles.join(' › '), titulo: a.title, estado: a.status, ms: a.duration ?? 0 })))
  .sort((a, b) => a.titulo.localeCompare(b.titulo, 'es', { numeric: true }));

const fecha = new Date(json.startTime).toLocaleString('es-CO', { timeZone: 'America/Bogota' });
const ok = filas.filter((f) => f.estado === 'passed').length;

const md = [
  '# Resultados de pruebas controladas · Ruta Clara Villavicencio',
  '',
  `Ejecución: ${fecha} (hora Colombia) · Herramienta: Vitest · Datos: sintéticos y escenarios ficticios`,
  '',
  `**${ok} de ${filas.length} casos aprobados.**`,
  '',
  '| ID | Caso de prueba | Función | Resultado | Tiempo |',
  '|---|---|---|---|---|',
  ...filas.map((f) => {
    const [id, ...resto] = f.titulo.split(' · ');
    return `| ${id} | ${resto.join(' · ')} | ${f.grupo} | ${f.estado === 'passed' ? '✅ Aprobado' : '❌ ' + f.estado} | ${Math.round(f.ms)} ms |`;
  }),
  '',
  'Regenerar con `npm run evidencia`.',
  '',
].join('\n');

writeFileSync(salida, md);
console.log(`Evidencia escrita en ${salida} (${ok}/${filas.length} aprobados)`);
