# 6. Guion del pitch · 5 minutos

El kickoff pide cubrir: problema, usuario, solución, demo, evidencia, estado TRL y próximos pasos.

Esto es una base. Lo importante es que cada uno lo diga con sus palabras, no que lo recite.

| Tiempo | Bloque | Quién |
|---|---|---|
| 0:00–0:40 | Problema | Integrante 1 |
| 0:40–1:10 | Usuario | Integrante 1 |
| 1:10–1:50 | Solución | Integrante 2 |
| 1:50–3:20 | Demo en vivo | Integrante 2 |
| 3:20–4:10 | Evidencia y TRL 4 | Integrante 3 |
| 4:10–5:00 | Operación y próximos pasos | Integrante 3 |

---

### 0:00 · Problema (40 s)

> "Hasta septiembre de 2025 se notificaron más de 28.000 intentos de suicidio en Colombia, y más de la mitad fueron de jóvenes entre 15 y 29 años. Aquí en Villavicencio, Yo Te Escucho orientó a 441 personas en cuatro meses. O sea, los servicios existen. El problema es llegar a ellos: los números están por todos lados, no sabes si todavía funcionan y no es claro cuál usar. Y si llamas en un mal momento y nadie contesta, es muy probable que no vuelvas a intentarlo."

### 0:40 · Usuario (30 s)

> "Pensamos en Camila, una estudiante de 20 años que nos inventamos para diseñar. Ella prefiere escribir por WhatsApp, no quiere registrarse en nada ni contarle su vida a una app, y no sabe si el número que vio en Instagram sirve. También pensamos en su amigo, que la quiere ayudar pero no sabe a dónde llevarla."

### 1:10 · Solución (40 s)

> "Ruta Clara hace dos cosas. La primera es un directorio donde cada número dice de dónde salió y cuándo lo revisamos. Si pasan 30 días y nadie lo vuelve a revisar, la app lo esconde sola. La segunda es un orientador de dos preguntas: qué buscas y cómo te quieres comunicar. Con eso te muestra el canal que te sirve. No preguntamos síntomas, no medimos riesgo, no diagnosticamos. Solo te conectamos con personas."

### 1:50 · Demo en vivo (90 s)

1. Inicio: mostrar el aviso "no es un servicio de salud" y el panel "¿Es una emergencia?" con el 123 y el 106.
2. Elegir **"Quiero hablar con alguien" → "WhatsApp"**. Sale Yo Te Escucho con su fuente y su fecha. Abrir **"¿Por qué te mostramos esto?"**.
3. **Mapa**: volver al inicio, elegir **"Prefiero ir a un lugar en persona"**, tocar "Ver en el mapa" en el Hospital Departamental y luego "Cómo llegar". *"Todos estos lugares están habilitados por MinSalud, y les ponemos el código. El mapa de Google solo carga si tú lo pides, y no usamos tu ubicación."*
4. **Directorio**: abrir la fuente de una línea (el enlace a MinSalud) y mostrar la Secretaría de Salud "por verificar", sin contacto. *"Esta no la mostramos porque todavía no tenemos de dónde sacar el dato. La regla es igual para todos."*
5. **Recursos**: abrir "Acompañar a un amigo sin hacer de terapeuta" y mostrar la fuente y la fecha. *"Hasta los consejos generales tienen fuente."*
6. **Política de datos** (pie de página): mostrar la tabla del marco legal. *"No pedimos datos, y explicamos por qué con los artículos de la Ley 1581."*

### 3:20 · Evidencia y TRL 4 (50 s)

> "Estamos en TRL 4: las dos funciones principales funcionan juntas y las probamos en un entorno controlado. Escribimos 24 casos de prueba con datos inventados y pasan los 24. Por ejemplo, un dato con 30 días se muestra y uno con 31 no. Si eliges emergencia, salen primero las líneas de emergencia. Y ninguna pregunta usa palabras como síntoma, riesgo o diagnóstico. También queremos ser claros con lo que falta: un punto del mapa no es exacto y la app lo dice, la Secretaría de Salud todavía no tiene fuente y por eso no aparece, y no probamos con personas reales porque el reto no lo permite."

Mostrar en pantalla: `docs/evidencia/resultados-pruebas.md`.

### 4:10 · Operación y próximos pasos (50 s)

> "¿Quién mantiene esto? Proponemos un responsable en la Secretaría de Salud y un grupo de estudiantes que verifiquen. Cada lunes revisan las líneas y los lugares, unas dos horas a la semana. Publicarla no cuesta nada porque es una página estática. Lo que sigue: confirmar en persona los puntos del mapa, revisar el lenguaje con la Secretaría de Salud y llevar la idea a otros municipios del Meta. Gracias."

---

## Preguntas que nos pueden hacer

- **¿Por qué no un chatbot con IA?** Porque el reto no permite que la herramienta actúe como un profesional, y porque con reglas fijas cualquiera puede ver por qué se recomienda algo.
- **¿Cómo se enteran si una línea deja de funcionar?** Por la revisión de cada lunes. Y si nadie la revisa, a los 31 días se oculta sola. No recibimos reportes en la app para no guardar datos de nadie.
- **¿Y si nadie verifica y la pantalla queda vacía?** Hoy no pasa: revisamos los datos el 21 de octubre y se muestran hasta el 20 de noviembre. Si vencen, la app no queda vacía: manda al directorio oficial de MinSalud y a urgencias. Para cuando esté en operación proponemos que el 123 y el 106, que casi nunca cambian, sigan visibles con la etiqueta "verificación vencida", sin presentarlos como vigentes.
- **¿Cómo saben que no muestra datos viejos?** Lo prueban los casos CP-04 y CP-05: con 30 días el dato se ve y con 31 se oculta, sin que nadie haga nada.
- **¿Guardan datos?** No. No hay registro, y las respuestas del orientador se borran al reiniciar.
