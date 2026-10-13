# Racing Club (Córdoba, Nueva Italia)

**Ángulos**: sitio oficial: agotado (0 PDF/Drive, pero el club CONFIRMÓ por escrito la existencia de
memoria+balance de 2 ejercicios) · Wayback CDX: agotado (0 PDFs, 19.679 capturas del dominio
revisadas) · regulador/país: parcial — Boletín Oficial de Córdoba accesible (no bloqueado por
CloudFront, sí con User-Agent real) pero con buscador interno roto (error crítico de WordPress) y sin
resultados vía `site:` en Bing/DuckDuckGo · búsqueda web: no aplicable más allá de lo anterior ·
barrido: 1 (Haiku+Sonnet) — 2026-09-26

- Sin PDFs oficiales encontrados. Sitio oficial: racingcba.com.ar (OJO: es un club totalmente
  DISTINTO de Racing Club de Avellaneda, ya cargado en el sitio con datos reales — ver Primera
  División arriba). El sitio vive bajo `racingcba.com.ar/bienvenido/` (WordPress). Índice completo de
  Wayback Machine del dominio: 0 PDFs archivados.
- **El club SÍ confirmó, en su propio sitio, que memoria y balance existen**: el post
  `/bienvenido/asambleas-en-racing/` (12/1/2024) relata que ese día se aprobó en asamblea la "Lectura
  de memorias, balances y estado resultados de los ejercicios cerrados el día 30/04/22 y 30/04/23" —
  o sea, dos ejercicios con cierre 30 de abril, leídos y aprobados, sin PDF publicado en ningún lado.
- Pendiente: todos los ejercicios.
- Contacto: adm.racingcba@gmail.com, tel. 351 352-5777, Hermán Huberman 1750, Bº Nueva Italia,
  Córdoba.
- Último chequeo: 2026-09-26.

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

## Chequeo 2026-09-26 — barrido 1 (Haiku descubrimiento + Sonnet verificación)

Haiku encontró el dominio activo con página de asambleas y el contacto administrativo
(adm.racingcba@gmail.com, 0351-352-5777), y señaló que el Boletín Oficial de Córdoba estaba
bloqueado por CloudFront. Esta sesión (Sonnet) profundizó en los dos ángulos que el reporte de Haiku
dejaba abiertos:

- **Wayback CDX de dominio completo, re-confirmado**: `racingcba.com.ar` tiene 19.679 capturas
  totales en Wayback (no solo unas pocas), 0 de ellas son `.pdf`. El volumen alto de capturas hace que
  este resultado sea más confiable que un "sin capturas" de un dominio chico — hay mucho contenido
  indexado (posts de noticias, fichajes, resultados) y ninguno es un documento financiero.
- **La página de asambleas, abierta y leída completa**: `/bienvenido/asambleas-en-racing/` (post del
  12/1/2024) y su convocatoria previa (`/bienvenido/asambleas-convocatoria-a-los-socios/`, 8/1/2024)
  confirman que la asamblea del 11/1/2024 aprobó la lectura de memorias y balances de los ejercicios
  cerrados 30/04/2022 y 30/04/2023, además de una reforma parcial del estatuto social. Ningún PDF,
  Drive ni visor embebido en ninguno de los dos posts — es una nota de prensa institucional, no una
  publicación del documento. Esto es justo el patrón de "documento confirmado, no descargable" que
  describe la sección 0.3 del skill (como Independiente, Ejercicio 121).
- **Boletín Oficial de Córdoba, re-intentado con otro método**: el bloqueo que reportó Haiku
  (CloudFront) resultó ser sensible al User-Agent — con un UA de navegador real, `boletinoficial.cba.
  gov.ar` responde `200` sin problema (es un WordPress público, no una API detrás de un WAF real). Sin
  embargo, el buscador interno del sitio (`?s=<término>`) devuelve un error crítico de WordPress
  (`Ha habido un error crítico en esta web`) para cualquier término probado — está roto, no es un
  bloqueo deliberado. Buscar `site:boletinoficial.cba.gov.ar "Racing Club" "Nueva Italia"` en Bing y
  DuckDuckGo no dio resultados relevantes (Bing ignoró el operador `site:` y devolvió resultados
  genéricos de autos de carrera; DuckDuckGo no devolvió resultados). No se encontró una forma de
  navegar el archivo por texto sin conocer la fecha exacta de una publicación — el sitio solo permite
  navegar por año/mes desde la portada. Ángulo agotado con las herramientas disponibles esta sesión,
  no confirmado como bloqueo estructural.
- **Evaluación**: a diferencia de Mitre/San Miguel/San Telmo, acá SÍ hay confirmación concreta y de
  primera mano (el propio club, no solo prensa externa) de que memoria y balance de 2 ejercicios
  existen y fueron aprobados. Clasificado como **candidato a mail** (0.3): pedirle al club, por el
  contacto ya confirmado (adm.racingcba@gmail.com / 0351-352-5777), que comparta la memoria y balance
  de los ejercicios cerrados 30/04/2022 y 30/04/2023 que ya leyó y aprobó en asamblea — el club ya
  tiene el documento, solo falta que lo suba o lo mande. El proceso de mandar ese mail de verdad es
  `club-outreach`, no este skill.
- Último chequeo: 2026-09-26.
