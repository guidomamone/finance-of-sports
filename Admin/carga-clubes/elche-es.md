# elche-es — evidencia de carga

Lo que había como comentario en `data/elche-es-data.js`, movido tal cual por `tools/mover-comentarios-data.mjs` (la regla:
`Admin/CONVENCIONES-DATOS.md`, "data/<club>-data.js NO LLEVA COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y
meta. Las notas de cada fila van en una tabla con su número de fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
============================================================================
data/elche-es-data.js — Elche Club de Fútbol, S.A.D. Ejercicios 2023/2024
(1/7/2023 a 30/6/2024) y 2024/2025 (1/7/2024 a 30/6/2025).

Fuente: "Informe de Auditoría, Cuentas Anuales e Informe de Gestión" (Auren
Auditores SP, S.L.P.), `Clubes/España/Elche CF/informe-auditoria-cuentas-anuales-2023-2024.pdf`
y `cuentas-anuales-presupuesto-gestion-2024-2025.pdf` (PDF con texto nativo, no escaneo).
Transcripciones completas en los .md homónimos, misma carpeta.

Cifras en EUR MILLONES nativos. fx: `EUR@2024-06-30`/`EUR@2025-06-30` (ya en
data/currency-map.js), el documento no declara un tipo de cambio propio.

CONTEXTO: Elche jugó Primera División (La Liga) en 2022/23 (cifra de
negocios 57,86 M) y descendió a Segunda al cierre de esa temporada. El
Ejercicio 2023/2024 (cargado acá, cifra de negocios 14,0 M) es su primera
temporada en Segunda. LaLiga paga una "ayuda al descenso" (11,8 M EUR,
contrato formalizado el 3/11/2023) que domina el resultado positivo de ese
año — ver "Otros resultados" abajo, es dinero real y documentado, no un
error de carga. El Ejercicio 2024/2025 (cifra de negocios 14,4 M) es su
segunda temporada en Segunda, con pérdida.

GOTCHA DE TRANSCRIPCIÓN: la tabla "Balance de situación" del PDF 2024/2025
perdió sus columnas de números en la extracción (quedaron solo las
etiquetas de fila, ver el .md) — a diferencia de la Cuenta de pérdidas y
ganancias del mismo documento, que sí extrajo bien. `cash`/`grossDebt` de
2025 se reconstruyeron cruzando la Nota 8.2.1 (Clasificación de los pasivos
financieros, céntimo exacto) y la Nota 18.3 (Ratio de deuda neta, en miles
de euros, para el efectivo) — ver el detalle en cada año abajo. El
Ejercicio 2023/2024 SÍ tiene el balance completo en su propio PDF.

CATEGORIZACIÓN (misma taxonomía que Getafe/Girona/Espanyol, mismo país y
tipo de documento):
- "Ingresos de taquillas Liga/Copa/amistosos" -> competition_bonus.
- "Ingresos de abonados" -> season_tickets. "Derechos de retransmisión" ->
  broadcasting. "Ingresos por publicidad y comercialización" + "Ingresos
  por venta de tienda" -> sponsorship_commercial.
- "Ingreso por traspaso/cesión de jugadores" (dentro de "Otros ingresos de
  explotación") -> player_sales. "Ingreso por arrendamiento" (no nombra el
  estadio) -> other_income, criterio conservador de stadium_other.
  "Ingresos de campus y certámenes" (2025) -> youth_football.
- "Deterioro y resultado por enajenaciones del inmovilizado" (venta neta de
  derechos federativos) -> fiscalYearMeta.profitOnPlayerSales, NUNCA
  revenueLine (mismo criterio que Getafe).
- "Otros resultados" (partida excepcional, Nota 11.7): positivo los 2 años
  -> revenueLine other_income. 2024 dominado por "Ayuda al descenso"
  (11,8 M); 2025 son partidas chicas (sanciones, cancelación de créditos
  concursales, quita de acreedores).
- "Gastos de personal": sueldos plantilla deportiva (inscribible + no
  inscribible LNFP) -> wages_squad; sueldos personal no deportivo ->
  admin_general_expense; Seguridad Social + Indemnizaciones + Otros gastos
  sociales, que el documento NO desglosa por área -> bolsón
  `lump_football_operations_expense` (nunca forzar un prorrateo aproximado,
  club-data-mapping sección 1).
- "Otros gastos de gestión corriente" (Nota 11.6): Derechos de arbitraje +
  Desplazamientos -> match_organisation_expense; Gastos adquisición
  jugadores (comisiones) + Otros gastos de gestión -> other_expenses;
  Cuotas a entidades deportivas + Sanciones deportivas -> admin_general_expense.
- "Servicios exteriores" + "Tributos" -> admin_general_expense.
  "Aprovisionamientos" + "Pérdidas/deterioro operaciones comerciales" ->
  other_expenses.
- "Amortización del inmovilizado": desglosada vía Nota 6 (movimientos de
  inmovilizado intangible, columna "Adiciones" de la amortización
  acumulada = dotación del ejercicio) en derechos de jugadores
  (player_amortisation) y otro intangible (other_amortisation); el resto
  hasta el total impreso es inmovilizado material (depreciation, Nota 5,
  no desglosada aparte pero se obtiene por diferencia).

VERIFICACIÓN Ejercicio 2023/2024 (ver .md, replicando la Cuenta de
pérdidas y ganancias línea por línea): Revenue 34,073927 M - Expenses cash
26,991293 M - Non-cash 3,282670 M = 3,799964 M... (nota: el orden real es
Revenue - |Expenses total| + profitOnPlayerSales) = 34,073927 - 30,273963
+ 5,126874 = 8,926838 M ≈ A.1) RESULTADO DE EXPLOTACIÓN impreso
(8.926.838) EXACTO; + netInterest 0,118948 M = 9,045786 M ≈ A.3 impreso
(9.045.786) EXACTO; + tax -0,035229 M = 9,010557 M ≈ A.5/PAT impreso
(9.010.557) EXACTO.

VERIFICACIÓN Ejercicio 2024/2025: Revenue 20,550790 M - Expenses cash
30,000399 M - Non-cash 2,606814 M + profitOnPlayerSales 3,961249 M =
-8,095174 M ≈ A.1 impreso (-8.095.171, diff ~3 EUR de redondeo) OK;
+ netInterest 0,380862 M = -7,714312 M ≈ A.3 impreso (-7.714.310) OK;
+ tax 0,581891 M = -7,132421 M ≈ A.5/PAT impreso (-7.132.418) OK.
============================================================================
```

_de data/club-leagues/es.js:_

```text
Elche descendió al cierre de 2022/23 y jugó Segunda División en los 2 ejercicios cargados
(2023/24 y 2024/25) — el propio presupuesto 2025/26 del club (cifra de negocios proyectada de
58,3 M, el triple de 2024/25) confirma el ascenso recién para la temporada SIGUIENTE, fuera del
rango cargado.
```

## 2025

### Meta

```text
netInterest = Ingresos financieros (0.471469) + Gastos financieros (-0.126900) + Diferencias
de cambio (0.036293) = 0.380862, ≈ A.2 implícito (A.3 9,045786... acá A.3 es -7,714310, A.1
es -8,095171, diferencia 0,380861).
profitOnPlayerSales = "11. Deterioro y resultado por enajenaciones del inmovilizado" impreso.
grossDebt: la tabla "Balance de situación" de ESTE documento perdió sus números en la
extracción (ver comentario de cabecera) — reconstruido EXACTO desde la Nota 8.2.1
(Clasificación de los pasivos financieros al 30/6/2025): LP arrendamiento 0.804541 + LP otros
pasivos financieros 11.104318 + CP arrendamiento 0.146888 + CP otros pasivos financieros
0.992196 = 13.047943 (excluye acreedores comerciales, que no son deuda financiera).
cash: la Nota 18.3 (Ratio de deuda neta) da "Efectivo y otros activos líquidos equivalentes"
en MILES de euros (14.550 en 2025, 23.896 en 2024 — este último coincide exacto con el
balance del ejercicio 2024 de arriba), así que 2025 queda con la precisión de miles, no de
céntimos como el resto de los campos de este archivo.
```

## 2024

### Meta

```text
netInterest = Ingresos financieros (0.515336) + Gastos financieros (-0.383046) + Diferencias
de cambio (-0.013342), EXACTO igual al "A.2) RESULTADO FINANCIERO" implícito (0.118948).
profitOnPlayerSales = "11. Deterioro y resultado por enajenaciones del inmovilizado" impreso
(venta de derechos federativos, 5.229.239 EUR de beneficio bruto - 102.365 EUR de baja de un
jugador con extinción laboral de mutuo acuerdo = 5.126.874 EUR neto, Nota 6.1).
grossDebt = deuda financiera (arrendamiento financiero + otros pasivos financieros, LP+CP),
NO el total del pasivo (excluye acreedores comerciales). cash = Efectivo y otros activos
líquidos equivalentes. Ambos del propio balance de este ejercicio (Balance de situación,
pág. 3 del PDF).
```
