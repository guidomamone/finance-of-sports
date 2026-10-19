# nacbreda-nl — evidencia de carga

Lo que antes iba como comentario en el data file del club, `data/<país>/nacbreda-nl-data.js` (la regla: `Admin/CONVENCIONES-DATOS.md`, "data/<país>/<club>-data.js NO LLEVA
COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y meta. Las notas de cada fila van en una tabla con su número de
fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
NAC Breda: alta por tools/alta-club.mjs (2026-10-19) desde Clubes/Países Bajos/NAC Breda/NAC-Breda-Jaarrekening-2024-2025.pdf. brandColor #FFFF00
(procedencia en Admin/sourcing/Países Bajos/NAC Breda.md; tools/cargar-lote.mjs).
```

```text
data/nl/nacbreda-nl-data.js — NAC Breda B.V. (Países Bajos).
ALTA POR SCRIPT (tools/alta-club.mjs, 2026-10-19), SIN EJERCICIOS CARGADOS TODAVÍA: las estructuras del data file
nacen vacías a propósito. Los rubros, los totales oficiales y el resto del fiscalYearMeta los agrega la etapa de carga.

Documento que originó el alta: Clubes/Países Bajos/NAC Breda/NAC-Breda-Jaarrekening-2024-2025.pdf

De dónde salió cada campo (estado según alta-club.mjs: ok / pendiente):
  id                 ok        "nacbreda-nl" — slug de "NAC Breda" + '-nl' (convención de clubId, Admin/CONVENCIONES.md Versión 129)
  name               ok        "NAC Breda B.V." — la portada y lo más frecuente del .md coinciden (50 veces)
  displayName        ok        "NAC Breda" — nombre de la carpeta del club en Clubes/
  country            ok        "NL" — carpeta de país "Países Bajos" (tabla PAISES)
  reportingCurrency  ok        "EUR" — moneda de curso legal de Países Bajos
  fiscalYearStart    ok        "07-01" — cierre del ejercicio: contenido del .md (57 de 57 fechas de fin de mes caen en el mes 6)
  sport              ok        "futbol" — el .md nombra el fútbol 12 veces y ningún otro deporte más que eso
  brandColor         pendiente (ausente) — la liga del club no está en tools/brand-color-reference/ (o el club no está en footylogos)
  anio               ok        2025 — nombre del archivo (misma regla que onboard.mjs --quien), confirmado por las fechas de cierre del .md
  cierre             ok        "2025-06-30" — año del ejercicio + mes de cierre (contenido del .md (57 de 57 fechas de fin de mes caen en el mes 6))
  reportType         ok        "official_balance_sheet" — el .md tiene un estado contable (resultados / balance) y el nombre del archivo no sugiere otro tipo
  perimetro          ok        "individual" — el .md no presenta estados consolidados (1 menciones de "consolidado")
  currency           ok        "EUR" — moneda de curso legal de Países Bajos (tabla PAISES de alta-club.mjs)
  fxRef              ok        "EUR@2025-06-30" — el documento no declara tipo de cambio; FX_CLOSE ya tiene EUR@2025-06-30 = 0.8532 (Cierre BCE al 30/6/2025 (1 EUR = 1,172 USD))
  sourceId           ok        "nacbreda-nl-jaarrekening-2024-2025" — clubId + nombre del archivo en slug
  liga               ok        "nl-eredivisie" — roster cacheado de "2024–25 Eredivisie" (tools/club-league-reference/nl.json), coincidencia exacta "NAC Breda"

FISCAL YEAR META PROPUESTO para 2025 (NO registrado: un ejercicio con meta y
sin rubros se vería en el sitio como un año en cero, y "sin dato no es cero"):
  2025: {"reportType":"official_balance_sheet","currency":"EUR","fxRef":"EUR@2025-06-30","sourceId":"nacbreda-nl-jaarrekening-2024-2025"}
```

## 2025

### Ingresos

```text
2025: cargado por tools/cargar.mjs (2026-10-19) desde Clubes/Países Bajos/NAC Breda/NAC-Breda-Jaarrekening-2024-2025.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Países Bajos/NAC Breda/NAC-Breda-Jaarrekening-2024-2025.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Wedstrijdbaten | pág. 36, Claude 0.85 |
| 2 | Sponsoring | pág. 36, Jev 1 |
| 3 | Media gerelateerde baten | pág. 36, Jev 1 |
| 4 | Merchandising | pág. 36, Jev 0.99 |
| 5 | Food & Beverage | pág. 36, Jev 0.97 |
| 6 | Opleidingen | pág. 36, precedente |
| 7 | Overige baten | pág. 36, Jev 0.99 |
| 8 | Opbrengst vergoedingssommen | pág. 36, Jev 1 |
| 9 | Overige bedrijfsopbrengsten | pág. 16, Jev 1 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Wedstrijd- en trainingskosten | pág. 37, Jev 0.97 |
| 2 | Huisvestingkosten | pág. 37, precedente |
| 3 | Verkoopkosten | pág. 37, precedente |
| 4 | Overige kosten | pág. 37, Jev 0.98 |
| 5 | Brutoloon | pág. 37, precedente |
| 6 | Wedstrijdpremies | pág. 37, Jev 0.97 |
| 7 | Overige personeelskosten | pág. 37, precedente |
| 8 | Pensioenpremies | pág. 37, precedente |
| 9 | Sociale lasten | pág. 37, Jev 0.93 |
| 10 | Bedrijfsgebouwen en -terreinen | pág. 38, Jev 0.99 |
| 11 | Machines en installaties | pág. 38, Jev 0.98 |
| 12 | Andere vaste bedrijfsmiddelen | pág. 38, Jev 0.97 |
| 13 | Afschrijvingen vergoedingssommen clubs | pág. 38, Jev 1 |
| 14 | Afschrijvingen hand- en tekengelden | pág. 38, Jev 0.96 |
| 15 | Overige bedrijfskosten | pág. 16, Claude 0.85 |

### Meta

```text
tools/cargar.mjs (2026-10-19). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
alta-club.mjs (2026-10-19): nl-eredivisie, verificado contra roster cacheado de "2024–25 Eredivisie" (tools/club-league-reference/nl.json), coincidencia exacta "NAC Breda".
```

## Fuentes

### nacbreda-nl-jaarrekening-2024-2025

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-19) desde la transcripción Clubes/Países Bajos/NAC Breda/NAC-Breda-Jaarrekening-2024-2025.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```
