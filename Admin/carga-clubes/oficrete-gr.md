# oficrete-gr — evidencia de carga

Lo que antes iba como comentario en el data file del club, `data/<país>/oficrete-gr-data.js` (la regla: `Admin/CONVENCIONES-DATOS.md`, "data/<país>/<club>-data.js NO LLEVA
COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y meta. Las notas de cada fila van en una tabla con su número de
fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
OFI Crete: alta por tools/alta-club.mjs (2026-10-13) desde Clubes/Grecia/OFI Crete/OFI_income_stmt_2018-06-30.pdf. brandColor:null a propósito
(procedencia en Admin/sourcing/Grecia/OFI Crete.md; tools/cargar-lote.mjs).
```

```text
data/gr/oficrete-gr-data.js — Omilos Filathlon Irakleiou P.A.E. OFI 1925 (Grecia).
ALTA POR SCRIPT (tools/alta-club.mjs, 2026-10-13), SIN EJERCICIOS CARGADOS TODAVÍA: las estructuras del data file
nacen vacías a propósito. Los rubros, los totales oficiales y el resto del fiscalYearMeta los agrega la etapa de carga.

Documento que originó el alta: Clubes/Grecia/OFI Crete/OFI_income_stmt_2018-06-30.pdf

De dónde salió cada campo (estado según alta-club.mjs: ok / pendiente):
  id                 ok        "oficrete-gr" — slug de "OFI Crete" + '-gr' (convención de clubId, Admin/CONVENCIONES.md Versión 129)
  name               ok        "Omilos Filathlon Irakleiou P.A.E. OFI 1925" — ajuste manual (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-09): Revisión del alta (Claude, 2026-10-09): razón social del documento (ΟΜΙΛΟΣ Φ
  displayName        ok        "OFI Crete" — nombre de la carpeta del club en Clubes/
  country            ok        "GR" — carpeta de país "Grecia" (tabla PAISES)
  reportingCurrency  ok        "EUR" — moneda de curso legal de Grecia
  fiscalYearStart    ok        "07-01" — cierre del ejercicio: nombre del archivo (2018-06-30) y contenido del .md (2 de 2 fechas de fin de mes)
  sport              ok        "futbol" — el .md nombra el fútbol 0 veces y ningún otro deporte más que eso
  brandColor         pendiente (ausente) — la liga del club no está en tools/brand-color-reference/ (o el club no está en footylogos)
  anio               ok        2018 — nombre del archivo (misma regla que onboard.mjs --quien)
  cierre             ok        "2018-06-30" — año del ejercicio + mes de cierre (nombre del archivo (2018-06-30) y contenido del .md (2 de 2 fechas de fin de mes))
  reportType         ok        "official_balance_sheet" — el .md tiene un estado contable (resultados / balance) y el nombre del archivo no sugiere otro tipo
  perimetro          ok        "individual" — el .md no presenta estados consolidados (0 menciones de "consolidado")
  currency           ok        "EUR" — moneda de curso legal de Grecia (tabla PAISES de alta-club.mjs)
  fxRef              ok        "EUR@2018-06-30" — el documento no declara tipo de cambio; FX_CLOSE ya tiene EUR@2018-06-30 = 0.85778 (Tipo de referencia del Banco Central Europeo, última rueda hábil a
  sourceId           ok        "oficrete-gr-ofi-income-stmt-2018-06-30" — clubId + nombre del archivo en slug
  liga               ok        "gr-superleague2" — roster cacheado de "2017–18 Football League (Greece)" (tools/club-league-reference/gr.json), coincidencia única por palabras "OFI" = "OFI Crete"

FISCAL YEAR META PROPUESTO para 2018 (NO registrado: un ejercicio con meta y
sin rubros se vería en el sitio como un año en cero, y "sin dato no es cero"):
  2018: {"reportType":"official_balance_sheet","currency":"EUR","fxRef":"EUR@2018-06-30","sourceId":"oficrete-gr-ofi-income-stmt-2018-06-30"}
```

## 2025

### Ingresos

```text
2025: cargado por tools/cargar.mjs (2026-10-13) desde Clubes/Grecia/OFI Crete/OFI_FS_2025-06-30.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Grecia/OFI Crete/OFI_FS_2025-06-30.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Κύκλος εργασιών (καθαρός) | pág. 8, Jev 0.99 |
| 2 | Λοιπά συνήθη έσοδα | pág. 8, Jev 1 |
| 3 | Λοιπά έσοδα και κέρδη | pág. 8, Jev 1 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Κόστος πωλήσεων | pág. 8, precedente |
| 2 | Έξοδα διάθεσης | pág. 8, Jev 1 |
| 3 | Έξοδα διοίκησης | pág. 8, Jev 1 |
| 4 | Λοιπά έξοδα και ζημίες | pág. 8, Jev 0.95 |

### Meta

```text
tools/cargar.mjs (2026-10-13). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee.
```

### Liga

```text
tools/cargar.mjs (2026-10-13): gr-superleague, verificado contra roster cacheado de "2024–25 Super League Greece" (tools/club-league-reference/gr.json), coincidencia única por palabras "OFI" = "OFI Crete".
```

## 2024

### Ingresos

```text
2024: cargado por tools/cargar.mjs (2026-10-13) desde Clubes/Grecia/OFI Crete/OFI_income_stmt_2024-06-30.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Grecia/OFI Crete/OFI_income_stmt_2024-06-30.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Κύκλος εργασιών (καθαρός) | pág. 1, Jev 0.99 |
| 2 | Λοιπά συνήθη έσοδα | pág. 1, Jev 1 |
| 3 | Λοιπά έσοδα και κέρδη | pág. 1, Jev 1 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Κόστος πωλήσεων | pág. 1, precedente |
| 2 | Έξοδα διάθεσης | pág. 1, Jev 1 |
| 3 | Έξοδα διοίκησης | pág. 1, Jev 1 |
| 4 | Λοιπά έξοδα και ζημιές | pág. 1, Jev 0.95 |

### Meta

```text
tools/cargar.mjs (2026-10-13). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee.
```

### Liga

```text
tools/cargar.mjs (2026-10-13): gr-superleague, verificado contra roster cacheado de "2023–24 Super League Greece" (tools/club-league-reference/gr.json), coincidencia única por palabras "OFI" = "OFI Crete".
```

## 2023

### Ingresos

```text
2023: cargado por tools/cargar.mjs (2026-10-13) desde Clubes/Grecia/OFI Crete/OFI_income_stmt_2023-06-30.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Grecia/OFI Crete/OFI_income_stmt_2023-06-30.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Κύκλος εργασιών (καθαρός) | pág. 1, Jev 0.99 |
| 2 | Λοιπά συνήθη έσοδα | pág. 1, Jev 1 |
| 3 | Λοιπά έσοδα και κέρδη | pág. 1, Jev 1 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Κόστος πωλήσεων | pág. 1, precedente |
| 2 | Έξοδα διάθεσης | pág. 1, Jev 1 |
| 3 | Έξοδα διοίκησης | pág. 1, Jev 1 |
| 4 | Λοιπά έξοδα και ζημίες | pág. 1, Jev 0.95 |

### Meta

```text
tools/cargar.mjs (2026-10-13). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee.
```

### Liga

```text
tools/cargar.mjs (2026-10-13): gr-superleague, verificado contra roster cacheado de "2022–23 Super League Greece" (tools/club-league-reference/gr.json), coincidencia única por palabras "OFI" = "OFI Crete".
```

## 2022

### Ingresos

```text
2022: cargado por tools/cargar.mjs (2026-10-13) desde Clubes/Grecia/OFI Crete/OFI_income_stmt_2022-06-30.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Grecia/OFI Crete/OFI_income_stmt_2022-06-30.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Κύκλος εργασιών (καθαρός) | pág. 1, Jev 0.99 |
| 2 | Λοιπά συνήθη έσοδα | pág. 1, Jev 1 |
| 3 | Λοιπά έσοδα και κέρδη | pág. 1, Jev 1 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Κόστος πωλήσεων | pág. 1, precedente |
| 2 | Έξοδα διάθεσης | pág. 1, Jev 1 |
| 3 | Έξοδα διοίκησης | pág. 1, Jev 1 |
| 4 | Λοιπά έξοδα και ζημίες | pág. 1, Jev 0.95 |

### Meta

```text
tools/cargar.mjs (2026-10-13). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee.
```

### Liga

```text
tools/cargar.mjs (2026-10-13): gr-superleague, verificado contra roster cacheado de "2021–22 Super League Greece" (tools/club-league-reference/gr.json), coincidencia única por palabras "OFI" = "OFI Crete".
```

## 2021

### Ingresos

```text
2021: cargado por tools/cargar.mjs (2026-10-13) desde Clubes/Grecia/OFI Crete/OFI_income_stmt_2021-06-30.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Grecia/OFI Crete/OFI_income_stmt_2021-06-30.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Κύκλος εργασιών (καθαρός) | pág. 1, Jev 0.99 |
| 2 | Λοιπά συνήθη έσοδα | pág. 1, Jev 1 |
| 3 | Λοιπά έσοδα και κέρδη | pág. 1, Jev 1 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Κόστος πωλήσεων | pág. 1, precedente |
| 2 | Έξοδα διάθεσης | pág. 1, Jev 1 |
| 3 | Έξοδα διοίκησης | pág. 1, Jev 1 |
| 4 | Λοιπά έξοδα και ζημίες | pág. 1, Jev 0.95 |

### Meta

```text
tools/cargar.mjs (2026-10-13). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee.
```

### Liga

```text
tools/cargar.mjs (2026-10-13): gr-superleague, verificado contra roster cacheado de "2020–21 Super League Greece" (tools/club-league-reference/gr.json), coincidencia única por palabras "OFI" = "OFI Crete".
```

## 2020

### Ingresos

```text
2020: cargado por tools/cargar.mjs (2026-10-13) desde Clubes/Grecia/OFI Crete/OFI_notes_2020-06-30.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Grecia/OFI Crete/OFI_notes_2020-06-30.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Κύκλος εργασιών (καθαρός) | pág. 9, precedente |
| 2 | Λοιπά συνήθη έσοδα | pág. 9, precedente |
| 3 | Λοιπά έσοδα και κέρδη | pág. 9, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Κόστος πωλήσεων | pág. 9, precedente |
| 2 | Έξοδα διοίκησης | pág. 9, precedente |
| 3 | Έξοδα διάθεσης | pág. 9, precedente |
| 4 | Λοιπά έξοδα και ζημίες | pág. 9, precedente |

### Meta

```text
tools/cargar.mjs (2026-10-13). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee.
```

### Liga

```text
tools/cargar.mjs (2026-10-13): gr-superleague, verificado contra roster cacheado de "2019–20 Super League Greece" (tools/club-league-reference/gr.json), coincidencia única por palabras "OFI" = "OFI Crete".
```

## 2019

### Ingresos

```text
2019: cargado por tools/cargar.mjs (2026-10-13) desde Clubes/Grecia/OFI Crete/OFI_income_stmt_2019-06-30.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Grecia/OFI Crete/OFI_income_stmt_2019-06-30.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Κύκλος εργασιών (καθαρός) | pág. 1, Jev 0.99 |
| 2 | Λοιπά συνήθη έσοδα | pág. 1, Jev 1 |
| 3 | Λοιπά έσοδα και κέρδη | pág. 1, Jev 1 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Κόστος πωλήσεων | pág. 1, precedente |
| 2 | Έξοδα διοίκησης | pág. 1, Jev 1 |
| 3 | Έξοδα διάθεσης | pág. 1, Jev 1 |
| 4 | Λοιπά έξοδα και ζημίες | pág. 1, Jev 0.95 |

### Meta

```text
tools/cargar.mjs (2026-10-13). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee.
```

### Liga

```text
tools/cargar.mjs (2026-10-13): gr-superleague, verificado contra roster cacheado de "2018–19 Super League Greece" (tools/club-league-reference/gr.json), coincidencia única por palabras "OFI" = "OFI Crete".
```

## 2018

### Ingresos

```text
2018: cargado por tools/cargar.mjs (2026-10-13) desde Clubes/Grecia/OFI Crete/OFI_income_stmt_2018-06-30.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Grecia/OFI Crete/OFI_income_stmt_2018-06-30.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Κύκλος εργασιών (καθαρός) | pág. 1, Jev 0.99 |
| 2 | Λοιπά συνήθη έσοδα | pág. 1, Jev 1 |
| 3 | Λοιπά έσοδα και κέρδη | pág. 1, Jev 1 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Κόστος πωλήσεων | pág. 1, precedente |
| 2 | Έξοδα διοίκησης | pág. 1, Jev 1 |
| 3 | Έξοδα διάθεσης | pág. 1, Jev 1 |
| 4 | Λοιπά έξοδα και ζημίες | pág. 1, Jev 0.95 |

### Meta

```text
tools/cargar.mjs (2026-10-13). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee.
```

### Liga

```text
alta-club.mjs (2026-10-13): gr-superleague2, verificado contra roster cacheado de "2017–18 Football League (Greece)" (tools/club-league-reference/gr.json), coincidencia única por palabras "OFI" = "OFI Crete".
```

## Fuentes

### oficrete-gr-ofi-income-stmt-2018-06-30

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-13) desde la transcripción Clubes/Grecia/OFI Crete/OFI_income_stmt_2018-06-30.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### oficrete-gr-ofi-income-stmt-2019-06-30

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-13) desde la transcripción Clubes/Grecia/OFI Crete/OFI_income_stmt_2019-06-30.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### oficrete-gr-ofi-income-stmt-2021-06-30

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-13) desde la transcripción Clubes/Grecia/OFI Crete/OFI_income_stmt_2021-06-30.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### oficrete-gr-ofi-income-stmt-2022-06-30

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-13) desde la transcripción Clubes/Grecia/OFI Crete/OFI_income_stmt_2022-06-30.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### oficrete-gr-ofi-income-stmt-2023-06-30

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-13) desde la transcripción Clubes/Grecia/OFI Crete/OFI_income_stmt_2023-06-30.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### oficrete-gr-ofi-income-stmt-2024-06-30

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-13) desde la transcripción Clubes/Grecia/OFI Crete/OFI_income_stmt_2024-06-30.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### oficrete-gr-ofi-fs-2025-06-30

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-13) desde la transcripción Clubes/Grecia/OFI Crete/OFI_FS_2025-06-30.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### oficrete-gr-ofi-notes-2020-06-30

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-13) desde la transcripción Clubes/Grecia/OFI Crete/OFI_notes_2020-06-30.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```
