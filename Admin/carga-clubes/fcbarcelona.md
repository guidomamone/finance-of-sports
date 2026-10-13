# fcbarcelona — evidencia de carga

Lo que había como comentario en `data/fcbarcelona-data.js`, movido tal cual por `tools/mover-comentarios-data.mjs` (la regla:
`Admin/CONVENCIONES-DATOS.md`, "data/<club>-data.js NO LLEVA COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y
meta. Las notas de cada fila van en una tabla con su número de fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
============================================================================
data/fcbarcelona-data.js — Futbol Club Barcelona, Ejercicio 2024/2025 (1/7/2024 a 30/6/2025).

Un solo ejercicio (el más reciente, 2024/25) por decisión de alcance de esta sesión: "ancho, no
profundo" (sumar clubes, no profundizar años por club) aunque el archivo fuente tiene 22 años
disponibles (2003-04 a 2024-25). Fuente: "Cuentas Anuales y Auditoría 2024-25" (documento oficial
separado de la Memoria narrativa, más corto y enfocado en los estados financieros), descargado de
fcbarcelona.es/es/club/transparencia/informacion-legal-institucional-y-economica — ver
Clubes/España/FC Barcelona/cuentas-anuales-y-auditoria-2024-25.pdf y su transcripción en
Clubes/España/FC Barcelona/cuentas-anuales-y-auditoria-2024-25-cuenta-resultados.md.

GOTCHA DE EXTRACCIÓN (ver .md para el detalle completo): las páginas del balance y la cuenta de
pérdidas y ganancias tienen el texto nativo del PDF deliberadamente ofuscado (ToUnicode CMap
reordenado) — pdftotext devuelve gibberish para esas 2 páginas puntuales, aunque el resto del
documento (memoria/notas) extrae texto normal. Se resolvió renderizando esas páginas a imagen
(pdftoppm -r 300) y leyéndolas con el Read tool (el PDF se VE perfecto, solo la capa de texto de
esas páginas está corrupta). Ver esa nota en el .md por si aparece el mismo patrón en otro club.

Cifras en EUR MILLONES nativos, escala 1 (el propio "miles €" impreso, leído como decimal, ya
equivale a millones — mismo criterio documentado en data/realmadrid-data.js). Tipo de cambio
EUR/USD 1,172 al 30/6/2025 (cotización de cierre BCE, investigada vía web search, mismo valor que
Real Madrid al ser la misma fecha de cierre) — solo para el toggle de display, EUR es la moneda de
reporte real. `fx` en fiscalYearMeta va INVERTIDO (0,8532 = 1/1,172, EUR por 1 USD): mismo
sentido que ARS/COP/BRL/MXN/JPY en el resto del sitio, ver comentario de cabecera de
data/realmadrid-data.js para el detalle completo.

Categorización de Ingresos (Nota 18.1 "Importe neto de la cifra de negocios", 5 líneas):
- "Ingresos por competiciones" -> competition_bonus.
- "Ingresos por abonados y socios" -> season_tickets (aproximación: mezcla abonados/season-ticket
  holders con cuotas de socios, el documento no las separa; se priorizó "abonados" porque
  encabeza la etiqueta y es el componente dominante en un club con más socios que abonados reales
  a un asiento fijo, mismo tipo de aproximación documentada para Real Madrid).
- "Ingresos por retransmisiones y derechos televisivos" -> broadcasting.
- "Ingresos por comercialización y publicidad" -> sponsorship_commercial.
- "Ingresos por prestación de servicios" + "Otros ingresos de explotación" + "Trabajos realizados
  por la empresa para su activo" + "Exceso de provisiones" + "Dotación y aplicación de provisiones
  y otros" (neto) -> other_income (ninguno tiene categoría propia en el esquema del sitio).

Categorización de Gastos:
- "Gastos de personal" (deportivo+no deportivo+cargas sociales+provisiones, el documento NO separa
  plantel profesional de resto de personal) -> wages_squad.
- "Aprovisionamientos" (consumos/material deportivo) -> other_expenses.
- Dentro de "Otros gastos de explotación": "Servicios exteriores"+"Tributos"+"Otros gastos de
  gestión corriente" -> admin_general_expense; "Desplazamientos" -> match_organisation_expense
  (viajes de competición); "Pérdidas/deterioro operaciones comerciales"+"Gastos por adquisición de
  jugadores" (comisiones, no amortización) -> other_expenses.
- "Amortización del inmovilizado": SEPARADA por el propio documento en 2 líneas ya explícitas —
  "Amortización de los derechos de adquisición de jugadores" (Nota 5) -> player_amortisation;
  "Otras amortizaciones" (Notas 6 y 7) -> depreciation. A diferencia de Real Madrid, acá NO hizo
  falta derivar el split de una nota de movimiento: el propio P&L ya lo desglosa en 2 líneas.

"Deterioro y resultado por enajenaciones del inmovilizado" (13,470 M, ganancia neta dominada por
"Beneficios procedentes del inmovilizado intangible deportivo" 42,712 M de venta de jugadores) NO
va como revenueLine (club-data-mapping SKILL.md sección 2) -> fiscalYearMeta.profitOnPlayerSales.
"Resultado por la pérdida de control de participaciones consolidadas" (-12,455 M, pérdida contable
por deconsolidar una sociedad dependiente, ver Nota 1.3) -> fiscalYearMeta.assetSales (el campo
más cercano disponible para un ítem no-operativo/corporativo que el documento SÍ suma al
resultado de explotación; no es una venta de activo fijo en el sentido estricto, documentado acá
para que quede claro que es una aproximación de encaje, no un error de categoría).

VERIFICACIÓN (ver .md para el detalle): Revenue 996,365 M - Expenses cash 819,791 M - Non-cash
106,317 M = Operating profit 70,257 M; + profitOnPlayerSales 13,470 + assetSales -12,455 =
71,272 M = RESULTADO DE EXPLOTACIÓN impreso EXACTO; + netInterest -79,649 (= Resultado financiero
-79,897 + Participación en sociedades PE +0,248) = -8,377 M = RESULTADO ANTES DE IMPUESTOS impreso
EXACTO; + tax -8,572 = -16,949 M = RESULTADO DEL EJERCICIO impreso EXACTO (Barça cerró el
ejercicio con pérdida neta real, consistente con la cobertura de prensa pública).
============================================================================
```

## 2025

### Meta

```text
grossDebt = Deudas a largo plazo (100,001 M) + Deudas a corto plazo (205,154 M) del balance
consolidado — incluye "deudas con entidades deportivas" (pases a pagar), no solo deuda
bancaria (el balance no separa un subtotal solo-bancario limpio, a diferencia de Real Madrid).
cash = Tesorería (Efectivo y otros activos líquidos equivalentes).
```

## Gestiones

_antes de Joan Laporta (data/gestiones/es.js):_

```text
Toma de posesión el 17/3/2021 (elegido el 7/3), tras la comisión gestora de Tusquets.
```

## Fuentes

### fcbarcelona-cuentas-anuales-2024-25

_note (data/):_

```text
PDF oficial de 105 páginas. Texto nativo en casi todo el documento, PERO las páginas del balance y la cuenta de pérdidas y ganancias tienen el ToUnicode ofuscado (ver comentario largo arriba y el .md de transcripción) — se leyeron renderizando esas 2 páginas a imagen. Cuentas CONSOLIDADAS (Grupo FC Barcelona). Transcripción completa de la cuenta de resultados en Clubes/España/FC Barcelona/cuentas-anuales-y-auditoria-2024-25-cuenta-resultados.md.
```

## Otros

### fcbarcelonaPasesData

```text
Mercado de pases / Resultados deportivos / Títulos: NO onboardeados (alcance de esta sesión fue
solo Finanzas). Vacíos a propósito, mismo criterio que Vélez/Real Madrid.
```

### memberCountByClub.fcbarcelona

```text
no investigado en esta sesión (fuera de alcance: solo Finanzas)
```
