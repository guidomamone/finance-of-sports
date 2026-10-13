# realoviedo-es — evidencia de carga

Lo que había como comentario en `data/es/realoviedo-es-data.js`, movido tal cual por `tools/mover-comentarios-data.mjs` (la regla:
`Admin/CONVENCIONES-DATOS.md`, "data/<país>/<club>-data.js NO LLEVA COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y
meta. Las notas de cada fila van en una tabla con su número de fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
============================================================================
data/es/realoviedo-es-data.js — Real Oviedo, S.A.D. Ejercicio 2024/2025
(1/7/2024 a 30/6/2025), único ejercicio cargado.

Fuente: "Cuentas Anuales, Temporada 2024-25" (`Clubes/España/Real Oviedo/
cuentas-anuales-2024-2025.pdf`, 65 págs.). Bajado de
`realoviedo.es/ley-de-transparencia`, ver Admin/sourcing/España/Real Oviedo.md.
Host statics-maker.llt-services.com/ovi/ (mismo CMS compartido que
Mallorca/Girona/Getafe/etc.).

TRANSCRIPCIÓN: a diferencia de Mallorca (mismo CMS, pero con las etiquetas
separadas de sus números por el OCR), acá la Cuenta de Pérdidas y Ganancias
vino con cada fila y su número en la MISMA línea — mucho menos ruido de
OCR, reconcilió exacto (con centavos de redondeo, ≤2 EUR) en todos los
niveles: rubro -> sub-total -> RESULTADO DE EXPLOTACIÓN -> RESULTADO ANTES
DE IMPUESTOS -> "Resultado del ejercicio" (impreso 2 veces, en la Cuenta de
P&G y en el Balance, ambos exactos -5.578.650). Ver VERIFICACIÓN abajo.

UN AJUSTE DE ESTRUCTURA ENCONTRADO AL RECONCILIAR: "Pérdidas, deterioro y
variación provisiones por operaciones comerciales" (-12.131) aparece listada
visualmente bajo el mismo grupo "Otros Gastos de explotación" que Servicios
exteriores/Tributos/Desplazamientos/etc., pero el subtotal impreso de ese
grupo (-9.250.684) NO la incluye (los otros 5 sub-ítems solos ya suman
exacto -9.250.684/685). Sí participa del RESULTADO DE EXPLOTACIÓN total
(sin sumarla, el resultado da -5.264.306 contra el -5.276.439 impreso,
diferencia de -12.133 ≈ el valor exacto de esta línea). Se cargó como línea
de primer nivel propia (mismo criterio de "promover sub-ítems con categoría
real distinta" de club-data-mapping sección 1), no anidada bajo el grupo.

Cifras en EUR MILLONES nativos. Tipo de cambio: el documento NO declara uno
propio (sin Anexo de moneda extranjera) -> `fxRef:'EUR@2025-06-30'` (cierre
BCE, ya en data/currency-map.js), `fxSource:'market_close'`.

CATEGORIZACIÓN (mismo formato INFUT que Mallorca/Getafe/Sevilla FC/Osasuna,
mismo criterio ya establecido para esos clubes):
- "Ingresos por competiciones" (Liga/Copa/amistosos/Otros) ->
  competition_bonus, NO matchday_competition (sin línea de taquilla propia,
  mismo criterio que el resto de clubes con este formato INFUT).
- "Ingresos por abonados y socios" -> season_tickets.
- "Ingresos por retransmisión" -> broadcasting (sin desglose por concepto
  este documento, línea única).
- "Ingresos por comercialización" + "Ingresos por publicidad" ->
  sponsorship_commercial (2 líneas separadas).
- "Otros ingresos" (Ingresos LFP + Subvenciones a la explotación y otros +
  Cesiones + Otros) -> other_income, una sola línea con desglose en items.
- "Imputación de subvenciones de inmovilizado no financiero y otras" ->
  other_income.
- "Otros Resultados" (positivo este ejercicio) -> other_income.
- "Deterioro y resultado por enajenaciones" (Beneficios procedentes del
  inmovilizado e ingresos excepcionales 2.800.000 menos Pérdidas
  procedentes del inmovilizado y gastos excepcionales -28.971 = 2.771.029):
  misma posición del P&L INFUT que "traspaso de jugadores" en Mallorca (el
  inmovilizado intangible deportivo del club, es decir los derechos de
  jugadores, es la partida que se da de baja acá) -> fiscalYearMeta.
  profitOnPlayerSales, NUNCA revenueLine (club-data-mapping sección 2). El
  documento no lo etiqueta explícitamente "traspaso de jugadores" como
  Mallorca, así que queda una duda menor anotada en Admin/dudas-por-club.md
  sobre si incluye algún activo no futbolístico.
- "Aprovisionamientos y variación de existencias" -> other_expenses.
- "Gastos de personal no deportivo" -> admin_general_expense. "Gastos
  plantilla deportiva" (inscribible + no inscribible en la LFP) ->
  wages_squad.
- "Otros Gastos de explotación": sub-ítems promovidos a líneas de primer
  nivel (ver nota de arriba) — "Servicios exteriores"/"Tributos"/"Otros
  gastos de gestión corriente" -> admin_general_expense; "Desplazamientos"
  -> match_organisation_expense; "Pérdidas, deterioro y variación de
  provisiones por operaciones comerciales" -> other_expenses; "Gastos de
  adquisición de jugadores inscribible en la LFP" -> other_expenses
  (comisiones/intermediación, mismo criterio que Mallorca/Sevilla FC).
- "Amortizaciones": "Amortizaciones del inmovilizado material" ->
  depreciation; "Amortizaciones del inmovilizado inmaterial (excluido
  jugadores)" -> other_amortisation; "Amortizaciones de los derechos de
  adquisición de jugadores" -> player_amortisation.

VERIFICACIÓN Ejercicio 2024/2025: Revenue (revenueLines) 25,162014 M -
Expenses cash (Aprovisionamientos + Gastos personal + Otros Gastos
explotación, incl. la línea de Pérdidas/deterioro) 31,190394 M - Non-cash
(Amortizaciones) 2,019087 M = -8,047467 M; + profitOnPlayerSales 2,771029 M
= -5,276438 M ≈ RESULTADO DE EXPLOTACIÓN impreso (-5.276.439) EXACTO
(redondeo ≤1 EUR); + netInterest -0,077772 M = -5,354210 M ≈ RESULTADO
ANTES DE IMPUESTOS impreso (-5.354.212) EXACTO; + tax -0,224438 M =
-5,578648 M ≈ "Resultado del ejercicio" impreso (-5.578.650) EXACTO
(redondeo ≤2 EUR), coincide con el Balance (pág. 5 del .md).

grossDebt = "Deudas a largo plazo" (7,594336 M) + "Deudas a corto plazo"
(0,530218 M) del Balance, EXCLUYENDO "Acreed. comerciales y otras ctas a
pagar" (deuda comercial, no financiera) y Pasivos por impuesto diferido —
mismo criterio angosto "Deudas" que Boca/Getafe/Mallorca. cash =
"Tesorería" del Activo Corriente (Efectivo y otros activos líquidos
equivalentes, "Otros activos líquidos" = 0 este ejercicio).

brandColor: '#0033A0' (azul), Wikipedia en español declara los colores del
club como "Azul y Blanco" con el azul en PANTONE 286C — hex convertido de
ese Pantone (fuentes de conversión: crispedge.com, icolorpalette.com,
coinciden en #0032A0/#0033A0). Azul domina sobre blanco en la identidad
(nombre popular "los azules", equipación histórica). Ver
Admin/sourcing/España/Real Oviedo.md.

gestionesByClub: no se encontró un nombre de Presidente identificable en la
transcripción (menciona el cargo "Presidente — Consejero Delegado" sin
nombre propio legible) -> entrada genérica "Sin confirmar".
============================================================================
```

## 2025

### Meta

```text
netInterest = RESULTADO FINANCIERO impreso (Ingresos financieros 0,019923 M -
Gastos financieros -0,112247 M + Diferencias de cambio 0,014552 M).
profitOnPlayerSales = "Deterioro y resultado por enajenaciones" (Beneficios
procedentes del inmovilizado e ingresos excepcionales 2,800000 M menos
Pérdidas procedentes del inmovilizado y gastos excepcionales -0,028971 M).
grossDebt = Deudas a largo plazo (7,594336 M) + Deudas a corto plazo
(0,530218 M), EXCLUYENDO Acreedores comerciales y Pasivos por impuesto
diferido. cash = Tesorería (Activo Corriente).
```

## Gestiones

_antes de Carlos Slim (data/gestiones/es.js):_

```text
Slim entró el 17/11/2012 con el control del club. Desde julio de 2022 manda Grupo Pachuca (sociedad): el presidente es Martín Peláez (dia 01).
```

## Fuentes

### realoviedo-es-cuentas-anuales-2024-25

_note (data/):_

```text
PDF oficial (65 págs.), texto con poco ruido de OCR (a diferencia de Mallorca, cada fila y su número quedaron en la misma línea en la transcripción). Un sub-ítem ("Pérdidas, deterioro y variación de provisiones por operaciones comerciales") aparece bajo el grupo visual "Otros Gastos de explotación" pero el subtotal impreso de ese grupo no lo incluye — se cargó como línea propia, ver comentario de cabecera de data/es/realoviedo-es-data.js. Bajado de realoviedo.es/ley-de-transparencia, host statics-maker.llt-services.com/ovi/. Transcripción completa en Clubes/España/Real Oviedo/cuentas-anuales-2024-2025.md.
```

## Otros

### memberCountByClub['realoviedo-es']

```text
no investigado en esta sesión (alcance: solo Finanzas)
```
