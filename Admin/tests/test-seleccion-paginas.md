# Test: qué páginas mandar a la segunda voz (2026-09-30)

**Pregunta.** El pipeline transcribe cada PDF entero con Mistral OCR. La segunda voz (Gemini, y Claude por API como desempate) va SOLO a
las páginas "con números". ¿Con qué señal gratis se decide cuáles son?

**Respuesta corta.** Con el `.md` de Mistral, no con `pdftotext`. Regla:
`(>= 8 cifras y cifras/palabras >= 0,05)  o  (tabla markdown de >= 5 filas y >= 5 cifras)`, más las páginas vecinas que tengan >= 3 cifras.
Selecciona **58% de las páginas** y cubre **99,0% de las páginas útiles, 99,7% de los importes cargados en producción y 99,0% de los
rubros de los `.rubros.json`**. Sin vecinas: 46% de las páginas, 96,5% / 98,7% / 98,7%. Implementada en `tools/paginas-con-numeros.mjs`.

La medición fue gratis (ninguna API). Los scripts quedaron en el scratchpad de la sesión, fuera del repo: `features.mjs` extrae features
por página, `analyze*.mjs` arma la grilla y `evalmod.mjs` corre el módulo final contra las dos verdades.

## Las dos verdades

| | Qué es | Documentos | Páginas | Denominador |
|---|---|---|---|---|
| **A** | Ejercicios cargados (`Admin/transcripciones-estado.jsonl`, `cargado:true`, `tieneMd:true`, sin memorias/presupuestos) con >= 3 importes en `data/*-data.js` y alguna página útil. **Página útil** = página del `.md` con >= 2 importes de producción de ese club-año (escala 1, 1e3 o 1e6, tolerancia 0,15%). | 222 | 10.956 | 1.121 páginas útiles, 4.103 importes distintos hallados en el `.md` |
| **B** | `Clubes/**/*.rubros.json` (hay 734; 420 tienen `pdf` + `md` en disco y rubros con `page`) | 420 | 15.858 | 2.173 páginas con rubros, 20.407 rubros |

Las dos verdades salen del `.md` (A busca los importes en el `.md`; B viene de las tablas del `.md`), así que favorecen un poco al método
`.md`. Donde eso importa se aclara abajo.

## Resultados

"sel" = % de páginas que se mandarían a la segunda voz. "útil" / "imp" = % de páginas útiles / importes de A que caen en una página
seleccionada. "pág" / "rub" = % de páginas con rubros / rubros de B cubiertos.

### Sobre el `.md` (todos los documentos)

| Regla | A sel | A útil | A imp | B sel | B pág | B rub |
|---|---|---|---|---|---|---|
| >= 5 cifras, densidad >= 0,03 | 55,4 | 98,8 | 99,7 | 58,4 | 97,6 | 98,0 |
| **>= 8 cifras, densidad >= 0,05** (la medición previa) | 44,8 | 96,3 | 98,5 | 48,7 | 94,5 | 96,0 |
| >= 8 cifras, densidad >= 0,08 | 36,0 | 88,3 | 95,1 | 38,9 | 83,6 | 89,1 |
| >= 12 cifras, densidad >= 0,10 | 30,5 | 82,3 | 92,0 | 32,0 | 70,8 | 77,4 |
| >= 20 cifras, densidad >= 0,10 | 28,1 | 80,4 | 91,3 | 29,7 | 68,6 | 76,5 |
| 8 / 0,05 + vecinas (todas, a ciegas) | 61,5 | 99,0 | 99,7 | 66,3 | 97,7 | 98,2 |
| 8 / 0,05 + palabras clave (STATEMENT_RE y >= 3 cifras) | 57,3 | 97,7 | 99,1 | 60,6 | 97,1 | 97,9 |
| 8 / 0,05 + vecinas + palabras clave | 78,3 | 99,6 | 99,8 | 82,1 | 98,8 | 98,9 |
| 8 / 0,05, densidad sin contar separadores de tabla | 45,2 | 96,3 | 98,6 | 49,8 | 96,0 | 97,3 |
| **ELEGIDA: 8 / 0,05 limpia  o  tabla >= 5 filas y >= 5 cifras** | **45,7** | **96,5** | **98,7** | **51,7** | **98,0** | **98,7** |
| **ELEGIDA + vecinas suaves (>= 3 cifras)** — default del módulo | **58,3** | **99,0** | **99,7** | **63,6** | **98,9** | **99,0** |
| ELEGIDA + palabras clave + vecinas suaves | 70,2 | 99,6 | 99,8 | 73,8 | 99,4 | 99,2 |

Por motor del `.md` (elegida + vecinas): legado 58,5% sel → 99,0% útil / 99,7% imp (A, 207 docs); **mistral 55,8% → 100% / 99,5%
(A, 14 docs) y 67,4% → 99,2% pág. / 99,7% rub. (B, 205 docs)**; gemini (23 docs de B) 100%.

### `pdftotext -layout` página por página (antes de tener el `.md`)

**Qué % de PDFs no sirve.** De los 1.005 PDFs medidos, **233 (23,2%) no tienen capa de texto usable**: 176-180 son escaneos (< 150
caracteres por página o más de la mitad de las páginas vacías) y el resto mojibake (fuentes Type 3 / sin ToUnicode, donde hasta los dígitos
salen como símbolos: Ferro 2024-25 da `"!&""/%$%"` donde el `.md` dice `503.781.512,67`). El chequeo `capaDeTextoSirve()` del módulo lo
detecta sin mirar el `.md` (símbolos >= 6% o dígitos <= 2%).

| Regla (pdftotext) | A sel | A útil | A imp | B sel | B pág | B rub |
|---|---|---|---|---|---|---|
| 8 / 0,05, todos los PDFs (escaneos = nada seleccionado) | 30,2 | 65,5 | 71,9 | 42,8 | 80,6 | 79,4 |
| 8 / 0,05, escaneos → `.md` (híbrido) | 43,8 | 92,9 | 96,4 | 48,9 | 95,1 | 96,4 |
| 8 / 0,05 + vecinas, híbrido | 60,1 | 96,1 | 97,8 | 66,3 | 97,7 | 97,9 |

Mano a mano, **solo en los 148 docs de A / 352 de B que tienen capa de texto sana**:

| Regla | A sel | A útil | A imp | B sel | B pág | B rub |
|---|---|---|---|---|---|---|
| `.md` 8 / 0,05 | 46,8 | 97,2 | 99,0 | 49,7 | 95,1 | 96,1 |
| pdftotext 8 / 0,05 | 45,2 | 92,4 | 96,2 | 50,0 | 95,8 | 96,6 |
| `.md` 8 / 0,05 + vecinas | 63,8 | 99,5 | 99,7 | 66,9 | 98,1 | 98,2 |
| pdftotext 8 / 0,05 + vecinas | 61,6 | 95,3 | 97,2 | 66,9 | 98,0 | 97,9 |

Aun con capa de texto, pdftotext no selecciona menos páginas y pierde ~5 puntos de páginas útiles en A (en B empata, pero B favorece al
`.md`, ver arriba). La pérdida viene de PDFs **mixtos**: pasan el chequeo por documento pero tienen justo el estado financiero pegado como
imagen o con fuente rota en esa página (Flamengo 2024 pág. 71, Sevilla 2024-25 pág. 11, Barcelona 2024-25 pág. 13, Guarani 2024-25
pág. 13, Alianza Lima 2024 pág. 3). Y como el `.md` de Mistral se hace siempre y ANTES de la segunda voz, decidir con pdftotext no ahorra
nada. En el módulo queda solo como plan B cuando se llama sin `.md` (en ese modo las páginas sin texto se seleccionan siempre, y un PDF
sin capa usable devuelve todas las páginas).

## Recomendación

1. **Método: el `.md` de Mistral.** `paginasConNumeros({ mdText })` en `tools/paginas-con-numeros.mjs`.
2. **Umbral: `>= 8 cifras y densidad >= 0,05` (palabras sin separadores de tabla) `o tabla >= 5 filas con >= 5 cifras`, + vecinas con
   >= 3 cifras** (default). 58% de las páginas, 99,7% de los importes de producción, 99,0% de los rubros. Si hace falta recortar costo,
   `vecinas:false` baja a 46% de las páginas con 98,7% de importes / rubros.
3. **No sumar palabras clave:** +12 puntos de páginas por ~1 punto de cobertura.
4. **No endurecer la densidad** (0,08 o 0,10): ahorra 8-15 puntos de páginas pero pierde 7-26 puntos de páginas útiles/rubros.

## Qué se pierde

### Con el `.md` (regla elegida, sin vecinas): 42 páginas útiles de 1.121

39 de las 42 son **prosa con cifras sueltas** (densidad 0,035-0,050, sin tabla): el Lagebericht alemán y las notas de políticas contables
inglesas, que citan los mismos importes del estado de resultados. 3 son páginas con < 8 cifras. Por eso los importes perdidos son solo 1,3%:
casi todos están también en el estado financiero, que sí se selecciona. Las vecinas rescatan la mayoría (99,0% de útiles).

| # | Documento | Pág. | Importes | Cifras / palabras | Por qué no entra |
|---|---|---|---|---|---|
| 1 | Hamburger SV, fussball-ag-jahresabschluss-2024-25 | 27 | 9 | 23 / 537 (0,043) | Lagebericht: ingresos contados en prosa |
| 2 | FC Augsburg, konzernabschluss-2024-25 | 17 | 8 | 34 / 717 (0,047) | Lagebericht (merchandising, "Römertrikot") |
| 3 | Werder Bremen, konzernabschluss-2022-23 | 16 | 6 | 44 / 895 (0,049) | Geschäftsverlauf en prosa, justo bajo 0,05 |
| 4 | VfB Stuttgart, konzernabschluss-2024 | 23 | 5 | 19 / 450 (0,042) | Anhang en prosa ("in Höhe von T€ …") |
| 5 | Leeds United, group-accounts-2024-25 | 24 | 5 | 18 / 470 (0,038) | Notas: accounting policies |
| 6 | VfB Stuttgart, konzernabschluss-2023 | 18 | 4 | 19 / 440 (0,043) | Anhang en prosa |
| 7 | Atlético Goianiense, DF 2024-2025 | 59 | 4 | 19 / 540 (0,035) | Nota explicativa de derechos de TV en prosa |
| 8 | Burnley, group-accounts-2023-24 | 27 | 4 | 22 / 509 (0,043) | Notas: judgements and estimates |
| 9 | Hamburger SV, jahresabschluss-2023-24 | 26 | 3 | 24 / 481 (0,050) | Lagebericht, en el borde del umbral |
| 10 | Vélez Sarsfield, balance-general-2023 | 6 | 3 | 7 / 341 (0,021) | Informe del auditor: cita 3 totales |
| 11 | Club Brugge, jaarrekening-2025-06-30-consolidado | 14 | 3 | 13 / 335 (0,039) | Explicación de APM / EBITDA en prosa |

### Con pdftotext (docs con capa "sana"): 60 páginas útiles

| Motivo | Páginas |
|---|---|
| pdftotext no trae los importes (página en imagen o fuente rota dentro de un PDF con texto) | 29 |
| página vacía en pdftotext (imagen) | 10 |
| densidad baja (la misma prosa que pierde el `.md`) | 21 |

| # | Documento | Pág. | Importes | Qué devuelve pdftotext |
|---|---|---|---|---|
| 1 | Flamengo, relatorio-anual-DF-2024 | 71 | 24 | solo el título ("relatório de gestão"); el `.md` tiene 94 cifras |
| 2 | Sevilla FC, cuentas-anuales-2024-2025 | 11 | 17 | página vacía (imagen); el `.md` tiene 72 cifras |
| 3 | FC Barcelona, cuentas-anuales-y-auditoria-2024-25 | 13 | 16 | 4.355 caracteres de mojibake (`zba_:zc>zb_c_=y>`), 0 cifras |
| 4 | Atlético Goianiense, DF 2024-2025 | 37 | 13 | la carátula del estado; las cifras están en imagen |
| 5 | Guarani, DF 2024-2025 | 13 | 13 | página vacía |
| 6 | Internacional, relatorio-anual-2024 | 12 | 11 | la prosa de la página, sin la tabla |
| 7 | Anderlecht, jaarrekening-2025-06-30 | 47 | 10 | solo "page 47 of 60" |
| 8 | Cercle Brugge, jaarrekening-2025-06-30 | 40 | 9 | texto del DocuSign, sin la tabla |
| 9 | Alianza Lima, estado-financiero-2024 | 3 | 7 | el título del estado de resultados, cifras en imagen |
| 10 | Hamburger SV, jahresabschluss-2024-25 | 27 | 9 | igual que el `.md`: prosa, densidad 0,043 |

## Límites de la medición

- A es 93% `.md` legado (subagente de Claude / Tesseract), no Mistral; B sí es mayormente Mistral (205 de 420) y ahí la regla da 99,2% de
  páginas con rubros con vecinas. Conviene re-medir cuando haya más ejercicios cargados desde `.md` de Mistral.
- "Página útil" exige >= 2 importes: una página con un solo importe cargado no cuenta.
- Los números de esta página salen de los scripts de análisis (misma regla que el módulo). El módulo `tools/paginas-con-numeros.mjs` se
  escribió al final y NO llegó a correrse en esta sesión (el entorno dejó de dejar ejecutar comandos): falta correr
  `evalmod.mjs` / el CLI para confirmar que reproduce 58,3% / 99,0% / 99,7%. El modo pdftotext del módulo (que además selecciona las
  páginas sin texto) no está medido.
- El umbral de densidad cuenta como cifra cualquier número >= 100 con >= 3 dígitos (años incluidos), igual que la medición previa.
