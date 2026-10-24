<!-- md: CHANGELOG archivado, versiones 957 a 977 | leer: solo por grep de una palabra o de una tool (fos changelog historial <tool>) -->
# Changelog archivado, versiones 957 a 977

Salieron de `Admin/CHANGELOG.md` con `node tools/fos.mjs changelog archivar`. Las rutas son las de su época.

---

## Versión 977 — `limpiar-comentarios --revisar`: lo que una limpieza quitaría con contenido [395 · ~limpiar-comentarios.mjs]

- `node tools/limpiar-comentarios.mjs --revisar [--min 3] [--rev <commit>]`: por línea de comentario que la limpieza cambiaría, cuenta las palabras que quita y que no son referencia, fecha ni atribución, e imprime las que llegan a `--min` (archivo:línea y las palabras) para leerlas antes de `--escribir`; `--rev` lo corre sobre las tools como estaban en un commit. Sobre las tools anteriores a la primera pasada lista 79 líneas (casi todas punteros a un HANDOFF o a un paso, ninguna del caso «KNVB para la Eredivisie…», que la regla ya deja).

## Versión 976 — `fos muestra`: una muestra repartida de un patrón [397 · ~muestra.mjs, ~fos.mjs]

- `tools/muestra.mjs` (`node tools/fos.mjs muestra "<regex>" [--en tools|Clubes|Admin] [--n 30] [--ext …]`): junta las líneas que cumplen la regex y imprime n repartidas a intervalo fijo (primera y última incluidas), con archivo:línea y un recorte; solo lee. Herramienta de orden (`no_pipeline`).

## Versión 975 — TODO: cabeceras largas de tools/ [398]

- Punto 398: las 77 cabeceras de más de 25 líneas que dejó la medición del 374, de las más largas a las más cortas, con un aviso P3 que las vigile.

## Versión 974 — Comentarios de tools/ sin historia: el aviso llega a 0 [374 · ~comparar-sin-comentarios.js]

- Limpieza a mano de las referencias históricas de los comentarios de las tools de más de 50 KB (`cargar`, `verificar`, `audit`, `alta-club`, `caja-deuda`, `lote`, `vocabulario`, `fetch-fx-reference` y las demás) y dos pasadas mecánicas más; las 1.629 referencias de la medición quedaron en 0. Cada tanda con el código sin comentarios idéntico a HEAD (`comparar-sin-comentarios.js --tools`) y medida por la vía de solo comentarios.
- El aviso `comentario-historico-en-tools` cuenta «Versión N», «to-do N» (de 1 a 3 cifras: «todo 2010» no es un punto) y fechas de 2026 que no son parte de un nombre, una ruta o un flag; una fecha de otro año es un dato o un ejemplo. Medido con el lote completo (audit, lote-ensayo, verificar): el aviso se va y aparece `todo-cumplido` del propio 374; veredicto GENERAL.
- Quedan 77 cabeceras de más de 25 líneas: no entraban en lo que cerraba el punto; la medición las sigue contando (`--medir`).

## Versión 973 — `fos que-pide`: qué va a pedir el commit, antes de commitear [393 · ~que-pide.mjs]

- `tools/que-pide.mjs`: por archivo cambiado (o los que se le pasen; `--staged` mira el índice), dice si una tool está sin clasificar, si es del pipeline o módulo de una y le falta la medición (con su medidor) o el veredicto, si el cambio es solo de comentarios o una mudanza, o si es una skill (commit aparte) o un dato publicable; ✗ y salida 1 si algo falta. Los rechazos de medición y de veredicto del hook de commit lo nombran, y `fos cerrar` marca ✗ lo que el commit va a pedir. Herramienta de orden (`no_pipeline`): sin medición.

## Versión 972 — El índice de los .md no cuenta las salidas de medir-pipeline [391 · ~indice-md.mjs]

- `indice-md.mjs`: la cuenta de `Admin/mediciones` salta `Admin/mediciones/pipeline` (gitignoreado, lo escribe `medir-pipeline`); ya ninguna medición deja `indice-md-desfasado` NUEVO. Medido (audit, chico): 1 diferencia, el aviso viejo que se va; veredicto GENERAL.

## Versión 971 — TODO: tres puntos de la limpieza de comentarios [395 · 396 · 397]

- 395 (`limpiar-comentarios --revisar`: lo que una limpieza borraría y conserva contenido), 396 (la tool se niega a reescribir con `tools/` sin commitear) y 397 (`fos muestra`: una muestra repartida de las líneas que cumplen un patrón, sin `shuf`).

## Versión 970 — Segunda limpieza de comentarios de tools/: otras 662 referencias [374 · ~limpiar-comentarios.mjs]

- `limpiar-comentarios.mjs` saca también un paréntesis corto con una referencia y a lo sumo 4 palabras más, y la etiqueta de historia con que empieza un comentario; un paréntesis con información («KNVB para la Eredivisie…, decisión de Guido») se deja. 662 referencias en 83 tools; en total 1.165 de 1.629 (quedan 464 en 105 tools y 77 cabeceras largas). Código sin comentarios idéntico en las 83 (`--tools`), medido «idéntico» (solo comentarios).

## Versión 969 — Hooks Stop y SessionStart [388 · 389 · ~indice-md.mjs]

- `tools/hooks/stop.mjs` (evento `Stop`): si el turno dejó cambios (árbol sucio o un commit de los últimos 20 minutos) corre chequeos de segundos y bloquea UNA vez (`stop_hook_active`): archivos sin commitear, `indice-md.mjs --check` y `.md` sin marca, y un punto del TODO que ya cumple un «Verificar:» sin `audit` (esos son de `fos cerrar`). Sin cambios no dice nada; salida de 8 líneas como máximo. Prueba de 6 casos: `probar-stop.mjs`.
- `tools/hooks/session-start.mjs` (evento `SessionStart`): modo, árbol sin commitear, respaldo de una medición muerta (con `--restaurar`), los tres primeros puntos del TODO y una línea de comandos; 10 líneas como máximo. Prueba de 3 casos: `probar-session-start.mjs`. Los dos en `.claude/settings.json`. Sin sesión de prueba todavía: rigen al abrir la próxima sesión.

## Versión 968 — TODO: lo que dejó pensando el 383, el 384 y el 374 [391 · 392 · 393 · 394 · ~todo.mjs]

- Puntos nuevos (creados con `todo.mjs --nuevo`): 391 (el índice de los `.md` cuenta `Admin/mediciones` y toda medición muestra `indice-md-desfasado`), 392 (`fos reemplazar`: edición en masa sin que el hook la rechace), 393 (`fos que-pide`: qué va a pedir el commit), 394 (candado de medición: el hook rechaza editar trackeados mientras corre).

## Versión 967 — Primera limpieza de comentarios de tools/: 505 referencias históricas [374 · ~limpiar-comentarios.mjs, ~fos.mjs, ~comparar-sin-comentarios.js]

- `tools/limpiar-comentarios.mjs` (`node tools/fos.mjs limpiar-comentarios [--escribir]`): saca de los comentarios «(to-do N)», «(Versión N)», fechas entre paréntesis y un «TODO N:» inicial, solo dentro de comentarios; ensayo por defecto.
- Corrida: 505 referencias en 91 tools (de 1.629 a 1.132). Probado con `comparar-sin-comentarios.js --tools`: el código sin comentarios de las 91 tools es idéntico al de HEAD y `node --check` pasa; `medir pipeline` lo anotó «idéntico» (lote `solo-comentarios`). Quedan 1.132 en 125 tools y 77 cabeceras largas.

## Versión 966 — Comentarios de tools/: medición, criterio, aviso y prueba de «solo comentarios» [374 · ~comparar-sin-comentarios.js, ~verificar.mjs, ~cargar.mjs, ~caja-deuda.mjs, ~audit.js, +3]

- Medido (`node tools/comparar-sin-comentarios.js --medir`): 166 tools, 36 % de los bytes son comentarios (1,1 MB), 1.629 referencias a «Versión N», «to-do N» o fechas en 145 tools, 13 cabeceras de más de 25 líneas; las peores: `verificar.mjs` (241), `cargar.mjs` (157), `caja-deuda.mjs` (130), `audit.js` (98), `lote.mjs` (96).
- Criterio en `Admin/CONVENCIONES.md`, «Comentarios en tools/». Aviso P3 `comentario-historico-en-tools` en `audit.js` (con su acción en `audit-acciones.json`), sin revisión independiente: P3, solo cuenta; sin diferencias salvo el aviso nuevo.
- `comparar-sin-comentarios.js --tools` (código sin comentarios contra HEAD más `node --check`) y `solo_comentarios` en `pipeline-tools.json`: `medir pipeline` reconoce un cambio de solo comentarios y anota «idéntico» (lote `solo-comentarios`) sin correr un lote; 3 casos nuevos en `probar-medir-pipeline.mjs` (13, todos ok). Una mudanza sigue por los lotes.
- `patron.mjs --en <carpeta>`: el patrón de una condición nueva de una tool se cuenta en los `.js` de esa carpeta (acá `tools`) en vez de en los `.md` de los clubes.
- Falta (queda en el TODO 374): limpiar las tools, de las que más ruido tienen a las de más de 50 KB.

## Versión 965 — `fos patron`: el veredicto general, parche o rechazada por una tool, y el hook lo pide [384 · ~patron.mjs, ~fos.mjs, ~ajustes.mjs]

- `tools/patron.mjs` (`node tools/fos.mjs patron --cambio "…" --patron "<regex>" [--rango A..B] [--escribir]`): (1) sin nombres: el código agregado (sin comentarios) no nombra un club de `data/clubs.js`, un año literal ni una ruta de `Clubes/`; (2) cuántos: documentos y clubes de `Clubes/**/*.md` con el patrón (general desde 3 de 2); (3) no rompe: la medición con la huella actual de cada tool. Veredicto GENERAL, PARCHE (imprime el `ajustes.mjs --agregar`), RECHAZADA o PENDIENTE; `--escribir` anota GENERAL y RECHAZADA en `auditoria-proceso.jsonl` con la huella. Solo juzga tools del pipeline y sus módulos, no los medidores.
- Reproduce dos casos viejos: el 368 escalón 1 (`--rango b64a936596^..b64a936596`: 304 documentos de 71 clubes, sin nombres, medición explicada → GENERAL, como el registro) y el ajuste de Fortaleza 2023 («Total impuesto a cargo»: 4 documentos de 1 club → PARCHE).
- Hook de commit: un cambio de código a una tool del pipeline ya medida pide la línea GENERAL con su huella (`[sin-veredicto]` con el ok de Guido); solo comentarios o mudanza (`patron.mjs --exento`) no la piden. 6 casos nuevos en `probar-pre-tool.mjs` (54, todos ok).
- Skills: auditoría sección 8 y `mejorar-script.md` apuntan a la tool (el diseño ya no se le mostraba a Guido). PIPELINE.md, «Medir un cambio a una tool», con el veredicto. Tool de orden (`no_pipeline`): sin medición de pipeline.

## Versión 964 — `todo.mjs --nuevo`: un punto nuevo sin encabezados ni renumeración a mano [383 · ~todo.mjs]

- `node tools/todo.mjs --nuevo --pos <n> --rol "…" --titulo "…"`: crea el punto con el id siguiente al más alto, en el lugar <n> (1 al último+1), renumera los de abajo y deja «Terminado cuando:» y «Verificar: manual» para completar. Rechaza una posición fuera de rango y avisa de un título repetido. Probado insertando al principio, al medio y al final y cerrando los tres con `--cerrar`: `Admin/TODO.md` quedó idéntico. Tool de mantenimiento, no del pipeline: sin medición.

## Versión 963 — TODO: hooks Stop y SessionStart, y la regla de «Jev dijo ninguna» [388 · 389 · 390]

- Puntos nuevos: 388 (hook `Stop` con chequeos baratos al terminar un turno), 389 (hook `SessionStart` con el estado en menos de 10 líneas) y 390 (regla para los 7 casos de «Jev dijo ninguna» de `fos causas`, al fondo de A, prioridad baja). Orden: 383, 384, 374, 388, 389, 379, 375.

## Versión 962 — registro de casos sin resolver con causa, prueba de medir-pipeline y `fos cerrar` [387 · 380 · 382 · ~casos-sin-resolver.mjs, ~costo-personal.mjs, ~fos.mjs, ~probar-medir-pipeline.mjs, ~cerrar.mjs]

- `tools/casos-sin-resolver.mjs` + `Admin/registros/casos-sin-resolver.jsonl`: las tools anotan lo que no pudieron resolver con una causa de código fijo (`costo-personal.mjs`: sin-filas-de-total, jev-ninguna, otra-entidad, sin-escala, suma-cero, vecino-no-coincide, sin-vecino) solo al escribir y solo para los años del aviso (`--anios`); un caso que se resuelve deja una línea «resuelto». `node tools/fos.mjs causas` cuenta por tool y causa y marca «candidata a regla» a la de 3 casos de 2 clubes o más. Primera lectura de los 12 `sin-salarios`: «Jev dijo ninguna» son 7 casos de 5 clubes (candidata a regla); «otra entidad» son 3 casos de Aston Villa (de a uno). Medido: idéntico en `caja-deuda`, `--personal --medir` y los ensayos de 31 clubes; la única diferencia es un `todo-cumplido`, artefacto de que el módulo nuevo no existía en el ANTES. Sin revisión independiente.
- `tools/probar-medir-pipeline.mjs`: la prueba de `medir-pipeline` en un repo de juguete (10 casos, menos de 1 minuto): idéntico, sin explicar, `--explicacion`, clave de la caché, efectos revertidos, corrida muerta y `--restaurar`, nada que medir. Con la clave vieja de la caché sembrada a propósito, falla el caso correspondiente.
- `node tools/fos.mjs cerrar <id>` (`tools/cerrar.mjs`): cierra el punto del TODO, regenera el índice de los .md, audita (qué avisos cambiaron) y comprueba la entrada del CHANGELOG, ESTADO/PIPELINE si cambió tools/, skills y datos (trailer `Corrige:`). No commitea; `--ensayo` solo revisa.
- Hook de commit: `git add <rutas> && git commit` se mira por esas rutas más lo staged (no por todo el árbol); 48 casos de prueba.
- Defecto de proceso encontrado: editar un archivo trackeado MIENTRAS corre una medición hace que `medir-pipeline` lo revierta (lo toma por efecto del medidor). Anotado en la skill de mejora de scripts.

## Versión 961 — hook del diff de skills, hook de commit sobre lo staged, medidores que resumen, reglas sin diseño para Guido [378 · 385 · 386 · ~medir-pipeline.mjs]

- `tools/hooks/post-tool.mjs` (PostToolUse sobre Bash): un `git commit` que toca `.claude/skills/` devuelve «mostrale a Guido el diff con show_pane»; 5 casos de prueba (`probar-post-tool.mjs`). Hace falta reabrir la sesión para que la configuración nueva de hooks rija.
- `tools/hooks/pre-tool.mjs`: el hook de medición y el de auditoría miran lo staged cuando el comando no agrega todo (y la huella es la del blob del índice); cuando la auditoría frena, imprime el «hacer» de `audit-acciones.json` de cada código (se sumaron `asset-v-sin-subir` y `correcciones-desfasado`). 46 casos de prueba, todos ok.
- `tools/medir-pipeline.mjs`: `resumir` en la tabla (valores de personal: aceptados idénticos, que cambian, que se pierden y nuevos; auditoría: avisos por código). Solo lo que cambia o se pierde (o un aviso nuevo) pide `--explicacion`; lo demás queda explicado por el resumen, que va a la línea del registro. Probado retroactivamente sobre el arreglo del 368: salen los dos valores de Aston Villa que se pierden.
- Reglas: el diseño de un cambio a una tool no se le muestra a Guido (`CLAUDE.md`, `mejorar-script.md`); lo deciden el lote y el veredicto general o parche.
- Reproducibilidad de lo cargado en el 368: rehacer `verificar` desde cero da lo mismo que quedó guardado (11 de 11 documentos), el ensayo de `cargar` reproduce lo publicado (11 de 11), y sin las líneas de `ajustes-manuales.jsonl` la herramienta vuelve a proponer las mismas marcas (Fulham).

## Versión 960 — 368: dos arreglos al aplicar el escalón 1 a los datos (2026-10-22) [368 · ~audit.js, ~costo-personal.mjs]

- `audit.js`: el aviso `sueldos-escondidos` acepta la marca `incluye` como resuelta, igual que `sin-salarios` (15 avisos menos, ninguno nuevo). `fos personal` también trata los clubes con ese aviso (Bath Rugby 2021-23 y 2025 quedaron con los sueldos partidos).
- `costo-personal.mjs`: si la nota por estructura del documento del año no es plausible (tabla parecida o la sociedad sola), Jev elige solo entre las filas de ESE documento. Corrige que Leeds 2019 perdiera su valor y que Aston Villa 2023-24 tomara la nota del grupo (194 y 252 M£) contra los 10,8 y 15,2 M£ de sueldos cargados de la sociedad: esos dos valores aceptados antes se pierden a propósito (eran de otro perímetro). Medido con `medir-pipeline`: 23 diferencias, todas explicadas; `caja-deuda` y `--personal --medir` idénticos. Auditoría: P0 0, P1 0, P2 16.

## Versión 959 — 368 cerrado: `fos personal` y los datos del escalón 1 (2026-10-22) [368 · 351 · ~fos.mjs, ~personal-pendientes.mjs]

- `node tools/fos.mjs personal` (`tools/personal-pendientes.mjs`): para cada club con aviso `sin-salarios` completa `staffCost` por la estructura de la nota y parte o marca los sueldos, y cuenta lo que queda; no commitea. La acción del aviso `sin-salarios` en `audit-acciones.json` ya manda ahí. El enganche a `publicarCambios()` se descartó a propósito (una carga abierta dentro de otra).
- Datos aplicados: `staffCost` de 12 clubes británicos (25 club-años) y los sueldos marcados «posiblemente dentro de otra fila» en Fulham 2021-23, Newcastle 2023-24 y West Ham 2023-24 (los totales no cambian). Arreglo extra medido: un «Restated» en la columna anterior de la propia tabla no contradice al año anterior cargado (Newcastle 2024); una sola diferencia, la esperada.
- `sin-salarios`: de 20 a 12 club-años, todos casos de a uno (Aston Villa 2019-22, Celtic 2021-25, Newcastle 2019, Brighton 2023, Instituto 2025, Novorizontino 2010): el 351 queda como lista de ajustes a mano, con prioridad baja.

## Versión 958 — 368 escalón 1: la nota de personal por su estructura (2026-10-22) [368 · 351 · ~costo-personal.mjs]

- `tools/costo-personal.mjs`: antes de preguntarle a Jev, toma la tabla de personal cuyo total es la suma exacta de sus filas (sueldos, cargas sociales, pensiones) en el documento del año; la escala sale del encabezado de esa tabla (£000 o £m); sin estructura o con un valor no plausible (menos del 15 % de los ingresos: la nota de la sociedad sola), sigue Jev como antes; un documento siguiente que reexpresa («Restated») ya no contradice. El vecino deja de ser obligatorio cuando la estructura cierra.
- Medido (`medir-pipeline`, 169 diferencias explicadas): `caja-deuda` y la auditoría idénticos; tabla de verdad ampliada a 27 filas (los 17 valores del 351 que quedaron en los ajustes): 26 iguales y 0 distintos antes y después; en los 31 clubes británicos, 41 valores aceptados idénticos, 0 cambian, 0 se pierden y 25 club-años nuevos (50 en total resueltos por estructura, de 19 clubes). Veredicto «general» en `auditoria-proceso.jsonl`. Sin revisión independiente.
- De los 20 pendientes del 351 salen 7 (Newcastle 2023-24, West Ham 2023-24, Fulham 2021-23); quedan 13. Valores verificados contra las notas en Newcastle 2024, West Ham 2024 y Fulham 2022-23.

## Versión 957 — 368 paso 1: el costo de personal en su módulo, sin cambios (2026-10-22) [368 · 375 · ~caja-deuda.mjs, ~costo-personal.mjs, ~medir-personal-ensayos.mjs]

- El bloque del costo de personal (212 líneas) se mudó de `tools/caja-deuda.mjs` a `tools/costo-personal.mjs`, idéntico salvo `export` (5 en el bloque, 9 ayudantes exportados de caja-deuda; los dos se importan entre sí, seguro porque nada se evalúa al cargar). `caja-deuda.mjs` pasó de 142 a 119 KB.
- Medido con `medir-pipeline`: idéntico en `caja-deuda --medir`, `--personal --medir`, la auditoría y un medidor nuevo, `personal-ensayos` (`tools/medir-personal-ensayos.mjs`: las opciones `--personal` de un club en ensayo sobre 8 clubes, lo que `--personal --medir` no recorre). Sensibilidad probada: subir el umbral del 15 % al 45 % da 28 diferencias; revertido. Sin revisión independiente.
- Rendimiento del 371: la mudanza se hizo con un script de una sola vez (el bloque verbatim y la comprobación de que quedó idéntico), que es lo que el 375 va a necesitar como herramienta.
