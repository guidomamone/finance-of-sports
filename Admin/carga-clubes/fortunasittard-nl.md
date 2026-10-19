# fortunasittard-nl — evidencia de carga

Lo que antes iba como comentario en el data file del club, `data/<país>/fortunasittard-nl-data.js` (la regla: `Admin/CONVENCIONES-DATOS.md`, "data/<país>/<club>-data.js NO LLEVA
COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y meta. Las notas de cada fila van en una tabla con su número de
fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
Fortuna Sittard: alta por tools/alta-club.mjs (2026-10-19) desde Clubes/Países Bajos/Fortuna Sittard/Fortuna-Sittard-Jaarrekening-2024-2025.pdf. brandColor #FFEA3A
(procedencia en Admin/sourcing/Países Bajos/Fortuna Sittard.md; tools/cargar-lote.mjs).
```

```text
data/nl/fortunasittard-nl-data.js — Fortuna Sittard B.V. (Países Bajos).
ALTA POR SCRIPT (tools/alta-club.mjs, 2026-10-19), SIN EJERCICIOS CARGADOS TODAVÍA: las estructuras del data file
nacen vacías a propósito. Los rubros, los totales oficiales y el resto del fiscalYearMeta los agrega la etapa de carga.

Documento que originó el alta: Clubes/Países Bajos/Fortuna Sittard/Fortuna-Sittard-Jaarrekening-2024-2025.pdf

De dónde salió cada campo (estado según alta-club.mjs: ok / pendiente):
  id                 ok        "fortunasittard-nl" — slug de "Fortuna Sittard" + '-nl' (convención de clubId, Admin/CONVENCIONES.md Versión 129)
  name               ok        "Fortuna Sittard B.V." — la portada y lo más frecuente del .md coinciden (45 veces)
  displayName        ok        "Fortuna Sittard" — nombre de la carpeta del club en Clubes/
  country            ok        "NL" — carpeta de país "Países Bajos" (tabla PAISES)
  reportingCurrency  ok        "EUR" — moneda de curso legal de Países Bajos
  fiscalYearStart    ok        "07-01" — cierre del ejercicio: contenido del .md (89 de 91 fechas de fin de mes caen en el mes 6)
  sport              ok        "futbol" — el .md nombra el fútbol 21 veces y ningún otro deporte más que eso
  brandColor         pendiente (ausente) — la liga del club no está en tools/brand-color-reference/ (o el club no está en footylogos)
  anio               ok        2025 — nombre del archivo (misma regla que onboard.mjs --quien), confirmado por las fechas de cierre del .md
  cierre             ok        "2025-06-30" — año del ejercicio + mes de cierre (contenido del .md (89 de 91 fechas de fin de mes caen en el mes 6))
  reportType         ok        "official_balance_sheet" — el .md tiene un estado contable (resultados / balance) y el nombre del archivo no sugiere otro tipo
  perimetro          ok        "individual" — el .md no presenta estados consolidados (2 menciones de "consolidado")
  currency           ok        "EUR" — moneda de curso legal de Países Bajos (tabla PAISES de alta-club.mjs)
  fxRef              ok        "EUR@2025-06-30" — el documento no declara tipo de cambio; FX_CLOSE ya tiene EUR@2025-06-30 = 0.8532 (Cierre BCE al 30/6/2025 (1 EUR = 1,172 USD))
  sourceId           ok        "fortunasittard-nl-jaarrekening-2024-2025" — clubId + nombre del archivo en slug
  liga               ok        "nl-eredivisie" — roster cacheado de "2024–25 Eredivisie" (tools/club-league-reference/nl.json), coincidencia exacta "Fortuna Sittard"

FISCAL YEAR META PROPUESTO para 2025 (NO registrado: un ejercicio con meta y
sin rubros se vería en el sitio como un año en cero, y "sin dato no es cero"):
  2025: {"reportType":"official_balance_sheet","currency":"EUR","fxRef":"EUR@2025-06-30","sourceId":"fortunasittard-nl-jaarrekening-2024-2025"}
```

## 2025

### Ingresos

```text
2025: cargado por tools/cargar.mjs (2026-10-19) desde Clubes/Países Bajos/Fortuna Sittard/Fortuna-Sittard-Jaarrekening-2024-2025.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Países Bajos/Fortuna Sittard/Fortuna-Sittard-Jaarrekening-2024-2025.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Wedstrijdbaten | pág. 42, Jev 0.95 |
| 2 | Sponsoring | pág. 42, Jev 1 |
| 3 | Media gerelateerde baten | pág. 42, Jev 1 |
| 4 | Prijzengeld | pág. 42, Jev 1 |
| 5 | Horeca | pág. 42, Jev 0.97 |
| 6 | Merchandise | pág. 42, Jev 0.99 |
| 7 | Subsidies en giften | pág. 42, Jev 0.99 |
| 8 | Overige baten | pág. 42, Jev 0.99 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Lonen en salarissen | pág. 42, Claude 0.8 |
| 2 | Sociale lasten | pág. 42, Jev 0.9 |
| 3 | Pensioenlasten | pág. 42, precedente |
| 4 | Overige personeelslasten | pág. 42, precedente |
| 5 | Afschrijvingen | pág. 20, Claude 0.8 |
| 6 | Huisvestingskosten | pág. 42, Jev 0.99 |
| 7 | Wedstrijd- en trainingskosten | pág. 42, Jev 0.91 |
| 8 | Verkoopkosten | pág. 42, precedente |
| 9 | Algemene kosten | pág. 42, Jev 1 |
| 10 | Afschrijving en resultaat vergoedingssommen | pág. 20, Jev 0.99 |

### Meta

```text
tools/cargar.mjs (2026-10-19). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
alta-club.mjs (2026-10-19): nl-eredivisie, verificado contra roster cacheado de "2024–25 Eredivisie" (tools/club-league-reference/nl.json), coincidencia exacta "Fortuna Sittard".
```

## Fuentes

### fortunasittard-nl-jaarrekening-2024-2025

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-19) desde la transcripción Clubes/Países Bajos/Fortuna Sittard/Fortuna-Sittard-Jaarrekening-2024-2025.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```
