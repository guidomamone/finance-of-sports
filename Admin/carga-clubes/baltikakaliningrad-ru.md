# baltikakaliningrad-ru — evidencia de carga

Lo que había como comentario en `data/ru/baltikakaliningrad-ru-data.js`, movido tal cual por `tools/archivo/mover-comentarios-data.mjs` (la regla:
`Admin/CONVENCIONES-DATOS.md`, "data/<país>/<club>-data.js NO LLEVA COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y
meta. Las notas de cada fila van en una tabla con su número de fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
============================================================================
data/ru/baltikakaliningrad-ru-data.js — AO Football Club Baltika (Rusia).
ALTA POR SCRIPT (tools/alta-club.mjs, 2026-10-10), SIN EJERCICIOS CARGADOS TODAVÍA:
las estructuras de abajo están vacías a propósito. Los rubros, los totales
oficiales y el resto del fiscalYearMeta los agrega la etapa de carga
(tools/proponer-carga.mjs / sesión de onboarding), que es también la que
reemplaza esta cabecera por la de siempre (fuente, perímetro, categorización).

Documento que originó el alta: Clubes/Rusia/Baltika Kaliningrad/bfo-2022-datos.md

De dónde salió cada campo (estado según alta-club.mjs: ok / pendiente):
  id                 ok        "baltikakaliningrad-ru" — slug de "Baltika Kaliningrad" + '-ru' (convención de clubId, Admin/CONVENCIONES.md Versión 129)
  name               ok        "AO Football Club Baltika" — ajuste manual (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-10): Revisión del alta (Claude, 2026-10-09): АО "Футбольный клуб "Балтика" (ИНН 3905064260)
  displayName        ok        "Baltika Kaliningrad" — nombre de la carpeta del club en Clubes/
  country            ok        "RU" — carpeta de país "Rusia" (tabla PAISES)
  reportingCurrency  ok        "RUB" — moneda de curso legal de Rusia
  fiscalYearStart    ok        "01-01" — cierre del ejercicio: contenido del .md (4 de 4 fechas de fin de mes caen en el mes 12)
  sport              ok        "futbol" — el .md nombra el fútbol 1 veces y ningún otro deporte más que eso
  brandColor         pendiente (ausente) — la liga del club no está en tools/brand-color-reference/ (o el club no está en footylogos)
  anio               ok        2022 — nombre del archivo (misma regla que onboard.mjs --quien), confirmado por las fechas de cierre del .md
  cierre             ok        "2022-12-31" — año del ejercicio + mes de cierre (contenido del .md (4 de 4 fechas de fin de mes caen en el mes 12))
  reportType         ok        "official_balance_sheet" — el .md tiene un estado contable (resultados / balance) y el nombre del archivo no sugiere otro tipo
  perimetro          ok        "individual" — el .md no presenta estados consolidados (0 menciones de "consolidado")
  currency           ok        "RUB" — moneda de curso legal de Rusia (tabla PAISES de alta-club.mjs)
  fxRef              ok        "RUB@2022-12-31" — el documento no declara tipo de cambio; FX_CLOSE ya tiene RUB@2022-12-31 = 70.3375 (Tipo oficial del Banco de Rusia al 2022-12-31)
  sourceId           ok        "baltikakaliningrad-ru-bfo-2022-datos" — clubId + nombre del archivo en slug
  liga               ok        "ru-pervayaliga" — roster cacheado de "2022–23 Russian First League" (tools/club-league-reference/ru.json), coincidencia exacta "Baltika Kaliningrad"

FISCAL YEAR META PROPUESTO para 2022 (NO registrado: un ejercicio con meta y
sin rubros se vería en el sitio como un año en cero, y "sin dato no es cero"):
  2022: {"reportType":"official_balance_sheet","currency":"RUB","fxRef":"RUB@2022-12-31","sourceId":"baltikakaliningrad-ru-bfo-2022-datos"}
============================================================================
```

_de data/clubs.js:_

```text
Baltika Kaliningrad: alta por tools/alta-club.mjs (2026-10-10) desde Clubes/Rusia/Baltika Kaliningrad/bfo-2022-datos.md. brandColor #0000FF
(procedencia en Admin/sourcing/Rusia/Baltika Kaliningrad.md; tools/bfo-rusia.mjs).
```

_de data/club-leagues/ru.js:_

```text
Baltika Kaliningrad (alta-club.mjs, 2026-10-10): verificado contra roster cacheado de "2022–23 Russian First League" (tools/club-league-reference/ru.json), coincidencia exacta "Baltika Kaliningrad".
```

## 2025

### Ingresos

```text
2025: cargado por tools/bfo-rusia.mjs (2026-10-10) desde Clubes/Rusia/Baltika Kaliningrad/bfo-2025-datos.md. Filas y categorías: formulario 2 del GIR BO (código del fisco → categoría, mapa fijo de bfo-rusia.mjs; escalón 2 de notas y formulario 6 donde corresponde). Tie-out contra lo impreso: -; resultado "Чистая прибыль (убыток), código 2400 (suma verificada contra".
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

```text
tools/caja-deuda.mjs (2026-10-17): grossDebt escalón R (compuerta: JSON del año anterior): Rusia, balance del fisco: código 1410 + 1510 = 0 miles de RUB (bfo-2025-datos.json); cash escalón R (compuerta: JSON del año anterior): Rusia, balance del fisco: código 1250 = 1297 miles de RUB (bfo-2025-datos.json)
```

### Liga

```text
2025: tools/cargar.mjs 2026-10-10, verificado contra roster cacheado de "2025–26 Russian Premier League" (tools/club-league-reference/ru.json),
```

## 2024

### Ingresos

```text
2024: cargado por tools/bfo-rusia.mjs (2026-10-10) desde Clubes/Rusia/Baltika Kaliningrad/bfo-2024-datos.md. Filas y categorías: formulario 2 del GIR BO (código del fisco → categoría, mapa fijo de bfo-rusia.mjs; escalón 2 de notas y formulario 6 donde corresponde). Tie-out contra lo impreso: -; resultado "Чистая прибыль (убыток), código 2400 (suma verificada contra".
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

```text
tools/caja-deuda.mjs (2026-10-17): grossDebt escalón R (compuerta: JSON del año siguiente): Rusia, balance del fisco: código 1410 + 1510 = 0 miles de RUB (bfo-2024-datos.json); cash escalón R (compuerta: JSON del año siguiente): Rusia, balance del fisco: código 1250 = 15344 miles de RUB (bfo-2024-datos.json)
```

### Liga

```text
2024: tools/cargar.mjs 2026-10-10, verificado contra roster cacheado de "2024–25 Russian First League" (tools/club-league-reference/ru.json), c
```

## 2023

### Ingresos

```text
2023: cargado por tools/bfo-rusia.mjs (2026-10-10) desde Clubes/Rusia/Baltika Kaliningrad/bfo-2023-datos.md. Filas y categorías: formulario 2 del GIR BO (código del fisco → categoría, mapa fijo de bfo-rusia.mjs; escalón 2 de notas y formulario 6 donde corresponde). Tie-out contra lo impreso: -; resultado "Чистая прибыль (убыток), código 2400 (suma verificada contra".
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

```text
tools/caja-deuda.mjs (2026-10-17): grossDebt escalón R (compuerta: JSON del año siguiente): Rusia, balance del fisco: código 1410 + 1510 = 0 miles de RUB (bfo-2023-datos.json); cash escalón R (compuerta: JSON del año siguiente): Rusia, balance del fisco: código 1250 = 36535 miles de RUB (bfo-2023-datos.json)
```

### Liga

```text
2023: tools/cargar.mjs 2026-10-10, verificado contra roster cacheado de "2023–24 Russian Premier League" (tools/club-league-reference/ru.json),
```

## 2022

### Ingresos

```text
2022: cargado por tools/bfo-rusia.mjs (2026-10-10) desde Clubes/Rusia/Baltika Kaliningrad/bfo-2022-datos.md. Filas y categorías: formulario 2 del GIR BO (código del fisco → categoría, mapa fijo de bfo-rusia.mjs; escalón 2 de notas y formulario 6 donde corresponde). Tie-out contra lo impreso: -; resultado "Чистая прибыль (убыток), código 2400 (suma verificada contra".
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

```text
tools/caja-deuda.mjs (2026-10-17): grossDebt escalón R (compuerta: JSON del año siguiente): Rusia, balance del fisco: código 1410 + 1510 = 0 miles de RUB (bfo-2022-datos.json); cash escalón R (compuerta: JSON del año siguiente): Rusia, balance del fisco: código 1250 = 1658 miles de RUB (bfo-2022-datos.json)
```

### Liga

```text
2022: tools/cargar.mjs 2026-10-10, verificado contra data/club-leagues/ru.js ya tiene la fila
```

## Gestiones

_investigado por un subagente (Sonnet) con fuente por gestión, 2026-10-13; to-do 195:_

```text
Kirill Volzhenkin (2021-08-16 a 2023-12-11): RBC Kaliningrado 16/08/2021: nombrado ese día, tras irse Tazhutdin Kachukaev. Sport-Express 11/12/2023: el club informó su salida por voluntad propia ese día.
Ravil Izmailov (2023-12-11 a hoy): Sport-Express y Match TV 11/12/2023: Baltika anunció su nombramiento ese día (venía de Pari NN). Sigue en 2026.
Duda: El cierre 2023-12-31 queda en la gestión de Izmailov, que asumió 20 días antes; el ejercicio 2023 casi entero fue de Volzhenkin (campo firmo a evaluar).
```

## Fuentes

### (general)

```text
Fuentes de cada ejercicio: las agrega tools/cargar.mjs adentro de este bloque (Versión 379: hasta la 378 el esqueleto no lo traía y la
primera carga de un club dado de alta por script se revertía, "no encontré Object.assign(sources, {"; caso: Fortaleza CEIF).
```

### baltikakaliningrad-ru-bfo-2022-datos

_note (data/):_

```text
Cargado por tools/bfo-rusia.mjs (2026-10-10) desde Clubes/Rusia/Baltika Kaliningrad/bfo-2022-datos.json: datos oficiales del Servicio Federal de Impuestos (GIR BO), formulario 2 en miles de rublos; la suma de los renglones da el 2300 impreso. Transcripción legible: Clubes/Rusia/Baltika Kaliningrad/bfo-2022-datos.md.
```

### baltikakaliningrad-ru-bfo-2023-datos

_note (data/):_

```text
Cargado por tools/bfo-rusia.mjs (2026-10-10) desde Clubes/Rusia/Baltika Kaliningrad/bfo-2023-datos.json: datos oficiales del Servicio Federal de Impuestos (GIR BO), formulario 2 en miles de rublos; la suma de los renglones da el 2300 impreso. Transcripción legible: Clubes/Rusia/Baltika Kaliningrad/bfo-2023-datos.md.
```

### baltikakaliningrad-ru-bfo-2024-datos

_note (data/):_

```text
Cargado por tools/bfo-rusia.mjs (2026-10-10) desde Clubes/Rusia/Baltika Kaliningrad/bfo-2024-datos.json: datos oficiales del Servicio Federal de Impuestos (GIR BO), formulario 2 en miles de rublos; la suma de los renglones da el 2300 impreso. Transcripción legible: Clubes/Rusia/Baltika Kaliningrad/bfo-2024-datos.md.
```

### baltikakaliningrad-ru-bfo-2025-datos

_note (data/):_

```text
Cargado por tools/bfo-rusia.mjs (2026-10-10) desde Clubes/Rusia/Baltika Kaliningrad/bfo-2025-datos.json: datos oficiales del Servicio Federal de Impuestos (GIR BO), formulario 2 en miles de rublos; la suma de los renglones da el 2300 impreso. Transcripción legible: Clubes/Rusia/Baltika Kaliningrad/bfo-2025-datos.md.
```
