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
