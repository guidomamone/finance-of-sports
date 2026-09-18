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

## Qué se bajó (sesión 2026-09-18, continuación de intento previo cortado por rate-limit)

**17 ejercicios de 19 posibles, 2005/06-2023/24**, en `Clubes/Turquía/Beşiktaş/`:
`besiktas-futbol-bilanco-31-05-2006.pdf` a `...-31-05-2024.pdf`. Descargados de KAP en la sesión
anterior. Verificados en esta sesión: los 17 son PDF válidos.

**Faltan 2014/15 (cierre 31-05-2015) y 2018/19 (cierre 31-05-2019).** Con el browser tool caído
toda esta sesión no se pudo re-navegar KAP para completar esos dos huecos, ni pasar el WAF de
`bjk.com.tr/sirketlerimiz/futbol_as/genel_kurul_toplantilari`, que por lo visto en el snippet de
búsqueda SÍ tiene esos dos años listados.

## Dudas / pendientes

- **Pendiente completar 2014/15 y 2018/19** — requiere sesión con browser tool funcionando,
  cualquiera de los dos canales (KAP con rango de fechas ajustado, o `bjk.com.tr` pasando el WAF).
- Último chequeo: 2026-09-18.
