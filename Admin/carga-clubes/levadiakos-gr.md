# levadiakos-gr — evidencia de carga

Lo que antes iba como comentario en el data file del club, `data/<país>/levadiakos-gr-data.js` (la regla: `Admin/CONVENCIONES-DATOS.md`, "data/<país>/<club>-data.js NO LLEVA
COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y meta. Las notas de cada fila van en una tabla con su número de
fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
Levadiakos: alta por tools/alta-club.mjs (2026-10-13) desde Clubes/Grecia/Levadiakos/Levadiakos_FS_2019-06-30.pdf. brandColor:null a propósito
(procedencia en Admin/sourcing/Grecia/Levadiakos.md; tools/cargar-lote.mjs).
```

```text
data/gr/levadiakos-gr-data.js — A.P.O. Levadiakos P.A.E. (Grecia).
ALTA POR SCRIPT (tools/alta-club.mjs, 2026-10-13), SIN EJERCICIOS CARGADOS TODAVÍA: las estructuras del data file
nacen vacías a propósito. Los rubros, los totales oficiales y el resto del fiscalYearMeta los agrega la etapa de carga.

Documento que originó el alta: Clubes/Grecia/Levadiakos/Levadiakos_FS_2019-06-30.pdf

De dónde salió cada campo (estado según alta-club.mjs: ok / pendiente):
  id                 ok        "levadiakos-gr" — slug de "Levadiakos" + '-gr' (convención de clubId, Admin/CONVENCIONES.md Versión 129)
  name               ok        "A.P.O. Levadiakos P.A.E." — ajuste manual (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-09): Revisión del alta (Claude, 2026-10-09): razón social del documento (ΑΠΟ ΛΕΒΑ
  displayName        ok        "Levadiakos" — nombre de la carpeta del club en Clubes/
  country            ok        "GR" — carpeta de país "Grecia" (tabla PAISES)
  reportingCurrency  ok        "EUR" — moneda de curso legal de Grecia
  fiscalYearStart    ok        "07-01" — cierre del ejercicio: nombre del archivo (2019-06-30) y contenido del .md (44 de 45 fechas de fin de mes)
  sport              ok        "futbol" — el .md nombra el fútbol 20 veces y ningún otro deporte más que eso
  brandColor         pendiente (ausente) — la liga del club no está en tools/brand-color-reference/ (o el club no está en footylogos)
  anio               ok        2019 — nombre del archivo (misma regla que onboard.mjs --quien), confirmado por las fechas de cierre del .md
  cierre             ok        "2019-06-30" — año del ejercicio + mes de cierre (nombre del archivo (2019-06-30) y contenido del .md (44 de 45 fechas de fin de mes))
  reportType         ok        "official_balance_sheet" — el .md tiene un estado contable (resultados / balance) y el nombre del archivo no sugiere otro tipo
  perimetro          ok        "individual" — el .md no presenta estados consolidados (0 menciones de "consolidado")
  currency           ok        "EUR" — moneda de curso legal de Grecia (tabla PAISES de alta-club.mjs)
  fxRef              ok        "EUR@2019-06-30" — el documento no declara tipo de cambio; FX_CLOSE ya tiene EUR@2019-06-30 = 0.878735 (Tipo de referencia del Banco Central Europeo, última rueda hábil 
  sourceId           ok        "levadiakos-gr-fs-2019-06-30" — clubId + nombre del archivo en slug
  liga               ok        "gr-superleague" — roster cacheado de "2018–19 Super League Greece" (tools/club-league-reference/gr.json), coincidencia exacta "Levadiakos"

FISCAL YEAR META PROPUESTO para 2019 (NO registrado: un ejercicio con meta y
sin rubros se vería en el sitio como un año en cero, y "sin dato no es cero"):
  2019: {"reportType":"official_balance_sheet","currency":"EUR","fxRef":"EUR@2019-06-30","sourceId":"levadiakos-gr-fs-2019-06-30"}
```

## 2025

### Ingresos

```text
2025: cargado por tools/cargar.mjs (2026-10-13) desde Clubes/Grecia/Levadiakos/Levadiakos_FS_2025-06-30.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Grecia/Levadiakos/Levadiakos_FS_2025-06-30.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Κύκλος εργασιών (καθαρός) | pág. 17, Jev 1 |
| 2 | Λοιπά συνήθη έσοδα | pág. 17, Jev 1 |
| 3 | Λοιπά έσοδα και κέρδη | pág. 17, Jev 0.99 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Κόστος πωλήσεων | pág. 17, precedente |
| 2 | Έξοδα διάθεσης | pág. 17, precedente |
| 3 | Έξοδα διοίκησης | pág. 17, Jev 1 |
| 4 | Άλλα έξοδα και ζημίες | pág. 17, Jev 0.95 |

### Meta

```text
tools/cargar.mjs (2026-10-13). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee.
```

```text
tools/caja-deuda.mjs (2026-10-16): cash escalón 0 (compuerta: año anterior): "Ταμειακά διαθέσιμα και ισοδύναμα" pág. 16
```

```text
tools/caja-deuda.mjs (2026-10-17): grossDebt escalón 0 (compuerta: ajuste manual): ajuste manual (2026-10-17): Claude 2026-10-17 (leído en el balance por subagente Sonnet, criterio de deuda financiera): Balance completo (Σύνολο υποχρεώσεων 1.885.795,62): 'Λοιπές μακροπρόθεσμες υποχρεώσεις' 43.729,46 no son préstamos. Sin fila financiera; la otra deuda largo plazo 43.729,46 no está identificada como préstamo (no abrí su nota).
```

### Liga

```text
tools/cargar.mjs (2026-10-13): gr-superleague, verificado contra roster cacheado de "2024–25 Super League Greece" (tools/club-league-reference/gr.json), coincidencia exacta "Levadiakos".
```

## 2024

### Ingresos

```text
2024: cargado por tools/cargar.mjs (2026-10-13) desde Clubes/Grecia/Levadiakos/Levadiakos_FS_2024-06-30.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Grecia/Levadiakos/Levadiakos_FS_2024-06-30.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Κύκλος εργασιών (καθαρός) | pág. 2, Jev 1 |
| 2 | Λοιπά συνήθη έσοδα | pág. 2, Jev 1 |
| 3 | Λοιπά έσοδα και κέρδη | pág. 2, Jev 0.99 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Κόστος πωλήσεων | pág. 2, precedente |
| 2 | Έξοδα διάθεσης | pág. 2, precedente |
| 3 | Έξοδα διοίκησης | pág. 2, Jev 1 |
| 4 | Άλλα έξοδα και ζημίες | pág. 2, Jev 0.95 |

### Meta

```text
tools/cargar.mjs (2026-10-13). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee.
```

```text
tools/caja-deuda.mjs (2026-10-13): cash escalón 2 (compuerta: documento siguiente): "Ταμειακά διαθέσιμα και ισοδύναμα" pág. 1
```

```text
tools/caja-deuda.mjs (2026-10-17): grossDebt escalón 0 (compuerta: ajuste manual): ajuste manual (2026-10-17): Claude 2026-10-17 (leído en el balance por subagente Sonnet, criterio de deuda financiera): Balance completo (Σύνολο υποχρεώσεων 967.181,06): sin fila de préstamos. Sin deuda financiera.
```

### Liga

```text
tools/cargar.mjs (2026-10-13): gr-superleague2, verificado contra roster cacheado de "2023–24 Super League Greece 2" (tools/club-league-reference/gr.json), coincidencia exacta "Levadiakos".
```

## 2023

### Ingresos

```text
2023: cargado por tools/cargar.mjs (2026-10-13) desde Clubes/Grecia/Levadiakos/Levadiakos_FS_2023-06-30.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Grecia/Levadiakos/Levadiakos_FS_2023-06-30.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Κύκλος εργασιών (καθαρός) | pág. 3, Jev 1 |
| 2 | Λοιπά συνήθη έσοδα | pág. 3, Jev 1 |
| 3 | Λοιπά έσοδα και κέρδη | pág. 3, Jev 0.99 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Κόστος πωλήσεων | pág. 3, precedente |
| 2 | Έξοδα διάθεσης | pág. 3, precedente |
| 3 | Έξοδα διοίκησης | pág. 3, Jev 1 |
| 4 | Άλλα έξοδα και ζημίες | pág. 3, Jev 0.95 |

### Meta

```text
tools/cargar.mjs (2026-10-13). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee.
```

```text
tools/caja-deuda.mjs (2026-10-13): cash escalón 2 (compuerta: documento siguiente): "Ταμειακά διαθέσιμα και ισοδύναμα" pág. 2
```

```text
tools/caja-deuda.mjs (2026-10-17): grossDebt escalón 0 (compuerta: ajuste manual): ajuste manual (2026-10-17): Claude 2026-10-17 (leído en el balance por subagente Sonnet, criterio de deuda financiera): Κρατικά δάνεια (corriente) 0,00; sin otra fila financiera. Balance completo (Σύνολο υποχρεώσεων 2.480.910,11); 'Έσοδα επόμενων χρήσεων' 1.442.860,39 es ingreso diferido, excluido.
```

### Liga

```text
tools/cargar.mjs (2026-10-13): gr-superleague, verificado contra roster cacheado de "2022–23 Super League Greece" (tools/club-league-reference/gr.json), coincidencia exacta "Levadiakos".
```

## 2022

### Ingresos

```text
2022: cargado por tools/cargar.mjs (2026-10-13) desde Clubes/Grecia/Levadiakos/Levadiakos_FS_2022-06-30.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Grecia/Levadiakos/Levadiakos_FS_2022-06-30.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Κύκλος εργασιών (καθαρός) | pág. 16, Jev 1 |
| 2 | Λοιπά συνήθη έσοδα | pág. 16, Jev 1 |
| 3 | Λοιπά έσοδα και κέρδη | pág. 16, Jev 0.99 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Κόστος πωλήσεων | pág. 16, precedente |
| 2 | Έξοδα διάθεσης | pág. 16, precedente |
| 3 | Έξοδα διοίκησης | pág. 16, Jev 1 |
| 4 | Άλλα έξοδα και ζημίες | pág. 16, Jev 0.95 |

### Meta

```text
tools/cargar.mjs (2026-10-13). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee.
```

```text
tools/caja-deuda.mjs (2026-10-13): cash escalón 2 (compuerta: documento siguiente): "Ταμειακά διαθέσιμα και ισοδύναμα" pág. 15
```

```text
tools/caja-deuda.mjs (2026-10-17): grossDebt escalón 0 (compuerta: ajuste manual): ajuste manual (2026-10-17): Claude 2026-10-17 (leído en el balance por subagente Sonnet, criterio de deuda financiera): Κρατικά δάνεια (corriente) 127.178,64 + Κρατικά δάνεια (no corriente) 0,00. Préstamos estatales; mismo criterio que 2021.
```

### Liga

```text
tools/cargar.mjs (2026-10-13): null, SIN VERIFICAR (no aparece en los rosters cacheados de 2022 (gr-superleague, gr-superleague2): puede haber jugado otra división).
```

```text
tools/ligas-sin-verificar.mjs (2026-10-18): gr-superleague2, verificado contra la lista de equipos de "2021–22 Super League Greece 2" (Wikipedia; tools/club-league-reference/gr.json, gr-superleague2 2022). Antes: sin fila.
```

## 2021

### Ingresos

```text
2021: cargado por tools/cargar.mjs (2026-10-13) desde Clubes/Grecia/Levadiakos/Levadiakos_FS_2021-06-30.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Grecia/Levadiakos/Levadiakos_FS_2021-06-30.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Κύκλος εργασιών (καθαρός) | pág. 2, Jev 1 |
| 2 | Λοιπά συνήθη έσοδα | pág. 2, Jev 1 |
| 3 | Λοιπά έσοδα και κέρδη | pág. 2, Jev 0.99 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Κόστος πωλήσεων | pág. 2, precedente |
| 2 | Έξοδα διάθεσης | pág. 2, precedente |
| 3 | Έξοδα διοίκησης | pág. 2, Jev 1 |
| 4 | Άλλα έξοδα και ζημίες | pág. 2, Jev 0.95 |

### Meta

```text
tools/cargar.mjs (2026-10-13). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee.
```

```text
tools/caja-deuda.mjs (2026-10-13): cash escalón 2 (compuerta: documento siguiente): "Ταμειακά διαθέσιμα και ισοδύναμα" pág. 1
```

```text
tools/caja-deuda.mjs (2026-10-17): grossDebt escalón 0 (compuerta: ajuste manual): ajuste manual (2026-10-17): Claude 2026-10-17 (leído en el balance por subagente Sonnet, criterio de deuda financiera): Κρατικά δάνεια (no corriente) 284.281,67 + Βραχυπρόθεσμα δάνεια 14.962,20. Son préstamos estatales (la nota de 2022 los llama 'κρατικά δάνεια'); los incluyo como préstamos. Excluidas 'Κρατικές επιχορηγήσεις' 40.000 (subsidio).
```

### Liga

```text
tools/cargar.mjs (2026-10-13): gr-superleague2, verificado contra roster cacheado de "2020–21 Super League Greece 2" (tools/club-league-reference/gr.json), coincidencia exacta "Levadiakos".
```

## 2020

### Ingresos

```text
2020: cargado por tools/cargar.mjs (2026-10-13) desde Clubes/Grecia/Levadiakos/Levadiakos_FS_2020-06-30.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Grecia/Levadiakos/Levadiakos_FS_2020-06-30.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Κύκλος εργασιών (καθαρός) | pág. 2, Jev 1 |
| 2 | Λοιπά συνήθη έσοδα | pág. 2, Jev 1 |
| 3 | Λοιπά έσοδα και κέρδη | pág. 2, Jev 0.99 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Κόστος πωλήσεων | pág. 2, precedente |
| 2 | Έξοδα διάθεσης | pág. 2, precedente |
| 3 | Έξοδα διοίκησης | pág. 2, Jev 1 |
| 4 | Άλλα έξοδα και ζημίες | pág. 2, Jev 0.95 |

### Meta

```text
tools/cargar.mjs (2026-10-13). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee.
```

```text
tools/caja-deuda.mjs (2026-10-13): cash escalón 2 (compuerta: documento siguiente): "Ταμειακά διαθέσιμα και ισοδύναμα" pág. 1
```

```text
tools/caja-deuda.mjs (2026-10-17): grossDebt escalón 0 (compuerta: ajuste manual): ajuste manual (2026-10-17): Claude 2026-10-17 (leído en el balance por subagente Sonnet, criterio de deuda financiera): Balance completo (Σύνολο υποχρεώσεων 1.455.563,41): sin fila de préstamos. Sin deuda financiera.
```

### Liga

```text
tools/cargar.mjs (2026-10-13): gr-superleague2, verificado contra roster cacheado de "2019–20 Super League Greece 2" (tools/club-league-reference/gr.json), coincidencia exacta "Levadiakos".
```

## 2019

### Ingresos

```text
2019: cargado por tools/cargar.mjs (2026-10-13) desde Clubes/Grecia/Levadiakos/Levadiakos_FS_2019-06-30.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Grecia/Levadiakos/Levadiakos_FS_2019-06-30.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Κύκλος εργασιών (καθαρός) | pág. 2, Jev 1 |
| 2 | Λοιπά συνήθη έσοδα | pág. 2, Jev 1 |
| 3 | Λοιπά έσοδα και κέρδη | pág. 2, Jev 0.99 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Κόστος πωλήσεων | pág. 2, precedente |
| 2 | Έξοδα διάθεσης | pág. 2, precedente |
| 3 | Έξοδα διοίκησης | pág. 2, Jev 1 |
| 4 | Άλλα έξοδα και ζημίες | pág. 2, Jev 0.95 |

### Meta

```text
tools/cargar.mjs (2026-10-13). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee.
```

```text
tools/caja-deuda.mjs (2026-10-13): cash escalón 2 (compuerta: documento siguiente): "Ταμειακά διαθέσιμα και ισοδύναμα" pág. 1
```

```text
tools/caja-deuda.mjs (2026-10-17): grossDebt escalón 0 (compuerta: ajuste manual): ajuste manual (2026-10-17): Claude 2026-10-17 (leído en el balance por subagente Sonnet, criterio de deuda financiera): Balance completo (Σύνολο υποχρεώσεων 1.438.232,69): sólo impuestos, comerciales, seguridad social y otras; sin fila de préstamos. Sin deuda financiera.
```

### Liga

```text
alta-club.mjs (2026-10-13): gr-superleague, verificado contra roster cacheado de "2018–19 Super League Greece" (tools/club-league-reference/gr.json), coincidencia exacta "Levadiakos".
```

## Fuentes

### levadiakos-gr-fs-2019-06-30

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-13) desde la transcripción Clubes/Grecia/Levadiakos/Levadiakos_FS_2019-06-30.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### levadiakos-gr-fs-2020-06-30

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-13) desde la transcripción Clubes/Grecia/Levadiakos/Levadiakos_FS_2020-06-30.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### levadiakos-gr-fs-2021-06-30

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-13) desde la transcripción Clubes/Grecia/Levadiakos/Levadiakos_FS_2021-06-30.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### levadiakos-gr-fs-2022-06-30

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-13) desde la transcripción Clubes/Grecia/Levadiakos/Levadiakos_FS_2022-06-30.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### levadiakos-gr-fs-2023-06-30

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-13) desde la transcripción Clubes/Grecia/Levadiakos/Levadiakos_FS_2023-06-30.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### levadiakos-gr-fs-2024-06-30

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-13) desde la transcripción Clubes/Grecia/Levadiakos/Levadiakos_FS_2024-06-30.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### levadiakos-gr-fs-2025-06-30

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-13) desde la transcripción Clubes/Grecia/Levadiakos/Levadiakos_FS_2025-06-30.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```
