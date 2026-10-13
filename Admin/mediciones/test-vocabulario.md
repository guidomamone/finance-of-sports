# Test del vocabulario multi-idioma (`tools/vocabulario.mjs`, 2026-09-30)

Pedido de Guido: "deberías anticipar que los PDFs van a estar en múltiples idiomas, y todos los que faltan". Hasta acá el vocabulario vivía en
5+ regex y listas sueltas (STATEMENT_RE en `pipeline.mjs` y en `proponer-carga.mjs` —distintas entre sí—, NO_RESULTADOS_RE / SIDE_REV /
SIDE_EXP / isTotal en `pipeline.mjs`, RELEVANT_KEYWORDS en `extract-table-rows.mjs`, REV_W / EXP_W / RESULTADO_RE / SUBTOTAL_RE / TAX_W en
`filas-rubro.mjs`, REV_TOTAL_RE / RESULT_RE / TOTAL_RE en `proponer-carga.mjs`), cada una parchada de a un idioma cuando un piloto fallaba, y
cada tool normalizaba el texto a su manera.

## Qué se hizo

- **`tools/vocabulario.mjs`** (nuevo): un concepto por bloque (título de estado de resultados, ingresos, gastos, impuestos, resultado al
  comienzo / en cualquier lugar, total al comienzo / al final, total de ingresos, resultado del ejercicio, flujo de efectivo, cambios en el
  patrimonio, saldo inicial, título de balance, total del activo / del pasivo, columna de notas / código de fila) y, dentro de cada uno, los
  términos por idioma. **29 idiomas**: español, portugués, inglés, alemán, francés, italiano, neerlandés, danés, noruego, sueco, finés, checo,
  eslovaco, polaco, croata/bosnio/serbio latino, serbio cirílico, esloveno, húngaro, rumano, búlgaro, griego, turco, ruso, ucraniano, chino,
  japonés, coreano, árabe y hebreo. `node tools/vocabulario.mjs --cobertura` imprime la matriz concepto x idioma; `node tools/vocabulario.mjs
  "texto"` dice qué conceptos encuentra en un texto.
- **Una sola normalización** (`normalizar()`), la misma para el texto y para los términos: minúsculas, sigma final, NFKD sin diacríticos
  (también la vocalización árabe/hebrea), ß/æ/œ/ø/ð/đ/ł/ı/ħ/þ a mano, alef árabes, NFC para recomponer Hangul y kana, espacios colapsados.
- **Notación de términos con límites de palabra**: `palabra` (entera), `raíz*` (flexiones), `*infijo*` (solo idiomas que componen palabras y
  raíces largas), espacio = cualquier separador, guion = separador opcional, `{ re }` para los pocos casos que necesitan una regex propia.
  CJK/árabe/hebreo van sin límites (no hay espacios o se pegan prefijos).
- `pipeline.mjs`, `extract-table-rows.mjs`, `filas-rubro.mjs` y `proponer-carga.mjs` ahora toman de ahí el vocabulario y la normalización. La
  LÓGICA de cada tool no cambió: solo de dónde salen las palabras (y `isTotal` / `SUBTOTAL_RE` ahora reconocen también el total al FINAL de la
  etiqueta, "Tržby celkem", "Indtægter i alt", "Receitas totais", que es vocabulario de esos idiomas).

## Bugs de vocabulario que había y que este cambio arregla (todos medidos)

| Bug | Efecto medido |
|---|---|
| `venta` como substring encontraba **"inventario"** / "inventar" (noruego, danés) | 91 tablas de notas de activo fijo e inventarios volvían relevante la tabla; sus filas iban a Jev como rubros |
| `oneri` dentro de "resultatdisp**oneri**ng" (danés/noruego), `costi` dentro de "**costi**tuito", `custo` dentro de "**custo**dia", `cost` dentro de "**cost**umers"/"re**charges**" | ~40 tablas más, mismas consecuencias |
| `tulos` (finés) dentro de "**títulos** a receber" (portugués) | 8 notas brasileñas contaban como estado de resultados en `proponer-carga` |
| `ertr` dentro de "V**ertr**ag" (contrato) | lado 'revenue' para cualquier título con "Vertrag" |
| La ı turca no se normalizaba: `hasilat`, `nakit akis` nunca encontraban "Hasılat", "nakit akış" | Beşiktaş 2009: 0 -> 93 rubros; Galatasaray / Fenerbahçe: el flujo de efectivo ya se excluye |
| NFD parte el Hangul: `손익계산서`, `수익`, `비용` nunca coincidían | Jeju SK 2023: 0 -> 34 rubros (estado de resultados real) |
| `umsatzerloese` no encontraba "Umsatzerlöse" (la ö normaliza a o) | `proponer-carga` no veía el total de ingresos alemán |
| Palabras checas con acento dentro de la regex (`výnos`, `náklad`, `έσοδ`) | entradas muertas (el texto se compara sin acentos) |
| La columna "Код рядка" / "Код строки" (código de fila de los formularios ucranianos y rusos: 2000, 2050...) se tomaba como la columna de IMPORTES | Veres, Karpaty, Polissya: los "importes" eran los códigos; ahora son los importes reales |
| RELEVANT_KEYWORDS no tenía "cuenta de pérdidas y ganancias", "importe neto de la cifra de negocios" relevante vía título, ni griego/turco de notas de ingresos | estados de resultados españoles enteros no entraban: Celta 2018-19 2 -> 42, Barcelona 2015-16 0 -> 49, 2017-18 0 -> 62, Getafe 2024-25 3 -> 55, Athletic 2022-23 37 -> 64 |
| Ligaduras de PDF ("De**ﬁ**cit") | "(Deﬁcit)/Superavit" de Estudiantes LP se mandaba a Jev como rubro |

## Método de medición (gratis, sin API)

Script en el scratchpad que **replica exactamente la etapa 3 de `pipeline.mjs`** (armado de `<md>.rubros.json`) sobre las tablas de
`extract-table-rows.mjs`, una vez con una copia de las tools de ANTES (Versión 313) y otra con las de DESPUÉS. Universo: los 1.061 `.md` de
`Clubes/` que tienen `.briefing.json` o que están `listo` / `listo-para-jev` / `sin-rubros` en `Admin/transcripciones-estado.jsonl`
(incluye ejercicios ya cargados, para poder comparar contra producción). Club y año salen del briefing / rubros.json existente (los mismos para
antes y después). Contra producción: una fila cuyo importe (x 1, x 10^-3 o x 10^-6) coincide con una línea cargada en `data/*-data.js` del mismo
club (año o año anterior, tolerancia 0,05%) hereda el lado de esa línea como verdad.

## Resultado por país

"Con estado de resultados" = el documento tiene al menos una tabla reconocida como estado de resultados (sin eso no salen rubros).
"listo-para-jev" = 5 o más rubros.

| País | docs | con estado de resultados (antes → después) | listo-para-jev ≥5 rubros | rubros | rubros con lado |
|---|---:|---:|---:|---:|---:|
| Brasil | 176 | 136 → 138 | 136 → 137 | 7097 → 7310 | 5116 (72%) → 5392 (74%) |
| Grecia | 137 | 107 → 107 | 90 → 90 | 3042 → 3416 | 2261 (74%) → 2921 (86%) |
| Bélgica | 120 | 46 → 46 | 31 → 31 | 947 → 935 | 458 (48%) → 587 (63%) |
| Argentina | 91 | 44 → 45 | 43 → 44 | 2932 → 2932 | 2659 (91%) → 2665 (91%) |
| Colombia | 89 | 33 → 33 | 32 → 32 | 2367 → 2252 | 2170 (92%) → 2064 (92%) |
| Alemania | 87 | 35 → 35 | 27 → 27 | 888 → 902 | 713 (80%) → 745 (83%) |
| España | 64 | 59 → 62 | 57 → 62 | 2971 → 3592 | 1796 (60%) → 2571 (72%) |
| Chile | 52 | 52 → 52 | 51 → 51 | 1830 → 1763 | 1454 (79%) → 1488 (84%) |
| Inglaterra | 41 | 31 → 31 | 28 → 28 | 493 → 487 | 374 (76%) → 452 (93%) |
| Dinamarca | 38 | 13 → 13 | 12 → 11 | 308 → 203 | 272 (88%) → 180 (89%) |
| Noruega | 28 | 28 → 28 | 28 → 28 | 1421 → 1300 | 1253 (88%) → 1107 (85%) |
| República Checa | 23 | 19 → 19 | 18 → 18 | 669 → 652 | 378 (57%) → 390 (60%) |
| Italia | 21 | 16 → 16 | 16 → 16 | 2527 → 2554 | 2115 (84%) → 2302 (90%) |
| Japón | 14 | 0 → 0 | 0 → 0 | 0 → 0 | - |
| Rusia | 14 | 8 → 8 | 8 → 8 | 446 → 420 | 280 (63%) → 244 (58%) |
| Croacia | 11 | 9 → 9 | 7 → 7 | 617 → 559 | 562 (91%) → 503 (90%) |
| Perú | 11 | 9 → 9 | 9 → 9 | 227 → 227 | 196 (86%) → 196 (86%) |
| Turquía | 8 | 6 → 7 | 6 → 7 | 482 → 555 | 367 (76%) → 468 (84%) |
| Ucrania | 8 | 4 → 4 | 4 → 4 | 169 → 128 | 83 (49%) → 85 (66%) |
| Países Bajos | 7 | 6 → 6 | 5 → 5 | 131 → 131 | 92 (70%) → 109 (83%) |
| Portugal | 7 | 7 → 7 | 6 → 7 | 271 → 311 | 189 (70%) → 242 (78%) |
| Corea del Sur | 4 | 0 → 1 | 0 → 1 | 0 → 34 | 0 → 9 |
| Estados Unidos | 3 | 3 → 3 | 3 → 3 | 33 → 33 | 33 (100%) → 33 (100%) |
| Austria | 2 | 0 → 1 | 0 → 1 | 0 → 18 | 0 → 14 (78%) |
| Francia | 2 | 1 → 1 | 1 → 1 | 77 → 104 | 21 (27%) → 72 (69%) |
| Suiza | 2 | 2 → 2 | 2 → 2 | 88 → 88 | 75 (85%) → 74 (84%) |
| México | 1 | 1 → 1 | 1 → 1 | 50 → 44 | 44 (88%) → 40 (91%) |
| **TOTAL** | **1061** | **675 → 684** | **621 → 631** | **30083 → 30949** | **22961 (76%) → 24953 (81%)** |

Filas: 1.052 salen, 1.913 entran (764 documentos iguales, 147 ganan, 150 pierden). Japón: los 14 documentos son informes agregados de la
J.League (no estados de un club), siguen sin rubros como antes. Las bajadas de "% con lado" en Rusia/Noruega son filas basura CON lado que
salieron (movimientos de activo fijo, resultados), no filas que perdieron el lado.

## Las guardas

**(a) Documentos que pierden rubros (150).** Toda fila que sale tiene explicación, clasificada una por una:

| Motivo | Filas |
|---|---:|
| La tabla ya no entra: dejó de ser "relevante" por un falso positivo de substring (`venta` en "inventario", `oneri`, `costi`, `custo`, `cost`: 131 tablas) | ~300 |
| La tabla ya no entra: es flujo de efectivo / cambios en el patrimonio / cuadro de movimientos que arranca en "saldo inicial" (griego "ταμειακές ροές", "μεταβολών ιδίων κεφαλαίων", turco "özkaynaklar değişim", checo "změnách vlastního kapitálu", "saldo inicial" de activo fijo en España/Colombia/Brasil) | ~450 |
| Resultado / margen (ahora reconocido en su idioma: "Výsledek hospodaření", "прибуток"/"збиток", "Net dönem karı", "Utilidad (Pérdida) neta", "Bénéfice (Perte)", "Perdita dell'esercizio", "(Deﬁcit)/Superavit") | 130 |
| Total al final de la etiqueta ("- Ukupno", "i alt", "Totais", "Ingresos Totales", "- всего") | 114 |
| Total al comienzo en idiomas nuevos ("Ukupni ...", "Toplam ...", "Разом", "Усього") | 43 |
| Misma fila, otra columna de importes (tablas de patrimonio griegas, activo fijo noruego/checo) | 18 |

Solo **5** de las filas que salen coincidían con una línea de producción, y las 5 son resultados que coinciden por casualidad con otra línea
("Utilidad (Pérdida) neta atribuible..." de Universidad Católica = "Gastos de torneos y otros"; "Operating (Loss)/profit" de Burnley). Del otro
lado, **57 filas nuevas coinciden con líneas de producción** (rubros reales que antes no llegaban: Osasuna "Aprovisionamientos", "Servicios
exteriores", "Tributos"...). Los documentos del piloto D: Polissya 56 -> 44, Karpaty 41 -> 30, Veres 42 -> 29, Galatasaray 2019 48 -> 33: todo
lo que sale son resultados ("прибуток", "збиток", "Інший сукупний дохід"), totales ("Разом") y el estado de cambios en el patrimonio;
Baník 1997 31 -> 31, Alverca 22 -> 22.

**(b) Ningún documento multiplica sus rubros por más de 2 sin revisar.** 17 lo hacen (o pasan de 0 a 5+), y los 17 se revisaron: todos son
estados de resultados o notas de apertura de ingresos que antes no se reconocían — Barcelona 2013-14 / 2014-15 / 2015-16 / 2017-18 / 2023-24,
Celta 2018-19, Getafe 2023-24 y 2024-25, Osasuna intermedios 2022 (la "Cuenta de pérdidas y ganancias" española), AEK 2018 y Panathinaikos 2023
(nota de ingresos: "Έσοδα από εισιτήρια", "Χορηγίες", "Δικαιώματα αναμετάδοσης"), Beşiktaş 2009, Avaí 2021, Rapid Wien 2023-24, Jeju SK 2023,
Tondela 2021, Argentinos Juniors 2018-19. Real Madrid (el caso de la Versión 312, 32 -> 253 con la regla descartada): 16 informes, variación de
-8 a +12 rubros por documento, sin explosión.
En el camino se encontraron y sacaron 5 falsos positivos que sí inflaban: "subvenciones" / "subsidiaries" / "sales" volvían relevantes notas de
balance (Atlético de Madrid 70 -> 128, Mercedes F1 45 -> 77) -> esas palabras solo dicen el lado de una FILA (`INGRESOS_FILA`); "imputación a
pérdidas y ganancias" en notas de impuestos españolas; "receitas e despesas financeiras" en un informe de gestión (Ceará 0 -> 52, basura);
"손익계산서에 인식된" (una mención en una oración coreana, FC Seoul 0 -> 75); `원가` dentro de "상각후원가" y `매출` dentro de "매출채권".

**(c) Documentos `sin-rubros` que pasan a tener rubros (11), revisados a mano los 11:** Argentinos Juniors presentación 2018-19 (recursos y
gastos por actividad), Rapid Wien 2023-24 (GuV), Avaí 2021 (DRE), Jeju SK 2023 (손익계산서: 매출액, 매출원가), Getafe 2024-25, Tondela 2021
(quotas, patrocínios), Beşiktaş 2009 (Gelir Tablosu: Satış Gelirleri, Satışların Maliyeti...), Celta 2018-19, Barcelona 2015-16, 2017-18 y
2023-24 (cuenta de pérdidas y ganancias). Los 11 son estados de resultados de verdad. Uno pasa al revés (Viborg 2023: 6 -> 1): lo que salió era
"Saldo pr.", "I alt", "Kostpris pr." (cuadro de activo fijo).

**Contra producción (lado).** Filas con verdad de producción y lado decidido: antes 2.082 con 102 contradictorias (**4,90%**), después
2.133 con 103 (**4,83%**): no sube. Contradicciones nuevas: 2, las dos coincidencias de importe sin palabras en común ("Cadeiras Cativas" =
"Energia elétrica", "Direitos federativos" = "Fretes e transportes"). En el camino se corrigieron tres fuentes de lado equivocado que el cambio
había destapado: "costo de ventas" / "custo das vendas" / "κόστος πωλήσεων" / "Satışların maliyeti" contaban como ingreso por la palabra
"ventas" (exclusión dentro del término); "Toplam Kapsamlı Gelir" / "Total comprehensive income" (ahora un total) le daba lado 'revenue' a todo
el estado de arriba (el resultado integral es un resultado, en `RESULTADO_INICIO`); "Cuotas entidades deportivas" (gasto) y "Operacionales de
venta" (gasto colombiano) quedaban como ingreso ("cuota" y "venta" solo dicen el lado de una TABLA, como antes). Cambios de lado en filas que
estaban antes y después: 1.089 sin lado -> gasto, 293 sin lado -> ingreso, 35 ingreso -> gasto (casi todos "Cost of sales", "Personnel
expenses" de Dortmund, "Kostprijs van de omzet": arreglos), 30 gasto -> ingreso (tablas de movimientos griegas "Πωλήσεις-διαγραφές", "Annen
finansinntekt": arreglos o basura), 69 + 96 con lado -> sin lado.

**`proponer-carga.mjs`** (sobre las tablas relevantes del mismo universo, sin llamar a Jev): título de estado 1.681 iguales, +71 nuevos
("Cuenta de pérdidas y ganancias", "Κατάσταση συνολικού εισοδήματος", "winst- en verliesrekening"), -8 (las notas brasileñas de "títulos");
total de ingresos 543 iguales, +235 ("Umsatzerlöse", "Ingresos de actividades ordinarias", "Κύκλος εργασιών", "Valore della produzione"), -1
("Omsætningsaktiver i alt" = activo corriente, estaba mal); resultado del ejercicio +121 ("Prejuízo do exercício", "Чистая прибыль (убыток)",
"Net dönem karı", "Nettoresultaat na belastingen"); total +642 ("Σύνολο", "Итого", "합계", "Summe").

## Regeneración real (paso 4)

`node tools/pipeline.mjs --ejecutar --solo-preparar --repreparar --sin-jev --limit 0` sobre todo el inventario (sin API).
713 documentos preparados: **404 `listo-para-jev`, 309 `sin-rubros`** (antes de la regeneración, en disco: 380 `listo-para-jev`), 19.252 rubros,
15.241 con lado (79%), 2.834 filas descartadas por no ser rubros. **Los 713 `.rubros.json` escritos tienen exactamente la misma cantidad de rubros
que la réplica del script de medición** (713 de 713): la tabla de arriba es lo que el pipeline hace de verdad. Como la lista de rubros cambió, las
huellas (`tools/huellas.mjs`) marcan como desactualizados los `.jev.json` / `.categorias.json` de esos documentos: la próxima etapa 5 los rehace
(eso sí gasta API: Jev + Claude, ~US$ 0,015-0,04 por documento).

## Lo que queda afuera (para una sesión próxima)

- `tools/chequeos-gratis.mjs` (no se editó, a pedido): sus `ACTIVO_RE` / `PASIVO_RE` pueden pasar a `TOTAL_ACTIVO_RE` / `TOTAL_PASIVO_RE` de
  `vocabulario.mjs`, que suman alemán "Summe der Aktiva", francés "Total de l'actif", italiano "Totale attivo", neerlandés "Balanstotaal",
  finés "Vastaavaa yhteensä", eslovaco "Spolu majetok", croata "Ukupna imovina", esloveno "Sredstva skupaj", húngaro "Eszközök összesen",
  rumano "Total active", búlgaro "Сума на актива", ucraniano "Усього активів", chino/japonés/coreano/árabe/hebreo. Ya recibe `normalizar()`
  (vía `norm` de `filas-rubro.mjs`), así que su "Σύνολο ενεργητικού" CON acento (que nunca coincidía) queda muerto igual que antes.
- Siguen sueltas en su tool, por ser más estructura que vocabulario: `RESULTADO_LARGO_RE`, `DEDUCCION_W` (filas-rubro), `NO_PL_RE`, `DAVON_RE`,
  `SUBTOTAL_RE` de resultados y la escala (`detectScale`) de `proponer-carga.mjs`.
- FC Seoul 2021: su estado de resultados no tiene título en la tabla y no se reconoce (0 rubros, igual que antes).
- Idiomas sin ningún documento en el corpus todavía (sueco, finés, eslovaco, polaco, serbio, esloveno, húngaro, rumano, búlgaro, árabe, hebreo):
  el vocabulario está, pero no pudo medirse. El primer piloto de cada uno debería mirar `node tools/vocabulario.mjs "<título real>"`.
