# independientemedellin-co — evidencia de carga

Lo que antes iba como comentario en el data file del club, `data/<país>/independientemedellin-co-data.js` (la regla: `Admin/CONVENCIONES-DATOS.md`, "data/<país>/<club>-data.js NO LLEVA
COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y meta. Las notas de cada fila van en una tabla con su número de
fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
Independiente Medellin: alta por tools/alta-club.mjs (2026-10-26) desde Clubes/Colombia/Independiente Medellin/siis-estado-2025.pdf. brandColor AUSENTE a propósito
(nadie lo chequeó todavía: club-or-year-onboarding/club-nuevo.md, identidad primero).
```

```text
data/co/independientemedellin-co-data.js — Independiente Medellin (Colombia).
ALTA POR SCRIPT (tools/alta-club.mjs, 2026-10-26), SIN EJERCICIOS CARGADOS TODAVÍA: las estructuras del data file
nacen vacías a propósito. Los rubros, los totales oficiales y el resto del fiscalYearMeta los agrega la etapa de carga.

Documento que originó el alta: Clubes/Colombia/Independiente Medellin/siis-estado-2025.pdf

De dónde salió cada campo (estado según alta-club.mjs: ok / pendiente):
  id                 ok        "independientemedellin-co" — slug de "Independiente Medellin" + '-co' (convención de clubId, Admin/CONVENCIONES.md Versión 129)
  name               pendiente "Independiente Medellin" — no se encontró el nombre legal en el .md; se usa el nombre de la carpeta
  displayName        ok        "Independiente Medellin" — nombre de la carpeta del club en Clubes/
  country            ok        "CO" — carpeta de país "Colombia" (tabla PAISES)
  reportingCurrency  ok        "COP" — moneda de curso legal de Colombia
  fiscalYearStart    ok        "01-01" — cierre del ejercicio: patrón del país: los 18 clubes de CO ya cargados arrancan el 01-01 (el documento no trae fechas de cierre legibles)
  sport              ok        "futbol" — la liga co-primeraA del catálogo (data/leagues.js) es de futbol
  brandColor         pendiente (ausente) — tools/brand-color-reference/ (footylogos): [colombia] independiente medellin: #E91B29 red, #252C5E navy blue, #FFFFFF white
  anio               ok        2025 — nombre del archivo (misma regla que onboard.mjs --quien)
  cierre             ok        "2025-12-31" — año del ejercicio + mes de cierre (patrón del país: los 18 clubes de CO ya cargados arrancan el 01-01 (el documento no trae fechas de cierre legibles)
  reportType         ok        "official_balance_sheet" — el .md tiene un estado contable (resultados / balance) y el nombre del archivo no sugiere otro tipo
  perimetro          ok        "individual" — el .md no presenta estados consolidados (0 menciones de "consolidado")
  currency           ok        "COP" — moneda de curso legal de Colombia (tabla PAISES de alta-club.mjs)
  fxRef              ok        "COP@2025-12-31" — el documento no declara tipo de cambio; FX_CLOSE ya tiene COP@2025-12-31 = 3757.08 (TRM oficial (Superintendencia Financiera de Colombia) al 31/12/202
  sourceId           ok        "independientemedellin-co-siis-estado-2025" — clubId + nombre del archivo en slug
  liga               ok        "co-primeraA" — roster cacheado de "2025 Liga DIMAYOR" (tools/club-league-reference/co.json), coincidencia exacta "Independiente Medellín"

FISCAL YEAR META PROPUESTO para 2025 (NO registrado: un ejercicio con meta y
sin rubros se vería en el sitio como un año en cero, y "sin dato no es cero"):
  2025: {"reportType":"official_balance_sheet","currency":"COP","fxRef":"COP@2025-12-31","sourceId":"independientemedellin-co-siis-estado-2025"}
```

## 2025

### Ingresos

```text
2025: cargado por tools/cargar.mjs (2026-10-26) desde Clubes/Colombia/Independiente Medellin/siis-estado-2025.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Colombia/Independiente Medellin/siis-estado-2025.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Ingresos de actividades ordinarias | pág. 1, Jev 0.98 |
| 2 | Otros ingresos | pág. 1, Jev 0.98 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Costo de ventas | pág. 1, precedente |
| 2 | Gastos de ventas | pág. 1, Claude 0.82 |
| 3 | Gastos de administración | pág. 1, Jev 1 |
| 4 | Otros gastos | pág. 1, Jev 1 |

### Meta

```text
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-26): filas-a-mano. Claude 2026-10-26 (tokens de sesión): ubicación y filas armadas a mano desde el .md con tools/armar-a-mano.mjs
tools/cargar.mjs (2026-10-26). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"), con su tipo; la página marca «s/d» en las categorías que esa línea esconde y explica el caso en «Notas sobre este club».
```

```text
tools/caja-deuda.mjs (2026-10-27): grossDebt escalón S (compuerta: balance de SIIS cuadra): balance de SIIS (siis-estado-2025.json, miles de COP): otros pasivos financieros corrientes 3285768 + no corrientes 4101138; cash escalón S (compuerta: balance de SIIS cuadra): balance de SIIS (siis-estado-2025.json, miles de COP): efectivo y equivalentes = 1096951
```

### Liga

```text
alta-club.mjs (2026-10-26): co-primeraA, verificado contra roster cacheado de "2025 Liga DIMAYOR" (tools/club-league-reference/co.json), coincidencia exacta "Independiente Medellín".
```

## 2024

### Ingresos

```text
2024: cargado por tools/cargar.mjs (2026-10-26) desde Clubes/Colombia/Independiente Medellin/siis-estado-2024.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Colombia/Independiente Medellin/siis-estado-2024.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Ingresos de actividades ordinarias | pág. 1, Jev 0.98 |
| 2 | Otros ingresos | pág. 1, Jev 0.98 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Costo de ventas | pág. 1, precedente |
| 2 | Gastos de ventas | pág. 1, Claude 0.82 |
| 3 | Gastos de administración | pág. 1, Jev 1 |
| 4 | Otros gastos | pág. 1, Jev 1 |

### Meta

```text
2024: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-26): filas-a-mano. Claude 2026-10-26 (tokens de sesión): ubicación y filas armadas a mano desde el .md con tools/armar-a-mano.mjs
tools/cargar.mjs (2026-10-26). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"), con su tipo; la página marca «s/d» en las categorías que esa línea esconde y explica el caso en «Notas sobre este club».
```

```text
tools/caja-deuda.mjs (2026-10-27): grossDebt escalón S (compuerta: balance de SIIS cuadra y la comparativa del año siguiente de SIIS coincide): balance de SIIS (siis-estado-2024.json, miles de COP): otros pasivos financieros corrientes 4719747 + no corrientes 4295323; cash escalón S (compuerta: balance de SIIS cuadra y la comparativa del año siguiente de SIIS coincide): balance de SIIS (siis-estado-2024.json, miles de COP): efectivo y equivalentes = 201892
```

## 2023

### Ingresos

```text
2023: cargado por tools/cargar.mjs (2026-10-26) desde Clubes/Colombia/Independiente Medellin/siis-estado-2023.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Colombia/Independiente Medellin/siis-estado-2023.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Ingresos de actividades ordinarias | pág. 1, Jev 0.98 |
| 2 | Otros ingresos | pág. 1, Jev 0.98 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Costo de ventas | pág. 1, precedente |
| 2 | Gastos de ventas | pág. 1, Claude 0.82 |
| 3 | Gastos de administración | pág. 1, Jev 1 |
| 4 | Otros gastos | pág. 1, Jev 1 |

### Meta

```text
2023: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-26): filas-a-mano. Claude 2026-10-26 (tokens de sesión): ubicación y filas armadas a mano desde el .md con tools/armar-a-mano.mjs
tools/cargar.mjs (2026-10-26). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"), con su tipo; la página marca «s/d» en las categorías que esa línea esconde y explica el caso en «Notas sobre este club».
```

```text
tools/caja-deuda.mjs (2026-10-27): grossDebt escalón S (compuerta: balance de SIIS cuadra y la comparativa del año siguiente de SIIS coincide): balance de SIIS (siis-estado-2023.json, miles de COP): otros pasivos financieros corrientes 2560872 + no corrientes 2647468; cash escalón S (compuerta: balance de SIIS cuadra y la comparativa del año siguiente de SIIS coincide): balance de SIIS (siis-estado-2023.json, miles de COP): efectivo y equivalentes = 352581
```

## 2022

### Ingresos

```text
2022: cargado por tools/cargar.mjs (2026-10-26) desde Clubes/Colombia/Independiente Medellin/siis-estado-2022.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Colombia/Independiente Medellin/siis-estado-2022.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Ingresos de actividades ordinarias | pág. 1, Jev 0.98 |
| 2 | Otros ingresos | pág. 1, Jev 0.98 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Costo de ventas | pág. 1, precedente |
| 2 | Gastos de ventas | pág. 1, Claude 0.82 |
| 3 | Gastos de administración | pág. 1, Jev 1 |
| 4 | Otros gastos | pág. 1, Jev 1 |

### Meta

```text
2022: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-26): filas-a-mano. Claude 2026-10-26 (tokens de sesión): ubicación y filas armadas a mano desde el .md con tools/armar-a-mano.mjs
tools/cargar.mjs (2026-10-26). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"), con su tipo; la página marca «s/d» en las categorías que esa línea esconde y explica el caso en «Notas sobre este club».
```

```text
tools/caja-deuda.mjs (2026-10-27): grossDebt escalón S (compuerta: balance de SIIS cuadra y la comparativa del año siguiente de SIIS coincide): balance de SIIS (siis-estado-2022.json, miles de COP): otros pasivos financieros corrientes 4778505 + no corrientes 2196934; cash escalón S (compuerta: balance de SIIS cuadra y la comparativa del año siguiente de SIIS coincide): balance de SIIS (siis-estado-2022.json, miles de COP): efectivo y equivalentes = 476445
```

## 2021

### Ingresos

```text
2021: cargado por tools/cargar.mjs (2026-10-26) desde Clubes/Colombia/Independiente Medellin/siis-estado-2021.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Colombia/Independiente Medellin/siis-estado-2021.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Ingresos de actividades ordinarias | pág. 1, Jev 0.98 |
| 2 | Otros ingresos | pág. 1, Jev 0.98 |
| 3 | Otras ganancias (pérdidas) | pág. 1, Jev 1 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Costo de ventas | pág. 1, precedente |
| 2 | Gastos de ventas | pág. 1, Claude 0.82 |
| 3 | Gastos de administración | pág. 1, Jev 1 |
| 4 | Otros gastos | pág. 1, Jev 1 |
| 5 | Deterioro de valor de ganancias y reversión de pérdidas por deterioro de valor (pérdidas por deterioro de valor) determinado de acuerdo con la NIIF 9 | pág. 1, ? 0.6 |
| 6 | Ganancias (pérdidas) que surgen de la baja en cuentas de activos financieros medidos al costo amortizado | pág. 1, precedente |

### Meta

```text
2021: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-26): filas-a-mano. Claude 2026-10-26 (tokens de sesión): ubicación y filas armadas a mano desde el .md con tools/armar-a-mano.mjs
tools/cargar.mjs (2026-10-26). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"), con su tipo; la página marca «s/d» en las categorías que esa línea esconde y explica el caso en «Notas sobre este club».
```

```text
tools/caja-deuda.mjs (2026-10-27): grossDebt escalón S (compuerta: balance de SIIS cuadra y la comparativa del año siguiente de SIIS coincide): balance de SIIS (siis-estado-2021.json, miles de COP): otros pasivos financieros corrientes 5041452 + no corrientes 3731204; cash escalón S (compuerta: balance de SIIS cuadra y la comparativa del año siguiente de SIIS coincide): balance de SIIS (siis-estado-2021.json, miles de COP): efectivo y equivalentes = 126528
```

## 2020

### Ingresos

```text
2020: cargado por tools/cargar.mjs (2026-10-26) desde Clubes/Colombia/Independiente Medellin/siis-estado-2020.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Colombia/Independiente Medellin/siis-estado-2020.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Ingresos de actividades ordinarias | pág. 1, Jev 0.98 |
| 2 | Otros ingresos | pág. 1, Jev 0.98 |
| 3 | Otras ganancias (pérdidas) | pág. 1, Jev 1 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Costo de ventas | pág. 1, precedente |
| 2 | Gastos de ventas | pág. 1, Claude 0.82 |
| 3 | Gastos de administración | pág. 1, Jev 1 |
| 4 | Otros gastos | pág. 1, Jev 1 |
| 5 | Deterioro de valor de ganancias y reversión de pérdidas por deterioro de valor (pérdidas por deterioro de valor) determinado de acuerdo con la NIIF 9 | pág. 1, ? 0.6 |
| 6 | Ganancias (pérdidas) que surgen de la baja en cuentas de activos financieros medidos al costo amortizado | pág. 1, precedente |

### Meta

```text
2020: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-26): filas-a-mano. Claude 2026-10-26 (tokens de sesión): ubicación y filas armadas a mano desde el .md con tools/armar-a-mano.mjs
tools/cargar.mjs (2026-10-26). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"), con su tipo; la página marca «s/d» en las categorías que esa línea esconde y explica el caso en «Notas sobre este club».
```

```text
tools/caja-deuda.mjs (2026-10-27): cash escalón S (compuerta: balance de SIIS cuadra y la comparativa del año siguiente de SIIS coincide): balance de SIIS (siis-estado-2020.json, miles de COP): efectivo y equivalentes = 89359
```

## 2019

### Ingresos

```text
2019: cargado por tools/cargar.mjs (2026-10-26) desde Clubes/Colombia/Independiente Medellin/siis-estado-2019.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Colombia/Independiente Medellin/siis-estado-2019.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Ingresos de actividades ordinarias | pág. 1, Jev 0.98 |
| 2 | Otros ingresos | pág. 1, Jev 0.98 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Costo de ventas | pág. 1, precedente |
| 2 | Gastos de ventas | pág. 1, Claude 0.82 |
| 3 | Gastos de administración | pág. 1, Jev 1 |
| 4 | Otros gastos | pág. 1, Jev 1 |
| 5 | Deterioro de valor de ganancias y reversión de pérdidas por deterioro de valor (pérdidas por deterioro de valor) determinado de acuerdo con la NIIF 9 | pág. 1, ? 0.6 |
| 6 | Otras ganancias (pérdidas) | pág. 1, Jev 0.99 |
| 7 | Ganancias (pérdidas) que surgen de la baja en cuentas de activos financieros medidos al costo amortizado | pág. 1, precedente |

### Meta

```text
2019: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-26): filas-a-mano. Claude 2026-10-26 (tokens de sesión): ubicación y filas armadas a mano desde el .md con tools/armar-a-mano.mjs
tools/cargar.mjs (2026-10-26). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"), con su tipo; la página marca «s/d» en las categorías que esa línea esconde y explica el caso en «Notas sobre este club».
```

```text
tools/caja-deuda.mjs (2026-10-27): grossDebt escalón S (compuerta: balance de SIIS cuadra y la comparativa del año siguiente de SIIS coincide): balance de SIIS (siis-estado-2019.json, miles de COP): otros pasivos financieros corrientes 5954668 + no corrientes 6661740; cash escalón S (compuerta: balance de SIIS cuadra y la comparativa del año siguiente de SIIS coincide): balance de SIIS (siis-estado-2019.json, miles de COP): efectivo y equivalentes = 56892
```

## 2018

### Ingresos

```text
2018: cargado por tools/cargar.mjs (2026-10-26) desde Clubes/Colombia/Independiente Medellin/siis-estado-2018.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Colombia/Independiente Medellin/siis-estado-2018.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Ingresos de actividades ordinarias | pág. 1, Jev 0.98 |
| 2 | Otros ingresos | pág. 1, Jev 0.98 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Costo de ventas | pág. 1, precedente |
| 2 | Gastos de ventas | pág. 1, Claude 0.82 |
| 3 | Gastos de administración | pág. 1, Jev 1 |
| 4 | Otros gastos | pág. 1, Jev 1 |
| 5 | Deterioro de valor de ganancias y reversión de pérdidas por deterioro de valor (pérdidas por deterioro de valor) determinado de acuerdo con la NIIF 9 | pág. 1, ? 0.6 |
| 6 | Ganancias (pérdidas) que surgen de la baja en cuentas de activos financieros medidos al costo amortizado | pág. 1, precedente |

### Meta

```text
2018: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-26): filas-a-mano. Claude 2026-10-26 (tokens de sesión): ubicación y filas armadas a mano desde el .md con tools/armar-a-mano.mjs
tools/cargar.mjs (2026-10-26). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"), con su tipo; la página marca «s/d» en las categorías que esa línea esconde y explica el caso en «Notas sobre este club».
```

```text
tools/caja-deuda.mjs (2026-10-27): grossDebt escalón S (compuerta: balance de SIIS cuadra y la comparativa del año siguiente de SIIS coincide): balance de SIIS (siis-estado-2018.json, miles de COP): otros pasivos financieros corrientes 4946999 + no corrientes 8802986; cash escalón S (compuerta: balance de SIIS cuadra y la comparativa del año siguiente de SIIS coincide): balance de SIIS (siis-estado-2018.json, miles de COP): efectivo y equivalentes = 233608
```

## 2017

### Ingresos

```text
2017: cargado por tools/cargar.mjs (2026-10-26) desde Clubes/Colombia/Independiente Medellin/siis-estado-2017.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Colombia/Independiente Medellin/siis-estado-2017.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Ingresos de actividades ordinarias | pág. 1, Jev 0.98 |
| 2 | Otros ingresos | pág. 1, Jev 0.98 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Costo de ventas | pág. 1, precedente |
| 2 | Gastos de ventas | pág. 1, Claude 0.82 |
| 3 | Gastos de administración | pág. 1, Jev 1 |
| 4 | Otros gastos | pág. 1, Jev 1 |
| 5 | Deterioro de valor de ganancias y reversión de pérdidas por deterioro de valor (pérdidas por deterioro de valor) determinado de acuerdo con la NIIF 9 | pág. 1, ? 0.6 |
| 6 | Ganancias (pérdidas) que surgen de la baja en cuentas de activos financieros medidos al costo amortizado | pág. 1, precedente |

### Meta

```text
2017: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-26): filas-a-mano. Claude 2026-10-26 (tokens de sesión): ubicación y filas armadas a mano desde el .md con tools/armar-a-mano.mjs
tools/cargar.mjs (2026-10-26). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"), con su tipo; la página marca «s/d» en las categorías que esa línea esconde y explica el caso en «Notas sobre este club».
```

```text
tools/caja-deuda.mjs (2026-10-27): grossDebt escalón S (compuerta: balance de SIIS cuadra y la comparativa del año siguiente de SIIS coincide): balance de SIIS (siis-estado-2017.json, miles de COP): otros pasivos financieros corrientes 5621865 + no corrientes 10978413; cash escalón S (compuerta: balance de SIIS cuadra y la comparativa del año siguiente de SIIS coincide): balance de SIIS (siis-estado-2017.json, miles de COP): efectivo y equivalentes = 179559
```

## 2016

### Ingresos

```text
2016: cargado por tools/cargar.mjs (2026-10-26) desde Clubes/Colombia/Independiente Medellin/siis-estado-2016.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Colombia/Independiente Medellin/siis-estado-2016.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Ingresos de actividades ordinarias | pág. 1, Jev 0.98 |
| 2 | Otros ingresos | pág. 1, Jev 0.98 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Costo de ventas | pág. 1, precedente |
| 2 | Gastos de ventas | pág. 1, Claude 0.82 |
| 3 | Gastos de administración | pág. 1, Jev 1 |
| 4 | Otros gastos | pág. 1, Jev 1 |
| 5 | Deterioro de valor de ganancias y reversión de pérdidas por deterioro de valor (pérdidas por deterioro de valor) determinado de acuerdo con la NIIF 9 | pág. 1, ? 0.6 |
| 6 | Ganancias (pérdidas) que surgen de la baja en cuentas de activos financieros medidos al costo amortizado | pág. 1, precedente |

### Meta

```text
2016: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-26): filas-a-mano. Claude 2026-10-26 (tokens de sesión): ubicación y filas armadas a mano desde el .md con tools/armar-a-mano.mjs
tools/cargar.mjs (2026-10-26). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"), con su tipo; la página marca «s/d» en las categorías que esa línea esconde y explica el caso en «Notas sobre este club».
```

```text
tools/caja-deuda.mjs (2026-10-27): grossDebt escalón S (compuerta: balance de SIIS cuadra y la comparativa del año siguiente de SIIS coincide): balance de SIIS (siis-estado-2016.json, miles de COP): otros pasivos financieros corrientes 4644778.89 + no corrientes 12674976.31; cash escalón S (compuerta: balance de SIIS cuadra y la comparativa del año siguiente de SIIS coincide): balance de SIIS (siis-estado-2016.json, miles de COP): efectivo y equivalentes = 99273.82
```

## Fuentes

### independientemedellin-co-siis-estado-2016

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-26) desde la transcripción Clubes/Colombia/Independiente Medellin/siis-estado-2016.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### independientemedellin-co-siis-estado-2017

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-26) desde la transcripción Clubes/Colombia/Independiente Medellin/siis-estado-2017.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### independientemedellin-co-siis-estado-2018

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-26) desde la transcripción Clubes/Colombia/Independiente Medellin/siis-estado-2018.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### independientemedellin-co-siis-estado-2019

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-26) desde la transcripción Clubes/Colombia/Independiente Medellin/siis-estado-2019.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### independientemedellin-co-siis-estado-2020

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-26) desde la transcripción Clubes/Colombia/Independiente Medellin/siis-estado-2020.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### independientemedellin-co-siis-estado-2021

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-26) desde la transcripción Clubes/Colombia/Independiente Medellin/siis-estado-2021.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### independientemedellin-co-siis-estado-2022

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-26) desde la transcripción Clubes/Colombia/Independiente Medellin/siis-estado-2022.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### independientemedellin-co-siis-estado-2023

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-26) desde la transcripción Clubes/Colombia/Independiente Medellin/siis-estado-2023.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### independientemedellin-co-siis-estado-2024

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-26) desde la transcripción Clubes/Colombia/Independiente Medellin/siis-estado-2024.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### independientemedellin-co-siis-estado-2025

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-26) desde la transcripción Clubes/Colombia/Independiente Medellin/siis-estado-2025.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

## Gestiones: contraste de una tabla de Guido (2026-10-26)

Guido pegó una línea de tiempo de la conducción del club (sin fuentes). Se contrastó con la prensa que sí cita data/gestiones/co.js:

| Tramo de la tabla | Veredicto | Qué dicen las fuentes |
| --- | --- | --- |
| 2014 a sep 2018, José Raúl Giraldo (propietario y representante legal) | CONTRADICHO en lo de 2014 a ene 2018 | Eduardo Silva Meluk fue presidente hasta su renuncia el 26 ene 2018 (El Colombiano, CM8079433; el perfil de TEDx lo da como presidente de 2014 a 2018). Giraldo, el máximo accionista, relevó en funciones de ene a sep 2018 (El Colombiano, 19 sep 2018: «relevará en funciones al máximo accionista»). |
| 19 sep 2018, Michael Gil Gómez asume | CONFIRMADO | El Colombiano, 19 sep 2018 (XN9359541). |
| Gil Gómez renuncia el 31 oct 2019 | PLAUSIBLE, sin fuente fechada | Antena 2 y Win Sports dan la renuncia sin fecha; el artículo enlaza a la Liga Águila 2019-II, compatible con oct-nov 2019. |
| 1 nov 2019 a ene 2020, Jamer Ospina (interino, representación legal) | NO VERIFICADO | Ninguna búsqueda lo nombra. ESPN dice que Daniel Ossa llegó en el segundo semestre de 2019 y acompañó al máximo accionista de manera interina hasta el primer semestre de 2020. |
| ene a 17 ago 2020, «Jhariel Ossa» (presidente encargado) | NO VERIFICADO, el nombre parece un error | Ninguna búsqueda lo nombra; ESPN y el club hablan de Daniel Ossa interino hasta el primer semestre de 2020. |
| 17 ago 2020 a 6 may 2024, Daniel Ossa Giraldo | FIN CONFIRMADO, inicio sin fuente | La salida del 6 may 2024 está en varias fuentes y ESPN dice «casi cuatro años» (consistente con mediados de 2020), pero el club y otras notas dicen que volvió «en enero de 2021» como presidente ejecutivo. |
| 6 may 2024 en adelante, Juan Camilo Restrepo | CONFIRMADO hasta su renuncia del 16 dic 2024 | La República, Infobae y Win Sports. Después, Giraldo representó legalmente al club hasta el regreso de Ossa el 16 mar 2026 (Claro Sports, Noticias RCN). |

Decisión: nada de la tabla que no tenga fuente pública entra a `data/gestiones/co.js` (es un archivo público): lo no verificado queda acá como pista, y las gestiones de 2019 a 2023 siguen con confirmada:false. Para confirmarlas hace falta un comunicado del club o prensa fechada de oct-nov 2019 y de 2020 (probar la Wayback de dim.co); los nombres «Jamer Ospina» y «Jhariel Ossa» hay que encontrarlos en una fuente antes de usarlos.
