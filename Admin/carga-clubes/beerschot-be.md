# beerschot-be — evidencia de carga

Lo que antes iba como comentario en el data file del club, `data/<país>/beerschot-be-data.js` (la regla: `Admin/CONVENCIONES-DATOS.md`, "data/<país>/<club>-data.js NO LLEVA
COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y meta. Las notas de cada fila van en una tabla con su número de
fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
Beerschot: alta por tools/alta-club.mjs (2026-10-18) desde Clubes/Bélgica/Beerschot/jaarrekening-2025-06-30-individual.pdf. brandColor #6104D2
(procedencia en Admin/sourcing/Bélgica/Beerschot.md; tools/cargar-lote.mjs).
```

```text
data/be/beerschot-be-data.js — Beerschot (Bélgica).
ALTA POR SCRIPT (tools/alta-club.mjs, 2026-10-18), SIN EJERCICIOS CARGADOS TODAVÍA: las estructuras del data file
nacen vacías a propósito. Los rubros, los totales oficiales y el resto del fiscalYearMeta los agrega la etapa de carga.

Documento que originó el alta: Clubes/Bélgica/Beerschot/jaarrekening-2025-06-30-individual.pdf

De dónde salió cada campo (estado según alta-club.mjs: ok / pendiente):
  id                 ok        "beerschot-be" — slug de "Beerschot" + '-be' (convención de clubId, Admin/CONVENCIONES.md Versión 129)
  name               pendiente "Beerschot" — no se encontró el nombre legal en el .md; se usa el nombre de la carpeta
  displayName        ok        "Beerschot" — nombre de la carpeta del club en Clubes/
  country            ok        "BE" — carpeta de país "Bélgica" (tabla PAISES)
  reportingCurrency  ok        "EUR" — moneda de curso legal de Bélgica
  fiscalYearStart    ok        "07-01" — cierre del ejercicio: nombre del archivo (2025-06-30) y contenido del .md (18 de 19 fechas de fin de mes)
  sport              ok        "futbol" — el .md nombra el fútbol 8 veces y ningún otro deporte más que eso
  brandColor         pendiente (ausente) — la liga del club no está en tools/brand-color-reference/ (o el club no está en footylogos)
  anio               ok        2025 — nombre del archivo (misma regla que onboard.mjs --quien), confirmado por las fechas de cierre del .md
  cierre             ok        "2025-06-30" — año del ejercicio + mes de cierre (nombre del archivo (2025-06-30) y contenido del .md (18 de 19 fechas de fin de mes))
  reportType         ok        "official_balance_sheet" — el .md tiene un estado contable (resultados / balance) y el nombre del archivo no sugiere otro tipo
  perimetro          ok        "individual" — el nombre del archivo dice que son los estados individuales ("jaarrekening-2025-06-30-individual.pdf"), y no hay un consolidado del mismo ejercicio en
  currency           ok        "EUR" — moneda de curso legal de Bélgica (tabla PAISES de alta-club.mjs)
  fxRef              ok        "EUR@2025-06-30" — el documento no declara tipo de cambio; FX_CLOSE ya tiene EUR@2025-06-30 = 0.8532 (Cierre BCE al 30/6/2025 (1 EUR = 1,172 USD))
  sourceId           ok        "beerschot-be-jaarrekening-2025-06-30-individual" — clubId + nombre del archivo en slug
  liga               pendiente null — sin caché de rosters para be (tools/club-league-reference/be.json)

FISCAL YEAR META PROPUESTO para 2025 (NO registrado: un ejercicio con meta y
sin rubros se vería en el sitio como un año en cero, y "sin dato no es cero"):
  2025: {"reportType":"official_balance_sheet","currency":"EUR","fxRef":"EUR@2025-06-30","sourceId":"beerschot-be-jaarrekening-2025-06-30-individual"}
```

## 2025

### Ingresos

```text
2025: cargado por tools/cargar.mjs (2026-10-18) desde Clubes/Bélgica/Beerschot/jaarrekening-2025-06-30-individual.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Bélgica/Beerschot/jaarrekening-2025-06-30-individual.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Ticketing en abonnementen | pág. 23, precedente |
| 2 | Sponsoring | pág. 23, Jev 1 |
| 3 | TV rechten | pág. 23, Jev 1 |
| 4 | Commercieel | pág. 23, Jev 0.92 |
| 5 | Andere bedrijfsopbrengsten | pág. 8, Jev 0.96 |
| 6 | Niet-recurrente bedrijfsopbrengsten | pág. 8, Jev 1 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Aankopen | pág. 8, precedente |
| 2 | Voorraad: afname (toename) (+)/(-) | pág. 8, Jev 1 |
| 3 | Diensten en diverse goederen | pág. 8, Jev 0.97 |
| 4 | Bezoldigingen en rechtstreekse sociale voordelen | pág. 23, Claude 0.8 |
| 5 | Werkgeversbijdragen voor sociale verzekeringen | pág. 23, Jev 0.97 |
| 6 | Andere personeelskosten | pág. 23, precedente |
| 7 | Voorzieningen voor risico's en kosten: toevoegingen (bestedingen en terugnemingen) (+)/(-) | pág. 8, Jev 1 |
| 8 | Bedrijfsbelastingen en -taksen | pág. 24, Jev 1 |
| 9 | Andere | pág. 24, Jev 0.99 |
| 10 | Niet-recurrente bedrijfskosten | pág. 8, Jev 0.9 |
| 11 | Afschrijvingen immateriële vaste activa (spelers) | pág. 8, precedente |
| 12 | Afschrijvingen goodwill | pág. 8, precedente |
| 13 | Afschrijvingen materiële vaste activa | pág. 8, precedente |
| 14 | Waardeverminderingen op voorraden, op bestellingen in uitvoering en op handelsvorderingen: toevoegingen (terugnemingen) (+)/(-) | pág. 8, Jev 0.99 |

### Meta

```text
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-18): fila = -25.436. resta del impuesto: Belastingen 35.016 - 25.436 = 9.580 impreso (L325-327) (subagente Sonnet, revisado por Claude)
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-18): fila = -6.684. costo financiero (65/66B, L316-318): resta
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-18): fila = -321.178. costo financiero (65/66B, L316-320): resta
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-18): fila = 223.703. la nota de activos fijos separa el 630 (891.583) (subagente Sonnet, revisado por Claude 2026-10-18)
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-18): categoria = player_amortisation. la nota de activos fijos separa el 630 (891.583) (subagente Sonnet, revisado por Claude 2026-10-18)
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-18): fila = 169.559. la nota de activos fijos separa el 630 (891.583) (subagente Sonnet, revisado por Claude 2026-10-18)
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-18): categoria = other_amortisation. la nota de activos fijos separa el 630 (891.583) (subagente Sonnet, revisado por Claude 2026-10-18)
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-18): fila = 498.321. la nota de activos fijos separa el 630 (891.583) (subagente Sonnet, revisado por Claude 2026-10-18)
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-18): categoria = depreciation. la nota de activos fijos separa el 630 (891.583) (subagente Sonnet, revisado por Claude 2026-10-18)
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-18): fila = -64.834. 631/4 es una reversión neta de -64.834 (L295): resta del gasto (Claude 2026-10-18)
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-18): cero-real = Cuotas sociales. hay lidgelden diferidos pero ningún renglón de cuotas en el estado ni en las notas 6.10 (subagente Sonnet, revisado por Claude 2026-10-18)
tools/cargar.mjs (2026-10-18). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
alta-club.mjs (2026-10-18): null, SIN VERIFICAR (sin caché de rosters para be (tools/club-league-reference/be.json)).
```

## Fuentes

### beerschot-be-jaarrekening-2025-06-30-individual

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-18) desde la transcripción Clubes/Bélgica/Beerschot/jaarrekening-2025-06-30-individual.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```
