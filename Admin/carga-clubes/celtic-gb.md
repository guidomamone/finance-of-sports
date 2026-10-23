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
2025: cargado por tools/cargar.mjs (2026-10-23) desde Clubes/Escocia/Celtic/celtic-plc-group-accounts-2024-25.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
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
tools/caja-deuda.mjs --personal (2026-10-23): staffCost 74.763 (compuerta: documento anterior): Jev (confianza 0.4): celtic-plc-group-accounts-2024-25.md L4992 "Staff costs (Note"
```

```text
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, caja-deuda --personal 2026-10-23): incluye = wages_squad. caja-deuda.mjs --personal --partir (TODO 351): el costo de personal (74.763, celtic-plc-group-accounts-2024-25.md L4992) es mayor que cada fila global de gasto; el documento reparte los sueldos entre varias funciones y no dice cuánto va en cada una
tools/cargar.mjs (2026-10-23). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
incluidoEn: ajuste manual `incluye`: el documento junta estas categorías con otra línea.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee.
```

```text
tools/dentro-de-otro.mjs (2026-10-23): posiblemente dentro de otro rubro, por precedente del club (la fila tiene plata en sus balances desglosados 2021, 2022, 2023, 2024)
```

### Liga

```text
alta-club.mjs (2026-10-20): gb-scottishpremiership, verificado contra roster cacheado de "2024–25 Scottish Premiership" (tools/club-league-reference/gb.json), coincidencia exacta "Celtic".
```

## 2024

### Ingresos

```text
2024: cargado por tools/cargar.mjs (2026-10-23) desde Clubes/Escocia/Celtic/celtic-group-accounts-2023-24.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Escocia/Celtic/celtic-group-accounts-2023-24.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Ticketing | pág. 72, Jev 1 |
| 2 | Commercial / sponsorship | pág. 72, Jev 1 |
| 3 | Retail outlets and e-commerce | pág. 72, Jev 1 |
| 4 | Media rights | pág. 72, Jev 1 |
| 5 | Stadium operations | pág. 72, precedente |
| 6 | Other | pág. 72, Jev 0.98 |
| 7 | Profit on disposal of Intangible assets | pág. 54, precedente |
| 8 | Other income | pág. 54, Jev 1 |
| 9 | Exceptional operating Income/(expenses) | pág. 54, Jev 0.99 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Operating expenses (before intangible asset transactions and exceptional items) | pág. 54, precedente |
| 2 | Amortisation of intangible assets | pág. 54, precedente |

### Meta

```text
tools/caja-deuda.mjs --personal (2026-10-23): staffCost 65.595 (compuerta: documento siguiente): Jev (confianza 0.68): celtic-group-accounts-2023-24.md L3102 "Staff costs (Note 10)"
```

```text
2024: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, caja-deuda --personal 2026-10-23): incluye = wages_squad. caja-deuda.mjs --personal --partir (TODO 351): el costo de personal (65.595, celtic-group-accounts-2023-24.md L3102) es mayor que cada fila global de gasto; el documento reparte los sueldos entre varias funciones y no dice cuánto va en cada una
tools/cargar.mjs (2026-10-23). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
incluidoEn: ajuste manual `incluye`: el documento junta estas categorías con otra línea.
```

## 2023

### Ingresos

```text
2023: cargado por tools/cargar.mjs (2026-10-23) desde Clubes/Escocia/Celtic/celtic-group-accounts-2022-23.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Escocia/Celtic/celtic-group-accounts-2022-23.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Ticketing | pág. 73, Jev 1 |
| 2 | Commercial / sponsorship | pág. 73, Jev 1 |
| 3 | Retail outlets and E-commerce | pág. 73, Jev 1 |
| 4 | Media rights | pág. 73, Jev 1 |
| 5 | Stadium operations | pág. 73, precedente |
| 6 | Other | pág. 73, Jev 0.98 |
| 7 | Profit on disposal of intangible assets | pág. 55, precedente |
| 8 | Other income | pág. 55, Jev 1 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Operating expenses (before intangible asset transactions and exceptional items) | pág. 55, precedente |
| 2 | Exceptional operating expenses | pág. 55, Jev 1 |
| 3 | Amortisation of intangible assets | pág. 55, precedente |

### Meta

```text
tools/caja-deuda.mjs --personal (2026-10-23): staffCost 60.844 (compuerta: documento siguiente): Jev (confianza 0.67): celtic-group-accounts-2022-23.md L3440 "Staff costs (Note 11)"
```

```text
2023: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, caja-deuda --personal 2026-10-23): incluye = wages_squad. caja-deuda.mjs --personal --partir (TODO 351): el costo de personal (60.844, celtic-group-accounts-2022-23.md L3440) es mayor que cada fila global de gasto; el documento reparte los sueldos entre varias funciones y no dice cuánto va en cada una
tools/cargar.mjs (2026-10-23). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
incluidoEn: ajuste manual `incluye`: el documento junta estas categorías con otra línea.
```

## 2022

### Ingresos

```text
2022: cargado por tools/cargar.mjs (2026-10-23) desde Clubes/Escocia/Celtic/celtic-group-accounts-2021-22.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Escocia/Celtic/celtic-group-accounts-2021-22.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Ticketing | pág. 71, Jev 1 |
| 2 | Merchandise vouchers for season ticket holders | pág. 71, precedente |
| 3 | Commercial / sponsorship | pág. 71, Jev 1 |
| 4 | Retail outlets and E-commerce | pág. 71, Jev 1 |
| 5 | Media rights | pág. 71, Jev 1 |
| 6 | Stadium operations | pág. 71, precedente |
| 7 | Other | pág. 71, Jev 0.98 |
| 8 | Profit on disposal of intangible assets | pág. 53, precedente |
| 9 | Other income | pág. 53, Jev 1 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Operating expenses (before intangible asset transactions and exceptional items) | pág. 53, precedente |
| 2 | Impairment of intangible assets and other prepaid costs | pág. 72, precedente |
| 3 | Reversal of prior period impairment charges | pág. 72, precedente |
| 4 | Settlement agreements on contract termination | pág. 72, precedente |
| 5 | Amortisation of intangible assets | pág. 53, precedente |

### Meta

```text
tools/caja-deuda.mjs --personal (2026-10-23): staffCost 58.883 (compuerta: documento siguiente): Jev (confianza 0.89): celtic-group-accounts-2021-22.md L3464 "Staff costs (Note 9)"
```

```text
2022: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, caja-deuda --personal 2026-10-23): incluye = wages_squad. caja-deuda.mjs --personal --partir (TODO 351): el costo de personal (58.883, celtic-group-accounts-2021-22.md L3464) es mayor que cada fila global de gasto; el documento reparte los sueldos entre varias funciones y no dice cuánto va en cada una
tools/cargar.mjs (2026-10-23). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
incluidoEn: ajuste manual `incluye`: el documento junta estas categorías con otra línea.
```

## 2021

### Ingresos

```text
2021: cargado por tools/cargar.mjs (2026-10-23) desde Clubes/Escocia/Celtic/celtic-group-accounts-2020-21.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Escocia/Celtic/celtic-group-accounts-2020-21.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Ticketing | pág. 79, Jev 1 |
| 2 | Merchandise vouchers for season ticket holders | pág. 79, precedente |
| 3 | Commercial / sponsorship | pág. 79, Jev 1 |
| 4 | Retail outlets and E-commerce | pág. 79, Jev 1 |
| 5 | Media rights | pág. 79, Jev 1 |
| 6 | Stadium operations | pág. 79, precedente |
| 7 | Other | pág. 79, Jev 0.98 |
| 8 | Profit on disposal of intangible assets | pág. 60, precedente |
| 9 | Other income | pág. 60, Jev 1 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Operating expenses (before intangible asset transactions and exceptional items) | pág. 60, precedente |
| 2 | Exceptional operating expenses | pág. 60, Jev 1 |
| 3 | Amortisation of intangible assets | pág. 60, precedente |

### Meta

```text
tools/caja-deuda.mjs --personal (2026-10-23): staffCost 51.71 (compuerta: documento siguiente): Jev (confianza 0.3): celtic-group-accounts-2020-21.md L4005 "Staff costs (Note"
```

```text
2021: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-20): fila = -1056. El estado quedó transcripto como texto y el bloque corta en Finance income (L2987): falta Finance expense (1,056), impreso en L2989
2021: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-20): resultado-final = -12601. Resultado del ejercicio impreso (12,601) en L2999, fuera del bloque elegido (texto plano); verificar deduce el impuesto por diferencia (1,109 impreso en L2992)
2021: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, caja-deuda --personal 2026-10-23): incluye = wages_squad. caja-deuda.mjs --personal --partir (TODO 351): el costo de personal (51.71, celtic-group-accounts-2020-21.md L4005) es mayor que cada fila global de gasto; el documento reparte los sueldos entre varias funciones y no dice cuánto va en cada una
tools/cargar.mjs (2026-10-23). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
incluidoEn: ajuste manual `incluye`: el documento junta estas categorías con otra línea.
```

## Fuentes

### celtic-gb-plc-group-accounts-2024-25

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-20) desde la transcripción Clubes/Escocia/Celtic/celtic-plc-group-accounts-2024-25.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### celtic-gb-group-accounts-2020-21

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-20) desde la transcripción Clubes/Escocia/Celtic/celtic-group-accounts-2020-21.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### celtic-gb-group-accounts-2021-22

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-20) desde la transcripción Clubes/Escocia/Celtic/celtic-group-accounts-2021-22.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### celtic-gb-group-accounts-2022-23

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-20) desde la transcripción Clubes/Escocia/Celtic/celtic-group-accounts-2022-23.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### celtic-gb-group-accounts-2023-24

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-20) desde la transcripción Clubes/Escocia/Celtic/celtic-group-accounts-2023-24.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

## Gestión

Peter Lawwell (Chairman, `data/gestiones/gb.js`): `desde` 2023-01-01 (anuncio de cambio de Board, RNS "Board Change", 2022-12), `hasta` 2025-12-31 (el fin sale de Wikipedia). Anotado por Onboarding 4 (2026-10-20); la fuente es la que dejó Finanzas 5.
