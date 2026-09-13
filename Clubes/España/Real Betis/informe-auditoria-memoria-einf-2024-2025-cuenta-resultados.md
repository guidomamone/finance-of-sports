# Real Betis Balompié, S.A.D. — Ejercicio 2024-25, Cuenta de Pérdidas y Ganancias

Transcripción de la cuenta de pérdidas y ganancias del PDF `informe-auditoria-memoria-einf-2024-2025.pdf`,
ejercicio terminado el 30 de junio de 2025. Texto nativo (pdftotext limpio). Cifras en EUROS completos.

CUENTA DE PÉRDIDAS Y GANANCIAS al 30 de junio de 2025 (columnas: 30.06.2025 | 30.06.2024):

OPERACIONES CONTINUADAS
Importe neto de la cifra de negocios (15.1): 150.628.896 | 138.606.824
  Ingresos por competiciones nacionales: 5.986.473 | 4.161.972
  Ingresos por competiciones europeas: 20.730.690 | 15.785.945
  Ingresos por abonados y socios: 21.663.176 | 20.681.375
  Ingresos por retransmisión: 64.957.035 | 68.146.116
  Ingresos de comercialización y publicidad: 37.291.523 | 29.831.415
Trabajos realizados por la empresa para su activo: 546.884 | 606.044
Aprovisionamientos (15.2): (12.717.010) | (10.767.618)
  Consumo de material deportivo: (3.979.839) | (3.389.707)
  Otros consumos y gastos externos: (8.737.170) | (7.003.648)
  Deterioro de mercaderías, materias primas y otros aprovisionamientos: - | (374.263)
Otros ingresos de explotación: 7.146.189 | 4.532.095
  Ingresos accesorios y otros de gestión corriente: 6.259.506 | 3.943.863
  Subvenciones de explotación incorporadas al resultado del ejercicio: 886.683 | 588.232
Gastos de personal (15.3): (102.729.761) | (106.882.003)
  Sueldos y salarios de plantilla deportiva: (85.404.892) | (87.244.340)
  Otros sueldos, salarios y asimilados: (12.544.400) | (15.486.409)
  Cargas sociales: (4.780.469) | (4.151.254)
Otros gastos de explotación: (47.597.496) | (31.908.853)
  Servicios exteriores (15.4): (28.652.025) | (22.615.397)
  Tributos: (481.227) | (475.833)
  Desplazamientos: (7.787.003) | (5.783.975)
  Gastos cesión de jugadores: (5.725.000) | (669.150)
  Otros gastos de gestión corriente: (2.461.770) | (2.364.498)
  Pérdidas, deterioro y variación de provisiones por operaciones comerciales: (2.490.471) | -
Amortización del inmovilizado (5 y 6): (27.257.054) | (25.621.091)
Imputación de subvenciones de inmovilizado no financiero y otras: - | 275.355
Deterioro y resultado por enajenaciones del inmovilizado (5 y 6): 10.101.484 | 45.544.225
  Resultados por enajenaciones y otras: 10.101.484 | 45.544.225
Otros resultados (15.8): 36.897.850 | (2.279.707)

RESULTADO DE EXPLOTACIÓN: 15.019.983 | 12.105.271

Ingresos financieros (15.7): 681.620 | 6.148.787
Gastos financieros (15.6): (11.509.004) | (17.932.165)
Variación de valor razonable en instrumentos financieros: 242.936 | -
Diferencias de cambio (19): 1.141.998 | -

RESULTADO FINANCIERO: (9.442.449) | (11.783.378)
RESULTADO ANTES DE IMPUESTOS: 5.577.534 | 321.893
Impuestos sobre beneficios (14.1): (1.008.801) | -
RESULTADO DEL EJERCICIO: 4.568.734 | 321.893

--- Nota 4/5 (Inmovilizado intangible deportivo, movimiento del ejercicio 2024/25) ---

Amortización acumulada, columna "Altas y dotaciones" (dotación del ejercicio):
  Derechos federativos de jugadores: (23.343.953)
  Propiedad industrial: (26.749)
  Aplicaciones informáticas: (390.979)
  Total dotaciones intangible: (23.761.681)
=> Amortización de jugadores del ejercicio 2024/25: EUR 23.343.953. El resto de la línea "Amortización
del inmovilizado" del P&L (27.257.054 - 23.343.953 = 3.913.101) corresponde a inmovilizado intangible
no deportivo + material (Nota 6, no desglosado más finamente esta sesión).

Nota 15.8 (Otros resultados): "Otros ingresos excepcionales" (46.782.883) se corresponden
PRINCIPALMENTE con traspasos de derechos federativos de jugadores de Cantera (más regularizaciones de
saldos antiguos). "Otros gastos excepcionales" (-9.885.033) incluye gastos relacionados con traspasos
de jugadores no activados. Se decidió cargar este ítem como `other_income` (revenueLine), NO como
profitOnPlayerSales, porque el propio documento lo agrupa en un renglón de "Otros resultados" distinto
de "Deterioro y resultado por enajenaciones del inmovilizado" (que sí es puramente de venta de
jugadores) — la cuadratura de RESULTADO DE EXPLOTACIÓN solo cierra exacto con este ítem como
revenueLine, confirmando que es el tratamiento correcto (ver verificación abajo).

--- Balance (extracto deuda/caja) ---
Efectivo y otros activos líquidos equivalentes (Nota 10): 15.954.506 (30/06/2025)
Deudas con entidades de crédito, largo plazo: 120.369.065 (30/06/2025)
Deudas con entidades de crédito, corto plazo: 8.737.337 (30/06/2025)
=> Deuda financiera bancaria total: EUR 129.106.402

## Verificación de cuadre (a mano, EUR M)

Revenue (suma revenueLines, incluye "Otros resultados" como other_income) =
  5,986473+20,730690+21,663176+64,957035+37,291523+0,546884+7,146189+36,897850 = 195,219820 M
Expenses cash (wages_squad 90,185361 + otros 72,858905) = 163,044266 M
Non-cash (amortización) = 23,343953 (jugadores) + 3,913101 (resto) = 27,257054 M
Operating profit = 195,219820 - 163,044266 - 27,257054 = 4,918500 M
+ profitOnPlayerSales (10,101484, línea "Deterioro y resultado por enajenaciones del inmovilizado")
  = 15,019984 M ≈ RESULTADO DE EXPLOTACIÓN impreso (15.019.983) EXACTO
+ netInterest (-9,442450) = 5,577534 M = RESULTADO ANTES DE IMPUESTOS impreso EXACTO
+ tax (-1,008801) = 4,568733 M ≈ RESULTADO DEL EJERCICIO impreso (4.568.734) EXACTO
