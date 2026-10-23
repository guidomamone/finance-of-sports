# fulham-gb — evidencia de carga

Lo que había como comentario en `data/gb/fulham-gb-data.js`, movido tal cual por `tools/archivo/mover-comentarios-data.mjs` (la regla:
`Admin/CONVENCIONES-DATOS.md`, "data/<país>/<club>-data.js NO LLEVA COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y
meta. Las notas de cada fila van en una tabla con su número de fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
============================================================================
data/gb/fulham-gb-data.js — Fulham (Inglaterra, Premier League), clubId 'fulham-gb'.

Fuente: "Full accounts" (NO group accounts) de Fulham Football Club Limited (Companies House n°
02114486), auditadas, depositadas en Companies House UK. 2 ejercicios, ambos cerrados el 30 de
junio:
  2024: temporada 2023-24, terminó 13°. Transcripción:
        Clubes/Inglaterra/Fulham/fulham-full-accounts-2023-24.md
  2025: temporada 2024-25, terminó 11°. Transcripción:
        Clubes/Inglaterra/Fulham/fulham-full-accounts-2024-25.md

amountNative en millones de GBP nativos. revenue positivo, expense NEGATIVO. fxRef porque
ninguno de los 2 documentos declara un tipo de cambio propio.

POR QUÉ "FULL ACCOUNTS" Y NO "GROUP ACCOUNTS" (a diferencia de la mayoría de los clubes ingleses
ya cargados): Fulham Football Club Limited NO tiene subsidiarias propias (Nota 18 de ambos
documentos), es standalone. El préstamo de £125m con JPMorgan Chase Bank (julio 2024, para
completar el Riverside Stand) y todo el CAPEX de esa obra están registrados en Fulham Stadium
Limited, una compañía HERMANA — fuera de alcance de este documento, no una omisión. La Nota 11
(Creditors) de los 2 ejercicios no tiene ninguna línea "Borrowings"/deuda bancaria.

"Central Awards" + "Broadcasting" van las dos a `broadcasting`: la política contable 1.12 las
describe como las 2 mitades de la misma frase ("Broadcasting revenue can be recognised in two
parts"), no dos conceptos distintos.

"Compensation" (£0,873m 2024 / £4,013m 2025): "sums from collaboration agreements with other
Clubs and remediation of lost income" — no encaja limpio en ninguna categoría, va a `other_income`
(catch-all). Duda genuina en Admin/dudas-por-club.md.

GROSSDEBT (revisado 2026-10-20 con la regla grossDebt de la Auditora: se mantiene, la nota de empresa en funcionamiento 2023-24 lo llama "unsecured loan with its immediate parent company"): Fulham FC Limited no tiene ninguna nota "Borrowings" en ningún ejercicio. La única
partida deuda-like es "Amounts due to immediate parent company" (préstamo del dueño, SIN interés,
"repayable on demand", que se convierte en acciones): £44,398m (2024), £0 (2025, todo convertido
a equity en el año). Se usa ese valor tentativamente — duda genuina en Admin/dudas-por-club.md
sobre si corresponde tratarlo como deuda financiera real o excluirlo (es cuasi-equity, sin interés).

"Gate Receipts" 2025: la transcripción OCR trae un valor que no reconcilia contra el Turnover
total impreso (194.790) menos las otras 4 líneas (179.780) — se usa 15.010 (el valor
matemáticamente forzado por el total, consistente con un patrón de error OCR 1↔4 ya visto en el
documento 2023-24), duda anotada para confirmar contra el PDF original.

brandColor: NO resuelto — camiseta blanca ("The Whites"/"The Cottagers"), mismo bucket que
River/Vélez/Sevilla/Real Madrid/Valencia/Once Caldas (club-or-year-onboarding sección 3). `null`.
============================================================================
```

## 2025

### Ingresos

```text
Ejercicio 2025. Suma Turnover (5 líneas) = 194.790 exacto. Total = 235.825 = officialTotalRevenue.
```

### Gastos

```text
Ejercicio 2025. Suma componentes = -275.356 (subtotal impreso D&A da 63.220 vs 63.221 real,
redondeo de £1.000 de la propia fuente, inmaterial).
```

## 2024

### Ingresos

```text
Ejercicio 2024. Fuente: Note 2 "Turnover" + P&L (Profit on disposal of players' registrations).
Suma Turnover (5 líneas) = 181.559 exacto. Total = 218.918 = officialTotalRevenue.
```

### Gastos

```text
Ejercicio 2024. Fuente: Note 3 + Note 4 + Note 9. Suma = -251.022 = officialTotalExpenses.
```

## 2023

### Ingresos

```text
2023: cargado por tools/cargar.mjs (2026-10-23) desde Clubes/Inglaterra/Fulham/fulham-full-accounts-2022-23.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Inglaterra/Fulham/fulham-full-accounts-2022-23.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Gate Receipts | pág. 24, precedente |
| 2 | Central Awards | pág. 24, precedente |
| 3 | Broadcasting | pág. 24, precedente |
| 4 | Compensation | pág. 24, precedente |
| 5 | Sponsorship and other Commercial Activities | pág. 24, precedente |
| 6 | Profit on disposal of players' registrations | pág. 14, precedente |
| 7 | Profit on disposal of other assets | pág. 14, Jev 1 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Operating expenses before depreciation, amortisation & impairment | pág. 14, precedente |
| 2 | Depreciation of fixed assets | pág. 24, precedente |
| 3 | Amortisation of player registrations | pág. 24, precedente |

### Meta

```text
tools/caja-deuda.mjs --personal (2026-10-23): staffCost 139.064 (compuerta: documento anterior): estructura de la nota (la suma cierra): fulham-full-accounts-2022-23.md L1244 "(total sin rótulo: suma las filas de arriba)"
```

```text
2023: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, caja-deuda --personal 2026-10-23): incluye = wages_squad. caja-deuda.mjs --personal --partir (TODO 351): el costo de personal (139.064, fulham-full-accounts-2022-23.md L1244) es mayor que cada fila global de gasto; el documento reparte los sueldos entre varias funciones y no dice cuánto va en cada una
tools/cargar.mjs (2026-10-23). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
incluidoEn: ajuste manual `incluye`: el documento junta estas categorías con otra línea.
```

## 2022

### Ingresos

```text
2022: cargado por tools/cargar.mjs (2026-10-23) desde Clubes/Inglaterra/Fulham/fulham-full-accounts-2021-22.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Inglaterra/Fulham/fulham-full-accounts-2021-22.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Gate Receipts | pág. 24, precedente |
| 2 | Central Awards | pág. 24, precedente |
| 3 | Broadcasting | pág. 24, precedente |
| 4 | Compensation | pág. 24, precedente |
| 5 | Sponsorship and other Commercial Activities | pág. 24, precedente |
| 6 | Profit on disposal of players' registrations | pág. 14, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Operating expenses before depreciation, amortisation & impairment | pág. 14, precedente |
| 2 | - Owned fixed assets | pág. 24, precedente |
| 3 | Amortisation of player registrations | pág. 24, precedente |
| 4 | Impairment | pág. 14, precedente |

### Meta

```text
tools/caja-deuda.mjs --personal (2026-10-23): staffCost 90.36 (compuerta: documento siguiente): estructura de la nota (la suma cierra): fulham-full-accounts-2021-22.md L962 "(total sin rótulo: suma las filas de arriba)"
```

```text
2022: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-19): cierre = 2022-06-30. El .md dice 'For the year ended 30 June 2022'; el 28/03/2023 es el sello de presentación en Companies House, no el cierre
2022: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-19): estado = b2. El estado de resultados (Profit and Loss Account and Other Comprehensive Income, pág. 14 del visor) es el bloque b2; el lote lo dejaba 'sin estado de resultados'
2022: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, caja-deuda --personal 2026-10-23): incluye = wages_squad. caja-deuda.mjs --personal --partir (TODO 351): el costo de personal (90.36, fulham-full-accounts-2021-22.md L962) es mayor que cada fila global de gasto; el documento reparte los sueldos entre varias funciones y no dice cuánto va en cada una
tools/cargar.mjs (2026-10-23). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
incluidoEn: ajuste manual `incluye`: el documento junta estas categorías con otra línea.
```

## 2021

### Ingresos

```text
2021: cargado por tools/cargar.mjs (2026-10-23) desde Clubes/Inglaterra/Fulham/fulham-full-accounts-2020-21.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Inglaterra/Fulham/fulham-full-accounts-2020-21.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Gate Receipts | pág. 24, precedente |
| 2 | Central Awards | pág. 24, precedente |
| 3 | Broadcasting | pág. 24, precedente |
| 4 | Compensation | pág. 24, precedente |
| 5 | Sponsorship and other Commercial Activities | pág. 24, precedente |
| 6 | Profit on disposal of players' registrations | pág. 14, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Operating expenses before depreciation, amortisation & impairment | pág. 14, precedente |
| 2 | - Owned fixed assets | pág. 24, Jev 0.99 |
| 3 | Amortisation of player registrations | pág. 24, precedente |
| 4 | Impairment | pág. 14, precedente |
| 5 | Loss on disposal of other assets | pág. 14, Jev 0.93 |

### Meta

```text
tools/caja-deuda.mjs --personal (2026-10-23): staffCost 113.871 (compuerta: documento siguiente): estructura de la nota (la suma cierra): fulham-full-accounts-2020-21.md L1171 "(total sin rótulo: suma las filas de arriba)"
```

```text
2021: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, caja-deuda --personal 2026-10-23): incluye = wages_squad. caja-deuda.mjs --personal --partir (TODO 351): el costo de personal (113.871, fulham-full-accounts-2020-21.md L1171) es mayor que cada fila global de gasto; el documento reparte los sueldos entre varias funciones y no dice cuánto va en cada una
tools/cargar.mjs (2026-10-23). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
incluidoEn: ajuste manual `incluye`: el documento junta estas categorías con otra línea.
```

## Fuentes

### fulham-gb-full-accounts-2024

_note (data/):_

```text
Cuentas de la sociedad individual (no consolida, no tiene subsidiarias), depositadas en Companies House (Reino Unido). El CAPEX y financiamiento del Riverside Stand viven en Fulham Stadium Limited, compañía hermana no incluida acá. Transcripción completa en Clubes/Inglaterra/Fulham/fulham-full-accounts-2023-24.md. Ver comentario de cabecera de data/gb/fulham-gb-data.js.
```

### fulham-gb-full-accounts-2025

_note (data/):_

```text
Transcripción completa en Clubes/Inglaterra/Fulham/fulham-full-accounts-2024-25.md. "Gate Receipts" de este ejercicio tiene un valor forzado por el total (ver duda de OCR en Admin/dudas-por-club.md).
```

### fulham-gb-full-accounts-2020-21

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-19) desde la transcripción Clubes/Inglaterra/Fulham/fulham-full-accounts-2020-21.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### fulham-gb-full-accounts-2022-23

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-19) desde la transcripción Clubes/Inglaterra/Fulham/fulham-full-accounts-2022-23.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### fulham-gb-full-accounts-2021-22

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-20) desde la transcripción Clubes/Inglaterra/Fulham/fulham-full-accounts-2021-22.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```
