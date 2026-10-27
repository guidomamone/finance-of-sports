# finance-of-sports — instrucciones permanentes

Sitio financeofsports.com («El deporte en Números»): las finanzas de clubes de fútbol, para hinchas y periodistas. Repo
`guidomamone/finance-of-sports`; si hay dudas al arrancar, chequeá `pwd` y el remote antes de editar o commitear.

**`netlify.toml` define qué se publica.** Netlify publica la raíz, pero antes de publicar corre un comando que BORRA DEL ARTEFACTO DE DEPLOY lo interno: la carpeta `Admin/` entera (con las notas de sourcing de `Admin/sourcing/`), `CLAUDE.md`, `auditorias/`, `Prototyping/`, `tools/` y `Generados/`. Todo se trackea (el respaldo en GitHub está completo) y lo interno no se publica. Se publican, a propósito, las páginas `fuentes/<clubId>.html` y las transcripciones `Clubes/**/*.md`. Ver `netlify.toml`, que explica por qué destrackear estaba mal y por qué hacer el repo privado no alcanzaba.

**DÓNDE PONER UN DOCUMENTO NUEVO.** Si es interno (cualquier cosa escrita para Guido o para una sesión futura: estado, reglas, notas,
planes) va adentro de `Admin/`. Si lo dejás suelto en la raíz, se publica: `node tools/audit.js` lo caza (`doc-interno-no-excluido`).
La extensión no dice nada sobre si un documento es interno. `CLAUDE.md` es la única excepción que se queda en la raíz.

**DÓNDE PONER UNA REGLA DE DATOS NUEVA.** Si vale para cualquier club, en `Admin/CONVENCIONES-DATOS.md`; si solo vale para un país o un club, en `Admin/paises/<iso>.md` (mismo formato; el título nombra el país). El hook de pre-tool rechaza la de un país en el general y `audit.js` la marca (`regla-de-pais-en-doc-general`); `cargar`, `club-siis` y `recategorizar-linea` imprimen al empezar dónde están las reglas del país del club.

**Lo que está cerrado no se borra ni se apila: se archiva** en `Admin/Archive/` (ver su `README.md`). Antes, sacale lo que todavía
sirve y llevalo a donde se lee: una regla a `Admin/CONVENCIONES.md` (proceso), `Admin/CONVENCIONES-DATOS.md` (datos) o
`Admin/PANTALLA.md` (pantalla y código), o a la skill que corresponda; un pendiente a `Admin/TODO.md`.

## Modo de trabajo: una sola sesión

Hoy se trabaja en UNA sesión, en la carpeta principal y en `main`, una cosa a la vez. No se abren worktrees ni otras sesiones (cómo se hacía:
`Admin/Archive/modo-varias-sesiones.md`, no se lee). **El modo vive en `.claude/modo.json`** (`node tools/modo.mjs` lo dice y lo cambia): el hook
`tools/hooks/pre-tool.mjs` aplica solo las reglas de ese modo; si Guido pide trabajar en varias sesiones, se corre `node tools/modo.mjs varias-sesiones`
y este bloque se reemplaza por el de `Admin/Archive/modo-varias-sesiones.md`. El hook rechaza en cualquier modo `cd … &&`, `$VAR` o `$(…)` y `/tmp` en un
Bash (no se pueden chequear antes de correr); su mensaje dice qué usar en cambio. Las reglas de este modo:

- **Un rol por vez, con su skill.** Los roles de `Admin/TODO.md` entre paréntesis (Onboarding, Pipeline, Auditora, Pantallas, Sourcing,
  Orden) dicen qué skill cargar: cargar clubes, `club-or-year-onboarding`; buscar documentos, `club-sourcing`; una pantalla,
  `producto-y-pantalla-finance-of-sports`; auditar, `auditoria-finance-of-sports`; tools del pipeline, la de onboarding. Se dice en una línea
  qué rol se toma. Una tarea se termina y se commitea antes de cambiar de rol. Una skill ya cargada no se vuelve a cargar; se lee la sección
  que pide la tarea, no la skill entera.
- **Lo que hacía la Auditora.** Una condición nueva en una tool: la sesión recorre la sección 7 de `auditoria-finance-of-sports` y mide
  antes de dejarla activa, y lo anota en CHANGELOG como «sin revisión independiente». Un criterio de datos sin precedente:
  `votacion-de-criterios` (tres votantes, subagentes Sonnet; el único uso de subagentes del modo). Lo que no tiene precedente ni voto no
  frena el resto: queda en la cola y se sigue con otro año. El circuito frenado → pipeline → auditora de `Admin/CONVENCIONES.md` se
  colapsa: Onboarding no edita `tools/` y Pipeline sí, pero acá es la misma sesión, una tarea después de la otra.
- **Tokens.** Una tarea por tramo de conversación; al terminar una grande, si el contexto pasa de la mitad, pedirle a Guido que compacte.
  Los lotes corren en segundo plano, de a uno. Leer lo justo: de un `.md` de club, la parte que se usa.
- **Hablarle a Guido.** El diseño de un cambio a una tool no se le muestra ni se le pide el ok: lo deciden el lote y el veredicto general-o-parche; se hace, se
  mide y, si da mal, se revierte. Se le cuenta al terminar, corto: qué cambió y qué se midió. Las decisiones numeradas con la recomendación al lado son solo
  para lo que es suyo (más abajo); tareas chicas, terminadas y commiteadas antes de abrir la siguiente. Lo que Guido tiene que correr o decidir va completo en el último
  mensaje del turno (el comando en un bloque `bash`), con **Te toca a vos** numerado o «nada», y **En curso** (rol, to-do, lote).
- **Un cambio a una tool del pipeline se mide antes y después, SIN excepción** (Guido: «nunca jamás escribir algo que cambie el pipeline si no medís que no rompa algo anterior»). Cómo y con qué lote: skill `club-or-year-onboarding`, `mejorar-script.md`, sección 5 (chico siempre primero; mediano si el cambio es de una etapa; completo si toca lógica compartida). Se cierra con `node tools/fos.mjs cerrar-tool --cambio "<qué hace>"` (en segundo plano: ensayo, medición y veredicto en orden; los pasos sueltos, `medir pipeline` y `patron`, no se corren a mano; la medición elige medidor y lote por `tools/pipeline-tools.json` y anota `Admin/registros/mediciones-pipeline.jsonl`) y un hook rechaza el commit de una tool del pipeline sin esa medición (`[sin-medicion]` solo con el ok de Guido). El resultado también va a la entrada de CHANGELOG.
- **Un dato público de un club (fundación, estadio, web, registro)** se busca con la escalera de `Admin/PIPELINE.md`, «Datos públicos de un club»; no se le pregunta al club.
- **Decide la sesión, cuenta en el resumen:** estructura y calidad de datos (ids, esquema, alias, consistencia, reglas objetivas). **Va a
  Guido:** el texto de una skill (se edita sin candado mecánico; Guido lo lee en el diff del commit, y por eso una tarea que toca skills se commitea sola), gastar fuera del presupuesto, push y deploy, un cambio de alcance, un mail a
  un club (solo si lo pidió con sus palabras).
- **Cerrar un punto del TODO.** Se borra. Si el motivo por el que estaba trabado resultó falso (la transcripción que «nunca se hizo» ya
  estaba en disco), queda escrito en la entrada de CHANGELOG, y en el propio TODO si el punto sigue vivo en parte.
- **Lo que en el otro modo iba a la nota de sesión** se escribe directo en `Admin/TODO.md`, `Admin/CHANGELOG.md` y `Admin/ESTADO.md` al
  cerrar cada tarea (las dos primeras siempre; ESTADO solo si algo dejó de ser cierto).

## Al empezar

- **Reglas fijas de Bash y de medir y commitear:** `Admin/PLANTILLA-SESION.md` (el hook `tools/hooks/pre-tool.mjs` las aplica; el prompt de una sesión no las repite).
- **Leer, y parar ahí:** este archivo (ya cargado), la skill `start-session-finance-of-sports-project` (la tabla de qué leer según la tarea;
  **si el rol es Pipeline u Onboarding se salta: va directo a `club-or-year-onboarding`, que trae su propio arranque**) y las secciones de
  `Admin/ESTADO.md` (qué hay armado hoy) que le tocan al rol: `node tools/fos.mjs arranque <rol>` (pipeline, onboarding, auditora, orden, sourcing,
  pantallas, contenido, deploy; sin rol lista las secciones), sola, sin que Guido lo pida. `Admin/TODO.md` NO se lee entero nunca: `node tools/todo.mjs`
  da la lista ordenada (qué sigue) y `node tools/todo.mjs <id>` el cuerpo de un punto. Qué hay cargado de cada club:
  `Admin/ESTADO-clubes.md` (generado). `Admin/CONVENCIONES.md` (reglas de proceso) se lee cuando la skill de la tarea lo pide.
- **Ningún archivo de `tools/` de más de 40 KB se lee entero** (cuáles: el aviso `tool-grande` de `node tools/audit.js` y `tools/tamanos-aceptados.json`; el resto se partió con `node tools/fos.mjs mover`): `node tools/fos.mjs mapa <archivo>` da las funciones con su rango de líneas y las regiones, y `Read` con `offset` y `limit` trae solo ese tramo. Si el cambio altera lo que pasa entre etapas (ajustes, huellas, qué archivo lee la siguiente), antes `Admin/CONTRATO-ETAPAS.md` (qué lee y escribe cada etapa, qué la deja vieja, con qué comando se rehace).
- **Las tools que se corren a mano** están en una lista: `node tools/fos.mjs` (cada comando con una línea y cuándo se corre; `node tools/fos.mjs <comando> …` lo corre). Una tool nueva
  que una sesión tenga que correr se agrega a `tools/fos-comandos.json`; `node tools/fos.mjs --check` dice cuáles quedaron sueltas.
- **El índice de los `.md`** (`Admin/INDICE-md.md`, generado, 25 KB: no se lee entero, se consulta con grep): cada documento vivo con qué es, cuándo se
  lee, quién lo cita y a cuál manda. `node tools/indice-md.mjs` lista los huérfanos (nadie los cita: candidatos a archivar) y los que no declaran
  qué son (primera línea `<!-- md: qué es | leer: cuándo -->`). Al crear, mover o borrar un `.md`: `node tools/indice-md.mjs --escribir`.
- **Las skills y los documentos de criterio** (`Admin/PIPELINE.md`, `CONVENCIONES*.md`, `PANTALLA.md`, `ESTADO.md`) dicen cómo se trabaja y qué hay HOY: sin historia (nada de «Versión N», fechas de decisión ni ramas mergeadas: eso va a `Admin/CHANGELOG.md`; un caso real que ilustra una regla se queda, sin la versión), sin contadores fijos (en su lugar, el comando que los da: `node tools/estado.mjs`, `node tools/audit.js`, `Admin/ESTADO-clubes.md`), sin «to-do N» (el pendiente vive solo en `Admin/TODO.md`) y con las menos palabras que una sesión siga entendiendo.
- **Usá la skill que corresponde a la tarea; es obligatorio.** Sin ella, una sesión contradice un criterio ya decidido sin saber que
  existía (pasó de verdad). Empezá por `start-session-finance-of-sports-project`, salvo que la tarea sea onboardear clubes o tocar
  las tools del pipeline: ahí `club-or-year-onboarding`, que trae su propio arranque. Las demás: `club-sourcing` (buscar documentos),
  `club-data-mapping` (categorizar, revisar la cola de categorías o cargar a mano; el criterio está en su SKILL.md y los casos de tipo de cambio, formato simplificado, PDFs difíciles y casos por país en `referencia/`, que su índice dice cuándo abrir), `club-outreach` (mails a clubes),
  `auditoria-finance-of-sports`, `escala-finance-of-sports`, `deploy-y-release-finance-of-sports` (antes y después de que Guido pushee), `producto-y-pantalla-finance-of-sports` (una pantalla o un cambio visible, del mockup a la verificación) `contenido-y-difusion-finance-of-sports` (una publicación con un dato del sitio) `contrato-de-datos-finance-of-sports` (qué cambio de los datos públicos los rompe) y `votacion-de-criterios`.
- Mirá si hay algo nuevo en `Admin/sourcing/README.md`: Guido deja ahí links a documentos antes de que se carguen. Si algo de ahí no figura
  como cargado en `Admin/ESTADO-clubes.md`, es trabajo pendiente.
- Una pregunta genuina sobre un documento, que no se puede responder con la fuente ni con los criterios de las skills, va a
  `Admin/dudas-por-club.md` (la lista que Guido usa para escribirles a los clubes). No se asume un criterio.

## Antes de terminar la sesión

Con cualquier cambio real (datos, features, estructura, copy), sin que Guido lo pida:

- **`Admin/ESTADO.md`** al día. Es un snapshot, no un log: lo que dejó de ser cierto se reemplaza o se borra.
  `Admin/ESTADO-clubes.md` no se escribe a mano: `node tools/generate-club-index.js`.
- **`Admin/TODO.md`**: se BORRA lo resuelto (`node tools/todo.mjs --cerrar <id>`; no se marca "RESUELTO"). Un punto nuevo toma el id siguiente al
  más alto y un lugar en el orden (formato en la cabecera del propio TODO).
- **`Admin/CHANGELOG.md`**: siempre una entrada, corta (qué cambió). `Admin/finance-of-sports-project.md` solo si amerita el porqué.
- La lista de pendientes vive solo en `Admin/TODO.md`. El detalle del cierre: skill de arranque, sección 5.

## Los datos de un club: la fuente es su JSON

`data/<país>/<id>.json` es lo que se edita (y se publica como dato abierto); `data/<país>/<id>-data.js`, lo que carga el sitio, se GENERA de ahí
(`node tools/generar-data.mjs`) y no se toca a mano. Las tools de carga escriben el JSON solas; el esquema y las reglas: `Admin/mediciones/245-esquema.md` y
`Admin/CONVENCIONES-DATOS.md`. Los ids de club son `<slug>-<iso2>`; uno viejo (`boca`) sigue andando por `data/club-aliases.js`.

## Cada PDF nuevo: transcribirlo a Markdown ANTES de usarlo

Ningún PDF se usa sin transcribirlo antes a un `.md` completo y fiel; los dos van juntos en `Clubes/<País>/<Club>/` (los PDFs no se trackean; las
transcripciones sí). Cómo, con qué motor y las trampas de PDF: `Admin/PIPELINE.md`, «Documentos fuente».

## Precisión antes que velocidad

Este sitio es para uso público de hinchas y periodistas reales. Antes de dar por buena una carga de datos financieros, verificá que
los rubros suman el total oficial o de prensa conocido (`verifyTieOuts()` en `index.html`, `auditAll()` con `?audit=1`).

## Gotchas de tooling

**Si el navegador de preview muestra algo viejo, no es un bug hasta probar lo contrario:** subí `ASSET_V` (la constante y cada `?v=`) y navegá con
`?cb=<algo nuevo>`. Las demás trampas: del navegador, `Admin/PANTALLA.md`, «Trampas del navegador de preview»; de PDF y de grep, `Admin/PIPELINE.md`,
«Documentos fuente»; varios agentes en el Browser pane, skill `club-sourcing`, «Gotcha de tooling».
