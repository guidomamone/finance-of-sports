# fiorentina-it — evidencia de carga

Lo que había como comentario en `data/it/fiorentina-it-data.js`, movido tal cual por `tools/archivo/mover-comentarios-data.mjs` (la regla:
`Admin/CONVENCIONES-DATOS.md`, "data/<país>/<club>-data.js NO LLEVA COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y
meta. Las notas de cada fila van en una tabla con su número de fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
============================================================================
data/it/fiorentina-it-data.js — ACF Fiorentina S.r.l. (Italia).
ALTA POR SCRIPT (tools/alta-club.mjs, 2026-10-08), SIN EJERCICIOS CARGADOS TODAVÍA:
las estructuras de abajo están vacías a propósito. Los rubros, los totales
oficiales y el resto del fiscalYearMeta los agrega la etapa de carga
(tools/proponer-carga.mjs / sesión de onboarding), que es también la que
reemplaza esta cabecera por la de siempre (fuente, perímetro, categorización).

Documento que originó el alta: Clubes/Italia/Fiorentina/Fiorentina-bilancio-2024-25.pdf

De dónde salió cada campo (estado según alta-club.mjs: ok / pendiente):
  id                 ok        "fiorentina-it" — slug de "Fiorentina" + '-it' (convención de clubId, Admin/CONVENCIONES.md Versión 129)
  name               ok        "ACF Fiorentina S.r.l." — la portada y lo más frecuente del .md coinciden (8 veces)
  displayName        ok        "Fiorentina" — nombre de la carpeta del club en Clubes/
  country            ok        "IT" — carpeta de país "Italia" (tabla PAISES)
  reportingCurrency  ok        "EUR" — moneda de curso legal de Italia
  fiscalYearStart    ok        "07-01" — cierre del ejercicio: contenido del .md (245 de 261 fechas de fin de mes caen en el mes 6)
  sport              ok        "futbol" — el .md nombra el fútbol 27 veces y ningún otro deporte más que eso
  brandColor         pendiente (ausente) — tools/brand-color-reference/ (footylogos): [italia] fiorentina: #61358B Purple, #FFFFFF White, #DD3224 Red
  anio               ok        2025 — nombre del archivo (misma regla que onboard.mjs --quien), confirmado por las fechas de cierre del .md
  cierre             ok        "2025-06-30" — año del ejercicio + mes de cierre (contenido del .md (245 de 261 fechas de fin de mes caen en el mes 6))
  reportType         ok        "official_balance_sheet" — el .md tiene un estado contable (resultados / balance) y el nombre del archivo no sugiere otro tipo
  perimetro          ok        "individual" — ajuste manual (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-07): Guido 2026-10-07: individual (ACF Fiorentina S.r.l.); no publica consolidado desde 202
  currency           ok        "EUR" — moneda de curso legal de Italia (tabla PAISES de alta-club.mjs)
  fxRef              ok        "EUR@2025-06-30" — el documento no declara tipo de cambio; FX_CLOSE ya tiene EUR@2025-06-30 = 0.8532 (Cierre BCE al 30/6/2025 (1 EUR = 1,172 USD))
  sourceId           ok        "fiorentina-it-bilancio-2024-25" — clubId + nombre del archivo en slug
  liga               ok        "it-seriea" — roster cacheado de "2024–25 Serie A" (tools/club-league-reference/it.json), coincidencia exacta "Fiorentina"

FISCAL YEAR META PROPUESTO para 2025 (NO registrado: un ejercicio con meta y
sin rubros se vería en el sitio como un año en cero, y "sin dato no es cero"):
  2025: {"reportType":"official_balance_sheet","currency":"EUR","fxRef":"EUR@2025-06-30","sourceId":"fiorentina-it-bilancio-2024-25"}
============================================================================
```

_de data/clubs.js:_

```text
Fiorentina: alta por tools/alta-club.mjs (2026-10-08) desde Clubes/Italia/Fiorentina/Fiorentina-bilancio-2024-25.pdf.
```

_de data/club-leagues/it.js:_

```text
Fiorentina (alta-club.mjs, 2026-10-08): verificado contra roster cacheado de "2024–25 Serie A" (tools/club-league-reference/it.json), coincidencia exacta "Fiorentina".
```

## 2025

### Ingresos

```text
2025: cargado por tools/cargar.mjs (2026-10-08) desde Clubes/Italia/Fiorentina/Fiorentina-bilancio-2024-25.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Italia/Fiorentina/Fiorentina-bilancio-2024-25.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | a) ricavi da gare | pág. 31, Jev 1 |
| 2 | b) abbonamenti | pág. 31, Jev 1 |
| 3 | a) contributi in conto esercizio | pág. 31, Jev 0.97 |
| 4 | b) proventi da sponsorizzazioni | pág. 31, Jev 1 |
| 5 | c) proventi pubblicitari | pág. 31, Jev 1 |
| 6 | d) proventi commerciali e royalties | pág. 31, Jev 1 |
| 7 | e) proventi da cessione diritti televisivi | pág. 31, Jev 1 |
| 8 | f) ricavi per cessione temporanea giocatori | pág. 31, Jev 0.99 |
| 9 | g) plusv. da cessione diritti pluriennali alle prest.di calciatori | pág. 31, Jev 1 |
| 10 | h) altri proventi da gestione calciatori | pág. 31, Jev 0.98 |
| 11 | l) ricavi e proventi diversi | pág. 31, Jev 1 |

### Gastos

```text
tools/cargar.mjs (2026-10-08)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | 6) per materie prime, sussidiarie, di consumo e di merci | pág. 31, Jev 0.99 |
| 2 | 7) per servizi | pág. 31, Jev 1 |
| 3 | 8) per godimento di beni di terzi | pág. 31, Jev 0.97 |
| 4 | a) salari e stipendi | pág. 31, Jev 1 |
| 5 | b) oneri sociali | pág. 31, Jev 0.96 |
| 6 | c) trattamento di fine rapporto | pág. 31, Jev 0.99 |
| 7 | e) altri costi | pág. 31, precedente |
| 8 | a) ammortamento immobilizzazioni immateriali | pág. 31, Jev 0.9 |
| 9 | b) ammortamento diritti pluriennali calciatori | pág. 31, Jev 1 |
| 10 | c) ammortamento immobilizzazioni materiali | pág. 31, Jev 1 |
| 11 | d) altre svalutazioni delle immobilizzazioni | pág. 32, Jev 0.9 |
| 12 | 11) variazioni delle rimanenze di materie prime, sussidiarie, di consumo e merci | pág. 32, Jev 1 |
| 13 | 12) accantonamenti per rischi | pág. 32, Jev 0.97 |
| 14 | a) oneri da organizzazione competizioni | pág. 32, Jev 1 |
| 15 | b) costi per acquisizione temporanea prestazioni dei calciatori | pág. 32, Jev 0.99 |
| 16 | c) minusvalenze da cessione diritti pluriennali dei calciatori | pág. 32, Jev 0.99 |
| 17 | d) altri oneri da trasferimento diritti calciatori | pág. 32, Jev 1 |
| 18 | e) altri oneri diversi di gestione | pág. 32, Jev 1 |

### Meta

```text
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-08): fila = 0. hijo de a) abierto por la nota (2117-2123 suman 21.493.476)
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-08): fila = 0. hijo de h) abierto por la nota (2190-2199 suman 3.426.567)
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-08): fila = 0. hijo de d) (3.268.853 + 622.041 = 3.890.894)
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-08): fila = 0. idem
tools/cargar.mjs (2026-10-08). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

```text
tools/caja-deuda.mjs (2026-10-16): cash escalón 1b (compuerta: documento anterior): "Totale disponibilità liquide" pág. 29
```

```text
tools/caja-deuda.mjs (2026-10-17): grossDebt escalón 0 (compuerta: ajuste manual): ajuste manual (2026-10-17): Claude 2026-10-17 (leído en el balance por subagente Sonnet, criterio de deuda financiera con socios): 0. Balance al 30/06/2025 D) sin filas financieras; la nota dice que no hay debiti verso banche per finanziamenti. Total 125.302.678.
```

## 2024

### Ingresos

```text
2024: cargado por tools/cargar.mjs (2026-10-08) desde Clubes/Italia/Fiorentina/Fiorentina-bilancio-2023-24.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Italia/Fiorentina/Fiorentina-bilancio-2023-24.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | a) ricavi da gare | pág. 31, Jev 1 |
| 2 | b) abbonamenti | pág. 31, Jev 1 |
| 3 | a) contributi in conto esercizio | pág. 31, Jev 0.97 |
| 4 | b) proventi da sponsorizzazioni | pág. 31, Jev 1 |
| 5 | c) proventi pubblicitari | pág. 31, Jev 1 |
| 6 | d) proventi commerciali e royalties | pág. 31, Jev 1 |
| 7 | e) proventi da cessione diritti televisivi | pág. 31, Jev 1 |
| 8 | f) ricavi per cessione temporanea giocatori | pág. 31, Jev 0.99 |
| 9 | g) plusv. da cessione diritti pluriennali alle prest.di calciatori | pág. 31, Jev 1 |
| 10 | - premi e/o indennizzi attivi ex art. 103, comma 3 NOIF | pág. 31, Jev 0.99 |
| 11 | - proventi diversi da trasferimento calciatori | pág. 31, Claude 0.8 |
| 12 | l) ricavi e proventi diversi | pág. 31, Jev 1 |

### Gastos

```text
tools/cargar.mjs (2026-10-08)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | 6) per materie prime, sussidiarie, di consumo e di merci | pág. 31, Jev 0.99 |
| 2 | 7) per servizi | pág. 31, Jev 1 |
| 3 | 8) per godimento di beni di terzi | pág. 31, Jev 0.97 |
| 4 | a) salari e stipendi | pág. 31, Jev 1 |
| 5 | b) oneri sociali | pág. 31, Jev 0.96 |
| 6 | c) trattamento di fine rapporto | pág. 31, Jev 0.99 |
| 7 | e) altri costi | pág. 31, precedente |
| 8 | a) ammortamento immobilizzazioni immateriali | pág. 31, Jev 0.9 |
| 9 | b) ammortamento diritti pluriennali calciatori | pág. 31, Jev 1 |
| 10 | c) ammortamento immobilizzazioni materiali | pág. 31, Jev 1 |
| 11 | d) altre svalutazioni delle immobilizzazioni | pág. 31, Jev 0.9 |
| 12 | 11) variazioni delle rimanenze di materie prime, sussidiarie, di consumo e merci | pág. 31, Jev 1 |
| 13 | 12) accantonamenti per rischi | pág. 32, Jev 0.97 |
| 14 | a) oneri da organizzazione competizioni | pág. 32, Jev 1 |
| 15 | b) costi per acquisizione temporanea prestazioni dei calciatori | pág. 32, Jev 0.99 |
| 16 | d) altri oneri da trasferimento diritti calciatori | pág. 32, Jev 1 |
| 17 | e) altri oneri diversi di gestione | pág. 32, Jev 1 |

### Meta

```text
2024: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-08): fila = 0. hijo de a) contributi, ya abierto por la nota (2025-2031 suman 28.844.322); se contaba dos veces
tools/cargar.mjs (2026-10-08). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

```text
tools/caja-deuda.mjs (2026-10-16): cash escalón 1b (compuerta: documento siguiente): "Totale disponibilità liquide" pág. 30
```

```text
tools/caja-deuda.mjs (2026-10-17): grossDebt escalón 0 (compuerta: ajuste manual): ajuste manual (2026-10-17): Claude 2026-10-17 (leído en el balance por subagente Sonnet, criterio de deuda financiera con socios): 0. Balance al 30/06/2024 D) sin filas financieras; la nota dice que no hay debiti verso il sistema bancario per finanziamenti. Total 65.338.811.
```

### Liga

```text
2024: tools/cargar.mjs 2026-10-08, verificado contra roster cacheado de "2023–24 Serie A" (tools/club-league-reference/it.json), coincidencia e
```

## 2022

### Ingresos

```text
2022: cargado por tools/cargar.mjs (2026-10-08) desde Clubes/Italia/Fiorentina/Fiorentina-bilancio-2021-22-issuu.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Italia/Fiorentina/Fiorentina-bilancio-2021-22-issuu.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Ricavi Gare in Casa – Campionato | pág. 61, Jev 1 |
| 2 | Ricavi per abbonamenti | pág. 61, Claude 0.95 |
| 3 | Ricavi Gare in Casa - Coppa Italia | pág. 61, Jev 1 |
| 4 | Ricavi Gare fuori Casa - Coppa Italia | pág. 61, Jev 1 |
| 5 | Tessere Inviola | pág. 61, precedente |
| 6 | Ricavi Gare amichevoli | pág. 61, Jev 1 |
| 7 | Ricavi da sponsorizzazioni ufficiali | pág. 62, Jev 1 |
| 8 | Ricavi da sponsor tecnico | pág. 62, Jev 1 |
| 9 | Ricavi da altre sponsorizzazioni commerciali | pág. 62, Jev 1 |
| 10 | c) proventi pubblicitari | pág. 31, Jev 1 |
| 11 | d) proventi commerciali e royalties | pág. 31, Jev 1 |
| 12 | e) proventi da cessione diritti televisivi | pág. 31, Jev 1 |
| 13 | f) ricavi per cessione temporanea giocatori | pág. 31, Jev 0.99 |
| 14 | g) plusv. da cessione diritti pluriennali alle prest.di calciatori | pág. 31, Jev 1 |
| 15 | - premi e/o indennizzi attivi ex art. 103, comma 3 NOIF | pág. 31, Jev 0.99 |
| 16 | - proventi diversi da trasferimento calciatori | pág. 31, Claude 0.8 |
| 17 | Proventi accessori diritti televisivi | pág. 64, Jev 0.99 |
| 18 | Ricavi Collettivi Lega Naz.le Professionisti | pág. 64, precedente |
| 19 | Proventi da partecipazione Coppa Italia | pág. 64, Jev 1 |
| 20 | Proventi partecipazione amichevoli | pág. 64, precedente |
| 21 | Ricavi per servizi resi a società controllanti | pág. 64, Jev 0.98 |
| 22 | Indennità partecipazione calciatori altre competizioni | pág. 64, Jev 0.9 |
| 23 | Contributi e ricavi collettivi Women | pág. 64, Jev 0.95 |
| 24 | Indennizzi da transazioni e cause legali | pág. 64, Jev 1 |
| 25 | Sfruttamento archivio immagini RAI | pág. 64, precedente |
| 26 | Ricavi per organizzazione gare ed altri eventi | pág. 64, precedente |
| 27 | Ricavi per eventi non sportivi | pág. 64, precedente |
| 28 | Sopravvenienze attive | pág. 64, Jev 1 |
| 29 | Altri | pág. 64, Jev 0.97 |

### Gastos

```text
tools/cargar.mjs (2026-10-08)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Materiale Tecnico per attività sportiva | pág. 65, precedente |
| 2 | Materiale Sanitario | pág. 65, precedente |
| 3 | Materiali di consumo e vari | pág. 65, Jev 0.96 |
| 4 | Costi per attività sportiva | pág. 66, precedente |
| 5 | Servizio biglietteria e controllo ingressi | pág. 66, Jev 1 |
| 6 | Vitto, alloggio e locomozioni squadre | pág. 66, Jev 1 |
| 7 | Assicurazioni | pág. 66, Jev 0.92 |
| 8 | Amministrative, pubblicitarie e generali | pág. 66, Jev 1 |
| 9 | Utenze sedi sociali e stadio | pág. 66, Jev 0.97 |
| 10 | Consulenze Direzionali, legali, commerciali e varie | pág. 66, Jev 0.98 |
| 11 | 8) per godimento di beni di terzi | pág. 31, Jev 0.97 |
| 12 | a) salari e stipendi | pág. 31, Jev 1 |
| 13 | b) oneri sociali | pág. 31, Jev 0.96 |
| 14 | c) trattamento di fine rapporto | pág. 31, Jev 0.99 |
| 15 | d) trattamento di quiescenza e simili | pág. 31, precedente |
| 16 | e) altri costi | pág. 31, precedente |
| 17 | a) ammortamento immobilizzazioni immateriali | pág. 31, Jev 0.9 |
| 18 | b) ammortamento diritti pluriennali calciatori | pág. 31, Jev 1 |
| 19 | c) ammortamento immobilizzazioni materiali | pág. 31, Jev 1 |
| 20 | d) altre svalutazioni delle immobilizzazioni | pág. 31, Jev 0.9 |
| 21 | e) svalutazione crediti dell'attivo circolante | pág. 31, Jev 1 |
| 22 | 11) variazioni delle rimanenze di materie prime, sussidiarie, di consumo e merci | pág. 31, Jev 1 |
| 23 | 12) accantonamenti per rischi | pág. 31, Jev 0.97 |
| 24 | 13) altri accantonamenti | pág. 31, Claude 0.8 |
| 25 | a) oneri da organizzazione competizioni | pág. 31, Jev 1 |
| 26 | b) costi per acquisizione temporanea prestazioni dei calciatori | pág. 31, Jev 0.99 |
| 27 | c) minusvalenze da cessione diritti pluriennali dei calciatori | pág. 31, Jev 0.99 |
| 28 | - premi e/o indennizzi passivi ex. Art 103, comma 3, NOIF | pág. 31, Jev 0.97 |
| 29 | - oneri diversi da trasferimento diritti calciatori | pág. 31, Jev 0.91 |
| 30 | e) altri oneri diversi di gestione | pág. 31, Jev 1 |

### Meta

```text
2022: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-08): fila = 0. hijo de 1) abierto por la nota b45; se contaba dos veces (a+b = 7.876.653; 1) = 7.917.332, dif. 40.680 de Coppa Italia fuori casa)
2022: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-08): fila = 0. idem
tools/cargar.mjs (2026-10-08). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

```text
tools/caja-deuda.mjs (2026-10-16): cash escalón 1b (compuerta: documento anterior): "Totale disponibilità liquide" pág. 29
```

```text
tools/caja-deuda.mjs (2026-10-17): grossDebt escalón 0 (compuerta: ajuste manual): ajuste manual (2026-10-17): Claude 2026-10-17 (leído en el balance por subagente Sonnet, criterio de deuda financiera con socios): 0. Balance al 30/06/2022: D) Debiti sin filas de deuda financiera; total 117.197.146.
```

### Liga

```text
2022: tools/cargar.mjs 2026-10-08, verificado contra roster cacheado de "2021–22 Serie A" (tools/club-league-reference/it.json), coincidencia e
```

## 2021

### Ingresos

```text
2021: cargado por tools/cargar.mjs (2026-10-08) desde Clubes/Italia/Fiorentina/Fiorentina-bilancio-2020-21-issuu.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Italia/Fiorentina/Fiorentina-bilancio-2020-21-issuu.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | 1) ricavi delle vendite e delle prestazioni | pág. 32, precedente |
| 2 | a) contributi in conto esercizio | pág. 32, precedente |
| 3 | Ricavi da sponsorizzazioni ufficiali | pág. 61, precedente |
| 4 | Ricavi da sponsor tecnico | pág. 61, precedente |
| 5 | Ricavi da altre sponsorizzazioni commerciali | pág. 61, precedente |
| 6 | c) proventi pubblicitari | pág. 32, precedente |
| 7 | d) proventi commerciali e royalties | pág. 32, precedente |
| 8 | e) proventi da cessione diritti televisivi | pág. 32, precedente |
| 9 | Diritti di trasmissione radiofonici | pág. 62, Jev 0.98 |
| 10 | Proventi accessori diritti televisivi | pág. 62, precedente |
| 11 | Ricavi Collettivi Lega Naz.le Professionisti | pág. 62, precedente |
| 12 | Proventi da partecipazione Coppa Italia | pág. 62, precedente |
| 13 | Ricavi per servizi resi a società controllanti | pág. 62, precedente |
| 14 | Indennità partecipazione calciatori altre competizioni e contributi femminile | pág. 62, ? 0.75 |
| 15 | Altri | pág. 62, precedente |
| 16 | g) ricavi per cessione temporanea giocatori | pág. 32, precedente |
| 17 | h) plusv. da cessione diritti pluriennali alle prest.di calciatori | pág. 32, precedente |
| 18 | REBIC A. | pág. 63, Claude 0.85 |
| 19 | GILBERTO M.J. | pág. 63, Claude 0.85 |
| 20 | MANCINI G. | pág. 63, Claude 0.85 |
| 21 | VALERO B. | pág. 63, Claude 0.85 |
| 22 | CHIESA F. | pág. 63, Claude 0.85 |
| 23 | DUNCAN J. | pág. 63, Claude 0.85 |
| 24 | FERRARINI G. | pág. 63, Claude 0.85 |
| 25 | SPEDALIERI | pág. 63, Claude 0.85 |
| 26 | Contributi solidarietà FIFA attivi | pág. 63, Claude 0.85 |
| 27 | l) ricavi e proventi diversi | pág. 32, precedente |

### Gastos

```text
tools/cargar.mjs (2026-10-08)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Materiale Tecnico per attività sportiva | pág. 64, precedente |
| 2 | Materiale Sanitario | pág. 64, precedente |
| 3 | Costi per manutenzioni e riparazioni | pág. 64, Jev 0.99 |
| 4 | Materiale di consumo e altri | pág. 64, Jev 0.92 |
| 5 | Costi per attività sportiva | pág. 65, precedente |
| 6 | Servizio biglietteria e controllo ingressi | pág. 65, precedente |
| 7 | Vitto, alloggio e locomozioni squadre | pág. 65, precedente |
| 8 | Assicurazioni | pág. 65, precedente |
| 9 | Amministrative, pubblicitarie e generali | pág. 65, precedente |
| 10 | Utenze sedi sociali e stadio | pág. 65, precedente |
| 11 | Consulenze Direzionali, legali, commerciali e varie | pág. 65, precedente |
| 12 | 8) per godimento di beni di terzi | pág. 32, precedente |
| 13 | a) salari e stipendi | pág. 32, precedente |
| 14 | b) oneri sociali | pág. 32, precedente |
| 15 | c) trattamento di fine rapporto | pág. 32, precedente |
| 16 | d) trattamento di quiescenza e simili | pág. 32, precedente |
| 17 | e) altri costi | pág. 32, precedente |
| 18 | a) ammortamento immobilizzazioni immateriali | pág. 32, precedente |
| 19 | b) ammortamento diritti pluriennali calciatori | pág. 32, precedente |
| 20 | c) ammortamento immobilizzazioni materiali | pág. 32, precedente |
| 21 | d) altre svalutazioni delle immobilizzazioni | pág. 32, precedente |
| 22 | e) svalutazione crediti dell'attivo circolante | pág. 32, precedente |
| 23 | 11) variazioni delle rimanenze di materie prime, sussidiarie, di consumo e merci | pág. 32, precedente |
| 24 | 12) accantonamenti per rischi | pág. 32, precedente |
| 25 | Spese Organizzazione gare | pág. 67, Jev 1 |
| 26 | Tasse iscrizione gare | pág. 67, Jev 1 |
| 27 | Costi per acq. temporanea prestazioni calciatori | pág. 67, Jev 0.98 |
| 28 | Minusvalenze cessione diritti plur. Prest. calciatori | pág. 67, Jev 1 |
| 29 | Altri oneri di gestione calciatori | pág. 67, Jev 0.99 |
| 30 | Altri oneri diversi di gestione | pág. 67, precedente |

### Meta

```text
tools/cargar.mjs (2026-10-08). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

```text
tools/caja-deuda.mjs (2026-10-16): cash escalón 1b (compuerta: documento siguiente): "Totale disponibilità liquide" pág. 30
```

```text
tools/caja-deuda.mjs (2026-10-17): grossDebt escalón 0 (compuerta: ajuste manual): ajuste manual (2026-10-17): Claude 2026-10-17 (leído en el balance por subagente Sonnet, criterio de deuda financiera con socios): 0. Balance al 30/06/2021: Passivo D) Debiti sin obbligazioni/soci/banche/otros financiadores (solo acconti, fornitori, tributari, previdenza, enti settore specifico, altri debiti). Total 129.337.422.
```

### Liga

```text
2021: tools/cargar.mjs 2026-10-08, verificado contra roster cacheado de "2020–21 Serie A" (tools/club-league-reference/it.json), coincidencia e
```

## 2020

### Ingresos

```text
2020: cargado por tools/cargar.mjs (2026-10-21) desde Clubes/Italia/Fiorentina/Fiorentina-bilancio-2020-giu-issuu.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Italia/Fiorentina/Fiorentina-bilancio-2020-giu-issuu.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Ricavi Gare in Casa – Campionato | pág. 75, precedente |
| 2 | Ricavi per abbonamenti | pág. 75, precedente |
| 3 | Ricavi Gare in Casa - Coppa Italia | pág. 75, precedente |
| 4 | Ricavi Gare fuori Casa - Coppa Italia | pág. 75, precedente |
| 5 | Ricavi da sponsorizzazioni ufficiali | pág. 76, precedente |
| 6 | Ricavi da sponsor tecnico | pág. 76, precedente |
| 7 | Ricavi da altre sponsorizzazioni commerciali | pág. 76, precedente |
| 8 | c) proventi pubblicitari | pág. 42, precedente |
| 9 | d) proventi commerciali e royalties | pág. 42, precedente |
| 10 | e) proventi da cessione diritti televisivi | pág. 42, precedente |
| 11 | Diritti di trasmissione radiofonici | pág. 77, precedente |
| 12 | Proventi accessori diritti televisivi | pág. 77, precedente |
| 13 | Ricavi Collettivi Lega Naz.le Professionisti | pág. 77, precedente |
| 14 | Proventi da partecipazione Coppa Italia | pág. 77, precedente |
| 15 | Ricavi per servizi resi a società controllanti | pág. 77, precedente |
| 16 | Indennità partecipazione calciatori altre competizioni | pág. 77, precedente |
| 17 | Altri | pág. 77, precedente |
| 18 | g) ricavi per cessione temporanea giocatori | pág. 42, precedente |
| 19 | h) plusv. da cessione diritti pluriennali alle prest.di calciatori | pág. 42, precedente |
| 20 | ILICIC J. | pág. 78, precedente |
| 21 | Contributi solidarietà FIFA attivi | pág. 78, precedente |
| 22 | Premi preparazione attivi | pág. 78, precedente |
| 23 | l) ricavi e proventi diversi | pág. 42, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Materiale Tecnico per attività sportiva | pág. 79, precedente |
| 2 | Materiale Sanitario | pág. 79, precedente |
| 3 | Costi per manutenzioni e riparazioni | pág. 79, precedente |
| 4 | Materiale di consumo e altri | pág. 79, precedente |
| 5 | Costi per attività sportiva | pág. 80, precedente |
| 6 | Servizio biglietteria e controllo ingressi | pág. 80, precedente |
| 7 | Vitto, alloggio e locomozioni squadre | pág. 80, precedente |
| 8 | Assicurazioni | pág. 80, precedente |
| 9 | Amministrative, pubblicitarie e generali | pág. 80, precedente |
| 10 | Utenze sedi sociali e stadio | pág. 80, precedente |
| 11 | Consulenze Direzionali, legali, commerciali e varie | pág. 80, precedente |
| 12 | 8) per godimento di beni di terzi | pág. 42, precedente |
| 13 | a) salari e stipendi | pág. 42, precedente |
| 14 | b) oneri sociali | pág. 42, precedente |
| 15 | c) trattamento di fine rapporto | pág. 42, precedente |
| 16 | e) altri costi | pág. 42, precedente |
| 17 | a) ammortamento immobilizzazioni immateriali | pág. 42, precedente |
| 18 | b) ammortamento diritti pluriennali calciatori | pág. 42, precedente |
| 19 | c) ammortamento immobilizzazioni materiali | pág. 42, precedente |
| 20 | d) altre svalutazioni delle immobilizzazioni | pág. 42, precedente |
| 21 | e) svalutazione crediti dell'attivo circolante | pág. 42, precedente |
| 22 | 11) variazioni delle rimanenze di materie prime, sussidiarie, di consumo e merci | pág. 42, precedente |
| 23 | 12) accantonamenti per rischi | pág. 42, precedente |
| 24 | Spese Organizzazione gare | pág. 82, precedente |
| 25 | Tasse iscrizione gare | pág. 82, precedente |
| 26 | Mutualità passiva per incassi Coppa Italia | pág. 82, precedente |
| 27 | Costi per acq. temporanea prestazioni calciatori | pág. 82, precedente |
| 28 | Minusvalenze cessione diritti plur. Prest. calciatori | pág. 82, precedente |
| 29 | DRAGOSWKI B. | pág. 82, Claude 0.85 |
| 30 | PEDRO G. | pág. 82, Claude 0.85 |
| 31 | Altri | pág. 82, precedente |
| 32 | Contributi Solidarietà FIFA | pág. 82, precedente |
| 33 | Premi valorizzazione calciatori | pág. 82, precedente |
| 34 | Altri oneri diversi di gestione | pág. 82, precedente |

### Meta

```text
tools/cargar.mjs (2026-10-21). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
tools/cargar.mjs (2026-10-21): it-seriea, verificado contra roster cacheado de "2019–20 Serie A" (tools/club-league-reference/it.json), coincidencia exacta "Fiorentina".
```

## 2019

### Ingresos

```text
2019: cargado por tools/cargar.mjs (2026-10-08) desde Clubes/Italia/Fiorentina/Fiorentina-bilancio-consolidato-2019-issuu.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Italia/Fiorentina/Fiorentina-bilancio-consolidato-2019-issuu.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Ricavi Gare in Casa - Campionato | pág. 73, precedente |
| 2 | Ricavi per abbonamenti | pág. 73, precedente |
| 3 | Ricavi Gare in Casa - Coppa Italia | pág. 73, precedente |
| 4 | Ricavi Gare fuori Casa - Coppa Italia | pág. 73, precedente |
| 5 | Ricavi Gare amichevoli | pág. 73, precedente |
| 6 | Ricavi da sponsorizzazioni ufficiali | pág. 73, precedente |
| 7 | Ricavi da sponsor tecnico | pág. 73, precedente |
| 8 | Ricavi da altre sponsorizzazioni commerciali | pág. 73, precedente |
| 9 | c) proventi pubblicitari | pág. 46, precedente |
| 10 | d) proventi commerciali e royalties | pág. 46, precedente |
| 11 | e) proventi da cessione diritti televisivi | pág. 46, precedente |
| 12 | Proventi accessori diritti televisivi | pág. 74, precedente |
| 13 | Diritti di trasmissione radiofonici | pág. 74, precedente |
| 14 | Proventi da partecipazione Coppe Europee | pág. 74, Jev 1 |
| 15 | Ricavi Collettivi Lega Naz.le Professionisti | pág. 74, precedente |
| 16 | Proventi da partecipazione Coppa Italia | pág. 74, precedente |
| 17 | Premi per partecipazione per gare | pág. 74, Jev 1 |
| 18 | Indennità partecipazione calciatori Fifa World Cup | pág. 74, Jev 0.99 |
| 19 | Altri | pág. 74, precedente |
| 20 | g) ricavi per cessione temporanea giocatori | pág. 46, precedente |
| 21 | h) plusv. da cessione diritti pluriennali alle prest.di calciatori | pág. 46, precedente |
| 22 | MLAKAR J. | pág. 75, Claude 0.92 |
| 23 | HAGI J. | pág. 75, Claude 0.92 |
| 24 | VALERO BORJA | pág. 75, Jev 0.92 |
| 25 | JOAQUIN S. | pág. 75, Claude 0.92 |
| 26 | ILICIC J. | pág. 75, Claude 0.92 |
| 27 | MANCINI G. | pág. 75, precedente |
| 28 | RANIERI L. | pág. 75, Claude 0.92 |
| 29 | Premi preparazione attivi | pág. 75, Claude 0.8 |
| 30 | Contributi solidarietà FIFA attivi | pág. 75, precedente |
| 31 | l) ricavi e proventi diversi | pág. 46, precedente |

### Gastos

```text
tools/cargar.mjs (2026-10-08)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Materiale Tecnico per attività sportiva | pág. 77, precedente |
| 2 | Prodotti destinati alla vendita | pág. 77, Jev 0.91 |
| 3 | Materiale Sanitario | pág. 77, precedente |
| 4 | Costi per manutenzioni e riparazioni | pág. 77, precedente |
| 5 | Materiale di consumo e altri | pág. 77, precedente |
| 6 | Costi per attività sportiva | pág. 78, precedente |
| 7 | Servizio biglietteria e controllo ingressi | pág. 78, precedente |
| 8 | Vitto, alloggio e locomozioni squadre | pág. 78, precedente |
| 9 | Assicurazioni | pág. 78, precedente |
| 10 | Amministrative, pubblicitarie e generali | pág. 78, precedente |
| 11 | Utenze sedi sociali e stadio | pág. 78, precedente |
| 12 | Consulenze Direzionali, legali, commerciali e varie | pág. 78, precedente |
| 13 | 8) per godimento di beni di terzi | pág. 46, precedente |
| 14 | a) salari e stipendi | pág. 46, precedente |
| 15 | b) oneri sociali | pág. 46, precedente |
| 16 | c) trattamento di fine rapporto | pág. 46, precedente |
| 17 | d) trattamento di quiescenza e simili | pág. 46, precedente |
| 18 | e) altri costi | pág. 46, precedente |
| 19 | a) ammortamento immobilizzazioni immateriali | pág. 46, precedente |
| 20 | b) ammortamento diritti pluriennali calciatori | pág. 46, precedente |
| 21 | c) ammortamento immobilizzazioni materiali | pág. 46, precedente |
| 22 | d) altre svalutazioni delle immobilizzazioni | pág. 46, precedente |
| 23 | e) svalutazione crediti dell'attivo circolante | pág. 46, precedente |
| 24 | 11) variazioni delle rimanenze di materie prime, sussidiarie, di consumo e merci | pág. 46, precedente |
| 25 | 12) accantonamenti per rischi | pág. 46, precedente |
| 26 | Spese varie Organizzazione gare | pág. 80, Jev 0.99 |
| 27 | Tasse iscrizione gare | pág. 80, precedente |
| 28 | Mutualità passiva per incassi Coppa Italia | pág. 80, Claude 0.8 |
| 29 | Costi per acq. temporanea prestazioni calciatori | pág. 80, precedente |
| 30 | Minusvalenze cessione diritti plur. Prest. calciatori | pág. 80, precedente |
| 31 | VERETOUT J. | pág. 80, precedente |
| 32 | CASTROVILLI G. | pág. 80, precedente |
| 33 | DIKS K. | pág. 80, precedente |
| 34 | Altri | pág. 80, precedente |
| 35 | Contributi Solidarietà FIFA | pág. 80, Jev 0.97 |
| 36 | Premi valorizzazione calciatori | pág. 80, Jev 0.92 |
| 37 | Spese per organizzazione eventi non sportivi | pág. 80, precedente |
| 38 | Altri oneri diversi di gestione | pág. 80, precedente |

### Meta

```text
2019: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-07): perimetro = consolidado. Guido 2026-10-07: el 2019 se carga consolidado (Gruppo Fiorentina: ACF Fiorentina S.p.A. + Promesse Viola S.r.l.), único documento de ese año; desde 2021 la serie es individual
2019: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-07): cierre = 2019-12-31. Guido 2026-10-07: el ejercicio 2019 cierra el 31/12 (después el club pasó a cerrar el 30/06)
2019: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-07): name = ACF Fiorentina S.p.A.. Guido 2026-10-07: en 2019 la sociedad era S.p.A.; desde 2021-22 es S.r.l.
tools/cargar.mjs (2026-10-08). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

```text
tools/caja-deuda.mjs (2026-10-17): grossDebt escalón 0 (compuerta: ajuste manual): ajuste manual (2026-10-17): Claude 2026-10-17 (leído en el balance por subagente Sonnet, criterio de deuda financiera con socios): soci per finanziamenti (New ACF) 30.000.000 + banche (Intesa. breve) 7.500.000 + altri finanziatori 0 = 37.500.000. Obbligazioni 0; los 30M de soci son a largo plazo; banca 7,5M a corto.; cash escalón 0 (compuerta: ajuste manual): ajuste manual (2026-10-17): Claude 2026-10-17 (leído en el balance por subagente Sonnet, criterio de deuda financiera con socios): depositi bancari e postali 7.461.213 + assegni 0 + danaro e valori in cassa 24.448 = 7.485.661. Bilancio consolidato al 31/12/2019; Totale disponibilità liquide 7.485.662.
```

### Liga

```text
2019: tools/cargar.mjs 2026-10-08, verificado contra roster cacheado de "2019–20 Serie A" (tools/club-league-reference/it.json), coincidencia e
```

## Gestiones

_antes de Rocco Commisso (data/gestiones/it.js):_

```text
Commisso: compra oficializada el 6/6/2019; presidente hasta su muerte, el 16/1/2026.
```

## Fuentes

### (general)

```text
Fuentes de cada ejercicio: las agrega tools/cargar.mjs adentro de este bloque (Versión 379: hasta la 378 el esqueleto no lo traía y la
primera carga de un club dado de alta por script se revertía, "no encontré Object.assign(sources, {"; caso: Fortaleza CEIF).
```

### fiorentina-it-bilancio-2024-25

_note (data/):_

```text
Cargado por tools/cargar.mjs (2026-10-08) desde la transcripción Clubes/Italia/Fiorentina/Fiorentina-bilancio-2024-25.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### fiorentina-it-bilancio-2023-24

_note (data/):_

```text
Cargado por tools/cargar.mjs (2026-10-08) desde la transcripción Clubes/Italia/Fiorentina/Fiorentina-bilancio-2023-24.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### fiorentina-it-bilancio-2021-22-issuu

_note (data/):_

```text
Cargado por tools/cargar.mjs (2026-10-08) desde la transcripción Clubes/Italia/Fiorentina/Fiorentina-bilancio-2021-22-issuu.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### fiorentina-it-bilancio-2020-21-issuu

_note (data/):_

```text
Cargado por tools/cargar.mjs (2026-10-08) desde la transcripción Clubes/Italia/Fiorentina/Fiorentina-bilancio-2020-21-issuu.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### fiorentina-it-bilancio-consolidato-2019-issuu

_note (data/):_

```text
Cargado por tools/cargar.mjs (2026-10-08) desde la transcripción Clubes/Italia/Fiorentina/Fiorentina-bilancio-consolidato-2019-issuu.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.
```

### fiorentina-it-bilancio-2020-giu-issuu

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-21) desde la transcripción Clubes/Italia/Fiorentina/Fiorentina-bilancio-2020-giu-issuu.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```
