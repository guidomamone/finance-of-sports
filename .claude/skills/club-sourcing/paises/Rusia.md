# Rusia — accesible pese al contexto geopolítico, vía un dominio redirigido

Contrario a lo esperado por el aislamiento de varios servicios rusos desde 2022, el registro
financiero SÍ es accesible desde este entorno. Último chequeo: 2026-09-18.

- **`bo.nalog.ru` redirige (HTTP 302) a un dominio nuevo, `bo.nalog.gov.ru`, que carga perfecto**:
  HTTP 200, sin captcha, sin login, con una API JSON pública 100% scripteable por `curl` — mismo
  nivel que Bélgica/Dinamarca/Grecia/Noruega/República Checa. El registro EGRUL propiamente dicho
  (`egrul.nalog.ru`/`egrul.nalog.gov.ru`) SÍ dio timeout de conexión — pero no hizo falta, porque
  `bo.nalog.gov.ru` ya expone ИНН/ОГРН/razón social en su propio buscador.
  - Buscar: `bo.nalog.gov.ru/advanced-search/organizations/search?query=<INN o nombre>`.
  - Listar TODOS los ejercicios: `bo.nalog.gov.ru/nbo/organizations/<id>/bfo/` (2021 es el techo
    real de profundidad histórica del propio depósito estatal ГИРБО, no un límite de búsqueda).
  - Descargar: `bo.nalog.gov.ru/download/audit/<reportId>` (dictamen de auditor) y
    `.../download/clarification/<reportId>` (notas al balance).
  - **Datos estructurados de cada ejercicio, haya PDF o no** (mismo `reportId`):
    `bo.nalog.gov.ru/nbo/bfo/details/<reportId>` → JSON con `balance` (formulario 0710001:
    `current1100`, `current1600`...), `financialResult` (0710002: `current2110` ingresos,
    `current2400` resultado neto), `capitalChange` y `fundsMovement`, en **miles de rublos**; y
    `bo.nalog.gov.ru/download/bfo/<reportId>?type=XLS` → ZIP con el `.xlsx` de las formas (solo
    `XLS` funciona: `PDF`, `XLSX`, `XML` dan 400). Es la misma presentación del club al depósito del
    Estado, no un agregador. JSON y ZIP no se trackean (`.gitignore`).
- **Gotcha de tooling real que costó una hora**: la conexión es lenta e inestable — varios `curl`
  de archivos grandes cortaron a los 25s con `Operation timed out` pero igual habían recibido HTTP
  200 en los headers antes del corte, marcando falsamente 16 PDFs como "OK" en la primera pasada.
  **No confiar en el código HTTP solo** cuando la conexión a un dominio es inestable: validar cada
  PDF con `pdfinfo | grep -a "^Pages:"` después de descargarlo, y reintentar con `curl -C -`
  (resume) hasta 5 veces con timeout largo (200s) si hace falta.
- **Homónimos con el mismo ИНН reasignado a otro proyecto**: Dynamo Makhachkala tenía 2 entidades
  candidatas además de la correcta — una histórica en liquidación sin ningún depósito, y otra
  renombrada a un club de otra ciudad con escala irrisoria. Se resolvió cruzando el sitio oficial
  del club con la escala de ingresos del registro, mismo criterio que Bélgica (comparar turnover,
  `paises/Belgica.md`) y Noruega (comparar driftsinntekter, `paises/Noruega.md`).
- Con los PDFs, 15 de 16 clubes de la Premier League rusa 2025/26 tienen dictamen y/o notas; con
  los datos estructurados, los 16 tienen balance y resultados 2021-2025 (Baltika desde 2022). Akhmat
  Grozny está obligado a depositar el dictamen y nunca lo hizo — ver `Admin/dudas-por-club.md`.
