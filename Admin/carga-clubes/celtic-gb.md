# celtic-gb — evidencia de carga

Lo que antes iba como comentario en el data file del club, `data/<país>/celtic-gb-data.js` (la regla: `Admin/CONVENCIONES-DATOS.md`, "data/<país>/<club>-data.js NO LLEVA
COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y meta. Las notas de cada fila van en una tabla con su número de
fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
Celtic: alta por tools/alta-club.mjs (2026-10-20) desde Clubes/Escocia/Celtic/celtic-plc-group-accounts-2024-25.pdf. brandColor #018749
(procedencia en Admin/sourcing/Escocia/Celtic.md; tools/cargar-lote.mjs).
```

```text
data/gb/celtic-gb-data.js — Celtic plc (Inglaterra).
ALTA POR SCRIPT (tools/alta-club.mjs, 2026-10-20), SIN EJERCICIOS CARGADOS TODAVÍA: las estructuras del data file
nacen vacías a propósito. Los rubros, los totales oficiales y el resto del fiscalYearMeta los agrega la etapa de carga.

Documento que originó el alta: Clubes/Escocia/Celtic/celtic-plc-group-accounts-2024-25.pdf

De dónde salió cada campo (estado según alta-club.mjs: ok / pendiente):
  id                 ok        "celtic-gb" — slug de "Celtic" + '-gb' (convención de clubId, Admin/CONVENCIONES.md Versión 129)
  name               ok        "Celtic plc" — la portada y lo más frecuente del .md coinciden (11 veces)
  displayName        ok        "Celtic" — nombre de la carpeta del club en Clubes/
  country            ok        "GB" — carpeta de país "Escocia" (tabla PAISES)
  reportingCurrency  ok        "GBP" — moneda de curso legal de Escocia
  fiscalYearStart    ok        "07-01" — cierre del ejercicio: contenido del .md (132 de 134 fechas de fin de mes caen en el mes 6)
  sport              ok        "futbol" — el .md nombra el fútbol 122 veces y ningún otro deporte más que eso
  brandColor         pendiente (ausente) — la liga del club no está en tools/brand-color-reference/ (o el club no está en footylogos)
  anio               ok        2025 — nombre del archivo (misma regla que onboard.mjs --quien), confirmado por las fechas de cierre del .md
  cierre             ok        "2025-06-30" — año del ejercicio + mes de cierre (contenido del .md (132 de 134 fechas de fin de mes caen en el mes 6))
  reportType         ok        "official_balance_sheet" — el .md tiene un estado contable (resultados / balance) y el nombre del archivo no sugiere otro tipo
  perimetro          ok        "individual" — ajuste manual (Admin/registros/ajustes-manuales.jsonl, perimetro-senales 2026-10-19): perimetro-senales.mjs: 0 documento(s) con los dos estados votan 
  currency           ok        "GBP" — moneda de curso legal de Escocia (tabla PAISES de alta-club.mjs)
  fxRef              ok        "GBP@2025-06-30" — el documento no declara tipo de cambio; FX_CLOSE ya tiene GBP@2025-06-30 = 0.7299 (Cierre BCE al 30/6/2025, cruzando GBP/EUR (0,85550) × EUR/USD (1,17
  sourceId           ok        "celtic-gb-plc-group-accounts-2024-25" — clubId + nombre del archivo en slug
  liga               ok        "gb-scottishpremiership" — roster cacheado de "2024–25 Scottish Premiership" (tools/club-league-reference/gb.json), coincidencia exacta "Celtic"

FISCAL YEAR META PROPUESTO para 2025 (NO registrado: un ejercicio con meta y
sin rubros se vería en el sitio como un año en cero, y "sin dato no es cero"):
  2025: {"reportType":"official_balance_sheet","currency":"GBP","fxRef":"GBP@2025-06-30","sourceId":"celtic-gb-plc-group-accounts-2024-25"}
```

## 2025

### Ingresos

```text
2025: cargado por tools/cargar.mjs (2026-10-20) desde Clubes/Escocia/Celtic/celtic-plc-group-accounts-2024-25.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Escocia/Celtic/celtic-plc-group-accounts-2024-25.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Revenue | pág. 56, precedente |
| 2 | Profit on disposal of intangible assets | pág. 56, Claude 0.8 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Operating expenses (before intangible asset transactions and exceptional items) | pág. 56, precedente |
| 2 | Exceptional operating (expense)/income | pág. 56, Jev 0.99 |
| 3 | Amortisation of intangible assets | pág. 56, Jev 0.96 |

### Meta

```text
tools/cargar.mjs (2026-10-20). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee.
```

### Liga

```text
alta-club.mjs (2026-10-20): gb-scottishpremiership, verificado contra roster cacheado de "2024–25 Scottish Premiership" (tools/club-league-reference/gb.json), coincidencia exacta "Celtic".
```

## Fuentes

### celtic-gb-plc-group-accounts-2024-25

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-20) desde la transcripción Clubes/Escocia/Celtic/celtic-plc-group-accounts-2024-25.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

## Gestión

Peter Lawwell (Chairman, `data/gestiones/gb.js`): `desde` 2023-01-01 (anuncio de cambio de Board, RNS "Board Change", 2022-12), `hasta` 2025-12-31 (el fin sale de Wikipedia). Anotado por Onboarding 4 (2026-10-20); la fuente es la que dejó Finanzas 5.
