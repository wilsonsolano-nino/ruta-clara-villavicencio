import { useState } from 'react';
import type { Lugar } from '../logic/tipos';
import { evaluarVigencia } from '../logic/vigencia';
import { destinoLugar, TarjetaLugar } from './TarjetaLugar';

interface Props {
  lugares: Lugar[];
  hoy: string;
}

/** Instituciones con servicios de salud mental en Villavicencio. El mapa de Google solo se carga cuando la persona lo pide. */
export function Lugares({ lugares, hoy }: Props) {
  const [mapaAceptado, setMapaAceptado] = useState(false);
  const [elegido, setElegido] = useState<string | null>(null);

  const vigentes = lugares.filter((l) => evaluarVigencia(l, hoy).mostrable);
  const enMapa = vigentes.find((l) => l.id === elegido) ?? vigentes.find((l) => l.coordenadas);

  const verEnMapa = (id: string) => {
    setMapaAceptado(true);
    setElegido(id);
    document.getElementById('mapa')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section aria-labelledby="lug-titulo">
      <div className="intro">
        <h2 id="lug-titulo">Lugares de atención en salud mental</h2>
        <p>Instituciones de Villavicencio habilitadas en el registro oficial de prestadores (REPS) de MinSalud. Llama antes de ir para confirmar horario y si atienden tu caso.</p>
      </div>

      <div id="mapa">
        {mapaAceptado && enMapa ? (
          <figure className="mapa">
            <iframe
              key={enMapa.id}
              title={`Mapa: ${enMapa.nombre}`}
              src={`https://maps.google.com/maps?q=${encodeURIComponent(destinoLugar(enMapa))}&z=16&hl=es&output=embed`}
              loading="lazy"
              referrerPolicy="no-referrer"
            />
            <figcaption>{enMapa.nombre}. {enMapa.direccion}.</figcaption>
          </figure>
        ) : (
          <div className="permiso" role="region" aria-labelledby="permiso-titulo">
            <h3 id="permiso-titulo">Mapa de Google</h3>
            <p>El mapa lo muestra Google Maps y solo se carga si lo pides. Al cargarlo, Google recibe tu dirección IP y el lugar que estás viendo. Ruta Clara no le envía tu ubicación ni otros datos.</p>
            <div className="acciones-final">
              <button type="button" className="boton" onClick={() => setMapaAceptado(true)}>Mostrar el mapa</button>
            </div>
          </div>
        )}
      </div>

      <div className="lista-tarjetas">
        {vigentes.map((l) => (
          <TarjetaLugar
            key={l.id}
            lugar={l}
            destacado={mapaAceptado && enMapa?.id === l.id}
            accion={
              l.coordenadas && !(mapaAceptado && enMapa?.id === l.id) ? (
                <button type="button" className="boton boton-secundario" onClick={() => verEnMapa(l.id)}>Ver en el mapa</button>
              ) : null
            }
          />
        ))}
      </div>

      <section className="contexto" aria-labelledby="lug-leer">
        <h3 id="lug-leer">Ten en cuenta</h3>
        <ul>
          <li><strong>Habilitada</strong> significa que la sede está inscrita en el REPS; no garantiza que haya cupo o atención inmediata.</li>
          <li><strong>Para atención en salud,</strong> tu EPS te indica a cuál de estas instituciones puedes ir.</li>
          <li><strong>Si es una emergencia,</strong> usa las líneas del panel "¿Es una emergencia?" o acude a urgencias.</li>
        </ul>
      </section>
    </section>
  );
}
