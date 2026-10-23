# chelsea-gb — evidencia de carga

Lo que había como comentario en `data/gb/chelsea-gb-data.js`, movido tal cual por `tools/archivo/mover-comentarios-data.mjs` (la regla:
`Admin/CONVENCIONES-DATOS.md`, "data/<país>/<club>-data.js NO LLEVA COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y
meta. Las notas de cada fila van en una tabla con su número de fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
============================================================================
data/gb/chelsea-gb-data.js — Chelsea (Inglaterra, Premier League), clubId 'chelsea-gb'.

Fuente: cuentas consolidadas de Chelsea FC Holdings Limited (Companies House n° 02536231),
único ejercicio disponible: cerrado 30/6/2025 (temporada 2024-25). Transcripción completa en
Clubes/Inglaterra/Chelsea/chelsea-fc-holdings-group-accounts-2024-25.md (3079 líneas, texto
nativo, sin necesidad de OCR).

amountNative en millones de GBP nativos. revenue positivo, expense NEGATIVO. fxRef porque el
documento no declara un tipo de cambio propio.

PROPIEDAD: matriz inmediata Blueco 22 Midco Limited; matriz última Blues Investment Holdings
Parent, L.P. (Cayman Islands), consorcio liderado por Todd Boehly y Clearlake Capital.

OJO — LA VENTA DE LA ACADEMIA FEMENINA (Chelsea FC Women a Blueco 22 Midco, £200m, ganancia de
£198.7m) OCURRIÓ EN EL EJERCICIO 2023-24 (comparativo), NO EN ESTE (2024-25) — el propio
documento lo dice explícito (Nota 12: "recognised in the Group profit or loss account to 30 June
2024"). En el P&L de 2025 esa línea da £0. Lo único de partes vinculadas en este ejercicio es
menor: la venta de Kingsmeadow (antes de Chelsea FC Women) a la propia Chelsea FC Women Limited,
con una PÉRDIDA de £2.985m (no ganancia) dentro de "(Loss)/profit on disposal of fixed assets" ->
campo meta `assetSales`, no revenueLine.

"Cost of sales" (£428.673m) SIN desglose de wages vs. resto en ninguna nota — a diferencia de
Everton/Arsenal, que sí tienen una línea "Staff costs" propia. Se cargó a `wages_squad` completo
(aproximación más fiel al texto narrativo, que dice explícito que el aumento de esta línea es
"principally... increased cost of sales including player wages"), pero es una decisión discutible
— duda anotada en Admin/dudas-por-club.md.

"Amortisation and impairment of players' registrations" es la columna combinada tal cual la
imprime el P&L account (-224.344) — la Nota 6 la desglosa en amortización (213.893) + deterioro
(12.097) = 225.990, un gap de £1.646m (0,7%) no explicado en el documento. Se usó el número del
P&L porque es el único que hace cerrar Gross profit -> Operating loss -> PAT exacto — duda anotada.

GROSSDEBT: Chelsea no tiene ninguna línea "Bank loans"/"Borrowings" en el balance. Lo único
remotamente "deuda" son trade creditors por pases de jugadores a pagar (£396.135m) y "amounts
owed to group undertakings" (£0 al cierre 2025). Se usa `grossDebt:0` (criterio estricto de
excluir trade creditors, club-data-mapping/referencia/formato-simplificado.md) — duda anotada sobre si conviene el
tratamiento alternativo (tratar transfer fees payable como deuda económica real).
============================================================================
```

## 2025

### Ingresos

```text
Ejercicio 2025. Fuente: Nota "Turnover" + P&L (Profit on disposal of player registrations).
Total Turnover impreso = 490.857. Con player_sales, total = 549.263 = officialTotalRevenue.
```

### Gastos

```text
Ejercicio 2025. Fuente: P&L account + Nota 5 "Impairment and other expenses" + Nota 6
"Operating loss". Suma = -799.514 (con exceptional_items) = -749.314 (sin, que es lo que compara
el motor) + -50.200 de exceptional_items.
```

### Meta

```text
assetSales = "(Loss)/profit on disposal of fixed assets" (venta de Kingsmeadow a Chelsea FC
Women Limited, related party). netInterest = interest receivable (11.149) - interest payable
(20.357). tax = Nota 13, "Total tax charge".
officialTotalExpenses EXCLUYE exceptional_items (-50.200), mismo criterio que el resto del
sitio desde Botafogo (el motor no los cuenta en verifyTieOuts() de Expenses, sino que llegan
al PAT por otro camino) — el total CON exceptionales que imprime el documento es £799,514m.
```

## Gestiones

_antes de Todd Boehly (data/gestiones/gb.js):_

```text
Boehly dejó la presidencia al vender su parte a Clearlake (anuncio del 16/9/2026). Desde entonces no se carga a nadie (Clearlake es un fondo).
```

## 2024

### Ingresos

```text
2024: cargado por tools/cargar.mjs (2026-10-19) desde Clubes/Inglaterra/Chelsea/chelsea-fc-holdings-group-accounts-2023-24.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Inglaterra/Chelsea/chelsea-fc-holdings-group-accounts-2023-24.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: -; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Broadcasting | pág. 36, precedente |
| 2 | Commercial | pág. 36, precedente |
| 3 | Matchday | pág. 36, precedente |
| 4 | Other operating income | pág. 21, Jev 0.99 |
| 5 | Profit on disposal of player registrations | pág. 21, precedente |
| 6 | Proceeds on sale of investment | pág. 44, Jev 0.99 |
| 7 | Profit on disposal of fixed assets | pág. 21, Jev 0.99 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Less: net assets of subsidiary on disposal | pág. 44, precedente |
| 2 | Cost of sales | pág. 21, precedente |
| 3 | Administrative expenses | pág. 21, precedente |
| 4 | Fair value loss on investment properties | pág. 21, Jev 0.96 |

### Meta

```text
tools/cargar.mjs (2026-10-19). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

```text
tools/caja-deuda.mjs --personal (2026-10-23): staffCost 338.021 (compuerta: estructura de la nota): estructura de la nota (la suma cierra): chelsea-fc-holdings-group-accounts-2023-24.md L1741 "(total sin rótulo: suma las filas de arriba)"
```

### Liga

```text
tools/cargar.mjs (2026-10-19): gb-premierleague, verificado contra roster cacheado de "2023–24 Premier League" (tools/club-league-reference/gb.json), coincidencia exacta "Chelsea".
```

## 2023

### Ingresos

```text
2023: cargado por tools/cargar.mjs (2026-10-19) desde Clubes/Inglaterra/Chelsea/chelsea-fc-holdings-group-accounts-2022-23.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Inglaterra/Chelsea/chelsea-fc-holdings-group-accounts-2022-23.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Broadcasting | pág. 36, precedente |
| 2 | Commercial | pág. 36, precedente |
| 3 | Matchday | pág. 36, precedente |
| 4 | Research and development tax credit | pág. 36, Jev 1 |
| 5 | Recharged costs (see Note 2) | pág. 36, Jev 0.99 |
| 6 | Settlement fee | pág. 36, Jev 0.96 |
| 7 | Profit on disposal of player registrations | pág. 21, precedente |
| 8 | Profit on disposal of fixed assets | pág. 21, Jev 0.99 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Cost of sales | pág. 21, precedente |
| 2 | Administrative expenses | pág. 21, precedente |

### Meta

```text
tools/cargar.mjs (2026-10-19). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
tools/cargar.mjs (2026-10-19): gb-premierleague, verificado contra roster cacheado de "2022–23 Premier League" (tools/club-league-reference/gb.json), coincidencia exacta "Chelsea".
```

## 2022

### Ingresos

```text
2022: cargado por tools/cargar.mjs (2026-10-19) desde Clubes/Inglaterra/Chelsea/chelsea-fc-holdings-group-accounts-2021-22.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Inglaterra/Chelsea/chelsea-fc-holdings-group-accounts-2021-22.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Broadcasting | pág. 32, precedente |
| 2 | Commercial | pág. 32, precedente |
| 3 | Matchday | pág. 32, precedente |
| 4 | Other operating income | pág. 18, Jev 0.99 |
| 5 | Profit on disposal of player registrations | pág. 18, precedente |
| 6 | Fair value gain/(loss) on investment properties | pág. 18, Jev 1 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Cost of sales | pág. 18, precedente |
| 2 | Administrative expenses | pág. 18, precedente |

### Meta

```text
2022: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-19): fila = 45. La extracción omitió esta fila del estado de resultados (L722, 45 en £000): sin ella el resultado da -121.327 y el impreso es -121.282
tools/cargar.mjs (2026-10-19). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
tools/cargar.mjs (2026-10-19): gb-premierleague, verificado contra roster cacheado de "2021–22 Premier League" (tools/club-league-reference/gb.json), coincidencia exacta "Chelsea".
```

## 2021

### Ingresos

```text
2021: cargado por tools/cargar.mjs (2026-10-19) desde Clubes/Inglaterra/Chelsea/chelsea-fc-holdings-group-accounts-2020-21.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Inglaterra/Chelsea/chelsea-fc-holdings-group-accounts-2020-21.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Broadcasting | pág. 31, precedente |
| 2 | Commercial | pág. 31, precedente |
| 3 | Matchday | pág. 31, precedente |
| 4 | Research and development tax credit | pág. 31, Jev 1 |
| 5 | Recharged costs | pág. 31, Jev 0.99 |
| 6 | Insurance claim | pág. 31, Jev 1 |
| 7 | Profit on disposal of player registrations | pág. 17, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Cost of sales | pág. 17, precedente |
| 2 | Administrative expenses | pág. 17, precedente |
| 3 | Exceptional administrative expenses | pág. 17, Claude 0.85 |
| 4 | Fair value loss on investment properties | pág. 17, Jev 0.96 |

### Meta

```text
tools/cargar.mjs (2026-10-19). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
tools/cargar.mjs (2026-10-19): gb-premierleague, verificado contra roster cacheado de "2020–21 Premier League" (tools/club-league-reference/gb.json), coincidencia exacta "Chelsea".
```

## 2020

### Ingresos

```text
2020: cargado por tools/cargar.mjs (2026-10-19) desde Clubes/Inglaterra/Chelsea/chelsea-fc-holdings-group-accounts-2019-20.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Inglaterra/Chelsea/chelsea-fc-holdings-group-accounts-2019-20.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Broadcasting | pág. 28, precedente |
| 2 | Commercial | pág. 28, precedente |
| 3 | Matchday | pág. 28, precedente |
| 4 | Profit on disposal of player registrations | pág. 14, precedente |
| 5 | Profit on disposal of tangible fixed assets | pág. 14, Jev 1 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Cost of sales | pág. 14, precedente |
| 2 | Administrative expenses | pág. 14, precedente |
| 3 | Exceptional administrative expenses | pág. 14, Claude 0.85 |
| 4 | Fair value loss on investment properties | pág. 14, Jev 0.96 |

### Meta

```text
tools/cargar.mjs (2026-10-19). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
tools/cargar.mjs (2026-10-19): gb-premierleague, verificado contra roster cacheado de "2019–20 Premier League" (tools/club-league-reference/gb.json), coincidencia exacta "Chelsea".
```

## Fuentes

### chelsea-gb-group-accounts-2025

_note (data/):_

```text
Cuentas consolidadas del grupo, depositadas en Companies House (Reino Unido). Transcripción completa en Clubes/Inglaterra/Chelsea/chelsea-fc-holdings-group-accounts-2024-25.md. Ver comentario de cabecera de data/gb/chelsea-gb-data.js para el detalle completo de categorización y las dudas abiertas (Cost of sales sin desglose, gap de amortización/deterioro, grossDebt).
```

### chelsea-gb-fc-holdings-group-accounts-2019-20

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-19) desde la transcripción Clubes/Inglaterra/Chelsea/chelsea-fc-holdings-group-accounts-2019-20.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.
```

### chelsea-gb-fc-holdings-group-accounts-2020-21

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-19) desde la transcripción Clubes/Inglaterra/Chelsea/chelsea-fc-holdings-group-accounts-2020-21.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.
```

### chelsea-gb-fc-holdings-group-accounts-2021-22

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-19) desde la transcripción Clubes/Inglaterra/Chelsea/chelsea-fc-holdings-group-accounts-2021-22.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### chelsea-gb-fc-holdings-group-accounts-2022-23

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-19) desde la transcripción Clubes/Inglaterra/Chelsea/chelsea-fc-holdings-group-accounts-2022-23.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### chelsea-gb-fc-holdings-group-accounts-2023-24

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-19) desde la transcripción Clubes/Inglaterra/Chelsea/chelsea-fc-holdings-group-accounts-2023-24.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

## Gestiones (Finanzas 5, 2026-10-19)

- Roman Abramovich, Dueño, 2003-07-01 a 2022-05-30 (cubre los cierres 2020 y 2021). El fin lo confirma el anuncio de la venta (2022-05-30). El inicio, el martes 1 de julio de 2003, sale de "takeover completed late Tuesday" (Daily Star, 2003-07-03: https://archive.thedailystar.net/2003/07/03/); Wikipedia dice solo "junio de 2003" y otra fuente el 2 de julio: el día no se confirmó, y no cambia a qué gestión pertenece ningún cierre cargado. Bruce Buck fue Chairman 2003-2022 (hasta 2022-06-30); el sitio registra al dueño, como en los demás clubes ingleses.
