# Presupuesto Financiero — Racing Club, Ejercicio 2013/2014 (1°/9/2013 al 31/8/2014)

Transcripción de `presupuesto2013-14.pdf` (10 páginas, **escaneo puro, sin capa de texto** —
confirmado con `pdftotext`, ~1 char/página — transcripto con el Read tool sobre imágenes de
página, no con `pdftotext`). Mismo formato de documento y mismos rubros de base que
`presupuesto2017-18.pdf`/`presupuesto2018-19.pdf` (versión más temprana del mismo template,
firmada por Víctor Blanco como Presidente — primer presupuesto de su gestión cargado al sitio),
con más desglose que los ejercicios posteriores: separa Egresos Ordinarios en 2 páginas y agrega
una comparación explícita contra el "Total del Período 2012/2013" (columna "Diferencia"/
"Variación"), que esta transcripción NO usa (el sitio solo carga el ejercicio 2013/2014 puntual).

**Nota sobre el proceso de transcripción**: las 10 páginas renderizadas a 150 DPI no mostraban
ninguna inclinación diagonal. Las 3 páginas de tabla (Ingresos, Egresos Ordinarios, Egresos
Extraordinarios — páginas 8, 9 y 10) están en landscape rotado 90° dentro de la página portrait,
mismo caso que `presupuesto2018-19.pdf` (ver `club-data-mapping/SKILL.md` sección 9) — se rotaron
las 3 imágenes 90° antes de leerlas.

**Caso de lectura real encontrado (fila "Total del Período" desalineada visualmente)**: en la
página 9 (Egresos Ordinarios), la fila "h. Premios Plantel Deportivo" no muestra su columna
"Total del Período" alineada con sus propias columnas mensuales — el valor `$8.748.435` aparece
UNA fila más abajo en la imagen, junto a "i. Préstamos Plantel Deportivo" (que en sus 12 columnas
mensuales está en $0 todo el año). Se confirmó por aritmética que `$8.748.435` es la suma real de
los meses de la fila h (250.000+300.000+300.000+1.316.406×6 ≈ 8.748.436, redondeo de $1 contra el
impreso) — es un defecto de layout del PDF original (una celda de altura distinta corrió la
columna Total una fila), no un error de esta transcripción. Mismo tipo de trampa que la "fila
acumulada" de la sección 10 del skill, pero de otra naturaleza (desalineación de columna, no un
acumulado real) — vale la pena revisar con el mismo cuidado si un futuro documento de Racing repite
este patrón de columnas por fila con muchos sub-ítems.

Los 2 totales de esta transcripción (columna "Total del Período") están verificados
exhaustivamente: revenueLines/expenseLines suman EXACTO $244.351.831 (Ingresos) y $229.546.573
(Egresos) — ver sección de Verificación al final.

## Páginas 1-7: portada, premisas y notas aclaratorias (texto completo)

```
PRESUPUESTO FINANCIERO
CORRESPONDIENTE AL PERIODO
01/09/2013 AL 31/08/2014


PRESUPUESTO FINANCIERO CORRESPONDIENTE AL PERIODO 01/09/2013 AL
31/08/2014


PREMISAS MACRO

- Tipo de Cambio u$d: Estimamos una evolución del TC de $ 5,80.- por u$d 1.- para el
  31/12/13, y de $ 6,20.- por u$d 1.- para el semestre siguiente. Asimismo, estimamos un
  incremento en la cotización del Euro en torno al 20/25% para el período.
- Inflación: Estimamos un IPC (Índice de Precios al Consumidor) publicado por el INDEC
  (Instituto Nacional de Estadísticas y Censos) en torno al 10,2%, vs. información publicada por
  el Congreso de la Nación, del orden del 25%.
- Incrementos Salariales de Convenio: Estimamos un alza comprendido entre el 25 y el 27%,
  respecto al período base.

NOTAS ACLARATORIAS

SALDO "CAJA Y BANCOS"

Se incluyen en el mismo, las disponibilidades en Efectivo, Saldos en Bancos, y Cheques de
terceros en Cartera, de primera línea y alta liquidez por descuento.

INGRESOS ORDINARIOS

Ingresos provenientes del Fútbol

Campeonatos Oficiales AFA / Competencias Internacionales / Otras Competencias y Partidos
Amistosos

Cuantifica las estimaciones en concepto de recaudación por partidos tanto sea en calidad de
local, como en calidad de visitante, considerando el desarrollo de campañas en los Torneos.

Se presupuesta la participación en Torneos de Verano 2014, y Copa Argentina Edición 2014.

Derechos de Retransmisión

Es el ingreso ordinario recurrente por Derechos de TV dentro del Programa Nacional "Fútbol Para
Todos". Se presupuesta hasta fin de año el nivel de cuota devengada y percibida en la actualidad.
Preveemos a partir de Enero de 2014 un incremento del orden del 25%.

Publicidad y Esponsorización del Fútbol

Se cuantifica el ingreso estimado según los contratos actualmente vigentes. A finales de 2013 se
renegociarán los mismos presupuestando mejoras derivadas de las condiciones del mercado, y
capacidad estática ociosa actual en las instalaciones tanto del Estadio y Polideportivo
Avellaneda, en General.

Otros ingresos de gestión

Cesión de jugadores – transferencias, préstamos

Estimamos ventas de jugadores en el período por un valor aproximado de EUR 4.000.000.-,
producto de la revalorización y capitalización del plantel, la inversión en Fútbol Amateur, y una
buena campaña en los torneos a disputarse.

Asimismo, se considera el cobro de cuotas por las operaciones de transferencia de los jugadores
Castro, Fariña, y Centurión.

Ingresos por propiedad industrial / intelectual cedida en explotación

Se registran los ingresos provenientes del otorgamiento de concesiones, de espacios para fines
publicitarios por parte de terceros Publicidad Estática Internacional SA y nuevos contratos que
ya se están negociando para comercializar especialmente en la pantalla instalada en el estadio.

Otros ingresos de gestión por Fútbol

Se presupuesta el ingreso en concepto de derechos por la Contribución Solidaria y Derechos de
Formación de jugadores que, habiendo jugado en Racing, en divisiones inferiores, fueron
transferidos en forma sucesiva en diferentes ligas del exterior.

Ingresos de otras secciones deportivas

Se presupuestan ingresos provenientes de las actividades de Básquet, Futsal, Fútbol Infantil,
Patín Artístico, Boxeo, Colonia de vacaciones, etc, practicadas tanto en el Polideportivo de la
ciudad de Avellaneda, como en la Sede Anexa de Villa del Parque (C.A.B.A.).

Otros ingresos

Ingresos por Socios

Continuamos con la campaña de captación de socios con la finalidad mejorar el nivel de los
ingresos y procurar que los mismos sean sostenidos y regulares en el tiempo. Se estimulará la
adhesión al débito automático.

Se prevé incrementar el valor de la cuota social a partir del mes de Enero de 2014 por el
equivalente a dos entradas generales.

Ingresos varios Sede

Presupuesta el ingreso proveniente de la concesión de la Sede Avellaneda a la empresa Racing 2000
SA, eventos sociales, y el proveniente de la actividad de la Escuela. En este último caso, en el
segundo semestre el mayor flujo se justifica por el cobro de matrículas de reserva de vacantes
para el año siguiente.

Ingresos por Merchandising

Este ingreso corresponde a los ingresos de los locales Locademia sitos de la Sede Social, Anexo
Villa del Parque, y Lavalle 1650 de la Ciudad de Autónoma de Buenos Aires, principalmente.

EGRESOS ORDINARIOS

Egresos generados por Fútbol

Gastos de explotación del Estadio

Estima el gasto emergente de la apertura, mantenimiento del Estadio, Servicios Públicos, y
mantenimiento de Canchas, entre otros.

Participación en campeonatos oficiales AFA

Estima los gastos asociados a los partidos disputados en los respectivos torneos, así como los
vinculados a la emisión de tickets y sistema operativo.

Remuneraciones plantel deportivo

Presupuesta las remuneraciones brutas del plantel profesional.

Primas plantel

Por contrato se establece el pago de primas anuales divididas en 7 cuotas a pagar según el
cronograma detallado, y primas adicionales por fichaje de contratos individuales.

Premios plantel

Se estiman los mismos tanto para el Plantel Profesional, como Cuerpo Técnico, y Auxiliares del
Fútbol Profesional, en base a las campañas deportivas.

Asimismo, se incluyen premios por cumplimiento de objetivos relacionados a contratos
individuales, participación en torneos amistosos, torneos de Invierno 2014, torneos de verano
2014, Edición 2014 Copa Argentina.

Pretemporada

Presupuesta el costo estimado de dos pretemporadas previas a los comienzos de cada Torneo Local.

Otros gastos Plantel Profesional

Representa el gasto estimado inherente a contratos de Cuerpo Técnico, gastos de vivienda del
Plantel Profesional, alojamiento en concentraciones y traslados, y otros costos asociados el
Departamento de Fútbol, incluyendo costo por transferencia de jugadores.

Pagos de Otros gastos de Gestión

Inversiones en Amateur

Contempla los cargos asociados al desarrollo de Fútbol Amateur (Infantiles y divisiones
inferiores), funcionamiento de la Pensión, y funcionamiento y mantenimiento del predio Tita
Mattiussi, entre otros.

Estamos trabajando en la construcción de una cancha de fútbol de césped sintético que esperamos
terminar antes de la finalización del período presupuestado.

Gastos de seguridad

Estima el gasto inherente al personal contratado afectado a la seguridad del Club y Plantel
Profesional, así como servicios adicionales de la Policía de la Pcia de Bs As, y operativos
dispuestos por los Organismos de Contralor en la materia por la Participación en Torneos AFA /
Torneos Internacionales.

Servicios Médicos

Presupuesta honorarios de profesionales contratados para Primera División, costo de la cobertura
médica del plantel profesional, y costo de áreas comunes protegidas del Estadio, Sede Social, y
Anexo VdP, entre otros.

Egresos de otras secciones deportivas

Estima el costo de otros Departamentos Amateur.

Otros Egresos

Pago de gastos de administración

Presupuesta costos asociados a la operatividad central de la Institución (comunicaciones móviles
corporativas, asesoría legal, CCSS F. 931 AFIP, etc). Presupuestamos la contratación de una
auditoría de sistemas que nos evalúe la seguridad del sistema actual y nos efectúe
recomendaciones de mejora.

Pago de otros gastos ordinarios

Estima el gasto de proveedores comunes a distintas Área de la Institución, haberes del personal,
Obras Sociales, Sindicatos, entre otros.

Pago de moratorias e impuestos

Como su nombre lo indica contempla el pago de cuotas de moratorias y/o Planes de Pago, vigentes
por impuestos nacionales.

Pago de Otros Pasivos

Se presupuesta la cancelación de deudas por aportes para la gestión operativa y contratación de
jugadores.

EGRESOS EXTRAORDINARIOS

Aumento de Activos Fijos

Inversiones en el Estadio, Predio TM, Villa del Parque y Escuela

Durante el ejercicio económico se estima continuar con los Gastos de mantenimiento, así como
inversión en mejoras del Estadio, Predio TM, las sedes Avellaneda, Villa del Parque y Colegio.

Disminución de Pasivos

Cancelación efectiva de pasivos

Se prevén fondos para atender demandas judiciales y aquellos que estimamos necesarios para las
negociaciones que se están llevando a cabo con acreedores de la quiebra con incidentes de
revisión.

Contempla también el pago de financiaciones recibidas para el giro operativo, y cheques propios
emitidos pendientes de ingreso y de pago diferido.

Cancelación efectiva por compra de jugadores

Se cuantifican y consolidan las obligaciones contraídas en la compra de los jugadores.

En el rubro incorporaciones, si bien la prioridad esta orientada a la promoción de jugadores de
las divisiones inferiores, la eventual necesidad de contrataciones, se encontrará supeditada al
cumplimiento presupuestario, y al nivel y calidad de ventas alcanzado.

[Firmado: Dr. Christian Enrique Devia, Secretario General — Dr. Pablo Jorge Mena, Secretario de
Hacienda — Víctor Blanco Rodríguez, Presidente — Racing Club Asociación Civil]
```

## Página 8: PRESUPUESTO FINANCIERO DE RECURSOS Y GASTOS — INGRESOS

| INGRESOS | Total del Período |
|---|---|
| Saldo Inicial de Caja, Bancos, Cheques 3ros en Cartera | 13.569.206 (*) |
| **A. INGRESOS PROVENIENTES DE FUTBOL** | |
| 1. Cobranzas de Ingresos Deportivos | |
| &nbsp;&nbsp;a. Campeonatos Oficiales AFA | 8.810.000 |
| &nbsp;&nbsp;b. Comp. Oficiales Internacionales | 0 |
| &nbsp;&nbsp;c. Otras Comp. y Partidos Amistosos | 2.400.000 |
| &nbsp;&nbsp;d. Derechos de Retransmisión | 35.200.000 |
| &nbsp;&nbsp;e. Pub. y Esponsorización Futbol | 23.166.673 |
| &nbsp;&nbsp;f. Otros Ingresos por alquiler de cancha | 270.000 |
| &nbsp;&nbsp;g. Otros Ingresos Dep. Futbol Prof. | 0 |
| 2. Cobranzas de Subvenciones a la Explotación | 0 |
| 3. Cobro de Otros Ingresos de Gestión | |
| &nbsp;&nbsp;a. Cesión de Jugadores (Transf. / Prést.) | 85.802.408 |
| &nbsp;&nbsp;b. Ingresos por Prop. Industrial / Intelectual cedida en Explotación | 6.125.000 |
| &nbsp;&nbsp;c. Otros Ingresos de Gestión por Futbol | 11.790.000 |
| **B. INGRESOS DE OTRAS SECCIONES DEPORTIVAS** | **2.590.000** |
| a. Cobranza de Ingresos de Otras Secciones Deportivas | 2.590.000 |
| **C. OTROS INGRESOS** | |
| a. Ingresos por Socios | 47.300.000 |
| b. Ingresos Varios Sede | 4.953.750 |
| c. Ingresos por Merchandising | 9.350.000 |
| **SUBTOTAL INGRESOS ORDINARIOS (II)** | **237.757.831** |
| INGRESOS EXTRAORDINARIOS | |
| a. Ingresos por Ventas de Bs de Uso | 0 |
| b. Ingresos por Venta de Act. Intangibles | 0 |
| c. Cobro de Aporte de Socio al Fdo Social | 0 |
| d. Cobro de Subv., Donaciones y Legados | 5.994.000 |
| e. Préstamos Recibidos | 0 |
| f. Cobro por venta de Inversiones Fras. | 0 |
| g. Otros Cobros de Ing. Fros - Plazo Fijo | 0 |
| h. Otros cobros de Ing. Extraordinarios | 600.000 |
| **SUBTOTAL INGRESOS EXTRAORDINARIOS (III)** | **6.594.000** |
| **TOTAL DE INGRESOS DE FDOS (I)+(II)+(III)** | **244.351.831** |

(*) Saldo inicial de caja al 1°/9/2013 (sep-13), no es un ingreso del período — mismo comentario
que ya dejaron `racing-presupuesto-2018-19.md`/`racingPresupuestoOverlayByYear[2018]` sobre esta
misma etiqueta confusa: el total impreso es Ordinarios (II) + Extraordinarios (III), sin sumar (I).

## Página 9: PRESUPUESTO FINANCIERO DE RECURSOS Y GASTOS — EGRESOS ORDINARIOS

| EGRESOS | Total del Período |
|---|---|
| **A. EGRESOS GENERADOS POR FUTBOL** | |
| 1. Pagos de Gastos Deportivos | |
| &nbsp;&nbsp;a. Gastos de Explotación del Estadio | 2.310.000 |
| &nbsp;&nbsp;b. Participación en Camp. Oficiales AFA | 5.353.950 |
| &nbsp;&nbsp;c. Part. en Campeonatos Internacionales | 226.400 |
| &nbsp;&nbsp;d. Participación en Otras Comp. y Partidos Amistosos | 0 |
| &nbsp;&nbsp;e. Gtos Derechos Televisación | 648.000 |
| &nbsp;&nbsp;f. Remuneraciones Plantel Deportivo | 22.988.878 |
| &nbsp;&nbsp;g. Primas Plantel Deportivo | 22.670.010 |
| &nbsp;&nbsp;h. Premios Plantel Deportivo | 8.748.435 (**) |
| &nbsp;&nbsp;i. Préstamos Plantel Deportivo | 0 |
| &nbsp;&nbsp;j. Pretemporada | 990.000 (**) |
| &nbsp;&nbsp;k. Otros Gastos Dep. Futbol Profesional | 28.166.451 |
| 2. Pagos por Otros Gastos de Gestión | |
| &nbsp;&nbsp;a. Inversiones en Amateur | 7.145.684 |
| &nbsp;&nbsp;b. Gastos de Seguridad | 6.426.500 |
| &nbsp;&nbsp;c. Servicios Médicos | 1.785.000 |
| **B. EGRESOS DE OTRAS SECCIONES DEPORTIVAS** | **2.091.000** |
| a. Pago de Gtos de Otras Secciones Dep. | 2.091.000 |
| **C. OTROS EGRESOS** | |
| 1. Pago Gastos de Administración | |
| &nbsp;&nbsp;a. Gerencias Operativas Sede | 0 |
| &nbsp;&nbsp;b. Departamentos Auxiliares - Socios | 630.000 |
| &nbsp;&nbsp;c. Departamentos Auxiliares - Imagen / Prensa | 600.000 |
| &nbsp;&nbsp;d. Gastos Generales de Administración | 6.570.000 |
| 2. Pago de Otros Gastos Ordinarios | 37.975.000 |
| 3. Pago de Moratoria | 3.600.000 |
| 4. Pago de Otros Pasivos | 25.655.611 |
| **SUBTOTAL EGRESOS ORDINARIOS (IV)** | **184.580.919** |

(**) Ver nota de proceso al principio del archivo: en el PDF original, los valores impresos de
"Total del Período" de las filas h ("Premios Plantel Deportivo") e i ("Préstamos Plantel
Deportivo") aparecen visualmente corridos una fila hacia abajo (columna Total desalineada de sus
propias columnas mensuales). Confirmado por aritmética contra los 12 meses de cada fila: h =
8.748.435 (no 0), i = 0 (no 8.748.435), y "j. Pretemporada" = 990.000 (visible en el margen
derecho de la tabla, más allá de donde se ve la columna de meses en esta transcripción). Esta
corrección es la que hace cerrar el Subtotal Egresos Ordinarios exacto (sin ella, faltaban
$990.000 contra el impreso).

## Página 10: PRESUPUESTO FINANCIERO DE RECURSOS Y GASTOS — EGRESOS EXTRAORDINARIOS

| EGRESOS EXTRAORDINARIOS | Total del Período |
|---|---|
| 1. Aumento de Activos Fijos | |
| &nbsp;&nbsp;a. Pagos por compra de Bienes de Uso | 500.000 |
| &nbsp;&nbsp;b. Pago por compra de Inv. Estadio | 1.300.000 |
| &nbsp;&nbsp;c. Pagos por Colocaciones Fras. | 7.500.000 |
| 2. Disminución de Pasivos | |
| &nbsp;&nbsp;a. Cancelación Efectiva de Pasivos | 28.165.654 |
| &nbsp;&nbsp;b. Cancelación Efva por Cpra de Jug. | 7.500.000 |
| 3. Otros Pagos por egresos extraord. | 0 |
| **SUBTOTAL EGRESOS EXTRAORDINARIOS (V)** | **44.965.654** |
| **TOTAL DE EGRESOS DE FDOS (IV)+(V)** | **229.546.573** |
| **SALDO FONDO FINANCIERO** (ago-14, cierre) | **28.374.465** |

## Verificación

- Ingresos: A (Cobranzas de Ingresos Deportivos: 8.810.000+2.400.000+35.200.000+23.166.673+
  270.000 = 69.846.673) + Cobro de Otros Ingresos de Gestión (85.802.408+6.125.000+11.790.000 =
  103.717.408) = 173.564.081, + B (2.590.000) + C (47.300.000+4.953.750+9.350.000 = 61.603.750) =
  237.757.831 = SUBTOTAL INGRESOS ORDINARIOS (II) impreso, exacto. + SUBTOTAL INGRESOS
  EXTRAORDINARIOS (5.994.000+600.000 = 6.594.000) = 244.351.831 = TOTAL DE INGRESOS DE FDOS
  impreso, exacto.
- Egresos: A (2.310.000+5.353.950+226.400+648.000+22.988.878+22.670.010+8.748.435+990.000+
  28.166.451+7.145.684+6.426.500+1.785.000 = 107.459.308) + B (2.091.000) + C
  (630.000+600.000+6.570.000+37.975.000+3.600.000+25.655.611 = 75.030.611) = 184.580.919 =
  SUBTOTAL EGRESOS ORDINARIOS (IV) impreso, exacto. + SUBTOTAL EGRESOS EXTRAORDINARIOS
  (500.000+1.300.000+7.500.000+28.165.654+7.500.000 = 44.965.654) = 229.546.573 = TOTAL DE
  EGRESOS DE FDOS impreso, exacto.
- Resultado: 244.351.831 − 229.546.573 = 14.805.258, SUPERÁVIT real del ejercicio (no impreso
  como fila propia en este documento — a diferencia de un balance auditado, este presupuesto no
  declara un "Resultado" consolidado explícito, solo Ingresos/Egresos/Saldo Fondo Financiero por
  separado).
- Cargado en `data/racing-data.js`, `racingRevenueLinesByYear[2014]`/`racingExpenseLinesByYear[2014]`
  (año PRESUPUESTO-ONLY, sin balance real todavía para este ejercicio, `reportType:'official_budget'`
  en `racingFiscalYearMeta[2014]`, fx=6,00 = promedio de los 2 puntos que declara el propio
  presupuesto como premisa: $5,80 al 31/12/13 y $6,20 para el semestre siguiente, mismo criterio
  que usa Boca 2027 para un presupuesto con 2 puntos de tipo de cambio declarados).
