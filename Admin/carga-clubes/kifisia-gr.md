# kifisia-gr — evidencia de carga

Lo que antes iba como comentario en el data file del club, `data/<país>/kifisia-gr-data.js` (la regla: `Admin/CONVENCIONES-DATOS.md`, "data/<país>/<club>-data.js NO LLEVA
COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y meta. Las notas de cada fila van en una tabla con su número de
fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
Kifisia: alta por tools/alta-club.mjs (2026-10-14) desde Clubes/Grecia/Kifisia/Kifisia_notes_2022-06-30.pdf. brandColor #20367D
(procedencia en Admin/sourcing/Grecia/Kifisia.md; tools/cargar-lote.mjs).
```

```text
data/gr/kifisia-gr-data.js — Kifisia - Athlitiki Enosis P.A.E. (Grecia).
ALTA POR SCRIPT (tools/alta-club.mjs, 2026-10-14), SIN EJERCICIOS CARGADOS TODAVÍA: las estructuras del data file
nacen vacías a propósito. Los rubros, los totales oficiales y el resto del fiscalYearMeta los agrega la etapa de carga.

Documento que originó el alta: Clubes/Grecia/Kifisia/Kifisia_notes_2022-06-30.pdf

De dónde salió cada campo (estado según alta-club.mjs: ok / pendiente):
  id                 ok        "kifisia-gr" — slug de "Kifisia" + '-gr' (convención de clubId, Admin/CONVENCIONES.md Versión 129)
  name               ok        "Kifisia - Athlitiki Enosis P.A.E." — ajuste manual (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-14): Revisión del alta (Claude, 2026-10-14, subagente Sonnet revisado): razón so
  displayName        ok        "Kifisia" — nombre de la carpeta del club en Clubes/
  country            ok        "GR" — carpeta de país "Grecia" (tabla PAISES)
  reportingCurrency  ok        "EUR" — moneda de curso legal de Grecia
  fiscalYearStart    ok        "07-01" — cierre del ejercicio: nombre del archivo (2022-06-30) y contenido del .md (35 de 37 fechas de fin de mes)
  sport              ok        "futbol" — el .md nombra el fútbol 31 veces y ningún otro deporte más que eso
  brandColor         pendiente (ausente) — la liga del club no está en tools/brand-color-reference/ (o el club no está en footylogos)
  anio               ok        2022 — nombre del archivo (misma regla que onboard.mjs --quien), confirmado por las fechas de cierre del .md
  cierre             ok        "2022-06-30" — año del ejercicio + mes de cierre (nombre del archivo (2022-06-30) y contenido del .md (35 de 37 fechas de fin de mes))
  reportType         ok        "official_balance_sheet" — el .md tiene un estado contable (resultados / balance) y el nombre del archivo no sugiere otro tipo
  perimetro          ok        "individual" — ajuste manual (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-13): Claude 2026-10-13: PAE sin grupo: las 6-8 menciones de 'consolidado' son el
  currency           ok        "EUR" — moneda de curso legal de Grecia (tabla PAISES de alta-club.mjs)
  fxRef              ok        "EUR@2022-06-30" — el documento no declara tipo de cambio; FX_CLOSE ya tiene EUR@2022-06-30 = 0.9627 (Cierre BCE al 30/6/2022 (1 EUR = 1,0387 USD))
  sourceId           ok        "kifisia-gr-notes-2022-06-30" — clubId + nombre del archivo en slug
  liga               pendiente null — no aparece en los rosters cacheados de 2022 (gr-superleague, gr-superleague2): puede haber jugado otra división

FISCAL YEAR META PROPUESTO para 2022 (NO registrado: un ejercicio con meta y
sin rubros se vería en el sitio como un año en cero, y "sin dato no es cero"):
  2022: {"reportType":"official_balance_sheet","currency":"EUR","fxRef":"EUR@2022-06-30","sourceId":"kifisia-gr-notes-2022-06-30"}
```

## Gestiones

_investigado por un subagente (Sonnet) con fuente por gestión, 2026-10-14; to-do 231:_

```text
Christos Pritsas (2018-01-01 a hoy): Dueño y presidente. Mononews dice que 'desde 2018' Pritsas asumió la conducción del club (solo el año: día y mes 01 por convención). La PAE se constituyó el 26/7/2021 y el directorio definitivo lo eligió la asamblea del 6/9/2021 con Pritsas de Presidente (Kifisia_notes_2022-06-30.md:157-160); es dueño del 67,40% vía AUTOMECH IKE (Kifisia_notes_2022-06-30.md:~140). Lo reeligió la asamblea del 1/3/2023 (Kifisia_notes_2022-06-30.md:201) y la del 6/3/2025 (Kifisia_notes_2025-06-30.md:177). Firma como Presidente los balances 2022 (5/4/2023, línea 1192), 2023 (29/2/2024, línea 1124), 2024 (14/1/2025, línea 1137) y 2025 (10/2/2026, línea 306). En ningún cierre cambió la gestión entre cierre y firma. El ejercicio 2022 es el primero de la PAE (9/8/2021 a 30/6/2022). Parapolitika (3/1/2023) también lo llama 'ιδιοκτήτης της ΠΑΕ Κηφισιά'.
Duda: El 'desde' 2018 sale de una sola fuente de prensa (Mononews: 'desde 2018 asumió'), sin mes ni día; como presidente de la PAE consta documentalmente solo desde la asamblea del 6/9/2021. No afecta a ningún cierre (todos son posteriores a 2021). Wikipedia en griego e inglés lo listan como presidente sin fecha.
```

## 2025

### Ingresos

```text
2025: cargado por tools/cargar.mjs (2026-10-14) desde Clubes/Grecia/Kifisia/Kifisia_notes_2025-06-30.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Grecia/Kifisia/Kifisia_notes_2025-06-30.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Έσοδα εισιτηρίων | pág. 12, Jev 1 |
| 2 | Χορηγίες και διαφήμιση | pág. 12, Jev 1 |
| 3 | Δικαιώματα αναμετάδοσης | pág. 12, Jev 1 |
| 4 | Εμπορικές δραστηριότητες | pág. 12, Jev 0.93 |
| 5 | Επίδομα μηχανισμού αλληλεγγύης και χρηματικά έπαθλα UEFA | pág. 12, Jev 1 |
| 6 | Επιχορηγήσεις από εθνικό φορέα ποδοσφαίρου ή κυβέρνηση | pág. 12, precedente |
| 7 | Άλλα λειτουργικά έσοδα | pág. 12, Jev 0.98 |
| 8 | λοιπά έσοδα /έξοδα μεταγραφών | pág. 12, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Κόστος πωλήσεων /υλικών | pág. 12, precedente |
| 2 | Αμοιβές έμμισθου προσωπικού (μικτά ποσά) | pág. 26, Claude 0.8 |
| 3 | Κοινωνικές επιβαρύνσεις (εργοδοτικές εισφορές) | pág. 26, precedente |
| 4 | Παρεπόμενες παροχές | pág. 26, precedente |
| 5 | Απόσβεση και απομείωση ενσώματων παγίων στοιχείων ενεργητικού | pág. 12, Jev 0.98 |
| 6 | Απόσβεση και απομείωση λοιπών άυλων στοιχείων (εξαιρουμένων ποδοσφαιριστών) | pág. 12, Jev 0.97 |
| 7 | Λοιπά λειτουργικά έξοδα | pág. 12, Claude 0.85 |
| 8 | Απόσβεση εγγραφών παικτών και απομείωση εγγραφών παικτών | pág. 12, Jev 0.95 |

### Meta

```text
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-14): cierre = 2025-06-30. Claude 2026-10-14: el ejercicio va del 01/07/2024 al 30/06/2025 (estado de resultados de ese período); periodo.mjs no lo detectó
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-14): fila = 60.000,00. Claude 2026-10-14 (cola del lote 71, subagente Sonnet + revisión): la fila de L421 (otros ingresos de transferencias, 60.000) no la trajo la extracción; con ella el resultado cierra: 1.180.270,79 - 2.213.233,40 + 60.000 - 1.116,45 - 1.000 = -975.079,06 (L427)
tools/cargar.mjs (2026-10-14). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

```text
tools/caja-deuda.mjs (2026-10-14): cash escalón 2 (compuerta: documento anterior): "Ταμειακά διαθέσιμα και ισοδύναμα" pág. 10
```

```text
tools/caja-deuda.mjs (2026-10-17): grossDebt escalón 0 (compuerta: ajuste manual): ajuste manual (2026-10-17): Claude 2026-10-17 (leído en el balance por subagente Sonnet, criterio de deuda financiera): Balance completo (Σύνολο Υποχρεώσεων 1.486.352,06): sólo comerciales, impuestos, seguridad social y otras; sin fila de préstamos (nota 10.1.1: sin préstamos a largo plazo). Sin deuda financiera.
```

### Liga

```text
tools/cargar.mjs (2026-10-14): null, SIN VERIFICAR (no aparece en los rosters cacheados de 2025 (gr-superleague, gr-superleague2): puede haber jugado otra división).
```

```text
tools/ligas-sin-verificar.mjs (2026-10-18): gr-superleague2, verificado contra la lista de equipos de "2024–25 Super League Greece 2" (Wikipedia; tools/club-league-reference/gr.json, gr-superleague2 2025). Antes: sin fila.
```

## 2024

### Ingresos

```text
2024: cargado por tools/cargar.mjs (2026-10-14) desde Clubes/Grecia/Kifisia/Kifisia_notes_2024-06-30.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Grecia/Kifisia/Kifisia_notes_2024-06-30.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Κύκλος εργασιών (καθαρός) | pág. 15, Jev 0.99 |
| 2 | Λοιπά συνήθη έσοδα | pág. 15, Jev 1 |
| 3 | Λοιπά έσοδα και κέρδη | pág. 15, Jev 0.99 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Αγορές εμπορευμάτων και υλικών | pág. 15, precedente |
| 2 | Παροχές σε εργαζόμενους | pág. 15, precedente |
| 3 | Αποσβέσεις | pág. 15, precedente |
| 4 | ΑΜΟΙΒΕΣ ΚΑΙ ΕΞΟΔΑ ΤΡΙΤΩΝ | pág. 29, precedente |
| 5 | ΠΑΡΟΧΕΣ ΤΡΙΤΩΝ | pág. 29, precedente |
| 6 | ΦΟΡΟΙ - ΤΕΛΗ | pág. 29, Jev 0.98 |
| 7 | ΔΙΑΦΟΡΑ ΕΞΟΔΑ | pág. 29, Jev 0.97 |

### Meta

```text
tools/cargar.mjs (2026-10-14). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee.
```

```text
tools/caja-deuda.mjs (2026-10-14): cash escalón 2 (compuerta: documento siguiente): "Ταμειακά διαθέσιμα και ισοδύναμα" pág. 13
```

```text
tools/dentro-de-otro.mjs (2026-10-14): posiblemente dentro de otro rubro, por precedente del club (la fila tiene plata en sus balances desglosados 2023, 2025): Comercial / Sponsors, Estadio, Televisión
```

```text
tools/caja-deuda.mjs (2026-10-17): grossDebt escalón 0 (compuerta: ajuste manual): ajuste manual (2026-10-17): Claude 2026-10-17 (leído en el balance por subagente Sonnet, criterio de deuda financiera): Balance completo (Σύνολο Υποχρεώσεων 1.149.458,48): sólo comerciales, impuestos, seguridad social y otras; sin fila de préstamos (nota 10.1.1: sin préstamos a largo plazo). Sin deuda financiera.
```

### Liga

```text
tools/cargar.mjs (2026-10-14): gr-superleague, verificado contra roster cacheado de "2023–24 Super League Greece" (tools/club-league-reference/gr.json), coincidencia única por palabras "A.E. Kifisia" = "Kifisia".
```

## 2023

### Ingresos

```text
2023: cargado por tools/cargar.mjs (2026-10-14) desde Clubes/Grecia/Kifisia/Kifisia_notes_2023-06-30.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Grecia/Kifisia/Kifisia_notes_2023-06-30.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Έσοδα εισιτηρίων | pág. 28, Jev 1 |
| 2 | Χορηγίες και διαφήμιση | pág. 28, Jev 1 |
| 3 | Λοιπά συνήθη έσοδα | pág. 14, precedente |
| 4 | Λοιπά έσοδα και κέρδη | pág. 14, Jev 0.99 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Παροχές σε εργαζόμενους | pág. 14, precedente |
| 2 | Αποσβέσεις | pág. 14, precedente |
| 3 | ΑΜΟΙΒΕΣ ΚΑΙ ΕΞΟΔΑ ΤΡΙΤΩΝ | pág. 28, precedente |
| 4 | ΠΑΡΟΧΕΣ ΤΡΙΤΩΝ | pág. 28, precedente |
| 5 | ΦΟΡΟΙ - ΤΕΛΗ | pág. 28, Jev 0.98 |
| 6 | ΔΙΑΦΟΡΑ ΕΞΟΔΑ | pág. 28, Jev 0.97 |
| 7 | ΛΟΙΠΑ ΕΚΤΑΚΤΑ & ΑΝΟΡΓ.ΕΞΟΔΑ | pág. 28, precedente |

### Meta

```text
2023: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-14): categoria = broadcasting. Claude 2026-10-14 (lote 75 resuelto sin API, pedido de Guido): la nota de ingresos abre 'Λοιπά συνήθη έσοδα' (42.500,00, L483) en una sola fila, 'Τηλεοπτικά δικαιώματα' 42.500,00 (L1004)
tools/cargar.mjs (2026-10-14). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

```text
tools/caja-deuda.mjs (2026-10-14): cash escalón 2 (compuerta: documento siguiente): "Ταμειακά διαθέσιμα και ισοδύναμα" pág. 12
```

```text
tools/caja-deuda.mjs (2026-10-17): grossDebt escalón 0 (compuerta: ajuste manual): ajuste manual (2026-10-17): Claude 2026-10-17 (leído en el balance por subagente Sonnet, criterio de deuda financiera): Balance completo (Σύνολο Υποχρεώσεων 440.371,17): sólo comerciales, impuestos, seguridad social y otras; sin fila de préstamos (nota 10.1.1: sin préstamos a largo plazo). Sin deuda financiera.
```

### Liga

```text
tools/cargar.mjs (2026-10-14): null, SIN VERIFICAR (no aparece en los rosters cacheados de 2023 (gr-superleague, gr-superleague2): puede haber jugado otra división).
```

```text
tools/ligas-sin-verificar.mjs (2026-10-18): gr-superleague2, verificado contra la lista de equipos de "2022–23 Super League Greece 2" (Wikipedia; tools/club-league-reference/gr.json, gr-superleague2 2023). Antes: sin fila.
```

## 2022

No se carga: el ejercicio va del 9/8/2021 al 30/6/2022 (primer ejercicio de la ΠΑΕ, unos 10,7 meses); está en
`Admin/registros/documentos-parciales.txt` (decisión de Guido, 2026-10-14). `cargar-lote` lo había escrito igual (to-do 232 j) y se sacó a mano.

### Ingresos

```text
2022: cargado por tools/cargar.mjs (2026-10-14) desde Clubes/Grecia/Kifisia/Kifisia_notes_2022-06-30.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Grecia/Kifisia/Kifisia_notes_2022-06-30.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Κύκλος εργασιών (καθαρός) | pág. 15, Jev 0.99 |
| 2 | Λοιπά συνήθη έσοδα | pág. 15, Jev 1 |
| 3 | Λοιπά έσοδα και κέρδη | pág. 15, Jev 0.99 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Αγορές εμπορευμάτων και υλικών | pág. 15, precedente |
| 2 | Παροχές σε εργαζόμενους | pág. 15, precedente |
| 3 | Αποσβέσεις | pág. 15, precedente |
| 4 | ΑΜΟΙΒΕΣ ΚΑΙ ΕΞΟΔΑ ΤΡΙΤΩΝ | pág. 30, precedente |
| 5 | ΠΑΡΟΧΕΣ ΤΡΙΤΩΝ | pág. 30, precedente |
| 6 | ΦΟΡΟΙ - ΤΕΛΗ | pág. 30, Jev 0.98 |
| 7 | ΔΙΑΦΟΡΑ ΕΞΟΔΑ | pág. 30, Jev 0.97 |
| 8 | ΛΟΙΠΑ ΕΚΤΑΚΤΑ & ΑΝΟΡΓ.ΕΞΟΔΑ | pág. 30, precedente |

### Meta

```text
tools/cargar.mjs (2026-10-14). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee.
```

```text
tools/dentro-de-otro.mjs (2026-10-14): posiblemente dentro de otro rubro, por precedente del club (la fila tiene plata en sus balances desglosados 2023, 2025): Comercial / Sponsors, Estadio, Televisión
```

```text
tools/caja-deuda.mjs (2026-10-14): cash escalón 0 (compuerta: documento siguiente): "Ταμειακά διαθέσιμα και ισοδύναμα" pág. 13
```

```text
tools/caja-deuda.mjs (2026-10-17): grossDebt escalón 0 (compuerta: ajuste manual): ajuste manual (2026-10-17): Claude 2026-10-17 (leído en el balance por subagente Sonnet, criterio de deuda financiera): Balance completo (Σύνολο Υποχρεώσεων 207.339,00): sólo comerciales, impuestos, seguridad social y otras; sin fila de préstamos (nota 10.1.1: sin préstamos a largo plazo). Sin deuda financiera.
```

### Liga

```text
tools/ligas-sin-verificar.mjs (2026-10-18): gr-superleague2, verificado contra la lista de equipos de "2021–22 Super League Greece 2" (Wikipedia; tools/club-league-reference/gr.json, gr-superleague2 2022). Antes: sin fila.
```

## Fuentes

### kifisia-gr-notes-2024-06-30

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-14) desde la transcripción Clubes/Grecia/Kifisia/Kifisia_notes_2024-06-30.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### kifisia-gr-notes-2025-06-30

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-14) desde la transcripción Clubes/Grecia/Kifisia/Kifisia_notes_2025-06-30.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### kifisia-gr-notes-2023-06-30

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-14) desde la transcripción Clubes/Grecia/Kifisia/Kifisia_notes_2023-06-30.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### kifisia-gr-notes-2022-06-30

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-14) desde la transcripción Clubes/Grecia/Kifisia/Kifisia_notes_2022-06-30.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```
