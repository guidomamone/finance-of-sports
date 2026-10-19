# sccambuur-nl — evidencia de carga

Lo que antes iba como comentario en el data file del club, `data/<país>/sccambuur-nl-data.js` (la regla: `Admin/CONVENCIONES-DATOS.md`, "data/<país>/<club>-data.js NO LLEVA
COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y meta. Las notas de cada fila van en una tabla con su número de
fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
SC Cambuur: alta por tools/alta-club.mjs (2026-10-19) desde Clubes/Países Bajos/SC Cambuur/Jaarverslag-SC-Cambuur-2024-2025.pdf. brandColor #FFEE00
(procedencia en Admin/sourcing/Países Bajos/SC Cambuur.md; tools/cargar-lote.mjs).
```

```text
data/nl/sccambuur-nl-data.js — SC Cambuur-Leeuwarden B.V. (Países Bajos).
ALTA POR SCRIPT (tools/alta-club.mjs, 2026-10-19), SIN EJERCICIOS CARGADOS TODAVÍA: las estructuras del data file
nacen vacías a propósito. Los rubros, los totales oficiales y el resto del fiscalYearMeta los agrega la etapa de carga.

Documento que originó el alta: Clubes/Países Bajos/SC Cambuur/Jaarverslag-SC-Cambuur-2024-2025.pdf

De dónde salió cada campo (estado según alta-club.mjs: ok / pendiente):
  id                 ok        "sccambuur-nl" — slug de "SC Cambuur" + '-nl' (convención de clubId, Admin/CONVENCIONES.md Versión 129)
  name               ok        "SC Cambuur-Leeuwarden B.V." — la portada y lo más frecuente del .md coinciden (10 veces)
  displayName        ok        "SC Cambuur" — nombre de la carpeta del club en Clubes/
  country            ok        "NL" — carpeta de país "Países Bajos" (tabla PAISES)
  reportingCurrency  ok        "EUR" — moneda de curso legal de Países Bajos
  fiscalYearStart    ok        "07-01" — cierre del ejercicio: ajuste manual (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-18): balance consolidado 'per 30 juni 2025'
  sport              ok        "futbol" — el .md nombra el fútbol 13 veces y ningún otro deporte más que eso
  brandColor         pendiente (ausente) — la liga del club no está en tools/brand-color-reference/ (o el club no está en footylogos)
  anio               ok        2025 — ajuste manual (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-18): balance consolidado 'per 30 juni 2025'
  cierre             ok        "2025-06-30" — año del ejercicio + mes de cierre (ajuste manual (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-18): balance consolidado 'per 30 juni 2025')
  reportType         ok        "official_balance_sheet" — el .md tiene un estado contable (resultados / balance) y el nombre del archivo no sugiere otro tipo
  perimetro          ok        "consolidado" — ajuste manual (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-18): El documento (publicación para la licencia KNVB F.04) trae SOLO el balance 
  currency           ok        "EUR" — moneda de curso legal de Países Bajos (tabla PAISES de alta-club.mjs)
  fxRef              ok        "EUR@2025-06-30" — el documento no declara tipo de cambio; FX_CLOSE ya tiene EUR@2025-06-30 = 0.8532 (Cierre BCE al 30/6/2025 (1 EUR = 1,172 USD))
  sourceId           ok        "sccambuur-nl-jaarverslag-sc-cambuur-2024-2025" — clubId + nombre del archivo en slug
  liga               ok        "nl-eerstedivisie" — roster cacheado de "2024–25 Eerste Divisie" (tools/club-league-reference/nl.json), coincidencia única por palabras "Cambuur" = "SC Cambuur"

FISCAL YEAR META PROPUESTO para 2025 (NO registrado: un ejercicio con meta y
sin rubros se vería en el sitio como un año en cero, y "sin dato no es cero"):
  2025: {"reportType":"official_balance_sheet","currency":"EUR","fxRef":"EUR@2025-06-30","sourceId":"sccambuur-nl-jaarverslag-sc-cambuur-2024-2025"}
```

## 2025

### Ingresos

```text
2025: cargado por tools/cargar.mjs (2026-10-19) desde Clubes/Países Bajos/SC Cambuur/Jaarverslag-SC-Cambuur-2024-2025.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Países Bajos/SC Cambuur/Jaarverslag-SC-Cambuur-2024-2025.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Netto-omzet | pág. 11, Jev 1 |
| 2 | Vergoedingssommen | pág. 11, Claude 0.85 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Kostprijs van de omzet | pág. 11, Claude 0.85 |
| 2 | Lonen en salarissen | pág. 11, Jev 1 |
| 3 | Afschrijvingen | pág. 11, Jev 0.9 |
| 4 | Overige bedrijfskosten | pág. 11, Claude 0.9 |

### Meta

```text
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-18): cierre = 2025-06-30. balance consolidado 'per 30 juni 2025'
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-18): perimetro = consolidado. El documento (publicación para la licencia KNVB F.04) trae SOLO el balance y la cuenta de resultados consolidados de SC Cambuur-Leeuwarden B.V.; no hay estados individuales ni lista de controladas, así que el consolidado es la única opción. Resultado deelnemingen y aandeel derden son 0, lo que sugiere que el perímetro es prácticamente el club mismo (no verificable en este documento). (subagente Sonnet, revisado por Claude 2026-10-18)
tools/cargar.mjs (2026-10-19). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee.
```

### Liga

```text
alta-club.mjs (2026-10-19): nl-eerstedivisie, verificado contra roster cacheado de "2024–25 Eerste Divisie" (tools/club-league-reference/nl.json), coincidencia única por palabras "Cambuur" = "SC Cambuur".
```

## Fuentes

### sccambuur-nl-jaarverslag-sc-cambuur-2024-2025

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-19) desde la transcripción Clubes/Países Bajos/SC Cambuur/Jaarverslag-SC-Cambuur-2024-2025.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.
```
