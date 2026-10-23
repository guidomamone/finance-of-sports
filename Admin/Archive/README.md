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
- `convenciones-antes-de-podar.md` — copia íntegra de `Admin/CONVENCIONES.md` antes de podarla (402): el circuito de tres sesiones con worktrees, la historia de por qué los documentos internos van en `Admin/` y el índice de reglas mudadas.
- `convenciones-historia.md` — dos textos de `Admin/CONVENCIONES.md` que ya no mandaban: la regla de la Versión 49 (reemplazada por la 189) y la copia del párrafo de `netlify.toml` de `CLAUDE.md`. Archivado en la 477.
- `todo-sacados-2026-09-14.md` — la lista de puntos que Guido sacó del TODO el 2026-09-14 (onboarding de ejercicios faltantes, Mercado de Pases, sourcing por país, dominio y repo, cards de presupuesto, payload de `data/`, free/paid), con el motivo de cada uno. Estaba en el encabezado de `Admin/TODO.md`. Archivado el 2026-10-04.
- `estado-historia.md` — tres textos de `Admin/ESTADO.md` que eran historia (por qué es un archivo, el retiro de los placeholder, la copia del párrafo de netlify). Archivado en la 485.
- `CLAUDE-md-hasta-2026-10-04.md` — `CLAUDE.md` antes de achicarlo de 30 a 6 KB; arriba dice a dónde se mudó cada parte viva. Archivado en la 486.
- `test-barridos.md` — el A/B test de barridos de sourcing (2026-09-26). La conclusión está en el skill `club-sourcing`, 0.1b. Archivado el 2026-10-06 (to-do 109).
- `test-costo-transcripcion.md` y su carpeta `test-costo-transcripcion/` — el test de costo y calidad de transcripción (2026-09-26). El criterio está en `Admin/PIPELINE.md`, "Documentos fuente". Archivado el 2026-10-06 (to-do 109).
- `inventario-pendiente.md` — foto del 2026-09-25 de lo que faltaba transcribir y cargar; la reemplazó `Admin/transcripciones-estado.jsonl`. Archivado el 2026-10-06 (to-do 109).
- `lotes/` — las listas de los lotes del pipeline ya corridos (`lote-01` a `lote-65`) y `juventus-etapa2.txt`. Los lotes abiertos y las listas de prueba están en `Admin/lotes/`; al cerrar un lote, su lista viene acá. Archivado el 2026-10-06 (to-do 109).
- `prompts/` — los prompts de sourcing de Italia y de las regiones (2026-10-03), ya usados. Archivado el 2026-10-06 (to-do 109).
- `tests/` — variantes viejas de las mediciones de `Admin/mediciones/` (antes `Admin/tests/`) (`test-proponer-carga_F_*`, `_filtro*`, `_v1_mdviejo`, `test-jev-resultados_base/_lado/_lado_ejemplos`). Las versiones vigentes siguen en `Admin/mediciones/`, donde las escriben las tools. Archivado el 2026-10-06 (to-do 109).
- `medicion-caja-deuda-ia.txt` — la salida de una medición de caja y deuda con IA (2026-10-01). Archivado el 2026-10-06 (to-do 109).
- `auditoria-pipeline-2026-10-02.md` — la auditoría del pipeline del 2026-10-02; sus propuestas pasaron al TODO y a `Admin/PIPELINE.md`. Archivado el 2026-10-06 (to-do 109).
- `selector-merge-a-produccion.md` — era `Prototyping/Selector/MERGE-A-PRODUCCION.md`: cómo se llevó el prototipo 4 del selector a producción. Archivado el 2026-10-06 (to-do 109).
- `CHANGELOG-v010-v299.md` — la primera parte de `Admin/CHANGELOG.md`: Versiones 10 a 299 (sourcing y onboarding manual, antes del pipeline), de la más nueva a la más vieja. Archivado en la 598.
- `CHANGELOG-v300-v672.md` — la segunda parte: Versiones 300 a 672 (2026-09-30 al 2026-10-12). Archivado en la 846 (to-do 256: el CHANGELOG guarda solo la última semana).
- `sesion-pantallas-2026-10-17.md` — el cierre de la sesión `pantallas` (worktree): qué cambió, qué quedó y qué dejó de ser cierto. Pasado a TODO, CHANGELOG y ESTADO. Archivado en la 712.
- `sesion-datos-sourcing-2026-10-18.md` — el cierre de la sesión `datos-sourcing`: faltantes por liga, listas, estimados, y el formato de `data/faltantes/` y `data/estimados/` para pantallas (lo cita el to-do 275). Archivado en la 714.
- `sesion-onboarding-2026-10-18.md` — el cierre de la rama `onboarding`: limpieza de las transcripciones por subagentes, gestiones, altas y los to-dos 280 a 287. Archivado en la 715.
- `sesion-pipeline-2026-10-18.md` — el cierre de la sesión `pipeline`: ajuste por año, deuda italiana, Batch API y los to-dos 288 a 291. Archivado en la 716.
- `sesion-pantallas-2026-10-18.md` — copia del cierre de pantallas (293, 275, 274, 272 y el estimado de club nuevo), pasada en la 718; la rama siguió con el 271 y el grupo.
- `sesion-finanzas-2026-10-18.md` — copia del cierre de finanzas (280 y el dato del 281), pasada en la 719; la rama siguió con 281, 282 y 242.
- `sesion-pantallas-2026-10-18-b.md` — segunda copia del cierre de pantallas (el grupo en la URL y el 271), pasada en la 720.
- `sesion-finanzas-2026-10-18-c.md` y `sesion-pantallas-2026-10-18-c.md` — copias de los cierres en el merge de la 721 (281 pantalla, 282 dato).
- `sesion-finanzas-2026-10-18-final.md` — el cierre completo de la sesión finanzas (280 a 282, 294). Archivado en la 724.
- `sesion-datos-sourcing-2026-10-18-b.md` — copia del cierre de datos-sourcing (276, 277 y el 273), pasada en la 725; la rama siguió abierta.
- `sesion-finanzas-2026-10-18-2.md` y `sesion-onboarding-2026-10-18-2.md` — copias de los cierres de la segunda sesión de finanzas (294 a y b) y de onboarding (Estonia y Bélgica, mejoras de script del 298), pasadas en la 727.
- `sesion-datos-sourcing-2026-10-18-c.md` y `sesion-pantallas-2026-10-18-d.md` — copias de los cierres en el merge de la 728.
- `sesion-onboarding-2026-10-18-3.md` — copia del cierre de onboarding en el merge de la 729 (Estonia en Ligas).
- `sesion-pantallas-2026-10-18-e.md` — copia del cierre de pantallas en el merge de la 731 (297 y 253).
- `sesion-finanzas-2026-10-18-3.md` y `sesion-pantallas-2026-10-18-f.md` — copias de los cierres en el merge de la 732 (auditoría completa y el alcance).
- `sesion-datos-sourcing-2026-10-18-d.md` — copia del cierre de datos-sourcing en el merge de la 733 (252).
- `sesion-proyecto-2026-10-18.md` — copia del cierre de proyecto (250 y 244), pasada en la 737; la rama siguió con el 300.
- `sesion-pipeline-2026-10-18-b.md` y `sesion-pantallas-2026-10-18-g.md` — copias de los cierres en el merge de la 738.
- `consolidar-reglas-255.md` — inventario del to-do 255 (reglas repetidas y contradichas, las 27 propuestas aplicadas y los 12 chequeos que quedan en el 327). Archivado en la 853.
- `carga-con-tokens-328.md` — propuesta del to-do 328 (cómo se hacía, las 4 tools y el texto aprobado). Aplicada en `club-or-year-onboarding/carga-con-tokens.md`. Archivado en la 863.
- `245-246-cambios-skills.md` — los 18 cambios a skills por el 245 y el 246 (Datos 3), aplicados con el ok de Guido. Archivado en la 876.
- `sesion-ligas-2026-10-21.md`, `sesion-pantallas-2026-10-21.md`, `sesion-pipeline-2026-10-21.md` y `sesion-onboarding-2026-10-21.md` — las notas acumuladas de las sesiones Auditora 6, Pantallas 7, Pipeline 15 y Onboarding 9 (venían de `Admin/sesiones/`), pasadas a TODO (362, 363, 364 y los puntos 347, 350, 356, 358, 359), CHANGELOG y ESTADO en la Versión 934. Archivadas en la 934.
- `ux-del-sitio.md`, `ux-casos-360.md`, `ux-excepcion-etiquetas.md`, `ux-excepcion-texto-corrido.md` y `una-sola-sesion.md` — propuestas de `Admin/propuestas/` ya aplicadas (la guía de UX y sus excepciones en `referencia/ux.md` de la skill de pantallas; el modo una sola sesión en la skill principal). Archivadas en la 934.
- Cuatro registros sin lector, venían de `Admin/registros/` (`registro-sin-lector`, Auditora 6, 2026-10-21): `caja-deuda-resto.log` (salida de la corrida de `caja-deuda.mjs` del resto de los países, 2026-10-16); `altas-borrador-portugal.jsonl` (borradores de alta de 27 clubes portugueses; 26 ya están cargados, Feirense todavía no: su línea tiene el nombre legal y los cierres); `triage-cola-2026-10-20.md` y `triage-dudas-2026-10-20.md` (triage de la cola y de las dudas de carga: los (a) se contestaron, los (b) se cerraron el mismo día; los registros que los citan por nombre los encuentran acá).
