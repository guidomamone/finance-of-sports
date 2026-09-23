# Manchester City

- **Deporte**: Fútbol
- **Liga / competencia**: Premier League (Inglaterra, 1ª división)
- **Entidad legal**: Manchester City Football Club Limited — Companies House n° **00040946**
- **Canal**: Companies House (Reino Unido). Procedimiento completo, gotchas y por qué este canal es
  el mejor del proyecto: `fuentes/Inglaterra/_notas-generales.md`.

## Qué se bajó (sesión 2026-09-13)

Cuentas completas de la sociedad (`Full accounts`), ejercicio cerrado el 30 de junio.
**OJO, no son consolidadas**: son las de la sociedad del club sola. El grupo controlante es City
Football Group (dueño además de clubes en EE.UU., España, Japón, etc.), que es otra sociedad y otro
nivel de consolidación — antes de cargar, decidir explícitamente cuál de los dos perímetros se está
mostrando y aclararlo en la ficha de fuente.

- `Clubes/Inglaterra/Manchester City/manchester-city-full-accounts-2024-25.pdf` — 39 páginas, cerrado 30/6/2025.
- `Clubes/Inglaterra/Manchester City/manchester-city-full-accounts-2023-24.pdf` — cerrado 30/6/2024.

## Serie disponible sin bajar

**15 ejercicios**, de 31/5/2011 a 30/6/2025 (también acá hay cambio de fecha de cierre en el medio).

## Verificación hecha en esta sesión

OCR de la página 2 del PDF 2024/25: índice del documento (`Directors and Company Information`,
`Strategic Report`, `Directors' Report`...) con un sello `Docusign Envelope ID` arriba — el documento
fue firmado electrónicamente y después escaneado igual.

- Último chequeo: 2026-09-13.

## CARGADO al sitio (2026-09-22)

`clubId: 'mancity-gb'`. Cargados los 2 ejercicios ya bajados en `data/mancity-gb-data.js`:
Ejercicio 2023/24 (cerrado 30/6/2024) y Ejercicio 2024/25 (cerrado 30/6/2025).

**OJO, salvedad de perímetro (la más importante de este club): lo cargado es el balance de la
SOCIEDAD "Manchester City Football Club Limited" (Companies House n.° 00040946) sola, NO las
cuentas consolidadas de City Football Group** (dueño además de New York City FC, Melbourne City
FC, Girona FC y otros clubes, que consolida y publica su propio balance por separado). Esto es
distinto de los otros 4 clubes ingleses ya cargados/en carga que sí tienen cuentas consolidadas de
su propia sociedad matriz de club. La aclaración está en `publicNote` de las 2 fuentes en
`data/mancity-gb-data.js`, visible para el visitante en la pestaña Fuentes, no solo acá.

FX: GBP es moneda nueva del proyecto, todavía sin entrada en `data/currency-map.js` (no se agregó
en esta sesión, no era tarea de esta carga). Se referenció `fxRef:'GBP@2024-06-30'` y
`fxRef:'GBP@2025-06-30'` (`FX_CLOSE`), pendientes de agregar el día que alguien necesite el toggle
nativa/USD en vivo para este club.

Tie-out (verificado con `node -e`, sin residuo):
- 2024: revenueLines suma £719,474 M = officialTotalRevenue; `Math.abs(expenses+nonCash)` = £779,971 M
  = officialTotalExpenses; PAT = £73,757 M = officialPAT.
- 2025: revenueLines suma £696,929 M = officialTotalRevenue; `Math.abs(expenses+nonCash)` = £790,231 M
  = officialTotalExpenses; PAT = £(9,916) M = officialPAT (pérdida del ejercicio).

Detalle de categorización, la fila ambigua "(Profit)/loss on disposal of property, plant and
equipment" (resuelta cruzando los 2 ejercicios entre sí) y por qué `netInterest` usa el Statement
of Profit or Loss primario y no el total de las Notas 9/10: ver el comentario de cabecera de
`data/mancity-gb-data.js`.

**Color de marca**: `#6CABDD` — sky blue / Pantone PMS 292 C, verificado contra
teamcolorcodes.com y cruzado contra brandpalettes.com/teamcolorsguide.com/schemecolor.com (los 4
coinciden), verificado 2026-09-22. Ojo: el infobox de Wikipedia en inglés no tiene un campo de
color de marca estable, solo el color de la camiseta de la temporada vigente vía plantilla de kit
(hoy `#98C6EB`, más claro, cambia cada temporada con el diseño de Puma) — se usó el hex estable de
los agregadores de color, no el de la camiseta de esta temporada.
