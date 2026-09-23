# Barracas Central

- Sin PDFs oficiales encontrados, y es dudoso que existan publicados: el sitio oficial
  (barracascentral.com) no tiene ninguna sección de socios/transparencia/comisión directiva ni
  memoria/balance — solo Home/El club/Partidos/Media/Galería/Eventos/Prensa. Club chico y de ascenso
  reciente, estructura institucional menos desarrollada que el resto del lote.
- Pendiente: todos los ejercicios (si es que se publican en algún canal).
- Contacto: info@barracascentral.com, Prensa prensa@barracascentral.com, tel. 4301-5855, Luna 1211,
  CABA.

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

- **Resultado: 0 documentos.** Wayback: 4 PDFs archivados en el dominio, ninguno financiero. Confirma lo ya anotado sobre la estructura institucional poco desarrollada del sitio.
- Último chequeo: 2026-09-22.
