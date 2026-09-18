# Beşiktaş

- **Deporte**: Fútbol
- **Liga / competencia**: Süper Lig (Turquía, 1ª división)
- **Entidad legal**: Beşiktaş Futbol Yatırımları Sanayi ve Ticaret A.Ş. (BJK Futbol A.Ş.), cotizante
  en Borsa İstanbul (ticker BJKAS) — mismo esquema club-asociación + cotización directa. Ejercicio
  fiscal 01/06-31/05.
- **Canal principal**: **KAP** (`kap.org.tr`), código BJKAS.
- **Canal secundario/backup**: `bjk.com.tr/sirketlerimiz/futbol_as/genel_kurul_toplantilari` —
  página propia de "Asambleas Generales" de BJK Futbol A.Ş. que en los resultados de búsqueda
  aparece listando estados financieros consolidados y dictámenes de auditoría por año, incluyendo
  específicamente 31-05-2015 y 31-05-2019 (los dos huecos de abajo). **Bloqueada por WAF: HTTP 403
  tanto para WebFetch como para `curl`** con cualquier User-Agent probado en esta sesión — necesita
  browser real con JS.

## Qué se bajó (sesión 2026-09-18, continuación — browser tool ya funcionando)

**19 ejercicios, 2005/06-2023/24, serie COMPLETA sin huecos**, en `Clubes/Turquía/Beşiktaş/`:
`besiktas-futbol-bilanco-31-05-2006.pdf` a `...-31-05-2024.pdf`. Los 17 ya existentes venían de la
sesión anterior (verificados). Los dos huecos se completaron en esta sesión navegando KAP:

- **2014/15 (cierre 31-05-2015)**: en este ejercicio KAP todavía usaba el formato viejo de
  disclosure — el "Financial Report" del período viene partido en 5 bildirim separados (Statement
  of Financial Position, Profit or Loss, Cash Flow, Statement of Changes in Equity, Notes), cada
  uno con su propio ID pero **los 5 apuntan al mismo archivo real** (confirmado comparando SHA-256:
  idéntico en los 5). Basta bajar uno solo. Filed 31.07.2015, archivo `BJKAS 31052015.pdf` (69
  páginas) → guardado como `besiktas-futbol-bilanco-31-05-2015.pdf`.
- **2018/19 (cierre 31-05-2019)**: ya en formato moderno (1 solo bildirim con el juego completo).
  Filed 09.08.2019, archivo `BJK FUTBOL - 31 05 2019 - KONSOLIDE .pdf` (61 páginas) → guardado como
  `besiktas-futbol-bilanco-31-05-2019.pdf`.

No hizo falta pasar el WAF de `bjk.com.tr` — KAP solo alcanzó con el Browser pane funcionando.

## Dudas / pendientes

- Ninguna. Serie completa 2005/06-2023/24 (19 ejercicios).
- Último chequeo: 2026-09-18.
