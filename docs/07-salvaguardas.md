# 7. Cumplimiento de salvaguardas

> "Sin salvaguardas cumplidas no hay premio." (Kickoff, diapositiva 8)

## Lo que no está permitido → cómo lo cumplimos

| Prohibido | Cumplimiento | Evidencia |
|---|---|---|
| Diagnosticar, prescribir o recomendar tratamientos | La app solo recomienda **canales de contacto**, nunca acciones clínicas. | `src/logic/orientador.ts` |
| Predecir riesgo de suicidio o calificar riesgo clínico | No hay preguntas de síntomas ni puntajes. El orientador decide solo por propósito y canal. | CP-20 |
| Chatbots que actúen como profesional de salud | No hay chatbot ni IA en tiempo de ejecución. | Declaración del equipo |
| Usar datos reales de salud mental o probar con público | Datos sintéticos (`tests/escenarios.ts`). Sin pruebas con público. | CP-10 a CP-23 |
| Diseñar protocolos de crisis o instrumentos clínicos | La opción "emergencia" solo muestra líneas oficiales y la indicación de acudir a urgencias. No da pasos clínicos. | CP-13, CP-14 |
| Publicar la herramienta como servicio de salud | Aviso permanente: "no es un servicio de salud". | Interfaz y README |

## Reglas del juego → cómo las cumplimos

| Regla | Cumplimiento |
|---|---|
| Cero datos reales | Sin registro. El comentario del reporte bloquea teléfonos, correos y documentos (CP-22). |
| Cero credenciales | No hay llaves API. La app es estática, sin backend. |
| IA con límites | No hay IA en el producto. El contacto siempre es con servicios humanos. |
| **Fuente y fecha** | **Regla programada:** sin fuente y fecha de 30 días o menos, el contacto no se muestra (CP-01 a CP-07, CP-24, CP-25). |
| Declaren todo | [05-declaracion-del-equipo.md](05-declaracion-del-equipo.md) |

## TRL 4: la meta y el límite

No superamos TRL 4: no hay despliegue con usuarios reales ni integración con sistemas institucionales. Esto es deliberado, porque el reto fija TRL 4 como máximo.
