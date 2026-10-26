# boyacachico-co — evidencia de carga

Lo que había como comentario en `data/co/boyacachico-co-data.js`, movido tal cual por `tools/archivo/mover-comentarios-data.mjs` (la regla:
`Admin/CONVENCIONES-DATOS.md`, "data/<país>/<club>-data.js NO LLEVA COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y
meta. Las notas de cada fila van en una tabla con su número de fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
============================================================================
data/co/boyacachico-co-data.js — Deportivo Boyacá Chicó Futbol Club S.A.
(Tunja, Colombia). Club nuevo, agregado el 2026-09-28 (ronda de 5
onboardings de prueba de los tools del to-do 98/95, 3/5). Ejercicio 2024 =
REAL, único ejercicio cargado a propósito.

FUENTE: `Clubes/Colombia/Boyaca Chico/estados-financieros-2024.pdf`,
transcripción completa en `estados-financieros-2024.md`, misma carpeta.
Bajado vía SIIS (siis.ia.supersociedades.gov.co), mismo canal que Once
Caldas/Envigado. Cifras YA en pesos completos (no en miles como Once
Caldas -- este documento no trae la aclaración "expresado en miles" y sus
magnitudes (miles de millones de COP) solo tienen sentido como pesos
completos, confirmado cruzando contra el patrimonio total: $6.414 millones
de patrimonio para un club de Primera A es plausible en pesos completos,
sería absurdamente chico en miles). Acá se guardan divididas por 1.000.000,
en MILLONES de pesos colombianos (COP), mismo criterio de unidad que el
resto del sitio.

REVENUE = Nota 16 "Ingresos Operacionales" (total impreso $8.127,567123 M,
reconciliado EXACTO con `tools/sum-check.mjs`) + la porción no-financiera
de Nota 19 "Otros Ingresos No Operacionales" ($137,020364 M = total
impreso $143,886002 M menos "Intereses Bancarios" $6,865639 M, que va a
`netInterest`). Los 5 rubros de auxilio DIMAYOR (Hotelero/Transporte/
Arbitraje/Logística/Mejoramientos) y "Fondo de Equipos" se categorizaron
como `broadcasting`, mismo criterio que la sub-descomposición de "DIMAYOR"
en `data/co/oncecaldas-co-data.js` (son la misma distribución de la liga, no
ingreso propio del club). "Ingresos Abonados con Boyacá" -> `season_tickets`
(abonos, mismo concepto que Once Caldas). "Menos: Devoluciones"
(-$1.726,052997 M, 21% del ingreso bruto) NO se pudo atribuir con
confianza a un rubro específico -- el documento no aclara de qué
devolución se trata, se cargó como línea propia en `other_income`
(negativa) y quedó la pregunta en `Admin/dudas-por-club.md`.

EXPENSES = Nota 17 "Costos de Ventas y Prestación de Servicios" (íntegro
nómina del plantel masculino este año, $4.303,480269 M -> `wages_squad`) +
Nota 18 "Gastos de Administración" ($2.603,474912 M, con Amortizaciones y
Depreciación separadas en sus propias líneas, mismo criterio que Once
Caldas) + la porción no-financiera/no-tributaria de Nota 20 "Otros Egresos
No Operacionales" ($11,266696 M, "Gastos diversos" -> `other_expenses`).

`tax` = $381,268512 M, la "Provisión Impuesto sobre la Renta" -- CONFIRMADA
DOBLE: aparece igual en Nota 20 ("Impuesto de Renta") y en Nota 21
("PROVISIÓN IMPUESTO SOBRE LA RENTA DEL AÑO GRAVABLE 2024"), y la propia
Nota 21 confirma el PAT por una vía DISTINTA del Estado de Patrimonio:
"UTILIDAD ANTES DE IMPUESTOS" ($1.089,338605 M) menos esa provisión da
$708,070093 M, coincide (a 1 centavo, redondeo del propio documento) con
"Resultado del Ejercicio" de la Nota 15 (Patrimonio). Doble confirmación,
no residuo.

FX: el documento NO declara su propio tipo de cambio de cierre -- TRM
oficial al 31/12/2024 vía `tools/lookup-fx-close.js` (mismo valor,
$4.409,15, que Once Caldas 2024 declaró como propio -- buena señal
cruzada de que la TRM oficial de esa fecha es correcta).
============================================================================
```

_de data/clubs.js:_

```text
Boyacá Chicó ("Los Ajedrezados"): camiseta a cuadros (patrón ajedrezado) azul marino y blanco
según Wikipedia (infobox pattern_la1/pattern_b1) -- bicolor en partes iguales, mismo caso que
Almagro (tricolor): sin un color que predomine con claridad, brandColor:null a propósito en
vez de forzar uno de los dos (footylogos da #001356 azul marino como #1, pero es el orden del
escudo, no confirma que domine sobre el blanco en la camiseta a cuadros).
```

_de data/club-leagues/co.js:_

```text
Verificado el 2026-09-28 contra el roster ya cacheado de "2024 Liga DIMAYOR" (bajado durante
el onboarding de Once Caldas, mismo día) -- Boyacá Chicó apareció ahí mismo, sin fetch nuevo.
```

## 2025

### Ingresos

```text
2025: cargado por tools/cargar.mjs (2026-10-20) desde Clubes/Colombia/Boyaca Chico/estados-financieros-2025.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Colombia/Boyaca Chico/estados-financieros-2025.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Taquilla Venta Boletería Masculina | pág. 16, precedente |
| 2 | Ingresos por Derechos de Televisión | pág. 16, precedente |
| 3 | Ingresos por auxilio Hotelero - Dimayor | pág. 16, precedente |
| 4 | Ingresos por auxilio de Transportes - Dimayor | pág. 16, precedente |
| 5 | Ingresos por auxilio de Arbitraje - Dimayor | pág. 16, precedente |
| 6 | Ventas por Auxilio de Logística - Dimayor | pág. 16, precedente |
| 7 | Ingresos por Auxilio de Mejoramientos - Dimayor | pág. 16, precedente |
| 8 | Ingresos por Auxilios - Federación Colombiana de Futbol | pág. 16, precedente |
| 9 | Ingresos por Patrocinios recibidos de terceros | pág. 16, precedente |
| 10 | Ingresos por Servicios de Publicidad | pág. 16, precedente |
| 11 | Ingresos Videos Oficiales Apuestas 2024 | pág. 16, precedente |
| 12 | Menos: Devoluciones | pág. 16, precedente |
| 13 | Intereses | pág. 17, ? 0.6 |
| 14 | Pasarelas | pág. 17, Jev 0.95 |
| 15 | Sanitas | pág. 17, Jev 0.97 |
| 16 | Seguros de Vida Suramericana | pág. 17, Jev 1 |
| 17 | La Equidad Seguros de Vida | pág. 18, Jev 1 |
| 18 | Ingresos Federación Colombiana de Futbol | pág. 18, Jev 0.99 |
| 19 | Otros Ingresos | pág. 18, Jev 0.97 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Salarios | pág. 16, Jev 1 |
| 2 | Cesantías | pág. 16, Jev 1 |
| 3 | Intereses Sobre Cesantías | pág. 16, Jev 0.96 |
| 4 | Prima de Servicios | pág. 17, Jev 0.97 |
| 5 | Vacaciones | pág. 17, Jev 0.96 |
| 6 | Aportes ARP | pág. 17, precedente |
| 7 | Aportes a Fondo de Pensiones | pág. 17, Jev 0.93 |
| 8 | Aportes Caja, ICBF, SENA | pág. 17, Claude 0.8 |
| 9 | Auxilio de Transporte | pág. 17, Jev 0.96 |
| 10 | Incapacidades | pág. 17, Jev 0.97 |
| 11 | Bonificaciones | pág. 17, Jev 1 |
| 12 | Otros Honorarios (*) | pág. 17, precedente |
| 13 | Gastos de Personal | pág. 18, Claude 0.9 |
| 14 | Revisoría Fiscal | pág. 18, Jev 1 |
| 15 | Asesoría Jurídica | pág. 18, Jev 1 |
| 16 | Asesoría Contable | pág. 18, Jev 1 |
| 17 | Impuestos | pág. 18, Jev 1 |
| 18 | Arrendamientos | pág. 18, Jev 0.98 |
| 19 | Seguros | pág. 18, Jev 0.92 |
| 20 | Servicio de Aseo | pág. 18, Jev 0.99 |
| 21 | Teléfono Fijo | pág. 18, Jev 1 |
| 22 | Teléfono Celular | pág. 19, Jev 1 |
| 23 | Correo, portes y telegramas | pág. 19, Jev 1 |
| 24 | Transporte Fletes y Acarreos | pág. 19, Jev 1 |
| 25 | Otros | pág. 19, Jev 0.95 |
| 26 | Gastos Notariales | pág. 19, Jev 1 |
| 27 | Registro mercantil | pág. 19, Jev 1 |
| 28 | Mantenimiento Construcciones | pág. 19, Jev 0.96 |
| 29 | Equipo Computación y comunicación | pág. 19, Jev 0.98 |
| 30 | Clase A | pág. 19, Claude 0.8 |
| 31 | Clase B | pág. 19, Claude 0.8 |
| 32 | Derechos de Uso | pág. 19, precedente |
| 33 | Construcciones y edificaciones | pág. 19, Claude 0.9 |
| 34 | Flota y Equipo Transporte | pág. 19, Claude 0.9 |
| 35 | Elementos Aseo | pág. 19, Jev 1 |
| 36 | Elementos Cafetería | pág. 19, Jev 1 |
| 37 | Útiles Papelería | pág. 19, Jev 1 |
| 38 | Fotocopias | pág. 19, Jev 1 |
| 39 | Combustibles | pág. 19, Jev 1 |
| 40 | Estampilla al Adulto Mayor 2% | pág. 19, Jev 0.91 |
| 41 | Estampilla Electrificadora Rural 1% | pág. 19, Claude 0.9 |
| 42 | casino y restaurante | pág. 19, Jev 0.97 |
| 43 | Otros gastos | pág. 19, Jev 0.96 |
| 44 | Gastos de ventas | pág. 3, precedente |
| 45 | Gastos Bancarios | pág. 20, precedente |
| 46 | Gravamen 4 * 1000 | pág. 20, Jev 0.92 |
| 47 | Comisiones | pág. 20, Jev 0.96 |
| 48 | IVA Bancario | pág. 20, Jev 0.98 |
| 49 | Sanciones DIAN | pág. 20, Claude 0.85 |
| 50 | Multas SIC | pág. 20, Jev 0.98 |
| 51 | Embargos Colpensiones | pág. 20, precedente |

### Meta

```text
tools/cargar.mjs (2026-10-20). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
tools/cargar.mjs (2026-10-20): co-primeraA, verificado contra roster cacheado de "2025 Liga DIMAYOR" (tools/club-league-reference/co.json), coincidencia exacta "Boyacá Chicó".
```

## 2024

### Ingresos

_antes de la fila 15 (`Menos: Devoluciones (sin atribuir)`):_

```text
No se pudo atribuir a un rubro específico -- ver comentario de cabecera y
Admin/dudas-por-club.md.
```

### Meta

```text
Intereses Bancarios (Nota 19, $6,865639 M) - Financieros+Comisiones+Intereses (Nota 20,
$263,892643 M).
```

_al lado del campo `grossDebt`:_

```text
no verificado esta sesión, mismo alcance que los demás onboardings de esta ronda
```

```text
tools/caja-deuda.mjs (2026-10-17): grossDebt escalón 0 (compuerta: ajuste manual): ajuste manual (2026-10-17): Claude 2026-10-17 (leído en el balance por subagente Sonnet, criterio de deuda financiera): Obligaciones financieras corrientes 666.527.066,00 (Préstamos Bancarios - Dimayor) + no corrientes 0,00. Nota 8: préstamo bancario Dimayor; no corriente 0.; cash escalón 0 (compuerta: ajuste manual): ajuste manual (2026-10-17): Claude 2026-10-17 (leído en el balance por subagente Sonnet, criterio de deuda financiera): Efectivo y equivalentes al efectivo 441.174.314,33 (también Disponible a dic 31 2024 en flujo de efectivo). Primera columna = 2024 (resultado del ejercicio 708M); cifras en pesos completos; coincide con el flujo de efectivo.
```

## Gestiones

_antes de Eduardo Pimentel (data/gestiones/co.js):_

```text
Dueño: Eduardo Pimentel, persona con nombre (dueño y gestor del proyecto desde la fundación del club en 2002, Wikipedia; Publimetro 2024 lo llama "dueño del Boyacá Chicó"). Su hijo Nicolás Pimentel es el presidente/gerente que firma (Publimetro, 10/2024): sin fecha de inicio, queda fuera por el criterio del dueño.
```

## 2023

### Ingresos

```text
2023: cargado por tools/cargar.mjs (2026-10-26) desde Clubes/Colombia/Boyaca Chico/siis-estado-2023.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Colombia/Boyaca Chico/siis-estado-2023.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Ingresos de actividades ordinarias | pág. 1, Jev 0.97 |
| 2 | Otros ingresos | pág. 1, Jev 0.97 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Costo de ventas | pág. 1, precedente |
| 2 | Gastos de administración | pág. 1, precedente |
| 3 | Otros gastos | pág. 1, Jev 0.96 |

### Meta

```text
2023: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-26): filas-a-mano. Claude 2026-10-26 (tokens de sesión): ubicación y filas armadas a mano desde el .md con tools/armar-a-mano.mjs
tools/cargar.mjs (2026-10-26). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"), con su tipo; la página marca «s/d» en las categorías que esa línea esconde y explica el caso en «Notas sobre este club».
```

```text
tools/dentro-de-otro.mjs (2026-10-26): posiblemente dentro de otro rubro, por precedente del club (la fila tiene plata en sus balances desglosados 2019, 2024, 2025)
```

## 2022

### Ingresos

```text
2022: cargado por tools/cargar.mjs (2026-10-26) desde Clubes/Colombia/Boyaca Chico/siis-estado-2022.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Colombia/Boyaca Chico/siis-estado-2022.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Ingresos de actividades ordinarias | pág. 1, Jev 0.97 |
| 2 | Otros ingresos | pág. 1, Jev 0.97 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Costo de ventas | pág. 1, precedente |
| 2 | Gastos de administración | pág. 1, precedente |
| 3 | Otros gastos | pág. 1, Jev 0.96 |

### Meta

```text
2022: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-26): filas-a-mano. Claude 2026-10-26 (tokens de sesión): ubicación y filas armadas a mano desde el .md con tools/armar-a-mano.mjs
tools/cargar.mjs (2026-10-26). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"), con su tipo; la página marca «s/d» en las categorías que esa línea esconde y explica el caso en «Notas sobre este club».
```

```text
tools/dentro-de-otro.mjs (2026-10-26): posiblemente dentro de otro rubro, por precedente del club (la fila tiene plata en sus balances desglosados 2019, 2024, 2025)
```

## 2021

### Ingresos

```text
2021: cargado por tools/cargar.mjs (2026-10-26) desde Clubes/Colombia/Boyaca Chico/siis-estado-2021.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Colombia/Boyaca Chico/siis-estado-2021.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Ingresos de actividades ordinarias | pág. 1, Jev 0.97 |
| 2 | Subsidios Estatales PAEF | pág. 1, Claude 0.88 |
| 3 | Diversos | pág. 1, Jev 1 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Costos de Personal y Jugadores | pág. 1, Jev 0.98 |
| 2 | Partidos y Actividades Deportivas | pág. 1, precedente |
| 3 | Honorarios y Arriendos | pág. 1, precedente |
| 4 | Gastos de administración | pág. 1, precedente |
| 5 | Financieros | pág. 1, Jev 0.98 |
| 6 | Gastos extraordinarios | pág. 1, Jev 1 |
| 7 | Gastos diversos | pág. 1, Jev 1 |

### Meta

```text
2021: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-26): filas-a-mano. Claude 2026-10-26 (tokens de sesión): ubicación y filas armadas a mano desde el .md con tools/armar-a-mano.mjs
tools/cargar.mjs (2026-10-26). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"), con su tipo; la página marca «s/d» en las categorías que esa línea esconde y explica el caso en «Notas sobre este club».
```

```text
tools/dentro-de-otro.mjs (2026-10-26): posiblemente dentro de otro rubro, por precedente del club (la fila tiene plata en sus balances desglosados 2019, 2024, 2025)
```

## 2020

### Ingresos

```text
2020: cargado por tools/cargar.mjs (2026-10-26) desde Clubes/Colombia/Boyaca Chico/siis-estado-2020.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Colombia/Boyaca Chico/siis-estado-2020.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Ingresos de actividades ordinarias | pág. 1, Jev 0.97 |
| 2 | Recuperaciones | pág. 1, Jev 1 |
| 3 | Subsidios Estatales PAEF | pág. 1, Claude 0.88 |
| 4 | Diversos | pág. 1, Jev 1 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Costos de Personal y Jugadores | pág. 1, Jev 0.98 |
| 2 | Partidos y Actividades Deportivas | pág. 1, precedente |
| 3 | Honorarios y Arriendos | pág. 1, precedente |
| 4 | Gastos de administración | pág. 1, precedente |
| 5 | Otros gastos | pág. 1, Jev 0.96 |

### Meta

```text
2020: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-26): filas-a-mano. Claude 2026-10-26 (tokens de sesión): ubicación y filas armadas a mano desde el .md con tools/armar-a-mano.mjs
tools/cargar.mjs (2026-10-26). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"), con su tipo; la página marca «s/d» en las categorías que esa línea esconde y explica el caso en «Notas sobre este club».
```

```text
tools/dentro-de-otro.mjs (2026-10-26): posiblemente dentro de otro rubro, por precedente del club (la fila tiene plata en sus balances desglosados 2019, 2024, 2025)
```

## 2019

### Ingresos

```text
2019: cargado por tools/cargar.mjs (2026-10-26) desde Clubes/Colombia/Boyaca Chico/siis-estado-2019.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Colombia/Boyaca Chico/siis-estado-2019.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Ventas por Derechos de Televisión | pág. 1, Jev 1 |
| 2 | Ventas por Derechos Deportivos | pág. 1, Jev 1 |
| 3 | Ventas por auxilio Hotelero | pág. 1, Claude 0.88 |
| 4 | Ventas por auxilio de Transportes | pág. 1, Jev 0.96 |
| 5 | Ventas por auxilio de Arbitraje | pág. 1, Claude 0.88 |
| 6 | Ventas Auxilio Federación Colombiana | pág. 1, Claude 0.9 |
| 7 | Ventas por Patrocinios | pág. 1, Jev 1 |
| 8 | Publicad | pág. 1, Claude 0.9 |
| 9 | Descuentos comerciales | pág. 1, Jev 0.95 |
| 10 | Recuperaciones | pág. 1, Jev 1 |
| 11 | Diversos | pág. 1, Jev 1 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Costos de Personal | pág. 1, Claude 0.82 |
| 2 | Partidos y Actividades Deportivas | pág. 1, precedente |
| 3 | Honorarios y Arriendos | pág. 1, precedente |
| 4 | Gastos de administración | pág. 1, precedente |
| 5 | Otros gastos | pág. 1, Jev 0.96 |

### Meta

```text
2019: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-26): filas-a-mano. Claude 2026-10-26 (tokens de sesión): ubicación y filas armadas a mano desde el .md con tools/armar-a-mano.mjs
tools/cargar.mjs (2026-10-26). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"), con su tipo; la página marca «s/d» en las categorías que esa línea esconde y explica el caso en «Notas sobre este club».
```

```text
tools/dentro-de-otro.mjs (2026-10-26): posiblemente dentro de otro rubro, por precedente del club (la fila tiene plata en sus balances desglosados 2024, 2025)
```

## 2018

### Ingresos

```text
2018: cargado por tools/cargar.mjs (2026-10-26) desde Clubes/Colombia/Boyaca Chico/siis-estado-2018.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Colombia/Boyaca Chico/siis-estado-2018.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Ingresos de actividades ordinarias | pág. 1, Jev 0.97 |
| 2 | Otros ingresos | pág. 1, Jev 0.97 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Costo de ventas | pág. 1, precedente |
| 2 | Gastos de ventas | pág. 1, precedente |
| 3 | Gastos de administración | pág. 1, precedente |
| 4 | Otros gastos | pág. 1, Jev 0.96 |

### Meta

```text
2018: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-26): filas-a-mano. Claude 2026-10-26 (tokens de sesión): ubicación y filas armadas a mano desde el .md con tools/armar-a-mano.mjs
tools/cargar.mjs (2026-10-26). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"), con su tipo; la página marca «s/d» en las categorías que esa línea esconde y explica el caso en «Notas sobre este club».
```

```text
tools/dentro-de-otro.mjs (2026-10-26): posiblemente dentro de otro rubro, por precedente del club (la fila tiene plata en sus balances desglosados 2019, 2024, 2025)
```

## 2017

### Ingresos

```text
2017: cargado por tools/cargar.mjs (2026-10-26) desde Clubes/Colombia/Boyaca Chico/siis-estado-2017.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Colombia/Boyaca Chico/siis-estado-2017.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Ingresos de actividades ordinarias | pág. 1, Jev 0.97 |
| 2 | Otros ingresos | pág. 1, Jev 0.97 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Costo de ventas | pág. 1, precedente |
| 2 | Gastos de ventas | pág. 1, precedente |
| 3 | Gastos de administración | pág. 1, precedente |
| 4 | Otros gastos | pág. 1, Jev 0.96 |

### Meta

```text
2017: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-26): filas-a-mano. Claude 2026-10-26 (tokens de sesión): ubicación y filas armadas a mano desde el .md con tools/armar-a-mano.mjs
tools/cargar.mjs (2026-10-26). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"), con su tipo; la página marca «s/d» en las categorías que esa línea esconde y explica el caso en «Notas sobre este club».
```

```text
tools/dentro-de-otro.mjs (2026-10-26): posiblemente dentro de otro rubro, por precedente del club (la fila tiene plata en sus balances desglosados 2019, 2024, 2025)
```

## 2016

### Ingresos

```text
2016: cargado por tools/cargar.mjs (2026-10-26) desde Clubes/Colombia/Boyaca Chico/siis-estado-2016.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Colombia/Boyaca Chico/siis-estado-2016.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Ingresos de actividades ordinarias | pág. 1, Jev 0.97 |
| 2 | Otros ingresos | pág. 1, Jev 0.97 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Costo de ventas | pág. 1, precedente |
| 2 | Gastos de ventas | pág. 1, precedente |
| 3 | Gastos de administración | pág. 1, precedente |
| 4 | Otros gastos | pág. 1, Jev 0.96 |

### Meta

```text
2016: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-26): filas-a-mano. Claude 2026-10-26 (tokens de sesión): ubicación y filas armadas a mano desde el .md con tools/armar-a-mano.mjs
tools/cargar.mjs (2026-10-26). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"), con su tipo; la página marca «s/d» en las categorías que esa línea esconde y explica el caso en «Notas sobre este club».
```

```text
tools/dentro-de-otro.mjs (2026-10-26): posiblemente dentro de otro rubro, por precedente del club (la fila tiene plata en sus balances desglosados 2019, 2024, 2025)
```

## Fuentes

### boyacachico-co-estados-financieros-2024

_note (data/):_

```text
Descargado vía SIIS (siis.ia.supersociedades.gov.co). PAT confirmado doble: Nota 15 (Patrimonio, "Resultado del Ejercicio") y Nota 21 (Utilidad antes de impuestos menos provisión de renta), coinciden a 1 centavo. La línea "Menos: Devoluciones" (21% del ingreso bruto) no se pudo atribuir a un rubro específico -- ver Admin/dudas-por-club.md. Transcripción completa en Clubes/Colombia/Boyaca Chico/estados-financieros-2024.md.
```

2026-10-15 (to-do 232 ab): 2024 (deuda y caja): de 0 a null. Estaban en 0 por la convención vieja ("0 = no se cargó"); sin dato no es cero. Los completa tools/caja-deuda.mjs si el documento los trae.

### boyacachico-co-estados-financieros-2025

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-20) desde la transcripción Clubes/Colombia/Boyaca Chico/estados-financieros-2025.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### boyacachico-co-siis-estado-2016

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-26) desde la transcripción Clubes/Colombia/Boyaca Chico/siis-estado-2016.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### boyacachico-co-siis-estado-2017

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-26) desde la transcripción Clubes/Colombia/Boyaca Chico/siis-estado-2017.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### boyacachico-co-siis-estado-2018

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-26) desde la transcripción Clubes/Colombia/Boyaca Chico/siis-estado-2018.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### boyacachico-co-siis-estado-2019

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-26) desde la transcripción Clubes/Colombia/Boyaca Chico/siis-estado-2019.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### boyacachico-co-siis-estado-2020

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-26) desde la transcripción Clubes/Colombia/Boyaca Chico/siis-estado-2020.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### boyacachico-co-siis-estado-2021

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-26) desde la transcripción Clubes/Colombia/Boyaca Chico/siis-estado-2021.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### boyacachico-co-siis-estado-2022

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-26) desde la transcripción Clubes/Colombia/Boyaca Chico/siis-estado-2022.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### boyacachico-co-siis-estado-2023

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-26) desde la transcripción Clubes/Colombia/Boyaca Chico/siis-estado-2023.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```
