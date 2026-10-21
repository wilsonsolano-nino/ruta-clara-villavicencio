# Ruta Clara Villavicencio

**La ayuda correcta, más cerca.** Prototipo TRL 4 para el reto **Mente Sana Joven** de la Hackathon Villavicencio 2026.

> ¿Cómo podemos ayudar a jóvenes de Villavicencio a encontrar información confiable, entender las rutas de apoyo disponibles y llegar a ellas a tiempo?

Ruta Clara Villavicencio es una web app instalable (PWA) que acorta la distancia entre un joven y el canal oficial de apoyo adecuado. **No diagnostica, no evalúa riesgo y no es un servicio de salud.** Solo orienta hacia servicios humanos oficiales, y cada dato lleva su fuente y fecha de verificación.

## Funciones críticas (las que demuestran TRL 4)

| # | Función | Qué la hace distinta |
|---|---|---|
| 1 | **Directorio verificado con vigencia** | Cada teléfono o ruta guarda fuente oficial, fecha y responsable de verificación. A los 24 días se marca "por renovar". A los 31 días **se oculta el contacto** de forma automática. Los datos sin fuente nunca se muestran. |
| 2 | **Orientador por tipo de consulta** | Hace 2 preguntas: qué buscas y cómo prefieres comunicarte. No pregunta síntomas. Es un árbol de reglas transparente que explica "por qué te mostramos esto". |
| + | **Reporte de dato caído** | Cualquier persona reporta un número o enlace que falla. El dato queda "en revisión", baja de prioridad y aparece en el panel del equipo verificador, que lo puede exportar a CSV. El formulario bloquea teléfonos, correos y documentos para cumplir con cero datos personales. |

## Cómo ejecutarlo

Requisitos: Node.js 18 o superior.

```bash
npm install
npm run dev        # abre http://localhost:5173
npm test           # corre los 26 casos de prueba
npm run evidencia  # regenera docs/evidencia/resultados-pruebas.md
npm run build      # genera /dist para publicar (Vercel, Netlify, GitHub Pages)
```

**Modo demostración (para el jurado):** en el pie de página, el enlace "Panel del equipo verificador (demo)" abre la vista del operador (`#verificador`). Ahí se simula la fecha: con una fecha posterior al 18 nov 2026, los datos vencidos se ocultan solos. Mientras la fecha simulada está activa, una franja amarilla lo indica en todas las pantallas.

Cada vista tiene su URL (`#orientar`, `#directorio`, `#como`, `#verificador`), así que el botón "atrás" del celular funciona.

## Estructura

```
src/
  data/servicios.json      ← directorio: único lugar donde se editan los datos
  logic/vigencia.ts        ← regla de salvaguarda (fuente + fecha + 30 días)
  logic/orientador.ts      ← árbol de decisión sin evaluación de riesgo
  logic/reportes.ts        ← reportes de datos caídos y filtro de datos personales
  components/              ← interfaz React accesible (PanelVerificador = vista del operador)
tests/                     ← 26 casos de prueba con datos sintéticos
docs/                      ← entregables de la hackathon
```

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

Este es un prototipo académico, probado solo con datos sintéticos y escenarios ficticios. No es un servicio de salud. Si tú o alguien necesita apoyo: **Línea 106** (24/7) · **Yo Te Escucho Villavicencio 316 390 7010** (llamada y WhatsApp, 24/7). Fuente: Directorio de salud mental y prevención del suicidio, MinSalud, consultado el 19 oct 2026.
