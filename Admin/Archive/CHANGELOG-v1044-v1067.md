<!-- md: CHANGELOG archivado, versiones 1044 a 1067 | leer: solo por grep de una palabra o de una tool (fos changelog historial <tool>) -->
# Changelog archivado, versiones 1044 a 1067

Salieron de `Admin/CHANGELOG.md` con `node tools/fos.mjs changelog archivar`. Las rutas son las de su época.

---

## Versión 1067 — imports sin uso de 26 tools del pipeline [alta-claude.mjs, alta-club-backtest.mjs, alta-club-registro.mjs, cargar-categorias.mjs, cargar-ceros.mjs, cargar-ejercicio.mjs, cargar-inicio.mjs, chequeos-gratis.mjs, claude-api-transcribe.mjs, costo-personal.mjs, dato-publico.mjs, dentro-de-otro.mjs, estadio-sponsor.mjs, gemini-transcribe.mjs, glosar-rubros.mjs, inventario-transcripciones.mjs, jev-categorizar.mjs, lookup-club-league.js, lote-preparar.mjs, mistral-ocr-transcribe.mjs, perimetro-senales-a3.mjs, perimetro-senales-base.mjs, reparar-pdf.mjs, rutas.mjs, suggest-category-precedent.mjs, xhtml-aarsrapport.mjs]

- Los imports sin uso pasan de 209 a 174 (`indefinidos --imports`); quedan 7 archivos grandes (alta-club, lote, verificar, caja-deuda, cargar, resolver-inventario, categorizar-claude). Se quitaron con un script de una sola vez que edita solo la lista de importados; 4 imports que quedaban vacíos se borraron enteros.
- Medición: lote completo (1004 documentos), 11 medidores idénticos salvo el aviso `imports-sin-uso` de audit (uno menos, uno más), explicado por el resumen.

## Versión 1066 — imports sin uso de perimetro-senales.mjs [perimetro-senales.mjs]

- Se quitan `relative`, `isAbsolute` y `sep` (sin uso). Una medición completa tarda unos 10 minutos: las demás tools del pipeline se limpian de a grupos de unas pocas, no de a una.
- Medición: lote completo (1004 documentos), `verificar` y `cargar` idénticos.

## Versión 1065 — imports sin uso: 9 tools que no son del pipeline [catalogo-liga.mjs, estado.mjs, existe.mjs, fuente-documento.mjs, medir-cargar.mjs, mudar-carpetas.mjs, patron.mjs, probar-medir-pipeline.mjs, wayback-verify-download.mjs]

- Se quitaron 11 imports sin uso (`node tools/indefinidos.mjs --imports`: 220 a 209) de las tools clasificadas `no_pipeline`; el resto, en las del pipeline, de a una y midiendo.
- Medición: no aplica (ninguna es del pipeline); `indefinidos` sin errores, `node --check` de las nueve y `probar-medir-pipeline.mjs` ok.

## Versión 1064 — 444: las 163 preguntas cierre-por-pais contestadas; cierre-sin-fecha descuenta lo que la cola confirmó [444 · cierre-sin-fecha.mjs, probar-cierre.mjs]

- 19 revisores Sonnet (por país, hasta 10 preguntas cada uno, brief `BRIEF-REVISOR-COLA.md`) leyeron la fecha de balance de cada documento: 163 `aceptar`, ninguna corrección; 131 de seguridad alta, 15 media y 17 baja (14 agregados DNCG de Francia y Telstar 2024-25, Paysandu 2025, Remo 2019, Akhmat 2025 y Metalist 2025 sin fecha explícita: se aceptó el cierre del país). Las 163 citas existen en su `.md`.
- `fos cierre-sin-fecha` cuenta aparte los cierres confirmados en la cola (`porCola`): los que frenan bajan de 191 a 83 (Argentina 30, Colombia 27, Alemania 8, Croacia 7…); `probar-cierre.mjs` ajustado a la nueva suma.
- Medición: `cierre-sin-fecha.mjs` solo lee el registro y la cola (clase orden, no corre en el pipeline); `fos probar cierre` sin fallas.

## Versión 1063 — 453 descartado por Guido [453]

- El punto 453 (que la auditoría semanal informe el atraso de producción) se cierra sin hacer: a Guido no le interesa. `fos produccion` queda como comando por si hace falta mirar a mano.
- Medición: solo documentos.

## Versión 1062 — to-do 454: una nota por ejercicio para los 71 con los ingresos en una sola línea; el 453 se reduce [454 · ingresos-en-una-linea.mjs]

- Decisión de Guido: margen bruto contra ingreso se resuelve con una nota por ejercicio, según el caso, no con números reconstruidos ni con una nota genérica. `fos ingresos-en-una-linea [--pais dk]` lista los 71 (Bélgica 32, Brasil 16, Dinamarca 13, Noruega 4…) con su rótulo e importe. El 453 queda en una sola tarea opcional: que la auditoría semanal informe el atraso de producción (los pushes van a GitHub cuando Guido quiere).
- Medición: tool de orden, solo lee `data/`; corrida real sobre Bélgica.

## Versión 1061 — 450: Leeds 2019-20 con el desglose de la nota 4; Sampdoria 2018 se queda como está [450 · leeds-gb]

- Leeds 2019-20: el Turnover (54,18 M) pasa de una línea sin abrir a las 7 fuentes de la nota 4 (entradas 11,4; TV 1,5; merchandising 15,4; distribuciones centrales 7,2; otro comercial 14,4; catering 4,0; educación 0,3), que suman exacto. Con 7 ajustes `fila` (el `.md` las trae en líneas sueltas de OCR) y 7 `categoria` con las mismas categorías de los demás años de Leeds (precedente del club). Los ingresos totales no cambian. Las preguntas `776c847` y `73f981d` de la cola quedan contestadas «no» con evidencia.
- Sampdoria 2018 (imposte e interessi): se mantiene lo histórico, los cuadros no se cargan; impuestos e intereses van al bloque financiero, que guarda totales, y el detalle no agrega nada a ingresos ni gastos.
- Verificado a mano (450): Leeds 2019-20 recargado con las 7 fuentes de la nota 4 (data/gb/leeds-gb.json: suman 54,18398, igual al Turnover); preguntas 776c847 y 73f981d contestadas con evidencia; Sampdoria 2018 se mantiene (decision de Guido: ok a ambos)
- Medición: dato (no tool); `cargar --reemplazar --escribir` con auditoría P0 0 y P1 0, el total de ingresos intacto.

## Versión 1060 — fos produccion y los to-dos 451, 452 y 453 [453 · produccion.mjs]

- `node tools/fos.mjs produccion` compara el ASSET_V publicado en financeofsports.com con el de `index.html` (un GET a la home): hoy producción lleva 228 versiones de atraso (1534 contra 1762) porque Netlify se quedó sin créditos del ciclo. To-dos: 451 (las etiquetas siguen el idioma elegido por el visitante, a partir de «Andre finansielle indtægter» en SønderjyskE), 452 (particularidades contables clave para el lector) y 453 (alarma de producción desactualizada). El 364 suma el peso del registro de correcciones (24 KB comprimido, no se parte hasta 150 KB).
- Medición: tool de orden, fuera del pipeline; corrida real contra producción.

## Versión 1059 — audit.js: recordatorio de metodología cada 40 commits de reglas [audit.js, audit-chequeos-5.js, probar-registros.mjs]

- P3 `metodologia-desactualizada`: avisa cuando pasan 40 commits de `Admin/CONVENCIONES-DATOS.md` desde la última edición de `metodologia.html` (hoy 31, no dispara; el umbral lo pidió Guido). Se apaga al editar la página, aunque sea para dejar constancia de que no hay nada nuevo. `probar-registros.mjs`: 2 casos nuevos (26 en total).
- Medición: `medir pipeline` (audit): idéntico. Veredicto de infraestructura. Sin revisión independiente.

## Versión 1058 — 444: cierre por defecto por país como pregunta de cola (votación 2 a 1) [444 · cargar-inicio.mjs, cierre-propuestas.mjs, probar-cierre.mjs]

- Votación (Admin/mediciones/444-votacion-cierre-por-defecto-por-pais.md, C 2 a B 1): un anual sin fecha de cierre que los vecinos no deducen NO asume el cierre del país: `fos cierre-propuestas` abre una pregunta de cola por documento (`cierre-por-pais`) con la propuesta de `tools/cierre-por-defecto.json` (Brasil, Rusia, Noruega, Ucrania 31-12; España, Países Bajos, Francia 30-06; todos sobre 98 % medido). `cargar-inicio.mjs` toma la respuesta: aceptar = la propuesta, corregir = su fecha. Ensayo por defecto; hoy 163 documentos.
- `probar-cierre.mjs`: 11 casos ok (año del nombre, ensayo sin escribir, una pregunta por documento sin duplicar, `cierre-sin-fecha --json`).
- Medición: `medir pipeline` hasta el lote completo (cargar, audit, escribir): idéntico (sin respuestas en la cola nada cambia). Veredicto de infraestructura. Sin revisión independiente.

## Versión 1057 — 437: la corrección de categoría de Guido con esquema, y casos para silenciar [437 · cola.mjs, probar-registros.mjs]

- `cola --corregir-categoria` escribe la respuesta con `esquema: 1` (`evidencia` ninguna, `seguridad` alta, `causa` decision-de-guido, vía `cola-respuesta.mjs`). `probar-registros.mjs`: 2 casos nuevos (`silenciar.mjs` en un repo de juguete con un `audit.js` falso, y esa línea), 24 en total, todos ok. `cola.mjs` queda en 40.866 bytes (límite 40.960).
- Quedan sin esquema solo `ajustes-manuales.jsonl` y `mediciones-pipeline.jsonl` (el esquema de cada una pide cambiar `ajustes.mjs --agregar`, que se usa mucho): no se hicieron.
- Medición: `medir pipeline` hasta el lote completo (6 medidores): idéntico. Veredicto de infraestructura. Sin revisión independiente.

## Versión 1056 — cierre-sin-fecha cuenta solo los que frenan, con fos cierre-sin-fecha [444 · cierre-sin-fecha.mjs, audit-chequeos-5.js]

- `fos cierre-sin-fecha` separa los anuales con .md sin cierre en el registro (457; 283 de clubes con algo cargado) entre los 92 que la regla de los vecinos deduce al cargar (98,2 % de aciertos dejando afuera cada anual con cierre) y los 191 que frenan o piden un ajuste `cierre` (Brasil 39, España 31, Argentina 30, Colombia 27, Rusia 25…). El P3 `cierre-sin-fecha` de `audit.js` ahora cuenta esos 191, no los 285 de antes.
- Medido y descartado: un escalón por el año del nombre (81,5 % de aciertos) y una regla del club «todos los demás cierran igual» (78,8 %); ninguno llega al 98 %. Un cierre por defecto por país (Brasil 98 %, Rusia 98 %, Noruega 100 %; España y Países Bajos 100 % el 30-06) es un criterio de datos y pide votación: queda en el 444.
- Medición: `medir pipeline` (audit): `cierre-sin-fecha` cambia de mensaje, explicado. Veredicto de infraestructura. Sin revisión independiente.

## Versión 1055 — 449: revisores agrupados de la cola probados (con gasto) y el reintento único mantenido [449 · 450]

- `Admin/mediciones/449-revisores-agrupados.md` y `Admin/BRIEF-REVISOR-COLA.md`: un subagente Sonnet por documento, con brief fijo y respuesta en JSON, cuesta unos 10 mil tokens por pregunta (75 a 81 mil por 7 u 8; 18 a 33 s) contra 72 mil por pregunta con uno por pregunta, y coincidió con el individual en las 6 comunes y con el histórico en 19 de 23. Gasto de la prueba: unos 667 mil tokens (9 subagentes).
- Las 4 respuestas que difieren (Sampdoria 2018 y Leeds 2019-20) pasan al punto 450. El reintento único del lote 143 (US$ 0,12 por documento, nota de personal en 12 de 13) se mantiene; no hubo gasto de API nuevo.
- Verificado a mano (449): Admin/mediciones/449-revisores-agrupados.md: 3 revisores agrupados (23 preguntas) y 6 individuales contra el historico, y el reintento unico del lote 143; brief en Admin/BRIEF-REVISOR-COLA.md; lo que difiere pasa al 450
- Medición: sin cambios a ninguna tool; subagentes y lectura de `cola-revision.jsonl`.

## Versión 1054 — 437: las tools que escriben los registros de decisión cumplen su esquema, y audit.js avisa si una línea no [437 · registro-esquema.js, cola-respuesta.mjs, cola.mjs, patron.mjs, decision.mjs, silenciar.mjs, votacion-contar.mjs, audit.js, audit-chequeos-5.js, periodo.mjs, probar-registros.mjs, probar-patron.mjs, probar-medir-pipeline.mjs]

- `esquemas-registros.json` (clave `validacion`) y `registro-esquema.js`: `patron`, `decision` (nuevo `--resultado`), `silenciar` y `votacion-contar` arman la línea de `auditoria-proceso.jsonl` con `esquema: 1` y no la escriben si no cumple. `cola --responder` acepta `--evidencia "ruta.md:12-30"`, `--seguridad` y `--causa` (`cola-respuesta.mjs`): con alguna, cumple o no se guarda; sin ninguna sigue igual y avisa. P3 `registro-fuera-de-esquema`: una línea con `esquema` que no cumple, o desde el 2026-10-25 una que debía llevarlo.
- Quedan: `cola --corregir-categoria`, los esquemas de `ajustes-manuales.jsonl` y `mediciones-pipeline.jsonl`, y un caso para `silenciar.mjs`. `periodo.mjs` y `cola.mjs` bajan de nuevo de 40 KB.
- Verificado a mano (437): las 5 tools cumplen el esquema (probar-registros.mjs, 22 casos) y audit.js da registro-fuera-de-esquema.
- Medición: `medir pipeline` (lote completo de 1004): idéntico salvo `tool-grande`, que baja. Sin revisión independiente.

## Versión 1053 — 441: ninguna pregunta de la cola se evita con una regla simple; lo que dependía de gasto pasa al 449 [441 · 449]

- `Admin/mediciones/441-cola-evitables.md` (corregido tras la segunda pasada): ninguna compuerta llega al 98 % de aciertos (nota informativa 48 %, cost of sales 77 %, sin desglose 87 %, cuadro informativo 82 %). Las 1512 preguntas que se cierran solas tardan mediana 45 minutos (1242 en menos de 6 horas): preguntarlas al final no ahorra respuestas. La ventana de ±4 años del perfil y la revisión `perfil-cambio` ya existen en `perfil-clubes.mjs`, `cargar-ceros.mjs` y `cola.mjs`.
- Lo que antes dije evitable (705 preguntas cerradas solas, 307 de perfil con un «no por país») era una lectura incompleta: se retira. Revisores agrupados y reintento único (gasto) quedan en el punto 449.
- Verificado a mano (441): Admin/mediciones/441-cola-evitables.md: ninguna compuerta llega al 98 %, las que se cierran solas se cierran antes de que las lean (mediana 45 min), la ventana del perfil ya existe; lo que depende de gasto pasa al 449
- Medición: sin cambios a ninguna tool; solo lectura de `cola-revision.jsonl`.

## Versión 1052 — 440: 14 reglas de eslint y los imports sin uso en audit.js; TypeScript, madge y knip probados y descartados [440 · eslint.config.mjs, indefinidos.mjs, audit-chequeos-5.js, probar-eslint.mjs, changelog.mjs]

- `tools/eslint.config.mjs` suma 14 reglas de `ERRORES` (0 hallazgos hoy) a `no-undef`; `indefinidos.mjs` las devuelve con su `regla` y los imports sin uso con `--imports`. `audit.js`: P3 `error-estatico` y P4 `imports-sin-uso` (220 imports en 43 archivos), con entradas en `audit-acciones.json`. `probar-eslint.mjs`: un archivo de juguete por regla (la prueba encontró que `no-inner-declarations` no marca nada en un módulo y se sacó).
- `changelog.mjs` leía `eslint.config.mjs` como `config.mjs` (el nombre no admitía puntos); ahora los admite.
- TypeScript `checkJs` (270 errores, casi todos ruido), madge (38 ciclos) y knip (205 exports sin uso) se instalaron, probaron con un defecto plantado y se desinstalaron: `Admin/mediciones/440-revisores-gratis.md`.
- Verificado a mano (440): 14 reglas de eslint activas con probar-eslint.mjs (17 casos ok), P3 error-estatico y P4 imports-sin-uso en audit.js, informe Admin/mediciones/440-revisores-gratis.md; TypeScript/knip/madge probados y descartados
- Medición: `medir pipeline` (audit): la única diferencia es el aviso nuevo `imports-sin-uso`, explicada; `probar-eslint.mjs` 17 casos ok. Veredicto de infraestructura (`patron --sin-documentos`). Sin revisión independiente.

## Versión 1051 — medir-pipeline.mjs: una segunda medición ya no borra el candado de la primera [443 · medir-pipeline.mjs, probar-medir-pipeline.mjs]

- Antes, una medición lanzada mientras otra corría escribía su propio candado, se negaba por los datos sin commitear y al salir lo borraba: la primera seguía midiendo sin candado, y ni el hook ni las tools que escriben registros la veían. Ahora la segunda se niega con el pid de la primera y no toca el candado. Apareció midiendo el 444.
- `probar-medir-pipeline.mjs`: 2 casos nuevos (se niega con el pid; el candado de la primera sigue con su pid), todos los casos ok.
- Medición: `medir-pipeline.mjs` es un medidor (fuera del pipeline); la prueba de juguete da todos los casos ok. Sin revisión independiente.

## Versión 1050 — periodo.mjs: la fecha de fin de mes más citada con su comparativa, y las fechas coreanas, japonesas y chinas [444 · periodo.mjs]

- Un anual sin cierre toma el último día de mes más citado en las primeras 8 páginas si se cita 3 veces o más, su comparativa un año antes también aparece y el año del nombre del archivo (si lo trae) coincide. Medido sobre los 2980 anuales cuyo cierre ya se lee de otra forma: 98,3 % de aciertos (996 de 1013) con las dos compuertas, contra 95,2 % de la regla sola. `fechasDe` lee «2018년 12월 31일» y «2018年3月31日». Sin cierre: 634 pasan a 554 (80 más; Brasil 16, Colombia 12, Países Bajos 10, Croacia 8, España 7, Japón 6…) y ningún período con cierre cambia.
- Registro refrescado con `inventario-transcripciones.mjs` (commit aparte): `cierre-sin-fecha` de 486 a 340 documentos. Quedan 554 sin cierre; Corea del Sur (26) trae «AAAA년 MM월 DD일 까지» en líneas sueltas y no hay con qué medir un escalón.
- Medición: `medir pipeline` (verificar, lote completo de 1004 documentos): idéntico. Veredicto con `patron --patron` (documentos con fin de ejercicio en el cuerpo o fechas CJK). Sin revisión independiente.

## Versión 1049 — 438: votacion-citas.mjs, votacion-contar.mjs y el votante único en la plantilla [438 · votacion-nueva.mjs, votacion-citas.mjs, votacion-contar.mjs, probar-votacion-nueva.mjs]

- `fos votacion citas <voto.json …>` verifica cada cita `{ref, texto, mismo_hecho}` (la línea de la ruta o el ejercicio `club@año` existe y contiene el texto). `fos votacion contar` cuenta los votos con las reglas de la skill (3 a 0; 2 a 1 sin precedente 1 a 3 verificado en la minoría; empate, minoría con precedente o más de 10 años a Guido): un precedente sin cita verificada o sin `mismo_hecho` no suma, y lo que un votante dijo no haber abierto queda a la vista; `--escribir` anota la línea con `esquema: 1`.
- `votacion nueva` suma la misma liga a la lista fija, el formato del voto con la cita completa y quién vota: nadie si mueve 1 % o menos, UN votante si `--precedente "ref|texto"` se verifica, tres si no.
- Verificado a mano (438): votacion nueva/citas/contar con probar-votacion-nueva.mjs (29 casos ok); el conteo coincide con las 22 votaciones del registro (12 unanimes DECIDIDO, ninguna A GUIDO unanime); no se re-voto con subagentes (gasto)
- Medición: `probar-votacion-nueva.mjs` 29 casos ok, con las 22 votaciones del registro: las 12 unánimes fueron DECIDIDO y el contador también las decide, y ninguna A GUIDO fue unánime. La comparación re-votando 3 casos con subagentes no se hizo (gasto). Tools de orden fuera del pipeline: `medir pipeline` no aplica. Sin revisión independiente.

## Versión 1048 — 448: las reglas fijas del prompt de sesión a Admin/PLANTILLA-SESION.md, y el hook rechaza node -e y python -c [448 · pre-tool.mjs]

- `Admin/PLANTILLA-SESION.md`: las reglas de Bash y los pasos de medir y commitear, que Guido pegaba en cada prompt (el cierre con «Leído en vano» sigue en su prompt, a su pedido). El hook `pre-tool.mjs` rechaza también `node -e`, `node -p` y `python -c` (después de las reglas de skills y PDFs, para no tapar su mensaje); lo que va entre comillas dobles se ignora. `probar-pre-tool.mjs`: 74 casos ok (6 nuevos; «python que solo lee pasa» pasó a rechazado). El CLAUDE.md que la cita va en un commit aparte.
- Verificado a mano (448): Admin/PLANTILLA-SESION.md existe, CLAUDE.md la cita (commit aparte), el hook rechaza node -e y python -c: probar-pre-tool.mjs 74 casos ok
- Medición: sin cambios a tools del pipeline (los hooks no se clasifican); la prueba del hook da todos los casos ok.

## Versión 1047 — 437: el esquema de los registros de decisión, escrito (sin que nada lo exija todavía) [437]

- `tools/esquemas-registros.json`: el esquema de `auditoria-proceso.jsonl` (245 líneas) y de `cola-revision.jsonl` (14656): campos de hoy con tipo y cuántas líneas los tienen, enumerados (veredicto, etapa, motivo, decisión), y los campos estructurados que se suman (tipo, caso, votos con criterios y citas, `veredicto_codigo`, `mueve_pct`, `evidencia`, `seguridad`, `subtipo`, `cerrable_sola`) con `nota` libre aparte. Lo anterior queda `legado`.
- Ninguna tool lo cumple todavía y `audit.js` no lo chequea: el punto 437 queda abierto con HECHO y QUEDA.
- Medición: sin cambios a ninguna tool; el JSON no lo lee nadie.

## Versión 1046 — 441: qué preguntas de la cola se pueden evitar, medido contra la cola histórica [441]

- `Admin/mediciones/441-cola-evitables.md`: ningún subtipo de duda de `verificar` pasa el 98 % de aceptación para una compuerta; se pueden evitar 307 de las 501 preguntas de perfil (por tema y país) y 705 preguntas de `verificar` que la corrida siguiente cerró sola. El punto 441 queda abierto con HECHO y QUEDA (lo que depende de una decisión de Guido o de un gasto está escrito ahí).
- Medición: sin cambios a ninguna tool; solo lectura de `cola-revision.jsonl`.

## Versión 1045 — 440: informe de los revisores automáticos gratis sobre tools/ [440]

- `Admin/mediciones/440-revisores-gratis.md`: 15 reglas de eslint con 0 hallazgos (1 s cada una), `no-unused-vars` 303 (220 imports sin uso), 34 ciclos entre `.mjs`, 85 exports sin uso aparente. Nada activado; TypeScript, knip y madge sin probar por falta de ok para instalar paquetes. El punto 440 queda abierto con HECHO y QUEDA.
- Medición: sin cambios a ninguna tool; solo documentos.

## Versión 1044 — periodo.mjs: el cierre desde el nombre del archivo, y el P3 cierre-sin-fecha [444 · periodo.mjs, audit.js, audit-chequeos-5.js]

- `periodo.mjs`: un anual sin cierre leído del contenido toma la fecha del nombre del archivo (`aarsrapport-2022-06-30.pdf`) si es de fin de mes (día 28 o más) y el año aparece en el texto del documento; confianza `media`, `cierreDe` lo dice. Si el contenido trae un cierre, manda el contenido (no se llega a este paso). Sobre los 3662 `.md`: 810 sin cierre pasan a 634 (176 rellenados: Dinamarca 89, Grecia 59, Bélgica 16, Chequia 10, Argentina 1, Portugal 1) y ningún otro período cambia.
- `audit.js`: P3 `cierre-sin-fecha`, documentos con `.md` de carpetas de clubes ya cargados sin cierre en el registro (hoy 486 de 116; el registro se refresca con `inventario-transcripciones.mjs`, que no corrí). Queda del 444: la parte 2 (mirar por qué `periodo.mjs` no encuentra la fecha en el resto, por país).
- Medición: `medir pipeline` (audit y verificar, lote completo de 1004 documentos): `verificar` idéntico; `audit` solo suma el aviso nuevo, explicado. Veredicto: `patron --patron` (documentos con informe anual). Sin revisión independiente.
