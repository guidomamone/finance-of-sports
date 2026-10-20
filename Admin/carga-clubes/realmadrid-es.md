# realmadrid — evidencia de carga

Lo que había como comentario en `data/es/realmadrid-es-data.js`, movido tal cual por `tools/archivo/mover-comentarios-data.mjs` (la regla:
`Admin/CONVENCIONES-DATOS.md`, "data/<país>/<club>-data.js NO LLEVA COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y
meta. Las notas de cada fila van en una tabla con su número de fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
============================================================================
data/es/realmadrid-es-data.js — Real Madrid C.F., Ejercicio 2024/2025 (1/7/2024 a 30/6/2025).

Primer club español cargado al motor genérico. Fuente: "Informe Económico Real Madrid 2024-2025"
(Cuentas Anuales CONSOLIDADAS, informe de auditoría incluido), descargado de
realmadrid.com/es-ES/el-club/transparencia/informes-economicos — ver
Clubes/España/Real Madrid/informe-economico-2024-2025.pdf y su transcripción parcial
(cuenta de pérdidas y ganancias + Nota 4 de amortización de jugadores + deuda/caja) en
Clubes/España/Real Madrid/informe-economico-2024-2025-cuenta-resultados.md.

REGLA DE ALCANCE DE ESTA SESIÓN (pedido explícito de Guido): un solo ejercicio por club español
(el más reciente/completo, 2024/25), NO una serie histórica — aunque el archivo fuente tiene 22
años disponibles (2003-04 a 2024-25), acá solo se carga 2024/25. "Ancho, no profundo": prioridad
es sumar los 10 clubes españoles, no profundizar en uno solo.

Cifras en EUR MILLONES nativos, "escala 1" (no "miles de millones" como ARS): el propio documento
reporta en "miles €", así que el número impreso (con puntos como separador de miles, ej.
"326.092") YA equivale al valor en millones de EUR al leerlo como decimal (326,092 miles de € =
EUR 326,092 M) — ver el .md de arriba para el detalle línea por línea. Conversión a USD vía
yearMetaFor/toDisplayValue, que necesitó una extensión mínima en js/finanzas-calc.js (ver
comentario ahí) para soportar currency:'EUR', primera vez que el motor ve una moneda que no es
ARS/USD.

Tipo de cambio: 1 EUR = 1,172 USD al 30/6/2025 (cotización de cierre BCE, investigada vía web
search — el documento de Real Madrid NO declara su propio tipo de cambio, a diferencia de los
balances argentinos con Anexo de moneda extranjera, porque el Grupo no reporta partidas
materiales en USD). Es una tasa de referencia solo para el toggle de display (EUR es la moneda de
reporte real, USD es una conversión de exhibición), no para ningún cálculo que necesite
reconciliar en USD. OJO con el SENTIDO de `fx` en fiscalYearMeta: el resto del sitio (ARS, COP,
BRL, MXN, JPY) guarda `fx` como "moneda nativa por 1 USD" (ver toDisplayValue,
js/finanzas-calc.js: `value / meta.fx` para nativa->USD), no "USD por 1 nativa" — para EUR/USD
1,172 (USD por 1 EUR), el valor que va en `fx` es el INVERSO, 1/1,172 = 0,8532 (EUR por 1 USD).

Categorización de Ingresos: el documento reporta "Importe neto de la cifra de negocios" en 4
líneas (socios y estadios / amistosos y competiciones / retransmisión / marketing) — más
desglosado que Boca en instituciones pero SIN separar cuotas sociales de recaudación de
estadio/museo/tour (van juntas en "Ingresos de socios y estadios"). Mapeo:
- "Ingresos de socios y estadios" -> matchday_competition (aproximación: mezcla cuotas sociales +
  recaudación de estadio/tour/museo/parking, el documento no las separa; se eligió esta categoría
  porque el componente de estadio es mayoritario para un club con 90.000 socios pero estadio de
  más de 80.000 localidades).
- "Ingresos de amistosos y competiciones" -> competition_bonus (ingresos de partidos amistosos +
  premios/participación en competiciones, distinto de los derechos de TV que van en "retransmisión").
- "Ingresos de retransmisión" -> broadcasting.
- "Ingresos de marketing" -> sponsorship_commercial.
- "Otros ingresos de explotación" + "Trabajos realizados por la empresa para su activo" +
  "Imputación de subvenciones de inmovilizado" + "Excesos de provisiones" -> other_income (ítems
  operativos menores/no recurrentes, ninguno con categoría propia en el esquema del sitio).

Categorización de Gastos:
- "Gastos de personal deportivo y no deportivo" -> wages_squad (el documento NO separa plantel
  profesional de personal no deportivo, se carga el total, mismo criterio que ya usa el sitio
  para Racing/Boca cuando la fuente no permite el desglose).
- "Otros gastos de gestión corriente" -> admin_general_expense.
- "Consumo de materias primas" + "Pérdidas/deterioro por operaciones comerciales" -> other_expenses.
- Amortización del inmovilizado (167,798 M total): SEPARADA en dos líneas usando la Nota 4 del
  informe (movimiento de "Inmovilizado intangible deportivo", que son los derechos de traspaso de
  jugadores): la "dotación" del ejercicio 2024/25 para fútbol masculino+femenino+baloncesto suma
  115,841 M (líneas "Altas y dotaciones" de la tabla de Amortización acumulada) -> player_amortisation.
  El resto (167,798 - 115,841 = 51,957 M, inmovilizado intangible no deportivo + material) ->
  depreciation. Ver el .md de transcripción para el detalle exacto de la Nota 4.

"Deterioro, resultado por enajenaciones del inmovilizado y otros excepcionales" (34,647 M, suma
de "Deterioros y pérdidas" 2,190 + "Resultados por enajenaciones y otras" 32,457): NO va como
revenueLine (ver club-data-mapping SKILL.md sección 2), va a fiscalYearMeta.profitOnPlayerSales —
el propio informe de gestión confirma que este resultado "se deriva en su casi totalidad de
traspasos de jugadores" (comentario sobre el presupuesto 2025/26 en el mismo documento).

VERIFICACIÓN (hecha a mano, ver .md para el detalle): Revenue (suma revenueLines) 1.184,687 M +
Expenses cash (wages+otherExpenses) -976,393 M + Non-cash (amortización) -167,798 M =
Operating profit 40,496 M; + profitOnPlayerSales 34,647 M = 75,143 M = RESULTADO DE EXPLOTACIÓN
impreso EXACTO; + netInterest -43,790 M = 31,353 M = RESULTADO ANTES DE IMPUESTOS impreso EXACTO;
+ tax -7,033 M = 24,320 M = RESULTADO DEL EJERCICIO impreso EXACTO. Cierra perfecto en las 3
instancias, no solo en el resultado final.
============================================================================
```

_de data/clubs.js:_

```text
España (Versión 111): sexto país con datos reales. `reportingCurrency:'EUR'` ya soportado de
forma genérica por CURRENCY_META (data/currency-map.js) desde la Versión 103 — el toggle de
moneda y "Formato del club/simplificado" se muestran para CUALQUIER club (no gateados por
`country === 'AR'` ni por ninguna moneda en particular, ver populateCurrencyToggle() en
index.html). `fiscalYearStart:'07-01'`: los ejercicios de LaLiga corren 1/7 a 30/6, confirmado
en cada PDF fuente ("ejercicio anual terminado el 30 de junio de AAAA") — temporada partida,
igual que los clubes argentinos (no aplica isCalendarYearClub acá).
`brandColor:null` (no ausente): se miró y NO lleva color, el que lo identifica es el blanco.
```

## 2025

### Meta

```text
grossDebt = Deudas con entidades de crédito, largo + corto plazo (74,904+66,110 M). cash =
Efectivo y otros activos líquidos equivalentes (Nota 10). Ambos en EUR M.
```

## Gestiones

_del club (data/gestiones/es.js):_

```text
---- Agregado to-do 195 (España). Ejercicios que cierran el 30/6. Los clubes de socios (Real Madrid, Barcelona, Athletic, Osasuna) llevan al presidente elegido. ----
```

_antes de Florentino Pérez (data/gestiones/es.js):_

```text
Primera etapa de Pérez, Calderón y Boluda: fechas de memoria, sin fuente verificada en esta pasada (confirmada:false, no se muestran).
Segunda etapa: la lista de Wikipedia da solo el año (2009); el 1/6/2009 es la fecha de proclamación y toma de posesión que recuerdo, pero no la pude contrastar en esta pasada.
```

## Fuentes

### realmadrid-es-informe-economico-2024-25

_note (data/):_

```text
PDF oficial de 94 páginas, texto nativo (sin necesidad de OCR), publicado en la sección de transparencia del club. Cuentas anuales CONSOLIDADAS (Grupo Real Madrid, incluye Real Madrid Estadio S.L.U. y Aparcamientos del Santiago Bernabéu S.L.). Transcripción de la cuenta de pérdidas y ganancias + Nota 4 (amortización de jugadores) + deuda/caja en Clubes/España/Real Madrid/informe-economico-2024-2025-cuenta-resultados.md.
```

## Otros

### realmadridPasesData

```text
Mercado de pases / Resultados deportivos / Títulos: NO onboardeados en esta sesión (alcance fue
solo Finanzas, un ejercicio por club). Vacíos a propósito, mismo criterio que Vélez/Instituto (ver
comentario en data/ar/velez-ar-data.js) — `pasesDataForClub`/`resultadosDataForClub`/`titulosDataForClub`
en index.html ya manejan la ausencia de datos con `|| []`/`|| {}` sin romper.
```

### memberCountByClub.realmadrid

```text
no investigado en esta sesión (fuera de alcance: solo Finanzas)
```
