# aellarissa-gr — evidencia de carga

Lo que había como comentario en `data/gr/aellarissa-gr-data.js`, movido tal cual por `tools/archivo/mover-comentarios-data.mjs` (la regla:
`Admin/CONVENCIONES-DATOS.md`, "data/<país>/<club>-data.js NO LLEVA COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y
meta. Las notas de cada fila van en una tabla con su número de fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
============================================================================
data/gr/aellarissa-gr-data.js — AEL Larissa (Grecia).
ALTA POR SCRIPT (tools/alta-club.mjs, 2026-10-03), SIN EJERCICIOS CARGADOS TODAVÍA:
las estructuras de abajo están vacías a propósito. Los rubros, los totales
oficiales y el resto del fiscalYearMeta los agrega la etapa de carga
(tools/proponer-carga.mjs / sesión de onboarding), que es también la que
reemplaza esta cabecera por la de siempre (fuente, perímetro, categorización).

Documento que originó el alta: Clubes/Grecia/AEL Larissa/AEL_notes_ELP_2025-06-30_a.pdf

De dónde salió cada campo (estado según alta-club.mjs: ok / pendiente):
  id                 ok        "aellarissa-gr" — slug de "AEL Larissa" + '-gr' (convención de clubId, Admin/CONVENCIONES.md Versión 129)
  name               pendiente "AEL Larissa" — no se encontró el nombre legal en el .md; se usa el nombre de la carpeta
  displayName        ok        "AEL Larissa" — nombre de la carpeta del club en Clubes/
  country            ok        "GR" — carpeta de país "Grecia" (tabla PAISES)
  reportingCurrency  ok        "EUR" — moneda de curso legal de Grecia
  fiscalYearStart    ok        "07-01" — cierre del ejercicio: nombre del archivo (2025-06-30) y contenido del .md (70 de 70 fechas de fin de mes)
  sport              ok        "futbol" — el .md nombra el fútbol 2 veces y ningún otro deporte más que eso
  brandColor         pendiente (ausente) — la liga del club no está en tools/brand-color-reference/ (o el club no está en footylogos)
  anio               ok        2025 — nombre del archivo (misma regla que onboard.mjs --quien), confirmado por las fechas de cierre del .md
  cierre             ok        "2025-06-30" — año del ejercicio + mes de cierre (nombre del archivo (2025-06-30) y contenido del .md (70 de 70 fechas de fin de mes))
  reportType         ok        "official_balance_sheet" — el .md tiene un estado contable (resultados / balance) y el nombre del archivo no sugiere otro tipo
  perimetro          ok        "individual" — el .md no presenta estados consolidados (0 menciones de "consolidado")
  currency           ok        "EUR" — moneda de curso legal de Grecia (tabla PAISES de alta-club.mjs)
  fxRef              ok        "EUR@2025-06-30" — el documento no declara tipo de cambio; FX_CLOSE ya tiene EUR@2025-06-30 = 0.8532 (Cierre BCE al 30/6/2025 (1 EUR = 1,172 USD))
  sourceId           ok        "aellarissa-gr-ael-notes-elp-2025-06-30-a" — clubId + nombre del archivo en slug
  liga               ok        "gr-superleague2" — roster cacheado de "2024–25 Super League Greece 2" (tools/club-league-reference/gr.json), coincidencia única por palabras "AEL" = "AEL Larissa"

FISCAL YEAR META PROPUESTO para 2025 (NO registrado: un ejercicio con meta y
sin rubros se vería en el sitio como un año en cero, y "sin dato no es cero"):
  2025: {"reportType":"official_balance_sheet","currency":"EUR","fxRef":"EUR@2025-06-30","sourceId":"aellarissa-gr-ael-notes-elp-2025-06-30-a"}
============================================================================
```

_de data/clubs.js:_

```text
AEL Larissa: alta por tools/alta-club.mjs (2026-10-03) desde Clubes/Grecia/AEL Larissa/AEL_notes_ELP_2025-06-30_a.pdf. brandColor AUSENTE a propósito
(nadie lo chequeó todavía: club-or-year-onboarding §3 1b, identidad primero).
```

_de data/club-leagues/gr.js:_

```text
AEL Larissa (alta-club.mjs, 2026-10-03): verificado contra roster cacheado de "2024–25 Super League Greece 2" (tools/club-league-reference/gr.json), coincidencia única por palabras "AEL" = "AEL Larissa".
```

## 2025

### Ingresos

```text
2025: cargado por tools/cargar.mjs (2026-10-03) desde Clubes/Grecia/AEL Larissa/AEL_notes_ELP_2025-06-30_a.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Grecia/AEL Larissa/AEL_notes_ELP_2025-06-30_a.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Κύκλος εργασιών (καθαρός) | pág. 7, Jev 1 |
| 2 | Έσοδα παρεπόμενων ασχολιών | pág. 18, Jev 0.94 |
| 3 | Επιχορηγήσεις και διάφορα έσοδα πωλήσεων | pág. 18, Jev 0.95 |
| 4 | Λοιπά έσοδα και κέρδη | pág. 7, Jev 0.99 |

### Gastos

```text
tools/cargar.mjs (2026-10-03)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Αμοιβές και έξοδα προσωπικού | pág. 18, precedente |
| 2 | Αμοιβές και έξοδα τρίτων | pág. 18, precedente |
| 3 | Παροχές τρίτων | pág. 18, precedente |
| 4 | Διάφορα έξοδα | pág. 18, Jev 0.93 |
| 5 | Αποσβέσεις | pág. 18, precedente |
| 6 | Φόροι-Τέλη | pág. 18, Jev 0.98 |
| 7 | Λοιπά έξοδα και ζημιές | pág. 7, ajuste manual (auditoría 2026-10-04, hallazgo 9: Έκτακτα κι ανόργανα έξοδα) |

### Meta

```text
tools/cargar.mjs (2026-10-03). grossDebt/cash: no se leen por script todavía (null = sin dato). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee (Versión 332).
tools/caja-deuda.mjs (2026-10-03): grossDebt escalón 0 (compuerta: año anterior): "Δάνεια" pág. 6; cash escalón 0 (compuerta: año anterior): "Ταμειακά διαθέσιμα και ισοδύναμα" pág. 6
```

## 2024

### Ingresos

```text
2024: cargado por tools/cargar.mjs (2026-10-03) desde Clubes/Grecia/AEL Larissa/AEL_FS_ELP_2024-06-30.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Grecia/AEL Larissa/AEL_FS_ELP_2024-06-30.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Κύκλος εργασιών (καθαρός) | pág. 8, Jev 1 |
| 2 | Επιχορηγήσεις & διάφορα έσοδα πωλήσεων | pág. 19, Jev 0.92 |
| 3 | Έσοδα παρεπόμενων ασχολιών | pág. 19, Jev 0.94 |
| 4 | (+) Λοιπά έσοδα και κέρδη | pág. 8, Jev 0.99 |

### Gastos

```text
tools/cargar.mjs (2026-10-03)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Αμοιβές και έξοδα προσωπικού | pág. 19, precedente |
| 2 | Αμοιβές και έξοδα τρίτων | pág. 19, precedente |
| 3 | Παροχές τρίτων | pág. 19, precedente |
| 4 | Διάφορα έξοδα | pág. 19, Jev 0.93 |
| 5 | Αποσβέσεις | pág. 19, precedente |
| 6 | Φόροι-τέλη | pág. 19, Jev 0.98 |
| 7 | (-) Λοιπά έξοδα και ζημιές | pág. 8, ajuste manual (auditoría 2026-10-04, hallazgo 9: Έκτακτα κι ανόργανα έξοδα) |

### Meta

```text
tools/cargar.mjs (2026-10-03). grossDebt/cash: no se leen por script todavía (null = sin dato). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee (Versión 332).
tools/caja-deuda.mjs (2026-10-03): grossDebt escalón 0 (compuerta: documento siguiente): "Δάνεια" pág. 7; cash escalón 0 (compuerta: documento siguiente): "Ταμειακά διαθέσιμα και ισοδύναμα" pág. 7
```

### Liga

```text
2024: tools/cargar.mjs 2026-10-03, verificado contra roster cacheado de "2023–24 Super League Greece 2" (tools/club-league-reference/gr.json),
```

## 2023

### Ingresos

```text
2023: cargado por tools/cargar.mjs (2026-10-03) desde Clubes/Grecia/AEL Larissa/AEL_FS_2023-06-30_a.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Grecia/AEL Larissa/AEL_FS_2023-06-30_a.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Κύκλος εργασιών (καθαρός) | pág. 8, Jev 1 |
| 2 | Επιχορηγήσεις & διάφορα έσοδα πωλήσεων | pág. 19, Jev 0.92 |
| 3 | Έσοδα παρεπόμενων ασχολιών | pág. 19, Jev 0.94 |
| 4 | (+) Κέρδη και ζημιές από διάθεση μη κυκλοφορούντων στοιχείων | pág. 8, Jev 0.93 |
| 5 | (+) Λοιπά έσοδα και κέρδη | pág. 8, Jev 0.99 |

### Gastos

```text
tools/cargar.mjs (2026-10-03)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Αμοιβές και έξοδα προσωπικού | pág. 19, ajuste manual (auditoría 2026-10-04, hallazgo 8: nota 16 por naturaleza, como 2022 y 2024) |
| 2 | Αμοιβές και έξοδα τρίτων | pág. 19, ajuste manual (auditoría 2026-10-04, hallazgo 8: nota 16 por naturaleza, como 2022 y 2024) |
| 3 | Παροχές τρίτων | pág. 19, ajuste manual (auditoría 2026-10-04, hallazgo 8: nota 16 por naturaleza, como 2022 y 2024) |
| 4 | Διάφορα έξοδα | pág. 19, ajuste manual (auditoría 2026-10-04, hallazgo 8: nota 16 por naturaleza, como 2022 y 2024) |
| 5 | Αποσβέσεις | pág. 19, ajuste manual (auditoría 2026-10-04, hallazgo 8: nota 16 por naturaleza, como 2022 y 2024) |
| 6 | Φόροι-τέλη | pág. 19, ajuste manual (auditoría 2026-10-04, hallazgo 8: nota 16 por naturaleza, como 2022 y 2024) |
| 7 | (-) Λοιπά έξοδα και ζημιές | pág. 8, ajuste manual (auditoría 2026-10-04, hallazgo 9: Έκτακτα κι ανόργανα έξοδα) |

### Meta

```text
2023: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-03): sin-dudas. Guido 2026-10-03: se carga por función (costo de ventas + administración + comercialización); la nota 16 suma también los intereses (7.608,42) y el escalón 1 no la abre
tools/cargar.mjs (2026-10-03). grossDebt/cash: no se leen por script todavía (null = sin dato). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee (Versión 332).
tools/caja-deuda.mjs (2026-10-03): grossDebt escalón 0 (compuerta: año anterior): "Δάνεια" pág. 7; cash escalón 0 (compuerta: año anterior): "Ταμειακά διαθέσιμα και ισοδύναμα" pág. 7
```

### Liga

```text
2023: tools/cargar.mjs 2026-10-03, verificado contra roster cacheado de "2022–23 Super League Greece 2" (tools/club-league-reference/gr.json),
```

## 2022

### Ingresos

```text
2022: cargado por tools/cargar.mjs (2026-10-03) desde Clubes/Grecia/AEL Larissa/AEL_FS_2022-06-30.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Grecia/AEL Larissa/AEL_FS_2022-06-30.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Κύκλος εργασιών (καθαρός) | pág. 8, Jev 1 |
| 2 | Επιχορηγήσεις & διάφορα έσοδα πωλήσεων | pág. 19, Jev 0.92 |
| 3 | Έσοδα παρεπόμενων ασχολιών | pág. 19, Jev 0.94 |
| 4 | (+) Κέρδη και ζημιές από διάθεση μη κυκλοφορούντων στοιχείων | pág. 8, Jev 0.93 |
| 5 | (+) Λοιπά έσοδα και κέρδη | pág. 8, Jev 0.99 |

### Gastos

```text
tools/cargar.mjs (2026-10-03)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Αμοιβές και έξοδα προσωπικού | pág. 19, precedente |
| 2 | Αμοιβές και έξοδα τρίτων | pág. 19, precedente |
| 3 | Παροχές τρίτων | pág. 19, precedente |
| 4 | Διάφορα έξοδα | pág. 19, Jev 0.93 |
| 5 | Αποσβέσεις | pág. 19, precedente |
| 6 | Φόροι-τέλη | pág. 19, Jev 0.98 |
| 7 | (-) Λοιπά έξοδα και ζημιές | pág. 8, ajuste manual (auditoría 2026-10-04, hallazgo 9: Έκτακτα κι ανόργανα έξοδα) |

### Meta

```text
tools/cargar.mjs (2026-10-03). grossDebt/cash: no se leen por script todavía (null = sin dato). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee (Versión 332).
tools/caja-deuda.mjs (2026-10-03): grossDebt escalón 0 (compuerta: año anterior): "Δάνεια" pág. 7; cash escalón 0 (compuerta: año anterior): "Ταμειακά διαθέσιμα και ισοδύναμα" pág. 7
```

### Liga

```text
2022: tools/cargar.mjs 2026-10-03, verificado contra roster cacheado de "2021–22 Super League Greece 2" (tools/club-league-reference/gr.json),
```

## 2021

### Ingresos

```text
2021: cargado por tools/cargar.mjs (2026-10-03) desde Clubes/Grecia/AEL Larissa/AEL_notes_ELP_2021-06-30.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Grecia/AEL Larissa/AEL_notes_ELP_2021-06-30.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Πωλήσεις εμπορευμάτων | pág. 19, ? 0.75 |
| 2 | Πωλήσεις υπηρεσιών | pág. 19, precedente |
| 3 | Επιχορηγήσεις & διάφορα έσοδα πωλήσεων | pág. 19, precedente |
| 4 | Έσοδα παρεπόμενων ασχολιών | pág. 19, precedente |
| 5 | (+) Λοιπά έσοδα και κέρδη | pág. 8, precedente |

### Gastos

```text
tools/cargar.mjs (2026-10-03)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Αμοιβές και έξοδα προσωπικού | pág. 19, precedente |
| 2 | Αμοιβές και έξοδα τρίτων | pág. 19, precedente |
| 3 | Παροχές τρίτων | pág. 19, precedente |
| 4 | Διάφορα έξοδα | pág. 19, precedente |
| 5 | Αποσβέσεις | pág. 19, precedente |
| 6 | Φόροι-τέλη | pág. 19, precedente |
| 7 | (-) Λοιπά έξοδα και ζημιές | pág. 8, ajuste manual (auditoría 2026-10-04, hallazgo 9: Έκτακτα κι ανόργανα έξοδα) |

### Meta

```text
tools/cargar.mjs (2026-10-03). grossDebt/cash: no se leen por script todavía (null = sin dato). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee (Versión 332).
tools/caja-deuda.mjs (2026-10-03): grossDebt escalón 0 (compuerta: año anterior): "Δάνεια" pág. 7; cash escalón 0 (compuerta: año anterior): "Ταμειακά διαθέσιμα και ισοδύναμα" pág. 7
```

### Liga

```text
2021: tools/cargar.mjs 2026-10-03, verificado contra roster cacheado de "2020–21 Super League Greece" (tools/club-league-reference/gr.json), co
```

## 2020

### Ingresos

```text
2020: cargado por tools/cargar.mjs (2026-10-03) desde Clubes/Grecia/AEL Larissa/AEL_notes_ELP_2020-06-30.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Grecia/AEL Larissa/AEL_notes_ELP_2020-06-30.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Πωλήσεις λοιπών αποθεμάτων & άχρηστου υλικού | pág. 19, Jev 0.99 |
| 2 | Πωλήσεις υπηρεσιών | pág. 19, precedente |
| 3 | Επιχορηγήσεις & διάφορα έσοδα πωλήσεων | pág. 19, Jev 0.92 |
| 4 | Έσοδα παρεπόμενων ασχολιών | pág. 19, Jev 0.94 |
| 5 | (+) Λοιπά έσοδα και κέρδη | pág. 7, Jev 0.99 |

### Gastos

```text
tools/cargar.mjs (2026-10-03)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Αμοιβές και έξοδα προσωπικού | pág. 19, precedente |
| 2 | Αμοιβές και έξοδα τρίτων | pág. 19, precedente |
| 3 | Παροχές τρίτων | pág. 19, precedente |
| 4 | Διάφορα έξοδα | pág. 19, Jev 0.93 |
| 5 | Αποσβέσεις | pág. 19, precedente |
| 6 | Φόροι-τέλη | pág. 19, Jev 0.98 |
| 7 | (-) Λοιπά έξοδα και ζημιές | pág. 7, ajuste manual (auditoría 2026-10-04, hallazgo 9: Έκτακτα κι ανόργανα έξοδα) |

### Meta

```text
tools/cargar.mjs (2026-10-03). grossDebt/cash: no se leen por script todavía (null = sin dato). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee (Versión 332).
tools/caja-deuda.mjs (2026-10-03): grossDebt escalón 2 (compuerta: documento siguiente): "Δάνεια" pág. 6; cash escalón 0 (compuerta: documento siguiente): "Ταμειακά διαθέσιμα και ισοδύναμα" pág. 6
```

### Liga

```text
2020: tools/cargar.mjs 2026-10-03, verificado contra roster cacheado de "2019–20 Super League Greece" (tools/club-league-reference/gr.json), co
```

## 2019

### Ingresos

```text
2019: cargado por tools/cargar.mjs (2026-10-03) desde Clubes/Grecia/AEL Larissa/AEL_notes_ELP_2019-06-30.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Grecia/AEL Larissa/AEL_notes_ELP_2019-06-30.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Πωλήσεις λοιπών αποθεμάτων & άχρηστου υλικού | pág. 14, precedente |
| 2 | Πωλήσεις υπηρεσιών | pág. 14, precedente |
| 3 | Επιχορηγήσεις & διάφορα έσοδα πωλήσεων | pág. 14, precedente |
| 4 | Έσοδα παρεπόμενων ασχολιών | pág. 14, precedente |
| 5 | (+) Λοιπά έσοδα και κέρδη | pág. 3, precedente |

### Gastos

```text
tools/cargar.mjs (2026-10-03)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Αμοιβές και έξοδα προσωπικού | pág. 14, precedente |
| 2 | Αμοιβές και έξοδα τρίτων | pág. 14, precedente |
| 3 | Παροχές τρίτων | pág. 14, precedente |
| 4 | Διάφορα έξοδα | pág. 14, precedente |
| 5 | Αποσβέσεις | pág. 14, precedente |
| 6 | Φόροι-τέλη | pág. 14, precedente |
| 7 | (-) Λοιπά έξοδα και ζημιές | pág. 3, ajuste manual (auditoría 2026-10-04, hallazgo 9: Έκτακτα κι ανόργανα έξοδα) |

### Meta

```text
tools/cargar.mjs (2026-10-03). grossDebt/cash: no se leen por script todavía (null = sin dato). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee (Versión 332).
tools/caja-deuda.mjs (2026-10-03): cash escalón 0 (compuerta: año anterior): "Ταμειακά διαθέσιμα και ισοδύναμα" pág. 2
```

```text
tools/caja-deuda.mjs (2026-10-17): grossDebt escalón 0 (compuerta: ajuste manual): ajuste manual (2026-10-17): Claude 2026-10-17 (leído en el balance por subagente Sonnet, criterio de deuda financiera): Balance completo (Σύνολο υποχρεώσεων 2.097.811,40) sin ninguna fila de préstamos ni deuda financiera. Pasivo = otras largo plazo, comerciales, impuestos, seguridad social y otras; sin deuda financiera (ELP, euros).
```

### Liga

```text
2019: tools/cargar.mjs 2026-10-03, verificado contra roster cacheado de "2018–19 Super League Greece" (tools/club-league-reference/gr.json), co
```

## 2018

### Ingresos

```text
2018: cargado por tools/cargar.mjs (2026-10-03) desde Clubes/Grecia/AEL Larissa/AEL_notes_ELP_2018-06-30.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Grecia/AEL Larissa/AEL_notes_ELP_2018-06-30.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Κύκλος εργασιών (καθαρός) | pág. 3, Jev 1 |
| 2 | (+) Λοιπά συνήθη έσοδα | pág. 3, Jev 1 |
| 3 | (+) Λοιπά έσοδα και κέρδη | pág. 3, Jev 0.99 |

### Gastos

```text
tools/cargar.mjs (2026-10-03)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | (-) Κόστος πωλήσεων | pág. 3, precedente |
| 2 | (-) Έξοδα διοίκησης | pág. 3, Jev 1 |
| 3 | (-) Έξοδα διάθεσης | pág. 3, precedente |
| 4 | (-) Λοιπά έξοδα και ζημιές | pág. 3, ajuste manual (auditoría 2026-10-04, hallazgo 9: Έκτακτα κι ανόργανα έξοδα) |

### Meta

```text
tools/cargar.mjs (2026-10-03). grossDebt/cash: no se leen por script todavía (null = sin dato). netInterest/tax: filas de resultado financiero / impuesto del estado.
tools/dentro-de-otro.mjs (2026-10-05): posiblemente dentro de otro rubro, por precedente del club (la fila tiene plata en sus balances desglosados 2019, 2020, 2021, 2022, 2023, 2024, 2025): Salarios y primas (plantel y cuerpo técnico), Inversiones (amortizaciones y depreciación)
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee (Versión 332).
tools/caja-deuda.mjs (2026-10-03): cash escalón 0 (compuerta: año anterior): "Ταμειακά διαθέσιμα και ισοδύναμα" pág. 2
```

```text
tools/caja-deuda.mjs (2026-10-17): grossDebt escalón 0 (compuerta: ajuste manual): ajuste manual (2026-10-17): Claude 2026-10-17 (leído en el balance por subagente Sonnet, criterio de deuda financiera): Balance completo (Σύνολο υποχρεώσεων 1.767.958,05) sin ninguna fila de préstamos ni deuda financiera. Pasivo = otras largo plazo, comerciales, impuestos, seguridad social y otras; sin deuda financiera (ELP, euros).
```

### Liga

```text
2018: tools/cargar.mjs 2026-10-03, verificado contra roster cacheado de "2017–18 Super League Greece" (tools/club-league-reference/gr.json), co
```

## 2017

### Ingresos

```text
2017: cargado por tools/cargar.mjs (2026-10-03) desde Clubes/Grecia/AEL Larissa/AEL_notes_ELP_2017-06-30.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Grecia/AEL Larissa/AEL_notes_ELP_2017-06-30.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Κύκλος εργασιών (καθαρός) | pág. 3, Jev 1 |
| 2 | (+) Λοιπά συνήθη έσοδα | pág. 3, Jev 1 |
| 3 | (+) Λοιπά έσοδα και κέρδη | pág. 3, Jev 0.99 |

### Gastos

```text
tools/cargar.mjs (2026-10-03)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | (-) Κόστος πωλήσεων | pág. 3, precedente |
| 2 | (-) Έξοδα διοίκησης | pág. 3, Jev 1 |
| 3 | (-) Έξοδα διάθεσης | pág. 3, precedente |
| 4 | (-) Λοιπά έξοδα και ζημιές | pág. 3, ajuste manual (auditoría 2026-10-04, hallazgo 9: Έκτακτα κι ανόργανα έξοδα) |

### Meta

```text
tools/cargar.mjs (2026-10-03). grossDebt/cash: no se leen por script todavía (null = sin dato). netInterest/tax: filas de resultado financiero / impuesto del estado.
tools/dentro-de-otro.mjs (2026-10-05): posiblemente dentro de otro rubro, por precedente del club (la fila tiene plata en sus balances desglosados 2019, 2020, 2021, 2022, 2023, 2024, 2025): Salarios y primas (plantel y cuerpo técnico), Inversiones (amortizaciones y depreciación)
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee (Versión 332).
tools/caja-deuda.mjs (2026-10-03): cash escalón 0 (compuerta: año anterior): "Ταμειακά διαθέσιμα και ισοδύναμα" pág. 2
```

```text
tools/caja-deuda.mjs (2026-10-17): grossDebt escalón 0 (compuerta: ajuste manual): ajuste manual (2026-10-17): Claude 2026-10-17 (leído en el balance por subagente Sonnet, criterio de deuda financiera): Balance completo (Σύνολο υποχρεώσεων 1.203.970,89) sin ninguna fila de préstamos ni deuda financiera. Pasivo = otras largo plazo, comerciales, impuestos, seguridad social y otras; sin deuda financiera (ELP, euros).
```

### Liga

```text
2017: tools/cargar.mjs 2026-10-03, verificado contra roster cacheado de "2016–17 Super League Greece" (tools/club-league-reference/gr.json), co
```

## 2016

### Ingresos

```text
2016: cargado por tools/cargar.mjs (2026-10-03) desde Clubes/Grecia/AEL Larissa/AEL_notes_ELP_2015-16.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Grecia/AEL Larissa/AEL_notes_ELP_2015-16.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Κύκλος εργασιών (καθαρός) | pág. 3, Jev 1 |
| 2 | Λοιπά συνήθη έσοδα | pág. 3, Jev 1 |
| 3 | Λοιπά έσοδα και κέρδη | pág. 3, Jev 0.99 |

### Gastos

```text
tools/cargar.mjs (2026-10-03)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Κόστος πωλήσεων | pág. 3, precedente |
| 2 | Έξοδα διοίκησης | pág. 3, Jev 1 |
| 3 | Έξοδα διάθεσης | pág. 3, precedente |
| 4 | Λοιπά έξοδα και ζημιές | pág. 3, ajuste manual (auditoría 2026-10-04, hallazgo 9: Έκτακτα κι ανόργανα έξοδα) |

### Meta

```text
tools/cargar.mjs (2026-10-03). grossDebt/cash: no se leen por script todavía (null = sin dato). netInterest/tax: filas de resultado financiero / impuesto del estado.
tools/dentro-de-otro.mjs (2026-10-05): posiblemente dentro de otro rubro, por precedente del club (la fila tiene plata en sus balances desglosados 2019, 2020, 2021, 2022, 2023, 2024, 2025): Salarios y primas (plantel y cuerpo técnico), Inversiones (amortizaciones y depreciación)
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee (Versión 332).
tools/caja-deuda.mjs (2026-10-03): cash escalón 2 (compuerta: documento siguiente): "Ταμειακά διαθέσιμα και ισοδύναμα" pág. 2
```

```text
tools/caja-deuda.mjs (2026-10-17): grossDebt escalón 0 (compuerta: ajuste manual): ajuste manual (2026-10-17): Claude 2026-10-17 (leído en el balance por subagente Sonnet, criterio de deuda financiera): Balance completo (Σύνολο υποχρεώσεων 444.964,14) sin ninguna fila de préstamos ni deuda financiera. Pasivo = otras largo plazo, comerciales, impuestos, seguridad social y otras; sin deuda financiera (ELP, euros).
```

### Liga

```text
2016: tools/cargar.mjs 2026-10-03, verificado contra roster cacheado de "2015–16 Football League (Greece)" (tools/club-league-reference/gr.json
```

## Gestiones

_antes de Alexis Kougias (data/gestiones/gr.js):_

```text
Kougias: compró la mayoría en julio de 2015 (en.wikipedia, mes sin día: 01) y conduce hasta junio de 2022, cuando anunció su salida y la cesión de las acciones a
Achilleas Ntavelis (el.wikipedia da solo el mes: 01). Entre 2016 y 2020 firmaron los balances Liontos (2016, 2017) y Markou (2018, 2019) como presidentes del directorio;
quedan fuera por el criterio del dueño.
```

_antes de Achilleas Ntavelis (data/gestiones/gr.js):_

```text
Achilleas Ntavelis: dueño y presidente (firma los balances 2022 a 2024). Hasta el 9/7/2026, cuando Zisis Stylianos se presentó como nuevo dueño
(Skai, 9/7/2026). Su hermano Ioannis firma el balance 2025 como presidente del directorio.
```

## Fuentes

### (general)

```text
Fuentes de cada ejercicio: las agrega tools/cargar.mjs adentro de este bloque (Versión 379: hasta la 378 el esqueleto no lo traía y la
primera carga de un club dado de alta por script se revertía, "no encontré Object.assign(sources, {"; caso: Fortaleza CEIF).
```

### aellarissa-gr-ael-notes-elp-2025-06-30-a

_note (data/):_

```text
Cargado por tools/cargar.mjs (2026-10-03) desde la transcripción Clubes/Grecia/AEL Larissa/AEL_notes_ELP_2025-06-30_a.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### aellarissa-gr-ael-fs-elp-2024-06-30

_note (data/):_

```text
Cargado por tools/cargar.mjs (2026-10-03) desde la transcripción Clubes/Grecia/AEL Larissa/AEL_FS_ELP_2024-06-30.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### aellarissa-gr-ael-fs-2022-06-30

_note (data/):_

```text
Cargado por tools/cargar.mjs (2026-10-03) desde la transcripción Clubes/Grecia/AEL Larissa/AEL_FS_2022-06-30.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### aellarissa-gr-ael-notes-elp-2020-06-30

_note (data/):_

```text
Cargado por tools/cargar.mjs (2026-10-03) desde la transcripción Clubes/Grecia/AEL Larissa/AEL_notes_ELP_2020-06-30.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### aellarissa-gr-ael-notes-elp-2018-06-30

_note (data/):_

```text
Cargado por tools/cargar.mjs (2026-10-03) desde la transcripción Clubes/Grecia/AEL Larissa/AEL_notes_ELP_2018-06-30.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### aellarissa-gr-ael-notes-elp-2017-06-30

_note (data/):_

```text
Cargado por tools/cargar.mjs (2026-10-03) desde la transcripción Clubes/Grecia/AEL Larissa/AEL_notes_ELP_2017-06-30.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### aellarissa-gr-ael-notes-elp-2015-16

_note (data/):_

```text
Cargado por tools/cargar.mjs (2026-10-03) desde la transcripción Clubes/Grecia/AEL Larissa/AEL_notes_ELP_2015-16.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### aellarissa-gr-ael-notes-elp-2021-06-30

_note (data/):_

```text
Cargado por tools/cargar.mjs (2026-10-03) desde la transcripción Clubes/Grecia/AEL Larissa/AEL_notes_ELP_2021-06-30.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### aellarissa-gr-ael-notes-elp-2019-06-30

_note (data/):_

```text
Cargado por tools/cargar.mjs (2026-10-03) desde la transcripción Clubes/Grecia/AEL Larissa/AEL_notes_ELP_2019-06-30.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### aellarissa-gr-ael-fs-2023-06-30-a

_note (data/):_

```text
Cargado por tools/cargar.mjs (2026-10-03) desde la transcripción Clubes/Grecia/AEL Larissa/AEL_FS_2023-06-30_a.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```
