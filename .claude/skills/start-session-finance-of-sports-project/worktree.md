# Sesión en un worktree

Una sesión en paralelo trabaja en su copia (git worktree) y su rama; la principal mergea.

**Al arrancar en la copia:** `node tools/worktree.mjs preparar <esta carpeta>` (enlaza PDFs, claves y cachés de la carpeta principal; las
cachés quedan compartidas).

**Mientras trabajás:** commits en tu rama, sin push. No edites `Admin/TODO.md`, `Admin/CHANGELOG.md` ni `Admin/ESTADO.md`: los escribe solo
la principal. Evitá tocar una tool o un club que tenga otra sesión.

**Si proponés una condición nueva en una tool o un criterio de datos** (no solo en el onboarding): mandáselo a la Auditora, directo si hay
una abierta y si no a la principal, que la abre. No codees ni commitees antes del veredicto (`Admin/CONVENCIONES.md`).

**Al cerrar:** en vez de esos tres, escribí `Admin/sesiones/<rama>.md`: qué cambió (lo de CHANGELOG), qué quedó pendiente (lo de TODO) y qué
deja de ser cierto en ESTADO. Commit. La nota es de esta tanda: una sesión que sigue después del merge empieza una nota nueva.

Un PDF bajado en la copia se pasa a la carpeta principal con `rsync -a --no-links` (los symlinks de `preparar` apuntan a la
principal y un `rsync -a` los copia encima del archivo real, que queda como un link a sí mismo). Después,
`find <principal>/Clubes -type l` tiene que dar vacío.

**En la principal, para mergear:** `node tools/worktree.mjs mergear <rama>`. Resuelve lo generado (ASSET_V, `fuentes/`, índices, rankings)
con main, regenera y audita. Frena si la rama tocó los tres documentos o si hay un conflicto real. Después pasá `Admin/sesiones/<rama>.md` a
TODO, CHANGELOG y ESTADO, y archivalo en `Admin/Archive/`. Para anticipar conflictos, `git merge-tree` (no toca nada). Cada punto de «Qué queda» de la nota termina con una flecha (`→ TODO n`, `→ regla`, `→ HALLAZGOS`, `→ descartado: motivo`) antes de archivarla.
