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

### Liga

```text
alta-club.mjs (2026-10-18): null, SIN VERIFICAR (sin caché de rosters para ee (tools/club-league-reference/ee.json)).
```

## Fuentes

### paidelinnameeskond-ee-aruanne-2025

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-18) desde la transcripción Clubes/Estonia/Paide Linnameeskond/aruanne-2025.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```
