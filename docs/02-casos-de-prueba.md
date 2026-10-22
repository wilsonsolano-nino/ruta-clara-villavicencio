# 2. Casos de prueba · Evidencia TRL 4

**Definición TRL 4 (kickoff):** las funciones críticas están integradas y funcionan en un entorno controlado, probadas con datos sintéticos y escenarios ficticios.

## Entorno controlado

- **Pruebas automatizadas:** Vitest 2.1, 24 casos. Archivos en `tests/`.
- **Datos sintéticos:** `tests/escenarios.ts` define 6 servicios ficticios con números de prefijo `000`. Ningún dato real de salud ni datos personales.
- **Personas ficticias:** Ana, Luis y Sofía son nombres inventados para describir escenarios. No hay pruebas con público.
- **Fecha controlada:** las pruebas fijan "hoy" como `2026-10-20` para que los resultados se puedan reproducir.
- **Prueba de interfaz:** recorridos automatizados en Microsoft Edge (Chromium) en escritorio de 1280 px y móvil de 390 px: orientador (hablar por WhatsApp y llamada, acompañar a otra persona), emergencia, directorio, mapa de lugares, recursos y política de datos. Capturas en [evidencia/capturas](evidencia/capturas).

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

### Función crítica 2 · Orientador por tipo de consulta

| ID | Escenario ficticio | Entrada | Resultado esperado |
|---|---|---|---|
| CP-08 | Ana quiere escribir | Hablar + WhatsApp | Solo servicios con WhatsApp vigente |
| CP-09 | Luis prefiere llamar | Hablar + llamada | Primero el servicio local, luego el nacional |
| CP-10 | Datos no confiables | Los 4 propósitos | Nunca aparece un servicio sin fuente o vencido |
| CP-11 | Emergencia | Emergencia | La línea de emergencias aparece primero |
| CP-12 | Emergencia sin línea de emergencias verificada | Emergencia | Respaldo con líneas 24 h |
| CP-13 | Sofía pregunta por un amigo | Otra persona | Sin segunda pregunta; consejos de la guía "Acompañar" y líneas por llamada o WhatsApp |
| CP-14 | Canal sin oferta | WhatsApp, pero solo hay llamada | Respaldo con explicación |
| CP-15 | Nada vigente | Todo vencido o sin fuente | No muestra ningún teléfono y remite a la fuente oficial |
| CP-16 | Transparencia | Todos los propósitos | Siempre explica la regla aplicada |
| CP-17 | Salvaguarda de lenguaje | Textos de preguntas | No contienen síntoma, diagnóstico, riesgo, nombre, edad ni escala |
| CP-18 | Sin respuestas redundantes | Los 4 propósitos | Cada propósito da un resultado distinto; "ir en persona" lleva al mapa; el canal es solo "Llamar" o "WhatsApp" |

### Integridad de los datos reales

| ID | Escenario | Resultado esperado |
|---|---|---|
| CP-19 | `servicios.json` real | Todo lo mostrable tiene fuente con enlace oficial (`.gov.co`), fecha y responsable |
| CP-20 | Datos con y sin fuente | Lo que no tiene fuente (Secretaría de Salud) queda "por verificar" y no se expone; 123, 106 y Yo Te Escucho se muestran |
| CP-21 | Integridad | IDs únicos y al menos un canal por servicio |
| CP-22 | `recursos.json` real | Cada guía tiene pautas, al menos una fuente con enlace https y una fecha de consulta válida |
| CP-23 | Salvaguarda de lenguaje en las guías | No contienen diagnóstico, síntoma, trastorno, tratamiento, medicamento ni escala |

### Mapa de lugares de atención

| ID | Escenario | Resultado esperado |
|---|---|---|
| CP-24 | `lugares.json` real | Cada lugar es vigente, cita el REPS, tiene código de habilitación de Villavicencio y su punto cae dentro del municipio |

## Resultados obtenidos

**24 de 24 aprobados.** Detalle con tiempos en [evidencia/resultados-pruebas.md](evidencia/resultados-pruebas.md). Para regenerarlo: `npm run evidencia`.

## Limitaciones identificadas (honestidad técnica)

1. **Un punto del mapa no es exacto.** Monte Sinaí sede principal se ubicó con un directorio público. La app lo dice en ese lugar; falta confirmarlo en sitio.
2. **Los datos vencen si nadie los verifica.** Los teléfonos se verificaron el 21 oct 2026 y se muestran hasta el 20 nov 2026. Sin la verificación semanal del plan de operación, la app los oculta y remite al directorio oficial de MinSalud.
3. **La Secretaría Local de Salud sigue "por verificar".** Falta su dirección y horario en una fuente oficial; por diseño no se muestra.
4. **La fecha depende del reloj del dispositivo.** Un reloj mal configurado altera la vigencia. Mitigación futura: tomar la fecha del servidor.
5. **El mapa depende de Google Maps.** Si Google no carga (sin internet o bloqueado), la lista de lugares con teléfono y dirección sigue funcionando.
6. **No hay pruebas con usuarios reales.** Es una restricción del reto. La usabilidad se infiere de buenas prácticas de accesibilidad, no de pruebas con público.
7. **Accesibilidad no auditada formalmente.** Se aplicaron HTML semántico, foco visible, `aria-live`, contraste alto, objetivos táctiles de 44 px o más y modo oscuro, pero no se hizo una auditoría WCAG completa.
