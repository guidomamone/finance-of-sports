---
name: principal-finance-of-sports
description: El rol de la sesión principal de finance-of-sports (la de la carpeta principal): cómo abre y cierra sesiones de worktree, cómo mergea, qué le dice a Guido y en qué formato. Usar siempre al arrancar una sesión en la carpeta principal, después de la skill de arranque. Una sesión de worktree no la usa.
---

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
