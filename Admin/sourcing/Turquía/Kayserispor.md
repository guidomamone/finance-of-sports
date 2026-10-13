# Kayserispor

- **Deporte**: Fútbol
- **Liga / competencia**: Süper Lig (Turquía, 1ª división)
- **Entidad legal**: club-asociación (dernek, TFF lo lista como "METRO HOLDİNG KAYSERİSPOR"), no
  cotiza en bolsa.
- **Canal**: sitio propio `kayserispor.org.tr` — sin encontrar. El dominio además dio timeout/
  conexión fallida (`HTTP 000`) al intentar `curl` directo en esta sesión, no solo 403/404.

## Qué se intentó (sesión 2026-09-18)

Búsqueda web general y `filetype:pdf` para "mali tablolar"/"bilanço": no devolvió ningún PDF de
estados financieros del propio club, solo cobertura de prensa sobre su deuda (cifras sueltas
citadas por medios, no el documento fuente) y un PDF de identidad corporativa
(`kayserispor.org.tr/wp-content/uploads/2024/03/KAYSERISPOR-KURUMSAL-KIMLIK.pdf`, no financiero).
`curl` directo al home del sitio no conectó (`HTTP 000`, timeout).

## Dudas / pendientes

- **Dead-end de esta sesión** — el fallo de conexión directa (no solo bloqueo de contenido) hace
  sospechar de un problema de hosting/DNS más que de falta de contenido; re-intentar en una sesión
  futura, con browser real si el dominio responde ahí.
- Kayserispor tiene cobertura de prensa detallada sobre su situación de deuda (cifras específicas
  citadas en varias notas) — si el sitio propio sigue sin responder, prensa podría servir como
  fuente secundaria documentada como tal (`reliability:'secondary_press'`), no probado en esta
  sesión.
- Último chequeo: 2026-09-18.
