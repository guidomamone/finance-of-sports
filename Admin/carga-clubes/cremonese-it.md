# cremonese-it — evidencia de carga

Lo que había como comentario en `data/cremonese-it-data.js`, movido tal cual por `tools/mover-comentarios-data.mjs` (la regla:
`Admin/CONVENCIONES-DATOS.md`, "data/<club>-data.js NO LLEVA COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y
meta. Las notas de cada fila van en una tabla con su número de fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
============================================================================
data/cremonese-it-data.js — U.S. Cremonese S.p.A. (Italia).
ALTA POR SCRIPT (tools/alta-club.mjs, 2026-10-07), SIN EJERCICIOS CARGADOS TODAVÍA:
las estructuras de abajo están vacías a propósito. Los rubros, los totales
oficiales y el resto del fiscalYearMeta los agrega la etapa de carga
(tools/proponer-carga.mjs / sesión de onboarding), que es también la que
reemplaza esta cabecera por la de siempre (fuente, perímetro, categorización).

Documento que originó el alta: Clubes/Italia/Cremonese/Cremonese-bilancio-2025.pdf

De dónde salió cada campo (estado según alta-club.mjs: ok / pendiente):
  id                 ok        "cremonese-it" — slug de "Cremonese" + '-it' (convención de clubId, Admin/CONVENCIONES.md Versión 129)
  name               ok        "U.S. Cremonese S.p.A." — el .md, 9 veces (nombre del club + forma societaria)
  displayName        ok        "Cremonese" — nombre de la carpeta del club en Clubes/
  country            ok        "IT" — carpeta de país "Italia" (tabla PAISES)
  reportingCurrency  ok        "EUR" — moneda de curso legal de Italia
  fiscalYearStart    ok        "07-01" — cierre del ejercicio: contenido del .md (157 de 164 fechas de fin de mes caen en el mes 6)
  sport              ok        "futbol" — el .md nombra el fútbol 18 veces y ningún otro deporte más que eso
  brandColor         pendiente (ausente) — tools/brand-color-reference/ (footylogos): [italia] cremonese: #ED1C24 Red, #808285 Grey, #CF9C51 Gold, #0A4A9B Dark Blue
  anio               ok        2025 — nombre del archivo (misma regla que onboard.mjs --quien), confirmado por las fechas de cierre del .md
  cierre             ok        "2025-06-30" — año del ejercicio + mes de cierre (contenido del .md (157 de 164 fechas de fin de mes caen en el mes 6))
  reportType         ok        "official_balance_sheet" — el .md tiene un estado contable (resultados / balance) y el nombre del archivo no sugiere otro tipo
  perimetro          ok        "individual" — el .md no presenta estados consolidados (0 menciones de "consolidado")
  currency           ok        "EUR" — moneda de curso legal de Italia (tabla PAISES de alta-club.mjs)
  fxRef              ok        "EUR@2025-06-30" — el documento no declara tipo de cambio; FX_CLOSE ya tiene EUR@2025-06-30 = 0.8532 (Cierre BCE al 30/6/2025 (1 EUR = 1,172 USD))
  sourceId           ok        "cremonese-it-bilancio-2025" — clubId + nombre del archivo en slug
  liga               pendiente null — no aparece en los rosters cacheados de 2025 (it-seriea): puede haber jugado otra división

FISCAL YEAR META PROPUESTO para 2025 (NO registrado: un ejercicio con meta y
sin rubros se vería en el sitio como un año en cero, y "sin dato no es cero"):
  2025: {"reportType":"official_balance_sheet","currency":"EUR","fxRef":"EUR@2025-06-30","sourceId":"cremonese-it-bilancio-2025"}
============================================================================
```

_de data/clubs.js:_

```text
Cremonese: alta por tools/alta-club.mjs (2026-10-07) desde Clubes/Italia/Cremonese/Cremonese-bilancio-2025.pdf.
brandColor y su procedencia: fuentes/Italia/Cremonese.md.
```

_de data/club-leagues/it.js:_

```text
Cremonese (alta-club.mjs, 2026-10-07): SIN VERIFICAR (no aparece en los rosters cacheados de 2025 (it-seriea): puede haber jugado otra división).
```

## 2025

### Ingresos

```text
2025: cargado por tools/cargar.mjs (2026-10-07) desde Clubes/Italia/Cremonese/Cremonese-bilancio-2025.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Italia/Cremonese/Cremonese-bilancio-2025.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Gare di campionato part. In casa 1^ squadra | pág. 41, Jev 0.99 |
| 2 | Abbonamenti stagione sportiva | pág. 41, Jev 1 |
| 3 | Gare Coppa Italia | pág. 41, Jev 0.99 |
| 4 | Gare del settore giovanile | pág. 41, Jev 0.95 |
| 5 | Gare amichevoli e altri | pág. 41, Claude 0.85 |
| 6 | Provvidenze e contributi dalla mutualità | pág. 41, precedente |
| 7 | Contributo solidarietà | pág. 41, precedente |
| 8 | Contributo progetto solidarietà lega | pág. 41, precedente |
| 9 | Proventi da sponsors ufficiali e istituzionali | pág. 41, precedente |
| 10 | Proventi da sponsors tecnici e fornitori ufficiali | pág. 41, precedente |
| 11 | Proventi pubblicitari e altri sponsors | pág. 41, precedente |
| 12 | Proventi televisivi campionato | pág. 41, precedente |
| 13 | Proventi televisivi Coppa Italia | pág. 42, precedente |
| 14 | Proventi da contratto RAI Com | pág. 42, precedente |
| 15 | Ricavi da cessione temporanea prestaz calciat. | pág. 42, precedente |
| 16 | Plusv, da cessione diritti pluriennali calciatori | pág. 42, precedente |
| 17 | Premi di valorizz, preparaz, contr solid e altri calc | pág. 42, precedente |
| 18 | Ricavi da attività varie del SG | pág. 42, precedente |
| 19 | Affitti attivi | pág. 42, precedente |
| 20 | Ricavi commerciali e royalties | pág. 42, precedente |
| 21 | Altri ricavi e proventi | pág. 42, precedente |

### Gastos

```text
tools/cargar.mjs (2026-10-07)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | 6) per materie prime, sussidiarie, di consumo e di merci | pág. 5, Jev 0.99 |
| 2 | Costi per attività sportiva | pág. 43, precedente |
| 3 | Vitto, alloggio e locomozioni gare | pág. 43, Jev 1 |
| 4 | Costi specifici tecnici | pág. 44, precedente |
| 5 | Costi per intermediazioni | pág. 44, precedente |
| 6 | Servizio biglietteria, ingressi e stewarding | pág. 44, Jev 1 |
| 7 | Costi assicurativi | pág. 44, Jev 0.95 |
| 8 | Costi per servizi da banche e soc finanziarie | pág. 44, precedente |
| 9 | Costi per prestazioni al personale | pág. 44, precedente |
| 10 | Costi per utenze e spese generali | pág. 44, Jev 1 |
| 11 | Compensi e rimborsi spese a terzi | pág. 44, Jev 0.98 |
| 12 | Costi per pubblicità e propaganda | pág. 44, Jev 1 |
| 13 | Costi per manutenzioni e riparazioni | pág. 44, Jev 0.99 |
| 14 | 8) per godimento di beni di terzi | pág. 5, Jev 0.99 |
| 15 | Stipendi tesserati ed area sportiva 1° Squadra | pág. 45, Jev 1 |
| 16 | Stipendi tesserati ed area sportiva SG | pág. 45, Claude 0.85 |
| 17 | Premi a tesserati ed area sport 1° squadra | pág. 45, Jev 0.99 |
| 18 | Premi a tesserati ed area sportiva SG | pág. 45, Claude 0.85 |
| 19 | Indennità e incentivi all'esodo tesserati | pág. 45, precedente |
| 20 | Stipendi direzione | pág. 45, Jev 0.97 |
| 21 | Premi promozione personale direttivo | pág. 45, precedente |
| 22 | Altri stipendi e salari | pág. 45, precedente |
| 23 | b) oneri sociali | pág. 5, Jev 0.96 |
| 24 | Indennità di fine carriera | pág. 45, precedente |
| 25 | Trattamento di fine rapporto maturato | pág. 45, Jev 0.95 |
| 26 | e) altri costi | pág. 5, Jev 0.98 |
| 27 | a) ammortamento delle immobilizzazioni immateriali | pág. 5, Claude 0.8 |
| 28 | b) ammortamento delle immobilizzazioni materiali | pág. 5, Jev 1 |
| 29 | c) altre svalutazioni delle immobilizzazioni | pág. 5, Jev 0.93 |
| 30 | d) svalutazioni dei crediti compresi nell'attivo circolante e delle disponibilità liquide | pág. 5, Jev 1 |
| 31 | 11) variazioni delle rimanenze di materie prime, sussidiarie, di consumo e merci | pág. 5, Jev 1 |
| 32 | Oneri vari da organizzazione competizioni | pág. 46, Jev 0.99 |
| 33 | Tasse iscrizioni campionato e gare | pág. 46, Claude 0.85 |
| 34 | Costi per acquisizione temporanea calciatori | pág. 46, Jev 0.98 |
| 35 | Minusv. da cessione diritti pluriennali calciatori | pág. 46, Jev 1 |
| 36 | Costi per premi ex-art 103 comma 3 NOIF | pág. 46, precedente |
| 37 | Altri costi per premi e indennizzi | pág. 46, precedente |
| 38 | Altri oneri da gestione calciatori | pág. 46, Jev 0.99 |
| 39 | Contributo di solidarietà alla Lega B | pág. 46, precedente |
| 40 | Multe gare ed imposte e tasse varie | pág. 46, precedente |
| 41 | Altri | pág. 46, Jev 0.97 |

### Meta

```text
2025: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): fila = 24.755. proventi y oneri con la misma etiqueta 'altri'; el oneri (L190) impreso en positivo; Totale C (L192) (4.261) (to-do 155/156, arreglo manual 2026-10-07),
2025: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): fila = 24.755. proventi y oneri con la misma etiqueta 'altri'; el oneri (L190) impreso en positivo; Totale C (L192) (4.261) (to-do 155/156, arreglo manual 2026-10-07)
2025: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): fila = (29.016). ver el anterior (to-do 155/156, arreglo manual 2026-10-07)
tools/cargar.mjs (2026-10-07). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
2025: verificado 2026-10-09 contra roster cacheado de "2024–25 Serie B" (cierre 30/06/2025) (tools/club-league-reference/it.json), "Cremonese"
```

## 2024

### Ingresos

```text
2024: cargado por tools/cargar.mjs (2026-10-08) desde Clubes/Italia/Cremonese/Cremonese-bilancio-2024.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Italia/Cremonese/Cremonese-bilancio-2024.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Gare di campionato part. In casa 1^ squadra | pág. 41, precedente |
| 2 | Abbonamenti stagione sportiva | pág. 41, precedente |
| 3 | Gare Coppa Italia | pág. 41, precedente |
| 4 | Gare amichevoli e altri | pág. 41, precedente |
| 5 | Ricavi tessera tifoso | pág. 41, ? 0.7 |
| 6 | Provvidenze e contributi in c/esercizio | pág. 41, precedente |
| 7 | Paracadute retrocessione | pág. 41, precedente |
| 8 | Proventi da sponsors ufficiali e istituzionali | pág. 41, precedente |
| 9 | Proventi da sponsors tecnici e fornitori ufficiali | pág. 41, precedente |
| 10 | Proventi pubblicitari e altri sponsors | pág. 41, precedente |
| 11 | Proventi televisivi campionato | pág. 41, precedente |
| 12 | Proventi televisivi Coppa Italia | pág. 41, precedente |
| 13 | Proventi da contratto RAI Com | pág. 41, precedente |
| 14 | Ricavi da cessione temporanea prestaz calciat. | pág. 41, precedente |
| 15 | Plusv, da cessione diritti pluriennali calciatori | pág. 41, precedente |
| 16 | Premi di valorizz, preparaz, contr solid e altri calc | pág. 41, precedente |
| 17 | Ricavi da attività varie del SG | pág. 41, precedente |
| 18 | Affitti attivi | pág. 42, precedente |
| 19 | Ricavi commerciali e royalties | pág. 42, precedente |
| 20 | Altri ricavi e proventi | pág. 42, precedente |

### Gastos

```text
tools/cargar.mjs (2026-10-08)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | 6) per materie prime, sussidiarie, di consumo e di merci | pág. 4, precedente |
| 2 | Costi per attività sportiva | pág. 43, precedente |
| 3 | Vitto, alloggio e locomozioni gare | pág. 43, precedente |
| 4 | Costi specifici tecnici | pág. 43, precedente |
| 5 | Costi per intermediazioni | pág. 43, precedente |
| 6 | Servizio biglietteria, ingressi e stewarding | pág. 44, precedente |
| 7 | Costi assicurativi | pág. 44, precedente |
| 8 | Costi per servizi da banche e soc finanziarie | pág. 44, precedente |
| 9 | Costi per prestazioni al personale | pág. 44, precedente |
| 10 | Costi per utenze e spese generali | pág. 44, precedente |
| 11 | Compensi e rimborsi spese a terzi | pág. 44, precedente |
| 12 | Costi per pubblicità e propaganda | pág. 44, precedente |
| 13 | Costi per manutenzioni e riparazioni | pág. 44, precedente |
| 14 | 8) per godimento di beni di terzi | pág. 4, precedente |
| 15 | a) salari e stipendi | pág. 4, Jev 0.99 |
| 16 | b) oneri sociali | pág. 4, precedente |
| 17 | c) trattamento di fine rapporto | pág. 4, Jev 0.99 |
| 18 | a) ammortamento delle immobilizzazioni immateriali | pág. 4, precedente |
| 19 | b) ammortamento delle immobilizzazioni materiali | pág. 4, precedente |
| 20 | c) altre svalutazioni delle immobilizzazioni | pág. 5, precedente |
| 21 | d) svalutazioni dei crediti compresi nell'attivo circolante e delle disponibilità liquide | pág. 5, precedente |
| 22 | Oneri vari da organizzazione competizioni | pág. 46, precedente |
| 23 | Tasse iscrizioni campionato e gare | pág. 46, precedente |
| 24 | Costi per acquisizione temporanea calciatori | pág. 46, precedente |
| 25 | Minusv. da cessione diritti pluriennali calciatori | pág. 46, precedente |
| 26 | Costi per premi ex-art 103 comma 3 NOIF | pág. 46, precedente |
| 27 | Altri oneri da gestione calciatori | pág. 46, precedente |
| 28 | Contributo di solidarietà alla Lega B | pág. 46, precedente |
| 29 | Multe gare ed imposte e tasse varie | pág. 46, precedente |
| 30 | Altri | pág. 46, precedente |

### Meta

```text
tools/cargar.mjs (2026-10-08). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
2024: tools/cargar.mjs 2026-10-08, verificado contra roster cacheado de "2023–24 Serie B" (tools/club-league-reference/it.json), coincidencia e
```

## 2023

### Ingresos

```text
2023: cargado por tools/cargar.mjs (2026-10-08) desde Clubes/Italia/Cremonese/Cremonese-bilancio-2023.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Italia/Cremonese/Cremonese-bilancio-2023.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Gare di campionato part. In casa 1^ squadra | pág. 32, precedente |
| 2 | Abbonamenti stagione sportiva | pág. 32, precedente |
| 3 | Gare Coppa Italia | pág. 32, precedente |
| 4 | Gare amichevoli e altri | pág. 32, precedente |
| 5 | Ricavi tessera tifoso | pág. 32, precedente |
| 6 | Provvidenze e contributi in c/esercizio | pág. 32, precedente |
| 7 | Proventi da sponsors ufficiali e istituzionali | pág. 32, precedente |
| 8 | Proventi da sponsors tecnici e fornitori ufficiali | pág. 32, precedente |
| 9 | Proventi pubblicitari e altri sponsors | pág. 32, precedente |
| 10 | Proventi televisivi campionato | pág. 32, precedente |
| 11 | Proventi televisivi Coppa Italia | pág. 32, precedente |
| 12 | Proventi da contratto RAI Com | pág. 32, precedente |
| 13 | Ricavi da cessione temporanea prestaz calciat. | pág. 32, precedente |
| 14 | Plusv. da cessione diritti pluriennali calciatori | pág. 32, precedente |
| 15 | Premi di valorizz, preparaz, contr solid e altri calc | pág. 32, precedente |
| 16 | Ricavi da attività varie del SG | pág. 32, precedente |
| 17 | Affitti attivi | pág. 32, precedente |
| 18 | Ricavi commerciali e royalties | pág. 32, precedente |
| 19 | Altri ricavi e proventi | pág. 32, precedente |

### Gastos

```text
tools/cargar.mjs (2026-10-08)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | 6) per materie prime, sussidiarie, di consumo e di merci | pág. 5, precedente |
| 2 | Costi per attività sportiva | pág. 33, precedente |
| 3 | Vitto, alloggio e locomozioni gare | pág. 33, precedente |
| 4 | Costi specifici tecnici | pág. 33, precedente |
| 5 | Costi per intermediazioni | pág. 33, precedente |
| 6 | Servizio biglietteria, ingressi e stewarding | pág. 33, precedente |
| 7 | Costi assicurativi | pág. 33, precedente |
| 8 | Costi per servizi da banche e soc finanziarie | pág. 33, precedente |
| 9 | Costi per prestazioni al personale | pág. 33, precedente |
| 10 | Costi per utenze e spese generali | pág. 33, precedente |
| 11 | Compensi e rimborsi spese a terzi | pág. 33, precedente |
| 12 | Costi per pubblicità e propaganda | pág. 33, precedente |
| 13 | Costi per manutenzioni e riparazioni | pág. 34, precedente |
| 14 | 8) per godimento di beni di terzi | pág. 5, precedente |
| 15 | a) salari e stipendi | pág. 5, precedente |
| 16 | b) oneri sociali | pág. 5, precedente |
| 17 | c) trattamento di fine rapporto | pág. 5, precedente |
| 18 | e) altri costi | pág. 5, precedente |
| 19 | a) ammortamento delle immobilizzazioni immateriali | pág. 5, precedente |
| 20 | b) ammortamento delle immobilizzazioni materiali | pág. 5, precedente |
| 21 | c) altre svalutazioni delle immobilizzazioni | pág. 5, precedente |
| 22 | d) svalutazioni dei crediti compresi nell'attivo circolante e delle disponibilità liquide | pág. 5, precedente |
| 23 | Oneri vari da organizzazione competizioni | pág. 35, precedente |
| 24 | Tasse iscrizioni campionato e gare | pág. 35, precedente |
| 25 | Costi per acquisizione temporanea calciatori | pág. 35, precedente |
| 26 | Minusv. da cessione diritti pluriennali calciatori | pág. 35, precedente |
| 27 | Costi per premi ex-art 103 comma 3 NOIF | pág. 35, precedente |
| 28 | Altri oneri da gestione calciatori | pág. 35, precedente |
| 29 | Contributo di solidarietà alla Lega B | pág. 35, precedente |
| 30 | Multe gare ed imposte e tasse varie | pág. 35, precedente |
| 31 | Altri | pág. 35, precedente |

### Meta

```text
tools/cargar.mjs (2026-10-08). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
2023: tools/cargar.mjs 2026-10-08, verificado contra roster cacheado de "2022–23 Serie A" (tools/club-league-reference/it.json), coincidencia e
```

## 2022

### Ingresos

```text
2022: cargado por tools/cargar.mjs (2026-10-08) desde Clubes/Italia/Cremonese/Cremonese-bilancio-2022.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Italia/Cremonese/Cremonese-bilancio-2022.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Gare di campionato part. In casa 1^ squadra | pág. 28, precedente |
| 2 | Abbonamenti stagione sportiva | pág. 28, precedente |
| 3 | Gare Coppa Italia | pág. 28, precedente |
| 4 | Ricavi tessera tifoso | pág. 28, precedente |
| 5 | Provvidenze e contributi in c/esercizio | pág. 28, precedente |
| 6 | Proventi da sponsors ufficiali e istituzionali | pág. 28, precedente |
| 7 | Proventi da sponsors tecnici e fornitori ufficiali | pág. 28, precedente |
| 8 | Proventi pubblicitari e altri sponsors | pág. 28, precedente |
| 9 | Concessioni radio televisive | pág. 28, precedente |
| 10 | Proventi da contratto RAI Com | pág. 28, precedente |
| 11 | Ricavi da cessione temporanea prestaz calciat. | pág. 28, precedente |
| 12 | Plusv, da cessione diritti pluriennali calciatori | pág. 28, precedente |
| 13 | Premi di valorizz, preparaz, contr solid e altri calc | pág. 28, precedente |
| 14 | Affitti attivi | pág. 28, precedente |
| 15 | Ricavi commerciali e royalties | pág. 28, precedente |
| 16 | Altri ricavi e proventi | pág. 28, precedente |

### Gastos

```text
tools/cargar.mjs (2026-10-08)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | 6) per materie prime, sussidiarie, di consumo e di merci | pág. 5, precedente |
| 2 | Costi per Tesserati | pág. 29, precedente |
| 3 | Vitto, alloggio e locomozioni gare | pág. 29, precedente |
| 4 | Costi specifici tecnici | pág. 29, precedente |
| 5 | Costi per attività sportiva | pág. 29, precedente |
| 6 | Servizio biglietteria, ingressi e pulizie stadio | pág. 29, Jev 0.99 |
| 7 | Assicurative e previdenziali | pág. 29, Jev 0.92 |
| 8 | Amministrative e generali | pág. 29, Jev 1 |
| 9 | 8) per godimento di beni di terzi | pág. 5, precedente |
| 10 | a) salari e stipendi | pág. 5, precedente |
| 11 | b) oneri sociali | pág. 5, precedente |
| 12 | c) trattamento di fine rapporto | pág. 5, precedente |
| 13 | a) ammortamento delle immobilizzazioni immateriali | pág. 5, precedente |
| 14 | b) ammortamento delle immobilizzazioni materiali | pág. 5, precedente |
| 15 | c) altre svalutazioni delle immobilizzazioni | pág. 5, precedente |
| 16 | Spese varie organizzazione gare | pág. 31, Jev 0.99 |
| 17 | Tasse iscrizioni campionato e gare | pág. 31, precedente |
| 18 | Costi per acquisizione temporanea calciatori | pág. 31, precedente |
| 19 | Costi per premi ex-art 103 comma 3 NOIF | pág. 31, precedente |
| 20 | Altri oneri da gestione calciatori | pág. 31, precedente |
| 21 | Spese riscossione, penali FIGC, imp e tasse | pág. 31, Claude 0.8 |
| 22 | Oneri per accordi transattivi e sopravvenienze | pág. 31, ? 0.6 |
| 23 | Altri | pág. 31, precedente |

### Meta

```text
tools/cargar.mjs (2026-10-08). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
2022: tools/cargar.mjs 2026-10-08, verificado contra roster cacheado de "2021–22 Serie B" (tools/club-league-reference/it.json), coincidencia e
```

## Gestiones

_antes de Paolo Rossi (data/gestiones/it.js):_

```text
Rossi: la lista de presidentes da solo el año de arranque (2017); 01/01 por convención.
```

## Fuentes

### (general)

```text
Fuentes de cada ejercicio: las agrega tools/cargar.mjs adentro de este bloque (Versión 379: hasta la 378 el esqueleto no lo traía y la
primera carga de un club dado de alta por script se revertía, "no encontré Object.assign(sources, {"; caso: Fortaleza CEIF).
```

### cremonese-it-bilancio-2025

_note (data/):_

```text
Cargado por tools/cargar.mjs (2026-10-07) desde la transcripción Clubes/Italia/Cremonese/Cremonese-bilancio-2025.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### cremonese-it-bilancio-2024

_note (data/):_

```text
Cargado por tools/cargar.mjs (2026-10-08) desde la transcripción Clubes/Italia/Cremonese/Cremonese-bilancio-2024.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### cremonese-it-bilancio-2022

_note (data/):_

```text
Cargado por tools/cargar.mjs (2026-10-08) desde la transcripción Clubes/Italia/Cremonese/Cremonese-bilancio-2022.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### cremonese-it-bilancio-2023

_note (data/):_

```text
Cargado por tools/cargar.mjs (2026-10-08) desde la transcripción Clubes/Italia/Cremonese/Cremonese-bilancio-2023.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```
