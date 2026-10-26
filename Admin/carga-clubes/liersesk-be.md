# liersesk-be — evidencia de carga

Lo que antes iba como comentario en el data file del club, `data/<país>/liersesk-be-data.js` (la regla: `Admin/CONVENCIONES-DATOS.md`, "data/<país>/<club>-data.js NO LLEVA
COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y meta. Las notas de cada fila van en una tabla con su número de
fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
Lierse SK: alta por tools/alta-club.mjs (2026-10-18) desde Clubes/Bélgica/Lierse SK/jaarrekening-2025-06-30-individual.pdf. brandColor #FFDD00
(procedencia en Admin/sourcing/Bélgica/Lierse SK.md; tools/cargar-lote.mjs).
```

```text
data/be/liersesk-be-data.js — Lierse SK (Bélgica).
ALTA POR SCRIPT (tools/alta-club.mjs, 2026-10-18), SIN EJERCICIOS CARGADOS TODAVÍA: las estructuras del data file
nacen vacías a propósito. Los rubros, los totales oficiales y el resto del fiscalYearMeta los agrega la etapa de carga.

Documento que originó el alta: Clubes/Bélgica/Lierse SK/jaarrekening-2025-06-30-individual.pdf

De dónde salió cada campo (estado según alta-club.mjs: ok / pendiente):
  id                 ok        "liersesk-be" — slug de "Lierse SK" + '-be' (convención de clubId, Admin/CONVENCIONES.md Versión 129)
  name               pendiente "Lierse SK" — no se encontró el nombre legal en el .md; se usa el nombre de la carpeta
  displayName        ok        "Lierse SK" — nombre de la carpeta del club en Clubes/
  country            ok        "BE" — carpeta de país "Bélgica" (tabla PAISES)
  reportingCurrency  ok        "EUR" — moneda de curso legal de Bélgica
  fiscalYearStart    ok        "07-01" — cierre del ejercicio: ajuste manual (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-18): boekjaar 01-07-2024 tot 30-06-2025 (.md L36); el 30-1
  sport              ok        "futbol" — el .md nombra el fútbol 1 veces y ningún otro deporte más que eso
  brandColor         pendiente (ausente) — la liga del club no está en tools/brand-color-reference/ (o el club no está en footylogos)
  anio               ok        2025 — ajuste manual (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-18): boekjaar 01-07-2024 tot 30-06-2025 (.md L36); el 30-10-2025 es la fecha de 
  cierre             ok        "2025-06-30" — año del ejercicio + mes de cierre (ajuste manual (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-18): boekjaar 01-07-2024 tot 30-06-2025 (.md 
  reportType         ok        "official_balance_sheet" — el .md tiene un estado contable (resultados / balance) y el nombre del archivo no sugiere otro tipo
  perimetro          ok        "individual" — el nombre del archivo dice que son los estados individuales ("jaarrekening-2025-06-30-individual.pdf"), y no hay un consolidado del mismo ejercicio en
  currency           ok        "EUR" — moneda de curso legal de Bélgica (tabla PAISES de alta-club.mjs)
  fxRef              ok        "EUR@2025-06-30" — el documento no declara tipo de cambio; FX_CLOSE ya tiene EUR@2025-06-30 = 0.8532 (Cierre BCE al 30/6/2025 (1 EUR = 1,172 USD))
  sourceId           ok        "liersesk-be-jaarrekening-2025-06-30-individual" — clubId + nombre del archivo en slug
  liga               pendiente null — sin caché de rosters para be (tools/club-league-reference/be.json)

FISCAL YEAR META PROPUESTO para 2025 (NO registrado: un ejercicio con meta y
sin rubros se vería en el sitio como un año en cero, y "sin dato no es cero"):
  2025: {"reportType":"official_balance_sheet","currency":"EUR","fxRef":"EUR@2025-06-30","sourceId":"liersesk-be-jaarrekening-2025-06-30-individual"}
```

## 2025

### Ingresos

```text
2025: cargado por tools/cargar.mjs (2026-10-18) desde Clubes/Bélgica/Lierse SK/jaarrekening-2025-06-30-individual.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Bélgica/Lierse SK/jaarrekening-2025-06-30-individual.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Brutomarge (+)/(-) | pág. 7, Jev 0.95 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Bezoldigingen, sociale lasten en pensioenen (+)/(-) | pág. 7, Jev 0.92 |
| 2 | Andere bedrijfskosten | pág. 7, Claude 0.85 |
| 3 | Niet-recurrente bedrijfskosten | pág. 7, Claude 0.8 |
| 4 | Afschrijvingen immateriële vaste activa (spelers) | pág. 7, precedente |
| 5 | Afschrijvingen materiële vaste activa | pág. 7, precedente |

### Meta

```text
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-18): fila = -33.924. costo financiero (Financiële kosten 65/66B): resta (subagente Sonnet, revisado por Claude 2026-10-18)
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-18): fila = 0. 76A (L256, 82.200) es 'waarvan', ya dentro de la Brutomarge 2.706.155 (L255) (subagente Sonnet, revisado por Claude 2026-10-18)
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-18): fila = 247.280. la nota separa el 630 (407.089): intangibles Geboekt 8079 = spelers (subagente Sonnet, revisado por Claude 2026-10-18)
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-18): categoria = player_amortisation. la nota separa el 630 (407.089): intangibles Geboekt 8079 = spelers (subagente Sonnet, revisado por Claude 2026-10-18)
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-18): fila = 159.809. la nota separa el 630 (407.089): intangibles Geboekt 8079 = spelers (subagente Sonnet, revisado por Claude 2026-10-18)
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-18): categoria = depreciation. la nota separa el 630 (407.089): intangibles Geboekt 8079 = spelers (subagente Sonnet, revisado por Claude 2026-10-18)
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-18): cierre = 2025-06-30. boekjaar 01-07-2024 tot 30-06-2025 (.md L36); el 30-10-2025 es la fecha de la asamblea (subagente Sonnet, revisado por Claude 2026-10-18)
tools/cargar.mjs (2026-10-18). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee.
```

```text
tools/caja-deuda.mjs (2026-10-18): cash escalón 1 (compuerta: balance del documento (NBB)): código NBB 54/58 = 2984 (L169); el balance cuadra: 20/58 = 10/49 = 4833368 (año sin vecino)
```

### Liga

```text
alta-club.mjs (2026-10-18): null, SIN VERIFICAR (sin caché de rosters para be (tools/club-league-reference/be.json)).
```

## Gestiones

_investigado por un subagente con fuente por gestión (Admin/gestiones-por-pais/tanda-2026-10-19/resultado-2.json, tools/gestiones-tanda.mjs, 2026-10-19):_

```text
Luc Van Thillo (2018-06-29 a hoy): Sporza 2018-06-01: nuevo dueño del club relanzado (Lierse Kempenzonen, hoy K. Lierse S.K.) junto a los hermanos Van Lommel; sporza 2024-12-12 lo llama 'eigenaar en voorzitter'. La fecha 2018-06-29 es el inicio de su mandato de Bestuurder en la NV (Clubes/Bélgica/Lierse SK/jaarrekening-2025-06-30-individual.md:66-71); las fuentes web no dan el día exacto de asunción. El balance 2025 lo lista como administrador sin fin de mandato (líneas 66-71) y se aprobó el 30-10-2025 (línea 30).
Duda: El día exacto en que Van Thillo asumió no figura en la prensa; se usó la fecha de inicio de su mandato en la NV (2018-06-29). No afecta el cierre 2025-06-30.
Duda: Wikipedia lo lista como Chairman sin fechas; no hay fuente web con la fecha de su cargo de Voorzitter formal.
```

## 2024

### Ingresos

```text
2024: cargado por tools/cargar.mjs (2026-10-19) desde Clubes/Bélgica/Lierse SK/jaarrekening-2024-06-30-individual.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Bélgica/Lierse SK/jaarrekening-2024-06-30-individual.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Brutomarge (+)/(-) | pág. 7, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Bezoldigingen, sociale lasten en pensioenen (+)/(-) | pág. 7, precedente |
| 2 | Andere bedrijfskosten | pág. 7, precedente |
| 3 | Niet-recurrente bedrijfskosten | pág. 7, precedente |
| 4 | Afschrijvingen immateriële vaste activa (spelers) | pág. 7, precedente |
| 5 | Afschrijvingen materiële vaste activa | pág. 7, precedente |

### Meta

```text
tools/cargar.mjs (2026-10-19). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee.
```

### Liga

```text
tools/cargar.mjs (2026-10-19): be-challengerproleague, verificado contra roster cacheado de "2023–24 Challenger Pro League" (tools/club-league-reference/be.json), coincidencia exacta "Lierse Kempenzonen".
```

## 2023

### Ingresos

```text
2023: cargado por tools/cargar.mjs (2026-10-19) desde Clubes/Bélgica/Lierse SK/jaarrekening-2023-06-30-individual.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Bélgica/Lierse SK/jaarrekening-2023-06-30-individual.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Brutomarge (+)/(-) | pág. 7, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Bezoldigingen, sociale lasten en pensioenen (+)/(-) | pág. 7, precedente |
| 2 | Waardeverminderingen op voorraden, op bestellingen in uitvoering en op handelsvorderingen: toevoegingen (+)/(-) (terugnemingen) | pág. 7, Jev 0.99 |
| 3 | Andere bedrijfskosten | pág. 7, precedente |
| 4 | Niet-recurrente bedrijfskosten | pág. 7, precedente |
| 5 | Afschrijvingen immateriële vaste activa (spelers) | pág. 7, precedente |
| 6 | Afschrijvingen materiële vaste activa | pág. 7, precedente |

### Meta

```text
tools/cargar.mjs (2026-10-19). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee.
```

### Liga

```text
tools/cargar.mjs (2026-10-19): be-challengerproleague, verificado contra roster cacheado de "2022–23 Challenger Pro League" (tools/club-league-reference/be.json), coincidencia exacta "Lierse Kempenzonen".
```

## 2022

### Ingresos

```text
2022: cargado por tools/cargar.mjs (2026-10-19) desde Clubes/Bélgica/Lierse SK/jaarrekening-2022-06-30-individual.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Bélgica/Lierse SK/jaarrekening-2022-06-30-individual.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Brutomarge (+)/(-) | pág. 7, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Bezoldigingen, sociale lasten en pensioenen (+)/(-) | pág. 7, precedente |
| 2 | Waardeverminderingen op voorraden, op bestellingen in uitvoering en op handelsvorderingen: toevoegingen (terugnemingen) (+)/(-) | pág. 7, Jev 1 |
| 3 | Andere bedrijfskosten | pág. 7, precedente |
| 4 | Niet-recurrente bedrijfskosten | pág. 7, precedente |
| 5 | Afschrijvingen immateriële vaste activa (spelers) | pág. 7, precedente |
| 6 | Afschrijvingen materiële vaste activa | pág. 7, precedente |

### Meta

```text
tools/cargar.mjs (2026-10-19). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee.
```

### Liga

```text
tools/cargar.mjs (2026-10-19): be-challengerproleague, verificado contra roster cacheado de "2021–22 Belgian First Division B" (tools/club-league-reference/be.json), coincidencia exacta "Lierse Kempenzonen".
```

## 2021

### Ingresos

```text
2021: cargado por tools/cargar.mjs (2026-10-19) desde Clubes/Bélgica/Lierse SK/jaarrekening-2021-06-30-individual.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Bélgica/Lierse SK/jaarrekening-2021-06-30-individual.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: -; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Brutomarge (+)/(-) | pág. 6, precedente |
| 2 | Andere bedrijfskosten | pág. 6, precedente |

### Meta

```text
tools/cargar.mjs (2026-10-19). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee.
```

### Liga

```text
tools/cargar.mjs (2026-10-19): be-challengerproleague, verificado contra roster cacheado de "2020–21 Belgian First Division B" (tools/club-league-reference/be.json), coincidencia exacta "Lierse Kempenzonen".
```

## 2020

### Ingresos

```text
2020: cargado por tools/cargar.mjs (2026-10-19) desde Clubes/Bélgica/Lierse SK/jaarrekening-2020-06-30-individual.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Bélgica/Lierse SK/jaarrekening-2020-06-30-individual.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: -; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Brutomarge (+)/(-) | pág. 8, precedente |
| 2 | Andere bedrijfskosten | pág. 8, precedente |

### Meta

```text
tools/cargar.mjs (2026-10-19). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee.
```

### Liga

```text
tools/cargar.mjs (2026-10-19): be-div1amateur, verificado contra roster cacheado de "2019–20 Belgian First Amateur Division" (tools/club-league-reference/be.json), coincidencia exacta "Lierse Kempenzonen".
```

## 2019

### Ingresos

```text
2019: cargado por tools/cargar.mjs (2026-10-20) desde Clubes/Bélgica/Lierse SK/jaarrekening-2019-06-30-individual.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Bélgica/Lierse SK/jaarrekening-2019-06-30-individual.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: -; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Brutomarge (+)/(-) | pág. 7, precedente |
| 2 | Afschrijvingen en waardeverminderingen op oprichtingskosten, op immateriële en materiële vaste activa | pág. 7, precedente |

### Meta

```text
tools/cargar.mjs (2026-10-20). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee.
```

### Liga

```text
tools/cargar.mjs (2026-10-20): be-div1amateur, verificado contra roster cacheado de "2018–19 Belgian First Amateur Division" (tools/club-league-reference/be.json), coincidencia exacta "Lierse Kempenzonen".
```

## Fuentes

### liersesk-be-jaarrekening-2025-06-30-individual

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-18) desde la transcripción Clubes/Bélgica/Lierse SK/jaarrekening-2025-06-30-individual.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### liersesk-be-jaarrekening-2022-06-30-individual

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-19) desde la transcripción Clubes/Bélgica/Lierse SK/jaarrekening-2022-06-30-individual.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### liersesk-be-jaarrekening-2023-06-30-individual

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-19) desde la transcripción Clubes/Bélgica/Lierse SK/jaarrekening-2023-06-30-individual.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### liersesk-be-jaarrekening-2024-06-30-individual

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-19) desde la transcripción Clubes/Bélgica/Lierse SK/jaarrekening-2024-06-30-individual.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### liersesk-be-jaarrekening-2020-06-30-individual

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-19) desde la transcripción Clubes/Bélgica/Lierse SK/jaarrekening-2020-06-30-individual.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### liersesk-be-jaarrekening-2021-06-30-individual

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-19) desde la transcripción Clubes/Bélgica/Lierse SK/jaarrekening-2021-06-30-individual.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### liersesk-be-jaarrekening-2019-06-30-individual

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-20) desde la transcripción Clubes/Bélgica/Lierse SK/jaarrekening-2019-06-30-individual.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

## Liga de 2019, 2020 y 2021 (2026-10-26)

```text
segunda-fuente-wikipedia-local.mjs: 2019 y 2020 be-div1amateur y 2021 be-challengerproleague, las mismas filas que liersekempenzonen-be (el mismo club con otro nombre); «Lierse Kempenzonen» está en la lista de Wikipedia en inglés y en la de nl.wikipedia (unidas por Wikidata) de Eerste klasse amateurs 2018-19 y 2019-20 y de Eerste klasse B 2020-21.
```
