<!-- md: qué cambió y cuándo (la última semana; lo anterior está en Archive) | leer: solo por grep de una palabra, nunca de corrido -->
# Changelog

Este archivo es la versión condensada del historial de `finance-of-sports`, versión
por versión, de la última semana (to-do 256: se archiva lo que tiene más de 7 días). **Las Versiones anteriores están en
`Admin/Archive/`: de la 10 a la 299 en `CHANGELOG-v010-v299.md`, de la 300 a la 672 en `CHANGELOG-v300-v672.md`.**
**Desde la Versión 847, el título lleva al final los to-dos y los clubes entre corchetes** (`## Versión N — título (fecha) [292 · besiktas-tr, westerlo-be]`;
sin to-do o sin club, se omite esa parte): así `grep "besiktas-tr" Admin/CHANGELOG*.md Admin/Archive/CHANGELOG-*.md` devuelve solo títulos. Son bullets terses de qué cambió, no el porqué completo.
Para el razonamiento narrativo detrás de cualquier entrada (qué se probó, qué se
descartó, cómo se encontró cada bug) ver `Admin/finance-of-sports-project.md`. Para el
estado actual del proyecto (qué hay armado, qué es real vs. placeholder por club) ver
`Admin/ESTADO.md`, y para la to-do list vigente, `Admin/TODO.md` — hasta la Versión 137
las dos cosas vivían en un comentario HTML al principio de `index.html`.

**Las rutas que aparecen DENTRO de cada entrada son las de su época.** La Versión 196 mudó
los documentos internos a `Admin/` y no reescribió el historial: una entrada de septiembre
que dice `ESTADO.md` era verdad ese día.

---

## Versión 974 — Comentarios de tools/ sin historia: el aviso llega a 0 [374]

- Limpieza a mano de las referencias históricas de los comentarios de las tools de más de 50 KB (`cargar`, `verificar`, `audit`, `alta-club`, `caja-deuda`, `lote`, `vocabulario`, `fetch-fx-reference` y las demás) y dos pasadas mecánicas más; las 1.629 referencias de la medición quedaron en 0. Cada tanda con el código sin comentarios idéntico a HEAD (`comparar-sin-comentarios.js --tools`) y medida por la vía de solo comentarios.
- El aviso `comentario-historico-en-tools` cuenta «Versión N», «to-do N» (de 1 a 3 cifras: «todo 2010» no es un punto) y fechas de 2026 que no son parte de un nombre, una ruta o un flag; una fecha de otro año es un dato o un ejemplo. Medido con el lote completo (audit, lote-ensayo, verificar): el aviso se va y aparece `todo-cumplido` del propio 374; veredicto GENERAL.
- Quedan 77 cabeceras de más de 25 líneas: no entraban en lo que cerraba el punto; la medición las sigue contando (`--medir`).

## Versión 973 — `fos que-pide`: qué va a pedir el commit, antes de commitear [393]

- `tools/que-pide.mjs`: por archivo cambiado (o los que se le pasen; `--staged` mira el índice), dice si una tool está sin clasificar, si es del pipeline o módulo de una y le falta la medición (con su medidor) o el veredicto, si el cambio es solo de comentarios o una mudanza, o si es una skill (commit aparte) o un dato publicable; ✗ y salida 1 si algo falta. Los rechazos de medición y de veredicto del hook de commit lo nombran, y `fos cerrar` marca ✗ lo que el commit va a pedir. Herramienta de orden (`no_pipeline`): sin medición.

## Versión 972 — El índice de los .md no cuenta las salidas de medir-pipeline [391]

- `indice-md.mjs`: la cuenta de `Admin/mediciones` salta `Admin/mediciones/pipeline` (gitignoreado, lo escribe `medir-pipeline`); ya ninguna medición deja `indice-md-desfasado` NUEVO. Medido (audit, chico): 1 diferencia, el aviso viejo que se va; veredicto GENERAL.

## Versión 971 — TODO: tres puntos de la limpieza de comentarios [395 · 396 · 397]

- 395 (`limpiar-comentarios --revisar`: lo que una limpieza borraría y conserva contenido), 396 (la tool se niega a reescribir con `tools/` sin commitear) y 397 (`fos muestra`: una muestra repartida de las líneas que cumplen un patrón, sin `shuf`).

## Versión 970 — Segunda limpieza de comentarios de tools/: otras 662 referencias [374]

- `limpiar-comentarios.mjs` saca también un paréntesis corto con una referencia y a lo sumo 4 palabras más, y la etiqueta de historia con que empieza un comentario; un paréntesis con información («KNVB para la Eredivisie…, decisión de Guido») se deja. 662 referencias en 83 tools; en total 1.165 de 1.629 (quedan 464 en 105 tools y 77 cabeceras largas). Código sin comentarios idéntico en las 83 (`--tools`), medido «idéntico» (solo comentarios).

## Versión 969 — Hooks Stop y SessionStart [388 · 389]

- `tools/hooks/stop.mjs` (evento `Stop`): si el turno dejó cambios (árbol sucio o un commit de los últimos 20 minutos) corre chequeos de segundos y bloquea UNA vez (`stop_hook_active`): archivos sin commitear, `indice-md.mjs --check` y `.md` sin marca, y un punto del TODO que ya cumple un «Verificar:» sin `audit` (esos son de `fos cerrar`). Sin cambios no dice nada; salida de 8 líneas como máximo. Prueba de 6 casos: `probar-stop.mjs`.
- `tools/hooks/session-start.mjs` (evento `SessionStart`): modo, árbol sin commitear, respaldo de una medición muerta (con `--restaurar`), los tres primeros puntos del TODO y una línea de comandos; 10 líneas como máximo. Prueba de 3 casos: `probar-session-start.mjs`. Los dos en `.claude/settings.json`. Sin sesión de prueba todavía: rigen al abrir la próxima sesión.

## Versión 968 — TODO: lo que dejó pensando el 383, el 384 y el 374 [391 · 392 · 393 · 394]

- Puntos nuevos (creados con `todo.mjs --nuevo`): 391 (el índice de los `.md` cuenta `Admin/mediciones` y toda medición muestra `indice-md-desfasado`), 392 (`fos reemplazar`: edición en masa sin que el hook la rechace), 393 (`fos que-pide`: qué va a pedir el commit), 394 (candado de medición: el hook rechaza editar trackeados mientras corre).

## Versión 967 — Primera limpieza de comentarios de tools/: 505 referencias históricas [374]

- `tools/limpiar-comentarios.mjs` (`node tools/fos.mjs limpiar-comentarios [--escribir]`): saca de los comentarios «(to-do N)», «(Versión N)», fechas entre paréntesis y un «TODO N:» inicial, solo dentro de comentarios; ensayo por defecto.
- Corrida: 505 referencias en 91 tools (de 1.629 a 1.132). Probado con `comparar-sin-comentarios.js --tools`: el código sin comentarios de las 91 tools es idéntico al de HEAD y `node --check` pasa; `medir pipeline` lo anotó «idéntico» (lote `solo-comentarios`). Quedan 1.132 en 125 tools y 77 cabeceras largas.

## Versión 966 — Comentarios de tools/: medición, criterio, aviso y prueba de «solo comentarios» [374]

- Medido (`node tools/comparar-sin-comentarios.js --medir`): 166 tools, 36 % de los bytes son comentarios (1,1 MB), 1.629 referencias a «Versión N», «to-do N» o fechas en 145 tools, 13 cabeceras de más de 25 líneas; las peores: `verificar.mjs` (241), `cargar.mjs` (157), `caja-deuda.mjs` (130), `audit.js` (98), `lote.mjs` (96).
- Criterio en `Admin/CONVENCIONES.md`, «Comentarios en tools/». Aviso P3 `comentario-historico-en-tools` en `audit.js` (con su acción en `audit-acciones.json`), sin revisión independiente: P3, solo cuenta; sin diferencias salvo el aviso nuevo.
- `comparar-sin-comentarios.js --tools` (código sin comentarios contra HEAD más `node --check`) y `solo_comentarios` en `pipeline-tools.json`: `medir pipeline` reconoce un cambio de solo comentarios y anota «idéntico» (lote `solo-comentarios`) sin correr un lote; 3 casos nuevos en `probar-medir-pipeline.mjs` (13, todos ok). Una mudanza sigue por los lotes.
- `patron.mjs --en <carpeta>`: el patrón de una condición nueva de una tool se cuenta en los `.js` de esa carpeta (acá `tools`) en vez de en los `.md` de los clubes.
- Falta (queda en el TODO 374): limpiar las tools, de las que más ruido tienen a las de más de 50 KB.

## Versión 965 — `fos patron`: el veredicto general, parche o rechazada por una tool, y el hook lo pide [384]

- `tools/patron.mjs` (`node tools/fos.mjs patron --cambio "…" --patron "<regex>" [--rango A..B] [--escribir]`): (1) sin nombres: el código agregado (sin comentarios) no nombra un club de `data/clubs.js`, un año literal ni una ruta de `Clubes/`; (2) cuántos: documentos y clubes de `Clubes/**/*.md` con el patrón (general desde 3 de 2); (3) no rompe: la medición con la huella actual de cada tool. Veredicto GENERAL, PARCHE (imprime el `ajustes.mjs --agregar`), RECHAZADA o PENDIENTE; `--escribir` anota GENERAL y RECHAZADA en `auditoria-proceso.jsonl` con la huella. Solo juzga tools del pipeline y sus módulos, no los medidores.
- Reproduce dos casos viejos: el 368 escalón 1 (`--rango b64a936596^..b64a936596`: 304 documentos de 71 clubes, sin nombres, medición explicada → GENERAL, como el registro) y el ajuste de Fortaleza 2023 («Total impuesto a cargo»: 4 documentos de 1 club → PARCHE).
- Hook de commit: un cambio de código a una tool del pipeline ya medida pide la línea GENERAL con su huella (`[sin-veredicto]` con el ok de Guido); solo comentarios o mudanza (`patron.mjs --exento`) no la piden. 6 casos nuevos en `probar-pre-tool.mjs` (54, todos ok).
- Skills: auditoría sección 8 y `mejorar-script.md` apuntan a la tool (el diseño ya no se le mostraba a Guido). PIPELINE.md, «Medir un cambio a una tool», con el veredicto. Tool de orden (`no_pipeline`): sin medición de pipeline.

## Versión 964 — `todo.mjs --nuevo`: un punto nuevo sin encabezados ni renumeración a mano [383]

- `node tools/todo.mjs --nuevo --pos <n> --rol "…" --titulo "…"`: crea el punto con el id siguiente al más alto, en el lugar <n> (1 al último+1), renumera los de abajo y deja «Terminado cuando:» y «Verificar: manual» para completar. Rechaza una posición fuera de rango y avisa de un título repetido. Probado insertando al principio, al medio y al final y cerrando los tres con `--cerrar`: `Admin/TODO.md` quedó idéntico. Tool de mantenimiento, no del pipeline: sin medición.

## Versión 963 — TODO: hooks Stop y SessionStart, y la regla de «Jev dijo ninguna» [388 · 389 · 390]

- Puntos nuevos: 388 (hook `Stop` con chequeos baratos al terminar un turno), 389 (hook `SessionStart` con el estado en menos de 10 líneas) y 390 (regla para los 7 casos de «Jev dijo ninguna» de `fos causas`, al fondo de A, prioridad baja). Orden: 383, 384, 374, 388, 389, 379, 375.

## Versión 962 — registro de casos sin resolver con causa, prueba de medir-pipeline y `fos cerrar` [387 · 380 · 382]

- `tools/casos-sin-resolver.mjs` + `Admin/registros/casos-sin-resolver.jsonl`: las tools anotan lo que no pudieron resolver con una causa de código fijo (`costo-personal.mjs`: sin-filas-de-total, jev-ninguna, otra-entidad, sin-escala, suma-cero, vecino-no-coincide, sin-vecino) solo al escribir y solo para los años del aviso (`--anios`); un caso que se resuelve deja una línea «resuelto». `node tools/fos.mjs causas` cuenta por tool y causa y marca «candidata a regla» a la de 3 casos de 2 clubes o más. Primera lectura de los 12 `sin-salarios`: «Jev dijo ninguna» son 7 casos de 5 clubes (candidata a regla); «otra entidad» son 3 casos de Aston Villa (de a uno). Medido: idéntico en `caja-deuda`, `--personal --medir` y los ensayos de 31 clubes; la única diferencia es un `todo-cumplido`, artefacto de que el módulo nuevo no existía en el ANTES. Sin revisión independiente.
- `tools/probar-medir-pipeline.mjs`: la prueba de `medir-pipeline` en un repo de juguete (10 casos, menos de 1 minuto): idéntico, sin explicar, `--explicacion`, clave de la caché, efectos revertidos, corrida muerta y `--restaurar`, nada que medir. Con la clave vieja de la caché sembrada a propósito, falla el caso correspondiente.
- `node tools/fos.mjs cerrar <id>` (`tools/cerrar.mjs`): cierra el punto del TODO, regenera el índice de los .md, audita (qué avisos cambiaron) y comprueba la entrada del CHANGELOG, ESTADO/PIPELINE si cambió tools/, skills y datos (trailer `Corrige:`). No commitea; `--ensayo` solo revisa.
- Hook de commit: `git add <rutas> && git commit` se mira por esas rutas más lo staged (no por todo el árbol); 48 casos de prueba.
- Defecto de proceso encontrado: editar un archivo trackeado MIENTRAS corre una medición hace que `medir-pipeline` lo revierta (lo toma por efecto del medidor). Anotado en la skill de mejora de scripts.

## Versión 961 — hook del diff de skills, hook de commit sobre lo staged, medidores que resumen, reglas sin diseño para Guido [378 · 385 · 386]

- `tools/hooks/post-tool.mjs` (PostToolUse sobre Bash): un `git commit` que toca `.claude/skills/` devuelve «mostrale a Guido el diff con show_pane»; 5 casos de prueba (`probar-post-tool.mjs`). Hace falta reabrir la sesión para que la configuración nueva de hooks rija.
- `tools/hooks/pre-tool.mjs`: el hook de medición y el de auditoría miran lo staged cuando el comando no agrega todo (y la huella es la del blob del índice); cuando la auditoría frena, imprime el «hacer» de `audit-acciones.json` de cada código (se sumaron `asset-v-sin-subir` y `correcciones-desfasado`). 46 casos de prueba, todos ok.
- `tools/medir-pipeline.mjs`: `resumir` en la tabla (valores de personal: aceptados idénticos, que cambian, que se pierden y nuevos; auditoría: avisos por código). Solo lo que cambia o se pierde (o un aviso nuevo) pide `--explicacion`; lo demás queda explicado por el resumen, que va a la línea del registro. Probado retroactivamente sobre el arreglo del 368: salen los dos valores de Aston Villa que se pierden.
- Reglas: el diseño de un cambio a una tool no se le muestra a Guido (`CLAUDE.md`, `mejorar-script.md`); lo deciden el lote y el veredicto general o parche.
- Reproducibilidad de lo cargado en el 368: rehacer `verificar` desde cero da lo mismo que quedó guardado (11 de 11 documentos), el ensayo de `cargar` reproduce lo publicado (11 de 11), y sin las líneas de `ajustes-manuales.jsonl` la herramienta vuelve a proponer las mismas marcas (Fulham).

## Versión 960 — 368: dos arreglos al aplicar el escalón 1 a los datos (2026-10-22) [368]

- `audit.js`: el aviso `sueldos-escondidos` acepta la marca `incluye` como resuelta, igual que `sin-salarios` (15 avisos menos, ninguno nuevo). `fos personal` también trata los clubes con ese aviso (Bath Rugby 2021-23 y 2025 quedaron con los sueldos partidos).
- `costo-personal.mjs`: si la nota por estructura del documento del año no es plausible (tabla parecida o la sociedad sola), Jev elige solo entre las filas de ESE documento. Corrige que Leeds 2019 perdiera su valor y que Aston Villa 2023-24 tomara la nota del grupo (194 y 252 M£) contra los 10,8 y 15,2 M£ de sueldos cargados de la sociedad: esos dos valores aceptados antes se pierden a propósito (eran de otro perímetro). Medido con `medir-pipeline`: 23 diferencias, todas explicadas; `caja-deuda` y `--personal --medir` idénticos. Auditoría: P0 0, P1 0, P2 16.

## Versión 959 — 368 cerrado: `fos personal` y los datos del escalón 1 (2026-10-22) [368 · 351]

- `node tools/fos.mjs personal` (`tools/personal-pendientes.mjs`): para cada club con aviso `sin-salarios` completa `staffCost` por la estructura de la nota y parte o marca los sueldos, y cuenta lo que queda; no commitea. La acción del aviso `sin-salarios` en `audit-acciones.json` ya manda ahí. El enganche a `publicarCambios()` se descartó a propósito (una carga abierta dentro de otra).
- Datos aplicados: `staffCost` de 12 clubes británicos (25 club-años) y los sueldos marcados «posiblemente dentro de otra fila» en Fulham 2021-23, Newcastle 2023-24 y West Ham 2023-24 (los totales no cambian). Arreglo extra medido: un «Restated» en la columna anterior de la propia tabla no contradice al año anterior cargado (Newcastle 2024); una sola diferencia, la esperada.
- `sin-salarios`: de 20 a 12 club-años, todos casos de a uno (Aston Villa 2019-22, Celtic 2021-25, Newcastle 2019, Brighton 2023, Instituto 2025, Novorizontino 2010): el 351 queda como lista de ajustes a mano, con prioridad baja.

## Versión 958 — 368 escalón 1: la nota de personal por su estructura (2026-10-22) [368 · 351]

- `tools/costo-personal.mjs`: antes de preguntarle a Jev, toma la tabla de personal cuyo total es la suma exacta de sus filas (sueldos, cargas sociales, pensiones) en el documento del año; la escala sale del encabezado de esa tabla (£000 o £m); sin estructura o con un valor no plausible (menos del 15 % de los ingresos: la nota de la sociedad sola), sigue Jev como antes; un documento siguiente que reexpresa («Restated») ya no contradice. El vecino deja de ser obligatorio cuando la estructura cierra.
- Medido (`medir-pipeline`, 169 diferencias explicadas): `caja-deuda` y la auditoría idénticos; tabla de verdad ampliada a 27 filas (los 17 valores del 351 que quedaron en los ajustes): 26 iguales y 0 distintos antes y después; en los 31 clubes británicos, 41 valores aceptados idénticos, 0 cambian, 0 se pierden y 25 club-años nuevos (50 en total resueltos por estructura, de 19 clubes). Veredicto «general» en `auditoria-proceso.jsonl`. Sin revisión independiente.
- De los 20 pendientes del 351 salen 7 (Newcastle 2023-24, West Ham 2023-24, Fulham 2021-23); quedan 13. Valores verificados contra las notas en Newcastle 2024, West Ham 2024 y Fulham 2022-23.

## Versión 957 — 368 paso 1: el costo de personal en su módulo, sin cambios (2026-10-22) [368 · 375]

- El bloque del costo de personal (212 líneas) se mudó de `tools/caja-deuda.mjs` a `tools/costo-personal.mjs`, idéntico salvo `export` (5 en el bloque, 9 ayudantes exportados de caja-deuda; los dos se importan entre sí, seguro porque nada se evalúa al cargar). `caja-deuda.mjs` pasó de 142 a 119 KB.
- Medido con `medir-pipeline`: idéntico en `caja-deuda --medir`, `--personal --medir`, la auditoría y un medidor nuevo, `personal-ensayos` (`tools/medir-personal-ensayos.mjs`: las opciones `--personal` de un club en ensayo sobre 8 clubes, lo que `--personal --medir` no recorre). Sensibilidad probada: subir el umbral del 15 % al 45 % da 28 diferencias; revertido. Sin revisión independiente.
- Rendimiento del 371: la mudanza se hizo con un script de una sola vez (el bloque verbatim y la comprobación de que quedó idéntico), que es lo que el 375 va a necesitar como herramienta.

## Versión 956 — 376: cada tool de tools/ clasificada respecto del pipeline (2026-10-22) [376]

- `tools/clasificar-tools.mjs`: cada .js y .mjs de primer nivel cae en una clase: en la tabla (38), módulo que una tool de la tabla usa (75, calculado por los imports; se miden con los medidores de quienes los usan), `no_pipeline` con motivo (44), `sin_medidor` (1: `armar-a-mano.mjs`). `audit.js` suma `tool-sin-clasificar` (P1). Se sumaron a la tabla `pipeline.mjs`, `lote-batch.mjs`, `extraer-etiquetas.mjs`, `bfo-rusia-notas.mjs`, `gestiones-tanda.mjs` y `recategorizar-subsidios.mjs`.
- Lo que el 371 no cubría: un módulo compartido (`vocabulario.mjs`, `rutas.mjs`, `ajustes.mjs`…) cambiaba lo que da una tool del pipeline sin medición. Ahora `medir-pipeline` y el hook lo tratan como a la tool que lo usa (un cambio a `rutas.mjs` pide el lote completo con 7 medidores). El hook también frena una tool nueva sin clasificar. 42 casos de prueba del hook, todos ok; negativo del aviso probado con una tool de prueba y revertido.
- Medido con `medir-pipeline` (audit): idéntico. Sin revisión independiente.

## Versión 955 — 373: mapa de código, contrato entre etapas y regla de no leer archivos grandes enteros (2026-10-22) [373]

- `tools/mapa-codigo.mjs` (`node tools/fos.mjs mapa <archivo> [--buscar texto]`): funciones con su rango de líneas, regiones por banner, tramos adentro de las funciones largas, cabecera e imports. Probado en los 6 archivos de más de 70 KB: 237 rangos, todos parsean como función (3 dudosos marcados con «?»).
- `Admin/CONTRATO-ETAPAS.md` (49 líneas): por etapa, qué lee, qué escribe, qué la deja vieja y con qué comando se rehace, más la cadena de huellas. Verificado contra el código en tres casos: la cadena de `--partir` de caja-deuda, `cargar.mjs --desde-verificacion` y `lote.mjs --rehacer`. La apertura de `PIPELINE.md` no servía como contrato; ahora la cita.
- Regla en `CLAUDE.md`: ningún archivo de `tools/` de más de 50 KB se lee entero. Las skills de arranque y de onboarding citan el mapa y el contrato (commit aparte).
- Medido (un modelo de lectura, no una sesión observada): el primer paso del 368 pasa de leer ≈ 537 KB a ≈ 43 KB (8 %). Hallazgos en `HALLAZGOS-pipeline.md`: `verificar()` es una sola función de 1623 líneas; dos comentarios dicen otra cosa que el código (para el 374).

## Versión 954 — TODO: puntos 373 a 377 para gastar menos tokens leyendo código (2026-10-22) [373 · 374 · 375 · 376 · 377]

- Nuevos: 373 (regla de no leer archivos de más de 50 KB enteros, mapa de código, contrato entre etapas; la apertura de `PIPELINE.md` no sirve como contrato), 374 (comentarios de tools/ que no dicen nada: medir, criterio, limpiar solo comentarios), 375 (partir los archivos grandes en módulos, sin cambiar el comportamiento), 376 (aviso de `audit.js` para una tool nueva sin clasificar en `pipeline-tools.json`) y 377 (Alemania, Rusia, Ucrania y República Checa sin documentos con verificación).
- 368 con el primer paso (extraer el bloque de personal a su módulo, sin cambios, medido) y al día con lo medido en el 371. Orden: 373, 376, 368, 374, 375.

## Versión 953 — 371: tabla de tools, medir-pipeline y deuda de medición del 2026-10-22 medida (2026-10-22) [371]

- `tools/pipeline-tools.json` (31 tools con su medidor y alcance), `tools/medir-pipeline.mjs` (`node tools/fos.mjs medir pipeline`: elige medidor y lote, ANTES con la versión de git y DESPUÉS con lo editado, anota `Admin/registros/mediciones-pipeline.jsonl`) y `tools/familias-docs.mjs` (país × formato).
- Deuda medida con `--base e2aba10226` sobre las 6 tools cambiadas hoy, lote completo (720 documentos): `cargar` (ensayo en cada documento), `caja-deuda` y `caja-deuda --personal`: idénticos; `estadio-sponsor` y `dato-publico`: idéntico; `audit.js`: 30 diferencias, todas el cambio esperado (27 avisos `sin-salarios` que ya no salen con la marca `incluye`, el texto de `indice-md-desfasado`, el chequeo nuevo `todo-cumplido`). Sin revisión independiente.
- Compuerta del 15 % de `caja-deuda --personal`: 0 de los 9 `staffCost` cargados rechazados (mínimo 28,8 %); como solo hay 9, segunda vara con `wages_squad` sobre ingresos de 1109 club-años: 22 (2,0 %) quedan bajo el 15 %, casi todos sueldos escondidos o de otra entidad (Aston Villa, River, Estonia). `Admin/mediciones/371-compuerta-personal.mjs` y `.txt`.
- Hook `medicion-antes-del-commit` en `tools/hooks/pre-tool.mjs`: un `git commit` con una tool de `pipeline-tools.json` sin línea del registro con su huella (idéntico o explicado) se rechaza con el comando; `[sin-medicion]` con el ok de Guido. 8 casos nuevos en `probar-pre-tool.mjs` (39 en total, todos ok).
- Hallazgo: las listas de prueba (armadas a mano y casi nunca regeneradas) cubrían 12 países y 720 documentos; faltaban Inglaterra, Escocia, Dinamarca, Turquía, Croacia, España, Argentina y todos los XHTML, y el último año de 71 clubes. Cualquier cambio de esos países se medía sin verlos.
- `tools/lotes-prueba.mjs` estratificado (país × formato × época × moneda × deporte, semilla fija) y dentro de `tools/generadores.mjs`: se regenera al cerrar cada carga. Hoy: rápida 84 (a mano + un documento por familia), mediana 486, completa 987 documentos, 23 familias. `audit.js` suma `lote-prueba-desfasado` (P2; entrada en `audit-acciones.json`). Medido con `medir-pipeline` (audit): con las listas viejas el aviso salta y desaparece el `todo-cumplido` falso del 371; con las nuevas, idéntico. Sin revisión independiente. Siguen fuera, por no tener ninguna verificación (solo categorías): Alemania, Rusia, Ucrania y República Checa.
- Corrección de `medir-pipeline`: la clave de la caché incluye la huella de todo `tools/` (una tabla como `audit-acciones.json` cambiaba y se reutilizaba el DESPUÉS viejo).

## Versión 952 — Puntos 371 a 372 y regla de medir antes de tocar el pipeline (2026-10-22) [371] [372]

- TODO 371 (prioridad 1): registro de mediciones, hook de commit, tabla de qué lote usar por tool y lotes que se regeneran solos; deuda de medición de lo cambiado hoy sin medir (`caja-deuda.mjs`, `cargar.mjs`, `estadio-sponsor.mjs`, `segunda-fuente-liga.mjs`, `dato-publico.mjs`, `audit.js`). 368 con el detalle de los 20 años y la recursión; 370 en prioridad 3 (P2 23, P3 132); 372 (prioridad baja) para las 67 etiquetas excluidas.
- `CLAUDE.md` y `mejorar-script.md`: la regla de medir antes y después, sin excepción, con el criterio de lote chico, mediano y completo.
- Sin medición todavía de los cambios al pipeline de las versiones 944 a 951: ver el punto 371.

## Versión 951 — Sueldos de los británicos: 38 club-años resueltos y la cadena entera sola (2026-10-22) [351]

- `caja-deuda.mjs --personal`: compuerta de plausibilidad (menos de 15 % de los ingresos no es el personal del club: descartó 8,3 M£ de Aston Villa 2020, que era la nota de la filial sin jugadores); `--partir` marca `incluye wages_squad --posible` cuando ninguna fila global alcanza; con `--escribir` corre ajustes → verificar → Jev → Claude → cargar; el segundo año de un club ya no figura como «ya tiene los ajustes»; un total sin rótulo se publica como «Staff costs (total de la nota de personal)».
- Datos: Leeds 2019-23, Liverpool 2022-23, Nottingham Forest 2022-23 y West Ham 2020-22 con el sueldo partido; 17 club-años de Brentford, Brighton, Newcastle, Sunderland y Wolves marcados «posiblemente dentro de…». `audit.js` acepta esa marca; P2 62 → 23.

## Versión 950 — Fila «Subsidios y donaciones»; Educación se fusiona con Otras secciones (2026-10-22) [350]

- `js/finanzas-calc.js`: ingresos y gastos fusionan Educación con Otras secciones («Otras actividades (educación y otros deportes)»); ingresos suma «Subsidios y donaciones» (`grants_donations`, sin ocultar en cero). Etiquetas en `data/site-labels.js` y `data/lang/en.js`.
- Taxonomía del fútbol (`data/category-map.js`, `taxonomy-football-1.json`): categoría `grants_donations`; REGLA en `Admin/CONVENCIONES-DATOS.md` con prompt y ejemplo (`reglas-categoria.mjs`).
- `tools/recategorizar-subsidios.mjs` + `tools/subsidios-etiquetas.json`: 468 líneas de 111 clubes pasaron de «Otros ingresos» a la fila nueva. `catchall-dominante` bajó de 174 a 131 avisos P3 en total. No cambia ningún total de ingresos.
- La regla «igual que Boca» se reescribió: las filas las define `js/finanzas-calc.js` (skill `club-data-mapping`, `referencia/formato-simplificado.md`, `Admin/PANTALLA.md`).

## Versión 949 — Votación de filas con medición previa; 257 reducido a Tolima (2026-10-22) [257] [350]

- `votacion-de-criterios`: paso explícito para una pregunta sobre una fila o categoría (medir con `fos filas` y `--etiqueta` antes de votar; los números son la evidencia de los votantes).
- TODO 257: el cabo `perfil-en-cola` ya estaba resuelto (`cargar.mjs` nunca frena por eso); queda solo Deportes Tolima, que no está en el sitio. Se sacó del texto el candado de skills (no rige en una sola sesión).

## Versión 948 — Tabla de relevancia de las filas del Formato simplificado (2026-10-22) [350]

- `tools/relevancia-filas.mjs` (`fos filas`) + `Admin/mediciones/filas-formato-simplificado.md` (generado, entra a la lista de `tools/generadores.mjs`): por fila, club-años y clubes con número, peso cuando la tienen, cero real, «—», dónde (país y deporte), y la candidata «Subsidios y donaciones» (estricta y amplia). `--etiqueta` mide otra candidata; `--fila` lista los clubes.
- Skill `club-or-year-onboarding`, `trampas.md`: qué hacer cuando la compuerta frena por estadio o capacidad (candidato, regla de 5 %, prompt fijo para un agente Sonnet).
- TODO 350 queda solo con la decisión de Guido sobre Educación y subsidios.

## Versión 947 — Se cierran 366 y 367: segunda fuente medida, regla de capacidad, agente con prompt fijo (2026-10-22) [366] [367]

- **Corrige la Versión 946:** el estadio «confirmado» NO se escribe solo. Medido en 73 club-años, aun confirmado por el artículo del club coincide con el manual en 70 %: el resto es el mismo estadio con el nombre de otra época. Se quitó esa escritura de `estadio-sponsor.mjs` (y `contexto-manual-escribir.mjs`); el candidato se imprime con el aviso de verificar el nombre de ese año. `contexto-manual.json` queda con el formato normalizado, mismo contenido.
- `tools/medir-segunda-fuente.mjs` (`fos medir segunda-fuente`): OpenStreetMap da capacidad en 5 % y Transfermarkt bloquea; descartados. Regla de capacidad en `tools/dato-publico.mjs` (`TOL_CAPACIDAD` = 5 %): Wikidata y el artículo del estadio difieren menos de 5 % → se toma el artículo; si no, agente. Tabla en `Admin/HALLAZGOS-pipeline.md`.
- `dato-publico.mjs --prompt estadio|capacidad|fundacion`: prompt fijo del agente (Sonnet); sección «Datos públicos de un club» de `Admin/PIPELINE.md` reescrita con los cuatro pasos.
- `segunda-fuente-liga.mjs --auto` y `--pendientes`: la url y el título salen de otro año de la misma liga; `publicarCambios()` lo corre sola al cerrar una carga (hoy los dos pendientes son ligas en grupos y siguen frenando en la compuerta).
- 366 no fusiona `medir-*` ni los adaptadores de búsqueda: leídos `medir-cargar` y `medir-verificar`, comparten el patrón (antes, después, comparar) pero ningún código; fusionarlos no ahorra nada. `fos.mjs` es la puerta.

## Versión 946 — Puerta única de tools, archivar, silenciar, estadio confirmado que se escribe solo (2026-10-22) [366]

- `tools/fos.mjs` + `tools/fos-comandos.json`: lista y atajo de las tools que se corren a mano (grupos `medir` y `buscar`); `--check` dice las sueltas. `renombrar-ids.mjs` (migración terminada) pasó a `tools/archivo/`.
- `tools/archivar.mjs` (mueve a `Admin/Archive/`, lista quién lo cita, regenera el índice) y `tools/silenciar.mjs` (entrada de `audit-ignore.json` con verificación y motivo obligatorios, solo si el hallazgo dispara hoy).
- `estadio-sponsor.mjs`: si Wikidata y el artículo de Wikipedia nombran el mismo estadio, lo escribe en `contexto-manual.json` con las dos citas y vuelve a correr la compuerta (no probado con un caso vivo: hoy ningún club tiene el estadio faltante); la capacidad no se escribe sola. `contexto-manual.json` se normalizó de formato (mismo contenido).
- `CLAUDE.md` recortado: «Cada PDF nuevo» y «Gotchas de tooling». TODO 367 pasó a prioridad 2; el 366 queda con lo que no se hizo (segunda fuente de liga en `alta-club`, capacidad automática, fusión de código).

## Versión 945 — Modo de trabajo en un solo archivo; sin candado de skills en una sesión (2026-10-22) [366]

- `.claude/modo.json` (`node tools/modo.mjs`) dice si se trabaja en una sesión o en varias; `tools/hooks/pre-tool.mjs` aplica solo las reglas del modo (el candado de skills, archivar, Opus, permission_mode, docs de la principal, merge, plan y rsync son de varias sesiones). La prueba corre cada caso en su modo (31 casos).
- `CLAUDE.md`: el texto de una skill se edita sin candado mecánico; Guido lo lee en el diff.
- TODO 366 suma la escritura automática del estadio «confirmado», `archivar.mjs` y `silenciar.mjs`; TODO 367 nuevo: segunda fuente que no sea Wikipedia y agente con reglas.

## Versión 944 — Escalera de datos públicos al pipeline, Wikidata cruzado con Wikipedia, 366 primero (2026-10-22) [366]

- La escalera de búsqueda de un dato público salió de `CLAUDE.md` y vive en `Admin/PIPELINE.md` («Datos públicos de un club»).
- `tools/dato-publico.mjs` cruza el estadio de Wikidata con el artículo del club en Wikipedia: «confirmado por» o «SOLO Wikidata»; `estadio-sponsor.mjs` lo imprime así.
- El punto 366 pasó a prioridad 1. `Admin/CONVENCIONES.md`: sale la regla de no transcribir PDFs nuevos (queda la nota de Bath Rugby).

## Versión 943 — Verificación del TODO, mapa de acciones, Wikidata y generadores al día (2026-10-22)

- `Admin/TODO.md`: cada punto lleva `Verificar: ...` (`audit <código> = 0`, `existe`, `contiene`, o `manual`; formato en `tools/todo-verificar.js`). `audit.js` avisa `todo-cumplido` (cerrarlo) y `todo-sin-verificar`; `node tools/todo.mjs --verificar` lo muestra y `--cerrar` se niega si la condición no se cumple (`--forzar` lo cierra igual). De los 16 puntos, solo el 365 tiene una condición comprobable hoy; los demás son `manual`, y todo punto nuevo tiene que declararla.
- `tools/audit-acciones.json` y `node tools/audit.js --acciones`: para cada código que dispara, qué hacer, quién (script, sesión, Guido o nada) y dónde está cubierto; un código sin entrada da `codigo-sin-accion` (P3).
- `tools/generadores.mjs` (lo que corre `publicarCambios()` al cerrar toda carga) suma `generate-fuentes-index.js`, `auditoria.mjs` e `indice-md.mjs`: audit.js verificaba los dos primeros como P1 y nadie los corría, así que una carga que los dejara viejos se revertía entera. `audit.js` avisa `generador-sin-correr` (P2) si vuelve a pasar. `indice-md.mjs` ahora escribe por defecto (`--problemas` solo imprime).
- `tools/dato-publico.mjs`: fundación, estadio y capacidad por año y sitio web desde Wikidata, con cita. `estadio-sponsor.mjs` lo imprime como candidato cuando a un club le falta el estadio. Medición en `Admin/HALLAZGOS-pipeline.md`. `CLAUDE.md` pasa a tener la escalera para buscar un dato público.
- Se borró `tools/fuente-companies-house.mjs` (reemplazada por `fuente-url-xhtml.mjs` en la 942).

## Versión 942 — La url del registro oficial se pone sola; decisiones con su aplicación; 352 medido (2026-10-21) [352]

- `tools/fuente-url-xhtml.mjs` (reemplaza a `fuente-companies-house.mjs`): cubre Reino Unido (Companies House) y Dinamarca (Virk), elige el XHTML del club por la evidencia de carga (hay muchos `aarsrapport-2021-12-31.xhtml` de clubes distintos) y comprueba que los hechos etiquetados coincidan con el archivo local. `publicarCambios()` de `cargar.mjs` la corre con `--todos --escribir` al cerrar toda carga, alta o caja y deuda: nadie tiene que acordarse. Probada contra las 13 fuentes XHTML cargadas: coinciden 12; FC København 2025 no (su informe de grupo es el que el conversor deja afuera).
- `tools/decision.mjs`: registra una decisión en `Admin/registros/auditoria-proceso.jsonl` (el JSON lo arma la tool) y, con `--punto <id> --aplicar "paso"`, copia los pasos al cuerpo del punto del TODO. La regla está en la skill `auditoria-finance-of-sports` (P2 y P3, paso 3).
- 352: `tools/medir-ixbrl-consolidado.mjs`. De los 317 XHTML, 37 traen un `ProfitLoss` de grupo y solo Burnley 2024-25 está cargado (coincide); sin minoritarios cargados, el consolidado sigue como aviso. Condición para retomar (un número que imprime la tool) en `Admin/HALLAZGOS-pipeline.md`; decisión de la Auditora registrada.
- Se sacó de `CLAUDE.md` la regla de reportar `.md` tocados y leídos en vano: era de esta sesión.

## Versión 941 — P2 y P3: fixes aprobados codeados y novena corrida (2026-10-21) [347]

- `audit.js`, los fixes aprobados por la Auditora 5: `signo-invertido` no se emite si el lado del ejercicio cierra contra su total oficial, y sin total oficial es P3 (P2 20 → 0); `escala-implausible` sin la rama P3 de año vecino (P3 5 → 0, el P0 igual); `salto-interanual` solo entre años a 2 de distancia como mucho, y `cambio-de-formato` (P3) cuando un año imprime solo el margen bruto belga (P2 4 → 0; Novorizontino 2010-2012 verificado contra el documento y silenciado). `outlier-liga` y `gestion-club-inexistente` ya estaban codeados: el punto estaba desactualizado (premisa vencida). Totales: P2 86 → 62, P3 192 → 174; el resto de la salida idéntico (antes y después con `--json`).
- Novena corrida, `fuente-xhtml-sin-url` (P3 7 → 0): las 7 fuentes iXBRL británicas ya llevan la url de Companies House. `tools/fuente-url-xhtml.mjs` la busca por número de empresa y cierre y comprueba que el XHTML publicado tenga los mismos hechos etiquetados que el archivo local; el aviso de `audit.js` la nombra.
- `audit.js` avisa `audit-ignore-sin-uso` (P3) y `--podar-ignore` las saca: salieron 116 de las 179 entradas de `tools/audit-ignore.json`, que ya no silenciaban nada (la mayoría `signo-invertido`).
- Registrado en `Admin/registros/auditoria-proceso.jsonl` (sesión única). Condiciones nuevas en una tool revisadas por la propia sesión, sin revisión independiente. Quedan para otros puntos: `catchall-dominante` (350), `sin-salarios` (351), `liga-una-fuente` (HALLAZGOS).

## Versión 940 — Sin worktrees, índice de .md y candado de Bash aflojado (2026-10-21)

- Los 7 worktrees (`fos-*`) y sus ramas ya mergeadas se borraron. Antes se copiaron a `main`, sin pisar nada, los 2.317 archivos de `Clubes/` y `Generados/` que solo estaban ahí (transcripciones, XHTML y resultados de lotes); 214 archivos tracked modificados de `Generados/` del worktree de finanzas (salidas regenerables) no se copiaron.
- `tools/indice-md.mjs` y `Admin/INDICE-md.md` (generado): cada `.md` vivo declara en su primera línea `<!-- md: qué es | leer: cuándo -->`; la tool cuenta quién lo cita y lista huérfanos y documentos sin marca. `audit.js` avisa `indice-md-desfasado` (P3). Archivados los 7 huérfanos que encontró (5 propuestas y 2 notas de transcripción, 76 KB de ellas de un registro de avance viejo).
- Hook `pre-tool.mjs`: un Bash puede escribir en `.claude/skills/` (el candado era del modo de varios worktrees); Edit y Write siguen pidiendo el texto en `Admin/propuestas/`. Pruebas del hook al día (28 casos).
- `CLAUDE.md`: al cerrar cada tarea, un bloque de proceso (qué `.md` se tocaron y cuáles se leyeron en vano, qué debería ser skill, regla o script); y no preguntarle a un club lo que está en internet. Se sacó de `dudas-por-club.md` la pregunta sobre Lierse (fundación, licencia y número de afiliación son públicos).

## Versión 939 — Lierse: dos clubes, sucesor y ligas; TODO por prioridad y skills partidas (2026-10-21) [355 · 365 · liersesk-be, liersekempenzonen-be]

- 355: `club.predecessor_id` (opcional, aditivo en el esquema 2.0: `json-datos.mjs`, `generar-schema-json.mjs`, `Admin/mediciones/245-esquema.md`); `liersesk-be` lo lleva con `liersekempenzonen-be`. La NV pasa a liga null en 2019-2021 (no jugó; la vzw ocupa esa plaza). `faltantes-liga.mjs` acepta en `alias.json` una entrada «Nombre (2019-2021)» que vale solo para esas temporadas (el mismo nombre de lista era dos clubes): los alias que faltan bajan de 3 a 0; el resto de la salida de `--print` es idéntico. Condición nueva en una tool revisada por la propia sesión (sección 7 de la skill de auditoría): sin revisión independiente. Pregunta del stamnummer y la fundación en `Admin/dudas-por-club.md`.
- 365 (nuevo): Lierse Kempenzonen 2022 y los años sin depósito.
- `Admin/TODO.md` pasa a una sola lista por prioridad: cada punto es `### orden. id · título` con su cuerpo debajo; `node tools/todo.mjs` lista, `node tools/todo.mjs <id>` muestra un punto y `--cerrar <id>` lo borra y renumera. Arregla la contradicción entre «números = identificadores» y «prioridad = orden».
- Skills partidas con el texto sin cambios: `club-or-year-onboarding` (18 KB → 3,5 KB, con `correr-clubes.md`, `mejorar-script.md`, `reglas.md`, `trampas.md`) y `club-sourcing` (47 KB → 20 KB, con `referencia/` por sección 0.x); cada `SKILL.md` dice cuándo abrir cada archivo y cuándo no.

## Versión 938 — Fuentes danesas con url, 359 cerrado (2026-10-21) [359 · silkeborg-dk, viborg-dk]

- Silkeborg 2025 y Viborg 2025 (iXBRL) llevan la url del depósito de `regnskaber.virk.dk`, buscada por CVR en `distribution.virk.dk` (el número de la url del depósito no es el CVR). `audit.js` sigue en 0 P0 y 0 P1.
- Premisa vencida: el punto decía 15 fuentes danesas sin url y solo faltaban 2; las otras 13 las había resuelto Onboarding 9 y el TODO no se actualizó.
- Emmen 2019-21 sigue como pregunta al club en `Admin/dudas-por-club.md` (no frena la carga; las líneas `falta_transcripcion` quedan hasta que conteste).

## Versión 937 — Menos archivos y menos lectura al arrancar (2026-10-21)

- `CLAUDE.md`: apertura nueva (sin el repo hermano); el bloque «Modo de trabajo» queda como lo único que hay que leer del modo de una sola sesión.
- Skill de arranque reescrita: de 13,5 KB a ~7 KB (una tabla de qué leer según la tarea, verificar, cerrar, git). La skill `principal-finance-of-sports` y `worktree.md` salieron; su contenido está en `Admin/Archive/modo-varias-sesiones.md`.
- `Admin/ESTADO-pipeline.md` desaparece: su resumen vigente entró en `ESTADO.md` (sección Pipeline) y el detalle por país ya estaba en `PIPELINE.md` y `ESTADO-clubes.md`.
- Sin «Versión N», «to-do N» ni fechas de decisión (se conserva quién decidió y el caso) en `CONVENCIONES-DATOS.md`, `CONVENCIONES.md`, `ESTADO.md`, `PIPELINE.md`, `PANTALLA.md` y `ARQUITECTURA.md`. Quedan frases sueltas con «Versión N» en `PANTALLA.md` y `PIPELINE.md` (`historia-en-doc-de-criterio`, P3).
- 10 propuestas ya aplicadas pasaron a `Admin/Archive/propuestas/` y las 6 notas de `Admin/sesiones/` a `Admin/Archive/sesiones-modo-anterior/`.

## Versión 936 — Segunda fuente de las ligas, cerrada (2026-10-21) [358]

- `segunda-fuente-liga.mjs` sobre las 22 liga-temporadas que quedaban (páginas de RSSSF ya bajadas, sin API): 20 escritas en `tools/club-league-reference/` (Argentina 2025; Bélgica 2018-24; Suiza 2011-12; Championship 2022; Grecia 2021 y Super League 2 2018; Eerste Divisie 2025; Liga Portugal 2 2022-25; Premier rusa 2022-23). `liga-una-fuente` baja de 10 ligas a 2; P3 de 192 a 184; `liga-fuentes-no-coinciden` queda en 0.
- 5 alias en `alias.json` (CSKA Moskva, Lokomotiv Moskva, Krylya Sovetov Samara, SC Cambuur (Leeuwarden), Académico de Viseu FC): el mismo club con otro nombre en RSSSF, mismas posiciones que Wikipedia.
- Las 2 que quedan (Super League 2 griega 2025, Liga 3 portuguesa 2023) frenan en la compuerta por tener dos grupos; línea en HALLAZGOS con la condición para retomarlas. Sin cambios en `tools/*.mjs` ni en lo publicado.

## Versión 935 — Modo de una sola sesión y arranque más corto (2026-10-21) [298]

- `CLAUDE.md`: bloque «Modo de trabajo: una sola sesión» (un rol por vez con su skill, lo que hacía la Auditora, tokens, cómo hablarle a Guido, cierre directo a TODO, CHANGELOG y ESTADO). Ya no se leen `principal-finance-of-sports`, `worktree.md` ni `Admin/sesiones/`.
- `Admin/ESTADO.md` partido: el detalle del pipeline por país pasó a `Admin/ESTADO-pipeline.md` (se lee solo al onboardear o tocar tools). Arranque fijo: de ~63 KB a ~45 KB (`CLAUDE.md` + skill de arranque + `ESTADO.md`).
- `Admin/CONVENCIONES.md`: nota en el bloque de roles (en una sola sesión el circuito se colapsa).
- `Admin/TODO.md`: el 298 estaba cortado a una línea; se recuperó del historial y entró al plan (D, punto 15). El resto del plan se renumeró.
- Las skills no se tocaron (candado): recortar `start-session…` y `principal…` queda como propuesta a Guido.

## Versión 934 — 10 altas británicas, segunda fuente de ligas y período del iXBRL (2026-10-21) [356 · 358 · 359 · 362 · 363 · 364 · afcwimbledon-gb, barnsley-gb, burtonalbion-gb, carlisleunited-gb, chesterfield-gb, exetercity-gb, gillingham-gb, lincolncity-gb, shrewsburytown-gb, wiganathletic-gb, falkirk-gb]

- Datos (356): 10 altas británicas desde el XHTML (lotes 140 y 141): AFC Wimbledon, Barnsley, Burton Albion, Carlisle United, Chesterfield, Exeter City, Gillingham, Lincoln City y Shrewsbury Town 2025, y Wigan Athletic 2024; ~US$ 1,9 de US$ 35. Quedan 12 clubes que esperan el conversor XHTML, Morecambe y Ross County por defectos de script, y Falkirk, que espera la liga.
- Datos (359): líneas del auditor de Omonia, Fiorentina, Genoa, Atalanta y Girona, Chapecoense y Goiás revisados, 13 urls danesas más. Emmen va como pregunta al club.
- Criterio: votación 2 a 1, la liberación de un goodwill negativo va a `exceptional_items` (Falkirk 2024-25), en CONVENCIONES-DATOS.
- `segunda-fuente-liga.mjs` arreglado (sección por su nombre, UTF-16, filas con un espacio): 19 de las 21 liga-temporadas frenadas pasan; 26 temporadas con segunda fuente escritas (358); `liga-una-fuente` baja de 17 a 10 ligas.
- `periodo.mjs`: escalón 0 con el período etiquetado del iXBRL (0 cierres cargados cambian); destraba 16 británicos.
- `emisorDe` lee el XHTML entero si el `identifier` no está en los primeros 600 KB (17 de 249 quedaban sin emisor). `caja-deuda.mjs`, `perimetro-senales.mjs` y `alta-club.mjs` avisan cuando leen solo una parte del documento.
- `lote.mjs`: aviso en el ensayo cuando un alta trae más de un ejercicio.
- Registro público de correcciones (`correcciones.html`, `data/correcciones/`, `tools/generar-correcciones.mjs`): 236 eventos en 56 clubes, motivos por curar (364).
- `referencia/ux.md`: excepción de 44 px para los links en texto corrido (ok de Guido), en la skill de pantallas.
- Skill principal: modo una sola sesión, sin worktrees (e5673abef9).
- Notas de Auditora 6, Pantallas 7, Pipeline 15 y Onboarding 9 pasadas al TODO (nuevos 362, 363, 364; se borra el 361) y archivadas.

## Versión 933 — documentos de grupo, áreas de toque de 44 px (2026-10-21) [361 · fleetwood-gb]

- Votación 3 a 0, en CONVENCIONES-DATOS: un consolidado de grupo vale como documento del club si el club está en el grupo el ejercicio entero y lo ajeno pesa ≤ 10 % del turnover impreso. No cambia ningún año cargado; Fleetwood/Jaymel queda descartado. El freno que la aplica queda en la cola de Pipeline.
- 361: hasta 700 px los controles fuera de Ligas llegan a 44 px; los links dentro de un texto agrandan su área sin mover nada. ASSET_V 1713.
- ux.md: los casos que resolvió el 360, en pasado.

## Versión 932 — 345 cerrado, reglas para no trabarse, UX y COVID en pantalla (2026-10-21) [345 · 352 · 356 · 358 · 359 · 360 · girona-es, genoa-it, fiorentina-it, omonia29maiou-cy]
- Datos: Girona 2021-23 recargado (resultado por venta de jugadores en su campo), Fiorentina 2020 y Genoa 2024 cargados y Atalanta 2022 recargado como tramos de transición, alta de Omonia 29 Maiou (Chipre, ligas nuevas), líneas del auditor y urls danesas del 359, 26 temporadas con segunda fuente RSSSF (358); Fleetwood (Jaymel) descartado.
- Reglas: COVID y tramo corto (CONVENCIONES-DATOS), dos fuentes por liga, id de club nuevo por alta-club.mjs, registro de rarezas del documento, una tool que decide no lee solo una parte, lote de un solo tipo, «Terminado cuando:» en el TODO, lo que entra sin esperar a la Auditora, worktree trae main con --ff-only, eje ux en la auditoría.
- Tools: tramo corto y `period_months`, ventana COVID, freno del iXBRL en el individual (352), chequeos `archivo-no-es-lo-que-dice`, `liga-una-fuente`, `referencia-a-club-inexistente`, `segunda-fuente-liga.mjs`, `rarezas.mjs`, mergear regenera sponsors.js; hook `pdfs-con-ok` corrige a la sesión en vez de preguntarle a Guido.
- Pantalla: marca COVID (etiqueta) en Finanzas, Comparar, Ligas y el selector; scroll y foco al cambiar de vista, 404 de club-leagues, toques de 44 px en Ligas, países abiertos al volver; guías de marca y de UX en la skill de pantallas.

## Versión 931 — Lo estructurado no se paga con IA, parches contra mejoras generales y el resto del 257 (2026-10-21) [257 · 345 · 350 · 353 · 356 · 357 · brondby-dk]
- Skills: sección 8 de auditoría (mejora general o parche, con su umbral de 3 documentos de 2 clubes) y su referencia en onboarding 3b; «lo estructurado no se paga con IA» en onboarding y auditoría (sección 4) y en CONVENCIONES; club-sourcing: un archivo bajado se mira con `file` (caso Brøndby 2025, que venía en gzip) y su troubleshooting en PIPELINE.md.
- 257 partes 7 y cabos sueltos: verificar una pantalla y «Cómo verlo como archivo» pasan a `producto-y-pantalla/referencia/navegador-de-preview.md`; los pasos de worktree (con `data/sponsors.js` entre los generados) a `worktree.md`; cerrar un punto del TODO a la skill principal; HALLAZGOS de los descartes 314 y 298.
- `xhtml-aarsrapport.mjs`: nunca pisa un PDF o `.md` que no generó; Plymouth 2022-23 (tabla anidada) y 16 portadas recuperadas. `lote.mjs` no paga IA sobre un documento xhtml-ixbrl sin `--pagar-ia-xhtml`; P1 `pago-ia-sobre-determinista`.
- 356: 198 `.xhtml` británicos bajados (84 MB), los 68 con PDF oficial al lado renombrados a `-ixbrl`; links del registro danés para 20 años; copia descomprimida de Brøndby 2025.
- 350 en espera de la tabla de ceros del Formato simplificado; ninguna fila se oculta en cero. TODO 357: mostrar las inyecciones de capital.

## Versión 930 — Lote 130: 12 años más, Lierse, 350 y británicos en iXBRL (2026-10-21) [345 · 350 · 355 · 356 · brondby-dk, fredericia-dk, girona-es, burnley-gb]
- Onboarding 8: Brøndby 2021, FC København 2025 (individual), Fredericia 2021-25, Emmen 2020-21, Chapecoense 2019, Vålerenga 2024 (1. divisjon), Girona 2022-23, Nordsjælland 2025, Vejle 2025 y Goiás 2020. Burnley 2022 y 2023 tenían la liga al revés (`Corrige:`). Fredrikstad 2019-23 y Sarpsborg 2009-11 descartados: son de sociedades tenedoras de derechos, no del club.
- Lierse: dos clubes (BCE distintos), sin alias entre ellos. 350: medición de categorías, votación de `grants_donations` (3 a 0) y propuesta de revisión de la taxonomía, sin aplicar.
- 356: 54 de 68 sociedades de League One, League Two y Premiership escocesa tienen iXBRL; bajados 69 `.xhtml` (cuentas completas, últimos 3 cierres).
- `Admin/difusion/calendario.md` creado. Propuesta del criterio de mejora general o parche.

## Versión 929 — Chequeos del iXBRL, skills existentes y corridas de P2 y P3 (2026-10-21) [257 · 345 · 347 · 352 · 353 · 354]
- 257 parte 3 (Orden 1, ok de Guido): club-sourcing, start-session, club-outreach, worktree.md, club-or-year-onboarding, CONVENCIONES-DATOS y CONVENCIONES con las reglas que vivían en la memoria de la principal; la memoria se borró (queda un índice que apunta a las skills).
- 352: `tools/ixbrl-resultado.mjs` avisa si el resultado cargado no coincide con el `ProfitLoss` etiquetado (aviso, no frena; ajuste `ixbrl-omitir`).
- 345: el lector danés alinea mejor (alineador óptimo, span absoluto): 8 informes más pasan (AaB, Aarhus Fremad, Esbjerg, Helsingør, OB 2022-25); el consolidado de FC København 2025 no se escribe (Auditora 5). Lote 131: 8 transcripciones (Girona 2021-23, Goiás 2018-20, Novorizontino 2012, Fiorentina 2020).
- 347: `gestion-club-inexistente` 26 a 5 (una línea por país; P1 solo si un id se parece a un club cargado); `ejercicio-sin-rastro` revisado (los faltantes van a Pipeline); `salto-interanual` (dos silencios con motivo).
- 353: Companies House: los grandes británicos presentan PDF; 9 de 36 en iXBRL.
- 354 al TODO: `perfil-en-cola` no frena y aviso de flechas en `mergear`.

## Versión 928 — Lector del XHTML danés, lote 130 y dos corridas más de P2 y P3 (2026-10-21) [345 · 347 · sonderjyske-dk]
- `tools/xhtml-aarsrapport.mjs`: un informe danés en XHTML (iXBRL) pasa a `.md` fiel con un PDF de ancla, con dos compuertas (no escribe con menos de 98 % de líneas ubicadas) y el motor «xhtml-ixbrl (determinista)» (Auditora 4). Convierte 7 de 8; no el consolidado de FC København 2025.
- Lote 130 (Pipeline 12): SønderjyskE 2024 cargado (alta); el resto sigue con Onboarding 8. US$ 3,29.
- `signo-invertido` 30 a 17 (líneas netas y deducciones impresas no son un signo invertido); `outlier-liga` medido (la mediana del país mezcla divisiones; se pasa a P3).
- Auditora 4 y Pipeline 12 archivadas (ventana llena, pedido de Guido); la Auditora es Auditora 5.

## Versión 927 — Segunda corrida de P2 y P3; enlaces rotos; tres herramientas más (2026-10-21) [347 · 349 · 350]
- `catchall-dominante` pasa a P3 y no cuenta un catch-all de una o dos líneas (la Auditora: describe cuánto detalla el documento, no un defecto). La auditoría queda en P2 115 y P3 206 (antes 371 y 1.002).
- `worktree.mjs preparar` saca de `Clubes/` del worktree los enlaces rotos (nunca un archivo real).
- 349: OpenSEO (solo con DataForSEO pago), Book to Skill y Open Generative AI (API paga): ninguna se instala (`Admin/mediciones/349-herramientas.md`).
- 350 al TODO: una categoría para subsidios y donaciones.

## Versión 926 — Herramientas revisadas: ninguna se instala (2026-10-21) [320 · 321 · 322]
- 320 Browser Use: sin caso (los portales de secuencia fija tienen captcha, bloqueo geográfico o ya se recorren con curl). 321 Higgsfield: pago mensual y créditos sin tope; no se conecta. 322 Zapier: no hace falta para el 335; OmniRoute: concentra claves y prompts y el ahorro ya lo dan la API de lotes y Sonnet. Mediciones en `Admin/mediciones/320-*.md`, `321-*.md` y `322-*.md`.
- Enlaces rotos de `Clubes/` en dos worktrees (de la mudanza del 278) sacados; frenaban commits con P1.

## Versión 925 — Sourcing de los años con vía concreta; primera corrida de P2 y P3; skills (2026-10-21) [346 · 347 · 257 · goias-br, novorizontino-br, fiorentina-it]
- 346 (Sourcing 4): Goiás 2018-20 (Wayback), Novorizontino 2012 (3 JPG a PDF) y Fiorentina 2020 (6 meses, Issuu) en `Clubes/`; no aparecieron Ferroviária y Novorizontino 2011, Gladbach y Stuttgart 2025 (se esperan para enero de 2027), Monza 2025 ni Lierse 2023-25. Basel 2022: la nota estaba bien (los dos 2022-23 de la carpeta son de otras entidades).
- 347: primera corrida de «un código por corrida» (Auditora 4): `linea-duplicada` es un falso positivo (927 rótulos repetidos con montos distintos, ninguno copia); se saca la rama P3. Próximo: `catchall-dominante`.
- Skills: el proceso de P2 y P3 en la de auditoría; cada tarea a la sesión de su rol en la principal (ok de Guido).
- 345: `tools/xhtml-aarsrapport.mjs` convierte los informes daneses en XHTML (iXBRL) a `.md` (Auditora 4 aprobó); 7 de 8 casos; no el consolidado de FC København 2025.

## Versión 924 — Años sin rastro revisados (2026-10-21) [317 · 345 · 346 · acmilan-it, lazio-it, sampdoria-it, chievoverona-it, osasuna-es, almagro-ar, ferrocarriloeste-ar, losandes-ar]
- `ejercicio-sin-rastro` no reporta un año cerrado hace menos de 9 meses (Auditora 4): 23 clubes y 41 club-años. Silenciados con motivo 8 clubes sin documento publicado y ya buscados.
- Dos listas nuevas en el TODO: documentos en mano sin cargar (345) y sourcing con vía concreta (346).

## Versión 923 — Inicio sin conteos; archivar solo si Guido lo pide (2026-10-21) [344 · 257]
- 344: Inicio ya no dice cuántos clubes, países y ejercicios hay ni «N clubes con balance»; el ranking con US$ queda. Ligas e Inicio probados abiertos como archivo (Chrome sin ventana: cómo, en PANTALLA.md).
- Skill principal: una sesión que terminó queda abierta; se archiva solo si Guido lo pide (ok de Guido; la memoria se borró). El matcher de los hooks suma archivar, abrir una sesión y cambiar de modelo.
- El candado de skills mira a qué archivo escribe un comando, no si la ruta aparece en el texto.

## Versión 922 — Chequeos de dónde se pierde lo decidido y candado de skills (2026-10-21) [257]
- `audit.js` P3 `duda-resuelta-en-dudas`, `registro-sin-lector` y `medicion-sin-destino` (con `Admin/mediciones/README.md` como índice); `historia-en-doc-de-criterio` mira también ESTADO.md. `gasto.mjs` imprime el gasto A2 contra el techo del 15 %.
- `tools/hooks/pre-tool.mjs`: el candado de skills (un cambio a una skill necesita su texto commiteado en `Admin/propuestas/`), y piden ok archivar una sesión, abrir una en Opus, abrir un worktree sin modo de permisos, escribir una regla en la memoria y un comando que edita. Aprobados por la Auditora 4.
- Parte 7 de `Admin/propuestas/257-skills.md`: qué de CONVENCIONES pasa a skills (sin aplicar).

## Versión 921 — Ligas nueva, Escocia aparte, el anexo que abre las ventas (2026-10-21) [344 · 237 · celtic-gb, mafra-pt, asroma-it]
- 344: la lista de Ligas como el mockup aprobado (filtros de deporte, región e informes; agrupar por país, deporte o nivel; orden; estado en la URL). Sin conteos de clubes cargados ni plata en el encabezado de liga ni en las tarjetas de Inicio; el ranking y «La liga en total» quedan.
- Escocia es un país aparte (`COUNTRIES.SCT`, la Premiership escocesa con `country:'SCT'`); `CLUB_NATION` y `nationOf()` en `data/leagues.js` dan el país de un club sin cambiar ids ni carpetas (Celtic). La regla de Gales (el país de una liga es el de su federación; el de un club, donde está) en `CONVENCIONES-DATOS.md`.
- 237 al: `tools/cuadro-sobrante.mjs` (lo llama `extraer.mjs`, solo en extracciones nuevas) usa el cuadro que abre un renglón cuando suma exacto (Mafra 2023-24, AS Roma 2009); 0 falsos positivos en 15.826 casos. Auditora 4 aprobó el código.

## Versión 920 — El sponsor sin fuente pide evidencia de búsqueda; chequeo de años sin rastro (2026-10-21) [343 · 317 · 257]
- 343: club-sourcing 0.5 (cómo buscar el sponsor y dejar el registro); la compuerta de `estadio-sponsor.mjs` solo acepta un sponsor sin fuente con un registro de búsqueda válido (`tools/sponsor-busqueda.js`) o en `tools/sponsor-legacy.json` (26 años de 8 clubes, congelados); `audit.js` P1 `sponsor-sin-busqueda` y `sponsor-legacy-fuera-de-lista`, P3 `sponsor-sin-registro`. Medido: 0 años frenados nuevos. Auditora 4 aprobó el código.
- 317: `audit.js` P3 `ejercicio-sin-rastro`: años no cargados ni anotados en `data/faltantes/` (51 clubes).
- Skills nuevas `contrato-de-datos-finance-of-sports` y `principal-finance-of-sports` (el rol de la sesión principal, que vivía en su memoria), con el ok de Guido. club-or-year-onboarding: el sponsor sin fuente pide el registro de club-sourcing 0.5.
- 317: `ejercicio-sin-rastro` calcula el máximo del país sin los presupuestos (de 51 clubes a 38).

## Versión 919 — Skill de deploy; Ligas aprobada (2026-10-21) [257 · 344 · 237 · 317 · 319]
- Skills nuevas `deploy-y-release-finance-of-sports` (antes del push y después) `producto-y-pantalla-finance-of-sports` (mockup, ok, construir, verificar servido, como archivo y en celular) y `contenido-y-difusion-finance-of-sports` (una publicación con dato verificado y fuente), con el ok de Guido; CLAUDE.md las nombra.
- 317: la Auditora 4 aprobó con cambios el chequeo de huecos de años y rechazó el de atraso como chequeo aparte.
- 344: Guido aprobó el mockup de Ligas sin conteos ni plata; se sacan los conteos del encabezado de liga y de Inicio; Escocia se separa.
- 237 al: la Auditora 4 aprobó el diseño con dos cambios (sin codear).
- 317: Postgres local con los 320 clubes no sirve para decidir cuándo `data/*.js` deja de alcanzar; no se migra (`Admin/mediciones/317-supabase.md`). 319: repo verificado, sin instalar. 318: sin probar (pide Docker).

## Versión 918 — El alta propone una liga y un deporte nuevos (2026-10-21) [341 · 343 · 317]
- 341: `tools/catalogo-liga.mjs --liga <id>` propone la entrada de `LEAGUES` desde Wikipedia (nombre, país, deporte, nivel; sin IA) y, para un deporte nuevo, lo que falta para activarlo (taxonomía, `CEROS_POR_DEPORTE`, un club, reglas de categoría inválidas: `validarReglasPrompt`). `--escribir` exige la aprobación registrada: la Auditora para una liga, Guido para un deporte. Medido sobre 63 ligas: deporte igual en 60, nivel en 59. Un deporte se activa con un solo club; el nivel de rugby sigue la RFU.
- `audit.js` no se cae con un enlace roto de worktree.
- 343: Guido aprobó el texto de la sección 0.5 de club-sourcing (buscar el sponsor con evidencia).
- 317 a 319: abierta Pruebas 1 (Supabase, Open Notebook, I have ADHD).

## Versión 917 — Carpetas duplicadas unidas; propuestas de sponsor, skills y mockup de Ligas (2026-10-21) [278 · 287 · 343 · 344 · 257 · 258 · botafogosp-br, omonia29maiou-cy, rcdeportivo-es]
- 278/287: `mudar-carpetas.mjs` unió las 12 carpetas del manifiesto y los 3 PDFs guardados en el club equivocado (Botafogo-SP 2023 estaba en Botafogo, Omonia 29is Maiou en Omonia Nicosia, RC Deportivo 2021-22 en Alavés): 4 a unir, 24 duplicados a `Admin/Archive/pdfs-duplicados/`, ningún PDF borrado. `carpeta-doble` da 0. El Omonia 29is Maiou 2023-24 quedó en su carpeta, sin cargar.
- 343: propuesta de buscar el sponsor con evidencia (`Admin/propuestas/343-busqueda-sponsor.md`); la Auditora 4 la aprobó con tres cambios. Sin codear.
- 344: mockup de Ligas con ligas de distintos países y deportes (`Prototyping/Ligas/mockup-344.html`). Sin implementar.
- 330 y 257: propuestas de Orden 1 (`Admin/propuestas/330-donde-se-pierde.md`, `257-skills.md`); el 330 se une al 257.
- 258: medido, todavía no hace falta (46,5 KB comprimidos de carga inicial); el disparador queda en el TODO.

## Versión 916 — Rugby en estadio y sponsor, prompts por deporte, chequeo de abrir como archivo (2026-10-21) [341 · bathrugby-gb]
- `estadio-sponsor.mjs` acepta la ficha de rugby (`Infobox rugby team`); el sponsor de rugby sigue a mano. `gb-premiershiprugby` no entra a `SOLO_ESTADIO` (Auditora 4).
- Los prompts de `localizar`, `extraer`, `perimetro-senales`, `caja-deuda` y `glosar-rubros` nombran el deporte del club (fútbol igual byte por byte); `lote.mjs` corre el alta antes de la primera lectura.
- `audit.js` P1 `index-file-roto`: ningún `.html` de la raíz lleva `<base>` ni `src`/`href` propio con «/» (Auditora 4 aprobó; 0 hoy).
- Diseño de cómo un alta propone una liga y un deporte nuevos, en `Admin/sesiones/onboarding.md` (sin codear, decide Guido).

## Versión 915 — La auditoría revisa también la memoria (2026-10-21) [257]

- Skill `auditoria-finance-of-sports`, eje `docs`: revisa la memoria de la sesión principal (repetidos, y reglas que tendrían que ser skill, convención o chequeo) (ok de Guido). TODO 257: lo de la memoria pasa a skills, y algo que impida aplicar un cambio de skill sin que Guido vea el texto.

## Versión 914 — Sin <base> en index.html: fosUrl() arma las rutas (2026-10-21) [340]

- `js/i18n.js` calcula la raíz del sitio desde la URL de su script y expone `fosUrl()`; lo usan las cargas dinámicas y los links que arma el JS. `index.html` sin `<base>` ni script de base. Probado como archivo en Brave (portada con estilos) y servido: portada → J1 League → Kawasaki Frontale carga, `/club/...` directo. ASSET_V 1564.

## Versión 913 — El sitio vuelve a abrirse como archivo (2026-10-21) [340]

- `index.html` ya no tiene un `<base>` fijo: lo escribe un script solo cuando la página se sirve por http(s). Anda abierto desde el disco (visto en Brave) y en `/liga/<id>` navegando desde la portada. Las páginas de `club/` y `liga/` conservan su `<base>`. ASSET_V 1563. Regla: lo que se tiene que cumplir va a un chequeo (`audit.js` o el hook), no a la memoria de una sesión (`Admin/CONVENCIONES.md`).

## Versión 912 — El sitio se prueba también abierto como archivo (2026-10-21) [340]

- Regresión del 340: el `<base href="/">` de `index.html` rompía abrir el sitio desde el disco (sin estilos ni scripts). Regla en `Admin/PANTALLA.md`: cada cambio de pantalla se prueba servido y como archivo, y `index.html` no lleva `<base>` ni rutas que empiecen con `/`. En camino: el arreglo (Pantallas 6) y un chequeo P1 en `audit.js` (Pipeline 12).

## Versión 911 — La skill de arranque manda a publicar.mjs (2026-10-21) [341]

- Sección 5 de `start-session-finance-of-sports-project`: después de una edición a mano se corre `node tools/publicar.mjs` en lugar de los generadores uno por uno; las fuentes se editan con `tools/fuente.mjs` (ok de Guido). Pipeline 12 sigue el 341.

## Versión 910 — Tanda 2 de lo que Bath se hizo a mano (2026-10-21) [341]

- `caja-deuda.mjs`: un escalón más para inferir la escala de la caja, y el total de personal sin rótulo como candidato de `--personal`. `armar-a-mano` acepta un subtotal sin rótulo con etiqueta sintética. `ajustes.mjs --etiqueta-diferencia`. `tools/fuente.mjs` edita título, url y nota pública de una fuente. Aprobado por Auditora 4. El redondeo de una nota queda como criterio de datos, no en una tool.

## Versión 909 — Tanda 1 de lo que Bath se hizo a mano (2026-10-20) [341]

- `lote.mjs --sin-api` valida si es gratis o frena con el costo y el comando; `validar-bloques` encadena verificar e inventario. `alta-club --deshacer` (y `index.html` vuelve a HEAD solo si su diff es ASSET_V). `mistral-ocr-transcribe --pagina N` rehace una sola página. `tools/publicar.mjs`: sube ASSET_V una vez, regenera, corre `audit.js` y revierte lo suyo si falla. Aprobado por Auditora 4.

## Versión 908 — El título sigue a la ruta; un solo <base> (2026-10-20) [342]

- `document.title` cambia al navegar dentro de la app (club, liga, Inicio según idioma). `generate-club-pages.js` ya no escribe su `<base>`: una sola base por página. ASSET_V 1562.

## Versión 907 — Arreglo de la ruta relativa en /liga/ (2026-10-20) [340 · 342]

- `index.html` lleva `<base href="/">`: tocar un club en `/liga/<id>` después de llegar desde la portada ya carga sus datos (antes pedía `/liga/data/...`), y los links a `fuentes.html` y `correcciones.html` desde esas rutas tampoco se rompen. Verificado con Burnley, rutas directas, atrás y adelante y a 375 px. ASSET_V 1561. Nuevo 342: el título al navegar y el `<base>` doble.

## Versión 906 — Bath Rugby, el primer club de otro deporte (2026-10-20) [248 · bath-gb · 340]

- Bath Rugby (`bathrugby-gb`, Premiership Rugby) con sus 5 ejercicios, 2020-21 a 2024-25, cada uno con el resultado impreso; Rugby elegible en el selector y su liga en Ligas. `auditAll()`: 320 clubes, 3.718 checks, 0 no cierran. API ~US$ 0,51. Cinco reglas de categoría pasan a `CATEGORÍA (prompt, futbol)`. El personal de Bath queda sin separar (la nota no tiene rótulo). 248 cerrado.
- Nuevo 340: la ruta relativa de `loadClubData` falla en `/liga/<id>` navegando desde la portada.

## Versión 905 — El pipeline sabe el deporte de cada club (2026-10-20) [339 · bath-gb]

- Sin default de fútbol en ninguna tool: el deporte sale de la ficha, el registro de altas (`altas-club.jsonl`, regenerado) o se pregunta; `lote.mjs` corre el alta gratis también en `--sin-api`. Jev `--desde-sesion`, `--personal --partir`, los sueldos y las categorías de `audit.js` usan la taxonomía del deporte. `audit.js` prueba un club de muestra de otro deporte (`deporte-muestra`, P1). `worktree.mjs preparar` enlaza `tools/node_modules`. Fútbol idéntico en todo lo medido. Todo aprobado por Auditora 4. `Admin/PIPELINE.md`, «Un deporte nuevo»; skill de onboarding: carga de prueba para un deporte nuevo (ok de Guido). 339 cerrado.

## Versión 904 — Verificar respeta el total exacto; aviso por coma comida en el OCR (2026-10-20) [339 · bath-gb]

- `verificar.mjs` prueba el ajuste `desglose` antes de `cerrarNota()`: una nota de ingresos redondeada ya no pisa el Turnover exacto. En 346 documentos solo cambian los 4 años de Bath, que recuperan la diferencia (de £19.557 a £44.435). Aprobado por Auditora 4.
- `audit.js`: aviso P2 `coma-comida` (una fila de un decimal donde la cifra sin coma, dividida por 10, cierra la resta); 4 filas silenciadas, ningún año publicado afectado.

## Versión 903 — Auditora 4 aprueba lo del 339 y el 334; Jev ve los rubros de cada deporte (2026-10-20) [339 · 334 · bath-gb · everton-gb]

- Auditora 4 aprueba, después de mergeados, los 6 commits del 339 y el del 334 (no se revierte nada). Aprueba (a) Jev y Claude ven las categorías con descripción del deporte del club y (b) el bolsón sin desglosar por deporte: los dos, idénticos en fútbol. Aprueba con un cambio el aviso P2 por coma comida del OCR (sin codear). Las dos filas de Everton que marca no afectan ningún año publicado.
- Bath: los 5 años armados y verificados sin API (lote 129); frena en verificar (nota en £m) y en dos caminos sin API que siguen asumiendo fútbol. Nada cargado.

## Versión 902 — Jev y la carga leen las categorías del deporte del club (2026-10-20) [339 · bath-gb]

- `tools/deporte-club.mjs` (como `pais-club.mjs`): Jev y `cargar.mjs` (`ladoDeCat`) toman las categorías de `SPORT_TAXONOMIES` según el deporte del club. Para el fútbol, idéntico: 1.000 pedidos a Jev y 80 a Claude byte por byte, `medir-cargar` (334 documentos) y `medir-verificar` (62) sin diferencias. Destraba la carga de Bath.

## Versión 901 — La pantalla arma las filas desde la categoría genérica (2026-10-20) [248 · bath-gb]

- El motor y Formato simplificado leen `data/category-map.js` en vez de listas de fútbol: para el fútbol, idéntico en los 1.296 ejercicios y `auditAll()` en 0 que no cierran. Taxonomía `rugby-1` (`data/schema/taxonomy-rugby-1.json`). Bath 2023-24, página 22 retranscripta con Mistral (US$ 0,004).

## Versión 900 — Toda condición nueva pasa por la Auditora (2026-10-20) [339]

- `Admin/CONVENCIONES.md`: una condición nueva en una tool la decide la Auditora con la sección 7 de su skill (antes iba a Guido); cualquier sesión de worktree le escribe directo a la Auditora abierta por esto, no solo los frenados del onboarding. Lo mismo en `club-or-year-onboarding` y en `worktree.md` de la skill de arranque (ok de Guido).

## Versión 899 — Cómo se aprueba una condición nueva en las tools (2026-10-20) [339]

- Skill `auditoria-finance-of-sports`, sección 7: cinco preguntas (caso real, si frena lo bueno, si deja pasar lo malo, si cambia lo cargado, si se puede saltear), qué se mide y cuándo se aprueba, se aprueba con un cambio o se rechaza (ok de Guido).

## Versión 898 — Condiciones del 339 aprobadas; skill de mapeo con el esquema 2.0 (2026-10-20) [339 · 248]

- Auditora 4 aprueba, cada una con un cambio, las 4 condiciones nuevas del 339: filtro de ejemplos de Jev por deporte, reglas de categoría con deporte, una tabla de ceros por deporte y deporte sin declarar resuelto por ficha y liga antes de preguntar. Veredictos en `Admin/registros/auditoria-proceso.jsonl`.
- Skill `club-data-mapping`: el JSON lleva `category` genérica y `subcategory` (ok de Guido).

## Versión 897 — Esquema 2.0: categoría genérica y subcategoría del deporte (2026-10-20) [248]

- Cada línea de los 319 JSON lleva `category` genérica (derivada de `data/category-map.js`, igual para cualquier deporte) y `subcategory` (la de hoy), más `club.sport` y `club.taxonomy`. Migrados con `tools/migrar-v2.mjs` sin cambiar un importe: los `-data.js` quedan idénticos, la huella de 38.883 renglones también, la cascada da igual en los 1.296 ejercicios y `auditAll()` sigue en 0 que no cierran. `club-v2.json` y `taxonomy-football-1.json`; `club-v1.json` congelado. 3 chequeos nuevos en `audit.js`. ASSET_V 1542.

## Versión 896 — Qué del pipeline asume fútbol (2026-10-20) [339]

- Inventario de 38 puntos ordenados por impacto (`Admin/mediciones/339-inventario.md`): primero lo que categoriza (Jev y `categorizar-claude.mjs` eligen entre categorías de fútbol), después las compuertas de `cargar.mjs`, `audit.js`, el alta y los prompts. Sin código.

## Versión 895 — Votación de Bath Rugby (2026-10-20) [248 · bath-gb · rosariocentral-ar]

- Auditora 3: el ingreso de CVC (fila aparte del Strategic Report) va a `other_income`, 3 a 0; el «fair value movement» de 2021 (revaluación de la participación en Premiership Rugby) va a `other_income`, 2 a 1. Reglas en `Admin/CONVENCIONES-DATOS.md`.
- El ejemplo de la regla de la tienda usaba el id viejo `rosariocentral` y frenaba `reglas-categoria.mjs`: corregido a `rosariocentral-ar`.

## Versión 894 — Frenos automáticos en el hook (2026-10-20) [327]

- `tools/hooks/pre-tool.mjs` rechaza, con el motivo y cómo reescribirlo: `/tmp`, `$(...)`, variables y `cd ... &&` fuera de comillas; `node -e` que importa una tool; subagentes sin la regla de Read/Grep/Write; modo plan y `git merge`/`pull` en un worktree; `rsync` sin `--no-links`. `mv` en `Clubes/` pide permiso. `.claude/settings.json` suma `Agent|Task|EnterPlanMode` al matcher (ok de Guido). 327 cerrado.

## Versión 893 — Chequeos nuevos en audit.js; plan de la taxonomía genérica (2026-10-20) [327 · 248 · 338]

- 327: `audit.js` suma historia y contadores en skills (P3), párrafos repetidos en docs (P3), rutas muertas en todas las skills y la raya larga en el texto del sitio (P2); las 13 rayas, arregladas. ASSET_V 1538.
- 248: plan en `Admin/mediciones/248-plan.md` (cada línea con `category` genérica y `subcategory` de hoy; esquema club-v2; las sumas no cambian). La principal acepta sus 8 recomendaciones. Nuevo 338: correr todas las auditorías.

## Versión 892 — Registro público de correcciones (2026-10-20) [247]

- `correcciones.html` y el bloque «Correcciones a estos números» en Finanzas, generados del historial de git de cada club por `tools/generar-correcciones.mjs` (dato abierto en `data/correcciones/`, JSON por país y CSV). 236 cambios en 56 clubes, marcados «anterior al registro» salvo los de hoy. Regla nueva: trailer `Corrige:` (`Admin/CONVENCIONES.md`); `audit.js` da P2 si falta. ASSET_V 1537.

## Versión 891 — Informes al abrir una liga; Bath Rugby para probar el 248 (2026-10-20) [336 · 248 · 327]

- Skill `club-sourcing`, sección 0.4: al abrir una liga se buscan sus informes agregados y se suman a `data/informes.js`; `club-or-year-onboarding` manda ahí (ok de Guido). 336 cerrado.
- Regla: Bath Rugby se puede transcribir con Mistral, como prueba de la taxonomía por deporte (248). 327: Guido aprueba los 6 frenos del hook.

## Versión 890 — Informes de 7 ligas más; el link propio publicado (2026-10-20) [336 · 241]

- 336: `data/informes.js` pasa de 3 a 10 informes públicos con una cifra leída del documento: DFL, LaLiga, ReportCalcio, EY Brasil, Toppfotballbarometeret, Supersociedades y J.League. Sin informe usable en otras 16 ligas (`Admin/sesiones/datos-sourcing.md`). US$ 0. ASSET_V 1535.
- 241: publicado; el depurador de Facebook muestra la tarjeta con imagen, título y descripción, y Google rastrea la página bien.

## Versión 889 — Skill de arranque con las páginas de club y liga (2026-10-20) [241 · 247]

- La skill de arranque (sección 5) nombra `generate-club-pages` entre los generadores y en lo que exige subir `ASSET_V` (ok de Guido). 247 en marcha (Pantallas 7).

## Versión 888 — Link propio por club y por liga (2026-10-20) [241]

- `tools/generate-club-pages.js` arma `club/<id>.html` (319) y `liga/<id>.html` (52) con título, descripción, datos estructurados, un bloque sin JS y la imagen al compartir (`og/`, PNG con resvg, solo se regenera la que cambió); corre en cada carga y `audit.js` lo chequea. Rewrite 200 en `netlify.toml`. Probado en el preview; falta el depurador de Facebook con la URL pública. ASSET_V 1534.

## Versión 887 — Sección «Informes» en Ligas (2026-10-20) [332]

- Bloque «Informes de esta liga» en Ligas desde `data/informes.js`: UEFA ECFIL 2025, Deloitte ARFF 2026 y el borrador del IFR, con una cifra de contexto con fuente (los de Europa arriba). No sale en ligas sin ranking. ASSET_V 1533.

## Versión 886 — Plan numerado en orden de trabajo; el 337 queda para después de A a D (2026-10-20) [337]

- ORDEN de `Admin/TODO.md` numerado del 1 al 16 en el orden en que se trabaja. 337 medido (Onboarding 7) y pasado a E, antes del 313.

## Versión 885 — La app esconde la página estática del 241 (2026-10-20) [241]

- `js/principal.js` esconde `#pagina-estatica` al arrancar, si existe (el bloque sin JS que va a generar Pipeline en `/club/<id>` y `/liga/<id>`). ASSET_V 1531.

## Versión 884 — Estonia sin estimados; grandes ligas con Mistral (2026-10-20) [270 · 337 · 332]

- 270: `PAISES_SIN_ESTIMAR` en `tools/estimar.mjs` (hoy `ee`): Estonia deja de tener estimados en Ligas; las otras 49 ligas no cambian. ASSET_V 1530.
- Regla: las 5 grandes ligas, Brasil y Argentina se completan transcribiendo con Mistral (excepción a «no se transcriben PDFs nuevos»). 332: Guido aprueba la sección «Informes» en Ligas.

## Versión 883 — Prefijo de entidad automático y la ruta del 241 (2026-10-20) [334 · 241 · valerenga-no]

- 334: `combinar()` de `tools/suma-entidades.mjs` pone «AS · » / «Elite · » solo (nombre corto desde los PDFs del ajuste); recargar Vålerenga 2022 y 2023 deja el JSON igual.
- 241 paso 2: `js/principal.js` lee y escribe `/club/<id>` y `/liga/<id>` (ids viejos, atrás y adelante); falta el generador de páginas y el rewrite. ASSET_V 1527.

## Versión 882 — De qué tratan los informes del fútbol inglés; difusión después de las grandes ligas (2026-10-20) [332 · 313 · 337]

- 332: Deloitte ARFF 2026, UEFA ECFIL 2025 e IFR State of the Game transcriptos con Mistral (US$ 1,65; no se trackean: `.gitignore`) y resumidos; ~14 informes parecidos de otras ligas; idea de una sección «Informes» en Ligas.
- El 259 (material de difusión) pasa a ser parte del 313; nuevo 337: no se difunde hasta tener bien cargadas las 5 grandes ligas, Brasil y Argentina.

## Versión 881 — 333 cerrado sin cambios (2026-10-20) [333]

- Mi Cuenta: una búsqueda guardada antes del 246 con un id viejo puede quedar duplicada al volver a guardarla. Se acepta así (pocas filas, se borra desde Mi Cuenta); no se migra `saved_searches`.

## Versión 880 — Diseño del registro público de correcciones (2026-10-20) [247]

- Plan y mockup (`Admin/mediciones/247-plan.md`): correcciones generadas del historial de git de cada JSON de club, página `correcciones.html`, bloque en Finanzas y dato abierto en `data/correcciones/`. Sin código; espera el ok de Guido.

## Versión 879 — Informes sobre el fútbol inglés (2026-10-20) [332]

- Nota `Admin/sourcing/Inglaterra/informes-futbol-ingles.md`: Deloitte ARFF 2026 trae por club ingresos, sueldos y resultado operativo de Premier y Championship (sirve para contrastar); State of the Game (IFR) y la UEFA dan solo agregados (contexto para Ligas). Ninguno completa clubes. Nada transcripto.

## Versión 878 — Etiquetas de Vålerenga por entidad y plan del 241 (2026-10-20) [241 · 334 · valerenga-no]

- Vålerenga 2022 y 2023: cada renglón dice si es del AS o del Elite («AS · », «Elite · »); los números no cambian. ASSET_V 1524.
- 241: plan y mockup del link propio por club y liga (`Admin/mediciones/241-plan.md`), sin código; espera el ok de Guido.

## Versión 877 — Lo no bloqueante de la revisión del 245 y el 246 (2026-10-20) [333 · racing-ar]

- `generar-data.mjs --check` marca un `-data.js` sin JSON (P1); `worktree.mjs` trata `data/<iso>/*-data.js` como generado y corre `generar-data`
  después del merge; `renombrar-ids.mjs --verificar` ignora el ejemplo de CLAUDE.md; título de la fuente de Racing corregido. Aprobado por la
  Auditora 2. Queda del 333 solo Mi Cuenta (búsquedas guardadas con id viejo).

## Versión 876 — Skills al día con el JSON fuente y los ids con país (2026-10-20) [245 · 246]

- Los 18 cambios que propuso Datos 3 (ok de Guido): start-session, club-data-mapping (y fx, formato-simplificado), escala y auditoría
  dicen ahora que la fuente de un club es `data/<país>/<club>.json`, con los nombres de campo del JSON, y que todo id lleva país.

## Versión 875 — Ids estables y el JSON de cada club como fuente (2026-10-20) [246 · 245 · 332 · 333]

- 246: los 41 clubes sin país pasan a `<slug>-<iso2>` (`boca` → `boca-ar`, `realmadrid` → `realmadrid-es`); `data/club-aliases.js` resuelve los ids
  viejos en la URL, Comparar y Mi Cuenta, y `netlify.toml` redirige con 301 las 41 páginas de `fuentes/`. `tools/renombrar-ids.mjs`.
- 245 fase 2: `data/<país>/<club>.json` es la fuente (dato abierto) y el `-data.js` se genera con `tools/generar-data.mjs`; las tools de carga
  escriben el JSON. Boca normalizada a la estructura de los demás. Ida y vuelta 319 de 319, audit 0 P0 y 0 P1.
- Revisado por una sesión Opus antes del merge: sin bloqueantes (lo demás, to-do 333). Skills: escala (ids con país) y formato-simplificado.
- To-do 332 nuevo: informes sobre las finanzas del fútbol inglés («The State of the Game» y parecidos).

## Versión 874 — Sale el 238 (lo gratis) (2026-10-20) [238 · godoycruz-ar]

- Merge de Onboarding 6: Godoy Cruz 2020 tanteo a other_income; cola de AEK en 0; dudas de OH Leuven, Thun y Polissya resueltas. Sale el 238
  (decisión de Guido: lo caro, localizar los 1.008 documentos sin localizar, queda afuera por ahora). Lo que no se aplicó del triage (Rosario
  residuales, Independiente estadio, Rep. Checa) queda en `Admin/registros/triage-dudas-2026-10-20.md` y en la nota de Onboarding 6.

## Versión 873 — Jev y Claude saben el país del club; tanda 3 (2026-10-20) [331 · 238 · godoycruz-ar, estudianteslp, gimnasiaesgrima-ar]

- `jev-categorizar.mjs` y `categorizar-claude.mjs` reciben el país del club (`tools/pais-club.mjs`) y, a igual parecido, los ejemplos del mismo
  país y después del mismo idioma salen primero. Medido: cambia la lista de ejemplos en 24 % de las consultas, no cambia años cargados. Sale el 331.
- Votaciones tanda 3 y Gimnasia revotada con la escala nueva: Gimnasia LP queda en other_income con nota; Estudiantes LP 2023-24 revaluación de
  jugadores a other_income; Godoy Cruz 2020 derechos de tanteo a other_income; cesiones en España siguen al documento.

## Versión 872 — Votaciones tanda 2 aplicadas; escala de criterios más objetiva (2026-10-20) [238 · hoffenheim-de, stuttgart-de, everton-gb, deportivopereira-co]

- Votaciones tanda 2: Everton (venta a la matriz en assetSales), Pereira (bono de trayectoria a wages_squad), Hoffenheim y Stuttgart (officialPAT
  antes de minoritarios y del partner silencioso: Hoffenheim 2024 y 2025 pasan a ganancia). Gimnasia LP espera la revotación.
- Skill `votacion-de-criterios` (ok de Guido): materialidad de 1%; un precedente cuenta solo si es el mismo hecho económico; criterios nuevos
  "realizado o no realizado" y "lo que entiende el lector"; las reglas de categoría llevan sus dos líneas para Jev y Claude.
- Supabase: desde el 2026-10-30 una tabla nueva necesita su grant (PANTALLA); `saved_searches` no cambia.

## Versión 871 — Las reglas de categoría llegan a Jev y a Claude (2026-10-20) [329]

- Cada `## REGLA:` de categoría en CONVENCIONES-DATOS lleva `CATEGORÍA (prompt)` y `EJEMPLO-CATEGORÍA`; `tools/reglas-categoria.mjs --escribir`
  registra los ejemplos en `categorias-aprendidas.jsonl` y `categorizar-claude.mjs` lee las frases en el prompt. Medido: 0 años cargados cambian.
  Aprobado por la Auditora. Sale el 329.
- Sale el 283: Vålerenga 2022 y 2023 cargados sumando el AS y el Elite (Aalesund, cuando haya los dos documentos del mismo año).

## Versión 870 — Benfica 2014-15; correcciones de la tanda 1 (2026-10-20) [238 · 329 · 330 · benfica-pt, agf-dk, mechelen-be, rosariocentral]

- Merge de Onboarding 4: Benfica 2014-15 cargado (de 2006 a 2026 solo le falta 2011);
  AGF 2021 grossDebt a 0; Mechelen 2025 intangible a depreciation; tienda de Rosario Central a sponsorship_commercial.
- To-dos nuevos: 329 (las reglas de categoría llegan a Jev y a Claude) y 330 (dónde se pierde lo decidido; después del 246 y el 245).

## Versión 869 — Benfica 2014-15 destrabado; votaciones tanda 1 (2026-10-20) [238 · benfica-pt]

- `tools/verificar.mjs`: la fila de atribución del resultado («ACIONISTAS DA EMPRESA-MÃE») ya no se suma como ingreso. Medido sin cambios en
  lo cargado (Vitória Guimarães 2021-22 incluido). Aprobado por la Auditora.
- Votaciones de la Auditora, tanda 1 (3 a 0): grossDebt con leasing y vinculadas, venta de derechos a un fondo, intangibles belgas, tienda a
  sponsorship_commercial (Guido). REGLAS en CONVENCIONES-DATOS.

## Versión 868 — Materialidad en las votaciones; ningún año frena sin pasar por la Auditora (2026-10-20) [238]

- Skill `votacion-de-criterios`: si la diferencia entre opciones es 1% o menos del total y no cambia el signo del resultado, no se vota (la opción
  más fiel al documento). CONVENCIONES y `club-or-year-onboarding`: antes de dejar un año frenado por datos, la Auditora lo clasifica (precedente,
  votación o club). Textos aprobados por Guido.
- Merge de la Auditora: triage de la cola y de `dudas-por-club.md` (`Admin/registros/triage-*-2026-10-20.md`); Onboarding 4 aplica los (a).
- Merge de Onboarding 4: Sporting 2008-10, Rapid Wien 2016-17 y Vålerenga 2022 y 2023 (AS más Elite).

## Versión 867 — El tablero cuenta bien lo cargado (2026-10-20) [238]

- `tools/estado.mjs` compara el `cargado` del registro con `quien.mjs --pendientes` y lo regenera si no coincide: 1.852 ejercicios cargados
  y 0 propuestas listas pendientes (antes contaba 28 que ya estaban en el sitio). Aprobado por la Auditora.

## Versión 866 — Rapid Wien 2013-2025 (2026-10-20) [238 · rapidwien-at]

- Merge de Onboarding 4: Rapid Wien 2013-2016, 2018-2023 y 2025 (2017 a dudas-por-club).

## Versión 865 — Gasto por sesión (2026-10-20)

- Los logs de API marcan la sesión (la carpeta del worktree, `tools/sesion.mjs`) y `node tools/gasto.mjs --sesion <carpeta>` da la cuenta de cada una;
  lo anterior sale «(sin marca)». Aprobado por la Auditora.

## Versión 864 — Sporting CP 2008-10 destrabado (2026-10-20) [sportingcp-pt]

- `tools/verificar.mjs`: `avisarRegistro` usa la misma compuerta que `cargar.mjs` (la huella del `.md`, no la fecha). Aprobado por la Auditora.

## Versión 863 — Cargar con tokens de sesión, paso a paso (2026-10-20) [328]

- Skill `club-or-year-onboarding`: sección 3 c) y archivo nuevo `carga-con-tokens.md` (texto aprobado por Guido): la especificación con
  armar-a-mano, verificar, Jev y Claude con `--desde-sesion`, y el lote con `--sin-api`. Sale el 328.

## Versión 862 — Sumar dos entidades en un año (2026-10-20) [283 · valerenga-no, aalesund-no]

- `cargar.mjs` suma el AS y el Elite/FLI con el ajuste `suma-con` (`tools/suma-entidades.mjs`), sin contar dos veces la transferencia.
  Medido en Vålerenga 2022 y 2023; sin el ajuste todo idéntico. Aprobado por la Auditora.

## Versión 861 — Alta de Rapid Wien; OH Leuven 2020 (2026-10-20) [238 · 328 · rapidwien-at, ohleuven-be]

- Merge de Onboarding 4: OH Leuven 2020 y alta de Rapid Wien con 2024. Frenados: Sporting CP 2008-10 (script) y Benfica 2014-15 (ya en HALLAZGOS).
- Merge de Docs 1: el texto del 328 rehecho con las tools nuevas, para el ok de Guido.

## Versión 860 — Cargar sin API: cuatro herramientas (2026-10-20) [328]

- `tools/armar-a-mano.mjs` (arma `.ubicacion.json` y `.filas.json` con sus huellas desde una especificación y valida cada fila contra el `.md`),
  `huellas.mjs --documento`, `--desde-sesion` en `jev-categorizar.mjs` y `categorizar-claude.mjs`, y `lote.mjs --ejecutar --sin-api` (frena donde pagaría).
  Aprobadas por la Auditora; ninguna cambia años cargados.

## Versión 859 — Colombia cerrada; salen el 292 y el 165 (2026-10-20) [292 · 165 · 238 · 283 · atleticobucaramanga-co]

- Merge de Onboarding 5: Atlético Bucaramanga 2019 y 2020 (alta), hecho con tokens de sesión (subagentes para localizar y extraer); 34 documentos de
  Colombia sin estado de resultados a descartados. Sale el 292 (La Louvière 2020 queda afuera: 2 páginas en imagen).
- Sale el 165 (las altas que queden entran por el 238). El 238 queda solo con lo gratis (27 propuestas listas y 12 frenados); lo caro, afuera por ahora.
- El 283 frena por script (`cargar.mjs` no suma dos documentos en un año): va a Pipeline 7 después del 328.

## Versión 858 — Reino Unido y Noruega cerrados (261); propuesta del 328 (2026-10-20) [261 · 328 · molde-no, celtic-gb, fredrikstad-no, viking-no]

- Merge de Onboarding 4: Molde FLI 2008-2024 completo (17 años); línea del auditor de Celtic 2021-2025 (BDO LLP). Fredrikstad sin lote (después de
  2018 solo deposita Fotballinvest AS, que no es el club) y Viking FLI 2012-2016 a descartados (el fútbol está en Viking Fotball ASA). Sale el 261.
- Merge de Docs 1: propuesta del 328 en `Admin/carga-con-tokens-328.md` (texto de skill y 4 tools que faltan; sin probar).

## Versión 857 — Beşiktaş 2006-2008, Lierse Kempenzonen, La Louvière y Alianza FC (2026-10-20) [292 · 328 · besiktas-tr, liersekempenzonen-be, raallalouviere-be, alianzafc-co]

- Merge de Onboarding 5: Beşiktaş 2006, 2007, 2008 y 2018 recargado (queda con 2006-2011 y 2014-2023); alta de Lierse Kempenzonen 2018-2021;
  La Louvière 2018, 2019 y 2021-2024; alta de Alianza FC 2023.
- To-do 328 nuevo: los pasos de una carga con tokens de sesión, reproducible por el script.

## Versión 856 — Molde 2008, 2010, 2011 y 2012 (2026-10-20) [261 · molde-no]

- Merge de Onboarding 4: Molde FLI 2008 y 2010-2012 con sponsor `sin-fuente`. El Reino Unido del 261 queda cargado salvo la línea del auditor de Celtic.

## Versión 855 — Un número contestado con corregir queda confirmado (2026-10-20) [261 · molde-no]

- `tools/verificar.mjs`: un caso `numero-no-confirmado` contestado con `corregir --valor` cuenta como confirmado (Molde FLI 2016 y 2024).
  Aprobado por la Auditora; lo cargado no cambia.

## Versión 854 — Molde FLI 2009-2023 (2026-10-20) [261 · molde-no]

- Merge de Onboarding 4: Molde FLI 2009-2015 y 2017-2023 (lote 116; la AS va a descartados). 2016 y 2024 frenados por
  "numero-no-confirmado contestado no destraba" (anotados en frenados-por-script.jsonl).

## Versión 853 — 255 cerrado (2026-10-20) [255 · 327 · 292]

- El 255 sale del TODO; su inventario pasa a `Admin/Archive/consolidar-reglas-255.md`. Los 12 chequeos automatizables quedan como el 327.
- 292: Bélgica y Colombia, con tokens de sesión y sin API (Guido).

## Versión 852 — Reglas consolidadas: 27 cambios en skills, CLAUDE.md y memorias (2026-10-20) [255]

- Aplicadas las 27 propuestas aprobadas del inventario del 255: el push no se pide, cada sesión corre sus lotes, HALLAZGOS solo para lo
  que no frena, toda edición de skill se le muestra antes a Guido, CONVENCIONES se lee cuando la skill lo pide, la regla de historia y
  contadores en un solo lugar (CLAUDE.md). Tres memorias borradas y dos reescritas.

## Versión 851 — Beşiktaş 2018: nota con subtotal (2026-10-20) [besiktas-tr]

- `tools/verificar.mjs`: un renglón que sus hijas directas no cierran se busca en una nota con subtotal (Beşiktaş 2018, nota 18).
  Aprobado por la Auditora. Falta recargar solo 2018 con un ajuste `desglose` -98157 (errata del documento).

## Versión 850 — Beşiktaş 2006-2008 destrabados (2026-10-20) [292 · besiktas-tr]

- `tools/alta-club.mjs` reconoce la fecha de un tipo de cambio con meses en turco, fechas repetidas por columna y bloques con fecha:
  Beşiktaş 2007 (1,3253) y 2008 (1,2067) salen solos; 2006 va con ajuste manual fx 1,5357 (votación 3 a 0). Aprobado por la Auditora.
- CONVENCIONES: un documento ya marcado `sin_estado` no se vuelve a correr con `--rehacer` ni `--reintentar`.

## Versión 849 — St. Gallen recargado, Patro Eisden 2013 y 2015, 255 fase 2, regla de fx (2026-10-20) [292 · 255 · stgallen-ch, patroeisden-be, llaneros-co, besiktas-tr]

- Merge de Onboarding 5: St. Gallen 2019 y 2022 recargados sin la compensación intragrupo y 2020 cargado; Patro Eisden 2013 y 2015 con
  sponsor `sin-fuente`; Llaneros con los tres sponsors de la fuente. Sus lotes 115 y 116 chocaban con los de Onboarding 4: quedan como `-onb5`.
- Merge de Docs 1: 255 fase 2 (CLAUDE.md y CONVENCIONES con las respuestas Q-1, Q-7 y Q-9; texto final de las propuestas de skill).
- Merge de la Auditora: Beşiktaş 2006 fx votado 3 a 0; REGLA nueva en CONVENCIONES-DATOS (varios tipos USD del mismo cierre: caja y bancos).

## Versión 848 — Onboarding 4: Celtic, Newcastle, Viking y Sarpsborg (2026-10-20) [261 · celtic-gb, newcastle-gb, viking-no, sarpsborg08-no]

- Merge de Onboarding 4: Celtic 2021-2024; Newcastle 2019, 2020 (13 meses) y 2021 (11 meses); Man City 2022, Tottenham 2023, Fulham 2022, Leeds 2021,
  Liverpool 2023 y Boyacá Chicó 2025; Silkeborg y Viborg 2025 partidos; Viking AS 2017-2024 (consolidado); Sarpsborg 08 2008 (FLI).
- A descartados: Viking FLI 2017-2024 (la AS lleva el fútbol) y Sarpsborg Fotball Invest AS 2008.
- Los dos lotes 114 (Colombia de Onboarding 5 y Newcastle de Onboarding 4): el de Newcastle queda como `lote-114-onb4.txt`.

## Versión 847 — Docs 1 y Auditora mergeados; regla turca; salen 252 y 316 (2026-10-20) [255 · 252 · 316 · besiktas-tr, llaneros-co]

- Merge de ligas (Docs 1): inventario del 255 en `Admin/consolidar-reglas-255.md` y 5 reglas dedupeadas en `Admin/*.md`.
- Merge de proyecto (Auditora): veredictos de los criterios de Beşiktaş y Llaneros; REGLA turca en CONVENCIONES-DATOS (Reeskont, Tecil faiz,
  kur farkı y vade farkı como líneas operativas, votación 3 a 0).
- Salen del TODO el 252 (ejercicios nuevos, dado por resuelto por Guido) y el 316 (solo servía al 252).
- Títulos del CHANGELOG con to-dos y clubes entre corchetes.

## Versión 846 — CHANGELOG de una semana; no se transcribe más; sesiones que escriben corto (2026-10-20)

- To-do 256: las Versiones 300 a 672 pasan a `Admin/Archive/CHANGELOG-v300-v672.md`; acá queda la última semana.
- CONVENCIONES: las sesiones de worktree le escriben solo a la principal, corto; no se transcriben PDFs nuevos.
- TODO: salen el 130 y el 183 (otros deportes, todo sin transcribir) y lo que era transcribir en el 165, el 261, el 283 y el 252; sale el 256.

## Versión 845 — Turquía en el sitio: Beşiktaş 13 años; Llaneros y Westerlo 2015 (2026-10-20)

- Merge de Onboarding 5: alta de Turquía (`tr-superlig`) con Beşiktaş 2009-2011 y 2014-2023; Westerlo 2015 (18 meses); Llaneros 2025
  (alta); Luzern 2023, St. Gallen 2021 y 2024, Lierse 2019, Patro Eisden 2014 y Lokeren-Temse 2021-2022.
- Gestión de Matthias Hüppi (St. Gallen); 34 gestiones de cola en null por la regla sin-fuente.
- Frenados nuevos: Beşiktaş 2006-2008 (varios tipos de cambio en el documento).

## Versión 844 — Chequeos de la auditoría y frenados resueltos (2026-10-20)

* 325: `audit.js` suma `json-no-valida`, `json-aviso` y `json-js-desfasado` (avisos) y `archivo-pesado` cubre todo `Admin/*.md`;
  `ida-y-vuelta.mjs` lista los clubes con avisos. `frenados-por-script.jsonl` gana el campo `resuelto` (6 marcados). Aprobado por la auditora.

## Versión 843 — Un dato de contexto sin fuente ya no frena (2026-10-20)

* REGLA de Guido: estadio, sponsor, liga o gestión sin fuente pública quedan en null con la marca `sin-fuente` y el año se carga igual.
  298 b3: `estadio-sponsor.mjs` acepta la marca (con dónde se buscó) y la segunda belga pide solo estadio (votación de Patro Eisden 2015).
  Destraba 6 ejercicios belgas. 298 a3: `cargar.mjs` avisa cuando carga un caché de verificar más viejo que el script.
* Votaciones: Patro Eisden 2013 queda con liga null (3 a 0); 2015, opción C elegida por Guido.
* 245, estándares abiertos: `data/schema/club-v1.json` (JSON Schema 2020-12, publicado) valida los 314 JSON con un validador estándar
  (ajv); el `datapackage.json` (Frictionless, CC BY-NC 4.0, solo lo financiero) lo arma la herramienta para la fase 2. Aprobado por la auditora.

## Versión 842 — Auditoría de código y documentos; lote 111 y 112 (2026-10-20)

* Docs 1: auditoría de los ejes `codigo` y `docs` (sin P0; `auditAll()` OK en 313 clubes) e inventario de lo que cambia en skills y
  documentos el día de la fase 2 del 245 (`Admin/mediciones/245-inventario-docs.md`). `ARQUITECTURA.md` al día.
* Lotes 111 y 112: Manchester City 2022, Tottenham 2023, Fulham 2022, Leeds 2021, Liverpool 2023, Boyacá Chicó 2025 y Celtic 2021-2024.
* `worktree.mjs mergear`: la rama `ligas` chocaba con la carpeta `Ligas/`.

## Versión 841 — Suiza, Bélgica y el alta de Turquía (2026-10-20)

* Luzern 2023, St. Gallen 2021 y 2024, Lierse SK 2019, Patro Eisden 2014 y Lokeren-Temse 2021-2022. Turquía, país nuevo: alta de
  Beşiktaş con 2023 (Süper Lig, Vodafone Park). Frenados: St. Gallen 2020 (en frenados-por-script) y Patro Eisden 2013 y 2015 (sponsor sin
  fuente).

## Versión 840 — Los datos como JSON con esquema, fase 1 (2026-10-20)

* 245 fase 1: esquema JSON por club, exportador, validador y prueba de ida y vuelta (313 clubes idénticos, 0 errores), sin tocar
  `data/` ni `js/`. Aprobado por la auditora.

## Versión 839 — Caja y deuda cerrado; extracto de Wikipedia (2026-10-20)

* 260 cerrado: Ferroviária 2014, Remo 2019 y Volos 2019-2020 quedan sin caja ni deuda (decisión de Guido); Japón 2025 es un callejón sin
  salida (la J.League publica un balance resumido sin caja ni préstamos; ningún club cotiza en EDINET).
* `tools/wiki-extracto.mjs`: trae la ficha o una sección de una página de Wikipedia en texto corto (para las gestiones del 195), aprobado
  por la auditora.
* 298 z2: `cargar.mjs` carga un ejercicio de transición de más de 12 meses con importes del año anterior como el año del cierre (regla
  votada; medición: 0 documentos distintos). Destraba Westerlo 2015 y Newcastle 2020-21.
* 298 x2 sin escalón: el chequeo de cifras ya existe (`chequeos-gratis.mjs`, 0 escapes); una voz local con Tesseract ahorraría ~US$ 10
  pero dejaría pasar ~1 de 82 páginas con error (`Admin/mediciones/x2-voz-local-escaneos.md`).

## Versión 838 — Reino Unido: 22 años más y el alta de Celtic (2026-10-20)

* Lote 108: Leeds, Liverpool 2022, Newcastle 2022-2024, Nottingham Forest 2022-23, Sunderland 2019-2023, West Ham 2020-2024 y Wolves
  2020-2023. Alta de Celtic con 2024-25 (Scottish Premiership). Unión Magdalena 2025 con el cierre correcto (298 m2).
* Silkeborg y Viborg 2025: la línea de depreciación y amortización partida con las notas (REGLA por votación).

## Versión 837 — Stirling PDF no reemplaza a Mistral (2026-10-20)

* 314 cerrado: Stirling PDF (Tesseract con enderezado) lee 52-94% de las cifras de los escaneos, contra 100% de Mistral; en 6 escaneos
  cargados y 10 de Viking sin cargar, 0 habrían pasado sin Mistral. El detector de orientación (`tesseract --psm 0`) arregla páginas
  dadas vuelta (Sporting 1999 y 2000), pero no alcanza. Detalle en `Admin/mediciones/stirling-vs-tesseract-vs-mistral.md`. Viking 2012,
  2014, 2016-2021, 2023 y 2024 quedan transcriptos con Mistral (US$ 1,44).

## Versión 836 — Listar un regulador sin navegador (2026-10-20)

* `tools/listar-brreg.mjs`: lista los ejercicios de los clubes noruegos en brreg con pedidos HEAD, sin bajar nada. Noruega tiene 63
  ejercicios en el portal sin cargar, con el PDF ya bajado. Crawl4AI no hace falta en portales con HTTP plano (315 cerrado).
* Votación de criterios (skill nueva `votacion-de-criterios`): primera votación, q2, 3 a 0 por partir con las notas la línea de
  depreciación y amortización (REGLA nueva en CONVENCIONES-DATOS).

## Versión 835 — Primeros arreglos aprobados por la auditora (2026-10-20)

* 298 af (`data/club-leagues/be.js`: Patro Eisden 2013-2015 y Lokeren-Temse 2021-2022) y 298 w2 (`cargar.mjs`: un primer ejercicio de
  12 meses redondeados con período no anual entra por la compuerta de primer ejercicio; Lierse SK 2019). Los dos con veredicto APROBADO
  de la sesión auditora, el método nuevo (CONVENCIONES).
* 298 r2 (una fila de gasto presentada como desglose no se suma aparte: West Ham 2020-24), p2 (filas con el mismo rótulo en lados opuestos:
  Boyacá Chicó 2025) y v2 (`--reintentar` vuelve a localizar un documento que quedó sin estado de resultados: Fulham 2021-22), aprobados
  por la auditora. aj y s2 no necesitaban código.

## Versión 834 — Reino Unido: Burnley, Manchester City y Tottenham; cierre de Finanzas 5 (2026-10-20)

* Burnley 2022 y 2023 (perímetro consolidado), Manchester City 2021 y 2023 y Tottenham 2022. Gestiones de Demin, Abramovich, Radrizzani,
  Ashley, Donald y Lawwell. West Ham 2020-21 a 2023-24 sin la fila duplicada de "Exceptional items" (ajuste; el escalón es la 298 r2).

## Versión 833 — St. Gallen, Juventude, Ponte Preta y Patro Eisden; cierre del día (2026-10-19)

* St. Gallen 2019, 2022 y 2023 con el perímetro AG + Event AG (como 2024-25); 298 ai: `verificar.mjs` saca la compensación intragrupo
  (St. Gallen 2021-22: ingresos 42,469 → 32,669). Juventude 2021, Ponte Preta 2025 y Patro Eisden 2022. Unión Magdalena 2025 rehecho
  con el cierre 2025-12-31 (falta la pasada de carga). Cierres de Pipeline 5 y Pantallas 3 (segunda tanda) en `Admin/Archive/`.

## Versión 832 — Quién audita: aviso al cargar (2026-10-19)

* 282 f: `cargar-lote.mjs`, al final, lista los años recién escritos sin línea en `auditoria.jsonl` y arma sus extractos en
  `Generados/auditoria/` (no frena: decisión de Guido). PIPELINE.md al día.

## Versión 831 — Lote 103: 17 ejercicios nuevos (2026-10-19)

* Botafogo-SP, Chapecoense, Coritiba, Grêmio, Hajduk, Midtjylland, Rijeka, Silkeborg, Ferro, Fredericia, Instituto, Bragantino, Universidad
  de Chile, Viborg, Colo-Colo, Dinamo Zagreb y São Paulo 2025. `ejercicios-nuevos.mjs` reconoce un PDF con la fecha del cierre en el nombre
  (River). Amazonas 2025 (balance de la federación) a documentos descartados. 273 cerrado: el generador ya suma el contexto manual.

## Versión 830 — Basel completo y tres mejoras de la 323 (2026-10-19)

* Basel: caja (sin deuda en ningún año) y presidentes en `data/gestiones/ch.js` (324 cerrado). St. Gallen: 3 casos de la cola.
* 323 a (`lote.mjs --reintentar` suma Mistral, localizar y extraer en el total del ensayo), e (`verificar.mjs` cierra la duda de perímetro
  con un solo estado y ningún otro documento del mismo cierre) y f (`alta-club.mjs`: nombre legal en singular, Harlequins). La c no se
  hace: va a `Admin/HALLAZGOS-pipeline.md`.

## Versión 829 — Basel 2005-2020 y cuatro arreglos de script (2026-10-19)

* Basel 2005-2020 (FC Basel 1893 AG): `localizar.mjs` elige el estado de resultados de la entidad del club; la cobertura de pérdidas y
  las transferencias con la holding quedan fuera de ingresos y gastos (324). Estadio y sponsor 2005-2011 a mano con fuente.
* 298 k2 (guion largo "–" como signo menos), m2 (`periodo.mjs`: "diciembre 31 de 2025" y la fecha comparativa de un título no cuenta como
  cierre), n2 (`alta-club.mjs` proponerLiga: mes de cierre >= 9) y o2 (`perimetro-senales.mjs` mira los años cargados).

## Versión 828 — Lote 97: 22 años del fútbol inglés (2026-10-19)

* Aston Villa 2019-2022, Brentford 2022-23, Brighton 2020-23, Fulham 2021 y 2023, Arsenal 2022-23 y Crystal Palace 2022-23. Scottish
  Premiership en `data/leagues.js` (para el alta de Celtic). Bournemouth, Chelsea y Everton se revertían porque la rama no tenía la 298 ad
  (entidades.mjs en GENERADORES): se reintentan con la rama al día. El lote-100 de Fulham pasa a ser el lote-104.
* Aston Villa 2024: ejercicio de transición de 13 meses (1-06-2023 al 30-06-2024), cargado con el criterio de Wolves 2025 (298 z2).

## Versión 827 — Cada worktree con su propia lista de corrida (2026-10-19)

* `worktree.mjs preparar` ya no enlaza a la principal la lista de la etapa 7 ni las otras listas de corrida (`.lote-lista-actual.txt` y
  compañía): dos lotes a la vez en worktrees distintos se pisaban (el lote 103 categorizó dos años de Basel y Basel quedó sin categorizar).
  Los enlaces ya hechos en fos-pipeline, fos-finanzas y fos-onboarding se reemplazaron por archivos propios; fos-pantallas, cuando termine
  su lote.

## Versión 826 — Lote 102 (Bélgica) y Luzern (2026-10-19)

* Lommel SK 2019-2024 (con una línea `carga-club`), Lierse SK 2020-2021 y Patro Eisden 2021 y 2023. Luzern 2018, 2020 y 2024, con ligas,
  estadio y sponsor con fuente. Luzern 2023 espera la 298 k2 (guion largo como signo menos). Cierre de Onboarding 3.

## Versión 825 — Lote 101, segunda tanda: Luzern 2019 y 2022, Go Ahead Eagles 2021 y 2022 (2026-10-19)

* Luzern 2019 y 2022; Go Ahead Eagles 2021 (Eerste Divisie) y 2022 (Eredivisie), con ligas, listas, estadio y sponsor. Basel sin cargar:
  defectos de lectura en siete años (to-do 324).

## Versión 824 — Basel: la cobertura de pérdidas del holding no es ingreso (2026-10-19)

* `verificar.mjs` y `cargar.mjs` (298 ah, vocabulario en `vocabulario.mjs`): la "Verlustabdeckung" cuenta en el resultado y se carga en
  `exceptional_items`, fuera de ingresos y gastos. De 725 documentos comparables cambian Basel 2005 (cola → ok) y 2009 (ingresos exactos,
  sigue en cola). Cierre de Pipeline 4 en `Admin/Archive/`.

## Versión 823 — La cola se filtra por lote; Basel deja de duplicar el total (2026-10-19)

* `cola.mjs --lista` y `--dir` filtran por lote o carpeta (323 b); el listado aclara qué significa el sí en "¿Se deja afuera…?" (323 d).
* `verificar.mjs` (298 ah): un subtotal con hijas cuenta como componente; Basel 2005, 2009 y 2012 dejan de duplicar "Total Ertrag".
  725 documentos medidos, 722 iguales.

## Versión 822 — Lote 101, primera tanda: Go Ahead Eagles 2023 y 2024 (2026-10-19)

* Go Ahead Eagles 2023 y 2024. Basel 2010 y 2013-2020 con perímetro individual y Luzern con cierre al 30 de junio, por ajuste. Tres
  defectos de script nuevos a la 298 (ah, ai y aj).

## Versión 821 — 260: caja y deuda sin documento nuevo (2026-10-19)

* Por ajustes con cita: Unión 2022-2024 caja y deuda (la deuda es el total de la nota de Deudas), Argentinos Juniors 2019 caja y Mirassol
  2024 deuda 0. La AFAC de Ferroviária no es deuda (Guido). auditAll(): 3.059 controles OK.

## Versión 820 — Hamburgo 2024 sin informe del auditor; mejoras del lote 97 al TODO (2026-10-19)

* 282: Hamburgo 2024 se publica como `sin_informe` (decisión de Guido). Fredrikstad: el Fotballinvest AS 2008-2011 no se carga (el club es el FLI).
* To-do 323: seis mejoras de script vistas en el lote 97 del Reino Unido, para Pipeline 4.

## Versión 819 — Fredrikstad 2012 (2026-10-19)

* Fredrikstad 2012, del FLI: ingresos 23,06 M y gastos 23,55 M, como lo impreso; coincide con la columna del año anterior de 2013.

## Versión 818 — Pantallas 3: tamaño de liga desde Wikipedia, Fortaleza con el CEO, la compuerta en la skill (2026-10-19)

* 309: `generate-rankings.js` usa el tamaño de la lista de Wikipedia cuando no hay uno verificado: 289 liga-años muestran "N de los M" (eran 4).
* 195: Fortaleza 2025 con el CEO Pedro Martins (decisión de Guido).
* 273: la skill `club-or-year-onboarding` nombra la compuerta de estadio y sponsor (texto aprobado por Guido).
* 284: Fredrikstad 2012 con sponsor (Stabburet) y marca con fuente, listo para cargar.

## Versión 817 — 298 ae: un año belga abreviado sin ingresos carga con ingresos 0 (2026-10-19)

* `cargar.mjs`: si el escalón NBB y el resultado cierran, un año belga abreviado sin Omzet (Brutomarge negativa como gasto) carga
  ingresos 0 con aviso, en vez de frenar (opción de Guido). Destraba Lierse SK 2020-2021 y Patro Eisden 2021; Lierse 2019 sigue por "periodo".

## Versión 816 — 298 ad: el registro de entidades no frena un año de un club de un grupo (2026-10-19)

* `generadores.mjs`: `entidades.mjs` corre después de `generate-rankings.js` (los totales de grupo salen de los rankings): era la causa del
  círculo de Lommel SK.
* `entidades.mjs` acepta una línea `carga-club` con un rango de ejercicios y una sola cita.

## Versión 815 — Sarpsborg 08 2023 corregido en el sitio (2026-10-19)

* El año publicado tenía resultado 0,000019 M (un ajuste a mano mal cargado): ahora netInterest 0,008445, sin impuesto y resultado
  18,98 M, como el impreso (ok de Guido).

## Versión 814 — 298 ag: el financiero respeta el signo impreso de una reversión (2026-10-19)

* `verificar.mjs`: el financiero por rótulo usa el valor impreso con su signo (Sarpsborg 08 2023, reversión negativa dentro de los
  costos). 721 de 722 documentos iguales. Sale el ajuste `resultado-final` de Sarpsborg 2023; su año publicado quedó mal y espera corrección.

## Versión 813 — 308: bonos convertibles y factoring en la skill; herramienta para unificar carpetas (2026-10-19)

* `club-data-mapping` (referencia de formato simplificado): bonos convertibles y factoring en la deuda financiera (ok de Guido).
* `tools/mudar-carpetas.mjs` y su manifiesto: unifica las carpetas duplicadas de Clubes/ sin borrar nada (los duplicados van a
  `Admin/Archive/pdfs-duplicados/`). Dos informes de liga compartidos a propósito, silenciados en audit-ignore.

## Versión 812 — Sarpsborg 08 2023 y 2024 (2026-10-19)

* Lote 100: Sarpsborg 08 queda con 2012 y 2014-2025. 2023 entra con el resultado impreso fijado a mano (298 ag, el signo del financiero).

## Versión 811 — Bélgica, lote 92: 25 años más; Vålerenga transcripto (2026-10-19)

* Beerschot, Lierse SK, Lokeren-Temse, OH Leuven, Patro Eisden y RWDM: 25 años belgas del lote 92, con la cola contestada (26 casos).
* Vålerenga: los 49 PDFs con `.md` validado por el pipeline. Tres bloqueos belgas pasan a Pipeline 4 (298 ad, ae y af).

## Versión 810 — Diez to-dos nuevos: contenido para redes y herramientas a probar (2026-10-19)

* 313-322: contenido para X e Instagram y la lista de herramientas a probar (Stirling PDF, Crawl4AI, Maxun, Supabase de lectura, Open
  Notebook, I have ADHD, Browser Use, Higgsfield, Zapier, OmniRoute). Los escribió la sesión "Herramientas y plataformas a explorar"; sin código.

## Versión 809 — 298 ac: la localización se rehace si cambió el perímetro (2026-10-19)

* `localizar.mjs` anota el perímetro usado y rehace la localización cuando el ajuste cambió. Sarpsborg 08 2023 ya lee el individual
  (US$ 0,13). Con la ab y la ac, Sarpsborg 2023 y 2024 se pueden volver a correr.

## Versión 808 — 298 ab: la nota del subtotal no pisa un estado más detallado (2026-10-19)

* `verificar.mjs`: la nota del subtotal reemplaza al estado solo si trae al menos tantas filas. 720 de 722 documentos iguales; cambian
  Sarpsborg 2024 (lo buscado) y las líneas de gasto de AVS 2023-24, con los mismos totales.

## Versión 807 — Factoring: con recurso es deuda; el 310 cerrado (2026-10-19)

* Regla en CONVENCIONES-DATOS (ok de Guido): el factoring con recurso entra en la deuda; el pro soluto, no. Cierra el 291 y el 290 (Genoa 2022).
* 310 partes 2 (deuda belga) y 3 (OH Leuven) a HALLAZGOS.

## Versión 806 — 310: la caja de un año sin vecino, con tres votos (2026-10-19)

* `caja-deuda.mjs`: la caja de un año sin vecino entra con tres votos: balance que cuadra, mayor activo y cifra repetida (elección de
  Guido). Udinese 2022 ya no entra con la caja de una entidad chica; caja 422 iguales y 7 distintos (los de antes), deuda idéntica.

## Versión 805 — Reino Unido: una sociedad por año; el 295 cerrado (2026-10-19)

* 261 b: en los 7 pares con dos sociedades del mismo club y ejercicio entra la que el sitio ya publica; los `wf-*` de la otra sociedad,
  a descartados. Regla en CONVENCIONES-DATOS (decisión de Guido).
* 295 cerrado a pedido de Guido; quedan sin buscar o sin bajar la FPF (Liga 3), la Lega Serie C y la Serie D.

## Versión 804 — 295: la Federação Paulista para el Paulistão (2026-10-19)

* Federação Paulista de Futebol 2024 para las tres divisiones del Paulista, como federación entera (RSM Brasil, sin salvedades).

## Versión 803 — 295: notas de la Serie C y la FPF (2026-10-19)

* Lega Serie C: sin canal público (candidato a mail, sin armar). FPF: publica sus cuentas, pero el PDF lo tiene que bajar Guido.

## Versión 802 — 310, parte 1: caja de un año sin vecino (2026-10-19)

* `caja-deuda.mjs`: la caja de un año sin vecino se acepta si está en un balance del documento que cuadra, en cualquier país. Udinese
  2022 queda pendiente de Guido (el balance que encuentra es el de una entidad chica).

## Versión 801 — Reino Unido: los 12 de subagentes, validados (2026-10-19)

* Los 12 `.md` de subagentes Sonnet pasan `pipeline.mjs --lista` (~US$ 1,3); Aston Villa 2019-20 y 2020-21 se rehicieron con Mistral.

## Versión 800 — 302: el deflactor de EE.UU. sale de la BEA (2026-10-19)

* `fetch-fx-reference.mjs` baja el deflactor del PBI de EE.UU. de la BEA (NipaDataA.txt, serie A191RD), sin clave, en vez de FRED; los 31
  valores dan iguales.

## Versión 799 — Reino Unido: 6 transcripciones más; fin de los subagentes (2026-10-19)

* Red Bull Racing 2020, Chelsea 2019-21 y Leeds 2018-21, con 0 P1 / 0 P2 de fidelidad. Guido decide no transcribir más con subagentes:
  la cola sigue por Mistral.

## Versión 798 — 301: gasto.mjs y audit.js --json ya no se cortan en un pipe (2026-10-19)

* Los dos esperan a vaciar la salida antes de terminar: el JSON completo (327.687 bytes) llega entero y parsea.

## Versión 797 — Reino Unido: 106 transcripciones validadas (2026-10-19)

* 261 a: `pipeline.mjs --lista` sobre los 108 `.md` del Reino Unido (US$ 8,59): 106 listos; 36 rehechos, con 0 P1 / 0 P2 de fidelidad.

## Versión 796 — club-sourcing: una sola carpeta por club; 306 y 307 cerrados (2026-10-19)

* Skill `club-sourcing`: "Una sola carpeta por club" (mirar la entidad de la portada al guardar; ok de Guido).
* 306 (Milan 2018 en caja-deuda) a HALLAZGOS, sin daño hoy; 307 (el gasto que imprime localizar) no se reproduce: suma bien.

## Versión 795 — Sarpsborg 08 sobre el FLI: 2012 y 2014-2022 (2026-10-19)

* Lote 96: diez años del FLI de Sarpsborg 08, con perímetro individual (la controlada Prozo AS queda afuera). 2023 y 2024 esperan dos
  mejoras de script (298 ab y ac).

## Versión 794 — 286 y 287: el ensayo cotiza los .md sin tablas; audit.js caza carpetas dobles (2026-10-19)

* `pipeline.mjs`: el ensayo cuenta los `.md` viejos sin tablas que la corrida rehace con Mistral (hoy 0; queda de resguardo).
* `audit.js`: hallazgo P2 `carpeta-doble` (el mismo PDF en dos carpetas de club de un país): 25 casos reales para mirar.

## Versión 793 — Cierre de Pipeline 3; Pipeline 4 sigue (2026-10-19)

* Pipeline 3 cierra por contexto; su cierre, en `Admin/Archive/`. Pipeline 4 (Sonnet) sigue con 286-287, 306-307, 301, 302, 290 y 310.

## Versión 792 — 279: cargar.mjs no duplica años en club-leagues; 232 cerrado (2026-10-19)

* `cargar.mjs`: un año que ya tiene liga en `data/club-leagues` no se vuelve a agregar; con otra liga, queda la que estaba y avisa (así
  nacieron las 58 claves repetidas de ru.js).
* 232 e a HALLAZGOS: recortar el texto de A2 ahorraría 2-3% del gasto de API. El 232 queda cerrado.

## Versión 791 — 298 z: el primer ejercicio de más de 12 meses se carga como el año del cierre (2026-10-19)

* `cargar.mjs`: el primer ejercicio de una sociedad nueva de más de 12 meses se carga como el año del cierre, con nota pública (decisión
  de Guido); entran Anderlecht 2011, RAAL 2018, Sint-Truiden 2013 y Zulte Waregem 2012 cuando se vuelva a correr Bélgica.
* `periodo.mjs` lee el período del formulario NBB con las fechas en las líneas siguientes: 31 documentos belgas dejan de tomar la fecha
  de la asamblea como cierre. Lote completo: 0 diferencias en lo cargado.

## Versión 790 — 298 u2: las listas belgas bajan enteras (2026-10-19)

* `fetch-club-league-reference.mjs` cortaba los códigos de equipo con guion ("B-W" de Beerschot Wilrijk). Lote 92: de 41 a 45 de 51 listas;
  las 358 guardadas dan los mismos equipos.

## Versión 789 — Reino Unido: sociedad por documento y 6 transcripciones; cierre de Finanzas 5 (2026-10-19)

* 261 b y c: la sociedad de cada documento del Reino Unido, en `sociedad-por-documento.md`; 3 duplicados exactos a descartados.
* 6 transcripciones con subagentes Sonnet (Wolves 2019-20, Aston Villa 2018-21, West Ham 2019-21), 0 P1 / 0 P2 de fidelidad.
* Finanzas 5 cierra; su nota, en `Admin/Archive/`.

## Versión 788 — Fredrikstad 2013-2018 y la 2. divisjon noruega (2026-10-19)

* Fredrikstad FLI 2013-2018, del lote 95. Liga nueva `no-2divisjon` (tercera división) y listas de la 1. divisjon 2012-2018.
* La compuerta de estadio y sponsor acepta solo con estadio la 1. y la 2. divisjon noruegas (decisión de Guido).
* Sarpsborg 08: los PDFs del FLI, transcriptos.

## Versión 787 — 298 v medida: sin daño hoy (2026-10-19)

* Los originales con -correction del lote 92 ya están descartados y no aparecen como frenados; el caso queda en HALLAZGOS.

## Versión 786 — 298 s medida: sin daño hoy (2026-10-19)

* El cierre de Beerschot 2019 -correction sale bien sin ajuste desde la 298 f; el aviso de "0 filas extraídas" queda en HALLAZGOS.

## Versión 785 — 298 q: el ensayo cobra solo lo que va a categorizar (2026-10-19)

* `lote.mjs`: el ensayo cobra la categorización solo a los documentos que la van a hacer (cotizados o extraídos, sin testigos, con
  `.categorias.json` viejo). Lote 93: de US$ 0,78 a 0,06; prueba mediana: de 9,96 a 0,33.

## Versión 784 — 295 c: la FNL rusa; lista de validación del Reino Unido (2026-10-19)

* Primera Liga rusa (FNL) 2025: dictamen de Terrafinans, sin salvedades.
* 261 a: lista `Admin/lotes/reino-unido-validar.txt` con los 108 PDF del Reino Unido; el ensayo da ~US$ 11,48.

## Versión 783 — 298 p: el perfil por año y los ceros reales del club (2026-10-19)

* p2: un cero real confirmado de una categoría vale para los otros años del club, si ningún año cargado la tiene con monto.
* p1: el perfil (socios, otros deportes) es por año; cada chequeo vale 5 años y uno que contradice abre perfil-cambio. 150 chequeos con
  año (Benfica y Sporting sí tienen socios; lo cargado ya incluía sus cuotas). Lote completo: 0 filas distintas.

## Versión 782 — 295 c, segunda tanda: KNVB, ANFP, HNS y RPL; cierre de Finanzas 4 (2026-10-19)

* Cargadas: KNVB (Eredivisie y Eerste Divisie) y HNS (Croacia) como federación entera, ANFP 2025 y Premier Liga rusa 2025. Lega B, TFF y
  dos segundas divisiones, solo con nota de sourcing.
* Tarjeta de la liga: una liga sin informe del auditor (`falta_transcripcion`) ya no se publica; `alcance: federacion` con texto y chip propio.
* Finanzas 4 cierra; su nota, en `Admin/Archive/`.

## Versión 781 — Lote 93 cerrado: 19 altas neerlandesas más (2026-10-19)

* ADO Den Haag, De Graafschap, Den Bosch, Dordrecht, Eindhoven, Emmen, Groningen, Twente, Utrecht, Volendam, Helmond Sport, PEC Zwolle,
  Roda JC, Cambuur, Heerenveen, Telstar, Vitesse, VVV-Venlo y Willem II. Con las 7 anteriores, los 26 clubes del lote están en el sitio.
* Lista de la Eerste Divisie 2021-22 y alias de FC Eindhoven en club-league-reference.

## Versión 780 — 295 c: seis ligas más con su balance y su auditor (2026-10-19)

* EFL 2024-25 (Grant Thornton), Swiss Football League 2024-25 (EY), Norsk Toppfotball 2025 (BDO), Superligaen 2024-25 (EY), federación
  estonia 2025 (incertidumbre de continuidad) y Super League griega 2024-25 (PKF, con salvedades). Pro League belga transcripta, sin el
  informe del comisario. Eredivisie, LPF y Dimayor no publican.

## Versión 779 — 298 n: el año vecino con otro perímetro ya no frena (2026-10-19)

* `verificar.mjs`: si la comparación con el año vecino falla entre dos documentos con perímetro fijado distinto, queda "no se puede
  comparar: perímetros distintos" y no abre anio-vecino. Lote completo: 718 de 720 idénticos; Benfica 2018-19 y Aris 2021 pasan a OK.

## Versión 778 — La skill de onboarding nombra lotes-prueba.mjs; la 298 m a HALLAZGOS (2026-10-19)

* `club-or-year-onboarding`, sección 5: los lotes de prueba los arma `tools/lotes-prueba.mjs` (ok de Guido).
* 298 m medida: el ajuste del club ya es el escalón 0 de la carga; sin daño hoy, no se codea.

## Versión 777 — Lotes de prueba al día, armados por una tool (2026-10-19)

* `tools/lotes-prueba.mjs` arma la mediana y la completa desde lo que tiene verificación; la rápida sigue a mano (+18 casos). Quedan
  62 / 339 / 720 documentos de 12 países (antes 44 / 118 / 358). Base: medir-verificar OK 683 / COLA 37; contra-sitio, 598 de 624 años.

## Versión 776 — 270: el estimado medido otra vez, con detalle por país (2026-10-19)

* `estimar.mjs --medir --detalle` (y `--detalle-clubes`): error por país, liga y división, sesgo y dispersión; solo lectura.
* Medición con 1.011 club-años: 50% en total, de 33% (Italia) a 97% (Países Bajos). La variable de partidos contra clubes con finanzas no mejora.

## Versión 775 — 298 l: el tipo de documento lo confirma la verificación (2026-10-19)

* `alta-club`: si el .md no tiene palabras de estado contable reconocidas o casi no tiene tablas, el reportType lo confirma la verificación
  cuando cerró con el resultado impreso. Medido: de 72 frenos a 4, lote completo sin diferencias. Salen 59 ajustes reportType estonios.

## Versión 774 — Viking Fotball AS 2017-2024 transcripto (2026-10-19)

* Los 8 PDFs del AS de Viking, transcriptos (to-do 285 cerrado); se cargan con los demás años de los clubes nuevos (lote 95).

## Versión 773 — En la Eerste Divisie alcanza el estadio (2026-10-19)

* `estadio-sponsor.mjs`: nl-eerstedivisie pasa la compuerta solo con el estadio, como las ligas amateur (decisión de Guido; Wikipedia no
  tiene tabla de camisetas de esa liga). Destraba las altas de segunda del lote 93. Regla en CONVENCIONES-DATOS.

## Versión 772 — 298 e3: el ensayo cotiza el rehacer con Mistral (2026-10-19)

* `resolver-inventario`: el ensayo suma el Mistral de un .md viejo sin tablas, como la corrida real. La corrida sin-tablas-298e habría
  dado US$ 40,60 (costó 43,09; antes el ensayo decía 7,26). Sobre todo lo pendiente sube US$ 83,15: 368 documentos.

## Versión 771 — Cierre de onboarding 2 y Amazonas confirmado (2026-10-19)

* Lote 93: la cola de los 6 neerlandeses que faltaban, contestada; los 26 años cierran en verificar. Lista de la Eredivisie 2018-19 (FC Emmen).
* 195: Amazonas 2024, gestión de Wesley Couto confirmada (asumió en 2022, Portal AM1).
* Onboarding 2 cierra; su nota, en `Admin/Archive/`.

## Versión 770 — Merge de onboarding 2: 7 altas neerlandesas del lote 93 (2026-10-19)

* Almere City, Excelsior, Fortuna Sittard, Heracles, NAC, NEC y Sparta Rotterdam, por el pipeline. Cola de Países Bajos: 87 respuestas.
* Excelsior con color de marca; FC Emmen y VVV-Venlo con el tipo de informe del alta.
* 11 altas de la Eerste Divisie frenan por el sponsor (Wikipedia no tiene tabla de camisetas): Guido decide que ahí alcanza el estadio.

## Versión 769 — Merge de finanzas 4: Go Ahead Eagles sin canal y gestiones sin caso (2026-10-19)

* 282 a: el informe del auditor de Go Ahead Eagles 2025 no tiene canal público (el KvK vende las cuentas); la línea dice qué se buscó.
* 195: de la lista sin caso en la cola, casi todo ya estaba cubierto; Novorizontino 2010, Amazonas 2024 y Cruzeiro 2024-2025 se buscaron y
  ninguno se confirmó (lo hallado, en su `Admin/carga-clubes/<club>.md`). Sin cambios en data/.

## Versión 768 — 298 w2: el paso A3 decide el perímetro cuando A2 no puede votar (2026-10-19)

* `perimetro-senales.mjs`: si A2 ve los dos estados sin totales, Sonnet (~US$ 0,01 por documento) contesta si alguna controlada hace el
  fútbol del club, citando la línea; solo "consolidado" decide. Medido: 6 bien, 0 mal, 3 no decide. Lotes 93-94: de 13 frenados a 6.
* El motivo del perímetro de PEC Zwolle cita L778 en vez de "academia". Los 5 ajustes de la y4 se quedan (HALLAZGOS).

## Versión 767 — Merge de finanzas 4: línea de auditoría de las 10 altas del lote 94 (2026-10-19)

* 282 f: 9 altas con informe sin salvedades (Viking, Vålerenga, Aalesund, Sarpsborg 08, Molde, Luzern y St. Gallen 2025; Basel 2021;
  Fredrikstad 2024). Go Ahead Eagles 2025 queda `falta_transcripcion`: el documento no trae el informe del auditor. 1004 balances con línea.

## Versión 766 — 298 w1: el ensayo dice qué documentos frenan por el perímetro (2026-10-19)

Merge de pipeline 3, sin conflictos; P0 0 / P1 0.

- `perimetro-senales.mjs`: el ensayo usa la respuesta guardada del paso A2 y dice qué va a frenar (lotes 93-94 sin sus ajustes: 13 de 36,
  los que frenaron de verdad; antes decía 0).

## Versión 765 — Merge de finanzas 4: el registro de entidades con las 10 altas (2026-10-19)

Lo generado regenerado; P0 0 / P1 0.

- To-do 294 cerrado: Go Ahead Eagles, Viking, Vålerenga, Molde, Basel, Aalesund, Sarpsborg 08, Luzern, St. Gallen y Fredrikstad en el registro,
  con cita por línea (60 clubes, 265 entidades, 365 relaciones).
- To-do 282: Lazio 2006, informe de Deloitte (individual, con salvedades) recuperado de la captura truncada de Wayback. Roma 2022 queda
  pendiente (Guido: no hay informe del consolidado público).

## Versión 764 — Segunda pasada a los sin sponsor; el 273 se cierra (2026-10-19)

Merge de datos 2 (lo generado regenerado) y de pipeline 3; P0 0 / P1 0.

- To-do 273: Ferroviária 2022 (Estrella Galicia) y 2023 (Betnacional) y el estadio de Novorizontino 2018, con fuente; ~73 siguen sin fuente.
- 298 y4 cerrada: los 5 ajustes de Fredrikstad 2024 y St. Gallen 2025 se quedan (sacarlos obliga a pagar de nuevo para llegar al mismo
  número; `Admin/HALLAZGOS-pipeline.md`).
- Guido: los ejercicios ya cargados sin sponsor quedan en null y no se vuelven a buscar (el 273 queda solo con nombrar la compuerta en la skill).

## Versión 763 — 298 y4: fuera los ajustes a mano de los noruegos (2026-10-19)

Merge de pipeline 3, sin conflictos; P0 0 / P1 0.

- Salen 6 ajustes `fila` de Vålerenga, Aalesund, Viking y Sarpsborg 08 2025 que tapaban la 298 y; `medir-cargar --contra-sitio`: los 4 años
  reproducen lo publicado. Quedan 5 de Fredrikstad 2024 y St. Gallen 2025.

## Versión 762 — Mistral rehízo los 238 .md sin tablas; merges de pipeline 3, datos 2 y onboarding 2 (2026-10-19)

`.jsonl` (cola, verificaciones, Claude API) con las líneas de las dos ramas; ASSET_V 1327, P0 0 / P1 0.

- To-do 298 e2: la corrida de Mistral sobre los 238 .md viejos sin tablas, en main (238 listos, ~US$ 42,97 contra US$ 7,26 del ensayo: 298 e3).
  La cita de Vasco da Gama 2024 del registro de entidades pasa a la línea del .md rehecho.
- To-do 298 i: `tools/paises-referencia.json` y `paisDe` en `alta-club.mjs` (las 32 carpetas sin fila en PAISES se resuelven; Escocia como GB).
- To-do 298 y1 a y3: el vocabulario noruego de costos financieros en singular (los 6 noruegos del lote 94 dejan de dar "no cierra"; la y2,
  Fredrikstad 2024, sale sola) y tres escalones de verificar.mjs para St. Gallen 2024-25 (cierra exacto con la compensación de la cola).
- To-do 312: la página de sponsor muestra "Otras fuentes". To-do 195: 18 gestiones confirmadas de Bélgica y Estonia (`data/gestiones/ee.js`,
  criterio de Estonia en `Admin/gestiones-por-pais/ee.md`).
- Lote 94: las 10 altas del borrador de Finanzas escritas (Go Ahead Eagles, Viking, Vålerenga, Molde, Basel, Aalesund, Sarpsborg 08, Luzern,
  St. Gallen y Fredrikstad 2024);
  Fredrikstad Fotballinvest AS 2017, 2018 y 2024 a descartados (mismo ejercicio que el FLI); estadio y sponsor de Luzern y St. Gallen a mano.

## Versión 761 — Merge de pipeline 2: la cola frena un no_es_rubro que deja un renglón vacío (2026-10-18)

Sin conflictos; P0 0 / P1 0.

- To-do 298 h: `cola.mjs --responder` no guarda un `no_es_rubro` que deja sin filas al renglón que abre su nota, salvo con `--igual` (Guido:
  con freno). De las 7 respuestas `no_es_rubro` de la cola, frena las 2 de Narva Trans 2025.

## Versión 760 — Merge de pipeline 2: el 630 belga partido por la nota (2026-10-18)

Sin conflictos; P0 0 / P1 0.

- To-do 298 g: `nbb.mjs` (`partir630`) parte las amortizaciones belgas en pases, goodwill y materiales con los códigos de la nota de activos
  fijos, solo si suman exacto y nunca en un año publicado. 33 de 191 documentos belgas lo parten; totales y estados idénticos; Bélgica
  publicada, 10 de 10.

## Versión 759 — Merge de onboarding 2: Países Bajos y las 10 altas del borrador, armados (2026-10-18)

`.jsonl` con las líneas de las dos ramas, lo generado regenerado; ASSET_V 1321, P0 0 / P1 0. La rama se adelantó a main (t, u, x, e y f).

- Lote 93: alta de Países Bajos (26 clubes, un año cada uno) y su cola (48 respuestas, 3 ajustes de fila). Lote 94: las 10 altas del
  borrador de Finanzas (Pardubice no), con perímetros, nombres legales y Fredrikstad en 2024. 0 años escritos todavía: las altas se
  revertían (298 x, ya en main) y 5 frenaban por el perímetro.
- 292: medidos los 319 .md viejos sin tablas (212 por rehacer, ahora dentro de la corrida de Mistral de la 298 e2).

## Versión 758 — Merge de pipeline 2: el período que declara el formulario (2026-10-18)

Sin conflictos; P0 0 / P1 0.

- To-do 298 f: `periodo.mjs`, paso 3b, toma el período que declara el formulario NBB o estonio (en celdas o en prosa) cuando los títulos no
  deciden. Medido sobre los 3.429 `.md`: cambian 17 (12 al cierre correcto, Lierse SK 2023 y 2025 y Beerschot 2019 -correction entre ellos;
  4 primeros ejercicios largos dejan de verse anuales); ninguno de los cargados cambia. Nueva letra 298 z (cargar esos ejercicios largos).

## Versión 757 — Merge de pipeline 2: el control "sin tablas" (2026-10-18)

Sin conflictos; P0 0 / P1 0.

- To-do 298 e: `pipeline.mjs` marca `sin-tablas` una transcripción vieja que nunca pasó por verificar (antes miraba la marca vieja de Jev y
  marcaba 0). Corrida gratis en main: 238 marcadas (lista `Admin/lotes/sin-tablas-298e.txt`). Decisiones de Guido: se rehacen también los
  43 belgas y los 100 de la 292 van por Mistral. Falta la corrida paga (~US$ 7,26).

## Versión 756 — La compuerta de estadio y sponsor en las ligas amateur (2026-10-18)

Merge de datos 2, sin conflictos; P0 0 / P1 0.

- To-do 273 (decisión de Guido): `estadio-sponsor.mjs` no exige sponsor en una liga cuyo nombre en `data/leagues.js` dice "amateur"; el
  estadio sigue siendo obligatorio. Estadio con fuente de Patro Eisden 2015 y RWDM 2019. Los 23 años belgas del lote 92 pasan la compuerta.

## Versión 755 — Merge de pipeline 2: el informe del auditor en estonio (2026-10-18)

Sin conflictos; P0 0 / P1 0.

- To-do 282 g: `tools/auditoria.mjs --extractos` suma 7 frases estonias ("vandeaudiitor", "meie arvates"…): 43 de 66 `.md` estonios con
  extracto (antes 0), los 43 con línea "sin_salvedades"; los demás países no cambian.
- To-do 282, Lazio 2011-2013 (merge de finanzas): los informes de PwC del consolidado, sin salvedades, antes `sin_informe`.
- Decisión de Guido: el lote guarda las listas belgas de ascenso y amateur aunque eso les arme faltantes y estimados en Ligas.

## Versión 754 — Estadio y sponsor de los años belgas (2026-10-18)

Merge de datos 2, sin conflictos; ASSET_V 1314, P0 0 / P1 0.

- To-do 273: estadio y sponsor a mano con fuente (nl.wikipedia, páginas de los clubes, prensa) para los años del lote 92; 11 de 23 pasan la
  compuerta; 12 de ligas amateur siguen sin sponsor con fuente (a decidir).
- `contexto-manual.json` acepta una fuente por campo (`fuentesManual`, la usan `js/contexto.js` y `generate-sponsors.js`): entran Akron 2022
  y Baltika 2024.

## Versión 753 — Merge de pipeline 2: las altas ya no se revierten (2026-10-18)

Sin conflictos; P0 0 / P1 0.

- To-do 298 x: `tools/generadores.mjs` (nuevo), una sola lista de generadores para `cargar.mjs` y `alta-club.mjs`; el alta no corría
  faltantes-liga ni estimar y toda alta nueva se revertía por 2 P1. `queFalla()`: el aviso dice qué chequeo falló. Medido con FC Volendam
  2024-25 (escrita con P0 0 / P1 0 y deshecha).

## Versión 752 — Merge de pipeline 2: la liga de un año nuevo (2026-10-18)

Sin conflictos; P0 0 / P1 0; medir-cargar de los 815 documentos idéntico.

- To-do 298 u: `listas-lote.mjs --lote` baja las listas que faltan para los años de un lote (también con los nombres viejos de cada liga);
  `lote.mjs --cargar` la corre antes de cargar; `alta-club.mjs` acepta un alias como nombre exacto; 7 alias belgas. En el lote 92, 44 de 55
  documentos encuentran su liga. Siguen 22 años belgas frenados por la compuerta de estadio y sponsor.

## Versión 751 — Sponsors y estadios a mano con fuente (2026-10-18)

Merge de datos 2, sin conflictos; ASSET_V 1312, P0 0 / P1 0.

- To-do 273: 52 datos a mano con fuente en `tools/contexto-manual.json` (subagentes Sonnet con cita, todo revisado; lo que solo venía del
  resumen de un buscador se confirmó con otra fuente o quedó afuera). Sin estadio o sin sponsor: 110 → 80 (estadio 100 %, sponsor 92 %).
- To-do 252: `ejercicios-nuevos.mjs` espera 13 meses para el Unternehmensregister (Gladbach y Stuttgart 2025, hacia enero de 2027).

## Versión 750 — Camisetas de la página del club, escritas (2026-10-18)

Merge de datos 2, sin conflictos; ASSET_V 1309, P0 0 / P1 0.

- To-do 273: `estadio-sponsor.mjs --escribir` con la tabla de camisetas de la página del club (ok de Guido a la muestra): sponsor o marca
  en 46 ejercicios, 73 entradas con fuente propia en `data/sponsors.js` (sponsor 89 %, marca 93 % de 1001 ejercicios).
- To-do 252: el Unternehmensregister y el Bundesanzeiger no respondieron; Gladbach y Stuttgart siguen a revisar.

## Versión 749 — Merge de pipeline 2: el estado belga por códigos NBB (2026-10-18)

Sin conflictos; P0 0 / P1 0.

- To-do 298 t: `tools/nbb.mjs` (nuevo) lee el estado de resultados NBB por sus códigos legales (signos, detalle o renglón nunca los dos,
  Brutomarge abreviada abierta con su residuo); `verificar.mjs` suma el escalón "códigos NBB" con la compuerta de todos los totales impresos
  exactos. Medido: 358 documentos de otros países idénticos; 17 belgas de la cola a OK, ninguno al revés; los 10 años belgas publicados igual.
- Bélgica ya no espera a la t; espera a la u. Patro Eisden 2025 y Lommel SK 2018 y 2025, con errores chicos de la carga vieja: a decidir (298 t2).

## Versión 748 — Merge de datos 2: camisetas de Wikipedia y ejercicios nuevos (2026-10-18)

Lo generado regenerado; ASSET_V 1308, P0 0 / P1 0.

- To-do 273: AVS 2021 y 2023 en Liga Portugal 2 (misma SAD que UD Vilafranquense, alias en `alias.json`); `generate-sponsors.js` suma lo
  manual y lo de la página del club con su fuente; `estadio-sponsor.mjs --camisetas` lee la tabla de camisetas de la página del club (con
  compuerta de rango; en ensayo, sin escribir: 46 ejercicios). `js/contexto.js` nombra esa fuente.
- To-do 252: Unión Magdalena con canal (SIIS por NIT); el script reconoce un ejercicio posterior ya bajado; canales revisados con el
  navegador (Instituto 2024-25 en Drive; Ituano, Monza, Salernitana y Alianza Lima todavía sin publicar); instrucción de la FPF corregida.
- Nuevo to-do 312 (la página de sponsor no muestra la fuente propia).

## Versión 747 — Merge de finanzas: auditoría de Estonia y Bélgica (2026-10-18)

Sin conflictos; P0 0 / P1 0.

- To-do 282: los 52 balances nuevos de Estonia y Bélgica tienen línea de auditoría (vuelve a haber 0 sin línea); en Estonia, subagentes
  Sonnet con criterio común y citas verificadas por `auditoria.mjs` (un "Asjaolu rõhutamine" con "olulise ebakindluse" es incertidumbre
  material). Lazio 2006-2010 pasan de `sin_informe` a `falta_transcripcion` (hubo informe, no está en ningún canal).

## Versión 746 — Merge de finanzas: informes del auditor y União de Leiria (2026-10-18)

`documentos-descartados.txt` con las líneas de las dos ramas; ASSET_V 1303, P0 0 / P1 0.

- To-do 282 a: informes del auditor de Lazio, Juventus, Roma, Napoli, Torino, Hellas Verona, Cremonese, Fortaleza CEIF, OFI y Hamburgo
  2025; FALTA EN EL PDF de 88 a 50. Lazio, Roma y Juventus citan el informe de su perímetro publicado.
- To-do 281 cerrado: União de Leiria 2023-24 con su línea de ingresos (columna comparativa del relatório 2024-25).
- To-do 294: Bahia cita el QSA del CNPJ (City Football Group Midco > City Football Group Brazil); BrasilAPI en `fuentes-externas.md`.
- Skills (con ok de Guido): club-sourcing (dónde publica cada club italiano el informe del auditor; informe aparte; Portugal) y
  worktree.md (rsync `--no-links`). CONVENCIONES-DATOS: ingresos de la otra entidad y qué informe va cuando hay dos.
- Nuevo to-do 311: pedirles por mail a los clubes los ~50 informes que no están publicados.

## Versión 745 — Merge de onboarding 2: lote 92 de Bélgica (2026-10-18)

Sin conflictos; P0 0 / P1 0.

- Lote 92 (Bélgica 2013-2024, ~US$ 1,65): 0 años escritos; 37 frenan en verificar, 2 en la compuerta de estadio y sponsor. 58 respuestas
  de la cola que no tocan importes, aplicadas; las que cambian números esperan las mejoras t y u del 298 (Guido: sin ajustes a mano).
- Con ok de Guido: las 5 versiones originales reemplazadas por su -correction, a documentos descartados; RWDM 2019 (7 meses sin
  actividad), a parciales. Mejoras s a v sumadas al 298.

## Versión 744 — Merge de pipeline: caja y deuda en Bélgica y Estonia (2026-10-18)

ASSET_V 1301, P0 0 / P1 0. La sesión pipeline cerró.

- To-do 298 c: `caja-deuda.mjs` ya no lee un código NBB ("54/58", "76A") como importe, y la caja belga de un año sin vecino sale del
  54/58 si el balance del documento cuadra (decisión de Guido: solo la caja). Estonio en `vocabulario.mjs` (298 c3 y r).
- To-do 298 d: `perimetro-senales.mjs` no fija el perímetro del club con años de los dos estados sin voto; ensayo `--decidir-clubes --solo-cache`.
- Escritas sin API: 10 cajas belgas y 10 cajas y 3 deudas estonias. La caja "equivocada" de Tallinna Kalev era buena, atada al año equivocado.
- Nuevo to-do 310: caja y deuda de un año sin vecino para cualquier país, y el criterio de la deuda belga.

## Versión 743 — Merge de datos-sourcing (2026-10-18)

Lo generado regenerado; ASSET_V 1299, P0 0 / P1 0. La sesión datos cerró.

- To-do 252: `ejercicios-nuevos.mjs` baja por el registro (Dinamarca por API y CVR, Companies House por número), reconoce "ya bajado" por
  fecha de cierre, temporada o número de ejercicio, mira la mediateca de WordPress y el texto de los links, y deja instrucciones de navegador
  (FPF, CMF, Unternehmensregister). "Página del canal" en las notas de Portugal, Argentina, Alianza Lima y Botafogo-SP; Chievo sin canal vivo.
  Torreense 2024-25 bajado. `companies-house-fetch.mjs --list --json`.
- To-do 273: 16 ligas más verificadas con evidencia (Católica, Ferroviária, Kifisia, Levadiakos, Fredericia, Racing 2026 a mano); el lector
  junta tablas de posiciones de grupos (Super League 2 griega 2023-24 completa). Diseño aprobado para los ~135 ejercicios sin sponsor o
  estadio (tabla de camisetas de la página del club), sin implementar.

## Versión 742 — Merge de pantallas: cita de Wikipedia en Ligas (2026-10-18)

Lo generado regenerado; ASSET_V 1298, P0 0 / P1 0. La sesión pantallas cerró.

- To-do 305: Ligas cita la lista de clubes de la temporada (Wikipedia, página, idioma, fecha de lectura y CC BY-SA 4.0), solo cuando la
  pantalla la usa. `generate-rankings.js` escribe `wiki` en cada liga-año (227 hoy); `citaLista()` en `js/liga.js`.
- Ligas ya no dice "Nadie verificó todavía cuántos equipos jugaron esta temporada…" (contradecía la lista citada).
- Finanzas: `scroll-margin-top` para Estadio y camiseta, Estructura, Auditoría y Citar (el índice fijo tapaba el título).
- 254 + 243: primera lectura del KV de búsquedas (11 claves, ningún club pedido que falte; unas 9 visitas reales en 30 días). Se borran:
  "nadie usa el site, así que por ahora no hagamos nada" (Guido). Nuevo to-do 309 (tamaño de liga desde la lista de Wikipedia).

## Versión 741 — Merge de onboarding: Estonia completa (2026-10-18)

`.jsonl` con las líneas de las dos ramas, lo generado regenerado; ASSET_V 1297, P0 0 / P1 0.

- Estonia: los 54 años 2019-2025 de los 9 clubes en el sitio (lote 91 en tres corridas por Batch API; cola contestada con subagentes Sonnet
  revisados; 37 ceros reales de TV y estadio con cita; Narva Trans consolidado a nivel club). Entraron sin la compuerta de estadio y sponsor.
- Lote 92 (Bélgica): Lommel SK 2018 y RWDM 2020; el resto espera las tools de main.
- Duda al club: FCI Levadia, "Liikmemaks" 2019-2020. Mejoras de script q y r sumadas al 298.

## Versión 740 — Merge de ligas (2026-10-18)

ASSET_V 1296, `fuentes.html` regenerada, P0 0 / P1 0.

- To-do 295: LaLiga 2024-25 (cuentas consolidadas de la LNFP, auditor Netadia Europa, sin salvedades; `es-laliga` y `es-segunda`) y
  J.League 2025 (koeki-info.go.jp, Grant Thornton Taiyo, opinión limpia; `jp-j1`) en `Ligas/` y en `LIGA_AUDITORIA`.
- Notas de sourcing: Lega Serie A, Liga Portugal y AFA (el balance existe y se audita, pero no se publica); CBF (los links están; el CDN
  no deja bajarlos desde acá).

## Versión 739 — Merge de proyecto: auditoría programada (2026-10-18)

- To-do 300: tarea programada `fos-auditoria-semanal` (lunes 8:10, carpeta principal, fuera del repo): `audit.js --quiet`, dashboard de
  usuarios y visitas, tablero del pipeline, auditoría de rutina con un eje rotando y de 3 a 5 sugerencias de mejora; commitea solo el
  reporte en `auditorias/` y deja lo del TODO para la principal. Sin `auditAll()` (audit.js hace los mismos tie-outs).
- `tools/dashboard-usuarios.mjs` (nuevo): arma los 4 archivos del dashboard en `Generados/dashboard-usuarios/` (ignorado) y mira las
  corridas del Worker `fos-supabase-ping` de los últimos 7 días (sin corridas o con errores: ALERTA). Cierra el 268.
- CONVENCIONES: `faltantes-desfasado` en un worktree se arregla con `preparar`; el hook de docs frena un comando que solo los nombra.

## Versión 738 — Merges de pipeline y pantallas; caja y deuda de Leipzig y HSV (2026-10-18)

Pipeline a mano (los `.jsonl` con las líneas de las dos ramas), pantallas con su `index.html`; ASSET_V 1295, P0 0 / P1 0.

- To-do 298 a, b y o: `verificar.mjs` exige el signo de un resultado impreso negativo; esquema NBB belga (costos financieros con el signo de
  su rótulo; escalón "de los cuales" para Waarvan y 76A); en `lote.mjs` la versión "-correction" reemplaza al original. Medido: prueba-
  completa idéntica y los 376 documentos sin cambios salvo los buscados (Lierse SK y Patro Eisden ahora cierran).
- To-do 288 cerrado (solo caja-deuda pasó a Sonnet) y 289 (la escala del año): caja y deuda escritas de RB Leipzig 2023-2024 (deuda 111,7 y
  153,7 M) y HSV 2024 (57,8 M con el bono convertible). Regla nueva de bonos convertibles en CONVENCIONES-DATOS.
- To-dos 303 y 304: fuera la pestaña Mercado de Pases, que mostraba datos inventados, y "sin fines de lucro" del pie.
- TODO: fuera 288, 289, 303 y 304; el 290 con lo que falta; nuevos 306 (Milan 2018), 307 (el gasto que imprime localizar) y 308 (los
  convertibles en la skill).

## Versión 737 — Merge de proyecto: hooks y licencia (2026-10-18)

`node tools/worktree.mjs mergear proyecto`, sin conflictos, P0 0 / P1 0 (ok de Guido: los hooks cambian la configuración de todas las sesiones).

- To-do 250: hooks de Claude Code (`.claude/settings.json` → `tools/hooks/pre-tool.mjs`): `audit.js` antes de cada commit publicable,
  permiso para editar skills, para `git push` y para borrar en `Clubes/`; en un worktree, no se escriben TODO, CHANGELOG ni ESTADO.
- To-do 244: licencia (decisiones de Guido): el Formato simplificado bajo CC BY-NC 4.0, uso comercial con licencia aparte, la API paga para
  todos; documentos de los clubes sin la licencia del sitio; Wikipedia con CC BY-SA 4.0; el código, todos los derechos reservados.
  `terminos.html` ("Licencia y reuso"), `metodologia.html` ("Fuentes externas") y `Admin/fuentes-externas.md`.
- Regla nueva en CONVENCIONES (una fuente externa nueva se anota antes de publicar). TODO: fuera 250 y 244; el 249 suma las cotizaciones que
  restringen el uso comercial; nuevos 302 (deflactor desde la BEA), 303 (Mercado de Pases inventado), 304 ("sin fines de lucro" en el pie) y
  305 (la cita de Wikipedia en Ligas).

## Versión 736 — Merge de pantallas: las cuentas de la liga (2026-10-18)

- To-do 282 en Ligas: tarjeta "Las cuentas de la liga" (`js/auditoria.js`, desde `js/liga.js`): la entidad que organiza la liga, quién
  auditó su balance y qué dijo, con el link a la transcripción. Probada con la Premier League 2025 (Deloitte). `index.html` carga
  `data/auditoria/_ligas.js`. ASSET_V 1290, P0 0 / P1 0.

## Versión 735 — Merge de finanzas: los ingresos de las asociaciones portuguesas (2026-10-18)

- To-do 281: 14 documentos de asociaciones portuguesas (Vizela, Belenenses, Chaves, Académica, Braga, Marítimo, Porto 2024-25 en cuatro
  tramos) transcriptos por subagentes, con su línea de ingresos verificada; la tarjeta Estructura los muestra. 17 líneas de ingresos en
  el registro de entidades. Falta União de Leiria. ASSET_V 1289, P0 0 / P1 0.

## Versión 734 — Merges de ligas y pantallas: la Premier League y la cobertura de ligas en el tablero (2026-10-18)

Los dos a mano: generados con main y regenerados; ASSET_V 1288, P0 0 / P1 0. Después, fast-forward de pantallas para el 282 en Ligas.

- To-do 295 (worktree nuevo `fos-ligas`): las cuentas 2024-25 de la Premier League (Deloitte, sin salvedades), transcriptas en `Ligas/` y
  con su línea de auditoría (`ligaId` + `entidad`); `tools/auditoria.mjs` acepta citas de `Ligas/*.md`.
- Tablero del pipeline: la cobertura de las ligas (completas, 50 % o más, menos del 50 %, con el % de cada una), en `tools/tablero.mjs`.
- Herramientas de Guido (fuera del repo): auto como modo por defecto, tres plugins sin usar apagados, línea de estado con el % de
  contexto y el costo, y una tarea programada semanal con las novedades de Claude Code.
- TODO: el 295 con lo hecho y el orden que sigue; el 298 suma la o (versiones "-correction") y l a p.

## Versión 733 — Merge de datos-sourcing: la revisión mensual de ejercicios nuevos (2026-10-18)

- To-do 252 (Guido: mensual): `tools/ejercicios-nuevos.mjs` (gratis) revisa, por club cargado, si el ejercicio que sigue ya debería estar
  publicado y lo busca en el canal de su nota de sourcing; baja el PDF a `Clubes/` y anota en `Admin/sourcing/README.md`. Tarea programada
  mensual (día 1, 9:00). Primera corrida: Amazonas 2025 nuevo; 14 clubes con el PDF ya bajado sin cargar; 45 páginas para el navegador.
- TODO: el 252 queda con las URLs que faltan y los 14 clubes para cargar.

## Versión 732 — Merges de finanzas y pantallas: auditoría completa y el alcance de cada revisión (2026-10-18)

Los dos a mano: generados con main y regenerados, `index.html` con la versión de cada rama; ASSET_V 1285, P0 0 / P1 0. Probado: Como
2024/25 con "Revisión limitada" en la tarjeta de auditoría.

- To-do 294 c: Lommel SK, Patro Eisden y Lokeren-Temse en el registro de entidades (Lommel, en la página del grupo CFG): 50 clubes.
- To-do 282: Spartak 2022 transcripto palabra por palabra; los 40 balances sin línea, cerrados (942 con línea; los 10 japoneses 2025 y
  otros 6 pasan a "FALTA EN EL PDF", 88 en total); las 6 firmas del OCR verificadas contra la imagen (Getafe, Union SG, Elche, Goiás
  corregidas); campo `alcance` (revisión limitada, procedimientos acordados, propósito especial, grupo) y la tarjeta que lo muestra.
- TODO: 282 y 294 con lo que queda.

## Versión 731 — Merge de pantallas: el tablero del pipeline (2026-10-18)

`node tools/worktree.mjs mergear pantallas`, sin conflictos, P0 0 / P1 0.

- To-do 253: tablero del pipeline para el celular, artifact de Claude tipo Dashboard (https://claude.ai/artifact/ESc6PC7CUbQ8wV2ETgLVdb):
  ejercicios en el sitio, listos para cargar, la cola, el gasto de API por día, motor y país, los PDFs por etapa con su costo y los mails a
  clubes. Los datos, de `tools/tablero.mjs` (gratis).
- TODO: fuera el 253; el 300 suma actualizar el tablero; nuevo 301 (gasto.mjs --json se corta en un pipe).

## Versión 730 — Merge de pantallas: sponsors y marcas en el buscador (2026-10-18)

`node tools/worktree.mjs mergear pantallas`, sin conflictos, P0 0 / P1 0.

- To-do 297: grupo "Sponsors y marcas" en el buscador (hasta 6; tocar uno abre su página). `data/sponsors-indice.js` se baja la primera
  vez que se busca, no al entrar. Probado: "adid" encuentra Adidas.
- TODO: fuera el 297; pantallas toma el 253 (tablero del pipeline para el celular).

## Versión 729 — Merge de onboarding: Estonia en Ligas (2026-10-18)

A mano: `tools/club-league-reference/alias.json` unido clave por clave (las dos ramas sumaron alias; 92, sin choques), generados con main
y regenerados; ASSET_V 1281, P0 0 / P1 0, 0 alias rotos y 0 que faltan. Probado: Estonia y la Meistriliiga en el estado frío de Ligas.

- To-do 299 (pedido de Guido: "en ligas no veo estonia"): `ee-meistriliiga` y `ee-esiliiga` en `data/leagues.js`, `data/club-leagues/ee.js`
  con la liga de los 9 clubes 2019-2025 (fuente en `Admin/ligas-por-pais/ee.md`). Las 8 altas belgas, con su liga (Pro League y
  Challenger Pro League).
- TODO: fuera el 299; el 298 suma la k (el alta no toma la liga de la revisión); el 273 anota los años de los lotes 91-92 cargados sin
  la compuerta de estadio y sponsor.

## Versión 728 — Merges de datos-sourcing y pantallas: Wikipedia del país e índice de sponsors (2026-10-18)

Los dos a mano: generados (`data/estimados/`, `fuentes/`) con main y regenerados, `index.html` con la versión de cada rama; ASSET_V 1280,
P0 0 / P1 0. Después, fast-forward de pantallas para el 297.

- To-do 273: `estadio-sponsor.mjs --local` toma estadio y capacidad de la Wikipedia del país (pt, es, it, ru) cuando la página nombra al
  menos el 60% de los equipos; estadio de 88% a 96%. Un sponsor "TBA" o sin letras, y una capacidad menor a 100, cuentan como dato que
  falta. `data/sponsors-indice.js` (~95 KB) para el buscador.
- "Estadio y camiseta": un campo de la Wikipedia del país linkea a esa página ("Wikipedia (es)").
- TODO: 273 y 297 al día.

## Versión 727 — Merges de finanzas y onboarding: entidades y 17 clubes nuevos de Estonia y Bélgica (2026-10-18)

Finanzas y onboarding, a mano: `index.html` con main en los dos (solo habían cambiado la versión), `ajustes-manuales.jsonl` con las
líneas de las dos ramas (JSON válido, sin repetidas); generados regenerados, ASSET_V 1278, P0 0 / P1 0. auditAll: 276 clubes, 2663
checks que cierran, 0 que no. Después, fast-forward de la rama finanzas para el 294 (c).

- To-do 294 a y b: ajustes `anio` de 8 PDF portugueses (Boavista, Marítimo, Portimonense) y las dudas de entidades resueltas con cita
  (Man City por Companies House, Yokohama, Bahia en CFG, Friedkin, PSG, 777). 47 clubes con estructura.
- To-do 292: validadas las 326 transcripciones de subagentes (US$ 2,53) y Mistral para 3 documentos (US$ 0,64). Lotes 89 (Estonia) y 90
  (Bélgica): 17 clubes nuevos, con la cola contestada por subagentes y revisada contra el .md; el 630 belga partido por la nota de activos.
  Estonia, país nuevo.
- Regla nueva en CONVENCIONES-DATOS (el dueño de una sociedad intermedia, del registro público). TODO: 292 y 294 al día; nuevos 298
  (mejoras de script de Estonia y Bélgica, para pipeline) y 299 (ligas de Estonia).

## Versión 726 — Merge de pantallas: estadio y camiseta, y la página por sponsor (2026-10-18)

`node tools/worktree.mjs mergear pantallas`, sin conflictos, P0 0 / P1 0, ASSET_V 1274.

- To-do 273, la pantalla: tarjeta "Estadio y camiseta" en Finanzas (`js/contexto.js`): una columna por ejercicio, estadio, capacidad,
  sponsor y marca, con la fuente de cada ejercicio (Wikipedia, o la manual si algo se cargó a mano). Probado con Boca y Akron.
- To-do 296: página de cada sponsor de camiseta y marca técnica (`js/sponsor.js`, `?tab=sponsor&sponsor=…`): equipos de hoy y línea
  de tiempo por temporada; se llega desde "Estadio y camiseta". Probado: Betano, Betsson desde Boca, Adidas (191 equipos).
- TODO: fuera el 296; el 273 queda con completar a mano y nombrar la compuerta; nuevo 297 (sponsors en el buscador).

## Versión 725 — Merge de datos-sourcing: listas de liga, estadio y sponsor (2026-10-18)

Merge a mano: `index.html` con main (datos solo había cambiado la versión); generados regenerados, ASSET_V 1271, P0 0 / P1 0. Después,
los 3 commits de sesiones de pantallas y el fast-forward de su rama, para que codee el 273 y el 296.

- To-do 277 cerrado con la premisa vencida: `data/club-leagues/it.js` estaba bien (Parma cerró el 30/6 entre 2016 y 2019); el error era de
  `tools/listas-lote.mjs`, que calculaba la temporada con la regla del club en vez del cierre de cada ejercicio.
- To-do 276: el lector de listas toma el club después de una matrícula numérica y junta los grupos de una liga partida; guardadas Primera
  B Metro 2020 y 2021, Pro League 2024-25, Serie C 2023-24 y Liga 1 de Perú 2020. 0 alias rotos, 0 que faltan.
- To-do 273: `tools/estadio-sponsor.mjs` guarda `data/contexto/<iso>.js` (estadio, capacidad, sponsor y marca, con el permalink de la
  revisión de Wikipedia); Rusia con un lector propio y lo que faltaba a mano con fuente. Compuerta en `cargar.mjs` y `bfo-rusia.mjs`: un
  año nuevo no se escribe sin estadio y sponsor (pedido de Guido). Índice `data/sponsors.js` (2401 sponsors y marcas).
- TODO: fuera 276 y 277; el 273 y el 296 con lo que queda.

## Versión 724 — Merge de finanzas, cierre de la sesión: auditoría de 902 balances y 44 clubes con estructura (2026-10-18)

Merge a mano: `index.html` con main (los scripts de auditoría y citar que la rama no tenía; finanzas solo había cambiado la versión);
generados regenerados, ASSET_V 1270, P0 0 / P1 0. Probado: Vitória con Auditoría, Estructura y Citar. La sesión de finanzas cerró.

- To-do 282: el registro de auditoría cubre 902 de 925 balances (81 tandas de subagentes Sonnet por país, citas verificadas): 509 sin
  salvedades, 144 con salvedades, 7 abstenciones, 139 sin informe en el documento, 116 con incertidumbre sobre la continuidad. 30
  informes que faltaban, transcriptos (`<pdf>.informe-auditor.md`). Criterio del dictamen en CONVENCIONES-DATOS.
- To-do 294: registro de entidades con 44 clubes y 9 grupos multiclub (BlueCo, City Football Group, Marinakis, Friedkin, 777 Partners,
  Eagle Football, Suning, QSI, Black Knight), 219 entidades y 326 relaciones.
- TODO: 282 y 294 quedan con lo que falta; nota de Chaves en el 281.

## Versión 723 — Merge de pantallas: citar, descargar y metodología (2026-10-18)

`node tools/worktree.mjs mergear pantallas`, sin conflictos, P0 0 / P1 0, ASSET_V 1269.

- To-do 242: tarjeta "Citar y descargar" en Finanzas (`js/citar.js`): cita sugerida de lo que se ve, copiar la cita o el link y un CSV
  por rubro y ejercicio desde el motor; página pública `metodologia.html` (fuentes, formato, dólares, inflación, deuda, estimados,
  auditoría y cómo citar), en el pie y en `sitemap.xml`. Probado con Boca en USD y ARS.
- TODO: fuera el 242; el 273 con el formato del dato; nuevo 296 (página por sponsor).

## Versión 722 — Merge de pantallas: quién auditó, en Finanzas (2026-10-18)

`node tools/worktree.mjs mergear pantallas`, sin conflictos, P0 0 / P1 0, ASSET_V 1267.

- To-do 282, Finanzas: tarjeta "Quién auditó estos números" (`js/auditoria.js`): una fila por ejercicio con el auditor, el dictamen
  como etiqueta de color, la duda sobre la continuidad aparte y "ver en el balance". Sin dato, "Todavía no lo revisamos"; sin ningún
  dato del club, escondida. En Ligas espera el balance de alguna entidad organizadora (to-do 295).

## Versión 721 — Merge de finanzas: ingresos de las otras entidades y el dato de auditoría (2026-10-18)

`node tools/worktree.mjs mergear finanzas` (lo generado con main y regenerado), P0 0 / P1 0; después, los dos commits de sesiones de
pantallas y el fast-forward de su rama, para que codee la pantalla del 282.

- To-do 281, la pantalla: la tarjeta Estructura muestra los ingresos de la entidad que no se carga, con el % de los del club cuando
  coinciden moneda y cierre; accionistas menores de la entidad cargada en "Relacionadas".
- To-do 282, el dato: `Admin/registros/auditoria.jsonl` y `tools/auditoria.mjs` (verifica citas y genera `data/auditoria/`; `audit.js`
  da P1 si queda viejo). Piloto de 19 balances de 16 países por subagentes: 2 con salvedades, 2 con duda sobre la continuidad, 2 sin
  informe. Acepta la entidad organizadora de una liga (`_ligas.js`, hoy vacío).
- TODO: 281 y 282 con lo que falta; nuevo 295 (balances de las entidades organizadoras de las ligas).

## Versión 720 — Merge de pantallas: el grupo en la URL y el buscador, y el 271 (2026-10-18)

`node tools/worktree.mjs mergear pantallas`, sin conflictos; P0 0 / P1 0; ASSET_V 1264. Probado: un link de Comparar con inflación.

- Grupo multiclub enganchado: `?tab=grupo&grupo=<id>` en la URL, 'grupo' en `TABS_SIN_CLUB` y el resultado "Grupos multiclub" del buscador.
- To-do 271: un link copiado abre lo mismo que se estaba viendo: `moneda`, `real=1`, `formato=club` y los dos lados de Comparar (`a`, `b`).
- TODO: fuera el 271; el 273 y el 282 con lo que se definió (campos de estadio y sponsor; auditoría también de la entidad organizadora).

## Versión 719 — Merge de finanzas: estructura del club y grupos multiclub (2026-10-18)

Merge a mano: `data/lang/en.js` con los bloques de las dos ramas (pantallas y finanzas), `index.html` con los scripts de finanzas;
generados regenerados, ASSET_V 1262, P0 0 / P1 0. La rama sigue abierta (281, 282, 242).

- To-do 280 a: registro `Admin/registros/entidades.jsonl` con cita obligatoria y `tools/entidades.mjs` (verifica citas, cargas, ids y
  ciclos de control; genera `data/entidades/`; `audit.js` da P1 si queda viejo). Primeros casos: Chelsea 2025 (BlueCo) e Inter 2025.
- To-do 280 b: tarjeta "De quién son estos números" en Finanzas (`js/finanzas-estructura.js`).
- To-do 280 c: página del grupo multiclub (`js/grupo.js`, sección `#grupo`); se llega desde la tarjeta Estructura. La URL y el buscador
  los engancha pantallas.
- To-do 281, el dato: línea `ingresos` en el registro; piloto Portugal (Vitória, Tondela, Braga).
- Reglas nuevas en CONVENCIONES-DATOS (entidades, grupos, ingresos de otras entidades) y una excepción en PANTALLA (link "ver en el
  balance" en la tarjeta Estructura).
- TODO: fuera el 280; el 281 queda con lo que falta.

## Versión 718 — Merge de pantallas: Ligas con estimados y consolidado (2026-10-18)

`node tools/worktree.mjs mergear pantallas`, sin conflictos; P0 0 / P1 0; estimar y faltantes-liga "al día". La rama sigue abierta
(271 y la página del grupo).

- To-do 293: en el estado frío de Ligas cada liga muestra solo su nombre (antes "N clubes · año" se leía como un solo ejercicio).
- Estimado de club nuevo PRENDIDO (decisión de Guido): todo club de la lista de una liga sin balance ese año tiene estimado (regresión
  sin historia, 50% de error medido); de 439 a 4750 club-años estimados en 34 ligas. `faltantes-liga.mjs` guarda la posición de todos.
- To-do 275: los estimados en la tabla de ingresos de Ligas, con "(estimado)*", barra rayada, rango y error; total de la liga con
  estimados cuando más de la mitad tiene balance real. La lista de "faltan y por qué" se descartó (Guido).
- To-do 274: "La liga en total, por categoría", con la franja de estimados cuando el total los suma.
- To-do 272: fuera el cartel de primera visita y su código. ASSET_V 1261.
- TODO: fuera 293, 275, 274 y 272; el 270 queda como "volver a medir".

## Versión 717 — El plan, todo en to-dos (2026-10-18)

- TODO: el ORDEN ya no tiene los tres puntos de arriba (pedido de Guido): caja y deuda son los 289 a 291, las transcripciones por
  subagentes pasan a ser el 292 (tanda A) y las mejoras de proyecto ya eran los 241 a 259. Nuevo 293: en Ligas, las tarjetas de cada
  país parecen decir que hay un solo año por liga.

## Versión 716 — Merge de pipeline: ajuste por año, deuda italiana y Batch API; caja y deuda de Dortmund y Leipzig (2026-10-18)

Sesión en el worktree `fos-pipeline`. Merge a mano: `tools/worktree.mjs` con la versión de main (mismo arreglo de `preparar`, más
completo) y los tres registros `.jsonl` con las líneas de las dos ramas (JSON válido, sin repetidas); ASSET_V 1252, P0 0 / P1 0.

- To-do 263: un ajuste `caja` / `deuda` puede llevar `--anio` (`tools/ajustes.mjs`); en `caja-deuda.mjs` el escalón 0 toma el del año.
- To-do 262: el diccionario de deuda italiano suma obbligazioni y préstamos de socios (`--medir`: 164 → 168 iguales, 13 → 11 distintos, sin
  errores nuevos). La compuerta del total impreso se midió, no servía y quedó en HALLAZGOS.
- Batch API (`tools/lote-batch.mjs` y `tools/claude-batch.mjs`): el mismo lote y modelo a mitad de precio (Rapid Wien 2023-24, todas las
  etapas, US$ 0,085 contra ~0,17). Opcional y más lento.
- Jev en perimetro-a2: 2 errores en 23 decisiones; revertido y en HALLAZGOS.
- Caja y deuda escritas sin API: Dortmund 2024-2025 y RB Leipzig 2022 y 2025. Antes hubo que poner `grossDebt:null, cash:null` en esos
  años (el formato viejo no tenía la clave y `caja-deuda.mjs` no escribía). auditAll: 2612 cierran, 0 no. ASSET_V 1253.
- TODO: fuera 262, 263, 233 y 230; nuevos 288 (Opus → Sonnet), 289 (escala del año), 290 (Genoa 2022) y 291 (duda del factoring); el 286
  con los 481 .md sin tablas.

## Versión 715 — Merge de onboarding: limpieza de las transcripciones por subagentes, gestiones y altas (2026-10-18)

Sesión en el worktree `fos-onboarding`. Merge a mano por el `<title>` (la rama traía el viejo en la línea de la versión: ganó main);
generados regenerados, ASSET_V 1251, auditoría P0 0 / P1 0.

- Limpieza de las transcripciones por subagentes (ORDEN punto 2). A descartados: lo que no es del club (NEC Stichting, RKC Samen, VVV
  Foundation, Titanes, Toros); lo que no trae estado de resultados (Grasshopper, Beşiktaş 2012/2013/2024, Corsarios 2025, Basel Verein
  2021); segundas versiones del mismo ejercicio en Países Bajos (Ajax, AZ, Twente, De Graafschap, Go Ahead Eagles, PEC Zwolle, Sparta,
  Telstar); 523 certificaciones y dictámenes de Colombia con estados financieros del mismo año; los 5 informes Deloitte de la Pro League;
  los 18 documentos de Molde Fotball AS. Titanes y Toros (básquet y béisbol) salen del repo por `.gitignore`.
- Carpetas dobles unificadas (Thun, St. Gallen, NEC). Arreglos chicos en los .md de Ajax, Sparta, ADO y Go Ahead Eagles.
- Transcriptos por subagentes: NEC Holding 2023-24, Beşiktaş 2014-2017 y 2020, De Graafschap 2021-22, Sparta 2021-22, VVV 2021-22 y 2022-23.
- 36 .md belgas sin tablas rehechos con Mistral y validados (corrida cortada en 40 de 566, ~US$ 6,75).
- Gestiones (to-do 195): 49 de 25 clubes de Portugal (129 casos de la cola contestados) y 9 de clubes sin caso en la cola (Fortaleza,
  Novorizontino, Ituano, Ceará, Pari NN, Once Caldas, Mönchengladbach).
- Altas (165 c): nombre legal de Lommel SK, Patro Eisden, St. Gallen, Luzern (FCL Holding AG) y Lokeren-Temse; Viking = Viking Fotball AS;
  Molde = el FLI.
- `Admin/transcripcion-subagentes/reglas.md`: paso 0 (leer la portada; no transcribir lo que no es del club o no trae estado de resultados).
- Regla nueva en CONVENCIONES-DATOS: dos documentos distintos del mismo club y ejercicio. HALLAZGOS: ligaduras de Calibri CID en
  `pdftotext`. Pendientes de sourcing en las notas de Turquía, Países Bajos y Colombia. Esperan a los clubes (dudas-por-club.md): Estoril
  2025, Cruzeiro 2024-25, Amazonas 2024, Novorizontino 2010.
- TODO: punto 2 del ORDEN con lo que sigue; nuevos 280 a 287.

## Versión 714 — Merge de datos-sourcing: faltantes por liga, listas nuevas y estimados (2026-10-18)

Sesión en el worktree `fos-datos`. Merge a mano por un conflicto en `tools/worktree.mjs preparar` (las dos ramas habían arreglado la
misma línea: quedaron las dos condiciones); generados regenerados, ASSET_V 1250, auditoría P0 0 / P1 0.

- To-do 266 hecho: `tools/faltantes-liga.mjs` genera `data/faltantes/<liga>.js` y `Admin/sourcing/pendientes.md`; 7187 club-años en 376
  liga-años y 882 clubes pendientes de sourcing. Lo corre `cargar.mjs`; `audit.js` da P1 si queda viejo.
- 57 listas de liga nuevas (Argentina 2009-2026, Bundesliga, LaLiga…) con `tools/listas-lote.mjs`, y posiciones finales en 272 liga-años.
- To-do 270: estimados de años faltantes por interpolación simple, publicados en `data/estimados/` (439 club-años, 18-25% de error
  medido); club nuevo apagado.
- Rusia corregida en club-leagues (Dynamo Makhachkala y 58 claves repetidas).
- TODO: fuera el 266; el 270 queda reducido a "club nuevo"; nuevos 275 a 279.

## Versión 713 — To-dos 273 y 274 (2026-10-18)

- TODO: 273 (estadio y sponsor de cada ejercicio) y 274 (consolidado de ingresos por categoría de cada liga), con su lugar en el ORDEN.

## Versión 712 — Merge de pantallas: Inicio, Ligas, Finanzas, "Estás viendo" y el estado en la URL (2026-10-17)

Sesión en el worktree `fos-pantallas`, mockups aprobados en el artifact de Design "Pantallas FoS". Merge a mano: la tool frenó por el
`<title>` (conflicto real); en index.html ganó la rama, lo generado se resolvió con main y se regeneró; ASSET_V 1249.

- Inicio rediseñado (to-do 267): qué es el sitio y el buscador como acción principal, rankings del mundo y de América y tarjetas de liga
  con barras horizontales, sin Chart.js. `tools/generate-rankings.js` escribe además `data/rankings/_regiones.js` (RANKINGS_REGION y
  RANKINGS_INDICE), controlado por `--check` y `audit.js`.
- Header del teléfono en una fila (56 px, antes 164): logo, lupa y un botón con la sección actual que abre el menú.
- Ligas rediseñada (to-do 264): estado frío con buscador, regiones y una fila por país; la liga con ranking de barras, composición apilada
  y simulador en tarjetas; banderas en vez de códigos de país.
- Finanzas más fácil de usar (to-do 265): "Cambiar de club" junto al título, guía de una línea, la vista en palabras y "Más opciones"
  (moneda, inflación y formato; la moneda salió del header), aviso compacto, KPI "Intereses y otros", índice fijo de la página.
- "Estás viendo" (to-do 269): sin botón del club en el header (va "Buscar un club o una liga", Ctrl/Cmd K) y sin la pestaña Fuentes.
- El estado en la URL (to-do 240): pestaña, club, años, liga y ejercicio; se lee al abrir y con "atrás".
- Título de la página sin el slogan viejo. `tools/worktree.mjs preparar` no enlaza carpetas que git lista enteras.
- TODO: borrados 240, 264, 265, 267 y 269; nuevos 271 (moneda, inflación, formato y Comparar en la URL) y 272 (cartel de primera visita
  sin uso); el 254 suma revisar "Más opciones" con métricas.

## Versión 711 — Mi Cuenta avisa cuando Supabase no contesta (2026-10-17)

- Mi Cuenta (to-do 268): el proyecto de Supabase se pausó solo el 2026-10-05 (plan gratis, 7 días sin uso) y hoy está prendido de nuevo.
  Si al abrir la pestaña el login no contesta, la librería no cargó o leer las búsquedas da error de red o 5xx, se esconde el botón y se
  muestra "Mi Cuenta no está disponible por ahora" (js/cuenta.js, textos en index.html y data/lang/en.js). El chequeo corre solo al abrir
  la pestaña. Probado en el preview con Supabase prendido y con la caída simulada (540 y error de red). ASSET_V 1231.
- Ping de Supabase: función ping() (tools/supabase/ping.sql, la pegó Guido; medido 404 -> "ok") y Worker de Cloudflare fos-supabase-ping
  con cron `0 12 */3 * *` (tools/supabase/ping-worker.mjs), aparte del Worker del buscador.
- Puente stats() (tools/supabase/stats.sql): usuarios, búsquedas, favoritas, últimas fechas y altas y búsquedas por día, solo cantidades;
  `node tools/supabase/stats.mjs [--json archivo]`. Medido: 1 usuario, 5 búsquedas. tools/cloudflare-visitas.mjs lee las visitas de Web
  Analytics (sin probar: falta un token válido).
- Dashboard "Usuarios y visitas de financeofsports" (artifact de Claude, tipo Dashboard): visitas de los últimos 30 días (unas 90, en 7 días;
  Cloudflare muestrea de a 10), visitas por semana, países, y Mi Cuenta (1 usuario, 5 búsquedas). tools/cloudflare-visitas.mjs probado
  y con los días sin visitas en 0.

## Versión 710 — caja-deuda.mjs: precedente contradicho, piso de caja, tabla resumen, tabla del par y 4 veces más rápido (2026-10-17)

- caja-deuda.mjs: una tabla resumen de varios años que repite el total del balance (de la tercera columna en adelante) es un desglose y sus
  filas no cuentan (to-do 260 b, idea de Guido). Y con el par corriente + no corriente en una sola tabla, las otras familias cuentan solo si
  están en esa tabla. Medido: --medir idéntico; ensayo de todos los clubes: 13 deudas más en Portugal, gratis (Benfica 2008 y 2023-2026,
  Académico de Viseu 2022, Braga 2016, Famalicão 2021, Gil Vicente 2023-2024, Leixões 2023-2024), ninguna cambia ni se pierde.
- Caja y deuda escritas (caja-deuda.mjs --club --escribir, sin API): 15 deudas en Portugal, las 13 de arriba más Benfica 2010 (216,5 M) y
  Famalicão 2024 (33,1 M), que ya pasaban la compuerta. Los años con balance sin caja ni deuda bajan de 305 a 299 de 919.
- Caja y deuda de los clubes sin año vecino (to-do 260 c): 19 ajustes `caja` / `deuda` leídos a mano en el balance, con página y línea (AVS
  2021, 2023 y 2024; Boavista 2024; Chaves 2022 y 2023; Mafra 2024; Tondela 2021; deuda de Felgueiras 2022-2024). AVS 2021 y Boavista 2024
  con deuda financiera 0 (sin financiamientos; Boavista: "Não aplicável", nota 29.2.5). Sin caja ni deuda: 299 -> 291 de 919.
- Caja y deuda de Rusia (16 clubes, 78 años) desde los códigos del balance del fisco (caja-deuda.mjs, escalón R: caja 1250, deuda 1410 +
  1510, con el balance que cuadra y un JSON vecino que confirma).
- Caja y deuda de Italia completas: 201 datos leídos en el balance por subagentes Sonnet con cita (22 clubes), comprobados contra el ensayo
  (201 de 201 iguales) y escritos club por club; 9 deudas cargadas corregidas por el criterio con socios y otros financiadores (Bologna
  2018-2025, Chievo 2015-2016, Genoa 2022-2023, Parma 2017). El esquema 2424 como escalón, medido y descartado (HALLAZGOS).
  Sin caja ni deuda: 249 -> 111 de 919.
- tools/worktree.mjs (to-do 251): `preparar` enlaza en una copia lo que git ignora (PDFs, claves, cachés); `mergear` resuelve lo generado
  con main y regenera, y frena si la rama tocó TODO / CHANGELOG / ESTADO o en un conflicto real. Probado en una copia real (tools iguales)
  y en un clon (ASSET_V distinto, TODO editado, conflicto en una tool). Skill de arranque: worktree.md y su fila.
- TODO: to-dos 264 a 270 (Ligas, Finanzas, Inicio, "Estás viendo", mi cuenta / Supabase, faltantes por liga para sourcing, modelo de
  estimación); tanda E de pantallas.
- Caja y deuda del resto del sitio: 320 datos leídos en el balance por 7 subagentes Sonnet con cita (Portugal, Grecia, Brasil, Alemania,
  Dinamarca, Chile, Colombia, Croacia), cotejados con el ensayo y escritos club por club. Istra, Werder y HSV con grossDebt / cash en su
  fiscalYearMeta. Sin caja ni deuda: 111 -> 27 de 919 (lo que falta, por el documento: to-do 260). To-do 263 (ajuste por PDF y año).
- fetch-club-league-reference.mjs: escalón "tabla limpia" (si la tabla elegida tiene nombres que no están en ninguna otra, como técnicos o
  estadios, se pasa a una sin sueltos que suma los clubes que faltaban) y --comparar (to-do 165 b2). Medido en las 262 temporadas de la
  caché: cambia solo Portugal 2025 (entran Casa Pia, Estoril, Nacional y Santa Clara; salen 4 técnicos), 0 errores.
- lote.mjs: "ya en el sitio" toma el año del ajuste `anio` si el documento lo tiene, no el de una propuesta vieja (to-do 239, el caso de
  Sporting 2001). Medido: ensayo de la prueba completa idéntico (hoy los 24 ajustes `anio` coinciden con su propuesta); con 2000 cargado y
  2001 no, Sporting 2001 ya no se saltea.
- Caja y deuda de los 7 clubes revertidos por escala (to-do 260 e): 51 propuestas revisadas contra el .md (subagentes Sonnet, un caso por
  grupo comprobado a mano); 24 bien (Torino, Inter, Sassuolo, Ferroviária y 5 de Lazio) y 27 mal, cargadas con 29 ajustes citados (Lazio:
  caja del consolidado, no del separado; 2000 en liras; Milan 2009-2010 del consolidado, no de la capogruppo; deuda italiana con altri
  finanziatori, obbligazioni y soci). Criterio nuevo (Guido): los préstamos de socios cuentan como deuda. Sin caja ni deuda: 291 -> 249.
- caja-deuda.mjs: dos expresiones que retrocedían (renglón de texto con cifras) pasan a recorridos lineales con la misma respuesta (0
  distintos en las 3.454 transcripciones). --medir 32 s -> 8,7 s; un club grande (Benfica) 4,2 -> 1,5 s.

- caja-deuda.mjs y audit.js: piso de caja, 7e-5 veces los ingresos del año (una tabla en miles leída en unidades), por el mismo camino que
  el techo y como P1 caja-deuda-desproporcionada (to-do 260 a). Medido: --medir idéntico; en el ensayo de todos los clubes solo Milan 2008
  (0,0048 M) y Lazio 2001 (0,51 M ITL) dejan de proponerse; audit sin avisos nuevos.

- caja-deuda.mjs: las familias que aprende el escalón 0 se prueban en los otros años cargados del club; si todos los que las tienen dan
  otra cosa, son una casualidad y no se usan (to-do 260 a y b). Medido: --medir deuda 136 -> 142 iguales y 14 -> 9 distintos, caja 354 ->
  356 iguales y 8 -> 5 distintos, ningún distinto nuevo; en el ensayo de Portugal dejan de proponerse la deuda de Benfica 2023, 2025 y
  2026 (activos tangibles + FSE) y la caja de Porto 2022 y 2023 (pensiones + resultado); fuera de Portugal, ensayo idéntico. Bahia 2025
  (sin otro año donde probar) a HALLAZGOS.

## Versión 709 — Reino Unido: 93 transcripciones por subagentes (2026-10-16)

- 93 PDFs de Inglaterra y Escocia transcriptos a .md por subagentes de Claude: Tesseract (`ocr.sh`) más revisión de las páginas clave
  contra la imagen, con P&L y balance controlados. Todos dan 0 P1 / 0 P2 en `check-transcripcion-fidelidad.js`. Clubes: Arsenal, Aston
  Villa, Bournemouth, Brentford, Brighton, Burnley, Chelsea, Crystal Palace, Everton, Fulham, Leeds, Liverpool, Man City, Newcastle,
  Nottingham Forest, Sunderland, Tottenham, West Ham, Wolves, Celtic, las escuderías de F1, cricket (Lancashire, Surrey, Warwickshire,
  Yorkshire) y rugby (Bath, Harlequins, Leicester, Northampton).
- La cola, los scripts y las instrucciones para seguir están en `Admin/transcripcion-subagentes/` (README.md); lo pendiente, en el to-do 261.
- 15 más con subagentes Sonnet (Newcastle, Chelsea, Man City, Brentford, Northampton, Tottenham, Celtic, Brighton, Sunderland y Wolves,
  2018-19 a 2021-22): 108 en total, todos 0 P1 / 0 P2. Sonnet costó ~120-250k tokens por documento, contra ~150-350k de Opus.

## Versión 708 — to-do 237 terminado (salvo al), caja y deuda en todo el sitio salvo Rusia, Plan ordenado por dependencias (2026-10-16/17)

- cargar.mjs y cola.mjs: un `aceptar` de otro año del club vale (y cierra casos) solo con la misma propuesta; si no, la fila va a la
  cola con su propuesta y la nota de lo aceptado (ad). Medido: 12 filas de 11 años ya publicados pasan a la cola; ninguna cambia sola.
- cargar.mjs: "Outros" (y Otros, Others, Altri...) con la genérica de su lado se carga sin preguntar si el renglón que la abre no dice
  otra categoría (n). Medido: con la cola real, 7 filas de 4 documentos dejan la cola con la misma categoría; con la cola vacía, 24.
- cargar.mjs: si no cierra el resultado, una respuesta de la cola del otro lado se prueba mudando la fila sin cambiar su efecto (f).
  Medido: 733 idénticos; sin sus ajustes `categoria`, Nacional 2024 y 2025, Benfica 2006-07 y Sporting 2001 y 2003-04 cargan igual.
- cargar-lote.mjs: revertir un alta borra también los archivos nuevos que dejó en data/ y fuentes/ (d).
- cargar-lote.mjs: antes de decidir un alta, recalcula el registro de altas de ese club (alta-club.mjs --todos --solo, gratis) (t).
- audit.js: `escala-implausible` baja a P3 si otro ejercicio del club a 2 años o menos está en la banda y a menos de 20× (e). Medido:
  Alverca 2022 y Novorizontino 2015 pasan a P3 (salen sus entradas de audit-ignore); destraba Felgueiras 2021-22 (respondida su fila
  "Outros gastos" de personal como wages_squad).
- cargar.mjs: el ejercicio de transición por cambio de cierre (11 meses que encadenan con el cierre anterior y el siguiente) se carga con
  nota pública (ab). Medido: solo cambia Benfica 2007-08 (deja de frenar por período).
- periodo.mjs: en un anual por descarte, el par de encabezado (f | f un año antes) le gana a la fecha más citada si esa no sale de una frase
  de período (a + ac). Medido en 3.346 .md: cambian 10, todos bien (4 coinciden con ajustes `cierre` existentes; Gorica 2021 deja de frenar
  por período); las 4 regresiones del prototipo no aparecen. Carga y antes-de-localizar idénticos.
- verificar.mjs: la duda del cuadro de inventarios se cierra sola si la identidad da exacta y la carga no usa el cuadro (v). Medido: 375
  idénticos; con la cola vacía, 7 dudas menos (todas con la respuesta que ya tenían). o (escala por el año anterior) a HALLAZGOS: 2 de 12
  respuestas la contradecían.
- verificar.mjs: el chequeo del año vecino compara un documento en moneda legado (ajuste `moneda` con `euroFijo`) con uno en euros a la
  paridad fija (paridad PTE). Medido: 384 de 385 idénticos; Sporting 2001 pasa a OK (6.419,453 M PTE / 200,482 = 32,02 M EUR, como 2002).
- Sporting 2001: ajustes anio, cierre, moneda PTE y fx (PTE@2001-07-31 en FX_CLOSE); cargado con el lote 88. TODO 239 (el lote saltea por
  una propuesta vieja aunque haya ajuste anio).
- lote.mjs, cargar-lote.mjs y pipeline.mjs: texto nuevo de la terminal, aprobado por Guido (pasos 1/5 a 5/5, "Aviso (no frena)", ensayo con
  el costo total, la cola sin pedirle nada a Guido) (r). Solo salida.
- vocabulario.mjs: "Caixa e depósitos bancários" como caja en portugués (caja y deuda, mejora 1). Medido: --medir +1 igual, 0 distintos
  nuevos; en Portugal los escalones gratis completan 93 de 327 datos vacíos (antes 28).
- caja-deuda.mjs: la deuda partida en corriente y no corriente se reconoce también por los títulos de sección del pasivo (mejora 2).
  Medido: --medir idéntico; en Portugal, 23 deudas más gratis (116 de 327); revisadas Arouca 2022, Académica 2022 y Gil Vicente 2021.
- Caja y deuda de Portugal (caja-deuda.mjs --ejecutar --escribir en los 33 clubes): 151 de 327 datos; Portugal pasa de 3 a 117 años con
  caja y de 0 a 37 con deuda. Porto 2016-2019: caja corregida con ajustes `caja` (Jev había leído miles como euros). Mejoras vistas: TODO 260.
- caja-deuda.mjs: si una familia está en varias tablas y hay una sola tabla con el total del balance, cuentan las filas de esa (deuda,
  mejora 1). Medido: --medir +1 deuda y +2 cajas iguales, 0 distintos nuevos (una primera versión daba mal Botafogo 2025: corregida);
  Portugal +3 deudas (Gil Vicente 2025, Vitória 2024 y 2025).
- caja-deuda.mjs: "Total do passivo não corrente" como divisor del par corriente + no corriente, y la propuesta no mezcla tablas (deuda,
  mejora 2). Medido: --medir idéntico; Portugal +8 deudas de Benfica (2009-2022), ninguna perdida; sin la compuerta de la misma tabla
  salían mal Benfica 2023, 2025 y 2026 (desglose de una tabla resumen sumado al balance).
- Caja y deuda, mejora 3 (vecino por valor) a HALLAZGOS: abierta confirmaba errores (Palmeiras 2024, Sporting 2007) y restringida no ganaba
  casos; el caso que la motivó (AVS) es una celda de notas "3;8;9;21;" leída como importe (TODO 260 d).
- Caja y deuda: 11 deudas y 1 caja más en Portugal con las mejoras 1 y 2 (gratis).
- Caja y deuda del resto (72 clubes salvo Portugal y Rusia): 112 datos escritos en 22 clubes; 7 clubes revertidos por errores de escala que
  la compuerta dejó pasar (TODO 260 e). En todo el sitio, los años con balance sin caja ni deuda bajan de 548 a 317 de 919.
- audit.js y caja-deuda.mjs: techo de caja (3 veces los ingresos del año) y deuda (20 veces) — P1 caja-deuda-desproporcionada y la
  compuerta prueba otras escalas o no pasa (TODO 260 e). Medido: lo cargado sin cambios; --medir un distinto menos (Flamengo 2024).
- caja-deuda.mjs: una lista de notas con ";" no es importe, y el precedente de deuda toma el par corriente + no corriente (TODO 260 d).
  Medido: --medir 4 distintos menos (20 -> 16), ninguno nuevo; Portugal +7 datos (Rio Ave 2024-2025, Santa Clara 2025, Vitória).
- caja-deuda.mjs: lista de notas con punto ("3.7.; 4.") no es importe, y "la caja es una parte de la nota" no vale con un total del balance
  (TODO 260 c). Destraba Famalicão (12 datos); encontró 6 cajas cargadas mal (eran el total del activo corriente): se corrigen.
- Caja y deuda: 13 cajas corregidas (eran el total del activo corriente) y deudas de Sporting 2000 y 2002-2007 vaciadas (par del POC
  incompleto o escala); TODO 260 f para el formato POC.
- caja-deuda.mjs y vocabulario.mjs: títulos de sección del POC y "Dívidas a Instituições de Crédito" como deuda (TODO 260 f). Sporting
  2000-2008: deuda con ajustes `deuda` (el par de cada balance); 2006-07, transcripción corregida contra el PDF (pág. 18: "Dívidas a
  Instituições de Crédito 2 364", decía "Fornecedores, Conta Corrente 2 064").
- TODO: bloque ORDEN reemplazado por el plan ordenado en tandas A-G según dependencias (to-dos 239-260 incluidos).
- Lotes 86 y 87: Felgueiras 2021-22 y Benfica 2007-08 cargados; caja de Felgueiras 2022-2024. Listas 80, 86 y 87 al archivo.

## Versión 707 — Portugal cargado (salvo lo que espera scripts) y to-do 237 a medias: 14 letras resueltas y medidas (2026-10-16)

- Lotes 82 a 85: unos 40 años nuevos de Portugal (Gil Vicente, Portimonense, Vizela, Chaves, Marítimo 2021-2024, Académica, Felgueiras
  2023, Paços 2022, Nacional 2025, AVS 2021-2024 con su alta, Casa Pia 2022-2024, Benfica 2006-2007, Sporting 2000 y 2002-2008, 2018 y
  2021). Sporting 2000 en escudos (PTE, moneda legado con paridad fija); Sporting 2002-2007 con TV y taquilla desde el cuadro de gestión
  (45 ajustes `fila`, suma exacta). Colas contestadas con subagentes Sonnet y un criterio común de Portugal.
- verificar.mjs: escalones "acumulados" (totales (A)-(G) del POC), q1/q2 (filas sin lado), lado de las filas del financiero dentro de
  ingresos o gastos (w), pérdida impresa sin signo (am), vecino sin descartados (l); no reescribe un .rubros.json igual (an).
- lote.mjs: re-verifica si la cola tiene respuestas más nuevas (af, s); rehace validar o extraer si están viejos (ai, ak, cache-al-dia.mjs).
- audit.js: "Diferencia de redondeo" no es línea duplicada (aa). vocabulario.mjs: juros SNC (k).
- verificar.mjs: un número confirmado a mano no vuelve a la cola (z). cargar.mjs: un incluye sobre una de las tres del estadio alcanza (g).
- Medición: lotes de prueba actualizados (rápida 44, mediana 118, completa 358), tools/medir-verificar.mjs nuevo, medir-cargar.mjs en
  paralelo (7:16 -> 1:35 min). Lo que falta del 237, con el diseño de cada letra, en el TODO.

## Versión 706 — Portugal: lotes 79 a 82 (más de 75 años cargados, 26 clubes nuevos); lote.mjs saltea lo cargado; perfil de SAD (2026-10-16)

- Lote 79: Sporting, Porto, Braga, Benfica, Boavista y Santa Clara con su primer año. Lote 80: 46 años más de esos clubes. Lote 81:
  Famalicão 2019-2025, Nacional 2023, Estrela 2022 y altas de 16 clubes (Belenenses, Estoril, Vizela, Académico Viseu, Académica,
  Arouca, Chaves, Felgueiras, Gil Vicente, Leixões, Marítimo, Oliveirense, Paços, Portimonense, Torreense, União de Leiria).
  Lote 82: el resto de los años de esos clubes (ver ESTADO-clubes). La cola la contestaron subagentes Sonnet con revisión de las
  correcciones grandes; .md corregidos donde el escaneo leyó mal (Santa Clara 2024-25, AVS 2023-24, Casa Pia 2024-25, Paços 2019-20).
- lote.mjs: un documento cuyo año ya está en el sitio no pasa por verificar, categorizar ni la propuesta de carga (to-do 237 ag);
  tabla final "ETAPA · #". cargar.mjs: en Portugal, SAD/SDUQ en la portada = cuotas y otras secciones en 0 reales en ese documento,
  sin tocar el perfil del club (237 y; medido: 7 de 677 documentos cambian, solo pierden la pregunta de perfil).
- Regla (CONVENCIONES-DATOS): el ejercicio de 11 meses por cambio de cierre se carga (decisión de Guido); falta el escalón 237 ab.
- TODO 237: letras t a al (mejoras vistas en los lotes 79-82); 237 af con el contexto para encontrar la causa (arreglo directo
  revertido por riesgo).

## Versión 705 — Portugal transcripto y lote 77; Bélgica, Suiza y Beşiktaş transcriptos por subagentes (2026-10-15)

- Portugal: 159 transcripciones (etapa 2) validadas; 26 altas confirmadas contra los .md por subagentes Sonnet (nombre legal, color) en
  altas-revision; 18 cierres y el perímetro de Benfica (consolidado 2009-2019) y Boavista como ajustes; descartados y parciales con el
  ok de Guido (Feirense, Chaves club, União de Leiria 2024-25, Gil Vicente consolidado 2025, Boavista partes 2-3, Estrela 2023-24).
- Lote 77 (144 documentos, ~US$ 55): cargó Estrela da Amadora 2022-23 (alta); 617 casos de Portugal en la cola. Contestados por
  subagentes la cola de Sporting, Porto, Braga y Santa Clara y 47 nombres legales de altas (Portugal y otros 11 países). Lote 78
  (Benfica 2018-19 y Boavista) frenó en 5 casos, ya contestados; lote 79 listo para reintentar.
- Transcripción por subagentes: Bélgica (61), Suiza (42: St. Gallen, FC St. Gallen, Aarau, Thun, Luzern, Grasshopper, Basel, Young
  Boys) y Beşiktaş (13). Regla nueva en reglas.md: cada subagente usa su propia subcarpeta del scratchpad.
- Skill club-or-year-onboarding: un club nuevo entra al lote con un solo ejercicio. TODO: orden de Guido arriba de todo, 237 m-r
  (preguntas repetidas en la cola, perímetro con ajuste, subtotales de Sporting, copy de la terminal) y 238 (estados intermedios).
- lote.mjs: se saca el aviso viejo "el proceso nuevo se refina de a 5".

## Versión 704 — Estonia transcripta con subagentes; altas de Portugal en borrador (2026-10-15)

- Estonia: 66 informes anuales (10 clubes, 2019-2025) transcriptos por subagentes Sonnet desde pdftotext, con el chequeo de fidelidad y
  un comparador de números contra el texto del PDF (Admin/transcripcion-subagentes/). Sin gasto de API.
- Portugal: borradores de alta de 27 clubes (nombre legal, cierres, color, liga por temporada) en el scratchpad, a confirmar contra los
  .md; caché de ligas de Portugal 1999-2026 (1.ª, 2.ª y Liga 3) y la Primeira Liga 2024-25 corregida a mano (el script había tomado la
  tabla de cambios de técnico).

## Versión 703 — Portugal, lote 76 cerrado: 24 años en el sitio; regla de entidad cuando el fútbol está en una SAD (2026-10-15)

- Nuevos en el sitio: Alverca 2024-2025, Famalicão 2022 (alta), Moreirense 2023-2024, Rio Ave 2016 y 2024, Tondela 2021 (alta) y
  Vitória Guimarães 2021, 2022, 2024 y 2025 (alta). Recargados: Alverca 2023 (venta de jugadores 694.020,93 abierta con la nota del
  documento 2023-24) y Vitória Guimarães 2024 (venta de jugadores a player_sales). Lote 76 archivado.
- Correcciones por ajuste: Alverca 2024, dos cifras del estado mal leídas por el OCR (Outros rendimentos y Outros gastos, 100.000 de
  diferencia) y "Outros rendimentos" abierto con su nota; Rio Ave 2024, reversiones de imparidad sin signo y financiero neto (el .md
  perdió los signos); Moreirense 2023, reversiones de imparidad y provisiones fuera de ingresos; Vitória Guimarães 2022 SAD, "Vendas e
  serviços prestados" reemplazado por sus seis partes de la nota 16.
- `alta-club.mjs` (to-do 237 m): los documentos descartados o parciales no cuentan como hermanos del documento base (medido: de 844
  carpetas cambia solo Tondela). To-do 237 i-l: mejoras vistas en las corridas.
- Regla nueva en CONVENCIONES-DATOS: qué entidad se carga cuando el fútbol está en una sociedad aparte (decisión de Guido). 42
  documentos de Portugal a documentos-descartados (otra entidad, duplicados, versiones previas a la asamblea, comunicados, presupuestos).
  Lista de transcripción del resto de Portugal: Admin/lotes/transcribir-portugal.txt.

## Versión 702 — Portugal, lote 76: primeros 12 años en el sitio (2026-10-15)

- Altas: Rio Ave (2017-2020, 2022, 2023, 2025), Alverca (2022-2023), Nacional (2024), Moreirense (2022, 2025). Colas de verificación,
  categorías y perfil contestadas por subagentes Sonnet (~200 casos), correcciones grandes revisadas contra el documento.
- Correcciones por ajuste: Moreirense 2022/2025 y Vitória Guimarães 2022 SAD, la venta de jugadores del formato SNC ("Rendimentos em
  investimentos não financeiros" / "e ganhos em investimentos") a player_sales; Famalicão 2022 "Outros rendimentos" (plusvalía de tres
  jugadores) a player_sales; Nacional 2024 "Correções relativas a períodos anteriores" (la respuesta de la cola cambiaba el signo);
  Moreirense, el estadio dentro de "Outros" (`incluye`); Alverca 2022-23, el cierre (había tomado la fecha de firma); Vitória Guimarães
  2022 SAD, "Prestação de serviços" abierta en sus cinco sub-rubricas (TV 6,92 M). Alverca 2022 (152.299,54 €, tercera división)
  silenciado como verificado en audit-ignore.json. Rio Ave 2016-17 con el reparto del estado; pregunta al club en dudas-por-club.
- To-do 237 (mejoras de script del lote 76, a-h). Los "conocido, sin daño hoy" pasaron del TODO a HALLAZGOS-pipeline.md (regla de la
  skill de onboarding cambiada con el ok de Guido). Memoria revisada: 16 -> 12.

## Versión 701 — 232 aa: perfil de OFI, Levadiakos y Paysandu (2026-10-15)

- Los 14 casos de perfil de años ya cargados se cerraron contestándolos (subagente Sonnet, citas verificadas), no con un escalón de script:
  la pregunta es del club y `cargar.mjs` ya no la levanta para años con el ingreso sin desglosar. OFI y Levadiakos: ΠΑΕ, socios no y
  otros deportes no; Paysandu: socios sí (Sócio Torcedor y Proprietário) y otros deportes sí (Esportes Olímpicos). Ningún dato publicado cambia.

## Versión 700 — To-do 236 cerrado: pipeline revisado (2026-10-15)

- a) `cargar.mjs --reemplazar`: escalón 1, `data/` (el repo local) ya tiene el año aunque el registro esté viejo. Medido en 570 documentos:
  AEK 2016 pasa; nada más cambia; 361 de 375 años publicados se reproducen exacto.
- b) `gestiones-tanda.mjs` lee el club de los casos "club:año".
- c) Fortaleza CEIF 2020 recargado: "Sena" (21,881 M COP, Gastos Laborales de administración) a wages_squad como el resto de su bloque y
  la respuesta de 2017; mismo resultado. Goiás 2017: ajuste `categoria` para "Despesa com pessoal" (lo publicado no cambia).
- d) PIPELINE.md, la skill club-or-year-onboarding (texto aprobado por Guido) y las cabeceras de `cargar.mjs` y `caja-deuda.mjs` al día con
  el código (los puntos de la Versión 699). Quedan en PIPELINE.md las notas de medición históricas dentro de los escalones de la etapa 6.

## Versión 699 — Tie-out con el redondeo impreso; medición del pipeline (to-do 236) (2026-10-15)

- `toleranciaTieOut()` (js/finanzas-calc.js), la usan verifyTieOuts y audit.js: n renglones x media unidad impresa, mínimo 0,01. Los 3 "no
  cierra" de Bayern por 0,1 desaparecen y se sacan de audit-ignore.json; ningún otro chequeo cambia (auditAll: 2.117 cierran, 0 no). ASSET_V 963.
- `tools/medir-cargar.mjs --contra-sitio`. Medido: 360 de 375 años publicados con el mismo documento se reproducen exacto; distintos Goiás
  2017 (protegido con un ajuste `categoria`: "Despesa com pessoal" de la nota del fútbol a wages_squad), Fortaleza CEIF 2020 ("Sena", decisión
  de criterio) y Parma 2016 (0,001); 12 frenan por motivos conocidos. Registro de Grecia regenerado (21 años figuraban como no cargados).
- Revisión de PIPELINE.md y la skill contra el código (subagente, solo lectura): Estadio en 0 eximido en 2021 por el código y no por el
  documento; 7a/7b se aplican antes de materialidad (el documento dice después) y la etiqueta exacta del mismo club vale para todas las filas;
  "etiqueta repetida" descrita dos veces (etapa 7 y escaleras chicas); la skill pide fijar el perímetro a mano y el lote ya lo fija por
  señales (y la Decisión 7 choca con CONVENCIONES-DATOS); caja-deuda: el escalón 1b Jev está en "lectura de filas", falta en la escalera,
  y también cuesta API (skill y cabecera de caja-deuda.mjs dicen que solo el 2); el ajuste manual no pasa por la compuerta y la trampa del
  cero sí (en todos los escalones); la cascada de chequeos-gratis.mjs no está descrita; listo-para-jev con 1-4 rubros pide el resultado
  cerrado; reglas de propagación de la cola en tres lugares; contadores fijos (12.184 PDFs, 21 monedas, 241 años, perfiles); la cabecera de
  cargar.mjs dice que un total que cierra por redondeo frena (no frena) y que el escalón B pide 2 clubes (pide 1); la skill no menciona
  documentos-parciales.txt. Bug: gestiones-tanda.mjs no lee los casos "club:año". Nada de esto se corrigió: espera el ok de Guido (to-do 236).

## Versión 698 — Cifras imposibles del OCR, deuda y caja sin dato en pantalla, medir-cargar (2026-10-15)

- 232 ad: medido que ninguna de las 2.242 cifras con forma imposible ("13.950,790,99") de 155 transcripciones llegó a un dato publicado.
  `chequeos-gratis.mjs`: una cifra así no se valida gratis (el texto del PDF compara solo dígitos y la tolerancia de 3 cifras la dejaba
  pasar; Ceará 2019 pág. 36); `formaImposible` compartida en `verify-numbers.mjs` (también la usa `caja-deuda.mjs`). Medido: 32 páginas
  más a la validación paga en esas transcripciones; en `--prueba`, 1 página más y el mismo recall (1168/1168). Solo hacia adelante.
- 235: deuda o caja sin dato se muestra "—" y sin las dos no hay deuda neta, en la ficha, el KPI, el multiaño, Comparar gestiones y el
  selector (`deudaNoDesglosada()` y `filaDeuda()`); textos del aviso en castellano e inglés. Argentinos 2019 mostraba caja 0 y deuda
  neta igual a la bruta. Un 0 impreso de uno solo sigue (Sunderland 2024). ASSET_V 962. `auditAll()`: 2.114 cierran, 3 de Bayern por
  redondeo (ya documentados).
- `tools/medir-cargar.mjs`: el ensayo de `cargar.mjs` en todos los documentos con la cola en una copia, y la comparación antes/después.
- To-do 236 nuevo: revisar el pipeline de punta a punta después de los cambios del 232 y el 234.

## Versión 697 — PAOK y Olympiacos rehechos con la pregunta por renglón; deuda y caja 0/0 a null (2026-10-15)

- To-do 234. PAOK 2017 y 2019-2025: personal, honorarios y servicios de terceros de administración y comercialización a
  admin_general_expense (antes wages_squad), y sus amortizaciones (0,24-0,28 M por año) a depreciation (antes player_amortisation); 18 casos
  de la cola de 2017 contestados por subagente Sonnet, los otros años los cerró la familia. 2020 sin cambios (sin desglose).
- Olympiacos 2016-2025: las cargas sociales de los otros empleados (0,8-1,23 M por año) a admin_general_expense; wages_squad queda igual al
  total impreso del cuadro de jugadores. Mismo resultado neto en los 18 años, auditoría P0 0 / P1 0.
- `cargar.mjs`, etiqueta repetida: los renglones se separan por título exacto (no por palabras en común, que juntaban "Δαπάνη παροχών
  ποδοσφαιριστών" con "... λοιπών εργαζομένων") y la categoría del renglón tiene un escalón nuevo (la de sus otras filas, si coinciden).
  Medido con el ensayo de cargar en 570 documentos: 25 preguntas nuevas en 11, nada cambia sin pregunta. Además de Olympiacos, pregunta
  Ferroviária 2016 ("Alimentação" y "Serviços Prestados por Terceiros" en costos operativos y en administración) si se recarga.
- 232 ab: deuda y caja de 0 a null en 24 años de la convención vieja (Once Caldas 2022-2025, Racing 2019/2026/2027, Boca 2027, Boyacá
  Chicó 2024, Club América 2025, Midtjylland 2019, Brøndby 2020, FC København 2024, Mirassol 2024, 10 japoneses 2025) y la caja de
  Argentinos 2019, cada uno con una línea en su evidencia. Panetolikos 2021 (deuda 0 real, caja 339.471) y Sunderland 2024 (caja 0 impresa)
  quedan. To-do 235 nuevo: el sitio muestra 0 cuando falta uno solo de los dos.
- El registro de transcripciones tenía los años de PAOK como no cargados (`--reemplazar` no se activaba): regenerado con
  `inventario-transcripciones.mjs --solo`.

## Versión 696 — Tanda de gestiones de la cola (2026-10-15)

- `tanda-2026-10-14-2` corrida con 10 subagentes y cargada con `tools/gestiones-tanda.mjs`: 12 gestiones confirmadas (Criciúma, Ferroviária,
  Goiás, Paysandu, Vila Nova, Fortaleza CEIF, Volos), 22 casos de la cola contestados. Barato (Fortaleza CEIF) termina el 2024-12-31 y
  Freitas (Criciúma) empieza el 2021-01-01, para que ningún cierre tenga dos presidentes. Sin cubrir (a dudas-por-club): CRB 2020, Cuiabá
  2022-2025, Vila Nova 2014, Ferroviária 2010-2013 y 2023, Goiás 2010-2013 y 2017, OFI 2018.

## Versión 695 — Mejoras de script del to-do 232, Jev en caja y deuda, dato "personal" (2026-10-14/15)

- Arreglos chicos: `perimetro-senales.mjs` no escribe en carpetas que se publican; `alta-club.mjs --todos` deja en faltan-datos una carpeta
  con todo descartado o parcial; `cargar.mjs --escribir` imprime el `git add`; `lote.mjs` avisa un documento en dos listas activas y un año
  del club que queda afuera; `quien.mjs` marca `clubDeCarpeta`; una respuesta de perfil o de categoría cierra los casos iguales del club;
  perfil por forma jurídica ΠΑΕ con la cita de la portada; `cargar.mjs` frena con su nombre una fila impresa sin categorizar.
- Escalones: `periodo.mjs` detecta un primer ejercicio corto; el primer ejercicio de una sociedad nueva se carga (Kifisia 2022, nota en Volos
  2019); `verificar.mjs` reconoce una presentación distinta en el año vecino; una etiqueta bajo dos renglones de categoría distinta se decide
  por renglón (`mismoPadre` lee griego y cirílico).
- `caja-deuda.mjs`: columnas de nota sin el encabezado, columnas por perímetro (Olympiacos), trampa del cero, cifras con forma imposible,
  Jev como escalón 1b. Errores del sitio corregidos: Colo-Colo 2022-2024 (0/0 -> null), PAOK 2021 y Panetolikos 2022 (deuda), AEK 2025 (caja).
- Dato "personal" (`staffCost`, `--personal`, `--partir`) y chequeo `sueldos-escondidos` en `audit.js`; Panetolikos 2021-2025 con los
  sueldos separados de "Κόστος πωλήσεων". `cargar.mjs --reemplazar` conserva `staffCost`.
- `tools/gestiones-tanda.mjs` (61 casos ya cubiertos cerrados, tanda de 10 clubes armada). Medidos y descartados: recortar el texto de
  perimetro-a2; los colores griegos (footylogos no tiene la liga). Lotes 66 y 67 archivados. To-dos nuevos: 232 z, aa, ab, ac, ad.

## Versión 694 — Grecia cerrada; escalones de cargar-lote y caja-deuda (2026-10-14)

- Gestiones de Aris, Atromitos, Kifisia, Panetolikos, PAOK y Olympiacos (tanda `Admin/gestiones-por-pais/tanda-2026-10-14/`); criterio
  griego nuevo: dueño que no conduce -> el presidente que firma.
- Lote 71 vuelto a correr con su cola contestada: altas de Olympiacos, PAOK, Aris, Atromitos, Panetolikos y Kifisia (36 años); después, a
  mano o con tokens de sesión, Olympiacos 2019/2021/2023, Kifisia 2023, Panetolikos 2023-2025 (lote 75 sin API), Aris 2022 (filas armadas
  a mano, `filas-a-mano`) y AEK 2024. Venta de jugadores de Olympiacos como la presenta cada documento (bruto 2016-2020, neto 2021-2025).
  PAOK: "Αμοιβές τρίτων" del fútbol a wages_squad, con la pregunta al club. Athens Kallithea (balance del municipio), Atromitos 2017 (solo
  auditor) descartados; Kifisia 2022 parcial.
- `cargar-lote.mjs` saltea los documentos parciales (Kifisia 2022 se había publicado; se sacó). `caja-deuda.mjs`: una celda que no puede ser
  importe ("24.", "7.1.3") es nota (medido idéntico; +28 datos). Caja de Olympiacos corregida a la de la sociedad (ajustes `caja`).
- To-do 230: la "salida corta" de extraer se midió y no entró (HALLAZGOS). To-dos nuevos 232 (mejoras de script vistas en Grecia) y 233
  (Jev en otras etapas). To-do 231 cerrado; listas de los lotes 71, 73, 74 y 75 archivadas.

## Versión 693 — Grecia: lote 71 corrido y su cola contestada (2026-10-14)

- Transcripción de los 37 documentos de Grecia que faltaban (US$ 8,21) y lote 71 con `--ejecutar --cargar` (US$ 7,79): Aris decidió su
  perímetro solo (A2: 2019 y 2021 individuales, 2022-2025 consolidados); ningún año cargado, todo frenó en la cola.
- Cola contestada por subagentes Sonnet (71 respuestas) y revisada: Aris 2024 sin el detalle duplicado del Κέρδος, Kifisia 2025 con la
  fila de transferencias; Kifisia 2025 con su cierre. Olympiacos: perímetro individual (cola: 1 de 3 criterios), pasa al lote 74.
- To-dos nuevos 230 (ahorrar en las etapas 3 a 5) y 231 (lo que falta para cerrar Grecia: empezar la próxima sesión por ahí).

## Versión 692 — Perímetro: ajustes por documento y auditoría de A2 (to-dos 226 y 227) (2026-10-13)

- Ajustes `perimetro` individuales para Trabzonspor 2016-2020, Roma 2006 y Bologna 2024-2025 (el ajuste del club no coincidía con el
  documento; ningún número cambia). Prospecto y memorias de Trabzonspor a documentos-descartados.
- `perimetro-senales.mjs`: los ajustes que escribe nombran en su `evidencia` los documentos que decidió A2, y `--auditar-a2` arma la
  auditoría a posteriori para un subagente. Skill `auditoria-finance-of-sports`, eje `datos`: el paso que la corre por país.
- To-do 229 queda como conocido, sin daño hoy.

## Versión 691 — Revisión de los niveles de audit.js (to-do 219) (2026-10-13)

- 42 avisos P2 revisados contra la fuente con subagentes: signo-invertido 20, outlier-liga 12 y salto-interanual 4, todos esperables
  (silenciados en `tools/audit-ignore.json`, con el importe en el match); sin-salarios 6: 5 errores reales (Volos 2021-2025, sueldos de la
  nota de personal dentro de los gastos de administración; corregidos con ajustes, un commit por año) y Novorizontino 2010 (cero-real).
- `gestion-club-inexistente` pasa a P3 (gestiones de clubes sin balance todavía). P2: 180 -> 86 (queda catchall-dominante).
- To-do nuevo 229 (sueldos desde la nota de personal como escalón); Volos 2019-20 a `Admin/dudas-por-club.md`.

## Versión 690 — Deuda: la nota de la fila (to-do 228) (2026-10-13)

- `caja-deuda.mjs`: si la deuda propuesta es una fila con su nota y la nota muestra que es solo una parte (AEK: el largo plazo, con la parte
  corriente dentro de otro renglón), se propone la suma de los totales de la nota por la misma compuerta; si pasan las dos con valores
  distintos, no decide. Medido: AEK 2021 deja de leer 5.029.327 (queda vacío), AEK 2022 lee 5.190.328 (lo cargado); el resto idéntico.

## Versión 689 — Limpieza: `onboard.mjs` y `prepare-onboarding.mjs` archivados (to-do 218) (2026-10-13)

- `tools/quien.mjs` (nueva) con las dos funciones vivas de `onboard.mjs`, mismo código: `--quien` (club y año de un PDF; cargar.mjs,
  chequeos-gratis.mjs) y `--pendientes` (qué PDF no están cargados; inventario-transcripciones.mjs). `onboard.mjs` y `prepare-onboarding.mjs`
  a `tools/archivo/`. Medido: `--quien` idéntico en los 87 de prueba-completa, `--pendientes` idéntico (11.125 líneas), registro, estado y
  los ensayos de lote y cargar-lote idénticos.

## Versión 688 — El primer año de un club sin Guido: escalón 3 (to-do 214) (2026-10-13)

- `verificar.mjs` + `tools/primer-anio-ia.mjs` (nueva): cuando del primer año solo coincide el resultado, Claude revisa las líneas del
  estado contra lo que se carga (falta, sobra, repetida, lado equivocado, con cita); sin nada marcado no hay caso. `lote.mjs --ejecutar`
  contesta los pedidos pendientes y vuelve a verificar. Medido con subagentes: 38 de 39 confirmados, 1 alarma legítima (Roma 2007), 8 de 8
  errores fabricados detectados; `verificar` idéntico en `prueba-completa` salvo el primer año que ahora se confirma.

## Versión 687 — Caja y deuda con dos lecturas por fila (to-do 223) (2026-10-13)

- `caja-deuda.mjs`: cada propuesta se evalúa con la fila de siempre y sin la celda en una columna con forma de nota ("6.8"); decide la
  compuerta. La compuerta suma el documento anterior (solo a favor) y por debajo de 1.500 unidades coincidir es ser el mismo número (6,80
  "coincidía" con un 31,92%). Idéntico en todo lo cargado; AEK 2019 caja 7.935.425 y 2020 ya no 6,80. A/B contra una compuerta con votos:
  descartada (`Admin/HALLAZGOS-pipeline.md`).
- `caja-deuda.mjs`: una celda con "%" no es un importe (la fila de ratios de AEK daba 52,44 como año anterior). Idéntico en lo cargado; AEK
  queda con caja 2017-2020 (1.785.823 · 1.650.370 · 7.935.425 · 1.943.170).

## Versión 686 — Perímetro sin preguntar (to-do 225) (2026-10-13)

- `perimetro-senales.mjs`, regla del club: un ejercicio publicado con un solo perímetro se carga con ese (ajuste del documento); el del club
  sale de los votos o del único perímetro de la serie; sin votos y con los dos (Aris), uno por documento. Frena solo si los votos chocan.
  Regla escrita en `Admin/CONVENCIONES-DATOS.md`.
- Paso A2 (Claude) para documentos en idiomas que el paso A no reconoce: cinco criterios con peso (título 4, texto 4, auditor 1, grupo 1,
  portada 1; 4 o más consolidado, 0 a 2 individual) y cola si la tabla trae columnas de los dos perímetros. Medido en 75 documentos de 15
  clubes con subagentes de la sesión (`--exportar-a2`), sin API: 46 bien, 0 errores de A2.
- To-dos nuevos 226 (ajustes de perímetro que no coinciden con el documento) y 227 (auditoría a posteriori de A2).

## Versión 685 — Grecia casi completa, la cola sin Guido, escalones de notas y Covid (2026-10-13)

- Cargados Asteras 2021-2025, Panserraikos 2023 y 2025, Volos 2019-2025 y AEK 2021-2023 y 2025; cola contestada por subagentes con cita.
- `verificar.mjs`: si cerró la lectura 5 o 6, un renglón se abre en su nota cuando la nota lo suma al centavo, o a una unidad impresa con
  la diferencia como "Diferencia de redondeo" (AEK: nómina y amortización de pases por separado); totales idénticos en 237 documentos.
- `cargar.mjs`: "Estadio" en 0 en 2021 es real (Covid), sin reintento.
- Skill de onboarding: la cola la contesta un subagente; a Guido solo lo que frena un alta o un año. Skill club-nuevo: un bicolor nunca
  queda en null (si nada decide, orden alfabético en inglés). Colores: Panathinaikos verde, AEL Larissa bordó, Asteras amarillo.

## Versión 684 — Corridas más rápidas (to-do 224) (2026-10-13)

- Medido: no hacía falta una base de datos. `cola.mjs` y `ajustes.mjs` leen su registro una vez por proceso (verificar de 237 documentos
  36 s -> 3 s; propuesta de carga de 129 documentos 206 s -> 94 s) y `caja-deuda.mjs` lee los renglones de texto sin la expresión que
  explotaba (`--medir` 155 s -> 17 s). Salidas idénticas. La compilación del vocabulario quedó en HALLAZGOS.

## Versión 683 — OFI 2020 y escalón de las dudas de cuadro por naturaleza (2026-10-13)

- Lote 68: OFI 2020 desde el anexo (`OFI_notes_2020`, que trae la cuenta de resultados; no estaba en el lote 67).
- To-do 222: `verificar.mjs` decide sola la duda "¿se carga el cuadro como desglose conjunto/por naturaleza/transversal?" con una cuenta
  (una combinación exacta de renglones del estado -> sí; ninguna y la carga no usa el cuadro -> no). 7 de 7 respuestas iguales; 210
  documentos idénticos.
- To-do 221: `caja-deuda.mjs` tomaba el número de nota ("6.8") como caja en AEK. Escalón: una columna de notas de varios niveles
  (primera columna numérica, notas con punto, en orden creciente) se saca de la fila. Medido: 921 filas de 32 documentos pierden solo la
  nota, 13 renglones título quedan sin importe; `--medir` idéntico en todos los clubes.

## Versión 682 — Lote 67 (Grecia), gestiones tanda 2, primer año y cola sin Guido, limpieza de la carga (2026-10-13)

- Lote 67: Asteras 2019-2020, Levadiakos 2019-2025, OFI 2018-2025 (sin 2020) y AEK 2016-2020, con sus altas; caja y deuda de los tres
  primeros. Bug de `cargar-lote.mjs`: el segundo club nuevo de un lote salía "el alta no se escribió" (`data-clubes.js` cacheaba
  `clubs.js`); se relee si cambió, y ese camino revierte el alta.
- To-do 195: tanda 2 de gestiones cargada (26 clubes; `mx.js` y `pe.js` nuevos); la carga suma a lo ya cargado en vez de reemplazar.
- To-do 214: `verificar.mjs` no levanta "primer-anio" si lo impreso confirma lo cargado a 0,01% (los tres totales, o un total y el
  resultado con el otro sin imprimir): 29 de 77 aceptados históricos, 0 de 2 descartados.
- To-do 215: el precedente de categoría de otros clubes del país pide 1 club (decide 59, acierta 59; antes 34/34).
- To-do 218 (a, b): fuera `tieScore()` y el camino de `cargar.mjs` sin `--desde-verificacion`; `proponer-carga.mjs` archivado,
  `loadSite()`/`parseNumber()` en `tools/datos-sitio.mjs`.
- Cola sin Guido (to-do 220): AEK contestada por un subagente Sonnet con cita. To-do 219 nuevo (niveles de `audit.js`).

## Versión 681 — Gestiones, tanda 2 investigada y guardada (2026-10-13)

- 4 subagentes más (Brasil SAF con el ejecutivo, Brasil por confirmar, Rusia/Croacia/Colombia/México/Perú, Alemania con el presidente de la
  asociación) con las decisiones de criterio de Guido. Resultados y scripts de carga guardados en `Admin/gestiones-por-pais/tanda-2026-10-13/`;
  la carga queda para la sesión siguiente (to-do 195). To-do 214 al día con la decisión de Guido (el primer año ya no lo revisa él).

## Versión 680 — To-do 213: la duda de escala que otro documento del club responde se cierra sola (2026-10-13)

- `verificar.mjs`: si la carga usó unidades y otro `.md` de la carpeta del club imprime un importe del estado (6+ cifras, mismos
  decimales) pegado a su moneda, la duda de escala se cierra con la cita (OFI 2018: `OFI_board_report_2018` L20, "527.892,56€").
  Simulado en Grecia sin las respuestas de escala: 15 -> 7 abiertas; las 8 cerradas coinciden con la respuesta de Guido ("unidades").
  `prueba-completa`: idéntico. Se borra el 213.

## Versión 679 — To-do 212: el signo de cada fila del financiero por su rótulo (2026-10-13)

- `verificar.mjs`: escalón 2 de la compuerta del resultado, entre los signos en bloque exactos y la tolerancia: cada fila del financiero
  con el signo de su rótulo (listas nuevas FIN_INGRESO / FIN_GASTO en `tools/vocabulario.mjs`, 18 idiomas; un rótulo mixto como "Oneri e
  proventi finanziari" queda como está impreso), pidiendo el resultado EXACTO. Volos 2021-2025 sin sus ajustes `fila`: 2024 pasa de la cola
  a cerrar exacto y 2021 y 2025 dejan de cargar el interés cobrado como gasto (entraban por la tolerancia). Sobre los 347 documentos
  verificados: 4 cambian de lectura (Hellas Verona 2022, 2024 y 2025, Torino 2019) con lo cargado idéntico. `prueba-completa`: idéntico.
  Se borra el 212. Los ajustes `fila` de Volos quedan (escalón 0, dan lo mismo).

## Versión 678 — To-do 211 como escalón: la respuesta a una duda cierra la otra del mismo cuadro (2026-10-13)

- `verificar.mjs`: en lugar de juntar en un caso las dos dudas de un cuadro (escondía una pregunta genuina en Levadiakos 2019), las dos van
  a la cola y una se cierra sola solo cuando Guido ya contestó la otra y esa respuesta la contesta ("¿se carga?" con "¿se deja afuera?", o
  dos "¿se deja afuera?"). Simulado en Grecia con un lado de cada par sin respuesta: cierra 7 y 9 en las dos simulaciones, todas con la
  respuesta que Guido había dado; Levadiakos sigue preguntando las dos. `prueba-completa`: idéntico.

## Versión 677 — Gestiones de 48 clubes (to-do 195) (2026-10-13)

- 6 subagentes Sonnet investigaron las gestiones de los 74 clubes cargados que no tenían ninguna (Brasil, Rusia, Japón, Croacia, Alemania,
  Inglaterra, Colombia, Chile, México y Perú), con fuente por gestión. Se cargaron solo las confirmadas: 67 gestiones de 48 clubes; archivos
  nuevos `data/gestiones/ru.js` y `jp.js` (en `PAISES` de `js/finanzas-anios.js`) y su criterio en `Admin/gestiones-por-pais/`. Notas, lo no
  confirmado y las dudas, en "## Gestiones" de cada club. Quedan sin cargar los que dependen de una decisión de criterio (to-do 195). ASSET_V 827.

## Versión 676 — To-do 211: una sola pregunta por cuadro en la cola (2026-10-13)

- `verificar.mjs`: dos dudas de localizar y de extraer sobre el mismo cuadro (mismo primer bloque, que no sea el estado de resultados) van
  en un solo caso; si una ya la contestó Guido para el club, la otra se cierra con nota. Simulado sobre la cola de Grecia sin sus respuestas:
  59 -> 49 preguntas, y en 9 de los 10 pares Guido había contestado lo mismo de los dos lados (el décimo, Levadiakos 2019, son dos preguntas
  complementarias sobre el mismo cuadro). `prueba-completa`: idéntico. Cerrar sola la duda sobre un cuadro que la carga no usa: medido y
  descartado (HALLAZGOS). Se borra el 211.

## Versión 675 — To-do 210: el ensayo evalúa los clubes nuevos con un club provisional (2026-10-13)

- `cargar.mjs`: sin `--escribir`, un club que no existe ya no corta el análisis si su ficha de alta está completa: anota el freno `club`
  y sigue con un club provisional armado de la ficha. Lote 67 (Grecia): el ensayo de `cargar-lote.mjs` pasa de "21 años se escribirían"
  (y ninguno entraba) a 10, con 11 frenados por filas que esperan categoría en la cola. `prueba-completa`: idéntico. Las preguntas de los
  clubes nuevos se escriben en la cola desde el ensayo (decisión de Guido). Se borra el 210.

## Versión 674 — To-do 207: "otros negocios del club" remedido (2026-10-13)

- 214 clubes: 29 con plata en `education` u `other_sports` (13,6 %), 15 solo en `education` (7 %); sin aceleración. Informe en
  `auditorias/2026-10-13-escala.md`. La skill `escala-finance-of-sports` (sección I) dice ahora cómo se mide. Se borra el 207.

## Versión 673 — Carpetas ordenadas (to-do 217) y tools obsoletas archivadas (2026-10-13)

- Raíz: se borra `e2.json` (salida de prueba commiteada por error) y `Business Books/` sale del proyecto.
- `Admin/` pasa de 101 entradas sueltas a los documentos y 10 carpetas: `api-keys/` (las 9 claves; una regla en `.gitignore`, `supabase.env`
  sigue trackeado), `registros/` (los registros del pipeline y `registros/api/`, el gasto de cada API), `lotes/` (los cerrados, 14 a 65, a
  `Archive/lotes/`), `mediciones/` (tests, backtests, informes, propuestas) y `sourcing/` (las notas de `fuentes/`). Los scripts de sourcing
  de Europa del Este a `tools/sourcing-europa-este/`; `schema.sql` de Supabase a `tools/supabase/`.
- `fuentes/` queda solo con las páginas públicas; `cargar-lote.mjs` y `bfo-rusia.mjs` exigen, commitean y revierten `Admin/sourcing` junto
  con `fuentes`. El archivo de links de Guido pasa a `Admin/sourcing/README.md` (`CLAUDE.md` al día).
- `data/`: los 214 data files de club en `data/<país>/<clubId>-data.js`; `tools/data-clubes.js` es el único lugar de las tools que arma esa
  ruta (23 tools lo usan) y `loadClubData()` la arma con `clubs[clubId].country`. ASSET_V 824.
- El script principal de `index.html` a `js/principal.js` (el mismo código, byte por byte) y el CSS a `css/styles.css`. ASSET_V 825.
- Tools: no se mueven (decisión de Guido). A `tools/archivo/`: las 3 mudanzas del to-do 209, `revisar-reservas`, `tablas-sesion` y
  `estado-desde-md`. To-do 218: sacar las etapas viejas de `onboard.mjs` y archivar `prepare-onboarding.mjs`.
- Comentarios de tools que ya no eran ciertos, corregidos (64 en 50 tools, cada uno verificado contra el código): quién llama a quién
  (`onboard.mjs`, `prepare-onboarding.mjs`, `proponer-carga.mjs`, `extract-table-rows.mjs` y `pipeline.mjs` ya no se presentan como el
  pipeline), números de etapa, flags que ya no existen, rutas viejas y to-dos cerrados. `estado.mjs` suma `cargar-lote.mjs` a la etapa 8.
- `audit.js`: el chequeo de claves de traducción lee todos los `js/*.js` (antes, una lista fija que dejaba afuera `js/principal.js` y
  `js/cuenta.js`). Encontró 3 claves de Mi Cuenta sin traducir en `data/lang/en.js`: agregadas ("more", "in", "financial year"). ASSET_V 826.
- Cada paso, verificado con la misma batería antes y después (`audit.js`, los generadores con `--check`, `estado.mjs`, ensayos de `lote.mjs`
  con `prueba-completa` y de `cargar-lote.mjs`, `dentro-de-otro`, `carpetas-clubes`, `cola`, `gasto`) y, en los que tocan el sitio,
  `?audit=1` (214 clubes cargan, 1859 checks cierran, 3 no: Bayern, igual que antes) y el texto de las 6 secciones.
