# cortulua-co — evidencia de carga

Lo que antes iba como comentario en el data file del club, `data/<país>/cortulua-co-data.js` (la regla: `Admin/CONVENCIONES-DATOS.md`, "data/<país>/<club>-data.js NO LLEVA
COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y meta. Las notas de cada fila van en una tabla con su número de
fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
Cortulua: alta por tools/alta-club.mjs (2026-10-27) desde Clubes/Colombia/Cortulua/siis-estado-2025.pdf. brandColor AUSENTE a propósito
(nadie lo chequeó todavía: club-or-year-onboarding/club-nuevo.md, identidad primero).
```

```text
data/co/cortulua-co-data.js — Cortuluá Fútbol Club S.A. (Colombia).
ALTA POR SCRIPT (tools/alta-club.mjs, 2026-10-27), SIN EJERCICIOS CARGADOS TODAVÍA: las estructuras del data file
nacen vacías a propósito. Los rubros, los totales oficiales y el resto del fiscalYearMeta los agrega la etapa de carga.

Documento que originó el alta: Clubes/Colombia/Cortulua/siis-estado-2025.pdf

De dónde salió cada campo (estado según alta-club.mjs: ok / pendiente):
  id                 ok        "cortulua-co" — slug de "Cortulua" + '-co' (convención de clubId, Admin/CONVENCIONES.md Versión 129)
  name               ok        "Cortuluá Fútbol Club S.A." — respuesta de Guido en la cola (f979d22)
  displayName        ok        "Cortulua" — nombre de la carpeta del club en Clubes/
  country            ok        "CO" — carpeta de país "Colombia" (tabla PAISES)
  reportingCurrency  ok        "COP" — moneda de curso legal de Colombia
  fiscalYearStart    ok        "01-01" — cierre del ejercicio: patrón del país: los 21 clubes de CO ya cargados arrancan el 01-01 (el documento no trae fechas de cierre legibles)
  sport              ok        "futbol" — el .md nombra el fútbol 1 veces y ningún otro deporte más que eso
  brandColor         pendiente (ausente) — la liga del club no está en tools/brand-color-reference/ (o el club no está en footylogos)
  anio               ok        2025 — nombre del archivo (misma regla que onboard.mjs --quien)
  cierre             ok        "2025-12-31" — año del ejercicio + mes de cierre (patrón del país: los 21 clubes de CO ya cargados arrancan el 01-01 (el documento no trae fechas de cierre legibles)
  reportType         ok        "official_balance_sheet" — el .md tiene un estado contable (resultados / balance) y el nombre del archivo no sugiere otro tipo
  perimetro          ok        "individual" — el .md no presenta estados consolidados (0 menciones de "consolidado")
  currency           ok        "COP" — moneda de curso legal de Colombia (tabla PAISES de alta-club.mjs)
  fxRef              ok        "COP@2025-12-31" — el documento no declara tipo de cambio; FX_CLOSE ya tiene COP@2025-12-31 = 3757.08 (TRM oficial (Superintendencia Financiera de Colombia) al 31/12/202
  sourceId           ok        "cortulua-co-siis-estado-2025" — clubId + nombre del archivo en slug
  liga               pendiente null — no aparece en los rosters cacheados de 2025 (co-primeraA, co-primeraB): puede haber jugado otra división

FISCAL YEAR META PROPUESTO para 2025 (NO registrado: un ejercicio con meta y
sin rubros se vería en el sitio como un año en cero, y "sin dato no es cero"):
  2025: {"reportType":"official_balance_sheet","currency":"COP","fxRef":"COP@2025-12-31","sourceId":"cortulua-co-siis-estado-2025"}
```

## 2025

### Ingresos

```text
2025: cargado por tools/cargar.mjs (2026-10-27) desde Clubes/Colombia/Cortulua/siis-estado-2025.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Colombia/Cortulua/siis-estado-2025.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Ingresos de actividades ordinarias | pág. 1, Jev 0.98 |
| 2 | Otros ingresos | pág. 1, Jev 0.98 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Gastos de ventas | pág. 1, precedente |
| 2 | Gastos de administración | pág. 1, Jev 1 |
| 3 | Otros gastos | pág. 1, Jev 1 |

### Meta

```text
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-27): filas-a-mano. Claude 2026-10-27 (tokens de sesión): ubicación y filas armadas a mano desde el .md con tools/armar-a-mano.mjs
tools/cargar.mjs (2026-10-27). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"), con su tipo; la página marca «s/d» en las categorías que esa línea esconde y explica el caso en «Notas sobre este club».
```

### Liga

```text
alta-club.mjs (2026-10-27): null, SIN VERIFICAR (no aparece en los rosters cacheados de 2025 (co-primeraA, co-primeraB): puede haber jugado otra división).
```

## 2024

### Ingresos

```text
2024: cargado por tools/cargar.mjs (2026-10-27) desde Clubes/Colombia/Cortulua/siis-estado-2024.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Colombia/Cortulua/siis-estado-2024.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Ingresos de actividades ordinarias | pág. 1, Jev 0.98 |
| 2 | Otros ingresos | pág. 1, Jev 0.98 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Costo de ventas | pág. 1, Claude 0.85 |
| 2 | Gastos de ventas | pág. 1, precedente |
| 3 | Gastos de administración | pág. 1, Jev 1 |

### Meta

```text
2024: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-27): filas-a-mano. Claude 2026-10-27 (tokens de sesión): ubicación y filas armadas a mano desde el .md con tools/armar-a-mano.mjs
tools/cargar.mjs (2026-10-27). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"), con su tipo; la página marca «s/d» en las categorías que esa línea esconde y explica el caso en «Notas sobre este club».
```

## 2023

### Ingresos

```text
2023: cargado por tools/cargar.mjs (2026-10-27) desde Clubes/Colombia/Cortulua/siis-estado-2023.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Colombia/Cortulua/siis-estado-2023.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Ingresos de actividades ordinarias | pág. 1, Jev 0.98 |
| 2 | Otros ingresos | pág. 1, Jev 0.98 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Costo de ventas | pág. 1, Claude 0.85 |
| 2 | Gastos de ventas | pág. 1, precedente |
| 3 | Gastos de administración | pág. 1, Jev 1 |

### Meta

```text
2023: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-27): filas-a-mano. Claude 2026-10-27 (tokens de sesión): ubicación y filas armadas a mano desde el .md con tools/armar-a-mano.mjs
tools/cargar.mjs (2026-10-27). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"), con su tipo; la página marca «s/d» en las categorías que esa línea esconde y explica el caso en «Notas sobre este club».
```

## 2022

### Ingresos

```text
2022: cargado por tools/cargar.mjs (2026-10-27) desde Clubes/Colombia/Cortulua/siis-estado-2022.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Colombia/Cortulua/siis-estado-2022.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Ingresos de actividades ordinarias | pág. 1, Jev 0.98 |
| 2 | Otros ingresos | pág. 1, Jev 0.98 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Costo de ventas | pág. 1, Claude 0.85 |
| 2 | Gastos de ventas | pág. 1, precedente |
| 3 | Gastos de administración | pág. 1, Jev 1 |

### Meta

```text
2022: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-27): filas-a-mano. Claude 2026-10-27 (tokens de sesión): ubicación y filas armadas a mano desde el .md con tools/armar-a-mano.mjs
tools/cargar.mjs (2026-10-27). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"), con su tipo; la página marca «s/d» en las categorías que esa línea esconde y explica el caso en «Notas sobre este club».
```

## 2021

### Ingresos

```text
2021: cargado por tools/cargar.mjs (2026-10-27) desde Clubes/Colombia/Cortulua/siis-estado-2021.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Colombia/Cortulua/siis-estado-2021.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Ingresos de actividades ordinarias | pág. 1, Jev 0.98 |
| 2 | Otros ingresos | pág. 1, Jev 0.98 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Gastos de ventas | pág. 1, precedente |

### Meta

```text
2021: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-27): filas-a-mano. Claude 2026-10-27 (tokens de sesión): ubicación y filas armadas a mano desde el .md con tools/armar-a-mano.mjs
tools/cargar.mjs (2026-10-27). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"), con su tipo; la página marca «s/d» en las categorías que esa línea esconde y explica el caso en «Notas sobre este club».
```

## 2020

### Ingresos

```text
2020: cargado por tools/cargar.mjs (2026-10-27) desde Clubes/Colombia/Cortulua/siis-estado-2020.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Colombia/Cortulua/siis-estado-2020.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Ingresos de actividades ordinarias | pág. 1, Jev 0.98 |
| 2 | Otros ingresos | pág. 1, Jev 0.98 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Gastos de administración | pág. 1, precedente |
| 2 | Otros gastos | pág. 1, Jev 1 |

### Meta

```text
2020: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-27): filas-a-mano. Claude 2026-10-27 (tokens de sesión): ubicación y filas armadas a mano desde el .md con tools/armar-a-mano.mjs
2020: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-27): categoria = lump_football_operations_expense. El estado de 2020 imprime todo el gasto operativo (8.859.297, más que los ingresos de 7.080.765) como «Gastos de administración» y el de 2021, en su columna 2020, da ese mismo importe como «Gastos de ventas», que en Colombia es la actividad deportiva (regla de Admin/paises/co.md; mismo caso que Tolima y La Equidad 2024, Bucaramanga 2018 y América de Cali 2017 y 2020).
tools/cargar.mjs (2026-10-27). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"), con su tipo; la página marca «s/d» en las categorías que esa línea esconde y explica el caso en «Notas sobre este club».
```

## Fuentes

### cortulua-co-siis-estado-2020

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-27) desde la transcripción Clubes/Colombia/Cortulua/siis-estado-2020.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### cortulua-co-siis-estado-2021

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-27) desde la transcripción Clubes/Colombia/Cortulua/siis-estado-2021.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### cortulua-co-siis-estado-2022

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-27) desde la transcripción Clubes/Colombia/Cortulua/siis-estado-2022.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### cortulua-co-siis-estado-2023

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-27) desde la transcripción Clubes/Colombia/Cortulua/siis-estado-2023.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### cortulua-co-siis-estado-2024

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-27) desde la transcripción Clubes/Colombia/Cortulua/siis-estado-2024.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### cortulua-co-siis-estado-2025

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-27) desde la transcripción Clubes/Colombia/Cortulua/siis-estado-2025.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```
