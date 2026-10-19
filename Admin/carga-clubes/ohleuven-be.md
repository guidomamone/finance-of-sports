# ohleuven-be — evidencia de carga

Lo que antes iba como comentario en el data file del club, `data/<país>/ohleuven-be-data.js` (la regla: `Admin/CONVENCIONES-DATOS.md`, "data/<país>/<club>-data.js NO LLEVA
COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y meta. Las notas de cada fila van en una tabla con su número de
fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
OH Leuven: alta por tools/alta-club.mjs (2026-10-18) desde Clubes/Bélgica/OH Leuven/jaarrekening-2025-06-30-individual.pdf. brandColor:null a propósito
(procedencia en Admin/sourcing/Bélgica/OH Leuven.md; tools/cargar-lote.mjs).
```

```text
data/be/ohleuven-be-data.js — OH Leuven CV (Bélgica).
ALTA POR SCRIPT (tools/alta-club.mjs, 2026-10-18), SIN EJERCICIOS CARGADOS TODAVÍA: las estructuras del data file
nacen vacías a propósito. Los rubros, los totales oficiales y el resto del fiscalYearMeta los agrega la etapa de carga.

Documento que originó el alta: Clubes/Bélgica/OH Leuven/jaarrekening-2025-06-30-individual.pdf

De dónde salió cada campo (estado según alta-club.mjs: ok / pendiente):
  id                 ok        "ohleuven-be" — slug de "OH Leuven" + '-be' (convención de clubId, Admin/CONVENCIONES.md Versión 129)
  name               ok        "OH Leuven CV" — ajuste manual (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-09): Revisión del alta (Claude, 2026-10-09): Naam OH LEUVEN, Rechtsvorm Coöperati
  displayName        ok        "OH Leuven" — nombre de la carpeta del club en Clubes/
  country            ok        "BE" — carpeta de país "Bélgica" (tabla PAISES)
  reportingCurrency  ok        "EUR" — moneda de curso legal de Bélgica
  fiscalYearStart    ok        "07-01" — el documento más reciente del club (jaarrekening-2025-06-30-individual.md, cierre mes 6): el cierre CAMBIÓ en el tiempo (mes 12: 2017,2018 / mes 6: 20
  sport              ok        "futbol" — el .md nombra el fútbol 3 veces y ningún otro deporte más que eso
  brandColor         pendiente (ausente) — la liga del club no está en tools/brand-color-reference/ (o el club no está en footylogos)
  anio               ok        2025 — nombre del archivo (misma regla que onboard.mjs --quien), confirmado por las fechas de cierre del .md
  cierre             ok        "2025-06-30" — año del ejercicio + mes de cierre (nombre del archivo (2025-06-30) y contenido del .md (25 de 26 fechas de fin de mes))
  reportType         ok        "official_balance_sheet" — el .md tiene un estado contable (resultados / balance) y el nombre del archivo no sugiere otro tipo
  perimetro          ok        "individual" — el nombre del archivo dice que son los estados individuales ("jaarrekening-2025-06-30-individual.pdf"), y no hay un consolidado del mismo ejercicio en
  currency           ok        "EUR" — moneda de curso legal de Bélgica (tabla PAISES de alta-club.mjs)
  fxRef              ok        "EUR@2025-06-30" — el documento no declara tipo de cambio; FX_CLOSE ya tiene EUR@2025-06-30 = 0.8532 (Cierre BCE al 30/6/2025 (1 EUR = 1,172 USD))
  sourceId           ok        "ohleuven-be-jaarrekening-2025-06-30-individual" — clubId + nombre del archivo en slug
  liga               pendiente null — sin caché de rosters para be (tools/club-league-reference/be.json)

FISCAL YEAR META PROPUESTO para 2025 (NO registrado: un ejercicio con meta y
sin rubros se vería en el sitio como un año en cero, y "sin dato no es cero"):
  2025: {"reportType":"official_balance_sheet","currency":"EUR","fxRef":"EUR@2025-06-30","sourceId":"ohleuven-be-jaarrekening-2025-06-30-individual"}
```

## 2025

### Ingresos

```text
2025: cargado por tools/cargar.mjs (2026-10-18) desde Clubes/Bélgica/OH Leuven/jaarrekening-2025-06-30-individual.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Bélgica/OH Leuven/jaarrekening-2025-06-30-individual.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Omzet | pág. 9, Jev 1 |
| 2 | Andere bedrijfsopbrengsten | pág. 9, Jev 0.97 |
| 3 | Niet-recurrente bedrijfsopbrengsten | pág. 9, Jev 1 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Aankopen | pág. 9, precedente |
| 2 | Voorraad: afname (toename) | pág. 9, Jev 1 |
| 3 | Diensten en diverse goederen | pág. 9, Jev 0.96 |
| 4 | 620 | pág. 24, Jev 0.91 |
| 5 | 621 | pág. 24, Jev 0.92 |
| 6 | 623 | pág. 24, Jev 0.9 |
| 7 | Waardeverminderingen op voorraden, op bestellingen in uitvoering en op handelsvorderingen: toevoegingen (terugnemingen) | pág. 9, Jev 0.99 |
| 8 | Voorzieningen voor risico's en kosten: toevoegingen (bestedingen en terugnemingen) | pág. 9, Jev 0.91 |
| 9 | Andere bedrijfskosten | pág. 9, Claude 0.88 |
| 10 | Niet-recurrente bedrijfskosten | pág. 9, precedente |
| 11 | Afschrijvingen immateriële vaste activa (spelers) | pág. 9, precedente |
| 12 | Afschrijvingen materiële vaste activa | pág. 9, precedente |

### Meta

```text
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-18): fila = -1.000.850. costo financiero (Financiële kosten 65/66B): resta (subagente Sonnet, revisado por Claude 2026-10-18)
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-18): fila = -1.985. costo financiero (Financiële kosten 65/66B): resta (subagente Sonnet, revisado por Claude 2026-10-18)
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-18): fila = 4.196.505. la nota separa el 630 (4.957.136): intangibles = spelers (subagente Sonnet, revisado por Claude 2026-10-18)
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-18): categoria = player_amortisation. la nota separa el 630 (4.957.136): intangibles = spelers (subagente Sonnet, revisado por Claude 2026-10-18)
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-18): fila = 760.631. la nota separa el 630 (4.957.136): intangibles = spelers (subagente Sonnet, revisado por Claude 2026-10-18)
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-18): categoria = depreciation. la nota separa el 630 (4.957.136): intangibles = spelers (subagente Sonnet, revisado por Claude 2026-10-18)
tools/cargar.mjs (2026-10-18). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee.
```

### Liga

```text
alta-club.mjs (2026-10-18): null, SIN VERIFICAR (sin caché de rosters para be (tools/club-league-reference/be.json)).
```

## 2024

### Ingresos

```text
2024: cargado por tools/cargar.mjs (2026-10-19) desde Clubes/Bélgica/OH Leuven/jaarrekening-2024-06-30-individual.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Bélgica/OH Leuven/jaarrekening-2024-06-30-individual.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Omzet | pág. 8, precedente |
| 2 | Andere bedrijfsopbrengsten | pág. 8, precedente |
| 3 | Niet-recurrente bedrijfsopbrengsten | pág. 8, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Aankopen | pág. 8, precedente |
| 2 | Voorraad: afname (toename) | pág. 8, precedente |
| 3 | Diensten en diverse goederen | pág. 8, precedente |
| 4 | 620 | pág. 24, precedente |
| 5 | 621 | pág. 24, precedente |
| 6 | 623 | pág. 24, precedente |
| 7 | Afschrijvingen en waardeverminderingen op oprichtingskosten, op immateriële en materiële vaste activa | pág. 8, precedente |
| 8 | Waardeverminderingen op voorraden, op bestellingen in uitvoering en op handelsvorderingen: toevoegingen (terugnemingen) | pág. 8, precedente |
| 9 | Voorzieningen voor risico's en kosten: toevoegingen (bestedingen en terugnemingen) | pág. 8, precedente |
| 10 | Andere bedrijfskosten | pág. 8, precedente |
| 11 | 6630 | pág. 27, ? 0.75 |
| 12 | 664/7 | pág. 27, Claude 0.8 |

### Meta

```text
tools/cargar.mjs (2026-10-19). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee.
```

### Liga

```text
tools/cargar.mjs (2026-10-19): be-proleague, verificado contra roster cacheado de "2023–24 Belgian Pro League" (tools/club-league-reference/be.json), coincidencia exacta "OH Leuven".
```

## 2023

### Ingresos

```text
2023: cargado por tools/cargar.mjs (2026-10-19) desde Clubes/Bélgica/OH Leuven/jaarrekening-2023-06-30-individual.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Bélgica/OH Leuven/jaarrekening-2023-06-30-individual.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Omzet | pág. 8, precedente |
| 2 | Andere bedrijfsopbrengsten | pág. 8, precedente |
| 3 | Niet-recurrente bedrijfsopbrengsten | pág. 8, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Aankopen | pág. 8, precedente |
| 2 | Voorraad: afname (toename) | pág. 8, precedente |
| 3 | Diensten en diverse goederen | pág. 8, precedente |
| 4 | 620 | pág. 24, precedente |
| 5 | 621 | pág. 24, precedente |
| 6 | 623 | pág. 24, precedente |
| 7 | Afschrijvingen en waardeverminderingen op oprichtingskosten, op immateriële en materiële vaste activa | pág. 8, precedente |
| 8 | 640 | pág. 25, precedente |
| 9 | 641/8 | pág. 25, Jev 0.9 |
| 10 | Niet-recurrente bedrijfskosten | pág. 8, precedente |

### Meta

```text
tools/cargar.mjs (2026-10-19). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee.
```

### Liga

```text
tools/cargar.mjs (2026-10-19): be-proleague, verificado contra roster cacheado de "2022–23 Belgian Pro League" (tools/club-league-reference/be.json), coincidencia exacta "OH Leuven".
```

## 2021

### Ingresos

```text
2021: cargado por tools/cargar.mjs (2026-10-19) desde Clubes/Bélgica/OH Leuven/jaarrekening-2021-06-30-individual.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Bélgica/OH Leuven/jaarrekening-2021-06-30-individual.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Omzet | pág. 8, precedente |
| 2 | Andere bedrijfsopbrengsten | pág. 8, precedente |
| 3 | Niet-recurrente bedrijfsopbrengsten | pág. 8, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Aankopen | pág. 8, precedente |
| 2 | Voorraad: afname (toename) (+)/(-) | pág. 8, Jev 1 |
| 3 | Diensten en diverse goederen | pág. 8, precedente |
| 4 | Bezoldigingen, sociale lasten en pensioenen (+)/(-) | pág. 8, Jev 1 |
| 5 | Afschrijvingen en waardeverminderingen op oprichtingskosten, op immateriële en materiële vaste activa | pág. 8, precedente |
| 6 | Waardeverminderingen op voorraden, op bestellingen in uitvoering en op handelsvorderingen: toevoegingen (terugnemingen) (+)/(-) | pág. 8, Jev 0.99 |
| 7 | Andere bedrijfskosten | pág. 8, precedente |
| 8 | Niet-recurrente bedrijfskosten | pág. 8, precedente |

### Meta

```text
tools/cargar.mjs (2026-10-19). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee.
```

### Liga

```text
tools/cargar.mjs (2026-10-19): be-proleague, verificado contra roster cacheado de "2020–21 Belgian First Division A" (tools/club-league-reference/be.json), coincidencia exacta "Oud-Heverlee Leuven".
```

## 2019

### Ingresos

```text
2019: cargado por tools/cargar.mjs (2026-10-19) desde Clubes/Bélgica/OH Leuven/jaarrekening-2019-06-30-individual.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Bélgica/OH Leuven/jaarrekening-2019-06-30-individual.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Omzet | pág. 7, precedente |
| 2 | Andere bedrijfsopbrengsten | pág. 7, precedente |
| 3 | Niet-recurrente bedrijfsopbrengsten | pág. 7, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Aankopen | pág. 7, precedente |
| 2 | Voorraad: afname (toename) (+)/(-) | pág. 7, Jev 1 |
| 3 | Diensten en diverse goederen | pág. 7, precedente |
| 4 | Bezoldigingen, sociale lasten en pensioenen (+)/(-) | pág. 7, Jev 1 |
| 5 | Afschrijvingen en waardeverminderingen op oprichtingskosten, op immateriële en materiële vaste activa | pág. 7, precedente |
| 6 | Waardeverminderingen op voorraden, op bestellingen in uitvoering en op handelsvorderingen: toevoegingen (terugnemingen) (+)/(-) | pág. 7, Jev 0.99 |
| 7 | Andere bedrijfskosten | pág. 7, precedente |
| 8 | Niet-recurrente bedrijfskosten | pág. 7, precedente |

### Meta

```text
tools/cargar.mjs (2026-10-19). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee.
```

### Liga

```text
tools/cargar.mjs (2026-10-19): be-challengerproleague, verificado contra roster cacheado de "2018–19 Belgian First Division B" (tools/club-league-reference/be.json), coincidencia exacta "OH Leuven".
```

## Fuentes

### ohleuven-be-jaarrekening-2025-06-30-individual

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-18) desde la transcripción Clubes/Bélgica/OH Leuven/jaarrekening-2025-06-30-individual.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### ohleuven-be-jaarrekening-2019-06-30-individual

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-19) desde la transcripción Clubes/Bélgica/OH Leuven/jaarrekening-2019-06-30-individual.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### ohleuven-be-jaarrekening-2021-06-30-individual

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-19) desde la transcripción Clubes/Bélgica/OH Leuven/jaarrekening-2021-06-30-individual.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### ohleuven-be-jaarrekening-2024-06-30-individual

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-19) desde la transcripción Clubes/Bélgica/OH Leuven/jaarrekening-2024-06-30-individual.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### ohleuven-be-jaarrekening-2023-06-30-individual

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-19) desde la transcripción Clubes/Bélgica/OH Leuven/jaarrekening-2023-06-30-individual.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```
