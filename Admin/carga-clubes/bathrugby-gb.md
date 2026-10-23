# bathrugby-gb — evidencia de carga

Lo que antes iba como comentario en el data file del club, `data/<país>/bathrugby-gb-data.js` (la regla: `Admin/CONVENCIONES-DATOS.md`, "data/<país>/<club>-data.js NO LLEVA
COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y meta. Las notas de cada fila van en una tabla con su número de
fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
Bath Rugby: alta por tools/alta-club.mjs (2026-10-21) desde Clubes/Inglaterra/Bath Rugby/bath-rugby-full-accounts-2020-21.pdf. brandColor AUSENTE a propósito
(nadie lo chequeó todavía: club-or-year-onboarding/club-nuevo.md, identidad primero).
```

```text
data/gb/bathrugby-gb-data.js — Bath Rugby Limited (Inglaterra).
ALTA POR SCRIPT (tools/alta-club.mjs, 2026-10-21), SIN EJERCICIOS CARGADOS TODAVÍA: las estructuras del data file
nacen vacías a propósito. Los rubros, los totales oficiales y el resto del fiscalYearMeta los agrega la etapa de carga.

Documento que originó el alta: Clubes/Inglaterra/Bath Rugby/bath-rugby-full-accounts-2020-21.pdf

De dónde salió cada campo (estado según alta-club.mjs: ok / pendiente):
  id                 ok        "bathrugby-gb" — slug de "Bath Rugby" + '-gb' (convención de clubId, Admin/CONVENCIONES.md Versión 129)
  name               ok        "Bath Rugby Limited" — la portada y lo más frecuente del .md coinciden (32 veces)
  displayName        ok        "Bath Rugby" — nombre de la carpeta del club en Clubes/
  country            ok        "GB" — carpeta de país "Inglaterra" (tabla PAISES)
  reportingCurrency  ok        "GBP" — moneda de curso legal de Inglaterra
  fiscalYearStart    ok        "07-01" — cierre del ejercicio: contenido del .md (43 de 44 fechas de fin de mes caen en el mes 6)
  sport              ok        "rugby" — la liga gb-premiershiprugby del catálogo (data/leagues.js) es de rugby
  brandColor         pendiente (ausente) — la liga del club no está en tools/brand-color-reference/ (o el club no está en footylogos)
  anio               ok        2021 — nombre del archivo (misma regla que onboard.mjs --quien), confirmado por las fechas de cierre del .md
  cierre             ok        "2021-06-30" — año del ejercicio + mes de cierre (contenido del .md (43 de 44 fechas de fin de mes caen en el mes 6))
  reportType         ok        "official_balance_sheet" — el .md tiene un estado contable (resultados / balance) y el nombre del archivo no sugiere otro tipo
  perimetro          ok        "individual" — el .md no presenta estados consolidados (0 menciones de "consolidado")
  currency           ok        "GBP" — moneda de curso legal de Inglaterra (tabla PAISES de alta-club.mjs)
  fxRef              ok        "GBP@2021-06-30" — el documento no declara tipo de cambio; FX_CLOSE ya tiene GBP@2021-06-30 = 0.723641 (Tipo spot del Bank of England al 2021-06-30)
  sourceId           ok        "bathrugby-gb-full-accounts-2020-21" — clubId + nombre del archivo en slug
  liga               ok        "gb-premiershiprugby" — data/club-leagues/gb.js ya tiene la fila

FISCAL YEAR META PROPUESTO para 2021 (NO registrado: un ejercicio con meta y
sin rubros se vería en el sitio como un año en cero, y "sin dato no es cero"):
  2021: {"reportType":"official_balance_sheet","currency":"GBP","fxRef":"GBP@2021-06-30","sourceId":"bathrugby-gb-full-accounts-2020-21"}
```

## 2025

### Ingresos

```text
2025: cargado por tools/cargar.mjs (2026-10-21) desde Clubes/Inglaterra/Bath Rugby/bath-rugby-medium-company-accounts-2024-25.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Inglaterra/Bath Rugby/bath-rugby-medium-company-accounts-2024-25.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Central income | pág. 6, precedente |
| 2 | Gate receipts | pág. 6, precedente |
| 3 | Commercial activities | pág. 6, precedente |
| 4 | Other income | pág. 6, precedente |
| 5 | Diferencia en el documento | pág. 20, precedente |
| 6 | Other operating income | pág. 20, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Cost of sales | pág. 20, precedente |
| 2 | Administrative expenses | pág. 20, precedente |

### Meta

```text
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-21): filas-a-mano. Claude 2026-10-21 (tokens de sesión): ubicación y filas armadas a mano desde el .md con tools/armar-a-mano.mjs
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-21): desglose = 39,778. 248, decisión 11 del plan (ok de Guido): los ingresos por tipo están solo en el Strategic Report, en £m con un decimal (suman 23,3); el Turnover del estado es 23.339.778. La diferencia de redondeo va como fila aparte para que el ingreso cierre al peso.
tools/cargar.mjs (2026-10-21). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee.
```

```text
tools/caja-deuda.mjs (2026-10-21): cash escalón 1 (compuerta: documento anterior): "Cash at bank and in hand" pág. 21
```

```text
tools/caja-deuda.mjs --personal (2026-10-23): staffCost 14.627513 (compuerta: estructura de la nota): estructura de la nota (la suma cierra): bath-rugby-medium-company-accounts-2024-25.md L1132 "(total sin rótulo: suma las filas de arriba)"
```

## 2024

### Ingresos

```text
2024: cargado por tools/cargar.mjs (2026-10-21) desde Clubes/Inglaterra/Bath Rugby/bath-rugby-full-accounts-2023-24.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Inglaterra/Bath Rugby/bath-rugby-full-accounts-2023-24.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Central income | pág. 5, precedente |
| 2 | Gate receipts | pág. 5, precedente |
| 3 | Commercial activities | pág. 5, precedente |
| 4 | Other income | pág. 5, precedente |
| 5 | Diferencia en el documento | pág. 22, precedente |
| 6 | Other operating income | pág. 22, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Cost of sales | pág. 22, precedente |
| 2 | Administrative expenses | pág. 22, precedente |

### Meta

```text
2024: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-21): filas-a-mano. Claude 2026-10-21 (tokens de sesión): ubicación y filas armadas a mano desde el .md con tools/armar-a-mano.mjs
2024: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-21): desglose = 22,985. 248, decisión 11 del plan (ok de Guido): los ingresos por tipo están solo en el Strategic Report, en £m con un decimal (suman 20,8); el Turnover del estado es 20.822.985. La diferencia de redondeo va como fila aparte para que el ingreso cierre al peso.
tools/cargar.mjs (2026-10-21). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee.
```

```text
tools/caja-deuda.mjs (2026-10-21): grossDebt escalón 1b (compuerta: documento anterior): "Creditors: Amounts falling due after more than one" pág. 23; cash escalón 1 (compuerta: documento siguiente): "Cash at bank and in hand" pág. 23
```

## 2023

### Ingresos

```text
2023: cargado por tools/cargar.mjs (2026-10-21) desde Clubes/Inglaterra/Bath Rugby/bath-rugby-full-accounts-2022-23.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Inglaterra/Bath Rugby/bath-rugby-full-accounts-2022-23.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Central income | pág. 6, precedente |
| 2 | Gate receipts | pág. 6, precedente |
| 3 | Commercial activities | pág. 6, precedente |
| 4 | CVC income | pág. 6, precedente |
| 5 | Other income | pág. 6, precedente |
| 6 | Diferencia en el documento | pág. 19, precedente |
| 7 | Miscellaneous other operating income | pág. 28, Claude 0.9 |
| 8 | Other revenue | pág. 28, Claude 0.9 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Cost of sales | pág. 19, precedente |
| 2 | Administrative expenses | pág. 19, precedente |

### Meta

```text
2023: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-21): filas-a-mano. Claude 2026-10-21 (tokens de sesión): ubicación y filas armadas a mano desde el .md con tools/armar-a-mano.mjs
2023: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-21): desglose = 44,435. 248, decisión 11 del plan (ok de Guido): los ingresos por tipo están solo en el Strategic Report, en £m con un decimal (suman 19,7); el Turnover del estado es 19.744.435. La diferencia de redondeo va como fila aparte para que el ingreso cierre al peso.
tools/cargar.mjs (2026-10-21). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee.
```

```text
tools/caja-deuda.mjs --personal (2026-10-23): staffCost 14.885763 (compuerta: documento siguiente): estructura de la nota (la suma cierra): bath-rugby-full-accounts-2022-23.md L1046 "(total sin rótulo: suma las filas de arriba)"
```

## 2022

### Ingresos

```text
2022: cargado por tools/cargar.mjs (2026-10-21) desde Clubes/Inglaterra/Bath Rugby/bath-rugby-full-accounts-2021-22.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Inglaterra/Bath Rugby/bath-rugby-full-accounts-2021-22.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Central income | pág. 5, Claude 0.9 |
| 2 | Gate receipts | pág. 5, Claude 0.9 |
| 3 | Commercial activities | pág. 5, Claude 0.9 |
| 4 | CVC income | pág. 5, Claude 0.9 |
| 5 | Other income | pág. 5, Claude 0.9 |
| 6 | Diferencia en el documento | pág. 17, precedente |
| 7 | Fair value movements | pág. 17, precedente |
| 8 | Other operating income | pág. 17, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Cost of sales | pág. 17, precedente |
| 2 | Administrative expenses | pág. 17, precedente |

### Meta

```text
2022: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-21): filas-a-mano. Claude 2026-10-21 (tokens de sesión): ubicación y filas armadas a mano desde el .md con tools/armar-a-mano.mjs
2022: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-21): desglose = 19,557. 248, decisión 11 del plan (ok de Guido): los ingresos por tipo están solo en el Strategic Report, en £m con un decimal (suman 19,8); el Turnover del estado es 19.819.557. La diferencia de redondeo va como fila aparte para que el ingreso cierre al peso.
tools/cargar.mjs (2026-10-21). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee.
```

```text
tools/caja-deuda.mjs (2026-10-21): grossDebt escalón 1b (compuerta: documento siguiente): "Creditors: Amounts falling due after more than one" pág. 18; cash escalón 1 (compuerta: documento siguiente): "Cash at bank and in hand" pág. 18
```

```text
tools/caja-deuda.mjs --personal (2026-10-23): staffCost 12.165369 (compuerta: documento siguiente): estructura de la nota (la suma cierra): bath-rugby-full-accounts-2021-22.md L968 "(total sin rótulo: suma las filas de arriba)"
```

## 2021

### Ingresos

```text
2021: cargado por tools/cargar.mjs (2026-10-21) desde Clubes/Inglaterra/Bath Rugby/bath-rugby-full-accounts-2020-21.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Inglaterra/Bath Rugby/bath-rugby-full-accounts-2020-21.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Turnover | pág. 11, Claude 0.9 |
| 2 | Fair value movements | pág. 11, Claude 0.9 |
| 3 | Other operating income | pág. 11, Claude 0.9 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Cost of sales | pág. 11, Claude 0.9 |
| 2 | Administrative expenses | pág. 11, Claude 0.9 |

### Meta

```text
2021: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-21): filas-a-mano. Claude 2026-10-21 (tokens de sesión): ubicación y filas armadas a mano desde el .md con tools/armar-a-mano.mjs
tools/cargar.mjs (2026-10-21). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee.
```

```text
tools/dentro-de-otro.mjs (2026-10-21): posiblemente dentro de otro rubro, por precedente del club (la fila tiene plata en sus balances desglosados 2022, 2023, 2024, 2025)
```

```text
tools/caja-deuda.mjs --personal (2026-10-23): staffCost 11.915009 (compuerta: documento siguiente): estructura de la nota (la suma cierra): bath-rugby-full-accounts-2020-21.md L779 "(total sin rótulo: suma las filas de arriba)"
```

### Liga

```text
alta-club.mjs (2026-10-21): gb-premiershiprugby, verificado contra data/club-leagues/gb.js ya tiene la fila.
```

## Fuentes

### bathrugby-gb-full-accounts-2020-21

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-21) desde la transcripción Clubes/Inglaterra/Bath Rugby/bath-rugby-full-accounts-2020-21.md; categorías del pipeline (sesión (Claude Code)). Perímetro: individual.
```

### bathrugby-gb-full-accounts-2021-22

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-21) desde la transcripción Clubes/Inglaterra/Bath Rugby/bath-rugby-full-accounts-2021-22.md; categorías del pipeline (sesión (Claude Code)). Perímetro: individual.
```

### bathrugby-gb-full-accounts-2022-23

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-21) desde la transcripción Clubes/Inglaterra/Bath Rugby/bath-rugby-full-accounts-2022-23.md; categorías del pipeline (sesión (Claude Code)). Perímetro: individual.
```

### bathrugby-gb-full-accounts-2023-24

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-21) desde la transcripción Clubes/Inglaterra/Bath Rugby/bath-rugby-full-accounts-2023-24.md; categorías del pipeline (sesión (Claude Code)). Perímetro: individual.
```

### bathrugby-gb-medium-company-accounts-2024-25

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-21) desde la transcripción Clubes/Inglaterra/Bath Rugby/bath-rugby-medium-company-accounts-2024-25.md; categorías del pipeline (sesión (Claude Code)). Perímetro: individual.
```
