# fctwente-nl — evidencia de carga

Lo que antes iba como comentario en el data file del club, `data/<país>/fctwente-nl-data.js` (la regla: `Admin/CONVENCIONES-DATOS.md`, "data/<país>/<club>-data.js NO LLEVA
COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y meta. Las notas de cada fila van en una tabla con su número de
fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
FC Twente: alta por tools/alta-club.mjs (2026-10-19) desde Clubes/Países Bajos/FC Twente/FC-Twente-Jaarrekening-2024-2025.pdf. brandColor #FF0000
(procedencia en Admin/sourcing/Países Bajos/FC Twente.md; tools/cargar-lote.mjs).
```

```text
data/nl/fctwente-nl-data.js — FC Twente ‘65 B.V. (Países Bajos).
ALTA POR SCRIPT (tools/alta-club.mjs, 2026-10-19), SIN EJERCICIOS CARGADOS TODAVÍA: las estructuras del data file
nacen vacías a propósito. Los rubros, los totales oficiales y el resto del fiscalYearMeta los agrega la etapa de carga.

Documento que originó el alta: Clubes/Países Bajos/FC Twente/FC-Twente-Jaarrekening-2024-2025.pdf

De dónde salió cada campo (estado según alta-club.mjs: ok / pendiente):
  id                 ok        "fctwente-nl" — slug de "FC Twente" + '-nl' (convención de clubId, Admin/CONVENCIONES.md Versión 129)
  name               ok        "FC Twente ‘65 B.V." — la portada y lo más frecuente del .md coinciden (33 veces)
  displayName        ok        "FC Twente" — nombre de la carpeta del club en Clubes/
  country            ok        "NL" — carpeta de país "Países Bajos" (tabla PAISES)
  reportingCurrency  ok        "EUR" — moneda de curso legal de Países Bajos
  fiscalYearStart    ok        "07-01" — cierre del ejercicio: contenido del .md (55 de 59 fechas de fin de mes caen en el mes 6)
  sport              ok        "futbol" — el .md nombra el fútbol 21 veces y ningún otro deporte más que eso
  brandColor         pendiente (ausente) — la liga del club no está en tools/brand-color-reference/ (o el club no está en footylogos)
  anio               ok        2025 — nombre del archivo (misma regla que onboard.mjs --quien), confirmado por las fechas de cierre del .md
  cierre             ok        "2025-06-30" — año del ejercicio + mes de cierre (contenido del .md (55 de 59 fechas de fin de mes caen en el mes 6))
  reportType         ok        "official_balance_sheet" — el .md tiene un estado contable (resultados / balance) y el nombre del archivo no sugiere otro tipo
  perimetro          ok        "consolidado" — ajuste manual (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-18): La que presenta es FC Twente '65 B.V., el club mismo, y sus controladas son
  currency           ok        "EUR" — moneda de curso legal de Países Bajos (tabla PAISES de alta-club.mjs)
  fxRef              ok        "EUR@2025-06-30" — el documento no declara tipo de cambio; FX_CLOSE ya tiene EUR@2025-06-30 = 0.8532 (Cierre BCE al 30/6/2025 (1 EUR = 1,172 USD))
  sourceId           ok        "fctwente-nl-jaarrekening-2024-2025" — clubId + nombre del archivo en slug
  liga               ok        "nl-eredivisie" — roster cacheado de "2024–25 Eredivisie" (tools/club-league-reference/nl.json), coincidencia única por palabras "Twente" = "FC Twente"

FISCAL YEAR META PROPUESTO para 2025 (NO registrado: un ejercicio con meta y
sin rubros se vería en el sitio como un año en cero, y "sin dato no es cero"):
  2025: {"reportType":"official_balance_sheet","currency":"EUR","fxRef":"EUR@2025-06-30","sourceId":"fctwente-nl-jaarrekening-2024-2025"}
```

## 2025

### Ingresos

```text
2025: cargado por tools/cargar.mjs (2026-10-19) desde Clubes/Países Bajos/FC Twente/FC-Twente-Jaarrekening-2024-2025.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Países Bajos/FC Twente/FC-Twente-Jaarrekening-2024-2025.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Wedstrijdbaten | pág. 22, Jev 0.96 |
| 2 | Bijdragen in giften en geld | pág. 22, Jev 1 |
| 3 | Televisiebaten | pág. 22, Jev 1 |
| 4 | Merchandising | pág. 22, Jev 0.98 |
| 5 | Catering | pág. 22, precedente |
| 6 | Overige baten | pág. 22, Jev 0.99 |
| 7 | Resultaat vergoedingssommen | pág. 10, Jev 1 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Inkoopwaarde van de omzet | pág. 10, Jev 0.93 |
| 2 | Lonen en salarissen | pág. 22, Jev 0.95 |
| 3 | Sociale lasten | pág. 22, Jev 0.9 |
| 4 | Pensioenpremies | pág. 22, precedente |
| 5 | Autokosten | pág. 22, Jev 0.96 |
| 6 | Inhuur personeel | pág. 22, precedente |
| 7 | Overige personeelskosten | pág. 22, Jev 0.93 |
| 8 | Wedstrijd- en trainingskosten | pág. 22, Jev 0.93 |
| 9 | Verkoopkosten | pág. 22, precedente |
| 10 | Huisvestingskosten | pág. 22, Jev 0.99 |
| 11 | Algemene kosten | pág. 22, Jev 1 |
| 12 | Afschrijvingen (im)materiële vaste activa | pág. 10, Claude 0.85 |
| 13 | Vergoedingssommen | pág. 23, Claude 0.85 |
| 14 | Hand- en tekengelden | pág. 23, precedente |
| 15 | Kosten intermediairs | pág. 23, precedente |

### Meta

```text
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-18): perimetro = consolidado. La que presenta es FC Twente '65 B.V., el club mismo, y sus controladas son FC Twente Accommodaties B.V. y FC Twente Stadion B.V. (estadio/instalaciones del club) y FC Twente/Heracles Academie B.V. (fútbol base, 50% proporcional): todo es negocio del fútbol. El documento es 'Geconsolideerde jaarrekening' (portada L3); la enkelvoudige tiene solo una winst-en-verliesrekening abreviada (art. 2:402 BW, L996-1000). (subagente Sonnet, revisado por Claude 2026-10-18)
tools/cargar.mjs (2026-10-19). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
alta-club.mjs (2026-10-19): nl-eredivisie, verificado contra roster cacheado de "2024–25 Eredivisie" (tools/club-league-reference/nl.json), coincidencia única por palabras "Twente" = "FC Twente".
```

## Fuentes

### fctwente-nl-jaarrekening-2024-2025

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-19) desde la transcripción Clubes/Países Bajos/FC Twente/FC-Twente-Jaarrekening-2024-2025.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.
```
