# Italia — no es un registro mercantil, es la obligación de licencia UEFA

El Registro delle Imprese italiano es **pago** para terceros (tarjeta de crédito, tarifas del
decreto MISE 2007) — mismo patrón que Austria/Croacia, no el de Bélgica/Dinamarca/Grecia. Pero acá
el registro mercantil no hace falta: el motor real es la obligación de disclosure del **Manuale
delle Licenze UEFA**, que lleva a la mayoría de los clubes a publicar voluntariamente su bilancio en
la sección "trasparenza"/"licenze-uefa" de su propio sitio, cotización aparte. Último chequeo:
2026-09-17.

- **Hallazgo transversal, aplicable a cualquier país nuevo con clubes que jueguen competiciones
  UEFA**: antes de asumir que hace falta un registro mercantil o una bolsa, chequear si el club
  publica directo por obligación de licencia — es más simple y más común de lo esperado.
- **Juventus, cotizante desde 2001, dio la serie más profunda de todo el proyecto**: 23 ejercicios
  sin huecos (2002/03-2024/25), superando a Club Brugge/Standard Liège (Bélgica, `paises/Belgica.md`) y
  Companies House (Reino Unido, `paises/Reino-Unido.md`). Lazio también cotiza desde 1998 pero solo se bajó 1
  ejercicio — el histórico completo queda como pista pendiente para profundizar.
- **Report Calcio (FIGC/PwC/AREL)**: existe pero es un agregado SECTORIAL (como el Deloitte belga o
  la DFL alemana) — sirve de cifra de contexto, no da bilanci por club individual.
- **Resultado: 16 de 20 clubes de Serie A 2025/26 con al menos un ejercicio real, 100% PDF con capa
  de texto nativa** (cero escaneos en todo el país, el mejor resultado de formato del proyecto). Los
  4 sin nada (Torino, Pisa, Lecce, Cagliari) no tienen un bloqueo estructural confirmado — Cagliari
  incluso tiene la sección pero con el link a Google Drive roto (accionable: pedirle al club que lo
  arregle).
- **Gotcha de tooling nuevo**: un snapshot de Wayback Machine puede devolver HTTP 200 pero venir
  TRUNCADO (header `warning: 299 wayback content truncated by "length"`, típico de capturas vía
  Common Crawl) — verificar con `pdfinfo`/chequear el `%%EOF` del archivo, no confiar en el 200 solo.
- **Varios clubes tienen links propios rotos por migración de CDN sin actualizar** (Inter, Napoli,
  Udinese) — vale la pena probar Wayback Machine antes de descartar, no asumir dead-end por un 404
  directo.
