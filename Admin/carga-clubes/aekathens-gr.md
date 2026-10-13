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
