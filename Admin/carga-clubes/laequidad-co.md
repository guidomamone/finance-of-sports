# laequidad-co — evidencia de carga

Lo que antes iba como comentario en el data file del club, `data/<país>/laequidad-co-data.js` (la regla: `Admin/CONVENCIONES-DATOS.md`, "data/<país>/<club>-data.js NO LLEVA
COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y meta. Las notas de cada fila van en una tabla con su número de
fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
La Equidad: alta por tools/alta-club.mjs (2026-10-26) desde Clubes/Colombia/La Equidad/siis-estado-2025.pdf. brandColor AUSENTE a propósito
(nadie lo chequeó todavía: club-or-year-onboarding/club-nuevo.md, identidad primero).
```

```text
data/co/laequidad-co-data.js — IDBDC Albinegro S.A. (Colombia).
ALTA POR SCRIPT (tools/alta-club.mjs, 2026-10-26), SIN EJERCICIOS CARGADOS TODAVÍA: las estructuras del data file
nacen vacías a propósito. Los rubros, los totales oficiales y el resto del fiscalYearMeta los agrega la etapa de carga.

Documento que originó el alta: Clubes/Colombia/La Equidad/siis-estado-2025.pdf

De dónde salió cada campo (estado según alta-club.mjs: ok / pendiente):
  id                 ok        "laequidad-co" — slug de "La Equidad" + '-co' (convención de clubId, Admin/CONVENCIONES.md Versión 129)
  name               ok        "IDBDC Albinegro S.A." — ajuste manual (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-09): Revisión del alta (Claude, 2026-10-09): razón social vigente desde el 17-oct
  displayName        ok        "La Equidad" — nombre de la carpeta del club en Clubes/
  country            ok        "CO" — carpeta de país "Colombia" (tabla PAISES)
  reportingCurrency  ok        "COP" — moneda de curso legal de Colombia
  fiscalYearStart    ok        "01-01" — cierre del ejercicio: patrón del país: los 16 clubes de CO ya cargados arrancan el 01-01 (el documento no trae fechas de cierre legibles)
  sport              ok        "futbol" — la liga co-primeraA del catálogo (data/leagues.js) es de futbol
  brandColor         pendiente (ausente) — tools/brand-color-reference/ (footylogos): [colombia] la equidad: #33B540 green, #E3BA28 gold, #FFFFFF white
  anio               ok        2025 — --anio
  cierre             ok        "2025-12-31" — año del ejercicio + mes de cierre (patrón del país: los 16 clubes de CO ya cargados arrancan el 01-01 (el documento no trae fechas de cierre legibles)
  reportType         ok        "official_balance_sheet" — el .md tiene un estado contable (resultados / balance) y el nombre del archivo no sugiere otro tipo
  perimetro          ok        "individual" — el .md no presenta estados consolidados (0 menciones de "consolidado")
  currency           ok        "COP" — moneda de curso legal de Colombia (tabla PAISES de alta-club.mjs)
  fxRef              ok        "COP@2025-12-31" — el documento no declara tipo de cambio; FX_CLOSE ya tiene COP@2025-12-31 = 3757.08 (TRM oficial (Superintendencia Financiera de Colombia) al 31/12/202
  sourceId           ok        "laequidad-co-siis-estado-2025" — clubId + nombre del archivo en slug
  liga               ok        "co-primeraA" — roster cacheado de "2025 Liga DIMAYOR" (tools/club-league-reference/co.json), coincidencia exacta "La Equidad"

FISCAL YEAR META PROPUESTO para 2025 (NO registrado: un ejercicio con meta y
sin rubros se vería en el sitio como un año en cero, y "sin dato no es cero"):
  2025: {"reportType":"official_balance_sheet","currency":"COP","fxRef":"COP@2025-12-31","sourceId":"laequidad-co-siis-estado-2025"}
```

## 2025

### Ingresos

```text
2025: cargado por tools/cargar.mjs (2026-10-26) desde Clubes/Colombia/La Equidad/siis-estado-2025.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Colombia/La Equidad/siis-estado-2025.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Taquilla - Venta de Boletería | pág. 1, Jev 1 |
| 2 | Escuelas de Futbol | pág. 1, Jev 1 |
| 3 | Publicidad y Propaganda | pág. 1, Jev 1 |
| 4 | Dimayor | pág. 1, Jev 1 |
| 5 | Federacion Colombiana de Futbol | pág. 1, Jev 0.93 |
| 6 | Patrocinio | pág. 1, Jev 1 |
| 7 | Venta de Artículos Deportivos | pág. 1, Jev 1 |
| 8 | Actividades Conexas | pág. 1, Jev 0.96 |
| 9 | Ingresos Fuerzas Basicas | pág. 1, Jev 0.96 |
| 10 | Reintegro de Otros Costos y Gastos | pág. 1, Jev 1 |
| 11 | Recobro Incapacidades | pág. 1, Jev 0.97 |
| 12 | Venta Derechos Deportivos | pág. 1, Jev 1 |
| 13 | Aprovechamientos | pág. 1, Jev 0.96 |
| 14 | Financieros | pág. 1, precedente |
| 15 | Otros | pág. 1, Jev 1 |
| 16 | Ajuste al Peso | pág. 1, Jev 1 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Costo de ventas | pág. 1, precedente |
| 2 | Gastos De Personal | pág. 1, precedente |
| 3 | Honorarios | pág. 1, precedente |
| 4 | Impuestos | pág. 1, Jev 0.98 |
| 5 | Arrendamientos | pág. 1, Claude 0.85 |
| 6 | Seguros | pág. 1, Claude 0.8 |
| 7 | Servicios | pág. 1, Jev 0.92 |
| 8 | Legales | pág. 1, Jev 1 |
| 9 | Mantenimiento Y Reparaciones | pág. 1, Jev 0.95 |
| 10 | Adecuacion E Instalacion | pág. 1, precedente |
| 11 | Gastos De Viaje | pág. 1, Jev 1 |
| 12 | Depreciaciones | pág. 1, Jev 1 |
| 13 | Amortizaciones | pág. 1, precedente |
| 14 | Amortizaciones Donaciones Derechos | pág. 1, precedente |
| 15 | Derechos Deportivos | pág. 1, Jev 0.99 |
| 16 | Diversos | pág. 1, precedente |
| 17 | Gastos de administración | pág. 1, Jev 1 |
| 18 | Otros gastos | pág. 1, precedente |

### Meta

```text
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-26): filas-a-mano. Claude 2026-10-26 (tokens de sesión): ubicación y filas armadas a mano desde el .md con tools/armar-a-mano.mjs
tools/cargar.mjs (2026-10-26). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
alta-club.mjs (2026-10-26): co-primeraA, verificado contra roster cacheado de "2025 Liga DIMAYOR" (tools/club-league-reference/co.json), coincidencia exacta "La Equidad".
```

## 2024

### Ingresos

```text
2024: cargado por tools/cargar.mjs (2026-10-26) desde Clubes/Colombia/La Equidad/siis-estado-2024.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Colombia/La Equidad/siis-estado-2024.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Ingresos de actividades ordinarias | pág. 1, precedente |
| 2 | Otros ingresos | pág. 1, Jev 0.96 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Costo de ventas | pág. 1, Claude 0.88 |
| 2 | Gastos de ventas | pág. 1, Claude 0.85 |
| 3 | Gastos de administración | pág. 1, Jev 1 |
| 4 | Otros gastos | pág. 1, Jev 0.97 |

### Meta

```text
2024: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-26): filas-a-mano. Claude 2026-10-26 (tokens de sesión): ubicación y filas armadas a mano desde el .md con tools/armar-a-mano.mjs
tools/cargar.mjs (2026-10-26). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"), con su tipo; la página marca «s/d» en las categorías que esa línea esconde y explica el caso en «Notas sobre este club».
```

```text
tools/dentro-de-otro.mjs (2026-10-26): posiblemente dentro de otro rubro, por precedente del club (la fila tiene plata en sus balances desglosados 2016, 2020, 2022, 2025)
```

### Liga

```text
tools/cargar.mjs (2026-10-26): co-primeraA, verificado contra roster cacheado de "2024 Liga DIMAYOR" (tools/club-league-reference/co.json), coincidencia exacta "La Equidad".
```

## 2023

### Ingresos

```text
2023: cargado por tools/cargar.mjs (2026-10-26) desde Clubes/Colombia/La Equidad/siis-estado-2023.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Colombia/La Equidad/siis-estado-2023.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Ingresos de actividades ordinarias | pág. 1, precedente |
| 2 | Otros ingresos | pág. 1, Jev 0.96 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Costo de ventas | pág. 1, Claude 0.88 |
| 2 | Gastos de ventas | pág. 1, Claude 0.85 |
| 3 | Gastos de administración | pág. 1, Jev 1 |
| 4 | Otros gastos | pág. 1, Jev 0.97 |

### Meta

```text
2023: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-26): filas-a-mano. Claude 2026-10-26 (tokens de sesión): ubicación y filas armadas a mano desde el .md con tools/armar-a-mano.mjs
tools/cargar.mjs (2026-10-26). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"), con su tipo; la página marca «s/d» en las categorías que esa línea esconde y explica el caso en «Notas sobre este club».
```

```text
tools/dentro-de-otro.mjs (2026-10-26): posiblemente dentro de otro rubro, por precedente del club (la fila tiene plata en sus balances desglosados 2016, 2020, 2022, 2025)
```

### Liga

```text
tools/cargar.mjs (2026-10-26): co-primeraA, verificado contra roster cacheado de "2023 Liga DIMAYOR" (tools/club-league-reference/co.json), coincidencia exacta "La Equidad".
```

## 2022

### Ingresos

```text
2022: cargado por tools/cargar.mjs (2026-10-26) desde Clubes/Colombia/La Equidad/siis-estado-2022.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Colombia/La Equidad/siis-estado-2022.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Taquilla - Venta de Boletería | pág. 1, Jev 1 |
| 2 | Escuelas de Futbol | pág. 1, Jev 1 |
| 3 | Publicidad y Propaganda | pág. 1, Jev 1 |
| 4 | Dimayor | pág. 1, Jev 1 |
| 5 | Federacion Colombiana de Futbol | pág. 1, Jev 0.93 |
| 6 | Patrocinio | pág. 1, Jev 1 |
| 7 | Cuota de Sostenimiento | pág. 1, Jev 1 |
| 8 | Participación CopaSuramericana | pág. 1, Jev 1 |
| 9 | Venta de Artículos Deportivos | pág. 1, Jev 1 |
| 10 | Venta Tienda Virtual | pág. 1, Jev 1 |
| 11 | Eventos | pág. 1, ? 0.6 |
| 12 | Devoluciones en Ventas | pág. 1, Jev 0.98 |
| 13 | Actividades Conexas | pág. 1, Jev 0.96 |
| 14 | Ingresos Fuerzas Basicas | pág. 1, Jev 0.96 |
| 15 | Construcciones y Edificaciones | pág. 1, ? 0.6 |
| 16 | Reintegro de Otros Costos y Gastos | pág. 1, Jev 1 |
| 17 | Recobro Incapacidades | pág. 1, Jev 0.97 |
| 18 | Ingresos de Ejercicios Anteriores | pág. 1, Jev 0.99 |
| 19 | Venta Derechos Deportivos | pág. 1, Jev 1 |
| 20 | Aprovechamientos | pág. 1, Jev 0.96 |
| 21 | Subvenciones del Estado | pág. 1, Jev 0.99 |
| 22 | Donacion | pág. 1, Jev 0.98 |
| 23 | Ajuste al Peso | pág. 1, Jev 1 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Costo de ventas | pág. 1, precedente |
| 2 | Gastos De Personal (Gastos de ventas) | pág. 1, Jev 0.98 |
| 3 | Honorarios (Gastos de ventas) | pág. 1, Jev 0.99 |
| 4 | Impuestos (Gastos de ventas) | pág. 1, Jev 0.99 |
| 5 | Arrendamientos (Gastos de ventas) | pág. 1, Jev 0.95 |
| 6 | Seguros (Gastos de ventas) | pág. 1, Jev 0.98 |
| 7 | Servicios (Gastos de ventas) | pág. 1, Claude 0.85 |
| 8 | Gastos Legales (Gastos de ventas) | pág. 1, Jev 1 |
| 9 | Mantenimiento Y Reparaciones (Gastos de ventas) | pág. 1, Claude 0.85 |
| 10 | Adecuacion E Instalacion (Gastos de ventas) | pág. 1, precedente |
| 11 | Gastos De Viaje (Gastos de ventas) | pág. 1, Jev 1 |
| 12 | Depreciaciones (Gastos de ventas) | pág. 1, Jev 1 |
| 13 | Amortizaciones | pág. 1, precedente |
| 14 | Amortizaciones Donaciones Derechos | pág. 1, precedente |
| 15 | Derechos Deportivos | pág. 1, Jev 0.99 |
| 16 | Diversos (Gastos de ventas) | pág. 1, Jev 0.99 |
| 17 | Gastos De Personal (Gastos de administración) | pág. 1, Claude 0.9 |
| 18 | Honorarios (Gastos de administración) | pág. 1, Jev 1 |
| 19 | Impuestos (Gastos de administración) | pág. 1, Jev 1 |
| 20 | Arrendamientos (Gastos de administración) | pág. 1, Jev 1 |
| 21 | Contribuciones Y Afiliaciones | pág. 1, Jev 0.99 |
| 22 | Seguros (Gastos de administración) | pág. 1, Jev 1 |
| 23 | Servicios (Gastos de administración) | pág. 1, Claude 0.92 |
| 24 | Gastos Legales (Gastos de administración) | pág. 1, Jev 1 |
| 25 | Mantenimiento Y Reparaciones (Gastos de administración) | pág. 1, Jev 0.99 |
| 26 | Adecuacion E Instalacion (Gastos de administración) | pág. 1, precedente |
| 27 | Gastos De Viaje (Gastos de administración) | pág. 1, Claude 0.88 |
| 28 | Depreciaciones (Gastos de administración) | pág. 1, Jev 1 |
| 29 | Diversos (Gastos de administración) | pág. 1, Claude 0.85 |
| 30 | Otros gastos | pág. 1, precedente |

### Meta

```text
2022: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-26): filas-a-mano. Claude 2026-10-26 (tokens de sesión): ubicación y filas armadas a mano desde el .md con tools/armar-a-mano.mjs
tools/cargar.mjs (2026-10-26). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

## 2021

### Ingresos

```text
2021: cargado por tools/cargar.mjs (2026-10-26) desde Clubes/Colombia/La Equidad/siis-estado-2021.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Colombia/La Equidad/siis-estado-2021.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Ingresos de actividades ordinarias | pág. 1, precedente |
| 2 | Otros ingresos | pág. 1, Jev 0.96 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Costo de ventas | pág. 1, Claude 0.88 |
| 2 | Gastos de ventas | pág. 1, Claude 0.85 |
| 3 | Gastos de administración | pág. 1, Jev 1 |
| 4 | Otros gastos | pág. 1, Jev 0.97 |

### Meta

```text
2021: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-26): filas-a-mano. Claude 2026-10-26 (tokens de sesión): ubicación y filas armadas a mano desde el .md con tools/armar-a-mano.mjs
tools/cargar.mjs (2026-10-26). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"), con su tipo; la página marca «s/d» en las categorías que esa línea esconde y explica el caso en «Notas sobre este club».
```

```text
tools/dentro-de-otro.mjs (2026-10-26): posiblemente dentro de otro rubro, por precedente del club (la fila tiene plata en sus balances desglosados 2016, 2020, 2022, 2025)
```

### Liga

```text
tools/cargar.mjs (2026-10-26): co-primeraA, verificado contra roster cacheado de "2021 Liga DIMAYOR" (tools/club-league-reference/co.json), coincidencia exacta "La Equidad".
```

## 2020

### Ingresos

```text
2020: cargado por tools/cargar.mjs (2026-10-26) desde Clubes/Colombia/La Equidad/siis-estado-2020.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Colombia/La Equidad/siis-estado-2020.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Taquilla - Venta de Boleteria | pág. 1, Jev 1 |
| 2 | Escuelas de Futbol | pág. 1, Jev 1 |
| 3 | Venta y Prestamo de Derechos | pág. 1, Jev 1 |
| 4 | Publicidad y Propaganda | pág. 1, Jev 1 |
| 5 | Dimayor | pág. 1, Jev 1 |
| 6 | Federacion Colombiana de Futbol | pág. 1, Jev 0.93 |
| 7 | Patrocinio | pág. 1, Jev 1 |
| 8 | Cuota de Sostenimiento | pág. 1, Jev 1 |
| 9 | Venta de Artículos Deportivos | pág. 1, Jev 1 |
| 10 | Eventos | pág. 1, ? 0.6 |
| 11 | Devoluciones en Ventas | pág. 1, Jev 0.98 |
| 12 | Actividades Conexas | pág. 1, Jev 0.96 |
| 13 | Ingresos Fuerzas Basicas | pág. 1, Jev 0.96 |
| 14 | Construcciones y Edificaciones | pág. 1, ? 0.6 |
| 15 | Reintegro de Otros Costos y Gastos | pág. 1, Jev 1 |
| 16 | Recobro Incapacidades | pág. 1, Jev 0.97 |
| 17 | Ingresos de Ejercicios Anteriores | pág. 1, Jev 0.99 |
| 18 | Aprovechamientos | pág. 1, Jev 0.96 |
| 19 | Subvenciones del Estado | pág. 1, Jev 0.99 |
| 20 | Ajuste al Peso | pág. 1, Jev 1 |
| 21 | Donanciones Derechos Deportivos | pág. 1, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Costo de ventas | pág. 1, precedente |
| 2 | Gastos de ventas | pág. 1, Claude 0.85 |
| 3 | Gastos de administración | pág. 1, Jev 1 |
| 4 | Otros gastos | pág. 1, precedente |

### Meta

```text
2020: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-26): filas-a-mano. Claude 2026-10-26 (tokens de sesión): ubicación y filas armadas a mano desde el .md con tools/armar-a-mano.mjs
tools/cargar.mjs (2026-10-26). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"), con su tipo; la página marca «s/d» en las categorías que esa línea esconde y explica el caso en «Notas sobre este club».
```

```text
tools/dentro-de-otro.mjs (2026-10-26): posiblemente dentro de otro rubro, por precedente del club (la fila tiene plata en sus balances desglosados 2016, 2022, 2025)
```

## 2019

### Ingresos

```text
2019: cargado por tools/cargar.mjs (2026-10-26) desde Clubes/Colombia/La Equidad/siis-estado-2019.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Colombia/La Equidad/siis-estado-2019.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Ingresos de actividades ordinarias | pág. 1, precedente |
| 2 | Otros ingresos | pág. 1, Jev 0.96 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Costo de ventas | pág. 1, Claude 0.88 |
| 2 | Gastos de ventas | pág. 1, Claude 0.85 |
| 3 | Gastos de administración | pág. 1, Jev 1 |
| 4 | Otros gastos | pág. 1, Jev 0.97 |

### Meta

```text
2019: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-26): filas-a-mano. Claude 2026-10-26 (tokens de sesión): ubicación y filas armadas a mano desde el .md con tools/armar-a-mano.mjs
tools/cargar.mjs (2026-10-26). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"), con su tipo; la página marca «s/d» en las categorías que esa línea esconde y explica el caso en «Notas sobre este club».
```

```text
tools/dentro-de-otro.mjs (2026-10-26): posiblemente dentro de otro rubro, por precedente del club (la fila tiene plata en sus balances desglosados 2016, 2020, 2022, 2025)
```

### Liga

```text
tools/cargar.mjs (2026-10-26): co-primeraA, verificado contra roster cacheado de "2019 Categoría Primera A season" (tools/club-league-reference/co.json), coincidencia exacta "La Equidad".
```

## 2018

### Ingresos

```text
2018: cargado por tools/cargar.mjs (2026-10-26) desde Clubes/Colombia/La Equidad/siis-estado-2018.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Colombia/La Equidad/siis-estado-2018.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Ingresos de actividades ordinarias | pág. 1, precedente |
| 2 | Otros ingresos | pág. 1, Jev 0.96 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Costo de ventas | pág. 1, Claude 0.88 |
| 2 | Gastos de ventas | pág. 1, Claude 0.85 |
| 3 | Gastos de administración | pág. 1, Jev 1 |
| 4 | Otros gastos | pág. 1, Jev 0.97 |

### Meta

```text
2018: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-26): filas-a-mano. Claude 2026-10-26 (tokens de sesión): ubicación y filas armadas a mano desde el .md con tools/armar-a-mano.mjs
tools/cargar.mjs (2026-10-26). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"), con su tipo; la página marca «s/d» en las categorías que esa línea esconde y explica el caso en «Notas sobre este club».
```

```text
tools/dentro-de-otro.mjs (2026-10-26): posiblemente dentro de otro rubro, por precedente del club (la fila tiene plata en sus balances desglosados 2016, 2020, 2022, 2025)
```

### Liga

```text
tools/cargar.mjs (2026-10-26): co-primeraA, verificado contra roster cacheado de "2018 Categoría Primera A season" (tools/club-league-reference/co.json), coincidencia exacta "La Equidad".
```

## 2017

### Ingresos

```text
2017: cargado por tools/cargar.mjs (2026-10-26) desde Clubes/Colombia/La Equidad/siis-estado-2017.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Colombia/La Equidad/siis-estado-2017.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Ingresos de actividades ordinarias | pág. 1, precedente |
| 2 | Otros ingresos | pág. 1, Jev 0.96 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Costo de ventas | pág. 1, Claude 0.88 |
| 2 | Gastos de ventas | pág. 1, Claude 0.85 |
| 3 | Gastos de administración | pág. 1, Jev 1 |
| 4 | Otros gastos | pág. 1, Jev 0.97 |

### Meta

```text
2017: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-26): filas-a-mano. Claude 2026-10-26 (tokens de sesión): ubicación y filas armadas a mano desde el .md con tools/armar-a-mano.mjs
tools/cargar.mjs (2026-10-26). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"), con su tipo; la página marca «s/d» en las categorías que esa línea esconde y explica el caso en «Notas sobre este club».
```

```text
tools/dentro-de-otro.mjs (2026-10-26): posiblemente dentro de otro rubro, por precedente del club (la fila tiene plata en sus balances desglosados 2016, 2020, 2022, 2025)
```

### Liga

```text
tools/cargar.mjs (2026-10-26): co-primeraA, verificado contra roster cacheado de "2017 Categoría Primera A season" (tools/club-league-reference/co.json), coincidencia exacta "La Equidad".
```

## 2016

### Ingresos

```text
2016: cargado por tools/cargar.mjs (2026-10-26) desde Clubes/Colombia/La Equidad/siis-estado-2016.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Colombia/La Equidad/siis-estado-2016.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Venta de boletería | pág. 1, Jev 1 |
| 2 | Escuelas de futbol | pág. 1, Jev 1 |
| 3 | Venta y prestamos de derechos deportivos | pág. 1, Jev 1 |
| 4 | Publicidad y propaganda | pág. 1, Jev 1 |
| 5 | Dimayor | pág. 1, Jev 1 |
| 6 | Federacion Colombiana de Futbol | pág. 1, Jev 0.93 |
| 7 | Patrocinio | pág. 1, Jev 1 |
| 8 | Participacion eventos nacionales | pág. 1, Jev 1 |
| 9 | Venta de articulos deportivos | pág. 1, Jev 1 |
| 10 | Enseñansa | pág. 1, Jev 0.93 |
| 11 | Arrendamientos (Otros ingresos) | pág. 1, Claude 0.85 |
| 12 | Recuperaciones | pág. 1, Jev 1 |
| 13 | Aprovechamientos | pág. 1, Jev 0.96 |
| 14 | Ingresos elementos perdidos | pág. 1, Jev 0.93 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Costo de ventas | pág. 1, precedente |
| 2 | Gastos de personal | pág. 1, precedente |
| 3 | Honorarios | pág. 1, precedente |
| 4 | Impuestos | pág. 1, Jev 0.98 |
| 5 | Arrendamientos (Gastos de ventas) | pág. 1, Jev 0.95 |
| 6 | Seguros | pág. 1, Claude 0.8 |
| 7 | Servicios | pág. 1, Jev 0.92 |
| 8 | Gastos Legales | pág. 1, Jev 0.99 |
| 9 | Mantenimiento y reparaciones | pág. 1, Jev 0.95 |
| 10 | Adecuación e instalación | pág. 1, precedente |
| 11 | Gastos de viaje | pág. 1, Jev 1 |
| 12 | Amortizaciones | pág. 1, precedente |
| 13 | Depreciaciones | pág. 1, Jev 1 |
| 14 | Gastos Derechos Deportivos | pág. 1, Jev 0.97 |
| 15 | Comisiones (Gastos de ventas) | pág. 1, precedente |
| 16 | Gastos de representación | pág. 1, Jev 0.98 |
| 17 | Elementos de aseo y cafetería | pág. 1, Jev 0.96 |
| 18 | Utiles y papelería | pág. 1, Jev 0.96 |
| 19 | Casino y restaurantes | pág. 1, precedente |
| 20 | Logística y eventos | pág. 1, Jev 0.93 |
| 21 | Implementos deportivos | pág. 1, precedente |
| 22 | Inscripción en torneos | pág. 1, Jev 1 |
| 23 | Sanciones jugadores | pág. 1, ? 0.6 |
| 24 | Tramites liga | pág. 1, precedente |
| 25 | Medicamentos | pág. 1, precedente |
| 26 | Logística partidos local | pág. 1, Jev 1 |
| 27 | Provisiones | pág. 1, precedente |
| 28 | Fotografías | pág. 1, ? 0.5 |
| 29 | Diversos (Gastos de ventas) | pág. 1, Jev 0.99 |
| 30 | Gastos de administración | pág. 1, Jev 1 |
| 31 | Gastos Financieros | pág. 1, Jev 0.97 |
| 32 | Comisiones (Otros gastos) | pág. 1, ? 0.6 |
| 33 | Costos y gastos procesos jurídicos | pág. 1, precedente |
| 34 | Diferencia en cambio | pág. 1, precedente |
| 35 | Impuestos asumidos | pág. 1, precedente |
| 36 | Multas, sanciones y litigios | pág. 1, Claude 0.85 |
| 37 | Diversos (Otros gastos) | pág. 1, Jev 1 |
| 38 | GMF | pág. 1, Jev 0.92 |

### Meta

```text
2016: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-26): filas-a-mano. Claude 2026-10-26 (tokens de sesión): ubicación y filas armadas a mano desde el .md con tools/armar-a-mano.mjs
tools/cargar.mjs (2026-10-26). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

## Fuentes

### laequidad-co-siis-estado-2023

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-26) desde la transcripción Clubes/Colombia/La Equidad/siis-estado-2023.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### laequidad-co-siis-estado-2024

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-26) desde la transcripción Clubes/Colombia/La Equidad/siis-estado-2024.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### laequidad-co-siis-estado-2025

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-26) desde la transcripción Clubes/Colombia/La Equidad/siis-estado-2025.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### laequidad-co-siis-estado-2016

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-26) desde la transcripción Clubes/Colombia/La Equidad/siis-estado-2016.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### laequidad-co-siis-estado-2017

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-26) desde la transcripción Clubes/Colombia/La Equidad/siis-estado-2017.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### laequidad-co-siis-estado-2018

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-26) desde la transcripción Clubes/Colombia/La Equidad/siis-estado-2018.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### laequidad-co-siis-estado-2019

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-26) desde la transcripción Clubes/Colombia/La Equidad/siis-estado-2019.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### laequidad-co-siis-estado-2020

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-26) desde la transcripción Clubes/Colombia/La Equidad/siis-estado-2020.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### laequidad-co-siis-estado-2021

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-26) desde la transcripción Clubes/Colombia/La Equidad/siis-estado-2021.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### laequidad-co-siis-estado-2022

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-26) desde la transcripción Clubes/Colombia/La Equidad/siis-estado-2022.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```
