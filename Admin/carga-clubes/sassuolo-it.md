# sassuolo-it — evidencia de carga

Lo que había como comentario en `data/it/sassuolo-it-data.js`, movido tal cual por `tools/mover-comentarios-data.mjs` (la regla:
`Admin/CONVENCIONES-DATOS.md`, "data/<país>/<club>-data.js NO LLEVA COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y
meta. Las notas de cada fila van en una tabla con su número de fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
============================================================================
data/it/sassuolo-it-data.js — Unione Sportiva Sassuolo Calcio S.r.l. (Italia).
ALTA POR SCRIPT (tools/alta-club.mjs, 2026-10-07), SIN EJERCICIOS CARGADOS TODAVÍA:
las estructuras de abajo están vacías a propósito. Los rubros, los totales
oficiales y el resto del fiscalYearMeta los agrega la etapa de carga
(tools/proponer-carga.mjs / sesión de onboarding), que es también la que
reemplaza esta cabecera por la de siempre (fuente, perímetro, categorización).

Documento que originó el alta: Clubes/Italia/Sassuolo/Sassuolo-bilancio-2025.pdf

De dónde salió cada campo (estado según alta-club.mjs: ok / pendiente):
  id                 ok        "sassuolo-it" — slug de "Sassuolo" + '-it' (convención de clubId, Admin/CONVENCIONES.md Versión 129)
  name               ok        "Unione Sportiva Sassuolo Calcio S.r.l." — el .md, 6 veces (nombre del club + forma societaria)
  displayName        ok        "Sassuolo" — nombre de la carpeta del club en Clubes/
  country            ok        "IT" — carpeta de país "Italia" (tabla PAISES)
  reportingCurrency  ok        "EUR" — moneda de curso legal de Italia
  fiscalYearStart    ok        "01-01" — cierre del ejercicio: los demás .md del club (1 de 1 documentos cierran en el mes 12); este documento no alcanza solo
  sport              ok        "futbol" — el .md nombra el fútbol 31 veces y ningún otro deporte más que eso
  brandColor         pendiente (ausente) — tools/brand-color-reference/ (footylogos): [italia] sassuolo: #1EA451 Green, #000000 Black
  anio               ok        2025 — nombre del archivo (misma regla que onboard.mjs --quien)
  cierre             ok        "2025-12-31" — año del ejercicio + mes de cierre (los demás .md del club (1 de 1 documentos cierran en el mes 12); este documento no alcanza solo)
  reportType         ok        "official_balance_sheet" — el .md tiene un estado contable (resultados / balance) y el nombre del archivo no sugiere otro tipo
  perimetro          ok        "individual" — ajuste manual (Admin/registros/ajustes-manuales.jsonl, perimetro-senales 2026-10-06): perimetro-senales.mjs: 0 documento(s) con los dos estados votan —; 6 ejerc
  currency           ok        "EUR" — moneda de curso legal de Italia (tabla PAISES de alta-club.mjs)
  fxRef              ok        "EUR@2025-12-31" — el documento no declara tipo de cambio; FX_CLOSE ya tiene EUR@2025-12-31 = 0.8511 (Cierre BCE al 31/12/2025 (1 EUR = 1,1750 USD))
  sourceId           ok        "sassuolo-it-bilancio-2025" — clubId + nombre del archivo en slug
  liga               pendiente null — no aparece en los rosters cacheados de 2025 (it-seriea): puede haber jugado otra división

FISCAL YEAR META PROPUESTO para 2025 (NO registrado: un ejercicio con meta y
sin rubros se vería en el sitio como un año en cero, y "sin dato no es cero"):
  2025: {"reportType":"official_balance_sheet","currency":"EUR","fxRef":"EUR@2025-12-31","sourceId":"sassuolo-it-bilancio-2025"}
============================================================================
```

_de data/clubs.js:_

```text
Sassuolo: alta por tools/alta-club.mjs (2026-10-07) desde Clubes/Italia/Sassuolo/Sassuolo-bilancio-2025.pdf.
brandColor y su procedencia: Admin/sourcing/Italia/Sassuolo.md.
```

_de data/club-leagues/it.js:_

```text
Sassuolo (alta-club.mjs, 2026-10-07): SIN VERIFICAR (no aparece en los rosters cacheados de 2025 (it-seriea): puede haber jugado otra división).
```

_de data/club-leagues/it.js:_

```text
2025 (cierre 31/12/2025): Serie A 2025-26, ascendido como campeón de la Serie B 2024-25 (it.wikipedia, Serie_B_2024-2025); regla: la categoría al cierre del ejercicio // 2021: tools/cargar.mjs 2026-10-08, verificado contra roster cacheado de "2021–22 Serie A" (tools/club-league-reference/it.json), coincidencia e // 2024: verificado 2026-10-09 contra roster cacheado de "2024–25 Serie B" (cierre 31/12/2024) (tools/club-league-reference/it.json), "Sassuolo" // 2019: tools/cargar.mjs 2026-10-08, verificado contra roster cacheado de "2019–20 Serie A" (tools/club-league-reference/it.json), coincidencia e // 2020: tools/cargar.mjs 2026-10-08, verificado contra roster cacheado de "2020–21 Serie A" (tools/club-league-reference/it.json), coincidencia e // 2022: tools/cargar.mjs 2026-10-08, verificado contra roster cacheado de "2022–23 Serie A" (tools/club-league-reference/it.json), coincidencia e // 2023: tools/cargar.mjs 2026-10-08, verificado contra roster cacheado de "2023–24 Serie A" (tools/club-league-reference/it.json), coincidencia e // 2018: tools/cargar.mjs 2026-10-09, verificado contra roster cacheado de "2018–19 Serie A" (tools/club-league-reference/it.json), coincidencia e
```

## 2025

### Ingresos

```text
2025: cargado por tools/cargar.mjs (2026-10-07) desde Clubes/Italia/Sassuolo/Sassuolo-bilancio-2025.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Italia/Sassuolo/Sassuolo-bilancio-2025.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Ricavi da gare in casa | pág. 49, Jev 0.97 |
| 2 | Abbonamenti | pág. 49, Jev 0.98 |
| 3 | Ricavi store | pág. 49, Jev 0.96 |
| 4 | Proventi da sponsorizzazioni | pág. 49, precedente |
| 5 | Proventi pubblicitari | pág. 49, precedente |
| 6 | Proventi commerciali e royalties | pág. 49, precedente |
| 7 | Proventi da cessione diritti televisivi | pág. 49, precedente |
| 8 | Plusvalenze da cessione diritti pluriennali prestazioni dei calciatori | pág. 49, precedente |
| 9 | Proventi da cessioni temporanee calciatori | pág. 49, precedente |
| 10 | Proventi Lega non audiovisivi | pág. 49, precedente |
| 11 | Proventi diversi | pág. 49, precedente |

### Gastos

```text
tools/cargar.mjs (2026-10-07)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | 6) Per materie prime, sussidiarie, di consumo e di merci | pág. 20, Jev 0.99 |
| 2 | Costi per tesserati | pág. 51, precedente |
| 3 | Costi per attività sportiva | pág. 51, precedente |
| 4 | Costi specifici tecnici | pág. 51, precedente |
| 5 | Compensi per Agenti e intermediari | pág. 51, Claude 0.8 |
| 6 | Costi vitto, alloggio, locomozione gare | pág. 51, Jev 0.99 |
| 7 | Assicurative e previdenziali | pág. 51, precedente |
| 8 | Amministrative e generali | pág. 51, Jev 1 |
| 9 | Altri | pág. 51, Claude 0.8 |
| 10 | 8) Per godimento di beni di terzi | pág. 20, precedente |
| 11 | a) Salari e stipendi | pág. 20, Jev 0.96 |
| 12 | b) Oneri sociali | pág. 20, precedente |
| 13 | c) Trattamento di fine rapporto | pág. 20, precedente |
| 14 | e) altri costi | pág. 20, Jev 0.99 |
| 15 | a) Ammortamento delle immobilizzazioni immateriali | pág. 20, precedente |
| 16 | b) Ammortamento delle immobilizzazioni materiali | pág. 20, Jev 1 |
| 17 | d) Svalutazioni crediti dell'attivo | pág. 20, Jev 0.97 |
| 18 | 11) Variazioni delle rimanenze | pág. 20, Jev 1 |
| 19 | Spese organizzazione gare | pág. 54, Jev 0.99 |
| 20 | Tasse iscrizioni gare | pág. 54, precedente |
| 21 | Oneri contribuzione Lega | pág. 54, precedente |
| 22 | Costi per acquisizione temporanea prestazioni calciatori | pág. 54, precedente |
| 23 | Premi valorizzazione, di addestramento e Carriera | pág. 54, precedente |
| 24 | Contributo Solidarietà Fifa | pág. 54, precedente |
| 25 | Premi di rendimento | pág. 54, Jev 0.97 |
| 26 | Sopravvenienze passive | pág. 54, Jev 0.99 |
| 27 | Oneri tributari indiretti | pág. 54, Jev 0.99 |
| 28 | Altri | pág. 54, Claude 0.8 |

### Meta

```text
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-07): fila = 34.086.540. Guido 2026-10-07: el estado agrupa la TV en "a) Derivanti da attività accessorie" (50.291.540, L583); la nota (L1629, en miles) la abre: Proventi da cessione diritti televisivi 16.205. La nota y el estado difieren 0,097 M en cómo reparten a) y f), por eso el desglose no se abrió solo
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-07): fila = 16.205.000. Guido 2026-10-07: el estado agrupa la TV en "a) Derivanti da attività accessorie" (50.291.540, L583); la nota (L1629, en miles) la abre: Proventi da cessione diritti televisivi 16.205. La nota y el estado difieren 0,097 M en cómo reparten a) y f), por eso el desglose no se abrió solo
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-07): categoria = broadcasting. Guido 2026-10-07: el estado agrupa la TV en "a) Derivanti da attività accessorie" (50.291.540, L583); la nota (L1629, en miles) la abre: Proventi da cessione diritti televisivi 16.205. La nota y el estado difieren 0,097 M en cómo reparten a) y f), por eso el desglose no se abrió solo,
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-07): categoria = other_income. Guido 2026-10-07: el estado agrupa la TV en "a) Derivanti da attività accessorie" (50.291.540, L583); la nota (L1629, en miles) la abre: Proventi da cessione diritti televisivi 16.205. La nota y el estado difieren 0,097 M en cómo reparten a) y f), por eso el desglose no se abrió solo
tools/cargar.mjs (2026-10-07). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

## 2024

### Ingresos

```text
2024: cargado por tools/cargar.mjs (2026-10-08) desde Clubes/Italia/Sassuolo/Sassuolo-bilancio-2024.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Italia/Sassuolo/Sassuolo-bilancio-2024.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Ricavi da gare in casa | pág. 47, precedente |
| 2 | Ricavi da gare fuori casa | pág. 47, Jev 0.99 |
| 3 | Abbonamenti | pág. 47, precedente |
| 4 | Ricavi store | pág. 47, precedente |
| 5 | Proventi da sponsorizzazioni | pág. 48, precedente |
| 6 | Proventi pubblicitari | pág. 48, precedente |
| 7 | Proventi da cessione diritti televisivi | pág. 48, precedente |
| 8 | Plusvalenze da cessione diritti pluriennali prestazioni dei calciatori | pág. 48, precedente |
| 9 | Proventi da cessioni temporanee calciatori | pág. 48, precedente |
| 10 | Proventi Lega non audiovisivi | pág. 48, precedente |
| 11 | Proventi diversi | pág. 48, precedente |

### Gastos

```text
tools/cargar.mjs (2026-10-08)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | 6) Per materie prime, sussidiarie, di consumo e di merci | pág. 20, precedente |
| 2 | Costi per tesserati | pág. 49, precedente |
| 3 | Costi per attività sportiva | pág. 49, precedente |
| 4 | Costi specifici tecnici | pág. 49, precedente |
| 5 | Compensi per Agenti e intermediari | pág. 49, precedente |
| 6 | Costi vitto, alloggio, locomozione gare | pág. 49, precedente |
| 7 | Assicurative e previdenziali | pág. 50, precedente |
| 8 | Amministrative e generali | pág. 50, precedente |
| 9 | Altri | pág. 50, precedente |
| 10 | 8) Per godimento di beni di terzi | pág. 20, precedente |
| 11 | a) Salari e stipendi | pág. 20, precedente |
| 12 | b) Oneri sociali | pág. 20, precedente |
| 13 | c) Trattamento di fine rapporto | pág. 20, precedente |
| 14 | e) altri costi | pág. 20, precedente |
| 15 | a) Ammortamento delle immobilizzazioni immateriali | pág. 20, precedente |
| 16 | b) Ammortamento delle immobilizzazioni materiali | pág. 20, precedente |
| 17 | d) Svalutazioni crediti dell'attivo | pág. 20, precedente |
| 18 | 11) Variazioni delle rimanenze | pág. 20, precedente |
| 19 | Spese organizzazione gare | pág. 52, precedente |
| 20 | Tasse iscrizioni gare | pág. 52, precedente |
| 21 | Oneri contribuzione Lega | pág. 52, precedente |
| 22 | Costi per acquisizione temporanea prestazioni calciatori | pág. 52, precedente |
| 23 | Minusvalenze cessione diritti pluriennali prestazioni calciatori | pág. 52, Jev 0.99 |
| 24 | Premi valorizzazione, di addestramento e Carriera | pág. 53, precedente |
| 25 | Contributo Solidarietà Fifa | pág. 53, precedente |
| 26 | Premi di rendimento | pág. 53, precedente |
| 27 | Sopravvenienze passive | pág. 53, precedente |
| 28 | Spese, ammende e multe gare | pág. 53, Jev 0.9 |
| 29 | Oneri tributari indiretti | pág. 53, precedente |
| 30 | Altri | pág. 53, precedente |

### Meta

```text
2024: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-08): cierre = 2024-12-31. Bilancio al 31 dicembre 2024
tools/cargar.mjs (2026-10-08). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

## 2023

### Ingresos

```text
2023: cargado por tools/cargar.mjs (2026-10-08) desde Clubes/Italia/Sassuolo/Sassuolo-bilancio-2023.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Italia/Sassuolo/Sassuolo-bilancio-2023.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Ricavi da gare in casa | pág. 46, precedente |
| 2 | Abbonamenti | pág. 46, precedente |
| 3 | Ricavi store | pág. 46, precedente |
| 4 | Proventi da sponsorizzazioni | pág. 46, precedente |
| 5 | Proventi pubblicitari | pág. 46, precedente |
| 6 | Proventi da cessione diritti televisivi | pág. 47, precedente |
| 7 | Plusvalenze da cessione diritti pluriennali prestazioni dei calciatori | pág. 47, precedente |
| 8 | Proventi da cessioni temporanee calciatori | pág. 47, precedente |
| 9 | Proventi Lega non audiovisivi | pág. 47, precedente |
| 10 | Proventi diversi | pág. 47, precedente |

### Gastos

```text
tools/cargar.mjs (2026-10-08)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | 6) Per materie prime, sussidiarie, di consumo e di merci | pág. 20, precedente |
| 2 | Costi per tesserati | pág. 48, precedente |
| 3 | Costi per attività sportiva | pág. 48, precedente |
| 4 | Costi specifici tecnici | pág. 48, precedente |
| 5 | Compensi per Agenti e intermediari | pág. 48, precedente |
| 6 | Costi vitto, alloggio, locomozione gare | pág. 48, precedente |
| 7 | Assicurative e previdenziali | pág. 48, precedente |
| 8 | Amministrative e generali | pág. 48, precedente |
| 9 | Altri | pág. 48, precedente |
| 10 | 8) Per godimento di beni di terzi | pág. 20, precedente |
| 11 | a) Salari e stipendi | pág. 20, precedente |
| 12 | b) Oneri sociali | pág. 20, precedente |
| 13 | c) Trattamento di fine rapporto | pág. 20, precedente |
| 14 | e) altri costi | pág. 20, precedente |
| 15 | a) Ammortamento delle immobilizzazioni immateriali | pág. 20, precedente |
| 16 | b) Ammortamento delle immobilizzazioni materiali | pág. 20, precedente |
| 17 | d) Svalutazioni crediti dell'attivo | pág. 20, precedente |
| 18 | 11) Variazioni delle rimanenze | pág. 20, precedente |
| 19 | Spese organizzazione gare | pág. 51, precedente |
| 20 | Tasse iscrizioni gare | pág. 51, precedente |
| 21 | Oneri contribuzione Lega | pág. 51, precedente |
| 22 | Costi per acquisizione temporanea prestazioni calciatori | pág. 51, precedente |
| 23 | Minusvalenze cessione diritti pluriennali prestazioni calciatori | pág. 51, precedente |
| 24 | Premi valorizzazione, di addestramento e Carriera | pág. 51, precedente |
| 25 | Contributo Solidarietà Fifa | pág. 51, precedente |
| 26 | Premi di rendimento | pág. 51, precedente |
| 27 | Sopravvenienze passive | pág. 52, precedente |
| 28 | Spese, ammende e multe gare | pág. 52, precedente |
| 29 | Oneri tributari indiretti | pág. 52, precedente |
| 30 | Altri | pág. 52, precedente |

### Meta

```text
2023: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-08): cierre = 2023-12-31. Bilancio al 31 dicembre 2023 (portada del documento, .md); Sassuolo cierra el 31/12 (Guido pidió el ajuste manual, 2026-10-08)
tools/cargar.mjs (2026-10-08). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

## 2022

### Ingresos

```text
2022: cargado por tools/cargar.mjs (2026-10-08) desde Clubes/Italia/Sassuolo/Sassuolo-bilancio-2022.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Italia/Sassuolo/Sassuolo-bilancio-2022.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Ricavi da gare in casa | pág. 42, precedente |
| 2 | Ricavi da gare fuori casa | pág. 42, precedente |
| 3 | Abbonamenti | pág. 42, precedente |
| 4 | Ricavi store | pág. 42, precedente |
| 5 | Proventi da sponsorizzazioni | pág. 43, precedente |
| 6 | Proventi pubblicitari | pág. 43, precedente |
| 7 | Proventi da cessione diritti televisivi | pág. 43, precedente |
| 8 | Plusvalenze da cessione diritti pluriennali prestazioni dei calciatori | pág. 43, precedente |
| 9 | Proventi da cessioni temporanee calciatori | pág. 43, precedente |
| 10 | Proventi Lega non audiovisivi | pág. 43, precedente |
| 11 | Proventi diversi | pág. 43, precedente |

### Gastos

```text
tools/cargar.mjs (2026-10-08)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | 6) Per materie prime, sussidiarie, di consumo e di merci | pág. 19, precedente |
| 2 | Costi per tesserati | pág. 44, precedente |
| 3 | Costi per attività sportiva | pág. 44, precedente |
| 4 | Costi specifici tecnici | pág. 44, precedente |
| 5 | Compensi per Agenti e intermediari | pág. 44, precedente |
| 6 | Costi vitto, alloggio, locomozione gare | pág. 44, precedente |
| 7 | Assicurative e previdenziali | pág. 44, precedente |
| 8 | Amministrative e generali | pág. 44, precedente |
| 9 | Altri | pág. 44, precedente |
| 10 | 8) Per godimento di beni di terzi | pág. 19, precedente |
| 11 | a) Salari e stipendi | pág. 19, precedente |
| 12 | b) Oneri sociali | pág. 19, precedente |
| 13 | c) Trattamento di fine rapporto | pág. 19, precedente |
| 14 | e) altri costi | pág. 19, precedente |
| 15 | a) Ammortamento delle immobilizzazioni immateriali | pág. 19, precedente |
| 16 | b) Ammortamento delle immobilizzazioni materiali | pág. 19, precedente |
| 17 | d) Svalutazioni crediti dell'attivo | pág. 19, precedente |
| 18 | 11) Variazioni delle rimanenze | pág. 19, precedente |
| 19 | Spese organizzazione gare | pág. 47, precedente |
| 20 | Tasse iscrizioni gare | pág. 47, precedente |
| 21 | Oneri contribuzione Lega | pág. 47, precedente |
| 22 | Costi per acquisizione temporanea prestazioni calciatori | pág. 47, precedente |
| 23 | Minusvalenze cessione diritti pluriennali prestazioni calciatori | pág. 48, precedente |
| 24 | Premi valorizzazione, di addestramento e Carriera | pág. 48, precedente |
| 25 | Contributo Solidarietà Fifa | pág. 48, precedente |
| 26 | Sopravvenienze passive | pág. 48, precedente |
| 27 | Spese, ammende e multe gare | pág. 48, precedente |
| 28 | Oneri tributari indiretti | pág. 48, precedente |
| 29 | Altri | pág. 48, precedente |

### Meta

```text
2022: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-08): cierre = 2022-12-31. Bilancio al 31 dicembre 2022 (portada del documento, .md); Sassuolo cierra el 31/12 (Guido pidió el ajuste manual, 2026-10-08)
tools/cargar.mjs (2026-10-08). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

## 2021

### Ingresos

```text
2021: cargado por tools/cargar.mjs (2026-10-08) desde Clubes/Italia/Sassuolo/Sassuolo-bilancio-2021.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Italia/Sassuolo/Sassuolo-bilancio-2021.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Ricavi da gare in casa | pág. 42, precedente |
| 2 | Abbonamenti | pág. 42, precedente |
| 3 | Ricavi store | pág. 42, precedente |
| 4 | Proventi da sponsorizzazioni | pág. 43, precedente |
| 5 | Proventi pubblicitari | pág. 43, precedente |
| 6 | Proventi da cessione diritti televisivi | pág. 43, precedente |
| 7 | Plusvalenze da cessione diritti pluriennali prestazioni dei calciatori | pág. 43, precedente |
| 8 | Proventi da cessioni temporanee calciatori | pág. 43, precedente |
| 9 | Proventi Lega non audiovisivi | pág. 43, precedente |
| 10 | Proventi diversi | pág. 43, precedente |

### Gastos

```text
tools/cargar.mjs (2026-10-08)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | 6) Per materie prime, sussidiarie, di consumo e di merci | pág. 18, precedente |
| 2 | Costi per tesserati | pág. 44, precedente |
| 3 | Costi per attività sportiva | pág. 44, precedente |
| 4 | Costi specifici tecnici | pág. 44, precedente |
| 5 | Compensi per Agenti e intermediari | pág. 44, precedente |
| 6 | Costi vitto, alloggio, locomozione gare | pág. 44, precedente |
| 7 | Assicurative e previdenziali | pág. 44, precedente |
| 8 | Amministrative e generali | pág. 44, precedente |
| 9 | Altri | pág. 44, precedente |
| 10 | 8) Per godimento di beni di terzi | pág. 18, precedente |
| 11 | a) Salari e stipendi | pág. 18, precedente |
| 12 | b) Oneri sociali | pág. 18, precedente |
| 13 | c) Trattamento di fine rapporto | pág. 18, precedente |
| 14 | e) altri costi | pág. 18, precedente |
| 15 | a) Ammortamento delle immobilizzazioni immateriali | pág. 18, precedente |
| 16 | b) Ammortamento delle immobilizzazioni materiali | pág. 18, precedente |
| 17 | d) Svalutazioni crediti dell'attivo | pág. 18, precedente |
| 18 | 11) Variazioni delle rimanenze | pág. 18, precedente |
| 19 | Spese organizzazione gare | pág. 47, precedente |
| 20 | Tasse iscrizioni gare | pág. 47, precedente |
| 21 | Oneri contribuzione Lega | pág. 47, precedente |
| 22 | Costi per acquisizione temporanea prestazioni calciatori | pág. 47, precedente |
| 23 | Minusvalenze cessione diritti pluriennali prestazioni calciatori | pág. 47, Jev 0.99 |
| 24 | Premi valorizzazione, di addestramento e Carriera | pág. 48, precedente |
| 25 | Contributo Solidarietà Fifa | pág. 48, precedente |
| 26 | Sopravvenienze passive | pág. 48, precedente |
| 27 | Spese, ammende e multe gare | pág. 48, Jev 0.9 |
| 28 | Oneri tributari indiretti | pág. 48, precedente |
| 29 | Altri | pág. 48, precedente |

### Meta

```text
2021: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-08): cierre = 2021-12-31. Bilancio al 31 dicembre 2021
tools/cargar.mjs (2026-10-08). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

## 2020

### Ingresos

```text
2020: cargado por tools/cargar.mjs (2026-10-08) desde Clubes/Italia/Sassuolo/Sassuolo-bilancio-2020.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Italia/Sassuolo/Sassuolo-bilancio-2020.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Ricavi da gare in casa | pág. 43, precedente |
| 2 | Abbonamenti | pág. 43, precedente |
| 3 | Ricavi store | pág. 43, precedente |
| 4 | Proventi da sponsorizzazioni | pág. 43, precedente |
| 5 | Proventi pubblicitari | pág. 43, precedente |
| 6 | Proventi da cessione diritti televisivi | pág. 43, precedente |
| 7 | Plusvalenze da cessione diritti pluriennali prestazioni dei calciatori | pág. 43, precedente |
| 8 | Proventi da cessioni temporanee calciatori | pág. 44, precedente |
| 9 | Proventi Lega non audiovisivi | pág. 44, precedente |
| 10 | Proventi diversi | pág. 44, precedente |

### Gastos

```text
tools/cargar.mjs (2026-10-08)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | 6) Per materie prime, sussidiarie, di consumo e di merci | pág. 19, precedente |
| 2 | Costi per tesserati | pág. 45, precedente |
| 3 | Costi per attività sportiva | pág. 45, precedente |
| 4 | Costi specifici tecnici | pág. 45, precedente |
| 5 | Compensi per Agenti e intermediari | pág. 45, precedente |
| 6 | Costi vitto, alloggio, locomozione gare | pág. 45, precedente |
| 7 | Assicurative e previdenziali | pág. 45, precedente |
| 8 | Amministrative e generali | pág. 45, precedente |
| 9 | Altri | pág. 45, precedente |
| 10 | 8) Per godimento di beni di terzi | pág. 19, precedente |
| 11 | a) Salari e stipendi | pág. 19, precedente |
| 12 | b) Oneri sociali | pág. 19, precedente |
| 13 | c) Trattamento di fine rapporto | pág. 19, precedente |
| 14 | e) altri costi | pág. 19, precedente |
| 15 | a) Ammortamento delle immobilizzazioni immateriali | pág. 19, precedente |
| 16 | b) Ammortamento delle immobilizzazioni materiali | pág. 19, precedente |
| 17 | d) Svalutazioni crediti dell'attivo | pág. 19, precedente |
| 18 | 11) Variazioni delle rimanenze | pág. 19, precedente |
| 19 | Spese organizzazione gare | pág. 48, precedente |
| 20 | Tasse iscrizioni gare | pág. 48, precedente |
| 21 | Oneri contribuzione Lega | pág. 48, precedente |
| 22 | Costi per acquisizione temporanea prestazioni calciatori | pág. 48, precedente |
| 23 | Minusvalenze cessione diritti pluriennali prestazioni calciatori | pág. 48, precedente |
| 24 | Premi valorizzazione, di addestramento e Carriera | pág. 48, precedente |
| 25 | Contributo Solidarietà Fifa | pág. 48, precedente |
| 26 | Sopravvenienze passive | pág. 48, precedente |
| 27 | Spese, ammende e multe gare | pág. 48, precedente |
| 28 | Oneri tributari indiretti | pág. 48, precedente |
| 29 | Altri | pág. 48, precedente |

### Meta

```text
2020: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-08): cierre = 2020-12-31. Bilancio al 31 dicembre 2020 (portada del documento, .md); Sassuolo cierra el 31/12 (Guido pidió el ajuste manual, 2026-10-08)
tools/cargar.mjs (2026-10-08). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

## 2019

### Ingresos

```text
2019: cargado por tools/cargar.mjs (2026-10-08) desde Clubes/Italia/Sassuolo/Sassuolo-bilancio-2019.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Italia/Sassuolo/Sassuolo-bilancio-2019.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Ricavi da gare in casa | pág. 41, precedente |
| 2 | Ricavi da gare fuori casa | pág. 41, precedente |
| 3 | Abbonamenti | pág. 41, precedente |
| 4 | Proventi da sponsorizzazioni | pág. 41, Jev 1 |
| 5 | Proventi pubblicitari | pág. 41, Jev 1 |
| 6 | Proventi da cessione diritti televisivi | pág. 41, Jev 1 |
| 7 | Proventi da cessioni temporanee calciatori | pág. 42, Jev 0.96 |
| 8 | Proventi diversi | pág. 42, Jev 1 |
| 9 | b) plusvalenze | pág. 18, Jev 0.99 |
| 10 | f) Contributi in conto esercizio | pág. 18, Jev 0.98 |

### Gastos

```text
tools/cargar.mjs (2026-10-08)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | 6) Per materie prime, sussidiarie, di consumo e di merci | pág. 18, precedente |
| 2 | Costi per tesserati | pág. 43, precedente |
| 3 | Costi per attività sportiva | pág. 43, precedente |
| 4 | Costi specifici tecnici | pág. 43, precedente |
| 5 | Compensi per Agenti e intermediari | pág. 43, precedente |
| 6 | Costi vitto, alloggio, locomozione gare | pág. 43, precedente |
| 7 | Assicurative e previdenziali | pág. 43, precedente |
| 8 | Amministrative e generali | pág. 43, precedente |
| 9 | Altri | pág. 43, precedente |
| 10 | 8) Per godimento di beni di terzi | pág. 18, precedente |
| 11 | a) Salari e stipendi | pág. 18, precedente |
| 12 | b) Oneri sociali | pág. 18, precedente |
| 13 | c) Trattamento di fine rapporto | pág. 18, precedente |
| 14 | e) altri costi | pág. 18, precedente |
| 15 | a) Ammortamento delle immobilizzazioni immateriali | pág. 18, precedente |
| 16 | b) Ammortamento delle immobilizzazioni materiali | pág. 18, precedente |
| 17 | c) altre svalutazioni delle immobilizzazioni | pág. 18, Jev 0.98 |
| 18 | d) Svalutazioni crediti dell'attivo | pág. 18, precedente |
| 19 | Spese organizzazione gare | pág. 46, precedente |
| 20 | Tasse iscrizioni gare | pág. 46, precedente |
| 21 | Oneri contribuzione Lega | pág. 46, precedente |
| 22 | Percentuale su incassi gare a squadre ospitate | pág. 46, Jev 0.99 |
| 23 | Costi per acquisizione temporanea prestazioni calciatori | pág. 46, precedente |
| 24 | Minusvalenze cessione diritti pluriennali prestazioni calciatori | pág. 46, precedente |
| 25 | Premi valorizzazione | pág. 46, Jev 0.96 |
| 26 | Contributo Solidarietà Fifa | pág. 46, precedente |
| 27 | Premi rendimento | pág. 46, Jev 0.98 |
| 28 | Sopravvenienze passive | pág. 46, precedente |
| 29 | Spese, ammende e multe gare | pág. 46, precedente |
| 30 | Oneri tributari indiretti | pág. 46, precedente |
| 31 | Altri | pág. 46, precedente |

### Meta

```text
2019: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-08): cierre = 2019-12-31. Bilancio al 31 dicembre 2019 (portada del documento, .md); Sassuolo cierra el 31/12 (Guido pidió el ajuste manual, 2026-10-08)
tools/cargar.mjs (2026-10-08). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

## 2018

### Ingresos

```text
2018: cargado por tools/cargar.mjs (2026-10-09) desde Clubes/Italia/Sassuolo/Sassuolo-bilancio-2018.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Italia/Sassuolo/Sassuolo-bilancio-2018.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Ricavi da gare in casa | pág. 40, precedente |
| 2 | Abbonamenti | pág. 40, precedente |
| 3 | Proventi da sponsorizzazioni | pág. 40, precedente |
| 4 | Proventi pubblicitari | pág. 40, precedente |
| 5 | Proventi da cessione diritti televisivi | pág. 40, precedente |
| 6 | Plusvalenze da cessione diritti pluriennali prestazioni dei calciatori | pág. 40, precedente |
| 7 | Proventi da cessioni temporanee calciatori | pág. 40, precedente |
| 8 | Proventi Lega non audiovisivi | pág. 40, precedente |
| 9 | Proventi Uefa Europa League | pág. 40, ? 0.75 |
| 10 | Proventi diversi | pág. 40, precedente |

### Gastos

```text
tools/cargar.mjs (2026-10-09)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | 6) Per materie prime, sussidiarie, di consumo e di merci | pág. 17, precedente |
| 2 | Costi per tesserati | pág. 42, precedente |
| 3 | Costi per attività sportiva | pág. 42, precedente |
| 4 | Costi specifici tecnici | pág. 42, precedente |
| 5 | Compensi per Agenti e intermediari | pág. 42, precedente |
| 6 | Costi vitto, alloggio, locomozione gare | pág. 42, precedente |
| 7 | Assicurative e previdenziali | pág. 42, precedente |
| 8 | Amministrative e generali | pág. 42, precedente |
| 9 | Altri | pág. 42, precedente |
| 10 | 8) Per godimento di beni di terzi | pág. 17, precedente |
| 11 | a) Salari e stipendi | pág. 17, precedente |
| 12 | b) Oneri sociali | pág. 17, precedente |
| 13 | c) Trattamento di fine rapporto | pág. 17, precedente |
| 14 | e) altri costi | pág. 17, precedente |
| 15 | a) Ammortamento delle immobilizzazioni immateriali | pág. 17, precedente |
| 16 | b) Ammortamento delle immobilizzazioni materiali | pág. 17, precedente |
| 17 | c) altre svalutazioni delle immobilizzazioni | pág. 17, precedente |
| 18 | d) Svalutazioni crediti dell'attivo | pág. 17, precedente |
| 19 | Tasse iscrizioni gare | pág. 45, precedente |
| 20 | Oneri contribuzione Lega | pág. 45, precedente |
| 21 | Percentuale su incassi gare a squadre ospitate | pág. 45, precedente |
| 22 | Costi per acquisizione temporanea prestazioni calciatori | pág. 45, precedente |
| 23 | Minusvalenze cessione diritti pluriennali prestazioni calciatori | pág. 45, precedente |
| 24 | Premi valorizzazione | pág. 45, precedente |
| 25 | Contributo Solidarietà Fifa | pág. 45, precedente |
| 26 | Premi rendimento | pág. 45, precedente |
| 27 | Sopravvenienze passive | pág. 45, precedente |
| 28 | Spese, ammende e multe gare | pág. 45, precedente |
| 29 | Oneri tributari indiretti | pág. 45, precedente |
| 30 | Altri | pág. 45, precedente |

### Meta

```text
2018: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-08): cierre = 2018-12-31. Bilancio al 31 dicembre 2018 (portada del documento, .md); Sassuolo cierra el 31/12 (Guido pidió el ajuste manual, 2026-10-08)
tools/cargar.mjs (2026-10-09). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

## Gestiones

_antes de Carlo Rossi (data/gestiones/it.js):_

```text
Carlo Rossi, presidente del consejo (dueña: la familia Squinzi, vía Mapei). Las fuentes dicen 2003 o 2004; 01/01/2004 por convención.
```

## Fuentes

### (general)

```text
Fuentes de cada ejercicio: las agrega tools/cargar.mjs adentro de este bloque (Versión 379: hasta la 378 el esqueleto no lo traía y la
primera carga de un club dado de alta por script se revertía, "no encontré Object.assign(sources, {"; caso: Fortaleza CEIF).
```

### sassuolo-it-bilancio-2025

_note (data/):_

```text
Cargado por tools/cargar.mjs (2026-10-07) desde la transcripción Clubes/Italia/Sassuolo/Sassuolo-bilancio-2025.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### sassuolo-it-bilancio-2021

_note (data/):_

```text
Cargado por tools/cargar.mjs (2026-10-08) desde la transcripción Clubes/Italia/Sassuolo/Sassuolo-bilancio-2021.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### sassuolo-it-bilancio-2024

_note (data/):_

```text
Cargado por tools/cargar.mjs (2026-10-08) desde la transcripción Clubes/Italia/Sassuolo/Sassuolo-bilancio-2024.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### sassuolo-it-bilancio-2019

_note (data/):_

```text
Cargado por tools/cargar.mjs (2026-10-08) desde la transcripción Clubes/Italia/Sassuolo/Sassuolo-bilancio-2019.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### sassuolo-it-bilancio-2020

_note (data/):_

```text
Cargado por tools/cargar.mjs (2026-10-08) desde la transcripción Clubes/Italia/Sassuolo/Sassuolo-bilancio-2020.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### sassuolo-it-bilancio-2022

_note (data/):_

```text
Cargado por tools/cargar.mjs (2026-10-08) desde la transcripción Clubes/Italia/Sassuolo/Sassuolo-bilancio-2022.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### sassuolo-it-bilancio-2023

_note (data/):_

```text
Cargado por tools/cargar.mjs (2026-10-08) desde la transcripción Clubes/Italia/Sassuolo/Sassuolo-bilancio-2023.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### sassuolo-it-bilancio-2018

_note (data/):_

```text
Cargado por tools/cargar.mjs (2026-10-09) desde la transcripción Clubes/Italia/Sassuolo/Sassuolo-bilancio-2018.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```
