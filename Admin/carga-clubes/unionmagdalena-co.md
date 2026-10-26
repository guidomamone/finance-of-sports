# unionmagdalena-co — evidencia de carga

Lo que había como comentario en `data/co/unionmagdalena-co-data.js`, movido tal cual por `tools/archivo/mover-comentarios-data.mjs` (la regla:
`Admin/CONVENCIONES-DATOS.md`, "data/<país>/<club>-data.js NO LLEVA COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y
meta. Las notas de cada fila van en una tabla con su número de fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
============================================================================
data/co/unionmagdalena-co-data.js — Unión Magdalena S.A. (Santa Marta, Colombia).
Tercer club colombiano cargado en finance-of-sports (junto con Once Caldas y
Envigado). Ejercicio 2018 = REAL, único ejercicio cargado esta sesión: SIIS
tiene además un ejercicio 2021 sourceado (ver Admin/sourcing/Colombia/Union
Magdalena.md) pero SIN transcribir/cargar todavía — queda pendiente para
una sesión futura. Los cortes 2016/2017/2019/2020 están verificados como
vacíos en SIIS (la sociedad no adjuntó el paquete esos años), no son huecos
de búsqueda.

FUENTE: `Clubes/Colombia/Union Magdalena/estados-financieros-2018.md`
(transcripción completa de `estados-financieros-2018.pdf`, 44 páginas,
"Estados Financieros... Al 31 de Diciembre de 2018 y Diciembre 31 2017",
NIT 891.700.992-8). A DIFERENCIA de Once Caldas (que solo trae notas) e
IGUAL que Envigado, este PDF tiene texto nativo (`pdftotext -layout`, sin
necesidad de OCR) y SÍ incluye el Estado de Situación Financiera y el
Estado de Resultado Integral PRIMARIOS completos (págs. 3-4), no solo
notas — permitió una reconciliación EXACTA, sin ningún residuo/plug.
También se transcribió `certificacion-ef-2018.md` (documento corto, PDF
escaneado, OCR): certifica que los estados fueron tomados fielmente de los
libros bajo NIIF-PYMES, y nombra al Presidente (Luis Eduardo Méndez
Bustos), el Contador (Luis Manuel Molina Ibáñez) y el Revisor Fiscal
(Robinsson Álvarez Giraldo) — no trae ningún total, así que no aporta un
cruce numérico independiente, solo identidad de firmantes.

Cifras del documento "Expresado en miles de pesos Colombianos" (MILES, no
pesos completos) — confirmado por el propio encabezado de las tablas
primarias (pág. 3-4) y de cada nota. OJO: esto es DISTINTO de Envigado
(pesos completos, ÷1.000.000) e IGUAL que Once Caldas (miles, ÷1.000). Acá
se guardan divididas por 1.000, en MILLONES de pesos colombianos (COP).

ESTADO DE RESULTADO INTEGRAL PRIMARIO (pág. 4 del PDF, en miles de pesos
colombianos, cifras 2018 — convertidas acá a millones ÷1.000):
  Ingresos de Actividades Ordinarias ............  7.049,990
  (+) Otros Ingresos .............................    113,286
  (-) Gastos Operacionales ....................... (5.400,542)
  (-) Gastos Administrativos y Otros Gastos ...... (1.069,690)
  (=) Ganancias por actividades operación ........    693,044
  (+) Ingresos Financieros .......................     66,916
  (-) Gastos Financieros .......................... (126,104)
  (=) Ganancia antes de impuestos .................    633,856
  (-) Impuesto a las Ganancias .................... (348,114)
  (=) Utilidad del Ejercicio / Resultado Integral Total   285,742
Cada línea de arriba reconcilia EXACTA con la anterior, y cada nota (24-29)
reconcilia EXACTA contra el total que imprime el Estado de Resultado
Integral primario (verificado sumando cada nota a mano antes de cargar) —
la carga de mayor confianza de las 3 cargadas hasta ahora en Colombia, sin
ningún residuo/plug como sí hizo falta en Once Caldas.

REVENUE: Nota 24 "Ingresos de Actividades Ordinarias" (8 líneas, suma
EXACTA a $7.049,990 M, el total impreso) + Nota 25 "Otros ingresos" (3
líneas — Recuperaciones, Descuento comercial, Diversos —, $113,286 M
impreso) — se suman ambas al campo `revenue` del sitio, mismo criterio que
Envigado/Once Caldas. officialTotalRevenue = 7.049,990 + 113,286 =
7.163,276 M.

"Amortización de Ingreso Dimayor" (Nota 24, $239,521 M): categorizada como
`broadcasting` junto con "Participación Dimayor" — el documento no explica
más el concepto (no hay una nota aparte), pero el nombre liga claramente a
un ingreso de Dimayor (que es la fuente de TV/torneo del fútbol
colombiano), probablemente el reconocimiento diferido de un contrato
plurianual. Es la única categorización de esta carga con margen de duda
genuina — reportado en la sesión, no autoasumido con certeza total.

"Otros ingresos de partido" (Nota 24, $66,190 M): categorizada como
`matchday_competition` (junto con Taquilla) porque el propio rótulo dice
"de partido" — no es un alquiler o uso del estadio fuera del partido
(`stadium_other`), es ingreso asociado al día de juego.

EXPENSES: Nota 26 "Gastos Operacionales" ("todas transacciones de la parte
deportiva tales como nóminas, gastos partido de local, gastos de partido
de visitante") y Nota 27 "Gastos Administrativos y Otros Gastos" — ambas
son bolsones con sub-categoría real distinta entre sí (ver club-data-mapping
SKILL.md sección 1), promovidas a líneas de primer nivel por categoría,
mismo tratamiento que Envigado. Dentro de Nota 26: Arriendos/Servicios/
Mantenimiento/Gastos de viaje/Diversos-logística van a
`match_organisation_expense` (organización del partido), Impuestos/
Contribuciones y afiliaciones/Gastos legales van a `admin_general_expense`
(mismo split que usa Envigado en su "Administración del plantel"),
"Amortizaciones Derechos Deportivos" (costo de transferencia de
jugadores, no depreciación genérica) va a `player_amortisation`, y "Costo
de Venta Mercancía no Fabricada" va a `other_expenses`. Dentro de Nota 27:
el propio título del documento ya separa "Administrativos" de "Otros
Gastos" — Personal/Honorarios/Impuestos/Arrendamientos/Contribuciones/
Seguros/Servicios/Legales/Mantenimiento/Adecuaciones/Viajes van a
`admin_general_expense`; "Depreciaciones y Amortizaciones" (línea
combinada, sin desglosar depreciación de PP&E vs. amortización de
intangibles en esta nota) va a `depreciation` (el movimiento de
Depreciación de PP&E en el Estado de Situación Financiera, -80.500,
confirma que la mayor parte es depreciación); Diversos/Provisiones/Gastos
Bancarios/Gastos Extraordinarios/Gastos Diversos van a `other_expenses`
(el catch-all real del documento).

netInterest = Nota 28: Ingresos por Intereses (66,916) - Gastos por
Intereses (126,104) = -59,188 M, EXACTO igual al "Total Ingresos Y Gastos
Financieros" impreso.

tax = Nota 29: Impuesto Corriente Renta 33% (330,089) + Gasto por Impuesto
Diferido (18,025) = -348,114 M, EXACTO igual al "Total Impuestos a la
Ganancias" impreso.

grossDebt = Obligaciones Financieras corrientes (Nota 10, $419,425 M) +
Obligaciones Financieras a L.P. (Nota 16, $638,889 M) = 1.058,314 M —
mismo criterio que Envigado/Boca/Vélez (línea angosta de deuda financiera,
el balance separa "Obligaciones Financieras" de Cuentas por Pagar/
Impuestos por Pagar/Beneficios a Empleados/Otros Pasivos). cash = Efectivo
y equivalente al efectivo (pág. 3) = 1.494,693 M.
============================================================================
```

_de data/club-leagues/co.js:_

```text
Verificado el 2026-09-24 (onboarding, Versión 217) contra "2018 Categoría Primera B season"
(Wikipedia): subcampeón del Torneo Águila 2018, ascendido a Primera A para 2019.
```

## 2025

### Ingresos

```text
2025: cargado por tools/cargar.mjs (2026-10-20) desde Clubes/Colombia/Union Magdalena/estados-financieros-2025.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Colombia/Union Magdalena/estados-financieros-2025.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Taquilla - Venta de Boletería | pág. 46, precedente |
| 2 | Publicidad y Propaganda | pág. 46, precedente |
| 3 | Participación Dimayor tv | pág. 46, Jev 1 |
| 4 | Auxilios Dimayor | pág. 46, Jev 1 |
| 5 | Participación federación colombiana de futbol | pág. 46, precedente |
| 6 | Venta de Artículos Deportivos | pág. 46, precedente |
| 7 | Otros ingresos de partido | pág. 46, precedente |
| 8 | Devoluciones en Servicios | pág. 46, Jev 1 |
| 9 | Recuperaciones | pág. 47, Jev 1 |
| 10 | Otros Arriendos | pág. 47, Claude 0.88 |
| 11 | Diversos | pág. 47, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Gastos del Personal | pág. 48, Claude 0.85 |
| 2 | Impuestos | pág. 48, Jev 1 |
| 3 | Arriendos | pág. 48, precedente |
| 4 | Contribuciones y Afiliaciones | pág. 48, Jev 0.99 |
| 5 | Servicios | pág. 48, Jev 0.98 |
| 6 | Gastos Legales | pág. 48, Jev 1 |
| 7 | Gastos de Viaje | pág. 48, Jev 1 |
| 8 | Elemento de Aseo y Cafetería | pág. 48, Jev 0.97 |
| 9 | Logística y Gastos de Partidos | pág. 48, Jev 1 |
| 10 | Gastos de Pretemporada | pág. 48, precedente |
| 11 | Gastos de Entrenamientos | pág. 48, precedente |
| 12 | Derechos Deportivos | pág. 48, Jev 0.98 |
| 13 | Costos de Venta | pág. 4, Jev 0.99 |
| 14 | Gasto de Personal | pág. 49, Claude 0.88 |
| 15 | Honorarios | pág. 49, Jev 1 |
| 16 | Impuestos | pág. 49, Jev 1 |
| 17 | Arrendamientos | pág. 49, Jev 1 |
| 18 | Seguros | pág. 49, Claude 0.88 |
| 19 | Servicios | pág. 49, Jev 0.98 |
| 20 | Gastos Legales | pág. 49, Jev 1 |
| 21 | Mantenimiento y Reparaciones | pág. 49, Jev 0.98 |
| 22 | Gastos de Viaje | pág. 49, Jev 1 |
| 23 | Depreciación | pág. 49, Jev 1 |
| 24 | Amortizaciones | pág. 49, Jev 0.96 |
| 25 | Diversos | pág. 49, Jev 0.97 |
| 26 | Provisiones | pág. 49, precedente |
| 27 | Gastos Bancarios | pág. 49, precedente |
| 28 | Gastos Comisiones banc | pág. 49, Jev 1 |
| 29 | Gastos Extraordinarios | pág. 49, Jev 1 |
| 30 | Gastos Diversos | pág. 49, Jev 0.99 |

### Meta

```text
tools/cargar.mjs (2026-10-20). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
tools/cargar.mjs (2026-10-20): co-primeraA, verificado contra roster cacheado de "2025 Liga DIMAYOR" (tools/club-league-reference/co.json), coincidencia exacta "Unión Magdalena".
```

## 2024

### Ingresos

```text
2024: cargado por tools/cargar.mjs (2026-10-26) desde Clubes/Colombia/Union Magdalena/siis-estado-2024.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Colombia/Union Magdalena/siis-estado-2024.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Ingresos de actividades ordinarias | pág. 1, Jev 0.97 |
| 2 | Otros ingresos | pág. 1, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Costo de ventas | pág. 1, Claude 0.88 |
| 2 | Gastos de ventas | pág. 1, precedente |
| 3 | Gastos de administración | pág. 1, Jev 1 |

### Meta

```text
2024: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-26): filas-a-mano. Claude 2026-10-26 (tokens de sesión): ubicación y filas armadas a mano desde el .md con tools/armar-a-mano.mjs
tools/cargar.mjs (2026-10-26). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"), con su tipo; la página marca «s/d» en las categorías que esa línea esconde y explica el caso en «Notas sobre este club».
```

```text
tools/dentro-de-otro.mjs (2026-10-26): posiblemente dentro de otro rubro, por precedente del club (la fila tiene plata en sus balances desglosados 2018, 2025)
```

## 2023

### Ingresos

```text
2023: cargado por tools/cargar.mjs (2026-10-26) desde Clubes/Colombia/Union Magdalena/siis-estado-2023.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Colombia/Union Magdalena/siis-estado-2023.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Ingresos de actividades ordinarias | pág. 1, Jev 0.97 |
| 2 | Otros ingresos | pág. 1, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Costo de ventas | pág. 1, Claude 0.88 |
| 2 | Gastos de ventas | pág. 1, precedente |
| 3 | Gastos de administración | pág. 1, Jev 1 |

### Meta

```text
2023: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-26): filas-a-mano. Claude 2026-10-26 (tokens de sesión): ubicación y filas armadas a mano desde el .md con tools/armar-a-mano.mjs
tools/cargar.mjs (2026-10-26). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"), con su tipo; la página marca «s/d» en las categorías que esa línea esconde y explica el caso en «Notas sobre este club».
```

```text
tools/dentro-de-otro.mjs (2026-10-26): posiblemente dentro de otro rubro, por precedente del club (la fila tiene plata en sus balances desglosados 2018, 2025)
```

## 2022

### Ingresos

```text
2022: cargado por tools/cargar.mjs (2026-10-26) desde Clubes/Colombia/Union Magdalena/siis-estado-2022.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Colombia/Union Magdalena/siis-estado-2022.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Ingresos de actividades ordinarias | pág. 1, Jev 0.97 |
| 2 | Otros ingresos | pág. 1, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Costo de ventas | pág. 1, Claude 0.88 |
| 2 | Gastos de ventas | pág. 1, precedente |
| 3 | Gastos de administración | pág. 1, Jev 1 |

### Meta

```text
2022: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-26): filas-a-mano. Claude 2026-10-26 (tokens de sesión): ubicación y filas armadas a mano desde el .md con tools/armar-a-mano.mjs
tools/cargar.mjs (2026-10-26). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"), con su tipo; la página marca «s/d» en las categorías que esa línea esconde y explica el caso en «Notas sobre este club».
```

```text
tools/dentro-de-otro.mjs (2026-10-26): posiblemente dentro de otro rubro, por precedente del club (la fila tiene plata en sus balances desglosados 2018, 2025)
```

## 2021

### Ingresos

```text
2021: cargado por tools/cargar.mjs (2026-10-26) desde Clubes/Colombia/Union Magdalena/siis-estado-2021.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Colombia/Union Magdalena/siis-estado-2021.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Ingresos de actividades ordinarias | pág. 1, Jev 0.97 |
| 2 | Otros ingresos | pág. 1, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Gastos de ventas | pág. 1, precedente |
| 2 | Gastos de administración | pág. 1, Jev 1 |

### Meta

```text
2021: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-26): filas-a-mano. Claude 2026-10-26 (tokens de sesión): ubicación y filas armadas a mano desde el .md con tools/armar-a-mano.mjs
tools/cargar.mjs (2026-10-26). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"), con su tipo; la página marca «s/d» en las categorías que esa línea esconde y explica el caso en «Notas sobre este club».
```

```text
tools/dentro-de-otro.mjs (2026-10-26): posiblemente dentro de otro rubro, por precedente del club (la fila tiene plata en sus balances desglosados 2018, 2025)
```

## 2020

### Ingresos

```text
2020: cargado por tools/cargar.mjs (2026-10-26) desde Clubes/Colombia/Union Magdalena/siis-estado-2020.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Colombia/Union Magdalena/siis-estado-2020.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Ingresos de actividades ordinarias | pág. 1, Jev 0.97 |
| 2 | Otros ingresos | pág. 1, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Gastos de ventas | pág. 1, precedente |
| 2 | Gastos de administración | pág. 1, Jev 1 |

### Meta

```text
2020: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-26): filas-a-mano. Claude 2026-10-26 (tokens de sesión): ubicación y filas armadas a mano desde el .md con tools/armar-a-mano.mjs
tools/cargar.mjs (2026-10-26). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"), con su tipo; la página marca «s/d» en las categorías que esa línea esconde y explica el caso en «Notas sobre este club».
```

```text
tools/dentro-de-otro.mjs (2026-10-26): posiblemente dentro de otro rubro, por precedente del club (la fila tiene plata en sus balances desglosados 2018, 2025)
```

## 2019

### Ingresos

```text
2019: cargado por tools/cargar.mjs (2026-10-26) desde Clubes/Colombia/Union Magdalena/siis-estado-2019.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Colombia/Union Magdalena/siis-estado-2019.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Ingresos de actividades ordinarias | pág. 1, Jev 0.97 |
| 2 | Otros ingresos | pág. 1, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Gastos de ventas | pág. 1, precedente |
| 2 | Gastos de administración | pág. 1, Jev 1 |

### Meta

```text
2019: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-26): filas-a-mano. Claude 2026-10-26 (tokens de sesión): ubicación y filas armadas a mano desde el .md con tools/armar-a-mano.mjs
tools/cargar.mjs (2026-10-26). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"), con su tipo; la página marca «s/d» en las categorías que esa línea esconde y explica el caso en «Notas sobre este club».
```

```text
tools/dentro-de-otro.mjs (2026-10-26): posiblemente dentro de otro rubro, por precedente del club (la fila tiene plata en sus balances desglosados 2018, 2025)
```

## 2018

### Gastos

_antes de la fila 1 (`Gastos Operacionales: Gastos del Personal (plantel)`):_

```text
Nota 26 "Gastos Operacionales" ($5.400,542 M impreso), promovida por sub-categoría real (ver
comentario de cabecera):
```

_antes de la fila 6 (`Gastos Administrativos (personal, honorarios, impuestos, arrendamientos, contribuciones, seguros, servicios, legales, mantenimiento, adecuaciones, viajes)`):_

```text
Nota 27 "Gastos Administrativos y Otros Gastos" ($1.069,690 M impreso), separada según el
propio título del documento (ver comentario de cabecera):
```

### Meta

```text
El documento NO declara su propio tipo de cambio (no tiene un Anexo de "activos y pasivos en
moneda extranjera"; todas las partidas son en COP). Se usa la TRM oficial de cierre
(Superintendencia Financiera de Colombia / Banco de la República) al 31/12/2018: $3.249,75
COP/USD. Esta entrada TODAVÍA NO EXISTE en data/currency-map.js (COP@2018-12-31) al momento
de cargar este archivo — reportada a la sesión orquestadora para que la agregue una sola vez
en FX_CLOSE, no acá (ver Admin/CLAUDE.md / club-data-mapping/referencia/fx.md).
Nota 28: Ingresos por Intereses (66,916) - Gastos por Intereses (126,104), EXACTO igual al
"Total Ingresos Y Gastos Financieros" impreso.
Nota 29: Impuesto Corriente Renta 33% (330,089) + Gasto por Impuesto Diferido (18,025),
EXACTO igual al "Total Impuestos a la Ganancias" impreso.
grossDebt = Obligaciones Financieras corrientes (Nota 10, 419,425) + no corrientes (Nota 16,
638,889). cash = Efectivo y equivalente al efectivo (pág. 3).
```

## Gestiones

_antes de Luis Eduardo Méndez Bustos (data/gestiones/co.js):_

```text
Méndez Bustos: presidente en enero de 2018 (convenio por el estadio Sierra Nevada) y todavía en junio de 2019 (El Heraldo); asumió la presidencia de Santa Fe el 1/8/2019. Se desconoce cuándo llegó a Unión Magdalena: desde aproximado (primera fecha documentada), sin confirmar.
```

## 2017

### Ingresos

```text
2017: cargado por tools/cargar.mjs (2026-10-26) desde Clubes/Colombia/Union Magdalena/siis-estado-2017.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Colombia/Union Magdalena/siis-estado-2017.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Ingresos de actividades ordinarias | pág. 1, Jev 0.97 |
| 2 | Otros ingresos | pág. 1, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Gastos de ventas | pág. 1, precedente |
| 2 | Gastos de administración | pág. 1, Jev 1 |

### Meta

```text
2017: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-26): filas-a-mano. Claude 2026-10-26 (tokens de sesión): ubicación y filas armadas a mano desde el .md con tools/armar-a-mano.mjs
tools/cargar.mjs (2026-10-26). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"), con su tipo; la página marca «s/d» en las categorías que esa línea esconde y explica el caso en «Notas sobre este club».
```

```text
tools/dentro-de-otro.mjs (2026-10-26): posiblemente dentro de otro rubro, por precedente del club (la fila tiene plata en sus balances desglosados 2018, 2025)
```

## 2016

### Ingresos

```text
2016: cargado por tools/cargar.mjs (2026-10-26) desde Clubes/Colombia/Union Magdalena/siis-estado-2016.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Colombia/Union Magdalena/siis-estado-2016.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Ingresos de actividades ordinarias | pág. 1, Jev 0.97 |
| 2 | Otros ingresos | pág. 1, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Gastos de ventas | pág. 1, precedente |
| 2 | Gastos de administración | pág. 1, Jev 1 |
| 3 | Otros gastos | pág. 1, precedente |

### Meta

```text
2016: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-26): filas-a-mano. Claude 2026-10-26 (tokens de sesión): ubicación y filas armadas a mano desde el .md con tools/armar-a-mano.mjs
tools/cargar.mjs (2026-10-26). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"), con su tipo; la página marca «s/d» en las categorías que esa línea esconde y explica el caso en «Notas sobre este club».
```

```text
tools/dentro-de-otro.mjs (2026-10-26): posiblemente dentro de otro rubro, por precedente del club (la fila tiene plata en sus balances desglosados 2018, 2025)
```

## Fuentes

### unionmagdalena-co-estados-financieros-2018

_note (data/):_

```text
Descargado vía SIIS (siis.ia.supersociedades.gov.co, NIT 891700992, punto de entrada "Pymes-Individuales"). PDF con texto nativo (pdftotext -layout), incluye el Estado de Situación Financiera y el Estado de Resultado Integral primarios completos, no solo notas — cada nota (24-29) reconcilia exacta contra el total impreso, sin ningún residuo. Se complementa con certificacion-ef-2018.md (PDF escaneado, OCR), que certifica la elaboración bajo NIIF-PYMES y nombra a los firmantes, sin aportar un total propio. SIIS tiene además un ejercicio 2021 sourceado para este club (dictamen del revisor fiscal) pero todavía NO transcripto ni cargado — queda pendiente para una sesión futura. Los cortes 2016/2017/2019/2020 están verificados como vacíos en SIIS (formulario presentado sin paquete de estados financieros adjunto). Transcripciones completas en Clubes/Colombia/Union Magdalena/estados-financieros-2018.md y certificacion-ef-2018.md.
```

### unionmagdalena-co-estados-financieros-2025

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-20) desde la transcripción Clubes/Colombia/Union Magdalena/estados-financieros-2025.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### unionmagdalena-co-siis-estado-2016

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-26) desde la transcripción Clubes/Colombia/Union Magdalena/siis-estado-2016.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### unionmagdalena-co-siis-estado-2017

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-26) desde la transcripción Clubes/Colombia/Union Magdalena/siis-estado-2017.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### unionmagdalena-co-siis-estado-2019

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-26) desde la transcripción Clubes/Colombia/Union Magdalena/siis-estado-2019.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### unionmagdalena-co-siis-estado-2020

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-26) desde la transcripción Clubes/Colombia/Union Magdalena/siis-estado-2020.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### unionmagdalena-co-siis-estado-2021

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-26) desde la transcripción Clubes/Colombia/Union Magdalena/siis-estado-2021.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### unionmagdalena-co-siis-estado-2022

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-26) desde la transcripción Clubes/Colombia/Union Magdalena/siis-estado-2022.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### unionmagdalena-co-siis-estado-2023

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-26) desde la transcripción Clubes/Colombia/Union Magdalena/siis-estado-2023.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### unionmagdalena-co-siis-estado-2024

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-26) desde la transcripción Clubes/Colombia/Union Magdalena/siis-estado-2024.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

## Otros

### unionmagdalenaCoPasesData

```text
Mercado de pases / resultados deportivos / títulos: sin datos reales cargados todavía para este
club (fuera de alcance de esta sesión, que se enfocó en Finanzas del ejercicio 2018). Arrays
vacíos en vez de placeholders inventados.
```

### gestionesByClub['unionmagdalena-co']

```text
gestionesByClub: no se pudo confirmar con confianza la atribución de gestión para el ejercicio
2018 — la certificación (certificacion-ef-2018.md) nombra a Luis Eduardo Méndez Bustos como
"Presidente" firmante, pero no hay forma de confirmar que ejerció la presidencia durante TODO el
ejercicio 2018 (la certificación pudo firmarse bien entrado 2019). Mismo criterio que
club-data-mapping SKILL.md sección 7 ("mejor un año sin gestión asignada que una gestión
inventada"): entrada genérica "Sin confirmar" en vez de atribuirle el nombre sin certeza.
```
