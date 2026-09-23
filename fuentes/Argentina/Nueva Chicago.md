# Nueva Chicago

- Sin PDFs oficiales encontrados. Sitio oficial: canuevachicago.com.ar, con sección "Socios" (una
  nota menciona que Tesorería publica informes económicos de partidos e incluye actas de Asamblea de
  Representantes de Socios) pero sin balance/memoria en PDF linkeado en las páginas revisadas.
- Pendiente: todos los ejercicios.
- Contacto: prensachicago@gmail.com, tel. +54 9 11 3869-6880, sede Justo Suárez 6900, Mataderos.
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

- **Resultado: 0 documentos.** Wayback: 4 PDFs archivados en el dominio, ninguno financiero. Lo único cercano en el sitio vivo es un "resumen económico de los partidos vs. Chacarita, Fénix y Tristán Suárez" (recaudación por partido, no un ejercicio).
- Último chequeo: 2026-09-22.
