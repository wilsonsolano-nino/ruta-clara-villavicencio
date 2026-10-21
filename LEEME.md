# Ruta Clara Villavicencio · Guía para el equipo

Estado del proyecto al **21 oct 2026**. Los entregables y el pitch son el **22 oct en la tarde** en UNIMETA TECH.

Este archivo resume qué llevamos, cómo correrlo y qué falta. El `README.md` es la ficha técnica del proyecto; esta guía es para coordinarnos.

---

## 1. Qué es

Ruta Clara Villavicencio es nuestra solución al reto **Mente Sana Joven** (Categoría 2, Joven) de la Hackathon Villavicencio 2026. Es una web app que ayuda a una persona joven a encontrar **el canal oficial de apoyo emocional adecuado** en Villavicencio.

- **No diagnostica, no evalúa riesgo y no es un servicio de salud.** Solo orienta hacia servicios humanos oficiales.
- **Cada teléfono muestra su fuente oficial y la fecha de verificación.** Si un dato pasa más de 30 días sin verificarse, la app oculta el contacto sola.
- **Meta de madurez:** TRL 4, que es a la vez el mínimo para el premio y el máximo permitido. Las funciones críticas están probadas con datos sintéticos y escenarios ficticios.

## 2. Cómo correrlo

Requisito: Node.js 18 o superior.

```bash
npm install
npm run dev        # abre http://localhost:5173
npm test           # corre los 26 casos de prueba (todos pasan)
npm run evidencia  # regenera docs/evidencia/resultados-pruebas.md
npm run build      # genera /dist para publicar
```

Para probarlo en el celular: `npm run dev -- --host` y abre en el teléfono la dirección "Network" que aparece en la terminal (computador y celular en la misma red wifi).

## 3. Qué llevamos

### Funciones (las que demuestran TRL 4)

| Función | Qué hace | Dónde está |
|---|---|---|
| **Directorio verificado con vigencia** | Muestra solo contactos con fuente oficial y fecha. A los 24 días los marca "por renovar"; a los 31 los oculta. | `src/logic/vigencia.ts` |
| **Orientador de 2 preguntas** | Pregunta qué buscas y cómo prefieres comunicarte. No pregunta síntomas. Explica "por qué te mostramos esto". | `src/logic/orientador.ts` |
| **Acceso a emergencia sin pasos** | Panel fijo "¿Es una emergencia?" con las líneas 24 h verificadas. Se llama con un toque. | `src/components/BarraApoyo.tsx` |
| **Reporte de dato caído** | Cualquiera reporta un número que falla; el dato queda "en revisión". El formulario bloquea teléfonos, correos y documentos. | `src/logic/reportes.ts` |
| **Panel del equipo verificador** | Lista lo que hay que verificar y los reportes recibidos; exporta CSV. Incluye el **modo demostración** para simular otra fecha. | Pie de página → "Panel del equipo verificador (demo)" |

### Pantallas

Cada vista tiene su propia dirección, así que el botón "atrás" del celular funciona:

| Dirección | Pantalla |
|---|---|
| `#orientar` | Inicio: "¿Con quién puedo hablar?" |
| `#emergencia` | Resultado de emergencia directo |
| `#directorio` | Canales oficiales, agrupados en "Para hablar ahora" y "Otras rutas" |
| `#como` | Qué es y qué no es la herramienta |
| `#verificador` | Panel del equipo verificador y modo demostración |

### Identidad visual

- **Logo oficial** en la cabecera, en versión clara y oscura. Los archivos están en `public/marca/` y son recortes con fondo transparente de los logos que nos pasaron.
- **Paleta tomada del logo:**
  - Fondo marfil `#F5F0E7`.
  - Verde bosque `#294C3B` para marca y acciones.
  - Coral `#D97F70`, solo para emergencia.
  - Salvia y arena para superficies y divisores.
- **Tipografía:** Literata para títulos y nombres de servicios. Atkinson Hyperlegible Next para el texto, porque está diseñada para personas con baja visión.
- **Modos de color:** el modo claro es la base. El oscuro es opcional (botón "Modo oscuro") y se recuerda en cada navegador.
- **Transiciones discretas:** se desactivan si la persona pidió "reducir movimiento" en su sistema.

### Documentos del reto (carpeta `docs/`)

| Entregable pedido en el kickoff | Archivo |
|---|---|
| Problema y usuario | `docs/01-problema-y-usuario.md` |
| Evidencia de pruebas (TRL 4) | `docs/02-casos-de-prueba.md`, `docs/evidencia/` |
| Registro y fuentes | `docs/03-registro-fuentes-y-cambios.md` |
| Plan de operación | `docs/04-plan-de-operacion.md` |
| Declaración del equipo | `docs/05-declaracion-del-equipo.md` |
| Guion del pitch (5 min) | `docs/06-guion-pitch.md` |
| Cumplimiento de salvaguardas | `docs/07-salvaguardas.md` |

### Reglas del reto que ya cumplimos

- No diagnostica, no predice riesgo, no es un chatbot y no usa IA dentro de la app.
- Cero datos reales: las pruebas usan datos sintéticos (`tests/escenarios.ts`).
- Cero credenciales: no hay llaves ni contraseñas en el proyecto.
- Ningún teléfono se muestra sin fuente oficial y fecha.
- El aviso "No es un servicio de salud" aparece en el inicio y en el pie de todas las pantallas.

## 4. Pendientes antes del pitch (22 oct)

En orden de prioridad. Si tomas uno, escribe tu nombre al lado.

- [ ] **Completar la declaración del equipo:** nombre del equipo e integrantes con su rol en `docs/05-declaracion-del-equipo.md`. Es un entregable obligatorio.
- [ ] **Registrar la URL exacta de la fuente** (directorio de MinSalud) en `src/data/servicios.json` → `fuente.url`, y la fecha en que la consultamos.
- [ ] **Cambiar `verificadoPor`** en `servicios.json` por el nombre de quien verificó cada dato.
- [ ] **Rehacer las capturas** de `docs/evidencia/capturas/`: muestran un diseño anterior. Hacen falta inicio (escritorio y móvil), resultado, emergencia, directorio, reporte bloqueando un teléfono y panel verificador.
- [ ] **Anotar la retroalimentación de mentorías** en la tabla de `docs/03-registro-fuentes-y-cambios.md`. El jurado lo pide explícitamente.
- [ ] **Actualizar el guion del pitch** (`docs/06-guion-pitch.md`) para que la demo muestre el panel de emergencia y el botón "Ver todas las opciones".
- [ ] **Ensayar la demo completa** en el computador del pitch, con el modo demostración (fecha simulada después del 18 nov 2026).
- [ ] **Publicar una versión en línea** (Vercel, Netlify o GitHub Pages con `npm run build`) para tener un enlace de respaldo si falla el computador.

### Datos que siguen "por verificar"

La app no los muestra hasta tener fuente oficial y fecha. Si alguien consigue la fuente, se agregan en `servicios.json`:

| Dato | Qué falta |
|---|---|
| Línea 01 8000 931 089 | Confirmar a qué entidad pertenece (aparece en el kickoff sin nombre) |
| Línea 123 (emergencias) | Fuente oficial y fecha de consulta |
| Secretaría Local de Salud de Villavicencio | Dirección y horario desde villavicencio.gov.co |

**No inventamos ni copiamos números de redes sociales:** solo fuentes oficiales con fecha.

## 5. Qué podemos mejorar

### Para el pitch (rápido, alto impacto)

- **Probar con teclado y en celular real:** recorrer toda la app solo con Tab y Enter, y abrirla en al menos un Android y un iPhone. Hasta ahora solo se revisó en simulación.
- **Revisar el lema del logo:** dice "No estás solo". Una alternativa más inclusiva para un público joven sería "No estás sola, no estás solo" o "No estás en esto sin compañía". Es una decisión del equipo.
- **Logo en vector:** si quien diseñó el logo tiene el archivo SVG, se verá más nítido que el PNG actual.

### Después de la hackathon (si hay incubación)

- **Reportes a un servidor real:** hoy se guardan solo en el navegador. En operación irían a un formulario institucional con alerta al responsable (ver `docs/04-plan-de-operacion.md`).
- **Fecha confiable:** la vigencia usa el reloj del dispositivo. Tomarla de un servidor evita errores si el reloj está mal.
- **Uso sin conexión:** agregar un service worker para que las líneas de emergencia carguen sin internet.
- **Mejor filtro de datos personales:** hoy detecta teléfonos, correos y documentos, pero no nombres propios.
- **Auditoría de accesibilidad formal (WCAG 2.2):** aplicamos buenas prácticas, pero no hicimos una auditoría completa.
- **Validar el lenguaje con la Secretaría de Salud,** sin pruebas con público mientras el reto no lo permita.
- **Escalar a otros municipios del Meta:** el modelo funciona cambiando solo `servicios.json`.

## 6. Cómo está organizado el código

```
src/
  data/servicios.json   ← directorio: único lugar donde se editan los datos
  logic/                ← reglas (vigencia, orientador, reportes); aquí viven las salvaguardas
  components/           ← interfaz React
  styles.css            ← toda la identidad visual (colores, tipografía, modos claro y oscuro)
public/marca/           ← logo, favicon e íconos
tests/                  ← 26 casos de prueba con datos sintéticos
docs/                   ← entregables de la hackathon
```

**Reglas para trabajar juntos:**

- Antes de cambiar algo en `src/logic/` o en `servicios.json`, corre `npm test`. Los 26 casos deben seguir pasando.
- Los textos de las preguntas no pueden pedir síntomas, diagnósticos, nombres ni edades: el caso CP-20 lo verifica.
- Cada cambio que venga de una mentoría se anota en `docs/03-registro-fuentes-y-cambios.md`.
- No subir datos personales, datos de salud reales ni llaves o contraseñas.

## 7. Herramientas usadas

El código, las pruebas y los documentos se hicieron con apoyo de Claude (Anthropic), un asistente de IA, y el equipo revisó todo. Eso ya está declarado en `docs/05-declaracion-del-equipo.md`, como pide el reto. La app no usa IA mientras funciona.

---

¿Dudas? Hablemos en el canal del equipo antes de cambiar la estructura o la lógica.
