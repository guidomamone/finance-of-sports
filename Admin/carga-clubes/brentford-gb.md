# brentford-gb — evidencia de carga

Lo que había como comentario en `data/gb/brentford-gb-data.js`, movido tal cual por `tools/archivo/mover-comentarios-data.mjs` (la regla:
`Admin/CONVENCIONES-DATOS.md`, "data/<país>/<club>-data.js NO LLEVA COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y
meta. Las notas de cada fila van en una tabla con su número de fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
============================================================================
data/gb/brentford-gb-data.js — Brentford FC Ltd (clubId 'brentford-gb'), Ejercicios 2023/24 (año
ended 30 junio 2024) y 2024/25 (año ended 30 junio 2025).

ENTIDAD LEGAL: "Brentford FC Ltd", Companies House n° 03642327 — cuentas CONSOLIDADAS del grupo
("Consolidated Income Statement"/"Consolidated Financial Statements"). Ejercicio 1° de julio a 30
de junio (fiscalYearStart '07-01' en data/clubs.js).

Fuente: transcripciones completas en Clubes/Inglaterra/Brentford/brentford-group-accounts-2023-
24.md y -2024-25.md (ya transcriptas antes de esta sesión).

Cifras en GBP MILLONES nativos (documento en £'000, /1.000 al cargar). fx: ninguno de los 2
documentos declara un tipo de cambio propio a USD -> fxRef a FX_CLOSE (GBP@2024-06-30/
GBP@2025-06-30, ya existentes).

----------------------------------------------------------------------------------------------
ESTRUCTURA DEL P&L: a diferencia de Arsenal/Everton/Burnley, este documento agrupa TODOS los
gastos operativos bajo UNA sola línea "Administrative expenses" (sin "Staff costs"/"Depreciation"
como líneas propias del cuerpo del P&L) — el desglose sale de reconstruir esa línea con 3 notas
separadas (Nota "Employees and directors", Nota "Operating (loss)/profit [stated after
charging]"), que entre las 3 explican la GRAN mayoría del total (ver detalle abajo), dejando un
residuo menor sin especificar -> other_expenses.

CATEGORIZACIÓN DE INGRESOS (Nota "Turnover", 4 líneas "class of business", + "Other operating
income" + "Gain on disposal of players' registrations" +, solo 2025, "Profit on sale of tangible
fixed assets"):
  - "Central Distributions"/"Central distributions" -> broadcasting (distribuciones centrales de
    la Premier League, mismo concepto que "Premier League income" de Bournemouth).
  - "Commercial" -> sponsorship_commercial.
  - "Matchday" -> matchday_competition.
  - "Other" (turnover): el propio Strategic Report del ejercicio 2023/24 lo explica —
    "the biggest increase in revenue streams of £10.5m relates to Other Turnover, primarily the
    loan fee [income]" — y la nota de Turnover aclara que desde 2023/24 el ingreso por PRÉSTAMO de
    jugadores se reclasificó de "Other Operating Income" a "Turnover" ("management considers this
    as part of the group's principal activity"). Se cargó -> player_sales los 2 ejercicios (2024:
    £11,666k; 2025: £1,796k, mucho menor, consistente con que el préstamo de jugadores varía
    temporada a temporada) siguiendo ese mismo criterio de clasificación del propio club, aunque el
    documento de 2025 no repite la aclaración textual — es la MISMA línea contable, no una
    reclasificación puntual de un solo año.
  - "Other operating income" (Rents received + Grant income + Loan player revenue/Settlement
    agreements + Other income): en 2024 la propia nota aclara "Loan player revenue" en £Nil (ya
    migrado a Turnover, ver arriba) -> other_income completa, sin componente de jugadores. En 2025
    tampoco hay componente de jugadores (Settlement agreements = compensación por salida de
    personal, Other income = R&D tax credit + compensación UEFA) -> other_income completa.
  - "Gain on disposal of players' registrations" -> player_sales, línea neta separada después de
    "Operating (loss)/profit before player trading". meta.profitOnPlayerSales queda en 0 (no
    duplicar).
  - "Profit on sale of tangible fixed assets" (SOLO 2025, £8,796k, línea nueva que no existía en
    2024) -> meta.assetSales (positivo, NO revenueLine: son activos fijos, no pases de jugadores).

CATEGORIZACIÓN DE GASTOS (reconstruyendo "Administrative expenses"):
  - "Employees and directors" (Wages and salaries + Social security costs + Other pension costs,
    SIN desglose por área a pesar de que el headcount SÍ separa "Administration and commercial
    staff" de "Player and training staff" — mismo patrón que el resto de los clubes ingleses) ->
    wages_squad completa.
  - "Depreciation - owned assets" (nota "Operating (loss)/profit... stated after charging") ->
    depreciation.
  - "Intangible assets amortisation" (misma nota) -> player_amortisation.
  - Resto de "Administrative expenses" sin desglosar en ningún lado del documento (2024:
    £201.155M - £114.371M empleados - £8.694M depreciación - £35.631M amortización = £42.459M;
    2025: £232.060M - £130.778M empleados - £11.390M depreciación - £47.872M amortización =
    £42.020M) -> other_expenses.

"netInterest" = "Interest receivable and similar income" menos "Interest payable and similar
expenses" (Nota de intereses; el total de interés pagado de 2024 reconciliado a mano en £5.020M —
la Nota de intereses de ese mismo documento imprime un total de £6.020M que no reconcilia con el
resto del P&L, es un dígito mal OCReado: los 2 componentes de la nota, Loan interest £1.427M +
Bank interest charges £3.593M, suman exacto £5.020M, y ESE es el número que hace cerrar Loss
before taxation, no el total impreso de la nota). "tax" = "Tax credit on (loss)/profit"/"Tax
credit on loss", positivo (crédito) en los 2 ejercicios.

"grossDebt"/"cash": el propio documento tiene una nota "Analysis of changes in net (debt)/funds"
que separa "Cash" (Cash in hand NETEADO contra Bank overdraft, dando un neto NEGATIVO los 2 años)
de "Debt" (Shareholder loans + Other loans + [desde 2025] Bank loans, EXCLUYENDO el overdraft, que
el documento clasifica como parte de "Cash" no de "Debt"). Se armó grossDebt/cash de forma que el
"cash" del sitio sea siempre positivo (más legible que un neto negativo) SIN cambiar el neto total:
cash = "Cash in hand" tal cual (positivo), grossDebt = Bank overdraft + Bank loans + Shareholder
loans + Other loans (moviendo el overdraft de "Cash" a "Debt" del lado del sitio). netDebt
(grossDebt-cash) da EXACTO el mismo "Total net (debt)/funds" que imprime la propia nota del
documento en los 2 ejercicios (90,877 en 2024; 130,095 en 2025), confirmando que el reacomodo no
cambia el neto, solo separa qué lado de la resta lo absorbe.
  2024: grossDebt = Bank overdraft (36,747) + Shareholder loans (22,758+38,340=61,098) + Other
    loans (502) = 98,347. cash = Cash in hand (7,470).
  2025: grossDebt = Bank overdraft (26,548) + Bank loans (43,924, línea NUEVA este año) +
    Shareholder loans (22,758+38,340=61,098) + Other loans (502) = 132,072. cash = Cash in hand
    (1,977).

VERIFICACIÓN (a mano, sumando cada línea contra los totales impresos — los 2 ejercicios
reconcilian EXACTOS, sin residuo):
  2023/24: revenue 197,134 M (127,500+16,029+11,341+11,666+5,400+25,198) + expenses (wages
    -114,371 + other_expenses -42,459 = -156,830) + nonCash (depreciation -8,694 +
    player_amortisation -35,631 = -44,325) = -4,021 = "Operating (loss)/profit" impreso EXACTO
    (ebit, sin profitOnPlayerSales/assetSales adicionales ese año). + netInterest (1,168-5,020=
    -3,852) = -7,873 = "(Loss)/profit before taxation" impreso EXACTO. + tax (0,356) = -7,517 =
    officialPAT EXACTO. officialTotalExpenses = |expenses+nonCash| = 201,155 M = "Administrative
    expenses" impreso EXACTO.
  2024/25: revenue 210,503 M (139,547+19,357+12,376+1,796+10,191+27,236) + expenses (wages
    -130,778 + other_expenses -42,020 = -172,798) + nonCash (depreciation -11,390 +
    player_amortisation -47,872 = -59,262) = -21,557 (operatingProfit interno) + assetSales
    (8,796) = -12,761 = "Operating loss" impreso EXACTO (ebit). + netInterest (2,680-10,446=
    -7,766) = -20,527 = "Loss before taxation" impreso EXACTO. + tax (2,858) = -17,669 =
    officialPAT EXACTO. officialTotalExpenses = |expenses+nonCash| = 232,060 M = "Administrative
    expenses" impreso EXACTO.
Los dos cierran EXACTOS, sin residuo.
============================================================================
```

## Gestiones

_antes de Matthew Benham (data/gestiones/gb.js):_

```text
Benham tomó el control total en junio de 2012 (Bees United votó la transferencia); día 01 aproximado. Cliff Crown fue chairman; Benham es el dueño.
```

## 2023

### Ingresos

```text
2023: cargado por tools/cargar.mjs (2026-10-22) desde Clubes/Inglaterra/Brentford/brentford-group-accounts-2022-23.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Inglaterra/Brentford/brentford-group-accounts-2022-23.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Central Distributions | pág. 39, precedente |
| 2 | Commercial | pág. 39, precedente |
| 3 | Matchday | pág. 39, precedente |
| 4 | Other | pág. 39, precedente |
| 5 | Rents received | pág. 39, Claude 0.85 |
| 6 | Grant income | pág. 39, Jev 0.97 |
| 7 | Loan player revenue | pág. 39, Jev 0.97 |
| 8 | Other Income | pág. 39, Jev 0.99 |
| 9 | Gain on disposal of players' registrations | pág. 24, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Administrative expenses | pág. 24, precedente |
| 2 | Loss on sale of tangible fixed assets | pág. 24, precedente |

### Meta

```text
2023: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, caja-deuda --personal 2026-10-22): incluye = wages_squad. caja-deuda.mjs --personal --partir (TODO 351): el costo de personal (98.8, brentford-group-accounts-2022-23.md L1639) es mayor que cada fila global de gasto; el documento reparte los sueldos entre varias funciones y no dice cuánto va en cada una
tools/cargar.mjs (2026-10-22). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
incluidoEn: ajuste manual `incluye`: el documento junta estas categorías con otra línea.
```

## 2022

### Ingresos

```text
2022: cargado por tools/cargar.mjs (2026-10-22) desde Clubes/Inglaterra/Brentford/brentford-group-accounts-2021-22.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Inglaterra/Brentford/brentford-group-accounts-2021-22.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Central distributions | pág. 37, precedente |
| 2 | Commercial | pág. 37, precedente |
| 3 | Matchday | pág. 37, precedente |
| 4 | Other | pág. 37, precedente |
| 5 | Rents received | pág. 37, Claude 0.85 |
| 6 | Grant income | pág. 37, Jev 0.97 |
| 7 | Loan player revenue | pág. 37, Jev 0.97 |
| 8 | Other Income | pág. 37, Jev 0.99 |
| 9 | Gain on disposal of players' registrations | pág. 22, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Administrative expenses | pág. 22, precedente |
| 2 | Loss on disposal of tangible fixed assets | pág. 22, precedente |

### Meta

```text
2022: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, caja-deuda --personal 2026-10-22): incluye = wages_squad. caja-deuda.mjs --personal --partir (TODO 351): el costo de personal (68.152, brentford-group-accounts-2021-22.md L1507) es mayor que cada fila global de gasto; el documento reparte los sueldos entre varias funciones y no dice cuánto va en cada una
tools/cargar.mjs (2026-10-22). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
incluidoEn: ajuste manual `incluye`: el documento junta estas categorías con otra línea.
```

## Fuentes

### brentford-gb-group-accounts-2024

_note (data/):_

```text
PDF con texto nativo (no escaneo), transcripción completa en Clubes/Inglaterra/Brentford/brentford-group-accounts-2023-24.md. La Nota de intereses pagados imprime un total (£6.020M) que no reconcilia con el resto del documento — se usó £5.020M (suma exacta de sus 2 componentes, y el único valor que hace cerrar Loss before taxation), ver comentario de cabecera de data/gb/brentford-gb-data.js. No se encontró un tipo de cambio GBP/USD propio declarado — fxRef apunta a FX_CLOSE (GBP@2024-06-30).
```

### brentford-gb-group-accounts-2025

_note (data/):_

```text
PDF con texto nativo (no escaneo), transcripción completa en Clubes/Inglaterra/Brentford/brentford-group-accounts-2024-25.md. fxRef apunta a FX_CLOSE (GBP@2025-06-30).
```

### brentford-gb-group-accounts-2021-22

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-19) desde la transcripción Clubes/Inglaterra/Brentford/brentford-group-accounts-2021-22.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.
```

### brentford-gb-group-accounts-2022-23

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-19) desde la transcripción Clubes/Inglaterra/Brentford/brentford-group-accounts-2022-23.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.
```

## Otros

### brentfordGbPasesData

```text
Mercado de pases / Resultados deportivos / Títulos: NO onboardeados (alcance de esta sesión fue
solo Finanzas, 2 ejercicios). Vacíos a propósito, mismo criterio que otros clubes onboardeados
solo para Finanzas.
```

### gestionesByClub['brentford-gb']

```text
gestionId 'benham': Matthew Benham confirmado como "controlling party" en la Nota de partes
relacionadas de los 2 documentos. El rango firstYear/lastYear refleja SOLO los ejercicios
efectivamente cargados (2024-2025).
```
