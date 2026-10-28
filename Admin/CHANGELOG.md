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

## Versión 1238 — sponsor-fka --buscar: --anios y --todos [478 · sponsor-fka.mjs, probar-sponsor-fka.mjs]
- `--buscar` acepta `--anios 2015-2022` (o `2015,2017-2019`) y `--todos`: busca esos años en FKA con Exa también si ya tienen entrada sólida, sin escribir `contexto-manual.json` (el subagente tenía que ponerle «una sola fuente por año» para que corriera). Sin opción sigue buscando los débiles. El brief de estadio-sponsor (`Admin/briefs-subagentes-siis.md`) usa `--todos`.
- Verificado a mano (478): Los 19 ítems hechos con su prueba y su entrada de CHANGELOG (1235 a 1252): cada uno replicado en copia descartable o con su prueba probar-*; mediciones de pipeline idénticas o explicadas (el 15: 2 diferencias de Wikipedia en un club, A/B de HEAD igual); 17 y 18 decididos por Guido (delegó) y escritos en liga-y-sponsor.md 0.5, ARQUITECTURA.md y los briefs; los tres scripts de Prototyping/defectos-463/ absorbidos y borrados; audit P0 0 P1 0 P2 0 (P3 10 como en el commit de partida)
- Medición: tool de «orden» (no del pipeline, no lee documentos): no pide medición; `probar-sponsor-fka.mjs` ok. La búsqueda real con Exa no se corrió (gasta).

---

## Versión 1255 — Caché de Wikipedia: las 19 páginas que faltaban (Austria, Dinamarca, Escocia, Noruega, Bélgica) y `sponsors.js` regenerado
- `tools/club-league-reference/contexto/{at,dk,gb,no,be}.json` con las 19 páginas de liga-año que `estadio-sponsor` bajaba en cada corrida sin guardarlas. `generate-sponsors.js` regenerado: 261 entradas sponsor-equipo-año nuevas (at-bundesliga 104, dk-1division 91, gb-scottishpremiership 66) y 31 sponsors nuevos; ASSET_V 2136.
- Comparado con el `sponsors.js` anterior: ninguna entrada existente se pierde ni cambia (0 de 0); solo se agregan. La de `be` trae una página de tercera división amateur sin estadios ni camisetas.
- Medición: sin tools cambiadas; auditoría P0 0 · P1 0 tras `publicar`.

---

## Versión 1254 — medir-pipeline: un medidor con `precalentar` baja lo que falte una vez antes del antes y del después [medir-pipeline.mjs, pipeline-tools.json, probar-medir-pipeline.mjs]
- Un medidor con `precalentar` en `pipeline-tools.json` corre ese comando una vez (con la tool editada) antes de las dos corridas; el antes y el después leen la misma caché y lo bajado se revierte al terminar el después. Avisa si quedan páginas «SIN PODER BAJAR». El medidor `contexto` lo usa: antes cada corrida bajaba por su cuenta y una descarga fallida en una sola daba diferencias falsas.
- Medición: `medir-pipeline.mjs` no es del pipeline (es el medidor): no pide medición; `probar-medir-pipeline.mjs` ok con 3 casos nuevos (idéntico con red inestable simulada, lo bajado se revierte, el precalentado corre una vez). No corrí el medidor `contexto` real con esto (baja de Wikipedia).

---

## Versión 1253 — estadio-sponsor: una falla de red ya no queda como «la página no existe»; probar-todas dice por qué falló una prueba [estadio-sponsor.mjs, estadio-sponsor-wikipedia.mjs, wikipedia-pagina.mjs, probar-todas.mjs, prueba-fallo.mjs, probar-pagina-wikipedia.mjs, probar-prueba-fallo.mjs]
- `pagina()` (ahora en `wikipedia-pagina.mjs`) devuelve la página, `null` solo si Wikipedia dice que no existe, o `{ falloRed }` si no pudo saberlo (HTML o 503 por límite de pedidos, corte): antes los dos últimos eran `null` y la falla se guardaba en el caché como página inexistente, sin reintento y con estadio y capacidad vacíos sin error. Una falla no se guarda; el ensayo imprime «N bajadas; M SIN PODER BAJAR (motivo)» y `--escribir` se niega mientras queden páginas sin bajar. `probar-todas.mjs` muestra, al fallar una prueba sin líneas `MAL`, la cola de su salida y el código (`prueba-fallo.mjs`). Pruebas nuevas.
- Medición: lote completo con 11 diferencias explicadas (medidor contexto: páginas que una corrida u otra no pudo bajar; sobre el mismo caché completo, `HEAD` y la versión nueva dan la misma salida en los 1564 ejercicios). Dato para decidir aparte: el caché versionado no tiene 19 páginas (at, dk, gb, no) y bajarlas cambiaría `data/sponsors.js`; no se commitearon.

---

## Versión 1252 — patrones-tools.json: toda tool del pipeline con su entrada, y un chequeo [478 · patrones-tools.mjs, patrones-tools.json, clasificar-tools.mjs, cerrar-tool.mjs, patron.mjs, probar-patrones-tools.mjs]
- Las 40 tools del pipeline que no tenían entrada en `tools/patrones-tools.json` la tienen: 11 con `sinDocumentos` (siis-estado, audit.js, gestiones-tanda, etc.) y el resto con `porCambio` (lee documentos: el patrón se pasa con cada cambio; no se inventaron regex). `clasificar-tools.mjs --check` (el que corre `audit.js`) avisa una tool del pipeline sin entrada; `cerrar-tool` y `patron` distinguen «sin entrada» de «leen documentos» en su mensaje. `probar-patrones-tools.mjs` nueva; `probar-patron.mjs` espera el mensaje nuevo.
- Medición: lote chico idéntico (medidor audit); veredicto GENERAL; sin revisión independiente (chequeo nuevo en audit.js).

---

## Versión 1251 — estadio-sponsor --ensayo --anios: una tabla año por año [478 · estadio-sponsor.mjs, estadio-sponsor-anios.mjs, probar-estadio-sponsor-anios.mjs, prueba-escribir.mjs]
- `node tools/estadio-sponsor.mjs --ensayo --club <id> --anios AAAA-AAAA` (o `2016,2018-2020`) imprime una fila por año con estadio, capacidad, sponsor y marca, marca el año con algo en 0 % y cada fila es la llamada suelta de ese año (`--anio`): igual a las siete llamadas del brief. El brief de estadio-sponsor (commit de texto aparte) usa una sola llamada. `prueba-escribir.mjs` reintenta hasta 3 veces el paso de `catalogo-liga` cuando su propuesta (que sale de Wikipedia) vuelve incompleta: fallaba al azar dentro de `cerrar-tool`.
- Medición: lote completo con 2 diferencias explicadas (medidor contexto: `rapidwien-at` 2013, 2015, 2016 y 2023 traían capacidad y marca de Wikipedia en el «antes» y no en el «después»; el ensayo dice «1 páginas para bajar»; en una copia la versión de HEAD y la nueva dan lo mismo para ese club; el cambio solo agrega `--anios`, que sale antes de leer nada); veredicto GENERAL.

---

## Versión 1250 — listas-lote --lote: el resumen cuenta solo los liga-años del lote [478 · listas-lote.mjs, listas-lote-resumen.mjs, probar-listas-lote-resumen.mjs]
- Con `--lote`, «listas-lote: N de M liga-años pasaron la compuerta» cuenta solo los liga-años de los documentos de la lista (marca `delLote`); los de otros clubes (el modo de siempre que se suma) van aparte, como «(además…)» y «  (fuera del lote) NO:», que `lote-final.mjs` no muestra. Ya no sale `be-div1amateur 2013` en un lote colombiano. La descarga de listas no cambia (se procesan los mismos liga-años). Sin `--lote` el resumen es el de siempre.
- Medición: lote completo idéntico; veredicto GENERAL; sin revisión independiente (aviso nuevo en la salida).

---

## Versión 1249 — gestiones: una fecha de inicio solo de mes; Ruiz (Envigado) confirmado [478]
- Decidido por Guido (que delegó la decisión): inicio solo de mes = día 01 y `confirmada:true` si la fuente nombra el mes y ningún cierre cae dentro de ese mes (el día no cambia qué gestión cubre un cierre); si uno cae, `confirmada:false` y se pregunta. Escrito en `Admin/ARQUITECTURA.md` («Gestiones», con el caso) y en el brief de gestiones (commits de texto aparte). Ramiro Ruiz (desde octubre de 2013, cierres 2016 a 2024) pasa a confirmado en `data/gestiones/co.js`; `gestiones-tanda --armar --escribir` cerró las 9 preguntas (cada cierre cae en exactamente una gestión) y `publicar` regeneró el sitio (ASSET_V 2135). Ojo: 2017, 2019 y 2021 a 2023 siguen siendo continuidad sin nota fechada propia (la nota de su salida dice «llevaba varios años al frente» y ninguna fuente nombra otro presidente); queda escrito en la `fuente` por si Guido prefiere revertir.
- Medición: datos y texto; no cambia ninguna tool.

---

## Versión 1248 — criterio del sponsor del frente: una ficha de FKA de la camiseta local alcanza [478]
- Decidido por Guido (que delegó la decisión): una ficha de Football Kit Archive de la camiseta LOCAL de la temporada con el campo Sponsor lleno alcanza sola como respaldo del frente (FKA no escribe «frente»); una nota de prensa que diga «principal» se suma si aparece, sin exigirla. Queda en `liga-y-sponsor.md` 0.5 (commit aparte) y el brief de estadio-sponsor lo repite, sin la promesa «ningún sponsor queda débil», y pide separar los años respaldados SOLO por FKA.
- Medición: solo texto; no cambia ninguna tool.

---

## Versión 1247 — cola.mjs --ids: la misma respuesta a varios casos [478 · cola.mjs, probar-registros.mjs]
- `node tools/cola.mjs --ids a,b,c aceptar --nota "…" --evidencia … --seguridad … --causa …` guarda una respuesta con esquema por caso (cada uno pasa por las compuertas de `--responder`). Todo o nada: antes de escribir valida que cada id exista y que estén las tres opciones; sin ellas no guarda ninguna. Absorbe `Prototyping/defectos-463/responder-nacional.mjs` (borrado). Tres casos nuevos en `probar-registros.mjs`.
- Medición: lote completo idéntico (cargar, cargar-cola-vacia, audit, escribir, verificar, lote-ensayo, alta); veredicto GENERAL; sin revisión independiente.

---

## Versión 1246 — fos reexpresion: por par de años de SIIS, reexpresión real o una fila [478 · reexpresion.mjs, probar-reexpresion.mjs, fos-comandos.json]
- `node tools/fos.mjs reexpresion "<Club>" [desde hasta]` absorbe `Prototyping/defectos-463/reexpresion.mjs` y `diff-fila.mjs` (borrados): por par (Y, Y+1) lista los rubros que difieren entre el corte de Y y el «año anterior» de Y+1, si el resultado coincide y si el par es REEXPRESIÓN, una FILA de lado `otro` idéntica en los dos estados (con su etiqueta) o solo redondeo (hasta 5 miles). Sobre Atlético Nacional: 2015/2016 y 2018/2019 reexpresión; 2019/2020, 2020/2021, 2023/2024 y 2024/2025 la fila «Otras ganancias (pérdidas)»; también la marca en 2021/2022 y 2022/2023 (verificar no las abrió: ahí las cifras de SIIS son las mismas y las dos comparaciones la contaron igual).
- Medición: tool de «orden» (no del pipeline, solo lee): no pide medición; `probar-reexpresion.mjs` ok.

---

## Versión 1245 — dictamenes-md --mistral: los escaneos por Mistral en un comando [478 · dictamenes-md.mjs, dictamenes-mistral.mjs, probar-dictamenes-mistral.mjs]
- `dictamenes-md.mjs "<Club>" --mistral` pasa por Mistral OCR los dictámenes escaneados (sin texto nativo y sin `.md`), imprime el costo de cada uno y el total, y vuelve a correr la revisión de la firma. Sin el flag solo avisa cuántos son y cuánto costaría (~US$ 0,014 cada uno): no gasta. `probar-dictamenes-mistral.mjs` usa un runner falso; la llamada real a Mistral no se corrió.
- Medición: tool de «orden» (no del pipeline): no pide medición; la prueba ok.

---

## Versión 1244 — fos cerrar: un flag desconocido frena con 1 [478 · cerrar.mjs, args-desconocidos.mjs, probar-cerrar.mjs]
- `node tools/fos.mjs cerrar 401 --escribir` ya no corre en ensayo sin decirlo: sale con 1 y «Argumento desconocido: --escribir (¿--cerrar?)». Módulo `args-desconocidos.mjs` (el mismo aviso que `medir-pipeline.mjs`) y `probar-cerrar.mjs`.
- Medición: tool de «orden» (no del pipeline): no pide medición; `probar-cerrar.mjs` ok.

---

## Versión 1243 — lookup-club-league pasa a .mjs: sin el aviso MODULE_TYPELESS_PACKAGE_JSON [478 · lookup-club-league.mjs, alta-club-escribir.mjs, fetch-club-league-reference.mjs, con-worktree.mjs, probar-lookup-club-league.mjs]
- `tools/lookup-club-league.js` → `.mjs` (la salida ya no trae el aviso de Node); los llamadores (`club-siis`, `alta-club-escribir`, `fetch-club-league-reference`, `prepare-onboarding`, eslint, `audit-acciones.json`) y los documentos vivos apuntan al nombre nuevo; el aviso de «NO EXACTA» ya no nombra un club. `con-worktree.mjs` borra de la copia las tools que ya no existen en este árbol (la copia conservaba la `.js` vieja de HEAD y `prueba-escribir` fallaba por `tool-sin-clasificar`). Prueba nueva `probar-lookup-club-league.mjs`.
- Medición: lote completo idéntico (alta, cargar, lote-ensayo); veredicto GENERAL; sin revisión independiente. Defecto visto: `medir-pipeline.mjs` aborta con un renombre en el índice de git (`R a -> b`); hay que dejarlo sin marcar.

---

## Versión 1242 — club-siis: la ruta de la lista y --brief --texto [478 · club-siis.mjs, probar-club-siis.mjs]
- 14: `--crear-lista` y `--avanzar` imprimen «Lista: Admin/lotes/lote-NNN.txt» y el comando del lote con esa ruta; el estado del club usa la ruta de su lista en lugar de `<lista>`. 16: `--brief X --texto` imprime solo el brief (sin el encabezado de reglas del país), listo para pasarlo a un subagente; el aviso «LANZÁ JUNTOS» ya lo nombra. Las dos van en un commit porque tocan las mismas líneas de `club-siis.mjs`.
- Medición: tool de «orden» (no del pipeline): no pide medición; `probar-club-siis.mjs` ok (los dos casos nuevos en una copia descartable).

---

## Versión 1241 — club-siis --avanzar: ensayo por defecto, --escribir lo aplica [478 · club-siis.mjs, club-siis-preparar.mjs, probar-club-siis.mjs]
- `--avanzar` sin `--escribir` solo dice qué haría (el árbol queda igual; antes fijaba categorías en la cola, creaba la lista del lote y corría el inventario aunque pareciera un ensayo); `--escribir` lo aplica y `--ejecutar` sin `--escribir` se niega (sale con 1). `--ensayo` sigue valiendo. Mensajes y `Admin/paises/co.md` dicen lo mismo; ninguna skill ni `PIPELINE.md` nombra `--avanzar`.
- Medición: tool de «orden» (no del pipeline): no pide medición; `probar-club-siis.mjs` ok (el escenario con años por cargar no se pudo armar: todo Nacional está cargado, la prueba comprueba el modo y el árbol intacto).

---

## Versión 1240 — club-siis --liga: escribe la línea de liga de un club [478 · club-siis.mjs, liga-decidir.mjs, probar-club-siis.mjs]
- `node tools/club-siis.mjs "<Club>" --liga` completa en `data/club-leagues/<iso>.js` los años sin liga con la del roster cacheado de Wikipedia, solo si TODOS tienen coincidencia exacta (las «NO EXACTA» se descartan, p. ej. «Atlético» de la Primera B no es Atlético Nacional); con un año dudoso no escribe ninguno y dice cuáles; `--ensayo` no escribe. Imprime que después va `publicar.mjs` y el commit en otra llamada. En una copia sin las líneas de Envigado y Nacional las reescribe con el mismo contenido que HEAD (cambia solo la posición en el archivo: queda al final).
- Medición: tool de «orden» (no del pipeline): no pide medición; `probar-club-siis.mjs` ok (8 casos).

---

## Versión 1239 — club-siis: el paso de la liga avisa que falta publicar antes de commitear [478 · club-siis.mjs, probar-club-siis.mjs]
- El paso «Liga de cada año» dice que después de tocar una liga va `node tools/publicar.mjs` y el commit en OTRA llamada (el hook frenaba por `rankings-desfasado` y `asset-v-sin-subir`). `probar-club-siis.mjs` (copia descartable) lo comprueba; cada ítem siguiente del 478 que toque `club-siis.mjs` suma su caso ahí.
- Medición: tool de «orden» (no del pipeline): no pide medición; pruebas de lo que cambió ok.

---

## Versión 1237 — club-siis: el subagente de gestiones se lista al principio si un cierre no tiene gestión confirmada [478 · club-siis.mjs, gestion-cubre.mjs, probar-gestion-cubre.mjs]
- «LANZÁ JUNTOS» incluye `gestiones` si algún cierre 31/12 de los años por cargar no cae en exactamente una gestión confirmada de `data/gestiones/<iso>.js` (la misma regla de `cargar.mjs`) y dice qué años; antes bastaba con que existiera la clave del club (Envigado tenía la de Ruiz sin confirmar y las 9 preguntas aparecieron con el lote ya corrido). Con todos los años cargados no lista nada, como antes. Módulo `gestion-cubre.mjs` con su prueba.
- Medición: tool de «orden» (no del pipeline, solo lee): no pide medición; pruebas de lo que cambió ok.

---

## Versión 1236 — verificar: una fila de lado otro idéntica en dos documentos vecinos es «presentación distinta» [478 · verificar-cierre.mjs, diferencia-de-fila.mjs, probar-diferencia-de-fila.mjs]
- La decisión «la diferencia de ingresos es exactamente una fila» pasa a `diferencia-de-fila.mjs`: además de una fila de gasto, vale una fila de lado `otro` con la misma etiqueta y el mismo importe del año comparado en los dos documentos (Atlético Nacional, «Otras ganancias (pérdidas)»). Una reexpresión real (la diferencia no es una fila) sigue abriendo la pregunta. En copias con la cola sin los casos de Nacional: 2024/2025 pasa a «presentación distinta», los dos casos reabiertos se cierran y 2015/2016 sigue abriéndose.
- Medición: lote completo idéntico (verificar); veredicto GENERAL (62 documentos de 23 clubes); sin revisión independiente (condición nueva en verificar).

---

## Versión 1235 — siis-estado y lote: un año de SIIS sin filas se avisa y no se cotiza [478 · lote-leer.mjs, siis-estado.mjs, siis-filas.mjs, probar-siis-filas.mjs]
- `siis-estado.mjs` lista los años que quedaron con el `.md` escrito pero sin `.filas.json` («N escritos: M con filas, K sin filas (2016, …)») y sale con 1; `lote.mjs` (lote-leer) no localiza, extrae ni cotiza un `siis-estado-AAAA.pdf` sin filas: dice el comando que las arma, costo 0. Módulo nuevo `siis-filas.mjs` con su prueba (`probar-siis-filas.mjs`). Replicado en una copia con `difImporteLibros` fuera de CLASE: sale con 1 y lista 2016.
- Medición: lote completo idéntico (lote-ensayo y verificar); sin revisión independiente (condición nueva: aviso y salida distinta de 0).

---

## Versión 1234 — Envigado (2016 a 2024) y Atlético Nacional (2015 a 2024) desde SIIS: 19 club-años [463 · envigado-co, atlnacional-co]
- Estados de SIIS, liga (Primera A todos los años), estadio, marca y sponsor (subagentes Sonnet; Exa/FKA), dictámenes de Nacional (5 escaneos por Mistral, US$ 0,07), lote de categorización (US$ ~0,55) y carga: un commit por año, `audit.js` P0/P1 en 0 al escribir cada uno y al final (P3 9, como antes). Envigado gestión de Ruiz y sponsor 2018 a 2022 (solo FKA) quedan débiles; ver el TODO 463.
- La cola, contestada con el motivo de cada fila: «Entretenimiento y esparcimiento» a `other_income` (importe redondo anual, sin que el documento diga qué es), «Flota y equipo de transporte» a `admin_general_expense` (4 respuestas del país); 14 casos de `verificar` de Nacional aceptados: cuatro pares (2019 a 2025) difieren exactamente por la fila «Otras ganancias (pérdidas)», idéntica en los dos estados, y dos (2015/2016, 2018/2019) son reexpresiones de SIIS sin cambio del resultado. «Costo de ventas» (76 a 83 % de los gastos) y «Gastos de ventas» de Nacional a `lump_football_operations_expense` por la regla escrita de Colombia.
- Medición: la tool cambió una sola vez (CHANGELOG 1233, idéntico); el resto es carga de datos. Sin revisión independiente de la Auditora.

## Versión 1233 — siis-estado: dos partidas de otro resultado integral en 0 ya no frenan el armado de filas [463 · siis-estado.mjs · atlnacional-co]
- `siis-estado.mjs` dejaba un año sin filas armadas («rubros de SIIS sin clase en CLASE: gananciaPerdidaAcumulada, difImporteLibros») cuando SIIS lista esas dos partidas, que Atlético Nacional informa en 0 en 2016, 2021, 2022 y 2023; el resumen decía «Escritos N año(s)» igual. Ahora entran como fila `otro` (precedente: `gananciasPerdidasDifCostoAmortizado`): si valieran distinto de 0 no están en ninguna compuerta y el .md las muestra para la verificación.
- Medición: idéntico (`siis` y `verificar`, lotes chico y mediano). Sin revisión independiente de la Auditora.

## Versión 1232 — La Equidad: la línea «Gastos de administración» sin desglose, que `prueba-escribir` había detectado [476 · sin-desglose-tipo.mjs · laequidad-co]
- `sin-desglose-tipo.mjs --pais co --escribir` en los datos reales agregó a `data/co/laequidad-co.json` una entrada de `no_breakdown` («Gastos de administración», 24.415,721, `other`) que faltaba; ensayo antes y después (0 por completar). El resto del JSON no cambió salvo `exported_at`. `publicar` subió `ASSET_V` 2110 a 2111 y regeneró las páginas.
- Medición: la regla la comprobó `audit.js` (P0 0 · P1 0 · P2 0 · P3 9, igual que antes); la tool no cambió (sin medición de tools).

## Versión 1231 — 401: la prueba de escritura cubre las últimas cuatro tools y el punto se cierra [401 · prueba-escribir.mjs]
- `prueba-escribir.mjs` suma `siis-estado --club --escribir` (baja Tolima 2025 de SIIS, imprime el PDF con Chrome y deja json, md y filas iguales a los de HEAD salvo las fechas; de paso ejercita `armar-a-mano`), `texto-propio-a-md --escribir` (rearma la página 8 de SønderjyskE 2024; el `.md` anterior tiene que quedar guardado idéntico) y `catalogo-liga --escribir` (se saca `cy-seconddivision` de la copia y la tool tiene que volver a escribir la misma línea). Las tres con red; sin ella lo dicen y siguen.
- `bfo-rusia-notas --ejecutar` llama a la API de pago: va detrás de `node tools/prueba-escribir.mjs --con-api` (~US$ 0,10 por corrida, tope de US$ 1 en la prueba; copia la clave a la copia descartable, que se borra). Las 4 tablas de Krasnodar 2025 salen con las mismas sumas que las de HEAD. `escriben_sin_prueba` queda vacío y `bfo-rusia-notas` mide con `escribir`.
- Gasto de API de la sesión: US$ 0,32 (3 llamadas de ~0,10).
- Verificado a mano (401): prueba-escribir.mjs corre las 24 tools que escriben en una copia descartable (node tools/prueba-escribir.mjs, salida 0; bfo-rusia-notas con --con-api, salida 0); cerrar-tool corre las pruebas de lo que cambio; escriben_sin_prueba vacio en tools/pipeline-tools.json
- Medición: sin tools del pipeline cambiadas (`cerrar-tool` corrió las 2 pruebas de lo tocado: ok). Sin revisión independiente de la Auditora.

## Versión 1230 — 401: `bfo-rusia --escribir` no escribía ningún año (revertía por `ingreso-sin-base`) y la prueba de escritura lo recarga contra HEAD [401 · bfo-rusia.mjs, prueba-escribir.mjs]
- `bfo-rusia.mjs` armaba el ejercicio sin `baseIngreso` (el punto 455 lo exige; `cargar-ejercicio.mjs` sí lo pone): `audit.js` daba P1 `ingreso-sin-base` y la escritura se revertía entera, con salida 0 (parecía que andaba). Ahora usa `baseDeIngreso` (la regla de `cargar-ejercicio` y de `fos ingreso-base`). Lo encontró la prueba nueva de `prueba-escribir`: saca Krasnodar 2025 de una copia descartable, lo recarga y lo compara con el de HEAD (igual, salvo caja y deuda, que completa `caja-deuda`, y un `included_in` vacío).
- `prueba-escribir.mjs` suma `bfo-rusia --escribir` (copia los `bfo-*-datos.json` de la carpeta principal porque git los ignora; sin ellos lo dice y sigue) y `siis-estado --inventario --escribir` (con red). Quedan en `escriben_sin_prueba`: `bfo-rusia-notas` (solo escribe con la API de pago) y la bajada de un club de `siis-estado`.
- `bfo-rusia.mjs` pasa en `pipeline-tools.json` del medidor `cargar` con familia Rusia a `escribir`: no hay documentos rusos con verificación en los lotes, así que el medidor `cargar` nunca pudo ejercitarla.
- Medición: `escribir`, lote chico: 3 diferencias, todas explicadas (el antes falla en `bfo-rusia` por `ingreso-sin-base`; el después pasa). Pruebas de lo tocado: 2 ok. Sin revisión independiente de la Auditora.

## Versión 1229 — 401: `cerrar-tool` corre las pruebas de lo que cambió y la prueba de escritura suma `caja-deuda --club`, `cargar-lote` y cinco tools más [401 · prueba-escribir.mjs, pruebas-de-tool.mjs, cerrar-tool.mjs, probar-todas.mjs, medir-pipeline.mjs, audit-chequeos-4.js, probar-pruebas-de-tool.mjs, probar-medir-pipeline.mjs]
- `pruebas-de-tool.mjs` elige las pruebas de lo que cambió (las que lo nombran o nombran a una tool que lo importa) y `cerrar-tool` las corre antes de medir con `probar-todas --solo`: una prueba rota ya no espera los 14 días de `prueba-sin-correr`. El freno por «sin patrón» va antes (segundos). `prueba-escribir.mjs` entra en `fos probar`; `medir-pipeline` no se frena por un `pruebas-corridas.json` sin commitear (caso nuevo en `probar-medir-pipeline`).
- `prueba-escribir.mjs` suma `caja-deuda --club` (a PAOK 2025 se le saca la caja y vuelve igual; sin el arreglo de `8aa20e1029` sale 13, «unsettled top-level await»), `cargar-lote` (SønderjyskE 2025 se recarga idéntico al de HEAD) y `reglas-pais`, `glosas-etiquetas`, `ingreso-base`, `estimar` y `sin-desglose-tipo`. Corre con `FOS_MIDIENDO=1` en la copia descartable (si no, `exigir-medida` la frenaba justo cuando `cerrar-tool` la corre).
- `sin-desglose-tipo --escribir` sobre HEAD todavía agregaba 1 línea a La Equidad; se resolvió en los datos reales (CHANGELOG 1232).
- Medición: idéntico (`audit`, lote chico; `audit-chequeos-4.js`). Pruebas de lo tocado: 6 ok. Sin revisión independiente de la Auditora.

## Versión 1228 — Los encabezados del cierre de turno viven en PLANTILLA-SESION, no en el prompt [hooks/session-start.mjs]
- `Admin/PLANTILLA-SESION.md` tiene una sección «Cierre de cada turno» con los cinco encabezados fijos y su orden (leí en vano, qué pudo haber impreso la tool, te toca a vos, to dos, en curso); el aviso de arranque de la sesión la nombra. Antes estaban solo en el prompt pegado y una sesión nueva no los conocía.
- Medición: sin cambio de tools del pipeline (`probar-session-start.mjs` ok).

## Versión 1227 — TODO con HECHO y PENDIENTE, `fos ayuda`, `&` rechazado y las pruebas que nadie corría [todo.mjs, audit-chequeos-4.js, fos.mjs, probar-todas.mjs, probar-patron.mjs, probar-votacion-nueva.mjs · hooks/pre-tool.mjs]
- `todo.mjs`: un punto con ítems `- [x]` hecho y `- [ ]` pendiente muestra `[2 de 5 hechos]` en la lista y abre con HECHO y PENDIENTE antes del cuerpo; `audit.js` da `todo-todo-hecho` (P3) si todos están hechos y el punto sigue abierto. 463 y 476 ya usan ítems; la cabecera de `Admin/TODO.md` lo explica.
- `fos ayuda <tool>` (y `fos <cmd> --ayuda`) imprime el USO de la cabecera sin correr nada; el hook de Bash rechaza `node tools/<x> --ayuda|--help` y manda ahí, y rechaza un `&` al final (usar `run_in_background`). `probar-pre-tool.mjs` 111 casos, todos ok.
- `node tools/probar-todas.mjs` (`fos probar`) corre las 16 pruebas y anota cuándo pasó cada una en `Admin/registros/pruebas-corridas.json`; `audit.js` da `prueba-sin-correr` (P3) si una falló, no figura o lleva 14 días sin correr. Al correrlas aparecieron dos rotas: `probar-patron.mjs` (no copiaba `patrones-tools.mjs` ni su `.json`, y su caso esperaba un PENDIENTE que ahora es un error) y `probar-votacion-nueva.mjs` (suponía que toda votación unánime es DECIDIDO; la del 414 fue A GUIDO por cambiar 12 años cargados). Las 16 pasan.
- Medición: idéntico (`audit`). Sin revisión independiente de la Auditora.

## Versión 1226 — `tool-grande` a 60 KB, medir-pipeline rechaza argumentos desconocidos, cerrar-tool ignora tools sin cambios y la prueba del medidor, rota, arreglada [audit-chequeos-2.js, medir-pipeline.mjs, cerrar-tool.mjs, probar-medir-pipeline.mjs]
- `tool-grande` (P3) pide partir una tool desde los 60 KB, no desde los 40: 14 tools estaban entre 34 y 39 KB y `cola.mjs` a 22 bytes del tope, así que cada línea nueva obligaba a mudar código y a medir de nuevo. El aviso de lectura entera a los 30 KB (hook) queda; `CLAUDE.md` y `CONVENCIONES.md` lo dicen igual (commit aparte).
- `medir-pipeline.mjs` frena con «Argumento desconocido» (antes `--ayuda` arrancaba una medición entera); `cerrar-tool --tools` ignora las tools sin cambios contra HEAD y lo dice (una sin cambios hacía fallar el veredicto con «falta la medición con la huella actual»).
- `probar-medir-pipeline.mjs` llevaba rota desde que `medir-pipeline` y `patron` ganaron `duraciones-lib.mjs` y `patrones-tools.mjs` (no los copiaba al repo de juguete): 19 casos MAL antes de tocar nada; ahora todos ok, con un caso nuevo del argumento desconocido. Nadie lo notó porque no lo corre ningún chequeo.
- Medición: idéntico (`audit`, lote chico; `audit-chequeos-2.js` es módulo de `audit.js`). Sin revisión independiente de la Auditora.

## Versión 1225 — Lo hecho de los pendientes del 463 y el 476, al CHANGELOG [477]
- Tigres 2016 y 2017 quedan como «Costo de ventas» en otros gastos; los clubes sin `official_totals` ya no existían; sponsors de Real Cartagena, Atlético FC, Tigres y Cortulua verificados en FKA; caja y deuda de SIIS en 19 clubes (`siis-caja-deuda.mjs`); Cúcuta 2016 caja de 64 miles de pesos; Δ % con tope en Finanzas multi-año; `auditAll()` sin diferencias; `brandColor` de los cuatro clubes nuevos (`fos color-club`, y `lookup-brand-color.js` lo llama); estadio de Orsomarso 2025 en Yumbo y fin de la gestión de Issa el `2026-01-01` por decisión de Guido.
- El analizador de filas de `caja-deuda` descarta un entero de 1 a 99 en la primera columna por parecer un número de nota: 14 de 9.512 filas de los estados de SIIS, una sola de caja o deuda (Cúcuta 2016); no se toca. El 476 queda con lo que falta, una línea cada uno.
- Medición: sin cambio de tools en esta entrada.

## Versión 1224 — lookup-brand-color.js corre color-candidatos cuando el club no está en footylogos [lookup-brand-color.js]
- Sin coincidencias en las tablas de footylogos, `node tools/lookup-brand-color.js "<club>"` (la corrida a mano, no la de `--json` que usa `alta-club`) imprime a continuación los candidatos de la Wikipedia del país (`color-candidatos.mjs`, gratis; `--gemini` aparte). Es lo que hizo `fos cerrar-tool`: ensayo, medición y veredicto en orden, por primera vez de punta a punta en esta sesión.
- Medición: idéntico (lote completo; `lookup-brand-color.js` es módulo de `alta-club.mjs`). Sin revisión independiente de la Auditora.

## Versión 1223 — color-candidatos (brandColor de los cuatro clubes nuevos), cerrar-tool a la vista en los hooks y aviso de directorio de trabajo [463, 476 · color-candidatos.mjs · cucutadeportivo-co]
- `tools/color-candidatos.mjs` (`fos color-club "<Club>" [--gemini]`): la capa 1 de `club-nuevo.md` por programa para un club que footylogos no tiene: artículo de la Wikipedia en su idioma (la API de búsqueda), colores con hex, apodo, y con `--gemini` la camiseta local con fuentes. Probado: Exa trae las páginas pero no hace falta, Firecrawl no está configurado, teamcolorcodes no tiene estos clubes. `brandColor` puestos: Orsomarso `#1D4DF3`, Atlético Huila `#FFF200`, Barranquilla FC `#ED1C24`, Bogotá FC `#FFE217` (la plantilla de la camiseta local de es.wikipedia), con su procedencia en `Admin/sourcing/Colombia/`.
- Hooks: la edición de una tool del pipeline y el rechazo del commit nombran `fos cerrar-tool` (antes `medir-pipeline.mjs` suelto, y el aviso de arranque listaba `medir` y `patron` por separado, de ahí que se olvidara); `pre-tool.mjs` frena un Bash cuando la shell quedó en una subcarpeta del proyecto por un `cd` anterior y dice cómo volver. `probar-pre-tool.mjs` 102 casos y `probar-post-tool.mjs` 20, todos ok.
- Cúcuta 2016: la caja es 64 miles de pesos (Nota 5 del PDF, p. 11, y SIIS: el 1,871 es la columna 2015); ajuste manual y la proporción de `audit.js` silenciada con motivo. Medición: sin cambio de tools del pipeline.

## Versión 1222 — Barranquilla FC y Bogotá FC (2016 a 2025) desde SIIS; Δ % con tope en Finanzas multi-año [463, 476 · barranquillafc-co, bogotafc-co]
- Los dos clubes cargados por `club-siis.mjs` (alta, estados, dictámenes, tres subagentes cada uno, lote con un commit por año), con la línea del auditor (sin salvedades en los 12 años), caja y deuda de SIIS y ligas en Primera B (el roster de Wikipedia los nombra «Barranquilla» y «Bogotá»). Un aviso `dictamen-fechas-ajenas` de Barranquilla 2020 queda silenciado con motivo (errata del original: el dictamen es del 20-2-2021). Faltan su `brandColor`, sponsors fuertes y las gestiones con nota propia por año (TODO 476).
- `js/finanzas-multi.js`: el Δ primero→último con un año base casi en cero muestra el tope «>+1.000%» en vez de +38.046 % (Águilas Doradas, Estadio); verificado a 375 px, sin scroll horizontal de la página. `auditAll()` en el navegador: 344 clubes, 4.391 chequeos, 0 que no cierran.
- Medición: sin cambio de tools en esta entrada.

## Versión 1221 — cola.mjs --corregir-categoria no repite una respuesta ya fijada; TODO 463 achicado, sus pendientes al 476 [463, 476 · cola.mjs, cola-corregir-categoria.mjs]
- `node tools/cola.mjs --corregir-categoria` (lo que `club-siis --avanzar` corre en cada pasada) agregaba otra respuesta idéntica cada vez; ahora dice «Ya estaba fijada (id)» y no escribe. La lógica salió a `tools/cola-corregir-categoria.mjs` (`cola.mjs` había pasado los 40 KB con el cambio).
- El punto 463 del TODO queda con los clubes que faltan cargar; sus pendientes de lo ya cargado (gestiones, sponsors, dictámenes, pantallas, skills, cositas del 461) pasan al punto nuevo 476 sin cambiar de contenido.
- Medición: idéntico (lote chico: `cargar`, `cargar-cola-vacia`, `audit`, `escribir`, `verificar`, `lote-ensayo`, `alta`). Sin revisión independiente de la Auditora.

## Versión 1220 — Hook de fin de turno: no bloquea con trabajo en segundo plano sin terminar [hooks/stop.mjs]
- `tools/hooks/stop.mjs` mira el transcript: un subagente (`agentId:`) o un comando con `run_in_background` (`running in background with ID:`) sin su `<task-notification>` de fin deja el cierre pasar sin decir nada (los archivos sin commitear son su salida en curso). Los monitores de espera no cuentan. Antes avisaba a cada rato mientras los subagentes escribían. Sin transcript sigue como antes.
- Medición: `probar-stop.mjs` 12 casos, todos ok (4 nuevos). Un comando en segundo plano que se mata sin aviso deja el hook en silencio hasta que termine la sesión: si pasa, `git status` lo dice igual al cierre del turno siguiente.

## Versión 1219 — Orsomarso (2016 a 2018, 2020 a 2025) y Atlético Huila (2016 a 2025) desde SIIS [463 · orsomarso-co, atleticohuila-co]
- Los dos clubes cargados por `club-siis.mjs` (alta, estados, dictámenes, tres subagentes cada uno, lote con un commit por año), con la línea del auditor (sin salvedades en los 15 años con dictamen), caja y deuda de SIIS, ligas por año (Huila en B 2020, 2022 y 2024 por prensa: descendió en 2019, subió en 2021, bajó en 2021 y 2023) y gestiones de Huila 2016 a 2025. Lo que quedó abierto está en el TODO 463 (gestiones y sponsors de Orsomarso, sponsors débiles de Huila).
- Medición: sin cambio de tools en esta entrada.

## Versión 1218 — siis-caja-deuda.mjs: la proporción con los ingresos de audit.js, antes de escribir [463 · siis-caja-deuda.mjs · cucutadeportivo-co]
- Caja y deuda de 17 clubes colombianos quedaron escritas desde SIIS (commit aparte). Cúcuta frenó solo: `caja-deuda-desproporcionada` (caja 2016 = 64 mil COP contra 3.935 M de ingresos, 1,6e-5 < el piso 7e-5) y la tool revirtió todo. Ahora `siisDeBalance` aplica la misma proporción (caja entre 7e-5 y 3 veces los ingresos, deuda hasta 20 veces) y ese año queda sin dato; la escalera por documento tampoco lo decide (1,871 contra 0,064 en el documento siguiente).
- Medición: idéntico (los cinco medidores). Sin revisión independiente de la Auditora.

## Versión 1217 — caja-deuda.mjs --club --escribir ya no se cuelga; el año de siis-caja-deuda como número [463 · caja-deuda.mjs, siis-caja-deuda.mjs]
- `node tools/caja-deuda.mjs --club <id> --escribir` terminaba con «unsettled top-level await» sin escribir: `costo-personal.mjs` importa `caja-deuda.mjs`, `cargar.mjs` importa `costo-personal`, y el `import('./cargar.mjs')` esperaba a un módulo con su `await` de nivel superior pendiente. El despacho del CLI ahora corre en una función asíncrona, sin `await` de nivel superior (latente desde que `costo-personal` se separó).
- `siis-caja-deuda.mjs`: `a.anio` llega como texto y `anio + 1` daba «20211», así que la comparativa del año siguiente nunca se miraba; ahora `Number(a.anio) + 1`. Lo vio el ensayo sobre Tigres (la validación decía solo «cuadra»).
- Medición: idéntico (lote chico: los cinco medidores). Sin revisión independiente de la Auditora.

## Versión 1216 — caja-deuda.mjs: caja y deuda desde el balance de SIIS [463 · caja-deuda.mjs, siis-caja-deuda.mjs]
- `tools/siis-caja-deuda.mjs` (nuevo, solo de SIIS): `siisDeBalance(clubId, a)` lee `siis_sitfinan` de `siis-estado-AAAA.json`. Caja = «Efectivo y equivalentes»; deuda = «Otros pasivos financieros» corrientes + no corrientes (los préstamos corrientes son parte de los corrientes y no se suman). Precedente: América de Cali 2025 y Unión Magdalena 2018 dan esos valores exactos. Compuerta: el balance cuadra y la comparativa del año siguiente de SIIS repite el cierre; con reexpresión o un préstamo sin «Otros pasivos financieros», no decide. Un rubro vacío no es 0.
- `caja-deuda.mjs` (`completarClub`) lo llama después de Rusia y antes de los documentos; lo que SIIS no da sigue por la escalera de siempre. Ensayo sobre `data/co/`: 228 de 288 vacíos con balance de SIIS salen resueltos (Tigres 2021: 190,741 por SIIS = lo que da el documento por otro camino). Faltan por reexpresión (45) y por pasivo financiero no reportado (15).
- Medición: idéntico (lote chico: `caja-deuda`, `caja-deuda-personal`, `personal-ensayos`, `audit`, `escribir`). Sin revisión independiente de la Auditora.

## Versión 1215 — 463: «2.2» (clubes sin official_totals) ya estaba resuelto [463]
- Ningún año de `data/co/*.json` carece de `official_totals` hoy (se recorrió cada club), así que `siis-control` compara todos los años; el punto sale del TODO 463. El motivo por el que figuraba abierto (3 clubes sin totales) ya no es cierto.
- Medición: sin cambio de datos ni de tools.

## Versión 1214 — audit.js: «sin historia» cubre los briefs de SIIS, los contadores fijos y «Guido decidió…» [audit-chequeos-2.js]
- `checkHistoriaEnDocs` (`historia-en-doc-de-criterio`, P3) suma `Admin/briefs-subagentes-siis.md` a los documentos que mira y dos patrones: `Guido cambió|decidió|eligió|resolvió|aprobó|quiso` y contadores fijos («60 clubes», «265 entidades»; solo en ESTADO, CLAUDE.md y los briefs, donde el documento dice qué hay HOY: en una convención el número ilustra el caso). Hoy no da hallazgos nuevos: el contador de `Admin/ESTADO.md` se cambió antes por el comando que lo da (`entidades.mjs --check`). Los avisos van por el mismo camino de silenciar con motivo.
- Medición: idéntico (`audit`). Probado plantando una línea en los briefs: salta con cada patrón; revertida. Sin revisión independiente de la Auditora.

## Versión 1213 — Hook texto-de-guido-aparte: todo el texto que Guido lee va en su propio commit y con el diff mostrado [hooks/pre-tool.mjs, hooks/post-tool.mjs, hooks/texto-de-guido.mjs]
- `tools/hooks/texto-de-guido.mjs` es la lista única (skills, CLAUDE.md, CONVENCIONES*, PANTALLA, PIPELINE, ESTADO, `Admin/briefs-subagentes-siis.md`, `Admin/paises/*.md`). Antes el aviso de `show_pane` (post-tool) solo miraba una parte y NADA exigía el commit aparte, ni para skills.
- `pre-tool.mjs`, `texto-de-guido-aparte`: un commit con ese texto no puede llevar otros archivos (CHANGELOG y TODO sí), una skill por commit, y el primer intento se frena una vez para pedir el `show_pane` del diff (huella en `.git/fos-diff-visto.json`; el mismo commit con el mismo texto pasa). `[texto-junto]` solo con el ok de Guido.
- Medición: `probar-pre-tool.mjs` 98 casos y `probar-post-tool.mjs` 18, todos ok (11 y 2 nuevos). Sin revisión independiente de la Auditora.
