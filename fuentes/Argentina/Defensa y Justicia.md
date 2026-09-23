# Defensa y Justicia

- Sin PDFs de balance encontrados. Sitio oficial: defensayjusticia.org.ar. Publica notas narrativas
  con la cifra de superávit de cada ejercicio (Ejercicio N°90, cierre 30/6/2024, superávit $3.456M;
  Ejercicio N°91, cierre 30/6/2025, superávit $6.218M) pero SIN el estado contable adjunto. Tiene un
  portal "Sede Virtual" con login de socio que podría tener el documento real, no explorable sin
  credenciales.
- Pendiente: el balance auditado real (PDF) de cualquier ejercicio.
- Contacto: sección Socios (defensayjusticia.org.ar/socios/) o Prensa del sitio oficial; no se
  encontró mail institucional directo publicado.

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

- **Resultado: 0 documentos.** Hay 3 posts institucionales que confirman ejercicios aprobados — "Se aprobó el ejercicio n° 91 de la institución", "Aprobación Ejercicio N°88 de la entidad" y "Aprobación Balance y nueva Comisión Directiva" — y los tres se abrieron y revisaron: **cero adjuntos** (ni `.pdf`, ni Drive, ni iframe de visor). Wayback: 0 PDFs archivados en todo el dominio. La numeración de ejercicios (88, 91) sirve igual para pedirle al club un rango concreto.
- Último chequeo: 2026-09-22.
