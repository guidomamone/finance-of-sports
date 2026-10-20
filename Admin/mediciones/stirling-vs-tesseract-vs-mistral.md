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
