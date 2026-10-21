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
| Días 24 a 30 | "Verificado · por renovar"; aparece en el panel verificador | Revisión **semanal**, todos los lunes: verificar lo que está por renovar |
| Día 31 en adelante | Contacto oculto; "Verificación vencida" | Prioridad alta: verificar o dar de baja |
| Reporte recibido | "En revisión"; baja de prioridad | Revisar en **máximo 48 horas hábiles** |

**Protocolo de verificación de cada dato (unos 5 minutos):**

1. Consultar la fuente oficial (página de MinSalud o de la Alcaldía) y comparar el número.
2. Comprobar el canal: tono en la llamada y respuesta automática en WhatsApp. No se simula una consulta.
3. Actualizar `fechaVerificacion`, `verificadoPor` y `fuente.url` en `servicios.json`.
4. Guardar el cambio en Git con un mensaje del tipo `verifica: yo-te-escucho 2026-11-16`.

## ¿Cómo se reporta un dato inactivo?

1. **Cualquier persona** pulsa "Reportar dato incorrecto" en la tarjeta del servicio.
2. Elige el motivo: no contestan, número equivocado, enlace caído, horario distinto u otro. Puede dejar un comentario opcional; **la app bloquea teléfonos, correos y números de documento**.
3. El servicio pasa a **"En revisión"**: sigue visible, pero con una advertencia y por debajo de las alternativas.
4. El equipo verificador ve el reporte en el **Panel del equipo verificador**, lo exporta a CSV, lo verifica y lo marca como revisado.

**En el prototipo** los reportes se guardan en el navegador. **En operación** se enviarían a un formulario institucional (por ejemplo, Microsoft Forms o Google Forms de la Alcaldía), sin datos personales, con alerta por correo al responsable.

## Indicadores de operación

- Porcentaje de servicios vigentes. Meta: 100 %.
- Días promedio desde la última verificación. Meta: menos de 20.
- Tiempo de respuesta a los reportes. Meta: menos de 48 horas hábiles.
- Reportes por servicio por mes, como alerta de calidad.

## Sostenibilidad y costos

- **Hosting:** estático y gratuito (Vercel o GitHub Pages). Sin servidor ni base de datos que mantener.
- **Datos:** un archivo JSON versionado. Cualquier verificador lo edita con una guía de una página.
- **Costo de operación:** el tiempo de los verificadores, unas 2 horas semanales para 30 servicios.
- **Escalabilidad:** el mismo modelo sirve para otros municipios del Meta cambiando solo `servicios.json`.
