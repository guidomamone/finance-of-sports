# Memoria y Balance — Racing Club, Ejercicio N° 114 (1°/9/2015 al 31/8/2016)

Transcripción de `balance2016.pdf` (36 páginas, **escaneo puro, sin capa de texto** — confirmado
con `pdftotext`, ~1 char/página — transcripto con el Read tool sobre imágenes de página, no con
`pdftotext`). Presidente: Sr. Víctor Blanco Rodríguez. **Primer ejercicio con auditoría externa**
(Estudio Bertora y Asociados S.R.L.) — formato de estados contables distinto de los años
anteriores (Notas 1 a 8 + Anexos I a V, en vez de "Generales/Específicos/Diversos" simple), pero
el Anexo II (Recursos) y Anexo III (Gastos) mantienen la misma estructura de columnas.

**HALLAZGO IMPORTANTE — este balance es el par real del presupuesto 2015/2016 ya cargado**: mismo
período exacto (1°/9/2015 al 31/8/2016) que `presupuesto2015-16.pdf`, ya cargado como
`reportType:'official_budget'` simple. Con este balance real, el ejercicio pasa a
`reportType:'official_budget_and_balance'` (mismo mecanismo que 2014, 2017/2018, 2019/2020) — el
balance es ahora el dato PRIMARIO y las líneas del presupuesto se movieron, sin tocar un solo
valor, a `racingPresupuestoOverlayByYear[2016]`.

**HALLAZGO SEPARADO, IMPORTANTE — la columna comparativa "31/08/2015" de ESTE documento NO
coincide con los datos ya cargados del Ejercicio 2014/2015** (`racing-balance-2014-15.md`,
cargado antes en esta misma sesión a partir de SU PROPIO balance original). Este documento
muestra, para 31/08/2015: TOTAL DE RECURSOS $426.883.075 (vs. $430.314.984 ya cargado), TOTAL DE
GASTOS $(320.744.583) (vs. $(331.654.662) ya cargado), RESULTADO FINAL $58.520.001 (vs.
$102.544.513 ya cargado) — una diferencia grande, sobre todo en "Previsiones/Amortizaciones"
extraordinarias ($50.133.746 acá vs. $19.931.642 en el balance original de 2014/15). La Nota 1.c)
de ESTE documento lo explica explícitamente: *"En los estados contables al 31 de agosto de 2015,
el Club ha realizado una serie de cambios en la exposición de los rubros, con el propósito de que
se interpreten exclusivamente en relación al ejercicio corriente. La modificación de la
información comparativa no implica cambios en las decisiones tomadas en base a ella."* — es decir,
es una RECLASIFICACIÓN de exposición/presentación para hacerla comparable con el nuevo formato de
2016 (probablemente reclasificando qué entra en "Previsiones/Amortizaciones" extraordinarias vs.
gasto ordinario bajo el criterio del nuevo auditor externo), NO una corrección del resultado
económico real de ese ejercicio. Confirmado además porque el Estado de Flujo de Efectivo de ESTE
documento (columna 31/08/2015) coincide EXACTO, línea por línea, con el ya transcripto en
`racing-balance-2014-15.md` — la plata que efectivamente entró y salió no cambió, solo cómo se
clasifica contablemente bajo el criterio nuevo. **Decisión tomada esta sesión: NO se tocan los
datos ya cargados de `racingRevenueLinesByYear[2015]`/`racingExpenseLinesByYear[2015]`/
`racingFiscalYearMeta[2015]`** (siguen reflejando el balance ORIGINAL de ese ejercicio, tal cual
se presentó y auditó en su momento) — esto queda documentado acá para que una sesión futura (o
Guido) decida si vale la pena aplicar la reclasificación retroactivamente, no es una decisión que
se tomó unilateralmente en esta sesión (ver `club-data-mapping/SKILL.md` sección 1: corregir datos
ya cargados y verificados es una pregunta para Guido, no una decisión automática).

**Nota sobre el proceso de transcripción**: las 36 páginas renderizadas a 150 DPI no mostraban
ninguna inclinación diagonal. Los Anexos II, III y V (Moneda Extranjera) están en landscape
rotado dentro de la página portrait (`club-data-mapping/SKILL.md` sección 9) — se rotaron las
imágenes antes de leerlas.

## Página 2 (PDF): ESTADO DE SITUACIÓN PATRIMONIAL — ACTIVO

| ACTIVO | 31/08/2016 | 31/08/2015 (*) |
|---|---|---|
| **Activo Corriente** | | |
| Caja y Bancos | 42.030.653 | 7.838.386 |
| Inversiones | 85.221.849 | 1.326.074 |
| Créditos | 104.910.762 | 61.248.400 |
| Bienes de Cambio | 4.138.426 | 835.093 |
| **Total del Activo Corriente** | **236.301.690** | **71.247.953** |
| **Activo No Corriente** | | |
| Créditos | 0 | 10.405.332 |
| Otros Créditos | 411.290 | 411.290 |
| Créditos Blanquiceleste | 0 | 1.361.860 |
| Bienes de Uso (Anexo I) | 56.773.665 | 44.327.525 |
| Bienes Intangibles | 205.650.733 | 158.740.486 |
| **Total del Activo No Corriente** | **262.835.688** | **215.246.493** |
| **TOTAL DEL ACTIVO** | **499.137.378** | **286.494.446** |

(*) Columna comparativa RECLASIFICADA por el nuevo auditor externo — ver nota completa arriba
sobre por qué difiere de `racing-balance-2014-15.md`.

## Página 3 (PDF): PASIVO Y PATRIMONIO NETO

| PASIVO Y PATRIMONIO NETO | 31/08/2016 | 31/08/2015 (*) |
|---|---|---|
| **Pasivo Corriente** | | |
| Deudas Comerciales | 41.306.482 | 4.179.235 |
| Deudas Sociales | 8.066.790 | 5.954.859 |
| Deudas Fiscales | 2.520.000 | 5.081.936 |
| Otras Deudas | 13.275.724 | 22.309.308 |
| Previsiones | 784.987 | 1.586.000 |
| **Total del Pasivo Corriente** | **65.953.983** | **39.111.338** |
| **Pasivo No Corriente** | | |
| Deudas Sociales | 0 | 4.302.708 |
| Deudas Fiscales | 6.320.622 | 7.558.628 |
| Otras Deudas | 4.587.142 | 7.689.488 |
| Previsiones | 21.588.440 | 21.118.396 |
| **Total del Pasivo No Corriente** | **32.496.204** | **40.669.220** |
| **TOTAL DEL PASIVO** | **98.450.187** | **79.780.558** |
| Patrimonio Neto | 400.687.191 | 206.713.888 |
| **TOTAL DEL PASIVO Y PATRIMONIO NETO** | **499.137.378** | **286.494.446** |

## Página 4 (PDF): ESTADO DE RECURSOS Y GASTOS

| | 31/08/2016 | 31/08/2015 (*) |
|---|---|---|
| Recursos Generales (Anexo II) | 148.845.245 | 114.959.615 |
| Recursos Específicos (Anexo II) | 394.448.896 | 266.496.473 |
| Recursos Diversos (Anexo II) | 68.674.232 | 45.426.987 |
| **TOTAL DE RECURSOS** | **611.968.373** | **426.883.075** |
| Gastos Generales (Anexo III) | (135.859.181) | (101.008.147) |
| Gastos Específicos (Anexo III) | (217.615.515) | (219.736.436) |
| **TOTAL DE GASTOS** | **(353.474.696)** | **(320.744.583)** |
| **RESULTADO OPERATIVO** | **258.493.677** | **106.138.492** |
| Depreciación (Anexo I) | (1.968.198) | (1.683.948) |
| Resultados Financieros y por tenencia (Anexo II) — Intereses Financieros | 4.065.311 | 1.199.945 |
| Resultados Financieros y por tenencia (Anexo II) — Diferencias de Cambio | 19.592.652 | 2.999.258 |
| Previsiones / Amortizaciones (Anexo III) | (86.210.139) | (50.133.746) |
| **RESULTADO FINAL (Beneficio)** | **193.973.303** | **58.520.001** |

## Anexo II — Recursos Ordinarios (PDF página 26)

| DETALLE | Total al 31/08/16 |
|---|---|
| Cuotas Sociales | 138.030.177 |
| Televisación / Televisión AFA | 52.802.659 |
| Campeonatos Oficiales | 89.069.294 |
| Otros Torneos | 2.569.939 |
| Ingresos Alquiler | 1.520.788 |
| Ingresos Publicidad | 43.794.391 |
| Otros Ingresos Diversos | 85.027.196 |
| Otros Ingresos Deportivos | 12.372.951 |
| Transferencia de Jugadores | 175.030.692 |
| Ingresos Sede Villa del Parque | 1.891.514 |
| Ingresos Colegio | 9.858.772 |
| **Subtotal** | **611.968.373** |
| Resultados Financieros y por tenencia | 23.657.963 |
| **Total Recursos Ordinarios** | **635.626.336** |

(Sin Recursos Extraordinarios este ejercicio — no hay fila de Desafectación de Previsiones/
Condonaciones en este Anexo, a diferencia de 2012/2014.)

## Anexo III — Detalle de Gastos (PDF página 27)

| DETALLE | Total al 31/08/2016 |
|---|---|
| Sueldos del Personal | 112.639.736 |
| Cargas Sociales | 18.694.347 |
| Fútbol Profesional | 99.361.355 |
| Organización de Partidos | 30.147.936 |
| Grales. Actividades Deportivas / Soc. | 49.287.058 |
| Mantenimiento | 5.121.782 |
| Sellados, Multas, Gtos Bancarios | 14.797.764 |
| Colegio | 1.077.987 |
| Sede Villa del Parque | 2.845.248 |
| Costo Transferencia de Jugadores | 19.501.483 |
| **SUBTOTAL** | **353.474.696** |
| Previsiones / Amortizaciones | 86.210.139 |
| **Total** | **439.684.835** |

## Anexo V — Activos y Pasivos en Moneda Extranjera (PDF página 30, continuación)

Tipo de cambio dominante del ejercicio (USD): **$14,8300**. Créditos en Euros por Mecanismo de
Solidaridad usan $16,5206 (tipo de cambio Euro, no usado como fx del ejercicio — el sitio convierte
en USD, mismo criterio de siempre).

## Verificación

- Revenue: Cuotas Sociales+Televisación+Campeonatos+Otros Torneos+Ingresos Alquiler+Ingresos
  Publicidad+Otros Ingresos Diversos+Otros Ingresos Deportivos+Transferencia de Jugadores+Ingresos
  Sede VdP+Ingresos Colegio = 611.968.373 = TOTAL DE RECURSOS impreso, exacto.
- Expenses (cash): Sueldos+Cargas Sociales+Fútbol Profesional+Organización de Partidos+Grales.
  Act. Deportivas+Mantenimiento+Sellados/Multas+Colegio+Sede VdP = 333.973.213.
- No-efectivo: Costo Transferencia de Jugadores (player_amortisation, 19.501.483) + Depreciación
  (depreciation, 1.968.198, Anexo I) + Previsiones/Amortizaciones (other_amortisation, 86.210.139)
  = 107.679.820.
- netInterest = Resultados Financieros y por tenencia (Intereses Financieros 4.065.311 +
  Diferencias de Cambio 19.592.652) = 23.657.963 (este ejercicio no desglosa un lado "Egresos"
  separado como los años anteriores — el neto ya viene positivo).
- Resultado: EBITDA = 611.968.373−333.973.213 = 277.995.160; operatingProfit =
  EBITDA−107.679.820 = 170.315.340; PBT = operatingProfit+netInterest (23.657.963) =
  **193.973.303**, EXACTO contra el "RESULTADO FINAL (Beneficio)" impreso.
- Cargado en `data/racing-data.js`: el balance pasa a ser el dato PRIMARIO de
  `racingRevenueLinesByYear[2016]`/`racingExpenseLinesByYear[2016]`/`racingFiscalYearMeta[2016]`
  (`reportType:'official_budget_and_balance'`, fx=14,83, `gestionId:'blanco'`,
  grossDebt=98.450187, cash=42.030653, netInterest=23.657963). Las líneas del presupuesto
  2015/2016 que ya estaban cargadas ahí se movieron, sin tocar un solo valor, a
  `racingPresupuestoOverlayByYear[2016]`.
