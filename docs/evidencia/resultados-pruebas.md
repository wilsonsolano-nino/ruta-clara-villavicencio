# Resultados de pruebas controladas · Ruta Clara Villavicencio

Ejecución: 20/10/2026, 11:14:23 p. m. (hora Colombia) · Herramienta: Vitest · Datos: sintéticos y escenarios ficticios

**26 de 26 casos aprobados.**

| ID | Caso de prueba | Función | Resultado | Tiempo |
|---|---|---|---|---|
| CP-01 | Servicio con fuente y verificado hace 1 día se muestra como vigente | Función crítica 1 · Directorio verificado con vigencia | ✅ Aprobado | 2 ms |
| CP-02 | Servicio sin fuente oficial NO se muestra como vigente | Función crítica 1 · Directorio verificado con vigencia | ✅ Aprobado | 1 ms |
| CP-03 | Servicio sin fecha de verificación NO se muestra como vigente | Función crítica 1 · Directorio verificado con vigencia | ✅ Aprobado | 0 ms |
| CP-04 | Verificación de hace más de 30 días queda vencida y oculta | Función crítica 1 · Directorio verificado con vigencia | ✅ Aprobado | 0 ms |
| CP-05 | Límite exacto: 30 días sigue mostrable (por renovar), 31 días vence | Función crítica 1 · Directorio verificado con vigencia | ✅ Aprobado | 0 ms |
| CP-06 | Entre 24 y 30 días se avisa que requiere nueva verificación | Función crítica 1 · Directorio verificado con vigencia | ✅ Aprobado | 0 ms |
| CP-07 | Fecha inválida o en el futuro se trata como no verificada | Función crítica 1 · Directorio verificado con vigencia | ✅ Aprobado | 0 ms |
| CP-08 | Un reporte de falla marca "en revisión" sin ocultar el contacto | Función crítica 1 · Directorio verificado con vigencia | ✅ Aprobado | 0 ms |
| CP-09 | Un reporte no "revive" un dato vencido | Función crítica 1 · Directorio verificado con vigencia | ✅ Aprobado | 0 ms |
| CP-10 | "Ana" (ficticia) quiere hablar por WhatsApp → solo servicios vigentes con WhatsApp | Función crítica 2 · Orientador por tipo de consulta (escenarios ficticios) | ✅ Aprobado | 4 ms |
| CP-11 | "Luis" (ficticio) prefiere llamada → local primero, luego nacional | Función crítica 2 · Orientador por tipo de consulta (escenarios ficticios) | ✅ Aprobado | 1 ms |
| CP-12 | Nunca recomienda servicios sin fuente o vencidos | Función crítica 2 · Orientador por tipo de consulta (escenarios ficticios) | ✅ Aprobado | 18 ms |
| CP-13 | Emergencia → la línea de emergencias aparece primero | Función crítica 2 · Orientador por tipo de consulta (escenarios ficticios) | ✅ Aprobado | 1 ms |
| CP-14 | Emergencia sin línea de emergencias verificada → muestra líneas 24 h | Función crítica 2 · Orientador por tipo de consulta (escenarios ficticios) | ✅ Aprobado | 0 ms |
| CP-15 | "Sofía" (ficticia) pregunta por un amigo → mensaje para acompañar | Función crítica 2 · Orientador por tipo de consulta (escenarios ficticios) | ✅ Aprobado | 1 ms |
| CP-16 | Canal pedido sin oferta vigente → respaldo con otros canales y lo explica | Función crítica 2 · Orientador por tipo de consulta (escenarios ficticios) | ✅ Aprobado | 1 ms |
| CP-17 | Sin ningún dato vigente → no muestra teléfonos y remite a fuente oficial | Función crítica 2 · Orientador por tipo de consulta (escenarios ficticios) | ✅ Aprobado | 1 ms |
| CP-18 | Servicio con reporte abierto baja de prioridad | Función crítica 2 · Orientador por tipo de consulta (escenarios ficticios) | ✅ Aprobado | 1 ms |
| CP-19 | Cada resultado explica la regla aplicada ("por qué") | Función crítica 2 · Orientador por tipo de consulta (escenarios ficticios) | ✅ Aprobado | 1 ms |
| CP-20 | Salvaguarda: las preguntas no piden síntomas, diagnóstico ni datos personales | Función crítica 2 · Orientador por tipo de consulta (escenarios ficticios) | ✅ Aprobado | 1 ms |
| CP-21 | Se crea un reporte abierto y se cuenta por servicio | Reporte de dato caído (plan de operación) | ✅ Aprobado | 2 ms |
| CP-22 | Rechaza comentarios con teléfono, documento o correo (cero datos personales) | Reporte de dato caído (plan de operación) | ✅ Aprobado | 1 ms |
| CP-23 | Exporta reportes a CSV para el equipo verificador | Reporte de dato caído (plan de operación) | ✅ Aprobado | 0 ms |
| CP-24 | Todo servicio mostrable tiene fuente, fecha y responsable de verificación | Integridad del directorio real (servicios.json) | ✅ Aprobado | 1 ms |
| CP-25 | Los datos sin fuente (p. ej. 123, 01 8000) quedan "por verificar" y no se exponen | Integridad del directorio real (servicios.json) | ✅ Aprobado | 0 ms |
| CP-26 | Los identificadores son únicos y cada servicio tiene al menos un canal | Integridad del directorio real (servicios.json) | ✅ Aprobado | 0 ms |

Regenerar con `npm run evidencia`.
