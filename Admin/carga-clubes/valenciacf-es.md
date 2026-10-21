# valenciacf — evidencia de carga

Lo que había como comentario en `data/es/valenciacf-es-data.js`, movido tal cual por `tools/archivo/mover-comentarios-data.mjs` (la regla:
`Admin/CONVENCIONES-DATOS.md`, "data/<país>/<club>-data.js NO LLEVA COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y
meta. Las notas de cada fila van en una tabla con su número de fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
============================================================================
data/es/valenciacf-es-data.js — Valencia Club de Fútbol, S.A.D., Ejercicio 2024/2025 (1/7/2024 a 30/6/2025).

Un solo ejercicio (alcance de esta sesión: sumar clubes, no profundizar años). Fuente: "Cuentas
Anuales e Informe de Gestión" (cuentas INDIVIDUALES, auditadas por Ernst & Young), descargado de
valenciacf.com/public/Attachment/ — ver Clubes/España/Valencia CF/cuentas-anuales-2024-2025.pdf y
su transcripción en cuentas-anuales-2024-2025-cuenta-resultados.md (misma carpeta).

GOTCHA DE EXTRACCIÓN: PDF escaneado (imagen, sin capa de texto) — leído renderizando páginas a
imagen (pdftoppm -r 150) con el Read tool, calidad suficiente para transcribir sin Tesseract.

Cifras en EUR MILLONES nativos (documento en miles de €, dividido por 1.000 al cargar). Tipo de
cambio EUR/USD 1,172 al 30/6/2025. `fx` en fiscalYearMeta va INVERTIDO (0,8532 = 1/1,172, EUR por
1 USD, mismo sentido que ARS/COP/BRL/MXN/JPY en el resto del sitio) — ver comentario de cabecera
de data/es/realmadrid-es-data.js para el detalle completo.

Categorización de Ingresos (cifra de negocios, 4 líneas):
- "Ingresos por competiciones" -> competition_bonus.
- "Ingresos por abonados y socios" -> season_tickets (mezcla, el documento no separa).
- "Ingresos por retransmisión" -> broadcasting.
- "Ingresos de comercialización y publicidad" -> sponsorship_commercial.
- "Otros ingresos de explotación" + "Imputación de subvenciones" + "Otros resultados" -> other_income.

Categorización de Gastos:
- "Sueldos y salarios plantilla deportiva" + "Cargas sociales" -> wages_squad.
- "Otros sueldos, salarios y asimilados" -> admin_general_expense (el documento separa plantel de
  resto de personal).
- "Consumo de material deportivo" + "Otros consumos" + "Deterioro de material deportivo" (crédito
  neto) + "Pérdidas/deterioro provisiones comerciales" -> other_expenses.
- "Servicios exteriores" + "Tributos" + "Otros gastos de gestión corriente" -> admin_general_expense.
- "Desplazamientos" -> match_organisation_expense.
- "Amortización del inmovilizado": el documento ya separa "Amortización de derechos de adquisición
  de jugadores" (-> player_amortisation) de "Otras amortizaciones" (-> depreciation).

"Deterioro y resultado por enajenaciones del inmovilizado" (41,572 M, dominado por "Resultados por
enajenaciones y otras de jugadores" 24,763 M + una reversión de deterioro 16,809 M) ->
fiscalYearMeta.profitOnPlayerSales (no revenueLine, ver club-data-mapping SKILL.md sección 2).

VERIFICACIÓN (ver .md para el detalle): Revenue 103,266 M - Expenses cash 109,271 M - Non-cash
12,481 M = Operating profit -18,486 M; + profitOnPlayerSales 41,572 M = 23,086 M = RESULTADO DE
EXPLOTACIÓN impreso EXACTO; + netInterest -21,458 M = 1,628 M = RESULTADO ANTES DE IMPUESTOS
impreso EXACTO; + tax -1,132 M = 0,496 M = RESULTADO DEL EJERCICIO impreso EXACTO.
============================================================================
```

## 2025

### Meta

```text
grossDebt = Deudas con entidades de crédito, largo (116,269 M) + corto plazo (5,424 M). cash =
Tesorería.
```

## Gestiones

_antes de Peter Lim (data/gestiones/es.js):_

```text
Peter Lim (Meriton Holdings) es el dueño; los presidentes formales (Amadeo Salvo 2014, Layhoon Chan 2014-17 y desde 2022, Anil Murthy 2017-22, Kiat Lim) quedan en comentarios.
La fecha 24/10/2014 (traspaso de las acciones) salió de una sola nota de prensa; revisar si Guido quiere otra (la elección de la oferta fue el 17/5/2014).
```

## Fuentes

### valenciacf-es-cuentas-anuales-2024-25

_note (data/):_

```text
PDF oficial de 64 páginas, escaneo sin capa de texto (leído renderizando a imagen). Cuentas individuales, auditadas por Ernst & Young sin salvedades. Transcripción completa de la cuenta de resultados en Clubes/España/Valencia CF/cuentas-anuales-2024-2025-cuenta-resultados.md.
```

## Otros

### valenciacfPasesData

```text
Mercado de pases / Resultados deportivos / Títulos: NO onboardeados (alcance de esta sesión fue
solo Finanzas). Vacíos a propósito.
```

### memberCountByClub.valenciacf

```text
no investigado en esta sesión (fuera de alcance: solo Finanzas)
```
