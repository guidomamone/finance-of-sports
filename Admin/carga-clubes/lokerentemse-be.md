# lokerentemse-be — evidencia de carga

Lo que antes iba como comentario en el data file del club, `data/<país>/lokerentemse-be-data.js` (la regla: `Admin/CONVENCIONES-DATOS.md`, "data/<país>/<club>-data.js NO LLEVA
COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y meta. Las notas de cada fila van en una tabla con su número de
fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
Lokeren-Temse: alta por tools/alta-club.mjs (2026-10-18) desde Clubes/Bélgica/Lokeren-Temse/jaarrekening-2025-06-30-individual.pdf. brandColor:null a propósito
(procedencia en Admin/sourcing/Bélgica/Lokeren-Temse.md; tools/cargar-lote.mjs).
```

```text
data/be/lokerentemse-be-data.js — Koninklijke Sporting Club Lokeren - Temse VZW (Bélgica).
ALTA POR SCRIPT (tools/alta-club.mjs, 2026-10-18), SIN EJERCICIOS CARGADOS TODAVÍA: las estructuras del data file
nacen vacías a propósito. Los rubros, los totales oficiales y el resto del fiscalYearMeta los agrega la etapa de carga.

Documento que originó el alta: Clubes/Bélgica/Lokeren-Temse/jaarrekening-2025-06-30-individual.pdf

De dónde salió cada campo (estado según alta-club.mjs: ok / pendiente):
  id                 ok        "lokerentemse-be" — slug de "Lokeren-Temse" + '-be' (convención de clubId, Admin/CONVENCIONES.md Versión 129)
  name               ok        "Koninklijke Sporting Club Lokeren - Temse VZW" — respuesta de Guido en la cola (7f81385)
  displayName        ok        "Lokeren-Temse" — nombre de la carpeta del club en Clubes/
  country            ok        "BE" — carpeta de país "Bélgica" (tabla PAISES)
  reportingCurrency  ok        "EUR" — moneda de curso legal de Bélgica
  fiscalYearStart    ok        "07-01" — cierre del ejercicio: nombre del archivo (2025-06-30) y contenido del .md (13 de 17 fechas de fin de mes)
  sport              ok        "futbol" — el .md nombra el fútbol 0 veces y ningún otro deporte más que eso
  brandColor         pendiente (ausente) — la liga del club no está en tools/brand-color-reference/ (o el club no está en footylogos)
  anio               ok        2025 — nombre del archivo (misma regla que onboard.mjs --quien), confirmado por las fechas de cierre del .md
  cierre             ok        "2025-06-30" — año del ejercicio + mes de cierre (nombre del archivo (2025-06-30) y contenido del .md (13 de 17 fechas de fin de mes))
  reportType         ok        "official_balance_sheet" — el .md tiene un estado contable (resultados / balance) y el nombre del archivo no sugiere otro tipo
  perimetro          ok        "individual" — el nombre del archivo dice que son los estados individuales ("jaarrekening-2025-06-30-individual.pdf"), y no hay un consolidado del mismo ejercicio en
  currency           ok        "EUR" — moneda de curso legal de Bélgica (tabla PAISES de alta-club.mjs)
  fxRef              ok        "EUR@2025-06-30" — el documento no declara tipo de cambio; FX_CLOSE ya tiene EUR@2025-06-30 = 0.8532 (Cierre BCE al 30/6/2025 (1 EUR = 1,172 USD))
  sourceId           ok        "lokerentemse-be-jaarrekening-2025-06-30-individual" — clubId + nombre del archivo en slug
  liga               pendiente null — sin caché de rosters para be (tools/club-league-reference/be.json)

FISCAL YEAR META PROPUESTO para 2025 (NO registrado: un ejercicio con meta y
sin rubros se vería en el sitio como un año en cero, y "sin dato no es cero"):
  2025: {"reportType":"official_balance_sheet","currency":"EUR","fxRef":"EUR@2025-06-30","sourceId":"lokerentemse-be-jaarrekening-2025-06-30-individual"}
```

## 2025

### Ingresos

```text
2025: cargado por tools/cargar.mjs (2026-10-18) desde Clubes/Bélgica/Lokeren-Temse/jaarrekening-2025-06-30-individual.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Bélgica/Lokeren-Temse/jaarrekening-2025-06-30-individual.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Waarvan: niet-recurrente bedrijfsopbrengsten | pág. 6, Jev 1 |
| 2 | Omzet | pág. 6, Jev 1 |
| 3 | Overige bedrijfsopbrengsten (implícito en la Brutomarge) | pág. 6, Jev 0.95 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Handelsgoederen, grond- en hulpstoffen, diensten en diverse goederen | pág. 6, Jev 0.99 |
| 2 | Bezoldigingen, sociale lasten en pensioenen (+)/(-) | pág. 6, Claude 0.8 |
| 3 | Afschrijvingen en waardeverminderingen op oprichtingskosten, op immateriële en materiële vaste activa | pág. 6, precedente |
| 4 | Waardeverminderingen op voorraden, op bestellingen in uitvoering en op handelsvorderingen: toevoegingen (terugnemingen) (+)/(-) | pág. 6, Jev 0.97 |
| 5 | Andere bedrijfskosten | pág. 6, Claude 0.88 |
| 6 | Niet-recurrente bedrijfskosten | pág. 6, Claude 0.82 |

### Meta

```text
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-18): fila = -11.142. costo financiero (Financiële kosten 65/66B): resta (subagente Sonnet, revisado por Claude 2026-10-18)
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-18): fila = -114. costo financiero (Financiële kosten 65/66B): resta (subagente Sonnet, revisado por Claude 2026-10-18)
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-18): fila = 50.197. esquema abreviado: Brutomarge 879.336 (L215) = Omzet 282.823 + 76A 844.978 + overige - 60/61 298.662 (L216-219): overige = 50.197, no impreso como renglón; mismo criterio que Dender EH (Admin/dudas-por-club.md) (subagente Sonnet, revisado por Claude 2026-10-18)
tools/cargar.mjs (2026-10-18). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee.
```

```text
tools/caja-deuda.mjs (2026-10-18): cash escalón 1 (compuerta: balance del documento (NBB)): código NBB 54/58 = 44934 (L153); el balance cuadra: 20/58 = 10/49 = 66553 (año sin vecino)
```

### Liga

```text
alta-club.mjs (2026-10-18): null, SIN VERIFICAR (sin caché de rosters para be (tools/club-league-reference/be.json)).
```

## Gestiones

_investigado por un subagente con fuente por gestión (Admin/gestiones-por-pais/tanda-2026-10-19/resultado-3.json, tools/gestiones-tanda.mjs, 2026-10-19):_

```text
Hans Van Duysen (2020-04-21 a hoy): Presidente del club fusionado Lokeren-Temse desde abril 2020 (sporza 2020-04-22) y todavía voorzitter el 2025-07-01 cuando el club recupera el nombre Sporting Lokeren (https://www.vrt.be/vrtnws/nl/2025/07/01/sporting-lokeren-nieuwe-naam-logo/). La fecha exacta 2020-04-21 sale del balance 2021, donde figura 'Voorzitter van het bestuursorgaan', mandato desde 2020-04-21 (Clubes/Bélgica/Lokeren-Temse/jaarrekening-2021-06-30-individual.md:47-51); el artículo de sporza es del día siguiente y no da el día. El balance 2025 lo lista como Bestuurder con mandato desde 2023-03-10 (jaarrekening-2025-06-30-individual.md:54-59), probablemente por renovación de mandatos, y se aprobó el 31-10-2025 (línea 23).
Duda: El balance 2025 no marca quién es Voorzitter (solo lista Bestuurders desde 2023-03-10); la presidencia en junio de 2025 se confirma por prensa (VRT, 2025-07-01, un día después del cierre), no por el balance.
Duda: La fecha desde (2020-04-21) viene del balance, no de la fuente web, que solo confirma abril de 2020.
```

## 2024

### Ingresos

```text
2024: cargado por tools/cargar.mjs (2026-10-19) desde Clubes/Bélgica/Lokeren-Temse/jaarrekening-2024-06-30-individual.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Bélgica/Lokeren-Temse/jaarrekening-2024-06-30-individual.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Brutomarge (+)/(-) | pág. 6, Jev 0.98 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Bezoldigingen, sociale lasten en pensioenen (+)/(-) | pág. 6, precedente |
| 2 | Waardeverminderingen op voorraden, op bestellingen in uitvoering en op handelsvorderingen: toevoegingen (terugnemingen) (+)/(-) | pág. 6, precedente |
| 3 | Andere bedrijfskosten | pág. 6, precedente |
| 4 | Niet-recurrente bedrijfskosten | pág. 6, precedente |
| 5 | Afschrijvingen immateriële vaste activa (spelers) | pág. 6, Jev 1 |
| 6 | Afschrijvingen materiële vaste activa | pág. 6, Jev 1 |

### Meta

```text
tools/cargar.mjs (2026-10-19). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee.
```

### Liga

```text
tools/cargar.mjs (2026-10-19): be-div1amateur, verificado contra roster cacheado de "2023–24 Belgian National Division 1" (tools/club-league-reference/be.json), coincidencia exacta "Lokeren-Temse".
```

## 2023

### Ingresos

```text
2023: cargado por tools/cargar.mjs (2026-10-19) desde Clubes/Bélgica/Lokeren-Temse/jaarrekening-2023-06-30-individual-correction.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Bélgica/Lokeren-Temse/jaarrekening-2023-06-30-individual-correction.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Overige bedrijfsopbrengsten (implícito en la Brutomarge) | pág. 6, precedente |
| 2 | Waarvan: niet-recurrente bedrijfsopbrengsten | pág. 6, precedente |
| 3 | Omzet | pág. 6, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Handelsgoederen, grond- en hulpstoffen, diensten en diverse goederen | pág. 6, precedente |
| 2 | Bezoldigingen, sociale lasten en pensioenen (+)/(-) | pág. 6, precedente |
| 3 | Afschrijvingen en waardeverminderingen op oprichtingskosten, op immateriële en materiële vaste activa | pág. 6, precedente |
| 4 | Waardeverminderingen op voorraden, op bestellingen in uitvoering en op handelsvorderingen: toevoegingen (+)/(-) (terugnemingen) | pág. 6, Jev 1 |
| 5 | Andere bedrijfskosten | pág. 6, precedente |

### Meta

```text
tools/cargar.mjs (2026-10-19). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee.
```

### Liga

```text
tools/cargar.mjs (2026-10-19): be-div2amateur, verificado contra roster cacheado de "2022–23 Belgian Division 2" (tools/club-league-reference/be.json), coincidencia exacta "Lokeren-Temse".
```

## 2021

### Ingresos

```text
2021: cargado por tools/cargar.mjs (2026-10-20) desde Clubes/Bélgica/Lokeren-Temse/jaarrekening-2021-06-30-individual.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Bélgica/Lokeren-Temse/jaarrekening-2021-06-30-individual.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Overige bedrijfsopbrengsten (implícito en la Brutomarge) | pág. 5, precedente |
| 2 | Omzet | pág. 5, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Handelsgoederen, grond- en hulpstoffen, diensten en diverse goederen | pág. 5, precedente |
| 2 | Bezoldigingen, sociale lasten en pensioenen (+)/(-) | pág. 5, precedente |
| 3 | Andere bedrijfskosten | pág. 5, precedente |
| 4 | Afschrijvingen materiële vaste activa | pág. 5, precedente |

### Meta

```text
tools/cargar.mjs (2026-10-20). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee.
```

## Fuentes

### lokerentemse-be-jaarrekening-2025-06-30-individual

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-18) desde la transcripción Clubes/Bélgica/Lokeren-Temse/jaarrekening-2025-06-30-individual.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### lokerentemse-be-jaarrekening-2024-06-30-individual

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-19) desde la transcripción Clubes/Bélgica/Lokeren-Temse/jaarrekening-2024-06-30-individual.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### lokerentemse-be-jaarrekening-2023-06-30-individual-correction

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-19) desde la transcripción Clubes/Bélgica/Lokeren-Temse/jaarrekening-2023-06-30-individual-correction.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### lokerentemse-be-jaarrekening-2021-06-30-individual

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-20) desde la transcripción Clubes/Bélgica/Lokeren-Temse/jaarrekening-2021-06-30-individual.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```
