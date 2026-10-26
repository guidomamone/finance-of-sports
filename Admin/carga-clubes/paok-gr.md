# paok-gr — evidencia de carga

Lo que antes iba como comentario en el data file del club, `data/<país>/paok-gr-data.js` (la regla: `Admin/CONVENCIONES-DATOS.md`, "data/<país>/<club>-data.js NO LLEVA
COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y meta. Las notas de cada fila van en una tabla con su número de
fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
PAOK: alta por tools/alta-club.mjs (2026-10-14) desde Clubes/Grecia/PAOK/PAOK_FS_2016-17.pdf. brandColor #000000
(procedencia en Admin/sourcing/Grecia/PAOK.md; tools/cargar-lote.mjs).
```

```text
data/gr/paok-gr-data.js — Panthessalonikeios Athlitikos Omilos Konstantinoupoliton P.A.E. (Grecia).
ALTA POR SCRIPT (tools/alta-club.mjs, 2026-10-14), SIN EJERCICIOS CARGADOS TODAVÍA: las estructuras del data file
nacen vacías a propósito. Los rubros, los totales oficiales y el resto del fiscalYearMeta los agrega la etapa de carga.

Documento que originó el alta: Clubes/Grecia/PAOK/PAOK_FS_2016-17.pdf

De dónde salió cada campo (estado según alta-club.mjs: ok / pendiente):
  id                 ok        "paok-gr" — slug de "PAOK" + '-gr' (convención de clubId, Admin/CONVENCIONES.md Versión 129)
  name               ok        "Panthessalonikeios Athlitikos Omilos Konstantinoupoliton P.A.E." — ajuste manual (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-14): Revisión del alta (Claude, 2026-10-14, subagente Sonnet revisado): razón so
  displayName        ok        "PAOK" — nombre de la carpeta del club en Clubes/
  country            ok        "GR" — carpeta de país "Grecia" (tabla PAISES)
  reportingCurrency  ok        "EUR" — moneda de curso legal de Grecia
  fiscalYearStart    ok        "07-01" — cierre del ejercicio: contenido del .md (75 de 76 fechas de fin de mes caen en el mes 6)
  sport              ok        "futbol" — el .md nombra el fútbol 23 veces y ningún otro deporte más que eso
  brandColor         pendiente (ausente) — la liga del club no está en tools/brand-color-reference/ (o el club no está en footylogos)
  anio               ok        2017 — nombre del archivo (misma regla que onboard.mjs --quien), confirmado por las fechas de cierre del .md
  cierre             ok        "2017-06-30" — año del ejercicio + mes de cierre (contenido del .md (75 de 76 fechas de fin de mes caen en el mes 6))
  reportType         ok        "official_balance_sheet" — el .md tiene un estado contable (resultados / balance) y el nombre del archivo no sugiere otro tipo
  perimetro          ok        "individual" — ajuste manual (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-13): Claude 2026-10-13: PAOK PAE es filial de DIMERA Ltd, que es la que consolid
  currency           ok        "EUR" — moneda de curso legal de Grecia (tabla PAISES de alta-club.mjs)
  fxRef              ok        "EUR@2017-06-30" — el documento no declara tipo de cambio; FX_CLOSE ya tiene EUR@2017-06-30 = 0.876271 (Tipo de referencia del Banco Central Europeo al 2017-06-30)
  sourceId           ok        "paok-gr-fs-2016-17" — clubId + nombre del archivo en slug
  liga               ok        "gr-superleague" — roster cacheado de "2016–17 Super League Greece" (tools/club-league-reference/gr.json), coincidencia exacta "PAOK"

FISCAL YEAR META PROPUESTO para 2017 (NO registrado: un ejercicio con meta y
sin rubros se vería en el sitio como un año en cero, y "sin dato no es cero"):
  2017: {"reportType":"official_balance_sheet","currency":"EUR","fxRef":"EUR@2017-06-30","sourceId":"paok-gr-fs-2016-17"}
```

## Gestiones

_investigado por un subagente (Sonnet) con fuente por gestión, 2026-10-14; to-do 231:_

```text
Ivan Savvidis (2012-08-10 a hoy): Dueño persona que conduce (Wikipedia: adquirió la propiedad del PAOK el 10/8/2012; sigue hoy, sin fecha de salida). La fecha es la de la toma de propiedad, no una fecha de asunción formal de la presidencia (la presidencia anterior era de Zisis Vryzas, aún presidente el 5/9/2012 según in.gr); todos los cierres son posteriores a 2017, así que no afecta la cobertura. La matriz Dimera Ltd (Nicosia) figura en PAOK_FS_2016-17.md:910 y PAOK_FS_2025-06-30.md:1234 (pertenece al grupo Belterra Holdings, :1238); los balances no nombran a Savvidis. Los balances los firma el Vicepresidente y Director Ejecutivo (Chrysostomos Gkagkatsis en 2016-17, PAOK_FS_2016-17.md:1027; la Α' Vicepresidente y Directora Ejecutiva Maria Goncharova en 2024 y 2025, PAOK_FS_2024-06-30.md:271 y PAOK_FS_2025-06-30.md:267); no son presidentes y no se cargan.
Duda: No se encontró fuente con la fecha formal en que Savvidis asumió la presidencia de la PAE (desde = fecha de adquisición del 10/8/2012). Un cambio de gestión de por medio (Wikipedia en inglés lo sigue listando como presidente) no se halló; los .md no nombran al presidente del directorio, solo a los vicepresidentes que firman.
```

## 2025

### Ingresos

```text
2025: cargado por tools/cargar.mjs (2026-10-15) desde Clubes/Grecia/PAOK/PAOK_FS_2025-06-30.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Grecia/PAOK/PAOK_FS_2025-06-30.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Έσοδα από εισιτήρια-συνδρομές | pág. 36, precedente |
| 2 | Έσοδα από τηλεοπτικά δικαιώματα | pág. 36, Jev 1 |
| 3 | Έσοδα από παραχωρήσεις ποδοσφαιριστών | pág. 36, Jev 1 |
| 4 | Έσοδα από επιχορηγήσεις | pág. 36, Jev 0.95 |
| 5 | Έσοδα από χορηγίες-διαφημίσεις | pág. 36, Jev 1 |
| 6 | Ενοίκια Έσοδα | pág. 36, Claude 0.85 |
| 7 | Λοιπά Έσοδα πάροχης Υπηρεσιών | pág. 36, Jev 0.99 |
| 8 | Κέρδη & ζημιές από διάθεση μη κυκλοφορούντων στοιχείων | pág. 18, Jev 0.99 |
| 9 | Λοιπά έσοδα και κέρδη | pág. 18, Jev 0.99 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Αμοιβές προσωπικού | pág. 36, precedente |
| 2 | Αμοιβές τρίτων | pág. 36, precedente |
| 3 | Παροχές τρίτων | pág. 36, precedente |
| 4 | Φόροι-Τέλη | pág. 36, precedente |
| 5 | Διάφορα έξοδα | pág. 36, precedente |
| 6 | Αποσβέσεις | pág. 36, precedente |
| 7 | Αγορές Αναλωσίμων | pág. 36, precedente |
| 8 | Αμοιβές προσωπικού | pág. 37, precedente |
| 9 | Αμοιβές τρίτων | pág. 37, precedente |
| 10 | Παροχές τρίτων | pág. 37, precedente |
| 11 | Φόροι-Τέλη | pág. 37, precedente |
| 12 | Διάφορα έξοδα | pág. 37, precedente |
| 13 | Αποσβέσεις | pág. 37, precedente |
| 14 | Λοιπές Προβλέψεις | pág. 37, precedente |
| 15 | Αμοιβές προσωπικού | pág. 37, precedente |
| 16 | Αμοιβές τρίτων | pág. 37, precedente |
| 17 | Παροχές τρίτων | pág. 37, precedente |
| 18 | Φόροι-Τέλη | pág. 37, precedente |
| 19 | Διάφορα έξοδα | pág. 37, precedente |
| 20 | Αποσβέσεις | pág. 37, precedente |
| 21 | Λοιπές Προβλέψεις | pág. 37, precedente |
| 22 | Πρόστιμα αθλητικών φορέων | pág. 37, precedente |
| 23 | Φορολογικά Πρόστιμα & προσαυξήσεις | pág. 37, precedente |
| 24 | Λοιπά έκτακτα έξοδα | pág. 37, precedente |
| 25 | Φόροι και προσαυξήσεις προηγ. Χρήσεων | pág. 37, precedente |
| 26 | Λοιπά έξοδα προηγ. Χρήσεων | pág. 37, precedente |

### Meta

```text
tools/caja-deuda.mjs (2026-10-14): cash escalón 2 (compuerta: documento anterior): "Ταμειακά διαθέσιμα και ισοδύναμα" pág. 16
```

```text
tools/cargar.mjs (2026-10-15). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

```text
tools/caja-deuda.mjs (2026-10-17): grossDebt escalón 0 (compuerta: ajuste manual): ajuste manual (2026-10-17): Claude 2026-10-17 (leído en el balance por subagente Sonnet, criterio de deuda financiera): [PAOK_FS_2025-06-30.md] Βραχυπρόθεσμα Δάνεια (obligaciones, nota 10.1.1) 1.200.000,00; Δάνεια LP '-'. Intereses de obligaciones 38.068,10 están dentro de Λοιποί πιστωτές (nota 10.2.2): no sumados.
```

## 2024

### Ingresos

```text
2024: cargado por tools/cargar.mjs (2026-10-15) desde Clubes/Grecia/PAOK/PAOK_FS_2024-06-30.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Grecia/PAOK/PAOK_FS_2024-06-30.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Έσοδα από εισιτήρια-συνδρομές | pág. 34, precedente |
| 2 | Έσοδα από τηλεοπτικά δικαιώματα | pág. 34, Jev 1 |
| 3 | Έσοδα από παραχωρήσεις ποδοσφαιριστών | pág. 34, Jev 1 |
| 4 | Έσοδα από επιχορηγήσεις | pág. 34, Jev 0.95 |
| 5 | Έσοδα από χορηγίες-διαφημίσεις | pág. 34, Jev 1 |
| 6 | Ενοίκια Έσοδα | pág. 34, Claude 0.85 |
| 7 | Λοιπά Έσοδα παροχής Υπηρεσιών | pág. 34, Jev 0.99 |
| 8 | Κέρδη & ζημιές από διάθεση μη κυκλοφορούντων στοιχείων | pág. 17, Jev 0.99 |
| 9 | Λοιπά έσοδα και κέρδη | pág. 17, Jev 0.99 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Αμοιβές προσωπικού | pág. 34, precedente |
| 2 | Αμοιβές τρίτων | pág. 34, precedente |
| 3 | Παροχές τρίτων | pág. 34, precedente |
| 4 | Φόροι-Τέλη | pág. 34, precedente |
| 5 | Διάφορα έξοδα | pág. 34, precedente |
| 6 | Αποσβέσεις | pág. 34, precedente |
| 7 | Αγορές Αναλωσίμων | pág. 34, precedente |
| 8 | Αμοιβές προσωπικού | pág. 35, precedente |
| 9 | Αμοιβές τρίτων | pág. 35, precedente |
| 10 | Παροχές τρίτων | pág. 35, precedente |
| 11 | Φόροι-Τέλη | pág. 35, precedente |
| 12 | Διάφορα έξοδα | pág. 35, precedente |
| 13 | Αποσβέσεις | pág. 35, precedente |
| 14 | Λοιπές Προβλέψεις | pág. 35, precedente |
| 15 | Αμοιβές προσωπικού | pág. 35, precedente |
| 16 | Αμοιβές τρίτων | pág. 35, precedente |
| 17 | Παροχές τρίτων | pág. 35, precedente |
| 18 | Φόροι-Τέλη | pág. 35, precedente |
| 19 | Διάφορα έξοδα | pág. 35, precedente |
| 20 | Αποσβέσεις | pág. 35, precedente |
| 21 | Λοιπές Προβλέψεις | pág. 35, precedente |
| 22 | Πρόστιμα αθλητικών φορέων | pág. 35, precedente |
| 23 | Φορολογικά Πρόστιμα & προσαυξήσεις | pág. 35, precedente |
| 24 | Λοιπά έκτακτα έξοδα | pág. 35, precedente |
| 25 | Φόροι και προσαυξήσεις προηγ. Χρήσεων | pág. 35, precedente |
| 26 | Λοιπά έξοδα προηγ. Χρήσεων | pág. 35, precedente |

### Meta

```text
tools/caja-deuda.mjs (2026-10-14): grossDebt escalón 2 (compuerta: documento siguiente): "Δάνεια" pág. 16; cash escalón 2 (compuerta: documento siguiente): "Ταμειακά διαθέσιμα και ισοδύναμα" pág. 15
```

```text
tools/cargar.mjs (2026-10-15). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

## 2023

### Ingresos

```text
2023: cargado por tools/cargar.mjs (2026-10-15) desde Clubes/Grecia/PAOK/PAOK_FS_2023-06-30.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Grecia/PAOK/PAOK_FS_2023-06-30.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Έσοδα από εισιτήρια-συνδρομές | pág. 32, precedente |
| 2 | Έσοδα από τηλεοπτικά δικαιώματα | pág. 32, Jev 1 |
| 3 | Έσοδα από παραχωρήσεις ποδοσφαιριστών | pág. 32, Jev 1 |
| 4 | Έσοδα από επιχορηγήσεις | pág. 32, Jev 0.95 |
| 5 | Έσοδα από χορηγίες-διαφημίσεις | pág. 32, Jev 1 |
| 6 | Ενοίκια Έσοδα | pág. 32, Claude 0.85 |
| 7 | Λοιπά Έσοδα πάροχης Υπηρεσιών | pág. 32, Jev 0.99 |
| 8 | Κέρδη & ζημιές από διάθεση μη κυκλοφορούντων στοιχείων | pág. 16, Jev 0.99 |
| 9 | Λοιπά έσοδα και κέρδη | pág. 16, Jev 0.99 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Αμοιβές προσωπικού | pág. 32, precedente |
| 2 | Αμοιβές τρίτων | pág. 32, precedente |
| 3 | Παροχές τρίτων | pág. 32, precedente |
| 4 | Φόροι-Τέλη | pág. 32, precedente |
| 5 | Διάφορα έξοδα | pág. 32, precedente |
| 6 | Αποσβέσεις | pág. 32, precedente |
| 7 | Αγορές Αναλωσίμων | pág. 32, precedente |
| 8 | Αμοιβές προσωπικού | pág. 32, precedente |
| 9 | Αμοιβές τρίτων | pág. 32, precedente |
| 10 | Παροχές τρίτων | pág. 32, precedente |
| 11 | Φόροι-Τέλη | pág. 32, precedente |
| 12 | Διάφορα έξοδα | pág. 32, precedente |
| 13 | Αποσβέσεις | pág. 32, precedente |
| 14 | Λοιπές Προβλέψεις | pág. 32, precedente |
| 15 | Αμοιβές προσωπικού | pág. 33, precedente |
| 16 | Αμοιβές τρίτων | pág. 33, precedente |
| 17 | Παροχές τρίτων | pág. 33, precedente |
| 18 | Φόροι-Τέλη | pág. 33, precedente |
| 19 | Διάφορα έξοδα | pág. 33, precedente |
| 20 | Αποσβέσεις | pág. 33, precedente |
| 21 | Πρόστιμα αθλητικών φορέων | pág. 33, precedente |
| 22 | Φορολογικά Πρόστιμα & προσαυξήσεις | pág. 33, precedente |
| 23 | Λοιπά έκτακτα έξοδα | pág. 33, precedente |
| 24 | Φόροι και προσαυξήσεις προηγ. Χρήσεων | pág. 33, precedente |
| 25 | Λοιπά έξοδα προηγ. Χρήσεων | pág. 33, precedente |

### Meta

```text
tools/caja-deuda.mjs (2026-10-14): grossDebt escalón 2 (compuerta: documento siguiente): "Δάνεια" pág. 15; cash escalón 2 (compuerta: documento siguiente): "Ταμειακά διαθέσιμα και ισοδύναμα" pág. 14
```

```text
tools/cargar.mjs (2026-10-15). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

## 2022

### Ingresos

```text
2022: cargado por tools/cargar.mjs (2026-10-15) desde Clubes/Grecia/PAOK/PAOK_FS_2022-06-30.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Grecia/PAOK/PAOK_FS_2022-06-30.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Κύκλος εργασιών | pág. 16, Jev 1 |
| 2 | Λοιπά συνήθη έσοδα | pág. 16, Jev 0.99 |
| 3 | Κέρδη & ζημιές από διάθεση μη κυκλοφορούντων στοιχείων | pág. 16, Jev 0.99 |
| 4 | Λοιπά έκτακτα έσοδα | pág. 35, Jev 1 |
| 5 | Έσοδα προηγούμενων χρήσεων | pág. 35, Jev 0.99 |
| 6 | Έσοδα από χρησιμοποίηση προβλέψεων | pág. 35, Jev 0.99 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Αμοιβές προσωπικού | pág. 34, precedente |
| 2 | Αμοιβές τρίτων | pág. 34, precedente |
| 3 | Παροχές τρίτων | pág. 34, precedente |
| 4 | Φόροι-Τέλη | pág. 34, precedente |
| 5 | Διάφορα έξοδα | pág. 34, precedente |
| 6 | Αποσβέσεις | pág. 34, precedente |
| 7 | Αγορές Αναλωσίμων | pág. 34, precedente |
| 8 | Αμοιβές προσωπικού | pág. 34, precedente |
| 9 | Αμοιβές τρίτων | pág. 34, precedente |
| 10 | Παροχές τρίτων | pág. 34, precedente |
| 11 | Φόροι-Τέλη | pág. 34, precedente |
| 12 | Διάφορα έξοδα | pág. 34, precedente |
| 13 | Αποσβέσεις | pág. 34, precedente |
| 14 | Λοιπές Προβλέψεις | pág. 34, precedente |
| 15 | Αμοιβές προσωπικού | pág. 34, precedente |
| 16 | Αμοιβές τρίτων | pág. 34, precedente |
| 17 | Παροχές τρίτων | pág. 34, precedente |
| 18 | Φόροι-Τέλη | pág. 34, precedente |
| 19 | Διάφορα έξοδα | pág. 34, precedente |
| 20 | Αποσβέσεις | pág. 35, precedente |
| 21 | Πρόστιμα αθλητικών φορέων | pág. 35, precedente |
| 22 | Φορολογικά Πρόστιμα & προσαυξήσεις | pág. 35, precedente |
| 23 | Λοιπά έκτακτα έξοδα | pág. 35, precedente |
| 24 | Φόροι και προσαυξήσεις προηγ. Χρήσεων | pág. 35, precedente |
| 25 | Λοιπά έξοδα προηγ. Χρήσεων | pág. 35, precedente |

### Meta

```text
tools/caja-deuda.mjs (2026-10-14): cash escalón 2 (compuerta: documento siguiente): "Ταμειακά διαθέσιμα και ισοδύναμα" pág. 14
```

```text
tools/caja-deuda.mjs (2026-10-14): grossDebt escalón 0 (compuerta: documento siguiente): "Δάνεια" pág. 15
```

```text
tools/cargar.mjs (2026-10-15). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee.
```

```text
tools/dentro-de-otro.mjs (2026-10-26): posiblemente dentro de otro rubro, por precedente del club (la fila tiene plata en sus balances desglosados 2017, 2023, 2024, 2025)
```

## 2021

### Ingresos

```text
2021: cargado por tools/cargar.mjs (2026-10-15) desde Clubes/Grecia/PAOK/PAOK_FS_2021-06-30.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Grecia/PAOK/PAOK_FS_2021-06-30.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Κύκλος εργασιών | pág. 17, Jev 1 |
| 2 | Λοιπά συνήθη έσοδα | pág. 17, Jev 0.99 |
| 3 | Κέρδη & ζημιές από διάθεση μη κυκλοφορούντων στοιχείων | pág. 17, Jev 0.99 |
| 4 | Λοιπά έκτακτα έσοδα | pág. 32, Jev 1 |
| 5 | Έσοδα προηγούμενων χρήσεων | pág. 32, Jev 0.99 |
| 6 | Έσοδα από αναστροφή προβλέψεων | pág. 32, Jev 0.99 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Αμοιβές προσωπικού | pág. 31, precedente |
| 2 | Αμοιβές τρίτων | pág. 31, precedente |
| 3 | Παροχές τρίτων | pág. 31, precedente |
| 4 | Φόροι-Τέλη | pág. 31, precedente |
| 5 | Διάφορα έξοδα | pág. 31, precedente |
| 6 | Αποσβέσεις | pág. 31, precedente |
| 7 | Αγορές Αναλωσίμων | pág. 31, precedente |
| 8 | Αμοιβές προσωπικού | pág. 32, precedente |
| 9 | Αμοιβές τρίτων | pág. 32, precedente |
| 10 | Παροχές τρίτων | pág. 32, precedente |
| 11 | Φόροι-Τέλη | pág. 32, precedente |
| 12 | Διάφορα έξοδα | pág. 32, precedente |
| 13 | Αποσβέσεις | pág. 32, precedente |
| 14 | Λοιπές Προβλέψεις | pág. 32, precedente |
| 15 | Αμοιβές προσωπικού | pág. 32, precedente |
| 16 | Αμοιβές τρίτων | pág. 32, precedente |
| 17 | Παροχές τρίτων | pág. 32, precedente |
| 18 | Φόροι-Τέλη | pág. 32, precedente |
| 19 | Διάφορα έξοδα | pág. 32, precedente |
| 20 | Αποσβέσεις | pág. 32, precedente |
| 21 | Λοιπές Προβλέψεις | pág. 32, precedente |
| 22 | Πρόστιμα αθλητικών φορέων | pág. 32, precedente |
| 23 | Φορολογικά Πρόστιμα & προσαυξήσεις | pág. 32, precedente |
| 24 | Λοιπά έκτακτα έξοδα | pág. 32, precedente |
| 25 | Φόροι και προσαυξήσεις προηγ. Χρήσεων | pág. 32, precedente |
| 26 | Λοιπά έξοδα προηγ. Χρήσεων | pág. 32, precedente |
| 27 | Προβλέψεις για έκτακτους κινδύνους | pág. 32, precedente |

### Meta

```text
tools/caja-deuda.mjs (2026-10-14): cash escalón 2 (compuerta: documento siguiente): "Ταμειακά διαθέσιμα και ισοδύναμα" pág. 15
```

```text
tools/caja-deuda.mjs (2026-10-14): grossDebt escalón 0 (compuerta: documento anterior): "Δάνεια" pág. 15
```

```text
tools/caja-deuda.mjs (2026-10-14): grossDebt escalón 1b (compuerta: año anterior): "Δάνεια" pág. 15 + "Βραχυπρόθεσμο μέρος μακροπροθέσμων δανείων" pág. 16
```

```text
tools/cargar.mjs (2026-10-15). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee.
```

```text
tools/dentro-de-otro.mjs (2026-10-26): posiblemente dentro de otro rubro, por precedente del club (la fila tiene plata en sus balances desglosados 2017, 2023, 2024, 2025)
```

## 2020

### Ingresos

```text
2020: cargado por tools/cargar.mjs (2026-10-15) desde Clubes/Grecia/PAOK/PAOK_FS_2020-06-30.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Grecia/PAOK/PAOK_FS_2020-06-30.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Κύκλος εργασιών | pág. 17, Jev 1 |
| 2 | Λοιπά συνήθη έσοδα | pág. 17, Jev 0.99 |
| 3 | Κέρδη & ζημιές από διάθεση μη κυκλοφορούντων στοιχείων | pág. 17, Jev 0.99 |
| 4 | Λοιπά έσοδα και κέρδη | pág. 17, Jev 0.99 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Κόστος Λειτουργίας Ποδοσφαιρικού Τμήματος | pág. 17, Claude 0.8 |
| 2 | Έξοδα διοίκησης | pág. 17, Jev 1 |
| 3 | Έξοδα διάθεσης | pág. 17, Jev 1 |
| 4 | Λοιπά έξοδα και ζημιές | pág. 17, Jev 0.95 |

### Meta

```text
tools/caja-deuda.mjs (2026-10-14): cash escalón 2 (compuerta: documento siguiente): "Ταμειακά διαθέσιμα και ισοδύναμα" pág. 15
```

```text
tools/caja-deuda.mjs (2026-10-14): grossDebt escalón 0 (compuerta: documento siguiente): "Δάνεια" pág. 16
```

```text
tools/cargar.mjs (2026-10-15). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee.
```

```text
tools/dentro-de-otro.mjs (2026-10-26): posiblemente dentro de otro rubro, por precedente del club (la fila tiene plata en sus balances desglosados 2017, 2019, 2021, 2022, 2023, 2024, 2025)
```

## 2019

### Ingresos

```text
2019: cargado por tools/cargar.mjs (2026-10-15) desde Clubes/Grecia/PAOK/PAOK_FS_2019-06-30.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Grecia/PAOK/PAOK_FS_2019-06-30.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Κύκλος εργασιών | pág. 16, Jev 1 |
| 2 | Λοιπά συνήθη έσοδα | pág. 16, Jev 0.99 |
| 3 | Κέρδη & ζημιές από διάθεση μη κυκλοφορούντων στοιχείων | pág. 16, Jev 0.99 |
| 4 | Λοιπά έσοδα και κέρδη | pág. 16, Jev 0.99 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Αμοιβές προσωπικού | pág. 30, precedente |
| 2 | Αμοιβές τρίτων | pág. 30, precedente |
| 3 | Παροχές τρίτων | pág. 30, precedente |
| 4 | Φόροι-Τέλη | pág. 30, precedente |
| 5 | Διάφορα έξοδα | pág. 30, precedente |
| 6 | Αποσβέσεις | pág. 30, precedente |
| 7 | Αγορές Αναλωσίμων | pág. 30, precedente |
| 8 | Αμοιβές προσωπικού | pág. 30, precedente |
| 9 | Αμοιβές τρίτων | pág. 30, precedente |
| 10 | Παροχές τρίτων | pág. 30, precedente |
| 11 | Φόροι-Τέλη | pág. 30, precedente |
| 12 | Διάφορα έξοδα | pág. 30, precedente |
| 13 | Αποσβέσεις | pág. 30, precedente |
| 14 | Λοιπές Προβλέψεις | pág. 30, precedente |
| 15 | Έξοδα διάθεσης | pág. 16, Jev 1 |
| 16 | Λοιπά έξοδα και ζημιές | pág. 16, Jev 0.95 |

### Meta

```text
tools/caja-deuda.mjs (2026-10-14): cash escalón 2 (compuerta: documento siguiente): "Ταμειακά διαθέσιμα και ισοδύναμα" pág. 14
```

```text
tools/caja-deuda.mjs (2026-10-14): grossDebt escalón 0 (compuerta: documento siguiente): "Δάνεια" pág. 15
```

```text
tools/cargar.mjs (2026-10-15). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee.
```

```text
tools/dentro-de-otro.mjs (2026-10-26): posiblemente dentro de otro rubro, por precedente del club (la fila tiene plata en sus balances desglosados 2017, 2023, 2024, 2025)
```

## 2017

### Ingresos

```text
2017: cargado por tools/cargar.mjs (2026-10-15) desde Clubes/Grecia/PAOK/PAOK_FS_2016-17.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Grecia/PAOK/PAOK_FS_2016-17.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Έσοδα από εισιτήρια-συνδρομές | pág. 22, precedente |
| 2 | Έσοδα από τηλεοπτικά δικαιώματα | pág. 22, Jev 1 |
| 3 | Έσοδα από παραχωρήσεις ποδοσφαιριστών | pág. 22, Jev 1 |
| 4 | Έσοδα από επιχορηγήσεις | pág. 22, Jev 0.95 |
| 5 | Έσοδα από χορηγίες-διαφημίσεις | pág. 22, Jev 1 |
| 6 | Ενοίκια Έσοδα | pág. 22, Claude 0.85 |
| 7 | Λοιπά Έσοδα πάροχης Υπηρεσιών | pág. 22, Jev 0.99 |
| 8 | Κέρδη & ζημιές από διάθεση μη κυκλοφορούντων στοιχείων | pág. 7, Jev 0.99 |
| 9 | Λοιπά έκτακτα έσοδα | pág. 23, Jev 1 |
| 10 | Έσοδα προηγούμενων χρήσεων | pág. 23, Jev 0.99 |
| 11 | Έσοδα από αναστροφή προβλέψεων | pág. 23, Jev 0.99 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Αμοιβές προσωπικού | pág. 22, precedente |
| 2 | Αμοιβές τρίτων | pág. 22, precedente |
| 3 | Παροχές τρίτων | pág. 22, precedente |
| 4 | Φόροι-Τέλη | pág. 23, precedente |
| 5 | Διάφορα έξοδα | pág. 23, precedente |
| 6 | Αποσβέσεις | pág. 23, precedente |
| 7 | Αγορές Αναλωσίμων | pág. 23, precedente |
| 8 | Αμοιβές προσωπικού | pág. 23, precedente |
| 9 | Αμοιβές τρίτων | pág. 23, precedente |
| 10 | Παροχές τρίτων | pág. 23, precedente |
| 11 | Φόροι-Τέλη | pág. 23, precedente |
| 12 | Διάφορα έξοδα | pág. 23, precedente |
| 13 | Αποσβέσεις | pág. 23, precedente |
| 14 | Λοιπές Προβλέψεις | pág. 23, precedente |
| 15 | Αμοιβές προσωπικού | pág. 23, precedente |
| 16 | Αμοιβές τρίτων | pág. 23, precedente |
| 17 | Παροχές τρίτων | pág. 23, precedente |
| 18 | Φόροι-Τέλη | pág. 23, precedente |
| 19 | Διάφορα έξοδα | pág. 23, precedente |
| 20 | Αποσβέσεις | pág. 23, precedente |
| 21 | Λοιπές Προβλέψεις | pág. 23, precedente |
| 22 | Πρόστιμα αθλητικών φορέων | pág. 24, precedente |
| 23 | Φορολογικά Πρόστιμα & προσαυξήσεις | pág. 24, precedente |
| 24 | Λοιπά έκτακτα έξοδα | pág. 24, precedente |
| 25 | Λοιπά έξοδα προηγ.Χρήσεων | pág. 24, precedente |

### Meta

```text
tools/cargar.mjs (2026-10-15). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

```text
tools/caja-deuda.mjs (2026-10-17): grossDebt escalón 0 (compuerta: ajuste manual): ajuste manual (2026-10-17): Claude 2026-10-17 (leído en el balance por subagente Sonnet, criterio de deuda financiera): [PAOK_FS_2016-17.md] Δάνεια (obligaciones convertibles, nota 10.1.1) 9.000.000,00 + préstamos de la controlante Dimera Ltd dentro de 'Βραχυπρόθεσμες Υποχρεώσεις προς συνδεδεμένα μέρη' 4.262.671,32 (4.000.000 capital + 262.671,32 intereses) = 13.262.671,32. El 4.262.671,32 incluye 262.671,32 de intereses devengados: si se prefiere solo capital, deuda = 13.000.000.; cash escalón 0 (compuerta: ajuste manual): ajuste manual (2026-10-17): Claude 2026-10-17 (leído en el balance por subagente Sonnet, criterio de deuda financiera): [PAOK_FS_2016-17.md] Ταμειακά διαθέσιμα και ισοδύναμα 1.874.677,48. Balance individual (PAE).
```

### Liga

```text
alta-club.mjs (2026-10-14): gr-superleague, verificado contra roster cacheado de "2016–17 Super League Greece" (tools/club-league-reference/gr.json), coincidencia exacta "PAOK".
```

## Fuentes

### paok-gr-fs-2016-17

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-14) desde la transcripción Clubes/Grecia/PAOK/PAOK_FS_2016-17.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### paok-gr-fs-2019-06-30

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-14) desde la transcripción Clubes/Grecia/PAOK/PAOK_FS_2019-06-30.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### paok-gr-fs-2020-06-30

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-14) desde la transcripción Clubes/Grecia/PAOK/PAOK_FS_2020-06-30.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### paok-gr-fs-2021-06-30

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-14) desde la transcripción Clubes/Grecia/PAOK/PAOK_FS_2021-06-30.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### paok-gr-fs-2022-06-30

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-14) desde la transcripción Clubes/Grecia/PAOK/PAOK_FS_2022-06-30.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### paok-gr-fs-2023-06-30

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-14) desde la transcripción Clubes/Grecia/PAOK/PAOK_FS_2023-06-30.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### paok-gr-fs-2024-06-30

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-14) desde la transcripción Clubes/Grecia/PAOK/PAOK_FS_2024-06-30.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### paok-gr-fs-2025-06-30

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-14) desde la transcripción Clubes/Grecia/PAOK/PAOK_FS_2025-06-30.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```
