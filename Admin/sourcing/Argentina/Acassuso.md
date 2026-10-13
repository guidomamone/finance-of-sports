# Acassuso

**Ángulos**: sitio oficial: agotado (menú completo ya revisado en el barrido 2026-09-22; esta sesión
sumó `wp-json/wp/v2/search` con 5 términos — `balance`, `memoria y balance`, `contable`, `asamblea`,
`estados contables` — 0 resultados institucionales, solo 2 notas deportivas que usan la palabra
"balance" en sentido futbolístico; la home de clubacassuso.com.ar devolvió 503 de forma persistente
en esta sesión — no "se recuperó" como reportó el barrido Haiku, sigue caída — pero `wp-json/` sí
responde 200, así que la búsqueda se pudo correr igual contra el backend) · Wayback CDX: agotado (0
PDFs archivados en todo el dominio, reconfirmado) · búsqueda web: agotado (sin resultados, ninguna
cobertura de prensa de asamblea o balance) · regulador/país: no aplica · barrido: 1 (Haiku+Sonnet) —
2026-09-26

- Sin PDFs oficiales encontrados. Sitio oficial: clubacassuso.com.ar — sitio orientado a fútbol
  profesional (plantel, historia), sin sección institucional/socios con documentos.
- Pendiente: todos los ejercicios.
- Contacto: tel. 4743-0966 / WhatsApp 11-5893-4110, sede Alsina 428, San Isidro; predio deportivo
  Camino Morón y Santa Rita, Boulogne.
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

## Chequeo 2026-09-26 — barrido 1 (Haiku+Sonnet), verificación

Un subagente Haiku hizo el descubrimiento mecánico (familia 1 + familia 3) sobre este club y reportó
0 PDFs, con la home dando 503 al principio y "recuperándose" después. Esta sesión (Sonnet) verificó y
completó:

- **CDX de Wayback reconfirmado por `curl` directo**: `cdx.search/cdx?url=clubacassuso.com.ar&matchType=domain&filter=original:.*\.pdf` devuelve 0 filas. Coincide con Haiku.
- **`wp-json/wp/v2/search`** corrido con 5 términos (`balance`, `memoria y balance`, `contable`,
  `asamblea`, `estados contables`): 0 resultados institucionales — un ángulo que el reporte de Haiku
  no detalló explícitamente para este club, y que confirma independientemente que no hay contenido de
  asamblea/balance indexado en WordPress.
- **La home NO se recuperó**: en 3 intentos con `curl -v` durante esta sesión, `https://clubacassuso.com.ar/` y su variante `www` devuelven 503 de forma consistente (no intermitente). Lo que SÍ funciona es `wp-json/` (200), que es lo que permitió correr la búsqueda de todos modos — esta es una corrección al reporte de Haiku, no solo una confirmación.
- Búsqueda web dirigida (`"Acassuso" asamblea balance ejercicio`): sin resultados relevantes, sin cobertura de prensa.

**Clasificación (criterio 0.3): dead-end real, 0 señal de que el documento exista** — ni prensa, ni
mención de asamblea, ni video. Sitio sin sección institucional confirmado por dos vías independientes
(HTML y `wp-json`), CDX en 0, búsqueda dirigida sin nada. Las 3 familias aplicables (sitio oficial,
Wayback CDX, búsqueda web; el regulador/país no aplica) están agotadas a fondo. Próximo club, sin
mail — revisar de nuevo más adelante sin fecha fija, mismo criterio que los dead-ends de Brasil.

- Último chequeo: 2026-09-26.
