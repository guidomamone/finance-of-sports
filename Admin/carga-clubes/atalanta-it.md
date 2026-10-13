# atalanta-it — evidencia de carga

Lo que había como comentario en `data/it/atalanta-it-data.js`, movido tal cual por `tools/mover-comentarios-data.mjs` (la regla:
`Admin/CONVENCIONES-DATOS.md`, "data/<país>/<club>-data.js NO LLEVA COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y
meta. Las notas de cada fila van en una tabla con su número de fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
============================================================================
data/it/atalanta-it-data.js — Atalanta Bergamasca Calcio S.p.A. (Italia).
ALTA POR SCRIPT (tools/alta-club.mjs, 2026-10-07), SIN EJERCICIOS CARGADOS TODAVÍA:
las estructuras de abajo están vacías a propósito. Los rubros, los totales
oficiales y el resto del fiscalYearMeta los agrega la etapa de carga
(tools/proponer-carga.mjs / sesión de onboarding), que es también la que
reemplaza esta cabecera por la de siempre (fuente, perímetro, categorización).

Documento que originó el alta: Clubes/Italia/Atalanta/Atalanta-bilancio-consolidato-2021.pdf

De dónde salió cada campo (estado según alta-club.mjs: ok / pendiente):
  id                 ok        "atalanta-it" — slug de "Atalanta" + '-it' (convención de clubId, Admin/CONVENCIONES.md Versión 129)
  name               ok        "Atalanta Bergamasca Calcio S.p.A." — el .md, 7 veces (nombre del club + forma societaria)
  displayName        ok        "Atalanta" — nombre de la carpeta del club en Clubes/
  country            ok        "IT" — carpeta de país "Italia" (tabla PAISES)
  reportingCurrency  ok        "EUR" — moneda de curso legal de Italia
  fiscalYearStart    ok        "07-01" — el documento más reciente del club (Atalanta-bilancio-consolidato-2025.md, cierre mes 6): el cierre CAMBIÓ en el tiempo (mes 12: 2018,2020,2021 / mes 
  sport              ok        "futbol" — el .md nombra el fútbol 39 veces y ningún otro deporte más que eso
  brandColor         pendiente (ausente) — tools/brand-color-reference/ (footylogos): [italia] atalanta: #0D68B1 Blue, #FFFFFF White, #1E1E1E Black
  anio               ok        2021 — nombre del archivo (misma regla que onboard.mjs --quien), confirmado por las fechas de cierre del .md
  cierre             ok        "2021-12-31" — año del ejercicio + mes de cierre (contenido del .md (118 de 120 fechas de fin de mes caen en el mes 12))
  reportType         ok        "official_balance_sheet" — el .md tiene un estado contable (resultados / balance) y el nombre del archivo no sugiere otro tipo
  perimetro          ok        "consolidado" — ajuste manual (Admin/registros/ajustes-manuales.jsonl, perimetro-senales 2026-10-06): perimetro-senales.mjs: 0 documento(s) con los dos estados votan —; 7 ejerc
  currency           ok        "EUR" — moneda de curso legal de Italia (tabla PAISES de alta-club.mjs)
  fxRef              ok        "EUR@2021-12-31" — el documento no declara tipo de cambio; tools/fx-reference/ (lookup-fx-close.js): 0.882924. --escribir agrega 'EUR@2021-12-31' a FX_CLOSE
  sourceId           ok        "atalanta-it-bilancio-consolidato-2021" — clubId + nombre del archivo en slug
  liga               ok        "it-seriea" — roster cacheado de "2021–22 Serie A" (tools/club-league-reference/it.json), coincidencia exacta "Atalanta"

FISCAL YEAR META PROPUESTO para 2021 (NO registrado: un ejercicio con meta y
sin rubros se vería en el sitio como un año en cero, y "sin dato no es cero"):
  2021: {"reportType":"official_balance_sheet","currency":"EUR","fxRef":"EUR@2021-12-31","sourceId":"atalanta-it-bilancio-consolidato-2021"}
============================================================================
```

_de data/clubs.js:_

```text
Atalanta: alta por tools/alta-club.mjs (2026-10-07) desde Clubes/Italia/Atalanta/Atalanta-bilancio-consolidato-2021.pdf.
brandColor y su procedencia: Admin/sourcing/Italia/Atalanta.md.
```

_de data/club-leagues/it.js:_

```text
Atalanta (alta-club.mjs, 2026-10-07): verificado contra roster cacheado de "2021–22 Serie A" (tools/club-league-reference/it.json), coincidencia exacta "Atalanta".
```

## 2025

### Ingresos

```text
2025: cargado por tools/cargar.mjs (2026-10-08) desde Clubes/Italia/Atalanta/Atalanta-bilancio-consolidato-2025.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Italia/Atalanta/Atalanta-bilancio-consolidato-2025.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | a) ricavi da gare | pág. 8, precedente |
| 2 | b) abbonamenti | pág. 8, precedente |
| 3 | c) altri ricavi delle vendite e delle prestazioni | pág. 8, precedente |
| 4 | b) proventi da sponsorizzazioni | pág. 8, precedente |
| 5 | d) proventi commerciali e royalties | pág. 8, precedente |
| 6 | e) proventi da cessione diritti audiovisivi e non audiovisivi | pág. 8, precedente |
| 7 | f) ricavi da cessione temporanea prestazioni calciatori | pág. 8, precedente |
| 8 | g) plusvalenze da cessione diritti pluriennali prestazioni calciatori | pág. 8, precedente |
| 9 | - premi e/o indennizzi attivi ex art.103, comma 3, NOIF | pág. 8, precedente |
| 10 | - proventi diversi da trasferimento diritti calciatori | pág. 8, precedente |
| 11 | i) ricavi e proventi diversi | pág. 8, precedente |

### Gastos

```text
tools/cargar.mjs (2026-10-08)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | 6) per materie prime, sussidiarie, di consumo e merci | pág. 8, Jev 0.97 |
| 2 | 7) per servizi | pág. 8, Jev 1 |
| 3 | 8) per godimento beni di terzi | pág. 8, Jev 0.97 |
| 4 | a) salari e stipendi | pág. 8, precedente |
| 5 | b) oneri sociali | pág. 8, precedente |
| 6 | c) trattamento di fine rapporto | pág. 8, precedente |
| 7 | e) altri costi | pág. 8, precedente |
| 8 | a) ammortamento delle immobilizzazioni immateriali | pág. 8, precedente |
| 9 | b) ammortamento delle immobilizzazioni materiali | pág. 8, precedente |
| 10 | c) altre svalutazioni delle immobilizzazioni | pág. 8, precedente |
| 11 | d) svalutazione crediti compresi nell'attivo circolante e disp. liquide | pág. 8, precedente |
| 12 | 11) Variazioni rimanenze di materie prime, sussidiarie, di consumo e merci | pág. 8, precedente |
| 13 | 12) Accantonamenti per rischi | pág. 8, precedente |
| 14 | a) oneri da organizzazione competizioni | pág. 8, precedente |
| 15 | b) costi per acquisizione temporanea prestazioni calciatori | pág. 8, precedente |
| 16 | c) minusvalenze da cessione diritti pluriennali prestazioni calciatori | pág. 8, precedente |
| 17 | - premi e/o indennizzi passivi ex art.103, comma 3, NOIF | pág. 8, precedente |
| 18 | - oneri diversi da trasferimento diritti calciatori | pág. 8, precedente |
| 19 | e) altri oneri diversi di gestione | pág. 8, precedente |
| 20 | a) di partecipazioni (svalutazione) | pág. 8, precedente |

### Meta

```text
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-08): fila = 4.000. rettifiche D) impresas en negativo = costo; Risultato prima delle imposte 58.571.254 = 59.105.997 - 530.743 - 4.000
tools/cargar.mjs (2026-10-08). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
2025: tools/cargar.mjs 2026-10-08, verificado contra roster cacheado de "2024–25 Serie A" (tools/club-league-reference/it.json), coincidencia e
```

## 2024

### Ingresos

```text
2024: cargado por tools/cargar.mjs (2026-10-07) desde Clubes/Italia/Atalanta/Atalanta-bilancio-consolidato-2024.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Italia/Atalanta/Atalanta-bilancio-consolidato-2024.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | a) ricavi da gare | pág. 8, Claude 0.88 |
| 2 | b) abbonamenti | pág. 8, Jev 1 |
| 3 | c) altri ricavi delle vendite e delle prestazioni | pág. 8, Jev 0.96 |
| 4 | - altri contributi in conto esercizio | pág. 8, Jev 0.98 |
| 5 | b) proventi da sponsorizzazioni | pág. 8, Jev 1 |
| 6 | d) proventi commerciali e royalties | pág. 8, Jev 0.97 |
| 7 | e) proventi da cessione diritti audiovisivi e non audiovisivi | pág. 8, Jev 0.91 |
| 8 | f) ricavi da cessione temporanea prestazioni calciatori | pág. 8, ? 0.6 |
| 9 | g) plusvalenze da cessione diritti pluriennali prestazioni calciatori | pág. 8, Jev 0.99 |
| 10 | - premi e/o indennizzi attivi ex art.103, comma 3, NOIF | pág. 8, Jev 0.93 |
| 11 | - proventi diversi da trasferimento diritti calciatori | pág. 8, Jev 0.92 |
| 12 | i) ricavi e proventi diversi | pág. 8, Jev 1 |

### Gastos

```text
tools/cargar.mjs (2026-10-07)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Acquisto materiali vari e di consumo | pág. 36, precedente |
| 2 | Acquisto divise dipendenti | pág. 36, precedente |
| 3 | Acquisto materiale pubblicitario e promozionale | pág. 36, precedente |
| 4 | Acquisto medicinali | pág. 36, precedente |
| 5 | Sconti e abbuoni su acquisti | pág. 36, precedente |
| 6 | Compensi a terzi | pág. 36, Jev 1 |
| 7 | Altri costi per servizi | pág. 36, precedente |
| 8 | Costi per attività sportiva | pág. 36, precedente |
| 9 | Spese Amministrative e generali serv. | pág. 36, Jev 0.99 |
| 10 | Spese Pubblicitarie | pág. 36, Jev 1 |
| 11 | Costi vitto - alloggio - locomozione gare | pág. 36, Jev 1 |
| 12 | Costi per utenze | pág. 36, Jev 0.98 |
| 13 | Manutenzioni e riparazioni | pág. 36, Jev 0.99 |
| 14 | Costi specifici tecnici | pág. 36, precedente |
| 15 | Assicurative e previdenziali | pág. 36, precedente |
| 16 | Servizio biglietteria/controllo ingressi | pág. 36, Jev 1 |
| 17 | Locazioni impianti sportivi | pág. 37, precedente |
| 18 | Noleggi e locazioni varie | pág. 37, Jev 0.97 |
| 19 | Locazioni immobiliari | pág. 37, Jev 0.93 |
| 20 | Compensi contrattuali calciatori | pág. 37, Jev 0.97 |
| 21 | Compensi contrattuali allenatori-tecnici | pág. 37, Jev 0.94 |
| 22 | Salari-stipendi | pág. 37, Jev 0.93 |
| 23 | Oneri sociali | pág. 37, precedente |
| 24 | Oneri sociali | pág. 37, precedente |
| 25 | F.A.F.I.C. - T.F.R. | pág. 37, precedente |
| 26 | F.A.F.I.C. - T.F.R. | pág. 37, precedente |
| 27 | e) altri costi | pág. 8, precedente |
| 28 | Amm. Diritti pluriennali alle prestazioni dei calciatori | pág. 37, Jev 1 |
| 29 | Amm. Costi capitalizzati vivaio | pág. 37, precedente |
| 30 | Amm. Altre Immobilizzazioni | pág. 37, Jev 0.97 |
| 31 | Amm. Immobili strumentali | pág. 38, Jev 0.99 |
| 32 | Amm. Impianti specifici | pág. 38, Jev 0.98 |
| 33 | Amm. Automezzi e autovetture | pág. 38, Claude 0.9 |
| 34 | Amm. Attrezzatura generica | pág. 38, Claude 0.95 |
| 35 | Amm. Mobili macchine d'ufficio | pág. 38, Jev 0.91 |
| 36 | Amm. Macchine d'ufficio elettroniche | pág. 38, Claude 0.9 |
| 37 | Amm. Altri beni sociali | pág. 38, Jev 0.98 |
| 38 | c) altre svalutazioni delle immobilizzazioni | pág. 8, precedente |
| 39 | d) svalutazione crediti compresi nell'attivo circolante e disp. liquide | pág. 8, Jev 0.97 |
| 40 | 11) Variazioni rimanenze di materie prime, sussidiarie, di consumo e merci | pág. 8, Jev 1 |
| 41 | 12) Accantonamenti per rischi | pág. 8, precedente |
| 42 | a) oneri da organizzazione competizioni | pág. 8, Jev 1 |
| 43 | b) costi per acquisizione temporanea prestazioni calciatori | pág. 8, precedente |
| 44 | c) minusvalenze da cessione diritti pluriennali prestazioni calciatori | pág. 8, precedente |
| 45 | - premi e/o indennizzi passivi ex art.103, comma 3, NOIF | pág. 8, precedente |
| 46 | - oneri diversi da trasferimento diritti calciatori | pág. 8, precedente |
| 47 | e) altri oneri diversi di gestione | pág. 8, Jev 0.96 |

### Meta

```text
tools/cargar.mjs (2026-10-07). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
2024: tools/cargar.mjs 2026-10-07, verificado contra roster cacheado de "2023–24 Serie A" (tools/club-league-reference/it.json), coincidencia e
```

## 2023

### Ingresos

```text
2023: cargado por tools/cargar.mjs (2026-10-08) desde Clubes/Italia/Atalanta/Atalanta-bilancio-consolidato-2023.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Italia/Atalanta/Atalanta-bilancio-consolidato-2023.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | a) ricavi da gare | pág. 7, precedente |
| 2 | b) abbonamenti | pág. 7, precedente |
| 3 | c) altri ricavi delle vendite e delle prestazioni | pág. 7, precedente |
| 4 | 4) Incrementi di immobilizzazioni per lavori interni | pág. 7, precedente |
| 5 | - altri contributi in conto esercizio | pág. 7, precedente |
| 6 | b) proventi da sponsorizzazioni | pág. 7, precedente |
| 7 | d) proventi commerciali e royalties | pág. 7, precedente |
| 8 | e) proventi da cessione diritti audiovisivi e non audiovisivi | pág. 7, precedente |
| 9 | f) ricavi da cessione temporanea prestazioni calciatori | pág. 7, precedente |
| 10 | g) plusvalenze da cessione diritti pluriennali prestazioni calciatori | pág. 7, precedente |
| 11 | - premi e/o indennizzi attivi ex art.103, comma 3, NOIF | pág. 7, precedente |
| 12 | - proventi diversi da trasferimento diritti calciatori | pág. 7, precedente |
| 13 | i) ricavi e proventi diversi | pág. 7, precedente |

### Gastos

```text
tools/cargar.mjs (2026-10-08)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Acquisto materiali vari e di consumo | pág. 35, precedente |
| 2 | Acquisto divise dipendenti | pág. 35, precedente |
| 3 | Acquisto materiale pubblicitario e promozionale | pág. 35, precedente |
| 4 | Acquisto medicinali | pág. 35, precedente |
| 5 | Sconti e abbuoni su acquisti | pág. 35, precedente |
| 6 | Compensi a terzi | pág. 36, precedente |
| 7 | Costi per attività sportiva | pág. 36, precedente |
| 8 | Spese Amministrative e generali serv. | pág. 36, precedente |
| 9 | Altri costi per servizi | pág. 36, precedente |
| 10 | Spese Pubblicitarie | pág. 36, precedente |
| 11 | Manutenzioni e riparazioni | pág. 36, precedente |
| 12 | Costi vitto - alloggio - locomozione gare | pág. 36, precedente |
| 13 | Costi per utenze | pág. 36, precedente |
| 14 | Assicurative e previdenziali | pág. 36, precedente |
| 15 | Costi specifici tecnici | pág. 36, precedente |
| 16 | Servizio biglietteria/controllo ingressi | pág. 36, precedente |
| 17 | Locazioni impianti sportivi | pág. 36, precedente |
| 18 | Noleggi e locazioni varie | pág. 36, precedente |
| 19 | Locazioni immobiliari | pág. 36, precedente |
| 20 | a) salari e stipendi | pág. 7, precedente |
| 21 | b) oneri sociali | pág. 7, precedente |
| 22 | c) trattamento di fine rapporto | pág. 7, precedente |
| 23 | e) altri costi | pág. 7, precedente |
| 24 | Amm. Diritti pluriennali alle prestazioni dei calciatori | pág. 37, precedente |
| 25 | Amm. Costi capitalizzati vivaio | pág. 37, precedente |
| 26 | Amm. Altre Immobilizzazioni | pág. 37, precedente |
| 27 | Amm. Immobili strumentali | pág. 37, precedente |
| 28 | Amm. Impianti specifici | pág. 37, precedente |
| 29 | Amm. Automezzi e autovetture | pág. 37, precedente |
| 30 | Amm. Attrezzatura generica | pág. 37, precedente |
| 31 | Amm. Mobili macchine d'ufficio | pág. 37, precedente |
| 32 | Amm. Macchine d'ufficio elettroniche | pág. 37, precedente |
| 33 | Amm. Altri beni sociali | pág. 37, precedente |
| 34 | c) altre svalutazioni delle immobilizzazioni | pág. 7, precedente |
| 35 | d) svalutazione crediti compresi nell'attivo circolante e disp. liquide | pág. 7, precedente |
| 36 | 11) Variazioni rimanenze di materie prime, sussidiarie, di consumo e merci | pág. 7, precedente |
| 37 | 12) Accantonamenti per rischi | pág. 7, precedente |
| 38 | Spese varie organizzazioni gare | pág. 38, Jev 0.99 |
| 39 | Tasse iscrizione F.I.G.C. | pág. 38, Jev 0.97 |
| 40 | Ammende - multe gare | pág. 38, precedente |
| 41 | b) costi per acquisizione temporanea prestazioni calciatori | pág. 7, precedente |
| 42 | c) minusvalenze da cessione diritti pluriennali prestazioni calciatori | pág. 7, precedente |
| 43 | Premio di valorizzazione passivo | pág. 38, Jev 0.9 |
| 44 | Premio di rendimento passivo | pág. 38, Jev 0.96 |
| 45 | Oneri diversi campagna trasferimenti | pág. 38, Jev 0.98 |
| 46 | Premi di preparazione ex art. 96 N.O.I.F. | pág. 38, Jev 0.97 |
| 47 | Sell on fee passivo | pág. 38, Jev 0.92 |
| 48 | Omaggi | pág. 38, precedente |
| 49 | Imposte e tasse varie | pág. 38, precedente |
| 50 | Altri costi diversi di gestione | pág. 38, precedente |
| 51 | Perdite su crediti | pág. 38, precedente |
| 52 | Sopravvenienze passive | pág. 38, precedente |
| 53 | Percentuale squadre ospiti | pág. 38, precedente |
| 54 | Contributi Lega Calcio | pág. 38, precedente |

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
2022: cargado por tools/cargar.mjs (2026-10-10) desde Clubes/Italia/Atalanta/Atalanta-bilancio-consolidato-2022.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Italia/Atalanta/Atalanta-bilancio-consolidato-2022.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | a) ricavi da gare | pág. 8, precedente |
| 2 | b) abbonamenti | pág. 8, precedente |
| 3 | c) altri ricavi delle vendite e delle prestazioni | pág. 8, precedente |
| 4 | 4) Incrementi di immobilizzazioni per lavori interni | pág. 8, precedente |
| 5 | b) proventi da sponsorizzazioni | pág. 8, precedente |
| 6 | d) proventi commerciali e royalties | pág. 8, precedente |
| 7 | e) proventi da cessione diritti audiovisivi e non audiovisivi | pág. 8, precedente |
| 8 | f) ricavi da cessione temporanea prestazioni calciatori | pág. 8, precedente |
| 9 | g) plusvalenze da cessione diritti pluriennali prestazioni calciatori | pág. 8, precedente |
| 10 | - premi e/o indennizzi attivi ex art.103, comma 3, NOIF | pág. 8, precedente |
| 11 | - proventi diversi da trasferimento diritti calciatori | pág. 8, precedente |
| 12 | i) ricavi e proventi diversi | pág. 8, precedente |

### Gastos

```text
tools/cargar.mjs (2026-10-10)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Acquisto materiali vari e di consumo | pág. 36, precedente |
| 2 | Acquisto divise dipendenti | pág. 36, precedente |
| 3 | Acquisto materiale pubblicitario e promozionale | pág. 36, precedente |
| 4 | Acquisto medicinali | pág. 36, precedente |
| 5 | Sconti e abbuoni su acquisti | pág. 36, precedente |
| 6 | Compensi a terzi | pág. 36, precedente |
| 7 | Spese Pubblicitarie | pág. 36, precedente |
| 8 | Costi per attività sportiva | pág. 36, precedente |
| 9 | Spese Amministrative e generali serv. | pág. 36, precedente |
| 10 | Altri costi per servizi | pág. 36, precedente |
| 11 | Costi vitto - alloggio - locomozione gare | pág. 36, precedente |
| 12 | Servizio biglietteria/controllo ingressi | pág. 36, precedente |
| 13 | Manutenzioni e riparazioni | pág. 36, precedente |
| 14 | Costi per utenze | pág. 36, precedente |
| 15 | Assicurative e previdenziali | pág. 36, precedente |
| 16 | Costi specifici tecnici | pág. 36, precedente |
| 17 | Locazioni impianti sportivi | pág. 36, precedente |
| 18 | Noleggi e locazioni varie | pág. 36, precedente |
| 19 | Locazioni immobiliari | pág. 36, precedente |
| 20 | a) salari e stipendi | pág. 8, precedente |
| 21 | b) oneri sociali | pág. 8, precedente |
| 22 | c) trattamento di fine rapporto | pág. 8, precedente |
| 23 | e) altri costi | pág. 8, precedente |
| 24 | Amm. Diritti pluriennali alle prestazioni dei calciatori | pág. 38, precedente |
| 25 | Amm. Costi capitalizzati vivaio | pág. 38, precedente |
| 26 | Amm. Altre Immobilizzazioni | pág. 38, precedente |
| 27 | Amm. Immobili strumentali | pág. 38, precedente |
| 28 | Amm. Impianti specifici | pág. 38, precedente |
| 29 | Amm. Automezzi e autovetture | pág. 38, precedente |
| 30 | Amm. Attrezzatura generica | pág. 38, precedente |
| 31 | Amm. Mobili macchine d'ufficio | pág. 38, precedente |
| 32 | Amm. Macchine d'ufficio elettroniche | pág. 38, precedente |
| 33 | Amm. Altri beni sociali | pág. 38, precedente |
| 34 | c) altre svalutazioni delle immobilizzazioni | pág. 8, precedente |
| 35 | d) svalutazione crediti compresi nell'attivo circolante e disp. liquide | pág. 8, precedente |
| 36 | 11) Variazioni rimanenze di materie prime, sussidiarie, di consumo e merci | pág. 8, precedente |
| 37 | 12) Accantonamenti per rischi | pág. 8, precedente |
| 38 | Spese varie organizzazioni gare | pág. 39, Jev 0.99 |
| 39 | Tasse iscrizione F.I.G.C. | pág. 39, Jev 0.97 |
| 40 | Ammende - multe gare | pág. 39, precedente |
| 41 | b) costi per acquisizione temporanea prestazioni calciatori | pág. 8, precedente |
| 42 | c) minusvalenze da cessione diritti pluriennali prestazioni calciatori | pág. 8, precedente |
| 43 | - premi e/o indennizzi passivi ex art.103, comma 3, NOIF | pág. 8, precedente |
| 44 | Oneri diversi campagna trasferimenti | pág. 39, Jev 0.98 |
| 45 | Premi di preparazione ex art. 96 N.O.I.F. | pág. 39, Jev 0.97 |
| 46 | Sell on fee passivo | pág. 39, Jev 0.92 |
| 47 | Omaggi | pág. 39, precedente |
| 48 | Imposte e tasse varie | pág. 39, precedente |
| 49 | Altri costi diversi di gestione | pág. 39, precedente |
| 50 | Perdite su crediti | pág. 39, precedente |
| 51 | Sopravvenienze passive | pág. 39, precedente |
| 52 | Percentuale squadre ospiti | pág. 39, Jev 0.98 |
| 53 | Contributi Lega Calcio | pág. 39, precedente |

### Meta

```text
tools/cargar.mjs (2026-10-10). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
2022: tools/cargar.mjs 2026-10-08, verificado contra roster cacheado de "2021–22 Serie A" (tools/club-league-reference/it.json), coincidencia e
```

```text
2022: tools/cargar.mjs 2026-10-10, verificado contra roster cacheado de "2021–22 Serie A" (tools/club-league-reference/it.json), coincidencia e
```

## 2021

### Ingresos

```text
2021: cargado por tools/cargar.mjs (2026-10-07) desde Clubes/Italia/Atalanta/Atalanta-bilancio-consolidato-2021.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Italia/Atalanta/Atalanta-bilancio-consolidato-2021.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Altri ricavi delle vendite e prestazioni | pág. 34, precedente |
| 2 | Altri incassi per gare | pág. 34, precedente |
| 3 | Gare di campionato | pág. 34, Jev 0.93 |
| 4 | Gare di Coppe Internazionali | pág. 34, precedente |
| 5 | Gare amichevoli | pág. 34, Jev 0.96 |
| 6 | Gare di Coppa Italia | pág. 34, precedente |
| 7 | 4) Incrementi di immobilizzazioni per lavori interni | pág. 8, Jev 0.99 |
| 8 | Proventi televisivi | pág. 35, Jev 1 |
| 9 | Plusv. Cess. Dir. Plur. Prest. Calciatori | pág. 35, Jev 0.99 |
| 10 | Sponsorizzazioni | pág. 35, Jev 1 |
| 11 | Altri ricavi | pág. 35, Jev 0.95 |
| 12 | Contributi da Leghe e Enti Federali | pág. 35, Jev 0.96 |
| 13 | Proventi non audiovisivi | pág. 35, precedente |
| 14 | Calc. in prestito ad altre squadre prof. | pág. 35, precedente |
| 15 | Sopravvenienze attive | pág. 35, Jev 1 |
| 16 | Proventi cess licenze diritti e simili | pág. 35, precedente |
| 17 | Proventi per iscrizioni Football camp | pág. 35, Jev 0.9 |
| 18 | Proventi da enti assicurativi | pág. 35, Jev 1 |
| 19 | Proventi diversi settore giovanile | pág. 35, Jev 0.98 |
| 20 | Contributi c/impianto | pág. 35, Jev 0.99 |

### Gastos

```text
tools/cargar.mjs (2026-10-07)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Acquisto materiali vari e di consumo | pág. 36, precedente |
| 2 | Acquisto divise dipendenti | pág. 36, precedente |
| 3 | Acquisto materiale pubblicitario e promozionale | pág. 36, precedente |
| 4 | Acquisto medicinali | pág. 36, precedente |
| 5 | Sconti e abbuoni su acquisti | pág. 36, precedente |
| 6 | Compensi a terzi | pág. 36, Jev 1 |
| 7 | Costi per attività sportiva | pág. 36, precedente |
| 8 | Spese Amministrative e generali serv. | pág. 36, Jev 0.99 |
| 9 | Spese Pubblicitarie | pág. 36, Jev 1 |
| 10 | Altri costi per servizi | pág. 36, precedente |
| 11 | Manutenzioni e riparazioni | pág. 36, Jev 0.99 |
| 12 | Costi vitto - alloggio - locomozione gare | pág. 36, Jev 1 |
| 13 | Costi per utenze | pág. 36, Jev 0.98 |
| 14 | Assicurative e previdenziali | pág. 36, precedente |
| 15 | Spese varie organizzazioni gare | pág. 36, Jev 0.93 |
| 16 | Servizio biglietteria/controllo ingressi | pág. 36, Jev 1 |
| 17 | Costi specifici tecnici | pág. 36, precedente |
| 18 | Trasferimento temporaneo calciatori | pág. 37, precedente |
| 19 | Locazioni impianti sportivi | pág. 37, precedente |
| 20 | Noleggi e locazioni varie | pág. 37, Jev 0.97 |
| 21 | Locazioni immobiliari | pág. 37, Jev 0.93 |
| 22 | a) salari e stipendi | pág. 8, Jev 0.96 |
| 23 | b) oneri sociali | pág. 8, precedente |
| 24 | c) trattamento di fine rapporto | pág. 8, precedente |
| 25 | e) altri costi | pág. 8, precedente |
| 26 | Amm. Diritti pluriennali alle prestazioni dei calciatori | pág. 38, Jev 1 |
| 27 | Amm. Costi capitalizzati vivaio | pág. 38, precedente |
| 28 | Amm. Altre Immobilizzazioni | pág. 38, Jev 0.97 |
| 29 | Amm. Immobili strumentali | pág. 38, Jev 0.99 |
| 30 | Amm. Impianti specifici | pág. 38, Jev 0.98 |
| 31 | Amm. Automezzi e autovetture | pág. 38, Claude 0.9 |
| 32 | Amm. Altrezzatura generica | pág. 38, Jev 0.98 |
| 33 | Amm. Mobili macchine d'ufficio | pág. 38, Jev 0.91 |
| 34 | Amm. Macchine d'ufficio elettroniche | pág. 38, Claude 0.9 |
| 35 | Amm. Altri beni sociali | pág. 38, Jev 0.98 |
| 36 | c) altre svalutazioni delle immobilizzazioni | pág. 8, precedente |
| 37 | d) svalutazione crediti compresi nell'attivo circolante e disp. liquide | pág. 8, Jev 0.97 |
| 38 | 11) Variazioni rimanenze di materie prime, sussidiarie, di consumo e merci | pág. 8, Jev 1 |
| 39 | 12) Accantonamenti per rischi | pág. 8, precedente |
| 40 | Minusvalenze cess dir plur prest calciatori | pág. 39, precedente |
| 41 | Oneri diversi da campagna trasferimenti | pág. 39, Jev 0.91 |
| 42 | Valorizzazioni passive | pág. 39, precedente |
| 43 | Altri costi diversi di gestione | pág. 39, Jev 0.93 |
| 44 | Imposte e tasse varie | pág. 39, Jev 0.96 |
| 45 | Contributi Lega Calcio | pág. 39, precedente |
| 46 | Sopravvenienze passive | pág. 39, precedente |
| 47 | Ammende - multe gare | pág. 39, Jev 1 |
| 48 | Minusvalenze alienazione imm materiali | pág. 39, precedente |
| 49 | Perdite su crediti | pág. 39, Jev 1 |
| 50 | Abbuoni e arrotondamenti passivi | pág. 39, precedente |

### Meta

```text
tools/cargar.mjs (2026-10-07). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

## 2020

### Ingresos

```text
2020: cargado por tools/cargar.mjs (2026-10-08) desde Clubes/Italia/Atalanta/Atalanta-bilancio-consolidato-2020.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Italia/Atalanta/Atalanta-bilancio-consolidato-2020.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Abbonamenti | pág. 35, precedente |
| 2 | Altri ricavi delle vendite e prestazioni | pág. 35, precedente |
| 3 | Gare di Coppa Italia | pág. 35, precedente |
| 4 | Gare di campionato | pág. 35, precedente |
| 5 | Altri incassi per gare | pág. 35, precedente |
| 6 | 4) Incrementi di immobilizzazioni per lavori interni | pág. 9, precedente |
| 7 | Proventi televisivi | pág. 36, precedente |
| 8 | Plusv. Cess. Dir. Plur. Prest. Calciatori | pág. 36, precedente |
| 9 | Sponsorizzazioni | pág. 36, precedente |
| 10 | Altri ricavi | pág. 36, precedente |
| 11 | Calc. in prestito ad altre squadre prof. | pág. 36, precedente |
| 12 | Proventi non audiovisivi | pág. 36, precedente |
| 13 | Contributi da Leghe e Enti Federali | pág. 36, precedente |
| 14 | Sopravvenienze attive | pág. 36, precedente |
| 15 | Proventi per iscrizioni Football camp | pág. 36, precedente |
| 16 | Proventi da enti assicurativi | pág. 36, precedente |
| 17 | Altri proventi su trasf. Calciatori | pág. 36, Jev 0.98 |
| 18 | Proventi cess licenze diritti e simili | pág. 36, precedente |
| 19 | Proventi diversi settore giovanile | pág. 36, precedente |
| 20 | Contributi c/impianto | pág. 36, precedente |

### Gastos

```text
tools/cargar.mjs (2026-10-08)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Acquisto materiali vari e di consumo | pág. 37, precedente |
| 2 | Acquisto divise dipendenti | pág. 37, precedente |
| 3 | Acquisto materiale pubblicitario e promozionale | pág. 37, precedente |
| 4 | Acquisto medicinali | pág. 37, precedente |
| 5 | Sconti e abbuoni su acquisti | pág. 37, precedente |
| 6 | Compensi a terzi | pág. 37, precedente |
| 7 | Spese Pubblicitarie | pág. 37, precedente |
| 8 | Costi per attività sportiva | pág. 37, precedente |
| 9 | Spese Amministrative e generali | pág. 37, Jev 1 |
| 10 | Altri costi per servizi | pág. 37, precedente |
| 11 | Costi vitto - alloggio - locomozione gare | pág. 37, precedente |
| 12 | Servizio biglietteria/controllo ingressi | pág. 37, precedente |
| 13 | Spese varie organizzazioni gare | pág. 37, precedente |
| 14 | Manutenzioni e riparazioni | pág. 37, precedente |
| 15 | Costi per utenze | pág. 37, precedente |
| 16 | Assicurative e previdenziali | pág. 37, precedente |
| 17 | Costi specifici tecnici | pág. 37, precedente |
| 18 | Trasferimento temporaneo calciatori | pág. 38, precedente |
| 19 | Locazioni impianti sportivi | pág. 38, precedente |
| 20 | Noleggi e locazioni varie | pág. 38, precedente |
| 21 | Locazioni immobiliari | pág. 38, precedente |
| 22 | a) salari e stipendi | pág. 9, precedente |
| 23 | b) oneri sociali | pág. 9, precedente |
| 24 | c) trattamento di fine rapporto | pág. 9, precedente |
| 25 | e) altri costi | pág. 9, precedente |
| 26 | Amm. Diritti pluriennali alle prestazioni dei calciatori | pág. 39, precedente |
| 27 | Amm. Costi capitalizzati vivaio | pág. 39, precedente |
| 28 | Amm. Altre Immobilizzazioni | pág. 39, precedente |
| 29 | b) ammortamento delle immobilizzazioni materiali | pág. 9, Jev 1 |
| 30 | c) altre svalutazioni delle immobilizzazioni | pág. 9, precedente |
| 31 | d) svalutazione crediti compresi nell'attivo circolante e disp. liquide | pág. 9, precedente |
| 32 | 11) Variazioni rimanenze di materie prime, sussidiarie, di consumo e merci | pág. 9, precedente |
| 33 | 12) Accantonamenti per rischi | pág. 9, precedente |
| 34 | Altri costi diversi di gestione | pág. 40, precedente |
| 35 | Minusvalenze cess dir plur prest calciatori | pág. 40, precedente |
| 36 | Oneri bancari | pág. 40, ? 0.6 |
| 37 | Contributi Lega Calcio | pág. 40, precedente |
| 38 | Imposte e tasse varie | pág. 40, precedente |
| 39 | Ammende - multe gare | pág. 40, precedente |
| 40 | Sopravvenienze passive | pág. 40, precedente |
| 41 | Perdite su crediti | pág. 40, precedente |
| 42 | Abbuoni e arrotondamenti passivi | pág. 40, precedente |

### Meta

```text
tools/cargar.mjs (2026-10-08). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
2020: tools/cargar.mjs 2026-10-08, verificado contra roster cacheado de "2020–21 Serie A" (tools/club-league-reference/it.json), coincidencia e
```

## 2019

### Ingresos

```text
2019: cargado por tools/cargar.mjs (2026-10-08) desde Clubes/Italia/Atalanta/Atalanta-bilancio-consolidato-2019.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Italia/Atalanta/Atalanta-bilancio-consolidato-2019.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | 1) Ricavi delle vendite e delle prestazioni | pág. 9, precedente |
| 2 | 2) Variazioni delle rimanenze di prodotti in corso di lavorazione, semilavorati e finiti | pág. 9, Jev 0.99 |
| 3 | 3) variazioni di lavori in corso su ordinazione | pág. 9, Jev 0.99 |
| 4 | 4) Incrementi di immobilizzazioni per lavori interni | pág. 9, precedente |
| 5 | Proventi televisivi | pág. 36, precedente |
| 6 | Plusv. Cess. Dir. Plur. Prest. Calciatori | pág. 36, precedente |
| 7 | Sponsorizzazioni | pág. 36, precedente |
| 8 | Altri ricavi | pág. 36, precedente |
| 9 | Calc. in prestito ad altre squadre prof. | pág. 36, precedente |
| 10 | Proventi non audiovisivi | pág. 36, precedente |
| 11 | Contributi da Leghe e Enti Federali | pág. 36, precedente |
| 12 | Sopravvenienze attive | pág. 36, precedente |
| 13 | Proventi per iscrizioni Football camp | pág. 36, precedente |
| 14 | Proventi cess licenze diritti e simili | pág. 36, precedente |
| 15 | Proventi da enti assicurativi | pág. 36, precedente |
| 16 | Altri proventi su trasf. Calciatori | pág. 36, precedente |
| 17 | Proventi diversi settore giovanile | pág. 36, precedente |
| 18 | Rimborso spese e ricavi Stadio | pág. 36, ? 0.6 |

### Gastos

```text
tools/cargar.mjs (2026-10-08)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Acquisto materiali vari e di consumo | pág. 37, precedente |
| 2 | Acquisto divise dipendenti | pág. 37, precedente |
| 3 | Acquisto materiale pubblicitario e promozionale | pág. 37, precedente |
| 4 | Acquisto materiale sportivo | pág. 37, Jev 0.98 |
| 5 | Acquisto medicinali | pág. 37, precedente |
| 6 | Sconti e abbuoni su acquisti | pág. 37, precedente |
| 7 | Compensi a terzi | pág. 37, precedente |
| 8 | Spese Pubblicitarie | pág. 37, precedente |
| 9 | Costi per attività sportiva | pág. 37, precedente |
| 10 | Spese Amministrative e generali serv. | pág. 37, precedente |
| 11 | Altri costi per servizi | pág. 37, precedente |
| 12 | Costi vitto - alloggio - locomozione gare | pág. 37, precedente |
| 13 | Servizio biglietteria/controllo ingressi | pág. 37, precedente |
| 14 | Spese varie organizzazioni gare | pág. 37, precedente |
| 15 | Manutenzioni e riparazioni | pág. 37, precedente |
| 16 | Costi per utenze | pág. 37, precedente |
| 17 | Assicurative e previdenziali | pág. 37, precedente |
| 18 | Costi specifici tecnici | pág. 37, precedente |
| 19 | Trasferimento temporaneo calciatori | pág. 38, precedente |
| 20 | Locazioni impianti sportivi | pág. 38, precedente |
| 21 | Noleggi e locazioni varie | pág. 38, precedente |
| 22 | Locazioni immobiliari | pág. 38, precedente |
| 23 | Canoni Leasing | pág. 38, Jev 0.97 |
| 24 | a) salari e stipendi | pág. 9, precedente |
| 25 | b) oneri sociali | pág. 9, precedente |
| 26 | c) trattamento di fine rapporto | pág. 9, precedente |
| 27 | d) trattamento di quiescenza e simili | pág. 9, Jev 0.98 |
| 28 | e) altri costi | pág. 9, precedente |
| 29 | Amm. Diritti pluriennali alle prestazioni dei calciatori | pág. 39, precedente |
| 30 | Amm. Costi capitalizzati vivaio | pág. 39, precedente |
| 31 | Amm. Altre Immobilizzazioni | pág. 39, precedente |
| 32 | Amm. Immobili strumentali | pág. 39, precedente |
| 33 | Amm. Impianti specifici | pág. 39, precedente |
| 34 | Amm. Macchine d'ufficio elettroniche | pág. 39, precedente |
| 35 | Amm. Mobili macchine d'ufficio | pág. 39, precedente |
| 36 | Amm. Altri beni sociali | pág. 39, precedente |
| 37 | Amm. Attrezzatura generica | pág. 39, precedente |
| 38 | c) altre svalutazioni delle immobilizzazioni | pág. 9, precedente |
| 39 | d) svalutazione crediti compresi nell'attivo circolante e disp. liquide | pág. 9, precedente |
| 40 | 11) Variazioni rimanenze di materie prime, sussidiarie, di consumo e merci | pág. 9, precedente |
| 41 | 12) Accantonamenti per rischi ed oneri | pág. 9, Claude 0.9 |
| 42 | 13) Altri accantonamenti | pág. 9, Claude 0.85 |
| 43 | Altri costi diversi di gestione | pág. 40, precedente |
| 44 | Sopravvenienze passive | pág. 40, precedente |
| 45 | Imposte e tasse varie | pág. 40, precedente |
| 46 | Contributi Lega Calcio | pág. 40, precedente |
| 47 | Minusvalenze cess dir plur prest calciatori | pág. 40, precedente |
| 48 | Percentuale squadre ospiti | pág. 40, precedente |
| 49 | Ammende - multe gare | pág. 40, precedente |
| 50 | Perdite su crediti | pág. 40, precedente |
| 51 | Abbuoni e arrotondamenti passivi | pág. 40, precedente |

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
2018: cargado por tools/cargar.mjs (2026-10-08) desde Clubes/Italia/Atalanta/Atalanta-bilancio-consolidato-2018.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Italia/Atalanta/Atalanta-bilancio-consolidato-2018.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Abbonamenti | pág. 36, precedente |
| 2 | Gare di campionato | pág. 36, precedente |
| 3 | Altri ricavi delle vendite e prestazioni | pág. 36, precedente |
| 4 | Gare di Coppe Internazionali | pág. 36, precedente |
| 5 | Gare di Coppa Italia | pág. 36, precedente |
| 6 | Altri incassi per gare | pág. 36, precedente |
| 7 | Gare amichevoli | pág. 36, precedente |
| 8 | 2) Variazioni delle rimanenze di prodotti in corso di lavorazione, semilavorati e finiti | pág. 11, precedente |
| 9 | 3) variazioni di lavori in corso su ordinazione | pág. 11, precedente |
| 10 | 4) Incrementi di immobilizzazioni per lavori interni | pág. 11, precedente |
| 11 | Proventi televisivi | pág. 37, precedente |
| 12 | Altri ricavi | pág. 37, precedente |
| 13 | Plusv. Cess. Dir. Plur. Prest. Calciatori | pág. 37, precedente |
| 14 | Sponsorizzazioni | pág. 37, precedente |
| 15 | Calc. in prestito ad altre squadre prof. | pág. 37, precedente |
| 16 | Proventi da partecipazione all'Europa League | pág. 37, Jev 1 |
| 17 | Proventi non audiovisivi | pág. 37, precedente |
| 18 | Contributi da Leghe e Enti Federali | pág. 37, precedente |
| 19 | Sopravvenienze attive | pág. 37, precedente |
| 20 | Proventi per iscrizioni Football camp | pág. 37, precedente |
| 21 | Altri proventi su trasf. Calciatori | pág. 37, precedente |
| 22 | Proventi cess licenze diritti e simili | pág. 37, precedente |
| 23 | Proventi diversi settore giovanile | pág. 37, precedente |
| 24 | Proventi da enti assicurativi | pág. 37, precedente |
| 25 | Rimborso spese e ricavi Stadio | pág. 37, precedente |

### Gastos

```text
tools/cargar.mjs (2026-10-08)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | 6) per materie prime, sussidiarie, di consumo e merci | pág. 11, precedente |
| 2 | Compensi a terzi | pág. 38, precedente |
| 3 | Costi per attività sportiva | pág. 38, precedente |
| 4 | Spese Pubblicitarie | pág. 38, precedente |
| 5 | Altri costi per servizi | pág. 38, precedente |
| 6 | Spese Amministrative e generali serv. | pág. 38, precedente |
| 7 | Costi vitto - alloggio - locomozione gare | pág. 38, precedente |
| 8 | Manutenzioni e riparazioni | pág. 38, precedente |
| 9 | Spese varie organizzazioni gare | pág. 38, precedente |
| 10 | Assicurative e previdenziali | pág. 38, precedente |
| 11 | Servizio biglietteria/controllo ingressi | pág. 38, precedente |
| 12 | Costi per utenze | pág. 38, precedente |
| 13 | Costi specifici tecnici | pág. 38, precedente |
| 14 | Trasferimento temporaneo calciatori | pág. 39, precedente |
| 15 | Noleggi e locazioni varie | pág. 39, precedente |
| 16 | Locazioni impianti sportivi | pág. 39, precedente |
| 17 | Locazioni immobiliari | pág. 39, precedente |
| 18 | Canoni Leasing | pág. 39, precedente |
| 19 | a) salari e stipendi | pág. 11, precedente |
| 20 | b) oneri sociali | pág. 11, precedente |
| 21 | c) trattamento di fine rapporto | pág. 11, precedente |
| 22 | d) trattamento di quiescenza e simili | pág. 11, precedente |
| 23 | e) altri costi | pág. 11, precedente |
| 24 | Amm. Diritti pluriennali alle prestazioni dei calciatori | pág. 40, precedente |
| 25 | Amm. Costi capitalizzati vivaio | pág. 40, precedente |
| 26 | Amm. Altre Immobilizzazioni | pág. 40, precedente |
| 27 | b) ammortamento delle immobilizzazioni materiali | pág. 11, precedente |
| 28 | c) altre svalutazioni delle immobilizzazioni | pág. 11, precedente |
| 29 | d) svalutazione crediti compresi nell'attivo circolante e disp. liquide | pág. 11, precedente |
| 30 | 11) Variazioni rimanenze di materie prime, sussidiarie, di consumo e merci | pág. 11, precedente |
| 31 | 12) Accantonamenti per rischi ed oneri | pág. 11, precedente |
| 32 | 13) Altri accantonamenti | pág. 11, precedente |
| 33 | 14) Oneri diversi di gestione | pág. 11, Jev 0.93 |

### Meta

```text
tools/cargar.mjs (2026-10-08). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
2018: tools/cargar.mjs 2026-10-08, verificado contra roster cacheado de "2018–19 Serie A" (tools/club-league-reference/it.json), coincidencia e
```

## Gestiones

_antes de Antonio Percassi (data/gestiones/it.js):_

```text
Percassi: "presidente dal 2010" (solo el año; 01/01 por convención). Desde 2022 hay un copresidente (Stephen Pagliuca, cordata
estadounidense), pero Percassi sigue de presidente y principal accionista individual: no se parte la gestión.
```

## Fuentes

### (general)

```text
Fuentes de cada ejercicio: las agrega tools/cargar.mjs adentro de este bloque (Versión 379: hasta la 378 el esqueleto no lo traía y la
primera carga de un club dado de alta por script se revertía, "no encontré Object.assign(sources, {"; caso: Fortaleza CEIF).
```

### atalanta-it-bilancio-consolidato-2021

_note (data/):_

```text
Cargado por tools/cargar.mjs (2026-10-07) desde la transcripción Clubes/Italia/Atalanta/Atalanta-bilancio-consolidato-2021.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.
```

### atalanta-it-bilancio-consolidato-2024

_note (data/):_

```text
Cargado por tools/cargar.mjs (2026-10-07) desde la transcripción Clubes/Italia/Atalanta/Atalanta-bilancio-consolidato-2024.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.
```

### atalanta-it-bilancio-consolidato-2020

_note (data/):_

```text
Cargado por tools/cargar.mjs (2026-10-08) desde la transcripción Clubes/Italia/Atalanta/Atalanta-bilancio-consolidato-2020.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.
```

### atalanta-it-bilancio-consolidato-2025

_note (data/):_

```text
Cargado por tools/cargar.mjs (2026-10-08) desde la transcripción Clubes/Italia/Atalanta/Atalanta-bilancio-consolidato-2025.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.
```

### atalanta-it-bilancio-consolidato-2019

_note (data/):_

```text
Cargado por tools/cargar.mjs (2026-10-08) desde la transcripción Clubes/Italia/Atalanta/Atalanta-bilancio-consolidato-2019.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.
```

### atalanta-it-bilancio-consolidato-2018

_note (data/):_

```text
Cargado por tools/cargar.mjs (2026-10-08) desde la transcripción Clubes/Italia/Atalanta/Atalanta-bilancio-consolidato-2018.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.
```

### atalanta-it-bilancio-consolidato-2023

_note (data/):_

```text
Cargado por tools/cargar.mjs (2026-10-08) desde la transcripción Clubes/Italia/Atalanta/Atalanta-bilancio-consolidato-2023.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.
```

### atalanta-it-bilancio-consolidato-2022

_note (data/):_

```text
Cargado por tools/cargar.mjs (2026-10-10) desde la transcripción Clubes/Italia/Atalanta/Atalanta-bilancio-consolidato-2022.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.
```
