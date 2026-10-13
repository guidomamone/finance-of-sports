# genoa-it — evidencia de carga

Lo que había como comentario en `data/genoa-it-data.js`, movido tal cual por `tools/mover-comentarios-data.mjs` (la regla:
`Admin/CONVENCIONES-DATOS.md`, "data/<club>-data.js NO LLEVA COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y
meta. Las notas de cada fila van en una tabla con su número de fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
============================================================================
data/genoa-it-data.js — Genoa Cricket and Football Club S.p.A. (Italia).
ALTA POR SCRIPT (tools/alta-club.mjs, 2026-10-08), SIN EJERCICIOS CARGADOS TODAVÍA:
las estructuras de abajo están vacías a propósito. Los rubros, los totales
oficiales y el resto del fiscalYearMeta los agrega la etapa de carga
(tools/proponer-carga.mjs / sesión de onboarding), que es también la que
reemplaza esta cabecera por la de siempre (fuente, perímetro, categorización).

Documento que originó el alta: Clubes/Italia/Genoa/Genoa-bilancio-31.12.2022-individual.pdf

De dónde salió cada campo (estado según alta-club.mjs: ok / pendiente):
  id                 ok        "genoa-it" — slug de "Genoa" + '-it' (convención de clubId, Admin/CONVENCIONES.md Versión 129)
  name               ok        "Genoa Cricket and Football Club S.p.A." — respuesta de Guido en la cola (ef0de19)
  displayName        ok        "Genoa" — nombre de la carpeta del club en Clubes/
  country            ok        "IT" — carpeta de país "Italia" (tabla PAISES)
  reportingCurrency  ok        "EUR" — moneda de curso legal de Italia
  fiscalYearStart    ok        "07-01" — el documento más reciente del club (Genoa-bilancio-30.06.2025-consolidato.md, cierre mes 6): el cierre CAMBIÓ en el tiempo (mes 6: 2024,2025,2025 / me
  sport              ok        "futbol" — el .md nombra el fútbol -117 veces y ningún otro deporte más que eso
  brandColor         pendiente (ausente) — tools/brand-color-reference/ (footylogos): [italia] genoa: #002942 Dark Blue, #AB131C Dark Red, #FFD600 Yellow, #FFFFFF White
  anio               ok        2022 — nombre del archivo (misma regla que onboard.mjs --quien), confirmado por las fechas de cierre del .md
  cierre             ok        "2022-12-31" — año del ejercicio + mes de cierre (nombre del archivo (2022-12-31) y contenido del .md (214 de 278 fechas de fin de mes))
  reportType         ok        "official_balance_sheet" — el .md tiene un estado contable (resultados / balance) y el nombre del archivo no sugiere otro tipo
  perimetro          ok        "individual" — ajuste manual (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): Guido 2026-10-07: individual (Genoa Cricket and Football Club S.p.A.); único perímetro
  currency           ok        "EUR" — moneda de curso legal de Italia (tabla PAISES de alta-club.mjs)
  fxRef              ok        "EUR@2022-12-31" — el documento no declara tipo de cambio; FX_CLOSE ya tiene EUR@2022-12-31 = 0.937559 (Tipo de referencia del Banco Central Europeo, última rueda hábil 
  sourceId           ok        "genoa-it-bilancio-31-12-2022-individual" — clubId + nombre del archivo en slug
  liga               ok        "it-serieb" — roster cacheado de "2022–23 Serie B" (tools/club-league-reference/it.json), coincidencia exacta "Genoa"

FISCAL YEAR META PROPUESTO para 2022 (NO registrado: un ejercicio con meta y
sin rubros se vería en el sitio como un año en cero, y "sin dato no es cero"):
  2022: {"reportType":"official_balance_sheet","currency":"EUR","fxRef":"EUR@2022-12-31","sourceId":"genoa-it-bilancio-31-12-2022-individual"}
============================================================================
```

_de data/clubs.js:_

```text
Genoa: alta por tools/alta-club.mjs (2026-10-08) desde Clubes/Italia/Genoa/Genoa-bilancio-31.12.2022-individual.pdf.
```

_de data/club-leagues/it.js:_

```text
Genoa (alta-club.mjs, 2026-10-08): verificado contra roster cacheado de "2022–23 Serie B" (tools/club-league-reference/it.json), coincidencia exacta "Genoa".
```

## 2025

### Ingresos

```text
2025: cargado por tools/cargar.mjs (2026-10-08) desde Clubes/Italia/Genoa/Genoa-bilancio-30.06.2025-individual.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Italia/Genoa/Genoa-bilancio-30.06.2025-individual.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Gare campionato | pág. 89, precedente |
| 2 | Gare coppa italia | pág. 89, precedente |
| 3 | Altre gare | pág. 89, Jev 0.95 |
| 4 | Abbonamenti | pág. 89, precedente |
| 5 | Contributi in conto esercizio | pág. 90, precedente |
| 6 | Proventi da sponsorizzazioni | pág. 90, precedente |
| 7 | Proventi pubblicitari | pág. 90, Jev 1 |
| 8 | Proventi commerciali e royalties | pág. 90, precedente |
| 9 | Proventi da cessione diritti televisivi | pág. 90, Jev 1 |
| 10 | Ricavi da cessione temporanea prestazioni calciatori (prestiti) | pág. 90, precedente |
| 11 | Plusvalenze da cessione dei diritti pluriennali alle prestazioni dei calciatori | pág. 90, Jev 0.99 |
| 12 | Altri proventi da gestione calciatori | pág. 90, precedente |
| 13 | Altri ricavi e proventi | pág. 90, Jev 0.98 |

### Gastos

```text
tools/cargar.mjs (2026-10-08)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Materiale sportivo e indumenti | pág. 92, Claude 0.8 |
| 2 | Altro | pág. 92, Jev 0.95 |
| 3 | Costi per tesserati | pág. 92, precedente |
| 4 | Costi per attività sportiva | pág. 92, precedente |
| 5 | Costi specifici tecnici | pág. 92, precedente |
| 6 | Costi vitto, alloggio, locomozione gare | pág. 92, precedente |
| 7 | Servizio biglietteria, controllo ingressi | pág. 92, precedente |
| 8 | Costi di Service | pág. 92, precedente |
| 9 | Assicurative e previdenziali | pág. 92, precedente |
| 10 | Amministrative, pubblicitarie e generali | pág. 92, precedente |
| 11 | Commissioni Varie | pág. 92, Jev 0.94 |
| 12 | 8) per godimento di beni di terzi | pág. 12, precedente |
| 13 | a) salari e stipendi | pág. 12, precedente |
| 14 | b) oneri sociali | pág. 12, precedente |
| 15 | c) trattamento di fine rapporto | pág. 12, precedente |
| 16 | a) ammortamento delle immobilizzazioni immateriali | pág. 12, Claude 0.93 |
| 17 | b) ammortamento delle immobilizzazioni materiali | pág. 12, Jev 1 |
| 18 | c) altre svalutazioni delle immobilizzazioni | pág. 12, precedente |
| 19 | 11) variazioni delle rimanenze di materie prime, sussidiarie, di consumo e merci | pág. 12, Jev 1 |
| 20 | 12) accantonamenti per rischi | pág. 12, precedente |
| 21 | Spese varie organizzazione gare | pág. 95, precedente |
| 22 | Tasse iscrizioni gare | pág. 95, precedente |
| 23 | Oneri specifici verso squadre ospitate | pág. 95, Jev 1 |
| 24 | Costi per acquisizione temporanea prestazioni calciatori | pág. 95, precedente |
| 25 | Minusvalenze da cessione diritti pluriennali alle prestazioni dei calciatori | pág. 95, Jev 1 |
| 26 | Costi valorizzazione calciatori | pág. 95, precedente |
| 27 | Contributo di solidarietà | pág. 95, precedente |
| 28 | Premio alla carriera ex art. 99 bis N.O.I.F. | pág. 95, precedente |
| 29 | Spese, ammende e multe gare | pág. 95, precedente |
| 30 | Oneri lega | pág. 95, precedente |
| 31 | Oneri tributari indiretti | pág. 95, precedente |
| 32 | Altri (Sopravvenienze Passive) | pág. 95, precedente |

### Meta

```text
2025: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): name = Genoa Cricket and Football Club S.p.A.. Guido 2026-10-07: la sociedad que juega (perímetro individual)
tools/cargar.mjs (2026-10-08). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
2025: tools/cargar.mjs 2026-10-08, verificado contra roster cacheado de "2024–25 Serie A" (tools/club-league-reference/it.json), coincidencia e
```

## 2023

### Ingresos

```text
2023: cargado por tools/cargar.mjs (2026-10-08) desde Clubes/Italia/Genoa/Genoa-bilancio-31.12.2023-individual.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Italia/Genoa/Genoa-bilancio-31.12.2023-individual.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Gare campionato | pág. 93, precedente |
| 2 | Gare coppa italia | pág. 93, precedente |
| 3 | Altre gare | pág. 93, precedente |
| 4 | Gare coppa italia | pág. 93, precedente |
| 5 | Abbonamenti | pág. 93, precedente |
| 6 | contributi in conto esercizio | pág. 13, Claude 0.95 |
| 7 | Proventi da sponsorizzazioni | pág. 94, precedente |
| 8 | Proventi pubblicitari | pág. 94, precedente |
| 9 | Proventi commerciali e royalties | pág. 94, precedente |
| 10 | Proventi da cessione diritti televisivi | pág. 94, precedente |
| 11 | Ricavi da cessione temporanea prestazioni calciatori (prestiti) | pág. 94, precedente |
| 12 | Plusvalenze da cessione dei diritti pluriennali alle prestazioni dei calciatori | pág. 94, precedente |
| 13 | Altri proventi da gestione calciatori | pág. 94, precedente |
| 14 | Altri ricavi e proventi | pág. 94, precedente |

### Gastos

```text
tools/cargar.mjs (2026-10-08)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | 6) per materie prime, sussidiarie, di consumo e di merci | pág. 13, Jev 0.99 |
| 2 | Costi per tesserati | pág. 97, precedente |
| 3 | Costi per attività sportiva | pág. 97, precedente |
| 4 | Costi specifici tecnici | pág. 97, precedente |
| 5 | Costi vitto, alloggio, locomozione gare | pág. 97, precedente |
| 6 | Servizio biglietteria, controllo ingressi | pág. 97, precedente |
| 7 | Costi di Service | pág. 97, precedente |
| 8 | Assicurative e previdenziali | pág. 97, precedente |
| 9 | Amministrative, pubblicitarie e generali | pág. 97, precedente |
| 10 | 8) per godimento di beni di terzi | pág. 13, precedente |
| 11 | a) salari e stipendi | pág. 13, precedente |
| 12 | b) oneri sociali | pág. 13, precedente |
| 13 | c) trattamento di fine rapporto | pág. 13, precedente |
| 14 | Diritti pluriennali calciatori 1° squadra | pág. 100, Jev 0.92 |
| 15 | Diritti pluriennali calciatori settore giovanile | pág. 100, Jev 0.99 |
| 16 | c) altre svalutazioni delle immobilizzazioni | pág. 13, precedente |
| 17 | 11) variazioni delle rimanenze di materie prime, sussidiarie, di consumo e merci | pág. 13, precedente |
| 18 | 12) accantonamenti per rischi | pág. 13, precedente |
| 19 | Spese varie organizzazione gare | pág. 101, precedente |
| 20 | Tasse iscrizioni gare | pág. 101, precedente |
| 21 | Oneri specifici verso squadre ospitate | pág. 101, precedente |
| 22 | Costi per acquisizione temporanea prestazioni calciatori | pág. 101, precedente |
| 23 | Minusvalenze da cessione diritti pluriennali alle prestazioni dei calciatori | pág. 101, precedente |
| 24 | Costi valorizzazione calciatori | pág. 101, precedente |
| 25 | Contributo di solidarietà | pág. 101, precedente |
| 26 | Premio alla carriera *ex art. 99 bis N.O.I.F. | pág. 101, precedente |
| 27 | Spese, ammende e multe gare | pág. 101, precedente |
| 28 | Oneri lega | pág. 101, precedente |
| 29 | Oneri tributari indiretti | pág. 101, precedente |
| 30 | Altri (Sopravvenienze Passive) | pág. 101, precedente |

### Meta

```text
2023: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-08): fila = (10.323.759). Claude 2026-10-08 (Guido: to-do 179 grupo 1, a mano): Codice Civile: el 17) altri se imprime en positivo y se resta por posición; el script lo sumaba. C impreso (9.579.460)
2023: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-08): fila = (12.799). Claude 2026-10-08 (Guido: to-do 179 grupo 1, a mano): es un provento: reduce el total de impuestos, que el documento imprime (2.712.602) en L403; sumaba al revés
2023: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-08): confirmado = 2022. Claude 2026-10-08 (Guido: Genoa 2023, ok): el PDF figura digital pero el texto de la pág. 13 (el estado) no trae estos números; el estado cierra exacto con el resultado impreso (-32.541.764), con sus totales y con la columna 2022 del documento de 2022
2023: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-08): confirmado = 6.021.395. Claude 2026-10-08 (Guido: Genoa 2023, ok): el PDF figura digital pero el texto de la pág. 13 (el estado) no trae estos números; el estado cierra exacto con el resultado impreso (-32.541.764), con sus totales y con la columna 2022 del documento de 2022
2023: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-08): confirmado = 3.110.505. Claude 2026-10-08 (Guido: Genoa 2023, ok): el PDF figura digital pero el texto de la pág. 13 (el estado) no trae estos números; el estado cierra exacto con el resultado impreso (-32.541.764), con sus totales y con la columna 2022 del documento de 2022
2023: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-08): confirmado = 4.730.058. Claude 2026-10-08 (Guido: Genoa 2023, ok): el PDF figura digital pero el texto de la pág. 13 (el estado) no trae estos números; el estado cierra exacto con el resultado impreso (-32.541.764), con sus totales y con la columna 2022 del documento de 2022
2023: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-08): confirmado = 29.918.278. Claude 2026-10-08 (Guido: Genoa 2023, ok): el PDF figura digital pero el texto de la pág. 13 (el estado) no trae estos números; el estado cierra exacto con el resultado impreso (-32.541.764), con sus totales y con la columna 2022 del documento de 2022
2023: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-08): confirmado = 106.232.032. Claude 2026-10-08 (Guido: Genoa 2023, ok): el PDF figura digital pero el texto de la pág. 13 (el estado) no trae estos números; el estado cierra exacto con el resultado impreso (-32.541.764), con sus totales y con la columna 2022 del documento de 2022
2023: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-08): confirmado = 51.634.857. Claude 2026-10-08 (Guido: Genoa 2023, ok): el PDF figura digital pero el texto de la pág. 13 (el estado) no trae estos números; el estado cierra exacto con el resultado impreso (-32.541.764), con sus totales y con la columna 2022 del documento de 2022
2023: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-08): confirmado = 110.962.090. Claude 2026-10-08 (Guido: Genoa 2023, ok): el PDF figura digital pero el texto de la pág. 13 (el estado) no trae estos números; el estado cierra exacto con el resultado impreso (-32.541.764), con sus totales y con la columna 2022 del documento de 2022
2023: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-08): confirmado = 81.553.135. Claude 2026-10-08 (Guido: Genoa 2023, ok): el PDF figura digital pero el texto de la pág. 13 (el estado) no trae estos números; el estado cierra exacto con el resultado impreso (-32.541.764), con sus totales y con la columna 2022 del documento de 2022
2023: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-08): confirmado = 116.983.485. Claude 2026-10-08 (Guido: Genoa 2023, ok): el PDF figura digital pero el texto de la pág. 13 (el estado) no trae estos números; el estado cierra exacto con el resultado impreso (-32.541.764), con sus totales y con la columna 2022 del documento de 2022
2023: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-08): confirmado = 84.663.640. Claude 2026-10-08 (Guido: Genoa 2023, ok): el PDF figura digital pero el texto de la pág. 13 (el estado) no trae estos números; el estado cierra exacto con el resultado impreso (-32.541.764), con sus totales y con la columna 2022 del documento de 2022
2023: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-08): confirmado = 1.015.716. Claude 2026-10-08 (Guido: Genoa 2023, ok): el PDF figura digital pero el texto de la pág. 13 (el estado) no trae estos números; el estado cierra exacto con el resultado impreso (-32.541.764), con sus totales y con la columna 2022 del documento de 2022
2023: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-08): confirmado = 164.498. Claude 2026-10-08 (Guido: Genoa 2023, ok): el PDF figura digital pero el texto de la pág. 13 (el estado) no trae estos números; el estado cierra exacto con el resultado impreso (-32.541.764), con sus totales y con la columna 2022 del documento de 2022
2023: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-08): confirmado = 23.532.578. Claude 2026-10-08 (Guido: Genoa 2023, ok): el PDF figura digital pero el texto de la pág. 13 (el estado) no trae estos números; el estado cierra exacto con el resultado impreso (-32.541.764), con sus totales y con la columna 2022 del documento de 2022
2023: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-08): confirmado = 15.140.901. Claude 2026-10-08 (Guido: Genoa 2023, ok): el PDF figura digital pero el texto de la pág. 13 (el estado) no trae estos números; el estado cierra exacto con el resultado impreso (-32.541.764), con sus totales y con la columna 2022 del documento de 2022
2023: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-08): confirmado = 3.785.918. Claude 2026-10-08 (Guido: Genoa 2023, ok): el PDF figura digital pero el texto de la pág. 13 (el estado) no trae estos números; el estado cierra exacto con el resultado impreso (-32.541.764), con sus totales y con la columna 2022 del documento de 2022
2023: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-08): confirmado = 3.007.074. Claude 2026-10-08 (Guido: Genoa 2023, ok): el PDF figura digital pero el texto de la pág. 13 (el estado) no trae estos números; el estado cierra exacto con el resultado impreso (-32.541.764), con sus totales y con la columna 2022 del documento de 2022
2023: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-08): confirmado = 60.082.004. Claude 2026-10-08 (Guido: Genoa 2023, ok): el PDF figura digital pero el texto de la pág. 13 (el estado) no trae estos números; el estado cierra exacto con el resultado impreso (-32.541.764), con sus totales y con la columna 2022 del documento de 2022
2023: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-08): confirmado = 70.221.072. Claude 2026-10-08 (Guido: Genoa 2023, ok): el PDF figura digital pero el texto de la pág. 13 (el estado) no trae estos números; el estado cierra exacto con el resultado impreso (-32.541.764), con sus totales y con la columna 2022 del documento de 2022
2023: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-08): confirmado = 3.734.692. Claude 2026-10-08 (Guido: Genoa 2023, ok): el PDF figura digital pero el texto de la pág. 13 (el estado) no trae estos números; el estado cierra exacto con el resultado impreso (-32.541.764), con sus totales y con la columna 2022 del documento de 2022
2023: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-08): confirmado = 4.546.914. Claude 2026-10-08 (Guido: Genoa 2023, ok): el PDF figura digital pero el texto de la pág. 13 (el estado) no trae estos números; el estado cierra exacto con el resultado impreso (-32.541.764), con sus totales y con la columna 2022 del documento de 2022
2023: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-08): confirmado = 554.082. Claude 2026-10-08 (Guido: Genoa 2023, ok): el PDF figura digital pero el texto de la pág. 13 (el estado) no trae estos números; el estado cierra exacto con el resultado impreso (-32.541.764), con sus totales y con la columna 2022 del documento de 2022
2023: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-08): confirmado = 619.956. Claude 2026-10-08 (Guido: Genoa 2023, ok): el PDF figura digital pero el texto de la pág. 13 (el estado) no trae estos números; el estado cierra exacto con el resultado impreso (-32.541.764), con sus totales y con la columna 2022 del documento de 2022
2023: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-08): confirmado = 64.370.778. Claude 2026-10-08 (Guido: Genoa 2023, ok): el PDF figura digital pero el texto de la pág. 13 (el estado) no trae estos números; el estado cierra exacto con el resultado impreso (-32.541.764), con sus totales y con la columna 2022 del documento de 2022
2023: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-08): confirmado = 75.387.942. Claude 2026-10-08 (Guido: Genoa 2023, ok): el PDF figura digital pero el texto de la pág. 13 (el estado) no trae estos números; el estado cierra exacto con el resultado impreso (-32.541.764), con sus totales y con la columna 2022 del documento de 2022
2023: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-08): confirmado = 19.452.175. Claude 2026-10-08 (Guido: Genoa 2023, ok): el PDF figura digital pero el texto de la pág. 13 (el estado) no trae estos números; el estado cierra exacto con el resultado impreso (-32.541.764), con sus totales y con la columna 2022 del documento de 2022
2023: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-08): confirmado = 3.845.322. Claude 2026-10-08 (Guido: Genoa 2023, ok): el PDF figura digital pero el texto de la pág. 13 (el estado) no trae estos números; el estado cierra exacto con el resultado impreso (-32.541.764), con sus totales y con la columna 2022 del documento de 2022
2023: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-08): confirmado = 27.866.728. Claude 2026-10-08 (Guido: Genoa 2023, ok): el PDF figura digital pero el texto de la pág. 13 (el estado) no trae estos números; el estado cierra exacto con el resultado impreso (-32.541.764), con sus totales y con la columna 2022 del documento de 2022
2023: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-08): confirmado = 23.297.497. Claude 2026-10-08 (Guido: Genoa 2023, ok): el PDF figura digital pero el texto de la pág. 13 (el estado) no trae estos números; el estado cierra exacto con el resultado impreso (-32.541.764), con sus totales y con la columna 2022 del documento de 2022
2023: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-08): confirmado = 304.581. Claude 2026-10-08 (Guido: Genoa 2023, ok): el PDF figura digital pero el texto de la pág. 13 (el estado) no trae estos números; el estado cierra exacto con el resultado impreso (-32.541.764), con sus totales y con la columna 2022 del documento de 2022
2023: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-08): confirmado = 411.247. Claude 2026-10-08 (Guido: Genoa 2023, ok): el PDF figura digital pero el texto de la pág. 13 (el estado) no trae estos números; el estado cierra exacto con el resultado impreso (-32.541.764), con sus totales y con la columna 2022 del documento de 2022
2023: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-08): confirmado = 349.732. Claude 2026-10-08 (Guido: Genoa 2023, ok): el PDF figura digital pero el texto de la pág. 13 (el estado) no trae estos números; el estado cierra exacto con el resultado impreso (-32.541.764), con sus totales y con la columna 2022 del documento de 2022
2023: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-08): confirmado = 21.782.092. Claude 2026-10-08 (Guido: Genoa 2023, ok): el PDF figura digital pero el texto de la pág. 13 (el estado) no trae estos números; el estado cierra exacto con el resultado impreso (-32.541.764), con sus totales y con la columna 2022 del documento de 2022
2023: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-08): confirmado = 32.866.910. Claude 2026-10-08 (Guido: Genoa 2023, ok): el PDF figura digital pero el texto de la pág. 13 (el estado) no trae estos números; el estado cierra exacto con el resultado impreso (-32.541.764), con sus totales y con la columna 2022 del documento de 2022
2023: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-08): confirmado = 142.658.391. Claude 2026-10-08 (Guido: Genoa 2023, ok): el PDF figura digital pero el texto de la pág. 13 (el estado) no trae estos números; el estado cierra exacto con el resultado impreso (-32.541.764), con sus totales y con la columna 2022 del documento de 2022
2023: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-08): confirmado = 150.625.801. Claude 2026-10-08 (Guido: Genoa 2023, ok): el PDF figura digital pero el texto de la pág. 13 (el estado) no trae estos números; el estado cierra exacto con el resultado impreso (-32.541.764), con sus totales y con la columna 2022 del documento de 2022
2023: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-08): confirmado = 25.674.906. Claude 2026-10-08 (Guido: Genoa 2023, ok): el PDF figura digital pero el texto de la pág. 13 (el estado) no trae estos números; el estado cierra exacto con el resultado impreso (-32.541.764), con sus totales y con la columna 2022 del documento de 2022
2023: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-08): confirmado = 65.962.161. Claude 2026-10-08 (Guido: Genoa 2023, ok): el PDF figura digital pero el texto de la pág. 13 (el estado) no trae estos números; el estado cierra exacto con el resultado impreso (-32.541.764), con sus totales y con la columna 2022 del documento de 2022
2023: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-08): confirmado = 11.352. Claude 2026-10-08 (Guido: Genoa 2023, ok): el PDF figura digital pero el texto de la pág. 13 (el estado) no trae estos números; el estado cierra exacto con el resultado impreso (-32.541.764), con sus totales y con la columna 2022 del documento de 2022
2023: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-08): confirmado = 138.916. Claude 2026-10-08 (Guido: Genoa 2023, ok): el PDF figura digital pero el texto de la pág. 13 (el estado) no trae estos números; el estado cierra exacto con el resultado impreso (-32.541.764), con sus totales y con la columna 2022 del documento de 2022
2023: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-08): confirmado = 47.250. Claude 2026-10-08 (Guido: Genoa 2023, ok): el PDF figura digital pero el texto de la pág. 13 (el estado) no trae estos números; el estado cierra exacto con el resultado impreso (-32.541.764), con sus totales y con la columna 2022 del documento de 2022
2023: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-08): confirmado = 19.529. Claude 2026-10-08 (Guido: Genoa 2023, ok): el PDF figura digital pero el texto de la pág. 13 (el estado) no trae estos números; el estado cierra exacto con el resultado impreso (-32.541.764), con sus totales y con la columna 2022 del documento de 2022
2023: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-08): confirmado = 186.305. Claude 2026-10-08 (Guido: Genoa 2023, ok): el PDF figura digital pero el texto de la pág. 13 (el estado) no trae estos números; el estado cierra exacto con el resultado impreso (-32.541.764), con sus totales y con la columna 2022 del documento de 2022
2023: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-08): confirmado = 502.708. Claude 2026-10-08 (Guido: Genoa 2023, ok): el PDF figura digital pero el texto de la pág. 13 (el estado) no trae estos números; el estado cierra exacto con el resultado impreso (-32.541.764), con sus totales y con la columna 2022 del documento de 2022
2023: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-08): confirmado = 689.013. Claude 2026-10-08 (Guido: Genoa 2023, ok): el PDF figura digital pero el texto de la pág. 13 (el estado) no trae estos números; el estado cierra exacto con el resultado impreso (-32.541.764), con sus totales y con la columna 2022 del documento de 2022
2023: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-08): confirmado = 747.615. Claude 2026-10-08 (Guido: Genoa 2023, ok): el PDF figura digital pero el texto de la pág. 13 (el estado) no trae estos números; el estado cierra exacto con el resultado impreso (-32.541.764), con sus totales y con la columna 2022 del documento de 2022
2023: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-08): confirmado = 158.487. Claude 2026-10-08 (Guido: Genoa 2023, ok): el PDF figura digital pero el texto de la pág. 13 (el estado) no trae estos números; el estado cierra exacto con el resultado impreso (-32.541.764), con sus totales y con la columna 2022 del documento de 2022
2023: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-08): confirmado = 10.323.759. Claude 2026-10-08 (Guido: Genoa 2023, ok): el PDF figura digital pero el texto de la pág. 13 (el estado) no trae estos números; el estado cierra exacto con el resultado impreso (-32.541.764), con sus totales y con la columna 2022 del documento de 2022
2023: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-08): confirmado = 5.297.416. Claude 2026-10-08 (Guido: Genoa 2023, ok): el PDF figura digital pero el texto de la pág. 13 (el estado) no trae estos números; el estado cierra exacto con el resultado impreso (-32.541.764), con sus totales y con la columna 2022 del documento de 2022
2023: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-08): confirmado = 3.316. Claude 2026-10-08 (Guido: Genoa 2023, ok): el PDF figura digital pero el texto de la pág. 13 (el estado) no trae estos números; el estado cierra exacto con el resultado impreso (-32.541.764), con sus totales y con la columna 2022 del documento de 2022
2023: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-08): confirmado = 23.841. Claude 2026-10-08 (Guido: Genoa 2023, ok): el PDF figura digital pero el texto de la pág. 13 (el estado) no trae estos números; el estado cierra exacto con el resultado impreso (-32.541.764), con sus totales y con la columna 2022 del documento de 2022
2023: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-08): confirmado = 9.579.460. Claude 2026-10-08 (Guido: Genoa 2023, ok): el PDF figura digital pero el texto de la pág. 13 (el estado) no trae estos números; el estado cierra exacto con el resultado impreso (-32.541.764), con sus totales y con la columna 2022 del documento de 2022
2023: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-08): confirmado = 5.162.770. Claude 2026-10-08 (Guido: Genoa 2023, ok): el PDF figura digital pero el texto de la pág. 13 (el estado) no trae estos números; el estado cierra exacto con el resultado impreso (-32.541.764), con sus totales y con la columna 2022 del documento de 2022
2023: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-08): confirmado = 35.254.366. Claude 2026-10-08 (Guido: Genoa 2023, ok): el PDF figura digital pero el texto de la pág. 13 (el estado) no trae estos números; el estado cierra exacto con el resultado impreso (-32.541.764), con sus totales y con la columna 2022 del documento de 2022
2023: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-08): confirmado = 71.124.931. Claude 2026-10-08 (Guido: Genoa 2023, ok): el PDF figura digital pero el texto de la pág. 13 (el estado) no trae estos números; el estado cierra exacto con el resultado impreso (-32.541.764), con sus totales y con la columna 2022 del documento de 2022
2023: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-08): confirmado = 1.559.129. Claude 2026-10-08 (Guido: Genoa 2023, ok): el PDF figura digital pero el texto de la pág. 13 (el estado) no trae estos números; el estado cierra exacto con el resultado impreso (-32.541.764), con sus totales y con la columna 2022 del documento de 2022
2023: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-08): confirmado = 847.954. Claude 2026-10-08 (Guido: Genoa 2023, ok): el PDF figura digital pero el texto de la pág. 13 (el estado) no trae estos números; el estado cierra exacto con el resultado impreso (-32.541.764), con sus totales y con la columna 2022 del documento de 2022
2023: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-08): confirmado = 1.051.785. Claude 2026-10-08 (Guido: Genoa 2023, ok): el PDF figura digital pero el texto de la pág. 13 (el estado) no trae estos números; el estado cierra exacto con el resultado impreso (-32.541.764), con sus totales y con la columna 2022 del documento de 2022
2023: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-08): confirmado = 5.310.717. Claude 2026-10-08 (Guido: Genoa 2023, ok): el PDF figura digital pero el texto de la pág. 13 (el estado) no trae estos números; el estado cierra exacto con el resultado impreso (-32.541.764), con sus totales y con la columna 2022 del documento de 2022
2023: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-08): confirmado = 8.589.283. Claude 2026-10-08 (Guido: Genoa 2023, ok): el PDF figura digital pero el texto de la pág. 13 (el estado) no trae estos números; el estado cierra exacto con el resultado impreso (-32.541.764), con sus totales y con la columna 2022 del documento de 2022
2023: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-08): confirmado = 12.799. Claude 2026-10-08 (Guido: Genoa 2023, ok): el PDF figura digital pero el texto de la pág. 13 (el estado) no trae estos números; el estado cierra exacto con el resultado impreso (-32.541.764), con sus totales y con la columna 2022 del documento de 2022
2023: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-08): confirmado = 1.654.981. Claude 2026-10-08 (Guido: Genoa 2023, ok): el PDF figura digital pero el texto de la pág. 13 (el estado) no trae estos números; el estado cierra exacto con el resultado impreso (-32.541.764), con sus totales y con la columna 2022 del documento de 2022
2023: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-08): confirmado = 2.712.602. Claude 2026-10-08 (Guido: Genoa 2023, ok): el PDF figura digital pero el texto de la pág. 13 (el estado) no trae estos números; el estado cierra exacto con el resultado impreso (-32.541.764), con sus totales y con la columna 2022 del documento de 2022
2023: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-08): confirmado = 9.396.310. Claude 2026-10-08 (Guido: Genoa 2023, ok): el PDF figura digital pero el texto de la pág. 13 (el estado) no trae estos números; el estado cierra exacto con el resultado impreso (-32.541.764), con sus totales y con la columna 2022 del documento de 2022
2023: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-08): confirmado = 32.541.764. Claude 2026-10-08 (Guido: Genoa 2023, ok): el PDF figura digital pero el texto de la pág. 13 (el estado) no trae estos números; el estado cierra exacto con el resultado impreso (-32.541.764), con sus totales y con la columna 2022 del documento de 2022
2023: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-08): confirmado = 61.728.621. Claude 2026-10-08 (Guido: Genoa 2023, ok): el PDF figura digital pero el texto de la pág. 13 (el estado) no trae estos números; el estado cierra exacto con el resultado impreso (-32.541.764), con sus totales y con la columna 2022 del documento de 2022
tools/cargar.mjs (2026-10-08). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
2023: tools/cargar.mjs 2026-10-08, verificado contra roster cacheado de "2023–24 Serie A" (tools/club-league-reference/it.json), coincidencia e
```

## 2022

### Ingresos

```text
2022: cargado por tools/cargar.mjs (2026-10-08) desde Clubes/Italia/Genoa/Genoa-bilancio-31.12.2022-individual.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Italia/Genoa/Genoa-bilancio-31.12.2022-individual.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Gare campionato | pág. 78, Jev 1 |
| 2 | Gare coppa Italia | pág. 78, Jev 0.99 |
| 3 | b) percentuale su incassi gare da squadre ospitanti | pág. 8, Jev 0.99 |
| 4 | c) abbonamenti | pág. 8, Jev 1 |
| 5 | a) contributi in conto esercizio | pág. 8, Jev 0.98 |
| 6 | - Paracadute retrocesse ex art. 18, comma 3, dello Statuto LNPA | pág. 8, precedente |
| 7 | b) proventi da sponsorizzazioni | pág. 8, Jev 1 |
| 8 | d) proventi commerciali e royalties | pág. 8, Jev 1 |
| 9 | - proventi televisivi | pág. 9, Jev 1 |
| 10 | g) ricavi da cessione temporanea prestazioni calciatori | pág. 9, Jev 0.98 |
| 11 | h) plusvalenze da cessione diritti pluriennali prestazioni calciatori | pág. 9, Jev 1 |
| 12 | i) altri proventi da gestione calciatori | pág. 9, Jev 0.94 |
| 13 | l) ricavi e proventi diversi | pág. 9, Jev 1 |

### Gastos

```text
tools/cargar.mjs (2026-10-08)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | 6) Per acquisti materiale di consumo e di merci | pág. 9, Jev 0.99 |
| 2 | Costi per tesserati | pág. 82, precedente |
| 3 | Costi per attività sportiva | pág. 82, precedente |
| 4 | Costi specifici tecnici | pág. 82, precedente |
| 5 | Costi vitto, alloggio, locomozione gare | pág. 82, Jev 0.98 |
| 6 | Servizio biglietteria, controllo ingressi | pág. 82, Claude 0.92 |
| 7 | Assicurative e previdenziali | pág. 82, Claude 0.85 |
| 8 | Amministrative, pubblicitarie e generali | pág. 82, Jev 1 |
| 9 | 8) Per godimento di beni di terzi | pág. 9, Jev 0.99 |
| 10 | a) salari e stipendi | pág. 9, Jev 1 |
| 11 | b) oneri sociali | pág. 9, Jev 0.95 |
| 12 | c) trattamento di fine rapporto | pág. 9, Jev 0.98 |
| 13 | a) ammortamenti immobilizzazioni immateriali | pág. 9, precedente |
| 14 | c) altre svalutazioni delle immobilizzazioni | pág. 9, Jev 0.95 |
| 15 | d) svalutazioni dei crediti nell'attivo circolante e nelle disponib. liquide | pág. 9, Jev 1 |
| 16 | 11) Variazioni delle rimanenze di materiale di consumo e di merci | pág. 9, Jev 1 |
| 17 | 12) Accantonamenti per rischi | pág. 9, Claude 0.88 |
| 18 | a) spese varie organizzazione gare | pág. 9, Jev 0.99 |
| 19 | b) tasse iscrizione gare | pág. 9, Jev 1 |
| 20 | - percentuale su diritti televisivi a squadre ospitate | pág. 9, Jev 0.94 |
| 21 | d) costi per acquisizione temporanea prestazioni calciatori | pág. 9, Jev 0.99 |
| 22 | e) minusvalenze da cessione diritti pluriennali prestazioni calciatori | pág. 9, Jev 0.99 |
| 23 | Costi valorizzazione calciatori | pág. 86, Claude 0.8 |
| 24 | Contributo di solidarietà | pág. 86, precedente |
| 25 | Premio alla carriera ex art. 99 bis N.O.I.F. | pág. 86, Claude 0.8 |
| 26 | Spese, ammende e multe gare | pág. 86, Claude 0.88 |
| 27 | Oneri lega | pág. 86, Claude 0.8 |
| 28 | Oneri tributari indiretti | pág. 86, Claude 0.92 |
| 29 | Altri (Sopravvenienze Passive) | pág. 86, Jev 0.93 |

### Meta

```text
2022: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-08): fila = (5.297.416). pág. 10 transcripta sin tabla: importes sin etiqueta (cola 3560b84)
2022: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-08): fila = 104. idem
2022: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-08): fila = (23.945). idem
2022: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-08): fila = (847.954). idem
2022: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-08): fila = 8.589.283. idem
2022: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-08): fila = 1.654.981. idem
2022: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-08): resultado-final = (61.728.621). el resultado del conto economico (pág. 10, transcripta como texto sin tabla) no se detecta; las filas (con el financiero y el impuesto por ajuste) dan -61.728.624 (3 € de redondeo); el impuesto deducido queda igual al impreso
tools/cargar.mjs (2026-10-08). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

## Fuentes

### (general)

```text
Fuentes de cada ejercicio: las agrega tools/cargar.mjs adentro de este bloque (Versión 379: hasta la 378 el esqueleto no lo traía y la
primera carga de un club dado de alta por script se revertía, "no encontré Object.assign(sources, {"; caso: Fortaleza CEIF).
```
