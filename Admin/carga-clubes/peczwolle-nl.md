# peczwolle-nl — evidencia de carga

Lo que antes iba como comentario en el data file del club, `data/<país>/peczwolle-nl-data.js` (la regla: `Admin/CONVENCIONES-DATOS.md`, "data/<país>/<club>-data.js NO LLEVA
COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y meta. Las notas de cada fila van en una tabla con su número de
fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
PEC Zwolle: alta por tools/alta-club.mjs (2026-10-19) desde Clubes/Países Bajos/PEC Zwolle/wf-2024-2025-aaba1b62.pdf. brandColor #0000FF
(procedencia en Admin/sourcing/Países Bajos/PEC Zwolle.md; tools/cargar-lote.mjs).
```

```text
data/nl/peczwolle-nl-data.js — PEC Zwolle B.V. (Países Bajos).
ALTA POR SCRIPT (tools/alta-club.mjs, 2026-10-19), SIN EJERCICIOS CARGADOS TODAVÍA: las estructuras del data file
nacen vacías a propósito. Los rubros, los totales oficiales y el resto del fiscalYearMeta los agrega la etapa de carga.

Documento que originó el alta: Clubes/Países Bajos/PEC Zwolle/wf-2024-2025-aaba1b62.pdf

De dónde salió cada campo (estado según alta-club.mjs: ok / pendiente):
  id                 ok        "peczwolle-nl" — slug de "PEC Zwolle" + '-nl' (convención de clubId, Admin/CONVENCIONES.md Versión 129)
  name               ok        "PEC Zwolle B.V." — la portada y lo más frecuente del .md coinciden (77 veces)
  displayName        ok        "PEC Zwolle" — nombre de la carpeta del club en Clubes/
  country            ok        "NL" — carpeta de país "Países Bajos" (tabla PAISES)
  reportingCurrency  ok        "EUR" — moneda de curso legal de Países Bajos
  fiscalYearStart    ok        "07-01" — cierre del ejercicio: contenido del .md (50 de 57 fechas de fin de mes caen en el mes 6)
  sport              ok        "futbol" — el .md nombra el fútbol 30 veces y ningún otro deporte más que eso
  brandColor         pendiente (ausente) — la liga del club no está en tools/brand-color-reference/ (o el club no está en footylogos)
  anio               ok        2025 — nombre del archivo (misma regla que onboard.mjs --quien), confirmado por las fechas de cierre del .md
  cierre             ok        "2025-06-30" — año del ejercicio + mes de cierre (contenido del .md (50 de 57 fechas de fin de mes caen en el mes 6))
  reportType         ok        "official_balance_sheet" — el .md tiene un estado contable (resultados / balance) y el nombre del archivo no sugiere otro tipo
  perimetro          ok        "consolidado" — ajuste manual (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-18): PEC Zwolle B.V. es el club y consolida con Stichting Regio Zwolle United, u
  currency           ok        "EUR" — moneda de curso legal de Países Bajos (tabla PAISES de alta-club.mjs)
  fxRef              ok        "EUR@2025-06-30" — el documento no declara tipo de cambio; FX_CLOSE ya tiene EUR@2025-06-30 = 0.8532 (Cierre BCE al 30/6/2025 (1 EUR = 1,172 USD))
  sourceId           ok        "peczwolle-nl-wf-2024-2025-aaba1b62" — clubId + nombre del archivo en slug
  liga               ok        "nl-eredivisie" — roster cacheado de "2024–25 Eredivisie" (tools/club-league-reference/nl.json), coincidencia exacta "PEC Zwolle"

FISCAL YEAR META PROPUESTO para 2025 (NO registrado: un ejercicio con meta y
sin rubros se vería en el sitio como un año en cero, y "sin dato no es cero"):
  2025: {"reportType":"official_balance_sheet","currency":"EUR","fxRef":"EUR@2025-06-30","sourceId":"peczwolle-nl-wf-2024-2025-aaba1b62"}
```

## 2025

### Ingresos

```text
2025: cargado por tools/cargar.mjs (2026-10-19) desde Clubes/Países Bajos/PEC Zwolle/wf-2024-2025-aaba1b62.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Países Bajos/PEC Zwolle/wf-2024-2025-aaba1b62.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Wedstrijdbaten | pág. 40, Jev 0.96 |
| 2 | Prijzengeld | pág. 40, Jev 1 |
| 3 | Sponsoring | pág. 40, Jev 1 |
| 4 | Media gerelateerde baten | pág. 40, Jev 1 |
| 5 | Merchandising & Business to consumeractiviteiten | pág. 40, Jev 1 |
| 6 | Food & beverage | pág. 40, Jev 0.98 |
| 7 | Overige omzet | pág. 40, Jev 0.99 |
| 8 | Subsidies en giften | pág. 40, Jev 0.99 |
| 9 | Vergoedingssommen spelers | pág. 40, Jev 0.99 |
| 10 | Solidariteit- en opleidingsvergoedingen | pág. 40, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Lonen en salarissen | pág. 40, Jev 0.97 |
| 2 | Sociale lasten | pág. 40, Jev 0.91 |
| 3 | Pensioenlasten | pág. 40, precedente |
| 4 | Overige personeelskosten | pág. 40, Jev 0.93 |
| 5 | Immateriële vaste activa | pág. 41, precedente |
| 6 | Materiële vaste activa | pág. 41, Claude 0.95 |
| 7 | Overige bedrijfskosten | pág. 20, Claude 0.9 |

### Meta

```text
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-18): perimetro = consolidado. PEC Zwolle B.V. es el club y consolida con Stichting Regio Zwolle United, una fundación de proyectos sociales y comunitarios cuyas actividades se hacen en gran parte en beneficio de PEC Zwolle B.V., que cubre sus pérdidas (L778, 'grotendeels ten behoeve van PEC Zwolle B.V.'): negocio del club. Corregido por Claude 2026-10-19 con ok de Guido (to-do 298 w): el documento no dice 'academia'. Hay consolidada (L572) y enkelvoudige (índice L30-31, L47-48), no se verificó el detalle de la enkelvoudige. (subagente Sonnet, revisado por Claude 2026-10-18)
tools/cargar.mjs (2026-10-19). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
alta-club.mjs (2026-10-19): nl-eredivisie, verificado contra roster cacheado de "2024–25 Eredivisie" (tools/club-league-reference/nl.json), coincidencia exacta "PEC Zwolle".
```

## Fuentes

### peczwolle-nl-wf-2024-2025-aaba1b62

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-19) desde la transcripción Clubes/Países Bajos/PEC Zwolle/wf-2024-2025-aaba1b62.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.
```
