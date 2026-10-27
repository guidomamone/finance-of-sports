# alianzafc-co — evidencia de carga

Lo que antes iba como comentario en el data file del club, `data/<país>/alianzafc-co-data.js` (la regla: `Admin/CONVENCIONES-DATOS.md`, "data/<país>/<club>-data.js NO LLEVA
COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y meta. Las notas de cada fila van en una tabla con su número de
fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
Alianza FC: alta por tools/alta-club.mjs (2026-10-20) desde Clubes/Colombia/Alianza FC/estados-financieros-2023.pdf. brandColor:null a propósito
(procedencia en Admin/sourcing/Colombia/Alianza FC.md; tools/cargar-lote.mjs).
```

```text
data/co/alianzafc-co-data.js — Alianza FC S.A. (Colombia).
ALTA POR SCRIPT (tools/alta-club.mjs, 2026-10-20), SIN EJERCICIOS CARGADOS TODAVÍA: las estructuras del data file
nacen vacías a propósito. Los rubros, los totales oficiales y el resto del fiscalYearMeta los agrega la etapa de carga.

Documento que originó el alta: Clubes/Colombia/Alianza FC/estados-financieros-2023.pdf

De dónde salió cada campo (estado según alta-club.mjs: ok / pendiente):
  id                 ok        "alianzafc-co" — slug de "Alianza FC" + '-co' (convención de clubId, Admin/CONVENCIONES.md Versión 129)
  name               ok        "Alianza FC S.A." — ajuste manual (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-09): Revisión del alta (Claude, 2026-10-09): razón social vigente (NIT 800.115.61
  displayName        ok        "Alianza FC" — nombre de la carpeta del club en Clubes/
  country            ok        "CO" — carpeta de país "Colombia" (tabla PAISES)
  reportingCurrency  ok        "COP" — moneda de curso legal de Colombia
  fiscalYearStart    ok        "01-01" — cierre del ejercicio: contenido del .md (4 de 4 fechas de fin de mes caen en el mes 12)
  sport              ok        "futbol" — el .md nombra el fútbol 9 veces y ningún otro deporte más que eso
  brandColor         pendiente (ausente) — la liga del club no está en tools/brand-color-reference/ (o el club no está en footylogos)
  anio               ok        2023 — nombre del archivo (misma regla que onboard.mjs --quien), confirmado por las fechas de cierre del .md
  cierre             ok        "2023-12-31" — año del ejercicio + mes de cierre (contenido del .md (4 de 4 fechas de fin de mes caen en el mes 12))
  reportType         ok        "official_balance_sheet" — el .md tiene un estado contable (resultados / balance) y el nombre del archivo no sugiere otro tipo
  perimetro          ok        "individual" — el .md no presenta estados consolidados (0 menciones de "consolidado")
  currency           ok        "COP" — moneda de curso legal de Colombia (tabla PAISES de alta-club.mjs)
  fxRef              ok        "COP@2023-12-31" — el documento no declara tipo de cambio; FX_CLOSE ya tiene COP@2023-12-31 = 3822.05 (TRM oficial (Banco de la República / Superfinanciera de Colombia) 
  sourceId           ok        "alianzafc-co-estados-financieros-2023" — clubId + nombre del archivo en slug
  liga               ok        "co-primeraA" — roster cacheado de "2023 Liga DIMAYOR" (tools/club-league-reference/co.json), coincidencia única por palabras "Alianza Petrolera" = "Alianza FC"

FISCAL YEAR META PROPUESTO para 2023 (NO registrado: un ejercicio con meta y
sin rubros se vería en el sitio como un año en cero, y "sin dato no es cero"):
  2023: {"reportType":"official_balance_sheet","currency":"COP","fxRef":"COP@2023-12-31","sourceId":"alianzafc-co-estados-financieros-2023"}
```

## 2025

### Ingresos

```text
2025: cargado por tools/cargar.mjs (2026-10-26) desde Clubes/Colombia/Alianza FC/siis-estado-2025.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Colombia/Alianza FC/siis-estado-2025.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Ingresos de actividades ordinarias | pág. 1, Jev 0.97 |
| 2 | Otros ingresos | pág. 1, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Gastos de ventas | pág. 1, precedente |
| 2 | Gastos de administración | pág. 1, Jev 1 |
| 3 | Otros gastos | pág. 1, Jev 1 |

### Meta

```text
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-26): filas-a-mano. Claude 2026-10-26 (tokens de sesión): ubicación y filas armadas a mano desde el .md con tools/armar-a-mano.mjs
tools/cargar.mjs (2026-10-26). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"), con su tipo; la página marca «s/d» en las categorías que esa línea esconde y explica el caso en «Notas sobre este club».
```

```text
tools/dentro-de-otro.mjs (2026-10-26): posiblemente dentro de otro rubro, por precedente del club (la fila tiene plata en sus balances desglosados 2019, 2023)
```

```text
tools/caja-deuda.mjs (2026-10-27): grossDebt escalón S (compuerta: balance de SIIS cuadra): balance de SIIS (siis-estado-2025.json, miles de COP): otros pasivos financieros corrientes 775586 + no corrientes vacío; cash escalón S (compuerta: balance de SIIS cuadra): balance de SIIS (siis-estado-2025.json, miles de COP): efectivo y equivalentes = 103051
```

## 2024

### Ingresos

```text
2024: cargado por tools/cargar.mjs (2026-10-26) desde Clubes/Colombia/Alianza FC/siis-estado-2024.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Colombia/Alianza FC/siis-estado-2024.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Ingresos de actividades ordinarias | pág. 1, Jev 0.97 |
| 2 | Otros ingresos | pág. 1, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Gastos de ventas | pág. 1, precedente |
| 2 | Gastos de administración | pág. 1, Jev 1 |
| 3 | Otros gastos | pág. 1, Jev 1 |

### Meta

```text
2024: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-26): filas-a-mano. Claude 2026-10-26 (tokens de sesión): ubicación y filas armadas a mano desde el .md con tools/armar-a-mano.mjs
tools/cargar.mjs (2026-10-26). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"), con su tipo; la página marca «s/d» en las categorías que esa línea esconde y explica el caso en «Notas sobre este club».
```

```text
tools/dentro-de-otro.mjs (2026-10-26): posiblemente dentro de otro rubro, por precedente del club (la fila tiene plata en sus balances desglosados 2019, 2023)
```

```text
tools/caja-deuda.mjs (2026-10-27): grossDebt escalón S (compuerta: balance de SIIS cuadra y la comparativa del año siguiente de SIIS coincide): balance de SIIS (siis-estado-2024.json, miles de COP): otros pasivos financieros corrientes 152677 + no corrientes vacío
```

## 2023

### Ingresos

```text
2023: cargado por tools/cargar.mjs (2026-10-26) desde Clubes/Colombia/Alianza FC/estados-financieros-2023.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Colombia/Alianza FC/estados-financieros-2023.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Otros Ingresos | pág. 2, Claude 0.8 |
| 2 | Taquilla - venta de boletería | pág. 14, precedente |
| 3 | Venta derechos deportivos | pág. 14, precedente |
| 4 | Préstamo derechos deportivos | pág. 14, precedente |
| 5 | Publicidad y patrocinios | pág. 14, precedente |
| 6 | DIMAYOR (derechos de televisión) | pág. 14, precedente |
| 7 | Federación Colombiana de Fútbol | pág. 14, precedente |
| 8 | Convenios | pág. 14, precedente |
| 9 | Donaciones | pág. 14, precedente |
| 10 | Venta artículos deportivos | pág. 14, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Costos de Venta | pág. 2, Jev 0.99 |
| 2 | Gastos de personal | pág. 15, precedente |
| 3 | Honorarios | pág. 15, Jev 0.97 |
| 4 | Impuestos | pág. 15, Jev 1 |
| 5 | Arriendos | pág. 15, precedente |
| 6 | seguros | pág. 15, Jev 0.95 |
| 7 | Servicios | pág. 15, Jev 0.9 |
| 8 | Gastos Legales | pág. 15, Jev 1 |
| 9 | Mantenimiento y reparaciones | pág. 15, Jev 0.98 |
| 10 | Diversos | pág. 15, precedente |
| 11 | Depreciaciones | pág. 15, Jev 1 |
| 12 | Honorarios | pág. 15, Jev 0.97 |
| 13 | Servicios | pág. 15, Jev 0.9 |
| 14 | Gastos de Viaje | pág. 15, precedente |
| 15 | Amortizaciones derechos deportivos | pág. 15, Jev 1 |
| 16 | Otro Gastos de actividades ordinarias | pág. 2, Jev 0.97 |
| 17 | Devoluciones en ventas | pág. 14, precedente |
| 18 | Gastos de personal (deportivos) | pág. 15, precedente |

### Meta

```text
2023: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-20): fila = 540112250. Nota 14 (ingresos de actividades ordinarias, .md L666-686): la extracción trajo el total 14.174.134.648 sin abrir; se abre en sus renglones (suman el total: 14.687.327.325 - devoluciones 513.192.677)
2023: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-20): categoria = matchday_competition. categoría del renglón de la nota 14
2023: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-20): fila = 4136673785. Nota 14 (ingresos de actividades ordinarias, .md L666-686): la extracción trajo el total 14.174.134.648 sin abrir; se abre en sus renglones (suman el total: 14.687.327.325 - devoluciones 513.192.677)
2023: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-20): categoria = player_sales. categoría del renglón de la nota 14
2023: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-20): fila = 365756449. Nota 14 (ingresos de actividades ordinarias, .md L666-686): la extracción trajo el total 14.174.134.648 sin abrir; se abre en sus renglones (suman el total: 14.687.327.325 - devoluciones 513.192.677)
2023: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-20): categoria = player_sales. categoría del renglón de la nota 14
2023: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-20): fila = 1176949586. Nota 14 (ingresos de actividades ordinarias, .md L666-686): la extracción trajo el total 14.174.134.648 sin abrir; se abre en sus renglones (suman el total: 14.687.327.325 - devoluciones 513.192.677)
2023: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-20): categoria = sponsorship_commercial. categoría del renglón de la nota 14
2023: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-20): fila = 7966544302. Nota 14 (ingresos de actividades ordinarias, .md L666-686): la extracción trajo el total 14.174.134.648 sin abrir; se abre en sus renglones (suman el total: 14.687.327.325 - devoluciones 513.192.677)
2023: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-20): categoria = broadcasting. categoría del renglón de la nota 14
2023: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-20): fila = 462875000. Nota 14 (ingresos de actividades ordinarias, .md L666-686): la extracción trajo el total 14.174.134.648 sin abrir; se abre en sus renglones (suman el total: 14.687.327.325 - devoluciones 513.192.677)
2023: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-20): categoria = competition_bonus. categoría del renglón de la nota 14
2023: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-20): fila = 16000000. Nota 14 (ingresos de actividades ordinarias, .md L666-686): la extracción trajo el total 14.174.134.648 sin abrir; se abre en sus renglones (suman el total: 14.687.327.325 - devoluciones 513.192.677)
2023: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-20): categoria = other_income. categoría del renglón de la nota 14
2023: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-20): fila = 20000000. Nota 14 (ingresos de actividades ordinarias, .md L666-686): la extracción trajo el total 14.174.134.648 sin abrir; se abre en sus renglones (suman el total: 14.687.327.325 - devoluciones 513.192.677)
2023: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-20): categoria = other_income. categoría del renglón de la nota 14
2023: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-20): fila = 2415953. Nota 14 (ingresos de actividades ordinarias, .md L666-686): la extracción trajo el total 14.174.134.648 sin abrir; se abre en sus renglones (suman el total: 14.687.327.325 - devoluciones 513.192.677)
2023: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-20): categoria = sponsorship_commercial. categoría del renglón de la nota 14
2023: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-20): fila = 513192677. Nota 14: devolución en ventas, deduce del ingreso (las filas suman el total 14.174.134.648 solo restándola). Se carga como fila de gasto con categoría de ingreso (other_income), que la ubica como ingreso negativo
2023: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-20): categoria = other_expenses. Devoluciones en ventas (nota 14, L679): deducción del ingreso que la tool no puede cargar como ingreso negativo con ajuste fila; se carga como gasto, ingresos quedan brutos de devoluciones (el total impreso es neto: 14.321.188.009)
2023: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-20): fila = 3513100819. Gastos Deportivos: nómina del plantel y cuerpo técnico (L707-708); el rótulo de administración (L697) queda aparte
2023: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-20): categoria = wages_squad. nómina de Gastos Deportivos
2023: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-20): cero-real = Estadio. sin ingreso por uso del estadio: la taquilla va aparte y el arrendamiento es de la Alcaldía (L241)
tools/cargar.mjs (2026-10-26). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

```text
tools/caja-deuda.mjs (2026-10-27): grossDebt escalón S (compuerta: balance de SIIS cuadra y la comparativa del año siguiente de SIIS coincide): balance de SIIS (siis-estado-2023.json, miles de COP): otros pasivos financieros corrientes 23049 + no corrientes 558000; cash escalón S (compuerta: balance de SIIS cuadra y la comparativa del año siguiente de SIIS coincide): balance de SIIS (siis-estado-2023.json, miles de COP): efectivo y equivalentes = 765803
```

### Liga

```text
alta-club.mjs (2026-10-20): co-primeraA, verificado contra roster cacheado de "2023 Liga DIMAYOR" (tools/club-league-reference/co.json), coincidencia única por palabras "Alianza Petrolera" = "Alianza FC".
```

## 2022

### Ingresos

```text
2022: cargado por tools/cargar.mjs (2026-10-26) desde Clubes/Colombia/Alianza FC/siis-estado-2022.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Colombia/Alianza FC/siis-estado-2022.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Ingresos de actividades ordinarias | pág. 1, Jev 0.97 |
| 2 | Otros ingresos | pág. 1, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Costo de ventas | pág. 1, Claude 0.88 |
| 2 | Gastos de ventas | pág. 1, precedente |
| 3 | Gastos de administración | pág. 1, Jev 1 |
| 4 | Otros gastos | pág. 1, Jev 1 |
| 5 | Ganancia (pérdida) procedente de operaciones discontinuadas | pág. 1, Jev 1 |

### Meta

```text
2022: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-26): filas-a-mano. Claude 2026-10-26 (tokens de sesión): ubicación y filas armadas a mano desde el .md con tools/armar-a-mano.mjs
tools/cargar.mjs (2026-10-26). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"), con su tipo; la página marca «s/d» en las categorías que esa línea esconde y explica el caso en «Notas sobre este club».
```

```text
tools/dentro-de-otro.mjs (2026-10-26): posiblemente dentro de otro rubro, por precedente del club (la fila tiene plata en sus balances desglosados 2019, 2023)
```

```text
tools/caja-deuda.mjs (2026-10-27): cash escalón S (compuerta: balance de SIIS cuadra y la comparativa del año siguiente de SIIS coincide): balance de SIIS (siis-estado-2022.json, miles de COP): efectivo y equivalentes = 392820; grossDebt escalón 1 (compuerta: documento anterior): "Otros pasivos financieros corrientes" pág. 1
```

## 2021

### Ingresos

```text
2021: cargado por tools/cargar.mjs (2026-10-26) desde Clubes/Colombia/Alianza FC/siis-estado-2021.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Colombia/Alianza FC/siis-estado-2021.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Ingresos de actividades ordinarias | pág. 1, Jev 0.97 |
| 2 | Otros ingresos | pág. 1, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Costo de ventas | pág. 1, Claude 0.88 |
| 2 | Gastos de ventas | pág. 1, precedente |
| 3 | Gastos de administración | pág. 1, Jev 1 |
| 4 | Otros gastos | pág. 1, Jev 1 |

### Meta

```text
2021: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-26): filas-a-mano. Claude 2026-10-26 (tokens de sesión): ubicación y filas armadas a mano desde el .md con tools/armar-a-mano.mjs
tools/cargar.mjs (2026-10-26). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"), con su tipo; la página marca «s/d» en las categorías que esa línea esconde y explica el caso en «Notas sobre este club».
```

```text
tools/dentro-de-otro.mjs (2026-10-26): posiblemente dentro de otro rubro, por precedente del club (la fila tiene plata en sus balances desglosados 2019, 2023)
```

```text
tools/caja-deuda.mjs (2026-10-27): grossDebt escalón S (compuerta: balance de SIIS cuadra y la comparativa del año siguiente de SIIS coincide): balance de SIIS (siis-estado-2021.json, miles de COP): otros pasivos financieros corrientes 1186621 + no corrientes vacío; cash escalón S (compuerta: balance de SIIS cuadra y la comparativa del año siguiente de SIIS coincide): balance de SIIS (siis-estado-2021.json, miles de COP): efectivo y equivalentes = 61866
```

## 2020

### Ingresos

```text
2020: cargado por tools/cargar.mjs (2026-10-26) desde Clubes/Colombia/Alianza FC/siis-estado-2020.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Colombia/Alianza FC/siis-estado-2020.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Ingresos de actividades ordinarias | pág. 1, Jev 0.97 |
| 2 | Otros ingresos | pág. 1, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Costo de ventas | pág. 1, Claude 0.88 |
| 2 | Gastos de ventas | pág. 1, precedente |
| 3 | Gastos de administración | pág. 1, Jev 1 |
| 4 | Otros gastos | pág. 1, Jev 1 |

### Meta

```text
2020: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-26): filas-a-mano. Claude 2026-10-26 (tokens de sesión): ubicación y filas armadas a mano desde el .md con tools/armar-a-mano.mjs
tools/cargar.mjs (2026-10-26). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"), con su tipo; la página marca «s/d» en las categorías que esa línea esconde y explica el caso en «Notas sobre este club».
```

```text
tools/dentro-de-otro.mjs (2026-10-26): posiblemente dentro de otro rubro, por precedente del club (la fila tiene plata en sus balances desglosados 2019, 2023)
```

```text
tools/caja-deuda.mjs (2026-10-27): cash escalón S (compuerta: balance de SIIS cuadra y la comparativa del año siguiente de SIIS coincide): balance de SIIS (siis-estado-2020.json, miles de COP): efectivo y equivalentes = 187713
```

## 2019

### Ingresos

```text
2019: cargado por tools/cargar.mjs (2026-10-26) desde Clubes/Colombia/Alianza FC/siis-estado-2019.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Colombia/Alianza FC/siis-estado-2019.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Taquilla | pág. 1, Jev 1 |
| 2 | Escuelas de Formación Deportiva | pág. 1, Jev 0.94 |
| 3 | Publicidad | pág. 1, Jev 1 |
| 4 | Dimayor | pág. 1, precedente |
| 5 | Venta Derechos Deportivos (Ingresos de actividades ordinarias) | pág. 1, precedente |
| 6 | Prestamos Derechos Deportivos | pág. 1, precedente |
| 7 | Venta artículos deportivos | pág. 1, Jev 1 |
| 8 | Arrendamiento | pág. 1, Claude 0.85 |
| 9 | Recuperaciones | pág. 1, Jev 1 |
| 10 | Federación Colombiana de Futbol (Otros ingresos) | pág. 1, precedente |
| 11 | Financieros | pág. 1, Jev 0.98 |
| 12 | Subvenciones | pág. 1, Jev 0.94 |
| 13 | Multas y Recargos | pág. 1, Jev 1 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Costos (De Boletería) (Costo de ventas) | pág. 1, ? 0.6 |
| 2 | Costos (Artículos Deportivos) (Costo de ventas) | pág. 1, Jev 0.99 |
| 3 | Gastos de personal (Gastos de ventas) | pág. 1, precedente |
| 4 | Amortización de Derechos Deportivos | pág. 1, Jev 1 |
| 5 | Gastos de personal (Gastos de administración) | pág. 1, precedente |
| 6 | Honorarios | pág. 1, precedente |
| 7 | Impuestos | pág. 1, precedente |
| 8 | Arrendamientos | pág. 1, Jev 1 |
| 9 | Seguros | pág. 1, precedente |
| 10 | Servicios | pág. 1, precedente |
| 11 | Gastos Legales | pág. 1, precedente |
| 12 | Mantenimiento y reparaciones | pág. 1, precedente |
| 13 | Gastos de viaje | pág. 1, precedente |
| 14 | Diversos (Gastos de administración) | pág. 1, precedente |
| 15 | Depreciaciones | pág. 1, precedente |
| 16 | Otros gastos | pág. 1, Jev 1 |

### Meta

```text
2019: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-26): filas-a-mano. Claude 2026-10-26 (tokens de sesión): ubicación y filas armadas a mano desde el .md con tools/armar-a-mano.mjs
tools/cargar.mjs (2026-10-26). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

```text
tools/caja-deuda.mjs (2026-10-27): grossDebt escalón S (compuerta: balance de SIIS cuadra y la comparativa del año siguiente de SIIS coincide): balance de SIIS (siis-estado-2019.json, miles de COP): otros pasivos financieros corrientes 1514649 + no corrientes vacío; cash escalón S (compuerta: balance de SIIS cuadra y la comparativa del año siguiente de SIIS coincide): balance de SIIS (siis-estado-2019.json, miles de COP): efectivo y equivalentes = 35487
```

## 2018

### Ingresos

```text
2018: cargado por tools/cargar.mjs (2026-10-26) desde Clubes/Colombia/Alianza FC/siis-estado-2018.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Colombia/Alianza FC/siis-estado-2018.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Ingresos de actividades ordinarias | pág. 1, Jev 0.97 |
| 2 | Otros ingresos | pág. 1, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Costo de ventas | pág. 1, Claude 0.88 |
| 2 | Gastos de administración | pág. 1, Jev 1 |

### Meta

```text
2018: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-26): filas-a-mano. Claude 2026-10-26 (tokens de sesión): ubicación y filas armadas a mano desde el .md con tools/armar-a-mano.mjs
tools/cargar.mjs (2026-10-26). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"), con su tipo; la página marca «s/d» en las categorías que esa línea esconde y explica el caso en «Notas sobre este club».
```

```text
tools/dentro-de-otro.mjs (2026-10-26): posiblemente dentro de otro rubro, por precedente del club (la fila tiene plata en sus balances desglosados 2019, 2023)
```

```text
tools/caja-deuda.mjs (2026-10-27): cash escalón S (compuerta: balance de SIIS cuadra y la comparativa del año siguiente de SIIS coincide): balance de SIIS (siis-estado-2018.json, miles de COP): efectivo y equivalentes = 36311
```

## 2017

### Ingresos

```text
2017: cargado por tools/cargar.mjs (2026-10-26) desde Clubes/Colombia/Alianza FC/siis-estado-2017.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Colombia/Alianza FC/siis-estado-2017.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Ingresos de actividades ordinarias | pág. 1, Jev 0.97 |
| 2 | Otros ingresos | pág. 1, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Costo de ventas | pág. 1, Claude 0.88 |
| 2 | Gastos de administración | pág. 1, Jev 1 |

### Meta

```text
2017: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-26): filas-a-mano. Claude 2026-10-26 (tokens de sesión): ubicación y filas armadas a mano desde el .md con tools/armar-a-mano.mjs
tools/cargar.mjs (2026-10-26). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"), con su tipo; la página marca «s/d» en las categorías que esa línea esconde y explica el caso en «Notas sobre este club».
```

```text
tools/dentro-de-otro.mjs (2026-10-26): posiblemente dentro de otro rubro, por precedente del club (la fila tiene plata en sus balances desglosados 2019, 2023)
```

```text
tools/caja-deuda.mjs (2026-10-27): cash escalón S (compuerta: balance de SIIS cuadra y la comparativa del año siguiente de SIIS coincide): balance de SIIS (siis-estado-2017.json, miles de COP): efectivo y equivalentes = 142569
```

## 2016

### Ingresos

```text
2016: cargado por tools/cargar.mjs (2026-10-26) desde Clubes/Colombia/Alianza FC/siis-estado-2016.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Colombia/Alianza FC/siis-estado-2016.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Ingresos de actividades ordinarias | pág. 1, Jev 0.97 |
| 2 | Otros ingresos | pág. 1, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Costo de ventas | pág. 1, Claude 0.88 |
| 2 | Gastos de ventas | pág. 1, precedente |
| 3 | Gastos de administración | pág. 1, Jev 1 |
| 4 | Otros gastos | pág. 1, Jev 1 |

### Meta

```text
2016: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-26): filas-a-mano. Claude 2026-10-26 (tokens de sesión): ubicación y filas armadas a mano desde el .md con tools/armar-a-mano.mjs
tools/cargar.mjs (2026-10-26). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"), con su tipo; la página marca «s/d» en las categorías que esa línea esconde y explica el caso en «Notas sobre este club».
```

```text
tools/dentro-de-otro.mjs (2026-10-26): posiblemente dentro de otro rubro, por precedente del club (la fila tiene plata en sus balances desglosados 2019, 2023)
```

```text
tools/caja-deuda.mjs (2026-10-27): grossDebt escalón S (compuerta: balance de SIIS cuadra y la comparativa del año siguiente de SIIS coincide): balance de SIIS (siis-estado-2016.json, miles de COP): otros pasivos financieros corrientes 677356 + no corrientes vacío; cash escalón S (compuerta: balance de SIIS cuadra y la comparativa del año siguiente de SIIS coincide): balance de SIIS (siis-estado-2016.json, miles de COP): efectivo y equivalentes = 80451
```

## Fuentes

### alianzafc-co-estados-financieros-2023

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-20) desde la transcripción Clubes/Colombia/Alianza FC/estados-financieros-2023.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### alianzafc-co-siis-estado-2016

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-26) desde la transcripción Clubes/Colombia/Alianza FC/siis-estado-2016.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### alianzafc-co-siis-estado-2017

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-26) desde la transcripción Clubes/Colombia/Alianza FC/siis-estado-2017.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### alianzafc-co-siis-estado-2018

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-26) desde la transcripción Clubes/Colombia/Alianza FC/siis-estado-2018.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### alianzafc-co-siis-estado-2019

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-26) desde la transcripción Clubes/Colombia/Alianza FC/siis-estado-2019.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### alianzafc-co-siis-estado-2020

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-26) desde la transcripción Clubes/Colombia/Alianza FC/siis-estado-2020.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### alianzafc-co-siis-estado-2021

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-26) desde la transcripción Clubes/Colombia/Alianza FC/siis-estado-2021.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### alianzafc-co-siis-estado-2022

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-26) desde la transcripción Clubes/Colombia/Alianza FC/siis-estado-2022.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### alianzafc-co-siis-estado-2024

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-26) desde la transcripción Clubes/Colombia/Alianza FC/siis-estado-2024.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### alianzafc-co-siis-estado-2025

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-26) desde la transcripción Clubes/Colombia/Alianza FC/siis-estado-2025.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```
