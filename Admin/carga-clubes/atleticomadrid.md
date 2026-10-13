# atleticomadrid — evidencia de carga

Lo que había como comentario en `data/atleticomadrid-data.js`, movido tal cual por `tools/mover-comentarios-data.mjs` (la regla:
`Admin/CONVENCIONES-DATOS.md`, "data/<club>-data.js NO LLEVA COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y
meta. Las notas de cada fila van en una tabla con su número de fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
============================================================================
data/atleticomadrid-data.js — Club Atlético de Madrid, S.A.D., Ejercicio 2024/2025 (1/7/2024 a
30/6/2025).

Un solo ejercicio (alcance de esta sesión: sumar clubes, no profundizar años). Fuente: "Cuentas
Anuales 2024-2025" oficial, descargado de atleticodemadrid.com/pdf/cuentas_anuales_2025.pdf — ver
Clubes/España/Atlético de Madrid/cuentas-anuales-2024-2025.pdf y su transcripción completa de la
cuenta de pérdidas y ganancias en cuentas-anuales-2024-2025-cuenta-resultados.md (misma carpeta).
Texto nativo, sin necesidad de OCR.

Cifras en EUR MILLONES nativos (el documento reporta en EUROS completos, ej. "416.050.923,92" —
se dividió por 1.000.000 al cargar, a diferencia de Real Madrid/Barcelona que ya reportan en miles
de euros). Tipo de cambio EUR/USD 1,172 al 30/6/2025 (mismo que Real Madrid/Barcelona, misma fecha
de cierre). `fx` en fiscalYearMeta va INVERTIDO (0,8532 = 1/1,172, EUR por 1 USD, mismo sentido
que ARS/COP/BRL/MXN/JPY en el resto del sitio) — ver comentario de cabecera de
data/realmadrid-data.js para el detalle completo.

Categorización de Ingresos (cifra de negocios, 6 líneas propias):
- "Ingresos deportivos" -> matchday_competition (recaudación de partidos + participación en
  competiciones; el documento no desglosa más, pero "abonados y socios" ya está separado aparte,
  así que este ítem es sobre todo venta de entradas puntuales + premios).
- "Ingresos por abonados y socios" -> season_tickets (mezcla abonos + cuotas de socios, el
  documento no las separa, mismo tipo de aproximación que Real Madrid/Barcelona).
- "Ingresos por retransmisiones" -> broadcasting.
- "Ingresos de comercialización y publicidad" -> sponsorship_commercial.
- "Otros ingresos por ventas" (0 este año) + "Ingresos por prestación de servicios" + "Otros
  ingresos de explotación" + "Imputación de subvenciones" + "Otros resultados" -> other_income.

Categorización de Gastos:
- "Sueldos y Salarios plantilla deportiva" + "Cargas Sociales" -> wages_squad (Cargas Sociales no
  se puede separar entre plantilla deportiva/no deportiva, mismo criterio ya usado en
  Racing/Boca: cargas sociales acompaña siempre a wages_squad).
- "Otros sueldos, salarios y asimilados" -> admin_general_expense (a diferencia de Real
  Madrid/Barcelona, ESTE documento SÍ separa limpio el personal deportivo del resto, así que se
  aprovechó el desglose real en vez de lumpear todo en wages_squad).
- "Consumo de material deportivo" + "Deterioro de mercaderías" + "Gastos de adquisición de
  jugadores" (comisiones, no amortización) + "Pérdidas/deterioro provisiones comerciales" ->
  other_expenses.
- "Otros consumos y gastos externos" + "Trabajos realizados por otras empresas" + "Servicios
  exteriores" + "Tributos" + "Otros gastos de gestión corriente" -> admin_general_expense.
- "Desplazamientos" -> match_organisation_expense.
- "Amortización del inmovilizado": el propio documento YA separa "Amortización derechos
  adquisición jugadores" (-> player_amortisation) de "Otras amortizaciones" (-> depreciation), sin
  necesitar derivar el split de una nota aparte (a diferencia de Real Madrid).

"Deterioro y resultado por enajenaciones de inmovilizado" (44,176920 M, dominado por "Resultados
por traspasos y bajas de jugadores" +48,088010 M) -> fiscalYearMeta.profitOnPlayerSales (no
revenueLine, ver club-data-mapping SKILL.md sección 2).

VERIFICACIÓN (ver .md para el detalle): Revenue 459,686364 M - Expenses cash 393,541424 M -
Non-cash 92,443417 M = Operating profit -26,298477 M; + profitOnPlayerSales 44,176920 M =
17,878443 M ≈ RESULTADO DE EXPLOTACIÓN impreso (17,878442, diferencia de EUR 1 por redondeo de
muchos componentes a 6 decimales); + netInterest -23,797408 = -5,918965 M ≈ RESULTADO ANTES DE
IMPUESTOS impreso (-5,918966); + tax -0,072276 = -5,991241 M = RESULTADO DEL EJERCICIO impreso
EXACTO. Atlético cerró el ejercicio con pérdida neta real de EUR 5,99 M.
============================================================================
```

## 2025

### Meta

```text
grossDebt = Deudas con entidades de crédito, largo (28,092989 M) + corto plazo (32,956291 M).
cash = Efectivo y otros activos líquidos equivalentes.
```

## Otros

### atleticomadridPasesData

```text
Mercado de pases / Resultados deportivos / Títulos: NO onboardeados (alcance de esta sesión fue
solo Finanzas). Vacíos a propósito, mismo criterio que Vélez/Real Madrid/Barcelona.
```

### memberCountByClub.atleticomadrid

```text
no investigado en esta sesión (fuera de alcance: solo Finanzas)
```
