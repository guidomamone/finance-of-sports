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

## Fuentes

### patroeisden-be-jaarrekening-2025-06-30-individual

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-18) desde la transcripción Clubes/Bélgica/Patro Eisden/jaarrekening-2025-06-30-individual.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```
