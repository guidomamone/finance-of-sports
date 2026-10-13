# dortmund-de — evidencia de carga

Lo que había como comentario en `data/de/dortmund-de-data.js`, movido tal cual por `tools/archivo/mover-comentarios-data.mjs` (la regla:
`Admin/CONVENCIONES-DATOS.md`, "data/<país>/<club>-data.js NO LLEVA COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y
meta. Las notas de cada fila van en una tabla con su número de fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
============================================================================
data/de/dortmund-de-data.js — Borussia Dortmund GmbH & Co. KGaA (Alemania, Bundesliga).

2 ejercicios REALES (2023/24, 2024/25), fuente: el Annual Report (Geschäftsbericht) oficial del
club, en INGLÉS (BVB lo publica bilingüe/solo en inglés para el inversor internacional — BVB
cotiza en bolsa, Frankfurt Stock Exchange). Incluye tanto las "ANNUAL FINANCIAL STATEMENTS"
(HGB, entidad KGaA standalone, auditadas por EY) como los "CONSOLIDATED FINANCIAL STATEMENTS"
(IFRS, Grupo). Transcripciones completas en Clubes/Alemania/Borussia Dortmund/
geschaeftsbericht-<ejercicio>.md (contienen ambos ejercicios como comparativo, ya que el reporte
de 2024/25 imprime 2023/24 en su columna comparativa completa — se usó esa columna para 2023/24
en vez de abrir el reporte de 2023/24 aparte, válido porque son cuentas HGB nominales en EUR, sin
reexpresión por inflación entre ejercicios — ver club-data-mapping SKILL.md sección 6.5, esa regla
aplica a RT6/moneda homogénea argentina, no a HGB alemán).

NIVEL DE CUENTAS ELEGIDO: HGB KGaA standalone ("ANNUAL FINANCIAL STATEMENTS"), NO el IFRS Group
consolidado — mismo criterio que el resto de los clubes alemanes ya cargados (Köln, Eintracht
Frankfurt, Werder Bremen, Augsburg, todos HGB). El reporte de BVB da AMBOS niveles con desglose
completo (a diferencia de Bayern Munich, que solo desglosa el Einzelabschluss), así que se eligió
HGB por consistencia con el resto del país, no por falta de alternativa. officialTotalRevenue/
Expenses/PAT son los de la KGaA HGB (528,663 / 562,410 miles € de "Sales", no los 526,019 / 509,110
del "Consolidated revenue" IFRS del Grupo — cifras DISTINTAS a propósito, ver el propio reporte).

Ingresos ("Sales" nota, ANNUAL FINANCIAL STATEMENTS, pág. 215-216 del reporte 2024/25): Match
operations (matchday_competition), Advertising (sponsorship_commercial), TV marketing
(broadcasting), Transfer deals (player_sales, INGRESO bruto de transferencias — ver sección 3 de
club-data-mapping, BVB no netea, reporta el ingreso bruto de "Transfer deals" separado del gasto
"Transfer deals" del lado de gastos), Conference/catering/miscellaneous (other_income). Más
"Other operating income" (other_income), línea de P&L separada de "Sales" (ver GuV completa,
pág. 201). officialTotalRevenue = Sales + Other operating income (mismo criterio que Werder
Bremen: "Sonstige betriebliche Erträge" SÍ cuenta como revenue).

Gastos: Personnel expenses (nota por segmento, pág. 217): Match operations=plantel profesional
(wages_squad), Retail and administration (admin_general_expense), Amateur and youth football
(youth_other_sports_expense) — separación POR SEGMENTO disponible en la fuente, mismo patrón que
Vélez Sarsfield (club-data-mapping/referencia/formato-simplificado.md). Amortisation/depreciation (pág. 217-218): la
porción de "player registrations" (amortización + write-downs) es player_amortisation, el resto
(tangible fixed assets) es depreciation. Other operating expenses (nota, pág. 218): Match
operations (match_organisation_expense), Advertising (admin_general_expense, costo comercial/
agencia, no organización de partidos), Transfer deals (player_amortisation, GASTO bruto de
transferencias — comisiones + carrying amounts de jugadores vendidos, sin netear contra el
ingreso, mismo criterio de "reflejá como lo presenta el club" de la sección 3 del skill), Retail
(admin_general_expense), Administration (admin_general_expense), Other (other_expenses).

netInterest/tax: el "Financial result" del HGB (pág. 219-220) es la suma de 3 líneas de P&L
consecutivas — "Income from profit and loss transfer agreements" (ganancias de subsidiarias con
Ergebnisabführungsvertrag: BVB Stadionmanagement, besttravel Dortmund, BVB Merchandising, BVB
Event & Catering, BVB Fußballakademie), "Other interest and similar income" y "Interest and
similar expenses" — las 3 forman el Finanzergebnis en la estructura HGB estándar (§275 HGB),
mismo criterio de club-data-mapping sección 2 (resultado financiero, nunca una línea de
revenue/expense) — van juntas a netInterest, NO como revenueLine, aunque la primera técnicamente
sea "ingreso" de subsidiarias, porque el documento la ubica en la sección de resultado financiero,
no en Sales/Other operating income. tax = Taxes on income + Other taxes (2 líneas separadas del
GuV, sumadas). El total (revenue+expenses+netInterest+tax) cierra EXACTO contra "Net income for
the year" impreso, sin redondeo — ver club-data-mapping SKILL.md sección 6.2.

Moneda: EUR. Ningún ejercicio declara TC propio a USD → fxRef contra FX_CLOSE
(data/currency-map.js): 'EUR@2024-06-30' y 'EUR@2025-06-30' YA EXISTEN.

gestionId: 'actual' en los 2 ejercicios — Hans-Joachim Watzke es Chairman de la Geschäftsführung
(management board del general partner) en los 2, sin cambio.
============================================================================
```

## 2025

### Ingresos

```text
Ejercicio 2025 (01.07.2024-30.06.2025). Fuente: geschaeftsbericht-2024-25.md, pág. 215-216 (año corriente).
```

### Meta

```text
Financial result = 14.334 + 1.974 - 3.954 = 12.354 (documento redondea a 12.355). tax = -2.929 - 0.410.
```

## 2024

### Ingresos

```text
Ejercicio 2024 (01.07.2023-30.06.2024). Fuente: geschaeftsbericht-2024-25.md, columna comparativa
"2023/2024" de la nota "Sales" (pág. 215) y de "Other operating income" (pág. 216).
```

### Meta

```text
Financial result HGB = Income from p&l transfer agreements (17.570) + Other interest income
(2.686) - Interest expenses (5.756) = 14.500. tax = Taxes on income (-4.319) + Other taxes (-0.243).
```

## Gestiones

_antes de Hans-Joachim Watzke (data/gestiones/de.js):_

```text
Watzke: Vorsitzender der Geschäftsführung desde 2005 (solo año en la fuente, 1/1 aproximado); dejó el cargo al ser elegido presidente del e.V. el 23/11/2025.
```

## Fuentes

### dortmund-de-geschaeftsbericht-2024

_note (data/):_

```text
Reporte anual oficial de BVB (cotiza en la Bolsa de Frankfurt), en inglés, auditado por EY GmbH & Co. KG. Cifras de este ejercicio tomadas de la columna comparativa "2023/2024" del reporte 2024/2025 (mismo documento fuente, ver comentario de cabecera de dortmund-de-data.js). Transcripción completa en Clubes/Alemania/Borussia Dortmund/geschaeftsbericht-2024-25.md (244 páginas).
```

### dortmund-de-geschaeftsbericht-2025

_note (data/):_

```text
Reporte anual oficial de BVB, en inglés, auditado por EY GmbH & Co. KG. Transcripción completa en Clubes/Alemania/Borussia Dortmund/geschaeftsbericht-2024-25.md (244 páginas).
```
