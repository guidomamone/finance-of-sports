# dynamomoscow-ru — evidencia de carga

Lo que había como comentario en `data/dynamomoscow-ru-data.js`, movido tal cual por `tools/mover-comentarios-data.mjs` (la regla:
`Admin/CONVENCIONES-DATOS.md`, "data/<club>-data.js NO LLEVA COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y
meta. Las notas de cada fila van en una tabla con su número de fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
============================================================================
data/dynamomoscow-ru-data.js — AO Football Club Dynamo-Moscow (Rusia).
ALTA POR SCRIPT (tools/alta-club.mjs, 2026-10-10), SIN EJERCICIOS CARGADOS TODAVÍA:
las estructuras de abajo están vacías a propósito. Los rubros, los totales
oficiales y el resto del fiscalYearMeta los agrega la etapa de carga
(tools/proponer-carga.mjs / sesión de onboarding), que es también la que
reemplaza esta cabecera por la de siempre (fuente, perímetro, categorización).

Documento que originó el alta: Clubes/Rusia/Dynamo Moscow/bfo-2021-datos.md

De dónde salió cada campo (estado según alta-club.mjs: ok / pendiente):
  id                 ok        "dynamomoscow-ru" — slug de "Dynamo Moscow" + '-ru' (convención de clubId, Admin/CONVENCIONES.md Versión 129)
  name               ok        "AO Football Club Dynamo-Moscow" — ajuste manual (Admin/ajustes-manuales.jsonl, Guido 2026-10-10): Revisión del alta (Claude, 2026-10-09): АО "ФК "Динамо-Москва" (ИНН 7714067099)
  displayName        ok        "Dynamo Moscow" — nombre de la carpeta del club en Clubes/
  country            ok        "RU" — carpeta de país "Rusia" (tabla PAISES)
  reportingCurrency  ok        "RUB" — moneda de curso legal de Rusia
  fiscalYearStart    ok        "01-01" — cierre del ejercicio: contenido del .md (4 de 4 fechas de fin de mes caen en el mes 12)
  sport              ok        "futbol" — el .md nombra el fútbol 1 veces y ningún otro deporte más que eso
  brandColor         pendiente (ausente) — la liga del club no está en tools/brand-color-reference/ (o el club no está en footylogos)
  anio               ok        2021 — nombre del archivo (misma regla que onboard.mjs --quien), confirmado por las fechas de cierre del .md
  cierre             ok        "2021-12-31" — año del ejercicio + mes de cierre (contenido del .md (4 de 4 fechas de fin de mes caen en el mes 12))
  reportType         ok        "official_balance_sheet" — el .md tiene un estado contable (resultados / balance) y el nombre del archivo no sugiere otro tipo
  perimetro          ok        "individual" — el .md no presenta estados consolidados (0 menciones de "consolidado")
  currency           ok        "RUB" — moneda de curso legal de Rusia (tabla PAISES de alta-club.mjs)
  fxRef              ok        "RUB@2021-12-31" — el documento no declara tipo de cambio; FX_CLOSE ya tiene RUB@2021-12-31 = 74.2926 (Tipo oficial del Banco de Rusia al 2021-12-31)
  sourceId           ok        "dynamomoscow-ru-bfo-2021-datos" — clubId + nombre del archivo en slug
  liga               ok        "ru-premierliga" — roster cacheado de "2021–22 Russian Premier League" (tools/club-league-reference/ru.json), coincidencia única por palabras "Dynamo" = "Dynamo Moscow"

FISCAL YEAR META PROPUESTO para 2021 (NO registrado: un ejercicio con meta y
sin rubros se vería en el sitio como un año en cero, y "sin dato no es cero"):
  2021: {"reportType":"official_balance_sheet","currency":"RUB","fxRef":"RUB@2021-12-31","sourceId":"dynamomoscow-ru-bfo-2021-datos"}
============================================================================
```

## 2025

### Ingresos

```text
2025: cargado por tools/bfo-rusia.mjs (2026-10-10) desde Clubes/Rusia/Dynamo Moscow/bfo-2025-datos.md. Filas y categorías: formulario 2 del GIR BO (código del fisco → categoría, mapa fijo de bfo-rusia.mjs; escalón 2 de notas y formulario 6 donde corresponde). Tie-out contra lo impreso: -; resultado "Чистая прибыль (убыток), código 2400 (suma verificada contra".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Выручка (2110) | pág. ?, ? |
| 2 | Прочие доходы (2340) | pág. ?, ? |

### Gastos

```text
tools/cargar.mjs (2026-10-10)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Себестоимость продаж (2120) | pág. ?, ? |
| 2 | Коммерческие расходы (2210) | pág. ?, ? |
| 3 | Управленческие расходы (2220) | pág. ?, ? |
| 4 | Прочие расходы (2350) | pág. ?, ? |

### Meta

```text
tools/cargar.mjs (2026-10-10). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

_al lado del campo `incluidoEn`:_

```text
ajuste manual `incluye`: el documento junta estas categorías con otra línea
```

```text
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee (Versión 332).
```

## 2024

### Ingresos

```text
2024: cargado por tools/bfo-rusia.mjs (2026-10-10) desde Clubes/Rusia/Dynamo Moscow/bfo-2024-datos.md. Filas y categorías: formulario 2 del GIR BO (código del fisco → categoría, mapa fijo de bfo-rusia.mjs; escalón 2 de notas y formulario 6 donde corresponde). Tie-out contra lo impreso: -; resultado "Чистая прибыль (убыток), código 2400 (suma verificada contra".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Выручка (2110) | pág. ?, ? |
| 2 | Прочие доходы (2340) | pág. ?, ? |

### Gastos

```text
tools/cargar.mjs (2026-10-10)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Себестоимость продаж (2120) | pág. ?, ? |
| 2 | Коммерческие расходы (2210) | pág. ?, ? |
| 3 | Управленческие расходы (2220) | pág. ?, ? |
| 4 | Прочие расходы (2350) | pág. ?, ? |

### Meta

```text
tools/cargar.mjs (2026-10-10). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

_al lado del campo `incluidoEn`:_

```text
ajuste manual `incluye`: el documento junta estas categorías con otra línea
```

```text
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee (Versión 332).
```

## 2023

### Ingresos

```text
2023: cargado por tools/bfo-rusia.mjs (2026-10-10) desde Clubes/Rusia/Dynamo Moscow/bfo-2023-datos.md. Filas y categorías: formulario 2 del GIR BO (código del fisco → categoría, mapa fijo de bfo-rusia.mjs; escalón 2 de notas y formulario 6 donde corresponde). Tie-out contra lo impreso: -; resultado "Чистая прибыль (убыток), código 2400 (suma verificada contra".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Выручка (2110) | pág. ?, ? |
| 2 | Прочие доходы (2340) | pág. ?, ? |

### Gastos

```text
tools/cargar.mjs (2026-10-10)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Себестоимость продаж (2120) | pág. ?, ? |
| 2 | Коммерческие расходы (2210) | pág. ?, ? |
| 3 | Управленческие расходы (2220) | pág. ?, ? |
| 4 | Прочие расходы (2350) | pág. ?, ? |

### Meta

```text
tools/cargar.mjs (2026-10-10). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

_al lado del campo `incluidoEn`:_

```text
ajuste manual `incluye`: el documento junta estas categorías con otra línea
```

```text
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee (Versión 332).
```

## 2022

### Ingresos

```text
2022: cargado por tools/bfo-rusia.mjs (2026-10-10) desde Clubes/Rusia/Dynamo Moscow/bfo-2022-datos.md. Filas y categorías: formulario 2 del GIR BO (código del fisco → categoría, mapa fijo de bfo-rusia.mjs; escalón 2 de notas y formulario 6 donde corresponde). Tie-out contra lo impreso: -; resultado "Чистая прибыль (убыток), código 2400 (suma verificada contra".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Выручка (2110) | pág. ?, ? |
| 2 | Прочие доходы (2340) | pág. ?, ? |

### Gastos

```text
tools/cargar.mjs (2026-10-10)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Себестоимость продаж (2120) | pág. ?, ? |
| 2 | Коммерческие расходы (2210) | pág. ?, ? |
| 3 | Управленческие расходы (2220) | pág. ?, ? |
| 4 | Прочие расходы (2350) | pág. ?, ? |

### Meta

```text
tools/cargar.mjs (2026-10-10). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

_al lado del campo `incluidoEn`:_

```text
ajuste manual `incluye`: el documento junta estas categorías con otra línea
```

```text
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee (Versión 332).
```

## 2021

### Ingresos

```text
2021: cargado por tools/bfo-rusia.mjs (2026-10-10) desde Clubes/Rusia/Dynamo Moscow/bfo-2021-datos.md. Filas y categorías: formulario 2 del GIR BO (código del fisco → categoría, mapa fijo de bfo-rusia.mjs; escalón 2 de notas y formulario 6 donde corresponde). Tie-out contra lo impreso: -; resultado "Чистая прибыль (убыток), código 2400 (suma verificada contra".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Выручка (2110) | pág. ?, ? |
| 2 | Прочие доходы (2340) | pág. ?, ? |

### Gastos

```text
tools/cargar.mjs (2026-10-10)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Себестоимость продаж (2120) | pág. ?, ? |
| 2 | Коммерческие расходы (2210) | pág. ?, ? |
| 3 | Управленческие расходы (2220) | pág. ?, ? |
| 4 | Прочие расходы (2350) | pág. ?, ? |

### Meta

```text
tools/cargar.mjs (2026-10-10). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

_al lado del campo `incluidoEn`:_

```text
ajuste manual `incluye`: el documento junta estas categorías con otra línea
```

```text
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee (Versión 332).
```

## Fuentes

### (general)

```text
Fuentes de cada ejercicio: las agrega tools/cargar.mjs adentro de este bloque (Versión 379: hasta la 378 el esqueleto no lo traía y la
primera carga de un club dado de alta por script se revertía, "no encontré Object.assign(sources, {"; caso: Fortaleza CEIF).
```
