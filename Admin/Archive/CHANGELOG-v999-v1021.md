<!-- md: CHANGELOG archivado, versiones 999 a 1021 | leer: solo por grep de una palabra o de una tool (fos changelog historial <tool>) -->
# Changelog archivado, versiones 999 a 1021

Salieron de `Admin/CHANGELOG.md` con `node tools/fos.mjs changelog archivar`. Las rutas son las de su época.

---

## Versión 1021 — El método que partió audit.js, guardado en tools/archivo [431 · partir-cjs.mjs]

- `tools/archivo/partir-cjs.mjs` (copia del script del scratchpad, con el `import` de `lexico-js.mjs` y la raíz relativos) y su línea en `tools/archivo/README.md`: qué hace, cómo se usó y con qué se comprobó.
- Medición: no cambia ninguna tool en uso; un ensayo sin `--escribir` sobre el `audit.js` de hoy corre (nada que partir).

## Versión 1020 — `fos lote-nuevo` y el hook no deja pisar un lote [424 · lote-nuevo.mjs, pre-tool.mjs, probar-pre-tool.mjs]

- `node tools/fos.mjs lote-nuevo "<motivo>"` crea `Admin/lotes/lote-N.txt` (N = el más alto de `Admin/lotes/` y `Admin/Archive/lotes/` más uno; `--numero` solo lo dice; nunca sobre uno que existe). Registrada en `fos-comandos.json` y clasificada fuera del pipeline.
- Chequeo `lote-existente` del hook: un Write sobre un `Admin/lotes/lote-*.txt` que existe se rechaza y manda a `fos lote-nuevo`; Edit y un lote nuevo pasan.
- Medición: `probar-pre-tool.mjs` 67 casos ok (3 nuevos); el comando probado a mano (crea 144, contenido correcto, borrado). No toca el pipeline.

## Versión 1019 — Archivados los lotes 133, 134, 140 y 141 [432]

- Los cuatro (británicos del 356, ya cargados o devueltos a otros puntos) pasan a `Admin/Archive/lotes/` con `fos archivar`; solo el propio punto del TODO los citaba. Un ensayo de lote ya no avisa «sigue activa» por ellos (los demás avisos son de otras listas).
- Medición: no hay cambio de tools.

## Versión 1018 — Siete puntos más de lo que dejó pensando el 399: comentarios de lote, fos mapa, pruebas y orden [427 · 428 · 429 · 430 · 431 · 432 · 433]

- 427 (comentarios de `lote*.mjs`: 247 líneas, 25 con historia), 428 (`fos mapa` con las llaves reales y una opción corta), 429 (prueba de `partir-fases` y `lexico-js`), 430 (`--envolver`), 431 (guardar el método que partió `audit.js`), 432 (archivar los lotes 133, 134, 140 y 141), 433 (`eslint no-undef` en el repo; necesita el ok de Guido para la dependencia).
- Medición: no hay cambio de tools.

## Versión 1017 — audit.js en siete archivos (165 → 17 KB): se cierra el 399 [399 · audit.js, audit-base.js, audit-chequeos-1.js, audit-chequeos-2.js, audit-chequeos-3.js, audit-chequeos-4.js, audit-chequeos-5.js, lexico-js.mjs]

- CommonJS sin `fos mover`: un script del scratchpad (con el léxico de `lexico-js.mjs`) repartió las 109 declaraciones de nivel superior: `audit-base.js` (3 KB: los requires, `ROOT`, `add`, los hallazgos y las constantes compartidas, que Node evalúa una sola vez), cinco `audit-chequeos-N.js` (20 a 39 KB, los `check*` con sus constantes propias, cada uno con su `require('./audit-base.js')`) y `audit.js` (la entrada: `main`, `imprimir`, `listarFx` y la prueba de deporte). Sin cambiar el texto de ninguna declaración; ningún `let` se reasigna. `lexico-js.mjs` aprende `function*` (sin eso `clubYears` desaparecía).
- `tools/tamanos-aceptados.json` queda sin excepciones: ninguna tool pasa de 40 KB.
- Medición: `audit` (lote chico): la única diferencia es que `tool-grande` ya no avisa (y `indice-md-desfasado` se regenera); `node tools/audit.js` y `--json` antes y después: el texto idéntico y el JSON igual salvo el nombre del archivo que cita una ruta en dos hallazgos silenciados (ahora `audit-chequeos-2.js`); `eslint no-undef`: limpio en los siete archivos.

## Versión 1016 — lote.mjs: el flujo de nivel de módulo, en fases y en tres módulos (70 → 5 KB) [399 · lote.mjs, lote-preparar.mjs, lote-leer.mjs, lote-final.mjs, partir-fases.mjs, lexico-js.mjs]

- El script entero (desde `const ROOT`) se envuelve en `async function correrLote()` y se parte en 8 fases con `ctx` (`frenaSinApi`, `registro`, `usd` y `escritos`, los 4 `let` que cambian entre fases, viven en `ctx.N`); las fases van a `lote-preparar.mjs` (23 KB), `lote-leer.mjs` (28) y `lote-final.mjs` (23). `lote.mjs` queda en 5 KB y sale de `tools/tamanos-aceptados.json`; solo queda `audit.js`.
- `fos partir-fases` aprende lo que este caso pedía: `asincrona` (fases `async` con `await`), `indentar` (el cuerpo gana 2 espacios sin tocar las líneas dentro de una plantilla; sin esto `fos mapa` leía mal dónde terminaba cada función) y el spread `...x` como uso de un nombre. `lexico-js.mjs` marca las líneas dentro de una plantilla.
- Medición: `lote-ensayo` en lote chico, mediano y completo: idéntico; además la salida de `lote.mjs` en 4 modos (ensayo, `--sin-api --ejecutar`, `--reintentar`, `--rehacer`) comparada contra HEAD, línea por línea: 0 diferencias, también con el `ctx` estricto; `eslint no-undef`: limpio.

## Versión 1015 — perimetro-senales.mjs en tres módulos y la tabla del vocabulario en dos [399 · perimetro-senales.mjs, perimetro-senales-a3.mjs, perimetro-senales-base.mjs, vocabulario-datos.mjs, vocabulario-datos-2.mjs]

- `perimetro-senales.mjs` (61 → 34 KB): el paso A3 y `proponer()` a `perimetro-senales-a3.mjs` (13 KB) y los ayudantes (argumentos, tablas, controladas, Jev y su caché) a `perimetro-senales-base.mjs` (18); `cacheA2`, el `let` que reasigna `main`, se queda con su paso A2. `vocabulario-datos.mjs` (47 → 33 KB): desde `FLUJO_EFECTIVO` pasa a `vocabulario-datos-2.mjs` (16) y la primera mitad lo incluye con `...VOCABULARIO_2`; `VOCABULARIO` es el mismo objeto con el mismo orden de claves (comparado contra HEAD). Salen de `tools/tamanos-aceptados.json`.
- Chequeo estático nuevo para estas mudanzas: `eslint no-undef` (instalado en el scratchpad, no en el proyecto) sobre los 20 archivos partidos de `verificar`, `cargar`, `alta-club`, `perimetro-senales` y `vocabulario`: ningún nombre indefinido.
- Medición: lote completo con los 9 medidores de las tools (verificar, cargar, audit, escribir, lote-ensayo, caja-deuda, personal, alta): idéntico.

## Versión 1014 — Las fases de `proponer()` y de `analizar()` a módulos: cargar.mjs de 136 a 28 KB y alta-club.mjs de 54 a 22 KB [399 · cargar.mjs, cargar-inicio.mjs, cargar-categorias.mjs, cargar-ceros.mjs, cargar-ejercicio.mjs, alta-club.mjs, alta-club-analisis.mjs]

- `fos mover --sucio` encadenó: `cargar-ejercicio.mjs` (27 KB: totales, iXBRL, tipo de cambio y liga, el ejercicio), `cargar-ceros.mjs` (23), `cargar-categorias.mjs` (36) y `cargar-inicio.mjs` (28); `alta-club-analisis.mjs` (34). Las dos salen de `tools/tamanos-aceptados.json`.
- Medición: lote chico, mediano y completo (`alta`, `cargar`, `audit`, `escribir`): idéntico; la única diferencia es el aviso `indice-md-desfasado` (módulos nuevos), que se regenera al commitear.

## Versión 1013 — Las fases de `verificar()` a seis módulos: verificar.mjs de 218 a 32 KB [399 · verificar.mjs, verificar-armar.mjs, verificar-cierre.mjs, verificar-dudas.mjs, verificar-escalones.mjs, verificar-lecturas.mjs, verificar-salida.mjs, verificar-vecinos.mjs, mover-bloque.mjs]

- Con `fos mover` (de abajo hacia arriba): `armar()` (38 KB), vecinos (17), lecturas y `evaluar()` (39), escalones (34), cierre y año anterior (24), dudas y respuestas (25), resultado final y salida (20). `verificar.mjs` queda en 32 KB y sale de `tools/tamanos-aceptados.json`. Cada módulo importa lo del tool (circular, seguro: solo funciones).
- `fos mover` gana `--sucio`: encadenar varias mudanzas de una tool y medirlas juntas (antes se negaba si la tool tenía una sin commitear). Un script del scratchpad las encadenó recalculando el mapa.
- Medición: lote chico, mediano y completo (`verificar`, 2 pasadas): idéntico. Mudanza, sin cambio de lógica.

## Versión 1012 — localizar se rehace si el .md cambió aunque no haya filas [419 · cache-al-dia.mjs]

- `cacheAlDia()`: sin `.filas.json` (un `sin_estado` no deja filas) ahora compara el `mdSha1` guardado en el `.ubicacion.json` con el del `.md`; si difiere, el caché está viejo y `lote.mjs` rehace localizar, validar y extraer (un año cargado solo avisa), con el costo en el ensayo. Antes un `.md` reconvertido seguía «sin estado de resultados (queda como fuente)» sin llamar a nadie. Cambia el resultado de 15 documentos: los 13 británicos reconvertidos y OH Leuven 2017 y 2022.
- Medición: lote chico, mediano y completo (cargar, audit, escribir, verificar, lote-ensayo): idéntico (las listas no incluyen esos 15); el ensayo de `lote-143.txt` cotiza ahora US$ 4,85 en vez de «sin estado». Veredicto general. Condición nueva en una tool: sección 7 de `auditoria-finance-of-sports` recorrida (caso real; no frena nada: rehace localizar con costo visible; un año cargado solo avisa; `--rehacer`/ajuste `filas-a-mano` siguen mandando).

## Versión 1011 — El 356 se cierra: su Onboarding, sus defectos de script y lo que dejó pensando pasan a puntos propios [356 · 420 · 421 · 422 · 423 · 424 · 425 · 426]

- 420 (Onboarding, antes del 337): cargar los británicos en iXBRL (lote 143, Hibernian, años pagables, Falkirk, altas, criterio del Trust). 421 (defectos: Morecambe, Ross County, perimetro-senales con s408). 422 (costo-personal: la unidad del rótulo; la nota de una filial). Fulham 2023: el cambio del 351 toma «Total staff costs (£m) 154.8» como £000 y no puede reconfirmar 139,064; no cambia ningún dato publicado.
- Orden: 423 (un medidor vacío no es «idéntico»), 424 (no pisar un lote existente), 425 (`fos cerrar` con un «Verificar: manual»), 426 (`faltantes-liga` cambia solo por la fecha).
- Medición: no hay cambio de tools.

## Versión 1010 — Bolton 2024-25 de punta a punta con el conversor nuevo; punto 419 [356 · 419]

- `lote.mjs --rehacer --ejecutar --pagar-ia-xhtml` sobre Bolton 2024-25: localizar, extraer y verificar con el `.md` con tablas (US$ 0,15; 2 dudas ordinarias en la cola). Sin `--rehacer` el lote reutilizaba el `sin_estado` del `.md` viejo y no lo decía: punto 419. `Admin/lotes/lote-143.txt` (13 documentos de Inglaterra) queda para Onboarding; se pisó por error el `lote-142.txt` del 413 y se restauró desde git.
- Gasto del 356: ~US$ 2,05 de 35.

## Versión 1009 — Reconvertidos con tablas los .md de 14 clubes británicos (Hibernian, Bolton, …) [356]

- `xhtml-aarsrapport.mjs --rehacer --escribir` sobre Hibernian, Bolton, Bristol Rovers, Cambridge United, Crewe, Northampton, Oxford, Peterborough, Plymouth, Rotherham, Salford, Tranmere, Blackpool y Reading: 55 `.md` (y sus PDF de ancla) pasan de una línea por celda a filas de tabla; ninguno de esos clubes está en el sitio. Pasan las compuertas (a) hechos y (b) páginas. Costo US$ 0.
- Medición: no es un cambio de tool (datos de `Clubes/`).

## Versión 1008 — El conversor XHTML lee las celdas puestas por coordenadas como tablas [356 · xhtml-aarsrapport.mjs]

- `xhtml-aarsrapport.mjs`: los informes que Companies House convierte desde un PDF (un `div` por celda con `top:` y `left:`, sin `table`) salían una línea por celda y sin tablas; ahora se juntan las celdas de cada página, se agrupan por `top` y se ordenan por `left`: fila de 2 o más celdas = fila de tabla (con su separador); una sola celda = texto, salvo entre filas de tabla. Una celda sin texto no cuenta. 152 de 317 XHTML tienen estos divs; cambia la lectura de 120 (líneas, aprox. la mitad, y las tablas de 0 a 130-750 por archivo); los hechos iXBRL son los mismos en los 317.
- Revisado a mano: Hibernian 2024-25 y Bolton 2023-24 (estado de resultados con Notas y años en columnas; pasan las compuertas (a) y (b)).
- Medición: base real de 317 archivos (el cambio anterior): 82 imprimen distinto (líneas, tablas), 0 pasan a frenar en la compuerta, 0 se destraban y los 12 que frenaban siguen igual (Dinamarca y København). Veredicto general. Condición nueva en una tool: sección 7 de `auditoria-finance-of-sports` recorrida, «sin revisión independiente».

## Versión 1007 — El medidor `xhtml` ahora mide de verdad: recorre `Clubes/` y reconvierte [356 · xhtml-aarsrapport.mjs]

- Defecto: `medir pipeline` corría el conversor sobre `Clubes` y la tool solo miraba los `.xhtml` del nivel superior (cero archivos): toda medición del conversor daba «idéntico» sin leer nada. Ahora la tool recorre las carpetas de adentro y el medidor usa `--rehacer` (reconvierte los que ya tienen `.md`, sin escribir); la base queda en 317 archivos, con líneas, hechos y líneas ubicadas en el PDF de cada uno.
- Medición: la anterior estaba vacía, así que las 330 líneas que imprime son nuevas (explicadas); es la base del cambio siguiente. Un corte (FC København 2025 PSE) ya no cierra la compuerta (b) con 96 %, igual que antes de este cambio.

## Versión 1006 — `fos partir-fases`: la herramienta con la que se partieron `proponer()` y `verificar()` [399 · partir-fases.mjs, lexico-js.mjs, fos-comandos.json]

- `tools/partir-fases.mjs` + `tools/lexico-js.mjs`: parte una función enorme en fases que comparten un `ctx` sin cambiar el texto de cada tramo, avisa de una reasignación entre fases, reescribe a `ctx.N` las variables compartidas y no deja cortar en medio de un bloque (`--mapa` lista dónde se puede; `--proxy` genera la versión estricta). Quedan fuera de la tabla del pipeline (`no_pipeline`).
- Medición: no es una tool del pipeline; su resultado se midió en los tres cortes anteriores (idéntico).

## Versión 1005 — `verificar()` partida en 13 fases con un `ctx` [399 · verificar.mjs]

- `verificar()` (1.623 líneas) queda en ~25: `faseEntrada`, `faseArmar`, `faseVecinos`, `faseLecturas`, `faseEvaluar`, `faseEscalones`, `faseEscalonesD`, `faseCierre`, `faseAnioAnterior`, `faseDudas`, `faseRespuestas`, `faseResultadoFinal` y `faseSalida` (la mayor, `armar()`, 324). Las 27 variables `let` que se reasignan entre fases o dentro de una función (`E`, `ing`, `gas`, `okRes`, `escalon17`, `forzado`, …) viven en el `ctx` y cada uso se escribe `ctx.N`; el resto pasa por copia.
- El script que corta (en el scratchpad) mide llaves, strings, plantillas y regex, avisa de una variable que cambia entre fases y no deja cortar en medio de un bloque.
- Medición: lote chico, mediano y completo, `verificar` con 2 pasadas: idéntico; además una corrida con un `ctx` que falla si una fase pide algo que nadie dejó (989 documentos, 0 errores). `fos imports`: ningún faltante. Veredicto general (mudanza dentro del archivo).

## Versión 1004 — `proponer()` de cargar.mjs partida en 11 fases con un `ctx` [399 · cargar.mjs]

- `proponer()` (914 líneas) queda en ~50: `faseRegistro`, `faseClubYAnio`, `faseFilas`, `faseCategorias`, `faseCeros`, `faseSinCategoria`, `faseSignos`, `faseTotales`, `faseIxbrl`, `faseFxYLiga` y `faseEjercicio`. Cada fase lee de un `ctx` lo que usa y deja lo que las siguientes necesitan; un `return corta(…)` devuelve `P` y corta todo. Mismo texto de cada tramo, cortado por línea con un script (que decide qué lee y qué deja cada fase); sigue en un archivo, el motivo de `tool-grande` queda.
- Antes de medir, una corrida con un `ctx` que falla si una fase pide algo que nadie dejó: 967 documentos, 0 errores y idéntico.
- Medición: lote chico, mediano y completo, `cargar`, `audit` y `escribir`: idéntico. Veredicto general (mudanza dentro del archivo).

## Versión 1003 — `analizar()` de alta-club.mjs partida en 7 funciones [399 · alta-club.mjs]

- `analizar()` (365 líneas) queda en ~110: año y cierre (`cierreYAnio`), moneda (`monedaDelEjercicio`), deporte por menciones (`deporteDelTexto`), campos del club nuevo (`camposDelClub`), tipo de documento (`tipoDeDocumento`), perímetro (`perimetroDelDocumento`) y contexto y avisos (`contextoYAvisos`). Mismo texto de cada tramo, cortado por línea con un script; cada función recibe lo que usa y devuelve lo que el resto necesita. Sigue en un solo archivo (no hay import circular): el aviso `tool-grande` y su motivo quedan.
- Medición: lote completo (989 documentos), medidores `alta` y `cargar`: idéntico. Sin cambio de lógica; no aplica veredicto de patrón.

## Versión 1002 — El resumen de personal-ensayos cuenta de verdad: el 404 probado con el cambio del 351 [404 · medir-pipeline.mjs]

- `medir-pipeline.mjs` (resumen `valores-personal`): la línea `$ caja-deuda --personal --club X --ejecutar (salió…` no entraba en el patrón (había banderas entre el club y «(salió»), así que `personal-ensayos` contaba todo en cero (184 diferencias, «0 pierden, 0 nuevos»). Ahora cada combinación club/`--partir` es un bloque.
- Repetido el cambio del 351 (`--base 385b905c0b^ --tools costo-personal.mjs`, con las preguntas a Jev hechas de verdad, centavos): ninguna pérdida falsa por caché (Leeds, Liverpool, Forest, Chelsea, Volos, Panetolikos ya no aparecen). El motivo de «PIERDE» que queda es de lógica: Fulham 2023 (139,064, ya cargado), porque la fila nueva «Total staff costs (£m)» (0,1548) del documento siguiente no coincide; no cambia ningún dato publicado. Nuevos: 14 club-años (Bournemouth, Brighton, Celtic, Chelsea, Everton, Newcastle) que el ensayo ahora propone.
- Medición: `probar medir-pipeline` ok (13 casos); `medir pipeline` chico sobre el 351: caja-deuda, audit y escribir idénticos; personal-ensayos explicado arriba. Sin revisión independiente (solo cambia un resumen del medidor).

## Versión 1001 — Las propuestas de los puntos cerrados se archivan solas [416 · 417 · cerrar.mjs, datos-cola.mjs, arranque.mjs, changelog.mjs]

- `fos cerrar <id> --cerrar` pasa `Admin/propuestas/<id>-*.md` a `Admin/Archive/propuestas/` con un banner; las de 407, 408, 410, 411 y 412 ya están ahí. `Admin/CONVENCIONES.md`: una propuesta existe solo si Guido tiene que aprobar con pros y contras o va un cambio de skill.
- Puntos nuevos: 416 (silencios de `audit-ignore` con fecha de revisión; `ejercicio-sin-rastro` nombra `documentos-descartados`) y 417 (niveles P0 a P4: la skill quedó atrás, P1 mezcla, contrastes externos).
- Medición: los comentarios de 3 tools, idéntico (solo comentarios).

## Versión 1000 — El P3 de la auditoría de 49 a 1, y las cargas a mano controladas [409 · 413 · 414 · 415 · audit.js, cargas-manuales.mjs, lotes-prueba.mjs, hallazgo.mjs, con-worktree.mjs, prueba-escribir.mjs]

- P3: 44 hallazgos silenciados en `audit-ignore.json` con su verificación (31 `catchall-dominante` con la cifra hallada en el documento; 8 `ejercicio-sin-rastro` con la nota de sourcing o el descarte) o aceptados sin verificar por pedido de Guido (5, dicho en su motivo); 5 respuestas de `dudas-por-club.md` a `carga-clubes` o sourcing, un párrafo repetido, 21 mediciones con destino en `Admin/mediciones/README.md` y los comentarios con historia de 3 tools. Queda `sonderjyske-dk` (413).
- 409 opción C: `fos cargas-manuales` encuentra los años cargados a mano (sin `cargar.mjs`) sin ajuste, freno ni respuesta de la cola (`audit.js`: `carga-manual-sin-rastro`; línea de base de 134 documentos aceptados); los lotes de prueba los incluyen como la clase `carga-manual`.
- Puntos nuevos: 413 (SønderjyskE), 414 («Ganhos em imobilizações»: ¿ventas de jugadores?), 415 (deducciones de ingresos como «Otros ingresos» negativo, caso Flamengo: cierra con el total oficial).
- Medición: lote completo idéntico; veredicto general.

## Versión 999 — CONVENCIONES podada (402) y la auditoría en su criterio (370) [402 · 370]

- 402: `Admin/CONVENCIONES.md` de 19,6 a 11,7 KB y con títulos (el circuito de tres sesiones, la historia de por qué los internos van en `Admin/` y el índice de reglas mudadas, a `Admin/Archive/convenciones-antes-de-podar.md`, íntegro). El arranque de Pipeline, de 37,4 a 16,9 KB. `TODO.md` (38,6 KB) no tiene qué podar: un punto cerrado se borra y los cuerpos largos son trabajo vivo.
- 370: `node tools/audit.js` da P0 0, P1 0, P2 0 y P3 49, y los 49 piden trabajo (`--acciones`: 31 `catchall-dominante` que esperan la lista de Guido y 18 de la sesión, de a uno); queda la auditoría como lista, no el TODO.
- Medición: solo documentos; no toca el pipeline.
