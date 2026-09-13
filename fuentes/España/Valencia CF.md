# Valencia Club de Fútbol, S.A.D.

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
