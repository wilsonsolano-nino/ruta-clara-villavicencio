# 4. Plan de operación

El kickoff pide responder tres preguntas: **quién verifica la información, con qué frecuencia y cómo se reporta un enlace o teléfono inactivo.**

## ¿Quién verifica?

| Rol | Quién (propuesta) | Responsabilidad |
|---|---|---|
| **Responsable del directorio** | Funcionario de la Secretaría Local de Salud de Villavicencio (dimensión de salud mental) | Aprueba altas, bajas y cambios de servicios. |
| **Verificadores** | 2 a 4 estudiantes en práctica o voluntariado (UNIMETA TECH, SENA, universidades locales) con supervisión del responsable | Llaman o escriben a cada canal, confirman horario y registran fuente y fecha. |
| **Mantenimiento técnico** | Equipo del proyecto o la incubadora | Publica la nueva versión de `servicios.json`. Cada cambio queda registrado en Git. |

## ¿Con qué frecuencia?

La app lo exige por sí sola: **si nadie verifica, el dato desaparece.**

| Momento | Qué pasa en la app | Qué hace el equipo |
|---|---|---|
| Día 0 | El dato se carga con fuente, fecha y verificador | — |
| Días 1 a 23 | "Verificado" | Nada |
| Días 24 a 30 | "Verificado · por renovar" | Revisión **semanal**, todos los lunes: verificar lo que está por renovar |
| Día 31 en adelante | Contacto oculto; "Verificación vencida" | Prioridad alta: verificar o dar de baja |

**Protocolo de verificación de cada dato (unos 5 minutos):**

1. Consultar la fuente oficial (página de MinSalud o de la Alcaldía) y comparar el número.
2. Comprobar el canal: tono en la llamada y respuesta automática en WhatsApp. No se simula una consulta.
3. Actualizar `fechaVerificacion`, `verificadoPor` y `fuente.url` en `servicios.json`. Para los lugares del mapa, revisar la sede en el REPS de MinSalud (datos abiertos) y actualizar `lugares.json`.
4. Guardar el cambio en Git con un mensaje del tipo `verifica: yo-te-escucho 2026-11-16`.

## ¿Cómo se reporta un dato inactivo?

**Decisión de diseño: la app no recibe reportes.** Un formulario dentro de Ruta Clara obligaría a guardar lo que escribe la persona, y preferimos no guardar nada. La detección de datos caídos se resuelve así:

1. **Verificación activa:** el equipo comprueba cada canal todos los lunes (protocolo de arriba). No depende de que alguien avise.
2. **La regla de 30 días protege sola:** un dato que nadie reverifica se oculta automáticamente, aunque nadie lo haya reportado.
3. **Canal institucional fuera de la app:** en operación, la entidad responsable publica en la política de datos un correo o teléfono de atención (por ejemplo, el de la Secretaría Local de Salud) para quien quiera avisar que una línea no funciona. Ese aviso lo recibe y lo trata la entidad bajo su propia política, no Ruta Clara.

## Indicadores de operación

- Porcentaje de servicios vigentes. Meta: 100 %.
- Días promedio desde la última verificación. Meta: menos de 20.
- Datos ocultos por vencimiento en el mes. Meta: 0 (significa que la verificación semanal se cumplió).

## Sostenibilidad y costos

- **Hosting:** estático y gratuito (Vercel o GitHub Pages). Sin servidor ni base de datos que mantener.
- **Datos:** un archivo JSON versionado. Cualquier verificador lo edita con una guía de una página.
- **Costo de operación:** el tiempo de los verificadores, unas 2 horas semanales para 30 servicios.
- **Escalabilidad:** el mismo modelo sirve para otros municipios del Meta cambiando `servicios.json` y `lugares.json`.
