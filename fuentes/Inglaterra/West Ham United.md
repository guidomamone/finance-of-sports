# West Ham United

**Ángulos**: regulador/país (Companies House): agotado hasta 5 ejercicios — descarga automatizada con `tools/companies-house-fetch.mjs` · sitio oficial: no intentado (no hace falta, el registro cubre) · Wayback CDX: no aplica · búsqueda web: no aplica · barrido: 1 (Sonnet) — 2026-10-03

- **Deporte**: Fútbol
- **Liga / competencia**: Premier League (Inglaterra, 1ª división)
- **Entidad legal**: West Ham United Football Club Limited — Companies House n° **00066516**
- **Canal**: Companies House (Reino Unido). Procedimiento completo, gotchas y por qué este canal es
  el mejor del proyecto: `fuentes/Inglaterra/_notas-generales.md`.

## Qué se bajó (sesión 2026-09-13)

Cuentas completas de la sociedad (`Full accounts`), ejercicio cerrado el 31 de mayo.

- `Clubes/Inglaterra/West Ham United/west-ham-united-full-accounts-2024-25.pdf` — 52 páginas, cerrado 31/5/2025.

## Serie disponible sin bajar

**9 ejercicios**, de 31/5/2017 a 31/5/2025.

## Verificación hecha en esta sesión

OCR de la página 2: `WEST HAM UNITED FOOTBALL CLUB LIMITED / ANNUAL REPORT AND FINANCIAL STATEMENTS /
For the year ended 31 May 2025`.

- Último chequeo: 2026-09-13.
- **CARGADO al sitio (2026-09-25)**: único ejercicio disponible, 2024-25, `data/westham-gb-data.js`
  (clubId `westham-gb`). Tie-out exacto contra el propio documento. Premier League (verificado).

<!-- ing-sourcing -->
## Ejercicios en disco (sesión 2026-10-03, serie de 5)

Todos en `Clubes/Inglaterra/West Ham United/` (los PDF no se trackean; son escaneos, hay que transcribirlos con OCR antes de cargar).

- `westham-full-accounts-2023-24.pdf`
- `westham-full-accounts-2022-23.pdf`
- `westham-full-accounts-2021-22.pdf`
- `westham-full-accounts-2020-21.pdf`
- `west-ham-united-full-accounts-2024-25.pdf`
<!-- /ing-sourcing -->

## WorldFootball (sourcing 2026-10-08, año 2023)

Ficha financiera de WorldFootball (`worldfootball.com/financials`, sección «Financial history» del club): 2 PDF de WorldFootball (`wf-<temporada>-<hash>.pdf`: temporadas 2022-2023, 2024-2025; `wf-src-*`: 0 documentos del propio club enlazados desde la ficha). Son espejos de los informes oficiales publicados por el club o la liga (fuente secundaria, `secondary_mirror`); el nombre `wf-<temporada>-<hash8>` lleva el hash del archivo. Los documentos de liga (iguales para varios clubes) están en `_WorldFootball-documentos-de-liga/` del país. Sin transcribir ni cargar.
