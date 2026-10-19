# adodenhaag-nl — evidencia de carga

Lo que antes iba como comentario en el data file del club, `data/<país>/adodenhaag-nl-data.js` (la regla: `Admin/CONVENCIONES-DATOS.md`, "data/<país>/<club>-data.js NO LLEVA
COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y meta. Las notas de cada fila van en una tabla con su número de
fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
ADO Den Haag: alta por tools/alta-club.mjs (2026-10-19) desde Clubes/Países Bajos/ADO Den Haag/jaarrekening2024-25.pdf. brandColor #FFDE00
(procedencia en Admin/sourcing/Países Bajos/ADO Den Haag.md; tools/cargar-lote.mjs).
```

```text
data/nl/adodenhaag-nl-data.js — NV ADO Den Haag (Países Bajos).
ALTA POR SCRIPT (tools/alta-club.mjs, 2026-10-19), SIN EJERCICIOS CARGADOS TODAVÍA: las estructuras del data file
nacen vacías a propósito. Los rubros, los totales oficiales y el resto del fiscalYearMeta los agrega la etapa de carga.

Documento que originó el alta: Clubes/Países Bajos/ADO Den Haag/jaarrekening2024-25.pdf

De dónde salió cada campo (estado según alta-club.mjs: ok / pendiente):
  id                 ok        "adodenhaag-nl" — slug de "ADO Den Haag" + '-nl' (convención de clubId, Admin/CONVENCIONES.md Versión 129)
  name               ok        "NV ADO Den Haag" — respuesta de Guido en la cola (5d1f27d)
  displayName        ok        "ADO Den Haag" — nombre de la carpeta del club en Clubes/
  country            ok        "NL" — carpeta de país "Países Bajos" (tabla PAISES)
  reportingCurrency  ok        "EUR" — moneda de curso legal de Países Bajos
  fiscalYearStart    ok        "07-01" — cierre del ejercicio: contenido del .md (5 de 6 fechas de fin de mes caen en el mes 6)
  sport              ok        "futbol" — el .md nombra el fútbol 6 veces y ningún otro deporte más que eso
  brandColor         pendiente (ausente) — la liga del club no está en tools/brand-color-reference/ (o el club no está en footylogos)
  anio               ok        2025 — nombre del archivo (misma regla que onboard.mjs --quien), confirmado por las fechas de cierre del .md
  cierre             ok        "2025-06-30" — año del ejercicio + mes de cierre (contenido del .md (5 de 6 fechas de fin de mes caen en el mes 6))
  reportType         ok        "official_balance_sheet" — el .md tiene un estado contable (resultados / balance) y el nombre del archivo no sugiere otro tipo
  perimetro          ok        "consolidado" — ajuste manual (Admin/registros/ajustes-manuales.jsonl, perimetro-senales 2026-10-18): perimetro-senales.mjs: 0 documento(s) con los dos estados votan 
  currency           ok        "EUR" — moneda de curso legal de Países Bajos (tabla PAISES de alta-club.mjs)
  fxRef              ok        "EUR@2025-06-30" — el documento no declara tipo de cambio; FX_CLOSE ya tiene EUR@2025-06-30 = 0.8532 (Cierre BCE al 30/6/2025 (1 EUR = 1,172 USD))
  sourceId           ok        "adodenhaag-nl-jaarrekening2024-25" — clubId + nombre del archivo en slug
  liga               ok        "nl-eerstedivisie" — roster cacheado de "2024–25 Eerste Divisie" (tools/club-league-reference/nl.json), coincidencia exacta "ADO Den Haag"

FISCAL YEAR META PROPUESTO para 2025 (NO registrado: un ejercicio con meta y
sin rubros se vería en el sitio como un año en cero, y "sin dato no es cero"):
  2025: {"reportType":"official_balance_sheet","currency":"EUR","fxRef":"EUR@2025-06-30","sourceId":"adodenhaag-nl-jaarrekening2024-25"}
```

## 2025

### Ingresos

```text
2025: cargado por tools/cargar.mjs (2026-10-19) desde Clubes/Países Bajos/ADO Den Haag/jaarrekening2024-25.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Países Bajos/ADO Den Haag/jaarrekening2024-25.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Wedstrijdbaten | pág. 16, Jev 0.91 |
| 2 | Sponsoring | pág. 16, Jev 1 |
| 3 | Media gerelateerde baten | pág. 16, Jev 1 |
| 4 | Prijzengeld | pág. 16, Jev 1 |
| 5 | Horeca | pág. 16, Jev 0.99 |
| 6 | Merchandise | pág. 16, Jev 0.98 |
| 7 | Subsidies en giften | pág. 16, Jev 0.99 |
| 8 | Overige baten | pág. 16, Jev 0.99 |
| 9 | Resultaat vergoedingssommen | pág. 13, Jev 1 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Lonen en salarissen | pág. 16, Jev 0.96 |
| 2 | Sociale lasten | pág. 16, Jev 0.91 |
| 3 | Pensioenlasten | pág. 16, precedente |
| 4 | Overige personeelskosten | pág. 16, Jev 0.93 |
| 5 | Vergoedingssommen | pág. 16, Jev 1 |
| 6 | Software | pág. 16, Claude 0.85 |
| 7 | Goodwill | pág. 16, Jev 0.99 |
| 8 | Allocatie amortisatie vergoedingssommen | pág. 16, Jev 0.98 |
| 9 | Materiële vaste activa | pág. 16, Claude 0.92 |
| 10 | Huisvestingskosten | pág. 17, Jev 0.99 |
| 11 | Wedstrijd- en trainingskosten | pág. 17, Jev 0.96 |
| 12 | Verkoopkosten | pág. 17, precedente |
| 13 | Algemene kosten | pág. 17, Jev 1 |

### Meta

```text
tools/cargar.mjs (2026-10-19). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
alta-club.mjs (2026-10-19): nl-eerstedivisie, verificado contra roster cacheado de "2024–25 Eerste Divisie" (tools/club-league-reference/nl.json), coincidencia exacta "ADO Den Haag".
```

## Fuentes

### adodenhaag-nl-jaarrekening2024-25

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-19) desde la transcripción Clubes/Países Bajos/ADO Den Haag/jaarrekening2024-25.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.
```
