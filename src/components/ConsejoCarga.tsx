import { CONSEJO_CARGA } from '../logic/consejoCarga';

export function ConsejoCarga() {
  return (
    <div className="mapa-cargando">
      <p className="mapa-cargando-titulo">Estamos preparando el mapa</p>
      <p>{CONSEJO_CARGA.texto}</p>
      <p className="mapa-cargando-cita">"{CONSEJO_CARGA.cita}"</p>
      <p className="mapa-cargando-fuente">
        Fuente: <a href={CONSEJO_CARGA.urlFuente} target="_blank" rel="noreferrer">{CONSEJO_CARGA.fuente}</a>. Consultada el {CONSEJO_CARGA.fechaFuente}.
      </p>
    </div>
  );
}
