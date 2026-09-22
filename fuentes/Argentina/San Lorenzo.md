# San Lorenzo de Almagro

- Archivo oficial de balances — sanlorenzo.com.ar/club/balances (página índice dedicada). Descargados
  9 PDFs reales a `Clubes/Argentina/San Lorenzo/`: memorias y balance completos de los ejercicios
  2011-12 a 2016-17 (6 archivos), Informe de Gestión narrativo 2012-2019, y Presupuesto + Pautas de
  Presupuesto del ejercicio 2023-24.
- **7 ejercicios consecutivos YA CARGADOS en el sitio: 2011 a 2017** (Versión 95: 2012-13/2013-14;
  Versión 99: se completó el resto vía OCR — 2011-12 auditado por Deloitte, 2014-15/2015-16/2016-17
  auditados por Bertora y Asociados). SUPERÁVIT/DÉFICIT reales: DÉFICIT 2011 $(41.645.487) / DÉFICIT
  2012 $(45.744.341) / SUPERÁVIT 2013 $32.929.698 / SUPERÁVIT 2014 $76.628.874 / SUPERÁVIT 2015
  $41.968.388 / SUPERÁVIT 2016 $33.377.884 / SUPERÁVIT 2017 $436.617 (prácticamente equilibrio,
  verificado). El balance 2013-14 (más corto, 19 páginas) sigue siendo el único sin Anexos de
  detalle por rubro — se cargó con ese nivel de agregación honesto. En el Anexo VI de 2016, la
  extracción OCR inicial no separaba bien 2 filas (Honorarios por servicios y Gastos de estadio) —
  se corrigieron releyendo la imagen de la página. Todo verificado línea por línea contra los
  totales impresos antes de cargar. Ver `data/sanlorenzo-data.js` para el detalle completo (incluye
  la gestión de Carlos Abdo, nueva en el sitio, cubriendo 2011-2012). El Informe de Gestión
  (2012-2019) es narrativo, no se usó.
- Último chequeo: 2026-09-12.
- **Presupuesto 2023-2024 YA CARGADO en el sitio (8vo ejercicio del club)**: la transcripción
  original (`presupuesto-2023-2024.md`) tenía la tabla mal alineada por un artefacto de
  `pdftotext -layout` (no por el documento en sí, que está bien armado) — se re-leyó directo de
  imágenes de la página (300dpi) para reconstruir la tabla real. Solo se cargó la sección
  "Ordinaria" (Ingresos/Egresos de la operación normal); la sección "Extraordinaria" (financiamiento,
  obras, compra/venta de jugadores en términos de caja, cancelación de deuda) se dejó afuera a
  propósito — ver `.claude/skills/club-data-mapping/SKILL.md` sección 16 y `dudas-por-club.md`.
  Resultado Ordinario real: $5.947.747.189 ARS. Las Pautas del Presupuesto (`pautas-presupuesto-
  2023-2024.md`) sí se usaron, para entender qué significa cada rubro antes de categorizarlo.
- Pendiente: balances de los ejercicios 2017-18 a 2024-25 — no están en /club/balances ni responden al
  patrón de URL usado para los años ya bajados (dan 301 hacia una ruta que devuelve 404). Prensa propia
  del club confirma que el balance 2022-23 fue aprobado en asamblea el 15/12/2023, pero el PDF no está
  público ahí. Vale revisar si existe un programa "CASLA Transparente" de datos abiertos mencionado por
  el BID, con otra ubicación no encontrada en esta sesión.
- Contacto: la página sanlorenzo.com.ar/club/balances ya es el canal de publicación oficial; para pedir
  años faltantes, Prensa/Socios del sitio oficial.
- Color de marca: `#00325A` — `theme-color` del sitio oficial (`sanlorenzo.com.ar`), verificado
  2026-09-21. Es el desempate (c) de un bicolor azul y rojo en partes iguales; la tabla por liga
  de footylogos ordena por escudo y da el rojo primero.
