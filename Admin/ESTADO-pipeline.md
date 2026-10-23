<!-- md: estado de las tools del pipeline hoy (qué hace cada una, qué se decide solo, qué no se transcribe) | leer: al tocar una tool del pipeline o el proceso de carga; no en el arranque -->
# Estado del pipeline: de un PDF a un año cargado

Sale de `Admin/ESTADO.md` (que se lee en cada arranque). El proceso etapa por etapa es `Admin/PIPELINE.md`; los números de hoy, `node tools/estado.mjs`.


- Tools: `lote.mjs` (etapas 3 a 8, en segundo plano), `pipeline.mjs` (solo la etapa 2: transcribir con Mistral y validar), `cargar.mjs` (escribe el
  año, corre los generadores y `audit.js`, y revierte si algo falla; `lote.mjs --ejecutar --cargar` escribe lo que queda listo, con un commit por
  año), `caja-deuda.mjs` (caja, deuda y, con `--personal`, el costo de personal) y `cola.mjs` (lo que no se resuelve solo). Proceso etapa por
  etapa: `Admin/PIPELINE.md`; descartes medidos: `Admin/HALLAZGOS-pipeline.md`; cuántos documentos hay en cada etapa y cuánto cuesta el paso
  siguiente: `node tools/estado.mjs` (gratis). Un dato publicado mal se corrige con un ajuste manual (`tools/ajustes.mjs`) además de en `data/`,
  para que una corrida futura no lo deshaga.
- La cola la contesta un subagente Sonnet con cita del documento y del criterio de `club-data-mapping`; a Guido va solo lo que frena un alta o un
  año, y lo que solo el club sabe va a `Admin/dudas-por-club.md`. Un club nuevo entra al lote con un solo ejercicio; sus otros años van después
  de contestar su cola, para que las respuestas del primero sirvan de precedente.
- Lo que se decide solo: el primer año de un club (con lo impreso o con una pregunta a Claude, `primer-anio-ia.mjs`), el perímetro
  (`perimetro-senales.mjs`), el rubro probable de una fila en «—» (`dentro-de-otro.mjs`), las gestiones (`gestiones-tanda.mjs`) y la liga de un año
  nuevo (`listas-lote.mjs --lote`). La liga de un año necesita dos fuentes: la segunda es RSSSF (`segunda-fuente-liga.mjs`).
- Sin IA cuando el documento viene estructurado: Rusia sale del fisco (`bfo-rusia.mjs`), Dinamarca y los británicos que presentan en iXBRL, del XHTML
  (`xhtml-aarsrapport.mjs`; `lote.mjs` frena la IA sobre ellos salvo `--pagar-ia-xhtml`; `ixbrl-resultado.mjs` frena el individual si el resultado no
  coincide con el etiquetado) y Bélgica, de los códigos NBB (`nbb.mjs`).
- No se transcriben PDFs nuevos salvo los de las 5 grandes ligas, Brasil y Argentina; el resto se carga si ya tiene `.md`. Los escaneados británicos
  los transcriben subagentes (`Admin/transcripcion-subagentes/README.md`); cargar sin API: `club-or-year-onboarding/carga-con-tokens.md`.
- Una tarea mensual (`ejercicios-nuevos.mjs`) baja los PDF nuevos y los anota en `Admin/sourcing/README.md`. El tablero del pipeline
  (artifact https://claude.ai/artifact/ESc6PC7CUbQ8wV2ETgLVdb) no se actualiza solo: `node tools/tablero.mjs`.
- Para enterarse de que terminó un lote, el comando lleva al final `; osascript -e 'display notification "Terminó el lote" with title "finance-of-sports" sound name "Glass"'`.
- Modo de trabajo: una sola sesión en la carpeta principal y en `main`, un rol por vez, cada uno con su skill (reglas en `CLAUDE.md`,
  «Modo de trabajo»). Esta sesión escribe TODO, CHANGELOG y ESTADO al cerrar cada tarea. El modo de varios worktrees (`tools/worktree.mjs`,
  `Admin/Archive/modo-varias-sesiones.md`) y los roles de `Admin/CONVENCIONES.md` («ONBOARDING CARGA, PIPELINE
  ARREGLA, AUDITORA APRUEBA») siguen escritos, pero hoy no se usan. El gasto por sesión: `node tools/gasto.mjs --sesion <carpeta>`.
- Un punto nuevo del TODO: `node tools/todo.mjs --nuevo --pos <n> --rol "…" --titulo "…"`. Qué va a pedir el commit de lo cambiado (clasificación, medición, veredicto): `node tools/fos.mjs que-pide`. Cerrar una tarea: `node tools/fos.mjs cerrar <id> [--sin-doc "motivo"]` (TODO, índice, auditoría, CHANGELOG; no commitea). Lo que una tool no resuelve: `node tools/fos.mjs causas` (registro `Admin/registros/casos-sin-resolver.jsonl`).
- Leer código sin quemar tokens: `node tools/fos.mjs mapa tools/<archivo>` (funciones con rango de líneas) y `Admin/CONTRATO-ETAPAS.md` (qué pasa entre etapas); una tool de más de 50 KB no se lee entera (`CLAUDE.md`). Mudar un bloque de una tool a un módulo sin cambiarlo: `node tools/fos.mjs mover <tool> <desde>-<hasta> <destino>` (rango de `fos mapa`; ensayo por defecto). Una tool de más de 40 KB se parte así o queda con su motivo en `tools/tamanos-aceptados.json` (aviso `tool-grande`; hoy siete: funciones enormes, una tabla, un flujo). Ver cómo se ve un patrón sin leer todo: `node tools/fos.mjs muestra "<regex>"` (una muestra repartida). Una edición en masa (el mismo texto en muchos archivos, o cambios exactos por línea): `node tools/fos.mjs reemplazar` (ensayo por defecto). Mover un punto del TODO: `node tools/todo.mjs --mover <id> --antes|--despues <id>`. Cabeceras largas de tools: `node tools/fos.mjs acortar-cabecera` (el resto va a `Admin/NOTAS-DE-TOOLS.md`).
- Medir cambios al pipeline: `node tools/fos.mjs medir pipeline` (tabla `tools/pipeline-tools.json`, registro `Admin/registros/mediciones-pipeline.jsonl`,
  listas de prueba estratificadas `Admin/lotes/prueba-*.txt` que regenera `lotes-prueba.mjs`; `Admin/PIPELINE.md`, «Medir un cambio a una tool»).
- Comentarios de `tools/`: `node tools/comparar-sin-comentarios.js --medir` los mide (aviso P3 `comentario-historico-en-tools`) y `--tools` prueba que una limpieza no cambió el código; `medir pipeline` usa esa prueba, sin lote, para un cambio de solo comentarios (`Admin/CONVENCIONES.md`, «Comentarios en tools/»).
- Hook posterior a Bash (`tools/hooks/post-tool.mjs`): un commit que toca una skill recuerda mostrar el diff.
- Hook `Stop` (`tools/hooks/stop.mjs`): al terminar un turno con cambios mira, en segundos, el árbol sin commitear, el índice de los `.md` y un punto del TODO que ya cumple su «Verificar:»; bloquea una sola vez con el comando que lo arregla. Hook `SessionStart` (`tools/hooks/session-start.mjs`): imprime en menos de 10 líneas el modo, el árbol, una medición muerta y los tres primeros puntos. Pruebas: `probar-stop.mjs` y `probar-session-start.mjs` en la misma carpeta.
- Hooks de Claude Code (`.claude/settings.json` → `tools/hooks/pre-tool.mjs`): `audit.js` antes de cada commit publicable (frena con P0/P1;
  `[sin-audit]` con el ok de Guido), el commit de una tool de `pipeline-tools.json` (o de un módulo que ellas usan) sin medición con su huella o, si cambia el código (no solo comentarios ni una mudanza), sin la línea GENERAL de `node tools/fos.mjs patron` (`[sin-veredicto]`), o de una tool nueva sin clasificar (`[sin-medicion]` con el ok de Guido), rechazan editar un archivo trackeado mientras corre una medición (candado `Admin/mediciones/pipeline/_corriendo`) y piden permiso editar skills, `git push` y borrar en `Clubes/`; en un worktree rechazan escribir TODO,
  CHANGELOG y ESTADO. También rechazan (con el motivo y cómo reescribirlo) rutas en `/tmp`, `$(...)` y variables, `cd ... &&`, `node -e`
  que importa una tool, un subagente sin la regla de solo Read, Grep y Write, el modo plan o un `git merge`/`pull` en un worktree y `rsync`
  sin `--no-links`; `mv` en `Clubes/` pide permiso. Qué chequea cada uno: la cabecera del script.
- Estadio, capacidad, sponsor de camiseta y marca técnica de cada club y ejercicio: `data/contexto/<iso>.js` (`tools/estadio-sponsor.mjs`,
  de Wikipedia con el permalink de la revisión; lo manual en `tools/contexto-manual.json` con fuente). `cargar.mjs` no escribe un año
  nuevo sin estadio y sponsor, salvo en una liga amateur o en las segundas sin tabla de camisetas en Wikipedia, donde basta el estadio (la lista, `SOLO_ESTADIO` de `estadio-sponsor.mjs`; `compuertaContexto()`; también `bfo-rusia.mjs`). Donde la temporada en inglés no lo trae, el estadio y la capacidad salen de la Wikipedia del país
  (`--local`, con `fuenteLocal`); el sponsor y la marca que faltan, de la tabla de camisetas de la página del club (`--camisetas`, fuente en
  `club`, caché `_clubes.json`); lo manual, en `tools/contexto-manual.json`, con una fuente por campo. El índice de sponsors y marcas: `data/sponsors.js` (y uno chico para el buscador, `data/sponsors-indice.js`).
  En Finanzas, la tarjeta "Estadio y camiseta"; cada sponsor y marca tiene su página (`?tab=sponsor&sponsor=…`, con los equipos de hoy y
  la línea de tiempo), que también se encuentra en el buscador ("Sponsors y marcas").
- El plan para Guido (solo lo pendiente, corto) vive en el panel Plan de la app; su copia durable es el bloque ORDEN de `Admin/TODO.md`
  (tandas A-G por dependencias), y el detalle, en los to-dos.
- Qué hay cargado de cada club (ejercicios, tipo de documento, moneda, deuda y caja): `Admin/ESTADO-clubes.md`, generado por
  `node tools/generate-club-index.js`. El detalle de cada año (fuente, qué es real y qué no) está en la evidencia del club, `Admin/carga-clubes/<clubId>.md`.


