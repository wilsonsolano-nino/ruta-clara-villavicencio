const PREGUNTAS: { pregunta: string; respuesta: string }[] = [
  {
    pregunta: '¿Tengo que registrarme o contar mi situación?',
    respuesta: 'No. No hay registro y nunca te pedimos nombre, edad ni datos de salud. Solo te preguntamos qué buscas y cómo prefieres comunicarte.',
  },
  {
    pregunta: '¿Ruta Clara me dice qué tengo?',
    respuesta: 'No. No diagnostica, no evalúa riesgo y no recomienda tratamientos. Te indica qué canal oficial puede orientarte; quien te atiende allí es una persona del servicio.',
  },
  {
    pregunta: '¿Qué hago si es una emergencia?',
    respuesta: 'Usa el botón de Emergencia: muestra primero las líneas verificadas para emergencias y las que atienden las 24 horas. Si hay peligro inmediato para tu vida o la de alguien, acude también al servicio de urgencias más cercano.',
  },
  {
    pregunta: '¿Por qué algunos teléfonos no aparecen?',
    respuesta: 'Porque solo mostramos datos con fuente oficial y verificados en los últimos 30 días. Un número sin fuente o vencido queda "por verificar" y su contacto se oculta, para no enviarte a una línea que ya no funciona.',
  },
  {
    pregunta: '¿Por qué el mapa no aparece de una vez?',
    respuesta: 'Porque lo muestra Google Maps, y al cargarlo Google recibe tu dirección IP. Por eso solo se carga cuando tú lo pides. Ruta Clara no pide ni usa tu ubicación.',
  },
  {
    pregunta: '¿Qué datos guarda Ruta Clara?',
    respuesta: 'Ninguno. No hay registro, formularios ni reportes. Lo único que el navegador recuerda es el modo oscuro, si lo activas. El detalle está en la política de tratamiento de datos, enlazada al pie de la página.',
  },
];

export function ComoFunciona() {
  return (
    <section aria-labelledby="cf-titulo">
      <div className="intro">
        <h2 id="cf-titulo">Qué es y qué no es Ruta Clara Villavicencio</h2>
      </div>

      <div className="dos-columnas">
        <div className="caja caja-si">
          <h3>Lo que hace</h3>
          <ul>
            <li>Te indica qué canal oficial puede orientar tu consulta, según lo que buscas y cómo prefieres comunicarte.</li>
            <li>Muestra cada teléfono o ruta con su fuente oficial y la fecha en que se consultó.</li>
            <li>Oculta automáticamente los datos con más de 30 días sin verificar.</li>
            <li>Muestra en un mapa las instituciones de salud mental de Villavicencio habilitadas por MinSalud.</li>
          </ul>
        </div>
        <div className="caja caja-no">
          <h3>Lo que no hace</h3>
          <ul>
            <li>No diagnostica, no evalúa riesgo y no recomienda tratamientos.</li>
            <li>No es un chat con profesionales ni reemplaza a un servicio de salud.</li>
            <li>No pide tu nombre, edad ni información sobre tu salud.</li>
            <li>No guarda tus respuestas: se borran al cerrar o reiniciar.</li>
          </ul>
        </div>
      </div>

      <h3 className="subtitulo">Cómo mantenemos la información al día</h3>
      <ol className="lista-numerada">
        <li><strong>Fuente oficial:</strong> solo se cargan datos de entidades públicas (MinSalud, Alcaldía, Secretaría de Salud).</li>
        <li><strong>Fecha de consulta:</strong> cada dato guarda cuándo y quién lo verificó.</li>
        <li><strong>Vencimiento:</strong> a los 24 días se marca “por renovar”; a los 31 días se oculta el contacto.</li>
      </ol>

      <h3 className="subtitulo">Preguntas frecuentes</h3>
      <div className="preguntas">
        {PREGUNTAS.map((p) => (
          <details key={p.pregunta}>
            <summary>{p.pregunta}</summary>
            <p>{p.respuesta}</p>
          </details>
        ))}
      </div>

      <p className="aviso-legal">
        Prototipo académico (TRL 4) para la Hackathon Villavicencio 2026, reto Mente Sana Joven. Probado solo con datos sintéticos y escenarios
        ficticios. No es un servicio de salud.
      </p>
    </section>
  );
}
