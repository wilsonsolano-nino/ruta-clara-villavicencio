# Ruta Clara Villavicencio · Guía para el equipo

Estado del proyecto al **21 oct 2026**. Los entregables y el pitch son el **22 oct en la tarde** en UNIMETA TECH.

Este archivo resume qué llevamos, cómo correrlo y qué falta. El `README.md` es la ficha técnica del proyecto; esta guía es para coordinarnos.

---

## 1. Qué es

Ruta Clara Villavicencio es nuestra solución al reto **Mente Sana Joven** (Categoría 2, Joven) de la Hackathon Villavicencio 2026. Es una web app que ayuda a una persona joven a encontrar **el canal oficial de apoyo emocional adecuado** en Villavicencio.

- **No diagnostica, no evalúa riesgo y no es un servicio de salud.** Solo orienta hacia servicios humanos oficiales.
- **Cada teléfono y cada lugar muestran su fuente oficial y la fecha de verificación.** Si un dato pasa más de 30 días sin verificarse, la app oculta el contacto sola.
- **No guarda nada de lo que hace la persona:** no hay registro, formularios ni reportes, y no usa su ubicación.
- **Meta de madurez:** TRL 4, que es a la vez el mínimo para el premio y el máximo permitido. Las funciones críticas están probadas con datos sintéticos y escenarios ficticios.

## 2. Cómo correrlo

Requisito: Node.js 18 o superior.

```bash
npm install
npm run dev        # abre http://localhost:5173
npm test           # corre los 24 casos de prueba (todos pasan)
npm run evidencia  # corre las pruebas y regenera docs/evidencia/resultados-pruebas.md
npm run build      # genera /dist para publicar
```

Para probarlo en el celular: `npm run dev -- --host` y abre en el teléfono la dirección "Network" que aparece en la terminal (computador y celular en la misma red wifi).

## 3. Qué llevamos

### Funciones (las que demuestran TRL 4)

| Función | Qué hace | Dónde está |
|---|---|---|
| **Directorio verificado con vigencia** | Muestra solo contactos con fuente oficial y fecha. A los 24 días los marca "por renovar"; a los 31 los oculta. | `src/logic/vigencia.ts` |
| **Orientador de 2 preguntas** | Pregunta qué buscas y, solo si quieres hablar con alguien, si prefieres llamar o escribir. Cada opción lleva a algo distinto: líneas, consejos para acompañar a otra persona o el mapa de lugares. No pregunta síntomas. Explica "por qué te mostramos esto". | `src/logic/orientador.ts` |
| **Acceso a emergencia sin pasos** | Panel fijo "¿Es una emergencia?" con las líneas 24 h verificadas. Se llama con un toque. | `src/components/BarraApoyo.tsx` |
| **Mapa de lugares de atención** | Instituciones de salud mental de Villavicencio habilitadas en el REPS de MinSalud, con la misma regla de fuente y fecha. También aparecen en el filtro "Presencial" del Directorio. Google Maps solo se carga cuando la persona lo pide; la app no usa su ubicación. | `src/data/lugares.json`, `src/components/Lugares.tsx` |
| **Recursos** | Cuatro guías cortas: sobrecarga, cuándo pedir ayuda, tus derechos y cómo acompañar a un amigo. Cada una cita fuentes oficiales (OMS, Ley 1616 de 2013) con fecha de consulta. | `src/data/recursos.json` |
| **Preguntas frecuentes** | Registro, emergencia, por qué se ocultan datos, por qué el mapa no carga de una vez, qué datos se guardan. | `src/components/ComoFunciona.tsx` |
| **Política de tratamiento de datos** | Qué se usa y para qué (incluido el mapa de Google), y el marco legal artículo por artículo (Ley 1581 de 2012, Decreto 1377 de 2013, Ley 1616 de 2013). Resumen en el pie de página. | Pie de página → `src/components/Privacidad.tsx` |

### Pantallas

Cada vista tiene su propia dirección, así que el botón "atrás" del celular funciona:

| Dirección | Pantalla |
|---|---|
| `#orientar` | Inicio: "¿Con quién puedo hablar?" |
| `#emergencia` | Resultado de emergencia directo |
| `#directorio` | Canales oficiales, agrupados en "Para hablar ahora" y "Otras rutas" |
| `#lugares` | Mapa de lugares de atención en salud mental (bajo la pestaña Directorio) |
| `#recursos` | Guías informativas con fuente y fecha |
| `#como` | Qué es y qué no es la herramienta, y preguntas frecuentes |
| `#privacidad` | Política de tratamiento de datos |

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
| Evidencia de pruebas (TRL 4) | `docs/02-casos-de-prueba.md`, `docs/evidencia/resultados-pruebas.md` y `docs/evidencia/capturas/` |
| Registro y fuentes | `docs/03-registro-fuentes-y-cambios.md` |
| Plan de operación | `docs/04-plan-de-operacion.md` |
| Declaración del equipo | `docs/05-declaracion-del-equipo.md` |
| Guion del pitch (5 min) | `docs/06-guion-pitch.md` |
| Cumplimiento de salvaguardas | `docs/07-salvaguardas.md` |

### Reglas del reto que ya cumplimos

- No diagnostica, no predice riesgo, no es un chatbot y no usa IA dentro de la app.
- Cero datos reales: las pruebas usan datos sintéticos (`tests/escenarios.ts`). La app no guarda nada de lo que hace la persona: no hay registro, formularios ni reportes.
- Cero credenciales: no hay llaves ni contraseñas en el proyecto.
- Ningún teléfono se muestra sin fuente oficial y fecha.
- El aviso "No es un servicio de salud" aparece en el inicio y en el pie de todas las pantallas.

## 4. Pendientes antes del pitch (22 oct)

En orden de prioridad. Si tomas uno, escribe tu nombre al lado.

- [ ] **Completar la declaración del equipo:** nombre del equipo e integrantes con su rol en `docs/05-declaracion-del-equipo.md`. Es un entregable obligatorio.
- [ ] **Cambiar `verificadoPor`** en `servicios.json` por el nombre de quien verificó cada dato.
- [ ] **Anotar la retroalimentación de mentorías** en la tabla de `docs/03-registro-fuentes-y-cambios.md`. El jurado lo pide explícitamente.
- [ ] **Ensayar la demo completa** en el computador del pitch siguiendo `docs/06-guion-pitch.md` (orientador, mapa, recursos y política de datos). El mapa necesita internet.
- [ ] **Confirmar en sitio el punto de Monte Sinaí sede principal** en el mapa: se tomó de un directorio público. Si alguien lo ubica, se corrige en `src/data/lugares.json`.
- [ ] **Publicar una versión en línea** (Vercel, Netlify o GitHub Pages con `npm run build`) para tener un enlace de respaldo si falla el computador.

### Datos que siguen "por verificar"

La app no los muestra hasta tener fuente oficial y fecha. Si alguien consigue la fuente, se agregan en `servicios.json`:

| Dato | Qué falta |
|---|---|
| Secretaría Local de Salud de Villavicencio | Dirección y horario desde villavicencio.gov.co |

**No inventamos ni copiamos números de redes sociales:** solo fuentes oficiales con fecha. Para los lugares del mapa, la fuente es el REPS de MinSalud; las sedes descartadas y el porqué están en `docs/03-registro-fuentes-y-cambios.md`.

## 5. Qué podemos mejorar

### Para el pitch (rápido, alto impacto)

- **Probar con teclado y en celular real:** recorrer toda la app solo con Tab y Enter, y abrirla en al menos un Android y un iPhone. Hasta ahora solo se revisó en simulación.
- **Revisar el lema del logo:** dice "No estás solo". Una alternativa más inclusiva para un público joven sería "No estás sola, no estás solo" o "No estás en esto sin compañía". Es una decisión del equipo.
- **Logo en vector:** si quien diseñó el logo tiene el archivo SVG, se verá más nítido que el PNG actual.

### Después de la hackathon (si hay incubación)

- **Fecha confiable:** la vigencia usa el reloj del dispositivo. Tomarla de un servidor evita errores si el reloj está mal.
- **Uso sin conexión:** agregar un service worker para que las líneas de emergencia carguen sin internet.
- **Auditoría de accesibilidad formal (WCAG 2.2):** aplicamos buenas prácticas, pero no hicimos una auditoría completa.
- **Validar el lenguaje con la Secretaría de Salud,** sin pruebas con público mientras el reto no lo permita.
- **Escalar a otros municipios del Meta:** el modelo funciona cambiando `servicios.json` y `lugares.json`.

## 6. Cómo está organizado el código

```
src/
  data/servicios.json   ← directorio de líneas: único lugar donde se editan
  data/lugares.json     ← lugares del mapa (REPS), con fuente, fecha y origen del punto
  data/recursos.json    ← guías informativas con fuentes
  logic/                ← reglas (vigencia, orientador); aquí viven las salvaguardas
  components/           ← interfaz React
  styles.css            ← toda la identidad visual (colores, tipografía, modos claro y oscuro)
public/marca/           ← logo, favicon e íconos
public/robots.txt       ← permiso de indexación para buscadores (ver sección 7)
scripts/                ← genera la tabla de resultados de `npm run evidencia`
tests/                  ← 24 casos de prueba con datos sintéticos
docs/                   ← entregables de la hackathon
docs/evidencia/         ← resultados de las pruebas y 11 capturas de la app (escritorio y móvil)
```

`dist/` y `node_modules/` aparecen en el editor, pero no se suben al repositorio: se crean con `npm run build` y `npm install`.

**Reglas para trabajar juntos:**

- Antes de cambiar algo en `src/logic/` o en los archivos de `src/data/`, corre `npm test`. Los 24 casos deben seguir pasando.
- Si cambia algo visible, actualiza las capturas de `docs/evidencia/capturas/` para que muestren la app actual.
- Los textos de las preguntas no pueden pedir síntomas, diagnósticos, nombres ni edades: el caso CP-17 lo verifica.
- Cada cambio que venga de una mentoría se anota en `docs/03-registro-fuentes-y-cambios.md`.
- No subir datos personales, datos de salud reales ni llaves o contraseñas.

## 7. SEO: qué es y qué falta

**SEO** (optimización para buscadores) es preparar la página para que Google la entienda y la muestre bien cuando alguien busque, por ejemplo, "apoyo emocional Villavicencio", y para que al compartir el enlace por WhatsApp salga una vista previa con título y descripción. No cambia nada de lo que ve la persona en la app.

**Ya está hecho** (en `index.html` y `public/robots.txt`):

- Título y descripción claros para el resultado de búsqueda.
- Etiquetas Open Graph: título y descripción de la vista previa al compartir.
- Datos estructurados (JSON-LD) que describen la herramienta como aplicación web gratuita para Villavicencio, no como servicio de salud.
- Texto de respaldo para buscadores y para quien no tenga JavaScript (sin teléfonos, porque esos solo se muestran con verificación vigente).
- `robots.txt` que permite indexar todo el sitio.

**Falta cuando tengamos dominio** (todo está marcado con `DOMINIO` en `index.html` y `robots.txt`):

1. Agregar la URL canónica, `og:url` y `og:image` con la dirección real.
2. Crear `public/sitemap.xml` y enlazarlo en `robots.txt`.
3. Registrar el sitio en Google Search Console para que Google lo encuentre antes.

## 8. Herramientas usadas

El código, las pruebas y los documentos se hicieron con apoyo de Claude (Anthropic), un asistente de IA, y el equipo revisó todo. Eso ya está declarado en `docs/05-declaracion-del-equipo.md`, como pide el reto. La app no usa IA mientras funciona.

---

¿Dudas? Hablemos en el canal del equipo antes de cambiar la estructura o la lógica.
