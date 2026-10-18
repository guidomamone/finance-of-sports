# floratallinn-ee — evidencia de carga

Lo que antes iba como comentario en el data file del club, `data/<país>/floratallinn-ee-data.js` (la regla: `Admin/CONVENCIONES-DATOS.md`, "data/<país>/<club>-data.js NO LLEVA
COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y meta. Las notas de cada fila van en una tabla con su número de
fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
Flora Tallinn: alta por tools/alta-club.mjs (2026-10-18) desde Clubes/Estonia/Flora Tallinn/aruanne-2025.pdf. brandColor #008000
(procedencia en Admin/sourcing/Estonia/Flora Tallinn.md; tools/cargar-lote.mjs).
```

```text
data/ee/floratallinn-ee-data.js — Jalgpalliklubi FCF (Estonia).
ALTA POR SCRIPT (tools/alta-club.mjs, 2026-10-18), SIN EJERCICIOS CARGADOS TODAVÍA: las estructuras del data file
nacen vacías a propósito. Los rubros, los totales oficiales y el resto del fiscalYearMeta los agrega la etapa de carga.

Documento que originó el alta: Clubes/Estonia/Flora Tallinn/aruanne-2025.pdf

De dónde salió cada campo (estado según alta-club.mjs: ok / pendiente):
  id                 ok        "floratallinn-ee" — slug de "Flora Tallinn" + '-ee' (convención de clubId, Admin/CONVENCIONES.md Versión 129)
  name               ok        "Jalgpalliklubi FCF" — ajuste manual (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-18): portada L8 'JALGPALLIKLUBI FCF', registrikood 80052376 (L10); MTÜ (L64) (re
  displayName        ok        "Flora Tallinn" — nombre de la carpeta del club en Clubes/
  country            ok        "EE" — carpeta de país "Estonia" (tabla PAISES)
  reportingCurrency  ok        "EUR" — moneda de curso legal de Estonia
  fiscalYearStart    ok        "01-01" — cierre del ejercicio: contenido del .md (64 de 68 fechas de fin de mes caen en el mes 12)
  sport              ok        "futbol" — el .md nombra el fútbol 2 veces y ningún otro deporte más que eso
  brandColor         pendiente (ausente) — la liga del club no está en tools/brand-color-reference/ (o el club no está en footylogos)
  anio               ok        2025 — nombre del archivo (misma regla que onboard.mjs --quien), confirmado por las fechas de cierre del .md
  cierre             ok        "2025-12-31" — año del ejercicio + mes de cierre (contenido del .md (64 de 68 fechas de fin de mes caen en el mes 12))
  reportType         ok        "official_balance_sheet" — ajuste manual (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-18): majandusaasta aruanne 01.01-31.12.2025 con tulemiaruanne (L185-214) (revisi
  perimetro          ok        "consolidado" — ajuste manual (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-18): 2025 trae los dos (tulemiaruanne consolidado L185-214 y Lisa 20 konsolideer
  currency           ok        "EUR" — moneda de curso legal de Estonia (tabla PAISES de alta-club.mjs)
  fxRef              ok        "EUR@2025-12-31" — el documento no declara tipo de cambio; FX_CLOSE ya tiene EUR@2025-12-31 = 0.8511 (Cierre BCE al 31/12/2025 (1 EUR = 1,1750 USD))
  sourceId           ok        "floratallinn-ee-aruanne-2025" — clubId + nombre del archivo en slug
  liga               pendiente null — sin caché de rosters para ee (tools/club-league-reference/ee.json)

FISCAL YEAR META PROPUESTO para 2025 (NO registrado: un ejercicio con meta y
sin rubros se vería en el sitio como un año en cero, y "sin dato no es cero"):
  2025: {"reportType":"official_balance_sheet","currency":"EUR","fxRef":"EUR@2025-12-31","sourceId":"floratallinn-ee-aruanne-2025"}
```

## 2025

### Ingresos

```text
2025: cargado por tools/cargar.mjs (2026-10-18) desde Clubes/Estonia/Flora Tallinn/aruanne-2025.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Estonia/Flora Tallinn/aruanne-2025.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Liikmetelt saadud tasud | pág. 6, Jev 1 |
| 2 | Mittesihtotsatarbelised annetused ja toetused | pág. 21, Jev 1 |
| 3 | UEFA solidaarsustoetus osalemise eest UEFA klubivõistlustel | pág. 21, precedente |
| 4 | Riigi ja/või KOV toetus | pág. 21, Jev 0.98 |
| 5 | EJL toetused | pág. 21, precedente |
| 6 | Muud toetused | pág. 21, Jev 0.99 |
| 7 | Tulu piletimüügist | pág. 22, Jev 1 |
| 8 | Tulu ülekandeõiguste müügist | pág. 22, Jev 1 |
| 9 | Tulu mängijaõiguste müügist | pág. 22, Jev 1 |
| 10 | Sponsorlus- ja reklaamitulu | pág. 22, Jev 1 |
| 11 | Staadioni rent | pág. 22, Jev 0.94 |
| 12 | Muu tulu ettevõtlusest | pág. 22, Jev 0.91 |
| 13 | Turniiri liikmemaksud | pág. 22, precedente |
| 14 | Muud tulud | pág. 6, Jev 0.98 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Mängijatele makstav sportlasetoetus | pág. 22, precedente |
| 2 | Mängijatele makstav sportlasestipendium | pág. 22, precedente |
| 3 | Muud annetused | pág. 22, Jev 0.98 |
| 4 | Üür ja rent | pág. 23, Jev 0.98 |
| 5 | Energia | pág. 23, Jev 0.99 |
| 6 | Mitmesugused bürookulud | pág. 23, Claude 0.85 |
| 7 | Lähetuskulud | pág. 23, Jev 1 |
| 8 | Koolituskulud | pág. 23, precedente |
| 9 | Riiklikud ja kohalikud maksud | pág. 23, Jev 0.99 |
| 10 | Kulu ebatõenäoliselt laekuvatest nõuetest | pág. 23, Jev 0.96 |
| 11 | Võistluste ja treeningutega seotud kulud | pág. 23, Claude 0.8 |
| 12 | Kulud mängijate õiguste ostmisest | pág. 23, precedente |
| 13 | Reklaamikulud | pág. 23, Jev 1 |
| 14 | Konsultatsioonid | pág. 23, Jev 0.99 |
| 15 | Autokulud | pág. 23, Jev 0.99 |
| 16 | Kasutusrendikulud | pág. 23, precedente |
| 17 | Pangateenused | pág. 23, precedente |
| 18 | Staadioni halduskulud | pág. 23, precedente |
| 19 | Müüdud kaup soetusmaksumuses | pág. 23, precedente |
| 20 | Muud | pág. 23, Jev 1 |
| 21 | Mängijate palgakulu | pág. 23, Jev 1 |
| 22 | Sotsiaalmaks mängijate töötasudelt | pág. 23, Jev 0.99 |
| 23 | Muu personali palgakulu | pág. 23, Jev 0.92 |
| 24 | Sotsiaalmaks muu personali töötasudelt | pág. 23, Claude 0.8 |
| 25 | Põhivarade kulum ja väärtuse langus | pág. 6, Jev 1 |
| 26 | Esinduskulud | pág. 23, Jev 0.99 |
| 27 | Muud | pág. 23, Jev 1 |

### Meta

```text
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-18): reportType = official_balance_sheet. majandusaasta aruanne 01.01-31.12.2025 con tulemiaruanne (L185-214) (revisión del alta, subagente Sonnet, revisado por Claude 2026-10-18)
tools/cargar.mjs (2026-10-18). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
alta-club.mjs (2026-10-18): null, SIN VERIFICAR (sin caché de rosters para ee (tools/club-league-reference/ee.json)).
```

## 2019

### Ingresos

```text
2019: cargado por tools/cargar.mjs (2026-10-18) desde Clubes/Estonia/Flora Tallinn/aruanne-2019.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Estonia/Flora Tallinn/aruanne-2019.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Liikmetelt saadud tasud | pág. 5, precedente |
| 2 | UEFA solidaarsus- ja auhinnaraha | pág. 20, Jev 0.99 |
| 3 | Riigi ja/või KOV toetus | pág. 20, precedente |
| 4 | EJL toetused | pág. 20, precedente |
| 5 | Muud toetused | pág. 20, precedente |
| 6 | Tulu piletimüügist | pág. 20, precedente |
| 7 | Tulu ülekandeõiguste müügist | pág. 20, precedente |
| 8 | Tulu mängijaõiguste müügist | pág. 20, precedente |
| 9 | Väljaku äärde ja reklaamtahvlitele paigutatud reklaam | pág. 20, Jev 1 |
| 10 | Staadioni rent | pág. 20, precedente |
| 11 | Muu tulu ettevõtlusest | pág. 20, precedente |
| 12 | Muud tulud | pág. 5, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Üür ja rent | pág. 21, precedente |
| 2 | Elektrienergia | pág. 21, Jev 1 |
| 3 | Kütus | pág. 21, Jev 0.99 |
| 4 | Mitmesugused bürookulud | pág. 21, precedente |
| 5 | Lähetuskulud | pág. 21, precedente |
| 6 | Koolituskulud | pág. 21, precedente |
| 7 | Riiklikud ja kohalikud maksud | pág. 21, precedente |
| 8 | Kulu ebatõenäoliselt laekuvatest nõuetest | pág. 21, precedente |
| 9 | Võistluste ja treeningutega seotud kulud | pág. 21, precedente |
| 10 | Kulud mängijate õiguste ostmisest | pág. 21, precedente |
| 11 | Reklaamikulud | pág. 21, precedente |
| 12 | Liikmemaksud tütarklubidele | pág. 21, precedente |
| 13 | Stipendiumid | pág. 21, precedente |
| 14 | Konsultatsioonid | pág. 21, precedente |
| 15 | Autokulud | pág. 21, precedente |
| 16 | Kasutusrendikulud | pág. 21, precedente |
| 17 | Pangateenused | pág. 21, precedente |
| 18 | Staadioni halduskulud | pág. 21, precedente |
| 19 | Müüdud kaup soetusmaksumuses | pág. 21, precedente |
| 20 | Muud | pág. 21, precedente |
| 21 | Mängijate palgakulu | pág. 21, precedente |
| 22 | Sotsiaalmaks mängijate töötasudelt | pág. 21, precedente |
| 23 | Muu personali palgakulu | pág. 21, precedente |
| 24 | Sotsiaalmaks muu personali töötasudelt | pág. 21, precedente |
| 25 | Põhivarade kulum ja väärtuse langus | pág. 5, precedente |
| 26 | Trahvid, viivised ja hüvitised | pág. 22, Jev 0.92 |
| 27 | Esinduskulud | pág. 22, precedente |
| 28 | Jalgpalliga mitteseotud tegevuste kulud | pág. 22, precedente |
| 29 | Muud | pág. 22, precedente |

### Meta

```text
2019: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-18): reportType = official_balance_sheet. majandusaasta aruanne anual con estado de resultados ("## Tulemiaruanne", .md L145) (Claude 2026-10-18)
tools/cargar.mjs (2026-10-18). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

## Fuentes

### floratallinn-ee-aruanne-2025

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-18) desde la transcripción Clubes/Estonia/Flora Tallinn/aruanne-2025.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.
```

### floratallinn-ee-aruanne-2019

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-18) desde la transcripción Clubes/Estonia/Flora Tallinn/aruanne-2019.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.
```
