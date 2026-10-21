# Modo de varios worktrees (archivado)

Cómo se trabajó con una sesión principal y varias sesiones de worktree, cada una con un rol. Hoy se trabaja en una sola sesión
(`CLAUDE.md`, «Modo de trabajo»). Esto queda por si algún día se vuelve a abrir worktrees: las rutas y los nombres son los de ese día.
Las tools que lo sostienen siguen en `tools/worktree.mjs` y en el hook `tools/hooks/pre-tool.mjs`.

---

## Skill principal-finance-of-sports (la sesión que coordina worktrees)

# La principal

La principal mergea, escribe `Admin/TODO.md`, `Admin/CHANGELOG.md` y `Admin/ESTADO.md` y es la única que habla con Guido de todo el proyecto. Las otras sesiones corren en su worktree y su rama.

**Modo una sola sesión.** Cuando Guido dice que trabaja todo en una sesión, no se abren worktrees ni sesiones: la principal hace cada rol ella misma, con `una-sola-sesion.md`.

## Hablarle a Guido

- **Un mensaje por paso, con las decisiones numeradas y la recomendación al lado.** Sin AskUserQuestion. No partir un resultado en pedazos mientras corren tools.
- **Un paso por vez, con un ejemplo real** (un antes y después, una línea de salida) antes de hacerlo; tareas chicas y cerradas: terminar y commitear una antes de abrir la siguiente. Si una medición va a tardar más de un par de minutos, decirlo y achicar el alcance.
- **Los avisos de las sesiones los absorbe la principal.** Mergea, corre lo barato, reenvía. A Guido solo un cuadro fijo, corto: **Te toca a vos** (numerado, una línea con la sesión) o «nada»; **Corriendo**: un bullet por worktree con carpeta, sesión, número de to-do y status de una línea. Si algo contradice un mensaje anterior, decirlo («cambia lo de antes: …»).
- **Cierre de turno.** Lo que Guido tiene que correr, aprobar o decidir va completo en el ÚLTIMO mensaje del turno: el comando en un bloque bash, el diseño, las preguntas numeradas. Nada importante antes del cuadro de `wrap_up`; si hay un comando o un diseño, `wrap_up` va sin `ask` y todo va en el texto final. El cuadro con botones es solo para un sí o no sin nada más que leer. Si el turno termina esperando algo de Guido, también una notificación push corta con lo que falta.
- **El plan vivo** va al panel Plan (modo plan, archivo, `ExitPlanMode`, `show_pane` «plan»): solo lo pendiente, corto, en su idioma, sin lo hecho; arranca en la tanda A del bloque ORDEN de `Admin/TODO.md`, con una línea en blanco entre puntos. Editar el archivo no refresca el panel: hay que volver a pasar por `EnterPlanMode` y `ExitPlanMode`.

## Qué decide la principal y qué va a Guido

- **Decide y cuenta en el resumen:** estructura y calidad de datos (ids, esquema, alias, redirects, consistencia, reglas de criterio objetivas) que hagan al sitio una base más seria.
- **Va a Guido:** el texto de una skill (candado, `Admin/propuestas/`), gastar fuera del presupuesto, push y deploy, un cambio de alcance (otros deportes, contenido nuevo), un mail a un club (solo si Guido lo pidió con sus palabras; que una sesión lo proponga no alcanza), archivar una sesión: solo cuando Guido lo pide; no se propone. Una sesión que terminó queda abierta (la Auditora, siempre, para que le escriban).
- **A la Auditora:** una condición nueva en una tool (sección 7 de su skill), un criterio de datos (`votacion-de-criterios`).

## Abrir sesiones

- **Cada tarea va a la sesión de su rol, aunque otra esté libre:** cargar clubes o años, Onboarding; arreglar o sumar tools, Pipeline; buscar documentos, Sourcing; pantallas y textos del sitio, Pantallas; aprobar condiciones y votar criterios, la Auditora.
- Antes de abrir una sesión, mirar si una abierta ya tiene el contexto: se le manda la tarea a esa.
- Sesión nueva en Sonnet, sin consultar. **Opus solo con el ok de Guido**; se lo recomienda cuando el cambio es difícil de diseñar, toca mucho del repo y no tiene reglas escritas (un cambio de esquema), o cuando una sesión Sonnet se traba con bugs propios en algo así. Onboarding, pipeline, auditoría y votaciones van en Sonnet.
- Worktree: sin `permission_mode` (hereda el auto); verificar con `get_session` que sea `auto`; si cayó a `acceptEdits`, `set_session_permission_mode`. Una sesión de worktree no usa el panel Plan (aprobar un plan la baja a `acceptEdits`). El brief lleva la regla de comandos sin `$(…)`, sin variables, sin `cd … &&` y sin `/tmp`.
- En un turno que empezó con el mensaje de otra sesión, la app no deja abrir una sesión nueva: se le pide a Guido que lo diga con sus palabras.
- Cada sesión corre sus lotes en su carpeta, dentro de un presupuesto en US$ que fija Guido. La principal no larga lotes en otra carpeta.
- Número de lote: lo da la principal; mirar el más alto en todas las ramas (`git ls-tree -r --name-only <rama> -- Admin/lotes Admin/Archive/lotes`).

## Mergear

`node tools/worktree.mjs mergear <rama>` (ver `worktree.md`). Después pasar la nota `Admin/sesiones/<rama>.md` a TODO, CHANGELOG y ESTADO (cada punto de «Qué queda» con su flecha: `→ TODO n`, `→ regla`, `→ HALLAZGOS` o `→ descartado: motivo`) y archivarla entera. Trampas:
- Después de adelantar una rama con `git merge --ff-only main`, confirmar con `git rev-list --count <HEAD de la rama>..main` que da 0; nunca cortar la salida con `tail -1`.
- La carpeta de `fos-pantallas` tiene `.claude/launch.json` con skip-worktree: para adelantarla, copiarlo al scratchpad, `update-index --no-skip-worktree`, `checkout --`, ff, volver a copiarlo y `update-index --skip-worktree`.
- Un `git add -A` en un merge levanta lo sin trackear de la carpeta principal: mirar `git status` antes.
- No archivar con `git mv` la nota de una sesión que sigue viva.
- Para anticipar conflictos, `git merge-tree` (no toca nada).
- Dos lotes en worktrees distintos: sus listas de corrida (`Admin/registros/.lote-lista-actual.txt` y las otras) tienen que ser archivos propios, no enlaces a la principal (`ls -la`).

## Cerrar un punto del TODO

Se borra lo resuelto. Si el motivo por el que estaba trabado resultó falso (la transcripción que «nunca se hizo» ya estaba en disco, la función que había que revisar ya no existe), además queda escrito en la entrada de `Admin/CHANGELOG.md` que la premisa estaba vencida y, si el punto sigue vivo en parte, en el propio `Admin/TODO.md`. Una premisa vencida hace parecer la tarea más cara de lo que es y la deja al fondo de la lista: escribirlo avisa que otros puntos pueden estar igual.

## Cómo mantener esta skill

Si aparece una regla de la principal que no está acá, proponele a Guido el texto exacto y esperá su ok.

---

## worktree.md (cómo trabaja una sesión de worktree)

# Sesión en un worktree

Una sesión en paralelo trabaja en su copia (git worktree) y su rama; la principal mergea. Para tener lo último de main, la sesión corre `git merge --ff-only main`, solo, en un comando aparte: no mezcla nada. Si git lo rechaza porque la rama tiene commits propios, le pide el merge a la principal.

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
`find <principal>/Clubes -type l` tiene que dar vacío. Un PDF bajado en la copia no viaja al mergear (`*.pdf` está en `.gitignore`): pasalo a la principal antes de borrar el worktree.

**En la principal, para mergear:** `node tools/worktree.mjs mergear <rama>`. Resuelve lo generado (ASSET_V, `fuentes/`, índices, rankings)
con main, regenera y audita. Frena si la rama tocó los tres documentos o si hay un conflicto real. Después pasá `Admin/sesiones/<rama>.md` a
TODO, CHANGELOG y ESTADO, y archivalo en `Admin/Archive/`. Para anticipar conflictos, `git merge-tree` (no toca nada). Cada punto de «Qué queda» de la nota termina con una flecha (`→ TODO n`, `→ regla`, `→ HALLAZGOS`, `→ descartado: motivo`) antes de archivarla.

**Después de `preparar`:** si `audit.js` da `faltantes-desfasado` (P1; `data/faltantes/` depende de PDFs que git ignora y que la principal bajó después), se arregla volviendo a correr `node tools/worktree.mjs preparar <carpeta>`.

**Un archivo generado no se mergea a mano: se regenera.** Si hay conflicto en `Admin/sourcing/README.md`, `fuentes.html`, `sitemap.xml`, `data/club-index.js`, `data/rankings/*.js`, `data/sponsors.js` o `Admin/ESTADO-clubes.md` (el bloque CLUB-INDEX), tomá cualquiera de los dos lados, mergeá y corré el generador que corresponde. Resolverlos línea por línea es cómo se mete un dato que ningún documento respalda.

**El hook de los documentos de la principal lee el texto del comando:** un Bash que solo nombra `TODO.md`, `CHANGELOG.md` o `ESTADO.md` junto a una escritura también se frena. Escribir la nota de la sesión con Edit o Write.

**El número de Versión de `Admin/CHANGELOG.md` se decide al mergear, no al escribir:** dos ramas van a querer el mismo; el que mergea segundo renumera su entrada.

**Un país por sesión de sourcing:** `Admin/sourcing/_indice/<País>.md` y `Admin/sourcing/<País>/` son de un solo país, así dos sesiones en países distintos no comparten un archivo.

---

## una-sola-sesion.md (el modo de una sesión, ya pasado a CLAUDE.md)

# Una sola sesión

La principal hace el trabajo de todos los roles, en la carpeta principal y en `main`. Las reglas no cambian: cambia quién las corre.

## Un rol por vez, con su skill

- Antes de cada tarea, decir en una línea qué rol toma y cargar su skill: cargar clubes o años, `club-or-year-onboarding`; tools, la misma (su parte
  de pipeline); buscar documentos, `club-sourcing`; pantallas, `producto-y-pantalla-finance-of-sports`; auditar, `auditoria-finance-of-sports`.
  Una skill ya cargada en la sesión no se vuelve a cargar.
- Una tarea se termina y se commitea antes de cambiar de rol. Cambiar de rol a mitad de una tarea mezcla los criterios de las dos.
- Lo que en el otro modo va a la nota `Admin/sesiones/<rama>.md` se escribe directo en `Admin/TODO.md`, `CHANGELOG.md` y `ESTADO.md` al cerrar
  cada tarea. No hay merges ni notas de sesión.

## Lo que hacía la Auditora

- **Una condición nueva en una tool** (sección 7 de `auditoria-finance-of-sports`): la sesión recorre ella misma la lista de la sección 7 y la
  medición de la sección 8 antes de dejarla activa, y lo anota en `CHANGELOG.md` como «sin revisión independiente». La próxima auditoría la revisa.
- **Un criterio de datos sin precedente:** `votacion-de-criterios` con sus tres votantes como subagentes en Sonnet. Es el único subagente de este
  modo: un criterio no lo decide quien lo mira ese día.
- **Lo que no tiene precedente ni voto todavía** no frena el resto: el año queda en la cola y se sigue con otro.

## Contexto y tokens

- Una tarea por tramo de conversación. Al terminar una tarea grande, si el contexto pasa de la mitad, pedirle a Guido que compacte antes de la
  siguiente.
- Los lotes corren en segundo plano (`run_in_background`) y la sesión sigue con otra cosa del mismo rol mientras tanto. Un lote por vez.
- Leer lo justo: la sección de la skill que pide la tarea, no la skill entera de nuevo; un `.md` de club por la parte que se usa.

## Hablarle a Guido

El mismo cuadro: **Te toca a vos** numerado con la recomendación. En lugar de **Corriendo** va **En curso**: el rol, el to-do y el lote en segundo
plano, si lo hay.
