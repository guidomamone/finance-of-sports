# atleticohuila-co — evidencia de carga

Lo que antes iba como comentario en el data file del club, `data/<país>/atleticohuila-co-data.js` (la regla: `Admin/CONVENCIONES-DATOS.md`, "data/<país>/<club>-data.js NO LLEVA
COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y meta. Las notas de cada fila van en una tabla con su número de
fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
Atletico Huila: alta por tools/alta-club.mjs (2026-10-27) desde Clubes/Colombia/Atletico Huila/siis-estado-2025.pdf. brandColor AUSENTE a propósito
(nadie lo chequeó todavía: club-or-year-onboarding/club-nuevo.md, identidad primero).
```

```text
data/co/atleticohuila-co-data.js — Atletico Huila (Colombia).
ALTA POR SCRIPT (tools/alta-club.mjs, 2026-10-27), SIN EJERCICIOS CARGADOS TODAVÍA: las estructuras del data file
nacen vacías a propósito. Los rubros, los totales oficiales y el resto del fiscalYearMeta los agrega la etapa de carga.

Documento que originó el alta: Clubes/Colombia/Atletico Huila/siis-estado-2025.pdf

De dónde salió cada campo (estado según alta-club.mjs: ok / pendiente):
  id                 ok        "atleticohuila-co" — slug de "Atletico Huila" + '-co' (convención de clubId, Admin/CONVENCIONES.md Versión 129)
  name               pendiente "Atletico Huila" — no se encontró el nombre legal en el .md; se usa el nombre de la carpeta
  displayName        ok        "Atletico Huila" — nombre de la carpeta del club en Clubes/
  country            ok        "CO" — carpeta de país "Colombia" (tabla PAISES)
  reportingCurrency  ok        "COP" — moneda de curso legal de Colombia
  fiscalYearStart    ok        "01-01" — cierre del ejercicio: patrón del país: los 26 clubes de CO ya cargados arrancan el 01-01 (el documento no trae fechas de cierre legibles)
  sport              ok        "futbol" — la liga co-primeraB del catálogo (data/leagues.js) es de futbol
  brandColor         pendiente (ausente) — la liga del club no está en tools/brand-color-reference/ (o el club no está en footylogos)
  anio               ok        2025 — nombre del archivo (misma regla que onboard.mjs --quien)
  cierre             ok        "2025-12-31" — año del ejercicio + mes de cierre (patrón del país: los 26 clubes de CO ya cargados arrancan el 01-01 (el documento no trae fechas de cierre legibles)
  reportType         ok        "official_balance_sheet" — el .md tiene un estado contable (resultados / balance) y el nombre del archivo no sugiere otro tipo
  perimetro          ok        "individual" — el .md no presenta estados consolidados (0 menciones de "consolidado")
  currency           ok        "COP" — moneda de curso legal de Colombia (tabla PAISES de alta-club.mjs)
  fxRef              ok        "COP@2025-12-31" — el documento no declara tipo de cambio; FX_CLOSE ya tiene COP@2025-12-31 = 3757.08 (TRM oficial (Superintendencia Financiera de Colombia) al 31/12/202
  sourceId           ok        "atleticohuila-co-siis-estado-2025" — clubId + nombre del archivo en slug
  liga               ok        "co-primeraB" — roster cacheado de "2025 Torneo DIMAYOR" (tools/club-league-reference/co.json), coincidencia exacta "Atlético Huila"

FISCAL YEAR META PROPUESTO para 2025 (NO registrado: un ejercicio con meta y
sin rubros se vería en el sitio como un año en cero, y "sin dato no es cero"):
  2025: {"reportType":"official_balance_sheet","currency":"COP","fxRef":"COP@2025-12-31","sourceId":"atleticohuila-co-siis-estado-2025"}
```

## 2025

### Ingresos

```text
2025: cargado por tools/cargar.mjs (2026-10-27) desde Clubes/Colombia/Atletico Huila/siis-estado-2025.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Colombia/Atletico Huila/siis-estado-2025.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Ingresos de actividades ordinarias | pág. 1, Jev 0.98 |
| 2 | Otros ingresos | pág. 1, Jev 0.97 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Gastos de ventas | pág. 1, precedente |
| 2 | Gastos de administración | pág. 1, Jev 1 |
| 3 | Otros gastos | pág. 1, Jev 0.99 |

### Meta

```text
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-27): filas-a-mano. Claude 2026-10-27 (tokens de sesión): ubicación y filas armadas a mano desde el .md con tools/armar-a-mano.mjs
tools/cargar.mjs (2026-10-27). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"), con su tipo; la página marca «s/d» en las categorías que esa línea esconde y explica el caso en «Notas sobre este club».
```

```text
tools/caja-deuda.mjs (2026-10-27): grossDebt escalón S (compuerta: balance de SIIS cuadra): balance de SIIS (siis-estado-2025.json, miles de COP): otros pasivos financieros corrientes 6965 + no corrientes 526488; cash escalón S (compuerta: balance de SIIS cuadra): balance de SIIS (siis-estado-2025.json, miles de COP): efectivo y equivalentes = 597480
```

### Liga

```text
alta-club.mjs (2026-10-27): co-primeraB, verificado contra roster cacheado de "2025 Torneo DIMAYOR" (tools/club-league-reference/co.json), coincidencia exacta "Atlético Huila".
```

## 2024

### Ingresos

```text
2024: cargado por tools/cargar.mjs (2026-10-27) desde Clubes/Colombia/Atletico Huila/siis-estado-2024.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Colombia/Atletico Huila/siis-estado-2024.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Ingresos de actividades ordinarias | pág. 1, Jev 0.98 |
| 2 | Otros ingresos | pág. 1, Jev 0.97 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Gastos de ventas | pág. 1, precedente |
| 2 | Gastos de administración | pág. 1, Jev 1 |
| 3 | Otros gastos | pág. 1, Jev 0.99 |

### Meta

```text
2024: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-27): filas-a-mano. Claude 2026-10-27 (tokens de sesión): ubicación y filas armadas a mano desde el .md con tools/armar-a-mano.mjs
tools/cargar.mjs (2026-10-27). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"), con su tipo; la página marca «s/d» en las categorías que esa línea esconde y explica el caso en «Notas sobre este club».
```

```text
tools/caja-deuda.mjs (2026-10-27): grossDebt escalón S (compuerta: balance de SIIS cuadra y la comparativa del año siguiente de SIIS coincide): balance de SIIS (siis-estado-2024.json, miles de COP): otros pasivos financieros corrientes 1573 + no corrientes 696774; cash escalón S (compuerta: balance de SIIS cuadra y la comparativa del año siguiente de SIIS coincide): balance de SIIS (siis-estado-2024.json, miles de COP): efectivo y equivalentes = 222857
```

## 2023

### Ingresos

```text
2023: cargado por tools/cargar.mjs (2026-10-27) desde Clubes/Colombia/Atletico Huila/siis-estado-2023.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Colombia/Atletico Huila/siis-estado-2023.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Ingresos de actividades ordinarias | pág. 1, Jev 0.98 |
| 2 | Otros ingresos | pág. 1, Jev 0.97 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Gastos de ventas | pág. 1, precedente |
| 2 | Gastos de administración | pág. 1, Jev 1 |
| 3 | Otros gastos | pág. 1, Jev 0.99 |

### Meta

```text
2023: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-27): filas-a-mano. Claude 2026-10-27 (tokens de sesión): ubicación y filas armadas a mano desde el .md con tools/armar-a-mano.mjs
tools/cargar.mjs (2026-10-27). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"), con su tipo; la página marca «s/d» en las categorías que esa línea esconde y explica el caso en «Notas sobre este club».
```

```text
tools/caja-deuda.mjs (2026-10-27): grossDebt escalón S (compuerta: balance de SIIS cuadra y la comparativa del año siguiente de SIIS coincide): balance de SIIS (siis-estado-2023.json, miles de COP): otros pasivos financieros corrientes 27412 + no corrientes 49219; cash escalón S (compuerta: balance de SIIS cuadra y la comparativa del año siguiente de SIIS coincide): balance de SIIS (siis-estado-2023.json, miles de COP): efectivo y equivalentes = 688737
```

## 2022

### Ingresos

```text
2022: cargado por tools/cargar.mjs (2026-10-27) desde Clubes/Colombia/Atletico Huila/siis-estado-2022.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Colombia/Atletico Huila/siis-estado-2022.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Ingresos de actividades ordinarias | pág. 1, Jev 0.98 |
| 2 | Otros ingresos | pág. 1, Jev 0.97 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Gastos de ventas | pág. 1, precedente |
| 2 | Gastos de administración | pág. 1, Jev 1 |
| 3 | Otros gastos | pág. 1, Jev 0.99 |

### Meta

```text
2022: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-27): filas-a-mano. Claude 2026-10-27 (tokens de sesión): ubicación y filas armadas a mano desde el .md con tools/armar-a-mano.mjs
tools/cargar.mjs (2026-10-27). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"), con su tipo; la página marca «s/d» en las categorías que esa línea esconde y explica el caso en «Notas sobre este club».
```

```text
tools/caja-deuda.mjs (2026-10-27): cash escalón S (compuerta: balance de SIIS cuadra y la comparativa del año siguiente de SIIS coincide): balance de SIIS (siis-estado-2022.json, miles de COP): efectivo y equivalentes = 358239
```

## 2021

### Ingresos

```text
2021: cargado por tools/cargar.mjs (2026-10-27) desde Clubes/Colombia/Atletico Huila/siis-estado-2021.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Colombia/Atletico Huila/siis-estado-2021.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Ingresos de actividades ordinarias | pág. 1, Jev 0.98 |
| 2 | Otros ingresos | pág. 1, Jev 0.97 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Gastos de ventas | pág. 1, precedente |
| 2 | Gastos de administración | pág. 1, Jev 1 |
| 3 | Otros gastos | pág. 1, Jev 0.99 |

### Meta

```text
2021: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-27): filas-a-mano. Claude 2026-10-27 (tokens de sesión): ubicación y filas armadas a mano desde el .md con tools/armar-a-mano.mjs
tools/cargar.mjs (2026-10-27). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"), con su tipo; la página marca «s/d» en las categorías que esa línea esconde y explica el caso en «Notas sobre este club».
```

```text
tools/caja-deuda.mjs (2026-10-27): cash escalón S (compuerta: balance de SIIS cuadra y la comparativa del año siguiente de SIIS coincide): balance de SIIS (siis-estado-2021.json, miles de COP): efectivo y equivalentes = 3484716
```

## 2020

### Ingresos

```text
2020: cargado por tools/cargar.mjs (2026-10-27) desde Clubes/Colombia/Atletico Huila/siis-estado-2020.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Colombia/Atletico Huila/siis-estado-2020.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Ingresos de actividades ordinarias | pág. 1, Jev 0.98 |
| 2 | Otros ingresos | pág. 1, Jev 0.97 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Gastos de ventas | pág. 1, precedente |
| 2 | Gastos de administración | pág. 1, Jev 1 |
| 3 | Otros gastos | pág. 1, Jev 0.99 |

### Meta

```text
2020: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-27): filas-a-mano. Claude 2026-10-27 (tokens de sesión): ubicación y filas armadas a mano desde el .md con tools/armar-a-mano.mjs
tools/cargar.mjs (2026-10-27). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"), con su tipo; la página marca «s/d» en las categorías que esa línea esconde y explica el caso en «Notas sobre este club».
```

## 2019

### Ingresos

```text
2019: cargado por tools/cargar.mjs (2026-10-27) desde Clubes/Colombia/Atletico Huila/siis-estado-2019.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Colombia/Atletico Huila/siis-estado-2019.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Ingresos de actividades ordinarias | pág. 1, Jev 0.98 |
| 2 | Otros ingresos | pág. 1, Jev 0.97 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Gastos de ventas | pág. 1, precedente |
| 2 | Gastos de administración | pág. 1, Jev 1 |
| 3 | Otros gastos | pág. 1, Jev 0.99 |

### Meta

```text
2019: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-27): filas-a-mano. Claude 2026-10-27 (tokens de sesión): ubicación y filas armadas a mano desde el .md con tools/armar-a-mano.mjs
tools/cargar.mjs (2026-10-27). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"), con su tipo; la página marca «s/d» en las categorías que esa línea esconde y explica el caso en «Notas sobre este club».
```

```text
tools/caja-deuda.mjs (2026-10-27): grossDebt escalón S (compuerta: balance de SIIS cuadra y la comparativa del año siguiente de SIIS coincide): balance de SIIS (siis-estado-2019.json, miles de COP): otros pasivos financieros corrientes 550153 + no corrientes 1549828; cash escalón S (compuerta: balance de SIIS cuadra y la comparativa del año siguiente de SIIS coincide): balance de SIIS (siis-estado-2019.json, miles de COP): efectivo y equivalentes = 43802
```

## 2018

### Ingresos

```text
2018: cargado por tools/cargar.mjs (2026-10-27) desde Clubes/Colombia/Atletico Huila/siis-estado-2018.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Colombia/Atletico Huila/siis-estado-2018.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Ingresos de actividades ordinarias | pág. 1, Jev 0.98 |
| 2 | Otros ingresos | pág. 1, Jev 0.97 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Gastos de ventas | pág. 1, precedente |
| 2 | Gastos de administración | pág. 1, Jev 1 |
| 3 | Otros gastos | pág. 1, Jev 0.99 |

### Meta

```text
2018: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-27): filas-a-mano. Claude 2026-10-27 (tokens de sesión): ubicación y filas armadas a mano desde el .md con tools/armar-a-mano.mjs
tools/cargar.mjs (2026-10-27). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"), con su tipo; la página marca «s/d» en las categorías que esa línea esconde y explica el caso en «Notas sobre este club».
```

```text
tools/caja-deuda.mjs (2026-10-27): grossDebt escalón S (compuerta: balance de SIIS cuadra y la comparativa del año siguiente de SIIS coincide): balance de SIIS (siis-estado-2018.json, miles de COP): otros pasivos financieros corrientes vacío + no corrientes 1872222; cash escalón S (compuerta: balance de SIIS cuadra y la comparativa del año siguiente de SIIS coincide): balance de SIIS (siis-estado-2018.json, miles de COP): efectivo y equivalentes = 440651
```

## 2017

### Ingresos

```text
2017: cargado por tools/cargar.mjs (2026-10-27) desde Clubes/Colombia/Atletico Huila/siis-estado-2017.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Colombia/Atletico Huila/siis-estado-2017.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Ingresos de actividades ordinarias | pág. 1, Jev 0.98 |
| 2 | Otros ingresos | pág. 1, Jev 0.97 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Gastos de ventas | pág. 1, precedente |
| 2 | Gastos de administración | pág. 1, Jev 1 |
| 3 | Otros gastos | pág. 1, Jev 0.99 |

### Meta

```text
2017: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-27): filas-a-mano. Claude 2026-10-27 (tokens de sesión): ubicación y filas armadas a mano desde el .md con tools/armar-a-mano.mjs
tools/cargar.mjs (2026-10-27). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"), con su tipo; la página marca «s/d» en las categorías que esa línea esconde y explica el caso en «Notas sobre este club».
```

```text
tools/caja-deuda.mjs (2026-10-27): grossDebt escalón S (compuerta: balance de SIIS cuadra y la comparativa del año siguiente de SIIS coincide): balance de SIIS (siis-estado-2017.json, miles de COP): otros pasivos financieros corrientes 0 + no corrientes 1305556; cash escalón S (compuerta: balance de SIIS cuadra y la comparativa del año siguiente de SIIS coincide): balance de SIIS (siis-estado-2017.json, miles de COP): efectivo y equivalentes = 8248
```

## 2016

### Ingresos

```text
2016: cargado por tools/cargar.mjs (2026-10-27) desde Clubes/Colombia/Atletico Huila/siis-estado-2016.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Colombia/Atletico Huila/siis-estado-2016.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Ingresos de actividades ordinarias | pág. 1, Jev 0.98 |
| 2 | Otros ingresos | pág. 1, Jev 0.97 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Gastos de ventas | pág. 1, precedente |
| 2 | Gastos de administración | pág. 1, Jev 1 |
| 3 | Otros gastos | pág. 1, Jev 0.99 |

### Meta

```text
2016: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-27): filas-a-mano. Claude 2026-10-27 (tokens de sesión): ubicación y filas armadas a mano desde el .md con tools/armar-a-mano.mjs
tools/cargar.mjs (2026-10-27). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"), con su tipo; la página marca «s/d» en las categorías que esa línea esconde y explica el caso en «Notas sobre este club».
```

```text
tools/caja-deuda.mjs (2026-10-27): cash escalón S (compuerta: balance de SIIS cuadra y la comparativa del año siguiente de SIIS coincide): balance de SIIS (siis-estado-2016.json, miles de COP): efectivo y equivalentes = 134496
```

## Fuentes

### atleticohuila-co-siis-estado-2016

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-27) desde la transcripción Clubes/Colombia/Atletico Huila/siis-estado-2016.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### atleticohuila-co-siis-estado-2017

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-27) desde la transcripción Clubes/Colombia/Atletico Huila/siis-estado-2017.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### atleticohuila-co-siis-estado-2018

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-27) desde la transcripción Clubes/Colombia/Atletico Huila/siis-estado-2018.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### atleticohuila-co-siis-estado-2019

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-27) desde la transcripción Clubes/Colombia/Atletico Huila/siis-estado-2019.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### atleticohuila-co-siis-estado-2020

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-27) desde la transcripción Clubes/Colombia/Atletico Huila/siis-estado-2020.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### atleticohuila-co-siis-estado-2021

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-27) desde la transcripción Clubes/Colombia/Atletico Huila/siis-estado-2021.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### atleticohuila-co-siis-estado-2022

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-27) desde la transcripción Clubes/Colombia/Atletico Huila/siis-estado-2022.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### atleticohuila-co-siis-estado-2023

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-27) desde la transcripción Clubes/Colombia/Atletico Huila/siis-estado-2023.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### atleticohuila-co-siis-estado-2024

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-27) desde la transcripción Clubes/Colombia/Atletico Huila/siis-estado-2024.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### atleticohuila-co-siis-estado-2025

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-27) desde la transcripción Clubes/Colombia/Atletico Huila/siis-estado-2025.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```
