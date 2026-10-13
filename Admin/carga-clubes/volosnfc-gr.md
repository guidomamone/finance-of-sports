# volosnfc-gr — evidencia de carga

Lo que antes iba como comentario en el data file del club, `data/<país>/volosnfc-gr-data.js` (la regla: `Admin/CONVENCIONES-DATOS.md`, "data/<país>/<club>-data.js NO LLEVA
COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y meta. Las notas de cada fila van en una tabla con su número de
fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
Volos NFC: alta por tools/alta-club.mjs (2026-10-13) desde Clubes/Grecia/Volos NFC/Volos_income_stmt_2019-06-30.pdf. brandColor:null a propósito
(procedencia en Admin/sourcing/Grecia/Volos NFC.md; tools/cargar-lote.mjs).
```

```text
data/gr/volosnfc-gr-data.js — Volos N.P.S. P.A.E. (Grecia).
ALTA POR SCRIPT (tools/alta-club.mjs, 2026-10-13), SIN EJERCICIOS CARGADOS TODAVÍA: las estructuras del data file
nacen vacías a propósito. Los rubros, los totales oficiales y el resto del fiscalYearMeta los agrega la etapa de carga.

Documento que originó el alta: Clubes/Grecia/Volos NFC/Volos_income_stmt_2019-06-30.pdf

De dónde salió cada campo (estado según alta-club.mjs: ok / pendiente):
  id                 ok        "volosnfc-gr" — slug de "Volos NFC" + '-gr' (convención de clubId, Admin/CONVENCIONES.md Versión 129)
  name               ok        "Volos N.P.S. P.A.E." — ajuste manual (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-09): Revisión del alta (Claude, 2026-10-09): razón social del documento (ΒΟΛΟΣ Ν.
  displayName        ok        "Volos NFC" — nombre de la carpeta del club en Clubes/
  country            ok        "GR" — carpeta de país "Grecia" (tabla PAISES)
  reportingCurrency  ok        "EUR" — moneda de curso legal de Grecia
  fiscalYearStart    ok        "07-01" — cierre del ejercicio: nombre del archivo (2019-06-30) y contenido del .md (1 de 1 fechas de fin de mes)
  sport              ok        "futbol" — el .md nombra el fútbol 0 veces y ningún otro deporte más que eso
  brandColor         pendiente (ausente) — la liga del club no está en tools/brand-color-reference/ (o el club no está en footylogos)
  anio               ok        2019 — nombre del archivo (misma regla que onboard.mjs --quien)
  cierre             ok        "2019-06-30" — año del ejercicio + mes de cierre (nombre del archivo (2019-06-30) y contenido del .md (1 de 1 fechas de fin de mes))
  reportType         ok        "official_balance_sheet" — el .md tiene un estado contable (resultados / balance) y el nombre del archivo no sugiere otro tipo
  perimetro          ok        "individual" — el .md no presenta estados consolidados (0 menciones de "consolidado")
  currency           ok        "EUR" — moneda de curso legal de Grecia (tabla PAISES de alta-club.mjs)
  fxRef              ok        "EUR@2019-06-30" — el documento no declara tipo de cambio; FX_CLOSE ya tiene EUR@2019-06-30 = 0.878735 (Tipo de referencia del Banco Central Europeo, última rueda hábil 
  sourceId           ok        "volosnfc-gr-volos-income-stmt-2019-06-30" — clubId + nombre del archivo en slug
  liga               ok        "gr-superleague2" — roster cacheado de "2018–19 Football League (Greece)" (tools/club-league-reference/gr.json), coincidencia única por palabras "Volos" = "Volos NFC"

FISCAL YEAR META PROPUESTO para 2019 (NO registrado: un ejercicio con meta y
sin rubros se vería en el sitio como un año en cero, y "sin dato no es cero"):
  2019: {"reportType":"official_balance_sheet","currency":"EUR","fxRef":"EUR@2019-06-30","sourceId":"volosnfc-gr-volos-income-stmt-2019-06-30"}
```

## 2025

### Ingresos

```text
2025: cargado por tools/cargar.mjs (2026-10-13) desde Clubes/Grecia/Volos NFC/Volos_income_stmt_2025-06-30.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Grecia/Volos NFC/Volos_income_stmt_2025-06-30.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Κύκλος εργασιών | pág. 1, Jev 1 |
| 2 | Λοιπά συνήθη έσοδα | pág. 1, Jev 1 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Έξοδα διοίκησης | pág. 1, Jev 1 |

### Meta

```text
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-09): cierre = 2025-06-30. Revisión del alta (Claude, 2026-10-09): el registro no trae periodo; el estado cubre la temporada 2024-2025 y el balance de la misma serie cierra al 30/6
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-10): fila = 3.818,37. Interés cobrado: suma al resultado. El estado imprime cobrado y pagado sin signo y la carga sumaba los dos como costo (2024: 2 × 5.104,81 de diferencia con el resultado impreso). Revisión de la cola de Grecia.
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-10): fila = -7.185,43. Interés pagado: resta del resultado (ver el ajuste del interés cobrado del mismo documento).
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-13): reportType = official_balance_sheet. Claude 2026-10-13: el documento es el estado de resultados anual de la PAE ('Β. 2,1 ΚΑΤΑΣΤΑΣΗ ΑΠΟΤΕΛΕΣΜΑΤΩΝ ΚΑΤΑ ΛΕΙΤΟΥΡΓΙΑ', una columna, sin comparativo) y su resultado del período cierra exacto en verificar.mjs
tools/cargar.mjs (2026-10-13). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee.
```

### Liga

```text
tools/cargar.mjs (2026-10-13): null, SIN VERIFICAR (coincidencia NO exacta en los rosters cacheados: "Volos" en 2024–25 Super League Greece | "Niki Volos" en 2024–25 Super League Greece 2).
```

## 2024

### Ingresos

```text
2024: cargado por tools/cargar.mjs (2026-10-13) desde Clubes/Grecia/Volos NFC/Volos_income_stmt_2024-06-30.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Grecia/Volos NFC/Volos_income_stmt_2024-06-30.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Κύκλος εργασιών | pág. 1, Jev 1 |
| 2 | Λοιπά συνήθη έσοδα | pág. 1, Jev 1 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Έξοδα διοίκησης | pág. 1, Jev 1 |

### Meta

```text
2024: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-09): cierre = 2024-06-30. Revisión del alta (Claude, 2026-10-09): el registro no trae periodo; el estado cubre la temporada 2023-2024 y el balance de la misma serie cierra al 30/6
2024: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-10): fila = 5.104,81. Interés cobrado: suma al resultado. El estado imprime cobrado y pagado sin signo y la carga sumaba los dos como costo (2024: 2 × 5.104,81 de diferencia con el resultado impreso). Revisión de la cola de Grecia.
2024: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-10): fila = -5.967,01. Interés pagado: resta del resultado (ver el ajuste del interés cobrado del mismo documento).
2024: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-13): reportType = official_balance_sheet. Claude 2026-10-13: el documento es el estado de resultados anual de la PAE ('Β. 2,1 ΚΑΤΑΣΤΑΣΗ ΑΠΟΤΕΛΕΣΜΑΤΩΝ ΚΑΤΑ ΛΕΙΤΟΥΡΓΙΑ', una columna, sin comparativo) y su resultado del período cierra exacto en verificar.mjs
tools/cargar.mjs (2026-10-13). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee.
```

### Liga

```text
tools/cargar.mjs (2026-10-13): null, SIN VERIFICAR (coincidencia NO exacta en los rosters cacheados: "Volos" en 2023–24 Super League Greece | "Niki Volos" en 2023–24 Super League Greece 2).
```

## 2023

### Ingresos

```text
2023: cargado por tools/cargar.mjs (2026-10-13) desde Clubes/Grecia/Volos NFC/Volos_income_stmt_2023-06-30.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Grecia/Volos NFC/Volos_income_stmt_2023-06-30.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Κύκλος εργασιών | pág. 1, Jev 1 |
| 2 | Λοιπά συνήθη έσοδα | pág. 1, Jev 1 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Έξοδα διοίκησης | pág. 1, Jev 1 |

### Meta

```text
2023: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-09): cierre = 2023-06-30. Revisión del alta (Claude, 2026-10-09): el registro no trae periodo; el estado cubre la temporada 2022-2023 y el balance de la misma serie cierra al 30/6
2023: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-10): fila = 63,73. Interés cobrado: suma al resultado. El estado imprime cobrado y pagado sin signo y la carga sumaba los dos como costo (2024: 2 × 5.104,81 de diferencia con el resultado impreso). Revisión de la cola de Grecia.
2023: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-10): fila = -7464,46. Interés pagado: resta del resultado (ver el ajuste del interés cobrado del mismo documento).
2023: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-13): reportType = official_balance_sheet. Claude 2026-10-13: el documento es el estado de resultados anual de la PAE ('Β. 2,1 ΚΑΤΑΣΤΑΣΗ ΑΠΟΤΕΛΕΣΜΑΤΩΝ ΚΑΤΑ ΛΕΙΤΟΥΡΓΙΑ', una columna, sin comparativo) y su resultado del período cierra exacto en verificar.mjs
tools/cargar.mjs (2026-10-13). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee.
```

### Liga

```text
tools/cargar.mjs (2026-10-13): null, SIN VERIFICAR (coincidencia NO exacta en los rosters cacheados: "Volos" en 2022–23 Super League Greece | "Niki Volos" en 2022–23 Super League Greece 2).
```

## 2022

### Ingresos

```text
2022: cargado por tools/cargar.mjs (2026-10-13) desde Clubes/Grecia/Volos NFC/Volos_income_stmt_2022-06-30.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Grecia/Volos NFC/Volos_income_stmt_2022-06-30.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Κύκλος εργασιών | pág. 1, Jev 1 |
| 2 | Λοιπά συνήθη έσοδα | pág. 1, Jev 1 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Έξοδα διοίκησης | pág. 1, Jev 1 |
| 2 | Λοιπά έξοδα και ζημιές | pág. 1, Jev 0.97 |

### Meta

```text
2022: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-09): cierre = 2022-06-30. Revisión del alta (Claude, 2026-10-09): el registro no trae periodo; el estado cubre la temporada 2021-2022 y el balance de la misma serie cierra al 30/6
2022: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-10): fila = 98,90. Interés cobrado: suma al resultado. El estado imprime cobrado y pagado sin signo y la carga sumaba los dos como costo (2024: 2 × 5.104,81 de diferencia con el resultado impreso). Revisión de la cola de Grecia.
2022: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-10): fila = -7685,44. Interés pagado: resta del resultado (ver el ajuste del interés cobrado del mismo documento).
2022: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-13): reportType = official_balance_sheet. Claude 2026-10-13: el documento es el estado de resultados anual de la PAE ('Β. 2,1 ΚΑΤΑΣΤΑΣΗ ΑΠΟΤΕΛΕΣΜΑΤΩΝ ΚΑΤΑ ΛΕΙΤΟΥΡΓΙΑ', una columna, sin comparativo) y su resultado del período cierra exacto en verificar.mjs
tools/cargar.mjs (2026-10-13). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee.
```

### Liga

```text
tools/cargar.mjs (2026-10-13): null, SIN VERIFICAR (coincidencia NO exacta en los rosters cacheados: "Volos" en 2021–22 Super League Greece | "Niki Volos" en 2021–22 Super League Greece 2 | "Olympiacos Volos" en 2021–22 Super League Greece 2).
```

## 2021

### Ingresos

```text
2021: cargado por tools/cargar.mjs (2026-10-13) desde Clubes/Grecia/Volos NFC/Volos_income_stmt_2021-06-30.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Grecia/Volos NFC/Volos_income_stmt_2021-06-30.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Κύκλος εργασιών | pág. 1, Jev 1 |
| 2 | Λοιπά συνήθη έσοδα | pág. 1, Jev 1 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Λοιπά έξοδα και ζημιές | pág. 1, Jev 0.97 |
| 2 | Έξοδα διοίκησης (sin el costo de personal de la nota 8) | pág. 1, precedente |
| 3 | Σύνολο κόστους μισθοδοσίας περιόδου | pág. 1, precedente |

### Meta

```text
2021: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-09): cierre = 2021-06-30. Revisión del alta (Claude, 2026-10-09): el registro no trae periodo; el estado cubre la temporada 2020-2021 y el balance de la misma serie cierra al 30/6
2021: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-10): fila = 62,83. Interés cobrado: suma al resultado. El estado imprime cobrado y pagado sin signo y la carga sumaba los dos como costo (2024: 2 × 5.104,81 de diferencia con el resultado impreso). Revisión de la cola de Grecia.
2021: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-10): fila = -3225,46. Interés pagado: resta del resultado (ver el ajuste del interés cobrado del mismo documento).
2021: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-13): reportType = official_balance_sheet. Claude 2026-10-13: el documento es el estado de resultados anual de la PAE ('Β. 2,1 ΚΑΤΑΣΤΑΣΗ ΑΠΟΤΕΛΕΣΜΑΤΩΝ ΚΑΤΑ ΛΕΙΤΟΥΡΓΙΑ', una columna, sin comparativo) y su resultado del período cierra exacto en verificar.mjs
2021: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-13): fila = 1.570.356,85. Claude 2026-10-13 (to-do 219): el estado es por función y 'Έξοδα διοίκησης' (2.739.218) es el único gasto operativo; la nota 8 de Volos_notes_2021-06-30 abre el costo de personal (1.168.861,15), que va aparte a wages_squad. Queda 2.739.218 - 1.168.861,15.
2021: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-13): fila = 1.168.861,15. Claude 2026-10-13 (to-do 219): costo total de personal de la nota 8 (sueldos 1.097.777,29 + cargas sociales 58.683,86 + beneficios post-empleo 12.400), dentro de 'Έξοδα διοίκησης'.
2021: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-13): categoria = wages_squad. Claude 2026-10-13 (to-do 219): sueldos y cargas sociales del personal (club-data-mapping: 'Sueldos del Personal, Cargas Sociales' -> wages_squad)
2021: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-13): categoria = admin_general_expense. Claude 2026-10-13 (to-do 219): gastos de administración sin el personal
tools/cargar.mjs (2026-10-13). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee.
```

## 2020

### Ingresos

```text
2020: cargado por tools/cargar.mjs (2026-10-13) desde Clubes/Grecia/Volos NFC/Volos_income_stmt_2020-06-30.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Grecia/Volos NFC/Volos_income_stmt_2020-06-30.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Κύκλος εργασιών (καθαρός) | pág. 1, Jev 1 |
| 2 | Λοιπά συνήθη έσοδα | pág. 1, Jev 1 |
| 3 | Λοιπά έσοδα και κέρδη | pág. 1, Jev 1 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Μεταβολές αποθεμάτων (εμπορεύματα, προϊόντα, ημικατ/μένα) | pág. 1, Jev 1 |
| 2 | Αγορές εμπορευμάτων και υλικών | pág. 1, precedente |
| 3 | Παροχές σε εργαζόμενους | pág. 1, precedente |
| 4 | Αποσβέσεις ενσωμάτων παγίων και άυλων στοιχείων | pág. 1, Jev 0.92 |
| 5 | Λοιπά έξοδα και ζημιές | pág. 1, Jev 0.97 |

### Meta

```text
tools/cargar.mjs (2026-10-13). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee.
```

### Liga

```text
tools/cargar.mjs (2026-10-13): gr-superleague, verificado contra roster cacheado de "2019–20 Super League Greece" (tools/club-league-reference/gr.json), coincidencia única por palabras "Volos" = "Volos NFC".
```

## 2019

### Ingresos

```text
2019: cargado por tools/cargar.mjs (2026-10-13) desde Clubes/Grecia/Volos NFC/Volos_income_stmt_2019-06-30.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Grecia/Volos NFC/Volos_income_stmt_2019-06-30.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Κύκλος εργασιών (καθαρός) | pág. 1, Jev 1 |
| 2 | Λοιπά συνήθη έσοδα | pág. 1, Jev 1 |
| 3 | Λοιπά έσοδα και κέρδη | pág. 1, Jev 1 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Μεταβολές αποθεμάτων (εμπορεύματα, προϊόντα, ημικατ/μένα) | pág. 1, Jev 1 |
| 2 | Αγορές εμπορευμάτων και υλικών | pág. 1, precedente |
| 3 | Παροχές σε εργαζόμενους | pág. 1, precedente |
| 4 | Αποσβέσεις ενσωμάτων παγίων και άυλων στοιχείων | pág. 1, Jev 0.92 |
| 5 | Λοιπά έξοδα και ζημιές | pág. 1, Jev 0.97 |

### Meta

```text
tools/cargar.mjs (2026-10-13). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee.
```

### Liga

```text
alta-club.mjs (2026-10-13): gr-superleague2, verificado contra roster cacheado de "2018–19 Football League (Greece)" (tools/club-league-reference/gr.json), coincidencia única por palabras "Volos" = "Volos NFC".
```

## Fuentes

### volosnfc-gr-volos-income-stmt-2019-06-30

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-13) desde la transcripción Clubes/Grecia/Volos NFC/Volos_income_stmt_2019-06-30.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### volosnfc-gr-volos-income-stmt-2020-06-30

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-13) desde la transcripción Clubes/Grecia/Volos NFC/Volos_income_stmt_2020-06-30.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### volosnfc-gr-volos-income-stmt-2021-06-30

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-13) desde la transcripción Clubes/Grecia/Volos NFC/Volos_income_stmt_2021-06-30.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### volosnfc-gr-volos-income-stmt-2022-06-30

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-13) desde la transcripción Clubes/Grecia/Volos NFC/Volos_income_stmt_2022-06-30.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### volosnfc-gr-volos-income-stmt-2023-06-30

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-13) desde la transcripción Clubes/Grecia/Volos NFC/Volos_income_stmt_2023-06-30.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### volosnfc-gr-volos-income-stmt-2024-06-30

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-13) desde la transcripción Clubes/Grecia/Volos NFC/Volos_income_stmt_2024-06-30.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### volosnfc-gr-volos-income-stmt-2025-06-30

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-13) desde la transcripción Clubes/Grecia/Volos NFC/Volos_income_stmt_2025-06-30.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```
