# sarpsborg08-no — evidencia de carga

Lo que antes iba como comentario en el data file del club, `data/<país>/sarpsborg08-no-data.js` (la regla: `Admin/CONVENCIONES-DATOS.md`, "data/<país>/<club>-data.js NO LLEVA
COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y meta. Las notas de cada fila van en una tabla con su número de
fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
Sarpsborg 08: alta por tools/alta-club.mjs (2026-10-19) desde Clubes/Noruega/Sarpsborg 08/aarsregnskap-fotballforening-fli-2025.pdf. brandColor #2747A3
(procedencia en Admin/sourcing/Noruega/Sarpsborg 08.md; tools/cargar-lote.mjs).
```

```text
data/no/sarpsborg08-no-data.js — Sarpsborg 08 Fotballforening (Noruega).
ALTA POR SCRIPT (tools/alta-club.mjs, 2026-10-19), SIN EJERCICIOS CARGADOS TODAVÍA: las estructuras del data file
nacen vacías a propósito. Los rubros, los totales oficiales y el resto del fiscalYearMeta los agrega la etapa de carga.

Documento que originó el alta: Clubes/Noruega/Sarpsborg 08/aarsregnskap-fotballforening-fli-2025.pdf

De dónde salió cada campo (estado según alta-club.mjs: ok / pendiente):
  id                 ok        "sarpsborg08-no" — slug de "Sarpsborg 08" + '-no' (convención de clubId, Admin/CONVENCIONES.md Versión 129)
  name               ok        "Sarpsborg 08 Fotballforening" — ajuste manual (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-19): to-do 284: el club es el FLI (org. 986 400 362), no Sarpsborg Fotball Inves
  displayName        ok        "Sarpsborg 08" — nombre de la carpeta del club en Clubes/
  country            ok        "NO" — carpeta de país "Noruega" (tabla PAISES)
  reportingCurrency  ok        "NOK" — moneda de curso legal de Noruega
  fiscalYearStart    ok        "01-01" — cierre del ejercicio: contenido del .md (22 de 22 fechas de fin de mes caen en el mes 12)
  sport              ok        "futbol" — el .md nombra el fútbol 58 veces y ningún otro deporte más que eso
  brandColor         pendiente (ausente) — la liga del club no está en tools/brand-color-reference/ (o el club no está en footylogos)
  anio               ok        2025 — nombre del archivo (misma regla que onboard.mjs --quien), confirmado por las fechas de cierre del .md
  cierre             ok        "2025-12-31" — año del ejercicio + mes de cierre (contenido del .md (22 de 22 fechas de fin de mes caen en el mes 12))
  reportType         ok        "official_balance_sheet" — el .md tiene un estado contable (resultados / balance) y el nombre del archivo no sugiere otro tipo
  perimetro          ok        "individual" — ajuste manual (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-19): la controlada es Prozo AS (100%, comprada en 2021), un negocio comercial ap
  currency           ok        "NOK" — moneda de curso legal de Noruega (tabla PAISES de alta-club.mjs)
  fxRef              ok        "NOK@2025-12-31" — el documento no declara tipo de cambio; FX_CLOSE ya tiene NOK@2025-12-31 = 10.0791 (Tipo medio de referencia de Norges Bank al 2025-12-31)
  sourceId           ok        "sarpsborg08-no-aarsregnskap-fotballforening-fli-2025" — clubId + nombre del archivo en slug
  liga               ok        "no-eliteserien" — roster cacheado de "2025 Eliteserien" (tools/club-league-reference/no.json), coincidencia exacta "Sarpsborg 08"

FISCAL YEAR META PROPUESTO para 2025 (NO registrado: un ejercicio con meta y
sin rubros se vería en el sitio como un año en cero, y "sin dato no es cero"):
  2025: {"reportType":"official_balance_sheet","currency":"NOK","fxRef":"NOK@2025-12-31","sourceId":"sarpsborg08-no-aarsregnskap-fotballforening-fli-2025"}
```

## 2025

### Ingresos

```text
2025: cargado por tools/cargar.mjs (2026-10-19) desde Clubes/Noruega/Sarpsborg 08/aarsregnskap-fotballforening-fli-2025.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Noruega/Sarpsborg 08/aarsregnskap-fotballforening-fli-2025.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Billetinntekter | pág. 34, Jev 1 |
| 2 | Medlemsinntekter | pág. 34, Jev 1 |
| 3 | Andre salgsinntekter | pág. 34, precedente |
| 4 | Andre inntekter | pág. 34, Jev 0.99 |
| 5 | Reklame- og sponsorinntekter | pág. 34, Jev 1 |
| 6 | Mediainntekter | pág. 34, Jev 1 |
| 7 | Tilskudd | pág. 34, Jev 0.99 |
| 8 | Salg/utleie spillere | pág. 34, Jev 1 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Trening, matriell, kamp kostn. | pág. 34, precedente |
| 2 | Reise- og oppholdskostnader bortekamper | pág. 34, Jev 1 |
| 3 | Salgskostnader | pág. 34, precedente |
| 4 | Lønninger | pág. 39, precedente |
| 5 | Arbeidsgiveravgift | pág. 39, precedente |
| 6 | Pensjonskostnader | pág. 39, precedente |
| 7 | Andre ytelser | pág. 39, precedente |
| 8 | Avskrivning av driftsmidler og immaterielle eiendeler | pág. 34, Jev 0.97 |
| 9 | Andre kostnader | pág. 34, Jev 1 |
| 10 | Reklame- og sponsorkostnader | pág. 34, Jev 0.99 |
| 11 | Admkost | pág. 34, Jev 1 |

### Meta

```text
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-19): perimetro = individual. la controlada es Prozo AS (100%, comprada en 2021), un negocio comercial aparte que no es el fútbol del club; Sarpsborg Stadion AS no tuvo actividad y se liquidó en 2025
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-19): fila = -1 132 192. costo financiero leído como ingreso (revisado por Claude contra el .md, 2026-10-18; ajuste a mano por decisión de Guido hasta la mejora del script (298 y))
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-19): fila = -1 978 517. costo financiero leído como ingreso: Resultat av finansposter -1.165.401 y el resultado cierra en 16.482.693 (revisado por Claude contra el .md, 2026-10-18; ajuste a mano por decisión de Guido hasta la mejora del script (298 y))
tools/cargar.mjs (2026-10-19). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
alta-club.mjs (2026-10-19): no-eliteserien, verificado contra roster cacheado de "2025 Eliteserien" (tools/club-league-reference/no.json), coincidencia exacta "Sarpsborg 08".
```

## 2022

### Ingresos

```text
2022: cargado por tools/cargar.mjs (2026-10-19) desde Clubes/Noruega/Sarpsborg 08/aarsregnskap-fotballforening-fli-2022.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Noruega/Sarpsborg 08/aarsregnskap-fotballforening-fli-2022.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Billetinntekter | pág. 2, precedente |
| 2 | Medlemsinntekter | pág. 2, precedente |
| 3 | Reklame- og sponsorinntekter | pág. 2, precedente |
| 4 | Mediainntekter | pág. 2, precedente |
| 5 | Salg/utleie spillere | pág. 2, precedente |
| 6 | Andre salgsinntekter | pág. 2, precedente |
| 7 | Andre inntekter | pág. 2, precedente |
| 8 | Tilskudd | pág. 2, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Endring i beholdning av varer under tilvirkning og ferdig tilvirkede varer | pág. 2, Jev 1 |
| 2 | Trening, matriell, kamp kostn. | pág. 2, precedente |
| 3 | Lønninger | pág. 16, precedente |
| 4 | Arbeidsgiveravgift | pág. 16, precedente |
| 5 | Pensjonskostnader | pág. 16, precedente |
| 6 | Andre ytelser | pág. 16, precedente |
| 7 | Avskrivning av driftsmidler og immaterielle eiendeler | pág. 2, precedente |
| 8 | Reise- og oppholdskostnader bortekamper | pág. 2, precedente |
| 9 | Andre kostnader | pág. 2, precedente |
| 10 | Reklame- og sponsorkostnader | pág. 2, precedente |
| 11 | Admkost | pág. 2, precedente |

### Meta

```text
2022: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-19): perimetro = individual. la controlada es Prozo AS (100%, comprada en 2021), un negocio comercial aparte que no es el fútbol del club (mismo criterio que el 2025); el club es el FLI en cuentas individuales
tools/cargar.mjs (2026-10-19). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

## 2021

### Ingresos

```text
2021: cargado por tools/cargar.mjs (2026-10-19) desde Clubes/Noruega/Sarpsborg 08/aarsregnskap-fotballforening-fli-2021.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Noruega/Sarpsborg 08/aarsregnskap-fotballforening-fli-2021.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Billetinntekter | pág. 2, precedente |
| 2 | Medlemsinntekter | pág. 2, precedente |
| 3 | Kiosk salg | pág. 13, precedente |
| 4 | Supporterutstyr | pág. 13, Jev 0.99 |
| 5 | Solidaritetsmidler | pág. 13, Jev 0.96 |
| 6 | Andre inntekter | pág. 13, Jev 1 |
| 7 | Cupoppgjør NFF | pág. 13, Jev 0.94 |
| 8 | Grasrotandel | pág. 13, Claude 0.8 |
| 9 | Gaver/bidrag | pág. 13, Jev 1 |
| 10 | Andre inntekter | pág. 13, Jev 1 |
| 11 | Reklame og sponsorinntekter | pág. 2, precedente |
| 12 | Mediainntekter | pág. 2, precedente |
| 13 | Tilskudd | pág. 2, precedente |
| 14 | Salg/utleie spillere | pág. 2, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Trening/materiell kostnader | pág. 13, precedente |
| 2 | Kampkostnader | pág. 13, Jev 1 |
| 3 | Reise og oppholdskostander bortekamper | pág. 2, precedente |
| 4 | Innkjøp av varer for videresalg | pág. 13, precedente |
| 5 | Kostn.kjøp/salg spillere/utd.midler | pág. 13, precedente |
| 6 | Lønn | pág. 14, Jev 0.91 |
| 7 | Arbeidsgiveravgift | pág. 14, precedente |
| 8 | Pensjonskostnader | pág. 14, precedente |
| 9 | Andre ytelser / Refusjoner | pág. 14, Jev 0.97 |
| 10 | Avskrivning på driftsmidler og immaterielle eiendeler | pág. 2, precedente |
| 11 | Honorar medisinsk støtteapparat | pág. 14, precedente |
| 12 | Agent/talentspeidere | pág. 14, Jev 0.99 |
| 13 | Reisekostnader/km.godtgjørelse | pág. 14, Jev 0.99 |
| 14 | Leiekostnader | pág. 14, Jev 0.97 |
| 15 | Andre kostnader | pág. 14, Jev 1 |
| 16 | Reklame og sponsorkostnader | pág. 2, precedente |
| 17 | Admkost | pág. 2, precedente |

### Meta

```text
2021: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, perimetro-senales 2026-10-19): perimetro = individual. perimetro-senales.mjs: el ejercicio 2021-12-31 se publicó solo individual (el club es consolidado); 2 documento(s) con los dos estados votan consolidado; 8 ejercicio(s) con un solo perímetro (individual); 18 documento(s) mirados
tools/cargar.mjs (2026-10-19). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

## 2020

### Ingresos

```text
2020: cargado por tools/cargar.mjs (2026-10-19) desde Clubes/Noruega/Sarpsborg 08/aarsregnskap-fotballforening-fli-2020.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Noruega/Sarpsborg 08/aarsregnskap-fotballforening-fli-2020.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Billetinntekter | pág. 2, precedente |
| 2 | Medlemsinntekter | pág. 2, precedente |
| 3 | Andre inntekter | pág. 2, precedente |
| 4 | Reklame og sponsorinntekter | pág. 2, precedente |
| 5 | Kiosk salg | pág. 13, precedente |
| 6 | Supporterutstyr | pág. 13, Jev 0.99 |
| 7 | Solidaritetsmidler | pág. 13, Jev 0.96 |
| 8 | Andre inntekter | pág. 13, precedente |
| 9 | Mediainntekter | pág. 2, precedente |
| 10 | Tilskudd | pág. 2, precedente |
| 11 | Salg/utleie spillere | pág. 2, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Trening/materiell kostnader | pág. 14, precedente |
| 2 | Kampkostnader | pág. 14, Jev 1 |
| 3 | Reise og oppholdskostander bortekamper | pág. 2, precedente |
| 4 | Salgskostnader | pág. 2, precedente |
| 5 | Lønn | pág. 12, Jev 0.91 |
| 6 | Arbeidsgiveravgift | pág. 12, precedente |
| 7 | Pensjonskostnader | pág. 12, precedente |
| 8 | Andre relaterte ytelser / Refusjoner | pág. 12, Claude 0.85 |
| 9 | Avskrivning på driftsmidler og immaterielle eiendeler | pág. 2, precedente |
| 10 | Honorar medisinsk støtteapparat | pág. 14, precedente |
| 11 | Agent/talentspeidere | pág. 14, Jev 0.99 |
| 12 | Reisekostnader/km.godtgjørelse | pág. 14, Jev 0.99 |
| 13 | Leiekostnader | pág. 14, Jev 0.97 |
| 14 | Andre kostnader | pág. 14, Jev 1 |
| 15 | Reklame og sponsorkostnader | pág. 2, precedente |
| 16 | Admkost | pág. 2, precedente |

### Meta

```text
2020: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, perimetro-senales 2026-10-19): perimetro = individual. perimetro-senales.mjs: el ejercicio 2020-12-31 se publicó solo individual (el club es consolidado); 2 documento(s) con los dos estados votan consolidado; 8 ejercicio(s) con un solo perímetro (individual); 18 documento(s) mirados
tools/cargar.mjs (2026-10-19). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

## 2019

### Ingresos

```text
2019: cargado por tools/cargar.mjs (2026-10-19) desde Clubes/Noruega/Sarpsborg 08/aarsregnskap-fotballforening-fli-2019.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Noruega/Sarpsborg 08/aarsregnskap-fotballforening-fli-2019.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Billetinntekter | pág. 2, precedente |
| 2 | Medlemsinntekter | pág. 2, precedente |
| 3 | Cupoppgjør NFF | pág. 8, Jev 0.94 |
| 4 | Media/tilskudd UEFA | pág. 8, precedente |
| 5 | Grasrotandel | pág. 8, Claude 0.8 |
| 6 | Gaver/bidrag | pág. 8, Jev 1 |
| 7 | Andre inntekter | pág. 8, Jev 1 |
| 8 | Reklame og sponsorinntekter | pág. 2, precedente |
| 9 | Kiosk salg | pág. 9, precedente |
| 10 | Supporterutstyr | pág. 9, Jev 0.99 |
| 11 | Solidaritetsmidler | pág. 9, Jev 0.96 |
| 12 | Andre inntekter | pág. 9, Jev 1 |
| 13 | Mediainntekter | pág. 2, precedente |
| 14 | Tilskudd | pág. 2, precedente |
| 15 | Salg/utleie spillere | pág. 2, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Trening/materiell kostnader | pág. 9, precedente |
| 2 | Kamp kostnader | pág. 9, Jev 1 |
| 3 | Reise og oppholdskostander bortekamper | pág. 2, precedente |
| 4 | Innkjøp av varer for videresalg | pág. 9, precedente |
| 5 | Kostn./kjøp/salg spillere/utd.midler | pág. 9, Jev 0.92 |
| 6 | Lønn | pág. 9, Jev 0.91 |
| 7 | Arbeidsgiveravgift | pág. 9, precedente |
| 8 | Pensjonskostnader | pág. 9, precedente |
| 9 | Andre relaterte ytelser / Refusjoner | pág. 9, Claude 0.85 |
| 10 | Avskrivning på driftsmidler og immaterielle eiendeler | pág. 2, precedente |
| 11 | Honorar medisinsk støtteapparat | pág. 9, precedente |
| 12 | Agent/talentspeidere | pág. 9, Jev 0.99 |
| 13 | Reisekostnader/kilometergodt. | pág. 9, Jev 0.97 |
| 14 | Leiekostnader | pág. 9, Jev 0.97 |
| 15 | Gave til samarbeidsklubber | pág. 9, Jev 0.97 |
| 16 | Kostnader stadion UEFA | pág. 9, Jev 0.98 |
| 17 | Andre kostnader | pág. 9, Jev 1 |
| 18 | Tap avgang Driftsmidler | pág. 9, precedente |
| 19 | Reklame og sponsorkostnader | pág. 2, precedente |
| 20 | Admkost | pág. 2, precedente |

### Meta

```text
2019: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, perimetro-senales 2026-10-19): perimetro = individual. perimetro-senales.mjs: el ejercicio 2019-12-31 se publicó solo individual (el club es consolidado); 2 documento(s) con los dos estados votan consolidado; 8 ejercicio(s) con un solo perímetro (individual); 18 documento(s) mirados
tools/cargar.mjs (2026-10-19). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

## 2018

### Ingresos

```text
2018: cargado por tools/cargar.mjs (2026-10-19) desde Clubes/Noruega/Sarpsborg 08/aarsregnskap-fotballforening-fli-2018.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Noruega/Sarpsborg 08/aarsregnskap-fotballforening-fli-2018.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Billettinntekter | pág. 12, precedente |
| 2 | Medlemsinntekter | pág. 12, precedente |
| 3 | Cupoppgjør NFF | pág. 16, Jev 0.94 |
| 4 | Media/tilskudd UEFA | pág. 16, precedente |
| 5 | Grasrotandel | pág. 16, Claude 0.8 |
| 6 | Gaver/bidrag | pág. 16, Jev 1 |
| 7 | Andre inntekter | pág. 16, Jev 1 |
| 8 | Reklame og sponsorinntekter | pág. 12, precedente |
| 9 | Kiosk salg | pág. 16, precedente |
| 10 | Supporterutstyr | pág. 16, Jev 0.99 |
| 11 | Solidaritetsmidler | pág. 16, Jev 0.96 |
| 12 | Andre inntekter | pág. 16, Jev 1 |
| 13 | Mediainntekter | pág. 12, precedente |
| 14 | Tilskudd | pág. 12, precedente |
| 15 | Salg/utleie spillere | pág. 12, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Trening/materiell kostnader | pág. 17, precedente |
| 2 | Kamp kostnader | pág. 17, Jev 1 |
| 3 | Reise og oppholdskostander bortekamper | pág. 12, precedente |
| 4 | Innkjøp av varer for videresalg | pág. 17, precedente |
| 5 | Kostn /kjøp/salg spillere/utd midler | pág. 17, Jev 0.96 |
| 6 | Lønn | pág. 16, Jev 0.91 |
| 7 | Arbeidsgiveravgift | pág. 16, precedente |
| 8 | Pensjonskostnader | pág. 16, precedente |
| 9 | Andre relaterte ytelser / Refusjoner | pág. 16, Claude 0.85 |
| 10 | Avskrivning på driftsmidler og immaterielle eiendeler | pág. 12, precedente |
| 11 | Honorar medisinsk støtteapparat | pág. 17, precedente |
| 12 | Agent/talentspeidere | pág. 17, Jev 0.99 |
| 13 | Reisekostnader/kilometergodt. | pág. 17, Jev 0.97 |
| 14 | Leiekostnader | pág. 17, Jev 0.97 |
| 15 | Gave til sammarbeidsklubber | pág. 17, Claude 0.8 |
| 16 | Kostnader stadion UEFA | pág. 17, Jev 0.98 |
| 17 | Kostnader Videresalg Invest | pág. 17, precedente |
| 18 | Andre kostnader | pág. 17, Jev 1 |
| 19 | Reklame og sponsorkostnader | pág. 12, precedente |
| 20 | Admkost | pág. 12, precedente |

### Meta

```text
tools/cargar.mjs (2026-10-19). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

## 2017

### Ingresos

```text
2017: cargado por tools/cargar.mjs (2026-10-19) desde Clubes/Noruega/Sarpsborg 08/aarsregnskap-fotballforening-fli-2017.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Noruega/Sarpsborg 08/aarsregnskap-fotballforening-fli-2017.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Billetinntekter | pág. 12, precedente |
| 2 | Medlemsinntekter | pág. 12, precedente |
| 3 | Cupoppgjør NFF | pág. 17, Jev 0.94 |
| 4 | Grasrotandel | pág. 17, Claude 0.8 |
| 5 | Gaver/bidrag | pág. 17, Jev 1 |
| 6 | Andre inntekter | pág. 17, Jev 1 |
| 7 | Reklame og sponsorinntekter | pág. 12, precedente |
| 8 | Kiosk salg | pág. 17, precedente |
| 9 | Supporterutstyr | pág. 17, Jev 0.99 |
| 10 | Solidaritetsmidler/UEFA | pág. 17, Jev 0.9 |
| 11 | Andre inntekter | pág. 17, Jev 1 |
| 12 | Mediainntekter | pág. 12, precedente |
| 13 | Tilskudd | pág. 12, precedente |
| 14 | Salg/utleie spillere | pág. 12, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Trening/materiell kostnader | pág. 18, precedente |
| 2 | Kamp kostnader | pág. 18, Jev 1 |
| 3 | Billettkostnader Cupfinale/event | pág. 18, Jev 0.97 |
| 4 | Reise og oppholdskostander bortekamper | pág. 12, precedente |
| 5 | Salgskostnader | pág. 12, precedente |
| 6 | Lønn | pág. 18, Jev 0.91 |
| 7 | Arbeidsgiveravgift | pág. 18, precedente |
| 8 | Pensjonskostnader | pág. 18, precedente |
| 9 | Andre relaterte ytelser / Refusjoner | pág. 18, Claude 0.85 |
| 10 | Avskrivning på driftsmidler og immaterielle eiendeler | pág. 12, precedente |
| 11 | Honorar medisinsk støtteapparat | pág. 18, precedente |
| 12 | Agent/talentspeidere | pág. 18, Jev 0.99 |
| 13 | Reisekostnader/kilometergodt. | pág. 18, Jev 0.97 |
| 14 | Leiekostnader | pág. 18, Jev 0.97 |
| 15 | Utdanningsmidler/fotballisenser | pág. 18, precedente |
| 16 | Kostnader Videresalg Invest | pág. 18, precedente |
| 17 | Andre kostnader | pág. 18, Jev 1 |
| 18 | Reklame og sponsorkostnader | pág. 12, precedente |
| 19 | Admkost | pág. 12, precedente |

### Meta

```text
2017: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, perimetro-senales 2026-10-19): perimetro = individual. perimetro-senales.mjs: el ejercicio 2017-12-31 se publicó solo individual (el club es consolidado); 2 documento(s) con los dos estados votan consolidado; 8 ejercicio(s) con un solo perímetro (individual); 18 documento(s) mirados
tools/cargar.mjs (2026-10-19). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

## 2016

### Ingresos

```text
2016: cargado por tools/cargar.mjs (2026-10-19) desde Clubes/Noruega/Sarpsborg 08/aarsregnskap-fotballforening-fli-2016.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Noruega/Sarpsborg 08/aarsregnskap-fotballforening-fli-2016.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Billettinntekter | pág. 10, precedente |
| 2 | Medlemsinntekter | pág. 10, precedente |
| 3 | Cupoppgjør NFF | pág. 13, Jev 0.94 |
| 4 | Grasrotandel | pág. 13, Claude 0.8 |
| 5 | Gaver/bidrag | pág. 13, Jev 1 |
| 6 | Andre inntekter | pág. 13, Jev 1 |
| 7 | Reklame og sponsorinntekter | pág. 10, precedente |
| 8 | Kiosk salg | pág. 13, precedente |
| 9 | Supporterutstyr | pág. 13, Jev 0.99 |
| 10 | Solidaritetsmidler | pág. 13, Jev 0.96 |
| 11 | Andre inntekter | pág. 13, Jev 1 |
| 12 | Mediainntekter | pág. 10, precedente |
| 13 | Tilskudd | pág. 10, precedente |
| 14 | Salg/utleie spillere | pág. 10, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Trening, matriell, kurs | pág. 10, Claude 0.88 |
| 2 | Reise og oppholdskostander bortekamper | pág. 10, precedente |
| 3 | Salgskostnader | pág. 10, precedente |
| 4 | Lønn | pág. 15, Jev 0.91 |
| 5 | Arbeidsgiveravgift | pág. 15, precedente |
| 6 | Andre relaterte ytelser / Refusjoner | pág. 15, Claude 0.85 |
| 7 | Avskrivning på driftsmidler og immaterielle eiendeler | pág. 10, precedente |
| 8 | Andre kostnader | pág. 10, precedente |
| 9 | Reklame og sponsorkostnader | pág. 10, precedente |
| 10 | Admkost | pág. 10, precedente |

### Meta

```text
2016: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, perimetro-senales 2026-10-19): perimetro = individual. perimetro-senales.mjs: el ejercicio 2016-12-31 se publicó solo individual (el club es consolidado); 2 documento(s) con los dos estados votan consolidado; 8 ejercicio(s) con un solo perímetro (individual); 18 documento(s) mirados
tools/cargar.mjs (2026-10-19). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

## 2015

### Ingresos

```text
2015: cargado por tools/cargar.mjs (2026-10-19) desde Clubes/Noruega/Sarpsborg 08/aarsregnskap-fotballforening-fli-2015.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Noruega/Sarpsborg 08/aarsregnskap-fotballforening-fli-2015.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Medlemsinntekter | pág. 6, precedente |
| 2 | Billettinntekter | pág. 6, precedente |
| 3 | Cupoppgjør NFF | pág. 13, Jev 0.94 |
| 4 | Grasrotandel | pág. 13, Claude 0.8 |
| 5 | Gaver/bidrag | pág. 13, Jev 1 |
| 6 | Andre inntekter | pág. 13, Jev 1 |
| 7 | Kiosk salg | pág. 13, precedente |
| 8 | Supporterutstyr | pág. 13, Jev 0.99 |
| 9 | Andre inntekter | pág. 13, Jev 1 |
| 10 | Mediainntekter | pág. 6, precedente |
| 11 | Tilskudd | pág. 6, precedente |
| 12 | Reklame og sponsorinntekter | pág. 6, precedente |
| 13 | Salg/utleie spillere | pág. 6, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Trening, matriell, kurs | pág. 6, Claude 0.88 |
| 2 | Reise og oppholdskostander bortekamper | pág. 6, precedente |
| 3 | Salgskostnader | pág. 6, precedente |
| 4 | Lønn | pág. 14, Jev 0.91 |
| 5 | Arbeidsgiveravgift | pág. 14, precedente |
| 6 | Pensjonskostnader | pág. 14, precedente |
| 7 | Andre relaterte ytelser | pág. 14, Jev 0.99 |
| 8 | Avskrivning på driftsmidler og immaterielle eiendeler | pág. 6, precedente |
| 9 | Påmeldingsavgifter/gebyr | pág. 14, precedente |
| 10 | Honorar medisinsk støtteapparat | pág. 14, precedente |
| 11 | Agent/talentspeidere | pág. 14, Jev 0.99 |
| 12 | Reisekostnader/kilometergodt. | pág. 14, Jev 0.97 |
| 13 | Leiekostnader | pág. 14, Jev 0.97 |
| 14 | Utdanningsmidler/fotballisenser | pág. 14, precedente |
| 15 | Andre kostnader | pág. 14, Jev 1 |
| 16 | Reklame og sponsorkostnader | pág. 6, precedente |
| 17 | Admkost | pág. 6, precedente |

### Meta

```text
tools/cargar.mjs (2026-10-19). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

## 2014

### Ingresos

```text
2014: cargado por tools/cargar.mjs (2026-10-19) desde Clubes/Noruega/Sarpsborg 08/aarsregnskap-fotballforening-fli-2014.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Noruega/Sarpsborg 08/aarsregnskap-fotballforening-fli-2014.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Medlemsinntekter | pág. 30, precedente |
| 2 | Billettinntekter | pág. 30, precedente |
| 3 | Andre inntekter | pág. 30, precedente |
| 4 | Andre salgsinntekter | pág. 30, precedente |
| 5 | Mediainntekter | pág. 30, precedente |
| 6 | Tilskudd | pág. 30, precedente |
| 7 | Reklame og sponsorinntekter | pág. 30, precedente |
| 8 | Salg/utleie spillere | pág. 30, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Trening, matriell, kurs | pág. 30, Claude 0.88 |
| 2 | Reise og oppholdskostnader bortekamper | pág. 30, precedente |
| 3 | Salgskostnader | pág. 30, precedente |
| 4 | Lønnskostnad | pág. 30, Claude 0.9 |
| 5 | Avskrivning på driftsmidler og immaterielle eiendeler | pág. 30, precedente |
| 6 | Andre kostnader | pág. 30, precedente |
| 7 | Reklame og sponsorkostnader | pág. 30, precedente |
| 8 | Admkost | pág. 30, precedente |

### Meta

```text
2014: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, perimetro-senales 2026-10-19): perimetro = individual. perimetro-senales.mjs: el ejercicio 2014-12-31 se publicó solo individual (el club es consolidado); 2 documento(s) con los dos estados votan consolidado; 8 ejercicio(s) con un solo perímetro (individual); 18 documento(s) mirados
tools/cargar.mjs (2026-10-19). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

## 2012

### Ingresos

```text
2012: cargado por tools/cargar.mjs (2026-10-19) desde Clubes/Noruega/Sarpsborg 08/aarsregnskap-fotballforening-fli-2012.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Noruega/Sarpsborg 08/aarsregnskap-fotballforening-fli-2012.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Medlemsinntekter | pág. 2, precedente |
| 2 | Billettinntekter | pág. 2, precedente |
| 3 | Andre inntekter | pág. 2, precedente |
| 4 | Andre salgsinntekter | pág. 2, precedente |
| 5 | Mediainntekter | pág. 2, precedente |
| 6 | Tilskudd | pág. 2, precedente |
| 7 | Reklame og sponsorinntekter | pág. 2, precedente |
| 8 | Salg/utleie spillere | pág. 2, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Trening, matriell, kurs | pág. 2, Claude 0.88 |
| 2 | Reise og oppholdskostander bortekamper | pág. 2, precedente |
| 3 | Salgskostnader | pág. 2, precedente |
| 4 | Lønnskostnad | pág. 2, Claude 0.9 |
| 5 | Avskrivning på varige driftsmidler og immaterielle eiendeler | pág. 2, Jev 1 |
| 6 | Andre kostnader | pág. 2, precedente |
| 7 | Reklame og sponsorkostnader | pág. 2, precedente |
| 8 | Admkost | pág. 2, precedente |

### Meta

```text
2012: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, perimetro-senales 2026-10-19): perimetro = individual. perimetro-senales.mjs: el ejercicio 2012-12-31 se publicó solo individual (el club es consolidado); 2 documento(s) con los dos estados votan consolidado; 8 ejercicio(s) con un solo perímetro (individual); 18 documento(s) mirados
tools/cargar.mjs (2026-10-19). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

## Fuentes

### sarpsborg08-no-aarsregnskap-fotballforening-fli-2025

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-19) desde la transcripción Clubes/Noruega/Sarpsborg 08/aarsregnskap-fotballforening-fli-2025.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### sarpsborg08-no-aarsregnskap-fotballforening-fli-2012

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-19) desde la transcripción Clubes/Noruega/Sarpsborg 08/aarsregnskap-fotballforening-fli-2012.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### sarpsborg08-no-aarsregnskap-fotballforening-fli-2014

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-19) desde la transcripción Clubes/Noruega/Sarpsborg 08/aarsregnskap-fotballforening-fli-2014.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### sarpsborg08-no-aarsregnskap-fotballforening-fli-2016

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-19) desde la transcripción Clubes/Noruega/Sarpsborg 08/aarsregnskap-fotballforening-fli-2016.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### sarpsborg08-no-aarsregnskap-fotballforening-fli-2017

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-19) desde la transcripción Clubes/Noruega/Sarpsborg 08/aarsregnskap-fotballforening-fli-2017.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### sarpsborg08-no-aarsregnskap-fotballforening-fli-2018

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-19) desde la transcripción Clubes/Noruega/Sarpsborg 08/aarsregnskap-fotballforening-fli-2018.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.
```

### sarpsborg08-no-aarsregnskap-fotballforening-fli-2019

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-19) desde la transcripción Clubes/Noruega/Sarpsborg 08/aarsregnskap-fotballforening-fli-2019.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### sarpsborg08-no-aarsregnskap-fotballforening-fli-2015

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-19) desde la transcripción Clubes/Noruega/Sarpsborg 08/aarsregnskap-fotballforening-fli-2015.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.
```

### sarpsborg08-no-aarsregnskap-fotballforening-fli-2020

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-19) desde la transcripción Clubes/Noruega/Sarpsborg 08/aarsregnskap-fotballforening-fli-2020.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### sarpsborg08-no-aarsregnskap-fotballforening-fli-2021

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-19) desde la transcripción Clubes/Noruega/Sarpsborg 08/aarsregnskap-fotballforening-fli-2021.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### sarpsborg08-no-aarsregnskap-fotballforening-fli-2022

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-19) desde la transcripción Clubes/Noruega/Sarpsborg 08/aarsregnskap-fotballforening-fli-2022.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```
