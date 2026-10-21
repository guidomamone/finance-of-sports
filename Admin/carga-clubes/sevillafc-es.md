# sevillafc — evidencia de carga

Lo que había como comentario en `data/es/sevillafc-es-data.js`, movido tal cual por `tools/archivo/mover-comentarios-data.mjs` (la regla:
`Admin/CONVENCIONES-DATOS.md`, "data/<país>/<club>-data.js NO LLEVA COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y
meta. Las notas de cada fila van en una tabla con su número de fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
============================================================================
data/es/sevillafc-es-data.js — Sevilla Fútbol Club, S.A.D., Ejercicio 2024/2025 (1/7/2024 a 30/6/2025).

Un solo ejercicio (alcance de esta sesión: sumar clubes, no profundizar años). Fuente: "Cuentas
Anuales" oficiales, descargadas de la página de la Junta General de Accionistas
(sevillafc.es/el-club/la-entidad/accionista/jga) — ver
Clubes/España/Sevilla FC/cuentas-anuales-2024-2025.pdf y su transcripción en
cuentas-anuales-2024-2025-cuenta-resultados.md (misma carpeta).

GOTCHA DE EXTRACCIÓN: este PDF es un escaneo sin capa de texto (pdftotext devuelve ~1 char por
página desde la página 6 en adelante) — se leyó renderizando páginas a imagen (pdftoppm -r 150) y
usando el Read tool, no hizo falta Tesseract porque la imagen es nítida y se pudo transcribir
directo. Página impresa 3 del documento = Cuenta de Pérdidas y Ganancias.

Cifras en EUR MILLONES nativos (documento en miles de €, dividido por 1.000 al cargar — el número
impreso leído como decimal ya da millones, mismo criterio que Real Madrid/Barcelona). Tipo de
cambio EUR/USD 1,172 al 30/6/2025. `fx` en fiscalYearMeta va INVERTIDO (0,8532 = 1/1,172, EUR por
1 USD, mismo sentido que ARS/COP/BRL/MXN/JPY en el resto del sitio) — ver comentario de cabecera
de data/es/realmadrid-es-data.js para el detalle completo.

Sevilla tuvo un ejercicio 2024/25 MUY MALO: pérdida neta de EUR 54,061 M, revenue cayó de 174,970
a 115,185 M (caída de ~34%, consistente con no clasificar a competición europea esa temporada,
"Ingresos por competiciones" cayó de 61,775 a solo 7,193 M), y Patrimonio Neto NEGATIVO (-122,813
M) al cierre — situación patrimonial muy comprometida.

Categorización de Ingresos (cifra de negocios, 4 líneas):
- "Ingresos por competiciones" -> competition_bonus.
- "Ingresos por abonados y socios" -> season_tickets (mezcla, el documento no separa).
- "Ingresos por retransmisión" -> broadcasting.
- "Ingresos por comercialización y publicidad" -> sponsorship_commercial.
- "Otros ingresos de explotación" + "Imputación de subvenciones" + "Exceso de provisiones" +
  "Otros Resultados" -> other_income.

Categorización de Gastos:
- "Gastos plantilla deportiva" (inscribible+no inscribible en LFP) -> wages_squad.
- "Gastos de personal no deportivo" -> admin_general_expense (el documento SÍ separa plantel de
  resto del personal).
- "Aprovisionamientos" + "Pérdidas/deterioro provisiones comerciales" (crédito neto este año) +
  "Gastos de adquisición de jugadores" (comisiones, ambas categorías LFP/no-LFP) -> other_expenses.
- "Servicios exteriores" + "Tributos" + "Otros gastos de gestión corriente" -> admin_general_expense.
- "Desplazamientos" -> match_organisation_expense.
- "Amortización del inmovilizado": el documento YA separa "De derechos de adquisición de
  jugadores" (inscribible+no inscribible en LFP, -> player_amortisation) de "Del inmovilizado
  material" + "Del inmovilizado inmaterial excluido jugadores" (-> depreciation).

"Resultados procedentes del traspaso de jugadores" (5,690) + "Deterioro y resultado por
enajenaciones del inmovilizado" (0,015) -> fiscalYearMeta.profitOnPlayerSales (neto 5,705 M, no
revenueLine, ver club-data-mapping SKILL.md sección 2).

VERIFICACIÓN (ver .md para el detalle): Revenue 122,574 M - Expenses cash 150,078 M - Non-cash
27,455 M = Operating profit -54,959 M; + profitOnPlayerSales 5,705 M = -49,254 M = RESULTADO DE
EXPLOTACIÓN impreso EXACTO; + netInterest -4,807 M = -54,061 M = RESULTADO ANTES DE IMPUESTOS
impreso EXACTO; + tax 0 = -54,061 M = RESULTADO DEL PERIODO impreso EXACTO.
============================================================================
```

## 2025

### Meta

```text
grossDebt = Deudas a largo plazo (233,433 M, incluye un préstamo participativo grande de
entidades deportivas de 116,896 M) + Deudas a corto plazo (34,920 M). cash = Efectivo y otros
activos líquidos equivalentes.
```

## Gestiones

_antes de José Castro Carmona (data/gestiones/es.js):_

```text
Castro: ocupó la presidencia en funciones al dimitir Del Nido Benavente (anunciado el 9/12/2013).
```

## Fuentes

### sevillafc-es-cuentas-anuales-2024-25

_note (data/):_

```text
PDF oficial, escaneo sin capa de texto (leído renderizando páginas a imagen). Patrimonio Neto NEGATIVO al cierre (-122,813 M EUR) — club en situación financiera comprometida. Transcripción completa de la cuenta de resultados en Clubes/España/Sevilla FC/cuentas-anuales-2024-2025-cuenta-resultados.md.
```

## Otros

### sevillafcPasesData

```text
Mercado de pases / Resultados deportivos / Títulos: NO onboardeados (alcance de esta sesión fue
solo Finanzas). Vacíos a propósito.
```

### memberCountByClub.sevillafc

```text
no investigado en esta sesión (fuera de alcance: solo Finanzas)
```
