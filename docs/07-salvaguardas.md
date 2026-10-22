# 7. Cumplimiento de salvaguardas

> "Sin salvaguardas cumplidas no hay premio." (Kickoff, diapositiva 8)

## Lo que el reto prohíbe y cómo lo cumplimos

| Prohibido | Qué hicimos | Dónde se comprueba |
|---|---|---|
| Diagnosticar, prescribir o recomendar tratamientos | La app solo recomienda canales de contacto, nunca qué hacer clínicamente. Las guías de Recursos son información general, sin lenguaje clínico. | `src/logic/orientador.ts`, CP-23 |
| Predecir riesgo de suicidio o calificar riesgo clínico | No hay preguntas de síntomas ni puntajes. El orientador decide solo por propósito y canal. | CP-17 |
| Chatbots que actúen como profesional de salud | No hay chatbot ni IA en tiempo de ejecución. | Declaración del equipo |
| Usar datos reales de salud mental o probar con público | Datos sintéticos (`tests/escenarios.ts`). Sin pruebas con público. | CP-08 a CP-18 |
| Diseñar protocolos de crisis o instrumentos clínicos | La opción "emergencia" solo muestra líneas oficiales y la indicación de acudir a urgencias. No da pasos clínicos. | CP-11, CP-12 |
| Publicar la herramienta como servicio de salud | Aviso permanente: "no es un servicio de salud". | Interfaz y README |

## Reglas del juego

| Regla | Qué hicimos |
|---|---|
| Cero datos reales | No hay registro, formularios ni reportes: la app no guarda nada de lo que hace la persona. Tampoco usa su ubicación, y el mapa de Google solo carga si lo pide. La política de datos (`#privacidad`) explica en qué artículo de la Ley 1581 de 2012 se apoya cada decisión. |
| Cero credenciales | No hay llaves API. La app es estática, sin backend. |
| IA con límites | No hay IA en el producto. El contacto siempre es con servicios humanos. |
| **Fuente y fecha** | Está programado: si un contacto no tiene fuente o su fecha pasa de 30 días, no se muestra (CP-01 a CP-07, CP-19, CP-20). Las guías de Recursos citan fuente y fecha de consulta (CP-22) y los lugares del mapa vienen del REPS de MinSalud con código de habilitación (CP-24). |
| Declaren todo | [05-declaracion-del-equipo.md](05-declaracion-del-equipo.md) |

## TRL 4: la meta y el límite

Nos quedamos en TRL 4 a propósito, porque es el máximo que permite el reto: no hay uso con personas reales ni conexión con sistemas de ninguna entidad.
