# Atlético Tucumán

- Sin PDFs oficiales encontrados. Sitio oficial: clubatleticotucuman.com.ar (OJO: no es
  atleticotucuman.com.ar, que es un sitio de noticias de terceros). Tiene "Institucional" y "Socios"
  pero sin Transparencia ni PDFs. Una nota propia del sitio menciona que un periodista "accedió a los
  estados contables de los últimos 10 años" sin decir dónde ni linkearlos.
- Pendiente: todos los ejercicios.
- Contacto: Oficina de socios, tel. 54-381-2344739; guardia 24 hs 381-580-9769; Estadio José Fierro,
  25 de Mayo 1351, San Miguel de Tucumán. Portal de socios: clubatleticotucuman.miclub.info (no
  explorado, puede tener más detrás de login).

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

- **Resultado: 0 documentos.** De los 2 dominios anotados, `atleticotucuman.com.ar` **no resuelve** (connect timeout, 0 bytes) y `clubatleticotucuman.com.ar` responde 200 pero con una home mínima (34 KB); su sitemap solo expone una nota de "convocatoria a asamblea extraordinaria". Wayback: 0 PDFs archivados en ninguno de los 2 dominios.
- Último chequeo: 2026-09-22.
