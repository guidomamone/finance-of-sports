# fcdordrecht-nl — evidencia de carga

Lo que antes iba como comentario en el data file del club, `data/<país>/fcdordrecht-nl-data.js` (la regla: `Admin/CONVENCIONES-DATOS.md`, "data/<país>/<club>-data.js NO LLEVA
COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y meta. Las notas de cada fila van en una tabla con su número de
fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
FC Dordrecht: alta por tools/alta-club.mjs (2026-10-19) desde Clubes/Países Bajos/FC Dordrecht/wf-2024-2025-602d6b96.pdf. brandColor #E30613
(procedencia en Admin/sourcing/Países Bajos/FC Dordrecht.md; tools/cargar-lote.mjs).
```

```text
data/nl/fcdordrecht-nl-data.js — FC Dordrecht Holding B.V. (Países Bajos).
ALTA POR SCRIPT (tools/alta-club.mjs, 2026-10-19), SIN EJERCICIOS CARGADOS TODAVÍA: las estructuras del data file
nacen vacías a propósito. Los rubros, los totales oficiales y el resto del fiscalYearMeta los agrega la etapa de carga.

Documento que originó el alta: Clubes/Países Bajos/FC Dordrecht/wf-2024-2025-602d6b96.pdf

De dónde salió cada campo (estado según alta-club.mjs: ok / pendiente):
  id                 ok        "fcdordrecht-nl" — slug de "FC Dordrecht" + '-nl' (convención de clubId, Admin/CONVENCIONES.md Versión 129)
  name               ok        "FC Dordrecht Holding B.V." — la portada y lo más frecuente del .md coinciden (6 veces)
  displayName        ok        "FC Dordrecht" — nombre de la carpeta del club en Clubes/
  country            ok        "NL" — carpeta de país "Países Bajos" (tabla PAISES)
  reportingCurrency  ok        "EUR" — moneda de curso legal de Países Bajos
  fiscalYearStart    ok        "07-01" — cierre del ejercicio: contenido del .md (9 de 10 fechas de fin de mes caen en el mes 6)
  sport              ok        "futbol" — el .md nombra el fútbol 2 veces y ningún otro deporte más que eso
  brandColor         pendiente (ausente) — la liga del club no está en tools/brand-color-reference/ (o el club no está en footylogos)
  anio               ok        2025 — nombre del archivo (misma regla que onboard.mjs --quien), confirmado por las fechas de cierre del .md
  cierre             ok        "2025-06-30" — año del ejercicio + mes de cierre (contenido del .md (9 de 10 fechas de fin de mes caen en el mes 6))
  reportType         ok        "official_balance_sheet" — el .md tiene un estado contable (resultados / balance) y el nombre del archivo no sugiere otro tipo
  perimetro          ok        "individual" — el .md no presenta estados consolidados (2 menciones de "consolidado")
  currency           ok        "EUR" — moneda de curso legal de Países Bajos (tabla PAISES de alta-club.mjs)
  fxRef              ok        "EUR@2025-06-30" — el documento no declara tipo de cambio; FX_CLOSE ya tiene EUR@2025-06-30 = 0.8532 (Cierre BCE al 30/6/2025 (1 EUR = 1,172 USD))
  sourceId           ok        "fcdordrecht-nl-wf-2024-2025-602d6b96" — clubId + nombre del archivo en slug
  liga               ok        "nl-eerstedivisie" — roster cacheado de "2024–25 Eerste Divisie" (tools/club-league-reference/nl.json), coincidencia única por palabras "Dordrecht" = "FC Dordrecht"

FISCAL YEAR META PROPUESTO para 2025 (NO registrado: un ejercicio con meta y
sin rubros se vería en el sitio como un año en cero, y "sin dato no es cero"):
  2025: {"reportType":"official_balance_sheet","currency":"EUR","fxRef":"EUR@2025-06-30","sourceId":"fcdordrecht-nl-wf-2024-2025-602d6b96"}
```

## 2025

### Ingresos

```text
2025: cargado por tools/cargar.mjs (2026-10-19) desde Clubes/Países Bajos/FC Dordrecht/wf-2024-2025-602d6b96.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Países Bajos/FC Dordrecht/wf-2024-2025-602d6b96.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Netto-omzet | pág. 6, Jev 1 |
| 2 | Resultaat vergoedingssommen | pág. 6, Jev 1 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Lonen en salarissen | pág. 6, Jev 0.99 |
| 2 | Sociale lasten | pág. 6, Jev 0.91 |
| 3 | Pensioenlasten | pág. 6, precedente |
| 4 | Overige personeelskosten | pág. 6, precedente |
| 5 | Afschrijvingen | pág. 6, Jev 0.91 |
| 6 | Huisvestingskosten | pág. 6, Jev 0.99 |
| 7 | Kantoorkosten | pág. 6, Jev 1 |
| 8 | Verkoopkosten | pág. 6, precedente |
| 9 | Algemene kosten | pág. 6, Jev 1 |

### Meta

```text
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-18): fila = 4.680.373. la transcripción mezcla separadores ("4,680.373") y se leyó 4.680; son 4.680.373 (cierra con Som der kosten 5.575.229 y el resultado 217.061) (subagente Sonnet, revisado por Claude 2026-10-18)
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-18): fila = 1.156.388. resultado neto de traspasos debajo del operativo, faltaba: 4.680.373 - 5.575.229 - 44.471 + 1.156.388 = 217.061 (subagente Sonnet, revisado por Claude 2026-10-18)
tools/cargar.mjs (2026-10-19). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee.
```

### Liga

```text
alta-club.mjs (2026-10-19): nl-eerstedivisie, verificado contra roster cacheado de "2024–25 Eerste Divisie" (tools/club-league-reference/nl.json), coincidencia única por palabras "Dordrecht" = "FC Dordrecht".
```

## Fuentes

### fcdordrecht-nl-wf-2024-2025-602d6b96

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-19) desde la transcripción Clubes/Países Bajos/FC Dordrecht/wf-2024-2025-602d6b96.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```
