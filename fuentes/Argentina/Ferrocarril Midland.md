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
