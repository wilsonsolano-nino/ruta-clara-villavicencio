# 3. Registro de fuentes y cambios

## Fuentes oficiales de los datos de contacto

| Servicio | Dato | Fuente | Fecha de consulta | Verificó | Estado en la app |
|---|---|---|---|---|---|
| Línea 106 | 106 · 24/7 | Directorio de salud mental y prevención del suicidio, MinSalud (citado en el kickoff, diapositiva 12) | 19 oct 2026 | Organización de la Hackathon | ✅ Vigente |
| Yo Te Escucho Villavicencio | 316 390 7010 · llamada y WhatsApp · 24/7 | Igual que la anterior | 19 oct 2026 | Organización de la Hackathon | ✅ Vigente |
| Línea 01 8000 931 089 | Titular por confirmar | Aparece en el kickoff sin nombre de entidad | — | — | ⏳ Por verificar |
| Línea 123 | Emergencias | Pendiente | — | — | ⏳ Por verificar |
| Secretaría Local de Salud | Atención presencial | Pendiente | — | — | ⏳ Por verificar |

### Tareas pendientes de verificación (antes del pitch)

- [ ] Abrir el directorio de MinSalud y copiar la **URL exacta** en `src/data/servicios.json` → `fuente.url`.
- [ ] Confirmar a qué entidad pertenece el **01 8000 931 089** y registrar su fuente y fecha.
- [ ] Registrar fuente oficial y fecha para la **línea 123**.
- [ ] Obtener dirección y horario de la **Secretaría Local de Salud** desde villavicencio.gov.co.
- [ ] Cambiar `verificadoPor` al nombre del integrante que hizo cada verificación.

## Fuentes de evidencia del problema

| Dato | Fuente | Fecha de consulta |
|---|---|---|
| 28.290 intentos de suicidio notificados (hasta el 27 sep 2025) | INS, citado en el kickoff | 19 oct 2026 (kickoff) |
| 56,6 % en jóvenes de 15 a 29 años | INS, citado en el kickoff | 19 oct 2026 (kickoff) |
| 441 personas orientadas por Yo Te Escucho (mar-jun 2026) | Alcaldía de Villavicencio, citado en el kickoff | 19 oct 2026 (kickoff) |

## Registro de retroalimentación y cambios

| Fecha | Origen | Retroalimentación o hallazgo | Cambio realizado |
|---|---|---|---|
| 20 oct 2026 | Revisión de salvaguardas | Ocultar un servicio con un solo reporte permitiría que un reporte malicioso dejara sin contacto a alguien. | Un reporte marca "en revisión" y baja la prioridad, pero no oculta el servicio (CP-08, CP-18). |
| 20 oct 2026 | Revisión de salvaguardas | El 123 es conocido, pero no tiene fuente registrada en nuestro directorio. | Se deja "por verificar" y no se muestra. La regla aplica igual para todos los datos (CP-25). |
| 20 oct 2026 | Prueba de interfaz en móvil | La navegación se desbordaba en pantallas de 390 px. | Ajuste de pestañas flexibles. Sin desplazamiento horizontal. |
| 20 oct 2026 | Prueba de interfaz | El comentario del reporte permitía escribir teléfonos. | Filtro de datos personales con mensaje claro (CP-22). |
| 20 oct 2026 | Revisión de diseño | El panel verificador y el modo demo estaban mezclados con la vista del joven; la opción de emergencia quedaba sola en una segunda fila; los datos "por verificar" ocupaban más espacio que los verificados. | Vista aparte para el verificador, emergencia como primera opción, pendientes en una lista compacta sin contacto, URL por vista y aviso visible cuando hay fecha simulada. |
| 21 oct 2026 | Revisión de diseño | La interfaz se sentía genérica y fría: todo eran tarjetas, el bloque rojo de emergencia alarmaba antes de orientar y los teléfonos competían con la pregunta principal. | Identidad editorial cálida (marfil, verde bosque, coral solo para emergencia; Literata + Atkinson Hyperlegible Next). La emergencia pasa a una franja fija con llamada en un toque; el cuestionario queda en dos preguntas; el directorio se agrupa en "para hablar ahora" y "otras rutas". |
| 21 oct 2026 | Revisión de identidad | El fondo oscuro se sentía pesado (la app seguía el modo oscuro del sistema) y faltaba la identidad de marca. | Se integra el logo oficial de Ruta Clara Villavicencio; el modo claro es la base y el oscuro es opcional; la paleta sale del logo (verde bosque, coral, salvia); la emergencia es un panel lateral fijo en escritorio y una barra en móvil; se agrega acceso directo al directorio con la fecha de la última verificación. |
| _completar_ | Mentoría | | |
| _completar_ | Mentoría | | |

> Agreguen aquí cada comentario de mentores o compañeros y qué cambiaron. El jurado lo pide explícitamente.
