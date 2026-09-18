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

## Qué se bajó (sesión 2026-09-18, continuación — browser tool ya funcionando)

**13 ejercicios, 2012/13-2024/25, serie COMPLETA sin huecos**, en `Clubes/Turquía/Fenerbahçe/`:
`fenerbahce-futbol-bilanco-31-05-2013.pdf` a `...-31-05-2025.pdf`. Los 12 primeros venían de la
sesión anterior (verificados como PDF válidos). El último, **2024/25 (cierre 31-05-2025)**, se
completó en esta sesión: navegando KAP con el Browser pane (ya disponible, ver nota general),
"Detailed Search" → compañía FENERBAHÇE FUTBOL A.Ş. → filtro Year=2024/Period=Annual → bildirim
del 11.08.2025, id 1476151, archivo real `Final FENERBAHÇE - 31 05 2025 - SPK_TR.pdf` (74 páginas).

Descarga vía `curl` directo dio el gotcha ya conocido ("Java serialization data" en vez de PDF) —
funcionó descargando con `fetch()` dentro del Browser pane (misma sesión JS que ya tiene las
cookies/headers correctos) y decodificando manualmente el wrapper de serialización Java (buscar el
offset del magic byte `%PDF` en el buffer y recortar desde ahí — el resto del buffer hasta el final
es el PDF completo y válido, confirmado con `pdfinfo`).

## Dudas / pendientes

- Ninguna. Serie completa 2012/13-2024/25.
- Último chequeo: 2026-09-18.
