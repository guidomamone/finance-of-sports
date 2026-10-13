# chelsea-gb — evidencia de carga

Lo que había como comentario en `data/chelsea-gb-data.js`, movido tal cual por `tools/mover-comentarios-data.mjs` (la regla:
`Admin/CONVENCIONES-DATOS.md`, "data/<club>-data.js NO LLEVA COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y
meta. Las notas de cada fila van en una tabla con su número de fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
============================================================================
data/chelsea-gb-data.js — Chelsea (Inglaterra, Premier League), clubId 'chelsea-gb'.

Fuente: cuentas consolidadas de Chelsea FC Holdings Limited (Companies House n° 02536231),
único ejercicio disponible: cerrado 30/6/2025 (temporada 2024-25). Transcripción completa en
Clubes/Inglaterra/Chelsea/chelsea-fc-holdings-group-accounts-2024-25.md (3079 líneas, texto
nativo, sin necesidad de OCR).

amountNative en millones de GBP nativos. revenue positivo, expense NEGATIVO. fxRef porque el
documento no declara un tipo de cambio propio.

PROPIEDAD: matriz inmediata Blueco 22 Midco Limited; matriz última Blues Investment Holdings
Parent, L.P. (Cayman Islands), consorcio liderado por Todd Boehly y Clearlake Capital.

OJO — LA VENTA DE LA ACADEMIA FEMENINA (Chelsea FC Women a Blueco 22 Midco, £200m, ganancia de
£198.7m) OCURRIÓ EN EL EJERCICIO 2023-24 (comparativo), NO EN ESTE (2024-25) — el propio
documento lo dice explícito (Nota 12: "recognised in the Group profit or loss account to 30 June
2024"). En el P&L de 2025 esa línea da £0. Lo único de partes vinculadas en este ejercicio es
menor: la venta de Kingsmeadow (antes de Chelsea FC Women) a la propia Chelsea FC Women Limited,
con una PÉRDIDA de £2.985m (no ganancia) dentro de "(Loss)/profit on disposal of fixed assets" ->
campo meta `assetSales`, no revenueLine.

"Cost of sales" (£428.673m) SIN desglose de wages vs. resto en ninguna nota — a diferencia de
Everton/Arsenal, que sí tienen una línea "Staff costs" propia. Se cargó a `wages_squad` completo
(aproximación más fiel al texto narrativo, que dice explícito que el aumento de esta línea es
"principally... increased cost of sales including player wages"), pero es una decisión discutible
— duda anotada en Admin/dudas-por-club.md.

"Amortisation and impairment of players' registrations" es la columna combinada tal cual la
imprime el P&L account (-224.344) — la Nota 6 la desglosa en amortización (213.893) + deterioro
(12.097) = 225.990, un gap de £1.646m (0,7%) no explicado en el documento. Se usó el número del
P&L porque es el único que hace cerrar Gross profit -> Operating loss -> PAT exacto — duda anotada.

GROSSDEBT: Chelsea no tiene ninguna línea "Bank loans"/"Borrowings" en el balance. Lo único
remotamente "deuda" son trade creditors por pases de jugadores a pagar (£396.135m) y "amounts
owed to group undertakings" (£0 al cierre 2025). Se usa `grossDebt:0` (criterio estricto de
excluir trade creditors, club-data-mapping/referencia/formato-simplificado.md) — duda anotada sobre si conviene el
tratamiento alternativo (tratar transfer fees payable como deuda económica real).
============================================================================
```

## 2025

### Ingresos

```text
Ejercicio 2025. Fuente: Nota "Turnover" + P&L (Profit on disposal of player registrations).
Total Turnover impreso = 490.857. Con player_sales, total = 549.263 = officialTotalRevenue.
```

### Gastos

```text
Ejercicio 2025. Fuente: P&L account + Nota 5 "Impairment and other expenses" + Nota 6
"Operating loss". Suma = -799.514 (con exceptional_items) = -749.314 (sin, que es lo que compara
el motor) + -50.200 de exceptional_items.
```

### Meta

```text
assetSales = "(Loss)/profit on disposal of fixed assets" (venta de Kingsmeadow a Chelsea FC
Women Limited, related party). netInterest = interest receivable (11.149) - interest payable
(20.357). tax = Nota 13, "Total tax charge".
officialTotalExpenses EXCLUYE exceptional_items (-50.200), mismo criterio que el resto del
sitio desde Botafogo (el motor no los cuenta en verifyTieOuts() de Expenses, sino que llegan
al PAT por otro camino) — el total CON exceptionales que imprime el documento es £799,514m.
```

## Gestiones

_antes de Todd Boehly (data/gestiones/gb.js):_

```text
Boehly dejó la presidencia al vender su parte a Clearlake (anuncio del 16/9/2026). Desde entonces no se carga a nadie (Clearlake es un fondo).
```
