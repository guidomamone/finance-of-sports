# San Martín (Tucumán)

- Sin PDFs oficiales encontrados. Dos dominios propios verificados: clubatleticosanmartin.com.ar
  (con sección "Contacto" pero sin balance/institucional) y clubatleticosanmartin.com (portal
  separado con "Información del C.A.S.M."). Índice completo de Wayback Machine de
  clubatleticosanmartin.com.ar: 14 PDFs, ninguno financiero (reglamentos, formularios de prensa,
  convenio de consentimiento).
- Pendiente: todos los ejercicios.
- Contacto: tel. 0381-4247817 / 4205861, Bolívar 1960, San Miguel de Tucumán.
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

- **Resultado: 0 documentos.** `clubatleticosanmartin.com.ar` devuelve **HTTP 403** a `curl` (habría que ir por Browser pane en una sesión futura). Wayback: 10 PDFs archivados en el dominio, ninguno financiero.
- Último chequeo: 2026-09-22.
