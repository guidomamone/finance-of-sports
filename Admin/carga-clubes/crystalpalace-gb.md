# crystalpalace-gb — evidencia de carga

Lo que había como comentario en `data/gb/crystalpalace-gb-data.js`, movido tal cual por `tools/mover-comentarios-data.mjs` (la regla:
`Admin/CONVENCIONES-DATOS.md`, "data/<país>/<club>-data.js NO LLEVA COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y
meta. Las notas de cada fila van en una tabla con su número de fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
============================================================================
data/gb/crystalpalace-gb-data.js — Crystal Palace (Inglaterra, Premier League), clubId
'crystalpalace-gb'.

Fuente: cuentas CONSOLIDADAS del grupo de CPFC 2010 Limited (Companies House n° 07206409),
auditadas por RSM UK Audit LLP, depositadas en Companies House UK. 2 ejercicios, ambos cerrados
el 30 de junio:
  2024: "...for the Year Ended 30 June 2024" (temporada 2023-24, terminó 10°).
        Transcripción: Clubes/Inglaterra/Crystal Palace/cpfc2010-group-accounts-2023-24.md
  2025: "...for the Year Ended 30 June 2025" (temporada 2024-25, terminó 12°, ganó la FA Cup —
        primer título mayor de la historia del club). Transcripción:
        Clubes/Inglaterra/Crystal Palace/cpfc2010-group-accounts-2024-25.md

amountNative en millones de GBP nativos. revenue positivo, expense NEGATIVO. El documento no
declara ningún tipo de cambio propio (todo en GBP nativo) -> fxRef, no fx literal.

"Gate receipts" mezcla ticket sales por partido + "membership income" + preseason tickets en una
sola línea (misma redacción que Everton) — no hay forma de aislar un componente tipo
`season_tickets`, se carga entera como `matchday_competition`.

"Other income" 2025 incluye explícito £4.4m de prize money por FA Cup, mezclado con
alquileres/comisiones comerciales sin línea propia — queda en `other_income` (no
`competition_bonus`), criterio conservador de no forzar una separación que el dato no permite.

"Staff costs" (Nota 6) es una cifra agregada sin desglose por departamento, se carga entera a
`wages_squad`, mismo criterio que el resto de los clubes ingleses.

PROPIEDAD: Steve Parish (Chairman) + David Blitzer/Josh Harris (minoritarios) + John Textor
(Eagle Football Holdings, accionista mayoritario) en los 2 ejercicios. La venta de la
participación de Textor a Woody Johnson se firmó el 23/6/2025 pero completó el 24/7/2025,
DESPUÉS del cierre del ejercicio 2025 (30/6/2025) — los 2 ejercicios cargados quedan bajo el
mismo grupo de control.

brandColor: NO resuelto (ver Admin/dudas-por-club.md) — camiseta a franjas rojo/azul desde 1973,
sin predominancia declarada por ninguna fuente consultada, mismo caso que Levante. `null` hasta
que Guido decida.
============================================================================
```

## 2025

### Ingresos

```text
Ejercicio 2025. Suma turnover = 196.623. Con player_sales = 262.701 = officialTotalRevenue.
```

### Gastos

```text
Ejercicio 2025. Suma = -239.147 = officialTotalExpenses.
```

### Meta

```text
grossDebt = Nota 2: Finance leases 1.795 + Advances under funding agreement 63.543 + Bank
loans 30.097 + Loans from parent company 26.483 = 121.918.
2025 tuvo PÉRDIDA en disposal de plant & machinery (no ganancia): -0.161. netInterest =
interest receivable (1.794) - interest payable (16.707) - foreign exchange losses (0.215).
```

## 2024

### Ingresos

```text
Ejercicio 2024. Fuente: Nota 3 "Turnover" + P&L (Profit on disposal of players' registrations).
Suma turnover (5 líneas) = 190.224 = Turnover impreso. Con player_sales = 191.565 = officialTotalRevenue.
```

### Gastos

```text
Ejercicio 2024. Fuente: Nota 4 "Operating expenses" + Nota 6 "Employees". Suma = -210.942 =
"Total operating expenses" impreso = officialTotalExpenses.
```

### Meta

```text
grossDebt = Nota 2 "Analysis of changes in net debt": Finance leases 1.458 + Advances under
funding agreement 48.052 + Bank loans 31.879 + Loans from parent company 76.516 = 157.905
(coincide exacto con el "Total" debt de esa nota). cash = "Cash at bank and in hand".
assetSales = "Profit on disposal of plant & machinery". netInterest = interest receivable
(0.593) - interest payable (14.606) + foreign exchange gains/(losses) (0.452).
```

## Gestiones

_antes de Steve Parish (data/gestiones/gb.js):_

```text
El club sale de la administración en junio de 2010 (día 01 aproximado). Parish es chairman y cabeza del consorcio; Textor (2021-2025) y Blitzer/Harris fueron socios.
```

## Fuentes

### crystalpalace-gb-group-accounts-2024

_note (data/):_

```text
Cuentas consolidadas del grupo, auditadas por RSM UK Audit LLP, depositadas en Companies House (Reino Unido). Transcripción completa en Clubes/Inglaterra/Crystal Palace/cpfc2010-group-accounts-2023-24.md. Ver comentario de cabecera de data/gb/crystalpalace-gb-data.js.
```

### crystalpalace-gb-group-accounts-2025

_note (data/):_

```text
Transcripción completa en Clubes/Inglaterra/Crystal Palace/cpfc2010-group-accounts-2024-25.md. La venta de la participación mayoritaria de John Textor (Eagle Football Holdings) a Woody Johnson completó el 24/7/2025, después del cierre de este ejercicio.
```
