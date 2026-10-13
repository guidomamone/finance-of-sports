# torino-it — evidencia de carga

Lo que había como comentario en `data/torino-it-data.js`, movido tal cual por `tools/mover-comentarios-data.mjs` (la regla:
`Admin/CONVENCIONES-DATOS.md`, "data/<club>-data.js NO LLEVA COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y
meta. Las notas de cada fila van en una tabla con su número de fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
============================================================================
data/torino-it-data.js — Torino Football Club S.p.A. (Italia).
ALTA POR SCRIPT (tools/alta-club.mjs, 2026-10-07), SIN EJERCICIOS CARGADOS TODAVÍA:
las estructuras de abajo están vacías a propósito. Los rubros, los totales
oficiales y el resto del fiscalYearMeta los agrega la etapa de carga
(tools/proponer-carga.mjs / sesión de onboarding), que es también la que
reemplaza esta cabecera por la de siempre (fuente, perímetro, categorización).

Documento que originó el alta: Clubes/Italia/Torino/Torino-bilancio-2024.pdf

De dónde salió cada campo (estado según alta-club.mjs: ok / pendiente):
  id                 ok        "torino-it" — slug de "Torino" + '-it' (convención de clubId, Admin/CONVENCIONES.md Versión 129)
  name               ok        "Torino Football Club S.p.A." — el .md, 4 veces (nombre del club + forma societaria)
  displayName        ok        "Torino" — nombre de la carpeta del club en Clubes/
  country            ok        "IT" — carpeta de país "Italia" (tabla PAISES)
  reportingCurrency  ok        "EUR" — moneda de curso legal de Italia
  fiscalYearStart    ok        "01-01" — cierre del ejercicio: contenido del .md (131 de 134 fechas de fin de mes caen en el mes 12)
  sport              ok        "futbol" — el .md nombra el fútbol 7 veces y ningún otro deporte más que eso
  brandColor         pendiente (ausente) — tools/brand-color-reference/ (footylogos): [italia] torino: #ECAC00 Orange, #8B2A1F Dark Red, #5B8CC1 Blue, #FFFFFF White
  anio               ok        2024 — nombre del archivo (misma regla que onboard.mjs --quien), confirmado por las fechas de cierre del .md
  cierre             ok        "2024-12-31" — año del ejercicio + mes de cierre (contenido del .md (131 de 134 fechas de fin de mes caen en el mes 12))
  reportType         ok        "official_balance_sheet" — el .md tiene un estado contable (resultados / balance) y el nombre del archivo no sugiere otro tipo
  perimetro          ok        "individual" — ajuste manual (Admin/ajustes-manuales.jsonl, perimetro-senales 2026-10-06): perimetro-senales.mjs: 0 documento(s) con los dos estados votan —; 3 ejerc
  currency           ok        "EUR" — moneda de curso legal de Italia (tabla PAISES de alta-club.mjs)
  fxRef              ok        "EUR@2024-12-31" — el documento no declara tipo de cambio; FX_CLOSE ya tiene EUR@2024-12-31 = 0.9626 (Cierre BCE al 31/12/2024 (1 EUR = 1,0389 USD))
  sourceId           ok        "torino-it-bilancio-2024" — clubId + nombre del archivo en slug
  liga               ok        "it-seriea" — roster cacheado de "2024–25 Serie A" (tools/club-league-reference/it.json), coincidencia exacta "Torino"

FISCAL YEAR META PROPUESTO para 2024 (NO registrado: un ejercicio con meta y
sin rubros se vería en el sitio como un año en cero, y "sin dato no es cero"):
  2024: {"reportType":"official_balance_sheet","currency":"EUR","fxRef":"EUR@2024-12-31","sourceId":"torino-it-bilancio-2024"}
============================================================================
```

_de data/clubs.js:_

```text
Torino: alta por tools/alta-club.mjs (2026-10-07) desde Clubes/Italia/Torino/Torino-bilancio-2024.pdf.
brandColor y su procedencia: fuentes/Italia/Torino.md.
```

_de data/club-leagues/it.js:_

```text
Torino (alta-club.mjs, 2026-10-07): verificado contra roster cacheado de "2024–25 Serie A" (tools/club-league-reference/it.json), coincidencia exacta "Torino".
```

## 2025

### Ingresos

```text
2025: cargado por tools/cargar.mjs (2026-10-08) desde Clubes/Italia/Torino/Torino-bilancio-2025.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Italia/Torino/Torino-bilancio-2025.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Ricavi biglietteria gare nazionali e amichevoli | pág. 46, precedente |
| 2 | Abbonamenti | pág. 46, precedente |
| 3 | a) contributi in conto esercizio | pág. 15, precedente |
| 4 | b) proventi da sponsorizzazioni | pág. 15, Jev 1 |
| 5 | c) proventi pubblicitari | pág. 15, precedente |
| 6 | d) proventi commerciali e royalties | pág. 15, precedente |
| 7 | e) proventi da cessione diritti audiovisivi | pág. 15, precedente |
| 8 | f) ricavi da cessione temporanea prestazioni calciatori | pág. 15, precedente |
| 9 | g) plusvalenze da cessione diritti pluriennali prestazioni calciatori | pág. 15, precedente |
| 10 | h) altri proventi da trasferimento diritti calciatori | pág. 15, precedente |
| 11 | i) ricavi e proventi diversi | pág. 15, precedente |

### Gastos

```text
tools/cargar.mjs (2026-10-08)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Materiale tecnico (divise ufficiali) | pág. 48, precedente |
| 2 | Materiale di consumo e altri materiali | pág. 48, precedente |
| 3 | Costi per tesserati | pág. 48, precedente |
| 4 | Costi per attività sportiva | pág. 48, precedente |
| 5 | Costi specifici tecnici | pág. 48, precedente |
| 6 | Costi vitto, alloggio, trasporti, lavanderia | pág. 48, precedente |
| 7 | Costi assicurativi | pág. 48, precedente |
| 8 | Costi gestione impianti ed eventi sportivi | pág. 48, precedente |
| 9 | Costi per l’energia | pág. 48, precedente |
| 10 | Spese amministrative, commerciali e generali | pág. 48, Jev 1 |
| 11 | Concessioni campi sportivi | pág. 49, precedente |
| 12 | Altri | pág. 49, precedente |
| 13 | a) salari e stipendi | pág. 15, precedente |
| 14 | b) oneri sociali | pág. 15, precedente |
| 15 | c) trattamento fine rapporto | pág. 15, precedente |
| 16 | e) altri costi | pág. 15, precedente |
| 17 | a) amm.ti immob. immateriali | pág. 15, precedente |
| 18 | b) amm.ti immob. materiali | pág. 15, precedente |
| 19 | c) svalutazione delle immobilizzazioni | pág. 15, precedente |
| 20 | d) svalut.crediti di attivo circ. e disp.l. | pág. 15, precedente |
| 21 | 12) accantonamenti per rischi | pág. 15, precedente |
| 22 | 13) altri accantonamenti | pág. 15, precedente |
| 23 | a) oneri da organizzazione competizioni | pág. 15, precedente |
| 24 | b) costi da cessione temporanea prestazioni calciatori | pág. 15, precedente |
| 25 | c) minusvalenze da cessione diritti pluriennali prestazioni calciatori | pág. 15, precedente |
| 26 | d) altri oneri da trasferimento diritti calciatori | pág. 15, precedente |
| 27 | e) altri oneri diversi di gestione | pág. 15, precedente |

### Meta

```text
tools/cargar.mjs (2026-10-08). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
2025: verificado 2026-10-09 contra roster cacheado de "2025–26 Serie A" (cierre 31/12/2025) (tools/club-league-reference/it.json), "Torino"
```

## 2024

### Ingresos

```text
2024: cargado por tools/cargar.mjs (2026-10-07) desde Clubes/Italia/Torino/Torino-bilancio-2024.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Italia/Torino/Torino-bilancio-2024.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Ricavi biglietteria gare nazionali e amichevoli | pág. 43, Jev 1 |
| 2 | Abbonamenti | pág. 43, Jev 1 |
| 3 | a) contributi in conto esercizio | pág. 15, Jev 0.97 |
| 4 | Sponsor Ufficiali e Tecnico | pág. 43, Jev 1 |
| 5 | Altri proventi da sponsorizzazione | pág. 43, Jev 1 |
| 6 | c) proventi pubblicitari | pág. 15, Jev 1 |
| 7 | d) proventi commerciali e royalties | pág. 15, Jev 1 |
| 8 | e) proventi da cessione diritti audiovisivi | pág. 15, Jev 1 |
| 9 | f) ricavi da cessione temporanea prestazioni calciatori | pág. 15, Jev 0.99 |
| 10 | g) plusvalenze da cessione diritti pluriennali prestazioni calciatori | pág. 15, Jev 1 |
| 11 | h) altri proventi da trasferimento diritti calciatori | pág. 15, Jev 1 |
| 12 | i) ricavi e proventi diversi | pág. 15, Jev 1 |

### Gastos

```text
tools/cargar.mjs (2026-10-07)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Materiale tecnico (divise ufficiali) | pág. 45, precedente |
| 2 | Materiale di consumo e altri materiali | pág. 45, precedente |
| 3 | Costi per tesserati | pág. 45, precedente |
| 4 | Costi per attività sportiva | pág. 45, precedente |
| 5 | Costi specifici tecnici | pág. 45, Jev 0.93 |
| 6 | Costi vitto, alloggio, trasporti, lavanderia | pág. 45, Jev 0.94 |
| 7 | Costi assicurativi | pág. 45, Jev 0.99 |
| 8 | Costi gestione impianti ed eventi sportivi | pág. 45, Jev 0.97 |
| 9 | Costi per l’energia | pág. 45, Jev 0.96 |
| 10 | Costi amministrativi e generali | pág. 45, Jev 1 |
| 11 | Concessioni campi sportivi | pág. 46, precedente |
| 12 | Altri | pág. 46, Jev 0.94 |
| 13 | a) salari e stipendi | pág. 15, Jev 1 |
| 14 | b) oneri sociali | pág. 15, Jev 0.98 |
| 15 | c) trattamento fine rapporto | pág. 15, Claude 0.8 |
| 16 | e) altri costi | pág. 15, precedente |
| 17 | a) amm.ti immob. immateriali | pág. 15, precedente |
| 18 | b) amm.ti immob. materiali | pág. 15, Jev 1 |
| 19 | c) svalutazione delle immobilizzazioni | pág. 15, Jev 0.97 |
| 20 | d) svalut.crediti di attivo circ. e disp.l. | pág. 15, Jev 1 |
| 21 | 12) accantonamenti per rischi | pág. 15, Jev 0.96 |
| 22 | 13) altri accantonamenti | pág. 15, Claude 0.8 |
| 23 | Spese per gare ufficiali | pág. 47, Jev 1 |
| 24 | Contributo UEFA Europa League | pág. 47, precedente |
| 25 | b) costi da cessione temporanea prestazioni calciatori | pág. 15, Claude 0.85 |
| 26 | c) minusvalenze da cessione diritti pluriennali prestazioni calciatori | pág. 15, Jev 0.99 |
| 27 | d) altri oneri da trasferimento diritti calciatori | pág. 15, Jev 0.98 |
| 28 | e) altri oneri diversi di gestione | pág. 15, Jev 0.97 |

### Meta

```text
2024: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): fila = (3.226.978). Guido 2026-10-07: el 17) 'Interessi e altri oneri finanziari' se imprime en positivo y se resta por posición (TOTALE (C) = 15+16-17 = (2.788.248)); la etapa 6 lo sumaba como ingreso (to-do 155)
tools/cargar.mjs (2026-10-07). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

## 2023

### Ingresos

```text
2023: cargado por tools/cargar.mjs (2026-10-08) desde Clubes/Italia/Torino/Torino-bilancio-2023.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Italia/Torino/Torino-bilancio-2023.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Ricavi biglietteria gare nazionali e amichevoli | pág. 44, precedente |
| 2 | Abbonamenti | pág. 44, precedente |
| 3 | a) contributi in conto esercizio | pág. 15, precedente |
| 4 | Sponsor Ufficiali e Tecnico | pág. 44, precedente |
| 5 | Altri proventi da sponsorizzazione | pág. 44, precedente |
| 6 | c) proventi pubblicitari | pág. 15, precedente |
| 7 | d) proventi commerciali e royalties | pág. 15, precedente |
| 8 | e) proventi da cessione diritti audiovisivi | pág. 15, precedente |
| 9 | f) ricavi da cessione temporanea prestazioni calciatori | pág. 15, precedente |
| 10 | g) plusvalenze da cessione diritti pluriennali prestazioni calciatori | pág. 15, precedente |
| 11 | h) altri proventi da trasferimento diritti calciatori | pág. 15, precedente |
| 12 | i) ricavi e proventi diversi | pág. 15, precedente |

### Gastos

```text
tools/cargar.mjs (2026-10-08)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Materiale tecnico (divise ufficiali) | pág. 46, precedente |
| 2 | Materiale di consumo e altri materiali | pág. 46, precedente |
| 3 | Costi per tesserati | pág. 46, precedente |
| 4 | Costi per attività sportiva | pág. 46, precedente |
| 5 | Costi specifici tecnici | pág. 46, precedente |
| 6 | Costi vitto, alloggio, locomozione gare, lavanderia | pág. 46, precedente |
| 7 | Costi assicurativi | pág. 46, precedente |
| 8 | Costi gestione impianti ed eventi sportivi | pág. 46, precedente |
| 9 | Costi per l’energia | pág. 46, precedente |
| 10 | Costi amministrativi e generali | pág. 46, precedente |
| 11 | Concessioni campi sportivi | pág. 47, precedente |
| 12 | Altri | pág. 47, precedente |
| 13 | a) salari e stipendi | pág. 15, precedente |
| 14 | b) oneri sociali | pág. 15, precedente |
| 15 | c) trattamento fine rapporto | pág. 15, precedente |
| 16 | e) altri costi | pág. 15, precedente |
| 17 | a) amm.ti immob. immateriali | pág. 15, precedente |
| 18 | b) amm.ti immob. materiali | pág. 15, precedente |
| 19 | c) svalutazione delle immobilizzazioni | pág. 15, precedente |
| 20 | d) svalut.crediti di attivo circ. e disp.l. | pág. 15, precedente |
| 21 | 12) accantonamenti per rischi | pág. 15, precedente |
| 22 | 13) altri accantonamenti | pág. 15, precedente |
| 23 | a) oneri da organizzazione competizioni | pág. 15, precedente |
| 24 | b) costi da cessione temporanea prestazioni calciatori | pág. 15, precedente |
| 25 | c) minusvalenze da cessione diritti pluriennali prestazioni calciatori | pág. 15, precedente |
| 26 | d) altri oneri da trasferimento diritti calciatori | pág. 15, precedente |
| 27 | e) altri oneri diversi di gestione | pág. 15, precedente |

### Meta

```text
2019: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-08): fila = (609.108). el 17) se imprime en positivo y se resta por posición (TOTALE C = 15+16-17 = (108.044), L648); la fila perdió la etiqueta con '17)'
tools/cargar.mjs (2026-10-08). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
2023: tools/cargar.mjs 2026-10-08, verificado contra roster cacheado de "2023–24 Serie A" (tools/club-league-reference/it.json), coincidencia e
```

## 2022

### Ingresos

```text
2022: cargado por tools/cargar.mjs (2026-10-08) desde Clubes/Italia/Torino/Torino-bilancio-2022.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Italia/Torino/Torino-bilancio-2022.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Ricavi biglietteria gare nazionali e amichevoli | pág. 46, precedente |
| 2 | Abbonamenti | pág. 46, precedente |
| 3 | Ricavi da gare di squadre minori | pág. 46, precedente |
| 4 | a) contributi in conto esercizio | pág. 18, precedente |
| 5 | Sponsor Ufficiali e Tecnico | pág. 47, precedente |
| 6 | Altri proventi da sponsorizzazione | pág. 47, precedente |
| 7 | c) proventi pubblicitari | pág. 18, precedente |
| 8 | d) proventi commerciali e royalties | pág. 18, precedente |
| 9 | e) proventi da cessione diritti audiovisivi | pág. 18, precedente |
| 10 | f) ricavi da cessione temporanea prestazioni calciatori | pág. 18, precedente |
| 11 | g) plusvalenze da cessione diritti pluriennali prestazioni calciatori | pág. 18, precedente |
| 12 | h) altri proventi da trasferimento diritti calciatori | pág. 18, precedente |
| 13 | i) ricavi e proventi diversi | pág. 18, precedente |

### Gastos

```text
tools/cargar.mjs (2026-10-08)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Materiale tecnico (divise ufficiali) | pág. 48, precedente |
| 2 | Materiale di consumo e altri materiali | pág. 48, precedente |
| 3 | Costi per tesserati | pág. 49, precedente |
| 4 | Costi per attività sportiva | pág. 49, precedente |
| 5 | Costi specifici tecnici | pág. 49, precedente |
| 6 | Costi vitto, alloggio, locomozione gare, lavanderia | pág. 49, precedente |
| 7 | Costi assicurativi | pág. 49, precedente |
| 8 | Costi gestione impianti ed eventi sportivi | pág. 49, precedente |
| 9 | Costi per l'energia | pág. 49, precedente |
| 10 | Costi amministrativi, pubblicitari e generali | pág. 49, precedente |
| 11 | Affitto campi sportivi | pág. 50, precedente |
| 12 | Affitto sede ed altri locali | pág. 50, precedente |
| 13 | Altri | pág. 50, precedente |
| 14 | a) salari e stipendi | pág. 18, precedente |
| 15 | b) oneri sociali | pág. 18, precedente |
| 16 | c) trattamento fine rapporto | pág. 18, precedente |
| 17 | e) altri costi | pág. 18, precedente |
| 18 | a) amm.ti immob. immateriali | pág. 18, precedente |
| 19 | b) amm.ti immob. materiali | pág. 18, precedente |
| 20 | c) svalutazione delle immobilizzazioni | pág. 18, precedente |
| 21 | d) svalut.crediti di attivo circ. e disp.l. | pág. 18, precedente |
| 22 | 12) accantonamenti per rischi | pág. 18, precedente |
| 23 | 13) altri accantonamenti | pág. 18, precedente |
| 24 | a) oneri da organizzazione competizioni | pág. 18, precedente |
| 25 | b) costi da cessione temporanea prestazioni calciatori | pág. 18, precedente |
| 26 | c) minusvalenze da cessione diritti pluriennali prestazioni calciatori | pág. 18, precedente |
| 27 | d) altri oneri da trasferimento diritti calciatori | pág. 18, precedente |
| 28 | e) altri oneri diversi di gestione | pág. 18, precedente |

### Meta

```text
tools/cargar.mjs (2026-10-08). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
2022: tools/cargar.mjs 2026-10-08, verificado contra roster cacheado de "2022–23 Serie A" (tools/club-league-reference/it.json), coincidencia e
```

## 2021

### Ingresos

```text
2021: cargado por tools/cargar.mjs (2026-10-07) desde Clubes/Italia/Torino/Torino-bilancio-2021.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Italia/Torino/Torino-bilancio-2021.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Ricavi biglietteria gare nazionali e amichevoli | pág. 47, Jev 1 |
| 2 | Abbonamenti | pág. 47, Jev 1 |
| 3 | Ricavi da gare di squadre minori | pág. 47, ? 0.6 |
| 4 | a) contributi in conto esercizio | pág. 19, Jev 0.97 |
| 5 | Sponsor Ufficiali e Tecnico | pág. 48, Jev 1 |
| 6 | Altri proventi da sponsorizzazione | pág. 48, Jev 1 |
| 7 | c) proventi pubblicitari | pág. 19, Jev 1 |
| 8 | d) proventi commerciali e royalties | pág. 19, Jev 1 |
| 9 | e) proventi da cessione diritti audiovisivi | pág. 19, Jev 1 |
| 10 | f) ricavi da cessione temporanea prestazioni calciatori | pág. 19, Jev 0.99 |
| 11 | g) plusvalenze da cessione diritti pluriennali prestazioni calciatori | pág. 19, Jev 1 |
| 12 | h) altri proventi da trasferimento diritti calciatori | pág. 19, Jev 1 |
| 13 | i) ricavi e proventi diversi | pág. 19, Jev 1 |

### Gastos

```text
tools/cargar.mjs (2026-10-07)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Materiale tecnico (divise ufficiali) | pág. 50, precedente |
| 2 | Materiale di consumo e altri materiali | pág. 50, precedente |
| 3 | Costi per tesserati | pág. 50, precedente |
| 4 | Costi per attività sportiva | pág. 50, precedente |
| 5 | Costi specifici tecnici | pág. 50, Jev 0.93 |
| 6 | Costi vitto, alloggio, locomozione gare, lavanderia | pág. 50, Claude 0.88 |
| 7 | Costi assicurativi | pág. 50, Jev 0.99 |
| 8 | Costi gestione impianti ed eventi sportivi | pág. 50, Jev 0.97 |
| 9 | Costi produzione televisiva | pág. 50, precedente |
| 10 | Costi amministrativi, pubblicitari e generali | pág. 50, Jev 1 |
| 11 | Affitto campi sportivi | pág. 51, Jev 0.96 |
| 12 | Affitto sede ed altri locali | pág. 51, Jev 0.96 |
| 13 | Altri | pág. 51, Jev 0.94 |
| 14 | a) salari e stipendi | pág. 19, Jev 1 |
| 15 | b) oneri sociali | pág. 19, Jev 0.98 |
| 16 | c) trattamento fine rapporto | pág. 19, Claude 0.8 |
| 17 | e) altri costi | pág. 19, precedente |
| 18 | a) amm.ti immob. immateriali | pág. 19, precedente |
| 19 | b) amm.ti immob. materiali | pág. 19, Jev 1 |
| 20 | c) svalutazione delle immobilizzazioni | pág. 19, Jev 0.97 |
| 21 | d) svalut.crediti di attivo circ. e disp.l. | pág. 19, Jev 1 |
| 22 | 12) accantonamenti per rischi | pág. 19, Jev 0.96 |
| 23 | 13) altri accantonamenti | pág. 19, Claude 0.8 |
| 24 | a) oneri da organizzazione competizioni | pág. 19, Jev 1 |
| 25 | b) costi da cessione temporanea prestazioni calciatori | pág. 19, Claude 0.85 |
| 26 | c) minusvalenze da cessione diritti pluriennali prestazioni calciatori | pág. 19, Jev 0.99 |
| 27 | d) altri oneri da trasferimento diritti calciatori | pág. 19, Jev 0.98 |
| 28 | e) altri oneri diversi di gestione | pág. 19, Jev 0.97 |

### Meta

```text
2021: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): fila = (940.101). Guido 2026-10-07: el 17) 'Interessi e altri oneri finanziari' se imprime en positivo y se resta por posición (TOTALE (C) = 15+16-17); la etapa 6 lo sumaba como ingreso (to-do 155)
tools/cargar.mjs (2026-10-07). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
2021: tools/cargar.mjs 2026-10-07, verificado contra roster cacheado de "2021–22 Serie A" (tools/club-league-reference/it.json), coincidencia e
```

## 2020

### Ingresos

```text
2020: cargado por tools/cargar.mjs (2026-10-08) desde Clubes/Italia/Torino/Torino-bilancio-2020.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Italia/Torino/Torino-bilancio-2020.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Ricavi biglietteria gare nazionali e amichevoli | pág. 45, precedente |
| 2 | Abbonamenti | pág. 45, precedente |
| 3 | Ricavi da gare di squadre minori | pág. 45, precedente |
| 4 | Sponsor Ufficiali e Tecnico | pág. 45, precedente |
| 5 | Altri proventi da sponsorizzazione | pág. 45, precedente |
| 6 | Proventi pubblicitari generati dalla concessionaria Cairo Pubblicità | pág. 45, precedente |
| 7 | Proventi radiotelevisivi | pág. 45, precedente |
| 8 | Rimborso costi per produzioni televisive | pág. 45, precedente |
| 9 | Altri ricavi | pág. 45, precedente |
| 10 | Ricavi da cessione temporanea calciatori | pág. 45, precedente |
| 11 | Plusvalenze da cessione diritti pluriennali prestazioni calciatori | pág. 45, precedente |
| 12 | Contributi di solidarietà/Indennità formazione | pág. 45, precedente |

### Gastos

```text
tools/cargar.mjs (2026-10-08)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Materiale tecnico (divise ufficiali) | pág. 47, precedente |
| 2 | Materiale di consumo e altri materiali | pág. 47, precedente |
| 3 | Costi per tesserati | pág. 48, precedente |
| 4 | Costi per attività sportiva | pág. 48, precedente |
| 5 | Costi specifici tecnici | pág. 48, precedente |
| 6 | Costi vitto, alloggio, locomozione gare, lavanderia | pág. 48, precedente |
| 7 | Costi assicurativi | pág. 48, precedente |
| 8 | Costi gestione impianti ed eventi sportivi | pág. 48, precedente |
| 9 | Costi produzione televisiva | pág. 48, precedente |
| 10 | Costi amministrativi, pubblicitari e generali | pág. 48, precedente |
| 11 | Affitto campi sportivi | pág. 49, precedente |
| 12 | Affitto sede ed altri locali | pág. 49, precedente |
| 13 | Altri | pág. 49, precedente |
| 14 | a) salari e stipendi | pág. 17, precedente |
| 15 | b) oneri sociali | pág. 17, precedente |
| 16 | c) trattamento fine rapporto | pág. 17, precedente |
| 17 | e) altri costi | pág. 17, precedente |
| 18 | a) amm.ti immob. immateriali | pág. 17, precedente |
| 19 | b) amm.ti immob. materiali | pág. 17, precedente |
| 20 | c) svalutazione delle immobilizzazioni | pág. 17, precedente |
| 21 | d) svalut.crediti di attivo circ. e disp.l. | pág. 17, precedente |
| 22 | 12) accantonamenti per rischi | pág. 17, precedente |
| 23 | Corrispettivi per acquisizioni temporanee di calciatori | pág. 50, Jev 0.98 |
| 24 | Minusvalenze da cessione diritti pluriennali prestazioni calciatori | pág. 50, precedente |
| 25 | Spese per gare ufficiali | pág. 50, precedente |
| 26 | Contributo UEFA Europa League | pág. 50, precedente |
| 27 | Percentuale incassi bigliettazione squadra ospite | pág. 50, precedente |
| 28 | Altri oneri | pág. 50, precedente |

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
2019: cargado por tools/cargar.mjs (2026-10-09) desde Clubes/Italia/Torino/Torino-bilancio-2019.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Italia/Torino/Torino-bilancio-2019.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Ricavi biglietteria gare nazionali e amichevoli | pág. 36, precedente |
| 2 | Ricavi biglietteria gare internazionali | pág. 36, Jev 1 |
| 3 | Abbonamenti | pág. 36, precedente |
| 4 | Ricavi da gare di squadre minori | pág. 36, precedente |
| 5 | Sponsor Ufficiali e Tecnico | pág. 36, precedente |
| 6 | Altri proventi da sponsorizzazione | pág. 36, precedente |
| 7 | Proventi pubblicitari generati dalla concessionaria Cairo Pubblicità | pág. 36, precedente |
| 8 | Proventi radiotelevisivi | pág. 36, precedente |
| 9 | Rimborso costi per produzioni televisive | pág. 36, ? 0.6 |
| 10 | Altri ricavi | pág. 36, precedente |
| 11 | Ricavi da cessione temporanea calciatori | pág. 36, precedente |
| 12 | Plusvalenze da cessione diritti pluriennali prestazioni calciatori | pág. 36, precedente |
| 13 | Contributi di solidarietà/Indennità formazione | pág. 36, Claude 0.85 |

### Gastos

```text
tools/cargar.mjs (2026-10-09)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Materiale tecnico (divise ufficiali) | pág. 38, precedente |
| 2 | Materiale di consumo e altri materiali | pág. 38, precedente |
| 3 | Costi per tesserati | pág. 38, precedente |
| 4 | Costi per attività sportiva | pág. 38, precedente |
| 5 | Costi specifici tecnici | pág. 38, precedente |
| 6 | Costi vitto, alloggio, locomozione gare, lavanderia | pág. 38, precedente |
| 7 | Costi assicurativi | pág. 38, precedente |
| 8 | Costi gestione impianti sportivi ed eventi | pág. 38, precedente |
| 9 | Costi produzione televisiva | pág. 38, precedente |
| 10 | Costi amministrativi, pubblicitari e generali | pág. 38, precedente |
| 11 | Corrispettivi per acquisizioni temporanee di calciatori | pág. 39, precedente |
| 12 | Affitto campi sportivi | pág. 39, precedente |
| 13 | Affitto sede ed altri locali | pág. 39, precedente |
| 14 | Altri | pág. 39, precedente |
| 15 | [sin etiqueta] Salari e stipendi | pág. 13, Jev 1 |
| 16 | [sin etiqueta] Oneri sociali | pág. 13, Jev 0.91 |
| 17 | [sin etiqueta] Trattamento di fine rapporto | pág. 13, Jev 0.95 |
| 18 | [sin etiqueta] Altri costi del personale | pág. 13, Claude 0.85 |
| 19 | [sin etiqueta] Ammortamento delle immobilizzazioni immateriali | pág. 13, Claude 0.9 |
| 20 | [sin etiqueta] Ammortamento delle immobilizzazioni materiali | pág. 13, Jev 0.99 |
| 21 | [sin etiqueta] Altre svalutazioni | pág. 13, ? 0.75 |
| 22 | [sin etiqueta] Svalutazione dei crediti | pág. 13, Jev 1 |
| 23 | [sin etiqueta] Accantonamenti | pág. 13, Jev 0.93 |
| 24 | Minusvalenze da cessione diritti pluriennali prestazioni calciatori | pág. 41, precedente |
| 25 | Altri oneri relativi alla gestione calciatori | pág. 41, Jev 0.99 |
| 26 | Spese per gare ufficiali | pág. 41, precedente |
| 27 | Contributo UEFA Europa League | pág. 41, precedente |
| 28 | Percentuale incassi bigliettazione squadra ospite | pág. 41, precedente |
| 29 | Altri oneri | pág. 41, precedente |

### Meta

```text
tools/cargar.mjs (2026-10-09). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
2019: tools/cargar.mjs 2026-10-08, verificado contra roster cacheado de "2019–20 Serie A" (tools/club-league-reference/it.json), coincidencia e
```

## 2018

### Ingresos

```text
2018: cargado por tools/cargar.mjs (2026-10-07) desde Clubes/Italia/Torino/Torino-bilancio-2018.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Italia/Torino/Torino-bilancio-2018.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Ricavi biglietteria gare nazionali e amichevoli | pág. 39, Jev 1 |
| 2 | Abbonamenti | pág. 39, Jev 1 |
| 3 | Ricavi da gare di squadre minori | pág. 39, ? 0.6 |
| 4 | Sponsor Ufficiali e Tecnico | pág. 40, Jev 1 |
| 5 | Altri proventi da sponsorizzazione | pág. 40, Jev 1 |
| 6 | Proventi pubblicitari generati dalla concessionaria Cairo Pubblicità | pág. 40, Jev 1 |
| 7 | Proventi radiotelevisivi | pág. 40, Jev 1 |
| 8 | Proventi da accesso segnale televisivo | pág. 40, Jev 1 |
| 9 | Altri ricavi | pág. 40, Jev 0.99 |
| 10 | Ricavi da cessione temporanea calciatori | pág. 40, Jev 0.98 |
| 11 | Plusvalenze da cessione diritti pluriennali prestazioni calciatori | pág. 40, Jev 0.99 |
| 12 | Contributi di solidarietà | pág. 40, ? 0.7 |

### Gastos

```text
tools/cargar.mjs (2026-10-07)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | per materie prime,sussid. e di consumo | pág. 14, Jev 1 |
| 2 | Costi per tesserati | pág. 42, precedente |
| 3 | Costi per attività sportiva | pág. 42, precedente |
| 4 | Costi specifici tecnici | pág. 42, Jev 0.93 |
| 5 | Costi vitto, alloggio, locomozione gare, lavanderia | pág. 42, Claude 0.9 |
| 6 | Costi assicurativi | pág. 42, Jev 0.99 |
| 7 | Costi gestione impianti sportivi ed eventi | pág. 42, precedente |
| 8 | Costi produzione televisiva | pág. 42, precedente |
| 9 | Costi amministrativi, pubblicitari e generali | pág. 42, Jev 1 |
| 10 | Corrispettivi per acquisizioni temporanee di calciatori | pág. 43, Jev 0.98 |
| 11 | Affitto campi sportivi | pág. 43, Jev 0.96 |
| 12 | Affitto sede ed altri locali | pág. 43, Jev 0.96 |
| 13 | Altri | pág. 43, Jev 0.94 |
| 14 | a) salari e stipendi | pág. 14, Jev 1 |
| 15 | b) oneri sociali | pág. 14, Jev 0.98 |
| 16 | c) trattamento fine rapporto | pág. 14, Claude 0.8 |
| 17 | e) altri costi | pág. 14, precedente |
| 18 | a) amm.ti immob. immateriali | pág. 14, precedente |
| 19 | b) amm.ti immob. materiali | pág. 14, Jev 1 |
| 20 | c) svalutazione delle immobilizzazioni | pág. 14, Jev 0.97 |
| 21 | d) svalut.crediti di attivo circ. e disp.l. | pág. 14, Jev 1 |
| 22 | accantonamenti per rischi | pág. 14, Jev 0.97 |
| 23 | Minusvalenze | pág. 45, Jev 0.92 |
| 24 | Spese per gare ufficiali | pág. 45, Jev 1 |
| 25 | Contributo UEFA Europa League | pág. 45, precedente |
| 26 | Percentuale incassi bigliettazione squadra ospite | pág. 45, Jev 0.98 |
| 27 | Altri oneri | pág. 45, Jev 0.99 |

### Meta

```text
2018: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): fila = (400.771). Guido 2026-10-07: el 17) 'Interessi e altri oneri finanziari' se imprime en positivo y se resta por posición (TOTALE (C) = 15+16-17); la etapa 6 lo sumaba como ingreso (to-do 155)
tools/cargar.mjs (2026-10-07). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
2018: tools/cargar.mjs 2026-10-07, verificado contra roster cacheado de "2018–19 Serie A" (tools/club-league-reference/it.json), coincidencia e
```

## Fuentes

### (general)

```text
Fuentes de cada ejercicio: las agrega tools/cargar.mjs adentro de este bloque (Versión 379: hasta la 378 el esqueleto no lo traía y la
primera carga de un club dado de alta por script se revertía, "no encontré Object.assign(sources, {"; caso: Fortaleza CEIF).
```

### torino-it-bilancio-2018

_note (data/):_

```text
Cargado por tools/cargar.mjs (2026-10-07) desde la transcripción Clubes/Italia/Torino/Torino-bilancio-2018.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### torino-it-bilancio-2021

_note (data/):_

```text
Cargado por tools/cargar.mjs (2026-10-07) desde la transcripción Clubes/Italia/Torino/Torino-bilancio-2021.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### torino-it-bilancio-2024

_note (data/):_

```text
Cargado por tools/cargar.mjs (2026-10-07) desde la transcripción Clubes/Italia/Torino/Torino-bilancio-2024.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### torino-it-bilancio-2022

_note (data/):_

```text
Cargado por tools/cargar.mjs (2026-10-08) desde la transcripción Clubes/Italia/Torino/Torino-bilancio-2022.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### torino-it-bilancio-2019

_note (data/):_

```text
Cargado por tools/cargar.mjs (2026-10-08) desde la transcripción Clubes/Italia/Torino/Torino-bilancio-2019.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### torino-it-bilancio-2023

_note (data/):_

```text
Cargado por tools/cargar.mjs (2026-10-08) desde la transcripción Clubes/Italia/Torino/Torino-bilancio-2023.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### torino-it-bilancio-2020

_note (data/):_

```text
Cargado por tools/cargar.mjs (2026-10-08) desde la transcripción Clubes/Italia/Torino/Torino-bilancio-2020.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### torino-it-bilancio-2025

_note (data/):_

```text
Cargado por tools/cargar.mjs (2026-10-08) desde la transcripción Clubes/Italia/Torino/Torino-bilancio-2025.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```
