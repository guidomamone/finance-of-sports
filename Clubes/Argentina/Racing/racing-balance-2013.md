# Memoria y Balance — Racing Club, Ejercicio N° 111 (1°/11/2012 al 31/10/2013)

Transcripción de `balance2013.pdf` (28 páginas, **escaneo puro, sin capa de texto** — confirmado
con `pdftotext`, ~1 char/página — transcripto con el Read tool sobre imágenes de página, no con
`pdftotext`). 110° aniversario del club (1903-2013). Mismo formato "Generales/Específicos/Diversos"
(Anexo II) que 2009-2012, sin decisiones nuevas de categorización.

**Presidencia — incertidumbre real, no resuelta con certeza**: a diferencia de 2012 (Gastón
Federico Cogorno, firma visible como "Presidente") y de 2014/2015 en adelante (Víctor Blanco
Rodríguez, firma visible), NINGUNA página de este balance en particular (Activo, Pasivo, ni la
Memoria) muestra una firma rotulada "Presidente" — solo aparecen el Secretario General (Christian
Devia) y el Secretario de Hacienda (Pablo Mena). La Memoria está fechada "Avellaneda, 02 de
diciembre de 2013". Racing eligió a Víctor Blanco presidente en las elecciones de diciembre de
2013 (dato de conocimiento general, no confirmado releyendo este documento en detalle) — dado que
la Memoria se presentó el 2/12/2013, probablemente ANTES de esas elecciones, se cargó
`gestionId:null` (mismo criterio que 2009-2012, "pre-Blanco"), pero esto es una inferencia por
fecha, no una confirmación directa del documento. Si una sesión futura encuentra la página con la
firma del Presidente de este ejercicio puntual, corregir acá y en `racingFiscalYearMeta[2013]` si
hiciera falta.

**Nota sobre el proceso de transcripción**: las 28 páginas renderizadas a 150 DPI no mostraban
ninguna inclinación diagonal (el escaneo es de menor calidad/contraste que otros años del archivo,
con manchas y sombras, pero el texto se lee sin ambigüedad). Los Anexos II, III y el de Moneda
Extranjera están en landscape rotado dentro de la página portrait
(`club-data-mapping/SKILL.md` sección 9) — se rotaron las imágenes antes de leerlas.

**Caso de lectura real (columnas Generales/Específicos desalineadas del orden visual de las
filas)**: en el Anexo III (Detalle de Gastos), una primera lectura ingenua de la columna "Total al
31/10/2013" alineando cada número con la fila inmediatamente a su izquierda daba una suma
$4.112.594 corta contra el SUBTOTAL impreso. Releyendo con más cuidado (renderizado a 300 DPI y
comparando contra la suma real de Generales+Específicos fila por fila), el valor correcto de
"Organización de Partidos" es $6.815.239 (no $4.112.593, que en realidad pertenece a la columna
Generales de esa fila pero el Total real usa Específicos) y "Grales. Actividades Deportivas/Soc."
es $13.000.589 (no $8.887.996). Con esta corrección, el subtotal cierra exacto — ver Verificación.
Mismo tipo de trampa de alineación que ya se había visto en `presupuesto2013-14.pdf`/
`presupuesto2015-16.pdf` (fila "Pretemporada"/"Premios Plantel Deportivo"), pero acá afecta a un
balance en vez de a un presupuesto.

## Página 6 (PDF): ACTIVO — Estado de Situación Patrimonial

| ACTIVO | 31/10/2013 | 31/10/2012 |
|---|---|---|
| **Activo Corriente** | | |
| Caja y Bancos | 4.180.729 | 1.275.318 |
| Inversiones | 0 | 0 |
| Créditos | 81.139.857 | 47.729.163 |
| Bienes de Cambio | 4.297.278 | 971.902 |
| Otros Créditos | 0 | 28.790 |
| Bienes Intangibles | 6.208.772 | 1.313.263 |
| **Total del Activo Corriente** | **95.826.636** | **51.318.436** |
| **Activo No Corriente** | | |
| Bienes de Uso (Anexo I) | 42.429.577 | 42.455.860 |
| Créditos Blanquiceleste | 1.361.861 | 1.361.860 |
| Otros Créditos | 28.790 | 0 |
| Bienes Intangibles | 59.524.439 | 75.192.531 |
| **Total del Activo No Corriente** | **103.344.666** | **119.010.251** |
| **TOTAL DEL ACTIVO** | **199.171.301** | **170.328.688** |

## Página 7 (PDF): PASIVO Y PATRIMONIO NETO

| PASIVO Y PATRIMONIO NETO | 31/10/2013 | 31/10/2012 |
|---|---|---|
| **Pasivo Corriente** | | |
| Deudas Sociales | 6.486.856 | 3.201.470 |
| Deudas Comerciales | 7.207.584 | 5.659.635 |
| Deudas Fiscales | 4.657.814 | 7.741.331 |
| Otras Deudas | 29.932.057 | 31.226.090 |
| Previsiones | 8.667.634 | 3.485.174 |
| **Total del Pasivo Corriente** | **56.951.946** | **51.313.700** |
| **Pasivo No Corriente** | | |
| Deudas Sociales | 11.120.678 | 6.664.818 |
| Deudas Fiscales | 10.074.821 | 1.810.920 |
| Otras Deudas | 29.732.569 | 29.174.201 |
| Previsiones | 25.150.893 | 26.451.492 |
| **Total del Pasivo No Corriente** | **76.078.960** | **64.101.432** |
| **TOTAL DEL PASIVO** | **133.030.906** | **115.415.132** |
| Patrimonio Neto (según estado respectivo) | 66.140.394 | 54.913.556 |
| **TOTAL DEL PASIVO Y PATRIMONIO NETO** | **199.171.301** | **170.328.688** |

## Página 8 (PDF): ESTADO DE RECURSOS Y GASTOS

| | 31/10/2013 | 31/10/2012 |
|---|---|---|
| Recursos Generales (Anexo II) | 66.275.045 | 58.840.115 |
| Recursos Específicos (Anexo II) | 116.461.089 | 119.974.950 |
| Recursos Diversos (Anexo II) | 5.954.820 | 5.976.837 |
| **TOTAL DE RECURSOS** | **188.690.953** | **184.791.901** |
| Gastos Generales (Anexo III) | 64.317.204 | 46.386.231 |
| Gastos Específicos (Anexo III) | 93.810.497 | 94.665.926 |
| **TOTAL DE GASTOS** | **158.127.701** | **141.052.157** |
| **RESULTADO OPERATIVO** | **30.563.252** | **43.739.745** |
| Amortizaciones (Anexo I) | 1.486.409 | 1.442.073 |
| Resultados Financieros — Ingresos: Intereses Financieros | 0 | 19.310 |
| Resultados Financieros — Ingresos: Diferencias de Cambio (Anexo II) | 12.161.277 | 6.059.035 |
| Resultados Financieros — Egresos: Intereses Financieros | 8.118.986 | 5.033.629 |
| Resultados Financieros — Egresos: Diferencias de Cambio | 3.876.170 | 2.025.653 |
| Recursos Extraordinarios (Anexo II) | 0 | 0 |
| Egresos Extraordinarios (Anexo III) | 18.016.124 | 24.292.381 |
| **RESULTADO FINAL (Beneficio)** | **11.226.840** | **17.024.354** |

## Página 5 (PDF): BIENES DE USO — ANEXO I (Amortizaciones del Ejercicio)

| Rubro | Amortización del Ejercicio 2013 |
|---|---|
| Inmuebles y Terrenos | 191.318 |
| Construcciones | 883.941 |
| Aparatos y Elementos Deportivos | 79.629 |
| Instalaciones | 157.605 |
| Máquinas y Herramientas | 47.482 |
| Muebles y Útiles | 126.434 |
| **TOTALES** | **1.486.409** |

## Página 11 (PDF): RECURSOS ORDINARIOS Y EXTRAORDINARIOS — ANEXO II

| DETALLE | Total al 31/10/13 |
|---|---|
| Cuotas Sociales | 41.980.607 |
| Televisación / Televisión AFA | 32.510.718 |
| Campeonatos Oficiales | 5.723.933 |
| Otros Torneos | 2.039.223 |
| Ingresos Alquiler | 538.175 |
| Ingresos Publicidad | 22.911.354 |
| Otros Ingresos Diversos | 13.504.244 |
| Otros Ingresos Deportivos | 1.505.573 |
| Transferencia de Jugadores | 63.588.544 |
| Ingresos Sede Villa del Parque | 651.300 |
| Ingresos Colegio | 3.737.282 |
| Resultados Financieros | 12.161.277 |
| **Total Recursos Ordinarios** | **200.852.230** |
| Desafectación Previsiones / Provisiones | 0 |
| Condonaciones | 0 |
| **Total Recursos Extraordinarios** | **0** |
| **TOTALES** | **200.852.230** |

## Página 12 (PDF): DETALLE DE GASTOS — ANEXO III

| DETALLE | Total al 31/10/2013 |
|---|---|
| Sueldos del Personal | 49.704.889 |
| Cargas Sociales | 8.046.589 |
| Fútbol Profesional | 55.534.786 |
| Organización de Partidos | 6.815.239 |
| Grales. Actividades Deportivas / Soc. | 13.000.589 |
| Mantenimiento | 1.321.368 |
| Sellados, Multas, Gtos Bancarios | 331.475 |
| Colegio | 1.153.084 |
| Sede Villa del Parque | 1.617.500 |
| Costo Transferencia de Jugadores | 20.602.181 |
| **SUBTOTAL** | **158.127.700** |
| Cargos Extraordinarios (Previsiones / Otras Amortizaciones) | 18.016.124 |
| **Total** | **176.143.824** |

(Los totales impresos son $158.127.701/$176.143.825 — diferencia de $1 por redondeo interno del
propio documento, no de esta transcripción.)

## Página 13 (PDF): ACTIVOS Y PASIVOS EN MONEDA EXTRANJERA

Tipo de cambio dominante del ejercicio (Caja y Bancos y la mayoría de "Otros Créditos" del período
corriente): **$5,8720 por U$S**. Algunas líneas de crédito heredadas ("Blanquic.Créditos Varios",
"Blanquic Créditos Por Ventas/transf Jugadores") mantienen tipos de cambio históricos congelados
($3,3480, $4,2677) — no representativos del ejercicio, no se usaron.

## Verificación

- Revenue: Cuotas Sociales+Televisación+Campeonatos+Otros Torneos+Ingresos Alquiler+Ingresos
  Publicidad+Otros Ingresos Diversos+Otros Ingresos Deportivos+Transferencia de Jugadores+Ingresos
  Sede VdP+Ingresos Colegio = 188.690.953 = TOTAL DE RECURSOS impreso, exacto. Sin Recursos
  Extraordinarios este ejercicio.
- Expenses (cash): Sueldos+Cargas Sociales+Fútbol Profesional+Organización de Partidos+Grales.
  Act. Deportivas+Mantenimiento+Sellados/Multas+Colegio+Sede VdP = 137.525.519.
- No-efectivo: Costo Transferencia de Jugadores (player_amortisation, 20.602.181) + Amortizaciones
  Bienes de Uso (depreciation, 1.486.409, Anexo I) + Cargos Extraordinarios/Previsiones
  (other_amortisation, 18.016.124) = 40.104.714.
- netInterest = Resultados Financieros Ingresos (0+12.161.277=12.161.277) − Egresos
  (8.118.986+3.876.170=11.995.156) = 166.121.
- Resultado: EBITDA = 188.690.953−137.525.519 = 51.165.434; operatingProfit = EBITDA−40.104.714 =
  11.060.720; PBT = operatingProfit+netInterest (166.121) = **11.226.841**, contra el "RESULTADO
  FINAL (Beneficio)" impreso ($11.226.840) — cierra exacto salvo $1 de redondeo.
- Cargado en `data/racing-data.js`, `racingRevenueLinesByYear[2013]`/`racingExpenseLinesByYear[2013]`
  (balance real, `reportType:'official_balance_sheet'` en `racingFiscalYearMeta[2013]`, fx=5,8720,
  `gestionId:null` — ver nota de incertidumbre sobre presidencia arriba), grossDebt=133.030906
  (TOTAL DEL PASIVO), cash=4.180729 (Caja y Bancos), netInterest=0.166121.
