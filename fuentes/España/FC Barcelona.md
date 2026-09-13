# FC Barcelona

- **Hit fuerte, serie larguísima (2026-09-13).** 22 ejercicios anuales consecutivos, del 2003-04 al
  2024-25, descargados a `Clubes/España/FC Barcelona/`: `memoria-2003-04.pdf` a `memoria-2024-25.pdf`
  ("Memoria" del club, el documento anual con actividad deportiva/social/institucional Y el área
  económica completa: balance, cuenta de pérdidas y ganancias, cambios en patrimonio neto, flujos de
  efectivo e informe de auditoría). Sin ningún año faltante en el rango 2003-2025.
  - El club publica esta serie completa desde temporada **1978-79** en
    `fcbarcelona.es/es/club/organizacion-y-plan-estrategico/comisiones-y-organos/reportes-anuales`
    (confirmado por WebFetch, con URL exacta por año) — no se bajaron los años anteriores a 2003-04
    en esta sesión por priorizar tiempo en los otros 9 clubes, pero la serie completa 1978-2003 (25
    años más) está lista para bajar en una sesión futura con el mismo método (son todas URLs
    directas, sin trampa de navegación).
- Además, para el ejercicio 2024-25 se consiguió el documento oficial separado y más corto
  (`cuentas-anuales-y-auditoria-2024-25.pdf`, "Cuentas Anuales y Auditoría" — la versión sin el
  contenido narrativo/institucional de la Memoria) y el reporte de `endeudamiento-2024-25.pdf`
  (deuda), ambos de la sección de transparencia legal/económica
  (`fcbarcelona.es/es/club/transparencia/informacion-legal-institucional-y-economica`), distinta de
  la sección de Memorias para socios.
- **Cómo se encontró**: a diferencia de Real Madrid, la página de reportes anuales de
  `fcbarcelona.es` SÍ devolvió el listado completo de PDFs directamente vía WebFetch (sin necesitar
  `curl` ni trucos de host alternativo) — los archivos están hospedados en varios dominios/CDN
  distintos según el año (`fcbarcelona.com/fcbarcelona/document/...`,
  `fcbarcelona-static-files.s3.amazonaws.com`, `platform-static-files.s3.amazonaws.com/HawkEye/...`),
  todos descargables directo con `curl` sin bloqueo.
- Pendiente: la serie 1978-79 a 2002-03 (25 años, URLs ya identificadas, ver arriba) queda para una
  sesión futura. También quedó sin bajar el "Indicador 47"/"Indicador 48" (otros indicadores de
  transparencia económica LaLiga que el club publica aparte).
- Contacto: `fcbarcelona.es/es/club/organizacion-y-plan-estrategico/comisiones-y-organos/reportes-anuales`
  (serie histórica completa de Memorias) y
  `fcbarcelona.es/es/club/transparencia/informacion-legal-institucional-y-economica` (cuentas
  anuales y auditoría del ejercicio más reciente, por separado).
- Último chequeo: 2026-09-13.
