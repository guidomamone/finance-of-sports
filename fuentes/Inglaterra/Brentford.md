# Brentford

**Ángulos**: regulador/país (Companies House): agotado hasta 5 ejercicios — descarga automatizada con `tools/companies-house-fetch.mjs` · sitio oficial: no intentado (no hace falta, el registro cubre) · Wayback CDX: no aplica · búsqueda web: no aplica · barrido: 1 (Sonnet) — 2026-10-03

- **Deporte**: Fútbol
- **Liga / competencia**: Premier League (Inglaterra, 1ª división)
- **Entidad legal**: Brentford FC Limited — Companies House n° **03642327**
- **Canal**: Companies House (Reino Unido). Procedimiento completo, gotchas y por qué este canal es
  el mejor del proyecto: `fuentes/Inglaterra/_notas-generales.md`.

## Qué se bajó (sesión 2026-09-16)

Cuentas **consolidadas** del grupo (`Group of companies' accounts`), ejercicio cerrado el 30 de junio.

- `Clubes/Inglaterra/Brentford/brentford-group-accounts-2024-25.pdf` — 56 páginas, cerrado 30/6/2025.
- `Clubes/Inglaterra/Brentford/brentford-group-accounts-2023-24.pdf` — 60 páginas, cerrado 30/6/2024.

## Serie disponible sin bajar

**12 ejercicios**, de 31/5/2013 a 30/6/2025.

## Verificación hecha en esta sesión

OCR de la página 2 del PDF 2024/25: `Brentford FC Ltd (Registered number: 03642327) / Contents of the
Consolidated Financial Statements for the Year Ended 30 June 2025`. Entidad y período confirmados, no
asumidos.

- Último chequeo: 2026-09-16.
- **CARGADO al sitio (2026-09-25)**: ejercicios 2023-24 y 2024-25, `data/brentford-gb-data.js`
  (clubId `brentford-gb`). Premier League los 2 ejercicios (16° y 10°). OJO 2023-24: la Nota de
  intereses pagados imprime un total que no reconcilia con sus propios componentes — se usó la
  suma de los 2 componentes (el único valor que hace cerrar "Loss before taxation"), ver
  comentario de cabecera de `data/brentford-gb-data.js`.

<!-- ing-sourcing -->
## Ejercicios en disco (sesión 2026-10-03, serie de 5)

Todos en `Clubes/Inglaterra/Brentford/` (los PDF no se trackean; son escaneos, hay que transcribirlos con OCR antes de cargar).

- `brentford-group-accounts-2024-25.pdf`
- `brentford-group-accounts-2023-24.pdf`
- `brentford-group-accounts-2022-23.pdf`
- `brentford-group-accounts-2021-22.pdf`
- `brentford-group-accounts-2020-21.pdf`
<!-- /ing-sourcing -->
