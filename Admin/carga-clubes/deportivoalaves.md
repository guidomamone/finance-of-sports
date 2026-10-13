# deportivoalaves — evidencia de carga

Lo que había como comentario en `data/deportivoalaves-data.js`, movido tal cual por `tools/mover-comentarios-data.mjs` (la regla:
`Admin/CONVENCIONES-DATOS.md`, "data/<club>-data.js NO LLEVA COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y
meta. Las notas de cada fila van en una tabla con su número de fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
============================================================================
data/deportivoalaves-data.js — Deportivo Alavés, S.A.D., Ejercicio 2024/2025 (1/7/2024 a 30/6/2025).

Un solo ejercicio (alcance de esta sesión: sumar clubes, no profundizar años; el club tenía 9
ejercicios reales consecutivos disponibles 2016-17 a 2024-25, ver fuentes/España/Deportivo
Alavés.md — se eligió el más reciente). Fuente: "Informe de Auditoría, Cuentas Anuales e Informe
de Gestión" (auditor Sayma Auditores/HLB) — ver
Clubes/España/Deportivo Alavés/cuentas-anuales-2024-2025.pdf y su transcripción en
cuentas-anuales-2024-2025-cuenta-resultados.md (misma carpeta).

GOTCHA DE EXTRACCIÓN: PDF escaneado sin capa de texto (0 chars con pdftotext) — leído renderizando
páginas a imagen (pdftoppm -r 150), calidad muy nítida, sin necesidad de Tesseract.

Cifras en EUR MILLONES nativos (documento en euros completos, dividido por 1.000.000 al cargar).
Tipo de cambio EUR/USD 1,172 al 30/6/2025. `fx` en fiscalYearMeta va INVERTIDO (0,8532 =
1/1,172, EUR por 1 USD, mismo sentido que ARS/COP/BRL/MXN/JPY en el resto del sitio) — ver
comentario de cabecera de data/realmadrid-data.js para el detalle completo.

Categorización de Ingresos (cifra de negocios, 5 líneas):
- "Ingresos por competiciones" -> competition_bonus.
- "Ingresos por abonados y socios" -> season_tickets (mezcla, el documento no separa).
- "Ingresos por retransmisión" -> broadcasting.
- "Ingresos por comercialización" + "Ingresos por publicidad" -> sponsorship_commercial.
- "Otros ingresos de explotación" + "Imputación de subvenciones" -> other_income.

Categorización de Gastos:
- "Sueldos y salarios de la plantilla deportiva" + "Cargas sociales" -> wages_squad.
- "Otros sueldos, salarios y asimilados" -> admin_general_expense (el documento separa plantel de
  resto del personal).
- "Consumos de material deportivo" + "Variación de existencias" (crédito neto) + "Pérdidas/
  deterioro provisiones comerciales" + "Gastos de adquisición de jugadores" -> other_expenses.
- "Otros consumos" + "Servicios exteriores" + "Tributos" + "Otros gastos de gestión corriente" ->
  admin_general_expense.
- "Desplazamientos" -> match_organisation_expense.
- "Amortización del inmovilizado": el documento YA separa "Amortización de derechos de adquisición
  de jugadores" (-> player_amortisation) de "Otras amortizaciones" (-> depreciation).

"Deterioro y resultado por enajenaciones y otras" (15,096226 M) -> fiscalYearMeta.profitOnPlayerSales
(no revenueLine, ver club-data-mapping SKILL.md sección 2).

Alavés no tiene deuda bancaria en este balance (líneas "Deudas con entidades de crédito" en blanco
tanto a largo como a corto plazo) — grossDebt se cargó en 0.

VERIFICACIÓN (ver .md para el detalle): Revenue 64,089611 M - Expenses cash 70,108822 M -
Non-cash 6,061871 M = Operating profit -12,081082 M; + profitOnPlayerSales 15,096226 M =
3,015144 M = A.1) RESULTADO DE EXPLOTACIÓN impreso EXACTO; + netInterest -3,902985 M =
-0,887841 M = A.3) RESULTADO ANTES DE IMPUESTOS impreso EXACTO; + tax +1,100000 M = 0,212159 M =
A.5) RESULTADO DEL EJERCICIO impreso EXACTO.
============================================================================
```

## 2025

### Meta

```text
No hay línea "Deudas con entidades de crédito" con valor en el balance (ni a largo ni a corto
plazo) -> grossDebt en 0. cash = Tesorería.
```

## Otros

### deportivoalavesPasesData

```text
Mercado de pases / Resultados deportivos / Títulos: NO onboardeados (alcance de esta sesión fue
solo Finanzas). Vacíos a propósito.
```

### memberCountByClub.deportivoalaves

```text
no investigado en esta sesión (fuera de alcance: solo Finanzas)
```
