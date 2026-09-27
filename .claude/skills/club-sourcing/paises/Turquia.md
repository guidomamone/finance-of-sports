# Turquía — los 4 grandes cotizan DIRECTO como club-asociación, caso único en el proyecto

**PENDIENTE DE RETOMAR: sesión incompleta por el Browser pane caído** (ver gotcha abajo) — no dar
por agotado Turquía sin volver a intentar KAP con browser disponible.

Galatasaray, Fenerbahçe, Beşiktaş y Trabzonspor son un caso que no había aparecido en ningún otro
país: el club-asociación (dernek) mismo cotiza directo en Borsa İstanbul, sin necesidad de una
holding/sociedad anónima separada como Juventus/Ajax/Man Utd/Eagle Football Group. Esto los sujeta
directo a la obligación de disclosure de **KAP** (Kamuyu Aydınlatma Platformu, `kap.org.tr`) — el
equivalente turco a EDGAR/HKEXnews, gratis, con series largas y auditadas. Último chequeo:
2026-09-18.

- **Galatasaray: serie completa 2012/13-2024/25 (13 ejercicios)** — el mejor resultado del país.
- **KAP tiene un gotcha de tooling real**: la URL de resumen de un emisor es fetchable por
  `curl`/WebFetch (SSR), pero el LISTADO de disclosures individuales de cada ejercicio se arma con
  botones React sin `href` real — no hay forma de sacar el link de descarga sin un browser real
  renderizando JS. Además, el filtro de fecha por defecto muestra solo 1 año y no se puede ampliar
  por parámetros de URL. Sin browser disponible, KAP queda bloqueado a pesar de ser gratis.
- **Los clubes chicos son dernek sin obligación de mercado de capitales** — algunos publican "Mali
  Tablolar" (estados financieros) en su propio sitio por mandato de licencia TFF/UEFA, mismo patrón
  que Croacia/Italia/Países Bajos/Portugal, pero mucho menos consistente: de los 13 clubes chicos
  investigados, solo 6 dieron algo, y ninguno con más de 4 ejercicios.
- **Gotcha nuevo, apareció 2 veces**: un servidor puede responder 200 con `Content-Type` de PDF pero
  el archivo real es "Java serialization data" corrupto (no un PDF válido) — verificar siempre con
  `pdfinfo`/abrir el archivo antes de dar una descarga por buena, no confiar en el código HTTP ni el
  Content-Type declarado.
- **El Browser pane puede caerse por sesiones enteras** (timeouts de 300s en cada `preview_start`/
  `navigate`, confirmado con reintentos espaciados) — cuando esto pasa, documentarlo explícitamente
  como bloqueo de TOOLING (no del portal) y seguir con lo que sí se pueda hacer por `curl`/WebFetch,
  dejando anotado qué quedó pendiente de retomar con browser. **Confirmado transitorio**: un
  seguimiento la sesión siguiente encontró el Browser pane funcionando normal desde el primer
  intento — no asumir que un corte así es permanente, solo reintentar en una sesión nueva.
- **Causa raíz real del "Java serialization data" en vez de PDF (KAP)**: no es anti-bot, es el
  formato real que devuelve el endpoint cuando se lo pide sin las cookies de sesión de un browser.
  La vuelta que funcionó: `fetch()` DENTRO del Browser pane (no `curl` externo) + recortar
  manualmente el buffer desde el magic byte `%PDF`.
- **El formato de disclosure de KAP cambió con el tiempo**: los ejercicios viejos (~2015-2016)
  vienen partidos en 5 "bildirim" (notificaciones) separadas que en realidad apuntan al mismo PDF
  (confirmado comparando SHA-256, todas idénticas) — no tratar cada bildirim como un documento
  distinto. Los ejercicios más nuevos son un solo bildirim.
- **El buscador "Detailed Search" de KAP limita el rango de fechas a exactamente 1 año** — para
  armar una serie larga hay que iterar año por año, no se puede pedir un rango de varios años de
  una sola búsqueda.
- **Un link roto en el sitio del club puede confirmarse como dead-end real, no como bloqueo de JS**:
  para Antalyaspor, interceptar el evento click e inspeccionar el DOM completo confirmó que los
  `href="#"` eran placeholders genuinamente rotos (sin `data-href`/`onclick` oculto) — Wayback
  Machine tampoco tenía los PDFs (solo cacheó la página que los linkeaba, nunca los archivos en sí,
  que se rompieron entre oct-2023 y abr-2024). Vale la pena este nivel de verificación antes de
  escribir "bloqueado por JS" — puede ser un dead-end real disfrazado de problema de tooling.
