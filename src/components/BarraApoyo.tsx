import type { Servicio } from '../logic/tipos';
import { evaluarVigencia } from '../logic/vigencia';

/**
 * Acceso a emergencia sin pasos: líneas 24 h verificadas, con la misma regla de vigencia que el resto de la app.
 * En escritorio es un panel lateral fijo; en móvil, una barra fija abajo (ver styles.css).
 */
export function BarraApoyo({ servicios, hoy }: { servicios: Servicio[]; hoy: string }) {
  const lineas = servicios
    .filter((s) => s.horario.includes('24') && evaluarVigencia(s, hoy).mostrable)
    .flatMap((s) => s.canales.filter((c) => c.tipo === 'llamada').map((c) => ({ s, c })))
    .slice(0, 2);

  return (
    <aside className="emergencia" aria-labelledby="emergencia-titulo">
      <h2 id="emergencia-titulo" className="emergencia-titulo">¿Es una emergencia?</h2>
      <p className="emergencia-desc">Si la vida de alguien está en peligro, llama ya o acude al servicio de urgencias más cercano. Estas líneas atienden las 24 horas.</p>
      {lineas.length > 0 ? (
        <ul className="emergencia-lineas">
          {lineas.map(({ s, c }) => {
            const numero = c.etiqueta.replace('Llamar al ', '');
            // "Línea 106 · Línea nacional de salud mental": se describe con la parte que no repite el número.
            const partes = s.nombre.split('·').map((p) => p.trim());
            const descripcion = partes.length > 1 ? partes[1] : partes[0];
            return (
              <li key={s.id}>
                <a href={`tel:${c.valor}`} className="emergencia-linea" aria-label={`${c.etiqueta}, ${s.nombre}, 24 horas`}>
                  <strong><span className="llamar-al">Llamar al </span>{numero}</strong>
                  <span>{descripcion}</span>
                </a>
              </li>
            );
          })}
        </ul>
      ) : (
        <p>Consulta el directorio oficial de MinSalud.</p>
      )}
      <a className="emergencia-mas" href="#emergencia">Ver todas las opciones</a>
    </aside>
  );
}
