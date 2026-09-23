# Envigado (Envigado Fútbol Club S.A.)

- **El mejor hallazgo de esta sesión: 10 ejercicios consecutivos en SIIS (2016-2025), auditados por
  Grant Thornton.** 3 PDFs del ejercicio 2025 descargados a `Clubes/Colombia/Envigado/`:
  `estados-financieros-2025.pdf` (44 páginas, portada confirmada visualmente — "Estados Financieros
  Individuales, ENVIGADO FÚTBOL CLUB S.A., Al 31 de diciembre de 2025 (con cifras comparativas al 31
  de diciembre de 2024), junto con el informe del Revisor Fiscal", membrete Grant Thornton; es un
  PDF escaneado sin capa de texto, `pdftotext`/`pdffonts` no devuelven nada — necesitará OCR cuando
  se transcriba) + `dictamen-revisor-fiscal-2025.pdf` + `certificacion-ef-2025.pdf` — vía SIIS, NIT
  900470848 (búsqueda por NIT, punto de entrada "Pymes-Individuales", corte 2025-12-31). Cifras
  (vista SIIS): Activos $22.370.074 M, Pasivos $7.321.329 M, Patrimonio $15.048.745 M, Ingresos
  $36.888.980 M, Ganancia $7.635.223 M (utilidad) — ROE 50,74%, ROA 34,13%, el club más rentable de
  todo el barrido colombiano hasta ahora. Sin procesos activos en Supersociedades (0/0).
  - **RESUELTO el 2026-09-22.** Se verificó que los 10 ejercicios siguen disponibles (2016 a 2025,
    los 10 cortes bajo el mismo NIT, cada uno con sus 3 documentos: NOTAS EF, DICTAMEN DEL REVISOR
    FISCAL y CERTIFICACION EF) y se bajaron los 9 que faltaban. Se hizo con el flujo por API que se
    descubrió esta sesión y que está documentado en `fuentes/Colombia/_notas-generales.md` — sin
    browser, todo con `curl`.
    - **Ojo, hubo una trampa acá**: el campo `documentos_adicionales` del índice de Elasticsearch de
      SIIS viene VACÍO para todos los cortes de 2021 en adelante, así que a primera vista parecía
      que Envigado solo tenía documentos hasta 2020. No es cierto: el endpoint
      `plantillas-api/documentos-adicionales` los devuelve bien para los 10 años. Si una sesión
      futura ve "0 documentos" en un ejercicio reciente de cualquier club colombiano, es este bug
      del índice, no una ausencia real.
    - **Sin abrir todavía**: esta sesión es sourcing puro, no se verificó el contenido de ninguno de
      los 9 ejercicios nuevos ni si son escaneos sin capa de texto como el de 2025 (que necesitó
      OCR). Hay que chequearlo por año antes de transcribir.
    - Con esto Envigado pasa a ser el club con la serie más larga de todo el barrido colombiano, y
      sigue siendo el mejor candidato para cargar una serie histórica completa.
- Contacto: siis.ia.supersociedades.gov.co (NIT 900470848); envigadofc.co.
- **CARGADO al sitio (sesión 2026-09-13, Ejercicio 2025 únicamente, a propósito — ver
  dudas-por-club.md/CHANGELOG.md sobre el pedido explícito de ampliar clubes en vez de profundizar
  uno; los otros 9 ejercicios ya están en disco desde el 2026-09-22, listos para onboardear)**: ver `data/envigado-data.js`. Transcripto vía OCR (Tesseract, el escaneo no tiene capa de
  texto). A diferencia de Once Caldas/Deportes Tolima, este PDF SÍ incluye el Estado de Resultado
  Integral primario completo (no solo notas) — reconciliación EXACTA sin ningún residuo, la carga de
  mayor confianza de las 3 investigadas esta sesión. fx usado: TRM oficial al 31/12/2025 ($3.757,08
  COP/USD, Superintendencia Financiera de Colombia) — el documento no declara su propio tipo de
  cambio. Verificado en navegador: `verifyTieOuts()` cierra los 3 checks (Revenue/Expenses/PAT),
  Finanzas renderiza sin errores. Los 9 ejercicios restantes (2016-2024) quedaron pendientes de CARGA, pero sus PDFs ya
  están descargados (2026-09-22).
- Último chequeo: 2026-09-22.
- Color de marca: `#ED7039` — tabla por liga de footylogos (Categoría Primera A), 1er color,
  exacto, verificado 2026-09-21.
