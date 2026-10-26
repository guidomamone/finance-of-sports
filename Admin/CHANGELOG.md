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

## Versión 1122 — Prevención de las ganancias en inmovilizado mal categorizadas [414 · audit.js, recategorizar-linea.mjs, votacion-contar.mjs]
- Aviso P3 nuevo `ganancia-inmovilizado-sin-mirar`: una línea de «Otros ingresos» con rótulo de ganancia de activos y el 5 % o más de los ingresos pide mirar el documento (la misma cifra) y moverla o anotarla con `fos recategorizar-linea` (`--a player_sales`, `--a asset_sales` o `--mirada`). Cada recategorización deja la respuesta de la cola para que una recarga no la deshaga.
- Corrige: Sporting 2005 (de 99,8 M a 34,8 M de ingresos) y Chelsea 2023 (de 682,5 M a 605,9 M) pasan la venta de una participación a `assetSales`, con su fila «Venta de activos»; el resultado neto no cambia. `votacion-contar --escribir` guarda los votos completos en `Admin/mediciones/votos/`.
- Medición: `audit.js` y `audit-chequeos-6.js`, medidor audit, lote chico: una diferencia explicada (el índice de los .md, que ya venía desactualizado). Patrón GENERAL. Sin revisión independiente de la Auditora.

## Versión 1121 — Los niveles de la auditoría dicen lo mismo en el código y en la skill [417 · audit.js, audit-chequeos-6.js]
- P1 pasa a «algo roto que frena el commit, lo vea o no el visitante». Aviso P3 nuevo `severidades-desfasadas`: salta si la tabla de severidades de la skill `auditoria-finance-of-sports` y `SEV_TITULO` dejan de coincidir. El texto de la skill va en su propio commit.
- Medición: `audit.js` y `audit-chequeos-6.js`, medidor audit, lote chico: idéntico. Patrón GENERAL. Sin revisión independiente de la Auditora.

## Versión 1120 — Ganancias en inmovilizado que eran traspasos pasan a ventas de jugadores [414 · recategorizar-linea.mjs, CONVENCIONES-DATOS]
- Regla votada 3 a 0: una ganancia en inmovilizado de un club de fútbol va a `player_sales` solo si el documento la liga con jugadores. Corrige: Benfica 2007 (24,1 M), Sporting 2002 y 2003 (13,4 M y 8,1 M) y PAOK 2017 y 2019 a 2025 (de 0,5 M a 31,8 M) pasan de «Otros ingresos» a «Ventas de jugadores», cada una con la cita del documento; los totales no cambian. Santa Clara 2025 queda como estaba (el documento no la liga con jugadores). Sporting 2005 y Chelsea 2023 no son jugadores (venta de participaciones): quedan para decidir si van a `assetSales`.
- Herramienta nueva `fos recategorizar-linea` (manual, no es del pipeline: no corre en ningún lote). Se quitaron 3 silencios `catchall-dominante` que ya no hacen falta. Sin medición de pipeline.

## Versión 1119 — Nota en el Estado de resultados cuando un ingreso es negativo [415 · finanzas-render.js, finanzas-multi.js]
- Un renglón de ingresos negativo (las deducciones sobre la receita de los clubes brasileños, y los de Turquía, Portugal y otros) lleva un bocadillo y un asterisco a «Notas sobre este club», con una nota por ejercicio; sin cambiar los datos. Un año y varios años. Verificado con Flamengo 2024 y 2025 en español e inglés y a 375 px.

## Versión 1118 — La cola no guarda una respuesta sin evidencia, seguridad y causa [458 B · cola.mjs, cola-respuesta.mjs, probar-registros.mjs]
- `cola.mjs --responder` se niega si falta `--evidencia` (`ruta.md:12-30` o `ninguna`), `--seguridad` o `--causa`, y dice las que faltan; sin salida de emergencia. `--corregir-categoria` y el cierre de obsoletos siguen igual. La prueba de `probar registros` pasa de «es la de siempre» a «no guarda».
- `desde` de `esquemas-registros.json` pasa a 2026-10-26: las 112 respuestas del 25 sin esquema quedan como legado y el aviso `registro-fuera-de-esquema` baja a 0. No se reescribieron.
- Medición: `cola.mjs` y `cola-respuesta.mjs`, lote completo (cargar, audit, escribir, verificar, lote-ensayo, alta): idéntico. Patrón GENERAL. Sin revisión independiente de la Auditora.

## Versión 1117 — Las páginas de club con margen bruto ya no dicen «Ingresos» [458 A · generate-club-pages.js]
- Los 14 clubes con ejercicios de margen bruto (los 7 con último ejercicio de margen, entre ellos Lierse SK y Vejle) llaman «Margen bruto» a esa cifra en el título, la descripción, la tabla y la imagen al compartir; la tabla suma la columna y las barras no mezclan bases. Elegida la alternativa B del mockup 149.
- Medición: `generate-club-pages.js`, medidor audit, lote chico: con las páginas viejas, 2 diferencias explicadas (`club-pages-desfasado`, `codigo-sin-accion`); con las 14 regeneradas, idéntico. Patrón GENERAL. Sin revisión independiente de la Auditora.

## Versión 1116 — Sarpsborg 2021 y Telstar 2025: el PDF mismo no trae el informe, no se re-transcribe
- Mirados a ojo, sin gastar API: el PDF de Sarpsborg 2021 trae el informe de EY de 2020 repetido (pág. 9) y el de Telstar 2025 termina en la pág. 26 y remite a la controleverklaring de la 27. Las dos líneas pasan a «FALTA EN EL PDF» y a la lista de sourcing.
- Medición: no cambió ninguna tool.

## Versión 1115 — Marcador `sin-competencia` en `data/club-leagues/` [audit-chequeos-6.js]
- Un ejercicio en el que el club no jugó ninguna competencia oficial de mayores (Novorizontino 2010, año de fundación) lleva `'sin-competencia'`: cuenta como verificado, no agrupa bajo ninguna liga, pide su línea en `ligas-no-catalogadas.jsonl` y `audit-chequeos-6.js` nunca lo «abre» como liga. El card «en otra liga» ya no ofrece como liga a quien no está en el catálogo (`liga-no-catalogada` incluida). Documentado en `ARQUITECTURA.md` y `PIPELINE.md`.
- Condición nueva en una tool, sin revisión independiente de la Auditora.
- Medición: idéntico (lote chico del medidor `audit`); con el dato nuevo el audit no suma avisos.

## Versión 1114 — `fos informe-en-pdf`: ¿el PDF trae el informe del auditor que falta en su .md? [informe-en-pdf.mjs, fos-comandos.json]
- Mira gratis, con `pdftotext`, si el PDF menciona el informe del auditor más veces que su transcripción, y detecta el escaneado. De los 34 `falta_transcripcion` que podían ser de transcripción, en 32 el PDF no trae más: re-transcribir con Mistral no ayuda; los otros dos (Sarpsborg 2021 y Telstar 2025) son escaneos.
- Medición: no es una tool del pipeline (no escribe nada ni llama a ninguna API).

## Versión 1113 — El card «en otra liga» ya no compara un margen bruto como ingreso [457 · liga.js, principal.js]
- Un ejercicio de margen bruto compara su estimado (etiqueta «Estimado», con el rango del 80 %) o el ingreso del informe siguiente (etiqueta «Informe siguiente»); sin ninguno el card queda en gris («Sin ingresos») y pasa solo a comparado cuando `estimar.mjs` genera el estimado. «Ver el ranking completo» lo muestra con el estimado. Mockup 148 aprobado (español e inglés sin mezclar).
- Verificado en escritorio y 375 px, en español e inglés, con Lierse SK 2025 (estimado), Vejle 2025 (gris) y RWDM 2024 (informe siguiente); sin errores de consola propios.
- Medición: no aplica a tools del pipeline (pantalla).

## Versión 1112 — Aalesund 2024 cargado (hueco ejercicio-sin-rastro) [aalesund-no]
- Aalesund 2024 (lote 154): dos ajustes de signo en el financiero (gastos «Nedskrivning» y «Annen rentekostnad» restan; cierra con el resultado 455.038 NOK) y el año 2024 (el documento es de 01.01 a 31.12.2024; 2025 es el depósito). Liga no-1divisjon 2024 con dos fuentes (Wikipedia y RSSSF) y su línea del auditor (Contabile AS, sin salvedades).
- Ross County: Roy MacGregor, chairman desde 2010-06-30 (Companies House, dato de Guido) en `data/gestiones/gb.js`; el caso de la cola pasa de `preguntar-club` a `aceptar`.
- Medición: sin cambio de tools.

## Versión 1111 — Excelsior 2020 cargado (hueco ejercicio-sin-rastro) y calibración de la cola: ocho segundas revisiones de cierre-por-pais alta [excelsior-nl]
- Excelsior 2020 cargado (lote 153, US$ 0,06): «Resultaat deelneming» (−43.569) va al financiero por ajuste, como en 2024, y cierra con el resultado impreso. Calibración de la cola: 8 segundas revisiones de cierre-por-pais alta, las 8 coinciden (21 de 131).
- Ligas con dos fuentes: Rapid Wien 2014 (Bundesliga 2013–14), Dynamo Majachkala 2021 (Segunda Liga rusa), Novorizontino 2012 (Segunda Divisão paulista) y 2010 (sin competencia oficial, año de fundación), estos tres como liga-no-catalogada con su línea de registro. Mockup 148 del card «en otra liga» para margen bruto, sin implementar.
- Auditor: 325 líneas nuevas en `auditoria.jsonl` por 29 subagentes Sonnet; `auditoria.mjs --check` confirmó cada cita y a mano se corrigieron Fredrikstad 2012, Besiktas 2014 y un `falta_transcripcion`. Cola: Sarpsborg (2011 y su perfil) contestada, Falkirk y Salford descartadas sin dos fuentes del chairman, Ross County a `preguntar-club`.
- Medición: ninguna tool cambió. Se midió y se descartó que total_ingresos/total_gastos valgan la fila de su línea (idéntico en 1.029 documentos; ver HALLAZGOS-pipeline.md).

## Versión 1110 — verificar-lecturas.mjs, vocabulario-datos.mjs: el total y su único renglón no se suman dos veces, vale la fila del resultado si el resumen de la IA trae otra cifra, y el vocabulario noruego del financiero [456 · verificar-lecturas.mjs, vocabulario-datos.mjs]
- `verificar-lecturas.mjs`: si el total impreso y su único renglón son la misma cifra («Driftsinntekter» y «Sum driftsinntekter»), la fila del total no se suma aparte (Aalesund 2018 daba 83,18 M de ingresos en vez de 41,59 M). Si el importe del resumen `resultado` de la IA no es el de ninguna fila de resultado del estado y difiere más de 1 % de la fila de su propia línea, vale la fila (Bolton 2024-25 traía la remuneración del personal de otra tabla como resultado).
- `vocabulario-datos.mjs` (noruego): «Inntekt på investering…» suma y «Nedskrivning av finansielle…» resta en el financiero por rótulo: Aalesund 2018 cierra con el resultado impreso (1,20 M).
- Verificado a mano (456): Aalesund 2018 cargado: ingresos, gastos y financiero cierran con el resultado impreso (1,20 M NOK); las notas 15 y 16 no cambian el total, sin criterio nuevo
- Medición: 2 diferencias, todas explicadas (Bolton y Aalesund; lote completo idéntico). Una primera versión rompía Sarpsborg 2008 (8 renglones con redondeo) y se acotó a un solo renglón.
- Aalesund 2018 cargado (lote 152): ingresos 41,59 M, gastos 41,48 M, resultado 1,20 M NOK, sin desglose por rubro. Las transferencias con el club matriz de las notas 15 y 16 ya están dentro de los renglones del estado, que cierra con el resultado impreso: no hizo falta votar un criterio. Punto 456 cerrado.

## Versión 1109 — audit-chequeos-6.js: los chequeos de ligas no catalogadas, claves repetidas y estimados repetidos salen de audit-chequeos-2.js (pasó los 40 KB) [audit-chequeos-2.js, audit.js]
- Sin cambio de lógica: tres funciones a un módulo nuevo y `audit.js` las importa de ahí. Comentarios sin fecha en `cierre-propuestas.mjs` y `produccion.mjs`. Las entradas de las Versiones 1090 y 1096 se acortan (pasaban de 1.500 caracteres).
- Viborg FF 2021 cargado con el cierre del 30/06 por ajuste; Fredericia 2018 y Rapid Wien 2013 a 2023 con liga (`ligas-sin-verificar.mjs`; Fredericia confirmado también por la Wikipedia en danés).
- Medición: 1 diferencia, explicada (lote completo: idéntico).

## Versión 1108 — tipo-sin-desglose.js, audit.js, audit-chequeos-2.js: la puntuación final no cambia un rótulo aprendido y claves repetidas en los JSON de configuración [tipo-sin-desglose.js, audit.js]
- `tipo-sin-desglose.js`: la tabla de rótulos aprendidos ignora la puntuación final («Ingresos operativos:» = «Ingresos operativos»), que había vuelto a mandar a la cola un rótulo ya contestado (Once Caldas 2018).
- `audit.js` suma `json-clave-duplicada` (P2): una clave repetida en un mismo objeto de un `.json` de `tools/` o de `tools/club-league-reference/` (JSON.parse se queda con la última). Primer hallazgo real: `tools/contexto-manual.json` tenía a Fredericia dos veces y la entrada de 2017 no valía; se juntaron. Contexto y sponsors regenerados.
- Medición: 3 diferencias, todas explicadas (lote completo: idéntico).

## Versión 1107 — Rijeka 2023, Once Caldas 2018 y Viborg FF 2019 y 2020 por el pipeline; los años de margen sin estimado se resuelven solos [455]
- Rijeka 2023 (euros; el informe reexpresa 2022 en euros: 69.154 M HRK / 7,5345 = 9.178 M EUR) y Once Caldas 2018 (sin estado de resultados: sale de las notas 20, 24, 25 y 26 y cierra con el impuesto diferido NIIF como fila de impuesto y la nómina de «gastos de ventas» como sueldos del plantel, `ajustes.mjs`) cargados. `contexto-manual.json` tenía a Once Caldas dos veces: la clave repetida pisaba la entrada nueva; se juntaron.
- Prueba con Viborg FF 2019 y 2020 (dos ejercicios reales de la 1ª División danesa, lista 2018-19 bajada): Fredericia 2022 a 2024 pasó de sin estimado a estimado sin tocar nada más (el modelo pide 2 clubes reales en la liga o en su nivel); los años de margen sin estimado bajaron de 15 a 5 en la sesión. El resto espera ejercicios reales de la Superliga y de la 1ª 2024.
- Verificado a mano (455): Cada ejercicio de margen bruto tiene su marca en el JSON (revenue_basis) y cargar avisa un margen nuevo; Ligas estima esos años (el real de un informe posterior lo pisa; ancla probada con Lommel 2024, anotada al escribir) con error a la vista y tope del 60 %; los años sin liga se asignaron con dos fuentes; Jev contesta el rótulo desconocido con tres votos coincidentes, con la cola de respaldo; prueba de que los años que quedan sin estimado se resuelven solos al sumar ejercicios reales (Viborg FF 2019 y 2020 bajaron Fredericia 2022 a 2024); 5 años de margen siguen sin estimado a la espera de reales de la Superliga
- Medición: no aplica (datos, sin tools de código).

## Versión 1106 — segunda-fuente-liga.mjs, audit.js, audit-chequeos-2.js: tablas amateur de RSSSF y aviso por una liga que el sitio no tiene [455 · segunda-fuente-liga.mjs, audit.js]
- `segunda-fuente-liga.mjs` lee también las filas de posición sin el punto («1  Club   30 22 5 3 71 69- 20», las amateurs belgas de RSSSF), con PJ, G, E, P, puntos y goles para no cortar un nombre que empieza con número.
- `audit.js` suma `liga-no-catalogada-sin-registro` y `liga-por-abrir` (3 club-años de la misma liga que el sitio no tiene: abrirla con `catalogo-liga.mjs`), leyendo `Admin/registros/ligas-no-catalogadas.jsonl` (documentado en `Admin/PIPELINE.md`). Comentarios sin fecha en `alta-club-analisis.mjs` y `estimar.mjs`.
- Medición: 3 diferencias, todas explicadas (lote completo: idéntico).

## Versión 1105 — RAAL 2018 y Zulte Waregem 2025 con liga, el bocadillo de gastos sin rótulo, la tabla RSSSF de la 1ª Amateur con la tool [454 · 455]
- RAAL 2018 estaba en `liga-no-catalogada` pero la 3ª Amateur belga ya existe en el catálogo: pasa a `be-div3amateur` (lista de 64 equipos de Wikipedia, 2017–18). Zulte Waregem 2025 pasa a `be-challengerproleague` (alias «S.V. Zulte Waregem»; una fuente: la tabla de RSSSF de 2024-25 trae 15 equipos y la de Wikipedia 16).
- Dynamo Makhachkala 2021 sigue en `liga-no-catalogada` y su liga (la Segunda Liga rusa) queda anotada en `Admin/registros/ligas-no-catalogadas.jsonl`. Las tablas RSSSF de la 1ª Amateur 2018 y 2020 pasan a guardarse con `segunda-fuente-liga.mjs`, no a mano.
- El bocadillo de «s/d» de los gastos queda sin rótulo, como la nota (español e inglés). Medición: no aplica a estos datos; las tools de la sesión van en su propia entrada.
- Verificado a mano (454): Plantillas de «Notas sobre este club» aprobadas por Guido (textos de ventas totales, gastos, parte y bocadillos; una nota por año y el mismo texto en un punto aunque no sean consecutivos); un ejemplo real de cada plantilla y los 4 casos raros revisados con Guido; Fredrikstad 2016-2018 y 2024 a ventas totales; Panetolikos 2021 con el rótulo corregido; comprobado en pantalla (Argentinos Juniors, Fredrikstad, Dender, Panetolikos)

## Versión 1104 — los 5 años de margen bruto sin liga y Panetolikos 2021 [455 · 454 · panetolikos-gr]
- Liga asignada con dos fuentes (Wikipedia en inglés y RSSSF, ésta anotada en `be.json`): Lommel 2018, RWDM 2020 y Lierse Kempenzonen 2018 (era Oosterzonen, mismo club) en la 1ª División Amateur; Vejle 2022 en la 1ª División danesa. RAAL 2018 jugó en la tercera amateur, que el sitio no tiene: `liga-no-catalogada`. Alias nuevos («Oosterzonen», «Vejle Boldklub», «Vejle BK»). Años de margen sin estimado: 15 a 9 (los que quedan no tienen un club real en su liga-año).
- Panetolikos 2021: el rótulo de la línea era una fila geográfica («Αγορές τρίτων χωρών», glosada «Compras de terceros países»); pasa a «Κύκλος εργασιών (καθαρός), resto sin desglosar (sin la venta de un jugador)»; los 600.000 € de venta de jugador y el total no cambian.
- `audit-ignore.json`: la aceptación de las filas en null ya no depende del número («24 de 13»); `audit-acciones.json` suma 5 códigos. Medición: no aplica (datos y registros; sin tools de código).

## Versión 1103 — «Notas sobre este club»: una nota por año, el mismo texto en un solo punto aunque los años no sean consecutivos, y los textos de Guido [454 · fredrikstad-no]
- Los ingresos y los gastos de un mismo ejercicio salen en una sola nota; los ejercicios con el mismo texto se juntan en un punto sin importar si son consecutivos («2016 a 2018 y 2024»), así un año nuevo con el mismo caso se suma solo. Textos nuevos (Guido): ventas totales («El documento informa una categoría como ingresos pero no lo abre por rubro…») y gastos sin el rótulo; un renglón de un año con más de una línea de ingreso (un departamento, una división) usa el texto de «parte».
- Fredrikstad 2016 a 2018 y 2024: «Annen driftsinntekt» es igual a «Sum inntekter», o sea el ingreso total: pasa a ventas totales y se aprende para los años que vengan; 2013 a 2015 sigue como una parte del ingreso.
- Medición: no aplica (sin tools del pipeline); comprobado en pantalla con Argentinos Juniors (una nota por año) y Fredrikstad (un solo punto para 2016 a 2018 y 2024).

## Versión 1102 — cargar-ejercicio.mjs, jev-tipo-linea.mjs: Jev contesta primero el rótulo desconocido de una línea única de ingresos [455 · cargar-ejercicio.mjs, jev-tipo-linea.mjs]
- Un rótulo de línea única que ninguna regla ni respuesta anterior reconoce se le pregunta a Jev (3 respuestas solo con el rótulo; centavos de API, aprobado por Guido). Si las 3 coinciden con confianza de 0,8 o más, el tipo (margen bruto, ventas u otra) se aprende en `tipos-sin-desglose.jsonl` y no se vuelve a preguntar; si no, va a la cola como antes. Gasto en `Admin/registros/api/jev.jsonl`.
- Calibrado con rótulos de los tres tipos: los claros dan 0,85 o más; los ambiguos («Fútbol profesional», «Annen driftsinntekt») y uno inventado, 0,4 a 0,79, y van a la cola. Probado de punta a punta cambiando un rótulo de un documento y revirtiendo.
- Medición: idéntico (lote completo).

## Versión 1101 — cargar-escribir.mjs, cargar-ejercicio.mjs: la ancla del ingreso del año anterior de margen bruto se anota al escribir [455 · cargar-escribir.mjs, cargar-ejercicio.mjs]
- La ancla (`Admin/registros/ingresos-ancla.jsonl`) se proponía pero nunca se anotaba: `cargar.mjs` le pasa un argv limpio a las fases y la condición `--escribir` de `cargar-ejercicio.mjs` no se cumplía. Ahora la anota `escribir()` (una línea por club-año, sin repetir, y la revierte un P0/P1 de la auditoría).
- Probado con Lommel 2024: la línea se anota una sola vez y una segunda carga no la duplica. Recarga de Dender 2024 (margen bruto, sin ancla posible), RWDM 2023 (idéntico) y Lommel 2022 (mismos totales; la amortización queda entera porque la regla del 630 por la nota no parte un año ya publicado).
- Medición: 1 diferencia, explicada (lote completo: idéntico).

## Versión 1100 — alta-club-analisis.mjs, alta-club.mjs, cargar-inicio.mjs, cargar-escribir.mjs, audit.js, audit-chequeos-2.js: moneda legado sin preguntar, Wikipedia local en la compuerta y chequeo de estimados repetidos [455 · alta-club-analisis.mjs, cargar-inicio.mjs, cargar-escribir.mjs, audit.js]
- Un ejercicio anterior al cambio de moneda cuyo documento habla sobre todo en la moneda vieja se carga en ella (kunas, liras…), con su tipo de cambio a USD del cierre y sin preguntar ni frenar (decisión de Guido); `HRK` entra a `CURRENCY_META` con su paridad fija al euro. La compuerta de estadio y sponsor de `cargar` usa también la Wikipedia del idioma del club (`--local`); regla en `Admin/PIPELINE.md`.
- `audit.js` suma `estimado-repetido` (P1): un club con dos estimaciones en la misma liga-año, aunque la tool misma lo repita. Dato nuevo: lista de Tottenham 2019 corregida a mano; listas de la 1ª División danesa 2018 y 2021 a 2025.
- Medición: 4 diferencias, todas explicadas (completo: idéntico); la mediana solo cambia Rijeka 2022, que deja de frenar por la moneda y carga en kunas.

## Versión 1099 — estimar.mjs, fetch-club-league-reference.mjs: un ejercicio estima en una sola temporada; una lista de Wikipedia corregida a mano no se pisa [455 · estimar.mjs, fetch-club-league-reference.mjs]
- `estimar.mjs`: un club del sitio se estima solo en la temporada que le da la regla de lo real (la categoría al cierre del ejercicio, `faltantes-liga.mjs`). Chile 2013 caía en dos temporadas que se pisan por el cambio de calendario (la de 2013 y la de 2013–14) y Colo-Colo y Universidad de Chile salían dos veces, con +68 % y +115 % la segunda.
- `fetch-club-league-reference.mjs`: una lista con `manualFix` no se vuelve a escribir sin `--forzar`. Tottenham 2019 (lista de Wikipedia con «Tottenham» dos veces: 21 equipos para 20) corregida a mano y marcada.
- Medición: 3 diferencias, todas explicadas (lote completo: ensayo idéntico; `audit` suma `estimados-desfasado`, que se corrige al regenerar); `data/estimados/` con y sin `estimar.mjs` difiere solo en Chile 2013 (las dos filas repetidas).

## Versión 1098 — cargar-ejercicio.mjs, tipo-sin-desglose.js: el rótulo de una línea única desconocido se aprende por la cola, y el ingreso del año anterior de margen bruto se anota como ancla [455 · cargar-ejercicio.mjs, tipo-sin-desglose.js]
- `tipo-sin-desglose.js`: mira primero lo aprendido (`Admin/registros/tipos-sin-desglose.jsonl`) y después las palabras; `tipoConocido` da null si nada reconoce el rótulo. `cargar-ejercicio.mjs` manda esa línea de ingresos a la cola (motivo `tipo-linea`, no frena) y aprende la respuesta: no se pregunta dos veces.
- `cargar-ejercicio.mjs`: si el año anterior del club es de margen bruto y el documento (esquema belga) imprime el ingreso de ese año en su columna anterior, `--escribir` lo agrega a `Admin/registros/ingresos-ancla.jsonl` (Lommel 2024 propone los 5,806012 M EUR de 2022/23).
- Medición: idéntico (lote completo); ni la cola nueva ni el ancla aparecen en los lotes de prueba, y se probaron a mano.

## Versión 1097 — estimar.mjs: tope de error por país y caso, automático [455 · estimar.mjs]
- `ERROR_MAXIMO` = 60 % (decisión de Guido): un estimado no se publica si el error mediano medido de su país y su caso (club nuevo, entre dos reales, antes o después; con menos de 8 club-años medidos vale el error global del caso) lo pasa. Se recalcula en cada `--escribir` y `--check` (la auditoría, `estimados-desfasado`). Regla escrita en `Admin/CONVENCIONES-DATOS.md`.
- Efecto: 1.528 estimados de club nuevo dejan de publicarse (Portugal 781, Colombia 512, Grecia 233, Croacia 2); Bélgica, Dinamarca y los de club con otros años siguen.
- Medición: 5 diferencias, todas explicadas (medidor de auditoría); el error global del modelo no cambia.

## Versión 1096 — generate-rankings.js, estimar.mjs, faltantes-liga.mjs, generate-club-index.js: Ligas estima los años de margen bruto y un ingreso real de un informe posterior lo pisa [455 · 447 · generate-rankings.js, estimar.mjs, faltantes-liga.mjs, generate-club-index.js]
- Un ejercicio de margen bruto (`revenue_basis: gross_margin`, `gm` en `data/club-index.js`) sale del ranking, la composición y la mediana de la liga (`margen` en `data/rankings/`) y `faltantes-liga` ya no lo da por cubierto: `estimar.mjs` lo estima (interpolación entre sus años completos o modelo de club nuevo, margen positivo como piso, rango medido); un ingreso real de un informe posterior (`Admin/registros/ingresos-ancla.jsonl`: Lommel 2022/23, RWDM 2023/24, SønderjyskE 2023/24) lo pisa. Finanzas no cambia.
- Error del modelo medido con `estimar --medir`: por club 51 % antes, 50 % ahora (39 filas menos de entrenamiento); en Bélgica y Dinamarca cambian los estimados que estaban envenenados por márgenes chicos; fuera de ellos 6.757 estimados con mediana de cambio 0,9 % (los dos saltos de Chile 2013 eran una fila repetida: Versión 1099).
- `js/liga.js` y `data/lang/en.js`: «(informe siguiente)» para el dato real, dos notas nuevas (margen bruto e informe siguiente), el club de margen sin estimado va a «sin ingreso calculable» y una liga-año sin ningún club real no muestra el total en cero; `Admin/PANTALLA.md` al día.
- Medición: 4 diferencias, todas explicadas (medidor de auditoría); se verificó a mano comparando los estimados antes y después y la pantalla de Ligas en español, inglés y 375 px.

## Versión 1095 — audit-chequeos-1.js: la banda de escala no cuenta los ejercicios de margen bruto [455 · audit-chequeos-1.js]
- `escala-implausible` (P0) marcaba como error de escala un año de margen bruto (`revenue_basis: gross_margin`) de cifra chica por naturaleza (un margen de 0,09 M USD en un club que factura unos 100 veces más), y revertía su carga; ahora ese año no entra a la banda. Lo encontró la carga de prueba de un año belga con margen sin año vecino parecido.
- Medición: 5 diferencias, todas explicadas (medidor de auditoría, lote chico): se va `escala-implausible` para ese año con los datos de HEAD; el resto de la auditoría idéntico.

## Versión 1094 — cargar-escribir.mjs, nbb.mjs, ingreso-derivado.js, audit-chequeos-3.js: la escritura persiste la marca de ingreso, el reconstruido lleva su rótulo y el margen reconstruible frena [455 · cargar-escribir.mjs, cargar-ejercicio.mjs, nbb.mjs, ingreso-derivado.js, ingreso-base.mjs, audit-chequeos-3.js, prueba-escribir.mjs]
- `cargar-escribir.mjs`: el escritor copiaba una lista fija de campos y descartaba `baseIngreso`/`derivacionIngreso`: un año cargado por el pipeline quedaba sin marca (lo atrapó `prueba-escribir.mjs` al subir `ingreso-sin-base` a P1; ahora muestra el detalle del revert). `nbb.mjs`: la hoja reconstruida 70/74 lleva su rótulo (antes «Brutomarge», el de la fila a la que apunta).
- `ingreso-derivado.js`: la identidad margen + compras y servicios se reconoce también por línea (un año con extraordinarios aparte, Patro Eisden 2015 y 2017, Dender 2017); `ingreso-base.mjs` agrega la derivación a un año ya marcado.
- `audit-chequeos-3.js`: `ingreso-sin-base` y `margen-reconstruible` (un año de margen cuyo documento imprime 60/61) son P1.
- Medición: 8 diferencias, todas explicadas (lote completo): la prueba de escritura pasa con las tools nuevas y falla con las commiteadas (su chequeo marcaba a Patro Eisden 2015 y 2017); cargar idéntico. La rama nueva de nbb no está en los lotes de prueba.

## Versión 1093 — cargar-ejercicio.mjs, nbb.mjs, tipo-sin-desglose.js, ingreso-derivado.js, audit-chequeos-3.js: la carga marca el ingreso (revenue_basis, revenue_derivation) y reconstruye el belga con margen + compras y servicios [455 · cargar-ejercicio.mjs, nbb.mjs, tipo-sin-desglose.js, ingreso-derivado.js, ingreso-base.mjs, audit-chequeos-3.js]
- `cargar-ejercicio.mjs`: cada año cargado lleva `baseIngreso` (completo, ventas totales o margen bruto) y `derivacionIngreso` si se reconstruyó; un año de margen sin reconstrucción posible avisa. La regla es una sola, `baseDeIngreso` de `ingreso-derivado.js`, compartida con `fos ingreso-base`.
- `nbb.mjs`: con 9900 y 60/61 impresos y un residuo negativo (las partes de ingreso impresas no cuadran) el ingreso es una línea, 70/74 = 9900 + 60/61, en vez del margen; no cambia ningún año cargado salvo Patro Eisden 2020 (ya corregido en el dato); 4 columnas de 302 documentos belgas usan la rama.
- `tipo-sin-desglose.js`: reconoce margen bruto en más idiomas; `audit-chequeos-3.js`: `ingreso-sin-base` sube a P2.
- Medición: idéntico (lote completo); la rama nueva de nbb no está en los lotes de prueba, por eso se probó a mano sobre los 302 documentos belgas con estado NBB.

## Versión 1092 — Patro Eisden 2019/20: el ingreso se reconstruye con margen bruto + compras y servicios [455 · patroeisden-be]
- El documento corregido imprime el margen bruto (277.991) y compras y servicios (423.072): el ingreso es 701.063 EUR (70/74 = 9900 + 60/61), y el sitio mostraba solo el margen. Ahora: una línea «Bedrijfsopbrengsten» de 0,701 M (como Patro Eisden 2019) y 0,423 M de compras y servicios en los gastos; el resultado (-0,708 M) no cambia. No se abre en ventas y otros: las partes que el documento imprime (70 y 73) no cuadran con el margen.
- Marcado `revenue_basis: sales_total` y `revenue_derivation` (12 reconstruidos); `audit.js` P0 0, P1 0 y comparado en pantalla (0,8 M USD en 2019/20).
- Medición: no aplica (un dato de un club; sin tools del pipeline).

## Versión 1091 — los 1340 ejercicios con su base de ingreso (revenue_basis) y los 11 reconstruidos marcados [455]
- `fos ingreso-base --escribir` sobre los 331 clubes: 1258 `full`, 32 `sales_total`, 46 `gross_margin`; 11 con `revenue_derivation` (Patro Eisden, Lokeren-Temse, Dender). Los 4 años sin meta (Lierse SK 2019-2021, Patro Eisden 2021) no se pueden marcar.
- Probado: datos, fuentes y totales idénticos antes y después en los 331 clubes (sin contar los dos campos); `generar-data --check` en verde; `data/schema/club-v2.json` regenerado. `Admin/mediciones/455-...md` corregido (46 de margen, 11 reconstruidos; ancla de SønderjyskE 2024).
- Medición: no aplica (datos; la tool se midió en la Versión 1090).

## Versión 1090 — cambio-formato.js, audit-chequeos-3.js, json-datos.mjs, ingreso-derivado.js, ingreso-base.mjs: señal de cambio de formato más precisa y marca del ingreso por año (revenue_basis, revenue_derivation) [455 · 447 · cambio-formato.js, audit-chequeos-3.js, audit.js, json-datos.mjs, ingreso-derivado.js, ingreso-base.mjs]
- `cambio-formato.js`: un año con una línea extra que pesa menos del 10 % no cuenta como «completo» (23 a 15 avisos); `audit-chequeos-3.js`: `cambio-de-formato-sin-nota` da por cubierto un año resumido que ya lleva la nota automática de `sinDesglose`.
- `json-datos.mjs` (+ esquema, paquete): campos opcionales `adjustments.revenue_basis` (`full`, `sales_total`, `gross_margin`) y `revenue_derivation` (`margin_plus_costs`: margen bruto + compras y servicios del documento); `ingreso-derivado.js` es la identidad, `ingreso-base.mjs` (`fos ingreso-base`) la escribe en los ejercicios ya cargados sin tocar importes (probado idéntico en los 331 clubes).
- `audit.js`: `ingreso-reconstruido-no-cierra` (P1: un reconstruido que ya no cierra con su documento) e `ingreso-sin-base` (P3).
- Medición: 3 diferencias, todas explicadas (lote completo): se va `cambio-de-formato-sin-nota`; aparecen `ingreso-sin-base` (la marca se escribe en el commit de datos siguiente) y `todo-cumplido` del 447 (no se cierra sin autorización); cargar, escribir, caja-deuda y alta idénticos.

## Versión 1089 — inventario de ingresos con margen bruto y punto 455 (estimado de Ligas y detección en el pipeline) [455 · 447]
- `Admin/mediciones/455-ingresos-con-margen-bruto.md`: 53 de 1340 ejercicios en 14 clubes (solo Bélgica y Dinamarca cargados), peso por liga-año, la identidad del margen belga (ingreso = margen + compras + servicios, verificada al euro) y qué se recupera sin estimar (Lommel 2022/23, RWDM 2023/24, Patro Eisden 2020); el margen no sirve de proxy (razón 2 a 18).
- Casuísticas revisadas: Fredrikstad «Annen driftsinntekt» es el ingreso total; «Receita Operacional Bruta» de Remo no tiene deducciones; el resto sin hallazgos.
- `Admin/TODO.md`: punto 455 con la propuesta aprobada (estimado solo en Ligas, formato de estimados existente, dato real lo pisa) y los cambios de pipeline.
- Medición: no aplica (documentos y TODO; sin tools).

## Versión 1088 — «Notas sobre este club»: sin montos, años consecutivos juntos, nota del margen bruto y del renglón parcial [447 · 454]
- `js/finanzas-render.js` (`renderNotasClub`): las notas ya no llevan el importe (la tabla lo muestra) y los ejercicios consecutivos con la misma nota se juntan en un punto («2019/20 a 2022/23»; en inglés «to»).
- Texto nuevo del margen bruto: no sabemos cuántos ingresos generó el club, solo la diferencia con parte de sus costos; no comparar con años que abren los ingresos. Caso nuevo `salesPart` (el renglón sin abrir es una parte de los ingresos del año): se dice que figura como s/d y que el resto está abierto, sin afirmar que el total es comparable (antes lo decía en más de 200 ejercicios).
- `data/lang/en.js`: `pl.notas.margin`, `.sales`, `.salesPart`, `.other`, `.exp`, `.hasta`. ASSET_V 1772.
- Medición: no aplica (sin tools del pipeline); verificado en Lommel (es/en, escritorio y 375 px, sin scroll horizontal) y `audit.js` P0 0, P1 0.

## Versión 1087 — se saca del sitio el texto interno de Resultados; estado de 447, 454 y 452 en el TODO [447 · 454 · 452]

- `index.html` y `en.js`: «Fuentes: Wikipedia…» ya no dice «buscada y verificada en agosto de 2026. A cruzar contra el sitio oficial de cada club antes de publicar» (nota interna que el visitante veía). Los puntos 447, 454 y 452 siguen abiertos (Guido los cierra); cada uno lleva en su cuerpo lo hecho y lo que queda.
- Medición: solo documentos y textos.

## Versión 1086 — medir-pipeline.mjs: cada nivel corre solo su tramo; fos progreso [medir-pipeline.mjs, progreso-medicion.mjs]

- Las listas chico, mediano y completo están anidadas y cada nivel corría la suya entera: 126 + 548 + 1004 = 1678 documentos en vez de 1004. Ahora cada nivel corre los documentos que no estaban en uno menor (126, 422, 456): el corte temprano en el chico sigue y el total baja 40 %. Un medidor que no usa lista corre y se compara una sola vez, en el primer nivel.
- `medir-pipeline.mjs` escribe `Admin/mediciones/pipeline/_progreso.json` en cada paso y `node tools/fos.mjs progreso` dice el porcentaje, qué corre y cuánto falta. La medición se lanza sin `| tail`: su salida se ve en vivo.
- Medición: no es del pipeline; `probar-medir-pipeline.mjs` ok y una medición real de `cargar-ejercicio.mjs` contra el commit anterior (126 + 422 + 456 documentos, idéntica, 10 min 52 s).

## Versión 1085 — marca s/d y notas sobre el club (base de 447, 454 y 452) [447 · 454 · 452 · bfo-rusia.mjs, cargar-ejercicio.mjs, cargar-escribir.mjs, json-datos.mjs, tipo-sin-desglose.js]

- Las celdas que el documento no abre se ven `s/d` (inglés `n/d`) con bocadillo y asterisco a «Notas sobre este club», armado por ejercicio con plantillas es/en desde `sinDesglose`. `no_breakdown` suma `kind` (opcional; schema, `json-datos.mjs`, paquete exportable) y `fos sin-desglose-tipo` lo completó en 136 clubes (76 líneas agregadas, 494 tipos). `cargar-ejercicio.mjs` y `bfo-rusia.mjs` lo escriben al cargar; `cargar-escribir.mjs` ya no lo descarta. Los puntos 447, 454 y 452 siguen abiertos (Guido los cierra).
- Medición: lote completo, `cargar` idéntico; `audit`, `escribir` y el schema cambian como se espera (las versiones viejas de las tools rechazaban el campo nuevo); 10 diferencias, todas explicadas.

## Versión 1084 — i18n: textos de la pantalla que se veían en castellano en inglés; audit.js texto-sin-traducir [audit-chequeos-5.js, audit.js]

- Se traducen: Resultado neto, Intereses netos, Impuestos, Ganancia por venta de jugadores, Venta de activos, Deuda bruta, Caja, Deuda neta, Salarios / Ingresos (`data/site-labels.js`), los títulos de los gráficos, «% del total», los rótulos de Comparar, el texto de Resultados, el selector de tipo del formulario y las salvedades de las fuentes. Quedan en castellano a propósito los rótulos textuales del presupuesto de un club (cards de torneos) y los nombres de gestión que vienen de los datos.
- `audit.js` da `texto-sin-traducir` (P3) con los rótulos de `js/` fuera de `site-labels.js` y los textos de `index.html` sin `data-i18n`.
- Medición: `audit` idéntico (hoy no dispara).

## Versión 1083 — 451 cerrado: glosas de todas las etiquetas, traducidas con Claude y automáticas al escribir un año [451 · audit-chequeos-5.js, generate-glosas.mjs, glosas-etiquetas.mjs]

- `glosas-etiquetas.mjs --completar` traduce con Claude Sonnet 5.5 (no Gemini) en lotes de 100: 11.160 etiquetas distintas, US$ 4,79, 0 sin glosa (portugués, italiano, neerlandés, griego, croata, ruso, turco, alemán, japonés y estonio revisados por muestra). `generate-glosas.mjs`, en la lista de generadores, traduce solo lo nuevo al escribir un año (tope de 400 etiquetas por corrida; sin clave o sin red deja lo escrito y no frena la carga; `FOS_SIN_API=1` la apaga). Probado: una etiqueta nueva en un club se tradujo en una corrida por US$ 0,0014.
- Verificado a mano (451): SønderjyskE en español e inglés, 375 px y ?audit=1 sin errores; 0 etiquetas sin glosa en los 331 clubes; una etiqueta nueva se traduce sola con generate-glosas.mjs; P3 etiqueta-sin-glosa
- Medición: `audit` idéntico (el aviso `etiqueta-sin-glosa` ya no dispara).

## Versión 1082 — 451: las etiquetas de las filas en el idioma del visitante [451 · audit-chequeos-5.js, audit.js, generadores.mjs, generate-glosas.mjs, glosas-etiquetas.mjs]

- Las filas del «Formato del club» muestran una glosa en español o inglés con el original en el title (`tLabelH`); la tabla es `data/<país>/<club>-glosas.js` (aparte del JSON del club: no cambia el contrato). `glosas-etiquetas.mjs` la arma (`es` de las glosas de `Generados/`, `--completar` con Gemini para lo que falta); `generate-glosas.mjs` corre con los demás generadores; `audit.js` da `etiqueta-sin-glosa` (P3). SønderjyskE completo; faltan unas 11 mil etiquetas de los demás clubes (gasto de Guido, escrito en el punto).
- Medición: `audit` con una diferencia, el aviso nuevo, explicada; el medidor `cargar` no usa estos archivos. Verificado en el navegador (español, inglés, 375 px, `?audit=1` 0 no cierran).

## Versión 1081 — 444 cerrado: ningún documento de un club con algo cargado frena por falta de cierre [444]

- Estado final: los documentos anuales sin cierre en el registro pasaron de 675 a 302; de los de clubes con algo cargado (175), 44 los deducen los vecinos, 102 los confirmó la cola (`cierre-por-pais`), 29 ya tienen el año cargado y 0 frenan (el P3 `cierre-sin-fecha` lo cuenta). Los otros 127 son de clubes todavía sin cargar (Francia 43, Corea del Sur 14, Turquía 10, Chequia 9, Japón 8, Ucrania 8…): su fecha se resuelve al darlos de alta (vecinos, `cierre-propuestas --escribir` para los países con cierre por defecto, o un ajuste `cierre` leído del documento), y si un club entra con un cierre que `periodo.mjs` no lee (Corea del Sur: «AAAA년 MM월 DD일 까지») se mejora ahí, midiendo.
- Verificado a mano (444): fos cierre-sin-fecha da 0 que frenan; 13 ajustes cierre leídos del documento, 163 preguntas de cola contestadas, 25 descartados; el P3 cierre-sin-fecha cuenta los de clubes cargados (0 hoy)
- Medición: solo documentos y registros; ver las entradas 1079 y 1080.

## Versión 1080 — auditoria.mjs: un informe del auditor descartado como fuente de carga sigue siendo fuente de la auditoría [auditoria.mjs]

- Guido: cada club deja su informe del auditor. Pero `auditoria.mjs` sacaba de sus fuentes todo lo que está en `documentos-descartados.txt`, y ahí hay unos 300 dictámenes (226 «dictamen del revisor fiscal», el resto «informe del auditor…»): descartar un dictamen suelto lo dejaba sin con qué citar la línea del club-año. Ahora un descartado cuyo motivo empieza por dictamen o informe del auditor/revisor no se excluye de la auditoría. Hoy no cambia ningún resultado (`--pendientes` 359 antes y después, `--check` al día): evita que pase cuando se cargue el balance de uno de esos años.
- Medición: PARCIAL, con el ok de Guido (cortó el resto): lote chico (126 documentos), `cargar` y `audit` idénticos; el mediano y el completo no se corrieron. Commit con `[sin-medicion]`.

## Versión 1079 — 444: los 38 frenados eran 13 balances; 25 descartados y 13 ajustes cierre; frenan 0 [444 · cierre-sin-fecha.mjs, probar-cierre.mjs]

- Guido abrió `River/memoria-2018-2019` y era narración sin cifras. Se revisaron los 38 por filas con números y palabras de estados: 25 no eran balances (memorias, certificaciones, dictámenes) y entraron a `documentos-descartados.txt` con su motivo; `fos cierre-sin-fecha` ya no cuenta los descartados (el total sin cierre bajó de 457 a 302).
- Los 13 balances reales (Dortmund, Llaneros, Istra, Osijek, Rijeka, Den Bosch) llevan un ajuste `cierre` con la línea citada; Den Bosch 2019-20 con seguridad media. Frenan 0.
- Medición: `cierre-sin-fecha.mjs` no es del pipeline; `fos probar cierre` sin fallas.

## Versión 1078 — cierre-sin-fecha no cuenta los documentos cuyo año ya está cargado [cierre-sin-fecha.mjs, probar-cierre.mjs]

- De los 83 «frenan» de antes, 45 eran documentos con el año ya en el sitio (`cargado`): al registro le falta la fecha, pero no hay carga que esperar. Ahora se cuentan aparte (`yaCargados`) y frenan 38 (Colombia 16, Argentina 10, Croacia 6, Alemania 4, Grecia 1, Países Bajos 1), de los cuales unos 20 están listos para cargar y el resto aún sin segunda lectura.
- Medición: no es del pipeline (solo lee el registro y la cola); `fos probar cierre` sin fallas.

## Versión 1077 — audit.js: calibracion-cola-pendiente [audit-chequeos-5.js, audit.js]

- P3 cuando una celda (motivo × seguridad) de la cola tiene 30 respuestas o más y menos de 20 con segunda revisión (`calibrar-cola.mjs`): el recordatorio ya no depende de que una sesión se acuerde. Hoy dispara por cierre-por-pais alta (13 de 131).
- Medición: `audit` con una diferencia, el aviso nuevo, explicada.

## Versión 1076 — 298: tres letras verificadas contra el código y sacadas [298]

- aa, i y o ya estaban hechas (`worktree.mjs`, `alta-club-tablas.mjs`, `lote-preparar.mjs`); el resto del 298 sigue, con la nota de por qué no es un punto chico. Se calibró la cola con 30 segundas revisiones (30 de 30 coinciden; `Admin/registros/calibracion-cola.jsonl`).
- Medición: solo documentos.

## Versión 1075 — fos calibrar-cola: cuánto acierta una respuesta de la cola según su seguridad [calibrar-cola.mjs]

- `node tools/calibrar-cola.mjs` da por motivo y seguridad cuántas respuestas hay, cuántas se volvieron a medir con una segunda revisión y cuántas coincidieron; `--muestra N` saca respuestas al azar para un revisor que no ve la original; `--registrar` anota el resultado en `Admin/registros/calibracion-cola.jsonl` (esquema `calibracion-cola`). Hoy hay 165 respuestas con seguridad y ninguna medida.
- Medición: no es del pipeline (solo lee la cola); `fos --check` al día.

## Versión 1074 — ejercicio-sin-rastro: «en mano» avisa que puede ser solo la memoria [audit-chequeos-5.js]

- Ferro Carril Oeste 2024 salía «en mano» por el nombre de `memoria-ejercicio-120-2023-24.pdf`, pero esa memoria es narrativa y sin cifras (verificado en `Admin/sourcing/Argentina/Ferro Carril Oeste.md`; el silencio es correcto). El texto ahora pide mirar que el PDF traiga estados.
- Medición: `audit` idéntico.

## Versión 1073 — medir-pipeline.mjs no se frena por un veredicto sin commitear [medir-pipeline.mjs, probar-medir-pipeline.mjs]

- Un veredicto `RECHAZADA` de `patron` queda sin commitear en `auditoria-proceso.jsonl` y frenaba la medición siguiente («cambios sin commitear en datos o registros»). Ese archivo lo escriben `patron.mjs` y `decision.mjs`, no un medidor: sale de lo que la medición exige limpio (y de lo que revierte).
- Medición: `probar-medir-pipeline.mjs` con un caso nuevo, ok.

## Versión 1072 — 434: qué se lee en vano al arrancar; `arranque orden` de 9,9 a 4,5 KB [434]

- Informe `Admin/mediciones/434-arranque-en-vano.md` (KB por rol y por sesión). `ESTADO.md`: el rol `orden` sale de «Objetivo», «Techo del modelo» y «Sitio, publicación y analytics». Dos propuestas que tocan texto que Guido lee (partir la skill de arranque, recortar «Al empezar» de CLAUDE.md) quedan en el informe, sin hacer.
- Verificado a mano (434): informe Admin/mediciones/434-arranque-en-vano.md con Conclusión y Destino; arranque orden medido de 9,9 a 4,5 KB tras el cambio de marcas en ESTADO.md
- Medición: solo documentos.

## Versión 1071 — 417 (parte): audit.js --leyenda [417 · audit.js]

- `node tools/audit.js --leyenda` imprime los cinco niveles con su definición, los hallazgos que tienen hoy y los códigos que los emiten. Del 417 quedan la skill y el chequeo de severidades, P1 y los contrastes externos (de Guido): quedó escrito en el punto.
- Medición: `audit` idéntico.

## Versión 1070 — 416: silencios de audit-ignore con fecha de revisión; ejercicio-sin-rastro dice si el documento está en mano, descartado o no existe [416 · audit-chequeos-5.js, audit.js, probar-registros.mjs, silenciar.mjs]

- Una entrada de `tools/audit-ignore.json` puede llevar `revisar` (AAAA-MM-DD): pasada la fecha, `audit.js` da `silencio-vencido` (P3). `silenciar.mjs --revisar` la pone y la exige si el motivo es «sin verificar», «no publicado» o parecido. Las 5 entradas «aceptado sin verificar» (2026-12-23) y las 3 de «todavía no publicado» (Gladbach, Stuttgart, Monza; 2027-01-23) ya la llevan.
- `ejercicio-sin-rastro` agrega por cada año: «en mano» (hay un PDF con ese año en el nombre), «descartado» (con el motivo de `documentos-descartados.txt`) o «sin documento». Ejemplo: Fredrikstad 2019-2023 sale «descartado».
- Verificado a mano (416): silencio-vencido y --revisar probados con probar-registros.mjs; ejercicio-sin-rastro corrido sobre los 13 clubes (Fredrikstad sale descartado); 8 entradas de audit-ignore.json con revisar
- Medición: `audit` idéntico (el aviso nuevo no dispara hoy y los silenciados no cuentan); `probar-registros.mjs` con un caso nuevo, ok.

## Versión 1069 — esquema de ajustes-manuales.jsonl y mediciones-pipeline.jsonl [ajustes.mjs, medir-pipeline.mjs, audit-chequeos-5.js, probar-registros.mjs]

- `tools/esquemas-registros.json` define los dos registros (`validacion.registros`). `ajustes.mjs` (`--agregar`, `--anular`, `agregarAjuste`) y `medir-pipeline.mjs` escriben `esquema: 1` y no guardan una línea que no lo cumple; `ajustes --agregar` acepta `--causa` (opcional). Lo anterior es legado. `audit.js` (`registro-fuera-de-esquema`) revisa las líneas que declaran `esquema`.
- Medición: lote completo (1004 documentos), todos los medidores idénticos; `probar-registros.mjs` (3 casos nuevos), `probar-medir-pipeline.mjs` y `prueba-escribir.mjs` (`ajustes --agregar` en un worktree) ok.

## Versión 1068 — imports sin uso de las 7 tools grandes del pipeline; el aviso imports-sin-uso queda en 0 [alta-club.mjs, lote.mjs, verificar.mjs, caja-deuda.mjs, cargar.mjs, resolver-inventario.mjs, categorizar-claude.mjs]

- Se quitan los 174 imports restantes (el script rompió dos imports por defecto y de espacio de nombres, `vm` y `EV`: se borraron a mano y `indefinidos` quedó limpio). Los imports sin uso de tools/ pasan de 220 a 0.
- Medición: lote completo (1004 documentos), todos los medidores idénticos salvo el aviso `imports-sin-uso` de audit (desaparece), explicado por el resumen.
