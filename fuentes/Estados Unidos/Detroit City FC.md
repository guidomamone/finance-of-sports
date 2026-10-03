# Detroit City FC

**Ángulos**: sitio oficial: no intentado (no hizo falta, el canal oficial es la SEC) · regulador/país: agotado (SEC EDGAR, Form C-AR de Regulation Crowdfunding, CIK 1630745: los 5 C-AR que existen) · Wayback CDX: no aplica · búsqueda web: no hizo falta · barrido: 1 (Sonnet) — 2026-10-03

- **Deporte**: Fútbol (hombres: USL Championship; mujeres: USL W League)
- **Liga / competencia**: USL Championship (Estados Unidos) — segunda división del fútbol estadounidense, abierta, fuera del esquema single-entity de la MLS
- **Entidad legal**: **DCFC Holdings, LLC** (CIK de la SEC **0001630745**, clave `DCFBS`). Es la sociedad del club
  (`Detroit City Football Club`), de su equipo femenino, de la marca y de ligas recreativas/juveniles. Levantó
  capital de los hinchas por crowdfunding (Regulation CF en 2020 y rondas posteriores), y la norma la
  obliga a presentar cada año un **Form C-AR** con estados financieros.
- **Canal**: EDGAR, `https://www.sec.gov/Archives/edgar/data/1630745/<accession sin guiones>/<archivo>.pdf`. Hay que mandar
  un `User-Agent` con nombre y mail (ver `_notas-generales.md`). La búsqueda de texto completo de EDGAR
  (`efts.sec.gov/LATEST/search-index?q=...&forms=C-AR`) fue lo que lo encontró.

## Qué se bajó (2026-10-03), en `Clubes/Estados Unidos/Detroit City FC/`

| Archivo | Ejercicio | Presentado | Páginas | Estados |
|---|---|---|---|---|
| `detroit-city-fc-form-c-ar-fy2021.pdf` | FY2021 (31/12/2021) | 2023-01-31 | 30 | sin auditar (certificados por el gerente) |
| `detroit-city-fc-form-c-ar-fy2022.pdf` | FY2022 | 2023-04-24 | 29 | sin auditar |
| `detroit-city-fc-form-c-ar-fy2023.pdf` | FY2023 | 2024-05-17 | 41 | sin auditar (el balance de 2023-2024 figura como auditado en el índice) |
| `detroit-city-fc-form-c-ar-fy2024.pdf` | FY2024 (cierre 24/12/2024 según EDGAR) | 2025-08-11 | 44 | sin auditar / mixto |
| `detroit-city-fc-form-c-ar-fy2025.pdf` | FY2025 | 2026-04-30 | 58 | **con informe de auditor independiente** |

Todos con capa de texto (`pdftotext -layout` los lee bien). Cifras de control leídas del resumen de cada
documento (USD):

| Ejercicio | Revenue | Net income | Total assets |
|---|---|---|---|
| FY2020 (comparativo en el de FY2021) | 853.260 | −680.101 | 886.475 |
| FY2021 | 2.134.535 | −1.230.404 | 5.289.538 |
| FY2022 | 3.401.728 | −2.905.135 | 9.130.894 |
| FY2023 | 4.464.786 | −2.277.265 | 6.966.904 |
| FY2024 | 5.403.660 | **+13.212.548** | 24.282.310 |
| FY2025 | 5.737.025 | −5.320.159 | 36.046.656 |

**Para el mapeo**: el resultado de FY2024 (+13,2 M) con ingresos de 5,4 M no puede venir de la
operación (causa NO verificada, hay que leer las notas del C-AR), y los activos se multiplican por 3,5 ese año. Los estados de
FY2021-FY2024 son "unaudited" (autocertificados), solo el FY2025 trae auditor; los comparativos de cada
C-AR sirven para cruzar. Hay además un Form C de 2020 (accession `0001670254-20-000673`) con FY2019/FY2018,
sin bajar.

- Último chequeo: 2026-10-03.
