# nommekalju-ee — evidencia de carga

Lo que antes iba como comentario en el data file del club, `data/<país>/nommekalju-ee-data.js` (la regla: `Admin/CONVENCIONES-DATOS.md`, "data/<país>/<club>-data.js NO LLEVA
COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y meta. Las notas de cada fila van en una tabla con su número de
fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
Nõmme Kalju: alta por tools/alta-club.mjs (2026-10-18) desde Clubes/Estonia/Nõmme Kalju/aruanne-2025.pdf. brandColor #000000
(procedencia en Admin/sourcing/Estonia/Nõmme Kalju.md; tools/cargar-lote.mjs).
```

```text
data/ee/nommekalju-ee-data.js — Mittetulundusühing Nõmme Kalju FC (Estonia).
ALTA POR SCRIPT (tools/alta-club.mjs, 2026-10-18), SIN EJERCICIOS CARGADOS TODAVÍA: las estructuras del data file
nacen vacías a propósito. Los rubros, los totales oficiales y el resto del fiscalYearMeta los agrega la etapa de carga.

Documento que originó el alta: Clubes/Estonia/Nõmme Kalju/aruanne-2025.pdf

De dónde salió cada campo (estado según alta-club.mjs: ok / pendiente):
  id                 ok        "nommekalju-ee" — slug de "Nõmme Kalju" + '-ee' (convención de clubId, Admin/CONVENCIONES.md Versión 129)
  name               ok        "Mittetulundusühing Nõmme Kalju FC" — ajuste manual (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-18): portada L9 'nimi: Mittetulundusühing Nõmme Kalju FC', registrikood 80048819
  displayName        ok        "Nõmme Kalju" — nombre de la carpeta del club en Clubes/
  country            ok        "EE" — carpeta de país "Estonia" (tabla PAISES)
  reportingCurrency  ok        "EUR" — moneda de curso legal de Estonia
  fiscalYearStart    ok        "01-01" — cierre del ejercicio: contenido del .md (45 de 49 fechas de fin de mes caen en el mes 12)
  sport              ok        "futbol" — el .md nombra el fútbol 0 veces y ningún otro deporte más que eso
  brandColor         pendiente (ausente) — la liga del club no está en tools/brand-color-reference/ (o el club no está en footylogos)
  anio               ok        2025 — nombre del archivo (misma regla que onboard.mjs --quien), confirmado por las fechas de cierre del .md
  cierre             ok        "2025-12-31" — año del ejercicio + mes de cierre (contenido del .md (45 de 49 fechas de fin de mes caen en el mes 12))
  reportType         ok        "official_balance_sheet" — ajuste manual (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-18): majandusaasta aruanne 01.01-31.12.2025 con tulemiaruanne (L219-247) (revisi
  perimetro          ok        "individual" — el .md no presenta estados consolidados (0 menciones de "consolidado")
  currency           ok        "EUR" — moneda de curso legal de Estonia (tabla PAISES de alta-club.mjs)
  fxRef              ok        "EUR@2025-12-31" — el documento no declara tipo de cambio; FX_CLOSE ya tiene EUR@2025-12-31 = 0.8511 (Cierre BCE al 31/12/2025 (1 EUR = 1,1750 USD))
  sourceId           ok        "nommekalju-ee-aruanne-2025" — clubId + nombre del archivo en slug
  liga               pendiente null — sin caché de rosters para ee (tools/club-league-reference/ee.json)

FISCAL YEAR META PROPUESTO para 2025 (NO registrado: un ejercicio con meta y
sin rubros se vería en el sitio como un año en cero, y "sin dato no es cero"):
  2025: {"reportType":"official_balance_sheet","currency":"EUR","fxRef":"EUR@2025-12-31","sourceId":"nommekalju-ee-aruanne-2025"}
```

## 2025

### Ingresos

```text
2025: cargado por tools/cargar.mjs (2026-10-18) desde Clubes/Estonia/Nõmme Kalju/aruanne-2025.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Estonia/Nõmme Kalju/aruanne-2025.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Liikmetelt saadud tasud | pág. 7, Jev 1 |
| 2 | Sihtfinantseerimine tegevuskuludeks | pág. 18, Jev 0.97 |
| 3 | Riigi ja omavalitsuste toetus | pág. 18, Jev 0.98 |
| 4 | UEFA solidaarsustoetus | pág. 18, precedente |
| 5 | EJL toetused | pág. 18, precedente |
| 6 | Muud toetused ECA, LHV | pág. 18, Jev 0.97 |
| 7 | Riiklik noorteraha | pág. 18, Jev 0.94 |
| 8 | Piletitulu Eesti sisesed võistlused | pág. 18, Claude 0.85 |
| 9 | Piletitulu UEFA klubisarjades osalemisest | pág. 18, precedente |
| 10 | Mängijaõiguste müük | pág. 18, Jev 1 |
| 11 | TV õiguste müük | pág. 18, Jev 1 |
| 12 | Renditulu | pág. 18, Claude 0.85 |
| 13 | Muu äritegevus | pág. 18, precedente |
| 14 | Tulu sponsoritelt | pág. 18, Jev 0.99 |
| 15 | Klubi sümboolikaga toodete müügitulu | pág. 18, Jev 1 |
| 16 | Muud tulud | pág. 7, Jev 0.98 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Sihtotstarbeliselt finantseeritud projektide otsesed kulud | pág. 7, Jev 0.95 |
| 2 | Maksuvabad stipendiumid | pág. 19, precedente |
| 3 | Sportlastoetused | pág. 19, precedente |
| 4 | Tasud vahendajatele/agenditasud | pág. 19, Jev 0.97 |
| 5 | Mängijaõigused | pág. 19, precedente |
| 6 | Kodumängude korralduskulud | pág. 19, Jev 1 |
| 7 | Eesti meistrivõistluste osavõtutasu | pág. 19, Jev 1 |
| 8 | Võistkondade välissõitude kulud | pág. 19, Jev 1 |
| 9 | Turundus-, sponsorlus- ja reklaamikulud | pág. 19, Jev 1 |
| 10 | Klubisümboolikaga toodete omahind | pág. 19, Jev 0.96 |
| 11 | Klubile kuuluvate ja tema kasutuses olevate hoonete ja rajatistega seotud kulud | pág. 19, precedente |
| 12 | Klubi administreerimiskulud | pág. 19, Jev 1 |
| 13 | Meditsiinitarvikud- ja teenused | pág. 19, precedente |
| 14 | Mänguvormid jm varustus | pág. 19, Jev 1 |
| 15 | Mängijate palgakulu | pág. 19, Jev 0.9 |
| 16 | Mängijate töötasudelt makstud maksud | pág. 19, Claude 0.9 |
| 17 | Muu personali palgakulu | pág. 19, precedente |
| 18 | Muu personali töötasudelt makstud maksud | pág. 19, Jev 0.9 |
| 19 | Puhkusereserv | pág. 19, precedente |
| 20 | Põhivarade kulum ja väärtuse langus | pág. 7, Jev 1 |
| 21 | Muud kulud | pág. 7, Jev 1 |

### Meta

```text
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-18): reportType = official_balance_sheet. majandusaasta aruanne 01.01-31.12.2025 con tulemiaruanne (L219-247) (revisión del alta, subagente Sonnet, revisado por Claude 2026-10-18)
tools/cargar.mjs (2026-10-18). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

```text
tools/caja-deuda.mjs (2026-10-18): cash escalón 1 (compuerta: documento anterior): "Raha" pág. 6
```

### Liga

```text
alta-club.mjs (2026-10-18): null, SIN VERIFICAR (sin caché de rosters para ee (tools/club-league-reference/ee.json)).
```

## 2024

### Ingresos

```text
2024: cargado por tools/cargar.mjs (2026-10-18) desde Clubes/Estonia/Nõmme Kalju/aruanne-2024.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Estonia/Nõmme Kalju/aruanne-2024.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Liikmetelt saadud tasud | pág. 7, precedente |
| 2 | Riigi ja omavalitsuste toetus | pág. 17, precedente |
| 3 | UEFA solidaarsustoetus | pág. 17, precedente |
| 4 | EJL toetused | pág. 17, precedente |
| 5 | Muud toetused ECA, LHV | pág. 17, precedente |
| 6 | Riiklik noorteraha | pág. 17, precedente |
| 7 | Piletitulu Eesti sisesed võistlused | pág. 18, precedente |
| 8 | Mängijaõiguste müük | pág. 18, precedente |
| 9 | TV õiguste müük | pág. 18, precedente |
| 10 | Renditulu | pág. 18, precedente |
| 11 | Muu äritegevus | pág. 18, precedente |
| 12 | Tulu sponsoritelt | pág. 18, precedente |
| 13 | Kaupade, teenuste müük | pág. 18, ? 0.6 |
| 14 | Klubi sümboolikaga toodete müügitulu | pág. 18, precedente |
| 15 | Muud tulud | pág. 7, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Maksuvabad stipendiumid | pág. 18, precedente |
| 2 | Sportlastoetused | pág. 18, precedente |
| 3 | Tasud vahendajatele/agenditasud | pág. 19, precedente |
| 4 | Mängijaõigused | pág. 19, precedente |
| 5 | Kodumängude korralduskulud | pág. 19, precedente |
| 6 | Eesti meistrivõistluste osavõtutasu | pág. 19, precedente |
| 7 | Võistkondade välissõitude kulud | pág. 19, precedente |
| 8 | Turundus-, sponsorlus- ja reklaamikulud | pág. 19, precedente |
| 9 | Klubisümboolikaga toodete omahind | pág. 19, precedente |
| 10 | Klubile kuuluvate ja tema kasutuses olevate hoonete ja rajatistega seotud kulud | pág. 19, precedente |
| 11 | Klubi administreerimiskulud | pág. 19, precedente |
| 12 | Meditsiinitarvikud- ja teenused | pág. 19, precedente |
| 13 | Mänguvormid jm varustus | pág. 19, precedente |
| 14 | Mängijate palgakulu | pág. 19, precedente |
| 15 | Mängijate töötasudelt makstud maksud | pág. 19, precedente |
| 16 | Muu personali palgakulu | pág. 19, precedente |
| 17 | Muu personali töötasudelt makstud maksud | pág. 19, precedente |
| 18 | Puhkusereserv | pág. 19, precedente |
| 19 | Põhivarade kulum ja väärtuse langus | pág. 7, precedente |
| 20 | Muud kulud | pág. 7, precedente |

### Meta

```text
2024: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-18): reportType = official_balance_sheet. majandusaasta aruanne anual con estado de resultados ("## Tulemiaruanne", .md L231) (Claude 2026-10-18)
tools/cargar.mjs (2026-10-18). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

```text
tools/caja-deuda.mjs (2026-10-18): cash escalón 1 (compuerta: documento siguiente): "Raha" pág. 22
```

## 2023

### Ingresos

```text
2023: cargado por tools/cargar.mjs (2026-10-18) desde Clubes/Estonia/Nõmme Kalju/aruanne-2023.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Estonia/Nõmme Kalju/aruanne-2023.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Liikmetelt saadud tasud | pág. 7, precedente |
| 2 | Riigi ja omavalitsuste toetus | pág. 17, precedente |
| 3 | UEFA solidaarsustoetus | pág. 17, precedente |
| 4 | EJL toetused | pág. 17, precedente |
| 5 | Toetused treeningute korraldamiseks | pág. 17, Jev 0.97 |
| 6 | Muud toetused ECA, LHV | pág. 17, precedente |
| 7 | Riiklik noorteraha | pág. 17, precedente |
| 8 | Piletitulu Eesti sisesed võistlused | pág. 18, precedente |
| 9 | Mängijaõiguste müük | pág. 18, precedente |
| 10 | Reklaamitulud | pág. 18, Jev 1 |
| 11 | Renditulu | pág. 18, precedente |
| 12 | Muu äritegevus | pág. 18, precedente |
| 13 | Tulu sponsoritelt | pág. 18, precedente |
| 14 | Kaupade, teenuste müük | pág. 18, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Maksuvabad stipendiumid | pág. 18, precedente |
| 2 | Sportlastoetused | pág. 18, precedente |
| 3 | Mängijate ülemineku kulud | pág. 19, Jev 0.93 |
| 4 | Kodumängude korralduskulud | pág. 19, precedente |
| 5 | Eesti meistrivõistluste osavõtutasu | pág. 19, precedente |
| 6 | Võistkondade välissõitude kulud | pág. 19, precedente |
| 7 | Turundus-, sponsorlus- ja reklaamikulud | pág. 19, precedente |
| 8 | Klubisümboolikaga toodete omahind | pág. 19, precedente |
| 9 | Klubile kuuluvate ja tema kasutuses olevate hoonete ja rajatistega seotud kulud | pág. 19, precedente |
| 10 | Klubi administreerimiskulud | pág. 19, precedente |
| 11 | Meditsiinitarvikud- ja teenused | pág. 19, precedente |
| 12 | Mänguvormid jm varustus | pág. 19, precedente |
| 13 | Erakorralised kulud | pág. 19, Jev 1 |
| 14 | Muud klassifitseerimata tegevuskulud | pág. 19, Jev 0.96 |
| 15 | Mängijate palgakulu | pág. 19, precedente |
| 16 | Mängijate töötasudelt makstud maksud | pág. 19, precedente |
| 17 | Muu personali palgakulu | pág. 19, precedente |
| 18 | Muu personali töötasudelt makstud maksud | pág. 19, precedente |
| 19 | Puhkusereserv | pág. 19, precedente |
| 20 | Põhivarade kulum ja väärtuse langus | pág. 7, precedente |
| 21 | Muud kulud | pág. 7, precedente |

### Meta

```text
2023: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-18): reportType = official_balance_sheet. majandusaasta aruanne anual con estado de resultados ("## Tulemiaruanne", .md L221) (Claude 2026-10-18)
2023: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-18): cero-real = Televisión. fila de TV (L639) en 0 en 2023; los 2.000 son de la otra columna (subagente Sonnet, revisado por Claude 2026-10-18)
tools/cargar.mjs (2026-10-18). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

```text
tools/caja-deuda.mjs (2026-10-18): cash escalón 1 (compuerta: documento siguiente): "Raha" pág. 22
```

## 2022

### Ingresos

```text
2022: cargado por tools/cargar.mjs (2026-10-18) desde Clubes/Estonia/Nõmme Kalju/aruanne-2022.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Estonia/Nõmme Kalju/aruanne-2022.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Liikmetelt saadud tasud | pág. 7, precedente |
| 2 | Riigi ja omavalitsuste toetus | pág. 16, precedente |
| 3 | UEFA solidaarsustoetus | pág. 16, precedente |
| 4 | Muud UEFA toetused | pág. 16, precedente |
| 5 | EJL toetused | pág. 16, precedente |
| 6 | Toetused treeningute korraldamiseks | pág. 16, Jev 0.97 |
| 7 | Muud toetused ECA, LHV, Töötukassa juhendustasu | pág. 16, Jev 0.99 |
| 8 | Riiklik noorteraha | pág. 16, precedente |
| 9 | Piletitulu Eesti sisesed võistlused | pág. 16, precedente |
| 10 | Mängijaõiguste müük | pág. 16, precedente |
| 11 | TV õiguste müük | pág. 16, precedente |
| 12 | Renditulu | pág. 16, precedente |
| 13 | Muu äritegevus | pág. 16, precedente |
| 14 | Tulu sponsoritelt | pág. 16, precedente |
| 15 | kaupade, teenuste müük | pág. 16, precedente |
| 16 | Muud tulud | pág. 7, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Maksuvabad stipendiumid | pág. 17, precedente |
| 2 | Sportlastoetused | pág. 17, precedente |
| 3 | Mängijate ülemineku kulud | pág. 17, Jev 0.93 |
| 4 | Kodumängude korralduskulud | pág. 17, precedente |
| 5 | Eesti meistrivõistluste osavõtutasu | pág. 17, precedente |
| 6 | Võistkondade välissõitude kulud | pág. 17, precedente |
| 7 | Turundus-, sponsorlus- ja reklaamikulud | pág. 17, precedente |
| 8 | Klubisümboolikaga toodete omahind | pág. 17, precedente |
| 9 | Klubile kuuluvate ja tema kasutuses olevate hoonete ja rajatistega seotud kulud | pág. 17, precedente |
| 10 | Klubi administreerimiskulud | pág. 17, precedente |
| 11 | Meditsiinitarvikud- ja teenused | pág. 17, precedente |
| 12 | Mänguvormid jm varustus | pág. 17, precedente |
| 13 | Erakorralised kulud | pág. 17, Jev 1 |
| 14 | Lootusetute nõuete allahindluskulu | pág. 17, Jev 0.99 |
| 15 | Muud klassifitseerimata tegevuskulud | pág. 17, Jev 0.96 |
| 16 | Mängijate palgakulu | pág. 17, precedente |
| 17 | Mängijate töötasudelt makstud maksud | pág. 17, precedente |
| 18 | Muu personali palgakulu | pág. 17, precedente |
| 19 | Muu personali töötasudelt makstud maksud | pág. 17, precedente |
| 20 | Puhkusereserv | pág. 17, precedente |
| 21 | Põhivarade kulum ja väärtuse langus | pág. 7, precedente |
| 22 | Muud kulud | pág. 7, precedente |

### Meta

```text
2022: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-18): reportType = official_balance_sheet. majandusaasta aruanne anual con estado de resultados ("# TULEMIARUANNE", .md L187) (Claude 2026-10-18)
tools/cargar.mjs (2026-10-18). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

## 2021

### Ingresos

```text
2021: cargado por tools/cargar.mjs (2026-10-18) desde Clubes/Estonia/Nõmme Kalju/aruanne-2021.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Estonia/Nõmme Kalju/aruanne-2021.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Liikmetelt saadud tasud | pág. 6, precedente |
| 2 | Mittesihtotsatarbelised annetused ja toetused | pág. 15, Jev 1 |
| 3 | Riigi ja omavalitsuste toetus | pág. 15, precedente |
| 4 | UEFA solidaarsustoetus | pág. 15, precedente |
| 5 | EJL toetused | pág. 15, precedente |
| 6 | Toetused treeningute korraldamiseks | pág. 15, Jev 0.97 |
| 7 | Muud toetused ECA, LHV, Töötukassa juhendustasu | pág. 15, Jev 0.99 |
| 8 | Riiklik noorteraha | pág. 15, precedente |
| 9 | Töötukassa töötasu toetuse sihtfinantseerimine | pág. 15, Jev 0.98 |
| 10 | Piletitulu Eesti sisesed võistlused | pág. 16, precedente |
| 11 | Mängijaõiguste müük | pág. 16, precedente |
| 12 | Renditulu | pág. 16, precedente |
| 13 | Muu äritegevus | pág. 16, precedente |
| 14 | Tulu sponsoritelt | pág. 16, precedente |
| 15 | kaupade, teenuste müük | pág. 16, precedente |
| 16 | Muud tulud | pág. 6, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Sportlastoetused | pág. 16, precedente |
| 2 | Maksuvabad stipendiumid | pág. 16, precedente |
| 3 | Mängijate ülemineku kulud | pág. 16, Jev 0.93 |
| 4 | Kodumängude korralduskulud | pág. 16, precedente |
| 5 | Eesti meistrivõistluste osavõtutasu | pág. 16, precedente |
| 6 | Võistkondade välissõitude kulud | pág. 16, precedente |
| 7 | Turundus-, sponsorlus- ja reklaamikulud | pág. 16, precedente |
| 8 | Klubisümboolikaga toodete omahind | pág. 16, precedente |
| 9 | Klubile kuuluvate ja tema kasutuses olevate hoonete ja rajatistega seotud kulud | pág. 16, precedente |
| 10 | Klubi administreerimiskulud | pág. 16, precedente |
| 11 | Meditsiinitarvikud- ja teenused | pág. 16, precedente |
| 12 | Mänguvormid jm varustus | pág. 16, precedente |
| 13 | Erakorralised kulud | pág. 16, Jev 1 |
| 14 | Muud klassifitseerimata tegevuskulud | pág. 16, Jev 0.96 |
| 15 | - sh. mängijate tasud | pág. 17, Jev 1 |
| 16 | - sh. treenerite tasud | pág. 17, precedente |
| 17 | - sh. muu personali tasud | pág. 17, Claude 0.9 |
| 18 | Sotsiaalmaksud | pág. 17, precedente |
| 19 | Puhkusereserv | pág. 17, precedente |
| 20 | Põhivarade kulum ja väärtuse langus | pág. 6, precedente |
| 21 | Muud kulud | pág. 6, precedente |

### Meta

```text
2021: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-18): reportType = official_balance_sheet. majandusaasta aruanne anual con estado de resultados ("## Tulemiaruanne", .md L172) (Claude 2026-10-18)
2021: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-18): cero-real = Televisión. fila en 0 (L560); mismo caso que el 2025 del club (Claude 2026-10-18)
tools/cargar.mjs (2026-10-18). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

```text
tools/caja-deuda.mjs (2026-10-18): grossDebt escalón 1 (compuerta: documento anterior): "Laenukohustised" pág. 5; cash escalón 1 (compuerta: documento anterior): "Raha" pág. 5
```

## 2020

### Ingresos

```text
2020: cargado por tools/cargar.mjs (2026-10-18) desde Clubes/Estonia/Nõmme Kalju/aruanne-2020.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Estonia/Nõmme Kalju/aruanne-2020.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Liikmetelt saadud tasud | pág. 6, precedente |
| 2 | Sihtfinantseerimine tegevuskuludeks | pág. 16, precedente |
| 3 | Mittesihtotsatarbelised annetused ja toetused | pág. 16, Jev 1 |
| 4 | Omavalitsuste toetus | pág. 16, Jev 1 |
| 5 | UEFA solidaarsustoetus | pág. 16, precedente |
| 6 | EJL Kogukonnajuht | pág. 16, Jev 1 |
| 7 | EJL ECA | pág. 16, Jev 0.99 |
| 8 | EJL Naiste meistriliiga kvaliteedi tõus | pág. 16, ? 0.6 |
| 9 | Toetused treeningute korraldamiseks | pág. 16, Jev 0.97 |
| 10 | Muud toetused ECA, LHV | pág. 16, precedente |
| 11 | Riiklik noorteraha | pág. 16, precedente |
| 12 | Piletitulu Eesti sisesed võistlused | pág. 16, precedente |
| 13 | Mängijaõiguste müük | pág. 16, precedente |
| 14 | Renditulu | pág. 16, precedente |
| 15 | Muu äritegevus | pág. 16, precedente |
| 16 | Tulu sponsoritelt | pág. 16, precedente |
| 17 | kaupade, teenuste müük | pág. 16, precedente |
| 18 | Muud tulud | pág. 6, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Sihtotstarbeliselt finantseeritud projektide otsesed kulud | pág. 6, precedente |
| 2 | Jalgpallikooli tegevustoetus | pág. 17, precedente |
| 3 | Sportlastoetused | pág. 17, precedente |
| 4 | Mängijate ülemineku kulud | pág. 17, Jev 0.93 |
| 5 | Kodumängude korralduskulud | pág. 17, precedente |
| 6 | Eesti meistrivõistluste osavõtutasu | pág. 17, precedente |
| 7 | Võistkondade välissõitude kulud | pág. 17, precedente |
| 8 | Turundus-, sponsorlus- ja reklaamikulud | pág. 17, precedente |
| 9 | Klubisümboolikaga toodete omahind | pág. 17, precedente |
| 10 | Klubile kuuluvate ja tema kasutuses olevate hoonete ja rajatistega seotud kulud | pág. 17, precedente |
| 11 | Klubi administreerimiskulud | pág. 17, precedente |
| 12 | Meditsiinitarvikud- ja teenused | pág. 17, precedente |
| 13 | Mänguvormid jm varustus | pág. 17, precedente |
| 14 | Erakorralised kulud | pág. 17, Jev 1 |
| 15 | Muud klassifitseerimata tegevuskulud | pág. 17, Jev 0.96 |
| 16 | Tööjõukulud | pág. 6, precedente |
| 17 | Põhivarade kulum ja väärtuse langus | pág. 6, precedente |
| 18 | Muud kulud | pág. 6, precedente |

### Meta

```text
2020: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-18): reportType = official_balance_sheet. majandusaasta aruanne anual con estado de resultados ("## Tulemiaruanne", .md L197) (Claude 2026-10-18)
2020: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-18): cero-real = Televisión. fila de TV (L577) en 0 en 2020; los 19.085 son de la otra columna (subagente Sonnet, revisado por Claude 2026-10-18)
tools/cargar.mjs (2026-10-18). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

```text
tools/caja-deuda.mjs (2026-10-18): cash escalón 1 (compuerta: documento siguiente): "Raha" pág. 5
```

## 2019

### Ingresos

```text
2019: cargado por tools/cargar.mjs (2026-10-18) desde Clubes/Estonia/Nõmme Kalju/aruanne-2019.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Estonia/Nõmme Kalju/aruanne-2019.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Liikmetelt saadud tasud | pág. 6, precedente |
| 2 | Omavalitsuste toetus | pág. 16, Jev 1 |
| 3 | UEFA solidaarsustoetus | pág. 16, precedente |
| 4 | EJL Kogukonnajuht | pág. 16, Jev 1 |
| 5 | Toetused treeningute korraldamiseks | pág. 16, Jev 0.97 |
| 6 | Muud toetused ECA, LHV | pág. 16, precedente |
| 7 | Piletitulu Eesti sisesed võistlused | pág. 16, precedente |
| 8 | Piletitulu UEFA klubisarjades osalemisest | pág. 16, precedente |
| 9 | Muu klassifitseerimiata piletitulu | pág. 16, Claude 0.85 |
| 10 | Mängijaõiguste müük | pág. 16, precedente |
| 11 | Reklaamitulud | pág. 16, Jev 1 |
| 12 | TV õiguste müük | pág. 16, precedente |
| 13 | Renditulu | pág. 16, precedente |
| 14 | Muu äritegevus | pág. 16, precedente |
| 15 | Tulu sponsoritelt | pág. 16, precedente |
| 16 | kaupade, teenuste müük | pág. 16, precedente |
| 17 | Muud tulud | pág. 6, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Jagatud annetused ja toetused | pág. 6, Jev 0.98 |
| 2 | Mängijate ülemineku kulud | pág. 17, Jev 0.93 |
| 3 | Kodumängude korralduskulud | pág. 17, precedente |
| 4 | Eesti meistrivõistluste osavõtutasu | pág. 17, precedente |
| 5 | Võistkondade välissõitude kulud | pág. 17, precedente |
| 6 | Turundus-, sponsorlus- ja reklaamikulud | pág. 17, precedente |
| 7 | Klubisümboolikaga toodete omahind | pág. 17, precedente |
| 8 | Muu äritegevuse kulu | pág. 17, precedente |
| 9 | Klubile kuuluvate ja tema kasutuses olevate hoonete ja rajatistega seotud kulud | pág. 17, precedente |
| 10 | Klubi administreerimiskulud | pág. 17, precedente |
| 11 | Meditsiinitarvikud- ja teenused | pág. 17, precedente |
| 12 | Mänguvormid jm varustus | pág. 17, precedente |
| 13 | Erakorralised kulud | pág. 17, Jev 1 |
| 14 | Muud klassifitseerimata tegevuskulud | pág. 17, Jev 0.96 |
| 15 | - sh. mängijate tasud | pág. 17, Jev 1 |
| 16 | - sh. treenerite tasud | pág. 17, precedente |
| 17 | - sh. muu personali tasud | pág. 17, Claude 0.9 |
| 18 | Sotsiaalmaksud | pág. 17, precedente |
| 19 | Puhkusereserv | pág. 17, precedente |
| 20 | Põhivarade kulum ja väärtuse langus | pág. 6, precedente |
| 21 | Muud kulud | pág. 6, precedente |

### Meta

```text
2019: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-18): reportType = official_balance_sheet. majandusaasta aruanne anual con estado de resultados ("## Tulemiaruanne", .md L150) (Claude 2026-10-18)
tools/cargar.mjs (2026-10-18). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

```text
tools/caja-deuda.mjs (2026-10-18): cash escalón 1 (compuerta: documento siguiente): "Raha" pág. 5
```

## Fuentes

### nommekalju-ee-aruanne-2025

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-18) desde la transcripción Clubes/Estonia/Nõmme Kalju/aruanne-2025.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### nommekalju-ee-aruanne-2024

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-18) desde la transcripción Clubes/Estonia/Nõmme Kalju/aruanne-2024.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.
```

### nommekalju-ee-aruanne-2019

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-18) desde la transcripción Clubes/Estonia/Nõmme Kalju/aruanne-2019.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.
```

### nommekalju-ee-aruanne-2020

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-18) desde la transcripción Clubes/Estonia/Nõmme Kalju/aruanne-2020.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.
```

### nommekalju-ee-aruanne-2021

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-18) desde la transcripción Clubes/Estonia/Nõmme Kalju/aruanne-2021.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.
```

### nommekalju-ee-aruanne-2022

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-18) desde la transcripción Clubes/Estonia/Nõmme Kalju/aruanne-2022.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.
```

### nommekalju-ee-aruanne-2023

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-18) desde la transcripción Clubes/Estonia/Nõmme Kalju/aruanne-2023.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.
```
