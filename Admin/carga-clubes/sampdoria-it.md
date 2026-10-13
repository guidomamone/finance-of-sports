# sampdoria-it — evidencia de carga

Lo que había como comentario en `data/it/sampdoria-it-data.js`, movido tal cual por `tools/mover-comentarios-data.mjs` (la regla:
`Admin/CONVENCIONES-DATOS.md`, "data/<país>/<club>-data.js NO LLEVA COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y
meta. Las notas de cada fila van en una tabla con su número de fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
============================================================================
data/it/sampdoria-it-data.js — U.C. Sampdoria S.p.A. (Italia).
ALTA POR SCRIPT (tools/alta-club.mjs, 2026-10-07), SIN EJERCICIOS CARGADOS TODAVÍA:
las estructuras de abajo están vacías a propósito. Los rubros, los totales
oficiales y el resto del fiscalYearMeta los agrega la etapa de carga
(tools/proponer-carga.mjs / sesión de onboarding), que es también la que
reemplaza esta cabecera por la de siempre (fuente, perímetro, categorización).

Documento que originó el alta: Clubes/Italia/Sampdoria/Sampdoria-fascicolo-bilancio-2021.pdf

De dónde salió cada campo (estado según alta-club.mjs: ok / pendiente):
  id                 ok        "sampdoria-it" — slug de "Sampdoria" + '-it' (convención de clubId, Admin/CONVENCIONES.md Versión 129)
  name               ok        "U.C. Sampdoria S.p.A." — el .md, 8 veces (nombre del club + forma societaria)
  displayName        ok        "Sampdoria" — nombre de la carpeta del club en Clubes/
  country            ok        "IT" — carpeta de país "Italia" (tabla PAISES)
  reportingCurrency  ok        "EUR" — moneda de curso legal de Italia
  fiscalYearStart    ok        "01-01" — cierre del ejercicio: contenido del .md (125 de 182 fechas de fin de mes caen en el mes 12)
  sport              ok        "futbol" — el .md nombra el fútbol 98 veces y ningún otro deporte más que eso
  brandColor         pendiente (ausente) — la liga del club no está en tools/brand-color-reference/ (o el club no está en footylogos)
  anio               ok        2021 — nombre del archivo (misma regla que onboard.mjs --quien), confirmado por las fechas de cierre del .md
  cierre             ok        "2021-12-31" — año del ejercicio + mes de cierre (contenido del .md (125 de 182 fechas de fin de mes caen en el mes 12))
  reportType         ok        "official_balance_sheet" — el .md tiene un estado contable (resultados / balance) y el nombre del archivo no sugiere otro tipo
  perimetro          ok        "individual" — ajuste manual (Admin/registros/ajustes-manuales.jsonl, perimetro-senales 2026-10-06): perimetro-senales.mjs: 0 documento(s) con los dos estados votan —; 1 ejerc
  currency           ok        "EUR" — moneda de curso legal de Italia (tabla PAISES de alta-club.mjs)
  fxRef              ok        "EUR@2021-12-31" — el documento no declara tipo de cambio; FX_CLOSE ya tiene EUR@2021-12-31 = 0.882924 (Tipo de referencia del Banco Central Europeo al 2021-12-31)
  sourceId           ok        "sampdoria-it-fascicolo-bilancio-2021" — clubId + nombre del archivo en slug
  liga               ok        "it-seriea" — roster cacheado de "2021–22 Serie A" (tools/club-league-reference/it.json), coincidencia exacta "Sampdoria"

FISCAL YEAR META PROPUESTO para 2021 (NO registrado: un ejercicio con meta y
sin rubros se vería en el sitio como un año en cero, y "sin dato no es cero"):
  2021: {"reportType":"official_balance_sheet","currency":"EUR","fxRef":"EUR@2021-12-31","sourceId":"sampdoria-it-fascicolo-bilancio-2021"}
============================================================================
```

_de data/clubs.js:_

```text
Sampdoria: alta por tools/alta-club.mjs (2026-10-07) desde Clubes/Italia/Sampdoria/Sampdoria-fascicolo-bilancio-2021.pdf.
brandColor y su procedencia: Admin/sourcing/Italia/Sampdoria.md.
```

_de data/club-leagues/it.js:_

```text
Sampdoria (alta-club.mjs, 2026-10-07): verificado contra roster cacheado de "2021–22 Serie A" (tools/club-league-reference/it.json), coincidencia exacta "Sampdoria".
```

## 2021

### Ingresos

```text
2021: cargado por tools/cargar.mjs (2026-10-07) desde Clubes/Italia/Sampdoria/Sampdoria-fascicolo-bilancio-2021.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Italia/Sampdoria/Sampdoria-fascicolo-bilancio-2021.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | a) ricavi da gare | pág. 27, Jev 1 |
| 2 | a) contributi in conto esercizio | pág. 27, Jev 0.97 |
| 3 | b) proventi da sponsorizzazioni | pág. 27, Jev 1 |
| 4 | c) proventi pubblicitari | pág. 27, Jev 1 |
| 5 | d) proventi commerciali e royalties | pág. 27, Jev 1 |
| 6 | e) proventi da cessione diritti audiovisivi | pág. 27, Jev 1 |
| 7 | f) ricavi da cessione temporanea prestazioni calciatori | pág. 27, Jev 0.99 |
| 8 | g) plusvalenze da cessione diritti pluriennali prestazioni calciatori | pág. 27, Jev 1 |
| 9 | h) altri proventi da trasferimento diritti calciatori | pág. 27, Jev 0.99 |

### Gastos

```text
tools/cargar.mjs (2026-10-07)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Per materie prime, sussidiarie, di consumo e di merci | pág. 27, Jev 0.99 |
| 2 | Per servizi | pág. 27, Jev 1 |
| 3 | Per godimento di beni di terzi | pág. 27, Jev 0.99 |
| 4 | a) Salari e stipendi | pág. 27, Jev 1 |
| 5 | b) Oneri sociali | pág. 27, Jev 0.91 |
| 6 | c) Trattamento di fine rapporto | pág. 27, Claude 0.88 |
| 7 | d) altri costi | pág. 27, precedente |
| 8 | a) Ammortamento delle immobilizzazioni immateriali | pág. 28, Claude 0.85 |
| 9 | b) Ammortamento delle immobilizzazioni materiali | pág. 28, Jev 1 |
| 10 | Variazione delle rimanenze di materiale di consumo e merci | pág. 28, Jev 0.99 |
| 11 | Accantonamenti per rischi | pág. 28, Jev 0.97 |
| 12 | a) oneri da organizzazione competizioni | pág. 28, Jev 1 |
| 13 | b) costi per acquisizione temporanea prestazioni calciatori | pág. 28, Jev 0.99 |
| 14 | c) minusvalenze da cessione diritti pluriennali prestazioni calciatori | pág. 28, Jev 1 |
| 15 | d) altri oneri da trasferimento diritti calciatori | pág. 28, Jev 1 |
| 16 | e) altri oneri diversi di gestione | pág. 28, Jev 1 |

### Meta

```text
2021: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-07): fila = 0. renglón 'di cui' que ya está dentro de su padre: se contaba dos veces (arreglo manual 2026-10-07, causa encontrada por subagente)
2021: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-07): fila = 0. to-do 157: i) es otro 'di cui' de h) (28.550 + 2.959.520 + 5.785.259 = 8.773.329 = h); se contaba dos veces
2021: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-07): cierre = 2021-12-31. Claude 2026-10-07 (ok de Guido, cola d29023b): el conto economico es al 31/12/2021; 30/03/2022 es la fecha de aprobación del consiglio
tools/cargar.mjs (2026-10-07). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

## 2020

### Ingresos

```text
2020: cargado por tools/cargar.mjs (2026-10-09) desde Clubes/Italia/Sampdoria/Sampdoria-fascicolo-bilancio-2020.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Italia/Sampdoria/Sampdoria-fascicolo-bilancio-2020.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Gare Campionato | pág. 68, precedente |
| 2 | Abbonamenti | pág. 68, precedente |
| 3 | 4) Incrementi di immobilizzazione per | pág. 34, Jev 1 |
| 4 | Proventi da sponsorizzazioni: | pág. 69, precedente |
| 5 | Proventi pubblicitari e concessioni varie: | pág. 69, precedente |
| 6 | Diritti radiotelevisivi e proventi media | pág. 69, precedente |
| 7 | Proventi da cessioni temporanee calciatori | pág. 69, precedente |
| 8 | Altri proventi da gestione calciatori | pág. 69, precedente |
| 9 | Contributi federali | pág. 69, precedente |
| 10 | Altri ricavi e proventi | pág. 69, precedente |
| 11 | Proventi da contratto Rai – Library Sampdoria | pág. 69, precedente |
| 12 | Sopravvenienze attive | pág. 69, precedente |
| 13 | 1a) plusvalenze | pág. 34, Jev 0.98 |
| 14 | b) Contributi in conto esercizio | pág. 34, precedente |

### Gastos

```text
tools/cargar.mjs (2026-10-09)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Materiale di consumo | pág. 71, precedente |
| 2 | Indumenti gioco | pág. 71, precedente |
| 3 | Indumenti | pág. 71, precedente |
| 4 | Medicinali | pág. 71, precedente |
| 5 | Cancelleria e stampati | pág. 71, precedente |
| 6 | Altro | pág. 71, precedente |
| 7 | Costi per tesserati | pág. 71, precedente |
| 8 | Costi per attività sportiva | pág. 71, precedente |
| 9 | Costi specifici tecnici | pág. 71, precedente |
| 10 | Compensi per Agenti e intermediari | pág. 71, precedente |
| 11 | Costi vitto, alloggio, locomozione gare | pág. 71, precedente |
| 12 | Assicurative e previdenziali | pág. 71, precedente |
| 13 | Amministrative, pubblicitarie e generali di cui a favore Sport Spettacolo Holding Srl | pág. 71, Jev 1 |
| 14 | Altri di cui a favore Sport Spettacolo Holding Srl | pág. 71, Jev 0.92 |
| 15 | Costi campi sportivi | pág. 72, precedente |
| 16 | Noleggio autovetture | pág. 72, precedente |
| 17 | Locazioni uffici e altri locali | pág. 72, precedente |
| 18 | Noleggi | pág. 72, precedente |
| 19 | Concessione utilizzo marchio | pág. 72, precedente |
| 20 | a) Salari e stipendi | pág. 34, precedente |
| 21 | b) Oneri sociali | pág. 34, precedente |
| 22 | c) Trattamento di fine rapporto | pág. 34, precedente |
| 23 | d) altri costi | pág. 34, precedente |
| 24 | a) Ammortamento delle | pág. 34, Claude 0.9 |
| 25 | b) Ammortamento delle | pág. 34, Claude 0.9 |
| 26 | c) altre svalutazioni delle | pág. 34, Jev 0.9 |
| 27 | d) Svalutazioni crediti dell'attivo | pág. 34, precedente |
| 28 | 11) Variazione delle rimanenze di | pág. 34, Jev 1 |
| 29 | 12) Accantonamenti per rischi | pág. 34, precedente |
| 30 | Spese varie organizzazione gare | pág. 75, precedente |
| 31 | Tasse iscrizioni gare | pág. 75, precedente |
| 32 | Costi per acquisizione temporanea prestazioni calciatori | pág. 75, precedente |
| 33 | Minusvalenze cessione diritti pluriennali prestazioni calciatori | pág. 75, precedente |
| 34 | Premi Preparazione ex art. 96 NOIF | pág. 75, precedente |
| 35 | Premi Valorizzazione | pág. 75, precedente |
| 36 | Oneri diversi da gestione calciatori | pág. 75, precedente |
| 37 | Spese, ammende e multe gare | pág. 75, precedente |
| 38 | Oneri tributari indiretti | pág. 75, precedente |
| 39 | Altri | pág. 75, precedente |

### Meta

```text
tools/cargar.mjs (2026-10-09). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
2020: tools/cargar.mjs 2026-10-09, verificado contra roster cacheado de "2020–21 Serie A" (tools/club-league-reference/it.json), coincidencia e
```

## 2019

### Ingresos

```text
2019: cargado por tools/cargar.mjs (2026-10-08) desde Clubes/Italia/Sampdoria/Sampdoria-fascicolo-bilancio-2019.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Italia/Sampdoria/Sampdoria-fascicolo-bilancio-2019.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Gare Campionato | pág. 59, precedente |
| 2 | Gare Coppa Italia | pág. 59, precedente |
| 3 | Gare Coppa Italia | pág. 59, precedente |
| 4 | Abbonamenti | pág. 59, precedente |
| 5 | Incrementi di immobilizzazione per lavori interni e capitalizzazione costi vivaio | pág. 29, precedente |
| 6 | Proventi da sponsorizzazioni: | pág. 59, precedente |
| 7 | Proventi pubblicitari e concessioni varie: | pág. 59, precedente |
| 8 | Diritti radiotelevisivi e proventi media | pág. 59, Jev 1 |
| 9 | Plusvalenze da cessione diritti pluriennali prestazioni dei calciatori | pág. 59, precedente |
| 10 | Proventi da cessioni temporanee calciatori | pág. 59, precedente |
| 11 | Altri proventi da gestione calciatori | pág. 59, precedente |
| 12 | Contributi federali | pág. 59, precedente |
| 13 | Altri ricavi e proventi | pág. 59, precedente |
| 14 | Proventi da contratto Rai – Library Sampdoria | pág. 59, precedente |
| 15 | Sopravvenienze attive | pág. 59, precedente |

### Gastos

```text
tools/cargar.mjs (2026-10-08)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Materiale di consumo | pág. 61, precedente |
| 2 | Indumenti gioco | pág. 61, precedente |
| 3 | Indumenti | pág. 61, precedente |
| 4 | Medicinali | pág. 61, precedente |
| 5 | Cancelleria e stampati | pág. 61, precedente |
| 6 | Altro | pág. 61, precedente |
| 7 | Costi per tesserati | pág. 62, precedente |
| 8 | Costi per attività sportiva | pág. 62, precedente |
| 9 | Costi specifici tecnici | pág. 62, precedente |
| 10 | Compensi per Agenti e intermediari | pág. 62, precedente |
| 11 | Costi vitto, alloggio, locomozione gare | pág. 62, precedente |
| 12 | Assicurative e previdenziali | pág. 62, precedente |
| 13 | Amministrative, pubblicitarie e generali | pág. 62, precedente |
| 14 | Altri | pág. 62, precedente |
| 15 | Costi campi sportivi | pág. 63, precedente |
| 16 | Noleggio autovetture | pág. 63, precedente |
| 17 | Locazioni uffici e altri locali | pág. 63, precedente |
| 18 | Noleggi | pág. 63, precedente |
| 19 | Concessione utilizzo marchio | pág. 63, precedente |
| 20 | a) Salari e stipendi | pág. 29, precedente |
| 21 | b) Oneri sociali | pág. 29, precedente |
| 22 | c) Trattamento di fine rapporto | pág. 29, precedente |
| 23 | d) altri costi | pág. 29, precedente |
| 24 | a) Ammortamento delle immobilizzazioni immateriali | pág. 29, precedente |
| 25 | b) Ammortamento delle immobilizzazioni materiali | pág. 29, precedente |
| 26 | c) altre svalutazioni delle immobilizzazioni | pág. 29, precedente |
| 27 | di cui Svalutazioni diritti pluriennali calciatori | pág. 29, Jev 0.9 |
| 28 | d) Svalutazioni crediti dell'attivo | pág. 29, precedente |
| 29 | Accantonamenti per rischi | pág. 29, precedente |
| 30 | Spese varie organizzazione gare | pág. 65, precedente |
| 31 | Tasse iscrizioni gare | pág. 65, precedente |
| 32 | Percentuale su incassi gare a squadre ospitate | pág. 65, precedente |
| 33 | Costi per acquisizione temporanea prestazioni calciatori | pág. 65, precedente |
| 34 | Minusvalenze cessione diritti pluriennali prestazioni calciatori | pág. 65, precedente |
| 35 | Premi Preparazione ex art. 96 NOIF | pág. 65, precedente |
| 36 | Premi Valorizzazione | pág. 65, precedente |
| 37 | Oneri diversi da gestione calciatori | pág. 65, precedente |
| 38 | Spese, ammende e multe gare | pág. 65, precedente |
| 39 | Oneri tributari indiretti | pág. 65, precedente |
| 40 | Altri | pág. 65, precedente |
| 41 | Sopravvenienze passive | pág. 65, precedente |

### Meta

```text
tools/cargar.mjs (2026-10-08). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
2019: tools/cargar.mjs 2026-10-08, verificado contra roster cacheado de "2019–20 Serie A" (tools/club-league-reference/it.json), coincidencia e
```

## 2018

### Ingresos

```text
2018: cargado por tools/cargar.mjs (2026-10-08) desde Clubes/Italia/Sampdoria/Sampdoria-fascicolo-bilancio-2018.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Italia/Sampdoria/Sampdoria-fascicolo-bilancio-2018.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Gare Campionato | pág. 54, Jev 1 |
| 2 | Gare Coppa Italia | pág. 54, Jev 1 |
| 3 | Abbonamenti | pág. 54, Jev 1 |
| 4 | Incrementi di immobilizzazione per lavori interni e capitalizzazione costi vivaio | pág. 26, Jev 0.96 |
| 5 | Proventi da sponsorizzazioni | pág. 55, precedente |
| 6 | Proventi pubblicitari e concessioni varie | pág. 55, Claude 0.85 |
| 7 | Proventi da cessione diritti televisivi | pág. 55, Jev 1 |
| 8 | Plusvalenze da cessione diritti pluriennali prestazioni dei calciatori | pág. 55, Jev 0.99 |
| 9 | Proventi da cessioni temporanee calciatori | pág. 55, Jev 0.96 |
| 10 | Altri proventi da gestione calciatori | pág. 55, Jev 0.96 |
| 11 | Contributi federali | pág. 55, Jev 1 |
| 12 | Altri ricavi e proventi | pág. 55, Jev 0.98 |
| 13 | Proventi da contratto Rai – Library Sampdoria | pág. 55, Jev 0.98 |
| 14 | Sopravvenienze attive | pág. 55, Jev 1 |

### Gastos

```text
tools/cargar.mjs (2026-10-08)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Materiale di consumo | pág. 57, precedente |
| 2 | Indumenti gioco | pág. 57, precedente |
| 3 | Indumenti | pág. 57, precedente |
| 4 | Medicinali | pág. 57, precedente |
| 5 | Cancelleria e stampati | pág. 57, Jev 1 |
| 6 | Altro | pág. 57, Jev 0.95 |
| 7 | Costi per tesserati | pág. 57, precedente |
| 8 | Costi per attività sportiva | pág. 57, precedente |
| 9 | Costi specifici tecnici | pág. 57, Jev 0.9 |
| 10 | Compensi per Agenti e intermediari | pág. 57, Jev 0.98 |
| 11 | Costi vitto, alloggio, locomozione gare | pág. 57, Jev 1 |
| 12 | Assicurative e previdenziali | pág. 57, Jev 0.99 |
| 13 | Amministrative, pubblicitarie e generali | pág. 57, Jev 1 |
| 14 | Altri | pág. 57, Jev 1 |
| 15 | Costi campi sportivi | pág. 58, precedente |
| 16 | Noleggio autovetture | pág. 58, Jev 0.99 |
| 17 | Locazioni uffici e altri locali | pág. 58, Jev 0.99 |
| 18 | Noleggi | pág. 58, precedente |
| 19 | Concessione utilizzo marchio | pág. 58, precedente |
| 20 | a) Salari e stipendi | pág. 26, precedente |
| 21 | b) Oneri sociali | pág. 26, precedente |
| 22 | c) Trattamento di fine rapporto | pág. 26, precedente |
| 23 | d) altri costi | pág. 26, precedente |
| 24 | a) Ammortamento delle immobilizzazioni immateriali | pág. 26, precedente |
| 25 | b) Ammortamento delle immobilizzazioni materiali | pág. 26, precedente |
| 26 | c) altre svalutazioni delle immobilizzazioni | pág. 26, Jev 0.95 |
| 27 | d) Svalutazioni crediti dell'attivo | pág. 26, Jev 1 |
| 28 | Accantonamenti per rischi | pág. 26, precedente |
| 29 | Spese varie organizzazione gare | pág. 60, Jev 1 |
| 30 | Tasse iscrizioni gare | pág. 60, Jev 1 |
| 31 | Percentuale su incassi gare a squadre ospitate | pág. 60, Jev 0.98 |
| 32 | Costi per acquisizione temporanea prestazioni calciatori | pág. 60, precedente |
| 33 | Minusvalenze cessione diritti pluriennali prestazioni calciatori | pág. 60, Jev 1 |
| 34 | Premi Preparazione ex art. 96 NOIF | pág. 60, Jev 0.97 |
| 35 | Contributo Solidarietà Fifa/Indennita' Formazione | pág. 60, Jev 0.97 |
| 36 | Premi Valorizzazione | pág. 60, precedente |
| 37 | Oneri diversi da gestione calciatori | pág. 60, Jev 1 |
| 38 | Spese, ammende e multe gare | pág. 60, Jev 0.95 |
| 39 | Oneri tributari indiretti | pág. 60, Jev 1 |
| 40 | Altri | pág. 60, Jev 1 |
| 41 | Sopravvenienze passive | pág. 60, Jev 1 |

### Meta

```text
2018: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-08): fila = 56.853. pág. 27: importes sin etiqueta (cola f1b4f17)
2018: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-08): fila = (2.728.204). idem
2018: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-08): fila = 46. idem
2018: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-08): fila = (1). idem
2018: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-08): fila = (3.465.535). reemplaza la fila extraída '(sin etiqueta: imposte correnti)' L1061, que se sumaba dos veces con el ajuste
2018: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-08): fila = (3.943.972). idem
2018: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-08): fila = 440.273. idem
2018: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-08): cierre = 2018-12-31. Fascicolo di Bilancio al 31 dicembre 2018; el 29/03/2019 es la fecha de aprobación del CdA
tools/cargar.mjs (2026-10-08). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
2018: tools/cargar.mjs 2026-10-08, verificado contra roster cacheado de "2018–19 Serie A" (tools/club-league-reference/it.json), coincidencia e
```

## Gestiones

_antes de Massimo Ferrero (data/gestiones/it.js):_

```text
Ferrero compró el club el 12/6/2014. Entre el 5/4 y el 19/12/2017 la FIGC lo hizo decaer de la presidencia (siguió de dueño): no se parte la gestión.
```

_antes de Marco Lanna (data/gestiones/it.js):_

```text
Lanna: nombrado el 27/12/2021; la lista da su fin como "2024" (solo el año; 01/01/2024 por convención).
```

## Fuentes

### (general)

```text
Fuentes de cada ejercicio: las agrega tools/cargar.mjs adentro de este bloque (Versión 379: hasta la 378 el esqueleto no lo traía y la
primera carga de un club dado de alta por script se revertía, "no encontré Object.assign(sources, {"; caso: Fortaleza CEIF).
```

### sampdoria-it-fascicolo-bilancio-2021

_note (data/):_

```text
Cargado por tools/cargar.mjs (2026-10-07) desde la transcripción Clubes/Italia/Sampdoria/Sampdoria-fascicolo-bilancio-2021.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### sampdoria-it-fascicolo-bilancio-2018

_note (data/):_

```text
Cargado por tools/cargar.mjs (2026-10-08) desde la transcripción Clubes/Italia/Sampdoria/Sampdoria-fascicolo-bilancio-2018.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### sampdoria-it-fascicolo-bilancio-2019

_note (data/):_

```text
Cargado por tools/cargar.mjs (2026-10-08) desde la transcripción Clubes/Italia/Sampdoria/Sampdoria-fascicolo-bilancio-2019.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### sampdoria-it-fascicolo-bilancio-2020

_note (data/):_

```text
Cargado por tools/cargar.mjs (2026-10-09) desde la transcripción Clubes/Italia/Sampdoria/Sampdoria-fascicolo-bilancio-2020.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```
