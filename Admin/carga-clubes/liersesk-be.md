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

## Fuentes

### liersesk-be-jaarrekening-2025-06-30-individual

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-18) desde la transcripción Clubes/Bélgica/Lierse SK/jaarrekening-2025-06-30-individual.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```
