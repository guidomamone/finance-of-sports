# Pogoń Szczecin (Pogoń Szczecin S.A.)

**Ángulos**: sitio oficial: agotado (`pogonszczecin.pl/sprawozdania-finansowe`, 8 ejercicios) · canal regulador (RDF/KRS): bloqueado por IP desde EE.UU., no aplica · Wayback CDX: no intentado (archive.org caído) · búsqueda web: agotado · barrido: 1 (Sonnet) — 2026-10-03

- **Entidad**: "POGOŃ SZCZECIN" SPÓŁKA AKCYJNA, KRS 0000285971. **No confundir con POGOŃ SZCZECIN SP. Z O.O. (KRS 0000970637)**, otra sociedad del grupo. Ejercicio julio-junio.
- **8 ejercicios en disco** (`Clubes/Polonia/Pogon Szczecin/`): `sprawozdanie-finansowe-2018.pdf` (FY 2017/18, 61 págs.) a `-2025.pdf` (FY 2024/25, 39 págs.). Verificados 2019-2022 y 2024-2025 con `pdftotext` (entidad y fecha 30.06); 2018 y 2023 sin capa de texto (verificar por OCR; el nombre del archivo en el sitio coincide con el ejercicio). Más informe del biegły rewident 2019, 2021-2025 (`biegly-rewident-<año>.pdf`, 5 págs.) e `informacja-dodatkowa-2020.pdf`.
- **Gotcha de tooling**: los PDFs (Liferay, `pogonszczecin.pl/documents/7740889/...`) dan **403 a `curl` con User-Agent simple**; con UA de Chrome + `Referer: https://pogonszczecin.pl/sprawozdania-finansowe` + `Accept: application/pdf` bajan bien. La propia página de listado también da 403 a curl: se leyó con el Browser pane (`javascript_tool`, `document.querySelectorAll('a')`).
- Último chequeo: 2026-10-03.
