# parinizhnynovgorod-ru — evidencia de carga

Lo que había como comentario en `data/ru/parinizhnynovgorod-ru-data.js`, movido tal cual por `tools/archivo/mover-comentarios-data.mjs` (la regla:
`Admin/CONVENCIONES-DATOS.md`, "data/<país>/<club>-data.js NO LLEVA COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y
meta. Las notas de cada fila van en una tabla con su número de fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
============================================================================
data/ru/parinizhnynovgorod-ru-data.js — ANO Football Club Pari Nizhny Novgorod (Rusia).
ALTA POR SCRIPT (tools/alta-club.mjs, 2026-10-10), SIN EJERCICIOS CARGADOS TODAVÍA:
las estructuras de abajo están vacías a propósito. Los rubros, los totales
oficiales y el resto del fiscalYearMeta los agrega la etapa de carga
(tools/proponer-carga.mjs / sesión de onboarding), que es también la que
reemplaza esta cabecera por la de siempre (fuente, perímetro, categorización).

Documento que originó el alta: Clubes/Rusia/Pari Nizhny Novgorod/bfo-2021-datos.md

De dónde salió cada campo (estado según alta-club.mjs: ok / pendiente):
  id                 ok        "parinizhnynovgorod-ru" — slug de "Pari Nizhny Novgorod" + '-ru' (convención de clubId, Admin/CONVENCIONES.md Versión 129)
  name               ok        "ANO Football Club Pari Nizhny Novgorod" — ajuste manual (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-09): Revisión del alta (Claude, 2026-10-09): razón social vigente (АНО «Футбольный клуб «Па
  displayName        ok        "Pari Nizhny Novgorod" — nombre de la carpeta del club en Clubes/
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
  sourceId           ok        "parinizhnynovgorod-ru-bfo-2021-datos" — clubId + nombre del archivo en slug
  liga               ok        "ru-premierliga" — roster cacheado de "2021–22 Russian Premier League" (tools/club-league-reference/ru.json), coincidencia única por palabras "Nizhny Novgorod" = "Pari N

FISCAL YEAR META PROPUESTO para 2021 (NO registrado: un ejercicio con meta y
sin rubros se vería en el sitio como un año en cero, y "sin dato no es cero"):
  2021: {"reportType":"official_balance_sheet","currency":"RUB","fxRef":"RUB@2021-12-31","sourceId":"parinizhnynovgorod-ru-bfo-2021-datos"}
============================================================================
```

_de data/clubs.js:_

```text
Pari Nizhny Novgorod: alta por tools/alta-club.mjs (2026-10-10) desde Clubes/Rusia/Pari Nizhny Novgorod/bfo-2021-datos.md. brandColor #5BB8F8
(procedencia en Admin/sourcing/Rusia/Pari Nizhny Novgorod.md; tools/bfo-rusia.mjs).
```

_de data/club-leagues/ru.js:_

```text
Pari Nizhny Novgorod (alta-club.mjs, 2026-10-10): verificado contra roster cacheado de "2021–22 Russian Premier League" (tools/club-league-reference/ru.json), coincidencia única por palabras "Nizhny Novgorod" = "Pari Nizhny Novgorod".
```

## 2025

### Ingresos

```text
2025: cargado por tools/bfo-rusia.mjs (2026-10-10) desde Clubes/Rusia/Pari Nizhny Novgorod/bfo-2025-datos.md. Filas y categorías: formulario 2 del GIR BO (código del fisco → categoría, mapa fijo de bfo-rusia.mjs; escalón 2 de notas y formulario 6 donde corresponde). Tie-out contra lo impreso: -; resultado "Чистая прибыль (убыток), código 2400 (suma verificada contra".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Выручка (2110) | pág. ?, ? |
| 2 | поступления по трансферам | pág. ?, ? |
| 3 | призовые от РФС | pág. ?, ? |
| 4 | прочие поступления (бартер, списание просроченной задолженности, услуги за сдачу в аренду и предоставление прочих услуг) | pág. ?, ? |
| 5 | Целевые взносы (6220, форма 6) | pág. ?, ? |
| 6 | Добровольные имущественные взносы и пожертвования (6230, форма 6) | pág. ?, ? |

### Gastos

```text
tools/cargar.mjs (2026-10-10)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Себестоимость продаж (2120) | pág. ?, ? |
| 2 | Коммерческие расходы (2210) | pág. ?, ? |
| 3 | Прочие расходы (2350) | pág. ?, ? |
| 4 | Расходы на целевые мероприятия (6310, форма 6) | pág. ?, ? |
| 5 | Расходы на содержание аппарата управления (6320, форма 6) | pág. ?, ? |
| 6 | Приобретение основных средств, инвентаря и иного имущества (6330, форма 6) | pág. ?, ? |
| 7 | Прочие расходы (6350, форма 6) | pág. ?, ? |

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
tools/caja-deuda.mjs (2026-10-17): grossDebt escalón R (compuerta: JSON del año anterior): Rusia, balance del fisco: código 1410 + 1510 = 0 miles de RUB (bfo-2025-datos.json); cash escalón R (compuerta: JSON del año anterior): Rusia, balance del fisco: código 1250 = 785 miles de RUB (bfo-2025-datos.json)
```

### Liga

```text
2025: tools/cargar.mjs 2026-10-10, verificado contra roster cacheado de "2025–26 Russian Premier League" (tools/club-league-reference/ru.json),
```

```text
2025: tools/cargar.mjs 2026-10-10, verificado contra data/club-leagues/ru.js ya tiene la fila
```

```text
2025: tools/cargar.mjs 2026-10-10, verificado contra data/club-leagues/ru.js ya tiene la fila
```

## 2024

### Ingresos

```text
2024: cargado por tools/bfo-rusia.mjs (2026-10-10) desde Clubes/Rusia/Pari Nizhny Novgorod/bfo-2024-datos.md. Filas y categorías: formulario 2 del GIR BO (código del fisco → categoría, mapa fijo de bfo-rusia.mjs; escalón 2 de notas y formulario 6 donde corresponde). Tie-out contra lo impreso: -; resultado "Чистая прибыль (убыток), código 2400 (suma verificada contra".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Выручка (2110) | pág. ?, ? |
| 2 | Прочие доходы (2340) | pág. ?, ? |
| 3 | Целевые взносы (6220, форма 6) | pág. ?, ? |
| 4 | Добровольные имущественные взносы и пожертвования (6230, форма 6) | pág. ?, ? |

### Gastos

```text
tools/cargar.mjs (2026-10-10)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Себестоимость продаж (2120) | pág. ?, ? |
| 2 | Коммерческие расходы (2210) | pág. ?, ? |
| 3 | Прочие расходы (2350) | pág. ?, ? |
| 4 | Расходы на целевые мероприятия (6310, форма 6) | pág. ?, ? |
| 5 | Расходы на содержание аппарата управления (6320, форма 6) | pág. ?, ? |
| 6 | Приобретение основных средств, инвентаря и иного имущества (6330, форма 6) | pág. ?, ? |
| 7 | Прочие расходы (6350, форма 6) | pág. ?, ? |

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
tools/caja-deuda.mjs (2026-10-17): grossDebt escalón R (compuerta: JSON del año siguiente): Rusia, balance del fisco: código 1410 + 1510 = 0 miles de RUB (bfo-2024-datos.json); cash escalón R (compuerta: JSON del año siguiente): Rusia, balance del fisco: código 1250 = 9938 miles de RUB (bfo-2024-datos.json)
```

### Liga

```text
2024: tools/cargar.mjs 2026-10-10, verificado contra roster cacheado de "2024–25 Russian Premier League" (tools/club-league-reference/ru.json),
```

```text
2024: tools/cargar.mjs 2026-10-10, verificado contra data/club-leagues/ru.js ya tiene la fila
```

```text
2024: tools/cargar.mjs 2026-10-10, verificado contra data/club-leagues/ru.js ya tiene la fila
```

## 2023

### Ingresos

```text
2023: cargado por tools/bfo-rusia.mjs (2026-10-10) desde Clubes/Rusia/Pari Nizhny Novgorod/bfo-2023-datos.md. Filas y categorías: formulario 2 del GIR BO (código del fisco → categoría, mapa fijo de bfo-rusia.mjs; escalón 2 de notas y formulario 6 donde corresponde). Tie-out contra lo impreso: -; resultado "Чистая прибыль (убыток), código 2400 (suma verificada contra".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Выручка (2110) | pág. ?, ? |
| 2 | Прочие доходы (2340) | pág. ?, ? |
| 3 | Целевые взносы (6220, форма 6) | pág. ?, ? |
| 4 | Добровольные имущественные взносы и пожертвования (6230, форма 6) | pág. ?, ? |

### Gastos

```text
tools/cargar.mjs (2026-10-10)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Себестоимость продаж (2120) | pág. ?, ? |
| 2 | Коммерческие расходы (2210) | pág. ?, ? |
| 3 | Прочие расходы (2350) | pág. ?, ? |
| 4 | Расходы на целевые мероприятия (6310, форма 6) | pág. ?, ? |
| 5 | Расходы на содержание аппарата управления (6320, форма 6) | pág. ?, ? |
| 6 | Приобретение основных средств, инвентаря и иного имущества (6330, форма 6) | pág. ?, ? |

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
tools/caja-deuda.mjs (2026-10-17): grossDebt escalón R (compuerta: JSON del año siguiente): Rusia, balance del fisco: código 1410 + 1510 = 0 miles de RUB (bfo-2023-datos.json); cash escalón R (compuerta: JSON del año siguiente): Rusia, balance del fisco: código 1250 = 58630 miles de RUB (bfo-2023-datos.json)
```

### Liga

```text
2023: tools/cargar.mjs 2026-10-10, verificado contra roster cacheado de "2023–24 Russian Premier League" (tools/club-league-reference/ru.json),
```

```text
2023: tools/cargar.mjs 2026-10-10, verificado contra data/club-leagues/ru.js ya tiene la fila
```

```text
2023: tools/cargar.mjs 2026-10-10, verificado contra data/club-leagues/ru.js ya tiene la fila
```

## 2022

### Ingresos

```text
2022: cargado por tools/bfo-rusia.mjs (2026-10-10) desde Clubes/Rusia/Pari Nizhny Novgorod/bfo-2022-datos.md. Filas y categorías: formulario 2 del GIR BO (código del fisco → categoría, mapa fijo de bfo-rusia.mjs; escalón 2 de notas y formulario 6 donde corresponde). Tie-out contra lo impreso: -; resultado "Чистая прибыль (убыток), código 2400 (suma verificada contra".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Выручка (2110) | pág. ?, ? |
| 2 | Прочие доходы (2340) | pág. ?, ? |
| 3 | Целевые взносы (6220, форма 6) | pág. ?, ? |
| 4 | Добровольные имущественные взносы и пожертвования (6230, форма 6) | pág. ?, ? |

### Gastos

```text
tools/cargar.mjs (2026-10-10)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Себестоимость продаж (2120) | pág. ?, ? |
| 2 | Коммерческие расходы (2210) | pág. ?, ? |
| 3 | Прочие расходы (2350) | pág. ?, ? |
| 4 | Расходы на целевые мероприятия (6310, форма 6) | pág. ?, ? |
| 5 | Расходы на содержание аппарата управления (6320, форма 6) | pág. ?, ? |
| 6 | Приобретение основных средств, инвентаря и иного имущества (6330, форма 6) | pág. ?, ? |

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
tools/caja-deuda.mjs (2026-10-17): grossDebt escalón R (compuerta: JSON del año siguiente): Rusia, balance del fisco: código 1410 + 1510 = 0 miles de RUB (bfo-2022-datos.json); cash escalón R (compuerta: JSON del año siguiente): Rusia, balance del fisco: código 1250 = 269568 miles de RUB (bfo-2022-datos.json)
```

### Liga

```text
2022: tools/cargar.mjs 2026-10-10, verificado contra roster cacheado de "2022–23 Russian Premier League" (tools/club-league-reference/ru.json),
```

```text
2022: tools/cargar.mjs 2026-10-10, verificado contra data/club-leagues/ru.js ya tiene la fila
```

```text
2022: tools/cargar.mjs 2026-10-10, verificado contra data/club-leagues/ru.js ya tiene la fila
```

## 2021

### Ingresos

```text
2021: cargado por tools/bfo-rusia.mjs (2026-10-10) desde Clubes/Rusia/Pari Nizhny Novgorod/bfo-2021-datos.md. Filas y categorías: formulario 2 del GIR BO (código del fisco → categoría, mapa fijo de bfo-rusia.mjs; escalón 2 de notas y formulario 6 donde corresponde). Tie-out contra lo impreso: -; resultado "Чистая прибыль (убыток), código 2400 (suma verificada contra".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Выручка (2110) | pág. ?, ? |
| 2 | Прочие доходы (2340) | pág. ?, ? |
| 3 | Целевые взносы (6220, форма 6) | pág. ?, ? |
| 4 | Добровольные имущественные взносы и пожертвования (6230, форма 6) | pág. ?, ? |

### Gastos

```text
tools/cargar.mjs (2026-10-10)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Себестоимость продаж (2120) | pág. ?, ? |
| 2 | Коммерческие расходы (2210) | pág. ?, ? |
| 3 | Прочие расходы (2350) | pág. ?, ? |
| 4 | Расходы на целевые мероприятия (6310, форма 6) | pág. ?, ? |
| 5 | Расходы на содержание аппарата управления (6320, форма 6) | pág. ?, ? |
| 6 | Приобретение основных средств, инвентаря и иного имущества (6330, форма 6) | pág. ?, ? |
| 7 | Прочие расходы (6350, форма 6) | pág. ?, ? |

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
tools/caja-deuda.mjs (2026-10-17): grossDebt escalón R (compuerta: JSON del año siguiente): Rusia, balance del fisco: código 1410 + 1510 = 0 miles de RUB (bfo-2021-datos.json); cash escalón R (compuerta: JSON del año siguiente): Rusia, balance del fisco: código 1250 = 146508 miles de RUB (bfo-2021-datos.json)
```

### Liga

```text
2021: tools/cargar.mjs 2026-10-10, verificado contra data/club-leagues/ru.js ya tiene la fila
```

```text
2021: tools/cargar.mjs 2026-10-10, verificado contra data/club-leagues/ru.js ya tiene la fila
```

```text
2021: tools/cargar.mjs 2026-10-10, verificado contra data/club-leagues/ru.js ya tiene la fila
```

## Gestiones

_investigado por un subagente (Sonnet) con fuente por gestión, 2026-10-13; to-do 195:_

```text
David Melik-Guseinov (2023-07-21 a 2025-09-13): Anunciado por el gobernador Nikitin el 21/07/2023 (pravda-nn.ru, Championat); venía de vicegobernador y ministro de Salud. La fuente no da el día de entrada efectiva: se usa el del anuncio. Salida: avisó que se iba en su Telegram el 13/09/2025 (pravda-nn.ru; nn.ru).
Vitaly Karasev (2025-09-19 a hoy): RBC Nizhni Nóvgorod 19/09/2025: nombrado director general en reemplazo de Melik-Guseinov (que había anunciado la salida unos días antes). Sigue en 2026; el 11/07/2026 el club recuperó el nombre 'Nizhny Novgorod' y cambió de accionista (Andrey Artyomov), sin cambio de director general encontrado.
SIN CONFIRMAR, no cargada: Ravil Izmailov (2021-01-19 a 2023-07-21), https://news.sportbox.ru/Vidy_sporta/Futbol/Russia/1st_division/spbnews_NI1300857_Izmajlov_stanet_generalnym_direktorom_Nizhnego_Novgoroda: Sportbox 19/01/2021: 'en los próximos días' asumirá como director general (sucede a Maxim Metlin). Se usa el día de la noticia; la fecha real de entrada no está dada: confirmada=false solo por esa razón. Otras fuentes dicen 'desde 2020' o 'desde 2021'; en mayo 2021 ya firmaba como director general. Salida: pravda-nn.ru 21/07/2023 anuncia que deja el cargo.
Duda: Cierre 2025-12-31: Karasev asumió ~3 meses antes, casi todo el ejercicio fue de Melik-Guseinov; firmo a evaluar. Lo mismo para 2023 (Izmailov hasta julio).
Duda: No encontré el día exacto de entrada en funciones de Izmailov (enero 2021) ni de Melik-Guseinov.
```

_investigado por un subagente con fuente por gestión (Admin/gestiones-por-pais/tanda-2026-10-18/resultado-7.json, tools/gestiones-tanda.mjs, 2026-10-18):_

```text
Ravil Izmailov (2021-01-25 a 2023-07-21): Sportbox (19/01/2021, citando a Match TV): 'en los próximos días' asumirá como director general en lugar de Maxim Metlin; ya dirigía el club como director ejecutivo desde marzo 2020 (vz-nn.ru, 25/01/2021, anuncio del club). Una búsqueda atribuye a vz-nn la fórmula 'desde el 19 de enero', pero al abrir la página no pude ver esa frase, por eso el día 19 no está confirmado (confirmada=false solo por eso). Cualquier día de enero 2021 cubre ambos cierres. Ojo: fc-baltika.ru y footballfakts.ru dicen 2020, contradicho por las notas fechadas en enero 2021 (Metlin seguía de DG hasta entonces). Hasta 2023-07-21: iz.ru y pravda-nn.ru, el gobernador Nikitin anuncia que dejó el cargo (la gestión siguiente, Melik-Guseinov, ya está cargada con desde 2023-07-21). Corrobora el balance: 2022-poyasneniya.md:34 ('Единоличным исполнительным органом Клуба на 31.12.2022г. является генеральный директор Измайлов Равиль Камильевич') y :69 (cargo hasta 05.04.2024 según el documento, que difiere de la prensa; se usa la prensa) y firma en :577; 2022-auditorskoe-zaklyuchenie.md:73 lo nombra como directivo del club. | Claude 2026-10-18: desde = fecha en que vz-nn.ru informa el nombramiento por anuncio del club (Sportbox, 19/01/2021, lo anticipaba "en los próximos días"); los cierres 2021 y 2022 caen dentro con cualquier día de enero de 2021, y 2022-poyasneniya.md:34 lo da como director general al 31.12.2022.
Duda: Día exacto en que Izmailov asumió como director general en enero 2021 (el club lo anunció entre el 19 y el 25/01/2021). Pregunta al club: ¿desde qué fecha rige su nombramiento como director general?
Duda: El balance 2022 (2022-poyasneniya.md:69 y :622) dice que Izmailov fue director general 'hasta 05.04.2024', mientras que la prensa lo da fuera del cargo el 21/07/2023 (cuando asumió Melik-Guseinov). Puede ser que siguiera en el consejo/otro cargo hasta 2024; no afecta a los cierres 2021 y 2022.
```

## Fuentes

### (general)

```text
Fuentes de cada ejercicio: las agrega tools/cargar.mjs adentro de este bloque (Versión 379: hasta la 378 el esqueleto no lo traía y la
primera carga de un club dado de alta por script se revertía, "no encontré Object.assign(sources, {"; caso: Fortaleza CEIF).
```

### parinizhnynovgorod-ru-bfo-2021-datos

_note (data/):_

```text
Cargado por tools/bfo-rusia.mjs (2026-10-10) desde Clubes/Rusia/Pari Nizhny Novgorod/bfo-2021-datos.json: datos oficiales del Servicio Federal de Impuestos (GIR BO), formulario 2 en miles de rublos; la suma de los renglones da el 2300 impreso. Transcripción legible: Clubes/Rusia/Pari Nizhny Novgorod/bfo-2021-datos.md.
```

### parinizhnynovgorod-ru-bfo-2022-datos

_note (data/):_

```text
Cargado por tools/bfo-rusia.mjs (2026-10-10) desde Clubes/Rusia/Pari Nizhny Novgorod/bfo-2022-datos.json: datos oficiales del Servicio Federal de Impuestos (GIR BO), formulario 2 en miles de rublos; la suma de los renglones da el 2300 impreso. Transcripción legible: Clubes/Rusia/Pari Nizhny Novgorod/bfo-2022-datos.md.
```

### parinizhnynovgorod-ru-bfo-2023-datos

_note (data/):_

```text
Cargado por tools/bfo-rusia.mjs (2026-10-10) desde Clubes/Rusia/Pari Nizhny Novgorod/bfo-2023-datos.json: datos oficiales del Servicio Federal de Impuestos (GIR BO), formulario 2 en miles de rublos; la suma de los renglones da el 2300 impreso. Transcripción legible: Clubes/Rusia/Pari Nizhny Novgorod/bfo-2023-datos.md.
```

### parinizhnynovgorod-ru-bfo-2024-datos

_note (data/):_

```text
Cargado por tools/bfo-rusia.mjs (2026-10-10) desde Clubes/Rusia/Pari Nizhny Novgorod/bfo-2024-datos.json: datos oficiales del Servicio Federal de Impuestos (GIR BO), formulario 2 en miles de rublos; la suma de los renglones da el 2300 impreso. Transcripción legible: Clubes/Rusia/Pari Nizhny Novgorod/bfo-2024-datos.md.
```

### parinizhnynovgorod-ru-bfo-2025-datos

_note (data/):_

```text
Cargado por tools/bfo-rusia.mjs (2026-10-10) desde Clubes/Rusia/Pari Nizhny Novgorod/bfo-2025-datos.json: datos oficiales del Servicio Federal de Impuestos (GIR BO), formulario 2 en miles de rublos; la suma de los renglones da el 2300 impreso. Transcripción legible: Clubes/Rusia/Pari Nizhny Novgorod/bfo-2025-datos.md.
```
