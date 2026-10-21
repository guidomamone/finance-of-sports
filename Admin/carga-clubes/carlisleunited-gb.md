# carlisleunited-gb — evidencia de carga

Lo que antes iba como comentario en el data file del club, `data/<país>/carlisleunited-gb-data.js` (la regla: `Admin/CONVENCIONES-DATOS.md`, "data/<país>/<club>-data.js NO LLEVA
COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y meta. Las notas de cada fila van en una tabla con su número de
fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
Carlisle United: alta por tools/alta-club.mjs (2026-10-21) desde Clubes/Inglaterra/Carlisle United/carlisle-full-accounts-2024-25-ixbrl.pdf. brandColor #007ABC
(procedencia en Admin/sourcing/Inglaterra/Carlisle United.md; tools/cargar-lote.mjs).
```

```text
data/gb/carlisleunited-gb-data.js — Carlisle United Association Football Club (1921) Limited (Inglaterra).
ALTA POR SCRIPT (tools/alta-club.mjs, 2026-10-21), SIN EJERCICIOS CARGADOS TODAVÍA: las estructuras del data file
nacen vacías a propósito. Los rubros, los totales oficiales y el resto del fiscalYearMeta los agrega la etapa de carga.

Documento que originó el alta: Clubes/Inglaterra/Carlisle United/carlisle-full-accounts-2024-25-ixbrl.pdf

De dónde salió cada campo (estado según alta-club.mjs: ok / pendiente):
  id                 ok        "carlisleunited-gb" — slug de "Carlisle United" + '-gb' (convención de clubId, Admin/CONVENCIONES.md Versión 129)
  name               ok        "Carlisle United Association Football Club (1921) Limited" — la portada y lo más frecuente del .md coinciden (30 veces)
  displayName        ok        "Carlisle United" — nombre de la carpeta del club en Clubes/
  country            ok        "GB" — carpeta de país "Inglaterra" (tabla PAISES)
  reportingCurrency  ok        "GBP" — moneda de curso legal de Inglaterra
  fiscalYearStart    ok        "07-01" — cierre del ejercicio: contenido del .md (41 de 44 fechas de fin de mes caen en el mes 6)
  sport              ok        "futbol" — la liga gb-leaguetwo del catálogo (data/leagues.js) es de futbol
  brandColor         pendiente (ausente) — la liga del club no está en tools/brand-color-reference/ (o el club no está en footylogos)
  anio               ok        2025 — nombre del archivo (misma regla que onboard.mjs --quien), confirmado por las fechas de cierre del .md
  cierre             ok        "2025-06-30" — año del ejercicio + mes de cierre (contenido del .md (41 de 44 fechas de fin de mes caen en el mes 6))
  reportType         ok        "official_balance_sheet" — el .md tiene un estado contable (resultados / balance) y el nombre del archivo no sugiere otro tipo
  perimetro          ok        "individual" — ajuste manual (Admin/registros/ajustes-manuales.jsonl, perimetro-senales 2026-10-21): perimetro-senales.mjs: 0 documento(s) con los dos estados votan 
  currency           ok        "GBP" — moneda de curso legal de Inglaterra (tabla PAISES de alta-club.mjs)
  fxRef              ok        "GBP@2025-06-30" — el documento no declara tipo de cambio; FX_CLOSE ya tiene GBP@2025-06-30 = 0.7299 (Cierre BCE al 30/6/2025, cruzando GBP/EUR (0,85550) × EUR/USD (1,17
  sourceId           ok        "carlisleunited-gb-carlisle-full-accounts-2024-25-ixbrl" — clubId + nombre del archivo en slug
  liga               ok        "gb-leaguetwo" — roster cacheado de "2024–25 EFL League Two" (tools/club-league-reference/gb.json), coincidencia exacta "Carlisle United"

FISCAL YEAR META PROPUESTO para 2025 (NO registrado: un ejercicio con meta y
sin rubros se vería en el sitio como un año en cero, y "sin dato no es cero"):
  2025: {"reportType":"official_balance_sheet","currency":"GBP","fxRef":"GBP@2025-06-30","sourceId":"carlisleunited-gb-carlisle-full-accounts-2024-25-ixbrl"}
```

## 2025

### Ingresos

```text
2025: cargado por tools/cargar.mjs (2026-10-21) desde Clubes/Inglaterra/Carlisle United/carlisle-full-accounts-2024-25-ixbrl.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Inglaterra/Carlisle United/carlisle-full-accounts-2024-25-ixbrl.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Matchday | pág. 22, Jev 0.98 |
| 2 | Commercial | pág. 22, Jev 0.99 |
| 3 | Retail | pág. 22, Jev 1 |
| 4 | Football fortune | pág. 22, Jev 0.99 |
| 5 | Football league | pág. 22, precedente |
| 6 | Website and streaming income | pág. 22, precedente |
| 7 | Donations | pág. 22, Jev 1 |
| 8 | Other operating income | pág. 22, Jev 1 |
| 9 | Net rents receivable | pág. 22, Claude 0.85 |
| 10 | Government grants receivable | pág. 22, Jev 1 |
| 11 | Insurance claims receivable | pág. 22, Jev 1 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Cost of sales | pág. 14, precedente |
| 2 | Administrative expenses | pág. 14, Jev 1 |

### Meta

```text
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-21): incluye = wages_squad. Estado de resultados por función (Cost of sales y Administrative expenses): los sueldos están adentro, la nota de staff costs no dice en qué renglón; se parten después con caja-deuda --personal (to-do 351). Mismo tratamiento que Remo y Ferroviária (incluye posible)
tools/cargar.mjs (2026-10-21). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
incluidoEn: ajuste manual `incluye`: el documento junta estas categorías con otra línea.
```

### Liga

```text
alta-club.mjs (2026-10-21): gb-leaguetwo, verificado contra roster cacheado de "2024–25 EFL League Two" (tools/club-league-reference/gb.json), coincidencia exacta "Carlisle United".
```

## Fuentes

### carlisleunited-gb-carlisle-full-accounts-2024-25-ixbrl

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-21) desde la transcripción Clubes/Inglaterra/Carlisle United/carlisle-full-accounts-2024-25-ixbrl.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```
