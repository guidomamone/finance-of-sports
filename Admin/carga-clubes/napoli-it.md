# napoli-it — evidencia de carga

Lo que había como comentario en `data/it/napoli-it-data.js`, movido tal cual por `tools/archivo/mover-comentarios-data.mjs` (la regla:
`Admin/CONVENCIONES-DATOS.md`, "data/<país>/<club>-data.js NO LLEVA COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y
meta. Las notas de cada fila van en una tabla con su número de fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
============================================================================
data/it/napoli-it-data.js — SSC Napoli S.p.A. (Italia).
ALTA POR SCRIPT (tools/alta-club.mjs, 2026-10-07), SIN EJERCICIOS CARGADOS TODAVÍA:
las estructuras de abajo están vacías a propósito. Los rubros, los totales
oficiales y el resto del fiscalYearMeta los agrega la etapa de carga
(tools/proponer-carga.mjs / sesión de onboarding), que es también la que
reemplaza esta cabecera por la de siempre (fuente, perímetro, categorización).

Documento que originó el alta: Clubes/Italia/Napoli/Napoli-bilancio-2025.pdf

De dónde salió cada campo (estado según alta-club.mjs: ok / pendiente):
  id                 ok        "napoli-it" — slug de "Napoli" + '-it' (convención de clubId, Admin/CONVENCIONES.md Versión 129)
  name               ok        "SSC Napoli S.p.A." — el .md, 67 veces (nombre del club + forma societaria)
  displayName        ok        "Napoli" — nombre de la carpeta del club en Clubes/
  country            ok        "IT" — carpeta de país "Italia" (tabla PAISES)
  reportingCurrency  ok        "EUR" — moneda de curso legal de Italia
  fiscalYearStart    ok        "07-01" — cierre del ejercicio: contenido del .md (190 de 198 fechas de fin de mes caen en el mes 6)
  sport              ok        "futbol" — el .md nombra el fútbol 27 veces y ningún otro deporte más que eso
  brandColor         pendiente (ausente) — tools/brand-color-reference/ (footylogos): [italia] napoli: #00ABE7 Blue, #FFFFFF White
  anio               ok        2025 — nombre del archivo (misma regla que onboard.mjs --quien), confirmado por las fechas de cierre del .md
  cierre             ok        "2025-06-30" — año del ejercicio + mes de cierre (contenido del .md (190 de 198 fechas de fin de mes caen en el mes 6))
  reportType         ok        "official_balance_sheet" — el .md tiene un estado contable (resultados / balance) y el nombre del archivo no sugiere otro tipo
  perimetro          ok        "individual" — ajuste manual (Admin/registros/ajustes-manuales.jsonl, perimetro-senales 2026-10-06): perimetro-senales.mjs: 0 documento(s) con los dos estados votan —; 6 ejerc
  currency           ok        "EUR" — moneda de curso legal de Italia (tabla PAISES de alta-club.mjs)
  fxRef              ok        "EUR@2025-06-30" — el documento no declara tipo de cambio; FX_CLOSE ya tiene EUR@2025-06-30 = 0.8532 (Cierre BCE al 30/6/2025 (1 EUR = 1,172 USD))
  sourceId           ok        "napoli-it-bilancio-2025" — clubId + nombre del archivo en slug
  liga               ok        "it-seriea" — roster cacheado de "2024–25 Serie A" (tools/club-league-reference/it.json), coincidencia exacta "Napoli"

FISCAL YEAR META PROPUESTO para 2025 (NO registrado: un ejercicio con meta y
sin rubros se vería en el sitio como un año en cero, y "sin dato no es cero"):
  2025: {"reportType":"official_balance_sheet","currency":"EUR","fxRef":"EUR@2025-06-30","sourceId":"napoli-it-bilancio-2025"}
============================================================================
```

_de data/clubs.js:_

```text
Napoli: alta por tools/alta-club.mjs (2026-10-07) desde Clubes/Italia/Napoli/Napoli-bilancio-2025.pdf.
brandColor y su procedencia: Admin/sourcing/Italia/Napoli.md.
```

_de data/club-leagues/it.js:_

```text
Napoli (alta-club.mjs, 2026-10-07): verificado contra roster cacheado de "2024–25 Serie A" (tools/club-league-reference/it.json), coincidencia exacta "Napoli".
```

## 2025

### Ingresos

```text
2025: cargado por tools/cargar.mjs (2026-10-07) desde Clubes/Italia/Napoli/Napoli-bilancio-2025.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Italia/Napoli/Napoli-bilancio-2025.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | - Gare Campionato | pág. 44, Claude 0.95 |
| 2 | - Gare Coppa Italia | pág. 44, Jev 0.91 |
| 3 | - Altre gare - amichevoli | pág. 44, Jev 0.92 |
| 4 | b) percentuale su incassi gare da squadre ospitanti | pág. 6, Jev 0.97 |
| 5 | - Gare Campionato | pág. 44, Claude 0.95 |
| 6 | - Gare Coppa Italia | pág. 44, Jev 0.91 |
| 7 | d) altri ricavi da gare | pág. 6, ? 0.6 |
| 8 | Sponsor istituzionali | pág. 45, Jev 1 |
| 9 | Altre sponsorizzazioni | pág. 45, Jev 0.99 |
| 10 | Regional Sponsor | pág. 45, Jev 1 |
| 11 | Global Partner | pág. 45, Jev 0.91 |
| 12 | Principal Sponsor | pág. 45, Jev 1 |
| 13 | Official Sponsor | pág. 45, Jev 1 |
| 14 | Local Partner | pág. 45, Claude 0.95 |
| 15 | Business Partner | pág. 45, Jev 0.98 |
| 16 | Sponsor - Ospitalità | pág. 45, Jev 0.99 |
| 17 | c) proventi pubblicitari | pág. 6, Jev 1 |
| 18 | Proventi da merchandising | pág. 45, Jev 1 |
| 19 | Proventi da licensing | pág. 45, Claude 0.9 |
| 20 | Altri proventi commerciali | pág. 45, Jev 0.96 |
| 21 | Proventi televisivi - LNPA | pág. 46, Jev 1 |
| 22 | Proventi televisivi da competizione Uefa | pág. 46, Jev 0.98 |
| 23 | Proventi televisivi gare amichevoli | pág. 46, Jev 0.99 |
| 24 | Altri Proventi TV | pág. 46, Jev 0.94 |
| 25 | Proventi radiofonici | pág. 46, Jev 0.94 |
| 26 | Proventi sfruttamento diritti d'immagine | pág. 46, ? 0.65 |
| 27 | g) ricavi per cessione temporanea calciatori | pág. 6, Jev 0.98 |
| 28 | h) plusvalenza da cessione diritti pluriennali calciatori | pág. 6, Jev 1 |
| 29 | i) altri proventi da gestione calciatori | pág. 6, Claude 0.8 |
| 30 | - proventi da enti federali (L.N.P.A.) | pág. 47, Jev 0.98 |
| 31 | - proventi produzioni televisive | pág. 47, Jev 0.93 |
| 32 | - altri ricavi | pág. 47, Jev 1 |

### Gastos

```text
tools/cargar.mjs (2026-10-07)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Acquisto materiale sportivo | pág. 49, Jev 0.99 |
| 2 | Acquisto materiale indumenti | pág. 49, precedente |
| 3 | Acquisto materiale di consumo | pág. 49, Jev 0.96 |
| 4 | Acquisto materiale di cancelleria e stampati | pág. 49, Jev 1 |
| 5 | Acquisto medicinali | pág. 49, Jev 0.99 |
| 6 | Beni destinati alla rivendita | pág. 49, precedente |
| 7 | Costi per tesserati ed attività sportiva | pág. 50, precedente |
| 8 | Costi per attività sportiva | pág. 50, precedente |
| 9 | Costi specifici tecnici | pág. 50, precedente |
| 10 | Costi vitto, alloggio, locomozione gare | pág. 50, Jev 1 |
| 11 | Servizio biglietteria e controllo ingressi | pág. 50, Jev 1 |
| 12 | Assicurative e previdenziali | pág. 50, Jev 0.94 |
| 13 | Compensi Amministratori | pág. 50, Claude 0.85 |
| 14 | Amministrative, pubblicitarie e generali | pág. 50, Jev 1 |
| 15 | Altri | pág. 50, Jev 0.94 |
| 16 | Locazioni operative | pág. 51, precedente |
| 17 | Affitto centro tecnico, campi sportivi e canone concessione stadio | pág. 51, precedente |
| 18 | Altri costi per godimento beni terzi | pág. 51, precedente |
| 19 | Compensi contrattuali calciatori | pág. 52, Jev 1 |
| 20 | Quota variabile retrib. calc. legata ai risultati sportivi | pág. 52, Jev 0.99 |
| 21 | Compensi contrattuali allenatori | pág. 52, Jev 0.99 |
| 22 | Quota variabile retrib. allen. legata ai risultati sportivi | pág. 52, Claude 0.9 |
| 23 | Compensi contrattuali istruttori, tecnici e altri tess. | pág. 52, Jev 0.9 |
| 24 | Altri salari e stipendi | pág. 51, precedente |
| 25 | b) oneri sociali | pág. 6, Jev 0.97 |
| 26 | Trattamento di fine rapporto | pág. 51, Jev 0.96 |
| 27 | Indennità fine carriera | pág. 51, Claude 0.8 |
| 28 | e) altri costi | pág. 6, Jev 0.99 |
| 29 | Concessioni, marchi, licenze e simili | pág. 53, Jev 0.97 |
| 30 | Amm.to diritti plur. prestazioni calciatori | pág. 53, Jev 1 |
| 31 | Altre immobilizzazioni immateriali | pág. 53, Claude 0.9 |
| 32 | Impianti | pág. 53, Jev 0.98 |
| 33 | Macchinari | pág. 53, Jev 0.93 |
| 34 | Attrezzature | pág. 53, Jev 0.98 |
| 35 | Automezzi | pág. 53, Jev 1 |
| 36 | Macchine ufficio | pág. 53, Jev 0.94 |
| 37 | Mobili e arredi | pág. 53, Jev 0.95 |
| 38 | c) altre svalutazioni delle immobilizzazioni | pág. 6, Jev 0.96 |
| 39 | d) svalut.dei crediti compresi nel circolante | pág. 6, Jev 1 |
| 40 | 11) Variaz. delle riman. mat.prime, sussid., di consumo e merci | pág. 6, Jev 0.98 |
| 41 | a) spese varie organizzazioni gare | pág. 6, Jev 0.98 |
| 42 | b) tasse iscrizione gare | pág. 6, Jev 0.99 |
| 43 | c) oneri specifici v/squadre ospitate | pág. 6, Jev 1 |
| 44 | d) costi per acquisizione temporanea calciatori | pág. 6, Jev 0.99 |
| 45 | e) minus. da cessione diritti plur. alle prest. calciatori | pág. 6, Jev 1 |
| 46 | f) altri oneri di gestione calciatori | pág. 6, Jev 0.99 |
| 47 | - indennizzi Lega e Uefa | pág. 54, precedente |
| 48 | - rappresentanza e omaggi | pág. 54, precedente |
| 49 | - diversi | pág. 54, Jev 0.97 |

### Meta

```text
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-07): fila = (918.251). oneri finanziari impresos en positivo bajo 17); Totale C (L326) 4.063.075 = 4.981.326 - 918.251 (to-do 155/156, arreglo manual 2026-10-07)
tools/cargar.mjs (2026-10-07). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

```text
tools/caja-deuda.mjs (2026-10-16): grossDebt escalón 1 (compuerta: documento anterior): "Debiti verso Banche" pág. 5
```

```text
tools/caja-deuda.mjs (2026-10-17): cash escalón 0 (compuerta: ajuste manual): ajuste manual (2026-10-17): Claude 2026-10-17 (leído en el balance por subagente Sonnet, criterio de deuda financiera con socios): Totale Disponibilita' liquide (IV) 174.441.453. Balance 30/06/2025; el comparativo 210.491.999 coincide con la caja cargada 2024.
```

## 2024

### Ingresos

```text
2024: cargado por tools/cargar.mjs (2026-10-07) desde Clubes/Italia/Napoli/Napoli-bilancio-2024.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Italia/Napoli/Napoli-bilancio-2024.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | a) ricavi da gare in casa | pág. 6, Jev 1 |
| 2 | c) abbonamenti | pág. 6, Jev 1 |
| 3 | d) altri ricavi da gare | pág. 6, precedente |
| 4 | b) proventi da sponsorizzazioni | pág. 6, Jev 1 |
| 5 | c) proventi pubblicitari | pág. 6, precedente |
| 6 | d) proventi commerciali e royalties | pág. 6, Jev 1 |
| 7 | e) proventi da cessioni diritti televisivi | pág. 6, Jev 1 |
| 8 | f) proventi vari | pág. 6, Jev 1 |
| 9 | g) ricavi per cessione temporanea calciatori | pág. 6, precedente |
| 10 | h) plusvalenza da cessione diritti pluriennali calciatori | pág. 6, precedente |
| 11 | i) altri proventi da gestione calciatori | pág. 6, precedente |
| 12 | j) ricavi e proventi diversi | pág. 6, Jev 1 |

### Gastos

```text
tools/cargar.mjs (2026-10-07)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | per materie prime, sussidiarie, di consumo e merci | pág. 6, Jev 0.98 |
| 2 | per servizi | pág. 6, Jev 0.96 |
| 3 | per godimento beni di terzi | pág. 6, Jev 0.99 |
| 4 | a) salari e stipendi | pág. 6, Jev 0.98 |
| 5 | b) oneri sociali | pág. 6, precedente |
| 6 | c) trattamento di fine rapporto | pág. 6, precedente |
| 7 | e) altri costi | pág. 6, precedente |
| 8 | a) amm.to delle immobilizzazioni immateriali | pág. 6, Jev 0.96 |
| 9 | b) amm.to delle immobilizzazioni materiali | pág. 6, Jev 1 |
| 10 | d) svalut.dei crediti compresi nel circolante | pág. 6, precedente |
| 11 | Variaz delle riman. mat.prime, sussid., di consumo e merci | pág. 6, precedente |
| 12 | a) spese varie organizzazioni gare | pág. 6, precedente |
| 13 | b) tasse iscrizione gare | pág. 6, precedente |
| 14 | c) oneri specifici visquadre ospitate | pág. 6, precedente |
| 15 | d) costi per acquisizione temporanea calciatori | pág. 6, precedente |
| 16 | f) altri oneri di gestione calciatori | pág. 6, precedente |
| 17 | g) altri oneri diversi di gestione | pág. 6, Jev 1 |

### Meta

```text
2024: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-07): fila = (1.063.280). oneri finanziari impresos en positivo bajo 17); Totale C (L290) 7.442.873 (to-do 155/156, arreglo manual 2026-10-07)
2024: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-07): fila = (4.559). perdite su cambi impresas en positivo; Totale 17bis (4.529) (to-do 155/156, arreglo manual 2026-10-07)
2024: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-07): confirmado = 2023. Claude 2026-10-07: es el año "2023" del encabezado de la columna, no un importe
tools/cargar.mjs (2026-10-07). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

```text
tools/caja-deuda.mjs (2026-10-16): grossDebt escalón 1 (compuerta: documento siguiente): "4) Debiti verso Banche" pág. 5; cash escalón 1b (compuerta: documento anterior): "Totale Disponibilità liquide (IV)" pág. 4
```

### Liga

```text
2024: tools/cargar.mjs 2026-10-07, verificado contra roster cacheado de "2023–24 Serie A" (tools/club-league-reference/it.json), coincidencia e
```

## 2023

### Ingresos

```text
2023: cargado por tools/cargar.mjs (2026-10-08) desde Clubes/Italia/Napoli/Napoli-bilancio-2023.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Italia/Napoli/Napoli-bilancio-2023.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | - Gare Campionato | pág. 43, precedente |
| 2 | - Gare Coppa Italia | pág. 43, precedente |
| 3 | - Gare Coppe Internazionali | pág. 43, Claude 0.93 |
| 4 | - Gare Campionato | pág. 43, precedente |
| 5 | - Gare Coppe Internazionali | pág. 43, Claude 0.93 |
| 6 | d) altri ricavi da gare | pág. 6, precedente |
| 7 | a) contributi in conto esercizio | pág. 6, Jev 0.98 |
| 8 | Sponsor ufficiali | pág. 45, Jev 1 |
| 9 | Sponsor tecnico | pág. 45, Jev 1 |
| 10 | Sponsor istituzionali | pág. 45, precedente |
| 11 | Fornitori ufficiali e tecnici | pág. 45, Jev 1 |
| 12 | Partner commerciali | pág. 45, Jev 0.99 |
| 13 | Altre sponsorizzazioni | pág. 45, precedente |
| 14 | Regional Sponsor | pág. 45, precedente |
| 15 | Global Partner | pág. 45, precedente |
| 16 | Principal Sponsor | pág. 45, precedente |
| 17 | Officile Sponsor | pág. 45, Jev 1 |
| 18 | Local Partner | pág. 45, precedente |
| 19 | Business Partner | pág. 45, precedente |
| 20 | c) proventi pubblicitari | pág. 6, precedente |
| 21 | Proventi da merchandising | pág. 45, precedente |
| 22 | Proventi da licensing | pág. 45, precedente |
| 23 | Altri proventi commerciali | pág. 45, precedente |
| 24 | Proventi televisivi | pág. 46, Jev 1 |
| 25 | Proventi televisivi da competizione Uefa | pág. 46, precedente |
| 26 | Proventi televisivi gare amichevoli | pág. 46, precedente |
| 27 | Altri Proventi TV | pág. 46, precedente |
| 28 | Proventi radiofonici | pág. 46, precedente |
| 29 | Proventi sfruttamento diritti d'immagine | pág. 46, precedente |
| 30 | g) ricavi per cessione temporanea calciatori | pág. 6, precedente |
| 31 | h) plusvalenza da cessione diritti pluriennali calciatori | pág. 6, precedente |
| 32 | i) altri proventi da gestione calciatori | pág. 6, precedente |
| 33 | - proventi da enti federali (L.N.P.) | pág. 47, precedente |
| 34 | - proventi produzioni televisive | pág. 47, precedente |
| 35 | - altri ricavi | pág. 47, precedente |

### Gastos

```text
tools/cargar.mjs (2026-10-08)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Acquisto materiale sportivo | pág. 49, precedente |
| 2 | Acquisto materiale indumenti | pág. 49, precedente |
| 3 | Acquisto materiale di consumo | pág. 49, precedente |
| 4 | Acquisto materiale di cancelleria e stampati | pág. 49, precedente |
| 5 | Acquisto medicinali | pág. 49, precedente |
| 6 | Beni destinati alla rivendita | pág. 49, precedente |
| 7 | Costi per tesserati ed attività sportiva | pág. 49, precedente |
| 8 | Costi per attività sportiva | pág. 49, precedente |
| 9 | Costi specifici tecnici | pág. 49, precedente |
| 10 | Costi vitto, alloggio, locomozione gare | pág. 49, precedente |
| 11 | Servizio biglietteria e controllo ingressi | pág. 49, precedente |
| 12 | Assicurative e previdenziali | pág. 49, precedente |
| 13 | Compensi Amministratori | pág. 49, precedente |
| 14 | Amministrative, pubblicitarie e generali | pág. 49, precedente |
| 15 | Altri | pág. 49, precedente |
| 16 | Locazioni operative | pág. 50, precedente |
| 17 | Affitto centro tecnico, campi sportivi e canone concessione stadio | pág. 50, precedente |
| 18 | Altri costi per godimento beni terzi | pág. 50, precedente |
| 19 | Compensi contrattuali calciatori | pág. 51, precedente |
| 20 | Quota variabile retrib. calc. legata ai risultati sportivi | pág. 51, precedente |
| 21 | Compensi contrattuali allenatori | pág. 51, precedente |
| 22 | Quota variabile retrib. allen. legata ai risultati sportivi | pág. 51, precedente |
| 23 | Compensi contrattuali istruttori, tecnici e altri tess. | pág. 51, precedente |
| 24 | Altri salari e stipendi | pág. 51, precedente |
| 25 | b) oneri sociali | pág. 6, precedente |
| 26 | Trattamento di fine rapporto | pág. 51, precedente |
| 27 | Indennità fine carriera | pág. 51, precedente |
| 28 | e) altri costi | pág. 6, precedente |
| 29 | Concessioni, marchi, licenze e simili | pág. 52, precedente |
| 30 | Amm.to diritti plur. prestazioni calciatori | pág. 52, precedente |
| 31 | Altre immobilizzazioni immateriali | pág. 52, precedente |
| 32 | Impianti | pág. 52, precedente |
| 33 | Macchinari | pág. 52, precedente |
| 34 | Attrezzature | pág. 52, precedente |
| 35 | Automezzi | pág. 52, precedente |
| 36 | Macchine ufficio | pág. 52, precedente |
| 37 | Mobili e arredi | pág. 52, precedente |
| 38 | c) altre svalutazioni delle immobilizzazioni | pág. 6, precedente |
| 39 | d) svalut.dei crediti compresi nel circolante | pág. 6, precedente |
| 40 | 11) Variaz. delle riman. mat.prime, sussid., di consumo e merci | pág. 6, precedente |
| 41 | b) tasse iscrizione gare | pág. 6, precedente |
| 42 | c) oneri specifici v/squadre ospitate | pág. 6, precedente |
| 43 | d) costi per acquisizione temporanea calciatori | pág. 6, precedente |
| 44 | e) minus. da cessione diritti plur. alle prest. calciatori | pág. 6, precedente |
| 45 | f) altri oneri di gestione calciatori | pág. 6, precedente |
| 46 | - indennizzi Lega e Uefa | pág. 54, precedente |
| 47 | - rappresentanza e omaggi | pág. 54, precedente |
| 48 | - diversi | pág. 54, precedente |

### Meta

```text
2023: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-08): fila = (212). perdite su cambi impresas en positivo; Totale 17bis 3.287 = 3.499 - 212 (patrón to-do 155 igual que Napoli 2024)
tools/cargar.mjs (2026-10-08). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

```text
tools/caja-deuda.mjs (2026-10-16): grossDebt escalón 1 (compuerta: documento siguiente): "4) Debiti verso Banche" pág. 5; cash escalón 1b (compuerta: documento siguiente): "Totale Disponibilità liquide (IV)" pág. 4
```

### Liga

```text
2023: tools/cargar.mjs 2026-10-08, verificado contra roster cacheado de "2022–23 Serie A" (tools/club-league-reference/it.json), coincidencia e
```

## 2022

### Ingresos

```text
2022: cargado por tools/cargar.mjs (2026-10-08) desde Clubes/Italia/Napoli/Napoli-bilancio-2022.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Italia/Napoli/Napoli-bilancio-2022.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | a) ricavi da gare in casa | pág. 6, precedente |
| 2 | c) abbonamenti | pág. 6, precedente |
| 3 | d) altri ricavi da gare | pág. 6, precedente |
| 4 | a) contributi in conto esercizio | pág. 6, precedente |
| 5 | Sponsor ufficiali | pág. 47, precedente |
| 6 | Sponsor tecnico | pág. 47, precedente |
| 7 | Sponsor istituzionali | pág. 47, precedente |
| 8 | Fornitori ufficiali e tecnici | pág. 47, precedente |
| 9 | Partner commerciali | pág. 47, precedente |
| 10 | Altre sponsorizzazioni | pág. 47, precedente |
| 11 | Regional Sponsor | pág. 47, precedente |
| 12 | c) proventi pubblicitari | pág. 6, precedente |
| 13 | Proventi da merchandising | pág. 48, precedente |
| 14 | Proventi da licensing | pág. 48, precedente |
| 15 | Altri proventi commerciali | pág. 48, precedente |
| 16 | Proventi televisivi | pág. 48, precedente |
| 17 | Proventi televisivi da competizione Uefa | pág. 48, precedente |
| 18 | Proventi televisivi gare amichevoli | pág. 48, precedente |
| 19 | Altri Proventi TV | pág. 48, precedente |
| 20 | Proventi radiofonici | pág. 49, precedente |
| 21 | Proventi sfruttamento diritti d'immagine | pág. 49, precedente |
| 22 | g) ricavi per cessione temporanea calciatori | pág. 6, precedente |
| 23 | Valore di realizzo | pág. 49, Claude 0.8 |
| 24 | Sell on Fee | pág. 49, Claude 0.85 |
| 25 | i) altri proventi da gestione calciatori | pág. 6, precedente |
| 26 | l) ricavi e proventi diversi | pág. 6, precedente |

### Gastos

```text
tools/cargar.mjs (2026-10-08)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Acquisto materiale sportivo | pág. 51, precedente |
| 2 | Acquisto materiale indumenti | pág. 51, precedente |
| 3 | Acquisto materiale di consumo | pág. 51, precedente |
| 4 | Acquisto materiale di cancelleria e stampati | pág. 51, precedente |
| 5 | Acquisto medicinali | pág. 51, precedente |
| 6 | Beni destinati alla rivendita | pág. 51, precedente |
| 7 | Costi per tesserati ed attività sportiva | pág. 52, precedente |
| 8 | Costi per attività sportiva | pág. 52, precedente |
| 9 | Costi specifici tecnici | pág. 52, precedente |
| 10 | Costi vitto, alloggio, locomozione gare | pág. 52, precedente |
| 11 | Servizio biglietteria e controllo ingressi | pág. 52, precedente |
| 12 | Assicurative e previdenziali | pág. 52, precedente |
| 13 | Compensi Amministratori | pág. 52, precedente |
| 14 | Amministrative, pubblicitarie e generali | pág. 52, precedente |
| 15 | Altri | pág. 52, precedente |
| 16 | Locazioni operative | pág. 53, precedente |
| 17 | Affitto centro tecnico, campi sportivi e canone concessione stadio | pág. 53, precedente |
| 18 | Altri costi per godimento beni terzi | pág. 53, precedente |
| 19 | Compensi contrattuali calciatori | pág. 54, precedente |
| 20 | Quota variabile retrib. calc. legata ai risultati sportivi | pág. 54, precedente |
| 21 | Compensi contrattuali allenatori | pág. 54, precedente |
| 22 | Quota variabile retrib. allen. legata ai risultati sportivi | pág. 54, precedente |
| 23 | Compensi contrattuali istruttori, tecnici e altri tess. | pág. 54, precedente |
| 24 | Altri salari e stipendi | pág. 53, precedente |
| 25 | b) oneri sociali | pág. 6, precedente |
| 26 | Trattamento di fine rapporto | pág. 53, precedente |
| 27 | Indennità fine carriera | pág. 53, precedente |
| 28 | e) altri costi | pág. 6, precedente |
| 29 | Concessioni, marchi, licenze e simili | pág. 55, precedente |
| 30 | Amm.to diritti plur. prestazioni calciatori | pág. 55, precedente |
| 31 | Altre immobilizzazioni immateriali | pág. 55, precedente |
| 32 | Impianti | pág. 55, precedente |
| 33 | Macchinari | pág. 55, precedente |
| 34 | Attrezzature | pág. 55, precedente |
| 35 | Automezzi | pág. 55, precedente |
| 36 | Macchine ufficio | pág. 55, precedente |
| 37 | Mobili e arredi | pág. 55, precedente |
| 38 | c) altre svalutazioni delle immobilizzazioni | pág. 6, precedente |
| 39 | d) svalut.dei crediti compresi nel circolante | pág. 6, precedente |
| 40 | 11) Variaz delle riman. mat.prime, sussid., di consumo e merci | pág. 6, precedente |
| 41 | b) tasse iscrizione gare | pág. 6, precedente |
| 42 | c) oneri specifici v/squadre ospitate | pág. 6, precedente |
| 43 | d) costi per acquisizione temporanea calciatori | pág. 6, precedente |
| 44 | e) minus. da cessione diritti plur. alle prest. calciatori | pág. 6, precedente |
| 45 | f) altri oneri di gestione calciatori | pág. 6, precedente |
| 46 | g) altri oneri diversi di gestione | pág. 6, precedente |

### Meta

```text
2022: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-08): fila = (6.136). perdite su cambi impresas en positivo; Totale 17bis 6.743 = 12.879 - 6.136 (patrón to-do 155)
tools/cargar.mjs (2026-10-08). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

```text
tools/caja-deuda.mjs (2026-10-16): grossDebt escalón 1 (compuerta: documento siguiente): "Debiti verso Banche" pág. 5; cash escalón 1b (compuerta: documento siguiente): "Totale Disponibilità liquide (IV)" pág. 4
```

### Liga

```text
2022: tools/cargar.mjs 2026-10-08, verificado contra roster cacheado de "2021–22 Serie A" (tools/club-league-reference/it.json), coincidencia e
```

## 2021

### Ingresos

```text
2021: cargado por tools/cargar.mjs (2026-10-08) desde Clubes/Italia/Napoli/Napoli-bilancio-2021.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Italia/Napoli/Napoli-bilancio-2021.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | a) ricavi da gare in casa | pág. 6, precedente |
| 2 | c) abbonamenti | pág. 6, precedente |
| 3 | d) altri ricavi da gare | pág. 6, precedente |
| 4 | Contributi federali | pág. 44, Jev 0.99 |
| 5 | Contributo canoni locazione | pág. 44, Jev 0.98 |
| 6 | Contributi Investimenti Pubblicitari | pág. 44, Claude 0.8 |
| 7 | Contributi a fondo perduto - COVID | pág. 44, Jev 1 |
| 8 | Contributi per sanificazione e D.P.I. | pág. 44, Jev 1 |
| 9 | Sponsor ufficiali | pág. 45, Jev 1 |
| 10 | Sponsor tecnico | pág. 45, Jev 1 |
| 11 | Sponsor istituzionali | pág. 45, precedente |
| 12 | Partner commerciali | pág. 45, Jev 0.99 |
| 13 | Altre sponsorizzazioni | pág. 45, precedente |
| 14 | Regional Sponsor | pág. 45, precedente |
| 15 | c) proventi pubblicitari | pág. 6, precedente |
| 16 | Proventi da merchandising | pág. 46, precedente |
| 17 | Proventi da licensing | pág. 46, precedente |
| 18 | Altri proventi commerciali | pág. 46, precedente |
| 19 | Proventi televisivi | pág. 46, Jev 1 |
| 20 | Proventi televisivi da competizione Uefa | pág. 46, precedente |
| 21 | Proventi televisivi gare amichevoli | pág. 46, precedente |
| 22 | Altri Proventi TV | pág. 46, precedente |
| 23 | Proventi radiofonici | pág. 47, precedente |
| 24 | Proventi sfruttamento diritti d'immagine | pág. 47, precedente |
| 25 | g) ricavi per cessione temporanea calciatori | pág. 6, precedente |
| 26 | h) plusvalenza da cessione diritti pluriennali calciatori | pág. 6, precedente |
| 27 | i) altri proventi da gestione calciatori | pág. 6, precedente |
| 28 | - proventi da enti federali (L.N.P.) | pág. 48, precedente |
| 29 | - proventi produzioni televisive | pág. 48, precedente |
| 30 | - rilascio fondo rischi | pág. 48, Jev 0.99 |
| 31 | - partecipazione gare amichevoli | pág. 48, ? 0.75 |
| 32 | - altri ricavi | pág. 48, precedente |

### Gastos

```text
tools/cargar.mjs (2026-10-08)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Acquisto materiale sportivo | pág. 50, precedente |
| 2 | Acquisto materiale indumenti | pág. 50, precedente |
| 3 | Acquisto materiale di consumo | pág. 50, precedente |
| 4 | Acquisto materiale di cancelleria e stampati | pág. 50, precedente |
| 5 | Acquisto medicinali | pág. 50, precedente |
| 6 | Beni destinati alla rivendita | pág. 50, precedente |
| 7 | Costi per tesserati ed attività sportiva | pág. 50, precedente |
| 8 | Costi per attività sportiva | pág. 50, precedente |
| 9 | Costi specifici tecnici | pág. 50, precedente |
| 10 | Costi vitto, alloggio, locomozione gare | pág. 50, precedente |
| 11 | Servizio biglietteria e controllo ingressi | pág. 50, precedente |
| 12 | Assicurative e previdenziali | pág. 50, precedente |
| 13 | Compensi Amministratori | pág. 50, precedente |
| 14 | Amministrative, pubblicitarie e generali | pág. 50, precedente |
| 15 | Altri | pág. 50, precedente |
| 16 | Locazioni operative | pág. 51, precedente |
| 17 | Affitto centro tecnico, campi sportivi e canone concessione stadio | pág. 51, precedente |
| 18 | Altri costi per godimento beni terzi | pág. 51, precedente |
| 19 | Compensi contrattuali calciatori | pág. 52, precedente |
| 20 | Quota variabile retrib. calc. legata ai risultati sportivi | pág. 52, precedente |
| 21 | Compensi contrattuali allenatori | pág. 52, precedente |
| 22 | Quota variabile retrib. allen. legata ai risultati sportivi | pág. 52, precedente |
| 23 | Compensi contrattuali istruttori, tecnici e altri tess. | pág. 52, precedente |
| 24 | Altri salari e stipendi | pág. 52, precedente |
| 25 | b) oneri sociali | pág. 6, precedente |
| 26 | Trattamento di fine rapporto | pág. 52, precedente |
| 27 | Indennità fine carriera | pág. 52, precedente |
| 28 | e) altri costi | pág. 6, precedente |
| 29 | Amm.to diritti plur. prestazioni calciatori | pág. 53, precedente |
| 30 | Altre immobilizzazioni immateriali | pág. 53, precedente |
| 31 | Impianti | pág. 53, precedente |
| 32 | Macchinari | pág. 53, precedente |
| 33 | Attrezzature | pág. 53, precedente |
| 34 | Automezzi | pág. 53, precedente |
| 35 | Macchine ufficio | pág. 53, precedente |
| 36 | Mobili e arredi | pág. 53, precedente |
| 37 | c) altre svalutazioni delle immobilizzazioni | pág. 6, precedente |
| 38 | Crediti iscritti nell'attivo circolante vs Clienti | pág. 54, Jev 0.98 |
| 39 | Crediti iscritti nell'attivo circolante vs Club Esteri | pág. 54, Jev 0.92 |
| 40 | Variaz. delle riman. mat.prime, sussid., di consumo e merci | pág. 6, precedente |
| 41 | b) tasse iscrizione gare | pág. 6, precedente |
| 42 | c) oneri specifici v/squadre ospitate | pág. 6, precedente |
| 43 | d) costi per acquisizione temporanea calciatori | pág. 6, precedente |
| 44 | e) minus. da cessione diritti plur. alle prest. calciatori | pág. 6, precedente |
| 45 | f) altri oneri di gestione calciatori | pág. 6, precedente |
| 46 | - indennizzi Lega e Uefa | pág. 55, precedente |
| 47 | - rappresentanza e omaggi | pág. 55, precedente |
| 48 | - diversi | pág. 55, precedente |

### Meta

```text
tools/cargar.mjs (2026-10-08). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

```text
tools/caja-deuda.mjs (2026-10-17): grossDebt escalón 0 (compuerta: ajuste manual): ajuste manual (2026-10-17): Claude 2026-10-17 (leído en el balance por subagente Sonnet, criterio de deuda financiera con socios): Sin filas de deuda financiera: fornitori 44.929.143, controllanti 6.724.933, sottoposte 268.227, tributari 46.894.959, previdenza 2.111.896, enti settore specifico 128.345.580, altri debiti 15.584.606; TOTALE DEBITI 254.730.822. Sin bancos (el prestito UniCredit llega en 2021-22); rendiconto con variacion 0 en deuda financiera.; cash escalón 0 (compuerta: ajuste manual): ajuste manual (2026-10-17): Claude 2026-10-17 (leído en el balance por subagente Sonnet, criterio de deuda financiera con socios): Totale disponibilita' liquide 95.758.050 (depositi 95.753.516 + cassa 4.534). El bilancio 2022 imprime 95.768.050 como comparativo (error de OCR), pero depositi + cassa y el rendiconto dan 95.758.050.
```

### Liga

```text
2021: tools/cargar.mjs 2026-10-08, verificado contra roster cacheado de "2020–21 Serie A" (tools/club-league-reference/it.json), coincidencia e
```

## 2020

### Ingresos

```text
2020: cargado por tools/cargar.mjs (2026-10-08) desde Clubes/Italia/Napoli/Napoli-bilancio-2020.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Italia/Napoli/Napoli-bilancio-2020.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | - Gare Campionato | pág. 41, precedente |
| 2 | - Gare Coppa Italia | pág. 41, precedente |
| 3 | - Gare Coppe Internazionali | pág. 41, precedente |
| 4 | Ricavi da gare in casa squadre giovanili | pág. 41, ? 0.7 |
| 5 | b) percentuale su incassi gare da squadre ospitanti | pág. 6, precedente |
| 6 | c) abbonamenti | pág. 6, precedente |
| 7 | Sponsor ufficiali | pág. 43, precedente |
| 8 | Sponsor tecnico | pág. 43, precedente |
| 9 | Sponsor istituzionali | pág. 43, precedente |
| 10 | Partner commerciali | pág. 43, precedente |
| 11 | Altre sponsorizzazioni | pág. 43, precedente |
| 12 | Regional Sponsor | pág. 43, precedente |
| 13 | c) proventi pubblicitari | pág. 6, precedente |
| 14 | Proventi da merchandising | pág. 43, precedente |
| 15 | Proventi da licensing | pág. 43, precedente |
| 16 | Altri proventi commerciali | pág. 43, precedente |
| 17 | Proventi televisivi | pág. 44, precedente |
| 18 | Proventi televisivi da competizione Uefa | pág. 44, precedente |
| 19 | Proventi televisivi gare amichevoli | pág. 44, precedente |
| 20 | Altri Proventi TV | pág. 44, precedente |
| 21 | Proventi radiofonici | pág. 44, precedente |
| 22 | Proventi sfruttamento diritti d'immagine | pág. 44, precedente |
| 23 | g) ricavi per cessione temporanea calciatori | pág. 6, precedente |
| 24 | h) plusvalenza da cessione diritti pluriennali calciatori | pág. 6, precedente |
| 25 | i) altri proventi da gestione calciatori | pág. 6, precedente |
| 26 | l) ricavi e proventi diversi | pág. 6, precedente |

### Gastos

```text
tools/cargar.mjs (2026-10-08)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Acquisto materiale sportivo | pág. 47, precedente |
| 2 | Acquisto materiale indumenti | pág. 47, precedente |
| 3 | Acquisto materiale di consumo | pág. 47, precedente |
| 4 | Acquisto materiale di cancelleria e stampati | pág. 47, precedente |
| 5 | Acquisto medicinali | pág. 47, precedente |
| 6 | Beni destinati alla rivendita | pág. 47, precedente |
| 7 | Costi per tesserati ed attività sportiva | pág. 47, precedente |
| 8 | Costi specifici tecnici | pág. 47, precedente |
| 9 | Costi vitto, alloggio, locomozione gare | pág. 47, precedente |
| 10 | Servizio biglietteria e controllo ingressi | pág. 47, precedente |
| 11 | Assicurative e previdenziali | pág. 47, precedente |
| 12 | Compensi Amministratori | pág. 47, precedente |
| 13 | Amministrative, pubblicitarie e generali | pág. 47, precedente |
| 14 | Altri | pág. 47, precedente |
| 15 | Locazioni operative | pág. 48, precedente |
| 16 | Affitto centro tecnico, campi sportivi e canone concessione stadio | pág. 48, precedente |
| 17 | Altri costi per godimento beni terzi | pág. 48, precedente |
| 18 | Compensi contrattuali calciatori | pág. 49, precedente |
| 19 | Quota variabile retrib. calc. legata ai risultati sportivi | pág. 49, precedente |
| 20 | Compensi contrattuali allenatori | pág. 49, precedente |
| 21 | Quota variabile retrib. allen. legata ai risultati sportivi | pág. 49, precedente |
| 22 | Compensi contrattuali istruttori, tecnici e altri tess. | pág. 49, precedente |
| 23 | Altri salari e stipendi | pág. 49, precedente |
| 24 | b) oneri sociali | pág. 6, precedente |
| 25 | Trattamento di fine rapporto | pág. 49, precedente |
| 26 | Indennità fine carriera | pág. 49, precedente |
| 27 | e) altri costi | pág. 6, precedente |
| 28 | Concessioni, marchi, licenze e simili | pág. 50, precedente |
| 29 | Amm.to diritti plur. prestazioni calciatori | pág. 50, precedente |
| 30 | Altre immobilizzazioni immateriali | pág. 50, precedente |
| 31 | Impianti | pág. 50, precedente |
| 32 | Macchinari | pág. 50, precedente |
| 33 | Attrezzature | pág. 50, precedente |
| 34 | Macchine ufficio | pág. 50, precedente |
| 35 | Mobili e arredi | pág. 50, precedente |
| 36 | d) svalut.dei crediti compresi nel circolante | pág. 6, precedente |
| 37 | Materiale Sportivo di Consumo | pág. 51, Claude 0.8 |
| 38 | - Iniziali | pág. 51, ? 0.75 |
| 39 | - Finali | pág. 51, ? 0.75 |
| 40 | - Svalutazione Rimanenze Finali | pág. 51, Jev 1 |
| 41 | - Utilizzo Fondo Svalutaz. Merci destinate alla rivend. | pág. 51, Jev 1 |
| 42 | b) tasse iscrizione gare | pág. 6, precedente |
| 43 | c) oneri specifici v/squadre ospitate | pág. 6, precedente |
| 44 | d) costi per acquisizione temporanea calciatori | pág. 6, precedente |
| 45 | e) minus. da cessione diritti plur. alle prest. calciatori | pág. 6, precedente |
| 46 | f) altri oneri di gestione calciatori | pág. 6, precedente |
| 47 | g) altri oneri diversi di gestione | pág. 6, precedente |

### Meta

```text
tools/cargar.mjs (2026-10-08). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

```text
tools/caja-deuda.mjs (2026-10-16): cash escalón 1b (compuerta: documento siguiente): "Totale Disponibilità liquide (IV)" pág. 5
```

```text
tools/caja-deuda.mjs (2026-10-17): grossDebt escalón 0 (compuerta: ajuste manual): ajuste manual (2026-10-17): Claude 2026-10-17 (leído en el balance por subagente Sonnet, criterio de deuda financiera con socios): Sin filas de deuda financiera: fornitori 44.620.585, controllanti 523.244, sottoposte 457.700, tributari 13.545.249, previdenza 1.100.924, enti settore specifico 143.475.327, altri debiti 41.823.059; TOTALE DEBITI 245.604.917. Sin bancos, bonos, soci ni otros financiadores; rendiconto muestra variacion 0 en deuda financiera.
```

### Liga

```text
2020: tools/cargar.mjs 2026-10-08, verificado contra roster cacheado de "2019–20 Serie A" (tools/club-league-reference/it.json), coincidencia e
```

## 2019

### Ingresos

```text
2019: cargado por tools/cargar.mjs (2026-10-08) desde Clubes/Italia/Napoli/Napoli-bilancio-2019.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Italia/Napoli/Napoli-bilancio-2019.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | a) ricavi da gare in casa | pág. 6, precedente |
| 2 | b) percentuale su incassi gare da squadre ospitanti | pág. 6, precedente |
| 3 | c) abbonamenti | pág. 6, precedente |
| 4 | b) proventi da sponsorizzazioni | pág. 6, precedente |
| 5 | c) proventi pubblicitari | pág. 6, precedente |
| 6 | d) proventi commerciali e royalties | pág. 6, precedente |
| 7 | e) proventi da cessioni diritti televisivi | pág. 6, precedente |
| 8 | f) proventi vari | pág. 6, precedente |
| 9 | g) ricavi per cessione temporanea calciatori | pág. 6, precedente |
| 10 | h) plusvalenza da cessione diritti pluriennali calciatori | pág. 6, precedente |
| 11 | i) altri proventi da gestione calciatori | pág. 6, precedente |
| 12 | l) ricavi e proventi diversi | pág. 6, precedente |

### Gastos

```text
tools/cargar.mjs (2026-10-08)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | 6) per materie prime, sussidiarie, di consumo e merci | pág. 6, precedente |
| 2 | 7) per servizi | pág. 6, precedente |
| 3 | 8) per godimento beni di terzi | pág. 6, precedente |
| 4 | a) salari e stipendi | pág. 6, precedente |
| 5 | b) oneri sociali | pág. 6, precedente |
| 6 | c) trattamento di fine rapporto | pág. 6, precedente |
| 7 | e) altri costi | pág. 6, precedente |
| 8 | a) amm.to delle immobilizzazioni immateriali | pág. 6, precedente |
| 9 | b) amm.to delle immobilizzazioni materiali | pág. 6, precedente |
| 10 | d) svalut.dei crediti compresi nel circolante | pág. 6, precedente |
| 11 | 11) Variaz. delle riman. mat.prime, sussid., di consumo e merci | pág. 6, precedente |
| 12 | b) tasse iscrizione gare | pág. 6, precedente |
| 13 | c) oneri specifici v/squadre ospitate | pág. 6, precedente |
| 14 | d) costi per acquisizione temporanea calciatori | pág. 6, precedente |
| 15 | e) minus. da cessione diritti plur. alle prest. calciatori | pág. 6, precedente |
| 16 | f) altri oneri di gestione calciatori | pág. 6, precedente |
| 17 | g) altri oneri diversi di gestione | pág. 6, precedente |

### Meta

```text
tools/cargar.mjs (2026-10-08). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

```text
tools/caja-deuda.mjs (2026-10-16): cash escalón 1b (compuerta: documento siguiente): "Totale Disponibilità liquide (IV)" pág. 5
```

```text
tools/caja-deuda.mjs (2026-10-17): grossDebt escalón 0 (compuerta: ajuste manual): ajuste manual (2026-10-17): Claude 2026-10-17 (leído en el balance por subagente Sonnet, criterio de deuda financiera con socios): Sin filas de deuda financiera: acconti 896.740, fornitori 18.126.994, controllanti 3.612.392, sottoposte controllo 787.550, tributari 10.286.247, previdenza 291.036, enti settore specifico 113.076.380, altri debiti 15.928.833; TOTALE DEBITI 163.006.172. Sin bancos, bonos, soci ni otros financiadores. Debiti verso imprese controllanti (Filmauro) 3.612.392 son comerciales/intercompany, no finanziamento.
```

### Liga

```text
2019: tools/cargar.mjs 2026-10-08, verificado contra roster cacheado de "2018–19 Serie A" (tools/club-league-reference/it.json), coincidencia e
```

## 2018

### Ingresos

```text
2018: cargado por tools/cargar.mjs (2026-10-08) desde Clubes/Italia/Napoli/Napoli-bilancio-2018.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Italia/Napoli/Napoli-bilancio-2018.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | a) ricavi da gare in casa | pág. 6, precedente |
| 2 | b) percentuale su incassi gare da squadre ospitanti | pág. 6, precedente |
| 3 | c) abbonamenti | pág. 6, precedente |
| 4 | d) altri ricavi da gare | pág. 6, precedente |
| 5 | Sponsor ufficiali | pág. 38, precedente |
| 6 | Sponsor tecnico | pág. 38, precedente |
| 7 | Sponsor istituzionali | pág. 38, precedente |
| 8 | Partner commerciali | pág. 38, precedente |
| 9 | Altre sponsorizzazioni | pág. 38, precedente |
| 10 | c) proventi pubblicitari | pág. 6, precedente |
| 11 | Proventi da merchandising | pág. 39, precedente |
| 12 | Proventi da licensing | pág. 39, precedente |
| 13 | Altri proventi commerciali | pág. 39, precedente |
| 14 | Proventi televisivi | pág. 39, precedente |
| 15 | Proventi televisivi da competizione Uefa | pág. 39, precedente |
| 16 | Proventi televisivi gare amichevoli | pág. 39, precedente |
| 17 | Altri Proventi TV | pág. 39, precedente |
| 18 | Proventi radiofonici | pág. 39, precedente |
| 19 | Proventi sfruttamento diritti d'immagine | pág. 39, precedente |
| 20 | g) ricavi per cessione temporanea calciatori | pág. 6, precedente |
| 21 | h) plusvalenza da cessione diritti pluriennali calciatori | pág. 6, precedente |
| 22 | i) altri proventi da gestione calciatori | pág. 6, precedente |
| 23 | - proventi da enti federali (L.N.P.) | pág. 40, precedente |
| 24 | - proventi produzioni televisive | pág. 40, precedente |
| 25 | - partecipazione gare amichevoli | pág. 40, precedente |
| 26 | - altri ricavi | pág. 40, precedente |

### Gastos

```text
tools/cargar.mjs (2026-10-08)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Acquisto materiale sportivo | pág. 42, precedente |
| 2 | Acquisto materiale indumenti | pág. 42, precedente |
| 3 | Acquisto materiale di consumo | pág. 42, precedente |
| 4 | Acquisto materiale di cancelleria e stampati | pág. 42, precedente |
| 5 | Acquisto medicinali | pág. 42, precedente |
| 6 | Beni destinati alla rivendita | pág. 42, precedente |
| 7 | Costi per tesserati ed attività sportiva | pág. 42, precedente |
| 8 | Costi specifici tecnici | pág. 42, precedente |
| 9 | Costi vitto, alloggio, locomozione gare | pág. 42, precedente |
| 10 | Servizio biglietteria e controllo ingressi | pág. 42, precedente |
| 11 | Assicurative e previdenziali | pág. 42, precedente |
| 12 | Compensi Amministratori | pág. 42, precedente |
| 13 | Amministrative, pubblicitarie e generali | pág. 42, precedente |
| 14 | Altri | pág. 42, precedente |
| 15 | Locazioni operative | pág. 43, precedente |
| 16 | Affitto centro tecnico, campi sportivi e canone concessione stadio | pág. 43, precedente |
| 17 | Altri costi per godimento beni terzi | pág. 43, precedente |
| 18 | Compensi contrattuali calciatori | pág. 44, precedente |
| 19 | Quota variabile retrib. calc. legata ai risultati sportivi | pág. 44, precedente |
| 20 | Compensi contrattuali allenatori | pág. 44, precedente |
| 21 | Quota variabile retrib. allen. legata ai risultati sportivi | pág. 44, precedente |
| 22 | Compensi contrattuali istruttori, tecnici e altri tess. | pág. 44, precedente |
| 23 | Altri salari e stipendi | pág. 44, precedente |
| 24 | b) oneri sociali | pág. 6, precedente |
| 25 | Trattamento di fine rapporto | pág. 44, precedente |
| 26 | Indennità fine carriera | pág. 44, precedente |
| 27 | e) altri costi | pág. 6, precedente |
| 28 | Amm.to diritti plur. prestazioni calciatori | pág. 45, precedente |
| 29 | Altre immobilizzazioni immateriali | pág. 45, precedente |
| 30 | Impianti | pág. 45, precedente |
| 31 | Macchinari | pág. 45, precedente |
| 32 | Attrezzature | pág. 45, precedente |
| 33 | Macchine ufficio | pág. 45, precedente |
| 34 | Mobili e arredi | pág. 45, precedente |
| 35 | c) altre svalutazioni delle immobilizzazioni | pág. 6, precedente |
| 36 | d) svalut.dei crediti compresi nel circolante | pág. 6, precedente |
| 37 | - Iniziali | pág. 46, Claude 0.8 |
| 38 | - Finali | pág. 46, Claude 0.8 |
| 39 | - Iniziali | pág. 46, Claude 0.8 |
| 40 | - Finali | pág. 46, Claude 0.8 |
| 41 | - Svalutazione Rimanenze Finali | pág. 46, Jev 1 |
| 42 | - Utilizzo Fondo Svalutaz. Merci destinate alla rivend. | pág. 46, Jev 1 |
| 43 | - Iniziali | pág. 46, Claude 0.8 |
| 44 | - Finali | pág. 46, Claude 0.8 |
| 45 | Accantonamenti per rischi | pág. 6, Jev 0.97 |
| 46 | b) tasse iscrizione gare | pág. 7, precedente |
| 47 | c) oneri specifici v/squadre ospitate | pág. 7, precedente |
| 48 | d) costi per acquisizione temporanea calciatori | pág. 7, precedente |
| 49 | f) altri oneri di gestione calciatori | pág. 7, precedente |
| 50 | - indennizzi Lega e Uefa | pág. 46, precedente |
| 51 | - rappresentanza e omaggi | pág. 46, precedente |
| 52 | - diversi | pág. 46, precedente |

### Meta

```text
tools/cargar.mjs (2026-10-08). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

```text
tools/caja-deuda.mjs (2026-10-16): cash escalón 1b (compuerta: documento siguiente): "Totale Disponibilità liquide (IV)" pág. 5
```

```text
tools/caja-deuda.mjs (2026-10-17): grossDebt escalón 0 (compuerta: ajuste manual): ajuste manual (2026-10-17): Claude 2026-10-17 (leído en el balance por subagente Sonnet, criterio de deuda financiera con socios): Sin filas de deuda financiera: DEBITI = fornitori 21.858.681, controllanti 815.405, sottoposte a controllo controllanti 1.230.460, tributari 4.569.974, previdenza 371.050, enti settore specifico 93.459.773, altri debiti 17.291.439; TOTALE DEBITI 143.988.321. Sin bancos, bonos, soci ni otros financiadores; el rendiconto finanziario (L339-342) muestra variacion 0 en obbligazioni, soci, banche y altri finanziatori. Documento OCR Mistral, cifras coherentes con el total.
```

### Liga

```text
2018: tools/cargar.mjs 2026-10-08, verificado contra roster cacheado de "2017–18 Serie A" (tools/club-league-reference/it.json), coincidencia e
```

## Gestiones

_antes de Aurelio De Laurentiis (data/gestiones/it.js):_

```text
De Laurentiis: "presidente y dueño desde 2004" tras la quiebra (solo el año; 01/09 aproximado, verano de 2004).
```

## Fuentes

### (general)

```text
Fuentes de cada ejercicio: las agrega tools/cargar.mjs adentro de este bloque (Versión 379: hasta la 378 el esqueleto no lo traía y la
primera carga de un club dado de alta por script se revertía, "no encontré Object.assign(sources, {"; caso: Fortaleza CEIF).
```

### napoli-it-bilancio-2025

_note (data/):_

```text
Cargado por tools/cargar.mjs (2026-10-07) desde la transcripción Clubes/Italia/Napoli/Napoli-bilancio-2025.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### napoli-it-bilancio-2024

_note (data/):_

```text
Cargado por tools/cargar.mjs (2026-10-07) desde la transcripción Clubes/Italia/Napoli/Napoli-bilancio-2024.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### napoli-it-bilancio-2023

_note (data/):_

```text
Cargado por tools/cargar.mjs (2026-10-08) desde la transcripción Clubes/Italia/Napoli/Napoli-bilancio-2023.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### napoli-it-bilancio-2021

_note (data/):_

```text
Cargado por tools/cargar.mjs (2026-10-08) desde la transcripción Clubes/Italia/Napoli/Napoli-bilancio-2021.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### napoli-it-bilancio-2022

_note (data/):_

```text
Cargado por tools/cargar.mjs (2026-10-08) desde la transcripción Clubes/Italia/Napoli/Napoli-bilancio-2022.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### napoli-it-bilancio-2019

_note (data/):_

```text
Cargado por tools/cargar.mjs (2026-10-08) desde la transcripción Clubes/Italia/Napoli/Napoli-bilancio-2019.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### napoli-it-bilancio-2018

_note (data/):_

```text
Cargado por tools/cargar.mjs (2026-10-08) desde la transcripción Clubes/Italia/Napoli/Napoli-bilancio-2018.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### napoli-it-bilancio-2020

_note (data/):_

```text
Cargado por tools/cargar.mjs (2026-10-08) desde la transcripción Clubes/Italia/Napoli/Napoli-bilancio-2020.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```
