# 5. Declaración del equipo

**Equipo:** DevSystems
**Integrantes:** Wilson Solano · Alejandro Diaz · Carlos Arciniegas
**Categoría:** 2 · Joven (18 a 28 años) · Reto Mente Sana Joven

## Trabajo previo

No hay trabajo previo. El proyecto se inició el 20 de octubre de 2026, después del kickoff.

## Herramientas utilizadas

| Herramienta | Uso | Licencia |
|---|---|---|
| Claude (Anthropic), asistente de IA | Apoyo en código, pruebas y redacción de documentos. Todo el contenido fue revisado por el equipo. | Servicio comercial (términos de Anthropic) |
| Visual Studio Code | Editor | MIT (código base) / licencia de Microsoft |
| Node.js | Entorno de ejecución | MIT |
| Git | Control de versiones | GPL-2.0 |
| Microsoft Edge (Chromium, modo sin ventana) | Capturas automatizadas de la interfaz | Licencia de Microsoft |

Claude es el único asistente de IA que usamos; lo demás sale de lo que sabemos como equipo y de la mentoría con Duván Alberto Rozo Parra (ver `docs/03-registro-fuentes-y-cambios.md`). También usamos GitHub para compartir el repositorio.

> La IA **no** forma parte del producto. La app no usa IA en tiempo de ejecución: el orientador es un árbol de reglas fijo.

## Componentes de terceros incluidos en el prototipo

| Componente | Versión | Licencia |
|---|---|---|
| React / React DOM | 18.3.1 | MIT |
| Vite | 5.4.10 | MIT |
| @vitejs/plugin-react | 4.3.3 | MIT |
| TypeScript | 5.6.3 | Apache-2.0 |
| Vitest | 2.1.4 | MIT |
| Fuente Atkinson Hyperlegible Next (Google Fonts) | — | SIL Open Font License 1.1 |
| Fuente Literata (Google Fonts) | — | SIL Open Font License 1.1 |
| Mapa insertado de Google Maps (solo se carga si la persona lo acepta) | — | Términos de servicio de Google Maps |

## Datos

- **Datos de contacto:** públicos. El 106 y Yo Te Escucho salen de MinSalud (página de la Línea 106 y directorio nacional de líneas territoriales, agosto 2025); el 123, de la regulación de la Comisión de Regulación de Comunicaciones. Cada uno tiene enlace y fecha en `src/data/servicios.json`.
- **Lugares del mapa:** públicos, del Registro Especial de Prestadores (REPS) de MinSalud en datos.gov.co. Las coordenadas salen del sitio oficial del hospital, de OpenStreetMap (licencia ODbL) o de un directorio público, y se indica cuál en cada lugar.
- **Datos de prueba:** 100 % sintéticos (`tests/escenarios.ts`).
- **No se usan** datos personales, datos de salud reales ni credenciales. El repositorio no contiene llaves API.

## Licencia del proyecto

El código se publica bajo licencia MIT. La propiedad intelectual sigue siendo del equipo, como establecen las reglas de la Hackathon.
