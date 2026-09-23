# Aldosivi

- Sin PDFs oficiales encontrados. Sitio oficial: aldosivi.com (secciones "El Club"/"Socios", sin
  Transparencia/Memoria/Balance ni portal público). El estatuto exige tratar Memoria y Balance en
  asamblea (confirmado por noticias propias del club), pero no se publica el PDF en la web pública.
- Pendiente: todos los ejercicios.
- Contacto: formulario en aldosivi.com ("El Club" > "Contacto"), o Secretaría de Socios —
  socios@aldosivi.com, tel. (0223) 484-0157 / 484-4230 / 484-3645, WhatsApp 223 3 00-5724, Av. de los
  Trabajadores 1800, Mar del Plata.

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
