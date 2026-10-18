# narvatrans-ee — evidencia de carga

Lo que antes iba como comentario en el data file del club, `data/<país>/narvatrans-ee-data.js` (la regla: `Admin/CONVENCIONES-DATOS.md`, "data/<país>/<club>-data.js NO LLEVA
COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y meta. Las notas de cada fila van en una tabla con su número de
fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
Narva Trans: alta por tools/alta-club.mjs (2026-10-18) desde Clubes/Estonia/Narva Trans/aruanne-2025.pdf. brandColor #EC152F
(procedencia en Admin/sourcing/Estonia/Narva Trans.md; tools/cargar-lote.mjs).
```

```text
data/ee/narvatrans-ee-data.js — Jalgpalliklubi Narva Trans (Estonia).
ALTA POR SCRIPT (tools/alta-club.mjs, 2026-10-18), SIN EJERCICIOS CARGADOS TODAVÍA: las estructuras del data file
nacen vacías a propósito. Los rubros, los totales oficiales y el resto del fiscalYearMeta los agrega la etapa de carga.

Documento que originó el alta: Clubes/Estonia/Narva Trans/aruanne-2025.pdf

De dónde salió cada campo (estado según alta-club.mjs: ok / pendiente):
  id                 ok        "narvatrans-ee" — slug de "Narva Trans" + '-ee' (convención de clubId, Admin/CONVENCIONES.md Versión 129)
  name               ok        "Jalgpalliklubi Narva Trans" — ajuste manual (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-18): portada L8-12 (con la escuela Jalgpallikool Narva Trans, controlada); conso
  displayName        ok        "Narva Trans" — nombre de la carpeta del club en Clubes/
  country            ok        "EE" — carpeta de país "Estonia" (tabla PAISES)
  reportingCurrency  ok        "EUR" — moneda de curso legal de Estonia
  fiscalYearStart    ok        "01-01" — cierre del ejercicio: contenido del .md (31 de 31 fechas de fin de mes caen en el mes 12)
  sport              ok        "futbol" — el .md nombra el fútbol 0 veces y ningún otro deporte más que eso
  brandColor         pendiente (ausente) — la liga del club no está en tools/brand-color-reference/ (o el club no está en footylogos)
  anio               ok        2025 — nombre del archivo (misma regla que onboard.mjs --quien), confirmado por las fechas de cierre del .md
  cierre             ok        "2025-12-31" — año del ejercicio + mes de cierre (contenido del .md (31 de 31 fechas de fin de mes caen en el mes 12))
  reportType         ok        "official_balance_sheet" — ajuste manual (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-18): majandusaasta aruanne 01.01-31.12.2025 con tulemiaruanne (L146) (revisión d
  perimetro          ok        "individual" — ajuste manual (Admin/registros/ajustes-manuales.jsonl, perimetro-senales 2026-10-18): perimetro-senales.mjs: 0 documento(s) con los dos estados votan 
  currency           ok        "EUR" — moneda de curso legal de Estonia (tabla PAISES de alta-club.mjs)
  fxRef              ok        "EUR@2025-12-31" — el documento no declara tipo de cambio; FX_CLOSE ya tiene EUR@2025-12-31 = 0.8511 (Cierre BCE al 31/12/2025 (1 EUR = 1,1750 USD))
  sourceId           ok        "narvatrans-ee-aruanne-2025" — clubId + nombre del archivo en slug
  liga               pendiente null — sin caché de rosters para ee (tools/club-league-reference/ee.json)

FISCAL YEAR META PROPUESTO para 2025 (NO registrado: un ejercicio con meta y
sin rubros se vería en el sitio como un año en cero, y "sin dato no es cero"):
  2025: {"reportType":"official_balance_sheet","currency":"EUR","fxRef":"EUR@2025-12-31","sourceId":"narvatrans-ee-aruanne-2025"}
```

## 2025

### Ingresos

```text
2025: cargado por tools/cargar.mjs (2026-10-18) desde Clubes/Estonia/Narva Trans/aruanne-2025.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Estonia/Narva Trans/aruanne-2025.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Liikmetelt saadud tasud | pág. 5, Jev 1 |
| 2 | sh eraldis riigieelarvest | pág. 14, precedente |
| 3 | sh eraldis kohaliku omavalitsuse eelarvest | pág. 14, precedente |
| 4 | EJLiidu toetused | pág. 14, precedente |
| 5 | UEFA solidaarsustoetus noorte- ja kogukonnatööle | pág. 14, precedente |
| 6 | Mitteseotud osapoolte toetused/annetused | pág. 14, Jev 1 |
| 7 | Seotud osapoolte toetused/annetused | pág. 14, Jev 1 |
| 8 | Väljaku äärde ja reklaamtahvlitele paigaldatud reklaam | pág. 14, Jev 1 |
| 9 | Piletitulu | pág. 14, Jev 1 |
| 10 | Klubi sümboolikaga toodete müügitulu | pág. 14, Jev 1 |
| 11 | Muud klassifitseerimata äritulud | pág. 14, Jev 0.99 |
| 12 | Tulu mängijaõiguste müügist | pág. 14, Jev 1 |
| 13 | Tulu turniiride/laagrite korraldamisest | pág. 14, Jev 0.91 |
| 14 | Klubi peasponsorilt saadud tulu | pág. 14, Jev 0.98 |
| 15 | Muud tulud | pág. 5, Jev 0.98 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Kulu mängija]iguste soetamisest ja ülemineku registreerimitsudest | pág. 15, precedente |
| 2 | Kodumängu korralduskulud | pág. 15, Jev 1 |
| 3 | Võistkondade välissõitude- ja lähetuskulud | pág. 15, Jev 1 |
| 4 | Klubisümboolikaga toodete omahind | pág. 15, precedente |
| 5 | Klubile kuuluvate ja tema poolt renditud hoonete ja rajatistega seotud kulud | pág. 15, precedente |
| 6 | Klubi administreerimiskulud | pág. 15, Jev 1 |
| 7 | Mänguvormid ja varustus | pág. 15, Jev 1 |
| 8 | Muu tegevuse kulu/koolitus, riigilõiv | pág. 15, precedente |
| 9 | Muud klassifitseerimata tegevuskulud/ehitus | pág. 15, precedente |
| 10 | Eesti Meistrivõistluste osavõtu tasu | pág. 15, Jev 1 |
| 11 | Meditsiinitarvikud-ja teenused | pág. 15, precedente |
| 12 | Mängijate palgakulu | pág. 15, Jev 1 |
| 13 | Sotsiaalmaks mängijate töötasudelt | pág. 15, Claude 0.9 |
| 14 | Mängijatele makstav sportlasetoetus | pág. 15, precedente |
| 15 | Mängijatele makstav EJL ja klubi poolt arengustipendium | pág. 15, precedente |
| 16 | Tehnilise personali palgakulu | pág. 15, Jev 0.96 |
| 17 | Sotsiaalmaks tehnilise personali töötasudelt | pág. 15, Claude 0.9 |
| 18 | Muu personali palgakulu | pág. 15, precedente |
| 19 | Sotsiaalmaks muu personaali | pág. 15, precedente |
| 20 | Põhivarade kulum ja väärtuse langus | pág. 5, Claude 0.8 |
| 21 | Muud kulud | pág. 5, Claude 0.8 |

### Meta

```text
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-18): reportType = official_balance_sheet. majandusaasta aruanne 01.01-31.12.2025 con tulemiaruanne (L146) (revisión del alta, subagente Sonnet, revisado por Claude 2026-10-18)
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-18): cero-real = Televisión. Lisa 11 L591 'Tulu ülekandeõiguste müügist 0' (subagente Sonnet, revisado por Claude 2026-10-18)
tools/cargar.mjs (2026-10-18). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

```text
tools/caja-deuda.mjs (2026-10-18): cash escalón 1 (compuerta: documento anterior): "Raha" pág. 4
```

### Liga

```text
alta-club.mjs (2026-10-18): null, SIN VERIFICAR (sin caché de rosters para ee (tools/club-league-reference/ee.json)).
```

## 2024

### Ingresos

```text
2024: cargado por tools/cargar.mjs (2026-10-18) desde Clubes/Estonia/Narva Trans/aruanne-2024.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Estonia/Narva Trans/aruanne-2024.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Liikmetelt saadud tasud | pág. 5, precedente |
| 2 | sh eraldis riigieelarvest | pág. 13, precedente |
| 3 | sh eraldis kohaliku omavalitsuse eelarvest | pág. 13, precedente |
| 4 | EJLiidu toetused | pág. 13, precedente |
| 5 | UEFA solidaarsustoetus noorte- ja kogukonnatööle | pág. 13, precedente |
| 6 | Mitteseotud osapoolte toetused/annetused | pág. 13, precedente |
| 7 | Seotud osapoolte toetused/annetused | pág. 13, precedente |
| 8 | UEFA solidaarsustoetus osalemise eest UEFA klubivõistlustel | pág. 13, Jev 1 |
| 9 | Väljaku äärde ja reklaamtahvlitele paigaldatud reklaam | pág. 13, precedente |
| 10 | Piletitulu | pág. 13, precedente |
| 11 | Klubi sümboolikaga toodete müügitulu | pág. 13, precedente |
| 12 | Muud klassifitseerimata äritulud | pág. 13, precedente |
| 13 | Tulu mängijaõiguste müügist | pág. 13, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Kulu mängijaõiguste soetamisest ja ülemineku registreerimistasudest | pág. 14, Claude 0.93 |
| 2 | Kodumängu korralduskulud | pág. 14, precedente |
| 3 | Võistkondade välissõitude- ja lähetuskulud | pág. 14, precedente |
| 4 | Klubile kuuluvate ja tema poolt renditud hoonete ja rajatistega seotud kulud | pág. 14, precedente |
| 5 | Klubi administreerimiskulud | pág. 14, precedente |
| 6 | Mänguvormid jm varustus | pág. 14, precedente |
| 7 | Muu äritegevuse kulu/koolitus, riigilõiv | pág. 14, Jev 0.96 |
| 8 | Muud klassifitseerimata tegevuskulud | pág. 14, Jev 0.97 |
| 9 | Eesti meistrivõistluste osavõtutasu | pág. 14, precedente |
| 10 | Meditsiinitarvikud- ja teenused | pág. 14, precedente |
| 11 | Muud | pág. 14, Jev 1 |
| 12 | Mängijate palgakulu | pág. 14, precedente |
| 13 | Sotsiaalmaks mängijate töötasudelt | pág. 14, precedente |
| 14 | Mängijatele makstav sportlasetoetus | pág. 14, precedente |
| 15 | Mängijatele makstav EJL arengustipendium | pág. 14, Claude 0.92 |
| 16 | Muu personali palgakulu | pág. 14, precedente |
| 17 | Sotsiaalmaks muu personali töötasudelt | pág. 14, Jev 0.96 |
| 18 | Põhivarade kulum ja väärtuse langus | pág. 5, precedente |
| 19 | Muud kulud | pág. 5, precedente |

### Meta

```text
2024: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-18): reportType = official_balance_sheet. majandusaasta aruanne anual con estado de resultados ("## Tulemiaruanne", .md L79) (Claude 2026-10-18)
2024: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-18): cero-real = Televisión. fila 'Tulu ülekandeõiguste müügist' en 0 en 2024 (L458; los 3.000 son de la columna 2023) (Claude 2026-10-18)
tools/cargar.mjs (2026-10-18). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

## 2023

### Ingresos

```text
2023: cargado por tools/cargar.mjs (2026-10-18) desde Clubes/Estonia/Narva Trans/aruanne-2023.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Estonia/Narva Trans/aruanne-2023.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Liikmetelt saadud tasud | pág. 5, precedente |
| 2 | sh eraldis riigieelarvest | pág. 13, precedente |
| 3 | sh eraldis kohaliku omavalitsuse eelarvest | pág. 13, precedente |
| 4 | EJLiidu toetused | pág. 13, precedente |
| 5 | UEFA solidaarsustoetus noorte- ja kogukonnatööle | pág. 13, precedente |
| 6 | Mitteseotud osapoolte toetused/annetused | pág. 13, precedente |
| 7 | Seotud osapoolte toetused/annetused | pág. 13, precedente |
| 8 | Muud klassifitseerimata annetused ja toetused | pág. 13, Jev 1 |
| 9 | Väljaku äärde ja reklaamtahvlitele paigaldatud reklaam | pág. 13, precedente |
| 10 | Piletitulu | pág. 13, precedente |
| 11 | Klubi sümboolikaga toodete müügitulu | pág. 13, precedente |
| 12 | Muu klassifitseerimata sponsorlus- ja reklaamitulu | pág. 13, Claude 0.9 |
| 13 | Tulu ülekandeõiguste müügist | pág. 13, Jev 1 |
| 14 | Renditulu staadioni või selle rajatiste väljarentimisest | pág. 13, Jev 1 |
| 15 | Muud klassifitseerimata äritulud | pág. 13, precedente |
| 16 | Tulu mängijaõiguste müügist | pág. 13, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Kulu mängijaõiguste soetamisest ja ülemineku registreerimistasudest | pág. 14, precedente |
| 2 | Kodumängu korralduskulud | pág. 14, precedente |
| 3 | Võistkondade välissõitude- ja lähetuskulud | pág. 14, precedente |
| 4 | Klubisümboolikaga toodete omahind | pág. 14, precedente |
| 5 | Klubile kuuluvate ja tema poolt renditud hoonete ja rajatistega seotud kulud | pág. 14, precedente |
| 6 | Klubi administreerimiskulud | pág. 14, precedente |
| 7 | Meditsiinitarvikud- ja teenused | pág. 14, precedente |
| 8 | Mänguvormid jm varustus | pág. 14, precedente |
| 9 | Muu äritegevuse kulu/koolitus, riigilõiv | pág. 14, Jev 0.96 |
| 10 | Muud klassifitseerimata tegevuskulud | pág. 14, Jev 0.97 |
| 11 | Eesti meistrivõistluste osavõtutasu | pág. 14, precedente |
| 12 | Kooli poolt renditud hoonete ja rajatistega seotud kulud | pág. 14, precedente |
| 13 | Turundus-, sponsorlus- ja reklaamikulud | pág. 14, Jev 1 |
| 14 | Mängijate palgakulu | pág. 14, precedente |
| 15 | Sotsiaalmaks mängijate töötasudelt | pág. 14, precedente |
| 16 | Mängijatele makstav sportlasetoetus | pág. 14, precedente |
| 17 | Mängijatele makstav EJL arengustipendium | pág. 14, precedente |
| 18 | Muu personali palgakulu | pág. 14, precedente |
| 19 | Sotsiaalmaks muu personali töötasudelt | pág. 14, Jev 0.96 |
| 20 | Muud kulud | pág. 5, precedente |

### Meta

```text
2023: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-18): reportType = official_balance_sheet. majandusaasta aruanne anual con estado de resultados ("## Tulemiaruanne", .md L139) (Claude 2026-10-18)
tools/cargar.mjs (2026-10-18). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

```text
tools/caja-deuda.mjs (2026-10-18): cash escalón 1 (compuerta: documento siguiente): "Raha" pág. 4
```

## 2022

### Ingresos

```text
2022: cargado por tools/cargar.mjs (2026-10-18) desde Clubes/Estonia/Narva Trans/aruanne-2022.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Estonia/Narva Trans/aruanne-2022.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Liikmemaksud | pág. 12, Jev 1 |
| 2 | Treeningtasu | pág. 12, precedente |
| 3 | Sihtfinantseerimine tegevuskuludeks | pág. 12, Jev 0.97 |
| 4 | Riigi ja KOV toetused | pág. 12, Jev 1 |
| 5 | EJLiidu toetused | pág. 12, precedente |
| 6 | UEFA solidaarsustoetus noorte- ja kogukonnatööle | pág. 12, precedente |
| 7 | Mitteseotud osapoolte toetused/annetused | pág. 12, precedente |
| 8 | Väljaku äärde ja reklaamtahvlitele paigaldatud reklaam | pág. 12, precedente |
| 9 | Muu klassifitseerimata sponsorlus- ja reklaamitulu | pág. 12, Claude 0.9 |
| 10 | Klubi sümboolikaga toodete müügitulu | pág. 12, precedente |
| 11 | Piletitulu | pág. 12, precedente |
| 12 | Tulu mängijaõiguste müügist | pág. 5, Jev 1 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Kulu mängijaõiguste soetamisest ja ülemineku registreerimistasudest | pág. 13, precedente |
| 2 | Kodumängu korralduskulud | pág. 13, precedente |
| 3 | Võistkondade välissõitude- ja lähetuskulud | pág. 13, precedente |
| 4 | Klubisümboolikaga toodete omahind | pág. 13, precedente |
| 5 | Klubile kuuluvate ja tema poolt renditud hoonete ja rajatistega seotud kulud | pág. 13, precedente |
| 6 | Klubi administreerimiskulud | pág. 13, precedente |
| 7 | Meditsiinitarvikud- ja teenused | pág. 13, precedente |
| 8 | Mänguvormid jm varustus | pág. 13, precedente |
| 9 | Muu äritegevuse kulu/koolitus, riigilõiv | pág. 13, Jev 0.96 |
| 10 | Muud klassifitseerimata tegevuskulud | pág. 13, Jev 0.97 |
| 11 | Eesti meistrivõistluste osavõtutasu | pág. 13, precedente |
| 12 | Kooli poolt renditud hoonete ja rajatistega seotud kulud | pág. 13, precedente |
| 13 | Muud | pág. 13, Jev 1 |
| 14 | Mängijate palgakulu | pág. 13, precedente |
| 15 | Sotsiaalmaks mängijate töötasudelt | pág. 13, precedente |
| 16 | Mängijatele makstav sportlasetoetus | pág. 13, precedente |
| 17 | Mängijatele makstav EJL arengustipendium | pág. 13, precedente |
| 18 | Muu personali palgakulu | pág. 13, precedente |
| 19 | Sotsiaalmaks muu personali töötasudelt | pág. 13, Jev 0.96 |
| 20 | Muud kulud | pág. 5, precedente |

### Meta

```text
2022: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-18): reportType = official_balance_sheet. majandusaasta aruanne anual con estado de resultados ("## Tulemiaruanne", .md L134) (Claude 2026-10-18)
2022: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-18): cero-real = Televisión. sin ninguna fila de ese rubro en el estado ni en las notas; mismo caso que el 2025 del club (Claude 2026-10-18)
tools/cargar.mjs (2026-10-18). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

```text
tools/caja-deuda.mjs (2026-10-18): cash escalón 1 (compuerta: documento siguiente): "Raha" pág. 4
```

## 2021

### Ingresos

```text
2021: cargado por tools/cargar.mjs (2026-10-18) desde Clubes/Estonia/Narva Trans/aruanne-2021.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Estonia/Narva Trans/aruanne-2021.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Liikmetelt saadud tasud | pág. 5, precedente |
| 2 | Riigi ja/või KOV toetused | pág. 12, Jev 1 |
| 3 | EJL toetused | pág. 12, Jev 0.92 |
| 4 | UEFA solidaarsustoetus noorte- ja kogukonnatööle | pág. 12, precedente |
| 5 | Mitteseotud osapoolte toetused/annetused | pág. 12, precedente |
| 6 | Tulu ettevõtlusest | pág. 5, Jev 1 |
| 7 | Muud tulud | pág. 5, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Mitmesugused tegevuskulud | pág. 5, precedente |
| 2 | Palgakulu | pág. 14, precedente |
| 3 | Sotsiaalmaksud | pág. 14, precedente |
| 4 | töötuskindlustusmaks ettevõttest | pág. 14, precedente |
| 5 | Sportlase toetus/stipendium | pág. 14, Claude 0.85 |
| 6 | Muud kulud | pág. 5, precedente |

### Meta

```text
2021: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-18): reportType = official_balance_sheet. majandusaasta aruanne anual con estado de resultados ("## Tulemiaruanne", .md L125) (Claude 2026-10-18)
2021: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-18): cero-real = Televisión. sin ninguna fila de derechos de TV en el estado consolidado ni en sus notas (grep ülekandeõigus/teleõigus: 0); mismo caso que el 2025 del club (Claude 2026-10-18)
tools/cargar.mjs (2026-10-18). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee.
```

```text
tools/dentro-de-otro.mjs (2026-10-18): posiblemente dentro de otro rubro, por precedente del club (la fila tiene plata en sus balances desglosados 2019, 2020, 2022, 2023, 2024, 2025): Organización de partidos, Administración y gastos generales
```

## 2020

### Ingresos

```text
2020: cargado por tools/cargar.mjs (2026-10-18) desde Clubes/Estonia/Narva Trans/aruanne-2020.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Estonia/Narva Trans/aruanne-2020.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Sihtfinantseerimine tegevuskuludeks | pág. 12, Jev 0.97 |
| 2 | Omavalitsuse toetus | pág. 12, Jev 1 |
| 3 | EJLiidu toetused | pág. 12, precedente |
| 4 | UEFA solidaarsustoetus | pág. 12, precedente |
| 5 | muud | pág. 12, precedente |
| 6 | Reklaam | pág. 13, Jev 1 |
| 7 | Sponsorlus-ja reklaamitulu | pág. 13, Jev 1 |
| 8 | Kaubandustegevus | pág. 13, precedente |
| 9 | Muud | pág. 13, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Elektrienergia | pág. 13, Jev 1 |
| 2 | Soojusenergia | pág. 13, Jev 0.99 |
| 3 | Kütus | pág. 13, Jev 0.99 |
| 4 | Veevarustusteenused | pág. 13, Jev 1 |
| 5 | Mitmesugused bürookulud | pág. 13, Jev 0.91 |
| 6 | Koolituskulud | pág. 13, Claude 0.8 |
| 7 | Riiklikud ja kohalikud maksud | pág. 13, Jev 1 |
| 8 | Mangude ja treeningute kulud | pág. 13, Claude 0.8 |
| 9 | Varustuskulud | pág. 13, precedente |
| 10 | Majanduskulud | pág. 13, Jev 0.96 |
| 11 | Med kulud | pág. 13, Claude 0.85 |
| 12 | Turniirikulud | pág. 13, Jev 1 |
| 13 | Muud | pág. 13, Jev 1 |
| 14 | Palgakulu | pág. 14, precedente |
| 15 | Sotsiaalmaksud | pág. 14, Jev 0.98 |
| 16 | töötuskindlustusmaks eetevõtest | pág. 14, precedente |
| 17 | Sportlase toetus | pág. 14, Claude 0.85 |
| 18 | Muud kulud | pág. 5, precedente |

### Meta

```text
2020: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-18): reportType = official_balance_sheet. majandusaasta aruanne anual con estado de resultados ("## Tulemiaruanne", .md L114) (Claude 2026-10-18)
2020: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-18): cero-real = Televisión. sin ninguna fila de ese rubro en el estado ni en las notas; mismo caso que el 2025 del club (Claude 2026-10-18)
2020: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-18): cero-real = Estadio. fila en 0 (L438); mismo caso que el 2025 del club (Claude 2026-10-18)
tools/cargar.mjs (2026-10-18). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

## 2019

### Ingresos

```text
2019: cargado por tools/cargar.mjs (2026-10-18) desde Clubes/Estonia/Narva Trans/aruanne-2019.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Estonia/Narva Trans/aruanne-2019.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Omavalitsuse toetus | pág. 12, Jev 1 |
| 2 | EJLiidu toetused noortoole | pág. 12, precedente |
| 3 | UEFA solidaarsustoetus | pág. 12, precedente |
| 4 | UEFA solidaarsustoetus | pág. 12, precedente |
| 5 | muud | pág. 12, precedente |
| 6 | Reklaam | pág. 13, Jev 1 |
| 7 | Sponsorlus-ja reklaamitulu | pág. 13, Jev 1 |
| 8 | Kaubandustegevus | pág. 13, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Üür ja rent | pág. 13, Jev 0.99 |
| 2 | Elektrienergia | pág. 13, Jev 1 |
| 3 | Soojusenergia | pág. 13, Jev 0.99 |
| 4 | Kütus | pág. 13, Jev 0.99 |
| 5 | Veevarustusteenused | pág. 13, Jev 1 |
| 6 | Mitmesugused bürookulud | pág. 13, Jev 0.91 |
| 7 | Lähetuskulud | pág. 13, Jev 1 |
| 8 | Koolituskulud | pág. 13, Claude 0.8 |
| 9 | Riiklikud ja kohalikud maksud | pág. 13, Jev 1 |
| 10 | Kulu ebatõenäoliselt laekuvatest nõuetest | pág. 13, Jev 0.98 |
| 11 | Mangude ja treeningute kulud | pág. 13, Claude 0.8 |
| 12 | Jalgpallikooli seotud kulud | pág. 13, precedente |
| 13 | Varustuskulud | pág. 13, precedente |
| 14 | Majanduskulud | pág. 13, Jev 0.96 |
| 15 | Med kulud | pág. 13, Claude 0.85 |
| 16 | Turniirikulud | pág. 13, Jev 1 |
| 17 | Muud | pág. 13, Jev 1 |
| 18 | Palgakulu | pág. 14, precedente |
| 19 | Sotsiaalmaksud | pág. 14, Jev 0.98 |
| 20 | töötuskindlustusmaks eetevõtest | pág. 14, precedente |
| 21 | Muud kulud | pág. 5, precedente |

### Meta

```text
2019: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-18): reportType = official_balance_sheet. majandusaasta aruanne anual con estado de resultados ("## Tulemiaruanne", .md L116) (Claude 2026-10-18)
2019: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-18): cero-real = Televisión. sin ninguna fila de ese rubro en el estado ni en las notas; mismo caso que el 2025 del club (Claude 2026-10-18)
2019: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-18): cero-real = Estadio. fila en 0 (L460); mismo caso que el 2025 del club (Claude 2026-10-18)
tools/cargar.mjs (2026-10-18). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

```text
tools/caja-deuda.mjs (2026-10-18): grossDebt escalón 1 (compuerta: documento siguiente): "Laenukohustised" pág. 4; cash escalón 1 (compuerta: documento siguiente): "Raha" pág. 4
```

## Fuentes

### narvatrans-ee-aruanne-2025

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-18) desde la transcripción Clubes/Estonia/Narva Trans/aruanne-2025.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### narvatrans-ee-aruanne-2019

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-18) desde la transcripción Clubes/Estonia/Narva Trans/aruanne-2019.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.
```

### narvatrans-ee-aruanne-2024

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-18) desde la transcripción Clubes/Estonia/Narva Trans/aruanne-2024.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.
```

### narvatrans-ee-aruanne-2020

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-18) desde la transcripción Clubes/Estonia/Narva Trans/aruanne-2020.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.
```

### narvatrans-ee-aruanne-2022

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-18) desde la transcripción Clubes/Estonia/Narva Trans/aruanne-2022.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.
```

### narvatrans-ee-aruanne-2023

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-18) desde la transcripción Clubes/Estonia/Narva Trans/aruanne-2023.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.
```

### narvatrans-ee-aruanne-2021

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-18) desde la transcripción Clubes/Estonia/Narva Trans/aruanne-2021.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.
```
