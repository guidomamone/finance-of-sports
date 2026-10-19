# valerenga-no — evidencia de carga

Lo que antes iba como comentario en el data file del club, `data/<país>/valerenga-no-data.js` (la regla: `Admin/CONVENCIONES-DATOS.md`, "data/<país>/<club>-data.js NO LLEVA
COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y meta. Las notas de cada fila van en una tabla con su número de
fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
Vålerenga: alta por tools/alta-club.mjs (2026-10-19) desde Clubes/Noruega/Vålerenga/aarsregnskap-valerenga-fotball-as-2025.pdf. brandColor #034EA2
(procedencia en Admin/sourcing/Noruega/Vålerenga.md; tools/cargar-lote.mjs).
```

```text
data/no/valerenga-no-data.js — Vålerenga Fotball AS (Noruega).
ALTA POR SCRIPT (tools/alta-club.mjs, 2026-10-19), SIN EJERCICIOS CARGADOS TODAVÍA: las estructuras del data file
nacen vacías a propósito. Los rubros, los totales oficiales y el resto del fiscalYearMeta los agrega la etapa de carga.

Documento que originó el alta: Clubes/Noruega/Vålerenga/aarsregnskap-valerenga-fotball-as-2025.pdf

De dónde salió cada campo (estado según alta-club.mjs: ok / pendiente):
  id                 ok        "valerenga-no" — slug de "Vålerenga" + '-no' (convención de clubId, Admin/CONVENCIONES.md Versión 129)
  name               ok        "Vålerenga Fotball AS" — ajuste manual (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-18): Guido 2026-10-18: el club es el AS (todo el ingreso comercial), como Viking
  displayName        ok        "Vålerenga" — nombre de la carpeta del club en Clubes/
  country            ok        "NO" — carpeta de país "Noruega" (tabla PAISES)
  reportingCurrency  ok        "NOK" — moneda de curso legal de Noruega
  fiscalYearStart    ok        "01-01" — cierre del ejercicio: contenido del .md (5 de 5 fechas de fin de mes caen en el mes 12)
  sport              ok        "futbol" — el .md nombra el fútbol 22 veces y ningún otro deporte más que eso
  brandColor         pendiente (ausente) — la liga del club no está en tools/brand-color-reference/ (o el club no está en footylogos)
  anio               ok        2025 — nombre del archivo (misma regla que onboard.mjs --quien), confirmado por las fechas de cierre del .md
  cierre             ok        "2025-12-31" — año del ejercicio + mes de cierre (contenido del .md (5 de 5 fechas de fin de mes caen en el mes 12))
  reportType         ok        "official_balance_sheet" — el .md tiene un estado contable (resultados / balance) y el nombre del archivo no sugiere otro tipo
  perimetro          ok        "individual" — ajuste manual (Admin/registros/ajustes-manuales.jsonl, perimetro-senales 2026-10-18): perimetro-senales.mjs: el ejercicio 2025-12-31 se publicó solo i
  currency           ok        "NOK" — moneda de curso legal de Noruega (tabla PAISES de alta-club.mjs)
  fxRef              ok        "NOK@2025-12-31" — el documento no declara tipo de cambio; FX_CLOSE ya tiene NOK@2025-12-31 = 10.0791 (Tipo medio de referencia de Norges Bank al 2025-12-31)
  sourceId           ok        "valerenga-no-aarsregnskap-valerenga-fotball-as-2025" — clubId + nombre del archivo en slug
  liga               ok        "no-eliteserien" — roster cacheado de "2025 Eliteserien" (tools/club-league-reference/no.json), coincidencia exacta "Vålerenga"

FISCAL YEAR META PROPUESTO para 2025 (NO registrado: un ejercicio con meta y
sin rubros se vería en el sitio como un año en cero, y "sin dato no es cero"):
  2025: {"reportType":"official_balance_sheet","currency":"NOK","fxRef":"NOK@2025-12-31","sourceId":"valerenga-no-aarsregnskap-valerenga-fotball-as-2025"}
```

## 2025

### Ingresos

```text
2025: cargado por tools/cargar.mjs (2026-10-19) desde Clubes/Noruega/Vålerenga/aarsregnskap-valerenga-fotball-as-2025.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Noruega/Vålerenga/aarsregnskap-valerenga-fotball-as-2025.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Sponsorinntekter | pág. 8, Jev 1 |
| 2 | Markeds- og medieinntekter | pág. 8, precedente |
| 3 | Billettsalg | pág. 8, Jev 1 |
| 4 | Viderefakturert | pág. 8, Claude 0.8 |
| 5 | Diverse inntekter | pág. 8, Jev 1 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Varekostnad | pág. 2, Jev 0.99 |
| 2 | Lønninger | pág. 8, Jev 1 |
| 3 | Arbeidsgiveravgift | pág. 8, precedente |
| 4 | Pensjonskostnader | pág. 8, precedente |
| 5 | Andre ytelser | pág. 8, precedente |
| 6 | Avskrivning av driftsmidler | pág. 2, Jev 1 |
| 7 | Nedskrivning av varige driftsmidler og immaterielle eiendeler | pág. 2, precedente |
| 8 | Annen driftskostnad | pág. 2, Claude 0.85 |

### Meta

```text
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, perimetro-senales 2026-10-18): perimetro = individual. perimetro-senales.mjs: el ejercicio 2025-12-31 se publicó solo individual (el club no tiene un perímetro único); 0 documento(s) con los dos estados votan —; 1 ejercicio(s) con un solo perímetro (individual); 3 documento(s) mirados
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-19): fila = -38 377 510. costo financiero leído como ingreso: 70.103.790 - 38.377.510 y el resultado cierra en 2.596.666 (revisado por Claude contra el .md, 2026-10-18; ajuste a mano por decisión de Guido hasta la mejora del script (298 y))
tools/cargar.mjs (2026-10-19). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
alta-club.mjs (2026-10-19): no-eliteserien, verificado contra roster cacheado de "2025 Eliteserien" (tools/club-league-reference/no.json), coincidencia exacta "Vålerenga".
```

## Fuentes

### valerenga-no-aarsregnskap-valerenga-fotball-as-2025

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-19) desde la transcripción Clubes/Noruega/Vålerenga/aarsregnskap-valerenga-fotball-as-2025.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```
