# Once Caldas (Once Caldas S.A. en Reorganización)

- **Hit fuerte vía SIIS, mismo patrón que el resto del barrido colombiano.** 3 PDFs descargados a
  `Clubes/Colombia/Once Caldas/`: `estados-financieros-2025.pdf` (34 páginas, "ESTADOS FINANCIEROS
  Al 31 de diciembre de 2025 y 2024 e Informe del Revisor Fiscal", texto real confirmado con
  `pdftotext`) + `dictamen-revisor-fiscal-2025.pdf` (6 páginas) + `certificacion-ef-2025.pdf` — vía
  SIIS, NIT 890801447 (búsqueda por NIT, punto de entrada "Pymes-Individuales", corte 2025-12-31).
  Cifras (vista SIIS): Activos $44.767.223 M, Pasivos $19.305.198 M, Patrimonio $25.462.025 M,
  Ingresos $58.810.323 M, Ganancia (utilidad, no pérdida) $9.138.546 M — ROE 35,89%, ROA 20,41%,
  llamativamente rentable para un club en este universo. Dato de color: el propio PDF confirma en su
  Nota 1 que la sociedad SIGUE en un proceso de reorganización empresarial abierto desde 2012 (Auto
  del 02-ago-2012 de la Superintendencia de Sociedades), aunque la Vista 360 muestra 0 "procesos
  activos" listados en su ficha — posible desactualización de ese contador puntual, no del estado
  real de la sociedad.
  - Hay historial de al menos 2 ejercicios más en SIIS (2024, y anteriores) sin explorar todavía —
    quedan pendientes para una sesión futura si se quiere serie histórica.
- Contacto: siis.ia.supersociedades.gov.co (NIT 890801447); oncecaldas.co.
- **CARGADO al sitio (sesión 2026-09-13, Ejercicio 2025 únicamente)**: ver `data/oncecaldas-data.js`.
  El PDF `estados-financieros-2025.pdf` (a pesar del nombre) son las NOTAS a los estados financieros
  (34 páginas), no incluye el Estado de Situación Financiera/Estado de Resultado Integral primario
  como tabla aparte. El resultado del ejercicio ($9.138,546 M COP) se confirmó triple dentro del
  propio documento (tabla de indicadores de negocio en marcha, Nota 2; narrativa del Informe del
  Revisor Fiscal; y la vista SIIS de arriba) — pero no se pudo reconciliar línea por línea sin usar
  un residuo para el impuesto (ver `dudas-por-club.md`, sección Once Caldas, para el detalle
  completo y la pregunta pendiente). fx usado: TRM oficial al 31/12/2025 ($3.757,08 COP/USD,
  Superintendencia Financiera de Colombia) — el documento no declara su propio tipo de cambio.
  Verificado en navegador: `verifyTieOuts()` cierra los 3 checks (Revenue/Expenses/PAT), Finanzas
  renderiza sin errores.
- Último chequeo: 2026-09-13.
