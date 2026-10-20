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
