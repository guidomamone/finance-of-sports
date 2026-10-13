# Atlético Tucumán

**Ángulos**: sitio oficial: agotado (home mínima confirmada de nuevo, sin sección de balance —
sitio no es WordPress, `wp-json` da 404 estándar, no rutas WP) · Wayback CDX: agotado (0 PDFs
archivados en los 2 dominios, chequeo 2026-09-22) · búsqueda web: agotado (0 PDF descargable;
prensa CONFIRMA balance 2024-25 aprobado en asamblea con superávit, ver Chequeo 2026-09-26) ·
regulador/país: no aplica (IGJ bloqueado, clave fiscal AFIP paga) — 2026-09-26

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

## Chequeo 2026-09-26 — sesión de sourcing puro, prensa CONFIRMA que el balance existe

`clubatleticotucuman.com.ar/wp-json/wp/v2/search` devuelve el 404 default de un framework propio
(no WordPress) — la vía `wp-json` de la familia 1 no aplica a este sitio, confirmado de nuevo.

Búsqueda web (familia 4) confirma que el club sí aprueba memoria y balance en asamblea todos los
años, pero nunca lo publica como PDF:

- **Doble Amarilla**, ["Asamblea ordinaria en Atlético Tucumán: aprobaron memoria y balance con
  superávit"](https://www.dobleamarilla.com.ar/mas-alla-del-futbol/asamblea-ordinaria-en-atletico-tucuman--aprobaron-memoria-y-balance-con-superavit_a687902e6fbaf60d8eb36612b):
  asamblea general ordinaria (jul-2025) aprobó memoria y balance del ejercicio 2024-25, superávit
  de $2.294 millones, ~300 socios presentes, 5 abstenciones.
- Cuenta oficial en X (@ATOficial, ago-2023): asamblea anterior también aprobó memoria y balance,
  293 socios presentes — mismo patrón todos los años, nunca con el documento adjunto o linkeado.

**Candidato a mail (to-do 51, `club-outreach`)**: mismo criterio que San Martín (Tucumán) — balance
2024-25 CONFIRMADO por prensa como aprobado y con superávit, cero canal digital donde esté
publicado. Vale la pena pedirle al club que suba el PDF que ya tiene (bajo esfuerzo para ellos,
alto valor esperado).
- Último chequeo: 2026-09-26.
