# España — sin registro único; el atajo es listar el CMS de cada club en Wayback

España no tiene un regulador que centralice balances de clubes (LaLiga publica solo sus propias
cuentas; el Registro Mercantil es de pago). Cada S.A.D. publica por su cuenta. Último chequeo: 2026-10-03.

- **CMS compartido de LaLiga (`statics-maker.llt-services.com/<código>/documents/...`)**: confirmado
  para gir, mll, ray, get, elc, lev, ovi. Host de archivos sin anti-bot (curl con User-Agent alcanza).
  Para recuperar ejercicios viejos que la página de transparencia ya no linkea, listar el prefijo en
  Wayback: `cdx/search/cdx?url=statics-maker.llt-services.com/<código>/*&collapse=urlkey&fl=original,mimetype,timestamp`
  (sin `filter=mimetype:`) y clasificar cada PDF por la carátula. La fecha de la URL es de subida, no
  del ejercicio. Mucho es escaneo: OCR de la carátula (`tesseract -l spa`).
- **Mismo patrón en CDN/dominios propios**: `<host>/public/Attachment/*` (Valencia, Osasuna),
  `rccelta.es/app/uploads/*`, `cdn.athletic-club.eus/*`, `sevillafc.es/sites/default/files/*`
  (archivo legado), `seguro.valenciacf.com/bd/archivos/` (legado). Espanyol y Sevilla NO usan el CMS de LaLiga.
- **Gotchas**: (1) archive.org puede estar "Temporarily Offline" y devolver un HTML con status 200:
  un listado vacío ese día no es evidencia (validar que la respuesta no empiece con `<html`).
  (2) Una captura grande puede venir truncada a 1.048.576 bytes: reintentar con otro timestamp.
  (3) villarrealcf.es da 403 al PDF directo: bajarlo por Wayback (`/web/<ts>id_/<url>`).
  (4) Real Sociedad no publica (cuentas gateadas a accionistas); el Registro Mercantil confirma
  el depósito pero el PDF es de pago: gestión de Guido.
- **Sociedades que cotizan o emitieron deuda**: CNMV (no probado todavía).
