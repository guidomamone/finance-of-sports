# Sesión `proyecto` (worktree fos-proyecto): cierre para la principal

To-dos de la sesión, en orden: 250 (hooks), 244 (licencia), 300 (auditoría programada).

## Qué cambió (para CHANGELOG)

- To-do 250, hooks de Claude Code: `.claude/settings.json` (nuevo, trackeado) llama a `tools/hooks/pre-tool.mjs` antes de cada Bash, Edit y
  Write, en todas las sesiones y worktrees (cada una con su copia; si el script no está, no hace nada).
  - `audit-antes-del-commit`: un `git commit` con cambios publicables corre `node tools/audit.js --quiet` (unos 15 s) y lo frena si da P0 o
    P1, con la salida de la auditoría. Si todo lo cambiado es interno (Admin/, .claude/, CLAUDE.md, auditorias/, Prototyping/), no audita.
    `[sin-audit]` en el mensaje del commit lo saltea, solo con el ok de Guido (un hallazgo que ya venía de main). Cubre también el aviso de
    ASSET_V: `audit.js` ya da P1 `asset-v-sin-subir` si cambió js/ o data/ sin tocar index.html.
  - `skills-con-ok`: escribir en `.claude/skills/` (Edit, Write, o un Bash con `sed -i`, `>`, `tee`, `mv`, `cp`, `rm`…) le pide permiso a
    Guido con el motivo, aun en modo automático. Leer (cat, grep, `sed -n`) no pregunta.
  - `push-con-ok`: `git push` le pide permiso a Guido cada vez (`git stash push` no).
  - `docs-de-la-principal`: en un worktree, escribir `Admin/TODO.md`, `CHANGELOG.md` o `ESTADO.md` se rechaza con el motivo y el
    `Admin/sesiones/<rama>.md` que corresponde. En la principal no hace nada.
  - `pdfs-con-ok`: borrar en `Clubes/` (rm, unlink, trash, `find -delete`) o un `git clean -x` le pide permiso a Guido.
  - Lo que no le toca a un chequeo sale en unos 20 ms sin llamar a git. Probado con el JSON del hook por stdin (cada caso, el que frena y el
    que no) y en vivo en esta sesión: los commits del 4 y el 5 pasaron por la auditoría, y una prueba que mencionaba ESTADO se frenó.
  - Los chequeos de Bash leen el texto del comando: un comando que solo MENCIONA una de esas rutas junto a algo que escribe (por ejemplo, una
    prueba con el JSON del hook adentro) también se frena. Es el precio de no parsear shell; pasó una vez probando.
- To-do 244, licencia (decisiones de Guido, 2026-10-18): el Formato simplificado bajo CC BY-NC 4.0 (libre citando, también en medios con
  publicidad; el uso comercial, la reventa, la descarga masiva u otra API necesitan licencia comercial). La API, cuando exista, es paga
  para todos y no se cobra nada más. Los documentos de los clubes y sus transcripciones no llevan la licencia del sitio; lo de Wikipedia
  va con CC BY-SA 4.0; el código, todos los derechos reservados. "Sin fines de lucro" sale de términos y privacidad.
  - `terminos.html`: sección "Licencia y reuso". `metodologia.html`: sección "Fuentes externas" (tabla dato / fuente / condiciones).
  - `Admin/fuentes-externas.md` (nuevo): de dónde sale cada dato externo, dónde vive en el repo y qué permiten los términos de cada
    fuente (leídos en su página, con la URL), y las consecuencias para la API.

## Decisiones de Guido (2026-10-18), para CONVENCIONES

- Una fuente externa nueva se suma a `Admin/fuentes-externas.md` (términos leídos en su página) antes de publicar datos que salgan de ella.

## Qué deja de ser cierto en ESTADO

- No deja nada falso, suma una línea (al lado de "Sesiones en paralelo"): "Hooks de Claude Code (`.claude/settings.json` →
  `tools/hooks/pre-tool.mjs`): audit.js antes de cada commit publicable (frena con P0/P1; `[sin-audit]` con el ok de Guido), y piden
  permiso editar skills, `git push` y borrar en `Clubes/`; en un worktree rechazan escribir TODO, CHANGELOG y ESTADO. Qué chequea cada
  uno: la cabecera del script."
- "Objetivo del proyecto": sigue siendo cierto que todo el sitio es gratis, pero ya hay licencia: el Formato simplificado bajo CC BY-NC
  4.0 y el uso comercial con licencia aparte; la API, si se hace, es paga para todos (`terminos.html`; fuentes y términos en
  `Admin/fuentes-externas.md`). El "plan pago" de la frase vieja (analítica avanzada + tweets) se reemplaza por eso.

## Qué queda (para TODO)

- 250 y 244: se borran (resueltos).
- Al 249 (API), sumarle: un ejercicio convertido con una cotización de BCRA, SII, Banco de Rusia o Bank of England (restringen el uso
  comercial) se sirve en la moneda del club o se pide permiso (`Admin/fuentes-externas.md`, "Consecuencias").
- Nuevo (pipeline): bajar el deflactor de EE.UU. directo de la BEA en vez de FRED, que prohíbe el scraping y guardar copias
  (`tools/fetch-fx-reference.mjs --deflactores`).
- Nuevo (pantallas): la pestaña Mercado de Pases muestra datos inventados ("Jugador A", montos de relleno) en Boca, River y Racing, con la
  nota "Fuente: Transfermarkt + reportes de club (placeholder)" (`index.html`). Esconderla o vaciarla hasta tener datos reales.
- Nuevo (pantallas): el pie de `index.html` dice "Proyecto personal, sin fines de lucro" (y `data/lang/en.js`, "non-profit"). Guido lo
  sacó de términos y privacidad; falta ahí (sube ASSET_V, por eso no se tocó en esta rama).
- Nuevo (sitio): la lista de ligas no muestra la cita de Wikipedia (sponsor y contexto sí): sumarla, con la licencia CC BY-SA.
- Las sesiones que ya estaban abiertas antes del merge toman los hooks recién en una sesión nueva (o cuando Claude Code relee
  `.claude/settings.json`); los worktrees, después del fast-forward.

## Después del merge del 2026-10-18

### Qué cambió (para CHANGELOG)

- To-do 300, auditoría programada (decisiones de Guido, 2026-10-18): tarea programada de Claude `fos-auditoria-semanal` (lunes 8:10,
  carpeta principal, rama main; vive fuera del repo, en `~/.claude/scheduled-tasks/fos-auditoria-semanal/SKILL.md`). En orden:
  `audit.js --quiet`; el dashboard de usuarios y visitas (`tools/dashboard-usuarios.mjs` y subir sus 4 archivos); el tablero del pipeline
  (`tools/tablero.mjs` y subir sus CSV); la auditoría de rutina de la skill `auditoria-finance-of-sports` con UN eje rotando (sin `codigo`,
  que necesita el sitio levantado; `escala` usa su skill), con el reporte en `auditorias/<fecha>.md`; y un subagente Opus que propone de 3 a
  5 mejoras con lo que pasó en la semana (sección "Sugerencias de mejora" del reporte). Commitea solo el reporte. NO escribe el TODO: lo
  que va ahí queda en la sección "Para TODO" del reporte, para la principal. Avisa SIEMPRE con una línea (todo bien o qué falló).
  Sin `auditAll()` en el navegador: `audit.js` hace los mismos tie-outs con el mismo motor (P0 `no-cierra`) y el preview choca con el
  puerto fijo de otras sesiones.
- `tools/dashboard-usuarios.mjs` (nuevo, gratis): corre `stats.mjs --json` y `cloudflare-visitas.mjs --json`, escribe los 4 archivos del
  dashboard en `Generados/dashboard-usuarios/` (en `.gitignore`) y mira las corridas del Worker `fos-supabase-ping` en los últimos 7 días
  por la API GraphQL de Cloudflare (el token de Web Analytics alcanza). Sin corridas o con errores: ALERTA y código 1. Probado: los 4
  archivos subidos al dashboard el 2026-10-18 (fuentes en versión 2).

### Qué deja de ser cierto en ESTADO

- La línea del dashboard de usuarios dice que "se actualiza a mano": ahora lo actualiza la tarea semanal `fos-auditoria-semanal`
  (`tools/dashboard-usuarios.mjs`). Sumar una línea con la tarea y lo que hace (arriba).

### Qué queda (para TODO)

- 300 y 268: se borran. La primera corrida de la tarea (lunes 2026-10-20) confirma el cron del Worker del 19/10 (la línea "Worker
  fos-supabase-ping" del aviso); si dice ALERTA, el 268 (a) vuelve.
- La tarea necesita `tools/dashboard-usuarios.mjs` en main antes del lunes 8:10.
- La primera corrida puede frenar pidiendo permiso para subir a los artifacts: los permisos que Guido apruebe en una corrida quedan
  guardados para las siguientes ("Run now" en Programadas los aprueba de antemano, con el costo de una corrida entera).
- Trampa de los worktrees (para CONVENCIONES o worktree.md): `audit.js` puede dar P1 `faltantes-desfasado` en un worktree porque
  `data/faltantes/` depende de archivos que git ignora (PDFs) que la principal bajó después de `preparar`. Se arregla volviendo a correr
  `node tools/worktree.mjs preparar <carpeta>`; el hook de commit lo frena hasta entonces.
- El hook de docs frena también un comando que solo NOMBRA uno de los tres documentos junto a una escritura (un heredoc a la nota de la
  sesión que menciona el TODO): en ese caso, escribir con Edit/Write.
