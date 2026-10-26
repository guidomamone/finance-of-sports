# deportestolima-co — evidencia de carga

Lo que antes iba como comentario en el data file del club, `data/<país>/deportestolima-co-data.js` (la regla: `Admin/CONVENCIONES-DATOS.md`, "data/<país>/<club>-data.js NO LLEVA
COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y meta. Las notas de cada fila van en una tabla con su número de
fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
Deportes Tolima: alta por tools/alta-club.mjs (2026-10-26) desde Clubes/Colombia/Deportes Tolima/siis-estado-2025.pdf. brandColor AUSENTE a propósito
(nadie lo chequeó todavía: club-or-year-onboarding/club-nuevo.md, identidad primero).
```

```text
data/co/deportestolima-co-data.js — Club Deportes Tolima S.A. (Colombia).
ALTA POR SCRIPT (tools/alta-club.mjs, 2026-10-26), SIN EJERCICIOS CARGADOS TODAVÍA: las estructuras del data file
nacen vacías a propósito. Los rubros, los totales oficiales y el resto del fiscalYearMeta los agrega la etapa de carga.

Documento que originó el alta: Clubes/Colombia/Deportes Tolima/siis-estado-2025.pdf

De dónde salió cada campo (estado según alta-club.mjs: ok / pendiente):
  id                 ok        "deportestolima-co" — slug de "Deportes Tolima" + '-co' (convención de clubId, Admin/CONVENCIONES.md Versión 129)
  name               ok        "Club Deportes Tolima S.A." — respuesta de Guido en la cola (126ed56): aceptó la propuesta
  displayName        ok        "Deportes Tolima" — nombre de la carpeta del club en Clubes/
  country            ok        "CO" — carpeta de país "Colombia" (tabla PAISES)
  reportingCurrency  ok        "COP" — moneda de curso legal de Colombia
  fiscalYearStart    ok        "01-01" — cierre del ejercicio: patrón del país: los 15 clubes de CO ya cargados arrancan el 01-01 (el documento no trae fechas de cierre legibles)
  sport              ok        "futbol" — la liga co-primeraA del catálogo (data/leagues.js) es de futbol
  brandColor         pendiente (ausente) — tools/brand-color-reference/ (footylogos): [colombia] deportes tolima: #E7BE2B yellow, #8D3031 burgundy
  anio               ok        2025 — --anio
  cierre             ok        "2025-12-31" — año del ejercicio + mes de cierre (patrón del país: los 15 clubes de CO ya cargados arrancan el 01-01 (el documento no trae fechas de cierre legibles)
  reportType         ok        "official_balance_sheet" — el .md tiene un estado contable (resultados / balance) y el nombre del archivo no sugiere otro tipo
  perimetro          ok        "individual" — el .md no presenta estados consolidados (0 menciones de "consolidado")
  currency           ok        "COP" — moneda de curso legal de Colombia (tabla PAISES de alta-club.mjs)
  fxRef              ok        "COP@2025-12-31" — el documento no declara tipo de cambio; FX_CLOSE ya tiene COP@2025-12-31 = 3757.08 (TRM oficial (Superintendencia Financiera de Colombia) al 31/12/202
  sourceId           ok        "deportestolima-co-siis-estado-2025" — clubId + nombre del archivo en slug
  liga               ok        "co-primeraA" — roster cacheado de "2025 Liga DIMAYOR" (tools/club-league-reference/co.json), coincidencia exacta "Deportes Tolima"

FISCAL YEAR META PROPUESTO para 2025 (NO registrado: un ejercicio con meta y
sin rubros se vería en el sitio como un año en cero, y "sin dato no es cero"):
  2025: {"reportType":"official_balance_sheet","currency":"COP","fxRef":"COP@2025-12-31","sourceId":"deportestolima-co-siis-estado-2025"}
```

## 2025

### Ingresos

```text
2025: cargado por tools/cargar.mjs (2026-10-26) desde Clubes/Colombia/Deportes Tolima/siis-estado-2025.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Colombia/Deportes Tolima/siis-estado-2025.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | taquillas | pág. 1, Jev 1 |
| 2 | venta de Derechos Deportivos 1(A) | pág. 1, Jev 1 |
| 3 | publicidad y Propaganda 2(A) | pág. 1, Jev 1 |
| 4 | Dimayor y Federación 3(A) | pág. 1, precedente |
| 5 | participación en Eventos 4(A) | pág. 1, Jev 0.96 |
| 6 | venta de Artículos Deportivos | pág. 1, Jev 1 |
| 7 | actividades Conexas | pág. 1, Jev 0.99 |
| 8 | mecanismo de solidaridad | pág. 1, Jev 0.9 |
| 9 | devoluciones en Artículos Deportivos | pág. 1, precedente |
| 10 | Otros ingresos | pág. 1, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Costo de ventas | pág. 1, precedente |
| 2 | gastos de Personal (Gastos de ventas) | pág. 1, precedente |
| 3 | honorarios (1) (Gastos de ventas) | pág. 1, precedente |
| 4 | impuestos (2) (Gastos de ventas) | pág. 1, Jev 0.99 |
| 5 | arrendamientos (3) (Gastos de ventas) | pág. 1, precedente |
| 6 | contribuciones y Afiliaciones (Gastos de ventas) | pág. 1, Jev 0.9 |
| 7 | seguros (Gastos de ventas) | pág. 1, Jev 0.98 |
| 8 | servicios (4) (Gastos de ventas) | pág. 1, precedente |
| 9 | gastos Legales (Gastos de ventas) | pág. 1, Jev 1 |
| 10 | mantenimiento y Reparaciones (5) (Gastos de ventas) | pág. 1, precedente |
| 11 | adecuación e Instalación (Gastos de ventas) | pág. 1, Jev 0.98 |
| 12 | gastos de Viaje (6) (Gastos de ventas) | pág. 1, precedente |
| 13 | amortizaciones | pág. 1, precedente |
| 14 | diversos (7) (Gastos de ventas) | pág. 1, precedente |
| 15 | gastos de personal (Gastos de administración) | pág. 1, precedente |
| 16 | honorarios (Gastos de administración) | pág. 1, precedente |
| 17 | impuestos (1) (Gastos de administración) | pág. 1, Jev 1 |
| 18 | arrendamientos (Gastos de administración) | pág. 1, precedente |
| 19 | contribuciones y afiliaciones (Gastos de administración) | pág. 1, Jev 1 |
| 20 | seguros (Gastos de administración) | pág. 1, Jev 1 |
| 21 | servicios (2) (Gastos de administración) | pág. 1, precedente |
| 22 | gastos legales (Gastos de administración) | pág. 1, Jev 1 |
| 23 | mantenimiento y reparaciones (Gastos de administración) | pág. 1, precedente |
| 24 | adecuación e instalación (Gastos de administración) | pág. 1, Jev 1 |
| 25 | gastos de viaje (Gastos de administración) | pág. 1, Claude 0.88 |
| 26 | depreciaciones | pág. 1, Jev 0.98 |
| 27 | amortizacion derechos de uso | pág. 1, ? 0.75 |
| 28 | diversos (4) (Gastos de administración) | pág. 1, precedente |
| 29 | Otros gastos | pág. 1, precedente |
| 30 | Otras ganancias (pérdidas) | pág. 1, Jev 1 |

### Meta

```text
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-26): filas-a-mano. Claude 2026-10-26 (tokens de sesión): ubicación y filas armadas a mano desde el .md con tools/armar-a-mano.mjs
tools/cargar.mjs (2026-10-26). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
alta-club.mjs (2026-10-26): co-primeraA, verificado contra roster cacheado de "2025 Liga DIMAYOR" (tools/club-league-reference/co.json), coincidencia exacta "Deportes Tolima".
```

## 2024

### Ingresos

```text
2024: cargado por tools/cargar.mjs (2026-10-26) desde Clubes/Colombia/Deportes Tolima/siis-estado-2024.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Colombia/Deportes Tolima/siis-estado-2024.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Taquillas | pág. 1, Jev 1 |
| 2 | Venta de Derechos Deportivos 1(A) | pág. 1, Jev 1 |
| 3 | Publicidad y Propaganda 2(A) | pág. 1, Jev 1 |
| 4 | Dimayor y Federación 3(A) | pág. 1, precedente |
| 5 | Participación en Eventos 4(A) | pág. 1, Jev 0.96 |
| 6 | Venta de Artículos Deportivos | pág. 1, Jev 1 |
| 7 | Actividades Conexas | pág. 1, Jev 0.99 |
| 8 | Mecanismo de solidaridad | pág. 1, Jev 0.9 |
| 9 | Devoluciones en Artículos Deportivos | pág. 1, precedente |
| 10 | Otros ingresos | pág. 1, precedente |
| 11 | Otras ganancias (pérdidas) | pág. 1, Jev 1 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Costo de ventas | pág. 1, precedente |
| 2 | Gastos de ventas | pág. 1, precedente |
| 3 | Gastos de administración | pág. 1, precedente |
| 4 | Otros gastos | pág. 1, precedente |

### Meta

```text
2024: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-26): filas-a-mano. Claude 2026-10-26 (tokens de sesión): ubicación y filas armadas a mano desde el .md con tools/armar-a-mano.mjs
2024: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-26): categoria = lump_football_operations_expense. El estado de 2024 trae «Gastos de ventas» y «Gastos de administración» intercambiados (el de 2025, en su columna 2024, da ventas 37.305.416 y administración 5.166.142; la nota 21 de ventas es jugadores, cuerpo técnico y partidos). La fila grande es la actividad deportiva.
2024: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-26): categoria = admin_general_expense. Intercambio de rótulos en el estado de 2024 (ver el ajuste de Gastos de administración): la fila chica, 5.166.142 según el comparativo de 2025, es la administración.
tools/cargar.mjs (2026-10-26). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"), con su tipo; la página marca «s/d» en las categorías que esa línea esconde y explica el caso en «Notas sobre este club».
```

```text
tools/dentro-de-otro.mjs (2026-10-26): posiblemente dentro de otro rubro, por precedente del club (la fila tiene plata en sus balances desglosados 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2025)
```

## 2023

### Ingresos

```text
2023: cargado por tools/cargar.mjs (2026-10-26) desde Clubes/Colombia/Deportes Tolima/siis-estado-2023.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Colombia/Deportes Tolima/siis-estado-2023.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Taquillas | pág. 1, Jev 1 |
| 2 | Venta de Derechos Deportivos 1(A) | pág. 1, Jev 1 |
| 3 | Prestamo de Derechos Deportivos | pág. 1, Jev 1 |
| 4 | Publicidad y Propaganda 2(A) | pág. 1, Jev 1 |
| 5 | Dimayor y Federación 3(A) | pág. 1, precedente |
| 6 | Participación en Eventos 4(A) | pág. 1, Jev 0.96 |
| 7 | Venta de Artículos Deportivos | pág. 1, Jev 1 |
| 8 | Actividades Conexas | pág. 1, Jev 0.99 |
| 9 | Devoluciones en Artículos Deportivos | pág. 1, precedente |
| 10 | Otros ingresos | pág. 1, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Costo de ventas | pág. 1, precedente |
| 2 | Gastos de Personal (Gastos de ventas) | pág. 1, precedente |
| 3 | Honorarios (1) (Gastos de ventas) | pág. 1, precedente |
| 4 | Impuestos (2) (Gastos de ventas) | pág. 1, Jev 0.99 |
| 5 | Arrendamientos (3) (Gastos de ventas) | pág. 1, precedente |
| 6 | Contribuciones y Afiliaciones (Gastos de ventas) | pág. 1, Jev 0.9 |
| 7 | Seguros (Gastos de ventas) | pág. 1, Jev 0.98 |
| 8 | Servicios (4) (Gastos de ventas) | pág. 1, precedente |
| 9 | Gastos Legales (Gastos de ventas) | pág. 1, Jev 1 |
| 10 | Mantenimiento y Reparaciones (5) (Gastos de ventas) | pág. 1, precedente |
| 11 | Adecuación e Instalación (Gastos de ventas) | pág. 1, Jev 0.98 |
| 12 | Gastos de Viaje (6) (Gastos de ventas) | pág. 1, precedente |
| 13 | Amortizaciones | pág. 1, precedente |
| 14 | Diversos (7) (Gastos de ventas) | pág. 1, precedente |
| 15 | Gastos de Personal (Gastos de administración) | pág. 1, precedente |
| 16 | Honorarios (Gastos de administración) | pág. 1, precedente |
| 17 | Impuestos (1) (Gastos de administración) | pág. 1, Jev 1 |
| 18 | Arrendamientos (2) (Gastos de administración) | pág. 1, precedente |
| 19 | Contribuciones y Afiliaciones (Gastos de administración) | pág. 1, Jev 1 |
| 20 | Seguros (Gastos de administración) | pág. 1, Jev 1 |
| 21 | Servicios (3) (Gastos de administración) | pág. 1, precedente |
| 22 | Gastos Legales (Gastos de administración) | pág. 1, Jev 1 |
| 23 | Mantenimiento y Reparaciones (Gastos de administración) | pág. 1, precedente |
| 24 | Adecuación e Instalación (Gastos de administración) | pág. 1, Jev 1 |
| 25 | Gastos de Viaje (Gastos de administración) | pág. 1, Claude 0.88 |
| 26 | Depreciaciones | pág. 1, Jev 0.98 |
| 27 | Deterioro | pág. 1, ? 0.5 |
| 28 | Diversos (5) (Gastos de administración) | pág. 1, precedente |
| 29 | Otros gastos | pág. 1, precedente |

### Meta

```text
2023: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-26): filas-a-mano. Claude 2026-10-26 (tokens de sesión): ubicación y filas armadas a mano desde el .md con tools/armar-a-mano.mjs
tools/cargar.mjs (2026-10-26). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

## 2022

### Ingresos

```text
2022: cargado por tools/cargar.mjs (2026-10-26) desde Clubes/Colombia/Deportes Tolima/siis-estado-2022.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Colombia/Deportes Tolima/siis-estado-2022.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Taquillas | pág. 1, Jev 1 |
| 2 | Venta de Derechos Deportivos 1(A) | pág. 1, Jev 1 |
| 3 | Prestamo de Derechos Deportivos | pág. 1, Jev 1 |
| 4 | Publicidad y Propaganda 2(A) | pág. 1, Jev 1 |
| 5 | Dimayor y Federación 3(A) | pág. 1, precedente |
| 6 | Participación en Eventos 4(A) | pág. 1, Jev 0.96 |
| 7 | Venta de Artículos Deportivos | pág. 1, Jev 1 |
| 8 | Actividades Conexas | pág. 1, Jev 0.99 |
| 9 | Devoluciones en Artículos Deportivos | pág. 1, precedente |
| 10 | Otros ingresos | pág. 1, precedente |
| 11 | Ganancia (pérdida) procedente de operaciones discontinuadas | pág. 1, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Costo de ventas | pág. 1, precedente |
| 2 | Gastos de Personal (Gastos de ventas) | pág. 1, precedente |
| 3 | Honorarios (Gastos de ventas) | pág. 1, precedente |
| 4 | Impuestos (1) (Gastos de ventas) | pág. 1, Jev 0.99 |
| 5 | Arrendamientos (2) (Gastos de ventas) | pág. 1, precedente |
| 6 | Seguros (Gastos de ventas) | pág. 1, Jev 0.98 |
| 7 | Servicios (3) (Gastos de ventas) | pág. 1, precedente |
| 8 | Gastos Legales (Gastos de ventas) | pág. 1, Jev 1 |
| 9 | Mantenimiento y Reparaciones (4) (Gastos de ventas) | pág. 1, precedente |
| 10 | Adecuación e Instalación (Gastos de ventas) | pág. 1, Jev 0.98 |
| 11 | Gastos de Viaje (5) (Gastos de ventas) | pág. 1, precedente |
| 12 | Amortizaciones | pág. 1, precedente |
| 13 | Diversos (6) (Gastos de ventas) | pág. 1, precedente |
| 14 | Gastos de Personal (Gastos de administración) | pág. 1, precedente |
| 15 | Honorarios (Gastos de administración) | pág. 1, precedente |
| 16 | Impuestos (1) (Gastos de administración) | pág. 1, Jev 1 |
| 17 | Arrendamientos (2) (Gastos de administración) | pág. 1, precedente |
| 18 | Contribuciones y Afiliaciones | pág. 1, Jev 0.99 |
| 19 | Seguros (Gastos de administración) | pág. 1, Jev 1 |
| 20 | Servicios (3) (Gastos de administración) | pág. 1, precedente |
| 21 | Gastos Legales (Gastos de administración) | pág. 1, Jev 1 |
| 22 | Mantenimiento y Reparaciones (Gastos de administración) | pág. 1, precedente |
| 23 | Adecuación e Instalación (Gastos de administración) | pág. 1, Jev 1 |
| 24 | Gastos de Viaje (Gastos de administración) | pág. 1, Claude 0.88 |
| 25 | Depreciaciones | pág. 1, Jev 0.98 |
| 26 | Diversos (5) (Gastos de administración) | pág. 1, precedente |
| 27 | Otros gastos | pág. 1, precedente |

### Meta

```text
2022: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-26): filas-a-mano. Claude 2026-10-26 (tokens de sesión): ubicación y filas armadas a mano desde el .md con tools/armar-a-mano.mjs
tools/cargar.mjs (2026-10-26). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

## 2021

### Ingresos

```text
2021: cargado por tools/cargar.mjs (2026-10-26) desde Clubes/Colombia/Deportes Tolima/siis-estado-2021.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Colombia/Deportes Tolima/siis-estado-2021.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Taquillas | pág. 1, Jev 1 |
| 2 | Venta de Derechos Deportivos 1(A) | pág. 1, Jev 1 |
| 3 | Mecanismo de Solidaridad 2(A) | pág. 1, Jev 0.91 |
| 4 | Publicidad y Propaganda 3(A) | pág. 1, Jev 1 |
| 5 | Dimayor y Federación 4(A) | pág. 1, precedente |
| 6 | Participación en Eventos 5(A) | pág. 1, Jev 0.97 |
| 7 | Venta de Artículos Deportivos | pág. 1, Jev 1 |
| 8 | Actividades Conexas | pág. 1, Jev 0.99 |
| 9 | Devoluciones en Artículos Deportivos | pág. 1, precedente |
| 10 | Otros ingresos | pág. 1, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Costo de ventas | pág. 1, precedente |
| 2 | Gastos de Personal | pág. 1, Claude 0.8 |
| 3 | Honorarios | pág. 1, Jev 0.98 |
| 4 | Impuestos | pág. 1, Jev 0.99 |
| 5 | Arrendamientos | pág. 1, precedente |
| 6 | Contribuciones y Afiliaciones | pág. 1, Jev 0.99 |
| 7 | Seguros | pág. 1, Claude 0.8 |
| 8 | Servicios | pág. 1, Jev 0.97 |
| 9 | Gastos Legales | pág. 1, Jev 1 |
| 10 | Mantenimiento y Reparaciones | pág. 1, Claude 0.8 |
| 11 | Adecuación e Instalación | pág. 1, Jev 0.9 |
| 12 | Gastos de Viaje | pág. 1, Jev 0.99 |
| 13 | Amortizaciones | pág. 1, precedente |
| 14 | Derechos Deportivos | pág. 1, Jev 0.98 |
| 15 | Diversos | pág. 1, precedente |
| 16 | Gastos de administración | pág. 1, precedente |
| 17 | Otros gastos | pág. 1, precedente |
| 18 | Ganancia (pérdida) procedente de operaciones discontinuadas | pág. 1, precedente |

### Meta

```text
2021: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-26): filas-a-mano. Claude 2026-10-26 (tokens de sesión): ubicación y filas armadas a mano desde el .md con tools/armar-a-mano.mjs
tools/cargar.mjs (2026-10-26). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

## 2020

### Ingresos

```text
2020: cargado por tools/cargar.mjs (2026-10-26) desde Clubes/Colombia/Deportes Tolima/siis-estado-2020.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Colombia/Deportes Tolima/siis-estado-2020.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Taquillas | pág. 1, Jev 1 |
| 2 | Venta de Derechos Deportivos | pág. 1, Jev 1 |
| 3 | Mecanismo de Solidaridad | pág. 1, Jev 0.93 |
| 4 | Publicidad y Propaganda | pág. 1, Jev 1 |
| 5 | Dimayor y Federación | pág. 1, Claude 0.93 |
| 6 | Participación en Eventos | pág. 1, Jev 0.99 |
| 7 | Venta de Artículos Deportivos | pág. 1, Jev 1 |
| 8 | Devoluciones en Artículos Deportivos | pág. 1, precedente |
| 9 | Otros ingresos | pág. 1, precedente |
| 10 | Ganancia (pérdida) procedente de operaciones discontinuadas | pág. 1, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Costo de ventas | pág. 1, precedente |
| 2 | Gastos de Personal | pág. 1, Claude 0.8 |
| 3 | Honorarios | pág. 1, Jev 0.98 |
| 4 | Impuestos | pág. 1, Jev 0.99 |
| 5 | Arrendamientos | pág. 1, Claude 0.9 |
| 6 | Seguros | pág. 1, Claude 0.8 |
| 7 | Servicios | pág. 1, Jev 0.97 |
| 8 | Gastos Legales | pág. 1, Jev 1 |
| 9 | Mantenimiento y Reparaciones | pág. 1, Claude 0.8 |
| 10 | Adecuación e Instalación | pág. 1, Jev 0.9 |
| 11 | Gastos de Viaje | pág. 1, Jev 0.99 |
| 12 | Amortizaciones | pág. 1, precedente |
| 13 | Diversos | pág. 1, precedente |
| 14 | Gastos de administración | pág. 1, precedente |
| 15 | Otros gastos | pág. 1, precedente |

### Meta

```text
2020: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-26): filas-a-mano. Claude 2026-10-26 (tokens de sesión): ubicación y filas armadas a mano desde el .md con tools/armar-a-mano.mjs
tools/cargar.mjs (2026-10-26). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

## 2019

### Ingresos

```text
2019: cargado por tools/cargar.mjs (2026-10-26) desde Clubes/Colombia/Deportes Tolima/siis-estado-2019.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Colombia/Deportes Tolima/siis-estado-2019.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Taquillas | pág. 1, Jev 1 |
| 2 | Venta de Derechos Deportivos | pág. 1, Jev 1 |
| 3 | Mecanismo de Solidaridad | pág. 1, Jev 0.9 |
| 4 | Publicidad y Propaganda | pág. 1, Jev 1 |
| 5 | Dimayor y Federación | pág. 1, Claude 0.93 |
| 6 | Donaciones | pág. 1, Jev 1 |
| 7 | Participación en Eventos | pág. 1, Jev 0.99 |
| 8 | Venta de Artículos Deportivos | pág. 1, Jev 1 |
| 9 | Actividades Conexas | pág. 1, Jev 0.99 |
| 10 | Devoluciones en Artículos Deportivos | pág. 1, precedente |
| 11 | Otros ingresos | pág. 1, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Costo de ventas | pág. 1, precedente |
| 2 | Gastos de Personal | pág. 1, Claude 0.8 |
| 3 | Honorarios | pág. 1, precedente |
| 4 | Impuestos | pág. 1, Jev 1 |
| 5 | Arrendamientos | pág. 1, Claude 0.9 |
| 6 | Seguros | pág. 1, Claude 0.8 |
| 7 | Servicios | pág. 1, Jev 0.97 |
| 8 | Gastos Legales | pág. 1, Jev 1 |
| 9 | Mantenimiento y Reparaciones | pág. 1, Jev 0.99 |
| 10 | Adecuación e Instalación | pág. 1, Jev 0.9 |
| 11 | Gastos de Viaje | pág. 1, Jev 1 |
| 12 | Amortizaciones | pág. 1, precedente |
| 13 | Diversos | pág. 1, precedente |
| 14 | Gastos de administración | pág. 1, precedente |
| 15 | Otros gastos | pág. 1, precedente |

### Meta

```text
2019: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-26): filas-a-mano. Claude 2026-10-26 (tokens de sesión): ubicación y filas armadas a mano desde el .md con tools/armar-a-mano.mjs
tools/cargar.mjs (2026-10-26). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

## 2018

### Ingresos

```text
2018: cargado por tools/cargar.mjs (2026-10-26) desde Clubes/Colombia/Deportes Tolima/siis-estado-2018.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Colombia/Deportes Tolima/siis-estado-2018.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Taquillas | pág. 1, Jev 1 |
| 2 | Venta de Derechos Deportivos | pág. 1, Jev 1 |
| 3 | Mecanismo de Solidaridad | pág. 1, Jev 0.9 |
| 4 | Publicidad y Propaganda | pág. 1, Jev 1 |
| 5 | Dimayor y Federación | pág. 1, precedente |
| 6 | Participación en Eventos | pág. 1, Jev 1 |
| 7 | Venta de Artículos Deportivos | pág. 1, Jev 1 |
| 8 | Devoluciones en Artículos Deportivos | pág. 1, precedente |
| 9 | Otros ingresos | pág. 1, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Costo de ventas | pág. 1, precedente |
| 2 | Gastos de Personal (Gastos de ventas) | pág. 1, precedente |
| 3 | Honorarios (Gastos de ventas) | pág. 1, precedente |
| 4 | Impuestos (Gastos de ventas) | pág. 1, Jev 0.99 |
| 5 | Arrendamientos (Gastos de ventas) | pág. 1, precedente |
| 6 | Seguros (Gastos de ventas) | pág. 1, Jev 0.98 |
| 7 | Servicios (Gastos de ventas) | pág. 1, precedente |
| 8 | Gastos Legales (Gastos de ventas) | pág. 1, Jev 1 |
| 9 | Mantenimiento y Reparaciones (Gastos de ventas) | pág. 1, precedente |
| 10 | Adecuación e Instalación (Gastos de ventas) | pág. 1, Jev 0.98 |
| 11 | Gastos de Viaje (Gastos de ventas) | pág. 1, precedente |
| 12 | Amortizaciones | pág. 1, precedente |
| 13 | Diversos (Gastos de ventas) | pág. 1, precedente |
| 14 | Gastos de Personal (Gastos de administración) | pág. 1, precedente |
| 15 | Honorarios (Gastos de administración) | pág. 1, precedente |
| 16 | Impuestos (Gastos de administración) | pág. 1, Jev 1 |
| 17 | Arrendamientos (Gastos de administración) | pág. 1, precedente |
| 18 | Seguros (Gastos de administración) | pág. 1, Jev 1 |
| 19 | Servicios (Gastos de administración) | pág. 1, precedente |
| 20 | Gastos Legales (Gastos de administración) | pág. 1, Jev 1 |
| 21 | Mantenimiento y Reparaciones (Gastos de administración) | pág. 1, precedente |
| 22 | Adecuación e Instalación (Gastos de administración) | pág. 1, Jev 1 |
| 23 | Gastos de Viaje (Gastos de administración) | pág. 1, Claude 0.88 |
| 24 | Depreciaciones | pág. 1, Jev 0.99 |
| 25 | Deterioro | pág. 1, ? 0.5 |
| 26 | Diversos (Gastos de administración) | pág. 1, precedente |
| 27 | Otros gastos | pág. 1, precedente |

### Meta

```text
2018: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-26): filas-a-mano. Claude 2026-10-26 (tokens de sesión): ubicación y filas armadas a mano desde el .md con tools/armar-a-mano.mjs
tools/cargar.mjs (2026-10-26). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

## 2017

### Ingresos

```text
2017: cargado por tools/cargar.mjs (2026-10-26) desde Clubes/Colombia/Deportes Tolima/siis-estado-2017.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Colombia/Deportes Tolima/siis-estado-2017.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Taquillas | pág. 1, Jev 1 |
| 2 | Venta de Derechos Deportivos | pág. 1, Jev 1 |
| 3 | Préstamo de Derechos Deportivos | pág. 1, Jev 1 |
| 4 | Publicidad y Propaganda | pág. 1, Jev 1 |
| 5 | Dimayor y Federación | pág. 1, precedente |
| 6 | Participación en Eventos | pág. 1, Jev 1 |
| 7 | Venta de Artículos Deportivos | pág. 1, Jev 1 |
| 8 | Actividades Conexas | pág. 1, Jev 0.99 |
| 9 | Devoluciones en Artículos Deportivos | pág. 1, precedente |
| 10 | Otros ingresos | pág. 1, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Costo de ventas | pág. 1, precedente |
| 2 | Gastos de Personal (Gastos de ventas) | pág. 1, precedente |
| 3 | Honorarios (Gastos de ventas) | pág. 1, precedente |
| 4 | Impuestos (Gastos de ventas) | pág. 1, Jev 0.99 |
| 5 | Arrendamientos (Gastos de ventas) | pág. 1, precedente |
| 6 | Servicios (Gastos de ventas) | pág. 1, precedente |
| 7 | Gastos Legales (Gastos de ventas) | pág. 1, Jev 1 |
| 8 | Mantenimiento y Reparaciones (Gastos de ventas) | pág. 1, precedente |
| 9 | Gastos de Viaje | pág. 1, precedente |
| 10 | Amortizaciones | pág. 1, precedente |
| 11 | Diversos (Gastos de ventas) | pág. 1, precedente |
| 12 | Gastos de Personal (Gastos de administración) | pág. 1, precedente |
| 13 | Honorarios (Gastos de administración) | pág. 1, precedente |
| 14 | Impuestos (Gastos de administración) | pág. 1, Jev 1 |
| 15 | Arrendamientos (Gastos de administración) | pág. 1, precedente |
| 16 | Contribuciones y Afiliaciones | pág. 1, Jev 0.99 |
| 17 | Seguros (Gastos de administración) | pág. 1, Jev 1 |
| 18 | Servicios (Gastos de administración) | pág. 1, precedente |
| 19 | Gastos Legales (Gastos de administración) | pág. 1, Jev 1 |
| 20 | Mantenimiento y Reparaciones (Gastos de administración) | pág. 1, precedente |
| 21 | Adecuación e Instalación | pág. 1, Jev 0.9 |
| 22 | Depreciaciones | pág. 1, Jev 0.99 |
| 23 | Deterioro | pág. 1, ? 0.5 |
| 24 | Diversos (Gastos de administración) | pág. 1, precedente |
| 25 | Otros gastos | pág. 1, precedente |

### Meta

```text
2017: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-26): filas-a-mano. Claude 2026-10-26 (tokens de sesión): ubicación y filas armadas a mano desde el .md con tools/armar-a-mano.mjs
tools/cargar.mjs (2026-10-26). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

## 2016

### Ingresos

```text
2016: cargado por tools/cargar.mjs (2026-10-26) desde Clubes/Colombia/Deportes Tolima/siis-estado-2016.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Colombia/Deportes Tolima/siis-estado-2016.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Taquillas | pág. 1, Jev 1 |
| 2 | Venta de Derechos Deportivos | pág. 1, Jev 1 |
| 3 | Publicidad y Propaganda | pág. 1, Jev 1 |
| 4 | Dimayor y Federación | pág. 1, precedente |
| 5 | Participación en Eventos | pág. 1, Jev 1 |
| 6 | Venta de Artículos Deportivos | pág. 1, Jev 1 |
| 7 | Devoluciones en Artículos Deportivos | pág. 1, precedente |
| 8 | Otros ingresos | pág. 1, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Costo de ventas | pág. 1, precedente |
| 2 | Gastos de Personal (Gastos de ventas) | pág. 1, precedente |
| 3 | Honorarios (Gastos de ventas) | pág. 1, precedente |
| 4 | Impuestos (Gastos de ventas) | pág. 1, Jev 0.99 |
| 5 | Arrendamientos (Gastos de ventas) | pág. 1, precedente |
| 6 | Seguros (Gastos de ventas) | pág. 1, Jev 0.98 |
| 7 | Servicios (Gastos de ventas) | pág. 1, precedente |
| 8 | Gastos Legales (Gastos de ventas) | pág. 1, Jev 1 |
| 9 | Mantenimiento y Reparaciones (Gastos de ventas) | pág. 1, precedente |
| 10 | Gastos de Viaje | pág. 1, precedente |
| 11 | Amortizaciones | pág. 1, precedente |
| 12 | Diversos (Gastos de ventas) | pág. 1, precedente |
| 13 | Gastos de Personal (Gastos de administración) | pág. 1, precedente |
| 14 | Honorarios (Gastos de administración) | pág. 1, precedente |
| 15 | Impuestos (Gastos de administración) | pág. 1, Jev 1 |
| 16 | Arrendamientos (Gastos de administración) | pág. 1, precedente |
| 17 | Contribuciones y Afiliaciones | pág. 1, Jev 0.99 |
| 18 | Seguros (Gastos de administración) | pág. 1, Jev 1 |
| 19 | Servicios (Gastos de administración) | pág. 1, precedente |
| 20 | Gastos Legales (Gastos de administración) | pág. 1, Jev 1 |
| 21 | Mantenimiento y Reparaciones (Gastos de administración) | pág. 1, precedente |
| 22 | Depreciaciones | pág. 1, Jev 0.99 |
| 23 | Deterioro | pág. 1, ? 0.5 |
| 24 | Diversos (Gastos de administración) | pág. 1, precedente |
| 25 | Otros gastos | pág. 1, precedente |

### Meta

```text
2016: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-26): filas-a-mano. Claude 2026-10-26 (tokens de sesión): ubicación y filas armadas a mano desde el .md con tools/armar-a-mano.mjs
tools/cargar.mjs (2026-10-26). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

## Fuentes

### deportestolima-co-siis-estado-2023

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-26) desde la transcripción Clubes/Colombia/Deportes Tolima/siis-estado-2023.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### deportestolima-co-siis-estado-2024

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-26) desde la transcripción Clubes/Colombia/Deportes Tolima/siis-estado-2024.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### deportestolima-co-siis-estado-2025

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-26) desde la transcripción Clubes/Colombia/Deportes Tolima/siis-estado-2025.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### deportestolima-co-siis-estado-2016

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-26) desde la transcripción Clubes/Colombia/Deportes Tolima/siis-estado-2016.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### deportestolima-co-siis-estado-2017

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-26) desde la transcripción Clubes/Colombia/Deportes Tolima/siis-estado-2017.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### deportestolima-co-siis-estado-2018

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-26) desde la transcripción Clubes/Colombia/Deportes Tolima/siis-estado-2018.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### deportestolima-co-siis-estado-2019

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-26) desde la transcripción Clubes/Colombia/Deportes Tolima/siis-estado-2019.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### deportestolima-co-siis-estado-2020

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-26) desde la transcripción Clubes/Colombia/Deportes Tolima/siis-estado-2020.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### deportestolima-co-siis-estado-2021

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-26) desde la transcripción Clubes/Colombia/Deportes Tolima/siis-estado-2021.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### deportestolima-co-siis-estado-2022

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-26) desde la transcripción Clubes/Colombia/Deportes Tolima/siis-estado-2022.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```
