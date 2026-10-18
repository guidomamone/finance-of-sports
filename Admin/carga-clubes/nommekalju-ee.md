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

### Liga

```text
alta-club.mjs (2026-10-18): null, SIN VERIFICAR (sin caché de rosters para ee (tools/club-league-reference/ee.json)).
```

## Fuentes

### nommekalju-ee-aruanne-2025

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-18) desde la transcripción Clubes/Estonia/Nõmme Kalju/aruanne-2025.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```
