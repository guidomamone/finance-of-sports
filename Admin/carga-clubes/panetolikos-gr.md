# panetolikos-gr — evidencia de carga

Lo que antes iba como comentario en el data file del club, `data/<país>/panetolikos-gr-data.js` (la regla: `Admin/CONVENCIONES-DATOS.md`, "data/<país>/<club>-data.js NO LLEVA
COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y meta. Las notas de cada fila van en una tabla con su número de
fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
Panetolikos: alta por tools/alta-club.mjs (2026-10-14) desde Clubes/Grecia/Panetolikos/Panetolikos_FS_2016-17.pdf. brandColor #F7D417
(procedencia en Admin/sourcing/Grecia/Panetolikos.md; tools/cargar-lote.mjs).
```

```text
data/gr/panetolikos-gr-data.js — Panaitolikos G.F.S. P.A.E. (Grecia).
ALTA POR SCRIPT (tools/alta-club.mjs, 2026-10-14), SIN EJERCICIOS CARGADOS TODAVÍA: las estructuras del data file
nacen vacías a propósito. Los rubros, los totales oficiales y el resto del fiscalYearMeta los agrega la etapa de carga.

Documento que originó el alta: Clubes/Grecia/Panetolikos/Panetolikos_FS_2016-17.pdf

De dónde salió cada campo (estado según alta-club.mjs: ok / pendiente):
  id                 ok        "panetolikos-gr" — slug de "Panetolikos" + '-gr' (convención de clubId, Admin/CONVENCIONES.md Versión 129)
  name               ok        "Panaitolikos G.F.S. P.A.E." — ajuste manual (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-14): Revisión del alta (Claude, 2026-10-14, subagente Sonnet revisado): razón so
  displayName        ok        "Panetolikos" — nombre de la carpeta del club en Clubes/
  country            ok        "GR" — carpeta de país "Grecia" (tabla PAISES)
  reportingCurrency  ok        "EUR" — moneda de curso legal de Grecia
  fiscalYearStart    ok        "07-01" — cierre del ejercicio: contenido del .md (49 de 65 fechas de fin de mes caen en el mes 6)
  sport              ok        "futbol" — el .md nombra el fútbol 14 veces y ningún otro deporte más que eso
  brandColor         pendiente (ausente) — la liga del club no está en tools/brand-color-reference/ (o el club no está en footylogos)
  anio               ok        2017 — nombre del archivo (misma regla que onboard.mjs --quien), confirmado por las fechas de cierre del .md
  cierre             ok        "2017-06-30" — año del ejercicio + mes de cierre (contenido del .md (49 de 65 fechas de fin de mes caen en el mes 6))
  reportType         ok        "official_balance_sheet" — el .md tiene un estado contable (resultados / balance) y el nombre del archivo no sugiere otro tipo
  perimetro          ok        "individual" — ajuste manual (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-13): Claude 2026-10-13: PAE sin grupo: las 6-8 menciones de 'consolidado' son el
  currency           ok        "EUR" — moneda de curso legal de Grecia (tabla PAISES de alta-club.mjs)
  fxRef              ok        "EUR@2017-06-30" — el documento no declara tipo de cambio; FX_CLOSE ya tiene EUR@2017-06-30 = 0.876271 (Tipo de referencia del Banco Central Europeo al 2017-06-30)
  sourceId           ok        "panetolikos-gr-fs-2016-17" — clubId + nombre del archivo en slug
  liga               ok        "gr-superleague" — roster cacheado de "2016–17 Super League Greece" (tools/club-league-reference/gr.json), coincidencia exacta "Panetolikos"

FISCAL YEAR META PROPUESTO para 2017 (NO registrado: un ejercicio con meta y
sin rubros se vería en el sitio como un año en cero, y "sin dato no es cero"):
  2017: {"reportType":"official_balance_sheet","currency":"EUR","fxRef":"EUR@2017-06-30","sourceId":"panetolikos-gr-fs-2016-17"}
```

## Gestiones

_investigado por un subagente (Sonnet) con fuente por gestión, 2026-10-14; to-do 231:_

```text
Gerasimos Belevonis (2017-01-19 a hoy): Sport24 del 19/1/2017: el directorio se reunió ese día, Kostoulas (mayor accionista) renunció a la presidencia y asumió quien era vicepresidente y director ejecutivo, Belevonis (el cuerpo de la nota lo llama 'Makis'; el comunicado de la PAE citado dice Gerasimos). Sigue hoy: panetolikos.gr/dioikisi/ lo lista como Πρόεδρος, con Kostoulas como Μεγαλομέτοχος y Thomas Spyrou de vicepresidente; ertsports.gr (3/6/2026) lo nombra presidente. Los balances lo muestran firmando como 'Ο Πρόεδρος του Δ.Σ. & Δ/νων Σύμβουλος' en todos los ejercicios cargados: Panetolikos_FS_2016-17.md:56-63 y 712-715 (firmado Agrinio 31.12.2017), Panetolikos_FS_2017-18.md:403-406 (31.12.2018) y 761-764, Panetolikos_FS_2019-20.md:416-419, Panetolikos_FS_2021-06-30.md:527-530, Panetolikos_FS_2022-06-30.md:527-530, Panetolikos_FS_2023-06-30.md:349-351, Panetolikos_FS_2024-06-30.md:323-325, Panetolikos_FS_2025-06-30.md:327-329. Vicepresidente que cofirma: Thomas Spyrou. Fecha exacta (no convención de día 01). Kostoulas (dueño, no cargado): sigue de mayor accionista y aporta los aumentos de capital (Panetolikos_FS_2016-17.md:159, Panetolikos_FS_2017-18.md:162, Panetolikos_FS_2019-20.md:406); el balance 2015-16 (Panetolikos_FS_2015-16.md:66-70, firmado 31-10-2016) lo muestra aun de presidente. Ninguna firma cambia entre cierre y aprobación en los ejercicios de este lote (no hace falta `firmo`).
Decidido por Guido (2026-10-14), presidente que firma y no el dueño; era duda: Fotis Kostoulas sigue de mayor accionista y financia el club, y la prensa lo trata como el dueño; si Guido prefiere cargar al dueño persona como en AEK o Panathinaikos, habria que reemplazar a Belevonis por Kostoulas (que no renunció a la propiedad, solo a la presidencia). Se cargó a Belevonis porque Kostoulas dejó el cargo formalmente el 19/1/2017 y la fuente no dice que siga conduciendo.
Duda: El nombre de pila en Sport24 aparece como 'Makis' en el cuerpo y 'Gerasimos' en el comunicado del club; los balances y la web del club dicen Gerasimos Belevonis. Makis es un diminutivo; ertsports (3/6/2026) trata a un 'Makis Belevonis' (director técnico saliente) como otra persona que el presidente Gerasimos.
```

## 2025

### Ingresos

```text
2025: cargado por tools/cargar.mjs (2026-10-14) desde Clubes/Grecia/Panetolikos/Panetolikos_FS_2025-06-30.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Grecia/Panetolikos/Panetolikos_FS_2025-06-30.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Έσοδα από εισιτήρια | pág. 29, Jev 1 |
| 2 | Έσοδα από μεταγραφές | pág. 29, Jev 0.99 |
| 3 | Λοιπά συνήθη έσοδα | pág. 15, Jev 1 |
| 4 | Λοιπά έσοδα και κέρδη | pág. 15, Jev 0.99 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Κόστος πωλήσεων | pág. 15, precedente |
| 2 | Έξοδα διοίκησης | pág. 15, Jev 1 |
| 3 | Έξοδα διάθεσης | pág. 15, precedente |
| 4 | Διάφορα έξοδα | pág. 29, Jev 0.94 |
| 5 | Φορολογικά και ασφαλιστικά πρόστιμα & προσαυξήσεις | pág. 29, precedente |
| 6 | Έξοδα προηγούμενων χρήσεων | pág. 29, Claude 0.8 |

### Meta

```text
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-14): incluye = broadcasting. Claude 2026-10-14 (lote 75 resuelto sin API, pedido de Guido): el documento no abre 'Λοιπά συνήθη έσοδα' (L96 del informe de gestión solo da el total); los derechos de TV están adentro, junto con otros ingresos. Misma categoría que 2017-2022 ya cargados (other_income)
tools/cargar.mjs (2026-10-14). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
incluidoEn: ajuste manual `incluye`: el documento junta estas categorías con otra línea.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee.
```

```text
tools/caja-deuda.mjs --personal (2026-10-15): staffCost 1.959575 (compuerta: documento anterior): Jev (confianza 0.75): Panetolikos_FS_2025-06-30.md L1085 "Σύνολο"
```

### Liga

```text
tools/cargar.mjs (2026-10-14): gr-superleague, verificado contra roster cacheado de "2024–25 Super League Greece" (tools/club-league-reference/gr.json), coincidencia exacta "Panetolikos".
```

## 2024

### Ingresos

```text
2024: cargado por tools/cargar.mjs (2026-10-15) desde Clubes/Grecia/Panetolikos/Panetolikos_FS_2024-06-30.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Grecia/Panetolikos/Panetolikos_FS_2024-06-30.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Έσοδα από εισιτήρια | pág. 28, Jev 1 |
| 2 | Έσοδα από μεταγραφές | pág. 28, Jev 0.99 |
| 3 | Λοιπά συνήθη έσοδα | pág. 15, Jev 1 |
| 4 | Λοιπά έσοδα και κέρδη | pág. 15, Jev 0.99 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Έξοδα διοίκησης | pág. 15, Jev 1 |
| 2 | Έξοδα διάθεσης | pág. 15, precedente |
| 3 | Παροχές τρίτων | pág. 29, precedente |
| 4 | Φόροι και τέλη | pág. 29, Jev 0.9 |
| 5 | Διάφορα έξοδα | pág. 29, Jev 0.94 |
| 6 | Φορολογικά και ασφαλιστικά πρόστιμα & προσαυξήσεις | pág. 29, precedente |
| 7 | Κόστος πωλήσεων (sin el costo de personal) | pág. 15, precedente |
| 8 | Σύνολο — Παροχές σε εργαζόμενους | pág. 15, precedente |

### Meta

```text
tools/caja-deuda.mjs --personal (2026-10-15): staffCost 1.850317 (compuerta: documento siguiente): Jev (confianza 0.73): Panetolikos_FS_2024-06-30.md L1072 "Σύνολο"
```

```text
2024: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-14): incluye = broadcasting. Claude 2026-10-14 (lote 75 resuelto sin API, pedido de Guido): el documento no abre 'Λοιπά συνήθη έσοδα' (L96 del informe de gestión solo da el total); los derechos de TV están adentro, junto con otros ingresos. Misma categoría que 2017-2022 ya cargados (other_income)
2024: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, caja-deuda --personal 2026-10-15): fila = 4.869.716,57. caja-deuda.mjs --personal --partir (to-do 229): el año no tiene wages_squad y el costo de personal confirmado (staffCost, Panetolikos_FS_2024-06-30.md L1072) está dentro de "Κόστος πωλήσεων": queda 6.720.034,00 - 1.850.317,43
2024: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, caja-deuda --personal 2026-10-15): fila = 1.850.317,43. caja-deuda.mjs --personal --partir (to-do 229): el año no tiene wages_squad y el costo de personal confirmado (staffCost, Panetolikos_FS_2024-06-30.md L1072) está dentro de "Κόστος πωλήσεων": el costo de personal va aparte
2024: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, caja-deuda --personal 2026-10-15): categoria = wages_squad. caja-deuda.mjs --personal --partir (to-do 229): el año no tiene wages_squad y el costo de personal confirmado (staffCost, Panetolikos_FS_2024-06-30.md L1072) está dentro de "Κόστος πωλήσεων": costo de personal -> wages_squad
tools/cargar.mjs (2026-10-15). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
incluidoEn: ajuste manual `incluye`: el documento junta estas categorías con otra línea.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee.
```

## 2023

### Ingresos

```text
2023: cargado por tools/cargar.mjs (2026-10-15) desde Clubes/Grecia/Panetolikos/Panetolikos_FS_2023-06-30.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Grecia/Panetolikos/Panetolikos_FS_2023-06-30.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Έσοδα από εισιτήρια | pág. 31, Jev 1 |
| 2 | Έσοδα από μεταγραφές | pág. 31, Jev 0.99 |
| 3 | Λοιπά έσοδα | pág. 31, Jev 0.98 |
| 4 | Λοιπά συνήθη έσοδα | pág. 17, Jev 1 |
| 5 | Λοιπά έσοδα και κέρδη | pág. 17, Jev 0.99 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Έξοδα διοίκησης | pág. 17, Jev 1 |
| 2 | Έξοδα διάθεσης | pág. 17, precedente |
| 3 | Παροχές τρίτων | pág. 31, precedente |
| 4 | Φόροι και τέλη | pág. 31, Jev 0.9 |
| 5 | Διάφορα έξοδα | pág. 31, Jev 0.94 |
| 6 | Φορολογικά και ασφαλιστικά πρόστιμα & προσαυξήσεις | pág. 31, precedente |
| 7 | Κόστος πωλήσεων (sin el costo de personal) | pág. 17, precedente |
| 8 | Σύνολο — Παροχές σε εργαζόμενους | pág. 17, precedente |

### Meta

```text
tools/caja-deuda.mjs --personal (2026-10-15): staffCost 1.716652 (compuerta: documento siguiente): Jev (confianza 0.74): Panetolikos_FS_2023-06-30.md L1158 "Σύνολο"
```

```text
2023: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-14): incluye = broadcasting. Claude 2026-10-14 (lote 75 resuelto sin API, pedido de Guido): el documento no abre 'Λοιπά συνήθη έσοδα' (L96 del informe de gestión solo da el total); los derechos de TV están adentro, junto con otros ingresos. Misma categoría que 2017-2022 ya cargados (other_income)
2023: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, caja-deuda --personal 2026-10-15): fila = 5.090.619,22. caja-deuda.mjs --personal --partir (to-do 229): el año no tiene wages_squad y el costo de personal confirmado (staffCost, Panetolikos_FS_2023-06-30.md L1158) está dentro de "Κόστος πωλήσεων": queda 6.807.271,00 - 1.716.651,78
2023: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, caja-deuda --personal 2026-10-15): fila = 1.716.651,78. caja-deuda.mjs --personal --partir (to-do 229): el año no tiene wages_squad y el costo de personal confirmado (staffCost, Panetolikos_FS_2023-06-30.md L1158) está dentro de "Κόστος πωλήσεων": el costo de personal va aparte
2023: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, caja-deuda --personal 2026-10-15): categoria = wages_squad. caja-deuda.mjs --personal --partir (to-do 229): el año no tiene wages_squad y el costo de personal confirmado (staffCost, Panetolikos_FS_2023-06-30.md L1158) está dentro de "Κόστος πωλήσεων": costo de personal -> wages_squad
tools/cargar.mjs (2026-10-15). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
incluidoEn: ajuste manual `incluye`: el documento junta estas categorías con otra línea.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee.
```

## 2022

### Ingresos

```text
2022: cargado por tools/cargar.mjs (2026-10-15) desde Clubes/Grecia/Panetolikos/Panetolikos_FS_2022-06-30.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Grecia/Panetolikos/Panetolikos_FS_2022-06-30.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Κύκλος εργασιών (καθαρός) | pág. 17, Jev 1 |
| 2 | Λοιπά συνήθη έσοδα | pág. 17, Jev 1 |
| 3 | Λοιπά έσοδα και κέρδη | pág. 17, Jev 0.99 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Έξοδα διοίκησης | pág. 17, Jev 1 |
| 2 | Έξοδα διάθεσης | pág. 17, precedente |
| 3 | Λοιπά έξοδα και ζημιές | pág. 17, Jev 0.95 |
| 4 | Κόστος πωλήσεων (sin el costo de personal) | pág. 17, precedente |
| 5 | Σύνολο — Παροχές σε εργαζόμενους | pág. 17, precedente |

### Meta

```text
tools/caja-deuda.mjs (2026-10-14): grossDebt escalón 2 (compuerta: año anterior): "Δάνεια" pág. 19 + "Τραπεζικά δάνεια" pág. 19
```

```text
tools/caja-deuda.mjs (2026-10-14): grossDebt escalón 1b (compuerta: año anterior): "Δανεισμός" pág. 5 + "Δάνεια" pág. 19 + "Τραπεζικά δάνεια" pág. 19
```

```text
tools/caja-deuda.mjs --personal (2026-10-15): staffCost 1.566222 (compuerta: documento siguiente): Jev (confianza 0.9): Panetolikos_FS_2022-06-30.md L1471 "Σύνολο"
```

```text
2022: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, caja-deuda --personal 2026-10-15): fila = 3.614.795,00. caja-deuda.mjs --personal --partir (to-do 229): el año no tiene wages_squad y el costo de personal confirmado (staffCost, Panetolikos_FS_2022-06-30.md L1471) está dentro de "Κόστος πωλήσεων": queda 5.181.017,00 - 1.566.222,00
2022: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, caja-deuda --personal 2026-10-15): fila = 1.566.222,00. caja-deuda.mjs --personal --partir (to-do 229): el año no tiene wages_squad y el costo de personal confirmado (staffCost, Panetolikos_FS_2022-06-30.md L1471) está dentro de "Κόστος πωλήσεων": el costo de personal va aparte
2022: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, caja-deuda --personal 2026-10-15): categoria = wages_squad. caja-deuda.mjs --personal --partir (to-do 229): el año no tiene wages_squad y el costo de personal confirmado (staffCost, Panetolikos_FS_2022-06-30.md L1471) está dentro de "Κόστος πωλήσεων": costo de personal -> wages_squad
tools/cargar.mjs (2026-10-15). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee.
```

```text
tools/dentro-de-otro.mjs (2026-10-15): posiblemente dentro de otro rubro, por precedente del club (la fila tiene plata en sus balances desglosados 2023, 2024, 2025): Estadio, Venta de Jugadores
```

## 2021

### Ingresos

```text
2021: cargado por tools/cargar.mjs (2026-10-15) desde Clubes/Grecia/Panetolikos/Panetolikos_FS_2021-06-30.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Grecia/Panetolikos/Panetolikos_FS_2021-06-30.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Ευρωπαϊκή αγορά | pág. 35, precedente |
| 2 | Αγορές τρίτων χωρών | pág. 35, precedente |
| 3 | Λοιπά συνήθη έσοδα | pág. 17, Jev 1 |
| 4 | Λοιπά έσοδα και κέρδη | pág. 17, Jev 0.99 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Έξοδα διοίκησης | pág. 17, Jev 1 |
| 2 | Έξοδα διάθεσης | pág. 17, precedente |
| 3 | Λοιπά έξοδα και ζημιές | pág. 17, Jev 0.95 |
| 4 | Κόστος πωλήσεων (sin el costo de personal) | pág. 17, precedente |
| 5 | Σύνολο — Παροχές σε εργαζόμενους | pág. 17, precedente |

### Meta

```text
tools/caja-deuda.mjs (2026-10-14): grossDebt escalón 2 (compuerta: documento siguiente): "Δάνεια" pág. 19; cash escalón 2 (compuerta: documento siguiente): "Ταμειακά διαθέσιμα και ισοδύναμα" pág. 18
```

```text
tools/caja-deuda.mjs --personal (2026-10-15): staffCost 1.288535 (compuerta: documento siguiente): Jev (confianza 0.92): Panetolikos_FS_2021-06-30.md L1437 "Σύνολο"
```

```text
2021: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, caja-deuda --personal 2026-10-15): fila = 3.210.043,03. caja-deuda.mjs --personal --partir (to-do 229): el año no tiene wages_squad y el costo de personal confirmado (staffCost, Panetolikos_FS_2021-06-30.md L1437) está dentro de "Κόστος πωλήσεων": queda 4.498.578,00 - 1.288.534,97
2021: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, caja-deuda --personal 2026-10-15): fila = 1.288.534,97. caja-deuda.mjs --personal --partir (to-do 229): el año no tiene wages_squad y el costo de personal confirmado (staffCost, Panetolikos_FS_2021-06-30.md L1437) está dentro de "Κόστος πωλήσεων": el costo de personal va aparte
2021: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, caja-deuda --personal 2026-10-15): categoria = wages_squad. caja-deuda.mjs --personal --partir (to-do 229): el año no tiene wages_squad y el costo de personal confirmado (staffCost, Panetolikos_FS_2021-06-30.md L1437) está dentro de "Κόστος πωλήσεων": costo de personal -> wages_squad
tools/cargar.mjs (2026-10-15). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee.
```

```text
tools/dentro-de-otro.mjs (2026-10-15): posiblemente dentro de otro rubro, por precedente del club (la fila tiene plata en sus balances desglosados 2023, 2024, 2025): Estadio
```

## 2020

### Ingresos

```text
2020: cargado por tools/cargar.mjs (2026-10-14) desde Clubes/Grecia/Panetolikos/Panetolikos_FS_2019-20.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Grecia/Panetolikos/Panetolikos_FS_2019-20.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Κύκλος εργασιών (καθαρός) | pág. 15, Jev 1 |
| 2 | Λοιπά συνήθη έσοδα | pág. 15, Jev 1 |
| 3 | Λοιπά έσοδα και κέρδη | pág. 15, Jev 0.99 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Κόστος πωλήσεων | pág. 15, precedente |
| 2 | Έξοδα διοίκησης | pág. 15, Jev 1 |
| 3 | Έξοδα διάθεσης | pág. 15, precedente |
| 4 | Λοιπά έξοδα και ζημιές | pág. 15, Jev 0.95 |

### Meta

```text
tools/cargar.mjs (2026-10-14). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee.
```

```text
tools/caja-deuda.mjs (2026-10-14): cash escalón 2 (compuerta: documento siguiente): "Ταμειακά διαθέσιμα και ισοδύναμα" pág. 16
```

```text
tools/dentro-de-otro.mjs (2026-10-15): posiblemente dentro de otro rubro, por precedente del club (la fila tiene plata en sus balances desglosados 2023, 2024, 2025): Estadio, Venta de Jugadores
```

### Liga

```text
tools/cargar.mjs (2026-10-14): gr-superleague, verificado contra roster cacheado de "2019–20 Super League Greece" (tools/club-league-reference/gr.json), coincidencia exacta "Panetolikos".
```

## 2018

### Ingresos

```text
2018: cargado por tools/cargar.mjs (2026-10-14) desde Clubes/Grecia/Panetolikos/Panetolikos_FS_2017-18.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Grecia/Panetolikos/Panetolikos_FS_2017-18.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Κύκλος εργασιών (καθαρός) | pág. 15, Jev 1 |
| 2 | Λοιπά συνήθη έσοδα | pág. 15, Jev 1 |
| 3 | Λοιπά έσοδα και κέρδη | pág. 15, Jev 0.99 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Κόστος πωλήσεων | pág. 15, precedente |
| 2 | Έξοδα διοίκησης | pág. 15, Jev 1 |
| 3 | Έξοδα διάθεσης | pág. 15, precedente |
| 4 | Λοιπά έξοδα και ζημιές | pág. 15, Jev 0.95 |

### Meta

```text
tools/cargar.mjs (2026-10-14). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee.
```

```text
tools/caja-deuda.mjs (2026-10-14): cash escalón 2 (compuerta: documento anterior): "Ταμειακά διαθέσιμα και ισοδύναμα" pág. 16
```

```text
tools/dentro-de-otro.mjs (2026-10-15): posiblemente dentro de otro rubro, por precedente del club (la fila tiene plata en sus balances desglosados 2023, 2024, 2025): Estadio, Venta de Jugadores
```

### Liga

```text
tools/cargar.mjs (2026-10-14): gr-superleague, verificado contra roster cacheado de "2017–18 Super League Greece" (tools/club-league-reference/gr.json), coincidencia exacta "Panetolikos".
```

## 2017

### Ingresos

```text
2017: cargado por tools/cargar.mjs (2026-10-14) desde Clubes/Grecia/Panetolikos/Panetolikos_FS_2016-17.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Grecia/Panetolikos/Panetolikos_FS_2016-17.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Κύκλος εργασιών (καθαρός) | pág. 13, Jev 1 |
| 2 | Λοιπά συνήθη έσοδα | pág. 13, Jev 1 |
| 3 | Λοιπά έσοδα και κέρδη | pág. 13, Jev 0.99 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Κόστος πωλήσεων | pág. 13, precedente |
| 2 | Έξοδα διοίκησης | pág. 13, Jev 1 |
| 3 | Έξοδα διάθεσης | pág. 13, precedente |
| 4 | Λοιπά έξοδα και ζημιές | pág. 13, Jev 0.95 |

### Meta

```text
tools/cargar.mjs (2026-10-14). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee.
```

```text
tools/caja-deuda.mjs (2026-10-14): cash escalón 2 (compuerta: documento siguiente): "Ταμειακά διαθέσιμα και ισοδύναμα" pág. 14
```

```text
tools/dentro-de-otro.mjs (2026-10-15): posiblemente dentro de otro rubro, por precedente del club (la fila tiene plata en sus balances desglosados 2023, 2024, 2025): Estadio, Venta de Jugadores
```

### Liga

```text
alta-club.mjs (2026-10-14): gr-superleague, verificado contra roster cacheado de "2016–17 Super League Greece" (tools/club-league-reference/gr.json), coincidencia exacta "Panetolikos".
```

## Fuentes

### panetolikos-gr-fs-2016-17

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-14) desde la transcripción Clubes/Grecia/Panetolikos/Panetolikos_FS_2016-17.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### panetolikos-gr-fs-2017-18

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-14) desde la transcripción Clubes/Grecia/Panetolikos/Panetolikos_FS_2017-18.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### panetolikos-gr-fs-2019-20

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-14) desde la transcripción Clubes/Grecia/Panetolikos/Panetolikos_FS_2019-20.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### panetolikos-gr-fs-2021-06-30

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-14) desde la transcripción Clubes/Grecia/Panetolikos/Panetolikos_FS_2021-06-30.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### panetolikos-gr-fs-2022-06-30

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-14) desde la transcripción Clubes/Grecia/Panetolikos/Panetolikos_FS_2022-06-30.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### panetolikos-gr-fs-2023-06-30

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-14) desde la transcripción Clubes/Grecia/Panetolikos/Panetolikos_FS_2023-06-30.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### panetolikos-gr-fs-2024-06-30

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-14) desde la transcripción Clubes/Grecia/Panetolikos/Panetolikos_FS_2024-06-30.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### panetolikos-gr-fs-2025-06-30

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-14) desde la transcripción Clubes/Grecia/Panetolikos/Panetolikos_FS_2025-06-30.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```
