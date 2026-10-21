# shrewsburytown-gb — evidencia de carga

Lo que antes iba como comentario en el data file del club, `data/<país>/shrewsburytown-gb-data.js` (la regla: `Admin/CONVENCIONES-DATOS.md`, "data/<país>/<club>-data.js NO LLEVA
COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y meta. Las notas de cada fila van en una tabla con su número de
fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
Shrewsbury Town: alta por tools/alta-club.mjs (2026-10-21) desde Clubes/Inglaterra/Shrewsbury Town/shrewsbury-full-accounts-2024-25-ixbrl.pdf. brandColor #144E9D
(procedencia en Admin/sourcing/Inglaterra/Shrewsbury Town.md; tools/cargar-lote.mjs).
```

```text
data/gb/shrewsburytown-gb-data.js — Shrewsbury Town Football Club Limited (Inglaterra).
ALTA POR SCRIPT (tools/alta-club.mjs, 2026-10-21), SIN EJERCICIOS CARGADOS TODAVÍA: las estructuras del data file
nacen vacías a propósito. Los rubros, los totales oficiales y el resto del fiscalYearMeta los agrega la etapa de carga.

Documento que originó el alta: Clubes/Inglaterra/Shrewsbury Town/shrewsbury-full-accounts-2024-25-ixbrl.pdf

De dónde salió cada campo (estado según alta-club.mjs: ok / pendiente):
  id                 ok        "shrewsburytown-gb" — slug de "Shrewsbury Town" + '-gb' (convención de clubId, Admin/CONVENCIONES.md Versión 129)
  name               ok        "Shrewsbury Town Football Club Limited" — la portada y lo más frecuente del .md coinciden (31 veces)
  displayName        ok        "Shrewsbury Town" — nombre de la carpeta del club en Clubes/
  country            ok        "GB" — carpeta de país "Inglaterra" (tabla PAISES)
  reportingCurrency  ok        "GBP" — moneda de curso legal de Inglaterra
  fiscalYearStart    ok        "07-01" — cierre del ejercicio: contenido del .md (40 de 40 fechas de fin de mes caen en el mes 6)
  sport              ok        "futbol" — la liga gb-leagueone del catálogo (data/leagues.js) es de futbol
  brandColor         pendiente (ausente) — la liga del club no está en tools/brand-color-reference/ (o el club no está en footylogos)
  anio               ok        2025 — nombre del archivo (misma regla que onboard.mjs --quien), confirmado por las fechas de cierre del .md
  cierre             ok        "2025-06-30" — año del ejercicio + mes de cierre (contenido del .md (40 de 40 fechas de fin de mes caen en el mes 6))
  reportType         ok        "official_balance_sheet" — el .md tiene un estado contable (resultados / balance) y el nombre del archivo no sugiere otro tipo
  perimetro          ok        "individual" — ajuste manual (Admin/registros/ajustes-manuales.jsonl, perimetro-senales 2026-10-21): perimetro-senales.mjs: 0 documento(s) con los dos estados votan 
  currency           ok        "GBP" — moneda de curso legal de Inglaterra (tabla PAISES de alta-club.mjs)
  fxRef              ok        "GBP@2025-06-30" — el documento no declara tipo de cambio; FX_CLOSE ya tiene GBP@2025-06-30 = 0.7299 (Cierre BCE al 30/6/2025, cruzando GBP/EUR (0,85550) × EUR/USD (1,17
  sourceId           ok        "shrewsburytown-gb-shrewsbury-full-accounts-2024-25-ixbrl" — clubId + nombre del archivo en slug
  liga               ok        "gb-leagueone" — roster cacheado de "2024–25 EFL League One" (tools/club-league-reference/gb.json), coincidencia exacta "Shrewsbury Town"

FISCAL YEAR META PROPUESTO para 2025 (NO registrado: un ejercicio con meta y
sin rubros se vería en el sitio como un año en cero, y "sin dato no es cero"):
  2025: {"reportType":"official_balance_sheet","currency":"GBP","fxRef":"GBP@2025-06-30","sourceId":"shrewsburytown-gb-shrewsbury-full-accounts-2024-25-ixbrl"}
```

## 2025

### Ingresos

```text
2025: cargado por tools/cargar.mjs (2026-10-21) desde Clubes/Inglaterra/Shrewsbury Town/shrewsbury-full-accounts-2024-25-ixbrl.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Inglaterra/Shrewsbury Town/shrewsbury-full-accounts-2024-25-ixbrl.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Ticket Sales | pág. 19, Jev 1 |
| 2 | Football League income | pág. 19, precedente |
| 3 | Transfer fees | pág. 19, Jev 0.99 |
| 4 | Sundry Income | pág. 19, Jev 1 |
| 5 | Academy income | pág. 19, Jev 0.97 |
| 6 | Television and internet portal income | pág. 19, Jev 1 |
| 7 | Contributions from support organisations | pág. 19, Jev 0.91 |
| 8 | Food and Beverage sales | pág. 19, Jev 0.98 |
| 9 | Other operating income | pág. 11, Jev 1 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Cost of sales | pág. 11, precedente |
| 2 | Administrative expenses | pág. 11, Jev 1 |

### Meta

```text
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-21): incluye = wages_squad. Estado de resultados por función (Cost of sales y Administrative expenses): los sueldos están adentro, la nota de staff costs no dice en qué renglón; se parten después con caja-deuda --personal (to-do 351). Mismo tratamiento que Remo y Ferroviária (incluye posible)
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-21): incluye = member_dues. El club vende membresías (shrewsburytown.com, junio 2025: adulto £25), pero el turnover (.md L467-474) no tiene línea propia: la cuota va dentro de «Sundry Income» u otra línea de otros ingresos
tools/cargar.mjs (2026-10-21). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
incluidoEn: ajuste manual `incluye`: el documento junta estas categorías con otra línea.
```

### Liga

```text
alta-club.mjs (2026-10-21): gb-leagueone, verificado contra roster cacheado de "2024–25 EFL League One" (tools/club-league-reference/gb.json), coincidencia exacta "Shrewsbury Town".
```

## Fuentes

### shrewsburytown-gb-shrewsbury-full-accounts-2024-25-ixbrl

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-21) desde la transcripción Clubes/Inglaterra/Shrewsbury Town/shrewsbury-full-accounts-2024-25-ixbrl.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```
