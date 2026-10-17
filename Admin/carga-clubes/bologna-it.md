# bologna-it — evidencia de carga

Lo que había como comentario en `data/it/bologna-it-data.js`, movido tal cual por `tools/archivo/mover-comentarios-data.mjs` (la regla:
`Admin/CONVENCIONES-DATOS.md`, "data/<país>/<club>-data.js NO LLEVA COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y
meta. Las notas de cada fila van en una tabla con su número de fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
============================================================================
data/it/bologna-it-data.js — Bologna F.C. 1909 S.p.A. (Italia).
ALTA POR SCRIPT (tools/alta-club.mjs, 2026-10-07), SIN EJERCICIOS CARGADOS TODAVÍA:
las estructuras de abajo están vacías a propósito. Los rubros, los totales
oficiales y el resto del fiscalYearMeta los agrega la etapa de carga
(tools/proponer-carga.mjs / sesión de onboarding), que es también la que
reemplaza esta cabecera por la de siempre (fuente, perímetro, categorización).

Documento que originó el alta: Clubes/Italia/Bologna/Bologna-bilancio-consolidato-2018-19.pdf

De dónde salió cada campo (estado según alta-club.mjs: ok / pendiente):
  id                 ok        "bologna-it" — slug de "Bologna" + '-it' (convención de clubId, Admin/CONVENCIONES.md Versión 129)
  name               ok        "Bologna F.C. 1909 S.p.A." — el .md, 47 veces (nombre del club + forma societaria)
  displayName        ok        "Bologna" — nombre de la carpeta del club en Clubes/
  country            ok        "IT" — carpeta de país "Italia" (tabla PAISES)
  reportingCurrency  ok        "EUR" — moneda de curso legal de Italia
  fiscalYearStart    ok        "07-01" — cierre del ejercicio: contenido del .md (149 de 151 fechas de fin de mes caen en el mes 6)
  sport              ok        "futbol" — el .md nombra el fútbol 16 veces y ningún otro deporte más que eso
  brandColor         pendiente (ausente) — tools/brand-color-reference/ (footylogos): [italia] bologna: #1B2838 Navy Blue, #9F1F33 Dark Red, #FFFFFF White, #DEDEE2 Light Grey
  anio               ok        2019 — nombre del archivo (misma regla que onboard.mjs --quien), confirmado por las fechas de cierre del .md
  cierre             ok        "2019-06-30" — año del ejercicio + mes de cierre (contenido del .md (149 de 151 fechas de fin de mes caen en el mes 6))
  reportType         ok        "official_balance_sheet" — el .md tiene un estado contable (resultados / balance) y el nombre del archivo no sugiere otro tipo
  perimetro          ok        "consolidado" — ajuste manual (Admin/registros/ajustes-manuales.jsonl, perimetro-senales 2026-10-06): perimetro-senales.mjs: 0 documento(s) con los dos estados votan —; 6 ejerc
  currency           ok        "EUR" — moneda de curso legal de Italia (tabla PAISES de alta-club.mjs)
  fxRef              ok        "EUR@2019-06-30" — el documento no declara tipo de cambio; FX_CLOSE ya tiene EUR@2019-06-30 = 0.878735 (Tipo de referencia del Banco Central Europeo, última rueda hábil 
  sourceId           ok        "bologna-it-bilancio-consolidato-2018-19" — clubId + nombre del archivo en slug
  liga               ok        "it-seriea" — roster cacheado de "2018–19 Serie A" (tools/club-league-reference/it.json), coincidencia exacta "Bologna"

FISCAL YEAR META PROPUESTO para 2019 (NO registrado: un ejercicio con meta y
sin rubros se vería en el sitio como un año en cero, y "sin dato no es cero"):
  2019: {"reportType":"official_balance_sheet","currency":"EUR","fxRef":"EUR@2019-06-30","sourceId":"bologna-it-bilancio-consolidato-2018-19"}
============================================================================
```

_de data/clubs.js:_

```text
Bologna: alta por tools/alta-club.mjs (2026-10-07) desde Clubes/Italia/Bologna/Bologna-bilancio-consolidato-2018-19.pdf.
brandColor y su procedencia: Admin/sourcing/Italia/Bologna.md.
```

_de data/club-leagues/it.js:_

```text
Bologna (alta-club.mjs, 2026-10-07): verificado contra roster cacheado de "2018–19 Serie A" (tools/club-league-reference/it.json), coincidencia exacta "Bologna".
```

## 2025

### Ingresos

```text
2025: cargado por tools/cargar.mjs (2026-10-08) desde Clubes/Italia/Bologna/Bologna-bilancio-individuale-2024-25.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Italia/Bologna/Bologna-bilancio-individuale-2024-25.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | a) ricavi da gare | pág. 25, precedente |
| 2 | a) contributi in conto esercizio | pág. 25, precedente |
| 3 | b) proventi da sponsorizzazione | pág. 25, precedente |
| 4 | c) proventi pubblicitari | pág. 25, precedente |
| 5 | d) proventi commerciali e royalties | pág. 25, precedente |
| 6 | e) proventi da cessione diritti audiovisivi | pág. 25, Jev 1 |
| 7 | f) ricavi da cessione temporanea prestazioni calciatori | pág. 25, precedente |
| 8 | g) plusvalenze da cessione diritti pluriennali prestazioni calciatori | pág. 25, precedente |
| 9 | h) altri proventi da trasferimento diritti calciatori | pág. 25, precedente |
| 10 | i) ricavi e proventi diversi | pág. 25, precedente |
| 11 | b) abbonamenti | pág. 25, precedente |

### Gastos

```text
tools/cargar.mjs (2026-10-08)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | 6) per materie prime, sussidiarie, di consumo e di merci | pág. 25, precedente |
| 2 | Costi per attività sportiva | pág. 59, precedente |
| 3 | Costi specifici tecnici | pág. 59, precedente |
| 4 | Costi vitto, alloggio, locomozione gare | pág. 59, precedente |
| 5 | Servizio biglietteria, controllo ingressi | pág. 59, precedente |
| 6 | Assicurative e previdenziali | pág. 59, precedente |
| 7 | Amministrative, pubblicitarie e generali | pág. 59, precedente |
| 8 | 8) per godimento di beni di terzi | pág. 26, precedente |
| 9 | a) salari e stipendi | pág. 26, precedente |
| 10 | b) oneri sociali | pág. 26, precedente |
| 11 | c) trattamento di fine rapporto | pág. 26, precedente |
| 12 | Diritti pluriennali alle prestazioni dei calciatori | pág. 61, precedente |
| 13 | Diritti di brevetto e diritti industriali | pág. 61, Claude 0.9 |
| 14 | Concessioni, licenze e marchi e diritti simili | pág. 61, precedente |
| 15 | Costi pluriennali su beni di terzi | pág. 61, precedente |
| 16 | terreni e fabbricati “costruzioni leggere” | pág. 61, precedente |
| 17 | impianti e macchinari | pág. 61, precedente |
| 18 | attrezzature industriali e commerciali | pág. 61, precedente |
| 19 | altri beni | pág. 61, precedente |
| 20 | c) altre svalutazioni delle immobilizzazioni | pág. 26, precedente |
| 21 | d) svalutazioni dei crediti compresi nell'attivo circolante e delle disponibilita' liquide | pág. 26, precedente |
| 22 | 12) accantonamenti per rischi | pág. 26, precedente |
| 23 | a) oneri da organizzazione competizioni | pág. 26, Jev 1 |
| 24 | b) costi per acquisizione temporanea prestazioni calciatori | pág. 26, precedente |
| 25 | c) minusvalenze da cessione diritti pluriennali prestazioni calciatori | pág. 26, precedente |
| 26 | d) altri oneri da trasferimento diritti calciatori | pág. 26, Jev 1 |
| 27 | e) altri oneri diversi di gestione | pág. 26, precedente |

### Meta

```text
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-08): fila = 8.655.990. Claude 2026-10-08 (Guido: Bologna 2025 a mano): error del documento. a) ricavi da gare 8.101.739 + b) abbonamenti 8.665.990 suman 16.767.729 pero el total impreso dice 16.757.729 (10.000 menos); el Totale valore della produzione 224.160.682 y el utile 13.954.040 cierran con el impreso. Se carga abbonamenti 8.655.990 (impreso menos los 10.000 de diferencia): las dos líneas son del mismo rubro, el rubro y el total quedan exactos
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-08): fila = 0. Claude 2026-10-08 (Guido: Bologna 2025 a mano): sale el subtotal de L1076 (16.757.729): ya no es la suma de sus dos renglones por el error de 10.000 del documento y se contaba además de ellos (ver el ajuste de abbonamenti)
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-08): fila = (11.156.522). Claude 2026-10-08 (Guido: Bologna 2025 a mano): formato Codice Civile: el 17) interessi ed altri oneri finanziari se imprime en positivo y se resta por posición; el script lo sumaba. Mismo caso que Bologna 2019-20 y 2020-21 (to-do 157/158)
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-08): fila = (43.130). Claude 2026-10-08 (Guido: Bologna 2025 a mano): rettifiche D 19) a) svalutazioni di partecipazioni 43.130 impreso en positivo y restado (Totale D (43.130), L1157). Del lado financiero como en Bologna 2019-20
tools/cargar.mjs (2026-10-08). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

```text
tools/caja-deuda.mjs (2026-10-16): grossDebt escalón 1 (compuerta: documento anterior): "4) debiti verso banche" pág. 24; cash escalón 1 (compuerta: documento anterior): "Disponibilità liquide" pág. 4
```

```text
tools/caja-deuda.mjs (2026-10-17): grossDebt escalón 0 (compuerta: ajuste manual): ajuste manual (2026-10-17): Claude 2026-10-17 (leído en el balance por subagente Sonnet, criterio de deuda financiera con socios): debiti verso soci per finanziamenti 9.235.000 + debiti verso banche 19.355.606. Corrige lo cargado (19.355.606): falta el finanziamento soci (9.235.000). Sin obbligazioni ni otros financiadores.
```

### Liga

```text
2025: tools/cargar.mjs 2026-10-08, verificado contra roster cacheado de "2024–25 Serie A" (tools/club-league-reference/it.json), coincidencia e
```

## 2024

### Ingresos

```text
2024: cargado por tools/cargar.mjs (2026-10-08) desde Clubes/Italia/Bologna/Bologna-bilancio-individuale-2023-24.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Italia/Bologna/Bologna-bilancio-individuale-2023-24.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | a) ricavi da gare | pág. 29, precedente |
| 2 | b) abbonamenti | pág. 29, precedente |
| 3 | a) contributi in conto esercizio | pág. 29, precedente |
| 4 | b) proventi da sponsorizzazione | pág. 29, precedente |
| 5 | c) proventi pubblicitari | pág. 29, precedente |
| 6 | d) proventi commerciali e royalties | pág. 29, precedente |
| 7 | e) proventi da cessione diritti audiovisivi | pág. 29, Jev 1 |
| 8 | f) ricavi da cessione temporanea prestazioni calciatori | pág. 29, precedente |
| 9 | g) plusvalenze da cessione diritti pluriennali prestazioni calciatori | pág. 29, precedente |
| 10 | h) altri proventi da trasferimento diritti calciatori | pág. 29, precedente |
| 11 | i) ricavi e proventi diversi | pág. 30, precedente |

### Gastos

```text
tools/cargar.mjs (2026-10-08)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | 6) per materie prime, sussidiarie, di consumo e di merci | pág. 30, precedente |
| 2 | Costi per attività sportiva | pág. 65, precedente |
| 3 | Costi specifici tecnici | pág. 65, precedente |
| 4 | Costi vitto, alloggio, locomozione gare | pág. 65, precedente |
| 5 | Servizio biglietteria, controllo ingressi | pág. 65, precedente |
| 6 | Assicurative e previdenziali | pág. 65, precedente |
| 7 | Amministrative, pubblicitarie e generali | pág. 65, precedente |
| 8 | 8) per godimento di beni di terzi | pág. 30, precedente |
| 9 | a) salari e stipendi | pág. 30, precedente |
| 10 | b) oneri sociali | pág. 30, precedente |
| 11 | c) trattamento di fine rapporto | pág. 30, precedente |
| 12 | Diritti pluriennali alle prestazioni dei calciatori | pág. 67, precedente |
| 13 | Concessioni, licenze e marchi e diritti simili | pág. 67, precedente |
| 14 | Costi pluriennali su beni di terzi | pág. 67, precedente |
| 15 | impianti e macchinari | pág. 67, precedente |
| 16 | attrezzature industriali e commerciali | pág. 67, precedente |
| 17 | altri beni | pág. 67, precedente |
| 18 | c) altre svalutazioni delle immobilizzazioni | pág. 30, precedente |
| 19 | 12) accantonamenti per rischi | pág. 30, precedente |
| 20 | Spese varie organizzazione gare | pág. 68, precedente |
| 21 | Tasse iscrizioni gare | pág. 68, precedente |
| 22 | Oneri specifici verso squadre ospitate: | pág. 68, precedente |
| 23 | b) costi per acquisizione temporanea prestazioni calciatori | pág. 30, precedente |
| 24 | c) minusvalenze da cessione diritti pluriennali prestazioni calciatori | pág. 30, precedente |
| 25 | d) altri oneri da trasferimento diritti calciatori | pág. 30, Jev 1 |
| 26 | e) altri oneri diversi di gestione | pág. 30, precedente |

### Meta

```text
2024: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-08): fila = (6.450.122). Claude 2026-10-08 (Guido: to-do 179 grupo 1, a mano): Codice Civile: el 17) interessi ed altri oneri finanziari se imprime en positivo y se resta por posición; el script lo sumaba (mismo caso que Bologna 2019-20, 2020-21 y 2025)
2024: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-08): fila = (259.314). Claude 2026-10-08 (Guido: to-do 179 grupo 1, a mano): rettifiche D 19) a) svalutazioni di partecipazioni impreso en positivo y restado
tools/cargar.mjs (2026-10-08). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

```text
tools/caja-deuda.mjs (2026-10-16): grossDebt escalón 1 (compuerta: documento siguiente): "4) debiti verso banche" pág. 28; cash escalón 1 (compuerta: documento siguiente): "Disponibilità liquide" pág. 8
```

```text
tools/caja-deuda.mjs (2026-10-17): grossDebt escalón 0 (compuerta: ajuste manual): ajuste manual (2026-10-17): Claude 2026-10-17 (leído en el balance por subagente Sonnet, criterio de deuda financiera con socios): debiti verso soci per finanziamenti 9.235.000 + debiti verso banche 28.839.624. Corrige lo cargado (28.839.624): falta el finanziamento soci (9.235.000). Sin obbligazioni ni otros financiadores; debiti verso imprese controllate = 0.
```

### Liga

```text
2024: tools/cargar.mjs 2026-10-08, verificado contra roster cacheado de "2023–24 Serie A" (tools/club-league-reference/it.json), coincidencia e
```

## 2023

### Ingresos

```text
2023: cargado por tools/cargar.mjs (2026-10-08) desde Clubes/Italia/Bologna/Bologna-bilancio-consolidato-2022-23.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Italia/Bologna/Bologna-bilancio-consolidato-2022-23.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | a) ricavi da gare | pág. 26, Jev 1 |
| 2 | b) abbonamenti | pág. 26, Jev 1 |
| 3 | c) altri | pág. 26, Jev 0.97 |
| 4 | a) contributi in conto esercizio | pág. 26, precedente |
| 5 | b) proventi da sponsorizzazione | pág. 27, precedente |
| 6 | c) proventi pubblicitari | pág. 27, precedente |
| 7 | d) proventi commerciali e royalties | pág. 27, precedente |
| 8 | Proventi da cessione diritti televisivi | pág. 58, precedente |
| 9 | Proventi vari | pág. 58, precedente |
| 10 | f) ricavi da cessione temporanea prestazione calciatori | pág. 27, Jev 0.98 |
| 11 | g) plusvalenze da cessione diritti pluriennali prestazione calciatori | pág. 27, Jev 1 |
| 12 | h) altri proventi da trasferimento diritti calciatori | pág. 27, Jev 0.99 |
| 13 | i) ricavi e proventi diversi | pág. 27, Jev 1 |

### Gastos

```text
tools/cargar.mjs (2026-10-08)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | 6) per materie prime, sussidiarie, di consumo e di merci | pág. 27, precedente |
| 2 | Costi per attività sportiva | pág. 60, precedente |
| 3 | Costi specifici tecnici | pág. 60, precedente |
| 4 | Costi vitto, alloggio, locomozione gare | pág. 60, precedente |
| 5 | Servizio biglietteria, controllo ingressi | pág. 60, precedente |
| 6 | Assicurative e previdenziali | pág. 60, precedente |
| 7 | Amministrative, pubblicitarie e generali | pág. 60, precedente |
| 8 | 8) per godimento di beni di terzi | pág. 27, precedente |
| 9 | a) salari e stipendi | pág. 27, precedente |
| 10 | b) oneri sociali | pág. 27, precedente |
| 11 | c) trattamento di fine rapporto | pág. 27, precedente |
| 12 | Diritti pluriennali alle prestazioni dei calciatori | pág. 62, precedente |
| 13 | Costi impianto ed ampliamento | pág. 62, precedente |
| 14 | Concessioni, licenze e marchi e diritti simili | pág. 62, precedente |
| 15 | Costi del vivaio giovanile | pág. 62, precedente |
| 16 | Costi pluriennali su beni di terzi | pág. 62, precedente |
| 17 | terreni e fabbricati “costruzioni leggere” | pág. 62, precedente |
| 18 | impianti e macchinari | pág. 62, precedente |
| 19 | attrezzature industriali e commerciali | pág. 62, precedente |
| 20 | altri beni | pág. 62, precedente |
| 21 | c) altre svalutazioni delle immobilizzazioni | pág. 27, precedente |
| 22 | d) svalutazioni dei crediti compresi nell'attivo circolante e delle disponibilita' liquide | pág. 27, precedente |
| 23 | 12) accantonamenti per rischi | pág. 27, precedente |
| 24 | Spese varie organizzazione gare | pág. 63, precedente |
| 25 | Tasse iscrizioni gare | pág. 63, precedente |
| 26 | Oneri specifici verso squadre ospitate: | pág. 63, precedente |
| 27 | b) costi per acquisizione temporanea prestazioni calciatori | pág. 27, precedente |
| 28 | c) minusvalenze da cessione diritti pluriennali prestazioni calciatori | pág. 27, Jev 0.99 |
| 29 | d) altri oneri da trasferimento calciatori | pág. 28, Jev 0.92 |
| 30 | e) altri oneri diversi di gestione | pág. 28, Jev 1 |

### Meta

```text
tools/cargar.mjs (2026-10-08). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

```text
tools/caja-deuda.mjs (2026-10-17): grossDebt escalón 0 (compuerta: ajuste manual): ajuste manual (2026-10-17): Claude 2026-10-17 (leído en el balance por subagente Sonnet, criterio de deuda financiera con socios): debiti verso soci per finanziamenti 8.235.000 + debiti verso banche 31.591.029. Sin obbligazioni ni otros financiadores. (El individual 2023 mostraria banche 26.377.066; aca se usa el consolidado.); cash escalón 0 (compuerta: ajuste manual): ajuste manual (2026-10-17): Claude 2026-10-17 (leído en el balance por subagente Sonnet, criterio de deuda financiera con socios): Totale disponibilita' liquide 14.457.636 (depositi 14.457.056 + cassa 580). Balance consolidado 30/06/2023.
```

### Liga

```text
2023: tools/cargar.mjs 2026-10-08, verificado contra roster cacheado de "2022–23 Serie A" (tools/club-league-reference/it.json), coincidencia e
```

## 2022

### Ingresos

```text
2022: cargado por tools/cargar.mjs (2026-10-07) desde Clubes/Italia/Bologna/Bologna-bilancio-consolidato-2021-22.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Italia/Bologna/Bologna-bilancio-consolidato-2021-22.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | 1) ricavi delle vendite e delle prestazioni | pág. 5, precedente |
| 2 | Contributi in conto esercizio | pág. 63, precedente |
| 3 | Proventi da sponsorizzazioni | pág. 63, precedente |
| 4 | Proventi commerciali e royalties | pág. 63, precedente |
| 5 | Proventi pubblicitari | pág. 63, precedente |
| 6 | Proventi da cessione diritti televisivi | pág. 63, precedente |
| 7 | Proventi vari | pág. 63, precedente |
| 8 | Ricavi da cessione temporanea calciatori | pág. 63, precedente |
| 9 | Plusvalenze da cessione diritti calciatori | pág. 63, precedente |
| 10 | Altri proventi da gestione calciatori | pág. 63, precedente |
| 11 | Altri ricavi e proventi | pág. 64, precedente |

### Gastos

```text
tools/cargar.mjs (2026-10-07)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | 6) per materie prime, sussidiarie, di consumo e di merci | pág. 5, Jev 1 |
| 2 | Costi per attività sportiva | pág. 65, precedente |
| 3 | Costi specifici tecnici | pág. 65, Jev 0.91 |
| 4 | Costi vitto, alloggio, locomozione gare | pág. 65, Jev 1 |
| 5 | Servizio biglietteria, controllo ingressi | pág. 65, Jev 1 |
| 6 | Assicurative e previdenziali | pág. 65, Jev 0.95 |
| 7 | Amministrative, pubblicitarie e generali | pág. 65, Jev 1 |
| 8 | 8) per godimento di beni di terzi | pág. 5, Jev 0.96 |
| 9 | a) salari e stipendi | pág. 5, Jev 1 |
| 10 | b) oneri sociali | pág. 5, Jev 0.92 |
| 11 | c) trattamento di fine rapporto | pág. 5, precedente |
| 12 | Diritti pluriennali alle prestazioni dei calciatori | pág. 68, Jev 0.97 |
| 13 | Costi impianto ed ampliamento | pág. 68, Jev 0.92 |
| 14 | Concessioni, licenze e marchi e diritti simili | pág. 68, Jev 1 |
| 15 | Costi del vivaio giovanile | pág. 68, Claude 0.8 |
| 16 | Costi pluriennali su beni di terzi | pág. 68, precedente |
| 17 | terreni e fabbricati “costruzioni leggere” | pág. 68, precedente |
| 18 | impianti e macchinari | pág. 68, precedente |
| 19 | attrezzature industriali e commerciali | pág. 68, precedente |
| 20 | altri beni | pág. 68, precedente |
| 21 | c) altre svalutazioni delle immobilizzazioni | pág. 5, Jev 0.96 |
| 22 | d) svalutazioni dei crediti compresi nell'attivo circolante e delle disponibilità liquide | pág. 5, Jev 1 |
| 23 | Spese varie organizzazione gare | pág. 69, Jev 0.99 |
| 24 | Tasse iscrizioni gare | pág. 69, Jev 0.99 |
| 25 | Oneri specifici verso squadre ospitate: | pág. 69, Jev 1 |
| 26 | Costi per acquisizione temporanea prestazioni calciatori | pág. 69, Jev 0.99 |
| 27 | Minusvalenze da cessione diritti pluriennali alle prestazioni dei calciatori | pág. 69, Jev 1 |
| 28 | - Contributi solidarietà | pág. 69, precedente |
| 29 | - Premio di rendimento | pág. 69, Jev 0.99 |
| 30 | - Premi di preparazione ex. art. 96 N.O.I.F. | pág. 69, precedente |
| 31 | - Costi di convocazione in Nazionale | pág. 69, precedente |
| 32 | - Sopravvenienze attive altri oneri di gestione calciatori | pág. 69, precedente |
| 33 | - Spese, ammende e multe gare | pág. 69, Jev 1 |
| 34 | - Oneri tributari indiretti | pág. 69, Jev 1 |
| 35 | - Altri | pág. 69, Jev 0.99 |

### Meta

```text
2022: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-07): fila = (1.384.360). Formato Codice Civile: el 17) "interessi ed altri oneri finanziari" se imprime en positivo y se resta por posición (C = 15+16-17); el script lo sumaba. Se reemplaza solo la fila de esa línea: "altri" también rotula el 5) de ingresos y el 16) (to-do 157/158).
2022: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-07): fila = 1.962.486. Nota "Altri ricavi e proventi" (L2684): abre el grupo 5) entero (contributi L206 + altri L207 = 75.870.757), no cada renglón, y cerrarNota no la usa (to-do 163); sin esto TV, sponsors y plusvalías quedaban en otros ingresos. Generado por script desde la tabla de la nota (suma 75.870.756).
2022: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-07): fila = 4.051.018. Nota "Altri ricavi e proventi" (L2684): abre el grupo 5) entero (contributi L206 + altri L207 = 75.870.757), no cada renglón, y cerrarNota no la usa (to-do 163); sin esto TV, sponsors y plusvalías quedaban en otros ingresos. Generado por script desde la tabla de la nota (suma 75.870.756).
2022: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-07): fila = 6.936.721. Nota "Altri ricavi e proventi" (L2684): abre el grupo 5) entero (contributi L206 + altri L207 = 75.870.757), no cada renglón, y cerrarNota no la usa (to-do 163); sin esto TV, sponsors y plusvalías quedaban en otros ingresos. Generado por script desde la tabla de la nota (suma 75.870.756).
2022: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-07): fila = 1.921.631. Nota "Altri ricavi e proventi" (L2684): abre el grupo 5) entero (contributi L206 + altri L207 = 75.870.757), no cada renglón, y cerrarNota no la usa (to-do 163); sin esto TV, sponsors y plusvalías quedaban en otros ingresos. Generado por script desde la tabla de la nota (suma 75.870.756).
2022: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-07): fila = 41.848.063. Nota "Altri ricavi e proventi" (L2684): abre el grupo 5) entero (contributi L206 + altri L207 = 75.870.757), no cada renglón, y cerrarNota no la usa (to-do 163); sin esto TV, sponsors y plusvalías quedaban en otros ingresos. Generado por script desde la tabla de la nota (suma 75.870.756).
2022: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-07): fila = 45.000. Nota "Altri ricavi e proventi" (L2684): abre el grupo 5) entero (contributi L206 + altri L207 = 75.870.757), no cada renglón, y cerrarNota no la usa (to-do 163); sin esto TV, sponsors y plusvalías quedaban en otros ingresos. Generado por script desde la tabla de la nota (suma 75.870.756).
2022: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-07): fila = 469.115. Nota "Altri ricavi e proventi" (L2684): abre el grupo 5) entero (contributi L206 + altri L207 = 75.870.757), no cada renglón, y cerrarNota no la usa (to-do 163); sin esto TV, sponsors y plusvalías quedaban en otros ingresos. Generado por script desde la tabla de la nota (suma 75.870.756).
2022: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-07): fila = 15.237.416. Nota "Altri ricavi e proventi" (L2684): abre el grupo 5) entero (contributi L206 + altri L207 = 75.870.757), no cada renglón, y cerrarNota no la usa (to-do 163); sin esto TV, sponsors y plusvalías quedaban en otros ingresos. Generado por script desde la tabla de la nota (suma 75.870.756).
2022: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-07): fila = 2.568.116. Nota "Altri ricavi e proventi" (L2684): abre el grupo 5) entero (contributi L206 + altri L207 = 75.870.757), no cada renglón, y cerrarNota no la usa (to-do 163); sin esto TV, sponsors y plusvalías quedaban en otros ingresos. Generado por script desde la tabla de la nota (suma 75.870.756).
2022: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-07): fila = 831.190. Nota "Altri ricavi e proventi" (L2684): abre el grupo 5) entero (contributi L206 + altri L207 = 75.870.757), no cada renglón, y cerrarNota no la usa (to-do 163); sin esto TV, sponsors y plusvalías quedaban en otros ingresos. Generado por script desde la tabla de la nota (suma 75.870.756).
tools/cargar.mjs (2026-10-07). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

```text
tools/caja-deuda.mjs (2026-10-16): cash escalón 1b (compuerta: documento siguiente): "Totale disponibilità liquide" pág. 3
```

```text
tools/caja-deuda.mjs (2026-10-17): grossDebt escalón 0 (compuerta: ajuste manual): ajuste manual (2026-10-17): Claude 2026-10-17 (leído en el balance por subagente Sonnet, criterio de deuda financiera con socios): debiti verso soci per finanziamenti 7.135.000 + debiti verso banche 26.642.668. Sin obbligazioni ni otros financiadores; caja cargada 14.322.901 coincide con el balance.
```

### Liga

```text
2022: tools/cargar.mjs 2026-10-07, verificado contra roster cacheado de "2021–22 Serie A" (tools/club-league-reference/it.json), coincidencia e
```

## 2021

### Ingresos

```text
2021: cargado por tools/cargar.mjs (2026-10-07) desde Clubes/Italia/Bologna/Bologna-bilancio-consolidato-2020-21.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Italia/Bologna/Bologna-bilancio-consolidato-2020-21.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | 1) ricavi delle vendite e delle prestazioni | pág. 26, precedente |
| 2 | Contributi in conto esercizio | pág. 57, precedente |
| 3 | Proventi da sponsorizzazioni | pág. 57, precedente |
| 4 | Proventi commerciali e royalties | pág. 57, precedente |
| 5 | Proventi pubblicitari | pág. 57, precedente |
| 6 | Proventi da cessione diritti televisivi | pág. 57, precedente |
| 7 | Proventi vari | pág. 57, precedente |
| 8 | Ricavi da cessione temporanea calciatori | pág. 57, precedente |
| 9 | Plusvalenze da cessione diritti calciatori | pág. 57, precedente |
| 10 | Altri proventi da gestione calciatori | pág. 57, precedente |
| 11 | Altri ricavi e proventi | pág. 57, precedente |

### Gastos

```text
tools/cargar.mjs (2026-10-07)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | 6) per materie prime, sussidiarie, di consumo e di merci | pág. 26, Jev 1 |
| 2 | Costi per attività sportiva | pág. 59, precedente |
| 3 | Costi specifici tecnici | pág. 59, Jev 0.91 |
| 4 | Costi vitto, alloggio, locomozione gare | pág. 59, Jev 1 |
| 5 | Servizio biglietteria, controllo ingressi | pág. 59, Jev 1 |
| 6 | Assicurative e previdenziali | pág. 59, Jev 0.95 |
| 7 | Amministrative, pubblicitarie e generali | pág. 59, Jev 1 |
| 8 | 8) per godimento di beni di terzi | pág. 26, Jev 0.96 |
| 9 | a) salari e stipendi | pág. 26, Jev 1 |
| 10 | b) oneri sociali | pág. 26, Jev 0.92 |
| 11 | c) trattamento di fine rapporto | pág. 26, precedente |
| 12 | Diritti pluriennali alle prestazioni dei calciatori | pág. 61, Jev 0.97 |
| 13 | Costi impianto ed ampliamento | pág. 61, Jev 0.92 |
| 14 | Concessioni, licenze e marchi e diritti simili | pág. 61, Jev 1 |
| 15 | Costi del vivaio giovanile | pág. 61, Claude 0.8 |
| 16 | Costi pluriennali su beni di terzi | pág. 61, precedente |
| 17 | terreni e fabbricati “costruzioni leggere” | pág. 61, precedente |
| 18 | impianti e macchinari | pág. 61, precedente |
| 19 | attrezzature industriali e commerciali | pág. 61, precedente |
| 20 | altri beni | pág. 61, precedente |
| 21 | c) altre svalutazioni delle immobilizzazioni | pág. 27, Jev 0.96 |
| 22 | d) svalutazioni dei crediti compresi nell'attivo circolante e delle disponibilita' liquide | pág. 27, Jev 1 |
| 23 | 12) accantonamenti per rischi | pág. 27, Jev 0.98 |
| 24 | Spese varie organizzazione gare | pág. 62, Jev 0.99 |
| 25 | Tasse iscrizioni gare | pág. 62, Jev 0.99 |
| 26 | Costi per acquisizione temporanea prestazioni calciatori | pág. 62, Jev 0.99 |
| 27 | Minusvalenze da cessione diritti pluriennali alle prestazioni dei calciatori | pág. 62, Jev 1 |
| 28 | - Contributi solidarietà | pág. 63, precedente |
| 29 | - Premi alla carriera | pág. 63, precedente |
| 30 | - Premio di rendimento | pág. 63, Jev 0.99 |
| 31 | - Premi di preparazione ex. art. 96 N.O.I.F. | pág. 63, precedente |
| 32 | - Accantonamento rischi altri oneri gestione calciatori | pág. 63, Jev 1 |
| 33 | - Sopravvenienze attive altri oneri gestione calciatori | pág. 63, precedente |
| 34 | - Spese, ammende e multe gare | pág. 63, Jev 1 |
| 35 | - Oneri tributari indiretti | pág. 63, Jev 1 |
| 36 | - Altri | pág. 63, Jev 0.99 |

### Meta

```text
2021: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-07): fila = (1.297.992). Formato Codice Civile: el 17) "interessi ed altri oneri finanziari" se imprime en positivo y se resta por posición (C = 15+16-17); el script lo sumaba. Se reemplaza solo la fila de esa línea: "altri" también rotula el 5) de ingresos y el 16) (to-do 157/158).
2021: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-07): fila = 1.724.809. Nota "Altri ricavi e proventi" (L2205): abre el grupo 5) entero (contributi L832 + altri L833 = 81.652.028), no cada renglón, y cerrarNota no la usa (to-do 163); sin esto TV, sponsors y plusvalías quedaban en otros ingresos. Generado por script desde la tabla de la nota (suma 81.652.026).
2021: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-07): fila = 4.426.134. Nota "Altri ricavi e proventi" (L2205): abre el grupo 5) entero (contributi L832 + altri L833 = 81.652.028), no cada renglón, y cerrarNota no la usa (to-do 163); sin esto TV, sponsors y plusvalías quedaban en otros ingresos. Generado por script desde la tabla de la nota (suma 81.652.026).
2021: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-07): fila = 729.673. Nota "Altri ricavi e proventi" (L2205): abre el grupo 5) entero (contributi L832 + altri L833 = 81.652.028), no cada renglón, y cerrarNota no la usa (to-do 163); sin esto TV, sponsors y plusvalías quedaban en otros ingresos. Generado por script desde la tabla de la nota (suma 81.652.026).
2021: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-07): fila = 4.110.633. Nota "Altri ricavi e proventi" (L2205): abre el grupo 5) entero (contributi L832 + altri L833 = 81.652.028), no cada renglón, y cerrarNota no la usa (to-do 163); sin esto TV, sponsors y plusvalías quedaban en otros ingresos. Generado por script desde la tabla de la nota (suma 81.652.026).
2021: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-07): fila = 62.734.806. Nota "Altri ricavi e proventi" (L2205): abre el grupo 5) entero (contributi L832 + altri L833 = 81.652.028), no cada renglón, y cerrarNota no la usa (to-do 163); sin esto TV, sponsors y plusvalías quedaban en otros ingresos. Generado por script desde la tabla de la nota (suma 81.652.026).
2021: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-07): fila = 55.014. Nota "Altri ricavi e proventi" (L2205): abre el grupo 5) entero (contributi L832 + altri L833 = 81.652.028), no cada renglón, y cerrarNota no la usa (to-do 163); sin esto TV, sponsors y plusvalías quedaban en otros ingresos. Generado por script desde la tabla de la nota (suma 81.652.026).
2021: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-07): fila = 551.940. Nota "Altri ricavi e proventi" (L2205): abre el grupo 5) entero (contributi L832 + altri L833 = 81.652.028), no cada renglón, y cerrarNota no la usa (to-do 163); sin esto TV, sponsors y plusvalías quedaban en otros ingresos. Generado por script desde la tabla de la nota (suma 81.652.026).
2021: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-07): fila = 3.236.345. Nota "Altri ricavi e proventi" (L2205): abre el grupo 5) entero (contributi L832 + altri L833 = 81.652.028), no cada renglón, y cerrarNota no la usa (to-do 163); sin esto TV, sponsors y plusvalías quedaban en otros ingresos. Generado por script desde la tabla de la nota (suma 81.652.026).
2021: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-07): fila = 1.806.671. Nota "Altri ricavi e proventi" (L2205): abre el grupo 5) entero (contributi L832 + altri L833 = 81.652.028), no cada renglón, y cerrarNota no la usa (to-do 163); sin esto TV, sponsors y plusvalías quedaban en otros ingresos. Generado por script desde la tabla de la nota (suma 81.652.026).
2021: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-07): fila = 2.276.001. Nota "Altri ricavi e proventi" (L2205): abre el grupo 5) entero (contributi L832 + altri L833 = 81.652.028), no cada renglón, y cerrarNota no la usa (to-do 163); sin esto TV, sponsors y plusvalías quedaban en otros ingresos. Generado por script desde la tabla de la nota (suma 81.652.026).
tools/cargar.mjs (2026-10-07). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

```text
tools/caja-deuda.mjs (2026-10-17): grossDebt escalón 0 (compuerta: ajuste manual): ajuste manual (2026-10-17): Claude 2026-10-17 (leído en el balance por subagente Sonnet, criterio de deuda financiera con socios): debiti verso soci per finanziamenti 7.135.000 + debiti verso banche 20.705.347. Sin obbligazioni ni otros financiadores.; cash escalón 0 (compuerta: ajuste manual): ajuste manual (2026-10-17): Claude 2026-10-17 (leído en el balance por subagente Sonnet, criterio de deuda financiera con socios): Totale disponibilita' liquide 12.056.249 (depositi 12.054.944 + cassa 1.305). Balance consolidado 30/06/2021.
```

### Liga

```text
2021: tools/cargar.mjs 2026-10-07, verificado contra roster cacheado de "2020–21 Serie A" (tools/club-league-reference/it.json), coincidencia e
```

## 2020

### Ingresos

```text
2020: cargado por tools/cargar.mjs (2026-10-07) desde Clubes/Italia/Bologna/Bologna-bilancio-consolidato-2019-20.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Italia/Bologna/Bologna-bilancio-consolidato-2019-20.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | 1) ricavi delle vendite e delle prestazioni | pág. 25, precedente |
| 2 | 4) incrementi di immobilizzazioni per lavori interni | pág. 25, Jev 1 |
| 3 | Contributi in conto esercizio | pág. 56, precedente |
| 4 | Proventi da sponsorizzazioni | pág. 56, precedente |
| 5 | Proventi commerciali e royalties | pág. 56, precedente |
| 6 | Proventi pubblicitari | pág. 56, precedente |
| 7 | Proventi da cessione diritti televisivi | pág. 56, precedente |
| 8 | Proventi vari | pág. 56, precedente |
| 9 | Ricavi da cessione temporanea calciatori | pág. 56, precedente |
| 10 | Plusvalenze da cessione diritti calciatori | pág. 56, precedente |
| 11 | Altri proventi da gestione calciatori | pág. 56, precedente |
| 12 | Altri ricavi e proventi | pág. 56, precedente |

### Gastos

```text
tools/cargar.mjs (2026-10-07)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | 6) per materie prime, sussidiarie, di consumo e di merci | pág. 25, Jev 1 |
| 2 | Costi per attività sportiva | pág. 58, precedente |
| 3 | Costi specifici tecnici | pág. 58, Jev 0.91 |
| 4 | Costi vitto, alloggio, locomozione gare | pág. 58, Jev 1 |
| 5 | Servizio biglietteria, controllo ingressi | pág. 58, Jev 1 |
| 6 | Assicurative e previdenziali | pág. 58, Jev 0.95 |
| 7 | Amministrative, pubblicitarie e generali | pág. 58, Jev 1 |
| 8 | 8) per godimento di beni di terzi | pág. 25, Jev 0.96 |
| 9 | a) salari e stipendi | pág. 25, Jev 1 |
| 10 | b) oneri sociali | pág. 26, Jev 0.92 |
| 11 | c) trattamento di fine rapporto | pág. 26, precedente |
| 12 | Diritti pluriennali alle prestazioni dei calciatori | pág. 60, Jev 0.97 |
| 13 | Costi impianto ed ampliamento | pág. 60, Jev 0.92 |
| 14 | Concessioni, licenze e marchi e diritti simili | pág. 60, Jev 1 |
| 15 | Costi del vivaio giovanile | pág. 60, Claude 0.8 |
| 16 | Costi pluriennali su beni di terzi | pág. 60, precedente |
| 17 | terreni e fabbricati "costruzioni leggere" | pág. 61, precedente |
| 18 | impianti e macchinari | pág. 61, precedente |
| 19 | attrezzature industriali e commerciali | pág. 61, precedente |
| 20 | altri beni | pág. 61, precedente |
| 21 | c) altre svalutazioni delle immobilizzazioni | pág. 26, Jev 0.96 |
| 22 | d) svalutazioni dei crediti compresi nell'attivo circolante e delle disponibilita' liquide | pág. 26, Jev 1 |
| 23 | 12) accantonamenti per rischi | pág. 26, Jev 0.98 |
| 24 | Spese varie organizzazione gare | pág. 61, Jev 0.99 |
| 25 | Tasse iscrizioni gare | pág. 61, Jev 0.99 |
| 26 | Costi per acquisizione temporanea prestazioni calciatori | pág. 61, Jev 0.99 |
| 27 | Minusvalenze da cessione diritti pluriennali alle prestazioni dei calciatori | pág. 61, Jev 1 |
| 28 | Altri oneri da gestione calciatori: | pág. 61, Jev 0.99 |
| 29 | - Spese, ammende e multe gare | pág. 62, Jev 1 |
| 30 | - Oneri tributari indiretti | pág. 62, Jev 1 |
| 31 | - Altri | pág. 62, Jev 0.99 |

### Meta

```text
2020: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-07): fila = (670.894). Formato Codice Civile: el 17) "interessi ed altri oneri finanziari" se imprime en positivo y se resta por posición (C = 15+16-17); el script lo sumaba. Se reemplaza solo la fila de esa línea: "altri" también rotula el 5) de ingresos y el 16) (to-do 157/158).
2020: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-07): fila = (1.868.716). Rettifiche D sin lado en la extracción: 19) a) svalutazioni di partecipazioni 1.868.716, impreso en positivo y restado (Totale D (1.868.716), L960). Va del lado financiero, como las rettifiche D de Milan 2023-24 e Inter 2021-22 (to-do 157).
2020: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-07): fila = 882.444. Nota "Altri ricavi e proventi" (L2307): abre el grupo 5) entero (contributi L907 + altri L908 = 67.881.535), no cada renglón, y cerrarNota no la usa (to-do 163); sin esto TV, sponsors y plusvalías quedaban en otros ingresos. Generado por script desde la tabla de la nota (suma 67.881.535).
2020: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-07): fila = 4.093.425. Nota "Altri ricavi e proventi" (L2307): abre el grupo 5) entero (contributi L907 + altri L908 = 67.881.535), no cada renglón, y cerrarNota no la usa (to-do 163); sin esto TV, sponsors y plusvalías quedaban en otros ingresos. Generado por script desde la tabla de la nota (suma 67.881.535).
2020: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-07): fila = 889.771. Nota "Altri ricavi e proventi" (L2307): abre el grupo 5) entero (contributi L907 + altri L908 = 67.881.535), no cada renglón, y cerrarNota no la usa (to-do 163); sin esto TV, sponsors y plusvalías quedaban en otros ingresos. Generado por script desde la tabla de la nota (suma 67.881.535).
2020: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-07): fila = 6.495.607. Nota "Altri ricavi e proventi" (L2307): abre el grupo 5) entero (contributi L907 + altri L908 = 67.881.535), no cada renglón, y cerrarNota no la usa (to-do 163); sin esto TV, sponsors y plusvalías quedaban en otros ingresos. Generado por script desde la tabla de la nota (suma 67.881.535).
2020: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-07): fila = 33.871.885. Nota "Altri ricavi e proventi" (L2307): abre el grupo 5) entero (contributi L907 + altri L908 = 67.881.535), no cada renglón, y cerrarNota no la usa (to-do 163); sin esto TV, sponsors y plusvalías quedaban en otros ingresos. Generado por script desde la tabla de la nota (suma 67.881.535).
2020: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-07): fila = 59.484. Nota "Altri ricavi e proventi" (L2307): abre el grupo 5) entero (contributi L907 + altri L908 = 67.881.535), no cada renglón, y cerrarNota no la usa (to-do 163); sin esto TV, sponsors y plusvalías quedaban en otros ingresos. Generado por script desde la tabla de la nota (suma 67.881.535).
2020: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-07): fila = 1.291.423. Nota "Altri ricavi e proventi" (L2307): abre el grupo 5) entero (contributi L907 + altri L908 = 67.881.535), no cada renglón, y cerrarNota no la usa (to-do 163); sin esto TV, sponsors y plusvalías quedaban en otros ingresos. Generado por script desde la tabla de la nota (suma 67.881.535).
2020: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-07): fila = 17.164.895. Nota "Altri ricavi e proventi" (L2307): abre el grupo 5) entero (contributi L907 + altri L908 = 67.881.535), no cada renglón, y cerrarNota no la usa (to-do 163); sin esto TV, sponsors y plusvalías quedaban en otros ingresos. Generado por script desde la tabla de la nota (suma 67.881.535).
2020: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-07): fila = 1.526.886. Nota "Altri ricavi e proventi" (L2307): abre el grupo 5) entero (contributi L907 + altri L908 = 67.881.535), no cada renglón, y cerrarNota no la usa (to-do 163); sin esto TV, sponsors y plusvalías quedaban en otros ingresos. Generado por script desde la tabla de la nota (suma 67.881.535).
2020: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-07): fila = 1.605.715. Nota "Altri ricavi e proventi" (L2307): abre el grupo 5) entero (contributi L907 + altri L908 = 67.881.535), no cada renglón, y cerrarNota no la usa (to-do 163); sin esto TV, sponsors y plusvalías quedaban en otros ingresos. Generado por script desde la tabla de la nota (suma 67.881.535).
tools/cargar.mjs (2026-10-07). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

```text
tools/caja-deuda.mjs (2026-10-17): grossDebt escalón 0 (compuerta: ajuste manual): ajuste manual (2026-10-17): Claude 2026-10-17 (leído en el balance por subagente Sonnet, criterio de deuda financiera con socios): debiti verso soci per finanziamenti 2.135.000 + debiti verso banche 15.513.509. Sin obbligazioni ni otros financiadores; el 15.513.509 coincide con el comparativo del bilancio 2020-21.; cash escalón 0 (compuerta: ajuste manual): ajuste manual (2026-10-17): Claude 2026-10-17 (leído en el balance por subagente Sonnet, criterio de deuda financiera con socios): Totale disponibilita' liquide 2.790.809 (depositi 2.790.672 + cassa 137). Balance consolidado 30/06/2020.
```

### Liga

```text
2020: tools/cargar.mjs 2026-10-07, verificado contra roster cacheado de "2019–20 Serie A" (tools/club-league-reference/it.json), coincidencia e
```

## 2019

### Ingresos

```text
2019: cargado por tools/cargar.mjs (2026-10-07) desde Clubes/Italia/Bologna/Bologna-bilancio-consolidato-2018-19.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Italia/Bologna/Bologna-bilancio-consolidato-2018-19.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | 1) ricavi delle vendite e delle prestazioni | pág. 24, precedente |
| 2 | 4) incrementi di immobilizzazioni per lavori interni | pág. 24, Jev 0.99 |
| 3 | Contributi in conto esercizio | pág. 53, precedente |
| 4 | Proventi da sponsorizzazioni | pág. 53, precedente |
| 5 | Proventi commerciali e royalties | pág. 53, precedente |
| 6 | Proventi pubblicitari | pág. 53, precedente |
| 7 | Proventi da cessione diritti televisivi | pág. 53, precedente |
| 8 | Proventi vari | pág. 53, precedente |
| 9 | Ricavi da cessione temporanea calciatori | pág. 53, precedente |
| 10 | Plusvalenze da cessione diritti calciatori | pág. 53, precedente |
| 11 | Altri proventi da gestione calciatori | pág. 53, precedente |
| 12 | Altri ricavi e proventi | pág. 53, precedente |

### Gastos

```text
tools/cargar.mjs (2026-10-07)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | 6) per materie prime, sussidiarie, di consumo e di merci | pág. 24, Jev 0.99 |
| 2 | Costi per attività sportiva | pág. 55, precedente |
| 3 | Costi specifici tecnici | pág. 55, precedente |
| 4 | Costi vitto, alloggio, locomozione gare | pág. 55, Jev 1 |
| 5 | Servizio biglietteria, controllo ingressi | pág. 55, Jev 0.99 |
| 6 | Assicurative e previdenziali | pág. 55, precedente |
| 7 | Amministrative, pubblicitarie e generali | pág. 55, Jev 1 |
| 8 | 8) per godimento di beni di terzi | pág. 24, precedente |
| 9 | a) salari e stipendi | pág. 24, Jev 0.95 |
| 10 | b) oneri sociali | pág. 24, precedente |
| 11 | c) trattamento di fine rapporto | pág. 24, precedente |
| 12 | a) ammortamento delle immobilizzazioni immateriali | pág. 25, precedente |
| 13 | terreni e fabbricati "costruzioni leggere" | pág. 57, Claude 0.9 |
| 14 | impianti e macchinari | pág. 57, Claude 0.9 |
| 15 | attrezzature industriali e commerciali | pág. 57, Claude 0.9 |
| 16 | altri beni | pág. 57, Claude 0.9 |
| 17 | c) altre svalutazioni delle immobilizzazioni | pág. 25, precedente |
| 18 | d) svalutazioni dei crediti compresi nell'attivo circolante e delle disponibilita' liquide | pág. 25, Jev 0.92 |
| 19 | 12) accantonamenti per rischi | pág. 25, precedente |
| 20 | Spese varie organizzazione gare | pág. 58, Jev 0.99 |
| 21 | Tasse iscrizioni gare | pág. 58, Jev 0.98 |
| 22 | - percentuale su incassi gare a squadre ospitate | pág. 58, Claude 0.8 |
| 23 | Costi per acquisizione temporanea prestazioni calciatori | pág. 58, precedente |
| 24 | - Contributi a società affiliate | pág. 58, precedente |
| 25 | - Contributi solidarietà | pág. 58, precedente |
| 26 | - Premio di rendimento | pág. 58, Jev 0.91 |
| 27 | - Premi di preparazione ex.art. 96 N.O.I.F. | pág. 58, precedente |
| 28 | - Sopravvenienze passive altri oneri di gestione | pág. 58, precedente |
| 29 | - Spese, ammende e multe gare | pág. 58, precedente |
| 30 | - Oneri tributari indiretti | pág. 58, Jev 0.99 |
| 31 | - Altri | pág. 58, Jev 0.99 |

### Meta

```text
tools/cargar.mjs (2026-10-07). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

```text
tools/caja-deuda.mjs (2026-10-16): grossDebt escalón 1 (compuerta: documento anterior): "4) debiti verso banche" pág. 23; cash escalón 1 (compuerta: documento anterior): "Disponibilità liquide" pág. 7
```

```text
tools/caja-deuda.mjs (2026-10-17): grossDebt escalón 0 (compuerta: ajuste manual): ajuste manual (2026-10-17): Claude 2026-10-17 (leído en el balance por subagente Sonnet, criterio de deuda financiera con socios): debiti verso soci per finanziamenti 2.135.000 + debiti verso banche 23.446.528. Corrige lo cargado (23.446.528): falta el finanziamento soci (2.135.000). Sin obbligazioni ni otros financiadores.
```

## 2018

### Ingresos

```text
2018: cargado por tools/cargar.mjs (2026-10-08) desde Clubes/Italia/Bologna/Bologna-bilancio-consolidato-2017-18.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Italia/Bologna/Bologna-bilancio-consolidato-2017-18.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | 1) ricavi delle vendite e delle prestazioni | pág. 26, precedente |
| 2 | 4) incrementi di immobilizzazioni per lavori interni | pág. 26, precedente |
| 3 | Contributi in conto esercizio | pág. 56, precedente |
| 4 | Proventi da sponsorizzazioni | pág. 56, precedente |
| 5 | Proventi commerciali e royalties | pág. 56, precedente |
| 6 | Proventi pubblicitari | pág. 56, precedente |
| 7 | Proventi da cessione diritti televisivi | pág. 56, precedente |
| 8 | Proventi vari | pág. 56, precedente |
| 9 | Ricavi da cessione temporanea calciatori | pág. 56, precedente |
| 10 | Plusvalenze da cessione diritti calciatori | pág. 56, precedente |
| 11 | Altri proventi da gestione calciatori | pág. 56, precedente |
| 12 | Altri ricavi e proventi | pág. 56, precedente |

### Gastos

```text
tools/cargar.mjs (2026-10-08)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | 6) per materie prime, sussidiarie, di consumo e di merci | pág. 26, precedente |
| 2 | Costi per attività sportiva | pág. 58, precedente |
| 3 | Costi specifici tecnici | pág. 58, precedente |
| 4 | Costi vitto, alloggio, locomozione gare | pág. 58, precedente |
| 5 | Servizio biglietteria, controllo ingressi | pág. 58, precedente |
| 6 | Assicurative e previdenziali | pág. 58, precedente |
| 7 | Amministrative, pubblicitarie e generali | pág. 58, precedente |
| 8 | 8) per godimento di beni di terzi | pág. 26, precedente |
| 9 | a) salari e stipendi | pág. 26, precedente |
| 10 | b) oneri sociali | pág. 26, precedente |
| 11 | c) trattamento di fine rapporto | pág. 26, precedente |
| 12 | Diritti pluriennali alle prestazioni dei calciatori | pág. 60, precedente |
| 13 | Concessioni, licenze e marchi e diritti simili | pág. 60, precedente |
| 14 | Costi del vivaio giovanile | pág. 60, precedente |
| 15 | Costi pluriennali su beni di terzi | pág. 60, precedente |
| 16 | terreni e fabbricati "costruzioni leggere" | pág. 60, precedente |
| 17 | impianti e macchinari | pág. 60, precedente |
| 18 | attrezzature industriali e commerciali | pág. 60, precedente |
| 19 | altri beni | pág. 60, precedente |
| 20 | c) altre svalutazioni delle immobilizzazioni | pág. 27, precedente |
| 21 | d) svalutazioni dei crediti compresi nell'attivo circolante e delle disponibilita' liquide | pág. 27, precedente |
| 22 | 12) accantonamenti per rischi | pág. 27, precedente |
| 23 | Spese varie organizzazione gare | pág. 61, precedente |
| 24 | Tasse iscrizioni gare | pág. 61, precedente |
| 25 | - percentuale su incassi gare a squadre ospitate | pág. 61, precedente |
| 26 | Costi per acquisizione temporanea prestazioni calciatori | pág. 61, precedente |
| 27 | Minusvalenze da cessione diritti pluriennali alle prestazioni dei calciatori | pág. 61, precedente |
| 28 | - Contributi a società affiliate | pág. 61, precedente |
| 29 | - Premio di rendimento | pág. 61, precedente |
| 30 | - Premi di preparazione ex.art. 96 N.O.I.F. | pág. 61, precedente |
| 31 | - Spese, ammende e multe gare | pág. 61, precedente |
| 32 | - Oneri tributari indiretti | pág. 61, precedente |
| 33 | - Altri | pág. 61, precedente |

### Meta

```text
tools/cargar.mjs (2026-10-08). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

```text
tools/caja-deuda.mjs (2026-10-16): grossDebt escalón 1 (compuerta: documento siguiente): "4) debiti verso banche" pág. 25; cash escalón 1 (compuerta: documento siguiente): "Disponibilità liquide" pág. 9
```

```text
tools/caja-deuda.mjs (2026-10-17): grossDebt escalón 0 (compuerta: ajuste manual): ajuste manual (2026-10-17): Claude 2026-10-17 (leído en el balance por subagente Sonnet, criterio de deuda financiera con socios): debiti verso soci per finanziamenti 2.135.000 + debiti verso banche 16.850.492. Corrige lo cargado (16.850.492): falta el finanziamento soci de BFC 1909 LUX SPV (2.135.000). Sin obbligazioni ni otros financiadores.
```

### Liga

```text
2018: tools/cargar.mjs 2026-10-08, verificado contra roster cacheado de "2017–18 Serie A" (tools/club-league-reference/it.json), coincidencia e
```

## Gestiones

_antes de Joey Saputo (data/gestiones/it.js):_

```text
Saputo: control del club desde el 19/9/2015 (Tacopina fue presidente en 2014-15 con Saputo de chairman).
```

## Fuentes

### (general)

```text
Fuentes de cada ejercicio: las agrega tools/cargar.mjs adentro de este bloque (Versión 379: hasta la 378 el esqueleto no lo traía y la
primera carga de un club dado de alta por script se revertía, "no encontré Object.assign(sources, {"; caso: Fortaleza CEIF).
```

### bologna-it-bilancio-consolidato-2019-20

_note (data/):_

```text
Cargado por tools/cargar.mjs (2026-10-07) desde la transcripción Clubes/Italia/Bologna/Bologna-bilancio-consolidato-2019-20.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.
```

### bologna-it-bilancio-consolidato-2020-21

_note (data/):_

```text
Cargado por tools/cargar.mjs (2026-10-07) desde la transcripción Clubes/Italia/Bologna/Bologna-bilancio-consolidato-2020-21.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.
```

### bologna-it-bilancio-consolidato-2021-22

_note (data/):_

```text
Cargado por tools/cargar.mjs (2026-10-07) desde la transcripción Clubes/Italia/Bologna/Bologna-bilancio-consolidato-2021-22.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.
```

### bologna-it-bilancio-consolidato-2018-19

_note (data/):_

```text
Cargado por tools/cargar.mjs (2026-10-07) desde la transcripción Clubes/Italia/Bologna/Bologna-bilancio-consolidato-2018-19.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.
```

### bologna-it-bilancio-consolidato-2017-18

_note (data/):_

```text
Cargado por tools/cargar.mjs (2026-10-08) desde la transcripción Clubes/Italia/Bologna/Bologna-bilancio-consolidato-2017-18.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.
```

### bologna-it-bilancio-consolidato-2022-23

_note (data/):_

```text
Cargado por tools/cargar.mjs (2026-10-08) desde la transcripción Clubes/Italia/Bologna/Bologna-bilancio-consolidato-2022-23.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.
```

### bologna-it-bilancio-individuale-2023-24

_note (data/):_

```text
Cargado por tools/cargar.mjs (2026-10-08) desde la transcripción Clubes/Italia/Bologna/Bologna-bilancio-individuale-2023-24.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual (corregido el 2026-10-13, to-do 226: el documento trae solo el estado de la sociedad; antes decía consolidado, heredado del ajuste del club).
```

### bologna-it-bilancio-individuale-2024-25

_note (data/):_

```text
Cargado por tools/cargar.mjs (2026-10-08) desde la transcripción Clubes/Italia/Bologna/Bologna-bilancio-individuale-2024-25.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual (corregido el 2026-10-13, to-do 226: el documento trae solo el estado de la sociedad; antes decía consolidado, heredado del ajuste del club).
```
