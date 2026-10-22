import type { Recomendacion } from '../logic/orientador';
import { formatearFecha, hrefCanal } from '../logic/formato';
import type { TipoCanal } from '../logic/tipos';
import { IconoCanal } from './Iconos';

interface Props {
  rec: Pick<Recomendacion, 'servicio' | 'vigencia'> & { canalesSugeridos?: TipoCanal[] };
  destacada?: boolean;
}

const COBERTURA = { villavicencio: 'Villavicencio', meta: 'el Meta', nacional: 'todo el país' } as const;

const NOTA_ESTADO: Partial<Record<Recomendacion['vigencia']['estado'], string>> = {
  por_vencer: ' Pronto debe verificarse de nuevo.',
};

function hace(dias: number | null): string {
  if (dias === null) return '';
  if (dias === 0) return ' (hoy)';
  return ` (hace ${dias} día${dias === 1 ? '' : 's'})`;
}

/** Entrada de un servicio con contacto vigente. Los no mostrables se listan aparte, sin contacto (ver Directorio). */
export function TarjetaServicio({ rec, destacada }: Props) {
  const { servicio: s, vigencia: v } = rec;
  const canales = rec.canalesSugeridos ? s.canales.filter((c) => rec.canalesSugeridos!.includes(c.tipo)) : s.canales;

  return (
    <article className={`servicio${destacada ? ' destacado' : ''}`} aria-labelledby={`t-${s.id}`}>
      <h3 id={`t-${s.id}`}>{s.nombre}</h3>
      <p className="servicio-desc">{s.descripcion}</p>
      <p className="servicio-datos">
        {s.horario}. {s.costo}. Atiende {COBERTURA[s.ambito]}.
      </p>

      {v.mostrable && (
        <div className="acciones">
          {canales.map((c) => {
            const href = hrefCanal(c);
            if (!href) return <span key={c.valor || c.tipo}>{c.valor || c.etiqueta}</span>;
            return (
              <a key={c.valor} className={`boton boton-${c.tipo}`} href={href} target={c.tipo === 'llamada' ? undefined : '_blank'} rel="noreferrer">
                <IconoCanal tipo={c.tipo} /> {c.etiqueta}
              </a>
            );
          })}
        </div>
      )}

      <div className="servicio-pie">
        {/* Verificación: estado + fecha + fuente, siempre juntos (regla "fuente y fecha" del reto). */}
        <p className={`verificacion verificacion-${v.estado}`}>
          <strong>Verificado</strong> el {formatearFecha(s.fechaVerificacion)}{hace(v.diasDesdeVerificacion)}.{NOTA_ESTADO[v.estado]}{' '}
          Fuente: {s.fuente ? (s.fuente.url ? <a href={s.fuente.url} target="_blank" rel="noreferrer">{s.fuente.nombre}</a> : s.fuente.nombre) : 'pendiente de registrar'}.
        </p>
      </div>
    </article>
  );
}
