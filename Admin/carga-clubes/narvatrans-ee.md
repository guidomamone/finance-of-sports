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

### Liga

```text
alta-club.mjs (2026-10-18): null, SIN VERIFICAR (sin caché de rosters para ee (tools/club-league-reference/ee.json)).
```

## Fuentes

### narvatrans-ee-aruanne-2025

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-18) desde la transcripción Clubes/Estonia/Narva Trans/aruanne-2025.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```
