# exetercity-gb — evidencia de carga

Lo que antes iba como comentario en el data file del club, `data/<país>/exetercity-gb-data.js` (la regla: `Admin/CONVENCIONES-DATOS.md`, "data/<país>/<club>-data.js NO LLEVA
COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y meta. Las notas de cada fila van en una tabla con su número de
fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
Exeter City: alta por tools/alta-club.mjs (2026-10-21) desde Clubes/Inglaterra/Exeter City/exeter-group-accounts-2024-25-ixbrl.pdf. brandColor #EA1A45
(procedencia en Admin/sourcing/Inglaterra/Exeter City.md; tools/cargar-lote.mjs).
```

```text
data/gb/exetercity-gb-data.js — Exeter City A.F.C. Limited (Inglaterra).
ALTA POR SCRIPT (tools/alta-club.mjs, 2026-10-21), SIN EJERCICIOS CARGADOS TODAVÍA: las estructuras del data file
nacen vacías a propósito. Los rubros, los totales oficiales y el resto del fiscalYearMeta los agrega la etapa de carga.

Documento que originó el alta: Clubes/Inglaterra/Exeter City/exeter-group-accounts-2024-25-ixbrl.pdf

De dónde salió cada campo (estado según alta-club.mjs: ok / pendiente):
  id                 ok        "exetercity-gb" — slug de "Exeter City" + '-gb' (convención de clubId, Admin/CONVENCIONES.md Versión 129)
  name               ok        "Exeter City A.F.C. Limited" — la portada y lo más frecuente del .md coinciden (50 veces)
  displayName        ok        "Exeter City" — nombre de la carpeta del club en Clubes/
  country            ok        "GB" — carpeta de país "Inglaterra" (tabla PAISES)
  reportingCurrency  ok        "GBP" — moneda de curso legal de Inglaterra
  fiscalYearStart    ok        "07-01" — cierre del ejercicio: contenido del .md (71 de 71 fechas de fin de mes caen en el mes 6)
  sport              ok        "futbol" — la liga gb-leagueone del catálogo (data/leagues.js) es de futbol
  brandColor         pendiente (ausente) — la liga del club no está en tools/brand-color-reference/ (o el club no está en footylogos)
  anio               ok        2025 — nombre del archivo (misma regla que onboard.mjs --quien), confirmado por las fechas de cierre del .md
  cierre             ok        "2025-06-30" — año del ejercicio + mes de cierre (contenido del .md (71 de 71 fechas de fin de mes caen en el mes 6))
  reportType         ok        "official_balance_sheet" — el .md tiene un estado contable (resultados / balance) y el nombre del archivo no sugiere otro tipo
  perimetro          ok        "consolidado" — ajuste manual (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-21): Regla de perímetro 1 y 3: en 2024-25 la madre (el club) usa la exención s40
  currency           ok        "GBP" — moneda de curso legal de Inglaterra (tabla PAISES de alta-club.mjs)
  fxRef              ok        "GBP@2025-06-30" — el documento no declara tipo de cambio; FX_CLOSE ya tiene GBP@2025-06-30 = 0.7299 (Cierre BCE al 30/6/2025, cruzando GBP/EUR (0,85550) × EUR/USD (1,17
  sourceId           ok        "exetercity-gb-exeter-group-accounts-2024-25-ixbrl" — clubId + nombre del archivo en slug
  liga               ok        "gb-leagueone" — roster cacheado de "2024–25 EFL League One" (tools/club-league-reference/gb.json), coincidencia exacta "Exeter City"

FISCAL YEAR META PROPUESTO para 2025 (NO registrado: un ejercicio con meta y
sin rubros se vería en el sitio como un año en cero, y "sin dato no es cero"):
  2025: {"reportType":"official_balance_sheet","currency":"GBP","fxRef":"GBP@2025-06-30","sourceId":"exetercity-gb-exeter-group-accounts-2024-25-ixbrl"}
```

## 2025

### Ingresos

```text
2025: cargado por tools/cargar.mjs (2026-10-21) desde Clubes/Inglaterra/Exeter City/exeter-group-accounts-2024-25-ixbrl.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Inglaterra/Exeter City/exeter-group-accounts-2024-25-ixbrl.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Gates | pág. 31, Jev 1 |
| 2 | Season ticket sales | pág. 31, Jev 1 |
| 3 | Commercial activities | pág. 31, Jev 1 |
| 4 | Football League | pág. 31, precedente |
| 5 | Television income | pág. 31, Jev 1 |
| 6 | Food and drink sales | pág. 31, Jev 0.99 |
| 7 | Grants and donations | pág. 32, Jev 1 |
| 8 | Insurance claims receivable | pág. 32, Jev 1 |
| 9 | Transfer revenue | pág. 15, Jev 0.99 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Cost of sales | pág. 15, precedente |
| 2 | Administrative expenses | pág. 15, Jev 1 |

### Meta

```text
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-21): perimetro = consolidado. Regla de perímetro 1 y 3: en 2024-25 la madre (el club) usa la exención s408 (.md L574) y solo publica el estado del grupo; 2023-24 son full accounts individuales; corrige el «individual» de perimetro-senales.mjs para este año
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-21): incluye = wages_squad. Estado de resultados por función (Cost of sales y Administrative expenses): los sueldos están adentro, la nota de staff costs no dice en qué renglón; se parten después con caja-deuda --personal (to-do 351). Mismo tratamiento que Remo y Ferroviária (incluye posible)
tools/cargar.mjs (2026-10-21). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
incluidoEn: ajuste manual `incluye`: el documento junta estas categorías con otra línea.
```

### Liga

```text
alta-club.mjs (2026-10-21): gb-leagueone, verificado contra roster cacheado de "2024–25 EFL League One" (tools/club-league-reference/gb.json), coincidencia exacta "Exeter City".
```

## Fuentes

### exetercity-gb-exeter-group-accounts-2024-25-ixbrl

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-21) desde la transcripción Clubes/Inglaterra/Exeter City/exeter-group-accounts-2024-25-ixbrl.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.
```
