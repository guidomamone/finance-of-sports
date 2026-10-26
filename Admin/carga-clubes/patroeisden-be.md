# patroeisden-be — evidencia de carga

Lo que antes iba como comentario en el data file del club, `data/<país>/patroeisden-be-data.js` (la regla: `Admin/CONVENCIONES-DATOS.md`, "data/<país>/<club>-data.js NO LLEVA
COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y meta. Las notas de cada fila van en una tabla con su número de
fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
Patro Eisden: alta por tools/alta-club.mjs (2026-10-18) desde Clubes/Bélgica/Patro Eisden/jaarrekening-2025-06-30-individual.pdf. brandColor #660099
(procedencia en Admin/sourcing/Bélgica/Patro Eisden.md; tools/cargar-lote.mjs).
```

```text
data/be/patroeisden-be-data.js — Patro Eisden Maasmechelen VZW (Bélgica).
ALTA POR SCRIPT (tools/alta-club.mjs, 2026-10-18), SIN EJERCICIOS CARGADOS TODAVÍA: las estructuras del data file
nacen vacías a propósito. Los rubros, los totales oficiales y el resto del fiscalYearMeta los agrega la etapa de carga.

Documento que originó el alta: Clubes/Bélgica/Patro Eisden/jaarrekening-2025-06-30-individual.pdf

De dónde salió cada campo (estado según alta-club.mjs: ok / pendiente):
  id                 ok        "patroeisden-be" — slug de "Patro Eisden" + '-be' (convención de clubId, Admin/CONVENCIONES.md Versión 129)
  name               ok        "Patro Eisden Maasmechelen VZW" — respuesta de Guido en la cola (e9c367a): aceptó la propuesta
  displayName        ok        "Patro Eisden" — nombre de la carpeta del club en Clubes/
  country            ok        "BE" — carpeta de país "Bélgica" (tabla PAISES)
  reportingCurrency  ok        "EUR" — moneda de curso legal de Bélgica
  fiscalYearStart    ok        "07-01" — cierre del ejercicio: nombre del archivo (2025-06-30) y contenido del .md (14 de 17 fechas de fin de mes)
  sport              ok        "futbol" — el .md nombra el fútbol 0 veces y ningún otro deporte más que eso
  brandColor         pendiente (ausente) — la liga del club no está en tools/brand-color-reference/ (o el club no está en footylogos)
  anio               ok        2025 — nombre del archivo (misma regla que onboard.mjs --quien), presente en el .md (el año más citado con fecha de cierre es 2026)
  cierre             ok        "2025-06-30" — año del ejercicio + mes de cierre (nombre del archivo (2025-06-30) y contenido del .md (14 de 17 fechas de fin de mes))
  reportType         ok        "official_balance_sheet" — el .md tiene un estado contable (resultados / balance) y el nombre del archivo no sugiere otro tipo
  perimetro          ok        "individual" — el nombre del archivo dice que son los estados individuales ("jaarrekening-2025-06-30-individual.pdf"), y no hay un consolidado del mismo ejercicio en
  currency           ok        "EUR" — moneda de curso legal de Bélgica (tabla PAISES de alta-club.mjs)
  fxRef              ok        "EUR@2025-06-30" — el documento no declara tipo de cambio; FX_CLOSE ya tiene EUR@2025-06-30 = 0.8532 (Cierre BCE al 30/6/2025 (1 EUR = 1,172 USD))
  sourceId           ok        "patroeisden-be-jaarrekening-2025-06-30-individual" — clubId + nombre del archivo en slug
  liga               pendiente null — sin caché de rosters para be (tools/club-league-reference/be.json)

FISCAL YEAR META PROPUESTO para 2025 (NO registrado: un ejercicio con meta y
sin rubros se vería en el sitio como un año en cero, y "sin dato no es cero"):
  2025: {"reportType":"official_balance_sheet","currency":"EUR","fxRef":"EUR@2025-06-30","sourceId":"patroeisden-be-jaarrekening-2025-06-30-individual"}
```

## 2025

### Ingresos

```text
2025: cargado por tools/cargar.mjs (2026-10-18) desde Clubes/Bélgica/Patro Eisden/jaarrekening-2025-06-30-individual.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Bélgica/Patro Eisden/jaarrekening-2025-06-30-individual.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Brutomarge (+)/(-) | pág. 5, Jev 0.94 |
| 2 | Waarvan: niet-recurrente bedrijfsopbrengsten | pág. 5, Jev 1 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Bezoldigingen, sociale lasten en pensioenen (+)/(-) | pág. 5, Jev 0.92 |
| 2 | Waardeverminderingen op voorraden, op bestellingen in uitvoering en op handelsvorderingen: toevoegingen (terugnemingen) (+)/(-) | pág. 5, Jev 0.99 |
| 3 | Voorzieningen voor risico's en kosten: toevoegingen (bestedingen en terugnemingen) (+)/(-) | pág. 5, Jev 0.97 |
| 4 | Andere bedrijfskosten | pág. 5, Jev 0.9 |
| 5 | Niet-recurrente bedrijfskosten | pág. 5, Jev 0.9 |
| 6 | Afschrijvingen immateriële vaste activa (spelers) | pág. 5, precedente |
| 7 | Afschrijvingen materiële vaste activa | pág. 5, precedente |

### Meta

```text
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-18): fila = -293.069. costo financiero (Financiële kosten 65/66B): resta (subagente Sonnet, revisado por Claude 2026-10-18)
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-18): fila = 92.871. la nota separa el 630 (252.396): los inmateriales son transferencias de jugadores (subagente Sonnet, revisado por Claude 2026-10-18)
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-18): categoria = player_amortisation. la nota separa el 630 (252.396): los inmateriales son transferencias de jugadores (subagente Sonnet, revisado por Claude 2026-10-18)
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-18): fila = 159.525. la nota separa el 630 (252.396): los inmateriales son transferencias de jugadores (subagente Sonnet, revisado por Claude 2026-10-18)
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-18): categoria = depreciation. la nota separa el 630 (252.396): los inmateriales son transferencias de jugadores (subagente Sonnet, revisado por Claude 2026-10-18)
tools/cargar.mjs (2026-10-18). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee.
```

```text
tools/caja-deuda.mjs (2026-10-18): cash escalón 1 (compuerta: balance del documento (NBB)): código NBB 54/58 = 11997 (L123); el balance cuadra: 20/58 = 10/49 = 5980537 (año sin vecino)
```

### Liga

```text
alta-club.mjs (2026-10-18): null, SIN VERIFICAR (sin caché de rosters para be (tools/club-league-reference/be.json)).
```

## Gestiones

_investigado por un subagente con fuente por gestión (Admin/gestiones-por-pais/tanda-2026-10-19/resultado-5.json, tools/gestiones-tanda.mjs, 2026-10-19):_

```text
Wayne Woo (2016-12-01 a 2018-10-31): Inversor chino que 'nam half december 2016 ... het voorzitterschap over' (nl.wikipedia): día 01 por convención, la fuente dice mediados de diciembre. El 1/8/2018 el club anunció que Woo vendió; hasta = 31/10/2018 (asunción de Azimi) porque entre medio un tribunal le quitó poderes y no hay otro presidente. Voorzitter van de Raad van Bestuur en jaarrekening-2017-06-30-individual.md:43-48.
Salar Azimi (2018-10-31 a 2020-12-01): 'Op 31 oktober 2018 nam de Iraanse zakenman Salar Azimi het voorzitterschap over' (nl.wikipedia). Dimitió con su consejo en diciembre de 2020 (día 01). jaarrekening-2019-06-30-individual.md:47-52: AZIMI SALAR, Voorzitter van de Raad van Bestuur.
Derrick Devonport (2020-12-01 a 2021-05-12): Inversor inglés que tomó el club tras Azimi en diciembre de 2020; el 12/5/2021 se comunicó oficialmente la salida de su consejo por falta del financiamiento prometido (nl.wikipedia). No tiene ejercicio cargado; se incluye para no dejar hueco. Entre el 12/5/2021 y diciembre de 2021 condujeron el club Stijn Stijnen, Wouter Corstjens y Rik Vliegen (tres personas, sin presidente): no se carga.
Coley Parry (2021-12-01 a hoy): Common Group (EE.UU.) anunció la toma en diciembre de 2021 y Coley Parry pasó a ser voorzitter, 'sinds december 2021' en la ficha (nl.wikipedia, día 01). El balance del cierre 2025-06-30 lista 'Parry Coleman' como Voorzitter van de Raad van Bestuur (jaarrekening-2025-06-30-individual.md:44-48); el nombre está escrito al revés (Coley Parry = Parry Coleman) y también están Parry William (ondervoorzitter) y Parry Thomas Rawdan (bestuurder).
SIN CONFIRMAR, no cargada: Robert Stevens (2014-07-01 a 2016-12-01), https://nl.wikipedia.org/wiki/K._Patro_Eisden_Maasmechelen: Voorzitter van de Raad van Bestuur en el balance 2015 (jaarrekening-2015-06-30-individual.md:44-49, STEVENS Robert) y 'voorzitter Robert Stevens' dio el acuerdo al traspaso de poder en diciembre de 2016 (nl.wikipedia). La fuente no dice cuándo empezó: desde = 2014-07-01 es solo el inicio del ejercicio 2014/15 en que ya figura (cota, no fecha de asunción), por eso confirmada:false. Aviso: el balance del cierre 2016-06-30 (aprobado el 13/1/2017) lista a Woo de Voorzitter (jaarrekening-2016-06-30-individual.md:50-55) y a Stevens solo de Bestuurder: la presidencia cambió entre el cierre y la aprobación.
Duda: Stevens: no hay fuente con la fecha en que asumió ni la de su salida exacta (diciembre 2016, 'half december'); 2016-06-30 queda cubierto con confirmada:false. Evidencia directa de que era el presidente al cierre: el balance 2015 (junio 2015) y el hecho de que Woo asumió recién en diciembre de 2016.
Duda: Wayne Woo fue Voorzitter solo desde diciembre de 2016, pero firma el balance 2016-06-30 (aprobado 13/1/2017): 'firmo' no se inventa, solo se avisa.
Duda: Woo: el hasta (31/10/2018) asume que el vacío entre su venta anunciada (1/8/2018) y Azimi no tuvo otro presidente; la fuente no lo dice.
Duda: Parry: la fuente no da el día del cambio (diciembre de 2021).
```

## 2024

### Ingresos

```text
2024: cargado por tools/cargar.mjs (2026-10-19) desde Clubes/Bélgica/Patro Eisden/jaarrekening-2024-06-30-individual-correction.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Bélgica/Patro Eisden/jaarrekening-2024-06-30-individual-correction.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Brutomarge (+)/(-) | pág. 5, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Bezoldigingen, sociale lasten en pensioenen (+)/(-) | pág. 5, precedente |
| 2 | Waardeverminderingen op voorraden, op bestellingen in uitvoering en op handelsvorderingen: toevoegingen (terugnemingen) (+)/(-) | pág. 5, precedente |
| 3 | Voorzieningen voor risico's en kosten: toevoegingen (bestedingen en terugnemingen) (+)/(-) | pág. 5, precedente |
| 4 | Andere bedrijfskosten | pág. 5, precedente |
| 5 | Niet-recurrente bedrijfskosten | pág. 5, precedente |
| 6 | Afschrijvingen immateriële vaste activa (spelers) | pág. 5, precedente |
| 7 | Afschrijvingen materiële vaste activa | pág. 5, precedente |

### Meta

```text
tools/cargar.mjs (2026-10-19). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee.
```

### Liga

```text
tools/cargar.mjs (2026-10-19): be-challengerproleague, verificado contra roster cacheado de "2023–24 Challenger Pro League" (tools/club-league-reference/be.json), coincidencia exacta "Patro Eisden Maasmechelen".
```

## 2023

### Ingresos

```text
2023: cargado por tools/cargar.mjs (2026-10-19) desde Clubes/Bélgica/Patro Eisden/jaarrekening-2023-06-30-individual.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Bélgica/Patro Eisden/jaarrekening-2023-06-30-individual.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Overige bedrijfsopbrengsten (implícito en la Brutomarge) | pág. 6, Jev 1 |
| 2 | Waarvan: niet-recurrente bedrijfsopbrengsten | pág. 6, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Handelsgoederen, grond- en hulpstoffen, diensten en diverse goederen | pág. 6, precedente |
| 2 | Bezoldigingen, sociale lasten en pensioenen (+)/(-) | pág. 6, precedente |
| 3 | Waardeverminderingen op voorraden, op bestellingen in uitvoering en op handelsvorderingen: toevoegingen (+)/(-) (terugnemingen) | pág. 6, Jev 0.99 |
| 4 | Voorzieningen voor risico's en kosten: toevoegingen (+)/(-) (bestedingen en terugnemingen) | pág. 6, Jev 1 |
| 5 | Andere bedrijfskosten | pág. 6, precedente |
| 6 | Niet-recurrente bedrijfskosten | pág. 6, precedente |
| 7 | Afschrijvingen immateriële vaste activa (spelers) | pág. 6, precedente |
| 8 | Afschrijvingen materiële vaste activa | pág. 6, precedente |

### Meta

```text
2023: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-18): cierre = 2023-06-30. del .md L32: "| met betrekking tot het boekjaar dat de periode dekt van | 01-07-2022 | tot | 30-06-2023 |" (Claude 2026-10-18)
tools/cargar.mjs (2026-10-19). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
tools/cargar.mjs (2026-10-19): be-div1amateur, verificado contra roster cacheado de "2022–23 Belgian National Division 1" (tools/club-league-reference/be.json), coincidencia exacta "Patro Eisden".
```

## 2022

### Ingresos

```text
2022: cargado por tools/cargar.mjs (2026-10-19) desde Clubes/Bélgica/Patro Eisden/jaarrekening-2022-06-30-individual.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Bélgica/Patro Eisden/jaarrekening-2022-06-30-individual.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Overige bedrijfsopbrengsten (implícito en la Brutomarge) | pág. 6, Jev 1 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Handelsgoederen, grond- en hulpstoffen, diensten en diverse goederen | pág. 6, precedente |
| 2 | Bezoldigingen, sociale lasten en pensioenen (+)/(-) | pág. 6, precedente |
| 3 | Waardeverminderingen op voorraden, op bestellingen in uitvoering en op handelsvorderingen: toevoegingen (+)/(-) (terugnemingen) | pág. 6, Jev 0.99 |
| 4 | Voorzieningen voor risico's en kosten: toevoegingen (+)/(-) (bestedingen en terugnemingen) | pág. 6, Jev 1 |
| 5 | Andere bedrijfskosten | pág. 6, precedente |
| 6 | Afschrijvingen immateriële vaste activa (spelers) | pág. 6, precedente |
| 7 | Afschrijvingen materiële vaste activa | pág. 6, precedente |

### Meta

```text
tools/cargar.mjs (2026-10-19). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
tools/cargar.mjs (2026-10-19): be-div1amateur, verificado contra roster cacheado de "2021–22 Belgian National Division 1" (tools/club-league-reference/be.json), coincidencia exacta "Patro Eisden Maasmechelen".
```

## 2021

### Ingresos

```text
2021: cargado por tools/cargar.mjs (2026-10-19) desde Clubes/Bélgica/Patro Eisden/jaarrekening-2021-06-30-individual.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Bélgica/Patro Eisden/jaarrekening-2021-06-30-individual.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: -; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Brutomarge (+)/(-) | pág. 7, precedente |
| 2 | Bezoldigingen, sociale lasten en pensioenen (+)/(-) | pág. 7, precedente |
| 3 | Waardeverminderingen op voorraden, op bestellingen in uitvoering en op handelsvorderingen: toevoegingen (terugnemingen) (+)/(-) | pág. 7, precedente |
| 4 | Voorzieningen voor risico's en kosten: toevoegingen (bestedingen en terugnemingen) (+)/(-) | pág. 7, precedente |
| 5 | Andere bedrijfskosten | pág. 7, precedente |
| 6 | Niet-recurrente bedrijfskosten | pág. 7, precedente |

### Meta

```text
tools/cargar.mjs (2026-10-19). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee.
```

### Liga

```text
tools/cargar.mjs (2026-10-19): be-div1amateur, verificado contra roster cacheado de "2020–21 Belgian National Division 1" (tools/club-league-reference/be.json), coincidencia exacta "Patro Eisden Maasmechelen".
```

## 2020

### Ingresos

```text
2020: cargado por tools/cargar.mjs (2026-10-19) desde Clubes/Bélgica/Patro Eisden/jaarrekening-2020-06-30-individual-correction.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Bélgica/Patro Eisden/jaarrekening-2020-06-30-individual-correction.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Brutomarge (+)/(-) | pág. 7, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Bezoldigingen, sociale lasten en pensioenen (+)/(-) | pág. 7, precedente |
| 2 | Waardeverminderingen op voorraden, op bestellingen in uitvoering en op handelsvorderingen: toevoegingen (terugnemingen) (+)/(-) | pág. 7, precedente |
| 3 | Voorzieningen voor risico's en kosten: toevoegingen (bestedingen en terugnemingen) (+)/(-) | pág. 7, precedente |
| 4 | Andere bedrijfskosten | pág. 7, precedente |

### Meta

```text
tools/cargar.mjs (2026-10-19). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee.
```

### Liga

```text
tools/cargar.mjs (2026-10-19): be-div1amateur, verificado contra roster cacheado de "2019–20 Belgian First Amateur Division" (tools/club-league-reference/be.json), coincidencia exacta "Patro Eisden Maasmechelen".
```

## 2019

### Ingresos

```text
2019: cargado por tools/cargar.mjs (2026-10-19) desde Clubes/Bélgica/Patro Eisden/jaarrekening-2019-06-30-individual.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Bélgica/Patro Eisden/jaarrekening-2019-06-30-individual.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Bedrijfsopbrengsten | pág. 7, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Handelsgoederen, grond- en hulpstoffen, diensten en diverse goederen | pág. 7, Jev 0.99 |
| 2 | Bezoldigingen en rechtstreekse sociale voordelen | pág. 9, Jev 1 |
| 3 | Werkgeversbijdragen voor sociale verzekeringen | pág. 9, Jev 0.97 |
| 4 | Werkgeverspremies voor bovenwettelijke verzekeringen | pág. 9, Claude 0.85 |
| 5 | Andere bedrijfskosten | pág. 7, precedente |

### Meta

```text
tools/cargar.mjs (2026-10-19). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee.
```

### Liga

```text
tools/cargar.mjs (2026-10-19): be-div2amateur, verificado contra roster cacheado de "2018–19 Belgian Second Amateur Division" (tools/club-league-reference/be.json), coincidencia exacta "Patro Eisden Maasmechelen".
```

## 2018

### Ingresos

```text
2018: cargado por tools/cargar.mjs (2026-10-19) desde Clubes/Bélgica/Patro Eisden/jaarrekening-2018-06-30-individual.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Bélgica/Patro Eisden/jaarrekening-2018-06-30-individual.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Bedrijfsopbrengsten | pág. 6, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Handelsgoederen, grond- en hulpstoffen, diensten en diverse goederen | pág. 6, Jev 0.99 |
| 2 | Bezoldigingen en rechtstreekse sociale voordelen | pág. 8, Jev 1 |
| 3 | Werkgeversbijdragen voor sociale verzekeringen | pág. 8, Jev 0.97 |
| 4 | Werkgeverspremies voor bovenwettelijke verzekeringen | pág. 8, Claude 0.85 |
| 5 | Andere personeelskosten | pág. 8, Claude 0.85 |
| 6 | Ouderdoms- en overlevingspensioenen | pág. 8, Claude 0.85 |
| 7 | Andere bedrijfskosten | pág. 6, precedente |
| 8 | Uitzonderlijke kosten | pág. 6, Jev 1 |

### Meta

```text
tools/cargar.mjs (2026-10-19). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee.
```

### Liga

```text
tools/cargar.mjs (2026-10-19): be-div1amateur, verificado contra roster cacheado de "2017–18 Belgian First Amateur Division" (tools/club-league-reference/be.json), coincidencia exacta "Patro Eisden Maasmechelen".
```

## 2017

### Ingresos

```text
2017: cargado por tools/cargar.mjs (2026-10-19) desde Clubes/Bélgica/Patro Eisden/jaarrekening-2017-06-30-individual.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Bélgica/Patro Eisden/jaarrekening-2017-06-30-individual.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Bedrijfsopbrengsten | pág. 6, precedente |
| 2 | Uitzonderlijke opbrengsten | pág. 6, Jev 1 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Handelsgoederen, grond- en hulpstoffen, diensten en diverse goederen | pág. 6, Jev 0.99 |
| 2 | Bezoldigingen en rechtstreekse sociale voordelen | pág. 8, Jev 1 |
| 3 | Werkgeversbijdragen voor sociale verzekeringen | pág. 8, Jev 0.97 |
| 4 | Werkgeverspremies voor bovenwettelijke verzekeringen | pág. 8, Claude 0.85 |
| 5 | Andere personeelskosten | pág. 8, Claude 0.85 |
| 6 | Ouderdoms- en overlevingspensioenen | pág. 8, Claude 0.85 |
| 7 | Andere bedrijfskosten | pág. 6, precedente |

### Meta

```text
tools/cargar.mjs (2026-10-19). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee.
```

### Liga

```text
tools/cargar.mjs (2026-10-19): be-div1amateur, verificado contra roster cacheado de "2016–17 Belgian First Amateur Division" (tools/club-league-reference/be.json), coincidencia exacta "Patro Eisden Maasmechelen".
```

## 2016

### Ingresos

```text
2016: cargado por tools/cargar.mjs (2026-10-19) desde Clubes/Bélgica/Patro Eisden/jaarrekening-2016-06-30-individual.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Bélgica/Patro Eisden/jaarrekening-2016-06-30-individual.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Bedrijfsopbrengsten | pág. 5, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Handelsgoederen, grond- en hulpstoffen, diensten en diverse goederen | pág. 5, Jev 0.99 |
| 2 | Bezoldigingen en rechtstreekse sociale voordelen | pág. 7, Jev 1 |
| 3 | Werkgeversbijdragen voor sociale verzekeringen | pág. 7, Jev 0.97 |
| 4 | Werkgeverspremies voor bovenwettelijke verzekeringen | pág. 7, Claude 0.85 |
| 5 | Andere personeelskosten | pág. 7, Claude 0.85 |
| 6 | Ouderdoms- en overlevingspensioenen | pág. 7, Claude 0.85 |
| 7 | Andere bedrijfskosten | pág. 5, precedente |

### Meta

```text
tools/cargar.mjs (2026-10-19). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee.
```

### Liga

```text
tools/cargar.mjs (2026-10-19): be-challengerproleague, verificado contra roster cacheado de "2015–16 Belgian Second Division" (tools/club-league-reference/be.json), coincidencia exacta "Patro Eisden Maasmechelen".
```

## 2015

### Ingresos

```text
2015: cargado por tools/cargar.mjs (2026-10-20) desde Clubes/Bélgica/Patro Eisden/jaarrekening-2015-06-30-individual.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Bélgica/Patro Eisden/jaarrekening-2015-06-30-individual.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Bedrijfsopbrengsten | pág. 5, precedente |
| 2 | Uitzonderlijke opbrengsten | pág. 5, Jev 1 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Handelsgoederen, grond- en hulpstoffen, diensten en diverse goederen | pág. 5, Jev 0.99 |
| 2 | Bezoldigingen en rechtstreekse sociale voordelen | pág. 7, Jev 1 |
| 3 | Werkgeversbijdragen voor sociale verzekeringen | pág. 7, Jev 0.97 |
| 4 | Andere personeelskosten | pág. 7, Claude 0.85 |
| 5 | Waardeverminderingen op voorraden, op bestellingen in uitvoering en op handelsvorderingen: toevoegingen (terugnemingen) (+)/(-) | pág. 5, precedente |
| 6 | Andere bedrijfskosten | pág. 5, precedente |

### Meta

```text
tools/cargar.mjs (2026-10-20). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee.
```

## 2014

### Ingresos

```text
2014: cargado por tools/cargar.mjs (2026-10-20) desde Clubes/Bélgica/Patro Eisden/jaarrekening-2014-06-30-individual.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Bélgica/Patro Eisden/jaarrekening-2014-06-30-individual.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Brutomarge (+)/(-) | pág. 5, precedente |
| 2 | Uitzonderlijke opbrengsten | pág. 5, Jev 1 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Bezoldigingen en rechtstreekse sociale voordelen | pág. 7, Jev 1 |
| 2 | Werkgeverspremies voor bovenwettelijke verzekeringen | pág. 7, Claude 0.85 |
| 3 | Ouderdoms- en overlevingspensioenen | pág. 7, Claude 0.85 |
| 4 | Andere bedrijfskosten | pág. 5, precedente |

### Meta

```text
tools/cargar.mjs (2026-10-20). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee.
```

## 2013

### Ingresos

```text
2013: cargado por tools/cargar.mjs (2026-10-20) desde Clubes/Bélgica/Patro Eisden/jaarrekening-2013-06-30-individual.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Bélgica/Patro Eisden/jaarrekening-2013-06-30-individual.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Omzet | pág. 5, Jev 1 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Handelsgoederen, grond- en hulpstoffen, diensten en diverse goederen | pág. 5, Jev 0.99 |
| 2 | Bezoldigingen en rechtstreekse sociale voordelen | pág. 7, Jev 1 |
| 3 | Werkgeversbijdragen voor sociale verzekeringen | pág. 7, Jev 0.97 |
| 4 | Werkgeverspremies voor bovenwettelijke verzekeringen | pág. 7, Claude 0.85 |
| 5 | Ouderdoms- en overlevingspensioenen | pág. 7, Claude 0.85 |
| 6 | Andere bedrijfskosten | pág. 5, precedente |

### Meta

```text
tools/cargar.mjs (2026-10-20). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee.
```

## Fuentes

### patroeisden-be-jaarrekening-2025-06-30-individual

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-18) desde la transcripción Clubes/Bélgica/Patro Eisden/jaarrekening-2025-06-30-individual.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### patroeisden-be-jaarrekening-2016-06-30-individual

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-19) desde la transcripción Clubes/Bélgica/Patro Eisden/jaarrekening-2016-06-30-individual.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### patroeisden-be-jaarrekening-2017-06-30-individual

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-19) desde la transcripción Clubes/Bélgica/Patro Eisden/jaarrekening-2017-06-30-individual.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### patroeisden-be-jaarrekening-2018-06-30-individual

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-19) desde la transcripción Clubes/Bélgica/Patro Eisden/jaarrekening-2018-06-30-individual.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### patroeisden-be-jaarrekening-2019-06-30-individual

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-19) desde la transcripción Clubes/Bélgica/Patro Eisden/jaarrekening-2019-06-30-individual.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### patroeisden-be-jaarrekening-2020-06-30-individual-correction

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-19) desde la transcripción Clubes/Bélgica/Patro Eisden/jaarrekening-2020-06-30-individual-correction.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### patroeisden-be-jaarrekening-2024-06-30-individual-correction

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-19) desde la transcripción Clubes/Bélgica/Patro Eisden/jaarrekening-2024-06-30-individual-correction.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### patroeisden-be-jaarrekening-2021-06-30-individual

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-19) desde la transcripción Clubes/Bélgica/Patro Eisden/jaarrekening-2021-06-30-individual.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### patroeisden-be-jaarrekening-2023-06-30-individual

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-19) desde la transcripción Clubes/Bélgica/Patro Eisden/jaarrekening-2023-06-30-individual.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### patroeisden-be-jaarrekening-2022-06-30-individual

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-19) desde la transcripción Clubes/Bélgica/Patro Eisden/jaarrekening-2022-06-30-individual.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### patroeisden-be-jaarrekening-2014-06-30-individual

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-20) desde la transcripción Clubes/Bélgica/Patro Eisden/jaarrekening-2014-06-30-individual.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### patroeisden-be-jaarrekening-2013-06-30-individual

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-20) desde la transcripción Clubes/Bélgica/Patro Eisden/jaarrekening-2013-06-30-individual.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### patroeisden-be-jaarrekening-2015-06-30-individual

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-20) desde la transcripción Clubes/Bélgica/Patro Eisden/jaarrekening-2015-06-30-individual.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

## Liga de 2013 (2026-10-26)

```text
be-div1amateur (la tercera división de entonces, «Derde klasse», que la fila de 2014 ya trae con esa liga): nl.wikipedia «Derde klasse 2012-13 (voetbal België)» lista a «K. Patro Eisden Maasmechelen» en su tabla, y la página del club en nl.wikipedia enlaza esa misma temporada en su historia. Dos páginas de la Wikipedia en neerlandés; la lista en inglés de esa temporada no existe (no hay «2012–13 Belgian Third Division»), así que no hay lista cacheada en tools/club-league-reference/be.json.
```
