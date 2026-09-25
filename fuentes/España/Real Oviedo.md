# Real Oviedo, S.A.D.

- **Hit bueno (2026-09-16).** 1 ejercicio real descargado a `Clubes/España/Real Oviedo/`, encontrado
  navegando `realoviedo.es/ley-de-transparencia` con el browser (carga con contenido real):
  - `cuentas-anuales-2024-2025.pdf` (65 págs.) — link "cuentas anuales del club" en la propia página,
    host `statics-maker.llt-services.com/ovi/...` (mismo CMS compartido, ver `_notas-generales.md`).
    Consistente con la nota de prensa citada en la búsqueda de esta sesión: ejercicio jul-2024 a
    jun-2025, pérdidas de 5,5M€.
  - La misma página linkea también "cuentas anuales de entidades vinculadas" (2022, entidades del
    grupo, no el club) y "las cuentas anuales individuales" del ejercicio 2020-21
    (`files.proyectoclubes.com/oviedo/202201/19102746ro-ccaa-20-21-auditadas.pdf`) — **este último NO
    se pudo descargar esta sesión**: `curl` dio timeout de conexión (`Failed to connect ... Operation
    timed out`) dos veces contra `files.proyectoclubes.com`, sin llegar a un error HTTP (no es 403 ni
    bloqueo confirmado, puede ser un problema de red temporal del host o del entorno). Reintentar en
    una sesión futura antes de asumir que es un dead-end — ver `_notas-generales.md`.
- Pendiente: ejercicios 2021-22 a 2023-24 (huecos entre 2020-21 y 2024-25), y reintentar la descarga
  de 2020-21.
- Contacto: `realoviedo.es/ley-de-transparencia`.
- Último chequeo: 2026-09-16.

## Cargado a Finanzas (2026-09-25)

- Ejercicio 2024/25 cargado en `data/realoviedo-es-data.js` (`clubId: 'realoviedo-es'`), a partir de
  `Clubes/España/Real Oviedo/cuentas-anuales-2024-2025.md` — mucho menos ruido de OCR que Mallorca
  (cada fila y su número quedaron en la misma línea de la transcripción), reconcilió exacto (con
  redondeo ≤2 EUR) contra "Resultado del ejercicio" (-5.578.650), impreso tanto en la Cuenta de
  P&G como en el Balance. Pérdida neta del ejercicio, consistente con la nota de prensa citada al
  encontrar el documento (pérdidas de 5,5M€).
- Color de marca: `#0033A0` (azul) — Wikipedia en español declara "Azul y Blanco" con el azul en
  PANTONE 286C, hex convertido de ese Pantone (crispedge.com, icolorpalette.com), verificado
  2026-09-25.
- Pendiente sigue igual: ejercicios 2021-22 a 2023-24, y reintentar 2020-21.
