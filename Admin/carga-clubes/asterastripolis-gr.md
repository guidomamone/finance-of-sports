# asterastripolis-gr — evidencia de carga

Lo que antes iba como comentario en el data file del club, `data/<país>/asterastripolis-gr-data.js` (la regla: `Admin/CONVENCIONES-DATOS.md`, "data/<país>/<club>-data.js NO LLEVA
COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y meta. Las notas de cada fila van en una tabla con su número de
fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
Asteras Tripolis: alta por tools/alta-club.mjs (2026-10-13) desde Clubes/Grecia/Asteras Tripolis/Asteras_FS_2019-06-30.pdf. brandColor:null a propósito
(procedencia en Admin/sourcing/Grecia/Asteras Tripolis.md; tools/cargar-lote.mjs).
```

```text
data/gr/asterastripolis-gr-data.js — A.G.S. Asteras Tripolis P.A.E. (Grecia).
ALTA POR SCRIPT (tools/alta-club.mjs, 2026-10-13), SIN EJERCICIOS CARGADOS TODAVÍA: las estructuras del data file
nacen vacías a propósito. Los rubros, los totales oficiales y el resto del fiscalYearMeta los agrega la etapa de carga.

Documento que originó el alta: Clubes/Grecia/Asteras Tripolis/Asteras_FS_2019-06-30.pdf

De dónde salió cada campo (estado según alta-club.mjs: ok / pendiente):
  id                 ok        "asterastripolis-gr" — slug de "Asteras Tripolis" + '-gr' (convención de clubId, Admin/CONVENCIONES.md Versión 129)
  name               ok        "A.G.S. Asteras Tripolis P.A.E." — ajuste manual (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-09): Revisión del alta (Claude, 2026-10-09): razón social del documento (ΑΓΣ ΑΣΤΕ
  displayName        ok        "Asteras Tripolis" — nombre de la carpeta del club en Clubes/
  country            ok        "GR" — carpeta de país "Grecia" (tabla PAISES)
  reportingCurrency  ok        "EUR" — moneda de curso legal de Grecia
  fiscalYearStart    ok        "07-01" — cierre del ejercicio: nombre del archivo (2019-06-30) y contenido del .md (113 de 114 fechas de fin de mes)
  sport              ok        "futbol" — el .md nombra el fútbol 43 veces y ningún otro deporte más que eso
  brandColor         pendiente (ausente) — la liga del club no está en tools/brand-color-reference/ (o el club no está en footylogos)
  anio               ok        2019 — nombre del archivo (misma regla que onboard.mjs --quien), confirmado por las fechas de cierre del .md
  cierre             ok        "2019-06-30" — año del ejercicio + mes de cierre (nombre del archivo (2019-06-30) y contenido del .md (113 de 114 fechas de fin de mes))
  reportType         ok        "official_balance_sheet" — el .md tiene un estado contable (resultados / balance) y el nombre del archivo no sugiere otro tipo
  perimetro          ok        "individual" — ajuste manual (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-09): Revisión del alta (Claude, 2026-10-09): la sociedad no pertenece a grupo con
  currency           ok        "EUR" — moneda de curso legal de Grecia (tabla PAISES de alta-club.mjs)
  fxRef              ok        "EUR@2019-06-30" — el documento no declara tipo de cambio; FX_CLOSE ya tiene EUR@2019-06-30 = 0.878735 (Tipo de referencia del Banco Central Europeo, última rueda hábil 
  sourceId           ok        "asterastripolis-gr-asteras-fs-2019-06-30" — clubId + nombre del archivo en slug
  liga               ok        "gr-superleague" — roster cacheado de "2018–19 Super League Greece" (tools/club-league-reference/gr.json), coincidencia exacta "Asteras Tripolis"

FISCAL YEAR META PROPUESTO para 2019 (NO registrado: un ejercicio con meta y
sin rubros se vería en el sitio como un año en cero, y "sin dato no es cero"):
  2019: {"reportType":"official_balance_sheet","currency":"EUR","fxRef":"EUR@2019-06-30","sourceId":"asterastripolis-gr-asteras-fs-2019-06-30"}
```

## 2025

### Ingresos

```text
2025: cargado por tools/cargar.mjs (2026-10-13) desde Clubes/Grecia/Asteras Tripolis/Asteras_FS_2025-06-30.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Grecia/Asteras Tripolis/Asteras_FS_2025-06-30.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Έσοδα αγώνων | pág. 31, Jev 0.95 |
| 2 | Έσοδα από τηλεοπτικές μεταδόσεις αγώνων | pág. 31, Jev 1 |
| 3 | Έσοδα από παραχώρηση ποδοσφαιριστών | pág. 31, precedente |
| 4 | Επιχορηγήσεις | pág. 31, Claude 0.85 |
| 5 | Αποζημίωση ειδικού σκοπού αθλητικών σωματείων | pág. 31, precedente |
| 6 | Έσοδα από παροχή υπηρεσιών σε τρίτους | pág. 31, precedente |
| 7 | Έσοδα από συνεισφορά αλληλεγγύης και τροφεία | pág. 31, precedente |
| 8 | Έσοδα συμμετοχών και επενδύσεων | pág. 18, Jev 1 |
| 9 | Κέρδος από αγορά οντότητας ή τμήματος σε τιμή ευκαιρίας | pág. 18, Jev 0.92 |
| 10 | Λοιπά Έκτακτα και ανόργανα έσοδα | pág. 31, Jev 1 |
| 11 | Έσοδα από αχρησιμοποίητες προβλέψεις προηγούμενων χρήσεων | pág. 31, Jev 1 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Κόστος πωλήσεων (Κόστος λειτουργίας ποδοσφαιρικού τμήματος) | pág. 18, Jev 0.93 |
| 2 | Έξοδα διοίκησης | pág. 18, Jev 1 |
| 3 | Έξοδα διάθεσης | pág. 18, Claude 0.85 |
| 4 | Φορολογικά πρόστιμα και προσαυξήσεις | pág. 32, precedente |
| 5 | Λοιπά έκτακτα έξοδα | pág. 32, precedente |
| 6 | Απομειώσεις περιουσιακών στοιχείων (καθαρό ποσό) | pág. 18, precedente |

### Meta

```text
tools/cargar.mjs (2026-10-13). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee.
```

```text
tools/caja-deuda.mjs (2026-10-17): grossDebt escalón 0 (compuerta: ajuste manual): ajuste manual (2026-10-17): Claude 2026-10-17 (leído en el balance por subagente Sonnet, criterio de deuda financiera): Δάνεια (no corriente) 5.899,97 + Τραπεζικά δάνεια (corriente) 24.128,13. Nota 5.4.14: dos préstamos para comprar autos (reserva de dominio); incluidos como préstamos.; cash escalón 0 (compuerta: ajuste manual): ajuste manual (2026-10-17): Claude 2026-10-17 (leído en el balance por subagente Sonnet, criterio de deuda financiera): Ταμειακά διαθέσιμα και ισοδύναμα 268.203,50. Balance individual (sin grupo).
```

### Liga

```text
tools/cargar.mjs (2026-10-13): gr-superleague, verificado contra roster cacheado de "2024–25 Super League Greece" (tools/club-league-reference/gr.json), coincidencia exacta "Asteras Tripolis".
```

## 2024

### Ingresos

```text
2024: cargado por tools/cargar.mjs (2026-10-13) desde Clubes/Grecia/Asteras Tripolis/Asteras_FS_2024-06-30.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Grecia/Asteras Tripolis/Asteras_FS_2024-06-30.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Έσοδα αγώνων | pág. 31, Jev 0.95 |
| 2 | Έσοδα από τηλεοπτικές μεταδόσεις αγώνων | pág. 31, Jev 1 |
| 3 | Έσοδα από παραχώρηση ποδοσφαιριστών | pág. 31, precedente |
| 4 | Επιχορηγήσεις | pág. 31, Claude 0.85 |
| 5 | Αποζημίωση ειδικού σκοπού αθλητικών σωματείων | pág. 31, precedente |
| 6 | Διάφορα έσοδα πωλήσεων | pág. 31, precedente |
| 7 | Έσοδα από παροχή υπηρεσιών σε τρίτους | pág. 31, precedente |
| 8 | Έσοδα από συνεισφορά αλληλεγγύης και τροφεία | pág. 31, precedente |
| 9 | Άλλα λειτουργικά έσοδα | pág. 31, Jev 0.97 |
| 10 | Έσοδα συμμετοχών και επενδύσεων | pág. 18, Jev 1 |
| 11 | Κέρδος από αγορά οντότητας ή τμήματος σε τιμή ευκαιρίας | pág. 18, Jev 0.92 |
| 12 | Λοιπά Έκτακτα και ανόργανα έσοδα | pág. 31, Jev 1 |
| 13 | Έσοδα από αχρησιμοποίητες προβλέψεις προηγούμενων χρήσεων | pág. 31, Jev 1 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Κόστος πωλήσεων (Κόστος λειτουργίας ποδοσφαιρικού τμήματος) | pág. 18, Jev 0.93 |
| 2 | Έξοδα διοίκησης | pág. 18, Jev 1 |
| 3 | Έξοδα διάθεσης | pág. 18, Claude 0.85 |
| 4 | Φορολογικά πρόστιμα και προσαυξήσεις | pág. 32, precedente |
| 5 | Λοιπά έκτακτα έξοδα | pág. 32, precedente |
| 6 | Απομειώσεις περιουσιακών στοιχείων (καθαρό ποσό) | pág. 18, precedente |

### Meta

```text
tools/cargar.mjs (2026-10-13). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee.
```

```text
tools/caja-deuda.mjs (2026-10-16): grossDebt escalón 2 (compuerta: documento siguiente): "Δάνεια" pág. 17 + "Τραπεζικά δάνεια" pág. 17; cash escalón 2 (compuerta: documento siguiente): "Ταμειακά διαθέσιμα και ισοδύναμα" pág. 16
```

### Liga

```text
tools/cargar.mjs (2026-10-13): gr-superleague, verificado contra roster cacheado de "2023–24 Super League Greece" (tools/club-league-reference/gr.json), coincidencia exacta "Asteras Tripolis".
```

## 2023

### Ingresos

```text
2023: cargado por tools/cargar.mjs (2026-10-13) desde Clubes/Grecia/Asteras Tripolis/Asteras_FS_2023-06-30.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Grecia/Asteras Tripolis/Asteras_FS_2023-06-30.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Έσοδα αγώνων | pág. 31, Jev 0.95 |
| 2 | Έσοδα από τηλεοπτικές μεταδόσεις αγώνων | pág. 31, Jev 1 |
| 3 | Έσοδα από παραχώρηση ποδοσφαιριστών | pág. 31, precedente |
| 4 | Επιχορηγήσεις | pág. 31, Claude 0.85 |
| 5 | Αποζημίωση ειδικού σκοπού αθλητικών σωματείων | pág. 31, precedente |
| 6 | Έσοδα από παροχή υπηρεσιών σε τρίτους | pág. 31, precedente |
| 7 | Έσοδα από συνεισφορά αλληλεγγύης και τροφεία | pág. 31, precedente |
| 8 | Κέρδη και ζημιές από διάθεση μη κυκλοφορούντων στοιχείων | pág. 18, Jev 0.99 |
| 9 | Έσοδα συμμετοχών και επενδύσεων | pág. 18, Jev 1 |
| 10 | Κέρδος από αγορά οντότητας ή τμήματος σε τιμή ευκαιρίας | pág. 18, Jev 0.92 |
| 11 | Λοιπά έσοδα και κέρδη | pág. 18, Jev 0.99 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Κόστος πωλήσεων (Κόστος λειτουργίας ποδοσφαιρικού τμήματος) | pág. 18, Jev 0.93 |
| 2 | Έξοδα διοίκησης | pág. 18, Jev 1 |
| 3 | Έξοδα διάθεσης | pág. 18, Claude 0.85 |
| 4 | Πρόβλεψη για επισφαλείς απαιτήσεις | pág. 32, precedente |
| 5 | Φορολογικά πρόστιμα και προσαυξήσεις | pág. 32, precedente |
| 6 | Λοιπά έκτακτα έξοδα | pág. 32, precedente |
| 7 | Απομειώσεις περιουσιακών στοιχείων (καθαρό ποσό) | pág. 18, precedente |

### Meta

```text
tools/cargar.mjs (2026-10-13). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee.
```

```text
tools/caja-deuda.mjs (2026-10-16): grossDebt escalón 2 (compuerta: documento siguiente): "Δάνεια" pág. 17 + "Τραπεζικά δάνεια" pág. 17; cash escalón 2 (compuerta: documento siguiente): "Ταμειακά διαθέσιμα και ισοδύναμα" pág. 16
```

### Liga

```text
tools/cargar.mjs (2026-10-13): gr-superleague, verificado contra roster cacheado de "2022–23 Super League Greece" (tools/club-league-reference/gr.json), coincidencia exacta "Asteras Tripolis".
```

## 2022

### Ingresos

```text
2022: cargado por tools/cargar.mjs (2026-10-13) desde Clubes/Grecia/Asteras Tripolis/Asteras_FS_2022-06-30.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Grecia/Asteras Tripolis/Asteras_FS_2022-06-30.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Έσοδα αγώνων | pág. 34, Jev 0.95 |
| 2 | Έσοδα από τηλεοπτικές μεταδόσεις αγώνων | pág. 34, Jev 1 |
| 3 | Έσοδα από παραχώρηση ποδοσφαιριστών | pág. 34, precedente |
| 4 | Επιχορηγήσεις | pág. 34, Claude 0.85 |
| 5 | Έσοδα από παροχή υπηρεσιών σε τρίτους | pág. 34, precedente |
| 6 | Έσοδα από συνεισφορά αλληλεγγύης και τροφεία | pág. 34, precedente |
| 7 | Άλλα λειτουργικά έσοδα | pág. 34, Jev 0.97 |
| 8 | Κέρδη και ζημιές από διάθεση μη κυκλοφορούντων στοιχείων | pág. 18, Jev 0.99 |
| 9 | Έσοδα συμμετοχών και επενδύσεων | pág. 18, Jev 1 |
| 10 | Κέρδος από αγορά οντότητας ή τμήματος σε τιμή ευκαιρίας | pág. 18, Jev 0.92 |
| 11 | Λοιπά έσοδα και κέρδη | pág. 18, Jev 0.99 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Κόστος πωλήσεων (Κόστος λειτουργίας ποδοσφαιρικού τμήματος) | pág. 18, Jev 0.93 |
| 2 | Έξοδα διοίκησης | pág. 18, Jev 1 |
| 3 | Έξοδα διάθεσης | pág. 18, Claude 0.85 |
| 4 | Πρόβλεψη για επισφαλείς απαιτήσεις | pág. 35, precedente |
| 5 | Φορολογικά πρόστιμα και προσαυξήσεις | pág. 35, precedente |
| 6 | Έκτακτα έξοδα από οριστικοποίηση δικαστικής αξίωσης προηγούμενης χρήσης | pág. 35, Claude 0.85 |
| 7 | Λοιπά έκτακτα έξοδα | pág. 35, precedente |
| 8 | Απομειώσεις περιουσιακών στοιχείων (καθαρό ποσό) | pág. 18, precedente |

### Meta

```text
tools/cargar.mjs (2026-10-13). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee.
```

```text
tools/caja-deuda.mjs (2026-10-16): grossDebt escalón 2 (compuerta: documento siguiente): "Δάνεια" pág. 17 + "Τραπεζικά δάνεια" pág. 17; cash escalón 1b (compuerta: documento siguiente): "Ταμειακά διαθέσιμα και ισοδύναμα" pág. 16
```

### Liga

```text
tools/cargar.mjs (2026-10-13): gr-superleague, verificado contra roster cacheado de "2021–22 Super League Greece" (tools/club-league-reference/gr.json), coincidencia exacta "Asteras Tripolis".
```

## 2021

### Ingresos

```text
2021: cargado por tools/cargar.mjs (2026-10-13) desde Clubes/Grecia/Asteras Tripolis/Asteras_FS_2021-06-30.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Grecia/Asteras Tripolis/Asteras_FS_2021-06-30.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Έσοδα από τηλεοπτικές μεταδόσεις αγώνων | pág. 30, precedente |
| 2 | Έσοδα από παραχώρηση ποδοσφαιριστών | pág. 30, precedente |
| 3 | Επιχορηγήσεις | pág. 30, precedente |
| 4 | Αποζημίωση ειδικού σκοπού αθλητικών σωματείων | pág. 30, precedente |
| 5 | Έσοδα από παροχή υπηρεσιών σε τρίτους | pág. 30, precedente |
| 6 | Έσοδα από συνεισφορά αλληλεγγύης και τροφεία | pág. 30, precedente |
| 7 | Κέρδη και ζημιές από διάθεση μη κυκλοφορούντων στοιχείων | pág. 18, precedente |
| 8 | Έσοδα συμμετοχών και επενδύσεων | pág. 18, precedente |
| 9 | Κέρδος από αγορά οντότητας ή τμήματος σε τιμή ευκαιρίας | pág. 18, precedente |
| 10 | Λοιπά έσοδα και κέρδη | pág. 18, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Κόστος πωλήσεων (Κόστος λειτουργίας ποδοσφαιρικού τμήματος) | pág. 18, precedente |
| 2 | Έξοδα διοίκησης | pág. 18, precedente |
| 3 | Έξοδα διάθεσης | pág. 18, precedente |
| 4 | Πρόβλεψη για επισφαλείς απαιτήσεις | pág. 31, precedente |
| 5 | Φορολογικά πρόστιμα και προσαυξήσεις | pág. 31, precedente |
| 6 | Λοιπά έκτακτα έξοδα | pág. 31, precedente |
| 7 | Απομειώσεις περιουσιακών στοιχείων (καθαρό ποσό) | pág. 18, precedente |

### Meta

```text
tools/cargar.mjs (2026-10-13). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee.
```

```text
tools/caja-deuda.mjs (2026-10-16): cash escalón 1b (compuerta: documento siguiente): "Ταμειακά διαθέσιμα και ισοδύναμα" pág. 16
```

```text
tools/caja-deuda.mjs (2026-10-17): grossDebt escalón 0 (compuerta: ajuste manual): ajuste manual (2026-10-17): Claude 2026-10-17 (leído en el balance por subagente Sonnet, criterio de deuda financiera): Μακροπρόθεσμα Δάνεια 0,00 + Τραπεζικά δάνεια (corriente) 0,00. Balance completo (Σύνολο υποχρεώσεων 530.558,49), sin otra fila financiera.
```

### Liga

```text
tools/cargar.mjs (2026-10-13): gr-superleague, verificado contra roster cacheado de "2020–21 Super League Greece" (tools/club-league-reference/gr.json), coincidencia exacta "Asteras Tripolis".
```

## 2020

### Ingresos

```text
2020: cargado por tools/cargar.mjs (2026-10-13) desde Clubes/Grecia/Asteras Tripolis/Asteras_FS_2020-06-30.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Grecia/Asteras Tripolis/Asteras_FS_2020-06-30.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Έσοδα αγώνων | pág. 31, Jev 0.95 |
| 2 | Έσοδα από τηλεοπτικές μεταδόσεις αγώνων | pág. 31, Jev 1 |
| 3 | Έσοδα από παραχώρηση ποδοσφαιριστών | pág. 31, precedente |
| 4 | Επιχορηγήσεις | pág. 31, Claude 0.85 |
| 5 | Έσοδα από παροχή υπηρεσιών σε τρίτους | pág. 31, precedente |
| 6 | Έσοδα από συνεισφορά αλληλεγγύης | pág. 31, precedente |
| 7 | Άλλα λειτουργικά έσοδα | pág. 31, Jev 0.97 |
| 8 | Λοιπά Έκτακτα και ανόργανα έσοδα | pág. 31, Jev 1 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Κόστος πωλήσεων (Κόστος λειτουργίας ποδοσφαιρικού τμήματος) | pág. 19, Jev 0.93 |
| 2 | Έξοδα διοίκησης | pág. 19, Jev 1 |
| 3 | Έξοδα διάθεσης | pág. 19, Claude 0.85 |
| 4 | Πρόβλεψη για επισφαλείς απαιτήσεις | pág. 32, precedente |
| 5 | Φορολογικά πρόστιμα και προσαυξήσεις | pág. 32, precedente |
| 6 | Προσαυξήσεις Εισφ. Ασφαλιστικών Ταμείων | pág. 32, ? 0.6 |
| 7 | Λοιπά έκτακτα έξοδα | pág. 32, precedente |
| 8 | Απομειώσεις περιουσιακών στοιχείων (καθαρό ποσό) | pág. 19, precedente |

### Meta

```text
2020: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-13): categoria = player_sales. mecanismo de solidaridad cobrado por jugadores formados en el club: compraventa de jugadores, igual que Asteras 2021-2025 (decisión de Guido 2026-10-13)
tools/cargar.mjs (2026-10-13). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee.
```

```text
tools/caja-deuda.mjs (2026-10-16): cash escalón 1b (compuerta: documento siguiente): "Ταμειακά διαθέσιμα και ισοδύναμα" pág. 17
```

```text
tools/caja-deuda.mjs (2026-10-17): grossDebt escalón 0 (compuerta: ajuste manual): ajuste manual (2026-10-17): Claude 2026-10-17 (leído en el balance por subagente Sonnet, criterio de deuda financiera): Μακροπρόθεσμα Δάνεια 0,00 + Τραπεζικά δάνεια (corriente) 0,00. Balance completo (Σύνολο υποχρεώσεων 716.302,37), sin otra fila financiera.
```

## 2019

### Ingresos

```text
2019: cargado por tools/cargar.mjs (2026-10-13) desde Clubes/Grecia/Asteras Tripolis/Asteras_FS_2019-06-30.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Grecia/Asteras Tripolis/Asteras_FS_2019-06-30.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Έσοδα αγώνων | pág. 30, Jev 0.95 |
| 2 | Έσοδα από τηλεοπτικές μεταδόσεις αγώνων | pág. 30, Jev 1 |
| 3 | Έσοδα από παραχώρηση ποδοσφαιριστών | pág. 30, precedente |
| 4 | Έσοδα από πώληση λοιπών αποθεμάτων | pág. 30, precedente |
| 5 | Επιχορηγήσεις | pág. 30, Claude 0.85 |
| 6 | Διάφορα έσοδα πωλήσεων | pág. 30, precedente |
| 7 | Έσοδα από παροχή υπηρεσιών σε τρίτους | pág. 30, precedente |
| 8 | Άλλα λειτουργικά έσοδα | pág. 30, Jev 0.97 |
| 9 | Λοιπά έσοδα και κέρδη | pág. 18, Jev 0.99 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Αμοιβές και έξοδα προσωπικού | pág. 31, precedente |
| 2 | Αμοιβές και έξοδα τρίτων | pág. 31, precedente |
| 3 | Παροχές τρίτων | pág. 31, precedente |
| 4 | Φόροι και τέλη | pág. 31, Jev 0.98 |
| 5 | Διάφορα έξοδα | pág. 31, Jev 0.98 |
| 6 | Αποσβέσεις παγίων στο λειτουργικό κόστος | pág. 31, Jev 0.99 |
| 7 | Πρόβλεψη αποζημίωσης προσωπικού | pág. 31, precedente |
| 8 | Αξία χορηγούμενων εισιτηρίων δωρεάν | pág. 31, precedente |
| 9 | Πρόβλεψη για επισφαλείς απαιτήσεις | pág. 31, precedente |
| 10 | Φορολογικά πρόστιμα και προσαυξήσεις | pág. 31, precedente |
| 11 | Αποσβέσεις αποχωρησάντων ποδοσφαιριστών | pág. 31, precedente |
| 12 | Λοιπά έκτακτα έξοδα | pág. 31, precedente |
| 13 | Απομειώσεις περιουσιακών στοιχείων (καθαρό ποσό) | pág. 18, precedente |

### Meta

```text
tools/cargar.mjs (2026-10-13). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

```text
tools/caja-deuda.mjs (2026-10-13): grossDebt escalón 2 (compuerta: documento siguiente): "Δάνεια" pág. 17 + "Τραπεζικά δάνεια" pág. 17
```

```text
tools/caja-deuda.mjs (2026-10-16): cash escalón 1b (compuerta: documento siguiente): "Ταμειακά διαθέσιμα και ισοδύναμα" pág. 16
```

### Liga

```text
alta-club.mjs (2026-10-13): gr-superleague, verificado contra roster cacheado de "2018–19 Super League Greece" (tools/club-league-reference/gr.json), coincidencia exacta "Asteras Tripolis".
```

## Fuentes

### asterastripolis-gr-asteras-fs-2019-06-30

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-13) desde la transcripción Clubes/Grecia/Asteras Tripolis/Asteras_FS_2019-06-30.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### asterastripolis-gr-asteras-fs-2020-06-30

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-13) desde la transcripción Clubes/Grecia/Asteras Tripolis/Asteras_FS_2020-06-30.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### asterastripolis-gr-asteras-fs-2022-06-30

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-13) desde la transcripción Clubes/Grecia/Asteras Tripolis/Asteras_FS_2022-06-30.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### asterastripolis-gr-asteras-fs-2023-06-30

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-13) desde la transcripción Clubes/Grecia/Asteras Tripolis/Asteras_FS_2023-06-30.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### asterastripolis-gr-asteras-fs-2024-06-30

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-13) desde la transcripción Clubes/Grecia/Asteras Tripolis/Asteras_FS_2024-06-30.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### asterastripolis-gr-asteras-fs-2025-06-30

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-13) desde la transcripción Clubes/Grecia/Asteras Tripolis/Asteras_FS_2025-06-30.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### asterastripolis-gr-asteras-fs-2021-06-30

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-13) desde la transcripción Clubes/Grecia/Asteras Tripolis/Asteras_FS_2021-06-30.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```
