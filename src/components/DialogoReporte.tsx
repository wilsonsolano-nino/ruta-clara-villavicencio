import { useEffect, useRef, useState } from 'react';
import { MAX_COMENTARIO, MOTIVOS, validarComentario } from '../logic/reportes';
import type { MotivoReporte } from '../logic/tipos';

interface Props {
  nombreServicio: string;
  onEnviar: (motivo: MotivoReporte, comentario: string) => void;
  onCerrar: () => void;
}

export function DialogoReporte({ nombreServicio, onEnviar, onCerrar }: Props) {
  const ref = useRef<HTMLDialogElement>(null);
  const [motivo, setMotivo] = useState<MotivoReporte>('no_contesta');
  const [comentario, setComentario] = useState('');
  const validacion = validarComentario(comentario);

  useEffect(() => {
    const d = ref.current;
    if (d && !d.open) d.showModal?.();
    return () => d?.close?.();
  }, []);

  return (
    <dialog ref={ref} className="dialogo" aria-labelledby="dlg-titulo" onCancel={onCerrar}>
      <form
        method="dialog"
        onSubmit={(e) => {
          e.preventDefault();
          if (validacion.ok) onEnviar(motivo, comentario);
        }}
      >
        <h2 id="dlg-titulo">Reportar un dato</h2>
        <p className="nota">{nombreServicio}</p>
        <fieldset>
          <legend>¿Qué problema encontraste?</legend>
          {MOTIVOS.map((m) => (
            <label key={m.valor} className="radio">
              <input type="radio" name="motivo" value={m.valor} checked={motivo === m.valor} onChange={() => setMotivo(m.valor)} />
              {m.texto}
            </label>
          ))}
        </fieldset>
        <label htmlFor="comentario">Detalle (opcional)</label>
        <textarea
          id="comentario"
          maxLength={MAX_COMENTARIO}
          rows={3}
          value={comentario}
          onChange={(e) => setComentario(e.target.value)}
          aria-describedby="comentario-ayuda comentario-error"
        />
        <p id="comentario-ayuda" className="nota">No escribas nombres, teléfonos, correos ni información sobre tu salud. {comentario.length}/{MAX_COMENTARIO}</p>
        {!validacion.ok && <p id="comentario-error" className="error" role="alert">{validacion.error}</p>}
        <div className="acciones-final">
          <button type="button" className="boton boton-secundario" onClick={onCerrar}>Cancelar</button>
          <button type="submit" className="boton" disabled={!validacion.ok}>Enviar reporte</button>
        </div>
      </form>
    </dialog>
  );
}
