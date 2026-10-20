# To-do 314: Stirling PDF contra Tesseract y Mistral (2026-10-20, Pipeline 6)

Costo de API: US$ 0 (Stirling y Tesseract corren local; Mistral es el `.md` que ya existe). Pipeline sin cambios.

**Cómo se midió.** Seis PDFs escaneados con filas ya cargadas. Fidelidad = qué fracción de las cifras de la columna "actual" de las filas cargadas
(`.filas.json`, solo cifras de 3 dígitos o más, sin repetidas) aparece como número en el texto del motor. Motores:
Tesseract 5 a 300 dpi con `--psm 6` y con `--psm 1` (detecta la orientación); Stirling PDF v3.2.0 (jar del servidor, `ocr-pdf` con
`force-ocr`, `deskew` y `rotatePages`, después `pdftotext -layout`); Mistral = el `.md` actual.

| PDF difícil | Cifras | Tesseract psm 6 | Tesseract psm 1 | Stirling | Mistral |
|---|---|---|---|---|---|
| Sporting CP 1999 (páginas dadas vuelta) | 27 | 4% | 15% | 4% | 100% |
| Sporting CP 2000 (páginas dadas vuelta) | 29 | 3% | 17% | 3% | 100% |
| Sarpsborg 08 2015 (noruego, 17 págs.) | 48 | 27% | 31% | 90% | 100% |
| Fredrikstad 2014 (noruego, 20 págs.) | 17 | 35% | 59% | 88% | 100% |
| Fredrikstad 2015 (noruego, 20 págs.) | 17 | 29% | 24% | 94% | 100% |
| Ferroviária 2015-b (portugués) | 127 | 87% | 87% | 83% | 100% |

**Lectura.**
- Mistral 100% está inflado: las filas cargadas salieron de ese mismo `.md`. Sirve de techo, no de comparación justa. La comparación que vale es Stirling contra Tesseract.
- Stirling le gana a Tesseract pelado en los tres noruegos (88 a 94% contra 24 a 59%), y empata en Ferroviária. Dentro usa Tesseract, así que la diferencia viene de su preproceso (deskew y limpieza).
- Stirling NO corrige las páginas dadas vuelta de Sporting (3 y 4%); Tesseract con `--psm 1` sí las gira, pero queda en 15 a 17% porque son tablas.
- Ninguno de los dos acerca el texto a lo que Mistral deja en tablas: la fidelidad medida es de cifras sueltas, no de la estructura de la tabla.
- Conclusión: Stirling no gana donde Mistral ya cargó; no propongo un escalón. Habría que repetir la prueba con documentos sin `.md` de Mistral y con los totales oficiales para sacar el sesgo.

Stirling queda en el scratchpad de la sesión (`scratchpad/stirling`, jar + arnés `medir.mjs`), fuera del repo. Se instaló `openjdk` con brew.

## Tiempos, costo y esquema híbrido (lectura local primero, Mistral solo para lo que no pasa)

**Tiempos** (Mac de Guido, de punta a punta, segundos; Stirling con el servidor ya arriba):

| PDF | Págs. | Tesseract psm 6 | Tesseract psm 1 | Stirling |
|---|---|---|---|---|
| Sporting CP 1999 | 7 | 7,6 | 13,0 | 7,4 |
| Sporting CP 2000 | 8 | 9,2 | 15,6 | 6,8 |
| Sarpsborg 08 2015 | 17 | 54 | 99 | 49 |
| Fredrikstad 2014 | 18 | 59 | 107 | 54 |
| Fredrikstad 2015 | 20 | 68 | 121 | 63 |
| Ferroviária 2015-b | 4 | 7,1 | 10,5 | 4,1 |

Unos 0,9 a 3,4 s por página. Costo local: US$ 0 (la arrancada de Stirling tarda ~1 minuto, una vez). Mistral cuesta ~US$ 0,004 por página (Pipeline 5: US$ 33,34 por 8.335 páginas); el costo registrado de estos seis, con la segunda voz, fue de US$ 0,016 a 0,080 por documento.

**Chequeo gratis sobre la lectura local** (candidato `.md` con marcas `--- pág. N ---`; chequeo de fidelidad del proyecto; y "las sumas cierran" medido como: ¿están en la lectura local todas las cifras de las líneas que cerraron la verificación del documento?):

| PDF | check-transcripcion-fidelidad | Líneas de las sumas halladas: Tesseract psm 1 | Stirling | ¿Pasa las sumas? | Cifras del doc (4+ dígitos) que faltan, Tesseract / Stirling |
|---|---|---|---|---|---|
| Sporting 1999 | sin hallazgos | 0/11 | 0/11 | no | 166/212 · 167/212 |
| Sporting 2000 | sin hallazgos | 0/12 | 0/12 | no | 177/224 · 183/224 |
| Sarpsborg 2015 | P3 páginas cortas | 8/30 | 26/30 | no | 124/189 · 43/189 |
| Fredrikstad 2014 | sin hallazgos | 5/9 | 7/9 | no | 78/168 · 51/168 |
| Fredrikstad 2015 | P3 páginas cortas | 1/9 | 8/9 | no | 96/139 · 35/139 |
| Ferroviária 2015-b | sin hallazgos | 100/111 | 95/111 | no | 19/136 · 24/136 |

**Resultado.** En los seis, ninguna lectura local deja todas las líneas de las sumas: **0 de 6 pasan**. Con la compuerta de las sumas, Mistral se ahorraría en 0 de 6 documentos. El chequeo de fidelidad, solo, NO sirve de guardia: da "sin hallazgos" aun cuando faltan todas las cifras (Sporting, 0/11), porque mira marcas de página y placeholders, no números. La guardia tiene que ser la de las sumas.

**Ahorro estimado.** Con 0 de 6, el ahorro medido es US$ 0. Con una muestra tan chica, el ahorro real podría ser 0 o hasta de un tercio de los escaneos (no puedo acotarlo mejor con 6). La cola pendiente de `estado.mjs`: 8.073 PDFs sin transcripción (~US$ 1.591, no todos son escaneos: los digitales ya tienen el texto propio, gratis) y 317 escaneos sin validar (~US$ 48). Para tener un número hay que repetir la medición con unos 30 escaneos y cerrar las sumas de verdad (extraer + verificar), no con el proxy de acá.

**Riesgo.** Una lectura local puede cerrar las sumas y tener mal un número fuera de ellas (notas, comparativos, cifras que el proyecto muestra). En los cuatro documentos donde Stirling halló 26/30, 7/9 y 8/9 de las líneas, faltaban 43/189, 51/168 y 35/139 de las cifras del documento: eso es lo que se perdería sin darse cuenta si las sumas cerraran. Si se hace el híbrido, la compuerta tiene que exigir además el chequeo de cifras de `validar-bloques` contra el PDF, no solo las sumas.

## Parte A del híbrido: 10 ejercicios noruegos de Viking sin `.md` (2026-10-20)

Elegí Viking porque es el único club de la lista de 63 (`crawl4ai-noruega-lista.md`) que tiene PDFs sin `.md` y no es Vålerenga ni Aalesund:
2017, 2018, 2019, 2020, 2021, 2023 y 2024 (el 2022 no está en la carpeta) y, para llegar a 10, Viking 2012, 2014 y 2016 (fuera de la lista).
Los diez son escaneos (el PDF no trae texto). Mistral (`pipeline.mjs`, etapa 2, ensayo US$ 1,96): costó **US$ 1,44** reales. Esos diez `.md` quedan como transcripción normal.

| Viking | Págs. | Stirling (s) | check-transcripcion-fidelidad | Cifras de Mistral (4+ díg.) que Stirling halla | Págs. con cifras completas |
|---|---|---|---|---|---|
| 2012 | 13 | 41 | sin hallazgos | 87/145 (60%) | 7/13 |
| 2014 | 19 | 56 | sin hallazgos | 136/151 (90%) | 11/19 |
| 2016 | 23 | 70 | P3 páginas cortas | 101/157 (64%) | 12/23 |
| 2017 | 25 | 75 | sin hallazgos | 96/171 (56%) | 13/25 |
| 2018 | 23 | 71 | sin hallazgos | 132/182 (73%) | 10/23 |
| 2019 | 23 | 65 | P3 páginas cortas | 95/182 (52%) | 12/23 |
| 2020 | 23 | 68 | P3 páginas cortas | 131/184 (71%) | 12/23 |
| 2021 | 25 | 77 | sin hallazgos | 138/176 (78%) | 18/25 |
| 2023 | 24 | 70 | P3 páginas cortas | 136/180 (76%) | 17/24 |
| 2024 | 29 | 87 | P3 páginas cortas | 143/191 (75%) | 20/29 |

**Resultado: 0 de 10 habrían pasado sin Mistral.** Stirling halla entre 52% y 90% de las cifras que Mistral leyó, y en ningún documento todas las páginas con cifras salen completas. El chequeo de fidelidad, otra vez, deja pasar casi todo (marcas de página y placeholders, no números). Además Stirling trae entre 68 y 138 cifras por documento que Mistral no tiene (partidas de dígitos o lecturas mal hechas; no se sabe cuál de los dos tiene razón sin el PDF a mano). No medí "las sumas cierran con lo impreso" para estos diez porque no tienen filas extraídas: hacerlo es extraer y verificar sobre la lectura de Stirling (API de Claude); con una cobertura de 52 a 90% no vale la pena, ya fallaría. Costo de Mistral que el híbrido habría ahorrado en estos diez: US$ 0 de US$ 1,44.

## Parte B: detector gratis de orientación (`tesseract --psm 0`)

Por página, `tesseract --psm 0` da el giro (`Rotate`). Se giró cada página antes del OCR y se volvió a medir (cifras cargadas que aparecen en la lectura):

| PDF | Giros detectados | Tesseract psm 6 sin giro → con giro | Stirling sin giro → con giro |
|---|---|---|---|
| Sporting CP 1999 | págs. 1 y 2: 90° | 4% → 15% | 4% → 22% |
| Sporting CP 2000 | págs. 1 y 2: 90° | 3% → 21% | 3% → 45% |
| Sarpsborg 2015, Fredrikstad 2014 y 2015, Ferroviária 2015-b | ninguno | sin cambio | 90/88/94/83% → 83/88/100/83% (ruido) |

El detector arregla las páginas dadas vuelta y mejora a Stirling en Sporting (de 3-4% a 22-45%), pero ni así llega a lo que cierra las sumas, y en los documentos sin páginas giradas no cambia nada. Gratis, ~1 s por página.
