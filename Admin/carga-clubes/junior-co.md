# junior-co — evidencia de carga

Lo que había como comentario en `data/junior-co-data.js`, movido tal cual por `tools/mover-comentarios-data.mjs` (la regla:
`Admin/CONVENCIONES-DATOS.md`, "data/<club>-data.js NO LLEVA COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y
meta. Las notas de cada fila van en una tabla con su número de fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
============================================================================
data/junior-co-data.js — Club Deportivo Popular Junior F.C. S.A.
(Barranquilla, Colombia). clubId lleva el país al final (`junior-co`) por
la convención de Admin/CONVENCIONES.md — "Junior" es un nombre que se
repite entre países/clubes. Ejercicio 2025 = REAL, único ejercicio cargado
a propósito (mismo criterio que Envigado/Once Caldas).

FUENTE: `Clubes/Colombia/Junior de Barranquilla/estados-financieros-2025.pdf`
(38 páginas, "Notas a los Estados Financieros por los años terminados el
31 de diciembre de 2025 y 2024"), texto nativo vía pdftotext -layout,
transcripción completa en `estados-financieros-2025.md` en la misma
carpeta. Bajado vía SIIS (siis.ia.supersociedades.gov.co, NIT 900456729),
ver `fuentes/Colombia/Junior de Barranquilla.md`.

Cifras del documento "expresadas en miles de pesos colombianos" (confirmado
en el encabezado de página). Acá se guardan divididas por 1.000, en
MILLONES de pesos colombianos (COP).

REVENUE = Nota 17 "Ingresos Operacionales" (10 líneas, suma EXACTA a
$50.430.085 M, coincide con la vista SIIS) + el bloque "Otros ingresos no
operacionales" de la Nota 21 (9 líneas, suma EXACTA a $43.833.994 M — la
línea "Diferencia en cambio, neto" de esta nota da $0 en 2025, así que no
hay nada que mover a netInterest del lado de ingresos este ejercicio).
officialTotalRevenue = 50.430.085 + 43.833.994 = 94.264.079.

EXPENSES: Nota 18 "Costo de Venta" ($2.623.441 M, mercadeo/publicidad +
artículos deportivos + abonados + boletería), Nota 19 "Gastos
Operacionales" (sección "De Administración" $2.735.138 M + sección "De
Ventas" $80.878.340 M = $83.613.478 M, el plantel profesional vive en "De
Ventas"), y el bloque "Otros gastos no operacionales" de la Nota 21 SIN su
línea "Diferencia en cambio, neto" ($633.987 M de $3.334.214 M impresos —
los $2.700.227 M de diferencia en cambio se movieron a netInterest, ver
abajo). officialTotalExpenses = 2.623.441+83.613.478+633.987 = 86.870.906.

netInterest = Nota 20 "Ingresos (Gastos) Financieros, neto" (Ingresos por
intereses 36.011 - Gastos por intereses 877.273 = -841.262, EXACTO igual al
total impreso) + la línea "Diferencia en cambio, neto" del bloque "Otros
gastos no operacionales" de la Nota 21 (-2.700.227, movida acá siguiendo la
regla de club-data-mapping SKILL.md sección 2: diferencias de cambio NUNCA
van como línea de ingreso/gasto, van netas a este campo, aunque el
documento las muestre en una nota distinta de la de "financieros"). Total
netInterest = -841.262 + -2.700.227 = -3.541.489. Esto no mueve el
resultado final (solo reclasifica de dónde sale la plata dentro del
pretax): Revenue-Expenses+netInterest = 94.264.079-86.870.906-3.541.489 =
3.851.684, EXACTO igual a la "Utilidad (Pérdida) antes de provisión para
impuesto sobre la renta" que imprime la Nota de Impuesto de Renta.

tax: la Nota de "Provisión para el impuesto sobre la renta" imprime
LITERALMENTE "Impuesto sobre la renta corriente: 244.906" + "Impuesto sobre
la renta diferido: 2.390.585" = "2.635.491" (gasto total) para 2025, y la
misma nota confirma "Utilidad (Pérdida) antes de provisión para impuesto
sobre la renta: 3.851.683" — EXACTO igual a la reconciliación de arriba
(diferencia de $1 mil por redondeo). PAT = 3.851.683 - 2.635.491 = 1.216.192
≈ vista SIIS ($1.216.193 M, se usa este último como officialPAT).
============================================================================
```

## 2025

### Ingresos

_antes de la fila 11 (`Utilidad en venta de derechos deportivos, neto`):_

```text
Promovida a línea propia (Versión de esta sesión, corrigiendo un hallazgo de
node tools/audit.js: catch-all dominante): "Utilidad en venta derechos deportivos, neto" es
categoría real distinta (player_sales) del resto del catch-all "Otros ingresos no
operacionales", ver club-data-mapping SKILL.md sección 1.
```

### Gastos

_antes de la fila 2 (`Gastos Operacionales de Administración (personal, impuestos, honorarios, servicios, mantenimiento, viajes, legales, contribuciones, seguros)`):_

```text
Nota 19 "Gastos Operacionales: De Administración" ($2.735.138 M impreso):
```

_antes de la fila 5 (`Gastos Operacionales de Ventas: Gastos de personal (plantel)`):_

```text
Nota 19 "Gastos Operacionales: De Ventas" ($80.878.340 M impreso, el plantel profesional):
```

_antes de la fila 11 (`Otros gastos no operacionales (GMF, impuestos asumidos, multas, descuentos comerciales, diversos, gastos bancarios, ejercicios anteriores, comisiones)`):_

```text
Nota 21 "Otros gastos no operacionales", SIN la línea "Diferencia en cambio, neto" (movida
a netInterest, ver comentario de cabecera):
```

### Meta

```text
TRM oficial (Superintendencia Financiera de Colombia / Banco de la República) al 31/12/2025,
cierre del ejercicio: $3.757,08 COP/USD. El documento no declara su propio tipo de cambio de
cierre para todo el balance (mantiene una cuenta bancaria en Panamá para operaciones en el
exterior, pero no un Anexo de cierre en moneda extranjera), mismo caso que Envigado/Once
Caldas.
Nota 20 (Ingresos por intereses 36.011 - Gastos por intereses 877.273 = -841.262) + la
línea "Diferencia en cambio, neto" de la Nota 21 (-2.700.227, movida acá por regla de
club-data-mapping SKILL.md sección 2). Total = -3.541.489.
Impuesto sobre la renta corriente (244.906) + Impuesto sobre la renta diferido (2.390.585),
EXACTO igual al "2.635.491" impreso como total en la Nota de Impuesto de Renta.
grossDebt = "Total obligaciones financieras" (Nota 12). cash = Nota 6, Efectivo y
equivalentes de efectivo (Bancos moneda extranjera+nacionales+Caja general+Fideicomisos+
Caja menor).
```
