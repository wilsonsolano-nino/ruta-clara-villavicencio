# 4. Plan de operación

El kickoff pide responder tres preguntas: quién verifica la información, cada cuánto y cómo se reporta un teléfono o enlace que dejó de funcionar.

## ¿Quién verifica?

Proponemos tres roles:

- **Un responsable del directorio**, idealmente un funcionario de la Secretaría Local de Salud (área de salud mental). Aprueba qué servicios entran, salen o cambian.
- **De 2 a 4 verificadores**: estudiantes en práctica o voluntariado (UNIMETA TECH, SENA u otras universidades), supervisados por el responsable. Llaman o escriben a cada canal, confirman el horario y anotan la fuente y la fecha.
- **Mantenimiento técnico**: nuestro equipo o la incubadora. Publica los cambios de `servicios.json` y `lugares.json`; cada cambio queda guardado en Git.

## ¿Cada cuánto?

La app obliga a hacerlo: si nadie verifica un dato, desaparece.

| Días desde la última verificación | Qué se ve en la app | Qué hace el equipo |
|---|---|---|
| 0 a 23 | "Verificado" | Nada |
| 24 a 30 | "Verificado · por renovar" | Revisión semanal, los lunes |
| 31 o más | Se oculta el contacto | Verificar ya o dar de baja el dato |

**Cómo se verifica un dato (unos 5 minutos):**

1. Abrir la fuente oficial (MinSalud, la Alcaldía o el REPS para los lugares) y comparar el número.
2. Comprobar que el canal responda: tono en la llamada o respuesta automática en WhatsApp. No se hace una consulta de mentiras.
3. Actualizar `fechaVerificacion`, `verificadoPor` y `fuente.url` en `servicios.json` o en `lugares.json`.
4. Guardar el cambio en Git con un mensaje como `verifica: yo-te-escucho 2026-11-16`.

## ¿Cómo se reporta un dato que no funciona?

Decidimos que la app no reciba reportes. Tener un formulario nos obligaría a guardar lo que escribe la persona, y preferimos no guardar nada. En cambio:

1. **Verificamos nosotros**, todos los lunes, sin esperar a que alguien avise.
2. **La regla de 30 días** oculta lo que nadie reverificó, aunque nadie lo haya reportado.
3. **Quien quiera avisar** puede hacerlo por un canal de la entidad que opere la app (por ejemplo, el correo de atención de la Secretaría de Salud), publicado en la política de datos. Ese aviso lo maneja la entidad con su propia política, no Ruta Clara.

## Cómo sabremos si funciona

- Que el 100 % de los servicios esté vigente.
- Que, en promedio, un dato no pase más de 20 días sin verificar.
- Que ningún dato se oculte por vencimiento en el mes. Si pasa, la revisión semanal falló.

## Costos y sostenibilidad

- **Hosting:** gratis. La app es estática, sin servidor ni base de datos.
- **Datos:** un archivo JSON que cualquier verificador puede editar con una guía de una página.
- **Costo real:** el tiempo de los verificadores, unas 2 horas a la semana para 30 servicios.
- **Para crecer:** el mismo modelo sirve para otros municipios del Meta cambiando `servicios.json` y `lugares.json`.
