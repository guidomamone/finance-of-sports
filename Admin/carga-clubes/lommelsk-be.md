# lommelsk-be — evidencia de carga

Lo que antes iba como comentario en el data file del club, `data/<país>/lommelsk-be-data.js` (la regla: `Admin/CONVENCIONES-DATOS.md`, "data/<país>/<club>-data.js NO LLEVA
COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y meta. Las notas de cada fila van en una tabla con su número de
fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
Lommel SK: alta por tools/alta-club.mjs (2026-10-18) desde Clubes/Bélgica/Lommel SK/jaarrekening-2025-06-30-individual.pdf. brandColor #009150
(procedencia en Admin/sourcing/Bélgica/Lommel SK.md; tools/cargar-lote.mjs).
```

```text
data/be/lommelsk-be-data.js — Voetbalclub Lommel SK NV (Bélgica).
ALTA POR SCRIPT (tools/alta-club.mjs, 2026-10-18), SIN EJERCICIOS CARGADOS TODAVÍA: las estructuras del data file
nacen vacías a propósito. Los rubros, los totales oficiales y el resto del fiscalYearMeta los agrega la etapa de carga.

Documento que originó el alta: Clubes/Bélgica/Lommel SK/jaarrekening-2025-06-30-individual.pdf

De dónde salió cada campo (estado según alta-club.mjs: ok / pendiente):
  id                 ok        "lommelsk-be" — slug de "Lommel SK" + '-be' (convención de clubId, Admin/CONVENCIONES.md Versión 129)
  name               ok        "Voetbalclub Lommel SK NV" — respuesta de Guido en la cola (91075bb)
  displayName        ok        "Lommel SK" — nombre de la carpeta del club en Clubes/
  country            ok        "BE" — carpeta de país "Bélgica" (tabla PAISES)
  reportingCurrency  ok        "EUR" — moneda de curso legal de Bélgica
  fiscalYearStart    ok        "07-01" — cierre del ejercicio: ajuste manual (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-18): boekjaar 01-07-2024 tot 30-06-2025 (.md L38)
  sport              ok        "futbol" — el .md nombra el fútbol 20 veces y ningún otro deporte más que eso
  brandColor         pendiente (ausente) — la liga del club no está en tools/brand-color-reference/ (o el club no está en footylogos)
  anio               ok        2025 — ajuste manual (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-18): boekjaar 01-07-2024 tot 30-06-2025 (.md L38)
  cierre             ok        "2025-06-30" — año del ejercicio + mes de cierre (ajuste manual (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-18): boekjaar 01-07-2024 tot 30-06-2025 (.md 
  reportType         ok        "official_balance_sheet" — el .md tiene un estado contable (resultados / balance) y el nombre del archivo no sugiere otro tipo
  perimetro          ok        "individual" — el nombre del archivo dice que son los estados individuales ("jaarrekening-2025-06-30-individual.pdf"), y no hay un consolidado del mismo ejercicio en
  currency           ok        "EUR" — moneda de curso legal de Bélgica (tabla PAISES de alta-club.mjs)
  fxRef              ok        "EUR@2025-06-30" — el documento no declara tipo de cambio; FX_CLOSE ya tiene EUR@2025-06-30 = 0.8532 (Cierre BCE al 30/6/2025 (1 EUR = 1,172 USD))
  sourceId           ok        "lommelsk-be-jaarrekening-2025-06-30-individual" — clubId + nombre del archivo en slug
  liga               pendiente null — sin caché de rosters para be (tools/club-league-reference/be.json)

FISCAL YEAR META PROPUESTO para 2025 (NO registrado: un ejercicio con meta y
sin rubros se vería en el sitio como un año en cero, y "sin dato no es cero"):
  2025: {"reportType":"official_balance_sheet","currency":"EUR","fxRef":"EUR@2025-06-30","sourceId":"lommelsk-be-jaarrekening-2025-06-30-individual"}
```

## 2025

### Ingresos

```text
2025: cargado por tools/cargar.mjs (2026-10-18) desde Clubes/Bélgica/Lommel SK/jaarrekening-2025-06-30-individual.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Bélgica/Lommel SK/jaarrekening-2025-06-30-individual.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Omzet | pág. 8, Jev 1 |
| 2 | Andere bedrijfsopbrengsten | pág. 8, Jev 0.97 |
| 3 | Niet-recurrente bedrijfsopbrengsten | pág. 8, Jev 1 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Aankopen | pág. 8, precedente |
| 2 | Voorraad: afname (toename) (+)/(-) | pág. 8, Jev 0.99 |
| 3 | Diensten en diverse goederen | pág. 8, Jev 0.97 |
| 4 | Bezoldigingen en rechtstreekse sociale voordelen | pág. 24, Claude 0.8 |
| 5 | Werkgeversbijdragen voor sociale verzekeringen | pág. 24, Jev 0.96 |
| 6 | Andere personeelskosten | pág. 24, precedente |
| 7 | Waardeverminderingen op voorraden, op bestellingen in uitvoering en op handelsvorderingen: toevoegingen (terugnemingen) (+)/(-) | pág. 8, Jev 0.98 |
| 8 | Bedrijfsbelastingen en -taksen | pág. 25, Jev 1 |
| 9 | Andere | pág. 25, Jev 1 |
| 10 | Afschrijvingen immateriële vaste activa (spelers) | pág. 8, precedente |
| 11 | Afschrijvingen materiële vaste activa | pág. 8, precedente |
| 12 | Minderwaarden bij de realisatie van immateriële vaste activa (spelers) | pág. 8, precedente |
| 13 | Andere niet-recurrente bedrijfskosten | pág. 8, precedente |

### Meta

```text
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-18): cierre = 2025-06-30. boekjaar 01-07-2024 tot 30-06-2025 (.md L38)
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-18): fila = -7.455. costo financiero (Financiële kosten 65/66B): resta (subagente Sonnet, revisado por Claude 2026-10-18)
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-18): fila = -90.425. costo financiero (Financiële kosten 65/66B): resta (subagente Sonnet, revisado por Claude 2026-10-18)
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-18): fila = 5.674.313. la nota separa el 630 (6.264.419; materiales 590.105 + 1 de redondeo para cerrar con el estado) (subagente Sonnet, revisado por Claude 2026-10-18)
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-18): categoria = player_amortisation. la nota separa el 630 (6.264.419; materiales 590.105 + 1 de redondeo para cerrar con el estado) (subagente Sonnet, revisado por Claude 2026-10-18)
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-18): fila = 590.106. la nota separa el 630 (6.264.419; materiales 590.105 + 1 de redondeo para cerrar con el estado) (subagente Sonnet, revisado por Claude 2026-10-18)
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-18): categoria = depreciation. la nota separa el 630 (6.264.419; materiales 590.105 + 1 de redondeo para cerrar con el estado) (subagente Sonnet, revisado por Claude 2026-10-18)
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-18): fila = 573.455. nota 6.12 abre el 66A (749.155): 6630 = 573.455 (pérdida en baja de jugadores) + 175.700 (subagente Sonnet, revisado por Claude 2026-10-18)
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-18): categoria = player_impairment. nota 6.12 abre el 66A (749.155): 6630 = 573.455 (pérdida en baja de jugadores) + 175.700 (subagente Sonnet, revisado por Claude 2026-10-18)
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-18): fila = 175.700. nota 6.12 abre el 66A (749.155): 6630 = 573.455 (pérdida en baja de jugadores) + 175.700 (subagente Sonnet, revisado por Claude 2026-10-18)
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-18): categoria = exceptional_items. nota 6.12 abre el 66A (749.155): 6630 = 573.455 (pérdida en baja de jugadores) + 175.700 (subagente Sonnet, revisado por Claude 2026-10-18)
tools/cargar.mjs (2026-10-18). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee.
```

```text
tools/caja-deuda.mjs (2026-10-18): cash escalón 1 (compuerta: balance del documento (NBB)): código NBB 54/58 = 890401 (L180); el balance cuadra: 20/58 = 10/49 = 32177259 (año sin vecino)
```

### Liga

```text
alta-club.mjs (2026-10-18): null, SIN VERIFICAR (sin caché de rosters para be (tools/club-league-reference/be.json)).
```

## 2018

### Ingresos

```text
2018: cargado por tools/cargar.mjs (2026-10-18) desde Clubes/Bélgica/Lommel SK/jaarrekening-2018-06-30-individual.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Bélgica/Lommel SK/jaarrekening-2018-06-30-individual.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Brutomarge (+)/(-) | pág. 6, Jev 0.99 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Bezoldigingen, sociale lasten en pensioenen (+)/(-) | pág. 6, Jev 0.99 |
| 2 | Afschrijvingen en waardeverminderingen op oprichtingskosten, op immateriële en materiële vaste activa | pág. 6, precedente |
| 3 | Andere bedrijfskosten | pág. 6, Claude 0.88 |
| 4 | Niet-recurrente bedrijfskosten | pág. 6, precedente |

### Meta

```text
tools/cargar.mjs (2026-10-18). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee.
```

```text
tools/caja-deuda.mjs (2026-10-18): cash escalón 1 (compuerta: balance del documento (NBB)): código NBB 54/58 = 139346 (L139); el balance cuadra: 20/58 = 10/49 = 2334658 (año sin vecino)
```

### Liga

```text
tools/cargar.mjs (2026-10-18): null, SIN VERIFICAR (sin caché de rosters para be (tools/club-league-reference/be.json)).
```

## Fuentes

### lommelsk-be-jaarrekening-2025-06-30-individual

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-18) desde la transcripción Clubes/Bélgica/Lommel SK/jaarrekening-2025-06-30-individual.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### lommelsk-be-jaarrekening-2018-06-30-individual

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-18) desde la transcripción Clubes/Bélgica/Lommel SK/jaarrekening-2018-06-30-individual.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```
