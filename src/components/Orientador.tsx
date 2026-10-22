import { useEffect, useRef, useState } from 'react';
import {
  necesitaCanal,
  orientar,
  PREGUNTA_CANAL,
  PREGUNTA_PROPOSITO,
  type PreferenciaCanal,
  type Proposito,
} from '../logic/orientador';
import type { Recurso, Servicio } from '../logic/tipos';
import { TarjetaServicio } from './TarjetaServicio';

interface Props {
  servicios: Servicio[];
  hoy: string;
  /** Guías de Recursos: el resultado "me preocupa alguien" muestra la de acompañar. */
  recursos: Recurso[];
  /** 'emergencia' abre directamente el resultado de emergencia (ruta #emergencia). */
  propositoInicial: Proposito | null;
}

// La emergencia no va en el cuestionario: tiene acceso directo y permanente en la franja de emergencia.
const OPCIONES_PROPOSITO = PREGUNTA_PROPOSITO.opciones.filter((o) => o.valor !== 'emergencia');

export function Orientador({ servicios, hoy, recursos, propositoInicial }: Props) {
  const [proposito, setProposito] = useState<Proposito | null>(propositoInicial);
  const [canal, setCanal] = useState<PreferenciaCanal | null>(null);
  const resultadoRef = useRef<HTMLHeadingElement>(null);
  const preguntaRef = useRef<HTMLHeadingElement>(null);

  const listo = proposito !== null && (!necesitaCanal({ proposito }) || canal !== null);
  const resultado = listo ? orientar({ proposito: proposito!, canal: canal ?? undefined }, servicios, hoy) : null;
  const guia = resultado?.guia ? recursos.find((r) => r.id === resultado.guia) : undefined;
  const paso = proposito === null ? 1 : listo ? 3 : 2;
  // Si se llega por #emergencia, el foco va directo al resultado.
  const pasoPrevio = useRef(propositoInicial ? 0 : paso);

  // Mueve el foco al nuevo contenido para lectores de pantalla y teclado (no en la carga inicial).
  useEffect(() => {
    if (pasoPrevio.current === paso) return;
    pasoPrevio.current = paso;
    (paso === 3 ? resultadoRef : preguntaRef).current?.focus();
  }, [paso]);

  const reiniciar = () => {
    if (window.location.hash === '#emergencia') {
      window.location.hash = 'orientar';
      return;
    }
    setProposito(null);
    setCanal(null);
  };

  return (
    <>
      <section aria-labelledby="orientador-titulo">
        <div className="intro">
          <h2 id="orientador-titulo">¿Con quién puedo hablar?</h2>
          <p>Orientación y apoyo emocional a tu alcance. Responde dos preguntas y te mostramos el canal oficial que puede orientarte, sin registro y sin preguntas sobre tu salud.</p>
        </div>

        {paso === 1 && (
          <fieldset className="pregunta">
            <legend>
              <p className="paso">Pregunta 1 de 2</p>
              <h3 ref={preguntaRef} tabIndex={-1}>{PREGUNTA_PROPOSITO.texto}</h3>
            </legend>
            <div className="opciones">
              {OPCIONES_PROPOSITO.map((o) => (
                // "Ir en persona" abre directamente el mapa: no hay nada más que preguntar.
                <button key={o.valor} type="button" className="opcion" onClick={() => (o.valor === 'en_persona' ? (window.location.hash = 'lugares') : setProposito(o.valor))}>
                  <span className="opcion-texto">{o.texto}</span>
                  {o.ayuda && <span className="opcion-ayuda">{o.ayuda}</span>}
                </button>
              ))}
            </div>
          </fieldset>
        )}

        {paso === 2 && (
          <fieldset className="pregunta">
            <legend>
              <p className="paso">Pregunta 2 de 2</p>
              <h3 ref={preguntaRef} tabIndex={-1}>{PREGUNTA_CANAL.texto}</h3>
            </legend>
            <div className="opciones">
              {PREGUNTA_CANAL.opciones.map((o) => (
                <button key={o.valor} type="button" className="opcion" onClick={() => setCanal(o.valor)}>
                  <span className="opcion-texto">{o.texto}</span>
                  {o.ayuda && <span className="opcion-ayuda">{o.ayuda}</span>}
                </button>
              ))}
            </div>
            <button type="button" className="enlace-boton" onClick={reiniciar}>Volver a la pregunta anterior</button>
          </fieldset>
        )}

        {paso === 3 && resultado && (
          <div className={`resultado${proposito === 'emergencia' ? ' resultado-emergencia' : ''}`}>
            <h3 ref={resultadoRef} tabIndex={-1}>{resultado.titulo}</h3>
            <p className="resultado-mensaje">{resultado.mensaje}</p>

            {guia && (
              <div className="guia-apoyo guia-en-resultado">
                <h4>{guia.titulo}</h4>
                <div className="guia-pautas">
                  {guia.pautas.map((p) => (
                    <p key={p.idea}><strong>{p.idea}</strong> {p.texto}</p>
                  ))}
                </div>
                <p className="verificacion">Basado en: {guia.fuentes.map((f) => f.nombre).join(' · ')}. <a href="#recursos">Ver más recursos</a></p>
              </div>
            )}

            <div className="lista-tarjetas">
              {resultado.recomendaciones.map((r, i) => (
                <TarjetaServicio key={r.servicio.id} rec={r} destacada={i === 0} />
              ))}
            </div>

            <details className="por-que">
              <summary>¿Por qué te mostramos esto?</summary>
              <p>{resultado.porQue}</p>
              <p>Esta herramienta no evalúa tu situación ni reemplaza a un profesional. Solo te conecta con servicios humanos oficiales.</p>
            </details>

            <div className="acciones-final">
              <button type="button" className="boton boton-secundario" onClick={reiniciar}>Empezar de nuevo</button>
              {resultado.irADirectorio && <a href="#directorio">Ver directorio completo</a>}
              {resultado.irALugares && <a href="#lugares">Ver lugares en el mapa</a>}
            </div>
          </div>
        )}
      </section>

      <section className="contexto" aria-labelledby="contexto-titulo">
        <h3 id="contexto-titulo">Antes de empezar</h3>
        <ul>
          <li><strong>Sin datos personales.</strong> No te pedimos tu nombre ni datos de salud, y no guardamos tus respuestas.</li>
          <li><strong>Fuente y fecha.</strong> Cada teléfono muestra su fuente oficial y la fecha en que se verificó.</li>
          <li><strong>Personas reales.</strong> Del otro lado responden personas de servicios oficiales.</li>
        </ul>
      </section>
    </>
  );
}
