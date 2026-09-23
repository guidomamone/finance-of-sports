# San Miguel

- Sin PDFs oficiales encontrados. Sitio oficial: clubatleticosanmiguel.com.ar, con portal de socios
  aparte en socios.clubatleticosanmiguel.com (no explorado, probablemente con login).
- Pendiente: todos los ejercicios.
- Contacto: sede Ángel D'Elía 1360, San Miguel, tel. 4664-4609 / 4667-8244; estadio José L. Suárez
  2828, Los Polvorines, tel. 4660-1523.
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

- **Resultado: 0 documentos.** La home de `clubatleticosanmiguel.com` devuelve 1.861 bytes — prácticamente vacía, sin navegación. Wayback: 0 PDFs archivados.
- Último chequeo: 2026-09-22.
