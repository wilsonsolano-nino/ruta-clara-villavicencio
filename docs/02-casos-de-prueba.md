# 2. Casos de prueba · Evidencia TRL 4

**Definición TRL 4 (kickoff):** las funciones críticas están integradas y funcionan en un entorno controlado, probadas con datos sintéticos y escenarios ficticios.

## Entorno controlado

- **Pruebas automatizadas:** Vitest 2.1, 26 casos. Archivos en `tests/`.
- **Datos sintéticos:** `tests/escenarios.ts` define 6 servicios ficticios con números de prefijo `000`. Ningún dato real de salud ni datos personales.
- **Personas ficticias:** Ana, Luis y Sofía son nombres inventados para describir escenarios. No hay pruebas con público.
- **Fecha controlada:** las pruebas fijan "hoy" como `2026-10-20` para que los resultados se puedan reproducir.
- **Prueba de interfaz:** recorridos automatizados en Chromium (escritorio de 1280 px y móvil de 390 px). Capturas en [evidencia/capturas](evidencia/capturas).

## Matriz de casos

### Función crítica 1 · Directorio verificado con vigencia

| ID | Escenario | Entrada | Resultado esperado |
|---|---|---|---|
| CP-01 | Dato fresco | Fuente y fecha de hace 1 día | `vigente`, se muestra |
| CP-02 | Sin fuente | `fuente: null` | `sin_verificar`, contacto oculto |
| CP-03 | Sin fecha | `fechaVerificacion: null` | Contacto oculto |
| CP-04 | Dato viejo | Verificado el 1 ago | `vencido`, contacto oculto |
| CP-05 | Límite de 30 días | Día 30 / día 31 | `por_vencer` / `vencido` |
| CP-06 | Aviso previo | Día 25 | `por_vencer`, se muestra con aviso |
| CP-07 | Fechas inválidas | 31 de febrero, fecha futura, formato errado | No se muestra |
| CP-08 | Reporte de falla | 1 reporte abierto | `en_revision`, sigue visible con advertencia |
| CP-09 | Reporte sobre dato vencido | Vencido + 2 reportes | Sigue `vencido` |

### Función crítica 2 · Orientador por tipo de consulta

| ID | Escenario ficticio | Entrada | Resultado esperado |
|---|---|---|---|
| CP-10 | Ana quiere escribir | Hablar + WhatsApp | Solo servicios con WhatsApp vigente |
| CP-11 | Luis prefiere llamar | Hablar + llamada | Primero el servicio local, luego el nacional |
| CP-12 | Datos no confiables | Los 4 propósitos | Nunca aparece un servicio sin fuente o vencido |
| CP-13 | Emergencia | Emergencia | La línea de emergencias aparece primero |
| CP-14 | Emergencia sin línea de emergencias verificada | Emergencia | Respaldo con líneas 24 h |
| CP-15 | Sofía pregunta por un amigo | Otra persona | Mensaje para acompañar |
| CP-16 | Canal sin oferta | WhatsApp, pero solo hay llamada | Respaldo con explicación |
| CP-17 | Nada vigente | Todo vencido o sin fuente | No muestra ningún teléfono y remite a la fuente oficial |
| CP-18 | Servicio reportado | Reporte abierto | Baja de prioridad |
| CP-19 | Transparencia | Todos los propósitos | Siempre explica la regla aplicada |
| CP-20 | Salvaguarda de lenguaje | Textos de preguntas | No contienen síntoma, diagnóstico, riesgo, nombre, edad ni escala |

### Reporte de datos e integridad del directorio real

| ID | Escenario | Resultado esperado |
|---|---|---|
| CP-21 | Crear y contar reportes | Cuenta solo los reportes abiertos por servicio |
| CP-22 | Comentario con teléfono, correo o cédula | Se rechaza |
| CP-23 | Exportar | CSV válido para el equipo verificador |
| CP-24 | `servicios.json` real | Todo lo mostrable tiene fuente, fecha y responsable |
| CP-25 | Datos sin fuente (123, 01 8000) | Quedan "por verificar" y no se exponen |
| CP-26 | Integridad | IDs únicos y al menos un canal por servicio |

## Resultados obtenidos

**26 de 26 aprobados.** Detalle con tiempos en [evidencia/resultados-pruebas.md](evidencia/resultados-pruebas.md). Para regenerarlo: `npm run evidencia`.

## Limitaciones identificadas (honestidad técnica)

1. **Los reportes viven en el navegador (localStorage).** En el prototipo no llegan a un servidor. En operación irían a un formulario institucional; ver el plan de operación.
2. **La verificación de los datos reales depende del kickoff.** Los dos números vigentes vienen de la diapositiva 12, que cita el directorio de MinSalud. Falta registrar la URL directa de la fuente.
3. **123 y 01 8000 931 089 están "por verificar".** Por diseño no se muestran hasta tener fuente y fecha. Por eso el flujo de emergencia hoy solo muestra 106 y Yo Te Escucho.
4. **La fecha depende del reloj del dispositivo.** Un reloj mal configurado altera la vigencia. Mitigación futura: tomar la fecha del servidor.
5. **El filtro de datos personales es heurístico.** Detecta teléfonos, documentos y correos, pero no nombres propios.
6. **No hay pruebas con usuarios reales.** Es una restricción del reto. La usabilidad se infiere de buenas prácticas de accesibilidad, no de pruebas con público.
7. **Accesibilidad no auditada formalmente.** Se aplicaron HTML semántico, foco visible, `aria-live`, contraste alto, objetivos táctiles de 44 px o más y modo oscuro, pero no se hizo una auditoría WCAG completa.
