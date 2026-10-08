# Valencia Club de Fútbol, S.A.D.

**Ángulos**: sitio oficial: agotado (valenciacf.com/public/Attachment + seguro.valenciacf.com legado) · Wayback CDX: agotado (seguro.valenciacf.com 184 PDFs, Attachment 124) · búsqueda web: no intentado · regulador/país: no aplica · barrido: 2 (Sonnet) — 2026-10-03

- **Hit modesto (2026-09-13).** 2 ejercicios reales descargados a `Clubes/España/Valencia CF/`:
  - Ejercicio 2023-24: `cuentas-anuales-individual-2023-2024.pdf` y
    `cuentas-anuales-consolidadas-2023-2024.pdf` (informes de auditoría de cuentas individuales y
    consolidadas por separado).
  - Ejercicio 2024-25: `cuentas-anuales-2024-2025.pdf`.
  - Todos bajados de `valenciacf.com/public/Attachment/<año>/<mes>/<archivo>.pdf` — un patrón de CDN
    con carpetas por fecha de subida (no por ejercicio), encontrado vía resultados de búsqueda, no
    navegando una página de transparencia (no se encontró ninguna página de transparencia navegable
    con curl/WebFetch en el dominio principal).
- **Intento fallido de ir más atrás**: se encontró referencia a un ejercicio 2018-19
  (`VCF_ccaa_2018_2019.pdf`) alojado en un subdominio legado, `seguro.valenciacf.com` — el dominio no
  resuelve/no responde (timeout tanto en HTTP como HTTPS, exit code 28 de curl), parece dado de baja.
  No se intentó Wayback Machine para esta URL específica (archive.org estaba temporalmente caído en
  el momento de la búsqueda).
- Pendiente: ejercicios 2018-19 a 2022-23 (5 años) sin ubicar. Angulo a probar en el futuro: la
  página `valenciacf.com/accionistas` (existe, mencionada en resultados de búsqueda, no se navegó a
  fondo en esta sesión) probablemente tenga el archivo histórico completo con más años que los
  encontrados por búsqueda puntual; también reintentar `seguro.valenciacf.com` vía Wayback Machine
  cuando archive.org esté disponible.
- Contacto: `valenciacf.com/accionistas` (no explorado a fondo, próximo paso) y
  `valenciacf.com/public/Attachment/` (patrón de CDN donde viven los PDFs ya encontrados).
- Último chequeo: 2026-09-13.
- Color de marca: `#E23C07` — tabla por liga de footylogos (LaLiga), 1er color, exacto, verificado
  2026-09-21. Camiseta blanca: que se represente con el naranja del murciélago es decisión de
  Guido de la Versión 178.

## Sourcing España/Francia (2026-10-03)

El pendiente de la sesión 2026-09-13 ("probar seguro.valenciacf.com vía Wayback") se resolvió: el subdominio legado SÍ está archivado. Bajados: 2018-19 y 2019-20 (individuales, escaneos de 63-64 págs.; carátula "Valencia Club de Fútbol S.A.D., 30 de junio de 2019/2020" verificada por imagen), 2021-22 (individual + consolidadas "GRUPO con EINF", 67 y 164 págs.) y 2022-23 (individual + consolidadas, 68 y 170 págs., desde `valenciacf.com/public/Attachment/2024/2/`). Con 2023-24 y 2024-25 que ya había → **6 ejercicios 2018-19 a 2024-25** (hueco: 2020-21; no apareció en ningún listado, se podría intentar de nuevo cuando Wayback vuelva).

PDFs guardados en `Clubes/España/Valencia CF/` (no se transcribieron ni se cargaron al sitio). Último chequeo: 2026-10-03.

## WorldFootball (sourcing 2026-10-08, año 2023)

Ficha financiera de WorldFootball (`worldfootball.com/financials`, sección «Financial history» del club): 1 PDF de WorldFootball (`wf-<temporada>-<hash>.pdf`: temporadas 2024-2025; `wf-src-*`: 0 documentos del propio club enlazados desde la ficha). Son espejos de los informes oficiales publicados por el club o la liga (fuente secundaria, `secondary_mirror`); el nombre `wf-<temporada>-<hash8>` lleva el hash del archivo. Los documentos de liga (iguales para varios clubes) están en `_WorldFootball-documentos-de-liga/` del país. Sin transcribir ni cargar.
