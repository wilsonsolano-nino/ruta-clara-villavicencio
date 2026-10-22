const LEY_1581 = 'https://www.funcionpublica.gov.co/eva/gestornormativo/norma.php?i=49981';
const DECRETO_1377 = 'https://www.funcionpublica.gov.co/eva/gestornormativo/norma.php?i=53646';
const LEY_1616 = 'https://www.funcionpublica.gov.co/eva/gestornormativo/norma.php?i=51292';

// Cada fila: qué dice la norma y cómo lo cumple Ruta Clara. Textos verificados en Función Pública el 21 oct 2026.
const MARCO: { norma: string; dice: string; aqui: string }[] = [
  {
    norma: 'Ley 1581 de 2012, art. 3',
    dice: 'Dato personal es cualquier información vinculada o que pueda asociarse a una persona determinada o determinable.',
    aqui: 'Ruta Clara no te pide nombre, edad, documento, teléfono, correo ni ubicación.',
  },
  {
    norma: 'Ley 1581 de 2012, art. 4',
    dice: 'Principios de finalidad, libertad, seguridad, confidencialidad y acceso y circulación restringida.',
    aqui: 'No hay datos tuyos que tratar: nada de lo que haces se guarda ni se comparte.',
  },
  {
    norma: 'Ley 1581 de 2012, art. 9, y Decreto 1377 de 2013, art. 7',
    dice: 'Se requiere la autorización previa e informada del titular. El silencio no puede tomarse como autorización.',
    aqui: 'Antes de cargar Google Maps te explicamos qué recibe Google, y el mapa solo aparece cuando tocas "Mostrar el mapa" o "Ver en el mapa".',
  },
  {
    norma: 'Ley 1581 de 2012, arts. 5 y 6',
    dice: 'Los datos relativos a la salud son datos sensibles y su tratamiento está prohibido salvo excepciones.',
    aqui: 'El orientador pregunta qué buscas y cómo prefieres comunicarte, nunca por síntomas ni por tu salud.',
  },
  {
    norma: 'Decreto 1377 de 2013, art. 6',
    dice: 'Ninguna actividad podrá condicionarse a que el titular suministre datos personales sensibles.',
    aqui: 'Todas las funciones se usan sin entregar ningún dato.',
  },
  {
    norma: 'Ley 1581 de 2012, art. 7, y Decreto 1377 de 2013, art. 12',
    dice: 'Se asegura el respeto a los derechos prevalentes de niños, niñas y adolescentes, y el tratamiento de sus datos está prohibido salvo los de naturaleza pública.',
    aqui: 'Como no recogemos datos, un adolescente puede usar la app sin exponer información suya.',
  },
  {
    norma: 'Ley 1581 de 2012, arts. 8 y 12',
    dice: 'Derecho a conocer, actualizar, rectificar y suprimir los datos, y deber del responsable de informar con claridad.',
    aqui: 'Esta página te informa qué se usa y para qué. Como no guardamos datos tuyos, no hay nada que consultar, corregir ni suprimir.',
  },
  {
    norma: 'Ley 1616 de 2013, art. 6, núm. 15',
    dice: 'Derecho a la confidencialidad de la información relacionada con el proceso de atención en salud mental.',
    aqui: 'Ruta Clara no es un servicio de atención y no conoce tu situación. Los servicios a los que te remitimos tienen este deber.',
  },
];

/** Política de tratamiento de datos en lenguaje claro (Decreto 1377 de 2013, art. 13). */
export function Privacidad() {
  return (
    <section aria-labelledby="priv-titulo">
      <div className="intro">
        <h2 id="priv-titulo">Política de tratamiento de datos</h2>
        <p>En resumen: Ruta Clara no te pide datos personales, no guarda nada de lo que haces y no usa cookies, formularios, analítica ni publicidad.</p>
      </div>

      <h3 className="subtitulo">Qué se usa y para qué</h3>
      <ul className="lista-numerada">
        <li><strong>Tus respuestas al orientador:</strong> no se guardan. Viven solo mientras la página está abierta y se borran al cerrar o reiniciar.</li>
        <li><strong>El mapa de lugares:</strong> lo muestra Google Maps y solo se carga cuando tocas "Mostrar el mapa" o "Ver en el mapa". Google recibe tu dirección IP y el lugar que estás viendo. Ruta Clara no pide ni usa tu ubicación. "Cómo llegar" abre Google Maps, donde aplica la política de Google.</li>
        <li><strong>El modo oscuro:</strong> si lo activas, el navegador recuerda esa preferencia en este dispositivo.</li>
        <li><strong>Al cargar la página:</strong> tu navegador descarga las tipografías desde Google Fonts. Como en cualquier sitio web, ese servidor recibe datos técnicos de la conexión, como la dirección IP.</li>
        <li><strong>Al tocar un teléfono, WhatsApp o enlace oficial:</strong> sales de Ruta Clara. Desde ese momento aplica la política de tratamiento de datos de esa entidad o servicio.</li>
      </ul>

      <h3 className="subtitulo">Marco legal y cómo lo cumplimos</h3>
      <div className="tabla-scroll">
        <table className="tabla">
          <thead>
            <tr><th scope="col">Norma</th><th scope="col">Qué dice</th><th scope="col">En Ruta Clara</th></tr>
          </thead>
          <tbody>
            {MARCO.map((m) => (
              <tr key={m.norma}><th scope="row">{m.norma}</th><td>{m.dice}</td><td>{m.aqui}</td></tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3 className="subtitulo">Tus derechos</h3>
      <p className="nota">
        La Ley 1581 de 2012 (art. 8) te da derecho a conocer, actualizar, rectificar y suprimir tus datos, y a presentar quejas ante la{' '}
        <a href="https://www.sic.gov.co" target="_blank" rel="noreferrer">Superintendencia de Industria y Comercio</a>. Ruta Clara no guarda datos tuyos en
        ningún servidor ni en tu dispositivo. Si activaste el modo oscuro y quieres que el navegador lo olvide, borra los datos de este sitio desde la
        configuración del navegador.
      </p>

      <h3 className="subtitulo">Responsable y vigencia</h3>
      <ul className="lista-numerada">
        <li><strong>Responsable en el prototipo:</strong> el equipo Ruta Clara Villavicencio, participante de la Hackathon Villavicencio 2026, reto Mente Sana Joven. El prototipo no recoge datos personales en ningún servidor.</li>
        <li><strong>En operación:</strong> la entidad que opere Ruta Clara (por ejemplo, la Alcaldía de Villavicencio) será la responsable y publicará aquí su domicilio, correo, teléfono y el área que atiende peticiones, consultas y reclamos, como exige el Decreto 1377 de 2013 (art. 13).</li>
        <li><strong>Vigencia:</strong> esta política rige desde el 21 oct 2026. Si cambia, lo informaremos en esta página antes de aplicar el cambio.</li>
      </ul>

      <p className="aviso-legal">
        Normas consultadas en el Gestor Normativo de Función Pública el 21 oct 2026:{' '}
        <a href={LEY_1581} target="_blank" rel="noreferrer">Ley 1581 de 2012</a> ·{' '}
        <a href={DECRETO_1377} target="_blank" rel="noreferrer">Decreto 1377 de 2013</a> ·{' '}
        <a href={LEY_1616} target="_blank" rel="noreferrer">Ley 1616 de 2013</a>.
      </p>
    </section>
  );
}
