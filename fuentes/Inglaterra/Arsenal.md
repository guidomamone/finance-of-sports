# Arsenal

- **Deporte**: Fútbol
- **Liga / competencia**: Premier League (Inglaterra, 1ª división)
- **Entidad legal**: Arsenal Holdings Limited (controlante del grupo; la sociedad operativa del club es The Arsenal Football Club Limited, n° 00109244, que presenta sus propias cuentas individuales) — Companies House n° **04250459**
- **Canal**: Companies House (Reino Unido). Procedimiento completo, gotchas y por qué este canal es
  el mejor del proyecto: `fuentes/Inglaterra/_notas-generales.md`.

## Qué se bajó (sesión 2026-09-13)

Cuentas **consolidadas** del grupo (`Group of companies' accounts`), ejercicio cerrado el 31 de mayo.
El ejercicio del fútbol inglés va de junio a mayo, así que el 31/5/2025 es la temporada 2024/25 completa.

- `Clubes/Inglaterra/Arsenal/arsenal-holdings-group-accounts-2024-25.pdf` — 45 páginas, cerrado 31/5/2025.
- `Clubes/Inglaterra/Arsenal/arsenal-holdings-group-accounts-2023-24.pdf` — cerrado 31/5/2024.

## Serie disponible sin bajar

**18 ejercicios**, de 31/5/2008 a 31/5/2025, todos con el mismo mecanismo de descarga.
Además, la sociedad del club (00109244) tiene su propia serie de `Full accounts` individuales, al menos
10 ejercicios (2016-2025) — sirve como contraste, pero para cargar al sitio corresponde la consolidada.

## Verificación hecha en esta sesión

OCR de la página 2 del PDF 2024/25: `ARSENAL HOLDINGS LIMITED / ANNUAL REPORT AND FINANCIAL
STATEMENTS / YEAR ENDED 31 MAY 2025`. Entidad y período confirmados, no asumidos.

- Último chequeo: 2026-09-13.

Color de marca: `#EF0107` — footylogos (color-codes/arsenal, "Red Arsenal logo color", crest y kit), cruzado contra Wikipedia (Arsenal_F.C., describe el rojo como "bright red"/"pillar box red") y contra el wikitext de la plantilla de kit (`body1=F00000`, mismo rojo, ver `club-or-year-onboarding` sección 1b): identidad (rojo) confirmada primero, hex después, cae en la familia correcta. Verificado 2026-09-22.

## CARGADO al sitio (2026-09-22)

Se cargaron los 2 ejercicios ya transcriptos (`arsenal-holdings-group-accounts-2023-24.md` y
`-2024-25.md`) en `data/arsenal-gb-data.js`: clubId `arsenal-gb`, displayName "Arsenal". Entidad
legal confirmada en la carátula de los dos documentos: **Arsenal Holdings Limited** (no "plc" —
corrige el supuesto del pedido original), Companies House n° 04250459, cuentas CONSOLIDADAS del
grupo. Ejercicio 1° de junio a 31 de mayo (confirmado en Nota 1(b) de los dos documentos):
31/5/2024 = Ejercicio 2023/24 (year key `2024`), 31/5/2025 = Ejercicio 2024/25 (year key `2025`).

FX: GBP es moneda nueva en el sitio, todavía sin entrada en `data/currency-map.js`/`FX_CLOSE`
(fuera de alcance de esta sesión). Ninguno de los 2 documentos declara un tipo de cambio propio
GBP/USD (solo cuantifican partidas puntuales en EUR/USD/AUD), así que se usó `fxRef` apuntando a
una cotización de mercado pendiente de agregar: `GBP@2024-05-31` y `GBP@2025-05-31`. El sitio va a
tirar un `console.warn` hasta que se agreguen esas 2 entradas a `FX_CLOSE`, esperado.

Tie-out (verificado con `node -e`, no con `verifyTieOuts()` del navegador — fuera de alcance
correr el preview en esta sesión): los 2 ejercicios cierran EXACTOS, sin residuo.
- Ejercicio 2023/24: Revenue £665,719 M, Expenses (cash+non-cash) £664,974 M, PAT −£17,687 M — los
  3 contra los totales impresos en el documento (Nota 4 y "Loss for the financial year").
- Ejercicio 2024/25: Revenue £770,545 M, Expenses £754,206 M, PAT −£1,377 M — mismos 3 contra los
  totales impresos.

Un ajuste no trivial en los dos ejercicios: la línea "Share of joint venture operating loss" (la
participación en el resultado de Arsenal Broadband Limited, método de la participación) no encaja
en ningún campo de `fiscalYearMeta` existente (no es interés, impuesto, venta de jugadores ni venta
de activos) — se cargó como una `revenueLine` (`other_income`, negativa) para que el PAT
reconciliara exacto. Ver el comentario de cabecera de `data/arsenal-gb-data.js` para el detalle.
