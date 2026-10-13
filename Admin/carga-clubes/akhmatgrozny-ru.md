# akhmatgrozny-ru — evidencia de carga

Lo que había como comentario en `data/akhmatgrozny-ru-data.js`, movido tal cual por `tools/mover-comentarios-data.mjs` (la regla:
`Admin/CONVENCIONES-DATOS.md`, "data/<club>-data.js NO LLEVA COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y
meta. Las notas de cada fila van en una tabla con su número de fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
============================================================================
data/akhmatgrozny-ru-data.js — ANO Republican Football Club Akhmat (Rusia).
ALTA POR SCRIPT (tools/alta-club.mjs, 2026-10-10), SIN EJERCICIOS CARGADOS TODAVÍA:
las estructuras de abajo están vacías a propósito. Los rubros, los totales
oficiales y el resto del fiscalYearMeta los agrega la etapa de carga
(tools/proponer-carga.mjs / sesión de onboarding), que es también la que
reemplaza esta cabecera por la de siempre (fuente, perímetro, categorización).

Documento que originó el alta: Clubes/Rusia/Akhmat Grozny/bfo-2022-datos.md

De dónde salió cada campo (estado según alta-club.mjs: ok / pendiente):
  id                 ok        "akhmatgrozny-ru" — slug de "Akhmat Grozny" + '-ru' (convención de clubId, Admin/CONVENCIONES.md Versión 129)
  name               ok        "ANO Republican Football Club Akhmat" — ajuste manual (Admin/ajustes-manuales.jsonl, Guido 2026-10-10): Revisión del alta (Claude, 2026-10-09): АНО "Республиканский футбольный клуб "Ахмат" (
  displayName        ok        "Akhmat Grozny" — nombre de la carpeta del club en Clubes/
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
  sourceId           ok        "akhmatgrozny-ru-bfo-2022-datos" — clubId + nombre del archivo en slug
  liga               ok        "ru-premierliga" — roster cacheado de "2022–23 Russian Premier League" (tools/club-league-reference/ru.json), coincidencia única por palabras "Akhmat" = "Akhmat Grozny"

FISCAL YEAR META PROPUESTO para 2022 (NO registrado: un ejercicio con meta y
sin rubros se vería en el sitio como un año en cero, y "sin dato no es cero"):
  2022: {"reportType":"official_balance_sheet","currency":"RUB","fxRef":"RUB@2022-12-31","sourceId":"akhmatgrozny-ru-bfo-2022-datos"}
============================================================================
```

_de data/clubs.js:_

```text
Akhmat Grozny: alta por tools/alta-club.mjs (2026-10-10) desde Clubes/Rusia/Akhmat Grozny/bfo-2022-datos.md. brandColor #00782F
(procedencia en fuentes/Rusia/Akhmat Grozny.md; tools/bfo-rusia.mjs).
```

_de data/club-leagues/ru.js:_

```text
Akhmat Grozny (alta-club.mjs, 2026-10-10): verificado contra roster cacheado de "2022–23 Russian Premier League" (tools/club-league-reference/ru.json), coincidencia única por palabras "Akhmat" = "Akhmat Grozny".
```

## 2025

### Ingresos

```text
2025: cargado por tools/bfo-rusia.mjs (2026-10-10) desde Clubes/Rusia/Akhmat Grozny/bfo-2025-datos.md. Filas y categorías: formulario 2 del GIR BO (código del fisco → categoría, mapa fijo de bfo-rusia.mjs; escalón 2 de notas y formulario 6 donde corresponde). Tie-out contra lo impreso: -; resultado "Чистая прибыль (убыток), código 2400 (suma verificada contra".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Прочие доходы (2340) | pág. ?, ? |
| 2 | Целевые взносы (6220, форма 6) | pág. ?, ? |
| 3 | Прочие поступления (6250, форма 6) | pág. ?, ? |

### Gastos

```text
tools/cargar.mjs (2026-10-10)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Прочие расходы (2350) | pág. ?, ? |
| 2 | Расходы на целевые мероприятия (6310, форма 6) | pág. ?, ? |
| 3 | Расходы на содержание аппарата управления (6320, форма 6) | pág. ?, ? |

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

### Liga

```text
2025: tools/cargar.mjs 2026-10-10, verificado contra roster cacheado de "2025–26 Russian Premier League" (tools/club-league-reference/ru.json),
```

```text
2025: tools/cargar.mjs 2026-10-10, verificado contra data/club-leagues/ru.js ya tiene la fila
```

## 2024

### Ingresos

```text
2024: cargado por tools/bfo-rusia.mjs (2026-10-10) desde Clubes/Rusia/Akhmat Grozny/bfo-2024-datos.md. Filas y categorías: formulario 2 del GIR BO (código del fisco → categoría, mapa fijo de bfo-rusia.mjs; escalón 2 de notas y formulario 6 donde corresponde). Tie-out contra lo impreso: -; resultado "Чистая прибыль (убыток), código 2400 (suma verificada contra".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Прочие доходы (2340) | pág. ?, ? |
| 2 | Целевые взносы (6220, форма 6) | pág. ?, ? |

### Gastos

```text
tools/cargar.mjs (2026-10-10)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Прочие расходы (2350) | pág. ?, ? |
| 2 | Расходы на целевые мероприятия (6310, форма 6) | pág. ?, ? |

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

### Liga

```text
2024: tools/cargar.mjs 2026-10-10, verificado contra roster cacheado de "2024–25 Russian Premier League" (tools/club-league-reference/ru.json),
```

```text
2024: tools/cargar.mjs 2026-10-10, verificado contra data/club-leagues/ru.js ya tiene la fila
```

## 2023

### Ingresos

```text
2023: cargado por tools/bfo-rusia.mjs (2026-10-10) desde Clubes/Rusia/Akhmat Grozny/bfo-2023-datos.md. Filas y categorías: formulario 2 del GIR BO (código del fisco → categoría, mapa fijo de bfo-rusia.mjs; escalón 2 de notas y formulario 6 donde corresponde). Tie-out contra lo impreso: -; resultado "Чистая прибыль (убыток), código 2400 (suma verificada contra".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Прочие доходы (2340) | pág. ?, ? |
| 2 | Целевые взносы (6220, форма 6) | pág. ?, ? |

### Gastos

```text
tools/cargar.mjs (2026-10-10)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Прочие расходы (2350) | pág. ?, ? |
| 2 | Расходы на целевые мероприятия (6310, форма 6) | pág. ?, ? |

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

### Liga

```text
2023: tools/cargar.mjs 2026-10-10, verificado contra roster cacheado de "2023–24 Russian Premier League" (tools/club-league-reference/ru.json),
```

```text
2023: tools/cargar.mjs 2026-10-10, verificado contra data/club-leagues/ru.js ya tiene la fila
```

## 2022

### Ingresos

```text
2022: cargado por tools/bfo-rusia.mjs (2026-10-10) desde Clubes/Rusia/Akhmat Grozny/bfo-2022-datos.md. Filas y categorías: formulario 2 del GIR BO (código del fisco → categoría, mapa fijo de bfo-rusia.mjs; escalón 2 de notas y formulario 6 donde corresponde). Tie-out contra lo impreso: -; resultado "Чистая прибыль (убыток), código 2400 (suma verificada contra".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Прочие доходы (2340) | pág. ?, ? |
| 2 | Целевые взносы (6220, форма 6) | pág. ?, ? |
| 3 | Добровольные имущественные взносы и пожертвования (6230, форма 6) | pág. ?, ? |
| 4 | Прочие поступления (6250, форма 6) | pág. ?, ? |

### Gastos

```text
tools/cargar.mjs (2026-10-10)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Прочие расходы (2350) | pág. ?, ? |
| 2 | Расходы на целевые мероприятия (6310, форма 6) | pág. ?, ? |

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

### Liga

```text
2022: tools/cargar.mjs 2026-10-10, verificado contra data/club-leagues/ru.js ya tiene la fila
```

```text
2022: tools/cargar.mjs 2026-10-10, verificado contra data/club-leagues/ru.js ya tiene la fila
```

## Fuentes

### (general)

```text
Fuentes de cada ejercicio: las agrega tools/cargar.mjs adentro de este bloque (Versión 379: hasta la 378 el esqueleto no lo traía y la
primera carga de un club dado de alta por script se revertía, "no encontré Object.assign(sources, {"; caso: Fortaleza CEIF).
```

### akhmatgrozny-ru-bfo-2022-datos

_note (data/):_

```text
Cargado por tools/bfo-rusia.mjs (2026-10-10) desde Clubes/Rusia/Akhmat Grozny/bfo-2022-datos.json: datos oficiales del Servicio Federal de Impuestos (GIR BO), formulario 2 en miles de rublos; la suma de los renglones da el 2300 impreso. Transcripción legible: Clubes/Rusia/Akhmat Grozny/bfo-2022-datos.md.
```

### akhmatgrozny-ru-bfo-2023-datos

_note (data/):_

```text
Cargado por tools/bfo-rusia.mjs (2026-10-10) desde Clubes/Rusia/Akhmat Grozny/bfo-2023-datos.json: datos oficiales del Servicio Federal de Impuestos (GIR BO), formulario 2 en miles de rublos; la suma de los renglones da el 2300 impreso. Transcripción legible: Clubes/Rusia/Akhmat Grozny/bfo-2023-datos.md.
```

### akhmatgrozny-ru-bfo-2024-datos

_note (data/):_

```text
Cargado por tools/bfo-rusia.mjs (2026-10-10) desde Clubes/Rusia/Akhmat Grozny/bfo-2024-datos.json: datos oficiales del Servicio Federal de Impuestos (GIR BO), formulario 2 en miles de rublos; la suma de los renglones da el 2300 impreso. Transcripción legible: Clubes/Rusia/Akhmat Grozny/bfo-2024-datos.md.
```

### akhmatgrozny-ru-bfo-2025-datos

_note (data/):_

```text
Cargado por tools/bfo-rusia.mjs (2026-10-10) desde Clubes/Rusia/Akhmat Grozny/bfo-2025-datos.json: datos oficiales del Servicio Federal de Impuestos (GIR BO), formulario 2 en miles de rublos; la suma de los renglones da el 2300 impreso. Transcripción legible: Clubes/Rusia/Akhmat Grozny/bfo-2025-datos.md.
```
