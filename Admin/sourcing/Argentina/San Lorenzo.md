# San Lorenzo de Almagro

**Ángulos**: sitio oficial: agotado (`/club/balances` releído en crudo, HTML completo — la lista de
PDFs no cambió desde 2023) · Wayback CDX: agotado (dominio completo + subdominios contenidos1/
contenidos2) · búsqueda web: agotado (dirigida, más "CASLA Transparente" investigado y confirmado
caído) · regulador/país: no aplica — 2026-09-26.

- **Ejercicios 2018-19, 2021-22, 2022-23 y 2023-24: los CUATRO confirmados por prensa/noticias
  oficiales del club como aprobados en asamblea, con cifras reales citadas, pero NINGUNO subido a
  `/club/balances` — candidato a mail fuerte (2026-09-26).** El patrón es sistemático, no un año
  suelto: la página oficial de balances no se actualiza con el PDF real desde 2017 (solo se agregó
  el Presupuesto 2023-24 en 2026), pese a que el club sí redacta y aprueba el documento cada año:
  - 2018-19 (01/07/18-30/06/19): superávit USD 5.014.042, aumento de patrimonio neto 240% en dólares.
  - 2021-22: superávit $1.148M ARS, tratado en asamblea del 16/12.
  - 2022-23: superávit $509M ARS, patrimonio neto $7.358M ARS (noticia
    `sanlorenzo.com.ar/club/noticias/1702688572_ball` — sin PDF adjunto, verificado en el HTML crudo).
  - 2023-24: aprobado CON OBSERVACIONES (27 a favor, 19 en contra, 1 abstención) por reservas del
    auditor externo sobre documentación de ciertas deudas (noticia
    `.../1770693881_balance-2023-2024-aprobado-con-observaciones` — tampoco tiene PDF adjunto).
  - Se verificó el HTML crudo (no la versión markdown de WebFetch) de las 3 noticias más relevantes y
    de `/club/balances`: CERO menciones a `.pdf` fuera de los 8 archivos ya conocidos (balance
    2012-2017, presupuesto+pautas 2023-24, informe de gestión 2012-2019). Wayback CDX del dominio
    completo (incluye `contenidos1.`/`contenidos2.sanlorenzo.com.ar`) confirma lo mismo: nunca se
    archivó ningún PDF de balance posterior a 2017.
  - **CASLA Transparente** (`datos.sanlorenzo.com.ar`, portal de datos abiertos lanzado bajo la
    presidencia de Matías Lammens, ~2016-2018, con la promesa de mostrar movimientos en tiempo real):
    el dominio ya NO RESUELVE (connection failure) — proyecto discontinuado, no es un canal vigente.
  - Presupuesto 2024-25 SÍ fue aprobado y tratado (gastos $55.663M / ingresos $56.099M ARS, noticia
    `.../1722469093_asamblea`) pero tampoco tiene el PDF adjunto ni aparece en `/club/balances`.
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
- **Presupuesto 2023-2024 YA CARGADO en el sitio (8vo ejercicio del club)**: la transcripción
  original (`presupuesto-2023-2024.md`) tenía la tabla mal alineada por un artefacto de
  `pdftotext -layout` (no por el documento en sí, que está bien armado) — se re-leyó directo de
  imágenes de la página (300dpi) para reconstruir la tabla real. Solo se cargó la sección
  "Ordinaria" (Ingresos/Egresos de la operación normal); la sección "Extraordinaria" (financiamiento,
  obras, compra/venta de jugadores en términos de caja, cancelación de deuda) se dejó afuera a
  propósito — ver `.claude/skills/club-data-mapping/SKILL.md` sección 16 y `dudas-por-club.md`.
  Resultado Ordinario real: $5.947.747.189 ARS. Las Pautas del Presupuesto (`pautas-presupuesto-
  2023-2024.md`) sí se usaron, para entender qué significa cada rubro antes de categorizarlo.
- Pendiente: balances de los ejercicios 2017-18 a 2024-25 (ver arriba, mail candidate) — confirmado
  que NO están en `/club/balances` ni en ningún snapshot de Wayback, y CASLA Transparente está
  discontinuado. Sin ángulo nuevo posible sin contactar al club directamente.
- Contacto: la página sanlorenzo.com.ar/club/balances ya es el canal de publicación oficial; para pedir
  años faltantes, Prensa/Socios del sitio oficial (socios@sanlorenzo.com.ar, WhatsApp institucional
  mencionado en las noticias de balance).
- Color de marca: `#00325A` — `theme-color` del sitio oficial (`sanlorenzo.com.ar`), verificado
  2026-09-21. Es el desempate (c) de un bicolor azul y rojo en partes iguales; la tabla por liga
  de footylogos ordena por escudo y da el rojo primero.
