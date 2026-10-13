# Talleres (Córdoba)

**Ángulos**: sitio oficial: agotado (media library completa vía `wp-json/wp/v2/media` filtrada por
fecha, 2019-2023, 0 EECC — solo 1 infográfico no cargable) · Wayback CDX: no aplica a esta ronda (ya
agotado en sesión anterior, 0 PDFs archivados en el dominio) · búsqueda web: no intentado esta ronda
(la media library ya dio evidencia completa) · regulador/país: no aplica — 2026-09-26

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

## Chequeo 2026-09-26 — se buscaron ejercicios anteriores a 2024, ninguno cargable nuevo

Sesión de sourcing puro (5 clubes del interior). Tarea puntual y liviana: ver si hay ejercicios
2020-2023 fáciles de conseguir en el mismo sitio, además de los 2 EECC ya cargados (2024/2025).

- En vez de seguir adivinando nombres de URL (ya agotado en la sesión anterior: 7 meses candidatos
  × 3 años, todos 404), esta vuelta usó la media library completa de WordPress vía
  `wp-json/wp/v2/media?media_type=application`, filtrada por rango de fecha (`after`/`before`) —
  lista TODOS los archivos subidos al sitio en ese período, estén o no linkeados desde algún post.
  Cubrí 2019 a 2023 completo (varias ventanas solapadas). **0 archivos con patrón EECC/balance
  encontrados** en ningún año antes de 2024 — la primera vez que aparece algo con "EECC" en el
  nombre es la subida de abril 2025 (el de 2024, ya cargado). Esto es evidencia más fuerte que la
  adivinanza de URLs: no es "no se encontró con los nombres que probé", es "no existe
  NINGÚN archivo subido al sitio en esos años que matchee ese patrón, esté o no linkeado desde
  algún post".
- Sí apareció `Asamblea-2023-1-Reporte.pdf` (mayo 2023, 17 págs, Adobe Illustrator) — **mismo
  formato infográfico que el `asamblea-social-2024.pdf` ya descartado en la Versión 95**: solo
  porcentajes de composición de ingresos y gráficos de evolución 2015-2022, sin una sola cifra
  absoluta de un Estado de Recursos y Gastos. No descargado al proyecto (no aporta nada que el
  `asamblea-social-2024.pdf` ya descartado no mostrara). Confirma que el patrón "reporte
  infográfico ≠ EECC real" se repite todos los años en este club.
- **Conclusión: pendiente 2020-2023 queda CERRADO como dead-end**, no como "a seguir buscando". El
  club aparentemente no publicó EECC en PDF real antes de 2024 (o si lo hizo, no está en la media
  library del sitio actual, que sí tiene TODO lo demás de esos años). Ángulo que queda, ya
  documentado desde antes: pedírselo directo por mail a
  consultasasamblea@clubtalleres.com.ar — no reintentado esta sesión (fuera de alcance: sourcing
  puro, no outreach).
- Último chequeo: 2026-09-26.
