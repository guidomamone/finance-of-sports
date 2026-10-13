# Informe grupo B (Lazio, 13 casos, 5 documentos)

Solo lectura: no se corrió ningún script del pipeline. Las cuentas de cierre son a mano sobre el .md; los comandos de ajustes no se ejecutaron.
Páginas: en estos documentos "pág. N del visor" y el impreso al pie coinciden (visor 94 = impreso 94, etc.).

## Hallazgo general (corrige la pista)
La pista "estado separado + consolidado" NO es la causa. El estado elegido es UNO solo: el consolidado (b120 pág. 94 + b121 pág. 95; perímetro consolidado fijado). El doble sale de otra cosa: la fila TOTALE RICAVI (L3413, 102.482.031) se suma ADEMÁS de sus 18 hojas (L3388-L3411, que suman 102,48203): 102,482031 + 102,48203 = 204,964061. Por eso el año anterior da 152,54 (76,27 x 2) y 2008 da el doble de 2008-09. Los 3 documentos que fallan (2007-08, 2011-12, 2012-13) son los únicos de Lazio que no cerraron con la "lectura 5" (hojas del estado en euros); los otros 10 cerraron así.

## 2007-08 (Lazio-bilancio-separato-consolidato-2007-08.pdf) - 6 casos

Estado consolidado en euros, pág. 94 (L3384-L3455) y pág. 95 (L3463-L3497).

| caso | respuesta | evidencia |
|---|---|---|
| 0c669d8 anio-anterior 2007 (152,54 vs 76,27) | NO responder; se va solo al arreglar la suma (ver abajo). Si hubiera que cerrarlo: descartar NO, aceptar NO | columna 2007 impresa: TOTALE RICAVI 76.271.330 (L3413), hojas suman lo mismo; 152,54 = 2 x 76,27 |
| ad49c68 anio-vecino 2009 (204,96 vs 102,48) | ídem | 2008: TOTALE RICAVI 102.482.031 (L3413); 2008-09 columna anterior 102,48203. Coinciden una vez sacada la fila total |
| 11a2615 anio-vecino 2007 (152,54 vs 76,27) | ídem | 2006-07 cargado 76,271331 = 76.271.330 impreso (redondeo 1 euro) |
| 5642dd6 / 4fa2448 no-cierra "documento del año 2009 / 2007" | ídem (son los mismos dos chequeos vistos desde el otro documento) | ídem |
| 131266a no-cierra resultado (204,96 - 462,23 -0,74 -2,70 != 13,76) | Ajustes (faltan 2 filas) + arreglar la suma. Comandos abajo | ingresos y gastos inflados (ver causa); financiero solo tomó L3467 (-738.345) y falta "Oneri finanziari netti e differenze cambio" (4.224.030) L3469; impuesto solo tomó L3493 (-2.704.465) y falta "Imposte differite e anticipate" (12.443.793) L3494 |

Por qué falló (una línea): verificar.mjs, chequeo "total de ingresos/gastos" (ramo filaTotal): declara "cierra" y devuelve el arreglo con la fila TOTALE adentro MÁS las hojas, y además extraer.mjs dejó las sub-filas de financiero e impuesto como `detalla_a` de un subtotal que luego no se suma (financiero e impuesto quedan incompletos). Gastos 462 además mezcla las hojas del estado de Personale (L3417-3420) con las de la nota b197 (L5108-5121, en miles, mismo total 29.047) y la fila TOTALE COSTI OPERATIVI (L3444): tres cosas contadas.

Qué requiere: ajustes solos NO alcanzan (no se puede sacar una fila; "fila" solo agrega o reemplaza). Hay que volver a VERIFICAR después de arreglar la suma de totales (no hace falta relocalizar: los bloques b120/b121 son los correctos). Opcional para blindar ubicación: dejar notas_ingresos/notas_gastos sin b190-b196/b209/b197-b211, porque las propias dudas del extractor dicen que repiten el estado (criterio decidido: un cuadro de nota que repite renglones del estado no se carga).

Comandos listos (no ejecutados):
```
node tools/ajustes.mjs --agregar "Clubes/Italia/Lazio/Lazio-bilancio-separato-consolidato-2007-08.pdf" fila --etiqueta "Oneri finanziari netti e differenze cambio" --lado financiero --valor "(4.224.030)" --linea 3469 --motivo "el subtotal financiero (hojas en detalla_a) no se sumaba; 55.350 + 1.283.259 - 5.562.639 = -4.224.030" --evidencia "pág. 95 del visor, .md L3469-3491"
node tools/ajustes.mjs --agregar "Clubes/Italia/Lazio/Lazio-bilancio-separato-consolidato-2007-08.pdf" fila --etiqueta "Imposte differite e anticipate" --lado impuesto --valor "(12.443.793)" --linea 3494 --motivo "el subtotal de impuestos no se sumaba; b) 13.687.035 + c) (26.130.829) = -12.443.794" --evidencia "pág. 95 del visor, .md L3494-3496"
```
Cuenta de cierre propuesta (hojas del estado, sin filas total, sin b197): ingresos 102,482030; gastos 52,667130 (opex) + 11,699068 (amort.) + 4,243328 (accant.) = 68,609526; operativo 33,872504 (impreso 33.872.507); financiero -0,738345 -4,224030 = -4,962375; impuesto -2,704465 -12,443793 = -15,148258; resultado = 33,872504 -4,962375 -15,148258 = 13,761871 contra 13.761.874 impreso (3 euros, redondeo de ~55 filas). Año anterior: 76.271.330 contra 76.271.331 del sitio (1 euro). 2008: 102.482.031 contra 102.48203 (1 euro).

## 2011-12 (...-2011-12.pdf) - 3 casos

| caso | respuesta | evidencia |
|---|---|---|
| e69220c no-cierra resultado (192,30 - 170,60 + 0 + 7,68 != 4,22) | no responder; se resuelve con 1896cce = "no" + volver a extraer (o, plan B, arreglo de suma + 2 ajustes) | ingresos 192,298 = TOTALE RICAVI 95.509.291 (L3577) + 96,788739 de hojas de nota en miles; además "Variazione delle rimanenze" está en +0,639739 y el estado imprime (639.739) L3575; gastos 170,60 = TOTALE COSTI OPERATIVI 74.370.334 (L3612) + 96,230678; financiero 0 aunque L3634 imprime (2.741.427) |
| 579187b fila-ilegible Svalutazione b189 (1 mil vs 52.785) | `aceptar` | pág. 148 impreso: nota 31 L5568 "Svalutazione delle immobilizzazioni 1" y total L5569 21.459; el estado pág. 99 L3620/L3624 imprime 21.511.022 y (52.785); 20.565.677 + 892.560 + 52.785 = 21.511.022 exacto; la columna 2012 de 2012-13 repite (52.785) L3593+. La nota tiene un error propio: se usa el estado |
| 1896cce cuadro-duplicado sub-filas del estado | `corregir --valor "no"` (NO se dejan afuera: las sub-filas del estado en euros son las que se cargan y las notas en miles no) | pág. 98 L3551-L3611 y pág. 99 L3621-L3650: el estado trae todas las sub-filas, exactas, en euros. Criterio decidido: una nota que repite renglones del estado no se carga. El extractor las omitió (106 filas, solo renglones/subtotales) y entonces verificar cayó a las notas redondeadas a miles |

Por qué falló: extraer.mjs omitió las hojas del estado "por estar desglosadas en las notas" (duda afecta_carga: true), así que la lectura 5 no tuvo hojas y verificar usó las notas en miles; encima el chequeo de total sumó la fila TOTALE junto a sus hojas, y leyó la baja de inventario con signo positivo.
Qué requiere: volver a EXTRAER (no relocalizar) con la respuesta "no" a 1896cce, luego verificar. Plan B sin reextraer: arreglo de la suma de totales + fila de signo + 1 ajuste:
```
node tools/ajustes.mjs --agregar "Clubes/Italia/Lazio/Lazio-bilancio-separato-consolidato-2011-12.pdf" fila --etiqueta "Oneri finanziari netti e differenze cambio" --lado financiero --valor "(2.741.427)" --linea 3634 --motivo "subtotal financiero sin hojas extraídas; (30.720) + 501.101 - 3.211.808 = -2.741.427" --evidencia "pág. 99 del visor, .md L3634-L3645"
node tools/ajustes.mjs --agregar "Clubes/Italia/Lazio/Lazio-bilancio-separato-consolidato-2011-12.pdf" fila --etiqueta "Variazione delle rimanenze" --lado ingreso --valor "(639.739)" --linea 3575 --reemplaza "Variazione delle rimanenze" --motivo "baja de inventario impresa en negativo; se leía +639.739" --evidencia "pág. 98 del visor, .md L3575"
```
Cuenta de cierre (estado, euros): ingresos 95.509.291; gastos 74.370.334 + 21.511.022 + 349.483 (432.064 - 82.581) = 96.230.839; operativo -721.548 (impreso -721.549); financiero -2.741.427; impuesto -1.614.354 + 9.298.883 = +7.684.529; resultado = -721.549 - 2.741.427 + 7.684.529 = 4.221.553 contra 4.221.554 impreso (1 euro).

## 2012-13 (...-2012-13.pdf) - 2 casos

| caso | respuesta | evidencia |
|---|---|---|
| f3709ce no-cierra total de gastos (114,568 vs 93,335) | falso positivo del chequeo; sin respuesta, se va al reverificar | las líneas son correctas: 93,334672 (TOTALE COSTI OPERATIVI, L3614) + 21,186647 (amort., L3615) + 0,048287 (accant., L3620) = 114,569606; el total impreso 93.334.672 es solo costos operativos |
| b79d726 no-cierra resultado (109,794 - 114,568 + 0 + 0 != -5,894) | 2 ajustes de fila (faltan financiero e impuesto: el extractor los dejó afuera por columnas corridas) + reextraer las hojas del estado | pág. 99 L3635-L3661: la transcripción corrió las columnas: números de nota (36, 37, 38) en la columna de importe y los importes de 2012 en la fila de abajo. Valores 2013 por las identidades: financiero 105 + 287.471 - 4.355.757 = -4.068.181 (aparece en L3638); impuestos: correnti (2.584.541) L3656; diferite e anticipate 5.533.728 = 1.618.551 + 3.915.177 (L3657-L3660); -8.843.475 - 2.584.541 + 5.533.728 = -5.894.288 exacto |

Por qué falló: transcripción (columnas corridas en b111) más extraer.mjs, que (como en 2011-12) dejó solo renglones y subtotales del estado y no las hojas en euros; verificar compara "total de gastos" con un total que no incluye amortizaciones. Las dudas de columna de este documento ya se respondieron "aceptar" para Lazio 2014-15, y ahí se resolvió con ajustes de fila (to-do 155/157): igual acá.
```
node tools/ajustes.mjs --agregar "Clubes/Italia/Lazio/Lazio-bilancio-separato-consolidato-2012-13.pdf" fila --etiqueta "Oneri finanziari netti e differenze cambio" --lado financiero --valor "(4.068.181)" --linea 3638 --motivo "columnas corridas en L3635-L3661; 105 + 287.471 - 4.355.757 = -4.068.181" --evidencia "pág. 99 del visor, .md L3638, L3642, L3650, L3654"
node tools/ajustes.mjs --agregar "Clubes/Italia/Lazio/Lazio-bilancio-separato-consolidato-2012-13.pdf" fila --etiqueta "Imposte correnti" --lado impuesto --valor "(2.584.541)" --linea 3656 --motivo "columnas corridas; el importe 2013 está en la columna del año" --evidencia "pág. 99 del visor, .md L3656"
node tools/ajustes.mjs --agregar "Clubes/Italia/Lazio/Lazio-bilancio-separato-consolidato-2012-13.pdf" fila --etiqueta "Imposte differite e anticipate" --lado impuesto --valor "5.533.728" --linea 3657 --motivo "columnas corridas; 5.533.728 = 1.618.551 + 3.915.177 (L3658-L3660); cierra el utile -5.894.288" --evidencia "pág. 99 del visor, .md L3657-L3660"
```
Cuenta de cierre: ingresos 109.794.311; gastos 93.334.672 + 21.186.647 + 48.287 = 114.569.606; operativo -4.775.295 (impreso -4.775.294); financiero -4.068.181; impuesto -2.584.541 + 5.533.728 = +2.949.187; resultado = -4.775.294 - 4.068.181 + 2.949.187 = -5.894.288, exacto. Con las notas en miles que hoy usa el script (109,794296 y 114,568051) da -5.892.749 (1.539 euros de redondeo de miles): solo cierra con la tolerancia de miles; con hojas en euros cierra exacto. El chequeo "total de gastos" seguirá en falso mientras no se arregle (patrón 3).

## 2018-19 (...-2018-19.pdf) - 1 caso

| caso | respuesta | evidencia |
|---|---|---|
| 476c85a duda-de-extraer: ¿se carga el Personale de b173 además del estado? | `corregir --valor "no"` | pág. 104 L3601-L3604 (Salari 81.890.350, Oneri sociali 3.223.127, TFR 381.476, Altri costi 113.073 = 85.608.026); pág. 158 impreso, L5499-L5517: la nota abre el mismo total (85.608) con otra clasificación. Cargar ambos lo duplicaría. El documento ya cerró con la lectura 5 usando el estado: resultado -13.161.051 exacto, año anterior y siguiente OK |

Por qué falló: no falló un dato: la duda de extraer está redactada al revés ("¿Se carga ... además?" con propuesta "sí" mientras el "por qué" dice que cargar ambos duplica). Cuenta de cierre: ya cerrada (resultado -13,161051 como impreso). Nota: Lazio 2017-18 se cargó con el desglose de la nota (Compensi contrattuali... pág. 136) aunque su estado también traía Salari; los demás años (2006-07, 2008-09, 2014-15, 2019-20 a 2024-25) usan el estado. No es [GUIDO]: no se reabre.

## 2023-24 (...-2023-24.pdf) - 1 caso

| caso | respuesta | evidencia |
|---|---|---|
| 37997ee duda-de-extraer: ¿se cargan las filas de b209 aunque suman 32.240 y b208 dice 33.639? | `corregir --valor "no"` | pág. 177, L7002 (33.639) vs L7019 (32.240); 28.316 + 1.518 + 522 + 1.884 = 32.240; falta 1.399. El separato tiene el mismo hueco (33.090 vs 31.691). Criterio decidido: un desglose parcial no se carga. El estado (pág. 118, L4545) imprime una sola fila 38.436.893 = 33.639 + 4.798; el año anterior se cargó igual, agregado |

Cuenta de cierre: ya cierra con la fila del estado: ingresos 236,40521, resultado 38.495.467 exacto, año anterior y siguiente OK.

## PATRONES PARA MEJORAR EL SCRIPT

1. verificar.mjs, chequeo "total de ingresos/gastos", rama filaTotal (la que dice "cierra; además se suman N líneas fuera de ese total"). Declara que cierra y devuelve el arreglo con la fila TOTAL adentro más las hojas que ya suman ese total, o sea el total dos veces. Casos: 0c669d8, ad49c68, 11a2615, 131266a, 5642dd6, 4fa2448 (2007-08) y e69220c (2011-12). Ejemplo: 2007-08, L3413 TOTALE RICAVI 102.482.031 + hojas L3388-L3411 = 204.964061 contra 102,48203. Compuerta: antes de devolver el arreglo, si la suma del arreglo SIN la fila total ya da el total impreso, sacar de las líneas la fila total (y nunca sumar filas tipo total/subtotal).
2. extraer.mjs omite las hojas del estado cuando hay notas que las repiten (duda "cuadro-duplicado" con afecta_carga: true): verificar no tiene hojas para la lectura 5 y cae a notas en miles (redondeo, clasificaciones distintas, signo mal en "Variazione delle rimanenze"). Casos: 1896cce, e69220c, b79d726, f3709ce. Ejemplo: 2011-12, L3552-L3611 y L3621-L3650 sin extraer; "Variazione delle rimanenze" L3575 impreso (639.739), cargado +0,639739. Compuerta: después de extraer, si un renglón/subtotal del estado tiene debajo en el mismo bloque filas que suman su importe (±1) y no están en filas.json, reintentar extraer una vez con esa lista (sin preguntar).
3. verificar.mjs, "total de gastos" contra TOTALE COSTI OPERATIVI (que en el formato italiano excluye amortizaciones y accantonamenti, impresos debajo). Caso: f3709ce. Ejemplo: 2012-13, líneas 114,568051 vs L3614 93.334.672 (las líneas correctas incluyen 21,186647 + 0,048287 de debajo). Compuerta: comparar el total solo con las líneas ubicadas arriba de la fila total en el .md (línea menor); las de debajo van aparte.
4. extraer.mjs/verificar.mjs: subtotales de financiero e impuesto cuyas hojas quedan como `detalla_a` (2007-08) o sin extraer (2011-12) no se suman ni ellas ni el subtotal. Casos: 131266a, e69220c. Ejemplo: 2007-08 financiero -0,738345 en vez de -4,962375; impuesto -2,704465 en vez de -15,148258. Compuerta: identidad con los impresos: (resultado operativo - resultado final) debe igualar financiero + impuesto cargados; si no, usar los subtotales impresos de financiero e impuesto como hojas.
5. Transcripción (Mistral) o tabla con columnas corridas: número de nota en la columna de importe e importe del año anterior en la fila de abajo. Caso: b79d726 (2012-13, L3635-L3661 pág. 99). Ejemplo: "Oneri finanziari netti | 36 | (4.068.181)" y 2012 (2.741.427) en la fila siguiente. Compuerta: en una tabla de dos años, una celda de importe con un entero de 1-2 dígitos sin separador de miles pegada a una celda de nota se marca "columna corrida" y se resuelve con la identidad aritmética del estado (resultado prima delle imposte - utile = impuestos), generando el ajuste de fila sola.
6. localizar/extraer: dudas con la polaridad al revés o que repiten un criterio ya decidido. Casos: 476c85a (sí = cargar ambos, pero el "por qué" dice que duplica), 37997ee (desglose que no suma: criterio decidido "no se carga"), 579187b (la nota discrepa del estado que cierra). Compuerta: antes de crear la duda, si el desglose no suma el renglón o repite el estado, aplicar el criterio decidido y dejar la duda como nota, sin cola.

## [GUIDO]
Ninguna decisión de criterio nueva. (Las respuestas "no" de 476c85a, 37997ee y 1896cce aplican criterios ya decididos.)
