# tallinnakalev-ee — evidencia de carga

Lo que antes iba como comentario en el data file del club, `data/<país>/tallinnakalev-ee-data.js` (la regla: `Admin/CONVENCIONES-DATOS.md`, "data/<país>/<club>-data.js NO LLEVA
COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y meta. Las notas de cada fila van en una tabla con su número de
fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
Tallinna Kalev: alta por tools/alta-club.mjs (2026-10-18) desde Clubes/Estonia/Tallinna Kalev/aruanne-2025.pdf. brandColor #000000
(procedencia en Admin/sourcing/Estonia/Tallinna Kalev.md; tools/cargar-lote.mjs).
```

```text
data/ee/tallinnakalev-ee-data.js — Jalgpalliklubi Tallinna Kalev (Estonia).
ALTA POR SCRIPT (tools/alta-club.mjs, 2026-10-18), SIN EJERCICIOS CARGADOS TODAVÍA: las estructuras del data file
nacen vacías a propósito. Los rubros, los totales oficiales y el resto del fiscalYearMeta los agrega la etapa de carga.

Documento que originó el alta: Clubes/Estonia/Tallinna Kalev/aruanne-2025.pdf

De dónde salió cada campo (estado según alta-club.mjs: ok / pendiente):
  id                 ok        "tallinnakalev-ee" — slug de "Tallinna Kalev" + '-ee' (convención de clubId, Admin/CONVENCIONES.md Versión 129)
  name               ok        "Jalgpalliklubi Tallinna Kalev" — ajuste manual (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-18): portada del aruanne-2025 (revisión del alta, subagente Sonnet, revisado por
  displayName        ok        "Tallinna Kalev" — nombre de la carpeta del club en Clubes/
  country            ok        "EE" — carpeta de país "Estonia" (tabla PAISES)
  reportingCurrency  ok        "EUR" — moneda de curso legal de Estonia
  fiscalYearStart    ok        "01-01" — cierre del ejercicio: contenido del .md (49 de 51 fechas de fin de mes caen en el mes 12)
  sport              ok        "futbol" — el .md nombra el fútbol 0 veces y ningún otro deporte más que eso
  brandColor         pendiente (ausente) — la liga del club no está en tools/brand-color-reference/ (o el club no está en footylogos)
  anio               ok        2025 — nombre del archivo (misma regla que onboard.mjs --quien), confirmado por las fechas de cierre del .md
  cierre             ok        "2025-12-31" — año del ejercicio + mes de cierre (contenido del .md (49 de 51 fechas de fin de mes caen en el mes 12))
  reportType         ok        "official_balance_sheet" — ajuste manual (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-18): majandusaasta aruanne 01.01-31.12.2025 con tulemiaruanne (L135) (revisión d
  perimetro          ok        "consolidado" — ajuste manual (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-18): 2025 trae los dos (pág. 5 consolidado y la entidad sola L653-711); la contr
  currency           ok        "EUR" — moneda de curso legal de Estonia (tabla PAISES de alta-club.mjs)
  fxRef              ok        "EUR@2025-12-31" — el documento no declara tipo de cambio; FX_CLOSE ya tiene EUR@2025-12-31 = 0.8511 (Cierre BCE al 31/12/2025 (1 EUR = 1,1750 USD))
  sourceId           ok        "tallinnakalev-ee-aruanne-2025" — clubId + nombre del archivo en slug
  liga               pendiente null — sin caché de rosters para ee (tools/club-league-reference/ee.json)

FISCAL YEAR META PROPUESTO para 2025 (NO registrado: un ejercicio con meta y
sin rubros se vería en el sitio como un año en cero, y "sin dato no es cero"):
  2025: {"reportType":"official_balance_sheet","currency":"EUR","fxRef":"EUR@2025-12-31","sourceId":"tallinnakalev-ee-aruanne-2025"}
```

## 2025

### Ingresos

```text
2025: cargado por tools/cargar.mjs (2026-10-18) desde Clubes/Estonia/Tallinna Kalev/aruanne-2025.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Estonia/Tallinna Kalev/aruanne-2025.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Liikmetelt saadud tasud | pág. 5, Jev 1 |
| 2 | Sihtfinantseerimine tegevuskuludeks | pág. 14, Jev 0.94 |
| 3 | Mittesihtotsatarbelised annetused ja toetused | pág. 14, Jev 1 |
| 4 | Renditulu staadioni või selle rajatiste väljarentimisest | pág. 15, Jev 0.96 |
| 5 | Piletitulu | pág. 15, Jev 0.99 |
| 6 | Tulu turniiride korraldamisest | pág. 15, Jev 0.98 |
| 7 | Tulu mängijaõiguste müügist | pág. 15, Jev 1 |
| 8 | Klubi peasponsorilt saadud tulu | pág. 15, Jev 0.97 |
| 9 | Tulu teistelt sponsoritelt | pág. 15, Claude 0.93 |
| 10 | Muud klassifitseerimata äritulud | pág. 15, Jev 0.99 |
| 11 | Muud tulud | pág. 5, Jev 0.98 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Sportlasetoetus | pág. 15, precedente |
| 2 | Sportlase stipendium | pág. 15, precedente |
| 3 | Elektrienergia | pág. 16, Jev 1 |
| 4 | Soojusenergia | pág. 16, Jev 0.99 |
| 5 | Veevarustusteenused | pág. 16, Jev 0.98 |
| 6 | Mitmesugused bürookulud | pág. 16, Jev 0.92 |
| 7 | Lähetuskulud | pág. 16, Jev 1 |
| 8 | Koolituskulud | pág. 16, precedente |
| 9 | Reklaam | pág. 16, Jev 1 |
| 10 | Liiga liikmemaksud | pág. 16, Jev 0.9 |
| 11 | Proportsiooniga tagastamatu käibemaks | pág. 16, Jev 0.95 |
| 12 | Staadioni ja saali rent | pág. 16, Jev 0.92 |
| 13 | Transport | pág. 16, precedente |
| 14 | Meditsiinitarvikud- ja teenused | pág. 16, precedente |
| 15 | Spordivarustus | pág. 16, Jev 1 |
| 16 | Mängijaõiguste ülemineku kulud | pág. 16, precedente |
| 17 | Laagrite-ja turniiride korralduskulud | pág. 16, Jev 1 |
| 18 | Ruumide rent | pág. 16, precedente |
| 19 | Autodega seotud kulud | pág. 16, Jev 0.97 |
| 20 | Turvateenused | pág. 16, Jev 0.99 |
| 21 | Muud | pág. 16, Jev 0.99 |
| 22 | Mängijate palgakulu | pág. 16, Jev 1 |
| 23 | Sotsiaalmaksud mängijate töötasudelt | pág. 16, Jev 0.99 |
| 24 | Muu personali palgakulu | pág. 16, Jev 0.96 |
| 25 | Sotsiaalmaksukulu muu personali töötasudelt | pág. 16, Claude 0.85 |
| 26 | Puhkusekohustuse reserv | pág. 16, precedente |
| 27 | Põhivarade kulum ja väärtuse langus | pág. 5, Jev 1 |
| 28 | Muud kulud | pág. 5, Jev 1 |

### Meta

```text
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-18): reportType = official_balance_sheet. majandusaasta aruanne 01.01-31.12.2025 con tulemiaruanne (L135) (revisión del alta, subagente Sonnet, revisado por Claude 2026-10-18)
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-18): cero-real = Televisión. Lisa 11 L507-516 sin fila de TV (subagente Sonnet, revisado por Claude 2026-10-18)
tools/cargar.mjs (2026-10-18). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

```text
tools/caja-deuda.mjs (2026-10-18): cash escalón 1 (compuerta: documento anterior): "Raha" pág. 19
```

### Liga

```text
alta-club.mjs (2026-10-18): null, SIN VERIFICAR (sin caché de rosters para ee (tools/club-league-reference/ee.json)).
```

## 2024

### Ingresos

```text
2024: cargado por tools/cargar.mjs (2026-10-18) desde Clubes/Estonia/Tallinna Kalev/aruanne-2024.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Estonia/Tallinna Kalev/aruanne-2024.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Liikmetelt saadud tasud | pág. 5, precedente |
| 2 | Sihtfinantseerimine tegevuskuludeks | pág. 14, precedente |
| 3 | Mittesihtotsatarbelised annetused ja toetused | pág. 14, precedente |
| 4 | Renditulu staadioni või selle rajatiste väljarentimisest | pág. 15, precedente |
| 5 | Piletitulu | pág. 15, precedente |
| 6 | Tulu turniiride korraldamisest | pág. 15, precedente |
| 7 | Tulu mängijaõiguste müügist | pág. 15, precedente |
| 8 | Klubi peasponsorilt saadud tulu | pág. 15, precedente |
| 9 | Tulu teistelt sponsoritelt | pág. 15, precedente |
| 10 | Muud klassifitseerimata äritulud | pág. 15, precedente |
| 11 | Muud tulud | pág. 5, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Sportlasetoetus | pág. 15, precedente |
| 2 | Sportlase stipendium | pág. 15, precedente |
| 3 | Elektrienergia | pág. 16, precedente |
| 4 | Soojusenergia | pág. 16, precedente |
| 5 | Veevarustusteenused | pág. 16, precedente |
| 6 | Mitmesugused bürookulud | pág. 16, precedente |
| 7 | Lähetuskulud | pág. 16, precedente |
| 8 | Koolituskulud | pág. 16, precedente |
| 9 | Reklaam | pág. 16, precedente |
| 10 | Liiga liikmemaksud | pág. 16, precedente |
| 11 | Proportsiooniga tagastamatu käibemaks | pág. 16, precedente |
| 12 | Staadioni ja saali rent | pág. 16, precedente |
| 13 | Transport | pág. 16, precedente |
| 14 | Meditsiinitarvikud- ja teenused | pág. 16, precedente |
| 15 | Spordivarustus | pág. 16, precedente |
| 16 | Mängijaõiguste ülemineku kulud | pág. 16, precedente |
| 17 | Laagrite-ja turniiride korralduskulud | pág. 16, precedente |
| 18 | Ruumide rent | pág. 16, precedente |
| 19 | Autodega seotud kulud | pág. 16, precedente |
| 20 | Turvateenused | pág. 16, precedente |
| 21 | Muud | pág. 16, precedente |
| 22 | Mängijate palgakulu | pág. 16, precedente |
| 23 | Sotsiaalmaksud mängijate töötasudelt | pág. 16, precedente |
| 24 | Muu personali palgakulu | pág. 16, precedente |
| 25 | Sotsiaalmaksukulu muu personali töötasudelt | pág. 16, precedente |
| 26 | Puhkusekohustuse reserv | pág. 16, precedente |
| 27 | Põhivarade kulum ja väärtuse langus | pág. 5, precedente |
| 28 | Muud kulud | pág. 5, precedente |

### Meta

```text
2024: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-18): reportType = official_balance_sheet. majandusaasta aruanne anual con estado de resultados ("## Tulemiaruanne", .md L139) (Claude 2026-10-18)
2024: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-18): cero-real = Televisión. sin ninguna fila de ese rubro en el estado ni en las notas; mismo caso que el 2025 del club (Claude 2026-10-18)
tools/cargar.mjs (2026-10-18). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

```text
tools/caja-deuda.mjs (2026-10-18): cash escalón 1b (compuerta: documento anterior): "Raha" pág. 4
```

```text
tools/caja-deuda.mjs (2026-10-18): cash escalón 1 (compuerta: documento siguiente): "Raha" pág. 19
```

## 2023

### Ingresos

```text
2023: cargado por tools/cargar.mjs (2026-10-18) desde Clubes/Estonia/Tallinna Kalev/aruanne-2023.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Estonia/Tallinna Kalev/aruanne-2023.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Liikmetelt saadud tasud | pág. 6, precedente |
| 2 | Sihtfinantseerimine tegevuskuludeks | pág. 17, precedente |
| 3 | Mittesihtotsatarbelised annetused ja toetused | pág. 17, precedente |
| 4 | Renditulu staadioni või selle rajatiste väljarentimisest | pág. 18, precedente |
| 5 | Piletitulu | pág. 18, precedente |
| 6 | Tulu turniiride korraldamisest | pág. 18, precedente |
| 7 | Tulu mängijaõiguste müügist | pág. 18, precedente |
| 8 | Klubi peasponsorilt saadud tulu | pág. 18, precedente |
| 9 | Tulu teistelt sponsoritelt | pág. 18, precedente |
| 10 | Muud klassifitseerimata äritulud | pág. 18, precedente |
| 11 | Muud tulud | pág. 6, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Sportlasetoetus | pág. 18, precedente |
| 2 | Sportlase stipendium | pág. 18, precedente |
| 3 | Elektrienergia | pág. 19, precedente |
| 4 | Soojusenergia | pág. 19, precedente |
| 5 | Veevarustusteenused | pág. 19, precedente |
| 6 | Mitmesugused bürookulud | pág. 19, precedente |
| 7 | Lähetuskulud | pág. 19, precedente |
| 8 | Koolituskulud | pág. 19, precedente |
| 9 | Kulu ebatõenäoliselt laekuvatest nõuetest | pág. 19, Jev 0.99 |
| 10 | Reklaam | pág. 19, precedente |
| 11 | Liiga liikmemaksud | pág. 19, precedente |
| 12 | Proportsiooniga tagastamatu käibemaks | pág. 19, precedente |
| 13 | Staadioni ja saali rent | pág. 19, precedente |
| 14 | Transport | pág. 19, precedente |
| 15 | Meditsiinitarvikud- ja teenused | pág. 19, precedente |
| 16 | Spordivarustus | pág. 19, precedente |
| 17 | Mängijaõiguste ülemineku kulud | pág. 19, precedente |
| 18 | Laagrite-ja turniiride korralduskulud | pág. 19, precedente |
| 19 | Ruumide rent | pág. 19, precedente |
| 20 | Autodega seotud kulud | pág. 19, precedente |
| 21 | Turvateenused | pág. 19, precedente |
| 22 | Muud | pág. 19, precedente |
| 23 | Mängijate palgakulu | pág. 19, precedente |
| 24 | Sotsiaalmaksud mängijate töötasudelt | pág. 19, precedente |
| 25 | Muu personali palgakulu | pág. 19, precedente |
| 26 | Sotsiaalmaksukulu muu personali töötasudelt | pág. 19, precedente |
| 27 | Puhkusekohustuse reserv | pág. 19, precedente |
| 28 | Põhivarade kulum ja väärtuse langus | pág. 6, precedente |
| 29 | Muud kulud | pág. 6, precedente |

### Meta

```text
2023: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-18): reportType = official_balance_sheet. majandusaasta aruanne anual con estado de resultados ("## Tulemiaruanne", .md L146) (Claude 2026-10-18)
2023: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-18): cero-real = Televisión. sin ninguna fila de ese rubro en el estado ni en las notas; mismo caso que el 2025 del club (Claude 2026-10-18)
tools/cargar.mjs (2026-10-18). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

```text
tools/caja-deuda.mjs (2026-10-18): cash escalón 1b (compuerta: documento siguiente): "Raha" pág. 5
```

```text
tools/caja-deuda.mjs (2026-10-18): cash escalón 1 (compuerta: documento siguiente): "Raha" pág. 22
```

## 2022

### Ingresos

```text
2022: cargado por tools/cargar.mjs (2026-10-18) desde Clubes/Estonia/Tallinna Kalev/aruanne-2022.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Estonia/Tallinna Kalev/aruanne-2022.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Sihtfinantseerimine tegevuskuludeks | pág. 14, precedente |
| 2 | Mittesihtotsatarbelised annetused ja toetused | pág. 14, precedente |
| 3 | Renditulud staadionite või selle rajatiste väljarentimisest | pág. 15, Jev 1 |
| 4 | Piletitulu | pág. 15, precedente |
| 5 | Tulu turniiride korraldamisest | pág. 15, precedente |
| 6 | Tulu mängijaõiguste müügist | pág. 15, precedente |
| 7 | Klubi peasponsorilt saadud tulu | pág. 15, precedente |
| 8 | Tulu teistelt sponsoritelt | pág. 15, precedente |
| 9 | Muud tulud | pág. 15, Jev 1 |
| 10 | Muud tulud | pág. 5, Jev 1 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Sihtotstarbeliselt finantseeritud projektide otsesed kulud | pág. 5, Jev 1 |
| 2 | Sportlasetoetus | pág. 15, precedente |
| 3 | Sportlase stipendium | pág. 15, precedente |
| 4 | Üür ja rent | pág. 16, Jev 0.98 |
| 5 | Tööjõurent | pág. 16, precedente |
| 6 | Elektrienergia | pág. 16, precedente |
| 7 | Soojusenergia | pág. 16, precedente |
| 8 | Kütus | pág. 16, Jev 0.99 |
| 9 | Veevarustusteenused | pág. 16, precedente |
| 10 | Mitmesugused bürookulud | pág. 16, precedente |
| 11 | Lähetuskulud | pág. 16, precedente |
| 12 | Koolituskulud | pág. 16, precedente |
| 13 | Kulu ebatõenäoliselt laekuvatest nõuetest | pág. 16, Jev 0.99 |
| 14 | Reklaam | pág. 16, precedente |
| 15 | Liikmemaksud | pág. 16, precedente |
| 16 | Proportsiooniga tagastamatu käibemaks | pág. 16, precedente |
| 17 | Staadioni ja saali rent | pág. 16, precedente |
| 18 | Transport | pág. 16, precedente |
| 19 | Meditsiinitarvikud- ja teenused | pág. 16, precedente |
| 20 | Spordivarustus | pág. 16, precedente |
| 21 | Isikliku sõiduauto kasutus | pág. 16, precedente |
| 22 | Mängijate soetuskulud | pág. 16, Claude 0.85 |
| 23 | Laagrite-ja turniiride korralduskulud | pág. 16, precedente |
| 24 | Muud | pág. 16, precedente |
| 25 | Tööjõukulud | pág. 5, precedente |
| 26 | Põhivarade kulum ja väärtuse langus | pág. 5, precedente |
| 27 | Muud kulud | pág. 5, precedente |

### Meta

```text
2022: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-18): reportType = official_balance_sheet. majandusaasta aruanne anual con estado de resultados ("## Tulemiaruanne", .md L114) (Claude 2026-10-18)
2022: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-18): cero-real = Televisión. sin ninguna fila de ese rubro en el estado ni en las notas; mismo caso que el 2025 del club (Claude 2026-10-18)
tools/cargar.mjs (2026-10-18). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

```text
tools/caja-deuda.mjs (2026-10-18): cash escalón 1 (compuerta: documento siguiente): "Raha" pág. 4
```

## 2021

### Ingresos

```text
2021: cargado por tools/cargar.mjs (2026-10-18) desde Clubes/Estonia/Tallinna Kalev/aruanne-2021.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Estonia/Tallinna Kalev/aruanne-2021.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Sihtfinantseerimine tegevuskuludeks | pág. 13, precedente |
| 2 | Mittesihtotsatarbelised annetused ja toetused | pág. 13, precedente |
| 3 | Renditulud staadionite või selle rajatiste väljarentimisest | pág. 14, Jev 1 |
| 4 | Piletitulu | pág. 14, precedente |
| 5 | Tulu turniiride korraldamisest | pág. 14, precedente |
| 6 | Tulu mängijaõiguste müügist | pág. 14, precedente |
| 7 | Klubi peasponsorilt saadud tulu | pág. 14, precedente |
| 8 | Tulu teistelt sponsoritelt | pág. 14, precedente |
| 9 | Muud tulud | pág. 14, Jev 1 |
| 10 | Muud tulud | pág. 5, Jev 1 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Sihtotstarbeliselt finantseeritud projektide otsesed kulud | pág. 5, Jev 1 |
| 2 | Sportlasetoetus | pág. 14, precedente |
| 3 | Sportlase stipendium | pág. 14, precedente |
| 4 | SOS Lasteküla | pág. 14, precedente |
| 5 | Üür ja rent | pág. 15, Jev 0.98 |
| 6 | Elektrienergia | pág. 15, precedente |
| 7 | Kütus | pág. 15, Jev 0.99 |
| 8 | Veevarustusteenused | pág. 15, precedente |
| 9 | Mitmesugused bürookulud | pág. 15, precedente |
| 10 | Lähetuskulud | pág. 15, precedente |
| 11 | Koolituskulud | pág. 15, precedente |
| 12 | Reklaam | pág. 15, precedente |
| 13 | Liikmemaksud | pág. 15, precedente |
| 14 | Proportsiooniga tagastamatu käibemaks | pág. 15, precedente |
| 15 | Staadioni ja saali rent | pág. 15, precedente |
| 16 | Transport | pág. 15, precedente |
| 17 | Meditsiinitarvikud- ja teenused | pág. 15, precedente |
| 18 | Spordivarustus | pág. 15, precedente |
| 19 | Isikliku sõiduauto kasutus | pág. 15, precedente |
| 20 | Mängijate soetuskulud | pág. 15, Claude 0.85 |
| 21 | Laagrite-ja turniiride korralduskulud | pág. 15, precedente |
| 22 | Muud | pág. 15, precedente |
| 23 | Tööjõukulud | pág. 5, precedente |
| 24 | Põhivarade kulum ja väärtuse langus | pág. 5, precedente |
| 25 | Muud kulud | pág. 5, precedente |

### Meta

```text
2021: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-18): reportType = official_balance_sheet. majandusaasta aruanne anual con estado de resultados ("## Tulemiaruanne", .md L115) (Claude 2026-10-18)
2021: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-18): cero-real = Televisión. sin ninguna fila de ese rubro en el estado ni en las notas; mismo caso que el 2025 del club (Claude 2026-10-18)
tools/cargar.mjs (2026-10-18). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

## 2020

### Ingresos

```text
2020: cargado por tools/cargar.mjs (2026-10-18) desde Clubes/Estonia/Tallinna Kalev/aruanne-2020.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Estonia/Tallinna Kalev/aruanne-2020.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Sihtfinantseerimine tegevuskuludeks | pág. 13, precedente |
| 2 | Mittesihtotsatarbelised annetused ja toetused | pág. 13, precedente |
| 3 | Renditulud staadionite või selle rajatiste väljarentimisest | pág. 14, Jev 1 |
| 4 | Piletitulu | pág. 14, precedente |
| 5 | Tulu turniiride korraldamisest | pág. 14, precedente |
| 6 | Tulu mängijaõiguste müügist | pág. 14, precedente |
| 7 | Klubi peasponsorilt saadud tulu | pág. 14, precedente |
| 8 | Tulu teistelt sponsoritelt | pág. 14, precedente |
| 9 | Muud tulud | pág. 14, Jev 1 |
| 10 | Muud tulud | pág. 5, Jev 1 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Sihtotstarbeliselt finantseeritud projektide otsesed kulud | pág. 5, Jev 1 |
| 2 | Sportlasetoetus | pág. 14, precedente |
| 3 | Sportlase stipendium | pág. 14, precedente |
| 4 | Üür ja rent | pág. 15, Jev 0.98 |
| 5 | Elektrienergia | pág. 15, precedente |
| 6 | Kütus | pág. 15, Jev 0.99 |
| 7 | Veevarustusteenused | pág. 15, precedente |
| 8 | Mitmesugused bürookulud | pág. 15, precedente |
| 9 | Lähetuskulud | pág. 15, precedente |
| 10 | Koolituskulud | pág. 15, precedente |
| 11 | Reklaam | pág. 15, precedente |
| 12 | Liikmemaksud | pág. 15, precedente |
| 13 | Proportsiooniga tagastamatu käibemaks | pág. 15, precedente |
| 14 | Staadioni ja saali rent | pág. 15, precedente |
| 15 | Transport | pág. 15, precedente |
| 16 | Meditsiinitarvikud- ja teenused | pág. 15, precedente |
| 17 | Spordivarustus | pág. 15, precedente |
| 18 | Isikliku sõiduauto kasutus | pág. 15, precedente |
| 19 | Mängijate soetuskulud | pág. 15, Claude 0.85 |
| 20 | Laagrite-ja turniiride korralduskulud | pág. 15, precedente |
| 21 | Muud | pág. 15, precedente |
| 22 | Tööjõukulud | pág. 5, precedente |
| 23 | Põhivarade kulum ja väärtuse langus | pág. 5, precedente |
| 24 | Muud kulud | pág. 5, precedente |

### Meta

```text
2020: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-18): reportType = official_balance_sheet. majandusaasta aruanne anual con estado de resultados ("## Tulemiaruanne", .md L116) (Claude 2026-10-18)
2020: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-18): cero-real = Televisión. sin ninguna fila de ese rubro en el estado ni en las notas; mismo caso que el 2025 del club (Claude 2026-10-18)
tools/cargar.mjs (2026-10-18). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

## 2019

### Ingresos

```text
2019: cargado por tools/cargar.mjs (2026-10-18) desde Clubes/Estonia/Tallinna Kalev/aruanne-2019.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Estonia/Tallinna Kalev/aruanne-2019.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Sihtfinantseerimine tegevuskuludeks | pág. 13, precedente |
| 2 | Mittesihtotstarbelised annetused ja toetused | pág. 13, precedente |
| 3 | Renditulud | pág. 13, precedente |
| 4 | Reklaami müük | pág. 13, Jev 1 |
| 5 | Muud tulud | pág. 13, Jev 1 |
| 6 | Muud tulud | pág. 5, Jev 1 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Üür ja rent | pág. 14, Jev 0.98 |
| 2 | Elektrienergia | pág. 14, precedente |
| 3 | Kütus | pág. 14, Jev 0.99 |
| 4 | Veevarustusteenused | pág. 14, precedente |
| 5 | Mitmesugused bürookulud | pág. 14, precedente |
| 6 | Lähetuskulud | pág. 14, precedente |
| 7 | Koolituskulud | pág. 14, precedente |
| 8 | Treeninglaagrid | pág. 14, Jev 0.98 |
| 9 | Liikmemaksud | pág. 14, precedente |
| 10 | Proportsiooniga tagastamatu käibemaks | pág. 14, precedente |
| 11 | Staadioni ja saali rent | pág. 14, precedente |
| 12 | Transport | pág. 14, precedente |
| 13 | Muud | pág. 14, precedente |
| 14 | Palgakulu | pág. 14, precedente |
| 15 | Sotsiaalmaksud | pág. 14, precedente |
| 16 | Põhivarade kulum ja väärtuse langus | pág. 5, precedente |
| 17 | Muud kulud | pág. 5, precedente |

### Meta

```text
2019: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-18): reportType = official_balance_sheet. majandusaasta aruanne anual con estado de resultados ("## Tulemiaruanne", .md L119) (Claude 2026-10-18)
2019: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-18): cero-real = Televisión. sin ninguna fila de ese rubro en el estado ni en las notas; mismo caso que el 2025 del club (Claude 2026-10-18)
2019: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-18): cero-real = Estadio. sin ninguna fila de ese rubro en el estado ni en las notas; mismo caso que el 2025 del club (Claude 2026-10-18)
tools/cargar.mjs (2026-10-18). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

```text
tools/caja-deuda.mjs (2026-10-18): cash escalón 1 (compuerta: documento siguiente): "Raha" pág. 4
```

## Gestiones

_investigado por un subagente con fuente por gestión (Admin/gestiones-por-pais/tanda-2026-10-19/resultado-18.json, tools/gestiones-tanda.mjs, 2026-10-19):_

```text
Ragnar Klavan (2016-05-01 a hoy): La Wikipedia en inglés (Ragnar Klavan) dice 'In May 2016, Klavan became president of Estonian football club Tallinna Kalev'; solo da el mes, así que el día es 01 por convención (2016-05-01). El registro (ariregister.rik.ee/eng/company/80176115 e Inforegister) lo muestra como miembro de la junta desde el 14.10.2016, junto con Dzintar Klavan; la fecha de la Wikipedia es de mayo y la del registro de octubre, o sea que el alta en la junta fue posterior al anuncio. Wikipedia de Kalev dice 'announced in May 2016'; otra fuente de prensa dice 'desde 2017'. El balance 2025 lo firma él como Juhatuse liige: Clubes/Estonia/Tallinna Kalev/aruanne-2025.md:764 (firma 30.03.2026). OJO: el balance 2019 lo firman Joel Lindpere y Dzintar Klavan como Juhatuse liige (aruanne-2019.md:540-541), no Ragnar; Lindpere ya no figura en la junta actual. La gestión conductora para el sitio sigue siendo el presidente, pero los cierres 2019 y quizá 2020-2022 los firmaron otros miembros de la junta.
Duda: Fecha de asunción: mayo de 2016 (Wikipedia, anuncio) frente a 2016-10-14 (alta en la junta del registro) y 'desde 2017' en otra fuente de prensa. Se usó 2016-05-01; no afecta ningún cierre (todos son 2019 en adelante).
Duda: No encontré el nombre del presidente anterior a Klavan; no importa para los cierres cargados.
Duda: Klavan fue jugador del club en 2023-2025 además de presidente; no se encontró fuente que indique si ejerció la presidencia de forma continua. Los balances 2019 los firmaron Lindpere y Dzintar Klavan: conviene confirmar con el club.
```

## Fuentes

### tallinnakalev-ee-aruanne-2025

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-18) desde la transcripción Clubes/Estonia/Tallinna Kalev/aruanne-2025.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.
```

### tallinnakalev-ee-aruanne-2019

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-18) desde la transcripción Clubes/Estonia/Tallinna Kalev/aruanne-2019.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.
```

### tallinnakalev-ee-aruanne-2024

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-18) desde la transcripción Clubes/Estonia/Tallinna Kalev/aruanne-2024.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.
```

### tallinnakalev-ee-aruanne-2020

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-18) desde la transcripción Clubes/Estonia/Tallinna Kalev/aruanne-2020.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.
```

### tallinnakalev-ee-aruanne-2021

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-18) desde la transcripción Clubes/Estonia/Tallinna Kalev/aruanne-2021.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.
```

### tallinnakalev-ee-aruanne-2022

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-18) desde la transcripción Clubes/Estonia/Tallinna Kalev/aruanne-2022.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.
```

### tallinnakalev-ee-aruanne-2023

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-18) desde la transcripción Clubes/Estonia/Tallinna Kalev/aruanne-2023.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.
```
