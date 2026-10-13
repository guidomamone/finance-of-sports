# panserraikos-gr — evidencia de carga

Lo que antes iba como comentario en el data file del club, `data/<país>/panserraikos-gr-data.js` (la regla: `Admin/CONVENCIONES-DATOS.md`, "data/<país>/<club>-data.js NO LLEVA
COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y meta. Las notas de cada fila van en una tabla con su número de
fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
Panserraikos: alta por tools/alta-club.mjs (2026-10-13) desde Clubes/Grecia/Panserraikos/Panserraikos_income_stmt_2023-06-30.pdf. brandColor #FF0000
(procedencia en Admin/sourcing/Grecia/Panserraikos.md; tools/cargar-lote.mjs).
```

```text
data/gr/panserraikos-gr-data.js — Mousikogymnastikos Syllogos Panserraikos P.A.E. (Grecia).
ALTA POR SCRIPT (tools/alta-club.mjs, 2026-10-13), SIN EJERCICIOS CARGADOS TODAVÍA: las estructuras del data file
nacen vacías a propósito. Los rubros, los totales oficiales y el resto del fiscalYearMeta los agrega la etapa de carga.

Documento que originó el alta: Clubes/Grecia/Panserraikos/Panserraikos_income_stmt_2023-06-30.pdf

De dónde salió cada campo (estado según alta-club.mjs: ok / pendiente):
  id                 ok        "panserraikos-gr" — slug de "Panserraikos" + '-gr' (convención de clubId, Admin/CONVENCIONES.md Versión 129)
  name               ok        "Mousikogymnastikos Syllogos Panserraikos P.A.E." — ajuste manual (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-09): Revisión del alta (Claude, 2026-10-09): razón social del documento (ΜΟΥΣΙΚΟΓ
  displayName        ok        "Panserraikos" — nombre de la carpeta del club en Clubes/
  country            ok        "GR" — carpeta de país "Grecia" (tabla PAISES)
  reportingCurrency  ok        "EUR" — moneda de curso legal de Grecia
  fiscalYearStart    ok        "07-01" — cierre del ejercicio: nombre del archivo (2023-06-30) y contenido del .md (3 de 3 fechas de fin de mes)
  sport              ok        "futbol" — el .md nombra el fútbol 9 veces y ningún otro deporte más que eso
  brandColor         pendiente (ausente) — la liga del club no está en tools/brand-color-reference/ (o el club no está en footylogos)
  anio               ok        2023 — nombre del archivo (misma regla que onboard.mjs --quien), confirmado por las fechas de cierre del .md
  cierre             ok        "2023-06-30" — año del ejercicio + mes de cierre (nombre del archivo (2023-06-30) y contenido del .md (3 de 3 fechas de fin de mes))
  reportType         ok        "official_balance_sheet" — el .md tiene un estado contable (resultados / balance) y el nombre del archivo no sugiere otro tipo
  perimetro          ok        "individual" — el .md no presenta estados consolidados (0 menciones de "consolidado")
  currency           ok        "EUR" — moneda de curso legal de Grecia (tabla PAISES de alta-club.mjs)
  fxRef              ok        "EUR@2023-06-30" — el documento no declara tipo de cambio; FX_CLOSE ya tiene EUR@2023-06-30 = 0.9203 (Cierre BCE al 30/6/2023 (1 EUR = 1,0866 USD))
  sourceId           ok        "panserraikos-gr-income-stmt-2023-06-30" — clubId + nombre del archivo en slug
  liga               ok        "gr-superleague2" — roster cacheado de "2022–23 Super League Greece 2" (tools/club-league-reference/gr.json), coincidencia exacta "Panserraikos"

FISCAL YEAR META PROPUESTO para 2023 (NO registrado: un ejercicio con meta y
sin rubros se vería en el sitio como un año en cero, y "sin dato no es cero"):
  2023: {"reportType":"official_balance_sheet","currency":"EUR","fxRef":"EUR@2023-06-30","sourceId":"panserraikos-gr-income-stmt-2023-06-30"}
```

## 2023

### Ingresos

```text
2023: cargado por tools/cargar.mjs (2026-10-13) desde Clubes/Grecia/Panserraikos/Panserraikos_income_stmt_2023-06-30.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Grecia/Panserraikos/Panserraikos_income_stmt_2023-06-30.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Έσοδα από εισιτήρια | pág. 1, Jev 0.99 |
| 2 | Χορηγίες και διαφημίσεις | pág. 1, Jev 1 |
| 3 | Δικαιώματα αναμετάδοσης | pág. 1, Jev 1 |
| 4 | Άλλα λειτουργικά έσοδα | pág. 1, Jev 0.99 |
| 5 | Αποζημίωση ειδικού σκοπού COVID | pág. 1, Jev 0.99 |
| 6 | Κέρδη/ζημίες από τη διάθεση (μετεγγραφών) και αποχώρηση ποδοσφαιριστών | pág. 1, Jev 0.9 |
| 7 | Λοιπά έσοδα/έξοδα μετεγγραφών | pág. 2, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Δαπάνη παροχών προς εργαζομένους (ποδοσφαιριστών και λοιπών εργαζομένων ) | pág. 1, precedente |
| 2 | Απόσβεση και απομείωση ενσωματών παγίων στοιχείων ενεργητικού | pág. 1, Jev 1 |
| 3 | Άλλα λειτουργικά έξοδα | pág. 1, precedente |
| 4 | Απόσβεση εγγραφών ποδοσφαιριστών και απομείωση εγγραφών ποδοσφαιριστών | pág. 1, Claude 0.85 |
| 5 | Μη λειτουργικά έσοδα / έξοδα | pág. 2, precedente |

### Meta

```text
tools/cargar.mjs (2026-10-13). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
alta-club.mjs (2026-10-13): gr-superleague2, verificado contra roster cacheado de "2022–23 Super League Greece 2" (tools/club-league-reference/gr.json), coincidencia exacta "Panserraikos".
```

## Fuentes

### panserraikos-gr-income-stmt-2023-06-30

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-13) desde la transcripción Clubes/Grecia/Panserraikos/Panserraikos_income_stmt_2023-06-30.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```
