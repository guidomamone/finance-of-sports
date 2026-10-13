# asroma-it — evidencia de carga

Lo que había como comentario en `data/asroma-it-data.js`, movido tal cual por `tools/mover-comentarios-data.mjs` (la regla:
`Admin/CONVENCIONES-DATOS.md`, "data/<club>-data.js NO LLEVA COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y
meta. Las notas de cada fila van en una tabla con su número de fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
============================================================================
data/asroma-it-data.js — A.S. Roma S.r.l. (Italia).
ALTA POR SCRIPT (tools/alta-club.mjs, 2026-10-07), SIN EJERCICIOS CARGADOS TODAVÍA:
las estructuras de abajo están vacías a propósito. Los rubros, los totales
oficiales y el resto del fiscalYearMeta los agrega la etapa de carga
(tools/proponer-carga.mjs / sesión de onboarding), que es también la que
reemplaza esta cabecera por la de siempre (fuente, perímetro, categorización).

Documento que originó el alta: Clubes/Italia/AS Roma/AS-Roma-bilancio-2022-consolidato.pdf

De dónde salió cada campo (estado según alta-club.mjs: ok / pendiente):
  id                 ok        "asroma-it" — slug de "AS Roma" + '-it' (convención de clubId, Admin/CONVENCIONES.md Versión 129)
  name               ok        "A.S. Roma S.r.l." — el .md, 7 veces (nombre del club + forma societaria)
  displayName        ok        "AS Roma" — nombre de la carpeta del club en Clubes/
  country            ok        "IT" — carpeta de país "Italia" (tabla PAISES)
  reportingCurrency  ok        "EUR" — moneda de curso legal de Italia
  fiscalYearStart    ok        "07-01" — cierre del ejercicio: contenido del .md (653 de 714 fechas de fin de mes caen en el mes 6)
  sport              ok        "futbol" — el .md nombra el fútbol 101 veces y ningún otro deporte más que eso
  brandColor         pendiente (ausente) — tools/brand-color-reference/ (footylogos): [italia] as roma: #980A2B Dark Red, #FBB900 Orange, #FFD500 Yellow
  anio               ok        2022 — nombre del archivo (misma regla que onboard.mjs --quien), confirmado por las fechas de cierre del .md
  cierre             ok        "2022-06-30" — año del ejercicio + mes de cierre (contenido del .md (653 de 714 fechas de fin de mes caen en el mes 6))
  reportType         ok        "official_balance_sheet" — el .md tiene un estado contable (resultados / balance) y el nombre del archivo no sugiere otro tipo
  perimetro          ok        "consolidado" — ajuste manual (Admin/ajustes-manuales.jsonl, perimetro-senales 2026-10-06): perimetro-senales.mjs: 3 documento(s) con los dos estados votan consolidad
  currency           ok        "EUR" — moneda de curso legal de Italia (tabla PAISES de alta-club.mjs)
  fxRef              ok        "EUR@2022-06-30" — el documento no declara tipo de cambio; FX_CLOSE ya tiene EUR@2022-06-30 = 0.9627 (Cierre BCE al 30/6/2022 (1 EUR = 1,0387 USD))
  sourceId           ok        "asroma-it-bilancio-2022-consolidato" — clubId + nombre del archivo en slug
  liga               ok        "it-seriea" — roster cacheado de "2021–22 Serie A" (tools/club-league-reference/it.json), coincidencia única por palabras "Roma" = "AS Roma"

FISCAL YEAR META PROPUESTO para 2022 (NO registrado: un ejercicio con meta y
sin rubros se vería en el sitio como un año en cero, y "sin dato no es cero"):
  2022: {"reportType":"official_balance_sheet","currency":"EUR","fxRef":"EUR@2022-06-30","sourceId":"asroma-it-bilancio-2022-consolidato"}
============================================================================
```

## 2025

### Ingresos

```text
2025: cargado por tools/cargar.mjs (2026-10-07) desde Clubes/Italia/AS Roma/AS-Roma-bilancio-2025.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Italia/AS Roma/AS-Roma-bilancio-2025.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | a) ricavi da gare | pág. 22, precedente |
| 2 | b) abbonamenti | pág. 22, Jev 1 |
| 3 | a) proventi da sponsorizzazioni | pág. 22, Jev 1 |
| 4 | b) proventi pubblicitari | pág. 22, precedente |
| 5 | c) proventi commerciali e royalties | pág. 22, Jev 1 |
| 6 | d) proventi da cessione diritti audiovisivi | pág. 22, Jev 1 |
| 7 | e) ricavi da cessione temporanea prestazioni calciatori | pág. 22, Jev 0.98 |
| 8 | f) plusvalenze da cessione diritti pluriennali prestazioni calciatori | pág. 22, Jev 0.99 |
| 9 | g) altri proventi da trasferimento diritti calciatori | pág. 22, Jev 0.99 |
| 10 | h) ricavi e proventi diversi | pág. 22, Jev 1 |

### Gastos

```text
tools/cargar.mjs (2026-10-07)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Indumenti sportivi e divise ufficiale | pág. 50, Claude 0.88 |
| 2 | Materiali di consumo | pág. 50, Jev 0.98 |
| 3 | Beni e prodotti da commercializzare | pág. 50, precedente |
| 4 | Costi per tesserati | pág. 50, precedente |
| 5 | Costi per attività sportiva | pág. 50, precedente |
| 6 | Costi specifici tecnici | pág. 50, precedente |
| 7 | Costi di vitto, alloggio, locomozione gare | pág. 50, Jev 1 |
| 8 | Spese assicurative | pág. 50, precedente |
| 9 | Spese amministrative e generali | pág. 50, Jev 1 |
| 10 | Spese di pubblicità e promozione | pág. 50, precedente |
| 11 | Centro sportivo di Trigoria | pág. 51, precedente |
| 12 | Stadio Olimpico | pág. 51, precedente |
| 13 | Altre sedi | pág. 51, precedente |
| 14 | Beni | pág. 51, precedente |
| 15 | Calciatori e calciatrici | pág. 51, Jev 0.99 |
| 16 | Staff Tecnico | pág. 51, Jev 0.98 |
| 17 | Dipendenti e dirigenti | pág. 51, precedente |
| 18 | b) oneri sociali | pág. 22, precedente |
| 19 | c) trattamento di fine rapporto | pág. 22, Jev 0.95 |
| 20 | e) altri costi | pág. 22, precedente |
| 21 | Ammortamento DPS Calciatori | pág. 52, Jev 1 |
| 22 | Ammortamento DPS Calciatrici | pág. 52, Claude 0.85 |
| 23 | Ammortamento altre immob. Immateriali | pág. 52, Claude 0.8 |
| 24 | b) ammortamenti immobilizzazioni materiali | pág. 22, Jev 1 |
| 25 | d) svalutazioni dei crediti dell'attivo circolante e delle disponibilità liquide | pág. 22, Jev 1 |
| 26 | 11) variazioni delle rimanenze di prodotti finiti | pág. 22, Jev 1 |
| 27 | 12) accantonamenti per rischi | pág. 22, precedente |
| 28 | b) costi per acquisizione temporanea prestazioni calciatori | pág. 22, Jev 0.99 |
| 29 | c) minusvalenze da cessione diritti pluriennali prestazioni calciatori | pág. 22, Jev 0.99 |
| 30 | d) altri oneri da trasferimento diritti calciatori | pág. 22, Jev 1 |
| 31 | Oneri tributari indiretti | pág. 52, precedente |
| 32 | Biglietti trasferte | pág. 52, Jev 0.99 |
| 33 | Oneri lega | pág. 52, Jev 0.91 |
| 34 | Multe | pág. 52, Jev 1 |
| 35 | Sopravvenienze passive | pág. 52, precedente |
| 36 | Altri costi | pág. 52, Jev 0.99 |

### Meta

```text
2018: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): fila = 45.922. resultado neto de la gestión de jugadores, positivo (EBITDA 66.733 = 250.867 - 230.056 + 45.922) (to-do 155/156, arreglo manual 2026-10-07)
2025: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): cierre = 2025-06-30. Claude 2026-10-07: es el BILANCIO 2024-25 (cierre 30/06/2025); periodo.mjs lo leyó como 2024-06-30 (confianza media, el nombre no coincide) y extraer tomó la columna comparativa
tools/cargar.mjs (2026-10-07). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

## 2024

### Ingresos

```text
2024: cargado por tools/cargar.mjs (2026-10-08) desde Clubes/Italia/AS Roma/AS-Roma-bilancio-2024.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Italia/AS Roma/AS-Roma-bilancio-2024.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | a) ricavi da gare | pág. 23, precedente |
| 2 | b) abbonamenti | pág. 23, precedente |
| 3 | 2) variazioni delle rimanenze di prodotti finiti | pág. 23, Jev 0.99 |
| 4 | a) proventi da sponsorizzazioni | pág. 23, precedente |
| 5 | b) proventi pubblicitari | pág. 23, precedente |
| 6 | c) proventi commerciali e royalties | pág. 23, precedente |
| 7 | d) proventi da cessione diritti audiovisivi | pág. 23, precedente |
| 8 | e) ricavi da cessione temporanea prestazioni calciatori | pág. 23, precedente |
| 9 | f) plusvalenze da cessione diritti pluriennali prestazioni calciatori | pág. 23, precedente |
| 10 | g) altri proventi da trasferimento diritti calciatori | pág. 23, precedente |
| 11 | h) ricavi e proventi diversi | pág. 23, precedente |

### Gastos

```text
tools/cargar.mjs (2026-10-08)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Indumenti sportivi e divise ufficiale | pág. 50, precedente |
| 2 | Materiali di consumo | pág. 50, precedente |
| 3 | Beni e prodotti da commercializzare | pág. 50, precedente |
| 4 | Costi per tesserati | pág. 51, precedente |
| 5 | Costi per attività sportiva | pág. 51, precedente |
| 6 | Costi specifici tecnici | pág. 51, precedente |
| 7 | Costi di vitto, alloggio, locomozione gare | pág. 51, precedente |
| 8 | Spese assicurative | pág. 51, precedente |
| 9 | Spese amministrative e generali | pág. 51, precedente |
| 10 | Spese di pubblicità e promozione | pág. 51, precedente |
| 11 | Centro sportivo di Trigoria | pág. 51, precedente |
| 12 | Stadio Olimpico | pág. 51, precedente |
| 13 | Altre sedi | pág. 51, precedente |
| 14 | Beni | pág. 51, precedente |
| 15 | a) salari e stipendi | pág. 23, precedente |
| 16 | b) oneri sociali | pág. 23, precedente |
| 17 | c) trattamento di fine rapporto | pág. 23, precedente |
| 18 | d) trattamento di quiescenza e simili | pág. 23, Claude 0.8 |
| 19 | e) altri costi | pág. 23, precedente |
| 20 | Ammortamento DPS Calciatori | pág. 52, precedente |
| 21 | Ammortamento DPS Calciatrici | pág. 52, precedente |
| 22 | Ammortamento altre immob. Immateriali | pág. 52, precedente |
| 23 | b) ammortamenti immobilizzazioni materiali | pág. 23, precedente |
| 24 | d) svalutazioni dei crediti dell'attivo circolante e delle disponibilità liquide | pág. 23, precedente |
| 25 | 12) accantonamenti per rischi | pág. 23, precedente |
| 26 | b) costi per acquisizione temporanea prestazioni calciatori | pág. 23, precedente |
| 27 | c) minusvalenze da cessione diritti pluriennali prestazioni calciatori | pág. 23, precedente |
| 28 | d) altri oneri da trasferimento diritti calciatori | pág. 23, precedente |
| 29 | e) altri oneri diversi di gestione | pág. 23, Jev 1 |

### Meta

```text
tools/cargar.mjs (2026-10-08). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

## 2023

### Ingresos

```text
2023: cargado por tools/cargar.mjs (2026-10-08) desde Clubes/Italia/AS Roma/AS-Roma-bilancio-2023.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Italia/AS Roma/AS-Roma-bilancio-2023.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | a) ricavi da gare | pág. 26, precedente |
| 2 | b) abbonamenti | pág. 26, precedente |
| 3 | 2) variazioni delle rimanenze di prodotti finiti | pág. 26, Jev 0.99 |
| 4 | a) proventi da sponsorizzazioni | pág. 26, precedente |
| 5 | b) proventi pubblicitari | pág. 26, precedente |
| 6 | c) proventi commerciali e royalties | pág. 26, precedente |
| 7 | d) proventi da cessione diritti audiovisivi | pág. 26, precedente |
| 8 | e) ricavi da cessione temporanea prestazioni calciatori | pág. 26, precedente |
| 9 | f) plusvalenze da cessione diritti pluriennali prestazioni calciatori | pág. 26, precedente |
| 10 | g) altri proventi da trasferimento diritti calciatori | pág. 26, precedente |
| 11 | h) ricavi e proventi diversi | pág. 26, precedente |

### Gastos

```text
tools/cargar.mjs (2026-10-08)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Indumenti sportivi e divise ufficiale | pág. 59, precedente |
| 2 | Materiali di consumo | pág. 59, precedente |
| 3 | Beni e prodotti da commercializzare | pág. 59, precedente |
| 4 | Costi per tesserati | pág. 60, precedente |
| 5 | Costi per attività sportiva | pág. 60, precedente |
| 6 | Costi specifici tecnici | pág. 60, precedente |
| 7 | Costi di vitto, alloggio, locomozione gare | pág. 60, precedente |
| 8 | Spese assicurative | pág. 60, precedente |
| 9 | Spese amministrative e generali | pág. 60, precedente |
| 10 | Spese di pubblicità e promozione | pág. 60, precedente |
| 11 | Centro sportivo di Trigoria | pág. 60, precedente |
| 12 | Stadio Olimpico | pág. 60, precedente |
| 13 | Altre sedi | pág. 60, precedente |
| 14 | Beni | pág. 60, precedente |
| 15 | Calciatori e calciatrici | pág. 61, precedente |
| 16 | Staff Tecnico | pág. 61, precedente |
| 17 | Dipendenti e dirigenti | pág. 61, precedente |
| 18 | b) oneri sociali | pág. 26, precedente |
| 19 | c) trattamento di fine rapporto | pág. 26, precedente |
| 20 | e) altri costi | pág. 26, precedente |
| 21 | Ammortamento DPS Calciatori | pág. 61, precedente |
| 22 | Ammortamento altre immob. Immateriali | pág. 61, precedente |
| 23 | b) ammortamenti immobilizzazioni materiali | pág. 26, precedente |
| 24 | c) altre svalutazioni delle immobilizzazioni | pág. 26, Jev 0.96 |
| 25 | d) svalutazioni dei crediti dell'attive circolante e delle disponibilità liquide | pág. 26, precedente |
| 26 | 12) accantonamenti per rischi | pág. 26, precedente |
| 27 | a) costi per acquisizione temporanea prestazioni calciatori | pág. 26, precedente |
| 28 | b) minusvalenze da cessione diritti pluriennali prestazioni calciatori | pág. 26, precedente |
| 29 | c) altri oneri da trasferimento diritti calciatori | pág. 26, precedente |
| 30 | Oneri tributari indiretti | pág. 62, precedente |
| 31 | Biglietti trasferte | pág. 62, precedente |
| 32 | Oneri lega | pág. 62, precedente |
| 33 | Multe | pág. 62, precedente |
| 34 | Produzione gare | pág. 62, Jev 1 |
| 35 | Sopravvenienze passive | pág. 62, precedente |
| 36 | Altri costi | pág. 62, precedente |

### Meta

```text
tools/cargar.mjs (2026-10-08). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

## 2022

### Ingresos

```text
2022: cargado por tools/cargar.mjs (2026-10-07) desde Clubes/Italia/AS Roma/AS-Roma-bilancio-2022-consolidato.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Italia/AS Roma/AS-Roma-bilancio-2022-consolidato.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Ricavi da gare | pág. 43, Jev 1 |
| 2 | Ricavi delle vendite commerciali e licensing | pág. 43, Jev 0.96 |
| 3 | Sponsorizzazioni | pág. 43, Jev 1 |
| 4 | Diritti televisivi e diritti d'immagine | pág. 43, Jev 0.99 |
| 5 | Pubblicità | pág. 43, Jev 1 |
| 6 | Altri ricavi | pág. 43, Jev 1 |
| 7 | Ricavi da gestione dei diritti pluriennali prestazioni calciatori | pág. 43, Claude 0.8 |

### Gastos

```text
tools/cargar.mjs (2026-10-07)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Acquisti materie di consumo | pág. 43, precedente |
| 2 | Variazione delle rimanenze | pág. 43, Jev 1 |
| 3 | Spese per servizi | pág. 43, precedente |
| 4 | Spese per godimento beni di terzi | pág. 43, Jev 0.91 |
| 5 | Spese per il personale | pág. 43, precedente |
| 6 | Altri costi | pág. 43, Jev 0.99 |
| 7 | Ammortamenti e svalutazioni | pág. 43, precedente |
| 8 | Oneri da gestione dei diritti pluriennali prestazioni calciatori | pág. 43, precedente |

### Meta

```text
tools/cargar.mjs (2026-10-07). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

## 2021

### Ingresos

```text
2021: cargado por tools/cargar.mjs (2026-10-08) desde Clubes/Italia/AS Roma/AS-Roma-bilancio-2021.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Italia/AS Roma/AS-Roma-bilancio-2021.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Campionato Serie A | pág. 129, precedente |
| 2 | Competizioni europee | pág. 129, Jev 0.95 |
| 3 | Ricavi delle vendite commerciali e licensing | pág. 74, precedente |
| 4 | Sponsorizzazioni | pág. 74, precedente |
| 5 | Competizioni nazionali | pág. 130, Claude 0.85 |
| 6 | Competizioni UEFA | pág. 130, precedente |
| 7 | Library AS Roma | pág. 130, Jev 1 |
| 8 | Segnale TV | pág. 130, Jev 1 |
| 9 | AS Roma Media Center | pág. 130, Jev 0.96 |
| 10 | Pubblicità | pág. 74, precedente |
| 11 | Ricavi non audiovisivi da Lega Serie A | pág. 131, precedente |
| 12 | Indennizzi assicurativi | pág. 131, Jev 1 |
| 13 | Riaddebiti a società correlate | pág. 131, Jev 1 |
| 14 | Utilizzi fondi rischi | pág. 131, precedente |
| 15 | Altri ricavi diversi | pág. 131, Jev 1 |
| 16 | Ricavi da gestione dei diritti pluriennali prestazioni calciatori | pág. 74, precedente |

### Gastos

```text
tools/cargar.mjs (2026-10-08)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Indumenti sportivi e divise ufficiale | pág. 131, precedente |
| 2 | Materiali di consumo | pág. 131, precedente |
| 3 | Beni e prodotti da commercializzare | pág. 131, precedente |
| 4 | Variazione delle rimanenze | pág. 74, precedente |
| 5 | Costi per tesserati | pág. 132, precedente |
| 6 | Costi per attività sportiva | pág. 132, precedente |
| 7 | Costi specifici tecnici | pág. 132, precedente |
| 8 | Costi di vitto, alloggio, locomozione e trasferte | pág. 132, Jev 0.99 |
| 9 | Spese assicurative | pág. 132, precedente |
| 10 | Prestazioni e servizi professionali | pág. 133, Jev 1 |
| 11 | Produzione e sviluppo attività Media Center | pág. 133, Claude 0.8 |
| 12 | Emolumenti Consiglio di Amministrazione | pág. 133, Jev 1 |
| 13 | Collegio Sindacale, Società di Revisione, OdV | pág. 133, Jev 1 |
| 14 | Gestione sede sociale e centro sportivo | pág. 133, Jev 1 |
| 15 | Servizi mensa e buoni pasto personale | pág. 133, Jev 0.96 |
| 16 | Manutenzione e riparazioni | pág. 133, Jev 0.98 |
| 17 | Viaggi e trasferte | pág. 133, Jev 1 |
| 18 | Altre spese | pág. 133, Jev 0.91 |
| 19 | Spese di pubblicità e promozione | pág. 132, precedente |
| 20 | Spese per godimento beni di terzi | pág. 74, precedente |
| 21 | Salari e stipendi | pág. 134, precedente |
| 22 | Oneri contributivi e altri oneri | pág. 134, Claude 0.85 |
| 23 | Salari e stipendi | pág. 134, precedente |
| 24 | Oneri sociali | pág. 134, precedente |
| 25 | T.F.R. | pág. 134, precedente |
| 26 | Oneri tributari indiretti | pág. 135, precedente |
| 27 | Oneri per accesso al segnale TV | pág. 135, Jev 0.97 |
| 28 | Vertenze legali e contenziosi | pág. 135, ? 0.6 |
| 29 | Contributi Lega Serie A, ammende e multe | pág. 135, Claude 0.85 |
| 30 | Altri oneri | pág. 135, Claude 0.9 |
| 31 | Ammortamenti DPS calciatori | pág. 136, precedente |
| 32 | Ammortamenti delle altre immobilizz. immateriali | pág. 136, Jev 0.99 |
| 33 | Ammortamento delle immobilizzazioni materiali | pág. 136, precedente |
| 34 | Ammortamento Diritti d'uso | pág. 136, Jev 0.97 |
| 35 | Svalutazioni dei crediti correnti | pág. 136, precedente |
| 36 | Oneri da gestione dei diritti pluriennali prestazioni calciatori | pág. 74, precedente |

### Meta

```text
2021: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-08): fila = 36.125. gestión de jugadores en bruto (ingresos y gastos por separado), como AS Roma 2018/2019/2022/2025; el estado la imprime como renglones sin lado
2021: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-08): fila = (37.323). gestión de jugadores en bruto (gastos), ver el anterior
tools/cargar.mjs (2026-10-08). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

## 2020

### Ingresos

```text
2020: cargado por tools/cargar.mjs (2026-10-09) desde Clubes/Italia/AS Roma/AS-Roma-bilancio-2020.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Italia/AS Roma/AS-Roma-bilancio-2020.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Ricavi da gare | pág. 76, precedente |
| 2 | Ricavi delle vendite commerciali e licensing | pág. 76, precedente |
| 3 | Sponsorizzazioni | pág. 76, precedente |
| 4 | Diritti televisivi e diritti d'immagine | pág. 76, precedente |
| 5 | Pubblicità | pág. 76, precedente |
| 6 | Altri ricavi | pág. 76, precedente |
| 7 | Ricavi da gestione dei diritti pluriennali prestazioni calciatori | pág. 76, precedente |

### Gastos

```text
tools/cargar.mjs (2026-10-09)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Acquisti materie di consumo | pág. 76, precedente |
| 2 | Variazione delle rimanenze | pág. 76, precedente |
| 3 | Spese per servizi | pág. 76, precedente |
| 4 | Spese per godimento beni di terzi | pág. 76, precedente |
| 5 | Spese per il personale | pág. 76, precedente |
| 6 | Altri costi | pág. 76, precedente |
| 7 | Ammortamenti e svalutazioni | pág. 76, precedente |
| 8 | Oneri da gestione dei diritti pluriennali prestazioni calciatori | pág. 76, precedente |

### Meta

```text
tools/cargar.mjs (2026-10-09). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

## 2019

### Ingresos

```text
2019: cargado por tools/cargar.mjs (2026-10-08) desde Clubes/Italia/AS Roma/AS-Roma-bilancio-2019.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Italia/AS Roma/AS-Roma-bilancio-2019.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Ricavi da gare | pág. 64, precedente |
| 2 | Ricavi delle vendite commerciali e licensing | pág. 64, precedente |
| 3 | Sponsorizzazioni | pág. 64, precedente |
| 4 | Diritti televisivi e diritti d'immagine | pág. 64, precedente |
| 5 | Pubblicità | pág. 64, precedente |
| 6 | Altri | pág. 64, Jev 0.99 |
| 7 | Ricavi da gestione dei diritti pluriennali prestazioni calciatori | pág. 64, precedente |

### Gastos

```text
tools/cargar.mjs (2026-10-08)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Acquisti materie di consumo | pág. 64, precedente |
| 2 | Variazione delle rimanenze | pág. 64, precedente |
| 3 | Spese per servizi | pág. 64, precedente |
| 4 | Spese per godimento beni di terzi | pág. 64, precedente |
| 5 | Spese per il personale | pág. 64, precedente |
| 6 | Altri costi | pág. 64, precedente |
| 7 | Ammortamenti e svalutazioni | pág. 64, precedente |
| 8 | Oneri da gestione dei diritti pluriennali prestazioni calciatori | pág. 64, precedente |
| 9 | Accantonamenti per rischi | pág. 64, precedente |

### Meta

```text
tools/cargar.mjs (2026-10-08). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

## 2018

### Ingresos

```text
2018: cargado por tools/cargar.mjs (2026-10-08) desde Clubes/Italia/AS Roma/AS-Roma-bilancio-2018.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Italia/AS Roma/AS-Roma-bilancio-2018.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Campionato Serie A | pág. 109, Claude 0.85 |
| 2 | UEFA Champions League | pág. 109, Jev 0.97 |
| 3 | Youth League | pág. 109, ? 0.6 |
| 4 | Tim Cup | pág. 109, ? 0.65 |
| 5 | Gare amichevoli | pág. 109, Jev 1 |
| 6 | Abbonamenti Campionato | pág. 109, Jev 0.95 |
| 7 | Altri ricavi delle vendite e delle prestazioni | pág. 62, Jev 0.97 |
| 8 | b) Sponsorizzazioni | pág. 62, precedente |
| 9 | c) Diritti televisivi e diritti d'immagine | pág. 62, precedente |
| 10 | d) Proventi pubblicitari | pág. 62, precedente |
| 11 | Proventi LNP | pág. 112, precedente |
| 12 | Indennizzi assicurativi infortuni calciatori | pág. 112, Jev 1 |
| 13 | Riaddebiti ed entità correlate | pág. 112, Jev 0.99 |
| 14 | AS Roma Camp | pág. 112, Jev 0.99 |
| 15 | Ritiri estivi | pág. 112, ? 0.6 |
| 16 | Scuola Calcio | pág. 112, Jev 0.98 |
| 17 | Addebiti materiale sportivo | pág. 112, Jev 0.93 |
| 18 | Utilizzo fondi rischi | pág. 112, Jev 0.95 |
| 19 | Sopravvenienze attive | pág. 112, Jev 1 |
| 20 | Biglietti trasferite internazionali | pág. 112, Jev 0.99 |
| 21 | Tessera Tifoso Away | pág. 112, precedente |
| 22 | Altri proventi diversi | pág. 112, Jev 1 |
| 23 | Variazione delle rimanenze (reduce costos) | pág. 62, Jev 0.99 |
| 24 | Ricavi da gestione dei diritti pluriennali prestazioni calciatori | pág. 119, precedente |

### Gastos

```text
tools/cargar.mjs (2026-10-08)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Indumenti sportivi e materiale tecnico | pág. 113, precedente |
| 2 | Divise sociali ed altri beni | pág. 113, precedente |
| 3 | Beni e prodotti da commercializzare | pág. 113, precedente |
| 4 | Materiale vario di consumo | pág. 113, precedente |
| 5 | Costi per tesserati | pág. 114, precedente |
| 6 | Costi per attività sportiva | pág. 114, precedente |
| 7 | Costi specifici tecnici | pág. 114, precedente |
| 8 | Costi vitto, alloggio, locomozione e trasferte | pág. 114, Jev 1 |
| 9 | Spese assicurative | pág. 114, precedente |
| 10 | Consulenze e servizi professionali | pág. 115, Jev 1 |
| 11 | Consulenze professionali per servizi commerciali | pág. 115, Claude 0.85 |
| 12 | Spese postali, telefoniche ed altre utenze | pág. 115, Claude 0.9 |
| 13 | Spese di vigilanza | pág. 115, Jev 0.9 |
| 14 | Manutenzione - gestione sede sociale e centro sportivo | pág. 115, Jev 0.99 |
| 15 | Manutenzione e gestione hardware, software e sito internet | pág. 115, Jev 0.99 |
| 16 | Spese per assemblee, societari e di borsa | pág. 115, Jev 0.96 |
| 17 | Trasporti e trasferte | pág. 115, precedente |
| 18 | Emolumenti al Consiglio di Amministrazione | pág. 115, Jev 0.99 |
| 19 | Spese di revisione contabile | pág. 115, Claude 0.9 |
| 20 | Emolumenti al Collegio sindacale / O.D.V. | pág. 115, Claude 0.9 |
| 21 | Costi di produzione *Roma TV e Roma Radio | pág. 115, precedente |
| 22 | Spese Call Center Stadio ed altri servizi interinali | pág. 115, precedente |
| 23 | Altre spese generali e amministrative | pág. 115, Jev 1 |
| 24 | Spese di pubblicità e promozione | pág. 114, precedente |
| 25 | Spese per godimento beni di terzi | pág. 62, precedente |
| 26 | Salari e stipendi | pág. 117, Jev 0.98 |
| 27 | Oneri sociali | pág. 117, precedente |
| 28 | T.F.R. | pág. 117, precedente |
| 29 | Altri costi (Faifc) | pág. 117, precedente |
| 30 | Oneri tributari indiretti | pág. 118, precedente |
| 31 | Sopravvenienze passive | pág. 118, precedente |
| 32 | - Costi accesso segnale televisivo LNP | pág. 118, precedente |
| 33 | - Mutualità incassi gare TIM Cup | pág. 118, precedente |
| 34 | - Contributi, ammende, spese LNP-FIGC-UEFA | pág. 118, precedente |
| 35 | - Costi per acquisti biglietti gare in trasferta | pág. 118, Jev 0.99 |
| 36 | - Erogazioni liberali Roma | pág. 118, Jev 1 |
| 37 | - Penalità contrattuali | pág. 118, precedente |
| 38 | - Altri oneri diversi | pág. 118, Jev 1 |
| 39 | Ammortamento delle immobilizzazioni immateriali | pág. 121, Claude 0.85 |
| 40 | Ammortamento delle immobilizzazioni materiali | pág. 121, Jev 1 |
| 41 | Svalutazione dei crediti correnti | pág. 121, Jev 1 |
| 42 | Accantonamenti per rischi | pág. 62, precedente |
| 43 | Oneri da gestione dei diritti pluriennali prestazioni calciatori | pág. 119, precedente |

### Meta

```text
2018: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): fila = 225. el resultado impreso es el del Gruppo (25.498); el consolidado (25.723) incluye la pérdida de terzi; se suma del lado financiero para no inflar ingresos (to-do 155/156, arreglo manual 2026-10-07)
2018: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): fila = 0. el total se contaba como una línea más; los costos son sus renglones + Ammortamenti (L1920) y Accantonamenti (L1921), impresos fuera del total (to-do 156, arreglo manual 2026-10-07)
2018: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): fila = 82. la variación de existencias (82) reduce costos; los gastos se toman en valor absoluto, así que va del lado de ingresos con el mismo efecto en el resultado (arreglo manual 2026-10-07; to-do 156)
2018: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-08): fila = 69.561. Guido 2026-10-07: gestión de jugadores en bruto (Proventi de la nota 30), como 2019, 2022 y 2025
2018: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-08): fila = (23.639). Guido 2026-10-07: gestión de jugadores en bruto (Oneri de la nota 30)
tools/cargar.mjs (2026-10-08). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

## 2017

### Ingresos

```text
2017: cargado por tools/cargar.mjs (2026-10-08) desde Clubes/Italia/AS Roma/AS-Roma-bilancio-2017.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Italia/AS Roma/AS-Roma-bilancio-2017.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Ricavi da gare | pág. 56, precedente |
| 2 | Altri ricavi delle vendite e delle prestazioni | pág. 56, precedente |
| 3 | b) Sponsorizzazioni | pág. 56, precedente |
| 4 | c) Diritti televisivi e diritti d'immagine | pág. 56, precedente |
| 5 | d) Proventi pubblicitari | pág. 56, precedente |
| 6 | e) Altri proventi | pág. 56, Jev 1 |
| 7 | Gestione operativa netta calciatori | pág. 56, Claude 0.8 |

### Gastos

```text
tools/cargar.mjs (2026-10-08)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Acquisti materie di consumo | pág. 56, precedente |
| 2 | Variazione delle rimanenze | pág. 56, precedente |
| 3 | Spese per Servizi | pág. 56, precedente |
| 4 | Spese per godimento beni di terzi | pág. 56, precedente |
| 5 | Spese per il personale | pág. 56, precedente |
| 6 | Oneri diversi di gestione | pág. 56, Jev 0.95 |
| 7 | Ammortamenti e svalutazioni | pág. 56, precedente |
| 8 | Accantonamenti per rischi | pág. 56, precedente |

### Meta

```text
tools/cargar.mjs (2026-10-08). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

## 2016

### Ingresos

```text
2016: cargado por tools/cargar.mjs (2026-10-08) desde Clubes/Italia/AS Roma/AS-Roma-bilancio-2016.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Italia/AS Roma/AS-Roma-bilancio-2016.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Ricavi da gare | pág. 60, precedente |
| 2 | Altri ricavi delle vendite e delle prestazioni | pág. 60, precedente |
| 3 | b) Sponsorizzazioni | pág. 60, precedente |
| 4 | c) Diritti televisivi e diritti d'immagine | pág. 60, precedente |
| 5 | d) Proventi pubblicitari | pág. 60, precedente |
| 6 | e) Altri proventi | pág. 60, Jev 1 |
| 7 | Gestione operativa netta calciatori | pág. 60, Claude 0.8 |

### Gastos

```text
tools/cargar.mjs (2026-10-08)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Acquisti materie di consumo | pág. 60, precedente |
| 2 | Variazione delle rimanenze | pág. 60, precedente |
| 3 | Spese per Servizi | pág. 60, precedente |
| 4 | Spese per godimento beni di terzi | pág. 60, precedente |
| 5 | Spese per il personale | pág. 60, precedente |
| 6 | Oneri diversi di gestione | pág. 60, Jev 0.95 |
| 7 | Ammortamenti e svalutazioni | pág. 60, precedente |
| 8 | Accantonamenti per rischi | pág. 60, precedente |

### Meta

```text
tools/cargar.mjs (2026-10-08). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

## 2015

### Ingresos

```text
2015: cargado por tools/cargar.mjs (2026-10-08) desde Clubes/Italia/AS Roma/AS-Roma-bilancio-2015.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Italia/AS Roma/AS-Roma-bilancio-2015.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Ricavi da gare | pág. 66, precedente |
| 2 | Altri ricavi delle vendite e delle prestazioni | pág. 66, precedente |
| 3 | b) Sponsorizzazioni | pág. 66, precedente |
| 4 | c) Diritti televisivi e diritti d'immagine | pág. 66, precedente |
| 5 | d) Proventi pubblicitari | pág. 66, precedente |
| 6 | e) Altri proventi | pág. 66, Jev 1 |
| 7 | Gestione operativa netta calciatori | pág. 66, Claude 0.8 |

### Gastos

```text
tools/cargar.mjs (2026-10-08)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Acquisti materie di consumo | pág. 66, precedente |
| 2 | Variazione delle rimanenze | pág. 66, precedente |
| 3 | Spese per Servizi | pág. 66, precedente |
| 4 | Spese per godimento beni di terzi | pág. 66, precedente |
| 5 | Spese per il personale | pág. 66, precedente |
| 6 | Oneri diversi di gestione | pág. 66, Jev 0.95 |
| 7 | Ammortamenti e svalutazioni | pág. 66, precedente |
| 8 | Accantonamenti per rischi | pág. 66, precedente |

### Meta

```text
tools/cargar.mjs (2026-10-08). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

## 2014

### Ingresos

```text
2014: cargado por tools/cargar.mjs (2026-10-08) desde Clubes/Italia/AS Roma/AS-Roma-bilancio-2014.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Italia/AS Roma/AS-Roma-bilancio-2014.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Ricavi da gare | pág. 63, precedente |
| 2 | Altri ricavi delle vendite e delle prestazioni | pág. 63, precedente |
| 3 | b) Sponsorizzazioni | pág. 63, precedente |
| 4 | c) Diritti televisivi e diritti d'immagine | pág. 63, precedente |
| 5 | d) Proventi pubblicitari | pág. 63, precedente |
| 6 | e) Altri proventi | pág. 63, Jev 1 |
| 7 | Gestione operativa netta calciatori | pág. 63, Claude 0.8 |

### Gastos

```text
tools/cargar.mjs (2026-10-08)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Acquisti materie di consumo | pág. 63, precedente |
| 2 | Variazione delle rimanenze | pág. 63, precedente |
| 3 | Spese per Servizi | pág. 63, precedente |
| 4 | Spese per godimento beni di terzi | pág. 63, precedente |
| 5 | Spese per il personale | pág. 63, precedente |
| 6 | Oneri diversi di gestione | pág. 63, Jev 0.95 |
| 7 | Ammortamenti e svalutazioni | pág. 63, precedente |
| 8 | Accantonamenti per rischi | pág. 63, precedente |

### Meta

```text
tools/cargar.mjs (2026-10-08). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

## 2013

### Ingresos

```text
2013: cargado por tools/cargar.mjs (2026-10-08) desde Clubes/Italia/AS Roma/AS-Roma-bilancio-2013.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Italia/AS Roma/AS-Roma-bilancio-2013.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Ricavi da gare | pág. 66, precedente |
| 2 | Altri ricavi delle vendite e delle prestazioni | pág. 66, precedente |
| 3 | b) Sponsorizzazioni | pág. 66, precedente |
| 4 | c) Diritti televisivi e diritti d'immagine | pág. 66, precedente |
| 5 | d) Proventi pubblicitari | pág. 66, precedente |
| 6 | e) Altri proventi | pág. 66, Jev 1 |
| 7 | Gestione operativa netta calciatori | pág. 66, Claude 0.8 |

### Gastos

```text
tools/cargar.mjs (2026-10-08)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Acquisti materie di consumo | pág. 66, precedente |
| 2 | Variazione delle rimanenze | pág. 66, precedente |
| 3 | Spese per Servizi | pág. 66, precedente |
| 4 | Spese per godimento beni di terzi | pág. 66, precedente |
| 5 | Spese per il personale | pág. 66, precedente |
| 6 | Oneri diversi di gestione | pág. 66, Jev 0.95 |
| 7 | Ammortamenti e svalutazioni | pág. 66, precedente |

### Meta

```text
tools/cargar.mjs (2026-10-08). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

## 2012

### Ingresos

```text
2012: cargado por tools/cargar.mjs (2026-10-09) desde Clubes/Italia/AS Roma/AS-Roma-bilancio-2012.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Italia/AS Roma/AS-Roma-bilancio-2012.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Campionato | pág. 136, Jev 0.94 |
| 2 | Coppe europee | pág. 136, precedente |
| 3 | Tim Cup | pág. 136, precedente |
| 4 | Squadre Minori | pág. 136, Jev 0.99 |
| 5 | Gare amichevoli | pág. 136, precedente |
| 6 | Abbonamenti | pág. 136, precedente |
| 7 | Ricavi da attività editoriale | pág. 138, Jev 0.91 |
| 8 | Ricavi da vendite A.S. Roma Store | pág. 138, precedente |
| 9 | Ricavi da vendite affiliati | pág. 138, precedente |
| 10 | Ricavi da vendite corners specializzati | pág. 138, precedente |
| 11 | Ricavi per royalties | pág. 138, Jev 0.99 |
| 12 | Ricavi vendite per corrispondenza | pág. 138, precedente |
| 13 | Ricavi vendita da mobile | pág. 138, precedente |
| 14 | Ricavi diversi attività commerciale | pág. 138, precedente |
| 15 | Sponsor Tecnico Kappa | pág. 138, Jev 1 |
| 16 | Sponsor Ufficiale Wind | pág. 138, Jev 1 |
| 17 | LNP Serie A – diritti Campionato Serie A | pág. 139, Claude 0.9 |
| 18 | LNP Serie A – diritti TIM Cup | pág. 139, Claude 0.88 |
| 19 | Tornei UEFA (Europa League / Champions League) | pág. 139, precedente |
| 20 | Proventi Roma – Channel | pág. 139, Jev 0.94 |
| 21 | Commercializzazione Library AS Roma | pág. 139, Jev 0.95 |
| 22 | Proventi accessori LNP | pág. 139, Jev 0.94 |
| 23 | Altri diritti televisivi (amichevoli) | pág. 139, Jev 1 |
| 24 | d) Proventi pubblicitari | pág. 88, precedente |
| 25 | Contributi in c/esercizio e proventi LNP | pág. 140, precedente |
| 26 | Indennizzi assicurativi infortuni calciatori | pág. 140, precedente |
| 27 | Riaddebiti ad entità correlate | pág. 140, precedente |
| 28 | Proventi Campus Estivi | pág. 140, precedente |
| 29 | Proventi ritiri estivi | pág. 140, Jev 0.99 |
| 30 | Organizzazione Eventi sportivi | pág. 140, precedente |
| 31 | Addebiti di costi per trasferte e materiale sportivo | pág. 140, Jev 0.98 |
| 32 | Sopravvenienze attive | pág. 140, precedente |
| 33 | RAI (proventi canale tv Roma Channel) | pág. 140, Jev 1 |
| 34 | Proventi FIFA/UEFA/FIGC per tesserati | pág. 140, precedente |
| 35 | Altri proventi diversi | pág. 140, precedente |
| 36 | Gestione operativa netta calciatori | pág. 88, precedente |

### Gastos

```text
tools/cargar.mjs (2026-10-09)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Indumenti sportivi e divise ufficiali | pág. 141, precedente |
| 2 | Materiale sportivo tecnico | pág. 141, Claude 0.8 |
| 3 | Beni e prodotti da commercializzare | pág. 141, precedente |
| 4 | Materiale vario di consumo | pág. 141, precedente |
| 5 | Variazione delle rimanenze | pág. 88, precedente |
| 6 | Costi per tesserati | pág. 141, precedente |
| 7 | Costi per attività sportiva | pág. 141, precedente |
| 8 | Costi specifici tecnici | pág. 141, precedente |
| 9 | Costi vitto, alloggio, locomozione e trasferte | pág. 141, precedente |
| 10 | Spese assicurative | pág. 141, precedente |
| 11 | Consulenze, professionali, legali e notarili | pág. 143, Jev 1 |
| 12 | Consulenze giornalistiche, professionali e servizi merchandising. | pág. 143, Jev 0.99 |
| 13 | Spese stampa e servizi editoriali del periodico 'La Roma' | pág. 143, Jev 0.92 |
| 14 | Spese di spedizione e distribuzione periodico 'La Roma' | pág. 143, Claude 0.85 |
| 15 | Collaboratori sede | pág. 143, Jev 0.98 |
| 16 | Spese postali e telefoniche | pág. 143, Jev 1 |
| 17 | Spese di vigilanza | pág. 143, precedente |
| 18 | Spese manutenzione- gestione sede sociale e centro sportivo | pág. 143, Jev 1 |
| 19 | Spese manutenzione e gestione hardware, software e sito internet | pág. 143, Jev 1 |
| 20 | Spese per assemblee, adempimenti societari e di borsa | pág. 143, Jev 1 |
| 21 | Trasporti e trasferte | pág. 143, precedente |
| 22 | Emolumenti al Consiglio di Amministrazione/Organismo di Vigilanza | pág. 143, Jev 0.96 |
| 23 | Onorari alla società di revisione contabile | pág. 143, Jev 1 |
| 24 | Emolumenti al collegio sindacale | pág. 143, Jev 1 |
| 25 | Costo digitalizzazione Library AS Roma | pág. 143, Claude 0.8 |
| 26 | Costi di produzione Roma Channel | pág. 143, Jev 0.9 |
| 27 | Oneri di progettazione nuovo Stadio | pág. 143, ? 0.65 |
| 28 | Altre spese generali e amministrative | pág. 143, precedente |
| 29 | Spese di pubblicità e promozione | pág. 141, precedente |
| 30 | Spese per godimento beni di terzi | pág. 88, precedente |
| 31 | Salari e stipendi | pág. 145, precedente |
| 32 | Oneri sociali | pág. 145, precedente |
| 33 | T.F.R. | pág. 145, precedente |
| 34 | Altri costi (Faifc) | pág. 145, precedente |
| 35 | Oneri tributari indiretti | pág. 146, precedente |
| 36 | Sopravvenienze passive | pág. 146, precedente |
| 37 | - Costi accesso segnale televisivo LNP | pág. 146, precedente |
| 38 | - Mutualità incassi gare Tim Cup | pág. 146, precedente |
| 39 | - Contributi, ammende, spese LNP-Uefa | pág. 146, Jev 0.96 |
| 40 | - Acquisto biglietteria gare trasferta | pág. 146, Jev 1 |
| 41 | - Organizzazione eventi sportivi | pág. 146, Jev 0.92 |
| 42 | - Altri oneri diversi | pág. 146, precedente |
| 43 | Ammortamento delle immobilizzazioni immateriali | pág. 149, precedente |
| 44 | Ammortamento delle immobilizzazioni materiali | pág. 149, precedente |
| 45 | Svalutazione dei crediti correnti | pág. 149, precedente |
| 46 | Accantonamenti per rischi | pág. 88, precedente |

### Meta

```text
2012: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-08): fila = (221). Claude 2026-10-08 (Guido: to-do 179 grupo 1, a mano): diferencia entre el consolidado (58.253) y el resultado del Gruppo (58.474): resta; criterio de Roma 2018
2012: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-08): fila = 9.060. Claude 2026-10-08 (Guido: to-do 179 grupo 1, a mano): la gestión de jugadores sale neta en el estado y se carga neta como ingreso, igual que Roma 2009 y 2013 a 2017 (el vecino 2013 usa el mismo régimen)
tools/cargar.mjs (2026-10-09). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

## 2011

### Ingresos

```text
2011: cargado por tools/cargar.mjs (2026-10-09) desde Clubes/Italia/AS Roma/AS-Roma-bilancio-2011-consolidato.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Italia/AS Roma/AS-Roma-bilancio-2011-consolidato.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Ricavi da gare | pág. 68, precedente |
| 2 | Altri ricavi delle vendite e delle prestazioni | pág. 68, precedente |
| 3 | b) Sponsorizzazioni | pág. 68, precedente |
| 4 | c) Diritti televisivi e diritti d'immagine | pág. 68, precedente |
| 5 | d) Proventi pubblicitari | pág. 68, precedente |
| 6 | e) Altri proventi | pág. 68, precedente |
| 7 | Gestione operativa netta calciatori | pág. 68, precedente |

### Gastos

```text
tools/cargar.mjs (2026-10-09)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Acquisti materie di consumo | pág. 68, precedente |
| 2 | Variazione delle rimanenze | pág. 68, precedente |
| 3 | Spese per Servizi | pág. 68, precedente |
| 4 | Spese per godimento beni di terzi | pág. 68, precedente |
| 5 | Spese per il personale | pág. 68, precedente |
| 6 | Oneri diversi di gestione | pág. 68, precedente |
| 7 | Ammortamenti e svalutazioni | pág. 68, precedente |
| 8 | Accantonamenti per rischi | pág. 68, precedente |

### Meta

```text
tools/cargar.mjs (2026-10-09). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

## 2010

### Ingresos

```text
2010: cargado por tools/cargar.mjs (2026-10-09) desde Clubes/Italia/AS Roma/AS-Roma-bilancio-2010.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Italia/AS Roma/AS-Roma-bilancio-2010.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Ricavi da gare | pág. 194, precedente |
| 2 | Altri ricavi delle vendite e delle prestazioni | pág. 194, precedente |
| 3 | b) Sponsorizzazioni | pág. 194, precedente |
| 4 | c) Diritti televisivi e diritti d'immagine | pág. 194, precedente |
| 5 | d) Proventi pubblicitari | pág. 194, precedente |
| 6 | e) Altri proventi | pág. 194, precedente |
| 7 | f) Contributi in c/esercizio | pág. 194, precedente |
| 8 | Gestione operativa netta calciatori | pág. 194, precedente |

### Gastos

```text
tools/cargar.mjs (2026-10-09)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Acquisti materie di consumo | pág. 194, precedente |
| 2 | Variazione delle rimanenze | pág. 194, precedente |
| 3 | Spese per Servizi | pág. 194, precedente |
| 4 | Spese per godimento beni di terzi | pág. 194, precedente |
| 5 | Spese per il personale | pág. 194, precedente |
| 6 | Oneri diversi di gestione | pág. 194, precedente |
| 7 | Ammortamenti e svalutazioni | pág. 194, precedente |
| 8 | Accantonamenti per rischi | pág. 194, precedente |
| 9 | Risultato (utili) di terzi | pág. 194, precedente |

### Meta

```text
tools/cargar.mjs (2026-10-09). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

## 2009

### Ingresos

```text
2009: cargado por tools/cargar.mjs (2026-10-08) desde Clubes/Italia/AS Roma/AS-Roma-bilancio-2009.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Italia/AS Roma/AS-Roma-bilancio-2009.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Ricavi da gare | pág. 182, precedente |
| 2 | Altri ricavi delle vendite e delle prestazioni | pág. 182, precedente |
| 3 | b) Sponsorizzazioni | pág. 182, precedente |
| 4 | c) Diritti televisivi e diritti d'immagine | pág. 182, precedente |
| 5 | d) Proventi pubblicitari | pág. 182, precedente |
| 6 | e) Altri proventi | pág. 182, Jev 1 |
| 7 | f) Contributi in c/esercizio | pág. 182, Jev 0.97 |
| 8 | Gestione operativa netta calciatori | pág. 182, Claude 0.8 |

### Gastos

```text
tools/cargar.mjs (2026-10-08)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Acquisti materie di consumo | pág. 182, precedente |
| 2 | Variazione delle rimanenze | pág. 182, precedente |
| 3 | Spese per Servizi | pág. 182, precedente |
| 4 | Spese per godimento beni di terzi | pág. 182, precedente |
| 5 | Spese per il personale | pág. 182, precedente |
| 6 | Oneri diversi di gestione | pág. 182, Jev 0.95 |
| 7 | Ammortamenti e svalutazioni | pág. 182, precedente |
| 8 | Accantonamenti per rischi | pág. 182, precedente |

### Meta

```text
tools/cargar.mjs (2026-10-08). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

## 2008

### Ingresos

```text
2008: cargado por tools/cargar.mjs (2026-10-09) desde Clubes/Italia/AS Roma/AS-Roma-bilancio-2008.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Italia/AS Roma/AS-Roma-bilancio-2008.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | RICAVI DA GARE | pág. 168, precedente |
| 2 | ALTRI RICAVI DELLE VENDITE E DELLE PRESTAZIONI | pág. 168, precedente |
| 3 | b) Sponsorizzazioni | pág. 168, precedente |
| 4 | c) Diritti televisivi e diritti d'immagine | pág. 168, precedente |
| 5 | d) Proventi pubblicitari | pág. 168, precedente |
| 6 | e) Altri proventi | pág. 168, precedente |
| 7 | f) Contributi in c'esercizio | pág. 168, precedente |
| 8 | GESTIONE OPERATIVA NETTA CALCIATORI | pág. 168, precedente |

### Gastos

```text
tools/cargar.mjs (2026-10-09)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Acquisti materie di consumo | pág. 168, precedente |
| 2 | Variazione delle rimanenze | pág. 168, precedente |
| 3 | Spese per Servizi | pág. 168, precedente |
| 4 | Spese per godimento beni di terzi | pág. 168, precedente |
| 5 | Spese per il personale | pág. 168, precedente |
| 6 | Oneri diversi di gestione | pág. 168, precedente |
| 7 | Ammortamenti e svalutazioni | pág. 168, precedente |
| 8 | Accantonamenti per rischi | pág. 168, precedente |

### Meta

```text
tools/cargar.mjs (2026-10-09). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

## 2007

### Ingresos

```text
2007: cargado por tools/cargar.mjs (2026-10-09) desde Clubes/Italia/AS Roma/AS-Roma-bilancio-2007.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Italia/AS Roma/AS-Roma-bilancio-2007.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | RICAVI DA GARE | pág. 156, precedente |
| 2 | ALTRI RICAVI DELLE VENDITE E DELLE PRESTAZIONI | pág. 156, precedente |
| 3 | b) Sponsorizzazioni | pág. 156, precedente |
| 4 | c) Diritti televisivi e diritti d'immagine | pág. 156, precedente |
| 5 | d) Proventi pubblicitari | pág. 156, precedente |
| 6 | e) Altri proventi | pág. 156, precedente |
| 7 | f) Contributi in c/esercizio | pág. 156, precedente |
| 8 | Variazione delle rimanenze (reduce costos) | pág. 156, precedente |
| 9 | Gestione operativa netta calciatori | pág. 156, precedente |

### Gastos

```text
tools/cargar.mjs (2026-10-09)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Acquisti materie di consumo | pág. 156, precedente |
| 2 | Spese per Servizi | pág. 156, precedente |
| 3 | Spese per godimento beni di terzi | pág. 156, precedente |
| 4 | Spese per il personale | pág. 156, precedente |
| 5 | Oneri diversi di gestione | pág. 156, precedente |
| 6 | Ammortamenti e svalutazioni | pág. 156, precedente |
| 7 | Accantonamenti per rischi | pág. 156, precedente |

### Meta

```text
2007: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-08): fila = 0. Claude 2026-10-08 (Guido: to-do 179 grupo 1, a mano): el total impreso (122.064) se contaba además de sus renglones; sale la fila (como Roma 2018)
2007: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-08): fila = 238. Claude 2026-10-08 (Guido: to-do 179 grupo 1, a mano): la variación de existencias (+238) reduce costos; los gastos van en absoluto, se resta poniéndola como ingreso (criterio de Roma 2018)
2007: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-08): fila = (164). Claude 2026-10-08 (Guido: to-do 179 grupo 1, a mano): diferencia entre el consolidado 14.175 y el Gruppo 14.011: resta
2007: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-08): fila = 4.428. Claude 2026-10-08 (Guido: to-do 179 grupo 1, a mano): la gestión de jugadores sale neta en el estado y se carga neta como ingreso (criterio de Roma 2009 y 2013 a 2017); con ella el ingreso de 2007 (162.017) coincide con la columna 2007 del documento de 2008
tools/cargar.mjs (2026-10-09). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

## 2006

### Ingresos

```text
2006: cargado por tools/cargar.mjs (2026-10-09) desde Clubes/Italia/AS Roma/AS-Roma-bilancio-2006.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Italia/AS Roma/AS-Roma-bilancio-2006.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | a) Ricavi da gare | pág. 50, precedente |
| 2 | c) Altri ricavi delle vendite e delle prestazioni | pág. 50, precedente |
| 3 | 4) Incrementi immobilizzazioni per capitalizzazione vivaio | pág. 50, Jev 0.94 |
| 4 | c) Sponsorizzazioni | pág. 50, precedente |
| 5 | d) Diritti televisivi e diritti d'immagine | pág. 50, precedente |
| 6 | e) Proventi pubblicitari | pág. 50, precedente |
| 7 | f) Altri proventi | pág. 50, precedente |
| 8 | g) Contributi in c/esercizio | pág. 50, precedente |
| 9 | a) Plusvalenze da alienazioni | pág. 51, Jev 1 |
| 10 | b) Sopravvenienze attive | pág. 51, precedente |
| 11 | c) Altri proventi straordinari | pág. 51, Jev 1 |

### Gastos

```text
tools/cargar.mjs (2026-10-09)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | 6) - Acquisti materie di consumo | pág. 50, precedente |
| 2 | a) Spese per tesserati | pág. 50, Jev 0.97 |
| 3 | b) Costi per attività sportiva | pág. 50, precedente |
| 4 | c) Costi specifici tecnici | pág. 50, precedente |
| 5 | d) Costi vitto, alloggio e locomozione | pág. 50, Jev 0.99 |
| 6 | e) Spese assicurative | pág. 50, precedente |
| 7 | f) Spese amministrative e generali | pág. 50, precedente |
| 8 | g) Spese pubblicità e promozione | pág. 50, Jev 1 |
| 9 | 8) Spese godimento beni di terzi | pág. 50, Jev 1 |
| 10 | a) Salari e stipendi | pág. 50, precedente |
| 11 | b) Oneri sociali | pág. 50, precedente |
| 12 | c) Trattamento di fine rapporto | pág. 50, precedente |
| 13 | d) Trattamento di quiescenza e simili | pág. 50, precedente |
| 14 | a) Ammortamento immobilizzazioni immateriali | pág. 50, Claude 0.9 |
| 15 | b) Ammortamento immobilizzazioni materiali | pág. 50, precedente |
| 16 | c) Altre svalutazioni delle immobilizzazioni | pág. 50, precedente |
| 17 | d) Svalutazione dei crediti compresi nell'attivo circolante | pág. 50, Jev 1 |
| 18 | 11) - Variazione delle rimanenze di materie prime e merci | pág. 50, Jev 1 |
| 19 | 12) - Accantonamento per rischi | pág. 50, precedente |
| 20 | a) Oneri tributari indiretti dell'esercizio | pág. 50, Jev 1 |
| 21 | b) Sopravvenienze passive | pág. 50, precedente |
| 22 | f) Altri oneri | pág. 50, precedente |
| 23 | a) di partecipazioni | pág. 51, ? 0.6 |
| 24 | a) Minusvalenze relative ad alienazioni | pág. 51, Jev 1 |
| 25 | c) Altri oneri straordinari | pág. 51, Jev 0.98 |

### Meta

```text
tools/cargar.mjs (2026-10-09). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

## 2005

### Ingresos

```text
2005: cargado por tools/cargar.mjs (2026-10-09) desde Clubes/Italia/AS Roma/AS-Roma-bilancio-2005.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Italia/AS Roma/AS-Roma-bilancio-2005.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | – Gare campionato | pág. 163, Jev 0.99 |
| 2 | – Gare coppe | pág. 163, Jev 0.97 |
| 3 | – Altre gare | pág. 163, Jev 0.97 |
| 4 | ABBONAMENTI | pág. 163, precedente |
| 5 | b) Ricavi cessione temporanea giocatori | pág. 136, Jev 0.99 |
| 6 | - vendita riviste | pág. 164, Jev 0.99 |
| 7 | - vendita abbonamenti riviste | pág. 164, Claude 0.8 |
| 8 | - vendita altri prodotti editoriali | pág. 164, precedente |
| 9 | - vendite negozio Piazza Colonna | pág. 164, Claude 0.88 |
| 10 | - vendite negozio Via Appia | pág. 164, Claude 0.88 |
| 11 | - vendite negozio Via Cola di Rienzo | pág. 164, Claude 0.88 |
| 12 | - vendite per corrispondenza | pág. 164, Claude 0.92 |
| 13 | - vendite con automezzo mobile | pág. 164, Claude 0.9 |
| 14 | - vendite corner specializzati e altre attività | pág. 164, Claude 0.9 |
| 15 | - ricavi per *royalties | pág. 164, precedente |
| 16 | - ricavi contrattuali American Express | pág. 164, Claude 0.8 |
| 17 | - ricavi vendite per *franchising | pág. 164, Jev 0.91 |
| 18 | - ricavi diversi attività commerciale | pág. 164, precedente |
| 19 | 4) Incrementi immobilizzazioni per capitalizzazione vivaio | pág. 136, precedente |
| 20 | Sponsor ufficiale Mazda Motor Italia | pág. 165, Jev 1 |
| 21 | Sponsor tecnico Diadora – Invicta | pág. 165, Jev 1 |
| 22 | S.D.S. Società Diritti Sportivi S.r.l. | pág. 165, Claude 0.9 |
| 23 | RTI – Reti Televisivi Italia | pág. 165, Jev 0.99 |
| 24 | UEFA Champion League | pág. 165, precedente |
| 25 | S.E.D.S | pág. 165, Jev 0.95 |
| 26 | Sky Italia | pág. 165, Jev 1 |
| 27 | RAI - RAI Trade | pág. 165, Jev 1 |
| 28 | Lega Nazionale Professionisti | pág. 165, Claude 0.88 |
| 29 | Mutualità diritti televisivi fuori casa | pág. 165, Jev 1 |
| 30 | D.L.S. Media Group | pág. 166, Claude 0.88 |
| 31 | Nardelli | pág. 166, Claude 0.9 |
| 32 | Sbrizze | pág. 166, Claude 0.9 |
| 33 | 5 BI | pág. 166, Jev 0.97 |
| 34 | Proventi per inserzioni pubblicitarie 'La Roma' | pág. 166, Jev 0.97 |
| 35 | Erica Ceramiche | pág. 166, Jev 0.98 |
| 36 | Corriere dello Sport | pág. 166, Claude 0.9 |
| 37 | Colt Telecom | pág. 166, Jev 0.99 |
| 38 | Sixtus | pág. 166, Claude 0.9 |
| 39 | Klesios | pág. 166, Claude 0.9 |
| 40 | Centralpol | pág. 166, Claude 0.9 |
| 41 | Altri proventi pubblicitari | pág. 166, Claude 0.92 |
| 42 | Diritti UMTS e prestazioni accessorie | pág. 166, precedente |
| 43 | Diritti GSM e GPRS | pág. 166, precedente |
| 44 | Utilizzo fondi rischi | pág. 166, precedente |
| 45 | Indennizzi assicurativi per infortuni a calciatori | pág. 166, Jev 1 |
| 46 | Sopravvenienze attive | pág. 166, precedente |
| 47 | Royalties Diadora-Invicta | pág. 166, Jev 0.99 |
| 48 | Proventi ritiro estivo | pág. 166, precedente |
| 49 | Addebito materiale sportivo | pág. 166, precedente |
| 50 | Addebiti per biglietti trasferte | pág. 166, precedente |
| 51 | Multe a tesserati | pág. 166, Jev 1 |
| 52 | Altri proventi diversi | pág. 166, precedente |
| 53 | f) Contributi in c'esercizio | pág. 136, precedente |
| 54 | a) Plusvalenze da alienazioni | pág. 137, precedente |
| 55 | b) Sopravvenienze attive | pág. 137, precedente |
| 56 | c) Altri proventi straordinari | pág. 137, precedente |

### Gastos

```text
tools/cargar.mjs (2026-10-09)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Indumenti sportivi e di rappresentanza | pág. 167, Jev 0.98 |
| 2 | Materiale di consumo | pág. 167, precedente |
| 3 | Beni e prodotti da commercializzare | pág. 167, precedente |
| 4 | a) Spese per tesserati | pág. 136, precedente |
| 5 | b) Costi per attività sportiva | pág. 136, precedente |
| 6 | c) Costi specifici tecnici | pág. 136, precedente |
| 7 | d) Costi vitto, alloggio e locomozione | pág. 136, precedente |
| 8 | e) Spese assicurative | pág. 136, precedente |
| 9 | Consulenze professionali, legali e notarili | pág. 168, precedente |
| 10 | Collaboratori sede | pág. 168, precedente |
| 11 | Spese postali e telefoniche | pág. 168, precedente |
| 12 | Spese di vigilanza | pág. 168, precedente |
| 13 | Spese di esercizio automezzi | pág. 168, Claude 0.88 |
| 14 | Spese manutenzione e gestione sede sociale e centro sportivo | pág. 168, precedente |
| 15 | Spese assemblee, adempimenti societari e di borsa | pág. 168, Jev 1 |
| 16 | Trasporti e trasferte | pág. 168, precedente |
| 17 | Spese canale televisivo Roma Channel | pág. 168, Jev 1 |
| 18 | Manutenzione hardware, software e gestione sito internet | pág. 168, Jev 1 |
| 19 | Emolumenti al Consiglio di Amministrazione | pág. 168, precedente |
| 20 | Onorari alla società di revisione contabile | pág. 168, precedente |
| 21 | Emolumenti al collegio sindacale | pág. 168, precedente |
| 22 | Consulenti attività professionali R.I.F.S. | pág. 168, Jev 0.97 |
| 23 | Spese per la stampa ed i servizi editoriali dei periodici R.I.F.S. | pág. 168, Jev 1 |
| 24 | Consulenze e servizi da imprese R.I.F.S. | pág. 168, Jev 1 |
| 25 | Spese di spedizione e distribuzione | pág. 168, Jev 0.99 |
| 26 | Servizi e commissioni bancarie | pág. 168, Jev 1 |
| 27 | Altre spese generali e amministrative | pág. 168, precedente |
| 28 | g) Spese pubblicità e promozione | pág. 136, precedente |
| 29 | a) Salari e stipendi | pág. 136, precedente |
| 30 | b) Oneri sociali | pág. 136, precedente |
| 31 | c) Trattamento di fine rapporto | pág. 136, precedente |
| 32 | d) Trattamento di quiescenza e simili | pág. 136, precedente |
| 33 | Costi d'impianto e di ampliamento | pág. 169, Jev 0.96 |
| 34 | Marchi | pág. 169, Jev 0.97 |
| 35 | Avviamento | pág. 169, Claude 0.85 |
| 36 | Capitalizzazioni costi del vivaio | pág. 169, Claude 0.8 |
| 37 | Diritti pluriennali prestazioni calciatori | pág. 169, Jev 0.97 |
| 38 | Oneri pluriennali ex art. 18 bis L.91/81 | pág. 169, precedente |
| 39 | Altre immobilizzazioni immateriali | pág. 169, Jev 0.99 |
| 40 | Terreni e fabbricati | pág. 170, Jev 1 |
| 41 | Impianti e macchinario | pág. 170, Jev 0.99 |
| 42 | Attrezzature Industriali e commerciali | pág. 170, Jev 1 |
| 43 | Altri beni | pág. 170, Claude 0.9 |
| 44 | c) Altre svalutazioni delle immobilizzazioni | pág. 136, precedente |
| 45 | d) Svalutazione dei crediti compresi nell'attivo circolante | pág. 136, precedente |
| 46 | a) Oneri tributari indiretti dell'esercizio | pág. 136, precedente |
| 47 | b) Sopravvenienze passive | pág. 136, precedente |
| 48 | f) Altri oneri | pág. 136, precedente |
| 49 | a) Minusvalenze relative ad alienazioni | pág. 137, precedente |
| 50 | b) Imposte esercizi precedenti | pág. 137, precedente |
| 51 | c) Sopravvenienze passive | pág. 137, precedente |
| 52 | d) Altri oneri | pág. 137, precedente |
| 53 | 8) Spese godimento beni di terzi | pág. 136, precedente |
| 54 | 11) Variazioni delle rimanenze di materie prime e merci | pág. 136, precedente |
| 55 | 12) Accantonamento per rischi | pág. 136, precedente |

### Meta

```text
2005: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-09): fila = 557. Claude 2026-10-08 (Guido: to-do 179 grupo 1, a mano): renglón del estado consolidado (b107-b112) impreso fuera de tabla en la transcripción; sin él el resultado no cierra (faltan 557 + 32 + 401 + 547 = 1.537 contra el 9.992 impreso)
2005: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-09): fila = 32. Claude 2026-10-08 (Guido: to-do 179 grupo 1, a mano): renglón del estado consolidado (b107-b112) impreso fuera de tabla en la transcripción; sin él el resultado no cierra (faltan 557 + 32 + 401 + 547 = 1.537 contra el 9.992 impreso)
2005: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-09): fila = 401. Claude 2026-10-08 (Guido: to-do 179 grupo 1, a mano): renglón del estado consolidado (b107-b112) impreso fuera de tabla en la transcripción; sin él el resultado no cierra (faltan 557 + 32 + 401 + 547 = 1.537 contra el 9.992 impreso)
2005: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-09): fila = (547). Claude 2026-10-08 (Guido: to-do 179 grupo 1, a mano): renglón del estado consolidado (b107-b112) impreso fuera de tabla en la transcripción; sin él el resultado no cierra (faltan 557 + 32 + 401 + 547 = 1.537 contra el 9.992 impreso)
tools/cargar.mjs (2026-10-09). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

## Fuentes

### (general)

```text
Fuentes de cada ejercicio: las agrega tools/cargar.mjs adentro de este bloque (Versión 379: hasta la 378 el esqueleto no lo traía y la
primera carga de un club dado de alta por script se revertía, "no encontré Object.assign(sources, {"; caso: Fortaleza CEIF).
```
