# Chelsea

**Ángulos**: regulador/país (Companies House): agotado hasta 5 ejercicios — descarga automatizada con `tools/companies-house-fetch.mjs` · sitio oficial: no intentado (no hace falta, el registro cubre) · Wayback CDX: no aplica · búsqueda web: no aplica · barrido: 1 (Sonnet) — 2026-10-03

- **Deporte**: Fútbol
- **Liga / competencia**: Premier League (Inglaterra, 1ª división)
- **Entidad legal**: Chelsea FC Holdings Limited — Companies House n° **02536231**
- **Canal**: Companies House (Reino Unido). Procedimiento completo, gotchas y por qué este canal es
  el mejor del proyecto: `fuentes/Inglaterra/_notas-generales.md`.

## Qué se bajó (sesión 2026-09-13)

Cuentas **consolidadas** del grupo, ejercicio cerrado el 30 de junio.

- `Clubes/Inglaterra/Chelsea/chelsea-fc-holdings-group-accounts-2024-25.pdf` — 46 páginas, cerrado 30/6/2025.

## Serie disponible sin bajar

**12 ejercicios**, de 30/6/2014 a 30/6/2025.

## Verificación hecha en esta sesión

OCR de la página 2: `CHELSEA FC HOLDINGS LIMITED / COMPANY INFORMATION / Directors...`, con sello
`Docusign Envelope ID`.

## Por qué este club importa para el sitio

Chelsea es el caso testigo del truco contable de las ventas entre empresas del mismo dueño (hotel y
equipo femenino vendidos a sociedades hermanas) que definió los últimos resultados publicados y que
la Premier League discutió públicamente. Es exactamente el tipo de operación que el criterio de
`profitOnPlayerSales` / `assetSales` del sitio tiene que poder mostrar por separado. Antes de cargarlo,
leer con cuidado la nota de partes relacionadas del PDF.

- Último chequeo: 2026-09-13.
- **CARGADO al sitio (2026-09-25)**: único ejercicio disponible, 2024-25, `data/chelsea-gb-data.js`
  (clubId `chelsea-gb`). Tie-out exacto. Premier League. OJO: la venta de Chelsea FC Women a una
  parte relacionada (£198,7m de ganancia) ocurrió en el ejercicio ANTERIOR (2023-24, comparativo),
  no en el ejercicio cargado — si se carga 2023-24 en el futuro, ESE es el ejercicio donde aplica
  la pregunta de categorización. "Cost of sales" sin desglose propio de wages, ver
  `Admin/dudas-por-club.md`.

<!-- ing-sourcing -->
## Ejercicios en disco (sesión 2026-10-03, serie de 5)

Todos en `Clubes/Inglaterra/Chelsea/` (los PDF no se trackean; son escaneos, hay que transcribirlos con OCR antes de cargar).

- `chelsea-fc-holdings-group-accounts-2024-25.pdf`
- `chelsea-fc-holdings-group-accounts-2023-24.pdf`
- `chelsea-fc-holdings-group-accounts-2022-23.pdf`
- `chelsea-fc-holdings-group-accounts-2021-22.pdf`
- `chelsea-fc-holdings-group-accounts-2020-21.pdf`
<!-- /ing-sourcing -->
