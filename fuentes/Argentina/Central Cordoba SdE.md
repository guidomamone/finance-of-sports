# Central Córdoba (Santiago del Estero)

- Sin PDFs oficiales encontrados. Sitio oficial: cacentralcordoba.com (OJO: centralcordoba.com.ar es
  un club DISTINTO, Central Córdoba de Rosario). El sitio no tiene sección de
  institucional/transparencia/balance — solo Historia/Comisión/Fútbol/Socios/Acreditaciones. Prensa
  (no oficial) confirma que la asamblea de mayo 2022 aprobó los balances 2019/20 y 2020/21, sin PDF.
- Pendiente: todos los ejercicios — probablemente solo se distribuye en papel en la asamblea.
- Contacto: info@cacentralcordoba.com (footer del sitio), depto. de socios +54 9 3855 79-2105.

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

- **Resultado: 0 documentos.** Dos dominios en juego: `cacentralcordoba.com` (el actual, sin nada financiero, 0 PDFs en Wayback) y `centralcordoba.com.ar` (el viejo, que tiene una nota `/noticias/balance-2019` — se abrió: es un balance DEPORTIVO de la temporada, no contable). Wayback del `.com.ar`: 4 PDFs archivados, ninguno financiero.
- Último chequeo: 2026-09-22.
