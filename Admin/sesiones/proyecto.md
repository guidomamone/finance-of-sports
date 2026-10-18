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
  - Los chequeos de Bash leen el texto del comando: un comando que solo MENCIONA una de esas rutas junto a algo que escribe (por ejemplo, una
    prueba con el JSON del hook adentro) también se frena. Es el precio de no parsear shell; pasó una vez probando.

## Qué deja de ser cierto en ESTADO

- (pendiente: se completa al cerrar el 250)

## Qué queda (para TODO)

- (pendiente)
