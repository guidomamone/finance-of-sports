# osasuna-es — evidencia de carga

Lo que había como comentario en `data/es/osasuna-es-data.js`, movido tal cual por `tools/archivo/mover-comentarios-data.mjs` (la regla:
`Admin/CONVENCIONES-DATOS.md`, "data/<país>/<club>-data.js NO LLEVA COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y
meta. Las notas de cada fila van en una tabla con su número de fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
============================================================================
data/es/osasuna-es-data.js — Club Atlético Osasuna. Ejercicios 2021/2022
(1/7/2021 a 30/6/2022) y 2023/2024 (1/7/2023 a 30/6/2024).

Fuente: informes de auditoría + cuentas anuales oficiales,
`Clubes/España/CA Osasuna/auditoria2022.pdf` y `auditoria2024.pdf` (PDFs con
texto nativo, 2022 con calidad de OCR/extracción irregular en zonas del
documento — ver gotcha abajo). Transcripciones completas en los .md
homónimos, misma carpeta.

Cifras en EUR MILLONES nativos. fx: `EUR@2022-06-30` (agregada a
data/currency-map.js en esta sesión) y `EUR@2024-06-30` (ya existía), el
documento no declara un tipo de cambio propio.

GOTCHA DE TRANSCRIPCIÓN (Ejercicio 2021/2022 únicamente): varias cifras de
la Nota 16.1 vinieron con coma en vez de punto de miles por un error de OCR
(ej. "541,994" en vez de "541.994" para "Taquillas Liga") — se detectaron y
corrigieron verificando que la suma de la fila cerrara EXACTA contra el
TOTAL impreso de esa misma nota (63.824.948), no se tomó ningún número
suelto sin ese cruce.

CATEGORIZACIÓN: el Ejercicio 2023/2024 desglosa ingresos/gastos con
sub-letras a)/b)/c)/... directo en la cara de la Cuenta de Pérdidas y
Ganancias (mucho más fino que 2021/2022, que solo da el desglose en las
notas 16.1/16.2/16.6) — mismo criterio de mapeo que Getafe/Elche:
- "Ingresos por competiciones" -> competition_bonus. "Ingresos por
  abonados y socios" -> season_tickets (2022: fila "Socios" de la Nota 16.1,
  mismo concepto). "Ingresos por explotación de instalaciones" (2024, línea
  nueva y chica, nombra explícitamente las instalaciones del club) ->
  stadium_other. "Ingresos por retransmisiones"/"Derechos audiovisuales" ->
  broadcasting. "Ingresos por comercialización y publicidad"/"Publicidad"+
  "Tienda" -> sponsorship_commercial.
- "Ingresos por cesiones" (2022, préstamo de jugadores) -> player_sales.
  "Arrendamientos"/"Ingresos por derechos venta"/"Otros Ingresos"/
  "Subvenciones" (2022) y "Ingresos accesorios y otros de gestión
  corriente"/"Subvenciones a la explotación" (2024) -> other_income.
- "Imputación de subvenciones de inmovilizado no financiero" -> other_income
  (mismo criterio que Getafe): corresponde a la activación de la Cesión de
  Uso del Estadio El Sadar, financiada con subvención pública, y se
  amortiza y se imputa a razón de prácticamente el mismo importe cada año
  (ver Nota 5/6) — no mueve el resultado neto, es un "espejo" contable.
- "Deterioro y resultado por enajenaciones del inmovilizado" (venta neta de
  derechos federativos, puede ser positivo o negativo según el año) ->
  fiscalYearMeta.profitOnPlayerSales, NUNCA revenueLine.
- "Otros resultados" (partida excepcional, Nota 16.4) -> revenueLine
  other_income si el neto es positivo (los 2 años cargados lo son): 2022
  dominado por sentencias judiciales a favor del Club (Sres. Izco/Suárez/
  Archanco et al.) y un ingreso por la organización del amistoso
  Argentina-Estonia; 2024 dominado por cobros del "Caso Osasuna" y
  beneficios por cesiones/traspasos de jugadores (Ezzalzoul, Brasanac,
  Huesca-Martínez), neto de un gasto recurrente por la crisis COVID-19
  facturado por LaLiga (última vez en 2024/25, según el propio documento).
- "Gastos de personal": 2024 separa en la cara del P&L "Gastos Personal
  Deportivo Inscribible"/"No Inscribible" -> wages_squad y "Gastos Personal
  NO DEPORTIVO" -> admin_general_expense, sin bolsón. 2022 solo da
  "Sueldos y salarios"/"Cargas sociales" en la cara, pero la Nota 16.6 SÍ
  separa sueldos por plantilla deportiva/no deportiva — la Seguridad
  Social y otras cargas sociales de 2022 NO están desglosadas por área en
  ninguna nota, así que van al bolsón `lump_football_operations_expense`
  (nunca forzar un prorrateo aproximado).
- "Otros gastos de explotación": Servicios exteriores + Tributos ->
  admin_general_expense; Pérdidas/deterioro operaciones comerciales +
  Otros gastos de gestión corriente (sin desglose adicional disponible en
  ninguno de los 2 documentos) -> other_expenses.
- "Amortización del inmovilizado": 2024 la separa en la cara del P&L
  (Dchos. Adq./traspaso jugadores, Otro inmovilizado intangible,
  Inmovilizado material). 2022 se reconstruyó desde la Nota 5/6 (cuadro de
  movimientos, columna "Entradas" = dotación del ejercicio): Derechos de
  traspaso -> player_amortisation; Aplicaciones informáticas + Otro
  inmovilizado intangible (la Cesión de Uso del Estadio, ver arriba) ->
  other_amortisation; Terrenos/construcciones + Instalaciones técnicas ->
  depreciation.

VERIFICACIÓN Ejercicio 2021/2022 (replicando la Cuenta de Pérdidas y
Ganancias línea por línea, ver el .md): Revenue 70,058872 M - Expenses
(cash 59,131394 M + non-cash 9,972092 M = 69,103486 M) + profitOnPlayerSales
(-2,422339 M) = -1,466953 M ≈ A.1) RESULTADO DE EXPLOTACIÓN impreso
(-1.466.954,61, diff ~1 EUR de redondeo); + netInterest -1,584758 M =
-3,051711 M ≈ A.3 impreso (-3.051.712,44) OK; + tax +1,998652 M =
-1,053059 M ≈ A.5/PAT impreso (-1.053.060,55) OK.

VERIFICACIÓN Ejercicio 2023/2024: Revenue 76,443297 M - Expenses (cash
70,471505 M + non-cash 7,550543 M = 78,022048 M) + profitOnPlayerSales
5,101991 M = 3,523240 M ≈ A.1 impreso (3.523.240) EXACTO; + netInterest
-1,676497 M = 1,846743 M ≈ A.3 impreso (1.846.742) OK; + tax 0,958945 M =
2,805688 M ≈ A.5/PAT impreso (2.805.688) EXACTO.
============================================================================
```

_de data/club-leagues/es.js:_

```text
Verificado el 22/9/2026 contra "2021-22 CA Osasuna season"/"2023-24 CA Osasuna season" y el
propio documento de Osasuna (Nota 6, "instalaciones de Tajonar... 1ª división" al 30/6/2022):
Osasuna jugó Primera División los 2 ejercicios cargados, sin descenso.
```

## 2024

### Meta

```text
netInterest = A.2) Resultado financiero impreso (-1.676.497), tomado directo (la fila de
"Diferencias de cambio" quedó con un valor ambiguo en la transcripción, ver el .md).
profitOnPlayerSales = "11. Deterioro y Rtdo. por enaj. inmov." impreso (2024 es una
GANANCIA neta, a diferencia de 2022).
```

## 2022

### Meta

```text
netInterest = A.2) RESULTADO FINANCIERO impreso (14+15+17+18: ingresos financieros 1,20 +
gastos financieros -1.584.759,03 + diferencias de cambio 0 = -1.584.757,83).
profitOnPlayerSales = "11. Deterioro y resultado por enajenaciones del inmovilizado" impreso
(2022 es una PÉRDIDA neta: bajas de Brandon Thomas, Enric Gallego, Iñigo Pérez y Jonas
Ramalho, jugadores que finalizaron su vinculación con el Club).
grossDebt = Deudas a largo plazo + Deudas a corto plazo (Nota 13, deuda financiera, ya
separada de "Acreedores comerciales y otras cuentas a pagar" en el propio balance). cash =
Efectivo y otros activos líquidos equivalentes.
```

## Gestiones

_antes de Luis Sabalza Iriarte (data/gestiones/es.js):_

```text
Sabalza: presidente desde diciembre de 2014 (dia 01), reelegido sin urnas; el mandato actual corre del 22/8/2025 al 21/8/2029.
```

## Fuentes

### osasuna-es-auditoria-2021-22

_note (data/):_

```text
PDF con texto nativo (Loyola Auditores, S.L.P.), transcripción completa en Clubes/España/CA Osasuna/auditoria2022.md. Varias cifras de la Nota 16.1 vinieron con coma en vez de punto de miles por un error de OCR/extracción — corregidas verificando que cerraran contra el TOTAL impreso de esa misma nota antes de cargar nada.
```

### osasuna-es-auditoria-2023-24

_note (data/):_

```text
PDF con texto nativo, transcripción completa en Clubes/España/CA Osasuna/auditoria2024.md. Este ejercicio desglosa ingresos y gastos con sub-letras directo en la cara de la Cuenta de Pérdidas y Ganancias, mucho más fino que el ejercicio 2021/2022.
```


## Resuelto desde Admin/dudas-por-club.md (2026-10-23)

*(Resuelto, sesión 2026-09-22, al cargar los ejercicios 2021/2022 y 2023/2024: los dos
PDFs SÍ tienen capa de texto real (la premisa "escaneado sin capa de texto" del sourcing del
2026-09-16 estaba vencida) y los dos son el informe de auditoría + cuentas anuales completo (balance,
cuenta de pérdidas y ganancias, memoria), no un fragmento — se confirmó leyendo el texto interno de
cada uno, con período jul-jun literal en la carátula: "1 de julio de 2021 al 30 de junio de 2022" y
"1 de julio de 2023 al 30 de junio de 2024". Ver `data/es/osasuna-es-data.js`.)*
