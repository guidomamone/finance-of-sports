# Sevilla Fútbol Club, S.A.D. — Cuentas Anuales 2024-2025, Cuenta de Pérdidas y Ganancias

`pdftotext` no extrae texto de este PDF (páginas 6+ dan 1 char cada una, es un escaneo/imagen sin
capa de texto — confirma lo ya anotado en fuentes/España/Sevilla FC.md). Se leyó renderizando páginas
a imagen (`pdftoppm -r 150`) y usando el Read tool. Cifras en miles de euros. Página impresa 3 =
Cuenta de Pérdidas y Ganancias, páginas impresas 1-2 = Balance de Situación (ver índice interno del
documento).

--- pág. impresa 3: Cuenta de pérdidas y ganancias del ejercicio anual terminado el 30 de junio de 2025 ---

Columnas: 30/06/2025 | 30/06/2024

OPERACIONES CONTINUADAS
Importe neto de la cifra de negocios (Nota 15.3): 115.185 | 174.970
  - Ingresos por competiciones: 7.193 | 61.775
  - Ingresos por abonados y socios: 14.365 | 15.502
  - Ingresos por retransmisión: 64.758 | 73.539
  - Ingresos por comercialización y publicidad: 28.869 | 24.154
Aprovisionamientos: (10.424) | (11.095)
Otros ingresos de explotación (Nota 15.4): 2.657 | 1.898
Gastos de personal: (113.957) | (159.064)
  - Gastos de personal no deportivo (Nota 15.1): (20.889) | (21.357)
  - Gastos plantilla deportiva: (93.068) | (137.707)
    - Plantilla deportiva inscribible en la LFP (Nota 15.1): (84.988) | (126.404)
    - Plantilla deportiva no inscribible en la LFP (Nota 15.1): (8.080) | (11.303)
Otros gastos de explotación: (25.697) | (35.384)
  - Servicios exteriores: (20.850) | (21.475)
  - Tributos: (418) | (427)
  - Pérdidas, deterioro y variación provisiones por operaciones comerciales (Nota 9): 2.548 | (100)
  - Desplazamientos: (2.070) | (5.239)
  - Otros gastos de gestión corriente: (1.368) | (1.406)
  - Gastos de adquisición de jugadores inscribibles en la LFP (Nota 15.1): (3.343) | (6.030)
  - Gastos de adquisición de jugadores no inscribibles en la LFP (Nota 15.1): (196) | (707)
Amortización del inmovilizado: (27.455) | (48.753)
  - Del inmovilizado material (Nota 7): (2.862) | (2.978)
  - Del inmovilizado inmaterial (excluido jugadores) (Nota 6): (161) | (117)
  - De derechos de adquisición de jugadores inscribibles en la LFP (Nota 5): (24.122) | (45.610)
  - De derechos de adquisición de jugadores no inscribibles en la LFP (Nota 5): (310) | (48)
Imputación de subvenciones de inmovilizado no financiero y otras (Nota 11): 106 | 57
Exceso de provisiones (Nota 12): 349 | -
Resultados procedentes del traspaso de jugadores (Nota 5): 5.690 | 5.342
Deterioro y resultado por enajenaciones del inmovilizado: 15 | 3
Otros Resultados (Nota 15.2): 4.277 | (3.580)

RESULTADO DE EXPLOTACIÓN: (49.254) | (75.606)

Ingresos financieros: 4.924 | 1.149
Gastos financieros: (10.990) | (7.178)
Variación de valor razonable en instrumentos financieros: (4.047) | 338
Diferencias de cambio: 5.294 | (420)
Deterioro y resultado por enajenaciones de instrumentos financieros: 12 | -

RESULTADO FINANCIERO: (4.807) | (6.111)
RESULTADO ANTES DE IMPUESTOS: (54.061) | (81.717)
Impuesto sobre beneficios (Nota 14): - | -
RESULTADO DEL PERIODO: (54.061) | (81.717)

--- pág. impresa 1-2: Balance de situación (extracto deuda/caja) ---

Efectivo y otros activos líquidos equivalentes: 39.247 (30/06/2025)
Deudas a largo plazo (total, Nota 13): 233.433 (incluye deudas con entidades de crédito 1.502,
  entidades deportivas por traspasos-cesiones 7.868, entidades deportivas por préstamo participativo
  116.896 (!), derivados 3.709, otros pasivos financieros 103.458)
Deudas a corto plazo (total): 34.920 (entidades de crédito 8.051, entidades deportivas
  traspasos-cesiones 22.077, entidades deportivas préstamo participativo 3.108, otros pasivos
  financieros 1.684)
=> Deuda financiera total (largo+corto): EUR 268,353 M. Patrimonio neto NEGATIVO (-122,813 M) —
  Sevilla está en situación patrimonial muy comprometida al cierre de este ejercicio.

## Verificación de cuadre (a mano, EUR M)

Revenue (suma revenueLines) = 7,193+14,365+64,758+28,869+2,657+0,106+0,349+4,277 = 122,574 M
  (los primeros 4 ya suman 115,185 = Importe neto cifra de negocios impreso, exacto)
Expenses cash (wages_squad 93,068 + otros 57,010) = 150,078 M
Non-cash (amortización) = 24,432 (jugadores) + 3,023 (resto) = 27,455 M
Operating profit = 122,574 - 150,078 - 27,455 = -54,959 M
+ profitOnPlayerSales (5,705 = 5,690 traspaso jugadores + 0,015 enajenaciones inmovilizado)
  = -49,254 M = RESULTADO DE EXPLOTACIÓN impreso EXACTO
+ netInterest (-4,807 = ingresos fin. 4,924 - gastos fin. 10,990 - var. valor razonable 4,047 +
  dif. cambio 5,294 + deterioro instr. fin. 0,012) = -54,061 M = RESULTADO ANTES DE IMPUESTOS
  impreso EXACTO
+ tax (0) = -54,061 M = RESULTADO DEL PERIODO impreso EXACTO
