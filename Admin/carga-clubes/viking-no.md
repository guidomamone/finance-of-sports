# viking-no — evidencia de carga

Lo que antes iba como comentario en el data file del club, `data/<país>/viking-no-data.js` (la regla: `Admin/CONVENCIONES-DATOS.md`, "data/<país>/<club>-data.js NO LLEVA
COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y meta. Las notas de cada fila van en una tabla con su número de
fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
Viking: alta por tools/alta-club.mjs (2026-10-19) desde Clubes/Noruega/Viking/aarsregnskap-viking-fotball-as-2025.pdf. brandColor #132436
(procedencia en Admin/sourcing/Noruega/Viking.md; tools/cargar-lote.mjs).
```

```text
data/no/viking-no-data.js — Viking Fotball AS (Noruega).
ALTA POR SCRIPT (tools/alta-club.mjs, 2026-10-19), SIN EJERCICIOS CARGADOS TODAVÍA: las estructuras del data file
nacen vacías a propósito. Los rubros, los totales oficiales y el resto del fiscalYearMeta los agrega la etapa de carga.

Documento que originó el alta: Clubes/Noruega/Viking/aarsregnskap-viking-fotball-as-2025.pdf

De dónde salió cada campo (estado según alta-club.mjs: ok / pendiente):
  id                 ok        "viking-no" — slug de "Viking" + '-no' (convención de clubId, Admin/CONVENCIONES.md Versión 129)
  name               ok        "Viking Fotball AS" — ajuste manual (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-17): Reemplaza 'Viking Fotballklubb' (decisión de Guido, 2026-10-17): el AS tien
  displayName        ok        "Viking" — nombre de la carpeta del club en Clubes/
  country            ok        "NO" — carpeta de país "Noruega" (tabla PAISES)
  reportingCurrency  ok        "NOK" — moneda de curso legal de Noruega
  fiscalYearStart    ok        "01-01" — el documento más reciente del club (aarsregnskap-viking-fotball-as-2025.md, cierre mes 12): el cierre CAMBIÓ en el tiempo (mes 12: 2015,2025 / mes 2: 
  sport              ok        "futbol" — el .md nombra el fútbol 62 veces y ningún otro deporte más que eso
  brandColor         pendiente (ausente) — la liga del club no está en tools/brand-color-reference/ (o el club no está en footylogos)
  anio               ok        2025 — nombre del archivo (misma regla que onboard.mjs --quien), confirmado por las fechas de cierre del .md
  cierre             ok        "2025-12-31" — año del ejercicio + mes de cierre (contenido del .md (15 de 16 fechas de fin de mes caen en el mes 12))
  reportType         ok        "official_balance_sheet" — el .md tiene un estado contable (resultados / balance) y el nombre del archivo no sugiere otro tipo
  perimetro          ok        "consolidado" — ajuste manual (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-19): la única controlada es Viking Stadion AS (100%, el estadio del club): hace 
  currency           ok        "NOK" — moneda de curso legal de Noruega (tabla PAISES de alta-club.mjs)
  fxRef              ok        "NOK@2025-12-31" — el documento no declara tipo de cambio; tools/fx-reference/ (lookup-fx-close.js): 10.0791. --escribir agrega 'NOK@2025-12-31' a FX_CLOSE
  sourceId           ok        "viking-no-aarsregnskap-viking-fotball-as-2025" — clubId + nombre del archivo en slug
  liga               ok        "no-eliteserien" — roster cacheado de "2025 Eliteserien" (tools/club-league-reference/no.json), coincidencia exacta "Viking"

FISCAL YEAR META PROPUESTO para 2025 (NO registrado: un ejercicio con meta y
sin rubros se vería en el sitio como un año en cero, y "sin dato no es cero"):
  2025: {"reportType":"official_balance_sheet","currency":"NOK","fxRef":"NOK@2025-12-31","sourceId":"viking-no-aarsregnskap-viking-fotball-as-2025"}
```

## 2025

### Ingresos

```text
2025: cargado por tools/cargar.mjs (2026-10-19) desde Clubes/Noruega/Viking/aarsregnskap-viking-fotball-as-2025.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Noruega/Viking/aarsregnskap-viking-fotball-as-2025.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Inntekt fra samarbeidsavtaler | pág. 5, Claude 0.85 |
| 2 | Billettinntekt fra kamper | pág. 5, Jev 1 |
| 3 | Medieinntekter | pág. 5, Jev 1 |
| 4 | Gevinst ved salg av spillerrettigheter | pág. 5, Jev 0.98 |
| 5 | Annen driftsinntekt | pág. 5, Jev 1 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Lønninger | pág. 26, precedente |
| 2 | Arbeidsgiveravgift | pág. 26, precedente |
| 3 | Personalkostnader fra Viking FK | pág. 26, precedente |
| 4 | Pensjonskostnad (OTP) | pág. 26, precedente |
| 5 | Andre personalkostnader | pág. 26, precedente |
| 6 | Annen driftskostnad | pág. 5, Claude 0.85 |
| 7 | Avskrivninger spillerrettigheter | pág. 5, precedente |
| 8 | Avskrivninger markedsrettigheter | pág. 5, precedente |
| 9 | Avskrivninger varige driftsmidler | pág. 5, precedente |

### Meta

```text
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-19): perimetro = consolidado. la única controlada es Viking Stadion AS (100%, el estadio del club): hace negocio del fútbol del club; el AS presenta Konsernregnskap
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-19): fila = -5 066 010. costo financiero leído como ingreso: Netto finans -5.707.366 y el resultado cierra en 24.667.584 (revisado por Claude contra el .md, 2026-10-18; ajuste a mano por decisión de Guido hasta la mejora del script (298 y))
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-19): fila = 19 207 686. Note 4 abre las amortizaciones (28.455.288 consolidado): derechos de jugadores 19.207.686 (Viking Stadion AS no tiene derechos) (subagente Sonnet, revisado por Claude contra el .md, 2026-10-19)
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-19): fila = 225 000. Note 4: derechos de mercado 225.000 (subagente Sonnet, revisado por Claude contra el .md, 2026-10-19)
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-19): fila = 9 022 602. resto del renglón consolidado: 28.455.288 - 19.207.686 - 225.000 = 9.022.602, bienes de uso del AS y del estadio (subagente Sonnet, revisado por Claude contra el .md, 2026-10-19)
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-19): categoria = player_amortisation. categoría de la fila partida por la nota (subagente Sonnet, revisado por Claude contra el .md, 2026-10-19)
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-19): categoria = other_amortisation. categoría de la fila partida por la nota (subagente Sonnet, revisado por Claude contra el .md, 2026-10-19)
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-19): categoria = depreciation. categoría de la fila partida por la nota (subagente Sonnet, revisado por Claude contra el .md, 2026-10-19)
tools/cargar.mjs (2026-10-19). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
alta-club.mjs (2026-10-19): no-eliteserien, verificado contra roster cacheado de "2025 Eliteserien" (tools/club-league-reference/no.json), coincidencia exacta "Viking".
```

## 2024

### Ingresos

```text
2024: cargado por tools/cargar.mjs (2026-10-20) desde Clubes/Noruega/Viking/aarsregnskap-viking-fotball-as-2024.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Noruega/Viking/aarsregnskap-viking-fotball-as-2024.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Inntekt fra samarbeidsavtaler | pág. 22, precedente |
| 2 | Billettinntekt fra kamper | pág. 22, precedente |
| 3 | Medieinntekter | pág. 22, precedente |
| 4 | Gevinst ved salg av spillertettigheter | pág. 22, precedente |
| 5 | Annen driftsinntekt | pág. 22, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Lønninger | pág. 29, precedente |
| 2 | Arbeidsgiveravgift | pág. 29, precedente |
| 3 | Personalkostnader fra Viking FK | pág. 29, precedente |
| 4 | Pensjonskostnad (OTP) | pág. 29, precedente |
| 5 | Andre personalkostnader | pág. 29, precedente |
| 6 | Ordinære avskrivninger | pág. 22, precedente |
| 7 | Nedskrivninger | pág. 22, Jev 0.92 |
| 8 | Annen driftskostnad | pág. 22, precedente |

### Meta

```text
tools/cargar.mjs (2026-10-20). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
tools/cargar.mjs (2026-10-20): no-eliteserien, verificado contra roster cacheado de "2024 Eliteserien" (tools/club-league-reference/no.json), coincidencia exacta "Viking".
```

## 2023

### Ingresos

```text
2023: cargado por tools/cargar.mjs (2026-10-20) desde Clubes/Noruega/Viking/aarsregnskap-viking-fotball-as-2023.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Noruega/Viking/aarsregnskap-viking-fotball-as-2023.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Inntekt fra samarbeidsavtaler | pág. 5, precedente |
| 2 | Billettinntekt fra kamper | pág. 5, precedente |
| 3 | Medieinntekter | pág. 5, precedente |
| 4 | Gevinst ved salg av spillere | pág. 5, precedente |
| 5 | Annen driftsinntekt | pág. 5, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Lønn og sosiale kostnader | pág. 5, Claude 0.93 |
| 2 | Ordinære avskrivninger | pág. 5, precedente |
| 3 | Nedskrivning av varige driftsmidler og immaterielle eiendeler | pág. 5, precedente |
| 4 | Annen driftskostnad | pág. 5, precedente |

### Meta

```text
tools/cargar.mjs (2026-10-20). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
tools/cargar.mjs (2026-10-20): no-eliteserien, verificado contra roster cacheado de "2023 Eliteserien" (tools/club-league-reference/no.json), coincidencia exacta "Viking".
```

## 2022

### Ingresos

```text
2022: cargado por tools/cargar.mjs (2026-10-20) desde Clubes/Noruega/Viking/aarsregnskap-viking-fotball-as-2022.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Noruega/Viking/aarsregnskap-viking-fotball-as-2022.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Inntekt fra samarbeidsavtaler | pág. 6, precedente |
| 2 | Billettinntekt fra kamper | pág. 6, precedente |
| 3 | Medieinntekter NTF | pág. 6, Jev 1 |
| 4 | Gevinst ved salg av spillere | pág. 6, Jev 1 |
| 5 | Annen driftsinntekt | pág. 6, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Lønninger | pág. 28, Jev 0.96 |
| 2 | Arbeidsgiveravgift | pág. 28, Jev 0.98 |
| 3 | Personalkostnader fra Viking FK | pág. 28, precedente |
| 4 | Pensjonskostnad (OTP) | pág. 28, precedente |
| 5 | Andre personalkostnader | pág. 28, ? 0.7 |
| 6 | Avskrivning på varige driftsmidler og immaterielle eiendeler | pág. 6, Jev 1 |
| 7 | Nedskrivning av varige driftsmidler og immaterielle eiendeler | pág. 6, Jev 0.91 |
| 8 | Annen driftskostnad | pág. 6, precedente |

### Meta

```text
tools/cargar.mjs (2026-10-20). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
tools/cargar.mjs (2026-10-20): no-eliteserien, verificado contra roster cacheado de "2022 Eliteserien" (tools/club-league-reference/no.json), coincidencia exacta "Viking".
```

## 2021

### Ingresos

```text
2021: cargado por tools/cargar.mjs (2026-10-20) desde Clubes/Noruega/Viking/aarsregnskap-viking-fotball-as-2021.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Noruega/Viking/aarsregnskap-viking-fotball-as-2021.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Inntekt fra samarbeidsavtaler | pág. 6, precedente |
| 2 | Billettinntekt fra kamper | pág. 6, precedente |
| 3 | Medieinntekter NTF | pág. 6, Jev 1 |
| 4 | Gevinst ved salg av spillere | pág. 6, Jev 1 |
| 5 | Annen driftsinntekt | pág. 6, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Lønninger | pág. 22, Jev 0.96 |
| 2 | Arbeidsgiveravgift | pág. 22, Jev 0.98 |
| 3 | Personalkostnader fra Viking FK | pág. 22, precedente |
| 4 | Pensjonskostnad (OTP) | pág. 22, precedente |
| 5 | Andre personalkostnader | pág. 22, precedente |
| 6 | Avskrivning på varige driftsmidler og immaterielle eiendeler | pág. 6, Jev 1 |
| 7 | Nedskrivning av varige driftsmidler og immaterielle eiendeler | pág. 6, Jev 0.91 |
| 8 | Annen driftskostnad | pág. 6, precedente |

### Meta

```text
tools/cargar.mjs (2026-10-20). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
tools/cargar.mjs (2026-10-20): no-eliteserien, verificado contra roster cacheado de "2021 Eliteserien" (tools/club-league-reference/no.json), coincidencia exacta "Viking".
```

## 2020

### Ingresos

```text
2020: cargado por tools/cargar.mjs (2026-10-20) desde Clubes/Noruega/Viking/aarsregnskap-viking-fotball-as-2020.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Noruega/Viking/aarsregnskap-viking-fotball-as-2020.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Inntekt fra samarbeidsavtaler | pág. 6, precedente |
| 2 | Billettinntekt fra kamper | pág. 6, precedente |
| 3 | Medieinntekter | pág. 6, precedente |
| 4 | Gevinst ved salg av spillere | pág. 6, Jev 1 |
| 5 | Annen driftsinntekt | pág. 6, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Lønninger | pág. 22, Jev 0.96 |
| 2 | Arbeidsgiveravgift | pág. 22, Jev 0.98 |
| 3 | Personalkostnader fra Viking FK | pág. 22, precedente |
| 4 | Pensjonskostnad (OTP) | pág. 22, precedente |
| 5 | Andre personalkostnader | pág. 22, precedente |
| 6 | Avskrivning på varige driftsmidler og immaterielle eiendeler | pág. 6, Jev 1 |
| 7 | Nedskrivning av varige driftsmidler og immaterielle eiendeler | pág. 6, Jev 0.91 |
| 8 | Annen driftskostnad | pág. 6, precedente |

### Meta

```text
tools/cargar.mjs (2026-10-20). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
tools/cargar.mjs (2026-10-20): no-eliteserien, verificado contra roster cacheado de "2020 Eliteserien" (tools/club-league-reference/no.json), coincidencia exacta "Viking".
```

## 2019

### Ingresos

```text
2019: cargado por tools/cargar.mjs (2026-10-20) desde Clubes/Noruega/Viking/aarsregnskap-viking-fotball-as-2019.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Noruega/Viking/aarsregnskap-viking-fotball-as-2019.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Inntekt fra samarbeidsavtaler | pág. 20, precedente |
| 2 | Billettinntekt fra kamper | pág. 20, precedente |
| 3 | Medieinntekter NTF | pág. 20, Jev 1 |
| 4 | Netto gevinst ved salg av spillere | pág. 20, Jev 1 |
| 5 | Annen driftsinntekt | pág. 20, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Lønninger | pág. 26, precedente |
| 2 | Arbeidsgivenavgift | pág. 26, precedente |
| 3 | Personalkostnader fra Viking FK | pág. 26, precedente |
| 4 | Pensjonskostnad (OTP) | pág. 26, precedente |
| 5 | Andre personalkostnader | pág. 26, precedente |
| 6 | Ordinære avskrivninger | pág. 20, precedente |
| 7 | Nedskrivninger | pág. 20, Jev 0.92 |
| 8 | Annen driftskostnad | pág. 20, precedente |

### Meta

```text
tools/cargar.mjs (2026-10-20). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
tools/cargar.mjs (2026-10-20): no-eliteserien, verificado contra roster cacheado de "2019 Eliteserien" (tools/club-league-reference/no.json), coincidencia exacta "Viking".
```

## 2018

### Ingresos

```text
2018: cargado por tools/cargar.mjs (2026-10-20) desde Clubes/Noruega/Viking/aarsregnskap-viking-fotball-as-2018.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Noruega/Viking/aarsregnskap-viking-fotball-as-2018.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Inntekter fra samarbeidsavtaler | pág. 6, precedente |
| 2 | Billettinntekter fra kamper | pág. 6, precedente |
| 3 | Netto gevinst ved salag av spillere | pág. 6, Jev 0.99 |
| 4 | Medieinntekter NTF | pág. 6, Jev 1 |
| 5 | Annen driftsinntekt | pág. 6, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Lønninger | pág. 20, Jev 0.96 |
| 2 | Arbeidsgiveravgift | pág. 20, Jev 0.98 |
| 3 | Personalkostnader fra Viking FK | pág. 20, precedente |
| 4 | Pensjonskostnad (OTP) | pág. 20, precedente |
| 5 | Andre personalkostnader | pág. 20, precedente |
| 6 | Avskrivning på varige driftsmidler og immaterielle eiendeler | pág. 6, Jev 1 |
| 7 | Nedskrivning av varige driftsmidler og immaterielle eiendeler | pág. 6, Jev 0.91 |
| 8 | Annen driftskostnad | pág. 6, precedente |

### Meta

```text
tools/cargar.mjs (2026-10-20). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
tools/cargar.mjs (2026-10-20): no-1divisjon, verificado contra roster cacheado de "2018 Norwegian First Division" (tools/club-league-reference/no.json), coincidencia exacta "Viking".
```

## 2017

### Ingresos

```text
2017: cargado por tools/cargar.mjs (2026-10-20) desde Clubes/Noruega/Viking/aarsregnskap-viking-fotball-as-2017.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Noruega/Viking/aarsregnskap-viking-fotball-as-2017.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Inntekter fra samarbeidsavtaler | pág. 6, precedente |
| 2 | Billettinntekter fra kamper | pág. 6, precedente |
| 3 | Varesalg | pág. 6, Jev 0.99 |
| 4 | Annen driftsinntekt | pág. 6, precedente |
| 5 | Gevinst ved salg av spillere | pág. 30, Jev 1 |
| 6 | Tap ved salg av spillere | pág. 30, precedente |
| 7 | Medieinntekter NTF | pág. 6, Jev 1 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Varekostnad | pág. 6, Jev 0.93 |
| 2 | Lønninger | pág. 27, Jev 0.96 |
| 3 | Arbeidsgiveravgift | pág. 27, Jev 0.98 |
| 4 | Personalkostnader fra Viking FK | pág. 27, precedente |
| 5 | Pensjonskostnad (OTP) | pág. 27, precedente |
| 6 | Andre personalkostnader | pág. 27, precedente |
| 7 | Avskrivning på varige driftsmidler og immaterielle eiendeler | pág. 6, Jev 1 |
| 8 | Nedskrivning av varige driftsmidler og immaterielle eiendeler | pág. 6, Jev 0.91 |
| 9 | Annen driftskostnad | pág. 6, precedente |

### Meta

```text
tools/cargar.mjs (2026-10-20). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
tools/cargar.mjs (2026-10-20): no-eliteserien, verificado contra roster cacheado de "2017 Eliteserien" (tools/club-league-reference/no.json), coincidencia exacta "Viking".
```

## Fuentes

### viking-no-aarsregnskap-viking-fotball-as-2025

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-19) desde la transcripción Clubes/Noruega/Viking/aarsregnskap-viking-fotball-as-2025.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.
```

### viking-no-aarsregnskap-viking-fotball-as-2022

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-20) desde la transcripción Clubes/Noruega/Viking/aarsregnskap-viking-fotball-as-2022.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.
```

### viking-no-aarsregnskap-viking-fotball-as-2018

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-20) desde la transcripción Clubes/Noruega/Viking/aarsregnskap-viking-fotball-as-2018.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.
```

### viking-no-aarsregnskap-viking-fotball-as-2019

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-20) desde la transcripción Clubes/Noruega/Viking/aarsregnskap-viking-fotball-as-2019.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.
```

### viking-no-aarsregnskap-viking-fotball-as-2020

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-20) desde la transcripción Clubes/Noruega/Viking/aarsregnskap-viking-fotball-as-2020.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.
```

### viking-no-aarsregnskap-viking-fotball-as-2021

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-20) desde la transcripción Clubes/Noruega/Viking/aarsregnskap-viking-fotball-as-2021.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.
```

### viking-no-aarsregnskap-viking-fotball-as-2023

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-20) desde la transcripción Clubes/Noruega/Viking/aarsregnskap-viking-fotball-as-2023.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.
```

### viking-no-aarsregnskap-viking-fotball-as-2024

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-20) desde la transcripción Clubes/Noruega/Viking/aarsregnskap-viking-fotball-as-2024.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.
```

### viking-no-aarsregnskap-viking-fotball-as-2017

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-20) desde la transcripción Clubes/Noruega/Viking/aarsregnskap-viking-fotball-as-2017.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.
```
