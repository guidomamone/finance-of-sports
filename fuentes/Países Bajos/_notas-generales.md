# Países Bajos — notas generales de sourcing

Duodécimo país nuevo de la lista de "30 mejores ligas del mundo" (sesión 2026-09-17), después de
Alemania/Austria/Bélgica/China/Corea del Sur/Croacia/Dinamarca/Francia/Grecia/Italia/Noruega.

## KvK (Kamer van Koophandel) — confirmado de PAGO, no es el canal

El registro mercantil central neerlandés (`kvk.nl`) tiene el jaarrekening (cuenta anual) de
depósito obligatorio para toda BV/NV, pero descargarlo tiene costo por documento: **€3,90 por
jaarrekening** (tarifa vigente desde el 1 de enero de 2026, antes ~€2,60 — confirmado en
`kvk.nl/producten-bestellen/jaarrekeningen/` y el PDF de tarifas
`tarievenoverzicht_1_januari_2026.pdf`). Mismo patrón que Austria (Firmenbuch)/Croacia
(RGFI-JAV)/Italia (Registro Imprese): registro mercantil de pago, no scripteable gratis como
Bélgica/Dinamarca/Grecia/Noruega. **No se pagó nada** (regla del proyecto) — no hizo falta, ver
abajo.

## El canal real: mandato de licencia KNVB (F.04), igual patrón que Croacia/Italia

La KNVB exige a todo licenciatario de fútbol profesional (Eredivisie + Eerste Divisie/Keuken
Kampioen Divisie) publicar su jaarverslag/jaarrekening en su PROPIO sitio web (requisito de
licencia F.04: "el número de puntos otorgado se debe publicar junto con el informe de gestión en
el sitio web del licenciatario"). La KNVB, además, mantiene y publica cada temporada un PDF-índice
con el link exacto a la página de cada club (`knvb.nl/competities/competitiezaken/licentiezaken/
betaald-voetbal/publicaties`, buscar "Jaarverslagen BVO's seizoen <año>"). Hay un PDF-índice de
este tipo por cada temporada desde 2018/'19 hasta 2024/'25 (7 temporadas), útil para saber en qué
URL buscó la KNVB cada año — aunque la URL puede haber cambiado desde entonces (varios links del
índice de temporadas viejas ya dan 404 hoy).

Con esto, **los 18 clubes de la Eredivisie 2025/26 tienen al menos 3 ejercicios reales
descargados**, la mayoría con series bastante más largas — ver el archivo de cada club. Ningún
club quedó en dead-end total, algo que solo había pasado antes con Alemania e Italia (parcial).

## Ajax vía Euronext, mejor lead individual pero con techo antes de 2013

Ajax cotiza en Euronext Amsterdam desde 1998 (AFC Ajax N.V.) y publica sus jaarverslagen
completos en `ajax.nl/media/...` (URLs con hash, no predecibles, hay que buscarlas una por una) —
serie confirmada 2013/14-2024/25 sin huecos salvo 2017/18 (que existió solo como microsite HTML
interactivo en el dominio hoy muerto `jaarverslag.ajax.nl`, sin PDF descargable, y como mirror en
Scribd que no se usó por no ser fuente oficial). Series más viejas (pre-2013, hasta el IPO de 1998)
no se encontraron en `ajax.nl/media/` con las búsquedas de esta sesión — quedan como pista para
profundizar (candidatos: `financialfilings.com/companies/afc-ajax-nv/`, bloqueado con 403 en esta
sesión; y `archief.ajax.nl`, el archivo digital propio del club que incluye "Jaarverslagen
Vereniging (vanaf 1964)" pero es la asociación, no la N.V., sin explorar en profundidad).

## Gotcha de tooling: varios sitios de club son SPA/JS y no sirven nada a `curl` plano

AZ, PSV, FC Twente, sc Heerenveen, N.E.C. y Feyenoord devuelven HTML casi vacío a un `curl` simple
(contenido cargado por JS) — hubo que usar el Browser pane (`javascript_tool` con
`querySelectorAll('a')` filtrando `.pdf`) para extraer los links reales. PSV en particular sirve
el PDF directo en una URL sin extensión `.pdf` (`/media/artikel/<slug>`, Content-Type
`application/pdf` con `Content-Disposition: attachment`) — un `grep '\.pdf'` sobre el HTML no lo
encuentra, hay que fijarse en el Content-Type real de la respuesta, no en el sufijo de la URL.
Mismo patrón en N.E.C. (`/download/<slug>.htm` sirve un PDF real pese a la extensión `.htm`).

Go Ahead Eagles migró su storage de medios a un bucket de Google Cloud
(`storage.googleapis.com/ga-eagles-media/wp-content/uploads/sites/1/<año>/<mes>/<archivo>`) en
algún momento entre la publicación de artículos viejos y esta sesión — los links `wp-content/
uploads/...` indexados por buscadores para años 2020-2024 devuelven 404 en el dominio propio, pero
el mismo archivo SIGUE existiendo en el bucket con el path `.../sites/1/` insertado. Vale la pena
probar esta transformación de URL antes de dar un año por perdido en cualquier club que use este
mismo patrón de CDN.

## FC Volendam — dos entidades distintas bajo el mismo dominio, cuidado al citar

`fcvolendam.nl/site-fcvd/storage/files/1071/` aloja jaarrekeningen de **"Stichting Óók FC
Volendam"** (2013-2019) — por el nombre, una fundación de apoyo/comunitaria, no necesariamente el
club de fútbol profesional en sí. Los ejercicios más recientes (2019/20 en adelante) están bajo
"Stichting R.K.F.C. Volendam" (`.../1137/`), que sí parece ser la entidad del fútbol profesional
(el nombre coincide con la razón social histórica del club, R.K.F.C. Volendam). No se descargaron
los documentos de "Stichting Óók FC Volendam" por esta ambigüedad — queda anotado como duda para
confirmar antes de cualquier carga de datos futura.

## Último chequeo: 2026-09-17.
