# LDU Quito (Liga Deportiva Universitaria de Quito)

- **Actualización 2026-09-13 — contexto que cambia cómo leer el hallazgo de abajo.** Esta sesión
  confirmó (ver `_notas-generales.md`, sección nueva) que a septiembre de 2026 NINGÚN club
  ecuatoriano opera todavía como S.A.D.P./SAD — la reforma legal recién se aprobó (Ley Orgánica del
  Deporte reformada, publicada 11-feb-2026) y el reglamento operativo de la Superintendencia de
  Compañías recién se emitió el 24-jun-2026; a la fecha del último artículo de prensa encontrado
  (agosto 2026) el único club en TODO el país que había siquiera presentado la documentación inicial
  para convertirse era 9 de Octubre (categoría inferior), y Barcelona SC apenas "analiza" el proceso
  (estimado 12-18 meses). Es decir: la "S.A.D.P. moderna para el fútbol" que la nota original de
  abajo daba por sentado que existía "en algún lado sin encontrar todavía" **no existe today para
  ningún club, LDU Quito incluido** — no es que quede pendiente encontrarla, es que estructuralmente
  no hay nada que encontrar todavía. El párrafo original (con la hipótesis de una S.A.D.P. separada)
  se deja abajo sin editar por transparencia del razonamiento previo, pero esa hipótesis específica
  queda descartada por esta actualización.
- **Hit real, pero de la entidad EQUIVOCADA — no cargar sin aclarar esto.** El propio sitio del club
  (ldu.org.ec/transparencia/) tiene una sección de transparencia con PDFs reales descargables:
  `Estado de Situación Financiera Diciembre 2022` y `Estado de Resultados 2022`
  (ldu.org.ec/wp-content/uploads/2023/06/), ambos firmados electrónicamente por el presidente y el
  contador general. PERO el encabezado dice explícitamente "Club Liga Deportiva Universitaria —
  **Consolidado Unidad Educativa-Country Club y Sede Social**": es el club social/civil (colegio,
  country club, cuotas de socios) — una entidad LEGALMENTE DISTINTA de "Liga Deportiva Universitaria
  de Quito S.A.D.P.", la sociedad anónima deportiva dueña del equipo de fútbol profesional (este es
  el mismo patrón dual que otros clubes históricos: un club social antiguo + una S.A.D.P. moderna
  para el fútbol). Los números de este documento (Activos totales $15.155.957, Patrimonio
  $12.996.321, resultado del ejercicio -$298.259) NO representan las finanzas del equipo de fútbol.
  Descargados de todas formas a `Clubes/Ecuador/LDU Quito/` con nombre de archivo con el prefijo
  `CUIDADO-club-civil-no-SADP-` para que quede clarísimo en el nombre del archivo, no solo en este
  texto.
- Pendiente: todo lo referido a la S.A.D.P. futbolística real — no se encontró. La página
  `ldu.org.ec/estados-financieros/` (separada de `/transparencia/`) tiene un visor de reportes
  mensuales tipo flipbook (enero-diciembre) que no se llegó a inspeccionar en profundidad (podría
  ser de la misma entidad social, o de otro año — no confirmado).
- Contacto: ldu.org.ec/transparencia/ (documentos del club social); supercias.gob.ec (portal de
  estados financieros, no operado con éxito para la S.A.D.P. en esta sesión — ver nota de la
  sección país arriba); bolsadequito.com/index.php/listado-de-emisores (a revisar directamente, no
  se encontró a LDU Quito mencionado en resultados de búsqueda pero tampoco se navegó el listado
  completo).
- **Actualización 2026-09-25 (sesión de onboarding/data-mapping, no de sourcing nueva) — CONFIRMADO,
  no se carga.** Se releyeron a fondo los 3 archivos ya descargados en
  `Clubes/Ecuador/LDU Quito/`. Primero, un hallazgo de catalogación: `ESTADO-DE-SITUACION-FINANCIERA-
  DICIEMBRE-2022.md` y `CUIDADO-club-civil-no-SADP-situacion-financiera-2022.md` son BYTE-IDÉNTICOS
  (mismo PDF, la única diferencia es el nombre de archivo citado en la línea 3 de la transcripción) —
  no son 2 documentos distintos, es 1 solo balance con 2 copias/nombres. El tercer archivo
  (`CUIDADO-club-civil-no-SADP-resultados-2022.md`, el Estado de Resultados Integrales, vía OCR) es
  el único documento nuevo.
  Segundo, y más importante: la lectura del Estado de Resultados CONFIRMA con evidencia directa la
  hipótesis de la nota de arriba (no es solo una diferencia de "estándar contable", es una diferencia
  de ALCANCE). El documento tiene exactamente 2 segmentos — "Unidad Educativa" (Ingresos 2.238.788,
  Superávit 255.033) y "Country Club y Sede Social" (Ingresos 1.387.267, Déficit -210.077) — y CERO
  líneas de fútbol: ninguna de Televisión, recaudación de entradas/abonos, venta de jugadores,
  sponsors o premios por competencia aparece en ningún lado del documento. En el Estado de Situación
  Financiera, "Comisión Especial de Fútbol" (el vehículo que sí corre el fútbol profesional) aparece
  SOLO como saldos a cobrar (activos corrientes y no corrientes, ~$2,56 M en total) — nunca
  consolidada línea por línea. Es decir: este balance/resultado es real, está firmado y es público,
  pero deliberadamente EXCLUYE el fútbol profesional, que es justamente lo que este sitio necesitaría
  mostrar. Cargarlo como "las finanzas de LDU Quito" publicaría una imagen materialmente engañosa (un
  club de Libertadores con ingresos de ~$3,6 M, 100% colegio/country club, $0 de fútbol).
  **DECISIÓN: no se crea `data/lduquito-ec-data.js` con este documento.** Ecuador NO se agrega a
  `data/leagues.js`/`data/clubs.js` en esta sesión (no hay ningún club ecuatoriano con documento
  cargable todavía). Pregunta genuina anotada en `Admin/dudas-por-club.md`.
- Último chequeo: 2026-09-25.

