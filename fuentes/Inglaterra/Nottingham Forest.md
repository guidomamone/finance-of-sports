# Nottingham Forest

**Ángulos**: regulador/país (Companies House): agotado hasta 5 ejercicios — descarga automatizada con `tools/companies-house-fetch.mjs` · sitio oficial: no intentado (no hace falta, el registro cubre) · Wayback CDX: no aplica · búsqueda web: no aplica · barrido: 1 (Sonnet) — 2026-10-03

- **Deporte**: Fútbol
- **Liga / competencia**: Premier League (Inglaterra, 1ª división)
- **Entidad legal**: Nottingham Forest Football Club Limited — Companies House n° **01630402**
- **Canal**: Companies House (Reino Unido). Procedimiento completo, gotchas y por qué este canal es
  el mejor del proyecto: `fuentes/Inglaterra/_notas-generales.md`.

## Qué se bajó (sesión 2026-09-16)

Cuentas completas de la sociedad (`Full accounts`), ejercicio cerrado el 30 de junio.

- `Clubes/Inglaterra/Nottingham Forest/forest-full-accounts-2024-25.pdf` — 39 páginas, cerrado 30/6/2025.
- `Clubes/Inglaterra/Nottingham Forest/forest-full-accounts-2023-24.pdf` — 36 páginas, cerrado 30/6/2024.

**Ojo, gotcha de fecha de cierre**: igual que Wolves, la serie histórica cerraba el 31 de mayo (hasta
2020) y pasó a cerrar el 30 de junio en años más recientes — cambio real de fecha de referencia
contable, no un error de esta sesión.

## Serie disponible sin bajar

**13 ejercicios**, de 31/5/2013 a 30/6/2025.

## Verificación hecha en esta sesión

OCR de la página de información de la sociedad del PDF 2024/25: `NOTTINGHAM FOREST FOOTBALL CLUB
LIMITED / COMPANY INFORMATION / Directors Mr. N Randall K.C., Mr. S Kominakis (Appointed 29 April
2025) / Company number 01630402 / Registered office The City Ground`. N Randall K.C. es el presidente
conocido del club (grupo Evangelos Marinakis). Entidad confirmada, no asumida.

- Último chequeo: 2026-09-16.
- **CARGADO al sitio (2026-09-25)**: ejercicios 2023-24 y 2024-25, `data/nottinghamforest-gb-data.js`
  (clubId `nottinghamforest-gb`). Tie-out exacto contra el propio documento en los 2 años. Premier
  League los 2 ejercicios (verificado contra Wikipedia). `fx` vía `FX_CLOSE` (GBP@2024-06-30/2025-06-30,
  ya existentes).

<!-- ing-sourcing -->
## Ejercicios en disco (sesión 2026-10-03, serie de 5)

Todos en `Clubes/Inglaterra/Nottingham Forest/` (los PDF no se trackean; son escaneos, hay que transcribirlos con OCR antes de cargar).

- `nottinghamforest-full-accounts-2022-23.pdf`
- `nottinghamforest-full-accounts-2021-22.pdf`
- `nottinghamforest-full-accounts-2020-21.pdf`
- `forest-full-accounts-2024-25.pdf`
- `forest-full-accounts-2023-24.pdf`
<!-- /ing-sourcing -->
