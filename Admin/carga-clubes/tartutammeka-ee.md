# tartutammeka-ee — evidencia de carga

Lo que antes iba como comentario en el data file del club, `data/<país>/tartutammeka-ee-data.js` (la regla: `Admin/CONVENCIONES-DATOS.md`, "data/<país>/<club>-data.js NO LLEVA
COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y meta. Las notas de cada fila van en una tabla con su número de
fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
Tartu Tammeka: alta por tools/alta-club.mjs (2026-10-18) desde Clubes/Estonia/Tartu Tammeka/aruanne-2025.pdf. brandColor #002FE0
(procedencia en Admin/sourcing/Estonia/Tartu Tammeka.md; tools/cargar-lote.mjs).
```

```text
data/ee/tartutammeka-ee-data.js — Mittetulundusühing Jalgpallikool Tammeka (Estonia).
ALTA POR SCRIPT (tools/alta-club.mjs, 2026-10-18), SIN EJERCICIOS CARGADOS TODAVÍA: las estructuras del data file
nacen vacías a propósito. Los rubros, los totales oficiales y el resto del fiscalYearMeta los agrega la etapa de carga.

Documento que originó el alta: Clubes/Estonia/Tartu Tammeka/aruanne-2025.pdf

De dónde salió cada campo (estado según alta-club.mjs: ok / pendiente):
  id                 ok        "tartutammeka-ee" — slug de "Tartu Tammeka" + '-ee' (convención de clubId, Admin/CONVENCIONES.md Versión 129)
  name               ok        "Mittetulundusühing Jalgpallikool Tammeka" — ajuste manual (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-18): portada del aruanne-2025 (revisión del alta, subagente Sonnet, revisado por
  displayName        ok        "Tartu Tammeka" — nombre de la carpeta del club en Clubes/
  country            ok        "EE" — carpeta de país "Estonia" (tabla PAISES)
  reportingCurrency  ok        "EUR" — moneda de curso legal de Estonia
  fiscalYearStart    ok        "01-01" — cierre del ejercicio: contenido del .md (52 de 58 fechas de fin de mes caen en el mes 12)
  sport              ok        "futbol" — el .md nombra el fútbol 0 veces y ningún otro deporte más que eso
  brandColor         pendiente (ausente) — la liga del club no está en tools/brand-color-reference/ (o el club no está en footylogos)
  anio               ok        2025 — nombre del archivo (misma regla que onboard.mjs --quien), confirmado por las fechas de cierre del .md
  cierre             ok        "2025-12-31" — año del ejercicio + mes de cierre (contenido del .md (52 de 58 fechas de fin de mes caen en el mes 12))
  reportType         ok        "official_balance_sheet" — ajuste manual (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-18): majandusaasta aruanne 01.01-31.12.2025 con tulemiaruanne (L132) (revisión d
  perimetro          ok        "consolidado" — ajuste manual (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-18): 2025 trae los dos; la única controlada, OÜ Sepa Jalgpallikeskus, administra
  currency           ok        "EUR" — moneda de curso legal de Estonia (tabla PAISES de alta-club.mjs)
  fxRef              ok        "EUR@2025-12-31" — el documento no declara tipo de cambio; FX_CLOSE ya tiene EUR@2025-12-31 = 0.8511 (Cierre BCE al 31/12/2025 (1 EUR = 1,1750 USD))
  sourceId           ok        "tartutammeka-ee-aruanne-2025" — clubId + nombre del archivo en slug
  liga               pendiente null — sin caché de rosters para ee (tools/club-league-reference/ee.json)

FISCAL YEAR META PROPUESTO para 2025 (NO registrado: un ejercicio con meta y
sin rubros se vería en el sitio como un año en cero, y "sin dato no es cero"):
  2025: {"reportType":"official_balance_sheet","currency":"EUR","fxRef":"EUR@2025-12-31","sourceId":"tartutammeka-ee-aruanne-2025"}
```

## 2025

### Ingresos

```text
2025: cargado por tools/cargar.mjs (2026-10-18) desde Clubes/Estonia/Tartu Tammeka/aruanne-2025.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Estonia/Tartu Tammeka/aruanne-2025.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Liikmetelt saadud tasud | pág. 5, Jev 1 |
| 2 | Tartu Linnavalitsus | pág. 15, Claude 0.8 |
| 3 | Eesti Jalgpalli Liit | pág. 15, precedente |
| 4 | UEFA Solidaarsustoetus | pág. 15, precedente |
| 5 | Spordikoolituse- ja Teabe Sihtasutus | pág. 15, precedente |
| 6 | Füüsilised ja juriidilised isikud | pág. 15, precedente |
| 7 | Tartu Vallavalitsus | pág. 15, Jev 0.99 |
| 8 | Eesti Kultuurikapital | pág. 15, Jev 0.91 |
| 9 | Elva Vallavalitus | pág. 15, Jev 0.99 |
| 10 | Luunja Vallavalitsus | pág. 15, Jev 0.99 |
| 11 | Kambja Vallavalitsus | pág. 15, Jev 0.99 |
| 12 | Kastre Vallavalitsus | pág. 15, Jev 0.99 |
| 13 | Tulu varustuse müügist | pág. 16, Jev 0.97 |
| 14 | Reklaamitulu | pág. 16, Jev 1 |
| 15 | Tulu piletite müügist | pág. 16, Jev 1 |
| 16 | Tulu muust äritegevusest | pág. 16, Jev 0.97 |
| 17 | Mängijate üleminekutega seotud tulu | pág. 16, Jev 1 |
| 18 | Tulu väljaku rendist | pág. 16, precedente |
| 19 | Muud tulud | pág. 5, Jev 0.98 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Üür ja rent | pág. 16, Jev 0.97 |
| 2 | Palgakulu - elukutselised mängijad | pág. 18, Jev 1 |
| 3 | Sotsiaalmaksud - elukutselised mängijad | pág. 18, Jev 1 |
| 4 | Palgakulu - muu personal | pág. 18, Jev 0.97 |
| 5 | Sotsiaalmaksud - muu personal | pág. 18, Jev 0.96 |
| 6 | Spordibaaside rent | pág. 16, precedente |
| 7 | Turniiride, võistluste osavõtutasud | pág. 16, Jev 0.99 |
| 8 | Spordivarustus | pág. 16, Jev 1 |
| 9 | Sporditoetus | pág. 16, precedente |
| 10 | Spordistipendium | pág. 16, Jev 0.9 |
| 11 | Eesti Jalgpalli Liit toetusfond | pág. 16, precedente |
| 12 | Üür ja rent | pág. 17, Jev 0.97 |
| 13 | Elektrienergia | pág. 17, Jev 1 |
| 14 | Soojusenergia | pág. 17, Jev 0.99 |
| 15 | Kütus | pág. 17, Jev 0.99 |
| 16 | Veevarustusteenused | pág. 17, Jev 0.96 |
| 17 | Mitmesugused bürookulud | pág. 17, Jev 0.92 |
| 18 | Lähetuskulud | pág. 17, Jev 0.97 |
| 19 | Koolituskulud | pág. 17, precedente |
| 20 | Kulu ebatõenäoliselt laekuvatest nõuetest | pág. 17, Jev 0.98 |
| 21 | Spordivarustus | pág. 17, Jev 1 |
| 22 | Transport | pág. 17, precedente |
| 23 | Turniiride, võistluste osavõtutasud | pág. 17, Jev 0.99 |
| 24 | Mängijate üleminekutega seotud kulud | pág. 17, precedente |
| 25 | Treeninglaager | pág. 17, Jev 0.99 |
| 26 | Võistluste, ürituste korraldamiskulud | pág. 17, Jev 1 |
| 27 | Turvateenus | pág. 17, Jev 0.98 |
| 28 | Litsentsitasud | pág. 17, precedente |
| 29 | Meditsiinitarvikud, taastumisvahendid | pág. 17, precedente |
| 30 | Reklaamikulud | pág. 17, Jev 1 |
| 31 | Raamatupidamine | pág. 17, Jev 0.99 |
| 32 | Ehitusmaterjal ja -teenus | pág. 17, precedente |
| 33 | Isikliku auto kasutamise kompensatsioon | pág. 17, precedente |
| 34 | Mängijate üleminekutega seotud vahendustasu | pág. 17, precedente |
| 35 | Muud | pág. 17, Jev 0.97 |
| 36 | Põhivarade kulum ja väärtuse langus | pág. 5, Jev 1 |
| 37 | Muud kulud | pág. 5, Claude 0.9 |

### Meta

```text
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-18): reportType = official_balance_sheet. majandusaasta aruanne 01.01-31.12.2025 con tulemiaruanne (L132) (revisión del alta, subagente Sonnet, revisado por Claude 2026-10-18)
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-18): cero-real = Televisión. Lisa 12 L494-503 sin fila de TV (subagente Sonnet, revisado por Claude 2026-10-18)
tools/cargar.mjs (2026-10-18). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
alta-club.mjs (2026-10-18): null, SIN VERIFICAR (sin caché de rosters para ee (tools/club-league-reference/ee.json)).
```

## 2020

### Ingresos

```text
2020: cargado por tools/cargar.mjs (2026-10-18) desde Clubes/Estonia/Tartu Tammeka/aruanne-2020.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Estonia/Tartu Tammeka/aruanne-2020.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Liikmetelt saadud tasud | pág. 5, precedente |
| 2 | Tartu Linnavalitsus | pág. 14, precedente |
| 3 | Tartu Spordiliit | pág. 14, Claude 0.85 |
| 4 | Eesti Jalgpalli Liit | pág. 14, precedente |
| 5 | UEFA Solidaarsustoetus | pág. 14, precedente |
| 6 | Spordikoolituse- ja Teabe Sihtasutus | pág. 14, precedente |
| 7 | Kultuuriministeerium | pág. 14, Claude 0.8 |
| 8 | Füüsilised ja juriidilised isikud | pág. 14, precedente |
| 9 | Tartu Vallavalitsus | pág. 14, precedente |
| 10 | Eesti Töötukassa | pág. 14, Jev 0.96 |
| 11 | Haridus- ja Teadusministeerium | pág. 14, Jev 0.97 |
| 12 | Varustus | pág. 15, Claude 0.9 |
| 13 | Reklaam | pág. 15, Jev 1 |
| 14 | Tulu piletite müügist | pág. 15, precedente |
| 15 | Tulu muust äritegevusest | pág. 15, precedente |
| 16 | Mängija üleminekutasu | pág. 15, Jev 1 |
| 17 | Tulu väljaku rendist | pág. 15, precedente |
| 18 | Muud tulud | pág. 5, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Üür ja rent | pág. 15, precedente |
| 2 | Tööjõukulud - elukutselised mängijad | pág. 17, Jev 0.98 |
| 3 | Sotsiaalmaksud - elukutselised mängijad | pág. 17, precedente |
| 4 | Tööjõukulud - muu personal | pág. 17, Jev 0.99 |
| 5 | Sotsiaalmaksud - muu personal | pág. 17, precedente |
| 6 | Spordibaaside rent | pág. 15, precedente |
| 7 | Turniiride, võistluste osavõtutasud | pág. 15, precedente |
| 8 | Spordivarustus | pág. 15, precedente |
| 9 | Stipendiumid | pág. 15, precedente |
| 10 | Annetus Vähiravifondile Kingitud Elu | pág. 15, precedente |
| 11 | Mängijate preemiad | pág. 15, Jev 0.98 |
| 12 | Sissemakse fondi | pág. 15, precedente |
| 13 | Sporditoetus | pág. 15, precedente |
| 14 | Spordistipendium | pág. 15, precedente |
| 15 | Üür ja rent | pág. 16, precedente |
| 16 | Elektrienergia | pág. 16, precedente |
| 17 | Kütus | pág. 16, precedente |
| 18 | Veevarustusteenused | pág. 16, precedente |
| 19 | Mitmesugused bürookulud | pág. 16, precedente |
| 20 | Lähetuskulud | pág. 16, precedente |
| 21 | Koolituskulud | pág. 16, precedente |
| 22 | Kulu ebatõenäoliselt laekuvatest nõuetest | pág. 16, precedente |
| 23 | Spordivarustus | pág. 16, precedente |
| 24 | Transport | pág. 16, precedente |
| 25 | Turniiride, võistluste osavõtutasud | pág. 16, precedente |
| 26 | Mängijate üleminekutasud | pág. 16, Jev 0.96 |
| 27 | Treeninglaager | pág. 16, precedente |
| 28 | Võistluste, ürituste korraldamiskulud | pág. 16, precedente |
| 29 | Turvateenus | pág. 16, precedente |
| 30 | Litsentsitasud | pág. 16, precedente |
| 31 | Meditsiinitarvikud, taastumisvahendid | pág. 16, precedente |
| 32 | Autokulud | pág. 16, Jev 0.99 |
| 33 | Reklaamikulud | pág. 16, precedente |
| 34 | Raamatupidamine | pág. 16, precedente |
| 35 | Ehitusmaterjal ja -teenus | pág. 16, precedente |
| 36 | Isikliku auto kasutamise kompensatsioon | pág. 16, precedente |
| 37 | Juriidilised kulud | pág. 16, precedente |
| 38 | Konsultatsioonid, projektijuhtimine | pág. 16, Jev 1 |
| 39 | Muud | pág. 16, precedente |
| 40 | Põhivarade kulum ja väärtuse langus | pág. 5, precedente |
| 41 | Muud kulud | pág. 5, precedente |

### Meta

```text
2020: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-18): reportType = official_balance_sheet. majandusaasta aruanne anual con estado de resultados ("## Tulemiaruanne", .md L152) (Claude 2026-10-18)
2020: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-18): cero-real = Televisión. sin ninguna fila de ese rubro en el estado ni en las notas; mismo caso que el 2025 del club (Claude 2026-10-18)
tools/cargar.mjs (2026-10-18). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

## 2019

### Ingresos

```text
2019: cargado por tools/cargar.mjs (2026-10-18) desde Clubes/Estonia/Tartu Tammeka/aruanne-2019.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Estonia/Tartu Tammeka/aruanne-2019.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Liikmetelt saadud tasud | pág. 5, precedente |
| 2 | Tartu Linnavalitsuse Kultuuriosakond | pág. 14, Jev 0.99 |
| 3 | Tartu Spordiliit | pág. 14, Claude 0.85 |
| 4 | Eesti Jalgpalli Liit | pág. 14, precedente |
| 5 | UEFA Solidaarsustoetus | pág. 14, precedente |
| 6 | Spordikoolituse- ja Teabe sihtasutus | pág. 14, precedente |
| 7 | Kultuuriministeerium | pág. 14, Claude 0.8 |
| 8 | Füüsilised ja juriidilised isikud | pág. 14, precedente |
| 9 | Tartu Vallavalitsus | pág. 14, precedente |
| 10 | Varustus | pág. 15, precedente |
| 11 | Reklaam | pág. 15, Jev 1 |
| 12 | Tulu piletite müügist | pág. 15, precedente |
| 13 | Tulu muust äritegevusest | pág. 15, precedente |
| 14 | Mängija üleminekutasu | pág. 15, Jev 1 |
| 15 | Tulu väljaku rendist | pág. 15, precedente |
| 16 | Muud tulud | pág. 5, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Üür ja rent | pág. 15, precedente |
| 2 | Tööjõukulud - elukutselised mängijad | pág. 17, Jev 0.98 |
| 3 | Sotsiaalmaksud - elukutselised mängijad | pág. 17, precedente |
| 4 | Tööjõukulud - muu personal | pág. 17, Jev 0.99 |
| 5 | Sotsiaalmaksud - muu personal | pág. 17, precedente |
| 6 | Spordibaaside rent | pág. 15, precedente |
| 7 | Turniiride, võistluste osavõtutasud | pág. 15, precedente |
| 8 | Spordivarustus | pág. 15, precedente |
| 9 | Stipendiumid | pág. 15, precedente |
| 10 | Annetus Vähiravifondile Kingitud Elu | pág. 15, precedente |
| 11 | Mängijate preemiad | pág. 15, Jev 0.98 |
| 12 | Sissemakse fondi | pág. 15, precedente |
| 13 | Üür ja rent | pág. 16, precedente |
| 14 | Elektrienergia | pág. 16, precedente |
| 15 | Soojusenergia | pág. 16, precedente |
| 16 | Kütus | pág. 16, precedente |
| 17 | Veevarustusteenused | pág. 16, precedente |
| 18 | Mitmesugused bürookulud | pág. 16, precedente |
| 19 | Lähetuskulud | pág. 16, precedente |
| 20 | Koolituskulud | pág. 16, precedente |
| 21 | Kulu ebatõenäoliselt laekuvatest nõuetest | pág. 16, precedente |
| 22 | Spordivarustus | pág. 16, precedente |
| 23 | Transport | pág. 16, precedente |
| 24 | Turniiride, võistluste osavõtutasud | pág. 16, precedente |
| 25 | Mängijate üleminekutasud | pág. 16, Jev 0.96 |
| 26 | Treeninglaager | pág. 16, precedente |
| 27 | Võistluste, ürituste korraldamiskulud | pág. 16, precedente |
| 28 | Turvateenus | pág. 16, precedente |
| 29 | Litsentsitasud | pág. 16, precedente |
| 30 | Meditsiinitarvikud, taastumisvahendid | pág. 16, precedente |
| 31 | Autokulud | pág. 16, Jev 0.99 |
| 32 | Reklaamikulud | pág. 16, precedente |
| 33 | Raamatupidamine | pág. 16, precedente |
| 34 | Ehitusmaterjal ja -teenus | pág. 16, precedente |
| 35 | Isikliku auto kasutamise kompensatsioon | pág. 16, precedente |
| 36 | Juriidilised kulud | pág. 16, precedente |
| 37 | Konsultatsioonid, projektijuhtimine | pág. 16, Jev 1 |
| 38 | Muud | pág. 16, precedente |
| 39 | Põhivarade kulum ja väärtuse langus | pág. 5, precedente |
| 40 | Muud kulud | pág. 5, precedente |

### Meta

```text
2019: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-18): reportType = official_balance_sheet. majandusaasta aruanne anual con estado de resultados ("## Tulemiaruanne", .md L160) (Claude 2026-10-18)
2019: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-18): cero-real = Televisión. sin ninguna fila de ese rubro en el estado ni en las notas; mismo caso que el 2025 del club (Claude 2026-10-18)
tools/cargar.mjs (2026-10-18). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

## Fuentes

### tartutammeka-ee-aruanne-2025

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-18) desde la transcripción Clubes/Estonia/Tartu Tammeka/aruanne-2025.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.
```

### tartutammeka-ee-aruanne-2020

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-18) desde la transcripción Clubes/Estonia/Tartu Tammeka/aruanne-2020.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.
```

### tartutammeka-ee-aruanne-2019

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-18) desde la transcripción Clubes/Estonia/Tartu Tammeka/aruanne-2019.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.
```
