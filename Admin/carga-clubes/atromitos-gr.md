# atromitos-gr — evidencia de carga

Lo que antes iba como comentario en el data file del club, `data/<país>/atromitos-gr-data.js` (la regla: `Admin/CONVENCIONES-DATOS.md`, "data/<país>/<club>-data.js NO LLEVA
COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y meta. Las notas de cada fila van en una tabla con su número de
fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
Atromitos: alta por tools/alta-club.mjs (2026-10-14) desde Clubes/Grecia/Atromitos/Atromitos_notes_2015-16.pdf. brandColor #173A75
(procedencia en Admin/sourcing/Grecia/Atromitos.md; tools/cargar-lote.mjs).
```

```text
data/gr/atromitos-gr-data.js — A.P.S. Atromitos Athinon 1923 P.A.E. (Grecia).
ALTA POR SCRIPT (tools/alta-club.mjs, 2026-10-14), SIN EJERCICIOS CARGADOS TODAVÍA: las estructuras del data file
nacen vacías a propósito. Los rubros, los totales oficiales y el resto del fiscalYearMeta los agrega la etapa de carga.

Documento que originó el alta: Clubes/Grecia/Atromitos/Atromitos_notes_2015-16.pdf

De dónde salió cada campo (estado según alta-club.mjs: ok / pendiente):
  id                 ok        "atromitos-gr" — slug de "Atromitos" + '-gr' (convención de clubId, Admin/CONVENCIONES.md Versión 129)
  name               ok        "A.P.S. Atromitos Athinon 1923 P.A.E." — ajuste manual (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-14): Revisión del alta (Claude, 2026-10-14, subagente Sonnet revisado): razón so
  displayName        ok        "Atromitos" — nombre de la carpeta del club en Clubes/
  country            ok        "GR" — carpeta de país "Grecia" (tabla PAISES)
  reportingCurrency  ok        "EUR" — moneda de curso legal de Grecia
  fiscalYearStart    ok        "07-01" — cierre del ejercicio: contenido del .md (59 de 59 fechas de fin de mes caen en el mes 6)
  sport              ok        "futbol" — el .md nombra el fútbol 23 veces y ningún otro deporte más que eso
  brandColor         pendiente (ausente) — la liga del club no está en tools/brand-color-reference/ (o el club no está en footylogos)
  anio               ok        2016 — nombre del archivo (misma regla que onboard.mjs --quien), confirmado por las fechas de cierre del .md
  cierre             ok        "2016-06-30" — año del ejercicio + mes de cierre (contenido del .md (59 de 59 fechas de fin de mes caen en el mes 6))
  reportType         ok        "official_balance_sheet" — el .md tiene un estado contable (resultados / balance) y el nombre del archivo no sugiere otro tipo
  perimetro          ok        "individual" — ajuste manual (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-13): Claude 2026-10-13: PAE sin grupo: las 6-8 menciones de 'consolidado' son el
  currency           ok        "EUR" — moneda de curso legal de Grecia (tabla PAISES de alta-club.mjs)
  fxRef              ok        "EUR@2016-06-30" — el documento no declara tipo de cambio; FX_CLOSE ya tiene EUR@2016-06-30 = 0.900739 (Tipo de referencia del Banco Central Europeo al 2016-06-30)
  sourceId           ok        "atromitos-gr-notes-2015-16" — clubId + nombre del archivo en slug
  liga               ok        "gr-superleague" — roster cacheado de "2015–16 Super League Greece" (tools/club-league-reference/gr.json), coincidencia exacta "Atromitos"

FISCAL YEAR META PROPUESTO para 2016 (NO registrado: un ejercicio con meta y
sin rubros se vería en el sitio como un año en cero, y "sin dato no es cero"):
  2016: {"reportType":"official_balance_sheet","currency":"EUR","fxRef":"EUR@2016-06-30","sourceId":"atromitos-gr-notes-2015-16"}
```

## Gestiones

_investigado por un subagente (Sonnet) con fuente por gestión, 2026-10-14; to-do 231:_

```text
Georgios Spanos (2005-05-01 a 2017-11-10): Dueño (grupo ETEKA) y presidente. El sitio oficial del club dice que en mayo de 2005 quedó al frente del club tras la absorcion de Chalkidona (la pagina del presidente dice junio de 2005; in.gr informa el anuncio del 31/5/2005): desde 2005-05-01 por convencion de dia 01 (solo mes). Hasta el 10/11/2017, cuando cedio la presidencia a Betsis (sport-fm, 10/11/2017) mientras enfrentaba un juicio. Balance 2015-16: Atromitos_board_report_2015-16.md:59-63 lo firma 'Ο Πρόεδρος του Δ.Σ.' con SPANOS GEORGIOS primero en la lista; Atromitos_notes_2015-16.md:957-961 lo firma 'Ο ΠΡΟΕΔΡΟΣ & Δ/ΝΩΝ ΣΥΜΒΟΥΛΟΣ ΤΟΥ ΔΣ - ΣΠΑΝΟΣ ΓΕΩΡΓΙΟΣ' (31/10/2016, aprobacion y firma ya con Spanos presidente: no hay cambio entre cierre y firma). En el mismo balance Betsis figura como miembro (Atromitos_board_report_2015-16.md:69) y Koxenoglou como vicepresidenta y directora ejecutiva.
Vasilios Betsis (2017-11-10 a hoy): Era 2do vicepresidente y subalcalde de Peristeri; asumio la presidencia el 10/11/2017 (sport-fm) cuando Spanos cedio el cargo; Koxenoglou paso a directora ejecutiva. Se presento como cambio temporal hasta que Spanos resolviera su causa, pero sigue de presidente (los balances 2019 a 2025 lo firman como 'Πρόεδρος του Δ.Σ.': Atromitos_board_report_2019-06-30.md:165-166; _2020-06-30.md:166-168; _2021-06-30.md:165-166; _2022-06-30.md:178-180; _2023-06-30.md:188-190; _2024-06-30.md:189-190; _2025-06-30.md:198-200). Fechas de firma: 1/10/2019, 1/10/2020, 29/10/2021, 18/1/2023, 4/1/2024, 7/1/2025, 10/10/2025: en todas ya presidia, no hay cambio entre cierre y firma. En Oct 2025 la prensa lo sigue llamando presidente (sportal/gazzetta, detencion del 18/10/2025, liberado el 21/10/2025).
Decidido por Guido (2026-10-14), presidente que firma y no el dueño; era duda: Spanos (ETEKA) siguio de dueño y accionista principal despues de 2017 (los balances 2024 y 2025 mencionan al 'Βασικός Μέτοχος' y a ETEKA AE como parte vinculada por 'κοινή διοίκηση'), pero no firma ni integra el directorio 2019-2025 y formalmente dejó la presidencia en 2017. Se cargó a Betsis, que es quien firma; si Guido prefiere el criterio de Panathinaikos (dueño persona aunque haya presidente formal), habria que cargar a Spanos hasta hoy y mencionar a Betsis en notas. No se encontro una fuente que diga quien conduce de hecho.
Duda: Venta 2025: en junio de 2025 se acordo la venta de ~94% a Chagia Hasin (aprobada por la EEA); la wikipedia griega dice que el trato fracaso por falta de garantia bancaria. No se verifico el estado actual de la propiedad en 2026; no cambia al presidente que firma.
Duda: Fecha exacta de asuncion de Spanos en 2005 no confirmada (mayo segun el sitio del club, junio segun la pagina del presidente; anuncio 31/5/2005). Solo afecta el 'desde'; el cierre 2016 queda cubierto igual.
Duda: No se pudo abrir sdna.gr (403); la fecha 10/11/2017 sale de sport-fm y es consistente con las otras notas de prensa encontradas (naftemporiki, metrosport, cityview), que no se abrieron.
```

## 2025

### Ingresos

```text
2025: cargado por tools/cargar.mjs (2026-10-14) desde Clubes/Grecia/Atromitos/Atromitos_FS_2025-06-30.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Grecia/Atromitos/Atromitos_FS_2025-06-30.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Κύκλος εργασιών (καθαρός) | pág. 10, Jev 1 |
| 2 | Λοιπά συνήθη έσοδα | pág. 10, Jev 1 |
| 3 | Λοιπά έσοδα και κέρδη | pág. 10, Jev 1 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Κόστος πωλήσεων | pág. 10, precedente |
| 2 | Έξοδα διοίκησης | pág. 10, Jev 1 |
| 3 | Λοιπά έξοδα και ζημίες | pág. 10, Jev 0.95 |

### Meta

```text
tools/cargar.mjs (2026-10-14). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee.
```

```text
tools/dentro-de-otro.mjs (2026-10-14): posiblemente dentro de otro rubro, por precedente del club (la fila tiene plata en sus balances desglosados 2019, 2020, 2021, 2022, 2023, 2024): Comercial / Sponsors, Televisión, Premios por competencias
```

```text
tools/caja-deuda.mjs (2026-10-14): grossDebt escalón 2 (compuerta: documento anterior): "Δάνεια" pág. 9 + "Τραπεζικά δάνεια" pág. 9 + "Βραχυπρόθεσμο μέρος μακροπρόθεσμων δανείων" pág. 9; cash escalón 2 (compuerta: documento anterior): "Ταμειακά διαθέσιμα και ισοδύναμα" pág. 8
```

### Liga

```text
tools/cargar.mjs (2026-10-14): gr-superleague, verificado contra roster cacheado de "2024–25 Super League Greece" (tools/club-league-reference/gr.json), coincidencia exacta "Atromitos".
```

## 2024

### Ingresos

```text
2024: cargado por tools/cargar.mjs (2026-10-14) desde Clubes/Grecia/Atromitos/Atromitos_FS_2024-06-30.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Grecia/Atromitos/Atromitos_FS_2024-06-30.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Από εισιτήρια αγώνων | pág. 25, Jev 1 |
| 2 | Από τηλεοπτικά δικαιώματα | pág. 25, Jev 1 |
| 3 | Από χορηγίες-διαφήμιση | pág. 25, Jev 1 |
| 4 | Κέρδη από πωλήσεις παγίων | pág. 25, Jev 0.99 |
| 5 | Επιχορήγηση από Super League-ΕΠΟ | pág. 25, precedente |
| 6 | Έσοδα από ΕΠΟ και Έσοδα από Κύπελλο Ελλάδος | pág. 25, Jev 0.91 |
| 7 | Ενοίκια Κυλικείου | pág. 25, precedente |
| 8 | Λοιπά έκτακτα και ανόργανα | pág. 25, Jev 0.98 |
| 9 | Ληφθείσες αποζημιώσεις | pág. 25, Claude 0.8 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Κόστος πωλήσεων | pág. 10, precedente |
| 2 | Έξοδα διοίκησης | pág. 10, Jev 1 |
| 3 | Λοιπά έξοδα και ζημίες | pág. 10, Jev 0.95 |

### Meta

```text
tools/cargar.mjs (2026-10-14). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee.
```

```text
tools/caja-deuda.mjs (2026-10-14): grossDebt escalón 2 (compuerta: documento siguiente): "Δάνεια" pág. 9 + "Τραπεζικά δάνεια" pág. 9 + "Βραχυπρόθεσμο μέρος μακροπρόθεσμων δανείων" pág. 9; cash escalón 2 (compuerta: documento siguiente): "Ταμειακά διαθέσιμα και ισοδύναμα" pág. 8
```

### Liga

```text
tools/cargar.mjs (2026-10-14): gr-superleague, verificado contra roster cacheado de "2023–24 Super League Greece" (tools/club-league-reference/gr.json), coincidencia exacta "Atromitos".
```

## 2023

### Ingresos

```text
2023: cargado por tools/cargar.mjs (2026-10-14) desde Clubes/Grecia/Atromitos/Atromitos_FS_2023-06-30.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Grecia/Atromitos/Atromitos_FS_2023-06-30.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Από εισιτήρια αγώνων | pág. 23, Jev 1 |
| 2 | Από τηλεοπτικά δικαιώματα | pág. 23, Jev 1 |
| 3 | Από παραχώρηση ποδ/στών στο εσωτερικό-εξωτερικό | pág. 23, Jev 1 |
| 4 | Από χορηγίες-διαφήμιση | pág. 23, Jev 1 |
| 5 | Κέρδη από πωλήσεις παγίων | pág. 23, Jev 0.99 |
| 6 | Επιχορήγηση από Super League-ΕΠΟ | pág. 23, precedente |
| 7 | Επιχορήγηση από συμμετοχή UEFA | pág. 23, Jev 1 |
| 8 | Έσοδα από ΕΠΟ και Έσοδα από Κύπελλο Ελλάδος | pág. 23, Jev 0.91 |
| 9 | Ενοίκια Κυλικείου | pág. 23, precedente |
| 10 | Λοιπά έσοδα και κέρδη | pág. 9, Jev 1 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Κόστος πωλήσεων | pág. 9, precedente |
| 2 | Έξοδα διοίκησης | pág. 9, Jev 1 |
| 3 | Λοιπά έξοδα και ζημίες | pág. 9, Jev 0.95 |

### Meta

```text
tools/cargar.mjs (2026-10-14). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee.
```

```text
tools/caja-deuda.mjs (2026-10-14): grossDebt escalón 2 (compuerta: documento siguiente): "Δάνεια" pág. 8 + "Τραπεζικά δάνεια" pág. 8 + "Βραχυπρόθεσμο μέρος μακροπρόθεσμων δανείων" pág. 8; cash escalón 2 (compuerta: documento siguiente): "Ταμειακά διαθέσιμα και ισοδύναμα" pág. 7
```

### Liga

```text
tools/cargar.mjs (2026-10-14): gr-superleague, verificado contra roster cacheado de "2022–23 Super League Greece" (tools/club-league-reference/gr.json), coincidencia exacta "Atromitos".
```

## 2022

### Ingresos

```text
2022: cargado por tools/cargar.mjs (2026-10-14) desde Clubes/Grecia/Atromitos/Atromitos_FS_2022-06-30.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Grecia/Atromitos/Atromitos_FS_2022-06-30.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Από εισιτήρια αγώνων | pág. 23, Jev 1 |
| 2 | Από τηλεοπτικά δικαιώματα | pág. 23, Jev 1 |
| 3 | Από παραχώρηση ποδ/στών στο εσωτερικό-εξωτερικό | pág. 23, Jev 1 |
| 4 | Από χορηγίες-διαφήμιση | pág. 23, Jev 1 |
| 5 | Επιχορήγηση από Super League-ΕΠΟ | pág. 23, precedente |
| 6 | Έσοδα από ΕΠΟ και Έσοδα από Κύπελλο Ελλάδος | pág. 23, Jev 0.91 |
| 7 | Ενοίκια Κυλικείου | pág. 23, precedente |
| 8 | Λοιπά έκτακτα και ανόργανα | pág. 23, Jev 0.98 |
| 9 | Μη επιστρέω ποσό επιστρεπτέας προκαταβολής | pág. 23, Jev 0.99 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Κόστος πωλήσεων | pág. 9, precedente |
| 2 | Έξοδα διοίκησης | pág. 9, Jev 1 |
| 3 | Λοιπά έξοδα και ζημίες | pág. 9, Jev 0.95 |

### Meta

```text
tools/cargar.mjs (2026-10-14). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee.
```

```text
tools/caja-deuda.mjs (2026-10-14): grossDebt escalón 2 (compuerta: documento siguiente): "Δάνεια" pág. 8 + "Τραπεζικά δάνεια" pág. 8 + "Βραχυπρόθεσμο μέρος μακροπρόθεσμων δανείων" pág. 8; cash escalón 2 (compuerta: documento siguiente): "Ταμειακά διαθέσιμα και ισοδύναμα" pág. 7
```

### Liga

```text
tools/cargar.mjs (2026-10-14): gr-superleague, verificado contra roster cacheado de "2021–22 Super League Greece" (tools/club-league-reference/gr.json), coincidencia exacta "Atromitos".
```

## 2021

### Ingresos

```text
2021: cargado por tools/cargar.mjs (2026-10-14) desde Clubes/Grecia/Atromitos/Atromitos_notes_2021-06-30.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Grecia/Atromitos/Atromitos_notes_2021-06-30.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Από τηλεοπτικά δικαιώματα | pág. 23, Jev 1 |
| 2 | Από παραχώρηση ποδ/στών στο εσωτερικό-εξωτερικό | pág. 23, Jev 1 |
| 3 | Από χορηγίες-διαφήμιση | pág. 23, Jev 1 |
| 4 | Κέρδη από πωλήσεις παγίων | pág. 23, Jev 0.99 |
| 5 | Επιχορήγηση από Super League-ΕΠΟ | pág. 23, precedente |
| 6 | Επιχορήγηση από UEFA Ακαδημιών | pág. 23, precedente |
| 7 | Έσοδα από ΕΠΟ - Κύπελλο Ελλάδος | pág. 23, Jev 0.97 |
| 8 | Ενοίκια Κυλικείου | pág. 23, precedente |
| 9 | Λοιπά έσοδα και κέρδη | pág. 9, Jev 1 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Κόστος πωλήσεων | pág. 9, precedente |
| 2 | Έξοδα διοίκησης | pág. 9, Jev 1 |
| 3 | Λοιπά έξοδα και ζημίες | pág. 9, Jev 0.95 |

### Meta

```text
tools/cargar.mjs (2026-10-14). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee.
```

```text
tools/caja-deuda.mjs (2026-10-14): grossDebt escalón 2 (compuerta: documento siguiente): "Δάνεια" pág. 8 + "Τραπεζικά δάνεια" pág. 8; cash escalón 2 (compuerta: documento siguiente): "Ταμειακά διαθέσιμα και ισοδύναμα" pág. 7
```

### Liga

```text
tools/cargar.mjs (2026-10-14): gr-superleague, verificado contra roster cacheado de "2020–21 Super League Greece" (tools/club-league-reference/gr.json), coincidencia exacta "Atromitos".
```

## 2020

### Ingresos

```text
2020: cargado por tools/cargar.mjs (2026-10-14) desde Clubes/Grecia/Atromitos/Atromitos_notes_2020-06-30.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Grecia/Atromitos/Atromitos_notes_2020-06-30.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Από εισιτήρια αγώνων | pág. 23, Jev 1 |
| 2 | Από τηλεοπτικά δικαιώματα | pág. 23, Jev 1 |
| 3 | Από χορηγίες-διαφήμιση | pág. 23, Jev 1 |
| 4 | Επιχορήγηση από Super League-ΕΠΟ | pág. 23, precedente |
| 5 | Επιχορήγηση από συμμετοχή UEFA | pág. 23, Jev 1 |
| 6 | Επιχορήγηση από UEFA Ακαδημιών | pág. 23, precedente |
| 7 | Έσοδα από ΕΠΟ - Κύπελλο Ελλάδος | pág. 23, Jev 0.97 |
| 8 | Ενοίκια Κυλικείου | pág. 23, precedente |
| 9 | Λοιπά έσοδα και κέρδη | pág. 9, Jev 1 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Κόστος πωλήσεων | pág. 9, precedente |
| 2 | Έξοδα διοίκησης | pág. 9, Jev 1 |
| 3 | Λοιπά έξοδα και ζημίες | pág. 9, Jev 0.95 |

### Meta

```text
tools/cargar.mjs (2026-10-14). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee.
```

```text
tools/caja-deuda.mjs (2026-10-14): grossDebt escalón 2 (compuerta: documento siguiente): "Δάνεια" pág. 8 + "Τραπεζικά δάνεια" pág. 8; cash escalón 2 (compuerta: documento siguiente): "Ταμειακά διαθέσιμα και ισοδύναμα" pág. 7
```

### Liga

```text
tools/cargar.mjs (2026-10-14): gr-superleague, verificado contra roster cacheado de "2019–20 Super League Greece" (tools/club-league-reference/gr.json), coincidencia exacta "Atromitos".
```

## 2019

### Ingresos

```text
2019: cargado por tools/cargar.mjs (2026-10-14) desde Clubes/Grecia/Atromitos/Atromitos_FS_2019-06-30.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Grecia/Atromitos/Atromitos_FS_2019-06-30.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Από εισιτήρια αγώνων | pág. 25, Jev 1 |
| 2 | Από τηλεοπτικά δικαιώματα | pág. 25, Jev 1 |
| 3 | Από χορηγίες-διαφήμιση | pág. 25, Jev 1 |
| 4 | Επιχορήγηση από Super League-ΕΠΟ | pág. 25, precedente |
| 5 | Επιχορήγηση από συμμετοχή UEFA | pág. 25, Jev 1 |
| 6 | Επιχορήγηση από UEFA Ακαδημιών | pág. 25, precedente |
| 7 | Έσοδα από αποζημιώσεις | pág. 25, Jev 0.98 |
| 8 | Έσοδα από ΕΠΟ - Κύπελλο Ελλάδος | pág. 25, Jev 0.97 |
| 9 | Ενοίκια Κυλικείου | pág. 25, precedente |
| 10 | Λοιπά έσοδα και κέρδη | pág. 10, Jev 1 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Κόστος πωλήσεων | pág. 10, precedente |
| 2 | Έξοδα διοίκησης | pág. 10, Jev 1 |
| 3 | Λοιπά έξοδα και ζημίες | pág. 10, Jev 0.95 |

### Meta

```text
tools/cargar.mjs (2026-10-14). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee.
```

```text
tools/caja-deuda.mjs (2026-10-14): grossDebt escalón 2 (compuerta: documento siguiente): "Δάνεια" pág. 9 + "Τραπεζικά δάνεια" pág. 9; cash escalón 2 (compuerta: documento siguiente): "Ταμειακά διαθέσιμα και ισοδύναμα" pág. 8
```

### Liga

```text
tools/cargar.mjs (2026-10-14): gr-superleague, verificado contra roster cacheado de "2018–19 Super League Greece" (tools/club-league-reference/gr.json), coincidencia exacta "Atromitos".
```

## 2016

### Ingresos

```text
2016: cargado por tools/cargar.mjs (2026-10-14) desde Clubes/Grecia/Atromitos/Atromitos_notes_2015-16.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Grecia/Atromitos/Atromitos_notes_2015-16.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Κύκλος εργασιών (καθαρός) | pág. 8, Jev 1 |
| 2 | Λοιπά συνήθη έσοδα | pág. 8, Jev 1 |
| 3 | Λοιπά έσοδα και κέρδη | pág. 8, Jev 1 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Κόστος πωλήσεων | pág. 8, precedente |
| 2 | Έξοδα διοίκησης | pág. 8, Jev 1 |
| 3 | Λοιπά έξοδα και ζημίες | pág. 8, Jev 0.95 |

### Meta

```text
tools/cargar.mjs (2026-10-14). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee.
```

```text
tools/dentro-de-otro.mjs (2026-10-14): posiblemente dentro de otro rubro, por precedente del club (la fila tiene plata en sus balances desglosados 2019, 2020, 2021, 2022, 2023, 2024): Comercial / Sponsors, Televisión, Premios por competencias
```

```text
tools/caja-deuda.mjs (2026-10-17): grossDebt escalón 0 (compuerta: ajuste manual): ajuste manual (2026-10-17): Claude 2026-10-17 (leído en el balance por subagente Sonnet, criterio de deuda financiera): Τραπεζικά δάνεια (corriente) 503.249,90 + deuda no corriente 0 (nota 10.1.1: sin deuda bancaria a largo plazo). La no corriente sólo tenía 'Λοιπές μακροπρόθεσμες' 0,00 (102.892,29 en 2015, cuotas de contratos).; cash escalón 0 (compuerta: ajuste manual): ajuste manual (2026-10-17): Claude 2026-10-17 (leído en el balance por subagente Sonnet, criterio de deuda financiera): Ταμειακά διαθέσιμα και ισοδύναμα 89.009,68. Balance individual.
```

### Liga

```text
alta-club.mjs (2026-10-14): gr-superleague, verificado contra roster cacheado de "2015–16 Super League Greece" (tools/club-league-reference/gr.json), coincidencia exacta "Atromitos".
```

## Fuentes

### atromitos-gr-notes-2015-16

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-14) desde la transcripción Clubes/Grecia/Atromitos/Atromitos_notes_2015-16.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### atromitos-gr-fs-2019-06-30

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-14) desde la transcripción Clubes/Grecia/Atromitos/Atromitos_FS_2019-06-30.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### atromitos-gr-notes-2020-06-30

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-14) desde la transcripción Clubes/Grecia/Atromitos/Atromitos_notes_2020-06-30.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### atromitos-gr-notes-2021-06-30

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-14) desde la transcripción Clubes/Grecia/Atromitos/Atromitos_notes_2021-06-30.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### atromitos-gr-fs-2022-06-30

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-14) desde la transcripción Clubes/Grecia/Atromitos/Atromitos_FS_2022-06-30.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### atromitos-gr-fs-2023-06-30

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-14) desde la transcripción Clubes/Grecia/Atromitos/Atromitos_FS_2023-06-30.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### atromitos-gr-fs-2024-06-30

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-14) desde la transcripción Clubes/Grecia/Atromitos/Atromitos_FS_2024-06-30.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### atromitos-gr-fs-2025-06-30

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-14) desde la transcripción Clubes/Grecia/Atromitos/Atromitos_FS_2025-06-30.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```
