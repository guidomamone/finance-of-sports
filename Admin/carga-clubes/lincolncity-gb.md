# lincolncity-gb — evidencia de carga

Lo que antes iba como comentario en el data file del club, `data/<país>/lincolncity-gb-data.js` (la regla: `Admin/CONVENCIONES-DATOS.md`, "data/<país>/<club>-data.js NO LLEVA
COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y meta. Las notas de cada fila van en una tabla con su número de
fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
Lincoln City: alta por tools/alta-club.mjs (2026-10-21) desde Clubes/Inglaterra/Lincoln City/lincoln-medium-accounts-2024-25-ixbrl.pdf. brandColor #CE131A
(procedencia en Admin/sourcing/Inglaterra/Lincoln City.md; tools/cargar-lote.mjs).
```

```text
data/gb/lincolncity-gb-data.js — Lincoln City Football Club Company Limited (Inglaterra).
ALTA POR SCRIPT (tools/alta-club.mjs, 2026-10-21), SIN EJERCICIOS CARGADOS TODAVÍA: las estructuras del data file
nacen vacías a propósito. Los rubros, los totales oficiales y el resto del fiscalYearMeta los agrega la etapa de carga.

Documento que originó el alta: Clubes/Inglaterra/Lincoln City/lincoln-medium-accounts-2024-25-ixbrl.pdf

De dónde salió cada campo (estado según alta-club.mjs: ok / pendiente):
  id                 ok        "lincolncity-gb" — slug de "Lincoln City" + '-gb' (convención de clubId, Admin/CONVENCIONES.md Versión 129)
  name               ok        "Lincoln City Football Club Company Limited" — respuesta de Guido en la cola (f1632bc)
  displayName        ok        "Lincoln City" — nombre de la carpeta del club en Clubes/
  country            ok        "GB" — carpeta de país "Inglaterra" (tabla PAISES)
  reportingCurrency  ok        "GBP" — moneda de curso legal de Inglaterra
  fiscalYearStart    ok        "07-01" — cierre del ejercicio: ajuste manual (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-21): EndDateForPeriodCoveredByReport 30.6.25 en el XHTML; 
  sport              ok        "futbol" — la liga gb-leagueone del catálogo (data/leagues.js) es de futbol
  brandColor         pendiente (ausente) — la liga del club no está en tools/brand-color-reference/ (o el club no está en footylogos)
  anio               ok        2025 — ajuste manual (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-21): EndDateForPeriodCoveredByReport 30.6.25 en el XHTML; .md: Year Ended 30 Jun
  cierre             ok        "2025-06-30" — año del ejercicio + mes de cierre (ajuste manual (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-21): EndDateForPeriodCoveredByReport 30.6.25 
  reportType         ok        "official_balance_sheet" — el .md tiene un estado contable (resultados / balance) y el nombre del archivo no sugiere otro tipo
  perimetro          ok        "individual" — el .md no presenta estados consolidados (1 menciones de "consolidado")
  currency           ok        "GBP" — moneda de curso legal de Inglaterra (tabla PAISES de alta-club.mjs)
  fxRef              ok        "GBP@2025-06-30" — el documento no declara tipo de cambio; FX_CLOSE ya tiene GBP@2025-06-30 = 0.7299 (Cierre BCE al 30/6/2025, cruzando GBP/EUR (0,85550) × EUR/USD (1,17
  sourceId           ok        "lincolncity-gb-lincoln-medium-accounts-2024-25-ixbrl" — clubId + nombre del archivo en slug
  liga               ok        "gb-leagueone" — roster cacheado de "2024–25 EFL League One" (tools/club-league-reference/gb.json), coincidencia exacta "Lincoln City"

FISCAL YEAR META PROPUESTO para 2025 (NO registrado: un ejercicio con meta y
sin rubros se vería en el sitio como un año en cero, y "sin dato no es cero"):
  2025: {"reportType":"official_balance_sheet","currency":"GBP","fxRef":"GBP@2025-06-30","sourceId":"lincolncity-gb-lincoln-medium-accounts-2024-25-ixbrl"}
```

## 2025

### Ingresos

```text
2025: cargado por tools/cargar.mjs (2026-10-21) desde Clubes/Inglaterra/Lincoln City/lincoln-medium-accounts-2024-25-ixbrl.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Inglaterra/Lincoln City/lincoln-medium-accounts-2024-25-ixbrl.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Matchday | pág. 37, Jev 0.99 |
| 2 | Central distribution and grants | pág. 37, precedente |
| 3 | Commercial, hospitality and retail | pág. 37, Jev 0.98 |
| 4 | Academy grants and fundraising | pág. 37, precedente |
| 5 | Football fortune and miscellaneous income | pág. 37, precedente |
| 6 | Other operating income | pág. 23, Jev 1 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Cost of sales | pág. 23, precedente |
| 2 | Administrative expenses | pág. 23, Jev 1 |

### Meta

```text
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-21): cierre = 2025-06-30. EndDateForPeriodCoveredByReport 30.6.25 en el XHTML; .md: Year Ended 30 June 2025
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-21): incluye = wages_squad. Estado de resultados por función (Cost of sales y Administrative expenses): los sueldos están adentro, la nota de staff costs no dice en qué renglón; se parten después con caja-deuda --personal (to-do 351). Mismo tratamiento que Remo y Ferroviária (incluye posible)
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-21): incluye = member_dues. El club vende membresías (weareimps.com: Bronze, Silver, John O'Gaunts Club), bundles de entradas; el turnover (.md L1006-1014) no tiene línea propia
tools/cargar.mjs (2026-10-21). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
incluidoEn: ajuste manual `incluye`: el documento junta estas categorías con otra línea.
```

### Liga

```text
alta-club.mjs (2026-10-21): gb-leagueone, verificado contra roster cacheado de "2024–25 EFL League One" (tools/club-league-reference/gb.json), coincidencia exacta "Lincoln City".
```

## Fuentes

### lincolncity-gb-lincoln-medium-accounts-2024-25-ixbrl

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-21) desde la transcripción Clubes/Inglaterra/Lincoln City/lincoln-medium-accounts-2024-25-ixbrl.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```
