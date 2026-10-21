import { useEffect, useMemo, useState } from 'react';
import datos from './data/servicios.json';
import type { MotivoReporte, Reporte, Servicio } from './logic/tipos';
import { evaluarVigencia, hoyISO } from './logic/vigencia';
import { formatearFecha } from './logic/formato';
import { cargarReportes, contarAbiertos, crearReporte, guardarReportes } from './logic/reportes';
import { Orientador } from './components/Orientador';
import { Directorio } from './components/Directorio';
import { ComoFunciona } from './components/ComoFunciona';
import { PanelVerificador } from './components/PanelVerificador';
import { BarraApoyo } from './components/BarraApoyo';
import { DialogoReporte } from './components/DialogoReporte';

const SERVICIOS = datos.servicios as Servicio[];
// '#emergencia' es el orientador abierto directamente en el resultado de emergencia.
const VISTAS = ['orientar', 'emergencia', 'directorio', 'como', 'verificador'] as const;
type Vista = (typeof VISTAS)[number];

const TABS: { id: Vista; texto: string }[] = [
  { id: 'orientar', texto: 'Orientarme' },
  { id: 'directorio', texto: 'Directorio' },
  { id: 'como', texto: 'Cómo funciona' },
];

// Cada vista tiene su propia URL (#directorio, ...) para que el botón "atrás" del celular funcione.
function vistaDesdeHash(): Vista {
  const h = window.location.hash.slice(1);
  return (VISTAS as readonly string[]).includes(h) ? (h as Vista) : 'orientar';
}

export default function App() {
  const [vista, setVista] = useState<Vista>(vistaDesdeHash);
  const [reportes, setReportes] = useState<Reporte[]>(() => cargarReportes());
  const [reportando, setReportando] = useState<string | null>(null);
  const [aviso, setAviso] = useState<string | null>(null);
  // Modo demo: permite simular la fecha para mostrar en el pitch cómo vencen los datos.
  const [fechaDemo, setFechaDemo] = useState<string>('');
  const hoy = fechaDemo || hoyISO();
  // El modo claro es la base; el oscuro es opcional y se recuerda en este navegador (ver index.html).
  const [tema, setTema] = useState<'claro' | 'oscuro'>(() => (document.documentElement.dataset.theme === 'dark' ? 'oscuro' : 'claro'));

  useEffect(() => {
    const raiz = document.documentElement;
    if (tema === 'oscuro') raiz.dataset.theme = 'dark';
    else delete raiz.dataset.theme;
    try {
      localStorage.setItem('rutaclara.tema', tema);
    } catch {
      /* sin almacenamiento: el tema dura solo esta visita */
    }
  }, [tema]);

  useEffect(() => {
    const alCambiar = () => {
      setVista(vistaDesdeHash());
      window.scrollTo(0, 0);
    };
    window.addEventListener('hashchange', alCambiar);
    return () => window.removeEventListener('hashchange', alCambiar);
  }, []);

  useEffect(() => guardarReportes(reportes), [reportes]);
  useEffect(() => {
    if (!aviso) return;
    const t = setTimeout(() => setAviso(null), 4000);
    return () => clearTimeout(t);
  }, [aviso]);

  const abiertos = useMemo(() => contarAbiertos(reportes), [reportes]);
  const servicioReportado = SERVICIOS.find((s) => s.id === reportando);
  const tabActual = vista === 'emergencia' ? 'orientar' : vista;
  // Fecha real de la verificación más reciente entre los datos que hoy se muestran.
  const ultimaVerificacion = SERVICIOS.filter((s) => evaluarVigencia(s, hoy).mostrable)
    .map((s) => s.fechaVerificacion!)
    .sort()
    .pop();

  const enviarReporte = (motivo: MotivoReporte, comentario: string) => {
    if (!reportando) return;
    setReportes((r) => [...r, crearReporte(reportando, motivo, comentario, hoy)]);
    setReportando(null);
    setAviso('Gracias. El dato quedó "en revisión" para el equipo verificador.');
  };

  return (
    <>
      <a className="saltar" href="#principal" onClick={(e) => { e.preventDefault(); document.getElementById('principal')?.focus(); }}>
        Saltar al contenido
      </a>
      <header className="cabecera">
        <div className="cabecera-fila">
          <a className="marca" href="#orientar">
            <h1 className="solo-lector">Ruta Clara Villavicencio</h1>
            <img className="logo-claro" src="./marca/ruta-clara.png" alt="Ruta Clara Villavicencio, inicio" width="653" height="168" />
            <img className="logo-oscuro" src="./marca/ruta-clara-oscuro.png" alt="Ruta Clara Villavicencio, inicio" width="652" height="168" />
          </a>
          <nav className="nav" aria-label="Secciones">
            {TABS.map((t) => (
              <a key={t.id} href={`#${t.id}`} aria-current={tabActual === t.id ? 'page' : undefined}>
                {t.texto}
              </a>
            ))}
          </nav>
          <button type="button" className="tema" aria-pressed={tema === 'oscuro'} onClick={() => setTema(tema === 'oscuro' ? 'claro' : 'oscuro')}>
            <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" fill="currentColor">
              <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
            </svg>
            <span className="tema-texto">Modo oscuro</span>
          </button>
        </div>
      </header>

      {fechaDemo && (
        <div className="fecha-simulada" role="status">
          <p>Modo demostración: fecha simulada {formatearFecha(fechaDemo)}. <a href="#verificador">Cambiar</a></p>
        </div>
      )}

      <div className="marco">
        <main id="principal" className="principal" tabIndex={-1}>
          <div className="vista" key={vista}>
            {(vista === 'orientar' || vista === 'emergencia') && (
              <Orientador
                key={vista}
                servicios={SERVICIOS}
                hoy={hoy}
                reportesAbiertos={abiertos}
                onReportar={setReportando}
                propositoInicial={vista === 'emergencia' ? 'emergencia' : null}
              />
            )}
            {vista === 'directorio' && (
              <Directorio servicios={SERVICIOS} hoy={hoy} reportesAbiertos={abiertos} onReportar={setReportando} />
            )}
            {vista === 'como' && <ComoFunciona />}
            {vista === 'verificador' && (
              <PanelVerificador
                servicios={SERVICIOS}
                hoy={hoy}
                reportes={reportes}
                reportesAbiertos={abiertos}
                fechaDemo={fechaDemo}
                onFechaDemo={setFechaDemo}
                onResolver={(id) => setReportes((r) => r.map((x) => (x.id === id ? { ...x, estado: 'resuelto' } : x)))}
                onBorrarReportes={() => setReportes([])}
              />
            )}
          </div>
        </main>
        <div className="lateral">
          <BarraApoyo servicios={SERVICIOS} hoy={hoy} />
          {vista !== 'directorio' && (
            <nav className="acceso" aria-label="Directorio">
              <p>¿Prefieres ver todos los canales oficiales?</p>
              <a href="#directorio">Consultar el directorio verificado</a>
              {ultimaVerificacion && <p className="acceso-fecha">Datos verificados por última vez el {formatearFecha(ultimaVerificacion)}.</p>}
            </nav>
          )}
        </div>
      </div>

      <footer className="pie-interior">
        <div className="pie">
          <span>Ruta Clara Villavicencio te orienta hacia canales oficiales. No es un servicio de salud. Prototipo TRL 4, Hackathon Villavicencio 2026, reto Mente Sana Joven.</span>
          <a href="#verificador">Panel del equipo verificador (demo)</a>
        </div>
      </footer>

      {aviso && <div className="toast" role="status">{aviso}</div>}
      {servicioReportado && (
        <DialogoReporte nombreServicio={servicioReportado.nombre} onEnviar={enviarReporte} onCerrar={() => setReportando(null)} />
      )}
    </>
  );
}
