# telstar-nl — evidencia de carga

Lo que antes iba como comentario en el data file del club, `data/<país>/telstar-nl-data.js` (la regla: `Admin/CONVENCIONES-DATOS.md`, "data/<país>/<club>-data.js NO LLEVA
COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y meta. Las notas de cada fila van en una tabla con su número de
fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
Telstar: alta por tools/alta-club.mjs (2026-10-19) desde Clubes/Países Bajos/Telstar/Telstar-Jaarverslag-2024-2025-full.pdf. brandColor:null a propósito
(procedencia en Admin/sourcing/Países Bajos/Telstar.md; tools/cargar-lote.mjs).
```

```text
data/nl/telstar-nl-data.js — Telstar 1963 N.V. (Países Bajos).
ALTA POR SCRIPT (tools/alta-club.mjs, 2026-10-19), SIN EJERCICIOS CARGADOS TODAVÍA: las estructuras del data file
nacen vacías a propósito. Los rubros, los totales oficiales y el resto del fiscalYearMeta los agrega la etapa de carga.

Documento que originó el alta: Clubes/Países Bajos/Telstar/Telstar-Jaarverslag-2024-2025-full.pdf

De dónde salió cada campo (estado según alta-club.mjs: ok / pendiente):
  id                 ok        "telstar-nl" — slug de "Telstar" + '-nl' (convención de clubId, Admin/CONVENCIONES.md Versión 129)
  name               ok        "Telstar 1963 N.V." — la portada y lo más frecuente del .md coinciden (33 veces)
  displayName        ok        "Telstar" — nombre de la carpeta del club en Clubes/
  country            ok        "NL" — carpeta de país "Países Bajos" (tabla PAISES)
  reportingCurrency  ok        "EUR" — moneda de curso legal de Países Bajos
  fiscalYearStart    ok        "07-01" — cierre del ejercicio: ajuste manual (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-09): Revisión del alta (Claude, 2026-10-09): jaarrekening 2
  sport              ok        "futbol" — el .md nombra el fútbol 15 veces y ningún otro deporte más que eso
  brandColor         pendiente (ausente) — la liga del club no está en tools/brand-color-reference/ (o el club no está en footylogos)
  anio               ok        2025 — ajuste manual (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-09): Revisión del alta (Claude, 2026-10-09): jaarrekening 2024-2025, balans per 3
  cierre             ok        "2025-06-30" — año del ejercicio + mes de cierre (ajuste manual (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-09): Revisión del alta (Claude, 2026-10-09): j
  reportType         ok        "official_balance_sheet" — el .md tiene un estado contable (resultados / balance) y el nombre del archivo no sugiere otro tipo
  perimetro          ok        "individual" — ajuste manual (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-09): Revisión del alta (Claude, 2026-10-09): un solo jaarrekening, de Telstar 196
  currency           ok        "EUR" — moneda de curso legal de Países Bajos (tabla PAISES de alta-club.mjs)
  fxRef              ok        "EUR@2025-06-30" — el documento no declara tipo de cambio; FX_CLOSE ya tiene EUR@2025-06-30 = 0.8532 (Cierre BCE al 30/6/2025 (1 EUR = 1,172 USD))
  sourceId           ok        "telstar-nl-jaarverslag-2024-2025-full" — clubId + nombre del archivo en slug
  liga               ok        "nl-eerstedivisie" — roster cacheado de "2024–25 Eerste Divisie" (tools/club-league-reference/nl.json), coincidencia exacta "Telstar"

FISCAL YEAR META PROPUESTO para 2025 (NO registrado: un ejercicio con meta y
sin rubros se vería en el sitio como un año en cero, y "sin dato no es cero"):
  2025: {"reportType":"official_balance_sheet","currency":"EUR","fxRef":"EUR@2025-06-30","sourceId":"telstar-nl-jaarverslag-2024-2025-full"}
```

## 2025

### Ingresos

```text
2025: cargado por tools/cargar.mjs (2026-10-19) desde Clubes/Países Bajos/Telstar/Telstar-Jaarverslag-2024-2025-full.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Países Bajos/Telstar/Telstar-Jaarverslag-2024-2025-full.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Wedstrijdbaten | pág. 22, Claude 0.85 |
| 2 | Sponsoring | pág. 22, Jev 1 |
| 3 | Media gerelateerde baten | pág. 22, Jev 1 |
| 4 | Merchandising & Business to Consumer activiteiten | pág. 22, Jev 1 |
| 5 | Food & Beverage | pág. 22, Jev 0.96 |
| 6 | Resultaat vergoedingssommen | pág. 22, Jev 1 |
| 7 | Overige baten | pág. 22, Jev 0.99 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Lonen en salarissen | pág. 22, Claude 0.8 |
| 2 | Sociale lasten | pág. 22, Jev 0.92 |
| 3 | Pensioenlasten | pág. 22, precedente |
| 4 | Overige | pág. 22, Jev 0.95 |
| 5 | Bedrijfsgebouwen en -terreinen | pág. 22, Jev 0.97 |
| 6 | Overige bedrijfsmiddelen | pág. 22, Claude 0.92 |
| 7 | Kostprijs Food & Beverage | pág. 23, precedente |
| 8 | Kostprijs merchandise | pág. 23, precedente |
| 9 | Verkoop | pág. 23, precedente |
| 10 | Overige | pág. 23, Jev 0.95 |
| 11 | Huur | pág. 23, precedente |
| 12 | Onderhoud | pág. 23, Jev 0.9 |
| 13 | Gas, water en electra | pág. 23, Jev 0.97 |
| 14 | Schoonmaakkosten | pág. 23, Jev 0.95 |
| 15 | Belastingen en zakelijke lasten | pág. 23, Jev 0.96 |
| 16 | Overige huisvestingskosten | pág. 23, Jev 0.99 |
| 17 | Wedstrijd- en trainingskosten | pág. 23, Claude 0.8 |
| 18 | Algemene kosten | pág. 23, Jev 1 |

### Meta

```text
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-09): cierre = 2025-06-30. Revisión del alta (Claude, 2026-10-09): jaarrekening 2024-2025, balans per 30 juni 2025
tools/cargar.mjs (2026-10-19). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
alta-club.mjs (2026-10-19): nl-eerstedivisie, verificado contra roster cacheado de "2024–25 Eerste Divisie" (tools/club-league-reference/nl.json), coincidencia exacta "Telstar".
```

## Fuentes

### telstar-nl-jaarverslag-2024-2025-full

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-19) desde la transcripción Clubes/Países Bajos/Telstar/Telstar-Jaarverslag-2024-2025-full.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```
