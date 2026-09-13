# Real Club Celta de Vigo, S.A.D. — Cuentas Anuales Individuales 2024-2025, Cuenta de Pérdidas y Ganancias

Transcripción de la cuenta de pérdidas y ganancias del PDF `cuentas-anuales-individual-2024-2025.pdf`,
ejercicio terminado el 30 de junio de 2025. Texto nativo (pdftotext limpio). Cifras en EUROS completos.
Se eligieron las cuentas INDIVIDUALES (no las consolidadas, también disponibles) para ser consistentes
con el resto de los clubes cargados esta sesión (todos individuales salvo Real Madrid/Barcelona, que
solo tenían consolidadas disponibles).

CUENTA DE PÉRDIDAS Y GANANCIAS correspondiente al ejercicio terminado al 30 de junio de 2025 (columnas: 30/06/2025 | 30/06/2024):

OPERACIONES CONTINUADAS
Importe neto de la cifra de negocios (14.1): 72.930.541,94 | 71.622.044,67
  Ingresos por competiciones: 3.789.801,19 | 3.217.825,27
  Ingresos por abonados y socios: 6.123.351,85 | 5.131.167,45
  Ingresos por retransmisión: 46.285.832,03 | 49.032.953,13
  Ingresos por publicidad: 12.580.023,75 | 10.181.896,66
  Ingresos por comercialización y otros: 4.151.533,12 | 4.058.202,16
Aprovisionamientos: (3.258.172,86) | (1.964.638,85)
  Otros consumos y gastos externos: (3.104.200,32) | (1.972.674,57)
  Deterioro de mercaderías, materias primas y otros: (153.972,54) | 8.035,72
Otros ingresos de explotación: 17.135.032,15 | 2.299.097,73
  Ingresos accesorios y otros de gestión corriente (14.3): 15.889.834,96 | 1.414.432,33
  Subvenciones de explotación incorporadas al resultado del ejercicio: 1.245.197,19 | 884.665,40
Gastos de personal (14.2): (62.349.565,62) | (70.138.910,02)
  Sueldos y salarios plantilla deportiva: (52.601.969,75) | (61.976.038,65)
  Sueldos y salarios personal no deportivo: (6.896.168,60) | (5.905.349,86)
  Cargas sociales: (2.851.427,27) | (2.257.521,51)
Otros gastos de explotación: (33.576.604,49) | (32.848.944,99)
  Servicios exteriores: (11.155.595,21) | (12.606.698,07)
  Tributos: (24.926,56) | (24.847,80)
  Pérdidas, deterioro y variación de provisiones por operaciones comerciales (10.1): (200.260,66) | (511.638,97)
  Desplazamientos: (3.054.748,41) | (2.795.041,76)
  Gastos de adquisición de jugadores (14.2): (11.683.760,99) | (7.143.975,67)
  Otros gastos de gestión corriente: (7.457.312,66) | (9.766.742,72)
Amortización del inmovilizado: (18.927.862,42) | (20.675.240,28)
  Amortización derechos adquisición de jugadores (8): (16.226.063,67) | (18.380.686,24)
  Otras amortizaciones (5 y 7): (2.701.798,75) | (2.294.554,04)
Imputación de subvenciones de inmovilizado no financiero y otras (17): 1.245.115,80 | 1.245.115,80
Deterioro y resultado por enajenaciones del inmovilizado (14.3): 26.807.049,15 | 41.229.052,82
  Resultados por enajenaciones y otras: - | (722.526,38)
  Resultados procedentes del traspaso de jugadores (8): 26.807.049,15 | 41.951.579,20
Otros resultados (14.3): (276.403,73) | 814.278,13

RESULTADO DE EXPLOTACIÓN: (270.870,08) | (8.418.144,99)

Ingresos financieros (14.3): 56.036,37 | 348.206,14
Gastos financieros (14.3): (6.279.748,87) | (888.298,05)
Diferencias de cambio: - | (17.415,19)

RESULTADO FINANCIERO: (6.223.712,50) | (557.507,10)
RESULTADO ANTES DE IMPUESTOS: (6.494.582,58) | (8.975.652,09)
Impuestos sobre beneficios (13.2): 1.868.266,34 | 1.433.199,36
RESULTADO DEL EJERCICIO: (4.626.316,24) | (7.542.452,73)

--- Balance (extracto deuda/caja) ---
Efectivo y otros activos líquidos equivalentes (Tesorería): 13.975.070,22 (30/06/2025)
Deudas a largo plazo (total): 58.054.988,04 (incluye deudas con entidades deportivas 7.712.510,
  otros pasivos financieros 50.134.357,33 — NO hay un subtotal separado "solo entidades de crédito"
  a largo plazo)
Deudas a corto plazo (total): 2.260.363,15 (Deudas con entidades de crédito a corto plazo: 0 este
  ejercicio, era 4.708.754,63 el ejercicio anterior)
=> Deuda financiera total (largo+corto): EUR 60.315.351,19

## Verificación de cuadre (a mano, EUR M)

Revenue (suma revenueLines) = 3,789801+6,123352+46,285832+12,580024+4,151533+17,135032+1,245116
  = 91,310690 M (los primeros 5 ya suman 72,930542 = Importe neto cifra de negocios impreso, exacto)
Expenses cash (wages_squad 55,453397 + otros 44,007351) = 99,460748 M
Non-cash (amortización) = 16,226064 (jugadores) + 2,701799 (resto) = 18,927863 M
Operating profit = 91,310690 - 99,460748 - 18,927863 = -27,077921 M
+ profitOnPlayerSales (26,807049, línea "Resultados procedentes del traspaso de jugadores")
  = -0,270872 M ≈ RESULTADO DE EXPLOTACIÓN impreso (-270.870,08) EXACTO (diferencia de EUR 2 por
  redondeo de muchos componentes)
+ netInterest (-6,223713) = -6,494585 M ≈ RESULTADO ANTES DE IMPUESTOS impreso (-6.494.582,58)
+ tax (+1,868266) = -4,626319 M ≈ RESULTADO DEL EJERCICIO impreso (-4.626.316,24), diferencias de
  centavos por redondeo acumulado, dentro de tolerancia.
