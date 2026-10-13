# Informe grupo A (cola etapa 6, Italia). Solo lectura: no se corrió ningún script de escritura.

Nota de método: no se corrió verificar.mjs, así que "cierra" significa que lo comprobé a mano con las cifras impresas. El "por qué falló el script" está inferido leyendo tools/verificar.mjs y los .filas/.verificacion.json (marcado "probable" cuando no pude correrlo).

## AC Milan 2017-18 (AC-Milan-bilanci-relazioni-2017-18.pdf)

Cuenta de cierre con la fila propuesta (miles de EUR; estado en pág. 43 del visor, impreso 42 al pie, L940-L984; resto en pág. 44, impreso 43, L998-L1026):
255.733 (TOTALE A, L955; incluye (125) de L944 con signo negativo) − 354.388 (TOTALE B, L983) = −98.655 (L984) ; financiero −22.343 (L1012) ; rettifiche D −218 (L1016/L1018) ; impuesto −4.803 (L1023) ⇒ −126.019 = impreso (L1024). Exacto.
Sin la fila D da −125.801, y la diferencia con el impreso es exactamente 218.

| caso | respuesta | evidencia | por qué falló el script |
|---|---|---|---|
| 60ef1b0 no-cierra resultado | Ajuste (comando abajo). Resuelve también la causa de que el caso exista. | falta D) 19) a) "svalutazioni di partecipazioni" (218), .md L1016 y total D L1018, pág. 44 del visor (impreso 43). Las filas D quedaron lado "otro" y ninguna lectura las suma con el signo correcto. | verificar.mjs, lectura 6 ("otros" por su signo): usa la convención de gastos (con costos impresos en positivo, un (218) negativo cae como INGRESO). Patrón P1. |
| 3a475b7 primer-anio 2018 | NO aceptar con los números del caso. Los "ingresos 511.716" son un doble conteo de la lectura 0 (TOTALE A 255.733 + las 12 hojas 255.983, con (125) sumado en positivo). Tras el ajuste, ingresos esperados 255.733, gastos 354.388, resultado −126.019: los tres coinciden con L955, L983, L1024. Re-verificar y que el caso se regenere. | L955 255.733 / L983 354.388 / L1024 (126.019) | verificar.mjs lectura 0: deja pasar el "total" como una línea más y toma (125) con valor absoluto. Patrón P4 (secundario, cosmético: sólo afecta el texto del caso). |
| c239544 duda-tema columna "Esercizio 2017" | aceptar | La columna "Esercizio 2017" del estado (L936, L998) es el período de transición (cambio de ejercicio 1/1-31/12 a 1/7-30/6, L399; el comparativo 8.323 de ricavi contra 21.984 de la nota 2016/2017, L2381). Es la columna anterior tal cual impresa. El sitio no tiene 2017 cargado (data/acmilan-it-data.js: sólo 2023 y 2024), el chequeo vecino no corre. | extraer.mjs hizo bien en preguntar; no es un fallo. |

Comando (ajuste, sin ejecutar):
node tools/ajustes.mjs --agregar "Clubes/Italia/AC Milan/AC-Milan-bilanci-relazioni-2017-18.pdf" fila --valor "(218)" --etiqueta "svalutazioni di partecipazioni (19, costo)" --lado financiero --linea 1016 --motivo "D) rettifiche quedan sin lado: 19) a) svalutazioni di partecipazioni (218), TOTALE D (218) L1018; igual que AC Milan 2023-24 (to-do 155)" --evidencia "pág. 44 del visor (impreso 43), .md L1014-L1018"

## AC Milan 2021-22 (AC-Milan-bilanci-relazioni-2021-22.pdf)

Cuenta de cierre con las filas propuestas (estado en pág. 27 del visor, impreso 27, L757-L802; resto pág. 28, impreso 28, L823-L850):
297.592 (TOTALE A, L773; con (54) negativo, L761) − 352.573 (hojas; oneri diversi 22.232 suman las 6 partidas L793-L799, no el 30.124 impreso en L800; TOTALE B impreso 352.572) = −54.981 (impreso A−B (54.980), redondeo) ; financiero −4.600 (impreso (4.599)) ; D: +521 (L835) −1.000 (L840) = −479 (impreso L844) ; impuesto −6.478 ⇒ −66.538 contra impreso −66.537 (1 mil de redondeo; la compuerta exacta es media unidad por fila, entra).
Sin D: diferencia 0,479 + 0,108 por el signo de (54) (resumido: lo que muestra el caso, −0,584).

| caso | respuesta | evidencia | por qué falló |
|---|---|---|---|
| e7513be no-cierra | Dos ajustes de financiero (abajo). | D) 18) a) rivalutazioni di partecipazioni 521 (L835) y 19) a) svalutazioni (1.000) (L840), total D (479) L844; las filas D son lado "otro". | P1 (misma causa que 2017-18). La parte de 0,108 es el signo de (54) (L761): la lectura 0 lo toma en positivo; las lecturas 4-5 lo leen bien. |
| 5a70fe0 duda-tema escala | aceptar | La escala SÍ está impresa: "(in migliaia di Euro)" en L749 (pág. 27 del visor) y L814 (pág. 28), y la nota L1401 dice que todo está en miles. | localizar.mjs: el rótulo de escala está 4 líneas antes del bloque (b14 arranca en L753) y quedó fuera de la ventana; extraer.mjs dudó. Patrón P5. |
| bee3354 oneri diversi 22.231 vs 30.124 | aceptar | Las partidas L793-L799 suman 22.232; 75.826+170.254+76.368+7.893+22.232 = 352.573 = TOTALE B 352.572 (L801). El 30.124 de L800 (y 31.927 del año anterior) es un subtotal mal impreso: el año anterior también cierra con 23.575 de la nota (L2349-L2350: 23.575, no 31.927). Se cargan las hojas, no el subtotal. | No es un fallo: el subtotal del documento está mal impreso y extraer lo detectó bien. |
| 1852272 6.280/5.533 estado vs 6.275/5.539 nota | aceptar | Se cargan las hojas del estado (origen "estado" en .verificacion, L793 y L799); la nota L2343/L2348 difiere en 5 y 6 con suma neta igual. El estado es la cifra del total oficial. | No es un fallo. |

Comandos (ajustes, sin ejecutar):
node tools/ajustes.mjs --agregar "Clubes/Italia/AC Milan/AC-Milan-bilanci-relazioni-2021-22.pdf" fila --valor "521" --etiqueta "rivalutazioni di partecipazioni (18)" --lado financiero --linea 835 --motivo "D) rettifiche sin lado: 18) a) rivalutazioni di partecipazioni 521 (TOTALE D (479), L844); igual que AC Milan 2023-24 (to-do 155)" --evidencia "pág. 28 del visor (impreso 28), .md L833-L844"
node tools/ajustes.mjs --agregar "Clubes/Italia/AC Milan/AC-Milan-bilanci-relazioni-2021-22.pdf" fila --valor "(1.000)" --etiqueta "svalutazioni di partecipazioni (19, costo)" --lado financiero --linea 840 --motivo "D) rettifiche sin lado: 19) a) svalutazioni di partecipazioni (1.000); ver el anterior (to-do 155)" --evidencia "pág. 28 del visor (impreso 28), .md L838-L844"

## AS Roma 2021 (AS-Roma-bilancio-2021.pdf)

Estado: pág. 74 del visor (impreso 72), L2133-L2168.
Cuenta de cierre (gestión de jugadores en BRUTO, criterio ya decidido: Roma 2018/2019/2022/2025):
ingresos 190.412 (L2139) + 36.125 (L2148) = 226.537 ; gastos 337.641 (L2147) + 37.323 (L2149) = 374.964 ; resultado operativo −148.427 ; financiero 2.508 − 38.477 = −35.969 (L2153: (35.970)) ; impuesto −1.176 (L2156) ⇒ −185.573 = impreso consolidado (L2157). Exacto. (El impreso del Gruppo es (185.317), L2160; se mantiene el perímetro consolidado ya fijado.)
Chequeo vecino: 226.537 = columna 2021 del documento 2022-consolidato (226.537). Con el neto (−1.198) daba 190.412, de ahí el 190.414 vs 226.537 del caso.

| caso | respuesta | evidencia | por qué falló |
|---|---|---|---|
| 713865d no-cierra | Dos ajustes (abajo): Ricavi 36.125 (ingreso, L2148) y Oneri (37.323) (gasto, L2149). | L2148-L2150, pág. 74 (impreso 72). | P2: las dos filas de gestión de jugadores son lado "otro" y la lectura 6 no cierra porque el mismo bloque trae filas posteriores al resultado (L2161 "Perdita per azione (0,2947)" y L2163 "attuariale 177", lado otro) que se cuelan como ingreso/gasto (probable: +0,177 de diferencia). |
| 84e7cb7 primer-anio 2021 | No aceptar con 190.414 / 337.64. Tras los ajustes: ingresos 226.539 (hojas+notas, 2 mil de redondeo de la nota), gastos 374.963, resultado −185.573 = L2157. | ver arriba | P2 |
| b03fa64 anio-vecino 2022 y e4b35dc no-cierra "documento del año 2022" | No requieren respuesta propia: con los ajustes 226.537 = 226.537 y desaparecen al re-verificar. Si hay que cerrarlos antes de re-verificar: descartar. | columna 2021 de AS-Roma-bilancio-2022-consolidato (226.537) | consecuencia de P2: la reexpresión no existe, es el neto contra el bruto |

Comandos (sin ejecutar):
node tools/ajustes.mjs --agregar "Clubes/Italia/AS Roma/AS-Roma-bilancio-2021.pdf" fila --valor "36.125" --etiqueta "Ricavi da gestione dei diritti pluriennali prestazioni calciatori" --lado ingreso --linea 2148 --motivo "gestión de jugadores en bruto (ingresos y gastos por separado), como AS Roma 2018/2019/2022/2025; el estado la imprime como renglones sin lado" --evidencia "pág. 74 del visor (impreso 72), .md L2148-L2150"
node tools/ajustes.mjs --agregar "Clubes/Italia/AS Roma/AS-Roma-bilancio-2021.pdf" fila --valor "(37.323)" --etiqueta "Oneri da gestione dei diritti pluriennali prestazioni calciatori" --lado gasto --linea 2149 --motivo "gestión de jugadores en bruto (gastos), ver el anterior" --evidencia "pág. 74 del visor (impreso 72), .md L2148-L2150"

## AS Roma 2023 (AS-Roma-bilancio-2023.pdf). El documento ya cierra (277.056595, resultado −102.747288, lectura "como impresos").

| caso | respuesta | evidencia | por qué |
|---|---|---|---|
| db1b8e4 cuadro "Beni e prodotti da commercializzare" | aceptar (se deja afuera) | L2636-L2638: costo total 9.700 (ya está en L2629 como desglose de "6) per materie prime") y variazione 252 (ya es el ingreso de L958); "Costo al netto" 9.448 es un cálculo, sumarlo duplicaría. Pág. 59 del visor (impreso 59). | extraer.mjs preguntó bien; es el "cuadro de nota que repite renglones": no se carga. Patrón P6 (ya hay respuesta equivalente para el club, tema "cuadro-duplicado"). |
| 8a67e8a desglose b44 | corregir --valor "no" | El estado separa ricavi da gare 33.377.286 (L955, matchday) y abbonamenti 15.866.698 (L956, season_tickets); b44 (L2538-L2543, pág. 58) reparte los mismos 49.244 por competición (Serie A 32.680, UEFA 12.955, Coppa Italia 1.010, amichevoli 2.599). Cargarlo contra el subtotal 1) duplicaría 49.244 y borraría la categoría season_tickets que sí trae el estado. Es el criterio de "cuadro que repite renglones del estado". | extraer.mjs propuso "sí" porque b44 está en notas_ingresos y suma el subtotal; no distingue que el subtotal ya está cubierto por hojas con otra apertura. Patrón P6. |

## AS Roma 2024 (AS-Roma-bilancio-2024.pdf). Cierra (ingresos 301.716464, resultado −81.364.367).

| caso | respuesta | evidencia | por qué |
|---|---|---|---|
| 8c734f1 "e) altri interessi" L897 | aceptar | L896 (17.104.753) y L897 repiten el importe; el financiero cargado es 6.045.982 − 17.104.753 − 1.906 = −11.060.677 = TOTALE C impreso (L899), ya sin L897 (en filas: detalla_a = L896). Pág. 23 del visor (impreso 23). Cierre: −64.525.633 −11.060.677 −5.778.058 = −81.364.368 ≈ −81.364.367. | extraer.mjs ya lo resolvió con detalla_a y igual lo pregunta (afecta_carga true). Patrón P6. |

## Inter 2019-20 (Inter-fascicolo-bilancio-consolidato-2019-20.pdf)

Estado: pág. 16 (L826-L875) y pág. 17 (L877-L925) del visor; el fascículo no numera el impreso en esas páginas.
Cuenta de cierre con los impresos: 372.370.111 (L848) − 443.923.801 (L874) = −71.553.690 (L875) ; financiero (16−17) −26.213.126 ; D +529.404 ⇒ −97.237.412 (L903-904, "Risultato prima delle imposte") ; impuesto −6.617.614 +338.158 +1.123.079 = −5.156.377 ⇒ −102.393.789 = impreso (L912 y L918). Exacto.
Con lo extraído: ingresos 372.370.160 (las notas en miles redondean), gastos 443.929.187 (diferencia +5.386: "12) Accantonamenti per rischi (3.402)" L863 entra como +3.402 y las notas redondean −1.418). El financiero extraído −25.683.722 ya incluye D (+529.404).

| caso | respuesta | evidencia | por qué falló |
|---|---|---|---|
| ca40666 resultado | aceptar (la pregunta está mal planteada: el resultado SÍ está transcripto): L912 "Perdita dopo imposte prima della quota dei Terzi" (102.393.789), L915 Terzi "-", L918 "Perdita d'esercizio di pertinenza del Gruppo" (102.393.789), pág. 17 del visor. Además el ajuste resultado-final (abajo), que le da el número a la etapa. | L912, L918 | localizar.mjs cortó el estado en b12 (L906-L910, impuestos) y dejó fuera b11 (L903-L904, resultado antes de impuestos), b13 (L912-L913) y los bloques de L915 y L918. Patrón P3. |
| cfce6eb primer-anio 2020 | No aceptar todavía. Ingresos 372.370.160 contra 372.370.111 (L848) bien (redondeo de notas, 49 EUR); gastos 443.929.187 contra 443.923.801 (L874), la diferencia de 5.386 EUR es el signo de (3.402) de L863 y el redondeo de notas; resultado: el script no tenía el impreso. Aceptar después de re-verificar con el resultado, mirando que "12) Accantonamenti" entre negativo (−0,003402). | L848, L863, L874, L918 | P3 (sin resultado no hay compuerta para elegir la lectura que lee (3.402) con su signo). |
| c672389 desglose b78 sólo Tesserati | corregir --valor "no" | b78 (L2586-L2589) suma 163.043 = "Tesserati" de "Salari e stipendi" (L2573, 163.043 de 181.341; los otros 18.298 son "Altri"). Criterio decidido: desglose parcial no se carga. El renglón se carga entero (181.340.808, L854). Pág. 54 del visor. | extraer.mjs propuso abrirlo; la compuerta (el desglose tiene que sumar el renglón) lo habría rechazado. Patrón P7. |
| 45d7976 b75 "Amministrative - pubblicitarie e generali" | corregir --valor "no" (no falta nada) | La lista de pág. 53 del visor (impreso 35) son 19 filas que suman 36.225; el propio texto la presenta como parcial ("comprendono tra l'altro", L2536) y la tabla no imprime total (verificado también en el PDF con pdftotext). El renglón 38.179 (L2479) se carga entero. Precedente: "las filas no suman el renglón y no hay total: no se abre el desglose" (36f9d01). | La transcripción es fiel. extraer.mjs/verificar.mjs: dudó pese a que ya registra faltasDesglose; patrón P7. |

Comando (sin ejecutar):
node tools/ajustes.mjs --agregar "Clubes/Italia/Inter/Inter-fascicolo-bilancio-consolidato-2019-20.pdf" resultado-final --valor "(102.393.789)" --linea 918 --motivo "el estado cortó en b12 y el resultado impreso (L912 y L918) quedó afuera; cierra exacto con los totales impresos (372.370.111 − 443.923.801 − 26.213.126 + 529.404 − 5.156.377)" --evidencia "pág. 17 del visor, .md L912 y L918"
Ojo: resultado-final DEDUCE el impuesto (antes de impuestos de las filas − final) y quedaría 5.151.040 en vez de 5.156.377 (5.337 EUR por redondeo de notas). Alternativa más fiel: re-localizar con b11, b13-b15 en el estado y dejar que verificar lea el resultado (L918); no usé esa por no poder correrla.

## [GUIDO]
Ninguna. Todo se resuelve con el documento y los criterios ya decididos. Sólo anoto como decisión menor y reversible si lo ves distinto: Inter 2019-20 con resultado-final deja el impuesto en 5.151.040 en vez del impreso 5.156.377 (5.337 EUR, redondeo de notas). Recomiendo aceptarlo.

## PATRONES PARA MEJORAR EL SCRIPT

P1. Rettifiche di valore D) (18 rivalutazioni, 19 svalutazioni) quedan como filas "otro" y la lectura 6 las asigna con la convención de signo de gastos.
Herramienta: verificar.mjs, lectura 6 (línea `esGasto = gastosNeg ? f.M < 0 : f.M > 0`), extraer.mjs (lado "otro").
Casos del grupo: 60ef1b0 (y 3a475b7), e7513be.
Ejemplo: Milan 2021-22, L835 +521 y L840 (1.000), total D (479) L844; con costos impresos en positivo, +521 cae como gasto y (1.000) como ingreso; el resultado queda 0,958 M€ torcido (esperado −66.537; sin D −65.953). Milan 2017-18, L1016 (218): −125.801 contra −126.019.
Escalón con UNA compuerta: las filas "otro" ubicadas entre el encabezado "D) RETTIFICHE" y "RISULTATO PRIMA DELLE IMPOSTE" se leen como financiero con su signo impreso. Compuerta: su suma es igual al total D impreso (L844 / L1018) y el resultado impreso cierra exacto. Ya hay 5 ajustes manuales iguales (Milan 2023-24 x2, Inter 2021-22 y 2024-25, Bologna 2019-20).

P2. Gestión de jugadores (ricavi/oneri da gestione dei diritti pluriennali) como filas "otro" más filas posteriores al resultado (EPS, OCI) en el mismo bloque, que contaminan la lectura 6.
Herramienta: verificar.mjs (lectura 3/6, `otros`), con ayuda de localizar.mjs (bloque del estado que incluye el conto economico complessivo).
Casos: 713865d, 84e7cb7, b03fa64, e4b35dc.
Ejemplo: Roma 2021, L2148 36.125 y L2149 (37.323) sin lado; L2161 "Perdita per azione (0,2947)" y L2163 "attuariale 177" también "otro". Esperado ingresos 226.537 (igual al año vecino) contra 190.414 obtenido.
Escalón con UNA compuerta: en la lectura 6, tomar sólo los "otro" que están entre "Totale costi operativi/costi" y "Risultato prima delle imposte" (descartar todo lo posterior al resultado). Compuerta: resultado impreso exacto; si además el año vecino imprime ingresos, que coincidan.

P3. El resultado impreso queda fuera de los bloques del estado cuando el estado se parte en tablitas.
Herramienta: localizar.mjs (bloques del estado), extraer.mjs (F.resultado nulo).
Casos: ca40666, cfce6eb.
Ejemplo: Inter 2019-20, estado = b8, b9, b10, b12 (hasta L910); el resultado (102.393.789) está en L912 y L918 (b13 y siguientes), y "Risultato prima delle imposte" en L903-L904 (b11) tampoco entró.
Escalón con UNA compuerta: extender el estado a los bloques consecutivos de la misma página hasta la primera fila "Utile/Perdita d'esercizio"; compuerta: ingresos − gastos ± financiero ± impuesto da ese resultado exacto (si no, no se extiende).

P4. Lectura 0: total sumado como línea más, y renglones entre paréntesis dentro de ingresos/gastos tomados con valor absoluto.
Herramienta: verificar.mjs (lectura 0, función `ajuste()` cuando el total está dentro de `arr`).
Casos: 3a475b7, 60ef1b0 (secundario), e7513be, cfce6eb.
Ejemplo: Milan 2017-18, ingresos 511.716 (= TOTALE A 255.733 + hojas 255.983, con (125) de L944 como +125) contra 255.733 esperado; Inter L863 (3.402) como +3.402.
Escalón con UNA compuerta: en `ajuste()`, si la fila total está en `arr`, excluirla antes de sumar. Compuerta: la suma sin el total es igual al total impreso. Es cosmético mientras otra lectura cierre, pero engaña en el texto de la cola (primer-anio).

P5. El rótulo de escala "(in migliaia di Euro)" queda fuera de la ventana del bloque.
Herramienta: localizar.mjs (ventana del bloque) / extraer.mjs (duda "escala").
Casos: 5a70fe0.
Ejemplo: Milan 2021-22, rótulo en L749 y L814, bloque b14 desde L753; la nota L1401 dice "espressi in migliaia di Euro". Pregunta sin necesidad.
Escalón con UNA compuerta: buscar "in migliaia di Euro" hasta 6 líneas arriba del bloque y en la nota de criterios; compuerta: coincide con la magnitud del total de ingresos del año vecino o con una nota que declare la escala.

P6. Dudas "cuadro duplicado" o "sub-renglón repetido" que el propio extraer ya resolvió.
Herramienta: extraer.mjs (generación de dudas).
Casos: db1b8e4, 8a67e8a, 8c734f1.
Ejemplo: Roma 2024 L897 ya está con detalla_a = L896 y el financiero cierra con TOTALE C (L899); igual se pregunta. Roma 2023 L2636-L2638 repite 9.700 (L2629) y 252 (L958).
Escalón con UNA compuerta: no preguntar cuando todas las cifras del cuadro ya existen en el estado/otro desglose (mismos importes) y el resultado impreso cierra con el cuadro afuera.

P7. Desglose parcial propuesto como desglose ("tesserati", lista "tra l'altro").
Herramienta: extraer.mjs (duda de desglose) con verificar.mjs (faltasDesglose).
Casos: c672389, 45d7976.
Ejemplo: Inter 2019-20, b78 suma 163.043 de 181.341 (L2573); b75 suma 36.225 de 38.179 (L2518-L2536).
Escalón con UNA compuerta: si las filas del desglose no suman el renglón del estado (a media unidad por fila) y el documento no imprime total, no abrir ni preguntar. Compuerta: |suma − renglón| > tolerancia de redondeo.
