# olympiacos-gr — evidencia de carga

Lo que antes iba como comentario en el data file del club, `data/<país>/olympiacos-gr-data.js` (la regla: `Admin/CONVENCIONES-DATOS.md`, "data/<país>/<club>-data.js NO LLEVA
COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y meta. Las notas de cada fila van en una tabla con su número de
fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
Olympiacos: alta por tools/alta-club.mjs (2026-10-14) desde Clubes/Grecia/Olympiacos/PAE_Olympiacos_Chrimatooikonomikes_katastaseis_2016-06-30.pdf. brandColor #E21E26
(procedencia en Admin/sourcing/Grecia/Olympiacos.md; tools/cargar-lote.mjs).
```

```text
data/gr/olympiacos-gr-data.js — Olympiakos Syndesmos Filathlon Peiraios P.A.E. (Grecia).
ALTA POR SCRIPT (tools/alta-club.mjs, 2026-10-14), SIN EJERCICIOS CARGADOS TODAVÍA: las estructuras del data file
nacen vacías a propósito. Los rubros, los totales oficiales y el resto del fiscalYearMeta los agrega la etapa de carga.

Documento que originó el alta: Clubes/Grecia/Olympiacos/PAE_Olympiacos_Chrimatooikonomikes_katastaseis_2016-06-30.pdf

De dónde salió cada campo (estado según alta-club.mjs: ok / pendiente):
  id                 ok        "olympiacos-gr" — slug de "Olympiacos" + '-gr' (convención de clubId, Admin/CONVENCIONES.md Versión 129)
  name               ok        "Olympiakos Syndesmos Filathlon Peiraios P.A.E." — ajuste manual (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-14): Revisión del alta (Claude, 2026-10-14, subagente Sonnet revisado): razón so
  displayName        ok        "Olympiacos" — nombre de la carpeta del club en Clubes/
  country            ok        "GR" — carpeta de país "Grecia" (tabla PAISES)
  reportingCurrency  ok        "EUR" — moneda de curso legal de Grecia
  fiscalYearStart    ok        "07-01" — cierre del ejercicio: nombre del archivo (2016-06-30) y contenido del .md (299 de 303 fechas de fin de mes)
  sport              ok        "futbol" — el .md nombra el fútbol 91 veces y ningún otro deporte más que eso
  brandColor         pendiente (ausente) — la liga del club no está en tools/brand-color-reference/ (o el club no está en footylogos)
  anio               ok        2016 — nombre del archivo (misma regla que onboard.mjs --quien), confirmado por las fechas de cierre del .md
  cierre             ok        "2016-06-30" — año del ejercicio + mes de cierre (nombre del archivo (2016-06-30) y contenido del .md (299 de 303 fechas de fin de mes))
  reportType         ok        "official_balance_sheet" — el .md tiene un estado contable (resultados / balance) y el nombre del archivo no sugiere otro tipo
  perimetro          ok        "individual" — ajuste manual (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-14): Claude 2026-10-14 (cola del perímetro, lote 71): cada documento trae el est
  currency           ok        "EUR" — moneda de curso legal de Grecia (tabla PAISES de alta-club.mjs)
  fxRef              ok        "EUR@2016-06-30" — el documento no declara tipo de cambio; FX_CLOSE ya tiene EUR@2016-06-30 = 0.900739 (Tipo de referencia del Banco Central Europeo al 2016-06-30)
  sourceId           ok        "olympiacos-gr-pae-olympiacos-chrimatooikonomikes-katastaseis-2016-06-30" — clubId + nombre del archivo en slug
  liga               ok        "gr-superleague" — roster cacheado de "2015–16 Super League Greece" (tools/club-league-reference/gr.json), coincidencia exacta "Olympiacos"

FISCAL YEAR META PROPUESTO para 2016 (NO registrado: un ejercicio con meta y
sin rubros se vería en el sitio como un año en cero, y "sin dato no es cero"):
  2016: {"reportType":"official_balance_sheet","currency":"EUR","fxRef":"EUR@2016-06-30","sourceId":"olympiacos-gr-pae-olympiacos-chrimatooikonomikes-katastaseis-2016-06-30"}
```

## Gestiones

_investigado por un subagente (Sonnet) con fuente por gestión, 2026-10-14; to-do 231:_

```text
Evangelos Marinakis (2010-06-01 a hoy): Compró la mayoría de la PAE a Kokkalis y asumió la presidencia en 2010 (el.wikipedia y en.wikipedia dan solo el año / 'mid-2010'; la prensa cita el traspaso del 18/6/2010, no confirmado en la fuente): desde = 2010-06-01 por convención de día 01. Sigue como dueño (Abisso Holdings 73,36% en PAE_Olympiacos_FS_2018-06-30.md:477-484, con Kokkalis 13,48%). Presidente formal del directorio: renunció en noviembre de 2017 por la causa judicial y lo reemplazó Yannis Moralis; volvió a la presidencia en febrero de 2021 (el.wikipedia, dato sin día). Durante ese lapso siguió siendo el dueño que conduce, y Moralis (vicepresidente desde 2010) fue presidente interino; no se carga por el criterio del dueño. Documentos: PAE_Olympiacos_Synoptikes_katastaseis_2016-06-30.md:18 lista a Marinakis como Πρόεδρος; los balances 2017, 2018, 2019 y 2020 firman Moralis como Πρόεδρος del Δ.Σ. (FS_2017:172 y 2078, FS_2018:174 y 2036, FS_2019:195 y 2288, FS_2020:182 y 2354); desde FS_2021:181 (12/10/2021) Moralis firma como Α' Αντιπρόεδρος y ya no aparece un Πρόεδρος firmante. Aviso para el campo firmo: los balances de los cierres 2017 (aprobado ~29/11/2017, tras la renuncia), 2018, 2019 y 2020 los firma Moralis.
Duda: Día exacto de asunción de Marinakis en 2010 (prensa: 18/6/2010; las fuentes enlazadas dan solo año): no afecta a ningún cierre.
Duda: Días exactos de la renuncia de Marinakis (nov 2017) y de su regreso (feb 2021) no encontrados. Si Guido prefiere cargar al presidente formal que firma (Moralis, nov 2017 a feb 2021) en vez del dueño, los cierres 2018, 2019 y 2020 (y 2017 si firma) cambiarían; decisión de criterio, no de datos.
```

## 2025

### Ingresos

```text
2025: cargado por tools/cargar.mjs (2026-10-14) desde Clubes/Grecia/Olympiacos/PAE_Olympiacos_IFRS_FS_2025-06-30.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Grecia/Olympiacos/PAE_Olympiacos_IFRS_FS_2025-06-30.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Έσοδα από εισιτήρια | pág. 9, Jev 0.99 |
| 2 | Χορηγίες και διαφημίσεις | pág. 9, Jev 1 |
| 3 | Δικαιώματα αναμετάδοσης | pág. 9, Jev 1 |
| 4 | Εμπορικά | pág. 9, Jev 1 |
| 5 | Έσοδα από UEFA | pág. 9, precedente |
| 6 | Λοιπά λειτουργικά έσοδα | pág. 9, Jev 0.99 |
| 7 | Αξία πώλησης ποδοσφαιριστών | pág. 37, Jev 1 |
| 8 | Αναπόσβεστο κόστος Ποδοσφαιριστών | pág. 37, precedente |
| 9 | Λοιπά άμεσα κόστη μετεγγραφής ποδοσφαιριστών | pág. 37, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Μισθοί και δόσεις συμβολαίων | pág. 35, Jev 1 |
| 2 | Εισφορές κοινωνικής ασφάλισης | pág. 35, Claude 0.85 |
| 3 | Λοιπές παροχές | pág. 35, Claude 0.8 |
| 4 | Ημερομίσθια και μισθοί | pág. 35, precedente |
| 5 | Ημερομίσθια και μισθοί εργαζομένων άρθρου 47 Κανονισμού Αδειοδότησης | pág. 35, precedente |
| 6 | Εισφορές κοινωνικής ασφάλισης | pág. 35, Claude 0.85 |
| 7 | Εισφορές κοινωνικής ασφάλισης εργαζομένων άρθρου 47 Κανονισμού Αδειοδότησης | pág. 35, precedente |
| 8 | Πρόβλεψη αποζημίωσης Προσωπικού | pág. 35, precedente |
| 9 | Απόσβεση ενσώματων ακινητοποιήσεων | pág. 36, Jev 1 |
| 10 | Απόσβεση δικαιωμάτων χρήσης περιουσιακών στοιχείων | pág. 36, precedente |
| 11 | Απόσβεση λοιπών ασώματων περιουσιακών στοιχείων (εκτός ποδοσφαιριστών) | pág. 36, Claude 0.9 |
| 12 | Απόσβεση δικαιωμάτων ποδοσφαιριστών και απομείωση | pág. 9, Claude 0.8 |
| 13 | Πρόβλεψη επισφαλών πελατών | pág. 9, Jev 1 |
| 14 | Έξοδα αγώνων | pág. 37, Jev 0.96 |
| 15 | Έξοδα χορηγιών και διαφημίσεων | pág. 37, precedente |
| 16 | Έξοδα ακινήτων & εγκαταστάσεων | pág. 37, Jev 0.93 |
| 17 | Λοιπά μη λειτουργικά έξοδα | pág. 37, Jev 0.96 |
| 18 | Έξοδα ποδοσφαιρικού τμήματος | pág. 37, Jev 0.94 |
| 19 | Αμοιβές διαμεσολαβητών | pág. 37, precedente |
| 20 | Λοιπά λειτουργικά έξοδα | pág. 37, Claude 0.85 |

### Meta

```text
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-14): categoria = player_sales. Decisión de Guido 2026-10-14: venta de jugadores como la presenta cada documento; desde 2021 (NIIF) el estado imprime solo el neto ('Κέρδη / (Ζημία) από πωλήσεις ποδοσφαιριστών'), así que los costos de la nota van como player_sales negativo (2016-2020 el estado imprime bruto y queda bruto)
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-14): categoria = player_sales. Decisión de Guido 2026-10-14: venta de jugadores como la presenta cada documento; desde 2021 (NIIF) el estado imprime solo el neto ('Κέρδη / (Ζημία) από πωλήσεις ποδοσφαιριστών'), así que los costos de la nota van como player_sales negativo (2016-2020 el estado imprime bruto y queda bruto)
tools/cargar.mjs (2026-10-14). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee.
```

### Liga

```text
tools/cargar.mjs (2026-10-14): gr-superleague, verificado contra roster cacheado de "2024–25 Super League Greece" (tools/club-league-reference/gr.json), coincidencia exacta "Olympiacos".
```

## 2024

### Ingresos

```text
2024: cargado por tools/cargar.mjs (2026-10-14) desde Clubes/Grecia/Olympiacos/PAE_Olympiacos_Consolidated_IFRS_FS_2024-06-30.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Grecia/Olympiacos/PAE_Olympiacos_Consolidated_IFRS_FS_2024-06-30.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Έσοδα από εισιτήρια | pág. 9, Jev 0.99 |
| 2 | Χορηγίες και διαφημίσεις | pág. 9, Jev 1 |
| 3 | Δικαιώματα αναμετάδοσης | pág. 9, Jev 1 |
| 4 | Εμπορικά | pág. 9, Jev 1 |
| 5 | Έσοδα από UEFA | pág. 9, precedente |
| 6 | Λοιπά λειτουργικά έσοδα | pág. 9, Jev 0.99 |
| 7 | Αξία πώλησης ποδοσφαιριστών | pág. 37, Jev 1 |
| 8 | Αναπόσβεστο κόστος Ποδοσφαιριστών | pág. 37, precedente |
| 9 | Λοιπά άμεσα κόστη μετεγγραφής ποδοσφαιριστών | pág. 37, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Μισθοί και δόσεις συμβολαίων | pág. 35, Jev 1 |
| 2 | Εισφορές κοινωνικής ασφάλισης | pág. 35, Claude 0.85 |
| 3 | Λοιπές παροχές | pág. 35, Claude 0.8 |
| 4 | Ημερομίσθια και μισθοί | pág. 35, precedente |
| 5 | Ημερομίσθια και μισθοί εργαζομένων άρθρου 47 Κανονισμού Αδειοδότησης | pág. 35, precedente |
| 6 | Εισφορές κοινωνικής ασφάλισης | pág. 35, Claude 0.85 |
| 7 | Εισφορές κοινωνικής ασφάλισης εργαζομένων άρθρου 47 Κανονισμού Αδειοδότησης | pág. 35, precedente |
| 8 | Πρόβλεψη αποζημίωσης Προσωπικού | pág. 35, precedente |
| 9 | Απόσβεση ενσώματων ακινητοποιήσεων | pág. 36, Jev 1 |
| 10 | Απόσβεση δικαιωμάτων χρήσης περιουσιακών στοιχείων | pág. 36, precedente |
| 11 | Απόσβεση λοιπών ασώματων περιουσιακών στοιχείων (εκτός ποδοσφαιριστών) | pág. 36, precedente |
| 12 | Απόσβεση δικαιωμάτων ποδοσφαιριστών και απομείωση | pág. 9, Claude 0.8 |
| 13 | Έξοδα αγώνων | pág. 37, Jev 0.96 |
| 14 | Έξοδα χορηγιών και διαφημίσεων | pág. 37, precedente |
| 15 | Έξοδα ακινήτων & εγκαταστάσεων | pág. 37, Jev 0.93 |
| 16 | Λοιπά μη λειτουργικά έξοδα | pág. 37, Jev 0.96 |
| 17 | Έξοδα ποδοσφαιρικού τμήματος | pág. 37, Jev 0.94 |
| 18 | Αμοιβές διαμεσολαβητών | pág. 37, precedente |
| 19 | Λοιπά λειτουργικά έξοδα | pág. 37, Claude 0.85 |

### Meta

```text
2024: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-14): categoria = player_sales. Decisión de Guido 2026-10-14: venta de jugadores como la presenta cada documento; desde 2021 (NIIF) el estado imprime solo el neto ('Κέρδη / (Ζημία) από πωλήσεις ποδοσφαιριστών'), así que los costos de la nota van como player_sales negativo (2016-2020 el estado imprime bruto y queda bruto)
2024: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-14): categoria = player_sales. Decisión de Guido 2026-10-14: venta de jugadores como la presenta cada documento; desde 2021 (NIIF) el estado imprime solo el neto ('Κέρδη / (Ζημία) από πωλήσεις ποδοσφαιριστών'), así que los costos de la nota van como player_sales negativo (2016-2020 el estado imprime bruto y queda bruto)
tools/cargar.mjs (2026-10-14). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee.
```

### Liga

```text
tools/cargar.mjs (2026-10-14): gr-superleague, verificado contra roster cacheado de "2023–24 Super League Greece" (tools/club-league-reference/gr.json), coincidencia exacta "Olympiacos".
```

## 2022

### Ingresos

```text
2022: cargado por tools/cargar.mjs (2026-10-14) desde Clubes/Grecia/Olympiacos/PAE_Olympiacos_FS_2022-06-30.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Grecia/Olympiacos/PAE_Olympiacos_FS_2022-06-30.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Έσοδα από εισιτήρια | pág. 9, Jev 0.99 |
| 2 | Χορηγίες και διαφημίσεις | pág. 9, Jev 1 |
| 3 | Δικαιώματα αναμετάδοσης | pág. 9, Jev 1 |
| 4 | Εμπορικά | pág. 9, Jev 1 |
| 5 | Έσοδα από UEFA | pág. 9, precedente |
| 6 | Λοιπά λειτουργικά έσοδα | pág. 9, Jev 0.99 |
| 7 | Αξία πώλησης ποδοσφαιριστών | pág. 42, Jev 1 |
| 8 | Λοιπά έσοδα κατά την πώληση | pág. 42, ? 0.6 |
| 9 | Αναπόσβεστο κόστος ποδοσφαιριστών | pág. 42, precedente |
| 10 | Λοιπά άμεσα κόστη μετεγγραφής ποδοσφαιριστών | pág. 42, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Μισθοί και δόσεις συμβολαίων | pág. 40, Jev 1 |
| 2 | Εισφορές κοινωνικής ασφάλισης | pág. 40, Claude 0.85 |
| 3 | Λοιπές παροχές | pág. 40, Claude 0.8 |
| 4 | Ημερομίσθια και μισθοί | pág. 40, precedente |
| 5 | Εισφορές κοινωνικής ασφάλισης | pág. 40, Claude 0.85 |
| 6 | Πρόβλεψη αποζημίωσης προσωπικού | pág. 40, precedente |
| 7 | Απόσβεση και απομείωση ενσώματων & ασώματων ακινητοποιήσεων & δικαιωμάτων χρήσης περιουσιακών στοιχείων | pág. 9, ? 0.75 |
| 8 | Απόσβεση δικαιωμάτων ποδοσφαιριστών και απομείωση | pág. 9, Claude 0.8 |
| 9 | Πρόβλεψη επισφαλών πελατών | pág. 9, Jev 1 |
| 10 | Έξοδα αγώνων | pág. 42, Jev 0.96 |
| 11 | Έξοδα χορηγιών και διαφημίσεων | pág. 42, precedente |
| 12 | Έξοδα ακινήτων & εγκαταστάσεων | pág. 42, Jev 0.93 |
| 13 | Λοιπά μη λειτουργικά έξοδα | pág. 42, Jev 0.96 |
| 14 | Έξοδα ποδοσφαιρικού τμήματος | pág. 42, Jev 0.94 |
| 15 | Λοιπά λειτουργικά έξοδα | pág. 42, Claude 0.85 |

### Meta

```text
2022: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-14): categoria = player_sales. Decisión de Guido 2026-10-14: venta de jugadores como la presenta cada documento; desde 2021 (NIIF) el estado imprime solo el neto ('Κέρδη / (Ζημία) από πωλήσεις ποδοσφαιριστών'), así que los costos de la nota van como player_sales negativo (2016-2020 el estado imprime bruto y queda bruto)
2022: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-14): categoria = player_sales. Decisión de Guido 2026-10-14: venta de jugadores como la presenta cada documento; desde 2021 (NIIF) el estado imprime solo el neto ('Κέρδη / (Ζημία) από πωλήσεις ποδοσφαιριστών'), así que los costos de la nota van como player_sales negativo (2016-2020 el estado imprime bruto y queda bruto)
tools/cargar.mjs (2026-10-14). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee.
```

### Liga

```text
tools/cargar.mjs (2026-10-14): gr-superleague, verificado contra roster cacheado de "2021–22 Super League Greece" (tools/club-league-reference/gr.json), coincidencia exacta "Olympiacos".
```

## 2020

### Ingresos

```text
2020: cargado por tools/cargar.mjs (2026-10-14) desde Clubes/Grecia/Olympiacos/PAE_Olympiacos_FS_2020-06-30.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Grecia/Olympiacos/PAE_Olympiacos_FS_2020-06-30.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Έσοδα από εισιτήρια | pág. 9, Jev 0.99 |
| 2 | Χορηγίες και διαφημίσεις | pág. 9, Jev 1 |
| 3 | Δικαιώματα αναμετάδοσης | pág. 9, Jev 1 |
| 4 | Εμπορικά | pág. 9, Jev 1 |
| 5 | Έσοδα από UEFA | pág. 9, precedente |
| 6 | Λοιπά λειτουργικά έσοδα | pág. 9, Jev 0.99 |
| 7 | Αξία πώλησης ποδοσφαιριστών | pág. 42, Jev 1 |
| 8 | Λοιπά έσοδα κατά την πώληση | pág. 42, ? 0.6 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Μισθοί και δόσεις συμβολαίων | pág. 40, Jev 1 |
| 2 | Εισφορεκκοινωνικής ασφάλισης | pág. 40, Claude 0.93 |
| 3 | Λοιπές παροχές | pág. 40, Claude 0.8 |
| 4 | Ημερομίσθια και μισθοί | pág. 40, precedente |
| 5 | Εισφορεκκοινωνικής ασφάλισης | pág. 40, Claude 0.93 |
| 6 | Πρόβλεψη αποζημίωσης προσωπικού | pág. 40, precedente |
| 7 | Απόσβεση ενσώματων περιουσιακών στοιχείων | pág. 40, Jev 1 |
| 8 | Απόσβεση δικαιωμάτων χρήσης περιουσιακών στοιχείων | pág. 40, precedente |
| 9 | Απόσβεση λοιπών ασώματων περιουσιακών στοιχείων (εκτός ποδοσφαιριστών) | pág. 40, precedente |
| 10 | Απόσβεση δικαιωμάτων ποδοσφαιριστών και απομείωση | pág. 9, Claude 0.8 |
| 11 | Έξοδα αγώνων | pág. 41, Jev 0.96 |
| 12 | Έξοδα χορηγιών και διαφημίσεων | pág. 41, precedente |
| 13 | Έξοδα ακινήτων & εγκαταστάσεων | pág. 41, Jev 0.93 |
| 14 | Έκτακτα έξοδα | pág. 41, Jev 0.94 |
| 15 | Έξοδα ποδοσφαιρικού τμήματος | pág. 41, Jev 0.94 |
| 16 | Λοιπά λειτουργικά έξοδα | pág. 41, Claude 0.85 |
| 17 | Αναπόσβεστο κόστος ποδοσφαιριστών | pág. 42, Jev 0.92 |
| 18 | Λοιπά άμεσα κόστη μετεγγραφής ποδοσφαιριστών | pág. 42, Claude 0.8 |

### Meta

```text
tools/cargar.mjs (2026-10-14). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee.
```

### Liga

```text
tools/cargar.mjs (2026-10-14): gr-superleague, verificado contra roster cacheado de "2019–20 Super League Greece" (tools/club-league-reference/gr.json), coincidencia exacta "Olympiacos".
```

## 2019

### Ingresos

```text
2019: cargado por tools/cargar.mjs (2026-10-14) desde Clubes/Grecia/Olympiacos/PAE_Olympiacos_FS_2019-06-30.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Grecia/Olympiacos/PAE_Olympiacos_FS_2019-06-30.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Έσοδα από εισιτήρια | pág. 10, Jev 0.99 |
| 2 | Χορηγίες και διαφημίσεις | pág. 10, Jev 1 |
| 3 | Δικαιώματα αναμετάδοσης | pág. 10, Jev 1 |
| 4 | Εμπορικά | pág. 10, Jev 1 |
| 5 | Έσοδα από UEFA | pág. 10, precedente |
| 6 | Λοιπά λειτουργικά έσοδα | pág. 10, Jev 0.99 |
| 7 | Αξία πώλησης ποδοσφαιριστών | pág. 43, Jev 1 |
| 8 | Λοιπά έσοδα κατά την πώληση | pág. 43, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Μισθοί και δόσεις συμβολαίων | pág. 41, Jev 1 |
| 2 | Εισφορές κοινωνικής ασφάλισης | pág. 41, Claude 0.85 |
| 3 | Λοιπές παροχές | pág. 41, Claude 0.8 |
| 4 | Ημερομίσθια και μισθοί | pág. 41, precedente |
| 5 | Εισφορές κοινωνικής ασφάλισης | pág. 41, Claude 0.85 |
| 6 | Πρόβλεψη αποζημίωσης προσωπικού | pág. 41, precedente |
| 7 | Απόσβεση ενσώματων περιουσιακών στοιχείων | pág. 41, Jev 1 |
| 8 | Απόσβεση λοιπών ασώματων περιουσιακών στοιχείων (εκτός ποδοσφαιριστών) | pág. 41, precedente |
| 9 | Απόσβεση δικαιωμάτων ποδοσφαιριστών και απομείωση | pág. 10, Claude 0.8 |
| 10 | Έξοδα αγώνων | pág. 42, Jev 0.96 |
| 11 | Έξοδα χορηγιών και διαφημίσεων | pág. 42, precedente |
| 12 | Έξοδα ακινήτων & εγκαταστάσεων | pág. 42, Jev 0.93 |
| 13 | Έκτακτα έξοδα | pág. 42, Jev 0.94 |
| 14 | Έξοδα ποδοσφαιρικού τμήματος | pág. 42, Jev 0.94 |
| 15 | Λοιπά λειτουργικά έξοδα | pág. 42, Claude 0.85 |
| 16 | Αναπόσβεστο κόστος ποδοσφαιριστών | pág. 43, Jev 0.92 |
| 17 | Λοιπά άμεσα κόστη μετεγγραφής ποδοσφαιριστών | pág. 43, Claude 0.8 |

### Meta

```text
tools/cargar.mjs (2026-10-14). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee.
```

### Liga

```text
tools/cargar.mjs (2026-10-14): gr-superleague, verificado contra roster cacheado de "2018–19 Super League Greece" (tools/club-league-reference/gr.json), coincidencia exacta "Olympiacos".
```

## 2018

### Ingresos

```text
2018: cargado por tools/cargar.mjs (2026-10-14) desde Clubes/Grecia/Olympiacos/PAE_Olympiacos_FS_2018-06-30.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Grecia/Olympiacos/PAE_Olympiacos_FS_2018-06-30.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Έσοδα από εισιτήρια | pág. 9, Jev 0.99 |
| 2 | Χορηγίες και διαφημίσεις | pág. 9, Jev 1 |
| 3 | Δικαιώματα αναμετάδοσης | pág. 9, Jev 1 |
| 4 | Εμπορικά | pág. 9, Jev 1 |
| 5 | Έσοδα από UEFA | pág. 9, precedente |
| 6 | Λοιπά λειτουργικά έσοδα | pág. 9, Jev 0.99 |
| 7 | Έσοδα από πωλήσεις ποδοσφαιριστών / λύσεις συμβολαίων | pág. 9, Jev 1 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Μισθοί και δόσεις συμβολαίων | pág. 37, Jev 1 |
| 2 | Εισφορές κοινωνικής ασφάλισης | pág. 37, Claude 0.85 |
| 3 | Λοιπές παροχές | pág. 37, Claude 0.8 |
| 4 | Ημερομίσθια και μισθοί | pág. 37, precedente |
| 5 | Εισφορές κοινωνικής ασφάλισης | pág. 37, Claude 0.85 |
| 6 | Πρόβλεψη αποζημίωσης προσωπικού | pág. 37, precedente |
| 7 | Απόσβεση ενσώματων περιουσιακών στοιχείων | pág. 37, Jev 1 |
| 8 | Απόσβεση λοιπών ασώματων περιουσιακών στοιχείων (εκτός ποδοσφαιριστών) | pág. 37, precedente |
| 9 | Απόσβεση δικαιωμάτων ποδοσφαιριστών | pág. 38, Jev 1 |
| 10 | Απόομειωση δικαιωμάτων ποδοσφαιριστών | pág. 38, precedente |
| 11 | Έξοδα αγώνων | pág. 38, Jev 0.96 |
| 12 | Έξοδα χορηγιών και διαφημίσεων | pág. 38, precedente |
| 13 | Έξοδα ακινήτων & εγκαταστάσεων | pág. 38, Jev 0.93 |
| 14 | Έκτακτα έξοδα | pág. 38, Jev 0.94 |
| 15 | Έξοδα ποδοσφαιρικού τμήματος | pág. 38, Jev 0.94 |
| 16 | Λοιπά λειτουργικά έξοδα | pág. 38, Claude 0.85 |
| 17 | Αναπόσβεστο κόστος ποδοσφαιριστών | pág. 39, Jev 0.92 |
| 18 | Λοιπά άμεσα κόστη μετεγγραφής ποδοσφαιριστών | pág. 39, Claude 0.8 |

### Meta

```text
tools/cargar.mjs (2026-10-14). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee.
```

### Liga

```text
tools/cargar.mjs (2026-10-14): gr-superleague, verificado contra roster cacheado de "2017–18 Super League Greece" (tools/club-league-reference/gr.json), coincidencia exacta "Olympiacos".
```

## 2017

### Ingresos

```text
2017: cargado por tools/cargar.mjs (2026-10-14) desde Clubes/Grecia/Olympiacos/PAE_Olympiacos_FS_2017-06-30.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Grecia/Olympiacos/PAE_Olympiacos_FS_2017-06-30.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Έσοδα από εισιτήρια | pág. 9, Jev 0.99 |
| 2 | Χορηγίες και διαφημίσεις | pág. 9, Jev 1 |
| 3 | Δικαιώματα αναμετάδοσης | pág. 9, Jev 1 |
| 4 | Εμπορικά | pág. 9, Jev 1 |
| 5 | Έσοδα από UEFA | pág. 9, precedente |
| 6 | Λοιπά λειτουργικά έσοδα | pág. 9, Jev 0.99 |
| 7 | Έσοδα από πωλήσεις ποδοσφαιριστών / λύσεις συμβολαίων | pág. 9, Jev 1 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Μισθοί και δόσεις συμβολαίων | pág. 37, Jev 1 |
| 2 | Εισφορές κοινωνικής ασφάλισης | pág. 37, Claude 0.85 |
| 3 | Λοιπές παροχές | pág. 37, Claude 0.8 |
| 4 | Ημερομίσθια και μισθοί | pág. 37, precedente |
| 5 | Εισφορές κοινωνικής ασφάλισης | pág. 37, Claude 0.85 |
| 6 | Πρόβλεψη αποζημίωσης προσωπικού | pág. 37, precedente |
| 7 | Απόσβεση ενσώματων περιουσιακών στοιχείων | pág. 37, Jev 1 |
| 8 | Απόσβεση λοιπών ασώματων περιουσιακών στοιχείων (εκτός ποδοσφαιριστών) | pág. 37, precedente |
| 9 | Απόσβεση δικαιωμάτων ποδοσφαιριστών και απομείωση | pág. 9, Claude 0.8 |
| 10 | Έξοδα αγώνων | pág. 38, Jev 0.96 |
| 11 | Έξοδα χορηγιών και διαφημίσεων | pág. 38, precedente |
| 12 | Έξοδα ακινήτων & εγκαταστάσεων | pág. 38, Jev 0.93 |
| 13 | Έκτακτα έξοδα | pág. 38, Jev 0.94 |
| 14 | Έξοδα ποδοσφαιρικού τμήματος | pág. 38, Jev 0.94 |
| 15 | Λοιπά λειτουργικά έξοδα | pág. 38, Claude 0.85 |
| 16 | Αναπόσβεστο κόστος ποδοσφαιριστών | pág. 39, Jev 0.92 |
| 17 | Λοιπά άμεσα κόστη μετεγγραφής ποδοσφαιριστών | pág. 39, Claude 0.8 |

### Meta

```text
tools/cargar.mjs (2026-10-14). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee.
```

### Liga

```text
tools/cargar.mjs (2026-10-14): gr-superleague, verificado contra roster cacheado de "2016–17 Super League Greece" (tools/club-league-reference/gr.json), coincidencia exacta "Olympiacos".
```

## 2016

### Ingresos

```text
2016: cargado por tools/cargar.mjs (2026-10-14) desde Clubes/Grecia/Olympiacos/PAE_Olympiacos_Chrimatooikonomikes_katastaseis_2016-06-30.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Grecia/Olympiacos/PAE_Olympiacos_Chrimatooikonomikes_katastaseis_2016-06-30.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Έσοδα από εισιτήρια | pág. 9, Jev 0.99 |
| 2 | Χορηγίες και διαφημίσεις | pág. 9, Jev 1 |
| 3 | Δικαιώματα αναμετάδοσης | pág. 9, Jev 1 |
| 4 | Εμπορικά | pág. 9, Jev 1 |
| 5 | Έσοδα από UEFA | pág. 9, precedente |
| 6 | Λοιπά λειτουργικά έσοδα | pág. 9, Jev 0.99 |
| 7 | Έσοδα από πωλήσεις ποδοσφαιριστών | pág. 9, Jev 1 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Μισθοί και δόσεις συμβολαίων | pág. 40, Jev 1 |
| 2 | Εισφορές κοινωνικής ασφάλισης | pág. 40, Claude 0.85 |
| 3 | Λοιπές παροχές | pág. 40, Claude 0.8 |
| 4 | Ημερομίσθια και μισθοί | pág. 40, precedente |
| 5 | Εισφορές κοινωνικής ασφάλισης | pág. 40, Claude 0.85 |
| 6 | Πρόβλεψη αποζημίωσης προσωπικού | pág. 40, precedente |
| 7 | Απόσβεση ενσώματων περιουσιακών στοιχείων | pág. 40, Jev 1 |
| 8 | Απόσβεση λοιπών ασώματων περιουσιακών στοιχείων (εξαιρούνται οι εγγραφές ποδοσφαιριστών) | pág. 40, Jev 1 |
| 9 | Απόσβεση δικαιωμάτων ποδοσφαιριστών | pág. 40, Jev 1 |
| 10 | Απομείωση δικαιωμάτων ποδοσφαιριστών | pág. 40, Claude 0.95 |
| 11 | Έξοδα αγώνων | pág. 41, Jev 0.96 |
| 12 | Έξοδα χορηγιών και διαφημίσεων | pág. 41, precedente |
| 13 | Έξοδα ακινήτων & εγκαταστάσεων | pág. 41, Jev 0.93 |
| 14 | Έκτακτα Έξοδα | pág. 41, Jev 0.94 |
| 15 | Έξοδα ποδοσφαιρικού τμήματος | pág. 41, Jev 0.94 |
| 16 | Λοιπά λειτουργικά έξοδα | pág. 41, Claude 0.85 |
| 17 | Αναπόσβεστο κόστος ποδοσφαιριστών | pág. 42, Jev 0.92 |
| 18 | Λοιπά άμεσα κόστη μετεγγραφής ποδοσφαιριστών | pág. 42, Claude 0.8 |

### Meta

```text
tools/cargar.mjs (2026-10-14). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee.
```

### Liga

```text
alta-club.mjs (2026-10-14): gr-superleague, verificado contra roster cacheado de "2015–16 Super League Greece" (tools/club-league-reference/gr.json), coincidencia exacta "Olympiacos".
```

## Fuentes

### olympiacos-gr-pae-olympiacos-chrimatooikonomikes-katastaseis-2016-06-30

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-14) desde la transcripción Clubes/Grecia/Olympiacos/PAE_Olympiacos_Chrimatooikonomikes_katastaseis_2016-06-30.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### olympiacos-gr-pae-olympiacos-fs-2017-06-30

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-14) desde la transcripción Clubes/Grecia/Olympiacos/PAE_Olympiacos_FS_2017-06-30.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### olympiacos-gr-pae-olympiacos-fs-2018-06-30

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-14) desde la transcripción Clubes/Grecia/Olympiacos/PAE_Olympiacos_FS_2018-06-30.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### olympiacos-gr-pae-olympiacos-fs-2020-06-30

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-14) desde la transcripción Clubes/Grecia/Olympiacos/PAE_Olympiacos_FS_2020-06-30.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### olympiacos-gr-pae-olympiacos-fs-2022-06-30

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-14) desde la transcripción Clubes/Grecia/Olympiacos/PAE_Olympiacos_FS_2022-06-30.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### olympiacos-gr-pae-olympiacos-consolidated-ifrs-fs-2024-06-30

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-14) desde la transcripción Clubes/Grecia/Olympiacos/PAE_Olympiacos_Consolidated_IFRS_FS_2024-06-30.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### olympiacos-gr-pae-olympiacos-ifrs-fs-2025-06-30

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-14) desde la transcripción Clubes/Grecia/Olympiacos/PAE_Olympiacos_IFRS_FS_2025-06-30.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### olympiacos-gr-pae-olympiacos-fs-2019-06-30

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-14) desde la transcripción Clubes/Grecia/Olympiacos/PAE_Olympiacos_FS_2019-06-30.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```
