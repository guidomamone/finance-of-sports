# Test: cascada de chequeos gratis antes de pagar la validación (2026-09-30)

Herramienta: `tools/chequeos-gratis.mjs` (`node tools/chequeos-gratis.mjs --prueba --detalle` reproduce todo esto en ~20 s, sin API).
Qué páginas son "con números" y cuáles `prosa` lo decide `tools/paginas-con-numeros.mjs` (con vecinas), no esta herramienta.

## La pregunta

Hoy `tools/resolver-inventario.mjs` paga Gemini y Claude página por página, prosa incluida. La regla nueva: la validación paga va
solo a páginas con números y solo si una cascada gratis no alcanza para darla por buena. ¿Cuánto se ahorra, y deja pasar algún
error de lectura como bueno?

## La cascada (por página)

Cada cifra significativa (4 o más dígitos, sin años ni fechas) tiene que quedar **respaldada** por algo:

1. **texto-pdf**: la cifra está en el texto de esa página del PDF (pdftotext). Se cuenta como multiconjunto: si el .md tiene "8821"
   tres veces y el PDF una, dos quedan sin respaldo. Solo aplica a PDFs con capa de texto real (umbrales de `verify-numbers.mjs`).
2. **sumas**: en cada tabla, columna por columna, una celda que es la suma de >= 2 celdas contiguas de arriba (o de abajo) respalda
   a la celda y a sus sumandos. La tolerancia es de redondeo de la unidad impresa, no el 0,05% de `filasSuma()` (en 1.000.000 eso
   son 500 unidades: un 3 leído como 8 en las centenas pasaba como "cierra").
3. **produccion**: coincidencia exacta con un importe del año N-1 cargado en el sitio (la columna comparativa).
4. **balance**: un "Total activo" igual a un "Total pasivo + patrimonio" en cualquier página del documento.

Resultado: `prosa` (fuera de la selección de `paginas-con-numeros`), `validada-gratis` (todas respaldadas, o hasta 3 sin
respaldo **solo en páginas con texto del PDF** y sin parecido a ninguna cifra del PDF), `dudosa` (el resto, y cualquier página con
una cifra casi igual a una del PDF, que es la firma de una lectura mal hecha).

## Cómo se midió

- **Base**: los 104 documentos que el resolver ya resolvió (último registro por `md` en
  `Admin/transcripciones-verificaciones.jsonl` con `resolucion` y `previo` en disco): 3.134 páginas, **$38,98 registrados**.
- **Entrada de la cascada** = lo que el resolver tenía en la mano: `previo-mistral` (67), `previo-legado` (21), `.mistral-redo.md`
  cuando el resolver rehízo el .md con Mistral (15), `previo-gemini` (1). **Verdad** = el `.md` corregido de hoy.
- **Error real** en una página = una cifra de >= 4 dígitos de la entrada que el `.md` actual no tiene, **emparejada** con una cifra
  del actual que la entrada no tiene y que es casi igual: mismo largo con 1 dígito distinto (2 si tiene 7+ dígitos), o un dígito de
  más o de menos en cifras de 5+ dígitos (sin contar un 0 agregado al final, que es formato de decimales). Sin años ni fechas.
  Comparar multiconjuntos sin emparejar da 726 páginas "cambiadas". Emparejando quedan **178 páginas con error real**, 163 de ellas
  en páginas con números.
- Un falso error que apareció y se corrigió en el tokenizador: el formato suizo "5 525.24" (miles con espacio y decimales con punto)
  salía como 52524 en una lectura y 552524 en la otra (Basel 2011, pág. 17). Ahora se juntan los grupos antes de extraer cifras.

## La curva

"Recall CN" = páginas con error real en páginas con números marcadas `dudosa`. "Pagadas evitadas" = de las 603 páginas que el
resolver pagó, cuántas la cascada no habría mandado. Ahorro = costo de cada documento × (1 − dudosas/páginas).

| Config | validada | prosa | dudosa | Recall CN (163) | Recall total (178) | Validadas con error | Ahorro | Pagadas evitadas |
|---|---|---|---|---|---|---|---|---|
| A: propuesta literal (una tabla que cierra con >= 3 sumandos valida la página) | 33,5% | 35,2% | 31,4% | **77,3%** | 70,8% | **37** | 61,6% | 232 |
| B: celda por celda, >= 3 sumandos, 0 sin respaldo | 21,2% | 35,2% | 43,7% | 100% | 91,6% | 0 | 46,7% | 129 |
| C: celda por celda, >= 2 sumandos, 0 sin respaldo | 21,7% | 35,2% | 43,1% | 100% | 91,6% | 0 | 47,4% | 130 |
| D: C con tolerancia exacta | 21,7% | 35,2% | 43,2% | 100% | 91,6% | 0 | 47,3% | 129 |
| E: C sin sumas hacia abajo | 21,7% | 35,2% | 43,1% | 100% | 91,6% | 0 | 47,3% | 130 |
| F: C + 1 sin respaldo (solo con texto) | 22,6% | 35,2% | 42,2% | 100% | 91,6% | 0 | 47,7% | 146 |
| G: C + 2 sin respaldo (solo con texto) | 23,0% | 35,2% | 41,8% | 100% | 91,6% | 0 | 48,1% | 156 |
| **G2: C + 3 sin respaldo (solo con texto) = DEFAULT** | **23,9%** | **35,2%** | **40,9%** | **100%** | **91,6%** | **0** | **49,1%** | **177** |
| G4: C + 5 sin respaldo (solo con texto) | 24,6% | 35,2% | 40,3% | 100% | 91,6% | 0 | 49,7% | 192 |
| G5: C + 10 sin respaldo (solo con texto) | 24,8% | 35,2% | 40,0% | 100% | 91,6% | 0 | 49,9% | 196 |
| F3: 1 sin respaldo también en escaneos | 24,5% | 35,2% | 40,3% | 100% | 91,6% | 0 | 50,1% | 151 |
| G3: 2 sin respaldo también en escaneos | 27,5% | 35,2% | 37,4% | 98,8% | 90,4% | 2 | 53,3% | 174 |
| K: C con cifras de 5+ dígitos | 25,0% | 35,2% | 39,8% | 99,4% | 91,0% | 1 | 51,1% | 151 |
| FK / GK: F / G con 5+ dígitos | 26,6-27,2% | 35,2% | 37,6-38,3% | 98,8% | 90,4% | 2 | 52,8-53,4% | 180-198 |
| H: prosa = `paginas-con-numeros` SIN vecinas | 15,4% | 48,1% | 36,4% | 92,0% | 84,3% | 0 | 55,0% | 182 |
| I: prosa propia (sin tablas y <= 2 cifras sueltas) | 16,4% | 39,2% | 44,4% | 98,8% | 96,1% | 0 | 46,2% | 111 |
| J: solo texto-pdf (sin sumas, balance ni producción) | 21,0% | 35,2% | 43,9% | 100% | 91,6% | 0 | 46,5% | 129 |

Qué dice la curva:

- **La propuesta literal no sirve**: 37 páginas con errores reales quedan como buenas porque otra suma de la misma tabla cierra.
  Ejemplos: Tromsø 2022 pág. 28 (39.773.103 leído como 30.773.103), Vålerenga 2023 pág. 19, Slavia Praha 2008 págs. 33/37/39,
  Alverca págs. 24/25/28, Atalanta 2020 pág. 10 (10.199.756 contra 10.159.756). Por eso la validación va celda por celda.
- **Tolerar cifras sin respaldo en escaneos** es donde aparecen los primeros escapes (G3, K, FK, GK: Mercedes F1 2025 pág. 12,
  Sparta Praha 2004 pág. 13, Sint-Truiden 2024 pág. 35 con 9201 contra 9291). En páginas con texto del PDF, en cambio, se puede
  tolerar hasta 10 sin perder nada. La cifra sin respaldo ya pasó el filtro de "casi igual a una del PDF", así que suele ser texto de
  una imagen. El default queda en 3: da 49,1% contra 49,9% con 10, y es más prudente.
- **La aritmética aporta poco**: de 681 páginas validadas en C, las sumas rescatan ~24 respecto de J (solo texto del PDF). El balance
  rescata 7-8. En escaneos, casi ninguna página tiene todas sus cifras dentro de una suma que cierre: notas, columnas comparativas,
  filas "de las cuales".
- **La columna comparativa (chequeo 3) no se pudo medir**: ninguno de los 104 documentos tiene el año N-1 cargado en el sitio. Son
  ejercicios históricos (Charleroi 2010, Standard 2017, Randers 2015…) de clubes cuyo sitio empieza años después. Queda
  implementado; se va a poder medir cuando el pipeline cargue años consecutivos.
- **El que manda es el filtro de prosa**: 35% de las páginas. Sacarle las vecinas (H) ahorra 6 puntos más pero pierde 13 páginas
  con error real. Con vecinas no pierde ninguna página con números.

## Dónde queda el gasto con el default

| Documentos | Cantidad | Páginas | Dudosas | Costo registrado |
|---|---|---|---|---|
| Con capa de texto | 36 | 1.171 | 146 (12,5%) | $9,31 |
| Escaneos o texto roto | 68 | 1.963 | 1.136 (58%) | $29,67 |

El 89% de las páginas que siguen yendo a la API son de escaneos. Ahí el único chequeo gratis que funciona es no mandar la prosa. Para
bajar más en escaneos hace falta otra fuente gratis de verdad (ver "Siguiente paso").

## Los 15 escapes (todos `prosa`, ninguno `validada-gratis`)

Ninguno es un importe que vaya al sitio. Son identificadores o ruido en páginas que `paginas-con-numeros` no selecciona:

| Documento | Pág. | Entrada → corregido | Qué es |
|---|---|---|---|
| Rusia/Krasnodar 2021 auditorskoe-zaklyuchenie | 20, 21, 22, 23 | 2310401325 → 2310981325, 40703810130000031787 → 40702810130000031787, 350001 → 350901 | INN/KPP, cuentas bancarias, código postal del auditor |
| Noruega/Vålerenga 2020 | 25 | 993006050 → 993606650 | número de organización |
| Noruega/Vålerenga parent 2023 | 55 | 903606650 → 993606650 | número de organización |
| Noruega/Start 2009 | 17 | 973606650 → 993606650 | número de organización |
| Noruega/Rosenborg 2013 | 34 | 960211282 → 980211282 | número de organización |
| Ucrania/Epicentr 2023 | 1 | cuenta IBAN de 26-27 dígitos | cuenta bancaria |
| República Checa/Slavia Praha 2008 | 1 | 5541 → 3541 | sello manuscrito en la portada |
| Portugal/Alverca 2023-24 | 3 | 69051016 → 6905101 | cifra inventada en un pie de página de un escaneo malo |
| Italia/Sassuolo 2021 | 64 | 257500000 → 252500000 | capital social en la página societaria |
| Italia/Atalanta 2020 | 71 | 197784 → 1977842 | dato de registro (código REA) |
| Inglaterra/Mercedes F1 2025 | 7 | 014001 → 14001 | formato (cero a la izquierda), no es un error |
| Bélgica/OH Leuven 2018 | 37 | 0925 → 00925 | formato, no es un error |

## Recomendación

1. Usar la cascada con el default (G2) como filtro previo en `resolver-inventario.mjs`: solo las páginas `dudosa` van a
   Gemini/Claude. En esta muestra ahorra ~49% del costo registrado y 177 de las 603 páginas pagadas, sin dejar pasar ningún error
   real de una página con números.
2. No adoptar la regla literal de "una tabla que cierra valida la página".
3. En escaneos, el ahorro sale casi todo del filtro de prosa. Para ir más lejos, el siguiente chequeo gratis a probar es la columna
   comparativa **entre documentos del mismo club** (el año N-1 del documento N contra la columna N del documento N-1, aunque no estén
   en producción). Hay varias series en el inventario (Charleroi, Standard, Randers, Fluminense) y este test no las pudo usar.
4. Si Gemini se sigue mandando con el documento entero en escaneos, el ahorro real de Gemini es menor que lo que muestra la
   proporción de páginas. El ahorro fuerte es en Claude, que ya va página por página. Para cobrarlo entero hay que mandar a Gemini
   solo las páginas dudosas (ya existe `voiceGeminiPerPage`).
