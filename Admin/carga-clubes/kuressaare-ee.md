# kuressaare-ee — evidencia de carga

Lo que antes iba como comentario en el data file del club, `data/<país>/kuressaare-ee-data.js` (la regla: `Admin/CONVENCIONES-DATOS.md`, "data/<país>/<club>-data.js NO LLEVA
COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y meta. Las notas de cada fila van en una tabla con su número de
fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
Kuressaare: alta por tools/alta-club.mjs (2026-10-18) desde Clubes/Estonia/Kuressaare/aruanne-2025.pdf. brandColor #F7D64E
(procedencia en Admin/sourcing/Estonia/Kuressaare.md; tools/cargar-lote.mjs).
```

```text
data/ee/kuressaare-ee-data.js — Jalgpalliklubi FC Kuressaare (Estonia).
ALTA POR SCRIPT (tools/alta-club.mjs, 2026-10-18), SIN EJERCICIOS CARGADOS TODAVÍA: las estructuras del data file
nacen vacías a propósito. Los rubros, los totales oficiales y el resto del fiscalYearMeta los agrega la etapa de carga.

Documento que originó el alta: Clubes/Estonia/Kuressaare/aruanne-2025.pdf

De dónde salió cada campo (estado según alta-club.mjs: ok / pendiente):
  id                 ok        "kuressaare-ee" — slug de "Kuressaare" + '-ee' (convención de clubId, Admin/CONVENCIONES.md Versión 129)
  name               ok        "Jalgpalliklubi FC Kuressaare" — ajuste manual (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-18): portada L8, registrikood 80052525 (L10); 'emaklubi MTÜ Jalgpalliklubi FC Ku
  displayName        ok        "Kuressaare" — nombre de la carpeta del club en Clubes/
  country            ok        "EE" — carpeta de país "Estonia" (tabla PAISES)
  reportingCurrency  ok        "EUR" — moneda de curso legal de Estonia
  fiscalYearStart    ok        "01-01" — cierre del ejercicio: contenido del .md (49 de 55 fechas de fin de mes caen en el mes 12)
  sport              ok        "futbol" — el .md nombra el fútbol 0 veces y ningún otro deporte más que eso
  brandColor         pendiente (ausente) — la liga del club no está en tools/brand-color-reference/ (o el club no está en footylogos)
  anio               ok        2025 — nombre del archivo (misma regla que onboard.mjs --quien), confirmado por las fechas de cierre del .md
  cierre             ok        "2025-12-31" — año del ejercicio + mes de cierre (contenido del .md (49 de 55 fechas de fin de mes caen en el mes 12))
  reportType         ok        "official_balance_sheet" — ajuste manual (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-18): majandusaasta aruanne 01.01-31.12.2025 con tulemiaruanne (L175-202) (revisi
  perimetro          ok        "consolidado" — ajuste manual (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-18): 2025 trae los dos (tulemiaruanne consolidado L175-202 y Lisa 18 konsolideer
  currency           ok        "EUR" — moneda de curso legal de Estonia (tabla PAISES de alta-club.mjs)
  fxRef              ok        "EUR@2025-12-31" — el documento no declara tipo de cambio; FX_CLOSE ya tiene EUR@2025-12-31 = 0.8511 (Cierre BCE al 31/12/2025 (1 EUR = 1,1750 USD))
  sourceId           ok        "kuressaare-ee-aruanne-2025" — clubId + nombre del archivo en slug
  liga               pendiente null — sin caché de rosters para ee (tools/club-league-reference/ee.json)

FISCAL YEAR META PROPUESTO para 2025 (NO registrado: un ejercicio con meta y
sin rubros se vería en el sitio como un año en cero, y "sin dato no es cero"):
  2025: {"reportType":"official_balance_sheet","currency":"EUR","fxRef":"EUR@2025-12-31","sourceId":"kuressaare-ee-aruanne-2025"}
```

## 2025

### Ingresos

```text
2025: cargado por tools/cargar.mjs (2026-10-18) desde Clubes/Estonia/Kuressaare/aruanne-2025.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Estonia/Kuressaare/aruanne-2025.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Liikmetelt saadud tasud | pág. 6, Jev 1 |
| 2 | UEFA solidaarsustoetus | pág. 16, precedente |
| 3 | EJL toetused | pág. 16, precedente |
| 4 | Riigi ja/või kohaliku omavalitsuse toetused | pág. 16, Jev 1 |
| 5 | Muud toetused | pág. 16, Jev 0.99 |
| 6 | Sponsorlus- ja reklaamitulu | pág. 16, Jev 1 |
| 7 | Piletitulu | pág. 16, Jev 1 |
| 8 | Klubi sümboolikaga toodete müügitulu | pág. 16, Jev 1 |
| 9 | Muu tulu ettevõtlusest | pág. 16, precedente |
| 10 | Muud tulud | pág. 6, Jev 0.98 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Mängijatele makstav sportlasetoetus | pág. 16, precedente |
| 2 | Mängijatele makstav sportlasestipendium | pág. 16, precedente |
| 3 | Muud annetused | pág. 16, Jev 0.98 |
| 4 | Üür ja rent | pág. 17, Jev 0.98 |
| 5 | Mitmesugused bürookulud | pág. 17, Jev 1 |
| 6 | Koolituskulud | pág. 17, precedente |
| 7 | Riiklikud ja kohalikud maksud | pág. 17, Jev 0.99 |
| 8 | Kodumängu korralduskulud | pág. 17, Jev 1 |
| 9 | Eesti meistrivõistluste osavõtutasu | pág. 17, Jev 0.97 |
| 10 | Võistkondade välissõitude- ja lähetuskulud | pág. 17, Jev 1 |
| 11 | Turundus-, sponsorlus- ja reklaamikulud | pág. 17, Jev 1 |
| 12 | Müüdud toodete ja muu varustuse maksumus | pág. 17, precedente |
| 13 | Klubile kuuluvate ja tema poolt renditud hoonete ja rajatistega seotud kulud | pág. 17, precedente |
| 14 | Mängijaõiguste ost | pág. 17, Claude 0.85 |
| 15 | Liikmemaksud | pág. 17, precedente |
| 16 | Muud | pág. 17, Jev 0.97 |
| 17 | EJL litsentsiga töötajate (v.a. mängijad) palgakulu | pág. 17, precedente |
| 18 | EJL litsentsiga töötajate (v.a. mängijad) maksud | pág. 17, precedente |
| 19 | Mängijate palgakulu | pág. 17, Jev 0.9 |
| 20 | Sotsiaalmaks mängijate töötasudelt | pág. 17, Jev 1 |
| 21 | Põhivarade kulum ja väärtuse langus | pág. 6, Jev 1 |
| 22 | Muud kulud | pág. 6, Claude 0.85 |

### Meta

```text
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-18): reportType = official_balance_sheet. majandusaasta aruanne 01.01-31.12.2025 con tulemiaruanne (L175-202) (revisión del alta, subagente Sonnet, revisado por Claude 2026-10-18)
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-18): cero-real = Televisión. Lisa 11 L577-583 sin fila de TV (subagente Sonnet, revisado por Claude 2026-10-18)
tools/cargar.mjs (2026-10-18). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
alta-club.mjs (2026-10-18): null, SIN VERIFICAR (sin caché de rosters para ee (tools/club-league-reference/ee.json)).
```

## 2020

### Ingresos

```text
2020: cargado por tools/cargar.mjs (2026-10-18) desde Clubes/Estonia/Kuressaare/aruanne-2020.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Estonia/Kuressaare/aruanne-2020.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Liikmetelt saadud tasud | pág. 5, precedente |
| 2 | UEFA solidaarsustoetus | pág. 11, precedente |
| 3 | EJL toetused | pág. 11, precedente |
| 4 | Riigi ja/või kohaliku omavalitsuse toetused | pág. 11, precedente |
| 5 | Muud toetused | pág. 11, precedente |
| 6 | Reklaam | pág. 12, Jev 1 |
| 7 | Muud tulud | pág. 12, Jev 0.99 |
| 8 | Muud tulud | pág. 5, Jev 0.99 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Üür ja rent | pág. 12, precedente |
| 2 | Energia | pág. 12, Jev 0.99 |
| 3 | Mitmesugused bürookulud | pág. 12, precedente |
| 4 | Koolituskulud | pág. 12, precedente |
| 5 | Riiklikud ja kohalikud maksud | pág. 12, precedente |
| 6 | Võistluste ja treeningutega seotud kulud | pág. 12, Jev 0.98 |
| 7 | Liikmemaksud | pág. 12, precedente |
| 8 | Mängijatele makstav sportlasetoetus | pág. 12, Jev 1 |
| 9 | Mängijatele makstav sportlasestipendium | pág. 12, Jev 0.97 |
| 10 | Muud | pág. 12, precedente |
| 11 | EJL litsentsiga töötajate (v.a. mängijad) palgakulu | pág. 12, precedente |
| 12 | EJL litsentsiga töötajate (v.a. mängijad) maksud | pág. 12, precedente |
| 13 | Mängijate palgakulu | pág. 12, precedente |
| 14 | Sotsiaalmaks mängijate töötasudelt | pág. 12, precedente |
| 15 | Põhivarade kulum ja väärtuse langus | pág. 5, precedente |
| 16 | Muud kulud | pág. 5, precedente |

### Meta

```text
2020: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-18): reportType = official_balance_sheet. majandusaasta aruanne anual con estado de resultados ("## Tulemiaruanne", .md L111) (Claude 2026-10-18)
2020: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-18): cero-real = Televisión. sin ninguna fila de ese rubro en el estado ni en las notas; mismo caso que el 2025 del club (Claude 2026-10-18)
2020: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-18): cero-real = Estadio. sin ninguna fila de ese rubro en el estado ni en las notas; mismo caso que el 2025 del club (Claude 2026-10-18)
tools/cargar.mjs (2026-10-18). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

## 2019

### Ingresos

```text
2019: cargado por tools/cargar.mjs (2026-10-18) desde Clubes/Estonia/Kuressaare/aruanne-2019.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Estonia/Kuressaare/aruanne-2019.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Liikmetelt saadud tasud | pág. 5, precedente |
| 2 | UEFA solidaarsustoetus | pág. 11, precedente |
| 3 | EJL toetused | pág. 11, precedente |
| 4 | Riigi ja/või kohaliku omavalitsuse toetused | pág. 11, precedente |
| 5 | Muud toetused | pág. 11, precedente |
| 6 | Muud tulud | pág. 11, Jev 0.99 |
| 7 | Reklaam | pág. 11, Jev 1 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Üür ja rent | pág. 12, precedente |
| 2 | Energia | pág. 12, Jev 0.99 |
| 3 | Veevarustusteenused | pág. 12, Jev 1 |
| 4 | Mitmesugused bürookulud | pág. 12, precedente |
| 5 | Koolituskulud | pág. 12, precedente |
| 6 | Riiklikud ja kohalikud maksud | pág. 12, precedente |
| 7 | Võistluste ja treeningutega seotud kulud | pág. 12, Jev 0.98 |
| 8 | Muud | pág. 12, precedente |
| 9 | EJL litsentsiga töötajate (v.a. mängijad) palgakulu | pág. 12, precedente |
| 10 | EJL litsentsiga töötajate (v.a. mängijad) maksud | pág. 12, precedente |
| 11 | Mängijate palgakulu | pág. 12, precedente |
| 12 | Sotsiaalmaks mängijate töötasudelt | pág. 12, precedente |
| 13 | Põhivarade kulum ja väärtuse langus | pág. 5, precedente |
| 14 | Muud kulud | pág. 5, precedente |

### Meta

```text
2019: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-18): reportType = official_balance_sheet. majandusaasta aruanne anual con estado de resultados ("## Tulemiaruanne", .md L107) (Claude 2026-10-18)
2019: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-18): cero-real = Televisión. sin ninguna fila de ese rubro en el estado ni en las notas; mismo caso que el 2025 del club (Claude 2026-10-18)
2019: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-18): cero-real = Estadio. sin ninguna fila de ese rubro en el estado ni en las notas; mismo caso que el 2025 del club (Claude 2026-10-18)
tools/cargar.mjs (2026-10-18). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

## Fuentes

### kuressaare-ee-aruanne-2025

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-18) desde la transcripción Clubes/Estonia/Kuressaare/aruanne-2025.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.
```

### kuressaare-ee-aruanne-2019

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-18) desde la transcripción Clubes/Estonia/Kuressaare/aruanne-2019.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.
```

### kuressaare-ee-aruanne-2020

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-18) desde la transcripción Clubes/Estonia/Kuressaare/aruanne-2020.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.
```
