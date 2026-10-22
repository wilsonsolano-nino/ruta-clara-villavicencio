# Ruta Clara Villavicencio

**La ayuda correcta, más cerca.** Prototipo TRL 4 para el reto **Mente Sana Joven** de la Hackathon Villavicencio 2026, hecho por el equipo **DevSystems**: Wilson Solano, Alejandro Diaz y Carlos Arciniegas.

> ¿Cómo podemos ayudar a jóvenes de Villavicencio a encontrar información confiable, entender las rutas de apoyo disponibles y llegar a ellas a tiempo?

Ruta Clara Villavicencio es una página web (que también se puede agregar a la pantalla de inicio del celular) para que un joven encuentre rápido el canal oficial de apoyo que le sirve. **No diagnostica, no evalúa riesgo y no es un servicio de salud.** Solo lleva a servicios oficiales atendidos por personas, y cada dato dice de dónde salió y cuándo se revisó.

## Qué hace

| # | Función | Cómo funciona |
|---|---|---|
| 1 | **Directorio verificado con vigencia** | Cada teléfono guarda su fuente oficial, la fecha en que se revisó y quién lo revisó. A los 24 días aparece "por renovar" y a los 31 **el contacto se oculta solo**. Lo que no tiene fuente nunca se muestra. |
| 2 | **Orientador por tipo de consulta** | Dos preguntas: qué buscas y cómo prefieres comunicarte. No pregunta síntomas. Son reglas fijas, y la app explica "por qué te mostramos esto". |
| + | **Mapa de lugares de atención** | Instituciones de salud mental de Villavicencio habilitadas en el REPS de MinSalud, con la misma regla de fuente y fecha. También aparecen en el filtro "Presencial" del Directorio. Google Maps solo se carga cuando la persona lo pide; la app no usa su ubicación. |

## Cómo ejecutarlo

Requisitos: Node.js 18 o superior.

```bash
npm install
npm run dev        # abre http://localhost:5173
npm test           # corre los 24 casos de prueba
npm run evidencia  # corre las pruebas y regenera docs/evidencia/resultados-pruebas.md
npm run build      # genera /dist para publicar (Vercel, Netlify, GitHub Pages)
```

También tiene **Recursos** (guías cortas de autocuidado y de cómo acompañar a otra persona, con fuente y fecha), **preguntas frecuentes** en "Cómo funciona" y la **política de tratamiento de datos**, basada en la Ley 1581 de 2012 y el Decreto 1377 de 2013, en el pie de página.

La app no guarda nada de lo que hace la persona: no hay registro, formularios ni reportes; solo el navegador recuerda el modo oscuro si se activa. Necesita internet: no funciona sin conexión.

Cada vista tiene su URL (`#orientar`, `#directorio`, `#lugares`, `#recursos`, `#como`, `#privacidad`), así que el botón "atrás" del celular funciona.

## Estructura

```
index.html                 ← página de entrada, SEO y texto de respaldo
src/
  data/servicios.json      ← líneas de apoyo: único lugar donde se editan los teléfonos
  data/recursos.json       ← guías informativas, con fuentes y fecha de consulta
  data/lugares.json        ← lugares del mapa (REPS de MinSalud), con fuente, fecha y origen del punto
  logic/vigencia.ts        ← regla de salvaguarda (fuente + fecha + 30 días)
  logic/orientador.ts      ← árbol de decisión sin evaluación de riesgo
  components/              ← interfaz React accesible
public/                    ← logo, íconos, manifest y robots.txt (se copian tal cual a la web)
tests/                     ← 24 casos de prueba con datos sintéticos
scripts/                   ← convierte el resultado de las pruebas en la tabla de evidencia
docs/                      ← entregables de la hackathon y evidencia de pruebas
vite.config.ts             ← configuración de Vite (compilación) y Vitest (pruebas)
```

Solo `index.html`, `src/` y `public/` forman la web publicada (`npm run build` genera `dist/`). Lo demás es para desarrollar, probar y entregar.

## Entregables

| Entregable pedido | Dónde está |
|---|---|
| Prototipo funcional | Este repositorio (`npm run dev`) |
| Evidencia de pruebas | [docs/02-casos-de-prueba.md](docs/02-casos-de-prueba.md) · [resultados](docs/evidencia/resultados-pruebas.md) · [capturas](docs/evidencia/capturas) |
| Registro y fuentes | [docs/03-registro-fuentes-y-cambios.md](docs/03-registro-fuentes-y-cambios.md) |
| Plan de operación | [docs/04-plan-de-operacion.md](docs/04-plan-de-operacion.md) |
| Pitch de 5 minutos | [docs/06-guion-pitch.md](docs/06-guion-pitch.md) |
| Declaración del equipo | [docs/05-declaracion-del-equipo.md](docs/05-declaracion-del-equipo.md) |
| Problema y usuario | [docs/01-problema-y-usuario.md](docs/01-problema-y-usuario.md) |
| Cumplimiento de salvaguardas | [docs/07-salvaguardas.md](docs/07-salvaguardas.md) |

## Aviso

Esto es un prototipo para una hackathon, probado solo con datos inventados. No es un servicio de salud. Si tú o alguien necesita apoyo:

- **Emergencias: 123** (24/7, sin costo). Fuente: [Resolución CRC 5937 de 2020](https://cancilleria.gov.co/sites/default/files/Normograma/docs/resolucion_crc_5937_2020.htm).
- **Línea 106**, línea nacional de salud mental (24/7, gratuita). Fuente: [MinSalud](https://minsalud.gov.co/salud/publica/salud-mental/Paginas/linea-106.aspx).
- **Yo Te Escucho Villavicencio: 316 390 7010 o 01 8000 931 089** (llamada y WhatsApp, 24/7). Fuente: [Directorio Nacional de Líneas Territoriales de MinSalud, agosto 2025](https://www.minsalud.gov.co/sites/rid/Lists/BibliotecaDigital/RIDE/VS/PP/ET/directorio-salud-mental-prevencion-suicidio-minsalud.pdf).

Datos consultados el 21 oct 2026.

## Licencia

MIT © 2026 DevSystems (Wilson Solano, Alejandro Diaz, Carlos Arciniegas). Ver [LICENSE](LICENSE).
