# scheerenveen-nl — evidencia de carga

Lo que antes iba como comentario en el data file del club, `data/<país>/scheerenveen-nl-data.js` (la regla: `Admin/CONVENCIONES-DATOS.md`, "data/<país>/<club>-data.js NO LLEVA
COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y meta. Las notas de cada fila van en una tabla con su número de
fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
SC Heerenveen: alta por tools/alta-club.mjs (2026-10-19) desde Clubes/Países Bajos/SC Heerenveen/SC-Heerenveen-Jaarverslag-2024-2025.pdf. brandColor #0055A4
(procedencia en Admin/sourcing/Países Bajos/SC Heerenveen.md; tools/cargar-lote.mjs).
```

```text
data/nl/scheerenveen-nl-data.js — S.C. Heerenveen Holding B.V. (Países Bajos).
ALTA POR SCRIPT (tools/alta-club.mjs, 2026-10-19), SIN EJERCICIOS CARGADOS TODAVÍA: las estructuras del data file
nacen vacías a propósito. Los rubros, los totales oficiales y el resto del fiscalYearMeta los agrega la etapa de carga.

Documento que originó el alta: Clubes/Países Bajos/SC Heerenveen/SC-Heerenveen-Jaarverslag-2024-2025.pdf

De dónde salió cada campo (estado según alta-club.mjs: ok / pendiente):
  id                 ok        "scheerenveen-nl" — slug de "SC Heerenveen" + '-nl' (convención de clubId, Admin/CONVENCIONES.md Versión 129)
  name               ok        "S.C. Heerenveen Holding B.V." — la portada y lo más frecuente del .md coinciden (21 veces)
  displayName        ok        "SC Heerenveen" — nombre de la carpeta del club en Clubes/
  country            ok        "NL" — carpeta de país "Países Bajos" (tabla PAISES)
  reportingCurrency  ok        "EUR" — moneda de curso legal de Países Bajos
  fiscalYearStart    ok        "07-01" — cierre del ejercicio: contenido del .md (31 de 32 fechas de fin de mes caen en el mes 6)
  sport              ok        "futbol" — el .md nombra el fútbol 30 veces y ningún otro deporte más que eso
  brandColor         pendiente (ausente) — la liga del club no está en tools/brand-color-reference/ (o el club no está en footylogos)
  anio               ok        2025 — nombre del archivo (misma regla que onboard.mjs --quien), confirmado por las fechas de cierre del .md
  cierre             ok        "2025-06-30" — año del ejercicio + mes de cierre (contenido del .md (31 de 32 fechas de fin de mes caen en el mes 6))
  reportType         ok        "official_balance_sheet" — el .md tiene un estado contable (resultados / balance) y el nombre del archivo no sugiere otro tipo
  perimetro          ok        "consolidado" — ajuste manual (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-18): La que presenta es la holding S.C. Heerenveen Holding B.V., cuyo individual
  currency           ok        "EUR" — moneda de curso legal de Países Bajos (tabla PAISES de alta-club.mjs)
  fxRef              ok        "EUR@2025-06-30" — el documento no declara tipo de cambio; FX_CLOSE ya tiene EUR@2025-06-30 = 0.8532 (Cierre BCE al 30/6/2025 (1 EUR = 1,172 USD))
  sourceId           ok        "scheerenveen-nl-jaarverslag-2024-2025" — clubId + nombre del archivo en slug
  liga               ok        "nl-eredivisie" — roster cacheado de "2024–25 Eredivisie" (tools/club-league-reference/nl.json), coincidencia única por palabras "Heerenveen" = "SC Heerenveen"

FISCAL YEAR META PROPUESTO para 2025 (NO registrado: un ejercicio con meta y
sin rubros se vería en el sitio como un año en cero, y "sin dato no es cero"):
  2025: {"reportType":"official_balance_sheet","currency":"EUR","fxRef":"EUR@2025-06-30","sourceId":"scheerenveen-nl-jaarverslag-2024-2025"}
```

## 2025

### Ingresos

```text
2025: cargado por tools/cargar.mjs (2026-10-19) desde Clubes/Países Bajos/SC Heerenveen/SC-Heerenveen-Jaarverslag-2024-2025.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Países Bajos/SC Heerenveen/SC-Heerenveen-Jaarverslag-2024-2025.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Wedstrijdbaten | pág. 35, Claude 0.85 |
| 2 | Sponsoring | pág. 35, Jev 1 |
| 3 | Mediagelden | pág. 35, Jev 1 |
| 4 | Food & Beverage | pág. 35, Jev 0.97 |
| 5 | Merchandise | pág. 35, Jev 1 |
| 6 | Overige opbrengsten | pág. 35, Jev 0.99 |
| 7 | Netto-opbrengst vergoedingssommen | pág. 21, Jev 1 |
| 8 | Resultaat deelnemingen | pág. 21, Jev 0.98 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Kostprijs | pág. 21, precedente |
| 2 | Salariskosten | pág. 35, precedente |
| 3 | Pensioenlasten | pág. 35, precedente |
| 4 | Sociale lasten | pág. 35, precedente |
| 5 | Overige kosten | pág. 35, precedente |
| 6 | Doorberekende personeelskosten | pág. 35, precedente |
| 7 | Afschrijvingskosten vergoedingssommen | pág. 8, Jev 1 |
| 8 | Afwaardering boekwaarde vertrokken spelers | pág. 8, precedente |
| 9 | Afschrijvingen op materiële vaste activa | pág. 21, Jev 1 |
| 10 | Overige bedrijfskosten | pág. 21, Claude 0.85 |

### Meta

```text
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-18): perimetro = consolidado. La que presenta es la holding S.C. Heerenveen Holding B.V., cuyo individual es un cascarón sin operación (solo participaciones y resultado de participadas, L1580, L1617); el fútbol (licencia KNVB) está en la controlada S.C. Heerenveen B.V. y S.C. Heerenveen Vastgoed B.V. es la sociedad inmobiliaria del club (alquila a la operadora, con garantía cruzada, L1502-1504). El individual no tiene el fútbol: consolidado. (subagente Sonnet, revisado por Claude 2026-10-18)
tools/cargar.mjs (2026-10-19). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
alta-club.mjs (2026-10-19): nl-eredivisie, verificado contra roster cacheado de "2024–25 Eredivisie" (tools/club-league-reference/nl.json), coincidencia única por palabras "Heerenveen" = "SC Heerenveen".
```

## Fuentes

### scheerenveen-nl-jaarverslag-2024-2025

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-19) desde la transcripción Clubes/Países Bajos/SC Heerenveen/SC-Heerenveen-Jaarverslag-2024-2025.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.
```
