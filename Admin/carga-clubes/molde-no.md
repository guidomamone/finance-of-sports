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
