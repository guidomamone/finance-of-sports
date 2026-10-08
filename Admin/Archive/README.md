# Admin/Archive — documentos cerrados

Lo que ya no se actualiza y no se borra.

Un documento llega acá cuando cumplió su función entera y su contenido pasó a ser historia, no
instrucciones: un plan cuyos puntos están todos cerrados, una sección que ahora se genera desde los
datos. **No es la papelera**: lo que está mal o sobra se borra (su historia queda en
`Admin/CHANGELOG.md`), lo que está bien pero ya no manda se archiva.

**Antes de archivar algo, sacale lo que todavía sirve** y llevalo a donde se lee: un criterio vivo va
a `Admin/CONVENCIONES.md` o a la skill que corresponda, un pendiente va a `Admin/TODO.md`. Si no
queda nada que rescatar, no hacía falta archivarlo.

**Lo de acá adentro se lee como historia.** Las rutas, los números y los nombres de función son los
del día en que se congeló cada archivo, y varios ya no existen. Cada uno arranca con un banner que
dice de qué Versión es.

Qué hay hoy:

- `PLAN-REMEDIACION-ESCALA.md` — el plan de ejecución de los hallazgos de escala del 2026-09-17.
  Sus 8 puntos se cerraron entre las Versiones 158 y 165. Archivado en la 196.
- `QUE-ES-REAL-historico.md` — la sección "qué es real por club" escrita a mano, tal como estaba
  hasta la Versión 120. Hoy se genera con `node tools/generate-club-index.js`. Archivado en la 196.
- `pilotos/` — listas de PDFs de los pilotos del pipeline de las Versiones 305-306 (2026-09-29/30). Ya cumplieron su función; los resultados de cada piloto están en `Admin/CHANGELOG.md`.
- `MAPA-DE-TOOLS.md` — lista de las tools con una línea por cada una (2026-09-30). Guido no lo usaba; lo que importa de ahí (qué tools usa el proceso) está en `Admin/HANDOFF-pipeline.md`, y cada tool se explica en su cabecera. Archivado en la 327.
- `HANDOFF-pipeline-hasta-2026-10-01.md` — el HANDOFF del pipeline tal como estaba hasta la Versión 326 (421 líneas: historia de pilotos, números medidos, trampas). Se reescribió corto para que Guido lo lea; el texto viejo queda acá entero. Archivado en la 327.
- `club-or-year-onboarding-hasta-V470.md` — el skill de onboarding tal como estaba hasta la Versión 470, cuando onboardear era un proceso manual. Hoy el onboarding es el pipeline (`Admin/PIPELINE.md`); arriba tiene la tabla de a dónde fue cada sección (`Admin/ARQUITECTURA.md`, `Admin/PANTALLA.md`, `club-nuevo.md` del skill, `Admin/CONVENCIONES.md`). Archivado en la 471.
- `HANDOFF-pipeline-hasta-2026-10-04.md` — el HANDOFF corto, al terminar la mudanza: cómo se trabaja pasó al skill `club-or-year-onboarding`, el proceso a `Admin/PIPELINE.md`, los descartes a `Admin/HALLAZGOS-pipeline.md` y los pendientes a `Admin/TODO.md`. Archivado en la 473.
- `todos-cerrados-onboarding-manual.md` — los to-dos 98, 105, 85, 89 y 108 del onboarding manual, cerrados por el pipeline; tal cual estaban, porque varios archivos los citan por número. Archivado en la 475.
- `convenciones-historia.md` — dos textos de `Admin/CONVENCIONES.md` que ya no mandaban: la regla de la Versión 49 (reemplazada por la 189) y la copia del párrafo de `netlify.toml` de `CLAUDE.md`. Archivado en la 477.
- `todo-sacados-2026-09-14.md` — la lista de puntos que Guido sacó del TODO el 2026-09-14 (onboarding de ejercicios faltantes, Mercado de Pases, sourcing por país, dominio y repo, cards de presupuesto, payload de `data/`, free/paid), con el motivo de cada uno. Estaba en el encabezado de `Admin/TODO.md`. Archivado el 2026-10-04.
- `estado-historia.md` — tres textos de `Admin/ESTADO.md` que eran historia (por qué es un archivo, el retiro de los placeholder, la copia del párrafo de netlify). Archivado en la 485.
- `CLAUDE-md-hasta-2026-10-04.md` — `CLAUDE.md` antes de achicarlo de 30 a 6 KB; arriba dice a dónde se mudó cada parte viva. Archivado en la 486.
- `test-barridos.md` — el A/B test de barridos de sourcing (2026-09-26). La conclusión está en el skill `club-sourcing`, 0.1b. Archivado el 2026-10-06 (to-do 109).
- `test-costo-transcripcion.md` y su carpeta `test-costo-transcripcion/` — el test de costo y calidad de transcripción (2026-09-26). El criterio está en `Admin/PIPELINE.md`, "Documentos fuente". Archivado el 2026-10-06 (to-do 109).
- `inventario-pendiente.md` — foto del 2026-09-25 de lo que faltaba transcribir y cargar; la reemplazó `Admin/transcripciones-estado.jsonl`. Archivado el 2026-10-06 (to-do 109).
- `lotes/` — las listas de los lotes del pipeline ya corridos (`lote-01` a `lote-13i`, 2026-10-01 a 10-04) y `juventus-etapa2.txt`. Los lotes nuevos se siguen creando en `Admin/lote-NN.txt`; al cerrarlos, vienen acá. Archivado el 2026-10-06 (to-do 109).
- `prompts/` — los prompts de sourcing de Italia y de las regiones (2026-10-03), ya usados. Archivado el 2026-10-06 (to-do 109).
- `tests/` — variantes viejas de las mediciones de `Admin/tests/` (`test-proponer-carga_F_*`, `_filtro*`, `_v1_mdviejo`, `test-jev-resultados_base/_lado/_lado_ejemplos`). Las versiones vigentes siguen en `Admin/tests/`, donde las escriben las tools. Archivado el 2026-10-06 (to-do 109).
- `medicion-caja-deuda-ia.txt` — la salida de una medición de caja y deuda con IA (2026-10-01). Archivado el 2026-10-06 (to-do 109).
- `auditoria-pipeline-2026-10-02.md` — la auditoría del pipeline del 2026-10-02; sus propuestas pasaron al TODO y a `Admin/PIPELINE.md`. Archivado el 2026-10-06 (to-do 109).
- `selector-merge-a-produccion.md` — era `Prototyping/Selector/MERGE-A-PRODUCCION.md`: cómo se llevó el prototipo 4 del selector a producción. Archivado el 2026-10-06 (to-do 109).
- `CHANGELOG-v010-v299.md` — la primera parte de `Admin/CHANGELOG.md`: Versiones 10 a 299 (sourcing y onboarding manual, antes del pipeline), de la más nueva a la más vieja. Archivado en la 598.
