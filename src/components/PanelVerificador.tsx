import type { Reporte, Servicio } from '../logic/tipos';
import { evaluarVigencia, hoyISO } from '../logic/vigencia';
import { MOTIVOS, reportesACSV } from '../logic/reportes';
import { formatearFecha } from '../logic/formato';

interface Props {
  servicios: Servicio[];
  hoy: string;
  reportes: Reporte[];
  reportesAbiertos: Record<string, number>;
  fechaDemo: string;
  onFechaDemo: (fecha: string) => void;
  onResolver: (reporteId: string) => void;
  onBorrarReportes: () => void;
}

/** Vista del equipo verificador: separada del flujo del joven, enlazada desde el pie de página. */
export function PanelVerificador({ servicios, hoy, reportes, reportesAbiertos, fechaDemo, onFechaDemo, onResolver, onBorrarReportes }: Props) {
  const abiertos = reportes.filter((r) => r.estado === 'abierto');
  const porRenovar = servicios
    .map((s) => ({ servicio: s, vigencia: evaluarVigencia(s, hoy, reportesAbiertos[s.id] ?? 0) }))
    .filter((e) => ['por_vencer', 'vencido', 'sin_verificar'].includes(e.vigencia.estado));
  const nombre = (id: string) => servicios.find((s) => s.id === id)?.nombre ?? id;
  const motivo = (m: string) => MOTIVOS.find((x) => x.valor === m)?.texto ?? m;

  const descargar = () => {
    const blob = new Blob([reportesACSV(reportes)], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'reportes-rutaclara.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <section aria-labelledby="panel-titulo">
      <div className="intro">
        <h2 id="panel-titulo">Panel del equipo verificador</h2>
        <p>Demostración del plan de operación: qué datos hay que verificar o renovar y qué reportes llegaron.</p>
      </div>

      <div className="panel-grid">
        <div className="caja">
          <h3>Por verificar o renovar ({porRenovar.length})</h3>
          <ul>
            {porRenovar.map((e) => (
              <li key={e.servicio.id}>
                <strong>{e.servicio.nombre}</strong>
                <span>{e.vigencia.motivo}</span>
              </li>
            ))}
            {porRenovar.length === 0 && <li>Todo al día.</li>}
          </ul>
        </div>

        <div className="caja">
          <h3>Reportes abiertos ({abiertos.length})</h3>
          <ul>
            {abiertos.map((r) => (
              <li key={r.id}>
                <strong>{nombre(r.servicioId)}</strong>
                <span>{motivo(r.motivo)}. {formatearFecha(r.fecha)}.{r.comentario && <> Comentario: “{r.comentario}”</>}</span>
                <button type="button" className="enlace-boton" onClick={() => onResolver(r.id)}>Marcar revisado</button>
              </li>
            ))}
            {abiertos.length === 0 && <li>Sin reportes abiertos.</li>}
          </ul>
          <button type="button" className="boton boton-secundario" onClick={descargar} disabled={reportes.length === 0}>
            Descargar CSV
          </button>
        </div>

        <div className="caja">
          <h3>Modo demostración</h3>
          <p className="nota">Simula otra fecha para ver cómo la app oculta sola los datos vencidos. Prueba con una fecha posterior al 18 nov 2026.</p>
          <div className="campo">
            <label htmlFor="fecha-demo">Fecha de hoy simulada</label>
            <input id="fecha-demo" type="date" value={fechaDemo || hoyISO()} onChange={(e) => onFechaDemo(e.target.value)} />
          </div>
          <div className="acciones-final">
            <button type="button" className="boton boton-secundario" onClick={() => onFechaDemo('')} disabled={!fechaDemo}>Usar fecha real</button>
            <button type="button" className="enlace-boton" onClick={onBorrarReportes} disabled={reportes.length === 0}>Borrar reportes de prueba</button>
          </div>
        </div>
      </div>
    </section>
  );
}
