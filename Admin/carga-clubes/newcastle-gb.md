# newcastle-gb — evidencia de carga

Lo que había como comentario en `data/gb/newcastle-gb-data.js`, movido tal cual por `tools/archivo/mover-comentarios-data.mjs` (la regla:
`Admin/CONVENCIONES-DATOS.md`, "data/<país>/<club>-data.js NO LLEVA COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y
meta. Las notas de cada fila van en una tabla con su número de fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
============================================================================
data/gb/newcastle-gb-data.js — Newcastle United (Inglaterra, Premier League), clubId 'newcastle-gb'.

Fuente: cuentas CONSOLIDADAS del grupo de Newcastle United Limited (Companies House n° 02529667),
depositadas en Companies House UK. Ejercicio cerrado el 30 de junio de 2025 (temporada 2024/25),
único ejercicio con transcripción disponible. Transcripción completa en
Clubes/Inglaterra/Newcastle United/newcastle-united-group-accounts-2024-25.md.

amountNative en millones de GBP nativos. revenue positivo, expense NEGATIVO, mismo criterio que
river-ar-data.js/racing-ar-data.js/everton-gb-data.js.

"Matchday": el propio documento (Nota 2.4, política contable) define este stream como "Season
ticket and corporate hospitality revenue" + "Season and matchday tickets and corporate hospitality
income" (Nota 4) — NO separa abonos/season tickets de entradas partido a partido ni de hospitality.
Se carga entera a matchday_competition (criterio de "no forzar una separación que el dato no
permite"). No afecta el total de la fila "Estadio" de Formato Simplificado (matchday_competition +
season_tickets + stadium_other comparten esa fila).

"UEFA" en $0: el club no participó en competencias UEFA en 2024-25 (pese a clasificar para la
UCL 2025-26 por el 5° puesto). Se carga en $0 porque el documento la lista como stream propio de
Turnover (Nota 4), igual que otros clubes muestran filas en $0 cuando no hubo esa actividad ese año.

GANANCIA POR VENTA DE JUGADORES: "Profit on disposal of players' and staff registrations" es una
línea NETA del P&L (no bruto ingreso/costo separado) — se suma al revenue total, mismo criterio
que Everton/Arsenal.

STAFF COSTS: "Staff costs" (Nota 7) es una cifra agregada sin desglose por departamento — toda la
línea se carga a `wages_squad` completa, mismo criterio que el resto de los clubes ingleses.

"Other operating expenses" NO tiene una línea impresa con este monto exacto en ningún lado del
documento (el Strategic Report la redondea a £93.2m); se calculó como residuo exacto:
344.881 (Operating expenses before amortisation & impairment, P&L) - 243.477 (Staff costs) -
8.182 (Depreciation) = 93.222, que reconcilia EXACTO contra el "Total operating expenses" impreso.

GROSSDEBT: "Term loan" (Nota 16/17, Borrowings: dentro de 1 año 58.314 + más de 1 año 0 = 58.314),
EXCLUYE trade creditors/transfer fees payable/accruals — coincide EXACTO con la propia Nota "Net
debt reconciliation" del documento. cash = "Cash at bank and in hand" (balance consolidado).

ASSETSALES: 4.158 (Profit on disposal of subsidiary, Nota 14 — venta de Newcastle United Football
Club Projects Ltd a PZ Holdings Ltd, subsidiaria hermana de la matriz inmediata PZ Newco Ltd) +
128.975 (Profit on disposal of tangible fixed assets, Nota 13 — sale-and-leaseback de mejoras del
leasehold de St James' Park, TAMBIÉN a PZ Holdings Ltd). Las dos son reorganizaciones societarias
intra-grupo (no venta de jugadores, no CAPEX), mismo criterio que Everton (venta de Everton FC
Women/Goodison Park a la matriz Roundhouse). OJO: la Nota 3 del documento dice explícitamente que
la valuación de mercado de la Premier League para el sale-and-leaseback (£172.1m) está sujeta a
revisión, y que un ajuste retroactivo podría cambiar esta cifra en las cuentas 2025-26 — ver
Admin/dudas-por-club.md.

PROPIEDAD: el documento solo dice "the ultimate parent undertaking and ultimate controlling party
is the Public Investment Fund" (inmediata: PZ Newco Limited), sin dar porcentajes. Amanda Staveley
renunció al directorio y desinvirtió su participación en julio de 2024 (dentro de este ejercicio).
Según prensa (no confirmado contra el registro PSC de Companies House, ver duda): PIF ~85%, Reuben
Brothers (RB Sports & Media) ~15% tras esa salida.
============================================================================
```

_de data/clubs.js:_

```text
5 clubes ingleses más (onboarding 2026-09-25, mismo pool de PDF transcriptos). brandColor
verificado contra footylogos.com/chelseafc.com, salvo Crystal Palace (ver duda en
Admin/dudas-por-club.md: franjas rojo/azul desde 1973, sin predominancia declarada, mismo caso
que Levante) y Fulham (camiseta blanca, mismo bucket que River/Vélez/Sevilla/Real Madrid).
```

_de data/club-leagues/gb.js:_

```text
5 clubes más: Newcastle, Crystal Palace, Fulham y Chelsea jugaron Premier League en todos sus
ejercicios cargados (confirmado en el propio documento de cada uno). Leeds es la excepción:
Championship los 2 ejercicios cargados (2023-24 y 2024-25), ascendió a Premier League recién
para la temporada 2025-26 (no cargada), confirmado con WebSearch y en el propio documento
("would remain in the Championship for the 2024/25 season").
```

## 2025

### Ingresos

```text
Ejercicio 2025 (cerrado 30/6/2025). Fuente: Nota 4 "Turnover" + P&L account (Profit on disposal
of players' and staff registrations). Suma exacta a £355.197m (335.322 de Turnover + 19.875 de
profit on player trading).
```

### Gastos

```text
Ejercicio 2025. Fuente: Nota 7 "Employees" (staff costs), Strategic Report "Financial overview"
y Nota 12/5 (Amortisation/Impairment of players' registrations). Suma exacta a -£444.749m =
officialTotalExpenses (sin exceptional_items, este ejercicio no tuvo ninguno).
```

## Gestiones

_investigado por un subagente (Sonnet) con fuente por gestión, 2026-10-13; to-do 195:_

```text
Yasir Al-Rumayyan (2021-10-07 a hoy): Non-Executive Chairman desde el cierre de la compra el 7/10/2021 (comunicado del PIF). Wikipedia en inglés dice 19/11/2021: se usó la fecha del comunicado. Dueño: PIF (Estado saudí) con PCP y RB Sports, por eso Chairman. Sigue en 2026 según prensa.
Duda: Discrepancia de fecha entre PIF (7/10/2021) y Wikipedia (19/11/2021).
```

## 2024

### Ingresos

```text
2024: cargado por tools/cargar.mjs (2026-10-20) desde Clubes/Inglaterra/Newcastle United/newcastle-group-accounts-2023-24.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Inglaterra/Newcastle United/newcastle-group-accounts-2023-24.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Matchday | pág. 35, precedente |
| 2 | Media | pág. 35, precedente |
| 3 | UEFA | pág. 35, precedente |
| 4 | Commercial | pág. 35, precedente |
| 5 | Other income | pág. 35, precedente |
| 6 | Profit on disposal of players' and staff registrations | pág. 18, precedente |
| 7 | Profit on disposal of tangible fixed assets | pág. 18, Jev 1 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Operating expenses before amortisation and impairment | pág. 18, Jev 0.97 |
| 2 | Amortisation of intangible assets | pág. 35, Jev 0.98 |
| 3 | Impairment of intangible assets | pág. 35, Jev 0.99 |

### Meta

```text
tools/cargar.mjs (2026-10-20). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
tools/cargar.mjs (2026-10-20): gb-premierleague, verificado contra roster cacheado de "2023–24 Premier League" (tools/club-league-reference/gb.json), coincidencia exacta "Newcastle United".
```

## 2023

### Ingresos

```text
2023: cargado por tools/cargar.mjs (2026-10-20) desde Clubes/Inglaterra/Newcastle United/newcastle-group-accounts-2022-23.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Inglaterra/Newcastle United/newcastle-group-accounts-2022-23.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Matchday | pág. 33, precedente |
| 2 | Media | pág. 33, precedente |
| 3 | Commercial | pág. 33, precedente |
| 4 | Other income | pág. 33, precedente |
| 5 | Profit on disposal of players' registrations | pág. 17, Jev 0.99 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Operating expenses before amortisation and impairment | pág. 17, Jev 0.97 |
| 2 | Amortisation and impairment of players' registrations | pág. 17, Jev 0.97 |

### Meta

```text
tools/cargar.mjs (2026-10-20). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
tools/cargar.mjs (2026-10-20): gb-premierleague, verificado contra roster cacheado de "2022–23 Premier League" (tools/club-league-reference/gb.json), coincidencia exacta "Newcastle United".
```

## 2022

### Ingresos

```text
2022: cargado por tools/cargar.mjs (2026-10-22) desde Clubes/Inglaterra/Newcastle United/newcastle-group-accounts-2021-22.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Inglaterra/Newcastle United/newcastle-group-accounts-2021-22.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Matchday | pág. 33, precedente |
| 2 | Media | pág. 33, precedente |
| 3 | Commercial | pág. 33, precedente |
| 4 | Other income | pág. 33, precedente |
| 5 | Profit on disposal of players' registrations | pág. 17, Jev 0.99 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Operating expenses before amortisation and impairment | pág. 17, Jev 0.97 |
| 2 | Amortisation of intangible assets | pág. 33, Jev 0.98 |
| 3 | Impairment of intangible assets | pág. 33, Jev 0.99 |

### Meta

```text
2022: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, caja-deuda --personal 2026-10-22): incluye = wages_squad. caja-deuda.mjs --personal --partir (TODO 351): el costo de personal (170.204, newcastle-group-accounts-2021-22.md L1309) es mayor que cada fila global de gasto; el documento reparte los sueldos entre varias funciones y no dice cuánto va en cada una
tools/cargar.mjs (2026-10-22). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
incluidoEn: ajuste manual `incluye`: el documento junta estas categorías con otra línea.
```

## 2021

### Ingresos

```text
2021: cargado por tools/cargar.mjs (2026-10-22) desde Clubes/Inglaterra/Newcastle United/newcastle-group-accounts-2020-21.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Inglaterra/Newcastle United/newcastle-group-accounts-2020-21.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Matchday | pág. 27, precedente |
| 2 | Media | pág. 27, precedente |
| 3 | Commercial | pág. 27, precedente |
| 4 | Other income | pág. 27, precedente |
| 5 | Profit on disposal of players' registrations | pág. 14, Jev 0.99 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Operating expenses before amortisation and impairment | pág. 14, Jev 0.97 |
| 2 | Amortisation and impairment of players' registrations | pág. 14, Jev 0.97 |

### Meta

```text
2021: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-20): cierre = 2021-06-30. 11 meses del 1-08-2020 al 30-06-2021 (cambio de cierre de julio a junio); contiguo con el ejercicio de 13 meses al 31-07-2020 ya cargado
2021: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, caja-deuda --personal 2026-10-22): incluye = wages_squad. caja-deuda.mjs --personal --partir (TODO 351): el costo de personal (106.829, newcastle-group-accounts-2020-21.md L1360) es mayor que cada fila global de gasto; el documento reparte los sueldos entre varias funciones y no dice cuánto va en cada una
tools/cargar.mjs (2026-10-22). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
incluidoEn: ajuste manual `incluye`: el documento junta estas categorías con otra línea.
```

## 2020

### Ingresos

```text
2020: cargado por tools/cargar.mjs (2026-10-22) desde Clubes/Inglaterra/Newcastle United/newcastle-group-accounts-2019-20.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Inglaterra/Newcastle United/newcastle-group-accounts-2019-20.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Matchday | pág. 27, precedente |
| 2 | Media | pág. 27, precedente |
| 3 | Commercial | pág. 27, precedente |
| 4 | Other income | pág. 27, precedente |
| 5 | Profit on disposal of players' registrations | pág. 15, Jev 0.99 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Operating expenses | pág. 15, precedente |
| 2 | Amortisation and impairment of players' registrations | pág. 15, Jev 0.97 |

### Meta

```text
2020: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, caja-deuda --personal 2026-10-22): incluye = wages_squad. caja-deuda.mjs --personal --partir (TODO 351): el costo de personal (121.146, newcastle-group-accounts-2019-20.md L1067) es mayor que cada fila global de gasto; el documento reparte los sueldos entre varias funciones y no dice cuánto va en cada una
tools/cargar.mjs (2026-10-22). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
incluidoEn: ajuste manual `incluye`: el documento junta estas categorías con otra línea.
```

## 2019

### Ingresos

```text
2019: cargado por tools/cargar.mjs (2026-10-20) desde Clubes/Inglaterra/Newcastle United/newcastle-group-accounts-2018-19.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Inglaterra/Newcastle United/newcastle-group-accounts-2018-19.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Matchday | pág. 25, precedente |
| 2 | Media | pág. 25, precedente |
| 3 | Commercial | pág. 25, precedente |
| 4 | Other income | pág. 25, precedente |
| 5 | Profit on disposal of players' and staff registrations | pág. 12, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Operating expenses | pág. 12, precedente |
| 2 | Amortisation and impairment of players' registrations | pág. 12, precedente |

### Meta

```text
tools/cargar.mjs (2026-10-20). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
tools/cargar.mjs (2026-10-20): gb-premierleague, verificado contra roster cacheado de "2018–19 Premier League" (tools/club-league-reference/gb.json), coincidencia exacta "Newcastle United".
```

## Fuentes

### newcastle-gb-group-accounts-2025

_note (data/):_

```text
Transcripción completa en Clubes/Inglaterra/Newcastle United/newcastle-united-group-accounts-2024-25.md. Amanda Staveley renunció al directorio y desinvirtió su participación en julio de 2024. Ver comentario de cabecera de data/gb/newcastle-gb-data.js para el detalle completo de categorización.
```

### newcastle-gb-group-accounts-2021-22

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-20) desde la transcripción Clubes/Inglaterra/Newcastle United/newcastle-group-accounts-2021-22.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.
```

### newcastle-gb-group-accounts-2022-23

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-20) desde la transcripción Clubes/Inglaterra/Newcastle United/newcastle-group-accounts-2022-23.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.
```

### newcastle-gb-group-accounts-2023-24

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-20) desde la transcripción Clubes/Inglaterra/Newcastle United/newcastle-group-accounts-2023-24.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.
```

### newcastle-gb-group-accounts-2019-20

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-20) desde la transcripción Clubes/Inglaterra/Newcastle United/newcastle-group-accounts-2019-20.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.
```

### newcastle-gb-group-accounts-2018-19

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-20) desde la transcripción Clubes/Inglaterra/Newcastle United/newcastle-group-accounts-2018-19.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.
```

### newcastle-gb-group-accounts-2020-21

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-20) desde la transcripción Clubes/Inglaterra/Newcastle United/newcastle-group-accounts-2020-21.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.
```

## Gestiones (Finanzas 5, 2026-10-19)

- Mike Ashley, Dueño, 2007-06-15 (superó el 75 %: primera compra el 2007-05-23, resto en julio) a 2021-10-07 (venta a PIF). No fue Chairman (puso a Chris Mort). Cubre el cierre 2021-06-30.
