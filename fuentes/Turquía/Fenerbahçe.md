# Fenerbahçe

- **Deporte**: Fútbol
- **Liga / competencia**: Süper Lig (Turquía, 1ª división)
- **Entidad legal**: Fenerbahçe Futbol A.Ş., cotizante en Borsa İstanbul (ticker FENER) — mismo
  esquema que Galatasaray/Beşiktaş/Trabzonspor: club-asociación (dernek) dueño mayoritario de la
  sociedad que cotiza directo, sin holding intermedia. Ejercicio fiscal 01/06-31/05.
- **Canal principal**: **KAP** (`kap.org.tr`), código FENER.
- **Canal secundario/backup**: `media.fenerbahce.org/getmedia/<guid>/FENER-<año>-<trimestre>-C-*.pdf`
  y también `www.fenerbahce.org/getmedia/...` — nomenclatura: trimestre 1 = cierre 31/08, 2 =
  30/11, 3 = 28-29/02, 4 = cierre de ejercicio 31/05. El propio club además tiene una página índice
  dedicada, `fenerbahce.org/fbfutbol/mali-tablolar-denetim-faaliyet-raporlari`, que debería listar
  todos los años — **bloqueada por WAF/Cloudflare tanto para WebFetch como para `curl`** en esta
  sesión (HTTP 403 con cualquier User-Agent probado), necesita un browser real con JS para navegarla.

## Qué se bajó (sesión 2026-09-18, continuación de intento previo cortado por rate-limit)

**12 ejercicios, 2012/13-2023/24**, en `Clubes/Turquía/Fenerbahçe/`: `fenerbahce-futbol-bilanco-
31-05-2013.pdf` a `...-31-05-2024.pdf`. Descargados de KAP en la sesión anterior. Verificados en
esta sesión: los 12 son PDF válidos.

**Falta 2024/25 (cierre 31-05-2025).** La sesión anterior había dejado un archivo con ese nombre
(`fenerbahce-futbol-faaliyet-raporu-31-05-2025.pdf`) pero el chequeo de integridad de esta sesión
(`file`) lo detectó corrupto — "Java serialization data, version 5" en vez de PDF, probablemente
una respuesta de error/anti-bot de KAP guardada por error como si fuera el PDF. **Se borró.** Con
el browser tool caído toda esta sesión (ver nota general de Turquía) no se pudo re-navegar KAP para
volver a bajarlo, ni pasar el WAF de `fenerbahce.org/fbfutbol/mali-tablolar-denetim-faaliyet-
raporlari` con `curl`/WebFetch. Se encontró vía búsqueda el informe de actividad (no el bilanço
completo) del mismo período en `media.fenerbahce.org/getmedia/1c21f7bc-a3c0-401b-8b3d-
d7e3d3e7b151/FENER-2024-4-C-YK-FR.pdf` — no descargado porque no es el documento equivalente a los
otros 12 años (falta el juego completo de estados + dictamen de auditoría).

## Dudas / pendientes

- **Pendiente bajar el ejercicio 2024/25 (31-05-2025)** — requiere sesión con browser tool
  funcionando, navegando KAP (ajustar el rango de fechas por defecto, que solo trae el último año)
  o pasando el WAF de `fenerbahce.org/fbfutbol/mali-tablolar-denetim-faaliyet-raporlari`.
- Último chequeo: 2026-09-18.
