# harjujklaagri-ee — evidencia de carga

Lo que antes iba como comentario en el data file del club, `data/<país>/harjujklaagri-ee-data.js` (la regla: `Admin/CONVENCIONES-DATOS.md`, "data/<país>/<club>-data.js NO LLEVA
COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y meta. Las notas de cada fila van en una tabla con su número de
fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
Harju JK Laagri: alta por tools/alta-club.mjs (2026-10-18) desde Clubes/Estonia/Harju JK Laagri/aruanne-2025.pdf. brandColor #EF0000
(procedencia en Admin/sourcing/Estonia/Harju JK Laagri.md; tools/cargar-lote.mjs).
```

```text
data/ee/harjujklaagri-ee-data.js — MTÜ Harju Jalgpalliklubi Laagri (Estonia).
ALTA POR SCRIPT (tools/alta-club.mjs, 2026-10-18), SIN EJERCICIOS CARGADOS TODAVÍA: las estructuras del data file
nacen vacías a propósito. Los rubros, los totales oficiales y el resto del fiscalYearMeta los agrega la etapa de carga.

Documento que originó el alta: Clubes/Estonia/Harju JK Laagri/aruanne-2025.pdf

De dónde salió cada campo (estado según alta-club.mjs: ok / pendiente):
  id                 ok        "harjujklaagri-ee" — slug de "Harju JK Laagri" + '-ee' (convención de clubId, Admin/CONVENCIONES.md Versión 129)
  name               ok        "MTÜ Harju Jalgpalliklubi Laagri" — ajuste manual (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-18): portada L8 'nimi: MTÜ Harju Jalgpalliklubi Laagri', registrikood 80620596 (
  displayName        ok        "Harju JK Laagri" — nombre de la carpeta del club en Clubes/
  country            ok        "EE" — carpeta de país "Estonia" (tabla PAISES)
  reportingCurrency  ok        "EUR" — moneda de curso legal de Estonia
  fiscalYearStart    ok        "01-01" — cierre del ejercicio: contenido del .md (22 de 24 fechas de fin de mes caen en el mes 12)
  sport              ok        "futbol" — el .md nombra el fútbol 0 veces y ningún otro deporte más que eso
  brandColor         pendiente (ausente) — la liga del club no está en tools/brand-color-reference/ (o el club no está en footylogos)
  anio               ok        2025 — nombre del archivo (misma regla que onboard.mjs --quien), confirmado por las fechas de cierre del .md
  cierre             ok        "2025-12-31" — año del ejercicio + mes de cierre (contenido del .md (22 de 24 fechas de fin de mes caen en el mes 12))
  reportType         ok        "official_balance_sheet" — ajuste manual (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-18): majandusaasta aruanne 01.01-31.12.2025 con tulemiaruanne (L94-119) (revisió
  perimetro          ok        "individual" — ajuste manual (Admin/registros/ajustes-manuales.jsonl, perimetro-senales 2026-10-18): perimetro-senales.mjs: 0 documento(s) con los dos estados votan 
  currency           ok        "EUR" — moneda de curso legal de Estonia (tabla PAISES de alta-club.mjs)
  fxRef              ok        "EUR@2025-12-31" — el documento no declara tipo de cambio; FX_CLOSE ya tiene EUR@2025-12-31 = 0.8511 (Cierre BCE al 31/12/2025 (1 EUR = 1,1750 USD))
  sourceId           ok        "harjujklaagri-ee-aruanne-2025" — clubId + nombre del archivo en slug
  liga               pendiente null — sin caché de rosters para ee (tools/club-league-reference/ee.json)

FISCAL YEAR META PROPUESTO para 2025 (NO registrado: un ejercicio con meta y
sin rubros se vería en el sitio como un año en cero, y "sin dato no es cero"):
  2025: {"reportType":"official_balance_sheet","currency":"EUR","fxRef":"EUR@2025-12-31","sourceId":"harjujklaagri-ee-aruanne-2025"}
```

## 2025

### Ingresos

```text
2025: cargado por tools/cargar.mjs (2026-10-18) desde Clubes/Estonia/Harju JK Laagri/aruanne-2025.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Estonia/Harju JK Laagri/aruanne-2025.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Mittesihtotsatarbelised annetused ja toetused | pág. 10, Jev 1 |
| 2 | Sihtotstarbelised annetused ja toetused-Riigi ja KOV toetused | pág. 10, Jev 0.99 |
| 3 | Sihtotstarvelised annetused ja toetused-EJL | pág. 10, Jev 0.99 |
| 4 | Reklaamitulu | pág. 10, Jev 1 |
| 5 | Teenuste müük | pág. 10, ? 0.75 |
| 6 | Mängijaõiguste müük | pág. 10, Jev 1 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Mängijatele makstav sportlasestipendium | pág. 11, precedente |
| 2 | Mängijatele makstav sportlasetoetus | pág. 11, precedente |
| 3 | Üür ja rent | pág. 11, Jev 0.97 |
| 4 | Mitmesugused bürookulud | pág. 11, Claude 0.85 |
| 5 | Lähetuskulud | pág. 11, Jev 0.99 |
| 6 | Muud tehnilisele personalile tehtud väljamaksed | pág. 11, precedente |
| 7 | Konsultatsioonid, koolitused | pág. 11, precedente |
| 8 | Ruumide kommunaalkulud | pág. 11, Jev 0.99 |
| 9 | Reklaamikulud | pág. 11, Jev 1 |
| 10 | Eesti meistrivõistluste osavõtutasud | pág. 11, Jev 0.98 |
| 11 | Transpordikulud | pág. 11, precedente |
| 12 | Mängijate üleminekukulud | pág. 11, precedente |
| 13 | Varustus, mänguvormid | pág. 11, precedente |
| 14 | Meditsiinitarvikud,-teenused | pág. 11, precedente |
| 15 | Turvateenuste kulud | pág. 11, Jev 0.92 |
| 16 | Muud | pág. 11, Jev 0.99 |
| 17 | Palgakulu | pág. 11, precedente |
| 18 | Sotsiaalmaksud | pág. 11, precedente |
| 19 | Muud kulud | pág. 5, Jev 1 |

### Meta

```text
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-18): reportType = official_balance_sheet. majandusaasta aruanne 01.01-31.12.2025 con tulemiaruanne (L94-119) (revisión del alta, subagente Sonnet, revisado por Claude 2026-10-18)
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-18): cero-real = Televisión. Lisa 6 L311-314 sin fila de TV (subagente Sonnet, revisado por Claude 2026-10-18)
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-18): cero-real = Estadio. Lisa 6 L311-314 sin alquiler de estadio (subagente Sonnet, revisado por Claude 2026-10-18)
tools/cargar.mjs (2026-10-18). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
alta-club.mjs (2026-10-18): null, SIN VERIFICAR (sin caché de rosters para ee (tools/club-league-reference/ee.json)).
```

## 2024

### Ingresos

```text
2024: cargado por tools/cargar.mjs (2026-10-18) desde Clubes/Estonia/Harju JK Laagri/aruanne-2024.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Estonia/Harju JK Laagri/aruanne-2024.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Annetused ja toetused | pág. 5, Jev 1 |
| 2 | Tulu ettevõtlusest | pág. 5, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Mitmesugused tegevuskulud | pág. 5, precedente |
| 2 | Muud kulud | pág. 5, precedente |

### Meta

```text
2024: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-18): reportType = official_balance_sheet. majandusaasta aruanne anual con estado de resultados ("## Tulemiaruanne", .md L87) (Claude 2026-10-18)
2024: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-18): cero-real = Televisión. sin ninguna fila de ese rubro en el estado ni en las notas; mismo caso que el 2025 del club (Claude 2026-10-18)
2024: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-18): cero-real = Estadio. sin ninguna fila de ese rubro en el estado ni en las notas; mismo caso que el 2025 del club (Claude 2026-10-18)
tools/cargar.mjs (2026-10-18). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee.
```

## 2023

### Ingresos

```text
2023: cargado por tools/cargar.mjs (2026-10-18) desde Clubes/Estonia/Harju JK Laagri/aruanne-2023.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Estonia/Harju JK Laagri/aruanne-2023.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Tulu ettevõtlusest | pág. 5, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Mitmesugused tegevuskulud | pág. 5, precedente |

### Meta

```text
2023: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-18): cierre = 2023-12-31. del .md L8: "| aruandeaasta lõpp: | 31.12.2023 |" (Claude 2026-10-18)
2023: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-18): reportType = official_balance_sheet. majandusaasta aruanne anual con estado de resultados ("### Tulemiaruanne", .md L84) (Claude 2026-10-18)
2023: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-18): cero-real = Televisión. sin ninguna fila de ese rubro en el estado ni en las notas; mismo caso que el 2025 del club (Claude 2026-10-18)
2023: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-18): cero-real = Estadio. sin ninguna fila de ese rubro en el estado ni en las notas; mismo caso que el 2025 del club (Claude 2026-10-18)
tools/cargar.mjs (2026-10-18). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee.
```

## Fuentes

### harjujklaagri-ee-aruanne-2025

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-18) desde la transcripción Clubes/Estonia/Harju JK Laagri/aruanne-2025.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### harjujklaagri-ee-aruanne-2023

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-18) desde la transcripción Clubes/Estonia/Harju JK Laagri/aruanne-2023.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### harjujklaagri-ee-aruanne-2024

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-18) desde la transcripción Clubes/Estonia/Harju JK Laagri/aruanne-2024.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```
