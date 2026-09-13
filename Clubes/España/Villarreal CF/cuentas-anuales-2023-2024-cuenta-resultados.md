# Villarreal C.F., S.A.D. — Estados Financieros 2023-2024, Cuenta de Pérdidas y Ganancias

PDF escaneado (imagen, sin capa de texto extraíble) — leído renderizando páginas a imagen
(`pdftoppm -r 150`/`-r 300` para confirmar signos negativos) con el Read tool. Ejercicio 2023/2024
(1/7/2023 a 30/6/2024) — el ÚNICO ejercicio real disponible para este club en el archivo descargado.
Cifras en EUROS completos (no miles). Auditor: Betea España Auditores, S.L.P.

**GOTCHA de lectura**: el formato "(Debe) Haber" de este documento imprime un "-" SUELTO antes del
número para marcar negativo (columna separada, no pegado al número), fácil de perder en una lectura
rápida a 150 DPI — se confirmó cada signo re-renderizando a 300 DPI y recortando la región relevante
antes de dar por buena la lectura. Con la primera pasada se había leído mal el signo de "A.1)
OPERACIONES CONTINUADAS" (positivo cuando en realidad es NEGATIVO), lo que habría invertido el
resultado del ejercicio completo — corregido antes de cargar cualquier número al sitio.

--- CUENTA DE PÉRDIDAS Y GANANCIAS A 30/06/2024 (columnas: 2023/2024 | 2022/2023) ---

A) OPERACIONES CONTINUADAS
1. Importe neto de la cifra de negocios (13.1): 119.721.562,42 | 111.596.759,67
   a) Ventas: 119.721.562,42 | 111.596.759,67
   b) Prestaciones de servicios: - | -
   (el documento NO desglosa la cifra de negocios por concepto — a diferencia de todos los demás
   clubes cargados esta sesión, Villarreal solo reporta "Ventas" como una única línea sin abrir en
   socios/retransmisión/comercialización/competiciones)
2. Variación de existencias de P.T. y en curso: - | -
3. Trabajos realizados por la empresa para su activo: - | -
4. Aprovisionamientos: (5.542.115,03) | (5.122.607,46)
   a) Consumo de mercaderías: (3.451.601,18) | (2.649.290,13)
   b) Consumo de M.P. y otras materias consumibles: (2.090.513,85) | (2.473.317,33)
5. Otros ingresos de explotación: 8.564.333,59 | 12.964.309,47
   a) Ingresos accesorios y otros de gestión corriente (13.4.9): 8.065.653,70 | 12.427.990,62
   b) Subvenciones de explotación incorporadas al rdo. ejercicio (18): 498.679,89 | 536.318,85
6. Gastos de personal (13.2): (108.089.070,97) | (114.054.833,07)
   a) Sueldos, salarios y asimilados: (104.299.544,50) | (110.081.584,62)
   b) Cargas sociales: (3.789.526,47) | (3.973.248,45)
   (el documento NO separa personal deportivo de no deportivo, a diferencia de Atlético/Athletic/
   Valencia/Sevilla — se cargó el total a wages_squad)
7. Otros gastos de explotación: (28.254.804,77) | (32.320.940,62)
   a) Servicios exteriores (13.4.8): (21.563.437,51) | (21.123.247,53)
   b) Tributos (12.2): (242.449,94) | (429.048,56)
   c) Pérdidas, deterioro y variación de provisiones por operac. comerciales (13.3): (1.407,44) | (49.710,39)
   d) Otros gastos de gestión corriente: plug (28.254.804,77 - suma de a+b+c) = (6.447.509,88) —
      el valor impreso en el escaneo se leía con posible error de dígito (~6.450.324,76), se usó el
      residuo exacto contra el subtotal impreso para no arrastrar el error.
8. Amortización del inmovilizado (5-7): (27.897.704,51) | (35.184.205,64)
   (el documento NO separa amortización de jugadores del resto — a diferencia de Sevilla/Valencia. Se
   cargó ENTERA como player_amortisation, no depreciation: Villarreal es un club conocido por
   comprar/vender jugadores activamente, a diferencia de Athletic Club — juicio documentado, ver
   nota en el .js)
9. Imputación de subvenciones de inmovilizado no financiero y otras: - | -
10. Exceso de provisiones: - | -
11. Deterioro y resultado por enajenaciones del inmovilizado: 26.425.833,79 | 68.349.993,13
    a) Deterioros y pérdidas: 1.675.925,90 | (1.675.925,90)
    b) Resultados por enajenaciones y otras: 24.749.907,89 | 70.025.919,03
12. Otros resultados: - | -

A.1) RESULTADO OPERACIONES CONTINUADAS: (15.071.965,48) | 6.228.475,48

Ingresos financieros: 1.736.213,82 | 64.821,81
Gastos financieros: (2.649.999,47) | (1.933.998,74)
Diferencias de cambio (11): 1.718,40 | (16.544,34)
Deterioro y resultado por enajenaciones de instrumentos financieros: (33.031,92) | (25.296,64)

A.2) RESULTADO FINANCIERO: (945.099,17) | (1.911.017,91)
A.3) RESULTADO ANTES DE IMPUESTO: (16.017.064,65) | 4.317.457,57
17. Impuestos sobre beneficios: 1.895.827,37 | (711.415,37)
A.4/A.5) RESULTADO DEL EJERCICIO: (14.121.237,28) | 3.606.042,20

--- Balance (extracto caja, pág. 1) ---
Efectivo y otros activos líquidos equivalentes (Tesorería): 47.616.788,73 (30/06/2024)
Deudas a corto plazo (total, Pasivo Corriente): 116.355.224,13 (30/06/2024) — NO se pudo confirmar
  con certeza el subtotal específico "solo entidades de crédito" dentro de este total en la calidad
  de escaneo disponible; se usó el total de "Deudas a corto plazo" como aproximación (probablemente
  sobreestima la deuda puramente bancaria, incluye otras deudas financieras de corto plazo). No se
  identificó con confianza la deuda a largo plazo con entidades de crédito por separado — pendiente
  de una relectura más cuidadosa si se profundiza este club en el futuro.

## Verificación de cuadre (a mano, EUR M)

Revenue (suma revenueLines) = 119,721562 (cifra de negocios, lump) + 8,564334 (otros ingresos) = 128,285896 M
Expenses cash (wages_squad 108,089071 + otros 33,796920) = 141,885991 M
Non-cash (amortización, toda a player_amortisation) = 27,897705 M
Operating profit = 128,285896 - 141,885991 - 27,897705 = -41,4978 M
+ profitOnPlayerSales (26,425834, línea "Deterioro y resultado por enajenaciones del inmovilizado")
  = -15,071966 M ≈ A.1) RESULTADO OPERACIONES CONTINUADAS impreso (-15.071.965,48) EXACTO
+ netInterest (-0,945099) = -16,017065 M ≈ A.3) RESULTADO ANTES DE IMPUESTO impreso (-16.017.064,65)
  EXACTO
+ tax (+1,895827) = -14,121238 M ≈ A.4/A.5) RESULTADO DEL EJERCICIO impreso (-14.121.237,28) EXACTO
