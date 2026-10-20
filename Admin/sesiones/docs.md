# Cierre de DOCS 1 (to-do 245: preparar docs para la fase 2 + auditoría `codigo` y `docs`)

## Qué cambió (para CHANGELOG)

- `Admin/mediciones/auditoria-codigo-docs-2026-10-20.md`: auditoría de los ejes `codigo` y `docs`. Sin P0; un P1 de datos derivados (`faltantes-desfasado`); `auditAll()` TODO OK
  (313 clubes, 3.406 checks); consola sin errores propios.
- `Admin/mediciones/245-inventario-docs.md`: lista de lo que cambia en skills, `Admin/*.md`, `CLAUDE.md` y comentarios de `tools/` y `js/` el día de la fase 2 del 245,
  con archivo y línea, qué dice hoy y qué tendría que decir. Nada se aplicó: describiría algo que no existe.
- `Admin/ARQUITECTURA.md`: corregido lo que ya estaba desactualizado (el `<head>` no trae `boca-data.js`; la ruta de `loadClubData` lleva el país; `CLUB_DATA_SCRIPT_OVERRIDE` vive en
  `js/principal.js`; los data files no llevan comentarios). Seis reemplazos puntuales.

## Qué queda (para TODO)

Para que la principal lo agregue (la sesión no toca `TODO.md`): chequeos `json-no-valida` y `json-js-desfasado` en `tools/audit.js` antes de la fase 2; `ida-y-vuelta.mjs` listando los
4 clubes con avisos; check-in de outreach del 2026-10-24 (hoy escrito dentro de la skill `club-outreach`); extender `archivo-pesado` a los demás `Admin/*.md`.

## Para la principal (decisiones y ok pendientes)

- Skills: el texto exacto de S-1 (ruta sin país en `start-session`) y S-2 (check-in con fecha en `club-outreach`) está en el informe; esperan el ok de Guido. No edité ninguna.
- `netlify.toml:27`: comentario con "6 skills" (son 8). Texto en el informe (S-3). No lo toqué.
- `node tools/faltantes-liga.mjs` escribe en `data/`: lo corre quien pueda tocar `data/`.
- `Admin/dudas-por-club.md` nombra `resultado-N.json` (P2 `ruta-muerta`): decidir si se renombra o va a `tools/audit-ignore.json`.
- Para aplicar el inventario hay que fijar antes dos cosas (D1 y D2 del inventario): dónde vive el JSON fuente y si el sitio sigue cargando el JS generado.

# Cierre de DOCS 1, segunda tarea (to-do 255, fase 1: consolidar las reglas)

## Qué cambió (para CHANGELOG)

- `Admin/consolidar-reglas-255.md`: inventario de reglas repetidas o contradichas entre `CLAUDE.md`, las skills, las memorias y los `Admin/*.md`.
- Dedupes aplicados (5 reglas, solo `Admin/*.md`): `ASSET_V` (3 copias en `PANTALLA.md` y una en `ARQUITECTURA.md` quedaron en una), pasar PDFs del worktree
  (`CONVENCIONES.md` remite a `worktree.md` y deja de decir `rsync` a secas), el data file sin comentarios, dónde va un documento nuevo y lo cerrado se archiva
  (`CONVENCIONES.md` remite a `CLAUDE.md`).

## Qué queda (para TODO)

Fase 2 del 255: aplicar lo que Guido apruebe del inventario (19 propuestas de skill, `CLAUDE.md` y memoria), contestar las 9 preguntas, y decidir cuáles de los
12 chequeos de la sección 4 se hacen (hooks del 250 o `audit.js`).

## 255 fase 2 (DOCS 1)

- `CLAUDE.md`: en un worktree se deja la nota de sesión y la principal escribe TODO, CHANGELOG y ESTADO; `CONVENCIONES.md` se lee cuando la skill de la tarea lo pide (Q-1, Q-9).
- `Admin/CONVENCIONES.md`: la regla de rayas largas queda solo para el texto visible del sitio (Q-7).
- `Admin/consolidar-reglas-255.md`: sección 2 reescrita con el texto final de 27 propuestas (23 de skill, 4 de memoria) y sección 3 con las respuestas de Guido. Queda una pregunta nueva (R-1).

## To-do 328 (DOCS 1)

- `Admin/carga-con-tokens-328.md`: cómo se hace hoy una carga con tokens de sesión (el único precedente real es Aris 2022 y los `filas-a-mano`), el texto exacto para el ok de Guido
  (un renglón en `club-or-year-onboarding/SKILL.md` y un archivo nuevo `carga-con-tokens.md`) y 4 frenados para Pipeline. Nada probado de punta a punta.
