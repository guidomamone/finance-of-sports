# sarpsborg08-no — evidencia de carga

Lo que antes iba como comentario en el data file del club, `data/<país>/sarpsborg08-no-data.js` (la regla: `Admin/CONVENCIONES-DATOS.md`, "data/<país>/<club>-data.js NO LLEVA
COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y meta. Las notas de cada fila van en una tabla con su número de
fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
Sarpsborg 08: alta por tools/alta-club.mjs (2026-10-19) desde Clubes/Noruega/Sarpsborg 08/aarsregnskap-fotballforening-fli-2025.pdf. brandColor #2747A3
(procedencia en Admin/sourcing/Noruega/Sarpsborg 08.md; tools/cargar-lote.mjs).
```

```text
data/no/sarpsborg08-no-data.js — Sarpsborg 08 Fotballforening (Noruega).
ALTA POR SCRIPT (tools/alta-club.mjs, 2026-10-19), SIN EJERCICIOS CARGADOS TODAVÍA: las estructuras del data file
nacen vacías a propósito. Los rubros, los totales oficiales y el resto del fiscalYearMeta los agrega la etapa de carga.

Documento que originó el alta: Clubes/Noruega/Sarpsborg 08/aarsregnskap-fotballforening-fli-2025.pdf

De dónde salió cada campo (estado según alta-club.mjs: ok / pendiente):
  id                 ok        "sarpsborg08-no" — slug de "Sarpsborg 08" + '-no' (convención de clubId, Admin/CONVENCIONES.md Versión 129)
  name               ok        "Sarpsborg 08 Fotballforening" — ajuste manual (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-19): to-do 284: el club es el FLI (org. 986 400 362), no Sarpsborg Fotball Inves
  displayName        ok        "Sarpsborg 08" — nombre de la carpeta del club en Clubes/
  country            ok        "NO" — carpeta de país "Noruega" (tabla PAISES)
  reportingCurrency  ok        "NOK" — moneda de curso legal de Noruega
  fiscalYearStart    ok        "01-01" — cierre del ejercicio: contenido del .md (22 de 22 fechas de fin de mes caen en el mes 12)
  sport              ok        "futbol" — el .md nombra el fútbol 58 veces y ningún otro deporte más que eso
  brandColor         pendiente (ausente) — la liga del club no está en tools/brand-color-reference/ (o el club no está en footylogos)
  anio               ok        2025 — nombre del archivo (misma regla que onboard.mjs --quien), confirmado por las fechas de cierre del .md
  cierre             ok        "2025-12-31" — año del ejercicio + mes de cierre (contenido del .md (22 de 22 fechas de fin de mes caen en el mes 12))
  reportType         ok        "official_balance_sheet" — el .md tiene un estado contable (resultados / balance) y el nombre del archivo no sugiere otro tipo
  perimetro          ok        "individual" — ajuste manual (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-19): la controlada es Prozo AS (100%, comprada en 2021), un negocio comercial ap
  currency           ok        "NOK" — moneda de curso legal de Noruega (tabla PAISES de alta-club.mjs)
  fxRef              ok        "NOK@2025-12-31" — el documento no declara tipo de cambio; FX_CLOSE ya tiene NOK@2025-12-31 = 10.0791 (Tipo medio de referencia de Norges Bank al 2025-12-31)
  sourceId           ok        "sarpsborg08-no-aarsregnskap-fotballforening-fli-2025" — clubId + nombre del archivo en slug
  liga               ok        "no-eliteserien" — roster cacheado de "2025 Eliteserien" (tools/club-league-reference/no.json), coincidencia exacta "Sarpsborg 08"

FISCAL YEAR META PROPUESTO para 2025 (NO registrado: un ejercicio con meta y
sin rubros se vería en el sitio como un año en cero, y "sin dato no es cero"):
  2025: {"reportType":"official_balance_sheet","currency":"NOK","fxRef":"NOK@2025-12-31","sourceId":"sarpsborg08-no-aarsregnskap-fotballforening-fli-2025"}
```

## 2025

### Ingresos

```text
2025: cargado por tools/cargar.mjs (2026-10-19) desde Clubes/Noruega/Sarpsborg 08/aarsregnskap-fotballforening-fli-2025.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Noruega/Sarpsborg 08/aarsregnskap-fotballforening-fli-2025.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Billetinntekter | pág. 34, Jev 1 |
| 2 | Medlemsinntekter | pág. 34, Jev 1 |
| 3 | Andre salgsinntekter | pág. 34, precedente |
| 4 | Andre inntekter | pág. 34, Jev 0.99 |
| 5 | Reklame- og sponsorinntekter | pág. 34, Jev 1 |
| 6 | Mediainntekter | pág. 34, Jev 1 |
| 7 | Tilskudd | pág. 34, Jev 0.99 |
| 8 | Salg/utleie spillere | pág. 34, Jev 1 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Trening, matriell, kamp kostn. | pág. 34, precedente |
| 2 | Reise- og oppholdskostnader bortekamper | pág. 34, Jev 1 |
| 3 | Salgskostnader | pág. 34, precedente |
| 4 | Lønninger | pág. 39, precedente |
| 5 | Arbeidsgiveravgift | pág. 39, precedente |
| 6 | Pensjonskostnader | pág. 39, precedente |
| 7 | Andre ytelser | pág. 39, precedente |
| 8 | Avskrivning av driftsmidler og immaterielle eiendeler | pág. 34, Jev 0.97 |
| 9 | Andre kostnader | pág. 34, Jev 1 |
| 10 | Reklame- og sponsorkostnader | pág. 34, Jev 0.99 |
| 11 | Admkost | pág. 34, Jev 1 |

### Meta

```text
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-19): perimetro = individual. la controlada es Prozo AS (100%, comprada en 2021), un negocio comercial aparte que no es el fútbol del club; Sarpsborg Stadion AS no tuvo actividad y se liquidó en 2025
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-19): fila = -1 132 192. costo financiero leído como ingreso (revisado por Claude contra el .md, 2026-10-18; ajuste a mano por decisión de Guido hasta la mejora del script (298 y))
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-19): fila = -1 978 517. costo financiero leído como ingreso: Resultat av finansposter -1.165.401 y el resultado cierra en 16.482.693 (revisado por Claude contra el .md, 2026-10-18; ajuste a mano por decisión de Guido hasta la mejora del script (298 y))
tools/cargar.mjs (2026-10-19). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
alta-club.mjs (2026-10-19): no-eliteserien, verificado contra roster cacheado de "2025 Eliteserien" (tools/club-league-reference/no.json), coincidencia exacta "Sarpsborg 08".
```

## Fuentes

### sarpsborg08-no-aarsregnskap-fotballforening-fli-2025

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-19) desde la transcripción Clubes/Noruega/Sarpsborg 08/aarsregnskap-fotballforening-fli-2025.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```
