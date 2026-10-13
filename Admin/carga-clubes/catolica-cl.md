# catolica-cl — evidencia de carga

Lo que había como comentario en `data/cl/catolica-cl-data.js`, movido tal cual por `tools/archivo/mover-comentarios-data.mjs` (la regla:
`Admin/CONVENCIONES-DATOS.md`, "data/<país>/<club>-data.js NO LLEVA COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y
meta. Las notas de cada fila van en una tabla con su número de fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
============================================================================
data/cl/catolica-cl-data.js — Cruzados S.A.D.P. (Universidad Católica, Santiago,
Chile). clubId lleva el sufijo `-cl` (NO `catolica` a secas) porque hay una
Universidad Católica de ECUADOR sourceándose en paralelo (otro club, otro
país) — ver `CONVENCIONES.md` Versión 129: todo clubId nuevo que pueda
colisionar con otro club homónimo de otro país lleva el país al final.
Ejercicios 2024, 2023 y 2022 = REALES (balance auditado consolidado), los 3
del mismo tipo de documento.

FUENTE: `Clubes/Chile/Universidad Catolica (Cruzados)/estados-financieros-
<año>.md` (transcripción de texto nativo vía pdftotext -layout, no
escaneados salvo 2009 que no se usa acá), "Estados Financieros Consolidados
[...] Cruzados S.A.D.P." RUT 76.072.469-6, bajados de cruzados.cl/
inversionistas/. Cada balance trae 2 columnas (año corriente + comparativo
del año anterior); para cada ejercicio cargado se usó SIEMPRE la columna
"año corriente" de SU PROPIO documento, nunca la columna comparativa de un
balance posterior (ver club-data-mapping SKILL.md sección 6, regla 5).
Se verificó que Chile NO reexpresa por inflación entre ejercicios (a
diferencia de la "moneda homogénea" argentina): la columna comparativa
2023 del balance 2024 coincide EXACTO, línea por línea, con la columna
"año corriente" del balance 2023 propio (y lo mismo 2022 balance-2023 vs.
balance-2022 propio) — con una única excepción menor, ver nota de
"Ingresos por Ventas de Productos Tienda UC" / "Ingresos por Derechos de
Merchandising" más abajo (reclasificación entre 2 sub-líneas que mapean a
la MISMA normalizedCategory, no afecta ningún total).

Cifras del documento en MILES de pesos chilenos (M$, tal cual se indica en
el encabezado "Miles de pesos" del Estado de Situación Financiera y del
Estado de Resultados). Acá se guardan divididas por 1.000, en MILLONES de
CLP nativos (mismo criterio que ya usa el sitio para COP de Once Caldas).

REVENUE: Nota 19 "Ingresos Ordinarios" da 7 líneas (Ingresos por A.N.F.P.,
Derechos de TV, Borderó/Recaudación de Entradas, Préstamo de Jugadores,
venta de Jugadores, Derechos de Solidaridad, Otros) que suman "Ingresos por
Recaudación y otros", más UN SOLO monto agregado "Ingresos Comerciales" sin
desglosar en la Nota 19 misma. El desglose real de "Ingresos Comerciales"
(Cuotas Socios Fútbol / Matrículas de Escuelas de Fútbol / Publicidad y
Auspicios / Ventas de Productos Tienda UC / Derechos de Merchandising) sale
de la Nota 23 "Información por Segmentos" (columna "Comerciales"), que
reporta el mismo Estado de Resultados completo partido en 2 segmentos
(Recaudaciones / Comerciales) — así que NINGUNA línea de ingreso quedó sin
desglosar acá (a diferencia de otros clubes de este skill donde un "bolsón"
sin abrir es aceptable). "Otros ingresos por función" (debajo de la
Ganancia Bruta en el Estado de Resultados, no forma parte de "Ingresos de
actividades ordinarias") se suma aparte como revenueLine `other_income`,
mismo criterio que Once Caldas con su Nota 25 "Otros Ingresos".

Categorización (ver club-data-mapping SKILL.md sección 1 para el criterio
general):
  - Ingresos por A.N.F.P. → `broadcasting`. El propio documento aclara en
    nota al pie que es la porción de derechos de TV que la ANFP rinde
    mensualmente por el contrato colectivo de televisación ("percibió parte
    del contrato de licenciamiento de los derechos de televisación
    mediante la rendición de cuentas... que la ANFP debe realizar producto
    del mandato a nombre propio"), es decir, es TV, aunque el rótulo no lo
    diga explícito.
  - Ingresos por Derechos de TV → `broadcasting` (línea de TV separada,
    más chica; probablemente reventa/rebroadcast internacional, el
    documento no lo aclara más).
  - Ingresos por Borderó (Recaudación Entradas) → `matchday_competition`.
  - Ingresos por Préstamo de Jugadores / venta de Jugadores / Derechos de
    Solidaridad → `player_sales` (mismo criterio que Once Caldas: préstamos
    y solidaridad FIFA van junto con venta de jugadores, todos son
    "actividad de mercado de pases").
  - Otros (Nota 19) → `other_income`.
  - Ingresos Cuotas Socios Fútbol → `member_dues`.
  - Ingresos Matrículas de Escuelas de Fútbol → `youth_football` (escuela
    de FÚTBOL, no colegio/educación general — ver la distinción explícita
    de club-data-mapping sección 1: `education` es para un colegio/
    enseñanza general, esto es una academia de fútbol juvenil).
  - Ingresos por Publicidad y Auspicios / Ventas de Productos Tienda UC /
    Derechos de Merchandising → `sponsorship_commercial` (sponsors +
    merchandising, mismo criterio que Once Caldas con "Publicidad" +
    "Venta de artículos deportivos").
  - Otros ingresos por función → `other_income`.

NOTA sobre una reclasificación entre ejercicios (no afecta ningún total):
el balance 2024 (columna comparativa 2023) reporta "Ventas de Productos
Tienda UC" $370.123 / "Derechos de Merchandising" $304.735 para 2023,
mientras que el balance 2023 propio (Nota 23) reporta $375.270 / $299.589
para esos mismos 2 conceptos en el mismo año — una diferencia de ~$5.147
M$ en sentido contrario en cada línea (aprox. una reclasificación entre
las 2 categorías de un año al otro). Como ACÁ las 2 van a la misma
`normalizedCategory` (`sponsorship_commercial`), y el total "Ingresos
Comerciales" es IDÉNTICO en ambos documentos ($7.853.832), esto no afecta
ningún número cargado ni ningún tie-out. Se cargó siempre el valor del
documento PROPIO de cada ejercicio (balance 2023 para 2023, no la
comparativa del balance 2024).

EXPENSES: Nota 20 "Composición de Cuentas de Costo de Ventas (Servicios)"
(9 sub-líneas con categoría real distinta entre sí → promovidas a líneas de
primer nivel, ver club-data-mapping sección 1) + Nota 21 "Gastos de
Administración" (15 sub-líneas, TODAS de naturaleza administrativa/no
deportiva → consolidadas en 1 sola línea `admin_general_expense` con
`items` de desglose, mismo criterio que usó Once Caldas con su propia Nota
de Gastos de Administración) + "Otros Gastos por función" (debajo de la
Ganancia Bruta, aparte de Costo de Ventas/Gastos de Administración, sin
desglose propio → 1 línea `other_expenses`).
  - Remuneraciones (Costo de Ventas) → `wages_squad` (personal del plantel/
    fútbol profesional, la Nota 23 confirma que esta línea es ~93% del
    segmento "Recaudaciones", es decir, plantel, no administración).
  - Gastos de Operación → `other_expenses` (bolsón real: el documento no
    desglosa más, no hay otra nota que lo abra).
  - Amortización pases de jugadores profesionales + Gasto por Préstamo de
    Jugadores + Gasto por Transferencia de Jugadores → `player_amortisation`
    (las 3 son costo del plantel/mercado de pases: amortización contable
    del pase, costo asociado a préstamos salientes, y costo de adquirir/
    transferir jugadores — mismo bucket "Compra de jugadores" de Formato
    Simplificado, igual que Racing/Once Caldas).
  - Amortización Concesión → `other_amortisation` (amortización de un
    intangible de concesión, no relacionado al plantel).
  - Gastos de torneos y otros → `match_organisation_expense`.
  - Depreciación → `depreciation`.
  - Costos de ventas productos (COGS de la tienda/merchandising, pareja de
    "Ingresos por Ventas de Productos Tienda UC") → `other_expenses` (mismo
    mapeo que usó Once Caldas para su "Costo de Ventas productos
    deportivos").
  - Gastos de Administración (consolidado) → `admin_general_expense`.
  - Otros Gastos por función → `other_expenses`.

RESULTADOS FINANCIEROS: Ingresos financieros - Costos financieros -
Diferencias de cambio, netos, a `fiscalYearMeta[year].netInterest` (NUNCA
como línea, ver club-data-mapping sección 2). El propio Estado de
Resultados imprime "Ingreso (Gasto) por impuestos a las ganancias" = $0 en
los 3 ejercicios (2022/2023/2024) — a `fiscalYearMeta[year].tax = 0`, no un
residuo estimado (a diferencia de Once Caldas, acá el documento SÍ imprime
el impuesto explícito, línea por línea, en el propio Estado de Resultados).

VERIFICACIÓN (club-data-mapping sección 6), los 3 ejercicios cierran EXACTO
contra el documento propio de cada año, ver detalle numérico completo en
el reporte de la sesión de carga. Resumen:
  2024: revenue 21.223,767 = officialTotalRevenue; expenses 21.072,707 =
    officialTotalExpenses; revenue+expenses+netInterest+tax = -1.353,760 =
    officialPAT ("Ganancia (Pérdida)" impresa).
  2023: revenue 16.208,365; expenses 18.898,194; resultado -2.070,007.
  2022: revenue 23.810,928; expenses 21.410,964; resultado 1.251,440.

TIPO DE CAMBIO: el documento tiene una Nota 25 "Moneda Extranjera" (activos
y pasivos en USD/EUR), pero a diferencia de los balances argentinos, NO
declara ningún tipo de cambio propio de cierre (ni una columna "Tipo de
Cambio" ni un valor puntual, los montos ya vienen convertidos a M$ sin
mostrar la tasa usada) — se buscó explícito con "tipo de cambio"/"moneda
extranjera" en los 3 documentos, ninguno lo declara. Por eso se usa el
dólar observado SII de cierre de cada ejercicio, `fx` LITERAL con
`fxSource:'market_approx'` (2022 $859,51; 2023 $884,59; 2024 $992,12, día
hábil más cercano al 31/12 en los 3 casos) — NO un `fxRef` a FX_CLOSE en
data/currency-map.js, porque esa tabla es solo para cotizaciones EXACTAS
(`market_close`); una `market_approx` se queda literal en el archivo del
club para que nadie la reuse creyendo que es un cierre oficial (ver el
comentario de esa regla en currency-map.js).

grossDebt/cash: a diferencia de Once Caldas (que no traía el Estado de
Situación Financiera primario), este documento SÍ lo incluye completo.
`cash` = "Efectivo y equivalentes al efectivo" (activo corriente).
`grossDebt` = "Otros pasivos financieros" corrientes + no corrientes (Nota
17, deuda financiera real: bonos/préstamos) — se usó esta línea más
angosta, NO el "TOTAL PASIVOS" completo, porque el balance SÍ separa la
deuda financiera de otras categorías de pasivo (cuentas por pagar
comerciales, provisiones por beneficios a empleados, pasivos por
impuestos) — mismo criterio que ya usa Boca/Vélez (ver club-data-mapping/referencia/formato-simplificado.md, "grossDebt").
============================================================================
```

## 2025

### Ingresos

```text
2025: cargado por tools/cargar.mjs (2026-10-01) desde Clubes/Chile/Universidad Catolica (Cruzados)/estados-financieros-2025.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Chile/Universidad Catolica (Cruzados)/estados-financieros-2025.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Ingresos por A.N.F.P. | pág. 73, precedente |
| 2 | Ingresos Derechos de TV Internacional | pág. 73, Jev 1 |
| 3 | Ingresos por Borderó (Recaudación Entradas) | pág. 73, precedente |
| 4 | Ingresos Publicidad y Auspicios | pág. 73, Jev 1 |
| 5 | Ingresos por Préstamo de Jugadores | pág. 73, precedente |
| 6 | Ingresos por venta de Jugadores | pág. 73, precedente |
| 7 | Ingresos por Derechos de Solidaridad | pág. 73, precedente |
| 8 | Otros | pág. 73, precedente |
| 9 | Ingresos Arriendos y Concesiones | pág. 77, Jev 0.93 |
| 10 | Ingresos E-Commerce | pág. 77, Jev 0.99 |
| 11 | Ingresos Escuelas de Fútbol | pág. 77, Jev 0.99 |
| 12 | Ingresos Publicidad y Auspicios | pág. 77, Jev 1 |
| 13 | Ingresos Membresía de Socios | pág. 77, Jev 1 |
| 14 | Ingresos Derechos de Merchandising | pág. 77, Jev 1 |
| 15 | Otros | pág. 77, precedente |
| 16 | Otros ingresos por función | pág. 9, precedente |

### Gastos

```text
tools/cargar.mjs (2026-10-01)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Remuneraciones | pág. 77, precedente |
| 2 | Gastos de Operación | pág. 77, precedente |
| 3 | Amortización Pases de Jugadores Profesionales | pág. 77, precedente |
| 4 | Amortización Concesión | pág. 77, precedente |
| 5 | Gastos de Torneos y otros | pág. 77, precedente |
| 6 | Gasto Arriendo de Pases | pág. 77, Claude 0.88 |
| 7 | Gasto Transferencia de Jugadores | pág. 77, Jev 0.95 |
| 8 | Depreciación | pág. 77, precedente |
| 9 | Costos de Ventas por Eventos | pág. 77, precedente |
| 10 | Costos de Ventas Productos | pág. 77, precedente |
| 11 | Otros Gastos por función | pág. 9, precedente |
| 12 | Remuneración | pág. 76, Claude 0.85 |
| 13 | Indemnización | pág. 76, Jev 0.93 |
| 14 | Gastos Generales | pág. 76, Jev 1 |
| 15 | Transporte | pág. 76, precedente |
| 16 | Servicios Contratados | pág. 76, Claude 0.8 |
| 17 | Arriendo de Bienes | pág. 76, precedente |
| 18 | Gastos Notariales y Judiciales | pág. 76, Jev 0.99 |
| 19 | Servicios de Terceros | pág. 76, Claude 0.8 |
| 20 | Materiales de Mantencion y Reparación | pág. 76, Claude 0.8 |
| 21 | Seguros | pág. 76, Jev 0.96 |
| 22 | Asesorias y Capacitación | pág. 76, Jev 0.99 |
| 23 | Consumo Básico | pág. 76, Jev 0.91 |
| 24 | Patentes y Contribuciones | pág. 76, Jev 0.91 |
| 25 | Provisión No Operacionales | pág. 76, precedente |
| 26 | Materiales de Oficina y Otros | pág. 76, Jev 0.96 |

### Meta

```text
tools/cargar.mjs (2026-10-01). grossDebt/cash: no se leen por script todavía (null = sin dato). netInterest/tax: filas de resultado financiero / impuesto del estado.
tools/caja-deuda.mjs (2026-10-02): grossDebt escalón 0 (compuerta: año anterior): "Otros pasivos financieros, corrientes" pág. 8 + "Otros pasivos financieros, no corrientes" pág. 8; cash escalón 0 (compuerta: año anterior): "Efectivo y equivalentes al efectivo" pág. 7
```

## 2024

### Ingresos

```text
2024: cargado por tools/cargar.mjs (2026-10-02) desde Clubes/Chile/Universidad Catolica (Cruzados)/estados-financieros-2024.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Chile/Universidad Catolica (Cruzados)/estados-financieros-2024.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Ingresos por A.N.F.P. | pág. 87, precedente |
| 2 | Ingresos por Derechos de TV | pág. 87, precedente |
| 3 | Ingresos por Borderó (Recaudación Entradas) | pág. 87, precedente |
| 4 | Ingresos por Préstamo de Jugadores | pág. 87, precedente |
| 5 | Ingresos por venta de Jugadores | pág. 87, precedente |
| 6 | Ingresos por Derechos de Solidaridad | pág. 87, precedente |
| 7 | Otros | pág. 87, precedente |
| 8 | Ingresos Cuotas Socios Fútbol | pág. 91, precedente |
| 9 | Ingresos Matrículas de Escuelas de Fútbol | pág. 91, precedente |
| 10 | Ingresos por Publicidad y Auspicios | pág. 91, precedente |
| 11 | Ingresos por Ventas de Productos Tienda UC | pág. 91, precedente |
| 12 | Ingresos por Derechos de Merchandising | pág. 91, precedente |
| 13 | Otros ingresos por función | pág. 9, precedente |

### Gastos

```text
tools/cargar.mjs (2026-10-02)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Remuneraciones | pág. 89, precedente |
| 2 | Gastos de Operación | pág. 89, precedente |
| 3 | Amortización pases de jugadores profesionales (*) | pág. 89, precedente |
| 4 | Amortización Concesión | pág. 89, precedente |
| 5 | Gastos de torneos y otros | pág. 89, precedente |
| 6 | Gasto por Préstamo de Jugadores | pág. 89, precedente |
| 7 | Gasto por Transferencia de Jugadores | pág. 89, precedente |
| 8 | Depreciación | pág. 89, precedente |
| 9 | Costos de ventas productos | pág. 89, precedente |
| 10 | Otros Gastos por función | pág. 9, precedente |
| 11 | Remuneración | pág. 90, precedente |
| 12 | Indemnización | pág. 90, precedente |
| 13 | Gastos Generales | pág. 90, precedente |
| 14 | Combustible y Lubricantes | pág. 90, precedente |
| 15 | Servicios Contratados | pág. 90, precedente |
| 16 | Servicios de Seguridad | pág. 90, precedente |
| 17 | Servicios de Aseo | pág. 90, precedente |
| 18 | Arriendo de Bienes | pág. 90, precedente |
| 19 | Servicios de Terceros | pág. 90, precedente |
| 20 | Materiales de Mantención y Reparación | pág. 90, precedente |
| 21 | Servicios de Mantención y Reparación | pág. 90, precedente |
| 22 | Patentes y Contribuciones | pág. 90, precedente |
| 23 | Provisión No Operacionales | pág. 90, precedente |
| 24 | Materiales de Oficina y Otros | pág. 90, precedente |
| 25 | Feriado Legal | pág. 90, precedente |

### Meta

```text
tools/cargar.mjs (2026-10-02). grossDebt/cash: no se leen por script todavía (null = sin dato). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

## 2023

### Ingresos

```text
2023: cargado por tools/cargar.mjs (2026-10-02) desde Clubes/Chile/Universidad Catolica (Cruzados)/estados-financieros-2023.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Chile/Universidad Catolica (Cruzados)/estados-financieros-2023.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Ingresos por A.N.F.P. | pág. 84, precedente |
| 2 | Ingresos por Derechos de TV | pág. 84, precedente |
| 3 | Ingresos por Borderó (Recaudación Entradas) | pág. 84, precedente |
| 4 | Ingresos por Préstamo de Jugadores | pág. 84, precedente |
| 5 | Ingresos por venta de Jugadores | pág. 84, precedente |
| 6 | Ingresos por Derechos de Solidaridad | pág. 84, precedente |
| 7 | Otros | pág. 84, precedente |
| 8 | Ingresos Cuotas Socios Fútbol | pág. 88, precedente |
| 9 | Ingresos Matrículas de Escuelas de Fútbol | pág. 88, precedente |
| 10 | Ingresos por Publicidad y Auspicios | pág. 88, precedente |
| 11 | Ingresos por Ventas de Productos Tienda UC | pág. 88, precedente |
| 12 | Ingresos por Derechos de Merchandising | pág. 88, precedente |
| 13 | Otros ingresos por función | pág. 9, precedente |

### Gastos

```text
tools/cargar.mjs (2026-10-02)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Remuneraciones | pág. 86, precedente |
| 2 | Gastos de Operación | pág. 86, precedente |
| 3 | Amortización pases de jugadores profesionales (*) | pág. 86, precedente |
| 4 | Amortización Concesión | pág. 86, precedente |
| 5 | Gastos de torneos y otros | pág. 86, precedente |
| 6 | Gasto por Préstamo de Jugadores | pág. 86, precedente |
| 7 | Gasto por Transferencia de Jugadores | pág. 86, precedente |
| 8 | Depreciación | pág. 86, precedente |
| 9 | Costos de ventas productos | pág. 86, precedente |
| 10 | Otros Gastos por función | pág. 9, precedente |
| 11 | Remuneración | pág. 87, precedente |
| 12 | Indemnización | pág. 87, precedente |
| 13 | Gastos Generales | pág. 87, precedente |
| 14 | Combustible y Lubricantes | pág. 87, precedente |
| 15 | Servicios Contratados | pág. 87, precedente |
| 16 | Servicios de Seguridad | pág. 87, precedente |
| 17 | Servicios de Aseo | pág. 87, precedente |
| 18 | Arriendo de Bienes | pág. 87, precedente |
| 19 | Servicios de Terceros | pág. 87, precedente |
| 20 | Materiales de Mantención y Reparación | pág. 87, precedente |
| 21 | Servicios de Mantención y Reparación | pág. 87, precedente |
| 22 | Patentes y Contribuciones | pág. 87, precedente |
| 23 | Provisión No Operacionales | pág. 87, precedente |
| 24 | Materiales de Oficina y Otros | pág. 87, precedente |
| 25 | Feriado Legal | pág. 87, precedente |

### Meta

```text
tools/cargar.mjs (2026-10-02). grossDebt/cash: no se leen por script todavía (null = sin dato). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

## 2022

### Ingresos

```text
2022: cargado por tools/cargar.mjs (2026-10-02) desde Clubes/Chile/Universidad Catolica (Cruzados)/estados-financieros-2022.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Chile/Universidad Catolica (Cruzados)/estados-financieros-2022.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Ingresos por A.N.F.P. | pág. 83, precedente |
| 2 | Ingresos por Derechos de TV | pág. 83, precedente |
| 3 | Ingresos por Borderó (Recaudación Entradas) | pág. 83, precedente |
| 4 | Ingresos por Préstamo de Jugadores | pág. 83, precedente |
| 5 | Ingresos por venta de Jugadores | pág. 83, precedente |
| 6 | Ingresos por Derechos de Solidaridad | pág. 83, precedente |
| 7 | Otros | pág. 83, precedente |
| 8 | Ingresos Cuotas Socios Fútbol | pág. 87, precedente |
| 9 | Ingresos Matrículas de Escuelas de Fútbol | pág. 87, precedente |
| 10 | Ingresos por Publicidad y Auspicios | pág. 87, precedente |
| 11 | Ingresos por Ventas de Productos Tienda UC | pág. 87, precedente |
| 12 | Ingresos por Derechos de Merchandising | pág. 87, precedente |
| 13 | Otros ingresos por función | pág. 8, precedente |

### Gastos

```text
tools/cargar.mjs (2026-10-02)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Remuneraciones | pág. 85, precedente |
| 2 | Gastos de Operación | pág. 85, precedente |
| 3 | Amortización pases de jugadores profesionales (*) | pág. 85, precedente |
| 4 | Amortización Concesión | pág. 85, precedente |
| 5 | Gastos de torneos y otros | pág. 85, precedente |
| 6 | Gasto por Préstamo de Jugadores | pág. 85, precedente |
| 7 | Gasto por Transferencia de Jugadores | pág. 85, precedente |
| 8 | Depreciación | pág. 85, precedente |
| 9 | Costos de ventas productos | pág. 85, precedente |
| 10 | Otros Gastos por función | pág. 8, precedente |
| 11 | Remuneración | pág. 86, precedente |
| 12 | Indemnización | pág. 86, precedente |
| 13 | Gastos Generales | pág. 86, precedente |
| 14 | Combustible y Lubricantes | pág. 86, precedente |
| 15 | Servicios Contratados | pág. 86, precedente |
| 16 | Servicios de Seguridad | pág. 86, precedente |
| 17 | Servicios de Aseo | pág. 86, precedente |
| 18 | Arriendo de Bienes | pág. 86, precedente |
| 19 | Servicios de Terceros | pág. 86, precedente |
| 20 | Materiales de Mantención y Reparación | pág. 86, precedente |
| 21 | Servicios de Mantención y Reparación | pág. 86, precedente |
| 22 | Patentes y Contribuciones | pág. 86, precedente |
| 23 | Provisión No Operacionales | pág. 86, precedente |
| 24 | Materiales de Oficina y Otros | pág. 86, precedente |
| 25 | Feriado Legal | pág. 86, precedente |

### Meta

```text
tools/cargar.mjs (2026-10-02). grossDebt/cash: no se leen por script todavía (null = sin dato). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

## 2021

### Ingresos

```text
2021: cargado por tools/cargar.mjs (2026-10-01) desde Clubes/Chile/Universidad Catolica (Cruzados)/estados-financieros-2021.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Chile/Universidad Catolica (Cruzados)/estados-financieros-2021.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Ingresos por A.N.F.P. | pág. 77, precedente |
| 2 | Ingresos por Derechos de TV | pág. 77, precedente |
| 3 | Ingresos por Borderó (Recaudación Entradas) | pág. 77, precedente |
| 4 | Ingresos por Préstamo de Jugadores | pág. 77, precedente |
| 5 | Ingresos por venta de Jugadores | pág. 77, precedente |
| 6 | Ingresos por Derechos de Solidaridad | pág. 77, precedente |
| 7 | Otros | pág. 77, precedente |
| 8 | Ingresos Cuotas Socios Fútbol | pág. 82, precedente |
| 9 | Ingresos Matrículas de Escuelas de Fútbol | pág. 82, precedente |
| 10 | Ingresos por Publicidad y Auspicios | pág. 82, precedente |
| 11 | Ingresos por Ventas de Productos Tienda UC | pág. 82, precedente |
| 12 | Ingresos por Derechos de Merchandising | pág. 82, precedente |
| 13 | Otros ingresos por función | pág. 8, precedente |

### Gastos

```text
tools/cargar.mjs (2026-10-01)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Remuneraciones | pág. 80, precedente |
| 2 | Gastos de Operación | pág. 80, precedente |
| 3 | Amortización pases de jugadores profesionales (*) | pág. 80, precedente |
| 4 | Amortización Concesión | pág. 80, precedente |
| 5 | Gastos de torneos y otros | pág. 80, precedente |
| 6 | Gasto por Préstamo de Jugadores | pág. 80, precedente |
| 7 | Gasto por Transferencia de Jugadores | pág. 80, precedente |
| 8 | Depreciación | pág. 80, precedente |
| 9 | Costos de ventas productos | pág. 80, precedente |
| 10 | Otros Gastos por función | pág. 8, precedente |
| 11 | Remuneración | pág. 81, precedente |
| 12 | Indemnización | pág. 81, precedente |
| 13 | Gastos Generales | pág. 81, precedente |
| 14 | Combustible y Lubricantes | pág. 81, Jev 0.91 |
| 15 | Servicios Contratados | pág. 81, precedente |
| 16 | Servicios de Seguridad | pág. 81, Jev 0.99 |
| 17 | Servicios de Aseo | pág. 81, Claude 0.8 |
| 18 | Arriendo de Bienes | pág. 81, precedente |
| 19 | Servicios de Terceros | pág. 81, precedente |
| 20 | Materiales de Mantención y Reparación | pág. 81, precedente |
| 21 | Servicios de Mantención y Reparación | pág. 81, Claude 0.8 |
| 22 | Patentes y Contribuciones | pág. 81, precedente |
| 23 | Materiales de Oficina y Otros | pág. 81, precedente |
| 24 | Feriado Legal | pág. 81, Claude 0.88 |

### Meta

```text
tools/cargar.mjs (2026-10-01). grossDebt/cash: no se leen por script todavía (null = sin dato). netInterest/tax: filas de resultado financiero / impuesto del estado.
tools/caja-deuda.mjs (2026-10-02): grossDebt escalón 0 (compuerta: año anterior): "Otros pasivos financieros, corrientes" pág. 7 + "Otros pasivos financieros, no corrientes" pág. 7; cash escalón 0 (compuerta: año anterior): "Efectivo y equivalentes al efectivo" pág. 6
```

## 2020

### Ingresos

```text
2020: cargado por tools/cargar.mjs (2026-10-01) desde Clubes/Chile/Universidad Catolica (Cruzados)/estados-financieros-2020.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Chile/Universidad Catolica (Cruzados)/estados-financieros-2020.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Ingresos por A.N.F.P. | pág. 74, precedente |
| 2 | Ingresos por Derechos de TV | pág. 74, precedente |
| 3 | Ingresos por Borderó (Recaudación Entradas) | pág. 74, precedente |
| 4 | Ingresos por Préstamo de Jugadores | pág. 74, precedente |
| 5 | Ingresos por venta de Jugadores | pág. 74, precedente |
| 6 | Ingresos por Derechos de Solidaridad | pág. 74, precedente |
| 7 | Otros | pág. 74, precedente |
| 8 | Ingresos Cuotas Socios Fútbol | pág. 79, precedente |
| 9 | Ingresos Matrículas de Escuelas de Fútbol | pág. 79, precedente |
| 10 | Ingresos por Publicidad y Auspicios | pág. 79, precedente |
| 11 | Ingresos por Ventas de Productos Tienda UC | pág. 79, precedente |
| 12 | Ingresos por Derechos de Merchandising | pág. 79, precedente |
| 13 | Otros ingresos por función | pág. 8, precedente |

### Gastos

```text
tools/cargar.mjs (2026-10-01)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Remuneraciones | pág. 77, precedente |
| 2 | Gastos de Operación | pág. 77, precedente |
| 3 | Amortización pases de jugadores profesionales (*) | pág. 77, precedente |
| 4 | Amortización Concesión | pág. 77, precedente |
| 5 | Gastos de torneos y otros | pág. 77, precedente |
| 6 | Gasto por Préstamo de Jugadores | pág. 77, precedente |
| 7 | Gasto por Transferencia de Jugadores | pág. 77, precedente |
| 8 | Depreciación | pág. 77, precedente |
| 9 | Costos de ventas productos | pág. 77, precedente |
| 10 | Otros Gastos por función | pág. 8, precedente |
| 11 | Remuneración | pág. 78, precedente |
| 12 | Gastos Generales | pág. 78, precedente |
| 13 | Combustible y Lubricantes | pág. 78, precedente |
| 14 | Servicios Contratados | pág. 78, precedente |
| 15 | Servicios de Seguridad | pág. 78, precedente |
| 16 | Servicios de Aseo | pág. 78, precedente |
| 17 | Arriendo de Bienes | pág. 78, precedente |
| 18 | Servicios de Terceros | pág. 78, precedente |
| 19 | Materiales de Mantención y Reparación | pág. 78, precedente |
| 20 | Servicios de Mantención y Reparación | pág. 78, precedente |
| 21 | Patentes y Contribuciones | pág. 78, precedente |
| 22 | Provisión No Operacionales | pág. 78, precedente |
| 23 | Materiales de Oficina y Otros | pág. 78, precedente |
| 24 | Feriado Legal | pág. 78, precedente |

### Meta

```text
tools/cargar.mjs (2026-10-01). grossDebt/cash: no se leen por script todavía (null = sin dato). netInterest/tax: filas de resultado financiero / impuesto del estado.
tools/caja-deuda.mjs (2026-10-02): grossDebt escalón 0 (compuerta: documento siguiente): "Otros pasivos financieros, corrientes" pág. 7 + "Otros pasivos financieros, no corrientes" pág. 7; cash escalón 0 (compuerta: año anterior): "Efectivo y equivalentes al efectivo" pág. 6
```

## 2019

### Ingresos

```text
2019: cargado por tools/cargar.mjs (2026-10-01) desde Clubes/Chile/Universidad Catolica (Cruzados)/estados-financieros-2019.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Chile/Universidad Catolica (Cruzados)/estados-financieros-2019.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Ingresos por A.N.F.P. | pág. 70, precedente |
| 2 | Ingresos por Derechos de TV | pág. 70, precedente |
| 3 | Ingresos por Borderó (Recaudación Entradas) | pág. 70, precedente |
| 4 | Ingresos por venta de Jugadores | pág. 70, precedente |
| 5 | Ingresos por Derechos de Solidaridad | pág. 70, precedente |
| 6 | Otros | pág. 70, precedente |
| 7 | Ingresos Cuotas Socios Fútbol | pág. 75, precedente |
| 8 | Ingresos Matrículas de Escuelas de Fútbol | pág. 75, precedente |
| 9 | Ingresos por Publicidad y Auspicios | pág. 75, precedente |
| 10 | Ingresos por Ventas de Productos Tienda UC | pág. 75, precedente |
| 11 | Ingresos por Derechos de Merchandising | pág. 75, precedente |
| 12 | Otros ingresos por función | pág. 8, precedente |

### Gastos

```text
tools/cargar.mjs (2026-10-01)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Remuneraciones | pág. 73, precedente |
| 2 | Gastos de Operación | pág. 73, precedente |
| 3 | Amortización pases de jugadores profesionales (*) | pág. 73, precedente |
| 4 | Amortización Concesión | pág. 73, precedente |
| 5 | Gastos de torneos y otros | pág. 73, precedente |
| 6 | Gasto por Préstamo de Jugadores | pág. 73, precedente |
| 7 | Gasto por Transferencia de Jugadores | pág. 73, precedente |
| 8 | Depreciación | pág. 73, precedente |
| 9 | Costos de ventas productos | pág. 73, precedente |
| 10 | Otros Gastos por función | pág. 8, precedente |
| 11 | Remuneración | pág. 74, precedente |
| 12 | Indemnización | pág. 74, precedente |
| 13 | Gastos Generales | pág. 74, precedente |
| 14 | Combustible y Lubricantes | pág. 74, precedente |
| 15 | Servicios Contratados | pág. 74, precedente |
| 16 | Servicios de Seguridad | pág. 74, precedente |
| 17 | Servicios de Aseo | pág. 74, precedente |
| 18 | Servicios de Terceros | pág. 74, precedente |
| 19 | Materiales de Mantención y Reparación | pág. 74, precedente |
| 20 | Servicios de Mantención y Reparación | pág. 74, precedente |
| 21 | Patentes y Contribuciones | pág. 74, precedente |
| 22 | Materiales de Oficina y Otros | pág. 74, precedente |
| 23 | Feriado Legal | pág. 74, precedente |

### Meta

```text
tools/cargar.mjs (2026-10-01). grossDebt/cash: no se leen por script todavía (null = sin dato). netInterest/tax: filas de resultado financiero / impuesto del estado.
tools/caja-deuda.mjs (2026-10-02): grossDebt escalón 1 (compuerta: año anterior): vocabulario: ninguna fila de deuda financiera (balance completo) = 0; cash escalón 0 (compuerta: año anterior): "Efectivo y equivalentes al efectivo" pág. 6
```

## 2018

### Ingresos

```text
2018: cargado por tools/cargar.mjs (2026-10-03) desde Clubes/Chile/Universidad Catolica (Cruzados)/estados-financieros-2018.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Chile/Universidad Catolica (Cruzados)/estados-financieros-2018.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Ingresos por A.N.F.P. | pág. 57, precedente |
| 2 | Ingresos por Retiros del CDF | pág. 57, Jev 0.95 |
| 3 | Ingresos por Borderó (Recaudación Entradas) | pág. 57, precedente |
| 4 | Ingresos por Préstamo de Jugadores | pág. 57, precedente |
| 5 | Ingresos por venta de Jugadores | pág. 57, precedente |
| 6 | Ingresos por Derechos de Solidaridad | pág. 57, precedente |
| 7 | Otros | pág. 57, precedente |
| 8 | Ingresos Cuotas Socios Fútbol | pág. 62, precedente |
| 9 | Ingresos Matrículas de Escuelas de Fútbol | pág. 62, precedente |
| 10 | Ingresos por Publicidad y Auspicios | pág. 62, precedente |
| 11 | Ingresos por Ventas de Productos Tienda UC | pág. 62, precedente |
| 12 | Ingresos por Derechos de Merchandising | pág. 62, precedente |
| 13 | Otros ingresos por función | pág. 8, precedente |

### Gastos

```text
tools/cargar.mjs (2026-10-03)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Remuneraciones | pág. 60, precedente |
| 2 | Gastos de Operación | pág. 60, precedente |
| 3 | Amortización pases de jugadores profesionales (*) | pág. 60, precedente |
| 4 | Amortización Concesión | pág. 60, precedente |
| 5 | Amortización Licencias | pág. 60, Jev 0.97 |
| 6 | Gastos de torneos y otros | pág. 60, precedente |
| 7 | Gasto por Préstamo de Jugadores | pág. 60, precedente |
| 8 | Gasto por Transferencia de Jugadores | pág. 60, precedente |
| 9 | Depreciación | pág. 60, precedente |
| 10 | Costos de ventas productos | pág. 60, precedente |
| 11 | Otros Gastos por función | pág. 8, precedente |
| 12 | Remuneración | pág. 61, precedente |
| 13 | Indemnizaciones | pág. 61, precedente |
| 14 | Gastos Generales | pág. 61, precedente |
| 15 | Combustible y Lubricantes | pág. 61, precedente |
| 16 | Servicios Contratados | pág. 61, precedente |
| 17 | Servicios de Seguridad | pág. 61, precedente |
| 18 | Serviciosa de Aseo | pág. 61, precedente |
| 19 | Arriendo de Bienes | pág. 61, precedente |
| 20 | Servicios de Terceros | pág. 61, precedente |
| 21 | Materiales de Mantención y Reparación | pág. 61, precedente |
| 22 | Servicios de Mantención y Reparación | pág. 61, precedente |
| 23 | Patentes y Contribuciones | pág. 61, precedente |
| 24 | Provisión No Operacionales | pág. 61, precedente |
| 25 | Materiales de Oficina y Otros | pág. 61, precedente |
| 26 | Feriado Legal | pág. 61, precedente |

### Meta

```text
tools/cargar.mjs (2026-10-03). grossDebt/cash: no se leen por script todavía (null = sin dato). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

## 2017

### Ingresos

```text
2017: cargado por tools/cargar.mjs (2026-10-02) desde Clubes/Chile/Universidad Catolica (Cruzados)/estados-financieros-2017.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Chile/Universidad Catolica (Cruzados)/estados-financieros-2017.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Ingresos por A.N.F.P. | pág. 58, precedente |
| 2 | Ingresos por Derechos de TV | pág. 58, precedente |
| 3 | Ingresos por Borderó (Recaudación Entradas) | pág. 58, precedente |
| 4 | Ingresos por Préstamo de Jugadores | pág. 58, precedente |
| 5 | Ingresos por venta de Jugadores | pág. 58, precedente |
| 6 | Ingresos por Derechos de Solidaridad | pág. 58, precedente |
| 7 | Otros | pág. 58, precedente |
| 8 | Ingresos Cuotas Socios Fútbol | pág. 62, precedente |
| 9 | Ingresos Matrículas de Escuelas de Fútbol | pág. 62, precedente |
| 10 | Ingresos por Publicidad y Auspicios | pág. 62, precedente |
| 11 | Ingresos por Ventas de Productos Tienda UC | pág. 62, precedente |
| 12 | Ingresos por Derechos de Merchandising | pág. 62, precedente |
| 13 | Otros ingresos por función | pág. 8, precedente |

### Gastos

```text
tools/cargar.mjs (2026-10-02)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Remuneraciones | pág. 60, precedente |
| 2 | Gastos de Operación | pág. 60, precedente |
| 3 | Amortización pases de jugadores profesionales (*) | pág. 60, precedente |
| 4 | Amortización Concesión | pág. 60, precedente |
| 5 | Amortización Licencias | pág. 60, precedente |
| 6 | Gastos de torneos y otros | pág. 60, precedente |
| 7 | Gasto por Préstamo de Jugadores | pág. 60, precedente |
| 8 | Gasto por Transferencia de Jugadores | pág. 60, precedente |
| 9 | Depreciación | pág. 60, precedente |
| 10 | Costos de ventas productos | pág. 60, precedente |
| 11 | Otros Gastos por función | pág. 8, precedente |
| 12 | Remuneración | pág. 61, precedente |
| 13 | Gastos Generales | pág. 61, precedente |
| 14 | Combustible y Lubricantes | pág. 61, precedente |
| 15 | Servicios Contratados | pág. 61, precedente |
| 16 | Servicios de Seguridad | pág. 61, precedente |
| 17 | Serviciosa de Aseo | pág. 61, precedente |
| 18 | Arriendo de Bienes | pág. 61, precedente |
| 19 | Servicios de Terceros | pág. 61, precedente |
| 20 | Materiales de Mantención y Reparación | pág. 61, precedente |
| 21 | Servicios de Mantención y Reparación | pág. 61, precedente |
| 22 | Patentes y Contribuciones | pág. 61, precedente |
| 23 | Provisión No Operacionales | pág. 61, precedente |
| 24 | Materiales de Oficina y Otros | pág. 61, precedente |
| 25 | Feriado Legal | pág. 61, precedente |

### Meta

```text
tools/cargar.mjs (2026-10-02). grossDebt/cash: no se leen por script todavía (null = sin dato). netInterest/tax: filas de resultado financiero / impuesto del estado.
tools/caja-deuda.mjs (2026-10-02): grossDebt escalón 1 (compuerta: documento siguiente): vocabulario: ninguna fila de deuda financiera (balance completo) = 0; cash escalón 0 (compuerta: año anterior): "Efectivo y equivalentes al efectivo" pág. 6
```

## 2016

### Ingresos

```text
2016: cargado por tools/cargar.mjs (2026-10-02) desde Clubes/Chile/Universidad Catolica (Cruzados)/estados-financieros-2016.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Chile/Universidad Catolica (Cruzados)/estados-financieros-2016.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Ingresos por A.N.F.P. | pág. 57, precedente |
| 2 | Ingresos por Derechos de TV | pág. 57, precedente |
| 3 | Ingresos por Borderó (Recaudación Entradas) | pág. 57, precedente |
| 4 | Ingresos por Préstamo de Jugadores | pág. 57, precedente |
| 5 | Ingresos por venta de Jugadores | pág. 57, precedente |
| 6 | Ingresos por Derechos de Solidaridad | pág. 57, precedente |
| 7 | Otros | pág. 57, precedente |
| 8 | Ingresos Cuotas Socios Fútbol | pág. 61, precedente |
| 9 | Ingresos Matrículas de Escuelas de Fútbol | pág. 61, precedente |
| 10 | Ingresos por Publicidad y Auspicios | pág. 61, precedente |
| 11 | Ingresos por Ventas de Productos Tienda UC | pág. 61, precedente |
| 12 | Ingresos por Derechos de Merchandising | pág. 61, precedente |
| 13 | Otros ingresos por función | pág. 8, precedente |

### Gastos

```text
tools/cargar.mjs (2026-10-02)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Remuneraciones | pág. 59, precedente |
| 2 | Gastos de Operación | pág. 59, precedente |
| 3 | Amortización pases de jugadores profesionales (*) | pág. 59, precedente |
| 4 | Amortización Concesión | pág. 59, precedente |
| 5 | Amortización Licencias | pág. 59, precedente |
| 6 | Gastos de torneos y otros | pág. 59, precedente |
| 7 | Gasto por Préstamo de Jugadores | pág. 59, precedente |
| 8 | Gasto por Transferencia de Jugadores | pág. 59, precedente |
| 9 | Depreciación | pág. 59, precedente |
| 10 | Costos de ventas productos | pág. 59, precedente |
| 11 | Otros Gastos por función | pág. 8, precedente |
| 12 | Provisiones No Operacionales | pág. 60, precedente |
| 13 | Patentes y Contribuciones | pág. 60, precedente |
| 14 | Servicios de Mantención, Impresión y Reparación | pág. 60, Jev 1 |
| 15 | Servicios de Terceros | pág. 60, precedente |
| 16 | Arriendo de Bienes | pág. 60, precedente |
| 17 | Servicios de Aseo y Seguridad | pág. 60, precedente |
| 18 | Servicios Contratados | pág. 60, precedente |
| 19 | Remuneraciones (gastos de administración) | pág. 60, ajuste manual (auditoría 2026-10-04): nota de Gastos de Administración, .md L2943 |
| 20 | Gas, Agua y Electricidad | pág. 60, Jev 0.99 |
| 21 | TV Cable, Internet y Telefonía | pág. 60, Jev 1 |
| 22 | Otros Gastos | pág. 60, Claude 0.88 |

### Meta

```text
tools/cargar.mjs (2026-10-02). grossDebt/cash: no se leen por script todavía (null = sin dato). netInterest/tax: filas de resultado financiero / impuesto del estado.
tools/caja-deuda.mjs (2026-10-02): cash escalón 0 (compuerta: documento siguiente): "Efectivo y equivalentes al efectivo" pág. 6
```

## 2015

### Ingresos

```text
2015: cargado por tools/cargar.mjs (2026-10-02) desde Clubes/Chile/Universidad Catolica (Cruzados)/estados-financieros-2015.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Chile/Universidad Catolica (Cruzados)/estados-financieros-2015.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Ingresos por A.N.F.P. | pág. 56, precedente |
| 2 | Ingresos por Derechos de TV | pág. 56, precedente |
| 3 | Ingresos por Borderó (Recaudación Entradas) | pág. 56, precedente |
| 4 | Ingresos por Préstamo de Jugadores | pág. 56, precedente |
| 5 | Ingresos por venta de Jugadores | pág. 56, precedente |
| 6 | Ingresos por Derechos de Solidaridad | pág. 56, precedente |
| 7 | Otros | pág. 56, precedente |
| 8 | Ingresos Cuotas Socios Fútbol | pág. 59, precedente |
| 9 | Ingresos Matrículas de Escuelas de Fútbol | pág. 59, precedente |
| 10 | Ingresos por Publicidad y Auspicios | pág. 59, precedente |
| 11 | Ingresos por Ventas de Productos Tienda UC | pág. 59, precedente |
| 12 | Ingresos por Derechos de Merchandising | pág. 59, precedente |
| 13 | Otros ingresos por función | pág. 8, precedente |

### Gastos

```text
tools/cargar.mjs (2026-10-02)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Remuneraciones | pág. 58, precedente |
| 2 | Gastos de Operación | pág. 58, precedente |
| 3 | Amortización pases de jugadores profesionales (*) | pág. 58, precedente |
| 4 | Amortización Concesión | pág. 58, precedente |
| 5 | Amortización Licencias | pág. 58, precedente |
| 6 | Gastos de torneos y otros | pág. 58, precedente |
| 7 | Gasto por Préstamo de Jugadores | pág. 58, precedente |
| 8 | Gasto por Transferencia de Jugadores | pág. 58, precedente |
| 9 | Depreciación | pág. 58, precedente |
| 10 | Costos de ventas productos | pág. 58, precedente |
| 11 | Gasto de administración | pág. 8, precedente |
| 12 | Otras ganancias (pérdidas) | pág. 8, precedente |

### Meta

```text
tools/cargar.mjs (2026-10-02). grossDebt/cash: no se leen por script todavía (null = sin dato). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

## 2014

### Ingresos

```text
2014: cargado por tools/cargar.mjs (2026-10-02) desde Clubes/Chile/Universidad Catolica (Cruzados)/estados-financieros-2014.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Chile/Universidad Catolica (Cruzados)/estados-financieros-2014.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Ingresos por A.N.F.P. | pág. 55, precedente |
| 2 | Ingresos por Derechos de TV | pág. 55, precedente |
| 3 | Ingresos por Borderó (Recaudación Entradas) | pág. 55, precedente |
| 4 | Ingresos por Préstamo de Jugadores | pág. 55, precedente |
| 5 | Ingresos por venta de Jugadores | pág. 55, precedente |
| 6 | Ingresos por Derechos de Solidaridad | pág. 55, precedente |
| 7 | Otros | pág. 55, precedente |
| 8 | Ingresos Cuotas Socios Fútbol | pág. 58, precedente |
| 9 | Ingresos Matrículas de Escuelas de Fútbol | pág. 58, precedente |
| 10 | Ingresos por Publicidad y Auspicios | pág. 58, precedente |
| 11 | Ingresos por Ventas de Productos Tienda UC | pág. 58, precedente |
| 12 | Ingresos por Derechos de Merchandising | pág. 58, precedente |
| 13 | Otros ingresos por función | pág. 8, precedente |

### Gastos

```text
tools/cargar.mjs (2026-10-02)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Remuneraciones | pág. 56, precedente |
| 2 | Gastos de Operación | pág. 56, precedente |
| 3 | Amortización pases de jugadores profesionales (*) | pág. 56, precedente |
| 4 | Amortización Concesión | pág. 56, precedente |
| 5 | Gastos de torneos y otros | pág. 56, precedente |
| 6 | Gasto por Préstamo de Jugadores | pág. 56, precedente |
| 7 | Gasto por Transferencia de Jugadores | pág. 56, precedente |
| 8 | Depreciación | pág. 56, precedente |
| 9 | Costos de ventas productos | pág. 56, precedente |
| 10 | Gasto de administración | pág. 8, precedente |
| 11 | Otros gastos | pág. 8, Claude 0.88 |
| 12 | Otras ganancias (pérdidas) | pág. 8, precedente |

### Meta

```text
tools/cargar.mjs (2026-10-02). grossDebt/cash: no se leen por script todavía (null = sin dato). netInterest/tax: filas de resultado financiero / impuesto del estado.
tools/caja-deuda.mjs (2026-10-02): grossDebt escalón 1 (compuerta: año anterior): vocabulario: ninguna fila de deuda financiera (balance completo) = 0; cash escalón 0 (compuerta: año anterior): "Efectivo y equivalentes al efectivo" pág. 6
```

## 2013

### Ingresos

```text
2013: cargado por tools/cargar.mjs (2026-10-02) desde Clubes/Chile/Universidad Catolica (Cruzados)/estados-financieros-2013.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Chile/Universidad Catolica (Cruzados)/estados-financieros-2013.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Ingresos por A.N.F.P. | pág. 58, precedente |
| 2 | Ingresos por Derechos de TV | pág. 58, precedente |
| 3 | Ingresos por Borderó (Recaudación Entradas) | pág. 58, precedente |
| 4 | Ingresos por Préstamo de Jugadores | pág. 58, precedente |
| 5 | Ingresos por venta de Jugadores | pág. 58, precedente |
| 6 | Ingresos por Derechos de Solidaridad | pág. 58, precedente |
| 7 | Otros | pág. 58, precedente |
| 8 | Ingresos Cuotas Socios Fútbol | pág. 62, precedente |
| 9 | Ingresos Matrículas de Escuelas de Fútbol | pág. 62, precedente |
| 10 | Ingresos por Publicidad y Auspicios | pág. 62, precedente |
| 11 | Ingresos por Ventas de Productos Tienda UC | pág. 62, precedente |
| 12 | Ingresos por Derechos de Merchandising | pág. 62, precedente |
| 13 | Otros | pág. 62, precedente |
| 14 | Otros Ingresos por función | pág. 6, precedente |

### Gastos

```text
tools/cargar.mjs (2026-10-02)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Remuneraciones | pág. 60, precedente |
| 2 | Gastos de Operación | pág. 60, precedente |
| 3 | Amortización pases jugadores profesionales (*) | pág. 60, Jev 1 |
| 4 | Amortización Concesión | pág. 60, precedente |
| 5 | Costos de torneos y otros | pág. 60, precedente |
| 6 | Gasto por Préstamo a Jugadores | pág. 60, precedente |
| 7 | Gasto por Transferencia de Jugadores | pág. 60, precedente |
| 8 | Depreciación | pág. 60, precedente |
| 9 | Costo de ventas productos | pág. 60, precedente |
| 10 | Gasto de administración | pág. 6, precedente |
| 11 | Otras ganancias (pérdidas) | pág. 6, precedente |

### Meta

```text
tools/cargar.mjs (2026-10-02). grossDebt/cash: no se leen por script todavía (null = sin dato). netInterest/tax: filas de resultado financiero / impuesto del estado.
tools/caja-deuda.mjs (2026-10-02): grossDebt escalón 1 (compuerta: documento siguiente): vocabulario: ninguna fila de deuda financiera (balance completo) = 0; cash escalón 0 (compuerta: año anterior): "Efectivo y Equivalentes al Efectivo" pág. 5
```

## 2012

### Ingresos

```text
2012: cargado por tools/cargar.mjs (2026-10-02) desde Clubes/Chile/Universidad Catolica (Cruzados)/estados-financieros-2012.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Chile/Universidad Catolica (Cruzados)/estados-financieros-2012.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Ingresos por A.N.F.P. | pág. 60, precedente |
| 2 | Ingresos por Derechos de TV | pág. 60, precedente |
| 3 | Ingresos por Borderó (Recaudación Entradas) | pág. 60, precedente |
| 4 | Ingresos por Préstamo de Jugadores | pág. 60, precedente |
| 5 | Ingresos por venta de Jugadores | pág. 60, precedente |
| 6 | Ingresos por Derechos de Solidaridad | pág. 60, precedente |
| 7 | Otros | pág. 60, precedente |
| 8 | Ingresos Cuotas Socios Fútbol | pág. 60, precedente |
| 9 | Ingresos Matrículas de Escuelas de Fútbol | pág. 60, precedente |
| 10 | Ingresos por Publicidad y Auspicios | pág. 60, precedente |
| 11 | Ingresos por Ventas de Productos Tienda UC | pág. 60, precedente |
| 12 | Ingresos por Derechos de Merchandising | pág. 60, precedente |
| 13 | Otros | pág. 60, precedente |
| 14 | Otros Ingresos por función | pág. 5, precedente |

### Gastos

```text
tools/cargar.mjs (2026-10-02)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Remuneraciones | pág. 58, precedente |
| 2 | Gastos de Operación | pág. 58, precedente |
| 3 | Amortización pases jugadores profesionales | pág. 58, Jev 1 |
| 4 | Amortización Concesión | pág. 58, precedente |
| 5 | Costos de torneos y otros | pág. 58, precedente |
| 6 | Costos de pases de jugadores | pág. 58, Jev 0.96 |
| 7 | Depreciación | pág. 58, precedente |
| 8 | Costo de ventas productos | pág. 58, precedente |
| 9 | Gasto de administración | pág. 5, precedente |
| 10 | Otras ganancias (pérdidas) | pág. 5, precedente |

### Meta

```text
tools/cargar.mjs (2026-10-02). grossDebt/cash: no se leen por script todavía (null = sin dato). netInterest/tax: filas de resultado financiero / impuesto del estado.
tools/caja-deuda.mjs (2026-10-02): cash escalón 0 (compuerta: año anterior): "Efectivo y Equivalentes al Efectivo" pág. 4
```

## 2011

### Ingresos

```text
2011: cargado por tools/cargar.mjs (2026-10-02) desde Clubes/Chile/Universidad Catolica (Cruzados)/estados-financieros-2011.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Chile/Universidad Catolica (Cruzados)/estados-financieros-2011.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Ingresos por A.N.F.P. | pág. 61, precedente |
| 2 | Ingresos por Derechos de TV | pág. 61, precedente |
| 3 | Ingresos por Borderó (Recaudación Entradas) | pág. 61, precedente |
| 4 | Ingresos por Préstamo de Jugadores | pág. 61, precedente |
| 5 | Ingresos por venta de Jugadores | pág. 61, precedente |
| 6 | Ingresos por Derechos de Solidaridad | pág. 61, precedente |
| 7 | Otros | pág. 61, precedente |
| 8 | Ingresos Cuotas Socios Fútbol | pág. 61, precedente |
| 9 | Ingresos Matrículas de Escuelas de Fútbol | pág. 61, precedente |
| 10 | Ingresos por Publicidad y Auspicios | pág. 61, precedente |
| 11 | Ingresos por Ventas de Productos Tienda UC | pág. 61, precedente |
| 12 | Ingresos por Derechos de Merchandising | pág. 61, precedente |
| 13 | Otros | pág. 61, precedente |
| 14 | Otros Ingresos por función | pág. 5, precedente |

### Gastos

```text
tools/cargar.mjs (2026-10-02)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Remuneraciones | pág. 61, precedente |
| 2 | Gastos de Operación | pág. 61, precedente |
| 3 | Amortización Pases de Jugadores | pág. 61, Jev 1 |
| 4 | Amortización Concesión | pág. 61, precedente |
| 5 | Gastos de Torneos y otros | pág. 61, precedente |
| 6 | Gastos de Pases de Jugadores | pág. 61, Claude 0.85 |
| 7 | Depreciación | pág. 61, precedente |
| 8 | Costos de Ventas Productos | pág. 61, precedente |
| 9 | Gasto de administración | pág. 5, precedente |
| 10 | Otras ganancias (pérdidas) | pág. 5, precedente |

### Meta

```text
tools/cargar.mjs (2026-10-02). grossDebt/cash: no se leen por script todavía (null = sin dato). netInterest/tax: filas de resultado financiero / impuesto del estado.
tools/caja-deuda.mjs (2026-10-02): cash escalón 0 (compuerta: año anterior): "Efectivo y Equivalentes al Efectivo" pág. 4
```

## 2010

### Ingresos

```text
2010: cargado por tools/cargar.mjs (2026-10-02) desde Clubes/Chile/Universidad Catolica (Cruzados)/estados-financieros-2010.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Chile/Universidad Catolica (Cruzados)/estados-financieros-2010.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Ingresos por A.N.F.P. | pág. 60, precedente |
| 2 | Ingresos por Derechos de TV | pág. 60, precedente |
| 3 | Ingresos por Borderó (Recaudación Entradas) | pág. 60, precedente |
| 4 | Ingresos por Préstamo de Jugadores | pág. 60, precedente |
| 5 | Ingresos por Derechos de Solidaridad | pág. 60, precedente |
| 6 | Otros | pág. 60, precedente |
| 7 | Ingresos Cuotas Socios Fútbol | pág. 60, precedente |
| 8 | Ingresos Matrículas de Escuelas de Fútbol | pág. 60, precedente |
| 9 | Ingresos por Publicidad y Auspicios | pág. 60, precedente |
| 10 | Ingresos por Ventas de Productos Tienda UC | pág. 60, precedente |
| 11 | Ingresos por Derechos de Merchandising | pág. 60, precedente |
| 12 | Otros | pág. 60, precedente |
| 13 | Otros Ingresos por función | pág. 5, precedente |

### Gastos

```text
tools/cargar.mjs (2026-10-02)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Remuneraciones | pág. 58, precedente |
| 2 | Gastos de Operación | pág. 58, precedente |
| 3 | Amortización pases jugadores profesionales | pág. 58, Jev 1 |
| 4 | Amortización Concesión | pág. 58, precedente |
| 5 | Costos de torneos y otros | pág. 58, precedente |
| 6 | Costos de pases de jugadores | pág. 58, Jev 0.96 |
| 7 | Depreciación | pág. 58, precedente |
| 8 | Costo de ventas productos | pág. 58, precedente |
| 9 | Gasto de administración | pág. 5, precedente |
| 10 | Otras ganancias (pérdidas) | pág. 5, precedente |

### Meta

```text
tools/cargar.mjs (2026-10-02). grossDebt/cash: no se leen por script todavía (null = sin dato). netInterest/tax: filas de resultado financiero / impuesto del estado.
tools/caja-deuda.mjs (2026-10-02): grossDebt escalón 1 (compuerta: documento siguiente): vocabulario: ninguna fila de deuda financiera (balance completo) = 0; cash escalón 0 (compuerta: documento siguiente): "Efectivo y Equivalentes al Efectivo" pág. 4
```

## Gestiones

_investigado por un subagente (Sonnet) con fuente por gestión, 2026-10-13; to-do 195:_

```text
Jaime Estévez Valencia (2010-05-03 a 2014-04-16): Nombrado presidente de Cruzados SADP el 3/5/2010 tras reunión de directorio (antes, Jorge O'Ryan 2009-2010). Hasta: el día que asumió Larraín (la fuente solo dice 2014); el día de salida es inferido.
Luis Larraín Arroyo (2014-04-16 a 2016-07-25): Asumió el 16/4/2014 y renunció el 25/7/2016 (Wikipedia en inglés; comunicado del club).
Juan Tagle Quiroz (2016-07-25 a 2026-04-20): Asumió el 25/7/2016; reelecto abril 2025. Hasta: el 20/4/2026 es el día en que el directorio eligió a Claro; la fuente no da el día exacto de la salida de Tagle.
Matías Claro (2026-04-20 a hoy): Oficializado el 20/4/2026 en el directorio.
Duda: Cierre 2025: el balance se aprueba en abril 2026, cuando Tagle sale y asume Claro (20/4/2026); si firmó Claro, hace falta el campo `firmo`. Ver la memoria del ejercicio. Los apellidos completos (Estévez Valencia, Tagle Quiroz) vienen de memoria y de Wikipedia; el 'nombre' publicado puede acortarse a lo que dicen las fuentes.
```

## Fuentes

### catolica-cl-estados-financieros-2024

_note (data/):_

```text
Descargado de cruzados.cl/inversionistas/ (RUT 76.072.469-6). Balance auditado consolidado completo (Estado de Situación Financiera, Estado de Resultados por Función, Estado de Resultados Integrales, Estado de Cambios en el Patrimonio, Estado de Flujo de Efectivo y notas 1 a 30), texto nativo. Transcripción completa en Clubes/Chile/Universidad Catolica (Cruzados)/estados-financieros-2024.md.
```

### catolica-cl-estados-financieros-2023

_note (data/):_

```text
Descargado de cruzados.cl/inversionistas/ (RUT 76.072.469-6). Mismo formato que el ejercicio 2024. Transcripción completa en Clubes/Chile/Universidad Catolica (Cruzados)/estados-financieros-2023.md.
```

### catolica-cl-estados-financieros-2022

_note (data/):_

```text
Descargado de cruzados.cl/inversionistas/ (RUT 76.072.469-6). Mismo formato que los ejercicios 2023/2024. Transcripción completa en Clubes/Chile/Universidad Catolica (Cruzados)/estados-financieros-2022.md.
```

### catolica-cl-estados-financieros-2021

_note (data/):_

```text
Cargado por tools/cargar.mjs (2026-10-01) desde la transcripción Clubes/Chile/Universidad Catolica (Cruzados)/estados-financieros-2021.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### catolica-cl-estados-financieros-2025

_note (data/):_

```text
Cargado por tools/cargar.mjs (2026-10-01) desde la transcripción Clubes/Chile/Universidad Catolica (Cruzados)/estados-financieros-2025.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.
```

### catolica-cl-estados-financieros-2020

_note (data/):_

```text
Cargado por tools/cargar.mjs (2026-10-01) desde la transcripción Clubes/Chile/Universidad Catolica (Cruzados)/estados-financieros-2020.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### catolica-cl-estados-financieros-2019

_note (data/):_

```text
Cargado por tools/cargar.mjs (2026-10-01) desde la transcripción Clubes/Chile/Universidad Catolica (Cruzados)/estados-financieros-2019.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### catolica-cl-estados-financieros-2018

_note (data/):_

```text
Cargado por tools/cargar.mjs (2026-10-01) desde la transcripción Clubes/Chile/Universidad Catolica (Cruzados)/estados-financieros-2018.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### catolica-cl-estados-financieros-2010

_note (data/):_

```text
Cargado por tools/cargar.mjs (2026-10-02) desde la transcripción Clubes/Chile/Universidad Catolica (Cruzados)/estados-financieros-2010.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### catolica-cl-estados-financieros-2011

_note (data/):_

```text
Cargado por tools/cargar.mjs (2026-10-02) desde la transcripción Clubes/Chile/Universidad Catolica (Cruzados)/estados-financieros-2011.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### catolica-cl-estados-financieros-2012

_note (data/):_

```text
Cargado por tools/cargar.mjs (2026-10-02) desde la transcripción Clubes/Chile/Universidad Catolica (Cruzados)/estados-financieros-2012.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### catolica-cl-estados-financieros-2013

_note (data/):_

```text
Cargado por tools/cargar.mjs (2026-10-02) desde la transcripción Clubes/Chile/Universidad Catolica (Cruzados)/estados-financieros-2013.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### catolica-cl-estados-financieros-2014

_note (data/):_

```text
Cargado por tools/cargar.mjs (2026-10-02) desde la transcripción Clubes/Chile/Universidad Catolica (Cruzados)/estados-financieros-2014.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### catolica-cl-estados-financieros-2015

_note (data/):_

```text
Cargado por tools/cargar.mjs (2026-10-02) desde la transcripción Clubes/Chile/Universidad Catolica (Cruzados)/estados-financieros-2015.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### catolica-cl-estados-financieros-2016

_note (data/):_

```text
Cargado por tools/cargar.mjs (2026-10-02) desde la transcripción Clubes/Chile/Universidad Catolica (Cruzados)/estados-financieros-2016.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### catolica-cl-estados-financieros-2017

_note (data/):_

```text
Cargado por tools/cargar.mjs (2026-10-02) desde la transcripción Clubes/Chile/Universidad Catolica (Cruzados)/estados-financieros-2017.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

## Otros

### catolicaPasesData

```text
Mercado de pases / resultados deportivos / títulos: sin datos reales cargados todavía para este
club (fuera de alcance de esta sesión, enfocada en Finanzas 2022-2024). Arrays/objetos vacíos en
vez de placeholders inventados.
```

### gestionesByClub['catolica-cl']

```text
gestionesByClub: no se pudo confirmar con confianza quién ejercía la gerencia general/directorio
en cada ejercicio puntual (Cruzados S.A.D.P. es una sociedad anónima deportiva profesional, no un
club asociativo con presidente electo) — se agrega una entrada genérica "Gestión actual" (mismo
criterio que Once Caldas, club-data-mapping SKILL.md sección 7: "mejor un año sin gestión asignada
que una gestión inventada").
```
