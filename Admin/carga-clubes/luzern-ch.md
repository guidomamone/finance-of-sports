# luzern-ch — evidencia de carga

Lo que antes iba como comentario en el data file del club, `data/<país>/luzern-ch-data.js` (la regla: `Admin/CONVENCIONES-DATOS.md`, "data/<país>/<club>-data.js NO LLEVA
COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y meta. Las notas de cada fila van en una tabla con su número de
fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
Luzern: alta por tools/alta-club.mjs (2026-10-19) desde Clubes/Suiza/Luzern/geschaeftsbericht-2024-25.pdf. brandColor #00519E
(procedencia en Admin/sourcing/Suiza/Luzern.md; tools/cargar-lote.mjs).
```

```text
data/ch/luzern-ch-data.js — FCL Holding AG (Suiza).
ALTA POR SCRIPT (tools/alta-club.mjs, 2026-10-19), SIN EJERCICIOS CARGADOS TODAVÍA: las estructuras del data file
nacen vacías a propósito. Los rubros, los totales oficiales y el resto del fiscalYearMeta los agrega la etapa de carga.

Documento que originó el alta: Clubes/Suiza/Luzern/geschaeftsbericht-2024-25.pdf

De dónde salió cada campo (estado según alta-club.mjs: ok / pendiente):
  id                 ok        "luzern-ch" — slug de "Luzern" + '-ch' (convención de clubId, Admin/CONVENCIONES.md Versión 129)
  name               ok        "FCL Holding AG" — ajuste manual (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-18): el documento es la Konzernrechnung de la FCL Holding AG, que consolida a FC
  displayName        ok        "Luzern" — nombre de la carpeta del club en Clubes/
  country            ok        "CH" — carpeta de país "Suiza" (tabla PAISES)
  reportingCurrency  ok        "CHF" — moneda de curso legal de Suiza
  fiscalYearStart    ok        "07-01" — cierre del ejercicio: ajuste manual (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-18): la FC LUZERN Gruppe 'per 30. Juni 2025' (ejercicio 20
  sport              ok        "futbol" — el .md nombra el fútbol 51 veces y ningún otro deporte más que eso
  brandColor         pendiente (ausente) — la liga del club no está en tools/brand-color-reference/ (o el club no está en footylogos)
  anio               ok        2025 — ajuste manual (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-18): la FC LUZERN Gruppe 'per 30. Juni 2025' (ejercicio 2024-25)
  cierre             ok        "2025-06-30" — año del ejercicio + mes de cierre (ajuste manual (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-18): la FC LUZERN Gruppe 'per 30. Juni 2025' 
  reportType         ok        "official_balance_sheet" — el .md tiene un estado contable (resultados / balance) y el nombre del archivo no sugiere otro tipo
  perimetro          ok        "consolidado" — ajuste manual (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-19): Konzernrechnung de la FCL Holding AG: consolida a FC Luzern-Innerschweiz AG
  currency           ok        "CHF" — moneda de curso legal de Suiza (tabla PAISES de alta-club.mjs)
  fxRef              ok        "CHF@2025-06-30" — el documento no declara tipo de cambio; tools/fx-reference/ (lookup-fx-close.js): 0.7938. --escribir agrega 'CHF@2025-06-30' a FX_CLOSE
  sourceId           ok        "luzern-ch-geschaeftsbericht-2024-25" — clubId + nombre del archivo en slug
  liga               ok        "ch-superleague" — roster cacheado de "2024–25 Swiss Super League" (tools/club-league-reference/ch.json), coincidencia exacta "Luzern"

FISCAL YEAR META PROPUESTO para 2025 (NO registrado: un ejercicio con meta y
sin rubros se vería en el sitio como un año en cero, y "sin dato no es cero"):
  2025: {"reportType":"official_balance_sheet","currency":"CHF","fxRef":"CHF@2025-06-30","sourceId":"luzern-ch-geschaeftsbericht-2024-25"}
```

## 2025

### Ingresos

```text
2025: cargado por tools/cargar.mjs (2026-10-19) desde Clubes/Suiza/Luzern/geschaeftsbericht-2024-25.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Suiza/Luzern/geschaeftsbericht-2024-25.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Matchorganisation | pág. 29, Claude 0.8 |
| 2 | Sponsoring, Werbung | pág. 29, Jev 1 |
| 3 | TV-Entschädigungen Übertragungsrechte | pág. 29, Jev 1 |
| 4 | Transferertrag | pág. 29, Jev 1 |
| 5 | Sponsoren- und Spendenbeiträge | pág. 40, precedente |
| 6 | SFV-Verbandsbeiträge | pág. 40, precedente |
| 7 | Sport Toto- und J+S-Entschädigungen | pág. 40, precedente |
| 8 | Ausbildungs- und Materialbeiträge Eltern | pág. 40, precedente |
| 9 | Anlässe (FCL-Fussballcamp, Pfingstmaster) | pág. 40, precedente |
| 10 | Diverse Einnahmen | pág. 40, Jev 0.92 |
| 11 | Konferenzen, Events swissporarena | pág. 41, Jev 0.9 |
| 12 | Grossevents | pág. 41, precedente |
| 13 | Fanshop Präsenzgeschäft | pág. 41, Jev 0.97 |
| 14 | Onlineshop, Distanzgeschäft | pág. 41, Jev 1 |
| 15 | Ausmietung Stewards | pág. 41, Jev 0.96 |
| 16 | Anpassung Delkredere | pág. 41, Jev 1 |
| 17 | Sonstiges | pág. 41, Jev 1 |
| 18 | Ausserordentlicher, einmaliger oder periodenfremder Ertrag | pág. 29, Jev 1 |
| 19 | Erfolg aus Equity-Beteiligungen | pág. 29, Jev 0.97 |
| 20 | Minderheitsanteil am Jahresergebnis | pág. 29, Jev 0.97 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Personalkosten inkl. Spesen | pág. 41, precedente |
| 2 | Sozialabgaben | pág. 41, precedente |
| 3 | Unfallversicherungsprämien | pág. 41, precedente |
| 4 | Personalkosten inkl. Spesen | pág. 41, precedente |
| 5 | Sozialabgaben | pág. 41, precedente |
| 6 | Personalkosten inkl. Spesen | pág. 41, precedente |
| 7 | Sozialabgaben | pág. 41, precedente |
| 8 | Personalkosten inkl. Spesen | pág. 41, precedente |
| 9 | Sozialabgaben | pág. 41, precedente |
| 10 | Personalkosten inkl. Spesen | pág. 41, precedente |
| 11 | Sozialabgaben | pág. 41, precedente |
| 12 | Diferencia de redondeo | pág. ?, Jev 0.98 |
| 13 | Miete und Unterhalt Stadion | pág. 42, precedente |
| 14 | Sicherheitskosten Matchtag (ohne Stewards) | pág. 42, Jev 0.9 |
| 15 | Abgaben öffentlicher Verkehr | pág. 42, Jev 0.91 |
| 16 | Material und Medical | pág. 42, precedente |
| 17 | Ticketing und Vorverkaufsgebühren | pág. 42, Jev 0.95 |
| 18 | Aufwand 1. Mannschaften | pág. 42, precedente |
| 19 | Diverse Kosten Spielbetrieb | pág. 42, precedente |
| 20 | VIP-Cateringkosten Spieltag | pág. 42, Jev 0.95 |
| 21 | Aufwand übrige Wettbewerbe | pág. 42, Jev 0.98 |
| 22 | Rückvergütungen Lieferanten | pág. 42, precedente |
| 23 | Transferaufwand definitive Übertritte | pág. 43, Claude 0.8 |
| 24 | Spielervermittlungen und Beratungen | pág. 43, Jev 0.95 |
| 25 | Ausleih- und Ausbildungsentschädigungen | pág. 43, precedente |
| 26 | Medien, Kommunikation, Inserate | pág. 43, Jev 0.99 |
| 27 | Inhouse TV Spieltag | pág. 43, precedente |
| 28 | LED-Bandenwerbung Produktion | pág. 43, Jev 0.91 |
| 29 | Diverses | pág. 43, precedente |
| 30 | Nachwuchs-Akademie | pág. 43, Claude 0.85 |
| 31 | Anlässe (FCL-Fussballcamp, Pfingstmasters) | pág. 43, Claude 0.8 |
| 32 | Materialkosten | pág. 43, Claude 0.8 |
| 33 | Spielbetrieb und Mannschaftsaufwand | pág. 43, Claude 0.8 |
| 34 | Konferenzen / Events | pág. 43, precedente |
| 35 | Grossevents | pág. 43, precedente |
| 36 | Merchandising | pág. 29, Jev 0.95 |
| 37 | Energie, Wasser und Entsorgung | pág. 29, Claude 0.8 |
| 38 | Verwaltungsaufwand | pág. 44, Jev 1 |
| 39 | IT, Telefon, Internet und Applikationen | pág. 44, Jev 1 |
| 40 | Sachversicherungen, Abgaben und Gebühren | pág. 44, Jev 1 |
| 41 | Fahrzeug/Treibstoff | pág. 44, Jev 1 |
| 42 | Sonstiger Betriebsaufwand | pág. 44, precedente |
| 43 | Abschreibungen mobile Sachanlagen | pág. 29, Jev 0.99 |
| 44 | Ausserordentlicher, einmaliger oder periodenfremder Aufwand | pág. 29, Jev 1 |
| 45 | Abschreibungen Spielerwerte | pág. 29, precedente |
| 46 | Abschreibungen Software, E-Commerce und Markenrechte | pág. 29, precedente |

### Meta

```text
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-18): cierre = 2025-06-30. la FC LUZERN Gruppe 'per 30. Juni 2025' (ejercicio 2024-25)
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-19): perimetro = consolidado. Konzernrechnung de la FCL Holding AG: consolida a FC Luzern-Innerschweiz AG, que tiene el fútbol
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-19): fila = 1 025 811. la Nota 8 abre el renglón (1.197.018): Spielerwerte 1.025.811 (subagente Sonnet, revisado por Claude contra el .md, 2026-10-19)
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-19): fila = 171 207. la Nota 8 abre el renglón (1.197.018): Software 89.999 + 19.374, E-Commerce 11.834, Markenrechte 50.000 (subagente Sonnet, revisado por Claude contra el .md, 2026-10-19)
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-19): categoria = player_amortisation. amortización de derechos de jugadores (subagente Sonnet, revisado por Claude contra el .md, 2026-10-19)
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-19): categoria = other_amortisation. amortización de software, e-commerce y marcas (subagente Sonnet, revisado por Claude contra el .md, 2026-10-19)
tools/cargar.mjs (2026-10-19). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
alta-club.mjs (2026-10-19): ch-superleague, verificado contra roster cacheado de "2024–25 Swiss Super League" (tools/club-league-reference/ch.json), coincidencia exacta "Luzern".
```

## 2022

### Ingresos

```text
2022: cargado por tools/cargar.mjs (2026-10-19) desde Clubes/Suiza/Luzern/geschaeftsbericht-2021-22.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Suiza/Luzern/geschaeftsbericht-2021-22.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Matchorganisation | pág. 41, precedente |
| 2 | Sponsoring, Werbung | pág. 41, precedente |
| 3 | TV-Entschädigungen Übertragungsrechte | pág. 41, precedente |
| 4 | Transferertrag | pág. 41, precedente |
| 5 | Sponsoren- und Spendenbeiträge | pág. 52, precedente |
| 6 | SFV-Verbandsbeiträge | pág. 52, precedente |
| 7 | Sport Toto- und J+S-Entschädigungen | pág. 52, precedente |
| 8 | Ausbildungs- und Materialbeiträge Eltern | pág. 52, precedente |
| 9 | Anlässe (FCL-Fussballcamp, Pfingst Masters) | pág. 52, precedente |
| 10 | Diverse Einnahmen | pág. 52, precedente |
| 11 | Events | pág. 41, precedente |
| 12 | Fanshop Präsenzgeschäft | pág. 53, precedente |
| 13 | Onlineshop, Distanzgeschäft | pág. 53, precedente |
| 14 | Ausmietung Stewards | pág. 53, precedente |
| 15 | Anpassung Delkredere | pág. 53, precedente |
| 16 | Swiss-Olympic-Stabilisierungspaket | pág. 53, Jev 0.99 |
| 17 | Sonstiges | pág. 53, precedente |
| 18 | Ausserordentlicher, einmaliger oder periodenfremder Ertrag | pág. 41, precedente |
| 19 | Erfolg aus Equity-Beteiligungen | pág. 41, precedente |
| 20 | Minderheitsanteil am Jahresergebnis | pág. 41, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Personalkosten inkl. Spesen | pág. 53, precedente |
| 2 | Sozialabgaben | pág. 53, precedente |
| 3 | Versicherungsprämien | pág. 53, Claude 0.85 |
| 4 | Personalkosten inkl. Spesen | pág. 53, precedente |
| 5 | Sozialabgaben | pág. 53, precedente |
| 6 | Personalkosten inkl. Spesen | pág. 53, precedente |
| 7 | Sozialabgaben | pág. 53, precedente |
| 8 | Personalkosten inkl. Spesen | pág. 53, precedente |
| 9 | Sozialabgaben | pág. 53, precedente |
| 10 | Miete und Unterhalt Stadion | pág. 54, precedente |
| 11 | Sicherheitskosten Matchtag (ohne Stewards) | pág. 54, precedente |
| 12 | Abgaben öffentlicher Verkehr | pág. 54, precedente |
| 13 | Medical und Material | pág. 54, Jev 0.98 |
| 14 | Ticketing und Vorverkaufsgebühren | pág. 54, precedente |
| 15 | Aufwand 1. Mannschaft | pág. 54, precedente |
| 16 | Diverse Kosten Spielbetrieb | pág. 54, precedente |
| 17 | VIP-Cateringkosten Spieltag | pág. 54, precedente |
| 18 | Aufwand übriger Spielbetrieb | pág. 54, Jev 0.99 |
| 19 | Rückvergütungen Lieferanten | pág. 54, precedente |
| 20 | Transferaufwand def. Übertritte | pág. 55, Jev 0.99 |
| 21 | Spielvermittlungen und Beratungen | pág. 55, precedente |
| 22 | Ausleih- und Ausbildungsentschädigungen | pág. 55, precedente |
| 23 | Medien, Kommunikation, Inserate | pág. 55, precedente |
| 24 | Inhouse TV Spieltag | pág. 55, precedente |
| 25 | LED-Bandenwerbung Produktion | pág. 55, precedente |
| 26 | Diverses | pág. 55, precedente |
| 27 | Nachwuchs-Akademie | pág. 55, precedente |
| 28 | Anlässe (FCL-Fussballcamp, Pfingstmaster) | pág. 55, precedente |
| 29 | Materialkosten | pág. 55, precedente |
| 30 | Spielbetrieb und Mannschaftsaufwand | pág. 55, precedente |
| 31 | Events | pág. 41, Jev 0.99 |
| 32 | Merchandising | pág. 41, precedente |
| 33 | Energie, Wasser und Entsorgung | pág. 41, precedente |
| 34 | Verwaltungsaufwand | pág. 56, precedente |
| 35 | IT, Telefon, Internet und Applikationen | pág. 56, precedente |
| 36 | Sachversicherungen, Abgaben und Gebühren | pág. 56, precedente |
| 37 | Fahrzeug/Treibstoff | pág. 56, precedente |
| 38 | Sonstiger Betriebsaufwand | pág. 56, precedente |
| 39 | Abschreibungen mobile Sachanlagen | pág. 41, precedente |
| 40 | Abschreibungen immaterielle Sachanlagen | pág. 41, precedente |
| 41 | Ausserordentlicher, einmaliger oder periodenfremder Aufwand | pág. 41, precedente |

### Meta

```text
2022: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-19): cierre = 2022-06-30. El FC Luzern cierra su ejercicio el 30 de junio (fiscalYearStart 07-01; los Geschäftsbericht vecinos 2017-18, 2018-19, 2019-20 y 2024-25 dicen 30. Juni); el informe es de la temporada 2021-22
tools/cargar.mjs (2026-10-19). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
tools/cargar.mjs (2026-10-19): ch-superleague, verificado contra roster cacheado de "2021–22 Swiss Super League" (tools/club-league-reference/ch.json), coincidencia exacta "Luzern".
```

## 2020

### Ingresos

```text
2020: cargado por tools/cargar.mjs (2026-10-19) desde Clubes/Suiza/Luzern/geschaeftsbericht-2019-20.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Suiza/Luzern/geschaeftsbericht-2019-20.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Meisterschaft-Eintritte | pág. 51, Jev 1 |
| 2 | Meisterschaft VIP-Eintritte | pág. 51, Jev 1 |
| 3 | Helvetia Schweizer Cup | pág. 51, precedente |
| 4 | UEFA Clubwettbewerbe | pág. 51, precedente |
| 5 | Sonstiges | pág. 51, precedente |
| 6 | Sponsoring, Werbung | pág. 41, precedente |
| 7 | TV-Entschädigungen Übertragungsrechte | pág. 41, precedente |
| 8 | Transferertrag | pág. 41, precedente |
| 9 | Sponsoren- und Spendenbeiträge | pág. 52, precedente |
| 10 | SFV-Verbandsbeiträge | pág. 52, precedente |
| 11 | Sport-Toto- und J&S-Entschädigungen | pág. 52, precedente |
| 12 | Ausbildungs- und Materialbeiträge Eltern | pág. 52, precedente |
| 13 | Anlässe (FCL-Fussballcamp, Pfingstmaster) | pág. 52, precedente |
| 14 | Diverse Einnahmen | pág. 52, precedente |
| 15 | Events | pág. 41, precedente |
| 16 | Fanshop Präsenzgeschäft | pág. 53, precedente |
| 17 | Onlineshop, Distanzgeschäft | pág. 53, precedente |
| 18 | Unterstützungsbeitrag Stadion Luzern AG | pág. 53, precedente |
| 19 | Ausmietung Stewards | pág. 53, precedente |
| 20 | Anpassung Delkredere | pág. 53, precedente |
| 21 | Sonstiges | pág. 53, precedente |
| 22 | Ausserordentlicher, einmaliger oder periodenfremder Ertrag | pág. 41, precedente |
| 23 | Minderheitsanteil am Jahresergebnis | pág. 41, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Personalkosten inkl. Spesen | pág. 53, precedente |
| 2 | Sozialabgaben | pág. 53, precedente |
| 3 | Versicherungsprämien | pág. 53, Claude 0.85 |
| 4 | Personalkosten inkl. Spesen | pág. 53, precedente |
| 5 | Sozialabgaben | pág. 53, precedente |
| 6 | Personalkosten inkl. Spesen | pág. 53, precedente |
| 7 | Sozialabgaben | pág. 53, precedente |
| 8 | Personalkosten inkl. Spesen | pág. 53, precedente |
| 9 | Sozialabgaben | pág. 53, precedente |
| 10 | Miete und Unterhalt Stadion | pág. 54, precedente |
| 11 | Sicherheitskosten Matchtag (ohne Stewards) | pág. 54, precedente |
| 12 | Abgaben öffentlicher Verkehr | pág. 54, precedente |
| 13 | Medical und Material | pág. 54, Jev 0.98 |
| 14 | Ticketing und Vorverkaufsgebühren | pág. 54, precedente |
| 15 | Aufwand 1. Mannschaft | pág. 54, precedente |
| 16 | Diverse Kosten Spielbetrieb | pág. 54, precedente |
| 17 | VIP-Cateringkosten Spieltag | pág. 54, precedente |
| 18 | Aufwand übriger Spielbetrieb | pág. 54, Jev 0.99 |
| 19 | Rückvergütungen Lieferanten | pág. 54, precedente |
| 20 | Transferaufwand def. Übertritte | pág. 55, Jev 0.99 |
| 21 | Spielvermittlungen und Beratungen | pág. 55, precedente |
| 22 | Ausleih- und Ausbildungsentschädigungen | pág. 55, precedente |
| 23 | Medien, Kommunikation, Inserate | pág. 55, precedente |
| 24 | Inhouse TV Spieltag | pág. 55, precedente |
| 25 | LED-Bandenwerbung Produktion | pág. 55, precedente |
| 26 | Diverses | pág. 55, precedente |
| 27 | Nachwuchs Akademie | pág. 55, precedente |
| 28 | Anlässe (FCL-Fussballcamp, Pfingstmaster) | pág. 55, precedente |
| 29 | Materialkosten | pág. 55, precedente |
| 30 | Spielbetrieb und Mannschaftsaufwand | pág. 55, precedente |
| 31 | Events | pág. 41, Jev 0.99 |
| 32 | Merchandising | pág. 41, precedente |
| 33 | Energie, Wasser und Entsorgung | pág. 41, precedente |
| 34 | Verwaltungsaufwand | pág. 56, precedente |
| 35 | IT, Telefon, Internet und Applikationen | pág. 56, precedente |
| 36 | Sachversicherungen, Abgaben und Gebühren | pág. 56, precedente |
| 37 | Fahrzeug/Treibstoff | pág. 56, precedente |
| 38 | Sonstiger Betriebsaufwand | pág. 56, precedente |
| 39 | Abschreibungen Sachanlagen | pág. 41, Jev 1 |
| 40 | Abschreibungen immaterielle Werte | pág. 41, precedente |
| 41 | Erfolg aus Equity-Beteiligungen | pág. 41, precedente |
| 42 | Ausserordentlicher, einmaliger oder periodenfremder Aufwand | pág. 41, precedente |

### Meta

```text
2020: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-19): cierre = 2020-06-30. El FC Luzern cierra su ejercicio el 30 de junio (fiscalYearStart 07-01; los Geschäftsbericht vecinos 2017-18, 2018-19, 2019-20 y 2024-25 dicen 30. Juni); el informe es de la temporada 2019-20
tools/cargar.mjs (2026-10-19). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

## 2019

### Ingresos

```text
2019: cargado por tools/cargar.mjs (2026-10-19) desde Clubes/Suiza/Luzern/geschaeftsbericht-2018-19.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Suiza/Luzern/geschaeftsbericht-2018-19.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Meisterschaft Eintritte | pág. 51, Jev 1 |
| 2 | Meisterschaft VIP-Eintritte | pág. 51, Jev 1 |
| 3 | Helvetia Schweizer Cup | pág. 51, precedente |
| 4 | UEFA Clubwettbewerbe | pág. 51, precedente |
| 5 | Sonstiges | pág. 51, Jev 0.98 |
| 6 | Werbung und Sponsoring | pág. 41, Jev 1 |
| 7 | TV-Entschädigungen Übertragungsrechte | pág. 41, precedente |
| 8 | Transferertrag | pág. 41, precedente |
| 9 | Sponsoren- und Spendenbeiträge | pág. 52, precedente |
| 10 | SFV-Verbandsbeiträge | pág. 52, precedente |
| 11 | Sport Toto- und J&S-Entschädigungen | pág. 52, precedente |
| 12 | Ausbildungs- und Materialbeiträge Eltern | pág. 52, precedente |
| 13 | Anlässe (FCL-Fussballcamp, Pfingstmaster) | pág. 52, precedente |
| 14 | Diverse Einnahmen | pág. 52, precedente |
| 15 | Events | pág. 41, Claude 0.8 |
| 16 | Fanshop Präsenzgeschäft | pág. 52, precedente |
| 17 | Retail, Distanzgeschäft | pág. 52, Claude 0.93 |
| 18 | Sonstiger Betriebsertrag | pág. 41, Jev 1 |
| 19 | Erfolg aus Equity-Beteiligungen | pág. 41, precedente |
| 20 | Ausserordentlicher, einmaliger oder periodenfremder Ertrag | pág. 41, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Personalkosten inkl. Spesen | pág. 53, precedente |
| 2 | Sozialabgaben | pág. 53, precedente |
| 3 | Versicherungsprämien | pág. 53, Claude 0.85 |
| 4 | Personalkosten inkl. Spesen | pág. 53, precedente |
| 5 | Sozialabgaben | pág. 53, precedente |
| 6 | Personalkosten inkl. Spesen | pág. 53, precedente |
| 7 | Sozialabgaben | pág. 53, precedente |
| 8 | Personalkosten inkl. Spesen | pág. 53, precedente |
| 9 | Sozialabgaben | pág. 53, precedente |
| 10 | Miete und Unterhalt Stadion | pág. 54, precedente |
| 11 | Sicherheitskosten Matchtag (ohne Stewards) | pág. 54, precedente |
| 12 | Abgaben öffentlicher Verkehr | pág. 54, precedente |
| 13 | Medical und Material | pág. 54, Jev 0.98 |
| 14 | Ticketing und Vorverkaufsgebühren | pág. 54, precedente |
| 15 | Aufwand 1. Mannschaft | pág. 54, precedente |
| 16 | Diverse Kosten Spielbetrieb | pág. 54, precedente |
| 17 | VIP-Cateringkosten Spieltag | pág. 54, precedente |
| 18 | Aufwand übriger Spielbetrieb | pág. 54, Jev 0.99 |
| 19 | Rückvergütungen Lieferanten | pág. 54, precedente |
| 20 | Transferaufwand def. Übertritte | pág. 54, Jev 0.99 |
| 21 | Spielervermittlungen und Beratungen | pág. 54, precedente |
| 22 | Ausleih- und Ausbildungsentschädigungen | pág. 54, precedente |
| 23 | Medien, Kommunikation, Inserate | pág. 55, precedente |
| 24 | Inhouse TV Spieltag | pág. 55, precedente |
| 25 | LED- und Fixbanden-Werbung Produktion | pág. 55, Jev 0.99 |
| 26 | Diverses | pág. 55, precedente |
| 27 | Nachwuchs-Akademie | pág. 55, precedente |
| 28 | Anlässe (FCL-Fussballcamp, Pfingstmaster) | pág. 55, precedente |
| 29 | Materialkosten | pág. 55, precedente |
| 30 | Spielbetrieb und Mannschaftsaufwand | pág. 55, precedente |
| 31 | Konferenzen, Events | pág. 55, precedente |
| 32 | Grossevents | pág. 55, precedente |
| 33 | Merchandising | pág. 41, precedente |
| 34 | Energie, Wasser und Entsorgung | pág. 41, precedente |
| 35 | Verwaltungs- und Kommunikationkosten | pág. 55, Jev 1 |
| 36 | EDV- und Applikationsaufwand | pág. 55, Jev 1 |
| 37 | Sachversicherungen, Abgaben und Gebühren | pág. 55, precedente |
| 38 | Sonstiger Betriebsaufwand | pág. 55, precedente |
| 39 | Abschreibungen mobile Sachanlagen | pág. 41, precedente |
| 40 | Abschreibungen immaterielle Sachanlagen | pág. 41, precedente |
| 41 | Ausserordentlicher, einmaliger oder periodenfremder Aufwand | pág. 41, precedente |
| 42 | Minderheitsanteil am Jahresergebnis | pág. 41, precedente |

### Meta

```text
2019: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-19): cierre = 2019-06-30. El FC Luzern cierra su ejercicio el 30 de junio (fiscalYearStart 07-01; los Geschäftsbericht vecinos 2017-18, 2018-19, 2019-20 y 2024-25 dicen 30. Juni); el informe es de la temporada 2018-19
tools/cargar.mjs (2026-10-19). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
tools/cargar.mjs (2026-10-19): ch-superleague, verificado contra roster cacheado de "2018–19 Swiss Super League" (tools/club-league-reference/ch.json), coincidencia exacta "Luzern".
```

## 2018

### Ingresos

```text
2018: cargado por tools/cargar.mjs (2026-10-19) desde Clubes/Suiza/Luzern/geschaeftsbericht-2017-18.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Suiza/Luzern/geschaeftsbericht-2017-18.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Meisterschaft Eintritte | pág. 49, Jev 1 |
| 2 | Meisterschaft VIP-Eintritte | pág. 49, Jev 1 |
| 3 | Helvetia Schweizer Cup | pág. 49, precedente |
| 4 | UEFA Clubwettbewerbe | pág. 49, precedente |
| 5 | Sonstiges | pág. 49, Jev 0.98 |
| 6 | Sponsoring, Werbung | pág. 39, precedente |
| 7 | TV-Entschädigungen Übertragungsrechte | pág. 39, precedente |
| 8 | Transferentgelte | pág. 50, Jev 0.99 |
| 9 | Ausleihgebühren | pág. 50, Jev 0.97 |
| 10 | Sponsoren- und Spendenbeiträge | pág. 50, precedente |
| 11 | SFV-Verbandsbeiträge | pág. 50, precedente |
| 12 | Sport-Toto- und J&S-Entschädigungen | pág. 50, precedente |
| 13 | Ausbildungs- und Materialbeiträge Eltern | pág. 50, precedente |
| 14 | Anlässe (FCL-Fussballcamp, Pfingstmasters) | pág. 50, precedente |
| 15 | Div. Einnahmen | pág. 50, Jev 0.92 |
| 16 | Konferenzen/Events swissporarena | pág. 50, precedente |
| 17 | Grossevents | pág. 50, precedente |
| 18 | Merchandising | pág. 39, precedente |
| 19 | Sonstiger Betriebsertrag | pág. 39, Jev 1 |
| 20 | Ausserordentlicher, einmaliger oder periodenfremder Ertrag | pág. 39, precedente |
| 21 | Erfolg aus Equity-Beteiligungen | pág. 39, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Personalkosten inkl. Spesen | pág. 50, precedente |
| 2 | Sozialabgaben | pág. 50, precedente |
| 3 | Versicherungsprämien | pág. 50, Claude 0.85 |
| 4 | Personalkosten inkl. Spesen | pág. 50, precedente |
| 5 | Sozialabgaben | pág. 50, precedente |
| 6 | Personalkosten inkl. Spesen | pág. 50, precedente |
| 7 | Sozialabgaben | pág. 50, precedente |
| 8 | Personalkosten inkl. Spesen | pág. 50, precedente |
| 9 | Sozialabgaben | pág. 50, precedente |
| 10 | Miete und Unterhalt Stadion | pág. 51, precedente |
| 11 | Sicherheitskosten Matchtag (ohne Stewards) | pág. 51, precedente |
| 12 | Abgaben öffentlicher Verkehr | pág. 51, precedente |
| 13 | Medical und Material | pág. 51, Jev 0.98 |
| 14 | Ticketing und Vorverkaufsgebühren | pág. 51, precedente |
| 15 | Aufwand 1. Mannschaft | pág. 51, precedente |
| 16 | Div. Kosten Spielbetrieb | pág. 51, Jev 0.91 |
| 17 | VIP-Cateringkosten Spieltag | pág. 51, precedente |
| 18 | Aufwand übriger Spielbetrieb | pág. 51, Jev 0.99 |
| 19 | Rückvergütungen Lieferanten | pág. 51, precedente |
| 20 | Transferaufwand def. Übertritte | pág. 52, Jev 0.99 |
| 21 | Ausleih- und Ausbildungsentschädigungen | pág. 52, precedente |
| 22 | Medien, Kommunikation, Inserate | pág. 52, precedente |
| 23 | Inhouse TV Spieltag | pág. 52, precedente |
| 24 | LED-Bandenwerbung Produktion | pág. 52, precedente |
| 25 | Diverses | pág. 52, precedente |
| 26 | Nachwuchs-Akademie | pág. 52, precedente |
| 27 | Anlässe (FCL-Fussballcamp, Pfingstmasters) | pág. 52, precedente |
| 28 | Materialkosten | pág. 52, precedente |
| 29 | Spielbetrieb und Mannschaftaufwand | pág. 52, precedente |
| 30 | Konferenzen/Events | pág. 52, precedente |
| 31 | Grossevents | pág. 52, precedente |
| 32 | Merchandising | pág. 39, Jev 0.93 |
| 33 | Energie, Wasser und Entsorgung | pág. 39, precedente |
| 34 | Verwaltungs- und Kommunikationskosten | pág. 53, Jev 1 |
| 35 | EDV- und Applikationsaufwand | pág. 53, Jev 1 |
| 36 | Sachversicherungen, Abgaben und Gebühren | pág. 53, precedente |
| 37 | Sonstiger Betriebsaufwand | pág. 53, precedente |
| 38 | Abschreibungen mobile Sachanlagen | pág. 39, precedente |
| 39 | Abschreibungen immaterielle Sachanlagen | pág. 39, precedente |
| 40 | Ausserordentlicher, einmaliger oder periodenfremder Aufwand | pág. 39, precedente |
| 41 | Minderheitsanteil am Jahresergebnis | pág. 39, precedente |

### Meta

```text
tools/cargar.mjs (2026-10-19). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

## Fuentes

### luzern-ch-geschaeftsbericht-2024-25

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-19) desde la transcripción Clubes/Suiza/Luzern/geschaeftsbericht-2024-25.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.
```

### luzern-ch-geschaeftsbericht-2018-19

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-19) desde la transcripción Clubes/Suiza/Luzern/geschaeftsbericht-2018-19.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.
```

### luzern-ch-geschaeftsbericht-2021-22

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-19) desde la transcripción Clubes/Suiza/Luzern/geschaeftsbericht-2021-22.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.
```

### luzern-ch-geschaeftsbericht-2017-18

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-19) desde la transcripción Clubes/Suiza/Luzern/geschaeftsbericht-2017-18.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.
```

### luzern-ch-geschaeftsbericht-2019-20

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-19) desde la transcripción Clubes/Suiza/Luzern/geschaeftsbericht-2019-20.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.
```
