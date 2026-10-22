import { useEffect, useState } from 'react';
import datos from './data/servicios.json';
import datosRecursos from './data/recursos.json';
import datosLugares from './data/lugares.json';
import type { Lugar, Recurso, Servicio } from './logic/tipos';
import { evaluarVigencia, hoyISO } from './logic/vigencia';
import { formatearFecha } from './logic/formato';
import { Orientador } from './components/Orientador';
import { Directorio } from './components/Directorio';
import { ComoFunciona } from './components/ComoFunciona';
import { Recursos } from './components/Recursos';
import { Privacidad } from './components/Privacidad';
import { Lugares } from './components/Lugares';
import { BarraApoyo } from './components/BarraApoyo';

const SERVICIOS = datos.servicios as Servicio[];
const RECURSOS = datosRecursos.recursos as Recurso[];
const LUGARES = datosLugares.lugares as Lugar[];
// '#emergencia' es el orientador abierto directamente en el resultado de emergencia.
// '#lugares' es el mapa de atención presencial; vive bajo la pestaña Directorio.
const VISTAS = ['orientar', 'emergencia', 'directorio', 'lugares', 'recursos', 'como', 'privacidad'] as const;
type Vista = (typeof VISTAS)[number];

const TABS: { id: Vista; texto: string }[] = [
  { id: 'orientar', texto: 'Orientarme' },
  { id: 'directorio', texto: 'Directorio' },
  { id: 'recursos', texto: 'Recursos' },
  { id: 'como', texto: 'Cómo funciona' },
];

// Cada vista tiene su propia URL (#directorio, ...) para que el botón "atrás" del celular funcione.
function vistaDesdeHash(): Vista {
  const h = window.location.hash.slice(1);
  return (VISTAS as readonly string[]).includes(h) ? (h as Vista) : 'orientar';
}

export default function App() {
  const [vista, setVista] = useState<Vista>(vistaDesdeHash);
  const hoy = hoyISO();
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

  // Ruta Clara no guarda reportes: borra los que hubieran quedado de versiones anteriores del prototipo.
  useEffect(() => {
    try {
      localStorage.removeItem('rutaclara.reportes.v1');
    } catch {
      /* sin almacenamiento: no hay nada que borrar */
    }
  }, []);

  const tabActual = vista === 'emergencia' ? 'orientar' : vista === 'lugares' ? 'directorio' : vista;
  // Fecha real de la verificación más reciente entre los datos que hoy se muestran.
  const ultimaVerificacion = SERVICIOS.filter((s) => evaluarVigencia(s, hoy).mostrable)
    .map((s) => s.fechaVerificacion!)
    .sort()
    .pop();

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

      <div className="marco">
        <main id="principal" className="principal" tabIndex={-1}>
          <div className="vista" key={vista}>
            {(vista === 'orientar' || vista === 'emergencia') && (
              <Orientador
                key={vista}
                servicios={SERVICIOS}
                hoy={hoy}
                recursos={RECURSOS}
                propositoInicial={vista === 'emergencia' ? 'emergencia' : null}
              />
            )}
            {vista === 'directorio' && <Directorio servicios={SERVICIOS} lugares={LUGARES} hoy={hoy} />}
            {vista === 'lugares' && <Lugares lugares={LUGARES} hoy={hoy} />}
            {vista === 'recursos' && <Recursos recursos={RECURSOS} />}
            {vista === 'como' && <ComoFunciona />}
            {vista === 'privacidad' && <Privacidad />}
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
          <p className="pie-proposito">
            Ruta Clara Villavicencio te orienta hacia canales oficiales. <strong>No es un servicio de salud.</strong>
          </p>
          <div className="pie-privacidad">
            <a href="#privacidad">Política de tratamiento de datos</a>
            <p>No pedimos datos personales ni guardamos nada de lo que haces. El mapa de Google solo se carga si lo pides. Ley 1581 de 2012.</p>
          </div>
          <p className="pie-legal">Hackathon Villavicencio 2026 · Reto Mente Sana Joven<br />Equipo DevSystems: Wilson Solano, Alejandro Diaz y Carlos Arciniegas</p>
        </div>
      </footer>

    </>
  );
}
