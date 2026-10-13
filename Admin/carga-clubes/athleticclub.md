# athleticclub — evidencia de carga

Lo que había como comentario en `data/athleticclub-data.js`, movido tal cual por `tools/mover-comentarios-data.mjs` (la regla:
`Admin/CONVENCIONES-DATOS.md`, "data/<club>-data.js NO LLEVA COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y
meta. Las notas de cada fila van en una tabla con su número de fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
============================================================================
data/athleticclub-data.js — Athletic Club (Bilbao), Ejercicio 2024/2025 (1/7/2024 a 30/6/2025).

Un solo ejercicio (alcance de esta sesión: sumar clubes, no profundizar años). Fuente: "Cuentas
Anuales" oficial 2024-2025, presentado en la Asamblea General de socios, descargado de
cdn.athletic-club.eus/txoko-utils/ — ver Clubes/España/Athletic Club/cuentas-anuales-2024-2025.pdf
y su transcripción completa en cuentas-anuales-2024-2025-cuenta-resultados.md (misma carpeta).
Texto nativo, sin OCR.

Cifras en EUR MILLONES nativos (documento en euros completos, dividido por 1.000.000 al cargar).
Tipo de cambio EUR/USD 1,172 al 30/6/2025 (mismo que el resto de los clubes con este cierre).
`fx` en fiscalYearMeta va INVERTIDO (0,8532 = 1/1,172, EUR por 1 USD, mismo sentido que
ARS/COP/BRL/MXN/JPY en el resto del sitio) — ver comentario de cabecera de
data/realmadrid-data.js para el detalle completo.

Categorización de Ingresos (cifra de negocios, 2 líneas):
- "Ingresos deportivos" -> ABIERTA en sus 5 componentes de la Nota 21.4 en la Versión 189 (antes
  entraba entera como matchday_competition, que era incorrecto — ver el comentario largo en
  athleticclubRevenueLinesByYear).
- "Ingresos por abonados y socios" -> season_tickets (mezcla abonos+cuotas, el documento no las
  separa, mismo criterio que el resto de los clubes españoles cargados esta sesión).
- "Otros ingresos de explotación" + "Imputación de subvenciones" + "Otros Resultados" -> other_income.

Categorización de Gastos:
- "Sueldos y salarios plantilla deportiva" + "Cargas sociales" -> wages_squad.
- "Otros Sueldos, salarios y asimilados" (personal no deportivo, el documento SÍ lo separa) ->
  admin_general_expense.
- "Aprovisionamientos" (otros consumos y gastos externos) + "Servicios exteriores" + "Tributos" +
  "Otros gastos de gestión corriente" -> admin_general_expense.
- "Desplazamientos" -> match_organisation_expense.
- "Variación de existencias" (pequeño, -0,007 M) + "Pérdidas/deterioro provisiones comerciales"
  (crédito neto este año) -> other_expenses.
- "Amortización del inmovilizado" (11,089739 M, UNA sola línea, sin separar jugadores del resto):
  cargada ENTERA como `depreciation`, NO `player_amortisation` — decisión específica de este club,
  ver nota abajo.

NOTA IMPORTANTE (específica de Athletic Club, no un criterio general): a diferencia de los otros
clubes cargados esta sesión, Athletic tiene la política de cantera (solo jugadores formados en el
País Vasco/Athletic, prácticamente no compra pases de otros clubes), así que su línea única de
"Amortización del inmovilizado" es casi con certeza mayormente depreciación de activos fijos
(estadio San Mamés, instalaciones), no amortización de fichajes. Se cargó entera como
`depreciation` en vez de intentar forzar una separación que el documento no ofrece y que
probablemente sería ~0 de todos modos dado el modelo del club.

"Deterioro y resultado por enajenaciones del inmovilizado" (2,391898 M) -> fiscalYearMeta.profitOnPlayerSales
(mismo tratamiento que el resto de los clubes, aunque acá el mix real puede incluir más activos
materiales que pases de jugadores dado el modelo de cantera — de todos modos no hay revenueLine
mejor para esto, ver club-data-mapping SKILL.md sección 2, nunca va como línea de ingreso).

VERIFICACIÓN (ver .md para el detalle): Revenue 171,509353 M - Expenses cash 154,642157 M -
Non-cash 11,089739 M = Operating profit 5,777457 M; + profitOnPlayerSales 2,391898 M = 8,169355 M
≈ RESULTADO DE EXPLOTACIÓN impreso (8.169.354,65) EXACTO; + netInterest -0,476968 = 7,692387 M ≈
RESULTADO ANTES DE IMPUESTOS impreso (7.692.386,44); + tax -0,711651 = 6,980736 M ≈ RESULTADO DEL
EJERCICIO impreso (6.980.735,78) EXACTO.
============================================================================
```

_de data/club-leagues/es.js:_

```text
Verificado el 13/9/2026 contra "2024-25 La Liga" y "2023-24 La Liga" (Wikipedia). El
ejercicio cierra el 30/6 y coincide con la temporada, sin ambigüedad.
```

## 2025

### Ingresos

_antes de la fila 1 (`Ingresos por competición`):_

```text
VERSIÓN 189, CORRECCIÓN DE UNA CATEGORIZACIÓN QUE ESTABA MAL: hasta acá la línea
"Ingresos deportivos" (139,46 M€, el 82% de los ingresos del club) entraba entera como
`matchday_competition`, o sea "recaudación de partidos" — y NO lo es: la Nota 21.4 de las
propias cuentas la abre en 5 conceptos, y el más grande de los 5 son los derechos de
TELEVISIÓN. Con la categorización vieja el sitio mostraba "Televisión 0,0" para el Athletic,
que cobra 72,7 M€ de retransmisión, y el 82% de su negocio bajo una fila de entradas.
Se destapó al fusionar la fila "Estadio" (que pasó a mostrar 97% de los ingresos del club,
un número absurdo en pantalla), pero el error es anterior a esa fusión.
LAS 5 LÍNEAS SALEN LITERAL DE LA NOTA 21.4 y suman EXACTO el total viejo:
38,981106 + 8,847445 + 4,244512 + 72,713424 + 14,675772 = 139,462259. Ningún total se mueve.
Ver Clubes/España/Athletic Club/cuentas-anuales-2024-2025.md, línea 1740 en adelante.
```

_antes de la fila 5 (`Eventos y otros (incluye la final de la UEFA Europa League en San Mamés)`):_

```text
"Eventos y otros" queda en other_income y NO en stadium_other a propósito: la nota aclara
que incluye la final de la UEFA Europa League jugada en San Mamés (que sí es uso del
estadio), pero el rótulo dice "y otros" y el documento no abre cuánto es cada cosa.
```

### Meta

```text
No se encontró línea "Deudas con entidades de crédito" en el balance (consistente con el
modelo de Athletic Club, sin deuda bancaria significativa) -> grossDebt en 0. cash = Efectivo
y otros activos líquidos equivalentes.
```

## Gestiones

_antes de Jon Uriarte (data/gestiones/es.js):_

```text
Uriarte asumió el 30/6/2022, el mismo día del cierre del ejercicio 2021/22; la derivación por cierre lo deja de Uriarte aunque ese balance lo formuló la junta de Elizegi (revisar con `firmo` si Guido lo prefiere).
```

## Otros

### athleticclubPasesData

```text
Mercado de pases / Resultados deportivos / Títulos: NO onboardeados (alcance de esta sesión fue
solo Finanzas). Vacíos a propósito.
```

### memberCountByClub.athleticclub

```text
no investigado en esta sesión (fuera de alcance: solo Finanzas)
```
