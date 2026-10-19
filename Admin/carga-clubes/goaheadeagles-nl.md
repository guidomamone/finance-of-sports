# goaheadeagles-nl — evidencia de carga

Lo que antes iba como comentario en el data file del club, `data/<país>/goaheadeagles-nl-data.js` (la regla: `Admin/CONVENCIONES-DATOS.md`, "data/<país>/<club>-data.js NO LLEVA
COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y meta. Las notas de cada fila van en una tabla con su número de
fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
Go Ahead Eagles: alta por tools/alta-club.mjs (2026-10-19) desde Clubes/Países Bajos/Go Ahead Eagles/wf-2024-2025-31bca08b.pdf. brandColor #C10230
(procedencia en Admin/sourcing/Países Bajos/Go Ahead Eagles.md; tools/cargar-lote.mjs).
```

```text
data/nl/goaheadeagles-nl-data.js — Go Ahead Eagles Holding BV (Países Bajos).
ALTA POR SCRIPT (tools/alta-club.mjs, 2026-10-19), SIN EJERCICIOS CARGADOS TODAVÍA: las estructuras del data file
nacen vacías a propósito. Los rubros, los totales oficiales y el resto del fiscalYearMeta los agrega la etapa de carga.

Documento que originó el alta: Clubes/Países Bajos/Go Ahead Eagles/wf-2024-2025-31bca08b.pdf

De dónde salió cada campo (estado según alta-club.mjs: ok / pendiente):
  id                 ok        "goaheadeagles-nl" — slug de "Go Ahead Eagles" + '-nl' (convención de clubId, Admin/CONVENCIONES.md Versión 129)
  name               ok        "Go Ahead Eagles Holding BV" — ajuste manual (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-10): Nombre legal del alta (Claude, Sonnet): Go-Ahead-Eagles-Jaarverslag-2022-20
  displayName        ok        "Go Ahead Eagles" — nombre de la carpeta del club en Clubes/
  country            ok        "NL" — carpeta de país "Países Bajos" (tabla PAISES)
  reportingCurrency  ok        "EUR" — moneda de curso legal de Países Bajos
  fiscalYearStart    ok        "07-01" — cierre del ejercicio: contenido del .md (73 de 74 fechas de fin de mes caen en el mes 6)
  sport              ok        "futbol" — el .md nombra el fútbol 18 veces y ningún otro deporte más que eso
  brandColor         pendiente (ausente) — la liga del club no está en tools/brand-color-reference/ (o el club no está en footylogos)
  anio               ok        2025 — nombre del archivo (misma regla que onboard.mjs --quien), confirmado por las fechas de cierre del .md
  cierre             ok        "2025-06-30" — año del ejercicio + mes de cierre (contenido del .md (73 de 74 fechas de fin de mes caen en el mes 6))
  reportType         ok        "official_balance_sheet" — el .md tiene un estado contable (resultados / balance) y el nombre del archivo no sugiere otro tipo
  perimetro          ok        "consolidado" — ajuste manual (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-19): presenta Go Ahead Eagles Holding BV, que consolida al club (borrador altas-
  currency           ok        "EUR" — moneda de curso legal de Países Bajos (tabla PAISES de alta-club.mjs)
  fxRef              ok        "EUR@2025-06-30" — el documento no declara tipo de cambio; FX_CLOSE ya tiene EUR@2025-06-30 = 0.8532 (Cierre BCE al 30/6/2025 (1 EUR = 1,172 USD))
  sourceId           ok        "goaheadeagles-nl-wf-2024-2025-31bca08b" — clubId + nombre del archivo en slug
  liga               ok        "nl-eredivisie" — roster cacheado de "2024–25 Eredivisie" (tools/club-league-reference/nl.json), coincidencia exacta "Go Ahead Eagles"

FISCAL YEAR META PROPUESTO para 2025 (NO registrado: un ejercicio con meta y
sin rubros se vería en el sitio como un año en cero, y "sin dato no es cero"):
  2025: {"reportType":"official_balance_sheet","currency":"EUR","fxRef":"EUR@2025-06-30","sourceId":"goaheadeagles-nl-wf-2024-2025-31bca08b"}
```

## 2025

### Ingresos

```text
2025: cargado por tools/cargar.mjs (2026-10-19) desde Clubes/Países Bajos/Go Ahead Eagles/wf-2024-2025-31bca08b.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Países Bajos/Go Ahead Eagles/wf-2024-2025-31bca08b.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Sponsoring | pág. 27, Jev 1 |
| 2 | Wedstrijdbaten | pág. 27, Jev 1 |
| 3 | Media gerelateerde baten | pág. 27, Jev 1 |
| 4 | Prijzengeld | pág. 27, Jev 1 |
| 5 | Horeca | pág. 27, Jev 0.99 |
| 6 | Merchandise | pág. 27, Jev 0.99 |
| 7 | Subsidies & giften | pág. 27, Jev 1 |
| 8 | Overige baten | pág. 27, Jev 0.99 |
| 9 | Resultaat vergoedingssommen | pág. 8, Jev 1 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Inkoopwaarde van de omzet | pág. 8, Jev 0.93 |
| 2 | Bruto salarissen | pág. 28, precedente |
| 3 | Verhuur spelers | pág. 28, Jev 0.92 |
| 4 | Mutatie reservering vakantiedagen | pág. 28, precedente |
| 5 | Ontvangen uitkeringen | pág. 28, precedente |
| 6 | Sociale lasten | pág. 8, Jev 0.92 |
| 7 | Pensioenlasten | pág. 8, precedente |
| 8 | Bedrijfsgebouwen en -terreinen | pág. 28, Jev 1 |
| 9 | Inventarissen | pág. 28, Claude 0.9 |
| 10 | Vervoermiddelen | pág. 28, Jev 1 |
| 11 | Huisvestingskosten | pág. 29, Jev 0.99 |
| 12 | Vergoeding personeel en vrijwilligersvergoedingen | pág. 29, precedente |
| 13 | Eindheffing WKR | pág. 29, precedente |
| 14 | Reiskosten- en kilometervergoedingen | pág. 29, precedente |
| 15 | Inhuur technische staf | pág. 29, Jev 0.92 |
| 16 | Verhuiskostenvergoeding | pág. 29, precedente |
| 17 | Studie- en opleidingskosten | pág. 29, precedente |
| 18 | Inhuur fysiotherapie | pág. 29, precedente |
| 19 | Inhuur veiligheidscoördinator | pág. 29, precedente |
| 20 | Uitzendkrachten | pág. 29, precedente |
| 21 | Wervingskosten | pág. 29, precedente |
| 22 | Inhuur financieel management | pág. 29, Jev 0.98 |
| 23 | Inhuur afdeling communicatie | pág. 29, Jev 0.95 |
| 24 | Bedrijfskleding | pág. 29, Jev 0.95 |
| 25 | Overige | pág. 29, precedente |
| 26 | Onderhoud onroerend goed | pág. 29, precedente |
| 27 | Gas, water en elektra | pág. 29, Jev 0.96 |
| 28 | Schoonmaakkosten | pág. 29, Jev 0.93 |
| 29 | Belastingen en zakelijke lasten | pág. 29, Jev 0.95 |
| 30 | Assurantiepremie onroerende zaak | pág. 29, Jev 0.99 |
| 31 | Beveiligingskosten | pág. 29, Jev 0.92 |
| 32 | Onderzoekskosten verduurzaming en nieuwbouw | pág. 29, precedente |
| 33 | Overige | pág. 29, precedente |
| 34 | Reclame, advertenties en promotiemateriaal | pág. 30, Jev 0.96 |
| 35 | Heffingen KNVB | pág. 30, precedente |
| 36 | Kosten evenementen | pág. 30, precedente |
| 37 | Ticketing | pág. 30, Jev 0.98 |
| 38 | LED-boarding | pág. 30, precedente |
| 39 | Mutatie voorziening dubieuze vorderingen op handelsdebiteuren | pág. 30, Jev 0.95 |
| 40 | Representatiekosten | pág. 30, Jev 0.98 |
| 41 | Bemiddelingskosten | pág. 30, Jev 0.97 |
| 42 | Afwaardering vorderingen | pág. 30, Jev 0.99 |
| 43 | Kosten event | pág. 30, precedente |
| 44 | Hostess | pág. 30, precedente |
| 45 | Fanshop | pág. 30, precedente |
| 46 | Kids- en Juniorclub | pág. 30, Jev 0.98 |
| 47 | Overige | pág. 30, precedente |
| 48 | Operational leasing | pág. 30, Jev 0.93 |
| 49 | Brandstoffen | pág. 30, Jev 0.93 |
| 50 | BTW op privégebruik | pág. 30, Jev 0.96 |
| 51 | Reparatie en onderhoud | pág. 30, Jev 0.98 |
| 52 | Boetes en bekeuringen en eigen risico | pág. 30, Jev 0.95 |
| 53 | Kosten automatisering | pág. 30, Jev 1 |
| 54 | Porti- en telefoonkosten | pág. 30, Jev 1 |
| 55 | Kantoorbenodigdheden | pág. 30, Jev 1 |
| 56 | Verzekeringen | pág. 30, Claude 0.85 |
| 57 | Abonnementen en contributies | pág. 30, Jev 0.98 |
| 58 | Accountantskosten, onderzoek van de jaarrekening | pág. 30, Jev 1 |
| 59 | Accountantskosten, andere niet-controlediensten | pág. 30, Jev 0.99 |
| 60 | Notariskosten | pág. 30, Jev 1 |
| 61 | Overige | pág. 30, precedente |
| 62 | Kosten bekerfinale KNVB beker | pág. 31, Jev 0.99 |
| 63 | Kosten voetbalacademie (jeugd) | pág. 31, Jev 1 |
| 64 | Reis- en verblijfkosten | pág. 31, Jev 1 |
| 65 | Kosten beveiliging en kassiers | pág. 31, Claude 0.8 |
| 66 | Kosten Conference League | pág. 31, Jev 0.99 |
| 67 | Kosten bus- en autocombi's | pág. 31, Jev 1 |
| 68 | Analyseprogramma's | pág. 31, precedente |
| 69 | Kosten trainingskamp | pág. 31, Jev 0.96 |
| 70 | Scoutingswerkzaamheden | pág. 31, precedente |
| 71 | Medische begeleiding | pág. 31, precedente |
| 72 | Uitrusting en wedstrijdmateriaal | pág. 31, Jev 0.98 |
| 73 | Clubkostuums | pág. 31, precedente |
| 74 | Scheidsrechterskosten | pág. 31, Jev 0.98 |
| 75 | Overige | pág. 31, precedente |
| 76 | Overige bedrijfskosten | pág. 28, Jev 0.93 |

### Meta

```text
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-19): perimetro = consolidado. presenta Go Ahead Eagles Holding BV, que consolida al club (borrador altas-2026-10-17, perímetro consolidado)
tools/cargar.mjs (2026-10-19). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
alta-club.mjs (2026-10-19): nl-eredivisie, verificado contra roster cacheado de "2024–25 Eredivisie" (tools/club-league-reference/nl.json), coincidencia exacta "Go Ahead Eagles".
```

## 2024

### Ingresos

```text
2024: cargado por tools/cargar.mjs (2026-10-19) desde Clubes/Países Bajos/Go Ahead Eagles/Go-Ahead-Eagles-Jaarverslag-2023-2024.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Países Bajos/Go Ahead Eagles/Go-Ahead-Eagles-Jaarverslag-2023-2024.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Netto-omzet | pág. 13, Jev 1 |
| 2 | resultaat vergoedingssommen | pág. 13, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | inkoopwaarde van de omzet | pág. 13, precedente |
| 2 | Lonen en Salarissen | pág. 13, Jev 1 |
| 3 | Sociale lasten | pág. 13, precedente |
| 4 | Pensionlasten | pág. 13, precedente |
| 5 | Afschrijvingen op immateriële, materiële vaste activa | pág. 13, Jev 1 |
| 6 | Overige bedrijfskosten | pág. 13, Claude 0.8 |

### Meta

```text
tools/cargar.mjs (2026-10-19). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee.
```

```text
tools/dentro-de-otro.mjs (2026-10-19): posiblemente dentro de otro rubro, por precedente del club (la fila tiene plata en sus balances desglosados 2021, 2025): Comercial / Sponsors, Estadio, Televisión, Premios por competencias
```

### Liga

```text
tools/cargar.mjs (2026-10-19): nl-eredivisie, verificado contra roster cacheado de "2023–24 Eredivisie" (tools/club-league-reference/nl.json), coincidencia exacta "Go Ahead Eagles".
```

## 2023

### Ingresos

```text
2023: cargado por tools/cargar.mjs (2026-10-19) desde Clubes/Países Bajos/Go Ahead Eagles/Go-Ahead-Eagles-Jaarverslag-2022-2023.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Países Bajos/Go Ahead Eagles/Go-Ahead-Eagles-Jaarverslag-2022-2023.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Netto-omzet | pág. 9, Jev 1 |
| 2 | Resultaat vergoedingsommen | pág. 9, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Inkoopwaarde van de omzet | pág. 9, precedente |
| 2 | Lonen en Salarissen | pág. 9, Jev 1 |
| 3 | Sociale lasten | pág. 9, precedente |
| 4 | Pensioenlasten | pág. 9, precedente |
| 5 | Afschrijvingen op immateriële, materiële vaste activa | pág. 9, Jev 1 |
| 6 | Overige bedrijfskosten | pág. 9, Claude 0.8 |

### Meta

```text
2023: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, perimetro-senales 2026-10-18): perimetro = consolidado. perimetro-senales.mjs: el ejercicio 2023-06-30 se publicó solo consolidado (el club no tiene un perímetro único); 0 documento(s) con los dos estados votan —; 2 ejercicio(s) con un solo perímetro (consolidado); 4 documento(s) mirados
tools/cargar.mjs (2026-10-19). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee.
```

```text
tools/dentro-de-otro.mjs (2026-10-19): posiblemente dentro de otro rubro, por precedente del club (la fila tiene plata en sus balances desglosados 2021, 2025): Comercial / Sponsors, Estadio, Televisión, Premios por competencias
```

### Liga

```text
tools/cargar.mjs (2026-10-19): nl-eredivisie, verificado contra roster cacheado de "2022–23 Eredivisie" (tools/club-league-reference/nl.json), coincidencia exacta "Go Ahead Eagles".
```

## 2022

### Ingresos

```text
2022: cargado por tools/cargar.mjs (2026-10-19) desde Clubes/Países Bajos/Go Ahead Eagles/Go-Ahead-Eagles-Jaarverslag-2021-2022.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Países Bajos/Go Ahead Eagles/Go-Ahead-Eagles-Jaarverslag-2021-2022.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Netto-omzet | pág. 9, Jev 1 |
| 2 | Resultaat vergoedingsommen | pág. 9, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Inkoopwaarde van de omzet | pág. 9, precedente |
| 2 | Lonen en salarissen | pág. 9, Jev 1 |
| 3 | Sociale lasten | pág. 9, precedente |
| 4 | Pensioenlasten | pág. 9, precedente |
| 5 | Afschrijvingen op immateriële, materiële vaste activa en vastgoedbeleggingen | pág. 9, Jev 1 |
| 6 | Overige bedrijfskosten | pág. 9, Claude 0.8 |

### Meta

```text
2022: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, perimetro-senales 2026-10-18): perimetro = consolidado. perimetro-senales.mjs: el ejercicio 2022-06-30 se publicó solo consolidado (el club no tiene un perímetro único); 0 documento(s) con los dos estados votan —; 2 ejercicio(s) con un solo perímetro (consolidado); 4 documento(s) mirados
tools/cargar.mjs (2026-10-19). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee.
```

```text
tools/dentro-de-otro.mjs (2026-10-19): posiblemente dentro de otro rubro, por precedente del club (la fila tiene plata en sus balances desglosados 2021, 2025): Comercial / Sponsors, Estadio, Televisión, Premios por competencias
```

## 2021

### Ingresos

```text
2021: cargado por tools/cargar.mjs (2026-10-19) desde Clubes/Países Bajos/Go Ahead Eagles/Go-Ahead-Eagles-Jaarrekening-2020-2021.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Países Bajos/Go Ahead Eagles/Go-Ahead-Eagles-Jaarrekening-2020-2021.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: -; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Sponsoring | pág. 36, precedente |
| 2 | Wedstrijdbaten | pág. 36, precedente |
| 3 | Media gerelateerde baten | pág. 36, precedente |
| 4 | Subsidies & giften | pág. 36, precedente |
| 5 | Horeca | pág. 36, precedente |
| 6 | Merchandise | pág. 36, precedente |
| 7 | Prijzengeld | pág. 36, precedente |
| 8 | Overige baten | pág. 36, precedente |
| 9 | Transferbaten | pág. 36, Jev 0.99 |
| 10 | Opleidingsvergoedingen | pág. 36, Claude 0.85 |
| 11 | Solidariteitsbijdragen | pág. 36, Jev 0.98 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Afschrijvingen vergoedingsommen | pág. 36, Jev 1 |
| 2 | Makelaarskosten | pág. 36, Jev 0.96 |
| 3 | Inkoopwaarde merchandise | pág. 36, Jev 0.93 |
| 4 | Inkoopwaarde food & beverage | pág. 36, Jev 0.99 |
| 5 | Bruto salarissen | pág. 37, precedente |
| 6 | Huur spelers | pág. 37, Jev 0.96 |
| 7 | Ontvangen uitkeringen | pág. 37, precedente |
| 8 | Sociale lasten | pág. 16, precedente |
| 9 | Pensioenlasten | pág. 16, precedente |
| 10 | Afschrijvingen op immateriële, materiële vaste activa en vastgoedbeleggingen | pág. 16, Jev 1 |
| 11 | Huisvestingskosten | pág. 38, precedente |
| 12 | Inhuur algemeen management | pág. 38, Jev 0.99 |
| 13 | Verhuiskostenvergoeding | pág. 38, precedente |
| 14 | Reiskosten en kilometervergoedingen | pág. 38, precedente |
| 15 | Vergoeding personeel | pág. 38, Claude 0.88 |
| 16 | Inhuur fysiotherapie | pág. 38, precedente |
| 17 | Inhuur afdeling communicatie | pág. 38, precedente |
| 18 | Inhuur veiligheidscoördinator | pág. 38, precedente |
| 19 | Studie- en opleidingskosten | pág. 38, precedente |
| 20 | Inhuur financieel management | pág. 38, precedente |
| 21 | Uitzendkrachten | pág. 38, precedente |
| 22 | Bedrijfskleding | pág. 38, precedente |
| 23 | Overige | pág. 38, precedente |
| 24 | Onderhoud onroerend goed | pág. 38, precedente |
| 25 | Gas, water en elektra | pág. 38, precedente |
| 26 | Belastingen en zakelijke lasten | pág. 38, precedente |
| 27 | Schoonmaakkosten | pág. 38, precedente |
| 28 | Huur veldverwarming | pág. 38, ? 0.75 |
| 29 | Assurantiepremie onroerende zaak | pág. 38, precedente |
| 30 | Beveiligingskosten | pág. 38, precedente |
| 31 | Huur stadion | pág. 38, Jev 0.95 |
| 32 | Overige | pág. 38, precedente |
| 33 | Mutatie voorziening dubieuze vorderingen op handelsdebiteuren | pág. 39, precedente |
| 34 | Reclame, advertenties en promotiemateriaal | pág. 39, precedente |
| 35 | Representatiekosten | pág. 39, precedente |
| 36 | LED-boarding | pág. 39, precedente |
| 37 | Ticketing | pág. 39, precedente |
| 38 | Inhuur commercieel management | pág. 39, Jev 0.97 |
| 39 | Afboeking dubieuze vorderingen op handelsdebiteuren | pág. 39, Jev 0.96 |
| 40 | Fanshop | pág. 39, precedente |
| 41 | Hostess | pág. 39, precedente |
| 42 | Kids- en Juniorclub | pág. 39, precedente |
| 43 | Overige | pág. 39, precedente |
| 44 | Autokosten | pág. 38, Jev 1 |
| 45 | Kosten automatisering | pág. 39, precedente |
| 46 | Porti- en telefoonkosten | pág. 39, precedente |
| 47 | Kantoorbenodigdheden | pág. 39, precedente |
| 48 | Abonnementen en contributies | pág. 39, precedente |
| 49 | Accountantskosten | pág. 39, Jev 1 |
| 50 | Verzekeringen | pág. 39, precedente |
| 51 | Notariskosten | pág. 39, precedente |
| 52 | Overige | pág. 39, precedente |
| 53 | Reis- en verblijfkosten | pág. 40, precedente |
| 54 | Uitrusting en wedstrijdmateriaal | pág. 40, precedente |
| 55 | Kosten beveiliging en kassiers | pág. 40, precedente |
| 56 | Clubkostuums | pág. 40, precedente |
| 57 | Medische begeleiding | pág. 40, precedente |
| 58 | Scoutingswerkzaamheden | pág. 40, precedente |
| 59 | Kosten trainingskamp | pág. 40, precedente |
| 60 | Scheidsrechterskosten | pág. 40, precedente |
| 61 | Overige | pág. 40, precedente |
| 62 | Overige bedrijfskosten | pág. 38, precedente |

### Meta

```text
tools/cargar.mjs (2026-10-19). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

## Fuentes

### goaheadeagles-nl-wf-2024-2025-31bca08b

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-19) desde la transcripción Clubes/Países Bajos/Go Ahead Eagles/wf-2024-2025-31bca08b.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.
```

### goaheadeagles-nl-jaarverslag-2022-2023

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-19) desde la transcripción Clubes/Países Bajos/Go Ahead Eagles/Go-Ahead-Eagles-Jaarverslag-2022-2023.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.
```

### goaheadeagles-nl-jaarverslag-2023-2024

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-19) desde la transcripción Clubes/Países Bajos/Go Ahead Eagles/Go-Ahead-Eagles-Jaarverslag-2023-2024.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.
```

### goaheadeagles-nl-jaarrekening-2020-2021

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-19) desde la transcripción Clubes/Países Bajos/Go Ahead Eagles/Go-Ahead-Eagles-Jaarrekening-2020-2021.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.
```

### goaheadeagles-nl-jaarverslag-2021-2022

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-19) desde la transcripción Clubes/Países Bajos/Go Ahead Eagles/Go-Ahead-Eagles-Jaarverslag-2021-2022.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.
```
