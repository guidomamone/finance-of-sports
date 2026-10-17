# lazio-it — evidencia de carga

Lo que había como comentario en `data/it/lazio-it-data.js`, movido tal cual por `tools/archivo/mover-comentarios-data.mjs` (la regla:
`Admin/CONVENCIONES-DATOS.md`, "data/<país>/<club>-data.js NO LLEVA COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y
meta. Las notas de cada fila van en una tabla con su número de fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
============================================================================
data/it/lazio-it-data.js — S.S. Lazio S.p.A. (Italia).
ALTA POR SCRIPT (tools/alta-club.mjs, 2026-10-07), SIN EJERCICIOS CARGADOS TODAVÍA:
las estructuras de abajo están vacías a propósito. Los rubros, los totales
oficiales y el resto del fiscalYearMeta los agrega la etapa de carga
(tools/proponer-carga.mjs / sesión de onboarding), que es también la que
reemplaza esta cabecera por la de siempre (fuente, perímetro, categorización).

Documento que originó el alta: Clubes/Italia/Lazio/Lazio-bilancio-separato-consolidato-2022-23.pdf

De dónde salió cada campo (estado según alta-club.mjs: ok / pendiente):
  id                 ok        "lazio-it" — slug de "Lazio" + '-it' (convención de clubId, Admin/CONVENCIONES.md Versión 129)
  name               ok        "S.S. Lazio S.p.A." — el .md, 15 veces (nombre del club + forma societaria)
  displayName        ok        "Lazio" — nombre de la carpeta del club en Clubes/
  country            ok        "IT" — carpeta de país "Italia" (tabla PAISES)
  reportingCurrency  ok        "EUR" — moneda de curso legal de Italia
  fiscalYearStart    ok        "07-01" — cierre del ejercicio: contenido del .md (658 de 691 fechas de fin de mes caen en el mes 6)
  sport              ok        "futbol" — el .md nombra el fútbol 26 veces y ningún otro deporte más que eso
  brandColor         pendiente (ausente) — tools/brand-color-reference/ (footylogos): [italia] lazio: #74D1EA Sky Blue, #FFFFFF White, #D69A2D Gold, #003A70 Navy Blue
  anio               ok        2023 — nombre del archivo (misma regla que onboard.mjs --quien), confirmado por las fechas de cierre del .md
  cierre             ok        "2023-06-30" — año del ejercicio + mes de cierre (contenido del .md (658 de 691 fechas de fin de mes caen en el mes 6))
  reportType         ok        "official_balance_sheet" — el .md tiene un estado contable (resultados / balance) y el nombre del archivo no sugiere otro tipo
  perimetro          ok        "consolidado" — ajuste manual (Admin/registros/ajustes-manuales.jsonl, perimetro-senales 2026-10-06): perimetro-senales.mjs: 5 documento(s) con los dos estados votan consolidad
  currency           ok        "EUR" — moneda de curso legal de Italia (tabla PAISES de alta-club.mjs)
  fxRef              ok        "EUR@2023-06-30" — el documento no declara tipo de cambio; FX_CLOSE ya tiene EUR@2023-06-30 = 0.9203 (Cierre BCE al 30/6/2023 (1 EUR = 1,0866 USD))
  sourceId           ok        "lazio-it-bilancio-separato-consolidato-2022-23" — clubId + nombre del archivo en slug
  liga               ok        "it-seriea" — roster cacheado de "2022–23 Serie A" (tools/club-league-reference/it.json), coincidencia exacta "Lazio"

FISCAL YEAR META PROPUESTO para 2023 (NO registrado: un ejercicio con meta y
sin rubros se vería en el sitio como un año en cero, y "sin dato no es cero"):
  2023: {"reportType":"official_balance_sheet","currency":"EUR","fxRef":"EUR@2023-06-30","sourceId":"lazio-it-bilancio-separato-consolidato-2022-23"}
============================================================================
```

_de data/clubs.js:_

```text
Lazio: alta por tools/alta-club.mjs (2026-10-07) desde Clubes/Italia/Lazio/Lazio-bilancio-separato-consolidato-2022-23.pdf.
brandColor y su procedencia: Admin/sourcing/Italia/Lazio.md.
```

_de data/club-leagues/it.js:_

```text
Lazio (alta-club.mjs, 2026-10-07): verificado contra roster cacheado de "2022–23 Serie A" (tools/club-league-reference/it.json), coincidencia exacta "Lazio".
```

## 2026

### Ingresos

```text
2026: cargado por tools/cargar.mjs (2026-10-08) desde Clubes/Italia/Lazio/Lazio-relazione-finanziaria-annuale-2025-26.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Italia/Lazio/Lazio-relazione-finanziaria-annuale-2025-26.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Ricavi da gare | pág. 130, precedente |
| 2 | Diritti radiotelevisivi e proventi media | pág. 130, precedente |
| 3 | Ricavi da sponsorizzazione e pubblicità | pág. 130, precedente |
| 4 | Proventi da gestione diritti calciatori | pág. 130, precedente |
| 5 | Altri ricavi | pág. 130, precedente |
| 6 | Ricavi da merchandising | pág. 130, precedente |
| 7 | Plusvalenze da cessione dei diritti pluriennali alle prestazioni dei tesserati | pág. 130, precedente |

### Gastos

```text
tools/cargar.mjs (2026-10-08)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Costi per materie prime | pág. 130, precedente |
| 2 | Costo del Personale | pág. 130, precedente |
| 3 | Costi per servizi | pág. 130, precedente |
| 4 | Oneri da gestione diritti calciatori | pág. 130, precedente |
| 5 | Altri costi | pág. 130, precedente |
| 6 | Ammortamenti, accantonamenti e svalutazioni | pág. 130, precedente |

### Meta

```text
tools/cargar.mjs (2026-10-08). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

```text
tools/caja-deuda.mjs (2026-10-17): cash escalón 0 (compuerta: ajuste manual): ajuste manual (2026-10-17): Claude 2026-10-17 (to-do 260 e, revisado contra el .md; préstamos de socios incluidos, decisión de Guido): "Disponibilità liquide e mezzi equivalenti" del balance CONSOLIDADO (PARTE II); el script leía el separado
```

```text
tools/caja-deuda.mjs (2026-10-17): grossDebt escalón 0 (compuerta: ajuste manual): ajuste manual (2026-10-17): Claude 2026-10-17 (leído en el balance por subagente Sonnet, criterio de deuda financiera con socios): Debiti finanziari (no corrientes) 37.203.423 + Debiti finanziari (corrientes) 91.036.058. Consolidado. Incluye leasing IFRS 16 (0,55 M corriente + 1,73 M no corriente); sin fila propia. Sin leasing serían 126,0 M.
```

### Liga

```text
2026: verificado 2026-10-09 contra roster cacheado de "2025–26 Serie A" (tools/club-league-reference/it.json), "Lazio"
```

## 2025

### Ingresos

```text
2025: cargado por tools/cargar.mjs (2026-10-08) desde Clubes/Italia/Lazio/Lazio-relazione-finanziaria-annuale-2024-25.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Italia/Lazio/Lazio-relazione-finanziaria-annuale-2024-25.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Ricavi da gare | pág. 141, precedente |
| 2 | Diritti radiotelevisivi e proventi media | pág. 141, precedente |
| 3 | Ricavi da sponsorizzazione e pubblicità | pág. 141, precedente |
| 4 | Proventi da gestione diritti calciatori | pág. 141, precedente |
| 5 | Altri ricavi | pág. 141, precedente |
| 6 | Ricavi da merchandising | pág. 141, precedente |
| 7 | Plusvalenze da cessione dei diritti pluriennali alle prestazioni dei tesserati | pág. 141, precedente |

### Gastos

```text
tools/cargar.mjs (2026-10-08)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Costi per materie prime | pág. 141, precedente |
| 2 | Costo del personale | pág. 141, precedente |
| 3 | Costi per servizi | pág. 141, precedente |
| 4 | Oneri da gestione diritti calciatori | pág. 141, precedente |
| 5 | Altri costi | pág. 141, precedente |
| 6 | Ammortamenti, accantonamenti e svalutazioni | pág. 141, precedente |
| 7 | Minusvalenze da cessione dei diritti pluriennali alle prestazioni dei tesserati | pág. 141, Jev 1 |

### Meta

```text
tools/cargar.mjs (2026-10-08). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

```text
tools/caja-deuda.mjs (2026-10-17): cash escalón 0 (compuerta: ajuste manual): ajuste manual (2026-10-17): Claude 2026-10-17 (to-do 260 e, revisado contra el .md; préstamos de socios incluidos, decisión de Guido): "Disponibilità liquide e mezzi equivalenti" del balance CONSOLIDADO (PARTE II); el script leía el separado
```

```text
tools/caja-deuda.mjs (2026-10-17): grossDebt escalón 0 (compuerta: ajuste manual): ajuste manual (2026-10-17): Claude 2026-10-17 (leído en el balance por subagente Sonnet, criterio de deuda financiera con socios): Debiti finanziari (no corrientes) 7.751.456 + Debiti finanziari (corrientes) 64.606.243. Consolidado. Incluye leasing IFRS 16 (0,58 M corriente + 1,28 M no corriente); sin fila propia. Sin leasing serían 70,50 M.
```

### Liga

```text
2025: tools/cargar.mjs 2026-10-08, verificado contra roster cacheado de "2024–25 Serie A" (tools/club-league-reference/it.json), coincidencia e
```

## 2024

### Ingresos

```text
2024: cargado por tools/cargar.mjs (2026-10-08) desde Clubes/Italia/Lazio/Lazio-bilancio-separato-consolidato-2023-24.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Italia/Lazio/Lazio-bilancio-separato-consolidato-2023-24.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Ricavi da gare | pág. 118, precedente |
| 2 | Diritti radiotelevisivi e proventi media | pág. 118, precedente |
| 3 | Ricavi da sponsorizzazione e pubblicità | pág. 118, precedente |
| 4 | Proventi da gestione diritti calciatori | pág. 118, precedente |
| 5 | Altri ricavi | pág. 118, precedente |
| 6 | Ricavi da merchandising | pág. 118, precedente |
| 7 | Plusvalenze da cessione dei diritti pluriennali alle prestazioni dei tesserati | pág. 118, precedente |

### Gastos

```text
tools/cargar.mjs (2026-10-08)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Costi per materie prime | pág. 118, precedente |
| 2 | Costo del Personale | pág. 118, precedente |
| 3 | Costi per servizi | pág. 118, precedente |
| 4 | Oneri da gestione diritti calciatori | pág. 118, precedente |
| 5 | Altri costi | pág. 118, precedente |
| 6 | Ammortamenti, accantonamenti e svalutazioni | pág. 118, precedente |
| 7 | Minusvalenze da diritti alle prestazioni dei tesserati | pág. 118, precedente |

### Meta

```text
tools/cargar.mjs (2026-10-08). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

```text
tools/caja-deuda.mjs (2026-10-17): cash escalón 0 (compuerta: ajuste manual): ajuste manual (2026-10-17): Claude 2026-10-17 (to-do 260 e, revisado contra el .md; préstamos de socios incluidos, decisión de Guido): "Disponibilità liquide e mezzi equivalenti" del balance CONSOLIDADO (PARTE II); el script leía el separado
```

```text
tools/caja-deuda.mjs (2026-10-17): grossDebt escalón 0 (compuerta: ajuste manual): ajuste manual (2026-10-17): Claude 2026-10-17 (leído en el balance por subagente Sonnet, criterio de deuda financiera con socios): Debiti finanziari (no corrientes) 12.333.696 + Debiti finanziari (corrientes) 40.875.329. Consolidado. Incluye leasing IFRS 16 (0,44 M corriente + 1,67 M no corriente); sin fila propia. Sin leasing serían 51,10 M.
```

### Liga

```text
2024: tools/cargar.mjs 2026-10-08, verificado contra roster cacheado de "2023–24 Serie A" (tools/club-league-reference/it.json), coincidencia e
```

## 2023

### Ingresos

```text
2023: cargado por tools/cargar.mjs (2026-10-07) desde Clubes/Italia/Lazio/Lazio-bilancio-separato-consolidato-2022-23.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Italia/Lazio/Lazio-bilancio-separato-consolidato-2022-23.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Ricavi da gare | pág. 99, Jev 1 |
| 2 | Diritti radiotelevisivi e proventi media | pág. 99, Jev 1 |
| 3 | Ricavi da sponsorizzazione e pubblicità | pág. 99, Jev 1 |
| 4 | Proventi da gestione diritti calciatori | pág. 99, Jev 0.99 |
| 5 | Altri ricavi | pág. 99, Jev 1 |
| 6 | Ricavi da merchandising | pág. 99, Jev 1 |
| 7 | Plusvalenze da cessione dei diritti pluriennali alle prestazioni dei tesserati | pág. 99, Jev 1 |

### Gastos

```text
tools/cargar.mjs (2026-10-07)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Costi per materie prime | pág. 99, Jev 0.96 |
| 2 | Costo del Personale | pág. 99, precedente |
| 3 | Costi per servizi | pág. 99, Jev 0.93 |
| 4 | Oneri da gestione diritti calciatori | pág. 99, precedente |
| 5 | Altri costi | pág. 99, Jev 1 |
| 6 | Ammortamenti, accantonamenti e svalutazioni | pág. 99, precedente |
| 7 | Minusvalenze da diritti alle prestazioni dei tesserati | pág. 99, Jev 0.94 |

### Meta

```text
tools/cargar.mjs (2026-10-07). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

```text
tools/caja-deuda.mjs (2026-10-17): cash escalón 0 (compuerta: ajuste manual): ajuste manual (2026-10-17): Claude 2026-10-17 (to-do 260 e, revisado contra el .md; préstamos de socios incluidos, decisión de Guido): "Disponibilità liquide e mezzi equivalenti" del balance CONSOLIDADO (PARTE II); el script leía el separado
```

```text
tools/caja-deuda.mjs (2026-10-17): grossDebt escalón 0 (compuerta: ajuste manual): ajuste manual (2026-10-17): Claude 2026-10-17 (leído en el balance por subagente Sonnet, criterio de deuda financiera con socios): Debiti finanziari (no corrientes) 23.118.916 + Debiti finanziari (corrientes) 37.556.352. Consolidado. Incluye leasing IFRS 16 (0,45 M corriente + 2,16 M no corriente); sin fila propia. Sin leasing serían 58,07 M.
```

## 2022

### Ingresos

```text
2022: cargado por tools/cargar.mjs (2026-10-07) desde Clubes/Italia/Lazio/Lazio-bilancio-separato-consolidato-2021-22.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Italia/Lazio/Lazio-bilancio-separato-consolidato-2021-22.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Ricavi da gare | pág. 97, precedente |
| 2 | Diritti radiotelevisivi e proventi media | pág. 97, precedente |
| 3 | Ricavi da sponsorizzazione e pubblicità | pág. 97, precedente |
| 4 | Proventi da gestione diritti calciatori | pág. 97, precedente |
| 5 | Altri ricavi | pág. 97, precedente |
| 6 | Ricavi da merchandising | pág. 97, precedente |
| 7 | Plusvalenze da cessione dei diritti pluriennali alle prestazioni dei tesserati | pág. 97, precedente |

### Gastos

```text
tools/cargar.mjs (2026-10-07)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Costi per materie prime | pág. 97, precedente |
| 2 | Costo del personale | pág. 97, precedente |
| 3 | Costi per servizi | pág. 97, precedente |
| 4 | Oneri da gestione diritti calciatori | pág. 97, precedente |
| 5 | Altri costi | pág. 97, precedente |
| 6 | Ammortamenti, accantonamenti e svalutazioni | pág. 97, precedente |

### Meta

```text
tools/cargar.mjs (2026-10-07). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

```text
tools/caja-deuda.mjs (2026-10-17): cash escalón 0 (compuerta: ajuste manual): ajuste manual (2026-10-17): Claude 2026-10-17 (to-do 260 e, revisado contra el .md; préstamos de socios incluidos, decisión de Guido): "Disponibilità liquide e mezzi equivalenti" del balance CONSOLIDADO (PARTE II); el script leía el separado
```

```text
tools/caja-deuda.mjs (2026-10-17): grossDebt escalón 0 (compuerta: ajuste manual): ajuste manual (2026-10-17): Claude 2026-10-17 (leído en el balance por subagente Sonnet, criterio de deuda financiera con socios): Debiti finanziari (no corrientes) 44.392.484 + Debiti finanziari (corrientes) 15.434.696. Consolidado. Incluye leasing IFRS 16 (0,34 M corriente + 1,44 M no corriente) y la parte corriente 1,09 M de mutuo; sin fila propia. Sin leasing serían 58,05 M.
```

### Liga

```text
2022: tools/cargar.mjs 2026-10-07, verificado contra roster cacheado de "2021–22 Serie A" (tools/club-league-reference/it.json), coincidencia e
```

## 2021

### Ingresos

```text
2021: cargado por tools/cargar.mjs (2026-10-08) desde Clubes/Italia/Lazio/Lazio-bilancio-separato-consolidato-2020-21.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Italia/Lazio/Lazio-bilancio-separato-consolidato-2020-21.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | -) televisivi | pág. 104, precedente |
| 2 | -) televisivi da partecipazioni comp. U.E.F.A. | pág. 104, precedente |
| 3 | -) da L.N.P. | pág. 104, precedente |
| 4 | Sponsorizzazioni | pág. 104, precedente |
| 5 | Proventi pubblicitari | pág. 104, precedente |
| 6 | Canoni per licenze, marchi, brevetti | pág. 104, precedente |
| 7 | Cessione temporanea calciatori | pág. 104, precedente |
| 8 | Altri proventi da gestione calciatori | pág. 104, precedente |
| 9 | -) da altri | pág. 104, precedente |
| 10 | Contributi in clesercizio | pág. 104, precedente |
| 11 | Proventi vari | pág. 104, precedente |
| 12 | Ricavi da merchandising | pág. 104, precedente |
| 13 | Plusvalenze da cessione dei diritti pluriennali alle prestazioni dei tesserati | pág. 104, precedente |

### Gastos

```text
tools/cargar.mjs (2026-10-08)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Acquisti di materie prime, sussidiarie, di consumo e di merci | pág. 104, precedente |
| 2 | Variazione delle rimanenze | pág. 104, precedente |
| 3 | Salari e stipendi | pág. 104, precedente |
| 4 | Oneri sociali | pág. 104, precedente |
| 5 | Trattamento di fine rapporto | pág. 104, precedente |
| 6 | Altri costi | pág. 104, precedente |
| 7 | Costi per Acquisizione temporanea prestazioni calciatori | pág. 104, precedente |
| 8 | Altri oneri da gestione calciatori | pág. 104, precedente |
| 9 | Costi per tesserati | pág. 104, precedente |
| 10 | Costi specifici tecnici | pág. 104, precedente |
| 11 | Costi per vitto, alloggio e locomozione | pág. 104, precedente |
| 12 | Servizio biglietteria, controllo ingressi | pág. 104, precedente |
| 13 | Spese assicurative | pág. 104, precedente |
| 14 | Spese amministrative | pág. 104, precedente |
| 15 | Spese per pubblicità e promozione | pág. 104, precedente |
| 16 | Spese bancarie | pág. 104, precedente |
| 17 | Per godimento di beni di terzi | pág. 104, precedente |
| 18 | Spese varie organizzazione gare | pág. 104, precedente |
| 19 | Tassa iscrizioni gare | pág. 104, precedente |
| 20 | Altri oneri di gestione | pág. 104, precedente |
| 21 | Sopravvenienze passive | pág. 104, precedente |
| 22 | Minusvalenze da diritti alle prestazioni dei tesserati | pág. 104, precedente |
| 23 | Amm. delle attività immateriali | pág. 105, precedente |
| 24 | Amm. delle attività materiali | pág. 105, precedente |
| 25 | Amm. Dei diritti d'uso | pág. 105, precedente |
| 26 | Svalutaz. delle attività immateriali | pág. 105, precedente |
| 27 | Svalutaz. dei crediti dell'attivo circolante e dispon.liq. | pág. 105, precedente |

### Meta

```text
tools/cargar.mjs (2026-10-08). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

```text
tools/caja-deuda.mjs (2026-10-17): cash escalón 0 (compuerta: ajuste manual): ajuste manual (2026-10-17): Claude 2026-10-17 (to-do 260 e, revisado contra el .md; préstamos de socios incluidos, decisión de Guido): "Disponibilità liquide e mezzi equivalenti" del balance CONSOLIDADO (PARTE II); el script leía el separado
```

```text
tools/caja-deuda.mjs (2026-10-17): grossDebt escalón 0 (compuerta: ajuste manual): ajuste manual (2026-10-17): Claude 2026-10-17 (leído en el balance por subagente Sonnet, criterio de deuda financiera con socios): Debiti finanziari-altri finanziatori non correnti 12.671.536 + Debiti finanziari correnti 717.619 + Debiti verso altri finanziatori 25.812.290. Consolidado. Incluye leasing IFRS 16 dentro de las filas (0,35 M corriente + 1,62 M no corriente según la tabla PFN); sin fila propia en el balance.
```

### Liga

```text
2021: tools/cargar.mjs 2026-10-08, verificado contra roster cacheado de "2020–21 Serie A" (tools/club-league-reference/it.json), coincidencia e
```

## 2020

### Ingresos

```text
2020: cargado por tools/cargar.mjs (2026-10-07) desde Clubes/Italia/Lazio/Lazio-bilancio-separato-consolidato-2019-20.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Italia/Lazio/Lazio-bilancio-separato-consolidato-2019-20.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | ricavi da gare in casa | pág. 106, Jev 1 |
| 2 | abbonamenti | pág. 106, Jev 1 |
| 3 | -) televisivi | pág. 106, Jev 0.98 |
| 4 | -) televisivi da partecipazioni comp. U.E.F.A. | pág. 106, Claude 0.82 |
| 5 | -) da L.N.P. | pág. 106, precedente |
| 6 | Sponsorizzazioni | pág. 106, Jev 1 |
| 7 | Proventi pubblicitari | pág. 106, Jev 1 |
| 8 | Canoni per licenze, marchi, brevetti | pág. 106, Jev 0.9 |
| 9 | Cessione temporanea calciatori | pág. 106, Jev 1 |
| 10 | -) da altri | pág. 106, Jev 0.98 |
| 11 | Contributi in c/esercizio | pág. 106, Jev 0.99 |
| 12 | Proventi vari | pág. 106, Jev 0.97 |
| 13 | Ricavi da merchandising | pág. 106, Jev 1 |
| 14 | Plusvalenze da cessione dei diritti pluriennali alle prestazioni dei tesserati | pág. 106, Jev 1 |

### Gastos

```text
tools/cargar.mjs (2026-10-07)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Acquisti di materie prime,sussidiarie,di consumo e di merci | pág. 106, Jev 1 |
| 2 | Variazione delle rimanenze | pág. 106, Jev 1 |
| 3 | Salari e stipendi | pág. 106, Jev 0.99 |
| 4 | Oneri sociali | pág. 106, Jev 0.91 |
| 5 | Trattamento di fine rapporto | pág. 106, Claude 0.8 |
| 6 | Altri costi | pág. 106, Jev 1 |
| 7 | Costi per Acquisizione temporanea prestazioni calciatori | pág. 106, Jev 0.98 |
| 8 | Altri oneri da gestione calciatori | pág. 106, Jev 0.95 |
| 9 | Costi per tesserati | pág. 106, precedente |
| 10 | Costi specifici tecnici | pág. 106, Jev 0.93 |
| 11 | Costi per vitto,alloggio e locomozione | pág. 106, Jev 1 |
| 12 | Servizio biglietteria, controllo ingressi | pág. 106, Jev 0.99 |
| 13 | Spese assicurative | pág. 106, Jev 0.98 |
| 14 | Spese amministrative | pág. 106, Jev 1 |
| 15 | Spese per pubblicità e promozione | pág. 106, Jev 1 |
| 16 | Spese bancarie | pág. 106, precedente |
| 17 | Per godimento di beni di terzi | pág. 106, Jev 0.99 |
| 18 | Spese varie organizzazione gare | pág. 106, Jev 1 |
| 19 | Tassa iscrizioni gare | pág. 106, Jev 1 |
| 20 | -) percentuale su incassi gare a squadra ospite | pág. 106, Jev 0.9 |
| 21 | Altri oneri di gestione | pág. 106, Jev 0.95 |
| 22 | Sopravvenienze passive | pág. 106, Jev 1 |
| 23 | Amm. delle attività immateriali | pág. 106, Jev 0.94 |
| 24 | Amm. delle attività materiali | pág. 106, Jev 1 |
| 25 | Amm. Dei diritti d'uso | pág. 106, precedente |
| 26 | Svalutaz. delle attività immateriali | pág. 106, Jev 0.94 |
| 27 | Svalutaz. dei crediti dell'attivo circolante e dispon.liq. | pág. 106, Jev 1 |

### Meta

```text
tools/cargar.mjs (2026-10-07). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

```text
tools/caja-deuda.mjs (2026-10-17): cash escalón 0 (compuerta: ajuste manual): ajuste manual (2026-10-17): Claude 2026-10-17 (to-do 260 e, revisado contra el .md; préstamos de socios incluidos, decisión de Guido): "Disponibilità liquide e mezzi equivalenti" del balance CONSOLIDADO (PARTE II); el script leía el separado (en miles: el ajuste se lee con la escala del documento, miles, y este balance imprime euros)
```

```text
tools/caja-deuda.mjs (2026-10-17): grossDebt escalón 0 (compuerta: ajuste manual): ajuste manual (2026-10-17): Claude 2026-10-17 (leído en el balance por subagente Sonnet, criterio de deuda financiera con socios): Debiti finanziari-altri finanziatori non correnti 24.583.618 + Debiti finanziari correnti 0 + Debiti verso altri finanziatori 36.534.631. Consolidado. Cuadra con la tabla IAS 7 (61.118 miles). Incluye pasivos IFRS 16 (adopción 1/7/2019, ~2,1 M al inicio) dentro de esas filas, sin fila propia; no se pueden separar sin las notas. (valor en la escala del documento, miles: el ajuste se multiplica por ella)
```

### Liga

```text
2020: tools/cargar.mjs 2026-10-07, verificado contra roster cacheado de "2019–20 Serie A" (tools/club-league-reference/it.json), coincidencia e
```

## 2019

### Ingresos

```text
2019: cargado por tools/cargar.mjs (2026-10-08) desde Clubes/Italia/Lazio/Lazio-bilancio-separato-consolidato-2018-19.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Italia/Lazio/Lazio-bilancio-separato-consolidato-2018-19.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | ricavi da gare in casa | pág. 104, precedente |
| 2 | percentuali su incassi gare da squadra ospitanti | pág. 104, precedente |
| 3 | abbonamenti | pág. 104, precedente |
| 4 | -) televisivi | pág. 104, precedente |
| 5 | -) televisivi da partecipazioni comp. U.E.F.A. | pág. 104, precedente |
| 6 | -) da L.N.P. | pág. 104, precedente |
| 7 | Sponsorizzazioni | pág. 104, precedente |
| 8 | Proventi pubblicitari | pág. 104, precedente |
| 9 | Canoni per licenze, marchi, brevetti | pág. 104, precedente |
| 10 | Cessione temporanea calciatori | pág. 104, precedente |
| 11 | Plusvalenze da cessione dei diritti pluriennali alle prestazioni dei calciatori | pág. 104, precedente |
| 12 | Altri proventi da gestione calciatori | pág. 104, precedente |
| 13 | -) da transazioni con creditori (non ricorrenti) | pág. 104, precedente |
| 14 | -) da altri | pág. 104, precedente |
| 15 | Contributi in c/esercizio | pág. 104, precedente |
| 16 | Proventi vari | pág. 104, precedente |
| 17 | Variazione delle rimanenze | pág. 104, precedente |
| 18 | Ricavi da merchandising | pág. 104, precedente |

### Gastos

```text
tools/cargar.mjs (2026-10-08)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Materie prime,sussidiarie,di consumo e di merci | pág. 104, precedente |
| 2 | Salari e stipendi | pág. 104, precedente |
| 3 | Oneri sociali | pág. 104, precedente |
| 4 | Trattamento di fine rapporto | pág. 104, precedente |
| 5 | Altri costi | pág. 104, precedente |
| 6 | Altri oneri da gestione calciatori | pág. 104, precedente |
| 7 | Costi per tesserati | pág. 104, precedente |
| 8 | Costi specifici tecnici | pág. 104, precedente |
| 9 | Costi per vitto,alloggio e locomozione | pág. 104, precedente |
| 10 | Servizio biglietteria, controllo ingressi | pág. 104, precedente |
| 11 | Spese assicurative | pág. 104, precedente |
| 12 | Spese amministrative | pág. 104, precedente |
| 13 | Spese per pubblicità e promozione | pág. 104, precedente |
| 14 | Spese bancarie | pág. 104, precedente |
| 15 | Per godimento di beni di terzi | pág. 104, precedente |
| 16 | Spese varie organizzazione gare | pág. 104, precedente |
| 17 | Tassa iscrizioni gare | pág. 104, precedente |
| 18 | -) percentuale su incassi gare a squadra ospite | pág. 104, precedente |
| 19 | Altri oneri di gestione | pág. 104, precedente |
| 20 | Sopravvenienze passive (non ricorrenti) | pág. 104, precedente |
| 21 | Amm. delle immobilizzazioni immateriali | pág. 104, precedente |
| 22 | Amm. delle immobilizzazioni materiali | pág. 104, precedente |
| 23 | Svalutaz. Delle immobilizzazioni | pág. 104, precedente |
| 24 | Svalutaz. dei crediti dell'attivo circolante e dispon.liq. | pág. 104, precedente |
| 25 | Accantonamenti per rischi | pág. 104, precedente |

### Meta

```text
tools/cargar.mjs (2026-10-08). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

```text
tools/caja-deuda.mjs (2026-10-17): grossDebt escalón 0 (compuerta: ajuste manual): ajuste manual (2026-10-17): Claude 2026-10-17 (to-do 260 e, revisado contra el .md; préstamos de socios incluidos, decisión de Guido): consolidado: altri finanziatori non correnti 19.520.676 + finanziari correnti 3 + altri finanziatori 39.995.661 (en miles: el ajuste se lee con la escala del documento, miles, y este balance imprime euros); cash escalón 0 (compuerta: ajuste manual): ajuste manual (2026-10-17): Claude 2026-10-17 (to-do 260 e, revisado contra el .md; préstamos de socios incluidos, decisión de Guido): "Disponibilità liquide e mezzi equivalenti" del balance CONSOLIDADO (PARTE II); el script leía el separado (en miles: el ajuste se lee con la escala del documento, miles, y este balance imprime euros)
```

### Liga

```text
2019: tools/cargar.mjs 2026-10-08, verificado contra roster cacheado de "2018–19 Serie A" (tools/club-league-reference/it.json), coincidencia e
```

## 2018

### Ingresos

```text
2018: cargado por tools/cargar.mjs (2026-10-08) desde Clubes/Italia/Lazio/Lazio-bilancio-separato-consolidato-2017-18.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Italia/Lazio/Lazio-bilancio-separato-consolidato-2017-18.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Ricavi da gare in casa | pág. 133, Jev 1 |
| 2 | Abbonamenti | pág. 133, Jev 1 |
| 3 | Televisivi | pág. 133, precedente |
| 4 | Televisivi da partecipazioni a comp. UEFA | pág. 133, Claude 0.93 |
| 5 | Da LNP | pág. 133, Jev 0.99 |
| 6 | Sponsorizzazioni | pág. 134, Jev 1 |
| 7 | Proventi Pubblicitari | pág. 134, Jev 1 |
| 8 | Canoni per licenze, marchi e brevetti | pág. 134, precedente |
| 9 | Cessione temporanea calciatori | pág. 134, Jev 1 |
| 10 | Plusvalenze da cessione dei diritti pluriennali alle prestazioni dei calciatori | pág. 134, Jev 1 |
| 11 | Altri proventi da gestione calciatori | pág. 134, Claude 0.8 |
| 12 | Transazioni con creditori | pág. 135, Jev 1 |
| 13 | Da altri | pág. 135, precedente |
| 14 | Contributi in c/esercizio | pág. 135, Jev 0.99 |
| 15 | Proventi vari | pág. 135, Jev 0.97 |
| 16 | Variazione delle rimanenze | pág. 92, precedente |
| 17 | Materiale per vendita a terzi | pág. 135, Claude 0.88 |
| 18 | Altri | pág. 135, Claude 0.8 |

### Gastos

```text
tools/cargar.mjs (2026-10-08)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Materie prime, sussidiarie, di consumo e di merci | pág. 92, precedente |
| 2 | - Compensi contrattuali calciatori | pág. 136, Jev 1 |
| 3 | - Quota variabile legata ai risultati sportivi | pág. 136, Jev 0.98 |
| 4 | - Compensi contrattuali allenatori e tecnici I squadra | pág. 136, Jev 1 |
| 5 | - Quota variabile legata ai risultati sportivi | pág. 136, Jev 0.98 |
| 6 | - Compensi contrattuali allenatori e tecnici sq. Minori | pág. 136, precedente |
| 7 | - Oneri sociali | pág. 136, precedente |
| 8 | - Trattamento di fine carriera | pág. 136, Claude 0.88 |
| 9 | - Altri Costi | pág. 136, precedente |
| 10 | - Salari e stipendi | pág. 136, precedente |
| 11 | - Oneri sociali | pág. 136, precedente |
| 12 | -Trattamento di fine rapporto | pág. 136, precedente |
| 13 | - Altri Costi | pág. 136, precedente |
| 14 | Costi per acquisizione temporanea calciatori | pág. 137, Jev 0.99 |
| 15 | Altri oneri da gestione calciatori | pág. 137, Jev 0.95 |
| 16 | Costi per tesserati | pág. 137, precedente |
| 17 | Costi specifici tecnici | pág. 137, Jev 0.93 |
| 18 | Costi per intermediazione tesserati | pág. 137, Jev 0.98 |
| 19 | Costi vitto, alloggio, locomozione gare | pág. 137, Jev 1 |
| 20 | Servizio biglietteria e controllo ingressi | pág. 137, precedente |
| 21 | Spese assicurative | pág. 137, Jev 0.98 |
| 22 | Spese amministrative | pág. 137, Jev 1 |
| 23 | Spese per pubblicità e promozione | pág. 137, Jev 1 |
| 24 | Spese bancarie | pág. 139, precedente |
| 25 | Per godimento di beni di terzi | pág. 139, Jev 0.99 |
| 26 | Spese varie organizzazione gare | pág. 139, Jev 1 |
| 27 | Tasse iscrizione gare | pág. 139, precedente |
| 28 | -% su incassi gare a squadre ospitate | pág. 139, Jev 0.99 |
| 29 | - oneri tributari indiretti | pág. 139, Jev 1 |
| 30 | - multe e danni | pág. 139, Jev 1 |
| 31 | Oneri straordinari | pág. 139, Jev 1 |
| 32 | Ammortamenti immobilizzazioni immateriali | pág. 140, Claude 0.9 |
| 33 | Ammortamenti immobilizzazioni materiali | pág. 140, Jev 1 |
| 34 | Svalutazione delle immobilizzazioni | pág. 140, Jev 0.99 |
| 35 | Accantonamenti e altre svalutazioni | pág. 92, precedente |

### Meta

```text
tools/cargar.mjs (2026-10-08). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

```text
tools/caja-deuda.mjs (2026-10-17): cash escalón 0 (compuerta: ajuste manual): ajuste manual (2026-10-17): Claude 2026-10-17 (to-do 260 e, revisado contra el .md; préstamos de socios incluidos, decisión de Guido): "Disponibilità liquide e mezzi equivalenti" del balance CONSOLIDADO (PARTE II); el script leía el separado (en miles: el ajuste se lee con la escala del documento, miles, y este balance imprime euros)
```

```text
tools/caja-deuda.mjs (2026-10-17): grossDebt escalón 0 (compuerta: ajuste manual): ajuste manual (2026-10-17): Claude 2026-10-17 (leído en el balance por subagente Sonnet, criterio de deuda financiera con socios): Debiti finanziari-altri finanziatori non correnti 22.990.178 + Debiti finanziari correnti 141 + Debiti verso altri finanziatori 27.467.810. Consolidado. Cuadra con PFN: 27,47 + 22,99 M. (valor en la escala del documento, miles: el ajuste se multiplica por ella)
```

### Liga

```text
2018: tools/cargar.mjs 2026-10-08, verificado contra roster cacheado de "2017–18 Serie A" (tools/club-league-reference/it.json), coincidencia e
```

## 2017

### Ingresos

```text
2017: cargado por tools/cargar.mjs (2026-10-08) desde Clubes/Italia/Lazio/Lazio-bilancio-separato-consolidato-2016-17.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Italia/Lazio/Lazio-bilancio-separato-consolidato-2016-17.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Ricavi da gare in casa | pág. 134, precedente |
| 2 | % su incassi gare da squadre ospitanti | pág. 134, precedente |
| 3 | Abbonamenti | pág. 134, precedente |
| 4 | Televisivi | pág. 134, precedente |
| 5 | Televisivi da partecipazioni a comp. UEFA | pág. 134, precedente |
| 6 | Da LNP | pág. 134, precedente |
| 7 | Sponsorizzazioni | pág. 135, precedente |
| 8 | Proventi Pubblicitari | pág. 135, precedente |
| 9 | Canoni per licenze, marchi e brevetti | pág. 135, precedente |
| 10 | Cessione temporanea calciatori | pág. 135, precedente |
| 11 | Plusvalenze da cessione dei diritti pluriennali alle prestazioni dei calciatori | pág. 135, precedente |
| 12 | Altri proventi da gestione calciatori | pág. 135, precedente |
| 13 | Transazioni con creditori | pág. 136, precedente |
| 14 | Da altri | pág. 136, precedente |
| 15 | Proventi vari | pág. 136, precedente |
| 16 | Variazione delle rimanenze | pág. 94, precedente |
| 17 | Materiale per vendita a terzi | pág. 136, precedente |
| 18 | Altri | pág. 136, precedente |

### Gastos

```text
tools/cargar.mjs (2026-10-08)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Materie prime, sussidiarie, di consumo e di merci | pág. 94, precedente |
| 2 | - Compensi contrattuali calciatori | pág. 137, precedente |
| 3 | - Quota variabile legata ai risultati sportivi | pág. 137, precedente |
| 4 | - Compensi contrattuali allenatori e tecnici I squadra | pág. 137, precedente |
| 5 | - Quota variabile legata ai risultati sportivi | pág. 137, precedente |
| 6 | - Compensi contrattuali allenatori e tecnici sq. Minori | pág. 137, precedente |
| 7 | - Oneri sociali | pág. 137, precedente |
| 8 | - Trattamento di fine carriera | pág. 137, precedente |
| 9 | - Altri Costi | pág. 137, precedente |
| 10 | - Salari e stipendi | pág. 137, precedente |
| 11 | - Oneri sociali | pág. 137, precedente |
| 12 | -Trattamento di fine rapporto | pág. 137, precedente |
| 13 | - Altri Costi | pág. 137, precedente |
| 14 | Costi per acquisizione temporanea calciatori | pág. 138, precedente |
| 15 | Altri oneri da gestione calciatori | pág. 138, precedente |
| 16 | Costi per tesserati | pág. 138, precedente |
| 17 | Costi specifici tecnici | pág. 138, precedente |
| 18 | Costi per intermediazione tesserati | pág. 138, precedente |
| 19 | Costi vitto, alloggio, locomozione gare | pág. 138, precedente |
| 20 | Servizio biglietteria e controllo ingressi | pág. 138, precedente |
| 21 | Spese assicurative | pág. 138, precedente |
| 22 | Spese amministrative | pág. 138, precedente |
| 23 | Spese per pubblicità e promozione | pág. 138, precedente |
| 24 | Spese bancarie | pág. 141, precedente |
| 25 | Per godimento di beni di terzi | pág. 141, precedente |
| 26 | Spese varie organizzazione gare | pág. 141, precedente |
| 27 | Tasse iscrizione gare | pág. 141, precedente |
| 28 | -% su incassi gare a squadre ospitate | pág. 141, precedente |
| 29 | - oneri tributari indiretti | pág. 141, precedente |
| 30 | - multe e danni | pág. 141, precedente |
| 31 | Oneri straordinari | pág. 141, precedente |
| 32 | Ammortamenti immobilizzazioni immateriali | pág. 141, precedente |
| 33 | Ammortamenti immobilizzazioni materiali | pág. 141, precedente |
| 34 | Svalutazione delle immobilizzazioni | pág. 141, precedente |
| 35 | Accantonamenti e altre svalutazioni | pág. 94, precedente |

### Meta

```text
tools/cargar.mjs (2026-10-08). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

```text
tools/caja-deuda.mjs (2026-10-17): cash escalón 0 (compuerta: ajuste manual): ajuste manual (2026-10-17): Claude 2026-10-17 (to-do 260 e, revisado contra el .md; préstamos de socios incluidos, decisión de Guido): "Disponibilità liquide e mezzi equivalenti" del balance CONSOLIDADO (PARTE II); el script leía el separado (en miles: el ajuste se lee con la escala del documento, miles, y este balance imprime euros)
```

```text
tools/caja-deuda.mjs (2026-10-17): grossDebt escalón 0 (compuerta: ajuste manual): ajuste manual (2026-10-17): Claude 2026-10-17 (leído en el balance por subagente Sonnet, criterio de deuda financiera con socios): Debiti finanziari non correnti 31.582.990 + Debiti finanziari correnti 8.777.546 + Debiti verso altri finanziatori 6.400.141. Consolidado. Cuadra con PFN: 15,18 + 31,58 M. (valor en la escala del documento, miles: el ajuste se multiplica por ella)
```

### Liga

```text
2017: tools/cargar.mjs 2026-10-08, verificado contra roster cacheado de "2016–17 Serie A" (tools/club-league-reference/it.json), coincidencia e
```

## 2016

### Ingresos

```text
2016: cargado por tools/cargar.mjs (2026-10-09) desde Clubes/Italia/Lazio/Lazio-bilancio-separato-consolidato-2015-16.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Italia/Lazio/Lazio-bilancio-separato-consolidato-2015-16.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Ricavi da gare | pág. 97, precedente |
| 2 | Diritti radiotelevisivi e proventi media | pág. 97, precedente |
| 3 | Ricavi da sponsorizzazione e pubblicità | pág. 97, precedente |
| 4 | Proventi da gestione diritti calciatori | pág. 97, precedente |
| 5 | Altri ricavi | pág. 97, precedente |
| 6 | Variazione delle rimanenze | pág. 97, precedente |
| 7 | Ricavi da merchandising | pág. 97, precedente |

### Gastos

```text
tools/cargar.mjs (2026-10-09)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Materie prime, sussidiarie, di consumo e di merci | pág. 97, precedente |
| 2 | Personale | pág. 97, precedente |
| 3 | Oneri da gestione diritti calciatori | pág. 97, precedente |
| 4 | Oneri per servizi esterni | pág. 97, precedente |
| 5 | Altri oneri | pág. 97, precedente |
| 6 | Ammortamenti e svalutazioni delle immobilizzazioni | pág. 97, precedente |
| 7 | Accantonamenti e altre svalutazioni | pág. 97, precedente |

### Meta

```text
2016: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-08): fila = (1.866.421). Claude 2026-10-08 (Guido: to-do 179 grupo 1, a mano): el financiero es un subtotal que la lectura 5 no toma; impreso (1.866.421)
tools/cargar.mjs (2026-10-09). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

```text
tools/caja-deuda.mjs (2026-10-17): cash escalón 0 (compuerta: ajuste manual): ajuste manual (2026-10-17): Claude 2026-10-17 (to-do 260 e, revisado contra el .md; préstamos de socios incluidos, decisión de Guido): "Disponibilità liquide e mezzi equivalenti" del balance CONSOLIDADO (PARTE II); el script leía el separado
```

```text
tools/caja-deuda.mjs (2026-10-17): grossDebt escalón 0 (compuerta: ajuste manual): ajuste manual (2026-10-17): Claude 2026-10-17 (leído en el balance por subagente Sonnet, criterio de deuda financiera con socios): Debiti finanziari non correnti 6.612.101 + Debiti finanziari correnti 8.853.264 + Debiti verso altri finanziatori 15.001.028. Consolidado. Cuadra con PFN: 23,85 + 6,61 M.
```

### Liga

```text
2016: tools/cargar.mjs 2026-10-09, verificado contra roster cacheado de "2015–16 Serie A" (tools/club-league-reference/it.json), coincidencia e
```

## 2015

### Ingresos

```text
2015: cargado por tools/cargar.mjs (2026-10-07) desde Clubes/Italia/Lazio/Lazio-bilancio-separato-consolidato-2014-15.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Italia/Lazio/Lazio-bilancio-separato-consolidato-2014-15.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | ricavi da gare in casa | pág. 94, precedente |
| 2 | percentuali su incassi gare da squadra ospitanti | pág. 94, precedente |
| 3 | abbonamenti | pág. 94, precedente |
| 4 | -) televisivi | pág. 94, precedente |
| 5 | -) televisivi da partecipazioni comp. U.E.F.A. | pág. 94, precedente |
| 6 | -) da L.N.P. | pág. 94, precedente |
| 7 | Sponsorizzazioni | pág. 94, precedente |
| 8 | Proventi pubblicitari | pág. 94, precedente |
| 9 | Canoni per licenze, marchi, brevetti | pág. 94, precedente |
| 10 | Cessione temporanea calciatori | pág. 94, precedente |
| 11 | Altri proventi da gestione calciatori | pág. 94, precedente |
| 12 | -) da transazioni con creditori (non ricorrenti) | pág. 94, precedente |
| 13 | -) da altri | pág. 94, precedente |
| 14 | Proventi vari | pág. 94, precedente |
| 15 | Variazione delle rimanenze | pág. 94, precedente |
| 16 | Ricavi da merchandising | pág. 94, precedente |

### Gastos

```text
tools/cargar.mjs (2026-10-07)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Materie prime,sussidiarie,di consumo e di merci | pág. 94, precedente |
| 2 | Salari e stipendi | pág. 94, precedente |
| 3 | Oneri sociali | pág. 94, precedente |
| 4 | Trattamento di fine rapporto | pág. 94, precedente |
| 5 | Altri costi | pág. 94, precedente |
| 6 | Costi per Acquisizione temporanea prestazioni calciatori | pág. 94, precedente |
| 7 | Altri oneri da gestione calciatori | pág. 94, precedente |
| 8 | Costi per tesserati | pág. 94, precedente |
| 9 | Costi specifici tecnici | pág. 94, precedente |
| 10 | Costi per vitto,alloggio e locomozione | pág. 94, precedente |
| 11 | Servizio biglietteria, controllo ingressi | pág. 94, precedente |
| 12 | Spese assicurative | pág. 94, precedente |
| 13 | Spese amministrative | pág. 94, precedente |
| 14 | Spese per pubblicità e promozione | pág. 94, precedente |
| 15 | Spese bancarie | pág. 94, precedente |
| 16 | Per godimento di beni di terzi | pág. 94, precedente |
| 17 | Spese varie organizzazione gare | pág. 94, precedente |
| 18 | Tassa iscrizioni gare | pág. 94, precedente |
| 19 | -) percentuale su incassi gare a squadra ospite | pág. 94, precedente |
| 20 | Altri oneri di gestione | pág. 94, precedente |
| 21 | Sopravvenienze passive (non ricorrenti) | pág. 94, precedente |
| 22 | Amm. delle immobilizzazioni immateriali | pág. 94, precedente |
| 23 | Amm. delle immobilizzazioni materiali | pág. 94, precedente |
| 24 | Svalutaz. Delle immobilizzazioni | pág. 94, precedente |
| 25 | Svalutaz. dei crediti dell'attivo circolante e dispon.liq. | pág. 94, precedente |
| 26 | Accantonamenti per rischi | pág. 94, precedente |

### Meta

```text
2015: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-07): fila = (3.432.429). el renglón salió con las columnas corridas y no se extrajo (arreglo manual 2026-10-07, causa encontrada por subagente; ver to-do 155)
2015: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-07): fila = 172.710. to-do 157: columnas corridas en el .md (L3463-3465); L3463 933.312 es el subtotal b)+c) con la etiqueta de b); L3464 172.710 es b). Reemplaza solo su propia fila (antes no reemplazaba y el impuesto entraba doble)
2015: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-07): fila = 760.602. to-do 157: L3465 760.602 es c); saca la fila de L3463 (933.312 = b)+c), el subtotal contado además de sus partes)
tools/cargar.mjs (2026-10-07). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

```text
tools/caja-deuda.mjs (2026-10-17): cash escalón 0 (compuerta: ajuste manual): ajuste manual (2026-10-17): Claude 2026-10-17 (to-do 260 e, revisado contra el .md; préstamos de socios incluidos, decisión de Guido): "Disponibilità liquide e mezzi equivalenti" del balance CONSOLIDADO (PARTE II); el script leía el separado (en miles: el ajuste se lee con la escala del documento, miles, y este balance imprime euros)
```

```text
tools/caja-deuda.mjs (2026-10-17): grossDebt escalón 0 (compuerta: ajuste manual): ajuste manual (2026-10-17): Claude 2026-10-17 (leído en el balance por subagente Sonnet, criterio de deuda financiera con socios): Debiti finanziari non correnti 7.152.188 + Debiti finanziari correnti 2.051.982 + Debiti verso altri finanziatori 11.693.515. Consolidado, sin correlacionadas. Cuadra con PFN: 13,74 + 7,15 M. (valor en la escala del documento, miles: el ajuste se multiplica por ella)
```

### Liga

```text
2015: tools/cargar.mjs 2026-10-07, verificado contra roster cacheado de "2014–15 Serie A" (tools/club-league-reference/it.json), coincidencia e
```

## 2014

### Ingresos

```text
2014: cargado por tools/cargar.mjs (2026-10-08) desde Clubes/Italia/Lazio/Lazio-bilancio-separato-consolidato-2013-14.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Italia/Lazio/Lazio-bilancio-separato-consolidato-2013-14.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Ricavi da gare | pág. 95, precedente |
| 2 | Diritti radiotelevisivi e proventi media | pág. 95, precedente |
| 3 | Ricavi da sponsorizzazione e pubblicità | pág. 95, precedente |
| 4 | Proventi da gestione diritti calciatori | pág. 95, precedente |
| 5 | Altri ricavi | pág. 95, precedente |
| 6 | Variazione delle rimanenze | pág. 95, precedente |
| 7 | Ricavi da merchandising | pág. 95, precedente |

### Gastos

```text
tools/cargar.mjs (2026-10-08)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Materie prime,sussidiarie,di consumo e di merci | pág. 95, precedente |
| 2 | Personale | pág. 95, Claude 0.88 |
| 3 | Oneri da gestione diritti calciatori | pág. 95, precedente |
| 4 | Oneri per servizi esterni | pág. 95, precedente |
| 5 | Altri oneri | pág. 95, Jev 1 |
| 6 | Ammortamenti e svalutazioni delle immobilizzazioni | pág. 95, precedente |
| 7 | Accantonamenti e altre svalutazioni | pág. 95, precedente |

### Meta

```text
2014: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-08): fila = (2.185.354). Claude 2026-10-08 (Guido: to-do 179 grupo 1, a mano): fila del financiero que falta por columnas corridas (pág. 96 del visor); impreso 75.611 + 180.715 - 2.441.681
2014: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-08): fila = (2.060.898). Claude 2026-10-08 (Guido: to-do 179 grupo 1, a mano): fila de impuestos que falta (columnas corridas)
2014: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-08): fila = 300.414. Claude 2026-10-08 (Guido: to-do 179 grupo 1, a mano): fila de impuestos que falta (columnas corridas)
tools/cargar.mjs (2026-10-08). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

```text
tools/caja-deuda.mjs (2026-10-17): cash escalón 0 (compuerta: ajuste manual): ajuste manual (2026-10-17): Claude 2026-10-17 (to-do 260 e, revisado contra el .md; préstamos de socios incluidos, decisión de Guido): "Disponibilità liquide e mezzi equivalenti" del balance CONSOLIDADO (PARTE II); el script leía el separado
```

```text
tools/caja-deuda.mjs (2026-10-17): grossDebt escalón 0 (compuerta: ajuste manual): ajuste manual (2026-10-17): Claude 2026-10-17 (leído en el balance por subagente Sonnet, criterio de deuda financiera con socios): Debiti finanziari non correnti 7.387.712 + Debiti finanziari correnti 0 + Debiti verso altri finanziatori 13.429.224 + parti correlate 0. Consolidado. Cuadra con PFN: 13,43 + 7,39 M.
```

### Liga

```text
2014: tools/cargar.mjs 2026-10-08, verificado contra roster cacheado de "2013–14 Serie A" (tools/club-league-reference/it.json), coincidencia e
```

## 2013

### Ingresos

```text
2013: cargado por tools/cargar.mjs (2026-10-08) desde Clubes/Italia/Lazio/Lazio-bilancio-separato-consolidato-2012-13.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Italia/Lazio/Lazio-bilancio-separato-consolidato-2012-13.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Ricavi da gare in casa | pág. 140, precedente |
| 2 | % su incassi gare da squadre ospitanti | pág. 140, Jev 1 |
| 3 | Abbonamenti | pág. 140, precedente |
| 4 | Televisivi | pág. 140, precedente |
| 5 | Televisivi da partecipazioni a comp. UEFA | pág. 140, precedente |
| 6 | Da LNP | pág. 140, precedente |
| 7 | Sponsorizzazioni | pág. 141, precedente |
| 8 | Proventi Pubblicitari | pág. 141, precedente |
| 9 | Canoni per licenze, marchi e brevetti | pág. 141, precedente |
| 10 | Cessione temporanea calciatori | pág. 142, precedente |
| 11 | Plusvalenze da cessione dei diritti pluriennali alle prestazioni dei calciatori | pág. 142, precedente |
| 12 | Altri proventi da gestione calciatori | pág. 142, precedente |
| 13 | Transazioni con creditori | pág. 142, precedente |
| 14 | Da altri | pág. 142, precedente |
| 15 | Contributi in c/esercizio | pág. 142, precedente |
| 16 | Proventi vari | pág. 142, precedente |
| 17 | Variazione delle rimanenze | pág. 98, precedente |
| 18 | Materiale per vendita a terzi | pág. 143, precedente |
| 19 | Altri | pág. 143, precedente |

### Gastos

```text
tools/cargar.mjs (2026-10-08)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Materie prime,sussidiarie,di consumo e di merci | pág. 98, precedente |
| 2 | - Compensi contrattuali calciatori | pág. 144, precedente |
| 3 | - Quota variabile legata ai risultati sportivi | pág. 144, precedente |
| 4 | - Compensi contrattuali allenatori e tecnici I squadra | pág. 144, precedente |
| 5 | - Quota variabile legata ai risultati sportivi | pág. 144, precedente |
| 6 | - Compensi contrattuali allenatori e tecnici sq. Minori | pág. 144, precedente |
| 7 | - Oneri sociali | pág. 144, precedente |
| 8 | - Trattamento di fine carriera | pág. 144, precedente |
| 9 | - Altri Costi | pág. 144, precedente |
| 10 | - Salari e stipendi | pág. 144, precedente |
| 11 | - Oneri sociali | pág. 144, precedente |
| 12 | - Trattamento di fine rapporto | pág. 144, precedente |
| 13 | - Altri Costi | pág. 144, precedente |
| 14 | Oneri da gestione diritti calciatori | pág. 98, precedente |
| 15 | Costi per tesserati | pág. 145, precedente |
| 16 | Costi specifici tecnici | pág. 145, precedente |
| 17 | Costi per intermediazione tesserati | pág. 145, precedente |
| 18 | Costi vitto, alloggio, locomozione gare | pág. 145, precedente |
| 19 | Servizio biglietteria e controllo ingressi | pág. 145, precedente |
| 20 | Spese assicurative | pág. 145, precedente |
| 21 | Spese amministrative | pág. 145, precedente |
| 22 | Spese per pubblicità e promozione | pág. 145, precedente |
| 23 | Spese bancarie | pág. 147, precedente |
| 24 | Per godimento di beni di terzi | pág. 147, precedente |
| 25 | Spese varie organizzazione gare | pág. 147, precedente |
| 26 | Tasse iscrizione gare | pág. 147, precedente |
| 27 | -% su incassi gare a squadre ospitate | pág. 147, precedente |
| 28 | - oneri tributari indiretti | pág. 147, precedente |
| 29 | - multe e danni | pág. 147, precedente |
| 30 | Oneri straordinari | pág. 147, precedente |
| 31 | Ammortamenti immobilizzazioni immateriali | pág. 148, precedente |
| 32 | Ammortamenti immobilizzazioni immateriali | pág. 148, precedente |
| 33 | Svalutazione delle immobilizzazioni | pág. 148, precedente |
| 34 | Accantonamenti e altre svalutazioni | pág. 98, precedente |

### Meta

```text
2013: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-08): fila = (4.068.181). columnas corridas en L3635-L3661; 105 + 287.471 - 4.355.757 = -4.068.181
2013: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-08): fila = (2.584.541). columnas corridas; el importe 2013 está en la columna del año
2013: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-08): fila = 5.533.728. columnas corridas; 5.533.728 = 1.618.551 + 3.915.177 (L3658-L3660); cierra el utile -5.894.288
tools/cargar.mjs (2026-10-08). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

```text
tools/caja-deuda.mjs (2026-10-17): grossDebt escalón 0 (compuerta: ajuste manual): ajuste manual (2026-10-17): Claude 2026-10-17 (to-do 260 e, revisado contra el .md; préstamos de socios incluidos, decisión de Guido): consolidado: finanziari non correnti 7.754.380 + correnti 57 + altri finanziatori 6.528.747 + correnti verso parti correlate 650.000 (en miles: el ajuste se lee con la escala del documento, miles, y este balance imprime euros); cash escalón 0 (compuerta: ajuste manual): ajuste manual (2026-10-17): Claude 2026-10-17 (to-do 260 e, revisado contra el .md; préstamos de socios incluidos, decisión de Guido): "Disponibilità liquide e mezzi equivalenti" del balance CONSOLIDADO (PARTE II); el script leía el separado (en miles: el ajuste se lee con la escala del documento, miles, y este balance imprime euros)
```

### Liga

```text
2013: tools/cargar.mjs 2026-10-08, verificado contra roster cacheado de "2012–13 Serie A" (tools/club-league-reference/it.json), coincidencia e
```

## 2012

### Ingresos

```text
2012: cargado por tools/cargar.mjs (2026-10-08) desde Clubes/Italia/Lazio/Lazio-bilancio-separato-consolidato-2011-12.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Italia/Lazio/Lazio-bilancio-separato-consolidato-2011-12.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | ricavi da gare in casa | pág. 98, precedente |
| 2 | percentuali su incassi gare da squadra ospitanti | pág. 98, precedente |
| 3 | abbonamenti | pág. 98, precedente |
| 4 | -) televisivi | pág. 98, precedente |
| 5 | -) televisivi da partecipazioni comp. U.E.F.A. | pág. 98, precedente |
| 6 | -) da L.N.P. | pág. 98, precedente |
| 7 | Sponsorizzazioni | pág. 98, precedente |
| 8 | Proventi pubblicitari | pág. 98, precedente |
| 9 | Canoni per licenze, marchi, brevetti | pág. 98, precedente |
| 10 | Cessione temporanea calciatori | pág. 98, precedente |
| 11 | Plusvalenze da cessione dei diritti pluriennali alle prestazioni dei calciatori | pág. 98, precedente |
| 12 | Altri proventi da gestione calciatori | pág. 98, precedente |
| 13 | -) da transazioni con creditori (non ricorrenti) | pág. 98, precedente |
| 14 | -) da altri | pág. 98, precedente |
| 15 | Proventi vari | pág. 98, precedente |
| 16 | Variazione delle rimanenze | pág. 98, precedente |
| 17 | Ricavi da merchandising | pág. 98, precedente |

### Gastos

```text
tools/cargar.mjs (2026-10-08)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Materie prime,sussidiarie,di consumo e di merci | pág. 98, precedente |
| 2 | Salari e stipendi | pág. 98, precedente |
| 3 | Oneri sociali | pág. 98, precedente |
| 4 | Trattamento di fine rapporto | pág. 98, precedente |
| 5 | Altri costi | pág. 98, precedente |
| 6 | Costi per Acquisizione temporanea prestazioni calciatori | pág. 98, precedente |
| 7 | Altri oneri da gestione calciatori | pág. 98, precedente |
| 8 | Costi per tesserati | pág. 98, precedente |
| 9 | Costi specifici tecnici | pág. 98, precedente |
| 10 | Costi per vitto,alloggio e locomozione | pág. 98, precedente |
| 11 | Servizio biglietteria, controllo ingressi | pág. 98, precedente |
| 12 | Spese assicurative | pág. 98, precedente |
| 13 | Spese amministrative | pág. 98, precedente |
| 14 | Spese per pubblicità e promozione | pág. 98, precedente |
| 15 | Spese bancarie | pág. 98, precedente |
| 16 | Per godimento di beni di terzi | pág. 98, precedente |
| 17 | Spese varie organizzazione gare | pág. 98, precedente |
| 18 | Tassa iscrizioni gare | pág. 98, precedente |
| 19 | -) percentuale su incassi gare a squadra ospite | pág. 98, precedente |
| 20 | Altri oneri di gestione | pág. 98, precedente |
| 21 | Sopravvenienze passive (non ricorrenti) | pág. 98, precedente |
| 22 | Amm. delle immobilizzazioni immateriali | pág. 99, precedente |
| 23 | Amm. delle immobilizzazioni materiali | pág. 99, precedente |
| 24 | Svalutaz. Delle immobilizzazioni | pág. 99, precedente |
| 25 | Svalutaz. dei crediti dell'attivo circolante e dispon.liq. | pág. 99, precedente |
| 26 | Accantonamenti per rischi | pág. 99, precedente |

### Meta

```text
2012: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-08): fila = 0. Guido 2026-10-08 (documento viejo, a mano): las filas del estado se armaron desde el .md L3549-L3651 (la extracción no trajo las sub-filas) y sin las notas en miles; el total se contaba además de sus filas (to-do 167)
2012: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-08): fila = 0. Guido 2026-10-08 (documento viejo, a mano): las filas del estado se armaron desde el .md L3549-L3651 (la extracción no trajo las sub-filas) y sin las notas en miles; el total se contaba además de sus filas (to-do 167). Cierra: 95.509.291 − 96.230.839 − 2.741.427 + 7.684.529 = 4.221.554
tools/cargar.mjs (2026-10-08). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

```text
tools/caja-deuda.mjs (2026-10-17): cash escalón 0 (compuerta: ajuste manual): ajuste manual (2026-10-17): Claude 2026-10-17 (to-do 260 e, revisado contra el .md; préstamos de socios incluidos, decisión de Guido): "Disponibilità liquide e mezzi equivalenti" del balance CONSOLIDADO (PARTE II); el script leía el separado (en miles: el ajuste se lee con la escala del documento, miles, y este balance imprime euros)
```

```text
tools/caja-deuda.mjs (2026-10-17): grossDebt escalón 0 (compuerta: ajuste manual): ajuste manual (2026-10-17): Claude 2026-10-17 (leído en el balance por subagente Sonnet, criterio de deuda financiera con socios): Debiti finanziari non correnti 0 + Debiti finanziari correnti 0 + Debiti verso altri finanziatori 9.537.298 + parti correlate (collegate) 650.000. Consolidado. Cuadra con PFN: 10.187 miles. (valor en la escala del documento, miles: el ajuste se multiplica por ella)
```

### Liga

```text
2012: tools/cargar.mjs 2026-10-08, verificado contra roster cacheado de "2011–12 Serie A" (tools/club-league-reference/it.json), coincidencia e
```

## 2011

### Ingresos

```text
2011: cargado por tools/cargar.mjs (2026-10-08) desde Clubes/Italia/Lazio/Lazio-bilancio-separato-consolidato-2010-11.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Italia/Lazio/Lazio-bilancio-separato-consolidato-2010-11.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | ricavi da gare in casa | pág. 100, precedente |
| 2 | percentuali su incassi gare da squadra ospitanti | pág. 100, precedente |
| 3 | abbonamenti | pág. 100, precedente |
| 4 | -/- televisivi | pág. 100, precedente |
| 5 | -/- da L.N.P. | pág. 100, precedente |
| 6 | Sponsorizzazioni | pág. 100, precedente |
| 7 | Proventi pubblicitari | pág. 100, precedente |
| 8 | Canoni per licenze, marchi, brevetti | pág. 100, precedente |
| 9 | Cessione temporanea calciatori | pág. 100, precedente |
| 10 | Plusvalenze da cessione dei diritti pluriennali alle prestazioni dei calciatori | pág. 100, precedente |
| 11 | Altri proventi da gestione calciatori | pág. 100, precedente |
| 12 | -/- da transazioni con creditori (non ricorrenti) | pág. 100, precedente |
| 13 | -/- da altri | pág. 100, precedente |
| 14 | Proventi vari | pág. 100, precedente |
| 15 | Variazione delle rimanenze | pág. 100, precedente |
| 16 | Ricavi da merchandising | pág. 100, precedente |

### Gastos

```text
tools/cargar.mjs (2026-10-08)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Salari e stipendi | pág. 100, precedente |
| 2 | Oneri sociali | pág. 100, precedente |
| 3 | Trattamento di fine rapporto | pág. 100, precedente |
| 4 | Altri costi | pág. 100, precedente |
| 5 | Costi per tesserati | pág. 100, precedente |
| 6 | Costi specifici tecnici | pág. 100, precedente |
| 7 | Costi per vitto, alloggio e locomozione | pág. 100, precedente |
| 8 | Servizio biglietteria, controllo ingressi | pág. 100, precedente |
| 9 | Spese assicurative | pág. 100, precedente |
| 10 | Spese amministrative | pág. 100, precedente |
| 11 | Spese per pubblicità e promozione | pág. 100, precedente |
| 12 | Spese bancarie | pág. 100, precedente |
| 13 | Per godimento di beni di terzi | pág. 100, precedente |
| 14 | Spese varie organizzazione gare | pág. 100, precedente |
| 15 | Tassa iscrizioni gare | pág. 100, precedente |
| 16 | -/- percentuale su incassi gare a squadra ospite | pág. 100, precedente |
| 17 | Amm. delle immobilizzazioni immateriali | pág. 101, precedente |
| 18 | Amm. delle immobilizzazioni materiali | pág. 101, precedente |
| 19 | Svalutaz. Delle immobilizzazioni | pág. 101, precedente |
| 20 | Svalutaz. dei crediti dell'attivo circolante e dispon.liq. | pág. 101, precedente |
| 21 | Accantonamenti per rischi | pág. 101, precedente |
| 22 | Materie prime, sussidiarie, di consumo e di merci | pág. 100, precedente |
| 23 | Altri oneri da gestione calciatori | pág. 100, precedente |
| 24 | Altri oneri di gestione | pág. 100, precedente |
| 25 | Sopravvenienze passive (non ricorrenti) | pág. 100, precedente |

### Meta

```text
2011: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-08): fila = 1.648.840. Claude 2026-10-08 (Guido: to-do 179 grupo 1, a mano): fila de gastos que falta (columnas corridas en la pág. 100 del visor; cifra leída de la imagen del PDF)
2011: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-08): fila = 74.740. Claude 2026-10-08 (Guido: to-do 179 grupo 1, a mano): fila de gastos que falta (columnas corridas)
2011: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-08): fila = 597.555. Claude 2026-10-08 (Guido: to-do 179 grupo 1, a mano): fila de gastos que falta (columnas corridas)
2011: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-08): fila = 596.497. Claude 2026-10-08 (Guido: to-do 179 grupo 1, a mano): fila de gastos que falta (columnas corridas)
tools/cargar.mjs (2026-10-08). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

```text
tools/caja-deuda.mjs (2026-10-17): cash escalón 0 (compuerta: ajuste manual): ajuste manual (2026-10-17): Claude 2026-10-17 (to-do 260 e, revisado contra el .md; préstamos de socios incluidos, decisión de Guido): "Disponibilità liquide e mezzi equivalenti" del balance CONSOLIDADO (PARTE II); el script leía el separado (en miles: el ajuste se lee con la escala del documento, miles, y este balance imprime euros)
```

```text
tools/caja-deuda.mjs (2026-10-17): grossDebt escalón 0 (compuerta: ajuste manual): ajuste manual (2026-10-17): Claude 2026-10-17 (leído en el balance por subagente Sonnet, criterio de deuda financiera con socios): Debiti finanziari correnti 102 + Debiti verso altri finanziatori 13.283.670 + Debiti finanziari correnti verso parti correlate (collegate) 650.000. Consolidado (el primer balance del .md, pág. 25-26, es el separado). Sin deuda no corriente. Cuadra con PFN: 13.934 miles. (valor en la escala del documento, miles: el ajuste se multiplica por ella)
```

### Liga

```text
2011: tools/cargar.mjs 2026-10-08, verificado contra roster cacheado de "2010–11 Serie A" (tools/club-league-reference/it.json), coincidencia e
```

## 2010

### Ingresos

```text
2010: cargado por tools/cargar.mjs (2026-10-07) desde Clubes/Italia/Lazio/Lazio-bilancio-separato-consolidato-2009-10.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Italia/Lazio/Lazio-bilancio-separato-consolidato-2009-10.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | ricavi da gare in casa | pág. 96, Jev 1 |
| 2 | percentuali su incassi gare da squadre ospitanti | pág. 96, Jev 0.99 |
| 3 | abbonamenti | pág. 96, Jev 1 |
| 4 | -) televisivi | pág. 96, Jev 0.98 |
| 5 | -) percentuale diritti televisivi da squadre ospitanti | pág. 96, Jev 0.91 |
| 6 | -) televisivi da partecipazioni comp. U.E.F.A. | pág. 96, Claude 0.82 |
| 7 | -) da L.N.P. | pág. 96, precedente |
| 8 | Sponsorizzazioni | pág. 96, Jev 1 |
| 9 | Proventi pubblicitari | pág. 96, Jev 1 |
| 10 | Canoni per licenze, marchi, brevetti | pág. 96, Jev 0.9 |
| 11 | Cessione temporanea calciatori | pág. 96, Jev 1 |
| 12 | Plusvalenze da cessione dei diritti pluriennali alle prestazioni dei calciatori | pág. 96, Jev 1 |
| 13 | Altri proventi da gestione calciatori | pág. 96, precedente |
| 14 | -) da transazioni con creditori (non ricorrenti) | pág. 96, Jev 0.98 |
| 15 | -) da altri | pág. 96, Jev 0.98 |
| 16 | Proventi vari | pág. 96, Jev 0.97 |
| 17 | Variazione delle rimanenze | pág. 96, Jev 0.92 |
| 18 | Ricavi da merchandising | pág. 96, Jev 1 |

### Gastos

```text
tools/cargar.mjs (2026-10-07)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Materie prime, sussidiarie, di consumo e di merci | pág. 96, Jev 1 |
| 2 | Salari e stipendi | pág. 96, Jev 0.99 |
| 3 | Oneri sociali | pág. 96, Jev 0.91 |
| 4 | Trattamento di fine rapporto | pág. 96, Claude 0.8 |
| 5 | Altri costi | pág. 96, Jev 1 |
| 6 | Costi per Acquisizione temporanea prestazioni calciatori | pág. 96, Jev 0.98 |
| 7 | Minusvalenze da cessione diritti alle prestazioni dei calciatori | pág. 96, Jev 0.94 |
| 8 | Altri oneri da gestione calciatori | pág. 96, Jev 0.95 |
| 9 | Costi per tesserati | pág. 96, precedente |
| 10 | Costi specifici tecnici | pág. 96, Jev 0.93 |
| 11 | Costi per vitto, alloggio e locomozione | pág. 96, Jev 1 |
| 12 | Servizio biglietteria, controllo ingressi | pág. 96, Jev 0.99 |
| 13 | Spese assicurative | pág. 96, Jev 0.98 |
| 14 | Spese amministrative | pág. 96, Jev 1 |
| 15 | Spese per pubblicità e promozione | pág. 96, Jev 1 |
| 16 | Spese bancarie | pág. 96, precedente |
| 17 | Per godimento di beni di terzi | pág. 96, Jev 0.99 |
| 18 | Spese varie organizzazione gare | pág. 96, Jev 1 |
| 19 | Tassa iscrizioni gare | pág. 96, Jev 1 |
| 20 | -) percentuale su incassi gare a squadra ospite | pág. 96, Jev 0.9 |
| 21 | -) percentuale su diritti televisivi a squadra ospite | pág. 96, precedente |
| 22 | Altri oneri di gestione | pág. 96, Jev 0.95 |
| 23 | Sopravvenienze passive (non ricorrenti) | pág. 96, Jev 1 |
| 24 | Amm. delle immobilizzazioni immateriali | pág. 96, precedente |
| 25 | Amm. delle immobilizzazioni materiali | pág. 96, Jev 1 |
| 26 | Svalutaz. dei crediti dell'attivo circolante e dispon.liq. | pág. 96, Jev 1 |
| 27 | Accantonamenti per rischi | pág. 96, Claude 0.8 |

### Meta

```text
tools/cargar.mjs (2026-10-07). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

```text
tools/caja-deuda.mjs (2026-10-17): grossDebt escalón 0 (compuerta: ajuste manual): ajuste manual (2026-10-17): Claude 2026-10-17 (to-do 260 e, revisado contra el .md; préstamos de socios incluidos, decisión de Guido): consolidado: debiti finanziari correnti 51 + altri finanziatori 5.661.417; Jev mezclaba el separado y la tabla de deuda neta (en miles: el ajuste se lee con la escala del documento, miles, y este balance imprime euros); cash escalón 0 (compuerta: ajuste manual): ajuste manual (2026-10-17): Claude 2026-10-17 (to-do 260 e, revisado contra el .md; préstamos de socios incluidos, decisión de Guido): "Disponibilità liquide e mezzi equivalenti" del balance CONSOLIDADO (PARTE II); el script leía el separado (en miles: el ajuste se lee con la escala del documento, miles, y este balance imprime euros)
```

### Liga

```text
2010: tools/cargar.mjs 2026-10-07, verificado contra roster cacheado de "2009–10 Serie A" (tools/club-league-reference/it.json), coincidencia e
```

## 2009

### Ingresos

```text
2009: cargado por tools/cargar.mjs (2026-10-07) desde Clubes/Italia/Lazio/Lazio-bilancio-separato-consolidato-2008-09.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Italia/Lazio/Lazio-bilancio-separato-consolidato-2008-09.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | ricavi da gare in casa | pág. 90, Jev 1 |
| 2 | percentuali su incassi gare da squdra ospitanti | pág. 90, Jev 0.98 |
| 3 | abbonamenti | pág. 90, Jev 1 |
| 4 | -) televisivi | pág. 90, Jev 0.98 |
| 5 | -) percentuale diritti televisivi da squadre ospitanti | pág. 90, Jev 0.91 |
| 6 | -) da L.N.P. | pág. 90, precedente |
| 7 | Sponsorizzazioni | pág. 90, Jev 1 |
| 8 | Proventi pubblicitari | pág. 90, Jev 1 |
| 9 | Canoni per licenze, marchi, brevetti | pág. 90, Jev 0.9 |
| 10 | Cessione temporanea calciatori | pág. 90, Jev 1 |
| 11 | Plusvalenze da cessione dei diritti pluriennali alle prestazioni dei calciatori | pág. 90, Jev 1 |
| 12 | Altri proventi da gestione calciatori | pág. 90, precedente |
| 13 | -) da transazioni con creditori (non ricorrenti) | pág. 90, Jev 0.98 |
| 14 | -) da altri | pág. 90, Jev 0.98 |
| 15 | Proventi vari | pág. 90, Jev 0.97 |
| 16 | Variazione delle rimanenze | pág. 90, Jev 0.92 |
| 17 | Ricavi da merchandising | pág. 90, Jev 1 |

### Gastos

```text
tools/cargar.mjs (2026-10-07)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Materie prime,sussidiarie,di consumo e di merci | pág. 90, Jev 1 |
| 2 | Salari e stipendi | pág. 90, Jev 0.99 |
| 3 | Oneri sociali | pág. 90, Jev 0.91 |
| 4 | Trattamento di fine rapporto | pág. 90, Claude 0.8 |
| 5 | Altri costi | pág. 90, Jev 1 |
| 6 | Costi per Acquisizione temporanea prestazioni calciatori | pág. 90, Jev 0.98 |
| 7 | Minusvalenze da cessione diritti alle prestazioni dei calciatori | pág. 90, Jev 0.94 |
| 8 | Altri oneri da gestione calciatori | pág. 90, Jev 0.95 |
| 9 | Costi per tesserati | pág. 90, precedente |
| 10 | Costi per attività sportiva | pág. 90, precedente |
| 11 | Costi specifici tecnici | pág. 90, Jev 0.93 |
| 12 | Costi per vitto,alloggio e locomozione | pág. 90, Jev 1 |
| 13 | Servizio biglietteria, controllo ingressi | pág. 90, Jev 0.99 |
| 14 | Spese assicurative | pág. 90, Jev 0.98 |
| 15 | Spese amministrative | pág. 90, Jev 1 |
| 16 | Spese per pubblicità e promozione | pág. 90, Jev 1 |
| 17 | Spese bancarie | pág. 90, precedente |
| 18 | Per godimento di beni di terzi | pág. 90, Jev 0.99 |
| 19 | Spese varie organizzazione gare | pág. 90, Jev 1 |
| 20 | Tassa iscrizioni gare | pág. 90, Jev 1 |
| 21 | -) percentuale su incassi gare a squadra ospite | pág. 90, Jev 0.9 |
| 22 | -) percentuale su diritti televisivi a squadra ospite | pág. 90, precedente |
| 23 | Altri oneri di gestione | pág. 90, Jev 0.95 |
| 24 | Sopravvenienze passive (non ricorrenti) | pág. 90, Jev 1 |
| 25 | Amm. delle immobilizzazioni immateriali | pág. 90, precedente |
| 26 | Amm. delle immobilizzazioni materiali | pág. 90, Jev 1 |
| 27 | Svalutaz. dei crediti dell'attivo circolante e dispon.liq. | pág. 90, Jev 1 |
| 28 | Accantonamenti per rischi | pág. 90, Claude 0.8 |

### Meta

```text
tools/cargar.mjs (2026-10-07). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

```text
tools/caja-deuda.mjs (2026-10-17): cash escalón 0 (compuerta: ajuste manual): ajuste manual (2026-10-17): Claude 2026-10-17 (to-do 260 e, revisado contra el .md; préstamos de socios incluidos, decisión de Guido): "Disponibilità liquide e mezzi equivalenti" del balance CONSOLIDADO (PARTE II); el script leía el separado (en miles: el ajuste se lee con la escala del documento, miles, y este balance imprime euros)
```

```text
tools/caja-deuda.mjs (2026-10-17): grossDebt escalón 0 (compuerta: ajuste manual): ajuste manual (2026-10-17): Claude 2026-10-17 (leído en el balance por subagente Sonnet, criterio de deuda financiera con socios): Debiti finanziari non correnti 0 + Debiti finanziari correnti 1.226.399 + Debiti verso altri finanziatori 10.691.736. Cuadra con 'I. Debiti finanziari correnti' de la PFN (11.918 miles). (valor en la escala del documento, miles: el ajuste se multiplica por ella)
```

### Liga

```text
2009: tools/cargar.mjs 2026-10-07, verificado contra roster cacheado de "2008–09 Serie A" (tools/club-league-reference/it.json), coincidencia e
```

## 2008

### Ingresos

```text
2008: cargado por tools/cargar.mjs (2026-10-08) desde Clubes/Italia/Lazio/Lazio-bilancio-separato-consolidato-2007-08.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Italia/Lazio/Lazio-bilancio-separato-consolidato-2007-08.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | ricavi da gare in casa | pág. 94, precedente |
| 2 | percentuali su incassi gare da squdra ospitanti | pág. 94, Jev 0.98 |
| 3 | abbonamenti | pág. 94, precedente |
| 4 | -) televisivi | pág. 94, Jev 0.98 |
| 5 | -) percentuale diritti televisivi da squadre ospitanti | pág. 94, Jev 0.91 |
| 6 | -) televisivi da partecipazioni comp. U.E.F.A. | pág. 94, Claude 0.92 |
| 7 | -) da L.N.P. | pág. 94, Claude 0.95 |
| 8 | Sponsorizzazioni | pág. 94, precedente |
| 9 | Proventi pubblicitari | pág. 94, precedente |
| 10 | Canoni per licenze, marchi, brevetti | pág. 94, Jev 0.9 |
| 11 | Cessione temporanea calciatori | pág. 94, precedente |
| 12 | Plusvalenze da cessione dei diritti pluriennali alle prestazioni dei calciatori | pág. 94, precedente |
| 13 | Altri proventi da gestione calciatori | pág. 94, precedente |
| 14 | -) da transazioni con creditori (non ricorrenti) | pág. 94, Jev 0.98 |
| 15 | -) da altri | pág. 94, Jev 0.98 |
| 16 | Proventi vari | pág. 94, precedente |
| 17 | Variazione delle rimanenze | pág. 94, precedente |
| 18 | Incrementi di immobilizzazioni per lavori interni | pág. 94, Jev 1 |

### Gastos

```text
tools/cargar.mjs (2026-10-08)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Materie prime, sussidiarie, di consumo e di merci | pág. 94, precedente |
| 2 | Salari e stipendi | pág. 94, Jev 0.99 |
| 3 | Oneri sociali | pág. 94, Jev 0.91 |
| 4 | Trattamento di fine rapporto | pág. 94, Claude 0.93 |
| 5 | Altri costi | pág. 94, Jev 1 |
| 6 | Costi per Acquisizione temporanea prestazioni calciatori | pág. 94, Jev 0.98 |
| 7 | Altri oneri da gestione calciatori | pág. 94, precedente |
| 8 | Costi per tesserati | pág. 94, precedente |
| 9 | Costi specifici tecnici | pág. 94, precedente |
| 10 | Costi per vitto, alloggio e locomozione | pág. 94, Jev 1 |
| 11 | Servizio biglietteria, controllo ingressi | pág. 94, Jev 0.99 |
| 12 | Spese assicurative | pág. 94, precedente |
| 13 | Spese amministrative | pág. 94, precedente |
| 14 | Spese per pubblicità e promozione | pág. 94, precedente |
| 15 | Spese bancarie | pág. 94, precedente |
| 16 | Per godimento di beni di terzi | pág. 94, precedente |
| 17 | Spese varie organizzazione gare | pág. 94, precedente |
| 18 | Tassa iscrizioni gare | pág. 94, Jev 1 |
| 19 | -) percentuale su incassi gare a squadra ospite | pág. 94, Jev 0.9 |
| 20 | -) percentuale su diritti televisivi a squadra ospite | pág. 94, Claude 0.95 |
| 21 | Altri oneri di gestione | pág. 94, Jev 0.95 |
| 22 | Sopravvenienze passive (non ricorrenti) | pág. 94, Jev 1 |
| 23 | Amm. delle immobilizzazioni immateriali | pág. 94, Claude 0.9 |
| 24 | Amm. delle immobilizzazioni materiali | pág. 94, Jev 1 |
| 25 | Svalutaz. dei crediti dell'attivo circolante e dispon.liq. | pág. 94, Jev 1 |
| 26 | Accantonamenti per rischi | pág. 94, Claude 0.85 |
| 27 | Accantonamento altri fondi | pág. 94, Claude 0.8 |

### Meta

```text
2008: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-08): fila = 0. total sumado además de sus 18 hojas (doble conteo, to-do 167)
2008: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-08): fila = (4.224.030). el subtotal financiero (hojas en detalla_a) no se sumaba; 55.350 + 1.283.259 - 5.562.639 = -4.224.030
2008: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-08): fila = (12.443.793). el subtotal de impuestos no se sumaba; b) 13.687.035 + c) (26.130.829)
2008: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-08): fila = 0. Guido 2026-10-08 (documento viejo, a mano): el total se contaba además de sus filas (to-do 167); con el TOTALE RICAVI ya sacado y las notas en miles fuera del .filas.json cierra: 102.482.030 − 68.609.526 − 4.962.375 − 15.148.258 = 13.761.871 vs 13.761.874
tools/cargar.mjs (2026-10-08). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

```text
tools/caja-deuda.mjs (2026-10-17): grossDebt escalón 2 (compuerta: documento siguiente): "Debiti finanziari non correnti" pág. 92 + "Debiti finanziari correnti" pág. 92 + "*Debiti verso altri finanziatori*" pág. 92; cash escalón 0 (compuerta: ajuste manual): ajuste manual (2026-10-17): Claude 2026-10-17 (to-do 260 e, revisado contra el .md; préstamos de socios incluidos, decisión de Guido): "Disponibilità liquide e mezzi equivalenti" del balance CONSOLIDADO (PARTE II); el script leía el separado (en miles: el ajuste se lee con la escala del documento, miles, y este balance imprime euros)
```

### Liga

```text
2008: tools/cargar.mjs 2026-10-08, verificado contra roster cacheado de "2007–08 Serie A" (tools/club-league-reference/it.json), coincidencia e
```

## 2007

### Ingresos

```text
2007: cargado por tools/cargar.mjs (2026-10-07) desde Clubes/Italia/Lazio/Lazio-bilancio-separato-consolidato-2006-07.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Italia/Lazio/Lazio-bilancio-separato-consolidato-2006-07.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | ricavi da gare in casa | pág. 106, Jev 1 |
| 2 | percentuali su incassi gare da squadra ospitanti | pág. 106, Jev 0.99 |
| 3 | abbonamenti | pág. 106, Jev 1 |
| 4 | -/- televisivi | pág. 106, Jev 1 |
| 5 | -/- percentuale diritti televisivi da squadre ospitanti | pág. 106, Jev 0.92 |
| 6 | -/- da L.N.P. | pág. 106, Claude 0.8 |
| 7 | Sponsorizzazioni | pág. 106, Jev 1 |
| 8 | Proventi pubblicitari | pág. 106, Jev 1 |
| 9 | Canoni per licenze, marchi, brevetti | pág. 106, Jev 0.9 |
| 10 | Cessione temporanea calciatori | pág. 106, Jev 1 |
| 11 | Plusvalenze da cessione dei diritti pluriennali alle prestazioni dei calciatori | pág. 106, Jev 1 |
| 12 | Altri proventi da gestione calciatori | pág. 106, precedente |
| 13 | -/- da transazioni con creditori | pág. 106, Jev 0.96 |
| 14 | -/- da altri | pág. 106, Jev 0.97 |
| 15 | Proventi vari | pág. 106, Jev 0.97 |
| 16 | Variazione delle rimanenze | pág. 106, Jev 0.92 |

### Gastos

```text
tools/cargar.mjs (2026-10-07)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Materie prime, sussidiarie, di consumo e di merci | pág. 106, Jev 1 |
| 2 | Salari e stipendi | pág. 106, Jev 0.99 |
| 3 | Oneri sociali | pág. 106, Jev 0.91 |
| 4 | Trattamento di fine rapporto | pág. 106, Claude 0.8 |
| 5 | Altri costi | pág. 106, Jev 1 |
| 6 | Costi per Acquisizione temporanea prestazioni calciatori | pág. 106, Jev 0.98 |
| 7 | Minusvalenze da cessione diritti alle prestazioni dei calciatori | pág. 106, Jev 0.94 |
| 8 | Altri oneri da gestione calciatori | pág. 106, Jev 0.95 |
| 9 | Costi per tesserati | pág. 106, precedente |
| 10 | Costi per attività sportiva | pág. 106, precedente |
| 11 | Costi specifici tecnici | pág. 106, Jev 0.93 |
| 12 | Costi per vitto, alloggio e locomozione | pág. 106, Jev 1 |
| 13 | Servizio biglietteria, controllo ingressi | pág. 106, Jev 0.99 |
| 14 | Spese assicurative | pág. 106, Jev 0.98 |
| 15 | Spese amministrative | pág. 106, Jev 1 |
| 16 | Spese per pubblicità e promozione | pág. 106, Jev 1 |
| 17 | Spese bancarie | pág. 106, precedente |
| 18 | Per godimento di beni di terzi | pág. 106, Jev 0.99 |
| 19 | Spese varie organizzazione gare | pág. 106, Jev 1 |
| 20 | Tassa iscrizioni gare | pág. 106, Jev 1 |
| 21 | -/- percentuale su incassi gare a squadra ospite | pág. 106, Jev 0.94 |
| 22 | -/- percentuale su diritti televisivi a squadra ospite | pág. 106, precedente |
| 23 | Altri oneri di gestione | pág. 106, Jev 0.95 |
| 24 | Oneri straordinari | pág. 106, Jev 1 |
| 25 | Amm. delle immobilizzazioni immateriali | pág. 106, precedente |
| 26 | Amm. delle immobilizzazioni materiali | pág. 106, Jev 1 |
| 27 | Svalutaz. Delle immobilizzazioni | pág. 106, precedente |
| 28 | Svalutaz. dei crediti dell'attivo circolante e dispon. lig. | pág. 106, Jev 1 |
| 29 | Accantonamenti per rischi | pág. 106, Claude 0.8 |

### Meta

```text
tools/cargar.mjs (2026-10-07). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

```text
tools/caja-deuda.mjs (2026-10-17): grossDebt escalón 0 (compuerta: ajuste manual): ajuste manual (2026-10-17): Claude 2026-10-17 (leído en el balance por subagente Sonnet, criterio de deuda financiera con socios): Debiti finanziari non correnti 0 + Debiti finanziari correnti 3.551.152 + Debiti verso altri finanziatori (41.1) 654.530. Consolidado. Verso settore specifico, previdenza y comerciales excluidos.; cash escalón 0 (compuerta: ajuste manual): ajuste manual (2026-10-17): Claude 2026-10-17 (leído en el balance por subagente Sonnet, criterio de deuda financiera con socios): Disponibilità liquide e mezzi equivalenti 3.316.854 (depositi 3.185.650 + assegni 101.125 + cassa 30.079). Balance consolidado PARTE II, 30/06/2007.
```

### Liga

```text
2007: verificado 2026-10-09 contra roster cacheado de "2006–07 Serie A" (tools/club-league-reference/it.json), "Lazio"
```

## 2006

### Ingresos

```text
2006: cargado por tools/cargar.mjs (2026-10-08) desde Clubes/Italia/Lazio/Lazio-progetto-bilancio-2005-06-mirror-sslaziofans.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Italia/Lazio/Lazio-progetto-bilancio-2005-06-mirror-sslaziofans.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | a) ricavi da gare in casa | pág. 26, precedente |
| 2 | b) percentuali su incassi gare da squadre ospitanti | pág. 26, precedente |
| 3 | c) abbonamenti | pág. 26, precedente |
| 4 | 2 Variazione delle rimanenze prodotti finiti | pág. 26, precedente |
| 5 | 4 Incrementi di immobilizzat. per lavori interni | pág. 26, precedente |
| 6 | b) Sponsorizzazioni | pág. 26, precedente |
| 7 | c) Proventi pubblicitari | pág. 26, precedente |
| 8 | d) Canoni per licenze, marchi, brevetti | pág. 26, precedente |
| 9 | e.1) televisivi | pág. 26, Jev 1 |
| 10 | e.2) percentuale diritti televisivi da squadre ospitanti | pág. 26, Jev 1 |
| 11 | e.3) televisivi da partecipazioni comp. U.E.F.A. | pág. 26, Jev 0.97 |
| 12 | e.4) da L.N.P. | pág. 26, Claude 0.95 |
| 13 | f) Proventi vari | pág. 26, precedente |
| 14 | l) Altri ricavi e proventi | pág. 26, precedente |
| 15 | a) plusvalenze da alienazioni | pág. 27, precedente |
| 16 | b) sopravvenienze attive straordinarie | pág. 27, Jev 1 |

### Gastos

```text
tools/cargar.mjs (2026-10-08)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | 6 Per materie prime, sussidiarie, di consumo e di merci | pág. 26, precedente |
| 2 | a) Costi per tesserati | pág. 26, precedente |
| 3 | b) Costi per attività sportiva | pág. 26, precedente |
| 4 | c) Costi specifici tecnici | pág. 26, precedente |
| 5 | d) Costi per vitto, alloggio e locomozione | pág. 26, precedente |
| 6 | e) Servizio biglietteria, controllo ingressi | pág. 26, precedente |
| 7 | f) Spese assicurative | pág. 26, precedente |
| 8 | g) Spese amministrative | pág. 26, precedente |
| 9 | h) Spese per pubblicità e promozione | pág. 26, precedente |
| 10 | 8 Per godimento di beni di terzi | pág. 26, precedente |
| 11 | a) Salari e stipendi | pág. 26, precedente |
| 12 | b) Oneri sociali | pág. 26, precedente |
| 13 | c) Trattamento di fine rapporto | pág. 26, precedente |
| 14 | e) Altri costi | pág. 26, precedente |
| 15 | a) Amm. delle immobilizzazioni immateriali | pág. 26, precedente |
| 16 | a.1) Amm. Oneri pluriennali ex DL 282 | pág. 26, precedente |
| 17 | b) Amm. delle immobilizzazioni materiali | pág. 26, precedente |
| 18 | c) Svalutaz. Delle immobilizzazioni | pág. 26, precedente |
| 19 | d) Svalutaz. dei crediti dell'attivo circolante e dispon.liq. | pág. 26, precedente |
| 20 | 12 Accantonamenti per rischi | pág. 26, precedente |
| 21 | a) Spese varie organizzazione gare | pág. 26, precedente |
| 22 | b) Tassa iscrizioni gare | pág. 26, precedente |
| 23 | c.1) percentuale su incassi gare a squadra ospite | pág. 26, Jev 0.97 |
| 24 | c.2) percentuale su diritti televisivi a squadra ospite | pág. 26, Jev 0.99 |
| 25 | d) Costi per acquisizione temporanea prestazioni calciatori | pág. 26, precedente |
| 26 | e) Minusvalenze da cessione diritti alle prestazioni dei calciatori | pág. 26, precedente |
| 27 | f) Altri oneri da gestione calciatori | pág. 26, precedente |
| 28 | g) Altri oneri di gestione | pág. 26, precedente |
| 29 | a) di partecipazioni | pág. 27, precedente |
| 30 | c) sopravvenienze passive straordinarie | pág. 27, Jev 1 |
| 31 | d) altri oneri straordinari | pág. 27, precedente |

### Meta

```text
tools/cargar.mjs (2026-10-08). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

```text
tools/caja-deuda.mjs (2026-10-17): grossDebt escalón 1 (compuerta: documento anterior): "4) Debiti verso banche" pág. 24; cash escalón 1b (compuerta: documento anterior): "Totale disponibilità liquide" pág. 23
```

### Liga

```text
2006: tools/cargar.mjs 2026-10-08, verificado contra roster cacheado de "2005–06 Serie A" (tools/club-league-reference/it.json), coincidencia e
```

## 2005

### Ingresos

```text
2005: cargado por tools/cargar.mjs (2026-10-08) desde Clubes/Italia/Lazio/Lazio-bilancio-2004-05.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Italia/Lazio/Lazio-bilancio-2004-05.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | 1 Ricavi delle vendite e delle prestazioni | pág. 28, precedente |
| 2 | 2 Variazione delle rimanenze prodotti finiti | pág. 28, Jev 0.99 |
| 3 | 4 Incrementi di immobilizzaz. per lavori interni | pág. 28, precedente |
| 4 | b) Canoni per licenze, marchi, brevetti | pág. 28, precedente |
| 5 | c) Sponsorizzazione | pág. 28, precedente |
| 6 | d) Diritti televisivi e d'immagine | pág. 28, precedente |
| 7 | e) Proventi pubblicitari | pág. 28, precedente |
| 8 | g) Altri ricavi e proventi | pág. 28, precedente |
| 9 | a) plusvalenze da alienazioni | pág. 29, precedente |
| 10 | b) altri proventi straordinari | pág. 29, precedente |

### Gastos

```text
tools/cargar.mjs (2026-10-08)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | 6 Per materie prime, sussidiarie, di consumo e di merci | pág. 28, precedente |
| 2 | a) Costi per attività sportiva | pág. 28, precedente |
| 3 | b) Costi specifici tecnici | pág. 28, precedente |
| 4 | c) Costi per vitto, alloggio e locomozione | pág. 28, precedente |
| 5 | d) Spese assicurative | pág. 28, precedente |
| 6 | e) Spese amministrative | pág. 28, precedente |
| 7 | f) Spese per pubblicità e promozione | pág. 28, precedente |
| 8 | 8 Per godimento di beni di terzi | pág. 28, precedente |
| 9 | a) Salari e stipendi | pág. 28, precedente |
| 10 | b) Oneri sociali | pág. 28, precedente |
| 11 | c) Trattamento di fine rapporto | pág. 28, precedente |
| 12 | e) Altri costi | pág. 28, precedente |
| 13 | a) Amm. delle immobilizzazioni immateriali | pág. 28, precedente |
| 14 | a.1) Amm. Oneri pluriennali ex DL 282 | pág. 28, precedente |
| 15 | b) Amm. delle immobilizzazioni materiali | pág. 28, precedente |
| 16 | c) Svalutaz. Delle immobilizzazioni | pág. 28, precedente |
| 17 | d) Svalutaz. dei crediti dell'attivo circolante e dispon.liq. | pág. 28, precedente |
| 18 | 12 Accantonamenti per rischi | pág. 28, precedente |
| 19 | a) Oneri tributari indiretti | pág. 28, precedente |
| 20 | c) Oneri su incassi | pág. 28, precedente |
| 21 | a) di partecipazioni | pág. 29, precedente |
| 22 | a) minusvalenze da alienazioni | pág. 29, precedente |
| 23 | b) altri oneri straordinari | pág. 29, precedente |

### Meta

```text
2005: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-08): fila = 5.462. Claude 2026-10-08 (Guido: to-do 179 grupo 1, a mano): subtotal 17-bis sin hojas que la extracción no cuenta; el impreso cierra con él
tools/cargar.mjs (2026-10-08). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

```text
tools/caja-deuda.mjs (2026-10-17): grossDebt escalón 0 (compuerta: ajuste manual): ajuste manual (2026-10-17): Claude 2026-10-17 (to-do 260 e, revisado contra el .md; préstamos de socios incluidos, decisión de Guido): soci per finanziamento 38.479.303 + banche 8.231.670 + altri finanziatori 1.056.443; el script tomaba solo banche; cash escalón 1b (compuerta: documento siguiente): "Totale disponibilità liquide" pág. 25
```

### Liga

```text
2005: tools/cargar.mjs 2026-10-08, verificado contra roster cacheado de "2004–05 Serie A" (tools/club-league-reference/it.json), coincidencia e
```

## 2004

### Ingresos

```text
2004: cargado por tools/cargar.mjs (2026-10-09) desde Clubes/Italia/Lazio/Lazio-bilancio-2003-04.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Italia/Lazio/Lazio-bilancio-2003-04.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | 1 Ricavi delle vendite e delle prestazioni | pág. 41, precedente |
| 2 | 2 Variazione delle rimanenze prodotti finiti | pág. 41, precedente |
| 3 | 4 Incrementi di immobilizzaz. per lavori interni | pág. 41, precedente |
| 4 | a) Cessione temporanea calciatori | pág. 41, precedente |
| 5 | b) Canoni per licenze, marchi, brevetti | pág. 41, precedente |
| 6 | c) Sponsorizzazione | pág. 41, precedente |
| 7 | d) Diritti televisivi e d'immagine | pág. 41, precedente |
| 8 | e) Proventi pubblicitari | pág. 41, precedente |
| 9 | g) Altri ricavi e proventi | pág. 41, precedente |
| 10 | a) plusvalenze da alienazioni | pág. 42, precedente |
| 11 | b) altri proventi straordinari | pág. 42, precedente |

### Gastos

```text
tools/cargar.mjs (2026-10-09)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | 6 Per materie prime, sussidiarie, di consumo e di merci | pág. 41, precedente |
| 2 | a) Costi per attività sportiva | pág. 41, precedente |
| 3 | b) Costi specifici tecnici | pág. 41, precedente |
| 4 | c) Costi per vitto, alloggio e locomozione | pág. 41, precedente |
| 5 | d) Spese assicurative | pág. 41, precedente |
| 6 | e) Spese amministrative | pág. 41, precedente |
| 7 | f ) Spese per pubblicità e promozione | pág. 41, Jev 1 |
| 8 | 8 Per godimento di beni di terzi | pág. 41, precedente |
| 9 | a) Salari e stipendi | pág. 41, precedente |
| 10 | b) Oneri sociali | pág. 41, precedente |
| 11 | c) Trattamento di fine rapporto | pág. 41, precedente |
| 12 | e) Altri costi | pág. 41, precedente |
| 13 | a) Amm. delle immobilizzazioni immateriali | pág. 41, precedente |
| 14 | a.1) Amm. Oneri pluriennali ex DL 282 | pág. 41, precedente |
| 15 | b) Amm. delle immobilizzazioni materiali | pág. 41, precedente |
| 16 | c) Svalutaz. Delle immobilizzazioni | pág. 41, precedente |
| 17 | d) Svalutaz. dei crediti dell'attivo circolante e dispon.liq. | pág. 41, precedente |
| 18 | 12 Accantonamenti per rischi | pág. 41, precedente |
| 19 | 13 Altri accantonamenti | pág. 41, Claude 0.88 |
| 20 | a) Oneri tributari indiretti | pág. 41, precedente |
| 21 | b) Perdite su cambi | pág. 41, precedente |
| 22 | c) Oneri su incassi | pág. 41, precedente |
| 23 | a) minusvalenze da alienazioni | pág. 42, precedente |
| 24 | b) altri oneri straordinari | pág. 42, precedente |
| 25 | a) di partecipazioni | pág. 42, precedente |

### Meta

```text
tools/cargar.mjs (2026-10-09). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

```text
tools/caja-deuda.mjs (2026-10-17): cash escalón 1b (compuerta: documento siguiente): "Totale disponibilità liquide" pág. 38
```

```text
tools/caja-deuda.mjs (2026-10-17): grossDebt escalón 0 (compuerta: ajuste manual): ajuste manual (2026-10-17): Claude 2026-10-17 (leído en el balance por subagente Sonnet, criterio de deuda financiera con socios): Debiti verso banche entro l'anno 20.716.041 + Debiti verso altri finanziatori 48.695.156 (incluye debiti postergati ex Gruppo Cirio 38.479.000). El .md no trae consolidado (la sociedad declara que no lo redactó, línea 1297); individual. Posición financiera de la relazione: 38,48 M LP + 31,00 M CP = 69,48 M (incluye 0,06 de correlacionadas).
```

### Liga

```text
2004: tools/cargar.mjs 2026-10-09, verificado contra roster cacheado de "2003–04 Serie A" (tools/club-league-reference/it.json), coincidencia e
```

## 2001

### Ingresos

```text
2001: cargado por tools/cargar.mjs (2026-10-08) desde Clubes/Italia/Lazio/Lazio-bilancio-2000-01.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Italia/Lazio/Lazio-bilancio-2000-01.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | 1 Ricavi delle vendite e delle prestazioni | pág. 52, precedente |
| 2 | 2 Variazione delle rimanenze | pág. 52, precedente |
| 3 | 4 Incrementi di immobilizzazioni per lavori interni | pág. 52, precedente |
| 4 | a) Cessione temporanea calciatori | pág. 52, precedente |
| 5 | b) Canoni per licenze, marchi, brevetti | pág. 52, precedente |
| 6 | c) Sponsorizzazione | pág. 52, precedente |
| 7 | d) Diritti televisivi e d'immagine | pág. 52, Jev 1 |
| 8 | e) Proventi pubblicitari | pág. 52, precedente |
| 9 | f) Contributi in c/esercizio | pág. 52, precedente |
| 10 | g) Altri ricavi e proventi | pág. 52, Jev 0.99 |
| 11 | a) plusvalenze da alienazioni | pág. 54, Jev 0.98 |
| 12 | b) altri proventi straordinari | pág. 54, Jev 1 |

### Gastos

```text
tools/cargar.mjs (2026-10-08)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | 6 Per materie prime, sussidiarie, di consumo e di merci | pág. 52, Jev 1 |
| 2 | a) Costi per attività sportiva | pág. 52, precedente |
| 3 | b) Costi specifici tecnici | pág. 52, precedente |
| 4 | c) Costi per vitto, alloggio e locomozione | pág. 52, precedente |
| 5 | d) Spese assicurative | pág. 52, precedente |
| 6 | e) Spese amministrative | pág. 52, precedente |
| 7 | f) Spese per pubblicità e promozione | pág. 52, precedente |
| 8 | 8 Per godimento di beni di terzi | pág. 53, precedente |
| 9 | a) Salari e stipendi | pág. 53, precedente |
| 10 | b) Oneri sociali | pág. 53, precedente |
| 11 | c) Trattamento di fine rapporto | pág. 53, precedente |
| 12 | e) Altri costi | pág. 53, precedente |
| 13 | a) Amm. delle immobilizzazioni immateriali | pág. 53, precedente |
| 14 | b) Amm. delle immobilizzazioni materiali | pág. 53, precedente |
| 15 | d) Svalutaz. dei crediti dell'attivo circolante e dispon.liq. | pág. 53, precedente |
| 16 | 12 Accantonamenti per rischi | pág. 53, Jev 0.96 |
| 17 | a) Oneri tributari indiretti | pág. 53, precedente |
| 18 | b) Perdite su cambi | pág. 53, precedente |
| 19 | c) Oneri su incassi | pág. 53, precedente |
| 20 | a) minusvalenze da alienazioni | pág. 54, Jev 0.95 |
| 21 | b) altri oneri straordinari | pág. 54, Jev 0.99 |

### Meta

```text
2001: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-08): moneda = ITL. Guido 2026-10-08: dejarlo en liras; el documento reporta en millones de liras (ejercicio anterior a 2002) y el sitio lo carga en ITL con su tipo de cambio de cierre (paridad fija 1.936,27 por el EUR/USD del BCE)
2001: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-08): perimetro = individual. Claude 2026-10-08 (Guido: liras de Lazio): el documento solo trae el bilancio d'esercizio de la S.S. Lazio S.p.A. (la revisión es del bilancio d'esercizio; no hay consolidado en el .md): individual, aunque el club se carga consolidado desde 2006
tools/cargar.mjs (2026-10-08). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

```text
tools/caja-deuda.mjs (2026-10-17): grossDebt escalón 0 (compuerta: ajuste manual): ajuste manual (2026-10-17): Claude 2026-10-17 (leído en el balance por subagente Sonnet, criterio de deuda financiera con socios): Debiti verso banche 89.688.799.328 + Debiti verso altri finanziatori 190.070.485.012. Tabla en lire. Verso consociate 69.877.082 y collegate 176.200.570 excluidos.; cash escalón 0 (compuerta: ajuste manual): ajuste manual (2026-10-17): Claude 2026-10-17 (leído en el balance por subagente Sonnet, criterio de deuda financiera con socios): Totale disponibilità liquide 988.251.670 (depositi 621.071.174 + cassa 367.180.496). Tabla en lire; la misma hoja en euro da 510.389 miles.
```

### Liga

```text
2001: verificado 2026-10-09 contra roster cacheado de "2000–01 Serie A" (tools/club-league-reference/it.json), "Lazio"
```

## 2000

### Ingresos

```text
2000: cargado por tools/cargar.mjs (2026-10-08) desde Clubes/Italia/Lazio/Lazio-bilancio-1999-00.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Italia/Lazio/Lazio-bilancio-1999-00.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | 1 Ricavi delle vendite e delle prestazioni | pág. 48, precedente |
| 2 | 2 Variazione delle rimanenze | pág. 48, precedente |
| 3 | 4 Incrementi di immobilizzaz. per lavori interni | pág. 48, Jev 1 |
| 4 | a) Cessione temporanea calciatori | pág. 48, precedente |
| 5 | b) Canoni per licenze, marchi, brevetti | pág. 48, precedente |
| 6 | c) Sponsorizzazione | pág. 48, precedente |
| 7 | d) Diritti televisivi e d'immagine | pág. 48, Jev 1 |
| 8 | e) Proventi pubblicitari | pág. 48, precedente |
| 9 | f) Contributi in c/esercizio | pág. 48, precedente |
| 10 | g) Altri ricavi e proventi | pág. 48, Jev 0.99 |
| 11 | a) plusvalenze da alienazioni | pág. 50, Jev 0.98 |
| 12 | b) altri proventi straordinari | pág. 50, Jev 1 |

### Gastos

```text
tools/cargar.mjs (2026-10-08)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | 6 Per materie prime, sussidiarie, di consumo e di merci | pág. 48, Jev 1 |
| 2 | a) Costi per attività sportiva | pág. 48, precedente |
| 3 | b) Costi specifici tecnici | pág. 48, precedente |
| 4 | c) Costi per vitto, alloggio e locomozione | pág. 48, precedente |
| 5 | d) Spese assicurative | pág. 48, precedente |
| 6 | e) Spese amministrative | pág. 48, precedente |
| 7 | f) Spese per pubblicità e promozione | pág. 48, precedente |
| 8 | 8 Per godimento di beni di terzi | pág. 49, precedente |
| 9 | a) Salari e stipendi | pág. 49, precedente |
| 10 | b) Oneri sociali | pág. 49, precedente |
| 11 | c) Trattamento di fine rapporto | pág. 49, precedente |
| 12 | e) Altri costi | pág. 49, precedente |
| 13 | a) Amm. delle immobilizzazioni immateriali | pág. 49, precedente |
| 14 | b) Amm. delle immobilizzazioni materiali | pág. 49, precedente |
| 15 | d) Svalutaz. dei crediti dell'attivo circolante e dispon.liq. | pág. 49, precedente |
| 16 | 12 Accantonamenti per rischi | pág. 49, Jev 0.96 |
| 17 | a) Oneri tributari indiretti | pág. 49, precedente |
| 18 | c) Oneri su incassi | pág. 49, precedente |
| 19 | a) minusvalenze da alienazioni | pág. 50, Jev 0.95 |
| 20 | b) altri oneri straordinari | pág. 50, Jev 0.99 |

### Meta

```text
2000: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-08): moneda = ITL. Guido 2026-10-08: dejarlo en liras; el documento reporta en millones de liras (ejercicio anterior a 2002) y el sitio lo carga en ITL con su tipo de cambio de cierre (paridad fija 1.936,27 por el EUR/USD del BCE)
2000: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-08): anio = 2000. Claude 2026-10-08 (Guido: liras de Lazio): el ejercicio 1999-00 cierra el 30/6/2000 (el estado dice 30/06/2000 Lire); el nombre del archivo hacía que el sitio lo tomara como 1999, el mismo año del ejercicio 1998-99
2000: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-08): cierre = 2000-06-30. Claude 2026-10-08 (Guido: liras de Lazio): el estado dice 30/06/2000 (Lire) y el 30/06/1999 de comparativo; es el ejercicio 1999-00, que cierra el 30/6/2000
2000: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-08): perimetro = individual. Claude 2026-10-08 (Guido: liras de Lazio): el documento solo trae el bilancio d'esercizio de la S.S. Lazio S.p.A. (la revisión es del bilancio d'esercizio; no hay consolidado en el .md): individual, aunque el club se carga consolidado desde 2006
tools/cargar.mjs (2026-10-08). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

```text
tools/caja-deuda.mjs (2026-10-17): cash escalón 0 (compuerta: ajuste manual): ajuste manual (2026-10-17): Claude 2026-10-17 (to-do 260 e, revisado contra el .md; préstamos de socios incluidos, decisión de Guido): "Totale disponibilità liquide" del balance en liras (individual); el script leía la tabla de conversión a euros
```

```text
tools/caja-deuda.mjs (2026-10-17): grossDebt escalón 0 (compuerta: ajuste manual): ajuste manual (2026-10-17): Claude 2026-10-17 (leído en el balance por subagente Sonnet, criterio de deuda financiera con socios): Debiti verso banche entro l'anno 185.408.526.980 + Debiti verso altri finanziatori 197.656.449.687. Individual en lire, 30/06/2000 (primer columna). Verso consociate 22.014.464.575 excluido (Lazio Finance).
```

### Liga

```text
2000: verificado 2026-10-09 contra roster cacheado de "1999–2000 Serie A" (tools/club-league-reference/it.json), "Lazio"
```

## 1999

### Ingresos

```text
1999: cargado por tools/cargar.mjs (2026-10-08) desde Clubes/Italia/Lazio/Lazio-bilancio-1998-99.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Italia/Lazio/Lazio-bilancio-1998-99.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Ricavi delle vendite e delle prestazioni | pág. 34, precedente |
| 2 | Incrementi immobilizz. per lavori interni | pág. 34, Jev 1 |
| 3 | Cessione temporanea calciatori | pág. 34, precedente |
| 4 | Canoni per licenze, marchi, brevetti | pág. 34, precedente |
| 5 | Sponsorizzazione | pág. 34, precedente |
| 6 | Diritti televisivi e d'immagine | pág. 34, Jev 1 |
| 7 | Proventi pubblicitari | pág. 34, precedente |
| 8 | Contributi in c/esercizio | pág. 34, precedente |
| 9 | Altri ricavi e proventi | pág. 34, Jev 0.99 |
| 10 | a) Plusvalenze da alienazioni | pág. 37, Jev 0.98 |
| 11 | b) Altri proventi straordinari | pág. 37, Jev 1 |

### Gastos

```text
tools/cargar.mjs (2026-10-08)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Acquisti di mat. prime,suss.,cons.,merci | pág. 34, Jev 0.99 |
| 2 | Costi per attività sportiva | pág. 34, precedente |
| 3 | Costi specifici tecnici | pág. 34, precedente |
| 4 | Costi per vitto,alloggio e locomozione | pág. 34, precedente |
| 5 | Spese assicurative | pág. 34, precedente |
| 6 | Spese amministrative | pág. 34, precedente |
| 7 | Spese per pubblicità e promozione | pág. 34, precedente |
| 8 | 8) Godimento beni di terzi | pág. 35, Jev 0.99 |
| 9 | a) Salari e stipendi | pág. 35, precedente |
| 10 | b) Oneri sociali | pág. 35, precedente |
| 11 | c) Trattamento fine rapporto | pág. 35, Jev 0.99 |
| 12 | e) Altri costi | pág. 35, precedente |
| 13 | a) Amm. Immobilizzazioni immateriali | pág. 35, Jev 0.99 |
| 14 | b) Amm. Immobilizzazioni Materiali | pág. 35, Jev 1 |
| 15 | Accantonamenti per rischi | pág. 35, precedente |
| 16 | a) Oneri tributari indiretti | pág. 35, precedente |
| 17 | b) Perdite su cambi | pág. 35, precedente |
| 18 | c) Oneri su incassi | pág. 35, precedente |
| 19 | a) Minusvalenze da alienazioni | pág. 37, Jev 0.95 |
| 20 | b) Altri oneri straordinari | pág. 37, Jev 0.99 |

### Meta

```text
1999: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-08): moneda = ITL. Guido 2026-10-08: dejarlo en liras; el documento reporta en millones de liras (ejercicio anterior a 2002) y el sitio lo carga en ITL con su tipo de cambio de cierre (paridad fija 1.936,27 por el EUR/USD del BCE)
1999: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-08): perimetro = individual. Claude 2026-10-08 (Guido: liras de Lazio): el documento solo trae el bilancio d'esercizio de la S.S. Lazio S.p.A. (la revisión es del bilancio d'esercizio; no hay consolidado en el .md): individual, aunque el club se carga consolidado desde 2006
tools/cargar.mjs (2026-10-08). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

```text
tools/caja-deuda.mjs (2026-10-17): grossDebt escalón 0 (compuerta: ajuste manual): ajuste manual (2026-10-17): Claude 2026-10-17 (leído en el balance por subagente Sonnet, criterio de deuda financiera con socios): Verso banche entro l'anno 113.085.688.116 + oltre l'anno 0 + Debiti verso altri finanziatori 9.434.655.978. Se excluye 'Verso società consociate' 37.454.080.662 (Lazio Finance, cesión de abonos) por el criterio de consociate; si se lo considerara financiero la deuda sería 159.974.424.756.; cash escalón 0 (compuerta: ajuste manual): ajuste manual (2026-10-17): Claude 2026-10-17 (leído en el balance por subagente Sonnet, criterio de deuda financiera con socios): Totale disponibilità liquide 11.725.696.826 (depositi 11.691.457.921 + cassa 34.238.905). Bilancio individuale en lire, 30/06/1999.
```

### Liga

```text
1999: verificado 2026-10-09 contra roster cacheado de "1998–99 Serie A" (tools/club-league-reference/it.json), "Lazio"
```

## Gestiones

_antes de Sergio Cragnotti (data/gestiones/it.js):_

```text
Cragnotti: dueño de la Lazio entre 1992 y 2003; presidente desde el 12/3/1992 y, en su segundo mandato, de 1998 a 2003 (la fuente da solo los años: 01/01
por convención). Los cierres de 1999, 2000 y 2001 caen en ese tramo; el hueco hasta Lotito (2004) es de Ugo Longo y no tiene cierre cargado.
```

## Fuentes

### (general)

```text
Fuentes de cada ejercicio: las agrega tools/cargar.mjs adentro de este bloque (Versión 379: hasta la 378 el esqueleto no lo traía y la
primera carga de un club dado de alta por script se revertía, "no encontré Object.assign(sources, {"; caso: Fortaleza CEIF).
```

### lazio-it-bilancio-separato-consolidato-2006-07

_note (data/):_

```text
Cargado por tools/cargar.mjs (2026-10-07) desde la transcripción Clubes/Italia/Lazio/Lazio-bilancio-separato-consolidato-2006-07.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.
```

### lazio-it-bilancio-separato-consolidato-2008-09

_note (data/):_

```text
Cargado por tools/cargar.mjs (2026-10-07) desde la transcripción Clubes/Italia/Lazio/Lazio-bilancio-separato-consolidato-2008-09.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.
```

### lazio-it-bilancio-separato-consolidato-2009-10

_note (data/):_

```text
Cargado por tools/cargar.mjs (2026-10-07) desde la transcripción Clubes/Italia/Lazio/Lazio-bilancio-separato-consolidato-2009-10.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.
```

### lazio-it-bilancio-separato-consolidato-2019-20

_note (data/):_

```text
Cargado por tools/cargar.mjs (2026-10-07) desde la transcripción Clubes/Italia/Lazio/Lazio-bilancio-separato-consolidato-2019-20.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.
```

### lazio-it-bilancio-separato-consolidato-2022-23

_note (data/):_

```text
Cargado por tools/cargar.mjs (2026-10-07) desde la transcripción Clubes/Italia/Lazio/Lazio-bilancio-separato-consolidato-2022-23.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.
```

### lazio-it-bilancio-separato-consolidato-2021-22

_note (data/):_

```text
Cargado por tools/cargar.mjs (2026-10-07) desde la transcripción Clubes/Italia/Lazio/Lazio-bilancio-separato-consolidato-2021-22.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.
```

### lazio-it-bilancio-separato-consolidato-2014-15

_note (data/):_

```text
Cargado por tools/cargar.mjs (2026-10-07) desde la transcripción Clubes/Italia/Lazio/Lazio-bilancio-separato-consolidato-2014-15.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.
```

### lazio-it-relazione-finanziaria-annuale-2024-25

_note (data/):_

```text
Cargado por tools/cargar.mjs (2026-10-08) desde la transcripción Clubes/Italia/Lazio/Lazio-relazione-finanziaria-annuale-2024-25.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.
```

### lazio-it-bilancio-separato-consolidato-2017-18

_note (data/):_

```text
Cargado por tools/cargar.mjs (2026-10-08) desde la transcripción Clubes/Italia/Lazio/Lazio-bilancio-separato-consolidato-2017-18.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.
```

### lazio-it-bilancio-separato-consolidato-2018-19

_note (data/):_

```text
Cargado por tools/cargar.mjs (2026-10-08) desde la transcripción Clubes/Italia/Lazio/Lazio-bilancio-separato-consolidato-2018-19.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.
```

### lazio-it-bilancio-separato-consolidato-2023-24

_note (data/):_

```text
Cargado por tools/cargar.mjs (2026-10-08) desde la transcripción Clubes/Italia/Lazio/Lazio-bilancio-separato-consolidato-2023-24.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.
```

### lazio-it-bilancio-separato-consolidato-2012-13

_note (data/):_

```text
Cargado por tools/cargar.mjs (2026-10-08) desde la transcripción Clubes/Italia/Lazio/Lazio-bilancio-separato-consolidato-2012-13.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.
```

### lazio-it-bilancio-separato-consolidato-2007-08

_note (data/):_

```text
Cargado por tools/cargar.mjs (2026-10-08) desde la transcripción Clubes/Italia/Lazio/Lazio-bilancio-separato-consolidato-2007-08.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.
```

### lazio-it-bilancio-separato-consolidato-2011-12

_note (data/):_

```text
Cargado por tools/cargar.mjs (2026-10-08) desde la transcripción Clubes/Italia/Lazio/Lazio-bilancio-separato-consolidato-2011-12.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.
```

### lazio-it-bilancio-separato-consolidato-2016-17

_note (data/):_

```text
Cargado por tools/cargar.mjs (2026-10-08) desde la transcripción Clubes/Italia/Lazio/Lazio-bilancio-separato-consolidato-2016-17.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.
```

### lazio-it-relazione-finanziaria-annuale-2025-26

_note (data/):_

```text
Cargado por tools/cargar.mjs (2026-10-08) desde la transcripción Clubes/Italia/Lazio/Lazio-relazione-finanziaria-annuale-2025-26.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.
```

### lazio-it-bilancio-1998-99

_note (data/):_

```text
Cargado por tools/cargar.mjs (2026-10-08) desde la transcripción Clubes/Italia/Lazio/Lazio-bilancio-1998-99.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### lazio-it-bilancio-1999-00

_note (data/):_

```text
Cargado por tools/cargar.mjs (2026-10-08) desde la transcripción Clubes/Italia/Lazio/Lazio-bilancio-1999-00.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### lazio-it-bilancio-2000-01

_note (data/):_

```text
Cargado por tools/cargar.mjs (2026-10-08) desde la transcripción Clubes/Italia/Lazio/Lazio-bilancio-2000-01.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### lazio-it-bilancio-separato-consolidato-2013-14

_note (data/):_

```text
Cargado por tools/cargar.mjs (2026-10-08) desde la transcripción Clubes/Italia/Lazio/Lazio-bilancio-separato-consolidato-2013-14.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.
```

### lazio-it-bilancio-separato-consolidato-2020-21

_note (data/):_

```text
Cargado por tools/cargar.mjs (2026-10-08) desde la transcripción Clubes/Italia/Lazio/Lazio-bilancio-separato-consolidato-2020-21.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.
```

### lazio-it-bilancio-separato-consolidato-2010-11

_note (data/):_

```text
Cargado por tools/cargar.mjs (2026-10-08) desde la transcripción Clubes/Italia/Lazio/Lazio-bilancio-separato-consolidato-2010-11.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.
```

### lazio-it-bilancio-2004-05

_note (data/):_

```text
Cargado por tools/cargar.mjs (2026-10-08) desde la transcripción Clubes/Italia/Lazio/Lazio-bilancio-2004-05.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.
```

### lazio-it-progetto-bilancio-2005-06-mirror-sslaziofans

_note (data/):_

```text
Cargado por tools/cargar.mjs (2026-10-08) desde la transcripción Clubes/Italia/Lazio/Lazio-progetto-bilancio-2005-06-mirror-sslaziofans.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.
```

### lazio-it-bilancio-2003-04

_note (data/):_

```text
Cargado por tools/cargar.mjs (2026-10-09) desde la transcripción Clubes/Italia/Lazio/Lazio-bilancio-2003-04.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.
```

### lazio-it-bilancio-separato-consolidato-2015-16

_note (data/):_

```text
Cargado por tools/cargar.mjs (2026-10-09) desde la transcripción Clubes/Italia/Lazio/Lazio-bilancio-separato-consolidato-2015-16.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.
```
