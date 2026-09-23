# Mitre (Santiago del Estero)

- Sin PDFs oficiales encontrados. Dos dominios propios verificados, ambos sin sección de
  balances/transparencia: clubatleticomitre.com.ar (con una página suelta "SociosMitre.html") y
  camitre.com (sitio deportivo genérico, con sección "Socios" sin documentos). 0 PDFs archivados en
  Wayback Machine para ninguno de los dos dominios. También existe un portal de gestión de socios
  (sociosclubatleticomitre.com, no explorado, probablemente con login).
- Pendiente: todos los ejercicios.
- Contacto: sede en Mendoza y 24 de Septiembre; Estadio 3 de Febrero 399, Santiago del Estero;
  redes @clubamitre / @OficialMitre / @CLUBAMITRE.
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
- Ojo: el barrido solo cubrió `camitre.com`. Los otros 2 dominios anotados en este archivo
  (`clubatleticomitre.com.ar` y `sociosclubatleticomitre.com`) quedaron sin barrer — probarlos
  primero en la próxima sesión.
- Último chequeo: 2026-09-22.
