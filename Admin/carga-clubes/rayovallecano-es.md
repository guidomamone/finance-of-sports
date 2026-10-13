# rayovallecano-es — evidencia de carga

Lo que había como comentario en `data/rayovallecano-es-data.js`, movido tal cual por `tools/mover-comentarios-data.mjs` (la regla:
`Admin/CONVENCIONES-DATOS.md`, "data/<club>-data.js NO LLEVA COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y
meta. Las notas de cada fila van en una tabla con su número de fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
============================================================================
data/rayovallecano-es-data.js — Rayo Vallecano de Madrid, S.A.D. Ejercicio
2024/2025 (1/7/2024 a 30/6/2025), único ejercicio cargado.

Fuente: "Informe de auditoría, Cuentas Anuales e Informe de Gestión del
ejercicio cerrado a 30 de junio de 2025" (`Clubes/España/Rayo Vallecano/
informe-auditoria-cuentas-anuales-2024-2025.pdf`, 50 págs., CON capa de
texto real — pdftotext funcionó sin OCR, a diferencia de Mallorca/Oviedo).
Encontrado por búsqueda directa (no vía la página de transparencia propia
del club esta sesión), ver fuentes/España/Rayo Vallecano.md. Host
statics-maker.llt-services.com/ray/ (mismo CMS compartido).

OPINIÓN DE AUDITORÍA CON SALVEDADES (AUDRIA, S.L., pág. 2 del .md): el
fundamento de la salvedad es que, el 5/7/2019, el club firmó un Convenio con
la Comunidad de Madrid para la concesión de uso del Campo de Fútbol de
Vallecas, y a la fecha del informe NO se le había facilitado al auditor una
tasación de ese derecho de uso por un experto independiente que permitiera
valorarlo — el auditor no puede confirmar si ese derecho de uso está bien
valorado (o si debería estar reconocido como activo) en el balance. ES UNA
SALVEDAD DE VALORACIÓN DE UN ACTIVO NO CORRIENTE (el derecho de concesión
del estadio), NO afecta directamente ninguna línea de revenueLines/
expenseLines cargada acá (ingresos/gastos operativos del ejercicio) ni el
PAT del ejercicio — el efecto potencial, si lo hay, sería sobre el activo
intangible/inmovilizado del Balance (que este archivo no carga en detalle,
solo grossDebt/cash), no sobre la Cuenta de Pérdidas y Ganancias. Se
documenta la salvedad en el `note` de `sources{}` abajo y queda una duda
abierta en Admin/dudas-por-club.md sobre si el derecho de uso figura o no
en el Activo No Corriente del club (ninguna línea del Balance transcripta
se llama explícitamente "derecho de concesión"/"derecho de uso del
estadio" — podría estar sin reconocer del todo, consistente con la
salvedad).

TRANSCRIPCIÓN: la Cuenta de Pérdidas y Ganancias (págs. 9-10 del .md) tiene
cada fila y su número en la MISMA línea para casi todo el cuerpo operativo
(1 a 12, hasta RESULTADO DE EXPLOTACIÓN) — reconcilió EXACTO al centavo en
todos los niveles. La sección de Resultado Financiero e Impuestos (líneas
13 a 19 del original) SÍ perdió sus números en la extracción (quedaron solo
las etiquetas) — se reconstruyeron cruzando 3 fuentes independientes del
mismo documento: "Resultado del ejercicio" 30/06/2025 = 1.512.965,38 EUR,
impreso 2 VECES (Balance, Patrimonio Neto, pág. 8 del .md, Y Nota 13
"Fondos Propios", cuadro de movimientos, pág. 34-35 del .md, ambos
coinciden exacto); el desglose de "TOTAL GASTO/INGRESO POR IMPUESTO SOBRE
BENEFICIOS A 30/06/2025" (Nota de Impuesto sobre beneficios, pág. ~37 del
.md) da +53.444,12 EUR NETO (Impuesto corriente -933.044,07 + Impuesto
diferido +986.488,19, un CRÉDITO fiscal neto, no un gasto, pese al rótulo
"(Gasto)" del propio cuadro). Con RESULTADO DE EXPLOTACIÓN (1.502.931,16,
reconciliado exacto de forma independiente sumando las 12 líneas
operativas) y estos 2 anclas, `netInterest` sale por RESIDUO: 1.512.965,38
- 1.502.931,16 - 53.444,12 = -43.409,90 EUR. Es la única cifra de este
archivo que no viene de un número impreso directo, sino de una resta de 2
números impresos confirmados por partida doble — documentado por si una
sesión futura encuentra el Balance/Nota de Ingresos y Gastos Financieros
con el desglose explícito para reemplazar el residuo por el dato primario.

Cifras en EUR MILLONES nativos. Tipo de cambio: el documento NO declara uno
propio (sin Anexo de moneda extranjera) -> `fxRef:'EUR@2025-06-30'` (cierre
BCE, ya en data/currency-map.js), `fxSource:'market_close'`.

CATEGORIZACIÓN (mismo formato INFUT que Mallorca/Oviedo/Getafe/Sevilla FC,
mismo criterio ya establecido):
- "Ingresos por competiciones" -> competition_bonus (línea única, el
  documento no desglosa Liga/Copa/amistosos para este club).
- "Ingresos por abonados y socios" -> season_tickets.
- "Ingresos por retransmisión" -> broadcasting.
- "Ingresos por comercialización" + "Ingresos por publicidad" ->
  sponsorship_commercial (2 líneas separadas).
- "Otros ingresos de explotación" (Ingresos accesorios y otros de gestión
  corriente + Subvenciones de explotación) -> other_income.
- "Excesos de provisiones" (positivo) -> other_income (reversión de
  provisiones, mismo criterio de club-data-mapping: exceso/reversión no es
  gasto).
- "Otros resultados" (negativo este ejercicio) -> other_expenses (mismo
  criterio que Getafe: positivo->other_income, negativo->other_expenses).
- "Deterioro y resultado por enajenaciones del inmovilizado" = "Resultados
  procedentes de la transferencia de jugadores" (el propio documento SÍ lo
  etiqueta así, sin ambigüedad) -> fiscalYearMeta.profitOnPlayerSales,
  NUNCA revenueLine (club-data-mapping sección 2).
- "Aprovisionamientos" -> other_expenses.
- "Gastos de personal no deportivo" -> admin_general_expense. "Gastos
  plantilla deportiva" (inscribible + no inscribible en la LFP, combinadas
  en 1 línea) -> wages_squad.
- "Otros gastos de explotación": TODOS los sub-ítems reconcilian exacto
  contra el subtotal impreso (a diferencia de Real Oviedo, acá no hay
  ninguna línea "fantasma" fuera del subtotal) — se promovieron igual a
  líneas de primer nivel por tener categoría real distinta (club-data-
  mapping sección 1): "Servicios exteriores"/"Tributos"/"Otros gastos de
  gestión corriente" -> admin_general_expense; "Desplazamientos" ->
  match_organisation_expense; "Gastos de adquisición de jugadores"
  (inscribible + no inscribible, combinadas) -> other_expenses; "Pérdidas,
  deterioro y variación de provisiones por operaciones comerciales" ->
  other_expenses.
- "Amortización del inmovilizado": "Amortización derechos adquisición
  jugadores" (inscribible + no inscribible, combinadas) ->
  player_amortisation; "Otras amortizaciones" -> other_amortisation.

VERIFICACIÓN Ejercicio 2024/2025 (ver .md págs. 9-10 para el detalle),
sumando las 12 líneas originales del P&L en su propio orden (1 a 12):
56,017723 M (cifra de negocios) - 1,291365 M (aprovisionamientos) +
1,974943 M (otros ingresos explotación) - 35,319487 M (gastos de personal)
- 14,576643 M (otros gastos explotación) - 7,041776 M (amortización) +
0,470250 M (excesos de provisiones) + 1,500000 M (profitOnPlayerSales) -
0,230713 M (otros resultados) = 1,502932 M ≈ RESULTADO DE EXPLOTACIÓN
impreso (1.502.931,16) EXACTO (redondeo ≤1 EUR); + netInterest -0,043410 M
= 1,459522 M; + tax +0,053444 M = 1,512966 M ≈ "Resultado del ejercicio"
impreso (1.512.965,38) EXACTO (redondeo ≤2 EUR), coincide con el Balance
(Patrimonio Neto) Y con la Nota 13 "Fondos Propios".

grossDebt = "Deudas a largo plazo" (1,052439 M) + "Deudas a corto plazo"
(0,149925 M) del Balance, EXCLUYENDO "Provisiones a largo/corto plazo"
(29,829692 M + 1,067493 M — una previsión/contingencia legal grande, NO
deuda financiera, posiblemente ligada a antecedentes concursales del club
según las notas de impuesto diferido "efecto impositivo de la deuda
concursal"), Pasivos por impuesto diferido/corriente y Acreedores
comerciales — mismo criterio angosto "Deudas" que Boca/Getafe/Mallorca/
Oviedo. cash = "Efectivo y otros activos líquidos equivalentes" (Activo
Corriente, íntegro en Tesorería).

brandColor: null. Camiseta blanca dominante con franja diagonal roja (el
diseño histórico desde 1949-50, inspirado en River Plate, según Wikipedia
en español) — mismo bucket que River/Vélez/Sevilla/Real Madrid (sección 3
de club-or-year-onboarding/SKILL.md: "camiseta blanca con un acento fuerte,
no se resuelve buscando más, es decisión de producto"). Ver
fuentes/España/Rayo Vallecano.md.

gestionesByClub: Raúl Santiago Martín Presa, accionista mayoritario
(96.166 acciones, 97,82% del capital, Nota de Fondos Propios/Accionistas)
y firmante de las cuentas anuales ("Fdo.: D. Raúl Santiago Martín Presa",
pág. 47 del .md) — confirmado en el propio documento primario.
============================================================================
```

_de data/club-leagues/es.js:_

```text
8° de 20
```

## 2025

### Meta

```text
netInterest: NO es un número impreso directo — sale por residuo de 2 anclas
confirmadas (RESULTADO DE EXPLOTACIÓN reconciliado exacto + "Resultado del
ejercicio" impreso 2 veces + tax de la Nota de Impuesto sobre beneficios), ver
comentario de cabecera completo. tax = TOTAL GASTO/INGRESO POR IMPUESTO SOBRE
BENEFICIOS de la Nota correspondiente: Impuesto corriente -0,933044 M + Impuesto
diferido +0,986488 M = +0,053444 M NETO (crédito fiscal, no gasto, pese al
rótulo "(Gasto)" del propio cuadro de la memoria).
profitOnPlayerSales = "Resultados procedentes de la transferencia de jugadores"
(único componente de "Deterioro y resultado por enajenaciones del inmovilizado").
grossDebt = Deudas a largo plazo (1,052439 M) + Deudas a corto plazo
(0,149925 M), EXCLUYENDO Provisiones (LP+CP), Pasivos por impuesto
diferido/corriente y Acreedores comerciales. cash = Efectivo y otros
activos líquidos equivalentes (Activo Corriente, íntegro en Tesorería).
```

## Gestiones

_antes de Raúl Martín Presa (data/gestiones/es.js):_

```text
Martín Presa compró el club a Nueva Rumasa en 2011; su primera junta como dueño fue el 7/11/2011 (fecha aproximada de asunción).
```

## Otros

### memberCountByClub['rayovallecano-es']

```text
no investigado en esta sesión (alcance: solo Finanzas)
```
