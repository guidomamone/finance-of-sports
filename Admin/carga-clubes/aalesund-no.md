# aalesund-no — evidencia de carga

Lo que antes iba como comentario en el data file del club, `data/<país>/aalesund-no-data.js` (la regla: `Admin/CONVENCIONES-DATOS.md`, "data/<país>/<club>-data.js NO LLEVA
COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y meta. Las notas de cada fila van en una tabla con su número de
fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
Aalesund: alta por tools/alta-club.mjs (2026-10-19) desde Clubes/Noruega/Aalesund/aarsregnskap-aalesund-fotball-as-2025.pdf. brandColor #FE7812
(procedencia en Admin/sourcing/Noruega/Aalesund.md; tools/cargar-lote.mjs).
```

```text
data/no/aalesund-no-data.js — Ålesund Fotball AS (Noruega).
ALTA POR SCRIPT (tools/alta-club.mjs, 2026-10-19), SIN EJERCICIOS CARGADOS TODAVÍA: las estructuras del data file
nacen vacías a propósito. Los rubros, los totales oficiales y el resto del fiscalYearMeta los agrega la etapa de carga.

Documento que originó el alta: Clubes/Noruega/Aalesund/aarsregnskap-aalesund-fotball-as-2025.pdf

De dónde salió cada campo (estado según alta-club.mjs: ok / pendiente):
  id                 ok        "aalesund-no" — slug de "Aalesund" + '-no' (convención de clubId, Admin/CONVENCIONES.md Versión 129)
  name               ok        "Ålesund Fotball AS" — ajuste manual (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-18): Guido 2026-10-18: el club es el AS (ingresos y derechos comerciales), como 
  displayName        ok        "Aalesund" — nombre de la carpeta del club en Clubes/
  country            ok        "NO" — carpeta de país "Noruega" (tabla PAISES)
  reportingCurrency  ok        "NOK" — moneda de curso legal de Noruega
  fiscalYearStart    ok        "01-01" — el documento más reciente del club (aarsregnskap-aalesund-fotball-as-2025.md, cierre mes 12): el cierre CAMBIÓ en el tiempo (mes 12: 2008,2008,2009,20
  sport              ok        "futbol" — el .md nombra el fútbol 85 veces y ningún otro deporte más que eso
  brandColor         pendiente (ausente) — la liga del club no está en tools/brand-color-reference/ (o el club no está en footylogos)
  anio               ok        2025 — nombre del archivo (misma regla que onboard.mjs --quien), confirmado por las fechas de cierre del .md
  cierre             ok        "2025-12-31" — año del ejercicio + mes de cierre (contenido del .md (3 de 4 fechas de fin de mes caen en el mes 12))
  reportType         ok        "official_balance_sheet" — el .md tiene un estado contable (resultados / balance) y el nombre del archivo no sugiere otro tipo
  perimetro          ok        "individual" — ajuste manual (Admin/registros/ajustes-manuales.jsonl, perimetro-senales 2026-10-18): perimetro-senales.mjs: el ejercicio 2025-12-31 se publicó solo i
  currency           ok        "NOK" — moneda de curso legal de Noruega (tabla PAISES de alta-club.mjs)
  fxRef              ok        "NOK@2025-12-31" — el documento no declara tipo de cambio; FX_CLOSE ya tiene NOK@2025-12-31 = 10.0791 (Tipo medio de referencia de Norges Bank al 2025-12-31)
  sourceId           ok        "aalesund-no-aarsregnskap-aalesund-fotball-as-2025" — clubId + nombre del archivo en slug
  liga               ok        "no-1divisjon" — roster cacheado de "2025 Norwegian First Division" (tools/club-league-reference/no.json), coincidencia exacta "Aalesund"

FISCAL YEAR META PROPUESTO para 2025 (NO registrado: un ejercicio con meta y
sin rubros se vería en el sitio como un año en cero, y "sin dato no es cero"):
  2025: {"reportType":"official_balance_sheet","currency":"NOK","fxRef":"NOK@2025-12-31","sourceId":"aalesund-no-aarsregnskap-aalesund-fotball-as-2025"}
```

## 2025

### Ingresos

```text
2025: cargado por tools/cargar.mjs (2026-10-19) desde Clubes/Noruega/Aalesund/aarsregnskap-aalesund-fotball-as-2025.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Noruega/Aalesund/aarsregnskap-aalesund-fotball-as-2025.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Salgsinntekter | pág. 15, precedente |
| 2 | Andre driftsinntekter | pág. 15, Jev 0.99 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Varekostnad | pág. 15, precedente |
| 2 | Lønninger | pág. 19, Jev 0.99 |
| 3 | Arbeidsgiveravgift | pág. 19, precedente |
| 4 | Pensjonskostnader | pág. 19, precedente |
| 5 | Andre ytelser | pág. 19, precedente |
| 6 | Avskrivning varige driftsmidler og immaterielle eiendeler | pág. 15, Jev 0.98 |
| 7 | Annen driftskostnad | pág. 15, Jev 0.92 |

### Meta

```text
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, perimetro-senales 2026-10-18): perimetro = individual. perimetro-senales.mjs: el ejercicio 2025-12-31 se publicó solo individual (el club no tiene un perímetro único); 0 documento(s) con los dos estados votan —; 16 ejercicio(s) con un solo perímetro (individual); 34 documento(s) mirados
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-19): fila = -7 004. costo financiero leído como ingreso (Sum finanskostnader 77.934) (revisado por Claude contra el .md, 2026-10-18; ajuste a mano por decisión de Guido hasta la mejora del script (298 y))
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-19): fila = -70 930. costo financiero leído como ingreso: el resultado cierra en 1.514.820 (1 de redondeo) (revisado por Claude contra el .md, 2026-10-18; ajuste a mano por decisión de Guido hasta la mejora del script (298 y))
tools/cargar.mjs (2026-10-19). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee.
```

### Liga

```text
alta-club.mjs (2026-10-19): no-1divisjon, verificado contra roster cacheado de "2025 Norwegian First Division" (tools/club-league-reference/no.json), coincidencia exacta "Aalesund".
```

## 2018

### Ingresos

```text
2018: cargado por tools/cargar.mjs (2026-10-25) desde Clubes/Noruega/Aalesund/aarsregnskap-aalesund-fotball-as-2018.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Noruega/Aalesund/aarsregnskap-aalesund-fotball-as-2018.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Driftsinntekter | pág. 6, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Varekostnad | pág. 6, precedente |
| 2 | Lønninger | pág. 18, precedente |
| 3 | Arbeidsgiveravgift | pág. 18, precedente |
| 4 | Pensjonskostnader | pág. 18, precedente |
| 5 | Andre ytelser | pág. 18, precedente |
| 6 | Avskrivning varige driftsmidler | pág. 6, Jev 1 |
| 7 | Annen driftskostnad | pág. 6, precedente |

### Meta

```text
2018: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, perimetro-senales 2026-10-18): perimetro = individual. perimetro-senales.mjs: el ejercicio 2018-12-31 se publicó solo individual (el club no tiene un perímetro único); 0 documento(s) con los dos estados votan —; 16 ejercicio(s) con un solo perímetro (individual); 34 documento(s) mirados
tools/cargar.mjs (2026-10-25). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"), con su tipo; la página marca «s/d» en las categorías que esa línea esconde y explica el caso en «Notas sobre este club».
```

### Liga

```text
tools/cargar.mjs (2026-10-25): no-1divisjon, verificado contra roster cacheado de "2018 Norwegian First Division" (tools/club-league-reference/no.json), coincidencia exacta "Aalesund".
```

## Fuentes

### aalesund-no-aarsregnskap-aalesund-fotball-as-2025

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-19) desde la transcripción Clubes/Noruega/Aalesund/aarsregnskap-aalesund-fotball-as-2025.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### aalesund-no-aarsregnskap-aalesund-fotball-as-2018

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-25) desde la transcripción Clubes/Noruega/Aalesund/aarsregnskap-aalesund-fotball-as-2018.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```
