# rcdmallorca-es — evidencia de carga

Lo que había como comentario en `data/rcdmallorca-es-data.js`, movido tal cual por `tools/mover-comentarios-data.mjs` (la regla:
`Admin/CONVENCIONES-DATOS.md`, "data/<club>-data.js NO LLEVA COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y
meta. Las notas de cada fila van en una tabla con su número de fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
============================================================================
data/rcdmallorca-es-data.js — Real Club Deportivo Mallorca, S.A.D. Ejercicio
2024/2025 (1/7/2024 a 30/6/2025), único ejercicio cargado.

Fuente: "Cuentas Anuales e Informe de Gestión, Temporada 2024-25"
(`Clubes/España/RCD Mallorca/cuentas-anuales-informe-gestion-2024-2025.pdf`,
75 págs.). Bajado de `rcdmallorca.es/en/ley-de-transparencia`, ver
Admin/sourcing/España/RCD Mallorca.md. Host statics-maker.llt-services.com/mll/
(mismo CMS compartido que Girona/Getafe/Elche/etc.).

GOTCHA DE TRANSCRIPCIÓN (mismo patrón que Getafe/Osasuna, ver esos archivos):
la Cuenta de Pérdidas y Ganancias (págs. 8-9 del .md) viene con las
etiquetas de fila separadas de sus 2 columnas de números por el
OCR/extracción del escaneo — cada número se reasoció a su fila contando la
posición en la lista y verificando la reconciliación contra los subtotales
impresos en CADA nivel (rubro -> sub-total -> A.1/A.2/A.3 -> Resultado del
Ejercicio), antes de cargar nada (club-data-mapping SKILL.md sección 6). El
primer número de "Importe neto de la cifra de negocios" salió inicialmente
mal leído (72.870.093,25) por un dígito "8"/"5" confundido en el escaneo —
se corrigió a 72.570.093,25 al cruzar contra la Nota 31.1 "Cifra de negocios
por categoría de actividades" (pág. 64 del .md), que reimprime la MISMA
tabla con mejor calidad de OCR y reconcilia exacto como suma de sus 6
categorías (Competiciones+Abonados/socios+Instalaciones+Retransmisión+
Comercialización+Publicidad = 72.570.093,25 exacto). Todo lo demás
reconcilió exacto sin ajuste, ver VERIFICACIÓN abajo.

Cifras en EUR MILLONES nativos (documento en euros completos, dividido por
1.000.000 al cargar). Tipo de cambio: el documento NO declara uno propio
(sin Anexo de moneda extranjera) -> `fxRef:'EUR@2025-06-30'` (cierre BCE, ya
en data/currency-map.js), `fxSource:'market_close'`.

CATEGORIZACIÓN (mismo formato INFUT que Getafe/Sevilla FC/Osasuna — rubros
prácticamente idénticos, mismo criterio ya establecido para esos clubes):
- "Ingresos por competiciones" (Liga/Copa/Supercopa/amistosos) ->
  competition_bonus, NO matchday_competition: este documento no tiene una
  línea de "taquilla"/venta de entradas propiamente dicha, es dinero
  proveniente de la distribución de LaLiga por competiciones (mismo
  criterio que Getafe/Sevilla FC/Osasuna/Elche, ver esos archivos).
- "Ingresos por abonados y socios" -> season_tickets (mezcla abonos+cuotas
  de socios, el documento no separa — mismo criterio que TODOS los clubes
  españoles ya cargados con esta misma línea).
- "Ingresos por explotación de instalaciones" -> stadium_other (uso del
  estadio fuera del partido, mismo criterio que Osasuna).
- "Ingresos por retransmisión" -> broadcasting.
- "Ingresos por comercialización" + "Ingresos por publicidad" ->
  sponsorship_commercial (2 líneas separadas, mismo criterio que
  Getafe/Osasuna).
- "Otros ingresos" (Ingresos LFP + Subvenciones a la explotación y otros +
  Trabajos realizados por la entidad y otros + Cesiones + Otros) ->
  other_income, una sola línea con desglose en items (ninguno de los
  sub-ítems tiene una categoría real distinta disponible en la taxonomía;
  "Cesiones" -Income por préstamo de jugadores a otros clubes- es chico
  -233.000€- y quedó en el mismo catch-all, a diferencia de Getafe que sí
  la promovió a player_sales propia — duda anotada en Admin/dudas-por-club.md).
- "Imputación de subvenciones de inmovilizado no financiero y otras" ->
  other_income (mismo criterio que Getafe/Girona).
- "Otros resultados" (positivo este ejercicio) -> other_income.
- "Deterioro y resultado por enajenaciones de inmovilizado" (venta de
  jugadores, neto de beneficios y pérdidas: 8.403.888,10 - 635.000,00) ->
  fiscalYearMeta.profitOnPlayerSales, NUNCA revenueLine (club-data-mapping
  sección 2).
- "Aprovisionamientos y variación de existencias" -> other_expenses (costo
  de material deportivo/tiendas y medicinas, mismo criterio que
  Girona/Getafe/Osasuna/Elche/Espanyol).
- "Gastos de personal no deportivo" -> admin_general_expense. "Gastos de
  personal de plantilla deportiva" (inscribible + no inscribible en la
  Liga, sueldos+SS+primas+indemnizaciones) -> wages_squad. Mismo criterio
  exacto que Getafe/Sevilla FC (misma plantilla de documento).
- "Otros gastos de explotación": sub-ítems con categoría real distinta
  promovidos a líneas de primer nivel (club-data-mapping sección 1) —
  "Servicios exteriores"/"Tributos"/"Otros gastos de gestión corriente" ->
  admin_general_expense; "Desplazamientos" -> match_organisation_expense;
  "Pérdidas, deterioro y variación de provisiones por operaciones
  comerciales" -> other_expenses; "Gastos de adquisición de jugadores"
  (inscribibles + no inscribibles, combinadas en 1 línea) -> other_expenses
  (comisiones/intermediación, mismo criterio que Sevilla FC: Boca tampoco
  separa comisiones dentro de "Compra de jugadores"); "Otros" (residual del
  grupo) -> other_expenses.
- "Amortizaciones": "Amortización del inmovilizado material" -> depreciation;
  "Amortizaciones del intangible (excluido jugadores)" -> other_amortisation;
  "Amortiz. derechos adq. jugadores inscribibles/no inscribibles Liga"
  (combinadas en 1 línea) -> player_amortisation. Mismo criterio que Getafe.

VERIFICACIÓN Ejercicio 2024/2025 (ver .md págs. 8-9 y 64 para el detalle):
Revenue (revenueLines) 75,528837 M - Expenses cash (Aprovisionamientos +
Gastos personal + Otros gastos explotación) 76,270543 M - Non-cash
(Amortizaciones) 15,742547 M = -16,484253 M; + profitOnPlayerSales
7,768888 M = -8,715365 M ≈ RESULTADO DE EXPLOTACIÓN impreso (-8.715.364,84)
EXACTO; + netInterest -1,151946 M = -9,867311 M ≈ RESULTADO ANTES DE
IMPUESTOS impreso (-9.867.311,30) EXACTO; + tax -0,132013 M = -9,999324 M ≈
RESULTADO DEL EJERCICIO impreso (-9.999.323,87) EXACTO, coincide con
"VIII. Resultado del ejercicio" del Balance (pág. 7) y con el Estado de
Cambios en el Patrimonio Neto (pág. 10).

grossDebt = "Deudas a largo plazo" (41,584630 M) + "Deudas a corto plazo"
(18,019690 M), del Balance de Situación (pág. 7), EXCLUYENDO Provisiones,
Pasivos por impuestos diferidos y Periodificaciones (mismo criterio
"Deudas" angosto que Boca/Vélez/Getafe/Girona). cash = "Efectivo y otros
activos líquidos" del Balance (Activo Corriente, pág. 6).

brandColor: '#E20613' (rojo), Wikipedia en español confirma rojo como color
predominante de la camiseta (negro es secundario, en pantalón/medias desde
1933) — hex verificado en teamcolorcodes.com/rcd-mallorca-colors/ (PANTONE
2035 C). Ver Admin/sourcing/España/RCD Mallorca.md.

gestionesByClub: no se confirmó con certeza quién preside el club durante
este ejercicio en el propio documento (no hay una portada con nombre de
Presidente identificable en la transcripción) -> entrada genérica "Sin
confirmar".
============================================================================
```

_de data/clubs.js:_

```text
3 clubes nuevos (Versión 221, 4to batch de PDF transcriptos pendientes, sesión 2026-09-25,
completando a 10 tras agotar el pool limpio de Sudamérica). `brandColor:null` en Rayo
Vallecano: camiseta blanca dominante con franja diagonal roja, mismo bucket que River/Vélez/
Sevilla/Real Madrid.
```

_de data/club-leagues/es.js:_

```text
Verificado el 2026-09-25 (onboarding, Versión 221) contra Wikipedia en inglés ("2024-25 La
Liga", "2024-25 Real Oviedo season"). Real Oviedo jugó Segunda 2024/25 completa (3° en la
liga regular, ascendió recién por el playoff de junio 2025, para la temporada SIGUIENTE).
```

_de data/club-leagues/es.js:_

```text
10° de 20
```

## 2025

### Meta

```text
netInterest = TOTAL RESULTADO FINANCIERO impreso (pág. 9 del .md).
profitOnPlayerSales = "Deterioro y resultado por enajenaciones de inmovilizado"
(Beneficios procedentes del traspaso de jugadores 8,403888 M menos Pérdidas
procedentes del traspaso -0,635000 M).
grossDebt = Deudas a largo plazo (41,584630 M) + Deudas a corto plazo
(18,019690 M), del Balance de Situación, EXCLUYENDO Provisiones, Pasivos por
impuestos diferidos y Periodificaciones. cash = Efectivo y otros activos
líquidos (Activo Corriente).
```

## Gestiones

_antes de Andy Kohlberg (data/gestiones/es.js):_

```text
Kohlberg: designado por el consejo el 8/9/2017; accionista mayoritario desde que Sarver le vendió su paquete en 2023.
```

## Fuentes

### rcdmallorca-es-cuentas-anuales-informe-gestion-2024-25

_note (data/):_

```text
PDF oficial (75 págs.), escaneo con ruido de OCR en la transcripción — la Cuenta de Pérdidas y Ganancias venía con las etiquetas de fila separadas de sus columnas de números (ver comentario de cabecera de data/rcdmallorca-es-data.js). Un dígito de "Importe neto de la cifra de negocios" se corrigió cruzando contra la Nota 31.1 (mejor calidad de OCR, misma tabla repetida). Bajado de rcdmallorca.es/en/ley-de-transparencia, host statics-maker.llt-services.com/mll/. Transcripción completa en Clubes/España/RCD Mallorca/cuentas-anuales-informe-gestion-2024-2025.md.
```

## Otros

### memberCountByClub['rcdmallorca-es']

```text
no investigado en esta sesión (alcance: solo Finanzas)
```
