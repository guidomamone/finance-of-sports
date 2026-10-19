# fceindhoven-nl — evidencia de carga

Lo que antes iba como comentario en el data file del club, `data/<país>/fceindhoven-nl-data.js` (la regla: `Admin/CONVENCIONES-DATOS.md`, "data/<país>/<club>-data.js NO LLEVA
COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y meta. Las notas de cada fila van en una tabla con su número de
fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
FC Eindhoven: alta por tools/alta-club.mjs (2026-10-19) desde Clubes/Países Bajos/FC Eindhoven/wf-2024-2025-a6019b8e.pdf. brandColor #0000FF
(procedencia en Admin/sourcing/Países Bajos/FC Eindhoven.md; tools/cargar-lote.mjs).
```

```text
data/nl/fceindhoven-nl-data.js — Stichting FC Eindhoven (Países Bajos).
ALTA POR SCRIPT (tools/alta-club.mjs, 2026-10-19), SIN EJERCICIOS CARGADOS TODAVÍA: las estructuras del data file
nacen vacías a propósito. Los rubros, los totales oficiales y el resto del fiscalYearMeta los agrega la etapa de carga.

Documento que originó el alta: Clubes/Países Bajos/FC Eindhoven/wf-2024-2025-a6019b8e.pdf

De dónde salió cada campo (estado según alta-club.mjs: ok / pendiente):
  id                 ok        "fceindhoven-nl" — slug de "FC Eindhoven" + '-nl' (convención de clubId, Admin/CONVENCIONES.md Versión 129)
  name               ok        "Stichting FC Eindhoven" — respuesta de Guido en la cola (b67f18d)
  displayName        ok        "FC Eindhoven" — nombre de la carpeta del club en Clubes/
  country            ok        "NL" — carpeta de país "Países Bajos" (tabla PAISES)
  reportingCurrency  ok        "EUR" — moneda de curso legal de Países Bajos
  fiscalYearStart    ok        "07-01" — cierre del ejercicio: contenido del .md (81 de 85 fechas de fin de mes caen en el mes 6)
  sport              ok        "futbol" — el .md nombra el fútbol 7 veces y ningún otro deporte más que eso
  brandColor         pendiente (ausente) — la liga del club no está en tools/brand-color-reference/ (o el club no está en footylogos)
  anio               ok        2025 — nombre del archivo (misma regla que onboard.mjs --quien), confirmado por las fechas de cierre del .md
  cierre             ok        "2025-06-30" — año del ejercicio + mes de cierre (contenido del .md (81 de 85 fechas de fin de mes caen en el mes 6))
  reportType         ok        "official_balance_sheet" — el .md tiene un estado contable (resultados / balance) y el nombre del archivo no sugiere otro tipo
  perimetro          ok        "consolidado" — ajuste manual (Admin/registros/ajustes-manuales.jsonl, perimetro-senales 2026-10-18): perimetro-senales.mjs: el ejercicio 2025-06-30 se publicó solo c
  currency           ok        "EUR" — moneda de curso legal de Países Bajos (tabla PAISES de alta-club.mjs)
  fxRef              ok        "EUR@2025-06-30" — el documento no declara tipo de cambio; FX_CLOSE ya tiene EUR@2025-06-30 = 0.8532 (Cierre BCE al 30/6/2025 (1 EUR = 1,172 USD))
  sourceId           ok        "fceindhoven-nl-wf-2024-2025-a6019b8e" — clubId + nombre del archivo en slug
  liga               ok        "nl-eerstedivisie" — roster cacheado de "2024–25 Eerste Divisie" (tools/club-league-reference/nl.json), coincidencia exacta "Eindhoven"

FISCAL YEAR META PROPUESTO para 2025 (NO registrado: un ejercicio con meta y
sin rubros se vería en el sitio como un año en cero, y "sin dato no es cero"):
  2025: {"reportType":"official_balance_sheet","currency":"EUR","fxRef":"EUR@2025-06-30","sourceId":"fceindhoven-nl-wf-2024-2025-a6019b8e"}
```

## 2025

### Ingresos

```text
2025: cargado por tools/cargar.mjs (2026-10-19) desde Clubes/Países Bajos/FC Eindhoven/wf-2024-2025-a6019b8e.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Países Bajos/FC Eindhoven/wf-2024-2025-a6019b8e.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Wedstrijdbaten | pág. 28, Jev 0.98 |
| 2 | Sponsoring | pág. 28, Jev 1 |
| 3 | Media gerelateerde baten | pág. 28, Jev 1 |
| 4 | Merchandise | pág. 28, Jev 0.99 |
| 5 | Horeca | pág. 28, Jev 0.99 |
| 6 | Prijzengeld | pág. 28, Jev 1 |
| 7 | Subsidies | pág. 28, Jev 0.99 |
| 8 | Overige baten | pág. 28, Jev 0.99 |
| 9 | Resultaat vergoedingssommen | pág. 10, Jev 1 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Lonen en salarissen | pág. 28, precedente |
| 2 | Sociale lasten | pág. 28, Jev 0.92 |
| 3 | Pensioenlasten | pág. 28, precedente |
| 4 | Overige personeelskosten | pág. 28, Jev 0.96 |
| 5 | Vergoedingssommen | pág. 28, Jev 0.95 |
| 6 | Allocatie amortisatie vergoedingssommen | pág. 28, Jev 1 |
| 7 | Bedrijfsgebouwen en -terreinen | pág. 28, Claude 0.9 |
| 8 | Andere vaste bedrijfsmiddelen | pág. 28, Claude 0.9 |
| 9 | Huisvestingskosten | pág. 29, Jev 0.99 |
| 10 | Wedstrijd- en trainingskosten | pág. 29, Jev 0.91 |
| 11 | Verkoopkosten | pág. 29, Jev 1 |
| 12 | Algemene kosten | pág. 29, Jev 1 |

### Meta

```text
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, perimetro-senales 2026-10-18): perimetro = consolidado. perimetro-senales.mjs: el ejercicio 2025-06-30 se publicó solo consolidado (el club no tiene un perímetro único); 0 documento(s) con los dos estados votan —; 2 ejercicio(s) con un solo perímetro (consolidado); 3 documento(s) mirados
tools/cargar.mjs (2026-10-19). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
alta-club.mjs (2026-10-19): nl-eerstedivisie, verificado contra roster cacheado de "2024–25 Eerste Divisie" (tools/club-league-reference/nl.json), coincidencia exacta "Eindhoven".
```

## Fuentes

### fceindhoven-nl-wf-2024-2025-a6019b8e

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-19) desde la transcripción Clubes/Países Bajos/FC Eindhoven/wf-2024-2025-a6019b8e.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.
```
