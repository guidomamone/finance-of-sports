# molde-no — evidencia de carga

Lo que antes iba como comentario en el data file del club, `data/<país>/molde-no-data.js` (la regla: `Admin/CONVENCIONES-DATOS.md`, "data/<país>/<club>-data.js NO LLEVA
COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y meta. Las notas de cada fila van en una tabla con su número de
fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
Molde: alta por tools/alta-club.mjs (2026-10-19) desde Clubes/Noruega/Molde/aarsregnskap-fotballklubb-fli-2025.pdf. brandColor #176FC1
(procedencia en Admin/sourcing/Noruega/Molde.md; tools/cargar-lote.mjs).
```

```text
data/no/molde-no-data.js — Molde Fotballklubb (Noruega).
ALTA POR SCRIPT (tools/alta-club.mjs, 2026-10-19), SIN EJERCICIOS CARGADOS TODAVÍA: las estructuras del data file
nacen vacías a propósito. Los rubros, los totales oficiales y el resto del fiscalYearMeta los agrega la etapa de carga.

Documento que originó el alta: Clubes/Noruega/Molde/aarsregnskap-fotballklubb-fli-2025.pdf

De dónde salió cada campo (estado según alta-club.mjs: ok / pendiente):
  id                 ok        "molde-no" — slug de "Molde" + '-no' (convención de clubId, Admin/CONVENCIONES.md Versión 129)
  name               ok        "Molde Fotballklubb" — ajuste manual (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-10): Nombre legal del alta (Claude, Sonnet): aarsregnskap-fotballklubb-fli-2025.
  displayName        ok        "Molde" — nombre de la carpeta del club en Clubes/
  country            ok        "NO" — carpeta de país "Noruega" (tabla PAISES)
  reportingCurrency  ok        "NOK" — moneda de curso legal de Noruega
  fiscalYearStart    ok        "01-01" — cierre del ejercicio: contenido del .md (15 de 17 fechas de fin de mes caen en el mes 12)
  sport              ok        "futbol" — el .md nombra el fútbol 134 veces y ningún otro deporte más que eso
  brandColor         pendiente (ausente) — la liga del club no está en tools/brand-color-reference/ (o el club no está en footylogos)
  anio               ok        2025 — nombre del archivo (misma regla que onboard.mjs --quien), confirmado por las fechas de cierre del .md
  cierre             ok        "2025-12-31" — año del ejercicio + mes de cierre (contenido del .md (15 de 17 fechas de fin de mes caen en el mes 12))
  reportType         ok        "official_balance_sheet" — el .md tiene un estado contable (resultados / balance) y el nombre del archivo no sugiere otro tipo
  perimetro          ok        "individual" — ajuste manual (Admin/registros/ajustes-manuales.jsonl, perimetro-senales 2026-10-18): perimetro-senales.mjs: 0 documento(s) con los dos estados votan 
  currency           ok        "NOK" — moneda de curso legal de Noruega (tabla PAISES de alta-club.mjs)
  fxRef              ok        "NOK@2025-12-31" — el documento no declara tipo de cambio; FX_CLOSE ya tiene NOK@2025-12-31 = 10.0791 (Tipo medio de referencia de Norges Bank al 2025-12-31)
  sourceId           ok        "molde-no-aarsregnskap-fotballklubb-fli-2025" — clubId + nombre del archivo en slug
  liga               ok        "no-eliteserien" — roster cacheado de "2025 Eliteserien" (tools/club-league-reference/no.json), coincidencia exacta "Molde"

FISCAL YEAR META PROPUESTO para 2025 (NO registrado: un ejercicio con meta y
sin rubros se vería en el sitio como un año en cero, y "sin dato no es cero"):
  2025: {"reportType":"official_balance_sheet","currency":"NOK","fxRef":"NOK@2025-12-31","sourceId":"molde-no-aarsregnskap-fotballklubb-fli-2025"}
```

## 2025

### Ingresos

```text
2025: cargado por tools/cargar.mjs (2026-10-19) desde Clubes/Noruega/Molde/aarsregnskap-fotballklubb-fli-2025.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Noruega/Molde/aarsregnskap-fotballklubb-fli-2025.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Medlemskontigent | pág. 17, Jev 1 |
| 2 | Egenandeler/deltakeravgift | pág. 17, precedente |
| 3 | Markedsmidler NFF, NTF og UEFA | pág. 17, precedente |
| 4 | Andre tilskudd | pág. 17, Jev 0.98 |
| 5 | Inntekter seriekamper | pág. 17, Jev 0.95 |
| 6 | Inntekter NM Cup | pág. 17, precedente |
| 7 | Inntekter E-Cup | pág. 17, Jev 1 |
| 8 | Oppgjør NM Cup | pág. 17, precedente |
| 9 | Andre inntekter privatkamper etc. | pág. 17, precedente |
| 10 | Reklame/ sponsorinntekter | pág. 11, Jev 1 |
| 11 | Andre driftsinntekter | pág. 11, Jev 0.99 |
| 12 | Salg spillere/ utleie | pág. 11, Jev 1 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Administrasjon | pág. 11, Jev 1 |
| 2 | Lønn spillere, trenere, støtteapparat og administrasjon | pág. 18, precedente |
| 3 | Arbeidsgiveravgift | pág. 18, precedente |
| 4 | Pensjonskostnad | pág. 18, precedente |
| 5 | Andre ytelser | pág. 18, precedente |
| 6 | Utgifter treningsleir/privatkamper | pág. 18, Jev 0.99 |
| 7 | Leie treningsbaner etc. | pág. 18, precedente |
| 8 | Sportsrekvisita | pág. 18, Jev 1 |
| 9 | Medisinske tjenester og rekvisita | pág. 18, precedente |
| 10 | Andre sportslige kostnader | pág. 18, Jev 0.95 |
| 11 | Avgift Norges Fotballforbund | pág. 18, precedente |
| 12 | Annonsering seriekamper | pág. 18, precedente |
| 13 | Utgifter billettsalg | pág. 18, Claude 0.8 |
| 14 | Andre arrangementkostnader | pág. 18, precedente |
| 15 | Utgifter cupkamper | pág. 18, Jev 1 |
| 16 | Utgifter E-cup | pág. 18, Jev 0.99 |
| 17 | Utgifter andre arrangement | pág. 18, precedente |
| 18 | Reisekostnader seriekamper | pág. 18, Jev 1 |
| 19 | Kjøp og leie spillere | pág. 11, Jev 1 |
| 20 | Utgifter Prosjekt/Tiltak | pág. 19, Jev 0.95 |
| 21 | Andre driftskostnader | pág. 19, Claude 0.85 |
| 22 | Varekjøp og andre kostnader kiosker | pág. 19, precedente |
| 23 | Anleggskostnader | pág. 11, precedente |
| 24 | Nedskrivninger | pág. 11, precedente |
| 25 | Tap på fordringer | pág. 11, Jev 0.98 |
| 26 | Avskrivninger spillerrettigheter | pág. 11, precedente |
| 27 | Avskrivninger varige driftsmidler | pág. 11, precedente |

### Meta

```text
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-19): fila = 66 692 397. la Note 12 abre el renglón (67.336.863): derechos de jugadores 66.692.397 (subagente Sonnet, revisado por Claude contra el .md, 2026-10-19)
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-19): fila = 644 466. Note 13: bienes de uso 644.466 (subagente Sonnet, revisado por Claude contra el .md, 2026-10-19)
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-19): categoria = player_amortisation. categoría de la fila partida por la nota (subagente Sonnet, revisado por Claude contra el .md, 2026-10-19)
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-19): categoria = depreciation. categoría de la fila partida por la nota (subagente Sonnet, revisado por Claude contra el .md, 2026-10-19)
tools/cargar.mjs (2026-10-19). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
alta-club.mjs (2026-10-19): no-eliteserien, verificado contra roster cacheado de "2025 Eliteserien" (tools/club-league-reference/no.json), coincidencia exacta "Molde".
```

## 2024

### Ingresos

```text
2024: cargado por tools/cargar.mjs (2026-10-20) desde Clubes/Noruega/Molde/aarsregnskap-fotballklubb-fli-2024.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Noruega/Molde/aarsregnskap-fotballklubb-fli-2024.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Medlemsinntekter/tilskudd | pág. 16, precedente |
| 2 | Kamp- og billettinntekter | pág. 16, Jev 0.99 |
| 3 | Avtale MF/sponsor | pág. 16, precedente |
| 4 | Kiosksalg | pág. 20, precedente |
| 5 | Andre driftsinntekter | pág. 20, precedente |
| 6 | Salg spillere/Utleie | pág. 16, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Administrasjon | pág. 16, precedente |
| 2 | Lønn spillere, trener, støtteapparat og administrasjon | pág. 20, precedente |
| 3 | Arbeidsgiveravgift | pág. 20, precedente |
| 4 | Pensjonskostnad | pág. 20, precedente |
| 5 | Andre ytelser | pág. 20, precedente |
| 6 | Utgifter treningsleir/pilvalkamper | pág. 21, Jev 0.99 |
| 7 | Leie treningsbaner etc. | pág. 21, precedente |
| 8 | Sportsrekvisita | pág. 21, precedente |
| 9 | Medisinske tjenester og rekvisita | pág. 21, precedente |
| 10 | Andre sportslige kostnader | pág. 21, precedente |
| 11 | Banlele serie- og cupkamper | pág. 21, precedente |
| 12 | Avgift Norges Fotballforbund | pág. 21, precedente |
| 13 | Annonsering seriekamper | pág. 21, precedente |
| 14 | Utgifter billettssalg | pág. 21, precedente |
| 15 | Andre arrangementskostnader | pág. 21, precedente |
| 16 | Utgifter cup kamper | pág. 21, precedente |
| 17 | Utgifter e-cup | pág. 21, precedente |
| 18 | Utgifter andre arrangement | pág. 21, precedente |
| 19 | Reisekostnader seriekamper | pág. 21, precedente |
| 20 | Kjøp og leie spillere | pág. 16, precedente |
| 21 | Andre driftskostnader | pág. 16, precedente |
| 22 | Anleggskostnader | pág. 16, precedente |
| 23 | Avskrivninger | pág. 16, precedente |
| 24 | Tap på fordringer | pág. 16, precedente |

### Meta

```text
tools/cargar.mjs (2026-10-20). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
tools/cargar.mjs (2026-10-20): no-eliteserien, verificado contra roster cacheado de "2024 Eliteserien" (tools/club-league-reference/no.json), coincidencia exacta "Molde".
```

## 2023

### Ingresos

```text
2023: cargado por tools/cargar.mjs (2026-10-20) desde Clubes/Noruega/Molde/aarsregnskap-fotballklubb-fli-2023.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Noruega/Molde/aarsregnskap-fotballklubb-fli-2023.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Medlemskontingent | pág. 20, precedente |
| 2 | Egenandeler/deltakeravgift | pág. 20, precedente |
| 3 | Markedsmidler NFF, NTF og UEFA | pág. 20, precedente |
| 4 | Andre tilskudd | pág. 20, precedente |
| 5 | Inntekter Seriekamper | pág. 20, precedente |
| 6 | Inntekter NM Cup | pág. 20, precedente |
| 7 | Inntekter E-Cup | pág. 20, precedente |
| 8 | Oppgjør NM Cup | pág. 20, precedente |
| 9 | Andre inntekter privatkamper etc. | pág. 20, precedente |
| 10 | Avtale MF/sponsor | pág. 16, Jev 1 |
| 11 | Kiosksalg | pág. 21, Claude 0.85 |
| 12 | Andre driftsinntekter | pág. 21, Jev 1 |
| 13 | Salg spillere/Utleie | pág. 16, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Administrasjon | pág. 16, precedente |
| 2 | Lønn spillere, trenere, støtteapparat og administrasjon | pág. 21, precedente |
| 3 | Arbeidsgiveravgift | pág. 21, precedente |
| 4 | Pensjonskostnad | pág. 21, precedente |
| 5 | Andre ytelser | pág. 21, precedente |
| 6 | Utgifter treningsleir/privatkamper | pág. 21, precedente |
| 7 | Leie treningsbaner etc. | pág. 21, precedente |
| 8 | Sportsrekvisita | pág. 21, precedente |
| 9 | Medisinske tjenester og rekvisita | pág. 21, precedente |
| 10 | Andre sportslige kostnader | pág. 21, precedente |
| 11 | Baneleie serie- og cupkamper | pág. 22, Jev 0.99 |
| 12 | Avgift Norges Fotballforbund | pág. 22, precedente |
| 13 | Annonsering seriekamper | pág. 22, precedente |
| 14 | Utgifter billettsalg | pág. 22, precedente |
| 15 | Andre arrangementskostnader | pág. 22, precedente |
| 16 | Utgifter cup kamper | pág. 22, precedente |
| 17 | Utgifter e-cup | pág. 22, precedente |
| 18 | Utgifter andre arrangement | pág. 22, precedente |
| 19 | Reisekostnader seriekamper | pág. 22, precedente |
| 20 | Kjøp og leie spillere | pág. 16, precedente |
| 21 | Utgifter Prosjekt/Tiltak | pág. 22, precedente |
| 22 | Andre driftskostnader | pág. 22, precedente |
| 23 | Varekjøp og andre kostnader kiosker | pág. 22, precedente |
| 24 | Anleggskostnader | pág. 16, precedente |
| 25 | Avskrivninger | pág. 16, precedente |
| 26 | Tap på fordringer | pág. 16, precedente |

### Meta

```text
tools/cargar.mjs (2026-10-20). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
tools/cargar.mjs (2026-10-20): no-eliteserien, verificado contra roster cacheado de "2023 Eliteserien" (tools/club-league-reference/no.json), coincidencia exacta "Molde".
```

## 2022

### Ingresos

```text
2022: cargado por tools/cargar.mjs (2026-10-20) desde Clubes/Noruega/Molde/aarsregnskap-fotballklubb-fli-2022.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Noruega/Molde/aarsregnskap-fotballklubb-fli-2022.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Mediemsinntekter/tilskudd | pág. 17, precedente |
| 2 | Inntekter Seriekamper | pág. 21, precedente |
| 3 | Inntekter NM Cup | pág. 21, precedente |
| 4 | Inntekter E-Cup | pág. 21, precedente |
| 5 | Oppgjør NM Cup | pág. 21, precedente |
| 6 | Andre inntekter privatkamper etc. | pág. 21, precedente |
| 7 | Avtale MF/sponsor | pág. 17, precedente |
| 8 | Kiosksalg | pág. 22, precedente |
| 9 | Andre driftsinntekter | pág. 22, precedente |
| 10 | Salg spillere/Utleie | pág. 17, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Administrasjon | pág. 17, precedente |
| 2 | Lønn spillere, trenere, støtteapparat og administrasjon | pág. 22, precedente |
| 3 | Arbeidsgiveravgift | pág. 22, precedente |
| 4 | Pensjonskostnad | pág. 22, precedente |
| 5 | Andre ytelser | pág. 22, precedente |
| 6 | Ulgifter treningsløs/privalkamper | pág. 22, Jev 0.97 |
| 7 | Leie treningsbaner etc. | pág. 22, precedente |
| 8 | Sportsrekvisita | pág. 22, precedente |
| 9 | Medisinske tjenester og rekvisita | pág. 22, precedente |
| 10 | Andre sportslige kostnader | pág. 22, precedente |
| 11 | Egne arrangement | pág. 17, precedente |
| 12 | Andres arrangement | pág. 17, Claude 0.8 |
| 13 | Kjøp og leie spillere | pág. 17, precedente |
| 14 | Ulgifter Prosjekt/Titak | pág. 23, precedente |
| 15 | Andre driftskostnader | pág. 23, precedente |
| 16 | Varekjøp og andre kostnader kiosker | pág. 23, precedente |
| 17 | Anleggskostnader | pág. 17, precedente |
| 18 | Avskrivninger | pág. 17, precedente |
| 19 | Tap på fordringer | pág. 17, precedente |

### Meta

```text
tools/cargar.mjs (2026-10-20). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
tools/cargar.mjs (2026-10-20): no-eliteserien, verificado contra roster cacheado de "2022 Eliteserien" (tools/club-league-reference/no.json), coincidencia exacta "Molde".
```

## 2021

### Ingresos

```text
2021: cargado por tools/cargar.mjs (2026-10-20) desde Clubes/Noruega/Molde/aarsregnskap-fotballklubb-fli-2021.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Noruega/Molde/aarsregnskap-fotballklubb-fli-2021.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Medlemskontingent | pág. 26, precedente |
| 2 | Egenandeler/deltakeravgift | pág. 26, precedente |
| 3 | Markedsmidler NFF, NTF og UEFA | pág. 26, precedente |
| 4 | Andre tilskudd | pág. 26, precedente |
| 5 | Inntekter Seriekamper | pág. 26, precedente |
| 6 | Inntekter E-Cup | pág. 26, precedente |
| 7 | Oppgjør NM Cup | pág. 26, precedente |
| 8 | Avtale MF/sponsor | pág. 21, Jev 1 |
| 9 | Kiosksalg | pág. 27, Claude 0.85 |
| 10 | Andre driftsinntekter | pág. 27, Jev 1 |
| 11 | Salg spillere/Utleie | pág. 21, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Administrasjon | pág. 21, precedente |
| 2 | Lønn spillere, trenere, støtteapparat og administrasjon | pág. 27, precedente |
| 3 | Arbeidsgiveravgift | pág. 27, precedente |
| 4 | Pensjonskostnad | pág. 27, precedente |
| 5 | Andre ytelser | pág. 27, precedente |
| 6 | Utgifter treningsleir/privatkamper | pág. 28, precedente |
| 7 | Leie treningsbaner etc. | pág. 28, precedente |
| 8 | Sportsrekvisita | pág. 28, precedente |
| 9 | Medisinske tjenester og rekvisita | pág. 28, precedente |
| 10 | Andre sportslige kostnader | pág. 28, precedente |
| 11 | Baneleie serie- og cupkamper | pág. 28, Jev 0.99 |
| 12 | Avgift Norges Fotballforbund | pág. 28, precedente |
| 13 | Annonsering seriekamper | pág. 28, precedente |
| 14 | Utgifter billettsalg | pág. 28, precedente |
| 15 | Andre arrangementskostnader | pág. 28, precedente |
| 16 | Utgifter cup kamper | pág. 28, precedente |
| 17 | Utgifter e-cup | pág. 28, precedente |
| 18 | Utgifter andre arrangement | pág. 28, precedente |
| 19 | Reisekostnader seriekamper | pág. 28, precedente |
| 20 | Kjøp og leie spillere | pág. 21, precedente |
| 21 | Utgifter Prosjekt/Tiltak | pág. 28, precedente |
| 22 | Andre driftskostnader | pág. 28, precedente |
| 23 | Varekjøp og andre kostnader kiosker | pág. 28, precedente |
| 24 | Anleggskostnader | pág. 21, precedente |
| 25 | Avskrivninger | pág. 21, precedente |

### Meta

```text
tools/cargar.mjs (2026-10-20). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
tools/cargar.mjs (2026-10-20): no-eliteserien, verificado contra roster cacheado de "2021 Eliteserien" (tools/club-league-reference/no.json), coincidencia exacta "Molde".
```

## 2020

### Ingresos

```text
2020: cargado por tools/cargar.mjs (2026-10-20) desde Clubes/Noruega/Molde/aarsregnskap-fotballklubb-fli-2020.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Noruega/Molde/aarsregnskap-fotballklubb-fli-2020.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Medlemskontingent | pág. 22, precedente |
| 2 | Egenandeler/deltakeravgift | pág. 22, precedente |
| 3 | Markedsmidler NFF, NTF og UEFA | pág. 22, precedente |
| 4 | Andre tilskudd | pág. 22, precedente |
| 5 | Inntekter Seriekamper | pág. 22, precedente |
| 6 | Inntekter E-Cup | pág. 22, precedente |
| 7 | Oppgjør NM Cup | pág. 22, precedente |
| 8 | Salg spillere/Utleie spillere | pág. 2, Jev 1 |
| 9 | Kiosksalg | pág. 22, precedente |
| 10 | Andre driftsinntekter | pág. 22, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Lønn spillere, trenere, støtteapparat og administrasjon | pág. 23, precedente |
| 2 | Arbeidsgiveravgift | pág. 23, precedente |
| 3 | Pensjonskostnad | pág. 23, precedente |
| 4 | Andre ytelser | pág. 23, precedente |
| 5 | Avskrivinger | pág. 2, precedente |
| 6 | Administrasjon | pág. 2, precedente |
| 7 | Utgifter treningsleir/privatkamper | pág. 24, precedente |
| 8 | Leie treningsbaner etc. | pág. 24, precedente |
| 9 | Sportsrekvisita | pág. 24, precedente |
| 10 | Medisinske tjenester og rekvisita | pág. 24, precedente |
| 11 | Andre sportslige kostnader | pág. 24, precedente |
| 12 | Baneleie serie- og cupkamper | pág. 24, precedente |
| 13 | Avgift Norges Fotballforbund | pág. 24, precedente |
| 14 | Annonsering seriekamper | pág. 24, precedente |
| 15 | Utgifter billettsalg | pág. 24, precedente |
| 16 | Andre arrangementskostnader | pág. 24, precedente |
| 17 | Kjøp og leie spillere | pág. 2, precedente |
| 18 | Utgifter Prosjekt/Tiltak | pág. 24, precedente |
| 19 | Andre driftskostnader | pág. 24, precedente |
| 20 | Varekjøp og andre kostnader kiosker | pág. 24, precedente |
| 21 | Anleggskontrakter | pág. 2, precedente |
| 22 | Utgifter e-cup | pág. 24, precedente |
| 23 | Utgifter andre arrangement | pág. 24, precedente |
| 24 | Reisekostnader seriekamper | pág. 24, precedente |

### Meta

```text
tools/cargar.mjs (2026-10-20). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
tools/cargar.mjs (2026-10-20): no-eliteserien, verificado contra roster cacheado de "2020 Eliteserien" (tools/club-league-reference/no.json), coincidencia exacta "Molde".
```

## 2019

### Ingresos

```text
2019: cargado por tools/cargar.mjs (2026-10-20) desde Clubes/Noruega/Molde/aarsregnskap-fotballklubb-fli-2019.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Noruega/Molde/aarsregnskap-fotballklubb-fli-2019.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Medlemskontingent | pág. 30, precedente |
| 2 | Egenandeler/deltakeravgift | pág. 30, precedente |
| 3 | Markedsmidler NFF, NTF og UEFA | pág. 30, precedente |
| 4 | Andre tilskudd | pág. 30, precedente |
| 5 | Inntekter Seriekamper | pág. 30, precedente |
| 6 | Inntekter E-Cup | pág. 30, precedente |
| 7 | Oppgjør NM Cup | pág. 30, precedente |
| 8 | Avtale MF/sponsor | pág. 26, Jev 1 |
| 9 | Kiosksalg | pág. 30, Claude 0.85 |
| 10 | Andre driftsinntekter | pág. 30, Jev 1 |
| 11 | Salg spillere/Utleie | pág. 26, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Administrasjon | pág. 26, precedente |
| 2 | Lønn spillere, trenere, støtteapparat og administrasjon | pág. 31, precedente |
| 3 | Arbeidsgiveravgift | pág. 31, precedente |
| 4 | Pensjonskostnad | pág. 31, precedente |
| 5 | Andre ytelser | pág. 31, precedente |
| 6 | Utgifter treningsleir/privatkamper | pág. 32, precedente |
| 7 | Leie treningsbaner etc. | pág. 32, precedente |
| 8 | Sportsrekvisita | pág. 32, precedente |
| 9 | Medisinske tjenester og rekvisita | pág. 32, precedente |
| 10 | Andre sportslige kostnader | pág. 32, precedente |
| 11 | Baneleie serie- og cupkamper | pág. 32, Jev 0.99 |
| 12 | Avgift Norges Fotballforbund | pág. 32, precedente |
| 13 | Annonsering seriekamper | pág. 32, precedente |
| 14 | Utgifter billettsalg | pág. 32, precedente |
| 15 | Andre arrangementskostnader | pág. 32, precedente |
| 16 | Utgifter cup kamper | pág. 32, precedente |
| 17 | Utgifter e-cup | pág. 32, precedente |
| 18 | Utgifter andre arrangement | pág. 32, precedente |
| 19 | Reisekostnader seriekamper | pág. 32, precedente |
| 20 | Kjøp og leie spillere | pág. 26, precedente |
| 21 | Utgifter Prosjekt/Tiltak | pág. 32, precedente |
| 22 | Andre driftskostnader | pág. 32, precedente |
| 23 | Varekjøp og andre kostnader kiosker | pág. 32, precedente |
| 24 | Anleggskostnader | pág. 26, precedente |
| 25 | Avskrivninger | pág. 26, precedente |
| 26 | Tap på fordringer | pág. 26, precedente |

### Meta

```text
tools/cargar.mjs (2026-10-20). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
tools/cargar.mjs (2026-10-20): no-eliteserien, verificado contra roster cacheado de "2019 Eliteserien" (tools/club-league-reference/no.json), coincidencia exacta "Molde".
```

## 2018

### Ingresos

```text
2018: cargado por tools/cargar.mjs (2026-10-20) desde Clubes/Noruega/Molde/aarsregnskap-fotballklubb-fli-2018.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Noruega/Molde/aarsregnskap-fotballklubb-fli-2018.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Medlemskontingent | pág. 27, precedente |
| 2 | Egenandeler/deltakeravgift | pág. 27, precedente |
| 3 | Markedsmidler NFF, NTF og UEFA | pág. 27, precedente |
| 4 | Andre tilskudd | pág. 27, precedente |
| 5 | Inntekter Seriekamper | pág. 27, precedente |
| 6 | Inntekter E-Cup | pág. 27, precedente |
| 7 | Oppgjør NM Cup | pág. 27, precedente |
| 8 | Andre inntekter privatkamper etc. | pág. 27, precedente |
| 9 | Avtale MF/sponsor | pág. 24, Jev 1 |
| 10 | Kiosksalg | pág. 28, Claude 0.85 |
| 11 | Andre driftsinntekter | pág. 28, Jev 1 |
| 12 | Salg spillere/Utleie | pág. 24, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Administrasjon | pág. 24, precedente |
| 2 | Lønn spillere, trenere, støtteapparat og administrasjon | pág. 28, precedente |
| 3 | Arbeidsgiveravgift | pág. 28, precedente |
| 4 | Pensjonskostnad | pág. 28, precedente |
| 5 | Andre ytelser | pág. 28, precedente |
| 6 | Utgifter treningsleir/privatkamper | pág. 29, precedente |
| 7 | Leie treningsbaner etc. | pág. 29, precedente |
| 8 | Sportsrekvisita | pág. 29, precedente |
| 9 | Medisinske tjenester og rekvisita | pág. 29, precedente |
| 10 | Andre sportslige kostnader | pág. 29, precedente |
| 11 | Baneleie serie- og cupkamper | pág. 29, Jev 0.99 |
| 12 | Avgift Norges Fotballforbund | pág. 29, precedente |
| 13 | Annonsering seriekamper | pág. 29, precedente |
| 14 | Utgifter billettsalg | pág. 29, precedente |
| 15 | Andre arrangementskostnader | pág. 29, precedente |
| 16 | Utgifter cup kamper | pág. 29, precedente |
| 17 | Utgifter e-cup | pág. 29, precedente |
| 18 | Utgifter andre arrangement | pág. 29, precedente |
| 19 | Reisekostnader seriekamper | pág. 29, precedente |
| 20 | Kjøp spillere | pág. 28, Jev 0.91 |
| 21 | Leie spillere | pág. 28, Jev 0.95 |
| 22 | Utgifter Prosjekt/Tiltak | pág. 29, precedente |
| 23 | Andre driftskostnader | pág. 29, precedente |
| 24 | Varekjøp og andre kostnader kiosker | pág. 29, precedente |
| 25 | Anleggskostnader | pág. 24, precedente |
| 26 | Avskrivninger | pág. 24, precedente |
| 27 | Tap på fordringer | pág. 24, precedente |

### Meta

```text
tools/cargar.mjs (2026-10-20). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
tools/cargar.mjs (2026-10-20): no-eliteserien, verificado contra roster cacheado de "2018 Eliteserien" (tools/club-league-reference/no.json), coincidencia exacta "Molde".
```

## 2017

### Ingresos

```text
2017: cargado por tools/cargar.mjs (2026-10-20) desde Clubes/Noruega/Molde/aarsregnskap-fotballklubb-fli-2017.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Noruega/Molde/aarsregnskap-fotballklubb-fli-2017.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Medlemskontingent | pág. 29, precedente |
| 2 | Egenandeler/deltakeravgift | pág. 29, precedente |
| 3 | Markedsmidler NFF, NTF og UEFA | pág. 29, precedente |
| 4 | Andre tilskudd | pág. 29, precedente |
| 5 | Inntekter Seriekamper | pág. 29, precedente |
| 6 | Inntekter NM Cup | pág. 29, precedente |
| 7 | Inntekter E-Cup | pág. 29, precedente |
| 8 | Oppgjør NM Cup | pág. 29, precedente |
| 9 | Andre inntekter privatkamper etc. | pág. 29, precedente |
| 10 | Avtale MF/sponsor | pág. 26, Jev 1 |
| 11 | Andre driftsinntekter | pág. 26, precedente |
| 12 | Salg spillere/Utleie | pág. 26, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Administrasjon | pág. 26, precedente |
| 2 | Lønn spillere, trenere, støtteapparat og administrasjon | pág. 30, precedente |
| 3 | Arbeidsgiveravgift | pág. 30, precedente |
| 4 | Pensjonskostnad | pág. 30, precedente |
| 5 | Andre ytelser | pág. 30, precedente |
| 6 | Utgifter treningsleir/privatkamper | pág. 31, precedente |
| 7 | Leie treningsbaner etc. | pág. 31, precedente |
| 8 | Sportsrekvisita | pág. 31, precedente |
| 9 | Medisinske tjenester og rekvisita | pág. 31, precedente |
| 10 | Andre sportslige kostnader | pág. 31, precedente |
| 11 | Egne arrangement | pág. 26, Jev 0.9 |
| 12 | Utgifter cup kamper | pág. 31, precedente |
| 13 | Utgifter e-cup | pág. 31, precedente |
| 14 | Utgifter andre arrangement | pág. 31, precedente |
| 15 | Reisekostnader seriekamper | pág. 31, precedente |
| 16 | Kjøp spillere | pág. 30, Jev 0.91 |
| 17 | Leie spillere | pág. 30, Jev 0.95 |
| 18 | Utgifter Prosjekt/Tiltak | pág. 31, precedente |
| 19 | Andre driftskostnader | pág. 31, precedente |
| 20 | Varekjøp og andre kostnader kiosker | pág. 31, precedente |
| 21 | Anleggskostnader | pág. 26, precedente |
| 22 | Avskrivninger | pág. 26, precedente |
| 23 | Tap på fordringer | pág. 26, precedente |

### Meta

```text
tools/cargar.mjs (2026-10-20). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
tools/cargar.mjs (2026-10-20): no-eliteserien, verificado contra roster cacheado de "2017 Eliteserien" (tools/club-league-reference/no.json), coincidencia exacta "Molde".
```

## 2016

### Ingresos

```text
2016: cargado por tools/cargar.mjs (2026-10-20) desde Clubes/Noruega/Molde/aarsregnskap-fotballklubb-fli-2016.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Noruega/Molde/aarsregnskap-fotballklubb-fli-2016.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Medlemskontingent | pág. 30, precedente |
| 2 | Egenandeler/deltakeravgift | pág. 30, precedente |
| 3 | Markedsmidler NFF, NTF og UEFA | pág. 30, precedente |
| 4 | Andre tilskudd | pág. 30, precedente |
| 5 | Inntekter Seriekamper | pág. 30, precedente |
| 6 | Inntekter E-Cup | pág. 30, precedente |
| 7 | Oppgjør NM Cup | pág. 30, precedente |
| 8 | Andre inntekter privatkamper etc. | pág. 30, precedente |
| 9 | Avtale MF/sponsor | pág. 27, precedente |
| 10 | Andre driftsinntekter | pág. 27, precedente |
| 11 | Salg spillere/Utleie | pág. 27, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Administrasjon | pág. 27, precedente |
| 2 | Lønn spillere, trenere, støtteapparat og administrasjon | pág. 31, precedente |
| 3 | Arbeidsgiveravgift | pág. 31, precedente |
| 4 | Pensjonskostnad | pág. 31, precedente |
| 5 | Andre ytelser | pág. 31, precedente |
| 6 | Utgifter treningsleir/privatkamper | pág. 32, precedente |
| 7 | Leie treningsbaner etc. | pág. 32, precedente |
| 8 | Sportsrekvisita | pág. 32, precedente |
| 9 | Medisinske tjenester og rekvisita | pág. 32, precedente |
| 10 | Andre sportslige kostnader | pág. 32, precedente |
| 11 | Baneleie serie- og cupkamper | pág. 32, precedente |
| 12 | Avgift Norges Fotballforbund | pág. 32, precedente |
| 13 | Annonsering seriekamper | pág. 32, precedente |
| 14 | Utgifter billettsalg | pág. 32, precedente |
| 15 | Andre arrangementskostnader | pág. 32, precedente |
| 16 | Utgifter cup kamper | pág. 32, precedente |
| 17 | Utgifter e-cup | pág. 32, precedente |
| 18 | Utgifter andre arrangement | pág. 32, precedente |
| 19 | Reisekostnader seriekamper | pág. 32, precedente |
| 20 | Kjøp og leie spillere | pág. 27, precedente |
| 21 | Utgifter Prosjekt/Tiltak | pág. 32, precedente |
| 22 | Andre driftskostnader | pág. 32, precedente |
| 23 | Varekjøp og andre kostnader kiosker | pág. 32, precedente |
| 24 | Anleggskostnader | pág. 27, precedente |
| 25 | Avskrivninger | pág. 27, precedente |
| 26 | Tap på fordringer | pág. 27, precedente |

### Meta

```text
tools/cargar.mjs (2026-10-20). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
tools/cargar.mjs (2026-10-20): no-eliteserien, verificado contra roster cacheado de "2016 Eliteserien" (tools/club-league-reference/no.json), coincidencia exacta "Molde".
```

## 2015

### Ingresos

```text
2015: cargado por tools/cargar.mjs (2026-10-20) desde Clubes/Noruega/Molde/aarsregnskap-fotballklubb-fli-2015.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Noruega/Molde/aarsregnskap-fotballklubb-fli-2015.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Medlemskontingent | pág. 13, precedente |
| 2 | Egenandeler/deltakeravgift | pág. 13, precedente |
| 3 | Markedsmidler NFF, NTF og UEFA | pág. 13, precedente |
| 4 | Andre tilskudd | pág. 13, precedente |
| 5 | Inntekter Seriekamper | pág. 13, precedente |
| 6 | Inntekter NM Cup | pág. 13, precedente |
| 7 | Inntekter E-Cup | pág. 13, precedente |
| 8 | Oppgjør NM Cup | pág. 13, precedente |
| 9 | Andre inntekter privatkamper etc. | pág. 13, precedente |
| 10 | Avtale MF/sponsor | pág. 10, Jev 1 |
| 11 | Kiosksalg | pág. 14, Claude 0.85 |
| 12 | Andre driftsinntekter | pág. 14, Jev 1 |
| 13 | Salg spillere/Utleie | pág. 10, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Administrasjon | pág. 10, precedente |
| 2 | Lønn spillere, trenere, støtteapparat og administrasjon | pág. 14, precedente |
| 3 | Arbeidsgiveravgift | pág. 14, precedente |
| 4 | Pensjonskostnad | pág. 14, precedente |
| 5 | Andre ytelser | pág. 14, precedente |
| 6 | Utgifter treningsleir/privatkamper | pág. 15, precedente |
| 7 | Leie treningsbaner etc. | pág. 15, precedente |
| 8 | Sportsrekvisita | pág. 15, precedente |
| 9 | Medisinske tjenester og rekvisita | pág. 15, precedente |
| 10 | Andre sportslige kostnader | pág. 15, precedente |
| 11 | Baneleie serie- og cupkamper | pág. 15, Jev 0.99 |
| 12 | Avgift Norges Fotballforbund | pág. 15, precedente |
| 13 | Annonsering seriekamper | pág. 15, precedente |
| 14 | Utgifter billettsalg | pág. 15, precedente |
| 15 | Andre arrangementskostnader | pág. 15, precedente |
| 16 | Utgifter cup kamper | pág. 15, precedente |
| 17 | Utgifter e-cup | pág. 15, precedente |
| 18 | Utgifter andre arrangement | pág. 15, precedente |
| 19 | Reisekostnader seriekamper | pág. 15, precedente |
| 20 | Kjøp spillere | pág. 14, Jev 0.91 |
| 21 | Leie spillere | pág. 14, Jev 0.95 |
| 22 | Utgifter Prosjekt/Tiltak | pág. 15, precedente |
| 23 | Andre driftskostnader | pág. 15, precedente |
| 24 | Varekjøp og andre kostnader kiosker | pág. 15, precedente |
| 25 | Anleggskostnader | pág. 10, precedente |
| 26 | Avskrivninger | pág. 10, precedente |
| 27 | Tap på fordringer | pág. 10, precedente |

### Meta

```text
tools/cargar.mjs (2026-10-20). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
tools/cargar.mjs (2026-10-20): no-eliteserien, verificado contra roster cacheado de "2015 Tippeligaen" (tools/club-league-reference/no.json), coincidencia exacta "Molde".
```

## 2014

### Ingresos

```text
2014: cargado por tools/cargar.mjs (2026-10-20) desde Clubes/Noruega/Molde/aarsregnskap-fotballklubb-fli-2014.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Noruega/Molde/aarsregnskap-fotballklubb-fli-2014.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Medlemskontingent | pág. 20, precedente |
| 2 | Egenandeler/deltakeravgift | pág. 20, precedente |
| 3 | Markedsmidler NFF, NTF og UEFA | pág. 20, precedente |
| 4 | Andre tilskudd | pág. 20, precedente |
| 5 | Inntekter Seriekamper | pág. 20, precedente |
| 6 | Inntekter NM Cup | pág. 20, precedente |
| 7 | Inntekter E-Cup | pág. 20, precedente |
| 8 | Oppgjør NM Cup | pág. 20, precedente |
| 9 | Andre inntekter privatkamper etc. | pág. 20, precedente |
| 10 | Avtale MF/sponsor | pág. 17, Jev 1 |
| 11 | Kiosksalg | pág. 21, Claude 0.85 |
| 12 | Andre driftsinntekter | pág. 21, Jev 1 |
| 13 | Salg spillere/Utleie | pág. 17, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Administrasjon | pág. 17, precedente |
| 2 | Lønn spillere, trenere, støtteapparat og administrasjon | pág. 21, precedente |
| 3 | Arbeidsgiveravgift | pág. 21, precedente |
| 4 | Pensjonskostnad | pág. 21, precedente |
| 5 | Andre ytelser | pág. 21, precedente |
| 6 | Utgifter treningsleir/privatkamper | pág. 22, precedente |
| 7 | Leie treningsbaner etc. | pág. 22, precedente |
| 8 | Sportsrekvisita | pág. 22, precedente |
| 9 | Medisinske tjenester og rekvisita | pág. 22, precedente |
| 10 | Andre sportslige kostnader | pág. 22, precedente |
| 11 | Baneleie serie- og cupkamper | pág. 22, Jev 0.99 |
| 12 | Avgift Norges Fotballforbund | pág. 22, precedente |
| 13 | Annonsering seriekamper | pág. 22, precedente |
| 14 | Utgifter billettsalg | pág. 22, precedente |
| 15 | Andre arrangementskostnader | pág. 22, precedente |
| 16 | Utgifter cup kamper | pág. 22, precedente |
| 17 | Utgifter e-cup | pág. 22, precedente |
| 18 | Utgifter andre arrangement | pág. 22, precedente |
| 19 | Reisekostnader seriekamper | pág. 22, precedente |
| 20 | Kjøp og leie spillere | pág. 17, precedente |
| 21 | Utgifter Prosjekt/Tiltak | pág. 22, precedente |
| 22 | Andre driftskostnader | pág. 22, precedente |
| 23 | Varekjøp og andre kostnader kiosker | pág. 22, precedente |
| 24 | Anleggskostnader | pág. 17, precedente |
| 25 | Avskrivninger | pág. 17, precedente |
| 26 | Tap på fordringer | pág. 17, precedente |

### Meta

```text
tools/cargar.mjs (2026-10-20). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
tools/cargar.mjs (2026-10-20): no-eliteserien, verificado contra roster cacheado de "2014 Eliteserien" (tools/club-league-reference/no.json), coincidencia exacta "Molde".
```

## 2013

### Ingresos

```text
2013: cargado por tools/cargar.mjs (2026-10-20) desde Clubes/Noruega/Molde/aarsregnskap-fotballklubb-fli-2013.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Noruega/Molde/aarsregnskap-fotballklubb-fli-2013.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Medlemskontingent | pág. 18, precedente |
| 2 | Egenandeler/deltakeravgift | pág. 18, precedente |
| 3 | Markedsmidler NFF, NTF og UEFA | pág. 18, precedente |
| 4 | Andre tilskudd | pág. 18, precedente |
| 5 | Inntekter Seriekamper | pág. 18, precedente |
| 6 | Inntekter NM Cup | pág. 18, precedente |
| 7 | Inntekter E-Cup | pág. 18, precedente |
| 8 | Oppgjør NM Cup | pág. 18, precedente |
| 9 | Landskamp | pág. 18, Claude 0.8 |
| 10 | Andre inntekter privatkamper etc. | pág. 18, precedente |
| 11 | Avtale MF/sponsor | pág. 15, Jev 1 |
| 12 | Kiosksalg | pág. 19, Claude 0.85 |
| 13 | Andre driftsinntekter | pág. 19, Jev 1 |
| 14 | Salg spillere/Utleie | pág. 15, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Administrasjon | pág. 15, precedente |
| 2 | Lønn spillere, trenere, støtteapparat og administrasjon | pág. 20, precedente |
| 3 | Arbeidsgiveravgift | pág. 20, precedente |
| 4 | Pensjonskostnad | pág. 20, precedente |
| 5 | Andre ytelser | pág. 20, precedente |
| 6 | Utgifter treningsleir/privatkamper | pág. 20, precedente |
| 7 | Leie treningsbaner etc. | pág. 20, precedente |
| 8 | Sportsrekvisita | pág. 20, precedente |
| 9 | Medisinske tjenester og rekvisita | pág. 20, precedente |
| 10 | Andre sportslige kostnader | pág. 20, precedente |
| 11 | Baneleie serie- og cupkamper | pág. 20, Jev 0.99 |
| 12 | Avgift Norges Fotballforbund | pág. 20, precedente |
| 13 | Annonsering seriekamper | pág. 20, precedente |
| 14 | Utgifter billettsalg | pág. 20, precedente |
| 15 | Andre arrangementskostnader | pág. 20, precedente |
| 16 | Utgifter cup kamper | pág. 21, precedente |
| 17 | Utgifter e-cup | pág. 21, precedente |
| 18 | Utgifter andre arrangement | pág. 21, precedente |
| 19 | Reisekostnader seriekamper | pág. 21, precedente |
| 20 | Kjøp og leie spillere | pág. 15, precedente |
| 21 | Utgifter Prosjekt/Tiltak | pág. 21, precedente |
| 22 | Andre driftskostnader | pág. 21, precedente |
| 23 | Varekjøp og andre kostnader kiosker | pág. 21, precedente |
| 24 | Anleggskostnader | pág. 15, precedente |
| 25 | Avskrivninger | pág. 15, precedente |
| 26 | Tap på fordringer | pág. 15, precedente |

### Meta

```text
tools/cargar.mjs (2026-10-20). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
tools/cargar.mjs (2026-10-20): no-eliteserien, verificado contra roster cacheado de "2013 Tippeligaen" (tools/club-league-reference/no.json), coincidencia exacta "Molde".
```

## 2012

### Ingresos

```text
2012: cargado por tools/cargar.mjs (2026-10-20) desde Clubes/Noruega/Molde/aarsregnskap-fotballklubb-fli-2012.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Noruega/Molde/aarsregnskap-fotballklubb-fli-2012.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Medlemskontigent | pág. 18, precedente |
| 2 | Egenandeler/deltakeravgift | pág. 18, precedente |
| 3 | Markedsmidler NFF, NTF og UEFA | pág. 18, precedente |
| 4 | Andre tilskudd | pág. 18, precedente |
| 5 | Inntekter Seriekamper | pág. 18, precedente |
| 6 | Inntekter NM Cup | pág. 18, precedente |
| 7 | Inntekter E-Cup | pág. 18, precedente |
| 8 | Oppgjør NM Cup | pág. 18, precedente |
| 9 | Andre inntekter privatkamper etc. | pág. 18, precedente |
| 10 | Avtale MF/sponsor | pág. 15, Jev 1 |
| 11 | Kiosksalg | pág. 18, Claude 0.85 |
| 12 | Andre driftsinntekter | pág. 18, Jev 1 |
| 13 | Salg spillere/Utleie | pág. 15, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Administrasjon | pág. 15, precedente |
| 2 | Lønn spillere, trenere, støtteapparat og administrasjon | pág. 19, precedente |
| 3 | Arbeidsgiveravgift | pág. 19, precedente |
| 4 | Pensjonskostnad | pág. 19, precedente |
| 5 | Andre ytelser | pág. 19, precedente |
| 6 | Utgifter treningsleir/privatkamper | pág. 20, precedente |
| 7 | Leie treningsbaner etc. | pág. 20, precedente |
| 8 | Sportsrekvisita | pág. 20, precedente |
| 9 | Medisinske tjenester og rekvisita | pág. 20, precedente |
| 10 | Andre sportslige kostnader | pág. 20, precedente |
| 11 | Baneleie serie- og cupkamper | pág. 20, Jev 0.99 |
| 12 | Avgift Norges Fotballforbund | pág. 20, precedente |
| 13 | Annonsering seriekamper | pág. 20, precedente |
| 14 | Utgifter billettsalg | pág. 20, precedente |
| 15 | Andre arrangementskostnader | pág. 20, precedente |
| 16 | Utgifter cup kamper | pág. 20, precedente |
| 17 | Utgifter e-cup | pág. 20, precedente |
| 18 | Utgifter andre arrangement | pág. 20, precedente |
| 19 | Reisekostnader seriekamper | pág. 20, precedente |
| 20 | Kjøp spillere | pág. 19, Jev 0.91 |
| 21 | Leie spillere | pág. 19, Jev 0.95 |
| 22 | Utgifter Prosjekt/Tiltak | pág. 20, precedente |
| 23 | Andre driftskostnader | pág. 20, precedente |
| 24 | Varekjøp og andre kostnader kiosker | pág. 20, precedente |
| 25 | Anleggskostnader | pág. 15, precedente |
| 26 | Avskrivninger | pág. 15, precedente |
| 27 | Tap på fordringer | pág. 15, precedente |

### Meta

```text
tools/cargar.mjs (2026-10-20). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
tools/cargar.mjs (2026-10-20): no-eliteserien, verificado contra roster cacheado de "2012 Eliteserien" (tools/club-league-reference/no.json), coincidencia exacta "Molde".
```

## 2011

### Ingresos

```text
2011: cargado por tools/cargar.mjs (2026-10-20) desde Clubes/Noruega/Molde/aarsregnskap-fotballklubb-fli-2011.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Noruega/Molde/aarsregnskap-fotballklubb-fli-2011.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Medlemskontigent | pág. 18, precedente |
| 2 | Egenandeler/deltakeravgift | pág. 18, precedente |
| 3 | Markedsmidler NFF, NTF og UEFA | pág. 18, precedente |
| 4 | Andre tilskudd | pág. 18, precedente |
| 5 | Inntekter Seriekamper | pág. 18, precedente |
| 6 | Inntekter NM Cup | pág. 18, precedente |
| 7 | Oppgjør NM Cup | pág. 18, precedente |
| 8 | Andre inntekter privatkamper etc. | pág. 18, precedente |
| 9 | Avtale MF/sponsor | pág. 15, Jev 1 |
| 10 | Kiosksalg | pág. 18, Claude 0.85 |
| 11 | Andre driftsinntekter | pág. 18, Jev 1 |
| 12 | Salg spillere/Utleie | pág. 15, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Administrasjon | pág. 15, precedente |
| 2 | Lønn spillere, trenere, støtteapparat og administrasjon | pág. 19, precedente |
| 3 | Arbeidsgiveravgift | pág. 19, precedente |
| 4 | Pensjonskostnad | pág. 19, precedente |
| 5 | Andre ytelser | pág. 19, precedente |
| 6 | Utgifter treningsleir/privatkamper | pág. 20, precedente |
| 7 | Leie treningsbaner etc. | pág. 20, precedente |
| 8 | Sportsrekvisita | pág. 20, precedente |
| 9 | Medisinske tjenester og rekvisita | pág. 20, precedente |
| 10 | Andre sportslige kostnader | pág. 20, precedente |
| 11 | Baneleie serie- og cupkamper | pág. 20, Jev 0.99 |
| 12 | Avgift Norges Fotballforbund | pág. 20, precedente |
| 13 | Annonsering seriekamper | pág. 20, precedente |
| 14 | Utgifter billettsalg | pág. 20, precedente |
| 15 | Andre arrangementskostnader | pág. 20, precedente |
| 16 | Utgifter Cup kamper | pág. 20, precedente |
| 17 | Utgifter andre arrangement | pág. 20, precedente |
| 18 | Reisekostnader seriekamper | pág. 20, precedente |
| 19 | Kjøp spillere | pág. 19, Jev 0.91 |
| 20 | Leie spillere | pág. 19, Jev 0.95 |
| 21 | Utgifter Prosjekt/Tiltak | pág. 20, precedente |
| 22 | Andre driftskostnader | pág. 20, precedente |
| 23 | Varekjøp og andre kostnader klosker | pág. 20, precedente |
| 24 | Anleggskostnader | pág. 15, precedente |
| 25 | Avskrivninger | pág. 15, precedente |
| 26 | Avskriving immaterielle eiendeler | pág. 15, precedente |

### Meta

```text
tools/cargar.mjs (2026-10-20). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
tools/cargar.mjs (2026-10-20): null, SIN VERIFICAR (no hay ninguna liga-temporada de no 2011 cacheada).
```

## 2010

### Ingresos

```text
2010: cargado por tools/cargar.mjs (2026-10-20) desde Clubes/Noruega/Molde/aarsregnskap-fotballklubb-fli-2010.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Noruega/Molde/aarsregnskap-fotballklubb-fli-2010.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Medlemsinntekter/tilskudd | pág. 17, precedente |
| 2 | Inntekter Seriekamper | pág. 20, precedente |
| 3 | Inntekter NM Cup | pág. 20, precedente |
| 4 | Inntekter E-Cup | pág. 20, precedente |
| 5 | Oppgjør NM Cup | pág. 20, precedente |
| 6 | Andre inntekter privatkamper etc. | pág. 20, precedente |
| 7 | Avtale MF/sponsor | pág. 17, Jev 1 |
| 8 | Andre driftsinntekter | pág. 17, precedente |
| 9 | Salg spillere/Utleie | pág. 17, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Administrasjon | pág. 17, precedente |
| 2 | Lønn spillere, trenere, støtteapparat og administrasjon | pág. 21, precedente |
| 3 | Arbeidsgiveravgift | pág. 21, precedente |
| 4 | Pensjonskostnad | pág. 21, precedente |
| 5 | Andre ytelser | pág. 21, precedente |
| 6 | Utgifter treningsleir/privatkamper | pág. 22, precedente |
| 7 | Leie treningsbaner etc. | pág. 22, precedente |
| 8 | Sportsrekvisita | pág. 22, precedente |
| 9 | Medisinske tjenester og rekvisita | pág. 22, precedente |
| 10 | Andre sportslige kostnader | pág. 22, precedente |
| 11 | Baneleie serie- og cupkamper | pág. 22, Jev 0.99 |
| 12 | Avgift Norges Fotballforbund | pág. 22, precedente |
| 13 | Annonsering seriekamper | pág. 22, precedente |
| 14 | Utgifter billettsalg | pág. 22, precedente |
| 15 | Andre arrangementskostnader | pág. 22, precedente |
| 16 | Utgifter Cup kamper | pág. 22, precedente |
| 17 | Utgifter E-Cup | pág. 22, precedente |
| 18 | Utgifter andre arrangement | pág. 22, precedente |
| 19 | Reisekostnader seriekamper | pág. 22, precedente |
| 20 | Kjøp spillere | pág. 21, Jev 0.91 |
| 21 | Leie spillere | pág. 21, Jev 0.95 |
| 22 | Utgifter Prosjekt/Tiltak | pág. 22, precedente |
| 23 | Andre driftskostnader | pág. 22, precedente |
| 24 | Varekjøp og andre kostnader kiosker | pág. 22, precedente |
| 25 | Anleggskostnader | pág. 17, precedente |
| 26 | Avskrivninger | pág. 17, precedente |
| 27 | Tap på fordringer | pág. 17, precedente |

### Meta

```text
tools/cargar.mjs (2026-10-20). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
tools/cargar.mjs (2026-10-20): no-eliteserien, verificado contra roster cacheado de "2010 Tippeligaen" (tools/club-league-reference/no.json), coincidencia exacta "Molde".
```

## 2009

### Ingresos

```text
2009: cargado por tools/cargar.mjs (2026-10-20) desde Clubes/Noruega/Molde/aarsregnskap-fotballklubb-fli-2009.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Noruega/Molde/aarsregnskap-fotballklubb-fli-2009.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Medlemskontigent | pág. 5, precedente |
| 2 | Egenandeler/deltakeravgift | pág. 5, precedente |
| 3 | Markedsmidler NFF, NTF og UEFA | pág. 5, precedente |
| 4 | Andre tilskudd | pág. 5, precedente |
| 5 | Inntekter Seriekamper | pág. 5, precedente |
| 6 | Inntekter NM Cup | pág. 5, precedente |
| 7 | Oppgjør NM Cup | pág. 5, precedente |
| 8 | Andre inntekter privatkamper etc. | pág. 5, precedente |
| 9 | Avtale MF/sponsor | pág. 2, Jev 1 |
| 10 | Andre driftsinntekter | pág. 2, precedente |
| 11 | Salg spillere/Utleie | pág. 2, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Administrasjon | pág. 2, precedente |
| 2 | Lønn spillere, trenere, støtteapparat og administrasjon | pág. 6, precedente |
| 3 | Arbeidsgiveravgift | pág. 6, precedente |
| 4 | Pensjonskostnad | pág. 6, precedente |
| 5 | Andre ytelser | pág. 6, precedente |
| 6 | Utgifter treningsleir/privatkamper | pág. 6, precedente |
| 7 | Leie treningsbaner etc. | pág. 6, precedente |
| 8 | Sportsrekvisita | pág. 6, precedente |
| 9 | Medisinske tjenester og rekvisita | pág. 6, precedente |
| 10 | Andre sportslige kostnader | pág. 6, precedente |
| 11 | Baneleie serie- og cupkamper | pág. 7, Jev 0.99 |
| 12 | Avgift Norges Fotballforbund | pág. 7, precedente |
| 13 | Annonsering seriekamper | pág. 7, precedente |
| 14 | Utgifter billettsalg | pág. 7, precedente |
| 15 | Andre arrangementskostnader | pág. 7, precedente |
| 16 | Utgifter Cup kamper | pág. 7, precedente |
| 17 | Utgifter andre arrangement | pág. 7, precedente |
| 18 | Reisekostnader seriekamper | pág. 7, precedente |
| 19 | Kjøp spillere/Leie spillere | pág. 2, Jev 0.98 |
| 20 | Utgifter Prosjekt/Tiltak | pág. 7, precedente |
| 21 | Andre driftskostnader | pág. 7, precedente |
| 22 | Varekjøp og andre kostnader kiosker | pág. 7, precedente |
| 23 | Anleggskostnader | pág. 2, precedente |
| 24 | Avskrivninger | pág. 2, precedente |
| 25 | Tap på fordringer | pág. 2, precedente |

### Meta

```text
tools/cargar.mjs (2026-10-20). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
tools/cargar.mjs (2026-10-20): no-eliteserien, verificado contra roster cacheado de "2009 Tippeligaen" (tools/club-league-reference/no.json), coincidencia exacta "Molde".
```

## 2008

### Ingresos

```text
2008: cargado por tools/cargar.mjs (2026-10-20) desde Clubes/Noruega/Molde/aarsregnskap-fotballklubb-fli-2008.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Noruega/Molde/aarsregnskap-fotballklubb-fli-2008.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Medlemskontigent | pág. 18, precedente |
| 2 | Egenandeler/deltakeravgift | pág. 18, precedente |
| 3 | Markedsmidler NFF, NTF og UEFA | pág. 18, precedente |
| 4 | Andre tilskudd | pág. 18, precedente |
| 5 | Inntekter Seriekamper | pág. 18, precedente |
| 6 | Inntekter NM Cup | pág. 18, precedente |
| 7 | Oppgjør NM Cup | pág. 18, precedente |
| 8 | Andre inntekter privatkamper etc. | pág. 18, precedente |
| 9 | Avtale MF/sponsor | pág. 15, Jev 1 |
| 10 | Andre driftsinntekter | pág. 15, precedente |
| 11 | Salg spillere/Utleie | pág. 15, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Administrasjon | pág. 15, precedente |
| 2 | Lønn spillere, trenere og støtteapparat | pág. 19, Jev 1 |
| 3 | Folketrygdavgift | pág. 19, Claude 0.88 |
| 4 | Pensjonskostnad | pág. 19, precedente |
| 5 | Andre ytelser | pág. 19, precedente |
| 6 | Trening/utstyr | pág. 15, Claude 0.8 |
| 7 | Baneleie seriekamper | pág. 20, Jev 0.99 |
| 8 | Avgift Norges Fotballforbund | pág. 20, precedente |
| 9 | Annonsering seriekamper | pág. 20, precedente |
| 10 | Utgifter billettsalg | pág. 20, precedente |
| 11 | Andre arrangementskostnader | pág. 20, precedente |
| 12 | Utgifter Cup kamper | pág. 20, precedente |
| 13 | Utgifter andre arrangement | pág. 20, precedente |
| 14 | Reisekostnader seriekamper | pág. 20, precedente |
| 15 | Kjøp spillere | pág. 19, Jev 0.91 |
| 16 | Leie spillere | pág. 19, Jev 0.95 |
| 17 | Andre driftskostnader | pág. 15, Jev 0.93 |
| 18 | Anleggskostnader | pág. 15, precedente |
| 19 | Avskrivninger | pág. 15, precedente |
| 20 | Tap på fordringer | pág. 15, precedente |

### Meta

```text
tools/cargar.mjs (2026-10-20). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
tools/cargar.mjs (2026-10-20): no-eliteserien, verificado contra roster cacheado de "2008 Eliteserien" (tools/club-league-reference/no.json), coincidencia exacta "Molde".
```

## Fuentes

### molde-no-aarsregnskap-fotballklubb-fli-2025

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-19) desde la transcripción Clubes/Noruega/Molde/aarsregnskap-fotballklubb-fli-2025.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### molde-no-aarsregnskap-fotballklubb-fli-2009

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-20) desde la transcripción Clubes/Noruega/Molde/aarsregnskap-fotballklubb-fli-2009.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### molde-no-aarsregnskap-fotballklubb-fli-2013

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-20) desde la transcripción Clubes/Noruega/Molde/aarsregnskap-fotballklubb-fli-2013.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### molde-no-aarsregnskap-fotballklubb-fli-2014

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-20) desde la transcripción Clubes/Noruega/Molde/aarsregnskap-fotballklubb-fli-2014.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### molde-no-aarsregnskap-fotballklubb-fli-2015

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-20) desde la transcripción Clubes/Noruega/Molde/aarsregnskap-fotballklubb-fli-2015.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### molde-no-aarsregnskap-fotballklubb-fli-2017

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-20) desde la transcripción Clubes/Noruega/Molde/aarsregnskap-fotballklubb-fli-2017.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### molde-no-aarsregnskap-fotballklubb-fli-2018

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-20) desde la transcripción Clubes/Noruega/Molde/aarsregnskap-fotballklubb-fli-2018.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### molde-no-aarsregnskap-fotballklubb-fli-2021

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-20) desde la transcripción Clubes/Noruega/Molde/aarsregnskap-fotballklubb-fli-2021.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### molde-no-aarsregnskap-fotballklubb-fli-2023

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-20) desde la transcripción Clubes/Noruega/Molde/aarsregnskap-fotballklubb-fli-2023.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### molde-no-aarsregnskap-fotballklubb-fli-2019

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-20) desde la transcripción Clubes/Noruega/Molde/aarsregnskap-fotballklubb-fli-2019.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### molde-no-aarsregnskap-fotballklubb-fli-2022

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-20) desde la transcripción Clubes/Noruega/Molde/aarsregnskap-fotballklubb-fli-2022.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### molde-no-aarsregnskap-fotballklubb-fli-2020

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-20) desde la transcripción Clubes/Noruega/Molde/aarsregnskap-fotballklubb-fli-2020.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### molde-no-aarsregnskap-fotballklubb-fli-2008

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-20) desde la transcripción Clubes/Noruega/Molde/aarsregnskap-fotballklubb-fli-2008.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### molde-no-aarsregnskap-fotballklubb-fli-2010

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-20) desde la transcripción Clubes/Noruega/Molde/aarsregnskap-fotballklubb-fli-2010.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### molde-no-aarsregnskap-fotballklubb-fli-2011

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-20) desde la transcripción Clubes/Noruega/Molde/aarsregnskap-fotballklubb-fli-2011.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### molde-no-aarsregnskap-fotballklubb-fli-2012

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-20) desde la transcripción Clubes/Noruega/Molde/aarsregnskap-fotballklubb-fli-2012.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### molde-no-aarsregnskap-fotballklubb-fli-2016

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-20) desde la transcripción Clubes/Noruega/Molde/aarsregnskap-fotballklubb-fli-2016.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### molde-no-aarsregnskap-fotballklubb-fli-2024

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-20) desde la transcripción Clubes/Noruega/Molde/aarsregnskap-fotballklubb-fli-2024.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

## Liga de 2011 (2026-10-26)

```text
no-eliteserien: Molde está en la lista de Wikipedia en inglés de «2011 Tippeligaen» y en la de no.wikipedia «Tippeligaen 2011» (unidas por Wikidata, 16 de 16): segunda-fuente-wikipedia-local.mjs.
```
