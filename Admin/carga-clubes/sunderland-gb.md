# sunderland-gb — evidencia de carga

Lo que había como comentario en `data/gb/sunderland-gb-data.js`, movido tal cual por `tools/archivo/mover-comentarios-data.mjs` (la regla:
`Admin/CONVENCIONES-DATOS.md`, "data/<país>/<club>-data.js NO LLEVA COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y
meta. Las notas de cada fila van en una tabla con su número de fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
============================================================================
data/gb/sunderland-gb-data.js — Sunderland Association Football Club, Limited (The) (clubId
'sunderland-gb'), Ejercicios 2023/24 y 2024/25 (1° de agosto a 31 de julio, confirmado en la
carátula de los dos documentos: "FOR THE YEAR ENDED 31 JULY 2024"/"...2025").

OJO LIGA (pedido explícito de la tarea, verificado contra Wikipedia "2023–24 EFL Championship" y
"2024–25 EFL Championship"): Sunderland ascendió a la Premier League recién para la temporada
2025/26 (vía el playoff de final de la temporada 2024/25, jugado en mayo de 2025 — POSTERIOR al
cierre de este ejercicio, 31/7/2025 incluye toda la temporada 2024/25 que se jugó en el
Championship). Los 2 ejercicios cargados acá (2024 y 2025) son 100% Championship, NO Premier
League — confirmado también por el propio Strategic Report de cada documento ("enjoyed its second
season back in the EFL Championship" para 2023/24; "A successful 2024/25 season culminated in the
return of Sunderland AFC to the Premier League, via the Championship [playoff]" para 2024/25, que
dice explícitamente que la vuelta a la Premier League fue el RESULTADO del ejercicio, jugado
enteramente en el Championship). Ver data/club-leagues/gb.js: se agregó 'gb-championship' al
catálogo (data/leagues.js) porque no existía ninguna liga inglesa de 2ª división cargada todavía.

ENTIDAD LEGAL: "Sunderland Association Football Club, Limited (The)", Company Registration No.
00049116 (Companies House, UK). Cuentas INDIVIDUALES (la compañía está exenta de preparar
consolidadas bajo Section 400 del Companies Act 2006; sus subsidiarias —1879 Events Management
Limited, Sunderland AFC Women Limited— se consolidan en las cuentas de la matriz, Sunderland
Limited, no cargadas acá).

Fuente: transcripciones completas en Clubes/Inglaterra/Sunderland/sunderland-full-accounts-
2023-24.md y -2024-25.md.

Cifras en GBP MILLONES nativos (documento en £'000, dividido por 1.000 al cargar). Los 2
ejercicios usan `fxRef` ('GBP@2024-07-31'/'GBP@2025-07-31', agregadas a FX_CLOSE en esta sesión —
ninguna de las 2 fechas de cierre, 31 de julio, coincidía con las que ya tenía el sitio de otros
clubes ingleses, todos con cierre 31/5 o 30/6) porque ninguno de los 2 documentos declara un tipo
de cambio propio a USD.

----------------------------------------------------------------------------------------------
GOTCHA DE LECTURA (Ejercicio 2025): el Income Statement transcripto perdió la fila "Other
operating income" en la columna 2025 (queda en blanco/nil, a diferencia de 2024 que sí tenía
£25k) — la secuencia de números post-OCR/extracción parecía no calzar con las filas hasta
reconciliar contra Nota 5 ("Other operating income": 2025 = £nil, confirmado) y Nota 6
(Amortisation 10.409, Profit on disposal 45.843, EXACTOS contra la reconstrucción). Ver sección 11
de club-data-mapping/SKILL.md: se resolvió reconciliando cada subtotal impreso (Operating loss,
Loss before tax) antes de asignar cada número a su fila, no adivinando por posición en la lista.

CATEGORIZACIÓN DE INGRESOS (Nota 3 "Turnover by class of business", 6 líneas los 2 ejercicios, +
"Other operating income" y "Profit on disposal of player contracts" como líneas separadas del
cuerpo del Income Statement):
  - "Gate receipts" -> matchday_competition.
  - "Television and media"/"TV, Media and FL distribution" -> broadcasting.
  - "Sponsorship and royalties" -> sponsorship_commercial.
  - "Conference and banqueting" -> other_income: mismo criterio que "Other commercial activities"
    de Everton (definida por su propio documento como "hospitality, catering, events"), acá
    "Conference and banqueting" es hospitalidad/eventos, no sponsorship — se sigue el precedente
    de Everton en vez de tratarlo como comercial.
  - "Retail and merchandising" -> sponsorship_commercial (mismo criterio que "Merchandising" de
    Everton/Forest).
  - "Other" -> other_income (catch-all genérico, sin más desglose en el documento).
  - "Other operating income" (línea aparte del Income Statement, £25k en 2024 —rebate de tasas
    municipales del Stadium of Light—, £nil en 2025) -> other_income.
  - "Profit on disposal of player contracts": línea NETA separada, debajo de "Amortisation of
    players contracts" en el Income Statement -> revenueLine con player_sales, mismo criterio que
    Forest/Everton/Arsenal (meta.profitOnPlayerSales queda en 0 para no duplicar).

CATEGORIZACIÓN DE GASTOS: igual que Forest, el Income Statement no desglosa "Cost of sales"/
"Operating expenses" por naturaleza más allá de lo que la Nota 4 (Employees, Staff costs
agregados, sin desglose plantel/resto) y la Nota 5 ("Operating loss is stated after
charging/(crediting)": Depreciation, Players contracts amortisation) revelan. "Amortisation of
players contracts" SÍ es una línea propia del Income Statement (no embebida en Operating
expenses), a diferencia de Depreciation, que queda embebida y se extrae vía la Nota 5.
  - "Staff costs" (Nota 4: Wages and salaries + Social security + Other pension costs) ->
    wages_squad (agregado único, mismo gotcha que Forest/Everton/Arsenal: no separa plantel del
    resto del personal).
  - "Amortisation of players contracts" -> player_amortisation.
  - "Depreciation - owned assets" (Nota 5, embebida en Cost of sales/Operating expenses) ->
    depreciation.
  - Residual (Cost of sales + Operating expenses − Staff costs − Depreciation) -> other_expenses.

"netInterest" = Interest receivable (Nota 7) − Interest payable (Nota 7). "tax" = 0 los 2 años. //
"assetSales"/"profitOnPlayerSales" = 0 (ya en revenueLines).

GROSSDEBT: se excluyeron "Amounts owed to ultimate parent company"/"Amounts owed to group
undertakings" (financiamiento intra-grupo/accionista, con intención declarada de convertirse a
patrimonio) y "Trade creditors"/"Accruals and deferred income" relacionados a compra de pases
(deuda comercial, no financiera) — mismo criterio que Forest. Solo se cargó deuda bancaria/de
entidades financieras real:
  2024: "Bank Overdraft" (Nota 14, dentro de 1 año) = 8.289. Sin deuda no corriente de este tipo.
  2025: "Loan Facility" (Nota 14, dentro de 1 año, nueva línea que reemplaza el overdraft de 2024)
    = 25.217. Sin deuda no corriente de este tipo (la Nota 15 no corriente son £101.641M de
    "Trade creditors"/"Accruals" ligados a compra de pases, deuda comercial, no financiera).
cash = "Cash at bank" del balance (£0 en 2024 —toda la caja está barrida hacia el overdraft—,
20.711 en 2025).

VERIFICACIÓN (a mano, contra los totales impresos):
  2024: revenueLines suman 46.295 = officialTotalRevenue (Turnover 37.452 + Other operating
    income 0.025 + Profit on disposal 8.818). expenses(wages+other_expenses) +
    nonCash(amortisation+depreciation) = -49.884 + (-4.899) = -54.783 = officialTotalExpenses
    EXACTO (Cost of sales 3.300 + Operating expenses 47.500 + Amortisation 3.983 impreso). +
    netInterest (-0.583) = -9.071 = officialPAT EXACTO ("LOSS FOR THE FINANCIAL YEAR" impreso).
  2025: revenueLines suman 85.265 = officialTotalRevenue (Turnover 39.422 + Other operating
    income 0 + Profit on disposal 45.843). expenses+nonCash = -73.872 + (-11.724) = -85.596 =
    officialTotalExpenses EXACTO (Cost of sales 1.454 + Operating expenses 73.733 + Amortisation
    10.409 impreso). + netInterest (-2.948) = -3.279 = officialPAT EXACTO ("LOSS FOR THE FINANCIAL
    YEAR" impreso).
Los dos cierran EXACTOS, sin residuo.
============================================================================
```

## 2025

### Meta

```text
grossDebt = "Loan Facility" (Nota 14, dentro de 1 año). cash = "Cash at bank" (balance).
```

## 2024

### Meta

```text
grossDebt = Bank Overdraft (Nota 14). cash = "Cash at bank" (balance: Current assets =
Stocks 0.100 + Debtors 11.791 + Cash = 11.891 impreso -> Cash = 0).
```

## 2023

### Ingresos

```text
2023: cargado por tools/cargar.mjs (2026-10-22) desde Clubes/Inglaterra/Sunderland/sunderland-full-accounts-2022-23.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Inglaterra/Sunderland/sunderland-full-accounts-2022-23.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Gate receipts | pág. 23, precedente |
| 2 | Television and media | pág. 23, precedente |
| 3 | Sponsorship and royalties | pág. 23, precedente |
| 4 | Conference and banqueting | pág. 23, precedente |
| 5 | Retail and merchandising | pág. 23, precedente |
| 6 | Other | pág. 23, precedente |
| 7 | Other operating income | pág. 14, precedente |
| 8 | Other operating income | pág. 14, precedente |
| 9 | Profit on disposal of player contracts | pág. 14, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Cost of sales | pág. 14, Claude 0.8 |
| 2 | Operating expenses | pág. 14, Claude 0.8 |
| 3 | Amortisation of players contracts | pág. 14, precedente |

### Meta

```text
2023: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, caja-deuda --personal 2026-10-22): incluye = wages_squad. caja-deuda.mjs --personal --partir (TODO 351): el costo de personal (25.296, sunderland-full-accounts-2022-23.md L934) es mayor que cada fila global de gasto; el documento reparte los sueldos entre varias funciones y no dice cuánto va en cada una
tools/cargar.mjs (2026-10-22). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
incluidoEn: ajuste manual `incluye`: el documento junta estas categorías con otra línea.
```

## 2022

### Ingresos

```text
2022: cargado por tools/cargar.mjs (2026-10-22) desde Clubes/Inglaterra/Sunderland/sunderland-full-accounts-2021-22.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Inglaterra/Sunderland/sunderland-full-accounts-2021-22.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Gate receipts | pág. 24, precedente |
| 2 | Television and media | pág. 24, precedente |
| 3 | Sponsorship and royalties | pág. 24, precedente |
| 4 | Conference and banqueting | pág. 24, precedente |
| 5 | Retail and merchandising | pág. 24, precedente |
| 6 | Other | pág. 24, precedente |
| 7 | Other operating income | pág. 15, precedente |
| 8 | Profit on disposal of player contracts | pág. 15, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Cost of sales | pág. 15, Claude 0.8 |
| 2 | Operating expenses | pág. 15, Claude 0.8 |
| 3 | Amortisation of players contracts | pág. 15, precedente |

### Meta

```text
2022: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, caja-deuda --personal 2026-10-22): incluye = wages_squad. caja-deuda.mjs --personal --partir (TODO 351): el costo de personal (16.143, sunderland-full-accounts-2021-22.md L882) es mayor que cada fila global de gasto; el documento reparte los sueldos entre varias funciones y no dice cuánto va en cada una
tools/cargar.mjs (2026-10-22). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
incluidoEn: ajuste manual `incluye`: el documento junta estas categorías con otra línea.
```

## 2021

### Ingresos

```text
2021: cargado por tools/cargar.mjs (2026-10-22) desde Clubes/Inglaterra/Sunderland/sunderland-full-accounts-2020-21.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Inglaterra/Sunderland/sunderland-full-accounts-2020-21.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Gate receipts | pág. 22, precedente |
| 2 | Television and media | pág. 22, precedente |
| 3 | Sponsorship and royalties | pág. 22, precedente |
| 4 | Conference and banqueting | pág. 22, precedente |
| 5 | Retail and merchandising | pág. 22, precedente |
| 6 | Other | pág. 22, precedente |
| 7 | Profit of disposal of players contracts | pág. 13, precedente |
| 8 | Other operating income | pág. 13, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Cost of sales | pág. 13, Claude 0.8 |
| 2 | Net operating expenses | pág. 13, Claude 0.85 |
| 3 | Amortisation of players contracts | pág. 13, precedente |
| 4 | Exceptional operating expense | pág. 13, Jev 0.97 |

### Meta

```text
2021: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, caja-deuda --personal 2026-10-22): incluye = wages_squad. caja-deuda.mjs --personal --partir (TODO 351): el costo de personal (13.363, sunderland-full-accounts-2020-21.md L838) es mayor que cada fila global de gasto; el documento reparte los sueldos entre varias funciones y no dice cuánto va en cada una
tools/cargar.mjs (2026-10-22). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
incluidoEn: ajuste manual `incluye`: el documento junta estas categorías con otra línea.
```

## 2020

### Ingresos

```text
2020: cargado por tools/cargar.mjs (2026-10-22) desde Clubes/Inglaterra/Sunderland/sunderland-full-accounts-2019-20.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Inglaterra/Sunderland/sunderland-full-accounts-2019-20.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Gate receipts | pág. 20, precedente |
| 2 | Television and media | pág. 20, precedente |
| 3 | Sponsorship and royalties | pág. 20, precedente |
| 4 | Conference and banqueting | pág. 20, precedente |
| 5 | Retail and merchandising | pág. 20, precedente |
| 6 | Other | pág. 20, precedente |
| 7 | Other operating income | pág. 12, precedente |
| 8 | Profit on disposal of players | pág. 12, Jev 0.99 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Cost of sales | pág. 12, Claude 0.8 |
| 2 | Net operating expenses before exceptional items | pág. 12, Claude 0.85 |
| 3 | Exceptional operating expense | pág. 12, Jev 0.97 |

### Meta

```text
2020: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, caja-deuda --personal 2026-10-22): incluye = wages_squad. caja-deuda.mjs --personal --partir (TODO 351): el costo de personal (16.273, sunderland-full-accounts-2019-20.md L692) es mayor que cada fila global de gasto; el documento reparte los sueldos entre varias funciones y no dice cuánto va en cada una
tools/cargar.mjs (2026-10-22). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
incluidoEn: ajuste manual `incluye`: el documento junta estas categorías con otra línea.
```

## 2019

### Ingresos

```text
2019: cargado por tools/cargar.mjs (2026-10-22) desde Clubes/Inglaterra/Sunderland/sunderland-full-accounts-2018-19.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Inglaterra/Sunderland/sunderland-full-accounts-2018-19.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Gate receipts | pág. 17, precedente |
| 2 | Television and media | pág. 17, precedente |
| 3 | Sponsorship and royalties | pág. 17, precedente |
| 4 | Conference and banqueting | pág. 17, precedente |
| 5 | Retail and merchandising | pág. 17, precedente |
| 6 | Other | pág. 17, precedente |
| 7 | Profit on disposal of players | pág. 10, Jev 0.99 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Cost of sales | pág. 10, Claude 0.8 |
| 2 | Net operating expenses before exceptional items | pág. 10, Claude 0.85 |
| 3 | Exceptional operating expense | pág. 10, Jev 0.97 |

### Meta

```text
2019: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, caja-deuda --personal 2026-10-22): incluye = wages_squad. caja-deuda.mjs --personal --partir (TODO 351): el costo de personal (26.668, sunderland-full-accounts-2018-19.md L669) es mayor que cada fila global de gasto; el documento reparte los sueldos entre varias funciones y no dice cuánto va en cada una
tools/cargar.mjs (2026-10-22). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
incluidoEn: ajuste manual `incluye`: el documento junta estas categorías con otra línea.
```

## Fuentes

### sunderland-gb-full-accounts-2024

_note (data/):_

```text
PDF con texto nativo, transcripción completa en Clubes/Inglaterra/Sunderland/sunderland-full-accounts-2023-24.md. Cuentas individuales, exenta de consolidar bajo Section 400 (Companies Act 2006). No declara tipo de cambio propio (fxRef apunta a FX_CLOSE, entrada GBP@2024-07-31 agregada en esta sesión).
```

### sunderland-gb-full-accounts-2025

_note (data/):_

```text
PDF con texto nativo, transcripción completa en Clubes/Inglaterra/Sunderland/sunderland-full-accounts-2024-25.md. La fila "Other operating income" de 2025 no aparece en el Income Statement transcripto (nil, confirmado contra Nota 5); ver comentario de cabecera de este archivo. Mismo criterio de categorización que el ejercicio 2024. fxRef apunta a FX_CLOSE, entrada GBP@2025-07-31 agregada en esta sesión.
```

### sunderland-gb-full-accounts-2021-22

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-20) desde la transcripción Clubes/Inglaterra/Sunderland/sunderland-full-accounts-2021-22.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### sunderland-gb-full-accounts-2018-19

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-20) desde la transcripción Clubes/Inglaterra/Sunderland/sunderland-full-accounts-2018-19.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### sunderland-gb-full-accounts-2019-20

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-20) desde la transcripción Clubes/Inglaterra/Sunderland/sunderland-full-accounts-2019-20.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### sunderland-gb-full-accounts-2020-21

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-20) desde la transcripción Clubes/Inglaterra/Sunderland/sunderland-full-accounts-2020-21.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### sunderland-gb-full-accounts-2022-23

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-20) desde la transcripción Clubes/Inglaterra/Sunderland/sunderland-full-accounts-2022-23.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

## Otros

### gestionesByClub['sunderland-gb']

```text
gestionId 'louisdreyfus': los 2 ejercicios cargados confirman a Kyril Louis-Dreyfus (vía Mercator
Investments Limited, controlante último) en los 2 Strategic Reports/Related Party Disclosures, sin
cambio entre 2024 y 2025.
```

## Gestiones (Finanzas 5, 2026-10-19)

- Stewart Donald, Dueño, 2018-05-21 a 2021-02-18 (Louis-Dreyfus). Fue Chairman hasta 2020-07-18 y siguió como dueño; no se encontró quién presidió entre esa fecha y 2021-02-18, por eso el cargo es Dueño. Juan Sartori, copropietario minoritario, no se carga. Cubre los cierres 2019-07-31 y 2020-07-31.
