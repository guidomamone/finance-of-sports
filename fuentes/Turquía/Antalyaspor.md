# Antalyaspor

- **Deporte**: Fútbol
- **Liga / competencia**: Süper Lig (Turquía, 1ª división)
- **Entidad legal**: Antalyaspor Spor Faaliyetleri Ticaret Sanayi A.Ş. (dernek dueño de una A.Ş.
  operativa, no cotiza en bolsa).
- **Canal**: sitio propio, `antalyaspor.com.tr/tr/antalyaspor-a-s/mali-tablolar1.html` — página
  confirmada que EXISTE y lista 4 documentos (Finansal Durum Raporu, Gelir Tablosu, Nakit Akım
  Tablosu, y un informe de auditoría), pero los links son placeholders `href="#"` en el HTML
  servido — se renderizan por JS (los PDFs reales deben cargarse dinámicamente, no están en el HTML
  crudo que devuelve `curl`). No se pudo pasar por WebFetch tampoco (mismo problema).

## Qué se bajó (sesión 2026-09-18)

**Nada.** Se confirmó que existe la página con los 4 documentos pero no se pudieron extraer las
URLs reales sin un browser con JS — el browser tool estuvo caído toda la sesión (ver nota general
de Turquía).

## Dudas / pendientes

- **Pendiente, prioridad media-alta**: volver con browser tool funcionando a
  `antalyaspor.com.tr/tr/antalyaspor-a-s/mali-tablolar1.html`, inspeccionar la página renderizada
  para sacar las 4 URLs reales, y buscar si hay más años que los 4 documentos visibles (título de
  la página no menciona años específicos, sugiere que puede ser solo el último ejercicio).
- Último chequeo: 2026-09-18.
