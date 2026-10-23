<!-- md: propuesta del punto 410, leer menos al arrancar una sesión sin perder criterio | leer: antes de tocar el arranque (CLAUDE.md, ESTADO.md, la skill de arranque) -->
# 410 — Leer menos en vano al arrancar

**Medido (2026-10-23, una tarea de Pipeline).** Lo que se carga o se lee antes de la primera línea de trabajo:

| Documento | Tamaño | Lo que se usó para la tarea |
|---|---|---|
| `CLAUDE.md` (carga solo) | 12,6 KB | las reglas de Pipeline, medir, commit y cierre; el resto (sourcing, mails, deploy, gotchas de preview) no |
| `Admin/ESTADO.md` (lo pide CLAUDE.md siempre) | 17,3 KB | 2 de 11 secciones: «Pipeline» (4 líneas) y «Dónde vive cada cosa». El resto es pantalla, Ligas, Comparar, analytics y licencia |
| skill `start-session-…` (la pide CLAUDE.md siempre) | 7,5 KB | nada: su primera línea manda a la skill de onboarding para tareas de pipeline |
| skill `club-or-year-onboarding/SKILL.md` + `mejorar-script.md` | 8 KB | todo |

Unos 25 KB (≈6 mil tokens) por sesión, de los que ≈20 KB no cambiaron ninguna decisión. En una sesión larga con compactaciones ese texto se vuelve a cargar cada vez.

## Qué se hace en proyectos parecidos

- **Carga progresiva** (como los `AGENTS.md`/`CLAUDE.md` anidados y los skills con descripción corta): un archivo de entrada corto que dice dónde buscar, y el detalle se carga por tarea.
- **Un índice por rol**: cada rol lee el mismo mapa y de ahí va a lo suyo; no hay un documento «para todos».

## Propuesta

1. **`fos estado <rol>`** (nueva, gratis): imprime de `ESTADO.md` solo las secciones del rol. Pipeline: «Pipeline» + «Dónde vive cada cosa»; Pantallas: «Finanzas multi-año», «Inicio, Ligas y navegación», «Comparar»; Sitio/deploy: «Sitio, publicación y analytics»; Sourcing: «Qué falta de cada liga». Las secciones se marcan con un comentario `<!-- roles: pipeline, orden -->` bajo cada título, así el mapa vive en el propio documento. Sin rol imprime los títulos y el tamaño de cada sección.
2. **`CLAUDE.md`, «Al empezar»**: «leer `Admin/ESTADO.md`» pasa a «`node tools/fos.mjs estado <rol>`» (el rol ya se dice en la primera línea de la tarea). Un arranque en frío sin rol lee los títulos (1 KB) y elige.
3. **La skill de arranque se salta cuando el rol es Pipeline u Onboarding**: ya lo dice su propia primera línea; `CLAUDE.md` pasa a decirlo también («Pipeline y Onboarding: solo `club-or-year-onboarding`»).
4. **No se toca el contenido de `ESTADO.md`** (sigue siendo un snapshot completo); solo se agregan las marcas de rol. Las skills no se editan sin tu lectura del diff: el cambio de la skill de arranque, si hace falta, va en un commit aparte.

Ahorro esperado en una tarea de Pipeline: ≈13 KB de `ESTADO.md` + 7,5 KB de la skill ≈ 5 mil tokens por sesión y por compactación.

## Pros y contras

| | Pro | Contra |
|---|---|---|
| `fos estado <rol>` | La sesión lee lo que le toca, el mapa está en el mismo documento (no hay un segundo archivo que se desfase) | Una sesión con un rol mal elegido se pierde una sección relevante (la lista de títulos sin rol lo cubre) |
| Saltar la skill de arranque | Ninguno de sus pasos aplica a Pipeline (el arranque propio está en onboarding) | Un paso que solo estuviera en esa skill (la regla de git) se pierde: ya está en `CLAUDE.md` y en onboarding |
| Marcas de rol en `ESTADO.md` | Auditables: `audit.js` puede avisar de una sección sin marca | Hay que mantenerlas al sumar una sección |

## Qué mido después

Los tokens que se leen en el arranque, antes y después, con el eje `tokens` de la Auditora (punto 402): este punto es un caso concreto de ese eje.
