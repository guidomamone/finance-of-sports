# Mitre (Santiago del Estero)

**Ángulos**: sitio oficial: agotado (3 dominios, ninguno tiene sección institucional/transparencia)
· Wayback CDX: agotado (0 PDFs en los 3 dominios) · búsqueda web: parcial — prensa
(infodelestero.com) sin confirmar de forma independiente esta sesión · regulador/país: no aplica ·
barrido: 1 (Haiku+Sonnet) — 2026-09-26

- Sin PDFs oficiales encontrados. Tres dominios propios verificados, ninguno con sección de
  balances/transparencia: `clubatleticomitre.com.ar` (sitio estático simple: Index/Contactos/
  Fixture/Prensa/Proximamente/SociosMitre, este último solo un formulario de asociación), `camitre.com`
  (sitio genérico de la plantilla "Digital Sport Argentina", con sección "Socios" que es una página
  de sponsors/contacto, sin documentos), y `www.sociosclubatleticomitre.com` (plataforma de socios
  tipo SPA con login, pagos MercadoPago y backend Supabase — es gestión de cuotas, no un repositorio
  de documentos). 0 PDFs archivados en Wayback Machine para los 3 dominios.
- Pendiente: todos los ejercicios.
- Contacto: sede en Mendoza y 24 de Septiembre; Estadio 3 de Febrero 399, Santiago del Estero;
  redes @clubamitre / @OficialMitre / @CLUBAMITRE.
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
- Ojo: el barrido solo cubrió `camitre.com`. Los otros 2 dominios anotados en este archivo
  (`clubatleticomitre.com.ar` y `sociosclubatleticomitre.com`) quedaron sin barrer — probarlos
  primero en la próxima sesión.
- Último chequeo: 2026-09-22.

## Chequeo 2026-09-26 — barrido 1 (Haiku descubrimiento + Sonnet verificación)

Haiku confirmó los 3 dominios activos (`camitre.com`, `clubatleticomitre.com.ar`,
`sociosclubatleticomitre.com`) y señaló que prensa (infodelestero.com) reporta asambleas del club en
2024/2025, sin cifras ni PDF citado. Esta sesión (Sonnet) cerró el hueco que el reporte de Haiku
dejaba explícito: correr el Wayback CDX de dominio completo sobre los 2 dominios que el chequeo del
2026-09-22 nunca había barrido.

- **`clubatleticomitre.com.ar` — CDX `matchType=domain&filter=original:.*\.pdf`: 0 resultados.**
  Sitio vivo confirmado como estático (no WordPress), 6 páginas totales
  (Index/Contactos/Fixture/Prensa/Proximamente/SociosMitre), sin ninguna sección institucional o de
  transparencia. `SociosMitre.html` es un formulario de alta de socios (nombre, DNI, contacto), no un
  repositorio de documentos. `PrensaMitre.html` es un selector de notas de prensa externas, sin
  balance ni memoria mencionados.
- **`sociosclubatleticomitre.com` (con y sin `www`) — CDX `matchType=domain`: 29 capturas totales,
  0 son PDF.** Todas son assets estáticos de una SPA React (JS/CSS con hash de build, íconos PWA,
  manifest, `robots.txt`) — confirma que es una plataforma de gestión de socios (login + MercadoPago
  + Supabase), no un sitio con contenido público indexable. Nada que un scraper pueda encontrar detrás
  del login sin credenciales.
- **`camitre.com` — ya cubierto el 2026-09-22 con CDX de dominio completo, 0 PDFs.** Se revisó de
  nuevo en vivo esta sesión (menú completo: Noticias/El Club/Historia/Comisión Directiva/Palmarés/
  Estadio/Plantel/Cuerpo técnico/Jugadores/Inferiores/Clasificación/Calendario/Fotos/Socios/
  Contactos): sin sección institucional ni de transparencia, `/socios/` es de sponsors y contacto.
- **Prensa (infodelestero.com)**: no se pudo confirmar de forma independiente esta sesión — los
  buscadores disponibles (DuckDuckGo, Bing) devolvieron resultados genéricos o bloquearon el operador
  `site:` en este entorno, no específicamente de este club. No se descarta el hallazgo de Haiku, mismo
  sigue sin ser una fuente citable en sí (ver regla de la familia 5 en `club-sourcing` 0.1) — queda
  pendiente re-verificar con browsing real en una sesión futura si se decide escalar este club.
- **Evaluación**: escalera de 0.1 agotada A FONDO en las 3 familias aplicables (sitio oficial,
  Wayback CDX, búsqueda web con las herramientas disponibles). Sin confirmación firme de que el
  documento exista en ningún canal digital (a diferencia de Racing Cba, acá no hay un post propio del
  club citando fechas de ejercicio) → clasificado como **dead-end real**, no candidato a mail. Si la
  mención de prensa se confirma más adelante con evidencia concreta (cifras, fecha de asamblea
  puntual), reabrir como candidato a mail.
- Último chequeo: 2026-09-26.
