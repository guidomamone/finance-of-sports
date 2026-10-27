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

## Versión 1187 — Sponsors por Exa sin pasar por el anuncio de FKA; los avisos de dictamen resueltos y silenciados [468 · sponsor-fka.mjs, dictamen-fechas.mjs · alianzafc-co]
- `sponsor-fka.mjs`: se saca de la tool el camino de abrir FKA a mano (Claude in Chrome y el anuncio «View a short ad»); `--buscar` prueba hasta cuatro consultas por año (ficha local, visitante, tercera, título) y varios nombres del club (`--nombre "A|B"`), no confunde la selección de Colombia con Alianza FC, y `--registrar --sin-ficha "<qué se probó>"` anota lo que Exa no trae para que no vuelva a listarse. Con eso los 13 años quedaron cerrados: Boyacá 2020 y Tolima 2017 verificados, Once Caldas 2017, 2019 y 2020 y Alianza FC 2016 a 2023 sin ficha (Exa solo trae las de El Salvador y Panamá).
- `dictamen-fechas.mjs`: mira también el encabezado del informe y descarta notas de fuente, fechas de normas o circulares y la fecha del cierre; no lee meses en griego ni cirílico. De los 6 avisos quedan 1: era la circular de Supersociedades de Tolima 2023, la captura de Wayback de Lazio 2006, la firma errada del pie de Alianza 2023 y 2024 (cabecera correcta) y el griego de AEL. Alianza FC 2025, firmado meses tarde con el año del dictamen anterior, se corrigió en la nota del registro y se silenció (`audit-ignore.json`); se quita la duda al club.
- Verificado a mano (468): arreglos 1 a 7 hechos con medición y entradas de CHANGELOG (Versiones 1179 a 1187); un escaneo de data/co con la nota de cada fila da 0 diferencias; sponsors y dictámenes resueltos
- Medición: lote chico del medidor `audit`, 5 diferencias, todas explicadas: salen 5 avisos `dictamen-fechas-ajenas` y ninguno aparece. Sin revisión independiente de la Auditora.

## Versión 1186 — sponsor-fka --buscar lee la ficha en inglés; 24 sponsors débiles verificados [468 · sponsor-fka.mjs · oncecaldas-co, boyacachico-co, unionmagdalena-co, deportestolima-co, laequidad-co]
- Exa devolvía la ficha en el idioma del buscador (/el/, /zh/, /ar/), con los rótulos traducidos y sin el campo Sponsor, y contaba como «sin sponsor» lo que era un error de lectura. Ahora la tool lee la misma ficha sin el prefijo de idioma con Exa `/contents` (US$ 0,001), entiende sus dos formatos de texto e imprime también la liga (para ver que no es otro club: «Alianza FC» devuelve las de El Salvador y Panamá).
- 24 años registrados en `Admin/registros/sponsor-fka.jsonl` (La Equidad 2016 a 2022 Cotrafa, Boyacá Chicó 2016 y 2017 a 2023 sin campo, Once Caldas 2016, 2018 y 2021, Tolima 2016, 2018, 2019 y 2022, Unión Magdalena 2016 y 2022); uno no coincidía: Unión Magdalena 2022 pasa de «sin dato» a Wplay (ficha de la camiseta local), en `contexto-manual.json` y `data/contexto/co.js`. Los 13 que quedaban se cierran en la Versión 1187.
- Medición: no es del pipeline (clasificada como tool de sesión, no pide medición).

## Versión 1185 — club-siis ya no deja misses.jsonl para restaurar [468 · lookup-club-league.js, club-siis.mjs]
- `lookup-club-league.js --sin-anotar` hace la misma consulta sin escribir `tools/club-league-reference/misses.jsonl`; `club-siis.mjs` lo pasa en sus dos consultas (la lista de clubes, `--evaluar` y la liga de cada año), que son de solo lectura. Sin la bandera (alta-club y los demás) todo igual.
- Medición: lote completo, medidores lote-ensayo, alta y cargar: idéntico. Sin revisión independiente de la Auditora.

## Versión 1184 — dictamen-fechas.mjs: aviso dictamen-fechas-ajenas [468 · audit.js, audit-chequeos-siis.js, dictamen-fechas.mjs]
- `node tools/dictamen-fechas.mjs` (gratis) mira, en cada línea de `Admin/registros/auditoria.jsonl` cuyo `.md` es un informe del auditor, las fechas de la firma (4 líneas arriba y 1 abajo de la cita del auditor) contra el cierre del ejercicio del JSON del club: firma anterior al cierre, o más de 30 meses después, o un `.md` que no nombra el año del cierre. `audit.js` lo muestra como P3 `dictamen-fechas-ajenas`. Solo mira documentos que son el informe (no un balance entero) y meses en español, portugués, inglés, italiano, alemán, francés y neerlandés: 75 de 1.459 líneas se pueden mirar hoy.
- Salen 6: Alianza FC 2025, 2024 y 2023, Deportes Tolima 2023, AEL Larissa 2017 y Lazio 2006 (resueltos en la Versión 1187).
- Medición: lote chico del medidor `audit`, 7 diferencias, todas explicadas: aparecen los 6 avisos nuevos y sale `tool-sin-clasificar` de `dictamen-fechas.mjs` (se clasificó antes de medir). Sin revisión independiente de la Auditora.

## Versión 1183 — sin-salarios: SIIS sin Gastos de ventas [468 · audit-chequeos-4.js]
- `sin-salarios` no aplica cuando el `siis-estado-AAAA.md` del año no trae «Gastos de ventas» (o lo trae en 0) y sí «Gastos de administración»: la regla de Colombia manda el rubro tal cual y no hay nómina del plantel que separar. Se sacan de `audit-ignore.json` los tres silencios manuales que lo decían (Alianza 2017 y 2018, L12-L14 de su `siis-estado`; Fortaleza 2016, L12-L15); la cita vive ahora en la condición, que lee las mismas líneas.
- Medición: lote chico del medidor `audit`, 3 diferencias, las tres explicadas: salen los hallazgos `sin-salarios` de esos tres club-años (silenciados hasta hoy); ninguno aparece. Sin revisión independiente de la Auditora.

## Versión 1182 — audit.js: aviso regla-nota-contradicha [468 · audit.js, audit-chequeos-siis.js, reglas-categoria.mjs]
- Aviso P3 `regla-nota-contradicha`: las líneas de gastos cargadas que la regla por nota (`NOTA-CATEGORÍA`) manda a otra categoría, por club, con la nota de cada fila; las lista `node tools/reglas-categoria.mjs --cargadas` (0,4 s). Probado al revés: con una regla cambiada a propósito lista 50 líneas. Hoy da 0.
- Entra sin veredicto previo de la Auditora (sección 7: aviso P3 nuevo que no frena nada) y sin revisión independiente.
- Medición: idéntico (lote completo, medidores cargar y audit); el aviso no aparece porque lo cargado ya cumple la regla.

## Versión 1181 — Colombia: lo cargado que la regla de notas contradecía, corregido [468 · alianzafc-co, atleticobucaramanga-co, fortalezaceif-co, deportestolima-co, oncecaldas-co]
- 21 líneas de gastos, un commit por club con `Corrige:`: «Diversos» a `other_expenses` (Alianza 2019 y 2023, Bucaramanga 2019 y 2020, Tolima 2016 a 2023 y 2025, Once Caldas 2016 a 2018) y los viajes de la nota de administración a `admin_general_expense` (Bucaramanga 2020, Fortaleza 2019, Once Caldas 2016 y 2017). Los totales de cada año no cambian. Alianza se rehízo con `cargar --reemplazar` (corrigiendo antes la respuesta vieja de la cola); los demás con `recategorizar-linea --gasto`, porque `cargar` no los puede rehacer (Bucaramanga 2019 y 2020 frenan con 19 filas en la cola, ya antes de este cambio).
- Un escaneo de todo `data/co` con la nota de cada fila contra la regla da 0 diferencias.
- Medición: solo datos; ninguna tool cambió.

## Versión 1180 — recategorizar-linea: líneas de gastos [468 · recategorizar-linea.mjs]
- `--gasto` (y `--importe <monto>` para desempatar dos líneas con la misma etiqueta) cambia la categoría de una línea de GASTOS de un ejercicio ya cargado, con su cita y su respuesta en la cola; sirve para los años que `cargar` no puede rehacer (Bucaramanga 2019 y 2020 frenan con 19 filas en la cola) y corrige lo que la regla de notas de Colombia contradice.
- Medición: no es del pipeline (clasificada «manual», no pide medición).

## Versión 1179 — La regla escrita de las notas de gastos de Colombia gana sobre el precedente y sobre Jev [468 · cargar-categorias.mjs, categorizar-claude-listos.mjs, reglas-categoria.mjs]
- Causa: la regla `CATEGORÍA (prompt)` solo llegaba al prompt de Claude, que casi nunca se consultaba: el precedente del club (mal aprendido de un año) o Jev decidían antes y repetían el error (Alianza 2019 «Gastos de personal (Gastos de ventas)» a administración; «Diversos» a `admin_general_expense` en Tolima, Alianza, Once Caldas y Bucaramanga).
- `NOTA-CATEGORÍA (co): <nota> | <concepto> | <categoría>` en la sección de la regla de `CONVENCIONES-DATOS.md` y `reglaDeNota()` en `reglas-categoria.mjs` (valida nota, concepto y categoría): se aplica antes del precedente en `categorizar-claude-listos.mjs` y al empezar `catDe` de `cargar-categorias.mjs`; una respuesta de la cola o un ajuste manual de la fila siguen ganando. Si la nota no se sabe (o son las dos) no decide.
- Rehacer: hay 21 líneas cargadas que la contradicen (Diversos y viajes de administración); se rehacen de a un club con `Corrige:` (siguiente tramo del 468), y las respuestas viejas de la cola que chocan (Once Caldas 2018 DIVERSOS, Alianza 2023 Diversos) se corrigen con `cola --corregir-categoria`.
- Medición: lote completo, 42 diferencias, todas de clubes colombianos: filas que la regla corrige; filas que ya iban a esa categoría y dejan de preguntarse (La Equidad, Fortaleza 2025, `cola-vacía`); Bucaramanga 2019 «Refrigerios» sale de la cola por materialidad (hay menos dudas acumuladas); Once Caldas 2016 y 2017 frenan en la cola por el choque con la respuesta de 2018 (se resuelve al corregirla); Alianza 2023 deja de frenar. Nada fuera de Colombia cambió. Sin revisión independiente de la Auditora.

## Versión 1178 — sponsor-fka --buscar: Football Kit Archive con Exa [468 · sponsor-fka.mjs]
- `node tools/sponsor-fka.mjs <clubId> --buscar --nombre "<Club>"` consulta Exa (`tools/exa-search.mjs`, clave en `Admin/api-keys/exa.env`) por cada año de sponsor débil y lee de las fichas de camisetas de FKA el campo Sponsor y la marca, sin el cartel «View a short ad»; imprime lo hallado y el comando para registrarlo. Cuesta ~US$ 0,007 por año (anotado en `Admin/registros/api/exa.jsonl`). `club-siis` lo ofrece primero y deja Claude in Chrome para los años que Exa no trae.
- Probado: Once Caldas 2018 da Colanta (coincide con lo cargado, ficha de FKA); 2016 y 2021 la ficha no tiene campo Sponsor (coincide con «sin sponsor»); 2017, 2019 y 2020 Exa no trae la ficha. Boyacá Chicó: 2016 a 2023 sin campo Sponsor en FKA (no contradice los `sin-fuente`).
- Medición: no es del pipeline (no pide medición).

## Versión 1177 — fos club-datos [468 · club-datos.mjs]
- `node tools/fos.mjs club-datos <clubId> <año> [gastos|ingresos|todo]` imprime las líneas de un año de un club (etiqueta, subcategoría, importe) con el total por subcategoría y los totales oficiales; reemplaza los scripts sueltos del scratchpad que se armaban para mirar un año cargado.
- Medición: no es del pipeline (no pide medición).

## Versión 1176 — El punto 463 del TODO, compacto, y el 468 con los arreglos que salieron de cargar clubes de SIIS [463, 468]
- Lo hecho del 463 (la tool, el chequeo, el criterio y los clubes cargados) pasó entero a `Admin/Archive/TODO-463-siis-hecho.md`; el 463 queda con los clubes que faltan y lo pendiente de lo ya cargado, y se pausa. Nuevo punto 468 con los arreglos que Guido aprobó (el categorizador contra la regla de Colombia primero), a razón de dos por turno.
- Medición: solo documentos; ninguna tool cambió.

## Versión 1175 — Alianza FC 2016 a 2022, 2024 y 2025 desde SIIS [463 · alianzafc-co]
- Con esto Alianza FC (antes Alianza Petrolera) tiene sus 10 años. Las ligas las escribió `club-siis --avanzar` buscando también por los alias (`Alianza Petrolera` y `Alianza` en `alias.json`; antes no encontraba nada). Estadio Daniel Villa Zapata; sponsor `sin-fuente` de 2016 a 2022 (nadie lo nombra), marca de 2016 y 2022 de una sola base de aficionados. Líneas del auditor de 2020 a 2025 (2020 con salvedades; 2021 y 2022 dicen «introducir una salvedad» en el texto pero no en la opinión: dejadas sin salvedades, a revisar). Faltan los dictámenes de 2016 a 2019.
- Corrección en 2019: «Gastos de personal (Gastos de ventas)», 2.569 M de pesos, estaba como administración y va a sueldos del plantel (regla de Colombia); `Corrige:`. Silencios `sin-salarios` de 2017 y 2018 (SIIS pone todos los gastos en administración).
- Medición: no cambió ninguna tool pipeline (`club-siis.mjs` busca la liga por alias); la carga corrió con categorización primero y cola de una sola pregunta (resultado idéntico entre el balance de 2023 y el comparativo de SIIS).

## Versión 1174 — Regla de Colombia: las filas de una nota de Costo de ventas [463 · boyacachico-co]
- La regla de las notas de gastos suma el caso que abrió dos preguntas en Boyacá Chicó 2019: una fila de la nota de «Costo de ventas» que nombra la actividad deportiva sin separar nómina, partidos ni viajes («Partidos y Actividades Deportivas») va a `lump_football_operations_expense` (espejo del ingreso «Actividades Deportivas» de Fortaleza CEIF, tabla aprobada por Guido el 2026-10-02) y «Honorarios y Arriendos» a administración. Con su frase para el categorizador y dos ejemplos registrados (`reglas-categoria --escribir`).
- Medición: ninguna tool cambió; es texto de criterio que Guido lee en el diff.

## Versión 1173 — club-siis: sponsor débil a Football Kit Archive, cola a la vista antes de cargar y brief con las ligas [463, 467 · club-siis.mjs, sponsor-fka.mjs]
- `club-siis` lista, en el estado de cada club y al final de `--avanzar`, los sponsors débiles o sin dato (`tools/sponsor-fka.mjs`) como paso fijo: verificarlos en Football Kit Archive con Claude in Chrome y anotarlos con `sponsor-fka --registrar` (Admin/registros/sponsor-fka.jsonl). Probado: FKA da la verificación anti-bots en el navegador interno y 403 a las tools; en el Chrome de Guido abre la ficha del equipo (proveedores por año visibles) pero tapa el resto con «Unlock more content / View a short ad»: sin ver el anuncio, que es de Guido, el sponsor de cada temporada no se lee. El punto 467 del TODO se cierra: el paso vive en el script.
- `--avanzar --ejecutar --cargar`, si la cola frena la carga, imprime cada pregunta con su propuesta y el comando para contestar y volver a correr (la categorización ya está hecha); el brief del subagente de estadio y sponsor trae la liga de cada año, la fecha y «clave existente: agregá solo los años que faltan».
- Medición: ninguna es del pipeline (no piden medición); el brief probado con Unión Magdalena y Alianza FC.

## Versión 1172 — Unión Magdalena 2016, 2017 y 2019 a 2024 desde SIIS [463 · unionmagdalena-co]
- Con esto Unión Magdalena tiene sus 10 años. Ligas escritas por `club-siis --avanzar` desde el roster de Wikipedia; «Gastos de ventas» sin abrir fue a fútbol profesional sin desglosar solo (la corrección nueva de `--avanzar`); dictámenes de 2022 y 2023 por OCR (US$ 0,08). Estadio Federico Serrano Soto en 2016 (8.000, una sola ficha); sponsor de 2016 y 2022 `sin-fuente` (Wplay 2022 sin confirmar). Líneas del auditor de 2022 a 2024, sin salvedades; faltan los dictámenes de 2016 a 2021.
- Por primera vez el lote de categorización corrió antes y sin `--cargar`: la cola quedó vacía y la carga salió de una vez.
- Medición: no cambió ninguna tool; la carga corrió en segundo plano (~16 min por corrida).

## Versión 1171 — Boyacá Chicó 2016 a 2023 desde SIIS [463 · boyacachico-co]
- Con esto Boyacá Chicó tiene sus 10 años. La liga de cada año la escribió `club-siis --avanzar` desde el roster de Wikipedia (coincidencia exacta; primera vez que corre con un club). Estadio La Independencia (capacidad actual, 20.630, débil para 2016 y 2017); marca Geus; sponsor: Universidad de Boyacá 2016 (débil), «sin sponsor» 2023 (una sola fuente) y `sin-fuente` de 2017 a 2022. Líneas del auditor de 2020 a 2023 (2023 con salvedades por las instrucciones de la Superintendencia); faltan los dictámenes de 2016 a 2019.
- Cola de 2019: «Partidos y Actividades Deportivas» (61 % de los gastos, nota de Costo de ventas) a `lump_football_operations_expense` por el espejo del ingreso «Actividades Deportivas» de Fortaleza, y «Honorarios y Arriendos» a administración por la regla escrita.
- Medición: no cambió ninguna tool; la carga corrió en segundo plano (dos corridas) y la cola quedó sin preguntas.

## Versión 1170 — cola.mjs --historial y club-siis --avanzar con la liga y los comandos de commit [463, 465 · cola.mjs, cola-historial.mjs, club-siis.mjs]
- `node tools/cola.mjs --historial <texto> [motivo]` imprime la historia de un club (cada caso y cada respuesta, en orden) llamando a `cola-historial.mjs`, que entra a la tabla del pipeline. `cola.mjs` quedó en 40.930 bytes (límite 40.960): comentarios viejos con historia achicados.
- `club-siis --avanzar` escribe en `data/club-leagues/co.js` la liga de los años donde el roster de Wikipedia da el nombre exacto (sin probar todavía con un club nuevo) y al final imprime los tres comandos de commit, uno por llamada.
- Medición: `cola.mjs` y `cola-historial.mjs` (lote completo, siete medidores) idéntico, veredicto GENERAL; `club-siis.mjs` no es del pipeline. Costó cuatro corridas: dos por `tool-grande` y por una clasificación que tenía que estar en el commit antes de medir (la prueba de escritura corre en un worktree armado desde el último commit).

## Versión 1169 — Once Caldas 2016, 2017, 2019, 2020 y 2021 desde SIIS [463 · oncecaldas-co]
- Con esto Once Caldas tiene sus 10 años (2016 a 2025). Liga Primera A de Wikipedia (coincidencia exacta); estadio Palogrande (28.678) y marca de Wikipedia; sponsor de FKA, fuente única y débil: «sin sponsor» 2016 y 2017, Colanta 2019 a 2021 (revisar con prensa colombiana con fecha). 2016 y 2017 abren con las notas del club; 2019 a 2021 quedan como SIIS. Líneas del auditor de 2016, 2017, 2019 y 2021 (sin salvedades; 2019 de otra firma, Gerencia y Control); falta el dictamen de 2020.
- Medición: no cambió ninguna tool; la carga corrió en segundo plano (~11 min) con `club-siis --avanzar --ejecutar --cargar --en-segundo-plano` y la cola quedó sin preguntas.

## Versión 1168 — Fortaleza CEIF 2016 desde SIIS [463 · fortalezaceif-co]
- Con esto Fortaleza CEIF tiene sus 10 años (2016 a 2025). Liga Primera A de 2016 (ascendió de la B en 2015 y descendió al cerrar 2016), estadio Metropolitano de Techo y sponsor «Seguros del Estado» de Wikipedia (fuente única, débil); en SIIS el club imprime Costo de ventas y Gastos de ventas en 0 y todos los gastos en administración, así que `sin-salarios` queda silenciado con la cita. Sin dictamen del revisor fiscal de 2016 a 2019.
- Medición: no cambió ninguna tool; el año por el pipeline medido, con el camino `club-siis --avanzar --ejecutar --cargar` en unos 3 minutos y la cola sin preguntas.

## Versión 1167 — fos siis-adicionales: los documentos adicionales de SIIS por club-año [465 · siis-adicionales.mjs]
- Un GET por año a `documentos-adicionales` con el radicado de los `siis-estado-AAAA.json` ya bajados (si el del resultado integral dice «None», el de empresas o balance: Tolima 2021 y 2022) y lista trámite y radicado contra lo que hay en la carpeta. Sin descargas. Muestra lo que antes se rehacía en el scratchpad: Tolima 2022 y 2025 traen dictámenes, certificaciones y notas por duplicado.
- Verificado a mano (465): Cada pendiente hecho con su commit y entrada de CHANGELOG (Versiones 1158 a 1167) o descartado con motivo en este TODO; mediciones de publicar, cargar-ejercicio y auditoria idénticas; audit.js P0 0 y P1 0.
- Medición: no es del pipeline (no pide medición); probado con Deportes Tolima.

## Versión 1166 — fos cola-historial club y patrón del veredicto desde una lista corta [465 · cola-historial.mjs, patron.mjs, cerrar-tool.mjs, patrones-tools.mjs]
- `fos cola-historial club <texto> [motivo]` imprime en orden cada caso y cada respuesta de un club (decisión, causa, nota), sin armar un script suelto.
- `fos patron` y `fos cerrar-tool` sin `--patron` ni `--sin-documentos` toman el patrón (o el motivo) de cada tool cambiada de `tools/patrones-tools.json`; `cerrar-tool` frena en segundos, antes de medir, si a una tool le falta la entrada. La lista arranca con 8 tools y se suma una cuando hace falta.
- Medición: ninguna es del pipeline (no piden medición); probado a mano con tools sueltas y con una sin entrada.

## Versión 1165 — fos git-resumen y aviso del hook al leer entera una tool grande [465 · git-resumen.mjs, post-tool.mjs]
- `node tools/fos.mjs git-resumen`: `git status` sin las páginas generadas (club/, liga/, fuentes/, og/, los `-data.js`), un renglón con la cuenta de cada tipo y el resto archivo por archivo; evita las ~600 líneas de después de un alta.
- `tools/hooks/post-tool.mjs` avisa (sin bloquear) cuando un `Read` trae entera una tool de más de 30 KB y manda a `fos mapa` y a `Read` con offset y limit; `.claude/settings.json` suma `Read` al matcher de PostToolUse (ningún chequeo ni mensaje existente cambia; `probar-post-tool.mjs` con cuatro casos nuevos, 16 de 16 ok; `probar-pre-tool.mjs`, 79 de 79).
- Medición: ninguna de las dos es del pipeline (no piden medición).

## Versión 1164 — fos siis-notas-clasificar: por qué las notas no abren un rubro de SIIS [465 · siis-notas-clasificar.mjs]
- Gratis y sin red: de cada club-año de SIIS dice qué rubros abren las notas del club y clasifica los que no en «sin nota», «casi suma» (con la diferencia en miles de pesos), «ninguna se acerca» y «estructura», con `abrirConNotas` de `siis-notas.mjs`. Hoy: 51 rubros abren, 20 casi suman (de 0,5 a 12.831 miles de pesos), 125 ninguna tabla se acerca, 132 sin nota del club, 2 estructura.
- Medición: `siis-notas-clasificar.mjs` no es del pipeline (no pide medición); no cambia `siis-notas.mjs`.

## Versión 1163 — medidor cargar-cola-vacia: cuántas preguntas abre la carga con la cola vacía [465 · medir-cargar.mjs, pipeline-tools.json]
- `medir-cargar.mjs --cola-vacia` corre el ensayo de la carga con la cola de partida sin una respuesta, como un club nuevo, y `--comparar` imprime «preguntas que abre: N antes · M después». Con la cola real una pregunta ya contestada no se ve: en el lote chico la cola real abre 1 pregunta y la vacía 74, así que un cambio que abre más preguntas pasaba sin que el medidor `cargar` lo notara.
- Es el medidor `cargar-cola-vacia` de `tools/pipeline-tools.json`, sumado solo a `cargar.mjs` (y por import a `cargar-categorias.mjs` y `cargar-ejercicio.mjs`): +unos 6 minutos a su medición (de ~14 a ~20 en el completo).
- Medición: `medir-cargar.mjs` y `pipeline-tools.json` no son del pipeline (no piden medición); probado de punta a punta con `medir-pipeline --solo-chico --medidor cargar-cola-vacia` (idéntico, sin anotar).

## Versión 1162 — auditoria.mjs --extractos avisa los club-años sin informe del auditor [465 · auditoria.mjs]
- Al escribir los extractos, lista los club-años cuyos `.md` no traen ninguna frase de un informe del auditor y dice qué hacer (`sin_informe` o `falta_transcripcion`): citar el `.md` de otro ejercicio se rechaza («es del ejercicio X, no del Y») recién al final de la corrida.
- Sin pendientes hoy, el aviso no se pudo ver disparar; se revisó solo el código.
- Medición: `auditoria.mjs` (lote completo, medidores cargar y audit) idéntico; veredicto GENERAL (681 documentos de 131 clubes).

## Versión 1161 — cargar-ejercicio.mjs: la pregunta de gestión no se repite con otro detalle [465 · cargar-ejercicio.mjs]
- Causa: contestada la pregunta genérica del club (`aceptar`) con la gestión todavía sin cubrir el año, la corrida siguiente abría otra con detalle `club:año` para el mismo documento (Medellín 2018 a 2023, 6 preguntas). Ahora, si ese documento ya tiene una pregunta de gestión contestada `aceptar`, no se vuelve a abrir; una gestión que cubre el año cierra la duda sola y un año de otro documento abre la suya.
- Las 6 abiertas de Medellín siguen en la cola hasta que `cerrarObsoletos` las cierre en una corrida de carga de esos documentos (no verificado).
- Medición: `cargar-ejercicio.mjs` (compartida, lote completo) idéntico; veredicto GENERAL (1405 documentos de 250 clubes).

## Versión 1160 — fos perfil-audit: el tiempo de cada chequeo de audit.js [465 · audit-perfil.mjs]
- `node tools/fos.mjs perfil-audit [N]` corre `audit.js` con `--cpu-prof` en una carpeta temporal y lista los N chequeos más lentos con lo que llaman adentro (antes se armaba a mano con un script del scratchpad). No toca `audit.js`: ningún chequeo ni mensaje cambia; los tres más pesados (5 de 11 s) no se aceleran.
- Medición: `audit-perfil.mjs` no es del pipeline (no pide medición); sus tiempos coinciden con el perfil manual de la sesión anterior.

## Versión 1159 — publicar.mjs avisa que el commit va en otra llamada de Bash [465 · publicar.mjs, medir-pipeline.mjs]
- Al terminar, `publicar.mjs` imprime que `git commit` va en OTRA llamada: el hook de commit audita antes de ejecutar el comando entero y los dos juntos fallan por `asset-v-sin-subir`. El ensayo de `medir-pipeline` ya no sugiere escalar al completo cuando los medidores no usan lista.
- Medición: `publicar.mjs` (medidores audit y escribir, lote chico) idéntico; veredicto GENERAL.

## Versión 1158 — Tiempo estimado en club-siis --avanzar y en medir-pipeline --ensayo [465 · club-siis.mjs, medir-pipeline.mjs, duraciones-mediciones.mjs, duraciones-lib.mjs]
- `club-siis --avanzar` imprime «Tiempo estimado» (~1 min por año el lote, otro tanto la carga, ~25 s publicar, ~10 s bajar un estado) y, si pasa de 8 minutos, no corre nada: dice el comando exacto para correrlo en segundo plano con `--en-segundo-plano` (en primer plano la Bash se corta a los 10 minutos).
- `medir-pipeline` imprime el tiempo estimado de la medición (mediana de cada medidor y nivel, antes y después); para `cargar.mjs` da ~14 min, lo que mide de verdad. La lectura de las duraciones pasó a `duraciones-lib.mjs`, que usan también `fos duraciones` (salida idéntica) y el ensayo.
- Medición: ninguna de las tools es del pipeline (no pide medición); la salida de `fos duraciones` antes y después, idéntica; probado con Millonarios (frena y dice cómo) y Leones FC (1 min, sin cambios).

## Versión 1157 — club-siis.mjs --avanzar probado con un solo año (Deportivo Pereira 2024) [465 · club-siis.mjs · deportivopereira-co]
- Un año suelto de un club ya cargado desde su PDF se carga con `--avanzar --ejecutar --cargar` en 75 segundos: baja el estado de SIIS solo de los años que faltan (antes bajaba todos) y da por cubiertos estadio y sponsor cuando el ensayo de Wikipedia los trae al 100 % (antes pedía un subagente aunque no hiciera falta).
- Independiente Medellín: la gestión de Giraldo (dueño) de enero a septiembre de 2018 con fuente (El Colombiano, 19 de septiembre de 2018); la salida de Gil Gómez en 2019 y las gestiones de 2019 a 2023 siguen sin fuente fechada tras buscarlas.
- Medición: `club-siis.mjs` no es del pipeline (no pide medición); el año cargado con el pipeline medido.

## Versión 1156 — club-siis.mjs: reexpresiones de comparativo que se contestan solas y la lista de clubes con veredicto [465 · club-siis.mjs]
- `--avanzar` contesta las preguntas `anio-vecino` y `no-cierra` de un par de estados de SIIS solo si el resultado neto del año es idéntico en su estado y en el comparativo del siguiente; si cambia, queda para una persona. Corre el lote, contesta y lo repite para que el año no quede frenado.
- `club-siis` sin nombre imprime el veredicto de `--evaluar` de cada club y ordena de menos a más años por cargar.
- Medición: `club-siis.mjs` no es del pipeline (no pide medición); la lógica de reexpresión se probó con casos falsos, no con un caso real nuevo.

## Versión 1155 — audit.js más rápido: de 22 a 11 segundos [465 · audit-base.js · audit-chequeos-2.js · comparar-sin-comentarios.js]
- `audit.js` corre en cada año cargado, cada commit, cada publicar y cada medición. Los ~20 `--check` hijos de `checkGenerados` se lanzan a la vez (`execJuntos` en `audit-base.js`, archivos temporales y sueño corto) y `comparar-sin-comentarios.js` recuerda en la carpeta temporal los comentarios de los `data/*-data.js` ya vistos (se descarta si cambia el escáner). Mismos chequeos y mensajes: P0 0, P1 0, P2 2, P3 10, P4 63 antes y después. Contestar la cola de categoría por precedente de otros clubes se midió y no entró (`HALLAZGOS-pipeline.md`).
- Medición: idéntico en el medidor `audit` (lote chico: el sitio entero, sin lista); veredicto GENERAL.

## Versión 1154 — Leones FC (diez años de SIIS) y club-siis.mjs --avanzar probado de punta a punta [463 · leonesfc-co · club-siis.mjs]
- Leones FC cargado de 2016 a 2025 con `club-siis --avanzar --ejecutar --cargar` (un commit por año, publicado): color, liga y gestión a mano, estadio y sponsor y gestiones con dos subagentes lanzados en un solo mensaje, líneas del auditor de 2020 a 2025 (huecos de dictamen en 2016 a 2019, 2020 y 2024). La reexpresión de 2020 de SIIS (204.900 de «Otros ingresos») se aceptó: cada año se carga como lo imprimió su estado.
- `club-siis --avanzar`: el nombre legal que SIIS imprime mal frena el alta y dice el caso de la cola; con la gestión cargada no frena por las preguntas de gestión viejas y las contesta solas.
- Medición: `club-siis.mjs` no es del pipeline (no pide medición); datos cargados con el pipeline medido; `audit.js` P0 0 y P1 0.

## Versión 1153 — cola.mjs, cola-respuesta.mjs y duraciones-mediciones.mjs: el uso de --responder dice las tres banderas; cuánto tarda cada medidor [465 · cola.mjs · cola-respuesta.mjs · duraciones-mediciones.mjs]
- El uso de `cola.mjs --responder` muestra `--evidencia`, `--seguridad` y `--causa` (obligatorias) y el error de `--evidencia` dice que la ruta termina en .md o es «ninguna»; antes costó diez llamadas perdidas. `duraciones-mediciones.mjs` (comando `fos duraciones`) lista los segundos de cada medidor por nivel: `siis` 2 s de mediana, `verificar` 9, `cargar` completo 182, `escribir` 126, `xhtml` 340.
- Medición: idéntico en el lote completo (una tool compartida lo pide aunque solo cambie un mensaje; tardó unos 14 minutos y una primera corrida frenó por el tamaño de la cabecera); veredicto GENERAL; `audit.js` P0 0 y P1 0.

## Versión 1152 — club-siis.mjs y dictamenes-md.mjs: subagentes juntos con su brief, --evaluar y --avanzar [463 · club-siis.mjs · dictamenes-md.mjs]
- `club-siis` imprime el brief de cada subagente (`--brief`, plantillas en `Admin/briefs-subagentes-siis.md`) y pide lanzarlos juntos; `--evaluar` dice CARGAR, REVISAR o DESCARTAR (solo se descarta una sociedad sin actividad: la liga no descarta, se cargan amateurs) y muestra el peso de «Costo de ventas»; `--avanzar` corre los pasos mecánicos hasta el primero que pide juicio. `dictamenes-md.mjs` transcribe los dictámenes de texto nativo y marca duplicados, escaneos y firmas.
- Medición: ninguna es tool del pipeline (orden y manual en `pipeline-tools.json`: `fos que-pide` no pide medición); `--avanzar` sin probar de punta a punta con un club nuevo.

## Versión 1151 — Independiente Medellín (diez años de SIIS), dictámenes de Tolima, colores de marca de tres clubes colombianos y «Sueldos / Ingresos» en «—» [463 · independientemedellin-co · deportestolima-co · laequidad-co · aguilasdoradas-co]
- Independiente Medellín (El Equipo del Pueblo S.A.) cargado de 2016 a 2025 con el camino de `club-siis.mjs`, un commit por año; «Costo de ventas» (87 a 90 % de los gastos) va a fútbol profesional sin desglosar por la excepción de la regla de Colombia; diez dictámenes de RSM transcriptos con su línea del auditor (2024: solo el informe legal). Real Sincelejo se descartó (sociedad sin actividad). Los dictámenes que faltaban de los otros cuatro clubes no están en SIIS (huecos); el de Tolima 2025 se bajó y el «2025» archivado era el de 2024.
- Pantalla: la razón de sueldos sobre ingresos muestra «—» (no 0 %) si el documento no abre los sueldos, y el Δ ya no compara contra ese cero; Tolima, La Equidad y Águilas Doradas tenían el color de marca sin poner.
- Medición: no cambia ninguna tool del pipeline (datos y `js/`); `audit.js` P0 0 y P1 0.

## Versión 1150 — cargar-categorias.mjs: una pregunta de categoría por club, etiqueta y propuesta [463 · cargar-categorias.mjs]
- Antes, cada año de un club abría su propia pregunta de categoría aunque otro año ya tuviera abierta la misma (misma clave y misma categoría propuesta), porque se proponían varios años antes de que se contestara el primero. Ahora se abre una vez por club; los otros años frenan igual con el aviso «pregunta ya abierta» y, al contestarla, la respuesta les vale (`respuestaPorDetalle` ya era por club; una respuesta `aceptar` solo vale con la misma propuesta, por eso se compara).
- Ensayo gratis sobre toda la historia de la cola: 1.032 de 3.407 preguntas de categoría (30 %) eran repeticiones del mismo club, etiqueta y propuesta (Portugal 262, Brasil 206, Grecia 184, Colombia 179). Con una cola vacía, tres años de Tolima abren un caso y no tres. Queda en el TODO que la memoria de categorías no ve la sección de la nota.
- Medición: idéntico en el lote completo (el medidor compara propuestas, no las preguntas abiertas: el efecto se probó aparte con una cola de prueba); veredicto GENERAL; `audit.js` P0 0 y P1 0.

## Versión 1149 — club-siis.mjs: el camino de un club colombiano de SIIS en un comando [463 · club-siis.mjs · deportestolima-co · laequidad-co · aguilasdoradas-co]
- `node tools/club-siis.mjs "<Club>"` (solo lee: no escribe ni llama a ninguna API) muestra por año si está hecho el estado de SIIS, la verificación, la cola, la liga, el estadio y sponsor, la carga y la línea del auditor, y si las notas abren; después lista lo que falta en orden, con el comando de cada paso y los subagentes (cola, estadio y sponsor, auditor). `--crear-lista` arma la lista del lote y `--rehacer-anio AAAA` da la cadena explícita para un año ya publicado. Sin nombre de club resume todos los de `siis-clubes.json`.
- Al probarlo salió que Tolima, La Equidad y Águilas Doradas no tenían `clubId` en `tools/siis-clubes.json`, así que `siis-control` nunca los había comparado con SIIS; ya lo tienen y los 30 años cierran (sin avisos nuevos). Documentado en `Admin/PIPELINE.md`; registrado en `fos` y clasificado fuera del pipeline.
- Medición: ninguna tool del pipeline cambió (herramienta de sesión nueva, de solo lectura); `audit.js` P0 0 y P1 0.

## Versión 1148 — Los 34 estados-financieros de solo notas de los cuatro clubes de SIIS: motivo al día en documentos-descartados [463 · deportestolima-co · laequidad-co · aguilasdoradas-co · atleticobucaramanga-co]
- Los 34 `estados-financieros-*` de Tolima (10), La Equidad (9), Águilas Doradas (8) y Bucaramanga (7) siguen en `Admin/registros/documentos-descartados.txt`: son solo notas, y cargados como documento propio duplicarían el año y gastarían IA. Su motivo decía «se carga cuando haya el estado primario (SIIS)»; ahora dice que el estado del año es el de SIIS y que las notas abren sus rubros con `siis-notas.mjs` cuando suman exacto.
- Solo cambió el texto de después del « # »; ninguna ruta, así que el lote, el alta y el auditor leen lo mismo. Cierra la parte (f) del 3.0.
- Medición: ninguna tool cambió.

## Versión 1147 — medir-pipeline.mjs y exigir-medida.mjs: la prueba de escritura se pide a la tool que lee --escribir [463 · medir-pipeline.mjs, probar-medir-pipeline.mjs, exigir-medida.mjs]
- `medir-pipeline.mjs` buscaba `--escribir` en cualquier parte del texto de una tool, y una que solo lo nombraba en un comentario o un mensaje frenaba la medición con «sin prueba de escritura» (pasó con `exigir-medida.mjs` y `audit-chequeos-siis.js`). Ahora la pide solo a la que lo lee como argumento (la cadena exacta entre comillas): de 77 tools que lo nombraban quedan 56, y las 21 que dejaron de marcarse solo lo tenían en comentarios o mensajes (ensayo gratis sobre todas las tools).
- Dos casos nuevos en `probar-medir-pipeline.mjs` (nombrarlo no pide prueba; leerlo sin prueba no da idéntico); se sacaron las dos anotaciones que se habían puesto en `escriben_sin_prueba`, y `CON_MEDIDA` de `exigir-medida.mjs` pasa a lista de tools.
- Medición: `probar medir-pipeline` con todos los casos ok; `exigir-medida.mjs` idéntico, veredicto GENERAL; `audit.js` P0 0 y P1 0.

## Versión 1146 — audit-chequeos-siis.js y audit.js: siis-entre-anios compara los rubros entre años [463 · audit-chequeos-siis.js, audit.js]
- `siis-entre-anios` (sin red, desde los `siis-estado-AAAA.md`) compara cada rubro de un año con el comparativo que imprime el año siguiente. Avisa en P3 los rótulos intercambiados (el comparativo le da a un gasto el importe que el año imprime con otro rótulo) y en P4 la reexpresión de ingresos o resultado de más del 1 % de los ingresos, un aviso por club.
- Sobre los cuatro clubes encontró los tres intercambios que se habían visto a mano (Tolima y La Equidad 2024, Bucaramanga 2018); quedaron silenciados con su verificación (ajustes de categoría y regla de las notas de gastos). Las tres reexpresiones (Bucaramanga 2023→2024, Tolima 2023→2024, La Equidad 2016→2017) quedan como informativas. Código nuevo en `audit-acciones.json`.
- Medición: 5 diferencias del medidor `audit`, todas explicadas (el aviso nuevo y, del lado del antes, tres silencios sin chequeo todavía); veredicto GENERAL; P0 0 y P1 0. Aviso P3 nuevo sin revisión independiente (sección 7 de la auditora).

## Versión 1145 — cargar-ceros.mjs: un documento con filas armadas a mano no pide reintento por categorías en 0 [463 · cargar-ceros.mjs]
- Un documento con el ajuste `filas-a-mano` (los estados de SIIS y los que arma una sesión) ya no frena la carga con «categorías en 0 que deberían tener número» ni genera la pregunta de perfil (socios, otros deportes): localizar y extraer lo devuelven protegido, así que el reintento con IA no podía cambiar sus filas. Las categorías en 0 quedan en un aviso y se carga como está.
- Antes del cambio, ninguno de los 52 documentos armados a mano tenía un reintento pendiente en su última propuesta (40 de SIIS, 12 de otros clubes); el efecto es para los clubes que vienen.
- Medición: idéntico (cargar, verificar y siis en chico, mediano y completo); veredicto GENERAL (52 documentos de 9 o más clubes); `audit.js` P0 0 y P1 0.

## Versión 1144 — exigir-medida.mjs, cargar.mjs y siis-estado.mjs: no se escriben datos reales con tools sin medir [463 · exigir-medida.mjs, cargar.mjs, siis-estado.mjs]
- `cargar.mjs` y `siis-estado.mjs` se niegan a escribir (`--escribir`) si hay archivos de `tools/` cambiados contra HEAD, fuera de `no_pipeline`, sin una medición buena de su versión actual (`tools/exigir-medida.mjs`; no usa otras tools; `--ignorar-medicion` solo con el ok de Guido; `fos --check` verifica que sigan llamándolo). Así el orden (ensayo gratis completo, arreglar, medir una vez, recién después escribir) lo impone el código.
- El medidor `siis` corre los cuatro clubes de `siis-clubes.json` (antes solo Tolima) y cuenta qué rubros abren las notas. La regla del orden queda en `Admin/PLANTILLA-SESION.md`.
- La primera versión llamaba a `que-pide.mjs` y rompía la auditoría (una tool del pipeline no puede depender de una de afuera); se rehízo autocontenida y se midió de nuevo, sin explicación previa.
- Medición: idéntico (cargar, verificar y siis en chico, mediano y completo; `escribir` pasa); veredicto GENERAL (sin documentos); `audit.js` P0 0 y P1 0.

## Versión 1143 — siis-notas.mjs y siis-estado.mjs: 20 club-años de Colombia rehechos con las notas abiertas [463 · siis-estado.mjs, siis-notas.mjs · deportestolima-co · laequidad-co · aguilasdoradas-co · atleticobucaramanga-co]
- La tool se afinó con los cuatro clubes: columna de etiquetas (la de párrafos de la norma no cuenta), total impreso que tiene que sumar, tolerancia de verificar para una nota en pesos, tablas partidas por página, cifras con coma de miles, etiqueta repetida entre notas con el rubro entre paréntesis y no abrir si el título de la nota dice lo contrario del rubro (Tolima 2024).
- Rehechos y publicados 20 club-años (Tolima 10, La Equidad 4, Águilas Doradas 4, Bucaramanga 2) con la cadena `siis-estado --rehacer`, `verificar`, Jev, Claude y `cargar --reemplazar`: ingresos y gastos abiertos (Tolima 2025: venta de derechos deportivos 14.934 M). Regla de las notas de gastos en `CONVENCIONES-DATOS.md` (personal y viajes de administración son administración) y 10 ajustes de categoría. Costo de API unos US$ 0,60.
- Los años donde la nota no suma exacto quedan como SIIS los trae; el detalle está en el punto 463 del TODO.
- Medición: lote chico y mediano idénticos salvo las líneas «notas: …» del medidor `siis` (Tolima 2016 a 2025); veredicto GENERAL (42 documentos de 12 clubes); `audit.js` P0 0 y P1 0; condición nueva sin revisión independiente.

## Versión 1142 — siis-estado.mjs y siis-notas.mjs: las notas del club abren los rubros de SIIS que suman exacto [463 · siis-estado.mjs, siis-notas.mjs]
- `siis-notas.mjs` busca, entre las tablas de los `estados-financieros-AAAA.md` del club, la que abre cada rubro del estado de SIIS (ingresos, costo de ventas, gastos de ventas y de administración, otros): una columna cuyas filas, sin subtotales, suman el rubro (en miles o en pesos). `siis-estado.mjs` copia esa tabla al final del `siis-estado-AAAA.md` (sin «$» ni negritas, con su origen) y la deja como `notas_ingresos` / `notas_gastos` con `detalla_a` = el rubro; `verificar.mjs` hace el cierre de siempre. Una tabla que no suma no entra: se avisa la más cercana (< 0,1 %) y el rubro queda como SIIS lo trae. `--sin-notas` lo apaga.
- Primer ensayo en los cuatro clubes: Tolima abre ingresos y gastos de ventas sus diez años (más administración en 2016 a 2018 y 2022 a 2025); en los otros tres abre una parte de los años. Tolima 2025 pasó por verificar y la propuesta de carga: los ingresos salen en 8 líneas con la venta de derechos deportivos (14.934 M de pesos). Condición nueva sin revisión independiente (sección 7 de la auditora).
- Medición: lote chico y mediano idénticos salvo 10 diferencias del medidor `siis`, todas la línea nueva «notas: …» por año de Tolima; veredicto GENERAL (42 documentos de 12 clubes).

## Versión 1141 — La Equidad, Águilas Doradas y Atlético Bucaramanga: 30 años en el sitio desde los estados de SIIS [463 · laequidad-co · aguilasdoradas-co · atleticobucaramanga-co]
- Con Tolima, los cuatro clubes colombianos de solo notas tienen sus diez años (40 club-años nuevos, un commit por año), con el resultado oficial de SIIS, estadio y sponsor con su fuente o con el registro de búsqueda, y la línea del auditor de cada año (8 + 10 + 10 + 10; los dictámenes que faltan están en el punto 463).
- Dos correcciones de criterio salieron de cargarlos: «Costo de ventas» es la actividad deportiva cuando pesa más de la mitad de los gastos o el año siguiente lo repite como «Gastos de ventas» (Bucaramanga 2016 a 2018), y los rótulos de ventas y administración de SIIS se intercambian en algún año (Tolima y La Equidad 2024, corregidos con ajuste y publicados con `Corrige:`). Regla en `Admin/CONVENCIONES-DATOS.md`.
- Medición: ninguna tool cambió; `audit.js` P0 0 y P1 0 después de `publicar.mjs`.

## Versión 1140 — Deportes Tolima 2016 a 2025 en el sitio, desde el estado de SIIS [463 · deportestolima-co]
- Tolima (primer club de solo notas) quedó cargado completo: diez años, un commit por año, desde sus estados de SIIS, con el resultado oficial de SIIS (2025: 359 M de pesos, que son los 359 de SIIS y no las tres cifras que no concilian). Cola contestada con la regla votada 3 a 0 (`Gastos de ventas` sin abrir a `lump_football_operations_expense`, `Costo de ventas` a `other_expenses`) y la línea única de ingresos a `lump_football_operations`; estadio, capacidad y sponsor 2016 a 2022 con fuente en `tools/contexto-manual.json` (sponsor 2016 a 2019 con fuente débil y 2022 sin sponsor, registrado); líneas del auditor 2016 a 2023 con citas (2024 y 2025 «falta transcripción»: el dictamen que hay es el de 2024 archivado como 2025).
- Pendiente anotado en el punto 463: abrir los ingresos con la Nota 19 (suma exacta con SIIS; esconde la venta de jugadores, 30 % de los ingresos en 2025).
- Medición: ninguna tool cambió en esta entrada; `audit.js` P0 0 y P1 0 después de `publicar.mjs`.

## Versión 1139 — Deportes Tolima: alta y los diez estados de SIIS; la tool imprime 0 en el año que falta de un rubro [463 · siis-estado.mjs · deportestolima-co]
- Alta de Deportes Tolima (`alta-club.mjs`, 15 de 16 campos ok) y sus diez estados de SIIS (2016 a 2025) bajados con `siis-estado.mjs`, con filas armadas y verificación sin IA. Tolima destapó un defecto de la tool: un rubro que SIIS informa en un solo año salía en blanco y `armar-a-mano` rechazaba la fila (2020 y 2023); ahora se imprime 0 en el año que falta.
- Medición: idéntico (lote mediano) y veredicto GENERAL; el ensayo de Tolima del medidor `siis` no cambia.

## Versión 1138 — Fortaleza 2021: el resultado del ejercicio incluye el beneficio de impuesto diferido (lo encontró el control de SIIS) [463 · fortalezaceif-co]
- Fortaleza CEIF 2021 estaba cargada con resultado −647,3 M de pesos (antes de impuestos); el documento imprime «Resultados del ejercicio (208.773)» porque suma un beneficio de impuesto diferido de 438,5 M, y SIIS y el documento de 2022 dicen lo mismo. Corregido en `data/co/fortalezaceif-co.json` (impuesto +438,544; resultado −208,773) con el ajuste manual `resultado-final` en `ajustes-manuales.jsonl`, y publicado.
- Medición: `audit.js` sin `siis-control` (de 1 a 0), P0 0 y P1 0 después de `publicar.mjs`; ninguna tool cambió.

## Versión 1137 — SIIS: la tool toma el perímetro propio del club; Santa Fe 2019 y 2025 no eran contradicciones de SIIS [463 · siis-estado.mjs]
- `siis-estado.mjs` elige por el id del documento el estado propio del club («individuales» o «separados») y el consolidado solo si no hay otro o si `tools/siis-clubes.json` pide `perimetro: consolidado`; el inventario y el `perimetro` de las filas salen de esa elección. Antes elegía uno cualquiera cuando un club presentaba los dos (Santa Fe) y comparaba perímetros distintos: 2019 y 2025 salían como contradicción. Los 380 club-años de los 38 clubes cierran ahora; Santa Fe ya no tiene años frenados.
- Decisión registrada con `decision.mjs` (`auditoria-proceso.jsonl` y punto 463); regla en `Admin/CONVENCIONES-DATOS.md`. En `audit.js` queda un solo `siis-control`: Fortaleza 2021.
- Medición: idéntico (lote mediano) y veredicto GENERAL; el ensayo de Tolima del medidor `siis` no cambia.

## Versión 1136 — El control permanente de SIIS: audit.js compara lo cargado de Colombia con SIIS y avisa de los años sin bajar [463 · audit.js, audit-chequeos-siis.js, siis-estado.mjs]
- Avisos P3 nuevos en `audit.js` (módulo `tools/audit-chequeos-siis.js`, sin red, leen `Admin/sourcing/Colombia/siis-resumen.json` que genera `siis-estado.mjs --inventario --escribir`): `siis-control` (resultado cargado distinto del de SIIS, o ingresos cargados menores que los ordinarios de SIIS), `siis-faltante` (337 club-años que SIIS tiene y no están bajados) y `siis-resumen-viejo` (más de 120 días). Entradas en `audit-acciones.json`. Sin revisión independiente (aviso P3 nuevo, sección 7 de la skill de auditoría).
- Primer día: encontró un error publicado (Fortaleza 2021 cargada antes de impuestos, −647,3 M contra −208,8 M del documento) y dos casos de Santa Fe 2025; `siis-estado.mjs` suma el rubro de participación en subsidiarias a la compuerta (Santa Fe 2016 a 2018 ahora cierran), saltea los `frenados` de `tools/siis-clubes.json` y guarda el resumen offline.
- Medición: 4 diferencias, todas explicadas (los avisos nuevos de audit y el ensayo de Tolima); `verificar` idéntico en los tres niveles; antes y después del aviso P3 pasa de 3 a 7 (3 `siis-control` y 1 `siis-faltante`).

## Versión 1135 — Medir y commitear una tool sin tropezar: nombres antes de medir, el hook mira lo que va en el commit y un comando que ordena los pasos [465 · medir-pipeline.mjs, cerrar-tool.mjs, pre-tool.mjs]
- `medir-pipeline.mjs` corre el chequeo de nombres del veredicto (en seco) antes de gastar la medición y frena en segundos si el código agregado nombra un club, un año o una ruta de `Clubes/` (también con `--ensayo`); su mensaje de «datos sin commitear» dice cómo commitearlos sin `-A` ni `.`.
- El hook de commit (`tools/hooks/pre-tool.mjs`) entiende las rutas y las exclusiones de `git add` en el mismo comando (`git add -A Admin/registros`, `git add -A -- . ':!tools'`): un commit de solo datos y registros pasa aunque haya tools sin medir; `git add .` y `-A` sin rutas siguen mirando todo el árbol. `FOS_ARBOL` lo simula en la prueba.
- `tools/cerrar-tool.mjs` (`fos cerrar-tool`) corre en orden el chequeo en seco, la medición, el veredicto y la lista de lo que falta; no commitea. Regla en `Admin/PLANTILLA-SESION.md`.
- Medición: `probar-pre-tool.mjs` 79 casos ok (5 nuevos) y `probar-medir-pipeline.mjs` todos ok (2 nuevos); ninguna tool del pipeline cambió (las tres son de orden o de prueba), así que `medir pipeline` dice «nada que medir».

## Versión 1134 — La tool siis-estado.mjs: el estado de resultados y el balance de SIIS como documento del pipeline [463 · 464 · siis-estado.mjs, familias-docs.mjs, inventario-transcripciones.mjs]
- `tools/siis-estado.mjs` baja de SIIS (Colombia) el estado de resultados y el balance de un club y deja `siis-estado-AAAA.md` (fiel), `.json` y `.pdf` en su carpeta, con 5 compuertas aritméticas (de unos 340 club-años solo Independiente Santa Fe falla en 5), más las filas armadas con `armar-a-mano.mjs`: localizar y extraer cuestan US$ 0, y verificar cierra el resultado de Tolima 2025. `--inventario` genera `Admin/sourcing/Colombia/siis-inventario.md`. El país y la moneda salen de `tools/siis-clubes.json`.
- `inventario-transcripciones.mjs` reconoce el motor «siis-api (determinista)»; `familias-docs.mjs` tiene la familia «siis»; `pipeline-tools.json` tiene el medidor `siis`; `fos siis-estado` figura en `fos-comandos.json`. Regla: `Admin/CONVENCIONES-DATOS.md`; proceso: `Admin/PIPELINE.md`. Punto nuevo 464 (deportes que no son fútbol con SIIS).
- Medición: 13 diferencias, todas explicadas (las altas del medidor nuevo y dos avisos de audit que se van); `lote-ensayo` y `verificar` idénticos en los tres niveles.

## Versión 1133 — Los puntos 257, 461 y 462 se agrupan en el 463, con orden de trabajo en cinco grupos [257 · 461 · 462 · 463]
- Se abrió el 463 (SIIS como estado primario oficial en Colombia) con las decisiones de Guido, los hechos, los cuatro casos y los pasos en cinco grupos (base, control permanente, clubes, skills y pantalla, cositas chicas); no se perdió ningún item del 257, 461 ni 462, y el texto original está en `git show 743efef04a:Admin/TODO.md`. Se cerró el 257, el 461 y el 462; el 6 del 461 (imágenes de UEFA) quedó descartado por Guido.
- Se sacó el worktree viejo de una medición (`wt-antes`, sin rama).
- Medición: solo TODO y CHANGELOG; no cambió ninguna tool.

## Versión 1132 — La skill de club nuevo nombra el color de un club de rugby [461]
- `club-nuevo.md` (skill de onboarding) dice que un club de rugby usa `node tools/fos.mjs color-rugby "<club>"`, que se corre a mano y no decide el color.
- Medición: solo texto de skill; no cambió ninguna tool.

## Versión 1131 — La fecha `desde` del esquema de registros es una por registro [461 · registro-esquema.js, audit-chequeos-5.js]
- `desde` de `esquemas-registros.json` pasó de una fecha a una por registro (auditoría, cola, ajustes, mediciones) y `registro-fuera-de-esquema` ahora también avisa de una línea de ajustes o de mediciones, de hoy en adelante, sin `esquema` (antes solo miraba las que lo declaraban).
- Medición: `audit.js` sin avisos nuevos con los registros de hoy; con una línea falsa de mediciones sin `esquema` el aviso aparece (probado y revertido).

## Versión 1130 — La segunda fuente local ya no guarda técnicos ni encabezados como equipos [461 · segunda-fuente-wikipedia-local.mjs]
- `segunda-fuente-wikipedia-local.mjs` saltea las filas de puro encabezado y descarta los ítems que Wikidata marca como personas. Bélgica 2.ª 2020-21 pasó de 14 «equipos» (con «Stam-nummer» y cinco técnicos) a los 8 reales.
- Medición: el cruce con la lista en inglés quedó igual (6 de 8, mismos sin par); `medir-pipeline.mjs`: idéntico.

## Versión 1129 — Series de tipo de cambio al día; el BRL ya no pierde 2005 a 2009 [461 · fetch-fx-reference.mjs]
- `fetch-fx-reference.mjs` sin `--currency` volvió a bajar las 21 series (hasta el 22 al 26 de octubre según la moneda). El BRL tenía `defaultFrom` 2010 y lo cargado arranca en 2005 (Goiás 2008-2009): la corrida habría borrado 1.254 días; ahora el default es 2005-01-01.
- Medición: se comparó cada serie contra HEAD: ninguna fecha perdida, ningún valor viejo cambiado, solo días agregados (el PEN llenó un `null` del 2026-09-28); `medir-pipeline.mjs` dice «nada que medir» para esta tool.

## Versión 1128 — Las listas de prueba cambian por la ranura de la semana, no por un defecto [461]
- Se reprodujo el «reescribe los lotes de prueba sin que cambie nada»: lo que cambia es la ranura de la semana (S43 a S44, rota por diseño) y el orden de un bloque de casos raros; `lotes-prueba.mjs` es estable al repetirlo y `--check` da «al día». Se commitean las listas regeneradas y el item 8 del 461 queda tachado con ese motivo.
- Medición: no cambió ninguna tool.
