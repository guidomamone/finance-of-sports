# FC Barcelona — Cuentas Anuales y Auditoría 2024-25, Cuenta de Pérdidas y Ganancias consolidada

Transcripción de las páginas relevantes del PDF `cuentas-anuales-y-auditoria-2024-25.pdf` (ejercicio
anual terminado el 30 de junio de 2025). Cifras en miles de euros.

**GOTCHA DE EXTRACCIÓN (importante para cualquier sesión futura que toque este PDF)**: `pdftotext`
sobre este archivo devuelve texto NATIVO (no es un escaneo, `pdffonts` confirma fuentes embebidas con
texto real), pero las páginas 12 y 13 (balance y cuenta de pérdidas y ganancias, numeración impresa
244-245) usan una fuente con el ToUnicode CMap deliberadamente reordenado/ofuscado — el texto que
devuelve `pdftotext` para esas 2 páginas es gibberish irreconocible (ej. "CDEFG+.!+.D+??F@!E@C" en vez
de "Cifra de negocios"), aunque el resto del documento (memoria, notas) extrae perfecto. La única
forma confiable de leer estas 2 páginas fue renderizarlas a imagen (`pdftoppm -png -r 300 -f 12 -l 13`)
y leerlas con el Read tool — visualmente el PDF se ve perfecto, es solo la capa de texto la que está
corrupta a propósito (probablemente una medida anti-copy/paste). Si aparece el mismo patrón en otro
club, este es el flujo: contar chars por página con `pdftotext -f N -l N`, si una página maneja
personas de "TOTAL"/"RESULTADO" en 0 resultados de grep pero el PDF tiene páginas de cifras, sospechar
de esto antes de asumir que el documento no tiene esas cifras.

--- pág. 245 (impresa) / pág. 13 del PDF: CUENTA DE PÉRDIDAS Y GANANCIAS CONSOLIDADA DEL EJERCICIO
ANUAL TERMINADO EL 30 DE JUNIO DE 2025 (Miles de Euros) ---

Columnas: Ejercicio 2024/25 | Ejercicio 2023/24 (*)

OPERACIONES CONTINUADAS:
Importe neto de la cifra de negocios (Nota 18.1): 964.203 | 748.280
  - Ingresos por competiciones: 118.598 | 86.067
  - Ingresos por abonados y socios: 31.599 | 29.862
  - Ingresos por retransmisiones y derechos televisivos: 250.499 | 242.300
  - Ingresos por comercialización y publicidad: 556.844 | 378.481
  - Ingresos por prestación de servicios: 6.663 | 11.570
Trabajos realizados por la empresa para su activo: 1.284 | 1.357
Aprovisionamientos: (79.702) | (58.680)
  - Consumos y material deportivo: (69.224) | (52.262)
  - Otros aprovisionamientos: (5.511) | (4.178)
  - Deterioro de mercaderías, materias primas y otros aprovisionamientos: (4.967) | (2.240)
Otros ingresos de explotación (Nota 18.2): 21.708 | 15.399
  - Ingresos accesorios y otros de gestión corriente: 20.010 | 14.428
  - Subvenciones de explotación incorporadas al resultado del ejercicio: 1.698 | 971
Gastos de personal (Nota 18.3): (509.955) | (473.830)
  - Sueldos y salarios del personal deportivo: (424.529) | (397.476)
  - Sueldos y salarios del personal no deportivo: (60.446) | (56.676)
  - Cargas sociales: (23.420) | (18.092)
  - Provisiones: (1.560) | (1.586)
Otros gastos de explotación: (230.134) | (320.156)
  - Servicios exteriores (Nota 18.4): (163.102) | (131.734)
  - Tributos: (6.061) | (4.394)
  - Pérdidas, deterioro y variación de provisiones por operaciones comerciales (Nota 10.4): (1.543) | (137.984)
  - Desplazamientos: (14.248) | (10.587)
  - Gastos por adquisición de jugadores: (465) | (614)
  - Otros gastos de gestión corriente: (44.715) | (34.843)
Amortización del inmovilizado: (106.317) | (113.326)
  - Amortización de los derechos de adquisición de jugadores (Nota 5): (81.287) | (81.793)
  - Otras amortizaciones (Notas 6 y 7): (25.030) | (31.533)
Imputación de subvenciones de inmovilizado no financiero y otros (Nota 12.2): - | 1.836
Exceso de provisiones: 1.250 | 8.050
Deterioro y resultado por enajenaciones del inmovilizado (Notas 5,6,7,8): 13.470 | 70.507
Dotación y aplicación de provisiones y otros (Nota 18.5): 7.920 | 15.923
Resultado por la pérdida de control de participaciones consolidadas (Nota 1.3): (12.455) | -
RESULTADO DE EXPLOTACIÓN: 71.272 | (104.640)

Ingresos financieros (Nota 10.1): 1.993 | 3.873
Gastos financieros y conceptos asimilables (Nota 14): (27.344) | (20.111)
Diferencias de cambio (Nota 14): (1.120) | 416
Deterioro y resultado por enajenaciones de instrumentos financieros: (53.426) | (84.686)
RESULTADO FINANCIERO: (79.897) | (100.508)
Participación en beneficios (pérdidas) de sociedades PE (Nota 10.3): 248 | 670
RESULTADO ANTES DE IMPUESTOS: (8.377) | (204.478)
Impuestos sobre beneficios (Nota 15.4): (8.572) | 24.129
RESULTADO DEL EJERCICIO: (16.949) | (180.349)

--- pág. 244 (impresa) / pág. 12 del PDF: BALANCE CONSOLIDADO A 30 DE JUNIO DE 2025 (extracto deuda/caja) ---

PASIVO NO CORRIENTE, Deudas a largo plazo: 100.001 (30/06/2025)
PASIVO CORRIENTE, Deudas a corto plazo: 205.154 (30/06/2025)
=> Deuda financiera total (largo+corto) EUR 305,155 M (incluye "deudas con entidades deportivas",
   no exclusivamente deuda bancaria — el balance no separa un subtotal solo-bancario limpio, a
   diferencia de Real Madrid).
ACTIVO CORRIENTE, Efectivo y otros activos líquidos equivalentes (Tesorería): 136.328 (30/06/2025)
=> EUR 136,328 M

## Verificación de cuadre (a mano, antes de cargar al sitio)

Revenue (suma revenueLines, EUR M) = 118.598+31.599+250.499+556.844+6.663+1.284+21.708+1.250+7.920
  = 996,365 M
Expenses cash (wages+otros gastos operativos) = 509.955+79.702+230.134 = 819,791 M
Non-cash (amortización) = 81.287 (jugadores) + 25.030 (resto) = 106,317 M
Operating profit = 996,365 - 819,791 - 106,317 = 70,257 M
+ profitOnPlayerSales (13,470, línea "Deterioro y resultado por enajenaciones del inmovilizado")
+ assetSales (-12,455, línea "Resultado por la pérdida de control de participaciones consolidadas")
  = 71,272 M = RESULTADO DE EXPLOTACIÓN impreso ✓ CIERRA EXACTO
+ netInterest (-79,649 = Resultado financiero -79,897 + Participación en sociedades PE +0,248)
  = -8,377 M = RESULTADO ANTES DE IMPUESTOS impreso ✓ CIERRA EXACTO
+ tax (-8,572) = -16,949 M = RESULTADO DEL EJERCICIO impreso ✓ CIERRA EXACTO (Barça cerró el
  ejercicio 2024/25 con pérdida neta de EUR 16,949 M, consistente con la cobertura de prensa pública
  sobre el año).
