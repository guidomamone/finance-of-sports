# westham-gb — evidencia de carga

Lo que había como comentario en `data/gb/westham-gb-data.js`, movido tal cual por `tools/archivo/mover-comentarios-data.mjs` (la regla:
`Admin/CONVENCIONES-DATOS.md`, "data/<país>/<club>-data.js NO LLEVA COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y
meta. Las notas de cada fila van en una tabla con su número de fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
============================================================================
data/gb/westham-gb-data.js — West Ham United Football Club Limited (clubId 'westham-gb'),
Ejercicio 2024/25 único (1° de junio de 2024 a 31 de mayo de 2025, confirmado en la carátula:
"For the year ended 31 May 2025"). Solo hay UNA transcripción disponible para este club (a
diferencia de Forest/Sunderland/Wolves, que tienen 2 ejercicios).

ENTIDAD LEGAL: "West Ham United Football Club Limited", Company Registration No. 66516
(Companies House, UK). Cuentas INDIVIDUALES (exenta de consolidar bajo Section 400 del Companies
Act 2006; subsidiaria de WH Holding Limited, que sí publica consolidadas, no cargadas acá).

Fuente: transcripción completa en Clubes/Inglaterra/West Ham United/west-ham-united-full-
accounts-2024-25.md.

Cifras en GBP MILLONES nativos (documento en £'000, dividido por 1.000 al cargar). `fxRef`
('GBP@2025-05-31', ya en FX_CLOSE desde la sesión de Arsenal/Wolves) porque el documento no
declara un tipo de cambio propio a USD.

----------------------------------------------------------------------------------------------
FORMATO DEL DOCUMENTO: el "Statement of Comprehensive Income" de West Ham separa 2 columnas todo
el estado de resultados ("Operations excluding player trading" / "Player trading"), no solo el
resultado neto de pases como Everton/Forest — la amortización de pases y el profit on disposal
están en la columna "Player trading" del inicio a fin. Se cargó igual al resto de los clubes
(revenueLines/expenseLines planas, sin separar por columna), el shape del sitio no necesita esa
distinción.

CATEGORIZACIÓN DE INGRESOS (Nota 2 "Turnover by class of business", 4 líneas, + "Other operating
income" y "Profit on disposal of players" como líneas separadas del cuerpo del Statement):
  - "Match receipts and related football activities" -> matchday_competition.
  - "Broadcast and central sponsorship distributions" -> broadcasting.
  - "Commercial activities" -> sponsorship_commercial.
  - "Retail and merchandising" -> sponsorship_commercial.
  - "Other operating income" (Nota 4: "non-trading income... government and other grant income
    and insurance claims" — insurance claims £1.6m, FIFA Distributions £1.0m, Academy grant
    Premier League £1.2m, release de grant £0.1m, otros £0.1m) -> other_income (mismo criterio que
    Everton: no es sponsorship ni recaudación, es no-trading).
  - "Profit on disposal of players" (Nota 6, línea NETA en la columna "Player trading", después de
    "Operating (loss)") -> revenueLine con player_sales, mismo criterio que Forest/Sunderland/
    Everton/Arsenal (meta.profitOnPlayerSales queda en 0 para no duplicar).

CATEGORIZACIÓN DE GASTOS (Nota 4 "Operating (Loss)/profit is stated after charging/(crediting)" +
Nota 5 "Staff Costs"): "Operating costs" (columna "Operations excluding player trading",
£240.016m) es un total que NO se desglosa por naturaleza más allá de lo que la Nota 4 revela
(Employment costs, Amortisation —que en realidad va en la columna Player trading, no acá—,
Depreciation, auditor's fees, operating leases; los créditos de la nota —PL Youth Academy grant,
FX gain, insurance claims— son los MISMOS que ya se cargaron como "Other operating income" arriba,
no una resta adicional).
  - "Employment costs" (Nota 5: Wages and salaries + Social security + Other pension costs) ->
    wages_squad (agregado único, mismo gotcha que el resto de los clubes ingleses: no separa
    plantel del resto del personal, solo da headcount por área en la Nota 5, no costo).
  - "Amortisation of intangible fixed assets" (columna Player trading) -> player_amortisation.
  - "Depreciation on tangible fixed assets" -> depreciation.
  - Residual ("Operating costs" £240.016m − Employment costs − Depreciation, que incluye fees de
    auditoría, operating leases, y todo el resto de costos operativos/administrativos/de partido
    sin nombre propio en el documento) -> other_expenses.
  - "Exceptional items" (Nota 3): £0 en 2025 (solo £562k en 2024, comparativo) — no se cargó
    ninguna línea para este ejercicio.

"netInterest" = Interest receivable (Nota 7: bank interest + interest implícito por descuento de
cuentas por cobrar de pases a largo plazo) − Interest payable (Nota 8). "tax" = +0.581 (CRÉDITO
impositivo, Nota 9 — señal correcta: "(Loss) before taxation (108.842) + Tax 0.581 = (Loss) after
taxation (108.261)"). "assetSales"/"profitOnPlayerSales" = 0 (ya en revenueLines).

GROSSDEBT: se excluyeron "Amounts owed to Group undertakings" (36.354) y "Amount owed to parent
company" (176.306) — financiamiento intra-grupo, mismo criterio que Forest/Sunderland — y
"Creditors arising from player transfers" (deuda comercial por compra de pases, no financiera). Se
cargó la deuda financiera real (Nota 15/16/17): Bank overdraft (16.311, dentro de 1 año) + Bank
loan/secured loan (1.621 dentro de 1 año + 2.256 después de 1 año, préstamo Barclays para Rush
Green, repagado en su totalidad el 29/8/2025, evento posterior al cierre) + Debenture loans (0.611,
"Hammers Bond Scheme" 1991-92, no genera interés pero es una obligación financiera formal) = 20.799.
cash = "Cash at bank and in hand" del balance (0.422).

VERIFICACIÓN (a mano, contra los totales impresos): revenueLines suman 249.908 =
officialTotalRevenue (Turnover 226.058 + Other operating income 3.896 + Profit on disposal
19.954). expenses(wages+other_expenses) + nonCash(amortisation+depreciation) = -237.414 +
(-102.010) = -339.424 = officialTotalExpenses EXACTO (Operating costs 240.016 + Amortisation
99.408 impreso, columna "Total"). + netInterest (-19.326) + tax (0.581) = -108.261 = officialPAT
EXACTO ("(Loss) / profit after taxation" impreso). Cierra exacto, sin residuo.
============================================================================
```

## 2025

### Meta

```text
grossDebt = Bank overdraft (16.311) + Secured loan (1.621+2.256) + Debenture loans (0.611),
ver comentario de cabecera. cash = "Cash at bank and in hand".
```

## Gestiones

_antes de David Sullivan (data/gestiones/gb.js):_

```text
Sullivan y Gold compraron el club el 19/1/2010; Sullivan es el cabeza (Gold, co-chairman, murió en enero de 2023).
```

## 2024

### Ingresos

```text
2024: cargado por tools/cargar.mjs (2026-10-23) desde Clubes/Inglaterra/West Ham United/westham-full-accounts-2023-24.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Inglaterra/West Ham United/westham-full-accounts-2023-24.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Match receipts and related football activities | pág. 36, precedente |
| 2 | Broadcast and central sponsorship distributions | pág. 36, precedente |
| 3 | Commercial activities | pág. 36, precedente |
| 4 | Retail and merchandising | pág. 36, precedente |
| 5 | Other operating income | pág. 27, precedente |
| 6 | Profit on disposal of players | pág. 27, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Operating costs | pág. 27, precedente |

### Meta

```text
tools/caja-deuda.mjs --personal (2026-10-23): staffCost 159.04 (compuerta: documento anterior): estructura de la nota (la suma cierra): westham-full-accounts-2023-24.md L1512 "(total sin rótulo: suma las filas de arriba)"
```

```text
2024: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-19): fila = 0. Exceptional items ya está dentro de Administrative expenses / Operating costs ('Analysed as'): duplicaba el gasto
2024: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, caja-deuda --personal 2026-10-23): incluye = wages_squad. caja-deuda.mjs --personal --partir (TODO 351): el costo de personal (159.04, westham-full-accounts-2023-24.md L1512) es mayor que cada fila global de gasto; el documento reparte los sueldos entre varias funciones y no dice cuánto va en cada una
tools/cargar.mjs (2026-10-23). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
incluidoEn: ajuste manual `incluye`: el documento junta estas categorías con otra línea.
```

## 2023

### Ingresos

```text
2023: cargado por tools/cargar.mjs (2026-10-23) desde Clubes/Inglaterra/West Ham United/westham-full-accounts-2022-23.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Inglaterra/West Ham United/westham-full-accounts-2022-23.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Match receipts and related football activities | pág. 35, precedente |
| 2 | Broadcast and central sponsorship distributions | pág. 35, precedente |
| 3 | Commercial activities | pág. 35, precedente |
| 4 | Retail and merchandising | pág. 35, precedente |
| 5 | Other operating income | pág. 26, precedente |
| 6 | Profit on disposal of players | pág. 26, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Operating costs | pág. 26, precedente |

### Meta

```text
tools/caja-deuda.mjs --personal (2026-10-23): staffCost 135.343 (compuerta: documento siguiente): estructura de la nota (la suma cierra): westham-full-accounts-2022-23.md L1470 "(total sin rótulo: suma las filas de arriba)"
```

```text
2023: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-19): fila = 0. Exceptional items ya está dentro de Administrative expenses / Operating costs ('Analysed as'): duplicaba el gasto
2023: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, caja-deuda --personal 2026-10-23): incluye = wages_squad. caja-deuda.mjs --personal --partir (TODO 351): el costo de personal (135.343, westham-full-accounts-2022-23.md L1470) es mayor que cada fila global de gasto; el documento reparte los sueldos entre varias funciones y no dice cuánto va en cada una
tools/cargar.mjs (2026-10-23). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
incluidoEn: ajuste manual `incluye`: el documento junta estas categorías con otra línea.
```

## 2022

### Ingresos

```text
2022: cargado por tools/cargar.mjs (2026-10-22) desde Clubes/Inglaterra/West Ham United/westham-full-accounts-2021-22.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Inglaterra/West Ham United/westham-full-accounts-2021-22.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Match receipts and related football activities | pág. 33, precedente |
| 2 | Broadcast and central sponsorship distributions | pág. 33, precedente |
| 3 | Commercial activities | pág. 33, precedente |
| 4 | Retail and merchandising | pág. 33, precedente |
| 5 | Other operating income | pág. 24, precedente |
| 6 | Profit on disposal of players | pág. 24, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Administrative expenses (sin el costo de personal) | pág. 24, precedente |
| 2 | Staff costs (total de la nota de personal) | pág. 24, precedente |

### Meta

```text
2022: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-19): fila = 0. Exceptional items ya está dentro de Administrative expenses / Operating costs ('Analysed as'): duplicaba el gasto
2022: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, caja-deuda --personal 2026-10-22): fila = 99.662,00. caja-deuda.mjs --personal --partir (to-do 229): el año no tiene wages_squad y el costo de personal confirmado (staffCost, westham-full-accounts-2021-22.md L1491) está dentro de "Administrative expenses": queda 234.059,00 - 134.397,00
2022: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, caja-deuda --personal 2026-10-22): fila = 134.397,00. caja-deuda.mjs --personal --partir (to-do 229): el año no tiene wages_squad y el costo de personal confirmado (staffCost, westham-full-accounts-2021-22.md L1491) está dentro de "Administrative expenses": el costo de personal va aparte
2022: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, caja-deuda --personal 2026-10-22): categoria = wages_squad. caja-deuda.mjs --personal --partir (to-do 229): el año no tiene wages_squad y el costo de personal confirmado (staffCost, westham-full-accounts-2021-22.md L1491) está dentro de "Administrative expenses": costo de personal -> wages_squad
tools/cargar.mjs (2026-10-22). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

```text
tools/caja-deuda.mjs --personal (2026-10-23): staffCost 134.397 (compuerta: documento siguiente): estructura de la nota (la suma cierra): westham-full-accounts-2021-22.md L1491 "(total sin rótulo: suma las filas de arriba)"
```

## 2021

### Ingresos

```text
2021: cargado por tools/cargar.mjs (2026-10-22) desde Clubes/Inglaterra/West Ham United/westham-full-accounts-2020-21.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Inglaterra/West Ham United/westham-full-accounts-2020-21.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Match receipts and related football activities | pág. 34, precedente |
| 2 | Broadcast and central sponsorship distributions | pág. 34, precedente |
| 3 | Commercial activities | pág. 34, precedente |
| 4 | Retail and merchandising | pág. 34, precedente |
| 5 | Other operating income | pág. 25, precedente |
| 6 | Profit on sale of players | pág. 36, precedente |
| 7 | Income from loan of players | pág. 36, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Administrative expenses (sin el costo de personal) | pág. 25, precedente |
| 2 | Staff costs (total de la nota de personal) | pág. 25, precedente |

### Meta

```text
2021: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-19): fila = 0. Exceptional items (1.443) ya está dentro de Administrative expenses ('Analysed as'): duplicaba el gasto
2021: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, caja-deuda --personal 2026-10-22): fila = 103.151,00. caja-deuda.mjs --personal --partir (to-do 229): el año no tiene wages_squad y el costo de personal confirmado (staffCost, westham-full-accounts-2020-21.md L1370) está dentro de "Administrative expenses": queda 231.602,00 - 128.451,00
2021: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, caja-deuda --personal 2026-10-22): fila = 128.451,00. caja-deuda.mjs --personal --partir (to-do 229): el año no tiene wages_squad y el costo de personal confirmado (staffCost, westham-full-accounts-2020-21.md L1370) está dentro de "Administrative expenses": el costo de personal va aparte
2021: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, caja-deuda --personal 2026-10-22): categoria = wages_squad. caja-deuda.mjs --personal --partir (to-do 229): el año no tiene wages_squad y el costo de personal confirmado (staffCost, westham-full-accounts-2020-21.md L1370) está dentro de "Administrative expenses": costo de personal -> wages_squad
tools/cargar.mjs (2026-10-22). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

```text
tools/caja-deuda.mjs --personal (2026-10-23): staffCost 128.451 (compuerta: documento siguiente): estructura de la nota (la suma cierra): westham-full-accounts-2020-21.md L1370 "(total sin rótulo: suma las filas de arriba)"
```

## 2020

### Ingresos

```text
2020: cargado por tools/cargar.mjs (2026-10-22) desde Clubes/Inglaterra/West Ham United/westham-full-accounts-2019-20.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Inglaterra/West Ham United/westham-full-accounts-2019-20.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Match receipts and related football activities | pág. 32, precedente |
| 2 | Broadcast and central sponsorship distributions | pág. 32, precedente |
| 3 | Commercial activities | pág. 32, precedente |
| 4 | Retail and merchandising | pág. 32, precedente |
| 5 | Other operating income | pág. 24, precedente |
| 6 | Profit on sale of players | pág. 34, precedente |
| 7 | Income from loan of players | pág. 34, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Administrative expenses (sin el costo de personal) | pág. 24, precedente |
| 2 | Staff costs (total de la nota de personal) | pág. 24, precedente |

### Meta

```text
2020: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, caja-deuda --personal 2026-10-22): fila = 94.593,00. caja-deuda.mjs --personal --partir (to-do 229): el año no tiene wages_squad y el costo de personal confirmado (staffCost, westham-full-accounts-2019-20.md L1353) está dentro de "Administrative expenses": queda 224.542,00 - 129.949,00
2020: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, caja-deuda --personal 2026-10-22): fila = 129.949,00. caja-deuda.mjs --personal --partir (to-do 229): el año no tiene wages_squad y el costo de personal confirmado (staffCost, westham-full-accounts-2019-20.md L1353) está dentro de "Administrative expenses": el costo de personal va aparte
2020: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, caja-deuda --personal 2026-10-22): categoria = wages_squad. caja-deuda.mjs --personal --partir (to-do 229): el año no tiene wages_squad y el costo de personal confirmado (staffCost, westham-full-accounts-2019-20.md L1353) está dentro de "Administrative expenses": costo de personal -> wages_squad
tools/cargar.mjs (2026-10-22). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

```text
tools/caja-deuda.mjs --personal (2026-10-23): staffCost 129.949 (compuerta: documento siguiente): estructura de la nota (la suma cierra): westham-full-accounts-2019-20.md L1353 "(total sin rótulo: suma las filas de arriba)"
```

## Fuentes

### westham-gb-full-accounts-2025

_note (data/):_

```text
PDF con texto nativo, transcripción completa en Clubes/Inglaterra/West Ham United/west-ham-united-full-accounts-2024-25.md. Cuentas individuales, subsidiaria de WH Holding Limited (no consolida, exenta bajo Section 400). No declara tipo de cambio propio (fxRef apunta a FX_CLOSE). Único ejercicio disponible (a diferencia de otros clubes ingleses de esta sesión, no había un 2do PDF transcripto).
```

### westham-gb-full-accounts-2022-23

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-20) desde la transcripción Clubes/Inglaterra/West Ham United/westham-full-accounts-2022-23.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### westham-gb-full-accounts-2019-20

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-20) desde la transcripción Clubes/Inglaterra/West Ham United/westham-full-accounts-2019-20.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### westham-gb-full-accounts-2020-21

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-20) desde la transcripción Clubes/Inglaterra/West Ham United/westham-full-accounts-2020-21.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### westham-gb-full-accounts-2021-22

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-20) desde la transcripción Clubes/Inglaterra/West Ham United/westham-full-accounts-2021-22.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### westham-gb-full-accounts-2023-24

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-20) desde la transcripción Clubes/Inglaterra/West Ham United/westham-full-accounts-2023-24.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

## Otros

### gestionesByClub['westham-gb']

```text
gestionId 'sullivan': propiedad fragmentada del holding controlante (WH Holding Limited) al cierre
del ejercicio — David Sullivan 38.8% (accionista individual más grande), Daniel Kretinsky 27.0%,
Estate of David Gold 25.1% (Nota "Ultimate controlling party"). Se usa 'sullivan' como etiqueta
porque es el mayor accionista individual, sin que eso implique control mayoritario único.
```
