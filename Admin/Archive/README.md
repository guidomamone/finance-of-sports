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
- `club-or-year-onboarding-hasta-V470.md` — el skill de onboarding tal como estaba hasta la Versión 470, cuando onboardear era un proceso manual. Hoy el onboarding es el pipeline (`Admin/PIPELINE.md`); arriba tiene la tabla de a dónde fue cada sección (`Admin/ARQUITECTURA.md`, `Admin/PANTALLA-FINANZAS.md`, `club-nuevo.md` del skill, `Admin/CONVENCIONES.md`). Archivado en la 471.
