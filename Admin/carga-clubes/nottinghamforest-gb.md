# nottinghamforest-gb — evidencia de carga

Lo que había como comentario en `data/gb/nottinghamforest-gb-data.js`, movido tal cual por `tools/archivo/mover-comentarios-data.mjs` (la regla:
`Admin/CONVENCIONES-DATOS.md`, "data/<país>/<club>-data.js NO LLEVA COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y
meta. Las notas de cada fila van en una tabla con su número de fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
============================================================================
data/gb/nottinghamforest-gb-data.js — Nottingham Forest Football Club Limited (clubId
'nottinghamforest-gb'), Ejercicios 2023/24 y 2024/25 (1° de julio a 30 de junio, confirmado en la
carátula de los dos documentos: "FOR THE YEAR ENDED 30 JUNE 2024"/"...2025").

ENTIDAD LEGAL: "Nottingham Forest Football Club Limited", Company Registration No. 01630402
(Companies House, UK). Cuentas INDIVIDUALES de la compañía (no consolidadas: el documento dice
"financial statements of Nottingham Forest Football Club Limited", no "Group"), aunque el club
tiene 2 subsidiarias (Nottingham Forest Women's Football Club Limited, Nottingham Forest Netball
Club Limited) cuyo resultado NO se consolida en estas cifras — mismo criterio de alcance que
Getafe/Everton (cuentas tal cual las presenta el documento, no una reconstrucción propia).

Fuente: transcripciones completas en Clubes/Inglaterra/Nottingham Forest/forest-full-accounts-
2023-24.md y -2024-25.md.

Cifras en GBP MILLONES nativos (documento en £'000, dividido por 1.000 al cargar). GBP ya existe
en data/currency-map.js (agregado en la sesión de Arsenal/Everton/Tottenham). Los 2 ejercicios
usan `fxRef` ('GBP@2024-06-30'/'GBP@2025-06-30', ya en FX_CLOSE) porque ninguno de los 2
documentos declara un tipo de cambio propio a USD (no tienen Nota de moneda extranjera: el club
opera 100% en libras).

----------------------------------------------------------------------------------------------
CATEGORIZACIÓN DE INGRESOS (Nota 3 "Turnover analysed by class of business", 5 líneas los 2
ejercicios, + "Profit on disposal of player registrations" como línea NETA separada debajo de
"Operating loss" en el Statement of comprehensive income):
  - "Gate receipts" -> matchday_competition.
  - "Media related activity" -> broadcasting.
  - "Merchandising" -> sponsorship_commercial (mismo criterio que Everton, que combina
    merchandising con sponsorship en un único bucket).
  - "Other commercial" -> sponsorship_commercial: a diferencia de "Other commercial activities"
    de Everton (que el propio documento definía como "hospitality, catering, events" y por eso
    fue a other_income), acá el rótulo dice explícitamente "commercial" y la política contable de
    Turnover (Nota 1.3) agrupa bajo el mismo párrafo "sponsorship and advertising receipts" y
    "conferencing and event receipts" como los componentes de este rubro — se interpretó como la
    porción comercial/sponsorship que el documento no desglosa más, no como hospitalidad genérica.
  - "Loan fees received" -> player_sales (fees de préstamos de jugadores recibidos, mismo
    criterio que "Player trading" de Arsenal: "Player trading consists primarily of loan fees
    receivable").
  - "Profit on disposal of player registrations": línea NETA, debajo de "Operating loss", antes
    de impuestos (misma posición que Everton/Arsenal) -> revenueLine con player_sales, NO
    fiscalYearMeta.profitOnPlayerSales (que queda en 0 para no duplicar).

CATEGORIZACIÓN DE GASTOS: el Income Statement de Forest NO desglosa "Cost of sales"/
"Administrative expenses" por naturaleza del gasto más allá de lo que la Nota 7 "Operating loss"
(stated after charging/crediting) revela: Staff costs (Nota 5, agregado único sin desglose por
plantel/resto — mismo gotcha que Arsenal/Everton, ningún club inglés cargado hasta ahora separa
costo salarial por departamento), Amortisation of player registrations, Impairment of player
registrations (solo 2025), Depreciation. El resto de "Cost of sales" + "Administrative expenses"
(que incluye exchange gains/losses y loss/profit en venta de activos tangibles, ambos inmateriales
y ya "stated after charging" dentro de Administrative expenses, no como línea aparte) se cargó
como UNA línea residual `other_expenses` — mismo criterio que "Other operating costs" de Everton,
acá sin nombre propio en el documento porque Forest no lo desglosa ni siquiera a ese nivel.
  - "Staff costs" -> wages_squad (total agregado, plantel + resto del personal).
  - "Amortisation of player registrations" -> player_amortisation.
  - "Impairment of player registrations" (solo 2025, Nota 7/10) -> player_impairment.
  - "Depreciation of owned tangible fixed assets" -> depreciation.
  - Residual (Cost of sales + Administrative expenses − Staff costs − Amortisation − Impairment −
    Depreciation) -> other_expenses, rotulado explicando que es residual.

"netInterest" = Interest receivable (Nota 8) − Interest payable (Nota 9). "tax" = 0 los 2 años
(ninguna de las 2 tuvo cargo impositivo, ver Nota 11/12). "assetSales"/"profitOnPlayerSales" = 0
(el profit on disposal ya está en revenueLines; el loss/profit en venta de activos TANGIBLES es
inmaterial —£66k/£10k— y queda embebido en el residual "other_expenses", no se separó aparte).

GROSSDEBT: se usó el criterio de Everton/Arsenal (deuda financiera real: bancos + facilities de
descuento de pases + "Other loans", EXCLUYENDO "Amounts payable in respect of player transfers"
—deuda comercial por compra de pases, no deuda financiera— y "Amounts due to group undertakings"
—financiamiento intra-grupo, tratado aparte igual que en el criterio ya usado para Sunderland).
  2024: Bank overdrafts+Other loans dentro de 1 año (Nota 18: 11.492+8.358=19.850) + Other loans
    después de 1 año (Nota 20: 75.997) = 95.847.
  2025: Bank loans and overdrafts+Other borrowings dentro de 1 año (Nota 21/19: 0.044+59.616=
    59.660) + Other loans después de 1 año (Nota 20: 86.825) = 146.485.
cash = "Cash at bank and in hand" del balance (0.029 en 2024, 13.224 en 2025).

VERIFICACIÓN (a mano, contra los totales impresos):
  2024: revenueLines suman 290.083 = officialTotalRevenue (Turnover 189.552 + Profit on disposal
    100.531). expenses(wages+other_expenses) + nonCash(amortisation+depreciation) = -199.963 +
    (-62.844) = -262.807 = officialTotalExpenses EXACTO (Cost of sales 12.643 + Administrative
    expenses 250.164 impreso). + netInterest (-15.177) = 12.099 = officialPAT EXACTO ("Profit for
    the financial year" impreso).
  2025: revenueLines suman 228.763 = officialTotalRevenue (Turnover 221.746 + Profit on disposal
    7.017). expenses+nonCash = -210.574 + (-76.099) = -286.673 = officialTotalExpenses EXACTO
    (Cost of sales 15.224 + Administrative expenses 271.449 impreso). + netInterest (-21.011) =
    -78.921 = officialPAT EXACTO ("(Loss) for the financial year" impreso).
Los dos cierran EXACTOS, sin residuo.
============================================================================
```

_de data/clubs.js:_

```text
5 clubes nuevos (onboarding 2026-09-25, pool de PDF ya transcriptos): Nottingham Forest,
Sunderland, West Ham, Wolves (Inglaterra) y Levante (España, país ya cargado). brandColor
verificado contra footylogos.com salvo Levante (ver duda en Admin/dudas-por-club.md: kit
mitades azul/granate sin predominancia declarada, mismo caso que Crystal Palace).
```

_de data/club-leagues/gb.js:_

```text
4 clubes nuevos: Nottingham Forest, West Ham y Wolves jugaron Premier League los 2 ejercicios
(verificado contra "2023-24 Premier League" y "2024-25 Premier League", Wikipedia: ninguno de
los 3 aparece en las listas de descendidos de esos 2 años — 2023/24: Luton/Burnley/Sheffield
United; 2024/25: Leicester/Ipswich/Southampton). Sunderland es el caso distinto: ascendió a la
Premier League recién para 2025/26 (vía playoff, jugado en mayo de 2025, POSTERIOR al cierre de
su ejercicio 2024/25) — sus 2 ejercicios cargados (2024 y 2025, cierre 31/7) fueron enteros en
el Championship, confirmado por el propio Strategic Report de cada documento. El ejercicio
"2025" de Wolves cubre 13 meses (1/6/2024-30/6/2025, cambio de fecha de cierre de ejercicio)
pero cae enteramente dentro de la temporada 2024/25 de Premier League, sin ambigüedad de liga.
```

## 2023

### Ingresos

```text
2023: cargado por tools/cargar.mjs (2026-10-22) desde Clubes/Inglaterra/Nottingham Forest/nottinghamforest-full-accounts-2022-23.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Inglaterra/Nottingham Forest/nottinghamforest-full-accounts-2022-23.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Gate receipts | pág. 25, precedente |
| 2 | Media related activity | pág. 25, precedente |
| 3 | Merchandising | pág. 25, precedente |
| 4 | Other commercial | pág. 25, precedente |
| 5 | Profit on disposal of player registrations | pág. 14, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Cost of sales | pág. 14, precedente |
| 2 | Other operating expenses | pág. 14, Jev 1 |
| 3 | Administrative expenses (sin el costo de personal) | pág. 14, precedente |
| 4 | Staff costs (total de la nota de personal) | pág. 14, precedente |

### Meta

```text
2023: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, caja-deuda --personal 2026-10-22): fila = 58.228,00. caja-deuda.mjs --personal --partir (to-do 229): el año no tiene wages_squad y el costo de personal confirmado (staffCost, nottinghamforest-full-accounts-2022-23.md L936) está dentro de "Administrative expenses": queda 203.140,00 - 144.912,00
2023: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, caja-deuda --personal 2026-10-22): fila = 144.912,00. caja-deuda.mjs --personal --partir (to-do 229): el año no tiene wages_squad y el costo de personal confirmado (staffCost, nottinghamforest-full-accounts-2022-23.md L936) está dentro de "Administrative expenses": el costo de personal va aparte
2023: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, caja-deuda --personal 2026-10-22): categoria = wages_squad. caja-deuda.mjs --personal --partir (to-do 229): el año no tiene wages_squad y el costo de personal confirmado (staffCost, nottinghamforest-full-accounts-2022-23.md L936) está dentro de "Administrative expenses": costo de personal -> wages_squad
tools/cargar.mjs (2026-10-22). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

## 2022

### Ingresos

```text
2022: cargado por tools/cargar.mjs (2026-10-22) desde Clubes/Inglaterra/Nottingham Forest/nottinghamforest-full-accounts-2021-22.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Inglaterra/Nottingham Forest/nottinghamforest-full-accounts-2021-22.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Sponsorship and advertising | pág. 24, Jev 1 |
| 2 | Catering | pág. 24, precedente |
| 3 | Grants & royalties | pág. 24, precedente |
| 4 | TV & radio | pág. 24, Jev 1 |
| 5 | Ticket & membership sales | pág. 24, Claude 0.8 |
| 6 | Commercial | pág. 24, Jev 1 |
| 7 | Programme & other match day income | pág. 24, Jev 0.99 |
| 8 | Other non match day income | pág. 24, Jev 0.92 |
| 9 | Players | pág. 24, Jev 0.95 |
| 10 | Retail | pág. 24, Jev 0.97 |
| 11 | Profit on disposal of player registrations | pág. 13, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Cost of sales | pág. 13, precedente |
| 2 | Other operating (expenses)/income | pág. 13, Jev 1 |
| 3 | Administrative expenses (sin el costo de personal) | pág. 13, precedente |
| 4 | Staff costs (total de la nota de personal) | pág. 13, precedente |

### Meta

```text
2022: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-20): fila = -20. La extracción omitió esta fila del estado de resultados (L423, (20) en £000): sin ella el resultado da -45,59 y el impreso es -45,61
2022: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, caja-deuda --personal 2026-10-22): fila = 15.119,00. caja-deuda.mjs --personal --partir (to-do 229): el año no tiene wages_squad y el costo de personal confirmado (staffCost, nottinghamforest-full-accounts-2021-22.md L888) está dentro de "Administrative expenses": queda 73.684,00 - 58.565,00
2022: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, caja-deuda --personal 2026-10-22): fila = 58.565,00. caja-deuda.mjs --personal --partir (to-do 229): el año no tiene wages_squad y el costo de personal confirmado (staffCost, nottinghamforest-full-accounts-2021-22.md L888) está dentro de "Administrative expenses": el costo de personal va aparte
2022: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, caja-deuda --personal 2026-10-22): categoria = wages_squad. caja-deuda.mjs --personal --partir (to-do 229): el año no tiene wages_squad y el costo de personal confirmado (staffCost, nottinghamforest-full-accounts-2021-22.md L888) está dentro de "Administrative expenses": costo de personal -> wages_squad
tools/cargar.mjs (2026-10-22). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

## Fuentes

### nottinghamforest-gb-full-accounts-2024

_note (data/):_

```text
PDF con texto nativo, transcripción completa en Clubes/Inglaterra/Nottingham Forest/forest-full-accounts-2023-24.md. Cuentas individuales de la compañía, no consolidadas con Nottingham Forest Women's FC Limited ni Nottingham Forest Netball Club Limited. No declara tipo de cambio propio (fxRef apunta a FX_CLOSE).
```

### nottinghamforest-gb-full-accounts-2025

_note (data/):_

```text
PDF con texto nativo, transcripción completa en Clubes/Inglaterra/Nottingham Forest/forest-full-accounts-2024-25.md. Mismo criterio de categorización que el ejercicio 2024.
```

### nottinghamforest-gb-full-accounts-2022-23

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-20) desde la transcripción Clubes/Inglaterra/Nottingham Forest/nottinghamforest-full-accounts-2022-23.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### nottinghamforest-gb-full-accounts-2021-22

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-20) desde la transcripción Clubes/Inglaterra/Nottingham Forest/nottinghamforest-full-accounts-2021-22.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

## Otros

### gestionesByClub['nottinghamforest-gb']

```text
gestionId 'marinakis': los 2 ejercicios cargados confirman a Mr E Marinakis (80%, vía NF Football
Investments Limited) como controlante último en los 2 Strategic Reports, sin cambio entre 2024 y
2025.
```
