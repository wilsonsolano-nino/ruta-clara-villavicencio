export function ComoFunciona() {
  return (
    <section aria-labelledby="cf-titulo" className="columna">
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
            <li>Permite reportar un número o enlace que no funciona, sin datos personales.</li>
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
        <li><strong>Reportes:</strong> quien encuentre un dato caído lo reporta; el dato se marca “en revisión” hasta que el equipo verificador lo confirme.</li>
      </ol>

      <p className="aviso-legal">
        Prototipo académico (TRL 4) para la Hackathon Villavicencio 2026, reto Mente Sana Joven. Probado solo con datos sintéticos y escenarios
        ficticios. No es un servicio de salud.
      </p>
    </section>
  );
}
