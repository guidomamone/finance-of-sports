# hellasverona-it — evidencia de carga

Lo que había como comentario en `data/hellasverona-it-data.js`, movido tal cual por `tools/mover-comentarios-data.mjs` (la regla:
`Admin/CONVENCIONES-DATOS.md`, "data/<club>-data.js NO LLEVA COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y
meta. Las notas de cada fila van en una tabla con su número de fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
============================================================================
data/hellasverona-it-data.js — Hellas Verona Football Club S.p.A. (Italia).
ALTA POR SCRIPT (tools/alta-club.mjs, 2026-10-07), SIN EJERCICIOS CARGADOS TODAVÍA:
las estructuras de abajo están vacías a propósito. Los rubros, los totales
oficiales y el resto del fiscalYearMeta los agrega la etapa de carga
(tools/proponer-carga.mjs / sesión de onboarding), que es también la que
reemplaza esta cabecera por la de siempre (fuente, perímetro, categorización).

Documento que originó el alta: Clubes/Italia/Hellas Verona/Hellas-Verona-bilancio-individuale-2020.pdf

De dónde salió cada campo (estado según alta-club.mjs: ok / pendiente):
  id                 ok        "hellasverona-it" — slug de "Hellas Verona" + '-it' (convención de clubId, Admin/CONVENCIONES.md Versión 129)
  name               ok        "Hellas Verona Football Club S.p.A." — el .md, 9 veces (nombre del club + forma societaria)
  displayName        ok        "Hellas Verona" — nombre de la carpeta del club en Clubes/
  country            ok        "IT" — carpeta de país "Italia" (tabla PAISES)
  reportingCurrency  ok        "EUR" — moneda de curso legal de Italia
  fiscalYearStart    ok        "07-01" — cierre del ejercicio: contenido del .md (86 de 87 fechas de fin de mes caen en el mes 6)
  sport              ok        "futbol" — el .md nombra el fútbol 11 veces y ningún otro deporte más que eso
  brandColor         pendiente (ausente) — tools/brand-color-reference/ (footylogos): [italia] hellas verona: #FFD100 Yellow
  anio               ok        2020 — nombre del archivo (misma regla que onboard.mjs --quien), confirmado por las fechas de cierre del .md
  cierre             ok        "2020-06-30" — año del ejercicio + mes de cierre (contenido del .md (86 de 87 fechas de fin de mes caen en el mes 6))
  reportType         ok        "official_balance_sheet" — el .md tiene un estado contable (resultados / balance) y el nombre del archivo no sugiere otro tipo
  perimetro          ok        "individual" — el nombre del archivo dice que son los estados individuales ("Hellas-Verona-bilancio-individuale-2020.pdf"), y no hay un consolidado del mismo ejercic
  currency           ok        "EUR" — moneda de curso legal de Italia (tabla PAISES de alta-club.mjs)
  fxRef              ok        "EUR@2020-06-30" — el documento no declara tipo de cambio; FX_CLOSE ya tiene EUR@2020-06-30 = 0.893 (Cierre BCE al 30/6/2020 (1 EUR = 1,1198 USD))
  sourceId           ok        "hellasverona-it-bilancio-individuale-2020" — clubId + nombre del archivo en slug
  liga               ok        "it-seriea" — roster cacheado de "2019–20 Serie A" (tools/club-league-reference/it.json), coincidencia exacta "Hellas Verona"

FISCAL YEAR META PROPUESTO para 2020 (NO registrado: un ejercicio con meta y
sin rubros se vería en el sitio como un año en cero, y "sin dato no es cero"):
  2020: {"reportType":"official_balance_sheet","currency":"EUR","fxRef":"EUR@2020-06-30","sourceId":"hellasverona-it-bilancio-individuale-2020"}
============================================================================
```

_de data/clubs.js:_

```text
Hellas Verona: alta por tools/alta-club.mjs (2026-10-07) desde Clubes/Italia/Hellas Verona/Hellas-Verona-bilancio-individuale-2020.pdf.
brandColor y su procedencia: fuentes/Italia/Hellas Verona.md.
```

_de data/club-leagues/it.js:_

```text
Hellas Verona (alta-club.mjs, 2026-10-07): verificado contra roster cacheado de "2019–20 Serie A" (tools/club-league-reference/it.json), coincidencia exacta "Hellas Verona".
```

## 2025

### Ingresos

```text
2025: cargado por tools/cargar.mjs (2026-10-08) desde Clubes/Italia/Hellas Verona/Hellas-Verona-bilancio-individuale-2025.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Italia/Hellas Verona/Hellas-Verona-bilancio-individuale-2025.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Ricavi da gare | pág. 7, precedente |
| 2 | Abbonamenti | pág. 7, precedente |
| 3 | Corrispettivi Store | pág. 7, precedente |
| 4 | Contributi in conto esercizio | pág. 7, precedente |
| 5 | Proventi da sponsorizzazioni | pág. 7, precedente |
| 6 | Proventi commerciali e royalties | pág. 7, precedente |
| 7 | Proventi da cessioni diritti audiovisivi | pág. 7, precedente |
| 8 | Ricavi da cessione temporanea prestazioni calciatori | pág. 7, precedente |
| 9 | Plusvalenze da cessione pluriennale diritti calciatori | pág. 7, precedente |
| 10 | Altri proventi da trasferimento calciatori | pág. 7, precedente |
| 11 | Ricavi e proventi diversi | pág. 7, precedente |

### Gastos

```text
tools/cargar.mjs (2026-10-08)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Per materie prime, sussidiarie, di consumo e di merci | pág. 7, precedente |
| 2 | Per servizi | pág. 7, Jev 1 |
| 3 | Per godimento di beni di terzi | pág. 7, precedente |
| 4 | Salari e stipendi | pág. 7, precedente |
| 5 | Oneri sociali | pág. 7, precedente |
| 6 | Trattamento di fine rapporto | pág. 7, precedente |
| 7 | altri costi | pág. 7, precedente |
| 8 | Ammortamento delle immobilizzazioni immateriali | pág. 7, Claude 0.93 |
| 9 | Ammortamento delle immobilizzazioni materiali | pág. 7, Jev 1 |
| 10 | Atre svalutazioni delle immobilizzazioni | pág. 7, precedente |
| 11 | Svalutazioni cred. incl. nell'attivo circolante | pág. 7, precedente |
| 12 | Variazioni delle rimanenze di materie prime, sussidiarie, di consumo e merci | pág. 7, precedente |
| 13 | Oneri da organizzazione competizioni | pág. 7, precedente |
| 14 | Costi per acquisizione temporanea prestazioni calciatori | pág. 7, precedente |
| 15 | Minusvalenze da cessione diritti prestazioni calciatori | pág. 7, precedente |
| 16 | Altri oneri da trasferimento diritti calciatori | pág. 7, Jev 0.99 |
| 17 | Altri oneri diversi di gestione | pág. 7, Jev 0.98 |
| 18 | Svalutazioni a) di partecipazioni | pág. 8, Jev 0.99 |

### Meta

```text
tools/cargar.mjs (2026-10-08). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
2025: tools/cargar.mjs 2026-10-08, verificado contra roster cacheado de "2024–25 Serie A" (tools/club-league-reference/it.json), coincidencia e
```

## 2024

### Ingresos

```text
2024: cargado por tools/cargar.mjs (2026-10-08) desde Clubes/Italia/Hellas Verona/Hellas-Verona-bilancio-individuale-2024.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Italia/Hellas Verona/Hellas-Verona-bilancio-individuale-2024.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Ricavi da gare | pág. 7, precedente |
| 2 | Abbonamenti | pág. 7, precedente |
| 3 | Corrispettivi Store | pág. 7, precedente |
| 4 | Contributi in conto esercizio | pág. 7, precedente |
| 5 | Proventi da sponsorizzazioni | pág. 7, precedente |
| 6 | Proventi pubblicitari | pág. 7, precedente |
| 7 | Proventi commerciali e royalties | pág. 7, precedente |
| 8 | Proventi da cessioni diritti audiovisivi | pág. 7, precedente |
| 9 | Ricavi da cessione temporanea prestazioni calciatori | pág. 7, precedente |
| 10 | Plusvalenze da cessione pluriennale diritti calciatori | pág. 7, precedente |
| 11 | di cui premi e/o indennizzi attivi ex art.103, c.3, NOIF | pág. 7, precedente |
| 12 | di cui proventi diversi da trasferimento calciatori | pág. 7, precedente |
| 13 | Ricavi e proventi diversi | pág. 7, precedente |

### Gastos

```text
tools/cargar.mjs (2026-10-08)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Per materie prime, sussidiarie, di consumo e di merci | pág. 7, precedente |
| 2 | Costi per tesserati | pág. 45, precedente |
| 3 | Costi per attività sportiva | pág. 45, precedente |
| 4 | Costi specifici tecnici | pág. 45, precedente |
| 5 | Costi vitto, alloggio, locomozione gare | pág. 45, precedente |
| 6 | Servizio biglietteria e controllo ingressi | pág. 45, precedente |
| 7 | Assicurative e previdenziali | pág. 45, precedente |
| 8 | Amministrative, pubblicitarie e generali | pág. 45, precedente |
| 9 | Affitto campi sportivi | pág. 46, precedente |
| 10 | Affitto impianti sportivi | pág. 46, precedente |
| 11 | Costi di noleggio | pág. 46, precedente |
| 12 | Canoni affitto altri locali | pág. 46, precedente |
| 13 | Altre spese su beni di terzi | pág. 46, precedente |
| 14 | Locazioni finanziarie | pág. 46, precedente |
| 15 | Salari e stipendi | pág. 7, precedente |
| 16 | Oneri sociali | pág. 7, precedente |
| 17 | Trattamento di fine rapporto | pág. 7, precedente |
| 18 | altri costi | pág. 7, precedente |
| 19 | Ammortamento delle immobilizzazioni immateriali | pág. 7, Claude 0.93 |
| 20 | Ammortamento delle immobilizzazioni materiali | pág. 7, Jev 1 |
| 21 | Atre svalutazioni delle immobilizzazioni | pág. 7, precedente |
| 22 | Svalutazioni cred. incl. nell'attivo circolante | pág. 7, precedente |
| 23 | Variazioni delle rimanenze di materie prime, sussidiarie, di consumo e merci | pág. 7, precedente |
| 24 | Accantonamenti per rischi | pág. 7, precedente |
| 25 | Altri accantonamenti | pág. 7, precedente |
| 26 | Oneri da organizzazione competizioni | pág. 7, precedente |
| 27 | Costi per acquisizione temporanea prestazioni calciatori | pág. 7, precedente |
| 28 | Minusvalenze da cessione diritti prestazioni calciatori | pág. 7, precedente |
| 29 | di cui premi e/o indennizzi attivi ex art.103, c.3, NOIF | pág. 7, precedente |
| 30 | Sell On/mandati trasferimenti | pág. 49, Jev 0.9 |
| 31 | Costi per acquisizione vivaio | pág. 49, precedente |
| 32 | Costi di valorizzazione calciatori | pág. 49, precedente |
| 33 | Contributi di solidarietà | pág. 49, Jev 0.97 |
| 34 | Altri costi di preparazione, addestramento, formazione | pág. 49, precedente |
| 35 | - Ammende e multe gara | pág. 48, precedente |
| 36 | - Devoluzione e Servizi Lega | pág. 48, precedente |
| 37 | - Oneri precedenti esercizi e sopravvenienze passive | pág. 48, precedente |
| 38 | - Altre spese | pág. 48, precedente |

### Meta

```text
tools/cargar.mjs (2026-10-08). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
2024: tools/cargar.mjs 2026-10-08, verificado contra roster cacheado de "2023–24 Serie A" (tools/club-league-reference/it.json), coincidencia e
```

## 2023

### Ingresos

```text
2023: cargado por tools/cargar.mjs (2026-10-08) desde Clubes/Italia/Hellas Verona/Hellas-Verona-bilancio-individuale-2023.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Italia/Hellas Verona/Hellas-Verona-bilancio-individuale-2023.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | a) Ricavi da gare | pág. 7, Jev 1 |
| 2 | b) Abbonamenti | pág. 7, precedente |
| 3 | c) Corrispettivi Store | pág. 7, precedente |
| 4 | a) Contributi in conto esercizio | pág. 7, precedente |
| 5 | b) Proventi da sponsorizzazioni | pág. 7, Jev 1 |
| 6 | c) Proventi pubblicitari | pág. 7, Jev 1 |
| 7 | d) Proventi commerciali e royalties | pág. 7, Jev 1 |
| 8 | e) Proventi da cessioni diritti audiovisivi | pág. 7, Jev 1 |
| 9 | f) Ricavi da cessione temporanea prestazioni calciatori | pág. 7, Jev 0.98 |
| 10 | g) Plusvalenze da cessione pluriennale diritti calciatori | pág. 7, Jev 1 |
| 11 | di cui premi e/o indennizzi attivi ex art.103, c.3, NOIF | pág. 7, precedente |
| 12 | di cui proventi diversi da trasferimento calciatori | pág. 7, Jev 0.9 |
| 13 | i) Ricavi e proventi diversi | pág. 7, Jev 1 |

### Gastos

```text
tools/cargar.mjs (2026-10-08)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | 6) Per materie prime, sussidiarie, di consumo e di merci | pág. 7, precedente |
| 2 | Costi per tesserati | pág. 45, precedente |
| 3 | Costi per attività sportiva | pág. 45, precedente |
| 4 | Costi specifici tecnici | pág. 45, Jev 0.91 |
| 5 | Costi vitto, alloggio, locomozione gare | pág. 45, Jev 1 |
| 6 | Servizio biglietteria e controllo ingressi | pág. 45, Jev 1 |
| 7 | Assicurative e previdenziali | pág. 45, precedente |
| 8 | Amministrative, pubblicitarie e generali | pág. 45, Jev 1 |
| 9 | Affitto campi sportivi | pág. 46, precedente |
| 10 | Affitto impianti sportivi | pág. 46, precedente |
| 11 | Costi di noleggio | pág. 46, Claude 0.9 |
| 12 | Canoni affitto altri locali | pág. 46, precedente |
| 13 | Altre spese su beni di terzi | pág. 46, precedente |
| 14 | Locazioni finanziarie | pág. 46, precedente |
| 15 | a) Salari e stipendi | pág. 7, precedente |
| 16 | b) Oneri sociali | pág. 7, precedente |
| 17 | c) Trattamento di fine rapporto | pág. 7, precedente |
| 18 | d) altri costi | pág. 7, precedente |
| 19 | a) Ammortamento delle immobilizzazioni immateriali | pág. 7, precedente |
| 20 | b) Ammortamento delle immobilizzazioni materiali | pág. 7, precedente |
| 21 | d) Svalutazioni cred. incl. nell'attivo circolante | pág. 7, precedente |
| 22 | a) Oneri da organizzazione competizioni | pág. 7, Jev 1 |
| 23 | b) Costi per acquisizione temporanea prestazioni calciatori | pág. 7, precedente |
| 24 | c) Minusvalenze da cessione diritti prestazioni calciatori | pág. 7, precedente |
| 25 | di cui premi e/o indennizzi attivi ex art.103, c.3, NOIF | pág. 7, precedente |
| 26 | di cui costi diversi da trasferimento calciatori | pág. 7, Jev 0.99 |
| 27 | - Ammende e multe gara | pág. 48, precedente |
| 28 | - Devoluzione e Servizi Lega | pág. 48, Jev 0.96 |
| 29 | - Oneri precedenti esercizi e sopravvenienze passive | pág. 48, Jev 0.97 |
| 30 | - Altre spese | pág. 48, precedente |
| 31 | 12) Accantonamenti per rischi | pág. 7, precedente |
| 32 | 11) Variazioni delle rimanenze (a favor) | pág. 7, Jev 0.99 |

### Meta

```text
2023: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-08): fila = 8.217.240. fila fuera del índice de localizar (cola 8c6bea8)
2023: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-08): fila = (25.971). idem; costo negativo
2023: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-08): fila = 4.720. sección C fuera del índice
2023: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-08): fila = (4.520.228). idem
2023: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-08): fila = (10.210). idem
tools/cargar.mjs (2026-10-08). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
2023: tools/cargar.mjs 2026-10-08, verificado contra roster cacheado de "2022–23 Serie A" (tools/club-league-reference/it.json), coincidencia e
```

## 2022

### Ingresos

```text
2022: cargado por tools/cargar.mjs (2026-10-08) desde Clubes/Italia/Hellas Verona/Hellas-Verona-bilancio-individuale-2022.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Italia/Hellas Verona/Hellas-Verona-bilancio-individuale-2022.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Ricavi da gare | pág. 7, precedente |
| 2 | Abbonamenti | pág. 7, precedente |
| 3 | Corrispettivi | pág. 7, Jev 0.95 |
| 4 | a) Contributi in conto esercizio | pág. 7, precedente |
| 5 | b) Proventi da sponsorizzazioni | pág. 7, precedente |
| 6 | c) Proventi pubblicitari | pág. 7, precedente |
| 7 | d) Proventi commerciali e royalties | pág. 7, precedente |
| 8 | e) Proventi da cessioni diritti audiovisivi | pág. 7, precedente |
| 9 | f) Ricavi da cessione temporanea prestazione calciatori | pág. 7, precedente |
| 10 | g) Plusvalenze da cessione pluriennale diritti calciatori | pág. 7, precedente |
| 11 | di cui premi e/o indennizzi attivi ex art.103, c.3, NOIF | pág. 7, precedente |
| 12 | di cui proventi diversi da trasferimento calciatori | pág. 7, precedente |
| 13 | i) Ricavi e proventi diversi | pág. 7, precedente |

### Gastos

```text
tools/cargar.mjs (2026-10-08)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Per materie prime, sussidiarie, di consumo e di merci | pág. 7, precedente |
| 2 | Costi per tesserati | pág. 43, precedente |
| 3 | Costi per attività sportiva | pág. 43, precedente |
| 4 | Costi specifici tecnici | pág. 43, precedente |
| 5 | Costi vitto, alloggio, locomozione gare | pág. 43, precedente |
| 6 | Servizio biglietteria e controllo ingressi | pág. 43, precedente |
| 7 | Assicurative e previdenziali | pág. 43, precedente |
| 8 | Amministrative, pubblicitarie e generali | pág. 43, precedente |
| 9 | Per godimento di beni di terzi | pág. 7, Jev 0.99 |
| 10 | a) Salari e stipendi | pág. 7, precedente |
| 11 | b) Oneri sociali | pág. 7, precedente |
| 12 | c) Trattamento di fine rapporto | pág. 7, precedente |
| 13 | e) altri costi | pág. 7, precedente |
| 14 | a) Ammortamento delle immobilizzazioni immateriali | pág. 7, precedente |
| 15 | b) Ammortamento delle immobilizzazioni materiali | pág. 7, precedente |
| 16 | c) Altre svalutazioni delle immobilizzazioni | pág. 7, precedente |
| 17 | d) Svalutazioni cred. incl. nell'attivo circolante | pág. 7, precedente |
| 18 | Variazioni delle rimanenze di materie prime, sussidiarie, di consumo e merci | pág. 7, Jev 1 |
| 19 | Accantonamenti per rischi | pág. 7, precedente |
| 20 | Altri accantonamenti | pág. 7, precedente |
| 21 | a) Oneri da organizzazione competizioni | pág. 8, precedente |
| 22 | b) Costi per acquisizione temporanea prestazioni calciatori | pág. 8, precedente |
| 23 | c) Minusvalenze da cessione diritti prestazioni calciatori | pág. 8, precedente |
| 24 | di cui premi e/o indennizzi attivi ex art.103, c.3, NOIF | pág. 8, precedente |
| 25 | di cui proventi diversi da trasferimento calciatori | pág. 8, precedente |
| 26 | - Ammende e multe gara | pág. 46, precedente |
| 27 | - Devoluzione e Servizi Lega | pág. 46, precedente |
| 28 | - Oneri precedenti esercizi e sopravvenienze passive | pág. 46, precedente |
| 29 | - Altre spese | pág. 46, precedente |

### Meta

```text
tools/cargar.mjs (2026-10-08). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
2022: tools/cargar.mjs 2026-10-08, verificado contra roster cacheado de "2021–22 Serie A" (tools/club-league-reference/it.json), coincidencia e
```

## 2021

### Ingresos

```text
2021: cargado por tools/cargar.mjs (2026-10-08) desde Clubes/Italia/Hellas Verona/Hellas-Verona-bilancio-individuale-2021.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Italia/Hellas Verona/Hellas-Verona-bilancio-individuale-2021.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Ricavi da gare | pág. 7, precedente |
| 2 | Abbonamenti | pág. 7, precedente |
| 3 | a) Contributi in conto esercizio | pág. 7, precedente |
| 4 | b) Proventi da sponsorizzazioni | pág. 7, precedente |
| 5 | c) Proventi pubblicitari | pág. 7, precedente |
| 6 | d) Proventi commerciali e royalties | pág. 7, precedente |
| 7 | e) Proventi da cessioni diritti audiovisivi | pág. 7, precedente |
| 8 | f) Ricavi da cessione temporanea prestazione calciatori | pág. 7, precedente |
| 9 | g) Plusvalenze da cessione pluriennale diritti calciatori | pág. 7, precedente |
| 10 | g) Altri proventi da trasferimento calciatori | pág. 7, Jev 0.98 |
| 11 | i) Ricavi e proventi diversi | pág. 7, precedente |

### Gastos

```text
tools/cargar.mjs (2026-10-08)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Per materie prime, sussidiarie, di consumo e di merci | pág. 7, precedente |
| 2 | Costi per tesserati | pág. 39, precedente |
| 3 | Costi per attività sportiva | pág. 39, precedente |
| 4 | Costi specifici tecnici | pág. 39, precedente |
| 5 | Costi vitto, alloggio, locomozione gare | pág. 39, precedente |
| 6 | Servizio stewarding, biglietteria, controllo | pág. 39, Jev 1 |
| 7 | Assicurative e previdenziali | pág. 39, precedente |
| 8 | Amministrative, pubblicitarie e generali | pág. 39, precedente |
| 9 | Affitto campi sportivi | pág. 40, precedente |
| 10 | Affitto impianti sportivi | pág. 40, precedente |
| 11 | Costi di noleggio | pág. 40, precedente |
| 12 | Canoni affitto altri locali | pág. 40, precedente |
| 13 | Altre spese su beni di terzi | pág. 40, precedente |
| 14 | Locazioni finanziarie | pág. 40, precedente |
| 15 | a) Salari e stipendi | pág. 7, precedente |
| 16 | b) Oneri sociali | pág. 7, precedente |
| 17 | c) Trattamento di fine rapporto | pág. 7, precedente |
| 18 | d) altri costi | pág. 7, precedente |
| 19 | a) Ammortamento delle immobilizzazioni immateriali | pág. 7, precedente |
| 20 | b) Ammortamento delle immobilizzazioni materiali | pág. 7, precedente |
| 21 | c) Altre svalutazioni delle immobilizzazioni | pág. 7, precedente |
| 22 | d) Svalutazioni cred. incl. nell'attivo circolante | pág. 7, precedente |
| 23 | Accantonamenti per rischi | pág. 7, precedente |
| 24 | Altri accantonamenti | pág. 7, precedente |
| 25 | Spese varie organizzazione gare | pág. 42, precedente |
| 26 | Tasse iscrizioni gare | pág. 42, precedente |
| 27 | b) Costi per acquisizione temporanea prestazioni calciatori | pág. 7, precedente |
| 28 | c) Minusvalenze da cessione diritti prestazioni calciatori | pág. 7, precedente |
| 29 | Costi di valorizzazione calciatori | pág. 42, precedente |
| 30 | Premi di rendimento | pág. 42, precedente |
| 31 | Altri costi da gestione calciatori | pág. 42, precedente |
| 32 | - Ammende e multe gara | pág. 42, precedente |
| 33 | - Devoluzione e Servizi Lega | pág. 42, precedente |
| 34 | - Oneri precedenti esercizi e sopravvenienze passive | pág. 42, precedente |
| 35 | - Altre spese | pág. 42, precedente |

### Meta

```text
tools/cargar.mjs (2026-10-08). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
2021: tools/cargar.mjs 2026-10-08, verificado contra roster cacheado de "2020–21 Serie A" (tools/club-league-reference/it.json), coincidencia e
```

## 2020

### Ingresos

```text
2020: cargado por tools/cargar.mjs (2026-10-07) desde Clubes/Italia/Hellas Verona/Hellas-Verona-bilancio-individuale-2020.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Italia/Hellas Verona/Hellas-Verona-bilancio-individuale-2020.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Gare Campionato | pág. 30, Jev 0.98 |
| 2 | Gare Coppa Italia | pág. 30, Jev 0.9 |
| 3 | Ricavi diversi | pág. 30, Jev 0.96 |
| 4 | Percentuali su incassi da squadre ospitanti | pág. 5, precedente |
| 5 | Abbonamenti | pág. 5, Jev 1 |
| 6 | 1a) Proventi da sponsorizzazioni | pág. 5, Jev 1 |
| 7 | 1b) Proventi pubblicitari | pág. 5, Jev 1 |
| 8 | 1c) Proventi commerciali e royalties | pág. 5, Jev 0.98 |
| 9 | 1d) Proventi da cessioni diritti audiovisivi | pág. 5, Jev 1 |
| 10 | 1e) Ricavi da cessione temporanea prestazione calciatori | pág. 5, Jev 0.92 |
| 11 | 1f) Plusvalenze da cessione pluriennale diritti calciatori | pág. 5, Jev 0.98 |
| 12 | 1g) Altri proventi da gestione calciatori | pág. 5, precedente |
| 13 | 1h) Ricavi e proventi diversi | pág. 5, Jev 1 |
| 14 | b) Contributi in conto esercizio | pág. 5, Jev 0.98 |

### Gastos

```text
tools/cargar.mjs (2026-10-07)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | 6) Per materie prime, sussidiarie, di consumo e di merci | pág. 5, Jev 0.95 |
| 2 | Costi per attività sportiva settore giovanile | pág. 32, Jev 0.99 |
| 3 | Costi per attività sportiva prima squadra | pág. 32, Jev 0.9 |
| 4 | Costi per competenze procuratori e consulenze sportive | pág. 32, precedente |
| 5 | Costi accessori campagna trasferimenti | pág. 32, precedente |
| 6 | Costi per servizio stadio “Bentegodi” | pág. 32, precedente |
| 7 | Assicurative e previdenziali | pág. 32, precedente |
| 8 | Costi pubblicitari e promozionali (di cui con HVMC S.r.l. Euro 947= migliaia) | pág. 32, Jev 1 |
| 9 | Costi amministrative e generali | pág. 32, Jev 1 |
| 10 | Affitto campi sportivi | pág. 33, Jev 0.95 |
| 11 | Affitto impianti sportivi | pág. 33, precedente |
| 12 | Locazioni finanziarie | pág. 33, Jev 0.91 |
| 13 | Canoni di noleggio | pág. 33, precedente |
| 14 | Canoni affitto altri locali | pág. 33, precedente |
| 15 | Altre spese su beni di terzi | pág. 33, Jev 0.9 |
| 16 | a) Salari e stipendi | pág. 5, Jev 0.97 |
| 17 | b) Oneri sociali | pág. 5, precedente |
| 18 | c) Trattamento di fine rapporto | pág. 5, precedente |
| 19 | d) altri costi | pág. 5, Jev 0.99 |
| 20 | a) Ammortamento delle immobilizzazioni immateriali | pág. 5, precedente |
| 21 | b) Ammortamento delle immobilizzazioni materiali | pág. 5, Jev 1 |
| 22 | c) Atre svalutazioni delle immobilizzazioni | pág. 5, precedente |
| 23 | d) Svalutazioni cred. incl. nell'attivo circolante | pág. 5, Jev 0.97 |
| 24 | 12) Accantonamenti per rischi | pág. 5, precedente |
| 25 | 13) Altri accantonamenti | pág. 5, precedente |
| 26 | a) Spese varie organizzazione gare | pág. 5, Jev 0.94 |
| 27 | b) Tasse iscrizione gare | pág. 5, Jev 1 |
| 28 | c) Oneri specifici verso squadre ospitate | pág. 5, precedente |
| 29 | d) Costi per acquisizione temporanea prestazioni calciatori | pág. 5, precedente |
| 30 | e) Minusvalenze da cessione diritti prestazioni calciatori | pág. 5, precedente |
| 31 | Costi di valorizzazione calciatori | pág. 35, precedente |
| 32 | Premi di rendimento | pág. 35, Jev 0.98 |
| 33 | Altri costi da gestione calciatori | pág. 35, precedente |
| 34 | - Ammende e multe gara | pág. 35, Jev 0.99 |
| 35 | - Contribuzione e Servizi Lega | pág. 35, precedente |
| 36 | - Altre spese | pág. 35, Jev 0.99 |

### Meta

```text
tools/cargar.mjs (2026-10-07). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee (Versión 332).
```

## Fuentes

### (general)

```text
Fuentes de cada ejercicio: las agrega tools/cargar.mjs adentro de este bloque (Versión 379: hasta la 378 el esqueleto no lo traía y la
primera carga de un club dado de alta por script se revertía, "no encontré Object.assign(sources, {"; caso: Fortaleza CEIF).
```
