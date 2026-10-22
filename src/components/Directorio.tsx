import { useMemo, useState } from 'react';
import type { Lugar, Servicio, TipoCanal } from '../logic/tipos';
import { evaluarVigencia } from '../logic/vigencia';
import { TarjetaServicio } from './TarjetaServicio';
import { TarjetaLugar } from './TarjetaLugar';

interface Props {
  servicios: Servicio[];
  /** Sedes del REPS: son la atención presencial del directorio. */
  lugares: Lugar[];
  hoy: string;
}

type Filtro = 'todos' | TipoCanal;

const FILTROS: { id: Filtro; texto: string }[] = [
  { id: 'todos', texto: 'Todos' },
  { id: 'llamada', texto: 'Llamada' },
  { id: 'whatsapp', texto: 'WhatsApp' },
  { id: 'presencial', texto: 'Presencial' },
];

export function Directorio({ servicios, lugares, hoy }: Props) {
  const [filtro, setFiltro] = useState<Filtro>('todos');

  const evaluados = useMemo(
    () => servicios.map((s) => ({ servicio: s, vigencia: evaluarVigencia(s, hoy) })),
    [servicios, hoy],
  );
  const filtrados = evaluados.filter((e) => filtro === 'todos' || e.servicio.canales.some((c) => c.tipo === filtro));
  const verificados = filtrados.filter((e) => e.vigencia.mostrable);
  // Mismo criterio que la franja de emergencia: atención 24 horas.
  const ahora = verificados.filter((e) => e.servicio.horario.includes('24'));
  const otras = verificados.filter((e) => !e.servicio.horario.includes('24'));
  const pendientes = filtrados.filter((e) => !e.vigencia.mostrable);
  const lugaresVigentes = lugares.filter((l) => evaluarVigencia(l, hoy).mostrable);
  const presencial = filtro === 'presencial';

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

        {verificados.length === 0 && !presencial && <p className="vacio">No hay canales verificados vigentes para este filtro.</p>}

        {presencial && (
          <>
            <h3 className="subtitulo">Lugares de atención en salud mental</h3>
            <p className="nota">
              Instituciones habilitadas en el REPS de MinSalud. Llama antes de ir. <a href="#lugares">Verlas en el mapa</a>
            </p>
            {lugaresVigentes.length === 0 && <p className="vacio">No hay lugares con verificación vigente.</p>}
            <div className="lista-tarjetas">
              {lugaresVigentes.map((l) => <TarjetaLugar key={l.id} lugar={l} />)}
            </div>
          </>
        )}

        {ahora.length > 0 && (
          <>
            <h3 className="subtitulo">Para hablar ahora</h3>
            <p className="nota">Atienden las 24 horas, todos los días.</p>
            <div className="lista-tarjetas">
              {ahora.map((e) => <TarjetaServicio key={e.servicio.id} rec={e} />)}
            </div>
          </>
        )}

        {otras.length > 0 && (
          <>
            <h3 className="subtitulo">Otras rutas</h3>
            <div className="lista-tarjetas">
              {otras.map((e) => <TarjetaServicio key={e.servicio.id} rec={e} />)}
            </div>
          </>
        )}

        {filtro === 'todos' && lugaresVigentes.length > 0 && (
          <>
            <h3 className="subtitulo">Atención presencial</h3>
            <p className="nota">{lugaresVigentes.length} lugares de atención en salud mental en Villavicencio, habilitados por MinSalud.</p>
            <div className="acciones-final">
              <button type="button" className="boton boton-secundario" onClick={() => setFiltro('presencial')}>Ver lugares</button>
              <a href="#lugares">Verlos en el mapa</a>
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
          <li><strong>¿Prefieres ir en persona?</strong> Usa el filtro "Presencial" o <a href="#lugares">mira los lugares en el mapa</a>.</li>
          <li><strong>Si es una emergencia,</strong> usa las líneas del panel "¿Es una emergencia?" o acude a urgencias.</li>
        </ul>
      </section>
    </>
  );
}
