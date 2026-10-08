# Informe grupo C (Italia, etapa 6). Solo lectura: no se corrió ningún script; las cuentas de cierre están hechas a mano.

Convención: M = millones de EUR como en los .verificacion.json.

## Atalanta 2019 (consolidado) — Atalanta-bilancio-consolidato-2019.md
| caso | respuesta | evidencia |
|---|---|---|
| de662f7 no-cierra resultado | NO responder: agregar ajuste y re-verificar | ver abajo |
| a0304c3 ¿se carga b9? | `corregir --valor "no"` (la propuesta "sí" está al revés; mismo criterio que Atalanta 2020) | b9 = pág. 20 del visor, L805-822: cuadro de "risultato netto delle operazioni sui diritti pluriennali", sin etiquetas. Cada importe repite una partida ya cargada: (31.346.324) = amm. diritti L1499; (412.363) = L391; (10.292.384) = L1456; 38.753.413 = L1370; (306.111) = L1552; 6.740.273 = L1373 |
| 7529688 ¿se deja afuera el cuadro sin etiquetas de b9? | `aceptar` | mismo cuadro |
| 96179d6 ¿se deja afuera b45 (Tesserati/Altri)? | `aceptar` | pág. 38 del visor, L1469-1477: columnas por categoría; Tesserati salari 58.276.118 + Altri 3.368.116 = 61.644.234 (estado L383: 61.644.235). Desglose parcial (b46, solo tesserati) = criterio decidido: no se carga |

Por qué falló el script (de662f7): verificar.mjs. Las lecturas 0-6 no cierran porque el escalón "17) resta" exige que el financiero dé EXACTO el Totale C impreso, y acá el 17-bis está impreso en positivo (923, L429) siendo pérdida (b52 L1605-1607: Totale (923)); con su signo da 0,001846 M de diferencia contra 3 EUR de tolerancia, el escalón no corre y queda la lectura 0, que además suma "11) Variazioni rimanenze" (207.540) en valor absoluto y cuenta el "Totale costi" (L397) como línea: gastos 295,804276 = 148,109678 + 147,694598.
Ajuste propuesto (sin ejecutar):
`node tools/ajustes.mjs --agregar "Clubes/Italia/Atalanta/Atalanta-bilancio-consolidato-2019.pdf" fila --valor "(923)" --etiqueta "17-bis) Utile e perdite su cambi" --lado financiero --linea 429 --reemplaza-linea 429 --motivo "17-bis impreso en positivo en el estado pero es pérdida: nota b52 Totale (923); Totale C (838.256) = 189.628 - 1.027.884 (patrón to-do 155)" --evidencia "pág. 9 del visor, .md L429-431; b52 L1605-1607"`
Cuenta de cierre con el ajuste (lectura 4/5, rimanenze con su signo): ingresos 188,621207 − gastos 147,694598 = 40,926609; financiero 0,175438 + 0,014190 − 0,189682 − 0,837279 − 0,000923 = −0,838256 (= Totale C impreso L431, exacto) → 40,088353; − impuesto 13,590922 = 26,497431 contra impreso 26,497451: 20 EUR de diferencia, errata del propio documento (el renglón 1) L372 imprime 13.502.210, pero b40 L1349 y el Totale A L377 implican 13.502.230). Entra en TOL (0,01 M). Si el verificador exigiera exacto, ajuste de respaldo: `fila` ingreso "1) Ricavi delle vendite e delle prestazioni" valor "13.502.230" --linea 372 --reemplaza-linea 372. Tras el ajuste hay que correr verificar (no lo hice): hipótesis, no medido.
primer-anio: no aplica (no hay caso; el sitio no tiene 2018).

## Atalanta 2025 (consolidado) — 939f93c
| caso | respuesta | evidencia |
|---|---|---|
| 939f93c ¿b5 en euros y no en miles? | `aceptar` | L670 "Tutti i valori ... sono espressi all'unità di Euro"; b5 (pág. 8 del visor, L187-262) Totale A 320.817.768 y la columna 2024 = 243.723.844 = lo que el sitio ya tiene cargado para 2024 (chequeo "año anterior cargado" ok) |
Por qué falló: extraer.mjs/IA no encontró la frase de escala sobre el estado (la frase está en la nota L670). Patrón: duda de escala.
Hallazgo extra (no es un caso de la cola): la fila L251 "a) di partecipazioni (4.000)" (D, svalutazioni) entró como INGRESO +4.000 ("sin lado ... impreso en negativo", lectura 3/4), cuando es un costo. Efecto: ingresos 320,821768 contra 320,817768 impreso, y resultado 8.000 EUR alto (37.869.985 contra 37.861.985); pasa por TOL=10.000 EUR. Antes de cargar 2025: `node tools/ajustes.mjs --agregar "Clubes/Italia/Atalanta/Atalanta-bilancio-consolidato-2025.pdf" fila --valor "4.000" --etiqueta "a) di partecipazioni (svalutazione)" --lado gasto --linea 251 --reemplaza-linea 251 --motivo "rettifiche D) impresas en negativo = costo; Risultato prima delle imposte 58.571.254 = 59.105.997 - 530.743 - 4.000" --evidencia "pág. 8 del visor, .md L251, L255"`. Cuenta: 320,817768 (ingresos sin la fila) − 261,711771 − 0,530743 − 0,004 = 58,571254 ✓; − 20,709269 = 37,861985 ✓ exacto.

## Cremonese 2022 — a3d272e (primer-anio)
`aceptar`. Pág. 5 del visor, L154-192. Ingresos 28.106.539 (Totale valore della produzione, L162) = 28,106539 ✓; gastos 29.999.709 (L181) vs 29,99971 (1 EUR de redondeo) ✓; (1.893.170) − 121.384 = (2.014.554) ✓; − imposte 909.060 = (2.923.614) = resultado impreso L192 ✓. Tres cifras coinciden con lo impreso.
Por qué se preguntó: es el paso obligado de "primer año del club" (verificar.mjs), aunque los totales y el resultado cierran exacto.

## Monza 2023 — 46c1999
`aceptar`. b40 (pág. 48 del visor, L1850-1858) continúa b39 (pág. 47, L1839-1842): 15.638.678 + 1.122.368 + 38.795.307 + 885.237 + 2.359.000 + 142.000 + 36.906 + 162.875 + 398.592 + 1.776.606 + 422.096 = 61.739.665 = total de la nota (L1858) = "pari a Euro 61.739.665" (L1833). Verificación del documento: ok (resultado −60,280526 cierra).
Por qué: localizar.mjs cortó la tabla en dos bloques por el salto de página (la continuación no repite el encabezado).

## Napoli 2022 — e242286
`aceptar` (la respuesta es correcta), pero AVISO: el documento tiene tres problemas que no están en la cola y que hay que arreglar antes de cargar.
- Evidencia de la duda: pág. 58 del visor (impreso 58), L2270-2287: -IRES (16.691.108) + IRAP 3.069.681 = (13.621.427) = Totale imposte (L2284 y estado L309); es la misma suma reagrupada por tributo, no se carga.
- Problema 1 (localizar.mjs): el estado quedó en b12-b14; la fila "UTILE (PERDITA) DELL'ESERCIZIO (51.951.202)" (L309-310) quedó en un bloque b15 aparte y fuera de `estado`: extraer no tiene resultado impreso ("no encontró el resultado impreso"); la lectura 1 tampoco sirve porque ANTES_RE no reconoce "prima delle imposte" (solo "ante imposte").
- Problema 2 (verificar.mjs lectura 0): "11) Variaz. rimanenze (439.846)" entra en valor absoluto y el "TOTALE COSTI" L270 como línea: gastos 483,222726 = 241,171517 + 242,051209 (2×0,439846 de diferencia, así se ve el patrón).
- Problema 3 (financiero): 17bis "b) perdite su cambi" 6.136 impreso en positivo (L294): el escalón 17) no cierra el Totale C exacto.
Ajustes propuestos (sin ejecutar):
`node tools/ajustes.mjs --agregar "Clubes/Italia/Napoli/Napoli-bilancio-2022.pdf" resultado-final --valor "(51.951.202)" --linea 309 --motivo "la fila del resultado quedó fuera del estado (bloque b15); el impuesto se deduce" --evidencia "pág. 7 del visor, .md L309"`
`node tools/ajustes.mjs --agregar "Clubes/Italia/Napoli/Napoli-bilancio-2022.pdf" fila --valor "(6.136)" --etiqueta "b) perdite su cambi" --lado financiero --linea 294 --reemplaza "b) perdite su cambi" --motivo "perdite su cambi impresas en positivo; Totale 17bis 6.743 = 12.879 - 6.136 (patrón to-do 155)" --evidencia "pág. 7 del visor, .md L293-296"`
Cuenta de cierre: 175,995109 − 241,171517 (hojas con (439.846) restando) = −65,176408 (= L296 ✓); financiero 0,000973 − 0,403937 + 0,012879 − 0,006136 = −0,396221 (= Totale C ✓) → −65,572629 (= Risultato prima imposte ✓); impuesto (13,621427) es un ingreso fiscal → −51,951202 = resultado impreso ✓ exacto. Hipótesis: no corrí verificar.

## Napoli 2023 — afca6c2 (no-cierra)
No responder: ajuste y re-verificar. Pág. 6-7 del visor (estado L214-292).
Por qué falló: verificar.mjs, financiero. Sumó 3,506274 (todo positivo). El escalón "17) resta" no corre porque el 17-bis desglosado trae "b) perdite su cambi 212" en positivo (L280): 2.300.194 − 1.202.369 + 3.499 + 212 = 1.101.536 contra Totale C 1.101.112: 424 EUR de diferencia, y la compuerta es exacta (mismo patrón que Napoli 2024, to-do 155).
Ajuste (sin ejecutar): `node tools/ajustes.mjs --agregar "Clubes/Italia/Napoli/Napoli-bilancio-2023.pdf" fila --valor "(212)" --etiqueta "b) perdite su cambi" --lado financiero --linea 280 --reemplaza "b) perdite su cambi" --motivo "perdite su cambi impresas en positivo; Totale 17bis 3.287 = 3.499 - 212 (patrón to-do 155 igual que Napoli 2024)" --evidencia "pág. 7 del visor, .md L279-283"`
Cuenta de cierre: ingresos 359,264354 − gastos 242,559928 = 116,704426 (= L? A−B impreso ✓); financiero 2,300194 − 1,202369 + 0,003499 − 0,000212 = 1,101112 (= Totale C impreso ✓ exacto) → 117,805538 (= Risultato prima imposte ✓); − impuesto 38,105457 = 79,700081 = impreso ✓ exacto. (11) Variaz. 2023 es +30.136, sin problema de signo.) Si con solo este ajuste el "e) altri" no se lee restando, agregar también `fila` "(1.202.369)" en L276 como en 2024.

## Parma 2024 individual — 36a3982, 6573d39, 7b237fe
| caso | respuesta | evidencia |
|---|---|---|
| 36a3982 anio-vecino 2023 | `aceptar` (falsa alarma) | col. 2023 de este documento: Totale valore produzione 28.891.375 (L536); el sitio ya tiene 2023 = 28.891.375 (chequeo "año anterior cargado" ok). El 54.231102 del documento 2023 = 28,891375 + 25,339727 ("altri" L557 contado dos veces), que el ajuste fila de Admin/ajustes-manuales.jsonl (L557 → 0, reemplazaLinea) ya corrige en el 2023 cargado |
| 6573d39 no-cierra "documento del año 2023" | `aceptar` (mismo motivo) | idem; el 2023 .verificacion.json dice ingresos 28,891375 |
| 7b237fe ¿impuesto L570 como ingreso 961.793? | `aceptar` | pág. 16 del visor, L570-572: "proventi (oneri) da adesione al regime di consolidato fiscale 961.793" positivo = provento; Totale imposte (961.793) entre paréntesis = costo negativo; (64.376.270) + 961.793 = (63.414.477) = L572 ✓. Cierra "como impresos" |
Por qué falló: verificar.mjs, compararVecino: compara la columna con las filas CRUDAS del documento vecino, sin aplicar los ajustes `fila` de ese documento. Para 7b237fe: duda de signo que la suma ya confirma (resultado cierra).
primer-anio/cuenta 2024: ingresos 41,490983 − gastos 105,936987 = (64,446004) ✓; + financiero 69.734 = (64,376270) ✓; + impuesto 961.793 = (63,414477) = resultado impreso ✓ exacto.

## Sassuolo 2024 — 6795125
`aceptar`. Pág. 51 del visor, L1676-1684 (b52, Euro/000): total Tesserati 57.363 = columna Tesserati de b51 (L1666-1670), que desglosa solo una parte del personale (Totale 63.363). Desglose parcial → no se carga; el estado ya trae el personale entero. El resultado del documento cierra (−22,125621, lectura 4).
Por qué se preguntó: IA/extraer.mjs pregunta; la confirmación "por las sumas" cubrió b51 (columna) pero no b52, que es un detalle de una columna y no de un renglón del estado.

## PATRONES PARA MEJORAR EL SCRIPT
1. verificar.mjs, escalón "17) resta": 17-bis con pérdida impresa en positivo. Casos: de662f7 (Atalanta 2019, L429: 923), afca6c2 (Napoli 2023, L280: 212), latente e242286 (Napoli 2022, L294: 6.136). Esperado Totale C −838.256 / 1.101.112 / −396.221; con el signo impreso da +/−2×pérdida de diferencia y la compuerta exacta no pasa. Escalón con UNA compuerta: dentro del 17-bis, si el "Totale 17-bis" impreso (b52 o estado) = utili − perdite con la fila "perdite/perdita" restando, esa fila resta (compuerta: total 17-bis impreso exacto, además de Totale C).
2. localizar.mjs, bloque de una fila final fuera del estado. Napoli 2022 (e242286): "UTILE (PERDITA) DELL'ESERCIZIO" L309-310 quedó en b15 y `estado`=b12-b14, sin resultado impreso. Escalón: un bloque de ≤2 líneas pegado al final del estado con una fila de resultado se une al estado (compuerta: antes de imposte − Totale imposte = ese valor).
3. verificar.mjs, ANTES_RE: no reconoce "Risultato prima delle imposte" (solo "ante imposte"). Napoli 2022 sin filaAntes, ninguna lectura tiene compuerta. Escalón: agregar "prima delle imposte" al patrón (compuerta ya existente: la lectura debe cerrar).
4. verificar.mjs, lectura 0 muestra y arrastra el valor absoluto de "11) variazione rimanenze (x)" y cuenta el "Totale costi" como línea (gastos duplicados). Casos: de662f7 (L393: −207.540 → +; gastos 295,8 en vez de 147,69), e242286 (L261: −439.846; 483,22 en vez de 241,17). Cuando ninguna lectura cierra, el .verificacion.json queda con la lectura 0 y el humano ve un número absurdo. Escalón: al elegir lectura para mostrar, mostrar la lectura 4/5 (signos impresos) en vez de la 0 (compuerta: la que más se acerque al resultado impreso).
5. verificar.mjs, compararVecino sin ajustes del otro documento. Casos: 36a3982, 6573d39 (Parma 2024 vs 2023: 54,231102 contra 28,891375). Escalón: antes de marcar falso, comparar contra el valor CARGADO en el sitio (compuerta: coincide exacto con la columna de este documento, chequeo "año anterior cargado" ya lo hace).
6. Dudas de la IA ya decididas que no se auto-confirman cuando el resultado no cierra o la tabla detalla una columna (cuadro duplicado, columna Tesserati): a0304c3, 7529688, 96179d6, e242286, 6795125 (en 2020 y 2025 de Atalanta sí se confirmaron). Escalón con una compuerta: si los totales y el resultado cierran y los importes del cuadro son todos iguales a filas ya cargadas o al total de una columna de otra tabla descartada, se confirma sin cola (en 2019 cerrará una vez arreglado el punto 1).
7. Primer año y escala: a3d272e, 939f93c. Compuerta: primer-anio se auto-acepta si total de ingresos, de gastos y resultado cierran exacto con los impresos (Cremonese: 28.106.539 / 29.999.709 / (2.923.614)); escala "unidades" se auto-confirma si el año anterior cargado coincide exacto con la columna (Atalanta 2025: 243.723.844).
8. Partidas D) (rettifiche) negativas "sin lado" entran como ingreso por el signo (lectura 3/4): Atalanta 2025 L251 (4.000) → ingreso +4.000, error de 8.000 EUR en el resultado tapado por TOL=10.000 EUR. Escalón: bajo un encabezado "Rettifiche di valore" (D), un importe entre paréntesis es costo (compuerta: Risultato prima delle imposte impreso exacto).
9. Monza 46c1999: localizar.mjs corta una tabla de nota en el salto de página (b39/b40). Escalón: unir bloques consecutivos sin encabezado si el último total impreso = suma de ambos (compuerta: 61.739.665).

[GUIDO] ninguna: todas las respuestas aplican criterios ya decididos. Solo informativo: Atalanta 2025 L251 (4.000) y Napoli 2022 necesitan los ajustes de arriba ANTES de cargar; no son decisiones de criterio.
