**Ángulos**: sitio oficial: agotado (menú completo vía los 8 sitemaps de Yoast SEO — post, page, fotos,
jugador, partner, category, post_tag, categoria-jugadores —, `page-sitemap.xml` lista TODAS las
páginas del sitio: estadio, historia, palmares, inferiores, sponsors-oficiales, calendario,
contactos, clasificación; ninguna institucional/transparencia/balance) · Wayback CDX: agotado (0 URLs
archivadas NUNCA en todo el dominio `ferrocarrilmidland.com`) · búsqueda web: agotado (0 señal —
ninguna nota de prensa menciona balance/memoria/ejercicio económico; la única asamblea cubierta por
prensa, nov-2025, fue puramente electoral —confirmado leyendo la nota completa—, sin balance) ·
regulador/país: no aplica · barrido: 1 (Sonnet) — 2026-09-26

# Ferrocarril Midland

- Sin PDFs oficiales encontrados. Sitio oficial: ferrocarrilmidland.com (OJO: existe también
  cafcmidland.wixsite.com/paginaoficial, que se autodenomina "página oficial" pero corre en Wix con
  aspecto de sitio de fans/hincha — no se usó como fuente por no poder confirmar que sea del club).
  0 PDFs archivados en Wayback Machine para ferrocarrilmidland.com.
- Pendiente: todos los ejercicios.
- Contacto: sección Contactos en ferrocarrilmidland.com/contactos/, sede Av. Eva Perón 4390 y Molina,
  Libertad, Merlo.
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

## Chequeo 2026-09-26 — escalera completa (barrido 1, Sonnet), dead-end real sin señal

- **Familia 1 (sitio oficial)**: `wp-json/wp/v2/search` con `memoria`/`asamblea`/`contable`/
  `ejercicio` no trae nada relevante (solo coincidencias de palabra suelta en notas deportivas). Se
  leyó el listado COMPLETO de páginas del sitio vía los 8 `*-sitemap.xml` de Yoast — no hay ninguna
  página institucional, de transparencia ni de balances; el sitio es 100% contenido deportivo
  (fixture, plantel, historia, sponsors).
- **Familia 3 (Wayback CDX, dominio completo)**: re-confirmado, **0 URLs archivadas jamás** para
  `ferrocarrilmidland.com` en ningún momento de su historia.
- **Familia 4/5 (búsqueda web + prensa)**: sin ninguna mención de balance/memoria/ejercicio
  económico en prensa. Se encontró 1 nota (Cadena 3, nov-2025) sobre la asamblea que eligió a
  Agustín Orión como nuevo presidente — leída completa: es una asamblea **extraordinaria puramente
  electoral**, sin ninguna mención a balance ni estados financieros.
- **Conclusión**: dead-end real, 0 señal de que el documento exista en ningún canal (ni PDF, ni
  video, ni mención de prensa a una asamblea económica) — no amerita mail por ahora (`club-sourcing`
  0.3). Revisar de nuevo sin fecha fija, no es un bloqueo estructural (el club sí es una asociación
  civil activa que participa de AFA).
- Último chequeo: 2026-09-26.
