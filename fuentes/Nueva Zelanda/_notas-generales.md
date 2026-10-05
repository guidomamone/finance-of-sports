# Nueva Zelanda — notas generales de sourcing

**Ángulos**: sitio oficial: parcial (NZ Rugby y NZ Cricket agotados; franquicias/clubes sin sección de informes) · Wayback CDX: nzrugby.co.nz, nzc.nz, nzfootball.co.nz, blues/chiefs/crusaders/hurricanes/highlanders.co.nz, wellingtonphoenix.com (solo NZR/NZC/NZF dan algo) · búsqueda web: sí · regulador/país: Companies Office NZ + Charities Register + Incorporated Societies (probados) · barrido: 1 (Sonnet) — 2026-10-03

## Qué obligación de publicar tiene cada figura jurídica (lo que se verificó)

| Figura | Obligación | Resultado práctico |
|---|---|---|
| Incorporated society (NZ Rugby Union Inc., New Zealand Cricket Inc., uniones provinciales) | Estados financieros anuales a la Societies Register; las grandes ("Tier 1/2") los auditan | NZR y NZC **los publican ellos mismos** en su sitio (ver notas por federación). La búsqueda en el registro de sociedades (app.companiesoffice.govt.nz/societies/...) devolvió 503/redirect de login: NO se pudo probar si ahí se bajan. |
| Registered charity | Annual return + financial statements, públicos y gratis en register.charities.govt.nz | NZ Rugby Union y NZ Cricket **NO son charities** (búsqueda por nombre: solo aparecen NZ Rugby Foundation CC42547, NZ Rugby Legacy Fund CC64244, NZ Cricket Foundation CC33805, NZ Cricket Museum). Ningún club/franquicia pro es charity. El canal sirve para uniones provinciales chicas (ej. Poverty Bay RFU CC46347), no para el nivel pro. |
| Company (Ltd) | Solo las "large" (activos > NZ$60M o ingresos > NZ$30M) y las overseas-owned grandes filean FS. Annual return no incluye FS. | Auckland FC Ltd (8232374): solo documentos de incorporación (2021), cero FS. Los GP Limited de las franquicias (Chiefs GP 4820819, Crusaders (GP) 4062717, Hurricanes GP 4092441, Highlanders GP 5838023, Welnix GP 3522632, NZ Super Rugby Clubs Ltd 8500986): solo annual returns/directores. |
| Limited Partnership (las franquicias Super Rugby y Welnix son GP + LP) | Solo FS si "large" | El registro de LPs es otro sitio (el buscador de companies no devuelve LPs; app.companiesoffice.govt.nz/lps/... dio 503). **No verificado si las LPs filean FS.** La prensa (Stuff, Deloitte report 2026) cita pérdidas 2019-2025 de los 5 clubes, pero la fuente es un informe de Deloitte pedido por NZR, no un filing público. |

## Mecánica scriptable (gotchas)

- **Charities Register**: la búsqueda funciona con `curl` GET, sin cookies: `https://register.charities.govt.nz/CharitiesRegister/Search?Submitted=True&CharityNameSearchType=Contains&CharityName=<texto>` (mínimo 3 caracteres). Devuelve HTML con `<td>` nombre / CCxxxxx / estado / fecha. Página de la charity: `https://register.charities.govt.nz/Charity/CCxxxxx`. No se probó la bajada de PDFs (ninguna entidad objetivo es charity).
- **Companies Office**: búsqueda GET sin login: `https://app.companiesoffice.govt.nz/companies/app/ui/pages/companies/search?q=<texto>&entityTypes=ALL&entityStatusGroups=ALL&limit=15` (HTML parseable: `class="entityName"`). Lista de documentos de una empresa: `.../companies/<número>/documents?limit=100` (anónimo, links directos `.../service/services/documents/<HASH>` — no se probó bajarlos porque ninguna empresa objetivo tenía FS). Intermitente: a veces 503.
- Ni NZR ni NZC usan Companies Office para publicar: publican PDF propios.

## Qué sirve para todos los deportes

Nada transversal bajable: el nivel pro de NZ (rugby, fútbol, cricket) se publica solo por las uniones nacionales (incorporated societies). Franquicias y clubes privados = dead-end público; el camino es mail a los clubes (NZR consolida a las franquicias solo parcialmente, ver NZ Rugby.md).

## Dead-ends

- Fiji / Papúa Nueva Guinea: no sourceado en profundidad. Fiji Rugby Union presenta FS en su AGM (prensa: pérdida F$1.3M 2022, ganancia consolidada F$929k 2025, Fiji Rakavi Ltd = brazo comercial) pero no se halló PDF público (fijirugby.com). Probable dead-end; candidato a mail.
- NZ Football (nzfootball.co.nz): CDX solo trae informes anuales 2009-2012; no se profundizó (federación, no club). Wellington Phoenix se absorbió en el "Professional Club Group" (Phoenix + Auckland FC) como miembro de NZF.

## Pendientes (venían del TODO)

- (ex to-do 114, 2026-10-03) OCEANÍA — HUECOS DEL PRIMER BARRIDO (2026-10-03, ver `fuentes/Australia/` y `fuentes/Nueva Zelanda/`). Gestión de Guido: (d) candidatos a mail: franquicias NZ, Phoenix, Auckland FC.
- (ex to-do 116) OCEANÍA — VERIFICACIONES PENDIENTES ANTES DE CARGAR: NZ Cricket (estados resumidos con ISA 810).
