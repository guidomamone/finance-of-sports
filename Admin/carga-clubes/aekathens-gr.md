# aekathens-gr — evidencia de carga

Lo que antes iba como comentario en el data file del club, `data/<país>/aekathens-gr-data.js` (la regla: `Admin/CONVENCIONES-DATOS.md`, "data/<país>/<club>-data.js NO LLEVA
COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y meta. Las notas de cada fila van en una tabla con su número de
fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
AEK Athens: alta por tools/alta-club.mjs (2026-10-13) desde Clubes/Grecia/AEK Athens/AEK_oikonomikes_katastaseis.pdf. brandColor #FCD20F
(procedencia en Admin/sourcing/Grecia/AEK Athens.md; tools/cargar-lote.mjs).
```

```text
data/gr/aekathens-gr-data.js — Athlitiki Enosis Konstantinoupoleos P.A.E. (Grecia).
ALTA POR SCRIPT (tools/alta-club.mjs, 2026-10-13), SIN EJERCICIOS CARGADOS TODAVÍA: las estructuras del data file
nacen vacías a propósito. Los rubros, los totales oficiales y el resto del fiscalYearMeta los agrega la etapa de carga.

Documento que originó el alta: Clubes/Grecia/AEK Athens/AEK_oikonomikes_katastaseis.pdf

De dónde salió cada campo (estado según alta-club.mjs: ok / pendiente):
  id                 ok        "aekathens-gr" — slug de "AEK Athens" + '-gr' (convención de clubId, Admin/CONVENCIONES.md Versión 129)
  name               ok        "Athlitiki Enosis Konstantinoupoleos P.A.E." — ajuste manual (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-09): Revisión del alta (Claude, 2026-10-09): razón social del documento (ΠΟΔΟΣΦΑΙ
  displayName        ok        "AEK Athens" — nombre de la carpeta del club en Clubes/
  country            ok        "GR" — carpeta de país "Grecia" (tabla PAISES)
  reportingCurrency  ok        "EUR" — moneda de curso legal de Grecia
  fiscalYearStart    ok        "07-01" — cierre del ejercicio: contenido del .md (142 de 142 fechas de fin de mes caen en el mes 6)
  sport              ok        "futbol" — el .md nombra el fútbol 49 veces y ningún otro deporte más que eso
  brandColor         pendiente (ausente) — la liga del club no está en tools/brand-color-reference/ (o el club no está en footylogos)
  anio               ok        2016 — contenido del .md (año más nuevo con fecha de cierre)
  cierre             ok        "2016-06-30" — año del ejercicio + mes de cierre (contenido del .md (142 de 142 fechas de fin de mes caen en el mes 6))
  reportType         ok        "official_balance_sheet" — el .md tiene un estado contable (resultados / balance) y el nombre del archivo no sugiere otro tipo
  perimetro          ok        "individual" — ajuste manual (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-10): Revisión del alta (Admin/altas-revision.jsonl): sin grupo consolidado en lo
  currency           ok        "EUR" — moneda de curso legal de Grecia (tabla PAISES de alta-club.mjs)
  fxRef              ok        "EUR@2016-06-30" — el documento no declara tipo de cambio; FX_CLOSE ya tiene EUR@2016-06-30 = 0.900739 (Tipo de referencia del Banco Central Europeo al 2016-06-30)
  sourceId           ok        "aekathens-gr-aek-oikonomikes-katastaseis" — clubId + nombre del archivo en slug
  liga               ok        "gr-superleague" — roster cacheado de "2015–16 Super League Greece" (tools/club-league-reference/gr.json), coincidencia exacta "AEK Athens"

FISCAL YEAR META PROPUESTO para 2016 (NO registrado: un ejercicio con meta y
sin rubros se vería en el sitio como un año en cero, y "sin dato no es cero"):
  2016: {"reportType":"official_balance_sheet","currency":"EUR","fxRef":"EUR@2016-06-30","sourceId":"aekathens-gr-aek-oikonomikes-katastaseis"}
```

## 2025

### Ingresos

```text
2025: cargado por tools/cargar.mjs (2026-10-13) desde Clubes/Grecia/AEK Athens/AEK_NOTES_IFRS_2025-06-30_a.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Grecia/AEK Athens/AEK_NOTES_IFRS_2025-06-30_a.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Έσοδα από εισιτήρια | pág. 14, Jev 1 |
| 2 | Χορηγίες και διαφημίσεις | pág. 14, precedente |
| 3 | Δικαιώματα αναμετάδοσης | pág. 14, precedente |
| 4 | Εμπορικά | pág. 14, precedente |
| 5 | Αλληλεγγύη UEFA και χρηματικά έπαθλα | pág. 14, precedente |
| 6 | Επιχορηγήσεις από εθνικό φορέα ποδοσφαίρου ή κυβέρνηση | pág. 14, precedente |
| 7 | Λοιπά λειτουργικά έσοδα | pág. 14, precedente |
| 8 | Κέρδος/Ζημία από πώληση άυλων περιουσιακών στοιχείων - ποδοσφαιριστές | pág. 14, Claude 0.8 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Ανάλωση αθλητικού υλικού | pág. 42, precedente |
| 2 | Έξοδα φαρμακείου αθλητών | pág. 42, precedente |
| 3 | Μισθοδοσία | pág. 42, precedente |
| 4 | Αποσβέσεις συμβολαίων ποδοσφαιριστών | pág. 42, precedente |
| 5 | Απομείωση και απόσβεση | pág. 14, precedente |
| 6 | Απομείωση παγίων περιουσιακών στοιχείων | pág. 14, precedente |
| 7 | Λοιπά λειτουργικά έξοδα | pág. 14, Claude 0.85 |

### Meta

```text
tools/cargar.mjs (2026-10-13). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

```text
tools/caja-deuda.mjs (2026-10-14): cash escalón 0 (compuerta: año anterior): "Ταμειακά διαθέσιμα και ισοδύναμα" pág. 13
```

```text
tools/caja-deuda.mjs (2026-10-16): grossDebt escalón 1b (compuerta: documento anterior): "Μακροπρόθεσμες Υποχρεώσεις πληρωτέες στην Επόμενη " pág. 13
```

### Liga

```text
tools/cargar.mjs (2026-10-13): gr-superleague, verificado contra roster cacheado de "2024–25 Super League Greece" (tools/club-league-reference/gr.json), coincidencia exacta "AEK Athens".
```

## 2024

### Ingresos

```text
2024: cargado por tools/cargar.mjs (2026-10-14) desde Clubes/Grecia/AEK Athens/AEK_FS_2024-06-30.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Grecia/AEK Athens/AEK_FS_2024-06-30.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Έσοδα εισιτηρίων εγχώριων διοργανώσεων | pág. 41, precedente |
| 2 | Έσοδα από διεθνείς διοργανώσεις | pág. 41, precedente |
| 3 | Έσοδα από πωλήσεις εισιτηρίων διαρκείας | pág. 41, precedente |
| 4 | Χορηγίες και διαφημίσεις | pág. 14, Jev 1 |
| 5 | Δικαιώματα αναμετάδοσης | pág. 14, Jev 1 |
| 6 | Εμπορικά | pág. 14, Jev 1 |
| 7 | Αλληλεγγύη UEFA και χρηματικά έπαθλα | pág. 14, Jev 0.98 |
| 8 | Επιχορηγήσεις από εθνικό φορέα ποδοσφαίρου ή κυβέρνηση | pág. 14, precedente |
| 9 | Λοιπά λειτουργικά έσοδα | pág. 14, Jev 0.99 |
| 10 | Κέρδος/ζημία από πώληση άυλων περιουσιακών στοιχείων - ποδοσφαιριστές | pág. 14, Claude 0.8 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Ανάλωση αθλητικού υλικού | pág. 41, precedente |
| 2 | Έξοδα φαρμακείου αθλητών | pág. 41, precedente |
| 3 | Μισθοδοσία | pág. 42, precedente |
| 4 | Αποσβέσεις συμβολαίων ποδοσφαιριστών | pág. 42, precedente |
| 5 | Απομείωση και απόσβεση | pág. 14, precedente |
| 6 | Αποσβέσεις ιδιοχρησιμοποιούμενων κτιρίων | pág. 42, precedente |
| 7 | Αποσβέσεις μεταφορικών μεσών | pág. 42, precedente |
| 8 | Αποσβέσεις επιπλών & λοιπού εξοπλισμού | pág. 42, precedente |
| 9 | Αποσβέσεις λογισμικού | pág. 42, precedente |
| 10 | Αποσβέσεις δικαιωμάτων χρήσης στοιχείων ενεργητικού | pág. 42, precedente |
| 11 | Έξοδα αγώνων | pág. 42, precedente |
| 12 | Αμοιβές τρίτων | pág. 42, precedente |
| 13 | Τηλεπικοινωνίες | pág. 42, precedente |
| 14 | Μισθώματα | pág. 42, precedente |
| 15 | Ασφάλιστρα | pág. 42, precedente |
| 16 | Επισκευές & συντηρήσεις | pág. 42, precedente |
| 17 | Διάφοροι φοροι-τελή | pág. 42, precedente |
| 18 | Έξοδα μετακινήσεων | pág. 42, precedente |
| 19 | Διαφημίσεις και εκδηλώσεις | pág. 42, precedente |
| 20 | Συνδρομές | pág. 42, precedente |
| 21 | Δωρεές - επιχορηγήσεις | pág. 42, precedente |
| 22 | Διάφορα έξοδα | pág. 42, precedente |

### Meta

```text
tools/cargar.mjs (2026-10-14). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

```text
tools/caja-deuda.mjs (2026-10-14): cash escalón 0 (compuerta: ajuste manual): ajuste manual (2026-10-14): Claude 2026-10-14 (AEK 2024 con tokens de sesión): el balance L430 da 6.320.395 (y 7.725.899 el año anterior, igual al 2023 cargado); el flujo de efectivo L546 confirma 6.320.395. caja-deuda.mjs escalón 0 leía 0,000007 (to-do 232 x)
```

```text
tools/caja-deuda.mjs (2026-10-16): grossDebt escalón 2 (compuerta: documento siguiente): "Μακροπρόθεσμες Υποχρεώσεις πληρωτέες στην Επόμενη " pág. 13
```

### Liga

```text
tools/cargar.mjs (2026-10-14): gr-superleague, verificado contra roster cacheado de "2023–24 Super League Greece" (tools/club-league-reference/gr.json), coincidencia exacta "AEK Athens".
```

## 2023

### Ingresos

```text
2023: cargado por tools/cargar.mjs (2026-10-13) desde Clubes/Grecia/AEK Athens/AEK_FS_2023-06-30.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Grecia/AEK Athens/AEK_FS_2023-06-30.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Έσοδα εισιτηρίων εγχώριων διοργανώσεων | pág. 41, precedente |
| 2 | Έσοδα από πωλήσεις εισιτηρίων διαρκείας | pág. 41, precedente |
| 3 | Χορηγίες και διαφημίσεις | pág. 14, precedente |
| 4 | Δικαιώματα αναμετάδοσης | pág. 14, precedente |
| 5 | Εμπορικά | pág. 14, precedente |
| 6 | Αλληλεγγύη UEFA και χρηματικά έπαθλα | pág. 14, precedente |
| 7 | Επιχορηγήσεις από εθνικό φορέα ποδοσφαίρου ή κυβέρνηση | pág. 14, precedente |
| 8 | Λοιπά λειτουργικά έσοδα | pág. 14, precedente |
| 9 | Κέρδος/ζημία από πώληση άυλων περιουσιακών στοιχείων - ποδοσφαιριστές | pág. 14, Claude 0.8 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Ανάλωση αθλητικού υλικού | pág. 41, precedente |
| 2 | Έξοδα φαρμακείου αθλητών | pág. 41, precedente |
| 3 | Μισθοδοσία | pág. 41, precedente |
| 4 | Αποσβέσεις συμβολαίων ποδοσφαιριστών | pág. 41, precedente |
| 5 | Απομείωση και απόσβεση | pág. 14, precedente |
| 6 | Αποσβέσεις ιδιοχρησιμοποιούμενων κτιρίων | pág. 42, precedente |
| 7 | Αποσβέσεις μεταφορικών μέσων | pág. 42, precedente |
| 8 | Αποσβέσεις επίπλων & λοιπού εξοπλισμού | pág. 42, precedente |
| 9 | Αποσβέσεις δικαιωμάτων χρήσης στοιχείων ενεργητικού | pág. 42, Claude 0.85 |
| 10 | Λοιπά λειτουργικά έξοδα | pág. 14, Claude 0.85 |

### Meta

```text
tools/cargar.mjs (2026-10-13). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

```text
tools/caja-deuda.mjs (2026-10-13): cash escalón 2 (compuerta: documento anterior): "Ταμειακά διαθέσιμα και ισοδύναμα" pág. 13
```

```text
tools/caja-deuda.mjs (2026-10-17): grossDebt escalón 0 (compuerta: ajuste manual): ajuste manual (2026-10-17): Claude 2026-10-17 (leído en el balance por subagente Sonnet, criterio de deuda financiera): Μακροπρόθεσμες Δανειακές Υποχρεώσεις - + Δάνειο Oldenburgische Landesbank (corriente, nota 6.16) 1.084.606. El préstamo bancario corriente está dentro de 'Λοιπές Βραχυπρόθεσμες Υποχρεώσεις' (6.15), no en fila propia; arrendamientos 35.437.365 y 2.130.935 excluidos.
```

### Liga

```text
tools/cargar.mjs (2026-10-13): gr-superleague, verificado contra roster cacheado de "2022–23 Super League Greece" (tools/club-league-reference/gr.json), coincidencia exacta "AEK Athens".
```

## 2022

### Ingresos

```text
2022: cargado por tools/cargar.mjs (2026-10-13) desde Clubes/Grecia/AEK Athens/AEK_FS_orthi_epanalipsi_2022.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Grecia/AEK Athens/AEK_FS_orthi_epanalipsi_2022.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Έσοδα από εισπήρια | pág. 14, Jev 0.99 |
| 2 | Χορηγίες και διαφημίσεις | pág. 14, precedente |
| 3 | Δικαιώματα αναμετάδοσης | pág. 14, precedente |
| 4 | Εμπορικά | pág. 14, precedente |
| 5 | Αλληλεγγύη UEFA και χρηματικά έπαθλα | pág. 14, precedente |
| 6 | Λοιπά λειτουργικά έσοδα | pág. 14, precedente |
| 7 | Κέρδος/ζημία από πώληση άυλων περιουσιακών στοιχείων - ποδοσφαιριστές | pág. 14, Claude 0.8 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Ανάλυση αθλητικού υλικού | pág. 41, precedente |
| 2 | Έξοδα φαρμακείου αθλητών | pág. 41, precedente |
| 3 | Μισθοδοσία | pág. 41, precedente |
| 4 | Αποσβέσεις συμβολαίων ποδοσφαιριστών | pág. 41, precedente |
| 5 | Απομείωση και απόσβεση | pág. 14, precedente |
| 6 | Απομείωση παγίων περιουσιακών στοιχείων | pág. 14, precedente |
| 7 | Λοιπά λειτουργικά έξοδα | pág. 14, Claude 0.85 |

### Meta

```text
tools/cargar.mjs (2026-10-13). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

```text
tools/caja-deuda.mjs (2026-10-13): grossDebt escalón 0 (compuerta: ajuste manual): ajuste manual (2026-10-13): Claude 2026-10-13: deuda financiera = préstamos de la nota 6.16, a más de un año 1.084.606 + a menos de un año 4.105.722 (bonos 3.074.161 + Oldenburgische Landesbank 1.031.561); la parte corriente está dentro de 'Μακροπρόθεσμες Υποχρεώσεις πληρωτέες στην Επόμενη Χρήση' (14.206.003), mezclada con lo que se debe a jugadores; cash escalón 2 (compuerta: documento siguiente): "Ταμειακά διαθέσιμα και ισοδύναμα" pág. 13
```

### Liga

```text
tools/cargar.mjs (2026-10-13): gr-superleague, verificado contra roster cacheado de "2021–22 Super League Greece" (tools/club-league-reference/gr.json), coincidencia exacta "AEK Athens".
```

## 2021

### Ingresos

```text
2021: cargado por tools/cargar.mjs (2026-10-13) desde Clubes/Grecia/AEK Athens/AEK_Notes_IFRS_2021-06-30.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Grecia/AEK Athens/AEK_Notes_IFRS_2021-06-30.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Έσοδα από εισπήρια | pág. 14, Jev 0.99 |
| 2 | Χορηγίες και διαφημίσεις | pág. 14, Jev 1 |
| 3 | Δικαιώματα αναμετάδοσης | pág. 14, Jev 1 |
| 4 | Εμπορικά | pág. 14, Jev 1 |
| 5 | Αλληλεγγύη UEFA και χρηματικά έπαθλα | pág. 14, Jev 0.98 |
| 6 | Λοιπά λειτουργικά έσοδα | pág. 14, Jev 0.99 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Ανάλυση αθλητικού υλικού | pág. 41, Jev 1 |
| 2 | Έξοδα φαρμακείου αθλητών | pág. 41, precedente |
| 3 | Μισθοδοσία | pág. 42, precedente |
| 4 | Αποσβέσεις συμβολαίων ποδοσφαιριστών | pág. 42, Jev 1 |
| 5 | Απομείωση και απόσβεση | pág. 14, precedente |
| 6 | Αποσβέσεις ιδιαιροπροσωπικούμενων κτιρίων | pág. 42, Jev 0.95 |
| 7 | Αποσβέσεις μηχανημάτων | pág. 42, precedente |
| 8 | Αποσβέσεις μεταφορικών μεσών | pág. 42, precedente |
| 9 | Αποσβέσεις επιπλών & λοιπίου εξοπλισμού | pág. 42, precedente |
| 10 | Αποσβέσεις λογισμικού | pág. 42, Jev 0.97 |
| 11 | Πρόβλεψη αποζημίωσης προσωπικού | pág. 42, precedente |
| 12 | Έξοδα αγώνων | pág. 42, Jev 0.96 |
| 13 | Αμοιβές τρίτων | pág. 42, precedente |
| 14 | Τηλεπικοινωνίες | pág. 42, Claude 0.8 |
| 15 | Μισθώματα | pág. 42, precedente |
| 16 | Ασφάλιστρα | pág. 42, Claude 0.8 |
| 17 | Επισκευές & συντηρήσεις | pág. 42, Claude 0.85 |
| 18 | Διάφοροι φοροι-τελή | pág. 42, precedente |
| 19 | Έξοδα μετακινήσεων | pág. 42, precedente |
| 20 | Διαφημίσεις και εκδηλώσεις | pág. 42, precedente |
| 21 | Συνδρομές | pág. 42, precedente |
| 22 | Διάφορα έξοδα | pág. 42, Claude 0.82 |
| 23 | Προβλέψεις επισφαλείων | pág. 42, precedente |

### Meta

```text
tools/cargar.mjs (2026-10-13). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

```text
tools/caja-deuda.mjs (2026-10-13): grossDebt escalón 0 (compuerta: ajuste manual): ajuste manual (2026-10-13): Claude 2026-10-13: deuda financiera = préstamos de la nota 6.15 (bono convertible 2.944.209 + Oldenburgische Landesbank 3.094.026), a más de un año 5.029.327 y a menos de un año 1.008.907; la parte corriente está dentro de 'Μακροπρόθεσμες Υποχρεώσεις πληρωτέες στην Επόμενη Χρήση' (7.469.001, mezclada con lo que se debe a jugadores), así que el balance solo no la separa; cash escalón 2 (compuerta: documento siguiente): "Ταμειακά διαθέσιμα και ισοδύναμα" pág. 13
```

### Liga

```text
tools/cargar.mjs (2026-10-13): gr-superleague, verificado contra roster cacheado de "2020–21 Super League Greece" (tools/club-league-reference/gr.json), coincidencia exacta "AEK Athens".
```

## 2020

### Ingresos

```text
2020: cargado por tools/cargar.mjs (2026-10-13) desde Clubes/Grecia/AEK Athens/AEK_Notes_2020-06-30.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Grecia/AEK Athens/AEK_Notes_2020-06-30.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Έσοδα εισιτηρίων εγχώριων διοργανώσεων | pág. 40, Jev 1 |
| 2 | Έσοδα από πωλήσεις εισιτηρίων διαρκείας | pág. 40, Claude 0.95 |
| 3 | Χορηγίες και διαφημίσεις | pág. 14, Jev 1 |
| 4 | Δικαιώματα αναμετάδοσης | pág. 14, Jev 1 |
| 5 | Εμπορικά | pág. 14, Jev 1 |
| 6 | Αλληλεγγύη UEFA και χρηματικά έπαθλα | pág. 14, Jev 0.98 |
| 7 | Λοιπά λειτουργικά έσοδα | pág. 14, Jev 0.99 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Ανάλυση αθλητικού υλικού | pág. 40, Jev 1 |
| 2 | Έξοδα φαρμακείου αθλητών | pág. 40, precedente |
| 3 | Μισθοδοσία | pág. 41, precedente |
| 4 | Αποσβέσεις συμβολαίων ποδοσφαιριστών | pág. 41, Jev 1 |
| 5 | Απομείωση και απόσβεση | pág. 14, precedente |
| 6 | Αποσβέσεις ιδιοχρησιμοποιούμενων κτιρίων | pág. 41, Jev 0.99 |
| 7 | Αποσβέσεις μηχανημάτων | pág. 41, Claude 0.92 |
| 8 | Αποσβέσεις μεταφορικών μεσών | pág. 41, Claude 0.92 |
| 9 | Αποσβέσεις επιπλών & λοιπού εξοπλισμού | pág. 41, Claude 0.92 |
| 10 | Αποσβέσεις λογισμικού | pág. 41, Jev 0.97 |
| 11 | Αποσβέσεις ΔΠΧΑ 16 | pág. 41, precedente |
| 12 | Πρόβλεψη αποζημίωσης προσωπικού | pág. 41, precedente |
| 13 | Έξοδα αγώνων | pág. 41, Jev 0.96 |
| 14 | Αμοιβές τρίτων | pág. 41, precedente |
| 15 | Τηλεπικοινωνίες | pág. 41, Claude 0.8 |
| 16 | Μισθώματα | pág. 41, precedente |
| 17 | Ασφάλιστρα | pág. 41, Claude 0.8 |
| 18 | Επισκευές & συντηρήσεις | pág. 41, Claude 0.85 |
| 19 | Διάφοροι φορών-τελή | pág. 41, Claude 0.9 |
| 20 | Έξοδα μετακινήσεων | pág. 41, precedente |
| 21 | Διαφημίσεις και εκδηλώσεις | pág. 41, precedente |
| 22 | Συνδρομές | pág. 41, precedente |
| 23 | Δωρεές - επιχορηγήσεις | pág. 41, precedente |
| 24 | Διάφορα έξοδα | pág. 41, Claude 0.82 |
| 25 | Προβλέψεις για ειδικές υποθέσεις | pág. 41, precedente |

### Meta

```text
tools/cargar.mjs (2026-10-13). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

```text
tools/caja-deuda.mjs (2026-10-13): cash escalón 2 (compuerta: documento siguiente): "Ταμειακά διαθέσιμα και ισοδύναμα" pág. 13
```

```text
tools/caja-deuda.mjs (2026-10-17): grossDebt escalón 0 (compuerta: ajuste manual): ajuste manual (2026-10-17): Claude 2026-10-17 (leído en el balance por subagente Sonnet, criterio de deuda financiera): Μακροπρόθεσμες Δανειακές Υποχρεώσεις - ; sin deuda corriente (arrendamientos 234.817 y 225.512 excluidos). La nota de capital muestra 'Σύνολο δανεισμού (τραπεζικού)' '-'.
```

### Liga

```text
tools/cargar.mjs (2026-10-13): gr-superleague, verificado contra roster cacheado de "2019–20 Super League Greece" (tools/club-league-reference/gr.json), coincidencia exacta "AEK Athens".
```

## 2019

### Ingresos

```text
2019: cargado por tools/cargar.mjs (2026-10-13) desde Clubes/Grecia/AEK Athens/AEK_Notes_2019-06-30.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Grecia/AEK Athens/AEK_Notes_2019-06-30.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Έσοδα εισιτηρίων εγχώριων διοργανώσεων | pág. 42, Jev 1 |
| 2 | Έσοδα από πωλήσεις εισιτηρίων διαρκείας | pág. 42, Claude 0.95 |
| 3 | Χορηγίες και διαφημίσεις | pág. 15, Jev 1 |
| 4 | Δικαιώματα αναμετάδοσης | pág. 15, Jev 1 |
| 5 | Εμπορικά | pág. 15, Jev 1 |
| 6 | Αλληλεγγύη UEFA και χρηματικά έπαθλα | pág. 15, Jev 0.98 |
| 7 | Λοιπά λειτουργικά έσοδα | pág. 15, Jev 0.99 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Ανάλυση αθλητικού υλικού | pág. 42, Jev 1 |
| 2 | Έξοδα φαρμακείου αθλητών | pág. 42, precedente |
| 3 | Μισθοδοσία | pág. 43, precedente |
| 4 | Αποσβέσεις συμβολαίων ποδοσφαιριστών | pág. 43, Jev 1 |
| 5 | Απομείωση και απόσβεση | pág. 15, precedente |
| 6 | Αποσβέσεις ιδιοχρησιμοποιούμενων κτιρίων | pág. 43, Jev 0.99 |
| 7 | Αποσβέσεις μηχανημάτων | pág. 43, Claude 0.92 |
| 8 | Αποσβέσεις μεταφορικών μέσων | pág. 43, Claude 0.92 |
| 9 | Αποσβέσεις επιπλών & λοιπού εξοπλισμού | pág. 43, Claude 0.92 |
| 10 | Αποσβέσεις λογισμικού | pág. 43, Jev 0.97 |
| 11 | Έξοδα αγώνων | pág. 44, Jev 0.96 |
| 12 | Αμοιβές τρίτων | pág. 44, precedente |
| 13 | Τηλεπικοινωνίες | pág. 44, Claude 0.8 |
| 14 | Μισθώματα | pág. 44, precedente |
| 15 | Ασφάλιστρα | pág. 44, Claude 0.8 |
| 16 | Επισκευές & συντηρήσεις | pág. 44, Claude 0.85 |
| 17 | Διάφοροι φοροι-τελη | pág. 44, Claude 0.9 |
| 18 | Έξοδα μετακινήσεων | pág. 44, precedente |
| 19 | Διαφημίσεις και εκδηλώσεις | pág. 44, precedente |
| 20 | Συνδρομές | pág. 44, precedente |
| 21 | Δωρεές - επιχορηγήσεις | pág. 44, precedente |
| 22 | Διάφορα έξοδα | pág. 44, Claude 0.82 |
| 23 | Προβλέψεις επισφαλειών | pág. 44, precedente |

### Meta

```text
tools/cargar.mjs (2026-10-13). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

```text
tools/caja-deuda.mjs (2026-10-13): cash escalón 2 (compuerta: documento siguiente): "Ταμειακά διαθέσιμα και ισοδύναμα" pág. 14
```

```text
tools/caja-deuda.mjs (2026-10-17): grossDebt escalón 0 (compuerta: ajuste manual): ajuste manual (2026-10-17): Claude 2026-10-17 (leído en el balance por subagente Sonnet, criterio de deuda financiera): Μακροπρόθεσμες Δανειακές Υποχρεώσεις - ; sin fila de deuda corriente (solo 'Υποχρεώσεις από χρηματοδοτική μίσθωση' -, excluida). Balance completo con total de pasivo y sin fila financiera; 'Σύνολο δανεισμού (τραπεζικού)' en la nota es '-'.
```

### Liga

```text
tools/cargar.mjs (2026-10-13): gr-superleague, verificado contra roster cacheado de "2018–19 Super League Greece" (tools/club-league-reference/gr.json), coincidencia exacta "AEK Athens".
```

## 2018

### Ingresos

```text
2018: cargado por tools/cargar.mjs (2026-10-13) desde Clubes/Grecia/AEK Athens/AEK_Notes_2018-06-30.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Grecia/AEK Athens/AEK_Notes_2018-06-30.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Έσοδα εισιτηρίων εγχώριων διοργανώσεων | pág. 40, Jev 1 |
| 2 | Έσοδα από πωλήσεις εισιτηρίων διαρκείας | pág. 40, Claude 0.95 |
| 3 | Χορηγίες και διαφημίσεις | pág. 14, Jev 1 |
| 4 | Δικαιώματα αναμετάδοσης | pág. 14, Jev 1 |
| 5 | Εμπορικά | pág. 14, Jev 1 |
| 6 | Αλληλεγγύη UEFA και χρηματικά έπαθλα | pág. 14, Jev 0.98 |
| 7 | Λοιπά λειτουργικά έσοδα | pág. 14, Jev 0.99 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Ανάλυση αθλητικού υλικού | pág. 40, Jev 1 |
| 2 | Έξοδα φαρμακείου αθλητών | pág. 40, precedente |
| 3 | Μισθοδοσία | pág. 41, precedente |
| 4 | Αποσβέσεις συμβολαίων ποδοσφαιριστών | pág. 41, Jev 1 |
| 5 | Απομείωση και απόσβεση | pág. 14, precedente |
| 6 | Αποσβέσεις πάγιων περιουσιακών στοιχείων | pág. 41, Jev 1 |
| 7 | Αποσβέσεις λοιπών άυλων περιουσιακών στοιχείων | pág. 41, Claude 0.8 |
| 8 | Μισθώματα | pág. 41, precedente |
| 9 | Τηλεφωνικά - Ταχυδρομικά | pág. 41, Claude 0.85 |
| 10 | Ασφάλιστρα | pág. 41, Claude 0.8 |
| 11 | Επισκευές και συντηρήσεις | pág. 41, precedente |
| 12 | Έξοδα μετακινήσεων | pág. 41, precedente |
| 13 | Διαφημίσεις και εκδηλώσεις | pág. 41, precedente |
| 14 | Συνδρομές | pág. 41, precedente |
| 15 | Δωρεές | pág. 41, Jev 0.91 |
| 16 | Έξοδα δημοσιεύσεων | pág. 41, precedente |
| 17 | Φόροι - Τέλη | pág. 41, Jev 0.95 |
| 18 | Αμοιβές τρίτων | pág. 41, precedente |
| 19 | Έξοδα αγώνων | pág. 41, Jev 0.96 |
| 20 | Προβλέψεις επισφαλειών | pág. 41, precedente |
| 21 | Ζημιές από εκποίηση παγίων | pág. 41, precedente |
| 22 | Λοιπά λειτουργικά έξοδα | pág. 41, Claude 0.85 |

### Meta

```text
tools/cargar.mjs (2026-10-13). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

```text
tools/caja-deuda.mjs (2026-10-13): cash escalón 2 (compuerta: documento siguiente): "Ταμειακά διαθέσιμα και ισοδύναμα" pág. 13
```

```text
tools/caja-deuda.mjs (2026-10-17): grossDebt escalón 0 (compuerta: ajuste manual): ajuste manual (2026-10-17): Claude 2026-10-17 (leído en el balance por subagente Sonnet, criterio de deuda financiera): Μακροπρόθεσμες Δανειακές Υποχρεώσεις 1.943.892,33 + Βραχυπρόθεσμες Δανειακές Υποχρεώσεις 43,93. Préstamo de Leskira Holdings; confirma 'Σύνολο δανεισμού' 1.943.936 en la nota de capital de 2019.
```

### Liga

```text
tools/cargar.mjs (2026-10-13): gr-superleague, verificado contra roster cacheado de "2017–18 Super League Greece" (tools/club-league-reference/gr.json), coincidencia exacta "AEK Athens".
```

## 2017

### Ingresos

```text
2017: cargado por tools/cargar.mjs (2026-10-13) desde Clubes/Grecia/AEK Athens/AEK_FS_2016-2017.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Grecia/AEK Athens/AEK_FS_2016-2017.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Έσοδα εισιτηρίων εγχώριων διοργανώσεων | pág. 41, Jev 1 |
| 2 | Έσοδα από πωλήσεις εισιτηρίων διαρκείας | pág. 41, precedente |
| 3 | Χορηγίες και διαφημίσεις | pág. 13, Jev 1 |
| 4 | Δικαιώματα αναμετάδοσης | pág. 13, Jev 1 |
| 5 | Αλληλεγγύη UEFA και χρηματικά έπαθλα | pág. 13, Jev 0.98 |
| 6 | Λοιπά λειτουργικά έσοδα | pág. 13, Jev 0.99 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Ανάλυση αθλητικού υλικού | pág. 41, Jev 1 |
| 2 | Έξοδα φαρμακείου αθλητών | pág. 41, precedente |
| 3 | Μισθοδοσία | pág. 41, precedente |
| 4 | Αποσβέσεις συμβολαίων ποδοσφαιριστών | pág. 41, Jev 1 |
| 5 | Απομείωση και απόσβεση | pág. 13, precedente |
| 6 | Αποσβέσεις πάγιων περιουσιακών στοιχείων | pág. 42, Jev 1 |
| 7 | Αποσβέσεις λοιπών άυλων περιουσιακών στοιχείων | pág. 42, Claude 0.8 |
| 8 | Μισθώματα | pág. 42, precedente |
| 9 | Τηλεφωνικά - Ταχυδρομικά | pág. 42, Claude 0.85 |
| 10 | Ασφάλιστρα | pág. 42, Claude 0.8 |
| 11 | Επισκευές και συντηρήσεις | pág. 42, precedente |
| 12 | Έξοδα μετακινήσεων | pág. 42, precedente |
| 13 | Διαφημίσεις και εκδηλώσεις | pág. 42, precedente |
| 14 | Συνδρομές | pág. 42, precedente |
| 15 | Δωρεές | pág. 42, Jev 0.91 |
| 16 | Έξοδα δημοσιεύσεων | pág. 42, precedente |
| 17 | Φόροι - Τέλη | pág. 42, Jev 0.95 |
| 18 | Αμοιβές τρίτων | pág. 42, precedente |
| 19 | Έξοδα αγώνων | pág. 42, Jev 0.96 |
| 20 | Προβλέψεις επισφαλειών | pág. 42, precedente |
| 21 | Λοιπά λειτουργικά έξοδα | pág. 42, Claude 0.85 |

### Meta

```text
tools/cargar.mjs (2026-10-13). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

```text
tools/caja-deuda.mjs (2026-10-13): cash escalón 2 (compuerta: documento siguiente): "Ταμειακά διαθέσιμα και ισοδύναμα" pág. 43
```

```text
tools/caja-deuda.mjs (2026-10-17): grossDebt escalón 0 (compuerta: ajuste manual): ajuste manual (2026-10-17): Claude 2026-10-17 (leído en el balance por subagente Sonnet, criterio de deuda financiera): Μακροπρόθεσμες Δανειακές Υποχρεώσεις 2.368.221,63 + Βραχυπρόθεσμες Δανειακές Υποχρεώσεις 844.966,80. Préstamo de Leskira Holdings (con interés), parte no corriente y corriente.
```

### Liga

```text
tools/cargar.mjs (2026-10-13): gr-superleague, verificado contra roster cacheado de "2016–17 Super League Greece" (tools/club-league-reference/gr.json), coincidencia exacta "AEK Athens".
```

## 2016

### Ingresos

```text
2016: cargado por tools/cargar.mjs (2026-10-13) desde Clubes/Grecia/AEK Athens/AEK_oikonomikes_katastaseis.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Grecia/AEK Athens/AEK_oikonomikes_katastaseis.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Έσοδα εισιτηρίων εγχώριων διοργανώσεων | pág. 38, Jev 1 |
| 2 | Έσοδα από πωλήσεις εισιτηρίων διαρκείας | pág. 38, Claude 0.95 |
| 3 | Χορηγίες και διαφημίσεις | pág. 11, Jev 1 |
| 4 | Δικαιώματα αναμετάδοσης | pág. 11, Jev 1 |
| 5 | Αλληλεγγύη UEFA και χρηματικά έπαθλα | pág. 11, Jev 0.98 |
| 6 | Λοιπά λειτουργικά έσοδα | pág. 11, Jev 0.99 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Ανάλωση αθλητικού υλικού | pág. 38, Jev 1 |
| 2 | Έξοδα φαρμακείου αθλητών | pág. 38, precedente |
| 3 | Μισθοδοσία | pág. 38, precedente |
| 4 | Αποσβέσεις συμβολαίων ποδοσφαιριστών | pág. 38, Jev 1 |
| 5 | Απομείωση και απόσβεση | pág. 11, precedente |
| 6 | Αποσβέσεις πάγιων περιουσιακών στοιχείων | pág. 38, Jev 1 |
| 7 | Αποσβέσεις λοιπών άυλων περιουσιακών στοιχείων | pág. 38, Claude 0.8 |
| 8 | Μισθώματα | pág. 39, precedente |
| 9 | Τηλεφωνικά - Ταχυδρομικά | pág. 39, Claude 0.85 |
| 10 | Ασφάλιστρα | pág. 39, Claude 0.8 |
| 11 | Επισκευές και συντηρήσεις | pág. 39, precedente |
| 12 | Έξοδα μετακινήσεων | pág. 39, precedente |
| 13 | Διαφημίσεις και εκδηλώσεις | pág. 39, precedente |
| 14 | Συνδρομές | pág. 39, precedente |
| 15 | Δωρεές | pág. 39, Jev 0.91 |
| 16 | Έξοδα δημοσιεύσεων | pág. 39, precedente |
| 17 | Φόροι - Τέλη | pág. 39, Jev 0.95 |
| 18 | Αμοιβές τρίτων | pág. 39, precedente |
| 19 | Έξοδα αγώνων | pág. 39, Jev 0.96 |
| 20 | Λοιπά λειτουργικά έξοδα | pág. 39, Claude 0.85 |

### Meta

```text
tools/cargar.mjs (2026-10-13). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

```text
tools/caja-deuda.mjs (2026-10-17): grossDebt escalón 0 (compuerta: ajuste manual): ajuste manual (2026-10-17): Claude 2026-10-17 (leído en el balance por subagente Sonnet, criterio de deuda financiera): Μακροπρόθεσμες Δανειακές Υποχρεώσεις 2.775.000,00 + Βραχυπρόθεσμες 0,00. Préstamo sin interés de Oil Tank Engineering & Consulting (nota de riesgo de tasa); sin deuda corriente.; cash escalón 0 (compuerta: ajuste manual): ajuste manual (2026-10-17): Claude 2026-10-17 (leído en el balance por subagente Sonnet, criterio de deuda financiera): Ταμειακά διαθέσιμα και ισοδύναμα 612.825,85. Balance individual de la ΠΑΕ, en euros.
```

### Liga

```text
alta-club.mjs (2026-10-13): gr-superleague, verificado contra roster cacheado de "2015–16 Super League Greece" (tools/club-league-reference/gr.json), coincidencia exacta "AEK Athens".
```

## Fuentes

### aekathens-gr-aek-oikonomikes-katastaseis

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-13) desde la transcripción Clubes/Grecia/AEK Athens/AEK_oikonomikes_katastaseis.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### aekathens-gr-aek-fs-2016-2017

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-13) desde la transcripción Clubes/Grecia/AEK Athens/AEK_FS_2016-2017.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### aekathens-gr-aek-notes-2018-06-30

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-13) desde la transcripción Clubes/Grecia/AEK Athens/AEK_Notes_2018-06-30.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### aekathens-gr-aek-notes-2019-06-30

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-13) desde la transcripción Clubes/Grecia/AEK Athens/AEK_Notes_2019-06-30.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### aekathens-gr-aek-notes-2020-06-30

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-13) desde la transcripción Clubes/Grecia/AEK Athens/AEK_Notes_2020-06-30.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### aekathens-gr-aek-fs-orthi-epanalipsi-2022

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-13) desde la transcripción Clubes/Grecia/AEK Athens/AEK_FS_orthi_epanalipsi_2022.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### aekathens-gr-aek-fs-2023-06-30

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-13) desde la transcripción Clubes/Grecia/AEK Athens/AEK_FS_2023-06-30.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### aekathens-gr-aek-notes-ifrs-2025-06-30-a

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-13) desde la transcripción Clubes/Grecia/AEK Athens/AEK_NOTES_IFRS_2025-06-30_a.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### aekathens-gr-aek-notes-ifrs-2021-06-30

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-13) desde la transcripción Clubes/Grecia/AEK Athens/AEK_Notes_IFRS_2021-06-30.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### aekathens-gr-aek-fs-2024-06-30

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-14) desde la transcripción Clubes/Grecia/AEK Athens/AEK_FS_2024-06-30.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```
