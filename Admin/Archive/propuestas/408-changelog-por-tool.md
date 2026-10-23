> **ARCHIVADO el 2026-10-23** al cerrar el punto 408: lo que servía quedó en `Admin/PIPELINE.md`, `Admin/HALLAZGOS-pipeline.md` o el CHANGELOG. Las rutas y números son los de ese día.

<!-- md: propuesta del punto 408, el CHANGELOG organizado por tool para grepear qué tool tuvo problemas | leer: antes de tocar el formato del CHANGELOG, fos cerrar o su archivado -->
# 408 — El CHANGELOG por tool

**Objetivo (Guido).** Si mañana una tool falla, `grep` dice en una línea qué entradas la tocaron y la sesión sabe qué leer sin abrir el archivo.

## Qué pasa hoy

- 321 entradas (versiones 673 a 993), 242 KB; la cabecera dice «la última semana» y ninguna tool archiva. Las mayores pasan de 5 KB.
- El título ya lleva `[to-dos · clubes]`; las **tools** solo aparecen dentro del texto, mezcladas con otras palabras (`grep cola.mjs` devuelve párrafos, no títulos).
- Nada comprueba que una entrada exista para cada tool que se tocó: `fos cerrar` solo mira que el id del to-do figure en las primeras 90 líneas.

## Qué se hace en proyectos parecidos (no se reinventa)

- **Keep a Changelog**: entradas para humanos, cortas, agrupadas por tipo (cambió, arregló, sacó), con la versión y la fecha.
- **Conventional Commits** (`fix(cola): …`): el *scope* nombra la pieza que cambió y de ahí se genera el changelog, en vez de escribirlo de memoria.
- **ADR / registro de decisiones**: el porqué largo vive aparte y se enlaza. Acá ya existe: `finance-of-sports-project.md`, `HALLAZGOS-pipeline.md`.
- Lo que se repite en todos: **lo estructurado se deriva de la fuente (git), lo narrativo es corto y tiene tope**.

## La propuesta

1. **Formato del título** (extiende el que ya existe): `## Versión N — título (fecha) [ids · tools · clubes]`, con las tools por su nombre de archivo
   (`cola.mjs`, `cargar.mjs`). Un `grep "cola.mjs" Admin/CHANGELOG.md Admin/Archive/CHANGELOG*.md` devuelve solo títulos, como hoy con los clubes.
2. **Las tools se derivan, no se recuerdan.** `fos cerrar <id>` mira los commits desde la última entrada (`git diff --name-only` de `tools/`) y pega las tools
   en el título; si el título no las nombra, el cierre falla con ✗.
3. **Cuerpo con tope y campos fijos**: hasta 4 bullets y 1.500 caracteres; el último bullet siempre empieza con `Medición:` (idéntico o la diferencia explicada); un
   único `Nota:` libre de hasta 200 caracteres. Lo que no entra va a `HALLAZGOS-pipeline.md` (descarte medido) o `finance-of-sports-project.md` (el porqué), enlazado.
4. **`node tools/fos.mjs historial <tool>`**: imprime las entradas de esa tool (título, commit, línea `Medición:`) de CHANGELOG y archivo, más los hallazgos de
   `HALLAZGOS-pipeline.md` y las mediciones de `Admin/registros/mediciones-pipeline.jsonl` que la nombran, y los commits (`git log --oneline -- tools/<tool>`).
   La sesión lee eso (unas 15 líneas) y solo después decide qué abrir. Es generado: no hay otro archivo que mantener.
5. **Archivado automático por mes**: `fos archivar-changelog` mueve las entradas de más de 14 días a `Admin/Archive/CHANGELOG-AAAA-MM.md` (mismo formato de título, así el
   grep con comodín las cubre). `audit.js` avisa si el CHANGELOG pasa de 60 KB.
6. **Chequeos en `audit.js`** (P3 hasta que la migración esté hecha): `changelog-entrada-larga` (más de 1.500 caracteres), `changelog-sin-tool`
   (hay un commit con `tools/` desde la última entrada que no está en ningún título).
7. **Migración de lo viejo** (una vez, con `--ensayo`): una tool lee cada entrada de la 673 a la 993 y suma al título las tools que el texto nombra
   (`tools/x.mjs`, `x.mjs`). Es una aproximación (nombrada ≠ modificada): se marca con `~` (`[407 · ~cola.mjs]`) para no hacerla pasar por derivada de git.

## Pros y contras

| Decisión | Pro | Contra |
|---|---|---|
| Tools en el título | Una línea por entrada al grepear; ya es el patrón de ids y clubes; costo de lectura mínimo | Los títulos se alargan; una entrada que toca 8 tools queda larga (se acepta: se muestran hasta 5 y «+3») |
| Derivarlas de git | No dependen de la disciplina de la sesión; nunca se olvidan | Un cambio hecho en dos commits o sin commit al cerrar no se ve; un commit que toca una tool sin relación la mete en el título |
| Tope de tamaño y campos | La entrada se lee entera; el grep de `Medición:` da el resultado de cada cambio | Lo que no entra se pierde si no se manda a HALLAZGOS o al diario (se enlaza desde el campo `Nota:`) |
| Campo libre `Nota:` de 200 caracteres | Guarda el matiz que ningún campo prevé sin abrir la puerta al braindump | Alguien lo usa para todo; por eso el tope lo cuenta `audit.js` |
| `fos historial` (generado) | Cero mantenimiento; siempre al día; junta changelog, hallazgos, mediciones y commits en 15 líneas | Una tool más; si cambia el formato del CHANGELOG hay que tocarla |
| Solo `git log -- tools/<x>` | Nada nuevo que escribir | Los mensajes de commit no son homogéneos, no traen el porqué ni la medición, y un `fos mover` rompe el rastro |
| Archivo mensual | El CHANGELOG vuelve a ser corto (grep rápido, lectura posible) | La historia queda en varios archivos (se resuelve con el comodín en el grep) |
| Migrar lo viejo con `~` | El historial de 321 entradas también sirve | Hay falsos positivos (una tool nombrada de pasada); por eso el `~` |

## Orden y costo

1. `fos historial <tool>` y la derivación en `fos cerrar` (lo que da valor ya). 2. Archivado y migración con `--ensayo`. 3. Chequeos de `audit.js`.
Cada paso es una tool que no toca el pipeline de carga (no pasa por `medir pipeline`); se prueba con `fos probar` y una entrada de ejemplo.

## Decisión que es de Guido

El tope de 1.500 caracteres por entrada y la ventana de archivado (14 días); el resto lo decide la sesión.
