# depcali-co — evidencia de carga

Lo que había como comentario en `data/depcali-co-data.js`, movido tal cual por `tools/mover-comentarios-data.mjs` (la regla:
`Admin/CONVENCIONES-DATOS.md`, "data/<club>-data.js NO LLEVA COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y
meta. Las notas de cada fila van en una tabla con su número de fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
============================================================================
data/depcali-co-data.js — Club Profesional Deportivo Cali S.A. (Cali,
Colombia). clubId lleva el país al final (`depcali-co`) por la convención
de Admin/CONVENCIONES.md. Ejercicio 2025 = REAL, único ejercicio cargado a
propósito (mismo criterio que Envigado/Once Caldas).

FUENTE: `Clubes/Colombia/Deportivo Cali/estados-financieros-2025.pdf` (63
páginas, "Notas a los Estados Financieros, al 31 de diciembre de 2025 y
2024"), texto nativo vía pdftotext -layout, transcripción completa en
`estados-financieros-2025.md` en la misma carpeta. Bajado vía SIIS
(siis.ia.supersociedades.gov.co, NIT 890301160 — el mismo NIT de la
histórica "Asociación Deportivo Cali"), ver
`fuentes/Colombia/Deportivo Cali.md`.

OJO — CONVERSIÓN SOCIETARIA: el club pasó de "Asociación Deportivo Cali"
(entidad sin ánimo de lucro, régimen tributario especial al 20%) a "Club
Profesional Deportivo Cali S.A." (sociedad anónima, tarifa 35% sobre
utilidad fiscal) en 2024-2025, con IDC Network quedando con el 85% de las
acciones. Esto es LA explicación de por qué el resultado neto es una
PÉRDIDA GRANDE (-$6.954.741 M) a pesar de que el resultado operativo antes
de impuestos fue una ganancia moderada ($1.120.608 M, ver reconciliación
abajo): la conversión disparó un cargo de impuesto diferido muy grande
(Nota 25: "Cargo al resultado" de -$7.491.887 M por reconocimiento de
diferencias temporarias, principalmente ligado a la nueva base fiscal de
los activos/pasivos bajo el régimen S.A.). El documento NO imprime un
"Impuesto de renta corriente" ni una "Utilidad antes de impuestos" como
cifra aparte fuera de esta nota — el tax de este archivo es un RESIDUO,
documentado abajo, mismo criterio que Once Caldas.

Cifras del documento "expresadas en miles de pesos" — el propio documento
no repite la aclaración en cada tabla, pero es consistente con el orden de
magnitud de la vista SIIS (Ingresos $28.233.253 M = exactamente el total de
la Nota 18 en las cifras del PDF, sin dividir). Acá se guardan divididas
por 1.000, en MILLONES de pesos colombianos (COP).

REVENUE = Nota 18 "Ingresos por actividades ordinarias" (11 líneas, suma
EXACTA a $28.233.253 M, coincide con la vista SIIS) + Nota 21 "Otros
Ingresos" (14 líneas incl. recuperaciones y venta de derechos deportivos,
suma EXACTA a $29.154.002 M). officialTotalRevenue = 57.387.255.

EXPENSES: Nota 19 "Gastos de Administración" ($8.066.723 M, con
Depreciaciones separadas), Nota 20 "Gastos de Ventas" ($45.744.581 M, el
bolsón más grande — incluye el plantel profesional, gastos de personal de
ventas $28.602.139 M según Nota 20(1), con Depreciaciones separadas), Nota
22 "Otros Gastos" ($1.413.724 M). officialTotalExpenses = 55.225.028.
No hay una nota de "Costo de Ventas" separada para este club (no vende
mercancía deportiva por fuera del rubro comercial de la Nota 18).

netInterest = Nota 23 "Ingresos y Gastos Financieros": Ingresos Financieros
(Diferencia En Cambio + Intereses = $1.720.160 M) - Costos Financieros
(Diferencia En Cambio + Comisiones + Intereses por Mora y Sobregiro +
Intereses + Otros (Gmf, descuentos) + Gastos Bancarios = $2.761.779 M) =
-1.041.619 M, EXACTO igual a los 2 totales impresos por separado.

tax = RESIDUO (mismo criterio que Once Caldas, ver comentario en
data/oncecaldas-data.js): pretax calculado línea por línea desde las Notas
18-23 = Revenue(57.387.255) - Expenses(55.225.028) + netInterest(-1.041.619)
= 1.120.608. officialPAT confirmado por la vista SIIS = -6.954.741 (pérdida).
tax = officialPAT - pretax = -6.954.741 - 1.120.608 = -8.075.349. Esto NO es
un número inventado a ciegas: la Nota 25 (Impuesto a las ganancias) prueba
que existe un cargo de impuesto diferido de gran magnitud (-7.491.887, por
el "movimiento del impuesto diferido" que trae la conversión societaria),
consistente en orden de magnitud con el residuo. La pregunta pendiente
(por qué el documento no imprime el desglose completo corriente/diferido
como cifra única final) queda para Admin/dudas-por-club.md.
============================================================================
```

## 2025

### Ingresos

_antes de la fila 12 (`Venta y préstamo de derechos deportivos, mecanismo de solidaridad`):_

```text
Promovidas a líneas propias (Versión de esta sesión, corrigiendo un hallazgo de
node tools/audit.js: catch-all dominante) las 3 categorías reales distintas que venían
adentro del catch-all "Otros Ingresos" — ver club-data-mapping SKILL.md sección 1.
```

### Gastos

_antes de la fila 1 (`Gastos de Administración (honorarios, personal, servicios, legales, diversos, seguros, arrendamientos, viajes, mantenimiento, adecuación)`):_

```text
Nota 19 "Gastos de Administración" ($8.066.723 M impreso):
```

_antes de la fila 3 (`Gastos de Ventas: Gastos de personal (plantel)`):_

```text
Nota 20 "Gastos de Ventas" ($45.744.581 M impreso, el plantel profesional):
```

_antes de la fila 8 (`Otros Gastos (gastos diversos por demandas y multas, gastos extraordinarios, pérdida en venta y retiro de bienes)`):_

```text
Nota 22 "Otros Gastos" ($1.413.724 M impreso):
```

### Meta

```text
TRM oficial (Superintendencia Financiera de Colombia / Banco de la República) al 31/12/2025,
cierre del ejercicio: $3.757,08 COP/USD. El documento no declara su propio tipo de cambio de
cierre (sin Anexo de moneda extranjera), mismo caso que Envigado/Once Caldas.
Nota 23: Ingresos Financieros (1.720.160) - Costos Financieros (2.761.779), EXACTO igual a
los 2 totales impresos por separado.
RESIDUO: pretax línea por línea (Notas 18-23) = 1.120.608. officialPAT confirmado por SIIS =
-6.954.741. tax = -6.954.741 - 1.120.608 = -8.075.349. La Nota 25 (Impuesto a las ganancias)
prueba que existe un cargo de impuesto DIFERIDO de gran magnitud (-7.491.887) por la
conversión societaria de Asociación a S.A. en 2024-2025, consistente en orden de magnitud
con este residuo — ver comentario de cabecera. Duda pendiente sobre el desglose exacto
corriente/diferido anotada en el reporte de esta sesión.
grossDebt = Obligaciones Financieras (Nota 12) corriente (357,812) + no corriente
(40.281,740). cash = Nota 5, Bancos+Cajas+Derechos fiduciarios.
```

## Gestiones

_antes de Rafael Tinoco Kipps (data/gestiones/co.js):_

```text
Tinoco: la nueva junta directiva se oficializó el 19-20/11/2025 (las fuentes difieren por un día); renunció el 21/4/2026 y asumió Joaquín Losada Fina (fecha de relevo aproximada).
```
