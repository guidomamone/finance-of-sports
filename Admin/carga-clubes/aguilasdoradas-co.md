# aguilasdoradas-co — evidencia de carga

Lo que antes iba como comentario en el data file del club, `data/<país>/aguilasdoradas-co-data.js` (la regla: `Admin/CONVENCIONES-DATOS.md`, "data/<país>/<club>-data.js NO LLEVA
COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y meta. Las notas de cada fila van en una tabla con su número de
fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
Aguilas Doradas: alta por tools/alta-club.mjs (2026-10-26) desde Clubes/Colombia/Aguilas Doradas/siis-estado-2025.pdf. brandColor AUSENTE a propósito
(nadie lo chequeó todavía: club-or-year-onboarding/club-nuevo.md, identidad primero).
```

```text
data/co/aguilasdoradas-co-data.js — Talento Dorado S.A. (Colombia).
ALTA POR SCRIPT (tools/alta-club.mjs, 2026-10-26), SIN EJERCICIOS CARGADOS TODAVÍA: las estructuras del data file
nacen vacías a propósito. Los rubros, los totales oficiales y el resto del fiscalYearMeta los agrega la etapa de carga.

Documento que originó el alta: Clubes/Colombia/Aguilas Doradas/siis-estado-2025.pdf

De dónde salió cada campo (estado según alta-club.mjs: ok / pendiente):
  id                 ok        "aguilasdoradas-co" — slug de "Aguilas Doradas" + '-co' (convención de clubId, Admin/CONVENCIONES.md Versión 129)
  name               ok        "Talento Dorado S.A." — ajuste manual (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-09): Revisión del alta (Claude, 2026-10-09): la razón social de la sociedad que o
  displayName        ok        "Aguilas Doradas" — nombre de la carpeta del club en Clubes/
  country            ok        "CO" — carpeta de país "Colombia" (tabla PAISES)
  reportingCurrency  ok        "COP" — moneda de curso legal de Colombia
  fiscalYearStart    ok        "01-01" — cierre del ejercicio: los demás .md del club (1 de 1 documentos cierran en el mes 12); este documento no alcanza solo
  sport              ok        "futbol" — la liga co-primeraA del catálogo (data/leagues.js) es de futbol
  brandColor         pendiente (ausente) — tools/brand-color-reference/ (footylogos): [colombia] aguilas doradas: #C6A845 gold, #131A30 dark navy, #C7B94C light gold, #A38630 bronze gold
  anio               ok        2025 — --anio
  cierre             ok        "2025-12-31" — año del ejercicio + mes de cierre (los demás .md del club (1 de 1 documentos cierran en el mes 12); este documento no alcanza solo)
  reportType         ok        "official_balance_sheet" — el .md tiene un estado contable (resultados / balance) y el nombre del archivo no sugiere otro tipo
  perimetro          ok        "individual" — el .md no presenta estados consolidados (0 menciones de "consolidado")
  currency           ok        "COP" — moneda de curso legal de Colombia (tabla PAISES de alta-club.mjs)
  fxRef              ok        "COP@2025-12-31" — el documento no declara tipo de cambio; FX_CLOSE ya tiene COP@2025-12-31 = 3757.08 (TRM oficial (Superintendencia Financiera de Colombia) al 31/12/202
  sourceId           ok        "aguilasdoradas-co-siis-estado-2025" — clubId + nombre del archivo en slug
  liga               ok        "co-primeraA" — roster cacheado de "2025 Liga DIMAYOR" (tools/club-league-reference/co.json), coincidencia exacta "Águilas Doradas"

FISCAL YEAR META PROPUESTO para 2025 (NO registrado: un ejercicio con meta y
sin rubros se vería en el sitio como un año en cero, y "sin dato no es cero"):
  2025: {"reportType":"official_balance_sheet","currency":"COP","fxRef":"COP@2025-12-31","sourceId":"aguilasdoradas-co-siis-estado-2025"}
```

## 2025

### Ingresos

```text
2025: cargado por tools/cargar.mjs (2026-10-26) desde Clubes/Colombia/Aguilas Doradas/siis-estado-2025.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Colombia/Aguilas Doradas/siis-estado-2025.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Por taquilla | pág. 1, Jev 1 |
| 2 | Venta Derechos deportivos | pág. 1, Jev 1 |
| 3 | Publicidad y propaganda | pág. 1, Jev 1 |
| 4 | Dimayor Derechos de TV y otros | pág. 1, Jev 1 |
| 5 | Dimayor Diferidos | pág. 1, Jev 0.96 |
| 6 | Federación Colombiana de futbol | pág. 1, Jev 0.93 |
| 7 | Actividades conexas | pág. 1, Jev 0.97 |
| 8 | Otros ingresos | pág. 1, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Costo de ventas | pág. 1, precedente |
| 2 | Gastos de Personal (Gastos de ventas) | pág. 1, Jev 0.95 |
| 3 | Impuestos (Gastos de ventas) | pág. 1, Jev 1 |
| 4 | Arrendamientos (Gastos de ventas) | pág. 1, Jev 0.93 |
| 5 | Contribuciones y afiliaciones | pág. 1, Jev 0.98 |
| 6 | Seguros (Gastos de ventas) | pág. 1, Jev 0.97 |
| 7 | Servicios generales (Gastos de ventas) | pág. 1, Claude 0.85 |
| 8 | Mantenimiento y reparaciones (Gastos de ventas) | pág. 1, Claude 0.8 |
| 9 | Gastos de viaje (Gastos de ventas) | pág. 1, Jev 0.99 |
| 10 | Gastos Diversos (Gastos de ventas) | pág. 1, precedente |
| 11 | Derechos deportivos | pág. 1, Jev 0.99 |
| 12 | Gastos de Personal (Gastos de administración) | pág. 1, Claude 0.93 |
| 13 | Honorarios (Gastos de administración) | pág. 1, Jev 1 |
| 14 | Impuestos (Gastos de administración) | pág. 1, Jev 1 |
| 15 | Arrendamientos (Gastos de administración) | pág. 1, Jev 1 |
| 16 | Seguros (Gastos de administración) | pág. 1, Jev 1 |
| 17 | Servicios generales (Gastos de administración) | pág. 1, Jev 1 |
| 18 | Gastos legales | pág. 1, Jev 1 |
| 19 | Mantenimiento y reparaciones (Gastos de administración) | pág. 1, Jev 1 |
| 20 | Gastos de viaje (Gastos de administración) | pág. 1, Claude 0.88 |
| 21 | Amortizaciones | pág. 1, ? 0.6 |
| 22 | Gastos diversos (Gastos de administración) | pág. 1, precedente |
| 23 | Deterioro de cartera | pág. 1, Jev 0.98 |
| 24 | Otros gastos | pág. 1, precedente |

### Meta

```text
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-26): filas-a-mano. Claude 2026-10-26 (tokens de sesión): ubicación y filas armadas a mano desde el .md con tools/armar-a-mano.mjs
tools/cargar.mjs (2026-10-26). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

```text
tools/caja-deuda.mjs (2026-10-27): grossDebt escalón S (compuerta: balance de SIIS cuadra): balance de SIIS (siis-estado-2025.json, miles de COP): otros pasivos financieros corrientes vacío + no corrientes 1482113; cash escalón S (compuerta: balance de SIIS cuadra): balance de SIIS (siis-estado-2025.json, miles de COP): efectivo y equivalentes = 4348012
```

### Liga

```text
alta-club.mjs (2026-10-26): co-primeraA, verificado contra roster cacheado de "2025 Liga DIMAYOR" (tools/club-league-reference/co.json), coincidencia exacta "Águilas Doradas".
```

## 2024

### Ingresos

```text
2024: cargado por tools/cargar.mjs (2026-10-26) desde Clubes/Colombia/Aguilas Doradas/siis-estado-2024.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Colombia/Aguilas Doradas/siis-estado-2024.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Por taquilla | pág. 1, Jev 1 |
| 2 | Venta Derechos deportivos | pág. 1, Jev 1 |
| 3 | Publicidad y propaganda | pág. 1, Jev 1 |
| 4 | Dimayor Derechos de televisión | pág. 1, Jev 1 |
| 5 | Dimayor Diferidos | pág. 1, Jev 0.96 |
| 6 | Dimayor participaciones y otros | pág. 1, precedente |
| 7 | Federación Colombiana de futbol | pág. 1, Jev 0.93 |
| 8 | Patrocinios | pág. 1, Jev 1 |
| 9 | Particip. Eventos internales | pág. 1, Jev 0.97 |
| 10 | Otros ingresos | pág. 1, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Costo de ventas | pág. 1, precedente |
| 2 | Gastos de ventas | pág. 1, precedente |
| 3 | Gastos de Personal | pág. 1, Claude 0.85 |
| 4 | Honorarios | pág. 1, Jev 0.98 |
| 5 | Impuestos | pág. 1, Jev 1 |
| 6 | Arrendamientos | pág. 1, Jev 0.99 |
| 7 | Seguros | pág. 1, Claude 0.88 |
| 8 | Servicios generales | pág. 1, Jev 1 |
| 9 | Gastos legales | pág. 1, Jev 1 |
| 10 | Mantenimiento y reparaciones | pág. 1, Jev 0.99 |
| 11 | Gastos de viaje | pág. 1, precedente |
| 12 | Amortizaciones | pág. 1, ? 0.6 |
| 13 | Gastos diversos | pág. 1, precedente |
| 14 | Deterioro de cartera | pág. 1, Jev 0.98 |
| 15 | Otros gastos | pág. 1, precedente |

### Meta

```text
2024: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-26): filas-a-mano. Claude 2026-10-26 (tokens de sesión): ubicación y filas armadas a mano desde el .md con tools/armar-a-mano.mjs
tools/cargar.mjs (2026-10-26). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"), con su tipo; la página marca «s/d» en las categorías que esa línea esconde y explica el caso en «Notas sobre este club».
```

```text
tools/caja-deuda.mjs (2026-10-27): cash escalón S (compuerta: balance de SIIS cuadra y la comparativa del año siguiente de SIIS coincide): balance de SIIS (siis-estado-2024.json, miles de COP): efectivo y equivalentes = 5466637
```

## 2023

### Ingresos

```text
2023: cargado por tools/cargar.mjs (2026-10-26) desde Clubes/Colombia/Aguilas Doradas/siis-estado-2023.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Colombia/Aguilas Doradas/siis-estado-2023.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Ingresos de actividades ordinarias | pág. 1, precedente |
| 2 | Otros ingresos | pág. 1, Jev 0.96 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Costo de ventas | pág. 1, Claude 0.88 |
| 2 | Gastos de ventas | pág. 1, Claude 0.85 |
| 3 | Gastos de administración | pág. 1, Jev 1 |
| 4 | Otros gastos | pág. 1, Jev 0.98 |

### Meta

```text
2023: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-26): filas-a-mano. Claude 2026-10-26 (tokens de sesión): ubicación y filas armadas a mano desde el .md con tools/armar-a-mano.mjs
tools/cargar.mjs (2026-10-26). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"), con su tipo; la página marca «s/d» en las categorías que esa línea esconde y explica el caso en «Notas sobre este club».
```

```text
tools/dentro-de-otro.mjs (2026-10-26): posiblemente dentro de otro rubro, por precedente del club (la fila tiene plata en sus balances desglosados 2021, 2022, 2024, 2025)
```

```text
tools/caja-deuda.mjs (2026-10-27): cash escalón S (compuerta: balance de SIIS cuadra y la comparativa del año siguiente de SIIS coincide): balance de SIIS (siis-estado-2023.json, miles de COP): efectivo y equivalentes = 2287663
```

### Liga

```text
tools/cargar.mjs (2026-10-26): co-primeraA, verificado contra roster cacheado de "2023 Liga DIMAYOR" (tools/club-league-reference/co.json), coincidencia exacta "Águilas Doradas".
```

## 2022

### Ingresos

```text
2022: cargado por tools/cargar.mjs (2026-10-26) desde Clubes/Colombia/Aguilas Doradas/siis-estado-2022.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Colombia/Aguilas Doradas/siis-estado-2022.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Por taquilla | pág. 1, Jev 1 |
| 2 | Venta Derechos deportivos | pág. 1, Jev 1 |
| 3 | Publicidad y propaganda | pág. 1, Jev 1 |
| 4 | Dimayor: Derechos de televisión | pág. 1, Jev 1 |
| 5 | Dimayor: Diferidos | pág. 1, Jev 0.94 |
| 6 | Dimayor participaciones | pág. 1, Jev 0.94 |
| 7 | Federación Colombiana de futbol | pág. 1, Jev 0.93 |
| 8 | Actividades conexas | pág. 1, Jev 0.97 |
| 9 | Otros ingresos | pág. 1, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Gastos de ventas | pág. 1, precedente |
| 2 | Gastos de administración | pág. 1, precedente |
| 3 | Otros gastos | pág. 1, precedente |

### Meta

```text
2022: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-26): filas-a-mano. Claude 2026-10-26 (tokens de sesión): ubicación y filas armadas a mano desde el .md con tools/armar-a-mano.mjs
tools/cargar.mjs (2026-10-26). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"), con su tipo; la página marca «s/d» en las categorías que esa línea esconde y explica el caso en «Notas sobre este club».
```

```text
tools/caja-deuda.mjs (2026-10-27): cash escalón S (compuerta: balance de SIIS cuadra y la comparativa del año siguiente de SIIS coincide): balance de SIIS (siis-estado-2022.json, miles de COP): efectivo y equivalentes = 1101456
```

## 2021

### Ingresos

```text
2021: cargado por tools/cargar.mjs (2026-10-26) desde Clubes/Colombia/Aguilas Doradas/siis-estado-2021.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Colombia/Aguilas Doradas/siis-estado-2021.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Por taquilla | pág. 1, Jev 1 |
| 2 | Venta Derechos deportivos | pág. 1, Jev 1 |
| 3 | Publicidad y propaganda | pág. 1, Jev 1 |
| 4 | Dimayor derechos de televisión | pág. 1, Jev 1 |
| 5 | Dimayor otros conceptos | pág. 1, precedente |
| 6 | Federación Colombiana de futbol | pág. 1, Jev 0.93 |
| 7 | Actividades conexas | pág. 1, Jev 0.97 |
| 8 | Otros ingresos | pág. 1, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Gastos de ventas | pág. 1, precedente |
| 2 | Gastos de administración | pág. 1, precedente |
| 3 | Otros gastos | pág. 1, precedente |

### Meta

```text
2021: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-26): filas-a-mano. Claude 2026-10-26 (tokens de sesión): ubicación y filas armadas a mano desde el .md con tools/armar-a-mano.mjs
tools/cargar.mjs (2026-10-26). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"), con su tipo; la página marca «s/d» en las categorías que esa línea esconde y explica el caso en «Notas sobre este club».
```

```text
tools/caja-deuda.mjs (2026-10-27): cash escalón S (compuerta: balance de SIIS cuadra y la comparativa del año siguiente de SIIS coincide): balance de SIIS (siis-estado-2021.json, miles de COP): efectivo y equivalentes = 2748662
```

## 2020

### Ingresos

```text
2020: cargado por tools/cargar.mjs (2026-10-26) desde Clubes/Colombia/Aguilas Doradas/siis-estado-2020.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Colombia/Aguilas Doradas/siis-estado-2020.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Ingresos de actividades ordinarias | pág. 1, precedente |
| 2 | Otros ingresos | pág. 1, Jev 0.96 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Gastos de ventas | pág. 1, Claude 0.85 |
| 2 | Gastos de administración | pág. 1, Jev 1 |
| 3 | Otros gastos | pág. 1, Jev 0.98 |

### Meta

```text
2020: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-26): filas-a-mano. Claude 2026-10-26 (tokens de sesión): ubicación y filas armadas a mano desde el .md con tools/armar-a-mano.mjs
tools/cargar.mjs (2026-10-26). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"), con su tipo; la página marca «s/d» en las categorías que esa línea esconde y explica el caso en «Notas sobre este club».
```

```text
tools/dentro-de-otro.mjs (2026-10-26): posiblemente dentro de otro rubro, por precedente del club (la fila tiene plata en sus balances desglosados 2021, 2022, 2024, 2025)
```

### Liga

```text
tools/cargar.mjs (2026-10-26): null, SIN VERIFICAR (no aparece en los rosters cacheados de 2020 (co-primeraA, co-primeraB): puede haber jugado otra división).
```

## 2019

### Ingresos

```text
2019: cargado por tools/cargar.mjs (2026-10-26) desde Clubes/Colombia/Aguilas Doradas/siis-estado-2019.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Colombia/Aguilas Doradas/siis-estado-2019.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Ingresos de actividades ordinarias | pág. 1, precedente |
| 2 | Otros ingresos | pág. 1, Jev 0.96 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Gastos de ventas | pág. 1, Claude 0.85 |
| 2 | Gastos de administración | pág. 1, Jev 1 |
| 3 | Otros gastos | pág. 1, Jev 0.98 |

### Meta

```text
2019: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-26): filas-a-mano. Claude 2026-10-26 (tokens de sesión): ubicación y filas armadas a mano desde el .md con tools/armar-a-mano.mjs
tools/cargar.mjs (2026-10-26). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"), con su tipo; la página marca «s/d» en las categorías que esa línea esconde y explica el caso en «Notas sobre este club».
```

```text
tools/dentro-de-otro.mjs (2026-10-26): posiblemente dentro de otro rubro, por precedente del club (la fila tiene plata en sus balances desglosados 2021, 2022, 2024, 2025)
```

```text
tools/caja-deuda.mjs (2026-10-27): grossDebt escalón S (compuerta: balance de SIIS cuadra y la comparativa del año siguiente de SIIS coincide): balance de SIIS (siis-estado-2019.json, miles de COP): otros pasivos financieros corrientes 24766 + no corrientes vacío; cash escalón S (compuerta: balance de SIIS cuadra y la comparativa del año siguiente de SIIS coincide): balance de SIIS (siis-estado-2019.json, miles de COP): efectivo y equivalentes = 1751871
```

### Liga

```text
tools/cargar.mjs (2026-10-26): null, SIN VERIFICAR (no aparece en los rosters cacheados de 2019 (co-primeraA, co-primeraB): puede haber jugado otra división).
```

## 2018

### Ingresos

```text
2018: cargado por tools/cargar.mjs (2026-10-26) desde Clubes/Colombia/Aguilas Doradas/siis-estado-2018.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Colombia/Aguilas Doradas/siis-estado-2018.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Ingresos de actividades ordinarias | pág. 1, precedente |
| 2 | Otros ingresos | pág. 1, Jev 0.96 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Costo de ventas | pág. 1, Claude 0.88 |
| 2 | Gastos de ventas | pág. 1, Claude 0.85 |
| 3 | Gastos de administración | pág. 1, Jev 1 |
| 4 | Otros gastos | pág. 1, Jev 0.98 |

### Meta

```text
2018: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-26): filas-a-mano. Claude 2026-10-26 (tokens de sesión): ubicación y filas armadas a mano desde el .md con tools/armar-a-mano.mjs
tools/cargar.mjs (2026-10-26). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"), con su tipo; la página marca «s/d» en las categorías que esa línea esconde y explica el caso en «Notas sobre este club».
```

```text
tools/dentro-de-otro.mjs (2026-10-26): posiblemente dentro de otro rubro, por precedente del club (la fila tiene plata en sus balances desglosados 2021, 2022, 2024, 2025)
```

```text
tools/caja-deuda.mjs (2026-10-27): grossDebt escalón S (compuerta: balance de SIIS cuadra y la comparativa del año siguiente de SIIS coincide): balance de SIIS (siis-estado-2018.json, miles de COP): otros pasivos financieros corrientes 20211 + no corrientes 1000000; cash escalón S (compuerta: balance de SIIS cuadra y la comparativa del año siguiente de SIIS coincide): balance de SIIS (siis-estado-2018.json, miles de COP): efectivo y equivalentes = 341921
```

### Liga

```text
tools/cargar.mjs (2026-10-26): null, SIN VERIFICAR (no aparece en los rosters cacheados de 2018 (co-primeraA, co-primeraB): puede haber jugado otra división).
```

## 2017

### Ingresos

```text
2017: cargado por tools/cargar.mjs (2026-10-26) desde Clubes/Colombia/Aguilas Doradas/siis-estado-2017.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Colombia/Aguilas Doradas/siis-estado-2017.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Ingresos de actividades ordinarias | pág. 1, precedente |
| 2 | Otros ingresos | pág. 1, Jev 0.96 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Costo de ventas | pág. 1, Claude 0.88 |
| 2 | Gastos de ventas | pág. 1, Claude 0.85 |
| 3 | Gastos de administración | pág. 1, Jev 1 |
| 4 | Otros gastos | pág. 1, Jev 0.98 |

### Meta

```text
2017: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-26): filas-a-mano. Claude 2026-10-26 (tokens de sesión): ubicación y filas armadas a mano desde el .md con tools/armar-a-mano.mjs
tools/cargar.mjs (2026-10-26). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"), con su tipo; la página marca «s/d» en las categorías que esa línea esconde y explica el caso en «Notas sobre este club».
```

```text
tools/dentro-de-otro.mjs (2026-10-26): posiblemente dentro de otro rubro, por precedente del club (la fila tiene plata en sus balances desglosados 2021, 2022, 2024, 2025)
```

```text
tools/caja-deuda.mjs (2026-10-27): grossDebt escalón S (compuerta: balance de SIIS cuadra y la comparativa del año siguiente de SIIS coincide): balance de SIIS (siis-estado-2017.json, miles de COP): otros pasivos financieros corrientes 32786 + no corrientes 1305556; cash escalón S (compuerta: balance de SIIS cuadra y la comparativa del año siguiente de SIIS coincide): balance de SIIS (siis-estado-2017.json, miles de COP): efectivo y equivalentes = 3114166
```

### Liga

```text
tools/cargar.mjs (2026-10-26): null, SIN VERIFICAR (no aparece en los rosters cacheados de 2017 (co-primeraA, co-primeraB): puede haber jugado otra división).
```

## 2016

### Ingresos

```text
2016: cargado por tools/cargar.mjs (2026-10-26) desde Clubes/Colombia/Aguilas Doradas/siis-estado-2016.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Colombia/Aguilas Doradas/siis-estado-2016.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Ingresos de actividades ordinarias | pág. 1, precedente |
| 2 | Otros ingresos | pág. 1, Jev 0.96 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Gastos de ventas | pág. 1, Claude 0.85 |
| 2 | Gastos de administración | pág. 1, Jev 1 |
| 3 | Otros gastos | pág. 1, Jev 0.98 |

### Meta

```text
2016: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-26): filas-a-mano. Claude 2026-10-26 (tokens de sesión): ubicación y filas armadas a mano desde el .md con tools/armar-a-mano.mjs
tools/cargar.mjs (2026-10-26). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"), con su tipo; la página marca «s/d» en las categorías que esa línea esconde y explica el caso en «Notas sobre este club».
```

```text
tools/dentro-de-otro.mjs (2026-10-26): posiblemente dentro de otro rubro, por precedente del club (la fila tiene plata en sus balances desglosados 2021, 2022, 2024, 2025)
```

```text
tools/caja-deuda.mjs (2026-10-27): grossDebt escalón S (compuerta: balance de SIIS cuadra y la comparativa del año siguiente de SIIS coincide): balance de SIIS (siis-estado-2016.json, miles de COP): otros pasivos financieros corrientes 9015 + no corrientes vacío; cash escalón S (compuerta: balance de SIIS cuadra y la comparativa del año siguiente de SIIS coincide): balance de SIIS (siis-estado-2016.json, miles de COP): efectivo y equivalentes = 1167728
```

### Liga

```text
tools/cargar.mjs (2026-10-26): null, SIN VERIFICAR (no aparece en los rosters cacheados de 2016 (co-primeraA, co-primeraB): puede haber jugado otra división).
```

## Fuentes

### aguilasdoradas-co-siis-estado-2024

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-26) desde la transcripción Clubes/Colombia/Aguilas Doradas/siis-estado-2024.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### aguilasdoradas-co-siis-estado-2016

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-26) desde la transcripción Clubes/Colombia/Aguilas Doradas/siis-estado-2016.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### aguilasdoradas-co-siis-estado-2017

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-26) desde la transcripción Clubes/Colombia/Aguilas Doradas/siis-estado-2017.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### aguilasdoradas-co-siis-estado-2018

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-26) desde la transcripción Clubes/Colombia/Aguilas Doradas/siis-estado-2018.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### aguilasdoradas-co-siis-estado-2019

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-26) desde la transcripción Clubes/Colombia/Aguilas Doradas/siis-estado-2019.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### aguilasdoradas-co-siis-estado-2020

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-26) desde la transcripción Clubes/Colombia/Aguilas Doradas/siis-estado-2020.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### aguilasdoradas-co-siis-estado-2021

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-26) desde la transcripción Clubes/Colombia/Aguilas Doradas/siis-estado-2021.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### aguilasdoradas-co-siis-estado-2022

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-26) desde la transcripción Clubes/Colombia/Aguilas Doradas/siis-estado-2022.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### aguilasdoradas-co-siis-estado-2023

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-26) desde la transcripción Clubes/Colombia/Aguilas Doradas/siis-estado-2023.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### aguilasdoradas-co-siis-estado-2025

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-26) desde la transcripción Clubes/Colombia/Aguilas Doradas/siis-estado-2025.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```
