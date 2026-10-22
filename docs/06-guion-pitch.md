# 6. Guion del pitch · 5 minutos

El kickoff pide cubrir: problema, usuario, solución, demo, evidencia, estado TRL y próximos pasos.

Esto es una base. Lo importante es que cada uno lo diga con sus palabras, no que lo recite.

Hablamos los tres: **Wilson Solano, Alejandro Diaz y Carlos Arciniegas**. Cada uno toma dos bloques seguidos, así solo hay dos cambios de voz.

Presentación (Canva): https://canva.link/j7q5iudvno2orfg

| Tiempo | Bloque | Diapositiva | Quién |
|---|---|---|---|
| 0:00–0:40 | Problema | 1–2 | Wilson |
| 0:40–1:10 | Usuario | 3 | Wilson |
| 1:10–1:50 | Solución | 4 | Alejandro |
| 1:50–3:20 | Demo en vivo | 5 + app publicada | Alejandro (maneja el computador) |
| 3:20–4:10 | Evidencia y TRL 4 | 6 | Carlos |
| 4:10–5:00 | Operación y próximos pasos | 7–8 | Carlos |

---

### 0:00 · Problema (40 s)

> "Hasta septiembre de 2025 se notificaron más de 28.000 intentos de suicidio en Colombia, y más de la mitad fueron de jóvenes entre 15 y 29 años. En el Meta la tasa casi se duplicó desde 2021 y ya está por encima del promedio del país. Aquí en Villavicencio, Yo Te Escucho orientó a 441 personas en cuatro meses. O sea, los servicios existen. El problema es llegar a ellos: los números están por todos lados, no sabes si todavía funcionan y no es claro cuál usar. Y si llamas en un mal momento y nadie contesta, es muy probable que no vuelvas a intentarlo."

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

> "Estamos en TRL 4: las dos funciones principales funcionan juntas y las probamos en un entorno controlado. Escribimos 24 casos de prueba con datos inventados y pasan los 24. Por ejemplo, un dato con 30 días se muestra y uno con 31 no. Si eliges emergencia, salen primero las líneas de emergencia. Y ninguna pregunta usa palabras como síntoma, riesgo o diagnóstico. ¿Por qué es confiable? Porque cada teléfono tiene fuente oficial, fecha y responsable; cada lugar del mapa está habilitado en el REPS de MinSalud, y las guías citan fuentes oficiales sin lenguaje clínico. Todo eso también lo verifican las pruebas."

Mostrar en pantalla: `docs/evidencia/resultados-pruebas.md`.

### 4:10 · Operación y próximos pasos (50 s)

> "¿Quién revisa que los teléfonos sigan funcionando? La app muestra 3 líneas de ayuda y 4 lugares de atención. Cada lunes, de 2 a 4 estudiantes llaman a cada uno y comparan el número con la página oficial: ¿es el mismo y contesta? La Secretaría de Salud aprueba, y la app muestra la nueva fecha de revisión. Son 5 minutos por contacto, unos 35 minutos a la semana. Y si un lunes nadie revisa, a los 31 días la app oculta ese contacto sola, para no mandar a nadie a un número que no contesta. Publicarla cuesta cero porque es una página estática. Hacia dónde vamos: operar el directorio junto a la Secretaría de Salud, que las líneas de emergencia carguen incluso sin internet, y llevar Ruta Clara a los 29 municipios del Meta cambiando solo los datos. Gracias."

---

## Preguntas que nos pueden hacer

- **¿Por qué no un chatbot con IA?** Porque el reto no permite que la herramienta actúe como un profesional, y porque con reglas fijas cualquiera puede ver por qué se recomienda algo.
- **¿Cómo se enteran si una línea deja de funcionar?** Por la revisión de cada lunes. Y si nadie la revisa, a los 31 días se oculta sola. No recibimos reportes en la app para no guardar datos de nadie.
- **¿Y si nadie verifica y la pantalla queda vacía?** Hoy no pasa: revisamos los datos el 21 de octubre y se muestran hasta el 20 de noviembre. Si vencen, la app no queda vacía: manda al directorio oficial de MinSalud y a urgencias. Para cuando esté en operación proponemos que el 123 y el 106, que casi nunca cambian, sigan visibles con la etiqueta "verificación vencida", sin presentarlos como vigentes.
- **¿Cómo saben que no muestra datos viejos?** Lo prueban los casos CP-04 y CP-05: con 30 días el dato se ve y con 31 se oculta, sin que nadie haga nada.
- **¿Guardan datos?** No. No hay registro, y las respuestas del orientador se borran al reiniciar.
- **¿Qué les falta?** (No está en las diapositivas; respóndanlo solo si lo preguntan.) Un punto del mapa, Monte Sinaí sede principal, salió de un directorio público y la app avisa que es aproximado. La Secretaría Local de Salud no aparece porque todavía no tenemos fuente oficial de su contacto, y esa es la regla para todos. Tampoco probamos con personas reales, porque el reto no lo permite.
