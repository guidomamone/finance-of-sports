# Estudiantes (Buenos Aires / Caseros)

- Sin PDFs oficiales encontrados. OJO club distinto de Estudiantes de La Plata (ya cargado en el
  sitio, ver Primera División arriba) — este es Club Atlético Estudiantes de Caseros. Sitio oficial:
  caestudiantes.com.ar — **el dominio aparece comprometido/hackeado**: al revisarlo en esta sesión
  mezclaba contenido real del club con decenas de posts de spam de casas de apuestas (Bet365, Bwin,
  Betway, etc.) con fecha del mismo día de esta investigación. El índice de Wayback Machine del
  dominio tiene 23 PDFs, todos "Gacetillas de Prensa" (comunicados) o una convocatoria a asamblea,
  ninguno con estados contables.
- Pendiente: todos los ejercicios. Ojo también con la seguridad del sitio antes de linkearlo desde
  cualquier lado.
- Contacto: portal socios.caestudiantes.com.ar, redes @caestudiantes (Instagram/Facebook/X).
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
