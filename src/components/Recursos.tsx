import { useState } from 'react';
import type { Recurso } from '../logic/tipos';
import { formatearFecha } from '../logic/formato';

interface Props {
  recursos: Recurso[];
}

/** Guías informativas generales: se elige un tema y la guía se lee en párrafos, con sus fuentes y fecha de consulta. */
export function Recursos({ recursos }: Props) {
  const [activo, setActivo] = useState(recursos[0]?.id);
  const r = recursos.find((x) => x.id === activo) ?? recursos[0];

  return (
    <section aria-labelledby="rec-titulo">
      <div className="intro">
        <h2 id="rec-titulo">Recursos para cuidarte</h2>
        <p>Guías cortas para el día a día. Son información general: no diagnostican ni reemplazan a un profesional.</p>
      </div>

      <div className="temas" role="group" aria-label="Elige un tema">
        {recursos.map((x) => (
          <button key={x.id} type="button" className="tema-guia" aria-pressed={x.id === r.id} aria-controls="guia" onClick={() => setActivo(x.id)}>
            <span className="tema-guia-etiqueta">{x.tema}</span>
            <span className="tema-guia-titulo">{x.titulo}</span>
          </button>
        ))}
      </div>

      <article id="guia" className="guia" key={r.id} aria-labelledby="guia-titulo">
        <p className="recurso-tema">{r.tema}</p>
        <h3 id="guia-titulo">{r.titulo}</h3>
        <p className="guia-entrada">{r.resumen}</p>

        <div className="guia-pautas">
          {r.pautas.map((p) => (
            <p key={p.idea}><strong>{p.idea}</strong> {p.texto}</p>
          ))}
        </div>

        <aside className="guia-apoyo" aria-label="Cuándo buscar apoyo">
          <h4>Cuándo buscar apoyo</h4>
          <p>{r.cuandoBuscarApoyo}</p>
          <div className="acciones-final">
            <a className="boton" href="#orientar">Encontrar con quién hablar</a>
            <a className="boton boton-secundario" href="#emergencia">Es una emergencia</a>
          </div>
        </aside>

        <p className="verificacion">
          Consultado el {formatearFecha(r.fechaConsulta)}. Fuente{r.fuentes.length > 1 ? 's' : ''}:{' '}
          {r.fuentes.map((f, i) => (
            <span key={f.url}>
              {i > 0 && ' · '}
              <a href={f.url} target="_blank" rel="noreferrer">{f.nombre}</a>
            </span>
          ))}
          .
        </p>
      </article>
    </section>
  );
}
