# celtavigo — evidencia de carga

Lo que había como comentario en `data/celtavigo-data.js`, movido tal cual por `tools/mover-comentarios-data.mjs` (la regla:
`Admin/CONVENCIONES-DATOS.md`, "data/<club>-data.js NO LLEVA COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y
meta. Las notas de cada fila van en una tabla con su número de fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
============================================================================
data/celtavigo-data.js — Real Club Celta de Vigo, S.A.D., Ejercicio 2024/2025 (1/7/2024 a 30/6/2025).

Un solo ejercicio (alcance de esta sesión: sumar clubes, no profundizar años; el club tenía 4
ejercicios reales con huecos, ver fuentes/España/Celta de Vigo.md — se eligió el más reciente).
Fuente: "Cuentas Anuales Individuales" (se prefirieron sobre las consolidadas, también
disponibles, para ser consistente con el resto de los clubes de esta sesión) — ver
Clubes/España/Celta de Vigo/cuentas-anuales-individual-2024-2025.pdf y su transcripción en
cuentas-anuales-individual-2024-2025-cuenta-resultados.md (misma carpeta). Texto nativo, sin OCR.

Cifras en EUR MILLONES nativos (documento en euros completos, dividido por 1.000.000 al cargar).
Tipo de cambio EUR/USD 1,172 al 30/6/2025. `fx` en fiscalYearMeta va INVERTIDO (0,8532 =
1/1,172, EUR por 1 USD, mismo sentido que ARS/COP/BRL/MXN/JPY en el resto del sitio) — ver
comentario de cabecera de data/realmadrid-data.js para el detalle completo.

Categorización de Ingresos (cifra de negocios, 5 líneas):
- "Ingresos por competiciones" -> competition_bonus.
- "Ingresos por abonados y socios" -> season_tickets (mezcla, el documento no separa).
- "Ingresos por retransmisión" -> broadcasting.
- "Ingresos por publicidad" + "Ingresos por comercialización y otros" -> sponsorship_commercial.
- "Otros ingresos de explotación" + "Imputación de subvenciones" -> other_income.

Categorización de Gastos:
- "Sueldos y salarios plantilla deportiva" + "Cargas sociales" -> wages_squad.
- "Sueldos y salarios personal no deportivo" -> admin_general_expense (el documento separa
  plantel de resto del personal).
- "Deterioro de mercaderías" + "Pérdidas/deterioro provisiones comerciales" + "Gastos de
  adquisición de jugadores" (comisiones) + "Otros resultados" (NEGATIVO este año, -0,276404 M) ->
  other_expenses.
- "Otros consumos y gastos externos" + "Servicios exteriores" + "Tributos" + "Otros gastos de
  gestión corriente" -> admin_general_expense.
- "Desplazamientos" -> match_organisation_expense.
- "Amortización del inmovilizado": el documento YA separa "Amortización derechos adquisición de
  jugadores" (-> player_amortisation) de "Otras amortizaciones" (-> depreciation), sin necesitar
  derivar el split de una nota aparte.

"Deterioro y resultado por enajenaciones del inmovilizado" (26,807049 M, casi enteramente
"Resultados procedentes del traspaso de jugadores") -> fiscalYearMeta.profitOnPlayerSales (no
revenueLine, ver club-data-mapping SKILL.md sección 2).

VERIFICACIÓN (ver .md para el detalle): Revenue 91,310690 M - Expenses cash 99,460748 M -
Non-cash 18,927863 M = Operating profit -27,077921 M; + profitOnPlayerSales 26,807049 M =
-0,270872 M ≈ RESULTADO DE EXPLOTACIÓN impreso (-270.870,08) EXACTO; + netInterest -6,223713 M =
-6,494585 M ≈ RESULTADO ANTES DE IMPUESTOS impreso (-6.494.582,58); + tax +1,868266 M =
-4,626319 M ≈ RESULTADO DEL EJERCICIO impreso (-4.626.316,24), diferencias de pocos euros por
redondeo acumulado de muchos componentes, dentro de tolerancia. Celta cerró el ejercicio con
pérdida neta real de EUR 4,63 M.
============================================================================
```

## 2025

### Meta

```text
grossDebt = Deudas a largo plazo (58,054988 M) + Deudas a corto plazo (2,260363 M) — incluye
"deudas con entidades deportivas" y "otros pasivos financieros", no hay un subtotal
solo-bancario a largo plazo en este balance (a corto plazo, "Deudas con entidades de crédito"
es 0 este ejercicio). cash = Efectivo y otros activos líquidos equivalentes (Tesorería).
```

## Gestiones

_antes de Carlos Mouriño (data/gestiones/es.js):_

```text
Carlos Mouriño: compró el paquete de Horacio Gómez en mayo de 2006 (dia 01 por convencion). Renunció a fines de septiembre de 2023; Marián ejerció en funciones hasta su nombramiento por el consejo el 13/12/2023.
```

## Fuentes

### celtavigo-cuentas-anuales-individual-2024-25

_note (data/):_

```text
PDF oficial, texto nativo (sin OCR). Cuentas individuales (no consolidadas, aunque el club también publicó consolidadas por separado). Transcripción completa de la cuenta de resultados en Clubes/España/Celta de Vigo/cuentas-anuales-individual-2024-2025-cuenta-resultados.md.
```

## Otros

### celtavigoPasesData

```text
Mercado de pases / Resultados deportivos / Títulos: NO onboardeados (alcance de esta sesión fue
solo Finanzas). Vacíos a propósito.
```

### memberCountByClub.celtavigo

```text
no investigado en esta sesión (fuera de alcance: solo Finanzas)
```
