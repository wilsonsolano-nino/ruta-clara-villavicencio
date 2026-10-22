# 3. Registro de fuentes y cambios

## Fuentes oficiales de los datos de contacto

| Servicio | Dato | Fuente | Fecha de consulta | Verificó | Estado en la app |
|---|---|---|---|---|---|
| Línea 106 | 106 · gratuita · 24/7 · llamada y videollamada con cita | [Línea 106, página oficial de MinSalud](https://minsalud.gov.co/salud/publica/salud-mental/Paginas/linea-106.aspx) | 21 oct 2026 | Equipo Ruta Clara | ✅ Vigente |
| Yo Te Escucho Villavicencio | 316 390 7010 y 01 8000 931 089 · llamada y WhatsApp · 24/7 | [Directorio Nacional de Líneas Territoriales de Atención en Salud Mental, MinSalud, agosto 2025](https://www.minsalud.gov.co/sites/rid/Lists/BibliotecaDigital/RIDE/VS/PP/ET/directorio-salud-mental-prevencion-suicidio-minsalud.pdf), página 9 (Meta, Villavicencio) | 21 oct 2026 | Equipo Ruta Clara | ✅ Vigente |
| Línea 123 | Emergencias · sin costo | [Resolución CRC 5937 de 2020](https://cancilleria.gov.co/sites/default/files/Normograma/docs/resolucion_crc_5937_2020.htm), Comisión de Regulación de Comunicaciones: en la numeración 1XY, el 123 es el "Número Único de Emergencias", sin costo para quien llama | 21 oct 2026 | Equipo Ruta Clara | ✅ Vigente |
| Secretaría Local de Salud | Atención presencial | Pendiente | — | — | ⏳ Por verificar |

### Tareas pendientes de verificación (antes del pitch)

- [x] Registrar la **URL exacta** de la fuente del 106 y de Yo Te Escucho en `src/data/servicios.json` → `fuente.url`.
- [x] Confirmar a qué entidad pertenece el **01 8000 931 089**: es la línea gratuita de Yo Te Escucho, según el directorio de MinSalud.
- [x] Registrar fuente oficial y fecha para la **línea 123**.
- [ ] Obtener dirección y horario de la **Secretaría Local de Salud** desde villavicencio.gov.co.
- [ ] Cambiar `verificadoPor` al nombre del integrante que hizo cada verificación.

## Fuentes de los recursos informativos y de la política de datos

| Contenido | Fuente | Fecha de consulta |
|---|---|---|
| Guías de Recursos (hábitos, estigma, entornos protectores) | OMS, nota descriptiva "Salud mental del adolescente" · who.int | 21 oct 2026 |
| Guías de Recursos (estigma y búsqueda de ayuda) | OMS, nota descriptiva "Suicidio" · who.int | 21 oct 2026 |
| Guía "Qué esperar cuando acudes a un servicio" | Ley 1616 de 2013, arts. 1, 3 y 6 (con modificaciones de la Ley 2460 de 2025) · Gestor Normativo de Función Pública | 21 oct 2026 |
| Política de tratamiento de datos | Ley 1581 de 2012, arts. 3 a 8 y 12 · Gestor Normativo de Función Pública | 21 oct 2026 |
| Política de tratamiento de datos | Decreto 1377 de 2013, arts. 6, 7, 12 y 13 · Gestor Normativo de Función Pública | 21 oct 2026 |

## Fuentes de los lugares del mapa

Todas las sedes salen del **Registro Especial de Prestadores y Sedes (REPS)** de MinSalud, datos abiertos en datos.gov.co (dataset `c36g-9fc2`, corte del 12 mar 2026), consultado el 21 oct 2026. "Origen del punto" indica de dónde salió la ubicación en el mapa.

| Sede | Código REPS | Dirección (REPS) | Teléfono | Origen del punto |
|---|---|---|---|---|
| Hospital Departamental de Villavicencio E.S.E. | 500010052901 | Calle 37 N.º 28-53 (sitio oficial: Calle 37A N.º 28-53, Barzal Alto) | (608) 681 7901, del sitio oficial hdv.gov.co (el REPS no trae teléfono) | Mapa del sitio oficial hdv.gov.co (4.143658, -73.64419); coincide con OpenStreetMap |
| IPS Salud Mental Monte Sinaí · sede ambulatoria | 500010165903 | Calle 33 N.º 33-34, consultorio 412, piso 4 | 300 204 3093 | Cruce de calles en OpenStreetMap (precisión de una cuadra) |
| IPS Salud Mental Monte Sinaí · sede principal | 500010165901 | Km 3 vía Restrepo, vereda El Cairo, Hacienda San José | 320 952 4220 | Directorio público (elhospital.com); **pendiente de confirmar en sitio** |
| Clínica SAMEN IPS | 500010225001 | Carrera 48 N.º 10-92, barrio La Esperanza | 310 365 7023 | Cruce de calles en OpenStreetMap; la dirección coincide con samenips.com |

**No incluidas:** Clínica SAMEN IPS, sede de hospitalización (REPS 500010225002, vereda El Cairo Alto), por decisión del equipo: se deja solo la sede urbana de SAMEN. Clínica Especializada en Salud Mental Fénix (REPS 500010199502). El RUES registra su matrícula como cancelada y su dirección no coincide entre fuentes (vereda Barcelona en el REPS; km 4 vía a Puerto López en otros directorios). Se agrega si se confirma que opera.

**Discrepancias conocidas:** los directorios comerciales dan hasta cinco teléfonos distintos para Monte Sinaí, y samenips.com publica (8) 678 38 71 y 314 429 33 01. La app muestra solo el teléfono del REPS, que es la fuente oficial, y pide llamar antes de ir.

## Fuentes de evidencia del problema

| Dato | Fuente | Fecha de consulta |
|---|---|---|
| 28.290 intentos de suicidio notificados (hasta el 27 sep 2025) | INS, citado en el kickoff | 19 oct 2026 (kickoff) |
| 56,6 % en jóvenes de 15 a 29 años | INS, citado en el kickoff | 19 oct 2026 (kickoff) |
| 441 personas orientadas por Yo Te Escucho (mar-jun 2026) | Alcaldía de Villavicencio, citado en el kickoff | 19 oct 2026 (kickoff) |

## Registro de retroalimentación y cambios

| Fecha | Origen | Retroalimentación o hallazgo | Cambio realizado |
|---|---|---|---|
| 20 oct 2026 | Revisión de salvaguardas | Ocultar un servicio con un solo reporte permitiría que un reporte malicioso dejara sin contacto a alguien. | Un reporte marca "en revisión" y baja la prioridad, pero no oculta el servicio. *(El 21 oct se eliminaron los reportes por privacidad; ver más abajo.)* |
| 20 oct 2026 | Revisión de salvaguardas | El 123 es conocido, pero no tiene fuente registrada en nuestro directorio. | Se deja "por verificar" y no se muestra. La regla aplica igual para todos los datos (CP-20). *(El 21 oct se registró su fuente; ver más abajo.)* |
| 20 oct 2026 | Prueba de interfaz en móvil | La navegación se desbordaba en pantallas de 390 px. | Ajuste de pestañas flexibles. Sin desplazamiento horizontal. |
| 20 oct 2026 | Prueba de interfaz | El comentario del reporte permitía escribir teléfonos. | Filtro de datos personales con mensaje claro. |
| 20 oct 2026 | Revisión de diseño | El panel verificador y el modo demo estaban mezclados con la vista del joven; la opción de emergencia quedaba sola en una segunda fila; los datos "por verificar" ocupaban más espacio que los verificados. | Vista aparte para el verificador, emergencia como primera opción, pendientes en una lista compacta sin contacto, URL por vista y aviso visible cuando hay fecha simulada. |
| 21 oct 2026 | Revisión de diseño | La interfaz se sentía genérica y fría: todo eran tarjetas, el bloque rojo de emergencia alarmaba antes de orientar y los teléfonos competían con la pregunta principal. | Identidad editorial cálida (marfil, verde bosque, coral solo para emergencia; Literata + Atkinson Hyperlegible Next). La emergencia pasa a una franja fija con llamada en un toque; el cuestionario queda en dos preguntas; el directorio se agrupa en "para hablar ahora" y "otras rutas". |
| 21 oct 2026 | Revisión de identidad | El fondo oscuro se sentía pesado (la app seguía el modo oscuro del sistema) y faltaba la identidad de marca. | Se integra el logo oficial de Ruta Clara Villavicencio; el modo claro es la base y el oscuro es opcional; la paleta sale del logo (verde bosque, coral, salvia); la emergencia es un panel lateral fijo en escritorio y una barra en móvil; se agrega acceso directo al directorio con la fecha de la última verificación. |
| 21 oct 2026 | Revisión del equipo | El panel del verificador y la fecha simulada no aportaban al joven: los reportes solo existían en el mismo navegador, así que el panel era una maqueta. Faltaban contenidos informativos y una política de datos con base legal. | Se retiran el panel y el modo demostración; un reporte se cierra solo cuando el dato se reverifica. Se agregan Recursos con fuentes oficiales (CP-22, CP-23), preguntas frecuentes y la política de tratamiento de datos (Ley 1581 de 2012, Decreto 1377 de 2013). |
| 21 oct 2026 | Revisión del equipo | Recibir reportes obligaba a guardar lo que escribía la persona, aunque fuera en su navegador. El orientador era redundante: con dos líneas verificadas, casi todas las opciones llevaban al mismo resultado. Faltaba orientar a quien prefiere ir en persona. | Se elimina por completo el reporte de novedades: la app no guarda nada. El orientador da un resultado distinto por opción (CP-18): líneas según el canal, consejos para acompañar o el mapa. Se agrega el mapa de lugares del REPS, que también aparece en el filtro "Presencial" del Directorio (CP-24). Google Maps solo se carga si la persona lo pide; se descartó pedir la ubicación porque "Ver en el mapa" y "Cómo llegar" ya resuelven cómo ubicar cada lugar. Recursos se lee en párrafos con selector de temas; el pie se distingue con la superficie "hoja" y resume la política de datos; se agrega SEO básico. |
| 21 oct 2026 | Revisión de privacidad | Los reportes de novedades obligaban a guardar lo que escribía la persona. Además, un reporte no podía ocultar una línea, así que tampoco protegía a nadie. | Se quitan los reportes y el estado "en revisión". La salvaguarda queda en la regla de 30 días y en la verificación semanal del equipo (`docs/04-plan-de-operacion.md`). |
| 21 oct 2026 | Revisión de fuentes | El 106 y Yo Te Escucho citaban el directorio de MinSalud sin enlace; el 123 no tenía fuente, así que la opción de emergencia no mostraba el número de emergencias; el 01 8000 931 089 no tenía titular. | Se registran las fuentes con enlace: página oficial de la Línea 106, directorio nacional de MinSalud (agosto 2025) y Resolución CRC 5937 de 2020 para el 123. El 01 8000 931 089 es la línea gratuita de Yo Te Escucho y se une a esa entrada. El panel de emergencia muestra primero el 123. CP-19 exige un enlace oficial `.gov.co` en todo dato que se muestre. |
| _completar_ | Mentoría | | |
| _completar_ | Mentoría | | |

> Agreguen aquí cada comentario de mentores o compañeros y qué cambiaron. El jurado lo pide explícitamente.
