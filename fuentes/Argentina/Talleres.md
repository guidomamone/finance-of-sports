# Talleres (Córdoba)

- **Estados Contables completos, ejercicios 2024 y 2025 — ENCONTRADOS 2026-09-22, el club pasa de
  "sin cifras cargables" a tener 2 ejercicios auditados reales.** Ambos con capa de texto nativa
  (cero OCR necesario), ejercicio de AÑO CALENDARIO (1/1 a 31/12), no temporada:
  - `clubtalleres.com.ar/wp-content/uploads/2026/04/EECC-CLUB-ATLETICO-TALLERES-31.12.2025.pdf`
    (56 págs) — "Estados Contables por ejercicio iniciado el 01 de enero del 2025 finalizado el 31
    de diciembre de 2025 presentados conjuntamente con el Informe del Auditor, Memoria e Informe de
    Comisión Revisora de Cuentas". Firmado 31/03/2026 (Pablo Ariel Gómez, CP, M.P. 10-15423-2
    C.P.C.E. Cba.). Descargado en `Clubes/Argentina/Talleres/estados-contables-2025.pdf`.
  - `clubtalleres.com.ar/wp-content/uploads/2025/09/EECC-CLUB-ATLETICO-TALLERES-31.12.2024.pdf`
    (53 págs) — mismo formato, ejercicio 2024. Descargado en
    `Clubes/Argentina/Talleres/estados-contables-2024.pdf`.
  - **Cómo se llegó**: NO están linkeados desde ninguna sección fija de "transparencia" del sitio —
    cada uno cuelga de UNA nota de prensa distinta del año de su asamblea. El de 2025 está en
    `/asamblea-social-2026-estados-contables/`; el de 2024, en
    `/recursos-genuinos-equilibrio-superavit-inversion-y-crecimiento-patrimonial/` (un título que no
    menciona ni "balance" ni "estados contables"). La forma de encontrarlos fue listar TODOS los
    posts que matchean `asamblea`/`balance`/`ejercicio` vía
    `clubtalleres.com.ar/wp-json/wp/v2/search?search=...` y abrir cada uno buscando `href` a `.pdf`
    — ver la nota de metodología en `_notas-generales.md`.
- Asamblea Social 2024 (Memoria + Balance Económico + Reporte de Sustentabilidad, ejercicio 2024) —
  clubtalleres.com.ar/wp-content/uploads/2025/03/Asamblea-Social-2024.pdf — descargado en
  `Clubes/Argentina/Talleres/asamblea-social-2024.pdf`.
  **Revisado a fondo en la Versión 95: no tiene datos cargables.** Es un reporte infográfico
  (porcentajes de composición de ingresos, gráficos de barras acumulados multi-año 2015-2023), no un
  Estado de Recursos y Gastos de un ejercicio puntual con cifras absolutas por rubro — reconstruir
  valores desde los porcentajes sería inventar, no transcribir. **Este documento queda superado por
  los 2 EECC reales de arriba: para cargar el ejercicio 2024 usar el EECC, no este infográfico.**
- Pendiente: ejercicios 2023 y anteriores. Se probó adivinar el patrón de URL
  (`EECC-CLUB-ATLETICO-TALLERES-31.12.<año>.pdf` en `uploads/<año+1>/<mes>/`, 7 meses candidatos
  por año, 2022-2024): todos 404 salvo los 2 que ya están arriba. El índice de Wayback Machine de
  `clubtalleres.com.ar` no tiene NINGÚN PDF archivado (0 resultados en la CDX API), así que esa vía
  tampoco sirve para recuperar años viejos. El ángulo que queda es pedírselos al club (ver contacto).
- Contacto: consultasasamblea@clubtalleres.com.ar (mail específico para consultas de la rendición de
  cuentas).
- **CARGADO 2026-09-23: onboarding inicial del club, 2 ejercicios (`data/talleres-ar-data.js`,
  `clubId:'talleres-ar'`).** Ejercicios 2024 y 2025, ejercicio CALENDARIO (1/1-31/12).
  `sourceId`s: `talleres-ar-estados-contables-2024` / `talleres-ar-estados-contables-2025`. Los dos
  EECC de arriba, transcriptos completos a `estados-contables-2024.md` / `estados-contables-2025.md`
  (texto nativo, sin OCR). Verificación numérica: revenueLines/expenseLines cierran EXACTOS contra
  "Total Recursos"/"Total Gastos" impresos y contra el "RESULTADO DEL EJERCICIO - SUPERAVIT" de cada
  balance (13.196.433.268 ARS en 2024, 562.655.312 ARS en 2025), sin ningún residuo. El tipo de
  cambio NO está declarado de forma explícita por ninguno de los 2 Anexos de moneda extranjera
  (Anexo V/VI) — quedó con `fxSource:'market_close'` pendiente de que se agreguen
  `ARS@2024-12-31`/`ARS@2025-12-31` a `FX_CLOSE` (`data/currency-map.js`).
  **Color de marca: `#040D2D` (azul marino) — identidad confirmada por es.wikipedia.org (infobox
  del club, "azul y blanco"/"albiazul", colores inspirados en el Blackburn Rovers, sin cambios
  históricos), hex vía footylogos.com/es/color-codes/liga-profesional-argentina, verificado
  2026-09-23.**
- Último chequeo: 2026-09-23.
