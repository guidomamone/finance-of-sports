# Presupuesto Financiero — Racing Club, Ejercicio 2018/2019 (1°/9/2018 al 31/8/2019)

Transcripción de `presupuesto2018-19.pdf` (9 páginas, **escaneo puro, sin capa de texto** —
confirmado con `pdftotext`, ~1 char/página — transcripto con el Read tool sobre imágenes de
página, no con `pdftotext`). Mismo formato de documento que `presupuesto2017-18.pdf`/
`presupuesto2019-20.pdf` (mismos rubros, mismas premisas macro, mismo estilo de tabla), el
ejercicio inmediato anterior a 2019/2020 en el archivo de Racing.

**Nota sobre el proceso de transcripción**: se verificó inclinación diagonal en las 9 páginas
(renderizadas a 150 DPI con `pdftoppm` y revisadas visualmente antes de leer el resto) — NINGUNA
está torcida, no hizo falta el script de deskew de `club-data-mapping/SKILL.md` sección 9. Las
páginas 8 y 9 (las tablas de Ingresos/Egresos) están escaneadas con el documento ORIGINAL en
landscape rotado 90° dentro de la página portrait — se rotó la imagen 90° (Python/PIL,
`img.rotate(90, expand=True)`) antes de leer, lo que las deja en orientación normal (rubros a la
izquierda, meses sep-18 a ago-19 como columnas, "Total del Período" a la derecha). Sin la rotación,
la tabla se lee técnicamente igual (el texto no queda espejado) pero con las filas resumen
("Total"/"Subtotal") impresas primero y el desglose después, en vez del orden natural — rotar la
hace mucho más fácil de auditar visualmente contra el PDF.

Los 2 totales de esta transcripción (columna "Total del Período") están verificados exhaustivamente:
cada subtotal impreso (A/B/C de Ingresos, A/B/C de Egresos, SUBTOTAL y TOTAL de ambos lados) cierra
EXACTO contra la suma de sus líneas — ver sección de Verificación al final. El desglose mes a mes
(columnas sep-18 a ago-19) se transcribió también en la lectura de las imágenes pero NO se vuelca acá
línea por línea (no se usa para cargar el sitio, que solo muestra el total anual por rubro), salvo
para confirmar que los 12 meses de cada fila efectivamente suman el "Total del Período" impreso.

## Páginas 1-7: portada, premisas y notas aclaratorias (texto completo)

```
PRESUPUESTO FINANCIERO
CORRESPONDIENTE AL PERIODO
01/09/2018 AL 31/08/2019


PRESUPUESTO ECONOMICO y FINANCIERO CORRESPONDIENTE AL
PERIODO 01/09/2018 AL 31/08/2019


PREMISAS MACRO

- Tipo de Cambio u$d: Estimamos un TC de $ 40.- por u$d 1.- en promedio para el período.
- Inflación: Estimamos un IPC (Índice de Precios al Consumidor) publicado por el INDEC
  (Instituto Nacional de Estadísticas y Censos) en torno al 30%.
- Incrementos Salariales de Convenio: Estimamos un alza comprendido entre el 25 y el 30%,
  respecto al periodo base.

NOTAS ACLARATORIAS

SALDO "CAJA Y BANCOS"

Se incluyen en el mismo, las disponibilidades en Efectivo, Saldos en Bancos, Imposiciones a
Plazo Fijo transferibles, y Cheques de terceros en Cartera, de primera línea y alta liquidez por
descuento.

RECURSOS DE FUNCIONAMIENTO

Recursos provenientes del Fútbol

Campeonatos Oficiales SAF/AFA / Competencias Internacionales / Otras Competencias y Partidos
Amistosos

Cuantifica las estimaciones en concepto de recaudación por partidos tanto sea en calidad de
local, como en calidad de visitante, considerando el desarrollo de campañas en los Torneos.

Se presupuesta la participación en Torneos CONMEBOL y Partidos Amistosos de Verano 2019, y Copa
Argentina Ediciones 2019.

Derechos de retransmisión

Es el ingreso ordinario recurrente por Derechos de transmisión se presupuesta el nivel de cuota
devengada y percibida en la actualidad. Según las negociaciones fructíferas llevada a cabo por
SAF.

Publicidad y Esponsorización del Fútbol

Respecto del último cuatrimestre 2018 se cuantifica el ingreso estimado según los contratos
actualmente vigentes. A partir de 2019 se renegociaran los mismos presupuestando mejoras
derivadas de las condiciones del mercado.

Los principales Sponsors corresponden a las marcas RCA, Kappa, Coca Cola, SMG, y Telecom.

Otros recursos de gestión

Cesión de jugadores – transferencias, préstamos

Estimamos ventas de jugadores en el período, producto de la revalorización y capitalización del
plantel, la inversión en Fútbol Amateur, y una aceptable campaña en los torneos a disputarse.

Asimismo, se considera el cobro de acreencias por transferencias de ejercicios anteriores.

Recursos por propiedad industrial / intelectual cedida en explotación

Se registran los ingresos provenientes del otorgamiento de concesiones, de espacios para fines
publicitarios por parte de terceros (Publicidad Estática Internacional SA), regalías por
comercialización de licencias sobre la marca Racing Club (Cía Marcas y Emprendimientos SA), y
demás concesiones de servicios sobre el Estadio.

Otros recursos de gestión por Fútbol

Se presupuesta el ingreso en concepto de derechos por la Contribución Solidaria y Derechos de
Formación de jugadores que, habiendo jugado en Racing, en divisiones inferiores, fueron
transferidos en forma sucesiva en diferentes ligas del exterior.

Recursos de otras secciones deportivas

Se presupuestan ingresos provenientes de las actividades de Básquet, Futsal, Fútbol Femenino,
Fútbol Infantil, Patín Artístico, Boxeo, Colonia de vacaciones, etc, practicadas tanto en el
Polideportivo de la ciudad de Avellaneda, como en la Sede Anexa de Villa del Parque (C.A.B.A.).

Otros recursos

Recursos por Socios y Abonados

Continuamos con la campaña de captación de socios con la finalidad mejorar el nivel de los
ingresos y procurar que los mismos sean sostenidos y regulares en el tiempo. Se estimulará la
adhesión al débito automático.

Se prevé incrementar el valor de la cuota social en el período bajo análisis. La cuantificación
de la misma será evaluada oportunamente autorizando a la Comisión Directiva a resolver el monto y
oportunidad hasta el equivalente al valor de dos entradas generales.

Por otra parte se esta analizando la viabilidad operativa de contemplar situaciones especiales de
grupos familiares numerosos.

Otros Recursos Ordinarios

Presupuesta el ingreso proveniente de la concesión de la Sede Avellaneda a la empresa Racing 2000
SA, eventos sociales, la Escuela, o otros no encuadrados específicamente en otros capítulos.

Recursos Extraordinarios

Este ingreso corresponde a los ingresos de los locales Locademia sitos de la Sede Social, Anexo
Villa del Parque, Lavalle 1650 de la Ciudad de Autónoma de Buenos Aires y la implementación del
e-commerce principalmente.

GASTOS DE FUNCIONAMIENTO

Gastos de Fútbol

Gastos de explotación del Estadio

Estima el gasto emergente del mantenimiento del Estadio, Servicios Públicos, y mantenimiento de
Canchas, entre otros.

Participación en campeonatos oficiales SAF/AFA

Estima los gastos asociados a los partidos disputados en los respectivos torneos, así como los
vinculados a la emisión de tickets y sistema operativo.

Remuneraciones plantel deportivo (incluido Cuerpo Técnico)

Presupuesta las remuneraciones brutas del plantel profesional.

Premios y Primas Plantel Deportivo.

Se estiman los mismos tanto para el Plantel Profesional, como Cuerpo Técnico, y Auxiliares del
Fútbol Profesional, en base a los acuerdos por campañas. Asimismo, se incluyen premios por
cumplimiento de objetivos relacionados a contratos individuales, y participación en torneos
amistosos, de verano 2019, y participación en Copa Argentina, 2019, y Torneos CONMEBOL 2019.

Por contrato se establece el pago de primas anuales, y primas adicionales por fichaje de
contratos individuales.

Otros gastos Plantel Profesional

Representa el gasto estimado inherente a contratos de Cuerpo Técnico, gastos de vivienda del
Plantel Profesional, alojamiento en concentraciones y traslados, y otros costos asociados el
Departamento de Fútbol, etc.

Pagos por Otros gastos de Gestión

Gastos de Fútbol Amateur

Contempla los cargos asociados al desarrollo de Fútbol Amateur (Infantiles y divisiones
inferiores), funcionamiento de la Pensión, y funcionamiento y mantenimiento del Centro deportivo
Tita Mattiussi, entre otros.

Subvenciones a Otras Secciones Deportivas

Estima el costo de otros Departamentos Amateur.

Otros Egresos

Gerencias Operativas

Presupuesta costos asociados a la operatividad central de la Institución.

Departamentos Auxiliares - No Incluidos en (A)

Presupuesta honorarios de profesionales contratados, costo neto de la cobertura médica del
plantel profesional, y costo de áreas comunes protegidas del Estadio, Sede Social, y Anexo VdP,
entre otros.

Gastos Generales de Administración y Pago de Otros gastos Operativos

Estima el gasto de proveedores comunes a distintas Área de la Institución, haberes del personal
(no incluye el Plantel Profesional de Fútbol), Obras Sociales, Sindicatos, Costo de Mercadería
Vendida Locademia, SICORE, etc.

EGRESOS EXTRAORDINARIOS

Aumento de Activos Fijos

Inversiones en el Estadio, Centro deportivo TM, Villa del Parque y Escuela

Durante el ejercicio económico se estima continuar con el mantenimiento de las instalaciones, así
como inversión en mejoras del Estadio, Centro Deportivo Tita Mattiussi, Polideportivo, las sedes
Avellaneda, Villa del Parque, Colegio y Ezeiza.

Pagos por compra de Activos Intangibles

Se cuantifican y consolidan las obligaciones contraídas en la compra de los jugadores.

En el rubro incorporaciones, si bien la prioridad está orientada a la promoción de jugadores de
las divisiones inferiores, la eventual necesidad de contrataciones, se encontrará supeditada al
cumplimiento presupuestario, y al nivel y calidad de ventas alcanzado.-

Disminución de Pasivos

Cancelación efectiva de pasivos

Se prevén fondos para atender la cancelación de sentencias judiciales adversas, acuerdos
prejudiciales, y aquellos que estimamos necesarios para las negociaciones que se están llevando a
cabo con acreedores de la quiebra con incidentes de revisión.

Contempla también el pago de financiaciones recibidas para el giro operativo, y otras deudas.

[Firmado: Dr. Pablo Jorge Mena, Secretario de Hacienda — Dr. Christian Enrique Devia, Secretario
General — Racing Club Asoc. Civil]
```

## Página 8: PRESUPUESTO FINANCIERO DE RECURSOS Y GASTOS — INGRESOS

| INGRESOS | Total del Período |
|---|---|
| SALDO INICIAL DE CAJA Y BANCOS (I) | 447.142.476 (*) |
| **A. INGRESOS PROVENIENTES DE FUTBOL** | |
| 1. Cobranzas de Ingresos Deportivos | |
| &nbsp;&nbsp;a. Campeonatos Oficiales SAF/AFA | 52.000.000 |
| &nbsp;&nbsp;b. Comp. Oficiales Internacionales | 32.670.000 |
| &nbsp;&nbsp;c. Otras Comp. y Partidos Amistosos | 3.730.000 |
| &nbsp;&nbsp;d. Derechos de Retransmisión | 137.154.000 |
| &nbsp;&nbsp;e. Pub. y Esponsorización Futbol | 100.000.000 |
| &nbsp;&nbsp;f. Otros Ingresos por derechos de fútbol | 0 |
| &nbsp;&nbsp;g. Otros Ingresos Dep. Futbol Prof. | 0 |
| 2. Cobranzas de Subvenciones a la Explotación | 0 |
| 3. Cobro de Otros Ingresos de Gestión | |
| &nbsp;&nbsp;a. Cesión de Jugadores (Transf. / Prést.) | 602.950.000 |
| &nbsp;&nbsp;b. Ingresos por Prop. Industrial / Intelectual cedida en Explotación | 10.968.650 |
| &nbsp;&nbsp;c. Otros Ingresos de Gestión por Futbol | 0 |
| **B. INGRESOS DE OTRAS SECCIONES DEPORTIVAS** | **19.000.000** |
| a. Cobranza de Ingresos de Otras Secciones Deportivas | 19.000.000 |
| **C. OTROS INGRESOS** | |
| 1. Cobranza de ingresos por Socios y Abonados | 404.494.000 |
| 2. Cobranza de Otros Ingresos Ordinarios | 85.700.000 |
| 3. Cobranza de Rentas Financieras Ordinarias | 91.960.000 |
| **SUBTOTAL INGRESOS ORDINARIOS (II)** | **1.540.626.650** |
| INGRESOS EXTRAORDINARIOS | |
| a. Cobros por Ventas de Bs de Uso | 0 |
| b. Cobros por Venta de Act. Intangibles | 0 |
| c. Cobro de Aporte de Socio al Fdo Social | 0 |
| d. Cobro de Subv., Donaciones y Legados | 3.400.000 |
| e. Préstamos Recibidos | 0 |
| f. Cobro por venta de Inversiones Fras. | 0 |
| g. Otros Cobros de Ing. Fros | 72.000.000 |
| h. Otros cobros de Ing. Extraordinarios | 0 |
| **SUBTOTAL INGRESOS EXTRAORDINARIOS (III)** | **75.400.000** |
| **TOTAL DE INGRESOS DE FDOS (I)+(II)+(III)** | **1.616.026.650** |

(*) Saldo inicial de caja al 1°/9/2018 (sep-18), no es un ingreso del período, es el punto de
partida del flujo de fondos — pese a la etiqueta de la fila "(I)+(II)+(III)", el total impreso
(1.616.026.650) es exactamente Ordinarios (II) + Extraordinarios (III), SIN sumar el saldo
inicial (I): 1.540.626.650 + 75.400.000 = 1.616.026.650 exacto — mismo comentario que ya dejó
`racingPresupuestoOverlayByYear[2018]` sobre esta misma etiqueta confusa del documento.

## Página 9: PRESUPUESTO FINANCIERO DE RECURSOS Y GASTOS — EGRESOS

| EGRESOS | Total del Período |
|---|---|
| **A. EGRESOS GENERADOS POR FUTBOL** | |
| 1. Pagos de Gastos Deportivos | |
| &nbsp;&nbsp;a. Gastos de Explotación del Estadio | 65.450.000 |
| &nbsp;&nbsp;b. Participación en Camp. Oficiales SAF/AFA | 46.700.000 |
| &nbsp;&nbsp;c. Part. en Campeonatos Internacionales | 25.000.000 |
| &nbsp;&nbsp;d. Participación en Otras Comp. y Partidos Amistosos | 0 |
| &nbsp;&nbsp;e. Remuneraciones Plantel Deportivo (Incluido Cuerpo Técnico) | 154.000.000 |
| &nbsp;&nbsp;f. Premios y Primas Plantel Deportivo | 177.000.000 |
| &nbsp;&nbsp;g. Otros Gastos Dep. Futbol Profesional | 296.700.000 |
| 2. Pagos por Otros Gastos de Gestión | |
| &nbsp;&nbsp;a. Gastos Fútbol Amateur | 66.000.000 |
| &nbsp;&nbsp;b. Subvenciones a Otras Entidades Deportivas | 0 |
| **B. EGRESOS DE OTRAS SECCIONES DEPORTIVAS** | **28.600.000** |
| a. Pago de Gtos de Otras Secciones Dep. | 28.600.000 |
| **C. OTROS EGRESOS** | |
| 1. Pago Gastos de Administración | |
| &nbsp;&nbsp;a. Comisión Directiva | 0 |
| &nbsp;&nbsp;b. Gerencias Operativas | 27.200.000 |
| &nbsp;&nbsp;c. Departamentos Auxiliares - No Incluidos en (A) | 22.000.000 |
| &nbsp;&nbsp;d. Gastos Generales de Administración | 54.000.000 |
| 2. Pago de Otros Gastos Ordinarios | 108.800.000 |
| 3. Pagos de Gastos Financieros | 2.400.000 |
| **SUBTOTAL EGRESOS ORDINARIOS (IV)** | **1.073.850.000** |
| EGRESOS EXTRAORDINARIOS | |
| 1. Aumento de Activos Fijos | |
| &nbsp;&nbsp;a. Pagos por compra de Bienes de Uso | 120.500.000 |
| &nbsp;&nbsp;b. Pago por compra de Activos Intangibles | 415.333.333 |
| &nbsp;&nbsp;c. Pagos por Colocaciones Fras. | 46.200.000 |
| 2. Disminución de Pasivos | |
| &nbsp;&nbsp;a. Cancelación Efectiva de Pasivos | 100.769.240 |
| &nbsp;&nbsp;b. Devolución Aportes al Fondo Social | 0 |
| 3. Otros Pagos por egresos extraord. | 0 |
| **SUBTOTAL EGRESOS EXTRAORDINARIOS (V)** | **682.802.573** |
| **TOTAL DE EGRESOS DE FDOS (IV)+(V)** | **1.756.652.573** |
| **FLUIR DE FONDOS DEL PERÍODO (I)+(II)+(III)-(IV)-(V)** | **306.516.553** |

## Verificación

- Ingresos: A (Cobranzas de Ingresos Deportivos: 52.000.000+32.670.000+3.730.000+137.154.000+
  100.000.000 = 325.554.000) + Cobro de Otros Ingresos de Gestión (602.950.000+10.968.650 =
  613.918.650) = 939.472.650, + B (19.000.000) + C (404.494.000+85.700.000+91.960.000 =
  582.154.000) = 1.540.626.650 = SUBTOTAL INGRESOS ORDINARIOS (II) impreso, exacto. + SUBTOTAL
  INGRESOS EXTRAORDINARIOS (3.400.000+72.000.000 = 75.400.000) = 1.616.026.650 = TOTAL DE INGRESOS
  DE FDOS impreso, exacto.
- Egresos: A (65.450.000+46.700.000+25.000.000+154.000.000+177.000.000+296.700.000+66.000.000 =
  830.850.000) + B (28.600.000) + C (27.200.000+22.000.000+54.000.000+108.800.000+2.400.000 =
  214.400.000) = 1.073.850.000 = SUBTOTAL EGRESOS ORDINARIOS (IV) impreso, exacto. + SUBTOTAL
  EGRESOS EXTRAORDINARIOS (120.500.000+415.333.333+46.200.000+100.769.240 = 682.802.573) =
  1.756.652.573 = TOTAL DE EGRESOS DE FDOS impreso, exacto.
- Fluir de Fondos: 447.142.476 (Saldo Inicial) + 1.616.026.650 (Ingresos) − 1.756.652.573
  (Egresos) = 306.516.553, exacto contra la columna "Total del Período" de "Fluir de Fondos del
  Período", que en esa fila puntual es el saldo de caja de ago-19 (cierre del ejercicio), no una
  suma de los 12 meses — mismo criterio de lectura que `racingPresupuestoOverlayByYear[2020]`.
- Cargado en `data/racing-data.js`, `racingRevenueLinesByYear[2019]`/`racingExpenseLinesByYear[2019]`
  (año PRESUPUESTO-ONLY, sin balance real todavía para este ejercicio, `reportType:'official_budget'`
  en `racingFiscalYearMeta[2019]`, fx=40 declarado en las Premisas Macro de la pág. 2).
