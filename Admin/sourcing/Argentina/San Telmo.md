# San Telmo

**Ángulos**: sitio oficial: agotado — menú COMPLETO confirmado en vivo vía Firecrawl (bypasseó el
403 que bloqueaba curl/navegador), sin ninguna sección de balance/memoria/transparencia · Wayback
CDX: agotado (0 PDFs financieros en 2 dominios, 25.000+ capturas combinadas) · regulador/país: no
aplica · búsqueda web: no intentado esta sesión (sin señal que lo amerite) · barrido: 2 (Firecrawl)
— 2026-09-27

- Sin PDFs oficiales encontrados. Sitio oficial: clubsantelmo.com.ar (con un "Departamento de
  Socios" real, sin balance/memoria linkeado) — bloquea requests directas con HTTP 403 incluso con
  User-Agent de navegador real. También existe soydetelmo.com.ar, con contenido
  institucional/histórico similar — no quedó claro cuál es el dominio "primario", ninguno de los dos
  publica el balance.
- Pendiente: todos los ejercicios.
- Contacto: socios@clubsantelmo.com, tel. 4300-8092.
- Último chequeo: 2026-09-27.

## Chequeo 2026-09-27 — Firecrawl (to-do 75), confirmación con menú completo en vivo

Firecrawl (`api.firecrawl.dev/v1/scrape`) bypasseó el 403 que bloqueaba `curl`/`WebFetch` desde
siempre en este dominio — devolvió el HTML completo con `statusCode:200`, 1 crédito por request.
El menú completo del sitio (`FÚTBOL`, `INSTITUCIONAL`, `POLIDEPORTIVO`, `PRENSA`, `SOCIOS`,
`MARKETING`, `GENERO Y DIVERSIDAD`, `CONTACTO`, `TIENDA`) no tiene NINGUNA entrada de
balance/memoria/transparencia/estados contables. Se abrió además `INFORMACIÓN AL SOCIO` (la página
más candidata) — es solo un formulario de débito automático, sin contenido financiero.

**Esto reemplaza la evidencia indirecta de antes (Wayback + Haiku) por confirmación directa del
sitio vivo**: familia 1 de la escalera de sourcing queda agotada de verdad, no solo por ausencia en
Wayback. Sigue siendo **dead-end real**, sin cambios en la conclusión — pero ahora con el nivel de
certeza que antes solo daba un WAF sin resolver.

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

- **Resultado: 0 documentos.** `clubsantelmo.com.ar` devuelve **HTTP 403** a `curl`. Wayback: 1 solo PDF archivado en todo el dominio, no financiero.
- Último chequeo: 2026-09-22.

## Chequeo 2026-09-26 — barrido 1 (Haiku descubrimiento + Sonnet verificación)

Haiku confirmó el dominio WordPress y señaló que `/wp-content/uploads/` tiene contenido pero solo un
protocolo no financiero, sin balance. Esta sesión (Sonnet) profundizó en el ángulo que el reporte de
Haiku dejaba sin cerrar del todo: correr el Wayback CDX de dominio completo sobre AMBOS dominios
(el principal y el alternativo `soydetelmo.com.ar`) y confirmar el hallazgo puntual del único PDF.

- **`clubsantelmo.com.ar` — HTTP 403 confirmado también con User-Agent de navegador real** (no es
  un bloqueo genérico a bots simples, es un WAF o regla de hosting más estricta — el 403 viene con un
  cuerpo de error propio del sitio, no una página de challenge de Cloudflare). El sitio vivo no es
  explorable directo; toda la evidencia disponible es vía Wayback.
- **CDX de dominio completo, con filtro de PDF y límite alto (5.000)**: exactamente **1 resultado**
  en todo el historial del dominio — `wp-content/uploads/2024/11/PROTOCOLO-SAN-TELMO-VIOLENCIA-DE-
  GENERO.pdf` (capturado 2024-11-07). Confirma lo que decía el reporte de Haiku: es un protocolo
  institucional, no financiero. No hay señal de truncamiento (el gotcha de la sesión del 2026-09-26
  sobre capturas cortadas a 1 MiB) — no hace falta reintentar con otro timestamp porque no hay ningún
  otro candidato PDF que abrir.
- **`soydetelmo.com.ar` (dominio alternativo, no cubierto en el chequeo del 2026-09-22)**: CDX de
  dominio completo con más de 5.000 capturas (tope de la consulta, el dominio tiene aún más historial
  real) — **0 son `.pdf`**. Cierra el hueco que dejaba el archivo anterior ("no quedó claro cuál es el
  dominio primario, ninguno publica el balance") con el dato concreto: tampoco hay PDFs archivados acá.
- **Evaluación**: escalera de 0.1 agotada a fondo en las familias aplicables (Wayback CDX sobre los 2
  dominios conocidos; familia 1 de sitio oficial limitada por el 403 persistente, pero ya cubierta
  indirectamente vía Wayback, que archivó suficientes páginas del sitio como para no depender del
  acceso directo). Sin ninguna confirmación de que el balance exista en algún canal (ni prensa, ni post
  propio) → clasificado como **dead-end real**, no candidato a mail.
- Último chequeo: 2026-09-26.
