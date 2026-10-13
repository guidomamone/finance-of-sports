# panathinaikos-gr — evidencia de carga

Lo que había como comentario en `data/panathinaikos-gr-data.js`, movido tal cual por `tools/mover-comentarios-data.mjs` (la regla:
`Admin/CONVENCIONES-DATOS.md`, "data/<club>-data.js NO LLEVA COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y
meta. Las notas de cada fila van en una tabla con su número de fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
============================================================================
data/panathinaikos-gr-data.js — Panathinaikos Athlitikos Omilos P.A.E.
(Atenas, Grecia). Primer club griego cargado en finance-of-sports
(2026-09-28, ronda de 5 onboardings de prueba de los tools del to-do
98/95, 4/5 — primer país 100% nuevo de esta ronda). Ejercicio 2025 = REAL,
único ejercicio cargado a propósito.

FUENTE: `Clubes/Grecia/Panathinaikos/Panathinaikos_annual_FR_2025-06-30.md`
(informe anual completo, IFRS, período 01/07/2024-30/06/2025, 3284
líneas). OJO: la carpeta también tiene un archivo
"Panathinaikos_summary_IFRS_2025-06-30.md" (152 líneas) que NO se usó —
su contenido corresponde al ejercicio 2020 (no 2025, a pesar del nombre
del archivo) y tiene etiquetas de fila griegas sin sentido repetidas
("Αιγαίου"/"Ανεξίτημα" en filas de balance completamente distintas),
señal clara de una transcripción fallida/mal hecha — se descartó sin
usar, no se cargó ningún dato de ahí.

TODAS las cifras son de la columna "Η ΕΤΑΙΡΕΙΑ" (la Compañía, standalone),
NO "Ο ΟΜΙΛΟΣ" (el Grupo/consolidado) — mismo criterio que Boca/Racing:
preferir la entidad individual sobre el consolidado, que puede incluir
negocio de subsidiarias no futbolístico.

REVENUE = "Λειτουργικά έσοδα" (Ingresos operativos, Κατάσταση Συνολικών
Εσόδων / Estado de Resultado Integral, pág. 21), total impreso
€57.601.032, reconciliado EXACTO línea por línea con
`tools/sum-check.mjs`. Los 5 auxilios/subsidios de la Nota de ingresos
(Alianza UEFA y premios, subvención de la federación/gobierno) se
categorizaron como `competition_bonus` (dinero de la competencia/
federación, no ingreso propio del club).

EXPENSES = "Λειτουργικά έξοδα" (Gastos operativos), total impreso
€72.712.750. "Αμοιβές εργαζομένων και λοιπές παροχές" (Compensación de
empleados, €51.086.630, el 70% del gasto) se desglosa en la Nota 21 por
CONCEPTO (no por departamento, a diferencia de River/Vélez) — "Συμβόλαια
/ Πριμ ποδοσφαιριστών-προπονητών" (Contratos/Primas de jugadores-cuerpo
técnico, claramente `wages_squad`) vs. "Αμοιβές και μισθοί
εργαζομένων"/"Λοιπές Παροχές"/"Ασφάλιστρα" (personal general/beneficios/
seguros, sin mención a jugadores, `admin_general_expense`). "Αποζημιώσεις"
(indemnizaciones, €96.629, chica) se sumó a `wages_squad` por aparecer
entre los 2 conceptos de plantel en la Nota — juicio, no certeza.

`profitOnPlayerSales` = "Κέρδη/ζημιές κατά τη διάθεση άυλων περιουσιακών
στοιχείων - ποδοσφαιριστές" (resultado neto de venta de derechos de
jugadores, -€10.983.661), un campo dedicado del IFRS griego que el
Estado de Resultado Integral separa explícito del resto — no hace falta
inferirlo, el documento ya lo aísla.

PAT RECONCILIA EXACTO, SIN RESIDUO (caso limpio, a diferencia de Once
Caldas 2023-2025): Λειτουργικά έσοδα - Λειτουργικά έξοδα (-€15.111.718,
coincide con "Αποτελέσματα εκμετάλλευσης" impreso) + netInterest +
profitOnPlayerSales + assetSales (-€26.541.011, coincide con "Κέρδη/
(ζημιές) προ φόρων" impreso) + tax = -€26.495.719, coincide EXACTO con
"Κέρδη / (ζημιές) χρήσης μετά φόρων" impreso.

FX: EUR, `EUR@2025-06-30` (ya cacheado en data/currency-map.js desde
antes de esta sesión, cierre BCE, sin fetch nuevo).
============================================================================
```

_de data/clubs.js:_

```text
Panathinaikos, primer club griego cargado (2026-09-28, ronda de onboardings de prueba).
Colores VERDE Y BLANCO confirmados (Wikipedia: "green established as the primary colour since
1910", apodo "Πράσινοι"/"los verdes"), pero sin un hex específico de la sección de FÚTBOL
(footylogos no tiene Grecia cacheada todavía, y las fuentes de color encontradas mezclan con
el club de básquet del mismo nombre) — brandColor:null a propósito en vez de adivinar un tono.
```

_de data/club-leagues/gr.js:_

```text
Verificado el 2026-09-28 (to-do 95) contra "2024–25 Super League Greece" (Wikipedia):
Panathinaikos ("PAO") aparece en la tabla de posiciones de esa temporada. La página tiene una
tabla wikitable ANTES de la de equipos reales (un resumen de ascendidos/descendidos), así que
tools/fetch-club-league-reference.mjs agarró esa por error (extrajo 1 solo equipo,
"Levadiakos") -- se confirmó a mano con el wikitext crudo en vez de confiar en el fetch
automático. Mismo tipo de limitación que ya quedó anotada para Argentina (to-do 98/95).
```

## Gestiones

_antes de Giannis Alafouzos (data/gestiones/gr.js):_

```text
Alafouzos: dueño desde que la Alianza Panathinaikos tomó el control (julio de 2012) y presidente electo el 25/9/2012; fue presidente formal hasta el 21/4/2017
y desde el 11/7/2022; entre medio fue el dueño y financista mientras presidían Mavrokoukoulakis y Konstantinou (ver cabecera). Sigue de dueño.
```
