import { useMemo, useState } from 'react';
import type { Servicio, TipoCanal } from '../logic/tipos';
import { evaluarVigencia } from '../logic/vigencia';
import { TarjetaServicio } from './TarjetaServicio';

interface Props {
  servicios: Servicio[];
  hoy: string;
  reportesAbiertos: Record<string, number>;
  onReportar: (id: string) => void;
}

type Filtro = 'todos' | TipoCanal;

const FILTROS: { id: Filtro; texto: string }[] = [
  { id: 'todos', texto: 'Todos' },
  { id: 'llamada', texto: 'Llamada' },
  { id: 'whatsapp', texto: 'WhatsApp' },
  { id: 'presencial', texto: 'Presencial' },
];

export function Directorio({ servicios, hoy, reportesAbiertos, onReportar }: Props) {
  const [filtro, setFiltro] = useState<Filtro>('todos');

  const evaluados = useMemo(
    () => servicios.map((s) => ({ servicio: s, vigencia: evaluarVigencia(s, hoy, reportesAbiertos[s.id] ?? 0) })),
    [servicios, hoy, reportesAbiertos],
  );
  const filtrados = evaluados.filter((e) => filtro === 'todos' || e.servicio.canales.some((c) => c.tipo === filtro));
  const verificados = filtrados.filter((e) => e.vigencia.mostrable);
  // Mismo criterio que la franja de emergencia: atención 24 horas.
  const ahora = verificados.filter((e) => e.servicio.horario.includes('24'));
  const otras = verificados.filter((e) => !e.servicio.horario.includes('24'));
  const pendientes = filtrados.filter((e) => !e.vigencia.mostrable);

  return (
    <>
      <section aria-labelledby="dir-titulo">
        <div className="intro">
          <h2 id="dir-titulo">Canales oficiales de apoyo</h2>
          <p>Cada contacto muestra su fuente oficial y la fecha en que se verificó. Si pasan más de 30 días sin verificarlo, lo ocultamos.</p>
        </div>

        <div className="filtros" role="group" aria-labelledby="filtros-titulo">
          <span id="filtros-titulo" className="solo-lector">Filtrar por canal</span>
          {FILTROS.map((f) => (
            <button key={f.id} type="button" className="chip" aria-pressed={filtro === f.id} onClick={() => setFiltro(f.id)}>
              {f.texto}
            </button>
          ))}
        </div>

        {verificados.length === 0 && <p className="vacio">No hay canales verificados vigentes para este filtro.</p>}

        {ahora.length > 0 && (
          <>
            <h3 className="subtitulo">Para hablar ahora</h3>
            <p className="nota">Atienden las 24 horas, todos los días.</p>
            <div className="lista-tarjetas">
              {ahora.map((e) => <TarjetaServicio key={e.servicio.id} rec={e} onReportar={onReportar} />)}
            </div>
          </>
        )}

        {otras.length > 0 && (
          <>
            <h3 className="subtitulo">Otras rutas</h3>
            <div className="lista-tarjetas">
              {otras.map((e) => <TarjetaServicio key={e.servicio.id} rec={e} onReportar={onReportar} />)}
            </div>
          </>
        )}

        {pendientes.length > 0 && (
          <div className="pendientes">
            <h3>Pendientes de verificación</h3>
            <p>Estos servicios existen, pero todavía no tienen fuente oficial con fecha vigente. No mostramos su contacto hasta verificarlos.</p>
            <ul>
              {pendientes.map((e) => (
                <li key={e.servicio.id}>{e.servicio.nombre}. {e.vigencia.motivo}</li>
              ))}
            </ul>
          </div>
        )}
      </section>

      <section className="contexto" aria-labelledby="leer-titulo">
        <h3 id="leer-titulo">Cómo leer este directorio</h3>
        <ul>
          <li><strong>Verificado</strong> significa que alguien comprobó el dato en una fuente oficial en los últimos 30 días.</li>
          <li><strong>¿Un dato no funciona?</strong> Usa "Reportar dato incorrecto". No escribas datos personales.</li>
          <li><strong>Si es una emergencia,</strong> usa las líneas del panel "¿Es una emergencia?" o acude a urgencias.</li>
        </ul>
      </section>
    </>
  );
}
