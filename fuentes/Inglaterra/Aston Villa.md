# Aston Villa

**Ángulos**: regulador/país (Companies House): agotado hasta 5 ejercicios — descarga automatizada con `tools/companies-house-fetch.mjs` · sitio oficial: no intentado (no hace falta, el registro cubre) · Wayback CDX: no aplica · búsqueda web: no aplica · barrido: 1 (Sonnet) — 2026-10-03

- **Deporte**: Fútbol
- **Liga / competencia**: Premier League (Inglaterra, 1ª división)
- **Entidad legal**: Aston Villa Football Club Limited — Companies House n° **03375789**
- **Canal**: Companies House (Reino Unido). Procedimiento completo, gotchas y por qué este canal es
  el mejor del proyecto: `fuentes/Inglaterra/_notas-generales.md`.

## Qué se bajó (sesión 2026-09-13)

Cuentas completas de la sociedad (`Full accounts`), ejercicio cerrado el 30 de junio.

- `Clubes/Inglaterra/Aston Villa/aston-villa-full-accounts-2024-25.pdf` — 38 páginas, cerrado 30/6/2025.

## Serie disponible sin bajar

**8 ejercicios**, de 31/5/2018 a 30/6/2025 (con cambio de fecha de cierre en el medio).

## Verificación hecha en esta sesión

OCR de la página 2: `Aston Villa Football Club Limited / Company Information / Directors M Angelakis,
W R Edens...`.

- Último chequeo: 2026-09-13.
- **CARGADO al sitio (2026-09-25)**: único ejercicio 2024-25 (30/6/2025), `data/astonvilla-gb-data.js`
  (clubId `astonvilla-gb`). Premier League. **LIMITACIÓN GENUINA**: esta entidad (cuentas
  individuales, no consolidadas) no reporta NINGÚN activo intangible ni compraventa de jugadores —
  el costo del plantel casi con certeza vive en otra entidad del grupo NSWE, no depositada en
  Companies House. El 93,2% de "Operating expenses" (£404M) quedó como lump sin desglosar
  (`lump_football_operations_expense`), ver duda en `Admin/dudas-por-club.md`. El ejercicio
  anterior (comparativo del mismo documento) es un período de 13 meses, no comparable, no se
  cargó.

<!-- ing-sourcing -->
## Ejercicios en disco (sesión 2026-10-03, serie de 5)

Todos en `Clubes/Inglaterra/Aston Villa/` (los PDF no se trackean; son escaneos, hay que transcribirlos con OCR antes de cargar).

- `astonvilla-full-accounts-2023-24.pdf`
- `astonvilla-full-accounts-2022-23.pdf`
- `astonvilla-full-accounts-2021-22.pdf`
- `astonvilla-full-accounts-2020-21.pdf`
- `aston-villa-full-accounts-2024-25.pdf`
<!-- /ing-sourcing -->
