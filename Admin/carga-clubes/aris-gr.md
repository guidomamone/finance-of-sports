# aris-gr — evidencia de carga

Lo que antes iba como comentario en el data file del club, `data/<país>/aris-gr-data.js` (la regla: `Admin/CONVENCIONES-DATOS.md`, "data/<país>/<club>-data.js NO LLEVA
COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y meta. Las notas de cada fila van en una tabla con su número de
fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
Aris: alta por tools/alta-club.mjs (2026-10-14) desde Clubes/Grecia/Aris/Aris_FS_notes_ELP_2019-06-30.pdf. brandColor #FCD011
(procedencia en Admin/sourcing/Grecia/Aris.md; tools/cargar-lote.mjs).
```

```text
data/gr/aris-gr-data.js — Athlitikos Syllogos Thessalonikis O Aris P.A.E. (Grecia).
ALTA POR SCRIPT (tools/alta-club.mjs, 2026-10-14), SIN EJERCICIOS CARGADOS TODAVÍA: las estructuras del data file
nacen vacías a propósito. Los rubros, los totales oficiales y el resto del fiscalYearMeta los agrega la etapa de carga.

Documento que originó el alta: Clubes/Grecia/Aris/Aris_FS_notes_ELP_2019-06-30.pdf

De dónde salió cada campo (estado según alta-club.mjs: ok / pendiente):
  id                 ok        "aris-gr" — slug de "Aris" + '-gr' (convención de clubId, Admin/CONVENCIONES.md Versión 129)
  name               ok        "Athlitikos Syllogos Thessalonikis O Aris P.A.E." — ajuste manual (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-14): Revisión del alta (Claude, 2026-10-14, subagente Sonnet revisado): razón so
  displayName        ok        "Aris" — nombre de la carpeta del club en Clubes/
  country            ok        "GR" — carpeta de país "Grecia" (tabla PAISES)
  reportingCurrency  ok        "EUR" — moneda de curso legal de Grecia
  fiscalYearStart    ok        "07-01" — cierre del ejercicio: nombre del archivo (2019-06-30) y contenido del .md (83 de 85 fechas de fin de mes)
  sport              ok        "futbol" — el .md nombra el fútbol 23 veces y ningún otro deporte más que eso
  brandColor         pendiente (ausente) — la liga del club no está en tools/brand-color-reference/ (o el club no está en footylogos)
  anio               ok        2019 — nombre del archivo (misma regla que onboard.mjs --quien), confirmado por las fechas de cierre del .md
  cierre             ok        "2019-06-30" — año del ejercicio + mes de cierre (nombre del archivo (2019-06-30) y contenido del .md (83 de 85 fechas de fin de mes))
  reportType         ok        "official_balance_sheet" — el .md tiene un estado contable (resultados / balance) y el nombre del archivo no sugiere otro tipo
  perimetro          ok        "individual" — ajuste manual (Admin/registros/ajustes-manuales.jsonl, perimetro-senales 2026-10-14): perimetro-senales.mjs: el ejercicio 2019-06-30 se publicó solo i
  currency           ok        "EUR" — moneda de curso legal de Grecia (tabla PAISES de alta-club.mjs)
  fxRef              ok        "EUR@2019-06-30" — el documento no declara tipo de cambio; FX_CLOSE ya tiene EUR@2019-06-30 = 0.878735 (Tipo de referencia del Banco Central Europeo, última rueda hábil 
  sourceId           ok        "aris-gr-fs-notes-elp-2019-06-30" — clubId + nombre del archivo en slug
  liga               ok        "gr-superleague" — roster cacheado de "2018–19 Super League Greece" (tools/club-league-reference/gr.json), coincidencia exacta "Aris"

FISCAL YEAR META PROPUESTO para 2019 (NO registrado: un ejercicio con meta y
sin rubros se vería en el sitio como un año en cero, y "sin dato no es cero"):
  2019: {"reportType":"official_balance_sheet","currency":"EUR","fxRef":"EUR@2019-06-30","sourceId":"aris-gr-fs-notes-elp-2019-06-30"}
```

## Gestiones

_investigado por un subagente (Sonnet) con fuente por gestión, 2026-10-14; to-do 231:_

```text
Theodoros Karipidis, del Anestis (2018-11-28 a 2022-02-11): Primo del dueño de hecho (Theodoros Karipidis del Lazaros). News247 (7/2/2019) cita el acta del directorio del 28/11/2018, registrada en el GEMI el 7/12/2018, que ya lo nombra Presidente y CEO; es la primera fecha documentada, así que asumió ese día o antes (desde = 2018-11-28 es una cota, no la fecha exacta de asunción; el club dice que está en el Aris 'desde 2018', Ethnos 12/2/2022). Murió el 12/2/2022 (Ethnos); la sucesora figura en el GEMI desde el 11/2/2022 (Voria), por eso hasta = 2022-02-11. Balances: Aris_FS_notes_ELP_2019-06-30.md:394 y Aris_FS_notes_ELP_2021-06-30.md:668 (Πρόεδρος & Διευθ. Σύμβουλος Θεόδωρος Καρυπίδης); Aris_AGM_minutes_2021-01-30.md:42 y :252 (preside la asamblea como Presidente y CEO). El balance 2019 (firmado 31/12/2019) y el 2021 no distinguen cuál de los dos Theodoros es; la identidad sale de la prensa. Hasta que lo registró el GEMI (dic 2018) la prensa (Typosthes y Voria, 23/8/2016) daba como presidente y CEO de la PAE a Karipidis del Lazaros, que no se carga: ese período queda fuera de los cierres a cubrir.
Irini Karipidou (2022-02-11 a hoy): Hermana de Karipidis del Lazaros; presidente y directora ejecutiva desde el 11/2/2022 según el GEMI (Voria, 13/2/2022; Metrosport, 13/2/2022 dice que tiene firma y representación). Firma los balances 2022 (Aris_FS_audited_art47_2022-06-30.md:313, firmado 3/10/2022), 2023 (Aris_FS_2023-06-30.md:187, 1/10/2023), 2024 (Aris_FS_2024-06-30.md:329, 13/2/2025) y 2025 (Aris_FS_2025-06-30.md:327, 10/10/2025). Sigue hoy: el sitio del club la lista como Presidente y CEO. No cambió la gestión entre cierre y firma en ningún ejercicio (la firma de 2024 es tardía, febrero 2025, pero ella ya presidía).
Decidido por Guido (2026-10-14), presidentes formales y no el dueño de hecho; era duda: el poder real lo tiene Theodoros Karipidis del Lazaros (empresario de Karipidis Pallets, 'ιδιοκτήτης-φάντασμα' según in.gr 26/5/2024; presidente y CEO de la PAE desde el 23/8/2016 según Voria y Typosthes; en la prensa aparece en 2019 votando por el club con autorización del directorio). Se cargó a los presidentes formales y no a él porque (a) desde el GEMI de dic 2018 no tiene cargo, (b) la propiedad es Amani Swiss y el balance 2025 (Aris_FS_2025-06-30.md:765 y :1369) nombra como beneficiario final a Dimitris Messinexis, 'nuevo beneficiario final desde feb 2022' (:1531), y (c) la prensa lo da sin rol formal. Si Guido prefiere el criterio del dueño (como Panathinaikos), la alternativa es una sola gestión Karipidis del Lazaros 2016-08-23 a null (Typosthes 23/8/2016, https://www.typosthes.gr/athlitika/106856_neos-proedros-tis-pae-aris-o-thodoros-karypidis), con los dos presidentes formales en notas.
Duda: Fecha exacta en que Karipidis del Anestis asumió la presidencia: no se encontró; entre 23/8/2016 (era miembro del directorio) y 28/11/2018 (acta ya lo nombra presidente). Se usó la fecha del acta como cota.
Duda: Ejercicio 2022 (30/6/2022) no está en cierres de este lote, pero queda cubierto por Irini Karipidou.
```

## 2021

### Ingresos

```text
2021: cargado por tools/cargar.mjs (2026-10-14) desde Clubes/Grecia/Aris/Aris_FS_notes_ELP_2021-06-30.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Grecia/Aris/Aris_FS_notes_ELP_2021-06-30.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Κύκλος εργασιών (καθαρός) | pág. 16, Jev 1 |
| 2 | Κέρδη και ζημιές από διάθεση μη κυκλοφορούντων στοιχείων (Πωλήσεις Ποδοσφαιριστών) | pág. 16, Jev 0.98 |
| 3 | Λοιπά έσοδα και κέρδη | pág. 16, Jev 0.99 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Κόστος πωλήσεων (Έξοδα ποδοσφαιρικού τμήματος) | pág. 16, Claude 0.8 |
| 2 | Έξοδα διοίκησης | pág. 16, Jev 1 |
| 3 | Έξοδα διάθεσης | pág. 16, Jev 1 |
| 4 | Φορολογικά πρόστιμα και προσαυξήσεις | pág. 39, precedente |
| 5 | Έκτακτα και ανόργανα έξοδα | pág. 39, precedente |
| 6 | Προβλέψεις για έκτακτους κινδύνους | pág. 39, precedente |

### Meta

```text
2021: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, perimetro-senales 2026-10-14): perimetro = individual. perimetro-senales.mjs: el ejercicio 2021-06-30 se publicó solo individual (el club no tiene un perímetro único); 0 documento(s) con los dos estados votan —; 7 ejercicio(s) con un solo perímetro (individual/consolidado); 13 documento(s) mirados
tools/cargar.mjs (2026-10-14). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee.
```

### Liga

```text
tools/cargar.mjs (2026-10-14): gr-superleague, verificado contra roster cacheado de "2020–21 Super League Greece" (tools/club-league-reference/gr.json), coincidencia exacta "Aris".
```

## 2019

### Ingresos

```text
2019: cargado por tools/cargar.mjs (2026-10-14) desde Clubes/Grecia/Aris/Aris_FS_notes_ELP_2019-06-30.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Grecia/Aris/Aris_FS_notes_ELP_2019-06-30.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Κύκλος εργασιών (καθαρός) | pág. 14, Jev 1 |
| 2 | Λοιπά συνήθη έσοδα | pág. 14, Jev 1 |
| 3 | Κέρδη και ζημίες από διάθεση μη κυκλοφορούντων στοιχείων (Πωλήσεις Ποδοσφαιριστών) | pág. 14, Jev 0.98 |
| 4 | Λοιπά έσοδα και κέρδη | pág. 14, Jev 0.99 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Κόστος πωλήσεων (Έξοδα ποδοσφαιρικού τμήματος) | pág. 14, Claude 0.8 |
| 2 | Έξοδα διοίκησης | pág. 14, Jev 1 |
| 3 | Έξοδα διάθεσης | pág. 14, Jev 1 |
| 4 | Φορολογικά πρόστιμα και προσαυξήσεις | pág. 34, precedente |
| 5 | Προσαυξήσεις εισφορών ασφαλιστικών εισφορών | pág. 34, precedente |
| 6 | Φορολογικά πρόστιμα και προσαυξήσεις προηγούμενων χρήσεων | pág. 34, precedente |

### Meta

```text
2019: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, perimetro-senales 2026-10-14): perimetro = individual. perimetro-senales.mjs: el ejercicio 2019-06-30 se publicó solo individual (el club no tiene un perímetro único); 0 documento(s) con los dos estados votan —; 7 ejercicio(s) con un solo perímetro (individual/consolidado); 13 documento(s) mirados
tools/cargar.mjs (2026-10-14). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee.
```

### Liga

```text
alta-club.mjs (2026-10-14): gr-superleague, verificado contra roster cacheado de "2018–19 Super League Greece" (tools/club-league-reference/gr.json), coincidencia exacta "Aris".
```

## Fuentes

### aris-gr-fs-notes-elp-2019-06-30

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-14) desde la transcripción Clubes/Grecia/Aris/Aris_FS_notes_ELP_2019-06-30.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### aris-gr-fs-notes-elp-2021-06-30

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-14) desde la transcripción Clubes/Grecia/Aris/Aris_FS_notes_ELP_2021-06-30.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```
