# 6. Guion del pitch · 5 minutos

El kickoff pide cubrir: problema, usuario, solución, demo, evidencia, estado TRL y próximos pasos.

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

> "En Colombia se notificaron más de 28.000 intentos de suicidio hasta septiembre de 2025, y más de la mitad corresponden a jóvenes de 15 a 29 años. En Villavicencio, Yo Te Escucho orientó a 441 personas en cuatro meses. **Los servicios existen.** El problema es llegar a ellos: los números están dispersos, nadie sabe si siguen funcionando y no es claro cuál usar. Un número que no contesta, en el peor momento, es una puerta cerrada."

### 0:40 · Usuario (30 s)

> "Pensamos en Camila, una persona ficticia de 20 años, estudiante. Quiere escribir por WhatsApp, no quiere registrarse ni contarle su vida a una app, y no sabe si el número que vio en Instagram funciona. También pensamos en su amigo, que quiere ayudarla y no sabe a dónde dirigirla."

### 1:10 · Solución (40 s)

> "Ruta Clara Villavicencio hace dos cosas, y las hace bien. **Uno:** un directorio donde cada número tiene fuente oficial y fecha. Si nadie lo verifica en 30 días, la app lo oculta sola. **Dos:** un orientador de dos preguntas, qué buscas y cómo prefieres comunicarte, que te lleva al canal correcto. No preguntamos síntomas, no evaluamos riesgo, no diagnosticamos. Conectamos con personas."

### 1:50 · Demo en vivo (90 s)

1. Inicio: señalar el aviso "no es un servicio de salud" y el panel "¿Es una emergencia?" con el 123 y el 106.
2. Elegir **"Quiero hablar con alguien" → "WhatsApp"**. Aparece Yo Te Escucho con su fuente y fecha. Abrir **"¿Por qué te mostramos esto?"**.
3. **Mapa**: volver al inicio, elegir **"Prefiero ir a un lugar en persona"**, tocar "Ver en el mapa" en el Hospital Departamental y luego "Cómo llegar". *"Son instituciones habilitadas por MinSalud, con su código. El mapa de Google solo carga si la persona lo pide, y no usamos su ubicación."*
4. **Directorio**: abrir la fuente de una línea (enlace a MinSalud) y mostrar la Secretaría de Salud "por verificar", sin contacto: *"no la mostramos porque aún no tenemos su fuente; la regla aplica para todos."*
5. **Recursos**: abrir "Acompañar a un amigo sin hacer de terapeuta" y señalar la fuente y la fecha de consulta. *"Hasta la información general lleva fuente."*
6. **Política de datos** (pie de página): mostrar la tabla "Marco legal y cómo lo cumplimos". *"No pedimos datos, y lo explicamos artículo por artículo de la Ley 1581."*

### 3:20 · Evidencia y TRL 4 (50 s)

> "Estamos en **TRL 4**: las dos funciones críticas están integradas y probadas en un entorno controlado. Definimos **24 casos de prueba con datos sintéticos y escenarios ficticios**, y los 24 pasan. Por ejemplo: un dato del día 30 se muestra; el del día 31, no. Una emergencia muestra primero las líneas de emergencia verificadas. Las preguntas no contienen palabras como síntoma, riesgo o diagnóstico. **Y estas son nuestras limitaciones:** un punto del mapa no es exacto y lo decimos en pantalla, la dirección de la Secretaría de Salud aún no tiene fuente y no la mostramos, y no hicimos pruebas con público, porque el reto no lo permite."

Mostrar en pantalla: `docs/evidencia/resultados-pruebas.md`.

### 4:10 · Operación y próximos pasos (50 s)

> "¿Quién lo mantiene? Proponemos un responsable en la Secretaría de Salud y estudiantes verificadores. Revisión semanal de cada línea y cada lugar, unas dos horas por semana. El hosting es gratuito y estático. **Próximos pasos:** confirmar en sitio los puntos del mapa, validar el lenguaje con la Secretaría de Salud y extender el modelo a otros municipios del Meta. Gracias."

---

## Preguntas probables del jurado

- **¿Por qué no un chatbot con IA?** → Porque el reto prohíbe que actúe como profesional, y porque un árbol de reglas es auditable: cualquiera puede ver por qué se recomienda algo.
- **¿Cómo se enteran si una línea deja de funcionar?** → Por la verificación semanal; y si nadie la verifica, se oculta sola a los 31 días. No recibimos reportes dentro de la app para no guardar datos de nadie.
- **¿Y si nadie verifica y la persona ve la pantalla vacía?** → Hoy no pasa: los datos se verificaron el 21 de octubre y se muestran hasta el 20 de noviembre. Si vencen, la app no deja la pantalla vacía: remite al directorio oficial de MinSalud y a urgencias. En operación proponemos que las líneas nacionales (123 y 106), que cambian muy poco, sigan visibles con la etiqueta "verificación vencida", sin presentarlas como vigentes.
- **¿Cómo sabemos que la app no muestra datos viejos?** → Por los casos CP-04 y CP-05: el día 30 el dato se muestra y el día 31 se oculta, sin intervención humana.
- **¿Guardan datos?** → No. No hay registro, y las respuestas del orientador se borran al reiniciar.
