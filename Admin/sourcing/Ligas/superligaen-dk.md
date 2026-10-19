# Superligaen A/S — Superliga de Dinamarca (`dk-superliga`)

**Ángulos**: regulador/país: agotado (API de Erhvervsstyrelsen, `distribution.virk.dk`) · sitio oficial: Divisionsforeningen
(`divisionsforeningen.dk`) solo tiene un informe escrito y actas, sin balance · barrido: 1 (Sonnet, sesión Finanzas 4) — 2026-10-19

- Entidad: Superligaen A/S, CVR 13996830, la sociedad comercial de los clubes de la Superliga (no agrega las finanzas de los clubes). La asociación
  de clubes, Foreningen af Divisionsklubber i Danmark (CVR 86836319), no publica balance. Queda sin confirmar qué entidad "organiza" formalmente
  cada competición: se usó la que tiene balance.
- Canal: `curl "http://distribution.virk.dk/offentliggoerelser/_search?q=cvrNummer:13996830&size=100&sort=regnskab.regnskabsperiode.slutDato:desc"`,
  el `dokumentUrl` del primer resultado y `curl --compressed` (30 årsrapporter en total). El ejercicio 2024/25 solo está como XHTML y XML (sin PDF);
  el 2023/24 sí trae PDF.
- Cierre 30 de junio. Bajado: årsrapport 2024/25 → `Ligas/Dinamarca/Superligaen/superligaen-arsrapport-2024-25.xhtml` (sin trackear: no es PDF ni
  `.md`), con su `.md` (texto del XHTML sin etiquetas; la tabla de la portada y las etiquetas XBRL quedan sueltas en el texto).
- Auditor: EY Godkendt Revisionspartnerselskab (Mona Blønd, København, 28-10-2025), revisionspåtegning sin salvedades ni énfasis.
- Último chequeo: 2026-10-19.
