# Wolverhampton Wanderers

**Ángulos**: regulador/país (Companies House): agotado hasta 5 ejercicios — descarga automatizada con `tools/companies-house-fetch.mjs` · sitio oficial: no intentado (no hace falta, el registro cubre) · Wayback CDX: no aplica · búsqueda web: no aplica · barrido: 1 (Sonnet) — 2026-10-03

- **Deporte**: Fútbol
- **Liga / competencia**: Premier League (Inglaterra, 1ª división)
- **Entidad legal**: Wolverhampton Wanderers Football Club (1986) Limited — Companies House n° **01989823**
- **Canal**: Companies House (Reino Unido). Procedimiento completo, gotchas y por qué este canal es
  el mejor del proyecto: `fuentes/Inglaterra/_notas-generales.md`.

## Qué se bajó (sesión 2026-09-16)

Cuentas completas de la sociedad (`Full accounts`).

- `Clubes/Inglaterra/Wolverhampton Wanderers/wolves-full-accounts-2024-25.pdf` — 41 páginas, cerrado 30/6/2025.
- `Clubes/Inglaterra/Wolverhampton Wanderers/wolves-full-accounts-2023-24.pdf` — 39 páginas, cerrado 31/5/2024.

**Ojo, gotcha de fecha de cierre**: el ejercicio 2024/25 cerró el **30 de junio** de 2025, no el 31 de
mayo como todos los ejercicios anteriores (2002-2024). Es un cambio real de fecha de referencia
contable, no un error de esta sesión — verificar en la próxima carga si el ejercicio 2024/25 abarca 13
meses (1/6/2024 a 30/6/2025) o si hubo un ejercicio corto de transición.

## Serie disponible sin bajar

**24 ejercicios**, de 31/5/2002 a 30/6/2025 — la serie más profunda de los 10 clubes de esta sesión.

## Verificación hecha en esta sesión

OCR de la página de información de la sociedad del PDF 2024/25: `WOLVERHAMPTON WANDERERS FOOTBALL
CLUB (1986) LIMITED`, directores `J F Bowater`, `J Gough`, `Y Shi` (resigned 19/12/2025), `J Shi`
(appointed 19/12/2025) — coincide con la familia Shi de Fosun International, dueña del club.
Company number 01989823 confirmado en la misma página.

- Último chequeo: 2026-09-16.
- **CARGADO al sitio (2026-09-25)**: ejercicios 2023-24 (12 meses) y 2024-25 (PERÍODO DE TRANSICIÓN
  DE 13 MESES, 1/6/2024-30/6/2025 — la compañía cambió su fecha de cierre de 31/5 a 30/6, ver
  comentario de cabecera de `data/wolves-gb-data.js` y duda anotada en `Admin/dudas-por-club.md`),
  ambos con tie-out exacto. Premier League los 2 ejercicios.

<!-- ing-sourcing -->
## Ejercicios en disco (sesión 2026-10-03, serie de 5)

Todos en `Clubes/Inglaterra/Wolverhampton Wanderers/` (los PDF no se trackean; son escaneos, hay que transcribirlos con OCR antes de cargar).

- `wolves-full-accounts-2024-25.pdf`
- `wolves-full-accounts-2023-24.pdf`
- `wolves-full-accounts-2022-23.pdf`
- `wolves-full-accounts-2021-22.pdf`
- `wolves-full-accounts-2020-21.pdf`
<!-- /ing-sourcing -->

## WorldFootball (sourcing 2026-10-08, año 2023)

Ficha financiera de WorldFootball (`worldfootball.com/financials`, sección «Financial history» del club): 2 PDF de WorldFootball (`wf-<temporada>-<hash>.pdf`: temporadas 2022-2023, 2024-2025; `wf-src-*`: 0 documentos del propio club enlazados desde la ficha). Son espejos de los informes oficiales publicados por el club o la liga (fuente secundaria, `secondary_mirror`); el nombre `wf-<temporada>-<hash8>` lleva el hash del archivo. Los documentos de liga (iguales para varios clubes) están en `_WorldFootball-documentos-de-liga/` del país. Sin transcribir ni cargar.
