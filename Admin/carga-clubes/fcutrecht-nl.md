# fcutrecht-nl — evidencia de carga

Lo que antes iba como comentario en el data file del club, `data/<país>/fcutrecht-nl-data.js` (la regla: `Admin/CONVENCIONES-DATOS.md`, "data/<país>/<club>-data.js NO LLEVA
COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y meta. Las notas de cada fila van en una tabla con su número de
fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
FC Utrecht: alta por tools/alta-club.mjs (2026-10-19) desde Clubes/Países Bajos/FC Utrecht/FC-Utrecht-Jaarverslag-2024-2025.pdf. brandColor #ED1A2F
(procedencia en Admin/sourcing/Países Bajos/FC Utrecht.md; tools/cargar-lote.mjs).
```

```text
data/nl/fcutrecht-nl-data.js — Football Club Utrecht BV (Países Bajos).
ALTA POR SCRIPT (tools/alta-club.mjs, 2026-10-19), SIN EJERCICIOS CARGADOS TODAVÍA: las estructuras del data file
nacen vacías a propósito. Los rubros, los totales oficiales y el resto del fiscalYearMeta los agrega la etapa de carga.

Documento que originó el alta: Clubes/Países Bajos/FC Utrecht/FC-Utrecht-Jaarverslag-2024-2025.pdf

De dónde salió cada campo (estado según alta-club.mjs: ok / pendiente):
  id                 ok        "fcutrecht-nl" — slug de "FC Utrecht" + '-nl' (convención de clubId, Admin/CONVENCIONES.md Versión 129)
  name               ok        "Football Club Utrecht BV" — respuesta de Guido en la cola (0b110d8): aceptó la propuesta
  displayName        ok        "FC Utrecht" — nombre de la carpeta del club en Clubes/
  country            ok        "NL" — carpeta de país "Países Bajos" (tabla PAISES)
  reportingCurrency  ok        "EUR" — moneda de curso legal de Países Bajos
  fiscalYearStart    ok        "07-01" — cierre del ejercicio: contenido del .md (113 de 114 fechas de fin de mes caen en el mes 6)
  sport              ok        "futbol" — el .md nombra el fútbol 19 veces y ningún otro deporte más que eso
  brandColor         pendiente (ausente) — la liga del club no está en tools/brand-color-reference/ (o el club no está en footylogos)
  anio               ok        2025 — nombre del archivo (misma regla que onboard.mjs --quien), confirmado por las fechas de cierre del .md
  cierre             ok        "2025-06-30" — año del ejercicio + mes de cierre (contenido del .md (113 de 114 fechas de fin de mes caen en el mes 6))
  reportType         ok        "official_balance_sheet" — el .md tiene un estado contable (resultados / balance) y el nombre del archivo no sugiere otro tipo
  perimetro          ok        "consolidado" — ajuste manual (Admin/registros/ajustes-manuales.jsonl, perimetro-senales 2026-10-18): perimetro-senales.mjs: 0 documento(s) con los dos estados votan 
  currency           ok        "EUR" — moneda de curso legal de Países Bajos (tabla PAISES de alta-club.mjs)
  fxRef              ok        "EUR@2025-06-30" — el documento no declara tipo de cambio; FX_CLOSE ya tiene EUR@2025-06-30 = 0.8532 (Cierre BCE al 30/6/2025 (1 EUR = 1,172 USD))
  sourceId           ok        "fcutrecht-nl-jaarverslag-2024-2025" — clubId + nombre del archivo en slug
  liga               pendiente null — coincidencia NO exacta en los rosters cacheados: "Utrecht" en 2024–25 Eredivisie | "Jong FC Utrecht" en 2024–25 Eerste Divisie

FISCAL YEAR META PROPUESTO para 2025 (NO registrado: un ejercicio con meta y
sin rubros se vería en el sitio como un año en cero, y "sin dato no es cero"):
  2025: {"reportType":"official_balance_sheet","currency":"EUR","fxRef":"EUR@2025-06-30","sourceId":"fcutrecht-nl-jaarverslag-2024-2025"}
```

## 2025

### Ingresos

```text
2025: cargado por tools/cargar.mjs (2026-10-19) desde Clubes/Países Bajos/FC Utrecht/FC-Utrecht-Jaarverslag-2024-2025.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Países Bajos/FC Utrecht/FC-Utrecht-Jaarverslag-2024-2025.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Wedstrijdbaten | pág. 30, Jev 0.92 |
| 2 | Sponsoring | pág. 30, Jev 1 |
| 3 | Media gerelateerde baten | pág. 30, Jev 1 |
| 4 | Prijzengeld | pág. 30, Jev 1 |
| 5 | Horeca | pág. 30, Jev 0.99 |
| 6 | Merchandise | pág. 30, Jev 0.99 |
| 7 | Subsidies en giften | pág. 30, Jev 0.99 |
| 8 | Overige baten | pág. 30, Jev 0.99 |
| 9 | Resultaat vergoedingssommen | pág. 11, Jev 1 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Lonen en salarissen | pág. 30, Jev 0.97 |
| 2 | Sociale lasten | pág. 30, Jev 0.95 |
| 3 | Pensioenlasten | pág. 30, precedente |
| 4 | Overige personeelskosten | pág. 30, Jev 0.93 |
| 5 | Vergoedingssommen | pág. 31, Jev 1 |
| 6 | Goodwill | pág. 31, Jev 0.99 |
| 7 | Website | pág. 31, Claude 0.8 |
| 8 | Allocatie amortisatie vergoedingssommen | pág. 31, Jev 0.99 |
| 9 | Bedrijfsgebouwen en -terreinen | pág. 31, Jev 0.99 |
| 10 | Machines en installaties | pág. 31, Claude 0.92 |
| 11 | Andere vaste bedrijfsmiddelen | pág. 31, Jev 0.99 |
| 12 | Huisvestingskosten | pág. 31, Jev 0.99 |
| 13 | Wedstrijd- en trainingskosten | pág. 31, Jev 0.98 |
| 14 | Verkoopkosten merchandising | pág. 31, precedente |
| 15 | Verkoopkosten | pág. 31, Jev 1 |
| 16 | Algemene kosten | pág. 31, Jev 1 |

### Meta

```text
tools/cargar.mjs (2026-10-19). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
alta-club.mjs (2026-10-19): null, SIN VERIFICAR (coincidencia NO exacta en los rosters cacheados: "Utrecht" en 2024–25 Eredivisie | "Jong FC Utrecht" en 2024–25 Eerste Divisie).
2026-10-26: nl-eredivisie. El primer equipo es «Utrecht» de la Eredivisie 2024–25 (Wikipedia en inglés); «Jong FC Utrecht» es el filial de la Eerste Divisie. Segunda fuente: nl.wikipedia, «Eredivisie 2024/25 (mannenvoetbal)», que lista «FC Utrecht» (segunda-fuente-wikipedia-local.mjs, unidas por Wikidata: 18 de 18).
```

## Fuentes

### fcutrecht-nl-jaarverslag-2024-2025

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-19) desde la transcripción Clubes/Países Bajos/FC Utrecht/FC-Utrecht-Jaarverslag-2024-2025.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.
```
