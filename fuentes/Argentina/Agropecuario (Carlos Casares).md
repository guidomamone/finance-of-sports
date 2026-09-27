# Agropecuario (Carlos Casares)

**Ángulos**: sitio oficial: agotado (mismo template genérico sin sección institucional ya
confirmado en el barrido 2026-09-22; esta sesión sumó `wp-json/wp/v2/search` con 5 términos —
`balance`, `memoria y balance`, `contable`, `asamblea`, `estados contables` — 0 resultados) ·
Wayback CDX: agotado (0 PDFs archivados en todo el dominio, reconfirmado) · búsqueda web: agotado
(sin resultados, ninguna cobertura de prensa local ni de asamblea; el club SÍ existe como entidad
real — "Club Agropecuario Argentino Asociación Civil", CUIT 30-71214816-7 — pero sin rastro de
balance publicado) · regulador/país: no aplica · barrido: 1 (Haiku+Sonnet) — 2026-09-26

- Sin PDFs oficiales encontrados. Sitio oficial: clubagropecuario.com — mismo template genérico que
  Godoy Cruz/Chacarita/Deportivo Madryn (solo fútbol: jugadores, calendario, historia, estadio), sin
  ninguna sección institucional, de socios ni de transparencia. Club joven (fundado 2011 por el
  empresario Bernardo Grobocopatel), con una base de socios muy chica según Wikipedia (50 personas al
  momento de la fundación) — la estructura de gobierno tipo asociación civil con asamblea tradicional
  puede no aplicar de la misma forma que en los clubes centenarios del lote.
- Pendiente: todos los ejercicios (si es que se producen/publican).
- Contacto: sección Contactos en clubagropecuario.com/contactos/, X @Agropecuario_Of, Chacabuco 206,
  Carlos Casares.
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

Un subagente Haiku hizo el descubrimiento mecánico (familia 1 + familia 3) y reportó 0 PDFs, sitio
"enfocado en fútbol sin sección institucional/financiera". Esta sesión (Sonnet) verificó y completó:

- **CDX de Wayback reconfirmado por `curl` directo**: 0 filas para `clubagropecuario.com` con
  `matchType=domain`. Coincide con Haiku.
- **`wp-json/wp/v2/search`** con 5 términos: 0 resultados — confirma independientemente lo que Haiku
  reportó por inspección del sitio (el reporte de Haiku no mencionó haber probado la API de
  WordPress, solo el crawl de HTML).
- Búsqueda web dirigida (`"Agropecuario" "Carlos Casares" club asamblea balance`): sin resultados de
  asamblea o balance; sí confirma que el club es una entidad real y activa (CUIT en registro público,
  Copa Argentina, prensa local `casareshoy.com.ar` con notas deportivas) pero sin ninguna mención de
  memoria/balance/asamblea societaria en ningún resultado.

**Clasificación (criterio 0.3): dead-end real, 0 señal de que el documento exista.** Club joven
(fundado 2011), estructura de socios chica, sin sección institucional en el sitio, sin cobertura de
prensa de ningún tipo de asamblea o balance, CDX en 0. Las 3 familias aplicables (sitio oficial,
Wayback CDX, búsqueda web; el regulador/país no aplica) están agotadas a fondo. Próximo club, sin
mail.

- Último chequeo: 2026-09-26.
