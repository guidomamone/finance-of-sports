# leeds-gb — evidencia de carga

Lo que había como comentario en `data/gb/leeds-gb-data.js`, movido tal cual por `tools/archivo/mover-comentarios-data.mjs` (la regla:
`Admin/CONVENCIONES-DATOS.md`, "data/<país>/<club>-data.js NO LLEVA COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y
meta. Las notas de cada fila van en una tabla con su número de fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
============================================================================
data/gb/leeds-gb-data.js — Leeds United (Inglaterra, Championship), clubId 'leeds-gb'.

Fuente: "Consolidated Financial Statements" (cuentas de GRUPO) de Leeds United Football Club
Limited (Companies House n° 06233875), auditadas por Gibson Booth, depositadas en Companies
House UK. 2 ejercicios, ambos cerrados el 30 de junio:
  2024: temporada 2023-24, Championship (perdió la final del playoff ante Southampton).
        Transcripción: Clubes/Inglaterra/Leeds United/leeds-group-accounts-2023-24.md
  2025: temporada 2024-25, Championship (campeón, 100 puntos, ascendido a Premier League para
        2025/26 — temporada NO cubierta por este ejercicio). Transcripción:
        Clubes/Inglaterra/Leeds United/leeds-group-accounts-2024-25.md

OJO LIGA (verificado con WebSearch, no asumido): Leeds jugó Championship en LOS DOS ejercicios.
Descendió de Premier League al cierre de 2022/23; el propio balance de 2024 dice literal "would
remain in the Championship for the 2024/25 season", y el de 2025 dice "the main objective for the
2024/25 Sky Bet Championship campaign was to secure promotion". El ascenso a Premier League es
RESULTADO del ejercicio 2025, para la temporada 2025/26 (no cargada acá).

amountNative en millones de GBP nativos. revenue positivo, expense NEGATIVO. fxRef porque ninguno
de los 2 documentos declara un tipo de cambio propio.

"Television and broadcasting income + Central distributions": incluye EFL basic award +
solidarity payment de la Premier League + parachute payments (por el descenso reciente) — todo a
`broadcasting`, es la naturaleza de la distribución, no depende de si la paga la EFL o la PL.

"Educational services" (Leeds United College Limited, subsidiaria): -> `education` (colegio del
club, categoría dedicada desde la Versión 189 de category-map.js).

"Gain on disposal of players' registrations" es una línea NETA del P&L (no bruto), se suma al
revenue total.

"Other operating expenses" es un residual SIN desglose propio en la fuente: (Cost of sales +
Administrative expenses) menos las 4 líneas ya identificadas. En 2024 incluye además la
amortización NO-jugador (goodwill/trademarks/software, £0.231457m). En 2025 esa misma amortización
no-jugador queda NETEADA contra el reverso de "negative goodwill" (-£0.921580m), dando un CRÉDITO
neto de -£0.651431m que también quedó absorbido en este residual en vez de crear una línea propia
con signo positivo — duda anotada en Admin/dudas-por-club.md sobre el criterio para casos futuros
de negative goodwill.

GROSSDEBT/CASH: Nota 24 "Analysis of changes in net debt" (Debt due within one year + due after
one year), reconcilia EXACTO con el "net debt" que el propio documento imprime en esa misma nota.

PROPIEDAD: 49ers Enterprises Global Football Group LLC (Paraag Marathe, Chairman). En FY2024 hubo
cambio de control DENTRO del ejercicio: Aser Group Holding/Andrea Radrizzani controlaban hasta el
25/9/2023 (~3 meses), luego 49ers Enterprises asumió control total (~9 meses restantes, dueño al
cierre). Se usa un solo gestionId para todo FY2024 (49ers, dueño ~75% del año y al cierre) —
simplificación anotada como duda.

brandColor: `null` — camiseta íntegramente blanca desde los 60 ("all-white strip in the style of
Real Madrid"), mismo bucket que River/Vélez/Sevilla/Real Madrid/Valencia/Once Caldas/Fulham.
============================================================================
```

## 2025

### Ingresos

```text
Ejercicio 2025. Turnover puro = 136.989330 exacto. Total = 161.755178 = officialTotalRevenue.
```

### Gastos

```text
Ejercicio 2025. Suma = -205.390711 exacto.
```

### Meta

```text
Nota 24: Debt due within one year 22.958559 + due after one year 35.866370 = 58.824929,
reconcilia exacto con cash-grossDebt=-24.872264.
```

## 2024

### Ingresos

```text
Ejercicio 2024. Fuente: Nota 4 "Turnover" + P&L (gain on disposal). Turnover puro (6 líneas) =
127.558280 exacto. Con el gain, total = 161.252569 = officialTotalRevenue.
```

### Gastos

```text
Ejercicio 2024. Suma = -203.811855 exacto = -(Cost of sales + Administrative expenses) impreso.
```

### Meta

```text
Nota 24 "Analysis of changes in net debt": Debt due within one year 37.177167 + due after one
year 23.120370 = 60.297537, reconcilia EXACTO con cash-grossDebt=-55.288543 impreso.
```

## 2023

### Ingresos

```text
2023: cargado por tools/cargar.mjs (2026-10-20) desde Clubes/Inglaterra/Leeds United/leeds-group-accounts-2022-23.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Inglaterra/Leeds United/leeds-group-accounts-2022-23.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Gate receipts | pág. 22, precedente |
| 2 | Television and broadcasting income | pág. 22, Jev 1 |
| 3 | Merchandising income | pág. 22, precedente |
| 4 | Central distributions | pág. 22, Jev 1 |
| 5 | Other commercial revenue | pág. 22, precedente |
| 6 | Catering income | pág. 22, precedente |
| 7 | Educational services | pág. 22, precedente |
| 8 | Gain on disposal of players' registrations | pág. 13, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Cost of sales | pág. 13, precedente |
| 2 | Administrative expenses | pág. 13, Jev 1 |

### Meta

```text
tools/cargar.mjs (2026-10-20). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
tools/cargar.mjs (2026-10-20): gb-premierleague, verificado contra roster cacheado de "2022–23 Premier League" (tools/club-league-reference/gb.json), coincidencia exacta "Leeds United".
```

## 2022

### Ingresos

```text
2022: cargado por tools/cargar.mjs (2026-10-20) desde Clubes/Inglaterra/Leeds United/leeds-group-accounts-2021-22.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Inglaterra/Leeds United/leeds-group-accounts-2021-22.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Gate receipts | pág. 22, precedente |
| 2 | Television and broadcasting income | pág. 22, Jev 1 |
| 3 | Merchandising income | pág. 22, precedente |
| 4 | Central distributions | pág. 22, Jev 1 |
| 5 | Other commercial revenue | pág. 22, precedente |
| 6 | Catering income | pág. 22, precedente |
| 7 | Educational services | pág. 22, precedente |
| 8 | Other operating income | pág. 13, Jev 0.99 |
| 9 | Gain/ (loss) on disposal of players' registrations | pág. 13, Jev 0.98 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Cost of sales | pág. 13, precedente |
| 2 | Administrative expenses | pág. 13, Jev 1 |
| 3 | Settlement of transfer dispute | pág. 13, ? 0.6 |

### Meta

```text
tools/cargar.mjs (2026-10-20). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
tools/cargar.mjs (2026-10-20): gb-premierleague, verificado contra roster cacheado de "2021–22 Premier League" (tools/club-league-reference/gb.json), coincidencia exacta "Leeds United".
```

## 2020

### Ingresos

```text
2020: cargado por tools/cargar.mjs (2026-10-20) desde Clubes/Inglaterra/Leeds United/leeds-group-accounts-2019-20.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Inglaterra/Leeds United/leeds-group-accounts-2019-20.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Turnover | pág. 10, Jev 0.99 |
| 2 | Other operating income | pág. 10, Jev 0.99 |
| 3 | Gain on disposal of players' registrations | pág. 10, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Cost of sales | pág. 10, precedente |
| 2 | Administrative expenses | pág. 10, Jev 1 |
| 3 | Television and broadcasting rebate | pág. 10, precedente |

### Meta

```text
tools/cargar.mjs (2026-10-20). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee.
```

```text
tools/dentro-de-otro.mjs (2026-10-20): posiblemente dentro de otro rubro, por precedente del club (la fila tiene plata en sus balances desglosados 2019, 2022, 2023, 2024, 2025): Comercial / Sponsors, Estadio, Televisión
```

### Liga

```text
tools/cargar.mjs (2026-10-20): gb-championship, verificado contra roster cacheado de "2019–20 EFL Championship" (tools/club-league-reference/gb.json), coincidencia exacta "Leeds United".
```

## 2019

### Ingresos

```text
2019: cargado por tools/cargar.mjs (2026-10-20) desde Clubes/Inglaterra/Leeds United/leeds-group-accounts-2018-19.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Inglaterra/Leeds United/leeds-group-accounts-2018-19.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Gate receipts | pág. 19, precedente |
| 2 | Television and broadcasting income | pág. 19, Jev 1 |
| 3 | Merchandising income | pág. 19, precedente |
| 4 | Central distributions | pág. 19, Jev 1 |
| 5 | Other commercial revenue | pág. 19, precedente |
| 6 | Catering income | pág. 19, precedente |
| 7 | Other operating income | pág. 10, Jev 0.99 |
| 8 | Gain on disposal of players' registrations | pág. 10, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Cost of sales | pág. 10, precedente |
| 2 | Administrative expenses | pág. 10, Jev 1 |

### Meta

```text
tools/cargar.mjs (2026-10-20). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
tools/cargar.mjs (2026-10-20): gb-championship, verificado contra roster cacheado de "2018–19 EFL Championship" (tools/club-league-reference/gb.json), coincidencia exacta "Leeds United".
```

## Fuentes

### leeds-gb-group-accounts-2024

_note (data/):_

```text
Cuentas consolidadas del grupo, auditadas por Gibson Booth, depositadas en Companies House (Reino Unido). Championship (no Premier League), verificado contra el propio documento y WebSearch. Transcripción completa en Clubes/Inglaterra/Leeds United/leeds-group-accounts-2023-24.md. Ver comentario de cabecera de data/gb/leeds-gb-data.js.
```

### leeds-gb-group-accounts-2025

_note (data/):_

```text
Transcripción completa en Clubes/Inglaterra/Leeds United/leeds-group-accounts-2024-25.md.
```

### leeds-gb-group-accounts-2018-19

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-20) desde la transcripción Clubes/Inglaterra/Leeds United/leeds-group-accounts-2018-19.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.
```

### leeds-gb-group-accounts-2019-20

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-20) desde la transcripción Clubes/Inglaterra/Leeds United/leeds-group-accounts-2019-20.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.
```

### leeds-gb-group-accounts-2021-22

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-20) desde la transcripción Clubes/Inglaterra/Leeds United/leeds-group-accounts-2021-22.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.
```

### leeds-gb-group-accounts-2022-23

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-20) desde la transcripción Clubes/Inglaterra/Leeds United/leeds-group-accounts-2022-23.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.
```

## Gestiones (Finanzas 5, 2026-10-19)

- Andrea Radrizzani, Chairman, 2017-05-23 (compra del 100 % a Cellino; tenía el 50 % desde enero de 2017) a 2023-07-18 (venta a 49ers Enterprises, con la entrada de Marathe). Wikipedia no da fechas del cargo de Chairman como tal: el inicio es el de la compra total y el fin, el de la venta. Cubre el cierre 2020-07-31.
