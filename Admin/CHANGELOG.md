<!-- md: qué cambió y cuándo (las últimas 40 entradas; lo anterior está en Archive) | leer: solo por grep de una palabra o de una tool (fos changelog historial más el nombre de la tool), nunca de corrido -->
# Changelog

Este archivo es la versión condensada del historial de `finance-of-sports`, versión por versión: las últimas 40 entradas
(`node tools/fos.mjs changelog archivar` mueve las más viejas). **Las anteriores están en `Admin/Archive/CHANGELOG-v*.md`** (la 10 a la 299, la 300 a la 672, la 673 a la 956, …).
**El título lleva al final, entre corchetes, los to-dos, las tools y los clubes** (`## Versión N — título [292 · cola.mjs, cargar.mjs · besiktas-tr]`; se omite la parte que no aplica).
Las tools las deriva `fos cerrar` de git (lo tocado desde la última entrada); una con `~` (`~cola.mjs`) está solo mencionada en el texto de una entrada vieja. Para saber qué tool tuvo
problemas y qué leer: `node tools/fos.mjs changelog historial <tool>` (entradas con su línea de medición, commits, hallazgos y mediciones); `grep "cola.mjs" Admin/CHANGELOG.md Admin/Archive/CHANGELOG-*.md` devuelve solo títulos
y alguna mención. **Una entrada: hasta 4 bullets y 1.500 caracteres**, y su último bullet empieza con `Medición:` (idéntico, o la diferencia explicada); el porqué largo va a `Admin/finance-of-sports-project.md`
y los descartes medidos a `Admin/HALLAZGOS-pipeline.md` (`audit.js`: `changelog-entrada-larga`). Son bullets terses de qué cambió, no el porqué completo.
Para el razonamiento narrativo detrás de cualquier entrada (qué se probó, qué se
descartó, cómo se encontró cada bug) ver `Admin/finance-of-sports-project.md`. Para el
estado actual del proyecto (qué hay armado, qué es real vs. placeholder por club) ver
`Admin/ESTADO.md`, y para la to-do list vigente, `Admin/TODO.md` — hasta la Versión 137
las dos cosas vivían en un comentario HTML al principio de `index.html`.

**Las rutas que aparecen DENTRO de cada entrada son las de su época.** La Versión 196 mudó
los documentos internos a `Admin/` y no reescribió el historial: una entrada de septiembre
que dice `ESTADO.md` era verdad ese día.

---

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

## Versión 998 — Los lotes de prueba incorporan los casos raros (409) y los hallazgos con etiquetas (412) [409 · 412 · lotes-prueba.mjs, hallazgo.mjs, audit.js, cerrar.mjs]

- 409: la rápida suma los casos raros (ajuste manual, freno de un script, respuesta de la cola que no fue «aceptar»), leídos de sus registros: de cada clase el documento más viejo y el más nuevo, hasta 40 (rápida 98 a 126, mediana 488 a 531); más una ranura que rota por semana ISO. `lotes-prueba.mjs --check` exige los casos raros en la mediana.
- 412: `fos hallazgo` escribe la viñeta `[tema · tools · fecha]`; `audit.js`: `hallazgo-sin-etiquetas`; aviso suave del hook (PostToolUse) la primera vez que una sesión edita una tool con historial.
- `fos cerrar --cerrar` archiva el CHANGELOG al pasar de 60 entradas (quedan 40).
- Medición: `audit.js` y `lotes-prueba.mjs` por `fos medir pipeline`; `probar-post-tool` 12 casos ok.

## Versión 997 — CHANGELOG por tool (408), lectura por rol (410) y fricciones de sesión (411) [408 · 410 · 411 · 412 · audit.js, cerrar.mjs, changelog.mjs, arranque.mjs, existe.mjs, cola-historial.mjs, fuente-documento.mjs]

- 408: `fos changelog` (`historial <tool>`, `archivar`, `migrar`, `check`); el CHANGELOG pasó de 242 KB a 48 KB (284 entradas a `Archive/CHANGELOG-v673-v956.md`), 607 títulos con `~tool`; `fos cerrar` exige que el título nombre las tools tocadas; `audit.js`: `changelog-entrada-larga` y `changelog-grande`.
- 410: `fos arranque <rol>` imprime de ESTADO.md solo las secciones del rol (pipeline: 4,3 de 17,1 KB; marcas `<!-- roles: … -->` en el documento).
- 411: `fos cerrar <id>` solo revisa (`--cerrar` cierra); el hook rechaza `Write`/`Edit` a /tmp fuera del scratchpad (64 casos de prueba ok); `fos existe <palabras>`; `fos cola-historial tipos|categoria|materialidad|reaparece`.
- `fuente-documento.mjs` completó 35 `document` más por el id (1.104 de 1.344; el resto no tiene PDF en el repo: cargas manuales viejas o Rusia sin PDF). Abre el 412 (hallazgos consultables, propuesta).
- Medición: `audit.js` por `fos medir pipeline`, idéntico; el resto no toca el pipeline de carga (probado a mano y con `probar-pre-tool`).

## Versión 996 — La cola cierra el 407: gestión por club, historial de casos parecidos, aclaración de signo [407 · cola.mjs]

- `cola.mjs`: contestar `descartar` en un caso de gestión cierra los otros pendientes del club (92 repeticiones medidas); toda duda de verificar nueva lleva «Historial de casos parecidos» (etapa, motivo y país, con tasa de aceptación; desde 10 respuestas); una duda de signo cuya línea trae «(- = …)» lo dice.
- Descartes medidos (en `HALLAZGOS-pipeline.md`): la identidad del cuadro (suma su total, o la cifra citada) NO discrimina aceptar de «no»; los casos provisorios no ahorran nada salvo `primer-anio`, que ya se resuelve en el lote.
- Re-medición del tope de materialidad con `sources[].document`: 2.923 de 3.154 preguntas (antes 1.870); con 0,5 % por pregunta se contestan solas 37 % y el error acumulado máximo por documento es 0,93 %: igual que antes.
- Medido: lote completo idéntico; veredicto general. 407 cerrado.

## Versión 995 — La cola con datos y menos preguntas: clave estable, perfil por club, tope de materialidad [407 · cola.mjs, cargar.mjs, datos-cola.mjs, casos-sin-resolver.mjs, medir-pipeline.mjs]

- `cola.mjs`: una pregunta de localizar/extraer con otra redacción pero el mismo documento, etiquetas y bloques nace contestada con la última respuesta (antes volvía a la cola).
- `cargar.mjs`: perfil de club contestado en cualquier año vale (aviso con el año); materialidad con tope acumulado de 1 % por lado (más chica primero, confianza ≥ 0,5, no la línea junta de amortización); la pregunta de categoría ya no ofrece «sí» y trae los datos (`datos-cola.mjs`: peso, lo contestado a la misma etiqueta, Jev aparte).
- `casos-sin-resolver.mjs`: `fos causas` cruza con el dato cargado y los ajustes del documento; cerró 5 casos resueltos (Aston Villa 2019-22, Instituto 2025).
- `medir-pipeline.mjs`: junta los problemas de arranque (tool sin clasificar y datos sin commitear) en un solo aviso.
- Medición: lote completo, 3 diferencias, todas explicadas (filas que pasan por el tope, misma categoría). Veredicto general.
- Puntos nuevos: 408 (CHANGELOG por tool, propuesta pendiente de ok), 409 (lotes de prueba con casos raros).

## Versión 994 — El JSON de cada club guarda el PDF de origen de cada fuente [407 · ~cargar.mjs, ~cargar-escribir.mjs, ~fuente-documento.mjs, ~fuente.mjs]

- `sources[].document` (opcional, ruta `Clubes/<País>/<Club>/<archivo>.pdf`, esquema club-v2): `cargar.mjs` y `cargar-escribir.mjs` lo escriben en toda fuente nueva. `tools/fuente-documento.mjs` lo completó en 1.069 de las 1.344 fuentes ya cargadas (nombre del archivo en el título genérico, carpeta del club para desempatar; solo si hay un único archivo). Quedan 271 sin nombre en el título (Rusia `bfo`, que no son PDF, y fuentes con título propio) y 4 ambiguas: se completan con `fuente.mjs`.
- Medido: lote completo idéntico; veredicto general.
- 407: propuesta en `Admin/propuestas/407-cola-con-datos.md` con la materialidad medida (0,5 % por pregunta con tope de 1 % por documento) y los casos que se abren y se cierran solos.

## Versión 993 — La amortización junta se parte sola (`fos partir`) y Mönchengladbach 2021 [406 · 407 · ~partir-amortizacion.mjs, ~lote.mjs, ~cargar.mjs · monchengladbach-de]

- `tools/partir-amortizacion.mjs`: busca la línea de depreciación y amortización junta del estado y la parte con el cuadro de movimiento del inmovilizado (la columna del cargo del ejercicio, con la extraordinaria, suma la línea) o con dos notas (intangibles + bienes de uso) SOLO si la suma cierra con una única solución; si no, no escribe y queda en la cola. Escribe los ajustes `fila` y `categoria` con su cita. `lote.mjs --ejecutar` lo corre antes de verificar. Sobre los 988 documentos de la lista completa propone 3 y los 3 reproducen exacto lo que se había partido a mano (Mönchengladbach 2022: 32.294.038,76 + 13.629.219,22; Silkeborg 2025: 6.502 + 6.168; Viborg 2025: 15.751.691 + 2.624.046); en 172 más hay una línea junta cuyas notas no cierran: no decide.
- `cargar.mjs`: la cola ya no propone «sí» para una línea junta con categoría de amortización de jugadores o depreciación: dice que no se acepte y cómo se parte. Medido (cargar, lote-ensayo, escribir, tres lotes): idéntico; veredicto general.
- Ejemplo de punta a punta: Mönchengladbach 2021 (el otro ejercicio sin cargar del club) salió con la amortización partida sola; la cola solo pidió lo que va a sesión (impuesto con signo aclarado y Umsatzerlöse sin tabla, contestadas con nota). Cargado.
- 407: las preguntas que la sesión contesta siempre igual deben contestarlas las tools (sin Anhang, perfil sabido, aclaración de signo, caso que reaparece).

## Versión 992 — Un ejercicio real por el pipeline: Mönchengladbach 2022 [406 · ~lote.mjs, ~verificar.mjs, ~con-worktree.mjs, ~prueba-escribir.mjs · monchengladbach-de]

- Ejemplo real: `jahresabschluss-2022` (el club tenía 2023 y 2024). `lote.mjs --ejecutar` (etapas 3 a 8) US$ 0,20 con el reintento; frenó por la línea de Abschreibungen junta (propuesta de la cola: «sí», que habría puesto 13,6 M€ de bienes de uso como amortización de jugadores), dos preguntas de perfil y los Umsatzerlöse sin tabla. Cargado con 4 ajustes (partido con el Anlagenspiegel: jugadores 32.294.038,76 + resto 13.629.219,22). Defecto de script anotado: 406 (partir la línea junta con una tool enganchada en `verificar.mjs`).
- `tools/con-worktree.mjs` (`conWorktree(fn)`): el worktree descartable de las pruebas de escritura; `prueba-escribir.mjs` lo usa y comprueba que `caja-deuda --personal [--partir]` y `recategorizar-etiquetas` no cambian ningún JSON de club.

## Versión 991 — La prueba de escritura cubre más tools y el cierre de turno comprueba el diff [401 · ~prueba-escribir.mjs, ~cargar.mjs, ~caja-deuda.mjs, ~publicar.mjs, ~recategorizar-etiquetas.mjs]

- `prueba-escribir.mjs`: además de `cargar.mjs`, escribe de verdad (worktree descartable, datos de HEAD) `caja-deuda --personal [--partir]`, `recategorizar-etiquetas`, `generar-correcciones`, `ajustes --agregar` y `publicar`. Con el re-export de `cargar.mjs` quitado, falla. Medidor `escribir` asignado a `cargar.mjs`, `caja-deuda.mjs`, `publicar.mjs` y `recategorizar-etiquetas.mjs` (medido: idéntico).
- Hook `stop.mjs`: al cerrar el turno comprueba, contra el transcript, que cada commit de los últimos 30 minutos que tocó una skill o un documento de criterio tiene su `show_pane` del diff; si no, frena.

## Versión 990 — La medición de la taxonomía (`fos categorias`) y su aviso de vencimiento [403 · 404 · ~uso-categorias.mjs, ~audit.js, ~decision.mjs, ~medir-personal-ensayos.mjs]

- `tools/uso-categorias.mjs` (`fos categorias`): por lado, deporte, categoría y subcategoría, club-años, clubes, países y peso (mediana, máximo, club-años con 5 % o más), y las etiquetas del catch-all que llegan al umbral de abrir una categoría (20 club-años, 5 clubes, 3 países). Hoy (331 clubes): una sola, «Otros Ingresos» (genérica); ninguna etiqueta con nombre propio llega, así que los `catchall-dominante` con nombre son casos de a uno. Anotado como la primera revisión («taxonomía: sin cambios»).
- `audit.js`: `revision-taxonomia-vencida` (P3: más de 6 meses o 100 clubes desde la última revisión anotada con `decision.mjs`). Medido (audit): idéntico salvo `todo-cumplido`; veredicto general.
- El texto de umbrales para la skill `club-data-mapping` NO se aplicó: queda en `Admin/propuestas/350-revision-categorias.md` §3 hasta que Guido lo pida.
- **404:** `medir-personal-ensayos.mjs` corre `--personal` con `--ejecutar` (Jev responde lo que no está en la caché): sin «PIERDE» falsos al cambiar la lista de candidatos.

## Versión 989 — Lo que dejó pensando la 988, el hook de diff para los documentos de criterio y `fos lecturas` [402 · 405 · ~lecturas.mjs, ~historia.mjs, ~audit.js]

- Hook `post-tool.mjs`: el aviso de abrir el diff con `show_pane` ahora cubre también `CLAUDE.md` y `Admin/CONVENCIONES*.md`, `PANTALLA.md`, `PIPELINE.md`, `ESTADO.md` (antes solo las skills) y es imperativo (abrirlo ya, no al cierre). El hook de commit no pide veredicto a una tool que sola es solo comentarios o mudanza.
- `fos personal` es un ensayo por defecto (`--escribir` escribe); `reemplazar --forzar`; `publicar --correcciones` (regenera el registro de correcciones antes de publicar); `medir pipeline` no cuenta las tools borradas; `patron` no toma «2000 *» por un año.
- `tools/lecturas.mjs` (`fos lecturas`): tokens por documento leído en las últimas sesiones. Primera medición: `ESTADO.md` 23 %, `TODO.md` 15 %, `CONVENCIONES.md` 10 %. `ESTADO.md` de 25,2 KB a 17,3 KB (las tools del pipeline pasaron a `Admin/ESTADO-pipeline.md`).
- **405:** `tools/historia.mjs` (`fos historia`) lista cada fecha, «to-do N» y «Versión N» de los documentos de criterio con su frase y la clasifica (decisión / dato). Se reescribieron sin la historia `PANTALLA.md`, `PIPELINE.md`, `CONVENCIONES*.md`, `CLAUDE.md` y las skills de `club-sourcing` (commit aparte de skills). `audit.js` ya no cuenta como historia una fecha que es un dato (último chequeo de un país, nombre de archivo con fecha, `fxRef`) ni «todos 404» como número de tarea: 53 fechas y 12 «to-do N» a 0.
- Medido (audit): idéntico salvo `historia-en-doc-de-criterio`; veredicto general.

## Versión 988 — Etiquetas por proceso (Jev + agente con cita), sueldos de Brighton, Celtic, Newcastle e Instituto, P2 a 0 [369 · 351 · 370 · 372 · 350 · 390 · ~recategorizar-etiquetas.mjs, ~etiquetas-reglas.mjs, ~audit.js, ~costo-personal.mjs · astonvilla-gb, brighton-gb, celtic-gb, instituto-ar, newcastle-gb]

- **369:** `tools/recategorizar-etiquetas.mjs` (+ `etiquetas-reglas.mjs`; reemplaza a `recategorizar-subsidios.mjs`; `fos etiquetas --categoria <id>`): (1) reglas objetivas, (2) Jev sobre TODAS las etiquetas de `other_income` con el criterio de la REGLA como prompt (≥ 0,90 pasa sola), (3) un agente Sonnet con prompt fijo y cita textual que la tool verifica contra el `.md`, (4) a Guido solo lo que no tiene cita o choca con una regla. Cada decisión queda con quién la tomó. Backtest de Jev contra las 164 decididas con la expresión: reproduce solo 21 de 97 aprobadas y 36 de 67 excluidas con confianza alta, **0 errores de confianza alta**. Corrida real: 1.060 etiquetas, Jev aprobó 13 solas (12 son «donation(s)/doações» que la expresión no veía), 33 + 16 al agente (22 aprobadas, 8 excluidas, 19 sin cita); **81 líneas de 23 clubes pasan de Otros ingresos a Subsidios y donaciones** (Tartu, Narva, Vizela, Luzern, Gremio, Paysandu…), totales sin cambio; `catchall-dominante` 46 a 35 por eso. 24 etiquetas quedan en la lista corta de Guido (`fos etiquetas --categoria grants_donations --guido`). `audit.js` avisa `etiqueta-sin-revisar` (P3). Costo de Jev: centavos.
- **351:** `costo-personal.mjs` leía mal dos formas generales: dos tablas pegadas sin línea en blanco (la nota de personal y la de cantidad de empleados; Brighton 2023) y un importe chico («78») leído como número de nota, que corría la suma (Newcastle 2019); y no veía la fila rotulada «Staff costs (Note 9) 74.763» de la nota de resultado de explotación (Celtic 2021-25). Brighton 2023, Newcastle 2019 y Celtic 2021-25 quedan con `staffCost` y los sueldos «posiblemente dentro de…»; Instituto 2025 parte «Remuneraciones y cargas» del Anexo V por columna de sector (fútbol a `wages_squad`, colegio, resto) como el ejercicio anterior. Aston Villa 2019-22 (la sociedad no emplea al plantel) y Novorizontino 2010 (sin línea de personal) quedan aceptados en `audit-ignore.json` con la cita. Aston Villa 2019: `officialPAT` −111,776896 M£ por ajuste.
- **372 y 350 (Guido):** decidió la lista corta de 24 etiquetas (13 a Subsidios y donaciones, 11 quedan en Otros ingresos; 24 líneas de 10 clubes) y dio por bueno el 350 (las filas nuevas). Aston Villa: el documento no permite decir que el plantel «no está»; el motivo del silencio de `sin-salarios` ahora dice que no se puede separar (203 M£ de «Administrative expenses» sin desglose).
- **390:** los 7 casos de «Jev dijo ninguna» tenían 3 causas generales (tablas pegadas, importe chico leído como nota, fila rotulada «Staff costs»), ya resueltas en `costo-personal.mjs`, y 2 casos de a uno (Instituto, por sector; Aston Villa, el documento no separa los sueldos del plantel: ajuste `incluye` «posiblemente dentro de Administrative expenses» en 2019-22).
- **370:** `outlier-liga` pasa de 25× a 100× (un error ×1.000 deja a un club típico a 200× o más); 7 a 0, ningún dato tocado. P2 de la auditoría: 0.
- Medido (audit, caja-deuda, caja-deuda-personal, personal-ensayos; lote chico a completo): `caja-deuda` idéntico; valores de personal aceptados idénticos 26 y 64, que cambian 0, nuevos 6 (Bournemouth 2023, Brighton 2023, Chelsea 2021-23, Newcastle 2019). Con la lista de candidatos distinta, la caché de Jev se invalida y el ensayo mostró 14 pérdidas falsas (Leeds, Liverpool, Forest, Chelsea 2024, Volos, Panetolikos): con `--ejecutar` recuperan exactamente el mismo valor.

## Versión 987 — La auditoría separa lo informativo (P4), y un import que se rompió al partir `cargar.mjs` [370 · ~cargar.mjs, ~audit.js, ~imports-sin-export.mjs]

- `audit.js`: nivel P4 «informativo» (un código con `quien: nada` en `audit-acciones.json` pasa de P3 a P4; `P3` queda para lo que pide trabajo); `catchall-dominante` se parte: si la línea más grande del catch-all es un «otros» del documento (raíz multilingüe) el código es `catchall-limite-fuente` (P4), si tiene nombre propio sigue `catchall-dominante` y el aviso dice la etiqueta; las entradas de `audit-ignore.json` de 11 club-años pasaron al código nuevo; `i18n-incompleto` deja de dar falsas claves (en.js tiene varias por línea). `moneda-sin-meta`: TRY en `CURRENCY_META`. `correcciones.html` declarada pública en `audit-ignore.json` y sin raya larga en el pie.
- **Rotura real de la 375 (4), encontrada al correr `publicar`:** `cargar.mjs` dejó de re-exportar `snapshot`, `revertir` y `runNode`, y fallaban `publicar`, `caja-deuda --escribir`, `costo-personal`, `dentro-de-otro`, `worktree` y `gestiones-tanda` (que ni cargaba). Un ensayo no pasa por esos imports dinámicos, y `medir pipeline` tampoco. Se re-exportan, y el chequeo nuevo `imports-sin-export.mjs` (`fos imports`; P1 `import-sin-export` en `audit.js`) lee los fuentes y marca todo nombre que una tool pide a otra y la otra no exporta: hoy 0, y con el re-export quitado marca los 12 casos.
- Medido (audit y cargar, tres lotes): `cargar` idéntico; `audit` 220 diferencias, todas del cambio de código (catchall 90 → 46 dominante + 55 límite; el resto, P3 → P4 con el mismo mensaje).

## Versión 986 — El informe del backtest de alta salta un club que ya no está [400 · ~alta-club-backtest.mjs]

- `alta-club-backtest.mjs`: `--informe-backtest` salta con un aviso cada fila cuyo club ya no está en el sitio (`velez`, `oncecaldas`, `clubamerica`: ids viejos) en vez de caer con un TypeError; el informe se imprime y sale con 0. Medido (alta y cargar, tres lotes): idéntico; veredicto general.

## Versión 985 — Lo que dejó pensando la noche de las particiones [375 · ~audit.js, ~alta-club.mjs, ~fetch-fx-reference.mjs]

- `medir pipeline`: `indice-md-desfasado` ya no pide razón escrita (cualquier tool nueva o mudada mueve el conteo de citas del índice; se regenera al commitear y `audit.js` lo avisa si no); y `--medidor X` avisa cuando X no es medidor de las tools cambiadas (antes se ignoraba en silencio y se creía medido con ese: pasó con `cargar` y `alta-club.mjs`, que ahora lo lleva).
- `fetch-fx-reference.mjs --ensayo`: baja y cuenta sin escribir (una prueba con `--from/--to` había pisado `tools/fx-reference/ars-usd.json`; se revirtió con git).
- Anotado: `alta-club.mjs --informe-backtest` falla con un TypeError de `fiscalYearMeta` sobre un backtest viejo, antes y después de las particiones.

## Versión 984 — Tamaño de las tools: aviso `tool-grande`, excepciones con motivo, ids que no se reutilizan [375 · 399 · ~audit.js, ~verificar.mjs, ~cargar.mjs, ~alta-club.mjs, ~lote.mjs, +3]

- Aviso P3 `tool-grande` en `audit.js` (más de 40 KB sin motivo en `tools/tamanos-aceptados.json`); regla en `Admin/CONVENCIONES.md`, «Tamaño de las tools». Quedan con motivo siete tools que no se pueden partir moviendo un bloque: `verificar.mjs` (una función de ~1.600 líneas), `cargar.mjs` (`proponer()`, 892), `alta-club.mjs` (`analizar()`, 365), `audit.js` (CommonJS con contexto compartido), `lote.mjs` (un solo flujo), `perimetro-senales.mjs` (estado compartido `cacheA2`) y `vocabulario-datos.mjs` (una tabla). Lo que sigue es el punto 399 (refactor de esas funciones, una por vez). Medido: audit idéntico; veredicto general.
- `todo.mjs --nuevo`: el id nuevo es el siguiente al más alto usado alguna vez, mirando también los títulos del CHANGELOG y su archivo: antes reutilizaba el de un punto cerrado (se vio al crear el 399). Medido: audit idéntico; veredicto general.

## Versión 983 — Particiones de tools/ con `fos mover`: caja-deuda, cargar, vocabulario, estadio-sponsor, resolver-inventario, categorizar-claude, fetch-fx y alta-club [375 · ~caja-deuda.mjs, ~caja-deuda-md.mjs, ~caja-deuda-propuestas.mjs, ~caja-deuda-escala.mjs, ~cargar.mjs, +20]

- `fos mover caja-deuda.mjs 53-465 caja-deuda-md.mjs`: el parseo del `.md` de un balance (importes, columnas de notas, filas y totales; 413 líneas, 38 KB) sale de `caja-deuda.mjs` (de 113 a 78 KB) a su módulo; `caja-deuda.mjs` lo importa y re-exporta `coincide`, `parseNumber`, `filasDelMd` y `r6` (los llamadores no cambian). Seis constantes puras se duplican en el módulo (`PAG_RE`, `IMPORTE_RE`, …). Medido (caja-deuda, caja-deuda-personal, personal-ensayos, audit): idéntico salvo `indice-md-desfasado` (el índice cuenta cuántas tools citan cada `.md` y el módulo cita uno más; explicado, índice regenerado).
- `caja-deuda.mjs` 55-261 → `caja-deuda-propuestas.mjs` (20 KB: las propuestas de la escalera, precedente, vocabulario, IA y Jev; `caja-deuda.mjs` queda en 59 KB). Medido: idéntico en los cuatro medidores.
- `caja-deuda.mjs` 253-502 → `caja-deuda-escala.mjs` (el sitio, la escala, las lecturas por IA, la medición y los balances NBB y rusos; 250 líneas). Medido: idéntico (el aviso del índice se va).
- `cargar.mjs` 1115-1447 → `cargar-escribir.mjs` (31 KB: la edición de los data files, publicar, revertir, `escribir`, el backtest y las líneas de git; `cargar.mjs` baja de 155 a 129 KB). Medido con los lotes chico, mediano y completo (987 documentos): `cargar` y `audit` idénticos. El resto de `cargar.mjs` es `proponer()`, UNA función de 892 líneas: partirla es un refactor, no un movimiento.
- `vocabulario.mjs` 128-603 → `vocabulario-datos.mjs` (48 KB: la tabla `VOCABULARIO` por concepto y por idioma, datos puros; `vocabulario.mjs` queda en 18 KB y la re-exporta). Medido con ocho medidores (cargar, audit, verificar, lote-ensayo, caja-deuda, caja-deuda-personal, personal-ensayos, alta): todos idénticos. La tabla pasa de 40 KB y es UN objeto: queda como excepción.
- `estadio-sponsor.mjs` 40-362 → `estadio-sponsor-wikipedia.mjs` (28 KB: leer la ficha del club, la galería de estadios y la tabla de camisetas; `estadio-sponsor.mjs` queda en 28 KB). Medido con `contexto`, `cargar` (lotes chico, mediano y completo): idéntico. `mover-bloque` ahora duplica una constante pura que depende de otras (`REF` con `ROOT`) y frena el estado compartido (un `let` reasignado del otro lado del corte): así se descartó partir `perimetro-senales.mjs` por `cacheA2`, que `main` reasigna.
- `resolver-inventario.mjs` 65-415 → `resolver-inventario-motores.mjs` (23 KB: las voces de la transcripción, el voto por mayoría y la aritmética que desempata; `resolver-inventario.mjs` queda en 33 KB). Medido con `lote-ensayo` en los tres lotes (987 documentos): idéntico.
- `categorizar-claude.mjs` 381-484 → `categorizar-claude-backtest.mjs` (10 KB: el backtest contra lo cargado y su informe; `categorizar-claude.mjs` baja de 49 a 42 KB). Medido con `cargar` en los tres lotes: idéntico.
- `categorizar-claude.mjs` 383-466 → `categorizar-claude-listos.mjs` (los documentos LISTOS de producción; `categorizar-claude.mjs` queda en 33 KB). Medido con `cargar` en los tres lotes: idéntico.
- `fetch-fx-reference.mjs` 37-471 → `fetch-fx-fuentes.mjs` (21 KB: los lectores de cada banco central; `fetch-fx-reference.mjs` queda en 33 KB). Herramienta de referencia (`no_pipeline`): sin lote; la salida de `--currency ZZZ` es idéntica y una bajada real de dos días de ARS anduvo (esa prueba pisó `tools/fx-reference/ars-usd.json` y se revirtió con git: las pruebas de un fetcher no se corren sobre el archivo real).
- `alta-club.mjs` 281-635 → `alta-club-lectura.mjs` (30 KB: fechas de cierre, tipo de cambio declarado, nombre legal y portada; `alta-club.mjs` baja de 162 a 139 KB). La PRIMERA versión de esta partición cambió 21 salidas del medidor `alta` (15 → 48 preguntas de cierre): `mover-bloque` duplicaba `const MESES = {}`, un objeto que `alta-club.mjs` llena después, así que el módulo veía los meses vacíos. Se descartó, `mover-bloque` ya no duplica un objeto/arreglo que otro código modifica ni una regex con \`g\`/\`y\`, y la prueba lo cubre. Medido otra vez: \`alta\` y \`cargar\` idénticos en los tres lotes (\`alta-club.mjs\` pasó a alcance «compartida» con el medidor \`cargar\`, porque \`cargar\` usa su \`analizar\`).
- `alta-club.mjs` 63-236 → `alta-club-tablas.mjs` (las tablas fijas: países, monedas, meses, formas societarias). Medido con `alta` y `cargar` en los tres lotes: idéntico.
- `alta-club.mjs` 483-837 → `alta-club-escribir.mjs` (el tipo de cambio y la liga que se proponen y la escritura del alta con su reversión). Medido con `alta` y `cargar` en los tres lotes: idéntico.
- `alta-club.mjs` 832-1021 → `alta-club-backtest.mjs` (el backtest de las preguntas del alta y `--deshacer`). Medido con `alta` y `cargar` en los tres lotes: idéntico; esos caminos no los ejercita ningún medidor, así que además se comparó a mano: `--deshacer` de un club inexistente da lo mismo y `--informe-backtest` falla igual antes y después (TypeError de `fiscalYearMeta` sobre un backtest viejo: error que ya estaba, anotado).
- `alta-club.mjs` 484-831 → `alta-club-registro.mjs` (las preguntas a Claude, el registro de altas y los modos `--todos`, `--resumen` y `--dudas`). Medido con `alta` y `cargar` en los tres lotes: idéntico. `alta-club.mjs` quedó en la mitad (de 162 a unos 62 KB), con `analizar()` (365 líneas) adentro.
- `patron.mjs`: una mudanza (sin los imports, sin el `export` del principio y sin líneas ya existentes duplicadas, lo agregado es lo quitado) no pide veredicto; `medir pipeline` sigue usando las diferencias exactas, así que una mudanza va por los lotes. `que-pide` juzga el conjunto de tools cambiadas, como el hook.

## Versión 982 — `fos mover`: mudar un bloque de una tool a un módulo sin cambiarlo [379 · ~mover-bloque.mjs, ~fos.mjs, ~probar-mover-bloque.mjs, ~caja-deuda.mjs]

- `tools/mover-bloque.mjs` (`node tools/fos.mjs mover <tool> <desde>-<hasta> <destino.mjs> ["porqué"] [--escribir]`): con una máscara de código (sin comentarios, cadenas ni regex; el código de un `${…}` sí) calcula qué nombres de la tool usa el bloque y cuáles del bloque usa el resto. Lo que el bloque usa de los imports de la tool se importa igual; una constante pura de una línea (`const ROOT = resolve(import.meta.dirname, '..')`) se duplica en el módulo; el resto se importa de la tool (con `export` agregado); lo que el resto usa del bloque se exporta y se importa, y lo que el bloque ya exportaba se re-exporta. Comprueba bloque idéntico salvo el `export`, `node --check` de los dos y avisa de ciclos, código que se ejecuta al importar y un TDZ (constante del bloque que usa al evaluarse un nombre que importaría de la tool: no escribe sin `--forzar`). Ensayo por defecto.
- Prueba (`probar-mover-bloque.mjs`, 7 casos): rehace la mudanza del 368 sobre una copia de la versión anterior de `caja-deuda.mjs` (líneas 1245-1457): el bloque queda idéntico y la tool partida da EXACTAMENTE la misma salida que la entera con tres comandos de `--personal` (`--club brighton-gb`, `celtic-gb --partir`, `--ver-candidatos newcastle-gb --anio 2023`). La primera versión chocaba con un TDZ (`ROOT` en el ciclo): de ahí la duplicación de constantes puras. Interpretación de «byte a byte»: el BLOQUE es el mismo (el 368 lo tenía idéntico salvo `export`); la cabecera y los imports del módulo son los de la tool, no los que escribió a mano el 368. Herramienta de orden (`no_pipeline`).

## Versión 981 — Cabeceras largas de tools/: aviso y `fos acortar-cabecera` [398 · ~audit.js, ~acortar-cabecera.mjs, ~alta-club.mjs]

- Aviso P3 `cabecera-larga-en-tools` en `audit.js` (más de 40 líneas, `CABECERA_MAX` del comparador; excepciones con motivo en `tools/cabeceras-aceptadas.json`). Se eligió 40 y no 25: es el número que pedía el cierre del punto para las más largas, y a 25 entraban 77 tools. `tools/acortar-cabecera.mjs` (`fos acortar-cabecera`): deja el principio (cortado en un renglón vacío o una raya) y el bloque USO y manda el resto, tal cual, a `Admin/NOTAS-DE-TOOLS.md`; ensayo por defecto; prueba que el código no cambió. Medido (audit, chico): el aviso nuevo; veredicto general.
- Corrida: 27 cabeceras acortadas (la de `alta-club.mjs` de 245 a 24 líneas, `cargar` de 93 a 30, `ajustes` de 88 a 21), 1.110 líneas pasaron tal cual a `Admin/NOTAS-DE-TOOLS.md` (una sección por tool). El código sin comentarios idéntico en las 27, medido por la vía de solo comentarios; `--perdidos` da 0 (cuenta lo que quedó en las notas). El aviso `cabecera-larga-en-tools` da 0 y las cinco más largas quedan en 30 líneas o menos.

## Versión 980 — Mover un punto del TODO, limpiar-comentarios sin pisar, qué se pierde y cerrar sin ruido [396 · ~todo.mjs]

- `todo.mjs --mover <id> --antes|--despues <id>` (renumera): el 357 pasó a estar antes del 337. `limpiar-comentarios --escribir` se niega con `tools/` sin commitear (`--forzar` lo salta) [396].
- `limpiar-comentarios --perdidos [--desde <rev>] [--hasta <rev>]`: mirando hacia atrás de cualquier cambio, las líneas de comentario que ya no están y cuyas palabras con contenido ningún comentario del archivo conserva (entre las limpiezas de hoy: 24). Enganchado: `medir pipeline` de un cambio de solo comentarios lo imprime solo, `que-pide` lo anota en la línea de la tool y `cerrar` lo avisa.
- `fos cerrar`: el ✗ de ESTADO/PIPELINE solo sale si una tool cambiada figura por nombre en ellos y ninguno se tocó; `--sin-doc "motivo"` deja constancia de que se miraron.

## Versión 979 — Candado de medición: el hook no deja editar lo trackeado mientras mide [394 · ~medir-pipeline.mjs, ~probar-medir-pipeline.mjs]

- `medir-pipeline.mjs` deja `Admin/mediciones/pipeline/_corriendo` (pid, desde cuándo, tools) mientras corre los lotes y lo suelta al salir (también por error o Ctrl-C). `pre-tool.mjs` rechaza `Edit`/`Write`/`MultiEdit` de un archivo trackeado del repo con el candado vivo, diciendo que espere la notificación; un pid muerto, el scratchpad y lo sin trackear pasan. El hook `Stop` calla mientras haya un candado vivo.
- Pruebas: 6 casos nuevos en `probar-pre-tool.mjs` (60), 1 en `probar-medir-pipeline.mjs` (el medidor ve el candado y al terminar ya no está) y 2 en `probar-stop.mjs` (8).

## Versión 978 — `fos reemplazar`: edición en masa sin que el hook la rechace [392 · ~reemplazar.mjs, ~fos.mjs, ~probar-reemplazar.mjs]

- `tools/reemplazar.mjs` (`node tools/fos.mjs reemplazar <archivo …> --de … --a … [--regex] [--solo-comentarios] [--escribir]` y `--lista cambios.json`): el mismo texto en varios archivos (solo dentro de comentarios si se pide, con el `scan` del comparador) o una lista de cambios exactos por línea (la forma que hizo falta en el 374); ensayo por defecto con archivo:línea y antes/después; si un cambio de la lista falla no se escribe ningún archivo; se niega a escribir un archivo con cambios sin commitear. Prueba de 8 casos en `probar-reemplazar.mjs`. El rechazo del hook a `sed -i`/`python`/`node -e` ahora la nombra. Herramienta de orden (`no_pipeline`).

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
