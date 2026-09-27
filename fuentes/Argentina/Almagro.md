**Ángulos**: sitio oficial: agotado (0 en el sitio vivo, migró de plataforma) · Wayback CDX: agotado
(6 ejercicios recuperados, dominio completo revisado hasta 2026) · búsqueda web: agotado (fue la vía
que encontró el hallazgo) · regulador/país: bloqueo (IGJ exige clave fiscal AFIP paga, gestión de
Guido, no intentar) — 2026-09-26

# Almagro

- **6 balances auditados reales descargados** (Wayback Machine, ver Chequeo 2026-09-26) en
  `Clubes/Argentina/Almagro/`: `balance-2018.pdf` (Ejercicio 80, al 31/10/2018),
  `balance-2019.pdf` (Ejercicio 81, al 31/10/2019), `memoria-y-balance-2020.pdf` (Ejercicio 82, al
  31/10/2020), `balance-2021.pdf` (Ejercicio 83, al 31/10/2021), `balance-2022.pdf` (Ejercicio 84,
  al 31/10/2022), `balance-2023.pdf` (Ejercicio 85, al 31/10/2023). Verificados visualmente:
  "BALANCE GENERAL" con Contador Público firmante (Dr. Francisco Lofedote, Mat. T130 F48
  C.P.C.E.C.B.A.), anexos comparativos con el ejercicio anterior — son estados contables reales, no
  memorias narrativas. `memoria-y-balance-2020.pdf` tiene capa de texto (21 págs); los demás son
  scans sin OCR (15-18 págs c/u) — van a necesitar Tesseract cuando se transcriban (ver CLAUDE.md
  sección de PDFs escaneados). NADA de esto está cargado al sitio ni transcripto todavía — es
  sourcing puro, próximo paso es `club-data-mapping` + transcripción.
- Sitio oficial: almagro.club (redirige a clubalmagro.com.ar) — sin sección institucional navegable
  en el sitio VIVO hoy (confirmado de nuevo 2026-09-26: wp-json/wp/v2/search da 404, no hay
  sitemap.xml). Los 6 balances de arriba NO están linkeados desde ninguna página viva actual — se
  recuperaron indirectamente, ver Chequeo de abajo.
- Pendiente: 2024 y 2025 (Ejercicios 86 y 87) — no aparecen en ningún lado todavía, ni sitio vivo ni
  Wayback (chequeado hasta la fecha de hoy). Reintentar en unos meses o si el club vuelve a subir un
  lote de balances atrasados (patrón ya visto dos veces: subieron 2016-2020 juntos en 2021, y
  2021-2023 juntos en 2024).
- Contacto: prensa@almagro.club, tel. 011 4864-5226, sede Medrano 522, CABA (L-V 8-17h).

## Chequeo 2026-09-26 — 6 balances encontrados vía Wayback CDX (corrige el chequeo de abajo)

**El "0 documentos" del chequeo 2026-09-22 estaba mal** — no por un error de método, sino porque el
filtro CDX de esa sesión (o el momento en que corrió) no capturó lo que sí aparece ahora. Repetir la
consulta CDX domain-wide (`http://web.archive.org/cdx/search/cdx?url=almagro.club&matchType=domain&
filter=original:.*\.pdf&output=json`) hoy devuelve 40 PDFs archivados, de los cuales una decena son
variantes de "Balance"/"Memoria y Balance"/"EECC" para los ejercicios 2016-2023 (algunos en
`wp-content/uploads/2021/`, otros re-subidos en `2022/03/` y `2024/03/` — el club subió el mismo
contenido varias veces con nombres ligeramente distintos: `EECC-2017-_1.pdf`, `Balance-2016-2017.pdf`,
`Memoria-2017.pdf`, etc., además de los 6 elegidos y descargados). Ninguno de los archivos sigue
disponible en el sitio EN VIVO (`clubalmagro.com.ar`, que devuelve 404 en todas las rutas
`wp-content/uploads/...` probadas) — existen SOLO en el archivo.

**Gotcha de descarga: Wayback trunca algunas capturas grandes a exactamente 1.048.576 bytes (1 MiB)**,
con el header `warning: 299 wayback content truncated by "length"` — pasó con las primeras capturas de
Balance-2018/2019/2020.pdf (snapshot de mayo 2022). La solución fue buscar OTRA captura de la misma
URL en la lista CDX (mismo archivo, timestamp distinto — para 2018 y 2019 había una captura de abril
2022 completa, de 7-8 MB) o, para 2020, una URL alternativa del mismo ejercicio
(`Memoria-y-Balance-2020.pdf`, capturada sin truncar). Antes de asumir que una descarga de Wayback está
completa, chequear `content-length` contra `x-archive-orig-x-crawler-content-length` en los headers, o
simplemente que el tamaño no sea sospechosamente redondo (1048576 exacto).

- Búsqueda web (`WebSearch`) fue el ángulo que destapó esto: la query `Almagro "Club Almagro" balance
  asamblea estados contables` devolvió un link directo a
  `almagro.club/wp-content/uploads/2021/08/Memoria-y-Balance-2020.pdf` entre los resultados de Google
  indexados — de ahí se pasó a la CDX API para ver el resto del dominio.
- Pendiente: 2024 y 2025 no aparecen todavía en ningún lado (ni sitio vivo, ni Wayback a la fecha de
  hoy). El club no tiene wp-json activo hoy (404), así que no se puede repetir la búsqueda de posts
  por palabra clave — solo Wayback CDX periódico.
- Último chequeo: 2026-09-26.

## Chequeo 2026-09-22 — barrido automatizado, sin hallazgo

Se corrió el barrido de 4 pasos descrito en `_notas-generales.md` ("Metodología — barrido
automatizado 2026-09-22") sobre el dominio oficial de este club: (1) home + rutas institucionales
típicas + `?s=balance`/`?s=memoria+y+balance`/`?s=estados+contables`, (2) `wp-json/wp/v2/search`
con `balance`, `memoria y balance`, `contable` y `asamblea`, (3) `sitemap_index.xml`/`sitemap.xml`/
`wp-sitemap.xml`, (4) segundo nivel: abrir cada página cuyo slug contenga
balance/memoria/contable/ejercicio/asamblea/transparencia/gestión y buscar en su HTML `href`, `src`
y `data-src` a `.pdf`, Drive, `docs.google.com/viewer|gview`, Issuu, Scribd, Calaméo o Dropbox. Se
sumó el índice COMPLETO de PDFs del dominio en la CDX API de Wayback Machine
(`matchType=domain&filter=original:.*\.pdf`), que detecta archivos que nunca estuvieron linkeados
desde una página viva.

- **Resultado: 0 documentos.** Ni el sitio vivo ni el índice de Wayback Machine del dominio tienen un PDF, Drive o visor embebido con balance/memoria/estados contables.
- Último chequeo: 2026-09-22.
