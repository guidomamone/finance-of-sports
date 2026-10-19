# nec-nl — evidencia de carga

Lo que antes iba como comentario en el data file del club, `data/<país>/nec-nl-data.js` (la regla: `Admin/CONVENCIONES-DATOS.md`, "data/<país>/<club>-data.js NO LLEVA
COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y meta. Las notas de cada fila van en una tabla con su número de
fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
NEC: alta por tools/alta-club.mjs (2026-10-19) desde Clubes/Países Bajos/NEC/NEC-Holding-Jaarrekening-2023-2024.pdf. brandColor #FF0000
(procedencia en Admin/sourcing/Países Bajos/NEC.md; tools/cargar-lote.mjs).
```

```text
data/nl/nec-nl-data.js — NEC (Países Bajos).
ALTA POR SCRIPT (tools/alta-club.mjs, 2026-10-19), SIN EJERCICIOS CARGADOS TODAVÍA: las estructuras del data file
nacen vacías a propósito. Los rubros, los totales oficiales y el resto del fiscalYearMeta los agrega la etapa de carga.

Documento que originó el alta: Clubes/Países Bajos/NEC/NEC-Holding-Jaarrekening-2023-2024.pdf

De dónde salió cada campo (estado según alta-club.mjs: ok / pendiente):
  id                 ok        "nec-nl" — slug de "NEC" + '-nl' (convención de clubId, Admin/CONVENCIONES.md Versión 129)
  name               pendiente "NEC" — no se encontró el nombre legal en el .md; se usa el nombre de la carpeta
  displayName        ok        "NEC" — nombre de la carpeta del club en Clubes/
  country            ok        "NL" — carpeta de país "Países Bajos" (tabla PAISES)
  reportingCurrency  ok        "EUR" — moneda de curso legal de Países Bajos
  fiscalYearStart    ok        "07-01" — cierre del ejercicio: contenido del .md (73 de 73 fechas de fin de mes caen en el mes 6)
  sport              ok        "futbol" — el .md nombra el fútbol 19 veces y ningún otro deporte más que eso
  brandColor         pendiente (ausente) — la liga del club no está en tools/brand-color-reference/ (o el club no está en footylogos)
  anio               ok        2024 — nombre del archivo (misma regla que onboard.mjs --quien), confirmado por las fechas de cierre del .md
  cierre             ok        "2024-06-30" — año del ejercicio + mes de cierre (contenido del .md (73 de 73 fechas de fin de mes caen en el mes 6))
  reportType         ok        "official_balance_sheet" — el .md tiene un estado contable (resultados / balance) y el nombre del archivo no sugiere otro tipo
  perimetro          ok        "consolidado" — ajuste manual (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-18): La que presenta es la holding N.E.C. Holding B.V.; el fútbol está en las co
  currency           ok        "EUR" — moneda de curso legal de Países Bajos (tabla PAISES de alta-club.mjs)
  fxRef              ok        "EUR@2024-06-30" — el documento no declara tipo de cambio; FX_CLOSE ya tiene EUR@2024-06-30 = 0.9337 (Cierre BCE al 30/6/2024 (1 EUR = 1,071 USD))
  sourceId           ok        "nec-nl-holding-jaarrekening-2023-2024" — clubId + nombre del archivo en slug
  liga               ok        "nl-eredivisie" — roster cacheado de "2023–24 Eredivisie" (tools/club-league-reference/nl.json), coincidencia exacta "NEC"

FISCAL YEAR META PROPUESTO para 2024 (NO registrado: un ejercicio con meta y
sin rubros se vería en el sitio como un año en cero, y "sin dato no es cero"):
  2024: {"reportType":"official_balance_sheet","currency":"EUR","fxRef":"EUR@2024-06-30","sourceId":"nec-nl-holding-jaarrekening-2023-2024"}
```

## 2024

### Ingresos

```text
2024: cargado por tools/cargar.mjs (2026-10-19) desde Clubes/Países Bajos/NEC/NEC-Holding-Jaarrekening-2023-2024.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Países Bajos/NEC/NEC-Holding-Jaarrekening-2023-2024.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: -; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Wedstrijdbaten | pág. 35, Jev 0.97 |
| 2 | Sponsoring | pág. 35, Jev 1 |
| 3 | Media gerelateerde baten | pág. 35, Jev 1 |
| 4 | Subsidies | pág. 35, Jev 0.99 |
| 5 | Merchandise | pág. 35, Jev 0.99 |
| 6 | Horeca | pág. 35, Jev 0.99 |
| 7 | Prijzengeld | pág. 35, Jev 1 |
| 8 | Overige baten | pág. 35, Jev 0.99 |
| 9 | Vergoedingssommen | pág. 37, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Afschrijving vergoedingssommen | pág. 37, Jev 1 |
| 2 | Lonen en salarissen | pág. 35, Jev 0.98 |
| 3 | Sociale lasten | pág. 35, Claude 0.8 |
| 4 | Pensioenlasten | pág. 35, precedente |
| 5 | Overige personeelskosten | pág. 35, Jev 0.93 |
| 6 | Kosten van ontwikkeling | pág. 36, Claude 0.85 |
| 7 | Vergoedingssommen | pág. 36, Jev 0.97 |
| 8 | Alloca e amor sa e vergoedingssommen | pág. 36, Jev 1 |
| 9 | Bedrijfsgebouwen en -terreinen | pág. 36, Jev 0.99 |
| 10 | Machines en installa es | pág. 36, Claude 0.9 |
| 11 | Andere vaste bedrijfsmiddelen | pág. 36, Jev 0.99 |
| 12 | Huisves ngskosten | pág. 36, precedente |
| 13 | Wedstrijd- en trainingskosten | pág. 36, Jev 0.97 |
| 14 | Verkoopkosten | pág. 36, Jev 1 |
| 15 | Algemene kosten | pág. 36, Jev 1 |

### Meta

```text
2024: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-18): perimetro = consolidado. La que presenta es la holding N.E.C. Holding B.V.; el fútbol está en las controladas Nijmegen Eendracht Combinatie B.V. (club profesional), Voetbalacademie N.E.C. B.V. (fútbol base) y Exploitatie-Maatschappij De Goffert B.V. (explotación del estadio y horeca, tras fusión con N.E.C. Horeca). La enkelvoudige tiene solo una winst-en-verliesrekening abreviada (art. 2:402 BW). (subagente Sonnet, revisado por Claude 2026-10-18)
tools/cargar.mjs (2026-10-19). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
alta-club.mjs (2026-10-19): nl-eredivisie, verificado contra roster cacheado de "2023–24 Eredivisie" (tools/club-league-reference/nl.json), coincidencia exacta "NEC".
```

## Fuentes

### nec-nl-holding-jaarrekening-2023-2024

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-19) desde la transcripción Clubes/Países Bajos/NEC/NEC-Holding-Jaarrekening-2023-2024.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.
```
