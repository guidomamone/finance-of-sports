# paidelinnameeskond-ee — evidencia de carga

Lo que antes iba como comentario en el data file del club, `data/<país>/paidelinnameeskond-ee-data.js` (la regla: `Admin/CONVENCIONES-DATOS.md`, "data/<país>/<club>-data.js NO LLEVA
COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y meta. Las notas de cada fila van en una tabla con su número de
fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
Paide Linnameeskond: alta por tools/alta-club.mjs (2026-10-18) desde Clubes/Estonia/Paide Linnameeskond/aruanne-2025.pdf. brandColor #001C4C
(procedencia en Admin/sourcing/Estonia/Paide Linnameeskond.md; tools/cargar-lote.mjs).
```

```text
data/ee/paidelinnameeskond-ee-data.js — Jalgpalliklubi Paide Linnameeskond (Estonia).
ALTA POR SCRIPT (tools/alta-club.mjs, 2026-10-18), SIN EJERCICIOS CARGADOS TODAVÍA: las estructuras del data file
nacen vacías a propósito. Los rubros, los totales oficiales y el resto del fiscalYearMeta los agrega la etapa de carga.

Documento que originó el alta: Clubes/Estonia/Paide Linnameeskond/aruanne-2025.pdf

De dónde salió cada campo (estado según alta-club.mjs: ok / pendiente):
  id                 ok        "paidelinnameeskond-ee" — slug de "Paide Linnameeskond" + '-ee' (convención de clubId, Admin/CONVENCIONES.md Versión 129)
  name               ok        "Jalgpalliklubi Paide Linnameeskond" — ajuste manual (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-18): portada L8, registrikood 80339528 (revisión del alta, subagente Sonnet, rev
  displayName        ok        "Paide Linnameeskond" — nombre de la carpeta del club en Clubes/
  country            ok        "EE" — carpeta de país "Estonia" (tabla PAISES)
  reportingCurrency  ok        "EUR" — moneda de curso legal de Estonia
  fiscalYearStart    ok        "01-01" — cierre del ejercicio: contenido del .md (48 de 52 fechas de fin de mes caen en el mes 12)
  sport              ok        "futbol" — el .md nombra el fútbol 0 veces y ningún otro deporte más que eso
  brandColor         pendiente (ausente) — la liga del club no está en tools/brand-color-reference/ (o el club no está en footylogos)
  anio               ok        2025 — nombre del archivo (misma regla que onboard.mjs --quien), confirmado por las fechas de cierre del .md
  cierre             ok        "2025-12-31" — año del ejercicio + mes de cierre (contenido del .md (48 de 52 fechas de fin de mes caen en el mes 12))
  reportType         ok        "official_balance_sheet" — ajuste manual (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-18): majandusaasta aruanne 01.01-31.12.2025 con tulemiaruanne (L137-163) (revisi
  perimetro          ok        "individual" — el .md no presenta estados consolidados (0 menciones de "consolidado")
  currency           ok        "EUR" — moneda de curso legal de Estonia (tabla PAISES de alta-club.mjs)
  fxRef              ok        "EUR@2025-12-31" — el documento no declara tipo de cambio; FX_CLOSE ya tiene EUR@2025-12-31 = 0.8511 (Cierre BCE al 31/12/2025 (1 EUR = 1,1750 USD))
  sourceId           ok        "paidelinnameeskond-ee-aruanne-2025" — clubId + nombre del archivo en slug
  liga               pendiente null — sin caché de rosters para ee (tools/club-league-reference/ee.json)

FISCAL YEAR META PROPUESTO para 2025 (NO registrado: un ejercicio con meta y
sin rubros se vería en el sitio como un año en cero, y "sin dato no es cero"):
  2025: {"reportType":"official_balance_sheet","currency":"EUR","fxRef":"EUR@2025-12-31","sourceId":"paidelinnameeskond-ee-aruanne-2025"}
```

## 2025

### Ingresos

```text
2025: cargado por tools/cargar.mjs (2026-10-18) desde Clubes/Estonia/Paide Linnameeskond/aruanne-2025.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Estonia/Paide Linnameeskond/aruanne-2025.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Liikmetelt saadud tasud | pág. 5, Jev 1 |
| 2 | Sihtfinantseerimine tegevuskuludeks | pág. 13, Jev 0.96 |
| 3 | Sihtfinantseerimine põhivarade soetamiseks | pág. 13, Jev 1 |
| 4 | Türi Spordikluubide Liit MTÜ | pág. 13, precedente |
| 5 | LHV | pág. 13, precedente |
| 6 | Spordikoolituse ja-teabe SA Spordikoolituse ja-teabe S | pág. 13, precedente |
| 7 | UEFA solidarsustoetus | pág. 13, precedente |
| 8 | Eesti Jalgpalliliidu toetused | pág. 13, precedente |
| 9 | KOV toetus | pág. 13, Jev 0.99 |
| 10 | FIFA RSTP | pág. 13, precedente |
| 11 | Väljaku äärde ja reklaamtahvlitele paigaldatud reklaam | pág. 14, Jev 1 |
| 12 | Tulud mängijaõiguste müügist | pág. 14, Jev 1 |
| 13 | Piletitulu | pág. 14, Jev 1 |
| 14 | Muud tulud | pág. 14, Jev 0.98 |
| 15 | Tulu ülekandeõiguste müügist | pág. 14, Jev 0.98 |
| 16 | Renditulu | pág. 14, Claude 0.8 |
| 17 | Muud tulud | pág. 5, Jev 0.98 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Sihtotstarbeliselt finantseeritud projektide otsesed kulud | pág. 5, precedente |
| 2 | Stipendiumid | pág. 14, precedente |
| 3 | Toetused | pág. 14, precedente |
| 4 | Lähetuskulud | pág. 14, Jev 0.99 |
| 5 | Koolituskulud | pág. 14, precedente |
| 6 | mängijate soetuskulud | pág. 14, precedente |
| 7 | Klubi administreerimiskulud | pág. 14, Jev 1 |
| 8 | Eesti meistrivõistluste osavõtutasu | pág. 14, Jev 1 |
| 9 | Klubile kuuluvate ja tema poolt renditud hoonete ja rajatistega seotud kulud | pág. 14, precedente |
| 10 | Kodumängu korralduskulud (v.a staadioni rent) | pág. 14, Jev 1 |
| 11 | Turundus-, sponsorlus- ja reklaamikulud | pág. 14, Jev 1 |
| 12 | Müüdud toodete ja muu varustuse maksumus | pág. 14, Jev 1 |
| 13 | Muud | pág. 14, Jev 0.99 |
| 14 | Mängijate palgakulud | pág. 15, Jev 0.92 |
| 15 | Sotsiaalmaks mängijate töötasudelt | pág. 15, Jev 0.98 |
| 16 | Muu personali palgakulu | pág. 15, precedente |
| 17 | Sotsiaalmaks muu personali töötasudelt | pág. 15, Jev 0.97 |
| 18 | Muud kulud | pág. 5, Jev 1 |

### Meta

```text
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-18): reportType = official_balance_sheet. majandusaasta aruanne 01.01-31.12.2025 con tulemiaruanne (L137-163) (revisión del alta, subagente Sonnet, revisado por Claude 2026-10-18)
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
2024: cargado por tools/cargar.mjs (2026-10-18) desde Clubes/Estonia/Paide Linnameeskond/aruanne-2024.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Estonia/Paide Linnameeskond/aruanne-2024.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Liikmetelt saadud tasud | pág. 6, precedente |
| 2 | Sihtfinantseerimine tegevuskuludeks | pág. 14, precedente |
| 3 | Sihtfinantseerimine põhivarade soetamiseks | pág. 14, precedente |
| 4 | Türi Spordikluubide Liit MTÜ | pág. 14, precedente |
| 5 | LHV | pág. 14, precedente |
| 6 | Spordikoolituse ja-teabe SA Spordikoolituse ja-teabe S | pág. 14, precedente |
| 7 | UEFA solidarsustoetus | pág. 14, precedente |
| 8 | Eesti Jalgpalliliidu toetused | pág. 14, precedente |
| 9 | KOV toetus | pág. 14, precedente |
| 10 | Väljaku äärde ja reklaamtahvlitele paigaldatud reklaam | pág. 15, precedente |
| 11 | Tulud mängijaõiguste müügist | pág. 15, precedente |
| 12 | Piletitulu | pág. 15, precedente |
| 13 | Muud tulud | pág. 15, precedente |
| 14 | Tulu ülekandeõiguste müügist | pág. 15, precedente |
| 15 | Muud tulud | pág. 6, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Sihtotstarbeliselt finantseeritud projektide otsesed kulud | pág. 6, precedente |
| 2 | Stipendiumid | pág. 15, precedente |
| 3 | Toetused | pág. 15, precedente |
| 4 | Lähetuskulud | pág. 15, precedente |
| 5 | Koolituskulud | pág. 15, precedente |
| 6 | mängijate soetuskulud | pág. 15, precedente |
| 7 | Klubi administreerimiskulud | pág. 15, precedente |
| 8 | Eesti meistrivõistluste osavõtutasu | pág. 15, precedente |
| 9 | Klubile kuuluvate ja tema poolt renditud hoonete ja rajatistega seotud kulud | pág. 15, precedente |
| 10 | Kodumängu korralduskulud (v.a staadioni rent) | pág. 15, precedente |
| 11 | Turundus-, sponsorlus- ja reklaamikulud | pág. 15, precedente |
| 12 | Müüdud toodete ja muu varustuse maksumus | pág. 15, precedente |
| 13 | Muud | pág. 15, precedente |
| 14 | Mängijate palgakulud | pág. 16, precedente |
| 15 | Sotsiaalmaks mängijate töötasudelt | pág. 16, precedente |
| 16 | Muu personali palgakulu | pág. 16, precedente |
| 17 | Sotsiaalmaks muu personali töötasudelt | pág. 16, precedente |
| 18 | Muud kulud | pág. 6, precedente |

### Meta

```text
2024: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-18): reportType = official_balance_sheet. majandusaasta aruanne anual con estado de resultados ("## Tulemiaruanne", .md L149) (Claude 2026-10-18)
tools/cargar.mjs (2026-10-18). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

```text
tools/caja-deuda.mjs (2026-10-18): grossDebt escalón 1 (compuerta: documento siguiente): "Laenukohustised" pág. 5; cash escalón 1 (compuerta: documento siguiente): "Raha" pág. 5
```

## 2023

### Ingresos

```text
2023: cargado por tools/cargar.mjs (2026-10-18) desde Clubes/Estonia/Paide Linnameeskond/aruanne-2023.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Estonia/Paide Linnameeskond/aruanne-2023.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Liikmetelt saadud tasud | pág. 6, precedente |
| 2 | Sihtfinantseerimine tegevuskuludeks | pág. 14, precedente |
| 3 | Mittesihtotsatarbelised annetused ja toetused | pág. 14, Jev 1 |
| 4 | Järvamaa Maavalitsus | pág. 14, Jev 0.97 |
| 5 | Paide Linnavalitsus | pág. 14, Jev 0.98 |
| 6 | Türi Spordikluubide Liit MTÜ | pág. 14, precedente |
| 7 | LHV | pág. 14, precedente |
| 8 | Spordikoolituse ja-teabe SA Spordikoolituse ja-teabe S | pág. 14, precedente |
| 9 | UEFA solidarsustoetus | pág. 14, precedente |
| 10 | Eesti Jalgpalliliidu arengutoetused | pág. 14, Jev 0.99 |
| 11 | Väljaku äärde ja reklaamtahvlitele paigaldatud reklaam | pág. 15, precedente |
| 12 | Tulud mängijaõiguste müügist | pág. 15, precedente |
| 13 | Piletitulu | pág. 15, precedente |
| 14 | Muud tulud | pág. 15, precedente |
| 15 | Tulu ülekandeõiguste müügist | pág. 15, precedente |
| 16 | Muud tulud | pág. 6, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Sihtotstarbeliselt finantseeritud projektide otsesed kulud | pág. 6, precedente |
| 2 | Stipendiumid | pág. 15, precedente |
| 3 | Toetused | pág. 15, precedente |
| 4 | Üür ja rent | pág. 15, Jev 0.98 |
| 5 | Mitmesugused bürookulud | pág. 15, Jev 0.93 |
| 6 | Lähetuskulud | pág. 15, precedente |
| 7 | Koolituskulud | pág. 15, precedente |
| 8 | Riiklikud ja kohalikud maksud | pág. 15, Jev 1 |
| 9 | mängude ja treeningute kulud | pág. 15, precedente |
| 10 | mängijate soetuskulud | pág. 15, precedente |
| 11 | Mängijate palgakulud | pág. 16, precedente |
| 12 | Sotsiaalmaks mängijate töötasudelt | pág. 16, precedente |
| 13 | Muu personali palgakulu | pág. 16, precedente |
| 14 | Sotsiaalmaks muu personali töötasudelt | pág. 16, precedente |
| 15 | Põhivarade kulum ja väärtuse langus | pág. 6, Jev 1 |
| 16 | Muud kulud | pág. 6, precedente |

### Meta

```text
2023: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-18): reportType = official_balance_sheet. majandusaasta aruanne anual con estado de resultados ("## Tulemiaruanne", .md L150) (Claude 2026-10-18)
tools/cargar.mjs (2026-10-18). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

```text
tools/caja-deuda.mjs (2026-10-18): cash escalón 1 (compuerta: documento siguiente): "Raha" pág. 5
```

## 2022

### Ingresos

```text
2022: cargado por tools/cargar.mjs (2026-10-18) desde Clubes/Estonia/Paide Linnameeskond/aruanne-2022.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Estonia/Paide Linnameeskond/aruanne-2022.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Liikmetelt saadud tasud | pág. 6, precedente |
| 2 | Sihtfinantseerimine tegevuskuludeks | pág. 14, precedente |
| 3 | Mittesihtotsatarbelised annetused ja toetused | pág. 14, Jev 1 |
| 4 | Järvamaa Maavalitsus | pág. 14, Jev 0.97 |
| 5 | Paide Linnavalitsus | pág. 14, Jev 0.98 |
| 6 | Türi Spordikluubide Liit MTÜ | pág. 14, precedente |
| 7 | LHV | pág. 14, precedente |
| 8 | Spordikoolituse ja-teabe SA Spordikoolituse ja-teabe S | pág. 14, precedente |
| 9 | Järvamaa Omavalitsuse Liit | pág. 14, Jev 0.99 |
| 10 | UEFA solidarsus | pág. 14, Claude 0.9 |
| 11 | Väljaku äärde ja reklaamtahvlitele paigaldatud reklaam | pág. 15, precedente |
| 12 | Tulud mängijaõiguste müügist | pág. 15, precedente |
| 13 | Klubi sümboolikaga toodete müügitulu | pág. 15, Jev 1 |
| 14 | Piletitulu | pág. 15, precedente |
| 15 | Muud tulud | pág. 15, precedente |
| 16 | Tulu ülekandeõiguste müügist | pág. 15, precedente |
| 17 | Muud tulud | pág. 6, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Sihtotstarbeliselt finantseeritud projektide otsesed kulud | pág. 6, precedente |
| 2 | Stipendiumid | pág. 15, precedente |
| 3 | Toetused | pág. 15, precedente |
| 4 | Üür ja rent | pág. 15, Jev 0.98 |
| 5 | Mitmesugused bürookulud | pág. 15, Jev 0.93 |
| 6 | Lähetuskulud | pág. 15, precedente |
| 7 | Koolituskulud | pág. 15, precedente |
| 8 | Riiklikud ja kohalikud maksud | pág. 15, Jev 1 |
| 9 | mängude ja treeningute kulud | pág. 15, precedente |
| 10 | Muud | pág. 15, precedente |
| 11 | Mängijate palgakulud | pág. 16, precedente |
| 12 | Sotsiaalmaks mängijate töötasudelt | pág. 16, precedente |
| 13 | Muu personali palgakulu | pág. 16, precedente |
| 14 | Sotsiaalmaks muu personali töötasudelt | pág. 16, precedente |
| 15 | Põhivarade kulum ja väärtuse langus | pág. 6, Jev 1 |
| 16 | Muud kulud | pág. 6, precedente |

### Meta

```text
2022: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-18): reportType = official_balance_sheet. majandusaasta aruanne anual con estado de resultados ("## Tulemiaruanne", .md L153) (Claude 2026-10-18)
tools/cargar.mjs (2026-10-18). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

```text
tools/caja-deuda.mjs (2026-10-18): cash escalón 1 (compuerta: documento siguiente): "Raha" pág. 5
```

## 2021

### Ingresos

```text
2021: cargado por tools/cargar.mjs (2026-10-18) desde Clubes/Estonia/Paide Linnameeskond/aruanne-2021.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Estonia/Paide Linnameeskond/aruanne-2021.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Liikmetelt saadud tasud | pág. 5, precedente |
| 2 | Sihtfinantseerimine tegevuskuludeks | pág. 12, precedente |
| 3 | Mittesihtotsatarbelised annetused ja toetused | pág. 12, Jev 1 |
| 4 | Järvamaa Maavalitsus | pág. 12, Jev 0.97 |
| 5 | Paide Linnavalitsus | pág. 12, Jev 0.98 |
| 6 | Türi Spordikluubide Liit MTÜ | pág. 12, precedente |
| 7 | LHV | pág. 12, precedente |
| 8 | Spordikoolituse ja-teabe SA Spordikoolituse ja-teabe S | pág. 12, precedente |
| 9 | Järvamaa Omavalitsuse Liit | pág. 12, Jev 0.99 |
| 10 | UEFA solidarsus | pág. 12, Claude 0.9 |
| 11 | Väljaku äärde ja reklaamtahvlitele paigaldatud reklaam | pág. 13, precedente |
| 12 | Tulud mängijaõiguste müügist | pág. 13, precedente |
| 13 | Klubi sümboolikaga toodete müügitulu | pág. 13, Jev 1 |
| 14 | Piletitulu | pág. 13, precedente |
| 15 | Muud tulud | pág. 13, precedente |
| 16 | Muud tulud | pág. 5, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Sihtotstarbeliselt finantseeritud projektide otsesed kulud | pág. 5, precedente |
| 2 | Stipendiumid | pág. 13, precedente |
| 3 | toetused | pág. 13, precedente |
| 4 | Üür ja rent | pág. 13, Jev 0.98 |
| 5 | Mitmesugused bürookulud | pág. 13, Jev 0.93 |
| 6 | Lähetuskulud | pág. 13, precedente |
| 7 | Koolituskulud | pág. 13, precedente |
| 8 | Riiklikud ja kohalikud maksud | pág. 13, Jev 1 |
| 9 | Kulu ebatõenäoliselt laekuvatest nõuetest | pág. 13, Jev 0.98 |
| 10 | mängude ja treeningute kulud | pág. 13, precedente |
| 11 | Palgakulu | pág. 13, precedente |
| 12 | Sotsiaalmaksud | pág. 13, precedente |
| 13 | Põhivarade kulum ja väärtuse langus | pág. 5, Jev 1 |
| 14 | Muud kulud | pág. 5, precedente |

### Meta

```text
2021: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-18): reportType = official_balance_sheet. majandusaasta aruanne anual con estado de resultados ("## Tulemiaruanne", .md L134) (Claude 2026-10-18)
2021: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-18): cero-real = Televisión. sin ninguna fila de ese rubro en el estado ni en las notas; mismo caso que el 2025 del club (Claude 2026-10-18)
tools/cargar.mjs (2026-10-18). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

```text
tools/caja-deuda.mjs (2026-10-18): cash escalón 1 (compuerta: documento siguiente): "Raha" pág. 4
```

## 2020

### Ingresos

```text
2020: cargado por tools/cargar.mjs (2026-10-18) desde Clubes/Estonia/Paide Linnameeskond/aruanne-2020.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Estonia/Paide Linnameeskond/aruanne-2020.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Liikmetelt saadud tasud | pág. 5, precedente |
| 2 | Sihtfinantseerimine tegevuskuludeks | pág. 12, precedente |
| 3 | Mittesihtotsatarbelised annetused ja toetused | pág. 12, Jev 1 |
| 4 | Järvamaa Maavalitsus | pág. 12, Jev 0.97 |
| 5 | Paide Linnavalitsus | pág. 12, Jev 0.98 |
| 6 | Türi Spordikluubide Liit MTÜ | pág. 12, precedente |
| 7 | LHV | pág. 12, precedente |
| 8 | Spordikoolituse ja-teabe SA Spordikoolituse ja-teabe S | pág. 12, precedente |
| 9 | Türi Vallavalitsus | pág. 12, Jev 1 |
| 10 | Järvamaa Omavalitsuse Liit | pág. 12, Jev 0.99 |
| 11 | UEFA solidarsus | pág. 12, Claude 0.9 |
| 12 | Väljaku äärde ja reklaamtahvlitele paigaldatud reklaam | pág. 13, precedente |
| 13 | Tulud mängijaõiguste müügist | pág. 13, precedente |
| 14 | Klubi sümboolikaga toodete müügitulu | pág. 13, Jev 1 |
| 15 | Muud tulud | pág. 5, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Sihtotstarbeliselt finantseeritud projektide otsesed kulud | pág. 5, precedente |
| 2 | Stipendiumid | pág. 13, precedente |
| 3 | toetused | pág. 13, precedente |
| 4 | Üür ja rent | pág. 13, Jev 0.98 |
| 5 | Mitmesugused bürookulud | pág. 13, Jev 0.93 |
| 6 | Lähetuskulud | pág. 13, precedente |
| 7 | Koolituskulud | pág. 13, precedente |
| 8 | Riiklikud ja kohalikud maksud | pág. 13, Jev 1 |
| 9 | mängude ja treeningute kulud | pág. 13, precedente |
| 10 | Palgakulu | pág. 13, precedente |
| 11 | Sotsiaalmaksud | pág. 13, precedente |
| 12 | Põhivarade kulum ja väärtuse langus | pág. 5, Jev 1 |
| 13 | Muud kulud | pág. 5, precedente |

### Meta

```text
2020: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-18): reportType = official_balance_sheet. majandusaasta aruanne anual con estado de resultados ("## Tulemiaruanne", .md L135) (Claude 2026-10-18)
2020: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-18): cero-real = Televisión. sin ninguna fila de ese rubro en el estado ni en las notas; mismo caso que el 2025 del club (Claude 2026-10-18)
2020: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-18): cero-real = Estadio. sin ninguna fila de ese rubro en el estado ni en las notas; mismo caso que el 2025 del club (Claude 2026-10-18)
tools/cargar.mjs (2026-10-18). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

```text
tools/caja-deuda.mjs (2026-10-18): cash escalón 1 (compuerta: documento siguiente): "Raha" pág. 4
```

## 2019

### Ingresos

```text
2019: cargado por tools/cargar.mjs (2026-10-18) desde Clubes/Estonia/Paide Linnameeskond/aruanne-2019.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Estonia/Paide Linnameeskond/aruanne-2019.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Liikmetelt saadud tasud | pág. 6, precedente |
| 2 | Sihtfinantseerimine tegevuskuludeks | pág. 13, precedente |
| 3 | Järvamaa Maavalitsus | pág. 13, Jev 0.97 |
| 4 | Tapa Vallavalitsus | pág. 13, Jev 1 |
| 5 | Paide Linnavalitsus | pág. 13, Jev 0.98 |
| 6 | Türi Spordikluubide Liit MTÜ | pág. 13, precedente |
| 7 | LHV | pág. 13, precedente |
| 8 | Spordikoolituse ja-teabe SA Spordikoolituse ja-teabe S | pág. 13, precedente |
| 9 | Türi Vallavalitsus | pág. 13, Jev 1 |
| 10 | Järvamaa Omavalitsuse Liit | pág. 13, Jev 0.99 |
| 11 | UEFA solidarsus | pág. 13, Claude 0.9 |
| 12 | UEFA solidarsus | pág. 13, Claude 0.9 |
| 13 | Väljaku äärde ja reklaamtahvlitele paigaldatud reklaam | pág. 14, precedente |
| 14 | Tulud mängijaõiguste müügist | pág. 14, precedente |
| 15 | Muud tulud | pág. 6, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Sihtotstarbeliselt finantseeritud projektide otsesed kulud | pág. 6, precedente |
| 2 | Jagatud annetused ja toetused | pág. 6, Jev 0.98 |
| 3 | Üür ja rent | pág. 14, Jev 0.98 |
| 4 | Mitmesugused bürookulud | pág. 14, Jev 0.93 |
| 5 | Lähetuskulud | pág. 14, precedente |
| 6 | Koolituskulud | pág. 14, precedente |
| 7 | Riiklikud ja kohalikud maksud | pág. 14, Jev 1 |
| 8 | Kulu ebatõenäoliselt laekuvatest nõuetest | pág. 14, Jev 0.98 |
| 9 | mängude ja treeningute kulud | pág. 14, precedente |
| 10 | Palgakulu | pág. 14, precedente |
| 11 | Sotsiaalmaksud | pág. 14, precedente |
| 12 | Põhivarade kulum ja väärtuse langus | pág. 6, Jev 1 |
| 13 | Muud kulud | pág. 6, precedente |

### Meta

```text
2019: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-18): reportType = official_balance_sheet. majandusaasta aruanne anual con estado de resultados ("## Tulemiaruanne", .md L159) (Claude 2026-10-18)
2019: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-18): cero-real = Televisión. sin ninguna fila de ese rubro en el estado ni en las notas; mismo caso que el 2025 del club (Claude 2026-10-18)
2019: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-18): cero-real = Estadio. sin ninguna fila de ese rubro en el estado ni en las notas; mismo caso que el 2025 del club (Claude 2026-10-18)
tools/cargar.mjs (2026-10-18). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

```text
tools/caja-deuda.mjs (2026-10-18): cash escalón 1 (compuerta: documento siguiente): "Raha" pág. 5
```

## Fuentes

### paidelinnameeskond-ee-aruanne-2025

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-18) desde la transcripción Clubes/Estonia/Paide Linnameeskond/aruanne-2025.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### paidelinnameeskond-ee-aruanne-2019

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-18) desde la transcripción Clubes/Estonia/Paide Linnameeskond/aruanne-2019.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### paidelinnameeskond-ee-aruanne-2020

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-18) desde la transcripción Clubes/Estonia/Paide Linnameeskond/aruanne-2020.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### paidelinnameeskond-ee-aruanne-2021

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-18) desde la transcripción Clubes/Estonia/Paide Linnameeskond/aruanne-2021.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### paidelinnameeskond-ee-aruanne-2022

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-18) desde la transcripción Clubes/Estonia/Paide Linnameeskond/aruanne-2022.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### paidelinnameeskond-ee-aruanne-2023

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-18) desde la transcripción Clubes/Estonia/Paide Linnameeskond/aruanne-2023.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### paidelinnameeskond-ee-aruanne-2024

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-18) desde la transcripción Clubes/Estonia/Paide Linnameeskond/aruanne-2024.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```
