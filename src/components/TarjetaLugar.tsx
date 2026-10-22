import type { ReactNode } from 'react';
import type { Lugar, OrigenUbicacion } from '../logic/tipos';
import { formatearFecha } from '../logic/formato';
import { IconoCanal } from './Iconos';

interface Props {
  lugar: Lugar;
  destacado?: boolean;
  /** Acción extra junto a "Llamar" y "Cómo llegar" (p. ej. "Ver en el mapa"). */
  accion?: ReactNode;
}

const ORIGEN_TEXTO: Record<OrigenUbicacion, string> = {
  sitio_oficial: 'Punto tomado del mapa del sitio oficial.',
  direccion: 'Punto ubicado por la dirección del REPS (precisión de una cuadra).',
  directorio: 'Punto tomado de un directorio público; confírmalo al llamar.',
};

/** Coordenadas si las hay; si no, la dirección, para que Google Maps la busque. */
export const destinoLugar = (l: Lugar) => (l.coordenadas ? `${l.coordenadas.lat},${l.coordenadas.lng}` : `${l.direccion}, Villavicencio, Meta`);

/** Sede de atención presencial con su verificación (fuente REPS, fecha y origen del punto en el mapa). */
export function TarjetaLugar({ lugar: l, destacado, accion }: Props) {
  return (
    <article className={`servicio${destacado ? ' destacado' : ''}`} aria-labelledby={`l-${l.id}`}>
      <h3 id={`l-${l.id}`}>{l.nombre}</h3>
      <p className="servicio-desc">{l.descripcion}</p>
      <p className="servicio-datos">{l.direccion}. Institución {l.naturaleza.toLowerCase()}.</p>
      <div className="acciones">
        {l.telefono && (
          <a className="boton boton-llamada" href={`tel:${l.telefono.replace(/\D/g, '')}`}>
            <IconoCanal tipo="llamada" /> Llamar al {l.telefono}
          </a>
        )}
        {accion}
        <a className="boton boton-secundario" href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(destinoLugar(l))}`} target="_blank" rel="noreferrer">
          Cómo llegar
        </a>
      </div>
      <p className="verificacion">
        <strong>Verificado</strong> el {formatearFecha(l.fechaVerificacion)}. Código de habilitación {l.codigoHabilitacion}. Fuente:{' '}
        {l.fuente && <a href={l.fuente.url} target="_blank" rel="noreferrer">{l.fuente.nombre}</a>}.{' '}
        {l.origenUbicacion ? ORIGEN_TEXTO[l.origenUbicacion] : 'Zona rural sin punto exacto en el mapa: pide indicaciones al llamar.'}
      </p>
    </article>
  );
}
