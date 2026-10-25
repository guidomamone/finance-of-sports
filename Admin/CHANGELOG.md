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
