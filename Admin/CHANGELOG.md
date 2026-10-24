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

## Versión 1043 — votacion-nueva.mjs: el archivo del caso de una votación desde una plantilla [438 · votacion-nueva.mjs, probar-votacion-nueva.mjs]

- `node tools/fos.mjs votacion nueva --id --slug --titulo --opcion "A=texto|monto" … [--hechos f.md] [--total n] [--club id] [--palabras "a,b"] [--escribir]` arma `Admin/mediciones/<id>-votacion-<slug>.md` con la marca, Conclusión y Destino, el cuánto mueve de la skill (sección 4: la diferencia entre opciones sobre el total, 1 % o menos no se vota), la lista fija de qué abrir (renglones de `CONVENCIONES-DATOS.md` por palabra, JSON del club y de su país) y el formato JSON del voto con `no_abri`. Ensayo por defecto; no pisa un archivo.
- Queda del 438: la verificación de citas por script, el voto en JSON contado por una tool, el votante único barato y la comparación contra 3 votaciones anteriores.
- Medición: tools de orden, fuera del pipeline: `probar-votacion-nueva.mjs` (8 casos ok) y `medir pipeline` sin diferencias. Sin revisión independiente.

## Versión 1042 — las tools que escriben registros se niegan mientras medir pipeline mide [443 · candado-medicion.mjs, estado.mjs, inventario-transcripciones.mjs, publicar.mjs, cola.mjs, ajustes.mjs, lote.mjs, medir-pipeline.mjs, fos.mjs, probar-medir-pipeline.mjs]

- `tools/candado-medicion.mjs` (`negarSiSeMide`): con `Admin/mediciones/pipeline/_corriendo` y su pid vivo, `estado`, `inventario-transcripciones`, `publicar` (sin `--ensayo`), `cola --responder/--corregir-categoria`, `ajustes --agregar/--anular` y `lote --ejecutar` salen con 3 y dicen el pid. `--ignorar-medicion` es la salida de emergencia; `medir-pipeline` marca a sus hijos con `FOS_MIDIENDO=1` y esos no se niegan.
- `fos --check` comprueba que esas tools sigan llamándolo y lista (informativo, 58) las que escriben en `Admin/registros` sin chequearlo; queda `cargar.mjs --escribir` y `patron/decision/silenciar` sin candado. `probar-medir-pipeline.mjs`: 6 casos nuevos (se niega, no escribe, modo sin escritura, emergencia, hijo, pid muerto).
- Verificado a mano (443): probar-medir-pipeline.mjs: la tool se niega con el candado vivo (6 casos nuevos ok); fos --check lista las 58 escritoras de registros sin chequearlo y verifica las 6 que lo llaman
- Medición: `medir pipeline` (9 medidores, hasta el lote completo): idéntico; la primera corrida dio `escribir` vacío por `tool-sin-clasificar` de las tools nuevas, ya clasificadas. Veredicto de infraestructura (`patron --sin-documentos`). Sin revisión independiente.

## Versión 1041 — aviso de cambio de formato del balance, y fos cerrar ya no borra el punto a medias [446 · cambio-formato.js, cargar-ejercicio.mjs, audit-chequeos-3.js, audit.js, cerrar.mjs]

- `tools/cambio-formato.js`: ingresos de UNA línea `lump_football_operations` contra más de una (o al revés) respecto del año inmediatamente anterior cargado. `cargar.mjs` lo avisa en la propuesta con el texto sugerido de la `publicNote` (SønderjyskE 2025 lo dispara); `audit.js` da el P3 `cambio-de-formato-sin-nota` (hoy 23 club-años, punto 447).
- `fos cerrar --cerrar` borra el punto del TODO al FINAL y solo si ningún chequeo falló (antes lo borraba primero y repetir el comando daba «no existe el punto»); repetir sobre un punto ya cerrado sigue con los demás chequeos.
- Verificado a mano (446): cargar en ensayo sobre SønderjyskE 2025 (--reemplazar) imprime el aviso con el texto sugerido; audit.js da cambio-de-formato-sin-nota (23 club-años, punto 447); lote completo idéntico salvo ese aviso
- Medición: `medir pipeline` hasta el lote completo (1004 documentos; `audit`, `cargar`, `escribir`): idéntico salvo el aviso nuevo `cambio-de-formato-sin-nota`, explicado. Veredicto de infraestructura (`patron --sin-documentos`). Sin revisión independiente.

## Versión 1040 — fos patron --revision y el P4 revision-propia-pendiente [436 · patron.mjs, probar-patron.mjs, audit.js, audit-chequeos-5.js]

- `patron --revision propia|auditora` anota el campo `revision` en `auditoria-proceso.jsonl`. `audit.js` da el P4 `revision-propia-pendiente` con los cambios `propia` que ninguna línea `auditora` posterior cubre (mismas tools); `revisionesPendientes` en `audit-chequeos-5.js`, acción «nada» en `audit-acciones.json`.
- `probar-patron.mjs`: 3 casos nuevos (queda en el registro, valor inválido, qué cubre una auditora posterior). Esta misma entrada es la primera `propia`: aparece en el P4 hasta que la Auditora la revise.
- Verificado a mano (436): patron --revision propia queda en el registro; audit.js da el P4 revision-propia-pendiente (aparece con la línea de este cambio); 3 casos nuevos en probar-patron.mjs, todos ok
- Medición: `medir pipeline` (audit, lote chico): idéntico, el aviso no dispara sin líneas `propia`. Veredicto de infraestructura (`patron --sin-documentos`). Sin revisión independiente.

## Versión 1039 — fos patron --en-xhtml: el conjunto real de un cambio al lector de XHTML [439 · patron.mjs, probar-patron.mjs]

- `node tools/fos.mjs patron --en-xhtml "<regex>"` cuenta documentos y clubes sobre los `Clubes/**/*.xhtml` con el mismo umbral y el mismo veredicto; el registro anota el comando con `--en-xhtml`. Sobre el patrón del 413 (`top:[0-9.]+em`) cuenta hoy 18 documentos de 5 clubes.
- `probar-patron.mjs`: 4 casos nuevos (cuenta los `.xhtml` y no el `.md`, GENERAL y anotado, RECHAZADA bajo el umbral, sin regex).
- Verificado a mano (439): patron --en-xhtml cuenta sobre los .xhtml y da el veredicto; 4 casos nuevos en probar-patron.mjs (todos ok); sobre el patron del 413 cuenta 18 documentos de 5 clubes, no los 12 de 4 que dice el punto
- Medición: `patron.mjs` es una tool de orden (no del pipeline), así que `medir pipeline` no tiene nada que medir; la prueba da todos los casos ok.

## Versión 1038 — todo.mjs imprime el contexto del punto [442 · todo.mjs, probar-todo-contexto.mjs]

- `node tools/todo.mjs <id>` termina con «Contexto de este punto»: una ruta y una línea por cada propuesta, medición, votación (`auditoria-proceso.jsonl`), línea de `mediciones-pipeline.jsonl`, entrada del CHANGELOG con `[id]`, lista de lote y commit que lo nombra; `--sin-contexto` lo omite. Los importes parecidos (`1.420`) y «Versión 420» no cuentan.
- `tools/probar-todo-contexto.mjs` (repo de juguete, 7 casos) registrada como `fos probar todo-contexto`. Queda sin hacer: el aviso del hook `session-start` cuando el primer mensaje nombra un id.
- Verificado a mano (442): `todo.mjs 420` termina con su CHANGELOG y 7 commits; la prueba da todos los casos ok.
- Medición: `medir pipeline` (audit, lote chico): idéntico. Veredicto de infraestructura (`patron --sin-documentos`). Sin revisión independiente.

## Versión 1037 — fos indefinidos: eslint no-undef en el repo, y el primer nombre sin definir real [433 · indefinidos.mjs, eslint.config.mjs, audit.js, audit-chequeos-5.js, resolver-inventario.mjs, resolver-inventario-motores.mjs]

- `eslint` 10.13.0 y `globals` 17.13.0 como devDependencies de `tools/package.json` (17 MB en `tools/node_modules`, gitignoreado; `cd tools && npm install` en una carpeta nueva). `tools/eslint.config.mjs` con solo `no-undef`; `node tools/fos.mjs indefinidos [archivo…]` (1,5 s sobre 243 archivos); aviso P3 `nombre-sin-definir` en `audit.js` (no aparece sin eslint instalado).
- El primer pase encontró un error real: `resolver-inventario.mjs` usaba `BIG_CHUNK` (en un log del camino de documentos largos) sin importarlo, y `resolver-inventario-motores.mjs` no lo exportaba: un `ReferenceError` al procesar un documento de más de 40 páginas. Ahora se exporta y se importa.
- Verificado a mano (433): node tools/fos.mjs indefinidos: ningún nombre sin definir en 243 archivos; con un archivo de prueba con un nombre falso da exit 1 y audit.js muestra el P3; medir pipeline idéntico
- Medición: `medir pipeline` (audit y lote-ensayo, lote completo de 992 documentos): idéntico. Veredicto de infraestructura (`patron --sin-documentos`). Sección 7 recorrida por la misma sesión (aviso P3 que no frena nada): sin revisión independiente.

## Versión 1036 — SønderjyskE 2023 y 2025 cargados; votación del formato completo contra reducido [413]

- 2023 (15 meses al 30/09/2023, liga 1. División del día del cierre) y 2025 (formato completo, Superliga) cargados con su verificación; la cola se contestó con cita. Votación 3 a 0 (`Admin/mediciones/413-votacion-formato-completo-vs-reducido.md`): un club que pasa del balance reducido (§ 32) al completo carga ese año completo y los anteriores no se rehacen con el comparativo; regla nueva en `Admin/CONVENCIONES-DATOS.md` y línea en `Admin/registros/auditoria-proceso.jsonl`. El 2025 lleva una `publicNote` sobre el cambio de formato. Gasto total del punto: unos US$ 0,30.
- Verificado a mano (413): audit.js no da nada para sonderjyske-dk; 2023 y 2025 en data/dk/sonderjyske-dk.json con verificación y publicNote; votación 3 a 0 registrada
- Medición: no cambia ninguna tool en este paso (las tres anteriores, `xhtml-aarsrapport`, `periodo` y la regla de transición, están en sus entradas); `node tools/audit.js` ya no da `ejercicio-sin-rastro` para `sonderjyske-dk`.

## Versión 1035 — periodo.mjs: la fecha etiquetada en danés y el inicio sin caer al contexto [413 · periodo.mjs]

- El registro danés etiqueta el período del XHTML como «1. OKTOBER 2024» / «30. SEPTEMBER 2025» (`ixt:date-day-monthname-year-da`); `fechaIxbrl` solo leía meses en inglés sin punto tras el día, así que el inicio caía a la fecha del contexto (= el cierre) y SønderjyskE 2025 salía «otro, 0 meses» y no se cargaba. Ahora lee los meses daneses y el punto, y el inicio ya no cae al contexto (el contexto vale para el cierre, no para el inicio).
- Medición: `medir pipeline` (verificar, lote completo de 991 documentos): idéntico. SønderjyskE 2025 pasa a «anual, 2024-10-01 a 2025-09-30». Veredicto general (patrón: fechas con mes danés, proxy de los informes daneses).

## Versión 1034 — xhtml-aarsrapport: las celdas por coordenadas también en em (SønderjyskE 2025) [413 · xhtml-aarsrapport.mjs]

- Los informes que maqueta ParsePort (AGF, AaB, FC København PSE, SønderjyskE) dan `top`/`left` en `em`; el conversor solo reconocía `pt` y `px`, así que el estado de resultados salía con una cifra por línea, sin tabla, y localizar contestaba «sin estado de resultados». Ahora `posicionAbs` acepta `em` (1 em = 16 px) y, como esas páginas no traen contenedor con altura, una celda mucho más arriba que las ya juntas abre página nueva. SønderjyskE 2025: «| Nettoomsætning | 66.288.538 | 55.909.616 |».
- Medición: `medir pipeline` (medidor xhtml, todos los .xhtml de Clubes/): 12 documentos cambian, los 12 de em (AGF 4, AaB 3, København PSE 4, SønderjyskE 2025: líneas de 5343 a 2493 en AGF 2022, páginas ubicadas 98 % o más como antes); el resto, idéntico. Veredicto general (patrón: una cifra suelta por línea, 270 documentos de 82 clubes; el conjunto realmente afectado son esos 12). Los .md ya convertidos de los otros 11 no se rehicieron.

## Versión 1033 — costo-personal: la unidad del rótulo manda y la cifra exacta de la nota reemplaza a la redondeada [422 · costo-personal.mjs]

- Tres cambios en `costo-personal.mjs`: (1) `escalaDeRotulo`: la unidad entre paréntesis del rótulo de la fila («Total staff costs (£m)») manda sobre la del encabezado y la del documento; (2) `cifrasSeparadas`: «Staff costs 154,754 139,064» (dos importes pegados por el espacio) se lee como dos cifras, solo en las filas de personal; (3) `afinada`: si Jev elige la cifra redondeada de un cuadro de indicadores en £m y el documento tiene la fila de la nota «Staff costs» dentro del redondeo (±0,05 M o 1 %), se usa la exacta. Un arreglo en `filasDelMd` se descartó: cambiaba caja y deuda en 4 casos. La nota de una filial sigue atajada por el 15 % de ingresos.
- Verificado a mano (422): caja-deuda --personal --club fulham-gb: 2023 139.064 reconfirmado, 2024 154.754 y 2025 166.507 desde la nota; medir pipeline: 0 valores aceptados que cambian o se pierden
- Medición: `medir pipeline` (caja-deuda, caja-deuda-personal, audit, escribir idénticos; personal-ensayos: aceptados idénticos 156, que cambian 0, que se pierden 0, 20 nuevos validados por el vecino); Fulham 2023 se reconfirma (139,064) y 2024 y 2025 salen de la nota (154,754 y 166,507). Veredicto general (7 documentos de 2 clubes). Sección 7 recorrida por la misma sesión (no frena nada; un valor malo lo atrapa el vecino y el 15 %; lo cargado no cambia): sin revisión independiente.

## Versión 1032 — perímetro: la madre que no presenta su estado (s408) deja el del grupo [421 · perimetro-senales-a3.mjs]

- `proponer()`: si no hay tabla etiquetada «consolidado» ni «individual» y el documento dice que la madre no presenta su propio estado de resultados (Companies Act 2006, s408, con el nombre del estado a 300 caracteres), el paso A da `solo-consolidado` (Regla de perímetro 1 de `CONVENCIONES-DATOS.md`, antes aplicada a mano con un ajuste). Tercera y última parte del 421.
- Verificado a mano (421): Morecambe 2024-25 lee (4,892,287 ) en millones (medido en el lote completo); el aviso de Ross County dice sin-rubros; proponer() sobre los 104 .md con s408: Falkirk, Salford y Exeter pasan a consolidado, medido antes/después
- Medición: `proponer()` sobre los 104 .md con «section 408», antes y después: cambian 26, todos group accounts (Falkirk, Salford 2021-25, Exeter, Tranmere, Plymouth, Reading, Bolton, Blackpool, Chelsea, Aston Villa, Wolves, Brentford, Burnley, Mercedes) de solo-individual a solo-consolidado; el resto igual. `medir pipeline` (verificar y cargar, lote completo): idéntico, porque los ajustes manuales de perímetro mandan. Veredicto general (104 documentos). Sección 7 de la auditoría recorrida por la misma sesión (caso: Falkirk, Salford, Exeter; no frena; una mala propuesta la atrapa el tie-out; lo cargado no cambia; se corrige con un ajuste `perimetro`): sin revisión independiente.

## Versión 1031 — cargar.mjs: el aviso dice «sin-rubros» en vez de «correr el lote» [421 · cargar.mjs]

- Ross County 2024-25: el lote ya había corrido y el registro quedó `jev: sin-rubros` (4 rubros, menos de 5, y las sumas no cerraron contra el resultado impreso), pero `porQueNoListo` seguía diciendo «el registro no se actualizó: correr el lote». Ahora, si el registro dice `sin-rubros`, lo dice con la cantidad de rubros y manda a revisar las filas. Segunda de las tres partes del 421.
- Medición: lote completo (990 documentos), medidores cargar, audit y escribir: idéntico. Veredicto: `patron --sin-documentos` (solo el texto de un aviso).

## Versión 1030 — parseNumber lee «(4,892,287 )» en miles, no en unidades [421 · datos-sitio.mjs]

- `parseNumber` recorta el contenido entre paréntesis: «(4,892,287 )» (espacio antes del cierre, como lo deja el XHTML) tomaba la coma de miles por decimal y daba 4,89 en vez de 4.892.287. Patrón: 5 documentos de 4 clubes (Morecambe, Gent, AC Milan, Sport Recife). Primera de las tres partes del 421.
- Medición: lote completo (990 documentos), medidores cargar, audit, escribir, verificar, lote-ensayo y alta: idéntico salvo Morecambe 2024-25, que pasa de COLA (gastos 0,000914 M) a cerrar con el resultado impreso (gastos 5,800961 M, resultado −1,02345 M). Veredicto general.

## Versión 1029 — faltantes-liga no reescribe nada por un cambio de día [426 · faltantes-liga.mjs]

- Al escribir, compara cada `data/faltantes/*.js` y `pendientes.md` contra lo guardado sin la fecha («calculado»); si ninguno cambió ni sobra uno, no escribe y lo dice. Un cambio de día no mueve 66 archivos de `data/` ni dispara `asset-v-sin-subir`. `--check` ya comparaba con la fecha guardada. `FOS_HOY=AAAA-MM-DD` permite probar el cambio de día.
- Verificado a mano (426): FOS_HOY=2026-10-25 no escribe nada y --check da al día; con 2027-06-01 (entradas distintas) escribe los 66; audit idéntico
- Medición: `audit` lote chico idéntico; con `FOS_HOY=2026-10-25` no escribe nada y `--check` da «al día»; con `FOS_HOY=2027-06-01` (cambian entradas) sí escribe los 66 (restaurados). Veredicto: `patron --sin-documentos` (GENERAL, infraestructura).

## Versión 1028 — fos patron --sin-documentos: el veredicto de un cambio de infraestructura [435 · patron.mjs, probar-patron.mjs, pre-tool.mjs]

- `patron.mjs --cambio "…" --sin-documentos "por qué no lee documentos" --escribir` (en vez de `--patron`): el veredicto es GENERAL si el código agregado no nombra clubes, años ni rutas de `Clubes/` y la medición es idéntica o explicada; si nombra algo, RECHAZADA; sin medición, PENDIENTE. El registro lleva `sinDocumentos` (el motivo) y `patron: null`. El mensaje del hook de commit lo ofrece.
- Verificado a mano (435): probar patron 8 casos ok: sin documentos + sin nombres + medición idéntica da GENERAL; con un club o un año, RECHAZADA
- Medición: `probar patron` (8 casos ok, repo de juguete); `probar-pre-tool` sin cambios de casos; no es una tool del pipeline.

## Versión 1027 — medir pipeline: un medidor que no imprime nada no da «idéntico» [423 · medir-pipeline.mjs, probar-medir-pipeline.mjs]

- Si el ANTES y el DESPUÉS de un medidor no imprimen nada (o un solo renglón «0 archivos») ni escriben un archivo de salida, `medir-pipeline` dice `VACÍO: no midió nada`, corta el lote chico, sale con 1 y el resultado es «vacío: …» (el hook no lo acepta); con `--explicacion "por qué"` queda «1 diferencias, todas explicadas». El registro marca `vacio: true` en ese medidor.
- Verificado a mano (423): probar medir-pipeline 16 casos ok; salida de la última corrida de los 11 medidores de la tabla inspeccionada: ninguno vacío (xhtml 563 líneas)
- Medición: `probar medir-pipeline` 16 casos ok (2 nuevos); la última corrida anotada de cada medidor de la tabla (alta, audit, caja-deuda, caja-deuda-personal, cargar, contexto, escribir, lote-ensayo, personal-ensayos, verificar, xhtml) tiene salida: ninguno está vacío hoy.

## Versión 1026 — partir-fases: --envolver un script de nivel de módulo [430 · partir-fases.mjs, probar-partir-fases.mjs]

- La config acepta `envolver: { nombre, desde, comentario? }`: envuelve el flujo desde la línea `desde` en `[async ]function nombre() { … }`, la llama al final y calcula `funcStart`, `setupEnd` y `funcEnd`; `fases` y `--mapa` usan las líneas del original (la tool corre las del envoltorio). Va con `indentar: true`.
- Verificado a mano (430): envolver sobre git show 28881bd54e^:tools/lote.mjs da el mismo archivo (75465 bytes) que envolver-lote.mjs + partir-fases; probar-partir-fases ok
- Medición: sobre el `lote.mjs` de antes de la partición (`28881bd54e^`) el camino de un paso da el MISMO archivo, byte por byte (75 465 bytes), que el de dos pasos con el script del scratchpad; `probar-partir-fases` suma 3 casos de `envolver` (15 en total, todos ok).

## Versión 1025 — Prueba de partir-fases y lexico-js [429 · probar-partir-fases.mjs]

- `node tools/fos.mjs probar partir-fases`: parte una función de juguete en tres fases y compara con la entera (3 entradas). Casos: spread y `function*` como uso, `let` entre fases a `ctx.N`, plantilla multilínea con `indentar` (no se sangra), `await`, salida temprana, `--proxy`, `--mapa`, y los rechazos (corte en medio de un bloque, `return` sin `salidaTemprana`). Registrada en `fos-comandos.json` y `pipeline-tools.json`.
- Medición: 12 casos ok; no es una tool del pipeline.

## Versión 1024 — fos mapa: el fin de una función por sus llaves reales, y --corto [428 · mapa-codigo.mjs]

- Si la primera línea de una función deja un bloque abierto, `fos mapa` busca su cierre con la profundidad de llaves de `lexico-js.mjs` (strings, plantillas y regex incluidos) en vez de la sangría: un cuerpo sin sangría ya no da rangos de 3 a 8 líneas ni «?». `--corto` omite los tramos «·» de las funciones largas.
- Verificado a mano (428): mapa de los 239 archivos antes/después: solo cambian 3 rangos que estaban mal; prueba con cuerpo sin sangría da 2-9; --corto probado en faltantes-liga.mjs
- Medición: el mapa de los 239 archivos de `tools/` antes y después: 3 rangos cambian (`escribirPais` 55-64→55-66 en `estadio-sponsor.mjs`, `buildClubIndex` en `generate-club-index.js`, `texto` y `textoIndice` en `generate-sponsors.js`), los tres eran errores del cierre por columna 0 dentro de una plantilla; el resto idéntico, incluidos los 15 «?» de siempre; un archivo de prueba con cuerpo sin sangría da el rango 2-9 (antes 2-7).

## Versión 1023 — Comentarios de lote*.mjs: de 247 a 120 líneas, sin historia de lotes [427 · lote.mjs, lote-preparar.mjs, lote-leer.mjs, lote-final.mjs]

- `lote.mjs` 30→13 líneas de comentario, `lote-preparar.mjs` 73→36, `lote-leer.mjs` 91→45, `lote-final.mjs` 53→26: se dejó el porqué y la invariante de cada compuerta; se fueron las tablas de costo de la cabecera, los «Caso: lote N» / «to-do N» y los comentarios que repetían el código.
- Verificado a mano (427): lote*.mjs: 247 a 120 líneas de comentario, 0 coincidencias de Caso/lote N/to-do N/Versión N (grep), comparar-sin-comentarios --tools idéntico
- Medición: `comparar-sin-comentarios --tools`: mismo código en las 4 tools; `medir pipeline`: idéntico (solo comentarios).

## Versión 1022 — fos cerrar: un «Verificar: manual» se cierra con --verificado [425 · cerrar.mjs]

- `fos cerrar <id> --cerrar` ya no cierra un punto cuyo «Verificar:» es manual sin `--verificado "qué se miró y dónde quedó"`; con él cierra SIN `--forzar` (siguen todos los otros chequeos) y anota un bullet «Verificado a mano» en la entrada del CHANGELOG que lleva `[id]`, antes de su «Medición:». El ensayo muestra ✗ sin el motivo y ✓ con él. `--forzar` queda para lo descartado.
- Verificado a mano (425): ensayo sin motivo da ✗ y con motivo ✓ (2026-10-24, salida de fos cerrar 425); el cierre real de este punto usó el flag
- Medición: `fos medir pipeline`: ninguna tool del pipeline cambió (nada que medir); ensayos del comando sobre un punto manual con y sin `--verificado`; el cierre real del 425 lo usa.

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
