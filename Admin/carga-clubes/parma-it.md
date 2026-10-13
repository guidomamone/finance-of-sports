# parma-it — evidencia de carga

Lo que había como comentario en `data/parma-it-data.js`, movido tal cual por `tools/mover-comentarios-data.mjs` (la regla:
`Admin/CONVENCIONES-DATOS.md`, "data/<club>-data.js NO LLEVA COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y
meta. Las notas de cada fila van en una tabla con su número de fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
============================================================================
data/parma-it-data.js — Parma Calcio 1913 S.r.l. (Italia).
ALTA POR SCRIPT (tools/alta-club.mjs, 2026-10-07), SIN EJERCICIOS CARGADOS TODAVÍA:
las estructuras de abajo están vacías a propósito. Los rubros, los totales
oficiales y el resto del fiscalYearMeta los agrega la etapa de carga
(tools/proponer-carga.mjs / sesión de onboarding), que es también la que
reemplaza esta cabecera por la de siempre (fuente, perímetro, categorización).

Documento que originó el alta: Clubes/Italia/Parma/Parma-bilancio-31.12.2023-individual.pdf

De dónde salió cada campo (estado según alta-club.mjs: ok / pendiente):
  id                 ok        "parma-it" — slug de "Parma" + '-it' (convención de clubId, Admin/CONVENCIONES.md Versión 129)
  name               ok        "Parma Calcio 1913 S.r.l." — el .md, 33 veces (nombre del club + forma societaria)
  displayName        ok        "Parma" — nombre de la carpeta del club en Clubes/
  country            ok        "IT" — carpeta de país "Italia" (tabla PAISES)
  reportingCurrency  ok        "EUR" — moneda de curso legal de Italia
  fiscalYearStart    ok        "01-01" — el documento más reciente del club (Parma-bilancio-31.12.2025-consolidato.md, cierre mes 12): el cierre CAMBIÓ en el tiempo (mes 6: 2018 / mes 12: 202
  sport              ok        "futbol" — el .md nombra el fútbol 123 veces y ningún otro deporte más que eso
  brandColor         pendiente (ausente) — tools/brand-color-reference/ (footylogos): [italia] parma: #FFCF01 Yellow, #24338A Dark Blue, #1C1E1C Black, #FFFFFF White
  anio               ok        2023 — nombre del archivo (misma regla que onboard.mjs --quien), confirmado por las fechas de cierre del .md
  cierre             ok        "2023-12-31" — año del ejercicio + mes de cierre (nombre del archivo (2023-12-31) y contenido del .md (149 de 158 fechas de fin de mes))
  reportType         ok        "official_balance_sheet" — el .md tiene un estado contable (resultados / balance) y el nombre del archivo no sugiere otro tipo
  perimetro          ok        "individual" — ajuste manual (Admin/ajustes-manuales.jsonl, Guido 2026-10-06): Guido 2026-10-06: individual (Parma Calcio 1913 S.r.l.); en 2023 y 2024 el consolidado
  currency           ok        "EUR" — moneda de curso legal de Italia (tabla PAISES de alta-club.mjs)
  fxRef              ok        "EUR@2023-12-31" — el documento no declara tipo de cambio; FX_CLOSE ya tiene EUR@2023-12-31 = 0.905 (Cierre BCE del viernes 29/12/2023 (el 31 es domingo, sin cotización)
  sourceId           ok        "parma-it-bilancio-31-12-2023-individual" — clubId + nombre del archivo en slug
  liga               ok        "it-serieb" — roster cacheado de "2023–24 Serie B" (tools/club-league-reference/it.json), coincidencia exacta "Parma"

FISCAL YEAR META PROPUESTO para 2023 (NO registrado: un ejercicio con meta y
sin rubros se vería en el sitio como un año en cero, y "sin dato no es cero"):
  2023: {"reportType":"official_balance_sheet","currency":"EUR","fxRef":"EUR@2023-12-31","sourceId":"parma-it-bilancio-31-12-2023-individual"}
============================================================================
```

_de data/clubs.js:_

```text
Parma: alta por tools/alta-club.mjs (2026-10-07) desde Clubes/Italia/Parma/Parma-bilancio-31.12.2023-individual.pdf.
brandColor y su procedencia: fuentes/Italia/Parma.md.
```

_de data/club-leagues/it.js:_

```text
Parma (alta-club.mjs, 2026-10-07): verificado contra roster cacheado de "2023–24 Serie B" (tools/club-league-reference/it.json), coincidencia exacta "Parma".
```

## 2025

### Ingresos

```text
2025: cargado por tools/cargar.mjs (2026-10-08) desde Clubes/Italia/Parma/Parma-bilancio-31.12.2025-consolidato.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Italia/Parma/Parma-bilancio-31.12.2025-consolidato.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | - Gare Campionato | pág. 36, Jev 0.99 |
| 2 | Abbonamenti | pág. 36, precedente |
| 3 | Ricavi e proventi diversi | pág. 36, precedente |
| 4 | Proventi da sponsorizzazioni | pág. 36, precedente |
| 5 | Proventi pubblicitari | pág. 36, precedente |
| 6 | Proventi commerciali e royalties | pág. 36, precedente |
| 7 | Proventi da cessione diritti audiovisivi | pág. 36, precedente |
| 8 | Proventi da cessione diritti prestazioni calciatori | pág. 36, precedente |
| 9 | Altri Proventi gestione calciatori | pág. 36, precedente |
| 10 | Contributi in conto esercizio | pág. 36, precedente |
| 11 | Ricavi e proventi diversi | pág. 36, precedente |

### Gastos

```text
tools/cargar.mjs (2026-10-08)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | 6) per materie prime, sussidiarie, di consumo e di merci | pág. 16, precedente |
| 2 | Costi per attività sportiva | pág. 38, precedente |
| 3 | Costi specifici Tecnici | pág. 38, precedente |
| 4 | Costi per intermediazioni | pág. 38, precedente |
| 5 | Costi per prestazioni servizi personale | pág. 38, precedente |
| 6 | Costi vitto, alloggio e locomozione gare | pág. 38, precedente |
| 7 | Compensi e rimborsi spesa a terzi | pág. 38, precedente |
| 8 | Costi per servizio biglietteria, controllo ingressi | pág. 38, precedente |
| 9 | Costi per pubblicità e propaganda | pág. 38, precedente |
| 10 | Costi Assicurativi | pág. 38, precedente |
| 11 | Costi per utenze e spese generali | pág. 38, precedente |
| 12 | Costi per manutenzioni e riparazioni | pág. 38, precedente |
| 13 | Legali e Amministrativi | pág. 38, precedente |
| 14 | Altri | pág. 38, precedente |
| 15 | 8) per godimento di beni di terzi | pág. 16, precedente |
| 16 | a) salari e stipendi | pág. 16, precedente |
| 17 | b) oneri sociali | pág. 16, precedente |
| 18 | c) trattamento di fine rapporto | pág. 16, precedente |
| 19 | d) trattamento di quiescenza e simili | pág. 16, Jev 0.99 |
| 20 | a) ammortamento delle immobilizzazioni immateriali | pág. 16, precedente |
| 21 | b) ammortamento delle immobilizzazioni materiali | pág. 16, precedente |
| 22 | c) altre svalutazioni delle immobilizzazioni | pág. 16, precedente |
| 23 | d) svalutazioni dei crediti compresi nell'attivo circolante e delle disponibilità liquide | pág. 16, precedente |
| 24 | 11) variazioni delle rimanenze di materie prime, sussidiarie, di consumo e merci | pág. 16, precedente |
| 25 | 13) altri accantonamenti | pág. 16, precedente |
| 26 | Spese per organizzazione gare | pág. 40, precedente |
| 27 | Tasse iscrizione gare | pág. 40, precedente |
| 28 | Oneri Specifici verso squadre ospitate | pág. 40, precedente |
| 29 | Costi acq. Temporanea calciatori | pág. 40, precedente |
| 30 | Altri oneri gestione calciatori | pág. 40, precedente |
| 31 | Altri oneri di gestione | pág. 40, precedente |

### Meta

```text
2025: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-08): perimetro = consolidado. Guido 2026-10-07: 2025 solo tiene consolidado; se carga así (el club es individual)
tools/cargar.mjs (2026-10-08). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
2025: verificado 2026-10-09 contra roster cacheado de "2025–26 Serie A" (cierre 31/12/2025) (tools/club-league-reference/it.json), "Parma"
```

## 2024

### Ingresos

```text
2024: cargado por tools/cargar.mjs (2026-10-08) desde Clubes/Italia/Parma/Parma-bilancio-31.12.2024-individual.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Italia/Parma/Parma-bilancio-31.12.2024-individual.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Gare Ufficiali Campionato | pág. 37, precedente |
| 2 | Abbonamenti | pág. 37, precedente |
| 3 | Ricavi e proventi diversi | pág. 37, precedente |
| 4 | Proventi da sponsorizzazioni | pág. 38, precedente |
| 5 | Proventi pubblicitari | pág. 38, precedente |
| 6 | Proventi commerciali e royalties | pág. 38, precedente |
| 7 | Proventi da cessione diritti audiovisivi | pág. 38, precedente |
| 8 | Proventi da cessione diritti prestazioni calciatori | pág. 38, precedente |
| 9 | Altri Proventi gestione calciatori | pág. 38, precedente |
| 10 | Contributi in conto esercizio | pág. 38, precedente |
| 11 | Ricavi e proventi diversi | pág. 38, precedente |

### Gastos

```text
tools/cargar.mjs (2026-10-08)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | 6) per materie prime, sussidiarie, di consumo e di merci | pág. 16, precedente |
| 2 | Costi per attività sportiva | pág. 39, precedente |
| 3 | Costi specifici Tecnici | pág. 39, precedente |
| 4 | Costi per intermediazioni | pág. 39, precedente |
| 5 | Costi per prestazioni servizi personale | pág. 39, precedente |
| 6 | Costi vitto, alloggio e locomozione gare | pág. 39, precedente |
| 7 | Compensi e rimborsi spesa a terzi | pág. 39, precedente |
| 8 | Costi per servizio biglietteria, controllo ingressi | pág. 39, precedente |
| 9 | Costi per pubblicità e propaganda | pág. 39, precedente |
| 10 | Costi Assicurativi | pág. 39, precedente |
| 11 | Costi per utenze e spese generali | pág. 39, precedente |
| 12 | Costi per manutenzioni e riparazioni | pág. 39, precedente |
| 13 | Legali e Amministrativi | pág. 39, precedente |
| 14 | Altri | pág. 40, precedente |
| 15 | Fitti Passivi | pág. 40, precedente |
| 16 | Costi per noleggi | pág. 40, precedente |
| 17 | Costi per attività sportiva | pág. 40, precedente |
| 18 | Altri costi per il godimento dei beni di terzi | pág. 40, precedente |
| 19 | a) salari e stipendi | pág. 16, precedente |
| 20 | b) oneri sociali | pág. 16, precedente |
| 21 | c) trattamento di fine rapporto | pág. 16, precedente |
| 22 | a) ammortamento delle immobilizzazioni immateriali | pág. 16, precedente |
| 23 | b) ammortamento delle immobilizzazioni materiali | pág. 16, precedente |
| 24 | c) altre svalutazioni delle immobilizzazioni | pág. 16, precedente |
| 25 | d) svalutazioni dei crediti compresi nell'attivo circolante e delle disponibilità liquide | pág. 16, precedente |
| 26 | 11) variazioni delle rimanenze di materie prime, sussidiarie, di consumo e merci | pág. 16, precedente |
| 27 | 13) altri accantonamenti | pág. 16, precedente |
| 28 | Spese per organizzazione gare | pág. 41, precedente |
| 29 | Tasse iscrizione gare | pág. 41, precedente |
| 30 | Oneri Specifici verso squadre ospitate | pág. 41, precedente |
| 31 | Costi acq. Temporanea calciatori | pág. 41, precedente |
| 32 | Altri oneri gestione calciatori | pág. 41, precedente |
| 33 | Altri oneri di gestione | pág. 41, precedente |

### Meta

```text
tools/cargar.mjs (2026-10-08). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
2024: tools/cargar.mjs 2026-10-08, verificado contra roster cacheado de "2024–25 Serie A" (tools/club-league-reference/it.json), coincidencia e
```

## 2023

### Ingresos

```text
2023: cargado por tools/cargar.mjs (2026-10-07) desde Clubes/Italia/Parma/Parma-bilancio-31.12.2023-individual.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Italia/Parma/Parma-bilancio-31.12.2023-individual.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Gare Ufficiali Campionato | pág. 37, Jev 0.99 |
| 2 | Abbonamenti | pág. 37, Jev 1 |
| 3 | Ricavi e proventi diversi | pág. 37, Jev 1 |
| 4 | Proventi da sponsorizzazioni | pág. 37, Jev 1 |
| 5 | Proventi pubblicitari | pág. 37, Jev 1 |
| 6 | Proventi commerciali e royalties | pág. 37, Jev 1 |
| 7 | Proventi da cessione diritti audiovisivi | pág. 37, Jev 1 |
| 8 | Proventi da cessione diritti prestazioni calciatori | pág. 37, Jev 1 |
| 9 | Altri proventi gestione calciatori | pág. 38, Jev 0.9 |
| 10 | Contributi in conto esercizio | pág. 38, Jev 0.97 |
| 11 | Ricavi e proventi diversi | pág. 38, Jev 1 |

### Gastos

```text
tools/cargar.mjs (2026-10-07)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | 6) per materie prime, sussidiarie, di consumo e di merci | pág. 17, Jev 1 |
| 2 | Costi per attività sportiva | pág. 39, precedente |
| 3 | Costi specifici Tecnici | pág. 39, precedente |
| 4 | Costi per intermediazioni | pág. 39, precedente |
| 5 | Costi per prestazioni servizi personale | pág. 39, precedente |
| 6 | Costi vitto, alloggio e locomozione gare | pág. 39, Jev 1 |
| 7 | Compensi e rimborsi spesa a terzi | pág. 39, Jev 0.98 |
| 8 | Costi per servizio biglietteria, controllo ingressi | pág. 39, Jev 1 |
| 9 | Costi per pubblicità e propaganda | pág. 39, Jev 0.99 |
| 10 | Costi Assicurativi | pág. 39, Jev 0.94 |
| 11 | Costi per utenze e spese generali | pág. 39, Jev 1 |
| 12 | Costi per manutenzioni e riparazioni | pág. 39, Jev 0.99 |
| 13 | Costi per servizio da banche e finanz. | pág. 39, Jev 0.95 |
| 14 | Legali e Amministrativi | pág. 39, Jev 1 |
| 15 | Altri | pág. 39, Jev 0.94 |
| 16 | Fitti Passivi | pág. 39, Jev 0.97 |
| 17 | Costi per noleggi | pág. 39, Jev 0.95 |
| 18 | Costi per attività sportiva | pág. 39, precedente |
| 19 | Altri costi per il godimento dei beni di terzi | pág. 39, Jev 0.96 |
| 20 | a) salari e stipendi | pág. 17, Jev 1 |
| 21 | b) oneri sociali | pág. 17, Jev 0.95 |
| 22 | c) trattamento di fine rapporto | pág. 17, Jev 0.91 |
| 23 | a) ammortamento delle immobilizzazioni immateriali | pág. 17, precedente |
| 24 | b) ammortamento delle immobilizzazioni materiali | pág. 17, Jev 1 |
| 25 | c) altre svalutazioni delle immobilizzazioni | pág. 17, Jev 0.94 |
| 26 | d) svalutazioni dei crediti compresi nell'attivo circolante e delle disponibilità liquide | pág. 17, Jev 1 |
| 27 | 11) variazioni delle rimanenze di materie prime, sussidiarie, di consumo e merci | pág. 17, Jev 0.99 |
| 28 | 13) altri accantonamenti | pág. 17, precedente |
| 29 | Spese per organizzazione gare | pág. 40, Jev 1 |
| 30 | Tasse iscrizione gare | pág. 40, Jev 0.98 |
| 31 | Costi acq. Temporanea calciatori | pág. 40, Jev 0.98 |
| 32 | Altri oneri gestione calciatori | pág. 40, Jev 0.99 |
| 33 | Altri oneri di gestione | pág. 41, Jev 0.99 |

### Meta

```text
2023: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): fila = 0. el renglón 'altri' 25.339.727 se contaba dos veces: la nota b46 abre 'Totale altri ricavi e proventi' (L558) (to-do 155/156, arreglo manual 2026-10-07)
2023: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): fila = 40.063. proventi y oneri con la misma etiqueta; el oneri impreso en positivo; Totale C (L589) (68.583) (to-do 155/156, arreglo manual 2026-10-07)
2023: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): fila = (108.646). ver el anterior (to-do 155/156, arreglo manual 2026-10-07)
tools/cargar.mjs (2026-10-07). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

## 2022

### Ingresos

```text
2022: cargado por tools/cargar.mjs (2026-10-08) desde Clubes/Italia/Parma/Parma-bilancio-31.12.2022-consolidato.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Italia/Parma/Parma-bilancio-31.12.2022-consolidato.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | - Gare Campionato | pág. 42, Jev 0.99 |
| 2 | Abbonamenti | pág. 42, precedente |
| 3 | 4) Incrementi di immobilizzazioni per lavori interni | pág. 20, precedente |
| 4 | b) Proventi da Sponsorizzazioni | pág. 20, precedente |
| 5 | c) Proventi pubblicitari | pág. 20, precedente |
| 6 | d) Proventi commerciali e royalties | pág. 20, precedente |
| 7 | e) Proventi da cessione diritti televisivi | pág. 20, Jev 1 |
| 8 | h) Plusvalenze cess. diritti pluriennali prest. giocatori | pág. 20, Jev 1 |
| 9 | i) Altri proventi gest. giocatori | pág. 20, Claude 0.9 |
| 10 | Contributi in conto esercizio | pág. 42, precedente |
| 11 | Altri ricavi e proventi | pág. 42, Jev 0.98 |

### Gastos

```text
tools/cargar.mjs (2026-10-08)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | 6) Per materie prime, sussidiarie, di consumo e di merci | pág. 20, precedente |
| 2 | Costi per attività sportiva | pág. 44, precedente |
| 3 | Costi specifici Tecnici | pág. 44, precedente |
| 4 | Costi per intermediazioni | pág. 44, precedente |
| 5 | Costi per prestazione servizi personale | pág. 44, precedente |
| 6 | Costi vitto, alloggio e locomozione gare | pág. 44, precedente |
| 7 | Compensi e rimborsi spesa a terzi | pág. 44, precedente |
| 8 | Costi per servizio biglietteria, controllo ingressi | pág. 44, precedente |
| 9 | Costi per pubblicità e propaganda | pág. 44, precedente |
| 10 | Costi assicurativi | pág. 44, precedente |
| 11 | Costi per utenze e spese generali | pág. 44, precedente |
| 12 | Costi per manutenzioni e riparazioni | pág. 44, precedente |
| 13 | Costi per servizio da banche e finanz. | pág. 44, precedente |
| 14 | Legali e Amministrativi | pág. 44, precedente |
| 15 | Altri | pág. 44, precedente |
| 16 | 8) Per godimento di beni di terzi | pág. 20, Jev 1 |
| 17 | a) Salari e stipendi | pág. 20, precedente |
| 18 | b) Oneri sociali | pág. 20, precedente |
| 19 | c) Trattamento di fine rapporto | pág. 20, precedente |
| 20 | e) Altri costi | pág. 20, Jev 0.96 |
| 21 | a) Ammortamento delle immobilizzazioni immateriali imm. | pág. 20, precedente |
| 22 | b) Ammortamento delle immobilizzazioni materiali mat. | pág. 20, Jev 1 |
| 23 | c) Altre svalutazioni delle immobilizzazioni | pág. 20, precedente |
| 24 | d) Svalutazione crediti | pág. 20, Jev 1 |
| 25 | e) Ammortamento costi diritti pluriennali prestazioni calciatori | pág. 20, Jev 0.95 |
| 26 | 11) Variazioni delle rimanenze di materie prime, sussidiarie, di consumo e merci | pág. 20, precedente |
| 27 | 12) Accantonamenti per rischi | pág. 20, precedente |
| 28 | 13) Altri accantonamenti | pág. 20, precedente |
| 29 | Spese varie per organizzazioni gare | pág. 46, Jev 0.99 |
| 30 | Tasse iscrizione gare | pág. 46, precedente |
| 31 | Costi acq. temporanea calciatori | pág. 46, precedente |
| 32 | Altri oneri gestione calciatori | pág. 46, precedente |
| 33 | Altri oneri di gestione | pág. 46, precedente |

### Meta

```text
2022: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-08): perimetro = consolidado. Guido 2026-10-07: 2022 solo tiene consolidado; se carga así (el club es individual)
tools/cargar.mjs (2026-10-08). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
2022: tools/cargar.mjs 2026-10-08, verificado contra roster cacheado de "2022–23 Serie B" (tools/club-league-reference/it.json), coincidencia e
```

## 2021

### Ingresos

```text
2021: cargado por tools/cargar.mjs (2026-10-08) desde Clubes/Italia/Parma/Parma-bilancio-31.12.2021-individual.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Italia/Parma/Parma-bilancio-31.12.2021-individual.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Gare Ufficiali Campionato | pág. 38, precedente |
| 2 | Abbonamenti | pág. 38, precedente |
| 3 | Ricavi e proventi diversi | pág. 38, precedente |
| 4 | 4) incrementi di immobilizzazioni per lavori interni | pág. 20, Jev 1 |
| 5 | Proventi da sponsorizzazioni | pág. 38, precedente |
| 6 | Proventi pubblicitari | pág. 38, precedente |
| 7 | Proventi commerciali e royalties | pág. 38, precedente |
| 8 | Proventi da cessione diritti audiovisivi | pág. 38, precedente |
| 9 | Proventi da cessione diritti pluriennali prestazioni calciatori | pág. 39, Jev 1 |
| 10 | Altri proventi gestione calciatori | pág. 39, precedente |
| 11 | Contributi in conto esercizio | pág. 39, precedente |
| 12 | Ricavi e proventi diversi | pág. 39, precedente |

### Gastos

```text
tools/cargar.mjs (2026-10-08)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | 6) per materie prime, sussidiarie, di consumo e di merci | pág. 20, precedente |
| 2 | Costi per attività sportiva | pág. 40, precedente |
| 3 | Costi specifici Tecnici | pág. 40, precedente |
| 4 | Costi per intermediazioni | pág. 40, precedente |
| 5 | Costi per prestazioni servizi personale | pág. 40, precedente |
| 6 | Costi vitto, alloggio e locomozione gare | pág. 40, precedente |
| 7 | Compensi e rimborsi spesa a terzi | pág. 40, precedente |
| 8 | Costi per servizio biglietteria, controllo ingressi | pág. 40, precedente |
| 9 | Costi per pubblicità e propaganda | pág. 40, precedente |
| 10 | Costi Assicurativi | pág. 40, precedente |
| 11 | Costi per utenze e spese generali | pág. 40, precedente |
| 12 | Costi per manutenzioni e riparazioni | pág. 40, precedente |
| 13 | Costi per servizio da banche e finanz. | pág. 40, precedente |
| 14 | Altri | pág. 40, precedente |
| 15 | Fitti Passivi | pág. 40, precedente |
| 16 | Costi per noleggi | pág. 40, precedente |
| 17 | Costi per attività sportiva | pág. 40, precedente |
| 18 | Altri costi per il godimento dei beni di terzi | pág. 40, precedente |
| 19 | Costi per attività sportiva | pág. 40, precedente |
| 20 | a) salari e stipendi | pág. 20, precedente |
| 21 | b) oneri sociali | pág. 20, precedente |
| 22 | c) trattamento di fine rapporto | pág. 20, precedente |
| 23 | a) ammortamento delle immobilizzazioni immateriali | pág. 20, precedente |
| 24 | b) ammortamento delle immobilizzazioni materiali | pág. 20, precedente |
| 25 | d) svalutazioni dei crediti compresi nell'attivo circolante e delle disponibilità liquide | pág. 20, precedente |
| 26 | 11) variazioni delle rimanenze di materie prime, sussidiarie, di consumo e merci | pág. 20, precedente |
| 27 | 12) accantonamenti per rischi | pág. 20, Jev 0.99 |
| 28 | Spese per organizzazione gare | pág. 41, precedente |
| 29 | Tasse iscrizione gare | pág. 41, precedente |
| 30 | Oneri Specifici verso squadre ospitate | pág. 41, Jev 1 |
| 31 | Costi acq. Temporanea calciatori | pág. 41, precedente |
| 32 | Costi valorizzazione calciatori | pág. 41, precedente |
| 33 | Costi accessori campagna trasferimenti | pág. 41, Jev 1 |
| 34 | Minusvalenze cessioni calciatori | pág. 41, Jev 0.99 |
| 35 | Altri oneri di gestione | pág. 41, precedente |

### Meta

```text
tools/cargar.mjs (2026-10-08). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
2021: tools/cargar.mjs 2026-10-08, verificado contra roster cacheado de "2021–22 Serie B" (tools/club-league-reference/it.json), coincidencia e
```

## 2019

### Ingresos

```text
2019: cargado por tools/cargar.mjs (2026-10-08) desde Clubes/Italia/Parma/Parma-bilancio-30.06.2019-individual.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Italia/Parma/Parma-bilancio-30.06.2019-individual.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | -Gare Ufficiali Campionato | pág. 36, precedente |
| 2 | -Gare Ufficiali Coppa Italia | pág. 36, precedente |
| 3 | -Gare Amichevoli e tornei | pág. 36, precedente |
| 4 | Abbonamenti | pág. 36, precedente |
| 5 | Biglietti museo | pág. 36, precedente |
| 6 | Ricavi merchandising | pág. 36, precedente |
| 7 | 4) incrementi di immobilizzazioni per lavori interni | pág. 16, precedente |
| 8 | Proventi da sponsorizzazioni | pág. 37, precedente |
| 9 | Proventi pubblicitari | pág. 37, precedente |
| 10 | Proventi commerciali e royalties | pág. 37, precedente |
| 11 | Proventi da cessione diritti televisivi | pág. 37, precedente |
| 12 | Plusvalenze per cessione diritti prestazioni calciatori | pág. 37, Jev 0.99 |
| 13 | Altri proventi gestione calciatori | pág. 37, precedente |
| 14 | Altri ricavi e proventi | pág. 37, precedente |

### Gastos

```text
tools/cargar.mjs (2026-10-08)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | 6) per materie prime, sussidiarie, di consumo e di merci | pág. 16, precedente |
| 2 | Costi per tesserati | pág. 38, precedente |
| 3 | Costi per attività sportiva | pág. 38, precedente |
| 4 | Costi specifici tecnici | pág. 38, precedente |
| 5 | Costi vitto, alloggio, locomozione gare | pág. 39, precedente |
| 6 | Servizio biglietteria, controllo ingressi | pág. 39, precedente |
| 7 | Assicurative e previdenziali | pág. 39, precedente |
| 8 | Amministrative, pubblicitarie e generali | pág. 39, precedente |
| 9 | Spese legali | pág. 39, Jev 1 |
| 10 | Altri | pág. 39, precedente |
| 11 | 8) per godimento di beni di terzi | pág. 16, precedente |
| 12 | a) salari e stipendi | pág. 16, precedente |
| 13 | b) oneri sociali | pág. 16, precedente |
| 14 | c) trattamento di fine rapporto | pág. 16, precedente |
| 15 | e) altri costi | pág. 16, Jev 0.96 |
| 16 | a) ammortamento delle immobilizzazioni immateriali | pág. 16, precedente |
| 17 | b) ammortamento delle immobilizzazioni materiali | pág. 16, precedente |
| 18 | c) altre svalutazioni delle immobilizzazioni | pág. 16, precedente |
| 19 | d) svalutazioni dei crediti compresi nell'attivo circolante e delle disponibilità liquide | pág. 16, precedente |
| 20 | 11) variazioni delle rimanenze di materie prime, sussidiarie, di consumo e merci | pág. 16, precedente |
| 21 | 12) accantonamenti per rischi | pág. 16, precedente |
| 22 | Spese varie per organizzazioni gare | pág. 41, precedente |
| 23 | Tasse iscrizione gare | pág. 41, precedente |
| 24 | Costi acquisizione temporanea prestazione calciatori | pág. 41, precedente |
| 25 | - Costi valorizzazione calciatori | pág. 41, precedente |
| 26 | - Costi Accessori Campagna Trasferimenti | pág. 41, precedente |
| 27 | - Costi per diritti di opzione | pág. 41, precedente |
| 28 | Altri | pág. 41, precedente |
| 29 | Altri oneri gestione | pág. 41, precedente |

### Meta

```text
tools/cargar.mjs (2026-10-08). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
2019: tools/cargar.mjs 2026-10-08, verificado contra roster cacheado de "2018–19 Serie A" (tools/club-league-reference/it.json), coincidencia e
```

## 2018

### Ingresos

```text
2018: cargado por tools/cargar.mjs (2026-10-08) desde Clubes/Italia/Parma/Parma-bilancio-30.06.2018.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Italia/Parma/Parma-bilancio-30.06.2018.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | -Gare Ufficiali Campionato | pág. 32, precedente |
| 2 | -Gare Ufficiali Coppa Italia | pág. 32, Jev 1 |
| 3 | -Gare Amichevoli e tornei | pág. 32, Jev 0.98 |
| 4 | Abbonamenti | pág. 32, precedente |
| 5 | Biglietti museo | pág. 32, ? 0.6 |
| 6 | Ricavi merchandising | pág. 32, Jev 1 |
| 7 | 4) incrementi di immobilizzazioni per lavori interni | pág. 13, precedente |
| 8 | Proventi da sponsorizzazioni | pág. 33, precedente |
| 9 | Proventi pubblicitari | pág. 33, precedente |
| 10 | Proventi commerciali e royalties | pág. 33, precedente |
| 11 | Proventi da cessione diritti televisivi | pág. 33, precedente |
| 12 | Altri proventi gestione calciatori | pág. 33, precedente |
| 13 | Altri ricavi e proventi | pág. 33, Jev 0.98 |

### Gastos

```text
tools/cargar.mjs (2026-10-08)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | 6) per materie prime, sussidiarie, di consumo e di merci | pág. 13, precedente |
| 2 | Costi per tesserati | pág. 34, precedente |
| 3 | Costi per attività sportiva | pág. 34, precedente |
| 4 | Costi specifici tecnici | pág. 34, precedente |
| 5 | Costi vitto, alloggio, locomozione gare | pág. 34, precedente |
| 6 | Servizio biglietteria, controllo ingressi | pág. 34, Jev 1 |
| 7 | Assicurative e previdenziali | pág. 34, Jev 0.99 |
| 8 | Amministrative, pubblicitarie e generali | pág. 34, Jev 1 |
| 9 | Altri | pág. 34, precedente |
| 10 | 8) per godimento di beni di terzi | pág. 13, precedente |
| 11 | Retribuzione Calciatori | pág. 35, Jev 1 |
| 12 | Retribuzione Allenatori e Tecnici | pág. 35, Jev 0.99 |
| 13 | Retribuzione Impiegati | pág. 35, precedente |
| 14 | Retribuzioni Biglietteria | pág. 35, precedente |
| 15 | Retribuzione altro personale | pág. 35, precedente |
| 16 | Retribuzione operai | pág. 35, precedente |
| 17 | Retribuzioni Tirocinanti | pág. 35, precedente |
| 18 | Retribuzione Settore Giovanile | pág. 35, precedente |
| 19 | Incentivi all'esodo | pág. 35, precedente |
| 20 | Premi | pág. 35, Jev 0.98 |
| 21 | b) oneri sociali | pág. 13, precedente |
| 22 | c) trattamento di fine rapporto | pág. 13, precedente |
| 23 | e) altri costi | pág. 13, precedente |
| 24 | a) ammortamento delle immobilizzazioni immateriali | pág. 13, precedente |
| 25 | b) ammortamento delle immobilizzazioni materiali | pág. 13, precedente |
| 26 | d) svalutazioni dei crediti compresi nell'attivo circolante e delle disponibilità liquide | pág. 13, precedente |
| 27 | 11) variazioni delle rimanenze di materie prime, sussidiarie, di consumo e merci | pág. 13, precedente |
| 28 | Spese varie per organizzazioni gare | pág. 36, Jev 0.99 |
| 29 | Tasse iscrizione gare | pág. 36, precedente |
| 30 | Costi acquisizione temporanea prestazione calciatori | pág. 36, Jev 0.99 |
| 31 | Minusvalenze Cessione Calciatori | pág. 36, precedente |
| 32 | - Costi valorizzazione calciatori | pág. 36, precedente |
| 33 | - Costi Accessori Campagna Trasferimenti | pág. 36, precedente |
| 34 | - Costi per diritti di opzione | pág. 36, precedente |
| 35 | Altri oneri gestione | pág. 36, Jev 0.97 |

### Meta

```text
tools/cargar.mjs (2026-10-08). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
2018: tools/cargar.mjs 2026-10-08, verificado contra roster cacheado de "2017–18 Serie B" (tools/club-league-reference/it.json), coincidencia e
```

## 2017

### Ingresos

```text
2017: cargado por tools/cargar.mjs (2026-10-08) desde Clubes/Italia/Parma/Parma-bilancio-30.06.2017-individual.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Italia/Parma/Parma-bilancio-30.06.2017-individual.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | - Gare Campionato | pág. 27, precedente |
| 2 | - Gare Amichevoli e tornei | pág. 27, precedente |
| 3 | Abbonamenti | pág. 27, precedente |
| 4 | Biglietti omaggio | pág. 27, ? 0.6 |
| 5 | Biglietti museo | pág. 27, precedente |
| 6 | Ricavi merchandising | pág. 27, precedente |
| 7 | 4) incrementi di immobilizzazioni per lavori interni | pág. 10, precedente |
| 8 | Proventi da sponsorizzazioni | pág. 27, precedente |
| 9 | Proventi pubblicitari | pág. 27, precedente |
| 10 | Proventi commerciali e royalties | pág. 27, precedente |
| 11 | Proventi da cessione diritti televisivi | pág. 27, precedente |
| 12 | Altri proventi gestione calciatori | pág. 27, precedente |
| 13 | Altri ricavi e proventi | pág. 27, precedente |

### Gastos

```text
tools/cargar.mjs (2026-10-08)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | 6) per materie prime, sussidiarie, di consumo e di merci | pág. 10, precedente |
| 2 | 7) per servizi | pág. 10, precedente |
| 3 | Noleggi vari | pág. 29, precedente |
| 4 | Canone di affitto e locazione | pág. 29, precedente |
| 5 | Altri | pág. 29, Jev 0.94 |
| 6 | Retribuzione Calciatori | pág. 29, precedente |
| 7 | Retribuzione Allenatori e Tecnici | pág. 29, precedente |
| 8 | Retribuzione Impiegati | pág. 29, precedente |
| 9 | Retribuzioni Biglietteria | pág. 29, precedente |
| 10 | Retribuzione altro personale | pág. 29, precedente |
| 11 | Retribuzione opera | pág. 29, precedente |
| 12 | Retribuzioni Tirocinanti | pág. 29, precedente |
| 13 | Retribuzione Settore Giovanile | pág. 29, precedente |
| 14 | Altre retribuzioni | pág. 29, precedente |
| 15 | Incentivi all'esodo | pág. 29, precedente |
| 16 | Premi | pág. 29, precedente |
| 17 | b) oneri sociali | pág. 10, precedente |
| 18 | c) trattamento di fine rapporto | pág. 10, precedente |
| 19 | e) altri costi | pág. 10, Jev 0.96 |
| 20 | Amm. Costi di impianto ed ampliamento | pág. 30, precedente |
| 21 | Diritti brevetti industriali e diritti ut. op. ing. | pág. 30, Claude 0.85 |
| 22 | Concessioni, licenze, marchi e diritti simili | pág. 30, precedente |
| 23 | Capitalizzazione costi vivaio | pág. 30, ? 0.6 |
| 24 | Diritti pluriennali alle prestazioni dei calciatori | pág. 30, Jev 0.92 |
| 25 | Diritti pluriennali alle prestazioni dei calciatori settore giovanile | pág. 30, Claude 0.85 |
| 26 | Altre imm. immateriali - Migliorie beni di terzi | pág. 30, precedente |
| 27 | Amm. Impianti e macchinari | pág. 30, precedente |
| 28 | Amm. Attrezzature industriali e commerciali | pág. 30, precedente |
| 29 | Amm. Altre immobilizzazioni materiali | pág. 30, precedente |
| 30 | d) svalutazioni dei crediti compresi nell'attivo circolante e delle disponibilità liquide | pág. 10, precedente |
| 31 | 11) variazioni delle rimanenze di materie prime, sussidiarie, di consumo e merci | pág. 10, precedente |
| 32 | 12) accantonamenti per rischi | pág. 10, precedente |
| 33 | 13) altri accantonamenti | pág. 10, precedente |
| 34 | 14) oneri diversi di gestione | pág. 10, Jev 0.99 |

### Meta

```text
tools/cargar.mjs (2026-10-08). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
2017: verificado 2026-10-09 contra roster cacheado de "2016–17 Lega Pro" (tools/club-league-reference/it.json, los 3 grupos armados a mano), "Parma" (girone B)
```

## 2016

### Ingresos

```text
2016: cargado por tools/cargar.mjs (2026-10-08) desde Clubes/Italia/Parma/Parma-bilancio-30.06.2016-individual.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Italia/Parma/Parma-bilancio-30.06.2016-individual.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | - Gare Campionato | pág. 39, precedente |
| 2 | - Gare Amichevoli e tornei | pág. 39, precedente |
| 3 | Abbonamenti | pág. 39, precedente |
| 4 | Proventi da sponsorizzazioni | pág. 39, precedente |
| 5 | Proventi pubblicitari | pág. 39, precedente |
| 6 | Proventi commerciali e royalties | pág. 39, precedente |
| 7 | Altri ricavi e proventi | pág. 39, precedente |

### Gastos

```text
tools/cargar.mjs (2026-10-08)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | 6) per materie prime, sussidiarie, di consumo e di merci | pág. 6, precedente |
| 2 | 7) per servizi | pág. 6, Jev 1 |
| 3 | Noleggi vari | pág. 40, Jev 0.97 |
| 4 | Canone di affitto e locazione | pág. 40, Claude 0.85 |
| 5 | Altri | pág. 40, Jev 0.94 |
| 6 | a) salari e stipendi | pág. 6, precedente |
| 7 | b) oneri sociali | pág. 6, precedente |
| 8 | c) trattamento di fine rapporto | pág. 6, precedente |
| 9 | Amm. Costi di impianto ed ampliamento | pág. 41, Jev 0.99 |
| 10 | Concessioni, licenze, marchi e diritti simili | pág. 41, Jev 1 |
| 11 | Altre imm. immateriali - Migliorie beni di terzi | pág. 41, Jev 0.99 |
| 12 | Amm. Impianti e macchinari | pág. 41, Jev 1 |
| 13 | Amm. Attrezzature industriali e commerciali | pág. 41, Jev 1 |
| 14 | Amm. Altre immobilizzazioni materiali | pág. 41, Claude 0.92 |
| 15 | 11) variazioni delle rimanenze di materie prime, sussidiarie, di consumo e merci | pág. 6, precedente |
| 16 | 12) accantonamenti per rischi | pág. 6, precedente |
| 17 | 13) altri accantonamenti | pág. 6, precedente |
| 18 | Spese varie per organizzazioni gare | pág. 42, precedente |
| 19 | Tasse iscrizioni gare | pág. 42, precedente |
| 20 | - Altri oneri da gestione calciatori: | pág. 42, Jev 0.99 |
| 21 | - Costi valorizzazione calciatori | pág. 42, precedente |
| 22 | - Spese, ammende e multe gare | pág. 42, Jev 0.99 |
| 23 | - Imposte e tasse sugli incassi | pág. 42, Jev 0.99 |
| 24 | - Oneri tributari indiretti | pág. 42, Jev 1 |
| 25 | -Altri | pág. 42, precedente |
| 26 | altri | pág. 6, Jev 0.94 |

### Meta

```text
tools/cargar.mjs (2026-10-08). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
2016: verificado 2026-10-09 contra roster cacheado de "2015–16 Serie D" (tools/club-league-reference/it.json, los 9 gironi armados a mano), "Parma" (girone D)
```

## Gestiones

_antes de Nevio Scala (data/gestiones/it.js):_

```text
Scala: presidente del Parma refundado (Serie D) desde el verano de 2015 (la sociedad se constituyó el 30/6/2015) hasta el 22/11/2016.
Entre el 22/11 y el 31/12/2016 la fuente no nombra a nadie (la gestión siguiente arranca el 01/01/2017 por convención): ningún cierre cae ahí.
```

_antes de Jiang Lizhang (data/gestiones/it.js):_

```text
Las tres gestiones: la fuente da solo los años (2017-2018, 2018-2020, 2020-); 01/01/2017, 01/10/2018 (control de Nuovo Inizio,
octubre de 2018) y 01/09/2020 (septiembre de 2020, entra la familia Krause) por convención.
```

## Fuentes

### (general)

```text
Fuentes de cada ejercicio: las agrega tools/cargar.mjs adentro de este bloque (Versión 379: hasta la 378 el esqueleto no lo traía y la
primera carga de un club dado de alta por script se revertía, "no encontré Object.assign(sources, {"; caso: Fortaleza CEIF).
```

### parma-it-bilancio-31-12-2023-individual

_note (data/):_

```text
Cargado por tools/cargar.mjs (2026-10-07) desde la transcripción Clubes/Italia/Parma/Parma-bilancio-31.12.2023-individual.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### parma-it-bilancio-31-12-2021-individual

_note (data/):_

```text
Cargado por tools/cargar.mjs (2026-10-08) desde la transcripción Clubes/Italia/Parma/Parma-bilancio-31.12.2021-individual.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### parma-it-bilancio-31-12-2022-consolidato

_note (data/):_

```text
Cargado por tools/cargar.mjs (2026-10-08) desde la transcripción Clubes/Italia/Parma/Parma-bilancio-31.12.2022-consolidato.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.
```

### parma-it-bilancio-31-12-2024-individual

_note (data/):_

```text
Cargado por tools/cargar.mjs (2026-10-08) desde la transcripción Clubes/Italia/Parma/Parma-bilancio-31.12.2024-individual.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### parma-it-bilancio-31-12-2025-consolidato

_note (data/):_

```text
Cargado por tools/cargar.mjs (2026-10-08) desde la transcripción Clubes/Italia/Parma/Parma-bilancio-31.12.2025-consolidato.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.
```

### parma-it-bilancio-30-06-2018

_note (data/):_

```text
Cargado por tools/cargar.mjs (2026-10-08) desde la transcripción Clubes/Italia/Parma/Parma-bilancio-30.06.2018.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### parma-it-bilancio-30-06-2019-individual

_note (data/):_

```text
Cargado por tools/cargar.mjs (2026-10-08) desde la transcripción Clubes/Italia/Parma/Parma-bilancio-30.06.2019-individual.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### parma-it-bilancio-30-06-2016-individual

_note (data/):_

```text
Cargado por tools/cargar.mjs (2026-10-08) desde la transcripción Clubes/Italia/Parma/Parma-bilancio-30.06.2016-individual.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### parma-it-bilancio-30-06-2017-individual

_note (data/):_

```text
Cargado por tools/cargar.mjs (2026-10-08) desde la transcripción Clubes/Italia/Parma/Parma-bilancio-30.06.2017-individual.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```
