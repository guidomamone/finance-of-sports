# Colegiales (Munro)

**Ángulos**: sitio oficial: agotado (0 PDFs, dominio cacolegiales.ar) · Wayback CDX: agotado (0 PDFs
archivados en cacolegiales.ar) · búsqueda web: agotado (sin resultados relevantes del club real) ·
regulador/país: no aplica · barrido: 1 (Haiku+Sonnet) — 2026-09-26

- Sin PDFs oficiales encontrados. Sitio oficial: cacolegiales.ar (OJO: existen homónimos — Colegiales
  de Villa Mercedes, uno de Paraguay, Y el Colegio de Abogados de Rosario en colabro.org.ar cuya web
  devuelve una interstitial de Cloudflare que un scraper mecánico puede confundir con contenido real —
  NO son este club). 0 PDFs archivados en Wayback Machine para el dominio.
- Pendiente: todos los ejercicios.
- Contacto: tel./fax 4760-6118, Antonio Malaver 4706, Munro.
- Último chequeo: 2026-09-12.

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

## Chequeo 2026-09-26 — verificación de un falso positivo (barrido 1, Haiku+Sonnet)

Un barrido Haiku de descubrimiento mecánico bajó
`Clubes/Argentina/Colegiales (Munro)/memoria-ejercicio-2023-2024.pdf` (5.6 KB) como candidato. El
propio Haiku sospechó que podía ser de colabro.org.ar (Colegio de Abogados de Rosario) en vez del
club. Verificado a mano: **falso positivo confirmado, y no solo por el club equivocado** — el archivo
descargado NI SIQUIERA es un PDF. Es la interstitial "Just a moment..." de Cloudflare (HTML puro,
`file` lo detecta como "HTML document text"), la página de verificación anti-bot que se sirve en vez
del contenido real cuando un fetch automático no pasa el challenge. O sea que el scraper mecánico ni
llegó a bajar el documento equivocado: quedó con la página de espera de Cloudflare guardada con
extensión `.pdf`. **Se borró el archivo** (era ruido, cero contenido aprovechable bajo cualquier
lectura). Sin cambios al veredicto: sigue siendo dead-end confirmado, sin señal de que el club real
(cacolegiales.ar) tenga ningún balance publicado.
- Último chequeo: 2026-09-26.
