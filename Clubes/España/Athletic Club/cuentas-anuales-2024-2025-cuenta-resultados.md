# Athletic Club (Bilbao) — Cuentas Anuales 2024-2025, Cuenta de Pérdidas y Ganancias

Transcripción de la cuenta de pérdidas y ganancias del PDF `cuentas-anuales-2024-2025.pdf`, ejercicio
terminado el 30 de junio de 2025. Texto nativo (pdftotext limpio). Cifras en EUROS completos.

Cuenta de PÉRDIDAS Y GANANCIAS al cierre del ejercicio terminado el 30/06/2025 (columna 30.06.2025 | 30.06.2024):

A) OPERACIONES CONTINUADAS
1. Importe neto de la cifra de negocios: 166.399.357,65 | 124.472.153,56
   a) Ingresos deportivos: 139.462.258,70 | 98.247.400,24
   b) Ingresos por abonados y socios: 26.937.098,95 | 26.224.753,32
2. Variación de existencias de productos terminados y en curso de fabricación: -7.074,70 | -54.389,46
4. Aprovisionamientos: -1.479.334,80 | -2.472.754,34 (b) Otros consumos y gastos externos)
5. Otros ingresos de explotación: 3.922.252,14 | 5.073.125,66
   a) Ingresos accesorios y otros de gestión corriente: 3.563.424,27 | 4.751.823,79
   b) Subvenciones de explotación incorporadas al resultado del ejercicio: 358.827,87 | 321.301,87
6. Gastos de personal: -122.072.537,53 | -112.798.317,77
   a) Sueldos y salarios plantilla deportiva: -100.826.491,11 | -95.739.763,60
   b) Otros Sueldos, salarios y asimilados: -16.375.180,40 | -13.071.308,06
   c) Cargas sociales: -4.870.866,02 | -3.987.246,11
7. Otros gastos de explotación: -31.083.210,17 | -14.388.018,12
   a) Servicios exteriores: -15.926.376,61 | -14.623.209,67
   b) Tributos: -431.788,05 | -437.047,10
   c) Desplazamientos: -4.222.024,85 | -3.396.185,34
   e) Pérdidas, deterioro y variación de provisiones por operaciones comerciales: 260.108,71 | 14.164.856,32
   f) Otros gastos de gestión corriente: -10.763.129,37 | -10.096.432,33
8. Amortización del inmovilizado: -11.089.739,01 | -7.170.319,22 (NOTA: el documento NO separa
   amortización de derechos de jugadores del resto — Athletic Club es política de cantera/solo
   jugadores vascos, compra muy pocos pases, se asumió que esta línea es mayormente depreciación de
   activos fijos, no amortización de fichajes; se cargó entera como `depreciation`, no
   `player_amortisation`, documentado como aproximación razonable dado el modelo del club).
9. Imputación de subvenciones de inmovilizado no financiero y otras: 157.316,05 | 182.200,95
11. Deterioro y resultado por enajenaciones del inmovilizado: 2.391.897,85 | 6.611.500,00
    b) Resultados por enajenaciones del inmovilizado intangible, material y otras: 2.391.897,85 | 6.611.500,00
13. Otros Resultados: 1.030.427,17 | 986.639,13

A.1) RESULTADO DE EXPLOTACIÓN: 8.169.354,65 | 441.820,39

14. Ingresos financieros: 584.635,25 | 521.105,03
15. Gastos financieros: -163.314,74 | -124.732,71
17. Diferencias de cambio: 129,28 | -
18. Deterioro y resultado por enajenaciones de instrumentos financieros: -898.418,00 | -838.192,71

A.2) RESULTADO FINANCIERO: -476.968,21 | -441.820,39
A.3) RESULTADO ANTES DE IMPUESTOS: 7.692.386,44 | 0,00
19. Impuestos sobre beneficios: -711.650,66 | -
A.4/A.5) RESULTADO DEL EJERCICIO: 6.980.735,78 | 0,00

--- Balance (extracto caja) ---
Efectivo y otros activos líquidos equivalentes: 46.086.948,18 (2024/25)
No se encontró ninguna línea "Deudas con entidades de crédito" en el balance — consistente con el
modelo de Athletic Club de no tener deuda bancaria significativa. grossDebt se cargó en 0.

## Verificación de cuadre (a mano, EUR M)

Revenue (suma revenueLines) = 139,462259+26,937099+3,922252+0,157316+1,030427 = 171,509353 M
Expenses cash (wages_squad 105,697357 + otros 48,944800) = 154,642157 M
Non-cash (depreciation, toda la amortización) = 11,089739 M
Operating profit = 171,509353 - 154,642157 - 11,089739 = 5,777457 M
+ profitOnPlayerSales (2,391898, línea "Deterioro y resultado por enajenaciones del inmovilizado")
  = 8,169355 M ≈ RESULTADO DE EXPLOTACIÓN impreso (8.169.354,65) EXACTO
+ netInterest (-0,476968) = 7,692387 M ≈ RESULTADO ANTES DE IMPUESTOS impreso (7.692.386,44)
+ tax (-0,711651) = 6,980736 M ≈ RESULTADO DEL EJERCICIO impreso (6.980.735,78) EXACTO
