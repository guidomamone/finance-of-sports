# newcastle-gb — evidencia de carga

Lo que había como comentario en `data/newcastle-gb-data.js`, movido tal cual por `tools/mover-comentarios-data.mjs` (la regla:
`Admin/CONVENCIONES-DATOS.md`, "data/<club>-data.js NO LLEVA COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y
meta. Las notas de cada fila van en una tabla con su número de fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
============================================================================
data/newcastle-gb-data.js — Newcastle United (Inglaterra, Premier League), clubId 'newcastle-gb'.

Fuente: cuentas CONSOLIDADAS del grupo de Newcastle United Limited (Companies House n° 02529667),
depositadas en Companies House UK. Ejercicio cerrado el 30 de junio de 2025 (temporada 2024/25),
único ejercicio con transcripción disponible. Transcripción completa en
Clubes/Inglaterra/Newcastle United/newcastle-united-group-accounts-2024-25.md.

amountNative en millones de GBP nativos. revenue positivo, expense NEGATIVO, mismo criterio que
river-data.js/racing-data.js/everton-gb-data.js.

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
