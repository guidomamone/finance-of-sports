# rwdm-be — evidencia de carga

Lo que antes iba como comentario en el data file del club, `data/<país>/rwdm-be-data.js` (la regla: `Admin/CONVENCIONES-DATOS.md`, "data/<país>/<club>-data.js NO LLEVA
COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y meta. Las notas de cada fila van en una tabla con su número de
fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
RWDM: alta por tools/alta-club.mjs (2026-10-18) desde Clubes/Bélgica/RWDM/jaarrekening-2025-06-30-individual.pdf. brandColor #FF0000
(procedencia en Admin/sourcing/Bélgica/RWDM.md; tools/cargar-lote.mjs).
```

```text
data/be/rwdm-be-data.js — RWDM (Bélgica).
ALTA POR SCRIPT (tools/alta-club.mjs, 2026-10-18), SIN EJERCICIOS CARGADOS TODAVÍA: las estructuras del data file
nacen vacías a propósito. Los rubros, los totales oficiales y el resto del fiscalYearMeta los agrega la etapa de carga.

Documento que originó el alta: Clubes/Bélgica/RWDM/jaarrekening-2025-06-30-individual.pdf

De dónde salió cada campo (estado según alta-club.mjs: ok / pendiente):
  id                 ok        "rwdm-be" — slug de "RWDM" + '-be' (convención de clubId, Admin/CONVENCIONES.md Versión 129)
  name               pendiente "RWDM" — no se encontró el nombre legal en el .md; se usa el nombre de la carpeta
  displayName        ok        "RWDM" — nombre de la carpeta del club en Clubes/
  country            ok        "BE" — carpeta de país "Bélgica" (tabla PAISES)
  reportingCurrency  ok        "EUR" — moneda de curso legal de Bélgica
  fiscalYearStart    ok        "07-01" — cierre del ejercicio: ajuste manual (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-18): boekjaar 01-07-2024 tot 30-06-2025 (.md L35)
  sport              ok        "futbol" — el .md nombra el fútbol 0 veces y ningún otro deporte más que eso
  brandColor         pendiente (ausente) — la liga del club no está en tools/brand-color-reference/ (o el club no está en footylogos)
  anio               ok        2025 — ajuste manual (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-18): boekjaar 01-07-2024 tot 30-06-2025 (.md L35)
  cierre             ok        "2025-06-30" — año del ejercicio + mes de cierre (ajuste manual (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-18): boekjaar 01-07-2024 tot 30-06-2025 (.md 
  reportType         ok        "official_balance_sheet" — el .md tiene un estado contable (resultados / balance) y el nombre del archivo no sugiere otro tipo
  perimetro          ok        "individual" — el nombre del archivo dice que son los estados individuales ("jaarrekening-2025-06-30-individual.pdf"), y no hay un consolidado del mismo ejercicio en
  currency           ok        "EUR" — moneda de curso legal de Bélgica (tabla PAISES de alta-club.mjs)
  fxRef              ok        "EUR@2025-06-30" — el documento no declara tipo de cambio; FX_CLOSE ya tiene EUR@2025-06-30 = 0.8532 (Cierre BCE al 30/6/2025 (1 EUR = 1,172 USD))
  sourceId           ok        "rwdm-be-jaarrekening-2025-06-30-individual" — clubId + nombre del archivo en slug
  liga               pendiente null — sin caché de rosters para be (tools/club-league-reference/be.json)

FISCAL YEAR META PROPUESTO para 2025 (NO registrado: un ejercicio con meta y
sin rubros se vería en el sitio como un año en cero, y "sin dato no es cero"):
  2025: {"reportType":"official_balance_sheet","currency":"EUR","fxRef":"EUR@2025-06-30","sourceId":"rwdm-be-jaarrekening-2025-06-30-individual"}
```

## 2025

### Ingresos

```text
2025: cargado por tools/cargar.mjs (2026-10-18) desde Clubes/Bélgica/RWDM/jaarrekening-2025-06-30-individual.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Bélgica/RWDM/jaarrekening-2025-06-30-individual.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Omzet | pág. 8, Jev 1 |
| 2 | Andere bedrijfsopbrengsten | pág. 8, Jev 0.94 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Aankopen | pág. 8, precedente |
| 2 | Diensten en diverse goederen | pág. 8, Jev 0.98 |
| 3 | Bezoldigingen en rechtstreekse sociale voordelen | pág. 25, Claude 0.8 |
| 4 | Werkgeversbijdragen voor sociale verzekeringen | pág. 25, Jev 0.97 |
| 5 | Andere personeelskosten | pág. 25, precedente |
| 6 | Afschrijvingen en waardeverminderingen op oprichtingskosten, op immateriële en materiële vaste activa | pág. 8, precedente |
| 7 | Voorzieningen voor risico's en kosten: toevoegingen (bestedingen en terugnemingen) (+)/(-) | pág. 8, Jev 0.92 |
| 8 | Bedrijfsbelastingen en -taksen | pág. 26, Jev 1 |
| 9 | Andere | pág. 26, Jev 0.99 |
| 10 | Minderwaarden bij de realisatie van immateriële en materiële vaste activa | pág. 28, precedente |
| 11 | Andere niet-recurrente bedrijfskosten | pág. 28, precedente |

### Meta

```text
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-18): cierre = 2025-06-30. boekjaar 01-07-2024 tot 30-06-2025 (.md L35)
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-18): fila = -6.145.338. costo financiero (Financiële kosten 65/66B): resta (subagente Sonnet, revisado por Claude 2026-10-18)
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-18): fila = -133.987. costo financiero (Financiële kosten 65/66B): resta (subagente Sonnet, revisado por Claude 2026-10-18)
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-18): fila = -67.030. costo financiero (Financiële kosten 65/66B): resta (subagente Sonnet, revisado por Claude 2026-10-18)
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-18): fila = -55.000. costo financiero (Financiële kosten 65/66B): resta (subagente Sonnet, revisado por Claude 2026-10-18)
tools/cargar.mjs (2026-10-18). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee.
```

```text
tools/caja-deuda.mjs (2026-10-18): cash escalón 1 (compuerta: balance del documento (NBB)): código NBB 54/58 = 183058 (L178); el balance cuadra: 20/58 = 10/49 = 9529145 (año sin vecino)
```

### Liga

```text
alta-club.mjs (2026-10-18): null, SIN VERIFICAR (sin caché de rosters para be (tools/club-league-reference/be.json)).
```

## 2020

### Ingresos

```text
2020: cargado por tools/cargar.mjs (2026-10-18) desde Clubes/Bélgica/RWDM/jaarrekening-2020-06-30-individual.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Bélgica/RWDM/jaarrekening-2020-06-30-individual.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Brutomarge (+)/(-) | pág. 8, Jev 0.99 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Bezoldigingen, sociale lasten en pensioenen (+)/(-) | pág. 8, Jev 0.99 |
| 2 | Afschrijvingen en waardeverminderingen op oprichtingskosten, op immateriële en materiële vaste activa | pág. 8, precedente |
| 3 | Waardeverminderingen op voorraden, op bestellingen in uitvoering en op handelsvorderingen: toevoegingen (terugnemingen) (+)/(-) | pág. 8, Jev 0.99 |
| 4 | Andere bedrijfskosten | pág. 8, Claude 0.88 |
| 5 | Niet-recurrente bedrijfskosten | pág. 8, Claude 0.9 |

### Meta

```text
tools/cargar.mjs (2026-10-18). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee.
```

```text
tools/caja-deuda.mjs (2026-10-18): cash escalón 1 (compuerta: balance del documento (NBB)): código NBB 54/58 = 50076 (L172); el balance cuadra: 20/58 = 10/49 = 864227 (año sin vecino)
```

### Liga

```text
tools/cargar.mjs (2026-10-18): null, SIN VERIFICAR (sin caché de rosters para be (tools/club-league-reference/be.json)).
```

## Fuentes

### rwdm-be-jaarrekening-2025-06-30-individual

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-18) desde la transcripción Clubes/Bélgica/RWDM/jaarrekening-2025-06-30-individual.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### rwdm-be-jaarrekening-2020-06-30-individual

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-18) desde la transcripción Clubes/Bélgica/RWDM/jaarrekening-2020-06-30-individual.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```
