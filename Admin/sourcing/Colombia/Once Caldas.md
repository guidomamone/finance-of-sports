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
  - **CORRECCIÓN (2026-09-28, to-do 50): la nota "RESUELTO el 2026-09-22" de abajo estaba
    incompleta** — solo se habían bajado 2016-2020 (más el 2025 original), NO los 9 que decía. Los
    4 años realmente faltantes (**2021, 2022, 2023, 2024**) se bajaron recién en esta sesión, con
    el mismo flujo de API (radicados 2022-01-250977 a 2025-01-273348, 1 proceso a la vez). Ahora sí
    los 10 cortes 2016-2025 están completos en `Clubes/Colombia/Once Caldas/`, capa de texto real
    verificada con `pdftotext` en los 4 nuevos. Pendiente el paso de transcripción completa a `.md`
    (pipeline Mistral, `CLAUDE.md` "Cada PDF nuevo") para los años sin abrir.
    - **Sin abrir todavía (salvo 2025)** — esta sesión es sourcing puro. Vale especialmente la pena
      revisarlos: el PDF de 2025 resultó ser solo las NOTAS (sin el Estado de Situación Financiera
      ni el Estado de Resultado Integral primarios como tabla aparte), lo que obligó a usar un
      residuo para el impuesto y dejó una duda abierta en `Admin/dudas-por-club.md`. Si algún
      ejercicio anterior sí trae los estados primarios completos, serviría para validar el criterio
      que se usó en 2025.
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
- Último chequeo: 2026-09-22.

## Barrido 2026-10-08 (año de sourcing 2023)

**Ángulos**: regulador/país (SIIS): agotado — se bajaron todos los ejercicios con documentos (API; ver `_notas-generales.md`) · barrido: 2 (Sonnet) — 2026-10-08

Estados financieros en disco ahora: 10 ejercicios (2016-2025), cada uno con certificación y dictamen del revisor fiscal cuando SIIS los tiene. Los años que faltan son registros de SIIS sin documentos depositados.
