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

1. Inicio: señalar el aviso "no es un servicio de salud" y la barra fija con 106 y Yo Te Escucho.
2. Elegir **"Quiero hablar con alguien" → "WhatsApp"**. Aparece Yo Te Escucho con su fuente y fecha. Abrir **"¿Por qué te mostramos esto?"**.
3. **Reportar dato incorrecto**: escribir un teléfono en el comentario y mostrar que la app lo bloquea. Enviar el reporte sin comentario y mostrar que el servicio queda "En revisión".
4. **Directorio**: mostrar los datos "Por verificar" (123 y 01 8000) con el contacto oculto: *"no lo mostramos porque aún no tenemos su fuente; la regla aplica para todos."*
5. **Modo demostración** (pie de página → "Panel del equipo verificador"): mostrar la lista de pendientes y el reporte recién enviado, y luego cambiar la fecha al 25 nov 2026 y mostrar cómo los datos vencidos desaparecen. *"Si nadie hace su trabajo de verificación, la app protege al usuario."*

### 3:20 · Evidencia y TRL 4 (50 s)

> "Estamos en **TRL 4**: las dos funciones críticas están integradas y probadas en un entorno controlado. Definimos **26 casos de prueba con datos sintéticos y escenarios ficticios**, y los 26 pasan. Por ejemplo: un dato del día 30 se muestra; el del día 31, no. Una emergencia muestra primero las líneas de emergencia verificadas. Las preguntas no contienen palabras como síntoma, riesgo o diagnóstico. **Y estas son nuestras limitaciones:** los reportes viven en el navegador, el 123 aún no tiene fuente registrada y no hicimos pruebas con público, porque el reto no lo permite."

Mostrar en pantalla: `docs/evidencia/resultados-pruebas.md`.

### 4:10 · Operación y próximos pasos (50 s)

> "¿Quién lo mantiene? Proponemos un responsable en la Secretaría de Salud y estudiantes verificadores. Revisión semanal, reportes atendidos en 48 horas, unas dos horas por semana. El hosting es gratuito y estático. **Próximos pasos:** formulario institucional para los reportes, validar el lenguaje con la Secretaría de Salud y extender el modelo a otros municipios del Meta. Gracias."

---

## Preguntas probables del jurado

- **¿Por qué no un chatbot con IA?** → Porque el reto prohíbe que actúe como profesional, y porque un árbol de reglas es auditable: cualquiera puede ver por qué se recomienda algo.
- **¿Qué pasa si alguien reporta en falso el 106?** → El servicio no se oculta. Queda "en revisión", con advertencia, hasta que el equipo lo confirme.
- **¿Cómo sabemos que la app no muestra datos viejos?** → Por los casos CP-04 y CP-05 y la demostración con la fecha simulada.
- **¿Guardan datos?** → No. No hay registro, y las respuestas del orientador se borran al reiniciar.
