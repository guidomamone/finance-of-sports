# Saskatchewan Roughriders (Saskatchewan Roughrider Football Club Inc.)

**Ángulos**: sitio oficial: parcial — `riderville.com/annual-general-meeting/` solo expone los informes de FY2025-26 y el resumen de FY2024-25; los de FY2022-23 y anteriores salen en posts viejos de `riderville.com` cuyos PDFs no se encontraron · regulador/país: no aplica (club comunitario sin cotizar) · Wayback CDX: no intentado (el CDX no respondió desde esta máquina; la API `available` devolvió snapshots de la página de AGM de 2022 y 2023 pero sin enlaces a PDF en el HTML) · búsqueda web: agotado para FY2020-FY2023 (prensa cita cifras, sin PDF) · barrido: 1 (Sonnet) — 2026-10-03

- **Deporte**: Fútbol canadiense
- **Liga / competencia**: CFL, División Oeste
- **Entidad legal**: **Saskatchewan Roughrider Football Club Inc.**, propiedad comunitaria (accionistas locales; el informe de gestión
  habla de AGM y de una circular a accionistas; no se verificó el número de accionistas ni la política de dividendos). Cierre del ejercicio: **31 de marzo** (a caballo de dos temporadas, ej. "2023-24").
- **Canal**: Annual Report completo para la Asamblea Anual (junio), con informe del auditor independiente, estado de situación financiera, de
  operaciones, de cambios en activos netos y de flujos de efectivo, más notas. Hospedado en `static.cfl.ca/.../sites/5/` o en
  un bucket de S3 del club. Bajable con `curl` con `User-Agent` de navegador.

## Qué se bajó (2026-10-03), en `Clubes/Canadá/Saskatchewan Roughriders/`

- `roughriders-annual-report-2023-24.pdf` (41 págs) — FY2023-24 (31/3/2024), con comparativo FY2022-23. `static.cfl.ca/wp-content/uploads/sites/5/2024/06/24AnnualReport_FINAL.pdf`.
- `roughriders-annual-report-2025-26.pdf` (21 págs) — FY2025-26 (31/3/2026), con comparativo FY2024-25. `saskriders-media.s3.us-west-2.amazonaws.com/documents/AGM-2026/2025-26+Annual+Report+-+Final.pdf`.
- `roughriders-annual-report-2024-25-one-pager.pdf` (1 pág, resumen) y `roughriders-agm-2025-information-circular.pdf` (6 págs, circular de la asamblea 2025).

Resultado: **4 ejercicios con estados** (FY2023-FY2026), uno menos que la meta de 5. Excedente (déficit) de ingresos sobre gastos, leído
de los estados: FY2023 $7.184.928 (incluye la Grey Cup 2022) · FY2024 $(1.101.372) · FY2025 $2.087.770 · FY2026 $(157.005).
Para FY2022 (utilidad $3.888.291 según prensa) y antes, **falta el informe**: el patrón de URL de 2024 no se repite (los intentos
`23AnnualReport_FINAL.pdf`, `2023-Annual-Report.pdf`, etc. dieron 403). Siguiente paso concreto: abrir los posts de AGM de 2022 y 2023
(`riderville.com/2023/06/22/roughriders-hold-annual-general-meeting-3/`) con un browser real, o pedirlos a `riderville.com`.
CAD. Resultados del último ejercicio según el club: ingresos 2025-26 ~$44,7 M.

- Último chequeo: 2026-10-03.
