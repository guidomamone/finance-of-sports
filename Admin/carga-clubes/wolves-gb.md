# wolves-gb — evidencia de carga

Lo que había como comentario en `data/gb/wolves-gb-data.js`, movido tal cual por `tools/archivo/mover-comentarios-data.mjs` (la regla:
`Admin/CONVENCIONES-DATOS.md`, "data/<país>/<club>-data.js NO LLEVA COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y
meta. Las notas de cada fila van en una tabla con su número de fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
============================================================================
data/gb/wolves-gb-data.js — Wolverhampton Wanderers Football Club (1986) Limited (clubId
'wolves-gb'), 2 ejercicios: 2023/24 (12 meses, 1° de junio de 2023 a 31 de mayo de 2024) y un
PERÍODO DE TRANSICIÓN DE 13 MESES (1° de junio de 2024 a 30 de junio de 2025, cargado como año
"2025"). Ver el aviso grande más abajo antes de comparar 2025 contra cualquier otro ejercicio.

ENTIDAD LEGAL: "Wolverhampton Wanderers Football Club (1986) Limited", Company Registration No.
01989823 (Companies House, UK). Cuentas INDIVIDUALES de la compañía operativa (inmediatamente
propiedad de W.W. (1990) Limited, dentro del grupo Fosun; no consolida).

Fuente: transcripciones completas en Clubes/Inglaterra/Wolverhampton Wanderers/wolves-full-
accounts-2023-24.md y -2024-25.md.

Cifras en GBP MILLONES nativos (documento en £'000, dividido por 1.000 al cargar). `fxRef`
('GBP@2024-05-31' para 2024, que cierra 31/5; 'GBP@2025-06-30' para 2025, que cierra 30/6 de
verdad tras el cambio de fecha de cierre — ambas entradas YA estaban en FX_CLOSE desde sesiones
anteriores) porque ninguno de los 2 documentos declara un tipo de cambio propio a USD.

============================================================================
AVISO IMPORTANTE — EL EJERCICIO "2025" CUBRE 13 MESES, NO 12 (hallazgo genuino de esta sesión,
anotado también en Admin/dudas-por-club.md):

El PDF de wolves-full-accounts-2024-25.md dice literalmente "FOR THE PERIOD ENDED 30 JUNE 2025" y
"FOR THE 13 MONTH PERIOD ENDED 30 JUNE 2025" en sus notas — la compañía CAMBIÓ su fecha de cierre
de ejercicio de 31 de mayo a 30 de junio, y este documento es el período de TRANSICIÓN (1 de junio
de 2024 a 30 de junio de 2025, 13 meses), no un ejercicio normal de 12. La comparativa que imprime
el propio documento para el período anterior ("12 months to 31 May 2024") coincide EXACTA con los
números ya cargados acá como año 2024 (Turnover 177.697, Profit on disposal 64.631, etc.), así que
no hay conflicto de datos, solo de DURACIÓN del período nuevo.

Se cargó igual (como año "2025", la fecha de cierre más reciente) porque el pedido de esta sesión
era cargar ambos documentos disponibles, y la alternativa —no cargarlo— habría dejado a Wolves con
un solo ejercicio real. PERO: cualquier comparación "año a año" entre 2024 (12 meses) y 2025 (13
meses) de este club va a sobreestimar el crecimiento real (hay un mes extra de ingresos/gastos
metido en 2025) — no se intentó prorratear a 12 meses porque el propio documento no ofrece un
desglose mensual que permita hacerlo con precisión (ver club-data-mapping/referencia/leer-pdf.md, mismo
espíritu: no inventar una reconstrucción sin la granularidad para hacerla bien). Pregunta abierta
para Guido en Admin/dudas-por-club.md: si prefiere marcar este ejercicio con una nota visible de
"13 meses" en el sitio, o dejarlo como está con esta documentación interna.

El `fxRef` de 2025 usa 'GBP@2025-06-30', que SÍ es la cotización exacta del día de cierre real
(30/6/2025) — ya estaba en FX_CLOSE de una sesión anterior, no hizo falta agregar nada nuevo.
============================================================================

CATEGORIZACIÓN DE INGRESOS (Nota 4 "Turnover by class of business" — el documento de 2025
RECLASIFICÓ las categorías, "streamlined turnover classes... comparative amounts have been
reclassified", así que el desglose de 2024 usado acá sale del documento ORIGINAL 2023-24, no de
la comparativa reclasificada de 2025, siguiendo club-data-mapping sección 6.5: usar siempre la
columna "año corriente" del balance de ESE mismo ejercicio):
  2024 (6 líneas, documento original): "Gate receipts" -> matchday_competition; "Sponsorship and
    advertising" -> sponsorship_commercial; "Broadcasting rights" -> broadcasting; "Commercial" ->
    sponsorship_commercial; "League distributions" -> broadcasting (distribuciones centrales de la
    Premier League, en la práctica ingreso de TV/derechos); "Other turnover" -> other_income.
  2025 (4 líneas, documento reclasificado): "Gate receipts" -> matchday_competition; "Sponsorship
    and advertising" -> sponsorship_commercial; "Broadcasting rights" -> broadcasting (ahora
    incluye lo que antes eran 2 líneas separadas, Broadcasting rights + League distributions);
    "Commercial" -> sponsorship_commercial.
  Los 2 años, además: "Other operating income" (línea aparte del cuerpo del P&L; 2024 = nil, 2025
    = £0.324m + £1.100m de "Insurance claims receivable") -> other_income. "Profit on disposal of
    player registrations" (línea NETA, columna "Player trading", después de "Operating loss") ->
    revenueLine con player_sales, mismo criterio que el resto de los clubes ingleses
    (meta.profitOnPlayerSales queda en 0 para no duplicar).

CATEGORIZACIÓN DE GASTOS: el P&L de Wolves SÍ separa 2 columnas ("Operations excluding player
amortisation & trading" / "Player amortisation & trading"), y la Nota 5 "Operating loss" (stated
after charging) permite reconciliar EXACTO qué compone la columna "Player trading": Amortisation
of player's registrations + Provision for impairment of intangible assets (NO incluye
"Amortisation of OTHER intangible assets", que queda en la columna "Operations" — confirmado
sumando: 64.168+3.024=67.192 en 2024, 75.426+12.365=87.791 en 2025, EXACTOS contra el total de la
columna Player trading del P&L).
  - "Wages and salaries" + "Social security costs" + "Pension" (Nota Staff costs, agregado único
    sin desglose plantel/resto) -> wages_squad.
  - "Amortisation of player's registrations" -> player_amortisation.
  - "Provision for impairment of intangible assets" -> player_impairment.
  - "Depreciation of assets" -> depreciation.
  - "Amortisation of other intangible assets" (inmaterial, £67k/£12k) -> other_amortisation.
  - Residual (Operating expenses total de las 2 columnas − wages − amortisation − impairment −
    depreciation − other_amortisation, que incluye operating lease rentals, diferencias de cambio,
    y el resto de costos operativos/administrativos/de partido sin nombre propio) -> other_expenses.

"netInterest" = Interest receivable (Nota 9) − Interest payable (Nota 10). "tax" = 0 los 2 años
(Nota 11, sin cargo). "assetSales"/"profitOnPlayerSales" = 0 (ya en revenueLines).

GROSSDEBT: se excluyó "Amounts owed to group undertakings" (241.462 en 2024, 247.502 en 2025 —
financiamiento intra-grupo Fosun, mismo criterio que Forest/Sunderland/West Ham) y "Other
creditors" relacionados a player trading (deuda comercial por pases, no financiera). Se cargó
"Bank loans" (Notas 16/17/18, deuda bancaria real):
  2024: dentro de 1 año = 0 (nil, confirmado en Nota 18 "Loans"); después de 1 año = 100.609.
    grossDebt = 100.609.
  2025: dentro de 1 año = 21.939; después de 1 año = 79.455. grossDebt = 101.394.
cash = "Cash at bank and in hand" del balance. 2024: no viene legible directo en la transcripción
  del balance (OCR garbled), se derivó por diferencia: Current assets total (168.999) − Debtors
  (138.436) − Stocks (0, "no stock held at year end due to the outsourcing of the retail
  operation", Nota 14) = 30.563 — coincide EXACTO con el "30,563" que sí aparece legible como
  comparativa en el balance del documento 2025 (confirma la derivación). 2025: el balance del
  documento 2025 muestra un fragmento OCR "3 9439" que NO reconcilia contra el total de Current
  assets impreso (235.298) si se lee como 9.439 (faltarían £24.000k) — se leyó como 33.439
  (probable dígito "3" separado del resto por el OCR), que sí reconcilia EXACTO: Debtors (201.859)
  + Cash (33.439) = 235.298 = Current assets impreso, y Net current liabilities (235.298 −
  428.765 = −193.467) coincide EXACTO con el impreso. Ver club-data-mapping sección 6 (cruzar
  contra subtotales impresos antes de cargar un número dudoso).

VERIFICACIÓN (a mano, contra los totales impresos):
  2024: revenueLines suman 242.328 = officialTotalRevenue (Turnover 177.697 + Profit on disposal
    64.631). expenses(wages+other_expenses) + nonCash(amortisation+impairment+depreciation+other_
    amortisation) = -178.831 + (-68.736) = -247.567 = officialTotalExpenses EXACTO (Operating
    expenses total impreso, 2 columnas). + netInterest (-5.639) = -10.878 = officialPAT EXACTO
    ("Loss for the financial year" impreso).
  2025 (13 meses): revenueLines suman 290.383 = officialTotalRevenue (Turnover 171.975 + Other
    operating income 1.424 + Profit on disposal 116.984). expenses+nonCash = -201.360 + (-89.338)
    = -290.698 = officialTotalExpenses EXACTO (Operating expenses total impreso). + netInterest
    (-11.316) = -11.631 = officialPAT EXACTO ("Loss for the financial period" impreso).
Los dos cierran EXACTOS, sin residuo.
============================================================================
```

## 2025

### Ingresos

```text
AVISO: 13 meses (1/6/2024 a 30/6/2025), no 12 — ver aviso de cabecera de este archivo.
```

### Gastos

```text
AVISO: 13 meses (1/6/2024 a 30/6/2025), no 12 — ver aviso de cabecera de este archivo.
```

### Meta

```text
OJO: ejercicio de 13 meses (1/6/2024 a 30/6/2025), NO 12 — ver aviso de cabecera del archivo.
```

## Gestiones

_investigado por un subagente (Sonnet) con fuente por gestión, 2026-10-13; to-do 195:_

```text
Jeff Shi (2016-07-01 a 2025-12-19): Chairman desde la compra por Fosun en julio de 2016 (Express & Star; solo mes: dia 01); el club lo nombró Executive Chairman el 10/6/2017 (wolves.co.uk/news/club/20170611-jeff-shi-appointed-chairman). Salió el 19/12/2025, fecha del comunicado del club que nombra a Nathan Shi interino (https://www.wolves.co.uk/news/club/20251219-appointment-of-interim-executive-chairman/). Dueño: Fosun (empresa), por eso Chairman.
Duda: El Chairman actual es Nathan Shi (interino desde 12/2025, luego permanente según un reporte de mayo 2026); no se cargó porque ningún cierre le corresponde. Si se quiere mostrar la gestión actual, falta fecha y fuente de su confirmación.
```

## 2023

### Ingresos

```text
2023: cargado por tools/cargar.mjs (2026-10-22) desde Clubes/Inglaterra/Wolverhampton Wanderers/wolves-full-accounts-2022-23.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Inglaterra/Wolverhampton Wanderers/wolves-full-accounts-2022-23.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Gate receipts | pág. 29, precedente |
| 2 | Sponsorship and advertising | pág. 29, precedente |
| 3 | Broadcasting rights | pág. 29, precedente |
| 4 | Commercial | pág. 29, precedente |
| 5 | League distributions | pág. 29, precedente |
| 6 | Other turnover | pág. 29, precedente |
| 7 | Other operating income | pág. 20, precedente |
| 8 | Profit on disposal of player registrations | pág. 20, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Operating expenses | pág. 20, precedente |

### Meta

```text
2023: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, caja-deuda --personal 2026-10-22): incluye = wages_squad. caja-deuda.mjs --personal --partir (TODO 351): el costo de personal (141.599, wolves-full-accounts-2022-23.md L1096) es mayor que cada fila global de gasto; el documento reparte los sueldos entre varias funciones y no dice cuánto va en cada una
tools/cargar.mjs (2026-10-22). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
incluidoEn: ajuste manual `incluye`: el documento junta estas categorías con otra línea.
```

## 2022

### Ingresos

```text
2022: cargado por tools/cargar.mjs (2026-10-22) desde Clubes/Inglaterra/Wolverhampton Wanderers/wolves-full-accounts-2021-22.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Inglaterra/Wolverhampton Wanderers/wolves-full-accounts-2021-22.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Gate receipts | pág. 27, precedente |
| 2 | Sponsorship and advertising | pág. 27, precedente |
| 3 | Broadcasting rights | pág. 27, precedente |
| 4 | Commercial | pág. 27, precedente |
| 5 | League distributions | pág. 27, precedente |
| 6 | Other turnover | pág. 27, precedente |
| 7 | Other operating income | pág. 18, precedente |
| 8 | Profit on disposal of player registrations | pág. 18, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Operating expenses | pág. 18, precedente |

### Meta

```text
2022: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, caja-deuda --personal 2026-10-22): incluye = wages_squad. caja-deuda.mjs --personal --partir (TODO 351): el costo de personal (120.216, wolves-full-accounts-2021-22.md L1095) es mayor que cada fila global de gasto; el documento reparte los sueldos entre varias funciones y no dice cuánto va en cada una
tools/cargar.mjs (2026-10-22). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
incluidoEn: ajuste manual `incluye`: el documento junta estas categorías con otra línea.
```

## 2021

### Ingresos

```text
2021: cargado por tools/cargar.mjs (2026-10-22) desde Clubes/Inglaterra/Wolverhampton Wanderers/wolves-full-accounts-2020-21.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Inglaterra/Wolverhampton Wanderers/wolves-full-accounts-2020-21.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Gate receipts | pág. 28, precedente |
| 2 | Sponsorship and advertising | pág. 28, precedente |
| 3 | Broadcasting rights | pág. 28, precedente |
| 4 | Commercial | pág. 28, precedente |
| 5 | League distributions | pág. 28, precedente |
| 6 | Other turnover | pág. 28, precedente |
| 7 | Profit on disposal of player registrations | pág. 18, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Operating expenses | pág. 18, precedente |

### Meta

```text
2021: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, caja-deuda --personal 2026-10-22): incluye = wages_squad. caja-deuda.mjs --personal --partir (TODO 351): el costo de personal (138.776, wolves-full-accounts-2020-21.md L1048) es mayor que cada fila global de gasto; el documento reparte los sueldos entre varias funciones y no dice cuánto va en cada una
tools/cargar.mjs (2026-10-22). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
incluidoEn: ajuste manual `incluye`: el documento junta estas categorías con otra línea.
```

## 2020

### Ingresos

```text
2020: cargado por tools/cargar.mjs (2026-10-22) desde Clubes/Inglaterra/Wolverhampton Wanderers/wolves-full-accounts-2019-20.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Inglaterra/Wolverhampton Wanderers/wolves-full-accounts-2019-20.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Gate receipts | pág. 26, precedente |
| 2 | Sponsorship and advertising | pág. 26, precedente |
| 3 | Broadcasting rights | pág. 26, precedente |
| 4 | Commercial | pág. 26, precedente |
| 5 | League distributions | pág. 26, precedente |
| 6 | Other turnover | pág. 26, precedente |
| 7 | Profit on disposal of player registrations | pág. 16, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Operating expenses | pág. 16, precedente |

### Meta

```text
2020: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, caja-deuda --personal 2026-10-22): incluye = wages_squad. caja-deuda.mjs --personal --partir (TODO 351): el costo de personal (94.251, wolves-full-accounts-2019-20.md L1084) es mayor que cada fila global de gasto; el documento reparte los sueldos entre varias funciones y no dice cuánto va en cada una
tools/cargar.mjs (2026-10-22). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
incluidoEn: ajuste manual `incluye`: el documento junta estas categorías con otra línea.
```

## Fuentes

### wolves-gb-full-accounts-2024

_note (data/):_

```text
PDF con texto nativo, transcripción completa en Clubes/Inglaterra/Wolverhampton Wanderers/wolves-full-accounts-2023-24.md. Propiedad de Fosun International Limited (vía W.W. (1990) Limited). No declara tipo de cambio propio (fxRef apunta a FX_CLOSE).
```

### wolves-gb-full-accounts-2025

_note (data/):_

```text
PDF con texto nativo, transcripción completa en Clubes/Inglaterra/Wolverhampton Wanderers/wolves-full-accounts-2024-25.md. Cash at bank derivado por reconciliación de subtotales (OCR ambiguo, ver comentario de cabecera). fxRef usa GBP@2025-06-30, cotización exacta del día de cierre real.
```

### wolves-gb-full-accounts-2019-20

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-20) desde la transcripción Clubes/Inglaterra/Wolverhampton Wanderers/wolves-full-accounts-2019-20.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### wolves-gb-full-accounts-2020-21

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-20) desde la transcripción Clubes/Inglaterra/Wolverhampton Wanderers/wolves-full-accounts-2020-21.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### wolves-gb-full-accounts-2021-22

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-20) desde la transcripción Clubes/Inglaterra/Wolverhampton Wanderers/wolves-full-accounts-2021-22.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### wolves-gb-full-accounts-2022-23

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-20) desde la transcripción Clubes/Inglaterra/Wolverhampton Wanderers/wolves-full-accounts-2022-23.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

## Otros

### gestionesByClub['wolves-gb']

```text
gestionId 'fosun': los 2 ejercicios cargados confirman a Fosun International Limited/Fosun
International Holdings Limited (Chairman Guo Guangchang, accionista mayoritario último) como
controlante, sin cambio entre 2024 y 2025.
```
