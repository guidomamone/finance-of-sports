# vitesse-nl — evidencia de carga

Lo que antes iba como comentario en el data file del club, `data/<país>/vitesse-nl-data.js` (la regla: `Admin/CONVENCIONES-DATOS.md`, "data/<país>/<club>-data.js NO LLEVA
COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y meta. Las notas de cada fila van en una tabla con su número de
fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
Vitesse: alta por tools/alta-club.mjs (2026-10-19) desde Clubes/Países Bajos/Vitesse/wf-2023-2024-be6334b7.pdf. brandColor #FFDD00
(procedencia en Admin/sourcing/Países Bajos/Vitesse.md; tools/cargar-lote.mjs).
```

```text
data/nl/vitesse-nl-data.js — B.V. Vitesse (Países Bajos).
ALTA POR SCRIPT (tools/alta-club.mjs, 2026-10-19), SIN EJERCICIOS CARGADOS TODAVÍA: las estructuras del data file
nacen vacías a propósito. Los rubros, los totales oficiales y el resto del fiscalYearMeta los agrega la etapa de carga.

Documento que originó el alta: Clubes/Países Bajos/Vitesse/wf-2023-2024-be6334b7.pdf

De dónde salió cada campo (estado según alta-club.mjs: ok / pendiente):
  id                 ok        "vitesse-nl" — slug de "Vitesse" + '-nl' (convención de clubId, Admin/CONVENCIONES.md Versión 129)
  name               ok        "B.V. Vitesse" — respuesta de Guido en la cola (4e12c97)
  displayName        ok        "Vitesse" — nombre de la carpeta del club en Clubes/
  country            ok        "NL" — carpeta de país "Países Bajos" (tabla PAISES)
  reportingCurrency  ok        "EUR" — moneda de curso legal de Países Bajos
  fiscalYearStart    ok        "07-01" — cierre del ejercicio: contenido del .md (68 de 68 fechas de fin de mes caen en el mes 6)
  sport              ok        "futbol" — el .md nombra el fútbol 27 veces y ningún otro deporte más que eso
  brandColor         pendiente (ausente) — la liga del club no está en tools/brand-color-reference/ (o el club no está en footylogos)
  anio               ok        2024 — nombre del archivo (misma regla que onboard.mjs --quien), confirmado por las fechas de cierre del .md
  cierre             ok        "2024-06-30" — año del ejercicio + mes de cierre (contenido del .md (68 de 68 fechas de fin de mes caen en el mes 6))
  reportType         ok        "official_balance_sheet" — el .md tiene un estado contable (resultados / balance) y el nombre del archivo no sugiere otro tipo
  perimetro          ok        "consolidado" — ajuste manual (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-19): la única controlada es Event Security Arnhem B.V. (100%), la seguridad del 
  currency           ok        "EUR" — moneda de curso legal de Países Bajos (tabla PAISES de alta-club.mjs)
  fxRef              ok        "EUR@2024-06-30" — el documento no declara tipo de cambio; FX_CLOSE ya tiene EUR@2024-06-30 = 0.9337 (Cierre BCE al 30/6/2024 (1 EUR = 1,071 USD))
  sourceId           ok        "vitesse-nl-wf-2023-2024-be6334b7" — clubId + nombre del archivo en slug
  liga               ok        "nl-eredivisie" — roster cacheado de "2023–24 Eredivisie" (tools/club-league-reference/nl.json), coincidencia exacta "Vitesse"

FISCAL YEAR META PROPUESTO para 2024 (NO registrado: un ejercicio con meta y
sin rubros se vería en el sitio como un año en cero, y "sin dato no es cero"):
  2024: {"reportType":"official_balance_sheet","currency":"EUR","fxRef":"EUR@2024-06-30","sourceId":"vitesse-nl-wf-2023-2024-be6334b7"}
```

## 2024

### Ingresos

```text
2024: cargado por tools/cargar.mjs (2026-10-19) desde Clubes/Países Bajos/Vitesse/wf-2023-2024-be6334b7.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Países Bajos/Vitesse/wf-2023-2024-be6334b7.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Wedstrijdbaten | pág. 38, Jev 0.95 |
| 2 | Sponsoring | pág. 38, Jev 1 |
| 3 | Media gerelateerde baten | pág. 38, Jev 1 |
| 4 | Prijzengeld | pág. 38, Jev 1 |
| 5 | Horeca | pág. 38, precedente |
| 6 | Merchandise | pág. 38, Jev 0.99 |
| 7 | Subsidies en giften | pág. 38, Jev 1 |
| 8 | Overige baten | pág. 38, Jev 1 |
| 9 | Resultaat vergoedingssommen | pág. 20, Jev 1 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Lonen | pág. 38, Claude 0.8 |
| 2 | Sociale lasten | pág. 38, Jev 0.92 |
| 3 | Pensioenlasten | pág. 38, precedente |
| 4 | Bedrijfsgebouwen en -terreinen | pág. 39, Jev 1 |
| 5 | Inventarissen | pág. 39, Claude 0.9 |
| 6 | Overige personeelskosten | pág. 39, precedente |
| 7 | Huisvestingskosten | pág. 39, Jev 0.98 |
| 8 | Wedstrijd- en trainingskosten | pág. 39, Jev 0.95 |
| 9 | Verkoopkosten | pág. 39, precedente |
| 10 | Horeca | pág. 39, Jev 0.98 |
| 11 | Algemene kosten | pág. 39, Jev 1 |

### Meta

```text
2024: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-19): perimetro = consolidado. la única controlada es Event Security Arnhem B.V. (100%), la seguridad del estadio del club (subagente Sonnet, revisado por Claude 2026-10-19)
tools/cargar.mjs (2026-10-19). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
alta-club.mjs (2026-10-19): nl-eredivisie, verificado contra roster cacheado de "2023–24 Eredivisie" (tools/club-league-reference/nl.json), coincidencia exacta "Vitesse".
```

## Fuentes

### vitesse-nl-wf-2023-2024-be6334b7

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-19) desde la transcripción Clubes/Países Bajos/Vitesse/wf-2023-2024-be6334b7.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.
```
