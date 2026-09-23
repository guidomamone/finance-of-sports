# Newell's Old Boys

- **Memoria y Balance General, Ejercicio 2018-19 (1/7/2018 a 30/6/2019) — ENCONTRADO 2026-09-22, el
  club pasa de 0 documentos a 1 balance auditado real.** 98 págs, capa de texto nativa (cero OCR),
  con Estado de Situación Patrimonial al 30/6/2019, Estado de Recursos y Gastos, déficit/superávit
  ordinario $205.980.660 y extraordinario $2.982.903. URL oficial:
  `www.newellsoldboys.com.ar/uploadsarchivos/memoria_y_balance_nob.pdf`. Descargado en
  `Clubes/Argentina/Newells Old Boys/memoria-y-balance-2018-2019.pdf`.
  **OJO: la URL viva devuelve 404 hoy** (el club rehízo el sitio a WordPress y perdió
  `/uploadsarchivos/`); se recuperó del snapshot de Wayback Machine de esa MISMA URL oficial
  (`web.archive.org/web/2020id_/...`, único snapshot, 29/12/2019) — sigue siendo el documento del
  club, solo servido por archive.org. Mismo criterio que ya se usó para Ferro y Unión.
- Resumen Anual de Actividades 2012-13 — `.../uploadsarchivos/raacanob13_6s.pdf` (128 págs, también
  vía Wayback). Descargado como `resumen-anual-actividades-2012-2013.pdf`. **Narrativo, sin estados
  contables** — se revisó el texto completo, la única aparición de "déficit" es una frase de opinión.
  Guardado igual porque documenta la serie y podría tener datos sueltos útiles.
- **Cómo se llegó, y qué NO funcionó** (el detalle importa para el próximo club argentino):
  1. El sitio actual (`newellsoldboys.com.ar`, WordPress) NO tiene sección de transparencia. Su
     `wp-json/wp/v2/search` no devuelve ningún post de balance/memoria/asamblea, y
     `wp-content/uploads/...` responde 403 incluso a un archivo que Google tiene indexado.
  2. El "Portal de Socios" (socios.newellsoldboys.com.ar) sigue gateado con login.
  3. Lo que SÍ funcionó: pedir el índice COMPLETO de PDFs del dominio a la CDX API de Wayback
     (`cdx/search/cdx?url=newellsoldboys.com.ar&matchType=domain&filter=original:.*\.pdf&limit=500`
     → 70 URLs) y leer los nombres de archivo a mano. `memoria_y_balance_nob.pdf` no aparece en
     ninguna búsqueda de Google ni en ningún link vivo del sitio: solo existe en ese índice.
- Pendiente: el resto de los ejercicios. La misma URL `memoria_y_balance_nob.pdf` tiene UN SOLO
  snapshot (no es un archivo que el club haya ido pisando año a año, así que no hay más ejercicios
  escondidos ahí). Prensa confirma asambleas con memoria y balance aprobados (2023-24 en oct-2024;
  2024-25 REFORMULADO en mayo-2026 porque la Memoria faltaba, con auditoría integral encargada al
  Estudio Azum, Avenali, Ceconi; y un Cálculo de Recursos y Presupuesto 2026/27 aprobado en asamblea
  especial), pero ninguna nota linkea el PDF. Reintentar cerca de la próxima asamblea, y pedirle al
  club el 2024-25 reformulado y el presupuesto 2026/27, que son documentos nuevos y concretos.
- Contacto: contacto@newellsoldboys.com.ar / +54 341 425-4422 (sede, Parque Independencia s/n,
  Rosario). Sección Prensa: newellsoldboys.com.ar/prensa/.
- **CARGADO AL SITIO 2026-09-23** (Versión 207 en progreso): el Ejercicio 2018-19 (1/7/2018 al
  30/6/2019) del balance de arriba se transcribió completo a
  `Clubes/Argentina/Newells Old Boys/memoria-y-balance-2018-2019.md` (98 páginas, texto nativo, sin
  OCR) y se cargó en `data/newells-ar-data.js`, `sourceId: 'newells-ar-memoria-y-balance-2018-2019'`.
  `clubId: 'newells-ar'`. Verificación numérica: revenue/expenses/PAT computados cierran contra los
  3 totales impresos del documento (Superávit Ordinario $205.980.660 + Extraordinario $2.982.903 =
  Superávit Final $208.963.563) con diferencias de 1-3 pesos sobre cientos de millones (redondeo del
  propio documento, mismo orden de magnitud que sus propios anexos). El resumen anual 2012-13 sigue
  sin cargar (narrativo, sin estados contables, ver arriba).
- Color de marca: `#F42121` — footylogos.com/es/color-codes/liga-profesional-argentina (rojo,
  primer color listado de la tabla de la Liga Profesional Argentina), identidad de club "rojo y
  negro" confirmada en el infobox/texto de es.wikipedia.org (Club Atlético Newell's Old Boys, "La
  Lepra"), verificado 2026-09-23.
- Último chequeo: 2026-09-23.
