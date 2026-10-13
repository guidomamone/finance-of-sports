# Deportivo Riestra

**Ángulos**: sitio oficial: no aplica — sin dominio oficial funcional confirmado (ver detalle abajo) ·
Wayback CDX: agotado (0 PDFs en los 3 dominios candidatos: clubdeportivoriestra.com,
deportivoriestra.com, mundoriestra.com.ar) · búsqueda web: agotado (sin ninguna cifra de prensa
citando un balance del CLUB — ver gotcha del falso positivo abajo) · regulador/país: no aplica ·
barrido: 1 (Haiku+Sonnet) — 2026-09-26. **Dead-end confirmado, sin mail** (0 señal de que el club
tenga un balance publicado en ningún canal).

Nombre completo confirmado: **Deportivo Riestra Asociación de Fomento Barrio Colón** (fundado
22/2/1931, sede en Del Bañado 2359, Nueva Pompeya, CABA — no es una cooperativa, ver el gotcha de
falso positivo en el chequeo 2026-09-26 de abajo antes de reabrir esto).

- Sin sitio web oficial funcional encontrado: clubdeportivoriestra.com es un dominio parkeado sin
  contenido, deportivoriestra.com da 403 Forbidden, deportivoriestraoficial.com.ar NO RESUELVE (DNS
  falla, verificado 2026-09-26 — puede ser un dominio nunca registrado que aparece citado en algún
  resultado de búsqueda), y clubdeportivoriestra.wordpress.com es un sitio de fans/historia, no
  oficial (confirmado por su propio contenido, no se declara sitio oficial del club).
  mundoriestra.com.ar también es explícitamente un "sitio de fanáticos" (así se autodescribe en su
  meta description), no oficial. Solo tiene presencia institucional en redes.
- Pendiente: todo — no hay memoria y balance publicada en ningún dominio oficial porque no se
  encontró un dominio oficial funcional.
- Contacto: prensa@deportivoriestra.com, o Instagram @deportivoriestra.oficial / X @prensariestra.

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

## Chequeo 2026-09-26 — falso positivo de ENTIDAD confirmado (no solo de club), el más engañoso del lote

Haiku intentó bajar `riestracoop.ar/wp-content/uploads/2021/03/98-Memoria-y-Balance-61-V3.pdf` y el
archivo quedó corrupto (167 bytes: una respuesta 301 de Cloudflare guardada como si fuera el PDF, no
el PDF real). El nombre de archivo ("Memoria y Balance 61") sonaba prometedor, así que se reintentó
la descarga siguiendo la redirección correctamente (`curl -L`): el 301 apunta a
`riestracoop.com.ar/...` (`.com.ar`, no `.ar` — dominio distinto al que Haiku probó), que sí devuelve
un PDF real de 4.5 MB, 200 OK, `content-type: application/pdf`.

**Pero al abrir y leer ese PDF, es un documento real y válido — de la entidad EQUIVOCADA.** Es la
"Memoria y Ejercicio Balance General Nº61" de la **Cooperativa Eléctrica Limitada de Norberto de la
Riestra** (MATRÍCULA INAES Nº4867, registrada bajo la Ley 20.337 de cooperativas), un servicio
público de electricidad/gas/internet/sepelio/ambulancia en la localidad de Norberto de la Riestra
(partido de San Miguel del Monte, provincia de Buenos Aires) — confirmado leyendo el propio texto del
PDF ("Cooperativa Eléctrica Limitada de Norberto de la Riestra", menciones constantes a "servicios
prestados a la comunidad", "usuarios de gas", INAES). **No tiene ninguna relación con el Club
Deportivo Riestra** (que es una Asociación de Fomento de fútbol en Bajo Flores/Nueva Pompeya, CABA,
sin estructura cooperativa) — es pura coincidencia de nombre: ambos comparten el apellido "Riestra"
(el club por la calle/zona Norberto de la Riestra en Bajo Flores; la cooperativa por el pueblo
homónimo en la provincia).

Este es el falso positivo más engañoso del lote porque, a diferencia de Colegiales (una interstitial
de Cloudflare, ni siquiera un PDF real) o Deportivo Maipú (un documento real pero obviamente ajeno a
lo financiero), acá el archivo bajado es un balance auditado real, con formato y vocabulario
plausible, que un chequeo superficial (¿es un PDF? ¿tiene "Memoria y Balance" en el título? ¿tiene
tablas contables?) habría aprobado sin problema. Solo la lectura del contenido (nombre de la entidad,
matrícula INAES, rubro "cooperativa de servicios") lo descarta. **Se borró el archivo.**

Se corrió además Wayback CDX de dominio completo sobre los 3 dominios candidatos del club real
(`clubdeportivoriestra.com`, `deportivoriestra.com`, `mundoriestra.com.ar`): **0 PDFs archivados en
los tres**. Búsqueda web dirigida no encontró ninguna cifra de prensa citando un balance específico
del club (a diferencia de Defensa y Justicia, acá no hay ni siquiera esa señal parcial).

**Veredicto sin cambios respecto al chequeo anterior, con más confianza**: dead-end confirmado, sin
mail — no hay evidencia de que el club tenga un sitio oficial funcional NI de que publique o haya
publicado nunca un balance en ningún canal digital.
- Último chequeo: 2026-09-26.
