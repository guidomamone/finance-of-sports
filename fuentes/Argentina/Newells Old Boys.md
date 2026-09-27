# Newell's Old Boys

**Ángulos**: sitio oficial: AGOTADO — verificado con Browser pane real 2026-09-27: el sitio se
REDISEÑÓ por completo (ya no es el WordPress de los chequeos anteriores) y el nuevo sitio no tiene
NINGUNA sección institucional/documentos en su navegación (ver detalle abajo) · Wayback CDX: agotado
(dominio completo, 70 URLs .pdf, sin nada nuevo desde el chequeo anterior) · búsqueda web: parcial —
encontrado un mirror NO oficial (ver abajo) · regulador/país: no aplica — 2026-09-27.

- **Ejercicios 2023-24 y 2024-25: CONFIRMADOS que existen (con drama institucional real de por
  medio), pero NINGUNO descargable en ningún canal accesible desde esta sesión — candidatos a mail
  (2026-09-26).**
  - **2023-24** (01/07/23-30/06/24): aprobado en Asamblea Extraordinaria de socios en octubre de 2024
    (La Capital, OrgulloRojinegro, El Ciudadano). Existe un ANÁLISIS NO OFICIAL hecho por
    "Autoconvocados NOB" (grupo independiente de socios/hinchas, NO el club) con cifras derivadas
    (activo/pasivo/patrimonio neto/resultado) en
    `autoconvocadosnob.com/balance-newells-2024` → Google Drive
    `drive.google.com/file/d/1YeGmPTTIfh_l93g8i03r_k1wmAg7shac/view` — se descargó y verificó
    (`pdfinfo`: 20 págs, `Creator: Canva`, `Author: santisampa`): es un INFOGRAFÍA propia de
    Autoconvocados, no una copia del balance oficial del club — NO usar como fuente de datos, solo
    como confirmación de que el documento real existe y de su orden de magnitud. No descargado al
    proyecto (no es del club, no es una réplica del PDF real como el caso de River/tuRiver).
  - **2024-25** (01/07/24-30/06/25): bajo la gestión saliente de Astore, se reformuló en la primera
    asamblea de la nueva gestión Boero (14/05/2026) porque la versión original tenía una omisión de
    la sección Memoria — auditoría integral encargada a Estudio Azum, Avenali, Ceconi (deuda
    encontrada: USD 33.6M al 31/12/2025). Cadena3/Doble Amarilla confirman que en una asamblea
    anterior (mayo 2025) el balance directamente fue RECHAZADO antes de esta reformulación. Ninguna
    nota de prensa linkea el PDF ni de la versión original ni de la reformulada.
  - Se agotó la escalera para ambos: media library completa del sitio bloqueada por WAF (403/
    "Forbidden" en TODO `wp-content/uploads` y `wp-json/wp/v2/media|search`, no solo en el archivo
    puntual ya documentado — confirmado de nuevo con varios User-Agent de navegador real, incluso un
    archivo público como `Estatuto.pdf` da 403 vía curl); adivinar 20 nombres de archivo candidatos
    bajo `wp-content/uploads/2024/{09,10,11,12}/` da 403 (mismo bloqueo, no 404 real); Wayback CDX
    del dominio completo sin cambios desde el chequeo anterior.
  - Presupuesto 2026/27 (01/07/26-30/06/27) aprobado en asamblea especial 01/07/2026, foco 72.8% en
    fútbol profesional — mismo problema de acceso, no se encontró el PDF.
  - **Chequeo 2026-09-27, Browser pane real: el sitio YA NO ES el WordPress de arriba.** El club
    rediseñó `newellsoldboys.com.ar` por completo — es un sitio nuevo, orientado 100% a marketing de
    socios (campaña "Sentí el Corazón", categorías de cuota, beneficios), sin ninguna sección
    institucional de documentos. Se enumeraron TODOS los links de la home vía JS
    (`document.querySelectorAll('a')`): menú "Institucional" solo tiene Comisión/Historia/Palmarés
    (anclas en la misma página, sin contenido descargable), y no aparece ningún link a balance,
    memoria, transparencia ni documento en ningún lugar del sitio. El endpoint `wp-json/wp/v2/media`
    SIGUE dando 403 incluso con navegador real — no era un bloqueo de herramienta (curl/WebFetch),
    es un bloqueo real del servidor, probablemente un backend de WordPress viejo que quedó de pie
    detrás del sitio nuevo pero sin exponerse. **Conclusión: familia 1 queda agotada de verdad, con
    o sin Browser pane** — el sitio actual no tiene ningún camino de descubrimiento hacia estos 2
    ejercicios ni el presupuesto 2026/27. Quedan como candidatos a mail (ya estaban marcados así).
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
- Último chequeo: 2026-09-27.
