# excelsior-nl — evidencia de carga

Lo que antes iba como comentario en el data file del club, `data/<país>/excelsior-nl-data.js` (la regla: `Admin/CONVENCIONES-DATOS.md`, "data/<país>/<club>-data.js NO LLEVA
COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y meta. Las notas de cada fila van en una tabla con su número de
fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
Excelsior: alta por tools/alta-club.mjs (2026-10-19) desde Clubes/Países Bajos/Excelsior/Excelsior-Jaarverslag-2023-2024.pdf. brandColor:null a propósito
(procedencia en Admin/sourcing/Países Bajos/Excelsior.md; tools/cargar-lote.mjs).
```

```text
data/nl/excelsior-nl-data.js — Stichting Betaald Voetbal Excelsior (Países Bajos).
ALTA POR SCRIPT (tools/alta-club.mjs, 2026-10-19), SIN EJERCICIOS CARGADOS TODAVÍA: las estructuras del data file
nacen vacías a propósito. Los rubros, los totales oficiales y el resto del fiscalYearMeta los agrega la etapa de carga.

Documento que originó el alta: Clubes/Países Bajos/Excelsior/Excelsior-Jaarverslag-2023-2024.pdf

De dónde salió cada campo (estado según alta-club.mjs: ok / pendiente):
  id                 ok        "excelsior-nl" — slug de "Excelsior" + '-nl' (convención de clubId, Admin/CONVENCIONES.md Versión 129)
  name               ok        "Stichting Betaald Voetbal Excelsior" — ajuste manual (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-09): Revisión del alta (Claude, 2026-10-09): el jaarrekening es de la Stichting B
  displayName        ok        "Excelsior" — nombre de la carpeta del club en Clubes/
  country            ok        "NL" — carpeta de país "Países Bajos" (tabla PAISES)
  reportingCurrency  ok        "EUR" — moneda de curso legal de Países Bajos
  fiscalYearStart    ok        "07-01" — cierre del ejercicio: ajuste manual (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-09): Revisión del alta (Claude, 2026-10-09): Geconsolideerd
  sport              ok        "futbol" — el .md nombra el fútbol 4 veces y ningún otro deporte más que eso
  brandColor         pendiente (ausente) — la liga del club no está en tools/brand-color-reference/ (o el club no está en footylogos)
  anio               ok        2024 — ajuste manual (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-09): Revisión del alta (Claude, 2026-10-09): Geconsolideerde balans per 30 juni 2
  cierre             ok        "2024-06-30" — año del ejercicio + mes de cierre (ajuste manual (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-09): Revisión del alta (Claude, 2026-10-09): G
  reportType         ok        "official_balance_sheet" — el .md tiene un estado contable (resultados / balance) y el nombre del archivo no sugiere otro tipo
  perimetro          ok        "consolidado" — ajuste manual (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-09): Revisión del alta (Claude, 2026-10-09): el documento solo trae la balans y l
  currency           ok        "EUR" — moneda de curso legal de Países Bajos (tabla PAISES de alta-club.mjs)
  fxRef              ok        "EUR@2024-06-30" — el documento no declara tipo de cambio; FX_CLOSE ya tiene EUR@2024-06-30 = 0.9337 (Cierre BCE al 30/6/2024 (1 EUR = 1,071 USD))
  sourceId           ok        "excelsior-nl-jaarverslag-2023-2024" — clubId + nombre del archivo en slug
  liga               ok        "nl-eredivisie" — roster cacheado de "2023–24 Eredivisie" (tools/club-league-reference/nl.json), coincidencia exacta "Excelsior"

FISCAL YEAR META PROPUESTO para 2024 (NO registrado: un ejercicio con meta y
sin rubros se vería en el sitio como un año en cero, y "sin dato no es cero"):
  2024: {"reportType":"official_balance_sheet","currency":"EUR","fxRef":"EUR@2024-06-30","sourceId":"excelsior-nl-jaarverslag-2023-2024"}
```

## 2024

### Ingresos

```text
2024: cargado por tools/cargar.mjs (2026-10-19) desde Clubes/Países Bajos/Excelsior/Excelsior-Jaarverslag-2023-2024.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Países Bajos/Excelsior/Excelsior-Jaarverslag-2023-2024.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | netto-omzet | pág. 9, Jev 1 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | lonen en salarissen | pág. 9, Jev 1 |
| 2 | sociale lasten | pág. 9, Jev 0.96 |
| 3 | pensioenen | pág. 9, Claude 0.8 |
| 4 | afschrijving vaste activa | pág. 9, Jev 0.99 |
| 5 | overige bedrijfskosten | pág. 9, Claude 0.9 |

### Meta

```text
2024: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-09): cierre = 2024-06-30. Revisión del alta (Claude, 2026-10-09): Geconsolideerde balans per 30 juni 2024
2024: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-19): fila = 109.017. resultado de participadas, impreso debajo del impuesto: va al financiero, no a los ingresos (como Sparta) (subagente Sonnet, revisado por Claude contra el .md, 2026-10-19)
tools/cargar.mjs (2026-10-19). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee.
```

### Liga

```text
alta-club.mjs (2026-10-19): nl-eredivisie, verificado contra roster cacheado de "2023–24 Eredivisie" (tools/club-league-reference/nl.json), coincidencia exacta "Excelsior".
```

## 2019

### Ingresos

```text
2019: cargado por tools/cargar.mjs (2026-10-25) desde Clubes/Países Bajos/Excelsior/Excelsior-Jaarverslag-2018-2019.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Países Bajos/Excelsior/Excelsior-Jaarverslag-2018-2019.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | netto-omzet | pág. 5, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | lonen en salarissen | pág. 5, precedente |
| 2 | sociale lasten | pág. 5, precedente |
| 3 | pensioenen | pág. 5, precedente |
| 4 | afschrijving vaste activa | pág. 5, precedente |
| 5 | overige bedrijfskosten | pág. 5, precedente |

### Meta

```text
2019: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-09): cierre = 2019-06-30. Revisión del alta (Claude, 2026-10-09): Geconsolideerde balans per 30 juni 2019
tools/cargar.mjs (2026-10-25). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"), con su tipo; la página marca «s/d» en las categorías que esa línea esconde y explica el caso en «Notas sobre este club».
```

### Liga

```text
tools/cargar.mjs (2026-10-25): nl-eredivisie, verificado contra roster cacheado de "2018–19 Eredivisie" (tools/club-league-reference/nl.json), coincidencia exacta "Excelsior".
```

## Fuentes

### excelsior-nl-jaarverslag-2023-2024

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-19) desde la transcripción Clubes/Países Bajos/Excelsior/Excelsior-Jaarverslag-2023-2024.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.
```

### excelsior-nl-jaarverslag-2018-2019

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-25) desde la transcripción Clubes/Países Bajos/Excelsior/Excelsior-Jaarverslag-2018-2019.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.
```
