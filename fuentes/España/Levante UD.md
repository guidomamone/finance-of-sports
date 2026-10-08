# Levante Unión Deportiva, S.A.D.

**Ángulos**: sitio oficial: agotado (CMS LaLiga statics-maker, 81 PDFs) · Wayback CDX: agotado (prefijo del CMS) · búsqueda web: no intentado · regulador/país: no aplica · barrido: 2 (Sonnet) — 2026-10-03

- **Hit bueno (2026-09-16).** 1 ejercicio real (consolidado) descargado a `Clubes/España/Levante UD/`,
  encontrado por búsqueda puntual del PDF directo en `statics-maker.llt-services.com/lev/...` (mismo
  CMS compartido, ver `_notas-generales.md`), sin navegar `levanteud.com/es/transparencia`:
  - `cuentas-anuales-consolidadas-2024-2025.pdf` (130 págs., **con capa de texto real**, `pdftotext`
    funciona sin OCR) — confirmado por texto interno "Levante Unión Deportiva, S.A.D. y Sociedades
    dependientes, Cuentas Anuales Consolidadas e Informe de Gestión Consolidado de 2024-25, Incluye
    Informe de Auditoría de Cuentas Anuales Consolidadas, 30 de junio de 2025".
  - Es la versión CONSOLIDADA (grupo, no solo la S.A.D. individual) — ojo al mapear, releer
    `club-data-mapping` sobre individual vs. consolidado si el club tiene sociedades dependientes con
    actividad no futbolística relevante.
- Prensa (citada en la búsqueda) menciona pérdidas de 12,9M€ y deuda de ~160,7M€ para este mismo
  ejercicio 2024-25 — útil como cifra de control para `verifyTieOuts()` cuando se mapee.
- No se navegó la página de transparencia propia del club esta sesión — pendiente para buscar
  ejercicios individuales (no consolidados) y años anteriores.
- Pendiente: todos los ejercicios anteriores a 2024-25, y la versión individual (no consolidada) de
  2024-25 si existe por separado.
- Contacto: `levanteud.com/es/transparencia`.
- Último chequeo: 2026-09-16.
- **CARGADO al sitio (2026-09-25)**: único ejercicio disponible, 2024-25, `data/levante-es-data.js`
  (clubId `levante-es`). Tie-out exacto. Jugado en Segunda División (el ascenso vía playoff, en
  junio de 2025, fue el RESULTADO de este mismo ejercicio, para la temporada 2025/26). `brandColor`
  sin resolver — kit a mitades azul/granate sin predominancia declarada, mismo caso que Crystal
  Palace (ver `Admin/dudas-por-club.md`).

## Sourcing España/Francia (2026-10-03)

Del CMS (`statics-maker.llt-services.com/lev/documents/`) se bajaron las cuentas individuales **2022-23** (87 págs., 2024/02/26; hay una segunda copia de 94 págs. subida 2024/03/14, guardada como `-copia-2`, mismo ejercicio), **2023-24** individuales (101 págs.) y consolidadas (124 págs.), **2024-25** individuales (113 págs.; la consolidada ya estaba) y la **Memoria anual 2021-22** (170 págs., sin confirmar si trae las cuentas adentro). → **3 ejercicios con cuentas + 1 memoria**. Contexto: el CMS de octubre 2025 trae el plan de reestructuración del club (informe de viabilidad, deuda con Bridge/Fasanara, valoración DYO) — material relevante para la duda de deuda, no bajado.

PDFs guardados en `Clubes/España/Levante UD/` (no se transcribieron ni se cargaron al sitio). Último chequeo: 2026-10-03.

### Documentos de reestructuración 2025 (bajados 2026-10-03)

Del mismo CMS (`statics-maker.llt-services.com/lev/documents/2025/10/09/...`, host oficial del club) se
bajaron 14 PDFs a `Clubes/España/Levante UD/reestructuracion-2025/`: plan de reestructuración
(70 págs., 9-oct-2025), plan de viabilidad ES/EN (19 págs.), valoración del club DYO Sports Finance
(julio 2025, 14 págs.) e informe de valoración DYO (9 págs.), informe de valoración de bienes en
garantía (18 págs.), credit facilities agreement (151 págs., Levante UD Nuevos Desarrollos / Bridge
Securitisation), términos propuestos EDR y Fasanara (ES/EN), relaciones de acreedores afectados y no
afectados, clasificación de acreedores y créditos litigiosos. Son documentos de deuda, no estados
contables: sirven para la duda de deuda/`grossDebt`, no como ejercicio. No se bajaron las pólizas
notariales, la hipoteca (133 págs.), las tasaciones ni las adhesiones al acuerdo de deuda.

## WorldFootball (sourcing 2026-10-08, año 2023)

Ficha financiera de WorldFootball (`worldfootball.com/financials`, sección «Financial history» del club): 1 PDF de WorldFootball (`wf-<temporada>-<hash>.pdf`: temporadas 2024-2025; `wf-src-*`: 0 documentos del propio club enlazados desde la ficha). Son espejos de los informes oficiales publicados por el club o la liga (fuente secundaria, `secondary_mirror`); el nombre `wf-<temporada>-<hash8>` lleva el hash del archivo. Los documentos de liga (iguales para varios clubes) están en `_WorldFootball-documentos-de-liga/` del país. Sin transcribir ni cargar.
