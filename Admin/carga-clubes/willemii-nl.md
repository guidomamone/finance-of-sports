# willemii-nl — evidencia de carga

Lo que antes iba como comentario en el data file del club, `data/<país>/willemii-nl-data.js` (la regla: `Admin/CONVENCIONES-DATOS.md`, "data/<país>/<club>-data.js NO LLEVA
COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y meta. Las notas de cada fila van en una tabla con su número de
fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
Willem II: alta por tools/alta-club.mjs (2026-10-19) desde Clubes/Países Bajos/Willem II/Willem-II-Jaarverslag-2024-2025.pdf. brandColor #D10A11
(procedencia en Admin/sourcing/Países Bajos/Willem II.md; tools/cargar-lote.mjs).
```

```text
data/nl/willemii-nl-data.js — Willem II Holding B.V. (Países Bajos).
ALTA POR SCRIPT (tools/alta-club.mjs, 2026-10-19), SIN EJERCICIOS CARGADOS TODAVÍA: las estructuras del data file
nacen vacías a propósito. Los rubros, los totales oficiales y el resto del fiscalYearMeta los agrega la etapa de carga.

Documento que originó el alta: Clubes/Países Bajos/Willem II/Willem-II-Jaarverslag-2024-2025.pdf

De dónde salió cada campo (estado según alta-club.mjs: ok / pendiente):
  id                 ok        "willemii-nl" — slug de "Willem II" + '-nl' (convención de clubId, Admin/CONVENCIONES.md Versión 129)
  name               ok        "Willem II Holding B.V." — respuesta de Guido en la cola (c27fef2): aceptó la propuesta
  displayName        ok        "Willem II" — nombre de la carpeta del club en Clubes/
  country            ok        "NL" — carpeta de país "Países Bajos" (tabla PAISES)
  reportingCurrency  ok        "EUR" — moneda de curso legal de Países Bajos
  fiscalYearStart    ok        "07-01" — cierre del ejercicio: contenido del .md (56 de 59 fechas de fin de mes caen en el mes 6)
  sport              ok        "futbol" — el .md nombra el fútbol 29 veces y ningún otro deporte más que eso
  brandColor         pendiente (ausente) — la liga del club no está en tools/brand-color-reference/ (o el club no está en footylogos)
  anio               ok        2025 — nombre del archivo (misma regla que onboard.mjs --quien), confirmado por las fechas de cierre del .md
  cierre             ok        "2025-06-30" — año del ejercicio + mes de cierre (contenido del .md (56 de 59 fechas de fin de mes caen en el mes 6))
  reportType         ok        "official_balance_sheet" — el .md tiene un estado contable (resultados / balance) y el nombre del archivo no sugiere otro tipo
  perimetro          ok        "consolidado" — ajuste manual (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-19): Willem II Holding B.V. consolida al club (Willem II Tilburg B.V.) y al esta
  currency           ok        "EUR" — moneda de curso legal de Países Bajos (tabla PAISES de alta-club.mjs)
  fxRef              ok        "EUR@2025-06-30" — el documento no declara tipo de cambio; FX_CLOSE ya tiene EUR@2025-06-30 = 0.8532 (Cierre BCE al 30/6/2025 (1 EUR = 1,172 USD))
  sourceId           ok        "willemii-nl-jaarverslag-2024-2025" — clubId + nombre del archivo en slug
  liga               ok        "nl-eredivisie" — roster cacheado de "2024–25 Eredivisie" (tools/club-league-reference/nl.json), coincidencia exacta "Willem II"

FISCAL YEAR META PROPUESTO para 2025 (NO registrado: un ejercicio con meta y
sin rubros se vería en el sitio como un año en cero, y "sin dato no es cero"):
  2025: {"reportType":"official_balance_sheet","currency":"EUR","fxRef":"EUR@2025-06-30","sourceId":"willemii-nl-jaarverslag-2024-2025"}
```

## 2025

### Ingresos

```text
2025: cargado por tools/cargar.mjs (2026-10-19) desde Clubes/Países Bajos/Willem II/Willem-II-Jaarverslag-2024-2025.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Países Bajos/Willem II/Willem-II-Jaarverslag-2024-2025.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Wedstrijdbaten | pág. 29, Jev 0.96 |
| 2 | Sponsoring | pág. 29, Jev 1 |
| 3 | Media gerelateerde baten | pág. 29, Jev 1 |
| 4 | Merchandise | pág. 29, Claude 0.93 |
| 5 | Horeca | pág. 29, Jev 0.99 |
| 6 | Prijzengeld | pág. 29, Jev 1 |
| 7 | Overige baten | pág. 29, Jev 1 |
| 8 | Resultaat vergoedingssommen | pág. 17, Jev 1 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Lonen | pág. 29, precedente |
| 2 | Overige personeelsbeloningen | pág. 29, precedente |
| 3 | Sociale lasten | pág. 29, Jev 0.9 |
| 4 | Pensioenlasten | pág. 29, precedente |
| 5 | Afschrijvingen immateriële vaste activa | pág. 29, precedente |
| 6 | Afschrijvingen materiële vaste activa | pág. 29, Jev 1 |
| 7 | Betaalde huur | pág. 30, precedente |
| 8 | Onderhoud en schoonmaak | pág. 30, Jev 0.99 |
| 9 | Energiekosten | pág. 30, Jev 0.99 |
| 10 | Overige huisvestingskosten | pág. 30, Jev 0.98 |
| 11 | Hospitality | pág. 30, precedente |
| 12 | Spelershome en jeugdaccommodatie | pág. 30, precedente |
| 13 | Kosten sponsoring/reclame/promotie | pág. 30, Jev 0.99 |
| 14 | Merchandise | pág. 30, precedente |
| 15 | Heffing KNVB | pág. 30, Claude 0.85 |
| 16 | Kosten dubieuze debiteuren | pág. 30, precedente |
| 17 | Overige verkoopkosten | pág. 30, Jev 0.98 |
| 18 | Uitrusting en spelmaterialen | pág. 30, Jev 0.98 |
| 19 | Reis- en verblijfkosten incl. trainingskampen | pág. 30, Jev 1 |
| 20 | Kosten veiligheid | pág. 30, Jev 0.99 |
| 21 | Overige wedstrijdkosten | pág. 30, Jev 0.91 |
| 22 | Automatiseringskosten | pág. 30, Jev 1 |
| 23 | Scoutingskosten | pág. 30, Jev 1 |
| 24 | Accountantskosten | pág. 30, Jev 1 |
| 25 | Advieskosten | pág. 30, Jev 1 |
| 26 | Algemene verzekeringen | pág. 30, Jev 1 |
| 27 | Contributies | pág. 30, Jev 0.98 |
| 28 | Overige kosten | pág. 30, Jev 0.92 |

### Meta

```text
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-19): perimetro = consolidado. Willem II Holding B.V. consolida al club (Willem II Tilburg B.V.) y al estadio (Vastgoed B.V.) (subagente Sonnet, revisado por Claude 2026-10-19)
tools/cargar.mjs (2026-10-19). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
alta-club.mjs (2026-10-19): nl-eredivisie, verificado contra roster cacheado de "2024–25 Eredivisie" (tools/club-league-reference/nl.json), coincidencia exacta "Willem II".
```

## Fuentes

### willemii-nl-jaarverslag-2024-2025

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-19) desde la transcripción Clubes/Países Bajos/Willem II/Willem-II-Jaarverslag-2024-2025.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.
```
